const uploadimg = document.querySelector("#uploadimg");
const uploadimgbtn = document.querySelector("#uploadimgbtn");
const preview = document.getElementById("previewimages");
const disableBtn = document.querySelector("#disableBtn");
const canvas = document.getElementById("mergeCanvas");
const uploadbtnimage = document.getElementById("uploadbtnimage");
const uploadbtnpdf = document.getElementById("uploadbtnpdf");
const ctx = canvas.getContext("2d");
const uploadImage = document.getElementById("uploadImage");
const uploadPDF = document.getElementById("uploadPDF");
const uploadpdf = document.getElementById("uploadpdf");
const uploadpdfbtn = document.getElementById("uploadpdfbtn");
const previewbox = document.getElementById("previewbox");
const downloadBtn = document.getElementById("downloadBtn");
const downloadpdfBtn = document.getElementById("downloadpdfBtn");

let imageFiles = [];
let pdfFiles = [];

const renderUi = (files, type) => {
  preview.innerHTML = "";

  files.forEach((file, index) => {
    const divEle = document.createElement("div");
    const pTag = document.createElement("p");
    const iTag = document.createElement("i");

    pTag.innerHTML = file.name;
    divEle.classList =
      "flex items-center justify-between p-4 bg-white rounded-lg w-52";
    pTag.classList = "max-w-sm text-xs";
    iTag.classList = "fa-solid fa-xmark cursor-pointer";

    iTag.addEventListener("click", () => {
      if (type === "image") {
        imageFiles.splice(index, 1);
        renderUi(imageFiles, "image");
        if (imageFiles.length === 0) downloadBtn.classList.add("hidden");
      } else if (type === "pdf") {
        pdfFiles.splice(index, 1);
        renderUi(pdfFiles, "pdf");
        if (pdfFiles.length === 0) downloadpdfBtn.classList.add("hidden");
      }
    });

    divEle.appendChild(pTag);
    divEle.appendChild(iTag);
    preview.appendChild(divEle);
  });
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

uploadimg.addEventListener("change", () => {
  imageFiles = Array.from(uploadimg.files);
  previewbox.classList.remove("hidden");
  renderUi(imageFiles, "image");
  downloadBtn.classList.remove("hidden");
});

uploadpdf.addEventListener("change", () => {
  pdfFiles = Array.from(uploadpdf.files);
  previewbox.classList.remove("hidden");
  renderUi(pdfFiles, "pdf");
  downloadpdfBtn.classList.remove("hidden");
});

downloadBtn.addEventListener("click", async () => {
  if (imageFiles.length === 0) return alert("Upload images first!");

  const images = await Promise.all(
    imageFiles.map((file) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = URL.createObjectURL(file);
      });
    })
  );

  const cols = 3;
  const rows = Math.ceil(images.length / cols);
  const imgWidth = 700;
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

downloadpdfBtn.addEventListener("click", async () => {
  if (pdfFiles.length === 0) return alert("Upload PDFs first!");

  const mergedPdf = await PDFLib.PDFDocument.create();

  for (const file of pdfFiles) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFLib.PDFDocument.load(arrayBuffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());

    copiedPages.forEach((page) => {
      mergedPdf.addPage(page);
    });
  }

  const mergedPdfBytes = await mergedPdf.save();
  const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "merged.pdf";
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
