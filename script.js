
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
document.getElementById("uploadArea").addEventListener("click", function() {
  document.getElementById("fileInput").click();
});

document.getElementById("uploadArea").addEventListener("dragover", function(event) {
  event.preventDefault();
  this.style.borderColor = "#FF007F";
});

document.getElementById("uploadArea").addEventListener("dragleave", function(event) {
  this.style.borderColor = "#319EFF";
});

document.getElementById("uploadArea").addEventListener("drop", function(event) {
  event.preventDefault();
  this.style.borderColor = "#319EFF";
  let files = event.dataTransfer.files;
  if (files.length > 0) {
      alert("PDF Uploaded: " + files[0].name);
  }
});

function rotatePDF() {
  alert("Rotate feature coming soon!");
}

function cropPDF() {
  alert("Crop feature coming soon!");
}

function mergePDF() {
  alert("Merge feature coming soon!");
}

function splitPDF() {
  alert("Split feature coming soon!");
}

function compressPDF() {
  alert("Compress feature coming soon!");
}

function extractText() {
  alert("Extract text feature coming soon!");
}

function addWatermark() {
  alert("Watermark feature coming soon!");
}

function convertToWord() {
  alert("Convert to Word feature coming soon!");
}

function convertToImage() {
  alert("Convert to Image feature coming soon!");
}

function performOCR() {
  alert("OCR (Extract text from scanned PDFs) feature coming soon!");
}

