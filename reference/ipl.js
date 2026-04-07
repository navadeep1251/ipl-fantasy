(function() {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload"))
        return;
    for (const l of document.querySelectorAll('link[rel="modulepreload"]'))
        r(l);
    new MutationObserver(l => {
        for (const i of l)
            if (i.type === "childList")
                for (const o of i.addedNodes)
                    o.tagName === "LINK" && o.rel === "modulepreload" && r(o)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function n(l) {
        const i = {};
        return l.integrity && (i.integrity = l.integrity),
        l.referrerPolicy && (i.referrerPolicy = l.referrerPolicy),
        l.crossOrigin === "use-credentials" ? i.credentials = "include" : l.crossOrigin === "anonymous" ? i.credentials = "omit" : i.credentials = "same-origin",
        i
    }
    function r(l) {
        if (l.ep)
            return;
        l.ep = !0;
        const i = n(l);
        fetch(l.href, i)
    }
}
)();
function wc(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
}
var la = {
    exports: {}
}
  , pl = {}
  , ia = {
    exports: {}
}
  , F = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var sr = Symbol.for("react.element")
  , Sc = Symbol.for("react.portal")
  , kc = Symbol.for("react.fragment")
  , jc = Symbol.for("react.strict_mode")
  , _c = Symbol.for("react.profiler")
  , Cc = Symbol.for("react.provider")
  , Ec = Symbol.for("react.context")
  , zc = Symbol.for("react.forward_ref")
  , Pc = Symbol.for("react.suspense")
  , Bc = Symbol.for("react.memo")
  , Tc = Symbol.for("react.lazy")
  , Qo = Symbol.iterator;
function bc(e) {
    return e === null || typeof e != "object" ? null : (e = Qo && e[Qo] || e["@@iterator"],
    typeof e == "function" ? e : null)
}
var oa = {
    isMounted: function() {
        return !1
    },
    enqueueForceUpdate: function() {},
    enqueueReplaceState: function() {},
    enqueueSetState: function() {}
}
  , sa = Object.assign
  , aa = {};
function wn(e, t, n) {
    this.props = e,
    this.context = t,
    this.refs = aa,
    this.updater = n || oa
}
wn.prototype.isReactComponent = {};
wn.prototype.setState = function(e, t) {
    if (typeof e != "object" && typeof e != "function" && e != null)
        throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, e, t, "setState")
}
;
wn.prototype.forceUpdate = function(e) {
    this.updater.enqueueForceUpdate(this, e, "forceUpdate")
}
;
function ua() {}
ua.prototype = wn.prototype;
function Xi(e, t, n) {
    this.props = e,
    this.context = t,
    this.refs = aa,
    this.updater = n || oa
}
var Zi = Xi.prototype = new ua;
Zi.constructor = Xi;
sa(Zi, wn.prototype);
Zi.isPureReactComponent = !0;
var Yo = Array.isArray
  , ca = Object.prototype.hasOwnProperty
  , qi = {
    current: null
}
  , da = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
};
function fa(e, t, n) {
    var r, l = {}, i = null, o = null;
    if (t != null)
        for (r in t.ref !== void 0 && (o = t.ref),
        t.key !== void 0 && (i = "" + t.key),
        t)
            ca.call(t, r) && !da.hasOwnProperty(r) && (l[r] = t[r]);
    var a = arguments.length - 2;
    if (a === 1)
        l.children = n;
    else if (1 < a) {
        for (var u = Array(a), c = 0; c < a; c++)
            u[c] = arguments[c + 2];
        l.children = u
    }
    if (e && e.defaultProps)
        for (r in a = e.defaultProps,
        a)
            l[r] === void 0 && (l[r] = a[r]);
    return {
        $$typeof: sr,
        type: e,
        key: i,
        ref: o,
        props: l,
        _owner: qi.current
    }
}
function Mc(e, t) {
    return {
        $$typeof: sr,
        type: e.type,
        key: t,
        ref: e.ref,
        props: e.props,
        _owner: e._owner
    }
}
function eo(e) {
    return typeof e == "object" && e !== null && e.$$typeof === sr
}
function Rc(e) {
    var t = {
        "=": "=0",
        ":": "=2"
    };
    return "$" + e.replace(/[=:]/g, function(n) {
        return t[n]
    })
}
var Go = /\/+/g;
function Tl(e, t) {
    return typeof e == "object" && e !== null && e.key != null ? Rc("" + e.key) : t.toString(36)
}
function br(e, t, n, r, l) {
    var i = typeof e;
    (i === "undefined" || i === "boolean") && (e = null);
    var o = !1;
    if (e === null)
        o = !0;
    else
        switch (i) {
        case "string":
        case "number":
            o = !0;
            break;
        case "object":
            switch (e.$$typeof) {
            case sr:
            case Sc:
                o = !0
            }
        }
    if (o)
        return o = e,
        l = l(o),
        e = r === "" ? "." + Tl(o, 0) : r,
        Yo(l) ? (n = "",
        e != null && (n = e.replace(Go, "$&/") + "/"),
        br(l, t, n, "", function(c) {
            return c
        })) : l != null && (eo(l) && (l = Mc(l, n + (!l.key || o && o.key === l.key ? "" : ("" + l.key).replace(Go, "$&/") + "/") + e)),
        t.push(l)),
        1;
    if (o = 0,
    r = r === "" ? "." : r + ":",
    Yo(e))
        for (var a = 0; a < e.length; a++) {
            i = e[a];
            var u = r + Tl(i, a);
            o += br(i, t, n, u, l)
        }
    else if (u = bc(e),
    typeof u == "function")
        for (e = u.call(e),
        a = 0; !(i = e.next()).done; )
            i = i.value,
            u = r + Tl(i, a++),
            o += br(i, t, n, u, l);
    else if (i === "object")
        throw t = String(e),
        Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
    return o
}
function hr(e, t, n) {
    if (e == null)
        return e;
    var r = []
      , l = 0;
    return br(e, r, "", "", function(i) {
        return t.call(n, i, l++)
    }),
    r
}
function Nc(e) {
    if (e._status === -1) {
        var t = e._result;
        t = t(),
        t.then(function(n) {
            (e._status === 0 || e._status === -1) && (e._status = 1,
            e._result = n)
        }, function(n) {
            (e._status === 0 || e._status === -1) && (e._status = 2,
            e._result = n)
        }),
        e._status === -1 && (e._status = 0,
        e._result = t)
    }
    if (e._status === 1)
        return e._result.default;
    throw e._result
}
var ye = {
    current: null
}
  , Mr = {
    transition: null
}
  , Ic = {
    ReactCurrentDispatcher: ye,
    ReactCurrentBatchConfig: Mr,
    ReactCurrentOwner: qi
};
function pa() {
    throw Error("act(...) is not supported in production builds of React.")
}
F.Children = {
    map: hr,
    forEach: function(e, t, n) {
        hr(e, function() {
            t.apply(this, arguments)
        }, n)
    },
    count: function(e) {
        var t = 0;
        return hr(e, function() {
            t++
        }),
        t
    },
    toArray: function(e) {
        return hr(e, function(t) {
            return t
        }) || []
    },
    only: function(e) {
        if (!eo(e))
            throw Error("React.Children.only expected to receive a single React element child.");
        return e
    }
};
F.Component = wn;
F.Fragment = kc;
F.Profiler = _c;
F.PureComponent = Xi;
F.StrictMode = jc;
F.Suspense = Pc;
F.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ic;
F.act = pa;
F.cloneElement = function(e, t, n) {
    if (e == null)
        throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
    var r = sa({}, e.props)
      , l = e.key
      , i = e.ref
      , o = e._owner;
    if (t != null) {
        if (t.ref !== void 0 && (i = t.ref,
        o = qi.current),
        t.key !== void 0 && (l = "" + t.key),
        e.type && e.type.defaultProps)
            var a = e.type.defaultProps;
        for (u in t)
            ca.call(t, u) && !da.hasOwnProperty(u) && (r[u] = t[u] === void 0 && a !== void 0 ? a[u] : t[u])
    }
    var u = arguments.length - 2;
    if (u === 1)
        r.children = n;
    else if (1 < u) {
        a = Array(u);
        for (var c = 0; c < u; c++)
            a[c] = arguments[c + 2];
        r.children = a
    }
    return {
        $$typeof: sr,
        type: e.type,
        key: l,
        ref: i,
        props: r,
        _owner: o
    }
}
;
F.createContext = function(e) {
    return e = {
        $$typeof: Ec,
        _currentValue: e,
        _currentValue2: e,
        _threadCount: 0,
        Provider: null,
        Consumer: null,
        _defaultValue: null,
        _globalName: null
    },
    e.Provider = {
        $$typeof: Cc,
        _context: e
    },
    e.Consumer = e
}
;
F.createElement = fa;
F.createFactory = function(e) {
    var t = fa.bind(null, e);
    return t.type = e,
    t
}
;
F.createRef = function() {
    return {
        current: null
    }
}
;
F.forwardRef = function(e) {
    return {
        $$typeof: zc,
        render: e
    }
}
;
F.isValidElement = eo;
F.lazy = function(e) {
    return {
        $$typeof: Tc,
        _payload: {
            _status: -1,
            _result: e
        },
        _init: Nc
    }
}
;
F.memo = function(e, t) {
    return {
        $$typeof: Bc,
        type: e,
        compare: t === void 0 ? null : t
    }
}
;
F.startTransition = function(e) {
    var t = Mr.transition;
    Mr.transition = {};
    try {
        e()
    } finally {
        Mr.transition = t
    }
}
;
F.unstable_act = pa;
F.useCallback = function(e, t) {
    return ye.current.useCallback(e, t)
}
;
F.useContext = function(e) {
    return ye.current.useContext(e)
}
;
F.useDebugValue = function() {}
;
F.useDeferredValue = function(e) {
    return ye.current.useDeferredValue(e)
}
;
F.useEffect = function(e, t) {
    return ye.current.useEffect(e, t)
}
;
F.useId = function() {
    return ye.current.useId()
}
;
F.useImperativeHandle = function(e, t, n) {
    return ye.current.useImperativeHandle(e, t, n)
}
;
F.useInsertionEffect = function(e, t) {
    return ye.current.useInsertionEffect(e, t)
}
;
F.useLayoutEffect = function(e, t) {
    return ye.current.useLayoutEffect(e, t)
}
;
F.useMemo = function(e, t) {
    return ye.current.useMemo(e, t)
}
;
F.useReducer = function(e, t, n) {
    return ye.current.useReducer(e, t, n)
}
;
F.useRef = function(e) {
    return ye.current.useRef(e)
}
;
F.useState = function(e) {
    return ye.current.useState(e)
}
;
F.useSyncExternalStore = function(e, t, n) {
    return ye.current.useSyncExternalStore(e, t, n)
}
;
F.useTransition = function() {
    return ye.current.useTransition()
}
;
F.version = "18.3.1";
ia.exports = F;
var N = ia.exports;
const Lc = wc(N);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Wc = N
  , Dc = Symbol.for("react.element")
  , Fc = Symbol.for("react.fragment")
  , Ac = Object.prototype.hasOwnProperty
  , Oc = Wc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner
  , Uc = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
};
function ha(e, t, n) {
    var r, l = {}, i = null, o = null;
    n !== void 0 && (i = "" + n),
    t.key !== void 0 && (i = "" + t.key),
    t.ref !== void 0 && (o = t.ref);
    for (r in t)
        Ac.call(t, r) && !Uc.hasOwnProperty(r) && (l[r] = t[r]);
    if (e && e.defaultProps)
        for (r in t = e.defaultProps,
        t)
            l[r] === void 0 && (l[r] = t[r]);
    return {
        $$typeof: Dc,
        type: e,
        key: i,
        ref: o,
        props: l,
        _owner: Oc.current
    }
}
pl.Fragment = Fc;
pl.jsx = ha;
pl.jsxs = ha;
la.exports = pl;
var s = la.exports
  , ri = {}
  , ga = {
    exports: {}
}
  , Pe = {}
  , ma = {
    exports: {}
}
  , ya = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(e) {
    function t(B, W) {
        var D = B.length;
        B.push(W);
        e: for (; 0 < D; ) {
            var M = D - 1 >>> 1
              , re = B[M];
            if (0 < l(re, W))
                B[M] = W,
                B[D] = re,
                D = M;
            else
                break e
        }
    }
    function n(B) {
        return B.length === 0 ? null : B[0]
    }
    function r(B) {
        if (B.length === 0)
            return null;
        var W = B[0]
          , D = B.pop();
        if (D !== W) {
            B[0] = D;
            e: for (var M = 0, re = B.length, fr = re >>> 1; M < fr; ) {
                var zt = 2 * (M + 1) - 1
                  , Bl = B[zt]
                  , Pt = zt + 1
                  , pr = B[Pt];
                if (0 > l(Bl, D))
                    Pt < re && 0 > l(pr, Bl) ? (B[M] = pr,
                    B[Pt] = D,
                    M = Pt) : (B[M] = Bl,
                    B[zt] = D,
                    M = zt);
                else if (Pt < re && 0 > l(pr, D))
                    B[M] = pr,
                    B[Pt] = D,
                    M = Pt;
                else
                    break e
            }
        }
        return W
    }
    function l(B, W) {
        var D = B.sortIndex - W.sortIndex;
        return D !== 0 ? D : B.id - W.id
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
        var i = performance;
        e.unstable_now = function() {
            return i.now()
        }
    } else {
        var o = Date
          , a = o.now();
        e.unstable_now = function() {
            return o.now() - a
        }
    }
    var u = []
      , c = []
      , f = 1
      , m = null
      , p = 3
      , y = !1
      , k = !1
      , _ = !1
      , z = typeof setTimeout == "function" ? setTimeout : null
      , h = typeof clearTimeout == "function" ? clearTimeout : null
      , d = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function g(B) {
        for (var W = n(c); W !== null; ) {
            if (W.callback === null)
                r(c);
            else if (W.startTime <= B)
                r(c),
                W.sortIndex = W.expirationTime,
                t(u, W);
            else
                break;
            W = n(c)
        }
    }
    function x(B) {
        if (_ = !1,
        g(B),
        !k)
            if (n(u) !== null)
                k = !0,
                he(C);
            else {
                var W = n(c);
                W !== null && Ht(x, W.startTime - B)
            }
    }
    function C(B, W) {
        k = !1,
        _ && (_ = !1,
        h(P),
        P = -1),
        y = !0;
        var D = p;
        try {
            for (g(W),
            m = n(u); m !== null && (!(m.expirationTime > W) || B && !H()); ) {
                var M = m.callback;
                if (typeof M == "function") {
                    m.callback = null,
                    p = m.priorityLevel;
                    var re = M(m.expirationTime <= W);
                    W = e.unstable_now(),
                    typeof re == "function" ? m.callback = re : m === n(u) && r(u),
                    g(W)
                } else
                    r(u);
                m = n(u)
            }
            if (m !== null)
                var fr = !0;
            else {
                var zt = n(c);
                zt !== null && Ht(x, zt.startTime - W),
                fr = !1
            }
            return fr
        } finally {
            m = null,
            p = D,
            y = !1
        }
    }
    var j = !1
      , v = null
      , P = -1
      , I = 5
      , T = -1;
    function H() {
        return !(e.unstable_now() - T < I)
    }
    function S() {
        if (v !== null) {
            var B = e.unstable_now();
            T = B;
            var W = !0;
            try {
                W = v(!0, B)
            } finally {
                W ? R() : (j = !1,
                v = null)
            }
        } else
            j = !1
    }
    var R;
    if (typeof d == "function")
        R = function() {
            d(S)
        }
        ;
    else if (typeof MessageChannel < "u") {
        var L = new MessageChannel
          , Q = L.port2;
        L.port1.onmessage = S,
        R = function() {
            Q.postMessage(null)
        }
    } else
        R = function() {
            z(S, 0)
        }
        ;
    function he(B) {
        v = B,
        j || (j = !0,
        R())
    }
    function Ht(B, W) {
        P = z(function() {
            B(e.unstable_now())
        }, W)
    }
    e.unstable_IdlePriority = 5,
    e.unstable_ImmediatePriority = 1,
    e.unstable_LowPriority = 4,
    e.unstable_NormalPriority = 3,
    e.unstable_Profiling = null,
    e.unstable_UserBlockingPriority = 2,
    e.unstable_cancelCallback = function(B) {
        B.callback = null
    }
    ,
    e.unstable_continueExecution = function() {
        k || y || (k = !0,
        he(C))
    }
    ,
    e.unstable_forceFrameRate = function(B) {
        0 > B || 125 < B ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : I = 0 < B ? Math.floor(1e3 / B) : 5
    }
    ,
    e.unstable_getCurrentPriorityLevel = function() {
        return p
    }
    ,
    e.unstable_getFirstCallbackNode = function() {
        return n(u)
    }
    ,
    e.unstable_next = function(B) {
        switch (p) {
        case 1:
        case 2:
        case 3:
            var W = 3;
            break;
        default:
            W = p
        }
        var D = p;
        p = W;
        try {
            return B()
        } finally {
            p = D
        }
    }
    ,
    e.unstable_pauseExecution = function() {}
    ,
    e.unstable_requestPaint = function() {}
    ,
    e.unstable_runWithPriority = function(B, W) {
        switch (B) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            break;
        default:
            B = 3
        }
        var D = p;
        p = B;
        try {
            return W()
        } finally {
            p = D
        }
    }
    ,
    e.unstable_scheduleCallback = function(B, W, D) {
        var M = e.unstable_now();
        switch (typeof D == "object" && D !== null ? (D = D.delay,
        D = typeof D == "number" && 0 < D ? M + D : M) : D = M,
        B) {
        case 1:
            var re = -1;
            break;
        case 2:
            re = 250;
            break;
        case 5:
            re = 1073741823;
            break;
        case 4:
            re = 1e4;
            break;
        default:
            re = 5e3
        }
        return re = D + re,
        B = {
            id: f++,
            callback: W,
            priorityLevel: B,
            startTime: D,
            expirationTime: re,
            sortIndex: -1
        },
        D > M ? (B.sortIndex = D,
        t(c, B),
        n(u) === null && B === n(c) && (_ ? (h(P),
        P = -1) : _ = !0,
        Ht(x, D - M))) : (B.sortIndex = re,
        t(u, B),
        k || y || (k = !0,
        he(C))),
        B
    }
    ,
    e.unstable_shouldYield = H,
    e.unstable_wrapCallback = function(B) {
        var W = p;
        return function() {
            var D = p;
            p = W;
            try {
                return B.apply(this, arguments)
            } finally {
                p = D
            }
        }
    }
}
)(ya);
ma.exports = ya;
var Hc = ma.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var $c = N
  , ze = Hc;
function E(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++)
        t += "&args[]=" + encodeURIComponent(arguments[n]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
}
var xa = new Set
  , $n = {};
function Ot(e, t) {
    dn(e, t),
    dn(e + "Capture", t)
}
function dn(e, t) {
    for ($n[e] = t,
    e = 0; e < t.length; e++)
        xa.add(t[e])
}
var et = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u")
  , li = Object.prototype.hasOwnProperty
  , Vc = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/
  , Jo = {}
  , Xo = {};
function Kc(e) {
    return li.call(Xo, e) ? !0 : li.call(Jo, e) ? !1 : Vc.test(e) ? Xo[e] = !0 : (Jo[e] = !0,
    !1)
}
function Qc(e, t, n, r) {
    if (n !== null && n.type === 0)
        return !1;
    switch (typeof t) {
    case "function":
    case "symbol":
        return !0;
    case "boolean":
        return r ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5),
        e !== "data-" && e !== "aria-");
    default:
        return !1
    }
}
function Yc(e, t, n, r) {
    if (t === null || typeof t > "u" || Qc(e, t, n, r))
        return !0;
    if (r)
        return !1;
    if (n !== null)
        switch (n.type) {
        case 3:
            return !t;
        case 4:
            return t === !1;
        case 5:
            return isNaN(t);
        case 6:
            return isNaN(t) || 1 > t
        }
    return !1
}
function xe(e, t, n, r, l, i, o) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4,
    this.attributeName = r,
    this.attributeNamespace = l,
    this.mustUseProperty = n,
    this.propertyName = e,
    this.type = t,
    this.sanitizeURL = i,
    this.removeEmptyString = o
}
var ae = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    ae[e] = new xe(e,0,!1,e,null,!1,!1)
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var t = e[0];
    ae[t] = new xe(t,1,!1,e[1],null,!1,!1)
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    ae[e] = new xe(e,2,!1,e.toLowerCase(),null,!1,!1)
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    ae[e] = new xe(e,2,!1,e,null,!1,!1)
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    ae[e] = new xe(e,3,!1,e.toLowerCase(),null,!1,!1)
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
    ae[e] = new xe(e,3,!0,e,null,!1,!1)
});
["capture", "download"].forEach(function(e) {
    ae[e] = new xe(e,4,!1,e,null,!1,!1)
});
["cols", "rows", "size", "span"].forEach(function(e) {
    ae[e] = new xe(e,6,!1,e,null,!1,!1)
});
["rowSpan", "start"].forEach(function(e) {
    ae[e] = new xe(e,5,!1,e.toLowerCase(),null,!1,!1)
});
var to = /[\-:]([a-z])/g;
function no(e) {
    return e[1].toUpperCase()
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(to, no);
    ae[t] = new xe(t,1,!1,e,null,!1,!1)
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(to, no);
    ae[t] = new xe(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(to, no);
    ae[t] = new xe(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)
});
["tabIndex", "crossOrigin"].forEach(function(e) {
    ae[e] = new xe(e,1,!1,e.toLowerCase(),null,!1,!1)
});
ae.xlinkHref = new xe("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);
["src", "href", "action", "formAction"].forEach(function(e) {
    ae[e] = new xe(e,1,!1,e.toLowerCase(),null,!0,!0)
});
function ro(e, t, n, r) {
    var l = ae.hasOwnProperty(t) ? ae[t] : null;
    (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (Yc(t, n, l, r) && (n = null),
    r || l === null ? Kc(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName,
    r = l.attributeNamespace,
    n === null ? e.removeAttribute(t) : (l = l.type,
    n = l === 3 || l === 4 && n === !0 ? "" : "" + n,
    r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))))
}
var it = $c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
  , gr = Symbol.for("react.element")
  , Kt = Symbol.for("react.portal")
  , Qt = Symbol.for("react.fragment")
  , lo = Symbol.for("react.strict_mode")
  , ii = Symbol.for("react.profiler")
  , va = Symbol.for("react.provider")
  , wa = Symbol.for("react.context")
  , io = Symbol.for("react.forward_ref")
  , oi = Symbol.for("react.suspense")
  , si = Symbol.for("react.suspense_list")
  , oo = Symbol.for("react.memo")
  , st = Symbol.for("react.lazy")
  , Sa = Symbol.for("react.offscreen")
  , Zo = Symbol.iterator;
function jn(e) {
    return e === null || typeof e != "object" ? null : (e = Zo && e[Zo] || e["@@iterator"],
    typeof e == "function" ? e : null)
}
var J = Object.assign, bl;
function bn(e) {
    if (bl === void 0)
        try {
            throw Error()
        } catch (n) {
            var t = n.stack.trim().match(/\n( *(at )?)/);
            bl = t && t[1] || ""
        }
    return `
` + bl + e
}
var Ml = !1;
function Rl(e, t) {
    if (!e || Ml)
        return "";
    Ml = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
        if (t)
            if (t = function() {
                throw Error()
            }
            ,
            Object.defineProperty(t.prototype, "props", {
                set: function() {
                    throw Error()
                }
            }),
            typeof Reflect == "object" && Reflect.construct) {
                try {
                    Reflect.construct(t, [])
                } catch (c) {
                    var r = c
                }
                Reflect.construct(e, [], t)
            } else {
                try {
                    t.call()
                } catch (c) {
                    r = c
                }
                e.call(t.prototype)
            }
        else {
            try {
                throw Error()
            } catch (c) {
                r = c
            }
            e()
        }
    } catch (c) {
        if (c && r && typeof c.stack == "string") {
            for (var l = c.stack.split(`
`), i = r.stack.split(`
`), o = l.length - 1, a = i.length - 1; 1 <= o && 0 <= a && l[o] !== i[a]; )
                a--;
            for (; 1 <= o && 0 <= a; o--,
            a--)
                if (l[o] !== i[a]) {
                    if (o !== 1 || a !== 1)
                        do
                            if (o--,
                            a--,
                            0 > a || l[o] !== i[a]) {
                                var u = `
` + l[o].replace(" at new ", " at ");
                                return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)),
                                u
                            }
                        while (1 <= o && 0 <= a);
                    break
                }
        }
    } finally {
        Ml = !1,
        Error.prepareStackTrace = n
    }
    return (e = e ? e.displayName || e.name : "") ? bn(e) : ""
}
function Gc(e) {
    switch (e.tag) {
    case 5:
        return bn(e.type);
    case 16:
        return bn("Lazy");
    case 13:
        return bn("Suspense");
    case 19:
        return bn("SuspenseList");
    case 0:
    case 2:
    case 15:
        return e = Rl(e.type, !1),
        e;
    case 11:
        return e = Rl(e.type.render, !1),
        e;
    case 1:
        return e = Rl(e.type, !0),
        e;
    default:
        return ""
    }
}
function ai(e) {
    if (e == null)
        return null;
    if (typeof e == "function")
        return e.displayName || e.name || null;
    if (typeof e == "string")
        return e;
    switch (e) {
    case Qt:
        return "Fragment";
    case Kt:
        return "Portal";
    case ii:
        return "Profiler";
    case lo:
        return "StrictMode";
    case oi:
        return "Suspense";
    case si:
        return "SuspenseList"
    }
    if (typeof e == "object")
        switch (e.$$typeof) {
        case wa:
            return (e.displayName || "Context") + ".Consumer";
        case va:
            return (e._context.displayName || "Context") + ".Provider";
        case io:
            var t = e.render;
            return e = e.displayName,
            e || (e = t.displayName || t.name || "",
            e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"),
            e;
        case oo:
            return t = e.displayName || null,
            t !== null ? t : ai(e.type) || "Memo";
        case st:
            t = e._payload,
            e = e._init;
            try {
                return ai(e(t))
            } catch {}
        }
    return null
}
function Jc(e) {
    var t = e.type;
    switch (e.tag) {
    case 24:
        return "Cache";
    case 9:
        return (t.displayName || "Context") + ".Consumer";
    case 10:
        return (t._context.displayName || "Context") + ".Provider";
    case 18:
        return "DehydratedFragment";
    case 11:
        return e = t.render,
        e = e.displayName || e.name || "",
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
    case 7:
        return "Fragment";
    case 5:
        return t;
    case 4:
        return "Portal";
    case 3:
        return "Root";
    case 6:
        return "Text";
    case 16:
        return ai(t);
    case 8:
        return t === lo ? "StrictMode" : "Mode";
    case 22:
        return "Offscreen";
    case 12:
        return "Profiler";
    case 21:
        return "Scope";
    case 13:
        return "Suspense";
    case 19:
        return "SuspenseList";
    case 25:
        return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
        if (typeof t == "function")
            return t.displayName || t.name || null;
        if (typeof t == "string")
            return t
    }
    return null
}
function kt(e) {
    switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
        return e;
    case "object":
        return e;
    default:
        return ""
    }
}
function ka(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio")
}
function Xc(e) {
    var t = ka(e) ? "checked" : "value"
      , n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t)
      , r = "" + e[t];
    if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
        var l = n.get
          , i = n.set;
        return Object.defineProperty(e, t, {
            configurable: !0,
            get: function() {
                return l.call(this)
            },
            set: function(o) {
                r = "" + o,
                i.call(this, o)
            }
        }),
        Object.defineProperty(e, t, {
            enumerable: n.enumerable
        }),
        {
            getValue: function() {
                return r
            },
            setValue: function(o) {
                r = "" + o
            },
            stopTracking: function() {
                e._valueTracker = null,
                delete e[t]
            }
        }
    }
}
function mr(e) {
    e._valueTracker || (e._valueTracker = Xc(e))
}
function ja(e) {
    if (!e)
        return !1;
    var t = e._valueTracker;
    if (!t)
        return !0;
    var n = t.getValue()
      , r = "";
    return e && (r = ka(e) ? e.checked ? "true" : "false" : e.value),
    e = r,
    e !== n ? (t.setValue(e),
    !0) : !1
}
function Hr(e) {
    if (e = e || (typeof document < "u" ? document : void 0),
    typeof e > "u")
        return null;
    try {
        return e.activeElement || e.body
    } catch {
        return e.body
    }
}
function ui(e, t) {
    var n = t.checked;
    return J({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: n ?? e._wrapperState.initialChecked
    })
}
function qo(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue
      , r = t.checked != null ? t.checked : t.defaultChecked;
    n = kt(t.value != null ? t.value : n),
    e._wrapperState = {
        initialChecked: r,
        initialValue: n,
        controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null
    }
}
function _a(e, t) {
    t = t.checked,
    t != null && ro(e, "checked", t, !1)
}
function ci(e, t) {
    _a(e, t);
    var n = kt(t.value)
      , r = t.type;
    if (n != null)
        r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
    else if (r === "submit" || r === "reset") {
        e.removeAttribute("value");
        return
    }
    t.hasOwnProperty("value") ? di(e, t.type, n) : t.hasOwnProperty("defaultValue") && di(e, t.type, kt(t.defaultValue)),
    t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked)
}
function es(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var r = t.type;
        if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null))
            return;
        t = "" + e._wrapperState.initialValue,
        n || t === e.value || (e.value = t),
        e.defaultValue = t
    }
    n = e.name,
    n !== "" && (e.name = ""),
    e.defaultChecked = !!e._wrapperState.initialChecked,
    n !== "" && (e.name = n)
}
function di(e, t, n) {
    (t !== "number" || Hr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n))
}
var Mn = Array.isArray;
function ln(e, t, n, r) {
    if (e = e.options,
    t) {
        t = {};
        for (var l = 0; l < n.length; l++)
            t["$" + n[l]] = !0;
        for (n = 0; n < e.length; n++)
            l = t.hasOwnProperty("$" + e[n].value),
            e[n].selected !== l && (e[n].selected = l),
            l && r && (e[n].defaultSelected = !0)
    } else {
        for (n = "" + kt(n),
        t = null,
        l = 0; l < e.length; l++) {
            if (e[l].value === n) {
                e[l].selected = !0,
                r && (e[l].defaultSelected = !0);
                return
            }
            t !== null || e[l].disabled || (t = e[l])
        }
        t !== null && (t.selected = !0)
    }
}
function fi(e, t) {
    if (t.dangerouslySetInnerHTML != null)
        throw Error(E(91));
    return J({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: "" + e._wrapperState.initialValue
    })
}
function ts(e, t) {
    var n = t.value;
    if (n == null) {
        if (n = t.children,
        t = t.defaultValue,
        n != null) {
            if (t != null)
                throw Error(E(92));
            if (Mn(n)) {
                if (1 < n.length)
                    throw Error(E(93));
                n = n[0]
            }
            t = n
        }
        t == null && (t = ""),
        n = t
    }
    e._wrapperState = {
        initialValue: kt(n)
    }
}
function Ca(e, t) {
    var n = kt(t.value)
      , r = kt(t.defaultValue);
    n != null && (n = "" + n,
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r)
}
function ns(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t)
}
function Ea(e) {
    switch (e) {
    case "svg":
        return "http://www.w3.org/2000/svg";
    case "math":
        return "http://www.w3.org/1998/Math/MathML";
    default:
        return "http://www.w3.org/1999/xhtml"
    }
}
function pi(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? Ea(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e
}
var yr, za = function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
        MSApp.execUnsafeLocalFunction(function() {
            return e(t, n, r, l)
        })
    }
    : e
}(function(e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML"in e)
        e.innerHTML = t;
    else {
        for (yr = yr || document.createElement("div"),
        yr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
        t = yr.firstChild; e.firstChild; )
            e.removeChild(e.firstChild);
        for (; t.firstChild; )
            e.appendChild(t.firstChild)
    }
});
function Vn(e, t) {
    if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && n.nodeType === 3) {
            n.nodeValue = t;
            return
        }
    }
    e.textContent = t
}
var In = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
}
  , Zc = ["Webkit", "ms", "Moz", "O"];
Object.keys(In).forEach(function(e) {
    Zc.forEach(function(t) {
        t = t + e.charAt(0).toUpperCase() + e.substring(1),
        In[t] = In[e]
    })
});
function Pa(e, t, n) {
    return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || In.hasOwnProperty(e) && In[e] ? ("" + t).trim() : t + "px"
}
function Ba(e, t) {
    e = e.style;
    for (var n in t)
        if (t.hasOwnProperty(n)) {
            var r = n.indexOf("--") === 0
              , l = Pa(n, t[n], r);
            n === "float" && (n = "cssFloat"),
            r ? e.setProperty(n, l) : e[n] = l
        }
}
var qc = J({
    menuitem: !0
}, {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0
});
function hi(e, t) {
    if (t) {
        if (qc[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
            throw Error(E(137, e));
        if (t.dangerouslySetInnerHTML != null) {
            if (t.children != null)
                throw Error(E(60));
            if (typeof t.dangerouslySetInnerHTML != "object" || !("__html"in t.dangerouslySetInnerHTML))
                throw Error(E(61))
        }
        if (t.style != null && typeof t.style != "object")
            throw Error(E(62))
    }
}
function gi(e, t) {
    if (e.indexOf("-") === -1)
        return typeof t.is == "string";
    switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
        return !1;
    default:
        return !0
    }
}
var mi = null;
function so(e) {
    return e = e.target || e.srcElement || window,
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
}
var yi = null
  , on = null
  , sn = null;
function rs(e) {
    if (e = cr(e)) {
        if (typeof yi != "function")
            throw Error(E(280));
        var t = e.stateNode;
        t && (t = xl(t),
        yi(e.stateNode, e.type, t))
    }
}
function Ta(e) {
    on ? sn ? sn.push(e) : sn = [e] : on = e
}
function ba() {
    if (on) {
        var e = on
          , t = sn;
        if (sn = on = null,
        rs(e),
        t)
            for (e = 0; e < t.length; e++)
                rs(t[e])
    }
}
function Ma(e, t) {
    return e(t)
}
function Ra() {}
var Nl = !1;
function Na(e, t, n) {
    if (Nl)
        return e(t, n);
    Nl = !0;
    try {
        return Ma(e, t, n)
    } finally {
        Nl = !1,
        (on !== null || sn !== null) && (Ra(),
        ba())
    }
}
function Kn(e, t) {
    var n = e.stateNode;
    if (n === null)
        return null;
    var r = xl(n);
    if (r === null)
        return null;
    n = r[t];
    e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
        (r = !r.disabled) || (e = e.type,
        r = !(e === "button" || e === "input" || e === "select" || e === "textarea")),
        e = !r;
        break e;
    default:
        e = !1
    }
    if (e)
        return null;
    if (n && typeof n != "function")
        throw Error(E(231, t, typeof n));
    return n
}
var xi = !1;
if (et)
    try {
        var _n = {};
        Object.defineProperty(_n, "passive", {
            get: function() {
                xi = !0
            }
        }),
        window.addEventListener("test", _n, _n),
        window.removeEventListener("test", _n, _n)
    } catch {
        xi = !1
    }
function ed(e, t, n, r, l, i, o, a, u) {
    var c = Array.prototype.slice.call(arguments, 3);
    try {
        t.apply(n, c)
    } catch (f) {
        this.onError(f)
    }
}
var Ln = !1
  , $r = null
  , Vr = !1
  , vi = null
  , td = {
    onError: function(e) {
        Ln = !0,
        $r = e
    }
};
function nd(e, t, n, r, l, i, o, a, u) {
    Ln = !1,
    $r = null,
    ed.apply(td, arguments)
}
function rd(e, t, n, r, l, i, o, a, u) {
    if (nd.apply(this, arguments),
    Ln) {
        if (Ln) {
            var c = $r;
            Ln = !1,
            $r = null
        } else
            throw Error(E(198));
        Vr || (Vr = !0,
        vi = c)
    }
}
function Ut(e) {
    var t = e
      , n = e;
    if (e.alternate)
        for (; t.return; )
            t = t.return;
    else {
        e = t;
        do
            t = e,
            t.flags & 4098 && (n = t.return),
            e = t.return;
        while (e)
    }
    return t.tag === 3 ? n : null
}
function Ia(e) {
    if (e.tag === 13) {
        var t = e.memoizedState;
        if (t === null && (e = e.alternate,
        e !== null && (t = e.memoizedState)),
        t !== null)
            return t.dehydrated
    }
    return null
}
function ls(e) {
    if (Ut(e) !== e)
        throw Error(E(188))
}
function ld(e) {
    var t = e.alternate;
    if (!t) {
        if (t = Ut(e),
        t === null)
            throw Error(E(188));
        return t !== e ? null : e
    }
    for (var n = e, r = t; ; ) {
        var l = n.return;
        if (l === null)
            break;
        var i = l.alternate;
        if (i === null) {
            if (r = l.return,
            r !== null) {
                n = r;
                continue
            }
            break
        }
        if (l.child === i.child) {
            for (i = l.child; i; ) {
                if (i === n)
                    return ls(l),
                    e;
                if (i === r)
                    return ls(l),
                    t;
                i = i.sibling
            }
            throw Error(E(188))
        }
        if (n.return !== r.return)
            n = l,
            r = i;
        else {
            for (var o = !1, a = l.child; a; ) {
                if (a === n) {
                    o = !0,
                    n = l,
                    r = i;
                    break
                }
                if (a === r) {
                    o = !0,
                    r = l,
                    n = i;
                    break
                }
                a = a.sibling
            }
            if (!o) {
                for (a = i.child; a; ) {
                    if (a === n) {
                        o = !0,
                        n = i,
                        r = l;
                        break
                    }
                    if (a === r) {
                        o = !0,
                        r = i,
                        n = l;
                        break
                    }
                    a = a.sibling
                }
                if (!o)
                    throw Error(E(189))
            }
        }
        if (n.alternate !== r)
            throw Error(E(190))
    }
    if (n.tag !== 3)
        throw Error(E(188));
    return n.stateNode.current === n ? e : t
}
function La(e) {
    return e = ld(e),
    e !== null ? Wa(e) : null
}
function Wa(e) {
    if (e.tag === 5 || e.tag === 6)
        return e;
    for (e = e.child; e !== null; ) {
        var t = Wa(e);
        if (t !== null)
            return t;
        e = e.sibling
    }
    return null
}
var Da = ze.unstable_scheduleCallback
  , is = ze.unstable_cancelCallback
  , id = ze.unstable_shouldYield
  , od = ze.unstable_requestPaint
  , Z = ze.unstable_now
  , sd = ze.unstable_getCurrentPriorityLevel
  , ao = ze.unstable_ImmediatePriority
  , Fa = ze.unstable_UserBlockingPriority
  , Kr = ze.unstable_NormalPriority
  , ad = ze.unstable_LowPriority
  , Aa = ze.unstable_IdlePriority
  , hl = null
  , Qe = null;
function ud(e) {
    if (Qe && typeof Qe.onCommitFiberRoot == "function")
        try {
            Qe.onCommitFiberRoot(hl, e, void 0, (e.current.flags & 128) === 128)
        } catch {}
}
var Oe = Math.clz32 ? Math.clz32 : fd
  , cd = Math.log
  , dd = Math.LN2;
function fd(e) {
    return e >>>= 0,
    e === 0 ? 32 : 31 - (cd(e) / dd | 0) | 0
}
var xr = 64
  , vr = 4194304;
function Rn(e) {
    switch (e & -e) {
    case 1:
        return 1;
    case 2:
        return 2;
    case 4:
        return 4;
    case 8:
        return 8;
    case 16:
        return 16;
    case 32:
        return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
        return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
        return e & 130023424;
    case 134217728:
        return 134217728;
    case 268435456:
        return 268435456;
    case 536870912:
        return 536870912;
    case 1073741824:
        return 1073741824;
    default:
        return e
    }
}
function Qr(e, t) {
    var n = e.pendingLanes;
    if (n === 0)
        return 0;
    var r = 0
      , l = e.suspendedLanes
      , i = e.pingedLanes
      , o = n & 268435455;
    if (o !== 0) {
        var a = o & ~l;
        a !== 0 ? r = Rn(a) : (i &= o,
        i !== 0 && (r = Rn(i)))
    } else
        o = n & ~l,
        o !== 0 ? r = Rn(o) : i !== 0 && (r = Rn(i));
    if (r === 0)
        return 0;
    if (t !== 0 && t !== r && !(t & l) && (l = r & -r,
    i = t & -t,
    l >= i || l === 16 && (i & 4194240) !== 0))
        return t;
    if (r & 4 && (r |= n & 16),
    t = e.entangledLanes,
    t !== 0)
        for (e = e.entanglements,
        t &= r; 0 < t; )
            n = 31 - Oe(t),
            l = 1 << n,
            r |= e[n],
            t &= ~l;
    return r
}
function pd(e, t) {
    switch (e) {
    case 1:
    case 2:
    case 4:
        return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
        return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
        return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
        return -1;
    default:
        return -1
    }
}
function hd(e, t) {
    for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, i = e.pendingLanes; 0 < i; ) {
        var o = 31 - Oe(i)
          , a = 1 << o
          , u = l[o];
        u === -1 ? (!(a & n) || a & r) && (l[o] = pd(a, t)) : u <= t && (e.expiredLanes |= a),
        i &= ~a
    }
}
function wi(e) {
    return e = e.pendingLanes & -1073741825,
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
}
function Oa() {
    var e = xr;
    return xr <<= 1,
    !(xr & 4194240) && (xr = 64),
    e
}
function Il(e) {
    for (var t = [], n = 0; 31 > n; n++)
        t.push(e);
    return t
}
function ar(e, t, n) {
    e.pendingLanes |= t,
    t !== 536870912 && (e.suspendedLanes = 0,
    e.pingedLanes = 0),
    e = e.eventTimes,
    t = 31 - Oe(t),
    e[t] = n
}
function gd(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t,
    e.suspendedLanes = 0,
    e.pingedLanes = 0,
    e.expiredLanes &= t,
    e.mutableReadLanes &= t,
    e.entangledLanes &= t,
    t = e.entanglements;
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n; ) {
        var l = 31 - Oe(n)
          , i = 1 << l;
        t[l] = 0,
        r[l] = -1,
        e[l] = -1,
        n &= ~i
    }
}
function uo(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
        var r = 31 - Oe(n)
          , l = 1 << r;
        l & t | e[r] & t && (e[r] |= t),
        n &= ~l
    }
}
var O = 0;
function Ua(e) {
    return e &= -e,
    1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1
}
var Ha, co, $a, Va, Ka, Si = !1, wr = [], ht = null, gt = null, mt = null, Qn = new Map, Yn = new Map, ut = [], md = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function os(e, t) {
    switch (e) {
    case "focusin":
    case "focusout":
        ht = null;
        break;
    case "dragenter":
    case "dragleave":
        gt = null;
        break;
    case "mouseover":
    case "mouseout":
        mt = null;
        break;
    case "pointerover":
    case "pointerout":
        Qn.delete(t.pointerId);
        break;
    case "gotpointercapture":
    case "lostpointercapture":
        Yn.delete(t.pointerId)
    }
}
function Cn(e, t, n, r, l, i) {
    return e === null || e.nativeEvent !== i ? (e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: i,
        targetContainers: [l]
    },
    t !== null && (t = cr(t),
    t !== null && co(t)),
    e) : (e.eventSystemFlags |= r,
    t = e.targetContainers,
    l !== null && t.indexOf(l) === -1 && t.push(l),
    e)
}
function yd(e, t, n, r, l) {
    switch (t) {
    case "focusin":
        return ht = Cn(ht, e, t, n, r, l),
        !0;
    case "dragenter":
        return gt = Cn(gt, e, t, n, r, l),
        !0;
    case "mouseover":
        return mt = Cn(mt, e, t, n, r, l),
        !0;
    case "pointerover":
        var i = l.pointerId;
        return Qn.set(i, Cn(Qn.get(i) || null, e, t, n, r, l)),
        !0;
    case "gotpointercapture":
        return i = l.pointerId,
        Yn.set(i, Cn(Yn.get(i) || null, e, t, n, r, l)),
        !0
    }
    return !1
}
function Qa(e) {
    var t = bt(e.target);
    if (t !== null) {
        var n = Ut(t);
        if (n !== null) {
            if (t = n.tag,
            t === 13) {
                if (t = Ia(n),
                t !== null) {
                    e.blockedOn = t,
                    Ka(e.priority, function() {
                        $a(n)
                    });
                    return
                }
            } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
                e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
                return
            }
        }
    }
    e.blockedOn = null
}
function Rr(e) {
    if (e.blockedOn !== null)
        return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
        var n = ki(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
        if (n === null) {
            n = e.nativeEvent;
            var r = new n.constructor(n.type,n);
            mi = r,
            n.target.dispatchEvent(r),
            mi = null
        } else
            return t = cr(n),
            t !== null && co(t),
            e.blockedOn = n,
            !1;
        t.shift()
    }
    return !0
}
function ss(e, t, n) {
    Rr(e) && n.delete(t)
}
function xd() {
    Si = !1,
    ht !== null && Rr(ht) && (ht = null),
    gt !== null && Rr(gt) && (gt = null),
    mt !== null && Rr(mt) && (mt = null),
    Qn.forEach(ss),
    Yn.forEach(ss)
}
function En(e, t) {
    e.blockedOn === t && (e.blockedOn = null,
    Si || (Si = !0,
    ze.unstable_scheduleCallback(ze.unstable_NormalPriority, xd)))
}
function Gn(e) {
    function t(l) {
        return En(l, e)
    }
    if (0 < wr.length) {
        En(wr[0], e);
        for (var n = 1; n < wr.length; n++) {
            var r = wr[n];
            r.blockedOn === e && (r.blockedOn = null)
        }
    }
    for (ht !== null && En(ht, e),
    gt !== null && En(gt, e),
    mt !== null && En(mt, e),
    Qn.forEach(t),
    Yn.forEach(t),
    n = 0; n < ut.length; n++)
        r = ut[n],
        r.blockedOn === e && (r.blockedOn = null);
    for (; 0 < ut.length && (n = ut[0],
    n.blockedOn === null); )
        Qa(n),
        n.blockedOn === null && ut.shift()
}
var an = it.ReactCurrentBatchConfig
  , Yr = !0;
function vd(e, t, n, r) {
    var l = O
      , i = an.transition;
    an.transition = null;
    try {
        O = 1,
        fo(e, t, n, r)
    } finally {
        O = l,
        an.transition = i
    }
}
function wd(e, t, n, r) {
    var l = O
      , i = an.transition;
    an.transition = null;
    try {
        O = 4,
        fo(e, t, n, r)
    } finally {
        O = l,
        an.transition = i
    }
}
function fo(e, t, n, r) {
    if (Yr) {
        var l = ki(e, t, n, r);
        if (l === null)
            Vl(e, t, r, Gr, n),
            os(e, r);
        else if (yd(l, e, t, n, r))
            r.stopPropagation();
        else if (os(e, r),
        t & 4 && -1 < md.indexOf(e)) {
            for (; l !== null; ) {
                var i = cr(l);
                if (i !== null && Ha(i),
                i = ki(e, t, n, r),
                i === null && Vl(e, t, r, Gr, n),
                i === l)
                    break;
                l = i
            }
            l !== null && r.stopPropagation()
        } else
            Vl(e, t, r, null, n)
    }
}
var Gr = null;
function ki(e, t, n, r) {
    if (Gr = null,
    e = so(r),
    e = bt(e),
    e !== null)
        if (t = Ut(e),
        t === null)
            e = null;
        else if (n = t.tag,
        n === 13) {
            if (e = Ia(t),
            e !== null)
                return e;
            e = null
        } else if (n === 3) {
            if (t.stateNode.current.memoizedState.isDehydrated)
                return t.tag === 3 ? t.stateNode.containerInfo : null;
            e = null
        } else
            t !== e && (e = null);
    return Gr = e,
    null
}
function Ya(e) {
    switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
        return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
        return 4;
    case "message":
        switch (sd()) {
        case ao:
            return 1;
        case Fa:
            return 4;
        case Kr:
        case ad:
            return 16;
        case Aa:
            return 536870912;
        default:
            return 16
        }
    default:
        return 16
    }
}
var dt = null
  , po = null
  , Nr = null;
function Ga() {
    if (Nr)
        return Nr;
    var e, t = po, n = t.length, r, l = "value"in dt ? dt.value : dt.textContent, i = l.length;
    for (e = 0; e < n && t[e] === l[e]; e++)
        ;
    var o = n - e;
    for (r = 1; r <= o && t[n - r] === l[i - r]; r++)
        ;
    return Nr = l.slice(e, 1 < r ? 1 - r : void 0)
}
function Ir(e) {
    var t = e.keyCode;
    return "charCode"in e ? (e = e.charCode,
    e === 0 && t === 13 && (e = 13)) : e = t,
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
}
function Sr() {
    return !0
}
function as() {
    return !1
}
function Be(e) {
    function t(n, r, l, i, o) {
        this._reactName = n,
        this._targetInst = l,
        this.type = r,
        this.nativeEvent = i,
        this.target = o,
        this.currentTarget = null;
        for (var a in e)
            e.hasOwnProperty(a) && (n = e[a],
            this[a] = n ? n(i) : i[a]);
        return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? Sr : as,
        this.isPropagationStopped = as,
        this
    }
    return J(t.prototype, {
        preventDefault: function() {
            this.defaultPrevented = !0;
            var n = this.nativeEvent;
            n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1),
            this.isDefaultPrevented = Sr)
        },
        stopPropagation: function() {
            var n = this.nativeEvent;
            n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
            this.isPropagationStopped = Sr)
        },
        persist: function() {},
        isPersistent: Sr
    }),
    t
}
var Sn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
        return e.timeStamp || Date.now()
    },
    defaultPrevented: 0,
    isTrusted: 0
}, ho = Be(Sn), ur = J({}, Sn, {
    view: 0,
    detail: 0
}), Sd = Be(ur), Ll, Wl, zn, gl = J({}, ur, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: go,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget
    },
    movementX: function(e) {
        return "movementX"in e ? e.movementX : (e !== zn && (zn && e.type === "mousemove" ? (Ll = e.screenX - zn.screenX,
        Wl = e.screenY - zn.screenY) : Wl = Ll = 0,
        zn = e),
        Ll)
    },
    movementY: function(e) {
        return "movementY"in e ? e.movementY : Wl
    }
}), us = Be(gl), kd = J({}, gl, {
    dataTransfer: 0
}), jd = Be(kd), _d = J({}, ur, {
    relatedTarget: 0
}), Dl = Be(_d), Cd = J({}, Sn, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
}), Ed = Be(Cd), zd = J({}, Sn, {
    clipboardData: function(e) {
        return "clipboardData"in e ? e.clipboardData : window.clipboardData
    }
}), Pd = Be(zd), Bd = J({}, Sn, {
    data: 0
}), cs = Be(Bd), Td = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
}, bd = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
}, Md = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
};
function Rd(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Md[e]) ? !!t[e] : !1
}
function go() {
    return Rd
}
var Nd = J({}, ur, {
    key: function(e) {
        if (e.key) {
            var t = Td[e.key] || e.key;
            if (t !== "Unidentified")
                return t
        }
        return e.type === "keypress" ? (e = Ir(e),
        e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? bd[e.keyCode] || "Unidentified" : ""
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: go,
    charCode: function(e) {
        return e.type === "keypress" ? Ir(e) : 0
    },
    keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
    },
    which: function(e) {
        return e.type === "keypress" ? Ir(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
    }
})
  , Id = Be(Nd)
  , Ld = J({}, gl, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
})
  , ds = Be(Ld)
  , Wd = J({}, ur, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: go
})
  , Dd = Be(Wd)
  , Fd = J({}, Sn, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
})
  , Ad = Be(Fd)
  , Od = J({}, gl, {
    deltaX: function(e) {
        return "deltaX"in e ? e.deltaX : "wheelDeltaX"in e ? -e.wheelDeltaX : 0
    },
    deltaY: function(e) {
        return "deltaY"in e ? e.deltaY : "wheelDeltaY"in e ? -e.wheelDeltaY : "wheelDelta"in e ? -e.wheelDelta : 0
    },
    deltaZ: 0,
    deltaMode: 0
})
  , Ud = Be(Od)
  , Hd = [9, 13, 27, 32]
  , mo = et && "CompositionEvent"in window
  , Wn = null;
et && "documentMode"in document && (Wn = document.documentMode);
var $d = et && "TextEvent"in window && !Wn
  , Ja = et && (!mo || Wn && 8 < Wn && 11 >= Wn)
  , fs = " "
  , ps = !1;
function Xa(e, t) {
    switch (e) {
    case "keyup":
        return Hd.indexOf(t.keyCode) !== -1;
    case "keydown":
        return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
        return !0;
    default:
        return !1
    }
}
function Za(e) {
    return e = e.detail,
    typeof e == "object" && "data"in e ? e.data : null
}
var Yt = !1;
function Vd(e, t) {
    switch (e) {
    case "compositionend":
        return Za(t);
    case "keypress":
        return t.which !== 32 ? null : (ps = !0,
        fs);
    case "textInput":
        return e = t.data,
        e === fs && ps ? null : e;
    default:
        return null
    }
}
function Kd(e, t) {
    if (Yt)
        return e === "compositionend" || !mo && Xa(e, t) ? (e = Ga(),
        Nr = po = dt = null,
        Yt = !1,
        e) : null;
    switch (e) {
    case "paste":
        return null;
    case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
            if (t.char && 1 < t.char.length)
                return t.char;
            if (t.which)
                return String.fromCharCode(t.which)
        }
        return null;
    case "compositionend":
        return Ja && t.locale !== "ko" ? null : t.data;
    default:
        return null
    }
}
var Qd = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
};
function hs(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Qd[e.type] : t === "textarea"
}
function qa(e, t, n, r) {
    Ta(r),
    t = Jr(t, "onChange"),
    0 < t.length && (n = new ho("onChange","change",null,n,r),
    e.push({
        event: n,
        listeners: t
    }))
}
var Dn = null
  , Jn = null;
function Yd(e) {
    cu(e, 0)
}
function ml(e) {
    var t = Xt(e);
    if (ja(t))
        return e
}
function Gd(e, t) {
    if (e === "change")
        return t
}
var eu = !1;
if (et) {
    var Fl;
    if (et) {
        var Al = "oninput"in document;
        if (!Al) {
            var gs = document.createElement("div");
            gs.setAttribute("oninput", "return;"),
            Al = typeof gs.oninput == "function"
        }
        Fl = Al
    } else
        Fl = !1;
    eu = Fl && (!document.documentMode || 9 < document.documentMode)
}
function ms() {
    Dn && (Dn.detachEvent("onpropertychange", tu),
    Jn = Dn = null)
}
function tu(e) {
    if (e.propertyName === "value" && ml(Jn)) {
        var t = [];
        qa(t, Jn, e, so(e)),
        Na(Yd, t)
    }
}
function Jd(e, t, n) {
    e === "focusin" ? (ms(),
    Dn = t,
    Jn = n,
    Dn.attachEvent("onpropertychange", tu)) : e === "focusout" && ms()
}
function Xd(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return ml(Jn)
}
function Zd(e, t) {
    if (e === "click")
        return ml(t)
}
function qd(e, t) {
    if (e === "input" || e === "change")
        return ml(t)
}
function ef(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t
}
var He = typeof Object.is == "function" ? Object.is : ef;
function Xn(e, t) {
    if (He(e, t))
        return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
        return !1;
    var n = Object.keys(e)
      , r = Object.keys(t);
    if (n.length !== r.length)
        return !1;
    for (r = 0; r < n.length; r++) {
        var l = n[r];
        if (!li.call(t, l) || !He(e[l], t[l]))
            return !1
    }
    return !0
}
function ys(e) {
    for (; e && e.firstChild; )
        e = e.firstChild;
    return e
}
function xs(e, t) {
    var n = ys(e);
    e = 0;
    for (var r; n; ) {
        if (n.nodeType === 3) {
            if (r = e + n.textContent.length,
            e <= t && r >= t)
                return {
                    node: n,
                    offset: t - e
                };
            e = r
        }
        e: {
            for (; n; ) {
                if (n.nextSibling) {
                    n = n.nextSibling;
                    break e
                }
                n = n.parentNode
            }
            n = void 0
        }
        n = ys(n)
    }
}
function nu(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? nu(e, t.parentNode) : "contains"in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1
}
function ru() {
    for (var e = window, t = Hr(); t instanceof e.HTMLIFrameElement; ) {
        try {
            var n = typeof t.contentWindow.location.href == "string"
        } catch {
            n = !1
        }
        if (n)
            e = t.contentWindow;
        else
            break;
        t = Hr(e.document)
    }
    return t
}
function yo(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true")
}
function tf(e) {
    var t = ru()
      , n = e.focusedElem
      , r = e.selectionRange;
    if (t !== n && n && n.ownerDocument && nu(n.ownerDocument.documentElement, n)) {
        if (r !== null && yo(n)) {
            if (t = r.start,
            e = r.end,
            e === void 0 && (e = t),
            "selectionStart"in n)
                n.selectionStart = t,
                n.selectionEnd = Math.min(e, n.value.length);
            else if (e = (t = n.ownerDocument || document) && t.defaultView || window,
            e.getSelection) {
                e = e.getSelection();
                var l = n.textContent.length
                  , i = Math.min(r.start, l);
                r = r.end === void 0 ? i : Math.min(r.end, l),
                !e.extend && i > r && (l = r,
                r = i,
                i = l),
                l = xs(n, i);
                var o = xs(n, r);
                l && o && (e.rangeCount !== 1 || e.anchorNode !== l.node || e.anchorOffset !== l.offset || e.focusNode !== o.node || e.focusOffset !== o.offset) && (t = t.createRange(),
                t.setStart(l.node, l.offset),
                e.removeAllRanges(),
                i > r ? (e.addRange(t),
                e.extend(o.node, o.offset)) : (t.setEnd(o.node, o.offset),
                e.addRange(t)))
            }
        }
        for (t = [],
        e = n; e = e.parentNode; )
            e.nodeType === 1 && t.push({
                element: e,
                left: e.scrollLeft,
                top: e.scrollTop
            });
        for (typeof n.focus == "function" && n.focus(),
        n = 0; n < t.length; n++)
            e = t[n],
            e.element.scrollLeft = e.left,
            e.element.scrollTop = e.top
    }
}
var nf = et && "documentMode"in document && 11 >= document.documentMode
  , Gt = null
  , ji = null
  , Fn = null
  , _i = !1;
function vs(e, t, n) {
    var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    _i || Gt == null || Gt !== Hr(r) || (r = Gt,
    "selectionStart"in r && yo(r) ? r = {
        start: r.selectionStart,
        end: r.selectionEnd
    } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(),
    r = {
        anchorNode: r.anchorNode,
        anchorOffset: r.anchorOffset,
        focusNode: r.focusNode,
        focusOffset: r.focusOffset
    }),
    Fn && Xn(Fn, r) || (Fn = r,
    r = Jr(ji, "onSelect"),
    0 < r.length && (t = new ho("onSelect","select",null,t,n),
    e.push({
        event: t,
        listeners: r
    }),
    t.target = Gt)))
}
function kr(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(),
    n["Webkit" + e] = "webkit" + t,
    n["Moz" + e] = "moz" + t,
    n
}
var Jt = {
    animationend: kr("Animation", "AnimationEnd"),
    animationiteration: kr("Animation", "AnimationIteration"),
    animationstart: kr("Animation", "AnimationStart"),
    transitionend: kr("Transition", "TransitionEnd")
}
  , Ol = {}
  , lu = {};
et && (lu = document.createElement("div").style,
"AnimationEvent"in window || (delete Jt.animationend.animation,
delete Jt.animationiteration.animation,
delete Jt.animationstart.animation),
"TransitionEvent"in window || delete Jt.transitionend.transition);
function yl(e) {
    if (Ol[e])
        return Ol[e];
    if (!Jt[e])
        return e;
    var t = Jt[e], n;
    for (n in t)
        if (t.hasOwnProperty(n) && n in lu)
            return Ol[e] = t[n];
    return e
}
var iu = yl("animationend")
  , ou = yl("animationiteration")
  , su = yl("animationstart")
  , au = yl("transitionend")
  , uu = new Map
  , ws = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function _t(e, t) {
    uu.set(e, t),
    Ot(t, [e])
}
for (var Ul = 0; Ul < ws.length; Ul++) {
    var Hl = ws[Ul]
      , rf = Hl.toLowerCase()
      , lf = Hl[0].toUpperCase() + Hl.slice(1);
    _t(rf, "on" + lf)
}
_t(iu, "onAnimationEnd");
_t(ou, "onAnimationIteration");
_t(su, "onAnimationStart");
_t("dblclick", "onDoubleClick");
_t("focusin", "onFocus");
_t("focusout", "onBlur");
_t(au, "onTransitionEnd");
dn("onMouseEnter", ["mouseout", "mouseover"]);
dn("onMouseLeave", ["mouseout", "mouseover"]);
dn("onPointerEnter", ["pointerout", "pointerover"]);
dn("onPointerLeave", ["pointerout", "pointerover"]);
Ot("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Ot("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Ot("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Ot("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Ot("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Ot("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Nn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" ")
  , of = new Set("cancel close invalid load scroll toggle".split(" ").concat(Nn));
function Ss(e, t, n) {
    var r = e.type || "unknown-event";
    e.currentTarget = n,
    rd(r, t, void 0, e),
    e.currentTarget = null
}
function cu(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
        var r = e[n]
          , l = r.event;
        r = r.listeners;
        e: {
            var i = void 0;
            if (t)
                for (var o = r.length - 1; 0 <= o; o--) {
                    var a = r[o]
                      , u = a.instance
                      , c = a.currentTarget;
                    if (a = a.listener,
                    u !== i && l.isPropagationStopped())
                        break e;
                    Ss(l, a, c),
                    i = u
                }
            else
                for (o = 0; o < r.length; o++) {
                    if (a = r[o],
                    u = a.instance,
                    c = a.currentTarget,
                    a = a.listener,
                    u !== i && l.isPropagationStopped())
                        break e;
                    Ss(l, a, c),
                    i = u
                }
        }
    }
    if (Vr)
        throw e = vi,
        Vr = !1,
        vi = null,
        e
}
function $(e, t) {
    var n = t[Bi];
    n === void 0 && (n = t[Bi] = new Set);
    var r = e + "__bubble";
    n.has(r) || (du(t, e, 2, !1),
    n.add(r))
}
function $l(e, t, n) {
    var r = 0;
    t && (r |= 4),
    du(n, e, r, t)
}
var jr = "_reactListening" + Math.random().toString(36).slice(2);
function Zn(e) {
    if (!e[jr]) {
        e[jr] = !0,
        xa.forEach(function(n) {
            n !== "selectionchange" && (of.has(n) || $l(n, !1, e),
            $l(n, !0, e))
        });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[jr] || (t[jr] = !0,
        $l("selectionchange", !1, t))
    }
}
function du(e, t, n, r) {
    switch (Ya(t)) {
    case 1:
        var l = vd;
        break;
    case 4:
        l = wd;
        break;
    default:
        l = fo
    }
    n = l.bind(null, t, n, e),
    l = void 0,
    !xi || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0),
    r ? l !== void 0 ? e.addEventListener(t, n, {
        capture: !0,
        passive: l
    }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, {
        passive: l
    }) : e.addEventListener(t, n, !1)
}
function Vl(e, t, n, r, l) {
    var i = r;
    if (!(t & 1) && !(t & 2) && r !== null)
        e: for (; ; ) {
            if (r === null)
                return;
            var o = r.tag;
            if (o === 3 || o === 4) {
                var a = r.stateNode.containerInfo;
                if (a === l || a.nodeType === 8 && a.parentNode === l)
                    break;
                if (o === 4)
                    for (o = r.return; o !== null; ) {
                        var u = o.tag;
                        if ((u === 3 || u === 4) && (u = o.stateNode.containerInfo,
                        u === l || u.nodeType === 8 && u.parentNode === l))
                            return;
                        o = o.return
                    }
                for (; a !== null; ) {
                    if (o = bt(a),
                    o === null)
                        return;
                    if (u = o.tag,
                    u === 5 || u === 6) {
                        r = i = o;
                        continue e
                    }
                    a = a.parentNode
                }
            }
            r = r.return
        }
    Na(function() {
        var c = i
          , f = so(n)
          , m = [];
        e: {
            var p = uu.get(e);
            if (p !== void 0) {
                var y = ho
                  , k = e;
                switch (e) {
                case "keypress":
                    if (Ir(n) === 0)
                        break e;
                case "keydown":
                case "keyup":
                    y = Id;
                    break;
                case "focusin":
                    k = "focus",
                    y = Dl;
                    break;
                case "focusout":
                    k = "blur",
                    y = Dl;
                    break;
                case "beforeblur":
                case "afterblur":
                    y = Dl;
                    break;
                case "click":
                    if (n.button === 2)
                        break e;
                case "auxclick":
                case "dblclick":
                case "mousedown":
                case "mousemove":
                case "mouseup":
                case "mouseout":
                case "mouseover":
                case "contextmenu":
                    y = us;
                    break;
                case "drag":
                case "dragend":
                case "dragenter":
                case "dragexit":
                case "dragleave":
                case "dragover":
                case "dragstart":
                case "drop":
                    y = jd;
                    break;
                case "touchcancel":
                case "touchend":
                case "touchmove":
                case "touchstart":
                    y = Dd;
                    break;
                case iu:
                case ou:
                case su:
                    y = Ed;
                    break;
                case au:
                    y = Ad;
                    break;
                case "scroll":
                    y = Sd;
                    break;
                case "wheel":
                    y = Ud;
                    break;
                case "copy":
                case "cut":
                case "paste":
                    y = Pd;
                    break;
                case "gotpointercapture":
                case "lostpointercapture":
                case "pointercancel":
                case "pointerdown":
                case "pointermove":
                case "pointerout":
                case "pointerover":
                case "pointerup":
                    y = ds
                }
                var _ = (t & 4) !== 0
                  , z = !_ && e === "scroll"
                  , h = _ ? p !== null ? p + "Capture" : null : p;
                _ = [];
                for (var d = c, g; d !== null; ) {
                    g = d;
                    var x = g.stateNode;
                    if (g.tag === 5 && x !== null && (g = x,
                    h !== null && (x = Kn(d, h),
                    x != null && _.push(qn(d, x, g)))),
                    z)
                        break;
                    d = d.return
                }
                0 < _.length && (p = new y(p,k,null,n,f),
                m.push({
                    event: p,
                    listeners: _
                }))
            }
        }
        if (!(t & 7)) {
            e: {
                if (p = e === "mouseover" || e === "pointerover",
                y = e === "mouseout" || e === "pointerout",
                p && n !== mi && (k = n.relatedTarget || n.fromElement) && (bt(k) || k[tt]))
                    break e;
                if ((y || p) && (p = f.window === f ? f : (p = f.ownerDocument) ? p.defaultView || p.parentWindow : window,
                y ? (k = n.relatedTarget || n.toElement,
                y = c,
                k = k ? bt(k) : null,
                k !== null && (z = Ut(k),
                k !== z || k.tag !== 5 && k.tag !== 6) && (k = null)) : (y = null,
                k = c),
                y !== k)) {
                    if (_ = us,
                    x = "onMouseLeave",
                    h = "onMouseEnter",
                    d = "mouse",
                    (e === "pointerout" || e === "pointerover") && (_ = ds,
                    x = "onPointerLeave",
                    h = "onPointerEnter",
                    d = "pointer"),
                    z = y == null ? p : Xt(y),
                    g = k == null ? p : Xt(k),
                    p = new _(x,d + "leave",y,n,f),
                    p.target = z,
                    p.relatedTarget = g,
                    x = null,
                    bt(f) === c && (_ = new _(h,d + "enter",k,n,f),
                    _.target = g,
                    _.relatedTarget = z,
                    x = _),
                    z = x,
                    y && k)
                        t: {
                            for (_ = y,
                            h = k,
                            d = 0,
                            g = _; g; g = $t(g))
                                d++;
                            for (g = 0,
                            x = h; x; x = $t(x))
                                g++;
                            for (; 0 < d - g; )
                                _ = $t(_),
                                d--;
                            for (; 0 < g - d; )
                                h = $t(h),
                                g--;
                            for (; d--; ) {
                                if (_ === h || h !== null && _ === h.alternate)
                                    break t;
                                _ = $t(_),
                                h = $t(h)
                            }
                            _ = null
                        }
                    else
                        _ = null;
                    y !== null && ks(m, p, y, _, !1),
                    k !== null && z !== null && ks(m, z, k, _, !0)
                }
            }
            e: {
                if (p = c ? Xt(c) : window,
                y = p.nodeName && p.nodeName.toLowerCase(),
                y === "select" || y === "input" && p.type === "file")
                    var C = Gd;
                else if (hs(p))
                    if (eu)
                        C = qd;
                    else {
                        C = Xd;
                        var j = Jd
                    }
                else
                    (y = p.nodeName) && y.toLowerCase() === "input" && (p.type === "checkbox" || p.type === "radio") && (C = Zd);
                if (C && (C = C(e, c))) {
                    qa(m, C, n, f);
                    break e
                }
                j && j(e, p, c),
                e === "focusout" && (j = p._wrapperState) && j.controlled && p.type === "number" && di(p, "number", p.value)
            }
            switch (j = c ? Xt(c) : window,
            e) {
            case "focusin":
                (hs(j) || j.contentEditable === "true") && (Gt = j,
                ji = c,
                Fn = null);
                break;
            case "focusout":
                Fn = ji = Gt = null;
                break;
            case "mousedown":
                _i = !0;
                break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
                _i = !1,
                vs(m, n, f);
                break;
            case "selectionchange":
                if (nf)
                    break;
            case "keydown":
            case "keyup":
                vs(m, n, f)
            }
            var v;
            if (mo)
                e: {
                    switch (e) {
                    case "compositionstart":
                        var P = "onCompositionStart";
                        break e;
                    case "compositionend":
                        P = "onCompositionEnd";
                        break e;
                    case "compositionupdate":
                        P = "onCompositionUpdate";
                        break e
                    }
                    P = void 0
                }
            else
                Yt ? Xa(e, n) && (P = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (P = "onCompositionStart");
            P && (Ja && n.locale !== "ko" && (Yt || P !== "onCompositionStart" ? P === "onCompositionEnd" && Yt && (v = Ga()) : (dt = f,
            po = "value"in dt ? dt.value : dt.textContent,
            Yt = !0)),
            j = Jr(c, P),
            0 < j.length && (P = new cs(P,e,null,n,f),
            m.push({
                event: P,
                listeners: j
            }),
            v ? P.data = v : (v = Za(n),
            v !== null && (P.data = v)))),
            (v = $d ? Vd(e, n) : Kd(e, n)) && (c = Jr(c, "onBeforeInput"),
            0 < c.length && (f = new cs("onBeforeInput","beforeinput",null,n,f),
            m.push({
                event: f,
                listeners: c
            }),
            f.data = v))
        }
        cu(m, t)
    })
}
function qn(e, t, n) {
    return {
        instance: e,
        listener: t,
        currentTarget: n
    }
}
function Jr(e, t) {
    for (var n = t + "Capture", r = []; e !== null; ) {
        var l = e
          , i = l.stateNode;
        l.tag === 5 && i !== null && (l = i,
        i = Kn(e, n),
        i != null && r.unshift(qn(e, i, l)),
        i = Kn(e, t),
        i != null && r.push(qn(e, i, l))),
        e = e.return
    }
    return r
}
function $t(e) {
    if (e === null)
        return null;
    do
        e = e.return;
    while (e && e.tag !== 5);
    return e || null
}
function ks(e, t, n, r, l) {
    for (var i = t._reactName, o = []; n !== null && n !== r; ) {
        var a = n
          , u = a.alternate
          , c = a.stateNode;
        if (u !== null && u === r)
            break;
        a.tag === 5 && c !== null && (a = c,
        l ? (u = Kn(n, i),
        u != null && o.unshift(qn(n, u, a))) : l || (u = Kn(n, i),
        u != null && o.push(qn(n, u, a)))),
        n = n.return
    }
    o.length !== 0 && e.push({
        event: t,
        listeners: o
    })
}
var sf = /\r\n?/g
  , af = /\u0000|\uFFFD/g;
function js(e) {
    return (typeof e == "string" ? e : "" + e).replace(sf, `
`).replace(af, "")
}
function _r(e, t, n) {
    if (t = js(t),
    js(e) !== t && n)
        throw Error(E(425))
}
function Xr() {}
var Ci = null
  , Ei = null;
function zi(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null
}
var Pi = typeof setTimeout == "function" ? setTimeout : void 0
  , uf = typeof clearTimeout == "function" ? clearTimeout : void 0
  , _s = typeof Promise == "function" ? Promise : void 0
  , cf = typeof queueMicrotask == "function" ? queueMicrotask : typeof _s < "u" ? function(e) {
    return _s.resolve(null).then(e).catch(df)
}
: Pi;
function df(e) {
    setTimeout(function() {
        throw e
    })
}
function Kl(e, t) {
    var n = t
      , r = 0;
    do {
        var l = n.nextSibling;
        if (e.removeChild(n),
        l && l.nodeType === 8)
            if (n = l.data,
            n === "/$") {
                if (r === 0) {
                    e.removeChild(l),
                    Gn(t);
                    return
                }
                r--
            } else
                n !== "$" && n !== "$?" && n !== "$!" || r++;
        n = l
    } while (n);
    Gn(t)
}
function yt(e) {
    for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === 1 || t === 3)
            break;
        if (t === 8) {
            if (t = e.data,
            t === "$" || t === "$!" || t === "$?")
                break;
            if (t === "/$")
                return null
        }
    }
    return e
}
function Cs(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
        if (e.nodeType === 8) {
            var n = e.data;
            if (n === "$" || n === "$!" || n === "$?") {
                if (t === 0)
                    return e;
                t--
            } else
                n === "/$" && t++
        }
        e = e.previousSibling
    }
    return null
}
var kn = Math.random().toString(36).slice(2)
  , Ke = "__reactFiber$" + kn
  , er = "__reactProps$" + kn
  , tt = "__reactContainer$" + kn
  , Bi = "__reactEvents$" + kn
  , ff = "__reactListeners$" + kn
  , pf = "__reactHandles$" + kn;
function bt(e) {
    var t = e[Ke];
    if (t)
        return t;
    for (var n = e.parentNode; n; ) {
        if (t = n[tt] || n[Ke]) {
            if (n = t.alternate,
            t.child !== null || n !== null && n.child !== null)
                for (e = Cs(e); e !== null; ) {
                    if (n = e[Ke])
                        return n;
                    e = Cs(e)
                }
            return t
        }
        e = n,
        n = e.parentNode
    }
    return null
}
function cr(e) {
    return e = e[Ke] || e[tt],
    !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e
}
function Xt(e) {
    if (e.tag === 5 || e.tag === 6)
        return e.stateNode;
    throw Error(E(33))
}
function xl(e) {
    return e[er] || null
}
var Ti = []
  , Zt = -1;
function Ct(e) {
    return {
        current: e
    }
}
function V(e) {
    0 > Zt || (e.current = Ti[Zt],
    Ti[Zt] = null,
    Zt--)
}
function U(e, t) {
    Zt++,
    Ti[Zt] = e.current,
    e.current = t
}
var jt = {}
  , pe = Ct(jt)
  , Se = Ct(!1)
  , Lt = jt;
function fn(e, t) {
    var n = e.type.contextTypes;
    if (!n)
        return jt;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
        return r.__reactInternalMemoizedMaskedChildContext;
    var l = {}, i;
    for (i in n)
        l[i] = t[i];
    return r && (e = e.stateNode,
    e.__reactInternalMemoizedUnmaskedChildContext = t,
    e.__reactInternalMemoizedMaskedChildContext = l),
    l
}
function ke(e) {
    return e = e.childContextTypes,
    e != null
}
function Zr() {
    V(Se),
    V(pe)
}
function Es(e, t, n) {
    if (pe.current !== jt)
        throw Error(E(168));
    U(pe, t),
    U(Se, n)
}
function fu(e, t, n) {
    var r = e.stateNode;
    if (t = t.childContextTypes,
    typeof r.getChildContext != "function")
        return n;
    r = r.getChildContext();
    for (var l in r)
        if (!(l in t))
            throw Error(E(108, Jc(e) || "Unknown", l));
    return J({}, n, r)
}
function qr(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || jt,
    Lt = pe.current,
    U(pe, e),
    U(Se, Se.current),
    !0
}
function zs(e, t, n) {
    var r = e.stateNode;
    if (!r)
        throw Error(E(169));
    n ? (e = fu(e, t, Lt),
    r.__reactInternalMemoizedMergedChildContext = e,
    V(Se),
    V(pe),
    U(pe, e)) : V(Se),
    U(Se, n)
}
var Je = null
  , vl = !1
  , Ql = !1;
function pu(e) {
    Je === null ? Je = [e] : Je.push(e)
}
function hf(e) {
    vl = !0,
    pu(e)
}
function Et() {
    if (!Ql && Je !== null) {
        Ql = !0;
        var e = 0
          , t = O;
        try {
            var n = Je;
            for (O = 1; e < n.length; e++) {
                var r = n[e];
                do
                    r = r(!0);
                while (r !== null)
            }
            Je = null,
            vl = !1
        } catch (l) {
            throw Je !== null && (Je = Je.slice(e + 1)),
            Da(ao, Et),
            l
        } finally {
            O = t,
            Ql = !1
        }
    }
    return null
}
var qt = []
  , en = 0
  , el = null
  , tl = 0
  , be = []
  , Me = 0
  , Wt = null
  , Xe = 1
  , Ze = "";
function Bt(e, t) {
    qt[en++] = tl,
    qt[en++] = el,
    el = e,
    tl = t
}
function hu(e, t, n) {
    be[Me++] = Xe,
    be[Me++] = Ze,
    be[Me++] = Wt,
    Wt = e;
    var r = Xe;
    e = Ze;
    var l = 32 - Oe(r) - 1;
    r &= ~(1 << l),
    n += 1;
    var i = 32 - Oe(t) + l;
    if (30 < i) {
        var o = l - l % 5;
        i = (r & (1 << o) - 1).toString(32),
        r >>= o,
        l -= o,
        Xe = 1 << 32 - Oe(t) + l | n << l | r,
        Ze = i + e
    } else
        Xe = 1 << i | n << l | r,
        Ze = e
}
function xo(e) {
    e.return !== null && (Bt(e, 1),
    hu(e, 1, 0))
}
function vo(e) {
    for (; e === el; )
        el = qt[--en],
        qt[en] = null,
        tl = qt[--en],
        qt[en] = null;
    for (; e === Wt; )
        Wt = be[--Me],
        be[Me] = null,
        Ze = be[--Me],
        be[Me] = null,
        Xe = be[--Me],
        be[Me] = null
}
var Ee = null
  , Ce = null
  , K = !1
  , Ae = null;
function gu(e, t) {
    var n = Re(5, null, null, 0);
    n.elementType = "DELETED",
    n.stateNode = t,
    n.return = e,
    t = e.deletions,
    t === null ? (e.deletions = [n],
    e.flags |= 16) : t.push(n)
}
function Ps(e, t) {
    switch (e.tag) {
    case 5:
        var n = e.type;
        return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t,
        t !== null ? (e.stateNode = t,
        Ee = e,
        Ce = yt(t.firstChild),
        !0) : !1;
    case 6:
        return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t,
        t !== null ? (e.stateNode = t,
        Ee = e,
        Ce = null,
        !0) : !1;
    case 13:
        return t = t.nodeType !== 8 ? null : t,
        t !== null ? (n = Wt !== null ? {
            id: Xe,
            overflow: Ze
        } : null,
        e.memoizedState = {
            dehydrated: t,
            treeContext: n,
            retryLane: 1073741824
        },
        n = Re(18, null, null, 0),
        n.stateNode = t,
        n.return = e,
        e.child = n,
        Ee = e,
        Ce = null,
        !0) : !1;
    default:
        return !1
    }
}
function bi(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0
}
function Mi(e) {
    if (K) {
        var t = Ce;
        if (t) {
            var n = t;
            if (!Ps(e, t)) {
                if (bi(e))
                    throw Error(E(418));
                t = yt(n.nextSibling);
                var r = Ee;
                t && Ps(e, t) ? gu(r, n) : (e.flags = e.flags & -4097 | 2,
                K = !1,
                Ee = e)
            }
        } else {
            if (bi(e))
                throw Error(E(418));
            e.flags = e.flags & -4097 | 2,
            K = !1,
            Ee = e
        }
    }
}
function Bs(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
        e = e.return;
    Ee = e
}
function Cr(e) {
    if (e !== Ee)
        return !1;
    if (!K)
        return Bs(e),
        K = !0,
        !1;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type,
    t = t !== "head" && t !== "body" && !zi(e.type, e.memoizedProps)),
    t && (t = Ce)) {
        if (bi(e))
            throw mu(),
            Error(E(418));
        for (; t; )
            gu(e, t),
            t = yt(t.nextSibling)
    }
    if (Bs(e),
    e.tag === 13) {
        if (e = e.memoizedState,
        e = e !== null ? e.dehydrated : null,
        !e)
            throw Error(E(317));
        e: {
            for (e = e.nextSibling,
            t = 0; e; ) {
                if (e.nodeType === 8) {
                    var n = e.data;
                    if (n === "/$") {
                        if (t === 0) {
                            Ce = yt(e.nextSibling);
                            break e
                        }
                        t--
                    } else
                        n !== "$" && n !== "$!" && n !== "$?" || t++
                }
                e = e.nextSibling
            }
            Ce = null
        }
    } else
        Ce = Ee ? yt(e.stateNode.nextSibling) : null;
    return !0
}
function mu() {
    for (var e = Ce; e; )
        e = yt(e.nextSibling)
}
function pn() {
    Ce = Ee = null,
    K = !1
}
function wo(e) {
    Ae === null ? Ae = [e] : Ae.push(e)
}
var gf = it.ReactCurrentBatchConfig;
function Pn(e, t, n) {
    if (e = n.ref,
    e !== null && typeof e != "function" && typeof e != "object") {
        if (n._owner) {
            if (n = n._owner,
            n) {
                if (n.tag !== 1)
                    throw Error(E(309));
                var r = n.stateNode
            }
            if (!r)
                throw Error(E(147, e));
            var l = r
              , i = "" + e;
            return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === i ? t.ref : (t = function(o) {
                var a = l.refs;
                o === null ? delete a[i] : a[i] = o
            }
            ,
            t._stringRef = i,
            t)
        }
        if (typeof e != "string")
            throw Error(E(284));
        if (!n._owner)
            throw Error(E(290, e))
    }
    return e
}
function Er(e, t) {
    throw e = Object.prototype.toString.call(t),
    Error(E(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e))
}
function Ts(e) {
    var t = e._init;
    return t(e._payload)
}
function yu(e) {
    function t(h, d) {
        if (e) {
            var g = h.deletions;
            g === null ? (h.deletions = [d],
            h.flags |= 16) : g.push(d)
        }
    }
    function n(h, d) {
        if (!e)
            return null;
        for (; d !== null; )
            t(h, d),
            d = d.sibling;
        return null
    }
    function r(h, d) {
        for (h = new Map; d !== null; )
            d.key !== null ? h.set(d.key, d) : h.set(d.index, d),
            d = d.sibling;
        return h
    }
    function l(h, d) {
        return h = St(h, d),
        h.index = 0,
        h.sibling = null,
        h
    }
    function i(h, d, g) {
        return h.index = g,
        e ? (g = h.alternate,
        g !== null ? (g = g.index,
        g < d ? (h.flags |= 2,
        d) : g) : (h.flags |= 2,
        d)) : (h.flags |= 1048576,
        d)
    }
    function o(h) {
        return e && h.alternate === null && (h.flags |= 2),
        h
    }
    function a(h, d, g, x) {
        return d === null || d.tag !== 6 ? (d = ei(g, h.mode, x),
        d.return = h,
        d) : (d = l(d, g),
        d.return = h,
        d)
    }
    function u(h, d, g, x) {
        var C = g.type;
        return C === Qt ? f(h, d, g.props.children, x, g.key) : d !== null && (d.elementType === C || typeof C == "object" && C !== null && C.$$typeof === st && Ts(C) === d.type) ? (x = l(d, g.props),
        x.ref = Pn(h, d, g),
        x.return = h,
        x) : (x = Ur(g.type, g.key, g.props, null, h.mode, x),
        x.ref = Pn(h, d, g),
        x.return = h,
        x)
    }
    function c(h, d, g, x) {
        return d === null || d.tag !== 4 || d.stateNode.containerInfo !== g.containerInfo || d.stateNode.implementation !== g.implementation ? (d = ti(g, h.mode, x),
        d.return = h,
        d) : (d = l(d, g.children || []),
        d.return = h,
        d)
    }
    function f(h, d, g, x, C) {
        return d === null || d.tag !== 7 ? (d = It(g, h.mode, x, C),
        d.return = h,
        d) : (d = l(d, g),
        d.return = h,
        d)
    }
    function m(h, d, g) {
        if (typeof d == "string" && d !== "" || typeof d == "number")
            return d = ei("" + d, h.mode, g),
            d.return = h,
            d;
        if (typeof d == "object" && d !== null) {
            switch (d.$$typeof) {
            case gr:
                return g = Ur(d.type, d.key, d.props, null, h.mode, g),
                g.ref = Pn(h, null, d),
                g.return = h,
                g;
            case Kt:
                return d = ti(d, h.mode, g),
                d.return = h,
                d;
            case st:
                var x = d._init;
                return m(h, x(d._payload), g)
            }
            if (Mn(d) || jn(d))
                return d = It(d, h.mode, g, null),
                d.return = h,
                d;
            Er(h, d)
        }
        return null
    }
    function p(h, d, g, x) {
        var C = d !== null ? d.key : null;
        if (typeof g == "string" && g !== "" || typeof g == "number")
            return C !== null ? null : a(h, d, "" + g, x);
        if (typeof g == "object" && g !== null) {
            switch (g.$$typeof) {
            case gr:
                return g.key === C ? u(h, d, g, x) : null;
            case Kt:
                return g.key === C ? c(h, d, g, x) : null;
            case st:
                return C = g._init,
                p(h, d, C(g._payload), x)
            }
            if (Mn(g) || jn(g))
                return C !== null ? null : f(h, d, g, x, null);
            Er(h, g)
        }
        return null
    }
    function y(h, d, g, x, C) {
        if (typeof x == "string" && x !== "" || typeof x == "number")
            return h = h.get(g) || null,
            a(d, h, "" + x, C);
        if (typeof x == "object" && x !== null) {
            switch (x.$$typeof) {
            case gr:
                return h = h.get(x.key === null ? g : x.key) || null,
                u(d, h, x, C);
            case Kt:
                return h = h.get(x.key === null ? g : x.key) || null,
                c(d, h, x, C);
            case st:
                var j = x._init;
                return y(h, d, g, j(x._payload), C)
            }
            if (Mn(x) || jn(x))
                return h = h.get(g) || null,
                f(d, h, x, C, null);
            Er(d, x)
        }
        return null
    }
    function k(h, d, g, x) {
        for (var C = null, j = null, v = d, P = d = 0, I = null; v !== null && P < g.length; P++) {
            v.index > P ? (I = v,
            v = null) : I = v.sibling;
            var T = p(h, v, g[P], x);
            if (T === null) {
                v === null && (v = I);
                break
            }
            e && v && T.alternate === null && t(h, v),
            d = i(T, d, P),
            j === null ? C = T : j.sibling = T,
            j = T,
            v = I
        }
        if (P === g.length)
            return n(h, v),
            K && Bt(h, P),
            C;
        if (v === null) {
            for (; P < g.length; P++)
                v = m(h, g[P], x),
                v !== null && (d = i(v, d, P),
                j === null ? C = v : j.sibling = v,
                j = v);
            return K && Bt(h, P),
            C
        }
        for (v = r(h, v); P < g.length; P++)
            I = y(v, h, P, g[P], x),
            I !== null && (e && I.alternate !== null && v.delete(I.key === null ? P : I.key),
            d = i(I, d, P),
            j === null ? C = I : j.sibling = I,
            j = I);
        return e && v.forEach(function(H) {
            return t(h, H)
        }),
        K && Bt(h, P),
        C
    }
    function _(h, d, g, x) {
        var C = jn(g);
        if (typeof C != "function")
            throw Error(E(150));
        if (g = C.call(g),
        g == null)
            throw Error(E(151));
        for (var j = C = null, v = d, P = d = 0, I = null, T = g.next(); v !== null && !T.done; P++,
        T = g.next()) {
            v.index > P ? (I = v,
            v = null) : I = v.sibling;
            var H = p(h, v, T.value, x);
            if (H === null) {
                v === null && (v = I);
                break
            }
            e && v && H.alternate === null && t(h, v),
            d = i(H, d, P),
            j === null ? C = H : j.sibling = H,
            j = H,
            v = I
        }
        if (T.done)
            return n(h, v),
            K && Bt(h, P),
            C;
        if (v === null) {
            for (; !T.done; P++,
            T = g.next())
                T = m(h, T.value, x),
                T !== null && (d = i(T, d, P),
                j === null ? C = T : j.sibling = T,
                j = T);
            return K && Bt(h, P),
            C
        }
        for (v = r(h, v); !T.done; P++,
        T = g.next())
            T = y(v, h, P, T.value, x),
            T !== null && (e && T.alternate !== null && v.delete(T.key === null ? P : T.key),
            d = i(T, d, P),
            j === null ? C = T : j.sibling = T,
            j = T);
        return e && v.forEach(function(S) {
            return t(h, S)
        }),
        K && Bt(h, P),
        C
    }
    function z(h, d, g, x) {
        if (typeof g == "object" && g !== null && g.type === Qt && g.key === null && (g = g.props.children),
        typeof g == "object" && g !== null) {
            switch (g.$$typeof) {
            case gr:
                e: {
                    for (var C = g.key, j = d; j !== null; ) {
                        if (j.key === C) {
                            if (C = g.type,
                            C === Qt) {
                                if (j.tag === 7) {
                                    n(h, j.sibling),
                                    d = l(j, g.props.children),
                                    d.return = h,
                                    h = d;
                                    break e
                                }
                            } else if (j.elementType === C || typeof C == "object" && C !== null && C.$$typeof === st && Ts(C) === j.type) {
                                n(h, j.sibling),
                                d = l(j, g.props),
                                d.ref = Pn(h, j, g),
                                d.return = h,
                                h = d;
                                break e
                            }
                            n(h, j);
                            break
                        } else
                            t(h, j);
                        j = j.sibling
                    }
                    g.type === Qt ? (d = It(g.props.children, h.mode, x, g.key),
                    d.return = h,
                    h = d) : (x = Ur(g.type, g.key, g.props, null, h.mode, x),
                    x.ref = Pn(h, d, g),
                    x.return = h,
                    h = x)
                }
                return o(h);
            case Kt:
                e: {
                    for (j = g.key; d !== null; ) {
                        if (d.key === j)
                            if (d.tag === 4 && d.stateNode.containerInfo === g.containerInfo && d.stateNode.implementation === g.implementation) {
                                n(h, d.sibling),
                                d = l(d, g.children || []),
                                d.return = h,
                                h = d;
                                break e
                            } else {
                                n(h, d);
                                break
                            }
                        else
                            t(h, d);
                        d = d.sibling
                    }
                    d = ti(g, h.mode, x),
                    d.return = h,
                    h = d
                }
                return o(h);
            case st:
                return j = g._init,
                z(h, d, j(g._payload), x)
            }
            if (Mn(g))
                return k(h, d, g, x);
            if (jn(g))
                return _(h, d, g, x);
            Er(h, g)
        }
        return typeof g == "string" && g !== "" || typeof g == "number" ? (g = "" + g,
        d !== null && d.tag === 6 ? (n(h, d.sibling),
        d = l(d, g),
        d.return = h,
        h = d) : (n(h, d),
        d = ei(g, h.mode, x),
        d.return = h,
        h = d),
        o(h)) : n(h, d)
    }
    return z
}
var hn = yu(!0)
  , xu = yu(!1)
  , nl = Ct(null)
  , rl = null
  , tn = null
  , So = null;
function ko() {
    So = tn = rl = null
}
function jo(e) {
    var t = nl.current;
    V(nl),
    e._currentValue = t
}
function Ri(e, t, n) {
    for (; e !== null; ) {
        var r = e.alternate;
        if ((e.childLanes & t) !== t ? (e.childLanes |= t,
        r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
        e === n)
            break;
        e = e.return
    }
}
function un(e, t) {
    rl = e,
    So = tn = null,
    e = e.dependencies,
    e !== null && e.firstContext !== null && (e.lanes & t && (we = !0),
    e.firstContext = null)
}
function Ie(e) {
    var t = e._currentValue;
    if (So !== e)
        if (e = {
            context: e,
            memoizedValue: t,
            next: null
        },
        tn === null) {
            if (rl === null)
                throw Error(E(308));
            tn = e,
            rl.dependencies = {
                lanes: 0,
                firstContext: e
            }
        } else
            tn = tn.next = e;
    return t
}
var Mt = null;
function _o(e) {
    Mt === null ? Mt = [e] : Mt.push(e)
}
function vu(e, t, n, r) {
    var l = t.interleaved;
    return l === null ? (n.next = n,
    _o(t)) : (n.next = l.next,
    l.next = n),
    t.interleaved = n,
    nt(e, r)
}
function nt(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t),
    n = e,
    e = e.return; e !== null; )
        e.childLanes |= t,
        n = e.alternate,
        n !== null && (n.childLanes |= t),
        n = e,
        e = e.return;
    return n.tag === 3 ? n.stateNode : null
}
var at = !1;
function Co(e) {
    e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
            pending: null,
            interleaved: null,
            lanes: 0
        },
        effects: null
    }
}
function wu(e, t) {
    e = e.updateQueue,
    t.updateQueue === e && (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects
    })
}
function qe(e, t) {
    return {
        eventTime: e,
        lane: t,
        tag: 0,
        payload: null,
        callback: null,
        next: null
    }
}
function xt(e, t, n) {
    var r = e.updateQueue;
    if (r === null)
        return null;
    if (r = r.shared,
    A & 2) {
        var l = r.pending;
        return l === null ? t.next = t : (t.next = l.next,
        l.next = t),
        r.pending = t,
        nt(e, n)
    }
    return l = r.interleaved,
    l === null ? (t.next = t,
    _o(r)) : (t.next = l.next,
    l.next = t),
    r.interleaved = t,
    nt(e, n)
}
function Lr(e, t, n) {
    if (t = t.updateQueue,
    t !== null && (t = t.shared,
    (n & 4194240) !== 0)) {
        var r = t.lanes;
        r &= e.pendingLanes,
        n |= r,
        t.lanes = n,
        uo(e, n)
    }
}
function bs(e, t) {
    var n = e.updateQueue
      , r = e.alternate;
    if (r !== null && (r = r.updateQueue,
    n === r)) {
        var l = null
          , i = null;
        if (n = n.firstBaseUpdate,
        n !== null) {
            do {
                var o = {
                    eventTime: n.eventTime,
                    lane: n.lane,
                    tag: n.tag,
                    payload: n.payload,
                    callback: n.callback,
                    next: null
                };
                i === null ? l = i = o : i = i.next = o,
                n = n.next
            } while (n !== null);
            i === null ? l = i = t : i = i.next = t
        } else
            l = i = t;
        n = {
            baseState: r.baseState,
            firstBaseUpdate: l,
            lastBaseUpdate: i,
            shared: r.shared,
            effects: r.effects
        },
        e.updateQueue = n;
        return
    }
    e = n.lastBaseUpdate,
    e === null ? n.firstBaseUpdate = t : e.next = t,
    n.lastBaseUpdate = t
}
function ll(e, t, n, r) {
    var l = e.updateQueue;
    at = !1;
    var i = l.firstBaseUpdate
      , o = l.lastBaseUpdate
      , a = l.shared.pending;
    if (a !== null) {
        l.shared.pending = null;
        var u = a
          , c = u.next;
        u.next = null,
        o === null ? i = c : o.next = c,
        o = u;
        var f = e.alternate;
        f !== null && (f = f.updateQueue,
        a = f.lastBaseUpdate,
        a !== o && (a === null ? f.firstBaseUpdate = c : a.next = c,
        f.lastBaseUpdate = u))
    }
    if (i !== null) {
        var m = l.baseState;
        o = 0,
        f = c = u = null,
        a = i;
        do {
            var p = a.lane
              , y = a.eventTime;
            if ((r & p) === p) {
                f !== null && (f = f.next = {
                    eventTime: y,
                    lane: 0,
                    tag: a.tag,
                    payload: a.payload,
                    callback: a.callback,
                    next: null
                });
                e: {
                    var k = e
                      , _ = a;
                    switch (p = t,
                    y = n,
                    _.tag) {
                    case 1:
                        if (k = _.payload,
                        typeof k == "function") {
                            m = k.call(y, m, p);
                            break e
                        }
                        m = k;
                        break e;
                    case 3:
                        k.flags = k.flags & -65537 | 128;
                    case 0:
                        if (k = _.payload,
                        p = typeof k == "function" ? k.call(y, m, p) : k,
                        p == null)
                            break e;
                        m = J({}, m, p);
                        break e;
                    case 2:
                        at = !0
                    }
                }
                a.callback !== null && a.lane !== 0 && (e.flags |= 64,
                p = l.effects,
                p === null ? l.effects = [a] : p.push(a))
            } else
                y = {
                    eventTime: y,
                    lane: p,
                    tag: a.tag,
                    payload: a.payload,
                    callback: a.callback,
                    next: null
                },
                f === null ? (c = f = y,
                u = m) : f = f.next = y,
                o |= p;
            if (a = a.next,
            a === null) {
                if (a = l.shared.pending,
                a === null)
                    break;
                p = a,
                a = p.next,
                p.next = null,
                l.lastBaseUpdate = p,
                l.shared.pending = null
            }
        } while (!0);
        if (f === null && (u = m),
        l.baseState = u,
        l.firstBaseUpdate = c,
        l.lastBaseUpdate = f,
        t = l.shared.interleaved,
        t !== null) {
            l = t;
            do
                o |= l.lane,
                l = l.next;
            while (l !== t)
        } else
            i === null && (l.shared.lanes = 0);
        Ft |= o,
        e.lanes = o,
        e.memoizedState = m
    }
}
function Ms(e, t, n) {
    if (e = t.effects,
    t.effects = null,
    e !== null)
        for (t = 0; t < e.length; t++) {
            var r = e[t]
              , l = r.callback;
            if (l !== null) {
                if (r.callback = null,
                r = n,
                typeof l != "function")
                    throw Error(E(191, l));
                l.call(r)
            }
        }
}
var dr = {}
  , Ye = Ct(dr)
  , tr = Ct(dr)
  , nr = Ct(dr);
function Rt(e) {
    if (e === dr)
        throw Error(E(174));
    return e
}
function Eo(e, t) {
    switch (U(nr, t),
    U(tr, e),
    U(Ye, dr),
    e = t.nodeType,
    e) {
    case 9:
    case 11:
        t = (t = t.documentElement) ? t.namespaceURI : pi(null, "");
        break;
    default:
        e = e === 8 ? t.parentNode : t,
        t = e.namespaceURI || null,
        e = e.tagName,
        t = pi(t, e)
    }
    V(Ye),
    U(Ye, t)
}
function gn() {
    V(Ye),
    V(tr),
    V(nr)
}
function Su(e) {
    Rt(nr.current);
    var t = Rt(Ye.current)
      , n = pi(t, e.type);
    t !== n && (U(tr, e),
    U(Ye, n))
}
function zo(e) {
    tr.current === e && (V(Ye),
    V(tr))
}
var Y = Ct(0);
function il(e) {
    for (var t = e; t !== null; ) {
        if (t.tag === 13) {
            var n = t.memoizedState;
            if (n !== null && (n = n.dehydrated,
            n === null || n.data === "$?" || n.data === "$!"))
                return t
        } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
            if (t.flags & 128)
                return t
        } else if (t.child !== null) {
            t.child.return = t,
            t = t.child;
            continue
        }
        if (t === e)
            break;
        for (; t.sibling === null; ) {
            if (t.return === null || t.return === e)
                return null;
            t = t.return
        }
        t.sibling.return = t.return,
        t = t.sibling
    }
    return null
}
var Yl = [];
function Po() {
    for (var e = 0; e < Yl.length; e++)
        Yl[e]._workInProgressVersionPrimary = null;
    Yl.length = 0
}
var Wr = it.ReactCurrentDispatcher
  , Gl = it.ReactCurrentBatchConfig
  , Dt = 0
  , G = null
  , ee = null
  , le = null
  , ol = !1
  , An = !1
  , rr = 0
  , mf = 0;
function ue() {
    throw Error(E(321))
}
function Bo(e, t) {
    if (t === null)
        return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
        if (!He(e[n], t[n]))
            return !1;
    return !0
}
function To(e, t, n, r, l, i) {
    if (Dt = i,
    G = t,
    t.memoizedState = null,
    t.updateQueue = null,
    t.lanes = 0,
    Wr.current = e === null || e.memoizedState === null ? wf : Sf,
    e = n(r, l),
    An) {
        i = 0;
        do {
            if (An = !1,
            rr = 0,
            25 <= i)
                throw Error(E(301));
            i += 1,
            le = ee = null,
            t.updateQueue = null,
            Wr.current = kf,
            e = n(r, l)
        } while (An)
    }
    if (Wr.current = sl,
    t = ee !== null && ee.next !== null,
    Dt = 0,
    le = ee = G = null,
    ol = !1,
    t)
        throw Error(E(300));
    return e
}
function bo() {
    var e = rr !== 0;
    return rr = 0,
    e
}
function Ve() {
    var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
    };
    return le === null ? G.memoizedState = le = e : le = le.next = e,
    le
}
function Le() {
    if (ee === null) {
        var e = G.alternate;
        e = e !== null ? e.memoizedState : null
    } else
        e = ee.next;
    var t = le === null ? G.memoizedState : le.next;
    if (t !== null)
        le = t,
        ee = e;
    else {
        if (e === null)
            throw Error(E(310));
        ee = e,
        e = {
            memoizedState: ee.memoizedState,
            baseState: ee.baseState,
            baseQueue: ee.baseQueue,
            queue: ee.queue,
            next: null
        },
        le === null ? G.memoizedState = le = e : le = le.next = e
    }
    return le
}
function lr(e, t) {
    return typeof t == "function" ? t(e) : t
}
function Jl(e) {
    var t = Le()
      , n = t.queue;
    if (n === null)
        throw Error(E(311));
    n.lastRenderedReducer = e;
    var r = ee
      , l = r.baseQueue
      , i = n.pending;
    if (i !== null) {
        if (l !== null) {
            var o = l.next;
            l.next = i.next,
            i.next = o
        }
        r.baseQueue = l = i,
        n.pending = null
    }
    if (l !== null) {
        i = l.next,
        r = r.baseState;
        var a = o = null
          , u = null
          , c = i;
        do {
            var f = c.lane;
            if ((Dt & f) === f)
                u !== null && (u = u.next = {
                    lane: 0,
                    action: c.action,
                    hasEagerState: c.hasEagerState,
                    eagerState: c.eagerState,
                    next: null
                }),
                r = c.hasEagerState ? c.eagerState : e(r, c.action);
            else {
                var m = {
                    lane: f,
                    action: c.action,
                    hasEagerState: c.hasEagerState,
                    eagerState: c.eagerState,
                    next: null
                };
                u === null ? (a = u = m,
                o = r) : u = u.next = m,
                G.lanes |= f,
                Ft |= f
            }
            c = c.next
        } while (c !== null && c !== i);
        u === null ? o = r : u.next = a,
        He(r, t.memoizedState) || (we = !0),
        t.memoizedState = r,
        t.baseState = o,
        t.baseQueue = u,
        n.lastRenderedState = r
    }
    if (e = n.interleaved,
    e !== null) {
        l = e;
        do
            i = l.lane,
            G.lanes |= i,
            Ft |= i,
            l = l.next;
        while (l !== e)
    } else
        l === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch]
}
function Xl(e) {
    var t = Le()
      , n = t.queue;
    if (n === null)
        throw Error(E(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch
      , l = n.pending
      , i = t.memoizedState;
    if (l !== null) {
        n.pending = null;
        var o = l = l.next;
        do
            i = e(i, o.action),
            o = o.next;
        while (o !== l);
        He(i, t.memoizedState) || (we = !0),
        t.memoizedState = i,
        t.baseQueue === null && (t.baseState = i),
        n.lastRenderedState = i
    }
    return [i, r]
}
function ku() {}
function ju(e, t) {
    var n = G
      , r = Le()
      , l = t()
      , i = !He(r.memoizedState, l);
    if (i && (r.memoizedState = l,
    we = !0),
    r = r.queue,
    Mo(Eu.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || i || le !== null && le.memoizedState.tag & 1) {
        if (n.flags |= 2048,
        ir(9, Cu.bind(null, n, r, l, t), void 0, null),
        ie === null)
            throw Error(E(349));
        Dt & 30 || _u(n, t, l)
    }
    return l
}
function _u(e, t, n) {
    e.flags |= 16384,
    e = {
        getSnapshot: t,
        value: n
    },
    t = G.updateQueue,
    t === null ? (t = {
        lastEffect: null,
        stores: null
    },
    G.updateQueue = t,
    t.stores = [e]) : (n = t.stores,
    n === null ? t.stores = [e] : n.push(e))
}
function Cu(e, t, n, r) {
    t.value = n,
    t.getSnapshot = r,
    zu(t) && Pu(e)
}
function Eu(e, t, n) {
    return n(function() {
        zu(t) && Pu(e)
    })
}
function zu(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
        var n = t();
        return !He(e, n)
    } catch {
        return !0
    }
}
function Pu(e) {
    var t = nt(e, 1);
    t !== null && Ue(t, e, 1, -1)
}
function Rs(e) {
    var t = Ve();
    return typeof e == "function" && (e = e()),
    t.memoizedState = t.baseState = e,
    e = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: lr,
        lastRenderedState: e
    },
    t.queue = e,
    e = e.dispatch = vf.bind(null, G, e),
    [t.memoizedState, e]
}
function ir(e, t, n, r) {
    return e = {
        tag: e,
        create: t,
        destroy: n,
        deps: r,
        next: null
    },
    t = G.updateQueue,
    t === null ? (t = {
        lastEffect: null,
        stores: null
    },
    G.updateQueue = t,
    t.lastEffect = e.next = e) : (n = t.lastEffect,
    n === null ? t.lastEffect = e.next = e : (r = n.next,
    n.next = e,
    e.next = r,
    t.lastEffect = e)),
    e
}
function Bu() {
    return Le().memoizedState
}
function Dr(e, t, n, r) {
    var l = Ve();
    G.flags |= e,
    l.memoizedState = ir(1 | t, n, void 0, r === void 0 ? null : r)
}
function wl(e, t, n, r) {
    var l = Le();
    r = r === void 0 ? null : r;
    var i = void 0;
    if (ee !== null) {
        var o = ee.memoizedState;
        if (i = o.destroy,
        r !== null && Bo(r, o.deps)) {
            l.memoizedState = ir(t, n, i, r);
            return
        }
    }
    G.flags |= e,
    l.memoizedState = ir(1 | t, n, i, r)
}
function Ns(e, t) {
    return Dr(8390656, 8, e, t)
}
function Mo(e, t) {
    return wl(2048, 8, e, t)
}
function Tu(e, t) {
    return wl(4, 2, e, t)
}
function bu(e, t) {
    return wl(4, 4, e, t)
}
function Mu(e, t) {
    if (typeof t == "function")
        return e = e(),
        t(e),
        function() {
            t(null)
        }
        ;
    if (t != null)
        return e = e(),
        t.current = e,
        function() {
            t.current = null
        }
}
function Ru(e, t, n) {
    return n = n != null ? n.concat([e]) : null,
    wl(4, 4, Mu.bind(null, t, e), n)
}
function Ro() {}
function Nu(e, t) {
    var n = Le();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && Bo(t, r[1]) ? r[0] : (n.memoizedState = [e, t],
    e)
}
function Iu(e, t) {
    var n = Le();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && Bo(t, r[1]) ? r[0] : (e = e(),
    n.memoizedState = [e, t],
    e)
}
function Lu(e, t, n) {
    return Dt & 21 ? (He(n, t) || (n = Oa(),
    G.lanes |= n,
    Ft |= n,
    e.baseState = !0),
    t) : (e.baseState && (e.baseState = !1,
    we = !0),
    e.memoizedState = n)
}
function yf(e, t) {
    var n = O;
    O = n !== 0 && 4 > n ? n : 4,
    e(!0);
    var r = Gl.transition;
    Gl.transition = {};
    try {
        e(!1),
        t()
    } finally {
        O = n,
        Gl.transition = r
    }
}
function Wu() {
    return Le().memoizedState
}
function xf(e, t, n) {
    var r = wt(e);
    if (n = {
        lane: r,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null
    },
    Du(e))
        Fu(t, n);
    else if (n = vu(e, t, n, r),
    n !== null) {
        var l = me();
        Ue(n, e, r, l),
        Au(n, t, r)
    }
}
function vf(e, t, n) {
    var r = wt(e)
      , l = {
        lane: r,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null
    };
    if (Du(e))
        Fu(t, l);
    else {
        var i = e.alternate;
        if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer,
        i !== null))
            try {
                var o = t.lastRenderedState
                  , a = i(o, n);
                if (l.hasEagerState = !0,
                l.eagerState = a,
                He(a, o)) {
                    var u = t.interleaved;
                    u === null ? (l.next = l,
                    _o(t)) : (l.next = u.next,
                    u.next = l),
                    t.interleaved = l;
                    return
                }
            } catch {} finally {}
        n = vu(e, t, l, r),
        n !== null && (l = me(),
        Ue(n, e, r, l),
        Au(n, t, r))
    }
}
function Du(e) {
    var t = e.alternate;
    return e === G || t !== null && t === G
}
function Fu(e, t) {
    An = ol = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next,
    n.next = t),
    e.pending = t
}
function Au(e, t, n) {
    if (n & 4194240) {
        var r = t.lanes;
        r &= e.pendingLanes,
        n |= r,
        t.lanes = n,
        uo(e, n)
    }
}
var sl = {
    readContext: Ie,
    useCallback: ue,
    useContext: ue,
    useEffect: ue,
    useImperativeHandle: ue,
    useInsertionEffect: ue,
    useLayoutEffect: ue,
    useMemo: ue,
    useReducer: ue,
    useRef: ue,
    useState: ue,
    useDebugValue: ue,
    useDeferredValue: ue,
    useTransition: ue,
    useMutableSource: ue,
    useSyncExternalStore: ue,
    useId: ue,
    unstable_isNewReconciler: !1
}
  , wf = {
    readContext: Ie,
    useCallback: function(e, t) {
        return Ve().memoizedState = [e, t === void 0 ? null : t],
        e
    },
    useContext: Ie,
    useEffect: Ns,
    useImperativeHandle: function(e, t, n) {
        return n = n != null ? n.concat([e]) : null,
        Dr(4194308, 4, Mu.bind(null, t, e), n)
    },
    useLayoutEffect: function(e, t) {
        return Dr(4194308, 4, e, t)
    },
    useInsertionEffect: function(e, t) {
        return Dr(4, 2, e, t)
    },
    useMemo: function(e, t) {
        var n = Ve();
        return t = t === void 0 ? null : t,
        e = e(),
        n.memoizedState = [e, t],
        e
    },
    useReducer: function(e, t, n) {
        var r = Ve();
        return t = n !== void 0 ? n(t) : t,
        r.memoizedState = r.baseState = t,
        e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: t
        },
        r.queue = e,
        e = e.dispatch = xf.bind(null, G, e),
        [r.memoizedState, e]
    },
    useRef: function(e) {
        var t = Ve();
        return e = {
            current: e
        },
        t.memoizedState = e
    },
    useState: Rs,
    useDebugValue: Ro,
    useDeferredValue: function(e) {
        return Ve().memoizedState = e
    },
    useTransition: function() {
        var e = Rs(!1)
          , t = e[0];
        return e = yf.bind(null, e[1]),
        Ve().memoizedState = e,
        [t, e]
    },
    useMutableSource: function() {},
    useSyncExternalStore: function(e, t, n) {
        var r = G
          , l = Ve();
        if (K) {
            if (n === void 0)
                throw Error(E(407));
            n = n()
        } else {
            if (n = t(),
            ie === null)
                throw Error(E(349));
            Dt & 30 || _u(r, t, n)
        }
        l.memoizedState = n;
        var i = {
            value: n,
            getSnapshot: t
        };
        return l.queue = i,
        Ns(Eu.bind(null, r, i, e), [e]),
        r.flags |= 2048,
        ir(9, Cu.bind(null, r, i, n, t), void 0, null),
        n
    },
    useId: function() {
        var e = Ve()
          , t = ie.identifierPrefix;
        if (K) {
            var n = Ze
              , r = Xe;
            n = (r & ~(1 << 32 - Oe(r) - 1)).toString(32) + n,
            t = ":" + t + "R" + n,
            n = rr++,
            0 < n && (t += "H" + n.toString(32)),
            t += ":"
        } else
            n = mf++,
            t = ":" + t + "r" + n.toString(32) + ":";
        return e.memoizedState = t
    },
    unstable_isNewReconciler: !1
}
  , Sf = {
    readContext: Ie,
    useCallback: Nu,
    useContext: Ie,
    useEffect: Mo,
    useImperativeHandle: Ru,
    useInsertionEffect: Tu,
    useLayoutEffect: bu,
    useMemo: Iu,
    useReducer: Jl,
    useRef: Bu,
    useState: function() {
        return Jl(lr)
    },
    useDebugValue: Ro,
    useDeferredValue: function(e) {
        var t = Le();
        return Lu(t, ee.memoizedState, e)
    },
    useTransition: function() {
        var e = Jl(lr)[0]
          , t = Le().memoizedState;
        return [e, t]
    },
    useMutableSource: ku,
    useSyncExternalStore: ju,
    useId: Wu,
    unstable_isNewReconciler: !1
}
  , kf = {
    readContext: Ie,
    useCallback: Nu,
    useContext: Ie,
    useEffect: Mo,
    useImperativeHandle: Ru,
    useInsertionEffect: Tu,
    useLayoutEffect: bu,
    useMemo: Iu,
    useReducer: Xl,
    useRef: Bu,
    useState: function() {
        return Xl(lr)
    },
    useDebugValue: Ro,
    useDeferredValue: function(e) {
        var t = Le();
        return ee === null ? t.memoizedState = e : Lu(t, ee.memoizedState, e)
    },
    useTransition: function() {
        var e = Xl(lr)[0]
          , t = Le().memoizedState;
        return [e, t]
    },
    useMutableSource: ku,
    useSyncExternalStore: ju,
    useId: Wu,
    unstable_isNewReconciler: !1
};
function De(e, t) {
    if (e && e.defaultProps) {
        t = J({}, t),
        e = e.defaultProps;
        for (var n in e)
            t[n] === void 0 && (t[n] = e[n]);
        return t
    }
    return t
}
function Ni(e, t, n, r) {
    t = e.memoizedState,
    n = n(r, t),
    n = n == null ? t : J({}, t, n),
    e.memoizedState = n,
    e.lanes === 0 && (e.updateQueue.baseState = n)
}
var Sl = {
    isMounted: function(e) {
        return (e = e._reactInternals) ? Ut(e) === e : !1
    },
    enqueueSetState: function(e, t, n) {
        e = e._reactInternals;
        var r = me()
          , l = wt(e)
          , i = qe(r, l);
        i.payload = t,
        n != null && (i.callback = n),
        t = xt(e, i, l),
        t !== null && (Ue(t, e, l, r),
        Lr(t, e, l))
    },
    enqueueReplaceState: function(e, t, n) {
        e = e._reactInternals;
        var r = me()
          , l = wt(e)
          , i = qe(r, l);
        i.tag = 1,
        i.payload = t,
        n != null && (i.callback = n),
        t = xt(e, i, l),
        t !== null && (Ue(t, e, l, r),
        Lr(t, e, l))
    },
    enqueueForceUpdate: function(e, t) {
        e = e._reactInternals;
        var n = me()
          , r = wt(e)
          , l = qe(n, r);
        l.tag = 2,
        t != null && (l.callback = t),
        t = xt(e, l, r),
        t !== null && (Ue(t, e, r, n),
        Lr(t, e, r))
    }
};
function Is(e, t, n, r, l, i, o) {
    return e = e.stateNode,
    typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, i, o) : t.prototype && t.prototype.isPureReactComponent ? !Xn(n, r) || !Xn(l, i) : !0
}
function Ou(e, t, n) {
    var r = !1
      , l = jt
      , i = t.contextType;
    return typeof i == "object" && i !== null ? i = Ie(i) : (l = ke(t) ? Lt : pe.current,
    r = t.contextTypes,
    i = (r = r != null) ? fn(e, l) : jt),
    t = new t(n,i),
    e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null,
    t.updater = Sl,
    e.stateNode = t,
    t._reactInternals = e,
    r && (e = e.stateNode,
    e.__reactInternalMemoizedUnmaskedChildContext = l,
    e.__reactInternalMemoizedMaskedChildContext = i),
    t
}
function Ls(e, t, n, r) {
    e = t.state,
    typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && Sl.enqueueReplaceState(t, t.state, null)
}
function Ii(e, t, n, r) {
    var l = e.stateNode;
    l.props = n,
    l.state = e.memoizedState,
    l.refs = {},
    Co(e);
    var i = t.contextType;
    typeof i == "object" && i !== null ? l.context = Ie(i) : (i = ke(t) ? Lt : pe.current,
    l.context = fn(e, i)),
    l.state = e.memoizedState,
    i = t.getDerivedStateFromProps,
    typeof i == "function" && (Ni(e, t, i, n),
    l.state = e.memoizedState),
    typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state,
    typeof l.componentWillMount == "function" && l.componentWillMount(),
    typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(),
    t !== l.state && Sl.enqueueReplaceState(l, l.state, null),
    ll(e, n, l, r),
    l.state = e.memoizedState),
    typeof l.componentDidMount == "function" && (e.flags |= 4194308)
}
function mn(e, t) {
    try {
        var n = ""
          , r = t;
        do
            n += Gc(r),
            r = r.return;
        while (r);
        var l = n
    } catch (i) {
        l = `
Error generating stack: ` + i.message + `
` + i.stack
    }
    return {
        value: e,
        source: t,
        stack: l,
        digest: null
    }
}
function Zl(e, t, n) {
    return {
        value: e,
        source: null,
        stack: n ?? null,
        digest: t ?? null
    }
}
function Li(e, t) {
    try {
        console.error(t.value)
    } catch (n) {
        setTimeout(function() {
            throw n
        })
    }
}
var jf = typeof WeakMap == "function" ? WeakMap : Map;
function Uu(e, t, n) {
    n = qe(-1, n),
    n.tag = 3,
    n.payload = {
        element: null
    };
    var r = t.value;
    return n.callback = function() {
        ul || (ul = !0,
        Ki = r),
        Li(e, t)
    }
    ,
    n
}
function Hu(e, t, n) {
    n = qe(-1, n),
    n.tag = 3;
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
        var l = t.value;
        n.payload = function() {
            return r(l)
        }
        ,
        n.callback = function() {
            Li(e, t)
        }
    }
    var i = e.stateNode;
    return i !== null && typeof i.componentDidCatch == "function" && (n.callback = function() {
        Li(e, t),
        typeof r != "function" && (vt === null ? vt = new Set([this]) : vt.add(this));
        var o = t.stack;
        this.componentDidCatch(t.value, {
            componentStack: o !== null ? o : ""
        })
    }
    ),
    n
}
function Ws(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
        r = e.pingCache = new jf;
        var l = new Set;
        r.set(t, l)
    } else
        l = r.get(t),
        l === void 0 && (l = new Set,
        r.set(t, l));
    l.has(n) || (l.add(n),
    e = Wf.bind(null, e, t, n),
    t.then(e, e))
}
function Ds(e) {
    do {
        var t;
        if ((t = e.tag === 13) && (t = e.memoizedState,
        t = t !== null ? t.dehydrated !== null : !0),
        t)
            return e;
        e = e.return
    } while (e !== null);
    return null
}
function Fs(e, t, n, r, l) {
    return e.mode & 1 ? (e.flags |= 65536,
    e.lanes = l,
    e) : (e === t ? e.flags |= 65536 : (e.flags |= 128,
    n.flags |= 131072,
    n.flags &= -52805,
    n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = qe(-1, 1),
    t.tag = 2,
    xt(n, t, 1))),
    n.lanes |= 1),
    e)
}
var _f = it.ReactCurrentOwner
  , we = !1;
function ge(e, t, n, r) {
    t.child = e === null ? xu(t, null, n, r) : hn(t, e.child, n, r)
}
function As(e, t, n, r, l) {
    n = n.render;
    var i = t.ref;
    return un(t, l),
    r = To(e, t, n, r, i, l),
    n = bo(),
    e !== null && !we ? (t.updateQueue = e.updateQueue,
    t.flags &= -2053,
    e.lanes &= ~l,
    rt(e, t, l)) : (K && n && xo(t),
    t.flags |= 1,
    ge(e, t, r, l),
    t.child)
}
function Os(e, t, n, r, l) {
    if (e === null) {
        var i = n.type;
        return typeof i == "function" && !Oo(i) && i.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15,
        t.type = i,
        $u(e, t, i, r, l)) : (e = Ur(n.type, null, r, t, t.mode, l),
        e.ref = t.ref,
        e.return = t,
        t.child = e)
    }
    if (i = e.child,
    !(e.lanes & l)) {
        var o = i.memoizedProps;
        if (n = n.compare,
        n = n !== null ? n : Xn,
        n(o, r) && e.ref === t.ref)
            return rt(e, t, l)
    }
    return t.flags |= 1,
    e = St(i, r),
    e.ref = t.ref,
    e.return = t,
    t.child = e
}
function $u(e, t, n, r, l) {
    if (e !== null) {
        var i = e.memoizedProps;
        if (Xn(i, r) && e.ref === t.ref)
            if (we = !1,
            t.pendingProps = r = i,
            (e.lanes & l) !== 0)
                e.flags & 131072 && (we = !0);
            else
                return t.lanes = e.lanes,
                rt(e, t, l)
    }
    return Wi(e, t, n, r, l)
}
function Vu(e, t, n) {
    var r = t.pendingProps
      , l = r.children
      , i = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden")
        if (!(t.mode & 1))
            t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null
            },
            U(rn, _e),
            _e |= n;
        else {
            if (!(n & 1073741824))
                return e = i !== null ? i.baseLanes | n : n,
                t.lanes = t.childLanes = 1073741824,
                t.memoizedState = {
                    baseLanes: e,
                    cachePool: null,
                    transitions: null
                },
                t.updateQueue = null,
                U(rn, _e),
                _e |= e,
                null;
            t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null
            },
            r = i !== null ? i.baseLanes : n,
            U(rn, _e),
            _e |= r
        }
    else
        i !== null ? (r = i.baseLanes | n,
        t.memoizedState = null) : r = n,
        U(rn, _e),
        _e |= r;
    return ge(e, t, l, n),
    t.child
}
function Ku(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512,
    t.flags |= 2097152)
}
function Wi(e, t, n, r, l) {
    var i = ke(n) ? Lt : pe.current;
    return i = fn(t, i),
    un(t, l),
    n = To(e, t, n, r, i, l),
    r = bo(),
    e !== null && !we ? (t.updateQueue = e.updateQueue,
    t.flags &= -2053,
    e.lanes &= ~l,
    rt(e, t, l)) : (K && r && xo(t),
    t.flags |= 1,
    ge(e, t, n, l),
    t.child)
}
function Us(e, t, n, r, l) {
    if (ke(n)) {
        var i = !0;
        qr(t)
    } else
        i = !1;
    if (un(t, l),
    t.stateNode === null)
        Fr(e, t),
        Ou(t, n, r),
        Ii(t, n, r, l),
        r = !0;
    else if (e === null) {
        var o = t.stateNode
          , a = t.memoizedProps;
        o.props = a;
        var u = o.context
          , c = n.contextType;
        typeof c == "object" && c !== null ? c = Ie(c) : (c = ke(n) ? Lt : pe.current,
        c = fn(t, c));
        var f = n.getDerivedStateFromProps
          , m = typeof f == "function" || typeof o.getSnapshotBeforeUpdate == "function";
        m || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (a !== r || u !== c) && Ls(t, o, r, c),
        at = !1;
        var p = t.memoizedState;
        o.state = p,
        ll(t, r, o, l),
        u = t.memoizedState,
        a !== r || p !== u || Se.current || at ? (typeof f == "function" && (Ni(t, n, f, r),
        u = t.memoizedState),
        (a = at || Is(t, n, a, r, p, u, c)) ? (m || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(),
        typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()),
        typeof o.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308),
        t.memoizedProps = r,
        t.memoizedState = u),
        o.props = r,
        o.state = u,
        o.context = c,
        r = a) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308),
        r = !1)
    } else {
        o = t.stateNode,
        wu(e, t),
        a = t.memoizedProps,
        c = t.type === t.elementType ? a : De(t.type, a),
        o.props = c,
        m = t.pendingProps,
        p = o.context,
        u = n.contextType,
        typeof u == "object" && u !== null ? u = Ie(u) : (u = ke(n) ? Lt : pe.current,
        u = fn(t, u));
        var y = n.getDerivedStateFromProps;
        (f = typeof y == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (a !== m || p !== u) && Ls(t, o, r, u),
        at = !1,
        p = t.memoizedState,
        o.state = p,
        ll(t, r, o, l);
        var k = t.memoizedState;
        a !== m || p !== k || Se.current || at ? (typeof y == "function" && (Ni(t, n, y, r),
        k = t.memoizedState),
        (c = at || Is(t, n, c, r, p, k, u) || !1) ? (f || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(r, k, u),
        typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(r, k, u)),
        typeof o.componentDidUpdate == "function" && (t.flags |= 4),
        typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || a === e.memoizedProps && p === e.memoizedState || (t.flags |= 4),
        typeof o.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024),
        t.memoizedProps = r,
        t.memoizedState = k),
        o.props = r,
        o.state = k,
        o.context = u,
        r = c) : (typeof o.componentDidUpdate != "function" || a === e.memoizedProps && p === e.memoizedState || (t.flags |= 4),
        typeof o.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024),
        r = !1)
    }
    return Di(e, t, n, r, i, l)
}
function Di(e, t, n, r, l, i) {
    Ku(e, t);
    var o = (t.flags & 128) !== 0;
    if (!r && !o)
        return l && zs(t, n, !1),
        rt(e, t, i);
    r = t.stateNode,
    _f.current = t;
    var a = o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
    return t.flags |= 1,
    e !== null && o ? (t.child = hn(t, e.child, null, i),
    t.child = hn(t, null, a, i)) : ge(e, t, a, i),
    t.memoizedState = r.state,
    l && zs(t, n, !0),
    t.child
}
function Qu(e) {
    var t = e.stateNode;
    t.pendingContext ? Es(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Es(e, t.context, !1),
    Eo(e, t.containerInfo)
}
function Hs(e, t, n, r, l) {
    return pn(),
    wo(l),
    t.flags |= 256,
    ge(e, t, n, r),
    t.child
}
var Fi = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0
};
function Ai(e) {
    return {
        baseLanes: e,
        cachePool: null,
        transitions: null
    }
}
function Yu(e, t, n) {
    var r = t.pendingProps, l = Y.current, i = !1, o = (t.flags & 128) !== 0, a;
    if ((a = o) || (a = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0),
    a ? (i = !0,
    t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1),
    U(Y, l & 1),
    e === null)
        return Mi(t),
        e = t.memoizedState,
        e !== null && (e = e.dehydrated,
        e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1,
        null) : (o = r.children,
        e = r.fallback,
        i ? (r = t.mode,
        i = t.child,
        o = {
            mode: "hidden",
            children: o
        },
        !(r & 1) && i !== null ? (i.childLanes = 0,
        i.pendingProps = o) : i = _l(o, r, 0, null),
        e = It(e, r, n, null),
        i.return = t,
        e.return = t,
        i.sibling = e,
        t.child = i,
        t.child.memoizedState = Ai(n),
        t.memoizedState = Fi,
        e) : No(t, o));
    if (l = e.memoizedState,
    l !== null && (a = l.dehydrated,
    a !== null))
        return Cf(e, t, o, r, a, l, n);
    if (i) {
        i = r.fallback,
        o = t.mode,
        l = e.child,
        a = l.sibling;
        var u = {
            mode: "hidden",
            children: r.children
        };
        return !(o & 1) && t.child !== l ? (r = t.child,
        r.childLanes = 0,
        r.pendingProps = u,
        t.deletions = null) : (r = St(l, u),
        r.subtreeFlags = l.subtreeFlags & 14680064),
        a !== null ? i = St(a, i) : (i = It(i, o, n, null),
        i.flags |= 2),
        i.return = t,
        r.return = t,
        r.sibling = i,
        t.child = r,
        r = i,
        i = t.child,
        o = e.child.memoizedState,
        o = o === null ? Ai(n) : {
            baseLanes: o.baseLanes | n,
            cachePool: null,
            transitions: o.transitions
        },
        i.memoizedState = o,
        i.childLanes = e.childLanes & ~n,
        t.memoizedState = Fi,
        r
    }
    return i = e.child,
    e = i.sibling,
    r = St(i, {
        mode: "visible",
        children: r.children
    }),
    !(t.mode & 1) && (r.lanes = n),
    r.return = t,
    r.sibling = null,
    e !== null && (n = t.deletions,
    n === null ? (t.deletions = [e],
    t.flags |= 16) : n.push(e)),
    t.child = r,
    t.memoizedState = null,
    r
}
function No(e, t) {
    return t = _l({
        mode: "visible",
        children: t
    }, e.mode, 0, null),
    t.return = e,
    e.child = t
}
function zr(e, t, n, r) {
    return r !== null && wo(r),
    hn(t, e.child, null, n),
    e = No(t, t.pendingProps.children),
    e.flags |= 2,
    t.memoizedState = null,
    e
}
function Cf(e, t, n, r, l, i, o) {
    if (n)
        return t.flags & 256 ? (t.flags &= -257,
        r = Zl(Error(E(422))),
        zr(e, t, o, r)) : t.memoizedState !== null ? (t.child = e.child,
        t.flags |= 128,
        null) : (i = r.fallback,
        l = t.mode,
        r = _l({
            mode: "visible",
            children: r.children
        }, l, 0, null),
        i = It(i, l, o, null),
        i.flags |= 2,
        r.return = t,
        i.return = t,
        r.sibling = i,
        t.child = r,
        t.mode & 1 && hn(t, e.child, null, o),
        t.child.memoizedState = Ai(o),
        t.memoizedState = Fi,
        i);
    if (!(t.mode & 1))
        return zr(e, t, o, null);
    if (l.data === "$!") {
        if (r = l.nextSibling && l.nextSibling.dataset,
        r)
            var a = r.dgst;
        return r = a,
        i = Error(E(419)),
        r = Zl(i, r, void 0),
        zr(e, t, o, r)
    }
    if (a = (o & e.childLanes) !== 0,
    we || a) {
        if (r = ie,
        r !== null) {
            switch (o & -o) {
            case 4:
                l = 2;
                break;
            case 16:
                l = 8;
                break;
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
            case 67108864:
                l = 32;
                break;
            case 536870912:
                l = 268435456;
                break;
            default:
                l = 0
            }
            l = l & (r.suspendedLanes | o) ? 0 : l,
            l !== 0 && l !== i.retryLane && (i.retryLane = l,
            nt(e, l),
            Ue(r, e, l, -1))
        }
        return Ao(),
        r = Zl(Error(E(421))),
        zr(e, t, o, r)
    }
    return l.data === "$?" ? (t.flags |= 128,
    t.child = e.child,
    t = Df.bind(null, e),
    l._reactRetry = t,
    null) : (e = i.treeContext,
    Ce = yt(l.nextSibling),
    Ee = t,
    K = !0,
    Ae = null,
    e !== null && (be[Me++] = Xe,
    be[Me++] = Ze,
    be[Me++] = Wt,
    Xe = e.id,
    Ze = e.overflow,
    Wt = t),
    t = No(t, r.children),
    t.flags |= 4096,
    t)
}
function $s(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t),
    Ri(e.return, t, n)
}
function ql(e, t, n, r, l) {
    var i = e.memoizedState;
    i === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: l
    } : (i.isBackwards = t,
    i.rendering = null,
    i.renderingStartTime = 0,
    i.last = r,
    i.tail = n,
    i.tailMode = l)
}
function Gu(e, t, n) {
    var r = t.pendingProps
      , l = r.revealOrder
      , i = r.tail;
    if (ge(e, t, r.children, n),
    r = Y.current,
    r & 2)
        r = r & 1 | 2,
        t.flags |= 128;
    else {
        if (e !== null && e.flags & 128)
            e: for (e = t.child; e !== null; ) {
                if (e.tag === 13)
                    e.memoizedState !== null && $s(e, n, t);
                else if (e.tag === 19)
                    $s(e, n, t);
                else if (e.child !== null) {
                    e.child.return = e,
                    e = e.child;
                    continue
                }
                if (e === t)
                    break e;
                for (; e.sibling === null; ) {
                    if (e.return === null || e.return === t)
                        break e;
                    e = e.return
                }
                e.sibling.return = e.return,
                e = e.sibling
            }
        r &= 1
    }
    if (U(Y, r),
    !(t.mode & 1))
        t.memoizedState = null;
    else
        switch (l) {
        case "forwards":
            for (n = t.child,
            l = null; n !== null; )
                e = n.alternate,
                e !== null && il(e) === null && (l = n),
                n = n.sibling;
            n = l,
            n === null ? (l = t.child,
            t.child = null) : (l = n.sibling,
            n.sibling = null),
            ql(t, !1, l, n, i);
            break;
        case "backwards":
            for (n = null,
            l = t.child,
            t.child = null; l !== null; ) {
                if (e = l.alternate,
                e !== null && il(e) === null) {
                    t.child = l;
                    break
                }
                e = l.sibling,
                l.sibling = n,
                n = l,
                l = e
            }
            ql(t, !0, n, null, i);
            break;
        case "together":
            ql(t, !1, null, null, void 0);
            break;
        default:
            t.memoizedState = null
        }
    return t.child
}
function Fr(e, t) {
    !(t.mode & 1) && e !== null && (e.alternate = null,
    t.alternate = null,
    t.flags |= 2)
}
function rt(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies),
    Ft |= t.lanes,
    !(n & t.childLanes))
        return null;
    if (e !== null && t.child !== e.child)
        throw Error(E(153));
    if (t.child !== null) {
        for (e = t.child,
        n = St(e, e.pendingProps),
        t.child = n,
        n.return = t; e.sibling !== null; )
            e = e.sibling,
            n = n.sibling = St(e, e.pendingProps),
            n.return = t;
        n.sibling = null
    }
    return t.child
}
function Ef(e, t, n) {
    switch (t.tag) {
    case 3:
        Qu(t),
        pn();
        break;
    case 5:
        Su(t);
        break;
    case 1:
        ke(t.type) && qr(t);
        break;
    case 4:
        Eo(t, t.stateNode.containerInfo);
        break;
    case 10:
        var r = t.type._context
          , l = t.memoizedProps.value;
        U(nl, r._currentValue),
        r._currentValue = l;
        break;
    case 13:
        if (r = t.memoizedState,
        r !== null)
            return r.dehydrated !== null ? (U(Y, Y.current & 1),
            t.flags |= 128,
            null) : n & t.child.childLanes ? Yu(e, t, n) : (U(Y, Y.current & 1),
            e = rt(e, t, n),
            e !== null ? e.sibling : null);
        U(Y, Y.current & 1);
        break;
    case 19:
        if (r = (n & t.childLanes) !== 0,
        e.flags & 128) {
            if (r)
                return Gu(e, t, n);
            t.flags |= 128
        }
        if (l = t.memoizedState,
        l !== null && (l.rendering = null,
        l.tail = null,
        l.lastEffect = null),
        U(Y, Y.current),
        r)
            break;
        return null;
    case 22:
    case 23:
        return t.lanes = 0,
        Vu(e, t, n)
    }
    return rt(e, t, n)
}
var Ju, Oi, Xu, Zu;
Ju = function(e, t) {
    for (var n = t.child; n !== null; ) {
        if (n.tag === 5 || n.tag === 6)
            e.appendChild(n.stateNode);
        else if (n.tag !== 4 && n.child !== null) {
            n.child.return = n,
            n = n.child;
            continue
        }
        if (n === t)
            break;
        for (; n.sibling === null; ) {
            if (n.return === null || n.return === t)
                return;
            n = n.return
        }
        n.sibling.return = n.return,
        n = n.sibling
    }
}
;
Oi = function() {}
;
Xu = function(e, t, n, r) {
    var l = e.memoizedProps;
    if (l !== r) {
        e = t.stateNode,
        Rt(Ye.current);
        var i = null;
        switch (n) {
        case "input":
            l = ui(e, l),
            r = ui(e, r),
            i = [];
            break;
        case "select":
            l = J({}, l, {
                value: void 0
            }),
            r = J({}, r, {
                value: void 0
            }),
            i = [];
            break;
        case "textarea":
            l = fi(e, l),
            r = fi(e, r),
            i = [];
            break;
        default:
            typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Xr)
        }
        hi(n, r);
        var o;
        n = null;
        for (c in l)
            if (!r.hasOwnProperty(c) && l.hasOwnProperty(c) && l[c] != null)
                if (c === "style") {
                    var a = l[c];
                    for (o in a)
                        a.hasOwnProperty(o) && (n || (n = {}),
                        n[o] = "")
                } else
                    c !== "dangerouslySetInnerHTML" && c !== "children" && c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && ($n.hasOwnProperty(c) ? i || (i = []) : (i = i || []).push(c, null));
        for (c in r) {
            var u = r[c];
            if (a = l != null ? l[c] : void 0,
            r.hasOwnProperty(c) && u !== a && (u != null || a != null))
                if (c === "style")
                    if (a) {
                        for (o in a)
                            !a.hasOwnProperty(o) || u && u.hasOwnProperty(o) || (n || (n = {}),
                            n[o] = "");
                        for (o in u)
                            u.hasOwnProperty(o) && a[o] !== u[o] && (n || (n = {}),
                            n[o] = u[o])
                    } else
                        n || (i || (i = []),
                        i.push(c, n)),
                        n = u;
                else
                    c === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0,
                    a = a ? a.__html : void 0,
                    u != null && a !== u && (i = i || []).push(c, u)) : c === "children" ? typeof u != "string" && typeof u != "number" || (i = i || []).push(c, "" + u) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && ($n.hasOwnProperty(c) ? (u != null && c === "onScroll" && $("scroll", e),
                    i || a === u || (i = [])) : (i = i || []).push(c, u))
        }
        n && (i = i || []).push("style", n);
        var c = i;
        (t.updateQueue = c) && (t.flags |= 4)
    }
}
;
Zu = function(e, t, n, r) {
    n !== r && (t.flags |= 4)
}
;
function Bn(e, t) {
    if (!K)
        switch (e.tailMode) {
        case "hidden":
            t = e.tail;
            for (var n = null; t !== null; )
                t.alternate !== null && (n = t),
                t = t.sibling;
            n === null ? e.tail = null : n.sibling = null;
            break;
        case "collapsed":
            n = e.tail;
            for (var r = null; n !== null; )
                n.alternate !== null && (r = n),
                n = n.sibling;
            r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null
        }
}
function ce(e) {
    var t = e.alternate !== null && e.alternate.child === e.child
      , n = 0
      , r = 0;
    if (t)
        for (var l = e.child; l !== null; )
            n |= l.lanes | l.childLanes,
            r |= l.subtreeFlags & 14680064,
            r |= l.flags & 14680064,
            l.return = e,
            l = l.sibling;
    else
        for (l = e.child; l !== null; )
            n |= l.lanes | l.childLanes,
            r |= l.subtreeFlags,
            r |= l.flags,
            l.return = e,
            l = l.sibling;
    return e.subtreeFlags |= r,
    e.childLanes = n,
    t
}
function zf(e, t, n) {
    var r = t.pendingProps;
    switch (vo(t),
    t.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
        return ce(t),
        null;
    case 1:
        return ke(t.type) && Zr(),
        ce(t),
        null;
    case 3:
        return r = t.stateNode,
        gn(),
        V(Se),
        V(pe),
        Po(),
        r.pendingContext && (r.context = r.pendingContext,
        r.pendingContext = null),
        (e === null || e.child === null) && (Cr(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024,
        Ae !== null && (Gi(Ae),
        Ae = null))),
        Oi(e, t),
        ce(t),
        null;
    case 5:
        zo(t);
        var l = Rt(nr.current);
        if (n = t.type,
        e !== null && t.stateNode != null)
            Xu(e, t, n, r, l),
            e.ref !== t.ref && (t.flags |= 512,
            t.flags |= 2097152);
        else {
            if (!r) {
                if (t.stateNode === null)
                    throw Error(E(166));
                return ce(t),
                null
            }
            if (e = Rt(Ye.current),
            Cr(t)) {
                r = t.stateNode,
                n = t.type;
                var i = t.memoizedProps;
                switch (r[Ke] = t,
                r[er] = i,
                e = (t.mode & 1) !== 0,
                n) {
                case "dialog":
                    $("cancel", r),
                    $("close", r);
                    break;
                case "iframe":
                case "object":
                case "embed":
                    $("load", r);
                    break;
                case "video":
                case "audio":
                    for (l = 0; l < Nn.length; l++)
                        $(Nn[l], r);
                    break;
                case "source":
                    $("error", r);
                    break;
                case "img":
                case "image":
                case "link":
                    $("error", r),
                    $("load", r);
                    break;
                case "details":
                    $("toggle", r);
                    break;
                case "input":
                    qo(r, i),
                    $("invalid", r);
                    break;
                case "select":
                    r._wrapperState = {
                        wasMultiple: !!i.multiple
                    },
                    $("invalid", r);
                    break;
                case "textarea":
                    ts(r, i),
                    $("invalid", r)
                }
                hi(n, i),
                l = null;
                for (var o in i)
                    if (i.hasOwnProperty(o)) {
                        var a = i[o];
                        o === "children" ? typeof a == "string" ? r.textContent !== a && (i.suppressHydrationWarning !== !0 && _r(r.textContent, a, e),
                        l = ["children", a]) : typeof a == "number" && r.textContent !== "" + a && (i.suppressHydrationWarning !== !0 && _r(r.textContent, a, e),
                        l = ["children", "" + a]) : $n.hasOwnProperty(o) && a != null && o === "onScroll" && $("scroll", r)
                    }
                switch (n) {
                case "input":
                    mr(r),
                    es(r, i, !0);
                    break;
                case "textarea":
                    mr(r),
                    ns(r);
                    break;
                case "select":
                case "option":
                    break;
                default:
                    typeof i.onClick == "function" && (r.onclick = Xr)
                }
                r = l,
                t.updateQueue = r,
                r !== null && (t.flags |= 4)
            } else {
                o = l.nodeType === 9 ? l : l.ownerDocument,
                e === "http://www.w3.org/1999/xhtml" && (e = Ea(n)),
                e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = o.createElement("div"),
                e.innerHTML = "<script><\/script>",
                e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = o.createElement(n, {
                    is: r.is
                }) : (e = o.createElement(n),
                n === "select" && (o = e,
                r.multiple ? o.multiple = !0 : r.size && (o.size = r.size))) : e = o.createElementNS(e, n),
                e[Ke] = t,
                e[er] = r,
                Ju(e, t, !1, !1),
                t.stateNode = e;
                e: {
                    switch (o = gi(n, r),
                    n) {
                    case "dialog":
                        $("cancel", e),
                        $("close", e),
                        l = r;
                        break;
                    case "iframe":
                    case "object":
                    case "embed":
                        $("load", e),
                        l = r;
                        break;
                    case "video":
                    case "audio":
                        for (l = 0; l < Nn.length; l++)
                            $(Nn[l], e);
                        l = r;
                        break;
                    case "source":
                        $("error", e),
                        l = r;
                        break;
                    case "img":
                    case "image":
                    case "link":
                        $("error", e),
                        $("load", e),
                        l = r;
                        break;
                    case "details":
                        $("toggle", e),
                        l = r;
                        break;
                    case "input":
                        qo(e, r),
                        l = ui(e, r),
                        $("invalid", e);
                        break;
                    case "option":
                        l = r;
                        break;
                    case "select":
                        e._wrapperState = {
                            wasMultiple: !!r.multiple
                        },
                        l = J({}, r, {
                            value: void 0
                        }),
                        $("invalid", e);
                        break;
                    case "textarea":
                        ts(e, r),
                        l = fi(e, r),
                        $("invalid", e);
                        break;
                    default:
                        l = r
                    }
                    hi(n, l),
                    a = l;
                    for (i in a)
                        if (a.hasOwnProperty(i)) {
                            var u = a[i];
                            i === "style" ? Ba(e, u) : i === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0,
                            u != null && za(e, u)) : i === "children" ? typeof u == "string" ? (n !== "textarea" || u !== "") && Vn(e, u) : typeof u == "number" && Vn(e, "" + u) : i !== "suppressContentEditableWarning" && i !== "suppressHydrationWarning" && i !== "autoFocus" && ($n.hasOwnProperty(i) ? u != null && i === "onScroll" && $("scroll", e) : u != null && ro(e, i, u, o))
                        }
                    switch (n) {
                    case "input":
                        mr(e),
                        es(e, r, !1);
                        break;
                    case "textarea":
                        mr(e),
                        ns(e);
                        break;
                    case "option":
                        r.value != null && e.setAttribute("value", "" + kt(r.value));
                        break;
                    case "select":
                        e.multiple = !!r.multiple,
                        i = r.value,
                        i != null ? ln(e, !!r.multiple, i, !1) : r.defaultValue != null && ln(e, !!r.multiple, r.defaultValue, !0);
                        break;
                    default:
                        typeof l.onClick == "function" && (e.onclick = Xr)
                    }
                    switch (n) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                        r = !!r.autoFocus;
                        break e;
                    case "img":
                        r = !0;
                        break e;
                    default:
                        r = !1
                    }
                }
                r && (t.flags |= 4)
            }
            t.ref !== null && (t.flags |= 512,
            t.flags |= 2097152)
        }
        return ce(t),
        null;
    case 6:
        if (e && t.stateNode != null)
            Zu(e, t, e.memoizedProps, r);
        else {
            if (typeof r != "string" && t.stateNode === null)
                throw Error(E(166));
            if (n = Rt(nr.current),
            Rt(Ye.current),
            Cr(t)) {
                if (r = t.stateNode,
                n = t.memoizedProps,
                r[Ke] = t,
                (i = r.nodeValue !== n) && (e = Ee,
                e !== null))
                    switch (e.tag) {
                    case 3:
                        _r(r.nodeValue, n, (e.mode & 1) !== 0);
                        break;
                    case 5:
                        e.memoizedProps.suppressHydrationWarning !== !0 && _r(r.nodeValue, n, (e.mode & 1) !== 0)
                    }
                i && (t.flags |= 4)
            } else
                r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r),
                r[Ke] = t,
                t.stateNode = r
        }
        return ce(t),
        null;
    case 13:
        if (V(Y),
        r = t.memoizedState,
        e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            if (K && Ce !== null && t.mode & 1 && !(t.flags & 128))
                mu(),
                pn(),
                t.flags |= 98560,
                i = !1;
            else if (i = Cr(t),
            r !== null && r.dehydrated !== null) {
                if (e === null) {
                    if (!i)
                        throw Error(E(318));
                    if (i = t.memoizedState,
                    i = i !== null ? i.dehydrated : null,
                    !i)
                        throw Error(E(317));
                    i[Ke] = t
                } else
                    pn(),
                    !(t.flags & 128) && (t.memoizedState = null),
                    t.flags |= 4;
                ce(t),
                i = !1
            } else
                Ae !== null && (Gi(Ae),
                Ae = null),
                i = !0;
            if (!i)
                return t.flags & 65536 ? t : null
        }
        return t.flags & 128 ? (t.lanes = n,
        t) : (r = r !== null,
        r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192,
        t.mode & 1 && (e === null || Y.current & 1 ? ne === 0 && (ne = 3) : Ao())),
        t.updateQueue !== null && (t.flags |= 4),
        ce(t),
        null);
    case 4:
        return gn(),
        Oi(e, t),
        e === null && Zn(t.stateNode.containerInfo),
        ce(t),
        null;
    case 10:
        return jo(t.type._context),
        ce(t),
        null;
    case 17:
        return ke(t.type) && Zr(),
        ce(t),
        null;
    case 19:
        if (V(Y),
        i = t.memoizedState,
        i === null)
            return ce(t),
            null;
        if (r = (t.flags & 128) !== 0,
        o = i.rendering,
        o === null)
            if (r)
                Bn(i, !1);
            else {
                if (ne !== 0 || e !== null && e.flags & 128)
                    for (e = t.child; e !== null; ) {
                        if (o = il(e),
                        o !== null) {
                            for (t.flags |= 128,
                            Bn(i, !1),
                            r = o.updateQueue,
                            r !== null && (t.updateQueue = r,
                            t.flags |= 4),
                            t.subtreeFlags = 0,
                            r = n,
                            n = t.child; n !== null; )
                                i = n,
                                e = r,
                                i.flags &= 14680066,
                                o = i.alternate,
                                o === null ? (i.childLanes = 0,
                                i.lanes = e,
                                i.child = null,
                                i.subtreeFlags = 0,
                                i.memoizedProps = null,
                                i.memoizedState = null,
                                i.updateQueue = null,
                                i.dependencies = null,
                                i.stateNode = null) : (i.childLanes = o.childLanes,
                                i.lanes = o.lanes,
                                i.child = o.child,
                                i.subtreeFlags = 0,
                                i.deletions = null,
                                i.memoizedProps = o.memoizedProps,
                                i.memoizedState = o.memoizedState,
                                i.updateQueue = o.updateQueue,
                                i.type = o.type,
                                e = o.dependencies,
                                i.dependencies = e === null ? null : {
                                    lanes: e.lanes,
                                    firstContext: e.firstContext
                                }),
                                n = n.sibling;
                            return U(Y, Y.current & 1 | 2),
                            t.child
                        }
                        e = e.sibling
                    }
                i.tail !== null && Z() > yn && (t.flags |= 128,
                r = !0,
                Bn(i, !1),
                t.lanes = 4194304)
            }
        else {
            if (!r)
                if (e = il(o),
                e !== null) {
                    if (t.flags |= 128,
                    r = !0,
                    n = e.updateQueue,
                    n !== null && (t.updateQueue = n,
                    t.flags |= 4),
                    Bn(i, !0),
                    i.tail === null && i.tailMode === "hidden" && !o.alternate && !K)
                        return ce(t),
                        null
                } else
                    2 * Z() - i.renderingStartTime > yn && n !== 1073741824 && (t.flags |= 128,
                    r = !0,
                    Bn(i, !1),
                    t.lanes = 4194304);
            i.isBackwards ? (o.sibling = t.child,
            t.child = o) : (n = i.last,
            n !== null ? n.sibling = o : t.child = o,
            i.last = o)
        }
        return i.tail !== null ? (t = i.tail,
        i.rendering = t,
        i.tail = t.sibling,
        i.renderingStartTime = Z(),
        t.sibling = null,
        n = Y.current,
        U(Y, r ? n & 1 | 2 : n & 1),
        t) : (ce(t),
        null);
    case 22:
    case 23:
        return Fo(),
        r = t.memoizedState !== null,
        e !== null && e.memoizedState !== null !== r && (t.flags |= 8192),
        r && t.mode & 1 ? _e & 1073741824 && (ce(t),
        t.subtreeFlags & 6 && (t.flags |= 8192)) : ce(t),
        null;
    case 24:
        return null;
    case 25:
        return null
    }
    throw Error(E(156, t.tag))
}
function Pf(e, t) {
    switch (vo(t),
    t.tag) {
    case 1:
        return ke(t.type) && Zr(),
        e = t.flags,
        e & 65536 ? (t.flags = e & -65537 | 128,
        t) : null;
    case 3:
        return gn(),
        V(Se),
        V(pe),
        Po(),
        e = t.flags,
        e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128,
        t) : null;
    case 5:
        return zo(t),
        null;
    case 13:
        if (V(Y),
        e = t.memoizedState,
        e !== null && e.dehydrated !== null) {
            if (t.alternate === null)
                throw Error(E(340));
            pn()
        }
        return e = t.flags,
        e & 65536 ? (t.flags = e & -65537 | 128,
        t) : null;
    case 19:
        return V(Y),
        null;
    case 4:
        return gn(),
        null;
    case 10:
        return jo(t.type._context),
        null;
    case 22:
    case 23:
        return Fo(),
        null;
    case 24:
        return null;
    default:
        return null
    }
}
var Pr = !1
  , fe = !1
  , Bf = typeof WeakSet == "function" ? WeakSet : Set
  , b = null;
function nn(e, t) {
    var n = e.ref;
    if (n !== null)
        if (typeof n == "function")
            try {
                n(null)
            } catch (r) {
                X(e, t, r)
            }
        else
            n.current = null
}
function Ui(e, t, n) {
    try {
        n()
    } catch (r) {
        X(e, t, r)
    }
}
var Vs = !1;
function Tf(e, t) {
    if (Ci = Yr,
    e = ru(),
    yo(e)) {
        if ("selectionStart"in e)
            var n = {
                start: e.selectionStart,
                end: e.selectionEnd
            };
        else
            e: {
                n = (n = e.ownerDocument) && n.defaultView || window;
                var r = n.getSelection && n.getSelection();
                if (r && r.rangeCount !== 0) {
                    n = r.anchorNode;
                    var l = r.anchorOffset
                      , i = r.focusNode;
                    r = r.focusOffset;
                    try {
                        n.nodeType,
                        i.nodeType
                    } catch {
                        n = null;
                        break e
                    }
                    var o = 0
                      , a = -1
                      , u = -1
                      , c = 0
                      , f = 0
                      , m = e
                      , p = null;
                    t: for (; ; ) {
                        for (var y; m !== n || l !== 0 && m.nodeType !== 3 || (a = o + l),
                        m !== i || r !== 0 && m.nodeType !== 3 || (u = o + r),
                        m.nodeType === 3 && (o += m.nodeValue.length),
                        (y = m.firstChild) !== null; )
                            p = m,
                            m = y;
                        for (; ; ) {
                            if (m === e)
                                break t;
                            if (p === n && ++c === l && (a = o),
                            p === i && ++f === r && (u = o),
                            (y = m.nextSibling) !== null)
                                break;
                            m = p,
                            p = m.parentNode
                        }
                        m = y
                    }
                    n = a === -1 || u === -1 ? null : {
                        start: a,
                        end: u
                    }
                } else
                    n = null
            }
        n = n || {
            start: 0,
            end: 0
        }
    } else
        n = null;
    for (Ei = {
        focusedElem: e,
        selectionRange: n
    },
    Yr = !1,
    b = t; b !== null; )
        if (t = b,
        e = t.child,
        (t.subtreeFlags & 1028) !== 0 && e !== null)
            e.return = t,
            b = e;
        else
            for (; b !== null; ) {
                t = b;
                try {
                    var k = t.alternate;
                    if (t.flags & 1024)
                        switch (t.tag) {
                        case 0:
                        case 11:
                        case 15:
                            break;
                        case 1:
                            if (k !== null) {
                                var _ = k.memoizedProps
                                  , z = k.memoizedState
                                  , h = t.stateNode
                                  , d = h.getSnapshotBeforeUpdate(t.elementType === t.type ? _ : De(t.type, _), z);
                                h.__reactInternalSnapshotBeforeUpdate = d
                            }
                            break;
                        case 3:
                            var g = t.stateNode.containerInfo;
                            g.nodeType === 1 ? g.textContent = "" : g.nodeType === 9 && g.documentElement && g.removeChild(g.documentElement);
                            break;
                        case 5:
                        case 6:
                        case 4:
                        case 17:
                            break;
                        default:
                            throw Error(E(163))
                        }
                } catch (x) {
                    X(t, t.return, x)
                }
                if (e = t.sibling,
                e !== null) {
                    e.return = t.return,
                    b = e;
                    break
                }
                b = t.return
            }
    return k = Vs,
    Vs = !1,
    k
}
function On(e, t, n) {
    var r = t.updateQueue;
    if (r = r !== null ? r.lastEffect : null,
    r !== null) {
        var l = r = r.next;
        do {
            if ((l.tag & e) === e) {
                var i = l.destroy;
                l.destroy = void 0,
                i !== void 0 && Ui(t, n, i)
            }
            l = l.next
        } while (l !== r)
    }
}
function kl(e, t) {
    if (t = t.updateQueue,
    t = t !== null ? t.lastEffect : null,
    t !== null) {
        var n = t = t.next;
        do {
            if ((n.tag & e) === e) {
                var r = n.create;
                n.destroy = r()
            }
            n = n.next
        } while (n !== t)
    }
}
function Hi(e) {
    var t = e.ref;
    if (t !== null) {
        var n = e.stateNode;
        switch (e.tag) {
        case 5:
            e = n;
            break;
        default:
            e = n
        }
        typeof t == "function" ? t(e) : t.current = e
    }
}
function qu(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null,
    qu(t)),
    e.child = null,
    e.deletions = null,
    e.sibling = null,
    e.tag === 5 && (t = e.stateNode,
    t !== null && (delete t[Ke],
    delete t[er],
    delete t[Bi],
    delete t[ff],
    delete t[pf])),
    e.stateNode = null,
    e.return = null,
    e.dependencies = null,
    e.memoizedProps = null,
    e.memoizedState = null,
    e.pendingProps = null,
    e.stateNode = null,
    e.updateQueue = null
}
function ec(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4
}
function Ks(e) {
    e: for (; ; ) {
        for (; e.sibling === null; ) {
            if (e.return === null || ec(e.return))
                return null;
            e = e.return
        }
        for (e.sibling.return = e.return,
        e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
            if (e.flags & 2 || e.child === null || e.tag === 4)
                continue e;
            e.child.return = e,
            e = e.child
        }
        if (!(e.flags & 2))
            return e.stateNode
    }
}
function $i(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
        e = e.stateNode,
        t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode,
        t.insertBefore(e, n)) : (t = n,
        t.appendChild(e)),
        n = n._reactRootContainer,
        n != null || t.onclick !== null || (t.onclick = Xr));
    else if (r !== 4 && (e = e.child,
    e !== null))
        for ($i(e, t, n),
        e = e.sibling; e !== null; )
            $i(e, t, n),
            e = e.sibling
}
function Vi(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
        e = e.stateNode,
        t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (r !== 4 && (e = e.child,
    e !== null))
        for (Vi(e, t, n),
        e = e.sibling; e !== null; )
            Vi(e, t, n),
            e = e.sibling
}
var oe = null
  , Fe = !1;
function ot(e, t, n) {
    for (n = n.child; n !== null; )
        tc(e, t, n),
        n = n.sibling
}
function tc(e, t, n) {
    if (Qe && typeof Qe.onCommitFiberUnmount == "function")
        try {
            Qe.onCommitFiberUnmount(hl, n)
        } catch {}
    switch (n.tag) {
    case 5:
        fe || nn(n, t);
    case 6:
        var r = oe
          , l = Fe;
        oe = null,
        ot(e, t, n),
        oe = r,
        Fe = l,
        oe !== null && (Fe ? (e = oe,
        n = n.stateNode,
        e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : oe.removeChild(n.stateNode));
        break;
    case 18:
        oe !== null && (Fe ? (e = oe,
        n = n.stateNode,
        e.nodeType === 8 ? Kl(e.parentNode, n) : e.nodeType === 1 && Kl(e, n),
        Gn(e)) : Kl(oe, n.stateNode));
        break;
    case 4:
        r = oe,
        l = Fe,
        oe = n.stateNode.containerInfo,
        Fe = !0,
        ot(e, t, n),
        oe = r,
        Fe = l;
        break;
    case 0:
    case 11:
    case 14:
    case 15:
        if (!fe && (r = n.updateQueue,
        r !== null && (r = r.lastEffect,
        r !== null))) {
            l = r = r.next;
            do {
                var i = l
                  , o = i.destroy;
                i = i.tag,
                o !== void 0 && (i & 2 || i & 4) && Ui(n, t, o),
                l = l.next
            } while (l !== r)
        }
        ot(e, t, n);
        break;
    case 1:
        if (!fe && (nn(n, t),
        r = n.stateNode,
        typeof r.componentWillUnmount == "function"))
            try {
                r.props = n.memoizedProps,
                r.state = n.memoizedState,
                r.componentWillUnmount()
            } catch (a) {
                X(n, t, a)
            }
        ot(e, t, n);
        break;
    case 21:
        ot(e, t, n);
        break;
    case 22:
        n.mode & 1 ? (fe = (r = fe) || n.memoizedState !== null,
        ot(e, t, n),
        fe = r) : ot(e, t, n);
        break;
    default:
        ot(e, t, n)
    }
}
function Qs(e) {
    var t = e.updateQueue;
    if (t !== null) {
        e.updateQueue = null;
        var n = e.stateNode;
        n === null && (n = e.stateNode = new Bf),
        t.forEach(function(r) {
            var l = Ff.bind(null, e, r);
            n.has(r) || (n.add(r),
            r.then(l, l))
        })
    }
}
function We(e, t) {
    var n = t.deletions;
    if (n !== null)
        for (var r = 0; r < n.length; r++) {
            var l = n[r];
            try {
                var i = e
                  , o = t
                  , a = o;
                e: for (; a !== null; ) {
                    switch (a.tag) {
                    case 5:
                        oe = a.stateNode,
                        Fe = !1;
                        break e;
                    case 3:
                        oe = a.stateNode.containerInfo,
                        Fe = !0;
                        break e;
                    case 4:
                        oe = a.stateNode.containerInfo,
                        Fe = !0;
                        break e
                    }
                    a = a.return
                }
                if (oe === null)
                    throw Error(E(160));
                tc(i, o, l),
                oe = null,
                Fe = !1;
                var u = l.alternate;
                u !== null && (u.return = null),
                l.return = null
            } catch (c) {
                X(l, t, c)
            }
        }
    if (t.subtreeFlags & 12854)
        for (t = t.child; t !== null; )
            nc(t, e),
            t = t.sibling
}
function nc(e, t) {
    var n = e.alternate
      , r = e.flags;
    switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
        if (We(t, e),
        $e(e),
        r & 4) {
            try {
                On(3, e, e.return),
                kl(3, e)
            } catch (_) {
                X(e, e.return, _)
            }
            try {
                On(5, e, e.return)
            } catch (_) {
                X(e, e.return, _)
            }
        }
        break;
    case 1:
        We(t, e),
        $e(e),
        r & 512 && n !== null && nn(n, n.return);
        break;
    case 5:
        if (We(t, e),
        $e(e),
        r & 512 && n !== null && nn(n, n.return),
        e.flags & 32) {
            var l = e.stateNode;
            try {
                Vn(l, "")
            } catch (_) {
                X(e, e.return, _)
            }
        }
        if (r & 4 && (l = e.stateNode,
        l != null)) {
            var i = e.memoizedProps
              , o = n !== null ? n.memoizedProps : i
              , a = e.type
              , u = e.updateQueue;
            if (e.updateQueue = null,
            u !== null)
                try {
                    a === "input" && i.type === "radio" && i.name != null && _a(l, i),
                    gi(a, o);
                    var c = gi(a, i);
                    for (o = 0; o < u.length; o += 2) {
                        var f = u[o]
                          , m = u[o + 1];
                        f === "style" ? Ba(l, m) : f === "dangerouslySetInnerHTML" ? za(l, m) : f === "children" ? Vn(l, m) : ro(l, f, m, c)
                    }
                    switch (a) {
                    case "input":
                        ci(l, i);
                        break;
                    case "textarea":
                        Ca(l, i);
                        break;
                    case "select":
                        var p = l._wrapperState.wasMultiple;
                        l._wrapperState.wasMultiple = !!i.multiple;
                        var y = i.value;
                        y != null ? ln(l, !!i.multiple, y, !1) : p !== !!i.multiple && (i.defaultValue != null ? ln(l, !!i.multiple, i.defaultValue, !0) : ln(l, !!i.multiple, i.multiple ? [] : "", !1))
                    }
                    l[er] = i
                } catch (_) {
                    X(e, e.return, _)
                }
        }
        break;
    case 6:
        if (We(t, e),
        $e(e),
        r & 4) {
            if (e.stateNode === null)
                throw Error(E(162));
            l = e.stateNode,
            i = e.memoizedProps;
            try {
                l.nodeValue = i
            } catch (_) {
                X(e, e.return, _)
            }
        }
        break;
    case 3:
        if (We(t, e),
        $e(e),
        r & 4 && n !== null && n.memoizedState.isDehydrated)
            try {
                Gn(t.containerInfo)
            } catch (_) {
                X(e, e.return, _)
            }
        break;
    case 4:
        We(t, e),
        $e(e);
        break;
    case 13:
        We(t, e),
        $e(e),
        l = e.child,
        l.flags & 8192 && (i = l.memoizedState !== null,
        l.stateNode.isHidden = i,
        !i || l.alternate !== null && l.alternate.memoizedState !== null || (Wo = Z())),
        r & 4 && Qs(e);
        break;
    case 22:
        if (f = n !== null && n.memoizedState !== null,
        e.mode & 1 ? (fe = (c = fe) || f,
        We(t, e),
        fe = c) : We(t, e),
        $e(e),
        r & 8192) {
            if (c = e.memoizedState !== null,
            (e.stateNode.isHidden = c) && !f && e.mode & 1)
                for (b = e,
                f = e.child; f !== null; ) {
                    for (m = b = f; b !== null; ) {
                        switch (p = b,
                        y = p.child,
                        p.tag) {
                        case 0:
                        case 11:
                        case 14:
                        case 15:
                            On(4, p, p.return);
                            break;
                        case 1:
                            nn(p, p.return);
                            var k = p.stateNode;
                            if (typeof k.componentWillUnmount == "function") {
                                r = p,
                                n = p.return;
                                try {
                                    t = r,
                                    k.props = t.memoizedProps,
                                    k.state = t.memoizedState,
                                    k.componentWillUnmount()
                                } catch (_) {
                                    X(r, n, _)
                                }
                            }
                            break;
                        case 5:
                            nn(p, p.return);
                            break;
                        case 22:
                            if (p.memoizedState !== null) {
                                Gs(m);
                                continue
                            }
                        }
                        y !== null ? (y.return = p,
                        b = y) : Gs(m)
                    }
                    f = f.sibling
                }
            e: for (f = null,
            m = e; ; ) {
                if (m.tag === 5) {
                    if (f === null) {
                        f = m;
                        try {
                            l = m.stateNode,
                            c ? (i = l.style,
                            typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none") : (a = m.stateNode,
                            u = m.memoizedProps.style,
                            o = u != null && u.hasOwnProperty("display") ? u.display : null,
                            a.style.display = Pa("display", o))
                        } catch (_) {
                            X(e, e.return, _)
                        }
                    }
                } else if (m.tag === 6) {
                    if (f === null)
                        try {
                            m.stateNode.nodeValue = c ? "" : m.memoizedProps
                        } catch (_) {
                            X(e, e.return, _)
                        }
                } else if ((m.tag !== 22 && m.tag !== 23 || m.memoizedState === null || m === e) && m.child !== null) {
                    m.child.return = m,
                    m = m.child;
                    continue
                }
                if (m === e)
                    break e;
                for (; m.sibling === null; ) {
                    if (m.return === null || m.return === e)
                        break e;
                    f === m && (f = null),
                    m = m.return
                }
                f === m && (f = null),
                m.sibling.return = m.return,
                m = m.sibling
            }
        }
        break;
    case 19:
        We(t, e),
        $e(e),
        r & 4 && Qs(e);
        break;
    case 21:
        break;
    default:
        We(t, e),
        $e(e)
    }
}
function $e(e) {
    var t = e.flags;
    if (t & 2) {
        try {
            e: {
                for (var n = e.return; n !== null; ) {
                    if (ec(n)) {
                        var r = n;
                        break e
                    }
                    n = n.return
                }
                throw Error(E(160))
            }
            switch (r.tag) {
            case 5:
                var l = r.stateNode;
                r.flags & 32 && (Vn(l, ""),
                r.flags &= -33);
                var i = Ks(e);
                Vi(e, i, l);
                break;
            case 3:
            case 4:
                var o = r.stateNode.containerInfo
                  , a = Ks(e);
                $i(e, a, o);
                break;
            default:
                throw Error(E(161))
            }
        } catch (u) {
            X(e, e.return, u)
        }
        e.flags &= -3
    }
    t & 4096 && (e.flags &= -4097)
}
function bf(e, t, n) {
    b = e,
    rc(e)
}
function rc(e, t, n) {
    for (var r = (e.mode & 1) !== 0; b !== null; ) {
        var l = b
          , i = l.child;
        if (l.tag === 22 && r) {
            var o = l.memoizedState !== null || Pr;
            if (!o) {
                var a = l.alternate
                  , u = a !== null && a.memoizedState !== null || fe;
                a = Pr;
                var c = fe;
                if (Pr = o,
                (fe = u) && !c)
                    for (b = l; b !== null; )
                        o = b,
                        u = o.child,
                        o.tag === 22 && o.memoizedState !== null ? Js(l) : u !== null ? (u.return = o,
                        b = u) : Js(l);
                for (; i !== null; )
                    b = i,
                    rc(i),
                    i = i.sibling;
                b = l,
                Pr = a,
                fe = c
            }
            Ys(e)
        } else
            l.subtreeFlags & 8772 && i !== null ? (i.return = l,
            b = i) : Ys(e)
    }
}
function Ys(e) {
    for (; b !== null; ) {
        var t = b;
        if (t.flags & 8772) {
            var n = t.alternate;
            try {
                if (t.flags & 8772)
                    switch (t.tag) {
                    case 0:
                    case 11:
                    case 15:
                        fe || kl(5, t);
                        break;
                    case 1:
                        var r = t.stateNode;
                        if (t.flags & 4 && !fe)
                            if (n === null)
                                r.componentDidMount();
                            else {
                                var l = t.elementType === t.type ? n.memoizedProps : De(t.type, n.memoizedProps);
                                r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate)
                            }
                        var i = t.updateQueue;
                        i !== null && Ms(t, i, r);
                        break;
                    case 3:
                        var o = t.updateQueue;
                        if (o !== null) {
                            if (n = null,
                            t.child !== null)
                                switch (t.child.tag) {
                                case 5:
                                    n = t.child.stateNode;
                                    break;
                                case 1:
                                    n = t.child.stateNode
                                }
                            Ms(t, o, n)
                        }
                        break;
                    case 5:
                        var a = t.stateNode;
                        if (n === null && t.flags & 4) {
                            n = a;
                            var u = t.memoizedProps;
                            switch (t.type) {
                            case "button":
                            case "input":
                            case "select":
                            case "textarea":
                                u.autoFocus && n.focus();
                                break;
                            case "img":
                                u.src && (n.src = u.src)
                            }
                        }
                        break;
                    case 6:
                        break;
                    case 4:
                        break;
                    case 12:
                        break;
                    case 13:
                        if (t.memoizedState === null) {
                            var c = t.alternate;
                            if (c !== null) {
                                var f = c.memoizedState;
                                if (f !== null) {
                                    var m = f.dehydrated;
                                    m !== null && Gn(m)
                                }
                            }
                        }
                        break;
                    case 19:
                    case 17:
                    case 21:
                    case 22:
                    case 23:
                    case 25:
                        break;
                    default:
                        throw Error(E(163))
                    }
                fe || t.flags & 512 && Hi(t)
            } catch (p) {
                X(t, t.return, p)
            }
        }
        if (t === e) {
            b = null;
            break
        }
        if (n = t.sibling,
        n !== null) {
            n.return = t.return,
            b = n;
            break
        }
        b = t.return
    }
}
function Gs(e) {
    for (; b !== null; ) {
        var t = b;
        if (t === e) {
            b = null;
            break
        }
        var n = t.sibling;
        if (n !== null) {
            n.return = t.return,
            b = n;
            break
        }
        b = t.return
    }
}
function Js(e) {
    for (; b !== null; ) {
        var t = b;
        try {
            switch (t.tag) {
            case 0:
            case 11:
            case 15:
                var n = t.return;
                try {
                    kl(4, t)
                } catch (u) {
                    X(t, n, u)
                }
                break;
            case 1:
                var r = t.stateNode;
                if (typeof r.componentDidMount == "function") {
                    var l = t.return;
                    try {
                        r.componentDidMount()
                    } catch (u) {
                        X(t, l, u)
                    }
                }
                var i = t.return;
                try {
                    Hi(t)
                } catch (u) {
                    X(t, i, u)
                }
                break;
            case 5:
                var o = t.return;
                try {
                    Hi(t)
                } catch (u) {
                    X(t, o, u)
                }
            }
        } catch (u) {
            X(t, t.return, u)
        }
        if (t === e) {
            b = null;
            break
        }
        var a = t.sibling;
        if (a !== null) {
            a.return = t.return,
            b = a;
            break
        }
        b = t.return
    }
}
var Mf = Math.ceil
  , al = it.ReactCurrentDispatcher
  , Io = it.ReactCurrentOwner
  , Ne = it.ReactCurrentBatchConfig
  , A = 0
  , ie = null
  , q = null
  , se = 0
  , _e = 0
  , rn = Ct(0)
  , ne = 0
  , or = null
  , Ft = 0
  , jl = 0
  , Lo = 0
  , Un = null
  , ve = null
  , Wo = 0
  , yn = 1 / 0
  , Ge = null
  , ul = !1
  , Ki = null
  , vt = null
  , Br = !1
  , ft = null
  , cl = 0
  , Hn = 0
  , Qi = null
  , Ar = -1
  , Or = 0;
function me() {
    return A & 6 ? Z() : Ar !== -1 ? Ar : Ar = Z()
}
function wt(e) {
    return e.mode & 1 ? A & 2 && se !== 0 ? se & -se : gf.transition !== null ? (Or === 0 && (Or = Oa()),
    Or) : (e = O,
    e !== 0 || (e = window.event,
    e = e === void 0 ? 16 : Ya(e.type)),
    e) : 1
}
function Ue(e, t, n, r) {
    if (50 < Hn)
        throw Hn = 0,
        Qi = null,
        Error(E(185));
    ar(e, n, r),
    (!(A & 2) || e !== ie) && (e === ie && (!(A & 2) && (jl |= n),
    ne === 4 && ct(e, se)),
    je(e, r),
    n === 1 && A === 0 && !(t.mode & 1) && (yn = Z() + 500,
    vl && Et()))
}
function je(e, t) {
    var n = e.callbackNode;
    hd(e, t);
    var r = Qr(e, e === ie ? se : 0);
    if (r === 0)
        n !== null && is(n),
        e.callbackNode = null,
        e.callbackPriority = 0;
    else if (t = r & -r,
    e.callbackPriority !== t) {
        if (n != null && is(n),
        t === 1)
            e.tag === 0 ? hf(Xs.bind(null, e)) : pu(Xs.bind(null, e)),
            cf(function() {
                !(A & 6) && Et()
            }),
            n = null;
        else {
            switch (Ua(r)) {
            case 1:
                n = ao;
                break;
            case 4:
                n = Fa;
                break;
            case 16:
                n = Kr;
                break;
            case 536870912:
                n = Aa;
                break;
            default:
                n = Kr
            }
            n = dc(n, lc.bind(null, e))
        }
        e.callbackPriority = t,
        e.callbackNode = n
    }
}
function lc(e, t) {
    if (Ar = -1,
    Or = 0,
    A & 6)
        throw Error(E(327));
    var n = e.callbackNode;
    if (cn() && e.callbackNode !== n)
        return null;
    var r = Qr(e, e === ie ? se : 0);
    if (r === 0)
        return null;
    if (r & 30 || r & e.expiredLanes || t)
        t = dl(e, r);
    else {
        t = r;
        var l = A;
        A |= 2;
        var i = oc();
        (ie !== e || se !== t) && (Ge = null,
        yn = Z() + 500,
        Nt(e, t));
        do
            try {
                If();
                break
            } catch (a) {
                ic(e, a)
            }
        while (!0);
        ko(),
        al.current = i,
        A = l,
        q !== null ? t = 0 : (ie = null,
        se = 0,
        t = ne)
    }
    if (t !== 0) {
        if (t === 2 && (l = wi(e),
        l !== 0 && (r = l,
        t = Yi(e, l))),
        t === 1)
            throw n = or,
            Nt(e, 0),
            ct(e, r),
            je(e, Z()),
            n;
        if (t === 6)
            ct(e, r);
        else {
            if (l = e.current.alternate,
            !(r & 30) && !Rf(l) && (t = dl(e, r),
            t === 2 && (i = wi(e),
            i !== 0 && (r = i,
            t = Yi(e, i))),
            t === 1))
                throw n = or,
                Nt(e, 0),
                ct(e, r),
                je(e, Z()),
                n;
            switch (e.finishedWork = l,
            e.finishedLanes = r,
            t) {
            case 0:
            case 1:
                throw Error(E(345));
            case 2:
                Tt(e, ve, Ge);
                break;
            case 3:
                if (ct(e, r),
                (r & 130023424) === r && (t = Wo + 500 - Z(),
                10 < t)) {
                    if (Qr(e, 0) !== 0)
                        break;
                    if (l = e.suspendedLanes,
                    (l & r) !== r) {
                        me(),
                        e.pingedLanes |= e.suspendedLanes & l;
                        break
                    }
                    e.timeoutHandle = Pi(Tt.bind(null, e, ve, Ge), t);
                    break
                }
                Tt(e, ve, Ge);
                break;
            case 4:
                if (ct(e, r),
                (r & 4194240) === r)
                    break;
                for (t = e.eventTimes,
                l = -1; 0 < r; ) {
                    var o = 31 - Oe(r);
                    i = 1 << o,
                    o = t[o],
                    o > l && (l = o),
                    r &= ~i
                }
                if (r = l,
                r = Z() - r,
                r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Mf(r / 1960)) - r,
                10 < r) {
                    e.timeoutHandle = Pi(Tt.bind(null, e, ve, Ge), r);
                    break
                }
                Tt(e, ve, Ge);
                break;
            case 5:
                Tt(e, ve, Ge);
                break;
            default:
                throw Error(E(329))
            }
        }
    }
    return je(e, Z()),
    e.callbackNode === n ? lc.bind(null, e) : null
}
function Yi(e, t) {
    var n = Un;
    return e.current.memoizedState.isDehydrated && (Nt(e, t).flags |= 256),
    e = dl(e, t),
    e !== 2 && (t = ve,
    ve = n,
    t !== null && Gi(t)),
    e
}
function Gi(e) {
    ve === null ? ve = e : ve.push.apply(ve, e)
}
function Rf(e) {
    for (var t = e; ; ) {
        if (t.flags & 16384) {
            var n = t.updateQueue;
            if (n !== null && (n = n.stores,
            n !== null))
                for (var r = 0; r < n.length; r++) {
                    var l = n[r]
                      , i = l.getSnapshot;
                    l = l.value;
                    try {
                        if (!He(i(), l))
                            return !1
                    } catch {
                        return !1
                    }
                }
        }
        if (n = t.child,
        t.subtreeFlags & 16384 && n !== null)
            n.return = t,
            t = n;
        else {
            if (t === e)
                break;
            for (; t.sibling === null; ) {
                if (t.return === null || t.return === e)
                    return !0;
                t = t.return
            }
            t.sibling.return = t.return,
            t = t.sibling
        }
    }
    return !0
}
function ct(e, t) {
    for (t &= ~Lo,
    t &= ~jl,
    e.suspendedLanes |= t,
    e.pingedLanes &= ~t,
    e = e.expirationTimes; 0 < t; ) {
        var n = 31 - Oe(t)
          , r = 1 << n;
        e[n] = -1,
        t &= ~r
    }
}
function Xs(e) {
    if (A & 6)
        throw Error(E(327));
    cn();
    var t = Qr(e, 0);
    if (!(t & 1))
        return je(e, Z()),
        null;
    var n = dl(e, t);
    if (e.tag !== 0 && n === 2) {
        var r = wi(e);
        r !== 0 && (t = r,
        n = Yi(e, r))
    }
    if (n === 1)
        throw n = or,
        Nt(e, 0),
        ct(e, t),
        je(e, Z()),
        n;
    if (n === 6)
        throw Error(E(345));
    return e.finishedWork = e.current.alternate,
    e.finishedLanes = t,
    Tt(e, ve, Ge),
    je(e, Z()),
    null
}
function Do(e, t) {
    var n = A;
    A |= 1;
    try {
        return e(t)
    } finally {
        A = n,
        A === 0 && (yn = Z() + 500,
        vl && Et())
    }
}
function At(e) {
    ft !== null && ft.tag === 0 && !(A & 6) && cn();
    var t = A;
    A |= 1;
    var n = Ne.transition
      , r = O;
    try {
        if (Ne.transition = null,
        O = 1,
        e)
            return e()
    } finally {
        O = r,
        Ne.transition = n,
        A = t,
        !(A & 6) && Et()
    }
}
function Fo() {
    _e = rn.current,
    V(rn)
}
function Nt(e, t) {
    e.finishedWork = null,
    e.finishedLanes = 0;
    var n = e.timeoutHandle;
    if (n !== -1 && (e.timeoutHandle = -1,
    uf(n)),
    q !== null)
        for (n = q.return; n !== null; ) {
            var r = n;
            switch (vo(r),
            r.tag) {
            case 1:
                r = r.type.childContextTypes,
                r != null && Zr();
                break;
            case 3:
                gn(),
                V(Se),
                V(pe),
                Po();
                break;
            case 5:
                zo(r);
                break;
            case 4:
                gn();
                break;
            case 13:
                V(Y);
                break;
            case 19:
                V(Y);
                break;
            case 10:
                jo(r.type._context);
                break;
            case 22:
            case 23:
                Fo()
            }
            n = n.return
        }
    if (ie = e,
    q = e = St(e.current, null),
    se = _e = t,
    ne = 0,
    or = null,
    Lo = jl = Ft = 0,
    ve = Un = null,
    Mt !== null) {
        for (t = 0; t < Mt.length; t++)
            if (n = Mt[t],
            r = n.interleaved,
            r !== null) {
                n.interleaved = null;
                var l = r.next
                  , i = n.pending;
                if (i !== null) {
                    var o = i.next;
                    i.next = l,
                    r.next = o
                }
                n.pending = r
            }
        Mt = null
    }
    return e
}
function ic(e, t) {
    do {
        var n = q;
        try {
            if (ko(),
            Wr.current = sl,
            ol) {
                for (var r = G.memoizedState; r !== null; ) {
                    var l = r.queue;
                    l !== null && (l.pending = null),
                    r = r.next
                }
                ol = !1
            }
            if (Dt = 0,
            le = ee = G = null,
            An = !1,
            rr = 0,
            Io.current = null,
            n === null || n.return === null) {
                ne = 1,
                or = t,
                q = null;
                break
            }
            e: {
                var i = e
                  , o = n.return
                  , a = n
                  , u = t;
                if (t = se,
                a.flags |= 32768,
                u !== null && typeof u == "object" && typeof u.then == "function") {
                    var c = u
                      , f = a
                      , m = f.tag;
                    if (!(f.mode & 1) && (m === 0 || m === 11 || m === 15)) {
                        var p = f.alternate;
                        p ? (f.updateQueue = p.updateQueue,
                        f.memoizedState = p.memoizedState,
                        f.lanes = p.lanes) : (f.updateQueue = null,
                        f.memoizedState = null)
                    }
                    var y = Ds(o);
                    if (y !== null) {
                        y.flags &= -257,
                        Fs(y, o, a, i, t),
                        y.mode & 1 && Ws(i, c, t),
                        t = y,
                        u = c;
                        var k = t.updateQueue;
                        if (k === null) {
                            var _ = new Set;
                            _.add(u),
                            t.updateQueue = _
                        } else
                            k.add(u);
                        break e
                    } else {
                        if (!(t & 1)) {
                            Ws(i, c, t),
                            Ao();
                            break e
                        }
                        u = Error(E(426))
                    }
                } else if (K && a.mode & 1) {
                    var z = Ds(o);
                    if (z !== null) {
                        !(z.flags & 65536) && (z.flags |= 256),
                        Fs(z, o, a, i, t),
                        wo(mn(u, a));
                        break e
                    }
                }
                i = u = mn(u, a),
                ne !== 4 && (ne = 2),
                Un === null ? Un = [i] : Un.push(i),
                i = o;
                do {
                    switch (i.tag) {
                    case 3:
                        i.flags |= 65536,
                        t &= -t,
                        i.lanes |= t;
                        var h = Uu(i, u, t);
                        bs(i, h);
                        break e;
                    case 1:
                        a = u;
                        var d = i.type
                          , g = i.stateNode;
                        if (!(i.flags & 128) && (typeof d.getDerivedStateFromError == "function" || g !== null && typeof g.componentDidCatch == "function" && (vt === null || !vt.has(g)))) {
                            i.flags |= 65536,
                            t &= -t,
                            i.lanes |= t;
                            var x = Hu(i, a, t);
                            bs(i, x);
                            break e
                        }
                    }
                    i = i.return
                } while (i !== null)
            }
            ac(n)
        } catch (C) {
            t = C,
            q === n && n !== null && (q = n = n.return);
            continue
        }
        break
    } while (!0)
}
function oc() {
    var e = al.current;
    return al.current = sl,
    e === null ? sl : e
}
function Ao() {
    (ne === 0 || ne === 3 || ne === 2) && (ne = 4),
    ie === null || !(Ft & 268435455) && !(jl & 268435455) || ct(ie, se)
}
function dl(e, t) {
    var n = A;
    A |= 2;
    var r = oc();
    (ie !== e || se !== t) && (Ge = null,
    Nt(e, t));
    do
        try {
            Nf();
            break
        } catch (l) {
            ic(e, l)
        }
    while (!0);
    if (ko(),
    A = n,
    al.current = r,
    q !== null)
        throw Error(E(261));
    return ie = null,
    se = 0,
    ne
}
function Nf() {
    for (; q !== null; )
        sc(q)
}
function If() {
    for (; q !== null && !id(); )
        sc(q)
}
function sc(e) {
    var t = cc(e.alternate, e, _e);
    e.memoizedProps = e.pendingProps,
    t === null ? ac(e) : q = t,
    Io.current = null
}
function ac(e) {
    var t = e;
    do {
        var n = t.alternate;
        if (e = t.return,
        t.flags & 32768) {
            if (n = Pf(n, t),
            n !== null) {
                n.flags &= 32767,
                q = n;
                return
            }
            if (e !== null)
                e.flags |= 32768,
                e.subtreeFlags = 0,
                e.deletions = null;
            else {
                ne = 6,
                q = null;
                return
            }
        } else if (n = zf(n, t, _e),
        n !== null) {
            q = n;
            return
        }
        if (t = t.sibling,
        t !== null) {
            q = t;
            return
        }
        q = t = e
    } while (t !== null);
    ne === 0 && (ne = 5)
}
function Tt(e, t, n) {
    var r = O
      , l = Ne.transition;
    try {
        Ne.transition = null,
        O = 1,
        Lf(e, t, n, r)
    } finally {
        Ne.transition = l,
        O = r
    }
    return null
}
function Lf(e, t, n, r) {
    do
        cn();
    while (ft !== null);
    if (A & 6)
        throw Error(E(327));
    n = e.finishedWork;
    var l = e.finishedLanes;
    if (n === null)
        return null;
    if (e.finishedWork = null,
    e.finishedLanes = 0,
    n === e.current)
        throw Error(E(177));
    e.callbackNode = null,
    e.callbackPriority = 0;
    var i = n.lanes | n.childLanes;
    if (gd(e, i),
    e === ie && (q = ie = null,
    se = 0),
    !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Br || (Br = !0,
    dc(Kr, function() {
        return cn(),
        null
    })),
    i = (n.flags & 15990) !== 0,
    n.subtreeFlags & 15990 || i) {
        i = Ne.transition,
        Ne.transition = null;
        var o = O;
        O = 1;
        var a = A;
        A |= 4,
        Io.current = null,
        Tf(e, n),
        nc(n, e),
        tf(Ei),
        Yr = !!Ci,
        Ei = Ci = null,
        e.current = n,
        bf(n),
        od(),
        A = a,
        O = o,
        Ne.transition = i
    } else
        e.current = n;
    if (Br && (Br = !1,
    ft = e,
    cl = l),
    i = e.pendingLanes,
    i === 0 && (vt = null),
    ud(n.stateNode),
    je(e, Z()),
    t !== null)
        for (r = e.onRecoverableError,
        n = 0; n < t.length; n++)
            l = t[n],
            r(l.value, {
                componentStack: l.stack,
                digest: l.digest
            });
    if (ul)
        throw ul = !1,
        e = Ki,
        Ki = null,
        e;
    return cl & 1 && e.tag !== 0 && cn(),
    i = e.pendingLanes,
    i & 1 ? e === Qi ? Hn++ : (Hn = 0,
    Qi = e) : Hn = 0,
    Et(),
    null
}
function cn() {
    if (ft !== null) {
        var e = Ua(cl)
          , t = Ne.transition
          , n = O;
        try {
            if (Ne.transition = null,
            O = 16 > e ? 16 : e,
            ft === null)
                var r = !1;
            else {
                if (e = ft,
                ft = null,
                cl = 0,
                A & 6)
                    throw Error(E(331));
                var l = A;
                for (A |= 4,
                b = e.current; b !== null; ) {
                    var i = b
                      , o = i.child;
                    if (b.flags & 16) {
                        var a = i.deletions;
                        if (a !== null) {
                            for (var u = 0; u < a.length; u++) {
                                var c = a[u];
                                for (b = c; b !== null; ) {
                                    var f = b;
                                    switch (f.tag) {
                                    case 0:
                                    case 11:
                                    case 15:
                                        On(8, f, i)
                                    }
                                    var m = f.child;
                                    if (m !== null)
                                        m.return = f,
                                        b = m;
                                    else
                                        for (; b !== null; ) {
                                            f = b;
                                            var p = f.sibling
                                              , y = f.return;
                                            if (qu(f),
                                            f === c) {
                                                b = null;
                                                break
                                            }
                                            if (p !== null) {
                                                p.return = y,
                                                b = p;
                                                break
                                            }
                                            b = y
                                        }
                                }
                            }
                            var k = i.alternate;
                            if (k !== null) {
                                var _ = k.child;
                                if (_ !== null) {
                                    k.child = null;
                                    do {
                                        var z = _.sibling;
                                        _.sibling = null,
                                        _ = z
                                    } while (_ !== null)
                                }
                            }
                            b = i
                        }
                    }
                    if (i.subtreeFlags & 2064 && o !== null)
                        o.return = i,
                        b = o;
                    else
                        e: for (; b !== null; ) {
                            if (i = b,
                            i.flags & 2048)
                                switch (i.tag) {
                                case 0:
                                case 11:
                                case 15:
                                    On(9, i, i.return)
                                }
                            var h = i.sibling;
                            if (h !== null) {
                                h.return = i.return,
                                b = h;
                                break e
                            }
                            b = i.return
                        }
                }
                var d = e.current;
                for (b = d; b !== null; ) {
                    o = b;
                    var g = o.child;
                    if (o.subtreeFlags & 2064 && g !== null)
                        g.return = o,
                        b = g;
                    else
                        e: for (o = d; b !== null; ) {
                            if (a = b,
                            a.flags & 2048)
                                try {
                                    switch (a.tag) {
                                    case 0:
                                    case 11:
                                    case 15:
                                        kl(9, a)
                                    }
                                } catch (C) {
                                    X(a, a.return, C)
                                }
                            if (a === o) {
                                b = null;
                                break e
                            }
                            var x = a.sibling;
                            if (x !== null) {
                                x.return = a.return,
                                b = x;
                                break e
                            }
                            b = a.return
                        }
                }
                if (A = l,
                Et(),
                Qe && typeof Qe.onPostCommitFiberRoot == "function")
                    try {
                        Qe.onPostCommitFiberRoot(hl, e)
                    } catch {}
                r = !0
            }
            return r
        } finally {
            O = n,
            Ne.transition = t
        }
    }
    return !1
}
function Zs(e, t, n) {
    t = mn(n, t),
    t = Uu(e, t, 1),
    e = xt(e, t, 1),
    t = me(),
    e !== null && (ar(e, 1, t),
    je(e, t))
}
function X(e, t, n) {
    if (e.tag === 3)
        Zs(e, e, n);
    else
        for (; t !== null; ) {
            if (t.tag === 3) {
                Zs(t, e, n);
                break
            } else if (t.tag === 1) {
                var r = t.stateNode;
                if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (vt === null || !vt.has(r))) {
                    e = mn(n, e),
                    e = Hu(t, e, 1),
                    t = xt(t, e, 1),
                    e = me(),
                    t !== null && (ar(t, 1, e),
                    je(t, e));
                    break
                }
            }
            t = t.return
        }
}
function Wf(e, t, n) {
    var r = e.pingCache;
    r !== null && r.delete(t),
    t = me(),
    e.pingedLanes |= e.suspendedLanes & n,
    ie === e && (se & n) === n && (ne === 4 || ne === 3 && (se & 130023424) === se && 500 > Z() - Wo ? Nt(e, 0) : Lo |= n),
    je(e, t)
}
function uc(e, t) {
    t === 0 && (e.mode & 1 ? (t = vr,
    vr <<= 1,
    !(vr & 130023424) && (vr = 4194304)) : t = 1);
    var n = me();
    e = nt(e, t),
    e !== null && (ar(e, t, n),
    je(e, n))
}
function Df(e) {
    var t = e.memoizedState
      , n = 0;
    t !== null && (n = t.retryLane),
    uc(e, n)
}
function Ff(e, t) {
    var n = 0;
    switch (e.tag) {
    case 13:
        var r = e.stateNode
          , l = e.memoizedState;
        l !== null && (n = l.retryLane);
        break;
    case 19:
        r = e.stateNode;
        break;
    default:
        throw Error(E(314))
    }
    r !== null && r.delete(t),
    uc(e, n)
}
var cc;
cc = function(e, t, n) {
    if (e !== null)
        if (e.memoizedProps !== t.pendingProps || Se.current)
            we = !0;
        else {
            if (!(e.lanes & n) && !(t.flags & 128))
                return we = !1,
                Ef(e, t, n);
            we = !!(e.flags & 131072)
        }
    else
        we = !1,
        K && t.flags & 1048576 && hu(t, tl, t.index);
    switch (t.lanes = 0,
    t.tag) {
    case 2:
        var r = t.type;
        Fr(e, t),
        e = t.pendingProps;
        var l = fn(t, pe.current);
        un(t, n),
        l = To(null, t, r, e, l, n);
        var i = bo();
        return t.flags |= 1,
        typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1,
        t.memoizedState = null,
        t.updateQueue = null,
        ke(r) ? (i = !0,
        qr(t)) : i = !1,
        t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null,
        Co(t),
        l.updater = Sl,
        t.stateNode = l,
        l._reactInternals = t,
        Ii(t, r, e, n),
        t = Di(null, t, r, !0, i, n)) : (t.tag = 0,
        K && i && xo(t),
        ge(null, t, l, n),
        t = t.child),
        t;
    case 16:
        r = t.elementType;
        e: {
            switch (Fr(e, t),
            e = t.pendingProps,
            l = r._init,
            r = l(r._payload),
            t.type = r,
            l = t.tag = Of(r),
            e = De(r, e),
            l) {
            case 0:
                t = Wi(null, t, r, e, n);
                break e;
            case 1:
                t = Us(null, t, r, e, n);
                break e;
            case 11:
                t = As(null, t, r, e, n);
                break e;
            case 14:
                t = Os(null, t, r, De(r.type, e), n);
                break e
            }
            throw Error(E(306, r, ""))
        }
        return t;
    case 0:
        return r = t.type,
        l = t.pendingProps,
        l = t.elementType === r ? l : De(r, l),
        Wi(e, t, r, l, n);
    case 1:
        return r = t.type,
        l = t.pendingProps,
        l = t.elementType === r ? l : De(r, l),
        Us(e, t, r, l, n);
    case 3:
        e: {
            if (Qu(t),
            e === null)
                throw Error(E(387));
            r = t.pendingProps,
            i = t.memoizedState,
            l = i.element,
            wu(e, t),
            ll(t, r, null, n);
            var o = t.memoizedState;
            if (r = o.element,
            i.isDehydrated)
                if (i = {
                    element: r,
                    isDehydrated: !1,
                    cache: o.cache,
                    pendingSuspenseBoundaries: o.pendingSuspenseBoundaries,
                    transitions: o.transitions
                },
                t.updateQueue.baseState = i,
                t.memoizedState = i,
                t.flags & 256) {
                    l = mn(Error(E(423)), t),
                    t = Hs(e, t, r, n, l);
                    break e
                } else if (r !== l) {
                    l = mn(Error(E(424)), t),
                    t = Hs(e, t, r, n, l);
                    break e
                } else
                    for (Ce = yt(t.stateNode.containerInfo.firstChild),
                    Ee = t,
                    K = !0,
                    Ae = null,
                    n = xu(t, null, r, n),
                    t.child = n; n; )
                        n.flags = n.flags & -3 | 4096,
                        n = n.sibling;
            else {
                if (pn(),
                r === l) {
                    t = rt(e, t, n);
                    break e
                }
                ge(e, t, r, n)
            }
            t = t.child
        }
        return t;
    case 5:
        return Su(t),
        e === null && Mi(t),
        r = t.type,
        l = t.pendingProps,
        i = e !== null ? e.memoizedProps : null,
        o = l.children,
        zi(r, l) ? o = null : i !== null && zi(r, i) && (t.flags |= 32),
        Ku(e, t),
        ge(e, t, o, n),
        t.child;
    case 6:
        return e === null && Mi(t),
        null;
    case 13:
        return Yu(e, t, n);
    case 4:
        return Eo(t, t.stateNode.containerInfo),
        r = t.pendingProps,
        e === null ? t.child = hn(t, null, r, n) : ge(e, t, r, n),
        t.child;
    case 11:
        return r = t.type,
        l = t.pendingProps,
        l = t.elementType === r ? l : De(r, l),
        As(e, t, r, l, n);
    case 7:
        return ge(e, t, t.pendingProps, n),
        t.child;
    case 8:
        return ge(e, t, t.pendingProps.children, n),
        t.child;
    case 12:
        return ge(e, t, t.pendingProps.children, n),
        t.child;
    case 10:
        e: {
            if (r = t.type._context,
            l = t.pendingProps,
            i = t.memoizedProps,
            o = l.value,
            U(nl, r._currentValue),
            r._currentValue = o,
            i !== null)
                if (He(i.value, o)) {
                    if (i.children === l.children && !Se.current) {
                        t = rt(e, t, n);
                        break e
                    }
                } else
                    for (i = t.child,
                    i !== null && (i.return = t); i !== null; ) {
                        var a = i.dependencies;
                        if (a !== null) {
                            o = i.child;
                            for (var u = a.firstContext; u !== null; ) {
                                if (u.context === r) {
                                    if (i.tag === 1) {
                                        u = qe(-1, n & -n),
                                        u.tag = 2;
                                        var c = i.updateQueue;
                                        if (c !== null) {
                                            c = c.shared;
                                            var f = c.pending;
                                            f === null ? u.next = u : (u.next = f.next,
                                            f.next = u),
                                            c.pending = u
                                        }
                                    }
                                    i.lanes |= n,
                                    u = i.alternate,
                                    u !== null && (u.lanes |= n),
                                    Ri(i.return, n, t),
                                    a.lanes |= n;
                                    break
                                }
                                u = u.next
                            }
                        } else if (i.tag === 10)
                            o = i.type === t.type ? null : i.child;
                        else if (i.tag === 18) {
                            if (o = i.return,
                            o === null)
                                throw Error(E(341));
                            o.lanes |= n,
                            a = o.alternate,
                            a !== null && (a.lanes |= n),
                            Ri(o, n, t),
                            o = i.sibling
                        } else
                            o = i.child;
                        if (o !== null)
                            o.return = i;
                        else
                            for (o = i; o !== null; ) {
                                if (o === t) {
                                    o = null;
                                    break
                                }
                                if (i = o.sibling,
                                i !== null) {
                                    i.return = o.return,
                                    o = i;
                                    break
                                }
                                o = o.return
                            }
                        i = o
                    }
            ge(e, t, l.children, n),
            t = t.child
        }
        return t;
    case 9:
        return l = t.type,
        r = t.pendingProps.children,
        un(t, n),
        l = Ie(l),
        r = r(l),
        t.flags |= 1,
        ge(e, t, r, n),
        t.child;
    case 14:
        return r = t.type,
        l = De(r, t.pendingProps),
        l = De(r.type, l),
        Os(e, t, r, l, n);
    case 15:
        return $u(e, t, t.type, t.pendingProps, n);
    case 17:
        return r = t.type,
        l = t.pendingProps,
        l = t.elementType === r ? l : De(r, l),
        Fr(e, t),
        t.tag = 1,
        ke(r) ? (e = !0,
        qr(t)) : e = !1,
        un(t, n),
        Ou(t, r, l),
        Ii(t, r, l, n),
        Di(null, t, r, !0, e, n);
    case 19:
        return Gu(e, t, n);
    case 22:
        return Vu(e, t, n)
    }
    throw Error(E(156, t.tag))
}
;
function dc(e, t) {
    return Da(e, t)
}
function Af(e, t, n, r) {
    this.tag = e,
    this.key = n,
    this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null,
    this.index = 0,
    this.ref = null,
    this.pendingProps = t,
    this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null,
    this.mode = r,
    this.subtreeFlags = this.flags = 0,
    this.deletions = null,
    this.childLanes = this.lanes = 0,
    this.alternate = null
}
function Re(e, t, n, r) {
    return new Af(e,t,n,r)
}
function Oo(e) {
    return e = e.prototype,
    !(!e || !e.isReactComponent)
}
function Of(e) {
    if (typeof e == "function")
        return Oo(e) ? 1 : 0;
    if (e != null) {
        if (e = e.$$typeof,
        e === io)
            return 11;
        if (e === oo)
            return 14
    }
    return 2
}
function St(e, t) {
    var n = e.alternate;
    return n === null ? (n = Re(e.tag, t, e.key, e.mode),
    n.elementType = e.elementType,
    n.type = e.type,
    n.stateNode = e.stateNode,
    n.alternate = e,
    e.alternate = n) : (n.pendingProps = t,
    n.type = e.type,
    n.flags = 0,
    n.subtreeFlags = 0,
    n.deletions = null),
    n.flags = e.flags & 14680064,
    n.childLanes = e.childLanes,
    n.lanes = e.lanes,
    n.child = e.child,
    n.memoizedProps = e.memoizedProps,
    n.memoizedState = e.memoizedState,
    n.updateQueue = e.updateQueue,
    t = e.dependencies,
    n.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext
    },
    n.sibling = e.sibling,
    n.index = e.index,
    n.ref = e.ref,
    n
}
function Ur(e, t, n, r, l, i) {
    var o = 2;
    if (r = e,
    typeof e == "function")
        Oo(e) && (o = 1);
    else if (typeof e == "string")
        o = 5;
    else
        e: switch (e) {
        case Qt:
            return It(n.children, l, i, t);
        case lo:
            o = 8,
            l |= 8;
            break;
        case ii:
            return e = Re(12, n, t, l | 2),
            e.elementType = ii,
            e.lanes = i,
            e;
        case oi:
            return e = Re(13, n, t, l),
            e.elementType = oi,
            e.lanes = i,
            e;
        case si:
            return e = Re(19, n, t, l),
            e.elementType = si,
            e.lanes = i,
            e;
        case Sa:
            return _l(n, l, i, t);
        default:
            if (typeof e == "object" && e !== null)
                switch (e.$$typeof) {
                case va:
                    o = 10;
                    break e;
                case wa:
                    o = 9;
                    break e;
                case io:
                    o = 11;
                    break e;
                case oo:
                    o = 14;
                    break e;
                case st:
                    o = 16,
                    r = null;
                    break e
                }
            throw Error(E(130, e == null ? e : typeof e, ""))
        }
    return t = Re(o, n, t, l),
    t.elementType = e,
    t.type = r,
    t.lanes = i,
    t
}
function It(e, t, n, r) {
    return e = Re(7, e, r, t),
    e.lanes = n,
    e
}
function _l(e, t, n, r) {
    return e = Re(22, e, r, t),
    e.elementType = Sa,
    e.lanes = n,
    e.stateNode = {
        isHidden: !1
    },
    e
}
function ei(e, t, n) {
    return e = Re(6, e, null, t),
    e.lanes = n,
    e
}
function ti(e, t, n) {
    return t = Re(4, e.children !== null ? e.children : [], e.key, t),
    t.lanes = n,
    t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation
    },
    t
}
function Uf(e, t, n, r, l) {
    this.tag = t,
    this.containerInfo = e,
    this.finishedWork = this.pingCache = this.current = this.pendingChildren = null,
    this.timeoutHandle = -1,
    this.callbackNode = this.pendingContext = this.context = null,
    this.callbackPriority = 0,
    this.eventTimes = Il(0),
    this.expirationTimes = Il(-1),
    this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0,
    this.entanglements = Il(0),
    this.identifierPrefix = r,
    this.onRecoverableError = l,
    this.mutableSourceEagerHydrationData = null
}
function Uo(e, t, n, r, l, i, o, a, u) {
    return e = new Uf(e,t,n,a,u),
    t === 1 ? (t = 1,
    i === !0 && (t |= 8)) : t = 0,
    i = Re(3, null, null, t),
    e.current = i,
    i.stateNode = e,
    i.memoizedState = {
        element: r,
        isDehydrated: n,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null
    },
    Co(i),
    e
}
function Hf(e, t, n) {
    var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
        $$typeof: Kt,
        key: r == null ? null : "" + r,
        children: e,
        containerInfo: t,
        implementation: n
    }
}
function fc(e) {
    if (!e)
        return jt;
    e = e._reactInternals;
    e: {
        if (Ut(e) !== e || e.tag !== 1)
            throw Error(E(170));
        var t = e;
        do {
            switch (t.tag) {
            case 3:
                t = t.stateNode.context;
                break e;
            case 1:
                if (ke(t.type)) {
                    t = t.stateNode.__reactInternalMemoizedMergedChildContext;
                    break e
                }
            }
            t = t.return
        } while (t !== null);
        throw Error(E(171))
    }
    if (e.tag === 1) {
        var n = e.type;
        if (ke(n))
            return fu(e, n, t)
    }
    return t
}
function pc(e, t, n, r, l, i, o, a, u) {
    return e = Uo(n, r, !0, e, l, i, o, a, u),
    e.context = fc(null),
    n = e.current,
    r = me(),
    l = wt(n),
    i = qe(r, l),
    i.callback = t ?? null,
    xt(n, i, l),
    e.current.lanes = l,
    ar(e, l, r),
    je(e, r),
    e
}
function Cl(e, t, n, r) {
    var l = t.current
      , i = me()
      , o = wt(l);
    return n = fc(n),
    t.context === null ? t.context = n : t.pendingContext = n,
    t = qe(i, o),
    t.payload = {
        element: e
    },
    r = r === void 0 ? null : r,
    r !== null && (t.callback = r),
    e = xt(l, t, o),
    e !== null && (Ue(e, l, o, i),
    Lr(e, l, o)),
    o
}
function fl(e) {
    if (e = e.current,
    !e.child)
        return null;
    switch (e.child.tag) {
    case 5:
        return e.child.stateNode;
    default:
        return e.child.stateNode
    }
}
function qs(e, t) {
    if (e = e.memoizedState,
    e !== null && e.dehydrated !== null) {
        var n = e.retryLane;
        e.retryLane = n !== 0 && n < t ? n : t
    }
}
function Ho(e, t) {
    qs(e, t),
    (e = e.alternate) && qs(e, t)
}
function $f() {
    return null
}
var hc = typeof reportError == "function" ? reportError : function(e) {
    console.error(e)
}
;
function $o(e) {
    this._internalRoot = e
}
El.prototype.render = $o.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null)
        throw Error(E(409));
    Cl(e, t, null, null)
}
;
El.prototype.unmount = $o.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        At(function() {
            Cl(null, e, null, null)
        }),
        t[tt] = null
    }
}
;
function El(e) {
    this._internalRoot = e
}
El.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
        var t = Va();
        e = {
            blockedOn: null,
            target: e,
            priority: t
        };
        for (var n = 0; n < ut.length && t !== 0 && t < ut[n].priority; n++)
            ;
        ut.splice(n, 0, e),
        n === 0 && Qa(e)
    }
}
;
function Vo(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
}
function zl(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
}
function ea() {}
function Vf(e, t, n, r, l) {
    if (l) {
        if (typeof r == "function") {
            var i = r;
            r = function() {
                var c = fl(o);
                i.call(c)
            }
        }
        var o = pc(t, r, e, 0, null, !1, !1, "", ea);
        return e._reactRootContainer = o,
        e[tt] = o.current,
        Zn(e.nodeType === 8 ? e.parentNode : e),
        At(),
        o
    }
    for (; l = e.lastChild; )
        e.removeChild(l);
    if (typeof r == "function") {
        var a = r;
        r = function() {
            var c = fl(u);
            a.call(c)
        }
    }
    var u = Uo(e, 0, !1, null, null, !1, !1, "", ea);
    return e._reactRootContainer = u,
    e[tt] = u.current,
    Zn(e.nodeType === 8 ? e.parentNode : e),
    At(function() {
        Cl(t, u, n, r)
    }),
    u
}
function Pl(e, t, n, r, l) {
    var i = n._reactRootContainer;
    if (i) {
        var o = i;
        if (typeof l == "function") {
            var a = l;
            l = function() {
                var u = fl(o);
                a.call(u)
            }
        }
        Cl(t, o, e, l)
    } else
        o = Vf(n, t, e, l, r);
    return fl(o)
}
Ha = function(e) {
    switch (e.tag) {
    case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
            var n = Rn(t.pendingLanes);
            n !== 0 && (uo(t, n | 1),
            je(t, Z()),
            !(A & 6) && (yn = Z() + 500,
            Et()))
        }
        break;
    case 13:
        At(function() {
            var r = nt(e, 1);
            if (r !== null) {
                var l = me();
                Ue(r, e, 1, l)
            }
        }),
        Ho(e, 1)
    }
}
;
co = function(e) {
    if (e.tag === 13) {
        var t = nt(e, 134217728);
        if (t !== null) {
            var n = me();
            Ue(t, e, 134217728, n)
        }
        Ho(e, 134217728)
    }
}
;
$a = function(e) {
    if (e.tag === 13) {
        var t = wt(e)
          , n = nt(e, t);
        if (n !== null) {
            var r = me();
            Ue(n, e, t, r)
        }
        Ho(e, t)
    }
}
;
Va = function() {
    return O
}
;
Ka = function(e, t) {
    var n = O;
    try {
        return O = e,
        t()
    } finally {
        O = n
    }
}
;
yi = function(e, t, n) {
    switch (t) {
    case "input":
        if (ci(e, n),
        t = n.name,
        n.type === "radio" && t != null) {
            for (n = e; n.parentNode; )
                n = n.parentNode;
            for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'),
            t = 0; t < n.length; t++) {
                var r = n[t];
                if (r !== e && r.form === e.form) {
                    var l = xl(r);
                    if (!l)
                        throw Error(E(90));
                    ja(r),
                    ci(r, l)
                }
            }
        }
        break;
    case "textarea":
        Ca(e, n);
        break;
    case "select":
        t = n.value,
        t != null && ln(e, !!n.multiple, t, !1)
    }
}
;
Ma = Do;
Ra = At;
var Kf = {
    usingClientEntryPoint: !1,
    Events: [cr, Xt, xl, Ta, ba, Do]
}
  , Tn = {
    findFiberByHostInstance: bt,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom"
}
  , Qf = {
    bundleType: Tn.bundleType,
    version: Tn.version,
    rendererPackageName: Tn.rendererPackageName,
    rendererConfig: Tn.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: it.ReactCurrentDispatcher,
    findHostInstanceByFiber: function(e) {
        return e = La(e),
        e === null ? null : e.stateNode
    },
    findFiberByHostInstance: Tn.findFiberByHostInstance || $f,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426"
};
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Tr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Tr.isDisabled && Tr.supportsFiber)
        try {
            hl = Tr.inject(Qf),
            Qe = Tr
        } catch {}
}
Pe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Kf;
Pe.createPortal = function(e, t) {
    var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Vo(t))
        throw Error(E(200));
    return Hf(e, t, null, n)
}
;
Pe.createRoot = function(e, t) {
    if (!Vo(e))
        throw Error(E(299));
    var n = !1
      , r = ""
      , l = hc;
    return t != null && (t.unstable_strictMode === !0 && (n = !0),
    t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
    t.onRecoverableError !== void 0 && (l = t.onRecoverableError)),
    t = Uo(e, 1, !1, null, null, n, !1, r, l),
    e[tt] = t.current,
    Zn(e.nodeType === 8 ? e.parentNode : e),
    new $o(t)
}
;
Pe.findDOMNode = function(e) {
    if (e == null)
        return null;
    if (e.nodeType === 1)
        return e;
    var t = e._reactInternals;
    if (t === void 0)
        throw typeof e.render == "function" ? Error(E(188)) : (e = Object.keys(e).join(","),
        Error(E(268, e)));
    return e = La(t),
    e = e === null ? null : e.stateNode,
    e
}
;
Pe.flushSync = function(e) {
    return At(e)
}
;
Pe.hydrate = function(e, t, n) {
    if (!zl(t))
        throw Error(E(200));
    return Pl(null, e, t, !0, n)
}
;
Pe.hydrateRoot = function(e, t, n) {
    if (!Vo(e))
        throw Error(E(405));
    var r = n != null && n.hydratedSources || null
      , l = !1
      , i = ""
      , o = hc;
    if (n != null && (n.unstable_strictMode === !0 && (l = !0),
    n.identifierPrefix !== void 0 && (i = n.identifierPrefix),
    n.onRecoverableError !== void 0 && (o = n.onRecoverableError)),
    t = pc(t, null, e, 1, n ?? null, l, !1, i, o),
    e[tt] = t.current,
    Zn(e),
    r)
        for (e = 0; e < r.length; e++)
            n = r[e],
            l = n._getVersion,
            l = l(n._source),
            t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(n, l);
    return new El(t)
}
;
Pe.render = function(e, t, n) {
    if (!zl(t))
        throw Error(E(200));
    return Pl(null, e, t, !1, n)
}
;
Pe.unmountComponentAtNode = function(e) {
    if (!zl(e))
        throw Error(E(40));
    return e._reactRootContainer ? (At(function() {
        Pl(null, null, e, !1, function() {
            e._reactRootContainer = null,
            e[tt] = null
        })
    }),
    !0) : !1
}
;
Pe.unstable_batchedUpdates = Do;
Pe.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
    if (!zl(n))
        throw Error(E(200));
    if (e == null || e._reactInternals === void 0)
        throw Error(E(38));
    return Pl(e, t, n, !1, r)
}
;
Pe.version = "18.3.1-next-f1338f8080-20240426";
function gc() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
        try {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(gc)
        } catch (e) {
            console.error(e)
        }
}
gc(),
ga.exports = Pe;
var Yf = ga.exports
  , ta = Yf;
ri.createRoot = ta.createRoot,
ri.hydrateRoot = ta.hydrateRoot;
const ni = "https://olewyqrxgwjjjspeonon.supabase.co"
  , Vt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sZXd5cXJ4Z3dqampzcGVvbm9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3MzM3NjMsImV4cCI6MjA5MDMwOTc2M30.mbY5GR8eZu7BH1UD0Yq2B_l5dr4bPB-RkYXa-vgRwYI"
  , Te = {
    async query(e, t={}) {
        let n = `${ni}/rest/v1/${e}?`;
        return t.select && (n += `select=${t.select}&`),
        t.eq && Object.entries(t.eq).forEach( ([l,i]) => n += `${l}=eq.${encodeURIComponent(i)}&`),
        t.order && (n += `order=${t.order}&`),
        (await fetch(n, {
            headers: {
                apikey: Vt,
                Authorization: `Bearer ${Vt}`
            }
        })).json()
    },
    async upsert(e, t, n) {
        const r = `${ni}/rest/v1/${e}?on_conflict=${n}`;
        return (await fetch(r, {
            method: "POST",
            headers: {
                apikey: Vt,
                Authorization: `Bearer ${Vt}`,
                "Content-Type": "application/json",
                Prefer: "resolution=merge-duplicates,return=representation"
            },
            body: JSON.stringify(t)
        })).json()
    },
    async update(e, t, n) {
        let r = `${ni}/rest/v1/${e}?`;
        return Object.entries(n).forEach( ([i,o]) => r += `${i}=eq.${encodeURIComponent(o)}&`),
        (await fetch(r, {
            method: "PATCH",
            headers: {
                apikey: Vt,
                Authorization: `Bearer ${Vt}`,
                "Content-Type": "application/json",
                Prefer: "return=representation"
            },
            body: JSON.stringify(t)
        })).json()
    }
}
  , pt = {
    RCB: {
        name: "Royal Challengers Bengaluru",
        color: "#CC0000",
        accent: "#FFD700"
    },
    MI: {
        name: "Mumbai Indians",
        color: "#004BA0",
        accent: "#88CFFF"
    },
    CSK: {
        name: "Chennai Super Kings",
        color: "#F5A623",
        accent: "#ffffff"
    },
    KKR: {
        name: "Kolkata Knight Riders",
        color: "#3A225D",
        accent: "#F5C518"
    },
    SRH: {
        name: "Sunrisers Hyderabad",
        color: "#FF6B00",
        accent: "#ffffff"
    },
    DC: {
        name: "Delhi Capitals",
        color: "#0A2D6E",
        accent: "#ffffff"
    },
    GT: {
        name: "Gujarat Titans",
        color: "#1C4F8C",
        accent: "#00D4FF"
    },
    RR: {
        name: "Rajasthan Royals",
        color: "#EA1A85",
        accent: "#ffffff"
    },
    PBKS: {
        name: "Punjab Kings",
        color: "#ED1B24",
        accent: "#DCDDDF"
    },
    LSG: {
        name: "Lucknow Super Giants",
        color: "#00B4D8",
        accent: "#FFD700"
    }
}
  , xn = {
    CSK: ["Ruturaj Gaikwad", "MS Dhoni", "Sanju Samson", "Kartik Sharma", "Urvil Patel", "Dewald Brevis", "Ayush Mhatre", "Sarfaraz Khan", "Shivam Dube", "Matthew Short", "Jamie Overton", "Ramakrishna Ghosh", "Anshul Kamboj", "Prashant Veer", "Aman Khan", "Zak Foulkes", "Khaleel Ahmed", "Mukesh Choudhary", "Gurjapneet Singh", "Matt Henry", "Spencer Johnson", "Shreyas Gopal", "Rahul Chahar", "Noor Ahmad", "Akeal Hosein"],
    DC: ["Axar Patel", "KL Rahul", "Prithvi Shaw", "David Miller", "Tristan Stubbs", "Abhishek Porel", "Karun Nair", "Sameer Rizvi", "Ashutosh Sharma", "Mitchell Starc", "T. Natarajan", "Mukesh Kumar", "Dushmantha Chameera", "Lungi Ngidi", "Kyle Jamieson", "Nitish Rana", "Kuldeep Yadav", "Ajay Mandal", "Tripurana Vijay", "Madhav Tiwari", "Auqib Dar", "Pathum Nissanka", "Sahil Parakh", "Vipraj Nigam"],
    GT: ["Shubman Gill", "Jos Buttler", "Sai Sudharsan", "Shahrukh Khan", "Anuj Rawat", "Kumar Kushagra", "Nishant Sindhu", "Rahul Tewatia", "Washington Sundar", "Rashid Khan", "Jason Holder", "Kagiso Rabada", "Mohammed Siraj", "Prasidh Krishna", "Ishant Sharma", "Sai Kishore", "Jayant Yadav", "Manav Suthar", "Arshad Khan", "Gurnoor Singh Brar", "Kulwant Khejroliya", "Glenn Phillips", "Tom Banton", "Luke Wood", "Ashok Sharma"],
    KKR: ["Ajinkya Rahane", "Cameron Green", "Rinku Singh", "Shreyas Iyer", "Venkatesh Iyer", "Nitish Rana", "Sunil Narine", "Andre Russell", "Varun Chakravarthy", "Navdeep Saini", "Saurabh Dubey", "Blessing Muzarabani", "Angkrish Raghuvanshi", "KS Bharat", "Vaibhav Arora", "Matheesha Pathirana", "Umran Malik", "Manish Pandey", "Rovman Powell", "Finn Allen", "Rachin Ravindra", "Daksh Kamra", "Tim Seifert", "Kartik Tyagi", "Prashant Solanki"],
    LSG: ["Rishabh Pant", "Nicholas Pooran", "Ayush Badoni", "Mohammed Shami", "Avesh Khan", "Mohsin Khan", "Arshin Kulkarni", "Shahbaz Ahmed", "Aiden Markram", "Abdul Samad", "Wanindu Hasaranga", "Himmat Singh", "Akshat Raghuwanshi", "Mitchell Marsh", "Arjun Tendulkar", "Matthew Breetzke", "Josh Inglis", "Mukul Choudhary", "Akash Maharaj Singh", "Anrich Nortje", "Prince Yadav", "Digvesh Singh Rathi", "Mayank Yadav", "Naman Tiwari", "Manimaran Siddharth"],
    MI: ["Hardik Pandya", "Rohit Sharma", "Suryakumar Yadav", "Tilak Varma", "Quinton de Kock", "Ryan Rickelton", "Naman Dhir", "Danish Malewar", "Sherfane Rutherford", "Will Jacks", "Mitchell Santner", "Shardul Thakur", "Raj Bawa", "Corbin Bosch", "Jasprit Bumrah", "Trent Boult", "Deepak Chahar", "Mayank Markande", "Atharva Ankolekar", "AM Ghazanfar", "Mayank Rawat", "Mohammad Izhar", "Raghu Sharma", "Robin Minz", "Ashwani Kumar"],
    PBKS: ["Marcus Stoinis", "Shreyas Iyer", "Prabhsimran Singh", "Arshdeep Singh", "Harpreet Brar", "Shashank Singh", "Yuzvendra Chahal", "Marco Jansen", "Priyansh Arya", "Pyla Avinash", "Nehal Wadhera", "Harnoor Singh", "Mitchell Owen", "Musheer Khan", "Suryansh Shedge", "Cooper Connolly", "Azmatullah Omarzai", "Praveen Dubey", "Vishnu Vinod", "Lockie Ferguson", "Xavier Bartlett", "Ben Dwarshuis", "Vishal Nishad", "Vijaykumar Vyshak", "Yash Thakur"],
    RCB: ["Rajat Patidar", "Virat Kohli", "Devdutt Padikkal", "Tim David", "Phil Salt", "Jitesh Sharma", "Jordan Cox", "Jacob Bethell", "Venkatesh Iyer", "Krunal Pandya", "Romario Shepherd", "Swapnil Singh", "Bhuvneshwar Kumar", "Rasikh Salam", "Suyash Sharma", "Vicky Ostwal", "Jacob Duffy", "Nuwan Thushara", "Abhinandan Singh", "Mangesh Yadav", "Kanishk Chouhan", "Vihaan Malhotra", "Satvik Deswal", "Josh Hazlewood"],
    RR: ["Riyan Parag", "Yashasvi Jaiswal", "Dhruv Jurel", "Shimron Hetmyer", "Shubham Dubey", "Ravindra Jadeja", "Dasun Shanaka", "Kuldeep Sen", "Prasidh Krishna", "Navdeep Saini", "Nandre Burger", "Donovan Ferreira", "Aman Rao Perala", "Vaibhav Suryavanshi", "Ravi Singh", "Lhuan-dre Pretorius", "Jofra Archer", "Tushar Deshpande", "Kwena Maphaka", "Sandeep Sharma", "Vignesh Puthur", "Brijesh Sharma", "Sushant Mishra", "Yash Raj Punja", "Adam Milne"],
    SRH: ["Liam Livingstone", "Harshal Patel", "Pat Cummins", "Ishan Kishan", "Travis Head", "Heinrich Klaasen", "Abhishek Sharma", "Nitish Kumar Reddy", "Jaydev Unadkat", "David Payne", "Aniket Verma", "Smaran Ravichandran", "Kamindu Mendis", "Harsh Dubey", "Shivang Kumar", "Salil Arora", "Brydon Carse", "Eshan Malinga", "Zeeshan Ansari", "Sakib Hussain", "Onkar Tarmale", "Amit Kumar", "Praful Hinge", "Shivam Mavi"]
}
  , Ko = ["<5", "5-8", "9-11", "12-14", "15-17", "18-20"]
  , mc = ["Winning Team", "Best Batsman", "Best Bowler", "Powerplay Winner", "Dot-Ball Bowler", "Total Wickets"]
  , te = ["Ani", "Haren", "Ganga", "Jitendar", "Mahesh", "Nag", "Naren", "Navdeep", "Omkar", "Peddi", "Praveen", "Raghav", "Ranga", "Rohit", "Sandeep", "Santhosh", "Soma", "Sridhar K", "Krishna", "Venky", "Naresh", "Srikanth B", "Prashanth", "Sreeram", "Santhosh Male"].sort();
function na(e) {
    return {
        "Winning Team": "winningTeam",
        "Best Batsman": "bestBatsman",
        "Best Bowler": "bestBowler",
        "Powerplay Winner": "powerplayWinner",
        "Dot-Ball Bowler": "dotBallBowler",
        "Total Wickets": "totalWickets"
    }[e] || e
}
function vn(e, t, n={}) {
    if (!e)
        return {
            breakdown: {},
            total: 0
        };
    const r = {}
      , l = c => {
        var f;
        return ((f = n[c]) == null ? void 0 : f.batsman_score) || 0
    }
      , i = c => {
        var f;
        return ((f = n[c]) == null ? void 0 : f.bowler_score) || 0
    }
      , o = c => {
        var f;
        return ((f = n[c]) == null ? void 0 : f.dot_ball_score) || 0
    }
      , a = t || {};
    if (r.winningTeam = e.winningTeam === a.winningTeam ? 50 + Math.round((a.runMargin || 0) / ((a.wicketMargin || 1) * 5)) : 0,
    r.bestBatsman = l(e.bestBatsman) + (e.bestBatsman === a.topScorer ? (a.topScorerRuns || 0) + 50 : 0),
    r.bestBowler = i(e.bestBowler) + (e.bestBowler === a.bestBowler ? (a.bestBowlerPoints || 0) + 50 : 0),
    r.powerplayWinner = e.powerplayWinner === a.powerplayWinner ? (a.powerplayScore || 0) + (a.powerplayDiff || 0) : 0,
    r.dotBallBowler = o(e.dotBallBowler) + (e.dotBallBowler === a.dotBallLeader ? 50 + (a.dotBalls || 0) * 5 : 0),
    r.totalWickets = e.totalWickets === a.wicketsRange ? (a.totalWickets || 0) * 5 : 0,
    r.duckBatsman = (a.duckBatsmen || []).includes(e.duckBatsman) ? 100 : 0,
    r.winningHorse = e.winningHorse && a.matchTopPlayer && e.winningHorse === a.matchTopPlayer ? 100 : 0,
    r.losingHorse = e.losingHorse && a.matchBottomPlayer && e.losingHorse === a.matchBottomPlayer ? 100 : 0,
    e.doubleCategory && r[na(e.doubleCategory)] !== void 0) {
        const c = na(e.doubleCategory);
        r[c] = r[c] * 2,
        r._doubled = e.doubleCategory
    }
    const u = Object.entries(r).filter( ([c]) => !c.startsWith("_")).reduce( (c, [,f]) => c + (f || 0), 0);
    return {
        breakdown: r,
        total: u
    }
}
const w = {
    app: {
        minHeight: "100vh",
        background: "linear-gradient(160deg,#080b12 0%,#0c1220 40%,#0a0f1a 100%)",
        fontFamily: "'Inter',sans-serif",
        color: "#e2e8f0",
        position: "relative"
    },
    noise: {
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
        opacity: .3
    },
    content: {
        position: "relative",
        zIndex: 1,
        paddingBottom: "72px"
    },
    header: {
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(8,11,18,0.85)",
        backdropFilter: "blur(20px)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        borderBottom: "1px solid rgba(255,255,255,0.06)"
    },
    logo: {
        fontSize: "16px",
        fontWeight: 800,
        letterSpacing: "1.5px",
        background: "linear-gradient(135deg,#FF8C00,#FFD700)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent"
    },
    page: {
        maxWidth: "960px",
        margin: "0 auto",
        padding: "20px 16px"
    },
    card: {
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "16px",
        padding: "20px",
        backdropFilter: "blur(8px)"
    },
    navBtn: e => ({
        padding: "8px 16px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        fontSize: "13px",
        fontWeight: e ? 600 : 400,
        fontFamily: "'Inter',sans-serif",
        background: e ? "rgba(255,140,0,0.15)" : "transparent",
        color: e ? "#FFD700" : "#64748b",
        transition: "all 0.2s ease"
    }),
    teamBadge: e => {
        var t, n, r;
        return {
            display: "inline-flex",
            alignItems: "center",
            padding: "6px 12px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: 700,
            letterSpacing: "0.5px",
            background: (((t = pt[e]) == null ? void 0 : t.color) || "#333") + "20",
            color: ((n = pt[e]) == null ? void 0 : n.accent) || "#fff",
            border: `1px solid ${((r = pt[e]) == null ? void 0 : r.color) || "#333"}40`
        }
    }
    ,
    statusPill: e => ({
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        padding: "4px 10px",
        borderRadius: "20px",
        fontSize: "11px",
        fontWeight: 600,
        background: e === "completed" ? "rgba(34,197,94,0.12)" : e === "locked" ? "rgba(239,68,68,0.12)" : e === "submitted" ? "rgba(59,130,246,0.12)" : "rgba(255,140,0,0.12)",
        color: e === "completed" ? "#4ade80" : e === "locked" ? "#f87171" : e === "submitted" ? "#60a5fa" : "#fbbf24",
        border: `1px solid ${e === "completed" ? "rgba(34,197,94,0.2)" : e === "locked" ? "rgba(239,68,68,0.2)" : e === "submitted" ? "rgba(59,130,246,0.2)" : "rgba(255,140,0,0.2)"}`
    }),
    h1: {
        fontSize: "24px",
        fontWeight: 800,
        marginBottom: "6px",
        color: "#f8fafc",
        letterSpacing: "-0.5px"
    },
    label: {
        display: "block",
        fontSize: "11px",
        color: "#64748b",
        marginBottom: "6px",
        letterSpacing: "0.5px",
        textTransform: "uppercase",
        fontWeight: 600
    },
    select: {
        width: "100%",
        padding: "10px 12px",
        borderRadius: "10px",
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.1)",
        color: "#e2e8f0",
        fontSize: "14px",
        outline: "none",
        cursor: "pointer",
        fontFamily: "'Inter',sans-serif",
        transition: "border-color 0.2s"
    },
    input: {
        width: "100%",
        padding: "10px 12px",
        borderRadius: "10px",
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.1)",
        color: "#e2e8f0",
        fontSize: "14px",
        outline: "none",
        fontFamily: "'Inter',sans-serif",
        boxSizing: "border-box",
        transition: "border-color 0.2s"
    },
    btn: (e="primary") => ({
        padding: "11px 24px",
        borderRadius: "10px",
        border: "none",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: 700,
        fontFamily: "'Inter',sans-serif",
        background: e === "primary" ? "linear-gradient(135deg,#FF8C00,#FFD700)" : e === "danger" ? "rgba(239,68,68,0.15)" : "rgba(255,255,255,0.06)",
        color: e === "primary" ? "#000" : e === "danger" ? "#f87171" : "#e2e8f0",
        transition: "all 0.2s ease",
        border: e === "ghost" ? "1px solid rgba(255,255,255,0.1)" : "none"
    }),
    grid2: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
        gap: "16px"
    },
    sectionTitle: {
        fontSize: "11px",
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        color: "#FF8C00",
        marginBottom: "12px",
        fontWeight: 700
    },
    logoutBtn: {
        background: "transparent",
        border: "1px solid rgba(239,68,68,0.3)",
        color: "#f87171",
        borderRadius: "8px",
        padding: "7px 14px",
        cursor: "pointer",
        fontSize: "13px",
        fontWeight: 600,
        fontFamily: "'Inter',sans-serif",
        transition: "all 0.2s"
    },
    bottomNav: {
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "rgba(8,11,18,0.95)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "8px 0 env(safe-area-inset-bottom, 10px)",
        height: "72px"
    },
    tabBtn: e => ({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "4px",
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "6px 16px",
        color: e ? "#fbbf24" : "#475569",
        transition: "all 0.2s",
        position: "relative",
        fontFamily: "'Inter',sans-serif"
    })
};
function Gf({onLogin: e}) {
    const [t,n] = N.useState("")
      , [r,l] = N.useState("")
      , [i,o] = N.useState("")
      , [a,u] = N.useState(!1)
      , c = async () => {
        if (!t || !r) {
            o("Please enter username and password");
            return
        }
        u(!0),
        o("");
        try {
            const f = await Te.query("users", {
                select: "*",
                eq: {
                    username: t.toLowerCase().trim()
                }
            });
            if (!f || f.length === 0 || f.error) {
                o("User not found"),
                u(!1);
                return
            }
            const m = f[0];
            if (m.password !== r) {
                o("Incorrect password"),
                u(!1);
                return
            }
            e({
                username: m.username,
                displayName: m.display_name,
                isAdmin: m.is_admin
            })
        } catch {
            o("Connection error. Please try again.")
        }
        u(!1)
    }
    ;
    return s.jsxs("div", {
        style: {
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px"
        },
        children: [s.jsx("style", {
            children: `
        @keyframes floatLogo{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        .login-card{position:relative;overflow:hidden;}
        .login-card::before{content:'';position:absolute;inset:-1px;borderRadius:17px;padding:1px;background:linear-gradient(135deg,rgba(255,140,0,0.3),rgba(255,215,0,0.1),rgba(255,140,0,0.05));mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);mask-composite:exclude;-webkit-mask-composite:xor;pointer-events:none;}
        .login-input:focus{border-color:rgba(255,140,0,0.4)!important;box-shadow:0 0 0 3px rgba(255,140,0,0.08)!important;}
        .login-btn:hover{transform:translateY(-1px);box-shadow:0 4px 16px rgba(255,140,0,0.25)!important;}
        .login-btn:active{transform:translateY(0);}
      `
        }), s.jsxs("div", {
            style: {
                width: "100%",
                maxWidth: "380px"
            },
            children: [s.jsxs("div", {
                style: {
                    textAlign: "center",
                    marginBottom: "40px",
                    animation: "floatLogo 4s ease-in-out infinite"
                },
                children: [s.jsx("div", {
                    style: {
                        fontSize: "40px",
                        marginBottom: "8px"
                    },
                    children: "🏏"
                }), s.jsx("div", {
                    style: {
                        ...w.logo,
                        fontSize: "28px",
                        display: "block",
                        marginBottom: "6px"
                    },
                    children: "IPL FANTASY"
                }), s.jsx("div", {
                    style: {
                        color: "#475569",
                        fontSize: "13px",
                        fontWeight: 500
                    },
                    children: "2026 Season — Friends League"
                })]
            }), s.jsxs("div", {
                className: "login-card",
                style: {
                    ...w.card,
                    padding: "32px",
                    background: "rgba(255,255,255,0.03)"
                },
                children: [s.jsxs("div", {
                    style: {
                        marginBottom: "20px"
                    },
                    children: [s.jsx("label", {
                        style: w.label,
                        children: "Username"
                    }), s.jsx("input", {
                        className: "login-input",
                        style: w.input,
                        placeholder: "e.g. sandeep",
                        value: t,
                        onChange: f => n(f.target.value),
                        onKeyDown: f => f.key === "Enter" && c()
                    }), s.jsx("div", {
                        style: {
                            fontSize: "11px",
                            color: "#475569",
                            marginTop: "4px"
                        },
                        children: "Lowercase, spaces as underscore e.g. santhosh_male"
                    })]
                }), s.jsxs("div", {
                    style: {
                        marginBottom: "24px"
                    },
                    children: [s.jsx("label", {
                        style: w.label,
                        children: "Password"
                    }), s.jsx("input", {
                        className: "login-input",
                        style: w.input,
                        type: "password",
                        placeholder: "Your password",
                        value: r,
                        onChange: f => l(f.target.value),
                        onKeyDown: f => f.key === "Enter" && c()
                    })]
                }), i && s.jsxs("div", {
                    style: {
                        color: "#f87171",
                        fontSize: "13px",
                        marginBottom: "16px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px"
                    },
                    children: ["⚠ ", i]
                }), s.jsx("button", {
                    className: "login-btn",
                    style: {
                        ...w.btn("primary"),
                        width: "100%",
                        padding: "12px",
                        fontSize: "15px"
                    },
                    onClick: c,
                    disabled: a,
                    children: a ? "Signing in..." : "Sign In"
                })]
            }), s.jsx("div", {
                style: {
                    textAlign: "center",
                    marginTop: "20px",
                    fontSize: "12px",
                    color: "#334155"
                },
                children: "Forgot your password? Ask the admin to reset it."
            })]
        })]
    })
}
function Ji(e, t, n, r) {
    return n[e.id] ? "completed" : t >= new Date(e.lock_time) ? "locked" : r[e.id] ? "submitted" : "open"
}
function lt({team: e, size: t=48}) {
    const n = pt[e] || {
        color: "#333",
        accent: "#fff"
    };
    return s.jsxs("div", {
        style: {
            width: t,
            height: t,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            position: "relative"
        },
        children: [s.jsx("img", {
            src: `/logos/${e}.png`,
            alt: e,
            style: {
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                filter: `drop-shadow(0 0 10px ${n.color || "#333"}66)`
            },
            onError: r => {
                r.target.style.display = "none",
                r.target.nextSibling.style.display = "flex"
            }
        }), s.jsxs("div", {
            style: {
                display: "none",
                width: t,
                height: t,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${n.color} 0%, ${n.color}dd 60%, ${n.accent}44 100%)`,
                alignItems: "center",
                justifyContent: "center",
                border: `2px solid ${n.color}88`,
                boxShadow: `0 0 12px ${n.color}33`,
                position: "relative",
                overflow: "hidden"
            },
            children: [s.jsx("div", {
                style: {
                    position: "absolute",
                    inset: 0,
                    background: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.25) 0%, transparent 60%)",
                    borderRadius: "50%"
                }
            }), s.jsx("span", {
                style: {
                    fontSize: t * .3,
                    fontWeight: 900,
                    letterSpacing: "1px",
                    color: n.accent,
                    textShadow: "0 1px 3px rgba(0,0,0,0.5)",
                    position: "relative",
                    zIndex: 1,
                    fontFamily: "'Arial Black',sans-serif"
                },
                children: e
            })]
        })]
    })
}
function Jf({user: e, onSelectMatch: t, matches: n, results: r, userSel: l}) {
    const [i] = N.useState(new Date)
      , [o,a] = N.useState("all")
      , u = n.filter(m => {
        const p = Ji(m, i, r, l);
        return o === "open" ? p === "open" || p === "submitted" : o === "locked" ? p === "locked" : o === "completed" ? p === "completed" : !0
    }
    )
      , c = m => m === "completed" ? "rgba(0,200,100,0.25)" : m === "locked" ? "rgba(255,100,100,0.2)" : m === "submitted" ? "rgba(0,150,255,0.2)" : "rgba(255,165,0,0.15)"
      , f = m => m === "completed" ? "rgba(0,200,100,0.03)" : m === "locked" ? "rgba(255,80,80,0.03)" : m === "submitted" ? "rgba(0,150,255,0.03)" : "rgba(255,255,255,0.03)";
    return s.jsxs("div", {
        style: w.page,
        children: [s.jsx("style", {
            children: `
        .mcard2{transition:all 0.25s ease;cursor:pointer;}
        .mcard2:hover{transform:translateY(-3px);box-shadow:0 12px 32px rgba(0,0,0,0.4)!important;}
        .mcard2:active{transform:translateY(0);box-shadow:none!important;}
        .vs-glow{animation:vsGlow 2s ease-in-out infinite alternate;}
        @keyframes vsGlow{0%{text-shadow:0 0 8px rgba(255,165,0,0.3)}100%{text-shadow:0 0 16px rgba(255,165,0,0.6)}}
      `
        }), s.jsxs("div", {
            style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexWrap: "wrap",
                gap: "12px",
                marginBottom: "24px"
            },
            children: [s.jsxs("div", {
                children: [s.jsx("h1", {
                    style: w.h1,
                    children: "Matches"
                }), s.jsx("p", {
                    style: {
                        color: "#666",
                        fontSize: "13px"
                    },
                    children: "IPL 2026 · 70 matches"
                })]
            }), s.jsx("div", {
                style: {
                    display: "flex",
                    gap: "6px",
                    flexWrap: "wrap"
                },
                children: ["all", "open", "locked", "completed"].map(m => s.jsx("button", {
                    style: w.navBtn(o === m),
                    onClick: () => a(m),
                    children: m.charAt(0).toUpperCase() + m.slice(1)
                }, m))
            })]
        }), u.map(m => {
            var d, g;
            const p = Ji(m, i, r, l)
              , y = r[m.id]
              , k = pt[m.home] || {}
              , _ = pt[m.away] || {}
              , z = (y == null ? void 0 : y.winningTeam) === m.home
              , h = (y == null ? void 0 : y.winningTeam) === m.away;
            return s.jsxs("div", {
                className: "mcard2",
                onClick: () => t(m),
                style: {
                    background: f(p),
                    border: `1px solid ${c(p)}`,
                    borderRadius: "14px",
                    padding: "16px 20px",
                    marginBottom: "10px",
                    backdropFilter: "blur(4px)",
                    position: "relative",
                    overflow: "hidden"
                },
                children: [s.jsx("div", {
                    style: {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        width: "4px",
                        background: `linear-gradient(180deg, ${k.color || "#333"}, transparent)`,
                        borderRadius: "14px 0 0 14px"
                    }
                }), s.jsx("div", {
                    style: {
                        position: "absolute",
                        top: 0,
                        right: 0,
                        bottom: 0,
                        width: "4px",
                        background: `linear-gradient(180deg, ${_.color || "#333"}, transparent)`,
                        borderRadius: "0 14px 14px 0"
                    }
                }), s.jsxs("div", {
                    style: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "12px"
                    },
                    children: [s.jsxs("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: "8px"
                        },
                        children: [s.jsxs("span", {
                            style: {
                                fontSize: "11px",
                                color: "#555",
                                fontWeight: "bold",
                                letterSpacing: "1px"
                            },
                            children: ["M", m.id]
                        }), s.jsxs("span", {
                            style: {
                                fontSize: "12px",
                                color: "#555"
                            },
                            children: [m.date, " · ", m.time_label]
                        })]
                    }), s.jsx("span", {
                        style: w.statusPill(p),
                        children: p === "submitted" ? "✓ Submitted" : p === "completed" ? "✓ Done" : p === "locked" ? "🔒 Locked" : "🟢 Open"
                    })]
                }), s.jsxs("div", {
                    style: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0",
                        padding: "4px 0"
                    },
                    children: [s.jsxs("div", {
                        style: {
                            flex: 1,
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            justifyContent: "flex-end",
                            minWidth: 0
                        },
                        children: [s.jsxs("div", {
                            style: {
                                textAlign: "right",
                                minWidth: 0
                            },
                            children: [s.jsx("div", {
                                style: {
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                    color: z ? "#00c864" : p === "completed" && !z ? "#666" : "#f8fafc",
                                    letterSpacing: "0.5px",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap"
                                },
                                children: m.home
                            }), s.jsx("div", {
                                style: {
                                    fontSize: "12px",
                                    color: "#64748b",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap"
                                },
                                children: ((d = pt[m.home]) == null ? void 0 : d.name) || ""
                            })]
                        }), s.jsx(lt, {
                            team: m.home,
                            size: 64
                        })]
                    }), s.jsx("div", {
                        style: {
                            margin: "0 16px",
                            flexShrink: 0
                        },
                        children: s.jsx("div", {
                            className: "vs-glow",
                            style: {
                                width: "36px",
                                height: "36px",
                                borderRadius: "50%",
                                background: "linear-gradient(135deg, rgba(255,165,0,0.15), rgba(255,215,0,0.1))",
                                border: "1px solid rgba(255,165,0,0.25)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            },
                            children: s.jsx("span", {
                                style: {
                                    fontSize: "11px",
                                    fontWeight: 900,
                                    color: "#FFD700",
                                    letterSpacing: "1px"
                                },
                                children: "VS"
                            })
                        })
                    }), s.jsxs("div", {
                        style: {
                            flex: 1,
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                            justifyContent: "flex-start",
                            minWidth: 0
                        },
                        children: [s.jsx(lt, {
                            team: m.away,
                            size: 64
                        }), s.jsxs("div", {
                            style: {
                                textAlign: "left",
                                minWidth: 0
                            },
                            children: [s.jsx("div", {
                                style: {
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                    color: h ? "#00c864" : p === "completed" && !h ? "#666" : "#f8fafc",
                                    letterSpacing: "0.5px",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap"
                                },
                                children: m.away
                            }), s.jsx("div", {
                                style: {
                                    fontSize: "12px",
                                    color: "#64748b",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap"
                                },
                                children: ((g = pt[m.away]) == null ? void 0 : g.name) || ""
                            })]
                        })]
                    })]
                }), y && s.jsx("div", {
                    style: {
                        textAlign: "center",
                        marginTop: "10px",
                        paddingTop: "10px",
                        borderTop: "1px solid rgba(255,255,255,0.06)"
                    },
                    children: s.jsxs("span", {
                        style: {
                            fontSize: "12px",
                            color: "#00c864",
                            fontWeight: "bold"
                        },
                        children: ["🏆 ", y.winningTeam, " won", y.runMargin ? ` by ${y.runMargin} runs` : y.wicketMargin ? ` by ${y.wicketMargin} wickets` : ""]
                    })
                })]
            }, m.id)
        }
        )]
    })
}
function Xf({insights: e, match: t}) {
    const [n,r] = N.useState(!0)
      , [l,i] = N.useState("xi");
    if (!e)
        return null;
    const o = e.generated_at ? Math.round((Date.now() - new Date(e.generated_at)) / 36e5) : null;
    return s.jsxs("div", {
        style: {
            ...w.card,
            marginBottom: "16px",
            background: "rgba(59,130,246,0.04)",
            border: "1px solid rgba(59,130,246,0.15)",
            overflow: "hidden"
        },
        children: [s.jsxs("button", {
            onClick: () => r(a => !a),
            style: {
                width: "100%",
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0",
                fontFamily: "'Inter',sans-serif"
            },
            children: [s.jsxs("div", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                },
                children: [s.jsx("span", {
                    style: {
                        fontSize: "16px"
                    },
                    children: "📊"
                }), s.jsx("span", {
                    style: {
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#60a5fa"
                    },
                    children: "Match Insights"
                }), o !== null && s.jsxs("span", {
                    style: {
                        fontSize: "10px",
                        color: "#475569",
                        background: "rgba(255,255,255,0.06)",
                        padding: "2px 6px",
                        borderRadius: "4px"
                    },
                    children: ["AI · ", o < 1 ? "just now" : `${o}h ago`]
                })]
            }), s.jsx("span", {
                style: {
                    color: "#60a5fa",
                    fontSize: "14px",
                    transition: "transform 0.2s",
                    transform: n ? "rotate(180deg)" : "rotate(0)"
                },
                children: n ? "▲" : "▼"
            })]
        }), n && s.jsxs("div", {
            style: {
                marginTop: "14px"
            },
            children: [s.jsx("div", {
                style: {
                    display: "flex",
                    gap: "4px",
                    marginBottom: "14px"
                },
                children: [{
                    id: "xi",
                    label: "Probable XI"
                }, {
                    id: "form",
                    label: "Form Guide"
                }, {
                    id: "pitch",
                    label: "Pitch & H2H"
                }].map(a => s.jsx("button", {
                    onClick: () => i(a.id),
                    style: {
                        padding: "6px 12px",
                        borderRadius: "6px",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "12px",
                        fontWeight: l === a.id ? 600 : 400,
                        fontFamily: "'Inter',sans-serif",
                        background: l === a.id ? "rgba(59,130,246,0.15)" : "transparent",
                        color: l === a.id ? "#60a5fa" : "#64748b",
                        transition: "all 0.2s"
                    },
                    children: a.label
                }, a.id))
            }), l === "xi" && s.jsx("div", {
                style: {
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "12px"
                },
                children: [{
                    team: t.home,
                    xi: e.home_probable_xi
                }, {
                    team: t.away,
                    xi: e.away_probable_xi
                }].map( ({team: a, xi: u}) => s.jsxs("div", {
                    children: [s.jsxs("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            marginBottom: "8px"
                        },
                        children: [s.jsx(lt, {
                            team: a,
                            size: 28
                        }), s.jsx("span", {
                            style: {
                                fontSize: "14px",
                                fontWeight: 700,
                                color: "#f8fafc"
                            },
                            children: a
                        })]
                    }), (u || []).map( (c, f) => s.jsxs("div", {
                        style: {
                            fontSize: "11px",
                            color: "#94a3b8",
                            padding: "3px 0",
                            borderBottom: "1px solid rgba(255,255,255,0.03)"
                        },
                        children: [f + 1, ". ", c]
                    }, f))]
                }, a))
            }), l === "form" && s.jsx("div", {
                children: [{
                    title: `${t.home} Batsmen`,
                    text: e.home_form_batsmen
                }, {
                    title: `${t.away} Batsmen`,
                    text: e.away_form_batsmen
                }, {
                    title: `${t.home} Bowlers`,
                    text: e.home_form_bowlers
                }, {
                    title: `${t.away} Bowlers`,
                    text: e.away_form_bowlers
                }].map( ({title: a, text: u}) => u && s.jsxs("div", {
                    style: {
                        marginBottom: "10px"
                    },
                    children: [s.jsx("div", {
                        style: {
                            fontSize: "11px",
                            fontWeight: 700,
                            color: "#fbbf24",
                            marginBottom: "4px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px"
                        },
                        children: a
                    }), s.jsx("div", {
                        style: {
                            fontSize: "12px",
                            color: "#94a3b8",
                            lineHeight: "1.5",
                            whiteSpace: "pre-wrap"
                        },
                        children: u
                    })]
                }, a))
            }), l === "pitch" && s.jsx("div", {
                children: [{
                    title: "🏟️ Pitch Report",
                    text: e.pitch_report
                }, {
                    title: "📋 Head to Head",
                    text: e.head_to_head
                }, {
                    title: "⚔️ Key Matchups",
                    text: e.key_matchups
                }, {
                    title: "🔮 Prediction",
                    text: e.prediction_summary
                }].map( ({title: a, text: u}) => u && s.jsxs("div", {
                    style: {
                        marginBottom: "10px"
                    },
                    children: [s.jsx("div", {
                        style: {
                            fontSize: "11px",
                            fontWeight: 700,
                            color: "#fbbf24",
                            marginBottom: "4px"
                        },
                        children: a
                    }), s.jsx("div", {
                        style: {
                            fontSize: "12px",
                            color: "#94a3b8",
                            lineHeight: "1.5",
                            whiteSpace: "pre-wrap"
                        },
                        children: u
                    })]
                }, a))
            })]
        })]
    })
}
const yc = {
    winningTeam: "",
    bestBatsman: "",
    bestBowler: "",
    powerplayWinner: "",
    dotBallBowler: "",
    totalWickets: "",
    duckBatsman: "",
    doubleCategory: "",
    winningHorse: "",
    losingHorse: ""
};
function Zf({match: e, user: t, onBack: n, results: r, userSel: l, onSave: i, insights: o, playerScores: a}) {
    const [u] = N.useState(new Date)
      , c = u >= new Date(e.lock_time)
      , f = !!r[e.id]
      , [m,p] = N.useState({
        ...yc,
        ...l[e.id] || {}
    })
      , [y,k] = N.useState(!!l[e.id])
      , [_,z] = N.useState("")
      , [h,d] = N.useState(!1)
      , g = [...new Set([...xn[e.home] || [], ...xn[e.away] || []])].sort()
      , x = (I, T) => p(H => ({
        ...H,
        [I]: T
    }))
      , C = Ji(e, u, r, l)
      , j = async () => {
        c || (d(!0),
        await i(e.id, m),
        k(!0),
        z("Selections saved! ✓"),
        d(!1),
        setTimeout( () => z(""), 3e3))
    }
      , v = f ? vn(m, r[e.id], a[e.id]) : null
      , P = ({label: I, field: T, options: H}) => s.jsxs("div", {
        children: [s.jsx("label", {
            style: w.label,
            children: I
        }), s.jsxs("select", {
            style: {
                ...w.select,
                opacity: c ? .6 : 1
            },
            disabled: c,
            value: m[T],
            onChange: S => x(T, S.target.value),
            children: [s.jsx("option", {
                value: "",
                children: "-- Select --"
            }), H.map(S => s.jsx("option", {
                value: S,
                children: S
            }, S))]
        })]
    });
    return s.jsxs("div", {
        style: w.page,
        children: [s.jsx("button", {
            style: {
                ...w.btn("ghost"),
                marginBottom: "16px",
                padding: "8px 16px",
                fontSize: "13px"
            },
            onClick: n,
            children: "← Back"
        }), s.jsxs("div", {
            style: {
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                marginBottom: "20px"
            },
            children: [s.jsxs("div", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    flexWrap: "wrap"
                },
                children: [s.jsxs("div", {
                    style: {
                        display: "flex",
                        alignItems: "center",
                        gap: "12px"
                    },
                    children: [s.jsx(lt, {
                        team: e.home,
                        size: 48
                    }), s.jsx("span", {
                        style: w.teamBadge(e.home),
                        children: e.home
                    })]
                }), s.jsx("span", {
                    style: {
                        color: "#475569",
                        fontWeight: 800,
                        fontSize: "14px"
                    },
                    children: "VS"
                }), s.jsxs("div", {
                    style: {
                        display: "flex",
                        alignItems: "center",
                        gap: "12px"
                    },
                    children: [s.jsx(lt, {
                        team: e.away,
                        size: 48
                    }), s.jsx("span", {
                        style: w.teamBadge(e.away),
                        children: e.away
                    })]
                }), s.jsx("span", {
                    style: {
                        marginLeft: "auto",
                        ...w.statusPill(C)
                    },
                    children: C === "completed" ? "✓ Completed" : C === "locked" ? "🔒 Locked" : C === "submitted" ? "✓ Submitted" : "Open"
                })]
            }), s.jsxs("div", {
                style: {
                    fontSize: "14px",
                    color: "#94a3b8",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px"
                },
                children: [s.jsxs("span", {
                    style: {
                        background: "rgba(255,255,255,0.08)",
                        padding: "6px 12px",
                        borderRadius: "8px",
                        fontWeight: 700,
                        color: "#fbbf24"
                    },
                    children: ["Match ", e.id]
                }), s.jsxs("span", {
                    children: [e.date, " · ", e.time_label]
                })]
            })]
        }), c && !f && s.jsx("div", {
            style: {
                ...w.card,
                background: "rgba(255,100,100,0.05)",
                borderColor: "rgba(255,100,100,0.15)",
                marginBottom: "16px",
                color: "#ff8888",
                fontSize: "13px"
            },
            children: "🔒 Match has started. Selections are locked."
        }), s.jsx(Xf, {
            insights: o,
            match: e
        }), f && v && s.jsxs("div", {
            style: {
                ...w.card,
                background: "rgba(0,200,100,0.04)",
                borderColor: "rgba(0,200,100,0.15)",
                marginBottom: "16px"
            },
            children: [s.jsxs("div", {
                style: {
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#00c864",
                    marginBottom: "8px"
                },
                children: ["Your Score: ", v.total, " pts"]
            }), s.jsx("div", {
                style: {
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px"
                },
                children: Object.entries(v.breakdown).filter( ([I]) => !I.startsWith("_")).map( ([I,T]) => s.jsxs("span", {
                    style: {
                        fontSize: "12px",
                        background: T > 0 ? "rgba(0,200,100,0.1)" : "rgba(255,100,100,0.1)",
                        color: T > 0 ? "#00c864" : "#ff6b6b",
                        padding: "3px 8px",
                        borderRadius: "4px",
                        border: `1px solid ${T > 0 ? "rgba(0,200,100,0.2)" : "rgba(255,100,100,0.2)"}`
                    },
                    children: [I, ": ", T]
                }, I))
            })]
        }), s.jsxs("div", {
            style: {
                ...w.card,
                marginBottom: "16px"
            },
            children: [s.jsx("div", {
                style: w.sectionTitle,
                children: "Core Predictions"
            }), s.jsxs("div", {
                style: {
                    ...w.grid2,
                    marginBottom: "14px"
                },
                children: [s.jsx(P, {
                    label: "Winning Team",
                    field: "winningTeam",
                    options: [e.home, e.away]
                }), s.jsx(P, {
                    label: "Powerplay Winner",
                    field: "powerplayWinner",
                    options: [e.home, e.away]
                })]
            }), s.jsxs("div", {
                style: w.grid2,
                children: [s.jsx(P, {
                    label: "Best Batsman",
                    field: "bestBatsman",
                    options: g
                }), s.jsx(P, {
                    label: "Best Bowler",
                    field: "bestBowler",
                    options: g
                })]
            })]
        }), s.jsxs("div", {
            style: {
                ...w.card,
                marginBottom: "16px"
            },
            children: [s.jsx("div", {
                style: w.sectionTitle,
                children: "Specialist Picks"
            }), s.jsxs("div", {
                style: w.grid2,
                children: [s.jsx(P, {
                    label: "Dot-Ball Bowler",
                    field: "dotBallBowler",
                    options: g
                }), s.jsx(P, {
                    label: "Total Wickets Range",
                    field: "totalWickets",
                    options: Ko
                }), s.jsx(P, {
                    label: "Batsman with Duck",
                    field: "duckBatsman",
                    options: g
                })]
            })]
        }), s.jsxs("div", {
            style: {
                ...w.card,
                marginBottom: "16px"
            },
            children: [s.jsx("div", {
                style: w.sectionTitle,
                children: "Strategy"
            }), s.jsx(P, {
                label: "🔥 Double Points Category (×2 multiplier)",
                field: "doubleCategory",
                options: mc
            }), s.jsx("div", {
                style: {
                    fontSize: "11px",
                    color: "#555",
                    marginTop: "4px"
                },
                children: "Your chosen category's points will be doubled"
            })]
        }), s.jsxs("div", {
            style: {
                ...w.card,
                marginBottom: "20px"
            },
            children: [s.jsx("div", {
                style: w.sectionTitle,
                children: "Bragging Rights 😄"
            }), s.jsxs("div", {
                style: w.grid2,
                children: [s.jsx(P, {
                    label: "🏆 Winning Horse (top scorer today?)",
                    field: "winningHorse",
                    options: te
                }), s.jsx(P, {
                    label: "💀 Losing Horse (bottom scorer today?)",
                    field: "losingHorse",
                    options: te
                })]
            }), s.jsx("div", {
                style: {
                    fontSize: "11px",
                    color: "#555",
                    marginTop: "8px"
                },
                children: "100 pts each for a correct guess!"
            })]
        }), !c && s.jsxs("div", {
            style: {
                display: "flex",
                gap: "12px",
                alignItems: "center",
                flexWrap: "wrap"
            },
            children: [s.jsx("button", {
                style: w.btn("primary"),
                onClick: j,
                disabled: h,
                children: h ? "Saving..." : y ? "Update Selections" : "Save Selections"
            }), _ && s.jsx("span", {
                style: {
                    color: "#00c864",
                    fontSize: "14px"
                },
                children: _
            })]
        })]
    })
}
function qf({matches: e, results: t, allSelections: n, playerScores: r}) {
    var c;
    const l = new Date
      , i = e.filter(f => l >= new Date(f.lock_time))
      , o = te.map(f => {
        const m = f.toLowerCase().replace(/\s/g, "_")
          , p = n[m] || {};
        let y = 0
          , k = 0;
        return i.forEach(_ => {
            p[_.id] && (y += vn(p[_.id], t[_.id], r[_.id]).total,
            k++)
        }
        ),
        {
            name: f,
            total: y,
            matchCount: k
        }
    }
    ).sort( (f, m) => m.total - f.total)
      , a = ["🥇", "🥈", "🥉"]
      , u = ((c = o[0]) == null ? void 0 : c.total) || 1;
    return s.jsxs("div", {
        children: [s.jsx("style", {
            children: `
        .lb-row{transition:all 0.2s ease;}
        .lb-row:hover{background:rgba(255,255,255,0.06)!important;}
      `
        }), s.jsxs("div", {
            style: {
                color: "#64748b",
                fontSize: "13px",
                marginBottom: "20px"
            },
            children: [i.length, " matches actively scored"]
        }), o.length >= 3 && s.jsx("div", {
            style: {
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "10px",
                marginBottom: "20px"
            },
            children: o.slice(0, 3).map( (f, m) => {
                const p = [{
                    bg: "linear-gradient(135deg,rgba(255,215,0,0.12),rgba(255,140,0,0.06))",
                    border: "rgba(255,215,0,0.25)",
                    text: "#fbbf24"
                }, {
                    bg: "linear-gradient(135deg,rgba(192,192,192,0.1),rgba(148,163,184,0.06))",
                    border: "rgba(148,163,184,0.2)",
                    text: "#94a3b8"
                }, {
                    bg: "linear-gradient(135deg,rgba(205,127,50,0.1),rgba(180,120,60,0.06))",
                    border: "rgba(205,127,50,0.2)",
                    text: "#d4a574"
                }][m];
                return s.jsxs("div", {
                    style: {
                        background: p.bg,
                        border: `1px solid ${p.border}`,
                        borderRadius: "16px",
                        padding: "20px 12px",
                        textAlign: "center"
                    },
                    children: [s.jsx("div", {
                        style: {
                            fontSize: "28px",
                            marginBottom: "6px"
                        },
                        children: a[m]
                    }), s.jsx("div", {
                        style: {
                            fontSize: "14px",
                            fontWeight: 700,
                            color: "#f8fafc",
                            marginBottom: "2px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap"
                        },
                        children: f.name
                    }), s.jsxs("div", {
                        style: {
                            fontSize: "11px",
                            color: "#64748b",
                            marginBottom: "8px"
                        },
                        children: [f.matchCount, " matches"]
                    }), s.jsx("div", {
                        style: {
                            fontSize: "24px",
                            fontWeight: 800,
                            color: p.text
                        },
                        children: f.total
                    }), s.jsx("div", {
                        style: {
                            fontSize: "10px",
                            color: "#64748b",
                            fontWeight: 600,
                            letterSpacing: "0.5px"
                        },
                        children: "POINTS"
                    })]
                }, f.name)
            }
            )
        }), s.jsx("div", {
            style: {
                ...w.card,
                padding: "0",
                overflow: "hidden"
            },
            children: o.slice(o.length >= 3 ? 3 : 0).map( (f, m) => {
                const p = o.length >= 3 ? m + 4 : m + 1
                  , y = u > 0 ? Math.max(f.total / u * 100, 2) : 0;
                return s.jsxs("div", {
                    className: "lb-row",
                    style: {
                        display: "flex",
                        alignItems: "center",
                        padding: "12px 16px",
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                        gap: "12px"
                    },
                    children: [s.jsxs("span", {
                        style: {
                            fontSize: "13px",
                            fontWeight: 700,
                            color: "#64748b",
                            minWidth: "28px",
                            textAlign: "center"
                        },
                        children: ["#", p]
                    }), s.jsxs("div", {
                        style: {
                            flex: 1,
                            minWidth: 0
                        },
                        children: [s.jsxs("div", {
                            style: {
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "4px"
                            },
                            children: [s.jsx("span", {
                                style: {
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    color: "#e2e8f0",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap"
                                },
                                children: f.name
                            }), s.jsx("span", {
                                style: {
                                    fontSize: "14px",
                                    fontWeight: 700,
                                    color: "#fbbf24",
                                    flexShrink: 0,
                                    marginLeft: "8px"
                                },
                                children: f.total
                            })]
                        }), s.jsx("div", {
                            style: {
                                height: "3px",
                                background: "rgba(255,255,255,0.06)",
                                borderRadius: "2px",
                                overflow: "hidden"
                            },
                            children: s.jsx("div", {
                                style: {
                                    height: "100%",
                                    width: `${y}%`,
                                    background: "linear-gradient(90deg,#FF8C00,#fbbf24)",
                                    borderRadius: "2px",
                                    transition: "width 0.5s ease"
                                }
                            })
                        })]
                    })]
                }, f.name)
            }
            )
        })]
    })
}
function ep({user: e, matches: t, results: n, userSel: r, playerScores: l}) {
    const i = new Date
      , o = t.filter(c => i >= new Date(c.lock_time) && r[c.id])
      , a = o.reduce( (c, f) => c + vn(r[f.id], n[f.id], l[f.id]).total, 0)
      , u = [{
        icon: "🎯",
        label: "Total Points",
        val: a,
        color: "#fbbf24"
    }, {
        icon: "🏏",
        label: "Matches",
        val: o.length,
        color: "#60a5fa"
    }, {
        icon: "📈",
        label: "Avg/Match",
        val: o.length ? Math.round(a / o.length) : 0,
        color: "#4ade80"
    }];
    return s.jsxs("div", {
        children: [s.jsxs("div", {
            style: {
                color: "#64748b",
                fontSize: "13px",
                marginBottom: "20px"
            },
            children: ["Viewing stats for: ", s.jsx("span", {
                style: {
                    color: "#fbbf24",
                    fontWeight: 600
                },
                children: e.displayName
            })]
        }), s.jsx("div", {
            style: {
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: "10px",
                marginBottom: "24px"
            },
            children: u.map( ({icon: c, label: f, val: m, color: p}) => s.jsxs("div", {
                style: {
                    ...w.card,
                    textAlign: "center",
                    padding: "16px 8px"
                },
                children: [s.jsx("div", {
                    style: {
                        fontSize: "20px",
                        marginBottom: "4px"
                    },
                    children: c
                }), s.jsx("div", {
                    style: {
                        fontSize: "24px",
                        fontWeight: 800,
                        color: p
                    },
                    children: m
                }), s.jsx("div", {
                    style: {
                        fontSize: "10px",
                        color: "#64748b",
                        marginTop: "2px",
                        fontWeight: 600,
                        letterSpacing: "0.5px",
                        textTransform: "uppercase"
                    },
                    children: f
                })]
            }, f))
        }), o.length === 0 ? s.jsx("div", {
            style: {
                ...w.card,
                textAlign: "center",
                color: "#475569",
                padding: "48px"
            },
            children: "No active matches yet. Make your selections!"
        }) : o.map(c => {
            const {breakdown: f, total: m} = vn(r[c.id], n[c.id], l[c.id]);
            return s.jsxs("div", {
                style: {
                    ...w.card,
                    marginBottom: "10px"
                },
                children: [s.jsxs("div", {
                    style: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "12px",
                        flexWrap: "wrap",
                        gap: "8px"
                    },
                    children: [s.jsxs("div", {
                        style: {
                            display: "flex",
                            gap: "12px",
                            alignItems: "center",
                            flexWrap: "wrap"
                        },
                        children: [s.jsxs("span", {
                            style: {
                                color: "#64748b",
                                fontSize: "14px",
                                fontWeight: 700,
                                width: "32px"
                            },
                            children: ["M", c.id]
                        }), s.jsx(lt, {
                            team: c.home,
                            size: 36
                        }), s.jsx("span", {
                            style: {
                                fontSize: "15px",
                                fontWeight: 700,
                                color: "#f8fafc"
                            },
                            children: c.home
                        }), s.jsx("span", {
                            style: {
                                color: "#475569",
                                fontSize: "12px",
                                fontWeight: 600
                            },
                            children: "vs"
                        }), s.jsx(lt, {
                            team: c.away,
                            size: 36
                        }), s.jsx("span", {
                            style: {
                                fontSize: "15px",
                                fontWeight: 700,
                                color: "#f8fafc"
                            },
                            children: c.away
                        })]
                    }), s.jsxs("div", {
                        style: {
                            fontSize: "22px",
                            fontWeight: 900,
                            color: "#fbbf24",
                            letterSpacing: "-0.5px"
                        },
                        children: [m, " pts"]
                    })]
                }), s.jsx("div", {
                    style: {
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "5px"
                    },
                    children: Object.entries(f).filter( ([p]) => !p.startsWith("_")).map( ([p,y]) => s.jsxs("span", {
                        style: {
                            fontSize: "11px",
                            fontWeight: 500,
                            background: y > 0 ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
                            color: y > 0 ? "#4ade80" : "#f87171",
                            padding: "3px 8px",
                            borderRadius: "6px",
                            border: `1px solid ${y > 0 ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)"}`
                        },
                        children: [p, ": ", y]
                    }, p))
                })]
            }, c.id)
        }
        )]
    })
}
function tp({matches: e, results: t, allSelections: n, playerScores: r}) {
    const l = new Date
      , i = e.filter(p => l >= new Date(p.lock_time))
      , o = {};
    te.forEach(p => o[p] = {}),
    i.forEach(p => {
        te.forEach(y => {
            const k = y.toLowerCase().replace(/\s/g, "_")
              , _ = n[k] || {};
            o[y][p.id] = vn(_[p.id], t[p.id], r[p.id]).total
        }
        )
    }
    );
    const a = {};
    te.forEach(p => {
        a[p] = i.reduce( (y, k) => y + (o[p][k.id] || 0), 0)
    }
    );
    const u = {}
      , c = {}
      , f = {};
    te.forEach(p => {
        u[p] = {},
        c[p] = {},
        f[p] = 0
    }
    ),
    i.forEach(p => {
        const y = te.map(z => ({
            player: z,
            pts: o[z][p.id]
        }));
        y.sort( (z, h) => h.pts - z.pts);
        let k = 1;
        y.forEach( (z, h) => {
            h > 0 && z.pts < y[h - 1].pts && (k = h + 1),
            u[z.player][p.id] = k
        }
        );
        const _ = y[0].pts;
        if (_ > 0) {
            const z = y.filter(d => d.pts === _);
            let h = [];
            if (z.length === 1 && y.length > 1) {
                const d = y[1].pts;
                d > 0 && (h = y.filter(g => g.pts === d))
            }
            if (z.length === 2)
                z.forEach(d => c[d.player][p.id] = 18.5);
            else if (z.length > 2) {
                const d = parseFloat((37 / z.length).toFixed(2));
                z.forEach(g => c[g.player][p.id] = d)
            } else if (z.length === 1 && (c[z[0].player][p.id] = 25,
            h.length > 0)) {
                const d = parseFloat((12 / h.length).toFixed(2));
                h.forEach(g => c[g.player][p.id] = d)
            }
        }
        te.forEach(z => {
            f[z] = Number((f[z] + (c[z][p.id] || 0)).toFixed(2))
        }
        )
    }
    );
    const m = (p, y, k, _) => s.jsxs("div", {
        style: {
            marginBottom: "40px"
        },
        children: [s.jsx("h3", {
            style: {
                color: "#e8e0d0",
                fontSize: "16px",
                marginBottom: "12px"
            },
            children: p
        }), s.jsx("div", {
            style: {
                ...w.card,
                padding: "0",
                overflowX: "auto"
            },
            children: s.jsxs("table", {
                style: {
                    borderCollapse: "collapse",
                    fontSize: "12px",
                    whiteSpace: "nowrap",
                    minWidth: "100%"
                },
                children: [s.jsx("thead", {
                    children: s.jsxs("tr", {
                        style: {
                            background: "rgba(255,255,255,0.03)",
                            borderBottom: "1px solid rgba(255,255,255,0.1)"
                        },
                        children: [s.jsx("th", {
                            style: {
                                padding: "10px",
                                color: "#888",
                                fontWeight: 600,
                                textAlign: "left",
                                position: "sticky",
                                left: 0,
                                background: "#0d1117",
                                zIndex: 2
                            },
                            children: "Player"
                        }), _ && s.jsx("th", {
                            style: {
                                padding: "10px",
                                color: "#fbbf24",
                                fontWeight: 700,
                                textAlign: "right",
                                minWidth: "60px",
                                borderRight: "1px solid rgba(255,255,255,0.05)"
                            },
                            children: _
                        }), i.map(z => s.jsxs("th", {
                            style: {
                                padding: "10px 8px",
                                color: "#64748b",
                                fontWeight: 500,
                                minWidth: "45px",
                                textAlign: "center"
                            },
                            children: ["M", String(z.id).padStart(2, "0")]
                        }, z.id))]
                    })
                }), s.jsx("tbody", {
                    children: te.map( (z, h) => s.jsxs("tr", {
                        style: {
                            borderBottom: "1px solid rgba(255,255,255,0.04)"
                        },
                        children: [s.jsx("td", {
                            style: {
                                padding: "8px 10px",
                                fontWeight: 600,
                                color: "#e2e8f0",
                                position: "sticky",
                                left: 0,
                                background: h % 2 === 0 ? "#0d1117" : "#0f1319",
                                zIndex: 1
                            },
                            children: z
                        }), _ && s.jsxs("td", {
                            style: {
                                padding: "8px 10px",
                                fontWeight: 800,
                                color: "#fbbf24",
                                textAlign: "right",
                                borderRight: "1px solid rgba(255,255,255,0.05)"
                            },
                            children: [_ === "Total $" ? "$" : "", k[z]]
                        }), i.map(d => {
                            const g = y(z, d.id)
                              , x = g === 0 || g === "-" || g === "$0";
                            return s.jsx("td", {
                                style: {
                                    padding: "8px",
                                    textAlign: "center",
                                    color: x ? "#475569" : "#cbd5e1",
                                    background: h % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)"
                                },
                                children: g
                            }, d.id)
                        }
                        )]
                    }, z))
                })]
            })
        })]
    });
    return s.jsxs("div", {
        children: [m("Match-by-Match Points", (p, y) => o[p][y] || 0, a, "Total Pts"), m("Match-by-Match Winnings", (p, y) => c[p][y] ? `$${c[p][y]}` : "-", f, "Total $"), m("Match-by-Match Ranks", (p, y) => u[p][y] || "-", null, null)]
    })
}
function np({user: e, matches: t, results: n, allSelections: r, userSel: l, playerScores: i}) {
    const [o,a] = N.useState("board");
    return s.jsxs("div", {
        style: w.page,
        children: [s.jsx("h1", {
            style: w.h1,
            children: "Leaderboard & Stats"
        }), s.jsx("p", {
            style: {
                color: "#64748b",
                fontSize: "13px",
                marginBottom: "20px"
            },
            children: "Season standings and historical data"
        }), s.jsxs("div", {
            style: {
                display: "flex",
                gap: "6px",
                marginBottom: "20px",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                paddingBottom: "10px",
                flexWrap: "wrap"
            },
            children: [s.jsx("button", {
                style: w.navBtn(o === "board"),
                onClick: () => a("board"),
                children: "🏆 Overall Leaderboard"
            }), s.jsx("button", {
                style: w.navBtn(o === "consolidated"),
                onClick: () => a("consolidated"),
                children: "📈 Consolidated Score"
            }), s.jsx("button", {
                style: w.navBtn(o === "stats"),
                onClick: () => a("stats"),
                children: "📊 My Performance"
            })]
        }), o === "board" && s.jsx(qf, {
            matches: t,
            results: n,
            allSelections: r,
            playerScores: i
        }), o === "consolidated" && s.jsx(tp, {
            matches: t,
            results: n,
            allSelections: r,
            playerScores: i
        }), o === "stats" && s.jsx(ep, {
            user: e,
            matches: t,
            results: n,
            userSel: l,
            playerScores: i
        })]
    })
}
function rp() {
    const [e,t] = N.useState([])
      , [n,r] = N.useState(!0)
      , [l,i] = N.useState(null);
    N.useEffect( () => {
        Te.query("users", {
            select: "*",
            order: "display_name.asc"
        }).then(u => {
            t((u || []).filter(c => !c.is_admin)),
            r(!1)
        }
        )
    }
    , []);
    const o = () => {
        const u = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
        return Array.from({
            length: 6
        }, () => u[Math.floor(Math.random() * u.length)]).join("")
    }
      , a = async u => {
        const c = o();
        await Te.update("users", {
            password: c
        }, {
            username: u
        }),
        t(f => f.map(m => m.username === u ? {
            ...m,
            password: c
        } : m)),
        i({
            username: u,
            newPwd: c
        })
    }
    ;
    return n ? s.jsx("div", {
        style: {
            color: "#555",
            padding: "20px"
        },
        children: "Loading players..."
    }) : s.jsxs("div", {
        children: [s.jsx("div", {
            style: {
                ...w.sectionTitle,
                marginBottom: "14px"
            },
            children: "All Players & Passwords"
        }), l && s.jsxs("div", {
            style: {
                ...w.card,
                background: "rgba(0,200,100,0.06)",
                borderColor: "rgba(0,200,100,0.2)",
                marginBottom: "14px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "8px"
            },
            children: [s.jsxs("span", {
                style: {
                    fontSize: "13px",
                    color: "#00c864"
                },
                children: ["✓ Reset for ", s.jsx("strong", {
                    children: l.username
                }), " → ", s.jsx("strong", {
                    style: {
                        letterSpacing: "2px",
                        color: "#FFD700"
                    },
                    children: l.newPwd
                })]
            }), s.jsx("button", {
                style: {
                    ...w.btn("ghost"),
                    padding: "4px 10px",
                    fontSize: "12px"
                },
                onClick: () => i(null),
                children: "✕"
            })]
        }), s.jsx("div", {
            style: {
                ...w.card,
                padding: "0",
                overflow: "auto"
            },
            children: s.jsxs("table", {
                style: {
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "13px",
                    minWidth: "400px"
                },
                children: [s.jsx("thead", {
                    children: s.jsx("tr", {
                        style: {
                            borderBottom: "1px solid rgba(255,255,255,0.07)",
                            background: "rgba(255,255,255,0.03)"
                        },
                        children: ["Player", "Username", "Password", ""].map(u => s.jsx("th", {
                            style: {
                                padding: "10px 14px",
                                textAlign: "left",
                                color: "#888",
                                fontWeight: "normal",
                                fontSize: "11px",
                                letterSpacing: "1px",
                                textTransform: "uppercase"
                            },
                            children: u
                        }, u))
                    })
                }), s.jsx("tbody", {
                    children: e.map( (u, c) => s.jsxs("tr", {
                        style: {
                            borderBottom: "1px solid rgba(255,255,255,0.04)",
                            background: c % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)"
                        },
                        children: [s.jsx("td", {
                            style: {
                                padding: "10px 14px",
                                color: "#e8e0d0"
                            },
                            children: u.display_name
                        }), s.jsx("td", {
                            style: {
                                padding: "10px 14px",
                                color: "#888",
                                fontFamily: "monospace"
                            },
                            children: u.username
                        }), s.jsx("td", {
                            style: {
                                padding: "10px 14px",
                                color: "#FFD700",
                                fontFamily: "monospace",
                                letterSpacing: "1px"
                            },
                            children: u.password
                        }), s.jsx("td", {
                            style: {
                                padding: "10px 14px"
                            },
                            children: s.jsx("button", {
                                style: {
                                    ...w.btn("ghost"),
                                    padding: "5px 10px",
                                    fontSize: "12px",
                                    border: "1px solid rgba(255,165,0,0.3)",
                                    color: "#FFD700"
                                },
                                onClick: () => a(u.username),
                                children: "Reset"
                            })
                        })]
                    }, u.username))
                })]
            })
        })]
    })
}
const de = ({label: e, value: t, onChange: n, type: r="text", opts: l}) => {
    const i = r === "number";
    return s.jsxs("div", {
        children: [s.jsx("label", {
            style: w.label,
            children: e
        }), l ? s.jsxs("select", {
            style: w.select,
            value: t,
            onChange: o => n(o.target.value),
            children: [s.jsx("option", {
                value: "",
                children: "-- Select --"
            }), l.map(o => s.jsx("option", {
                value: o,
                children: o
            }, o))]
        }) : s.jsx("input", {
            style: {
                ...w.input,
                fontSize: "16px"
            },
            inputMode: i ? "decimal" : "text",
            type: "text",
            value: t,
            onChange: o => n(o.target.value)
        })]
    })
}
  , ra = [{
    key: "winningTeam",
    label: "Winner",
    type: "team"
}, {
    key: "bestBatsman",
    label: "Best Bat",
    type: "player"
}, {
    key: "bestBowler",
    label: "Best Bowl",
    type: "player"
}, {
    key: "powerplayWinner",
    label: "PP Winner",
    type: "team"
}, {
    key: "dotBallBowler",
    label: "Dot-Ball",
    type: "player"
}, {
    key: "totalWickets",
    label: "Wickets",
    type: "wickets"
}, {
    key: "duckBatsman",
    label: "Duck",
    type: "player"
}, {
    key: "doubleCategory",
    label: "Double",
    type: "double"
}, {
    key: "winningHorse",
    label: "🏆 Horse",
    type: "fantasy"
}, {
    key: "losingHorse",
    label: "💀 Horse",
    type: "fantasy"
}];
function xc({matches: e, allSelections: t, onSaveSelection: n, readOnly: r=!1}) {
    const [l] = N.useState(new Date)
      , [i,o] = N.useState("")
      , [a,u] = N.useState(null)
      , [c,f] = N.useState({})
      , [m,p] = N.useState(!1)
      , [y,k] = N.useState("")
      , _ = e.filter(v => l >= new Date(v.lock_time))
      , z = _.find(v => String(v.id) === String(i))
      , h = z ? [...new Set([...xn[z.home] || [], ...xn[z.away] || []])].sort() : []
      , d = v => z ? v.type === "team" ? [z.home, z.away] : v.type === "player" ? h : v.type === "wickets" ? Ko : v.type === "double" ? mc : v.type === "fantasy" ? te : [] : []
      , g = v => {
        var T;
        const P = v.toLowerCase().replace(/\s/g, "_")
          , I = ((T = t[P]) == null ? void 0 : T[i]) || {};
        f({
            ...yc,
            ...I
        }),
        u(v)
    }
      , x = () => {
        u(null),
        f({})
    }
      , C = async v => {
        const P = v.toLowerCase().replace(/\s/g, "_");
        p(!0),
        await n(P, i, c),
        p(!1),
        u(null),
        f({}),
        k(`Saved ${v}'s selections`),
        setTimeout( () => k(""), 3e3)
    }
      , j = z ? te.filter(v => {
        var P;
        return (P = t[v.toLowerCase().replace(/\s/g, "_")]) == null ? void 0 : P[i]
    }
    ) : [];
    return s.jsxs("div", {
        children: [s.jsx("div", {
            style: w.sectionTitle,
            children: r ? "View All Player Selections" : "View & Edit Player Selections"
        }), s.jsxs("div", {
            style: {
                marginBottom: "16px"
            },
            children: [s.jsx("label", {
                style: w.label,
                children: "Select Match"
            }), s.jsxs("select", {
                style: {
                    ...w.select,
                    maxWidth: "400px"
                },
                value: i,
                onChange: v => {
                    o(v.target.value),
                    u(null),
                    k("")
                }
                ,
                children: [s.jsx("option", {
                    value: "",
                    children: "-- Select a locked match --"
                }), _.map(v => s.jsxs("option", {
                    value: v.id,
                    children: ["M", v.id, ": ", v.home, " vs ", v.away, " — ", v.date]
                }, v.id))]
            })]
        }), y && s.jsxs("div", {
            style: {
                color: "#00c864",
                fontSize: "13px",
                marginBottom: "12px"
            },
            children: ["✓ ", y]
        }), z && s.jsxs(s.Fragment, {
            children: [s.jsxs("div", {
                style: {
                    fontSize: "13px",
                    color: "#4db8ff",
                    marginBottom: "14px"
                },
                children: ["📋 ", j.length, "/", te.length, " players submitted for M", z.id, ": ", z.home, " vs ", z.away]
            }), s.jsx("div", {
                style: {
                    ...w.card,
                    padding: "0",
                    overflow: "auto"
                },
                children: s.jsxs("table", {
                    style: {
                        width: "100%",
                        borderCollapse: "collapse",
                        fontSize: "12px",
                        minWidth: "1100px"
                    },
                    children: [s.jsx("thead", {
                        children: s.jsxs("tr", {
                            style: {
                                borderBottom: "1px solid rgba(255,255,255,0.07)",
                                background: "rgba(255,255,255,0.03)"
                            },
                            children: [s.jsx("th", {
                                style: {
                                    padding: "10px 12px",
                                    textAlign: "left",
                                    color: "#888",
                                    fontWeight: "normal",
                                    fontSize: "11px",
                                    letterSpacing: "1px",
                                    textTransform: "uppercase",
                                    position: "sticky",
                                    left: 0,
                                    background: "#0d1117",
                                    zIndex: 2,
                                    minWidth: "110px"
                                },
                                children: "Player"
                            }), ra.map(v => s.jsx("th", {
                                style: {
                                    padding: "10px 8px",
                                    textAlign: "left",
                                    color: "#888",
                                    fontWeight: "normal",
                                    fontSize: "10px",
                                    letterSpacing: "0.5px",
                                    textTransform: "uppercase",
                                    whiteSpace: "nowrap"
                                },
                                children: v.label
                            }, v.key)), !r && s.jsx("th", {
                                style: {
                                    padding: "10px 8px",
                                    textAlign: "center",
                                    color: "#888",
                                    fontWeight: "normal",
                                    fontSize: "11px",
                                    letterSpacing: "1px",
                                    textTransform: "uppercase",
                                    minWidth: "100px"
                                },
                                children: "Actions"
                            })]
                        })
                    }), s.jsx("tbody", {
                        children: te.map( (v, P) => {
                            var R;
                            const I = v.toLowerCase().replace(/\s/g, "_")
                              , T = (R = t[I]) == null ? void 0 : R[i]
                              , H = !!T
                              , S = a === v;
                            return s.jsxs("tr", {
                                style: {
                                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                                    background: P % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
                                    opacity: !H && !S ? .5 : 1
                                },
                                children: [s.jsxs("td", {
                                    style: {
                                        padding: "8px 12px",
                                        color: H ? "#e8e0d0" : "#555",
                                        fontWeight: "bold",
                                        fontSize: "12px",
                                        position: "sticky",
                                        left: 0,
                                        background: P % 2 === 0 ? "#0d1117" : "#0f1319",
                                        zIndex: 1,
                                        whiteSpace: "nowrap"
                                    },
                                    children: [v, H && s.jsx("span", {
                                        style: {
                                            color: "#00c864",
                                            marginLeft: "4px",
                                            fontSize: "10px"
                                        },
                                        children: "✓"
                                    })]
                                }), ra.map(L => s.jsx("td", {
                                    style: {
                                        padding: "6px 8px",
                                        whiteSpace: "nowrap"
                                    },
                                    children: S ? s.jsxs("select", {
                                        style: {
                                            ...w.select,
                                            padding: "6px 8px",
                                            fontSize: "12px",
                                            minWidth: "90px"
                                        },
                                        value: c[L.key] || "",
                                        onChange: Q => f(he => ({
                                            ...he,
                                            [L.key]: Q.target.value
                                        })),
                                        children: [s.jsx("option", {
                                            value: "",
                                            children: "--"
                                        }), d(L).map(Q => s.jsx("option", {
                                            value: Q,
                                            children: Q
                                        }, Q))]
                                    }) : s.jsx("span", {
                                        style: {
                                            color: T != null && T[L.key] ? "#e8e0d0" : "#444",
                                            fontSize: "12px"
                                        },
                                        children: (T == null ? void 0 : T[L.key]) || "—"
                                    })
                                }, L.key)), !r && s.jsx("td", {
                                    style: {
                                        padding: "6px 8px",
                                        textAlign: "center",
                                        whiteSpace: "nowrap"
                                    },
                                    children: S ? s.jsxs(s.Fragment, {
                                        children: [s.jsx("button", {
                                            style: {
                                                ...w.btn("primary"),
                                                padding: "5px 10px",
                                                fontSize: "11px",
                                                marginRight: "4px"
                                            },
                                            onClick: () => C(v),
                                            disabled: m,
                                            children: m ? "..." : "Save"
                                        }), s.jsx("button", {
                                            style: {
                                                ...w.btn("ghost"),
                                                padding: "5px 10px",
                                                fontSize: "11px",
                                                border: "1px solid rgba(255,255,255,0.15)"
                                            },
                                            onClick: x,
                                            children: "Cancel"
                                        })]
                                    }) : s.jsx("button", {
                                        style: {
                                            ...w.btn("ghost"),
                                            padding: "5px 10px",
                                            fontSize: "11px",
                                            border: "1px solid rgba(255,165,0,0.3)",
                                            color: "#FFD700"
                                        },
                                        onClick: () => g(v),
                                        children: "Edit"
                                    })
                                })]
                            }, v)
                        }
                        )
                    })]
                })
            })]
        }), !z && i === "" && s.jsx("div", {
            style: {
                ...w.card,
                textAlign: "center",
                color: "#555",
                padding: "40px"
            },
            children: "Select a match above to view player selections"
        })]
    })
}
function lp({matches: e}) {
    const [t,n] = N.useState(!1)
      , [r,l] = N.useState(null)
      , [i,o] = N.useState(null)
      , [a,u] = N.useState([])
      , c = async () => {
        n(!0),
        l(null),
        o(null),
        u([]);
        try {
            const f = await fetch("/api/manual-update-insights", {
                method: "POST"
            });
            if (!f.ok) {
                let p = "";
                const y = await f.text();
                try {
                    const k = JSON.parse(y);
                    p = k.error || k.message || ""
                } catch {
                    p = y
                }
                throw new Error(`Server returned ${f.status}: ${p.substring(0, 50) || "Is dev environment running?"}`)
            }
            const m = await f.json();
            l(m),
            u(m.results || [])
        } catch (f) {
            console.error(f),
            o(f.message.includes("Unexpected end of JSON input") ? "Error: Could not reach the AI service. If you are developing locally, please ensure you are running 'netlify dev' instead of 'npm run dev'." : f.message)
        } finally {
            n(!1)
        }
    }
    ;
    return s.jsxs("div", {
        style: w.card,
        children: [s.jsx("h2", {
            style: {
                ...w.sectionTitle,
                fontSize: "18px",
                marginBottom: "12px"
            },
            children: "Manual AI Insights Update"
        }), s.jsx("p", {
            style: {
                fontSize: "14px",
                color: "#94a3b8",
                marginBottom: "20px",
                lineHeight: "1.5"
            },
            children: "This will trigger the AI to generate or refresh insights (Probable XI, Pitch Report, Pitch & H2H) for all matches scheduled within the next 24 hours. This may take up to 15-20 seconds."
        }), s.jsxs("div", {
            style: {
                display: "flex",
                alignItems: "center",
                gap: "16px",
                flexWrap: "wrap",
                marginBottom: "20px"
            },
            children: [s.jsx("button", {
                style: w.btn("primary"),
                onClick: c,
                disabled: t,
                children: t ? "🔄 Updating AI Insights..." : "🚀 Trigger Today's Updates"
            }), t && s.jsx("span", {
                style: {
                    fontSize: "13px",
                    color: "#fbbf24",
                    animation: "pulse 1.5s infinite"
                },
                children: "Waiting for Gemini AI response..."
            })]
        }), i && s.jsxs("div", {
            style: {
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.2)",
                borderRadius: "8px",
                padding: "12px",
                marginBottom: "20px"
            },
            children: [s.jsx("div", {
                style: {
                    color: "#f87171",
                    fontWeight: 700,
                    fontSize: "14px",
                    marginBottom: "4px"
                },
                children: "❌ Error Updating Insights"
            }), s.jsx("div", {
                style: {
                    color: "#f87171",
                    fontSize: "13px"
                },
                children: i
            })]
        }), r && s.jsxs("div", {
            style: {
                background: "rgba(34,197,94,0.1)",
                border: "1px solid rgba(34,197,94,0.2)",
                borderRadius: "8px",
                padding: "12px",
                marginBottom: "20px"
            },
            children: [s.jsx("div", {
                style: {
                    color: "#4ade80",
                    fontWeight: 700,
                    fontSize: "14px",
                    marginBottom: "8px"
                },
                children: "✅ Update Complete"
            }), s.jsxs("div", {
                style: {
                    fontSize: "13px",
                    color: "#f8fafc",
                    marginBottom: "12px"
                },
                children: ["Processed ", r.processed, " of ", r.totalFound || r.processed, " upcoming match(es)."]
            }), s.jsx("div", {
                style: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px"
                },
                children: a.map( (f, m) => s.jsxs("div", {
                    style: {
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        background: "rgba(0,0,0,0.15)",
                        padding: "6px 10px",
                        borderRadius: "6px",
                        fontSize: "12px"
                    },
                    children: [s.jsx("span", {
                        style: {
                            color: f.success ? "#4ade80" : "#f87171"
                        },
                        children: f.success ? "✓" : "✕"
                    }), s.jsx("span", {
                        style: {
                            fontWeight: 600
                        },
                        children: f.teams
                    }), !f.success && s.jsxs("span", {
                        style: {
                            color: "#94a3b8",
                            fontSize: "11px"
                        },
                        children: ["(", f.error, ")"]
                    })]
                }, m))
            })]
        }), !r && !i && !t && s.jsx("div", {
            style: {
                color: "#64748b",
                fontSize: "13px",
                fontStyle: "italic"
            },
            children: "No manual update history in this session. Click the button above to start."
        })]
    })
}
function vc({matches: e, allSelections: t, playerScores: n, onSavePlayerScores: r}) {
    const [l,i] = N.useState("")
      , [o,a] = N.useState({})
      , [u,c] = N.useState(!1)
      , [f,m] = N.useState("")
      , p = new Date
      , y = e.filter(x => p >= new Date(x.lock_time))
      , k = y.find(x => String(x.id) === String(l));
    let _ = [];
    if (k) {
        const x = new Set;
        Object.values(t).forEach(C => {
            const j = C[k.id];
            j && (j.bestBatsman && x.add(j.bestBatsman),
            j.bestBowler && x.add(j.bestBowler),
            j.duckBatsman && x.add(j.duckBatsman),
            j.dotBallBowler && x.add(j.dotBallBowler))
        }
        ),
        _ = Array.from(x).filter(Boolean).sort()
    }
    N.useEffect( () => {
        if (k) {
            const x = {};
            _.forEach(C => {
                var v;
                const j = ((v = n[k.id]) == null ? void 0 : v[C]) || {};
                x[C] = {
                    runs: j.runs ?? "",
                    fours: j.fours ?? "",
                    sixes: j.sixes ?? "",
                    wickets: j.wickets ?? "",
                    maidens: j.maidens ?? "",
                    dot_balls: j.dot_balls ?? ""
                }
            }
            ),
            a(x)
        } else
            a({})
    }
    , [l, k, n]);
    const z = (x, C, j) => {
        a(v => ({
            ...v,
            [x]: {
                ...v[x],
                [C]: j
            }
        }))
    }
      , h = x => {
        const C = o[x] || {}
          , j = parseInt(C.runs) || 0
          , v = parseInt(C.fours) || 0
          , P = parseInt(C.sixes) || 0
          , I = parseInt(C.wickets) || 0
          , T = parseInt(C.maidens) || 0
          , H = parseInt(C.dot_balls) || 0;
        let S = 0;
        j >= 100 ? S = 25 : j >= 50 && (S = 15);
        const R = j + S + v * 2 + P * 3
          , L = I * 25 + T * 25
          , Q = H * 5;
        return {
            batsman_score: R,
            bowler_score: L,
            dot_ball_score: Q
        }
    }
      , d = async () => {
        if (!k)
            return;
        c(!0);
        const x = _.map(C => {
            const j = o[C] || {}
              , v = h(C);
            return {
                player_name: C,
                runs: j.runs !== "" ? parseInt(j.runs) : null,
                fours: j.fours !== "" ? parseInt(j.fours) : null,
                sixes: j.sixes !== "" ? parseInt(j.sixes) : null,
                wickets: j.wickets !== "" ? parseInt(j.wickets) : null,
                maidens: j.maidens !== "" ? parseInt(j.maidens) : null,
                dot_balls: j.dot_balls !== "" ? parseInt(j.dot_balls) : null,
                batsman_score: v.batsman_score || null,
                bowler_score: v.bowler_score || null,
                dot_ball_score: v.dot_ball_score || null
            }
        }
        );
        await r(k.id, x),
        c(!1),
        m("Scores saved successfully ✓"),
        setTimeout( () => m(""), 3e3)
    }
      , g = ({player: x, field: C}) => {
        var j;
        return s.jsx("input", {
            style: {
                ...w.input,
                padding: "4px 6px",
                fontSize: "12px",
                width: "100%",
                background: "rgba(0,0,0,0.2)"
            },
            type: "number",
            value: ((j = o[x]) == null ? void 0 : j[C]) ?? "",
            onChange: v => z(x, C, v.target.value)
        })
    }
    ;
    return s.jsxs("div", {
        children: [s.jsx("div", {
            style: w.sectionTitle,
            children: "Add Player Scores"
        }), s.jsxs("div", {
            style: {
                marginBottom: "16px"
            },
            children: [s.jsx("label", {
                style: w.label,
                children: "Select Match"
            }), s.jsxs("select", {
                style: {
                    ...w.select,
                    maxWidth: "400px"
                },
                value: l,
                onChange: x => {
                    i(x.target.value),
                    m("")
                }
                ,
                children: [s.jsx("option", {
                    value: "",
                    children: "-- Select a locked match --"
                }), y.map(x => s.jsxs("option", {
                    value: x.id,
                    children: ["M", x.id, ": ", x.home, " vs ", x.away, " — ", x.date]
                }, x.id))]
            })]
        }), f && s.jsxs("div", {
            style: {
                color: "#00c864",
                fontSize: "13px",
                marginBottom: "12px"
            },
            children: ["✓ ", f]
        }), k && _.length > 0 && s.jsxs(s.Fragment, {
            children: [s.jsxs("div", {
                style: {
                    fontSize: "13px",
                    color: "#4db8ff",
                    marginBottom: "14px"
                },
                children: ["📋 ", _.length, " unique players selected by fantasy managers."]
            }), s.jsx("div", {
                style: {
                    ...w.card,
                    padding: "0",
                    overflow: "auto"
                },
                children: s.jsxs("table", {
                    style: {
                        width: "100%",
                        borderCollapse: "collapse",
                        fontSize: "12px",
                        minWidth: "900px"
                    },
                    children: [s.jsx("thead", {
                        children: s.jsxs("tr", {
                            style: {
                                borderBottom: "1px solid rgba(255,255,255,0.07)",
                                background: "rgba(255,255,255,0.03)"
                            },
                            children: [s.jsx("th", {
                                style: {
                                    padding: "8px 10px",
                                    textAlign: "left",
                                    color: "#888",
                                    fontWeight: "normal",
                                    fontSize: "11px",
                                    position: "sticky",
                                    left: 0,
                                    background: "#0d1117",
                                    zIndex: 2
                                },
                                children: "Player"
                            }), s.jsx("th", {
                                style: {
                                    padding: "8px 4px",
                                    textAlign: "center",
                                    color: "#FFD700",
                                    fontWeight: "normal",
                                    fontSize: "10px"
                                },
                                children: "Runs (>50 +15, >100 +25)"
                            }), s.jsx("th", {
                                style: {
                                    padding: "8px 4px",
                                    textAlign: "center",
                                    color: "#FFD700",
                                    fontWeight: "normal",
                                    fontSize: "10px"
                                },
                                children: "Fours (2)"
                            }), s.jsx("th", {
                                style: {
                                    padding: "8px 4px",
                                    textAlign: "center",
                                    color: "#FFD700",
                                    fontWeight: "normal",
                                    fontSize: "10px"
                                },
                                children: "Sixes (3)"
                            }), s.jsx("th", {
                                style: {
                                    padding: "8px 4px",
                                    textAlign: "center",
                                    color: "#60a5fa",
                                    fontWeight: "normal",
                                    fontSize: "10px"
                                },
                                children: "Wickets (25)"
                            }), s.jsx("th", {
                                style: {
                                    padding: "8px 4px",
                                    textAlign: "center",
                                    color: "#60a5fa",
                                    fontWeight: "normal",
                                    fontSize: "10px"
                                },
                                children: "Maidens (25)"
                            }), s.jsx("th", {
                                style: {
                                    padding: "8px 4px",
                                    textAlign: "center",
                                    color: "#4ade80",
                                    fontWeight: "normal",
                                    fontSize: "10px"
                                },
                                children: "Dot Balls (5)"
                            }), s.jsx("th", {
                                style: {
                                    padding: "8px 4px",
                                    textAlign: "center",
                                    color: "#f8fafc",
                                    fontWeight: "bold",
                                    fontSize: "11px"
                                },
                                children: "Batsman Total"
                            }), s.jsx("th", {
                                style: {
                                    padding: "8px 4px",
                                    textAlign: "center",
                                    color: "#f8fafc",
                                    fontWeight: "bold",
                                    fontSize: "11px"
                                },
                                children: "Bowler Total"
                            }), s.jsx("th", {
                                style: {
                                    padding: "8px 4px",
                                    textAlign: "center",
                                    color: "#f8fafc",
                                    fontWeight: "bold",
                                    fontSize: "11px"
                                },
                                children: "Dot Ball Total"
                            })]
                        })
                    }), s.jsx("tbody", {
                        children: _.map( (x, C) => {
                            const j = h(x);
                            return s.jsxs("tr", {
                                style: {
                                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                                    background: C % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)"
                                },
                                children: [s.jsx("td", {
                                    style: {
                                        padding: "6px 10px",
                                        color: "#e8e0d0",
                                        fontWeight: "bold",
                                        position: "sticky",
                                        left: 0,
                                        background: C % 2 === 0 ? "#0d1117" : "#0f1319",
                                        zIndex: 1,
                                        whiteSpace: "nowrap"
                                    },
                                    children: x
                                }), s.jsx("td", {
                                    style: {
                                        padding: "6px 4px"
                                    },
                                    children: s.jsx(g, {
                                        player: x,
                                        field: "runs"
                                    })
                                }), s.jsx("td", {
                                    style: {
                                        padding: "6px 4px"
                                    },
                                    children: s.jsx(g, {
                                        player: x,
                                        field: "fours"
                                    })
                                }), s.jsx("td", {
                                    style: {
                                        padding: "6px 4px"
                                    },
                                    children: s.jsx(g, {
                                        player: x,
                                        field: "sixes"
                                    })
                                }), s.jsx("td", {
                                    style: {
                                        padding: "6px 4px"
                                    },
                                    children: s.jsx(g, {
                                        player: x,
                                        field: "wickets"
                                    })
                                }), s.jsx("td", {
                                    style: {
                                        padding: "6px 4px"
                                    },
                                    children: s.jsx(g, {
                                        player: x,
                                        field: "maidens"
                                    })
                                }), s.jsx("td", {
                                    style: {
                                        padding: "6px 4px"
                                    },
                                    children: s.jsx(g, {
                                        player: x,
                                        field: "dot_balls"
                                    })
                                }), s.jsx("td", {
                                    style: {
                                        padding: "6px 4px",
                                        textAlign: "center",
                                        color: "#FFD700",
                                        fontWeight: "bold"
                                    },
                                    children: j.batsman_score
                                }), s.jsx("td", {
                                    style: {
                                        padding: "6px 4px",
                                        textAlign: "center",
                                        color: "#60a5fa",
                                        fontWeight: "bold"
                                    },
                                    children: j.bowler_score
                                }), s.jsx("td", {
                                    style: {
                                        padding: "6px 4px",
                                        textAlign: "center",
                                        color: "#4ade80",
                                        fontWeight: "bold"
                                    },
                                    children: j.dot_ball_score
                                })]
                            }, x)
                        }
                        )
                    })]
                })
            }), s.jsx("div", {
                style: {
                    marginTop: "16px"
                },
                children: s.jsx("button", {
                    style: {
                        ...w.btn("primary"),
                        padding: "10px 20px"
                    },
                    onClick: d,
                    disabled: u,
                    children: u ? "Saving..." : "Save Player Scores"
                })
            })]
        }), k && _.length === 0 && s.jsx("div", {
            style: {
                color: "#888",
                fontSize: "13px"
            },
            children: "No players were selected by fantasy managers for this match."
        })]
    })
}
function ip({matches: e, results: t, onSaveResult: n, allSelections: r, onSaveSelection: l, playerScores: i, onSavePlayerScores: o}) {
    const [a,u] = N.useState("results")
      , [c,f] = N.useState(null)
      , [m] = N.useState(new Date)
      , p = {
        winningTeam: "",
        winByRuns: !0,
        runMargin: "",
        wicketMargin: "",
        topScorer: "",
        topScorerRuns: "",
        bestBowler: "",
        bestBowlerPoints: "",
        powerplayWinner: "",
        powerplayScore: "",
        powerplayDiff: "",
        dotBallLeader: "",
        dotBalls: "",
        totalWickets: "",
        wicketsRange: "",
        duckBatsmen: [],
        matchTopPlayer: "",
        matchBottomPlayer: ""
    }
      , [y,k] = N.useState(p)
      , [_,z] = N.useState("")
      , [h,d] = N.useState(!1)
      , [g,x] = N.useState(!1)
      , C = e.filter(S => m >= new Date(S.lock_time))
      , j = S => {
        f(S);
        const R = t[S.id];
        if (R) {
            const L = ["runMargin", "wicketMargin", "topScorerRuns", "bestBowlerPoints", "powerplayScore", "powerplayDiff", "dotBalls", "totalWickets"]
              , Q = {
                ...p,
                ...R,
                duckBatsmen: R.duckBatsmen || []
            };
            L.forEach(he => {
                Q[he] != null && (Q[he] = String(Q[he]))
            }
            ),
            k(Q)
        } else
            k(p);
        z(""),
        d(!1)
    }
      , v = (S, R) => k(L => ({
        ...L,
        [S]: R
    }))
      , P = async () => {
        if (!c)
            return;
        x(!0);
        const S = {
            ...y,
            runMargin: parseInt(y.runMargin) || 0,
            wicketMargin: parseInt(y.wicketMargin) || 0,
            topScorerRuns: parseInt(y.topScorerRuns) || 0,
            bestBowlerPoints: parseInt(y.bestBowlerPoints) || 0,
            powerplayScore: parseInt(y.powerplayScore) || 0,
            powerplayDiff: parseInt(y.powerplayDiff) || 0,
            dotBalls: parseInt(y.dotBalls) || 0,
            totalWickets: parseInt(y.totalWickets) || 0
        };
        await n(c.id, S),
        d(!0),
        x(!1),
        setTimeout( () => d(!1), 3e3)
    }
      , I = c
      , T = I ? [...new Set([...xn[I.home] || [], ...xn[I.away] || []])].sort() : []
      , H = c ? te.filter(S => {
        var R;
        return (R = r[S.toLowerCase().replace(/\s/g, "_")]) == null ? void 0 : R[c.id]
    }
    ).length : 0;
    return s.jsxs("div", {
        style: w.page,
        children: [s.jsx("h1", {
            style: w.h1,
            children: "Admin Panel"
        }), s.jsxs("div", {
            style: {
                display: "flex",
                gap: "8px",
                marginBottom: "20px",
                flexWrap: "wrap"
            },
            children: [s.jsx("button", {
                style: w.navBtn(a === "results"),
                onClick: () => u("results"),
                children: "Match Results"
            }), s.jsx("button", {
                style: w.navBtn(a === "scores"),
                onClick: () => u("scores"),
                children: "Player Scores"
            }), s.jsx("button", {
                style: w.navBtn(a === "selections"),
                onClick: () => u("selections"),
                children: "Player Selections"
            }), s.jsx("button", {
                style: w.navBtn(a === "insights"),
                onClick: () => u("insights"),
                children: "AI Insights"
            }), s.jsx("button", {
                style: w.navBtn(a === "users"),
                onClick: () => u("users"),
                children: "Player Passwords"
            })]
        }), a === "users" ? s.jsx(rp, {}) : a === "scores" ? s.jsx(vc, {
            matches: e,
            allSelections: r,
            playerScores: i,
            onSavePlayerScores: o
        }) : a === "selections" ? s.jsx(xc, {
            matches: e,
            allSelections: r,
            onSaveSelection: l
        }) : a === "insights" ? s.jsx(lp, {
            matches: e
        }) : s.jsxs("div", {
            style: {
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
                gap: "16px"
            },
            children: [s.jsxs("div", {
                children: [s.jsx("div", {
                    style: w.sectionTitle,
                    children: "Locked / Completed Matches"
                }), C.length === 0 && s.jsx("div", {
                    style: {
                        color: "#555",
                        fontSize: "13px"
                    },
                    children: "No locked matches yet"
                }), C.map(S => s.jsxs("div", {
                    onClick: () => j(S),
                    style: {
                        ...w.card,
                        marginBottom: "6px",
                        cursor: "pointer",
                        borderColor: (c == null ? void 0 : c.id) === S.id ? "#FFD700" : "rgba(255,255,255,0.07)",
                        padding: "10px 14px"
                    },
                    children: [s.jsxs("div", {
                        style: {
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        },
                        children: [s.jsxs("div", {
                            style: {
                                display: "flex",
                                alignItems: "center",
                                gap: "12px"
                            },
                            children: [s.jsxs("span", {
                                style: {
                                    fontSize: "14px",
                                    fontWeight: 800,
                                    color: "#64748b",
                                    width: "32px"
                                },
                                children: ["M", S.id]
                            }), s.jsx(lt, {
                                team: S.home,
                                size: 32
                            }), s.jsx("span", {
                                style: {
                                    fontSize: "15px",
                                    fontWeight: 700
                                },
                                children: S.home
                            }), s.jsx("span", {
                                style: {
                                    fontSize: "12px",
                                    color: "#475569"
                                },
                                children: "vs"
                            }), s.jsx(lt, {
                                team: S.away,
                                size: 32
                            }), s.jsx("span", {
                                style: {
                                    fontSize: "15px",
                                    fontWeight: 700
                                },
                                children: S.away
                            })]
                        }), t[S.id] && s.jsx("span", {
                            style: {
                                fontSize: "14px",
                                color: "#00c864"
                            },
                            children: "✓"
                        })]
                    }), s.jsx("div", {
                        style: {
                            fontSize: "12px",
                            color: "#475569",
                            marginTop: "6px",
                            marginLeft: "44px"
                        },
                        children: S.date
                    })]
                }, S.id))]
            }), s.jsx("div", {
                children: c ? s.jsxs("div", {
                    style: w.card,
                    children: [s.jsxs("div", {
                        style: {
                            fontSize: "18px",
                            fontWeight: "bold",
                            color: "#e8e0d0",
                            marginBottom: "4px"
                        },
                        children: ["M", I.id, ": ", I.home, " vs ", I.away]
                    }), s.jsxs("div", {
                        style: {
                            fontSize: "12px",
                            color: "#555",
                            marginBottom: "6px"
                        },
                        children: [I.date, " · ", I.time_label]
                    }), s.jsxs("div", {
                        style: {
                            fontSize: "12px",
                            color: "#4db8ff",
                            marginBottom: "16px"
                        },
                        children: ["📋 ", H, "/", te.length, " players submitted"]
                    }), s.jsx("div", {
                        style: w.sectionTitle,
                        children: "Match Result"
                    }), s.jsxs("div", {
                        style: {
                            ...w.grid2,
                            marginBottom: "14px"
                        },
                        children: [s.jsx(de, {
                            label: "Winning Team",
                            value: y.winningTeam,
                            onChange: S => v("winningTeam", S),
                            opts: [I.home, I.away]
                        }), s.jsxs("div", {
                            children: [s.jsx("label", {
                                style: w.label,
                                children: "Win Type"
                            }), s.jsxs("select", {
                                style: w.select,
                                value: y.winByRuns ? "runs" : "wickets",
                                onChange: S => v("winByRuns", S.target.value === "runs"),
                                children: [s.jsx("option", {
                                    value: "runs",
                                    children: "By Runs"
                                }), s.jsx("option", {
                                    value: "wickets",
                                    children: "By Wickets"
                                })]
                            })]
                        }), s.jsx(de, {
                            label: "Run Margin",
                            value: y.runMargin,
                            onChange: S => v("runMargin", S),
                            type: "number"
                        }), s.jsx(de, {
                            label: "Wicket Margin",
                            value: y.wicketMargin,
                            onChange: S => v("wicketMargin", S),
                            type: "number"
                        })]
                    }), s.jsx("div", {
                        style: w.sectionTitle,
                        children: "Batting"
                    }), s.jsxs("div", {
                        style: {
                            ...w.grid2,
                            marginBottom: "14px"
                        },
                        children: [s.jsx(de, {
                            label: "Top Scorer",
                            value: y.topScorer,
                            onChange: S => v("topScorer", S),
                            opts: T
                        }), s.jsx(de, {
                            label: "Runs Scored",
                            value: y.topScorerRuns,
                            onChange: S => v("topScorerRuns", S),
                            type: "number"
                        }), s.jsxs("div", {
                            style: {
                                gridColumn: "1/-1"
                            },
                            children: [s.jsx("label", {
                                style: w.label,
                                children: "Duck Batsmen"
                            }), s.jsxs("div", {
                                style: {
                                    display: "flex",
                                    gap: "8px",
                                    marginBottom: "8px"
                                },
                                children: [s.jsxs("select", {
                                    style: {
                                        ...w.select,
                                        flex: 1
                                    },
                                    value: _,
                                    onChange: S => z(S.target.value),
                                    children: [s.jsx("option", {
                                        value: "",
                                        children: "-- Select Player --"
                                    }), T.filter(S => !y.duckBatsmen.includes(S)).map(S => s.jsx("option", {
                                        value: S,
                                        children: S
                                    }, S))]
                                }), s.jsx("button", {
                                    style: {
                                        ...w.btn("primary"),
                                        padding: "10px 16px"
                                    },
                                    onClick: () => {
                                        _ && (v("duckBatsmen", [...y.duckBatsmen, _]),
                                        z(""))
                                    }
                                    ,
                                    children: "+ Add"
                                })]
                            }), s.jsx("div", {
                                style: {
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "6px"
                                },
                                children: y.duckBatsmen.map(S => s.jsxs("span", {
                                    style: {
                                        background: "rgba(255,165,0,0.2)",
                                        border: "1px solid rgba(255,165,0,0.4)",
                                        borderRadius: "6px",
                                        padding: "6px 12px",
                                        fontSize: "13px",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px"
                                    },
                                    children: [S, s.jsx("button", {
                                        onClick: () => v("duckBatsmen", y.duckBatsmen.filter(R => R !== S)),
                                        style: {
                                            background: "transparent",
                                            border: "none",
                                            cursor: "pointer",
                                            color: "#ff6b6b",
                                            fontSize: "16px",
                                            padding: "0",
                                            lineHeight: "1"
                                        },
                                        children: "✕"
                                    })]
                                }, S))
                            })]
                        })]
                    }), s.jsx("div", {
                        style: w.sectionTitle,
                        children: "Bowling"
                    }), s.jsxs("div", {
                        style: {
                            ...w.grid2,
                            marginBottom: "14px"
                        },
                        children: [s.jsx(de, {
                            label: "Best Bowler",
                            value: y.bestBowler,
                            onChange: S => v("bestBowler", S),
                            opts: T
                        }), s.jsx(de, {
                            label: "Bowler Points",
                            value: y.bestBowlerPoints,
                            onChange: S => v("bestBowlerPoints", S),
                            type: "number"
                        }), s.jsx(de, {
                            label: "Dot-Ball Leader",
                            value: y.dotBallLeader,
                            onChange: S => v("dotBallLeader", S),
                            opts: T
                        }), s.jsx(de, {
                            label: "Dot Balls Bowled",
                            value: y.dotBalls,
                            onChange: S => v("dotBalls", S),
                            type: "number"
                        })]
                    }), s.jsx("div", {
                        style: w.sectionTitle,
                        children: "Powerplay & Wickets"
                    }), s.jsxs("div", {
                        style: {
                            ...w.grid2,
                            marginBottom: "14px"
                        },
                        children: [s.jsx(de, {
                            label: "Powerplay Winner",
                            value: y.powerplayWinner,
                            onChange: S => v("powerplayWinner", S),
                            opts: [I.home, I.away]
                        }), s.jsx(de, {
                            label: "Powerplay Score",
                            value: y.powerplayScore,
                            onChange: S => v("powerplayScore", S),
                            type: "number"
                        }), s.jsx(de, {
                            label: "Powerplay Diff",
                            value: y.powerplayDiff,
                            onChange: S => v("powerplayDiff", S),
                            type: "number"
                        }), s.jsx(de, {
                            label: "Total Wickets Fallen",
                            value: y.totalWickets,
                            onChange: S => v("totalWickets", S),
                            type: "number"
                        }), s.jsx(de, {
                            label: "Wickets Range",
                            value: y.wicketsRange,
                            onChange: S => v("wicketsRange", S),
                            opts: Ko
                        })]
                    }), s.jsx("div", {
                        style: w.sectionTitle,
                        children: "Horse Results"
                    }), s.jsxs("div", {
                        style: {
                            ...w.grid2,
                            marginBottom: "16px"
                        },
                        children: [s.jsx(de, {
                            label: "🏆 Match Top Scorer (fantasy player)",
                            value: y.matchTopPlayer,
                            onChange: S => v("matchTopPlayer", S),
                            opts: te
                        }), s.jsx(de, {
                            label: "💀 Match Bottom Scorer (fantasy player)",
                            value: y.matchBottomPlayer,
                            onChange: S => v("matchBottomPlayer", S),
                            opts: te
                        })]
                    }), s.jsxs("div", {
                        style: {
                            display: "flex",
                            gap: "12px",
                            alignItems: "center",
                            flexWrap: "wrap"
                        },
                        children: [s.jsx("button", {
                            style: w.btn("primary"),
                            onClick: P,
                            disabled: g,
                            children: g ? "Saving..." : "Save Result & Calculate Points"
                        }), h && s.jsx("span", {
                            style: {
                                color: "#00c864",
                                fontSize: "13px"
                            },
                            children: "✓ Saved! Points calculated."
                        })]
                    })]
                }) : s.jsx("div", {
                    style: {
                        ...w.card,
                        textAlign: "center",
                        color: "#555",
                        padding: "40px"
                    },
                    children: "Select a match to enter results"
                })
            })]
        })]
    })
}
function op({matches: e, results: t, allSelections: n, playerScores: r, onSavePlayerScores: l}) {
    const [i,o] = N.useState("grid");
    return s.jsxs("div", {
        style: w.page,
        children: [s.jsx("h1", {
            style: w.h1,
            children: "Live Match Center"
        }), s.jsx("p", {
            style: {
                color: "#64748b",
                fontSize: "13px",
                marginBottom: "24px"
            },
            children: "Track live scores or manually update player stats"
        }), s.jsxs("div", {
            style: {
                display: "flex",
                gap: "6px",
                marginBottom: "20px",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                paddingBottom: "10px",
                flexWrap: "wrap"
            },
            children: [s.jsx("button", {
                style: w.navBtn(i === "grid"),
                onClick: () => o("grid"),
                children: "🔴 Live Leaderboard"
            }), s.jsx("button", {
                style: w.navBtn(i === "update"),
                onClick: () => o("update"),
                children: "✏️ Update Player Stats"
            })]
        }), i === "grid" && s.jsx(sp, {
            matches: e,
            results: t,
            allSelections: n,
            playerScores: r
        }), i === "update" && s.jsx(vc, {
            matches: e,
            allSelections: n,
            playerScores: r,
            onSavePlayerScores: l
        })]
    })
}
function sp({matches: e, results: t, allSelections: n, playerScores: r}) {
    const [l] = N.useState(new Date)
      , i = e.filter(c => l >= new Date(c.lock_time))
      , [o,a] = N.useState("")
      , u = i.find(c => String(c.id) === String(o));
    return s.jsxs("div", {
        children: [s.jsxs("div", {
            style: {
                marginBottom: "16px"
            },
            children: [s.jsx("label", {
                style: w.label,
                children: "Select Match to Track"
            }), s.jsxs("select", {
                style: {
                    ...w.select,
                    maxWidth: "400px"
                },
                value: o,
                onChange: c => a(c.target.value),
                children: [s.jsx("option", {
                    value: "",
                    children: "-- Select a match --"
                }), i.map(c => s.jsxs("option", {
                    value: c.id,
                    children: ["M", c.id, ": ", c.home, " vs ", c.away, " — ", c.date]
                }, c.id))]
            })]
        }), !u && o === "" && s.jsx("div", {
            style: {
                ...w.card,
                textAlign: "center",
                color: "#555",
                padding: "40px"
            },
            children: "Select a match above to view live scores"
        }), u && s.jsx("div", {
            style: {
                ...w.card,
                padding: "0",
                overflow: "auto"
            },
            children: s.jsxs("table", {
                style: {
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "12px",
                    minWidth: "900px"
                },
                children: [s.jsx("thead", {
                    children: s.jsxs("tr", {
                        style: {
                            borderBottom: "1px solid rgba(255,255,255,0.07)",
                            background: "rgba(255,255,255,0.03)"
                        },
                        children: [s.jsx("th", {
                            style: {
                                padding: "8px 10px",
                                textAlign: "left",
                                color: "#888",
                                fontWeight: "normal",
                                fontSize: "11px",
                                position: "sticky",
                                left: 0,
                                background: "#0d1117",
                                zIndex: 2
                            },
                            children: "Fantasy Player"
                        }), s.jsx("th", {
                            style: {
                                padding: "8px 4px",
                                textAlign: "right",
                                color: "#888",
                                fontWeight: "normal",
                                fontSize: "10px"
                            },
                            children: "Winning Team"
                        }), s.jsx("th", {
                            style: {
                                padding: "8px 4px",
                                textAlign: "right",
                                color: "#888",
                                fontWeight: "normal",
                                fontSize: "10px"
                            },
                            children: "Best Bat"
                        }), s.jsx("th", {
                            style: {
                                padding: "8px 4px",
                                textAlign: "right",
                                color: "#888",
                                fontWeight: "normal",
                                fontSize: "10px"
                            },
                            children: "Best Bowl"
                        }), s.jsx("th", {
                            style: {
                                padding: "8px 4px",
                                textAlign: "right",
                                color: "#888",
                                fontWeight: "normal",
                                fontSize: "10px"
                            },
                            children: "PP Winner"
                        }), s.jsx("th", {
                            style: {
                                padding: "8px 4px",
                                textAlign: "right",
                                color: "#888",
                                fontWeight: "normal",
                                fontSize: "10px"
                            },
                            children: "Dot-Ball"
                        }), s.jsx("th", {
                            style: {
                                padding: "8px 4px",
                                textAlign: "right",
                                color: "#888",
                                fontWeight: "normal",
                                fontSize: "10px"
                            },
                            children: "Wickets"
                        }), s.jsx("th", {
                            style: {
                                padding: "8px 4px",
                                textAlign: "right",
                                color: "#888",
                                fontWeight: "normal",
                                fontSize: "10px"
                            },
                            children: "Duck"
                        }), s.jsx("th", {
                            style: {
                                padding: "8px 4px",
                                textAlign: "right",
                                color: "#888",
                                fontWeight: "normal",
                                fontSize: "10px"
                            },
                            children: "Horses"
                        }), s.jsx("th", {
                            style: {
                                padding: "8px 4px",
                                textAlign: "right",
                                color: "#fbbf24",
                                fontWeight: "bold",
                                fontSize: "12px"
                            },
                            children: "Total Pts"
                        })]
                    })
                }), s.jsx("tbody", {
                    children: te.map(c => {
                        var y;
                        const f = c.toLowerCase().replace(/\s/g, "_")
                          , m = (y = n[f]) == null ? void 0 : y[u.id];
                        if (!m)
                            return null;
                        const p = vn(m, t[u.id], r[u.id] || {});
                        return {
                            name: c,
                            bd: p.breakdown,
                            total: p.total
                        }
                    }
                    ).filter(Boolean).sort( (c, f) => f.total - c.total).map( (c, f) => s.jsxs("tr", {
                        style: {
                            borderBottom: "1px solid rgba(255,255,255,0.04)",
                            background: f % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)"
                        },
                        children: [s.jsx("td", {
                            style: {
                                padding: "6px 10px",
                                color: "#e8e0d0",
                                fontWeight: "bold",
                                position: "sticky",
                                left: 0,
                                background: f % 2 === 0 ? "#0d1117" : "#0f1319",
                                zIndex: 1,
                                whiteSpace: "nowrap"
                            },
                            children: c.name
                        }), s.jsx("td", {
                            style: {
                                padding: "6px 4px",
                                textAlign: "right",
                                color: c.bd.winningTeam > 0 ? "#4ade80" : "#64748b"
                            },
                            children: c.bd.winningTeam || 0
                        }), s.jsx("td", {
                            style: {
                                padding: "6px 4px",
                                textAlign: "right",
                                color: c.bd.bestBatsman > 0 ? "#4ade80" : "#64748b"
                            },
                            children: c.bd.bestBatsman || 0
                        }), s.jsx("td", {
                            style: {
                                padding: "6px 4px",
                                textAlign: "right",
                                color: c.bd.bestBowler > 0 ? "#4ade80" : "#64748b"
                            },
                            children: c.bd.bestBowler || 0
                        }), s.jsx("td", {
                            style: {
                                padding: "6px 4px",
                                textAlign: "right",
                                color: c.bd.powerplayWinner > 0 ? "#4ade80" : "#64748b"
                            },
                            children: c.bd.powerplayWinner || 0
                        }), s.jsx("td", {
                            style: {
                                padding: "6px 4px",
                                textAlign: "right",
                                color: c.bd.dotBallBowler > 0 ? "#4ade80" : "#64748b"
                            },
                            children: c.bd.dotBallBowler || 0
                        }), s.jsx("td", {
                            style: {
                                padding: "6px 4px",
                                textAlign: "right",
                                color: c.bd.totalWickets > 0 ? "#4ade80" : "#64748b"
                            },
                            children: c.bd.totalWickets || 0
                        }), s.jsx("td", {
                            style: {
                                padding: "6px 4px",
                                textAlign: "right",
                                color: c.bd.duckBatsman > 0 ? "#4ade80" : "#64748b"
                            },
                            children: c.bd.duckBatsman || 0
                        }), s.jsx("td", {
                            style: {
                                padding: "6px 4px",
                                textAlign: "right",
                                color: (c.bd.winningHorse || 0) + (c.bd.losingHorse || 0) > 0 ? "#4ade80" : "#64748b"
                            },
                            children: (c.bd.winningHorse || 0) + (c.bd.losingHorse || 0)
                        }), s.jsx("td", {
                            style: {
                                padding: "6px 4px",
                                textAlign: "right",
                                color: "#fbbf24",
                                fontWeight: "bold",
                                fontSize: "14px"
                            },
                            children: c.total
                        })]
                    }, c.name))
                })]
            })
        })]
    })
}
function ap() {
    const [e,t] = N.useState( () => {
        try {
            return JSON.parse(sessionStorage.getItem("ipl_user") || "null")
        } catch {
            return null
        }
    }
    )
      , [n,r] = N.useState("matches")
      , [l,i] = N.useState(null)
      , [o,a] = N.useState(!1)
      , [u,c] = N.useState([])
      , [f,m] = N.useState({})
      , [p,y] = N.useState({})
      , [k,_] = N.useState({})
      , [z,h] = N.useState({})
      , [d,g] = N.useState(!0)
      , x = e ? p[e.username] || {} : {};
    N.useEffect( () => {
        if (!e) {
            g(!1);
            return
        }
        Promise.all([Te.query("matches", {
            select: "*",
            order: "id.asc"
        }), Te.query("results", {
            select: "*"
        }), Te.query("selections", {
            select: "*"
        }), Te.query("match_insights", {
            select: "*"
        }).catch( () => []), Te.query("player_scores", {
            select: "*"
        }).catch( () => [])]).then( ([S,R,L,Q,he]) => {
            c(S || []);
            const Ht = {};
            (R || []).forEach(M => {
                Ht[M.match_id] = {
                    winningTeam: M.winning_team,
                    runMargin: M.run_margin,
                    wicketMargin: M.wicket_margin,
                    topScorer: M.top_scorer,
                    topScorerRuns: M.top_scorer_runs,
                    bestBowler: M.best_bowler,
                    bestBowlerPoints: M.best_bowler_points,
                    powerplayWinner: M.powerplay_winner,
                    powerplayScore: M.powerplay_score,
                    powerplayDiff: M.powerplay_diff,
                    dotBallLeader: M.dot_ball_leader,
                    dotBalls: M.dot_balls,
                    totalWickets: M.total_wickets,
                    wicketsRange: M.wickets_range,
                    duckBatsmen: M.duck_batsmen || [],
                    matchTopPlayer: M.match_top_player,
                    matchBottomPlayer: M.match_bottom_player
                }
            }
            ),
            m(Ht);
            const B = {};
            (L || []).forEach(M => {
                B[M.username] || (B[M.username] = {}),
                B[M.username][M.match_id] = {
                    winningTeam: M.winning_team,
                    bestBatsman: M.best_batsman,
                    bestBowler: M.best_bowler,
                    powerplayWinner: M.powerplay_winner,
                    dotBallBowler: M.dot_ball_bowler,
                    totalWickets: M.total_wickets,
                    duckBatsman: M.duck_batsman,
                    doubleCategory: M.double_category,
                    winningHorse: M.winning_horse,
                    losingHorse: M.losing_horse
                }
            }
            ),
            y(B);
            const W = {};
            (Array.isArray(Q) ? Q : []).forEach(M => {
                W[M.match_id] = M
            }
            ),
            _(W);
            const D = {};
            (Array.isArray(he) ? he : []).forEach(M => {
                D[M.match_id] || (D[M.match_id] = {}),
                D[M.match_id][M.player_name] = M
            }
            ),
            h(D),
            g(!1)
        }
        ).catch( () => g(!1))
    }
    , [e]);
    const C = S => {
        sessionStorage.setItem("ipl_user", JSON.stringify(S)),
        t(S)
    }
      , j = () => {
        sessionStorage.removeItem("ipl_user"),
        t(null),
        r("matches"),
        i(null),
        a(!1)
    }
      , v = N.useCallback(async (S, R) => {
        await Te.upsert("selections", {
            username: e.username,
            match_id: S,
            winning_team: R.winningTeam,
            best_batsman: R.bestBatsman,
            best_bowler: R.bestBowler,
            powerplay_winner: R.powerplayWinner,
            dot_ball_bowler: R.dotBallBowler,
            total_wickets: R.totalWickets,
            duck_batsman: R.duckBatsman,
            double_category: R.doubleCategory,
            winning_horse: R.winningHorse,
            losing_horse: R.losingHorse,
            saved_at: new Date().toISOString()
        }, "username,match_id"),
        y(L => ({
            ...L,
            [e.username]: {
                ...L[e.username] || {},
                [S]: R
            }
        }))
    }
    , [e])
      , P = N.useCallback(async (S, R) => {
        await Te.upsert("results", {
            match_id: S,
            winning_team: R.winningTeam,
            win_by_runs: R.winByRuns,
            run_margin: R.runMargin,
            wicket_margin: R.wicketMargin,
            top_scorer: R.topScorer,
            top_scorer_runs: R.topScorerRuns,
            best_bowler: R.bestBowler,
            best_bowler_points: R.bestBowlerPoints,
            powerplay_winner: R.powerplayWinner,
            powerplay_score: R.powerplayScore,
            powerplay_diff: R.powerplayDiff,
            dot_ball_leader: R.dotBallLeader,
            dot_balls: R.dotBalls,
            total_wickets: R.totalWickets,
            wickets_range: R.wicketsRange,
            duck_batsmen: R.duckBatsmen,
            match_top_player: R.matchTopPlayer,
            match_bottom_player: R.matchBottomPlayer
        }, "match_id"),
        m(L => ({
            ...L,
            [S]: R
        }))
    }
    , [])
      , I = N.useCallback(async (S, R, L) => {
        await Te.upsert("selections", {
            username: S,
            match_id: R,
            winning_team: L.winningTeam,
            best_batsman: L.bestBatsman,
            best_bowler: L.bestBowler,
            powerplay_winner: L.powerplayWinner,
            dot_ball_bowler: L.dotBallBowler,
            total_wickets: L.totalWickets,
            duck_batsman: L.duckBatsman,
            double_category: L.doubleCategory,
            winning_horse: L.winningHorse,
            losing_horse: L.losingHorse,
            saved_at: new Date().toISOString()
        }, "username,match_id"),
        y(Q => ({
            ...Q,
            [S]: {
                ...Q[S] || {},
                [R]: L
            }
        }))
    }
    , [])
      , T = N.useCallback(async (S, R) => {
        await Promise.all(R.map(L => Te.upsert("player_scores", {
            match_id: S,
            player_name: L.player_name,
            runs: L.runs,
            fours: L.fours,
            sixes: L.sixes,
            wickets: L.wickets,
            maidens: L.maidens,
            dot_balls: L.dot_balls,
            batsman_score: L.batsman_score,
            bowler_score: L.bowler_score,
            dot_ball_score: L.dot_ball_score
        }, "match_id,player_name"))),
        h(L => {
            const Q = {
                ...L[S] || {}
            };
            return R.forEach(he => Q[he.player_name] = he),
            {
                ...L,
                [S]: Q
            }
        }
        )
    }
    , [])
      , H = [{
        id: "matches",
        icon: "🏏",
        label: "Matches"
    }, {
        id: "selections",
        icon: "📋",
        label: "Picks"
    }, {
        id: "live",
        icon: "🔴",
        label: "Live"
    }, {
        id: "leaderboard",
        icon: "🏆",
        label: "Board"
    }, ...e != null && e.isAdmin ? [{
        id: "admin",
        icon: "⚙️",
        label: "Admin"
    }] : []];
    return e ? d ? s.jsxs("div", {
        style: {
            ...w.app,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        children: [s.jsx("style", {
            children: "@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}"
        }), s.jsxs("div", {
            style: {
                textAlign: "center"
            },
            children: [s.jsx("div", {
                style: {
                    fontSize: "40px",
                    marginBottom: "12px",
                    animation: "pulse 2s ease-in-out infinite"
                },
                children: "🏏"
            }), s.jsx("div", {
                style: {
                    ...w.logo,
                    fontSize: "22px",
                    display: "block",
                    marginBottom: "8px"
                },
                children: "IPL FANTASY 2026"
            }), s.jsx("div", {
                style: {
                    color: "#475569",
                    fontSize: "13px"
                },
                children: "Loading match data..."
            })]
        })]
    }) : s.jsxs("div", {
        style: w.app,
        children: [s.jsx("style", {
            children: `
        select option{background:#131a2b;color:#e2e8f0;}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-track{background:transparent;}
        ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:3px;}
        ::-webkit-scrollbar-thumb:hover{background:rgba(255,255,255,0.2);}
        *{box-sizing:border-box;}
        input,select{font-size:14px!important;}
        input[type="number"]::-webkit-outer-spin-button,input[type="number"]::-webkit-inner-spin-button{-webkit-appearance:none;margin:0;}
        input[type="number"]{-moz-appearance:textfield;}
        input:focus,select:focus{border-color:rgba(255,140,0,0.35)!important;outline:none;}
        ::selection{background:rgba(255,140,0,0.3);color:#fff;}
        .tab-indicator{position:absolute;top:-2px;left:50%;transform:translateX(-50%);width:20px;height:3px;border-radius:2px;background:linear-gradient(90deg,#FF8C00,#fbbf24);}
      `
        }), s.jsx("div", {
            style: w.noise
        }), s.jsxs("div", {
            style: w.content,
            children: [s.jsxs("header", {
                style: w.header,
                children: [s.jsx("div", {
                    style: w.logo,
                    children: "🏏 IPL FANTASY"
                }), s.jsxs("div", {
                    style: {
                        display: "flex",
                        alignItems: "center",
                        gap: "10px"
                    },
                    children: [s.jsx("span", {
                        style: {
                            fontSize: "12px",
                            color: "#64748b",
                            fontWeight: 500
                        },
                        children: e.displayName
                    }), s.jsx("button", {
                        onClick: j,
                        style: {
                            background: "none",
                            border: "1px solid rgba(239,68,68,0.25)",
                            borderRadius: "6px",
                            padding: "4px 10px",
                            cursor: "pointer",
                            color: "#f87171",
                            fontSize: "11px",
                            fontWeight: 600,
                            fontFamily: "'Inter',sans-serif",
                            transition: "all 0.2s"
                        },
                        children: "Logout"
                    })]
                })]
            }), l ? s.jsx(Zf, {
                match: l,
                user: e,
                onBack: () => i(null),
                results: f,
                userSel: x,
                onSave: v,
                insights: k[l.id],
                playerScores: z
            }) : n === "matches" ? s.jsx(Jf, {
                user: e,
                onSelectMatch: S => {
                    i(S)
                }
                ,
                matches: u,
                results: f,
                userSel: x
            }) : n === "leaderboard" ? s.jsx(np, {
                user: e,
                matches: u,
                results: f,
                allSelections: p,
                userSel: x,
                playerScores: z
            }) : n === "selections" ? s.jsx("div", {
                style: w.page,
                children: s.jsx(xc, {
                    matches: u,
                    allSelections: p,
                    readOnly: !0
                })
            }) : n === "live" ? s.jsx(op, {
                matches: u,
                results: f,
                allSelections: p,
                playerScores: z,
                onSavePlayerScores: T
            }) : n === "admin" && e.isAdmin ? s.jsx(ip, {
                matches: u,
                results: f,
                onSaveResult: P,
                allSelections: p,
                onSaveSelection: I,
                playerScores: z,
                onSavePlayerScores: T
            }) : null]
        }), s.jsx("nav", {
            style: w.bottomNav,
            children: H.map(S => s.jsxs("button", {
                style: w.tabBtn(n === S.id && !l),
                onClick: () => {
                    r(S.id),
                    i(null)
                }
                ,
                children: [n === S.id && !l && s.jsx("div", {
                    className: "tab-indicator"
                }), s.jsx("span", {
                    style: {
                        fontSize: "24px",
                        lineHeight: 1
                    },
                    children: S.icon
                }), s.jsx("span", {
                    style: {
                        fontSize: "12px",
                        fontWeight: n === S.id && !l ? 700 : 500,
                        letterSpacing: "0.3px"
                    },
                    children: S.label
                })]
            }, S.id))
        })]
    }) : s.jsxs("div", {
        style: w.app,
        children: [s.jsx("div", {
            style: w.noise
        }), s.jsx("div", {
            style: {
                ...w.content,
                paddingBottom: 0
            },
            children: s.jsx(Gf, {
                onLogin: C
            })
        })]
    })
}
ri.createRoot(document.getElementById("root")).render(s.jsx(Lc.StrictMode, {
    children: s.jsx(ap, {})
}));
