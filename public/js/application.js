"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
    A simple jQuery modal (http://github.com/kylefox/jquery-modal)
    Version 0.9.1
*/
!function (o) {
  "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && "object" == _typeof(module.exports) ? o(require("jquery"), window, document) : o(jQuery, window, document);
}(function (o, t, i, e) {
  var s = [],
      l = function l() {
    return s.length ? s[s.length - 1] : null;
  },
      n = function n() {
    var o,
        t = !1;

    for (o = s.length - 1; o >= 0; o--) {
      s[o].$blocker && (s[o].$blocker.toggleClass("current", !t).toggleClass("behind", t), t = !0);
    }
  };

  o.modal = function (t, i) {
    var e, n;
    if (this.$body = o("body"), this.options = o.extend({}, o.modal.defaults, i), this.options.doFade = !isNaN(parseInt(this.options.fadeDuration, 10)), this.$blocker = null, this.options.closeExisting) for (; o.modal.isActive();) {
      o.modal.close();
    }
    if (s.push(this), t.is("a")) {
      if (n = t.attr("href"), this.anchor = t, /^#/.test(n)) {
        if (this.$elm = o(n), 1 !== this.$elm.length) return null;
        this.$body.append(this.$elm), this.open();
      } else this.$elm = o("<div>"), this.$body.append(this.$elm), e = function e(o, t) {
        t.elm.remove();
      }, this.showSpinner(), t.trigger(o.modal.AJAX_SEND), o.get(n).done(function (i) {
        if (o.modal.isActive()) {
          t.trigger(o.modal.AJAX_SUCCESS);
          var s = l();
          s.$elm.empty().append(i).on(o.modal.CLOSE, e), s.hideSpinner(), s.open(), t.trigger(o.modal.AJAX_COMPLETE);
        }
      }).fail(function () {
        t.trigger(o.modal.AJAX_FAIL);
        var i = l();
        i.hideSpinner(), s.pop(), t.trigger(o.modal.AJAX_COMPLETE);
      });
    } else this.$elm = t, this.anchor = t, this.$body.append(this.$elm), this.open();
  }, o.modal.prototype = {
    constructor: o.modal,
    open: function open() {
      var t = this;
      this.block(), this.anchor.blur(), this.options.doFade ? setTimeout(function () {
        t.show();
      }, this.options.fadeDuration * this.options.fadeDelay) : this.show(), o(i).off("keydown.modal").on("keydown.modal", function (o) {
        var t = l();
        27 === o.which && t.options.escapeClose && t.close();
      }), this.options.clickClose && this.$blocker.click(function (t) {
        t.target === this && o.modal.close();
      });
    },
    close: function close() {
      s.pop(), this.unblock(), this.hide(), o.modal.isActive() || o(i).off("keydown.modal");
    },
    block: function block() {
      this.$elm.trigger(o.modal.BEFORE_BLOCK, [this._ctx()]), this.$body.css("overflow", "hidden"), this.$blocker = o('<div class="' + this.options.blockerClass + ' blocker current"></div>').appendTo(this.$body), n(), this.options.doFade && this.$blocker.css("opacity", 0).animate({
        opacity: 1
      }, this.options.fadeDuration), this.$elm.trigger(o.modal.BLOCK, [this._ctx()]);
    },
    unblock: function unblock(t) {
      !t && this.options.doFade ? this.$blocker.fadeOut(this.options.fadeDuration, this.unblock.bind(this, !0)) : (this.$blocker.children().appendTo(this.$body), this.$blocker.remove(), this.$blocker = null, n(), o.modal.isActive() || this.$body.css("overflow", ""));
    },
    show: function show() {
      this.$elm.trigger(o.modal.BEFORE_OPEN, [this._ctx()]), this.options.showClose && (this.closeButton = o('<a href="#close-modal" rel="modal:close" class="close-modal ' + this.options.closeClass + '">' + this.options.closeText + "</a>"), this.$elm.append(this.closeButton)), this.$elm.addClass(this.options.modalClass).appendTo(this.$blocker), this.options.doFade ? this.$elm.css({
        opacity: 0,
        display: "inline-block"
      }).animate({
        opacity: 1
      }, this.options.fadeDuration) : this.$elm.css("display", "inline-block"), this.$elm.trigger(o.modal.OPEN, [this._ctx()]);
    },
    hide: function hide() {
      this.$elm.trigger(o.modal.BEFORE_CLOSE, [this._ctx()]), this.closeButton && this.closeButton.remove();
      var t = this;
      this.options.doFade ? this.$elm.fadeOut(this.options.fadeDuration, function () {
        t.$elm.trigger(o.modal.AFTER_CLOSE, [t._ctx()]);
      }) : this.$elm.hide(0, function () {
        t.$elm.trigger(o.modal.AFTER_CLOSE, [t._ctx()]);
      }), this.$elm.trigger(o.modal.CLOSE, [this._ctx()]);
    },
    showSpinner: function showSpinner() {
      this.options.showSpinner && (this.spinner = this.spinner || o('<div class="' + this.options.modalClass + '-spinner"></div>').append(this.options.spinnerHtml), this.$body.append(this.spinner), this.spinner.show());
    },
    hideSpinner: function hideSpinner() {
      this.spinner && this.spinner.remove();
    },
    _ctx: function _ctx() {
      return {
        elm: this.$elm,
        $elm: this.$elm,
        $blocker: this.$blocker,
        options: this.options
      };
    }
  }, o.modal.close = function (t) {
    if (o.modal.isActive()) {
      t && t.preventDefault();
      var i = l();
      return i.close(), i.$elm;
    }
  }, o.modal.isActive = function () {
    return s.length > 0;
  }, o.modal.getCurrent = l, o.modal.defaults = {
    closeExisting: !0,
    escapeClose: !0,
    clickClose: !0,
    closeText: "Close",
    closeClass: "",
    modalClass: "modal",
    blockerClass: "jquery-modal",
    spinnerHtml: '<div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div>',
    showSpinner: !0,
    showClose: !0,
    fadeDuration: null,
    fadeDelay: 1
  }, o.modal.BEFORE_BLOCK = "modal:before-block", o.modal.BLOCK = "modal:block", o.modal.BEFORE_OPEN = "modal:before-open", o.modal.OPEN = "modal:open", o.modal.BEFORE_CLOSE = "modal:before-close", o.modal.CLOSE = "modal:close", o.modal.AFTER_CLOSE = "modal:after-close", o.modal.AJAX_SEND = "modal:ajax:send", o.modal.AJAX_SUCCESS = "modal:ajax:success", o.modal.AJAX_FAIL = "modal:ajax:fail", o.modal.AJAX_COMPLETE = "modal:ajax:complete", o.fn.modal = function (t) {
    return 1 === this.length && new o.modal(this, t), this;
  }, o(i).on("click.modal", 'a[rel~="modal:close"]', o.modal.close), o(i).on("click.modal", 'a[rel~="modal:open"]', function (t) {
    t.preventDefault(), o(this).modal();
  });
});
'use strict';

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function onFormSubmitHandler(evt) {
  var target = evt.target;
  var formSubmitButton = target.querySelector("button[type=\"submit\"]");
  formSubmitButton.textContent = "Sending...";
  formSubmitButton.classList.add("form__button_in-progress");
}

function resetInProgressFormStyles(evt) {
  var target = evt.target;
  var formSubmitButton = target.querySelector("button[type=\"submit\"]");
  setTimeout(function () {
    formSubmitButton.textContent = "Send";
    formSubmitButton.classList.remove("form__button_in-progress");
  }, 350);
}

function onFormMailSentHandler(evt) {
  resetInProgressFormStyles(evt); // Show success modal

  setTimeout(function () {
    jQuery(".contact-form-modal").modal();
  }, 350);
}

function onFileFormInputChangeHandler(evt) {
  var target = evt.target;
  var files = target.files;
  target.closest(".form__file").querySelector(".form__file-name").textContent = files[0].name;
}

function onMobileMenuOpenButtonClickHandler() {
  if (headerStickyElement) {
    headerStickyElement.classList.toggle("header_active");
  }

  mobileMenuOpenButton.classList.toggle("header__mobile-menu-button_active");
  navigationElement.classList.toggle("header__navigation_open");
}

function resetFilter(filterElements) {
  var _iterator = _createForOfIteratorHelper(filterElements),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var filterElement = _step.value;
      filterElement.classList.remove("d-none");
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

function filter(filteredElement, filterElements) {
  var _iterator2 = _createForOfIteratorHelper(filterElements),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var filterElement = _step2.value;
      var filterElementTags = filterElement.dataset.tags.split(', ');

      if (!filterElementTags.includes(filteredElement, 0)) {
        filterElement.classList.add("d-none");
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
}

function onFilterContainerClickHandler(evt) {
  var target = evt.target;
  var filterElements = document.querySelectorAll("[data-tags]");
  var targetFilterValue = target.textContent;

  if (target.matches("button")) {
    if (target.classList.contains("filter__button_active")) {
      var _iterator3 = _createForOfIteratorHelper(filterButtons),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var filterButton = _step3.value;
          filterButton.classList.remove("filter__button_disable");
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      target.classList.remove("filter__button_active"); // Reset filter

      resetFilter(filterElements);
    } else {
      var _iterator4 = _createForOfIteratorHelper(filterButtons),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var _filterButton = _step4.value;

          _filterButton.classList.add("filter__button_disable");

          _filterButton.classList.remove("filter__button_active");
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      target.classList.remove("filter__button_disable");
      target.classList.add("filter__button_active"); // Init filter

      filter(targetFilterValue, filterElements);
    }
  }
} // Variables


var form = document.querySelector(".wpcf7-form");
var wpcf7form = document.querySelector(".wpcf7");
var fileFormInput = document.querySelector("input[type=\"file\"]");
var mobileMenuOpenButton = document.querySelector(".header__mobile-menu-button");
var navigationElement = document.querySelector(".header__navigation");
var headerStickyElement = document.querySelector(".header_sticky");
var filterContainer = document.querySelector(".filter");
var filterButtons = document.querySelectorAll(".filter__button"); // Events

document.addEventListener("DOMContentLoaded", function () {
  mobileMenuOpenButton.addEventListener("click", onMobileMenuOpenButtonClickHandler);

  if (form) {
    form.addEventListener("submit", onFormSubmitHandler);
    wpcf7form.addEventListener("wpcf7invalid", resetInProgressFormStyles);
    wpcf7form.addEventListener("wpcf7mailsent", onFormMailSentHandler);
    fileFormInput.addEventListener("change", onFileFormInputChangeHandler, false);
  }

  if (filterContainer) {
    filterContainer.addEventListener("click", onFilterContainerClickHandler);
  }
});