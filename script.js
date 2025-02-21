
document.addEventListener("DOMContentLoaded", function () {
  const uploadArea = document.querySelector(".upload-area");
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.style.display = "none";
  document.body.appendChild(fileInput);

  uploadArea.addEventListener("click", function () {
    fileInput.click();
  });

  uploadArea.addEventListener("dragover", function (event) {
    event.preventDefault();
    uploadArea.style.borderColor = "#FFD700";
  });

  uploadArea.addEventListener("dragleave", function () {
    uploadArea.style.borderColor = "#FF3131";
  });

  uploadArea.addEventListener("drop", function (event) {
    event.preventDefault();
    uploadArea.style.borderColor = "#FF3131";
    const files = event.dataTransfer.files;
    alert("File uploaded: " + files[0].name);
  });

  fileInput.addEventListener("change", function () {
    if (fileInput.files.length > 0) {
      alert("File uploaded: " + fileInput.files[0].name);
    }
  });
});