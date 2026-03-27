import { headerHtml } from "./header.js"
import { footerHtml } from "./footer.js"
document.getElementById("header").innerHTML = headerHtml;
document.getElementById("footer").innerHTML = footerHtml;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const course_id = urlParams.get('course_id');
if (course_id !== null) {
    loadCourse(course_id);
}
async function loadCourse(course_id){
    const response = await fetch('../data/courses_data.xml');
    const xmlText = await response.text();

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");

    // course -> title, description
    // tutor -> name, designation, experience
    // curriculum -> list of chapters -> chapter-number, title, description
    // price -> old-price, new-price
    const course = xmlDoc.getElementsByTagName("course-details")[course_id];
    const c = course.getElementsByTagName("course")[0];
    const course_title = c.getElementsByTagName("title")[0].textContent;
    const course_subtitle = c.getElementsByTagName("sub-title")[0].textContent;
    const course_description = c.getElementsByTagName("description")[0].textContent;
    const tutor = course.getElementsByTagName("tutor")[0];
    const tutor_name = tutor.getElementsByTagName("name")[0].textContent;
    const tutor_designation = tutor.getElementsByTagName("designation")[0].textContent;
    const tutor_experience = tutor.getElementsByTagName("experience")[0].textContent;
    const tutor_img = tutor.getElementsByTagName("img")[0].textContent;
    const curriculum = course.getElementsByTagName("curriculum")[0];
    const chapters = curriculum.getElementsByTagName("chapter");
    const price = course.getElementsByTagName("price")[0];
    const new_price = course.getElementsByTagName("new-price")[0].textContent;
    const old_price = course.getElementsByTagName("old-price")[0].textContent;
    const course_img = course.getElementsByTagName("img-src")[0].textContent;

    let chapter_html = "";
    for(let i=0; i<chapters.length; i++){
        const chapter_title = chapters[i].getElementsByTagName("title")[0].textContent;
        const chapter_number = chapters[i].getElementsByTagName("number")[0].textContent;
        const chapter_description = chapters[i].getElementsByTagName("description")[0].textContent;
        chapter_html += `
            <div class="course-chapter">
                <div class="vertically-center"><h1 class="chapter-number">0${chapter_number}</h1></div>
                <div class="chapter-details">
                    <h2 class="chapter-title">${chapter_title}</h2>
                    <p class="description">${chapter_description}</p>
                </div>
                <div class="lock-emoji vertically-center">
                    <img src="../images/lockEmoji.png" alt="locked">
                </div>
            </div>
        `
    }
    let course_details_html = `
            <h1 class="course-title clr-grade">${course_title}</h1>
            <div class="sub-details"></div>
            <div class="course-sub-title">${course_subtitle}</div>
            <div class="course-description">
                <h2 class="clr-grade">Description</h2>
                <p>${course_description}</p>
            </div>
            <h2 class="clr-grade tutor-heading">Instructor</h2>
            <div class="tutor">
                <div class="tutor-profile">
                    <img src="${tutor_img}" alt="" class="tutor-img">
                </div>
                <div class="tutor-description">
                    <h2 class="tutor-name">${tutor_name}</h2>
                    <p class="tutor-designation">${tutor_designation}</p>
                    <p class="tutor-experience">${tutor_experience}</p>
                </div>
            </div>
            <div class="curriculum">
                <h2>Course Curriculum</h2>
                <div class="course-chapter-list">
                    ${chapter_html}
                </div>
            </div>
        `
    const course_prices_html = `
        <span class="curr-price">₹${new_price}</span>
        <span class="old-price">₹${old_price}</span>
    `
    document.getElementsByClassName("course-details")[0].innerHTML = course_details_html;
    document.getElementsByClassName("course-prices")[0].innerHTML = course_prices_html;
    document.getElementById("course-img").src = course_img;
}