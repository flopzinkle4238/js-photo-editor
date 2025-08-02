const addImageInput = document.getElementById("add-image-input");
const addImageButton = document.getElementById("add-image-btn");
const container = document.querySelector(".container");

let imageCount = 0;
let currentCanvas = null;
let canvasList = document.querySelectorAll(".vas");

addImageButton.addEventListener("click", () => {
  addImageInput.click();
});

addImageInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const myCanvas = createCanvas(`canvas-${imageCount++}`);
      drawImageOnCanvas(myCanvas, img);
      container.appendChild(myCanvas);
      updateCanvasList();
    };
  }
});

function createCanvas(id) {
  const canvas = document.createElement("canvas");
  canvas.id = id;
  canvas.className = "canvas-block";
  return canvas;
}

function drawImageOnCanvas(myCanvas, img) {
  const context = myCanvas.getContext("2d");
  myCanvas.height = img.naturalHeight;
  myCanvas.width = img.naturalWidth;
  context.drawImage(img, 0, 0);
}

function updateCanvasList() {
  canvasList = document.querySelectorAll(".canvas-block");

  canvasList.forEach((canvas) => {
    let isDragging = false;
    let offsetX, offsetY;

    canvas.addEventListener("mousedown", (e) => {
      if (e.button !== 0) return; // Only left-click
      removeSelectedClasses();
      canvas.classList.add("selectedCanvas");
      currentCanvas = canvas;
      isDragging = true;
      offsetX = e.clientX - canvas.offsetLeft;
      offsetY = e.clientY - canvas.offsetTop;
      canvas.style.cursor = "grabbing";
      currentCanvas = canvas;
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;

      let newLeft = e.clientX - offsetX;
      let newTop = e.clientY - offsetY;

      newLeft = Math.max(0, newLeft);
      newTop = Math.max(0, newTop);

      canvas.style.left = `${newLeft}px`;
      canvas.style.top = `${newTop}px`;
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
      canvas.style.cursor = "grab";
    });
  });
}

function removeSelectedClasses() {
  canvasList.forEach((c) => {
    c.classList.remove("selectedCanvas");
  });
}

container.addEventListener("click", (e) => {
  if (!e.target.classList.contains("canvas-block")) {
    currentCanvas = null;
    removeSelectedClasses();
  }
});

let scrollView = false;
let scrollY;
let scrollX;
container.addEventListener("mousedown", (e) => {
  if (e.button === 1) {
    scrollView = true;
    scrollX = e.clientX;
    scrollY = e.clientY;
  }
});

container.addEventListener("mouseup", (e) => {
  scrollView = false;
  scrollY = null;
  scrollX = null;
});

container.addEventListener("mousemove", (e) => {
  if (!scrollView) return;
  let deltaX = e.clientX - scrollX;
  let deltaY = e.clientY - scrollY;

  container.scrollLeft -= deltaX;
  container.scrollTop -= deltaY;

  scrollX = e.clientX;
  scrollY = e.clientY;
});
