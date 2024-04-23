document.addEventListener("DOMContentLoaded", function(event) {
  var cursor = document.querySelector(".cursor-light");
  var links = document.querySelectorAll("a");
  var btn = document.querySelectorAll("button");
  var loginCard = document.querySelector(".login-card");
  var initCursor = false;

  var selfCard = loginCard;

  selfCard.addEventListener("mouseover", function() {
    cursor.classList.add("cursor-light--link");
  })

  selfCard.addEventListener("mouseout", function() {
    cursor.classList.remove("cursor-light--link");
  })

  for (var i = 0; i < links.length; i++) {
    var selfLink = links[i];

    selfLink.addEventListener("mouseover", function() {
      cursor.classList.add("cursor-light--link");
    });
    selfLink.addEventListener("mouseout", function() {
      cursor.classList.remove("cursor-light--link");
    });
  }

  for (var i = 0; i < btn.length; i++) {
    var selfBtn = btn[i];

    selfBtn.addEventListener("mouseover", function() {
      cursor.classList.add("cursor-light--link");
    });
    selfBtn.addEventListener("mouseout", function() {
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
