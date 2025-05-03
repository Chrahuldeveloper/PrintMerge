const uploadimg = document.querySelector("#uploadimg");
const uploadimgbtn = document.querySelector("#uploadimgbtn");
const previewimg = document.querySelector("#preview");
const previewTxt = document.querySelector("#previewTxt");

uploadimgbtn.addEventListener("click", () => {
  uploadimg.click();

  uploadimg.addEventListener("change", () => {
    const files = uploadimg.files;
    for (let file of files) {
      const imgURL = URL.createObjectURL(file);
      console.log(imgURL);
      previewimg.src = imgURL
      previewTxt.classList.add("hidden")
    }
  });
});
