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
  var locale = "hr";
  mainBlock.classList.add(locale);
  if (hrLeng) locale = 'hr';
  if (enLeng) locale = 'en';
  var PRIZES_CSS = ['place1', 'place2', 'place3'];
  var i18nData = {};
  var userId;
  // userId = 100300268;
  // userId = 1499938;

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
})();
"use strict";
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJzZWNvbmQuanMiXSwibmFtZXMiOlsiYXBpVVJMIiwidXJsUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwid2luZG93IiwibG9jYXRpb24iLCJzZWFyY2giLCJwYXJ0aWNpcGF0ZVBhcmFtIiwicmVzdWx0c1RhYmxlT3RoZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJtYWluQmxvY2siLCJ0b3BSZXN1bHRzVGFibGUiLCJnZXRFbGVtZW50QnlJZCIsInVuYXV0aE1zZ3MiLCJxdWVyeVNlbGVjdG9yQWxsIiwicGFydGljaXBhdGVCdG5zIiwicmVzdWx0c1RhYmxlV3JhcHBlciIsInJlZGlyZWN0QnRucyIsInF1ZXN0RGl2cyIsInBsYXlCdG4iLCJxdWVzdFN0YXJ0QnRucyIsInF1ZXN0UG9wdXAiLCJxdWVzdExldmVsRGl2cyIsInBvcHVwUGxheUJ0biIsIndlZWtzU2VsZWN0b3IiLCJ3ZWVrc0NvbnRhaW5lciIsImN1cnJlbnREYXRlIiwiRGF0ZSIsInVzZXJzIiwicXVlc3RzIiwidXNlckluZm8iLCJzZWxlY3RlZFdlZWtUYWJJZCIsImhyTGVuZyIsImVuTGVuZyIsImxvY2FsZSIsImNsYXNzTGlzdCIsImFkZCIsIlBSSVpFU19DU1MiLCJpMThuRGF0YSIsInVzZXJJZCIsImxvYWRUcmFuc2xhdGlvbnMiLCJmZXRjaCIsImNvbmNhdCIsInRoZW4iLCJyZXMiLCJqc29uIiwidHJhbnNsYXRlIiwibXV0YXRpb25PYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJtdXRhdGlvbnMiLCJvYnNlcnZlIiwiY2hpbGRMaXN0Iiwic3VidHJlZSIsImVsZW1zIiwibGVuZ3RoIiwiZm9yRWFjaCIsImVsZW0iLCJrZXkiLCJnZXRBdHRyaWJ1dGUiLCJpbm5lckhUTUwiLCJyZW1vdmVBdHRyaWJ1dGUiLCJyZWZyZXNoTG9jYWxpemVkQ2xhc3MiLCJlbGVtZW50IiwiYmFzZUNzc0NsYXNzIiwiX2kiLCJfYXJyIiwibGFuZyIsInJlbW92ZSIsInJlcXVlc3QiLCJsaW5rIiwiZXh0cmFPcHRpb25zIiwiX29iamVjdFNwcmVhZCIsImhlYWRlcnMiLCJnZXREYXRhIiwiUHJvbWlzZSIsImFsbCIsImluaXREcm9wIiwib3BlbkRyb3AiLCJkZXNrQ2xhc3MiLCJvcGVuIiwiYWRkRXZlbnRMaXN0ZW5lciIsImRldGFpbHMiLCJpdGVtIiwiSW5pdFBhZ2UiLCJ3IiwiaSIsImUiLCJzIiwicmVmcmVzaFVzZXJzIiwicmVuZGVyVXNlcnMiLCJjYWxjdWxhdGVSZWNlbnRQcm9tb1dlZWtzIiwiZGF0ZSIsIm5vdyIsInJlZnJlc2hXZWVrVGFicyIsIndlZWtTZWxlY3RvciIsIndlZWsiLCJnZXRVc2VycyIsInVybCIsInJlc29sdmVVc2Vyc1VybCIsIm1hcCIsInVzZXJPcklkIiwidXNlcmlkIiwiaW5pdCIsInN0b3JlIiwic3RhdGUiLCJnZXRTdGF0ZSIsImF1dGgiLCJpc0F1dGhvcml6ZWQiLCJpZCIsInNldHVwUGFnZSIsImMiLCJzZXRJbnRlcnZhbCIsImdfdXNlcl9pZCIsImNoZWNrVXNlckF1dGgiLCJjbGVhckludGVydmFsIiwiYXV0aEJ0biIsInByZXZlbnREZWZhdWx0IiwicGFydGljaXBhdGUiLCJoYXMiLCJmYXN0UmVnIiwicGFyYW1zIiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJ0b3BVc2VycyIsInNsaWNlIiwicG9wdWxhdGVVc2Vyc1RhYmxlIiwiY3VycmVudFVzZXIiLCJmaW5kIiwidXNlciIsImN1cnJlbnRVc2VySW5kZXgiLCJpbmRleE9mIiwib3RoZXJVc2VycyIsIk1hdGgiLCJtYXgiLCJmb3JtYXRUZXh0IiwidGV4dCIsInNwbGl0IiwiY3VycmVudFVzZXJJZCIsInRhYmxlIiwiYWxsVXNlcnMiLCJjaGVja0N1cnJlbnRVc2VyIiwiYWRkaXRpb25hbFVzZXJSb3ciLCJjcmVhdGVFbGVtZW50IiwicGxhY2UiLCJwcml6ZVBsYWNlQ3NzIiwicHJpemVLZXkiLCJnZXRQcml6ZVRyYW5zbGF0aW9uS2V5IiwicG9pbnRzIiwibWFza1VzZXJJZCIsImZsb29yIiwidHJhbnNsYXRlS2V5IiwiYXBwZW5kIiwidG9TdHJpbmciLCJfaXRlcmF0b3IiLCJfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlciIsIl9zdGVwIiwibiIsImRvbmUiLCJ1bmF1dGhNZXMiLCJ2YWx1ZSIsImVyciIsImYiLCJfaXRlcmF0b3IyIiwiX3N0ZXAyIiwicGFydGljaXBhdGVCdG4iLCJfaXRlcmF0b3IzIiwiX3N0ZXAzIiwibWFpblBhZ2UiLCJzZXRUaW1lb3V0IiwicG9wdXBXcmFwIiwiYnRuVGFibGVTaG93IiwidGFibGVQb3B1cCIsInRhYmxlUG9wdXBCdG5DbG9zZSIsInN0eWxlIiwib3ZlcmZsb3ciLCJkaXNwbGF5IiwicnVsZXNJdGVtcyIsInRvZ2dsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxDQUFDLFlBQVk7RUFDVCxJQUFNQSxNQUFNLEdBQUcsZ0NBQWdDO0VBQy9DLElBQU1DLFNBQVMsR0FBRyxJQUFJQyxlQUFlLENBQUNDLE1BQU0sQ0FBQ0MsUUFBUSxDQUFDQyxNQUFNLENBQUM7RUFDN0QsSUFBTUMsZ0JBQWdCLEdBQUcsS0FBSzs7RUFFOUI7RUFDQTtFQUNBOztFQUVBLElBQ0lDLGlCQUFpQixHQUFHQyxRQUFRLENBQUNDLGFBQWEsQ0FBQywyQkFBMkIsQ0FBQztJQUN2RUMsU0FBUyxHQUFHRixRQUFRLENBQUNDLGFBQWEsQ0FBQyxZQUFZLENBQUM7SUFDaERFLGVBQWUsR0FBR0gsUUFBUSxDQUFDSSxjQUFjLENBQUMsV0FBVyxDQUFDO0lBQ3REQyxVQUFVLEdBQUdMLFFBQVEsQ0FBQ00sZ0JBQWdCLENBQUMsYUFBYSxDQUFDO0lBQ3JEQyxlQUFlLEdBQUdQLFFBQVEsQ0FBQ00sZ0JBQWdCLENBQUMsV0FBVyxDQUFDO0lBQ3hERSxtQkFBbUIsR0FBR1IsUUFBUSxDQUFDSSxjQUFjLENBQUMsZUFBZSxDQUFDO0lBQzlESyxZQUFZLEdBQUdULFFBQVEsQ0FBQ00sZ0JBQWdCLENBQUMsWUFBWSxDQUFDO0lBQ3RESSxT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dGlvbiAoKSB7XG4gICAgY29uc3QgYXBpVVJMID0gJ2h0dHBzOi8vZmF2LXByb20uY29tL2FwaV9ueV9ocic7XG4gICAgY29uc3QgdXJsUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcbiAgICBjb25zdCBwYXJ0aWNpcGF0ZVBhcmFtID0gJ3JlZyc7XG5cbiAgICAvLyBjb25zdCBGVVRVUkVfUVVFU1RfVFlQRSA9ICdmdXR1cmUnLFxuICAgIC8vICAgICBPTERfUVVFU1RfVFlQRSA9ICdvbGQnLFxuICAgIC8vICAgICBBQ1RJVkVfUVVFU1RfVFlQRSA9ICdhY3RpdmUnO1xuXG4gICAgY29uc3RcbiAgICAgICAgcmVzdWx0c1RhYmxlT3RoZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFibGVSZXN1bHRzX19ib2R5LW90aGVyJyksXG4gICAgICAgIG1haW5CbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmF2X19wYWdlXCIpLFxuICAgICAgICB0b3BSZXN1bHRzVGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9wLXVzZXJzJyksXG4gICAgICAgIHVuYXV0aE1zZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudW5hdXRoLW1zZycpLFxuICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuLWpvaW4nKSxcbiAgICAgICAgcmVzdWx0c1RhYmxlV3JhcHBlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN1bHRzLXRhYmxlJyksXG4gICAgICAgIHJlZGlyZWN0QnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b29rLXBhcnQnKSxcbiAgICAgICAgcXVlc3REaXZzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJvdXRlX19pdGVtJyksXG4gICAgICAgIHBsYXlCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucXVlc3QtcGxheScpLFxuICAgICAgICBxdWVzdFN0YXJ0QnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5xdWVzdEJ0bicpLFxuICAgICAgICBxdWVzdFBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnF1ZXN0JyksXG4gICAgICAgIHF1ZXN0TGV2ZWxEaXZzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnF1ZXN0X19pdGVtJyksXG4gICAgICAgIHBvcHVwUGxheUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maXJzdFBsYXknKSxcbiAgICAgICAgd2Vla3NTZWxlY3RvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJsZVJlc3VsdHNfX3RhYnMtaXRlbScpLFxuICAgICAgICB3ZWVrc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YWJsZVJlc3VsdHNfX3RhYnMnKTtcblxuICAgIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTsgLy9uZXcgRGF0ZShcIjIwMjMtMTItMTRUMjE6MDA6MDAuMDAwWlwiKTtcbiAgICBsZXQgdXNlcnM7XG4gICAgbGV0IHF1ZXN0cztcbiAgICBsZXQgdXNlckluZm87XG4gICAgbGV0IHNlbGVjdGVkV2Vla1RhYklkO1xuXG4gICAgY29uc3QgaHJMZW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VrTGVuZycpO1xuICAgIGNvbnN0IGVuTGVuZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbkxlbmcnKTtcblxuICAgIGxldCBsb2NhbGUgPSBcImhyXCJcblxuICAgIG1haW5CbG9jay5jbGFzc0xpc3QuYWRkKGxvY2FsZSlcblxuICAgIGlmIChockxlbmcpIGxvY2FsZSA9ICdocic7XG4gICAgaWYgKGVuTGVuZykgbG9jYWxlID0gJ2VuJztcblxuICAgIGNvbnN0IFBSSVpFU19DU1MgPSBbJ3BsYWNlMScsICdwbGFjZTInLCAncGxhY2UzJ107XG5cbiAgICBsZXQgaTE4bkRhdGEgPSB7fTtcbiAgICBsZXQgdXNlcklkO1xuICAgIC8vIHVzZXJJZCA9IDEwMDMwMDI2ODtcbiAgICAvLyB1c2VySWQgPSAxNDk5OTM4O1xuXG5cbiAgICBmdW5jdGlvbiBsb2FkVHJhbnNsYXRpb25zKCkge1xuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YXBpVVJMfS90cmFuc2xhdGVzLyR7bG9jYWxlfWApLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAudGhlbihqc29uID0+IHtcbiAgICAgICAgICAgICAgICBpMThuRGF0YSA9IGpzb247XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlKCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgbXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXdZZWFyMjAyNCcpLCB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlKCkge1xuICAgICAgICBjb25zdCBlbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRyYW5zbGF0ZV0nKVxuICAgICAgICBpZiAoZWxlbXMgJiYgZWxlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBlbGVtcy5mb3JFYWNoKGVsZW0gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGVsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScpO1xuICAgICAgICAgICAgICAgIGVsZW0uaW5uZXJIVE1MID0gaTE4bkRhdGFba2V5XSB8fCAnKi0tLS1ORUVEIFRPIEJFIFRSQU5TTEFURUQtLS0tKiAgIGtleTogICcgKyBrZXk7XG4gICAgICAgICAgICAgICAgZWxlbS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdHJhbnNsYXRlJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHJlZnJlc2hMb2NhbGl6ZWRDbGFzcygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hMb2NhbGl6ZWRDbGFzcyhlbGVtZW50LCBiYXNlQ3NzQ2xhc3MpIHtcbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBsYW5nIG9mIFsndWsnLCAnZW4nXSkge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGJhc2VDc3NDbGFzcyArIGxhbmcpO1xuICAgICAgICB9XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChiYXNlQ3NzQ2xhc3MgKyBsb2NhbGUpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlcXVlc3QgPSBmdW5jdGlvbiAobGluaywgZXh0cmFPcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChhcGlVUkwgKyBsaW5rLCB7XG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLi4uKGV4dHJhT3B0aW9ucyB8fCB7fSlcbiAgICAgICAgfSkudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXREYXRhKCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgcmVxdWVzdCgnL3VzZXJzJyksXG4gICAgICAgICAgICAvLyByZXF1ZXN0KCcvcXVlc3RzJylcbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdERyb3AoKSB7XG4gICAgICAgIGNvbnN0IG9wZW5Ecm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5pbmZvUnVsZXNcIik7XG4gICAgICAgIGxldCBkZXNrQ2xhc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuRm9vdGVyX2NvbnRhaW5lci0tQlNYJyk7XG5cbiAgICAgICAgb3BlbkRyb3AuZm9yRWFjaChvcGVuID0+IHtcbiAgICAgICAgICAgIG9wZW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGV0YWlscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHJvcE9wZW5cIik7XG4gICAgICAgICAgICAgICAgZGV0YWlscy5vcGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYgKCFkZXNrQ2xhc3MpIHtcbiAgICAgICAgICAgIG9wZW5Ecm9wLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5hZGQoJ2Jsb2NrTGluaycpKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgY29uc3QgSW5pdFBhZ2UgPSAoKSA9PiB7XG4gICAgICAgIGluaXREcm9wKCk7XG4gICAgICAgIHdlZWtzU2VsZWN0b3IuZm9yRWFjaCgodywgaSkgPT4gdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICAgICAgaWYgKGkgPT09IHNlbGVjdGVkV2Vla1RhYklkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2Vla3NTZWxlY3Rvci5mb3JFYWNoKHMgPT4gcy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XG4gICAgICAgICAgICB3LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgc2VsZWN0ZWRXZWVrVGFiSWQgPSBpO1xuICAgICAgICAgICAgcmVmcmVzaFVzZXJzKHNlbGVjdGVkV2Vla1RhYklkICsgMSk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgcmVmcmVzaFVzZXJzKHNlbGVjdGVkV2Vla1RhYklkICsgMSk7XG4gICAgICAgIGdldERhdGEoKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICB1c2VycyA9IHJlc1swXTtcbiAgICAgICAgICAgIHF1ZXN0cyA9IChyZXNbMV0gfHwgW10pO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocXVlc3RzKTtcbiAgICAgICAgICAgIHJlbmRlclVzZXJzKHVzZXJzKTtcbiAgICAgICAgICAgIHRyYW5zbGF0ZSgpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhbGN1bGF0ZVJlY2VudFByb21vV2Vla3MoKSB7XG4gICAgICAgIGNvbnN0IGRhdGUgPSBEYXRlLm5vdygpO1xuICAgICAgICBpZiAoZGF0ZSA8IG5ldyBEYXRlKFwiMjAyNC0xMC0wN1QyMTowMDowMFpcIikpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9IGVsc2UgaWYgKGRhdGUgPCBuZXcgRGF0ZShcIjIwMjQtMTAtMjFUMjE6MDA6MDBaXCIpKSB7XG4gICAgICAgICAgICByZXR1cm4gMjtcbiAgICAgICAgfSBlbHNlIGlmIChkYXRlIDwgbmV3IERhdGUoXCIyMDI0LTEwLTI4VDIxOjAwOjAwWlwiKSkge1xuICAgICAgICAgICAgcmV0dXJuIDM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gNDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hXZWVrVGFicygpIHtcbiAgICAgICAgc2VsZWN0ZWRXZWVrVGFiSWQgPSBjYWxjdWxhdGVSZWNlbnRQcm9tb1dlZWtzKCkgLSAxO1xuICAgICAgICBpZiAoIXNlbGVjdGVkV2Vla1RhYklkIHx8IHNlbGVjdGVkV2Vla1RhYklkID09PSAwKSB7IC8vIHByb21vIG5vdCBzdGFydGVkIHlldFxuICAgICAgICAgICAgd2Vla3NDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHdlZWtTZWxlY3RvciA9IHdlZWtzU2VsZWN0b3JbaV07XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRXZWVrVGFiSWQgPCBpKSB7XG4gICAgICAgICAgICAgICAgd2Vla1NlbGVjdG9yLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHdlZWtzU2VsZWN0b3IuZm9yRWFjaCgodywgaSkgPT4ge1xuICAgICAgICAgICAgdy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIGlmIChpID09PSBzZWxlY3RlZFdlZWtUYWJJZCkge1xuICAgICAgICAgICAgICAgIHcuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hVc2Vycyh3ZWVrKSB7XG4gICAgICAgIGdldFVzZXJzKHdlZWspLnRoZW4odXNlcnMgPT4ge1xuICAgICAgICAgICAgcmVuZGVyVXNlcnModXNlcnMpO1xuICAgICAgICAgICAgdHJhbnNsYXRlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFVzZXJzKHdlZWspIHtcbiAgICAgICAgY29uc3QgdXJsID0gcmVzb2x2ZVVzZXJzVXJsKHdlZWspO1xuICAgICAgICByZXR1cm4gcmVxdWVzdCh1cmwpXG4gICAgICAgICAgICAudGhlbih1c2VycyA9PiB1c2Vycy5tYXAodXNlck9ySWQgPT4gdHlwZW9mIHVzZXJPcklkID09PSAnbnVtYmVyJyA/IHt1c2VyaWQ6IHVzZXJPcklkfSA6IHVzZXJPcklkKSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlc29sdmVVc2Vyc1VybCh3ZWVrKSB7XG4gICAgICAgIHJldHVybiB3ZWVrID8gYC91c2Vycy8ke3dlZWt9YCA6ICcvdXNlcnMnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIGlmICh3aW5kb3cuc3RvcmUpIHtcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IHdpbmRvdy5zdG9yZS5nZXRTdGF0ZSgpO1xuICAgICAgICAgICAgdXNlcklkID0gc3RhdGUuYXV0aC5pc0F1dGhvcml6ZWQgJiYgc3RhdGUuYXV0aC5pZCB8fCAnJztcbiAgICAgICAgICAgIHNldHVwUGFnZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0dXBQYWdlKCk7XG4gICAgICAgICAgICBsZXQgYyA9IDA7XG4gICAgICAgICAgICB2YXIgaSA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoYyA8IDUwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghIXdpbmRvdy5nX3VzZXJfaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJZCA9IHdpbmRvdy5nX3VzZXJfaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXR1cFBhZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrVXNlckF1dGgoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgIH1cblxuICAgICAgICBjaGVja1VzZXJBdXRoKCk7XG5cbiAgICAgICAgcGFydGljaXBhdGVCdG5zLmZvckVhY2goKGF1dGhCdG4sIGkpID0+IHtcbiAgICAgICAgICAgIGF1dGhCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldHVwUGFnZSgpIHtcbiAgICAgICAgaWYgKHVzZXJJZCAmJiB1cmxQYXJhbXMuaGFzKHBhcnRpY2lwYXRlUGFyYW0pKSB7XG4gICAgICAgICAgICBwYXJ0aWNpcGF0ZSh0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIEluaXRQYWdlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJ0aWNpcGF0ZShmYXN0UmVnKSB7XG4gICAgICAgIGlmICghdXNlcklkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXJhbXMgPSB7dXNlcmlkOiB1c2VySWR9O1xuXG4gICAgICAgIHJlcXVlc3QoJy91c2VyJywge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXJhbXMpXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIHBhcnRpY2lwYXRlQnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRlJykpO1xuICAgICAgICAgICAgcmVkaXJlY3RCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKSk7XG4gICAgICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCByZW5kZXJVc2VycyA9ICh1c2VycykgPT4ge1xuICAgICAgICByZXN1bHRzVGFibGVXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgcmVzdWx0c1RhYmxlT3RoZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuXG4gICAgICAgIGlmICh1c2VycyAmJiB1c2Vycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCB0b3BVc2VycyA9IHVzZXJzLnNsaWNlKDAsIDEwKTtcbiAgICAgICAgICAgIHBvcHVsYXRlVXNlcnNUYWJsZSh0b3BVc2VycywgdXNlcklkLCB0b3BSZXN1bHRzVGFibGUsIHVzZXJzKTtcblxuICAgICAgICAgICAgY29uc3QgY3VycmVudFVzZXIgPSB1c2VySWQgJiYgdXNlcnMuZmluZCh1c2VyID0+IHVzZXIudXNlcmlkID09PSB1c2VySWQpO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFVzZXJJbmRleCA9IGN1cnJlbnRVc2VyICYmIHVzZXJzLmluZGV4T2YoY3VycmVudFVzZXIpO1xuXG4gICAgICAgICAgICBsZXQgb3RoZXJVc2VycztcblxuICAgICAgICAgICAgaWYgKCFjdXJyZW50VXNlckluZGV4IHx8IGN1cnJlbnRVc2VySW5kZXggPCAxMCkge1xuICAgICAgICAgICAgICAgIG90aGVyVXNlcnMgPSB1c2Vycy5zbGljZSgxMCwgMTMpO1xuICAgICAgICAgICAgfSAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb3RoZXJVc2VycyA9IHVzZXJzLnNsaWNlKE1hdGgubWF4KGN1cnJlbnRVc2VySW5kZXggLSAxLCAxMCksIGN1cnJlbnRVc2VySW5kZXggKyAyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG90aGVyVXNlcnMgJiYgb3RoZXJVc2Vycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBwb3B1bGF0ZVVzZXJzVGFibGUob3RoZXJVc2VycywgdXNlcklkLCByZXN1bHRzVGFibGVPdGhlciwgdXNlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRUZXh0KHRleHQpIHtcbiAgICAgICAgcmV0dXJuIHRleHQuc3BsaXQoJygnKVswXVxuICAgIH1cblxuXG5cbiAgICBmdW5jdGlvbiBwb3B1bGF0ZVVzZXJzVGFibGUodXNlcnMsIGN1cnJlbnRVc2VySWQsIHRhYmxlLCBhbGxVc2Vycykge1xuICAgICAgICB0YWJsZS5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgaWYgKHVzZXJzICYmIHVzZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgdXNlcnMuZm9yRWFjaCgodXNlcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrQ3VycmVudFVzZXIgPSBjdXJyZW50VXNlcklkICYmIGN1cnJlbnRVc2VySWQgPT09IHVzZXIudXNlcmlkO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFkZGl0aW9uYWxVc2VyUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuY2xhc3NMaXN0LmFkZCgndGFibGVSZXN1bHRzX19yb3cnKTtcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tDdXJyZW50VXNlcikge1xuICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5jbGFzc0xpc3QuYWRkKCdfeW91clBsYWNlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHBsYWNlID0gYWxsVXNlcnMuaW5kZXhPZih1c2VyKSArIDE7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJpemVQbGFjZUNzcyA9IFBSSVpFU19DU1NbcGxhY2UgLSAxXTtcbiAgICAgICAgICAgICAgICBpZiAocHJpemVQbGFjZUNzcykge1xuICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5jbGFzc0xpc3QuYWRkKHByaXplUGxhY2VDc3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBwcml6ZUtleSA9IGdldFByaXplVHJhbnNsYXRpb25LZXkodXNlci5wb2ludHMpXG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlUmVzdWx0c19fYm9keS1jb2xcIiAke2NoZWNrQ3VycmVudFVzZXJ9PiR7cGxhY2V9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19ib2R5LWNvbFwiPiR7Y2hlY2tDdXJyZW50VXNlciA/IHVzZXIudXNlcmlkIDogbWFza1VzZXJJZCh1c2VyLnVzZXJpZCl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19ib2R5LWNvbFwiPiR7TWF0aC5mbG9vcih1c2VyLnBvaW50cyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19ib2R5LWNvbFwiPiR7cHJpemVLZXkgPyBmb3JtYXRUZXh0KHRyYW5zbGF0ZUtleShwcml6ZUtleSkpIDogJyAtICd9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIGA7XG4gICAgICAgICAgICAgICAgdGFibGUuYXBwZW5kKGFkZGl0aW9uYWxVc2VyUm93KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldFByaXplVHJhbnNsYXRpb25LZXkocG9pbnRzKSB7XG4gICAgICAgIGlmIChwb2ludHMgPj0gMTAwMDApIHtcbiAgICAgICAgICAgIHJldHVybiAncHJpemVfMSc7XG4gICAgICAgIH0gZWxzZSBpZiAocG9pbnRzID49IDUwMDAgJiYgcG9pbnRzIDw9IDk5OTkpIHtcbiAgICAgICAgICAgIHJldHVybiAncHJpemVfMic7XG4gICAgICAgIH0gZWxzZSBpZiAocG9pbnRzID49IDE1MDAgJiYgcG9pbnRzIDw9IDQ5OTkpIHtcbiAgICAgICAgICAgIHJldHVybiAncHJpemVfMyc7XG4gICAgICAgIH0gZWxzZSBpZiAocG9pbnRzID49IDUwMCAmJiBwb2ludHMgPD0gMTQ5OSkge1xuICAgICAgICAgICAgcmV0dXJuICdwcml6ZV80JztcbiAgICAgICAgfWVsc2UgaWYgKHBvaW50cyA+PSAxNTAgJiYgcG9pbnRzIDw9IDQ5OSkge1xuICAgICAgICAgICAgcmV0dXJuICdwcml6ZV81JztcbiAgICAgICAgfSBlbHNlIGlmIChwb2ludHMgPj0gNTAgJiYgcG9pbnRzIDw9IDE0OSkge1xuICAgICAgICAgICAgcmV0dXJuICdwcml6ZV82JztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZUtleShrZXkpIHtcbiAgICAgICAgaWYgKCFrZXkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaTE4bkRhdGFba2V5XSB8fCAnKi0tLS1ORUVEIFRPIEJFIFRSQU5TTEFURUQtLS0tKiAgIGtleTogICcgKyBrZXk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFza1VzZXJJZCh1c2VySWQpIHtcbiAgICAgICAgcmV0dXJuIFwiKioqKlwiICsgdXNlcklkLnRvU3RyaW5nKCkuc2xpY2UoNCk7XG4gICAgfVxuXG4gICAgbGV0IGNoZWNrVXNlckF1dGggPSAoKSA9PiB7XG4gICAgICAgIGlmICh1c2VySWQpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdW5hdXRoTWVzIG9mIHVuYXV0aE1zZ3MpIHtcbiAgICAgICAgICAgICAgICB1bmF1dGhNZXMuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVxdWVzdChgL2ZhdnVzZXIvJHt1c2VySWR9YClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzICYmIHJlcy51c2VyaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYXRlQnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRlJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY3RCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVzdFN0YXJ0QnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRlJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlckluZm8gPSByZXM7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBwYXJ0aWNpcGF0ZUJ0biBvZiBwYXJ0aWNpcGF0ZUJ0bnMpIHtcbiAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZUJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHVuYXV0aE1lcyBvZiB1bmF1dGhNc2dzKSB7XG4gICAgICAgICAgICAgICAgdW5hdXRoTWVzLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxvYWRUcmFuc2xhdGlvbnMoKVxuICAgICAgICAudGhlbihpbml0KTtcblxuICAgIGxldCBtYWluUGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mYXZfX3BhZ2UnKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IG1haW5QYWdlLmNsYXNzTGlzdC5hZGQoJ292ZXJmbG93JyksIDEwMDApO1xuXG5cbiAgICAvL3Nob3cgcG9wdXBjaGlrXG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICBjb25zdCBwb3B1cFdyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAnKTtcbiAgICBjb25zdCBidG5UYWJsZVNob3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzdWx0X19zdWJ0ZXh0Jyk7XG4gICAgY29uc3QgdGFibGVQb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcml6ZS1mdW5kJyk7XG4gICAgY29uc3QgdGFibGVQb3B1cEJ0bkNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByaXplLWZ1bmQtY2xvc2UnKTtcblxuXG4gICAgYnRuVGFibGVTaG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT57XG4gICAgICAgIHBvcHVwV3JhcC5jbGFzc0xpc3QucmVtb3ZlKCdfaGlkZGVuJyk7XG4gICAgICAgIGJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJ1xuICAgICAgICB0YWJsZVBvcHVwLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH0pXG5cbiAgICB0YWJsZVBvcHVwQnRuQ2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHBvcHVwV3JhcC5jbGFzc0xpc3QuYWRkKCdfaGlkZGVuJyk7XG4gICAgICAgIGJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnYXV0bydcbiAgICAgICAgdGFibGVQb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH0pXG5cblxuICAgIC8vc2hvdyBydWxlcy0gZGV0YWlsc1xuICAgIGNvbnN0IHJ1bGVzSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucnVsZXNfX2l0ZW0nKVxuICAgIHJ1bGVzSXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnRvZ2dsZSgnX29wZW4nKVxuICAgICAgICB9KVxuICAgIH0pXG5cbn0pKCk7XG4iLCIiXX0=
