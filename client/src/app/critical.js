if (document.readyState === 'complete' || document.readyState !== 'loading') {
  criticalCodeInint();
} else {
  document.addEventListener('DOMContentLoaded', criticalCodeInint);
}

function criticalCodeInint() {
  var cats = document.querySelectorAll('.cat');
  cats.forEach((cat) => {
    cat.style.borderRadius = '30%';
  });
}
