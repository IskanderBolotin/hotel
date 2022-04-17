"use strict";

$(document).ready(function () {
  $("[data-open-filter]").on("click", function () {
    $("#filter").addClass("active");
    $("#filter-overlay").addClass("active");
  });
  $("body").on("mousedown", function (e) {
    if ($("#filter").hasClass("active")) {
      if (e.target.closest("#filter") === null) {
        $("#filter").removeClass("active");
        $("#filter-overlay").removeClass("active");
      }
    }
  }); // Компонент + -

  $("body").on("click", ".counterElement__button", function () {
    var min_val = $(this).parents(".counterElement").find(".counterElement__input").attr("min");
    var max_val = $(this).parents(".counterElement").find(".counterElement__input").attr("max");
    var cur_val = +$(this).parents(".counterElement").find(".counterElement__input").val();
    var inp = $(this).parents(".counterElement").find(".counterElement__input");

    if ($(this).hasClass("counterElement__button-dec")) {
      if (min_val) {
        if (!(cur_val - 1 < +min_val)) {
          $(this).parents(".counterElement").find(".counterElement__input").val(cur_val - 1);
        }
      } else if (!(cur_val - 1 < 0)) {
        $(this).parents(".counterElement").find(".counterElement__input").val(cur_val - 1);
      }
    } else if ($(this).hasClass("counterElement__button-inc")) {
      if (max_val) {
        if (!(cur_val + 1 > +max_val)) {
          $(this).parents(".counterElement").find(".counterElement__input").val(cur_val + 1);
        }
      } else {
        $(this).parents(".counterElement").find(".counterElement__input").val(cur_val + 1);
      }
    }
  });
  $("body").on("change", ".counterElement__input", function () {
    var min_val = +$(this).attr("min");
    var max_val = +$(this).attr("max");
    var cur_val = +$(this).val();
    var old_val = $(this).attr("data-val");

    if (min_val && max_val) {
      if (cur_val < min_val) {
        $(this).val(min_val);
      } else if (cur_val > max_val) {
        $(this).val(max_val);
      }
    } else if (min_val) {
      if (cur_val < min_val) {
        $(this).val(min_val);
      }
    } else if (max_val) {
      if (cur_val > max_val) {
        $(this).val(max_val);
      }
    }
  });
  $("[data-calendar-cls]").on("click", function () {
    $("[data-calendar-fixed]").removeClass("acitve");
  });
  $("[data-open-calendar]").on("click", function () {
    if ($("[data-calendar-fixed]").hasClass("acitve")) {
      $("[data-calendar-fixed]").removeClass("acitve");
    } else {
      $("[data-calendar-fixed]").addClass("acitve");
    }
  });
  $("body").on("mousedown", function (e) {
    if ($("[data-calendar-fixed]").hasClass("acitve")) {
      if (e.target.closest("[data-calendar-fixed]") === null) {
        $("[data-calendar-fixed]").removeClass("acitve");
      }
    }
  }); // календарь

  moment.locale('ru');
  var now = moment();
  var todayDate = now.format('YYYY-MM-DD');
  var todayDate_t = now.format('DD.MM.YYYY');
  $(".inline--calendar").each(function () {
    var _this = $(this);

    $(this).dateRangePicker({
      language: 'ru',
      format: 'DD.MM.YYYY',
      alwaysOpen: true,
      startOfWeek: 'monday',
      startDate: todayDate_t,
      container: _this[0],
      inline: true,
      singleDate: false,
      singleMonth: false,
      customArrowPrevSymbol: '<img src="../img/arrow-left.png">',
      customArrowNextSymbol: '<img src="../img/arrow-right.png">',
      showShortcuts: false,
      showTopbar: false,
      separator: ' - ',
      setValue: function setValue(s, s1, s2) {
        _this.parents(".calendarParent").find(".calendar--value").text(s);
      }
    });
    $(this).find(".clear--date").click(function (evt) {
      evt.stopPropagation();
      $(this).parents(".inline--calendar").data('dateRangePicker').clear();
    });
  }); // pop-up

  document.addEventListener('keydown', function (event) {
    if (event.code == 'Escape') {
      event.preventDefault();

      if ($("[data-popup-element]").hasClass("__active")) {
        var this_id;
        $("[data-popup-element]").each(function () {
          if ($(this).hasClass("__active")) {
            this_id = $(this).attr("data-pop-up");
            $(this).removeClass("__active");
          }
        });
        $("[data-popup-element]").removeClass("__active");
        $(".pop-overlay").removeClass("__active");
      }
    }
  });
  $("body").on("click", "[data-popup-close]", function () {
    $(this).parents("[data-popup-element]").removeClass("__active");
    $(".pop-overlay").removeClass("__active");
  });
  $("body").on("click", "[data-popup-close-all]", function (e) {
    if (!e.target.closest("[data-popup-element]")) {
      var this_id;
      $("[data-popup-element]").each(function () {
        if ($(this).hasClass("__active")) {
          this_id = $(this).attr("data-id");
          $(this).removeClass("__active");
        }
      });
      $("[data-popup-element]").removeClass("__active");
      $(".pop-overlay").removeClass("__active");
    }
  });
  $("body").on("click", "[data-popup-open]", function (e) {
    e.preventDefault();
    var this_id = $(this).attr("data-pop-up");
    $(".pop-overlay").removeClass("__active");
    $("[data-popup-element]").removeClass("__active");
    $("[data-popup-element]").each(function () {
      if ($(this).attr("data-pop-up") == this_id) {
        $(this).addClass("__active");
        $(".pop-overlay").addClass("__active");
      }
    });
  });
});