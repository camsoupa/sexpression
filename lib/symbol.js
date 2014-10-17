var symbols = {}
  , escapee =  {
    '#': true,
    '"': true,
    "'": true,
    '`': true,
    ' ': true,
    '(': true,
    ')': true,
    '\n': true,
    '\t': true
  };

var Symbol = function(name) {
  if (!symbols[name]) {
    this.symbol = name;

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
  if (this.symbol.length === 0) {
    return '##';
  } else {
    return this.symbol.replace(/[#"'`, \(\)\.]/g, function(escapee) {
      return '\\' + escapee;
    });
  }
};

Symbol.prototype.isKeyword = function() {
  return (this.symbol[0] === ':' && this.symbol.length > 1);
};

Symbol.prototype.keywordName = function() {
  return this.isKeyword() ? this.symbol.slice(1, this.symbol.length) : null;
};

module.exports = Symbol;
