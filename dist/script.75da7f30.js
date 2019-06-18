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
var _ref;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
var options = "extra-js/categories.js";
var dataTable = {
  rows: [{
    view: "segmented",
    css: "segbgc",
    id: "segSelec",
    inputWidth: 600,
    options: [{
      id: 1,
      value: "All",
      width: 150
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
    columns: [{
      id: "rank",
      header: "#",
      css: "rank",
      width: 50
    }, {
      id: "title",
      header: ["Film title", {
        content: "textFilter"
      }],
      template: "#title#",
      width: 300
    }, {
      id: "value",
      header: ["Category", {
        content: "selectFilter"
      }],
      editor: "richselect",
      options: options,
      width: 80
    }, {
      id: "rating",
      header: ["Rating", {
        content: "textFilter"
      }],
      template: "#rating#"
    }, {
      id: "votes",
      header: ["Votes", {
        content: "textFilter"
      }],
      template: "#votes#"
    }, {
      id: "year",
      header: "Year",
      template: "#year#",
      width: 80
    }, {
      template: "{common.trashIcon()}",
      width: 80
    }],
    editable: true,
    autowidth: true,
    autoConfig: true,
    scrollX: false,
    hover: "myhover",
    onClick: {
      "wxi-trash": function wxiTrash(e, id) {
        this.remove(id);
        return false;
      }
    },
    columnWidth: 70,
    //data: window.testData
    url: "data/data.js"
  }]
};
/*
$$("tableInfo").registerFilter(
    $$("segSelec"), 
    { columnId:"year", compare:function(value, filter, item){
    if(filter == 1)  return year < 2000;
    if (filter == 2) return year > 2000;
    }},
    { 
        getValue:function(node){
            return node.getValue();
        },
        setValue:function(node, value){
            node.setValue(value);
        }
    }
);
*/

var myFormRight = {
  view: "form",
  id: "myform",
  width: 280,
  rules: {
    title: webix.rules.isNotEmpty,
    year: webix.rules.isNumber,
    votes: webix.rules.isNotEmpty,
    rating: function rating(value) {
      return value != 0;
    }
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
      invalidMessage: "Enter year between 1970 and this yer"
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
        click: function click() {
          if ($$("myform").validate()) {
            var item = $$("myform").getValues();
            $$("tableInfo").add(item);
            webix.message({
              text: "Verification successful"
            });
            var form = $$('myform');

            if (form.isDirty()) {
              if (!form.validate()) return false;
              form.save();
            }
          }
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
          });
        }
      }]
    }]
  }, {}]
};
var thisYear = new Date().getFullYear();
webix.protoUI({
  name: "editlist"
}, webix.EditAbility, webix.ui.list);
var usersList = {
  rows: [{
    height: 35,
    view: "toolbar",
    elements: [{
      view: "text",
      id: "list_input",
      label: ""
    }, {
      view: "button",
      value: "Sort asc",
      width: 100,
      css: "webix_primary"
    }, {
      view: "button",
      value: "Sort desc",
      width: 100,
      css: "webix_primary"
    }, {
      view: "button",
      value: "Add new",
      width: 100,
      css: "webix_primary",
      click: function click() {
        $$("myUsersList").add({
          name: "New film",
          age: "25",
          country: "Russia"
        });
      }
    }]
  }, (_ref = {
    view: "editlist",
    id: "myUsersList",
    template: "#name#, #age#, from #country# <span class='removeBtn'>X</span>",
    select: true,
    scroll: true,
    url: "data/users.js",
    editable: true,
    editValue: "title",
    editaction: "dblclick",
    editor: "text"
  }, _defineProperty(_ref, "editValue", "name"), _defineProperty(_ref, "rules", {
    "name": webix.rules.isNotEmpty
  }), _defineProperty(_ref, "onClick", {
    removeBtn: function removeBtn(e, id) {
      this.remove(id);
      return false;
    }
  }), _defineProperty(_ref, "scheme", {
    $init: function $init(obj) {
      if (obj.age < 26) obj.$css = "green";
    }
  }), _ref)]
};
var usersChart = {
  view: "chart",
  type: "bar",
  id: "user_chart",
  value: "#age#",
  xAxis: {
    template: "#country#"
  }
};
var ProductsView = {
  view: "treetable",
  columns: [{
    id: "id",
    header: "",
    css: {
      "text-align": "left"
    },
    width: 150
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
    width: 250
  }, {
    width: 300
  }],
  editable: true,
  rules: {
    "title": webix.rules.isNotEmpty,
    "price": webix.rules.isNumber
  },
  autowidth: true,
  autoConfig: true,
  scrollX: false,
  select: true,
  url: "data/products.js"
};
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
  type: "line",
  id: "app",
  rows: [topbar, {
    cols: [side, {
      view: "resizer"
    }, main]
  }, bottombar]
});
$$("mylist").select("Dashboard"); // when loading this is the first display

$$("myform").bind($$("tableInfo"));
$$("myform").save();
$$("user_chart").sync($$("myUsersList"));
$$('tableInfo').sort("#year#");
$$("list_input").attachEvent("onTimedKeyPress", function () {
  var value = this.getValue().toLowerCase();
  $$("myUsersList").filter(function (obj) {
    return obj.name.toLowerCase().indexOf(value) == 0;
  });
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59532" + '/');

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