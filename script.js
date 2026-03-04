// current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Scroll-to-top button
// ----------------------
const goUpBtn = document.getElementById("myBtn");
window.addEventListener("scroll", () => {
  goUpBtn.style.display = window.scrollY > 20 ? "block" : "none";
});
goUpBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.addEventListener("DOMContentLoaded", function () {
  // Check if a user is saved in localStorage
  const storedUser = localStorage.getItem("purchasepalaceUser");

  const authSection = document.getElementById("auth-section");
  const userSection = document.getElementById("user-section");

  if (storedUser) {
    const user = JSON.parse(storedUser);

    // ✅ Handle username display for both email and phone
    let userName = user.username || user.email || "User";

    if (user.email && !user.username) {
      userName = user.email.split("@")[0]; // "david" from "david@gmail.com"
    }

    // Capitalize the first letter for clean display
    userName = userName.charAt(0).toUpperCase() + userName.slice(1);

    // Hide Sign In/Register links
    authSection.style.display = "none";

    // Show the user's name + logout button
    userSection.style.display = "flex";
    userSection.innerHTML = `
      <p style="margin-right:10px;">👋 Welcome, <b>${userName}</b></p>
      <button id="logoutBtn" style="
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        padding: 8px 12px;
      ">Logout</button>
    `;

    // Handle logout
    document.getElementById("logoutBtn").addEventListener("click", function () {
      localStorage.removeItem("purchasepalaceUser");
      location.reload();
    });
  } else {
    // No user found — show Sign In/Register links
    authSection.style.display = "flex";
    userSection.style.display = "none";
  }
});
