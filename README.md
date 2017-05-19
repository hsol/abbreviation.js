# Abbreviation.js

Abbreviation.js 는 제시된 문장 또는 DOM 을 통해 약어를 추출해내는 어떤 라이브러리에도 종속되지 않아 사용에 자유로운 자립형 자바스크립트 라이브러리 입니다.

Abbreviation.js is javascript library what can extract abbreviation from some sentence or HTMLDocument, Can free to use anywhere because it's stand-alone.


Options

        {
        upper: true (Boolean),
        tags: ["strong"] (string[]),
        class: ["abbr"] (string[])
        }
      

Support Types

        HTMLDocument, string
      

Usage
Source

        var option = {
        upper: true,
        tags: null,
        class: null
        };
        var abbr = new Abbreviation(option);
        console.log(abbr.from('Test-Driven Development'));
        
Result

        {
        abbr: "TDD",
        letters: ["T", "D", "D"],
        sentence: "Test-Driven Development"
        }
      
Example: https://hsol.github.io/abbreviation.js/#example
