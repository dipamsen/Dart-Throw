AFRAME.registerComponent("player-movement", {
  init() {
    // move with arrow keys
    window.addEventListener("keydown", (e) => {
      const pos = this.el.getAttribute("position");
      if (e.key == "ArrowLeft") {
        pos.x -= 0.3;
      }
      if (e.key == "ArrowRight") {
        pos.x += 0.3;
      }
      if (e.key == "ArrowUp") {
        pos.z -= 0.3;
      }
      if (e.key == "ArrowDown") {
        pos.z += 0.3;
      }
      document.querySelector("#camera").setAttribute("position", pos);
    });
  },
});
