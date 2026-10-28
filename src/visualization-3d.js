/**
 * 3D 可视化模块
 *
 * 用 Three.js + WebGL 渲染条形数组，支持鼠标拖拽旋转 / 滚轮缩放。
 *
 * 依赖约定：
 *   - THREE 由外部提供（挂在 window.THREE 上），本模块按需读取，
 *     不直接 import three，避免把 700KB 的库打进主包
 *   - THREE.OrbitControls 可能缺失，此时退化为「无交互的静态 3D」，
 *     而不是直接抛错导致整个 3D 模式黑屏
 */
export class Visualization3D {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      throw new Error(`Visualization3D: 未找到容器 #${containerId}`);
    }

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.bars = [];
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;
    this.frameId = null;

    // 绑定一次，保证 add/removeEventListener 用的是同一个引用
    this.handleResize = this.onWindowResize.bind(this);

    this.init();
  }

  init() {
    const THREE = window.THREE;
    if (!THREE) {
      throw new Error('Visualization3D: THREE 未加载');
    }

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff);

    this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
    this.camera.position.set(0, 5, 15);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.width, this.height);
    this.renderer.shadowMap.enabled = true;
    this.container.appendChild(this.renderer.domElement);

    this.initControls(THREE);

    this.addLights(THREE);
    this.addGround(THREE);
    this.animate();

    window.addEventListener('resize', this.handleResize);
  }

  /**
   * OrbitControls 在新版 three 中只提供 ESM 版本（examples/jsm），
   * 通过 <script> 以 UMD 方式引入会 404。缺失时不阻断渲染，
   * 仅失去鼠标交互能力。
   */
  initControls(THREE) {
    if (typeof THREE.OrbitControls !== 'function') {
      console.warn('[3D] THREE.OrbitControls 不可用，已跳过轨道控制（3D 静态展示）');
      return;
    }

    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.minDistance = 5;
    this.controls.maxDistance = 30;
    this.controls.maxPolarAngle = Math.PI / 2;
  }

  addLights(THREE) {
    this.scene.add(new THREE.AmbientLight(0x404040, 0.6));

    const keyLight = new THREE.DirectionalLight(0xffffff, 0.8);
    keyLight.position.set(5, 10, 7.5);
    keyLight.castShadow = true;
    this.scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-5, 5, -5);
    this.scene.add(fillLight);
  }

  addGround(THREE) {
    const geometry = new THREE.PlaneGeometry(20, 20);
    const material = new THREE.MeshStandardMaterial({
      color: 0xf0f0f0,
      roughness: 0.8,
      metalness: 0.2,
    });
    const ground = new THREE.Mesh(geometry, material);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.01;
    ground.receiveShadow = true;
    this.scene.add(ground);
  }

  /**
   * 渲染一帧数组
   * @param {number[]} values 数值数组
   * @param {number[]} highlightIndices 当前比较中的索引
   * @param {number[]} sortedIndices 已排定的索引
   */
  renderArray(values, highlightIndices = [], sortedIndices = []) {
    const THREE = window.THREE;
    this.clearBars();
    if (!values || values.length === 0) return;

    const maxValue = Math.max(...values);
    const total = values.length;
    const barWidth = 0.3;
    const span = 0.4 * total;

    values.forEach((value, index) => {
      const height = (value / maxValue) * 8;
      const x = 0.4 * index - span / 2 + 0.15;
      const y = height / 2;

      let color;
      if (sortedIndices.includes(index)) {
        color = 0x10b981; // 已排定：绿
      } else if (highlightIndices.includes(index)) {
        color = highlightIndices.length === 2 ? 0xef4444 : 0xf59e0b; // 比较中：红 / 橙
      } else {
        color = 0x6366f1; // 默认：靛蓝
      }

      const geometry = new THREE.BoxGeometry(barWidth, height, 0.3);
      const material = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.5,
        metalness: 0.3,
      });
      const bar = new THREE.Mesh(geometry, material);
      bar.position.set(x, y, 0);
      bar.castShadow = true;

      this.scene.add(bar);
      this.bars.push(bar);
    });
  }

  clearBars() {
    for (const bar of this.bars) {
      this.scene.remove(bar);
      bar.geometry.dispose();
      bar.material.dispose();
    }
    this.bars = [];
  }

  animate() {
    this.frameId = requestAnimationFrame(() => this.animate());
    if (this.controls) this.controls.update();
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  onWindowResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }

  destroy() {
    window.removeEventListener('resize', this.handleResize);
    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }
    this.clearBars();
    if (this.renderer) {
      this.renderer.dispose();
      if (this.container.contains(this.renderer.domElement)) {
        this.container.removeChild(this.renderer.domElement);
      }
    }
    if (this.controls) this.controls.dispose();
  }
}
