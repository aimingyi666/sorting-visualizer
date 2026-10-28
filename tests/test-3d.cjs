/**
 * 验证 3D 模块：在 jsdom 中用 THREE stub 检查初始化、渲染、销毁，
 * 以及 OrbitControls 缺失时的降级行为。
 */
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const projectRoot = path.join(__dirname, '..');
const nodeModules = path.join(projectRoot, 'node_modules');
const { JSDOM } = require(path.join(nodeModules, 'jsdom'));

function makeThreeStub() {
  const created = { geometries: 0, materials: 0, meshes: [], disposed: 0, removed: 0, rendered: 0 };

  class Vector3 {
    constructor() { this.x = 0; this.y = 0; this.z = 0; }
    set(x, y, z) { this.x = x; this.y = y; this.z = z; return this; }
  }
  class Object3D {
    constructor() { this.position = new Vector3(); this.rotation = new Vector3(); this.children = []; }
    add(o) { this.children.push(o); }
    remove(o) {
      const i = this.children.indexOf(o);
      if (i >= 0) { this.children.splice(i, 1); created.removed++; }
    }
  }
  class Geometry { dispose() { created.disposed++; } }
  class Material { dispose() { created.disposed++; } }

  const THREE = {
    Scene: class extends Object3D { constructor() { super(); this.background = null; } },
    Color: class { constructor(c) { this.c = c; } },
    PerspectiveCamera: class extends Object3D {
      constructor(fov, aspect) { super(); this.fov = fov; this.aspect = aspect; }
      lookAt() {}
      updateProjectionMatrix() {}
    },
    WebGLRenderer: class {
      constructor() {
        this.domElement = null;
        this.shadowMap = { enabled: false };
      }
      setSize() {}
      render() { created.rendered++; }
      dispose() { created.disposed++; }
    },
    AmbientLight: class extends Object3D {},
    DirectionalLight: class extends Object3D { constructor() { super(); this.castShadow = false; } },
    PlaneGeometry: class extends Geometry { constructor(w, h) { super(); this.w = w; this.h = h; created.geometries++; } },
    BoxGeometry: class extends Geometry { constructor(w, h, d) { super(); this.w = w; this.h = h; this.d = d; created.geometries++; } },
    MeshStandardMaterial: class extends Material { constructor(o) { super(); this.opts = o; created.materials++; } },
    Mesh: class extends Object3D {
      constructor(g, m) { super(); this.geometry = g; this.material = m; this.castShadow = false; this.receiveShadow = false; created.meshes.push(this); }
    },
  };

  return { THREE, created };
}

(async () => {
  const dom = new JSDOM('<!doctype html><html><body><div id="c3d" style="width:800px;height:400px"></div></body></html>', {
    pretendToBeVisual: true,
    url: 'http://127.0.0.1/',
  });
  const { window } = dom;

  // jsdom 没有 WebGL，给 renderer.domElement 一个真实的 canvas 元素
  window.HTMLCanvasElement.prototype.getContext = () => ({});

  const { THREE, created } = makeThreeStub();
  const origRenderer = THREE.WebGLRenderer;
  THREE.WebGLRenderer = class extends origRenderer {
    constructor(opts) {
      super(opts);
      this.domElement = window.document.createElement('canvas');
    }
  };

  window.THREE = THREE;
  global.window = window;
  global.document = window.document;
  global.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 16);
  global.cancelAnimationFrame = (id) => clearTimeout(id);

  // 加载 ESM 模块
  const modPath = path.join(projectRoot, 'src', 'visualization-3d.js');
  const mod = await import(pathToFileURL(modPath).href);

  const results = [];
  const ck = (name, fn) => {
    try {
      const v = fn();
      results.push([name, v === true || typeof v === 'string', typeof v === 'string' ? v : '']);
    } catch (e) {
      results.push([name, false, e.message]);
    }
  };

  let viz = null;

  ck('无 OrbitControls 时仍能初始化', () => {
    viz = new mod.Visualization3D('c3d');
    return viz.renderer && viz.scene && viz.camera ? '已创建 scene/camera/renderer' : false;
  });

  ck('OrbitControls 缺失时 controls 为空', () => (viz.controls === null ? '已降级为静态 3D' : false));

  ck('画布已挂载到容器', () => {
    const canvas = window.document.querySelector('#c3d canvas');
    return canvas ? 'canvas 存在' : false;
  });

  ck('renderArray 生成条形', () => {
    viz.renderArray([5, 2, 8, 1, 9, 3], [1], [5]);
    return created.meshes.length > 0 ? `${created.meshes.length} 个 Mesh（含地面+条形）` : false;
  });

  ck('条形数量与数组长度一致', () => {
    const bars = viz.bars.length;
    return bars === 6 ? `${bars} 根条形` : false;
  });

  ck('高亮/已排定使用不同颜色', () => {
    const colors = viz.bars.map((b) => b.material.opts.color);
    const uniq = new Set(colors);
    return uniq.size >= 2 ? `出现 ${uniq.size} 种颜色` : false;
  });

  ck('再次渲染会先清理旧条形', () => {
    const before = created.disposed;
    viz.renderArray([1, 2, 3], [], []);
    return created.disposed > before ? `释放 ${created.disposed - before} 个资源` : false;
  });

  ck('有 OrbitControls 时正常创建', () => {
    window.THREE.OrbitControls = class {
      constructor() { this.enabled = true; }
      update() {}
      dispose() { this.disposed = true; }
    };
    const viz2 = new mod.Visualization3D('c3d');
    const ok = viz2.controls && typeof viz2.controls.update === 'function';
    viz2.destroy();
    return ok ? 'controls 已启用' : false;
  });

  ck('destroy 清理干净', () => {
    viz.destroy();
    const canvas = window.document.querySelector('#c3d canvas');
    return !canvas ? 'canvas 已移除' : false;
  });

  console.log('=== 3D 模块验证 ===');
  let pass = 0;
  for (const [n, ok, note] of results) {
    console.log(`  ${ok ? '✓' : '✗'} ${n}${note ? `  (${note})` : ''}`);
    if (ok) pass++;
  }
  console.log(`\n通过 ${pass}/${results.length}`);
  process.exit(pass === results.length ? 0 : 1);
})();
