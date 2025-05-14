const uploadimg = document.querySelector("#uploadimg");
const uploadimgbtn = document.querySelector("#uploadimgbtn");
const preview = document.getElementById("previewimages");
const disableBtn = document.querySelector("#disableBtn");
const downloadBtn = document.getElementById("downloadBtn");
const canvas = document.getElementById("mergeCanvas");
const uploadbtnimage = document.getElementById("uploadbtnimage");
const uploadbtnpdf = document.getElementById("uploadbtnpdf");
const ctx = canvas.getContext("2d");
const uploadImage = document.getElementById("uploadImage");
const uploadPDF = document.getElementById("uploadPDF");

const uploadpdf = document.getElementById("uploadpdf");
const uploadpdfbtn = document.getElementById("uploadpdfbtn");

const renderUi = (files) => {
  for (let file of files) {
    const divEle = document.createElement("div");
    const pTag = document.createElement("p");
    const iTag = document.createElement("i");
    pTag.innerHTML = file.name;
    divEle.classList =
      "flex items-center justify-between p-4 bg-white rounded-lg w-52";
    pTag.classList = "max-w-sm text-xs";
    iTag.classList = "fa-solid fa-xmark";
    divEle.appendChild(pTag);
    divEle.appendChild(iTag);
    preview.appendChild(divEle);
  }
};

const hideAndSeek = (Ele1, Ele2) => {
  Ele1.classList.remove("hidden");
  Ele2.classList.add("hidden");
};

uploadimgbtn.addEventListener("click", () => {
  uploadimg.click();
});

uploadpdfbtn.addEventListener("click", () => {
  uploadpdf.click();
});

uploadpdf.addEventListener("change", () => {
  const files = uploadpdf.files;
  renderUi(files);
});

uploadimg.addEventListener("change", () => {
  const files = uploadimg.files;
  renderUi(files);
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
  hideAndSeek(uploadImage, uploadPDF);
});

uploadbtnpdf.addEventListener("click", () => {
  if (uploadbtnimage.classList.contains("bg-[#f1f5f9]")) {
    uploadbtnimage.classList.remove("bg-[#f1f5f9]");
  }
  uploadbtnpdf.classList.add("bg-[#f1f5f9]");
  hideAndSeek(uploadPDF, uploadImage);
});
