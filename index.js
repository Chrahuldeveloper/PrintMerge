const uploadimg = document.querySelector("#uploadimg");
const uploadimgbtn = document.querySelector("#uploadimgbtn");
const previewimg = document.querySelector("#preview");
const preview = document.querySelector("#previewimages");
const previewTxt = document.querySelector("#previewTxt");

uploadimgbtn.addEventListener("click", () => {
  uploadimg.click();

  uploadimg.addEventListener("change", () => {
    const files = uploadimg.files;
    for (let file of files) {
      const imgURL = URL.createObjectURL(file);
      previewTxt.classList.add("hidden");
      const imgPreview = document.createElement("img");
      imgPreview.src = imgURL;
      imgPreview.className = "w-32 h-32 object-cover m-2 rounded-md";
      preview.appendChild(imgPreview);
    }
  });
});
