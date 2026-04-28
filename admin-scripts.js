/* SHARED SCRIPTS FOR HOTEL ADMIN */

function checkLogin() {
  const data = JSON.parse(localStorage.getItem("user"));
  if (!data) {
    window.location.href = "hotelreg.html";
    return null;
  }

  // Update UI if elements exist
  if (document.getElementById("hotelName")) {
    document.getElementById("hotelName").textContent = data.hotel || "Hotel";
  }
  if (document.getElementById("managerInfo")) {
    document.getElementById("managerInfo").textContent = `Manager: ${data.manager}`;
  }
  if (document.getElementById("emailInfo")) {
    document.getElementById("emailInfo").textContent = `Email: ${data.email}`;
  }
  if (document.getElementById("phoneInfo")) {
    document.getElementById("phoneInfo").textContent = `Phone: ${data.phone}`;
  }
  if (document.getElementById("greeting")) {
    document.getElementById("greeting").textContent = `Hi 👋 ${data.manager}`;
  }
  if (data.phone && document.getElementById("whatsappLink")) {
    document.getElementById("whatsappLink").href = `https://wa.me/91${data.phone}`;
  }

  return data;
}

function toggleMenu() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  if (sidebar) sidebar.classList.toggle("active");
  if (overlay) overlay.classList.toggle("active");
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "hotelreg.html";
}

function highlightActiveMenu() {
  const currentPage = window.location.pathname.split("/").pop() || "topbar.html";
  document.querySelectorAll(".menu-item a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.parentElement.classList.add("active");
    } else {
      link.parentElement.classList.remove("active");
    }
  });
}

// Automatically check login and highlight menu on load
document.addEventListener("DOMContentLoaded", () => {
  checkLogin();
  highlightActiveMenu();
});
