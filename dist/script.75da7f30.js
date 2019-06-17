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
var dataTable = {
  view: "datatable",
  id: "tableInfo",
  select: true,
  columns: [{
    id: "rank",
    header: "",
    css: "rank",
    width: 50
  }, {
    id: "title",
    header: "Film title",
    template: "#title#",
    width: 400
  }, {
    id: "year",
    header: "Released",
    template: "#year#",
    width: 80
  }, {
    id: "votes",
    header: "Votes",
    template: "#votes#"
  }, {
    template: "{common.trashIcon()}"
  }],
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
  data: window.testData //url:"data/data.js",

};
var myFormRight = {
  view: "form",
  id: "myform",
  width: 280,
  rules: {
    title: webix.rules.isNotEmpty,
    year: function year(value) {
      return value >= 1970 && value <= thisYear;
    },
    votes: function votes(value) {
      return value >= 10000;
    },
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
      label: "Title",
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
        value: "Add new",
        css: "webix_primary",
        click: function click() {
          if ($$("myform").validate()) {
            var item = $$("myform").getValues();
            $$("tableInfo").add(item);
            webix.message({
              text: "Verification successful"
            });
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
    }]
  }, {
    view: "list",
    id: "myUsersList",
    template: "#name# from #country# <span class='removeBtn'>X</span>",
    select: true,
    scroll: true,
    data: window.usersData,
    onClick: {
      removeBtn: function removeBtn(e, id) {
        this.remove(id);
        return false;
      }
    },
    scheme: {
      $init: function $init(obj) {
        if (obj.id <= 5) obj.$css = "green";
      }
    }
  }]
};
var usersChart = {
  view: "chart",
  type: "bar",
  value: "#age#",
  xAxis: {
    template: "#age#"
  },
  data: window.usersData
};
var ProductsView = {
  view: "treetable",
  columns: [{
    id: "id",
    header: "",
    css: {
      "text-align": "right"
    },
    width: 50
  }, {
    id: "title",
    header: "Title",
    width: 250,
    template: "{common.treetable()} #title#"
  }, {
    id: "price",
    header: "Price",
    template: "#price#",
    width: 250
  }],
  autowidth: true,
  autoConfig: true,
  scrollX: false,
  select: true,
  data: window.productsData
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61386" + '/');

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