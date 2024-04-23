document.addEventListener("DOMContentLoaded", function(event) {
  var cursor = document.querySelector(".cursor-light");
  var noCursorEffectOnHover = document.querySelectorAll(".no-cursor-effect");
  var initCursor = false;

  for (var i = 0; i < noCursorEffectOnHover.length; i++) {
    var selfNoCursorEffectOnHover = noCursorEffectOnHover[i];

    selfNoCursorEffectOnHover.addEventListener("mouseover", function() {
    cursor.classList.add("cursor-light--link");
    });
    selfNoCursorEffectOnHover.addEventListener("mouseout", function() {
    cursor.classList.remove("cursor-light--link");
    });
  }

  window.onmousemove = function(e) {
    var mouseX = e.clientX;
    var mouseY = e.clientY;

    if (!initCursor) {
      // cursor.style.opacity = 1;
      TweenLite.to(cursor, 0.3, {
        opacity: 1
      });
      initCursor = true;
    }

    TweenLite.to(cursor, 0, {
      top: mouseY + "px",
      left: mouseX + "px"
    });
  };

  window.onmouseout = function(e) {
    TweenLite.to(cursor, 0.3, {
      opacity: 0
    });
    initCursor = false;
  };
});
