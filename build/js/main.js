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
  var selectedWeekTabId = 0;
  var hrLeng = document.querySelector('#ukLeng');
  var enLeng = document.querySelector('#enLeng');
  var locale = sessionStorage.getItem("locale") ? sessionStorage.getItem("locale") : "hr";
  mainBlock.classList.add(locale);
  if (hrLeng) locale = 'hr';
  if (enLeng) locale = 'en';
  var PRIZES_CSS = ['place1', 'place2', 'place3'];
  var i18nData = {};
  var userId;
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
      // refreshQuests(quests, userInfo)
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

  //
  // function refreshQuests(quests, currentUser) {
  //     if (!quests) {
  //         return;
  //     }
  //
  //     const shift = isSecondWeek(quests) ? 4 : 0;
  //     for (let i = 0; i < questDivs.length; i++) {
  //         renderQuest(quests[i + shift], questDivs[i], currentUser);
  //     }
  // }
  //
  // function isSecondWeek(quests) {
  //     const fourthQuest = quests[3];
  //     return fourthQuest && currentDate > new Date(fourthQuest.dateEnd);
  // }

  // function renderQuest(quest, container, currentUser) {
  //     if (!quest || !container) {
  //         return;
  //     }
  //
  //     const questNum = quest.qNumber;
  //     //const questPoints = {points: 300};
  //     const questPoints = currentUser && currentUser.quests && currentUser.quests.find(q => q.questNum === questNum);
  //
  //     // update translations
  //     const questTitleDiv = container.querySelector('.route__item-title');
  //     questTitleDiv.innerHTML = translateKey(`nameQuest-${questNum}`);
  //     const questSubTitleDiv = container.querySelector('.route__item-subtitle');
  //     questSubTitleDiv.innerHTML = translateKey(`quest-${questNum}`);
  //
  //     // update type of quest
  //     const questType = getQuestType(quest);
  //     container.classList.remove('soon');
  //
  //     if (questType === OLD_QUEST_TYPE) {
  //         container.classList.add('inactive');
  //     } else if (questType === FUTURE_QUEST_TYPE) {
  //         container.classList.add('soon');
  //     } else {
  //         const timerElement = container.querySelector('.timerTxt');
  //         const popupTimer = document.querySelector('.quest__time-num');
  //         countdownTimer(quest.dateEnd, timerElement, popupTimer);
  //         container.classList.add(`active`)
  //         updatePopup(quest, questPoints);
  //     }
  //
  //     // update stars
  //     if (questPoints) {
  //         const starDivs = container.querySelectorAll('.star');
  //         const questLevel = getQuestLevel(quest, questPoints.points || 0);
  //         for (let i = 0; i < questLevel; i++) {
  //             const star = starDivs[i];
  //             star.classList.add('_done');
  //         }
  //     }
  //
  //     // updates images
  //     const srcDesc = container.querySelector('.src__desc');
  //     const srcMob = container.querySelector('.src__mob');
  //     const srcDefault = container.querySelector('.src__default');
  //     srcDesc.srcset = `https://fav-prom.com/html/ny-ua/img/route/quest${questNum}-img-desc.png`;
  //     srcMob.srcset = `https://fav-prom.com/html/ny-ua/img/route/quest${questNum}-img-mob.png`;
  //     srcDefault.src = `https://fav-prom.com/html/ny-ua/img/route/quest${questNum}-img-desc.png`;
  //
  //     // update buttons
  //     if (questType == ACTIVE_QUEST_TYPE && userId && !questPoints) {
  //         playBtn.classList.add('hide');
  //         popupPlayBtn.classList.add('hide');
  //         // console.log('removing quest hide ' + currentUser)
  //         questStartBtns.forEach(questStartBtn => questStartBtn.classList.remove('hide'));
  //     }
  // }

  // function updatePopup(quest, questPoints) {
  //     const questNum = quest.qNumber;
  //     const title = document.querySelector('.quest__des-title');
  //     title.innerHTML = translateKey(`quest-${questNum}`);
  //     const description = document.querySelector('.quest__des-text');
  //     description.innerHTML = translateKey(`descrQuest-${questNum}`);
  //     const questName = document.querySelector('.quest__title');
  //     questName.innerHTML = translateKey(`nameQuest-${questNum}`);
  //
  //     const cssClass = questNum % 2 == 0 ? 'sport' : 'casino';
  //     questPopup.classList.add(cssClass);
  //     questPopup.classList.add(`quest-popup${questNum}`);
  //
  //     const userPointsForQuest = questPoints ? questPoints.points : 0;
  //     for (let i = 0; i < questLevelDivs.length; i++) {
  //         const levelDiv = questLevelDivs[i];
  //         const levelInfo = quest.levels[i];
  //         if (levelDiv && levelInfo) {
  //             const subtitle = levelDiv.querySelector('.quest__item-subtitle');
  //             subtitle.innerHTML = translateKey(`prizeQuest-${questNum}_${i + 1}`);
  //             const infoText = levelDiv.querySelector('.quest__item-info-text');
  //             infoText.innerHTML = translateKey(`stepQuest-${questNum}_${i + 1}`);
  //
  //             // progress bar
  //             const levelStartPoints = i === 0 ? 0 : quest.levels[i - 1].points;
  //             const levelEndPoints = levelInfo.points;
  //             const levelPoints = levelEndPoints;
  //             const progressPoints  = Math.min(Math.max(userPointsForQuest, 0), levelPoints);
  //             const progressValue = progressPoints / levelPoints * 100;
  //             const normalized = Math.min(Math.max(Math.floor(progressValue), 0), 100);
  //             const progressElement = levelDiv.querySelector('.quest__item-info-progress');
  //             progressElement.value = normalized;
  //             progressElement.dataset.progress = `${normalized}%`;
  //             const statusDiv = levelDiv.querySelector('.status');
  //             statusDiv.innerHTML = `${progressPoints}/${levelPoints}`;
  //             if (userPointsForQuest < levelStartPoints || !userId) {
  //                 const playBtn = levelDiv.querySelector('.took-part');
  //                 playBtn.classList.add('hide');
  //             }
  //         }
  //     }
  //     refreshProgress();
  // }
  //
  // function countdownTimer(targetDateString, timerElement, popupTimer) {
  //     refreshTimer(targetDateString, timerElement, popupTimer);
  //     const intervalId = setInterval(() => {
  //         const timeDiff = refreshTimer(targetDateString, timerElement, popupTimer);
  //         if (timeDiff < 0) {
  //             clearInterval(intervalId);
  //             timerElement.innerHTML = formatTime('finishedTimer', 0, 0, 0);
  //             popupTimer.innerHTML = formatTime('timer', 0, 0, 0);
  //             location.reload();
  //         }
  //     }, 10000);
  // }
  //
  // function formatTime(key, days, hours, minutes) {
  //     return translateKey(key).replace("{day}", days.toString())
  //         .replace("{hour}", hours.toString())
  //         .replace("{minutes}", minutes.toString());
  // }
  //
  // function refreshTimer(targetDateString, timerElement, popupTimer) {
  //     const targetDate = new Date(targetDateString);
  //     const now = new Date();
  //     const timeDiff = targetDate.getTime() - now.getTime();
  //
  //     const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  //     const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //     const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  //
  //
  //     timerElement.innerHTML = formatTime('finishedTimer', days, hours, minutes);
  //     popupTimer.innerHTML = formatTime('timer', days, hours, minutes);
  //     return timeDiff;
  // }
  //
  // function getQuestLevel(questDefinition, points) {
  //     if (!questDefinition || !questDefinition.levels || questDefinition.levels.length === 0) {
  //         return 0;
  //     }
  //
  //     const levelIndex = questDefinition.levels.findIndex(level => points < level.points);
  //     return levelIndex === -1 ? questDefinition.levels.length : levelIndex;
  // }

  // function getQuestType(quest) {
  //     const startDate = new Date(quest.dateStart);
  //     const endDate = new Date(quest.dateEnd);
  //     if (currentDate < startDate) {
  //         return FUTURE_QUEST_TYPE;
  //     } else if (currentDate > endDate) {
  //         return OLD_QUEST_TYPE;
  //     } else {
  //         return ACTIVE_QUEST_TYPE;
  //     }
  // }

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
          refreshQuests(quests, userInfo);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJzZWNvbmQuanMiXSwibmFtZXMiOlsiYXBpVVJMIiwidXJsUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwid2luZG93IiwibG9jYXRpb24iLCJzZWFyY2giLCJwYXJ0aWNpcGF0ZVBhcmFtIiwicmVzdWx0c1RhYmxlT3RoZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJtYWluQmxvY2siLCJ0b3BSZXN1bHRzVGFibGUiLCJnZXRFbGVtZW50QnlJZCIsInVuYXV0aE1zZ3MiLCJxdWVyeVNlbGVjdG9yQWxsIiwicGFydGljaXBhdGVCdG5zIiwicmVzdWx0c1RhYmxlV3JhcHBlciIsInJlZGlyZWN0QnRucyIsInF1ZXN0RGl2cyIsInBsYXlCdG4iLCJxdWVzdFN0YXJ0QnRucyIsInF1ZXN0UG9wdXAiLCJxdWVzdExldmVsRGl2cyIsInBvcHVwUGxheUJ0biIsIndlZWtzU2VsZWN0b3IiLCJ3ZWVrc0NvbnRhaW5lciIsImN1cnJlbnREYXRlIiwiRGF0ZSIsInVzZXJzIiwicXVlc3RzIiwidXNlckluZm8iLCJzZWxlY3RlZFdlZWtUYWJJZCIsImhyTGVuZyIsImVuTGVuZyIsImxvY2FsZSIsInNlc3Npb25TdG9yYWdlIiwiZ2V0SXRlbSIsImNsYXNzTGlzdCIsImFkZCIsIlBSSVpFU19DU1MiLCJpMThuRGF0YSIsInVzZXJJZCIsInNldFN0YXRlIiwibmV3TG9jYWxlIiwic2V0SXRlbSIsInRvZ2dsZVN0YXRlIiwicmVsb2FkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImxvYWRUcmFuc2xhdGlvbnMiLCJmZXRjaCIsImNvbmNhdCIsInRoZW4iLCJyZXMiLCJqc29uIiwidHJhbnNsYXRlIiwibXV0YXRpb25PYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJtdXRhdGlvbnMiLCJvYnNlcnZlIiwiY2hpbGRMaXN0Iiwic3VidHJlZSIsImVsZW1zIiwibGVuZ3RoIiwiZm9yRWFjaCIsImVsZW0iLCJrZXkiLCJnZXRBdHRyaWJ1dGUiLCJpbm5lckhUTUwiLCJyZW1vdmVBdHRyaWJ1dGUiLCJjb25zb2xlIiwibG9nIiwicmVmcmVzaExvY2FsaXplZENsYXNzIiwiZWxlbWVudCIsImJhc2VDc3NDbGFzcyIsIl9pIiwiX2FyciIsImxhbmciLCJyZW1vdmUiLCJyZXF1ZXN0IiwibGluayIsImV4dHJhT3B0aW9ucyIsIl9vYmplY3RTcHJlYWQiLCJoZWFkZXJzIiwiZ2V0RGF0YSIsIlByb21pc2UiLCJhbGwiLCJpbml0RHJvcCIsIm9wZW5Ecm9wIiwiZGVza0NsYXNzIiwib3BlbiIsImRldGFpbHMiLCJpdGVtIiwiSW5pdFBhZ2UiLCJxdWVzdFN0YXJ0QnRuIiwiZSIsInJlZ2lzdGVySW5RdWVzdCIsInciLCJpIiwicyIsInJlZnJlc2hVc2VycyIsInJlbmRlclVzZXJzIiwiY2FsY3VsYXRlUmVjZW50UHJvbW9XZWVrcyIsImRhdGUiLCJub3ciLCJyZWZyZXNoV2Vla1RhYnMiLCJ3ZWVrU2VsZWN0b3IiLCJ3ZWVrIiwiZ2V0VXNlcnMiLCJ1cmwiLCJyZXNvbHZlVXNlcnNVcmwiLCJtYXAiLCJ1c2VyT3JJZCIsInVzZXJpZCIsImluaXQiLCJzdG9yZSIsInN0YXRlIiwiZ2V0U3RhdGUiLCJhdXRoIiwiaXNBdXRob3JpemVkIiwiaWQiLCJzZXR1cFBhZ2UiLCJjIiwic2V0SW50ZXJ2YWwiLCJnX3VzZXJfaWQiLCJjaGVja1VzZXJBdXRoIiwiY2xlYXJJbnRlcnZhbCIsImF1dGhCdG4iLCJwcmV2ZW50RGVmYXVsdCIsInBhcnRpY2lwYXRlIiwiaGFzIiwiZmFzdFJlZyIsInBhcmFtcyIsIm1ldGhvZCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwidG9wVXNlcnMiLCJzbGljZSIsInBvcHVsYXRlVXNlcnNUYWJsZSIsImN1cnJlbnRVc2VyIiwiZmluZCIsInVzZXIiLCJjdXJyZW50VXNlckluZGV4IiwiaW5kZXhPZiIsIm90aGVyVXNlcnMiLCJNYXRoIiwibWF4IiwiZm9ybWF0VGV4dCIsInRleHQiLCJzcGxpdCIsImN1cnJlbnRVc2VySWQiLCJ0YWJsZSIsImFsbFVzZXJzIiwiY2hlY2tDdXJyZW50VXNlciIsImFkZGl0aW9uYWxVc2VyUm93IiwiY3JlYXRlRWxlbWVudCIsInBsYWNlIiwicHJpemVQbGFjZUNzcyIsInByaXplS2V5IiwiZ2V0UHJpemVUcmFuc2xhdGlvbktleSIsInBvaW50cyIsIm1hc2tVc2VySWQiLCJmbG9vciIsInRyYW5zbGF0ZUtleSIsImFwcGVuZCIsInRvU3RyaW5nIiwiX2l0ZXJhdG9yIiwiX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIiLCJfc3RlcCIsIm4iLCJkb25lIiwidW5hdXRoTWVzIiwidmFsdWUiLCJlcnIiLCJmIiwicmVmcmVzaFF1ZXN0cyIsIl9pdGVyYXRvcjIiLCJfc3RlcDIiLCJwYXJ0aWNpcGF0ZUJ0biIsIl9pdGVyYXRvcjMiLCJfc3RlcDMiLCJtYWluUGFnZSIsInNldFRpbWVvdXQiLCJwb3B1cFdyYXAiLCJidG5UYWJsZVNob3ciLCJ0YWJsZVBvcHVwIiwidGFibGVQb3B1cEJ0bkNsb3NlIiwic3R5bGUiLCJvdmVyZmxvdyIsImRpc3BsYXkiLCJydWxlc0l0ZW1zIiwidG9nZ2xlIiwiZ2FtZVdyYXAiLCJ3ZWVrQnRuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLENBQUMsWUFBWTtFQUNULElBQU1BLE1BQU0sR0FBRyxnQ0FBZ0M7RUFDL0MsSUFBTUMsU0FBUyxHQUFHLElBQUlDLGVBQWUsQ0FBQ0MsTUFBTSxDQUFDQyxRQUFRLENBQUNDLE1BQU0sQ0FBQztFQUM3RCxJQUFNQyxnQkFBZ0IsR0FBRyxLQUFLOztFQUU5QjtFQUNBO0VBQ0E7O0VBRUEsSUFDSUMsaUJBQWlCLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLDJCQUEyQixDQUFDO0lBQ3ZFQyxTQUFTLEdBQUdGLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFlBQVksQ0FBQztJQUNoREUsZUFBZSxHQUFHSCxRQUFRLENBQUNJLGNBQWMsQ0FBQyxXQUFXLENBQUM7SUFDdERDLFVBQVUsR0FBR0wsUUFBUSxDQUFDTSxnQkFBZ0IsQ0FBQyxh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RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFHQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztFQUVBLFNBQVNPLElBQUlBLENBQUEsRUFBRztJQUNaLElBQUk5RyxNQUFNLENBQUMrRyxLQUFLLEVBQUU7TUFDZCxJQUFJQyxLQUFLLEdBQUdoSCxNQUFNLENBQUMrRyxLQUFLLENBQUNFLFFBQVEsQ0FBQyxDQUFDO01BQ25DM0UsTUFBTSxHQUFHMEUsS0FBSyxDQUFDRSxJQUFJLENBQUNDLFlBQVksSUFB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O0lBQ0FzRixRQUFRLENBQUMzSixTQUFTLENBQUN3QyxNQUFNLFFBQUEzQixNQUFBLENBQVF3RCxJQUFJLENBQUUsQ0FBQztJQUN4Q0EsSUFBSSxFQUFFO0lBQ05zRixRQUFRLENBQUMzSixTQUFTLENBQUNDLEdBQUcsUUFBQVksTUFBQSxDQUFRd0QsSUFBSSxDQUFFLENBQUM7RUFDekMsQ0FBQyxDQUFDO0FBR04sQ0FBQyxFQUFFLENBQUM7QUN4bkJKIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGFwaVVSTCA9ICdodHRwczovL2Zhdi1wcm9tLmNvbS9hcGlfbnlfaHInO1xuICAgIGNvbnN0IHVybFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG4gICAgY29uc3QgcGFydGljaXBhdGVQYXJhbSA9ICdyZWcnO1xuXG4gICAgLy8gY29uc3QgRlVUVVJFX1FVRVNUX1RZUEUgPSAnZnV0dXJlJyxcbiAgICAvLyAgICAgT0xEX1FVRVNUX1RZUEUgPSAnb2xkJyxcbiAgICAvLyAgICAgQUNUSVZFX1FVRVNUX1RZUEUgPSAnYWN0aXZlJztcblxuICAgIGNvbnN0XG4gICAgICAgIHJlc3VsdHNUYWJsZU90aGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhYmxlUmVzdWx0c19fYm9keS1vdGhlcicpLFxuICAgICAgICBtYWluQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZhdl9fcGFnZVwiKSxcbiAgICAgICAgdG9wUmVzdWx0c1RhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvcC11c2VycycpLFxuICAgICAgICB1bmF1dGhNc2dzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnVuYXV0aC1tc2cnKSxcbiAgICAgICAgcGFydGljaXBhdGVCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJ0bi1qb2luJyksXG4gICAgICAgIHJlc3VsdHNUYWJsZVdyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdWx0cy10YWJsZScpLFxuICAgICAgICByZWRpcmVjdEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9vay1wYXJ0JyksXG4gICAgICAgIHF1ZXN0RGl2cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yb3V0ZV9faXRlbScpLFxuICAgICAgICBwbGF5QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnF1ZXN0LXBsYXknKSxcbiAgICAgICAgcXVlc3RTdGFydEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucXVlc3RCdG4nKSxcbiAgICAgICAgcXVlc3RQb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5xdWVzdCcpLFxuICAgICAgICBxdWVzdExldmVsRGl2cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5xdWVzdF9faXRlbScpLFxuICAgICAgICBwb3B1cFBsYXlCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmlyc3RQbGF5JyksXG4gICAgICAgIHdlZWtzU2VsZWN0b3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFibGVSZXN1bHRzX190YWJzLWl0ZW0nKSxcbiAgICAgICAgd2Vla3NDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFibGVSZXN1bHRzX190YWJzJyk7XG5cbiAgICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7IC8vbmV3IERhdGUoXCIyMDIzLTEyLTE0VDIxOjAwOjAwLjAwMFpcIik7XG4gICAgbGV0IHVzZXJzO1xuICAgIGxldCBxdWVzdHM7XG4gICAgbGV0IHVzZXJJbmZvO1xuICAgIGxldCBzZWxlY3RlZFdlZWtUYWJJZCA9IDA7XG5cbiAgICBjb25zdCBockxlbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdWtMZW5nJyk7XG4gICAgY29uc3QgZW5MZW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VuTGVuZycpO1xuXG4gICAgbGV0IGxvY2FsZSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJsb2NhbGVcIikgPyBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwibG9jYWxlXCIpIDogXCJoclwiO1xuXG4gICAgbWFpbkJsb2NrLmNsYXNzTGlzdC5hZGQobG9jYWxlKVxuXG4gICAgaWYgKGhyTGVuZykgbG9jYWxlID0gJ2hyJztcbiAgICBpZiAoZW5MZW5nKSBsb2NhbGUgPSAnZW4nO1xuXG4gICAgY29uc3QgUFJJWkVTX0NTUyA9IFsncGxhY2UxJywgJ3BsYWNlMicsICdwbGFjZTMnXTtcblxuICAgIGxldCBpMThuRGF0YSA9IHt9O1xuICAgIGxldCB1c2VySWQ7XG5cbiAgICBmdW5jdGlvbiBzZXRTdGF0ZShuZXdMb2NhbGUpIHtcbiAgICAgICAgbG9jYWxlID0gbmV3TG9jYWxlO1xuICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdsb2NhbGUnLCBsb2NhbGUpO1xuICAgIH1cbiAgICBmdW5jdGlvbiB0b2dnbGVTdGF0ZSgpIHtcbiAgICAgICAgY29uc3QgbmV3TG9jYWxlID0gbG9jYWxlID09PSAnZW4nID8gJ2hyJyA6ICdlbic7XG4gICAgICAgIHNldFN0YXRlKG5ld0xvY2FsZSk7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKVxuICAgIH1cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZW4tYnRuJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHRvZ2dsZVN0YXRlKCk7XG4gICAgfSk7XG4gICAgLy8gbGV0IHVzZXJJZCA9IDEwMDM0MDAyMDtcblxuICAgIGZ1bmN0aW9uIGxvYWRUcmFuc2xhdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChgJHthcGlVUkx9L3RyYW5zbGF0ZXMvJHtsb2NhbGV9YCkudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgICAgIC50aGVuKGpzb24gPT4ge1xuICAgICAgICAgICAgICAgIGkxOG5EYXRhID0ganNvbjtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGUoKTtcblxuICAgICAgICAgICAgICAgIHZhciBtdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKG11dGF0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBtdXRhdGlvbk9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ld1llYXIyMDI0JyksIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGUoKSB7XG4gICAgICAgIGNvbnN0IGVsZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdHJhbnNsYXRlXScpXG4gICAgICAgIGlmIChlbGVtcyAmJiBlbGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGVsZW1zLmZvckVhY2goZWxlbSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gZWxlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdHJhbnNsYXRlJyk7XG4gICAgICAgICAgICAgICAgZWxlbS5pbm5lckhUTUwgPSBpMThuRGF0YVtrZXldIHx8ICcqLS0tLU5FRUQgVE8gQkUgVFJBTlNMQVRFRC0tLS0qICAga2V5OiAgJyArIGtleTtcbiAgICAgICAgICAgICAgICBlbGVtLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS10cmFuc2xhdGUnKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInRyYW5zbGF0ZSBpcyB3b3JraW5nXCIpXG4gICAgICAgIH1cbiAgICAgICAgcmVmcmVzaExvY2FsaXplZENsYXNzKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaExvY2FsaXplZENsYXNzKGVsZW1lbnQsIGJhc2VDc3NDbGFzcykge1xuICAgICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGxhbmcgb2YgWyd1aycsICdlbiddKSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoYmFzZUNzc0NsYXNzICsgbGFuZyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGJhc2VDc3NDbGFzcyArIGxvY2FsZSk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVxdWVzdCA9IGZ1bmN0aW9uIChsaW5rLCBleHRyYU9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKGFwaVVSTCArIGxpbmssIHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAuLi4oZXh0cmFPcHRpb25zIHx8IHt9KVxuICAgICAgICB9KS50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldERhdGEoKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICByZXF1ZXN0KCcvdXNlcnMnKSxcbiAgICAgICAgICAgIC8vIHJlcXVlc3QoJy9xdWVzdHMnKVxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0RHJvcCgpIHtcbiAgICAgICAgY29uc3Qgb3BlbkRyb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmluZm9SdWxlc1wiKTtcbiAgICAgICAgbGV0IGRlc2tDbGFzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5Gb290ZXJfY29udGFpbmVyLS1CU1gnKTtcblxuICAgICAgICBvcGVuRHJvcC5mb3JFYWNoKG9wZW4gPT4ge1xuICAgICAgICAgICAgb3Blbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkZXRhaWxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkcm9wT3BlblwiKTtcbiAgICAgICAgICAgICAgICBkZXRhaWxzLm9wZW4gPSB0cnVlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcblxuICAgICAgICBpZiAoIWRlc2tDbGFzcykge1xuICAgICAgICAgICAgb3BlbkRyb3AuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LmFkZCgnYmxvY2tMaW5rJykpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBjb25zdCBJbml0UGFnZSA9ICgpID0+IHtcbiAgICAgICAgaW5pdERyb3AoKTtcbiAgICAgICAgcXVlc3RTdGFydEJ0bnMuZm9yRWFjaChxdWVzdFN0YXJ0QnRuID0+IHF1ZXN0U3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4geyByZWdpc3RlckluUXVlc3QoKTsgfSkpO1xuICAgICAgICB3ZWVrc1NlbGVjdG9yLmZvckVhY2goKHcsIGkpID0+IHcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgICAgICAgIGlmIChpID09PSBzZWxlY3RlZFdlZWtUYWJJZCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdlZWtzU2VsZWN0b3IuZm9yRWFjaChzID0+IHMuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xuICAgICAgICAgICAgdy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIHNlbGVjdGVkV2Vla1RhYklkID0gaTtcbiAgICAgICAgICAgIHJlZnJlc2hVc2VycyhzZWxlY3RlZFdlZWtUYWJJZCArIDEpO1xuICAgICAgICB9KSk7XG4gICAgICAgIHJlZnJlc2hVc2VycyhzZWxlY3RlZFdlZWtUYWJJZCArIDEpO1xuICAgICAgICBnZXREYXRhKCkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgdXNlcnMgPSByZXNbMF07XG4gICAgICAgICAgICBxdWVzdHMgPSAocmVzWzFdIHx8IFtdKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHF1ZXN0cyk7XG4gICAgICAgICAgICByZW5kZXJVc2Vycyh1c2Vycyk7XG4gICAgICAgICAgICAvLyByZWZyZXNoUXVlc3RzKHF1ZXN0cywgdXNlckluZm8pXG4gICAgICAgICAgICB0cmFuc2xhdGUoKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYWxjdWxhdGVSZWNlbnRQcm9tb1dlZWtzKCkge1xuICAgICAgICBjb25zdCBkYXRlID0gRGF0ZS5ub3coKTtcbiAgICAgICAgaWYgKGRhdGUgPCBuZXcgRGF0ZShcIjIwMjQtMTAtMDdUMjE6MDA6MDBaXCIpKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfSBlbHNlIGlmIChkYXRlIDwgbmV3IERhdGUoXCIyMDI0LTEwLTIxVDIxOjAwOjAwWlwiKSkge1xuICAgICAgICAgICAgcmV0dXJuIDI7XG4gICAgICAgIH0gZWxzZSBpZiAoZGF0ZSA8IG5ldyBEYXRlKFwiMjAyNC0xMC0yOFQyMTowMDowMFpcIikpIHtcbiAgICAgICAgICAgIHJldHVybiAzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIDQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWZyZXNoV2Vla1RhYnMoKSB7XG4gICAgICAgIHNlbGVjdGVkV2Vla1RhYklkID0gY2FsY3VsYXRlUmVjZW50UHJvbW9XZWVrcygpIC0gMTtcbiAgICAgICAgaWYgKCFzZWxlY3RlZFdlZWtUYWJJZCB8fCBzZWxlY3RlZFdlZWtUYWJJZCA9PT0gMCkgeyAvLyBwcm9tbyBub3Qgc3RhcnRlZCB5ZXRcbiAgICAgICAgICAgIHdlZWtzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB3ZWVrU2VsZWN0b3IgPSB3ZWVrc1NlbGVjdG9yW2ldO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkV2Vla1RhYklkIDwgaSkge1xuICAgICAgICAgICAgICAgIHdlZWtTZWxlY3Rvci5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB3ZWVrc1NlbGVjdG9yLmZvckVhY2goKHcsIGkpID0+IHtcbiAgICAgICAgICAgIHcuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICBpZiAoaSA9PT0gc2VsZWN0ZWRXZWVrVGFiSWQpIHtcbiAgICAgICAgICAgICAgICB3LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWZyZXNoVXNlcnMod2Vlaykge1xuICAgICAgICBnZXRVc2Vycyh3ZWVrKS50aGVuKHVzZXJzID0+IHtcbiAgICAgICAgICAgIHJlbmRlclVzZXJzKHVzZXJzKTtcbiAgICAgICAgICAgIHRyYW5zbGF0ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRVc2Vycyh3ZWVrKSB7XG4gICAgICAgIGNvbnN0IHVybCA9IHJlc29sdmVVc2Vyc1VybCh3ZWVrKTtcbiAgICAgICAgcmV0dXJuIHJlcXVlc3QodXJsKVxuICAgICAgICAgICAgLnRoZW4odXNlcnMgPT4gdXNlcnMubWFwKHVzZXJPcklkID0+IHR5cGVvZiB1c2VyT3JJZCA9PT0gJ251bWJlcicgPyB7dXNlcmlkOiB1c2VyT3JJZH0gOiB1c2VyT3JJZCkpO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZXNvbHZlVXNlcnNVcmwod2Vlaykge1xuICAgICAgICByZXR1cm4gd2VlayA/IGAvdXNlcnMvJHt3ZWVrfWAgOiAnL3VzZXJzJztcbiAgICB9XG5cblxuXG4gICAgLy9cbiAgICAvLyBmdW5jdGlvbiByZWZyZXNoUXVlc3RzKHF1ZXN0cywgY3VycmVudFVzZXIpIHtcbiAgICAvLyAgICAgaWYgKCFxdWVzdHMpIHtcbiAgICAvLyAgICAgICAgIHJldHVybjtcbiAgICAvLyAgICAgfVxuICAgIC8vXG4gICAgLy8gICAgIGNvbnN0IHNoaWZ0ID0gaXNTZWNvbmRXZWVrKHF1ZXN0cykgPyA0IDogMDtcbiAgICAvLyAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBxdWVzdERpdnMubGVuZ3RoOyBpKyspIHtcbiAgICAvLyAgICAgICAgIHJlbmRlclF1ZXN0KHF1ZXN0c1tpICsgc2hpZnRdLCBxdWVzdERpdnNbaV0sIGN1cnJlbnRVc2VyKTtcbiAgICAvLyAgICAgfVxuICAgIC8vIH1cbiAgICAvL1xuICAgIC8vIGZ1bmN0aW9uIGlzU2Vjb25kV2VlayhxdWVzdHMpIHtcbiAgICAvLyAgICAgY29uc3QgZm91cnRoUXVlc3QgPSBxdWVzdHNbM107XG4gICAgLy8gICAgIHJldHVybiBmb3VydGhRdWVzdCAmJiBjdXJyZW50RGF0ZSA+IG5ldyBEYXRlKGZvdXJ0aFF1ZXN0LmRhdGVFbmQpO1xuICAgIC8vIH1cblxuICAgIC8vIGZ1bmN0aW9uIHJlbmRlclF1ZXN0KHF1ZXN0LCBjb250YWluZXIsIGN1cnJlbnRVc2VyKSB7XG4gICAgLy8gICAgIGlmICghcXVlc3QgfHwgIWNvbnRhaW5lcikge1xuICAgIC8vICAgICAgICAgcmV0dXJuO1xuICAgIC8vICAgICB9XG4gICAgLy9cbiAgICAvLyAgICAgY29uc3QgcXVlc3ROdW0gPSBxdWVzdC5xTnVtYmVyO1xuICAgIC8vICAgICAvL2NvbnN0IHF1ZXN0UG9pbnRzID0ge3BvaW50czogMzAwfTtcbiAgICAvLyAgICAgY29uc3QgcXVlc3RQb2ludHMgPSBjdXJyZW50VXNlciAmJiBjdXJyZW50VXNlci5xdWVzdHMgJiYgY3VycmVudFVzZXIucXVlc3RzLmZpbmQocSA9PiBxLnF1ZXN0TnVtID09PSBxdWVzdE51bSk7XG4gICAgLy9cbiAgICAvLyAgICAgLy8gdXBkYXRlIHRyYW5zbGF0aW9uc1xuICAgIC8vICAgICBjb25zdCBxdWVzdFRpdGxlRGl2ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5yb3V0ZV9faXRlbS10aXRsZScpO1xuICAgIC8vICAgICBxdWVzdFRpdGxlRGl2LmlubmVySFRNTCA9IHRyYW5zbGF0ZUtleShgbmFtZVF1ZXN0LSR7cXVlc3ROdW19YCk7XG4gICAgLy8gICAgIGNvbnN0IHF1ZXN0U3ViVGl0bGVEaXYgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnJvdXRlX19pdGVtLXN1YnRpdGxlJyk7XG4gICAgLy8gICAgIHF1ZXN0U3ViVGl0bGVEaXYuaW5uZXJIVE1MID0gdHJhbnNsYXRlS2V5KGBxdWVzdC0ke3F1ZXN0TnVtfWApO1xuICAgIC8vXG4gICAgLy8gICAgIC8vIHVwZGF0ZSB0eXBlIG9mIHF1ZXN0XG4gICAgLy8gICAgIGNvbnN0IHF1ZXN0VHlwZSA9IGdldFF1ZXN0VHlwZShxdWVzdCk7XG4gICAgLy8gICAgIGNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdzb29uJyk7XG4gICAgLy9cbiAgICAvLyAgICAgaWYgKHF1ZXN0VHlwZSA9PT0gT0xEX1FVRVNUX1RZUEUpIHtcbiAgICAvLyAgICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdpbmFjdGl2ZScpO1xuICAgIC8vICAgICB9IGVsc2UgaWYgKHF1ZXN0VHlwZSA9PT0gRlVUVVJFX1FVRVNUX1RZUEUpIHtcbiAgICAvLyAgICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdzb29uJyk7XG4gICAgLy8gICAgIH0gZWxzZSB7XG4gICAgLy8gICAgICAgICBjb25zdCB0aW1lckVsZW1lbnQgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnRpbWVyVHh0Jyk7XG4gICAgLy8gICAgICAgICBjb25zdCBwb3B1cFRpbWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnF1ZXN0X190aW1lLW51bScpO1xuICAgIC8vICAgICAgICAgY291bnRkb3duVGltZXIocXVlc3QuZGF0ZUVuZCwgdGltZXJFbGVtZW50LCBwb3B1cFRpbWVyKTtcbiAgICAvLyAgICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKGBhY3RpdmVgKVxuICAgIC8vICAgICAgICAgdXBkYXRlUG9wdXAocXVlc3QsIHF1ZXN0UG9pbnRzKTtcbiAgICAvLyAgICAgfVxuICAgIC8vXG4gICAgLy8gICAgIC8vIHVwZGF0ZSBzdGFyc1xuICAgIC8vICAgICBpZiAocXVlc3RQb2ludHMpIHtcbiAgICAvLyAgICAgICAgIGNvbnN0IHN0YXJEaXZzID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5zdGFyJyk7XG4gICAgLy8gICAgICAgICBjb25zdCBxdWVzdExldmVsID0gZ2V0UXVlc3RMZXZlbChxdWVzdCwgcXVlc3RQb2ludHMucG9pbnRzIHx8IDApO1xuICAgIC8vICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBxdWVzdExldmVsOyBpKyspIHtcbiAgICAvLyAgICAgICAgICAgICBjb25zdCBzdGFyID0gc3RhckRpdnNbaV07XG4gICAgLy8gICAgICAgICAgICAgc3Rhci5jbGFzc0xpc3QuYWRkKCdfZG9uZScpO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9XG4gICAgLy9cbiAgICAvLyAgICAgLy8gdXBkYXRlcyBpbWFnZXNcbiAgICAvLyAgICAgY29uc3Qgc3JjRGVzYyA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuc3JjX19kZXNjJyk7XG4gICAgLy8gICAgIGNvbnN0IHNyY01vYiA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuc3JjX19tb2InKTtcbiAgICAvLyAgICAgY29uc3Qgc3JjRGVmYXVsdCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuc3JjX19kZWZhdWx0Jyk7XG4gICAgLy8gICAgIHNyY0Rlc2Muc3Jjc2V0ID0gYGh0dHBzOi8vZmF2LXByb20uY29tL2h0bWwvbnktdWEvaW1nL3JvdXRlL3F1ZXN0JHtxdWVzdE51bX0taW1nLWRlc2MucG5nYDtcbiAgICAvLyAgICAgc3JjTW9iLnNyY3NldCA9IGBodHRwczovL2Zhdi1wcm9tLmNvbS9odG1sL255LXVhL2ltZy9yb3V0ZS9xdWVzdCR7cXVlc3ROdW19LWltZy1tb2IucG5nYDtcbiAgICAvLyAgICAgc3JjRGVmYXVsdC5zcmMgPSBgaHR0cHM6Ly9mYXYtcHJvbS5jb20vaHRtbC9ueS11YS9pbWcvcm91dGUvcXVlc3Qke3F1ZXN0TnVtfS1pbWctZGVzYy5wbmdgO1xuICAgIC8vXG4gICAgLy8gICAgIC8vIHVwZGF0ZSBidXR0b25zXG4gICAgLy8gICAgIGlmIChxdWVzdFR5cGUgPT0gQUNUSVZFX1FVRVNUX1RZUEUgJiYgdXNlcklkICYmICFxdWVzdFBvaW50cykge1xuICAgIC8vICAgICAgICAgcGxheUJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgLy8gICAgICAgICBwb3B1cFBsYXlCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIC8vICAgICAgICAgLy8gY29uc29sZS5sb2coJ3JlbW92aW5nIHF1ZXN0IGhpZGUgJyArIGN1cnJlbnRVc2VyKVxuICAgIC8vICAgICAgICAgcXVlc3RTdGFydEJ0bnMuZm9yRWFjaChxdWVzdFN0YXJ0QnRuID0+IHF1ZXN0U3RhcnRCdG4uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpKTtcbiAgICAvLyAgICAgfVxuICAgIC8vIH1cblxuICAgIC8vIGZ1bmN0aW9uIHVwZGF0ZVBvcHVwKHF1ZXN0LCBxdWVzdFBvaW50cykge1xuICAgIC8vICAgICBjb25zdCBxdWVzdE51bSA9IHF1ZXN0LnFOdW1iZXI7XG4gICAgLy8gICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnF1ZXN0X19kZXMtdGl0bGUnKTtcbiAgICAvLyAgICAgdGl0bGUuaW5uZXJIVE1MID0gdHJhbnNsYXRlS2V5KGBxdWVzdC0ke3F1ZXN0TnVtfWApO1xuICAgIC8vICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5xdWVzdF9fZGVzLXRleHQnKTtcbiAgICAvLyAgICAgZGVzY3JpcHRpb24uaW5uZXJIVE1MID0gdHJhbnNsYXRlS2V5KGBkZXNjclF1ZXN0LSR7cXVlc3ROdW19YCk7XG4gICAgLy8gICAgIGNvbnN0IHF1ZXN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5xdWVzdF9fdGl0bGUnKTtcbiAgICAvLyAgICAgcXVlc3ROYW1lLmlubmVySFRNTCA9IHRyYW5zbGF0ZUtleShgbmFtZVF1ZXN0LSR7cXVlc3ROdW19YCk7XG4gICAgLy9cbiAgICAvLyAgICAgY29uc3QgY3NzQ2xhc3MgPSBxdWVzdE51bSAlIDIgPT0gMCA/ICdzcG9ydCcgOiAnY2FzaW5vJztcbiAgICAvLyAgICAgcXVlc3RQb3B1cC5jbGFzc0xpc3QuYWRkKGNzc0NsYXNzKTtcbiAgICAvLyAgICAgcXVlc3RQb3B1cC5jbGFzc0xpc3QuYWRkKGBxdWVzdC1wb3B1cCR7cXVlc3ROdW19YCk7XG4gICAgLy9cbiAgICAvLyAgICAgY29uc3QgdXNlclBvaW50c0ZvclF1ZXN0ID0gcXVlc3RQb2ludHMgPyBxdWVzdFBvaW50cy5wb2ludHMgOiAwO1xuICAgIC8vICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHF1ZXN0TGV2ZWxEaXZzLmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gICAgICAgICBjb25zdCBsZXZlbERpdiA9IHF1ZXN0TGV2ZWxEaXZzW2ldO1xuICAgIC8vICAgICAgICAgY29uc3QgbGV2ZWxJbmZvID0gcXVlc3QubGV2ZWxzW2ldO1xuICAgIC8vICAgICAgICAgaWYgKGxldmVsRGl2ICYmIGxldmVsSW5mbykge1xuICAgIC8vICAgICAgICAgICAgIGNvbnN0IHN1YnRpdGxlID0gbGV2ZWxEaXYucXVlcnlTZWxlY3RvcignLnF1ZXN0X19pdGVtLXN1YnRpdGxlJyk7XG4gICAgLy8gICAgICAgICAgICAgc3VidGl0bGUuaW5uZXJIVE1MID0gdHJhbnNsYXRlS2V5KGBwcml6ZVF1ZXN0LSR7cXVlc3ROdW19XyR7aSArIDF9YCk7XG4gICAgLy8gICAgICAgICAgICAgY29uc3QgaW5mb1RleHQgPSBsZXZlbERpdi5xdWVyeVNlbGVjdG9yKCcucXVlc3RfX2l0ZW0taW5mby10ZXh0Jyk7XG4gICAgLy8gICAgICAgICAgICAgaW5mb1RleHQuaW5uZXJIVE1MID0gdHJhbnNsYXRlS2V5KGBzdGVwUXVlc3QtJHtxdWVzdE51bX1fJHtpICsgMX1gKTtcbiAgICAvL1xuICAgIC8vICAgICAgICAgICAgIC8vIHByb2dyZXNzIGJhclxuICAgIC8vICAgICAgICAgICAgIGNvbnN0IGxldmVsU3RhcnRQb2ludHMgPSBpID09PSAwID8gMCA6IHF1ZXN0LmxldmVsc1tpIC0gMV0ucG9pbnRzO1xuICAgIC8vICAgICAgICAgICAgIGNvbnN0IGxldmVsRW5kUG9pbnRzID0gbGV2ZWxJbmZvLnBvaW50cztcbiAgICAvLyAgICAgICAgICAgICBjb25zdCBsZXZlbFBvaW50cyA9IGxldmVsRW5kUG9pbnRzO1xuICAgIC8vICAgICAgICAgICAgIGNvbnN0IHByb2dyZXNzUG9pbnRzICA9IE1hdGgubWluKE1hdGgubWF4KHVzZXJQb2ludHNGb3JRdWVzdCwgMCksIGxldmVsUG9pbnRzKTtcbiAgICAvLyAgICAgICAgICAgICBjb25zdCBwcm9ncmVzc1ZhbHVlID0gcHJvZ3Jlc3NQb2ludHMgLyBsZXZlbFBvaW50cyAqIDEwMDtcbiAgICAvLyAgICAgICAgICAgICBjb25zdCBub3JtYWxpemVkID0gTWF0aC5taW4oTWF0aC5tYXgoTWF0aC5mbG9vcihwcm9ncmVzc1ZhbHVlKSwgMCksIDEwMCk7XG4gICAgLy8gICAgICAgICAgICAgY29uc3QgcHJvZ3Jlc3NFbGVtZW50ID0gbGV2ZWxEaXYucXVlcnlTZWxlY3RvcignLnF1ZXN0X19pdGVtLWluZm8tcHJvZ3Jlc3MnKTtcbiAgICAvLyAgICAgICAgICAgICBwcm9ncmVzc0VsZW1lbnQudmFsdWUgPSBub3JtYWxpemVkO1xuICAgIC8vICAgICAgICAgICAgIHByb2dyZXNzRWxlbWVudC5kYXRhc2V0LnByb2dyZXNzID0gYCR7bm9ybWFsaXplZH0lYDtcbiAgICAvLyAgICAgICAgICAgICBjb25zdCBzdGF0dXNEaXYgPSBsZXZlbERpdi5xdWVyeVNlbGVjdG9yKCcuc3RhdHVzJyk7XG4gICAgLy8gICAgICAgICAgICAgc3RhdHVzRGl2LmlubmVySFRNTCA9IGAke3Byb2dyZXNzUG9pbnRzfS8ke2xldmVsUG9pbnRzfWA7XG4gICAgLy8gICAgICAgICAgICAgaWYgKHVzZXJQb2ludHNGb3JRdWVzdCA8IGxldmVsU3RhcnRQb2ludHMgfHwgIXVzZXJJZCkge1xuICAgIC8vICAgICAgICAgICAgICAgICBjb25zdCBwbGF5QnRuID0gbGV2ZWxEaXYucXVlcnlTZWxlY3RvcignLnRvb2stcGFydCcpO1xuICAgIC8vICAgICAgICAgICAgICAgICBwbGF5QnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAvLyAgICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgcmVmcmVzaFByb2dyZXNzKCk7XG4gICAgLy8gfVxuICAgIC8vXG4gICAgLy8gZnVuY3Rpb24gY291bnRkb3duVGltZXIodGFyZ2V0RGF0ZVN0cmluZywgdGltZXJFbGVtZW50LCBwb3B1cFRpbWVyKSB7XG4gICAgLy8gICAgIHJlZnJlc2hUaW1lcih0YXJnZXREYXRlU3RyaW5nLCB0aW1lckVsZW1lbnQsIHBvcHVwVGltZXIpO1xuICAgIC8vICAgICBjb25zdCBpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgIC8vICAgICAgICAgY29uc3QgdGltZURpZmYgPSByZWZyZXNoVGltZXIodGFyZ2V0RGF0ZVN0cmluZywgdGltZXJFbGVtZW50LCBwb3B1cFRpbWVyKTtcbiAgICAvLyAgICAgICAgIGlmICh0aW1lRGlmZiA8IDApIHtcbiAgICAvLyAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsSWQpO1xuICAgIC8vICAgICAgICAgICAgIHRpbWVyRWxlbWVudC5pbm5lckhUTUwgPSBmb3JtYXRUaW1lKCdmaW5pc2hlZFRpbWVyJywgMCwgMCwgMCk7XG4gICAgLy8gICAgICAgICAgICAgcG9wdXBUaW1lci5pbm5lckhUTUwgPSBmb3JtYXRUaW1lKCd0aW1lcicsIDAsIDAsIDApO1xuICAgIC8vICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9LCAxMDAwMCk7XG4gICAgLy8gfVxuICAgIC8vXG4gICAgLy8gZnVuY3Rpb24gZm9ybWF0VGltZShrZXksIGRheXMsIGhvdXJzLCBtaW51dGVzKSB7XG4gICAgLy8gICAgIHJldHVybiB0cmFuc2xhdGVLZXkoa2V5KS5yZXBsYWNlKFwie2RheX1cIiwgZGF5cy50b1N0cmluZygpKVxuICAgIC8vICAgICAgICAgLnJlcGxhY2UoXCJ7aG91cn1cIiwgaG91cnMudG9TdHJpbmcoKSlcbiAgICAvLyAgICAgICAgIC5yZXBsYWNlKFwie21pbnV0ZXN9XCIsIG1pbnV0ZXMudG9TdHJpbmcoKSk7XG4gICAgLy8gfVxuICAgIC8vXG4gICAgLy8gZnVuY3Rpb24gcmVmcmVzaFRpbWVyKHRhcmdldERhdGVTdHJpbmcsIHRpbWVyRWxlbWVudCwgcG9wdXBUaW1lcikge1xuICAgIC8vICAgICBjb25zdCB0YXJnZXREYXRlID0gbmV3IERhdGUodGFyZ2V0RGF0ZVN0cmluZyk7XG4gICAgLy8gICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgLy8gICAgIGNvbnN0IHRpbWVEaWZmID0gdGFyZ2V0RGF0ZS5nZXRUaW1lKCkgLSBub3cuZ2V0VGltZSgpO1xuICAgIC8vXG4gICAgLy8gICAgIGNvbnN0IGRheXMgPSBNYXRoLmZsb29yKHRpbWVEaWZmIC8gKDEwMDAgKiA2MCAqIDYwICogMjQpKTtcbiAgICAvLyAgICAgY29uc3QgaG91cnMgPSBNYXRoLmZsb29yKCh0aW1lRGlmZiAlICgxMDAwICogNjAgKiA2MCAqIDI0KSkgLyAoMTAwMCAqIDYwICogNjApKTtcbiAgICAvLyAgICAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3IoKHRpbWVEaWZmICUgKDEwMDAgKiA2MCAqIDYwKSkgLyAoMTAwMCAqIDYwKSk7XG4gICAgLy9cbiAgICAvL1xuICAgIC8vICAgICB0aW1lckVsZW1lbnQuaW5uZXJIVE1MID0gZm9ybWF0VGltZSgnZmluaXNoZWRUaW1lcicsIGRheXMsIGhvdXJzLCBtaW51dGVzKTtcbiAgICAvLyAgICAgcG9wdXBUaW1lci5pbm5lckhUTUwgPSBmb3JtYXRUaW1lKCd0aW1lcicsIGRheXMsIGhvdXJzLCBtaW51dGVzKTtcbiAgICAvLyAgICAgcmV0dXJuIHRpbWVEaWZmO1xuICAgIC8vIH1cbiAgICAvL1xuICAgIC8vIGZ1bmN0aW9uIGdldFF1ZXN0TGV2ZWwocXVlc3REZWZpbml0aW9uLCBwb2ludHMpIHtcbiAgICAvLyAgICAgaWYgKCFxdWVzdERlZmluaXRpb24gfHwgIXF1ZXN0RGVmaW5pdGlvbi5sZXZlbHMgfHwgcXVlc3REZWZpbml0aW9uLmxldmVscy5sZW5ndGggPT09IDApIHtcbiAgICAvLyAgICAgICAgIHJldHVybiAwO1xuICAgIC8vICAgICB9XG4gICAgLy9cbiAgICAvLyAgICAgY29uc3QgbGV2ZWxJbmRleCA9IHF1ZXN0RGVmaW5pdGlvbi5sZXZlbHMuZmluZEluZGV4KGxldmVsID0+IHBvaW50cyA8IGxldmVsLnBvaW50cyk7XG4gICAgLy8gICAgIHJldHVybiBsZXZlbEluZGV4ID09PSAtMSA/IHF1ZXN0RGVmaW5pdGlvbi5sZXZlbHMubGVuZ3RoIDogbGV2ZWxJbmRleDtcbiAgICAvLyB9XG5cblxuICAgIC8vIGZ1bmN0aW9uIGdldFF1ZXN0VHlwZShxdWVzdCkge1xuICAgIC8vICAgICBjb25zdCBzdGFydERhdGUgPSBuZXcgRGF0ZShxdWVzdC5kYXRlU3RhcnQpO1xuICAgIC8vICAgICBjb25zdCBlbmREYXRlID0gbmV3IERhdGUocXVlc3QuZGF0ZUVuZCk7XG4gICAgLy8gICAgIGlmIChjdXJyZW50RGF0ZSA8IHN0YXJ0RGF0ZSkge1xuICAgIC8vICAgICAgICAgcmV0dXJuIEZVVFVSRV9RVUVTVF9UWVBFO1xuICAgIC8vICAgICB9IGVsc2UgaWYgKGN1cnJlbnREYXRlID4gZW5kRGF0ZSkge1xuICAgIC8vICAgICAgICAgcmV0dXJuIE9MRF9RVUVTVF9UWVBFO1xuICAgIC8vICAgICB9IGVsc2Uge1xuICAgIC8vICAgICAgICAgcmV0dXJuIEFDVElWRV9RVUVTVF9UWVBFO1xuICAgIC8vICAgICB9XG4gICAgLy8gfVxuXG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5zdG9yZSkge1xuICAgICAgICAgICAgdmFyIHN0YXRlID0gd2luZG93LnN0b3JlLmdldFN0YXRlKCk7XG4gICAgICAgICAgICB1c2VySWQgPSBzdGF0ZS5hdXRoLmlzQXV0aG9yaXplZCAmJiBzdGF0ZS5hdXRoLmlkIHx8ICcnO1xuICAgICAgICAgICAgc2V0dXBQYWdlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXR1cFBhZ2UoKTtcbiAgICAgICAgICAgIGxldCBjID0gMDtcbiAgICAgICAgICAgIHZhciBpID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChjIDwgNTApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEhd2luZG93LmdfdXNlcl9pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcklkID0gd2luZG93LmdfdXNlcl9pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldHVwUGFnZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tVc2VyQXV0aCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMjAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNoZWNrVXNlckF1dGgoKTtcblxuICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMuZm9yRWFjaCgoYXV0aEJ0biwgaSkgPT4ge1xuICAgICAgICAgICAgYXV0aEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHBhcnRpY2lwYXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0dXBQYWdlKCkge1xuICAgICAgICBpZiAodXNlcklkICYmIHVybFBhcmFtcy5oYXMocGFydGljaXBhdGVQYXJhbSkpIHtcbiAgICAgICAgICAgIHBhcnRpY2lwYXRlKHRydWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgSW5pdFBhZ2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnRpY2lwYXRlKGZhc3RSZWcpIHtcbiAgICAgICAgaWYgKCF1c2VySWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHt1c2VyaWQ6IHVzZXJJZH07XG5cbiAgICAgICAgcmVxdWVzdCgnL3VzZXInLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBhcmFtcylcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgcGFydGljaXBhdGVCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKSk7XG4gICAgICAgICAgICByZWRpcmVjdEJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpKTtcbiAgICAgICAgICAgIEluaXRQYWdlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZ2lzdGVySW5RdWVzdCgpIHtcbiAgICAgICAgaWYgKCF1c2VySWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHt1c2VyaWQ6IHVzZXJJZH07XG5cbiAgICAgICAgcmVxdWVzdCgnL3F1ZXN0cmVnJywge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXJhbXMpXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIHBsYXlCdG4uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgICAgcG9wdXBQbGF5QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgICAgIHF1ZXN0U3RhcnRCdG5zLmZvckVhY2gocXVlc3RTdGFydEJ0biA9PiBxdWVzdFN0YXJ0QnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHJlbmRlclVzZXJzID0gKHVzZXJzKSA9PiB7XG4gICAgICAgIHJlc3VsdHNUYWJsZVdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICByZXN1bHRzVGFibGVPdGhlci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG5cbiAgICAgICAgaWYgKHVzZXJzICYmIHVzZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IHRvcFVzZXJzID0gdXNlcnMuc2xpY2UoMCwgMTApO1xuICAgICAgICAgICAgcG9wdWxhdGVVc2Vyc1RhYmxlKHRvcFVzZXJzLCB1c2VySWQsIHRvcFJlc3VsdHNUYWJsZSwgdXNlcnMpO1xuXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VXNlciA9IHVzZXJJZCAmJiB1c2Vycy5maW5kKHVzZXIgPT4gdXNlci51c2VyaWQgPT09IHVzZXJJZCk7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VXNlckluZGV4ID0gY3VycmVudFVzZXIgJiYgdXNlcnMuaW5kZXhPZihjdXJyZW50VXNlcik7XG5cbiAgICAgICAgICAgIGxldCBvdGhlclVzZXJzO1xuXG4gICAgICAgICAgICBpZiAoIWN1cnJlbnRVc2VySW5kZXggfHwgY3VycmVudFVzZXJJbmRleCA8IDEwKSB7XG4gICAgICAgICAgICAgICAgb3RoZXJVc2VycyA9IHVzZXJzLnNsaWNlKDEwLCAxMyk7XG4gICAgICAgICAgICB9ICBlbHNlIHtcbiAgICAgICAgICAgICAgICBvdGhlclVzZXJzID0gdXNlcnMuc2xpY2UoTWF0aC5tYXgoY3VycmVudFVzZXJJbmRleCAtIDEsIDEwKSwgY3VycmVudFVzZXJJbmRleCArIDIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob3RoZXJVc2VycyAmJiBvdGhlclVzZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHBvcHVsYXRlVXNlcnNUYWJsZShvdGhlclVzZXJzLCB1c2VySWQsIHJlc3VsdHNUYWJsZU90aGVyLCB1c2Vycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdFRleHQodGV4dCkge1xuICAgICAgICByZXR1cm4gdGV4dC5zcGxpdCgnKCcpWzBdXG4gICAgfVxuXG5cblxuICAgIGZ1bmN0aW9uIHBvcHVsYXRlVXNlcnNUYWJsZSh1c2VycywgY3VycmVudFVzZXJJZCwgdGFibGUsIGFsbFVzZXJzKSB7XG4gICAgICAgIHRhYmxlLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBpZiAodXNlcnMgJiYgdXNlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICB1c2Vycy5mb3JFYWNoKCh1c2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2hlY2tDdXJyZW50VXNlciA9IGN1cnJlbnRVc2VySWQgJiYgY3VycmVudFVzZXJJZCA9PT0gdXNlci51c2VyaWQ7XG4gICAgICAgICAgICAgICAgY29uc3QgYWRkaXRpb25hbFVzZXJSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5jbGFzc0xpc3QuYWRkKCd0YWJsZVJlc3VsdHNfX3JvdycpO1xuICAgICAgICAgICAgICAgIGlmIChjaGVja0N1cnJlbnRVc2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmNsYXNzTGlzdC5hZGQoJ195b3VyUGxhY2UnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcGxhY2UgPSBhbGxVc2Vycy5pbmRleE9mKHVzZXIpICsgMTtcbiAgICAgICAgICAgICAgICBjb25zdCBwcml6ZVBsYWNlQ3NzID0gUFJJWkVTX0NTU1twbGFjZSAtIDFdO1xuICAgICAgICAgICAgICAgIGlmIChwcml6ZVBsYWNlQ3NzKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmNsYXNzTGlzdC5hZGQocHJpemVQbGFjZUNzcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHByaXplS2V5ID0gZ2V0UHJpemVUcmFuc2xhdGlvbktleSh1c2VyLnBvaW50cylcbiAgICAgICAgICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19ib2R5LWNvbFwiICR7Y2hlY2tDdXJyZW50VXNlcn0+JHtwbGFjZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZVJlc3VsdHNfX2JvZHktY29sXCI+JHtjaGVja0N1cnJlbnRVc2VyID8gdXNlci51c2VyaWQgOiBtYXNrVXNlcklkKHVzZXIudXNlcmlkKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZVJlc3VsdHNfX2JvZHktY29sXCI+JHtNYXRoLmZsb29yKHVzZXIucG9pbnRzKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZVJlc3VsdHNfX2JvZHktY29sXCI+JHtwcml6ZUtleSA/IGZvcm1hdFRleHQodHJhbnNsYXRlS2V5KHByaXplS2V5KSkgOiAnIC0gJ308L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgYDtcbiAgICAgICAgICAgICAgICB0YWJsZS5hcHBlbmQoYWRkaXRpb25hbFVzZXJSb3cpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0UHJpemVUcmFuc2xhdGlvbktleShwb2ludHMpIHtcbiAgICAgICAgaWYgKHBvaW50cyA+PSAxMDAwMCkge1xuICAgICAgICAgICAgcmV0dXJuICdwcml6ZV8xJztcbiAgICAgICAgfSBlbHNlIGlmIChwb2ludHMgPj0gNTAwMCAmJiBwb2ludHMgPD0gOTk5OSkge1xuICAgICAgICAgICAgcmV0dXJuICdwcml6ZV8yJztcbiAgICAgICAgfSBlbHNlIGlmIChwb2ludHMgPj0gMTUwMCAmJiBwb2ludHMgPD0gNDk5OSkge1xuICAgICAgICAgICAgcmV0dXJuICdwcml6ZV8zJztcbiAgICAgICAgfSBlbHNlIGlmIChwb2ludHMgPj0gNTAwICYmIHBvaW50cyA8PSAxNDk5KSB7XG4gICAgICAgICAgICByZXR1cm4gJ3ByaXplXzQnO1xuICAgICAgICB9ZWxzZSBpZiAocG9pbnRzID49IDE1MCAmJiBwb2ludHMgPD0gNDk5KSB7XG4gICAgICAgICAgICByZXR1cm4gJ3ByaXplXzUnO1xuICAgICAgICB9IGVsc2UgaWYgKHBvaW50cyA+PSA1MCAmJiBwb2ludHMgPD0gMTQ5KSB7XG4gICAgICAgICAgICByZXR1cm4gJ3ByaXplXzYnO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVLZXkoa2V5KSB7XG4gICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGkxOG5EYXRhW2tleV0gfHwgJyotLS0tTkVFRCBUTyBCRSBUUkFOU0xBVEVELS0tLSogICBrZXk6ICAnICsga2V5O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1hc2tVc2VySWQodXNlcklkKSB7XG4gICAgICAgIHJldHVybiBcIioqKipcIiArIHVzZXJJZC50b1N0cmluZygpLnNsaWNlKDQpO1xuICAgIH1cblxuICAgIGxldCBjaGVja1VzZXJBdXRoID0gKCkgPT4ge1xuICAgICAgICBpZiAodXNlcklkKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHVuYXV0aE1lcyBvZiB1bmF1dGhNc2dzKSB7XG4gICAgICAgICAgICAgICAgdW5hdXRoTWVzLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcXVlc3QoYC9mYXZ1c2VyLyR7dXNlcklkfWApXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMudXNlcmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LmFkZCgnaGlkZScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWN0QnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3RTdGFydEJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LmFkZCgnaGlkZScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJbmZvID0gcmVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVmcmVzaFF1ZXN0cyhxdWVzdHMsIHVzZXJJbmZvKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYXRlQnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJykpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IHBhcnRpY2lwYXRlQnRuIG9mIHBhcnRpY2lwYXRlQnRucykge1xuICAgICAgICAgICAgICAgIHBhcnRpY2lwYXRlQnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3QgdW5hdXRoTWVzIG9mIHVuYXV0aE1zZ3MpIHtcbiAgICAgICAgICAgICAgICB1bmF1dGhNZXMuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbG9hZFRyYW5zbGF0aW9ucygpXG4gICAgICAgIC50aGVuKGluaXQpO1xuXG4gICAgbGV0IG1haW5QYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZhdl9fcGFnZScpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gbWFpblBhZ2UuY2xhc3NMaXN0LmFkZCgnb3ZlcmZsb3cnKSwgMTAwMCk7XG5cblxuICAgIC8vc2hvdyBwb3B1cGNoaWtcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAgIGNvbnN0IHBvcHVwV3JhcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cCcpO1xuICAgIGNvbnN0IGJ0blRhYmxlU2hvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXN1bHRfX3N1YnRleHQnKTtcbiAgICBjb25zdCB0YWJsZVBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByaXplLWZ1bmQnKTtcbiAgICBjb25zdCB0YWJsZVBvcHVwQnRuQ2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJpemUtZnVuZC1jbG9zZScpO1xuXG5cbiAgICBidG5UYWJsZVNob3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PntcbiAgICAgICAgcG9wdXBXcmFwLmNsYXNzTGlzdC5yZW1vdmUoJ19oaWRkZW4nKTtcbiAgICAgICAgYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nXG4gICAgICAgIHRhYmxlUG9wdXAuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfSlcblxuICAgIHRhYmxlUG9wdXBCdG5DbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgcG9wdXBXcmFwLmNsYXNzTGlzdC5hZGQoJ19oaWRkZW4nKTtcbiAgICAgICAgYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdhdXRvJ1xuICAgICAgICB0YWJsZVBvcHVwLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfSlcblxuXG4gICAgLy9zaG93IHJ1bGVzLSBkZXRhaWxzXG4gICAgY29uc3QgcnVsZXNJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ydWxlc19faXRlbScpXG4gICAgcnVsZXNJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QudG9nZ2xlKCdfb3BlbicpXG4gICAgICAgIH0pXG4gICAgfSlcblxuICAgIC8vIGZvciB0ZXN0XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXJrLWJ0blwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZShcImRhcmtcIilcbiAgICB9KVxuXG4gICAgbGV0IHdlZWsgPSAxXG5cbiAgICBjb25zdCBnYW1lV3JhcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZV9faG91c2VcIiksXG4gICAgICAgICAgd2Vla0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2Vlay1idG5cIik7XG5cbiAgICB3ZWVrQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgaWYod2VlayA+PSA0KSB7XG4gICAgICAgICAgICBnYW1lV3JhcC5jbGFzc0xpc3QucmVtb3ZlKGB3ZWVrJHt3ZWVrfWApXG4gICAgICAgICAgICB3ZWVrID0gMVxuICAgICAgICAgICAgZ2FtZVdyYXAuY2xhc3NMaXN0LmFkZChgd2VlayR7d2Vla31gKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgZ2FtZVdyYXAuY2xhc3NMaXN0LnJlbW92ZShgd2VlayR7d2Vla31gKVxuICAgICAgICB3ZWVrKytcbiAgICAgICAgZ2FtZVdyYXAuY2xhc3NMaXN0LmFkZChgd2VlayR7d2Vla31gKVxuICAgIH0pXG5cblxufSkoKTtcbiIsIiJdfQ==
