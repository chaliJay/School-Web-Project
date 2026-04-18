const originalSetItem = localStorage.setItem;

localStorage.setItem = function(key, value) {
  console.trace("localStorage.setItem called:", key, value);
  originalSetItem.apply(this, arguments);
};
const userId = localStorage.getItem("userId");

console.log("UserId:", userId);

if (!userId) {
  alert("User not logged in properly");
  window.location.href = "login.html";
}
fetch(`https://backend-school-web-project.onrender.com/profile/${userId}`)
  .then(res => {
    if (!res.ok) throw new Error("Failed to fetch profile");
    return res.json();
  })
  .then(data => {
    console.log("Profile data:", data);

    document.getElementById("name").textContent = data.username;
    document.getElementById("email").textContent = data.email;
    document.getElementById("gender").textContent = data.gender;
    document.getElementById("birthday").textContent = data.birthday;
  })
  .catch(err => console.error("ERROR:", err));