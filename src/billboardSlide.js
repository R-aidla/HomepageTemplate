class FadeSlideshow {
    constructor(containerSelector, interval = 3000, fadeDuration = 1000) {
        this.container = document.querySelector(containerSelector);
        this.images = this.container.querySelectorAll("img");
        this.index = 0;
        this.interval = interval;
        this.fadeDuration = fadeDuration;
        this.timer = null;

        this.initStyles();
        this.startSlideshow();
    }

    initStyles() {
        this.images.forEach((img, i) => {
            img.style.position = "absolute";
            img.style.top = "0";
            img.style.left = "0";
            img.style.width = "100%";
            img.style.opacity = i === 0 ? "1" : "0"; // Show first image, hide others
            img.style.transition = `opacity ${this.fadeDuration}ms ease-in-out`;
        });
    }

    nextSlide() {
        const currentImage = this.images[this.index];
        this.index = (this.index + 1) % this.images.length;
        const nextImage = this.images[this.index];

        currentImage.style.opacity = "0";
        nextImage.style.opacity = "1";
    }

    startSlideshow() {
        this.timer = setInterval(() => this.nextSlide(), this.interval);
    }

    stopSlideshow() {
        clearInterval(this.timer);
    }
}
// Usage: Attach to a container that holds images
window.addEventListener("load", () => {
    new FadeSlideshow("#billboardAds", 10000, 1500); // Change the selector and interval as needed
});