var test = require('tape');
var sanitize = require('./');

test('single valid element', function(t) {
  var div = document.createElement('div');
  var el = sanitize(div, function(e) {
    return true;
  });
  t.ok(el);
  t.ok(el.isEqualNode(div));
  t.end();
});

test('single invalid element', function(t) {
  var div = document.createElement('div');
  var el = sanitize(div, function(e) {
    return false;
  });
  t.notOk(el);
  t.end();
});

test('clones', function(t) {
  var div = document.createElement('div');
  var el = sanitize(div, function(e) {
    return true;
  });
  t.notEqual(el, div);
  t.end();
});

test('modifies nodes', function(t) {
  var div = document.createElement('div');
  var el = sanitize(div, function(e) {
    e.setAttribute('foo', 'bar');
    return true;
  });
  div.setAttribute('foo', 'bar');
  t.ok(el.isEqualNode(div));
  t.end();
});

test('falsy return value still accepts', function(t) {
  var div = document.createElement('div');
  var el = sanitize(div, function(e) {});
  t.ok(el);
  t.ok(el.isEqualNode(div));
  t.end();
});

test('valid inside valid element', function(t) {
  t.plan(4);
  var div = document.createElement('div');
  div.appendChild(document.createElement('div'));
  var el = sanitize(div, function(e) {
    t.equal(e.tagName, 'DIV');
  });
  t.ok(el);
  t.ok(el.isEqualNode(div));
});

test('invalid inside valid element', function(t) {
  var div = document.createElement('div');
  div.appendChild(document.createElement('span'));
  var el = sanitize(div, function(e) {
    return e.tagName == 'DIV';
  });
  t.ok(el);
  t.ok(el.isEqualNode(document.createElement('div')));
  t.end();
});

test('valid inside invalid element', function(t) {
  var div = document.createElement('div');
  div.appendChild(document.createElement('span'));
  var el = sanitize(div, function(e) {
    return e.tagName == 'SPAN';
  });
  t.ok(el);
  t.ok(el.isEqualNode(document.createElement('span')));
  t.end();
});

test('invalid inside invalid element', function(t) {
  var div = document.createElement('div');
  div.appendChild(document.createElement('div'));
  var el = sanitize(div, function(e) {
    return false;
  });
  t.notOk(el);
  t.end();
});

test('invalid elements inside valid element', function(t) {
  var div = document.createElement('div');
  div.appendChild(document.createElement('span'));
  div.appendChild(document.createElement('span'));
  var el = sanitize(div, function(e) {
    return e.tagName == 'DIV';
  });
  t.ok(el);
  t.ok(el.isEqualNode(document.createElement('div')));
  t.end();
});

test('valid elements inside invalid element', function(t) {
  var div = document.createElement('div');
  div.appendChild(document.createElement('span'));
  div.appendChild(document.createElement('span'));
  var el = sanitize(div, function(e) {
    return e.tagName == 'SPAN';
  });
  t.ok(el);
  var frag = document.createDocumentFragment();
  frag.appendChild(document.createElement('span'));
  frag.appendChild(document.createElement('span'));
  t.ok(el.isEqualNode(frag));
  t.end();
});

// todo helper
function todo(t) {
  t.ok(true, 'TODO');
  t.end();
}

