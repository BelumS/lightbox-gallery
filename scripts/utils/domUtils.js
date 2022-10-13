/**
 * Selects the `HTMLElement` based on the given query
 * @param {string} query the query
 * @returns an `HTMLElement` or `null`
 */
 export const qs = (query) => document.querySelector(query);

 /**
  * Selects the `NodeListOf<Element>` based on the given query
  * @param {string} query the query
  * @returns an `NodeListOf<Element>` or `null`
  */
 export const qsa = (query) => document.querySelectorAll(query);
 
 /**
  * Adds the given CSS class to the `Element`
  * @param {Element} element the `Element`
  * @param {string} className the CSS class
  */
 export const addClass = (element, className) => element?.classList?.add(className);
 
 /**
  * Removes the given CSS class from the `Element`
  * @param {Element} element the `Element`
  * @param {string} className the CSS class
  */
 export const removeClass = (element, className) => element?.classList?.remove(className);
 
 /**
  * Adds/Removes the given CSS class from the `Element`
  * @param {Element} element the `Element`
  * @param {string} className the CSS class
  * @returns `true` if the class was toggled
  */
 export const toggleClass = (element, className) => element?.classList?.toggle(className);
 
 /**
  * Checks if the `Element` has the given CSS class
  * @param {Element} element the `Element`
  * @param {string} className the CSS class
  * @returns `true` if the class exists
  */
 export const hasClass = (element, className) => element?.classList?.contains(className);