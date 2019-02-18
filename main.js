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

})();