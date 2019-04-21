(function() {

  const body = document.querySelector('body');

  const windowDimensions = {
    w: null,
    h: null
  };

  const setWindowDimensions = function () {
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    if (
      !windowDimensions.w ||
      !windowDimensions.h ||
      Math.abs(w - windowDimensions.w) > 0 ||
      Math.abs(h - windowDimensions.h) > 100
    ) {
      windowDimensions.w = w;
      windowDimensions.h = h;
    }
  };

  setWindowDimensions();
  window.addEventListener('resize', setWindowDimensions);



  // Forcibly replace `vh` units with `px` to prevent jank.

  const maintitle = document.querySelector('.main-title');
  const tagWrap = document.querySelector('.tag-wrap');

  const fixHeights = function () {
    if (windowDimensions.w < 750 && windowDimensions.h) {
      maintitle.style.height = windowDimensions.h * 1.2 + 'px';
      tagWrap.style.height = windowDimensions.h + 'px';
    } else {
      maintitle.style.height = '';
      tagWrap.style.height = '';
    }
  };

  fixHeights();
  window.addEventListener('resize', fixHeights);



  // Menu

  const menutrigger = document.querySelector('.menu-trigger');

  menutrigger.addEventListener('click', function (e) {
    e.preventDefault();
    body.classList.toggle('has-main-menu-showing');
  });


  const menuitems = document.querySelectorAll('.main-menu a');
  const onMenuitemClick = function (e) {
    const id = e.target.getAttribute('href');
    const anchor = document.querySelector(id);

    e.preventDefault();

    body.classList.remove('has-main-menu-showing');

    window.scrollTo({
      behavior: 'smooth',
      left: 0,
      top: anchor.offsetTop
    });
  };

  for (let i = 0; i < menuitems.length; i++) {
    menuitems[i].addEventListener('click', onMenuitemClick);
  }



  // u
  //     b a
  //   m     u
  
  const umbauTitle = document.querySelector('.site-name');
  const umbauTitleLetters = document.querySelectorAll('.site-name .letter');
  const umbauTitleOffsets = [100, 60, 40, 85];

  if (umbauTitle) {
    let wHeight = windowDimensions.h;
    let tHeight = umbauTitle.offsetHeight;
    let sTop = window.scrollY;

    const umbauLax = function () {
      wHeight = windowDimensions.h;
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

  const u = document.querySelector('.site-name a');
  u.addEventListener('click', function (e) {
    e.preventDefault();

    body.classList.remove('has-main-menu-showing');

    window.scrollTo({
      behavior: 'smooth',
      left: 0,
      top: 0
    });
  });



  // Scramble

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
