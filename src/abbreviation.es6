class Abbreviation {
  constructor(option) {
    this._config = Object.assign({
      upper: true,
      tags: ['strong'],
      class: ['abbr']
    }, option);
  }

  _abbreviation(item) {
    return new class {
      constructor(item) {
        if (item instanceof Array || typeof item === 'string') {
          this.set(item)
        } else if (typeof item !== 'undefined') {
          throw new Error('parameter must be an Array or String or DOM.');
        }
      }

      set(item) {
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

      export() {
        return this.exportWithSentence();
      }

      exportWithSentence(sentence) {
        return {
          sentence: sentence || '',
          letters: this.letters || [],
          abbr: this.abbr || []
        }
      }
    }(item);
  }

  from(item) {
    if (typeof item === 'string') {
      return this.getAbbreviationFromText(item);
    } else if (item instanceof HTMLElement) {
      return this.getAbbreviationFromDOM(item);
    } else {
      throw new Error('parameter must be an DOM or String.');
    }
  }

  getAbbreviationFromText(sentence) {
    if (!this._config.upper) {
      return this._abbreviation().export();
    }
    let letters = sentence.split('').filter((letter) => {
      return /[A-Z]/.test(letter);
    });
    return (new this._abbreviation(letters)).exportWithSentence(sentence);
  }

  getAbbreviationFromDOM(dom) {
    dom = dom.cloneNode(true);
    dom.querySelectorAll('script').forEach((script) => {
      script.parentNode.removeChild(script);
    });
    let originalSentence = (dom.textContent || dom.innerText).replace(/(\r\n|\n|\r)/gm, '');
    let condition = (this._config.tags || []).concat((this._config.class || []).map((item) => {
        return '.' + item;
      }
    ));

    let letters = [];
    let elements = condition.length > 0 ? Array.from(dom.querySelectorAll(condition.join(','))) : [];
    if (this._config.upper) {
      const seperator = String.fromCharCode(1114112);
      let unicodeTempStorage = [];
      elements.forEach((element) => {
        element.innerText = element.innerText.toUpperCase();

        if (!(/[A-Z]/.test(element.innerText))) {
          unicodeTempStorage.push(element.innerText);
          element.innerText = seperator;
        }
      });

      let cursor = 0;
      let sentence = (dom.textContent || dom.innerText).replace(/(\r\n|\n|\r)/gm, '');
      letters = sentence.split('').map((letter) => {
        if (letter === seperator) {
          return unicodeTempStorage[cursor++];
        }

        if (/[A-Z]/.test(letter)) {
          return letter;
        }

        return null;
      }).filter((item) => {
        return item !== null;
      });
    } else {
      letters = elements.map((element) => {
        let text = element.innerText;
        if (text.length === 1) {
          return text;
        }
      }).filter((item) => {
        return item !== null;
      });
    }
    return (new this._abbreviation(letters)).exportWithSentence(originalSentence);
  }
}