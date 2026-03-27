import { headerHtml } from "./header.js";
import { footerHtml } from "./footer.js";

document.getElementById("header").innerHTML = headerHtml;
document.getElementById("footer").innerHTML = footerHtml;

const username_mb = document.getElementById("username-message-box");
const user_email_mb = document.getElementById("user-email-message-box"); 
const password_mb = document.getElementById("password-message-box");
const confirm_password_mb = document.getElementById("confirm-password-message-box");

document.getElementById("enroll-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const nameEl = document.getElementById("username");
    const emailEl = document.getElementById("user-email");
    const passwordEl = document.getElementById("user-password");
    const c_passwordEl = document.getElementById("user-confirm-password");

    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const password = passwordEl.value;
    const c_password = c_passwordEl.value;

    let errorOccured = false;

    [nameEl, emailEl, passwordEl, c_passwordEl].forEach(el => makeDefault(el));
    [username_mb, user_email_mb, password_mb, confirm_password_mb].forEach(mb => mb.textContent = "");

    if (name.length < 3) {
        makeRed(nameEl); 
        username_mb.textContent = "Name must be at least 3 characters long.";
        errorOccured = true;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        makeRed(emailEl);
        user_email_mb.textContent = "Please enter a valid email address.";
        errorOccured = true;
    }
    if (password === "" || password !== c_password) {
        makeRed(passwordEl);
        makeRed(c_passwordEl);
        password_mb.textContent = "Passwords do not match.";
        errorOccured = true;
    }
    if (!errorOccured) {
        makeGreen(nameEl);
        makeGreen(emailEl);
        makeGreen(passwordEl);
        makeGreen(c_passwordEl);
        setTimeout(() => {
            window.location.href = "../index.html";
        }, 500);
    }
});

function makeRed(el) {
    el.style.border = "2px solid red";
}

function makeGreen(el) {
    el.style.border = "2px solid green";
}

function makeDefault(el) {
    el.style.border = "1px solid #ccc";
}