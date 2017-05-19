'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Abbreviation = function () {
  function Abbreviation(option) {
    _classCallCheck(this, Abbreviation);

    this._config = Object.assign({
      upper: true,
      tags: ['strong'],
      class: ['abbr']
    }, option);
  }

  _createClass(Abbreviation, [{
    key: '_abbreviation',
    value: function _abbreviation(item) {
      return new (function () {
        function _class(item) {
          _classCallCheck(this, _class);

          if (item instanceof Array || typeof item === 'string') {
            this.set(item);
          } else if (typeof item !== 'undefined') {
            throw new Error('parameter must be an Array or String or DOM.');
          }
        }

        _createClass(_class, [{
          key: 'set',
          value: function set(item) {
            if (item instanceof Array) {
              this.letters = item;
              this.abbr = item.join('');
            } else if (typeof item === 'string') {
              this.letters = item.split('');
              this.abbr = item;
            } else {
              throw new Error('parameter must be an Array or String.');
            }
            return this;
          }
        }, {
          key: 'export',
          value: function _export() {
            return this.exportWithSentence();
          }
        }, {
          key: 'exportWithSentence',
          value: function exportWithSentence(sentence) {
            return {
              sentence: sentence || '',
              letters: this.letters || [],
              abbr: this.abbr || ''
            };
          }
        }]);

        return _class;
      }())(item);
    }
  }, {
    key: 'from',
    value: function from(item) {
      if (typeof item === 'string') {
        return this.getAbbreviationFromText(item);
      } else if (item instanceof HTMLElement) {
        return this.getAbbreviationFromDOM(item);
      } else {
        throw new Error('parameter must be an DOM or String.');
      }
    }
  }, {
    key: 'getAbbreviationFromText',
    value: function getAbbreviationFromText(sentence) {
      if (!this._config.upper) {
        return this._abbreviation().export();
      }
      var letters = sentence.split('').filter(function (letter) {
        return (/[A-Z]/.test(letter)
        );
      });
      return new this._abbreviation(letters).exportWithSentence(sentence);
    }
  }, {
    key: 'getAbbreviationFromDOM',
    value: function getAbbreviationFromDOM(dom) {
      dom = dom.cloneNode(true);
      dom.querySelectorAll('script').forEach(function (script) {
        script.parentNode.removeChild(script);
      });
      var originalSentence = (dom.textContent || dom.innerText).replace(/(\r\n|\n|\r)/gm, '');
      var condition = (this._config.tags || []).concat((this._config.class || []).map(function (item) {
        return '.' + item;
      }));

      var letters = [];
      var elements = condition.length > 0 ? Array.from(dom.querySelectorAll(condition.join(','))) : [];
      if (this._config.upper) {
        var seperator = String.fromCharCode(1114112);
        var unicodeTempStorage = [];
        elements.forEach(function (element) {
          element.innerText = element.innerText.toUpperCase();

          if (!/[A-Z]/.test(element.innerText)) {
            unicodeTempStorage.push(element.innerText);
            element.innerText = seperator;
          }
        });

        var cursor = 0;
        var sentence = (dom.textContent || dom.innerText).replace(/(\r\n|\n|\r)/gm, '');
        letters = sentence.split('').map(function (letter) {
          if (letter === seperator) {
            return unicodeTempStorage[cursor++];
          }

          if (/[A-Z]/.test(letter)) {
            return letter;
          }

          return null;
        }).filter(function (item) {
          return item !== null;
        });
      } else {
        letters = elements.map(function (element) {
          var text = element.innerText;
          if (text.length === 1) {
            return text;
          }
        }).filter(function (item) {
          return item !== null;
        });
      }
      return new this._abbreviation(letters).exportWithSentence(originalSentence);
    }
  }]);

  return Abbreviation;
}();
//# sourceMappingURL=abbreviation.js.map