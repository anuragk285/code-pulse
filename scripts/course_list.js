import { headerHtml } from "./header.js"
import { footerHtml } from "./footer.js"
document.getElementById("header").innerHTML = headerHtml;
document.getElementById("footer").innerHTML = footerHtml;

async function loadCourses(){
    const response = await fetch('../data/courses_data.xml');
    const xmlText = await response.text();

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");

    let course_list_html = "";
    const courses = xmlDoc.getElementsByTagName("course-details");
    for(let i=0; i<courses.length; i++){
        
        const rating = courses[i].getElementsByTagName("rating")[0].textContent;
        const no_of_ratings = courses[i].getElementsByTagName("no-of-ratings")[0].textContent;
        const course = courses[i].getElementsByTagName("course")[0];
        const course_title = course.getElementsByTagName("title")[0].textContent;
        const course_id = course.getElementsByTagName("id")[0].textContent;
        const tutor = courses[i].getElementsByTagName("tutor")[0];
        const tutor_name = tutor.getElementsByTagName("name")[0].textContent;
        const tutor_designation = tutor.getElementsByTagName("designation")[0].textContent;
        const new_price = courses[i].getElementsByTagName("price")[0].getElementsByTagName("new-price")[0].textContent;
        const img_src = courses[i].getElementsByTagName("img-src")[0].textContent;

        let course_card = `
            <div class="course-card">
                <img src="${img_src}" alt="">
                <div class="course-details">
                    <div class="course-rating">
                        <div class="rating-stars">
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                        </div>
                        <div class="no-of-ratings">(${no_of_ratings})</div>
                    </div>
                    <div>
                        <h2 class="course-title">${course_title}</h2>
                        <p class="tutor">${tutor_name}, ${tutor_designation}</p>
                    </div>
                    <hr>
                    <div class="price-and-view-details">
                        <h2 class="price">₹${new_price}</h2>
                        <a href="course.html?course_id=${course_id}" class="view-details-btn">View Details <span class="arrow">→</span></a>
                    </div>
                </div>
            </div>
        `
        course_list_html += course_card;
    }
    document.getElementsByClassName("course-list")[0].innerHTML = course_list_html;
}

loadCourses();