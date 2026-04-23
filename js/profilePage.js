const BACKEND_ROOT_URL = 'https://backend-school-web-project.onrender.com';

const user = JSON.parse(localStorage.getItem("user"));
const userId = localStorage.getItem("userId");

console.log("User from localStorage:", user);
//console.log("UserId:", userId);

if (!user || !userId) {
  alert("User not logged in properly");
  window.location.href = "login.html";
}

async function loadProfileDetails() {
  try {
      const response = await fetch(`${BACKEND_ROOT_URL}/profile/${userId}`);
      const data = await response.json();
      document.getElementById("username").textContent = data.username;
      document.getElementById("name").textContent = data.fullname;
      document.getElementById("email").textContent = data.email;
      document.getElementById("gender").textContent = data.gender ? data.gender : "Not available";
      document.getElementById("birthday").textContent = data.birthday ? data.birthday.split("T")[0] : "Not set";
    } 
    catch (error) {
    console.error("Error fetching profile details:", error);
    }
}
loadProfileDetails();
  //console.log(user)
  async function EditClick(id){

  }