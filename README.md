
# browser-sanitize-html

Sanitize html, for browser environments.

## Example

Allow only divs and clear style attributes:

```js
var sanitize = require('browser-sanitize-html');
var domify = require('domify');

var dirty = domify('<div><span></span><div style="foo:bar"></div></div>');
var clean = sanitize(dirty, function(el) {
  if (el.tagName != 'DIV') return false;
  el.setAttribute('style', null);
});
console.log(clean);
// => <div><div></div><div>
```

## Installation

Install with [npm](https://npmjs.org)

```bash
npm install browser-sanitize-html
```

and bundle with [browserify](https://github.com/substack/node-browserify).

## API

### var clean = sanitize(dirty, filter)

Sanitize `dirty` dom through your provided `filter` function. The return
value will be `null`, one `Element` or a `Fragment`, depending on which
Elements matched.

When `filter` returns `false` for an element it will be removed from the result
set. You can also modify nodes you want to keep on the fly.

## License

  MIT.

