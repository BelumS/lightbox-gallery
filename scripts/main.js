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
  SLIDE_ACTIVATE_CLASS,
  DOT_ACTIVATE_CLASS
} from './constants/constants.js';

/* 
TODO: Take clicked on image:
  1. ~~Open modal~~ 
  2. ~~Place image as a child of the Modal.~~
  3. ~~Expand the dimensions of the image~~
  4. ~~Have the modal match the size of it's content.~~
  5. ~~Add the next/prev buttons~~
  6. ~~Add the carousel functionality~~
  7. Connect Carousel to Gallery Box
*/

const overlay = qs('.overlay');
const modal = qs('.modal');
const modalCloseButton = qs('.modal__close-js');
const gallery = qs('.gallery');

gallery.addEventListener('click', e => {
  const imageElement = e?.target;
  const imageId = +imageElement?.dataset?.slide;

  imageElement.addEventListener('click', e => {
    if (hasClass(overlay, UNMOUNT_CLASS)) {
      removeClass(overlay, UNMOUNT_CLASS);

      const el = e?.target;
      createModalContent(el);
    }
  });
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

/**
 * Adds content to the modal
 * @param {HTMLImageElement} imageElement 
 */
const createModalContent = imageElement => {
    const expandedImage = document.createElement("img");
    expandedImage.classList.add("expanded-image");
    expandedImage.src = imageElement.src; //take the image src from the clicked image
    expandedImage.alt = imageElement.alt;

    const modalBody = modal?.lastElementChild;
    if (!modalBody?.firstElementChild) {
        modalBody.prepend(expandedImage);
    } else {
        modalBody.firstElementChild.remove(); //delete the previous image
        modalBody.prepend(expandedImage); //add a new image
    }
};

// CAROUSEL/SLIDER COMPONENT
const slider = qs(".slider");
const slides = qsa(".slide");
const leftButton = qs(".slider__control--left");
const rightButton = qs(".slider__control--right");
const dotsContainer = qs(".slider__dots");
const dots = qsa(".slider__dot");

/**
 * To move the slider:
 * Click left button, slides move left (positive X-axis)
 * Click right button, slides move right (negative X-axis)
 */
let currentSlide = 0;
let currentDot = 0;
const maxSlides = slides.length;
const maxDots = slides.length;

const goToSlide = (slideIdx) => {
  slides.forEach((slide, idx) => {
    slide.style.transform = `translateX(${120 * (idx - slideIdx)}%)`;
  });
};
goToSlide(0);

const activateDot = (dotIdx) => {
  dots.forEach((dot, idx) => {
    if (dotIdx === idx) {
      addClass(dot, DOT_ACTIVATE_CLASS);
    } else {
      removeClass(dot, DOT_ACTIVATE_CLASS);
    }
  });
};
activateDot(0);

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
  activateDot(dotId);
  goToSlide(dotId);
});

rightButton.addEventListener("click", nextSlide);
leftButton.addEventListener("click", prevSlide);