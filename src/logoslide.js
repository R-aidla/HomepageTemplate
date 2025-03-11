const slideshow = document.querySelector(".view picture");
const logos = document.querySelectorAll(".view picture img");
const dotsContainer = document.querySelector(".dotsContainer");

const previousButton = document.querySelector(".slideshowContainer .previousButton");
const nextButton = document.querySelector(".slideshowContainer .nextButton");

let index = 0;
const totalLogos = logos.length;

function getSlideWidth(index) {
    const logoWidth = logos[index >= totalLogos || index < 0 ? 0 : index].getBoundingClientRect().width;
    const gap = parseFloat(window.getComputedStyle(slideshow).gap) || 0;
    return logoWidth + gap;
}

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
    updateSlide();
}

function stepToSlide(step) {
    index += step;
    updateSlide();
    const slideWidth = getSlideWidth(index);

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

function updateSlide()
{
    const slideWidth = getSlideWidth(index);
    slideshow.style.transition = "transform 0.5s ease-in-out";
    slideshow.style.transform = `translateX(${-(index + 1) * slideWidth}px)`;
    updateDots();
}

dots.forEach(dot => {
    dot.addEventListener("click", (e) => {
        let newIndex = parseInt(e.target.getAttribute("data-index"));
        goToSlide(newIndex);
    });
});

nextButton.addEventListener('click', () => stepToSlide(1))
previousButton.addEventListener('click', () => stepToSlide(-1))
window.addEventListener("load", () => {
    goToSlide(0);
});
updateDots();