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

console.clear();
$(".box-count").each(function (index, node) {
  const $boxCount = $(node);

  const $btnMinus = $boxCount.find(".box-count__minus");
  const $btnPlus = $boxCount.find(".box-count__plus");
  const $num = $boxCount.find(".box-count__num");

  $btnMinus.click(function () {
    const num = parseInt($num.text());
    const newNum = num - 1 >= 0 ? num - 1 : 0;
    $num.text(newNum);
  });

  $btnPlus.click(function () {
    const maxNum = 4;
    const num = parseInt($num.text());
    const newNum = num + 1 <= maxNum ? num + 1 : maxNum;
    $num.text(newNum);
  });
});
const calendarDays = document.querySelectorAll(".calendar_days"),
  calendarTitle = document.querySelector(".title1"),
  leftButton = document.querySelector(".left_button"),
  rightButton = document.querySelector(".right_button"),
  calendar = document.querySelector(".calendar");
// dateUpdate = document.querySelector(".date_update");

class Calendar {
  constructor(year, month) {
    this.today = new Date(year, month);
    (this.year = this.today.getFullYear()),
      (this.month = this.today.getMonth()),
      (this.date = this.today.getDate()),
      (this.day = this.today.getDay());
  }

  getFirstDay() {
    const firstDate = new Date(this.year, this.month);
    return firstDate.getDay();
  }

  getLastDay() {
    let wholeDays = [];

    wholeDays = [28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31, 31];

    return wholeDays[this.month];
  }

  fillCalendar() {
    this.initCalendar();
    calendarTitle.innerHTML = `${this.year}년 ${this.month + 2}월`;
    const firstDay = this.getFirstDay();
    const lastDay = this.getLastDay();
    let day = 1;
    for (let i = firstDay; i < calendarDays.length; i++) {
      if (day <= lastDay) {
        calendarDays[
          i
        ].innerHTML = `<button class = "day_button">${day}</button>`;
        day++;
      }
    }
  }

  initCalendar() {
    calendarDays.forEach((e) => {
      e.innerHTML = "";
    });
  }

  drawCalendar() {
    let change = 0;
    const today = new Date();
    let calendarInstance = new Calendar(
      today.getFullYear(),
      today.getMonth() + change
    );

    calendarInstance.fillCalendar();

    leftButton.addEventListener("click", (e) => {
      e.stopPropagation();
      change--;
      calendarInstance = new Calendar(
        today.getFullYear(),
        today.getMonth() + change
      );
      calendarInstance.fillCalendar();
      this.updateCalendarStyle();
    });
    rightButton.addEventListener("click", (e) => {
      e.stopPropagation();
      change++;
      calendarInstance = new Calendar(
        today.getFullYear(),
        today.getMonth() + change
      );
      calendarInstance.fillCalendar();
      this.updateCalendarStyle();
    });
  }

  updateCalendarStyle() {
    const dayButtons = document.querySelectorAll(".day_button");
    let firstSelectedDay = 0;
    let lastSelectedDay = 0;
    let clickCount = 0;

    // 달력 스타일 초기화
    dayButtons.forEach((element) => {
      element.classList.remove("day_selected");
      calendarDays.forEach((e) => e.classList.remove("gray"));
    });

    // 달력 날짜들에 클릭 이벤트 추가
    dayButtons.forEach((element) => {
      element.addEventListener("click", (event) => {
        event.target.classList.toggle("day_selected");

        clickCount++;

        // 선택 일자 타입 변환
        if (firstSelectedDay === 0) {
          firstSelectedDay = Number(event.target.innerText);
        } else {
          lastSelectedDay = Number(event.target.innerText);
        }

        // 클릭 횟수 2회 넘어가면 달력 스타일 초기화
        if (clickCount > 2) {
          dayButtons.forEach((e) => {
            e.parentNode.classList.remove("gray");
            e.classList.remove("day_selected");
            clickCount = 0;
            firstSelectedDay = 0;
            lastSelectedDay = 0;
          });
        }

        // 선택 일자 사이에 회색 배경 적용
        if (firstSelectedDay !== 0 && lastSelectedDay !== 0) {
          dayButtons.forEach((e) => {
            const day = Number(e.innerText);
            if (day >= firstSelectedDay && day <= lastSelectedDay) {
              e.parentNode.classList.toggle("gray");
            }
          });
        }

        // 선택 일자 중 왼쪽값이 오른쪽 값보다 크면 회색 배경 삭제
        if (firstSelectedDay > lastSelectedDay) {
          dayButtons.forEach((e) => {
            e.parentNode.classList.remove("gray");
          });
        }
      });
    });

    // 달력 날짜들에 호버링 이벤트 추가
    dayButtons.forEach((element) => {
      element.addEventListener("mouseenter", (event) => {
        event.target.classList.add("day_hover");
      });
    });

    dayButtons.forEach((element) => {
      element.addEventListener("mouseleave", (event) => {
        event.target.classList.remove("day_hover");
      });
    });
  }

  handleEvents() {
    this.drawCalendar();
    this.updateCalendarStyle();
  }
}

const cal = new Calendar();
cal.handleEvents();

$(function () {
  var $horizontalCollapse = $(".js-horizontal-collapse");

  $horizontalCollapse.each(function () {
    var $hc = $(this);
    var itemMinWidth = $hc.data("itemMinWidth");
    var itemMaxWidth = $hc.data("itemMaxWidth");
    var $items = $hc.find(".js-horizontal-collapse-item");
    $items.each(function () {
      var $item = $(this);
      $item.css("min-width", itemMinWidth + "px");
      $item.css("width", itemMinWidth + "px");
      $item.css("max-width", itemMaxWidth + "px");

      $item.find("a").click(function (evt) {
        evt.stopPropagation();
      });

      $item.on("keypress", function (evt) {
        if (evt.keyCode === 13 || evt.keyCode === 32) {
          $(this).trigger("click");
        }
      });

      $item.on("mouseenter", function () {
        var $this = $(this);
        $this.siblings().removeClass("is-active");
        $this.siblings().css("width", itemMinWidth + "px");
        $this.addClass("is-active");
        $this.addClass("is-zindex");
        $this.css("width", itemMaxWidth + "px");
      });

      $item.on("mouseleave", function () {
        var $this = $(this);
        $this.siblings().removeClass("is-active");
        $this.siblings().css("width", itemMinWidth + "px");
        $this.removeClass("is-active");
        $this.css("width", itemMinWidth + "px");
      });

      $item.on("click ", function () {
        var $this = $(this);
        $this.siblings().removeClass("is-active");
        $this.siblings().css("width", itemMinWidth + "px");
        $this.toggleClass("is-active");
        if ($this.hasClass("is-active")) {
          $this.css("width", itemMaxWidth + "px");
        } else {
          $this.css("width", itemMinWidth + "px");
        }
      });

      var $itemInner = $item.find(".js-horizontal-collapse-item-inner");
      $itemInner.css("width", itemMaxWidth + "px");
    });
  });
});




function SwiperBox1__init() {
  const swiper = new Swiper('.swiper-box-1 .swiper', {
    loop: true,
    navigation: {
      nextEl: '.swiper-box-1 .swiper-button-next',
      prevEl: '.swiper-box-1 .swiper-button-prev',
    },
  });
}

SwiperBox1__init();



function SwiperBox2__init() {
  const swiper = new Swiper('.swiper-box-2 .swiper', {
    loop: true,
    navigation: {
      nextEl: '.button-container .next',
      prevEl: '.button-container .prev',
    },
  });
}

SwiperBox2__init();