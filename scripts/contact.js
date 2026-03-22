import { headerHtml } from "../scripts/header.js"
import { footerHtml } from "../scripts/footer.js"
document.getElementById("header").innerHTML = headerHtml;
document.getElementById("footer").innerHTML = footerHtml;

const username_mb = document.getElementById("username-message-box");
const user_email_mb = document.getElementById("user-email-message-box");
const textarea_mb = document.getElementById("textarea-message-box");

document.getElementById("form").addEventListener("submit", function(event){
    event.preventDefault();
    const nameEl = document.getElementById("username");
    const emailEl = document.getElementById("user-email");
    const textareaEl = document.getElementById("textarea-message");

    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const msg = textareaEl.value.trim();

    let errorOccured = false;
    [nameEl, emailEl, textareaEl].forEach(el => makeDefault(el));
    [username_mb, user_email_mb, textarea_mb].forEach(mb => mb.textContent = "");

    if(name.length < 3){
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
    if(msg === ""){
        makeRed(textareaEl);
        errorOccured = true;
        textarea_mb.textContent = "Please leave a message";
    }
    if(!errorOccured){
        makeGreen(nameEl);
        makeGreen(emailEl);
        setTimeout(() => {
            window.location.href = "../index.html"
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