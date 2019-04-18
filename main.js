(function() {

  const body = document.querySelector('body');
  const menutrigger = document.querySelector('.menu-trigger');


  // Menu
  menutrigger.addEventListener('click', function (e) {
    e.preventDefault();
    body.classList.toggle('has-main-menu-showing');
  });
  

  // u
  //     b a
  //   m     u
  
  const umbauTitle = document.querySelector('.site-name');
  const umbauTitleLetters = document.querySelectorAll('.site-name .letter');
  const umbauTitleOffsets = [100, 60, 40, 85];

  if (umbauTitle) {
    let wHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    let tHeight = umbauTitle.offsetHeight;
    let sTop = window.scrollY;

    const umbauLax = function () {
      wHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      tHeight = umbauTitle.offsetHeight;
      sTop = window.scrollY

      umbauTitleOffsets.forEach(function (offset, i) {
        umbauTitleLetters.item(i).style.transform =
          'translate3d(0, ' + (wHeight * (offset / 100) - (tHeight / 2 * (offset / 100)) - (sTop * (offset / 100))) + 'px, 0)';
      });

      window.requestAnimationFrame(umbauLax);
    };
    umbauLax();
  }


  // scramble

  const schoolOf = document.querySelector('.tag [data-words]');
  const words = JSON.parse(schoolOf.getAttribute('data-words'));
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';

  const dur = 75;
  const del = 1500;

  const getRandomLetter = function() {
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  };

  const scramble = function (index) {
    const word1 = words[index];
    const word2 = words[index + 1];
    
    const diff = Math.abs(word1.length - word2.length);
    let word = word1;
    let letter;
    
    for (let i = 0; i < diff; i++) {
      setTimeout(function () {
        if (word1.length > word2.length) {
          word = word.substr(0, word.length - 2) + '.';
        } else {
          word = word + '.';
        }

        for (let j = 0; j < word.length - 1; j++) {
          setTimeout(function () {
            letter = i < diff - 1 ? getRandomLetter() : word2[j];
            word = word.substr(0, j) + letter + word.substr(j + 1);
            schoolOf.innerHTML = word;
          }, Math.random() * dur);
        }

        if (i >= diff - 1 && index < words.length - 2) {
          setTimeout(function () {
            scramble(index + 1);
          }, del);
        }
      }, dur * i);
    }
  };

  setTimeout(function() {
    scramble(0);
  }, del);

})();
