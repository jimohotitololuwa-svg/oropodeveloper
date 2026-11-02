window.onload = function(){ const nav = document.querySelector('header');
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav__list");

// Nav bar functions
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
})

document.querySelectorAll(".nav__item, .apply_btn").forEach(n => n.addEventListener("click", () => 
{
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}))

// window.onscroll = function () { 
//     if (document.documentElement.scrollTop > 800 && nav.classList.contains("nohome")) {
//         nav.classList.add("colored");
//         nav.classList.remove("transparent");
//     } 
//     else {
//         nav.classList.add("transparent");
//         nav.classList.remove("colored");
//     }
// };

// Image Gallery
let list = document.querySelector('.slide .slider-container .slider');
let items = document.querySelectorAll('.slide .slider-container .slider .item');
let dots = document.querySelectorAll('.slide .slider-container .dots li');
let prev = document.getElementById('prev');
let next = document.getElementById('next');

let active = 0;
let lengthItems = items.length - 1;

next.onclick = function () {
    if(active + 1 > lengthItems) {
        active = 0;
    } else {
        active += 1;
    }
    reloadSlider();
}

prev.onclick = function () {
    if(active - 1 < 0) {
        active = lengthItems;
    } else {
        active -= 1;
    }
    reloadSlider();
}

let refreshSlider = setInterval(() => {next.click()}, 3000);

function reloadSlider() {
    let checkLeft = items[active].offsetLeft;
    list.style.left = -checkLeft + "px";

    let lastActiveDot = document.querySelector('.slide .dots li.active-dot');
    lastActiveDot.classList.remove('active-dot');
    dots[active].classList.add('active-dot');
    clearInterval(refreshSlider);
    refreshSlider = setInterval(() => {next.click()}, 5000);
}

dots.forEach((li,key) => {
    li.addEventListener('click', function () {
        active = key;
        reloadSlider();
    })
})

// Programs Section
let educ = document.querySelector('.program .top_section .i-educ');
let she = document.querySelector('.program .top_section .i-she');
let creator = document.querySelector('.program .top_section .i-creator');
let programText = document.querySelector('.program .bottom_section .textfield p');
let programImg = document.querySelector('.program_img');
let arr = document.querySelectorAll('.program .top_section .btn');
const textField = [
    'Our educational training is designed to provide teachers with practical skills and knowledge in a specific area of their subject expertise, such as classroom management, time management, emotional intelligence in teaching and mental well-being.The online format allows individuals to learn at their own pace and convenience. We engage cutting – edge practice and technology in implementing the aforementioned strategies.', 'These coaching classes are designed specifically for women who are looking to enhance their leadership skills and public speaking abilities. The coaching sessions focus on building confidence, developing effective communication skills, and overcoming any challenges that may arise',
    'We support clients in identifying their life needs and put in place best practice and strategies in helping clients get the right creative approach to work and life balance. This programme is designed to help individuals enhance their creativity and innovation skills (ImpactCreator). The coaching sessions focus on developing creative thinking techniques and strategies that can be applied in various areas of life, such as work, business, and personal development.'];

    
const programImages = []

let activeBtn = 0;



function changeInfo() {
    arr.forEach((item) => {
        item.style.backgroundColor = "white";
    })
    arr[activeBtn].style.backgroundColor = "#F2CC03";
    change();
    changeImage();
}

arr.forEach((li,key) => {
    li.addEventListener('click', function () {
        console.log("Wowwwwwwwwww");
        activeBtn = key;
        changeInfo();
    })
})

let moveProgram = setInterval(nextProgram, 10000);

function nextProgram() {
    if(activeBtn + 1 > 2) {
        activeBtn = 0;
    } else {
        activeBtn += 1;
    }
    change();
    arr.forEach((item) => {
        item.style.backgroundColor = "white";
    })
    arr[activeBtn].style.backgroundColor = "#F2CC03";
    changeImage();
    clearInterval(moveProgram);
    nextProgram = setInterval(nextProgram, 10000);
}

function showText() {
    programText.style.opacity = 1;
    programText.textContent = textField[activeBtn];
}

function change() {
    programText.style.opacity = 0;
    setTimeout (showText, 500);
}

function showImage() {
    programImg.style.background = `url('../images/Newpics/impact${activeBtn + 1}.jpg') no-repeat center center/cover`;
    programImg.style.opacity = 1;
}

function changeImage() {
    programImg.style.opacity = 0;
    setTimeout (showImage, 500);
}

}
