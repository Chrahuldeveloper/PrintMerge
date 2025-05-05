const uploadimg = document.querySelector("#uploadimg");
const uploadimgbtn = document.querySelector("#uploadimgbtn");
const previewimg = document.querySelector("#preview");
const preview = document.querySelector("#previewimages");
const previewTxt = document.querySelector("#previewTxt");
const disableBtn = document.querySelector("#disableBtn");

uploadimgbtn.addEventListener("click", () => {
  uploadimg.click();

  uploadimg.addEventListener("change", () => {
    const files = uploadimg.files;
    for (let file of files) {
      const imgURL = URL.createObjectURL(file);
      previewTxt.classList.add("hidden");
      const imgPreview = document.createElement("img");
      imgPreview.src = imgURL;
      imgPreview.className = "object-cover m-2 rounded-md w-52 h-52";
      preview.appendChild(imgPreview);
    }
  });
});

const downloadBtn = document.getElementById("downloadBtn");
const canvas = document.getElementById("mergeCanvas");
const ctx = canvas.getContext("2d");

downloadBtn.addEventListener("click", async () => {
  const files = uploadimg.files;
  if (files.length === 0) return alert("Upload images first!");

  const images = await Promise.all(
    Array.from(files).map((file) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = URL.createObjectURL(file);
      });
    })
  );

  const cols = 3;
  const rows = Math.ceil(images.length / cols);
  const imgWidth = 500;
  const imgHeight = 500;

  canvas.width = cols * imgWidth;
  canvas.height = rows * imgHeight;

  images.forEach((img, index) => {
    const x = (index % cols) * imgWidth;
    const y = Math.floor(index / cols) * imgHeight;
    ctx.drawImage(img, x, y, imgWidth, imgHeight);
  });

  const url = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = url;
  link.download = "image.png";
  link.click();
});

document.addEventListener("DOMContentLoaded", () => {
  const files = uploadimg.files;
  if (!files || files.length === 0) {
    downloadBtn.disabled = true;
    downloadBtn.classList.add("hidden");
    disableBtn.classList.remove("hidden");
  }
});

uploadimg.addEventListener("change", () => {
  downloadBtn.classList.remove("hidden");
  disableBtn.classList.add("hidden");
});
