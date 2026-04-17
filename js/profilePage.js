const user = JSON.parse(localStorage.getItem("user"));

console.log(user); // ✅ check if id exists

if (!user || !user.id) {
  alert("User not logged in properly");
  window.location.href = "login.html";
}

// ✅ IMPORTANT: include /api
fetch(`https://backend-school-web-project.onrender.com/api/profile/${user.id}`)
  .then(res => res.json())
  .then(data => {
    console.log(data);

    document.getElementById("name").textContent = data.username;
    document.getElementById("email").textContent = data.email;
    document.getElementById("gender").textContent = data.gender;
    document.getElementById("birthday").textContent = data.birthday;
  })
  .catch(err => console.error(err));