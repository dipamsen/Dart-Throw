AFRAME.registerComponent("scene-move", {
  init() {
    window.addEventListener("mousemove", (e) => {
      const cam = document.querySelector("#player");
      // console.log(e.offsetX, e.offsetY);
      cam.object3D.rotation.y = -(e.offsetX - window.innerWidth / 2) / 1000;
      cam.object3D.rotation.x = -(e.offsetY - window.innerHeight / 2) / 1000;
    });
  },
});
