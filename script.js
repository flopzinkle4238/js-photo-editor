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
      addEventOnCanvases();
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
}

function addEventOnCanvases() {
  canvasList.forEach((c) => {
    c.addEventListener("click", () => {
      removeSelectedClasses();
      c.classList.add("selectedCanvas");
      currentCanvas = c;
    });
  });
}

function removeSelectedClasses() {
  canvasList.forEach((c) => {
    c.classList.remove("selectedCanvas");
  });
}
