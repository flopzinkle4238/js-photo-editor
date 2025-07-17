const addImageButton = document.getElementById("add-image");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

addImageButton.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      canvas.height = img.naturalHeight;
      canvas.width = img.naturalWidth;
      context.drawImage(img, 0, 0);
    };
  }
});

