(function() {

  const body = document.querySelector('body');
  const menutrigger = document.querySelector('.menu-trigger');

  menutrigger.addEventListener('click', function (e) {
    e.preventDefault();
    body.classList.toggle('has-main-menu-showing');
  });
  

})();