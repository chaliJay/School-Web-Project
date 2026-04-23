const BACKEND_ROOT_URL = 'https://backend-school-web-project.onrender.com';

const user = JSON.parse(localStorage.getItem("user"));
const userId = localStorage.getItem("userId");

//console.log("User from localStorage:", user);
//console.log("UserId:", userId);

if (!user || !userId) {
  alert("User not logged in properly");
  window.location.href = "login.html";
}

window.onload = function() {
    loadProfileDetails();
};
async function loadProfileDetails() {
  const response = await fetch(`${BACKEND_ROOT_URL}/profile/${userId}`);
  if (!response.ok) {
    alert("Failed to load profile details");
    return;
  }
  const profileData = await response.json();
  document.getElementById("username").textContent = profileData.username;
  document.getElementById("name").textContent = profileData.fullname;
  document.getElementById("email").textContent = profileData.email;
  document.getElementById("gender").textContent = profileData.gender ? profileData.gender : "Not available";
  document.getElementById("birthday").textContent = profileData.birthday ? profileData.birthday.split("T")[0]: "Not set";
}