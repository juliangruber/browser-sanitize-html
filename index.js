
/**
 * Expose `sanitize` and clone `el`.
 * 
 * @param {Element} el
 * @param {Function} fn
 * @api public
 */

module.exports = function(el, fn) {
  return sanitize(el.cloneNode(true), fn);
};

/**
 * Sanitize html.
 * 
 * @param {Element} el
 * @param {Function} fn
 * @return {Element|Fragment=}
 * @api private
 */

function sanitize(el, fn) {
  for (var i = el.children.length - 1; i > -1; i--) {
    sanitize(el.children[i], fn);
  }

  if (fn(el) !== false) {
    return el;
  } else if (el.parentNode) {
    removeDomLayer(el);
    return;
  } else {
    return domArray(el.children);
  }
}

/**
 * Append `el`'s children to its parent node and remove `el`.
 *
 * @param {Element} el
 * @api private
 */

function removeDomLayer(el) {
  while (el.children.length) {
    el.parentNode.insertBefore(el, el.lastChild);
  }
  el.parentNode.removeChild(el);
}

/**
 * Based on an array of dom nodes, return null,
 * one element or a document fragment with dom nodes.
 *
 * @param {Array} arr
 * @return {Element|Fragment=}
 * @api private
 */

function domArray(arr) {
  if (arr.length == 0) return;
  if (arr.length == 1) return arr[0];

  var frag = document.createDocumentFragment();
  while (arr.length) {
    frag.appendChild(arr[0]);
  }
  return frag;
}

