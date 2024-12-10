"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
(function () {
  var apiURL = 'https://fav-prom.com/api_ny_hr';
  var urlParams = new URLSearchParams(window.location.search);
  var participateParam = 'reg';

  // const FUTURE_QUEST_TYPE = 'future',
  //     OLD_QUEST_TYPE = 'old',
  //     ACTIVE_QUEST_TYPE = 'active';

  var resultsTableOther = document.querySelector('.tableResults__body-other'),
    mainBlock = document.querySelector(".fav__page"),
    topResultsTable = document.getElementById('top-users'),
    unauthMsgs = document.querySelectorAll('.unauth-msg'),
    participateBtns = document.querySelectorAll('.btn-join'),
    resultsTableWrapper = document.getElementById('results-table'),
    redirectBtns = document.querySelectorAll('.took-part'),
    questDivs = document.querySelectorAll('.route__item'),
    playBtn = document.querySelector('.quest-play'),
    questStartBtns = document.querySelectorAll('.questBtn'),
    questPopup = document.querySelector('.quest'),
    questLevelDivs = document.querySelectorAll('.quest__item'),
    popupPlayBtn = document.querySelector('.firstPlay'),
    weeksSelector = document.querySelectorAll('.tableResults__tabs-item'),
    weeksContainer = document.querySelector('.tableResults__tabs');
  var currentDate = new Date(); //new Date("2023-12-14T21:00:00.000Z");
  var users;
  var quests;
  var userInfo;
  var selectedWeekTabId;
  var hrLeng = document.querySelector('#ukLeng');
  var enLeng = document.querySelector('#enLeng');
  var locale = sessionStorage.getItem("locale") ? sessionStorage.getItem("locale") : "hr";
  mainBlock.classList.add(locale);
  if (hrLeng) locale = 'hr';
  if (enLeng) locale = 'en';
  var PRIZES_CSS = ['place1', 'place2', 'place3'];
  var i18nData = {};
  var userId;
  // userId = 100300268;
  userId = 1499938;
  function setState(newLocale) {
    locale = newLocale;
    sessionStorage.setItem('locale', locale);
  }
  function toggleState() {
    var newLocale = locale === 'en' ? 'hr' : 'en';
    setState(newLocale);
    window.location.reload();
  }
  document.querySelector('.en-btn').addEventListener('click', function () {
    toggleState();
  });
  // let userId = 100340020;

  function loadTranslations() {
    return fetch("".concat(apiURL, "/translates/").concat(locale)).then(function (res) {
      return res.json();
    }).then(function (json) {
      i18nData = json;
      translate();
      var mutationObserver = new MutationObserver(function (mutations) {
        translate();
      });
      mutationObserver.observe(document.getElementById('newYear2024'), {
        childList: true,
        subtree: true
      });
    });
  }
  function translate() {
    var elems = document.querySelectorAll('[data-translate]');
    if (elems && elems.length) {
      elems.forEach(function (elem) {
        var key = elem.getAttribute('data-translate');
        elem.innerHTML = i18nData[key] || '*----NEED TO BE TRANSLATED----*   key:  ' + key;
        elem.removeAttribute('data-translate');
      });
      console.log("translate is working");
    }
    refreshLocalizedClass();
  }
  function refreshLocalizedClass(element, baseCssClass) {
    if (!element) {
      return;
    }
    for (var _i = 0, _arr = ['uk', 'en']; _i < _arr.length; _i++) {
      var lang = _arr[_i];
      element.classList.remove(baseCssClass + lang);
    }
    element.classList.add(baseCssClass + locale);
  }
  var request = function request(link, extraOptions) {
    return fetch(apiURL + link, _objectSpread({
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }, extraOptions || {})).then(function (res) {
      return res.json();
    });
  };
  function getData() {
    return Promise.all([request('/users')
    // request('/quests')
    ]);
  }
  function initDrop() {
    var openDrop = document.querySelectorAll(".infoRules");
    var deskClass = document.querySelector('.Footer_container--BSX');
    openDrop.forEach(function (open) {
      open.addEventListener('click', function () {
        var details = document.getElementById("dropOpen");
        details.open = true;
      });
    });
    if (!deskClass) {
      openDrop.forEach(function (item) {
        return item.classList.add('blockLink');
      });
    }
  }
  var InitPage = function InitPage() {
    initDrop();
    questStartBtns.forEach(function (questStartBtn) {
      return questStartBtn.addEventListener('click', function (e) {
        registerInQuest();
      });
    });
    weeksSelector.forEach(function (w, i) {
      return w.addEventListener('click', function (e) {
        if (i === selectedWeekTabId) {
          return;
        }
        weeksSelector.forEach(function (s) {
          return s.classList.remove('active');
        });
        w.classList.add('active');
        selectedWeekTabId = i;
        refreshUsers(selectedWeekTabId + 1);
      });
    });
    refreshUsers(selectedWeekTabId + 1);
    getData().then(function (res) {
      users = res[0];
      quests = res[1] || [];
      // console.log(quests);
      renderUsers(users);
      translate();
    });
  };
  function calculateRecentPromoWeeks() {
    var date = Date.now();
    if (date < new Date("2024-10-07T21:00:00Z")) {
      return 1;
    } else if (date < new Date("2024-10-21T21:00:00Z")) {
      return 2;
    } else if (date < new Date("2024-10-28T21:00:00Z")) {
      return 3;
    } else {
      return 4;
    }
  }
  function refreshWeekTabs() {
    selectedWeekTabId = calculateRecentPromoWeeks() - 1;
    if (!selectedWeekTabId || selectedWeekTabId === 0) {
      // promo not started yet
      weeksContainer.classList.add('hide');
      return;
    }
    for (var i = 0; i < 4; i++) {
      var weekSelector = weeksSelector[i];
      if (selectedWeekTabId < i) {
        weekSelector.classList.add('hide');
      }
    }
    weeksSelector.forEach(function (w, i) {
      w.classList.remove('active');
      if (i === selectedWeekTabId) {
        w.classList.add('active');
      }
    });
  }
  function refreshUsers(week) {
    getUsers(week).then(function (users) {
      renderUsers(users);
      translate();
    });
  }
  function getUsers(week) {
    var url = resolveUsersUrl(week);
    return request(url).then(function (users) {
      return users.map(function (userOrId) {
        return typeof userOrId === 'number' ? {
          userid: userOrId
        } : userOrId;
      });
    });
  }
  function resolveUsersUrl(week) {
    return week ? "/users/".concat(week) : '/users';
  }
  function init() {
    if (window.store) {
      var state = window.store.getState();
      userId = state.auth.isAuthorized && state.auth.id || '';
      setupPage();
    } else {
      setupPage();
      var c = 0;
      var i = setInterval(function () {
        if (c < 50) {
          if (!!window.g_user_id) {
            userId = window.g_user_id;
            setupPage();
            checkUserAuth();
            clearInterval(i);
          }
        } else {
          clearInterval(i);
        }
      }, 200);
    }
    checkUserAuth();
    participateBtns.forEach(function (authBtn, i) {
      authBtn.addEventListener('click', function (e) {
        e.preventDefault();
        participate();
      });
    });
  }
  function setupPage() {
    if (userId && urlParams.has(participateParam)) {
      participate(true);
    } else {
      InitPage();
    }
  }
  function participate(fastReg) {
    if (!userId) {
      return;
    }
    var params = {
      userid: userId
    };
    request('/user', {
      method: 'POST',
      body: JSON.stringify(params)
    }).then(function (res) {
      participateBtns.forEach(function (item) {
        return item.classList.add('hide');
      });
      redirectBtns.forEach(function (item) {
        return item.classList.remove('hide');
      });
      InitPage();
    });
  }
  function registerInQuest() {
    if (!userId) {
      return;
    }
    var params = {
      userid: userId
    };
    request('/questreg', {
      method: 'POST',
      body: JSON.stringify(params)
    }).then(function (res) {
      playBtn.classList.remove('hide');
      popupPlayBtn.classList.remove('hide');
      questStartBtns.forEach(function (questStartBtn) {
        return questStartBtn.classList.add('hide');
      });
    });
  }
  var renderUsers = function renderUsers(users) {
    resultsTableWrapper.classList.remove('hide');
    resultsTableOther.classList.remove('hide');
    if (users && users.length) {
      var topUsers = users.slice(0, 10);
      populateUsersTable(topUsers, userId, topResultsTable, users);
      var currentUser = userId && users.find(function (user) {
        return user.userid === userId;
      });
      var currentUserIndex = currentUser && users.indexOf(currentUser);
      var otherUsers;
      if (!currentUserIndex || currentUserIndex < 10) {
        otherUsers = users.slice(10, 13);
      } else {
        otherUsers = users.slice(Math.max(currentUserIndex - 1, 10), currentUserIndex + 2);
      }
      if (otherUsers && otherUsers.length) {
        populateUsersTable(otherUsers, userId, resultsTableOther, users);
      }
    }
  };
  function formatText(text) {
    return text.split('(')[0];
  }
  function populateUsersTable(users, currentUserId, table, allUsers) {
    table.innerHTML = '';
    if (users && users.length) {
      users.forEach(function (user) {
        var checkCurrentUser = currentUserId && currentUserId === user.userid;
        var additionalUserRow = document.createElement('div');
        additionalUserRow.classList.add('tableResults__row');
        // console.log(checkCurrentUser)
        // console.log(currentUserId, user.userid)

        if (checkCurrentUser) {
          additionalUserRow.classList.add('_yourPlace');
        }
        var place = allUsers.indexOf(user) + 1;
        var prizePlaceCss = PRIZES_CSS[place - 1];
        if (prizePlaceCss) {
          additionalUserRow.classList.add(prizePlaceCss);
        }
        var prizeKey = getPrizeTranslationKey(user.points);
        additionalUserRow.innerHTML = "\n                        <div class=\"tableResults__body-col\" ".concat(checkCurrentUser, ">").concat(place, "</div>\n                        <div class=\"tableResults__body-col\">").concat(checkCurrentUser ? user.userid : maskUserId(user.userid), "</div>\n                        <div class=\"tableResults__body-col\">").concat(Math.floor(user.points), "</div>\n                        <div class=\"tableResults__body-col\">").concat(prizeKey ? formatText(translateKey(prizeKey)) : ' - ', "</div>\n                    ");
        table.append(additionalUserRow);
      });
    }
  }
  function getPrizeTranslationKey(points) {
    if (points >= 10000) {
      return 'prize_1';
    } else if (points >= 5000 && points <= 9999) {
      return 'prize_2';
    } else if (points >= 1500 && points <= 4999) {
      return 'prize_3';
    } else if (points >= 500 && points <= 1499) {
      return 'prize_4';
    } else if (points >= 150 && points <= 499) {
      return 'prize_5';
    } else if (points >= 50 && points <= 149) {
      return 'prize_6';
    }
  }
  function translateKey(key) {
    if (!key) {
      return;
    }
    return i18nData[key] || '*----NEED TO BE TRANSLATED----*   key:  ' + key;
  }
  function maskUserId(userId) {
    return "****" + userId.toString().slice(4);
  }
  var checkUserAuth = function checkUserAuth() {
    if (userId) {
      var _iterator = _createForOfIteratorHelper(unauthMsgs),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var unauthMes = _step.value;
          unauthMes.classList.add('hide');
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      request("/favuser/".concat(userId)).then(function (res) {
        if (res && res.userid) {
          participateBtns.forEach(function (item) {
            return item.classList.add('hide');
          });
          redirectBtns.forEach(function (item) {
            return item.classList.remove('hide');
          });
          questStartBtns.forEach(function (item) {
            return item.classList.add('hide');
          });
          userInfo = res;
        } else {
          participateBtns.forEach(function (item) {
            return item.classList.remove('hide');
          });
        }
      });
    } else {
      var _iterator2 = _createForOfIteratorHelper(participateBtns),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var participateBtn = _step2.value;
          participateBtn.classList.add('hide');
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      var _iterator3 = _createForOfIteratorHelper(unauthMsgs),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _unauthMes = _step3.value;
          _unauthMes.classList.remove('hide');
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  };
  loadTranslations().then(init);
  var mainPage = document.querySelector('.fav__page');
  setTimeout(function () {
    return mainPage.classList.add('overflow');
  }, 1000);

  //show popupchik
  var body = document.querySelector('body');
  var popupWrap = document.querySelector('.popup');
  var btnTableShow = document.querySelector('.result__subtext');
  var tablePopup = document.querySelector('.prize-fund');
  var tablePopupBtnClose = document.querySelector('.prize-fund-close');
  btnTableShow.addEventListener('click', function () {
    popupWrap.classList.remove('_hidden');
    body.style.overflow = 'hidden';
    tablePopup.style.display = 'block';
  });
  tablePopupBtnClose.addEventListener('click', function () {
    popupWrap.classList.add('_hidden');
    body.style.overflow = 'auto';
    tablePopup.style.display = 'none';
  });

  //show rules- details
  var rulesItems = document.querySelectorAll('.rules__item');
  rulesItems.forEach(function (item) {
    item.addEventListener('click', function () {
      item.classList.toggle('_open');
    });
  });

  // for test
  document.querySelector(".dark-btn").addEventListener("click", function () {
    document.body.classList.toggle("dark");
  });
  var week = 1;
  var gameWrap = document.querySelector(".game__house"),
    weekBtn = document.querySelector(".week-btn");
  weekBtn.addEventListener("click", function () {
    if (week >= 4) {
      gameWrap.classList.remove("week".concat(week));
      week = 1;
      gameWrap.classList.add("week".concat(week));
      return;
    }
    gameWrap.classList.remove("week".concat(week));
    week++;
    gameWrap.classList.add("week".concat(week));
  });
})();
"use strict";
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJzZWNvbmQuanMiXSwibmFtZXMiOlsiYXBpVVJMIiwidXJsUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwid2luZG93IiwibG9jYXRpb24iLCJzZWFyY2giLCJwYXJ0aWNpcGF0ZVBhcmFtIiwicmVzdWx0c1RhYmxlT3RoZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJtYWluQmxvY2siLCJ0b3BSZXN1bHRzVGFibGUiLCJnZXRFbGVtZW50QnlJZCIsInVuYXV0aE1zZ3MiLCJxdWVyeVNlbGVjdG9yQWxsIiwicGFydGljaXBhdGVCdG5zIiwicmVzdWx0c1RhYmxlV3JhcHBlciIsInJlZGlyZWN0QnRucyIsInF1ZXN0RGl2cyIsInBsYXlCdG4iLCJxdWVzdFN0YXJ0QnRucyIsInF1ZXN0UG9wdXAiLCJxdWVzdExldmVsRGl2cyIsInBvcHVwUGxheUJ0biIsIndlZWtzU2VsZWN0b3IiLCJ3ZWVrc0NvbnRhaW5lciIsImN1cnJlbnREYXRlIiwiRGF0ZSIsInVzZXJzIiwicXVlc3RzIiwidXNlckluZm8iLCJzZWxlY3RlZFdlZWtUYWJJZCIsImhyTGVuZyIsImVuTGVuZyIsImxvY2FsZSIsInNlc3Npb25TdG9yYWdlIiwiZ2V0SXRlbSIsImNsYXNzTGlzdCIsImFkZCIsIlBSSVpFU19DU1MiLCJpMThuRGF0YSIsInVzZXJJZCIsInNldFN0YXRlIiwibmV3TG9jYWxlIiwic2V0SXRlbSIsInRvZ2dsZVN0YXRlIiwicmVsb2FkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImxvYWRUcmFuc2xhdGlvbnMiLCJmZXRjaCIsImNvbmNhdCIsInRoZW4iLCJyZXMiLCJqc29uIiwidHJhbnNsYXRlIiwibXV0YXRpb25PYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJtdXRhdGlvbnMiLCJvYnNlcnZlIiwiY2hpbGRMaXN0Iiwic3VidHJlZSIsImVsZW1zIiwibGVuZ3RoIiwiZm9yRWFjaCIsImVsZW0iLCJrZXkiLCJnZXRBdHRyaWJ1dGUiLCJpbm5lckhUTUwiLCJyZW1vdmVBdHRyaWJ1dGUiLCJjb25zb2xlIiwibG9nIiwicmVmcmVzaExvY2FsaXplZENsYXNzIiwiZWxlbWVudCIsImJhc2VDc3NDbGFzcyIsIl9pIiwiX2FyciIsImxhbmciLCJyZW1vdmUiLCJyZXF1ZXN0IiwibGluayIsImV4dHJhT3B0aW9ucyIsIl9vYmplY3RTcHJlYWQiLCJoZWFkZXJzIiwiZ2V0RGF0YSIsIlByb21pc2UiLCJhbGwiLCJpbml0RHJvcCIsIm9wZW5Ecm9wIiwiZGVza0NsYXNzIiwib3BlbiIsImRldGFpbHMiLCJpdGVtIiwiSW5pdFBhZ2UiLCJxdWVzdFN0YXJ0QnRuIiwiZSIsInJlZ2lzdGVySW5RdWVzdCIsInciLCJpIiwicyIsInJlZnJlc2hVc2VycyIsInJlbmRlclVzZXJzIiwiY2FsY3VsYXRlUmVjZW50UHJvbW9XZWVrcyIsImRhdGUiLCJub3ciLCJyZWZyZXNoV2Vla1RhYnMiLCJ3ZWVrU2VsZWN0b3IiLCJ3ZWVrIiwiZ2V0VXNlcnMiLCJ1cmwiLCJyZXNvbHZlVXNlcnNVcmwiLCJtYXAiLCJ1c2VyT3JJZCIsInVzZXJpZCIsImluaXQiLCJzdG9yZSIsInN0YXRlIiwiZ2V0U3RhdGUiLCJhdXRoIiwiaXNBdXRob3JpemVkIiwiaWQiLCJzZXR1cFBhZ2UiLCJjIiwic2V0SW50ZXJ2YWwiLCJnX3VzZXJfaWQiLCJjaGVja1VzZXJBdXRoIiwiY2xlYXJJbnRlcnZhbCIsImF1dGhCdG4iLCJwcmV2ZW50RGVmYXVsdCIsInBhcnRpY2lwYXRlIiwiaGFzIiwiZmFzdFJlZyIsInBhcmFtcyIsIm1ldGhvZCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwidG9wVXNlcnMiLCJzbGljZSIsInBvcHVsYXRlVXNlcnNUYWJsZSIsImN1cnJlbnRVc2VyIiwiZmluZCIsInVzZXIiLCJjdXJyZW50VXNlckluZGV4IiwiaW5kZXhPZiIsIm90aGVyVXNlcnMiLCJNYXRoIiwibWF4IiwiZm9ybWF0VGV4dCIsInRleHQiLCJzcGxpdCIsImN1cnJlbnRVc2VySWQiLCJ0YWJsZSIsImFsbFVzZXJzIiwiY2hlY2tDdXJyZW50VXNlciIsImFkZGl0aW9uYWxVc2VyUm93IiwiY3JlYXRlRWxlbWVudCIsInBsYWNlIiwicHJpemVQbGFjZUNzcyIsInByaXplS2V5IiwiZ2V0UHJpemVUcmFuc2xhdGlvbktleSIsInBvaW50cyIsIm1hc2tVc2VySWQiLCJmbG9vciIsInRyYW5zbGF0ZUtleSIsImFwcGVuZCIsInRvU3RyaW5nIiwiX2l0ZXJhdG9yIiwiX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIiLCJfc3RlcCIsIm4iLCJkb25lIiwidW5hdXRoTWVzIiwidmFsdWUiLCJlcnIiLCJmIiwiX2l0ZXJhdG9yMiIsIl9zdGVwMiIsInBhcnRpY2lwYXRlQnRuIiwiX2l0ZXJhdG9yMyIsIl9zdGVwMyIsIm1haW5QYWdlIiwic2V0VGltZW91dCIsInBvcHVwV3JhcCIsImJ0blRhYmxlU2hvdyIsInRhYmxlUG9wdXAiLCJ0YWJsZVBvcHVwQnRuQ2xvc2UiLCJzdHlsZSIsIm92ZXJmbG93IiwiZGlzcGxheSIsInJ1bGVzSXRlbXMiLCJ0b2dnbGUiLCJnYW1lV3JhcCIsIndlZWtCdG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsQ0FBQyxZQUFZO0VBQ1QsSUFBTUEsTUFBTSxHQUFHLGdDQUFnQztFQUMvQyxJQUFNQyxTQUFTLEdBQUcsSUFBSUMsZUFBZSxDQUFDQyxNQUFNLENBQUNDLFFBQVEsQ0FBQ0MsTUFBTSxDQUFDO0VBQzdELElBQU1DLGdCQUFnQixHQUFHLEtBQUs7O0VBRTlCO0VBQ0E7RUFDQTs7RUFFQSxJQUNJQyxpQkFBaUIsR0FBR0MsUUFBUSxDQUFDQyxhQUFhLENBQUMsMkJBQTJCLENBQUM7SUFDdkVDLFNBQVMsR0FBR0YsUUFBUSxDQUFDQyxhQUFhLENBQUMsWUFBWSxDQUFDO0lBQ2hERSxlQUFlLEdBQUdILFFBQVEsQ0FBQ0ksY0FBYyxDQUFDLFdBQVcsQ0FBQztJQUN0REMsVUFBVSxHQUFHTCxRQUFRLENBQUNNLGdCQUFnQixDQUFDLGFBQWEsQ0FBQztJQUNyREMs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QUM7TUFDckM7SUFDSjtJQUNBcUYsUUFBUSxDQUFDMUosU0FBUyxDQUFDd0MsTUFBTSxRQUFBM0IsTUFBQSxDQUFRd0QsSUFBSSxDQUFFLENBQUM7SUFDeENBLElBQUksRUFBRTtJQUNOcUYsUUFBUSxDQUFDMUosU0FBUyxDQUFDQyxHQUFHLFFBQUFZLE1BQUEsQ0FBUXdELElBQUksQ0FBRSxDQUFDO0VBQ3pDLENBQUMsQ0FBQztBQUdOLENBQUMsRUFBRSxDQUFDO0FDMWNKIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGFwaVVSTCA9ICdodHRwczovL2Zhdi1wcm9tLmNvbS9hcGlfbnlfaHInO1xuICAgIGNvbnN0IHVybFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG4gICAgY29uc3QgcGFydGljaXBhdGVQYXJhbSA9ICdyZWcnO1xuXG4gICAgLy8gY29uc3QgRlVUVVJFX1FVRVNUX1RZUEUgPSAnZnV0dXJlJyxcbiAgICAvLyAgICAgT0xEX1FVRVNUX1RZUEUgPSAnb2xkJyxcbiAgICAvLyAgICAgQUNUSVZFX1FVRVNUX1RZUEUgPSAnYWN0aXZlJztcblxuICAgIGNvbnN0XG4gICAgICAgIHJlc3VsdHNUYWJsZU90aGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhYmxlUmVzdWx0c19fYm9keS1vdGhlcicpLFxuICAgICAgICBtYWluQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZhdl9fcGFnZVwiKSxcbiAgICAgICAgdG9wUmVzdWx0c1RhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvcC11c2VycycpLFxuICAgICAgICB1bmF1dGhNc2dzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnVuYXV0aC1tc2cnKSxcbiAgICAgICAgcGFydGljaXBhdGVCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJ0bi1qb2luJyksXG4gICAgICAgIHJlc3VsdHNUYWJsZVdyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdWx0cy10YWJsZScpLFxuICAgICAgICByZWRpcmVjdEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9vay1wYXJ0JyksXG4gICAgICAgIHF1ZXN0RGl2cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yb3V0ZV9faXRlbScpLFxuICAgICAgICBwbGF5QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnF1ZXN0LXBsYXknKSxcbiAgICAgICAgcXVlc3RTdGFydEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucXVlc3RCdG4nKSxcbiAgICAgICAgcXVlc3RQb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5xdWVzdCcpLFxuICAgICAgICBxdWVzdExldmVsRGl2cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5xdWVzdF9faXRlbScpLFxuICAgICAgICBwb3B1cFBsYXlCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmlyc3RQbGF5JyksXG4gICAgICAgIHdlZWtzU2VsZWN0b3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFibGVSZXN1bHRzX190YWJzLWl0ZW0nKSxcbiAgICAgICAgd2Vla3NDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFibGVSZXN1bHRzX190YWJzJyk7XG5cbiAgICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7IC8vbmV3IERhdGUoXCIyMDIzLTEyLTE0VDIxOjAwOjAwLjAwMFpcIik7XG4gICAgbGV0IHVzZXJzO1xuICAgIGxldCBxdWVzdHM7XG4gICAgbGV0IHVzZXJJbmZvO1xuICAgIGxldCBzZWxlY3RlZFdlZWtUYWJJZDtcblxuICAgIGNvbnN0IGhyTGVuZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1a0xlbmcnKTtcbiAgICBjb25zdCBlbkxlbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZW5MZW5nJyk7XG5cbiAgICBsZXQgbG9jYWxlID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImxvY2FsZVwiKSA/IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJsb2NhbGVcIikgOiBcImhyXCI7XG5cbiAgICBtYWluQmxvY2suY2xhc3NMaXN0LmFkZChsb2NhbGUpXG5cbiAgICBpZiAoaHJMZW5nKSBsb2NhbGUgPSAnaHInO1xuICAgIGlmIChlbkxlbmcpIGxvY2FsZSA9ICdlbic7XG5cbiAgICBjb25zdCBQUklaRVNfQ1NTID0gWydwbGFjZTEnLCAncGxhY2UyJywgJ3BsYWNlMyddO1xuXG4gICAgbGV0IGkxOG5EYXRhID0ge307XG4gICAgbGV0IHVzZXJJZDtcbiAgICAvLyB1c2VySWQgPSAxMDAzMDAyNjg7XG4gICAgdXNlcklkID0gMTQ5OTkzODtcblxuICAgIGZ1bmN0aW9uIHNldFN0YXRlKG5ld0xvY2FsZSkge1xuICAgICAgICBsb2NhbGUgPSBuZXdMb2NhbGU7XG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ2xvY2FsZScsIGxvY2FsZSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRvZ2dsZVN0YXRlKCkge1xuICAgICAgICBjb25zdCBuZXdMb2NhbGUgPSBsb2NhbGUgPT09ICdlbicgPyAnaHInIDogJ2VuJztcbiAgICAgICAgc2V0U3RhdGUobmV3TG9jYWxlKTtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpXG4gICAgfVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lbi1idG4nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgdG9nZ2xlU3RhdGUoKTtcbiAgICB9KTtcbiAgICAvLyBsZXQgdXNlcklkID0gMTAwMzQwMDIwO1xuXG4gICAgZnVuY3Rpb24gbG9hZFRyYW5zbGF0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKGAke2FwaVVSTH0vdHJhbnNsYXRlcy8ke2xvY2FsZX1gKS50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgICAgICAgLnRoZW4oanNvbiA9PiB7XG4gICAgICAgICAgICAgICAgaTE4bkRhdGEgPSBqc29uO1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZSgpO1xuXG4gICAgICAgICAgICAgICAgdmFyIG11dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAobXV0YXRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG11dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3WWVhcjIwMjQnKSwge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZSgpIHtcbiAgICAgICAgY29uc3QgZWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10cmFuc2xhdGVdJylcbiAgICAgICAgaWYgKGVsZW1zICYmIGVsZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgZWxlbXMuZm9yRWFjaChlbGVtID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBlbGVtLmdldEF0dHJpYnV0ZSgnZGF0YS10cmFuc2xhdGUnKTtcbiAgICAgICAgICAgICAgICBlbGVtLmlubmVySFRNTCA9IGkxOG5EYXRhW2tleV0gfHwgJyotLS0tTkVFRCBUTyBCRSBUUkFOU0xBVEVELS0tLSogICBrZXk6ICAnICsga2V5O1xuICAgICAgICAgICAgICAgIGVsZW0ucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidHJhbnNsYXRlIGlzIHdvcmtpbmdcIilcbiAgICAgICAgfVxuICAgICAgICByZWZyZXNoTG9jYWxpemVkQ2xhc3MoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWZyZXNoTG9jYWxpemVkQ2xhc3MoZWxlbWVudCwgYmFzZUNzc0NsYXNzKSB7XG4gICAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgbGFuZyBvZiBbJ3VrJywgJ2VuJ10pIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShiYXNlQ3NzQ2xhc3MgKyBsYW5nKTtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoYmFzZUNzc0NsYXNzICsgbG9jYWxlKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXF1ZXN0ID0gZnVuY3Rpb24gKGxpbmssIGV4dHJhT3B0aW9ucykge1xuICAgICAgICByZXR1cm4gZmV0Y2goYXBpVVJMICsgbGluaywge1xuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC4uLihleHRyYU9wdGlvbnMgfHwge30pXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIHJlcXVlc3QoJy91c2VycycpLFxuICAgICAgICAgICAgLy8gcmVxdWVzdCgnL3F1ZXN0cycpXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXREcm9wKCkge1xuICAgICAgICBjb25zdCBvcGVuRHJvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaW5mb1J1bGVzXCIpO1xuICAgICAgICBsZXQgZGVza0NsYXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkZvb3Rlcl9jb250YWluZXItLUJTWCcpO1xuXG4gICAgICAgIG9wZW5Ecm9wLmZvckVhY2gob3BlbiA9PiB7XG4gICAgICAgICAgICBvcGVuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRldGFpbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRyb3BPcGVuXCIpO1xuICAgICAgICAgICAgICAgIGRldGFpbHMub3BlbiA9IHRydWU7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuXG4gICAgICAgIGlmICghZGVza0NsYXNzKSB7XG4gICAgICAgICAgICBvcGVuRHJvcC5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QuYWRkKCdibG9ja0xpbmsnKSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGNvbnN0IEluaXRQYWdlID0gKCkgPT4ge1xuICAgICAgICBpbml0RHJvcCgpO1xuICAgICAgICBxdWVzdFN0YXJ0QnRucy5mb3JFYWNoKHF1ZXN0U3RhcnRCdG4gPT4gcXVlc3RTdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7IHJlZ2lzdGVySW5RdWVzdCgpOyB9KSk7XG4gICAgICAgIHdlZWtzU2VsZWN0b3IuZm9yRWFjaCgodywgaSkgPT4gdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICAgICAgaWYgKGkgPT09IHNlbGVjdGVkV2Vla1RhYklkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2Vla3NTZWxlY3Rvci5mb3JFYWNoKHMgPT4gcy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XG4gICAgICAgICAgICB3LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgc2VsZWN0ZWRXZWVrVGFiSWQgPSBpO1xuICAgICAgICAgICAgcmVmcmVzaFVzZXJzKHNlbGVjdGVkV2Vla1RhYklkICsgMSk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgcmVmcmVzaFVzZXJzKHNlbGVjdGVkV2Vla1RhYklkICsgMSk7XG4gICAgICAgIGdldERhdGEoKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICB1c2VycyA9IHJlc1swXTtcbiAgICAgICAgICAgIHF1ZXN0cyA9IChyZXNbMV0gfHwgW10pO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocXVlc3RzKTtcbiAgICAgICAgICAgIHJlbmRlclVzZXJzKHVzZXJzKTtcbiAgICAgICAgICAgIHRyYW5zbGF0ZSgpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhbGN1bGF0ZVJlY2VudFByb21vV2Vla3MoKSB7XG4gICAgICAgIGNvbnN0IGRhdGUgPSBEYXRlLm5vdygpO1xuICAgICAgICBpZiAoZGF0ZSA8IG5ldyBEYXRlKFwiMjAyNC0xMC0wN1QyMTowMDowMFpcIikpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9IGVsc2UgaWYgKGRhdGUgPCBuZXcgRGF0ZShcIjIwMjQtMTAtMjFUMjE6MDA6MDBaXCIpKSB7XG4gICAgICAgICAgICByZXR1cm4gMjtcbiAgICAgICAgfSBlbHNlIGlmIChkYXRlIDwgbmV3IERhdGUoXCIyMDI0LTEwLTI4VDIxOjAwOjAwWlwiKSkge1xuICAgICAgICAgICAgcmV0dXJuIDM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gNDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hXZWVrVGFicygpIHtcbiAgICAgICAgc2VsZWN0ZWRXZWVrVGFiSWQgPSBjYWxjdWxhdGVSZWNlbnRQcm9tb1dlZWtzKCkgLSAxO1xuICAgICAgICBpZiAoIXNlbGVjdGVkV2Vla1RhYklkIHx8IHNlbGVjdGVkV2Vla1RhYklkID09PSAwKSB7IC8vIHByb21vIG5vdCBzdGFydGVkIHlldFxuICAgICAgICAgICAgd2Vla3NDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHdlZWtTZWxlY3RvciA9IHdlZWtzU2VsZWN0b3JbaV07XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRXZWVrVGFiSWQgPCBpKSB7XG4gICAgICAgICAgICAgICAgd2Vla1NlbGVjdG9yLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHdlZWtzU2VsZWN0b3IuZm9yRWFjaCgodywgaSkgPT4ge1xuICAgICAgICAgICAgdy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIGlmIChpID09PSBzZWxlY3RlZFdlZWtUYWJJZCkge1xuICAgICAgICAgICAgICAgIHcuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hVc2Vycyh3ZWVrKSB7XG4gICAgICAgIGdldFVzZXJzKHdlZWspLnRoZW4odXNlcnMgPT4ge1xuICAgICAgICAgICAgcmVuZGVyVXNlcnModXNlcnMpO1xuICAgICAgICAgICAgdHJhbnNsYXRlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFVzZXJzKHdlZWspIHtcbiAgICAgICAgY29uc3QgdXJsID0gcmVzb2x2ZVVzZXJzVXJsKHdlZWspO1xuICAgICAgICByZXR1cm4gcmVxdWVzdCh1cmwpXG4gICAgICAgICAgICAudGhlbih1c2VycyA9PiB1c2Vycy5tYXAodXNlck9ySWQgPT4gdHlwZW9mIHVzZXJPcklkID09PSAnbnVtYmVyJyA/IHt1c2VyaWQ6IHVzZXJPcklkfSA6IHVzZXJPcklkKSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlc29sdmVVc2Vyc1VybCh3ZWVrKSB7XG4gICAgICAgIHJldHVybiB3ZWVrID8gYC91c2Vycy8ke3dlZWt9YCA6ICcvdXNlcnMnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIGlmICh3aW5kb3cuc3RvcmUpIHtcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IHdpbmRvdy5zdG9yZS5nZXRTdGF0ZSgpO1xuICAgICAgICAgICAgdXNlcklkID0gc3RhdGUuYXV0aC5pc0F1dGhvcml6ZWQgJiYgc3RhdGUuYXV0aC5pZCB8fCAnJztcbiAgICAgICAgICAgIHNldHVwUGFnZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0dXBQYWdlKCk7XG4gICAgICAgICAgICBsZXQgYyA9IDA7XG4gICAgICAgICAgICB2YXIgaSA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoYyA8IDUwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghIXdpbmRvdy5nX3VzZXJfaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJZCA9IHdpbmRvdy5nX3VzZXJfaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXR1cFBhZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrVXNlckF1dGgoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgIH1cblxuICAgICAgICBjaGVja1VzZXJBdXRoKCk7XG5cbiAgICAgICAgcGFydGljaXBhdGVCdG5zLmZvckVhY2goKGF1dGhCdG4sIGkpID0+IHtcbiAgICAgICAgICAgIGF1dGhCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldHVwUGFnZSgpIHtcbiAgICAgICAgaWYgKHVzZXJJZCAmJiB1cmxQYXJhbXMuaGFzKHBhcnRpY2lwYXRlUGFyYW0pKSB7XG4gICAgICAgICAgICBwYXJ0aWNpcGF0ZSh0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIEluaXRQYWdlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJ0aWNpcGF0ZShmYXN0UmVnKSB7XG4gICAgICAgIGlmICghdXNlcklkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXJhbXMgPSB7dXNlcmlkOiB1c2VySWR9O1xuXG4gICAgICAgIHJlcXVlc3QoJy91c2VyJywge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXJhbXMpXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIHBhcnRpY2lwYXRlQnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRlJykpO1xuICAgICAgICAgICAgcmVkaXJlY3RCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKSk7XG4gICAgICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWdpc3RlckluUXVlc3QoKSB7XG4gICAgICAgIGlmICghdXNlcklkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXJhbXMgPSB7dXNlcmlkOiB1c2VySWR9O1xuXG4gICAgICAgIHJlcXVlc3QoJy9xdWVzdHJlZycsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGFyYW1zKVxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICBwbGF5QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgICAgIHBvcHVwUGxheUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICAgICBxdWVzdFN0YXJ0QnRucy5mb3JFYWNoKHF1ZXN0U3RhcnRCdG4gPT4gcXVlc3RTdGFydEJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRlJykpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCByZW5kZXJVc2VycyA9ICh1c2VycykgPT4ge1xuICAgICAgICByZXN1bHRzVGFibGVXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgcmVzdWx0c1RhYmxlT3RoZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuXG4gICAgICAgIGlmICh1c2VycyAmJiB1c2Vycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCB0b3BVc2VycyA9IHVzZXJzLnNsaWNlKDAsIDEwKTtcbiAgICAgICAgICAgIHBvcHVsYXRlVXNlcnNUYWJsZSh0b3BVc2VycywgdXNlcklkLCB0b3BSZXN1bHRzVGFibGUsIHVzZXJzKTtcblxuICAgICAgICAgICAgY29uc3QgY3VycmVudFVzZXIgPSB1c2VySWQgJiYgdXNlcnMuZmluZCh1c2VyID0+IHVzZXIudXNlcmlkID09PSB1c2VySWQpO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFVzZXJJbmRleCA9IGN1cnJlbnRVc2VyICYmIHVzZXJzLmluZGV4T2YoY3VycmVudFVzZXIpO1xuXG4gICAgICAgICAgICBsZXQgb3RoZXJVc2VycztcblxuICAgICAgICAgICAgaWYgKCFjdXJyZW50VXNlckluZGV4IHx8IGN1cnJlbnRVc2VySW5kZXggPCAxMCkge1xuICAgICAgICAgICAgICAgIG90aGVyVXNlcnMgPSB1c2Vycy5zbGljZSgxMCwgMTMpO1xuICAgICAgICAgICAgfSAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb3RoZXJVc2VycyA9IHVzZXJzLnNsaWNlKE1hdGgubWF4KGN1cnJlbnRVc2VySW5kZXggLSAxLCAxMCksIGN1cnJlbnRVc2VySW5kZXggKyAyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG90aGVyVXNlcnMgJiYgb3RoZXJVc2Vycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBwb3B1bGF0ZVVzZXJzVGFibGUob3RoZXJVc2VycywgdXNlcklkLCByZXN1bHRzVGFibGVPdGhlciwgdXNlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRUZXh0KHRleHQpIHtcbiAgICAgICAgcmV0dXJuIHRleHQuc3BsaXQoJygnKVswXVxuICAgIH1cblxuXG5cbiAgICBmdW5jdGlvbiBwb3B1bGF0ZVVzZXJzVGFibGUodXNlcnMsIGN1cnJlbnRVc2VySWQsIHRhYmxlLCBhbGxVc2Vycykge1xuICAgICAgICB0YWJsZS5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgaWYgKHVzZXJzICYmIHVzZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgdXNlcnMuZm9yRWFjaCgodXNlcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrQ3VycmVudFVzZXIgPSBjdXJyZW50VXNlcklkICYmIGN1cnJlbnRVc2VySWQgPT09IHVzZXIudXNlcmlkO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFkZGl0aW9uYWxVc2VyUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuY2xhc3NMaXN0LmFkZCgndGFibGVSZXN1bHRzX19yb3cnKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhjaGVja0N1cnJlbnRVc2VyKVxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGN1cnJlbnRVc2VySWQsIHVzZXIudXNlcmlkKVxuXG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrQ3VycmVudFVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuY2xhc3NMaXN0LmFkZCgnX3lvdXJQbGFjZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBwbGFjZSA9IGFsbFVzZXJzLmluZGV4T2YodXNlcikgKyAxO1xuICAgICAgICAgICAgICAgIGNvbnN0IHByaXplUGxhY2VDc3MgPSBQUklaRVNfQ1NTW3BsYWNlIC0gMV07XG4gICAgICAgICAgICAgICAgaWYgKHByaXplUGxhY2VDc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuY2xhc3NMaXN0LmFkZChwcml6ZVBsYWNlQ3NzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcHJpemVLZXkgPSBnZXRQcml6ZVRyYW5zbGF0aW9uS2V5KHVzZXIucG9pbnRzKVxuICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZVJlc3VsdHNfX2JvZHktY29sXCIgJHtjaGVja0N1cnJlbnRVc2VyfT4ke3BsYWNlfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlUmVzdWx0c19fYm9keS1jb2xcIj4ke2NoZWNrQ3VycmVudFVzZXIgPyB1c2VyLnVzZXJpZCA6IG1hc2tVc2VySWQodXNlci51c2VyaWQpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlUmVzdWx0c19fYm9keS1jb2xcIj4ke01hdGguZmxvb3IodXNlci5wb2ludHMpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlUmVzdWx0c19fYm9keS1jb2xcIj4ke3ByaXplS2V5ID8gZm9ybWF0VGV4dCh0cmFuc2xhdGVLZXkocHJpemVLZXkpKSA6ICcgLSAnfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICBgO1xuICAgICAgICAgICAgICAgIHRhYmxlLmFwcGVuZChhZGRpdGlvbmFsVXNlclJvdyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRQcml6ZVRyYW5zbGF0aW9uS2V5KHBvaW50cykge1xuICAgICAgICBpZiAocG9pbnRzID49IDEwMDAwKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3ByaXplXzEnO1xuICAgICAgICB9IGVsc2UgaWYgKHBvaW50cyA+PSA1MDAwICYmIHBvaW50cyA8PSA5OTk5KSB7XG4gICAgICAgICAgICByZXR1cm4gJ3ByaXplXzInO1xuICAgICAgICB9IGVsc2UgaWYgKHBvaW50cyA+PSAxNTAwICYmIHBvaW50cyA8PSA0OTk5KSB7XG4gICAgICAgICAgICByZXR1cm4gJ3ByaXplXzMnO1xuICAgICAgICB9IGVsc2UgaWYgKHBvaW50cyA+PSA1MDAgJiYgcG9pbnRzIDw9IDE0OTkpIHtcbiAgICAgICAgICAgIHJldHVybiAncHJpemVfNCc7XG4gICAgICAgIH1lbHNlIGlmIChwb2ludHMgPj0gMTUwICYmIHBvaW50cyA8PSA0OTkpIHtcbiAgICAgICAgICAgIHJldHVybiAncHJpemVfNSc7XG4gICAgICAgIH0gZWxzZSBpZiAocG9pbnRzID49IDUwICYmIHBvaW50cyA8PSAxNDkpIHtcbiAgICAgICAgICAgIHJldHVybiAncHJpemVfNic7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZUtleShrZXkpIHtcbiAgICAgICAgaWYgKCFrZXkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaTE4bkRhdGFba2V5XSB8fCAnKi0tLS1ORUVEIFRPIEJFIFRSQU5TTEFURUQtLS0tKiAgIGtleTogICcgKyBrZXk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFza1VzZXJJZCh1c2VySWQpIHtcbiAgICAgICAgcmV0dXJuIFwiKioqKlwiICsgdXNlcklkLnRvU3RyaW5nKCkuc2xpY2UoNCk7XG4gICAgfVxuXG4gICAgbGV0IGNoZWNrVXNlckF1dGggPSAoKSA9PiB7XG4gICAgICAgIGlmICh1c2VySWQpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdW5hdXRoTWVzIG9mIHVuYXV0aE1zZ3MpIHtcbiAgICAgICAgICAgICAgICB1bmF1dGhNZXMuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVxdWVzdChgL2ZhdnVzZXIvJHt1c2VySWR9YClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzICYmIHJlcy51c2VyaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYXRlQnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRlJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY3RCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVzdFN0YXJ0QnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRlJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlckluZm8gPSByZXM7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBwYXJ0aWNpcGF0ZUJ0biBvZiBwYXJ0aWNpcGF0ZUJ0bnMpIHtcbiAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZUJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHVuYXV0aE1lcyBvZiB1bmF1dGhNc2dzKSB7XG4gICAgICAgICAgICAgICAgdW5hdXRoTWVzLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxvYWRUcmFuc2xhdGlvbnMoKVxuICAgICAgICAudGhlbihpbml0KTtcblxuICAgIGxldCBtYWluUGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mYXZfX3BhZ2UnKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IG1haW5QYWdlLmNsYXNzTGlzdC5hZGQoJ292ZXJmbG93JyksIDEwMDApO1xuXG5cbiAgICAvL3Nob3cgcG9wdXBjaGlrXG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICBjb25zdCBwb3B1cFdyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAnKTtcbiAgICBjb25zdCBidG5UYWJsZVNob3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzdWx0X19zdWJ0ZXh0Jyk7XG4gICAgY29uc3QgdGFibGVQb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcml6ZS1mdW5kJyk7XG4gICAgY29uc3QgdGFibGVQb3B1cEJ0bkNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByaXplLWZ1bmQtY2xvc2UnKTtcblxuXG4gICAgYnRuVGFibGVTaG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT57XG4gICAgICAgIHBvcHVwV3JhcC5jbGFzc0xpc3QucmVtb3ZlKCdfaGlkZGVuJyk7XG4gICAgICAgIGJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJ1xuICAgICAgICB0YWJsZVBvcHVwLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH0pXG5cbiAgICB0YWJsZVBvcHVwQnRuQ2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHBvcHVwV3JhcC5jbGFzc0xpc3QuYWRkKCdfaGlkZGVuJyk7XG4gICAgICAgIGJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnYXV0bydcbiAgICAgICAgdGFibGVQb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH0pXG5cblxuICAgIC8vc2hvdyBydWxlcy0gZGV0YWlsc1xuICAgIGNvbnN0IHJ1bGVzSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucnVsZXNfX2l0ZW0nKVxuICAgIHJ1bGVzSXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnRvZ2dsZSgnX29wZW4nKVxuICAgICAgICB9KVxuICAgIH0pXG5cbiAgICAvLyBmb3IgdGVzdFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGFyay1idG5cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoXCJkYXJrXCIpXG4gICAgfSlcblxuICAgIGxldCB3ZWVrID0gMVxuXG4gICAgY29uc3QgZ2FtZVdyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWVfX2hvdXNlXCIpLFxuICAgICAgICAgIHdlZWtCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndlZWstYnRuXCIpO1xuXG4gICAgd2Vla0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIGlmKHdlZWsgPj0gNCkge1xuICAgICAgICAgICAgZ2FtZVdyYXAuY2xhc3NMaXN0LnJlbW92ZShgd2VlayR7d2Vla31gKVxuICAgICAgICAgICAgd2VlayA9IDFcbiAgICAgICAgICAgIGdhbWVXcmFwLmNsYXNzTGlzdC5hZGQoYHdlZWske3dlZWt9YClcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGdhbWVXcmFwLmNsYXNzTGlzdC5yZW1vdmUoYHdlZWske3dlZWt9YClcbiAgICAgICAgd2VlaysrXG4gICAgICAgIGdhbWVXcmFwLmNsYXNzTGlzdC5hZGQoYHdlZWske3dlZWt9YClcbiAgICB9KVxuXG5cbn0pKCk7XG4iLCIiXX0=
