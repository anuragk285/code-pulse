import { headerHtml } from "./header.js";
import { footerHtml } from "./footer.js";
document.getElementById("header").innerHTML = headerHtml;
document.getElementById("footer").innerHTML = footerHtml;

const login_btn = document.getElementById("login-btn");
const browse_courses_btn = document.getElementById("browse-courses-btn");

browse_courses_btn.addEventListener('click', function(){
    window.location.href = 'course_list.html';
});

login_btn.addEventListener('click', function(){
    window.location.href = 'login.html';
});
