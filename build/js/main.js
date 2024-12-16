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

  // let locale = "en"
  var locale = sessionStorage.getItem("locale") ? sessionStorage.getItem("locale") : "hr";
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJzZWNvbmQuanMiXSwibmFtZXMiOlsiYXBpVVJMIiwidXJsUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwid2luZG93IiwibG9jYXRpb24iLCJzZWFyY2giLCJwYXJ0aWNpcGF0ZVBhcmFtIiwiUFJPTU9fU1RBUlRfREFURSIsIkRhdGUiLCJQUk9NT19EVVJBVElPTl9XRUVLUyIsInJlc3VsdHNUYWJsZU90aGVyIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwibWFpbkJsb2NrIiwidG9wUmVzdWx0c1RhYmxlIiwiZ2V0RWxlbWVudEJ5SWQiLCJ1bmF1dGhNc2dzIiwicXVlcnlTZWxlY3RvckFsbCIsInBhcnRpY2lwYXRlQnRucyIsInJlc3VsdHNUYWJsZVdyYXBwZXIiLCJyZWRpcmVjdEJ0bnMiLCJxdWVzdERpdnMiLCJwbGF5QnRuIiwicXVlc3RTdGFydEJ0bnMiLCJxdWVzdFBvcHVwIiwicXVlc3RMZXZlbERpdnMiLCJwb3B1cFBsYXlCdG4iLCJ3ZWVrc1NlbGVjdG9yIiwid2Vla3NDb250YWluZXIiLCJjdXJyZW50RGF0ZSIsInVzZXJzIiwicXVlc3RzIiwidXNlckluZm8iLCJzZWxlY3RlZFdlZWtUYWJJZCIsImhyTGVuZyIsImVuTGVuZyIsImxvY2FsZSIsInNlc3Npb25TdG9yYWdlIiwiZ2V0SXRlbSIsInNldFN0YXRlIiwibmV3TG9jYWxlIiwic2V0SXRlbSIsInRvZ2dsZVN0YXRlIiwicmVsb2FkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNsYXNzTGlzdCIsImFkZCIsIlBSSVpFU19DU1MiLCJpMThuRGF0YSIsInVzZXJJZCIsImxvYWRUcmFuc2xhdGlvbnMiLCJmZXRjaCIsImNvbmNhdCIsInRoZW4iLCJyZXMiLCJqc29uIiwidHJhbnNsYXRlIiwibXV0YXRpb25PYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJtdXRhdGlvbnMiLCJvYnNlcnZlIiwiY2hpbGRMaXN0Iiwic3VidHJlZSIsImVsZW1zIiwibGVuZ3RoIiwiZm9yRWFjaCIsImVsZW0iLCJrZXkiLCJnZXRBdHRyaWJ1dGUiLCJpbm5lckhUTUwiLCJyZW1vdmVBdHRyaWJ1dGUiLCJyZWZyZXNoTG9jYWxpemVkQ2xhc3MiLCJlbGVtZW50IiwiYmFzZUNzc0NsYXNzIiwiX2kiLCJfYXJyIiwibGFuZyIsInJlbW92ZSIsInJlcXVlc3QiLCJsaW5rIiwiZXh0cmFPcHRpb25zIiwiX29iamVjdFNwcmVhZCIsImhlYWRlcnMiLCJnZXREYXRhIiwiUHJvbWlzZSIsImFsbCIsImluaXREcm9wIiwib3BlbkRyb3AiLCJkZXNrQ2xhc3MiLCJvcGVuIiwiZGV0YWlscyIsIml0ZW0iLCJJbml0UGFnZSIsInciLCJpIiwiZSIsInMiLCJyZWZyZXNoVXNlcnMiLCJyZW5kZXJVc2VycyIsImNhbGN1bGF0ZVJlY2VudFByb21vV2Vla3MiLCJjdXJyU3RhcnQiLCJjdXJyRW5kIiwidG9kYXkiLCJyZWNlbnRXZWVrcyIsIndlZWtDbnQiLCJ3ZWVrRGlmZiIsImdldFRpbWUiLCJzZXREYXRlIiwiZ2V0RGF0ZSIsInB1c2giLCJXZWVrUmFuZ2UiLCJyZWZyZXNoV2Vla1RhYnMiLCJyZWNlbnRXZWVrUmFuZ2VzIiwid2Vla1JhbmdlIiwid2Vla1NlbGVjdG9yIiwid2VlayIsImdldFVzZXJzIiwidXJsIiwicmVzb2x2ZVVzZXJzVXJsIiwibWFwIiwidXNlck9ySWQiLCJ1c2VyaWQiLCJpbml0Iiwic3RvcmUiLCJzdGF0ZSIsImdldFN0YXRlIiwiYXV0aCIsImlzQXV0aG9yaXplZCIsImlkIiwic2V0dXBQYWdlIiwiYyIsInNldEludGVydmFsIiwiZ191c2VyX2lkIiwiY2hlY2tVc2VyQXV0aCIsImNsZWFySW50ZXJ2YWwiLCJhdXRoQnRuIiwicHJldmVudERlZmF1bHQiLCJwYXJ0aWNpcGF0ZSIsImhhcyIsImZhc3RSZWciLCJwYXJhbXMiLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInRvcFVzZXJzIiwic2xpY2UiLCJwb3B1bGF0ZVVzZXJzVGFibGUiLCJjdXJyZW50VXNlciIsImZpbmQiLCJ1c2VyIiwiY3VycmVudFVzZXJJbmRleCIsImluZGV4T2YiLCJvdGhlclVzZXJzIiwiTWF0aCIsIm1heCIsImZvcm1hdFRleHQiLCJ0ZXh0Iiwic3BsaXQiLCJjdXJyZW50VXNlcklkIiwidGFibGUiLCJhbGxVc2VycyIsImNoZWNrQ3VycmVudFVzZXIiLCJhZGRpdGlvbmFsVXNlclJvdyIsImNyZWF0ZUVsZW1lbnQiLCJwbGFjZSIsInByaXplUGxhY2VDc3MiLCJwcml6ZUtleSIsImdldFByaXplVHJhbnNsYXRpb25LZXkiLCJwb2ludHMiLCJtYXNrVXNlcklkIiwiZmxvb3IiLCJ0cmFuc2xhdGVLZXkiLCJhcHBlbmQiLCJ0b1N0cmluZyIsIl9pdGVyYXRvciIsIl9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyIiwiX3N0ZXAiLCJuIiwiZG9uZSIsInVuYXV0aE1lcyIsInZhbHVlIiwiZXJyIiwiZiIsIl9pdGVyYXRvcjIiLCJfc3RlcDIiLCJwYXJ0aWNpcGF0ZUJ0biIsIl9pdGVyYXRvcjMiLCJfc3RlcDMiLCJtYWluUGFnZSIsInNldFRpbWVvdXQiLCJwb3B1cFdyYXAiLCJidG5UYWJsZVNob3ciLCJ0YWJsZVBvcHVwIiwidGFibGVQb3B1cEJ0bkNsb3NlIiwic3R5bGUiLCJvdmVyZmxvdyIsImRpc3BsYXkiLCJydWxlc0l0ZW1zIiwidG9nZ2xlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLENBQUMsWUFBWTtFQUNULElBQU1BLE1BQU0sR0FBRyxnQ0FBZ0M7RUFDL0MsSUFBTUMsU0FBUyxHQUFHLElBQUlDLGVBQWUsQ0FBQ0MsTUFBTSxDQUFDQyxRQUFRLENBQUNDLE1BQU0sQ0FBQztFQUM3RCxJQUFNQyxnQkFBZ0IsR0FBRyxLQUFLO0VBQzlCLElBQU1DLGdCQUFnQixHQUFHLElBQUlDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQztFQUN6RCxJQUFNQyxvQkFBb0IsR0FBRyxDQUFDO0VBRTlCLElBQ0lDLGlCQUFpQixHQUFHQyxRQUFRLENBQUNDLGFBQWEsQ0FBQywy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LGdCQUFnQixDQUFDLGNBQWMsQ0FBQztFQUM1RHFMLFVBQVUsQ0FBQ3JJLE9BQU8sQ0FBQyxVQUFBMEIsSUFBSSxFQUFJO0lBQ3ZCQSxJQUFJLENBQUMvQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtNQUNqQytDLElBQUksQ0FBQzlDLFNBQVMsQ0FBQzBKLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbEMsQ0FBQyxDQUFDO0VBQ04sQ0FBQyxDQUFDO0FBRU4sQ0FBQyxFQUFFLENBQUM7QUNsYUoiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgYXBpVVJMID0gJ2h0dHBzOi8vZmF2LXByb20uY29tL2FwaV9ueV9ocic7XG4gICAgY29uc3QgdXJsUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcbiAgICBjb25zdCBwYXJ0aWNpcGF0ZVBhcmFtID0gJ3JlZyc7XG4gICAgY29uc3QgUFJPTU9fU1RBUlRfREFURSA9IG5ldyBEYXRlKFwiMjAyNC0xMi0xNVQyMjowMDowMFpcIik7XG4gICAgY29uc3QgUFJPTU9fRFVSQVRJT05fV0VFS1MgPSA0O1xuXG4gICAgY29uc3RcbiAgICAgICAgcmVzdWx0c1RhYmxlT3RoZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFibGVSZXN1bHRzX19ib2R5LW90aGVyJyksXG4gICAgICAgIG1haW5CbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmF2X19wYWdlXCIpLFxuICAgICAgICB0b3BSZXN1bHRzVGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9wLXVzZXJzJyksXG4gICAgICAgIHVuYXV0aE1zZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudW5hdXRoLW1zZycpLFxuICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuLWpvaW4nKSxcbiAgICAgICAgcmVzdWx0c1RhYmxlV3JhcHBlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN1bHRzLXRhYmxlJyksXG4gICAgICAgIHJlZGlyZWN0QnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b29rLXBhcnQnKSxcbiAgICAgICAgcXVlc3REaXZzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJvdXRlX19pdGVtJyksXG4gICAgICAgIHBsYXlCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucXVlc3QtcGxheScpLFxuICAgICAgICBxdWVzdFN0YXJ0QnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5xdWVzdEJ0bicpLFxuICAgICAgICBxdWVzdFBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnF1ZXN0JyksXG4gICAgICAgIHF1ZXN0TGV2ZWxEaXZzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnF1ZXN0X19pdGVtJyksXG4gICAgICAgIHBvcHVwUGxheUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maXJzdFBsYXknKSxcbiAgICAgICAgd2Vla3NTZWxlY3RvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJsZVJlc3VsdHNfX3RhYnMtaXRlbScpLFxuICAgICAgICB3ZWVrc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YWJsZVJlc3VsdHNfX3RhYnMnKTtcblxuICAgIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTsgLy9uZXcgRGF0ZShcIjIwMjMtMTItMTRUMjE6MDA6MDAuMDAwWlwiKTtcbiAgICBsZXQgdXNlcnM7XG4gICAgbGV0IHF1ZXN0cztcbiAgICBsZXQgdXNlckluZm87XG4gICAgbGV0IHNlbGVjdGVkV2Vla1RhYklkO1xuXG4gICAgY29uc3QgaHJMZW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VrTGVuZycpO1xuICAgIGNvbnN0IGVuTGVuZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbkxlbmcnKTtcblxuICAgIC8vIGxldCBsb2NhbGUgPSBcImVuXCJcbiAgICBsZXQgbG9jYWxlID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImxvY2FsZVwiKSA/IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJsb2NhbGVcIikgOiBcImhyXCI7XG5cbiAgICBmdW5jdGlvbiBzZXRTdGF0ZShuZXdMb2NhbGUpIHtcbiAgICAgICAgbG9jYWxlID0gbmV3TG9jYWxlO1xuICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdsb2NhbGUnLCBsb2NhbGUpO1xuICAgIH1cbiAgICBmdW5jdGlvbiB0b2dnbGVTdGF0ZSgpIHtcbiAgICAgICAgY29uc3QgbmV3TG9jYWxlID0gbG9jYWxlID09PSAnZW4nID8gJ2hyJyA6ICdlbic7XG4gICAgICAgIHNldFN0YXRlKG5ld0xvY2FsZSk7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKVxuICAgIH1cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZW4tYnRuJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHRvZ2dsZVN0YXRlKCk7XG4gICAgfSk7XG5cbiAgICBtYWluQmxvY2suY2xhc3NMaXN0LmFkZChsb2NhbGUpXG5cbiAgICBpZiAoaHJMZW5nKSBsb2NhbGUgPSAnaHInO1xuICAgIGlmIChlbkxlbmcpIGxvY2FsZSA9ICdlbic7XG5cbiAgICBjb25zdCBQUklaRVNfQ1NTID0gWydwbGFjZTEnLCAncGxhY2UyJywgJ3BsYWNlMyddO1xuXG4gICAgbGV0IGkxOG5EYXRhID0ge307XG4gICAgbGV0IHVzZXJJZDtcbiAgICB1c2VySWQgPSAxNDU0ODA1O1xuXG5cbiAgICBmdW5jdGlvbiBsb2FkVHJhbnNsYXRpb25zKCkge1xuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YXBpVVJMfS90cmFuc2xhdGVzLyR7bG9jYWxlfWApLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAudGhlbihqc29uID0+IHtcbiAgICAgICAgICAgICAgICBpMThuRGF0YSA9IGpzb247XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlKCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgbXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXdZZWFyMjAyNCcpLCB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlKCkge1xuICAgICAgICBjb25zdCBlbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRyYW5zbGF0ZV0nKVxuICAgICAgICBpZiAoZWxlbXMgJiYgZWxlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBlbGVtcy5mb3JFYWNoKGVsZW0gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGVsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScpO1xuICAgICAgICAgICAgICAgIGVsZW0uaW5uZXJIVE1MID0gaTE4bkRhdGFba2V5XSB8fCAnKi0tLS1ORUVEIFRPIEJFIFRSQU5TTEFURUQtLS0tKiAgIGtleTogICcgKyBrZXk7XG4gICAgICAgICAgICAgICAgZWxlbS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdHJhbnNsYXRlJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHJlZnJlc2hMb2NhbGl6ZWRDbGFzcygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hMb2NhbGl6ZWRDbGFzcyhlbGVtZW50LCBiYXNlQ3NzQ2xhc3MpIHtcbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBsYW5nIG9mIFsndWsnLCAnZW4nXSkge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGJhc2VDc3NDbGFzcyArIGxhbmcpO1xuICAgICAgICB9XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChiYXNlQ3NzQ2xhc3MgKyBsb2NhbGUpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlcXVlc3QgPSBmdW5jdGlvbiAobGluaywgZXh0cmFPcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChhcGlVUkwgKyBsaW5rLCB7XG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLi4uKGV4dHJhT3B0aW9ucyB8fCB7fSlcbiAgICAgICAgfSkudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXREYXRhKCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgcmVxdWVzdCgnL3VzZXJzJyksXG4gICAgICAgICAgICAvLyByZXF1ZXN0KCcvcXVlc3RzJylcbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdERyb3AoKSB7XG4gICAgICAgIGNvbnN0IG9wZW5Ecm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5pbmZvUnVsZXNcIik7XG4gICAgICAgIGxldCBkZXNrQ2xhc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuRm9vdGVyX2NvbnRhaW5lci0tQlNYJyk7XG5cbiAgICAgICAgb3BlbkRyb3AuZm9yRWFjaChvcGVuID0+IHtcbiAgICAgICAgICAgIG9wZW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGV0YWlscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHJvcE9wZW5cIik7XG4gICAgICAgICAgICAgICAgZGV0YWlscy5vcGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYgKCFkZXNrQ2xhc3MpIHtcbiAgICAgICAgICAgIG9wZW5Ecm9wLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5hZGQoJ2Jsb2NrTGluaycpKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgY29uc3QgSW5pdFBhZ2UgPSAoKSA9PiB7XG4gICAgICAgIGluaXREcm9wKCk7XG4gICAgICAgIHdlZWtzU2VsZWN0b3IuZm9yRWFjaCgodywgaSkgPT4gdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICAgICAgaWYgKGkgPT09IHNlbGVjdGVkV2Vla1RhYklkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2Vla3NTZWxlY3Rvci5mb3JFYWNoKHMgPT4gcy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XG4gICAgICAgICAgICB3LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgc2VsZWN0ZWRXZWVrVGFiSWQgPSBpO1xuICAgICAgICAgICAgcmVmcmVzaFVzZXJzKHNlbGVjdGVkV2Vla1RhYklkICsgMSk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgcmVmcmVzaFVzZXJzKHNlbGVjdGVkV2Vla1RhYklkICsgMSk7XG4gICAgICAgIGdldERhdGEoKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICB1c2VycyA9IHJlc1swXTtcbiAgICAgICAgICAgIHF1ZXN0cyA9IChyZXNbMV0gfHwgW10pO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocXVlc3RzKTtcbiAgICAgICAgICAgIHJlbmRlclVzZXJzKHVzZXJzKTtcbiAgICAgICAgICAgIHRyYW5zbGF0ZSgpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhbGN1bGF0ZVJlY2VudFByb21vV2Vla3MoKSB7XG4gICAgICAgIGxldCBjdXJyU3RhcnQgPSBQUk9NT19TVEFSVF9EQVRFO1xuICAgICAgICBsZXQgY3VyckVuZCA9IFBST01PX1NUQVJUX0RBVEU7XG4gICAgICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICAgICAgY29uc3QgcmVjZW50V2Vla3MgPSBbXTtcbiAgICAgICAgbGV0IHdlZWtDbnQgPSAwO1xuICAgICAgICBsZXQgd2Vla0RpZmYgPSA3O1xuICAgICAgICB3aGlsZSAoY3VyckVuZCA8PSB0b2RheSAmJiB3ZWVrQ250IDwgUFJPTU9fRFVSQVRJT05fV0VFS1MpIHtcbiAgICAgICAgICAgIGN1cnJTdGFydCA9IGN1cnJFbmQ7XG4gICAgICAgICAgICBjdXJyRW5kID0gbmV3IERhdGUoY3VyckVuZC5nZXRUaW1lKCkpO1xuICAgICAgICAgICAgY3VyckVuZC5zZXREYXRlKGN1cnJFbmQuZ2V0RGF0ZSgpICsgd2Vla0RpZmYpO1xuICAgICAgICAgICAgcmVjZW50V2Vla3MucHVzaChuZXcgV2Vla1JhbmdlKGN1cnJTdGFydCwgY3VyckVuZCkpO1xuICAgICAgICAgICAgd2Vla0RpZmYgPSA3O1xuICAgICAgICAgICAgd2Vla0NudCsrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZWNlbnRXZWVrcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWZyZXNoV2Vla1RhYnMoKSB7XG4gICAgICAgIGNvbnN0IHJlY2VudFdlZWtSYW5nZXMgPSBjYWxjdWxhdGVSZWNlbnRQcm9tb1dlZWtzKCk7XG4gICAgICAgIHNlbGVjdGVkV2Vla1RhYklkID0gcmVjZW50V2Vla1Jhbmdlcy5sZW5ndGggLSAxO1xuICAgICAgICBpZiAoIXJlY2VudFdlZWtSYW5nZXMgfHwgcmVjZW50V2Vla1Jhbmdlcy5sZW5ndGggPT09IDApIHsgLy8gcHJvbW8gbm90IHN0YXJ0ZWQgeWV0XG4gICAgICAgICAgICB3ZWVrc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdlZWtzU2VsZWN0b3IubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHdlZWtSYW5nZSA9IHJlY2VudFdlZWtSYW5nZXNbaV07XG4gICAgICAgICAgICBjb25zdCB3ZWVrU2VsZWN0b3IgPSB3ZWVrc1NlbGVjdG9yW2ldO1xuICAgICAgICAgICAgaWYgKCF3ZWVrUmFuZ2UpIHtcbiAgICAgICAgICAgICAgICB3ZWVrU2VsZWN0b3IuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgd2Vla3NTZWxlY3Rvci5mb3JFYWNoKCh3LCBpKSA9PiB7XG4gICAgICAgICAgICB3LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgaWYgKGkgPT09IHNlbGVjdGVkV2Vla1RhYklkKSB7XG4gICAgICAgICAgICAgICAgdy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaFVzZXJzKHdlZWspIHtcbiAgICAgICAgZ2V0VXNlcnMod2VlaykudGhlbih1c2VycyA9PiB7XG4gICAgICAgICAgICByZW5kZXJVc2Vycyh1c2Vycyk7XG4gICAgICAgICAgICB0cmFuc2xhdGUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VXNlcnMod2Vlaykge1xuICAgICAgICBjb25zdCB1cmwgPSByZXNvbHZlVXNlcnNVcmwod2Vlayk7XG4gICAgICAgIHJldHVybiByZXF1ZXN0KHVybClcbiAgICAgICAgICAgIC50aGVuKHVzZXJzID0+IHVzZXJzLm1hcCh1c2VyT3JJZCA9PiB0eXBlb2YgdXNlck9ySWQgPT09ICdudW1iZXInID8ge3VzZXJpZDogdXNlck9ySWR9IDogdXNlck9ySWQpKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVzb2x2ZVVzZXJzVXJsKHdlZWspIHtcbiAgICAgICAgcmV0dXJuIHdlZWsgPyBgL3VzZXJzLyR7d2Vla31gIDogJy91c2Vycyc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgcmVmcmVzaFdlZWtUYWJzKCk7XG4gICAgICAgIGlmICh3aW5kb3cuc3RvcmUpIHtcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IHdpbmRvdy5zdG9yZS5nZXRTdGF0ZSgpO1xuICAgICAgICAgICAgdXNlcklkID0gc3RhdGUuYXV0aC5pc0F1dGhvcml6ZWQgJiYgc3RhdGUuYXV0aC5pZCB8fCAnJztcbiAgICAgICAgICAgIHNldHVwUGFnZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0dXBQYWdlKCk7XG4gICAgICAgICAgICBsZXQgYyA9IDA7XG4gICAgICAgICAgICB2YXIgaSA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoYyA8IDUwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghIXdpbmRvdy5nX3VzZXJfaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJZCA9IHdpbmRvdy5nX3VzZXJfaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXR1cFBhZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrVXNlckF1dGgoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgIH1cblxuICAgICAgICBjaGVja1VzZXJBdXRoKCk7XG5cbiAgICAgICAgcGFydGljaXBhdGVCdG5zLmZvckVhY2goKGF1dGhCdG4sIGkpID0+IHtcbiAgICAgICAgICAgIGF1dGhCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldHVwUGFnZSgpIHtcbiAgICAgICAgaWYgKHVzZXJJZCAmJiB1cmxQYXJhbXMuaGFzKHBhcnRpY2lwYXRlUGFyYW0pKSB7XG4gICAgICAgICAgICBwYXJ0aWNpcGF0ZSh0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIEluaXRQYWdlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJ0aWNpcGF0ZShmYXN0UmVnKSB7XG4gICAgICAgIGlmICghdXNlcklkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXJhbXMgPSB7dXNlcmlkOiB1c2VySWR9O1xuXG4gICAgICAgIHJlcXVlc3QoJy91c2VyJywge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXJhbXMpXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIHBhcnRpY2lwYXRlQnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRlJykpO1xuICAgICAgICAgICAgcmVkaXJlY3RCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKSk7XG4gICAgICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCByZW5kZXJVc2VycyA9ICh1c2VycykgPT4ge1xuICAgICAgICByZXN1bHRzVGFibGVXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgcmVzdWx0c1RhYmxlT3RoZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuXG4gICAgICAgIGlmICh1c2VycyAmJiB1c2Vycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCB0b3BVc2VycyA9IHVzZXJzLnNsaWNlKDAsIDEwKTtcbiAgICAgICAgICAgIHBvcHVsYXRlVXNlcnNUYWJsZSh0b3BVc2VycywgdXNlcklkLCB0b3BSZXN1bHRzVGFibGUsIHVzZXJzKTtcblxuICAgICAgICAgICAgY29uc3QgY3VycmVudFVzZXIgPSB1c2VySWQgJiYgdXNlcnMuZmluZCh1c2VyID0+IHVzZXIudXNlcmlkID09PSB1c2VySWQpO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFVzZXJJbmRleCA9IGN1cnJlbnRVc2VyICYmIHVzZXJzLmluZGV4T2YoY3VycmVudFVzZXIpO1xuXG4gICAgICAgICAgICBsZXQgb3RoZXJVc2VycztcblxuICAgICAgICAgICAgaWYgKCFjdXJyZW50VXNlckluZGV4IHx8IGN1cnJlbnRVc2VySW5kZXggPCAxMCkge1xuICAgICAgICAgICAgICAgIG90aGVyVXNlcnMgPSB1c2Vycy5zbGljZSgxMCwgMTMpO1xuICAgICAgICAgICAgfSAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb3RoZXJVc2VycyA9IHVzZXJzLnNsaWNlKE1hdGgubWF4KGN1cnJlbnRVc2VySW5kZXggLSAxLCAxMCksIGN1cnJlbnRVc2VySW5kZXggKyAyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG90aGVyVXNlcnMgJiYgb3RoZXJVc2Vycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBwb3B1bGF0ZVVzZXJzVGFibGUob3RoZXJVc2VycywgdXNlcklkLCByZXN1bHRzVGFibGVPdGhlciwgdXNlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRUZXh0KHRleHQpIHtcbiAgICAgICAgcmV0dXJuIHRleHQuc3BsaXQoJygnKVswXVxuICAgIH1cblxuXG5cbiAgICBmdW5jdGlvbiBwb3B1bGF0ZVVzZXJzVGFibGUodXNlcnMsIGN1cnJlbnRVc2VySWQsIHRhYmxlLCBhbGxVc2Vycykge1xuICAgICAgICB0YWJsZS5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgaWYgKHVzZXJzICYmIHVzZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgdXNlcnMuZm9yRWFjaCgodXNlcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrQ3VycmVudFVzZXIgPSBjdXJyZW50VXNlcklkICYmIGN1cnJlbnRVc2VySWQgPT09IHVzZXIudXNlcmlkO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFkZGl0aW9uYWxVc2VyUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuY2xhc3NMaXN0LmFkZCgndGFibGVSZXN1bHRzX19yb3cnKTtcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tDdXJyZW50VXNlcikge1xuICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5jbGFzc0xpc3QuYWRkKCdfeW91clBsYWNlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHBsYWNlID0gYWxsVXNlcnMuaW5kZXhPZih1c2VyKSArIDE7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJpemVQbGFjZUNzcyA9IFBSSVpFU19DU1NbcGxhY2UgLSAxXTtcbiAgICAgICAgICAgICAgICBpZiAocHJpemVQbGFjZUNzcykge1xuICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5jbGFzc0xpc3QuYWRkKHByaXplUGxhY2VDc3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBwcml6ZUtleSA9IGdldFByaXplVHJhbnNsYXRpb25LZXkodXNlci5wb2ludHMpXG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlUmVzdWx0c19fYm9keS1jb2xcIiAke2NoZWNrQ3VycmVudFVzZXJ9PiR7cGxhY2V9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19ib2R5LWNvbFwiPiR7Y2hlY2tDdXJyZW50VXNlciA/IHVzZXIudXNlcmlkIDogbWFza1VzZXJJZCh1c2VyLnVzZXJpZCl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19ib2R5LWNvbFwiPiR7TWF0aC5mbG9vcih1c2VyLnBvaW50cyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19ib2R5LWNvbFwiPiR7cHJpemVLZXkgPyBmb3JtYXRUZXh0KHRyYW5zbGF0ZUtleShwcml6ZUtleSkpIDogJyAtICd9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIGA7XG4gICAgICAgICAgICAgICAgdGFibGUuYXBwZW5kKGFkZGl0aW9uYWxVc2VyUm93KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldFByaXplVHJhbnNsYXRpb25LZXkocG9pbnRzKSB7XG4gICAgICAgIGlmIChwb2ludHMgPj0gMTAwMDApIHtcbiAgICAgICAgICAgIHJldHVybiAncHJpemVfMSc7XG4gICAgICAgIH0gZWxzZSBpZiAocG9pbnRzID49IDUwMDAgJiYgcG9pbnRzIDw9IDk5OTkpIHtcbiAgICAgICAgICAgIHJldHVybiAncHJpemVfMic7XG4gICAgICAgIH0gZWxzZSBpZiAocG9pbnRzID49IDE1MDAgJiYgcG9pbnRzIDw9IDQ5OTkpIHtcbiAgICAgICAgICAgIHJldHVybiAncHJpemVfMyc7XG4gICAgICAgIH0gZWxzZSBpZiAocG9pbnRzID49IDUwMCAmJiBwb2ludHMgPD0gMTQ5OSkge1xuICAgICAgICAgICAgcmV0dXJuICdwcml6ZV80JztcbiAgICAgICAgfWVsc2UgaWYgKHBvaW50cyA+PSAxNTAgJiYgcG9pbnRzIDw9IDQ5OSkge1xuICAgICAgICAgICAgcmV0dXJuICdwcml6ZV81JztcbiAgICAgICAgfSBlbHNlIGlmIChwb2ludHMgPj0gNTAgJiYgcG9pbnRzIDw9IDE0OSkge1xuICAgICAgICAgICAgcmV0dXJuICdwcml6ZV82JztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZUtleShrZXkpIHtcbiAgICAgICAgaWYgKCFrZXkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaTE4bkRhdGFba2V5XSB8fCAnKi0tLS1ORUVEIFRPIEJFIFRSQU5TTEFURUQtLS0tKiAgIGtleTogICcgKyBrZXk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFza1VzZXJJZCh1c2VySWQpIHtcbiAgICAgICAgcmV0dXJuIFwiKioqKlwiICsgdXNlcklkLnRvU3RyaW5nKCkuc2xpY2UoNCk7XG4gICAgfVxuXG4gICAgbGV0IGNoZWNrVXNlckF1dGggPSAoKSA9PiB7XG4gICAgICAgIGlmICh1c2VySWQpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdW5hdXRoTWVzIG9mIHVuYXV0aE1zZ3MpIHtcbiAgICAgICAgICAgICAgICB1bmF1dGhNZXMuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVxdWVzdChgL2ZhdnVzZXIvJHt1c2VySWR9YClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzICYmIHJlcy51c2VyaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYXRlQnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRlJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY3RCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVzdFN0YXJ0QnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRlJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlckluZm8gPSByZXM7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBwYXJ0aWNpcGF0ZUJ0biBvZiBwYXJ0aWNpcGF0ZUJ0bnMpIHtcbiAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZUJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHVuYXV0aE1lcyBvZiB1bmF1dGhNc2dzKSB7XG4gICAgICAgICAgICAgICAgdW5hdXRoTWVzLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxvYWRUcmFuc2xhdGlvbnMoKVxuICAgICAgICAudGhlbihpbml0KTtcblxuICAgIGxldCBtYWluUGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mYXZfX3BhZ2UnKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IG1haW5QYWdlLmNsYXNzTGlzdC5hZGQoJ292ZXJmbG93JyksIDEwMDApO1xuXG5cbiAgICAvL3Nob3cgcG9wdXBjaGlrXG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICBjb25zdCBwb3B1cFdyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAnKTtcbiAgICBjb25zdCBidG5UYWJsZVNob3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzdWx0X19zdWJ0ZXh0Jyk7XG4gICAgY29uc3QgdGFibGVQb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcml6ZS1mdW5kJyk7XG4gICAgY29uc3QgdGFibGVQb3B1cEJ0bkNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByaXplLWZ1bmQtY2xvc2UnKTtcblxuXG4gICAgYnRuVGFibGVTaG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT57XG4gICAgICAgIHBvcHVwV3JhcC5jbGFzc0xpc3QucmVtb3ZlKCdfaGlkZGVuJyk7XG4gICAgICAgIGJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJ1xuICAgICAgICB0YWJsZVBvcHVwLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH0pXG5cbiAgICB0YWJsZVBvcHVwQnRuQ2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHBvcHVwV3JhcC5jbGFzc0xpc3QuYWRkKCdfaGlkZGVuJyk7XG4gICAgICAgIGJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnYXV0bydcbiAgICAgICAgdGFibGVQb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH0pXG5cblxuICAgIC8vc2hvdyBydWxlcy0gZGV0YWlsc1xuICAgIGNvbnN0IHJ1bGVzSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucnVsZXNfX2l0ZW0nKVxuICAgIHJ1bGVzSXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnRvZ2dsZSgnX29wZW4nKVxuICAgICAgICB9KVxuICAgIH0pXG5cbn0pKCk7XG4iLCIiXX0=
