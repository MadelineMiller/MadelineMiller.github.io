// script.js

function toggleNavbar() {
    const navbarLinks = document.getElementById("navbar-links");
    navbarLinks.classList.toggle("show");
}

function closeNavbar() {
    const navbarLinks = document.getElementById("navbar-links");
    navbarLinks.classList.remove("show");
}
