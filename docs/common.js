console.clear();

$(function () {
  // 스크롤 시 header
  const $target = $('.section-group');
  $target.scroll(function () {
    if ($target.scrollTop() > 100) {
      $(".header").removeClass("deactive");
      $(".header").addClass("active");
      $(".logo-image2").removeClass("add");
      $(".logo-image2").addClass("add-1");
    } else {
      $(".header").removeClass("active");
      $(".header").addClass("deactive");
      $(".logo-image2").removeClass("add-1");
      $(".logo-image2").addClass("add");
    }
  });
});




