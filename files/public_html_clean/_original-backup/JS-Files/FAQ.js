let gridItem = document.querySelectorAll(".faq_grid .grid_item");
let activeFAQ = 0;

gridItem.forEach((item,key) => item.addEventListener("click", () => {
    if(item.classList.contains("active")) {
        item.classList.remove("active");
    } else {
        item.classList.add("active");
        activeFAQ = Number(key);
        deactivateFAQ();
    }
}))

function deactivateFAQ() {
    for(let i = 0; i <= gridItem.length; i++) {
        if(i == activeFAQ) {

        } else {
            gridItem[i].classList.remove("active");
        }
    }
}