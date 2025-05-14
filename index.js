const uploadimg = document.querySelector("#uploadimg");
const uploadimgbtn = document.querySelector("#uploadimgbtn");
const preview = document.querySelector("#previewimages");
const previewTxt = document.querySelector("#previewTxt");
const disableBtn = document.querySelector("#disableBtn");
const downloadBtn = document.getElementById("downloadBtn");
const canvas = document.getElementById("mergeCanvas");
const uploadbtnimage = document.getElementById("uploadbtnimage");
const uploadbtnpdf = document.getElementById("uploadbtnpdf");
const ctx = canvas.getContext("2d");
const uploadImage = document.getElementById("uploadImage");
const uploadPDF = document.getElementById("uploadPDF");

uploadimgbtn.addEventListener("click", () => {
  uploadimg.click();
});

uploadimg.addEventListener("change", () => {
  const files = uploadimg.files;
  preview.innerHTML = "";

  if (files.length === 0) {
    previewTxt.classList.remove("hidden");
    downloadBtn.classList.add("hidden");
    disableBtn.classList.remove("hidden");
    return;
  }

  previewTxt.classList.add("hidden");
  downloadBtn.classList.remove("hidden");
  disableBtn.classList.add("hidden");

  for (let file of files) {
    const divEle = document.createElement("div");
    const pTag = document.createElement("p");
    pTag.innerHTML = file.name;
    divEle.classList =
      "px-8 py-2.5 rounded-lg shadow-xl shadow-gray-800 cursor-pointer text-sm w-28 bg-white";
    divEle.appendChild(pTag);
    preview.appendChild(divEle);
  }
});

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
  const imgWidth = 600;
  const imgHeight = 600;

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
  link.download = "merged-image.png";
  link.click();
});

uploadbtnimage.addEventListener("click", () => {
  if (uploadbtnpdf.classList.contains("bg-[#f1f5f9]")) {
    uploadbtnpdf.classList.remove("bg-[#f1f5f9]");
  }
  uploadbtnimage.classList.add("bg-[#f1f5f9]");
  uploadImage.classList.remove("hidden");
  uploadPDF.classList.add("hidden");
});

uploadbtnpdf.addEventListener("click", () => {
  if (uploadbtnimage.classList.contains("bg-[#f1f5f9]")) {
    uploadbtnimage.classList.remove("bg-[#f1f5f9]");
  }
  uploadbtnpdf.classList.add("bg-[#f1f5f9]");
  uploadPDF.classList.remove("hidden");
  uploadImage.classList.add("hidden");
});
