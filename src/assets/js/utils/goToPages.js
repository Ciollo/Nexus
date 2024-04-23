export function goToPage(url) {
  $(document).ready(function () {
    $("body").fadeOut("slow", function () {
      window.location.href = url;
    });
  });
}