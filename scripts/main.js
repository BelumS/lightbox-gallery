import {
  qs,
  addClass,
  removeClass,
  toggleClass,
  hasClass,
} from './utils/domUtils.js';

/* 
TODO: Take clicked on image:
  1. ~~Open modal~~ 
  2. ~~Place image as a child of the Modal.~~
  3. ~~Expand the dimensions of the image~~
  4. ~~Have the modal match the size of it's content.~~
  5. Add the next/prev buttons
  6. Add the carousel functionality
*/

const overlay = qs('.overlay');
const modal = qs('.modal');
const modalCloseButton = qs('.modal__close-js');
const gallery = qs('.gallery');

const HIDE_MODAL_CLASS = 'unmount';
const ADAPT_MODAL_CLASS = 'modal--active';
const EXPAND_IMAGE_CLASS = 'expanded-image';

gallery.addEventListener('click', e => {
  const imageElement = e?.target;
  const imageId = +imageElement?.dataset?.slide;

  imageElement.addEventListener('click', e => {
    if (hasClass(overlay, HIDE_MODAL_CLASS)) {
      removeClass(overlay, HIDE_MODAL_CLASS);

      const el = e?.target;
      createModalContent(el);
    }
  });
});

const toggleModal = e => {
  const element = e.target;

  if (
    !removeClass(overlay, HIDE_MODAL_CLASS) &&
    !hasClass(element, 'modal__header') &&
    !hasClass(element, 'slider') &&
    !hasClass(element, 'slider__dot') &&
    !hasClass(element, 'slider__control') &&
    !hasClass(element, 'slide') &&
    !(element instanceof HTMLImageElement) &&
    !hasClass(element, 'modal__body')
  ) {
    addClass(overlay, HIDE_MODAL_CLASS);
  } else {
    removeClass(overlay, HIDE_MODAL_CLASS);
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

// CAROUSEL