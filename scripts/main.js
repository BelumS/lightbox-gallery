import {
  qs,
  qsa,
  addClass,
  removeClass,
  toggleClass,
  hasClass,
} from './utils/domUtils.js';

import {
  UNMOUNT_CLASS,
  SLIDE_IN_CLASS,
  SLIDE_OUT_CLASS,
  EXPAND_IMAGE_CLASS,
  DOT_ACTIVATE_CLASS
} from './constants/constants.js';

const overlay = qs('.overlay');
const modal = qs('.modal');
const modalCloseButton = qs('.modal__close-js');
const gallery = qs('.gallery');

gallery.addEventListener('click', e => {
  const image = e?.target;

  if (!hasClass(overlay, UNMOUNT_CLASS)) return;

    removeClass(overlay, UNMOUNT_CLASS);

    const imageId = +image.dataset.img - 1;
    goToSlide(imageId);
    activateDot(imageId);
});

const toggleModal = e => {
  const element = e.target;

  if (
    !removeClass(overlay, UNMOUNT_CLASS) &&
    !hasClass(element, 'modal__header') &&
    !hasClass(element, 'slider') &&
    !hasClass(element, 'slider__dot') &&
    !hasClass(element, 'slider__control') &&
    !hasClass(element, 'slide') &&
    !(element instanceof HTMLImageElement) &&
    !hasClass(element, 'modal__body')
  ) {
    addClass(overlay, UNMOUNT_CLASS);
  } else {
    removeClass(overlay, UNMOUNT_CLASS);
  }
};

/**
 * TODO: Use scale to make modal appear from nothing with an animation?
 */

modalCloseButton.addEventListener('click', toggleModal);
overlay.addEventListener('click', toggleModal);

const slider = qs(".slider");
let slides = [];

/**
 * Adds content to the modal
 * @param {HTMLImageElement} imageElement 
 */
const createModalContent = (imageElement) => {
    const slide = document.createElement("div");
    addClass(slide, "slide");

    const slideImage = document.createElement("img");
    addClass(slideImage, "slide__img");
    slideImage.src = imageElement.getAttribute("src");
    slideImage.alt = imageElement.alt;
    
    slide.dataset.slideIndex = imageElement.dataset.img;
    slide.prepend(slideImage);
    slides.push(slide);
    slider.append(slide);
};
//TODO: Insert as Figcaption and Figure, instead of Div > Img?

// CAROUSEL/SLIDER COMPONENT
const leftButton = qs(".slider__control--left");
const rightButton = qs(".slider__control--right");
const dotsContainer = qs(".slider__dots");
const dots = qsa(".slider__dot");

window.addEventListener("load", () => {
  [...gallery?.children].forEach((galleryItem, _) => {
    createModalContent(galleryItem?.firstElementChild);
  });
});

let currentSlide = 0;
const maxSlides = slides.length;

const goToSlide = (slideIdx) => {
  slides.forEach((slide, idx) => {
    slide.style.transform = `translateX(${120 * (idx - slideIdx)}%)`;
  });
};

const activateDot = (dotIdx) => {
  dots.forEach((dot, idx) => {
    if (dotIdx === idx) {
      addClass(dot, DOT_ACTIVATE_CLASS);
    } else {
      removeClass(dot, DOT_ACTIVATE_CLASS);
    }
  });
};

//TODO: Bug where slides don't reset after last slide!
const nextSlide = () => {
  if (currentSlide === maxSlides - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide);
  activateDot(currentSlide);
};

const prevSlide = () => {
  if (currentSlide === 0) {
    currentSlide = maxSlides - 1;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
  activateDot(currentSlide);
};

dotsContainer.addEventListener("click", (e) => {
  const dotElement = e?.target;
  const dotId = +dotElement?.dataset?.dotIndex - 1;
  goToSlide(dotId);
  activateDot(dotId);
});

rightButton.addEventListener("click", nextSlide);
leftButton.addEventListener("click", prevSlide);