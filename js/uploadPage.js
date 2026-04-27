const BACKEND_ROOT_URL = 'https://backend-school-web-project.onrender.com';

const user = JSON.parse(localStorage.getItem("user"));
const userId = localStorage.getItem("userId");
if (!user || !userId) {
  alert("User not logged in properly");
  window.location.href = "login.html";
}

const upload_btn = document.getElementById("upload-btn");
const cancel_btn = document.getElementById("cancel-btn");
const loading_area = document.getElementById("loading-area");

upload_btn.hidden= true; // Hide the button until we verify all fields are filled

const form =document.getElementById("upload-form");
const requiredFields = ["video-title-input", "video-description-input", "video-file-input", "thumbnail-input"];

form.addEventListener("input", () => {
  const allFilled = requiredFields.every(field => {
        const element = document.getElementById(field);// Safety check: ensure the element exists
        if (!element) return false; // Safety check: if element is missing, field is not filled

        if (element.type === "file") {
            return element.files && element.files.length > 0;
        } else {
            // Trim and check if the value is not empty
            return element.value.trim() !== "";
        }
    });
    upload_btn.hidden = !allFilled;
});

// --- CANCEL LOGIC ---
cancel_btn.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear the form?")) {
        form.reset();
        upload_btn.hidden = true;
    }
});

// --- UPLOAD LOGIC ---
upload_btn.addEventListener("click", async function(event) {
  event.preventDefault();
  // Show loading, hide buttons so they can't click twice
    loading_area.style.display = "block";
    upload_btn.style.display = "none";
    cancel_btn.style.display = "none";
  const form =document.getElementById("upload-form");
  const formData = new FormData(form);
  formData.append("userId", userId);
    try {
        const response = await fetch(`${BACKEND_ROOT_URL}/api/upload`, {
            method: "POST",
            body: formData
        });
        if (response.ok) {
            form.reset();// Clears the inputs

            // Clear file input manually since form.reset() doesn't always work for file inputs
            document.getElementById("video-file-input").value = "";
            document.getElementById("thumbnail-input").value = "";
            upload_btn.hidden = true;
            alert("Video uploaded successfully!");
        }else {
            alert("Upload failed.");
        }
    } catch (error) {
        console.error(error);
        alert("A network error occurred.");
    } finally {
        // --- CLEANUP ---
        // Always hide loading and show buttons again (even if upload failed)
        loading_area.style.display = "none";
        upload_btn.style.display = "inline-block";
        cancel_btn.style.display = "inline-block";
    }
});
