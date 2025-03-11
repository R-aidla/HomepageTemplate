const slideshow = document.querySelector(".view picture");
const logos = document.querySelectorAll(".view picture img");
const dotsContainer = document.querySelector(".dotsContainer");

const previousButton = document.querySelector(".slideshowContainer .previousButton");
const nextButton = document.querySelector(".slideshowContainer .nextButton");

let index = 0;
const totalLogos = logos.length;
const slideWidth = 120;

let fclone = logos[totalLogos - 1].cloneNode(true);
    slideshow.prepend(fclone);
logos.forEach(logo => {
    let clone = logo.cloneNode(true);
    slideshow.appendChild(clone);
});

for (let i = 0; i < totalLogos; i++) {
    let dot = document.createElement("span");
    dot.classList.add("dot");
    dot.setAttribute("data-index", i);
    dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll(".dot");

function updateDots() {
    if(index < 0)
        return;

    dots.forEach(dot => dot.classList.remove("active"));
    dots[index % totalLogos].classList.add("active");
}

function goToSlide(newIndex) {
    index = newIndex;
    slideshow.style.transition = "transform 0.5s ease-in-out";
    slideshow.style.transform = `translateX(${-(index + 1) * slideWidth}px)`;
    updateDots();
}

function stepToSlide(step) {
    index += step;

    slideshow.style.transition = "transform 0.5s ease-in-out";
    slideshow.style.transform = `translateX(${-(index + 1) * slideWidth}px)`;
    updateDots();

    if (index >= totalLogos) {
        setTimeout(() => {
            slideshow.style.transition = "none";
            index = 0;
            slideshow.style.transform = `translateX(${-(index + 1) * slideWidth}px)`;
            updateDots();
        }, 500);
    }

    if (index < 0) {
        setTimeout(() => {
            slideshow.style.transition = "none";
            index = totalLogos - 1;
            slideshow.style.transform = `translateX(${-(index + 1) * slideWidth}px)`;
            updateDots();
        }, 500);
    }
}

dots.forEach(dot => {
    dot.addEventListener("click", (e) => {
        let newIndex = parseInt(e.target.getAttribute("data-index"));
        goToSlide(newIndex);
    });
});

nextButton.addEventListener('click', () => stepToSlide(1))
previousButton.addEventListener('click', () => stepToSlide(-1))
goToSlide(3);
updateDots();