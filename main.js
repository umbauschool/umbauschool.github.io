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


  let isTouch = false;
  
  const setIsTouch = function () {
    isTouch = true;
    setupBlurControls();

    window.removeEventListener('touchstart', setIsTouch);
  };
  window.addEventListener('touchstart', setIsTouch);



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
    umbauTitle.classList.add('is-positioned');
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



  // Un-blur image on touch screens.

  function setupBlurControls() {
    const blurredImages = document.querySelectorAll('.person-card__img-wrap');

    if ('IntersectionObserver' in window) {
      const blurer = function(entries) {
        entries.forEach(function (item) {
          if (item.isIntersecting) {
            item.target.classList.add('in-view');
          } else {
            item.target.classList.remove('in-view');
          }
        });
      };

      const observer = new IntersectionObserver(blurer, {
        rootMargin: '0px',
        threshold: 1.0
      });

      for (let i = 0; i < blurredImages.length; i++) {
        observer.observe(blurredImages[i]);
      }
    } else {
      for (let i = 0; i < blurredImages.length; i++) {
        blurredImages[i].classList.add('in-view');
      }
    }
  }


  // Studio flags.

  const studiosection = document.querySelector('.studios');
  // const studios = document.querySelectorAll('.studio');

  const stripeswrap = document.querySelector('.flagstripes');
  const stripes = document.querySelectorAll('.flagstripe');

  if (typeof window.requestAnimationFrame !== 'undefined') {

    const setStripeHeight = function () {
      let windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      const scrollBottom = scrollTop + windowHeight;

      const sectionHeight = studiosection.clientHeight;
      const sectionTop = studiosection.offsetTop;
      const sectionBottom = sectionTop + sectionHeight;

      if (scrollTop + (windowHeight / 3) > sectionTop && scrollBottom - (windowHeight / 3) < sectionBottom) {
        const percentThrough = (scrollTop + windowHeight - sectionTop) / (sectionHeight + windowHeight);
        let baseHeight = 0;
        let stripeHeight = null;

        stripeswrap.classList.add('in-view');

        if (percentThrough < 0.25) {
          stripes.forEach(function(stripe, i) {
            stripe.style.height = '';
            stripe.style.top = '';
          });
        } else if (percentThrough < 0.5) {
          baseHeight = windowHeight / 3;
          windowHeight = windowHeight / 3;

          stripeHeight = baseHeight + (windowHeight / 2 * ((percentThrough - 0.25)  / 0.25));

          stripes.forEach(function (stripe, i) {
            stripe.style.height = stripeHeight + 'px';
            stripe.style.top = stripeHeight * (i * 2) + 'px';
          });
        } else if (percentThrough < 0.75) {
          const progress = (percentThrough - 0.5) / 0.25;
          baseHeight = windowHeight / 2;
          windowHeight = windowHeight / 2 - windowHeight / 13;

          stripeHeight = baseHeight - (windowHeight * progress);

          stripes.forEach(function(stripe, i) {
            stripe.style.height = stripeHeight + 'px';
            stripe.style.top = stripeHeight * (i * 2) + 'px';
          });
        } else {
          stripes.forEach(function(stripe, i) {
            stripe.style.height = windowHeight / 13 + 'px';
            stripe.style.top = windowHeight / 13 * (i * 2) + 'px';
          });
        }
      } else {
        stripeswrap.classList.remove('in-view');
      }

      window.requestAnimationFrame(setStripeHeight);  
    };

    setStripeHeight();
  }

})();
