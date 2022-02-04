let SCORE = 0;
let RELOAD = 60;
let totalDarts = 0;
let totalHits = 0;

AFRAME.registerComponent("dart-throw", {
  init() {
    document.addEventListener("keydown", (e) => {
      if (e.key === " ") {
        this.shoot();
      }
    });
  },
  shoot() {
    if (this.canShoot()) {
      const scene = document.querySelector("#scene");
      const cam = document.querySelector("#player");
      const pos = cam.getAttribute("position");
      const dart = document.createElement("a-entity");
      dart.className = "dart";
      const dir = cam.object3D.getWorldDirection();
      dart.setAttribute("out-of-bounds-destroy", {});
      dart.setAttribute("position", { x: pos.x, y: pos.y, z: pos.z });
      dart.setAttribute("material", { color: "blue" });
      dart.setAttribute("geometry", { primitive: "sphere", radius: 0.1 });
      dart.setAttribute("dynamic-body", { shape: "sphere", mass: 0 });
      dart.setAttribute("velocity", dir.multiplyScalar(-10));
      dart.addEventListener("collide", (e) => this.handleCollision(e));
      scene.append(dart);
      totalDarts++;
      this.updateHitCount();
      RELOAD = 60;
    }
  },
  updateHitCount() {
    const domElt = document.querySelector(".hit-miss");
    domElt.innerText = `${totalHits}/${totalDarts}`;
  },
  tick() {
    if (RELOAD > 0) RELOAD--;

    const reloadBar = document.querySelector("#reload-bar");
    reloadBar.style.backgroundColor = "red";
    reloadBar.style.width = `${100 - (RELOAD / 60) * 100}%`;
    if (RELOAD === 0) {
      reloadBar.style.width = "100%";
      reloadBar.style.backgroundColor = "green";
    }
  },
  canShoot() {
    return RELOAD === 0;
  },
  handleCollision(e) {
    if (e.detail.body.el.id !== "board") return;
    totalHits++;
    this.updateHitCount();
    this.addScore(10);
  },
  addScore(num) {
    return this.updateScore(SCORE + num);
  },
  updateScore(num) {
    const scoreDiv = document.querySelector(".score");
    SCORE = num;
    scoreDiv.innerText = num;
  },
});

AFRAME.registerComponent("dart-board", {
  init() {
    this.el.setAttribute("velocity", { x: 2, y: 0, z: 0 });
  },
  tick() {
    const pos = this.el.object3D.position;
    if (pos.x > 10) {
      this.el.setAttribute("velocity", { x: -2, y: 0, z: 0 });
    }
    if (pos.x < -10) {
      this.el.setAttribute("velocity", { x: 2, y: 0, z: 0 });
    }
  },
});

AFRAME.registerComponent("out-of-bounds-destroy", {
  tick() {
    if (this.el.object3D.position.z < -75) {
      this.destroy();
    }
  },
  destroy() {
    const scene = document.querySelector("#scene");
    scene.removeChild(this.el);
  },
});
