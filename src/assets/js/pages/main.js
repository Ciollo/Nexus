let btnCloseOpenNavbar = document.getElementById('btn-close-open-navbar');

btnCloseOpenNavbar.addEventListener('click', toggleNavbar);

function toggleNavbar() {
    btnCloseOpenNavbar.classList.toggle('btn-navbar-not-active');
    btnCloseOpenNavbar.classList.toggle('btn-navbar-active');

    let navbar = document.getElementById('navbar-side');
    navbar.classList.toggle('navbar-side-not-active');
    navbar.classList.toggle('navbar-side-active');

};