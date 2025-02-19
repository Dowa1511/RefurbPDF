
const dropArea = document.getElementById("drop-area");
const fileInput = document.getElementById("fileInput");

dropArea.addEventListener("click", () => fileInput.click());
dropArea.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropArea.style.background = "rgba(255, 0, 0, 0.5)";
});
dropArea.addEventListener("dragleave", () => {
    dropArea.style.background = "#222";
});
dropArea.addEventListener("drop", (event) => {
    event.preventDefault();
    dropArea.style.background = "#222";
    const files = event.dataTransfer.files;
    if (files.length) {
        alert(`File uploaded: ${files[0].name}`);
    }
});