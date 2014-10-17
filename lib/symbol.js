var symbols = {}
  , escapee =  {
    '#': true,
    '"': true,
    "'": true,
    '`': true,
    ' ': true,
    '(': true,
    ')': true,
    '[': true,
    ']': true,
    '{': true,
    '}': true,
    '\n': true,
    '\t': true
  };

var Symbol = function(name) {
  if (!symbols[name]) {
    this[':'] = name;

    symbols[name] = this;
  }
  return symbols[name];
};

Symbol.endChar = function(ch) {
  return escapee[ch];
};

Symbol.intern = function(name) {
  return new Symbol(name);
};

Symbol.prototype.toString = function() {
  if (this[':'].length === 0) {
    return '##';
  } else {
    return this[':'].replace(/[#"'`, \(\)\.]/g, function(escapee) {
      return '\\' + escapee;
    });
  }
};

Symbol.prototype.isKeyword = function() {
  return (this[':'][0] === ':' && this[':'].length > 1);
};

Symbol.prototype.keywordName = function() {
  return this.isKeyword() ? this[':'].slice(1, this[':'].length) : null;
};

module.exports = Symbol;
