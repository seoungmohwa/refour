$(".filter").mouseenter(function () {
    let ff = $(".filter").hasClass("active-1");
    if (ff) {
      $(".filter").removeClass("active-1");
      $('.filter').addClass('active-1');
    } else {
      $(".filter").removeClass("active-1");
      $('.filter').addClass('active-1');
    }
  });
  
  $(".filter").mouseleave(function () {
    let ff = $(".filter").hasClass("active-1");
    if (ff) {
      $(".filter").removeClass("active-1");
    } 
  });