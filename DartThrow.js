let SCORE = 0;

AFRAME.registerComponent("dart-throw", {
  init() {
    document.addEventListener("keydown", (e) => {
      if (e.key === " ") {
        console.log("Shoot!");
        this.shoot();
      }
    });
  },
  shoot() {
    const scene = document.querySelector("#scene");
    const cam = document.querySelector("#camera");
    const pos = cam.getAttribute("position");
    const dart = document.createElement("a-entity");
    dart.id = "dart";
    const dir = cam.object3D.getWorldDirection();
    dart.setAttribute("position", { x: pos.x, y: pos.y, z: pos.z });
    dart.setAttribute("material", { color: "blue" });
    dart.setAttribute("geometry", { primitive: "sphere", radius: 0.1 });
    dart.setAttribute("dynamic-body", { shape: "sphere", mass: 0 });
    dart.setAttribute("velocity", dir.multiplyScalar(-10));
    dart.addEventListener("collide", (e) => this.handleCollision(e));
    scene.append(dart);
  },
  handleCollision(e) {
    if (e.detail.body.el.id !== "board") return;
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
