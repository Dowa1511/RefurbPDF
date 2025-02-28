
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
    console.log(files)
    previewFile(fileInput.files[0]);
    alert("File uploading: " + files[0].name);
    uploadFile(files[0]); // Call the API here
    
  });

  fileInput.addEventListener("change", function () {
    if (fileInput.files.length > 0) {
      previewFile(fileInput.files[0]);
      alert("File uploading: " + fileInput.files[0].name);
      uploadFile(fileInput.files[0]); // Call the API here
    }
  });
});

// document.getElementById("uploadArea").addEventListener("click", function() {
//   document.getElementById("fileInput").click();
// });

// document.getElementById("uploadArea").addEventListener("dragover", function(event) {
//   event.preventDefault();
//   this.style.borderColor = "#FF007F";
// });

// document.getElementById("uploadArea").addEventListener("dragleave", function(event) {
//   this.style.borderColor = "#319EFF";
// });

// document.getElementById("uploadArea").addEventListener("drop", function(event) {
//   event.preventDefault();
//   this.style.borderColor = "#319EFF";
//   let files = event.dataTransfer.files;
//   if (files.length > 0) {
//       alert("PDF Uploaded: " + files[0].name);
//   }
// });





// Function to preview the PDF file using an embed element
function previewFile(file) {
  if (file.type !== "application/pdf") {
    alert("Only PDF files can be previewed.");
    return;
  }
  const fileURL = URL.createObjectURL(file);
  const previewContainer = document.getElementById("previewContainer");
    // Clear previous preview content
    previewContainer.innerHTML = "";


  const embedEl = document.createElement("embed");
  embedEl.src = fileURL;
  embedEl.type = "application/pdf";
  embedEl.style.width = "100%";
  embedEl.style.height = "1000%";
  previewContainer.appendChild(embedEl);
}





 // Function that sends the file to your backend API
function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);
  // If your backend requires additional fields (like a userId), append them here:
  // formData.append("userId", "YOUR_USER_ID_HERE");

  fetch("http://localhost:5000/api/file/upload", {
    method: "POST",
    body: formData,
    // Do not set Content-Type; let the browser set it automatically with the correct boundary
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Only PDF files are accepted: ");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Upload success:", data);
      alert("File uploaded successfully: " + data.file.filename);
    })
    .catch((error) => {
      console.error("Error uploading file:", error);
      alert("Error uploading file: " + error.message);
    });
}





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

