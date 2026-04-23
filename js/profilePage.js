const BACKEND_ROOT_URL = 'https://backend-school-web-project.onrender.com';

const user = JSON.parse(localStorage.getItem("user"));
const userId = localStorage.getItem("userId");

console.log("User from localStorage:", user);
//console.log("UserId:", userId);

if (!user || !userId) {
  alert("User not logged in properly");
  window.location.href = "login.html";
}

document.getElementById("username").textContent = user.username;
document.getElementById("name").textContent = user.fullname;
document.getElementById("email").textContent = user.email;
document.getElementById("gender").textContent = user.gender ? user.gender : "Not available";
document.getElementById("birthday").textContent = user.birthday ? user.birthday.split("T")[0]: "Not set";

// 1. ADD THIS LINE at the top of your file
const fields = ["username", "name", "email", "gender", "birthday"];

const editBtn = document.getElementById("edit-btn");
const btnContainer = document.getElementById("button-container");
let isEditing = false;

editBtn.addEventListener("click", async () => {
    // 2. Wrap this in a check to ensure the element exists
    const passwordContainer = document.getElementById("password-container");

    if (!isEditing) {
        isEditing = true;
        editBtn.textContent = "Save Changes";

        const cancelBtn = document.createElement("button");
        cancelBtn.id = "cancel-btn";
        cancelBtn.textContent = "Cancel";
        cancelBtn.style.marginLeft = "10px";
        cancelBtn.onclick = () => location.reload();
        btnContainer.appendChild(cancelBtn);

        fields.forEach(id => {
          const displayDiv = document.getElementById(id);
          if (displayDiv) {
            const currentVal = displayDiv.textContent.trim();
            if (id === "gender") {
              // Create a dropdown for gender
              displayDiv.innerHTML = `
                <select id="input-gender">
                    <option value="Male" ${currentVal === 'Male' ? 'selected' : ''}>Male</option>
                    <option value="Female" ${currentVal === 'Female' ? 'selected' : ''}>Female</option>
                    <option value="Prefer not to say" ${currentVal === 'Prefer not to say' || currentVal === 'Not available' ? 'selected' : ''}>Rather not say</option>
                </select>`;
            } else if (id === "birthday") {
              // Use a proper date picker for birthday
              displayDiv.innerHTML = `<input type="date" id="input-birthday" value="${currentVal === 'Not set' ? '' : currentVal}">`;
            } else {
              // Standard text input for everything else
              displayDiv.innerHTML = `<input type="text" id="input-${id}" value="${currentVal === 'Not available' ? '' : currentVal}">`;
            }
        } 
    });
        if (passwordContainer) {
            passwordContainer.innerHTML = `<input type="password" id="input-password" placeholder="New password (optional)">`;
        }

    } else {
        // 1. Grab the elements (using the names you already defined: getUserName, getName, etc.)
        const getUserName = document.getElementById("input-username");
        const getName = document.getElementById("input-name");
        const getEmail = document.getElementById("input-email");
        const getGender = document.getElementById("input-gender");
        const getDob = document.getElementById("input-birthday");
        const getPass = document.getElementById("input-password");

        // 2. Safety check: make sure they exist
        if (!getUserName || !getName || !getEmail || !getGender || !getDob) {
            console.error("One or more input fields were not found in the DOM.");
            return;
        }

        // 3. Get values and split the name
        const userName = getUserName.value.trim();
        const fullName = getName.value.trim();
        const email = getEmail.value.trim();
        const gender = getGender.value.trim();
        const dob = getDob.value.trim();
        const passwordInput = getPass ? getPass.value.trim() : "";

        // SPLIT NAME LOGIC
        const nameParts = fullName.split(" ");
        const firstName = nameParts[0]; // First word
        const lastName = nameParts.slice(1).join(" "); // Everything else

        // 4. Validation
        if (!userName || !fullName || !email || !gender || !dob) {
            alert("All fields (except password) are required.");
            return;
        }

        // 5. Build data object with separate names
        const updatedData = {
            userName: userName,
            firstName: firstName,
            lastName: lastName || "", // Send empty string if no last name
            dob: dob,
            gender: gender,
            email: email
          };
        if (passwordInput !== "") {
            updatedData.password = passwordInput;
          }
        try {
            const response = await fetch(`${BACKEND_ROOT_URL}/edit/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData)
            });

            if (response.ok) {
                const currentUser = JSON.parse(localStorage.getItem("user"));
                localStorage.setItem("user", JSON.stringify({ 
                    ...currentUser, 
                    username: userName, 
                    fullname: fullName, 
                    email: email, 
                    gender: gender, 
                    birthday: dob 
                }));
                alert("Profile updated!");
                location.reload();
            } else {
                alert("Update failed.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
});