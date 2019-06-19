// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"script.js":[function(require,module,exports) {
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var collectionCategories = new webix.DataCollection({
  url: "extra-js/categories.js"
});
var collectionUsers = new webix.DataCollection({
  url: "data/users.js"
});
var countries = new webix.DataCollection({
  url: "extra-js/countries.js"
});
webix.ready(function () {
  var _ref, _ProductsView;

  var topbar = {
    view: "toolbar",
    css: "webix_dark",
    elements: [{
      view: "label",
      label: "My App",
      css: "top_label"
    }, {}, {
      view: "button",
      id: "butHed",
      label: "Profile",
      css: "webix_transparent",
      type: "icon",
      icon: "wxi-user",
      width: 150,
      click: function click() {
        winPopup.show(this.$view);
      }
    }]
  };
  var side = {
    rows: [{
      view: "list",
      id: "mylist",
      width: 200,
      select: true,
      scroll: false,
      css: "list_bgc",
      on: {
        onAfterSelect: function onAfterSelect(id) {
          $$(id).show();
        }
      },
      data: ["Dashboard", "Users", "Products", "Admin"] // webix creates id for names automatically

    }, {
      template: "<div><span class='webix_icon wxi-check'></span>Connected</div>",
      css: "greenbutton",
      autoheight: true
    }]
  };
  var winPopup = webix.ui({
    view: "popup",
    body: {
      view: "list",
      template: "#title#",
      select: true,
      autoheight: true,
      autowidth: true,
      data: [{
        id: 1,
        title: "Settings"
      }, {
        id: 2,
        title: "Log Out"
      }]
    }
  });
  var dataTable = {
    gravity: 3,
    rows: [{
      view: "tabbar",
      id: "myTabbar",
      inputWidth: 600,
      options: [{
        id: 1,
        value: "All"
      }, {
        id: 2,
        value: "Old"
      }, {
        id: 3,
        value: "Modern"
      }, {
        id: 4,
        value: "New"
      }],
      on: {
        onChange: function onChange() {
          $$("tableInfo").filterByAll();
        }
      }
    }, {
      view: "datatable",
      id: "tableInfo",
      select: true,
      leftSplit: 1,
      scrollX: true,
      hover: "myhover",
      columns: [{
        id: "rank",
        header: "#",
        css: "rank",
        sort: "int",
        width: 50
      }, {
        id: "title",
        header: ["Film title", {
          content: "textFilter"
        }],
        sort: "string",
        fillspace: true,
        width: 300
      }, {
        id: "category",
        header: ["Category", {
          content: "selectFilter"
        }],
        editor: "richselect",
        sort: "string",
        options: collectionCategories
      }, {
        id: "rating",
        header: ["Rating", {
          content: "textFilter"
        }],
        sort: "int"
      }, {
        id: "votes",
        header: ["Votes", {
          content: "textFilter"
        }],
        sort: "int"
      }, {
        id: "year",
        header: "Year"
      }, {
        template: "{common.trashIcon()}",
        width: 80
      }],
      onClick: {
        "wxi-trash": function wxiTrash(e, id) {
          webix.confirm({
            title: "Delete",
            text: "Do you really want to delete this Data?",
            callback: function callback(result) {
              if (result) {
                $$("tableInfo").remove(id);
              }
            }
          });
          return false;
        }
      },
      scheme: {
        $init: function $init(obj) {
          obj.category = Math.floor(Math.random() * 4 + 1);
          obj.votes = obj.votes.replace(",", ".");
          obj.rating = obj.rating.replace(",", ".");
        }
      },
      //data: window.testData
      url: "data/data.js"
    }]
  };
  var myFormRight = {
    view: "form",
    id: "myform",
    elementsConfig: {
      bottomPadding: 30
    },
    elements: [{
      rows: [{
        type: "section",
        template: "Edit films"
      }, {
        view: "text",
        label: "Film Title",
        name: "title",
        invalidMessage: "Enter movie title"
      }, {
        view: "text",
        label: "Year",
        name: "year",
        invalidMessage: "Enter the year"
      }, {
        view: "richselect",
        label: "Category",
        name: "category",
        options: collectionCategories
      }, {
        view: "text",
        label: "Rating",
        name: "rating",
        invalidMessage: "rating should not be zero"
      }, {
        view: "text",
        label: "Votes",
        name: "votes",
        invalidMessage: "votes must be more than 10,000"
      }, {
        cols: [{
          view: "button",
          value: "Save",
          css: "webix_primary",
          align: "left",
          click: function click() {
            $$("myform").save();
          }
        }, {
          view: "button",
          value: "Clear",
          click: function click() {
            webix.confirm({
              title: "",
              text: "Clear this form?"
            }).then(function () {
              $$("myform").clear();
              $$("myform").clearValidation();
              $$("tableInfo").unselectAll();
            });
          }
        }]
      }]
    }, {}],
    rules: {
      title: webix.rules.isNotEmpty,
      year: function year(value) {
        return value <= new Date().getFullYear();
      },
      votes: webix.rules.isNotEmpty,
      rating: function rating(value) {
        return value != 0;
      }
    }
  };
  webix.protoUI({
    name: "editlist"
  }, webix.EditAbility, webix.ui.list);
  var usersList = {
    rows: [{
      height: 45,
      view: "toolbar",
      elements: [{
        view: "text",
        id: "listInput",
        gravity: 3,
        on: {
          // filtering
          onTimedKeyPress: function onTimedKeyPress() {
            var value = $$("listInput").getValue().toLowerCase();
            $$("myUsersList").filter(function (obj) {
              return obj.name.toLowerCase().indexOf(value) !== -1;
            });
          }
        }
      }, {
        view: "button",
        value: "Sort asc",
        width: 100,
        type: "form",
        click: function click() {
          collectionUsers.sort("name", "asc");
        }
      }, {
        view: "button",
        value: "Sort desc",
        width: 100,
        type: "form",
        click: function click() {
          collectionUsers.sort("name", "desc");
        }
      }, {
        view: "button",
        value: "Add new",
        width: 100,
        type: "form",
        click: function click() {
          addNewUser();
        }
      }]
    }, (_ref = {
      view: "editlist",
      id: "myUsersList",
      template: "#name#, #age#, from #country# <span class='webix_icon mdi mdi-close remove-icon' title='Remove'>x</span>",
      select: true,
      scroll: true,
      data: collectionUsers,
      editable: true,
      editValue: "title",
      editaction: "dblclick",
      editor: "text"
    }, _defineProperty(_ref, "editValue", "name"), _defineProperty(_ref, "rules", {
      "name": webix.rules.isNotEmpty
    }), _defineProperty(_ref, "onClick", {
      "remove-icon": function removeIcon(e, id) {
        webix.confirm({
          title: "Delete",
          text: "Are you sure you want to delete this data?",
          callback: function callback(result) {
            if (result) {
              collectionUsers.remove(id);
            }
          }
        });
        return false;
      }
    }), _defineProperty(_ref, "scheme", {
      $init: function $init() {
        if (this.data.age < 26) this.data.$css = "green";
      }
    }), _ref)]
  };
  var usersChart = {
    view: "chart",
    type: "bar",
    id: "user_chart",
    xAxis: {
      template: "#country#"
    },
    yAxis: {}
  };
  var ProductsView = (_ProductsView = {
    view: "treetable",
    columns: [{
      id: "id",
      header: "",
      css: {
        "text-align": "left"
      },
      width: 50
    }, {
      id: "title",
      header: "Title",
      width: 500,
      editor: "text",
      template: "{common.treetable()} #title#"
    }, {
      id: "price",
      header: "Price",
      template: "#price#",
      editor: "text",
      fillspace: true
    }],
    editable: true,
    rules: {
      "title": webix.rules.isNotEmpty,
      "price": webix.rules.isNumber
    },
    autoConfig: true,
    editaction: "dblclick",
    select: "row",
    scrollX: false
  }, _defineProperty(_ProductsView, "select", true), _defineProperty(_ProductsView, "ready", function ready() {
    this.openAll();
  }), _defineProperty(_ProductsView, "url", "data/products.js"), _ProductsView);

  function addNewUser() {
    countries.waitData.then(function () {
      var arr = countries.serialize();
      return {
        "name": "New user",
        "age": Math.floor(Math.random() * 100),
        "country": arr[Math.floor(Math.random() * arr.length)].value
      };
    }).then(function (userData) {
      collectionUsers.add(userData);
    });
  }

  var main = {
    cells: [{
      id: "Dashboard",
      cols: [dataTable, myFormRight]
    }, {
      id: "Users",
      rows: [usersList, usersChart]
    }, {
      id: "Products",
      rows: [ProductsView]
    }, {
      id: "Admin",
      template: "Admin view"
    }]
  };
  var bottombar = {
    view: "label",
    label: "The software is provided by <a href='https://webix.com' target='_blank'>https://webix.com</a>. All rights reserved (c)",
    height: 40,
    align: "center"
  };
  webix.ui({
    id: "app",
    rows: [topbar, {
      cols: [side, {
        view: "resizer"
      }, main]
    }, bottombar]
  });
  $$("myform").bind($$("tableInfo"));
  $$("myform").save();
  $$("tableInfo").registerFilter($$("myTabbar"), {
    columnId: "year",
    compare: function compare(value, filter) {
      var ALL = 1;
      var OLD = 2;
      var MODERN = 3;
      var NEW = 4;
      if (+filter === ALL) return value;
      if (+filter === OLD) return value < 2000;
      if (+filter === MODERN) return value >= 2000 && value < 2010;
      if (+filter === NEW) return value >= 2010;
    }
  }, {
    getValue: function getValue(node) {
      return node.getValue();
    },
    setValue: function setValue(node, value) {
      node.setValue(value);
    }
  }); //$$("user_chart").sync($$("myUsersList"));

  $$("user_chart").sync(collectionUsers, function () {
    this.group({
      by: "country",
      map: {
        value: ["name", "count"]
      }
    });
  });
  $$("mylist").select("Dashboard"); // when loading this is the first display
});
},{}],"../../../../.npm-global/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61467" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../.npm-global/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map