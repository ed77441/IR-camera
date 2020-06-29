
function toggleNavbar () {
    var mobileNav = document.getElementById("mobile-menu");
    mobileNav.classList.toggle("menu-closed");

    if (mobileNav.clientHeight) {
      mobileNav.style.height = 0;
    }
    else {
      mobileNav.style.height = mobileNav.scrollHeight + "px";
    }
}

window.addEventListener("load", function() {
    document.getElementById("ham").addEventListener("click", toggleNavbar);
    document.getElementById("mobile-menu").style.height = 0;
});
