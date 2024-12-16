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
  var PROMO_START_DATE = new Date("2024-12-15T22:00:00Z");
  var PROMO_DURATION_WEEKS = 4;
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
  var locale = "en";
  mainBlock.classList.add(locale);
  if (hrLeng) locale = 'hr';
  if (enLeng) locale = 'en';
  var PRIZES_CSS = ['place1', 'place2', 'place3'];
  var i18nData = {};
  var userId;
  userId = 1454805;
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
    var currStart = PROMO_START_DATE;
    var currEnd = PROMO_START_DATE;
    var today = new Date();
    var recentWeeks = [];
    var weekCnt = 0;
    var weekDiff = 7;
    while (currEnd <= today && weekCnt < PROMO_DURATION_WEEKS) {
      currStart = currEnd;
      currEnd = new Date(currEnd.getTime());
      currEnd.setDate(currEnd.getDate() + weekDiff);
      recentWeeks.push(new WeekRange(currStart, currEnd));
      weekDiff = 7;
      weekCnt++;
    }
    return recentWeeks;
  }
  function refreshWeekTabs() {
    var recentWeekRanges = calculateRecentPromoWeeks();
    selectedWeekTabId = recentWeekRanges.length - 1;
    if (!recentWeekRanges || recentWeekRanges.length === 0) {
      // promo not started yet
      weeksContainer.classList.add('hide');
      return;
    }
    for (var i = 0; i < weeksSelector.length; i++) {
      var weekRange = recentWeekRanges[i];
      var weekSelector = weeksSelector[i];
      if (!weekRange) {
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
    refreshWeekTabs();
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJzZWNvbmQuanMiXSwibmFtZXMiOlsiYXBpVVJMIiwidXJsUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwid2luZG93IiwibG9jYXRpb24iLCJzZWFyY2giLCJwYXJ0aWNpcGF0ZVBhcmFtIiwiUFJPTU9fU1RBUlRfREFURSIsIkRhdGUiLCJQUk9NT19EVVJBVElPTl9XRUVLUyIsInJlc3VsdHNUYWJsZU90aGVyIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwibWFpbkJsb2NrIiwidG9wUmVzdWx0c1RhYmxlIiwiZ2V0RWxlbWVudEJ5SWQiLCJ1bmF1dGhNc2dzIiwicXVlcnlTZWxlY3RvckFsbCIsInBhcnRpY2lwYXRlQnRucyIsInJlc3VsdHNUYWJsZVdyYXBwZXIiLCJyZWRpcmVjdEJ0bnMiLCJxdWVzdERpdnMiLCJwbGF5QnRuIiwicXVlc3RTdGFydEJ0bnMiLCJxdWVzdFBvcHVwIiwicXVlc3RMZXZlbERpdnMiLCJwb3B1cFBsYXlCdG4iLCJ3ZWVrc1NlbGVjdG9yIiwid2Vla3NDb250YWluZXIiLCJjdXJyZW50RGF0ZSIsInVzZXJzIiwicXVlc3RzIiwidXNlckluZm8iLCJzZWxlY3RlZFdlZWtUYWJJZCIsImhyTGVuZyIsImVuTGVuZyIsImxvY2FsZSIsImNsYXNzTGlzdCIsImFkZCIsIlBSSVpFU19DU1MiLCJpMThuRGF0YSIsInVzZXJJZCIsImxvYWRUcmFuc2xhdGlvbnMiLCJmZXRjaCIsImNvbmNhdCIsInRoZW4iLCJyZXMiLCJqc29uIiwidHJhbnNsYXRlIiwibXV0YXRpb25PYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJtdXRhdGlvbnMiLCJvYnNlcnZlIiwiY2hpbGRMaXN0Iiwic3VidHJlZSIsImVsZW1zIiwibGVuZ3RoIiwiZm9yRWFjaCIsImVsZW0iLCJrZXkiLCJnZXRBdHRyaWJ1dGUiLCJpbm5lckhUTUwiLCJyZW1vdmVBdHRyaWJ1dGUiLCJyZWZyZXNoTG9jYWxpemVkQ2xhc3MiLCJlbGVtZW50IiwiYmFzZUNzc0NsYXNzIiwiX2kiLCJfYXJyIiwibGFuZyIsInJlbW92ZSIsInJlcXVlc3QiLCJsaW5rIiwiZXh0cmFPcHRpb25zIiwiX29iamVjdFNwcmVhZCIsImhlYWRlcnMiLCJnZXREYXRhIiwiUHJvbWlzZSIsImFsbCIsImluaXREcm9wIiwib3BlbkRyb3AiLCJkZXNrQ2xhc3MiLCJvcGVuIiwiYWRkRXZlbnRMaXN0ZW5lciIsImRldGFpbHMiLCJpdGVtIiwiSW5pdFBhZ2UiLCJ3IiwiaSIsImUiLCJzIiwicmVmcmVzaFVzZXJzIiwicmVuZGVyVXNlcnMiLCJjYWxjdWxhdGVSZWNlbnRQcm9tb1dlZWtzIiwiY3VyclN0YXJ0IiwiY3VyckVuZCIsInRvZGF5IiwicmVjZW50V2Vla3MiLCJ3ZWVrQ250Iiwid2Vla0RpZmYiLCJnZXRUaW1lIiwic2V0RGF0ZSIsImdldERhdGUiLCJwdXNoIiwiV2Vla1JhbmdlIiwicmVmcmVzaFdlZWtUYWJzIiwicmVjZW50V2Vla1JhbmdlcyIsIndlZWtSYW5nZSIsIndlZWtTZWxlY3RvciIsIndlZWsiLCJnZXRVc2VycyIsInVybCIsInJlc29sdmVVc2Vyc1VybCIsIm1hcCIsInVzZXJPcklkIiwidXNlcmlkIiwiaW5pdCIsInN0b3JlIiwic3RhdGUiLCJnZXRTdGF0ZSIsImF1dGgiLCJpc0F1dGhvcml6ZWQiLCJpZCIsInNldHVwUGFnZSIsImMiLCJzZXRJbnRlcnZhbCIsImdfdXNlcl9pZCIsImNoZWNrVXNlckF1dGgiLCJjbGVhckludGVydmFsIiwiYXV0aEJ0biIsInByZXZlbnREZWZhdWx0IiwicGFydGljaXBhdGUiLCJoYXMiLCJmYXN0UmVnIiwicGFyYW1zIiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJ0b3BVc2VycyIsInNsaWNlIiwicG9wdWxhdGVVc2Vyc1RhYmxlIiwiY3VycmVudFVzZXIiLCJmaW5kIiwidXNlciIsImN1cnJlbnRVc2VySW5kZXgiLCJpbmRleE9mIiwib3RoZXJVc2VycyIsIk1hdGgiLCJtYXgiLCJmb3JtYXRUZXh0IiwidGV4dCIsInNwbGl0IiwiY3VycmVudFVzZXJJZCIsInRhYmxlIiwiYWxsVXNlcnMiLCJjaGVja0N1cnJlbnRVc2VyIiwiYWRkaXRpb25hbFVzZXJSb3ciLCJjcmVhdGVFbGVtZW50IiwicGxhY2UiLCJwcml6ZVBsYWNlQ3NzIiwicHJpemVLZXkiLCJnZXRQcml6ZVRyYW5zbGF0aW9uS2V5IiwicG9pbnRzIiwibWFza1VzZXJJZCIsImZsb29yIiwidHJhbnNsYXRlS2V5IiwiYXBwZW5kIiwidG9TdHJpbmciLCJfaXRlcmF0b3IiLCJfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlciIsIl9zdGVwIiwibiIsImRvbmUiLCJ1bmF1dGhNZXMiLCJ2YWx1ZSIsImVyciIsImYiLCJfaXRlcmF0b3IyIiwiX3N0ZXAyIiwicGFydGljaXBhdGVCdG4iLCJfaXRlcmF0b3IzIiwiX3N0ZXAzIiwibWFpblBhZ2UiLCJzZXRUaW1lb3V0IiwicG9wdXBXcmFwIiwiYnRuVGFibGVTaG93IiwidGFibGVQb3B1cCIsInRhYmxlUG9wdXBCdG5DbG9zZSIsInN0eWxlIiwib3ZlcmZsb3ciLCJkaXNwbGF5IiwicnVsZXNJdGVtcyIsInRvZ2dsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxDQUFDLFlBQVk7RUFDVCxJQUFNQSxNQUFNLEdBQUcsZ0NBQWdDO0VBQy9DLElBQU1DLFNBQVMsR0FBRyxJQUFJQyxlQUFlLENBQUNDLE1BQU0sQ0FBQ0MsUUFBUSxDQUFDQyxNQUFNLENBQUM7RUFDN0QsSUFBTUMsZ0JBQWdCLEdBQUcsS0FBSztFQUM5QixJQUFNQyxnQkFBZ0IsR0FBRyxJQUFJQyxJQUFJLENBQUMsc0JBQXNCLENBQUM7RUFDekQsSUFBTUMsb0JBQW9CLEdBQUcsQ0FBQztFQUU5QixJQUNJQyxpQkFBaUIsR0FBR0MsUUFBUSxDQUFDQyxhQUFhLENBQUMsMkJBQTJCLENBQUM7SUFDdkVDLFNBQVMsR0FBR0YsUUFBUSxDQUFDQyxhQUFhLENBQUMsWUFBWSxDQUFDO0lBQ2hERSxlQUFlLEdBQUdILFFBQVEs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LENBQUNxRCxLQUFLLENBQUNDLFFBQVEsR0FBRyxRQUFRO0lBQzlCSCxVQUFVLENBQUNFLEtBQUssQ0FBQ0UsT0FBTyxHQUFHLE9BQU87RUFDdEMsQ0FBQyxDQUFDO0VBRUZILGtCQUFrQixDQUFDekcsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07SUFDL0NzRyxTQUFTLENBQUNuSixTQUFTLENBQUNDLEdBQUcsQ0FBQyxTQUFTLENBQUM7SUFDbENpRyxJQUFJLENBQUNxRCxLQUFLLENBQUNDLFFBQVEsR0FBRyxNQUFNO0lBQzVCSCxVQUFVLENBQUNFLEtBQUssQ0FBQ0UsT0FBTyxHQUFHLE1BQU07RUFDckMsQ0FBQyxDQUFDOztFQUdGO0VBQ0EsSUFBTUMsVUFBVSxHQUFHcEwsUUFBUSxDQUFDTSxnQkFBZ0IsQ0FBQyxjQUFjLENBQUM7RUFDNUQ4SyxVQUFVLENBQUN0SSxPQUFPLENBQUMsVUFBQTJCLElBQUksRUFBSTtJQUN2QkEsSUFBSSxDQUFDRixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtNQUNqQ0UsSUFBSSxDQUFDL0MsU0FBUyxDQUFDMkosTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNsQyxDQUFDLENBQUM7RUFDTixDQUFDLENBQUM7QUFFTixDQUFDLEVBQUUsQ0FBQztBQ3BaSiIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBhcGlVUkwgPSAnaHR0cHM6Ly9mYXYtcHJvbS5jb20vYXBpX255X2hyJztcbiAgICBjb25zdCB1cmxQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xuICAgIGNvbnN0IHBhcnRpY2lwYXRlUGFyYW0gPSAncmVnJztcbiAgICBjb25zdCBQUk9NT19TVEFSVF9EQVRFID0gbmV3IERhdGUoXCIyMDI0LTEyLTE1VDIyOjAwOjAwWlwiKTtcbiAgICBjb25zdCBQUk9NT19EVVJBVElPTl9XRUVLUyA9IDQ7XG5cbiAgICBjb25zdFxuICAgICAgICByZXN1bHRzVGFibGVPdGhlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YWJsZVJlc3VsdHNfX2JvZHktb3RoZXInKSxcbiAgICAgICAgbWFpbkJsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mYXZfX3BhZ2VcIiksXG4gICAgICAgIHRvcFJlc3VsdHNUYWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b3AtdXNlcnMnKSxcbiAgICAgICAgdW5hdXRoTXNncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy51bmF1dGgtbXNnJyksXG4gICAgICAgIHBhcnRpY2lwYXRlQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4tam9pbicpLFxuICAgICAgICByZXN1bHRzVGFibGVXcmFwcGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3VsdHMtdGFibGUnKSxcbiAgICAgICAgcmVkaXJlY3RCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvb2stcGFydCcpLFxuICAgICAgICBxdWVzdERpdnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucm91dGVfX2l0ZW0nKSxcbiAgICAgICAgcGxheUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5xdWVzdC1wbGF5JyksXG4gICAgICAgIHF1ZXN0U3RhcnRCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnF1ZXN0QnRuJyksXG4gICAgICAgIHF1ZXN0UG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucXVlc3QnKSxcbiAgICAgICAgcXVlc3RMZXZlbERpdnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucXVlc3RfX2l0ZW0nKSxcbiAgICAgICAgcG9wdXBQbGF5QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZpcnN0UGxheScpLFxuICAgICAgICB3ZWVrc1NlbGVjdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlUmVzdWx0c19fdGFicy1pdGVtJyksXG4gICAgICAgIHdlZWtzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhYmxlUmVzdWx0c19fdGFicycpO1xuXG4gICAgY29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpOyAvL25ldyBEYXRlKFwiMjAyMy0xMi0xNFQyMTowMDowMC4wMDBaXCIpO1xuICAgIGxldCB1c2VycztcbiAgICBsZXQgcXVlc3RzO1xuICAgIGxldCB1c2VySW5mbztcbiAgICBsZXQgc2VsZWN0ZWRXZWVrVGFiSWQ7XG5cbiAgICBjb25zdCBockxlbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdWtMZW5nJyk7XG4gICAgY29uc3QgZW5MZW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VuTGVuZycpO1xuXG4gICAgbGV0IGxvY2FsZSA9IFwiZW5cIlxuXG4gICAgbWFpbkJsb2NrLmNsYXNzTGlzdC5hZGQobG9jYWxlKVxuXG4gICAgaWYgKGhyTGVuZykgbG9jYWxlID0gJ2hyJztcbiAgICBpZiAoZW5MZW5nKSBsb2NhbGUgPSAnZW4nO1xuXG4gICAgY29uc3QgUFJJWkVTX0NTUyA9IFsncGxhY2UxJywgJ3BsYWNlMicsICdwbGFjZTMnXTtcblxuICAgIGxldCBpMThuRGF0YSA9IHt9O1xuICAgIGxldCB1c2VySWQ7XG4gICAgdXNlcklkID0gMTQ1NDgwNTtcblxuXG4gICAgZnVuY3Rpb24gbG9hZFRyYW5zbGF0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKGAke2FwaVVSTH0vdHJhbnNsYXRlcy8ke2xvY2FsZX1gKS50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgICAgICAgLnRoZW4oanNvbiA9PiB7XG4gICAgICAgICAgICAgICAgaTE4bkRhdGEgPSBqc29uO1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZSgpO1xuXG4gICAgICAgICAgICAgICAgdmFyIG11dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAobXV0YXRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG11dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3WWVhcjIwMjQnKSwge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZSgpIHtcbiAgICAgICAgY29uc3QgZWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10cmFuc2xhdGVdJylcbiAgICAgICAgaWYgKGVsZW1zICYmIGVsZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgZWxlbXMuZm9yRWFjaChlbGVtID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBlbGVtLmdldEF0dHJpYnV0ZSgnZGF0YS10cmFuc2xhdGUnKTtcbiAgICAgICAgICAgICAgICBlbGVtLmlubmVySFRNTCA9IGkxOG5EYXRhW2tleV0gfHwgJyotLS0tTkVFRCBUTyBCRSBUUkFOU0xBVEVELS0tLSogICBrZXk6ICAnICsga2V5O1xuICAgICAgICAgICAgICAgIGVsZW0ucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICByZWZyZXNoTG9jYWxpemVkQ2xhc3MoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWZyZXNoTG9jYWxpemVkQ2xhc3MoZWxlbWVudCwgYmFzZUNzc0NsYXNzKSB7XG4gICAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgbGFuZyBvZiBbJ3VrJywgJ2VuJ10pIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShiYXNlQ3NzQ2xhc3MgKyBsYW5nKTtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoYmFzZUNzc0NsYXNzICsgbG9jYWxlKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXF1ZXN0ID0gZnVuY3Rpb24gKGxpbmssIGV4dHJhT3B0aW9ucykge1xuICAgICAgICByZXR1cm4gZmV0Y2goYXBpVVJMICsgbGluaywge1xuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC4uLihleHRyYU9wdGlvbnMgfHwge30pXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIHJlcXVlc3QoJy91c2VycycpLFxuICAgICAgICAgICAgLy8gcmVxdWVzdCgnL3F1ZXN0cycpXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXREcm9wKCkge1xuICAgICAgICBjb25zdCBvcGVuRHJvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaW5mb1J1bGVzXCIpO1xuICAgICAgICBsZXQgZGVza0NsYXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkZvb3Rlcl9jb250YWluZXItLUJTWCcpO1xuXG4gICAgICAgIG9wZW5Ecm9wLmZvckVhY2gob3BlbiA9PiB7XG4gICAgICAgICAgICBvcGVuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRldGFpbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRyb3BPcGVuXCIpO1xuICAgICAgICAgICAgICAgIGRldGFpbHMub3BlbiA9IHRydWU7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuXG4gICAgICAgIGlmICghZGVza0NsYXNzKSB7XG4gICAgICAgICAgICBvcGVuRHJvcC5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QuYWRkKCdibG9ja0xpbmsnKSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGNvbnN0IEluaXRQYWdlID0gKCkgPT4ge1xuICAgICAgICBpbml0RHJvcCgpO1xuICAgICAgICB3ZWVrc1NlbGVjdG9yLmZvckVhY2goKHcsIGkpID0+IHcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgICAgICAgIGlmIChpID09PSBzZWxlY3RlZFdlZWtUYWJJZCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdlZWtzU2VsZWN0b3IuZm9yRWFjaChzID0+IHMuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xuICAgICAgICAgICAgdy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIHNlbGVjdGVkV2Vla1RhYklkID0gaTtcbiAgICAgICAgICAgIHJlZnJlc2hVc2VycyhzZWxlY3RlZFdlZWtUYWJJZCArIDEpO1xuICAgICAgICB9KSk7XG4gICAgICAgIHJlZnJlc2hVc2VycyhzZWxlY3RlZFdlZWtUYWJJZCArIDEpO1xuICAgICAgICBnZXREYXRhKCkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgdXNlcnMgPSByZXNbMF07XG4gICAgICAgICAgICBxdWVzdHMgPSAocmVzWzFdIHx8IFtdKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHF1ZXN0cyk7XG4gICAgICAgICAgICByZW5kZXJVc2Vycyh1c2Vycyk7XG4gICAgICAgICAgICB0cmFuc2xhdGUoKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYWxjdWxhdGVSZWNlbnRQcm9tb1dlZWtzKCkge1xuICAgICAgICBsZXQgY3VyclN0YXJ0ID0gUFJPTU9fU1RBUlRfREFURTtcbiAgICAgICAgbGV0IGN1cnJFbmQgPSBQUk9NT19TVEFSVF9EQVRFO1xuICAgICAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGNvbnN0IHJlY2VudFdlZWtzID0gW107XG4gICAgICAgIGxldCB3ZWVrQ250ID0gMDtcbiAgICAgICAgbGV0IHdlZWtEaWZmID0gNztcbiAgICAgICAgd2hpbGUgKGN1cnJFbmQgPD0gdG9kYXkgJiYgd2Vla0NudCA8IFBST01PX0RVUkFUSU9OX1dFRUtTKSB7XG4gICAgICAgICAgICBjdXJyU3RhcnQgPSBjdXJyRW5kO1xuICAgICAgICAgICAgY3VyckVuZCA9IG5ldyBEYXRlKGN1cnJFbmQuZ2V0VGltZSgpKTtcbiAgICAgICAgICAgIGN1cnJFbmQuc2V0RGF0ZShjdXJyRW5kLmdldERhdGUoKSArIHdlZWtEaWZmKTtcbiAgICAgICAgICAgIHJlY2VudFdlZWtzLnB1c2gobmV3IFdlZWtSYW5nZShjdXJyU3RhcnQsIGN1cnJFbmQpKTtcbiAgICAgICAgICAgIHdlZWtEaWZmID0gNztcbiAgICAgICAgICAgIHdlZWtDbnQrKztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVjZW50V2Vla3M7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaFdlZWtUYWJzKCkge1xuICAgICAgICBjb25zdCByZWNlbnRXZWVrUmFuZ2VzID0gY2FsY3VsYXRlUmVjZW50UHJvbW9XZWVrcygpO1xuICAgICAgICBzZWxlY3RlZFdlZWtUYWJJZCA9IHJlY2VudFdlZWtSYW5nZXMubGVuZ3RoIC0gMTtcbiAgICAgICAgaWYgKCFyZWNlbnRXZWVrUmFuZ2VzIHx8IHJlY2VudFdlZWtSYW5nZXMubGVuZ3RoID09PSAwKSB7IC8vIHByb21vIG5vdCBzdGFydGVkIHlldFxuICAgICAgICAgICAgd2Vla3NDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3ZWVrc1NlbGVjdG9yLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB3ZWVrUmFuZ2UgPSByZWNlbnRXZWVrUmFuZ2VzW2ldO1xuICAgICAgICAgICAgY29uc3Qgd2Vla1NlbGVjdG9yID0gd2Vla3NTZWxlY3RvcltpXTtcbiAgICAgICAgICAgIGlmICghd2Vla1JhbmdlKSB7XG4gICAgICAgICAgICAgICAgd2Vla1NlbGVjdG9yLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHdlZWtzU2VsZWN0b3IuZm9yRWFjaCgodywgaSkgPT4ge1xuICAgICAgICAgICAgdy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIGlmIChpID09PSBzZWxlY3RlZFdlZWtUYWJJZCkge1xuICAgICAgICAgICAgICAgIHcuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hVc2Vycyh3ZWVrKSB7XG4gICAgICAgIGdldFVzZXJzKHdlZWspLnRoZW4odXNlcnMgPT4ge1xuICAgICAgICAgICAgcmVuZGVyVXNlcnModXNlcnMpO1xuICAgICAgICAgICAgdHJhbnNsYXRlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFVzZXJzKHdlZWspIHtcbiAgICAgICAgY29uc3QgdXJsID0gcmVzb2x2ZVVzZXJzVXJsKHdlZWspO1xuICAgICAgICByZXR1cm4gcmVxdWVzdCh1cmwpXG4gICAgICAgICAgICAudGhlbih1c2VycyA9PiB1c2Vycy5tYXAodXNlck9ySWQgPT4gdHlwZW9mIHVzZXJPcklkID09PSAnbnVtYmVyJyA/IHt1c2VyaWQ6IHVzZXJPcklkfSA6IHVzZXJPcklkKSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlc29sdmVVc2Vyc1VybCh3ZWVrKSB7XG4gICAgICAgIHJldHVybiB3ZWVrID8gYC91c2Vycy8ke3dlZWt9YCA6ICcvdXNlcnMnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIHJlZnJlc2hXZWVrVGFicygpO1xuICAgICAgICBpZiAod2luZG93LnN0b3JlKSB7XG4gICAgICAgICAgICB2YXIgc3RhdGUgPSB3aW5kb3cuc3RvcmUuZ2V0U3RhdGUoKTtcbiAgICAgICAgICAgIHVzZXJJZCA9IHN0YXRlLmF1dGguaXNBdXRob3JpemVkICYmIHN0YXRlLmF1dGguaWQgfHwgJyc7XG4gICAgICAgICAgICBzZXR1cFBhZ2UoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldHVwUGFnZSgpO1xuICAgICAgICAgICAgbGV0IGMgPSAwO1xuICAgICAgICAgICAgdmFyIGkgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGMgPCA1MCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoISF3aW5kb3cuZ191c2VyX2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VySWQgPSB3aW5kb3cuZ191c2VyX2lkO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dXBQYWdlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja1VzZXJBdXRoKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAyMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgY2hlY2tVc2VyQXV0aCgpO1xuXG4gICAgICAgIHBhcnRpY2lwYXRlQnRucy5mb3JFYWNoKChhdXRoQnRuLCBpKSA9PiB7XG4gICAgICAgICAgICBhdXRoQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgcGFydGljaXBhdGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXR1cFBhZ2UoKSB7XG4gICAgICAgIGlmICh1c2VySWQgJiYgdXJsUGFyYW1zLmhhcyhwYXJ0aWNpcGF0ZVBhcmFtKSkge1xuICAgICAgICAgICAgcGFydGljaXBhdGUodHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFydGljaXBhdGUoZmFzdFJlZykge1xuICAgICAgICBpZiAoIXVzZXJJZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGFyYW1zID0ge3VzZXJpZDogdXNlcklkfTtcblxuICAgICAgICByZXF1ZXN0KCcvdXNlcicsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGFyYW1zKVxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LmFkZCgnaGlkZScpKTtcbiAgICAgICAgICAgIHJlZGlyZWN0QnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJykpO1xuICAgICAgICAgICAgSW5pdFBhZ2UoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVuZGVyVXNlcnMgPSAodXNlcnMpID0+IHtcbiAgICAgICAgcmVzdWx0c1RhYmxlV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIHJlc3VsdHNUYWJsZU90aGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcblxuICAgICAgICBpZiAodXNlcnMgJiYgdXNlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgdG9wVXNlcnMgPSB1c2Vycy5zbGljZSgwLCAxMCk7XG4gICAgICAgICAgICBwb3B1bGF0ZVVzZXJzVGFibGUodG9wVXNlcnMsIHVzZXJJZCwgdG9wUmVzdWx0c1RhYmxlLCB1c2Vycyk7XG5cbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRVc2VyID0gdXNlcklkICYmIHVzZXJzLmZpbmQodXNlciA9PiB1c2VyLnVzZXJpZCA9PT0gdXNlcklkKTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRVc2VySW5kZXggPSBjdXJyZW50VXNlciAmJiB1c2Vycy5pbmRleE9mKGN1cnJlbnRVc2VyKTtcblxuICAgICAgICAgICAgbGV0IG90aGVyVXNlcnM7XG5cbiAgICAgICAgICAgIGlmICghY3VycmVudFVzZXJJbmRleCB8fCBjdXJyZW50VXNlckluZGV4IDwgMTApIHtcbiAgICAgICAgICAgICAgICBvdGhlclVzZXJzID0gdXNlcnMuc2xpY2UoMTAsIDEzKTtcbiAgICAgICAgICAgIH0gIGVsc2Uge1xuICAgICAgICAgICAgICAgIG90aGVyVXNlcnMgPSB1c2Vycy5zbGljZShNYXRoLm1heChjdXJyZW50VXNlckluZGV4IC0gMSwgMTApLCBjdXJyZW50VXNlckluZGV4ICsgMik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvdGhlclVzZXJzICYmIG90aGVyVXNlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcG9wdWxhdGVVc2Vyc1RhYmxlKG90aGVyVXNlcnMsIHVzZXJJZCwgcmVzdWx0c1RhYmxlT3RoZXIsIHVzZXJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9ybWF0VGV4dCh0ZXh0KSB7XG4gICAgICAgIHJldHVybiB0ZXh0LnNwbGl0KCcoJylbMF1cbiAgICB9XG5cblxuXG4gICAgZnVuY3Rpb24gcG9wdWxhdGVVc2Vyc1RhYmxlKHVzZXJzLCBjdXJyZW50VXNlcklkLCB0YWJsZSwgYWxsVXNlcnMpIHtcbiAgICAgICAgdGFibGUuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIGlmICh1c2VycyAmJiB1c2Vycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHVzZXJzLmZvckVhY2goKHVzZXIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjaGVja0N1cnJlbnRVc2VyID0gY3VycmVudFVzZXJJZCAmJiBjdXJyZW50VXNlcklkID09PSB1c2VyLnVzZXJpZDtcbiAgICAgICAgICAgICAgICBjb25zdCBhZGRpdGlvbmFsVXNlclJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmNsYXNzTGlzdC5hZGQoJ3RhYmxlUmVzdWx0c19fcm93Jyk7XG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrQ3VycmVudFVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuY2xhc3NMaXN0LmFkZCgnX3lvdXJQbGFjZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBwbGFjZSA9IGFsbFVzZXJzLmluZGV4T2YodXNlcikgKyAxO1xuICAgICAgICAgICAgICAgIGNvbnN0IHByaXplUGxhY2VDc3MgPSBQUklaRVNfQ1NTW3BsYWNlIC0gMV07XG4gICAgICAgICAgICAgICAgaWYgKHByaXplUGxhY2VDc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuY2xhc3NMaXN0LmFkZChwcml6ZVBsYWNlQ3NzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcHJpemVLZXkgPSBnZXRQcml6ZVRyYW5zbGF0aW9uS2V5KHVzZXIucG9pbnRzKVxuICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZVJlc3VsdHNfX2JvZHktY29sXCIgJHtjaGVja0N1cnJlbnRVc2VyfT4ke3BsYWNlfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlUmVzdWx0c19fYm9keS1jb2xcIj4ke2NoZWNrQ3VycmVudFVzZXIgPyB1c2VyLnVzZXJpZCA6IG1hc2tVc2VySWQodXNlci51c2VyaWQpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlUmVzdWx0c19fYm9keS1jb2xcIj4ke01hdGguZmxvb3IodXNlci5wb2ludHMpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlUmVzdWx0c19fYm9keS1jb2xcIj4ke3ByaXplS2V5ID8gZm9ybWF0VGV4dCh0cmFuc2xhdGVLZXkocHJpemVLZXkpKSA6ICcgLSAnfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICBgO1xuICAgICAgICAgICAgICAgIHRhYmxlLmFwcGVuZChhZGRpdGlvbmFsVXNlclJvdyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRQcml6ZVRyYW5zbGF0aW9uS2V5KHBvaW50cykge1xuICAgICAgICBpZiAocG9pbnRzID49IDEwMDAwKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3ByaXplXzEnO1xuICAgICAgICB9IGVsc2UgaWYgKHBvaW50cyA+PSA1MDAwICYmIHBvaW50cyA8PSA5OTk5KSB7XG4gICAgICAgICAgICByZXR1cm4gJ3ByaXplXzInO1xuICAgICAgICB9IGVsc2UgaWYgKHBvaW50cyA+PSAxNTAwICYmIHBvaW50cyA8PSA0OTk5KSB7XG4gICAgICAgICAgICByZXR1cm4gJ3ByaXplXzMnO1xuICAgICAgICB9IGVsc2UgaWYgKHBvaW50cyA+PSA1MDAgJiYgcG9pbnRzIDw9IDE0OTkpIHtcbiAgICAgICAgICAgIHJldHVybiAncHJpemVfNCc7XG4gICAgICAgIH1lbHNlIGlmIChwb2ludHMgPj0gMTUwICYmIHBvaW50cyA8PSA0OTkpIHtcbiAgICAgICAgICAgIHJldHVybiAncHJpemVfNSc7XG4gICAgICAgIH0gZWxzZSBpZiAocG9pbnRzID49IDUwICYmIHBvaW50cyA8PSAxNDkpIHtcbiAgICAgICAgICAgIHJldHVybiAncHJpemVfNic7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVLZXkoa2V5KSB7XG4gICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGkxOG5EYXRhW2tleV0gfHwgJyotLS0tTkVFRCBUTyBCRSBUUkFOU0xBVEVELS0tLSogICBrZXk6ICAnICsga2V5O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1hc2tVc2VySWQodXNlcklkKSB7XG4gICAgICAgIHJldHVybiBcIioqKipcIiArIHVzZXJJZC50b1N0cmluZygpLnNsaWNlKDQpO1xuICAgIH1cblxuICAgIGxldCBjaGVja1VzZXJBdXRoID0gKCkgPT4ge1xuICAgICAgICBpZiAodXNlcklkKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHVuYXV0aE1lcyBvZiB1bmF1dGhNc2dzKSB7XG4gICAgICAgICAgICAgICAgdW5hdXRoTWVzLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcXVlc3QoYC9mYXZ1c2VyLyR7dXNlcklkfWApXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMudXNlcmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LmFkZCgnaGlkZScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWN0QnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3RTdGFydEJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LmFkZCgnaGlkZScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJbmZvID0gcmVzO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljaXBhdGVCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgcGFydGljaXBhdGVCdG4gb2YgcGFydGljaXBhdGVCdG5zKSB7XG4gICAgICAgICAgICAgICAgcGFydGljaXBhdGVCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCB1bmF1dGhNZXMgb2YgdW5hdXRoTXNncykge1xuICAgICAgICAgICAgICAgIHVuYXV0aE1lcy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsb2FkVHJhbnNsYXRpb25zKClcbiAgICAgICAgLnRoZW4oaW5pdCk7XG5cbiAgICBsZXQgbWFpblBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmF2X19wYWdlJyk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBtYWluUGFnZS5jbGFzc0xpc3QuYWRkKCdvdmVyZmxvdycpLCAxMDAwKTtcblxuXG4gICAgLy9zaG93IHBvcHVwY2hpa1xuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gICAgY29uc3QgcG9wdXBXcmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwJyk7XG4gICAgY29uc3QgYnRuVGFibGVTaG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3VsdF9fc3VidGV4dCcpO1xuICAgIGNvbnN0IHRhYmxlUG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJpemUtZnVuZCcpO1xuICAgIGNvbnN0IHRhYmxlUG9wdXBCdG5DbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcml6ZS1mdW5kLWNsb3NlJyk7XG5cblxuICAgIGJ0blRhYmxlU2hvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+e1xuICAgICAgICBwb3B1cFdyYXAuY2xhc3NMaXN0LnJlbW92ZSgnX2hpZGRlbicpO1xuICAgICAgICBib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbidcbiAgICAgICAgdGFibGVQb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9KVxuXG4gICAgdGFibGVQb3B1cEJ0bkNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBwb3B1cFdyYXAuY2xhc3NMaXN0LmFkZCgnX2hpZGRlbicpO1xuICAgICAgICBib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2F1dG8nXG4gICAgICAgIHRhYmxlUG9wdXAuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9KVxuXG5cbiAgICAvL3Nob3cgcnVsZXMtIGRldGFpbHNcbiAgICBjb25zdCBydWxlc0l0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJ1bGVzX19pdGVtJylcbiAgICBydWxlc0l0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC50b2dnbGUoJ19vcGVuJylcbiAgICAgICAgfSlcbiAgICB9KVxuXG59KSgpO1xuIiwiIl19
