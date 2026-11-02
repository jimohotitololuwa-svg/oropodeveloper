// About us 
let team = document.querySelectorAll('.team .team-container .team-cards .team-item .team-description');
let overlayContainer = document.querySelector('.overlay-container');
let overlay = document.querySelector('.overlay');
let closeBtn = document.querySelector('.modal-box i');
let modal = document.querySelector('.modal-box');
let description = document.querySelector('.modal-box span');
let title = document.querySelector('.modal-box a h3');
let link = document.querySelector('.modal-box a');
let teamMember = 0;

team.forEach((li,key) => {
li.addEventListener('click', function () {
    console.log("wowworking");
overlayContainer.classList.add("active");
teamMember = Number(key);
changeInfos();
    })
})

function changeInfos () {
    if (teamMember === 0) {
        modal.classList.remove("Tech");
        modal.classList.remove("HR");
        modal.classList.remove("Admin");
        modal.classList.add("CEO");
        title.textContent = "Adenike Jimoh";
        link.href = "https://www.linkedin.com/in/adenike-jimoh-a53385238/";
        description.innerHTML = `Welcome to Oropo Visionary Coaching Co., where leadership takes center stage in character, conduct, and competence. Meet Dr. Adenike O. Jimoh an Associate Professor of Paediatrics at the College of Medicine and Allied Health Sciences, Bingham University, Jos campus, and the visionary founder and CEO of Oropo Visionary Coaching Co. <br><br> At Oropo, Dr. Adenike leads the charge in crafting a transformative coaching experience for educators. The company, dedicated to nurturing leaders in effective service delivery, places a special emphasis on educators, creative youths, and female leaders, recognizing these groups of people as the cornerstone of leadership development. As the lead coach for the TeachTomorrowTM leadership coaching course (TTLC), Dr. Adenike brings her wealth of expertise to empower educators through this transformative coaching course. <br><br> Beyond her impactful work with Oropo, Dr. Adenike is a distinguished Fellow in the Faculty of Paediatrics of the National Postgraduate Medical College of Nigeria and a Fellow of Population and Reproductive Health Initiative. Holding certificates in Project Management, Leadership and Management in Health, a master’s degree in International Affairs and Diplomacy (MIAD), and a Postgraduate Diploma in Education (PGDE), she seamlessly integrates her medical and educational expertise. <br><br> Driven by a passion for inclusive education, she advocates for flexible classrooms, envisioning a future where barriers dissolve, and every child has access to tailored learning. Dr. Adenike Jimoh is not just a medical professional; she is a dynamic leader, author, counsellor, speaker, and the driving force behind Oropo Visionary Coaching Co.`
    } else if (teamMember === 1) {
        modal.classList.remove("CEO");
        modal.classList.remove("Tech");
        modal.classList.remove("Admin");
        modal.classList.add("HR");
        link.href = "https://www.linkedin.com/in/lydia-oyewo-21b9a81b4/";
        title.textContent = "Lydia Oluwakemi Oyewo";
        description.innerHTML = "Meet Lydia Oluwakemi Oyewo, a distinguished Notary Public and seasoned lawyer with over 15 years of expertise in various legal domains, specializing in commercial practice, litigation, and a keen focus on intellectual property protection, particularly in the digital space. As the Head of Practice at O.E.B. Offiong SAN and Co, Kano Office, she has provided invaluable advisory services to small businesses, medium enterprises, and multinational corporations. <br><br>  Lydia serves as the Chairperson of the Christian Lawyers Fellowship (CLASFON) Kano chapter, reflecting her commitment to community engagement. She is an active member of esteemed professional bodies, including the Nigerian Bar Association (NBA), International Federation of Women Lawyers (FIDA), and African Women Lawyers Association (AWLA).<br><br> Beyond her legal prowess, Lydia is passionate about nurturing the next generation of female professionals, contributing to their development and capacity building. She dedicates time to read, finding solace and joy in quality moments spent with her immediate family."
    } else if (teamMember === 2) {
        modal.classList.remove("CEO");
        modal.classList.remove("HR");
        modal.classList.remove("Admin");
        modal.classList.add("Tech");
        link.href = "https://www.linkedin.com/in/jonah-onah/";
        title.textContent = "Onah Jonah";
        description.innerHTML = "Meet Onah Jonah is an accomplished Educator, Tech Professional, and Trainer dedicated to shaping the future. With a rich history of training educators using the Accelerated Christian Education (ACE) curriculum, Onah now spearheads RutOna Linkages, a tech company specializing in resolving businesses' technology requirements, particularly in web and mobile development. Onah is deeply involved in training young minds to excel in the dynamic field of technology. <br><br> Beyond the tech space, Onah is affiliated with numerous organizations committed to enhancing lives through training and human capital development."
    }
    else if (teamMember === 3) {
        modal.classList.remove("CEO");
        modal.classList.remove("HR");
        modal.classList.remove("Tech");
        modal.classList.add("Admin");
        link.href = "https://www.linkedin.com/in/jonah-onah/";
        title.textContent = "Onah Ruth";
        description.innerHTML = "Ruth Onah is a dedicated and result-oriented professional with a wealth of experience in administrative roles across various industries. With a strong foundation in customer service acquired during her time at Access Bank Headquarters and administrative expertise gained at Rutona Linkages, Ruth is adept at managing multiple tasks efficiently. <br><br> Her previous roles as a content creator at Publivision and a lecturer at the College of Agriculture Jalingo have honed her communication skills and organizational abilities. With her versatile skill set, dedication to excellence and commitment to teamwork, she ensures smooth operations and effective support within the organization."
    }
}

overlay.addEventListener("click", () =>
overlayContainer.classList.remove("active")
);

closeBtn.addEventListener("click", () =>
overlayContainer.classList.remove("active")
);