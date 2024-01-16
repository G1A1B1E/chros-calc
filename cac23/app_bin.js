(function() {
    'use strict';
    var m, aa = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
        if (a == Array.prototype || a == Object.prototype)
            return a;
        a[b] = c.value;
        return a
    }
    ;
    function ba(a) {
        a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
        for (var b = 0; b < a.length; ++b) {
            var c = a[b];
            if (c && c.Math == Math)
                return c
        }
        throw Error("Cannot find global object");
    }
    var ca = ba(this);
    function ea(a, b) {
        if (b)
            a: {
                var c = ca;
                a = a.split(".");
                for (var d = 0; d < a.length - 1; d++) {
                    var e = a[d];
                    if (!(e in c))
                        break a;
                    c = c[e]
                }
                a = a[a.length - 1];
                d = c[a];
                b = b(d);
                b != d && null != b && aa(c, a, {
                    configurable: !0,
                    writable: !0,
                    value: b
                })
            }
    }
    ea("String.prototype.replaceAll", function(a) {
        return a ? a : function(b, c) {
            if (b instanceof RegExp && !b.global)
                throw new TypeError("String.prototype.replaceAll called with a non-global RegExp argument.");
            return b instanceof RegExp ? this.replace(b, c) : this.replace(new RegExp(String(b).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08"),"g"), c)
        }
    });
    /*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
    var fa = fa || {}
      , n = this || self;
    function ha(a, b) {
        a = a.split(".");
        var c = n;
        a[0]in c || "undefined" == typeof c.execScript || c.execScript("var " + a[0]);
        for (var d; a.length && (d = a.shift()); )
            a.length || void 0 === b ? c[d] && c[d] !== Object.prototype[d] ? c = c[d] : c = c[d] = {} : c[d] = b
    }
    function ja(a, b) {
        a = a.split(".");
        b = b || n;
        for (var c = 0; c < a.length; c++)
            if (b = b[a[c]],
            null == b)
                return null;
        return b
    }
    function ka(a) {
        var b = typeof a;
        return "object" != b ? b : a ? Array.isArray(a) ? "array" : b : "null"
    }
    function la(a) {
        var b = ka(a);
        return "array" == b || "object" == b && "number" == typeof a.length
    }
    function ma(a) {
        var b = typeof a;
        return "object" == b && null != a || "function" == b
    }
    function na(a, b, c) {
        return a.call.apply(a.bind, arguments)
    }
    function oa(a, b, c) {
        if (!a)
            throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function() {
                var e = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(e, d);
                return a.apply(b, e)
            }
        }
        return function() {
            return a.apply(b, arguments)
        }
    }
    function pa(a, b, c) {
        pa = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? na : oa;
        return pa.apply(null, arguments)
    }
    function qa(a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.dc = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a;
        a.Mi = function(d, e, f) {
            for (var g = Array(arguments.length - 2), k = 2; k < arguments.length; k++)
                g[k - 2] = arguments[k];
            return b.prototype[e].apply(d, g)
        }
    }
    function ra(a) {
        return a
    }
    ;function t(a, b, c, d) {
        var e = arguments.length, f = 3 > e ? b : null === d ? d = Object.getOwnPropertyDescriptor(b, c) : d, g;
        if ("object" === typeof Reflect && Reflect && "function" === typeof Reflect.decorate)
            f = Reflect.decorate(a, b, c, d);
        else
            for (var k = a.length - 1; 0 <= k; k--)
                if (g = a[k])
                    f = (3 > e ? g(f) : 3 < e ? g(b, c, f) : g(b, c)) || f;
        return 3 < e && f && Object.defineProperty(b, c, f),
        f
    }
    function A(a, b) {
        if ("object" === typeof Reflect && Reflect && "function" === typeof Reflect.metadata)
            return Reflect.metadata(a, b)
    }
    ;var sa = window;
    function ta(a) {
        sa.chrome = {
            runtime: {
                id: "something"
            },
            i18n: {
                getMessage(b) {
                    return a[b]?.message || ""
                },
                getAcceptLanguages() {
                    return navigator.languages
                }
            }
        }
    }
    ;var ua;
    const va = Array.prototype.indexOf ? function(a, b) {
        return Array.prototype.indexOf.call(a, b, void 0)
    }
    : function(a, b) {
        if ("string" === typeof a)
            return "string" !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0);
        for (let c = 0; c < a.length; c++)
            if (c in a && a[c] === b)
                return c;
        return -1
    }
      , wa = Array.prototype.forEach ? function(a, b) {
        Array.prototype.forEach.call(a, b, void 0)
    }
    : function(a, b) {
        const c = a.length
          , d = "string" === typeof a ? a.split("") : a;
        for (let e = 0; e < c; e++)
            e in d && b.call(void 0, d[e], e, a)
    }
    ;
    function xa(a, b) {
        b = va(a, b);
        let c;
        (c = 0 <= b) && Array.prototype.splice.call(a, b, 1);
        return c
    }
    function ya(a) {
        const b = a.length;
        if (0 < b) {
            const c = Array(b);
            for (let d = 0; d < b; d++)
                c[d] = a[d];
            return c
        }
        return []
    }
    ;function za() {
        this.g = Date.now()
    }
    var Aa = null;
    za.prototype.set = function(a) {
        this.g = a
    }
    ;
    za.prototype.reset = function() {
        this.set(Date.now())
    }
    ;
    za.prototype.get = function() {
        return this.g
    }
    ;
    function Ba(a, b) {
        for (const c in a)
            b.call(void 0, a[c], c, a)
    }
    const Ca = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
    function Da(a, b) {
        let c, d;
        for (let e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d)
                a[c] = d[c];
            for (let f = 0; f < Ca.length; f++)
                c = Ca[f],
                Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
        }
    }
    ;var Ea;
    function Fa() {
        if (void 0 === Ea) {
            var a = null
              , b = n.trustedTypes;
            if (b && b.createPolicy) {
                try {
                    a = b.createPolicy("goog#html", {
                        createHTML: ra,
                        createScript: ra,
                        createScriptURL: ra
                    })
                } catch (c) {
                    n.console && n.console.error(c.message)
                }
                Ea = a
            } else
                Ea = a
        }
        return Ea
    }
    ;function Ga(a, b) {
        this.g = a === Ha && b || "";
        this.h = Ia
    }
    Ga.prototype.pb = !0;
    Ga.prototype.mb = function() {
        return this.g
    }
    ;
    function Ja(a) {
        return a instanceof Ga && a.constructor === Ga && a.h === Ia ? a.g : "type_error:Const"
    }
    function Ka(a) {
        return new Ga(Ha,a)
    }
    var Ia = {}
      , Ha = {};
    var La = class {
        constructor(a) {
            this.g = a
        }
        toString() {
            return this.g + ""
        }
    }
    ;
    La.prototype.pb = !0;
    La.prototype.mb = function() {
        return this.g.toString()
    }
    ;
    function Ma(a) {
        return a instanceof La && a.constructor === La ? a.g : "type_error:TrustedResourceUrl"
    }
    function Na(a) {
        var b = Ja(Ka("translations/translations__%{locale}.js"));
        if (!Oa.test(b))
            throw Error("Invalid TrustedResourceUrl format: " + b);
        var c = b.replace(Pa, function(d, e) {
            if (!Object.prototype.hasOwnProperty.call(a, e))
                throw Error('Found marker, "' + e + '", in format string, "' + b + '", but no valid label mapping found in args: ' + JSON.stringify(a));
            d = a[e];
            return d instanceof Ga ? Ja(d) : encodeURIComponent(String(d))
        });
        return Qa(c)
    }
    var Pa = /%{(\w+)}/g
      , Oa = RegExp("^((https:)?//[0-9a-z.:[\\]-]+/|/[^/\\\\]|[^:/\\\\%]+/|[^:/\\\\%]*[?#]|about:blank#)", "i")
      , Ra = {};
    function Qa(a) {
        const b = Fa();
        a = b ? b.createScriptURL(a) : a;
        return new La(a,Ra)
    }
    ;function Sa(a) {
        return /^[\s\xa0]*$/.test(a)
    }
    ;var Ta = class {
        constructor(a) {
            this.g = a
        }
        toString() {
            return this.g.toString()
        }
    }
    ;
    Ta.prototype.pb = !0;
    Ta.prototype.mb = function() {
        return this.g.toString()
    }
    ;
    var Wa = {}
      , Xa = new Ta("about:invalid#zClosurez",Wa);
    const Ya = {};
    class Za {
        constructor(a) {
            this.g = a;
            this.pb = !0
        }
        toString() {
            return this.g.toString()
        }
        mb() {
            return this.g
        }
    }
    var $a = new Za("",Ya);
    var ab, bb = ja("CLOSURE_FLAGS"), cb = bb && bb[610401301];
    ab = null != cb ? cb : !1;
    function db() {
        var a = n.navigator;
        return a && (a = a.userAgent) ? a : ""
    }
    var eb;
    const fb = n.navigator;
    eb = fb ? fb.userAgentData || null : null;
    function gb(a) {
        return ab ? eb ? eb.brands.some(({brand: b})=>b && -1 != b.indexOf(a)) : !1 : !1
    }
    function B(a) {
        return -1 != db().indexOf(a)
    }
    ;function hb() {
        return ab ? !!eb && 0 < eb.brands.length : !1
    }
    function ib() {
        return hb() ? !1 : B("Opera")
    }
    function jb() {
        return B("Firefox") || B("FxiOS")
    }
    function kb() {
        return hb() ? gb("Chromium") : (B("Chrome") || B("CriOS")) && !(hb() ? 0 : B("Edge")) || B("Silk")
    }
    ;const lb = {};
    function mb(a) {
        return a instanceof nb && a.constructor === nb ? a.g : "type_error:SafeHtml"
    }
    class nb {
        constructor(a) {
            this.g = a;
            this.pb = !0
        }
        mb() {
            return this.g.toString()
        }
        toString() {
            return this.g.toString()
        }
    }
    var ob = new nb(n.trustedTypes && n.trustedTypes.emptyHTML || "",lb);
    function pb(a) {
        qb || (qb = new rb);
        var b = qb;
        const c = b.g;
        if (c[0]) {
            var d = b.h;
            b = b.i ? d : -1;
            do
                b = (b + 1) % 0,
                a(c[b]);
            while (b !== d)
        }
    }
    var rb = class {
        constructor() {
            this.clear()
        }
        clear() {
            this.g = [];
            this.h = -1;
            this.i = !1
        }
    }
    , qb;
    function sb(a) {
        this.g = a || "";
        Aa || (Aa = new za);
        this.h = Aa
    }
    function tb(a) {
        return 10 > a ? "0" + a : String(a)
    }
    function ub(a) {
        sb.call(this, a)
    }
    qa(ub, sb);
    function vb() {
        const a = new ub
          , b = [];
        pb(c=>{
            var d = b.push
              , e = [];
            e.push(a.g, " ");
            var f = e.push
              , g = new Date(c.g());
            f.call(e, "[", tb(g.getFullYear() - 2E3) + tb(g.getMonth() + 1) + tb(g.getDate()) + " " + tb(g.getHours()) + ":" + tb(g.getMinutes()) + ":" + tb(g.getSeconds()) + "." + tb(Math.floor(g.getMilliseconds() / 10)), "] ");
            f = e.push;
            g = a.h.get();
            g = (c.g() - g) / 1E3;
            var k = g.toFixed(3)
              , q = 0;
            if (1 > g)
                q = 2;
            else
                for (; 100 > g; )
                    q++,
                    g *= 10;
            for (; 0 < q--; )
                k = " " + k;
            f.call(e, "[", k, "s] ");
            e.push("[", c.h(), "] ");
            e.push(c.getMessage());
            e.push("\n");
            d.call(b, e.join(""))
        }
        );
        return b
    }
    ;function wb() {
        return ab ? !!eb && !!eb.platform : !1
    }
    function xb() {
        return wb() ? "Android" === eb.platform : B("Android")
    }
    function yb() {
        return B("iPhone") && !B("iPod") && !B("iPad")
    }
    function zb() {
        return yb() || B("iPad") || B("iPod")
    }
    function Ab() {
        return wb() ? "macOS" === eb.platform : B("Macintosh")
    }
    function Bb() {
        return wb() ? "Windows" === eb.platform : B("Windows")
    }
    function Cb() {
        return wb() ? "Chrome OS" === eb.platform : B("CrOS")
    }
    function Db() {
        var a = db()
          , b = "";
        Bb() ? (b = /Windows (?:NT|Phone) ([0-9.]+)/,
        b = (a = b.exec(a)) ? a[1] : "0.0") : zb() ? (b = /(?:iPhone|iPod|iPad|CPU)\s+OS\s+(\S+)/,
        b = (a = b.exec(a)) && a[1].replace(/_/g, ".")) : Ab() ? (b = /Mac OS X ([0-9_.]+)/,
        b = (a = b.exec(a)) ? a[1].replace(/_/g, ".") : "10") : -1 != db().toLowerCase().indexOf("kaios") ? (b = /(?:KaiOS)\/(\S+)/i,
        b = (a = b.exec(a)) && a[1]) : xb() ? (b = /Android\s+([^\);]+)(\)|;)/,
        b = (a = b.exec(a)) && a[1]) : Cb() && (b = /(?:CrOS\s+(?:i686|x86_64)\s+([0-9.]+))/,
        b = (a = b.exec(a)) && a[1]);
        return b || ""
    }
    ;function Eb(a) {
        Eb[" "](a);
        return a
    }
    Eb[" "] = function() {}
    ;
    var Gb = ib(), Hb = hb() ? !1 : B("Trident") || B("MSIE"), Ib = B("Edge"), Jb = B("Gecko") && !(-1 != db().toLowerCase().indexOf("webkit") && !B("Edge")) && !(B("Trident") || B("MSIE")) && !B("Edge"), Kb = -1 != db().toLowerCase().indexOf("webkit") && !B("Edge"), Lb = Kb && B("Mobile"), Mb;
    a: {
        var Nb = ""
          , Ob = function() {
            var a = db();
            if (Jb)
                return /rv:([^\);]+)(\)|;)/.exec(a);
            if (Ib)
                return /Edge\/([\d\.]+)/.exec(a);
            if (Hb)
                return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
            if (Kb)
                return /WebKit\/(\S+)/.exec(a);
            if (Gb)
                return /(?:Version)[ \/]?(\S+)/.exec(a)
        }();
        Ob && (Nb = Ob ? Ob[1] : "");
        if (Hb) {
            var Pb, Qb = n.document;
            Pb = Qb ? Qb.documentMode : void 0;
            if (null != Pb && Pb > parseFloat(Nb)) {
                Mb = String(Pb);
                break a
            }
        }
        Mb = Nb
    }
    var Rb = Mb;
    try {
        (new self.OffscreenCanvas(0,0)).getContext("2d")
    } catch (a) {}
    ;var Sb = /^[\w+/_-]+[=]{0,2}$/;
    function Tb(a, b) {
        b = (b || n).document;
        return b.querySelector ? (a = b.querySelector(a)) && (a = a.nonce || a.getAttribute("nonce")) && Sb.test(a) ? a : "" : ""
    }
    ;function Ub(a, b) {
        this.x = void 0 !== a ? a : 0;
        this.y = void 0 !== b ? b : 0
    }
    m = Ub.prototype;
    m.clone = function() {
        return new Ub(this.x,this.y)
    }
    ;
    m.ceil = function() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this
    }
    ;
    m.floor = function() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this
    }
    ;
    m.round = function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this
    }
    ;
    m.scale = function(a, b) {
        this.x *= a;
        this.y *= "number" === typeof b ? b : a;
        return this
    }
    ;
    function Vb(a, b) {
        const c = a.split("%s");
        let d = "";
        const e = Array.prototype.slice.call(arguments, 1);
        for (; e.length && 1 < c.length; )
            d += c.shift() + e.shift()
    }
    function Wb(a) {
        return null == a ? "" : String(a)
    }
    ;function Xb(a, b) {
        Ba(b, function(c, d) {
            c && "object" == typeof c && c.pb && (c = c.mb());
            "style" == d ? a.style.cssText = c : "class" == d ? a.className = c : "for" == d ? a.htmlFor = c : Yb.hasOwnProperty(d) ? a.setAttribute(Yb[d], c) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d, c) : a[d] = c
        })
    }
    var Yb = {
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        colspan: "colSpan",
        frameborder: "frameBorder",
        height: "height",
        maxlength: "maxLength",
        nonce: "nonce",
        role: "role",
        rowspan: "rowSpan",
        type: "type",
        usemap: "useMap",
        valign: "vAlign",
        width: "width"
    };
    function Zb(a, b, c) {
        function d(k) {
            k && b.appendChild("string" === typeof k ? a.createTextNode(k) : k)
        }
        for (var e = 2; e < c.length; e++) {
            var f = c[e];
            if (!la(f) || ma(f) && 0 < f.nodeType)
                d(f);
            else {
                a: {
                    if (f && "number" == typeof f.length) {
                        if (ma(f)) {
                            var g = "function" == typeof f.item || "string" == typeof f.item;
                            break a
                        }
                        if ("function" === typeof f) {
                            g = "function" == typeof f.item;
                            break a
                        }
                    }
                    g = !1
                }
                wa(g ? ya(f) : f, d)
            }
        }
    }
    function $b(a, b) {
        b = String(b);
        "application/xhtml+xml" === a.contentType && (b = b.toLowerCase());
        return a.createElement(b)
    }
    function ac(a) {
        return 9 == a.nodeType ? a : a.ownerDocument || a.document
    }
    function bc(a) {
        this.g = a || n.document || document
    }
    function cc(a, b) {
        a = a.g;
        b = b && "*" != b ? String(b).toUpperCase() : "";
        a.querySelectorAll && a.querySelector && b ? b = a.querySelectorAll(b) : b = a.getElementsByTagName(b || "*");
        return b
    }
    bc.prototype.h = function(a, b, c) {
        var d = this.g
          , e = arguments
          , f = e[1]
          , g = $b(d, String(e[0]));
        f && ("string" === typeof f ? g.className = f : Array.isArray(f) ? g.className = f.join(" ") : Xb(g, f));
        2 < e.length && Zb(d, g, e);
        return g
    }
    ;
    bc.prototype.createElement = function(a) {
        return $b(this.g, a)
    }
    ;
    bc.prototype.contains = function(a, b) {
        if (!a || !b)
            return !1;
        if (a.contains && 1 == b.nodeType)
            return a == b || a.contains(b);
        if ("undefined" != typeof a.compareDocumentPosition)
            return a == b || !!(a.compareDocumentPosition(b) & 16);
        for (; b && a != b; )
            b = b.parentNode;
        return b == a
    }
    ;
    bc.prototype.pe = ac;
    /*

 SPDX-License-Identifier: Apache-2.0
*/
    const dc = "function" === typeof URL;
    var ec = class {
    }
    ;
    class fc extends ec {
        constructor(a) {
            super();
            this.g = a
        }
        toString() {
            return this.g
        }
    }
    ;/*

 Copyright 2020 Google LLC
 SPDX-License-Identifier: Apache-2.0
*/
    function gc(a, b, c) {
        var d = [hc`aria-`];
        if (0 === d.length)
            throw Error("");
        d = d.map(f=>{
            if (f instanceof fc)
                f = f.g;
            else
                throw Error("");
            return f
        }
        );
        const e = b.toLowerCase();
        if (d.every(f=>0 !== e.indexOf(f)))
            throw Error(`Attribute "${b}" does not match any of the allowed prefixes.`);
        a.setAttribute(b, c)
    }
    ;function ic(a) {
        jc(a, void 0)
    }
    function jc(a, b=`unexpected value ${a}!`) {
        throw Error(b);
    }
    ;function kc(a, b) {
        a.src = Ma(b);
        (void 0)?.lj || (b = (b = (a.ownerDocument && a.ownerDocument.defaultView || window).document.querySelector?.("script[nonce]")) ? b.nonce || b.getAttribute("nonce") || "" : "") && a.setAttribute("nonce", b)
    }
    ;class lc {
        constructor(a) {
            this.Gg = a
        }
    }
    function mc(a) {
        return new lc(b=>b.substr(0, a.length + 1).toLowerCase() === a + ":")
    }
    const nc = [mc("data"), mc("http"), mc("https"), mc("mailto"), mc("ftp"), new lc(a=>/^[^:]*([/?#]|$)/.test(a))];
    function oc(a, b=nc) {
        if (a instanceof Ta)
            return a;
        for (let c = 0; c < b.length; ++c) {
            const d = b[c];
            if (d instanceof lc && d.Gg(a))
                return new Ta(a,Wa)
        }
    }
    ;function pc(a, b, c, d) {
        if (b instanceof Ta)
            b = b instanceof Ta && b.constructor === Ta ? b.g : "type_error:SafeUrl";
        else {
            b: if (dc) {
                try {
                    var e = new URL(b)
                } catch (f) {
                    e = "https:";
                    break b
                }
                e = e.protocol
            } else
                c: {
                    e = document.createElement("a");
                    try {
                        e.href = b
                    } catch (f) {
                        e = void 0;
                        break c
                    }
                    e = e.protocol;
                    e = ":" === e || "" === e ? "https:" : e
                }
            b = "javascript:" !== e ? b : void 0
        }
        void 0 !== b && a.open(b, c, d)
    }
    ;function hc(a) {
        return new fc(a[0].toLowerCase())
    }
    ;function qc(a, ...b) {
        if (0 === b.length)
            return Qa(a[0]);
        let c = a[0];
        for (let d = 0; d < b.length; d++)
            c += encodeURIComponent(b[d]) + a[d + 1];
        return Qa(c)
    }
    ;var rc = jb()
      , sc = yb() || B("iPod")
      , tc = B("iPad")
      , uc = B("Android") && !(kb() || jb() || ib() || B("Silk"))
      , vc = kb()
      , wc = B("Safari") && !(kb() || (hb() ? 0 : B("Coast")) || ib() || (hb() ? 0 : B("Edge")) || (hb() ? gb("Microsoft Edge") : B("Edg/")) || (hb() ? gb("Opera") : B("OPR")) || jb() || B("Silk") || B("Android")) && !zb();
    var xc = {}
      , yc = null;
    var zc = "undefined" !== typeof Uint8Array
      , Ac = !Hb && "function" === typeof btoa;
    const Bc = "function" === typeof Symbol && "symbol" === typeof Symbol() ? Symbol() : void 0;
    var Cc = Bc ? (a,b)=>{
        a[Bc] |= b
    }
    : (a,b)=>{
        void 0 !== a.Ca ? a.Ca |= b : Object.defineProperties(a, {
            Ca: {
                value: b,
                configurable: !0,
                writable: !0,
                enumerable: !1
            }
        })
    }
    ;
    function Dc(a) {
        const b = Ec(a);
        1 !== (b & 1) && (Object.isFrozen(a) && (a = Array.prototype.slice.call(a)),
        Fc(a, b | 1))
    }
    var Ec = Bc ? a=>a[Bc] | 0 : a=>a.Ca | 0
      , Gc = Bc ? a=>a[Bc] : a=>a.Ca
      , Fc = Bc ? (a,b)=>{
        a[Bc] = b
    }
    : (a,b)=>{
        void 0 !== a.Ca ? a.Ca = b : Object.defineProperties(a, {
            Ca: {
                value: b,
                configurable: !0,
                writable: !0,
                enumerable: !1
            }
        })
    }
    ;
    function Hc() {
        var a = [];
        Cc(a, 1);
        return a
    }
    function Ic(a, b) {
        Fc(b, (a | 0) & -14591)
    }
    function Jc(a, b) {
        Fc(b, (a | 34) & -14557)
    }
    function Kc(a) {
        a = a >> 14 & 1023;
        return 0 === a ? 536870912 : a
    }
    ;var Lc = {};
    function Mc(a) {
        return null !== a && "object" === typeof a && !Array.isArray(a) && a.constructor === Object
    }
    var Nc;
    const Oc = [];
    Fc(Oc, 55);
    Nc = Object.freeze(Oc);
    let Pc;
    function Qc(a, b) {
        Pc = b;
        a = new a(b);
        Pc = void 0;
        return a
    }
    ;function Rc(a) {
        switch (typeof a) {
        case "number":
            return isFinite(a) ? a : String(a);
        case "boolean":
            return a ? 1 : 0;
        case "object":
            if (a && !Array.isArray(a) && zc && null != a && a instanceof Uint8Array) {
                if (Ac) {
                    for (var b = "", c = 0, d = a.length - 10240; c < d; )
                        b += String.fromCharCode.apply(null, a.subarray(c, c += 10240));
                    b += String.fromCharCode.apply(null, c ? a.subarray(c) : a);
                    a = btoa(b)
                } else {
                    void 0 === b && (b = 0);
                    if (!yc) {
                        yc = {};
                        c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");
                        d = ["+/=", "+/", "-_=", "-_.", "-_"];
                        for (var e = 0; 5 > e; e++) {
                            var f = c.concat(d[e].split(""));
                            xc[e] = f;
                            for (var g = 0; g < f.length; g++) {
                                var k = f[g];
                                void 0 === yc[k] && (yc[k] = g)
                            }
                        }
                    }
                    b = xc[b];
                    c = Array(Math.floor(a.length / 3));
                    d = b[64] || "";
                    for (e = f = 0; f < a.length - 2; f += 3) {
                        var q = a[f]
                          , p = a[f + 1];
                        k = a[f + 2];
                        g = b[q >> 2];
                        q = b[(q & 3) << 4 | p >> 4];
                        p = b[(p & 15) << 2 | k >> 6];
                        k = b[k & 63];
                        c[e++] = g + q + p + k
                    }
                    g = 0;
                    k = d;
                    switch (a.length - f) {
                    case 2:
                        g = a[f + 1],
                        k = b[(g & 15) << 2] || d;
                    case 1:
                        a = a[f],
                        c[e] = b[a >> 2] + b[(a & 3) << 4 | g >> 4] + k + d
                    }
                    a = c.join("")
                }
                return a
            }
        }
        return a
    }
    ;function Sc(a, b, c) {
        a = Array.prototype.slice.call(a);
        var d = a.length;
        const e = b & 256 ? a[d - 1] : void 0;
        d += e ? -1 : 0;
        for (b = b & 512 ? 1 : 0; b < d; b++)
            a[b] = c(a[b]);
        if (e) {
            b = a[b] = {};
            for (const f in e)
                b[f] = c(e[f])
        }
        return a
    }
    function Tc(a, b, c, d, e, f) {
        if (null != a) {
            if (Array.isArray(a))
                a = e && 0 == a.length && Ec(a) & 1 ? void 0 : f && Ec(a) & 2 ? a : Uc(a, b, c, void 0 !== d, e, f);
            else if (Mc(a)) {
                const g = {};
                for (let k in a)
                    g[k] = Tc(a[k], b, c, d, e, f);
                a = g
            } else
                a = b(a, d);
            return a
        }
    }
    function Uc(a, b, c, d, e, f) {
        const g = d || c ? Ec(a) : 0;
        d = d ? !!(g & 32) : void 0;
        a = Array.prototype.slice.call(a);
        for (let k = 0; k < a.length; k++)
            a[k] = Tc(a[k], b, c, d, e, f);
        c && c(g, a);
        return a
    }
    function Vc(a) {
        return a.Rc === Lc ? a.toJSON() : Rc(a)
    }
    ;function Wc(a, b, c=Jc) {
        if (null != a) {
            if (zc && a instanceof Uint8Array)
                return b ? a : new Uint8Array(a);
            if (Array.isArray(a)) {
                var d = Ec(a);
                if (d & 2)
                    return a;
                b && (b = 0 === d || !!(d & 32) && !(d & 64 || !(d & 16)));
                return b ? (Fc(a, (d | 34) & -12293),
                a) : Uc(a, Wc, d & 4 ? Jc : c, !0, !1, !0)
            }
            a.Rc === Lc && (c = a.ma,
            d = Gc(c),
            a = d & 2 ? a : Qc(a.constructor, Xc(c, d, !0)));
            return a
        }
    }
    function Xc(a, b, c) {
        const d = c || b & 2 ? Jc : Ic
          , e = !!(b & 32);
        a = Sc(a, b, f=>Wc(f, e, d));
        Cc(a, 32 | (c ? 2 : 0));
        return a
    }
    ;Object.freeze({});
    function Yc(a, b, c, d) {
        if (-1 === c)
            return null;
        if (c >= Kc(b)) {
            if (b & 256)
                return a[a.length - 1][c]
        } else {
            var e = a.length;
            if (d && b & 256 && (d = a[e - 1][c],
            null != d))
                return d;
            b = c + (+!!(b & 512) - 1);
            if (b < e)
                return a[b]
        }
    }
    function Zc(a, b, c, d, e) {
        var f = Kc(b);
        if (c >= f || e) {
            e = b;
            if (b & 256)
                f = a[a.length - 1];
            else {
                if (null == d)
                    return;
                f = a[f + (+!!(b & 512) - 1)] = {};
                e |= 256
            }
            f[c] = d;
            e !== b && Fc(a, e)
        } else
            a[c + (+!!(b & 512) - 1)] = d,
            b & 256 && (a = a[a.length - 1],
            c in a && delete a[c])
    }
    function C(a, b) {
        a = a.ma;
        b = Yc(a, Gc(a), b);
        return (null == b ? b : "boolean" === typeof b || "number" === typeof b ? !!b : void 0) ?? !1
    }
    function $c(a, b, c) {
        if (null != c) {
            if ("boolean" !== typeof c)
                throw Error(`Expected boolean but got ${ka(c)}: ${c}`);
            c = !!c
        }
        const d = a.ma;
        let e = Gc(d);
        if (e & 2)
            throw Error();
        Zc(d, e, b, !1 === c ? void 0 : c);
        return a
    }
    ;var bd = class {
        constructor(a) {
            a: {
                null == a && (a = Pc);
                Pc = void 0;
                if (null == a) {
                    var b = 96;
                    a = []
                } else {
                    if (!Array.isArray(a))
                        throw Error();
                    b = Ec(a);
                    if (b & 64)
                        break a;
                    var c = a;
                    b |= 64;
                    var d = c.length;
                    if (d) {
                        var e = d - 1;
                        d = c[e];
                        if (Mc(d)) {
                            b |= 256;
                            const f = +!!(b & 512) - 1;
                            e -= f;
                            if (1024 <= e) {
                                e = 1023 + f;
                                const g = c.length;
                                for (let k = e; k < g; k++) {
                                    const q = c[k];
                                    null != q && q !== d && (d[k - f] = q)
                                }
                                c.length = e + 1;
                                c[e] = d;
                                e = 1023
                            }
                            b = b & -16760833 | (e & 1023) << 14
                        }
                    }
                }
                Fc(a, b)
            }
            this.ma = a
        }
        toJSON() {
            var a = Uc(this.ma, Vc, void 0, void 0, !1, !1);
            return ad(this, a, !0)
        }
        clone() {
            const a = this.ma;
            return Qc(this.constructor, Xc(a, Gc(a), !1))
        }
    }
    ;
    bd.prototype.Rc = Lc;
    bd.prototype.toString = function() {
        return ad(this, this.ma, !1).toString()
    }
    ;
    function ad(a, b, c) {
        var d = a.constructor.oj
          , e = Kc(Gc(c ? a.ma : b))
          , f = !1;
        if (d) {
            if (!c) {
                b = Array.prototype.slice.call(b);
                var g;
                if (b.length && Mc(g = b[b.length - 1]))
                    for (f = 0; f < d.length; f++)
                        if (d[f] >= e) {
                            Object.assign(b[b.length - 1] = {}, g);
                            break
                        }
                f = !0
            }
            e = b;
            c = !c;
            g = Gc(a.ma);
            a = Kc(g);
            g = +!!(g & 512) - 1;
            var k;
            for (let N = 0; N < d.length; N++) {
                var q = d[N];
                if (q < a) {
                    q += g;
                    var p = e[q];
                    null == p ? e[q] = c ? Nc : Hc() : c && p !== Nc && Dc(p)
                } else {
                    if (!k) {
                        var w = void 0;
                        e.length && Mc(w = e[e.length - 1]) ? k = w : e.push(k = {})
                    }
                    p = k[q];
                    null == k[q] ? k[q] = c ? Nc : Hc() : c && p !== Nc && Dc(p)
                }
            }
        }
        d = b.length;
        if (!d)
            return b;
        let u, z;
        if (Mc(k = b[d - 1])) {
            a: {
                var H = k;
                w = {};
                e = !1;
                for (let N in H)
                    c = H[N],
                    Array.isArray(c) && c != c && (e = !0),
                    null != c ? w[N] = c : e = !0;
                if (e) {
                    for (let N in w) {
                        H = w;
                        break a
                    }
                    H = null
                }
            }
            H != k && (u = !0);
            d--
        }
        for (; 0 < d; d--) {
            k = b[d - 1];
            if (null != k)
                break;
            z = !0
        }
        if (!u && !z)
            return b;
        var W;
        f ? W = b : W = Array.prototype.slice.call(b, 0, d);
        b = W;
        f && (b.length = d);
        H && b.push(H);
        return b
    }
    ;function cd(a) {
        dd();
        ed = ()=>"function" === typeof a ? a() : a
    }
    function dd() {
        var a = !ed;
        const b = fd();
        if (!a)
            throw Error(b && b() || String(a));
    }
    function gd(a) {
        var b = fd();
        if (null === a || void 0 === a)
            throw b = b ? b() + "\n" : "",
            Error(b + String(a));
    }
    let ed = void 0;
    function fd() {
        const a = ed;
        ed = void 0;
        return a
    }
    ;function hd() {
        var a = id();
        return $c(a, 7, !0)
    }
    function id() {
        var a = new jd;
        a = $c(a, 5, !0);
        a = $c(a, 2, !0);
        a = $c(a, 4, !1);
        a = $c(a, 8, !0);
        return $c(a, 9, !0)
    }
    var jd = class extends bd {
        getEnableSsEngine() {
            return C(this, 2)
        }
        getEnableAwr() {
            return C(this, 3)
        }
        getAlohaAutoGaRollout() {
            return C(this, 5)
        }
        getEnableConfigurator() {
            return C(this, 6)
        }
        getEnableMweb() {
            return C(this, 7)
        }
        getEnableCtlConsentCheckbox() {
            return C(this, 8)
        }
        getEnableIframe() {
            return C(this, 9)
        }
        getEnableScreenshotNudge() {
            return C(this, 10)
        }
        getEnableWebStartupConfigEndpoint() {
            return C(this, 11)
        }
        getEnableJunkNudge() {
            return C(this, 12)
        }
        getEnableConfiguratorLocale() {
            return C(this, 13)
        }
        getEnableTinyNoPointer() {
            return C(this, 14)
        }
        getEnableSupportSessionLogging() {
            return C(this, 15)
        }
        getEnableFileUploadForScreenshot() {
            return C(this, 16)
        }
        getEnableDirectDeflectionForSingleCategory() {
            return C(this, 17)
        }
        getEnableImageSanitization() {
            return C(this, 18)
        }
        getEnableAlohaBinarySplit() {
            return C(this, 19)
        }
        getEnableDbFeedbackIntents() {
            return C(this, 20)
        }
        getEnableMarkMandatoryFieldsWithRequired() {
            return C(this, 21)
        }
        getEnableFeedbackCategoryCustomUi() {
            return C(this, 22)
        }
        getEnableRealtimeCtl() {
            return C(this, 23)
        }
    }
    ;
    var kd = class extends bd {
    }
    ;
    function ld(a) {
        return md.some(b=>b.test(a))
    }
    const md = [/https:\/\/sandbox\.google\.com\/tools\/feedback/, /https:\/\/feedback-frontend-qual[a-z0-9.]*\.google\.com\/inapp/, /https:\/\/feedback-frontend-qual[a-z0-9.]*\.google\.com\/tools\/feedback/, /https:\/\/.*\.googleusercontent\.com\/inapp/];
    const nd = "af;am;ar-EG;ar-JO;ar-MA;ar-SA;ar-XB;ar;az;be;bg;bn;bs;ca;cs;cy;da;de-AT;de-CH;de;el;en;en-GB;en-AU;en-CA;en-IE;en-IN;en-NZ;en-SG;en-XA;en-XC;en-ZA;es;es-419;es-AR;es-BO;es-CL;es-CO;es-CR;es-DO;es-EC;es-GT;es-HN;es-MX;es-NI;es-PA;es-PE;es-PR;es-PY;es-SV;es-US;es-UY;es-VE;et;eu;fa;fi;fil;fr-CA;fr-CH;fr;gl;gsw;gu;he;hi;hr;hu;hy;id;in;is;it;iw;ja;ka;kk;km;kn;ko;ky;ln;lo;lt;lv;mk;ml;mn;mo;mr;ms;my;nb;ne;nl;no;pa;pl;pt;pt-BR;pt-PT;ro;ru;si;sk;sl;sq;sr-Latn;sr;sv;sw;ta;te;th;tl;tr;uk ; ur ; uz ; vi ; zh;zh-CN;zh-HK;zh-TW;zu".split(";");
    function od(a, b) {
        var c = a.formContent?.locale;
        c = (c && nd.includes(c) ? a.formContent?.locale : "en").replaceAll("-", "_").toLowerCase();
        a = a.initializationData?.useNightlyRelease ? "nightly" : "live";
        return b?.getEnableAlohaBinarySplit?.() ? qc`https://www.gstatic.com/uservoice/feedback/client/web/${a}/main_light_binary.js` : qc`https://www.gstatic.com/uservoice/feedback/client/web/${a}/main_binary__${c}.js`
    }
    ;let pd, qd;
    function rd(a, b, c, d) {
        if (pd)
            return pd;
        const e = od(a, d);
        return pd = b.feedbackV2GlobalObject ? Promise.resolve(b.feedbackV2GlobalObject) : new Promise((f,g)=>{
            const k = $b(document, "SCRIPT");
            kc(k, e);
            k.onload = ()=>{
                b.feedbackV2GlobalObject ? f(b.feedbackV2GlobalObject) : g("feedbackV2GlobalObject not found on window.")
            }
            ;
            k.onerror = ()=>{
                g(`Feedback binary script tag failed to load: ${e.toString()}`)
            }
            ;
            c.body.appendChild(k)
        }
        )
    }
    function sd(a, b, c, d) {
        if (qd)
            return qd;
        const e = od(a, d);
        return qd = b.feedbackV2GlobalObject ? Promise.resolve(b.feedbackV2GlobalObject) : new Promise((f,g)=>{
            const k = $b(document, "SCRIPT");
            kc(k, e);
            k.onload = ()=>{
                b.feedbackV2GlobalObject ? f(b.feedbackV2GlobalObject) : g("feedbackV2GlobalObject not found on window.")
            }
            ;
            k.onerror = ()=>{
                g(`Feedback binary script tag failed to load: ${e.toString()}`)
            }
            ;
            c.body.appendChild(k)
        }
        )
    }
    async function td(a, b, c, d) {
        const e = Date.now();
        a = await (await rd(a, c, d, b)).initializeFeedbackClientAsync(a, e, b);
        a.initiateAloha();
        return a
    }
    async function vd(a, b, c, d) {
        const e = Date.now();
        a = await (await sd(a, c, d.document, b)).initializeFeedbackClientAsync(a, e, b, d);
        a.initiateAloha();
        return a
    }
    async function wd(a, b, c) {
        const d = c || n;
        if (b?.getEnableAlohaBinarySplit?.()) {
            if (d.isFormOpened)
                throw a = Error("Form is either loading or already opened"),
                a.name = "DuplicateFormError",
                a;
            d.isFormOpened = !0;
            a.callbacks = a.callbacks || {};
            const e = a.callbacks.onClose || (()=>{}
            );
            a.callbacks.onClose = f=>{
                d.isFormOpened = !1;
                e(f)
            }
            ;
            try {
                return vd(a, b, d, d)
            } catch (f) {
                throw d.isFormOpened = !1,
                f;
            }
        } else {
            if (d.isFormOpened)
                throw a = Error("Form is either loading or already opened"),
                a.name = "DuplicateFormError",
                a;
            d.isFormOpened = !0;
            a.callbacks = a.callbacks || {};
            const e = a.callbacks.onClose || (()=>{}
            );
            a.callbacks.onClose = f=>{
                d.isFormOpened = !1;
                e(f)
            }
            ;
            try {
                return td(a, b, d, d.document)
            } catch (f) {
                throw d.isFormOpened = !1,
                f;
            }
        }
    }
    ;function xd() {
        this.l = this.l;
        this.o = this.o
    }
    xd.prototype.l = !1;
    xd.prototype.jb = function() {
        if (this.o)
            for (; this.o.length; )
                this.o.shift()()
    }
    ;
    function yd(a, b) {
        this.type = a;
        this.g = this.target = b;
        this.defaultPrevented = !1
    }
    yd.prototype.h = function() {
        this.defaultPrevented = !0
    }
    ;
    var zd = function() {
        if (!n.addEventListener || !Object.defineProperty)
            return !1;
        var a = !1
          , b = Object.defineProperty({}, "passive", {
            get: function() {
                a = !0
            }
        });
        try {
            const c = ()=>{}
            ;
            n.addEventListener("test", c, b);
            n.removeEventListener("test", c, b)
        } catch (c) {}
        return a
    }();
    function Ad(a, b) {
        yd.call(this, a ? a.type : "");
        this.relatedTarget = this.g = this.target = null;
        this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
        this.key = "";
        this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
        this.state = null;
        this.pointerId = 0;
        this.pointerType = "";
        this.i = null;
        a && this.init(a, b)
    }
    qa(Ad, yd);
    var Bd = {
        2: "touch",
        3: "pen",
        4: "mouse"
    };
    Ad.prototype.init = function(a, b) {
        var c = this.type = a.type
          , d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
        this.target = a.target || a.srcElement;
        this.g = b;
        if (b = a.relatedTarget) {
            if (Jb) {
                a: {
                    try {
                        Eb(b.nodeName);
                        var e = !0;
                        break a
                    } catch (f) {}
                    e = !1
                }
                e || (b = null)
            }
        } else
            "mouseover" == c ? b = a.fromElement : "mouseout" == c && (b = a.toElement);
        this.relatedTarget = b;
        d ? (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX,
        this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY,
        this.screenX = d.screenX || 0,
        this.screenY = d.screenY || 0) : (this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX,
        this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY,
        this.screenX = a.screenX || 0,
        this.screenY = a.screenY || 0);
        this.button = a.button;
        this.key = a.key || "";
        this.ctrlKey = a.ctrlKey;
        this.altKey = a.altKey;
        this.shiftKey = a.shiftKey;
        this.metaKey = a.metaKey;
        this.pointerId = a.pointerId || 0;
        this.pointerType = "string" === typeof a.pointerType ? a.pointerType : Bd[a.pointerType] || "";
        this.state = a.state;
        this.i = a;
        a.defaultPrevented && Ad.dc.h.call(this)
    }
    ;
    Ad.prototype.h = function() {
        Ad.dc.h.call(this);
        var a = this.i;
        a.preventDefault ? a.preventDefault() : a.returnValue = !1
    }
    ;
    var Cd = "closure_listenable_" + (1E6 * Math.random() | 0);
    var Dd = 0;
    function Ed(a, b, c, d, e) {
        this.listener = a;
        this.proxy = null;
        this.src = b;
        this.type = c;
        this.capture = !!d;
        this.Qb = e;
        this.key = ++Dd;
        this.za = this.Ib = !1
    }
    function Fd(a) {
        a.za = !0;
        a.listener = null;
        a.proxy = null;
        a.src = null;
        a.Qb = null
    }
    ;function Gd(a) {
        this.src = a;
        this.g = {};
        this.h = 0
    }
    Gd.prototype.add = function(a, b, c, d, e) {
        var f = a.toString();
        a = this.g[f];
        a || (a = this.g[f] = [],
        this.h++);
        var g = Hd(a, b, d, e);
        -1 < g ? (b = a[g],
        c || (b.Ib = !1)) : (b = new Ed(b,this.src,f,!!d,e),
        b.Ib = c,
        a.push(b));
        return b
    }
    ;
    function Id(a, b) {
        var c = b.type;
        c in a.g && xa(a.g[c], b) && (Fd(b),
        0 == a.g[c].length && (delete a.g[c],
        a.h--))
    }
    function Hd(a, b, c, d) {
        for (var e = 0; e < a.length; ++e) {
            var f = a[e];
            if (!f.za && f.listener == b && f.capture == !!c && f.Qb == d)
                return e
        }
        return -1
    }
    ;var Jd = "closure_lm_" + (1E6 * Math.random() | 0)
      , Kd = {}
      , Ld = 0;
    function Md(a, b, c, d, e) {
        if (d && d.once)
            Nd(a, b, c, d, e);
        else if (Array.isArray(b))
            for (var f = 0; f < b.length; f++)
                Md(a, b[f], c, d, e);
        else
            c = Od(c),
            a && a[Cd] ? a.j.add(String(b), c, !1, ma(d) ? !!d.capture : !!d, e) : Pd(a, b, c, !1, d, e)
    }
    function Pd(a, b, c, d, e, f) {
        if (!b)
            throw Error("Invalid event type");
        var g = ma(e) ? !!e.capture : !!e
          , k = Qd(a);
        k || (a[Jd] = k = new Gd(a));
        c = k.add(b, c, d, g, f);
        if (!c.proxy) {
            d = Rd();
            c.proxy = d;
            d.src = a;
            d.listener = c;
            if (a.addEventListener)
                zd || (e = g),
                void 0 === e && (e = !1),
                a.addEventListener(b.toString(), d, e);
            else if (a.attachEvent)
                a.attachEvent(Sd(b.toString()), d);
            else if (a.addListener && a.removeListener)
                a.addListener(d);
            else
                throw Error("addEventListener and attachEvent are unavailable.");
            Ld++
        }
    }
    function Rd() {
        function a(c) {
            return b.call(a.src, a.listener, c)
        }
        const b = Td;
        return a
    }
    function Nd(a, b, c, d, e) {
        if (Array.isArray(b))
            for (var f = 0; f < b.length; f++)
                Nd(a, b[f], c, d, e);
        else
            c = Od(c),
            a && a[Cd] ? a.j.add(String(b), c, !0, ma(d) ? !!d.capture : !!d, e) : Pd(a, b, c, !0, d, e)
    }
    function Ud(a, b, c, d, e) {
        if (Array.isArray(b))
            for (var f = 0; f < b.length; f++)
                Ud(a, b[f], c, d, e);
        else
            (d = ma(d) ? !!d.capture : !!d,
            c = Od(c),
            a && a[Cd]) ? (a = a.j,
            b = String(b).toString(),
            b in a.g && (f = a.g[b],
            c = Hd(f, c, d, e),
            -1 < c && (Fd(f[c]),
            Array.prototype.splice.call(f, c, 1),
            0 == f.length && (delete a.g[b],
            a.h--)))) : a && (a = Qd(a)) && (b = a.g[b.toString()],
            a = -1,
            b && (a = Hd(b, c, d, e)),
            (c = -1 < a ? b[a] : null) && Vd(c))
    }
    function Vd(a) {
        if ("number" !== typeof a && a && !a.za) {
            var b = a.src;
            if (b && b[Cd])
                Id(b.j, a);
            else {
                var c = a.type
                  , d = a.proxy;
                b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent ? b.detachEvent(Sd(c), d) : b.addListener && b.removeListener && b.removeListener(d);
                Ld--;
                (c = Qd(b)) ? (Id(c, a),
                0 == c.h && (c.src = null,
                b[Jd] = null)) : Fd(a)
            }
        }
    }
    function Sd(a) {
        return a in Kd ? Kd[a] : Kd[a] = "on" + a
    }
    function Td(a, b) {
        if (a.za)
            a = !0;
        else {
            b = new Ad(b,this);
            var c = a.listener
              , d = a.Qb || a.src;
            a.Ib && Vd(a);
            a = c.call(d, b)
        }
        return a
    }
    function Qd(a) {
        a = a[Jd];
        return a instanceof Gd ? a : null
    }
    var Wd = "__closure_events_fn_" + (1E9 * Math.random() >>> 0);
    function Od(a) {
        if ("function" === typeof a)
            return a;
        a[Wd] || (a[Wd] = function(b) {
            return a.handleEvent(b)
        }
        );
        return a[Wd]
    }
    ;function Xd() {
        xd.call(this);
        this.j = new Gd(this);
        this.oc = this;
        this.U = null
    }
    qa(Xd, xd);
    Xd.prototype[Cd] = !0;
    Xd.prototype.addEventListener = function(a, b, c, d) {
        Md(this, a, b, c, d)
    }
    ;
    Xd.prototype.removeEventListener = function(a, b, c, d) {
        Ud(this, a, b, c, d)
    }
    ;
    Xd.prototype.dispatchEvent = function(a) {
        var b, c = this.U;
        if (c)
            for (b = []; c; c = c.U)
                b.push(c);
        c = this.oc;
        var d = a.type || a;
        if ("string" === typeof a)
            a = new yd(a,c);
        else if (a instanceof yd)
            a.target = a.target || c;
        else {
            var e = a;
            a = new yd(d,c);
            Da(a, e)
        }
        e = !0;
        if (b)
            for (var f = b.length - 1; 0 <= f; f--) {
                var g = a.g = b[f];
                e = Yd(g, d, !0, a) && e
            }
        g = a.g = c;
        e = Yd(g, d, !0, a) && e;
        e = Yd(g, d, !1, a) && e;
        if (b)
            for (f = 0; f < b.length; f++)
                g = a.g = b[f],
                e = Yd(g, d, !1, a) && e;
        return e
    }
    ;
    Xd.prototype.jb = function() {
        Xd.dc.jb.call(this);
        if (this.j) {
            var a = this.j, b = 0, c;
            for (c in a.g) {
                for (var d = a.g[c], e = 0; e < d.length; e++)
                    ++b,
                    Fd(d[e]);
                delete a.g[c];
                a.h--
            }
        }
        this.U = null
    }
    ;
    function Yd(a, b, c, d) {
        b = a.j.g[String(b)];
        if (!b)
            return !0;
        b = b.concat();
        for (var e = !0, f = 0; f < b.length; ++f) {
            var g = b[f];
            if (g && !g.za && g.capture == c) {
                var k = g.listener
                  , q = g.Qb || g.src;
                g.Ib && Id(a.j, g);
                e = !1 !== k.call(q, d) && e
            }
        }
        return e && !d.defaultPrevented
    }
    ;function Zd(a) {
        try {
            return n.JSON.parse(a)
        } catch (b) {}
        a = String(a);
        if (/^\s*$/.test(a) ? 0 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/(?:"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)[\s\u2028\u2029]*(?=:|,|]|}|$)/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, "")))
            try {
                return eval("(" + a + ")")
            } catch (b) {}
        throw Error("Invalid JSON string: " + a);
    }
    ;function $d() {}
    $d.prototype.g = null;
    function ae(a) {
        var b;
        (b = a.g) || (b = {},
        be(a) && (b[0] = !0,
        b[1] = !0),
        b = a.g = b);
        return b
    }
    ;var ce;
    function de() {}
    qa(de, $d);
    function ee(a) {
        return (a = be(a)) ? new ActiveXObject(a) : new XMLHttpRequest
    }
    function be(a) {
        if (!a.h && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
            const b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];
            for (let c = 0; c < b.length; c++) {
                const d = b[c];
                try {
                    return new ActiveXObject(d),
                    a.h = d
                } catch (e) {}
            }
            throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
        }
        return a.h
    }
    ce = new de;
    function fe(a, b, c) {
        if ("function" === typeof a)
            c && (a = pa(a, c));
        else if (a && "function" == typeof a.handleEvent)
            a = pa(a.handleEvent, a);
        else
            throw Error("Invalid listener argument");
        return 2147483647 < Number(b) ? -1 : n.setTimeout(a, b || 0)
    }
    ;var ge = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");
    function he(a, b) {
        if (a) {
            a = a.split("&");
            for (var c = 0; c < a.length; c++) {
                var d = a[c].indexOf("=")
                  , e = null;
                if (0 <= d) {
                    var f = a[c].substring(0, d);
                    e = a[c].substring(d + 1)
                } else
                    f = a[c];
                b(f, e ? decodeURIComponent(e.replace(/\+/g, " ")) : "")
            }
        }
    }
    ;function ie(a) {
        Xd.call(this);
        this.headers = new Map;
        this.I = a || null;
        this.h = !1;
        this.G = this.g = null;
        this.S = "";
        this.i = this.R = this.m = this.N = !1;
        this.v = 0;
        this.F = null;
        this.Bb = "";
        this.ca = this.va = !1
    }
    qa(ie, Xd);
    var je = /^https?$/i
      , ke = ["POST", "PUT"]
      , le = [];
    function me(a, b, c, d, e, f) {
        const g = new ie;
        le.push(g);
        b && g.j.add("complete", b, !1, void 0, void 0);
        g.j.add("ready", g.Zf, !0, void 0, void 0);
        f && (g.v = Math.max(0, f));
        g.va = !0;
        ne(g, a, c, d, e)
    }
    m = ie.prototype;
    m.Zf = function() {
        this.l || (this.l = !0,
        this.jb());
        xa(le, this)
    }
    ;
    function ne(a, b, c, d, e) {
        if (a.g)
            throw Error("[goog.net.XhrIo] Object is active with another request=" + a.S + "; newUri=" + b);
        c = c ? c.toUpperCase() : "GET";
        a.S = b;
        a.N = !1;
        a.h = !0;
        a.g = a.I ? ee(a.I) : ee(ce);
        a.G = a.I ? ae(a.I) : ae(ce);
        a.g.onreadystatechange = pa(a.Ke, a);
        try {
            a.R = !0,
            a.g.open(c, String(b), !0),
            a.R = !1
        } catch (g) {
            oe(a);
            return
        }
        b = d || "";
        d = new Map(a.headers);
        if (e)
            if (Object.getPrototypeOf(e) === Object.prototype)
                for (var f in e)
                    d.set(f, e[f]);
            else if ("function" === typeof e.keys && "function" === typeof e.get)
                for (const g of e.keys())
                    d.set(g, e.get(g));
            else
                throw Error("Unknown input type for opt_headers: " + String(e));
        e = Array.from(d.keys()).find(g=>"content-type" == g.toLowerCase());
        f = n.FormData && b instanceof n.FormData;
        !(0 <= va(ke, c)) || e || f || d.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        for (const [g,k] of d)
            a.g.setRequestHeader(g, k);
        a.Bb && (a.g.responseType = a.Bb);
        "withCredentials"in a.g && a.g.withCredentials !== a.va && (a.g.withCredentials = a.va);
        try {
            pe(a),
            0 < a.v && (a.ca = qe(a.g),
            a.ca ? (a.g.timeout = a.v,
            a.g.ontimeout = pa(a.df, a)) : a.F = fe(a.df, a.v, a)),
            a.m = !0,
            a.g.send(b),
            a.m = !1
        } catch (g) {
            oe(a)
        }
    }
    function qe(a) {
        return Hb && "number" === typeof a.timeout && void 0 !== a.ontimeout
    }
    m.df = function() {
        "undefined" != typeof fa && this.g && (this.dispatchEvent("timeout"),
        this.abort(8))
    }
    ;
    function oe(a) {
        a.h = !1;
        a.g && (a.i = !0,
        a.g.abort(),
        a.i = !1);
        re(a);
        se(a)
    }
    function re(a) {
        a.N || (a.N = !0,
        a.dispatchEvent("complete"),
        a.dispatchEvent("error"))
    }
    m.abort = function() {
        this.g && this.h && (this.h = !1,
        this.i = !0,
        this.g.abort(),
        this.i = !1,
        this.dispatchEvent("complete"),
        this.dispatchEvent("abort"),
        se(this))
    }
    ;
    m.jb = function() {
        this.g && (this.h && (this.h = !1,
        this.i = !0,
        this.g.abort(),
        this.i = !1),
        se(this, !0));
        ie.dc.jb.call(this)
    }
    ;
    m.Ke = function() {
        this.l || (this.R || this.m || this.i ? te(this) : this.Sg())
    }
    ;
    m.Sg = function() {
        te(this)
    }
    ;
    function te(a) {
        if (a.h && "undefined" != typeof fa && (!a.G[1] || 4 != (a.g ? a.g.readyState : 0) || 2 != ue(a)))
            if (a.m && 4 == (a.g ? a.g.readyState : 0))
                fe(a.Ke, 0, a);
            else if (a.dispatchEvent("readystatechange"),
            4 == (a.g ? a.g.readyState : 0)) {
                a.h = !1;
                try {
                    ve(a) ? (a.dispatchEvent("complete"),
                    a.dispatchEvent("success")) : re(a)
                } finally {
                    se(a)
                }
            }
    }
    function se(a, b) {
        if (a.g) {
            pe(a);
            const c = a.g
              , d = a.G[0] ? ()=>{}
            : null;
            a.g = null;
            a.G = null;
            b || a.dispatchEvent("ready");
            try {
                c.onreadystatechange = d
            } catch (e) {}
        }
    }
    function pe(a) {
        a.g && a.ca && (a.g.ontimeout = null);
        a.F && (n.clearTimeout(a.F),
        a.F = null)
    }
    m.isActive = function() {
        return !!this.g
    }
    ;
    function ve(a) {
        var b = ue(a);
        a: switch (b) {
        case 200:
        case 201:
        case 202:
        case 204:
        case 206:
        case 304:
        case 1223:
            var c = !0;
            break a;
        default:
            c = !1
        }
        if (!c) {
            if (b = 0 === b)
                a = String(a.S).match(ge)[1] || null,
                !a && n.self && n.self.location && (a = n.self.location.protocol.slice(0, -1)),
                b = !je.test(a ? a.toLowerCase() : "");
            c = b
        }
        return c
    }
    function ue(a) {
        try {
            return 2 < (a.g ? a.g.readyState : 0) ? a.g.status : -1
        } catch (b) {
            return -1
        }
    }
    ;async function we(a, b) {
        return new Promise(c=>{
            const d = xe(b ?? "") + "/aloha_form_properties?productId=" + a;
            me(d, e=>{
                const f = e.target;
                e = null;
                try {
                    var g = JSON
                      , k = g.stringify;
                    if (f.g) {
                        var q = f.g.responseText;
                        0 == q.indexOf(")]}'\n") && (q = q.substring(5));
                        b: {
                            if (n.JSON)
                                try {
                                    var p = n.JSON.parse(q);
                                    break b
                                } catch (z) {}
                            p = Zd(q)
                        }
                    } else
                        p = void 0;
                    var w = k.call(g, p);
                    if (null == w || "" == w)
                        e = new kd;
                    else {
                        var u = JSON.parse(w);
                        if (!Array.isArray(u))
                            throw Error(void 0);
                        Cc(u, 32);
                        e = Qc(kd, u)
                    }
                } catch (z) {
                    k = new kd;
                    p = hd();
                    p = $c(p, 10, !0);
                    p = $c(p, 12, !0);
                    p = $c(p, 13, !1);
                    p = $c(p, 14, !0);
                    p = $c(p, 15, !0);
                    p = $c(p, 20, !1);
                    null == p && (p = void 0);
                    w = k.ma;
                    u = Gc(w);
                    if (u & 2)
                        throw Error();
                    Zc(w, u, 1, p);
                    e = k
                }
                c(e)
            }
            , "GET", "", {}, 2E3)
        }
        )
    }
    function xe(a) {
        return ld(a) ? a : "https://www.google.com/tools/feedback"
    }
    ;function ye(a, b, c) {
        a.timeOfStartCall = (new Date).getTime();
        var d = c || n;
        const e = d.document;
        var f = a.nonce || Tb("script[nonce]", d);
        f && !a.nonce && (a.nonce = f);
        if ("help" == a.flow) {
            var g = ja("document.location.href", d);
            !a.helpCenterContext && g && (a.helpCenterContext = g.substring(0, 1200));
            g = !0;
            if (b && JSON && JSON.stringify) {
                const k = JSON.stringify(b);
                (g = 1200 >= k.length) && (a.psdJson = k)
            }
            g || (b = {
                invalidPsd: !0
            })
        }
        b = [a, b, c];
        d.GOOGLE_FEEDBACK_START_ARGUMENTS = b;
        c = a.feedbackServerUri || "//www.google.com/tools/feedback";
        if (g = d.GOOGLE_FEEDBACK_START)
            g.apply(d, b);
        else {
            d = c + "/load.js?";
            for (const k in a)
                b = a[k],
                null == b || ma(b) || (d += encodeURIComponent(k) + "=" + encodeURIComponent(b) + "&");
            a = (e ? new bc(ac(e)) : ua || (ua = new bc)).createElement("SCRIPT");
            f && a.setAttribute("nonce", f);
            f = Qa(d);
            kc(a, f);
            e.body.appendChild(a)
        }
    }
    async function ze(a, b, c, d) {
        const e = c || n
          , f = "DEV" === a.serverEnvironment;
        c = c || n;
        c = a.nonce || Tb("script[nonce]", c);
        a = {
            integrationKeys: {
                productId: a.productId,
                feedbackBucket: a.bucket,
                triggerId: a.triggerId
            },
            callbacks: {
                onClose: a.callback,
                onLoad: a.onLoadCallback
            },
            formContent: {
                locale: a.locale,
                disableScreenshot: a.disableScreenshotting,
                productDisplayName: void 0,
                announcement: void 0,
                issueCategories: void 0,
                includeSeveritySelection: void 0,
                customImageSrc: void 0,
                thankYouMessage: void 0,
                vj: void 0,
                defaultFormInputValues: void 0,
                defaultFormInputValuesString: void 0,
                abuseLink: a.abuseLink,
                additionalDataConsent: a.additionalDataConsent
            },
            initializationData: {
                isLocalServer: f,
                nonce: c,
                useNightlyRelease: f,
                feedbackJsUrl: void 0,
                feedbackCssUrl: void 0,
                feedbackJsUrlSerialized: void 0,
                feedbackCssUrlSerialized: void 0,
                submissionServerUri: a.feedbackServerUri,
                colorScheme: a.colorScheme
            },
            extraData: {
                productVersion: a.productVersion,
                authUser: a.authuser,
                configuratorId: a.configuratorId,
                customZIndex: a.customZIndex,
                tinyNoPointer: a.tinyNoPointer,
                allowNonLoggedInFeedback: a.allowNonLoggedInFeedback,
                enableAnonymousFeedback: a.enableAnonymousFeedback
            }
        };
        b && (b = new Map(Object.entries(b)),
        a.extraData.productSpecificData = b);
        await wd(a, d, e)
    }
    function Ae(a, b, c) {
        try {
            if ("help" === a.flow) {
                const d = a.helpCenterPath.replace(/^\//, "");
                pc(c || window, oc(`https://support.google.com/${d}`, nc) || Xa)
            } else
                "submit" === a.flow ? ye(a, b, c) : we(a.productId, a.feedbackServerUri).then(d=>{
                    var e = d.ma
                      , f = Gc(e)
                      , g = Yc(e, f, 1, !1);
                    var k = jd;
                    if (null != g && "object" === typeof g && g.Rc === Lc)
                        k = g;
                    else if (Array.isArray(g)) {
                        var q = Ec(g);
                        let p = q;
                        0 === p && (p |= f & 32);
                        p |= f & 2;
                        p !== q && Fc(g, p);
                        k = new k(g)
                    } else
                        k = void 0;
                    k !== g && null != k && Zc(e, f, 1, k, !1);
                    e = k;
                    null != e && (d = d.ma,
                    f = Gc(d),
                    f & 2 || (g = e,
                    k = g.ma,
                    q = Gc(k),
                    g = q & 2 ? Qc(g.constructor, Xc(k, q, !1)) : g,
                    g !== e && (e = g,
                    Zc(d, f, 1, e, !1))));
                    d = e;
                    e = !Lb || d?.getEnableMweb();
                    f = !a.tinyNoPointer || d?.getEnableTinyNoPointer();
                    !d || d.getAlohaAutoGaRollout() && e && f ? ze(a, b, c, d) : ye(a, b, c)
                }
                , d=>{
                    d && "DuplicateFormError" !== d.name && ye(a, b, c)
                }
                )
        } catch (d) {
            ze(a, b, c, null)
        }
    }
    ha("userfeedback.api.startFeedback", Ae);
    var Be = ()=>({
        ph: ()=>{
            const a = {};
            try {
                a.logs = vb().join("\n")
            } catch (b) {
                if (b instanceof Error && b.message.includes("goog.debug.LogBuffer.CAPACITY"))
                    throw b;
            } finally {
                Ae({
                    productId: 208,
                    bucket: "7447298383015837904",
                    productVersion: "chrome-apps-calculator_202310280700_RC00_prod",
                    locale: navigator.language
                }, a)
            }
        }
    });
    const Ce = {
        litCalculator: !1,
        complexExpression: !1
    };
    function De(a) {
        var b = (new URL(document.location.href)).searchParams.get(a);
        null === b ? a = Ce[a] : (b = b.toLowerCase(),
        a = ("true" === b ? !0 : "false" === b ? !1 : null) ?? Ce[a]);
        return a
    }
    ;var Ee = "am ar bg bn ca cs da de el en en_gb es es_419 et fa fi fil fr gu hi hr hu id it iw ja kn ko lt lv ml mr ms nl no pl pt_br pt_pt ro ru sk sl sr sv sw ta te th tr uk vi zh_cn zh_tw".split(" ");
    function Fe() {}
    let Ge;
    function He(a, b=()=>{}
    , c=()=>{}
    , d=Fe) {
        if (Ge)
            throw Error("Trying to initialize error_collector twice.");
        Ge = {
            ee: b,
            Uc: c,
            og: a,
            Jg: d
        };
        self.addEventListener("error", Ie);
        self.addEventListener("unhandledrejection", Je)
    }
    function Ke(a) {
        const b = new Set;
        return JSON.stringify(a, function(c, d) {
            if ("object" === typeof d && null !== d) {
                if (b.has(d))
                    return "Maybe Circular";
                b.add(d)
            }
            return d
        })
    }
    function Le(a) {
        if (!Ge)
            throw Error("error_collector not initialized");
        if (null === a || void 0 === a)
            Ge.Uc(a);
        else {
            var b = null
              , c = 0
              , d = 0;
            if (a instanceof Error) {
                b = a;
                var e = b.message
            } else if (a instanceof ErrorEvent) {
                d = d || a.colno;
                c = c || a.lineno;
                e = [];
                a.type && e.push(`ErrorEvent type: "${a.type}"`);
                a.message && e.push(`Message: "${a.message}"`);
                a.filename && e.push(`File: "${a.filename}"`);
                if (a.error instanceof Error) {
                    var f = a.error;
                    e.push(`Error: "${f.message}"`)
                } else
                    a.error ? (a = JSON.stringify(a.error),
                    e.push(`Error: ${a}`)) : f = null === a.error ? null : void 0;
                e = a = e.join("\n");
                if (!e && !f) {
                    Ge.Uc(f);
                    return
                }
                b = f ?? null
            } else if ("string" === typeof a)
                e = a;
            else
                try {
                    e = JSON.stringify(a)
                } catch {
                    e = Ke(a)
                }
            Ge.Jg(e, b);
            e = e.replace(/https?:\/\/[\w\.\-=_?#&$%\/]+/gi, "<url>");
            e = e.replace(/[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}/gi, "<uuid>");
            e = e.replace(/\w{30,}/g, "<long-word>");
            e = e.replace(/-?\b\d+\.\d+/g, "<NN>");
            e = e.replace(/-?\b\d{2,}/g, "<NN>");
            if (b && b.message !== e)
                try {
                    b.message = e
                } catch (g) {}
            try {
                Ge.og.reportError(e, self.location.href, c, d, b)
            } catch (g) {
                Ge.ee(g)
            }
        }
    }
    function Ie(a) {
        Le(a)
    }
    function Je(a) {
        Le(a.reason)
    }
    ;/*

 Copyright 2018 Google LLC

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
    var Me = class {
        constructor() {
            this.promise = new Promise(a=>{
                this.g = a
            }
            )
        }
    }
    ;
    function Ne(a) {
        void a.then(()=>{}
        )
    }
    ;var Oe = class {
        constructor(a, b) {
            this.type = a;
            Object.assign(this, b)
        }
    }
    ;
    var Pe = class {
        constructor() {
            this.l = new Map
        }
        addEventListener(a, b) {
            this.m(a).add(b)
        }
        removeEventListener(a, b) {
            this.m(a).delete(b)
        }
        dispatchEvent(a) {
            a.target = this;
            const b = this.m(a.type);
            for (const c of b)
                c(a)
        }
        m(a) {
            this.l.has(a) || this.l.set(a, new Set);
            return this.l.get(a)
        }
    }
    ;
    function Qe(a) {
        var b = "/sw.js".toString();
        const c = location.href;
        return (new URL(a,c)).href === (new URL(b,c)).href
    }
    ;var Re = class extends Pe {
        constructor() {
            super();
            this.R = {};
            this.U = 0;
            this.F = new Me;
            this.j = new Me;
            this.v = new Me;
            this.S = 0;
            this.o = new Set;
            this.N = ()=>{
                const a = this.h
                  , b = a.installing;
                0 < this.U || !Qe(b.scriptURL) || performance.now() > this.S + 6E4 ? (this.ca = b,
                a.removeEventListener("updatefound", this.N)) : (this.g = b,
                this.o.add(b),
                this.F.g(b));
                ++this.U;
                b.addEventListener("statechange", this.I)
            }
            ;
            this.I = a=>{
                const b = this.h
                  , c = a.target
                  , d = c.state
                  , e = c === this.ca
                  , f = {
                    Cd: c,
                    wg: e,
                    Le: a
                };
                !e && this.G && (f.Fg = !0);
                this.dispatchEvent(new Oe(d,f));
                "installed" === d ? this.yf = self.setTimeout(()=>{
                    "installed" === d && b.waiting === c && this.dispatchEvent(new Oe("waiting",f))
                }
                , 200) : "activating" === d && (clearTimeout(this.yf),
                e || this.j.g(c))
            }
            ;
            this.Bb = a=>{
                const b = this.g
                  , c = b !== navigator.serviceWorker.controller;
                this.dispatchEvent(new Oe("controlling",{
                    wg: c,
                    Le: a,
                    Cd: b,
                    Fg: this.G
                }));
                c || this.v.g(b)
            }
            ;
            this.oc = async a=>{
                const b = a.data
                  , c = a.ports
                  , d = a.source;
                await (void 0 !== this.g ? Promise.resolve(this.g) : this.F.promise);
                this.o.has(d) && this.dispatchEvent(new Oe("message",{
                    data: b,
                    Le: a,
                    ports: c,
                    Cd: d
                }))
            }
            ;
            this.si = "/sw.js";
            this.R = {};
            navigator.serviceWorker.addEventListener("message", this.oc)
        }
        async register({ej: a=!1}={}) {
            a || "complete" === document.readyState || await new Promise(c=>window.addEventListener("load", c));
            this.G = !!navigator.serviceWorker.controller;
            this.i = this.va();
            this.h = await this.xf();
            this.i && (this.g = this.i,
            this.j.g(this.i),
            this.v.g(this.i),
            this.i.addEventListener("statechange", this.I, {
                once: !0
            }));
            const b = this.h.waiting;
            b && Qe(b.scriptURL) && (this.g = b,
            Ne(Promise.resolve().then(()=>{
                this.dispatchEvent(new Oe("waiting",{
                    Cd: b,
                    wj: !0
                }))
            }
            )));
            this.g && (this.F.g(this.g),
            this.o.add(this.g));
            this.h.addEventListener("updatefound", this.N);
            navigator.serviceWorker.addEventListener("controllerchange", this.Bb);
            return this.h
        }
        async update() {
            this.h && await this.h.update()
        }
        get active() {
            return this.j.promise
        }
        va() {
            const a = navigator.serviceWorker.controller;
            if (a && Qe(a.scriptURL))
                return a
        }
        async xf() {
            try {
                const a = await navigator.serviceWorker.register("/sw.js", this.R);
                this.S = performance.now();
                return a
            } catch (a) {
                throw a;
            }
        }
    }
    ;
    function Se(a=window) {
        var b = Number(a.localStorage.getItem("loads-started-Y2FsY3VsYXRvcg") || 0);
        b = isNaN(b) ? 0 : b;
        a.localStorage.setItem("loads-started-Y2FsY3VsYXRvcg", String(b + 1));
        return b
    }
    function Te(a=window) {
        a.localStorage.removeItem("loads-started-Y2FsY3VsYXRvcg")
    }
    async function Ue() {
        var a = window
          , b = Ve(a);
        if (2 <= Se(a) && (b = await b) && b.active)
            for (await b.update(); b.installing; )
                await new Promise(c=>void setTimeout(c, 100));
        a.addEventListener("beforeunload", ()=>void Te(a));
        setTimeout(()=>void Te(a), 3E4)
    }
    async function Ve(a=window) {
        if ("serviceWorker"in a.navigator) {
            a = new Re;
            try {
                var b = await a.register()
            } catch (e) {
                a = e;
                var c = "";
                if ("object" === typeof a && null !== a && "message"in a)
                    c = String(a.message);
                else if ("string" === typeof a)
                    c = a;
                else if ("object" === typeof a && null !== a && "cause"in a)
                    c = `[${a.type}] ${a.cause}`;
                else
                    try {
                        c = JSON.stringify(a)
                    } catch (f) {
                        c = String(a)
                    }
                var d = c;
                a: {
                    if ("object" === typeof a && null !== a) {
                        if ("name"in a && "string" === typeof a.name) {
                            c = a.name;
                            break a
                        }
                        if ("constructor"in a && "function" === typeof a.constructor) {
                            c = a.constructor.name;
                            break a
                        }
                    }
                    c = "Error"
                }
                d = `${"Service Worker registration failed"}: ${(void 0)?.fj && "Error" !== c || "" === d ? `[${c}] ` : ""}${d}`.trim();
                d = (void 0)?.ij?.(d) || Error(d);
                d.name = c;
                a instanceof Error && a.stack && (d.stack += "\n" + a.stack);
                a = d;
                Ge ? Le(a) : (console.error(a),
                console.error(Error("errorCollector.report() invoked without a Spy")),
                c = new ErrorEvent("unhandledrejection"),
                c.reason = a,
                self.dispatchEvent(c))
            }
            return b
        }
    }
    ;var We = class {
        constructor() {
            this.MSG_CONTENT_CHANGED = "Content Changed"
        }
    }
    ;
    function Xe() {
        window.LOCALE_TRANSLATIONS || (window.LOCALE_TRANSLATIONS = new Map);
        return window.LOCALE_TRANSLATIONS
    }
    function Ye(a, b) {
        Xe().set(a, b)
    }
    function Ze(a) {
        return Xe().get(a)
    }
    ;var $e = class {
        constructor() {
            this.MSG_OVERFLOW_MENU = "More options";
            this.MSG_SEND_FEEDBACK = "Send feedback";
            this.MSG_TERMS = "Terms";
            this.MSG_PRIVACY = "Privacy";
            this.MSG_ABOUT = "About";
            this.MSG_LICENSES_DIALOG_TITLE = this.MSG_LICENSES = "Licenses";
            this.OSS_NOTICES_STRINGS = new We;
            this.MSG_CLEAR_BUTTON_TEXT = "AC";
            this.MSG_CLEAR_BUTTON_SPEECH = "all clear";
            this.MSG_PLUS_BUTTON_TEXT = "+";
            this.MSG_PLUS_BUTTON_SPEECH = "plus";
            this.MSG_MINUS_BUTTON_TEXT = "\u2013";
            this.MSG_MINUS_BUTTON_SPEECH = "minus";
            this.MSG_MULTIPLY_BUTTON_TEXT = "\u00d7";
            this.MSG_MULTIPLY_BUTTON_SPEECH = "multiply";
            this.MSG_DIVIDE_BUTTON_TEXT = "\u00f7";
            this.MSG_DIVIDE_BUTTON_SPEECH = "divide";
            this.MSG_POINT_BUTTON_TEXT = ".";
            this.MSG_POINT_BUTTON_SPEECH = "point";
            this.MSG_EQUALS_BUTTON_TEXT = "=";
            this.MSG_EQUALS_BUTTON_SPEECH = "equals";
            this.MSG_BACKSPACE_BUTTON_TEXT = "\u232b";
            this.MSG_BACKSPACE_BUTTON_SPEECH = "backspace";
            this.MSG_ROUND_BUTTON_TEXT = "rnd";
            this.MSG_ROUND_BUTTON_SPEECH = "round";
            this.MSG_FETCH_BUTTON_TEXT = "a";
            this.MSG_FETCH_BUTTON_SPEECH = "fetch from memory";
            this.MSG_STORE_BUTTON_TEXT = "a=";
            this.MSG_STORE_BUTTON_SPEECH = "store in memory";
            this.MSG_E_BUTTON_SPEECH = this.MSG_E_BUTTON_TEXT = "e";
            this.MSG_LN_BUTTON_TEXT = "ln";
            this.MSG_LN_BUTTON_SPEECH = "natural logarithm";
            this.MSG_LOG_BUTTON_TEXT = "log";
            this.MSG_LOG_BUTTON_SPEECH = "log base 10";
            this.MSG_EXP_BUTTON_TEXT = "e\u207f";
            this.MSG_EXP_BUTTON_SPEECH = "e to the power of n";
            this.MSG_INV_BUTTON_TEXT = "1/x";
            this.MSG_INV_BUTTON_SPEECH = "inverse";
            this.MSG_POW_BUTTON_TEXT = "y\u207f";
            this.MSG_POW_BUTTON_SPEECH = "y to the power of n";
            this.MSG_SQROOT_BUTTON_TEXT = "\u221a";
            this.MSG_SQROOT_BUTTON_SPEECH = "square root";
            this.MSG_ROOT_BUTTON_TEXT = "\u207f\u221aY";
            this.MSG_ROOT_BUTTON_SPEECH = "the nth root of y";
            this.MSG_SIGN_BUTTON_TEXT = "+/-";
            this.MSG_SIGN_BUTTON_SPEECH = "negate";
            this.MSG_PERCENT_BUTTON_TEXT = "%";
            this.MSG_PERCENT_BUTTON_SPEECH = "percent";
            this.MSG_SQUARE_BUTTON_TEXT = "x\u00b2";
            this.MSG_SQUARE_BUTTON_SPEECH = "x squared";
            this.MSG_PI_BUTTON_SPEECH = this.MSG_PI_BUTTON_TEXT = "\u03c0";
            this.MSG_DEG_BUTTON_TEXT = "Deg";
            this.MSG_DEG_BUTTON_SPEECH = "switch to degrees";
            this.MSG_RAD_BUTTON_TEXT = "Rad";
            this.MSG_RAD_BUTTON_SPEECH = "switch to radians";
            this.MSG_FACT_BUTTON_TEXT = "x!";
            this.MSG_FACT_BUTTON_SPEECH = "factorial";
            this.MSG_SIN_BUTTON_TEXT = "sin";
            this.MSG_SIN_BUTTON_SPEECH = "sine";
            this.MSG_ASIN_BUTTON_TEXT = "asin";
            this.MSG_ASIN_BUTTON_SPEECH = "arcsine";
            this.MSG_MOD_BUTTON_TEXT = "mod";
            this.MSG_MOD_BUTTON_SPEECH = "modulo";
            this.MSG_COS_BUTTON_TEXT = "cos";
            this.MSG_COS_BUTTON_SPEECH = "cosine";
            this.MSG_ACOS_BUTTON_TEXT = "acos";
            this.MSG_ACOS_BUTTON_SPEECH = "arccosine";
            this.MSG_PERM_BUTTON_TEXT = "nPr";
            this.MSG_PERM_BUTTON_SPEECH = "permutation";
            this.MSG_TAN_BUTTON_TEXT = "tan";
            this.MSG_TAN_BUTTON_SPEECH = "tangent";
            this.MSG_ATAN_BUTTON_TEXT = "atan";
            this.MSG_ATAN_BUTTON_SPEECH = "arctangent";
            this.MSG_COMB_BUTTON_TEXT = "nCr";
            this.MSG_COMB_BUTTON_SPEECH = "combination";
            this.MSG_SECONDARY_PANEL_OPENED = "Secondary panel opened";
            this.MSG_SECONDARY_PANEL_CLOSED = "Secondary panel closed";
            this.MSG_TERTIARY_PANEL_OPENED = "Tertiary panel opened";
            this.MSG_TERTIARY_PANEL_CLOSED = "Tertiary panel closed"
        }
    }
    ;
    Ye("en".replace("-", "_").toLowerCase(), new $e);
    var af = "af am ar az be bg bn bs ca cs da de el en en_gb es es_419 et eu fa fi fil fr fr_ca gl gu hi hr hu hy id is it iw ja ka kk km kn ko ky lo lt lv mk ml mn mr ms my ne nl no pa pl pt_br pt_pt ro ru si sk sl sq sr sv sw ta te th tk tr uk ur uz vi zh_cn zh_hk zh_tw zu en_xa ar_xb".split(" ");
    function bf(a, b=af) {
        a = a.replace("-", "_").toLowerCase();
        if (b.includes(a))
            return a;
        a = (a = a.match(/^\w{2,3}([-_]|$)/)) ? a[0].replace(/[_-]/g, "") : "";
        return b.includes(a) ? a : null
    }
    function cf(a, b=af) {
        var c = new URLSearchParams(void 0 !== self.location?.search ? self.location.search : "");
        return (c = c.has("hl") ? bf(c.get("hl"), b) : null) ? c : (a = bf(a, b)) ? a : "en"
    }
    function hf(a=af) {
        var b = self.document?.documentElement.lang;
        b = b ? b : navigator.language;
        b = "he" === b ? "iw" : b;
        return cf("nb" === b ? "no" : b, a)
    }
    ;const jf = new Map;
    async function kf(a) {
        const b = String(a)
          , c = jf.get(b);
        if (c)
            return c;
        a = lf(a);
        jf.set(b, a);
        return a
    }
    async function lf(a) {
        const b = document.createElement("script");
        kc(b, a);
        a = new Promise((d,e)=>{
            b.onerror = e;
            b.onload = ()=>{
                d()
            }
        }
        );
        const c = window.WebComponents;
        c && c.waitFor && c.waitFor(a);
        document.head.appendChild(b);
        try {
            await a
        } finally {
            document.head.removeChild(b)
        }
    }
    ;function mf(a, b) {
        return a.includes("{") ? (encodeURI(b),
        b) : a.split(/(<[^>]*>)/).map(c=>"<" === c[0] ? c : c.replaceAll(/[A-Za-z]+/g, d=>`${"\u200f"}${"\u202e"}${d}${"\u202c"}${"\u200f"}`)).join("")
    }
    async function nf() {
        var a = hf();
        let b = Ze(a);
        if (b)
            return b;
        af.includes(a);
        const c = Na({
            locale: a
        });
        try {
            await kf(c);
            b = Ze(a);
            if (void 0 === b)
                console.error(`File ${Ma(c).toString()} did not register translations for locale ${a}`);
            else if ("ar_xb" === a) {
                const d = Ze("en")
                  , e = new Proxy(b,{
                    get(f, g, k) {
                        f = Reflect.get(f, g, k);
                        if ("string" !== typeof f)
                            return f;
                        if (!/[A-Za-z]/.test(f))
                            return f;
                        g = Reflect.get(d, g, d);
                        g = mf(g, f);
                        f !== g && (encodeURI(f),
                        encodeURI(g));
                        return g
                    }
                });
                Ye(a, e);
                return e
            }
            return b
        } catch (d) {
            d instanceof Event && !0 === d.isTrusted && "type"in d && "error" === d.type ? console.error(`Failed to load ${Ma(c).toString()} in cachingSafeLoad()`) : console.error(d)
        }
    }
    async function of() {
        var a = D;
        const b = await nf();
        return b ? b : a
    }
    ;let D = new $e;
    async function pf() {
        D = await of()
    }
    ;const qf = Math.PI / 180
      , rf = [.9999999999998099, 676.5203681218851, -1259.1392167224028, 771.3234287776531, -176.6150291621406, 12.507343278686905, -.13857109526572012, 9.984369578019572E-6, 1.5056327351493116E-7]
      , sf = {
        vh: "+",
        Hi: "\u2013",
        pi: "\u00d7",
        Th: "\u00f7",
        oi: "mod",
        xi: "y\u207f",
        Ra: "\u207f\u221aY",
        wi: "nPr",
        Qh: "nCr"
    }
      , tf = {
        Di: "sin",
        Rh: "cos",
        Ii: "tan",
        Hh: "asin",
        th: "acos",
        Ih: "atan",
        Fi: "x\u00b2",
        Ei: "\u221a",
        mi: "log",
        Vh: "e\u207f",
        li: "ln",
        ei: "i",
        Xh: "x!",
        vi: "%",
        zi: "rnd"
    }
      , uf = {
        Wh: "e",
        PI: "\u03c0",
        Gi: "a=",
        Yh: "a",
        zf: "+/-",
        Jh: "\u232b",
        Nh: "AC"
    }
      , vf = {
        ri: 0,
        Kh: 1,
        Ki: 2,
        zf: 3,
        REPLACE: 4,
        Uh: "=",
        0: "NUMBER",
        1: "BINARY",
        2: "UNARY",
        3: "NEGATE",
        4: "REPLACE"
    };
    function wf(a) {
        return 1 < a.length ? !1 : !isNaN(Number(a))
    }
    function xf(a) {
        if (.5 > a)
            return Math.PI / (Math.sin(Math.PI * a) * xf(1 - a));
        --a;
        let b = rf[0];
        const c = a + 7.5;
        for (let d = 1; d < rf.length; d++)
            b += rf[d] / (a + d);
        return Math.sqrt(2 * Math.PI) * Math.pow(c, a + .5) * Math.exp(-c) * b
    }
    function yf(a) {
        if (0 > a)
            throw Error("Factorial must be non-negative.");
        if (170 < a)
            throw Error("Computing factorial of number > 170.");
        if (!Number.isInteger(a))
            return xf(a + 1);
        let b = 1;
        for (; 0 < a; )
            b *= a--;
        return b
    }
    function zf(a) {
        var b = Af;
        b.m = b.m.filter(c=>c !== a)
    }
    function Bf(a, b, c) {
        for (const d of a.m)
            d(b, c)
    }
    function Cf(a) {
        Bf(a, !1, !0);
        a.history.push("Not a Number");
        a.h = "0";
        a.g = "0";
        a.buffer = null
    }
    function Df(a, b) {
        let c;
        c = "=" === a.i && a.j ? Number(a.h) : Number(a.g);
        let d = null;
        switch (b) {
        case "e":
            d = Math.E;
            Ef(a, String(Math.E), !0);
            break;
        case "\u03c0":
            d = Math.PI;
            Ef(a, String(Math.PI), !0);
            break;
        case "a=":
            a.l = c;
            d = a.l;
            a.j = "a=";
            a.i = "=";
            null === a.buffer && 0 !== a.history.length ? a.history[a.history.length - 1] = b + " " + String(a.l) : a.history.push(b + " " + String(a.l));
            a.history.push("sep", String(a.l));
            a.buffer = null;
            break;
        case "a":
            Ef(a, String(a.l), !0);
            break;
        case "+/-":
            d = c = -c;
            if (1 === a.i)
                break;
            Ef(a, String(c), !1);
            break;
        case "\u232b":
            a.buffer && 0 < a.buffer.length && (a.g = String(c),
            4 === a.i ? (a.buffer = Ff(a) ? a.buffer.split(" ")[0] : "",
            a.g = "") : Object.values(sf).includes(a.buffer) ? a.buffer = "" : (a.buffer = a.buffer.slice(0, -1).trim(),
            a.g = a.g.slice(0, -1)));
            0 < a.g.length ? d = Number(a.g) : d = null;
            break;
        case "AC":
            a.h = "0";
            a.g = "0";
            a.j = null;
            a.i = null;
            a.history.length = 0;
            a.buffer = null;
            Bf(a, !0, !1);
            break;
        default:
            ic(b)
        }
        return d
    }
    function Gf(a) {
        var b = Number(a.h);
        const c = Number(a.g);
        switch (a.j) {
        case "+":
            b += c;
            break;
        case "\u2013":
            b -= c;
            break;
        case "\u00d7":
            b *= c;
            break;
        case "\u00f7":
            b /= c;
            break;
        case "mod":
            b %= c;
            b = 0 > b * c ? b + c : b;
            break;
        case "y\u207f":
            b = Math.pow(b, c);
            break;
        case "\u207f\u221aY":
            if (0 > c)
                throw Error("Trying to calculate root of negative number.");
            b = Math.pow(c, 1 / b);
            break;
        case "nPr":
            if (b < c)
                throw Error("Invalid permutation, ensure n >= r.");
            b = yf(b) / yf(b - c);
            break;
        case "nCr":
            if (b < c)
                throw Error("Invalid combination, ensure n >= r.");
            b = yf(b) / (yf(c) * yf(b - c));
            break;
        case "sin":
            b = Math.sin("Deg" === a.angleUnitType ? b * qf : b);
            break;
        case "cos":
            b = Math.cos("Deg" === a.angleUnitType ? b * qf : b);
            break;
        case "tan":
            b = Math.tan("Deg" === a.angleUnitType ? b * qf : b);
            break;
        case "asin":
            b = Math.asin(b) * ("Deg" === a.angleUnitType ? 1 / qf : 1);
            break;
        case "acos":
            b = Math.acos(b) * ("Deg" === a.angleUnitType ? 1 / qf : 1);
            break;
        case "atan":
            b = Math.atan(b) * ("Deg" === a.angleUnitType ? 1 / qf : 1);
            break;
        case "x\u00b2":
            b = Math.pow(b, 2);
            break;
        case "\u221a":
            if (0 > b)
                throw Error("Trying to calculate sqroot of negative number.");
            b = Math.pow(b, .5);
            break;
        case "log":
            if (0 > b)
                throw Error("Trying to calculate log of negative number.");
            b = Math.log10(b);
            break;
        case "e\u207f":
            b = Math.pow(Math.E, b);
            break;
        case "ln":
            if (0 > b)
                throw Error("Trying to calculate ln of negative number.");
            b = Math.log(b);
            break;
        case "i":
            b = 1 / b;
            break;
        case "x!":
            b = yf(b);
            break;
        case "%":
            b /= 100;
            break;
        case "rnd":
            b = Math.round(b);
            break;
        case "a=":
            break;
        case null:
            throw Error("Calculate called with null currentOperation.");
        default:
            ic(a.j)
        }
        a.h = String(b);
        a.g = String(c)
    }
    function Ff(a) {
        return a.buffer ? !(wf(a.buffer.charAt(0)) || "-" === a.buffer.charAt(0)) : !1
    }
    function Ef(a, b, c) {
        if (null === a.buffer) {
            if (0 < a.history.length) {
                a.history[a.history.length - 1] = b;
                a.h = b;
                return
            }
            a.buffer = b
        } else
            a.buffer = Ff(a) ? String(a.j) + " " + b : b;
        c && (a.i = 4);
        a.g = b
    }
    const Af = new class {
        constructor() {
            this.g = this.h = "0";
            this.l = 0;
            this.i = this.j = null;
            this.angleUnitType = "Rad";
            this.buffer = null;
            this.history = [];
            this.m = []
        }
        o(a) {
            var b = null;
            if (wf(a) || "." === a)
                null === this.buffer ? (this.g = a,
                this.j = null,
                this.buffer = a) : "" === this.buffer ? this.buffer = this.g = a : (!wf(a) || "0" !== this.buffer.split(" ")[1] && "0" !== this.buffer ? Object.values(sf).includes(this.buffer) && (this.buffer += " ") : this.buffer = this.buffer.slice(0, -1),
                this.g += a,
                this.buffer += a),
                this.i = 0;
            else if (Object.values(sf).includes(a))
                a: {
                    b = null;
                    if (this.buffer && "" !== this.buffer && 1 !== this.i)
                        if (this.history.push(this.buffer),
                        this.j) {
                            this.history.push("sep");
                            try {
                                Gf(this),
                                this.history.push(this.h)
                            } catch (c) {
                                Cf(this);
                                b = null;
                                break a
                            }
                            this.buffer = null;
                            b = Number(this.h)
                        } else
                            this.h = this.g;
                    this.j = this.buffer = a;
                    this.g = "0";
                    this.i = 1
                }
            else if (Object.values(tf).includes(a))
                a: {
                    this.j && 0 !== this.i || (this.h = this.g);
                    1 === this.i ? this.h = "0" : ("=" === this.i || 2 === this.i) && this.history.pop();
                    this.j = a;
                    this.i = 2;
                    this.history.push(a + " " + String(Number(this.h)));
                    this.history.push("sep");
                    try {
                        Gf(this),
                        this.history.push(this.h)
                    } catch (c) {
                        Cf(this);
                        b = null;
                        break a
                    }
                    this.buffer = null;
                    b = Number(this.h)
                }
            else if (Object.values(uf).includes(a))
                b = Df(this, a);
            else if ("Rad" === a)
                this.angleUnitType = "Rad";
            else if ("Deg" === a)
                this.angleUnitType = "Deg";
            else if (Object.values(vf).includes(a)) {
                if ("a=" === this.j)
                    Df(this, this.j);
                else if (this.j) {
                    "=" === this.i ? this.history.push(this.j + " " + this.g) : this.buffer && this.history.push(this.buffer);
                    this.history.push("sep");
                    try {
                        Gf(this),
                        this.history.push(this.h)
                    } catch (c) {
                        return Cf(this),
                        null
                    }
                    this.buffer = null;
                    b = Number(this.h)
                }
                this.i = "="
            }
            Bf(this, !1, !1);
            return b
        }
    }
    ;
    /*

 The MIT License (MIT)

 Copyright (c) 2015 Matthew Crumley

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 Based on ndef.parser, by Raphael Graf(r@undefined.ch)
 http://www.undefined.ch/mparser/index.html

 Ported to JavaScript and modified by Matthew Crumley (email@matthewcrumley.com, http://silentmatt.com/)

 You are free to use and modify this code in anyway you find useful. Please leave this comment in the code
 to acknowledge its original source. If you feel like it, I enjoy hearing about projects that use my code,
 but don't feel like you have to let me know or ask permission.
*/
    var Hf = {};
    function If() {
        function a(h, l) {
            this.type = h;
            this.value = void 0 !== l && null !== l ? l : 0
        }
        function b(h) {
            return new a("IOP1",h)
        }
        function c(h) {
            return new a("IOP2",h)
        }
        function d(h, l, r, v, y) {
            for (var E = [], x = [], G, Ua, df, Q, ef = 0; ef < h.length; ef++)
                if (Q = h[ef],
                G = Q.type,
                "INUMBER" === G)
                    E.push(Q);
                else if ("IVAR" === G && y.hasOwnProperty(Q.value))
                    Q = new a("INUMBER",y[Q.value]),
                    E.push(Q);
                else if ("IOP2" === G && 1 < E.length)
                    Ua = E.pop(),
                    G = E.pop(),
                    Q = r[Q.value],
                    Q = new a("INUMBER",Q(G.value, Ua.value)),
                    E.push(Q);
                else if ("IOP3" === G && 2 < E.length)
                    df = E.pop(),
                    Ua = E.pop(),
                    G = E.pop(),
                    "?" === Q.value ? E.push(G.value ? Ua.value : df.value) : (Q = v[Q.value],
                    Q = new a("INUMBER",Q(G.value, Ua.value, df.value)),
                    E.push(Q));
                else if ("IOP1" === G && 0 < E.length)
                    G = E.pop(),
                    Q = l[Q.value],
                    Q = new a("INUMBER",Q(G.value)),
                    E.push(Q);
                else if ("IEXPR" === G) {
                    for (; 0 < E.length; )
                        x.push(E.shift());
                    x.push(new a("IEXPR",d(Q.value, l, r, v, y)))
                } else if ("IMEMBER" === G && 0 < E.length)
                    G = E.pop(),
                    E.push(new a("INUMBER",G.value[Q.value]));
                else {
                    for (; 0 < E.length; )
                        x.push(E.shift());
                    x.push(Q)
                }
            for (; 0 < E.length; )
                x.push(E.shift());
            return x
        }
        function e(h, l, r) {
            for (var v = [], y = 0; y < h.length; y++) {
                var E = h[y]
                  , x = E.type;
                if ("IVAR" === x && E.value === l)
                    for (E = 0; E < r.aa.length; E++)
                        x = r.aa[E],
                        x = "IOP1" === x.type ? b(x.value) : "IOP2" === x.type ? c(x.value) : "IOP3" === x.type ? new a("IOP3",x.value) : new a(x.type,x.value),
                        v.push(x);
                else
                    "IEXPR" === x ? v.push(new a("IEXPR",e(E.value, l, r))) : v.push(E)
            }
            return v
        }
        function f(h, l, r) {
            for (var v = [], y, E, x, G, Ua = 0; Ua < h.length; Ua++)
                if (G = h[Ua],
                y = G.type,
                "INUMBER" === y)
                    v.push(G.value);
                else if ("IOP2" === y)
                    E = v.pop(),
                    y = v.pop(),
                    G = l.Ha[G.value],
                    v.push(G(y, E));
                else if ("IOP3" === y)
                    x = v.pop(),
                    E = v.pop(),
                    y = v.pop(),
                    "?" === G.value ? v.push(f(y ? E : x, l, r)) : (G = l.Pa[G.value],
                    v.push(G(y, E, x)));
                else if ("IVAR" === y)
                    if (G.value in l.kb)
                        v.push(l.kb[G.value]);
                    else if (y = r[G.value],
                    void 0 !== y)
                        v.push(y);
                    else
                        throw Error("undefined variable: " + G.value);
                else if ("IOP1" === y)
                    y = v.pop(),
                    G = l.Ba[G.value],
                    v.push(G(y));
                else if ("IFUNCALL" === y) {
                    G = G.value;
                    for (y = []; 0 < G--; )
                        y.unshift(v.pop());
                    G = v.pop();
                    if (G.apply && G.call)
                        v.push(G.apply(void 0, y));
                    else
                        throw Error(G + " is not a function");
                } else if ("IEXPR" === y)
                    v.push(G.value);
                else if ("IMEMBER" === y)
                    y = v.pop(),
                    v.push(y[G.value]);
                else
                    throw Error("invalid Expression");
            if (1 < v.length)
                throw Error("invalid Expression (parity)");
            return v[0]
        }
        function g(h, l) {
            for (var r = [], v, y, E, x, G = 0; G < h.length; G++)
                if (x = h[G],
                v = x.type,
                "INUMBER" === v)
                    "number" === typeof x.value && 0 > x.value ? r.push("(" + x.value + ")") : (v = r,
                    y = v.push,
                    x = x.value,
                    x = "string" === typeof x ? JSON.stringify(x).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029") : x,
                    y.call(v, x));
                else if ("IOP2" === v)
                    y = r.pop(),
                    v = r.pop(),
                    x = x.value,
                    l ? "^" === x ? r.push("Math.pow(" + v + ", " + y + ")") : "and" === x ? r.push("(!!" + v + " && !!" + y + ")") : "or" === x ? r.push("(!!" + v + " || !!" + y + ")") : "||" === x ? r.push("(String(" + v + ") + String(" + y + "))") : "==" === x ? r.push("(" + v + " === " + y + ")") : "!=" === x ? r.push("(" + v + " !== " + y + ")") : r.push("(" + v + " " + x + " " + y + ")") : r.push("(" + v + " " + x + " " + y + ")");
                else if ("IOP3" === v)
                    if (E = r.pop(),
                    y = r.pop(),
                    v = r.pop(),
                    x = x.value,
                    "?" === x)
                        r.push("(" + v + " ? " + y + " : " + E + ")");
                    else
                        throw Error("invalid Expression");
                else if ("IVAR" === v)
                    r.push(x.value);
                else if ("IOP1" === v)
                    v = r.pop(),
                    x = x.value,
                    "-" === x || "+" === x ? r.push("(" + x + v + ")") : l ? "not" === x ? r.push("(!" + v + ")") : "!" === x ? r.push("fac(" + v + ")") : r.push(x + "(" + v + ")") : "!" === x ? r.push("(" + v + "!)") : r.push("(" + x + " " + v + ")");
                else if ("IFUNCALL" === v) {
                    x = x.value;
                    for (v = []; 0 < x--; )
                        v.unshift(r.pop());
                    x = r.pop();
                    r.push(x + "(" + v.join(", ") + ")")
                } else if ("IMEMBER" === v)
                    v = r.pop(),
                    r.push(v + "." + x.value);
                else if ("IEXPR" === v)
                    r.push("(" + g(x.value, l) + ")");
                else
                    throw Error("invalid Expression");
            if (1 < r.length)
                throw Error("invalid Expression (parity)");
            return String(r[0])
        }
        function k(h, l) {
            for (var r = 0; r < h.length; r++)
                if (h[r] === l)
                    return !0;
            return !1
        }
        function q(h, l, r) {
            r = r || {};
            for (var v = !!r.withMembers, y = null, E = 0; E < h.length; E++) {
                var x = h[E];
                "IVAR" !== x.type || k(l, x.value) ? "IMEMBER" === x.type && v && null !== y ? y += "." + x.value : "IEXPR" === x.type ? q(x.value, l, r) : null !== y && (k(l, y) || l.push(y),
                y = null) : v ? (null !== y && (k(l, y) || l.push(y)),
                y = x.value) : l.push(x.value)
            }
            null === y || k(l, y) || l.push(y)
        }
        function p(h, l) {
            this.aa = h;
            this.Yb = l;
            this.Ba = l.Ba;
            this.Ha = l.Ha;
            this.Pa = l.Pa;
            this.kb = l.kb
        }
        function w(h, l, r) {
            this.type = h;
            this.value = l;
            this.index = r
        }
        function u(h, l) {
            this.s = 0;
            this.current = null;
            this.Ba = h.Ba;
            this.Ha = h.Ha;
            this.Pa = h.Pa;
            this.Kb = h.Kb;
            this.D = l;
            this.Xe = 0;
            this.tb = null;
            this.options = h.options
        }
        function z(h, l, r) {
            this.Yb = h;
            this.aa = l;
            this.xa = this.current = null;
            this.next();
            this.We = this.tb = null;
            this.allowMemberAccess = !1 !== r.allowMemberAccess
        }
        function H(h, l) {
            return Number(h) + Number(l)
        }
        function W(h, l) {
            return h - l
        }
        function N(h, l) {
            return h * l
        }
        function da(h, l) {
            return h / l
        }
        function Va(h, l) {
            return h % l
        }
        function ud(h, l) {
            return "" + h + l
        }
        function ia(h, l) {
            return h === l
        }
        function km(h, l) {
            return h !== l
        }
        function lm(h, l) {
            return h > l
        }
        function mm(h, l) {
            return h < l
        }
        function nm(h, l) {
            return h >= l
        }
        function om(h, l) {
            return h <= l
        }
        function pm(h, l) {
            return !(!h || !l)
        }
        function qm(h, l) {
            return !(!h && !l)
        }
        function rm(h, l) {
            return k(l, h)
        }
        function sm(h) {
            return (Math.exp(h) - Math.exp(-h)) / 2
        }
        function tm(h) {
            return (Math.exp(h) + Math.exp(-h)) / 2
        }
        function um(h) {
            return Infinity === h ? 1 : -Infinity === h ? -1 : (Math.exp(h) - Math.exp(-h)) / (Math.exp(h) + Math.exp(-h))
        }
        function vm(h) {
            return -Infinity === h ? h : Math.log(h + Math.sqrt(h * h + 1))
        }
        function wm(h) {
            return Math.log(h + Math.sqrt(h * h - 1))
        }
        function xm(h) {
            return Math.log((1 + h) / (1 - h)) / 2
        }
        function Mh(h) {
            return Math.log(h) * Math.LOG10E
        }
        function ym(h) {
            return -h
        }
        function zm(h) {
            return !h
        }
        function Am(h) {
            return 0 > h ? Math.ceil(h) : Math.floor(h)
        }
        function Bm(h) {
            return Math.random() * (h || 1)
        }
        function Nh(h) {
            return ff(h + 1)
        }
        function ff(h) {
            if (isFinite(h) && h === Math.round(h)) {
                if (0 >= h)
                    return isFinite(h) ? Infinity : NaN;
                if (171 < h)
                    return Infinity;
                var l = h - 2;
                for (--h; 1 < l; )
                    h *= l,
                    l--;
                0 === h && (h = 1);
                return h
            }
            if (.5 > h)
                return Math.PI / (Math.sin(Math.PI * h) * ff(1 - h));
            if (171.35 <= h)
                return Infinity;
            if (85 < h) {
                l = h * h;
                var r = l * h;
                var v = r * h
                  , y = v * h;
                return Math.sqrt(2 * Math.PI / h) * Math.pow(h / Math.E, h) * (1 + 1 / (12 * h) + 1 / (288 * l) - 139 / (51840 * r) - 571 / (2488320 * v) + 163879 / (209018880 * y) + 5246819 / (75246796800 * y * h))
            }
            --h;
            l = gf[0];
            for (r = 1; r < gf.length; ++r)
                l += gf[r] / (h + r);
            r = h + 4.7421875 + .5;
            return Math.sqrt(2 * Math.PI) * Math.pow(r, h + .5) * Math.exp(-r) * l
        }
        function Cm(h) {
            return String(h).length
        }
        function Oh() {
            for (var h = 0, l = 0, r = 0; r < arguments.length; r++) {
                var v = Math.abs(arguments[r]);
                if (l < v) {
                    var y = l / v;
                    h = h * y * y + 1;
                    l = v
                } else
                    0 < v ? (y = v / l,
                    h += y * y) : h += v
            }
            return Infinity === l ? Infinity : l * Math.sqrt(h)
        }
        function Ph(h, l, r) {
            return h ? l : r
        }
        function Dm(h, l) {
            if ("undefined" === typeof l || 0 === +l)
                return Math.round(h);
            h = +h;
            l = -+l;
            if (isNaN(h) || "number" !== typeof l || 0 !== l % 1)
                return NaN;
            h = h.toString().split("e");
            h = Math.round(+(h[0] + "e" + (h[1] ? +h[1] - l : -l)));
            h = h.toString().split("e");
            return +(h[0] + "e" + (h[1] ? +h[1] + l : l))
        }
        function Fb(h) {
            this.options = h || {};
            this.Ba = {
                sin: Math.sin,
                cos: Math.cos,
                tan: Math.tan,
                asin: Math.asin,
                acos: Math.acos,
                atan: Math.atan,
                sinh: Math.sinh || sm,
                cosh: Math.cosh || tm,
                tanh: Math.tanh || um,
                asinh: Math.asinh || vm,
                acosh: Math.acosh || wm,
                atanh: Math.atanh || xm,
                sqrt: Math.sqrt,
                log: Math.log,
                ln: Math.log,
                lg: Math.log10 || Mh,
                log10: Math.log10 || Mh,
                abs: Math.abs,
                ceil: Math.ceil,
                floor: Math.floor,
                round: Math.round,
                trunc: Math.trunc || Am,
                "-": ym,
                "+": Number,
                exp: Math.exp,
                kj: zm,
                length: Cm,
                "!": Nh
            };
            this.Ha = {
                "+": H,
                "-": W,
                "*": N,
                "/": da,
                "%": Va,
                "^": Math.pow,
                "||": ud,
                "==": ia,
                "!=": km,
                ">": lm,
                "<": mm,
                ">=": nm,
                "<=": om,
                and: pm,
                or: qm,
                "in": rm
            };
            this.Pa = {
                "?": Ph
            };
            this.kb = {
                random: Bm,
                Wi: Nh,
                min: Math.min,
                max: Math.max,
                hypot: Math.hypot || Oh,
                mj: Math.hypot || Oh,
                pow: Math.pow,
                atan2: Math.atan2,
                "if": Ph,
                gamma: ff,
                pj: Dm
            };
            this.Kb = {
                E: Math.E,
                PI: Math.PI,
                "true": !0,
                "false": !1
            }
        }
        a.prototype.toString = function() {
            switch (this.type) {
            case "INUMBER":
            case "IOP1":
            case "IOP2":
            case "IOP3":
            case "IVAR":
                return this.value;
            case "IFUNCALL":
                return "CALL " + this.value;
            case "IMEMBER":
                return "." + this.value;
            default:
                return "Invalid Instruction"
            }
        }
        ;
        p.prototype.simplify = function(h) {
            h = h || {};
            return new p(d(this.aa, this.Ba, this.Ha, this.Pa, h),this.Yb)
        }
        ;
        p.prototype.substitute = function(h, l) {
            l instanceof p || (l = this.Yb.parse(String(l)));
            return new p(e(this.aa, h, l),this.Yb)
        }
        ;
        p.prototype.evaluate = function(h) {
            h = h || {};
            return f(this.aa, this, h)
        }
        ;
        p.prototype.toString = function() {
            return g(this.aa, !1)
        }
        ;
        p.prototype.symbols = function(h) {
            h = h || {};
            var l = [];
            q(this.aa, l, h);
            return l
        }
        ;
        p.prototype.variables = function(h) {
            h = h || {};
            var l = [];
            q(this.aa, l, h);
            var r = this.kb;
            return l.filter(function(v) {
                return !(v in r)
            })
        }
        ;
        p.prototype.toJSFunction = function(h, l) {
            var r = this
              , v = new Function(h,"with(this.functions) with (this.ternaryOps) with (this.binaryOps) with (this.unaryOps) { return " + g(this.simplify(l).aa, !0) + "; }");
            return function() {
                return v.apply(r, arguments)
            }
        }
        ;
        w.prototype.toString = function() {
            return this.type + ": " + this.value
        }
        ;
        u.prototype.T = function(h, l, r) {
            return new w(h,l,null != r ? r : this.s)
        }
        ;
        u.prototype.save = function() {
            this.Xe = this.s;
            this.tb = this.current
        }
        ;
        u.prototype.restore = function() {
            this.s = this.Xe;
            this.current = this.tb
        }
        ;
        u.prototype.next = function() {
            if (this.s >= this.D.length)
                return this.T("TEOF", "EOF");
            if (this.Hg() || this.tg())
                return this.next();
            if (this.Dg() || this.zg() || this.Ag() || this.Eg() || this.Bg() || this.sg() || this.yg() || this.ug() || this.xg())
                return this.current;
            this.parseError('Unknown character "' + this.D.charAt(this.s) + '"')
        }
        ;
        u.prototype.Eg = function() {
            var h = !1
              , l = this.s
              , r = this.D.charAt(l);
            if ("'" === r || '"' === r)
                for (var v = this.D.indexOf(r, l + 1); 0 <= v && this.s < this.D.length; ) {
                    this.s = v + 1;
                    if ("\\" !== this.D.charAt(v - 1)) {
                        this.current = this.T("TSTRING", this.unescape(this.D.substring(l + 1, v)), l);
                        h = !0;
                        break
                    }
                    v = this.D.indexOf(r, v + 1)
                }
            return h
        }
        ;
        u.prototype.Bg = function() {
            var h = this.D.charAt(this.s);
            return "(" === h || ")" === h ? (this.current = this.T("TPAREN", h),
            this.s++,
            !0) : !1
        }
        ;
        u.prototype.sg = function() {
            return "," === this.D.charAt(this.s) ? (this.current = this.T("TCOMMA", ","),
            this.s++,
            !0) : !1
        }
        ;
        u.prototype.ug = function() {
            for (var h = this.s, l = h; l < this.D.length; l++) {
                var r = this.D.charAt(l);
                if (r.toUpperCase() === r.toLowerCase() && (l === this.s || "_" !== r && "." !== r && ("0" > r || "9" < r)))
                    break
            }
            return l > h && (h = this.D.substring(h, l),
            h in this.Kb) ? (this.current = this.T("TNUMBER", this.Kb[h]),
            this.s += h.length,
            !0) : !1
        }
        ;
        u.prototype.yg = function() {
            for (var h = this.s, l = h; l < this.D.length; l++) {
                var r = this.D.charAt(l);
                if (r.toUpperCase() === r.toLowerCase() && (l === this.s || "_" !== r && ("0" > r || "9" < r)))
                    break
            }
            return l > h && (h = this.D.substring(h, l),
            this.Be(h) && (h in this.Ha || h in this.Ba || h in this.Pa)) ? (this.current = this.T("TOP", h),
            this.s += h.length,
            !0) : !1
        }
        ;
        u.prototype.xg = function() {
            for (var h = this.s, l = h, r = !1; l < this.D.length; l++) {
                var v = this.D.charAt(l);
                if (v.toUpperCase() === v.toLowerCase()) {
                    if (l !== this.s || "$" !== v)
                        if (l === this.s || !r || "_" !== v && ("0" > v || "9" < v))
                            break
                } else
                    r = !0
            }
            return r ? (h = this.D.substring(h, l),
            this.current = this.T("TNAME", h),
            this.s += h.length,
            !0) : !1
        }
        ;
        u.prototype.Hg = function() {
            for (var h = !1, l = this.D.charAt(this.s); " " === l || "\t" === l || "\n" === l || "\r" === l; ) {
                h = !0;
                this.s++;
                if (this.s >= this.D.length)
                    break;
                l = this.D.charAt(this.s)
            }
            return h
        }
        ;
        var Em = /^[0-9a-f]{4}$/i;
        u.prototype.unescape = function(h) {
            var l = h.indexOf("\\");
            if (0 > l)
                return h;
            for (var r = h.substring(0, l); 0 <= l; ) {
                var v = h.charAt(++l);
                switch (v) {
                case "'":
                    r += "'";
                    break;
                case '"':
                    r += '"';
                    break;
                case "\\":
                    r += "\\";
                    break;
                case "/":
                    r += "/";
                    break;
                case "b":
                    r += "\b";
                    break;
                case "f":
                    r += "\f";
                    break;
                case "n":
                    r += "\n";
                    break;
                case "r":
                    r += "\r";
                    break;
                case "t":
                    r += "\t";
                    break;
                case "u":
                    v = h.substring(l + 1, l + 5);
                    Em.test(v) || this.parseError("Illegal escape sequence: \\u" + v);
                    r += String.fromCharCode(parseInt(v, 16));
                    l += 4;
                    break;
                default:
                    throw this.parseError('Illegal escape sequence: "\\' + v + '"');
                }
                ++l;
                v = h.indexOf("\\", l);
                r += h.substring(l, 0 > v ? h.length : v);
                l = v
            }
            return r
        }
        ;
        u.prototype.tg = function() {
            return "/" === this.D.charAt(this.s) && "*" === this.D.charAt(this.s + 1) ? (this.s = this.D.indexOf("*/", this.s) + 2,
            1 === this.s && (this.s = this.D.length),
            !0) : !1
        }
        ;
        u.prototype.Dg = function() {
            var h = this.s;
            if (h >= this.D.length - 2 || "0" !== this.D.charAt(h))
                return !1;
            ++h;
            if ("x" === this.D.charAt(h)) {
                var l = 16;
                var r = /^[0-9a-f]$/i;
                ++h
            } else if ("b" === this.D.charAt(h))
                l = 2,
                r = /^[01]$/i,
                ++h;
            else
                return !1;
            for (var v = !1, y = h; h < this.D.length; )
                if (r.test(this.D.charAt(h)))
                    h++,
                    v = !0;
                else
                    break;
            v && (this.current = this.T("TNUMBER", parseInt(this.D.substring(y, h), l)),
            this.s = h);
            return v
        }
        ;
        u.prototype.zg = function() {
            for (var h = !1, l = this.s, r = l, v = l, y = !1, E = !1, x; l < this.D.length; )
                if (x = this.D.charAt(l),
                "0" <= x && "9" >= x || !y && "." === x)
                    "." === x ? y = !0 : E = !0,
                    l++,
                    h = E;
                else
                    break;
            h && (v = l);
            if ("e" === x || "E" === x) {
                l++;
                y = !0;
                for (E = !1; l < this.D.length; ) {
                    x = this.D.charAt(l);
                    if (!y || "+" !== x && "-" !== x)
                        if ("0" <= x && "9" >= x)
                            E = !0,
                            y = !1;
                        else
                            break;
                    else
                        y = !1;
                    l++
                }
                E || (l = v)
            }
            h ? (this.current = this.T("TNUMBER", parseFloat(this.D.substring(r, l))),
            this.s = l) : this.s = v;
            return h
        }
        ;
        u.prototype.Ag = function() {
            var h = this.s
              , l = this.D.charAt(this.s);
            if ("+" === l || "-" === l || "*" === l || "/" === l || "%" === l || "^" === l || "?" === l || ":" === l || "." === l)
                this.current = this.T("TOP", l);
            else if ("\u2219" === l || "\u2022" === l)
                this.current = this.T("TOP", "*");
            else if (">" === l)
                "=" === this.D.charAt(this.s + 1) ? (this.current = this.T("TOP", ">="),
                this.s++) : this.current = this.T("TOP", ">");
            else if ("<" === l)
                "=" === this.D.charAt(this.s + 1) ? (this.current = this.T("TOP", "<="),
                this.s++) : this.current = this.T("TOP", "<");
            else if ("|" === l)
                if ("|" === this.D.charAt(this.s + 1))
                    this.current = this.T("TOP", "||"),
                    this.s++;
                else
                    return !1;
            else if ("=" === l)
                if ("=" === this.D.charAt(this.s + 1))
                    this.current = this.T("TOP", "=="),
                    this.s++;
                else
                    return !1;
            else if ("!" === l)
                "=" === this.D.charAt(this.s + 1) ? (this.current = this.T("TOP", "!="),
                this.s++) : this.current = this.T("TOP", l);
            else
                return !1;
            this.s++;
            if (this.Be(this.current.value))
                return !0;
            this.s = h;
            return !1
        }
        ;
        var Qh = {
            "+": "add",
            "-": "subtract",
            "*": "multiply",
            "/": "divide",
            "%": "remainder",
            "^": "power",
            "!": "factorial",
            "<": "comparison",
            ">": "comparison",
            "<=": "comparison",
            ">=": "comparison",
            "==": "comparison",
            "!=": "comparison",
            "||": "concatenate",
            and: "logical",
            or: "logical",
            not: "logical",
            "?": "conditional",
            ":": "conditional"
        };
        u.prototype.Be = function(h) {
            h = Qh.hasOwnProperty(h) ? Qh[h] : h;
            var l = this.options.operators || {};
            return "in" === h ? !!l["in"] : !(h in l) || !!l[h]
        }
        ;
        u.prototype.ke = function() {
            var h = 0
              , l = -1;
            do {
                h++;
                var r = this.s - l;
                l = this.D.indexOf("\n", l + 1)
            } while (0 <= l && l < this.s);
            return {
                line: h,
                ae: r
            }
        }
        ;
        u.prototype.parseError = function(h) {
            var l = this.ke();
            throw Error("parse error [" + l.line + ":" + l.ae + "]: " + h);
        }
        ;
        z.prototype.next = function() {
            this.current = this.xa;
            return this.xa = this.aa.next()
        }
        ;
        z.prototype.oh = function(h, l) {
            return "undefined" === typeof l ? !0 : Array.isArray(l) ? k(l, h.value) : "function" === typeof l ? l(h) : h.value === l
        }
        ;
        z.prototype.save = function() {
            this.tb = this.current;
            this.We = this.xa;
            this.aa.save()
        }
        ;
        z.prototype.restore = function() {
            this.aa.restore();
            this.current = this.tb;
            this.xa = this.We
        }
        ;
        z.prototype.accept = function(h, l) {
            return this.xa.type === h && this.oh(this.xa, l) ? (this.next(),
            !0) : !1
        }
        ;
        z.prototype.Lb = function(h, l) {
            if (!this.accept(h, l)) {
                var r = this.aa.ke();
                throw Error("parse error [" + r.line + ":" + r.ae + "]: Expected " + (l || h));
            }
        }
        ;
        z.prototype.Oe = function(h) {
            if (this.accept("TNAME"))
                h.push(new a("IVAR",this.current.value));
            else if (this.accept("TNUMBER"))
                h.push(new a("INUMBER",this.current.value));
            else if (this.accept("TSTRING"))
                h.push(new a("INUMBER",this.current.value));
            else if (this.accept("TPAREN", "("))
                this.Wb(h),
                this.Lb("TPAREN", ")");
            else
                throw Error("unexpected " + this.xa);
        }
        ;
        z.prototype.Wb = function(h) {
            this.hd(h)
        }
        ;
        z.prototype.hd = function(h) {
            for (this.Zg(h); this.accept("TOP", "?"); ) {
                var l = []
                  , r = [];
                this.hd(l);
                this.Lb("TOP", ":");
                this.hd(r);
                h.push(new a("IEXPR",l));
                h.push(new a("IEXPR",r));
                h.push(new a("IOP3","?"))
            }
        }
        ;
        z.prototype.Zg = function(h) {
            for (this.Ne(h); this.accept("TOP", "or"); )
                this.Ne(h),
                h.push(c("or"))
        }
        ;
        z.prototype.Ne = function(h) {
            for (this.Pe(h); this.accept("TOP", "and"); )
                this.Pe(h),
                h.push(c("and"))
        }
        ;
        var Fm = "== != < <= >= > in".split(" ");
        z.prototype.Pe = function(h) {
            for (this.Me(h); this.accept("TOP", Fm); ) {
                var l = this.current;
                this.Me(h);
                h.push(c(l.value))
            }
        }
        ;
        var Gm = ["+", "-", "||"];
        z.prototype.Me = function(h) {
            for (this.Re(h); this.accept("TOP", Gm); ) {
                var l = this.current;
                this.Re(h);
                h.push(c(l.value))
            }
        }
        ;
        var Hm = ["*", "/", "%"];
        z.prototype.Re = function(h) {
            for (this.Xb(h); this.accept("TOP", Hm); ) {
                var l = this.current;
                this.Xb(h);
                h.push(c(l.value))
            }
        }
        ;
        z.prototype.Xb = function(h) {
            var l = this.aa.Ba;
            this.save();
            if (this.accept("TOP", function(v) {
                return v.value in l
            }))
                if ("-" !== this.current.value && "+" !== this.current.value && "TPAREN" === this.xa.type && "(" === this.xa.value)
                    this.restore(),
                    this.Qe(h);
                else {
                    var r = this.current;
                    this.Xb(h);
                    h.push(b(r.value))
                }
            else
                this.Qe(h)
        }
        ;
        z.prototype.Qe = function(h) {
            for (this.ah(h); this.accept("TOP", "^"); )
                this.Xb(h),
                h.push(c("^"))
        }
        ;
        z.prototype.ah = function(h) {
            for (this.Xg(h); this.accept("TOP", "!"); )
                h.push(b("!"))
        }
        ;
        z.prototype.Xg = function(h) {
            var l = this.aa.Ba;
            if (this.accept("TOP", function(v) {
                return v.value in l
            })) {
                var r = this.current;
                this.Oe(h);
                h.push(b(r.value))
            } else
                for (this.Yg(h); this.accept("TPAREN", "("); )
                    this.accept("TPAREN", ")") ? h.push(new a("IFUNCALL",0)) : (r = this.Wg(h),
                    h.push(new a("IFUNCALL",r)))
        }
        ;
        z.prototype.Wg = function(h) {
            for (var l = 0; !this.accept("TPAREN", ")"); )
                for (this.Wb(h),
                ++l; this.accept("TCOMMA"); )
                    this.Wb(h),
                    ++l;
            return l
        }
        ;
        z.prototype.Yg = function(h) {
            for (this.Oe(h); this.accept("TOP", "."); ) {
                if (!this.allowMemberAccess)
                    throw Error('unexpected ".", member access is not permitted');
                this.Lb("TNAME");
                h.push(new a("IMEMBER",this.current.value))
            }
        }
        ;
        var gf = [.9999999999999971, 57.15623566586292, -59.59796035547549, 14.136097974741746, -.4919138160976202, 3.399464998481189E-5, 4.652362892704858E-5, -9.837447530487956E-5, 1.580887032249125E-4, -2.1026444172410488E-4, 2.1743961811521265E-4, -1.643181065367639E-4, 8.441822398385275E-5, -2.6190838401581408E-5, 3.6899182659531625E-6];
        Fb.prototype.parse = function(h) {
            var l = [];
            h = new z(this,new u(this,h),{
                allowMemberAccess: this.options.allowMemberAccess
            });
            h.Wb(l);
            h.Lb("TEOF", "EOF");
            return new p(l,this)
        }
        ;
        Fb.prototype.evaluate = function(h, l) {
            return this.parse(h).evaluate(l)
        }
        ;
        var Rh = new Fb;
        Fb.parse = function(h) {
            return Rh.parse(h)
        }
        ;
        Fb.evaluate = function(h, l) {
            return Rh.parse(h).evaluate(l)
        }
        ;
        return {
            Parser: Fb,
            Expression: p
        }
    }
    "object" === typeof exports && "undefined" !== typeof module ? module.exports = If() : "function" === typeof define && define.Li ? define(If) : this.exprEval = If();
    const Jf = new Map([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["+", "+"], ["\u2013", "-"], ["\u00d7", "*"], ["\u00f7", "/"], ["(", "("], [")", ")"], ["x!", "!"], ["y\u207f", "^"], ["\u221a", "sqrt("], ["sin", "sin("], ["cos", "cos("], ["tan", "tan("], ["asin", "asin("], ["acos", "acos("], ["atan", "atan("], ["e\u207f", "exp("], ["ln", "ln("], ["log", "log("], ["rnd", "round("], ["mod", "%"]]);
    function Kf(a) {
        var b = Lf;
        b.g = b.g.filter(c=>c !== a)
    }
    const Mf = new class {
        constructor() {
            this.buffer = null;
            this.history = [];
            this.g = []
        }
        o(a) {
            if (a)
                if ("=" === a)
                    a: {
                        a = null;
                        const b = new Hf;
                        if (this.buffer) {
                            const c = this.buffer;
                            try {
                                a = b.parse(this.buffer).evaluate({})
                            } catch (d) {
                                break a
                            }
                            this.history.push(c);
                            this.history.push(String(a));
                            this.buffer = null
                        }
                    }
                else {
                    a = Jf.get(a);
                    if (!a)
                        return;
                    this.buffer = null !== this.buffer ? this.buffer + a : a
                }
            for (const b of this.g)
                b()
        }
    }
    ;
    function *Nf(a) {
        yield a;
        if ("slot" === a.localName) {
            var b = a.assignedNodes({
                flatten: !0
            });
            for (var c = 0; c < b.length; c++)
                yield*Nf(b[c])
        } else if ("content" === a.localName && "getDistributedNodes"in a)
            for (b = a.getDistributedNodes(),
            c = 0; c < b.length; c++)
                yield*Nf(b[c]);
        if (a.shadowRoot)
            for (a = a.shadowRoot.childNodes,
            b = 0; b < a.length; b++)
                yield*Nf(a[b]);
        else if (a.childNodes)
            for (b = 0; b < a.childNodes.length; b++)
                yield*Nf(a.childNodes[b])
    }
    function Of(a) {
        return a.split(/,(?=(?:(?:[^"']*["']){2})*[^"']*$)/).map(b=>b.trim())
    }
    function *Pf(a, b=document.documentElement) {
        a = Of(a).map(c=>{
            c = Qf(c);
            const d = c.td;
            let e = d;
            for (; c.remainder; )
                c = Qf(c.remainder),
                e = e.zd = c.td;
            return d
        }
        );
        for (const c of Nf(b))
            Rf(c, a) && (yield c)
    }
    function Sf(a, b=document.documentElement) {
        [a] = Pf(a, b);
        return a
    }
    function Qf(a) {
        const b = (a.match(/(\S+|\S+"[^"^\[]+"\S+|\S+'[^'^\[]+'\S+)$/) || [])[1];
        let c = a.slice(0, -b.length).trim(), d;
        c.endsWith(">") ? (d = ">",
        c = c.slice(0, -d.length).trim()) : c && (d = " ");
        return {
            td: {
                ac: b || a,
                cg: d && (d || " ")
            },
            remainder: c || void 0
        }
    }
    function Tf(a, b=!1) {
        b && a.assignedSlot && (a = a.assignedSlot);
        a = a.parentNode;
        return !a || "ShadowRoot" !== a?.constructor?.name && a?.constructor !== window.ShadowRoot ? a : a.host
    }
    function Rf(a, b) {
        for (const d of b) {
            if (b = a) {
                b = a;
                var c = d.ac;
                b = b ? b.matches ? b.matches(c) : b.msMatchesSelector ? b.msMatchesSelector(c) : !1 : !1
            }
            if (b) {
                if (!d.zd)
                    return !0;
                if (">" === d.cg)
                    return Rf(Tf(a, !0), [d.zd]);
                for (; a = Tf(a); )
                    if (Rf(a, [d.zd]))
                        return !0
            }
        }
        return !1
    }
    ;/*

 Copyright 2017 Google LLC
 SPDX-License-Identifier: BSD-3-Clause
*/
    const Uf = new Set
      , Vf = new Map
      , Wf = (a,b)=>{
        if (void 0 !== window.ShadyCSS && (!window.ShadyCSS.nativeShadow || window.ShadyCSS.ApplyShim)) {
            var c = window.ShadyDOM?.inUse && !0 === window.ShadyDOM?.noPatch ? window.ShadyDOM.wrap : u=>u
              , d = u=>void 0 !== u && !Uf.has(u)
              , e = u=>{
                let z = Vf.get(u);
                void 0 === z && Vf.set(u, z = []);
                return z
            }
              , f = (u,z)=>{
                const H = e(u)
                  , W = 0 !== H.length;
                if (W) {
                    const N = document.createElement("style");
                    N.textContent = H.join("\n");
                    z.content.appendChild(N)
                }
                Uf.add(u);
                Vf.delete(u);
                window.ShadyCSS.prepareTemplateStyles(z, u);
                W && window.ShadyCSS.nativeShadow && (u = z.content.querySelector("style"),
                null !== u && z.content.appendChild(u))
            }
              , g = new Map
              , k = a.createElement;
            a.createElement = function(u, z) {
                u = k.call(a, u, z);
                z = z?.scope;
                void 0 !== z && (window.ShadyCSS.nativeShadow || window.ShadyCSS.prepareTemplateDom(u, z),
                d(z) && e(z).push(...Array.from(u.content.querySelectorAll("style")).map(H=>{
                    H.parentNode?.removeChild(H);
                    return H.textContent
                }
                )));
                return u
            }
            ;
            var q = document.createDocumentFragment()
              , p = document.createComment("");
            b = b.prototype;
            var w = b.ta;
            b.ta = function(u, z=this) {
                const H = c(this.fa).parentNode;
                var W = this.options?.scope;
                if ((H instanceof ShadowRoot || H === this.options?.nj) && d(W)) {
                    const N = this.fa
                      , da = this.wa;
                    q.appendChild(p);
                    this.fa = p;
                    this.wa = null;
                    w.call(this, u, z);
                    u = u?._$litType$ ? this.O.Cb.Wa : document.createElement("template");
                    f(W, u);
                    q.removeChild(p);
                    window.ShadyCSS?.nativeShadow && (W = u.content.querySelector("style"),
                    null !== W && q.appendChild(W.cloneNode(!0)));
                    H.insertBefore(q, da);
                    this.fa = N;
                    this.wa = da
                } else
                    w.call(this, u, z)
            }
            ;
            b.Wd = function(u) {
                var z = this.options?.scope;
                let H = g.get(z);
                void 0 === H && g.set(z, H = new Map);
                z = H.get(u.strings);
                void 0 === z && H.set(u.strings, z = new a(u,this.options));
                return z
            }
        }
    }
    ;
    let Xf;
    (Xf = window).litHtmlPolyfillSupport ?? (Xf.litHtmlPolyfillSupport = Wf);
    let Yf = "";
    if (window.Symbol) {
        const a = Symbol();
        "symbol" !== typeof a && (Yf = Object.keys(a)[0])
    }
    const Zf = "" !== Yf;
    var $f = Zf ? a=>null != a && void 0 !== a[Yf] : ()=>!1;
    if (Zf && !window.Symbol.for) {
        const a = new Map;
        window.Symbol.for = b=>{
            a.has(b) || a.set(b, Symbol(b));
            return a.get(b)
        }
    }
    ;const ag = ({ReactiveElement: a})=>{
        if (void 0 !== window.ShadyCSS && (!window.ShadyCSS.nativeShadow || window.ShadyCSS.ApplyShim)) {
            a = a.prototype;
            window.ShadyDOM && window.ShadyDOM.inUse && !0 === window.ShadyDOM.noPatch && window.ShadyDOM.patchElementProto(a);
            var b = a.Ka;
            a.Ka = function() {
                const e = this.localName;
                if (window.ShadyCSS.nativeShadow)
                    return b.call(this);
                if (!this.constructor.hasOwnProperty("__scoped")) {
                    this.constructor.__scoped = !0;
                    const f = this.constructor.Bc.map(g=>g instanceof CSSStyleSheet ? Array.from(g.cssRules).reduce((k,q)=>k + q.cssText, "") : g.cssText);
                    window.ShadyCSS?.ScopingShim?.prepareAdoptedCssText(f, e);
                    void 0 === this.constructor.Nf && window.ShadyCSS.prepareTemplateStyles(document.createElement("template"), e)
                }
                return this.shadowRoot ?? this.attachShadow(this.constructor.cb)
            }
            ;
            var c = a.connectedCallback;
            a.connectedCallback = function() {
                c.call(this);
                this.Ma && window.ShadyCSS.styleElement(this)
            }
            ;
            var d = a.qc;
            a.qc = function(e) {
                this.Ma || window.ShadyCSS.styleElement(this);
                d.call(this, e)
            }
        }
    }
    ;
    let bg;
    (bg = window).reactiveElementPolyfillSupport ?? (bg.reactiveElementPolyfillSupport = ag);
    const cg = ({LitElement: a})=>{
        if (void 0 !== window.ShadyCSS && (!window.ShadyCSS.nativeShadow || window.ShadyCSS.ApplyShim)) {
            a.Nf = !0;
            a = a.prototype;
            var b = a.Ka;
            a.Ka = function() {
                this.Zb.scope = this.localName;
                return b.call(this)
            }
        }
    }
    ;
    let dg;
    (dg = window).litElementPolyfillSupport ?? (dg.litElementPolyfillSupport = cg);
    /*

 Copyright 2019 Google LLC
 SPDX-License-Identifier: BSD-3-Clause
*/
    const eg = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i
      , fg = Ma(qc`about:invalid#zClosurez`)
      , gg = mb(ob)
      , hg = a=>a
      , ig = a=>eg.test(String(a)) ? a : fg
      , jg = ()=>fg
      , kg = a=>a instanceof La ? Ma(a) : fg
      , lg = new Map([["A href", ig], ["AREA href", ig], ["BASE href", jg], ["BUTTON formaction", ig], ["EMBED src", jg], ["FORM action", ig], ["FRAME src", jg], ["IFRAME src", kg], ["IFRAME srcdoc", a=>a instanceof nb ? mb(a) : gg], ["INPUT formaction", ig], ["LINK href", kg], ["OBJECT codebase", jg], ["OBJECT data", jg], ["SCRIPT href", kg], ["SCRIPT src", kg], ["SCRIPT text", jg], ["USE href", kg]]);
    const mg = !n.ShadyDOM?.inUse || !0 !== n.ShadyDOM?.noPatch && "on-demand" !== n.ShadyDOM?.noPatch ? a=>a : n.ShadyDOM.wrap
      , ng = n.trustedTypes
      , og = ng ? ng.createPolicy("lit-html", {
        createHTML: a=>a
    }) : void 0
      , pg = a=>a
      , qg = ()=>pg
      , rg = new Map
      , sg = `lit$${String(Math.random()).slice(9)}$`
      , tg = "?" + sg
      , ug = `<${tg}>`
      , vg = document
      , wg = a=>null === a || "object" != typeof a && "function" != typeof a || $f(a)
      , xg = Array.isArray
      , yg = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g
      , zg = /--\x3e/g
      , Ag = />/g
      , Bg = RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)", "g")
      , Cg = /'/g
      , Dg = /"/g
      , Eg = /^(?:script|style|textarea|title)$/i;
    var F = (a,...b)=>({
        _$litType$: 1,
        strings: a,
        values: b
    })
      , Fg = Symbol.for ? Symbol.for("lit-noChange") : Symbol("lit-noChange")
      , I = Symbol.for ? Symbol.for("lit-nothing") : Symbol("lit-nothing");
    const Gg = new WeakMap
      , Hg = vg.createTreeWalker(vg, 129);
    function Ig(a, b, c) {
        if (1 !== a.nodeType)
            return hg;
        b = b.toLowerCase();
        if ("innerhtml" === b || "innertext" === b || "textcontent" === b || "outerhtml" === b)
            return ()=>gg;
        const d = lg.get(`${a.tagName} ${b}`);
        return void 0 !== d ? d : /^on/.test(b) && "attribute" === c && (a = a.tagName.includes("-") ? HTMLElement.prototype : a,
        b in a) ? ()=>{
            throw Error("invalid binding");
        }
        : hg
    }
    function Jg(a, b) {
        if (!Array.isArray(a) || !a.hasOwnProperty("raw"))
            throw Error("invalid template strings array");
        return void 0 !== og ? og.createHTML(b) : b
    }
    var Kg = class {
        constructor({strings: a, _$litType$: b}, c) {
            this.g = [];
            let d = 0
              , e = 0;
            const f = a.length - 1
              , g = this.g;
            var k = a.length - 1;
            const q = [];
            let p = 2 === b ? "<svg>" : "", w, u = yg;
            for (let N = 0; N < k; N++) {
                const da = a[N];
                let Va = -1, ud;
                var z = 0;
                let ia;
                for (; z < da.length; ) {
                    u.lastIndex = z;
                    ia = u.exec(da);
                    if (null === ia)
                        break;
                    z = u.lastIndex;
                    u === yg ? "!--" === ia[1] ? u = zg : void 0 !== ia[1] ? u = Ag : void 0 !== ia[2] ? (Eg.test(ia[2]) && (w = new RegExp(`</${ia[2]}`,"g")),
                    u = Bg) : void 0 !== ia[3] && (u = Bg) : u === Bg ? ">" === ia[0] ? (u = w ?? yg,
                    Va = -1) : void 0 === ia[1] ? Va = -2 : (Va = u.lastIndex - ia[2].length,
                    ud = ia[1],
                    u = void 0 === ia[3] ? Bg : '"' === ia[3] ? Dg : Cg) : u === Dg || u === Cg ? u = Bg : u === zg || u === Ag ? u = yg : (u = Bg,
                    w = void 0)
                }
                z = u === Bg && a[N + 1].startsWith("/>") ? " " : "";
                p += u === yg ? da + ug : 0 <= Va ? (q.push(ud),
                da.slice(0, Va) + "$lit$" + da.slice(Va)) + sg + z : da + sg + (-2 === Va ? N : z)
            }
            a = [Jg(a, p + (a[k] || "<?>") + (2 === b ? "</svg>" : "")), q];
            const [H,W] = a;
            this.Wa = Kg.createElement(H, c);
            Hg.currentNode = this.Wa.content;
            2 === b && (b = this.Wa.content.firstChild,
            b.replaceWith(...b.childNodes));
            for (; null !== (b = Hg.nextNode()) && g.length < f; ) {
                if (1 === b.nodeType) {
                    if (b.hasAttributes())
                        for (const N of b.getAttributeNames())
                            N.endsWith("$lit$") ? (a = W[e++],
                            c = b.getAttribute(N).split(sg),
                            a = /([.?@])?(.*)/.exec(a),
                            g.push({
                                type: 1,
                                index: d,
                                name: a[2],
                                strings: c,
                                gg: "." === a[1] ? Lg : "?" === a[1] ? Mg : "@" === a[1] ? Ng : Og
                            }),
                            b.removeAttribute(N)) : N.startsWith(sg) && (g.push({
                                type: 6,
                                index: d
                            }),
                            b.removeAttribute(N));
                    if (Eg.test(b.tagName) && (c = b.textContent.split(sg),
                    a = c.length - 1,
                    0 < a)) {
                        b.textContent = ng ? ng.emptyScript : "";
                        for (k = 0; k < a; k++)
                            b.append(c[k], vg.createComment("")),
                            Hg.nextNode(),
                            g.push({
                                type: 2,
                                index: ++d
                            });
                        b.append(c[a], vg.createComment(""))
                    }
                } else if (8 === b.nodeType)
                    if (b.data === tg)
                        g.push({
                            type: 2,
                            index: d
                        });
                    else
                        for (c = -1; -1 !== (c = b.data.indexOf(sg, c + 1)); )
                            g.push({
                                type: 7,
                                index: d
                            }),
                            c += sg.length - 1;
                d++
            }
        }
        static createElement(a) {
            const b = vg.createElement("template");
            b.innerHTML = a;
            return b
        }
    }
    ;
    function Pg(a, b, c=a, d) {
        if (b === Fg)
            return b;
        let e = void 0 !== d ? c.h?.[d] : c.G;
        const f = wg(b) ? void 0 : b._$litDirective$;
        e?.constructor !== f && (e?._$notifyDirectiveConnectionChanged?.(!1),
        void 0 === f ? e = void 0 : (e = new f(a),
        e.Of(a, c, d)),
        void 0 !== d ? (c.h ?? (c.h = []))[d] = e : c.G = e);
        void 0 !== e && (b = Pg(a, e.Pf(a, b.values), e, d));
        return b
    }
    var Sg = class {
        constructor(a, b) {
            this.h = [];
            this.l = void 0;
            this.Cb = a;
            this.g = b
        }
        get parentNode() {
            return this.g.parentNode
        }
        get pa() {
            return this.g.pa
        }
        j(a) {
            const b = this.Cb.g
              , c = (a?.Oi ?? vg).importNode(this.Cb.Wa.content, !0);
            Hg.currentNode = c;
            let d = Hg.nextNode()
              , e = 0
              , f = 0
              , g = b[0];
            for (; void 0 !== g; ) {
                if (e === g.index) {
                    let k;
                    2 === g.type ? k = new Qg(d,d.nextSibling,this,a) : 1 === g.type ? k = new g.gg(d,g.name,g.strings,this,a) : 6 === g.type && (k = new Rg(d,this,a));
                    this.h.push(k);
                    g = b[++f]
                }
                e !== g?.index && (d = Hg.nextNode(),
                e++)
            }
            Hg.currentNode = vg;
            return c
        }
        i(a) {
            let b = 0;
            for (const c of this.h)
                void 0 !== c && (void 0 !== c.strings ? (c.ta(a, c, b),
                b += c.strings.length - 2) : c.ta(a[b])),
                b++
        }
    }
      , Qg = class {
        get pa() {
            return this.g?.pa ?? this.F
        }
        constructor(a, b, c, d) {
            this.type = 2;
            this.O = I;
            this.l = void 0;
            this.fa = a;
            this.wa = b;
            this.g = c;
            this.options = d;
            this.F = d?.isConnected ?? !0;
            this.h = void 0
        }
        get parentNode() {
            let a = mg(this.fa).parentNode;
            const b = this.g;
            void 0 !== b && 11 === a?.nodeType && (a = b.parentNode);
            return a
        }
        ta(a, b=this) {
            a = Pg(this, a, b);
            wg(a) ? a === I || null == a || "" === a ? (this.O !== I && this.i(),
            this.O = I) : a !== this.O && a !== Fg && this.v(a) : void 0 !== a._$litType$ ? this.N(a) : void 0 !== a.nodeType ? this.m(a) : xg(a) || "function" === typeof a?.[Symbol.iterator] ? this.I(a) : this.v(a)
        }
        o(a) {
            return mg(mg(this.fa).parentNode).insertBefore(a, this.wa)
        }
        m(a) {
            if (this.O !== a) {
                this.i();
                if (Ig !== qg) {
                    const b = this.fa.parentNode?.nodeName;
                    if ("STYLE" === b || "SCRIPT" === b)
                        throw Error("Forbidden");
                }
                this.O = this.o(a)
            }
        }
        v(a) {
            if (this.O !== I && wg(this.O)) {
                var b = mg(this.fa).nextSibling;
                void 0 === this.h && (this.h = Ig(b, "data", "property"));
                a = this.h(a);
                b.data = a
            } else
                b = vg.createTextNode(""),
                this.m(b),
                void 0 === this.h && (this.h = Ig(b, "data", "property")),
                a = this.h(a),
                b.data = a;
            this.O = a
        }
        N(a) {
            const {values: b, _$litType$: c} = a;
            a = "number" === typeof c ? this.Wd(a) : (void 0 === c.Wa && (c.Wa = Kg.createElement(Jg(c.qg, c.qg[0]), this.options)),
            c);
            if (this.O?.Cb === a)
                this.O.i(b);
            else {
                a = new Sg(a,this);
                const d = a.j(this.options);
                a.i(b);
                this.m(d);
                this.O = a
            }
        }
        Wd(a) {
            const b = a.strings;
            let c = Gg.get(b);
            if (void 0 === c) {
                const d = b.join("\x00");
                c = rg.get(d);
                void 0 === c && (c = new Kg(a),
                rg.set(d, c));
                Gg.set(b, c)
            }
            return c
        }
        I(a) {
            xg(this.O) || (this.O = [],
            this.i());
            const b = this.O;
            let c = 0, d;
            for (const e of a)
                c === b.length ? b.push(d = new Qg(this.o(vg.createComment("")),this.o(vg.createComment("")),this,this.options)) : d = b[c],
                d.ta(e),
                c++;
            c < b.length && (this.i(d && mg(d.wa).nextSibling, c),
            b.length = c)
        }
        i(a=mg(this.fa).nextSibling, b) {
            for (this.j?.(!1, !0, b); a && a !== this.wa; )
                b = mg(a).nextSibling,
                mg(a).remove(),
                a = b
        }
        Ye(a) {
            void 0 === this.g && (this.F = a,
            this.j?.(a))
        }
    }
      , Og = class {
        get tagName() {
            return this.element.tagName
        }
        get pa() {
            return this.g.pa
        }
        constructor(a, b, c, d, e) {
            this.type = 1;
            this.O = I;
            this.l = void 0;
            this.element = a;
            this.name = b;
            this.g = d;
            this.options = e;
            2 < c.length || "" !== c[0] || "" !== c[1] ? (this.O = Array(c.length - 1).fill(new String),
            this.strings = c) : this.O = I;
            this.Va = void 0
        }
        ta(a, b=this, c, d) {
            const e = this.strings;
            let f = !1;
            if (void 0 === e) {
                if (a = Pg(this, a, b, 0),
                f = !wg(a) || a !== this.O && a !== Fg)
                    this.O = a
            } else {
                const g = a;
                a = e[0];
                let k, q;
                for (k = 0; k < e.length - 1; k++)
                    q = Pg(this, g[c + k], b, k),
                    q === Fg && (q = this.O[k]),
                    f || (f = !wg(q) || q !== this.O[k]),
                    q === I ? a = I : a !== I && (a += (q ?? "") + e[k + 1]),
                    this.O[k] = q
            }
            f && !d && this.vc(a)
        }
        vc(a) {
            a === I ? mg(this.element).removeAttribute(this.name) : (void 0 === this.Va && (this.Va = Ig(this.element, this.name, "attribute")),
            a = this.Va(a ?? ""),
            mg(this.element).setAttribute(this.name, a ?? ""))
        }
    }
      , Lg = class extends Og {
        constructor() {
            super(...arguments);
            this.type = 3
        }
        vc(a) {
            void 0 === this.Va && (this.Va = Ig(this.element, this.name, "property"));
            a = this.Va(a);
            this.element[this.name] = a === I ? void 0 : a
        }
    }
      , Mg = class extends Og {
        constructor() {
            super(...arguments);
            this.type = 4
        }
        vc(a) {
            mg(this.element).toggleAttribute(this.name, !!a && a !== I)
        }
    }
      , Ng = class extends Og {
        constructor(a, b, c, d, e) {
            super(a, b, c, d, e);
            this.type = 5
        }
        ta(a, b=this) {
            a = Pg(this, a, b, 0) ?? I;
            if (a !== Fg) {
                b = this.O;
                var c = a === I && b !== I || a.capture !== b.capture || a.once !== b.once || a.passive !== b.passive
                  , d = a !== I && (b === I || c);
                c && this.element.removeEventListener(this.name, this, b);
                d && this.element.addEventListener(this.name, this, a);
                this.O = a
            }
        }
        handleEvent(a) {
            "function" === typeof this.O ? this.O.call(this.options?.host ?? this.element, a) : this.O.handleEvent(a)
        }
    }
      , Rg = class {
        constructor(a, b, c) {
            this.element = a;
            this.type = 6;
            this.l = void 0;
            this.g = b;
            this.options = c
        }
        get pa() {
            return this.g.pa
        }
        ta(a) {
            Pg(this, a)
        }
    }
      , Tg = Qg;
    (0,
    window.litHtmlPolyfillSupport)?.(Kg, Qg);
    var Ug;
    (n.litHtmlVersions ?? (n.litHtmlVersions = [])).push("3.0.0");
    Ug = (a,b,c)=>{
        const d = c?.ld ?? b;
        var e = d._$litPart$;
        void 0 === e && (e = c?.ld ?? null,
        d._$litPart$ = e = new Qg(b.insertBefore(vg.createComment(""), e),e,void 0,c ?? {}));
        e.ta(a);
        return e
    }
    ;
    var Vg = n.ShadowRoot && (void 0 === n.ShadyCSS || n.ShadyCSS.nativeShadow) && "adoptedStyleSheets"in Document.prototype && "replace"in CSSStyleSheet.prototype;
    const Wg = Symbol()
      , Xg = new WeakMap;
    var Yg = class {
        constructor(a, b) {
            this._$cssResult$ = !0;
            if (Wg !== Wg)
                throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
            this.cssText = a;
            this.g = b
        }
        get styleSheet() {
            let a = this.h;
            const b = this.g;
            if (Vg && void 0 === a) {
                const c = void 0 !== b && 1 === b.length;
                c && (a = Xg.get(b));
                void 0 === a && ((this.h = a = new CSSStyleSheet).replaceSync(this.cssText),
                c && Xg.set(b, a))
            }
            return a
        }
        toString() {
            return this.cssText
        }
    }
      , J = (a,...b)=>function() {
        const c = 1 === a.length ? a[0] : b.reduce((d,e,f)=>{
            if (!0 === e._$cssResult$)
                e = e.cssText;
            else if ("number" !== typeof e)
                throw Error("Value passed to 'css' function must be a 'css' function result: " + `${e}. Use 'unsafeCSS' to pass non-literal values, but take care ` + "to ensure page security.");
            return d + e + a[f + 1]
        }
        , a[0]);
        return new Yg(c,a)
    }()
      , Zg = (a,b)=>{
        if (Vg)
            a.adoptedStyleSheets = b.map(c=>c instanceof CSSStyleSheet ? c : c.styleSheet);
        else
            for (const c of b) {
                b = document.createElement("style");
                const d = n.litNonce;
                void 0 !== d && b.setAttribute("nonce", d);
                b.textContent = c.cssText;
                a.appendChild(b)
            }
    }
      , $g = Vg ? a=>a : a=>{
        if (a instanceof CSSStyleSheet) {
            let b = "";
            for (const c of a.cssRules)
                b += c.cssText;
            a = new Yg("string" === typeof b ? b : String(b))
        }
        return a
    }
    ;
    /*

 Copyright 2016 Google LLC
 SPDX-License-Identifier: BSD-3-Clause
*/
    const ah = !!/^\s*class\s*\{\s*\}\s*$/.test(class {
    }
    .toString()) || HTMLElement.es5Shimmed || void 0 === n.Reflect || void 0 === n.customElements || n.customElements.polyfillWrapFlushCallback || !1;
    let bh;
    var ch = ()=>{
        function a() {
            return c.construct(b, [], this.constructor)
        }
        const b = HTMLElement;
        if (ah)
            return b;
        if (void 0 !== bh)
            return bh;
        const c = n.Reflect;
        a.prototype = b.prototype;
        a.prototype.constructor = a;
        a.es5Shimmed = !0;
        Object.setPrototypeOf(a, b);
        return bh = a
    }
    ;
    let dh = !1;
    var eh = ()=>{
        ah || dh || (dh = !0,
        n.HTMLElement = ch())
    }
    ;
    eh();
    const fh = ch()
      , gh = Object.is
      , hh = Object.defineProperty
      , ih = Object.getOwnPropertyDescriptor
      , jh = Object.getOwnPropertyNames
      , kh = Object.getOwnPropertySymbols
      , lh = Object.getPrototypeOf
      , mh = n.trustedTypes
      , nh = mh ? mh.emptyScript : ""
      , oh = n.reactiveElementPolyfillSupport;
    var ph = {
        ef(a, b) {
            switch (b) {
            case Boolean:
                a = a ? nh : null;
                break;
            case Object:
            case Array:
                a = null == a ? a : JSON.stringify(a)
            }
            return a
        },
        Gc(a, b) {
            let c = a;
            switch (b) {
            case Boolean:
                c = null !== a;
                break;
            case Number:
                c = null === a ? null : Number(a);
                break;
            case Object:
            case Array:
                try {
                    c = JSON.parse(a)
                } catch (d) {
                    c = null
                }
            }
            return c
        }
    }
      , qh = (a,b)=>!gh(a, b);
    const rh = {
        H: !0,
        type: String,
        Ja: ph,
        A: !1,
        we: qh
    };
    var sh;
    null == Symbol.metadata && (Symbol.metadata = Symbol("metadata"));
    sh = Symbol.metadata;
    var th = new WeakMap;
    function uh(a, b) {
        a.tc();
        (a.hb ?? (a.hb = [])).push(b)
    }
    function vh(a, b, c, d) {
        const {get: e, set: f} = ih(a.prototype, b) ?? {
            get() {
                return this[c]
            },
            set(g) {
                this[c] = g
            }
        };
        return {
            get() {
                return e?.call(this)
            },
            set(g) {
                const k = e?.call(this);
                f.call(this, g);
                wh(this, b, k, d)
            },
            configurable: !0,
            enumerable: !0
        }
    }
    function xh(a, b, c=rh) {
        c.state && (c.H = !1);
        a.tc();
        a.ja.set(b, c);
        c.jj || (c = vh(a, b, Symbol(), c),
        void 0 !== c && hh(a.prototype, b, c))
    }
    function wh(a, b, c, d) {
        if (void 0 !== b)
            if (d ?? (d = a.constructor.ja.get(b) ?? rh),
            (d.we ?? qh)(a[b], c))
                a.pc(b, c, d);
            else
                return;
        !1 === a.qb && (a.uc = a.Qf())
    }
    function yh(a) {
        if (a.qb) {
            if (!a.Ma) {
                if (a.Eb) {
                    for (const [d,e] of a.Eb)
                        a[d] = e;
                    a.Eb = void 0
                }
                var b = a.constructor.ja;
                if (0 < b.size)
                    for (const [d,e] of b) {
                        b = d;
                        var c = e;
                        !0 !== c.sh || a.fb.has(b) || void 0 === a[b] || a.pc(b, a[b], c)
                    }
            }
            b = !1;
            c = a.fb;
            try {
                (b = a.xb(c)) ? (a.rc?.forEach(d=>d.bj?.()),
                a.update(c)) : a.sc()
            } catch (d) {
                throw b = !1,
                a.sc(),
                d;
            }
            b && a.qc(c)
        }
    }
    var Ah = class extends fh {
        static get observedAttributes() {
            this.Ob();
            return this.Db && [...this.Db.keys()]
        }
        static tc() {
            if (!this.hasOwnProperty("ja")) {
                var a = lh(this);
                a.Ob();
                void 0 !== a.hb && (this.hb = [...a.hb]);
                this.ja = new Map(a.ja)
            }
        }
        static Ob() {
            zh();
            if (!this.hasOwnProperty("Ec")) {
                this.Ec = !0;
                this.tc();
                if (this.hasOwnProperty("dh")) {
                    var a = this.dh
                      , b = [...jh(a), ...kh(a)];
                    for (const c of b)
                        xh(this, c, a[c])
                }
                a = this[sh];
                if (null !== a && (a = th.get(a),
                void 0 !== a))
                    for (const [c,d] of a)
                        this.ja.set(c, d);
                this.Db = new Map;
                for (const [c,d] of this.ja)
                    a = c,
                    b = this.Xd(a, d),
                    void 0 !== b && this.Db.set(b, a);
                b = this.M;
                a = [];
                if (Array.isArray(b)) {
                    b = new Set(b.flat(Infinity).reverse());
                    for (const c of b)
                        a.unshift($g(c))
                } else
                    void 0 !== b && a.push($g(b));
                this.Bc = a
            }
        }
        static Xd(a, b) {
            b = b.H;
            return !1 === b ? void 0 : "string" === typeof b ? b : "string" === typeof a ? a.toLowerCase() : void 0
        }
        constructor() {
            super();
            this.Eb = void 0;
            this.Ma = this.qb = !1;
            this.Sa = null;
            this.Rf()
        }
        Rf() {
            this.uc = new Promise(a=>this.de = a);
            this.fb = new Map;
            this.Tf();
            wh(this);
            this.constructor.hb?.forEach(a=>a(this))
        }
        Tf() {
            const a = new Map
              , b = this.constructor.ja;
            for (const c of b.keys())
                this.hasOwnProperty(c) && (a.set(c, this[c]),
                delete this[c]);
            0 < a.size && (this.Eb = a)
        }
        Ka() {
            const a = this.shadowRoot ?? this.attachShadow(this.constructor.cb);
            Zg(a, this.constructor.Bc);
            return a
        }
        connectedCallback() {
            this.Aa ?? (this.Aa = this.Ka());
            this.de(!0);
            this.rc?.forEach(a=>a.Zi?.())
        }
        de() {}
        disconnectedCallback() {
            this.rc?.forEach(a=>a.aj?.())
        }
        attributeChangedCallback(a, b, c) {
            this.Mf(a, c)
        }
        Sf(a, b) {
            const c = this.constructor.ja.get(a)
              , d = this.constructor.Xd(a, c);
            void 0 !== d && !0 === c.A && (b = (void 0 !== c.Ja?.ef ? c.Ja : ph).ef(b, c.type),
            this.Sa = a,
            null == b ? this.removeAttribute(d) : this.setAttribute(d, b),
            this.Sa = null)
        }
        Mf(a, b) {
            var c = this.constructor;
            a = c.Db.get(a);
            if (void 0 !== a && this.Sa !== a) {
                c = c.ja.get(a) ?? rh;
                const d = "function" === typeof c.Ja ? {
                    Gc: c.Ja
                } : void 0 !== c.Ja?.Gc ? c.Ja : ph;
                this.Sa = a;
                this[a] = d.Gc(b, c.type);
                this.Sa = null
            }
        }
        pc(a, b, c) {
            this.fb.has(a) || this.fb.set(a, b);
            !0 === c.A && this.Sa !== a && (this.Fb ?? (this.Fb = new Set)).add(a)
        }
        async Qf() {
            this.qb = !0;
            try {
                await this.uc
            } catch (b) {
                this.sj || Promise.reject(b)
            }
            const a = yh(this);
            null != a && await a;
            return !this.qb
        }
        qc(a) {
            this.rc?.forEach(b=>b.cj?.());
            this.Ma || (this.Ma = !0,
            this.L(a));
            this.ia(a)
        }
        sc() {
            this.fb = new Map;
            this.qb = !1
        }
        get Ea() {
            return this.nb()
        }
        nb() {
            return this.uc
        }
        xb() {
            return !0
        }
        update() {
            this.Fb && (this.Fb = this.Fb.forEach(a=>this.Sf(a, this[a])));
            this.sc()
        }
        ia() {}
        L() {}
    }
    ;
    Ah.Bc = [];
    Ah.cb = {
        mode: "open"
    };
    Ah.ja = new Map;
    Ah.Ec = new Map;
    oh?.({
        ReactiveElement: Ah
    });
    let zh = ()=>{
        (n.reactiveElementVersions ?? (n.reactiveElementVersions = [])).push("2.0.0");
        zh = ()=>{}
    }
    ;
    var K = class extends Ah {
        constructor() {
            super(...arguments);
            this.Zb = {
                host: this
            };
            this.F = void 0
        }
        Ka() {
            const a = super.Ka();
            let b;
            (b = this.Zb).ld ?? (b.ld = a.firstChild);
            return a
        }
        update(a) {
            const b = this.i();
            this.Ma || (this.Zb.isConnected = this.isConnected);
            super.update(a);
            this.F = Ug(b, this.Aa, this.Zb)
        }
        connectedCallback() {
            super.connectedCallback();
            this.F?.Ye(!0)
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            this.F?.Ye(!1)
        }
        i() {
            return Fg
        }
        static Ob() {
            Bh();
            return Ah.Ob.call(this)
        }
    }
    ;
    K._$litElement$ = !0;
    K.Ec = !0;
    (0,
    window.litElementPolyfillSupport)?.({
        LitElement: K
    });
    let Bh = ()=>{
        let a;
        ((a = window).litElementVersions ?? (a.litElementVersions = [])).push("4.0.0");
        Bh = ()=>{}
    }
    ;
    var Ch = J`var(--cros-icon-color-primary)`
      , Dh = J`var(--cros-icon-color-secondary)`
      , Eh = J`var(--cros-icon-color-prominent)`
      , Fh = J`var(--cros-focus-ring-color)`
      , Gh = J`var(--cros-separator-color)`
      , Hh = J`var(--cros-ripple-color)`
      , Ih = J`var(--cros-ripple-color-prominent)`
      , Jh = J`var(--cros-ripple-color-prominent-opaque)`
      , Kh = J`var(--cros-calculator-display-bg-color)`
      , Lh = J`var(--cros-calculator-primary-drawer-start-bg-color)`
      , Sh = J`var(--cros-calculator-primary-drawer-end-bg-color)`
      , Th = J`var(--cros-calculator-secondary-drawer-bg-color)`
      , Uh = J`var(--cros-calculator-tertiary-drawer-bg-color)`
      , Vh = J`var(--cros-calculator-numpad-button-color)`
      , Wh = J`var(--cros-calculator-operation-button-color)`
      , Xh = J`var(--cros-calculator-clear-ripple-color)`
      , Yh = J`var(--cros-calculator-error-ripple-color)`
      , Zh = J`var(--cros-calculator-display-text-color)`
      , $h = J`var(--cros-icon-button-toggle-ripple-color-opaque)`
      , ai = J`var(--cros-icon-button-toggle-ripple-color)`
      , bi = J`var(--cros-menu-expanded-ripple-color)`
      , ci = J`var(--cros-menu-ripple-color)`
      , di = J`var(--cros-icon-button-pressed-ripple-color)`
      , ei = J`var(--cros-icon-button-hover-ripple-color)`
      , fi = J`var(--cros-disabled-opacity)`
      , gi = J`var(--cros-ripple-opacity)`
      , hi = J`var(--cros-elevation-2-shadow)`
      , ii = J`var(--cros-button-2-font-family)`
      , ji = J`var(--cros-button-2-font-size)`
      , ki = J`var(--cros-button-2-font-weight)`
      , li = J`var(--cros-button-2-line-height)`;
    var mi = J`
  :host {
    height: 100%;
    display: flex;
    flex-direction: row;
  }
  .handle {
    width: ${30}px;
  }
  .button-grid {
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
  }
  ea-button {
    width: ${48}px;
    height: ${48}px;
    --ea-button-width: ${48}px;
    --ea-button-height: ${48}px;
    --ea-button-border-radius: 50%;
    --mdc-typography-button-font-size: ${30}px;
    --mdc-typography-button-font-weight: 400;
    --ea-button-ripple-color: ${Wh};
    --ea-button-label-color: ${Wh};
  }
  `;
    function ni(a) {
        return null !== a && a instanceof HTMLElement && "none" === window.getComputedStyle(a).touchAction ? a : null
    }
    function oi(a) {
        ni(a.target) && a.preventDefault()
    }
    function pi(a) {
        if ("pen" === a.pointerType || "touch" === a.pointerType) {
            var b = ni(a.target);
            if (b) {
                var c = b.getBoundingClientRect();
                0 > a.offsetX || a.offsetX > c.width || 0 > a.offsetY || a.offsetY > c.height || b.click()
            }
        }
    }
    function qi(a) {
        a.addEventListener("touchstart", oi);
        a.addEventListener("pointerup", pi)
    }
    ;var L = a=>(b,c)=>{
        void 0 !== c ? uh(c, ()=>{
            customElements.define(a, b)
        }
        ) : customElements.define(a, b)
    }
    ;
    /*

 Copyright 2019 Google LLC
 SPDX-License-Identifier: Apache-2.0
*/
    function ri() {
        var a = {
            passive: !0
        };
        return (b,c)=>{
            Object.assign("function" === typeof b ? b : b[c], a)
        }
    }
    ;const si = {
        H: !0,
        type: String,
        Ja: ph,
        A: !1,
        we: qh
    };
    var ti = (a=si,b,c)=>{
        const d = c.kind
          , e = c.metadata;
        let f = th.get(e);
        void 0 === f && th.set(e, f = new Map);
        f.set(c.name, a);
        if ("accessor" === d) {
            const g = c.name;
            return {
                set(k) {
                    const q = b.get.call(this);
                    b.set.call(this, k);
                    wh(this, g, q, a)
                },
                init(k) {
                    void 0 !== k && this.pc(g, void 0, a);
                    return k
                }
            }
        }
        if ("setter" === d) {
            const g = c.name;
            return function(k) {
                const q = this[g];
                b.call(this, k);
                wh(this, g, q, a)
            }
        }
        throw Error(`Unsupported decorator location: ${d}`);
    }
    ;
    function M(a) {
        return (b,c)=>{
            if ("object" === typeof c)
                b = ti(a, b, c);
            else {
                const d = b.hasOwnProperty(c);
                xh(b.constructor, c, d ? {
                    ...a,
                    sh: !0
                } : a);
                b = d ? Object.getOwnPropertyDescriptor(b, c) : void 0
            }
            return b
        }
    }
    ;var ui = (a,b,c)=>{
        c.configurable = !0;
        c.enumerable = !0;
        Reflect.Ri && "object" !== typeof b && Object.defineProperty(a, b, c);
        return c
    }
    ;
    /*

 Copyright 2021 Google LLC
 SPDX-License-Identifier: BSD-3-Clause
*/
    function vi(a) {
        return (b,c)=>{
            const {slot: d, ac: e} = a ?? {}
              , f = `slot${d ? `[name=${d}]` : ":not([name])"}`;
            return ui(b, c, {
                get() {
                    const g = this.Aa?.querySelector(f)?.assignedElements(a) ?? [];
                    return void 0 === e ? g : g.filter(k=>k.matches(e))
                }
            })
        }
    }
    ;function wi() {
        return (a,b)=>ui(a, b, {
            async get() {
                await this.Ea;
                return this.Aa?.querySelector("mwc-ripple") ?? null
            }
        })
    }
    ;function O(a, b) {
        return (c,d,e)=>{
            if (b) {
                const {get: f, set: g} = "object" === typeof d ? c : e ?? (()=>{
                    const k = Symbol();
                    return {
                        get() {
                            return this[k]
                        },
                        set(q) {
                            this[k] = q
                        }
                    }
                }
                )();
                return ui(c, d, {
                    get() {
                        if (b) {
                            let k = f.call(this);
                            void 0 === k && (k = this.Aa?.querySelector(a) ?? null,
                            g.call(this, k));
                            return k
                        }
                        return this.Aa?.querySelector(a) ?? null
                    }
                })
            }
            return ui(c, d, {
                get() {
                    return this.Aa?.querySelector(a) ?? null
                }
            })
        }
    }
    ;function P() {
        return M({
            ...(void 0),
            state: !0,
            H: !1
        })
    }
    ;var xi = a=>(...b)=>({
        _$litDirective$: a,
        values: b
    })
      , yi = class {
        get pa() {
            return this.g.pa
        }
        Of(a, b, c) {
            this.m = a;
            this.g = b;
            this.l = c
        }
        Pf(a, b) {
            return this.update(a, b)
        }
        update(a, b) {
            return this.i(...b)
        }
    }
    ;
    /*

 Copyright 2018 Google LLC
 SPDX-License-Identifier: BSD-3-Clause
*/
    var zi = xi(class extends yi {
        constructor(a) {
            super();
            if (1 !== a.type || "class" !== a.name || 2 < a.strings?.length)
                throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
        }
        i(a) {
            return " " + Object.keys(a).filter(b=>a[b]).join(" ") + " "
        }
        update(a, [b]) {
            if (void 0 === this.h) {
                this.h = new Set;
                void 0 !== a.strings && (this.j = new Set(a.strings.join(" ").split(/\s/).filter(d=>"" !== d)));
                for (const d in b)
                    b[d] && !this.j?.has(d) && this.h.add(d);
                return this.i(b)
            }
            a = a.element.classList;
            for (var c of this.h)
                c in b || (a.remove(c),
                this.h.delete(c));
            for (const d in b)
                c = !!b[d],
                c === this.h.has(d) || this.j?.has(d) || (c ? (a.add(d),
                this.h.add(d)) : (a.remove(d),
                this.h.delete(d)));
            return Fg
        }
    }
    );
    /*

 Copyright 2021 Google LLC
 SPDX-License-Identifier: Apache-2.0
*/
    function Ai(a, b, c) {
        const d = a.constructor;
        if (!c && (c = vh(d, b, `__${b}`),
        !c))
            throw Error("@ariaProperty must be used after a @property decorator");
        const e = c;
        let f = "";
        if (!e.set)
            throw Error(`@ariaProperty requires a setter for ${b}`);
        if (a.Ti)
            return c;
        a = {
            configurable: !0,
            enumerable: !0,
            set(g) {
                if ("" === f) {
                    const k = d.ja.get(b) ?? rh;
                    f = "string" === typeof k.H ? k.H : b
                }
                this.hasAttribute(f) && this.removeAttribute(f);
                e.set.call(this, g)
            }
        };
        e.get && (a.get = function() {
            return e.get.call(this)
        }
        );
        return a
    }
    function Bi(a, b, c) {
        if (void 0 !== b)
            return Ai(a, b, c);
        throw Error("@ariaProperty only supports TypeScript Decorators");
    }
    ;/*

 Copyright 2018 Google LLC
 SPDX-License-Identifier: Apache-2.0
*/
    var Ci = class extends K {
        i() {
            return F`<span><slot></slot></span>`
        }
    }
    ;
    Ci.M = [J(['/**\n * @license\n * Copyright 2018 Google LLC\n * SPDX-License-Identifier: Apache-2.0\n */\n:host {\n  font-family: var(--mdc-icon-font, "Material Icons");\n  font-weight: normal;\n  font-style: normal;\n  font-size: var(--mdc-icon-size, 24px);\n  line-height: 1;\n  letter-spacing: normal;\n  text-transform: none;\n  display: inline-block;\n  white-space: nowrap;\n  word-wrap: normal;\n  direction: ltr;\n  /* Support for all WebKit browsers. */\n  -webkit-font-smoothing: antialiased;\n  /* Support for Safari and Chrome. */\n  text-rendering: optimizeLegibility;\n  /* Support for Firefox. */\n  -moz-osx-font-smoothing: grayscale;\n  /* Support for IE. */\n  font-feature-settings: "liga";\n}\n\n/**\n * @license\n * Copyright 2018 Google LLC\n * SPDX-License-Identifier: Apache-2.0\n */\n'])];
    Ci = t([L("mwc-icon")], Ci);
    var Di = xi(class extends yi {
        constructor(a) {
            super();
            if (1 !== a.type || "style" !== a.name || 2 < a.strings?.length)
                throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
        }
        i(a) {
            return Object.keys(a).reduce((b,c)=>{
                const d = a[c];
                if (null == d)
                    return b;
                c = c.includes("-") ? c : c.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase();
                return b + `${c}:${d};`
            }
            , "")
        }
        update(a, [b]) {
            a = a.element.style;
            void 0 === this.h && (this.h = new Set);
            for (var c of this.h)
                null == b[c] && (this.h.delete(c),
                c.includes("-") ? a.removeProperty(c) : a[c] = null);
            for (const d in b)
                if (c = b[d],
                null != c) {
                    this.h.add(d);
                    const e = "string" === typeof c && c.endsWith(" !important");
                    d.includes("-") || e ? a.setProperty(d, e ? c.slice(0, -11) : c, e ? "important" : "") : a[d] = c
                }
            return Fg
        }
    }
    );
    /*

 Copyright 2016 Google Inc.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/
    var Ei = class {
        static get g() {
            return {}
        }
        static get strings() {
            return {}
        }
        static get h() {
            return {}
        }
        static get i() {
            return {}
        }
        constructor(a={}) {
            this.g = a
        }
        init() {}
        m() {}
    }
    ;
    var Fi = {
        Nd: "mdc-ripple-upgraded--background-focused",
        ec: "mdc-ripple-upgraded--foreground-activation",
        fc: "mdc-ripple-upgraded--foreground-deactivation",
        Ra: "mdc-ripple-upgraded",
        Vd: "mdc-ripple-upgraded--unbounded"
    }
      , Gi = {
        Gf: "--mdc-ripple-fg-scale",
        Hf: "--mdc-ripple-fg-size",
        If: "--mdc-ripple-fg-translate-end",
        Jf: "--mdc-ripple-fg-translate-start",
        Kf: "--mdc-ripple-left",
        Lf: "--mdc-ripple-top"
    }
      , Hi = {
        kf: 225,
        lf: 150,
        mf: .6,
        Af: 10,
        Cf: 300
    };
    const Ii = ["touchstart", "pointerdown", "mousedown", "keydown"]
      , Ji = ["touchend", "pointerup", "mouseup", "contextmenu"];
    let Ki = [];
    function Li() {
        return {
            wc: void 0,
            xe: !1,
            Sb: !1,
            Nc: !1,
            Id: !1,
            Qa: !1
        }
    }
    function Mi(a) {
        const b = R.g.fc
          , c = a.i.Sb;
        !a.i.xe && c || !a.v || (Ni(a),
        a.g.ga(b),
        a.o = setTimeout(()=>{
            a.g.Y(b)
        }
        , Hi.lf))
    }
    function Oi() {
        for (const a of Ii)
            ;
    }
    function Pi(a) {
        a.h = a.g.ib();
        var b = Math.max(a.h.height, a.h.width);
        a.N = a.g.Ya() ? b : Math.sqrt(Math.pow(a.h.width, 2) + Math.pow(a.h.height, 2)) + R.h.Af;
        b = Math.floor(b * R.h.mf);
        a.j = a.g.Ya() && 0 !== b % 2 ? b - 1 : b;
        a.I = `${a.N / a.j}`;
        b = R.strings.Kf;
        const c = R.strings.Lf
          , d = R.strings.Gf;
        a.g.Fa(R.strings.Hf, `${a.j}px`);
        a.g.Fa(d, a.I);
        a.g.Ya() && (a.G = {
            left: Math.round(a.h.width / 2 - a.j / 2),
            top: Math.round(a.h.height / 2 - a.j / 2)
        },
        a.g.Fa(b, `${a.G.left}px`),
        a.g.Fa(c, `${a.G.top}px`))
    }
    function Qi(a) {
        const b = R.strings;
        Object.keys(b).forEach(c=>{
            0 === c.indexOf("VAR_") && a.g.Fa(b[c], null)
        }
        )
    }
    function Ri() {
        for (const a of Ii)
            ;
    }
    function Si() {
        for (const a of Ji)
            ;
    }
    function Ti(a, b) {
        if (!a.g.Ee()) {
            var c = a.i;
            if (!c.Sb) {
                var d = a.R;
                d && void 0 !== b && d.type !== b.type || (c.Sb = !0,
                c.Nc = void 0 === b,
                c.wc = b,
                c.Id = c.Nc ? !1 : void 0 !== b && ("mousedown" === b.type || "touchstart" === b.type || "pointerdown" === b.type),
                void 0 !== b && 0 < Ki.length && Ki.some(()=>!0) ? Ui(a) : (void 0 !== b && (Ki.push(b.target),
                Vi(b)),
                c.Qa = void 0 !== b && "keydown" === b.type ? a.g.Pc() : !0,
                c.Qa && Wi(a),
                requestAnimationFrame(()=>{
                    Ki = [];
                    c.Qa || void 0 === b || " " !== b.key && 32 !== b.keyCode || (c.Qa = void 0 !== b && "keydown" === b.type ? a.g.Pc() : !0,
                    c.Qa && Wi(a));
                    c.Qa || (a.i = Li())
                }
                )))
            }
        }
    }
    function Xi(a) {
        const b = a.i;
        if (b.Sb) {
            var c = {
                ...b
            };
            b.Nc ? (requestAnimationFrame(()=>{
                Yi(a, c)
            }
            ),
            Ui(a)) : (Si(),
            requestAnimationFrame(()=>{
                a.i.xe = !0;
                Yi(a, c);
                Ui(a)
            }
            ))
        }
    }
    function Zi(a) {
        requestAnimationFrame(()=>{
            a.g.ga(R.g.Nd)
        }
        )
    }
    function $i(a) {
        requestAnimationFrame(()=>{
            a.g.Y(R.g.Nd)
        }
        )
    }
    function Vi(a) {
        if ("keydown" !== a.type)
            for (const b of Ji)
                ;
    }
    function Ui(a) {
        a.R = a.i.wc;
        a.i = Li();
        setTimeout(()=>a.R = void 0, R.h.Cf)
    }
    function Wi(a) {
        const b = R.strings.Jf
          , c = R.strings.If
          , d = R.g.fc
          , e = R.g.ec
          , f = R.h.kf;
        Pi(a);
        let g = ""
          , k = "";
        if (!a.g.Ya()) {
            const {mh: q, ng: p} = aj(a);
            g = `${q.x}px, ${q.y}px`;
            k = `${p.x}px, ${p.y}px`
        }
        a.g.Fa(b, g);
        a.g.Fa(c, k);
        clearTimeout(a.l);
        clearTimeout(a.o);
        Ni(a);
        a.g.Y(d);
        a.g.ib();
        a.g.ga(e);
        a.l = setTimeout(()=>{
            a.S()
        }
        , f)
    }
    function aj(a) {
        var b = a.i.wc;
        if (a.i.Id) {
            var c = a.g.te()
              , d = a.g.ib();
            if (b) {
                var e = c.x + d.left;
                c = c.y + d.top;
                "touchstart" === b.type ? (e = b.changedTouches[0].pageX - e,
                b = b.changedTouches[0].pageY - c) : (e = b.pageX - e,
                b = b.pageY - c);
                b = {
                    x: e,
                    y: b
                }
            } else
                b = {
                    x: 0,
                    y: 0
                }
        } else
            b = {
                x: a.h.width / 2,
                y: a.h.height / 2
            };
        b = {
            x: b.x - a.j / 2,
            y: b.y - a.j / 2
        };
        return {
            mh: b,
            ng: {
                x: a.h.width / 2 - a.j / 2,
                y: a.h.height / 2 - a.j / 2
            }
        }
    }
    function Ni(a) {
        a.g.Y(R.g.ec);
        a.v = !1;
        a.g.ib()
    }
    function Yi(a, {Id: b, Qa: c}) {
        (b || c) && Mi(a)
    }
    var R = class extends Ei {
        static get g() {
            return Fi
        }
        static get strings() {
            return Gi
        }
        static get h() {
            return Hi
        }
        static get i() {
            return {
                ga: ()=>{}
                ,
                Xf: ()=>!0,
                ib: ()=>({
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    width: 0,
                    height: 0
                }),
                dg: ()=>!0,
                ig: ()=>{}
                ,
                jg: ()=>{}
                ,
                kg: ()=>{}
                ,
                te: ()=>({
                    x: 0,
                    y: 0
                }),
                Pc: ()=>!0,
                Ee: ()=>!0,
                Ya: ()=>!0,
                eh: ()=>{}
                ,
                fh: ()=>{}
                ,
                gh: ()=>{}
                ,
                Y: ()=>{}
                ,
                Fa: ()=>{}
            }
        }
        constructor(a) {
            super({
                ...R.i,
                ...a
            });
            this.v = !1;
            this.o = this.l = 0;
            this.I = "0";
            this.h = {
                width: 0,
                height: 0
            };
            this.N = this.F = this.j = 0;
            this.G = {
                left: 0,
                top: 0
            };
            this.i = Li();
            this.S = ()=>{
                this.v = !0;
                Mi(this)
            }
        }
        init() {
            Oi();
            const a = R.g.Ra
              , b = R.g.Vd;
            requestAnimationFrame(()=>{
                this.g.ga(a);
                this.g.Ya() && (this.g.ga(b),
                Pi(this))
            }
            )
        }
        m() {
            this.l && (clearTimeout(this.l),
            this.l = 0,
            this.g.Y(R.g.ec));
            this.o && (clearTimeout(this.o),
            this.o = 0,
            this.g.Y(R.g.fc));
            const a = R.g.Ra
              , b = R.g.Vd;
            requestAnimationFrame(()=>{
                this.g.Y(a);
                this.g.Y(b);
                Qi(this)
            }
            );
            Ri();
            Si()
        }
        layout() {
            this.F && cancelAnimationFrame(this.F);
            this.F = requestAnimationFrame(()=>{
                Pi(this);
                this.F = 0
            }
            )
        }
    }
    ;
    function bj(a) {
        return {
            ga: b=>{
                a.classList.add(b)
            }
            ,
            Y: b=>{
                a.classList.remove(b)
            }
            ,
            Jc: b=>a.classList.contains(b)
        }
    }
    const cj = ()=>{}
    ;
    document.addEventListener("x", cj, {
        get passive() {
            return !1
        }
    });
    document.removeEventListener("x", cj);
    var dj = ()=>{
        let a = window.document.activeElement;
        const b = [];
        if (!a)
            return b;
        for (; a; )
            if (b.push(a),
            a.shadowRoot)
                a = a.shadowRoot.activeElement;
            else
                break;
        return b
    }
      , ej = a=>{
        var b = dj();
        if (!b.length)
            return !1;
        b = b[b.length - 1];
        const c = new Event("check-if-focused",{
            bubbles: !0,
            composed: !0
        });
        let d = [];
        const e = f=>{
            d = f.composedPath()
        }
        ;
        document.body.addEventListener("check-if-focused", e);
        b.dispatchEvent(c);
        document.body.removeEventListener("check-if-focused", e);
        return -1 !== d.indexOf(a)
    }
    ;
    var fj = class extends K {
        click() {
            this.K ? (this.K.focus(),
            this.K.click()) : super.click()
        }
        L() {
            void 0 !== this.g && this.g.m();
            this.l && (this.g = new this.l(this.o()),
            this.g.init())
        }
    }
    ;
    /*

 Copyright 2018 Google Inc.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/
    function gj(a, b) {
        a.g ? b() : a.Ea.then(b)
    }
    var hj = class extends fj {
        constructor() {
            super(...arguments);
            this.Nb = this.Mb = this.Gb = this.Rb = this.internalUseStateLayerCustomProperties = this.selected = this.activated = this.disabled = this.unbounded = this.accent = this.primary = !1;
            this.Ed = this.Qc = this.Fd = this.Gd = this.Dc = this.ic = "";
            this.l = R
        }
        get isActive() {
            var a = this.parentElement || this;
            return (a.matches || a.webkitMatchesSelector || a.msMatchesSelector).call(a, ":active")
        }
        o() {
            return {
                Xf: ()=>!0,
                Ya: ()=>this.unbounded,
                Pc: ()=>this.isActive,
                Ee: ()=>this.disabled,
                ga: a=>{
                    switch (a) {
                    case "mdc-ripple-upgraded--background-focused":
                        this.Gb = !0;
                        break;
                    case "mdc-ripple-upgraded--foreground-activation":
                        this.Mb = !0;
                        break;
                    case "mdc-ripple-upgraded--foreground-deactivation":
                        this.Nb = !0
                    }
                }
                ,
                Y: a=>{
                    switch (a) {
                    case "mdc-ripple-upgraded--background-focused":
                        this.Gb = !1;
                        break;
                    case "mdc-ripple-upgraded--foreground-activation":
                        this.Mb = !1;
                        break;
                    case "mdc-ripple-upgraded--foreground-deactivation":
                        this.Nb = !1
                    }
                }
                ,
                dg: ()=>!0,
                fh: ()=>{}
                ,
                jg: ()=>{}
                ,
                eh: ()=>{}
                ,
                ig: ()=>{}
                ,
                gh: ()=>{}
                ,
                kg: ()=>{}
                ,
                Fa: (a,b)=>{
                    switch (a) {
                    case "--mdc-ripple-fg-scale":
                        this.ic = b;
                        break;
                    case "--mdc-ripple-fg-size":
                        this.Dc = b;
                        break;
                    case "--mdc-ripple-fg-translate-end":
                        this.Fd = b;
                        break;
                    case "--mdc-ripple-fg-translate-start":
                        this.Gd = b;
                        break;
                    case "--mdc-ripple-left":
                        this.Qc = b;
                        break;
                    case "--mdc-ripple-top":
                        this.Ed = b
                    }
                }
                ,
                ib: ()=>(this.parentElement || this).getBoundingClientRect(),
                te: ()=>({
                    x: window.pageXOffset,
                    y: window.pageYOffset
                })
            }
        }
        sa(a) {
            gj(this, ()=>{
                Ti(this.g, a)
            }
            )
        }
        ua() {
            gj(this, ()=>{
                Xi(this.g)
            }
            )
        }
        qa() {
            gj(this, ()=>{
                Zi(this.g)
            }
            )
        }
        ka() {
            gj(this, ()=>{
                $i(this.g)
            }
            )
        }
        ra() {
            this.Rb = !0
        }
        Z() {
            this.Rb = !1
        }
        update(a) {
            a.has("disabled") && this.disabled && this.Z();
            super.update(a)
        }
        i() {
            return F`
        <div class="mdc-ripple-surface mdc-ripple-upgraded ${zi({
                "mdc-ripple-surface--accent": this.accent,
                "mdc-ripple-surface--primary--activated": this.activated && (this.primary || !this.accent),
                "mdc-ripple-surface--accent--activated": this.accent && this.activated,
                "mdc-ripple-surface--primary--selected": this.selected && (this.primary || !this.accent),
                "mdc-ripple-surface--accent--selected": this.accent && this.selected,
                "mdc-ripple-surface--disabled": this.disabled,
                "mdc-ripple-surface--hover": this.Rb,
                "mdc-ripple-surface--primary": this.primary,
                "mdc-ripple-surface--selected": this.selected,
                "mdc-ripple-upgraded--background-focused": this.Gb,
                "mdc-ripple-upgraded--foreground-activation": this.Mb,
                "mdc-ripple-upgraded--foreground-deactivation": this.Nb,
                "mdc-ripple-upgraded--unbounded": this.unbounded,
                "mdc-ripple-surface--internal-use-state-layer-custom-properties": this.internalUseStateLayerCustomProperties
            })}"
          style="${Di({
                "--mdc-ripple-fg-scale": this.ic,
                "--mdc-ripple-fg-size": this.Dc,
                "--mdc-ripple-fg-translate-end": this.Fd,
                "--mdc-ripple-fg-translate-start": this.Gd,
                "--mdc-ripple-left": this.Qc,
                "--mdc-ripple-top": this.Ed
            })}"></div>`
        }
    }
    ;
    t([O(".mdc-ripple-surface"), A("design:type", HTMLElement)], hj.prototype, "K", void 0);
    t([M({
        type: Boolean
    }), A("design:type", Object)], hj.prototype, "primary", void 0);
    t([M({
        type: Boolean
    }), A("design:type", Object)], hj.prototype, "accent", void 0);
    t([M({
        type: Boolean
    }), A("design:type", Object)], hj.prototype, "unbounded", void 0);
    t([M({
        type: Boolean
    }), A("design:type", Object)], hj.prototype, "disabled", void 0);
    t([M({
        type: Boolean
    }), A("design:type", Object)], hj.prototype, "activated", void 0);
    t([M({
        type: Boolean
    }), A("design:type", Object)], hj.prototype, "selected", void 0);
    t([M({
        type: Boolean
    }), A("design:type", Object)], hj.prototype, "internalUseStateLayerCustomProperties", void 0);
    t([P(), A("design:type", Object)], hj.prototype, "Rb", void 0);
    t([P(), A("design:type", Object)], hj.prototype, "Gb", void 0);
    t([P(), A("design:type", Object)], hj.prototype, "Mb", void 0);
    t([P(), A("design:type", Object)], hj.prototype, "Nb", void 0);
    t([P(), A("design:type", Object)], hj.prototype, "ic", void 0);
    t([P(), A("design:type", Object)], hj.prototype, "Dc", void 0);
    t([P(), A("design:type", Object)], hj.prototype, "Gd", void 0);
    t([P(), A("design:type", Object)], hj.prototype, "Fd", void 0);
    t([P(), A("design:type", Object)], hj.prototype, "Qc", void 0);
    t([P(), A("design:type", Object)], hj.prototype, "Ed", void 0);
    var ij = class extends hj {
    }
    ;
    ij.M = [J(['/**\n * @license\n * Copyright 2018 Google LLC\n * SPDX-License-Identifier: Apache-2.0\n */\n.mdc-ripple-surface {\n  --mdc-ripple-fg-size: 0;\n  --mdc-ripple-left: 0;\n  --mdc-ripple-top: 0;\n  --mdc-ripple-fg-scale: 1;\n  --mdc-ripple-fg-translate-end: 0;\n  --mdc-ripple-fg-translate-start: 0;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  will-change: transform, opacity;\n  position: relative;\n  outline: none;\n  overflow: hidden;\n}\n.mdc-ripple-surface::before, .mdc-ripple-surface::after {\n  position: absolute;\n  border-radius: 50%;\n  opacity: 0;\n  pointer-events: none;\n  content: "";\n}\n.mdc-ripple-surface::before {\n  transition: opacity 15ms linear, background-color 15ms linear;\n  z-index: 1;\n  /* @alternate */\n  z-index: var(--mdc-ripple-z-index, 1);\n}\n.mdc-ripple-surface::after {\n  z-index: 0;\n  /* @alternate */\n  z-index: var(--mdc-ripple-z-index, 0);\n}\n.mdc-ripple-surface.mdc-ripple-upgraded::before {\n  transform: scale(var(--mdc-ripple-fg-scale, 1));\n}\n.mdc-ripple-surface.mdc-ripple-upgraded::after {\n  top: 0;\n  /* @noflip */ /*rtl:ignore*/\n  left: 0;\n  transform: scale(0);\n  transform-origin: center center;\n}\n.mdc-ripple-surface.mdc-ripple-upgraded--unbounded::after {\n  top: var(--mdc-ripple-top, 0);\n  /* @noflip */ /*rtl:ignore*/\n  left: var(--mdc-ripple-left, 0);\n}\n.mdc-ripple-surface.mdc-ripple-upgraded--foreground-activation::after {\n  animation: mdc-ripple-fg-radius-in 225ms forwards, mdc-ripple-fg-opacity-in 75ms forwards;\n}\n.mdc-ripple-surface.mdc-ripple-upgraded--foreground-deactivation::after {\n  animation: mdc-ripple-fg-opacity-out 150ms;\n  /* @noflip */ /*rtl:ignore*/\n  transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n}\n.mdc-ripple-surface::before, .mdc-ripple-surface::after {\n  top: calc(50% - 100%);\n  /* @noflip */ /*rtl:ignore*/\n  left: calc(50% - 100%);\n  width: 200%;\n  height: 200%;\n}\n.mdc-ripple-surface.mdc-ripple-upgraded::after {\n  width: var(--mdc-ripple-fg-size, 100%);\n  height: var(--mdc-ripple-fg-size, 100%);\n}\n\n.mdc-ripple-surface[data-mdc-ripple-is-unbounded],\n.mdc-ripple-upgraded--unbounded {\n  overflow: visible;\n}\n.mdc-ripple-surface[data-mdc-ripple-is-unbounded]::before, .mdc-ripple-surface[data-mdc-ripple-is-unbounded]::after,\n.mdc-ripple-upgraded--unbounded::before,\n.mdc-ripple-upgraded--unbounded::after {\n  top: calc(50% - 50%);\n  /* @noflip */ /*rtl:ignore*/\n  left: calc(50% - 50%);\n  width: 100%;\n  height: 100%;\n}\n.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::before, .mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::after,\n.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::before,\n.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::after {\n  top: var(--mdc-ripple-top, calc(50% - 50%));\n  /* @noflip */ /*rtl:ignore*/\n  left: var(--mdc-ripple-left, calc(50% - 50%));\n  width: var(--mdc-ripple-fg-size, 100%);\n  height: var(--mdc-ripple-fg-size, 100%);\n}\n.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::after,\n.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::after {\n  width: var(--mdc-ripple-fg-size, 100%);\n  height: var(--mdc-ripple-fg-size, 100%);\n}\n\n.mdc-ripple-surface::before, .mdc-ripple-surface::after {\n  background-color: #000;\n  /* @alternate */\n  background-color: var(--mdc-ripple-color, #000);\n}\n.mdc-ripple-surface:hover::before, .mdc-ripple-surface.mdc-ripple-surface--hover::before {\n  opacity: 0.04;\n  /* @alternate */\n  opacity: var(--mdc-ripple-hover-opacity, 0.04);\n}\n.mdc-ripple-surface.mdc-ripple-upgraded--background-focused::before, .mdc-ripple-surface:not(.mdc-ripple-upgraded):focus::before {\n  transition-duration: 75ms;\n  opacity: 0.12;\n  /* @alternate */\n  opacity: var(--mdc-ripple-focus-opacity, 0.12);\n}\n.mdc-ripple-surface:not(.mdc-ripple-upgraded)::after {\n  transition: opacity 150ms linear;\n}\n.mdc-ripple-surface:not(.mdc-ripple-upgraded):active::after {\n  transition-duration: 75ms;\n  opacity: 0.12;\n  /* @alternate */\n  opacity: var(--mdc-ripple-press-opacity, 0.12);\n}\n.mdc-ripple-surface.mdc-ripple-upgraded {\n  --mdc-ripple-fg-opacity: var(--mdc-ripple-press-opacity, 0.12);\n}\n\n@keyframes mdc-ripple-fg-radius-in {\n  from {\n    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n    /* @noflip */ /*rtl:ignore*/\n    transform: translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1);\n  }\n  to {\n    /* @noflip */ /*rtl:ignore*/\n    transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n  }\n}\n@keyframes mdc-ripple-fg-opacity-in {\n  from {\n    animation-timing-function: linear;\n    opacity: 0;\n  }\n  to {\n    opacity: var(--mdc-ripple-fg-opacity, 0);\n  }\n}\n@keyframes mdc-ripple-fg-opacity-out {\n  from {\n    animation-timing-function: linear;\n    opacity: var(--mdc-ripple-fg-opacity, 0);\n  }\n  to {\n    opacity: 0;\n  }\n}\n:host {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  pointer-events: none;\n  display: block;\n}\n:host .mdc-ripple-surface {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  pointer-events: none;\n  will-change: unset;\n}\n\n.mdc-ripple-surface--primary::before, .mdc-ripple-surface--primary::after {\n  background-color: #6200ee;\n  /* @alternate */\n  background-color: var(--mdc-ripple-color, var(--mdc-theme-primary, #6200ee));\n}\n.mdc-ripple-surface--primary:hover::before, .mdc-ripple-surface--primary.mdc-ripple-surface--hover::before {\n  opacity: 0.04;\n  /* @alternate */\n  opacity: var(--mdc-ripple-hover-opacity, 0.04);\n}\n.mdc-ripple-surface--primary.mdc-ripple-upgraded--background-focused::before, .mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):focus::before {\n  transition-duration: 75ms;\n  opacity: 0.12;\n  /* @alternate */\n  opacity: var(--mdc-ripple-focus-opacity, 0.12);\n}\n.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded)::after {\n  transition: opacity 150ms linear;\n}\n.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):active::after {\n  transition-duration: 75ms;\n  opacity: 0.12;\n  /* @alternate */\n  opacity: var(--mdc-ripple-press-opacity, 0.12);\n}\n.mdc-ripple-surface--primary.mdc-ripple-upgraded {\n  --mdc-ripple-fg-opacity: var(--mdc-ripple-press-opacity, 0.12);\n}\n.mdc-ripple-surface--primary--activated::before {\n  opacity: 0.12;\n  /* @alternate */\n  opacity: var(--mdc-ripple-activated-opacity, 0.12);\n}\n.mdc-ripple-surface--primary--activated::before, .mdc-ripple-surface--primary--activated::after {\n  background-color: #6200ee;\n  /* @alternate */\n  background-color: var(--mdc-ripple-color, var(--mdc-theme-primary, #6200ee));\n}\n.mdc-ripple-surface--primary--activated:hover::before, .mdc-ripple-surface--primary--activated.mdc-ripple-surface--hover::before {\n  opacity: 0.16;\n  /* @alternate */\n  opacity: var(--mdc-ripple-hover-opacity, 0.16);\n}\n.mdc-ripple-surface--primary--activated.mdc-ripple-upgraded--background-focused::before, .mdc-ripple-surface--primary--activated:not(.mdc-ripple-upgraded):focus::before {\n  transition-duration: 75ms;\n  opacity: 0.24;\n  /* @alternate */\n  opacity: var(--mdc-ripple-focus-opacity, 0.24);\n}\n.mdc-ripple-surface--primary--activated:not(.mdc-ripple-upgraded)::after {\n  transition: opacity 150ms linear;\n}\n.mdc-ripple-surface--primary--activated:not(.mdc-ripple-upgraded):active::after {\n  transition-duration: 75ms;\n  opacity: 0.24;\n  /* @alternate */\n  opacity: var(--mdc-ripple-press-opacity, 0.24);\n}\n.mdc-ripple-surface--primary--activated.mdc-ripple-upgraded {\n  --mdc-ripple-fg-opacity: var(--mdc-ripple-press-opacity, 0.24);\n}\n.mdc-ripple-surface--primary--selected::before {\n  opacity: 0.08;\n  /* @alternate */\n  opacity: var(--mdc-ripple-selected-opacity, 0.08);\n}\n.mdc-ripple-surface--primary--selected::before, .mdc-ripple-surface--primary--selected::after {\n  background-color: #6200ee;\n  /* @alternate */\n  background-color: var(--mdc-ripple-color, var(--mdc-theme-primary, #6200ee));\n}\n.mdc-ripple-surface--primary--selected:hover::before, .mdc-ripple-surface--primary--selected.mdc-ripple-surface--hover::before {\n  opacity: 0.12;\n  /* @alternate */\n  opacity: var(--mdc-ripple-hover-opacity, 0.12);\n}\n.mdc-ripple-surface--primary--selected.mdc-ripple-upgraded--background-focused::before, .mdc-ripple-surface--primary--selected:not(.mdc-ripple-upgraded):focus::before {\n  transition-duration: 75ms;\n  opacity: 0.2;\n  /* @alternate */\n  opacity: var(--mdc-ripple-focus-opacity, 0.2);\n}\n.mdc-ripple-surface--primary--selected:not(.mdc-ripple-upgraded)::after {\n  transition: opacity 150ms linear;\n}\n.mdc-ripple-surface--primary--selected:not(.mdc-ripple-upgraded):active::after {\n  transition-duration: 75ms;\n  opacity: 0.2;\n  /* @alternate */\n  opacity: var(--mdc-ripple-press-opacity, 0.2);\n}\n.mdc-ripple-surface--primary--selected.mdc-ripple-upgraded {\n  --mdc-ripple-fg-opacity: var(--mdc-ripple-press-opacity, 0.2);\n}\n\n.mdc-ripple-surface--accent::before, .mdc-ripple-surface--accent::after {\n  background-color: #018786;\n  /* @alternate */\n  background-color: var(--mdc-ripple-color, var(--mdc-theme-secondary, #018786));\n}\n.mdc-ripple-surface--accent:hover::before, .mdc-ripple-surface--accent.mdc-ripple-surface--hover::before {\n  opacity: 0.04;\n  /* @alternate */\n  opacity: var(--mdc-ripple-hover-opacity, 0.04);\n}\n.mdc-ripple-surface--accent.mdc-ripple-upgraded--background-focused::before, .mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):focus::before {\n  transition-duration: 75ms;\n  opacity: 0.12;\n  /* @alternate */\n  opacity: var(--mdc-ripple-focus-opacity, 0.12);\n}\n.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded)::after {\n  transition: opacity 150ms linear;\n}\n.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):active::after {\n  transition-duration: 75ms;\n  opacity: 0.12;\n  /* @alternate */\n  opacity: var(--mdc-ripple-press-opacity, 0.12);\n}\n.mdc-ripple-surface--accent.mdc-ripple-upgraded {\n  --mdc-ripple-fg-opacity: var(--mdc-ripple-press-opacity, 0.12);\n}\n.mdc-ripple-surface--accent--activated::before {\n  opacity: 0.12;\n  /* @alternate */\n  opacity: var(--mdc-ripple-activated-opacity, 0.12);\n}\n.mdc-ripple-surface--accent--activated::before, .mdc-ripple-surface--accent--activated::after {\n  background-color: #018786;\n  /* @alternate */\n  background-color: var(--mdc-ripple-color, var(--mdc-theme-secondary, #018786));\n}\n.mdc-ripple-surface--accent--activated:hover::before, .mdc-ripple-surface--accent--activated.mdc-ripple-surface--hover::before {\n  opacity: 0.16;\n  /* @alternate */\n  opacity: var(--mdc-ripple-hover-opacity, 0.16);\n}\n.mdc-ripple-surface--accent--activated.mdc-ripple-upgraded--background-focused::before, .mdc-ripple-surface--accent--activated:not(.mdc-ripple-upgraded):focus::before {\n  transition-duration: 75ms;\n  opacity: 0.24;\n  /* @alternate */\n  opacity: var(--mdc-ripple-focus-opacity, 0.24);\n}\n.mdc-ripple-surface--accent--activated:not(.mdc-ripple-upgraded)::after {\n  transition: opacity 150ms linear;\n}\n.mdc-ripple-surface--accent--activated:not(.mdc-ripple-upgraded):active::after {\n  transition-duration: 75ms;\n  opacity: 0.24;\n  /* @alternate */\n  opacity: var(--mdc-ripple-press-opacity, 0.24);\n}\n.mdc-ripple-surface--accent--activated.mdc-ripple-upgraded {\n  --mdc-ripple-fg-opacity: var(--mdc-ripple-press-opacity, 0.24);\n}\n.mdc-ripple-surface--accent--selected::before {\n  opacity: 0.08;\n  /* @alternate */\n  opacity: var(--mdc-ripple-selected-opacity, 0.08);\n}\n.mdc-ripple-surface--accent--selected::before, .mdc-ripple-surface--accent--selected::after {\n  background-color: #018786;\n  /* @alternate */\n  background-color: var(--mdc-ripple-color, var(--mdc-theme-secondary, #018786));\n}\n.mdc-ripple-surface--accent--selected:hover::before, .mdc-ripple-surface--accent--selected.mdc-ripple-surface--hover::before {\n  opacity: 0.12;\n  /* @alternate */\n  opacity: var(--mdc-ripple-hover-opacity, 0.12);\n}\n.mdc-ripple-surface--accent--selected.mdc-ripple-upgraded--background-focused::before, .mdc-ripple-surface--accent--selected:not(.mdc-ripple-upgraded):focus::before {\n  transition-duration: 75ms;\n  opacity: 0.2;\n  /* @alternate */\n  opacity: var(--mdc-ripple-focus-opacity, 0.2);\n}\n.mdc-ripple-surface--accent--selected:not(.mdc-ripple-upgraded)::after {\n  transition: opacity 150ms linear;\n}\n.mdc-ripple-surface--accent--selected:not(.mdc-ripple-upgraded):active::after {\n  transition-duration: 75ms;\n  opacity: 0.2;\n  /* @alternate */\n  opacity: var(--mdc-ripple-press-opacity, 0.2);\n}\n.mdc-ripple-surface--accent--selected.mdc-ripple-upgraded {\n  --mdc-ripple-fg-opacity: var(--mdc-ripple-press-opacity, 0.2);\n}\n\n.mdc-ripple-surface--disabled {\n  opacity: 0;\n}\n\n.mdc-ripple-surface--internal-use-state-layer-custom-properties::before, .mdc-ripple-surface--internal-use-state-layer-custom-properties::after {\n  background-color: #000;\n  /* @alternate */\n  background-color: var(--mdc-ripple-hover-state-layer-color, #000);\n}\n.mdc-ripple-surface--internal-use-state-layer-custom-properties:hover::before, .mdc-ripple-surface--internal-use-state-layer-custom-properties.mdc-ripple-surface--hover::before {\n  opacity: 0.04;\n  /* @alternate */\n  opacity: var(--mdc-ripple-hover-state-layer-opacity, 0.04);\n}\n.mdc-ripple-surface--internal-use-state-layer-custom-properties.mdc-ripple-upgraded--background-focused::before, .mdc-ripple-surface--internal-use-state-layer-custom-properties:not(.mdc-ripple-upgraded):focus::before {\n  transition-duration: 75ms;\n  opacity: 0.12;\n  /* @alternate */\n  opacity: var(--mdc-ripple-focus-state-layer-opacity, 0.12);\n}\n.mdc-ripple-surface--internal-use-state-layer-custom-properties:not(.mdc-ripple-upgraded)::after {\n  transition: opacity 150ms linear;\n}\n.mdc-ripple-surface--internal-use-state-layer-custom-properties:not(.mdc-ripple-upgraded):active::after {\n  transition-duration: 75ms;\n  opacity: 0.12;\n  /* @alternate */\n  opacity: var(--mdc-ripple-pressed-state-layer-opacity, 0.12);\n}\n.mdc-ripple-surface--internal-use-state-layer-custom-properties.mdc-ripple-upgraded {\n  --mdc-ripple-fg-opacity: var(--mdc-ripple-pressed-state-layer-opacity, 0.12);\n}\n'])];
    ij = t([L("mwc-ripple")], ij);
    var jj = class {
        constructor(a) {
            this.sa = b=>{
                a().then(c=>{
                    c && c.sa(b)
                }
                )
            }
            ;
            this.ua = ()=>{
                a().then(b=>{
                    b && b.ua()
                }
                )
            }
            ;
            this.qa = ()=>{
                a().then(b=>{
                    b && b.qa()
                }
                )
            }
            ;
            this.ka = ()=>{
                a().then(b=>{
                    b && b.ka()
                }
                )
            }
            ;
            this.ra = ()=>{
                a().then(b=>{
                    b && b.ra()
                }
                )
            }
            ;
            this.Z = ()=>{
                a().then(b=>{
                    b && b.Z()
                }
                )
            }
        }
    }
    ;
    function kj(a) {
        return F`
    <mwc-icon class="mdc-button__icon">
      ${a.icon}
    </mwc-icon>`
    }
    var lj = class extends K {
        constructor() {
            super(...arguments);
            this.fullwidth = this.trailingIcon = this.disabled = this.dense = this.outlined = this.unelevated = this.raised = !1;
            this.label = this.icon = "";
            this.jc = this.expandContent = !1;
            this.g = new jj(()=>{
                this.jc = !0;
                return this.nf
            }
            )
        }
        focus() {
            const a = this.Od;
            a && (this.g.qa(),
            a.focus())
        }
        blur() {
            const a = this.Od;
            a && (this.g.ka(),
            a.blur())
        }
        i() {
            var a = zi({
                "mdc-button--raised": this.raised,
                "mdc-button--unelevated": this.unelevated,
                "mdc-button--outlined": this.outlined,
                "mdc-button--dense": this.dense
            });
            const b = this.raised || this.unelevated;
            return F`
      <button
          id="button"
          class="mdc-button ${a}"
          ?disabled="${this.disabled}"
          aria-label="${this.label || this.icon}"
          aria-haspopup="${this.ariaHasPopup ?? I}"
          @focus="${this.v}"
          @blur="${this.o}"
          @mousedown="${this.Ic}"
          @mouseenter="${this.G}"
          @mouseleave="${this.I}"
          @touchstart="${this.Ic}"
          @touchend="${this.l}"
          @touchcancel="${this.l}">
        ${F``}
        ${this.jc ? F`<mwc-ripple class="ripple" .primary="${!b}" .disabled="${this.disabled}"></mwc-ripple>` : ""}
        <span class="leading-icon">
          <slot name="icon">
            ${this.icon && !this.trailingIcon ? kj(this) : ""}
          </slot>
        </span>
        <span class="mdc-button__label">${this.label}</span>
        <span class="slot-container ${zi({
                flex: this.expandContent
            })}">
          <slot></slot>
        </span>
        <span class="trailing-icon">
          <slot name="trailingIcon">
            ${this.icon && this.trailingIcon ? kj(this) : ""}
          </slot>
        </span>
      </button>`
        }
        Ic(a) {
            const b = ()=>{
                window.removeEventListener("mouseup", b);
                this.l()
            }
            ;
            window.addEventListener("mouseup", b);
            this.g.sa(a)
        }
        l() {
            this.g.ua()
        }
        G() {
            this.g.ra()
        }
        I() {
            this.g.Z()
        }
        v() {
            this.g.qa()
        }
        o() {
            this.g.ka()
        }
    }
    ;
    t([Bi, M({
        type: String,
        H: "aria-haspopup"
    }), A("design:type", String)], lj.prototype, "ariaHasPopup", void 0);
    t([M({
        type: Boolean,
        A: !0
    }), A("design:type", Object)], lj.prototype, "raised", void 0);
    t([M({
        type: Boolean,
        A: !0
    }), A("design:type", Object)], lj.prototype, "unelevated", void 0);
    t([M({
        type: Boolean,
        A: !0
    }), A("design:type", Object)], lj.prototype, "outlined", void 0);
    t([M({
        type: Boolean
    }), A("design:type", Object)], lj.prototype, "dense", void 0);
    t([M({
        type: Boolean,
        A: !0
    }), A("design:type", Object)], lj.prototype, "disabled", void 0);
    t([M({
        type: Boolean,
        H: "trailingicon"
    }), A("design:type", Object)], lj.prototype, "trailingIcon", void 0);
    t([M({
        type: Boolean,
        A: !0
    }), A("design:type", Object)], lj.prototype, "fullwidth", void 0);
    t([M({
        type: String
    }), A("design:type", Object)], lj.prototype, "icon", void 0);
    t([M({
        type: String
    }), A("design:type", Object)], lj.prototype, "label", void 0);
    t([M({
        type: Boolean
    }), A("design:type", Object)], lj.prototype, "expandContent", void 0);
    t([O("#button"), A("design:type", HTMLElement)], lj.prototype, "Od", void 0);
    t([wi(), A("design:type", Promise)], lj.prototype, "nf", void 0);
    t([P(), A("design:type", Object)], lj.prototype, "jc", void 0);
    t([ri(), A("design:type", Function), A("design:paramtypes", [Event]), A("design:returntype")], lj.prototype, "Ic", null);
    var mj = class extends lj {
    }
    ;
    mj.M = [J(['.mdc-button {\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-family: Roboto, sans-serif;\n  /* @alternate */\n  font-family: var(--mdc-typography-button-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));\n  font-size: 0.875rem;\n  /* @alternate */\n  font-size: var(--mdc-typography-button-font-size, 0.875rem);\n  line-height: 2.25rem;\n  /* @alternate */\n  line-height: var(--mdc-typography-button-line-height, 2.25rem);\n  font-weight: 500;\n  /* @alternate */\n  font-weight: var(--mdc-typography-button-font-weight, 500);\n  letter-spacing: 0.0892857143em;\n  /* @alternate */\n  letter-spacing: var(--mdc-typography-button-letter-spacing, 0.0892857143em);\n  text-decoration: none;\n  /* @alternate */\n  text-decoration: var(--mdc-typography-button-text-decoration, none);\n  text-transform: uppercase;\n  /* @alternate */\n  text-transform: var(--mdc-typography-button-text-transform, uppercase);\n}\n\n.mdc-button {\n  /* @alternate */\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n  min-width: 64px;\n  border: none;\n  outline: none;\n  /* @alternate */\n  line-height: inherit;\n  user-select: none;\n  -webkit-appearance: none;\n  overflow: visible;\n  vertical-align: middle;\n  background: transparent;\n}\n.mdc-button .mdc-elevation-overlay {\n  width: 100%;\n  height: 100%;\n  top: 0;\n  /* @noflip */ /*rtl:ignore*/\n  left: 0;\n}\n.mdc-button::-moz-focus-inner {\n  padding: 0;\n  border: 0;\n}\n.mdc-button:active {\n  outline: none;\n}\n.mdc-button:hover {\n  cursor: pointer;\n}\n.mdc-button:disabled {\n  cursor: default;\n  pointer-events: none;\n}\n.mdc-button[hidden] {\n  display: none;\n}\n.mdc-button .mdc-button__icon { /* @noflip */ /*rtl:ignore*/\n  margin-left: 0;\n  /* @noflip */ /*rtl:ignore*/\n  margin-right: 8px;\n  display: inline-block;\n  position: relative;\n  vertical-align: top;\n}\n[dir=rtl] .mdc-button .mdc-button__icon, .mdc-button .mdc-button__icon[dir=rtl] {\n  /*rtl:begin:ignore*/\n  /* @noflip */ /*rtl:ignore*/\n  margin-left: 8px;\n  /* @noflip */ /*rtl:ignore*/\n  margin-right: 0;\n  /*rtl:end:ignore*/\n}\n\n.mdc-button .mdc-button__progress-indicator {\n  font-size: 0;\n  position: absolute;\n  /* @noflip */ /*rtl:ignore*/\n  transform: translate(-50%, -50%);\n  top: 50%;\n  /* @noflip */ /*rtl:ignore*/\n  left: 50%;\n  line-height: initial;\n}\n.mdc-button .mdc-button__label {\n  position: relative;\n}\n.mdc-button .mdc-button__focus-ring {\n  pointer-events: none;\n  border: 2px solid transparent;\n  border-radius: 6px;\n  box-sizing: content-box;\n  position: absolute;\n  top: 50%;\n  /* @noflip */ /*rtl:ignore*/\n  left: 50%;\n  /* @noflip */ /*rtl:ignore*/\n  transform: translate(-50%, -50%);\n  height: calc(100% + 4px);\n  width: calc(100% + 4px);\n  display: none;\n}\n@media screen and (forced-colors: active) {\n  .mdc-button .mdc-button__focus-ring {\n    border-color: CanvasText;\n  }\n}\n.mdc-button .mdc-button__focus-ring::after {\n  content: "";\n  border: 2px solid transparent;\n  border-radius: 8px;\n  display: block;\n  position: absolute;\n  top: 50%;\n  /* @noflip */ /*rtl:ignore*/\n  left: 50%;\n  /* @noflip */ /*rtl:ignore*/\n  transform: translate(-50%, -50%);\n  height: calc(100% + 4px);\n  width: calc(100% + 4px);\n}\n@media screen and (forced-colors: active) {\n  .mdc-button .mdc-button__focus-ring::after {\n    border-color: CanvasText;\n  }\n}\n@media screen and (forced-colors: active) {\n  .mdc-button.mdc-ripple-upgraded--background-focused .mdc-button__focus-ring, .mdc-button:not(.mdc-ripple-upgraded):focus .mdc-button__focus-ring {\n    display: block;\n  }\n}\n.mdc-button .mdc-button__touch {\n  position: absolute;\n  top: 50%;\n  height: 48px;\n  left: 0;\n  right: 0;\n  transform: translateY(-50%);\n}\n\n.mdc-button__label + .mdc-button__icon {\n  /* @noflip */ /*rtl:ignore*/\n  margin-left: 8px;\n  /* @noflip */ /*rtl:ignore*/\n  margin-right: 0;\n}\n[dir=rtl] .mdc-button__label + .mdc-button__icon, .mdc-button__label + .mdc-button__icon[dir=rtl] {\n  /*rtl:begin:ignore*/\n  /* @noflip */ /*rtl:ignore*/\n  margin-left: 0;\n  /* @noflip */ /*rtl:ignore*/\n  margin-right: 8px;\n  /*rtl:end:ignore*/\n}\n\nsvg.mdc-button__icon {\n  fill: currentColor;\n}\n\n.mdc-button--touch {\n  margin-top: 6px;\n  margin-bottom: 6px;\n}\n\n.mdc-button {\n  padding: 0 8px 0 8px;\n}\n\n.mdc-button--unelevated {\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n  padding: 0 16px 0 16px;\n}\n.mdc-button--unelevated.mdc-button--icon-trailing {\n  padding: 0 12px 0 16px;\n}\n.mdc-button--unelevated.mdc-button--icon-leading {\n  padding: 0 16px 0 12px;\n}\n\n.mdc-button--raised {\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n  padding: 0 16px 0 16px;\n}\n.mdc-button--raised.mdc-button--icon-trailing {\n  padding: 0 12px 0 16px;\n}\n.mdc-button--raised.mdc-button--icon-leading {\n  padding: 0 16px 0 12px;\n}\n\n.mdc-button--outlined {\n  border-style: solid;\n  transition: border 280ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.mdc-button--outlined .mdc-button__ripple {\n  border-style: solid;\n  border-color: transparent;\n}\n\n.mdc-button {\n  height: 36px;\n  border-radius: 4px;\n  /* @alternate */\n  border-radius: var(--mdc-shape-small, 4px);\n}\n.mdc-button:not(:disabled) {\n  color: #6200ee;\n  /* @alternate */\n  color: var(--mdc-theme-primary, #6200ee);\n}\n.mdc-button:disabled {\n  color: rgba(0, 0, 0, 0.38);\n}\n.mdc-button .mdc-button__icon {\n  font-size: 1.125rem;\n  width: 1.125rem;\n  height: 1.125rem;\n}\n.mdc-button .mdc-button__ripple {\n  border-radius: 4px;\n  /* @alternate */\n  border-radius: var(--mdc-shape-small, 4px);\n}\n.mdc-button--raised,\n.mdc-button--unelevated {\n  height: 36px;\n  border-radius: 4px;\n  /* @alternate */\n  border-radius: var(--mdc-shape-small, 4px);\n}\n.mdc-button--raised:not(:disabled),\n.mdc-button--unelevated:not(:disabled) {\n  background-color: #6200ee;\n  /* @alternate */\n  background-color: var(--mdc-theme-primary, #6200ee);\n}\n.mdc-button--raised:disabled,\n.mdc-button--unelevated:disabled {\n  background-color: rgba(0, 0, 0, 0.12);\n}\n.mdc-button--raised:not(:disabled),\n.mdc-button--unelevated:not(:disabled) {\n  color: #fff;\n  /* @alternate */\n  color: var(--mdc-theme-on-primary, #fff);\n}\n.mdc-button--raised:disabled,\n.mdc-button--unelevated:disabled {\n  color: rgba(0, 0, 0, 0.38);\n}\n.mdc-button--raised .mdc-button__icon,\n.mdc-button--unelevated .mdc-button__icon {\n  font-size: 1.125rem;\n  width: 1.125rem;\n  height: 1.125rem;\n}\n.mdc-button--raised .mdc-button__ripple,\n.mdc-button--unelevated .mdc-button__ripple {\n  border-radius: 4px;\n  /* @alternate */\n  border-radius: var(--mdc-shape-small, 4px);\n}\n.mdc-button--outlined {\n  height: 36px;\n  border-radius: 4px;\n  /* @alternate */\n  border-radius: var(--mdc-shape-small, 4px);\n  padding: 0 15px 0 15px;\n  border-width: 1px;\n}\n.mdc-button--outlined:not(:disabled) {\n  color: #6200ee;\n  /* @alternate */\n  color: var(--mdc-theme-primary, #6200ee);\n}\n.mdc-button--outlined:disabled {\n  color: rgba(0, 0, 0, 0.38);\n}\n.mdc-button--outlined .mdc-button__icon {\n  font-size: 1.125rem;\n  width: 1.125rem;\n  height: 1.125rem;\n}\n.mdc-button--outlined .mdc-button__ripple {\n  border-radius: 4px;\n  /* @alternate */\n  border-radius: var(--mdc-shape-small, 4px);\n}\n.mdc-button--outlined:not(:disabled) {\n  border-color: rgba(0, 0, 0, 0.12);\n}\n.mdc-button--outlined:disabled {\n  border-color: rgba(0, 0, 0, 0.12);\n}\n.mdc-button--outlined.mdc-button--icon-trailing {\n  padding: 0 11px 0 15px;\n}\n.mdc-button--outlined.mdc-button--icon-leading {\n  padding: 0 15px 0 11px;\n}\n.mdc-button--outlined .mdc-button__ripple {\n  top: -1px;\n  left: -1px;\n  bottom: -1px;\n  right: -1px;\n  border-width: 1px;\n}\n.mdc-button--outlined .mdc-button__touch {\n  left: calc(-1 * 1px);\n  width: calc(100% + 2 * 1px);\n}\n\n.mdc-button--raised {\n  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.mdc-button--raised:hover, .mdc-button--raised:focus {\n  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);\n}\n.mdc-button--raised:active {\n  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);\n}\n.mdc-button--raised:disabled {\n  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);\n}\n\n:host {\n  display: inline-flex;\n  outline: none;\n  -webkit-tap-highlight-color: transparent;\n  /**\n   * Override vertical-align with shortest value "top". Vertical-align\'s default\n   * "baseline" value causes buttons to be misaligned next to each other if one\n   * button has an icon and the other does not.\n   */\n  vertical-align: top;\n}\n\n:host([fullwidth]) {\n  width: 100%;\n}\n\n:host([raised]),\n:host([unelevated]) {\n  --mdc-ripple-color: #fff;\n  --mdc-ripple-focus-opacity: 0.24;\n  --mdc-ripple-hover-opacity: 0.08;\n  --mdc-ripple-press-opacity: 0.24;\n}\n\n.trailing-icon ::slotted(*),\n.trailing-icon .mdc-button__icon,\n.leading-icon ::slotted(*),\n.leading-icon .mdc-button__icon {\n  /* @noflip */ /*rtl:ignore*/\n  margin-left: 0;\n  /* @noflip */ /*rtl:ignore*/\n  margin-right: 8px;\n  display: inline-block;\n  position: relative;\n  vertical-align: top;\n  font-size: 1.125rem;\n  height: 1.125rem;\n  width: 1.125rem;\n}\n[dir=rtl] .trailing-icon ::slotted(*), [dir=rtl] .trailing-icon .mdc-button__icon, [dir=rtl] .leading-icon ::slotted(*), [dir=rtl] .leading-icon .mdc-button__icon, .trailing-icon ::slotted(*[dir=rtl]), .trailing-icon .mdc-button__icon[dir=rtl], .leading-icon ::slotted(*[dir=rtl]), .leading-icon .mdc-button__icon[dir=rtl] {\n  /*rtl:begin:ignore*/\n  /* @noflip */ /*rtl:ignore*/\n  margin-left: 8px;\n  /* @noflip */ /*rtl:ignore*/\n  margin-right: 0;\n  /*rtl:end:ignore*/\n}\n\n.trailing-icon ::slotted(*),\n.trailing-icon .mdc-button__icon {\n  /* @noflip */ /*rtl:ignore*/\n  margin-left: 8px;\n  /* @noflip */ /*rtl:ignore*/\n  margin-right: 0;\n}\n[dir=rtl] .trailing-icon ::slotted(*), [dir=rtl] .trailing-icon .mdc-button__icon, .trailing-icon ::slotted(*[dir=rtl]), .trailing-icon .mdc-button__icon[dir=rtl] {\n  /*rtl:begin:ignore*/\n  /* @noflip */ /*rtl:ignore*/\n  margin-left: 0;\n  /* @noflip */ /*rtl:ignore*/\n  margin-right: 8px;\n  /*rtl:end:ignore*/\n}\n\n.slot-container {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n.slot-container.flex {\n  flex: auto;\n}\n\n.mdc-button {\n  flex: auto;\n  overflow: hidden;\n  /* @noflip */ /*rtl:ignore*/\n  padding-left: 8px;\n  /* @alternate */\n  /* @noflip */ /*rtl:ignore*/\n  padding-left: var(--mdc-button-horizontal-padding, 8px);\n  /* @noflip */ /*rtl:ignore*/\n  padding-right: 8px;\n  /* @alternate */\n  /* @noflip */ /*rtl:ignore*/\n  padding-right: var(--mdc-button-horizontal-padding, 8px);\n}\n\n.mdc-button--raised {\n  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);\n  /* @alternate */\n  box-shadow: var(--mdc-button-raised-box-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));\n}\n.mdc-button--raised:focus {\n  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);\n  /* @alternate */\n  box-shadow: var(--mdc-button-raised-box-shadow-focus, var(--mdc-button-raised-box-shadow-hover, 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)));\n}\n.mdc-button--raised:hover {\n  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);\n  /* @alternate */\n  box-shadow: var(--mdc-button-raised-box-shadow-hover, 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12));\n}\n.mdc-button--raised:active {\n  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);\n  /* @alternate */\n  box-shadow: var(--mdc-button-raised-box-shadow-active, 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12));\n}\n.mdc-button--raised:disabled {\n  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);\n  /* @alternate */\n  box-shadow: var(--mdc-button-raised-box-shadow-disabled, 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12));\n}\n\n.mdc-button--raised,\n.mdc-button--unelevated {\n  /* @noflip */ /*rtl:ignore*/\n  padding-left: 16px;\n  /* @alternate */\n  /* @noflip */ /*rtl:ignore*/\n  padding-left: var(--mdc-button-horizontal-padding, 16px);\n  /* @noflip */ /*rtl:ignore*/\n  padding-right: 16px;\n  /* @alternate */\n  /* @noflip */ /*rtl:ignore*/\n  padding-right: var(--mdc-button-horizontal-padding, 16px);\n}\n\n.mdc-button--outlined {\n  border-width: 1px;\n  /* @alternate */\n  border-width: var(--mdc-button-outline-width, 1px);\n  /* @noflip */ /*rtl:ignore*/\n  padding-left: calc(16px - 1px);\n  /* @alternate */\n  /* @noflip */ /*rtl:ignore*/\n  padding-left: calc(var(--mdc-button-horizontal-padding, 16px) - var(--mdc-button-outline-width, 1px));\n  /* @noflip */ /*rtl:ignore*/\n  padding-right: calc(16px - 1px);\n  /* @alternate */\n  /* @noflip */ /*rtl:ignore*/\n  padding-right: calc(var(--mdc-button-horizontal-padding, 16px) - var(--mdc-button-outline-width, 1px));\n}\n.mdc-button--outlined:not(:disabled) {\n  border-color: rgba(0, 0, 0, 0.12);\n  /* @alternate */\n  border-color: var(--mdc-button-outline-color, rgba(0, 0, 0, 0.12));\n}\n.mdc-button--outlined .ripple {\n  top: calc(-1 * 1px);\n  /* @alternate */\n  top: calc(-1 * var(--mdc-button-outline-width, 1px));\n  /* @noflip */ /*rtl:ignore*/\n  left: calc(-1 * 1px);\n  /* @alternate */\n  /* @noflip */ /*rtl:ignore*/\n  left: calc(-1 * var(--mdc-button-outline-width, 1px));\n  /* @noflip */ /*rtl:ignore*/\n  right: initial;\n  /* @alternate */\n  /* @noflip */ /*rtl:ignore*/\n  right: initial;\n  border-width: 1px;\n  /* @alternate */\n  border-width: var(--mdc-button-outline-width, 1px);\n  border-style: solid;\n  border-color: transparent;\n}\n[dir=rtl] .mdc-button--outlined .ripple, .mdc-button--outlined .ripple[dir=rtl] {\n  /*rtl:begin:ignore*/\n  /* @noflip */ /*rtl:ignore*/\n  left: initial;\n  /* @alternate */\n  /* @noflip */ /*rtl:ignore*/\n  left: initial;\n  /* @noflip */ /*rtl:ignore*/\n  right: calc(-1 * 1px);\n  /* @alternate */\n  /* @noflip */ /*rtl:ignore*/\n  right: calc(-1 * var(--mdc-button-outline-width, 1px));\n  /*rtl:end:ignore*/\n}\n\n.mdc-button--dense {\n  height: 28px;\n  margin-top: 0;\n  margin-bottom: 0;\n}\n.mdc-button--dense .mdc-button__touch {\n  height: 100%;\n}\n\n:host([disabled]) {\n  pointer-events: none;\n}\n:host([disabled]) .mdc-button {\n  color: rgba(0, 0, 0, 0.38);\n  /* @alternate */\n  color: var(--mdc-button-disabled-ink-color, rgba(0, 0, 0, 0.38));\n}\n:host([disabled]) .mdc-button--raised,\n:host([disabled]) .mdc-button--unelevated {\n  background-color: rgba(0, 0, 0, 0.12);\n  /* @alternate */\n  background-color: var(--mdc-button-disabled-fill-color, rgba(0, 0, 0, 0.12));\n}\n:host([disabled]) .mdc-button--outlined {\n  border-color: rgba(0, 0, 0, 0.12);\n  /* @alternate */\n  border-color: var(--mdc-button-disabled-outline-color, rgba(0, 0, 0, 0.12));\n}\n'])];
    mj = t([L("mwc-button")], mj);
    var nj = mj;
    const oj = J`1px`
      , pj = J`2px`;
    var qj = class extends nj {
        constructor() {
            super();
            this.m = this.h = this.pill = !1;
            this.overflow = void 0;
            this.hideLabel = !1;
            this.ariaSelected = this.ariaExpanded = null;
            this.skipsFocus = !1;
            this.setAttribute("dir", document.dir);
            this.outlined = !0;
            this.g.ra = ()=>{}
            ;
            this.g.Z = ()=>{}
            ;
            this.g.qa = ()=>{}
            ;
            this.g.ka = ()=>{}
        }
        get primary() {
            return this.h
        }
        set primary(a) {
            const b = this.h;
            if (a !== b) {
                var c = this.text;
                this.unelevated = this.h = a;
                wh(this, "primary", b);
                this.text !== c && wh(this, "text", c);
                this.outlined = !this.primary && !this.text
            }
        }
        get text() {
            return !this.h && this.m
        }
        set text(a) {
            const b = this.text;
            this.m = a;
            this.text !== b && (wh(this, "text", b),
            this.outlined = !this.primary && !this.text)
        }
        L(a) {
            super.L(a);
            qi(this)
        }
        ia(a) {
            super.ia(a);
            a = this.pf;
            a.ariaExpanded = this.ariaExpanded;
            a.ariaHasPopup = this.ariaExpanded ? "true" : null;
            a.ariaSelected = this.ariaSelected;
            this.ariaRole ? a.setAttribute("role", this.ariaRole) : a.removeAttribute("role");
            this.skipsFocus ? a.setAttribute("tabindex", "-1") : a.removeAttribute("tabindex")
        }
        static get M() {
            const a = J`
      :host {
        --button-shape-bottom-leading: var(
          --ea-button-bottom-leading-border-radius,
          var(--ea-button-border-radius)
        );
        --button-shape-bottom-trailing: var(
          --ea-button-bottom-trailing-border-radius,
          var(--ea-button-border-radius)
        );
        --button-shape-top-leading: var(
          --ea-button-top-leading-border-radius,
          var(--ea-button-border-radius)
        );
        --button-shape-top-trailing: var(
          --ea-button-top-trailing-border-radius,
          var(--ea-button-border-radius)
        );
      }
      :host(:not([dir="rtl"])) :where(button, mwc-ripple) {
        border-bottom-left-radius: var(--button-shape-bottom-leading);
        border-bottom-right-radius: var(--button-shape-bottom-trailing);
        border-top-left-radius: var(--button-shape-top-leading);
        border-top-right-radius: var(--button-shape-top-trailing);
      }
      :host([dir="rtl"]) :where(button, mwc-ripple) {
        border-bottom-left-radius: var(--button-shape-bottom-trailing);
        border-bottom-right-radius: var(--button-shape-bottom-leading);
        border-top-left-radius: var(--button-shape-top-trailing);
        border-top-right-radius: var(--button-shape-top-leading);
      }
    `
              , b = J`
      :host {
          --focus-ring-shape-bottom-leading: var(
            --ea-button-bottom-leading-focus-ring-radius,
            calc(var(--button-shape-bottom-leading) + ${pj})
          );
          --focus-ring-shape-bottom-trailing: var(
            --ea-button-bottom-trailing-focus-ring-radius,
            calc(var(--button-shape-bottom-trailing) + ${pj})
          );
          --focus-ring-shape-top-leading: var(
            --ea-button-top-leading-focus-ring-radius,
            calc(var(--button-shape-top-leading) + ${pj})
          );
          --focus-ring-shape-top-trailing: var(
            --ea-button-top-trailing-focus-ring-radius,
            calc(var(--button-shape-top-trailing) + ${pj})
          );
      }
      :host(:not([dir="rtl"])) button:before {
        border-bottom-left-radius: var(--focus-ring-shape-bottom-leading);
        border-bottom-right-radius: var(--focus-ring-shape-bottom-trailing);
        border-top-left-radius: var(--focus-ring-shape-top-leading);
        border-top-right-radius: var(--focus-ring-shape-top-trailing);
      }
      :host([dir="rtl"]) button:before {
        border-bottom-left-radius: var(--focus-ring-shape-bottom-trailing);
        border-bottom-right-radius: var(--focus-ring-shape-bottom-leading);
        border-top-left-radius: var(--focus-ring-shape-top-trailing);
        border-top-right-radius: var(--focus-ring-shape-top-leading);
      }
    `
              , c = J`
      :host {
        --ea-button-border-radius: 4px;
        --ea-icon-size: 20px;
        --mdc-button-disabled-ink-color: var(--cros-button-label-color-secondary-disabled);
        --mdc-button-disabled-outline-color: var(--cros-button-stroke-color-secondary-disabled);
        --mdc-button-outline-color: var(--ea-secondary-button-stroke-color, var(--cros-button-stroke-color-secondary));
        --mdc-ripple-color: var(--ea-button-ripple-color, var(--cros-button-ripple-color-secondary));
        --mdc-ripple-press-opacity: var(--ea-button-ripple-opacity, var(--cros-button-secondary-ripple-opacity));
        --mdc-theme-primary: var(--ea-button-label-color, var(--cros-button-label-color-secondary));
        --mdc-typography-button-font-family: ${ii};
        --mdc-typography-button-font-size: ${ji};
        --mdc-typography-button-font-weight: ${ki};
        --mdc-typography-button-letter-spacing: normal;
        --mdc-typography-button-text-transform: none;
        line-height: ${li};
        min-height: 32px;
        min-width: 32px;
      }

      :host([raised]),
      :host([unelevated]) {
        --mdc-ripple-color: var(--ea-button-ripple-color, var(--cros-button-ripple-color-secondary));
        --mdc-ripple-press-opacity: var(--ea-button-ripple-opacity, var(--cros-button-secondary-ripple-opacity));
      }
      :host([outlined]) button {
        background-color: var(--cros-button-secondary-background-color);
      }
      :host([outlined]) {
        --mdc-ripple-color: var(--ea-button-ripple-color, var(--cros-button-secondary-pressed-ripple-color));
      }
      :host([pill]) {
        --ea-button-border-radius: 16px;
      }
      :host([primary]) {
        --mdc-button-disabled-fill-color: var(--cros-button-background-color-primary-disabled);
        --mdc-button-disabled-ink-color: var(--cros-button-label-color-primary-disabled);
        --mdc-ripple-color: var(--cros-button-ripple-color-primary);
        --mdc-ripple-press-opacity: var(--cros-button-primary-ripple-opacity);
        --mdc-theme-on-primary: var(--ea-button-label-color, var(--cros-button-label-color-primary));
        --mdc-theme-primary: var(--ea-primary-button-background-color, var(--cros-button-background-color-primary));
      }

      :host([overflow="stack"]) {
        --ea-button-height: auto;
        --ea-button-vertical-padding: 6px;
      }

      :host button {
        height: var(--ea-button-height, 32px);
        min-height: inherit;
        min-width: inherit;
        overflow: initial;
        position: relative;
      }
      :host mwc-ripple {
        overflow: hidden;
      }
      /*
       * TODO(b/155822587): Remove this rule when vertical density is
       * implemented for mwc-button.
       */
      :host .mdc-button--outlined {
        /*
         * For outlined button, substract the outlined border width, i.e. 1px as
         * defined in
         * https://source.corp.google.com/piper///depot/google3/third_party/javascript/material_components_web/button/_variables.scss?l=41&rcl=289657622.
         */
        padding-bottom: max(calc(var(--ea-button-vertical-padding) - 1px), 0px);
        padding-top: max(calc(var(--ea-button-vertical-padding) - 1px), 0px);
      }
      :host .mdc-button--unelevated {
        padding-bottom: var(--ea-button-vertical-padding);
        padding-top: var(--ea-button-vertical-padding);
      }
      :host .mdc-button__label {
        text-align: var(--ea-button-text-align, center);
      }
      :host([overflow="truncate"]) .mdc-button__label {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      :host([hide-label]) .mdc-button__label {
        display: none;
      }

      /*
       * The .hover/.active classes are only used by tests to simulate these
       * events.
       */
      :host button:is(:hover, .hover) {
        --mdc-button-outline-color: var(--ea-secondary-button-stroke-color-hover, var(--cros-button-stroke-color-secondary-hover));
        /*
         * Apply hover colors with background-image / linear-gradient to
         * blend with background colour at runtime and avoid pre-blending.
         */
        background-image: linear-gradient(
            var(--ea-button-background-color-hover, var(--cros-button-background-color-secondary-hover)),
            var(--ea-button-background-color-hover, var(--cros-button-background-color-secondary-hover)));
      }
      :host([primary]) button:is(:hover, .hover) {
        background-image: linear-gradient(
            var(--ea-button-background-color-hover, var(--cros-button-background-color-primary-hover)),
            var(--ea-button-background-color-hover, var(--cros-button-background-color-primary-hover)));
      }

      /*
       * This pseudo-element displays the button's focus ring. Having a separate
       * element for the focus ring lets the focus ring have a border-radius
       * that's different from the button's border-radius.
       */
      :host button:is(:focus-visible, .focus):before {
        box-shadow: 0 0 0 2px var(--cros-focus-ring-color);
        content: '';
        height: calc(100% + 2 * ${pj});
        position: absolute;
        width: calc(100% + 2 * ${pj});
        left: -${pj};
        top: -${pj};
      }
      :host(:not([primary]):not([text])) button:is(:focus-visible, .focus):before {
        height: calc(100% +
          2 * ${pj} + 2 * ${oj});
        width: calc(100% +
          2 * ${pj} + 2 * ${oj});
        top: calc(-${pj} - ${oj});
        left: calc(-${pj} - ${oj});
      }

      :host button:is(:active, .active) {
        box-shadow: 0 1px 2px var(--cros-button-active-shadow-color-key-secondary),
            0 1px 3px var(--cros-button-active-shadow-color-ambient-secondary);
      }
      :host([primary]) button:is(:active, .active) {
        box-shadow: 0 1px 2px var(--cros-button-active-shadow-color-key-primary),
            0 1px 3px var(--cros-button-active-shadow-color-ambient-primary);
      }
      :host([text]) button:is(:active, .active) {
        box-shadow: none;
      }

      ::slotted(*) {
        pointer-events: none;
      }
    `;
            return [...nj.M, c, a, b]
        }
    }
    ;
    t([M({
        type: Boolean,
        A: !0,
        H: !0
    }), A("design:type", Object)], qj.prototype, "pill", void 0);
    t([M({
        type: Boolean,
        A: !0,
        H: !0
    }), A("design:type", Boolean), A("design:paramtypes", [Boolean])], qj.prototype, "primary", null);
    t([M({
        type: Boolean,
        A: !0,
        H: !0
    }), A("design:type", Boolean), A("design:paramtypes", [Boolean])], qj.prototype, "text", null);
    t([M({
        type: String,
        A: !0,
        H: "overflow"
    }), A("design:type", String)], qj.prototype, "overflow", void 0);
    t([M({
        type: Boolean,
        A: !0,
        H: "hide-label"
    }), A("design:type", Object)], qj.prototype, "hideLabel", void 0);
    t([M({
        type: String,
        A: !0,
        H: "aria-expanded"
    }), A("design:type", Object)], qj.prototype, "ariaExpanded", void 0);
    t([M({
        type: String,
        A: !0,
        H: "aria-selected"
    }), A("design:type", Object)], qj.prototype, "ariaSelected", void 0);
    t([M({
        type: String,
        A: !0,
        H: !0
    }), A("design:type", String)], qj.prototype, "ariaRole", void 0);
    t([M({
        type: Boolean
    }), A("design:type", Object)], qj.prototype, "skipsFocus", void 0);
    t([O("button", !0), A("design:type", HTMLButtonElement)], qj.prototype, "pf", void 0);
    qj = t([L("ea-button"), A("design:paramtypes", [])], qj);
    let rj;
    De("complexExpression") ? rj = Mf : rj = Af;
    function sj(a, b) {
        var c = a.shadowRoot.activeElement;
        if (c && (c = c.getAttribute("label")))
            for (const d of a.buttonSections) {
                const e = [];
                for (const [f,g] of d.entries())
                    e[f] = g.map(k=>k.B);
                for (let f = 0; f < e.length; f++)
                    e[f].includes(c) && tj(a, e, f, e[f].indexOf(c), b.key)
            }
    }
    function tj(a, b, c, d, e) {
        let f = void 0;
        const g = b[0].length
          , k = b.length;
        switch (e) {
        case "ArrowDown":
            c + 1 < k && (f = b[c + 1][d]);
            break;
        case "ArrowUp":
            0 <= c - 1 && (f = b[c - 1][d]);
            break;
        case "ArrowRight":
            d + 1 < g && (f = b[c][d + 1]);
            break;
        case "ArrowLeft":
            0 <= d - 1 && (f = b[c][d - 1]);
            break;
        default:
            return
        }
        f && a.Aa.querySelector(`ea-button[label="${f}"]`).focus()
    }
    function uj(a) {
        return a.flat().map((b,c)=>F`<ea-button text @click=${()=>rj.o(b.C)} label=${b.B} hide-label tabindex=${0 === c ? 0 : -1}>${b.C}</ea-button>`)
    }
    var vj = class extends K {
        constructor() {
            super(...arguments);
            this.buttonSections = [];
            this.g = a=>void sj(this, a)
        }
        connectedCallback() {
            super.connectedCallback();
            this.addEventListener("keydown", this.g)
        }
        disconnectedCallback() {
            this.removeEventListener("keydown", this.g);
            super.disconnectedCallback()
        }
        i() {
            return F`
          ${this.buttonSections.map((a,b)=>F`
              <div class="button-grid" id="section-${b}">${uj(a)}</div>
            `)}
    `
        }
    }
    ;
    t([M({
        H: !1
    }), A("design:type", Array)], vj.prototype, "buttonSections", void 0);
    /*

Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    var wj = (a,b)=>{
        a = window.matchMedia(a);
        a.addListener(c=>b(c.matches));
        b(a.matches)
    }
    ;
    const xj = [[{
        C: D.MSG_DEG_BUTTON_TEXT,
        B: D.MSG_DEG_BUTTON_SPEECH
    }, {
        C: D.MSG_RAD_BUTTON_TEXT,
        B: D.MSG_RAD_BUTTON_SPEECH
    }, {
        C: D.MSG_FACT_BUTTON_TEXT,
        B: D.MSG_FACT_BUTTON_SPEECH
    }], [{
        C: D.MSG_SIN_BUTTON_TEXT,
        B: D.MSG_SIN_BUTTON_SPEECH
    }, {
        C: D.MSG_ASIN_BUTTON_TEXT,
        B: D.MSG_ASIN_BUTTON_SPEECH
    }, {
        C: D.MSG_MOD_BUTTON_TEXT,
        B: D.MSG_MOD_BUTTON_SPEECH
    }], [{
        C: D.MSG_COS_BUTTON_TEXT,
        B: D.MSG_COS_BUTTON_SPEECH
    }, {
        C: D.MSG_ACOS_BUTTON_TEXT,
        B: D.MSG_ACOS_BUTTON_SPEECH
    }, {
        C: D.MSG_PERM_BUTTON_TEXT,
        B: D.MSG_PERM_BUTTON_SPEECH
    }], [{
        C: D.MSG_TAN_BUTTON_TEXT,
        B: D.MSG_TAN_BUTTON_SPEECH
    }, {
        C: D.MSG_ATAN_BUTTON_TEXT,
        B: D.MSG_ATAN_BUTTON_SPEECH
    }, {
        C: D.MSG_COMB_BUTTON_TEXT,
        B: D.MSG_COMB_BUTTON_SPEECH
    }]];
    var yj = class extends vj {
        constructor() {
            super(...arguments);
            this.buttonSections = [xj, []];
            this.h = ()=>{
                this.angleUnitType = Af.angleUnitType
            }
            ;
            this.angleUnitType = Af.angleUnitType;
            this.state = window.matchMedia("(max-width: 1027px)").matches ? "collapsed" : "default"
        }
        async L(a) {
            super.L(a);
            wj("(max-width: 1027px)", b=>{
                b && (this.state = "collapsed")
            }
            );
            wj("(min-width: 1028px)", b=>{
                b && (this.state = "default")
            }
            )
        }
        connectedCallback() {
            super.connectedCallback();
            Af.m.push(this.h)
        }
        disconnectedCallback() {
            zf(this.h);
            super.disconnectedCallback()
        }
        static get M() {
            return [mi, J`
      :host {
        background-color: ${Uh};
        height: ${252}px;
      }
      :host([state='default']) {
        width: 42%;
        transform: translateX(0px);
      }
      :host([state='collapsed']), :host([state='floating']) {
        position: absolute;
        width: ${222}px;
        right: 0px;
      }
      :host([state='collapsed']) {
        transform: translateX(calc(100% - ${30}px));
      }
      :host([state='collapsed']) #tertiary-panel {
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px rgba(0, 0, 0, 0.15);
      }
      :host([state='floating']) {
        transform: translateX(0px);
      }
      #tertiary-main {
        width: calc(100% - ${30}px);
      }
      .button-grid {
        grid-template-columns: repeat(3, 1fr);
      }
      .button-grid ea-button {
        --mdc-typography-button-font-size: ${20}px;
      }
      :host([angleUnitType='Rad']) ea-button[label='switch to radians'] {
        --mdc-typography-button-font-weight: 600;
      }
      :host([angleUnitType='Deg']) ea-button[label='switch to degrees'] {
        --mdc-typography-button-font-weight: 600;
      }
    `]
        }
        i() {
            return F`
      <div id="tertiary-panel" class="handle" @click=${()=>{
                "collapsed" === this.state ? this.state = "floating" : "floating" === this.state && (this.state = "collapsed")
            }
            }></div>
      <div id="tertiary-main">
        ${super.i()}
      </div>
    `
        }
    }
    ;
    t([M({
        A: !0
    }), A("design:type", String)], yj.prototype, "angleUnitType", void 0);
    t([M({
        A: !0
    }), A("design:type", String)], yj.prototype, "state", void 0);
    yj = t([L("tertiary-drawer")], yj);
    const zj = [[{
        C: D.MSG_BACKSPACE_BUTTON_TEXT,
        B: D.MSG_BACKSPACE_BUTTON_SPEECH
    }, {
        C: D.MSG_ROUND_BUTTON_TEXT,
        B: D.MSG_ROUND_BUTTON_SPEECH
    }, {
        C: D.MSG_FETCH_BUTTON_TEXT,
        B: D.MSG_FETCH_BUTTON_SPEECH
    }, {
        C: D.MSG_STORE_BUTTON_TEXT,
        B: D.MSG_STORE_BUTTON_SPEECH
    }], [{
        C: D.MSG_E_BUTTON_TEXT,
        B: D.MSG_E_BUTTON_SPEECH
    }, {
        C: D.MSG_LN_BUTTON_TEXT,
        B: D.MSG_LN_BUTTON_SPEECH
    }, {
        C: D.MSG_LOG_BUTTON_TEXT,
        B: D.MSG_LOG_BUTTON_SPEECH
    }, {
        C: D.MSG_EXP_BUTTON_TEXT,
        B: D.MSG_EXP_BUTTON_SPEECH
    }], [{
        C: D.MSG_INV_BUTTON_TEXT,
        B: D.MSG_INV_BUTTON_SPEECH
    }, {
        C: D.MSG_POW_BUTTON_TEXT,
        B: D.MSG_POW_BUTTON_SPEECH
    }, {
        C: D.MSG_SQROOT_BUTTON_TEXT,
        B: D.MSG_SQROOT_BUTTON_SPEECH
    }, {
        C: D.MSG_ROOT_BUTTON_TEXT,
        B: D.MSG_ROOT_BUTTON_SPEECH
    }], [{
        C: D.MSG_SIGN_BUTTON_TEXT,
        B: D.MSG_SIGN_BUTTON_SPEECH
    }, {
        C: D.MSG_PERCENT_BUTTON_TEXT,
        B: D.MSG_PERCENT_BUTTON_SPEECH
    }, {
        C: D.MSG_SQUARE_BUTTON_TEXT,
        B: D.MSG_SQUARE_BUTTON_SPEECH
    }, {
        C: D.MSG_PI_BUTTON_TEXT,
        B: D.MSG_PI_BUTTON_SPEECH
    }]];
    var Aj = class extends vj {
        constructor() {
            super(...arguments);
            this.buttonSections = [zj];
            this.state = window.matchMedia("(max-width: 628px)").matches ? "collapsed" : window.matchMedia("(max-width: 629px) and (max-width: 1027px)").matches ? "default-no-tertiary" : "default"
        }
        async L(a) {
            super.L(a);
            wj("(min-width: 0px) and (max-width: 628px)", b=>{
                b && (this.state = "collapsed")
            }
            );
            wj("(min-width: 629px) and (max-width: 1027px)", b=>{
                b && (this.state = "default-no-tertiary")
            }
            );
            wj("(min-width: 1028px)", b=>{
                b && (this.state = "default")
            }
            )
        }
        static get M() {
            return [mi, J`
      :host {
        background-color: ${Th};
        height: ${252}px;
      }
      :host([state='default']), :host([state='default-no-tertiary']) {
        width: 55%;
        transform: translateX(0px);
      }
      :host([state='collapsed']), :host([state='floating']) {
        position: absolute;
        width: ${322}px;
        right: 0px;
      }
      :host([state='collapsed']) {
        transform: translateX(calc(100% - ${30}px));
      }
      :host([state='collapsed']) #secondary-panel {
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px rgba(0, 0, 0, 0.15);
      }
      :host([state='floating']) {
        transform: translateX(0px);
      }
      #secondary-main {
        flex-grow: 1;
      }
      :host([state='default-no-tertiary']), :host([state='floating']) #secondary-main {
        padding-right: 30px;
        box-sizing: border-box;
      }
      .button-grid {
        grid-template-columns: repeat(4, 1fr);
      }
      .button-grid ea-button {
        --mdc-typography-button-font-size: ${20}px;
      }
    `]
        }
        i() {
            return F`
      <div id="secondary-panel" class="handle" @click=${()=>{
                "collapsed" === this.state ? this.state = "floating" : "floating" === this.state && (this.state = "collapsed",
                this.shadowRoot.querySelector("tertiary-drawer").setAttribute("state", "collapsed"))
            }
            }></div>
      <div id="secondary-main">
        ${super.i()}
      </div>
      <tertiary-drawer></tertiary-drawer>
    `
        }
    }
    ;
    t([M({
        A: !0
    }), A("design:type", String)], Aj.prototype, "state", void 0);
    Aj = t([L("secondary-drawer")], Aj);
    const Bj = [[{
        C: D.MSG_CLEAR_BUTTON_TEXT,
        B: D.MSG_CLEAR_BUTTON_SPEECH
    }], [{
        C: D.MSG_PLUS_BUTTON_TEXT,
        B: D.MSG_PLUS_BUTTON_SPEECH
    }], [{
        C: D.MSG_MINUS_BUTTON_TEXT,
        B: D.MSG_MINUS_BUTTON_SPEECH
    }], [{
        C: D.MSG_MULTIPLY_BUTTON_TEXT,
        B: D.MSG_MULTIPLY_BUTTON_SPEECH
    }], [{
        C: D.MSG_DIVIDE_BUTTON_TEXT,
        B: D.MSG_DIVIDE_BUTTON_SPEECH
    }]]
      , Cj = [[{
        C: "7",
        B: "7"
    }, {
        C: "8",
        B: "8"
    }, {
        C: "9",
        B: "9"
    }], [{
        C: "4",
        B: "4"
    }, {
        C: "5",
        B: "5"
    }, {
        C: "6",
        B: "6"
    }], [{
        C: "1",
        B: "1"
    }, {
        C: "2",
        B: "2"
    }, {
        C: "3",
        B: "3"
    }], [{
        C: D.MSG_POINT_BUTTON_TEXT,
        B: D.MSG_POINT_BUTTON_SPEECH
    }, {
        C: "0",
        B: "0"
    }, {
        C: D.MSG_EQUALS_BUTTON_TEXT,
        B: D.MSG_EQUALS_BUTTON_SPEECH
    }]];
    var Dj = class extends vj {
        constructor() {
            super(...arguments);
            this.state = window.matchMedia("(max-width: 628px)").matches ? "default-no-secondary" : "default";
            this.buttonSections = [Cj, Bj]
        }
        async L() {
            wj("(min-width: 0) and (max-width: 628px)", a=>{
                a && (this.state = "default-no-secondary")
            }
            );
            wj("(min-width: 629px)", a=>{
                a && (this.state = "default")
            }
            )
        }
        static get M() {
            return [mi, J`
      #primary-main {
        display: flex;
        flex-direction: row;
      }
      :host([state='default']) #primary-main {
        width: 45%;
        transform: translateX(0px);
      }
      :host([state='default-no-secondary']) #primary-main {
        width: calc(100% - ${30}px);
      }
      #section-0 {
        width: 75%;
        background-color: ${Lh};
        grid-template-columns: repeat(3, 1fr);
      }
      #section-1 {
        width: 25%;
        background-color: ${Sh};
        grid-template-columns: 1fr;
        padding-top: 7px;
        padding-bottom: 10px;
        box-sizing: border-box;
      }
      #section-0 ea-button {
        --ea-button-ripple-color: ${Vh};
        --ea-button-label-color: ${Vh};
      }
    `]
        }
        i() {
            return F`
      <div id="primary-main">
        ${super.i()}
      </div>
      <secondary-drawer></secondary-drawer>
    `
        }
    }
    ;
    t([M({
        A: !0
    }), A("design:type", String)], Dj.prototype, "state", void 0);
    Dj = t([L("primary-drawer")], Dj);
    async function Ej() {
        return new Promise(a=>void setTimeout(a, 0))
    }
    async function Fj() {
        var a = document;
        return new Promise(b=>void a.addEventListener("load", b, {
            once: !0,
            passive: !0
        }))
    }
    ;eh();
    class Gj extends HTMLElement {
        constructor() {
            super();
            this.style.position = "absolute";
            this.style.width = this.style.height = "0";
            this.style.overflow = "hidden"
        }
    }
    customElements.define("ea-a11y-announcer", Gj);
    let Hj = null;
    function Ij() {
        return Hj ? Hj : document.body ? Promise.resolve(document.body.appendChild(new Gj)) : Hj = (async()=>{
            await Fj();
            const a = document.body.appendChild(new Gj);
            Hj = null;
            return a
        }
        )()
    }
    async function Jj(a) {
        var b = document.body?.querySelector("ea-a11y-announcer");
        b = await (b ? Promise.resolve(b) : Ij());
        b.removeAttribute("aria-hidden");
        b.removeAttribute("inert");
        b.setAttribute("aria-live", "polite");
        b.textContent = "";
        b.textContent = a
    }
    function Kj(a) {
        setTimeout(()=>void Jj(a), 0)
    }
    ;var Lj = J`'Roboto', 'Noto', sans-serif`
      , Mj = J`${14}px/${20}px ${Lj}`
      , Nj = J`${13}px/${20}px ${Lj}`
      , Oj = J`
  ${500}
  ${13}px/${20}px
  ${Lj}
`
      , Pj = J`
  ${500}
  ${24}px/${32}px
  ${J`'Google Sans', 'Roboto', sans-serif`}
`;
    /*

 Copyright 2020 Google LLC
 SPDX-License-Identifier: BSD-3-Clause
*/
    const Qj = window.ShadyDOM?.inUse && !0 === window.ShadyDOM?.noPatch ? window.ShadyDOM.wrap : a=>a;
    var Rj = (a,b,c)=>{
        var d = Qj(a.fa).parentNode;
        b = void 0 === b ? a.wa : b.fa;
        if (void 0 === c)
            c = Qj(d).insertBefore(document.createComment(""), b),
            d = Qj(d).insertBefore(document.createComment(""), b),
            c = new Tg(c,d,a,a.options);
        else {
            const f = Qj(c.wa).nextSibling
              , g = c.g
              , k = g !== a;
            if (k) {
                c.R?.(a);
                c.g = a;
                var e;
                void 0 !== c.j && (e = a.pa) !== g.pa && c.j(e)
            }
            if (f !== b || k)
                for (a = c.fa; a !== f; )
                    e = Qj(a).nextSibling,
                    Qj(d).insertBefore(a, b),
                    a = e
        }
        return c
    }
      , Sj = (a,b,c=a)=>{
        a.ta(b, c);
        return a
    }
    ;
    const Tj = {};
    var Uj = (a,b=Tj)=>{
        a.O = b
    }
      , Vj = a=>{
        a.j?.(!1, !0);
        let b = a.fa;
        for (a = Qj(a.wa).nextSibling; b !== a; ) {
            const c = Qj(b).nextSibling;
            Qj(b).remove();
            b = c
        }
    }
    ;
    const Wj = (a,b,c)=>{
        const d = new Map;
        for (; b <= c; b++)
            d.set(a[b], b);
        return d
    }
    ;
    var Xj = xi(class extends yi {
        constructor(a) {
            super();
            if (2 !== a.type)
                throw Error("repeat() can only be used in text expressions");
        }
        j(a, b, c) {
            let d;
            void 0 === c ? c = b : void 0 !== b && (d = b);
            b = [];
            const e = [];
            let f = 0;
            for (const g of a)
                b[f] = d ? d(g, f) : f,
                e[f] = c(g, f),
                f++;
            return {
                values: e,
                keys: b
            }
        }
        i(a, b, c) {
            return this.j(a, b, c).values
        }
        update(a, [b,c,d]) {
            const e = a.O
              , {values: f, keys: g} = this.j(b, c, d);
            if (!Array.isArray(e))
                return this.h = g,
                f;
            const k = this.h ?? (this.h = []);
            b = [];
            let q;
            c = 0;
            d = e.length - 1;
            let p = 0
              , w = f.length - 1;
            for (; c <= d && p <= w; )
                if (null === e[c])
                    c++;
                else if (null === e[d])
                    d--;
                else if (k[c] === g[p])
                    b[p] = Sj(e[c], f[p]),
                    c++,
                    p++;
                else if (k[d] === g[w])
                    b[w] = Sj(e[d], f[w]),
                    d--,
                    w--;
                else if (k[c] === g[w])
                    b[w] = Sj(e[c], f[w]),
                    Rj(a, b[w + 1], e[c]),
                    c++,
                    w--;
                else if (k[d] === g[p])
                    b[p] = Sj(e[d], f[p]),
                    Rj(a, e[c], e[d]),
                    d--,
                    p++;
                else {
                    if (void 0 === u) {
                        var u = Wj(g, p, w);
                        q = Wj(k, c, d)
                    }
                    if (u.has(k[c]))
                        if (u.has(k[d])) {
                            var z = q.get(g[p]);
                            const H = void 0 !== z ? e[z] : null;
                            null === H ? (z = Rj(a, e[c]),
                            Sj(z, f[p]),
                            b[p] = z) : (b[p] = Sj(H, f[p]),
                            Rj(a, e[c], H),
                            e[z] = null);
                            p++
                        } else
                            Vj(e[d]),
                            d--;
                    else
                        Vj(e[c]),
                        c++
                }
            for (; p <= w; )
                u = Rj(a, b[w + 1]),
                Sj(u, f[p]),
                b[p++] = u;
            for (; c <= d; )
                u = e[c++],
                null !== u && Vj(u);
            this.h = g;
            Uj(a, b);
            return Fg
        }
    }
    );
    const Lf = Mf
      , Yj = new Map([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["+", "+"], ["-", "\u2013"], ["*", "\u00d7"], ["/", "\u00f7"], ["=", "="], ["Enter", "="], ["a", "AC"], ["c", "AC"], ["e", "e"], ["n", "+/-"], ["%", "mod"], ["i", "i"], ["^", "y\u207f"], ["!", "x!"], ["@", "x\u00b2"]]);
    function Zj(a) {
        var b = a.Yf.getBoundingClientRect();
        b = new MouseEvent("pointerdown",{
            clientX: b.width,
            clientY: b.height
        });
        a.Pd.sa(b);
        a.Pd.ua()
    }
    var ak = class extends K {
        constructor() {
            super(...arguments);
            this.history = Af.history;
            this.buffer = Af.buffer;
            this.l = (a,b)=>{
                a ? this.g && (this.rippleState = "clear",
                Zj(this)) : b && this.g && (this.rippleState = "error",
                Zj(this));
                a = Af.buffer;
                b = Af.history;
                null === a ? (this.buffer = b[b.length - 1],
                this.history = b.slice(0, b.length - 1),
                0 !== this.history.length && Kj(`equals ${this.buffer}`)) : (this.buffer = a,
                this.history = b);
                this.angleUnitType = Af.angleUnitType;
                wh(this)
            }
            ;
            this.angleUnitType = Af.angleUnitType;
            this.rippleState = "error";
            this.g = !0;
            this.h = a=>{
                "f" === a.key && (this.g = !this.g);
                if (De("complexExpression"))
                    if ("(" === a.key || ")" === a.key)
                        Lf.o(a.key);
                    else {
                        const b = Yj.get(a.key);
                        b && Lf.o(b)
                    }
                (a = Yj.get(a.key)) && Af.o(a);
                void 0
            }
            ;
            this.updateComplexExpressionHandler = ()=>{
                this.o = Lf.history;
                this.m = Lf.buffer;
                wh(this)
            }
            ;
            this.o = Lf.history;
            this.m = Lf.buffer
        }
        connectedCallback() {
            super.connectedCallback();
            Af.m.push(this.l);
            Lf.g.push(this.updateComplexExpressionHandler);
            window.addEventListener("keydown", this.h)
        }
        disconnectedCallback() {
            zf(this.l);
            Kf(this.updateComplexExpressionHandler);
            window.removeEventListener("keydown", this.h);
            super.disconnectedCallback()
        }
        static get M() {
            return [J`
      :host {
        background-color: ${Kh};
        display: flex;
        flex-direction: column;
        font-family: ${Lj};
        font-size: 30px;
        height: 100%;
      }
      .calc-display {
        flex-grow: 1;
        padding: 0 25pt 2pt 25pt;
        text-align: right;
        overflow-y: scroll;
        overflow-x: hidden;
        display: flex;
        flex-direction: column-reverse;
        flex-wrap: wrap;
        color: ${Zh}
      }
      .calc-display::-webkit-scrollbar {
          display: none;
      }
      .keypad {
        padding-top: 4px;
        height: ${252}px;
        z-index: 1;
      }
      .inner-calc-display {
        width: 100%;
        align-self: flex-end;
        margin: 1pt 0pt;
        padding: 11px 2px;
      }
      .inner-calc-display:focus-visible, li:focus-visible, .calculator-display:focus-visible, .keypad:focus-visible {
        outline: 2px solid ${Fh};
        border-radius: 9px;
      }
      .inner-calc-display ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
      }
      .inner-calc-display li, .calculator-display span {
        padding: 2px;
        padding-right: 7pt;
      }
      .deg-label {
        position: absolute;
        top: 15px;
        left: 0px;
        font-size: 22px;
        margin-left: 8px;
        margin-right: 10px;
      }
      mwc-ripple {
        z-index: 0;
        --mdc-ripple-press-opacity: 1;
      }
      :host([rippleState='error']) mwc-ripple {
        --mdc-ripple-color: ${Yh};
      }
      :host([rippleState='clear']) mwc-ripple {
        --mdc-ripple-color: ${Xh};
      }
      hr {
        border-color: ${Gh};
      }
    `]
        }
        i() {
            let a;
            a = De("complexExpression") ? F`
          <ul>${Xj(this.o, b=>F`<li>${b}</li>`)}
          </ul>
          <div class='calculator-display' tabindex='0'>
            <span> ${this.m} </span>
          </div>
          ` : F`
        <ul>${Xj(this.history, b=>"sep" === b ? F`<hr>` : F`<li tabindex='0'>${b}</li>
      `)}
          </ul>
          <div class='calculator-display' tabindex='0'>
            <span> ${this.buffer} </span>
          </div>
        `;
            return F`
      <div class='calc-display'>
        <mwc-ripple></mwc-ripple>
        <div class='deg-label'><span> ${this.angleUnitType} </span></div>
        <div class='inner-calc-display' tabindex='0'>
          ${a}
        </div>
      </div>
      <div class='keypad' tabindex='0'>
        <primary-drawer></primary-drawer>
      </div>
    `
        }
    }
    ;
    t([O("mwc-ripple"), A("design:type", ij)], ak.prototype, "Pd", void 0);
    t([O(".calc-display"), A("design:type", HTMLDivElement)], ak.prototype, "Yf", void 0);
    t([M({
        A: !0
    }), A("design:type", String)], ak.prototype, "rippleState", void 0);
    t([M({
        H: !1
    }), A("design:type", Object)], ak.prototype, "updateComplexExpressionHandler", void 0);
    ak = t([L("calculator-app")], ak);
    const bk = window ? "\n  --cros-color-primary-light-rgb: var(--google-grey-900-rgb);\n  --cros-color-primary-light: var(--google-grey-900);\n\n  --cros-color-primary-dark-rgb: var(--google-grey-200-rgb);\n  --cros-color-primary-dark: var(--google-grey-200);\n\n  --cros-color-primary-inverted-rgb: var(--cros-color-primary-dark-rgb);\n  --cros-color-primary-inverted: var(--cros-color-primary-dark);\n\n  --cros-color-primary-rgb: var(--cros-color-primary-light-rgb);\n  --cros-color-primary: var(--cros-color-primary-light);\n\n  --cros-color-secondary-light-rgb: var(--google-grey-700-rgb);\n  --cros-color-secondary-light: var(--google-grey-700);\n\n  --cros-color-secondary-dark-rgb: var(--google-grey-400-rgb);\n  --cros-color-secondary-dark: var(--google-grey-400);\n\n  --cros-color-secondary-rgb: var(--cros-color-secondary-light-rgb);\n  --cros-color-secondary: var(--cros-color-secondary-light);\n\n  --cros-color-disabled-light-rgb: var(--google-grey-600-rgb);\n  --cros-color-disabled-light: var(--google-grey-600);\n\n  --cros-color-disabled-dark-rgb: var(--google-grey-500-rgb);\n  --cros-color-disabled-dark: var(--google-grey-500);\n\n  --cros-color-disabled-rgb: var(--cros-color-disabled-light-rgb);\n  --cros-color-disabled: var(--cros-color-disabled-light);\n\n  --cros-color-prominent-light-rgb: var(--google-blue-600-rgb);\n  --cros-color-prominent-light: var(--google-blue-600);\n\n  --cros-color-prominent-dark-rgb: var(--google-blue-300-rgb);\n  --cros-color-prominent-dark: var(--google-blue-300);\n\n  --cros-color-prominent-debug-rgb: var(--google-red-600-rgb);\n  --cros-color-prominent-debug: var(--google-red-600);\n\n  --cros-color-prominent-inverted-rgb: var(--cros-color-prominent-dark-rgb);\n  --cros-color-prominent-inverted: var(--cros-color-prominent-dark);\n\n  --cros-color-prominent-rgb: var(--cros-color-prominent-light-rgb);\n  --cros-color-prominent: var(--cros-color-prominent-light);\n\n  --cros-color-alert-light-rgb: var(--google-red-600-rgb);\n  --cros-color-alert-light: var(--google-red-600);\n\n  --cros-color-alert-dark-rgb: var(--google-red-300-rgb);\n  --cros-color-alert-dark: var(--google-red-300);\n\n  --cros-color-alert-inverted-rgb: var(--cros-color-alert-dark-rgb);\n  --cros-color-alert-inverted: var(--cros-color-alert-dark);\n\n  --cros-color-alert-rgb: var(--cros-color-alert-light-rgb);\n  --cros-color-alert: var(--cros-color-alert-light);\n\n  --cros-color-warning-light-rgb: var(--google-yellow-900-rgb);\n  --cros-color-warning-light: var(--google-yellow-900);\n\n  --cros-color-warning-dark-rgb: var(--google-yellow-300-rgb);\n  --cros-color-warning-dark: var(--google-yellow-300);\n\n  --cros-color-warning-inverted-rgb: var(--cros-color-warning-dark-rgb);\n  --cros-color-warning-inverted: var(--cros-color-warning-dark);\n\n  --cros-color-warning-rgb: var(--cros-color-warning-light-rgb);\n  --cros-color-warning: var(--cros-color-warning-light);\n\n  --cros-color-positive-rgb: var(--google-green-700-rgb);\n  --cros-color-positive: var(--google-green-700);\n\n  --cros-color-selection-light-rgb: var(--google-blue-700-rgb);\n  --cros-color-selection-light: var(--google-blue-700);\n\n  --cros-color-selection-dark-rgb: var(--google-blue-200-rgb);\n  --cros-color-selection-dark: var(--google-blue-200);\n\n  --cros-color-selection-debug-rgb: var(--google-red-700-rgb);\n  --cros-color-selection-debug: var(--google-red-700);\n\n  --cros-color-selection-rgb: var(--cros-color-selection-light-rgb);\n  --cros-color-selection: var(--cros-color-selection-light);\n\n  --cros-bg-color-light-rgb: 255, 255, 255;\n  --cros-bg-color-light: rgb(var(--cros-bg-color-light-rgb));\n\n  --cros-bg-color-dark-rgb: var(--google-grey-900-rgb);\n  --cros-bg-color-dark: var(--google-grey-900);\n\n  --cros-bg-color-rgb: var(--cros-bg-color-light-rgb);\n  --cros-bg-color: var(--cros-bg-color-light);\n\n  --cros-bg-color-elevation-1-rgb: 255, 255, 255;\n  --cros-bg-color-elevation-1: rgb(var(--cros-bg-color-elevation-1-rgb));\n\n  --cros-bg-color-elevation-2-light-rgb: 255, 255, 255;\n  --cros-bg-color-elevation-2-light: rgb(var(--cros-bg-color-elevation-2-light-rgb));\n\n  --cros-bg-color-elevation-2-dark-rgb: 45, 46, 49;\n  --cros-bg-color-elevation-2-dark: rgb(var(--cros-bg-color-elevation-2-dark-rgb));\n\n  --cros-bg-color-elevation-2-inverted-rgb: var(--cros-bg-color-elevation-2-dark-rgb);\n  --cros-bg-color-elevation-2-inverted: var(--cros-bg-color-elevation-2-dark);\n\n  --cros-bg-color-elevation-2-rgb: var(--cros-bg-color-elevation-2-light-rgb);\n  --cros-bg-color-elevation-2: var(--cros-bg-color-elevation-2-light);\n\n  --cros-bg-color-elevation-3-rgb: 255, 255, 255;\n  --cros-bg-color-elevation-3: rgb(var(--cros-bg-color-elevation-3-rgb));\n\n  --cros-bg-color-elevation-4-rgb: 255, 255, 255;\n  --cros-bg-color-elevation-4: rgb(var(--cros-bg-color-elevation-4-rgb));\n\n  --cros-bg-color-elevation-5-rgb: 255, 255, 255;\n  --cros-bg-color-elevation-5: rgb(var(--cros-bg-color-elevation-5-rgb));\n\n  --cros-bg-color-dropped-elevation-1-rgb: var(--google-grey-50-rgb);\n  --cros-bg-color-dropped-elevation-1: var(--google-grey-50);\n\n  --cros-bg-color-dropped-elevation-2-rgb: var(--google-grey-200-rgb);\n  --cros-bg-color-dropped-elevation-2: var(--google-grey-200);\n\n  --cros-text-color-primary-light-rgb: var(--cros-color-primary-light-rgb);\n  --cros-text-color-primary-light: var(--cros-color-primary-light);\n\n  --cros-text-color-primary-dark-rgb: var(--cros-color-primary-dark-rgb);\n  --cros-text-color-primary-dark: var(--cros-color-primary-dark);\n\n  --cros-text-color-primary-debug-rgb: var(--google-green-400-rgb);\n  --cros-text-color-primary-debug: var(--google-green-400);\n\n  --cros-text-color-primary-inverted-rgb: var(--cros-text-color-primary-dark-rgb);\n  --cros-text-color-primary-inverted: var(--cros-text-color-primary-dark);\n\n  --cros-text-color-primary-rgb: var(--cros-text-color-primary-light-rgb);\n  --cros-text-color-primary: var(--cros-text-color-primary-light);\n\n  --cros-text-color-secondary-light-rgb: var(--cros-color-secondary-light-rgb);\n  --cros-text-color-secondary-light: var(--cros-color-secondary-light);\n\n  --cros-text-color-secondary-dark-rgb: var(--cros-color-secondary-dark-rgb);\n  --cros-text-color-secondary-dark: var(--cros-color-secondary-dark);\n\n  --cros-text-color-secondary-debug-rgb: var(--google-green-400-rgb);\n  --cros-text-color-secondary-debug: var(--google-green-400);\n\n  --cros-text-color-secondary-rgb: var(--cros-text-color-secondary-light-rgb);\n  --cros-text-color-secondary: var(--cros-text-color-secondary-light);\n\n  --cros-text-color-disabled-rgb: var(--cros-color-disabled-rgb);\n  --cros-text-color-disabled: var(--cros-color-disabled);\n\n  --cros-text-color-prominent-rgb: var(--cros-color-prominent-rgb);\n  --cros-text-color-prominent: var(--cros-color-prominent);\n\n  --cros-text-color-selection-rgb: var(--cros-color-selection-rgb);\n  --cros-text-color-selection: var(--cros-color-selection);\n\n  --cros-text-color-positive-rgb: var(--cros-color-positive-rgb);\n  --cros-text-color-positive: var(--cros-color-positive);\n\n  --cros-text-color-warning-rgb: var(--cros-color-warning-rgb);\n  --cros-text-color-warning: var(--cros-color-warning);\n\n  --cros-text-color-alert-rgb: var(--cros-color-alert-rgb);\n  --cros-text-color-alert: var(--cros-color-alert);\n\n  --cros-text-highlight-color-rgb: var(--google-blue-600-rgb);\n  --cros-text-highlight-color: rgba(var(--cros-text-highlight-color-rgb), 0.3);\n\n  --cros-icon-color-primary-light-rgb: var(--cros-color-primary-light-rgb);\n  --cros-icon-color-primary-light: var(--cros-color-primary-light);\n\n  --cros-icon-color-primary-dark-rgb: var(--cros-color-primary-dark-rgb);\n  --cros-icon-color-primary-dark: var(--cros-color-primary-dark);\n\n  --cros-icon-color-primary-debug-rgb: 255, 0, 255;\n  --cros-icon-color-primary-debug: rgb(var(--cros-icon-color-primary-debug-rgb));\n\n  --cros-icon-color-primary-inverted-rgb: var(--cros-icon-color-primary-dark-rgb);\n  --cros-icon-color-primary-inverted: var(--cros-icon-color-primary-dark);\n\n  --cros-icon-color-primary-rgb: var(--cros-icon-color-primary-light-rgb);\n  --cros-icon-color-primary: var(--cros-icon-color-primary-light);\n\n  --cros-icon-color-secondary-light-rgb: var(--cros-color-secondary-light-rgb);\n  --cros-icon-color-secondary-light: var(--cros-color-secondary-light);\n\n  --cros-icon-color-secondary-dark-rgb: var(--cros-color-secondary-dark-rgb);\n  --cros-icon-color-secondary-dark: var(--cros-color-secondary-dark);\n\n  --cros-icon-color-secondary-debug-rgb: 0, 255, 255;\n  --cros-icon-color-secondary-debug: rgb(var(--cros-icon-color-secondary-debug-rgb));\n\n  --cros-icon-color-secondary-rgb: var(--cros-icon-color-secondary-light-rgb);\n  --cros-icon-color-secondary: var(--cros-icon-color-secondary-light);\n\n  --cros-icon-color-disabled-rgb: var(--cros-color-disabled-rgb);\n  --cros-icon-color-disabled: var(--cros-color-disabled);\n\n  --cros-icon-color-prominent-rgb: var(--cros-color-prominent-rgb);\n  --cros-icon-color-prominent: var(--cros-color-prominent);\n\n  --cros-icon-color-selection-rgb: var(--cros-color-selection-rgb);\n  --cros-icon-color-selection: var(--cros-color-selection);\n\n  --cros-icon-color-positive-rgb: var(--cros-color-positive-rgb);\n  --cros-icon-color-positive: var(--cros-color-positive);\n\n  --cros-icon-color-warning-rgb: var(--cros-color-warning-rgb);\n  --cros-icon-color-warning: var(--cros-color-warning);\n\n  --cros-icon-color-alert-rgb: var(--cros-color-alert-rgb);\n  --cros-icon-color-alert: var(--cros-color-alert);\n\n  --cros-icon-color-red-rgb: var(--google-red-600-rgb);\n  --cros-icon-color-red: var(--google-red-600);\n\n  --cros-icon-color-blue-rgb: var(--google-blue-600-rgb);\n  --cros-icon-color-blue: var(--google-blue-600);\n\n  --cros-icon-color-green-rgb: var(--google-green-600-rgb);\n  --cros-icon-color-green: var(--google-green-600);\n\n  --cros-icon-color-yellow-rgb: var(--google-yellow-600-rgb);\n  --cros-icon-color-yellow: var(--google-yellow-600);\n\n  --cros-app-shield-color-rgb: var(--google-grey-300-rgb);\n  --cros-app-shield-color: rgb(var(--cros-app-shield-color-rgb));\n\n  --cros-app-shield-80-rgb: var(--google-grey-300-rgb);\n  --cros-app-shield-80: rgba(var(--cros-app-shield-80-rgb), 0.8);\n\n  --cros-app-shield-60-rgb: var(--google-grey-300-rgb);\n  --cros-app-shield-60: rgba(var(--cros-app-shield-60-rgb), 0.6);\n\n  --cros-app-shield-40-light-rgb: var(--google-grey-300-rgb);\n  --cros-app-shield-40-light: rgba(var(--cros-app-shield-40-light-rgb), 0.4);\n\n  --cros-app-shield-40-dark-rgb: 0, 0, 0;\n  --cros-app-shield-40-dark: rgba(var(--cros-app-shield-40-dark-rgb), 0.4);\n\n  --cros-app-shield-40-rgb: var(--cros-app-shield-40-light-rgb);\n  --cros-app-shield-40: var(--cros-app-shield-40-light);\n\n  --cros-app-shield-20-rgb: var(--google-grey-300-rgb);\n  --cros-app-shield-20: rgba(var(--cros-app-shield-20-rgb), 0.2);\n\n  --cros-focus-ring-color-light-rgb: var(--cros-color-prominent-light-rgb);\n  --cros-focus-ring-color-light: var(--cros-color-prominent-light);\n\n  --cros-focus-ring-color-dark-rgb: var(--cros-color-prominent-dark-rgb);\n  --cros-focus-ring-color-dark: var(--cros-color-prominent-dark);\n\n  --cros-focus-ring-color-rgb: var(--cros-focus-ring-color-light-rgb);\n  --cros-focus-ring-color: var(--cros-focus-ring-color-light);\n\n  --cros-focus-ring-color-inactive-rgb: var(--cros-icon-color-secondary-rgb);\n  --cros-focus-ring-color-inactive: var(--cros-icon-color-secondary);\n\n  --cros-focus-aura-color-rgb: var(--cros-color-prominent-rgb);\n  --cros-focus-aura-color: rgba(var(--cros-focus-aura-color-rgb), 0.24);\n\n  --cros-separator-color-rgb: 0, 0, 0;\n  --cros-separator-color: rgba(var(--cros-separator-color-rgb), 0.14);\n\n  --cros-shadow-color-key-rgb: var(--google-grey-800-rgb);\n  --cros-shadow-color-key: rgba(var(--cros-shadow-color-key-rgb), 0.3);\n\n  --cros-shadow-color-ambient-rgb: var(--google-grey-800-rgb);\n  --cros-shadow-color-ambient: rgba(var(--cros-shadow-color-ambient-rgb), 0.15);\n\n  --cros-link-color-rgb: var(--cros-color-prominent-rgb);\n  --cros-link-color: var(--cros-color-prominent);\n\n  --cros-highlight-color-rgb: var(--google-blue-50-rgb);\n  --cros-highlight-color: var(--google-blue-50);\n\n  --cros-highlight-color-error-rgb: var(--google-red-50-rgb);\n  --cros-highlight-color-error: var(--google-red-50);\n\n  --cros-highlight-color-hover-light-rgb: var(--google-grey-700-rgb);\n  --cros-highlight-color-hover-light: rgba(var(--cros-highlight-color-hover-light-rgb), 0.2);\n\n  --cros-highlight-color-hover-dark-rgb: 255, 255, 255;\n  --cros-highlight-color-hover-dark: rgba(var(--cros-highlight-color-hover-dark-rgb), 0.2);\n\n  --cros-highlight-color-hover-rgb: var(--cros-highlight-color-hover-light-rgb);\n  --cros-highlight-color-hover: var(--cros-highlight-color-hover-light);\n\n  --cros-highlight-color-focus-rgb: 0, 0, 0;\n  --cros-highlight-color-focus: rgba(var(--cros-highlight-color-focus-rgb), var(--cros-ripple-opacity));\n\n  --cros-highlight-color-green-rgb: var(--google-green-50-rgb);\n  --cros-highlight-color-green: rgb(var(--cros-highlight-color-green-rgb));\n\n  --cros-highlight-color-red-rgb: var(--google-red-50-rgb);\n  --cros-highlight-color-red: rgb(var(--cros-highlight-color-red-rgb));\n\n  --cros-highlight-color-yellow-rgb: var(--google-yellow-50-rgb);\n  --cros-highlight-color-yellow: rgb(var(--cros-highlight-color-yellow-rgb));\n\n  --cros-ripple-color-light-rgb: 0, 0, 0;\n  --cros-ripple-color-light: rgba(var(--cros-ripple-color-light-rgb), var(--cros-ripple-opacity));\n\n  --cros-ripple-color-dark-rgb: 255, 255, 255;\n  --cros-ripple-color-dark: rgba(var(--cros-ripple-color-dark-rgb), var(--cros-ripple-opacity));\n\n  --cros-ripple-color-rgb: var(--cros-ripple-color-light-rgb);\n  --cros-ripple-color: var(--cros-ripple-color-light);\n\n  --cros-ripple-color-prominent-rgb: var(--cros-color-prominent-rgb);\n  --cros-ripple-color-prominent: rgba(var(--cros-ripple-color-prominent-rgb), var(--cros-ripple-opacity));\n\n  --cros-toolbar-search-bg-color-rgb: var(--google-grey-100-rgb);\n  --cros-toolbar-search-bg-color: var(--google-grey-100);\n\n  --cros-menu-item-bg-color-focus-rgb: var(--cros-highlight-color-focus-rgb);\n  --cros-menu-item-bg-color-focus: var(--cros-highlight-color-focus);\n\n  --cros-menu-item-ripple-color-rgb: var(--cros-ripple-color-rgb);\n  --cros-menu-item-ripple-color: var(--cros-ripple-color);\n\n  --cros-radio-button-color-rgb: var(--cros-color-prominent-rgb);\n  --cros-radio-button-color: var(--cros-color-prominent);\n\n  --cros-radio-button-ripple-color-rgb: var(--cros-radio-button-color-rgb);\n  --cros-radio-button-ripple-color: rgba(var(--cros-radio-button-ripple-color-rgb), 0.2);\n\n  --cros-radio-button-color-unchecked-rgb: var(--google-grey-700-rgb);\n  --cros-radio-button-color-unchecked: var(--google-grey-700);\n\n  --cros-radio-button-ripple-color-unchecked-rgb: var(--google-grey-600-rgb);\n  --cros-radio-button-ripple-color-unchecked: rgba(var(--cros-radio-button-ripple-color-unchecked-rgb), 0.15);\n\n  --cros-button-background-color-primary-rgb: var(--cros-color-prominent-rgb);\n  --cros-button-background-color-primary: var(--cros-color-prominent);\n\n  --cros-button-label-color-primary-rgb: 255, 255, 255;\n  --cros-button-label-color-primary: rgb(var(--cros-button-label-color-primary-rgb));\n\n  --cros-button-ripple-color-primary-rgb: 255, 255, 255;\n  --cros-button-ripple-color-primary: rgb(var(--cros-button-ripple-color-primary-rgb));\n\n  --cros-button-background-color-primary-hover-rgb: 0, 0, 0;\n  --cros-button-background-color-primary-hover: rgba(var(--cros-button-background-color-primary-hover-rgb), 0.08);\n\n  --cros-button-background-color-primary-hover-preblended-rgb: 24, 106, 213;\n  --cros-button-background-color-primary-hover-preblended: rgb(var(--cros-button-background-color-primary-hover-preblended-rgb));\n\n  --cros-button-active-shadow-color-ambient-primary-rgb: var(--google-blue-500-rgb);\n  --cros-button-active-shadow-color-ambient-primary: rgba(var(--cros-button-active-shadow-color-ambient-primary-rgb), 0.15);\n\n  --cros-button-active-shadow-color-key-primary-rgb: var(--google-blue-500-rgb);\n  --cros-button-active-shadow-color-key-primary: rgba(var(--cros-button-active-shadow-color-key-primary-rgb), 0.3);\n\n  --cros-button-background-color-primary-disabled-rgb: var(--google-grey-100-rgb);\n  --cros-button-background-color-primary-disabled: var(--google-grey-100);\n\n  --cros-button-label-color-primary-disabled-rgb: var(--google-grey-600-rgb);\n  --cros-button-label-color-primary-disabled: var(--google-grey-600);\n\n  --cros-button-label-color-secondary-rgb: var(--cros-color-prominent-rgb);\n  --cros-button-label-color-secondary: var(--cros-color-prominent);\n\n  --cros-button-stroke-color-secondary-rgb: var(--google-grey-300-rgb);\n  --cros-button-stroke-color-secondary: var(--google-grey-300);\n\n  --cros-button-ripple-color-secondary-rgb: var(--cros-color-prominent-rgb);\n  --cros-button-ripple-color-secondary: var(--cros-color-prominent);\n\n  --cros-button-stroke-color-secondary-hover-rgb: var(--google-blue-100-rgb);\n  --cros-button-stroke-color-secondary-hover: var(--google-blue-100);\n\n  --cros-button-background-color-secondary-hover-rgb: var(--google-blue-500-rgb);\n  --cros-button-background-color-secondary-hover: rgba(var(--cros-button-background-color-secondary-hover-rgb), 0.04);\n\n  --cros-button-active-shadow-color-ambient-secondary-rgb: var(--google-grey-500-rgb);\n  --cros-button-active-shadow-color-ambient-secondary: rgba(var(--cros-button-active-shadow-color-ambient-secondary-rgb), 0.15);\n\n  --cros-button-active-shadow-color-key-secondary-rgb: var(--google-grey-500-rgb);\n  --cros-button-active-shadow-color-key-secondary: rgba(var(--cros-button-active-shadow-color-key-secondary-rgb), 0.3);\n\n  --cros-button-label-color-secondary-disabled-rgb: var(--google-grey-600-rgb);\n  --cros-button-label-color-secondary-disabled: var(--google-grey-600);\n\n  --cros-button-stroke-color-secondary-disabled-rgb: var(--google-grey-100-rgb);\n  --cros-button-stroke-color-secondary-disabled: var(--google-grey-100);\n\n  --cros-button-icon-color-primary-rgb: 255, 255, 255;\n  --cros-button-icon-color-primary: rgb(var(--cros-button-icon-color-primary-rgb));\n\n  --cros-button-icon-color-primary-disabled-rgb: var(--google-grey-600-rgb);\n  --cros-button-icon-color-primary-disabled: var(--google-grey-600);\n\n  --cros-button-icon-color-secondary-rgb: var(--google-blue-600-rgb);\n  --cros-button-icon-color-secondary: var(--google-blue-600);\n\n  --cros-button-icon-color-secondary-disabled-rgb: var(--google-grey-200-rgb);\n  --cros-button-icon-color-secondary-disabled: var(--google-grey-200);\n\n  --cros-icon-button-background-color-rgb: 241, 242, 244;\n  --cros-icon-button-background-color: rgba(var(--cros-icon-button-background-color-rgb), 0.864);\n\n  --cros-icon-button-pressed-color-rgb: 0, 0, 0;\n  --cros-icon-button-pressed-color: rgba(var(--cros-icon-button-pressed-color-rgb), 0.1164);\n\n  --cros-menu-label-color-rgb: var(--google-grey-900-rgb);\n  --cros-menu-label-color: var(--google-grey-900);\n\n  --cros-menu-icon-color-rgb: var(--google-grey-900-rgb);\n  --cros-menu-icon-color: var(--google-grey-900);\n\n  --cros-menu-shortcut-color-rgb: var(--google-grey-700-rgb);\n  --cros-menu-shortcut-color: var(--google-grey-700);\n\n  --cros-menu-item-background-hover-rgb: var(--cros-ripple-color-rgb);\n  --cros-menu-item-background-hover: var(--cros-ripple-color);\n\n  --cros-nudge-label-color-rgb: var(--cros-button-label-color-primary-rgb);\n  --cros-nudge-label-color: var(--cros-button-label-color-primary);\n\n  --cros-nudge-icon-color-rgb: var(--cros-button-icon-color-primary-rgb);\n  --cros-nudge-icon-color: var(--cros-button-icon-color-primary);\n\n  --cros-nudge-background-color-rgb: var(--cros-color-prominent-rgb);\n  --cros-nudge-background-color: var(--cros-color-prominent);\n\n  --cros-app-scrollbar-color-hover-rgb: var(--google-grey-600-rgb);\n  --cros-app-scrollbar-color-hover: var(--google-grey-600);\n\n  --cros-app-scrollbar-color-rgb: var(--cros-app-scrollbar-color-hover-rgb);\n  --cros-app-scrollbar-color: rgba(var(--cros-app-scrollbar-color-rgb), var(--cros-disabled-opacity));\n\n  --cros-slider-color-active-rgb: var(--cros-color-prominent-rgb);\n  --cros-slider-color-active: var(--cros-color-prominent);\n\n  --cros-slider-color-inactive-rgb: var(--cros-color-secondary-rgb);\n  --cros-slider-color-inactive: var(--cros-color-secondary);\n\n  --cros-slider-label-background-color-rgb: var(--cros-color-prominent-rgb);\n  --cros-slider-label-background-color: var(--cros-color-prominent);\n\n  --cros-slider-label-text-color-rgb: 255, 255, 255;\n  --cros-slider-label-text-color: rgb(var(--cros-slider-label-text-color-rgb));\n\n  --cros-slider-track-color-active-rgb: var(--cros-slider-color-active-rgb);\n  --cros-slider-track-color-active: rgba(var(--cros-slider-track-color-active-rgb), var(--cros-second-tone-opacity));\n\n  --cros-slider-track-color-inactive-rgb: var(--cros-slider-color-inactive-rgb);\n  --cros-slider-track-color-inactive: rgba(var(--cros-slider-track-color-inactive-rgb), var(--cros-second-tone-opacity));\n\n  --cros-switch-knob-color-active-rgb: var(--cros-color-prominent-rgb);\n  --cros-switch-knob-color-active: var(--cros-color-prominent);\n\n  --cros-switch-knob-color-inactive-rgb: 255, 255, 255;\n  --cros-switch-knob-color-inactive: rgb(var(--cros-switch-knob-color-inactive-rgb));\n\n  --cros-switch-track-color-active-rgb: var(--cros-slider-track-color-active-rgb);\n  --cros-switch-track-color-active: var(--cros-slider-track-color-active);\n\n  --cros-switch-track-color-inactive-rgb: var(--cros-slider-track-color-inactive-rgb);\n  --cros-switch-track-color-inactive: var(--cros-slider-track-color-inactive);\n\n  --cros-tab-label-color-active-rgb: var(--google-blue-600-rgb);\n  --cros-tab-label-color-active: var(--google-blue-600);\n\n  --cros-tab-label-color-inactive-rgb: var(--google-grey-600-rgb);\n  --cros-tab-label-color-inactive: var(--google-grey-600);\n\n  --cros-tab-icon-color-active-rgb: var(--google-blue-600-rgb);\n  --cros-tab-icon-color-active: var(--google-blue-600);\n\n  --cros-tab-icon-color-inactive-rgb: var(--google-grey-600-rgb);\n  --cros-tab-icon-color-inactive: var(--google-grey-600);\n\n  --cros-tab-slider-track-color-rgb: 0, 0, 0;\n  --cros-tab-slider-track-color: rgba(var(--cros-tab-slider-track-color-rgb), 0.06);\n\n  --cros-textfield-background-color-rgb: var(--google-grey-100-rgb);\n  --cros-textfield-background-color: var(--google-grey-100);\n\n  --cros-textfield-label-color-rgb: var(--google-grey-700-rgb);\n  --cros-textfield-label-color: var(--google-grey-700);\n\n  --cros-textfield-input-color-rgb: var(--cros-color-primary-rgb);\n  --cros-textfield-input-color: var(--cros-color-primary);\n\n  --cros-textfield-cursor-color-focus-rgb: var(--cros-color-prominent-rgb);\n  --cros-textfield-cursor-color-focus: var(--cros-color-prominent);\n\n  --cros-textfield-label-color-focus-rgb: var(--cros-color-prominent-rgb);\n  --cros-textfield-label-color-focus: var(--cros-color-prominent);\n\n  --cros-textfield-label-color-error-rgb: var(--google-red-600-rgb);\n  --cros-textfield-label-color-error: var(--google-red-600);\n\n  --cros-textfield-underline-color-error-rgb: var(--cros-color-alert-rgb);\n  --cros-textfield-underline-color-error: var(--cros-color-alert);\n\n  --cros-textfield-cursor-color-error-rgb: var(--cros-color-alert-rgb);\n  --cros-textfield-cursor-color-error: var(--cros-color-alert);\n\n  --cros-textfield-background-color-disabled-rgb: var(--google-grey-100-rgb);\n  --cros-textfield-background-color-disabled: rgba(var(--cros-textfield-background-color-disabled-rgb), 0.38);\n\n  --cros-textfield-label-color-disabled-rgb: var(--google-grey-700-rgb);\n  --cros-textfield-label-color-disabled: rgba(var(--cros-textfield-label-color-disabled-rgb), 0.38);\n\n  --cros-textfield-input-color-disabled-rgb: var(--google-grey-900-rgb);\n  --cros-textfield-input-color-disabled: rgba(var(--cros-textfield-input-color-disabled-rgb), 0.38);\n\n  --cros-tooltip-background-color-rgb: var(--google-grey-900-rgb);\n  --cros-tooltip-background-color: rgba(var(--cros-tooltip-background-color-rgb), 0.8);\n\n  --cros-tooltip-icon-color-rgb: var(--cros-color-primary-inverted-rgb);\n  --cros-tooltip-icon-color: var(--cros-color-primary-inverted);\n\n  --cros-tooltip-label-color-rgb: var(--google-grey-100-rgb);\n  --cros-tooltip-label-color: var(--google-grey-100);\n\n  --cros-tooltip-link-color-rgb: var(--cros-color-prominent-inverted-rgb);\n  --cros-tooltip-link-color: var(--cros-color-prominent-inverted);\n\n  --cros-shortcut-background-color-rgb: var(--google-grey-200-rgb);\n  --cros-shortcut-background-color: var(--google-grey-200);\n\n  --cros-shortcut-background-gradient-color-rgb: 255, 255, 255;\n  --cros-shortcut-background-gradient-color: rgba(var(--cros-shortcut-background-gradient-color-rgb), 0);\n\n  --cros-dialog-title-background-color-rgb: var(--google-grey-100-rgb);\n  --cros-dialog-title-background-color: var(--google-grey-100);\n\n  --cros-dialog-title-bar-color-light-rgb: 223, 224, 225;\n  --cros-dialog-title-bar-color-light: rgb(var(--cros-dialog-title-bar-color-light-rgb));\n\n  --cros-dialog-title-bar-color-dark-rgb: 77, 77, 80;\n  --cros-dialog-title-bar-color-dark: rgb(var(--cros-dialog-title-bar-color-dark-rgb));\n\n  --cros-dialog-title-bar-color-rgb: var(--cros-dialog-title-bar-color-light-rgb);\n  --cros-dialog-title-bar-color: var(--cros-dialog-title-bar-color-light);\n\n  --cros-toast-background-color-rgb: var(--cros-bg-color-elevation-2-inverted-rgb);\n  --cros-toast-background-color: var(--cros-bg-color-elevation-2-inverted);\n\n  --cros-toast-button-color-rgb: var(--cros-color-prominent-inverted-rgb);\n  --cros-toast-button-color: var(--cros-color-prominent-inverted);\n\n  --cros-toast-text-color-rgb: var(--cros-color-primary-inverted-rgb);\n  --cros-toast-text-color: var(--cros-color-primary-inverted);\n\n  --cros-toast-icon-color-rgb: var(--cros-color-primary-inverted-rgb);\n  --cros-toast-icon-color: var(--cros-color-primary-inverted);\n\n  --cros-toast-icon-color-warning-rgb: var(--cros-color-warning-inverted-rgb);\n  --cros-toast-icon-color-warning: var(--cros-color-warning-inverted);\n\n  --cros-toast-icon-color-error-rgb: var(--cros-color-alert-inverted-rgb);\n  --cros-toast-icon-color-error: var(--cros-color-alert-inverted);\n\n  --cros-selection-outline-rgb: 0, 0, 0;\n  --cros-selection-outline: rgba(var(--cros-selection-outline-rgb), 0.1);\n\n  --cros-swatch-border-rgb: var(--google-grey-900-rgb);\n  --cros-swatch-border: rgba(var(--cros-swatch-border-rgb), 0.5);\n\n  --cros-illustration-color-1-rgb: var(--google-blue-500-rgb);\n  --cros-illustration-color-1: var(--google-blue-500);\n\n  --cros-illustration-color-2-rgb: var(--google-green-500-rgb);\n  --cros-illustration-color-2: var(--google-green-500);\n\n  --cros-illustration-color-3-rgb: var(--google-yellow-500-rgb);\n  --cros-illustration-color-3: var(--google-yellow-500);\n\n  --cros-illustration-color-4-rgb: var(--google-red-500-rgb);\n  --cros-illustration-color-4: var(--google-red-500);\n\n  --cros-illustration-color-5-rgb: 238, 95, 250;\n  --cros-illustration-color-5: rgb(var(--cros-illustration-color-5-rgb));\n\n  --cros-illustration-color-6-rgb: 48, 226, 234;\n  --cros-illustration-color-6: rgb(var(--cros-illustration-color-6-rgb));\n\n  --cros-illustration-base-color-rgb: 255, 255, 255;\n  --cros-illustration-base-color: rgb(var(--cros-illustration-base-color-rgb));\n\n  --cros-illustration-secondary-color-rgb: var(--google-grey-200-rgb);\n  --cros-illustration-secondary-color: var(--google-grey-200);\n\n  --cros-illustration-color-1-shade-1-rgb: var(--google-blue-300-rgb);\n  --cros-illustration-color-1-shade-1: var(--google-blue-300);\n\n  --cros-illustration-color-1-shade-2-rgb: var(--google-blue-100-rgb);\n  --cros-illustration-color-1-shade-2: var(--google-blue-100);\n\n  --cros-illustration-elevation-color-1-shade-1-rgb: var(--cros-illustration-color-1-shade-1-rgb);\n  --cros-illustration-elevation-color-1-shade-1: var(--cros-illustration-color-1-shade-1);\n\n  --cros-illustration-elevation-color-1-shade-2-rgb: var(--cros-illustration-color-1-shade-2-rgb);\n  --cros-illustration-elevation-color-1-shade-2: var(--cros-illustration-color-1-shade-2);\n\n  --cros-illustration-elevation-base-color-rgb: var(--cros-illustration-base-color-rgb);\n  --cros-illustration-elevation-base-color: var(--cros-illustration-base-color);\n\n  --cros-illustration-elevation-secondary-color-rgb: var(--cros-illustration-secondary-color-rgb);\n  --cros-illustration-elevation-secondary-color: var(--cros-illustration-secondary-color);\n\n  --cros-color-preview-red-rgb: var(--google-red-600-rgb);\n  --cros-color-preview-red: var(--google-red-600);\n\n  --cros-color-preview-orange-rgb: var(--google-orange-600-rgb);\n  --cros-color-preview-orange: var(--google-orange-600);\n\n  --cros-color-preview-yellow-rgb: var(--google-yellow-600-rgb);\n  --cros-color-preview-yellow: var(--google-yellow-600);\n\n  --cros-color-preview-green-rgb: var(--google-green-600-rgb);\n  --cros-color-preview-green: var(--google-green-600);\n\n  --cros-color-preview-cyan-rgb: var(--google-cyan-600-rgb);\n  --cros-color-preview-cyan: var(--google-cyan-600);\n\n  --cros-color-preview-blue-rgb: var(--google-blue-600-rgb);\n  --cros-color-preview-blue: var(--google-blue-600);\n\n  --cros-color-preview-purple-rgb: var(--google-purple-600-rgb);\n  --cros-color-preview-purple: var(--google-purple-600);\n\n  --cros-color-preview-grey-rgb: var(--google-grey-600-rgb);\n  --cros-color-preview-grey: var(--google-grey-600);\n\n  --google-blue-50-rgb: 232, 240, 254;\n  --google-blue-50: rgb(var(--google-blue-50-rgb));\n\n  --google-blue-100-rgb: 210, 227, 252;\n  --google-blue-100: rgb(var(--google-blue-100-rgb));\n\n  --google-blue-200-rgb: 174, 203, 250;\n  --google-blue-200: rgb(var(--google-blue-200-rgb));\n\n  --google-blue-300-rgb: 138, 180, 248;\n  --google-blue-300: rgb(var(--google-blue-300-rgb));\n\n  --google-blue-400-rgb: 102, 157, 246;\n  --google-blue-400: rgb(var(--google-blue-400-rgb));\n\n  --google-blue-500-rgb: 66, 133, 244;\n  --google-blue-500: rgb(var(--google-blue-500-rgb));\n\n  --google-blue-600-rgb: 26, 115, 232;\n  --google-blue-600: rgb(var(--google-blue-600-rgb));\n\n  --google-blue-700-rgb: 25, 103, 210;\n  --google-blue-700: rgb(var(--google-blue-700-rgb));\n\n  --google-blue-800-rgb: 24, 90, 188;\n  --google-blue-800: rgb(var(--google-blue-800-rgb));\n\n  --google-blue-900-rgb: 23, 78, 166;\n  --google-blue-900: rgb(var(--google-blue-900-rgb));\n\n  --google-green-50-rgb: 230, 244, 234;\n  --google-green-50: rgb(var(--google-green-50-rgb));\n\n  --google-green-100-rgb: 206, 234, 214;\n  --google-green-100: rgb(var(--google-green-100-rgb));\n\n  --google-green-200-rgb: 168, 218, 181;\n  --google-green-200: rgb(var(--google-green-200-rgb));\n\n  --google-green-300-rgb: 129, 201, 149;\n  --google-green-300: rgb(var(--google-green-300-rgb));\n\n  --google-green-400-rgb: 91, 185, 116;\n  --google-green-400: rgb(var(--google-green-400-rgb));\n\n  --google-green-500-rgb: 52, 168, 83;\n  --google-green-500: rgb(var(--google-green-500-rgb));\n\n  --google-green-600-rgb: 30, 142, 62;\n  --google-green-600: rgb(var(--google-green-600-rgb));\n\n  --google-green-700-rgb: 24, 128, 56;\n  --google-green-700: rgb(var(--google-green-700-rgb));\n\n  --google-green-800-rgb: 19, 115, 51;\n  --google-green-800: rgb(var(--google-green-800-rgb));\n\n  --google-green-900-rgb: 13, 101, 45;\n  --google-green-900: rgb(var(--google-green-900-rgb));\n\n  --google-grey-50-rgb: 248, 249, 250;\n  --google-grey-50: rgb(var(--google-grey-50-rgb));\n\n  --google-grey-100-rgb: 241, 243, 244;\n  --google-grey-100: rgb(var(--google-grey-100-rgb));\n\n  --google-grey-200-rgb: 232, 234, 237;\n  --google-grey-200: rgb(var(--google-grey-200-rgb));\n\n  --google-grey-300-rgb: 218, 220, 224;\n  --google-grey-300: rgb(var(--google-grey-300-rgb));\n\n  --google-grey-400-rgb: 189, 193, 198;\n  --google-grey-400: rgb(var(--google-grey-400-rgb));\n\n  --google-grey-500-rgb: 154, 160, 166;\n  --google-grey-500: rgb(var(--google-grey-500-rgb));\n\n  --google-grey-600-rgb: 128, 134, 139;\n  --google-grey-600: rgb(var(--google-grey-600-rgb));\n\n  --google-grey-700-rgb: 95, 99, 104;\n  --google-grey-700: rgb(var(--google-grey-700-rgb));\n\n  --google-grey-800-rgb: 60, 64, 67;\n  --google-grey-800: rgb(var(--google-grey-800-rgb));\n\n  --google-grey-900-rgb: 32, 33, 36;\n  --google-grey-900: rgb(var(--google-grey-900-rgb));\n\n  --google-red-50-rgb: 252, 232, 230;\n  --google-red-50: rgb(var(--google-red-50-rgb));\n\n  --google-red-100-rgb: 250, 210, 207;\n  --google-red-100: rgb(var(--google-red-100-rgb));\n\n  --google-red-200-rgb: 246, 174, 169;\n  --google-red-200: rgb(var(--google-red-200-rgb));\n\n  --google-red-300-rgb: 242, 139, 130;\n  --google-red-300: rgb(var(--google-red-300-rgb));\n\n  --google-red-400-rgb: 238, 103, 92;\n  --google-red-400: rgb(var(--google-red-400-rgb));\n\n  --google-red-500-rgb: 234, 67, 53;\n  --google-red-500: rgb(var(--google-red-500-rgb));\n\n  --google-red-600-rgb: 217, 48, 37;\n  --google-red-600: rgb(var(--google-red-600-rgb));\n\n  --google-red-700-rgb: 197, 34, 31;\n  --google-red-700: rgb(var(--google-red-700-rgb));\n\n  --google-red-800-rgb: 179, 20, 18;\n  --google-red-800: rgb(var(--google-red-800-rgb));\n\n  --google-red-900-rgb: 165, 14, 14;\n  --google-red-900: rgb(var(--google-red-900-rgb));\n\n  --google-yellow-50-rgb: 254, 247, 224;\n  --google-yellow-50: rgb(var(--google-yellow-50-rgb));\n\n  --google-yellow-100-rgb: 254, 239, 195;\n  --google-yellow-100: rgb(var(--google-yellow-100-rgb));\n\n  --google-yellow-200-rgb: 253, 226, 147;\n  --google-yellow-200: rgb(var(--google-yellow-200-rgb));\n\n  --google-yellow-300-rgb: 253, 214, 99;\n  --google-yellow-300: rgb(var(--google-yellow-300-rgb));\n\n  --google-yellow-400-rgb: 252, 201, 52;\n  --google-yellow-400: rgb(var(--google-yellow-400-rgb));\n\n  --google-yellow-500-rgb: 251, 188, 4;\n  --google-yellow-500: rgb(var(--google-yellow-500-rgb));\n\n  --google-yellow-600-rgb: 249, 171, 0;\n  --google-yellow-600: rgb(var(--google-yellow-600-rgb));\n\n  --google-yellow-700-rgb: 242, 153, 0;\n  --google-yellow-700: rgb(var(--google-yellow-700-rgb));\n\n  --google-yellow-800-rgb: 234, 134, 0;\n  --google-yellow-800: rgb(var(--google-yellow-800-rgb));\n\n  --google-yellow-900-rgb: 227, 116, 0;\n  --google-yellow-900: rgb(var(--google-yellow-900-rgb));\n\n  --google-orange-50-rgb: 254, 239, 227;\n  --google-orange-50: rgb(var(--google-orange-50-rgb));\n\n  --google-orange-100-rgb: 254, 223, 200;\n  --google-orange-100: rgb(var(--google-orange-100-rgb));\n\n  --google-orange-200-rgb: 253, 198, 156;\n  --google-orange-200: rgb(var(--google-orange-200-rgb));\n\n  --google-orange-300-rgb: 252, 173, 112;\n  --google-orange-300: rgb(var(--google-orange-300-rgb));\n\n  --google-orange-400-rgb: 250, 144, 62;\n  --google-orange-400: rgb(var(--google-orange-400-rgb));\n\n  --google-orange-500-rgb: 250, 123, 23;\n  --google-orange-500: rgb(var(--google-orange-500-rgb));\n\n  --google-orange-600-rgb: 232, 113, 10;\n  --google-orange-600: rgb(var(--google-orange-600-rgb));\n\n  --google-orange-700-rgb: 213, 110, 12;\n  --google-orange-700: rgb(var(--google-orange-700-rgb));\n\n  --google-orange-800-rgb: 194, 100, 1;\n  --google-orange-800: rgb(var(--google-orange-800-rgb));\n\n  --google-orange-900-rgb: 176, 96, 0;\n  --google-orange-900: rgb(var(--google-orange-900-rgb));\n\n  --google-pink-50-rgb: 253, 231, 243;\n  --google-pink-50: rgb(var(--google-pink-50-rgb));\n\n  --google-pink-100-rgb: 253, 207, 232;\n  --google-pink-100: rgb(var(--google-pink-100-rgb));\n\n  --google-pink-200-rgb: 251, 169, 214;\n  --google-pink-200: rgb(var(--google-pink-200-rgb));\n\n  --google-pink-300-rgb: 255, 139, 203;\n  --google-pink-300: rgb(var(--google-pink-300-rgb));\n\n  --google-pink-400-rgb: 255, 99, 184;\n  --google-pink-400: rgb(var(--google-pink-400-rgb));\n\n  --google-pink-500-rgb: 244, 57, 160;\n  --google-pink-500: rgb(var(--google-pink-500-rgb));\n\n  --google-pink-600-rgb: 229, 37, 146;\n  --google-pink-600: rgb(var(--google-pink-600-rgb));\n\n  --google-pink-700-rgb: 208, 24, 132;\n  --google-pink-700: rgb(var(--google-pink-700-rgb));\n\n  --google-pink-800-rgb: 184, 6, 114;\n  --google-pink-800: rgb(var(--google-pink-800-rgb));\n\n  --google-pink-900-rgb: 156, 22, 107;\n  --google-pink-900: rgb(var(--google-pink-900-rgb));\n\n  --google-purple-50-rgb: 243, 232, 253;\n  --google-purple-50: rgb(var(--google-purple-50-rgb));\n\n  --google-purple-100-rgb: 233, 210, 253;\n  --google-purple-100: rgb(var(--google-purple-100-rgb));\n\n  --google-purple-200-rgb: 215, 174, 251;\n  --google-purple-200: rgb(var(--google-purple-200-rgb));\n\n  --google-purple-300-rgb: 197, 138, 249;\n  --google-purple-300: rgb(var(--google-purple-300-rgb));\n\n  --google-purple-400-rgb: 175, 92, 247;\n  --google-purple-400: rgb(var(--google-purple-400-rgb));\n\n  --google-purple-500-rgb: 161, 66, 244;\n  --google-purple-500: rgb(var(--google-purple-500-rgb));\n\n  --google-purple-600-rgb: 147, 52, 230;\n  --google-purple-600: rgb(var(--google-purple-600-rgb));\n\n  --google-purple-700-rgb: 132, 48, 206;\n  --google-purple-700: rgb(var(--google-purple-700-rgb));\n\n  --google-purple-800-rgb: 118, 39, 187;\n  --google-purple-800: rgb(var(--google-purple-800-rgb));\n\n  --google-purple-900-rgb: 104, 29, 168;\n  --google-purple-900: rgb(var(--google-purple-900-rgb));\n\n  --google-cyan-50-rgb: 228, 247, 251;\n  --google-cyan-50: rgb(var(--google-cyan-50-rgb));\n\n  --google-cyan-100-rgb: 203, 240, 248;\n  --google-cyan-100: rgb(var(--google-cyan-100-rgb));\n\n  --google-cyan-200-rgb: 161, 228, 242;\n  --google-cyan-200: rgb(var(--google-cyan-200-rgb));\n\n  --google-cyan-300-rgb: 120, 217, 236;\n  --google-cyan-300: rgb(var(--google-cyan-300-rgb));\n\n  --google-cyan-400-rgb: 78, 205, 230;\n  --google-cyan-400: rgb(var(--google-cyan-400-rgb));\n\n  --google-cyan-500-rgb: 36, 193, 224;\n  --google-cyan-500: rgb(var(--google-cyan-500-rgb));\n\n  --google-cyan-600-rgb: 18, 181, 203;\n  --google-cyan-600: rgb(var(--google-cyan-600-rgb));\n\n  --google-cyan-700-rgb: 18, 158, 175;\n  --google-cyan-700: rgb(var(--google-cyan-700-rgb));\n\n  --google-cyan-800-rgb: 9, 133, 145;\n  --google-cyan-800: rgb(var(--google-cyan-800-rgb));\n\n  --google-cyan-900-rgb: 0, 123, 131;\n  --google-cyan-900: rgb(var(--google-cyan-900-rgb));\n\n  --cros-dialog-scrim-color-rgb: var(--cros-app-shield-60-rgb);\n  --cros-dialog-scrim-color: var(--cros-app-shield-60);\n\n  --cros-highlight-color-matching-rgb: 255, 255, 0;\n  --cros-highlight-color-matching: rgba(var(--cros-highlight-color-matching-rgb), 0.46);\n\n  --cros-highlight-color-matching-focus-rgb: 255, 150, 50;\n  --cros-highlight-color-matching-focus: rgba(var(--cros-highlight-color-matching-focus-rgb), 0.52);\n\n  --cros-ripple-color-opaque-rgb: var(--cros-ripple-color-rgb);\n  --cros-ripple-color-opaque: rgb(var(--cros-ripple-color-opaque-rgb));\n\n  --cros-ripple-color-prominent-opaque-rgb: var(--cros-color-prominent-rgb);\n  --cros-ripple-color-prominent-opaque: var(--cros-color-prominent);\n\n  --cros-selected-navigation-tree-item-color-rgb: var(--cros-text-color-selection-rgb);\n  --cros-selected-navigation-tree-item-color: var(--cros-text-color-selection);\n\n  --cros-child-selected-navigation-tree-item-color-rgb: var(--cros-text-color-selection-rgb);\n  --cros-child-selected-navigation-tree-item-color: var(--cros-text-color-selection);\n\n  --cros-hovered-navigation-tree-item-background-color-rgb: var(--cros-ripple-color-rgb);\n  --cros-hovered-navigation-tree-item-background-color: var(--cros-ripple-color);\n\n  --cros-resizable-rect-corner-handle-rgb: var(--cros-icon-color-prominent-rgb);\n  --cros-resizable-rect-corner-handle: var(--cros-icon-color-prominent);\n\n  --cros-textfield-suffixes-color-rgb: var(--google-grey-700-rgb);\n  --cros-textfield-suffixes-color: var(--google-grey-700);\n\n  --cros-textfield-hint-text-color-rgb: var(--google-grey-700-rgb);\n  --cros-textfield-hint-text-color: var(--google-grey-700);\n\n  --cros-textfield-underline-color-focus-rgb: var(--google-blue-600-rgb);\n  --cros-textfield-underline-color-focus: var(--google-blue-600);\n\n  --cros-textfield-hint-text-color-error-rgb: var(--google-red-600-rgb);\n  --cros-textfield-hint-text-color-error: var(--google-red-600);\n\n  --cros-menu-bg-color-rgb: var(--cros-bg-color-elevation-2-rgb);\n  --cros-menu-bg-color: var(--cros-bg-color-elevation-2);\n\n  --cros-color-swatch-outline-rgb: 0, 0, 0;\n  --cros-color-swatch-outline: rgba(var(--cros-color-swatch-outline-rgb), 0.14);\n\n  --cros-white-on-white-border-color-rgb: var(--google-grey-200-rgb);\n  --cros-white-on-white-border-color: var(--google-grey-200);\n\n  --cros-a4-color-palette-black-rgb: 0, 0, 0;\n  --cros-a4-color-palette-black: rgb(var(--cros-a4-color-palette-black-rgb));\n\n  --cros-a4-color-palette-white-rgb: 255, 255, 255;\n  --cros-a4-color-palette-white: rgb(var(--cros-a4-color-palette-white-rgb));\n\n  --cros-a4-color-palette-grey-100-rgb: var(--google-grey-100-rgb);\n  --cros-a4-color-palette-grey-100: var(--google-grey-100);\n\n  --cros-a4-color-palette-grey-300-rgb: var(--google-grey-300-rgb);\n  --cros-a4-color-palette-grey-300: var(--google-grey-300);\n\n  --cros-a4-color-palette-grey-500-rgb: var(--google-grey-500-rgb);\n  --cros-a4-color-palette-grey-500: var(--google-grey-500);\n\n  --cros-a4-color-palette-grey-700-rgb: var(--google-grey-700-rgb);\n  --cros-a4-color-palette-grey-700: var(--google-grey-700);\n\n  --cros-a4-color-palette-grey-800-rgb: var(--google-grey-800-rgb);\n  --cros-a4-color-palette-grey-800: var(--google-grey-800);\n\n  --cros-a4-color-palette-red-300-rgb: var(--google-red-300-rgb);\n  --cros-a4-color-palette-red-300: var(--google-red-300);\n\n  --cros-a4-color-palette-red-500-rgb: var(--google-red-500-rgb);\n  --cros-a4-color-palette-red-500: var(--google-red-500);\n\n  --cros-a4-color-palette-red-600-rgb: var(--google-red-600-rgb);\n  --cros-a4-color-palette-red-600: var(--google-red-600);\n\n  --cros-a4-color-palette-red-700-rgb: var(--google-red-700-rgb);\n  --cros-a4-color-palette-red-700: var(--google-red-700);\n\n  --cros-a4-color-palette-yellow-300-rgb: var(--google-yellow-300-rgb);\n  --cros-a4-color-palette-yellow-300: var(--google-yellow-300);\n\n  --cros-a4-color-palette-yellow-500-rgb: var(--google-yellow-500-rgb);\n  --cros-a4-color-palette-yellow-500: var(--google-yellow-500);\n\n  --cros-a4-color-palette-yellow-700-rgb: var(--google-yellow-700-rgb);\n  --cros-a4-color-palette-yellow-700: var(--google-yellow-700);\n\n  --cros-a4-color-palette-green-300-rgb: var(--google-green-300-rgb);\n  --cros-a4-color-palette-green-300: var(--google-green-300);\n\n  --cros-a4-color-palette-green-500-rgb: var(--google-green-500-rgb);\n  --cros-a4-color-palette-green-500: var(--google-green-500);\n\n  --cros-a4-color-palette-green-700-rgb: var(--google-green-700-rgb);\n  --cros-a4-color-palette-green-700: var(--google-green-700);\n\n  --cros-a4-color-palette-blue-300-rgb: var(--google-blue-300-rgb);\n  --cros-a4-color-palette-blue-300: var(--google-blue-300);\n\n  --cros-a4-color-palette-blue-500-rgb: var(--google-blue-500-rgb);\n  --cros-a4-color-palette-blue-500: var(--google-blue-500);\n\n  --cros-a4-color-palette-blue-700-rgb: var(--google-blue-700-rgb);\n  --cros-a4-color-palette-blue-700: var(--google-blue-700);\n\n  --cros-a4-color-palette-purple-300-rgb: 197, 138, 249;\n  --cros-a4-color-palette-purple-300: rgb(var(--cros-a4-color-palette-purple-300-rgb));\n\n  --cros-a4-color-palette-purple-500-rgb: 161, 66, 244;\n  --cros-a4-color-palette-purple-500: rgb(var(--cros-a4-color-palette-purple-500-rgb));\n\n  --cros-a4-color-palette-purple-700-rgb: 132, 48, 206;\n  --cros-a4-color-palette-purple-700: rgb(var(--cros-a4-color-palette-purple-700-rgb));\n\n  --cros-a4-color-palette-cyan-300-rgb: 120, 217, 236;\n  --cros-a4-color-palette-cyan-300: rgb(var(--cros-a4-color-palette-cyan-300-rgb));\n\n  --cros-a4-color-palette-cyan-500-rgb: 36, 193, 224;\n  --cros-a4-color-palette-cyan-500: rgb(var(--cros-a4-color-palette-cyan-500-rgb));\n\n  --cros-a4-color-palette-cyan-700-rgb: 18, 164, 175;\n  --cros-a4-color-palette-cyan-700: rgb(var(--cros-a4-color-palette-cyan-700-rgb));\n\n  --cros-a4-color-palette-brown-300-rgb: 238, 201, 174;\n  --cros-a4-color-palette-brown-300: rgb(var(--cros-a4-color-palette-brown-300-rgb));\n\n  --cros-a4-color-palette-brown-500-rgb: 226, 161, 133;\n  --cros-a4-color-palette-brown-500: rgb(var(--cros-a4-color-palette-brown-500-rgb));\n\n  --cros-a4-color-palette-brown-700-rgb: 136, 89, 69;\n  --cros-a4-color-palette-brown-700: rgb(var(--cros-a4-color-palette-brown-700-rgb));\n\n  --cros-a4-color-palette-magenta-200-rgb: 244, 181, 251;\n  --cros-a4-color-palette-magenta-200: rgb(var(--cros-a4-color-palette-magenta-200-rgb));\n\n  --cros-a4-color-palette-magenta-400-rgb: 238, 95, 250;\n  --cros-a4-color-palette-magenta-400: rgb(var(--cros-a4-color-palette-magenta-400-rgb));\n\n  --cros-a4-color-palette-orange-rgb: 255, 174, 128;\n  --cros-a4-color-palette-orange: rgb(var(--cros-a4-color-palette-orange-rgb));\n\n  --cros-a4-color-palette-dark-orange-rgb: 255, 99, 12;\n  --cros-a4-color-palette-dark-orange: rgb(var(--cros-a4-color-palette-dark-orange-rgb));\n\n  --cros-a4-color-palette-lemon-400-rgb: 221, 243, 0;\n  --cros-a4-color-palette-lemon-400: rgb(var(--cros-a4-color-palette-lemon-400-rgb));\n\n  --cros-a4-color-palette-indigo-rgb: 83, 121, 255;\n  --cros-a4-color-palette-indigo: rgb(var(--cros-a4-color-palette-indigo-rgb));\n\n  --cros-a4-color-palette-aloe-400-rgb: 37, 227, 135;\n  --cros-a4-color-palette-aloe-400: rgb(var(--cros-a4-color-palette-aloe-400-rgb));\n\n  --cros-a4-note-placeholder-primary-rgb: var(--google-grey-300-rgb);\n  --cros-a4-note-placeholder-primary: var(--google-grey-300);\n\n  --cros-a4-note-placeholder-corner-fold-rgb: 255, 255, 255;\n  --cros-a4-note-placeholder-corner-fold: rgb(var(--cros-a4-note-placeholder-corner-fold-rgb));\n\n  --cros-a4-note-placeholder-detail-rgb: var(--google-grey-600-rgb);\n  --cros-a4-note-placeholder-detail: var(--google-grey-600);\n\n  --cros-calculator-display-bg-color-rgb: 255, 255, 255;\n  --cros-calculator-display-bg-color: rgb(var(--cros-calculator-display-bg-color-rgb));\n\n  --cros-calculator-primary-drawer-start-bg-color-rgb: var(--google-blue-50-rgb);\n  --cros-calculator-primary-drawer-start-bg-color: var(--google-blue-50);\n\n  --cros-calculator-primary-drawer-end-bg-color-rgb: var(--google-blue-600-rgb);\n  --cros-calculator-primary-drawer-end-bg-color: var(--google-blue-600);\n\n  --cros-calculator-secondary-drawer-bg-color-rgb: var(--google-blue-800-rgb);\n  --cros-calculator-secondary-drawer-bg-color: var(--google-blue-800);\n\n  --cros-calculator-tertiary-drawer-bg-color-rgb: var(--google-blue-900-rgb);\n  --cros-calculator-tertiary-drawer-bg-color: var(--google-blue-900);\n\n  --cros-calculator-numpad-button-color-rgb: var(--cros-color-primary-rgb);\n  --cros-calculator-numpad-button-color: var(--cros-color-primary);\n\n  --cros-calculator-operation-button-color-rgb: var(--cros-color-primary-inverted-rgb);\n  --cros-calculator-operation-button-color: var(--cros-color-primary-inverted);\n\n  --cros-calculator-clear-ripple-color-rgb: 0, 0, 0;\n  --cros-calculator-clear-ripple-color: rgba(var(--cros-calculator-clear-ripple-color-rgb), 0.06);\n\n  --cros-calculator-error-ripple-color-rgb: var(--cros-color-alert-rgb);\n  --cros-calculator-error-ripple-color: rgba(var(--cros-calculator-error-ripple-color-rgb), 0.3);\n\n  --cros-calculator-display-text-color-rgb: 0, 0, 0;\n  --cros-calculator-display-text-color: rgb(var(--cros-calculator-display-text-color-rgb));\n\n  --cros-canvas-tool-color-1-rgb: var(--google-grey-100-rgb);\n  --cros-canvas-tool-color-1: var(--google-grey-100);\n\n  --cros-canvas-tool-color-2-rgb: var(--google-grey-200-rgb);\n  --cros-canvas-tool-color-2: var(--google-grey-200);\n\n  --cros-canvas-tool-color-3-rgb: var(--google-grey-300-rgb);\n  --cros-canvas-tool-color-3: var(--google-grey-300);\n\n  --cros-canvas-tool-color-4-rgb: var(--google-grey-400-rgb);\n  --cros-canvas-tool-color-4: var(--google-grey-400);\n\n  --cros-canvas-tool-color-5-rgb: var(--google-grey-500-rgb);\n  --cros-canvas-tool-color-5: var(--google-grey-500);\n\n  --cros-canvas-tool-color-6-rgb: var(--google-grey-600-rgb);\n  --cros-canvas-tool-color-6: var(--google-grey-600);\n\n  --cros-icon-button-toggle-ripple-color-opaque-rgb: var(--cros-ripple-color-prominent-rgb);\n  --cros-icon-button-toggle-ripple-color-opaque: rgb(var(--cros-icon-button-toggle-ripple-color-opaque-rgb));\n\n  --cros-icon-button-toggle-ripple-color-rgb: var(--cros-ripple-color-prominent-rgb);\n  --cros-icon-button-toggle-ripple-color: var(--cros-ripple-color-prominent);\n\n  --cros-button-secondary-background-color-rgb: 0, 0, 0;\n  --cros-button-secondary-background-color: rgba(var(--cros-button-secondary-background-color-rgb), 0);\n\n  --cros-button-secondary-pressed-ripple-color-rgb: var(--cros-button-ripple-color-secondary-rgb);\n  --cros-button-secondary-pressed-ripple-color: var(--cros-button-ripple-color-secondary);\n\n  --cros-menu-expanded-ripple-color-rgb: var(--cros-ripple-color-rgb);\n  --cros-menu-expanded-ripple-color: var(--cros-ripple-color);\n\n  --cros-menu-ripple-color-rgb: var(--cros-ripple-color-opaque-rgb);\n  --cros-menu-ripple-color: var(--cros-ripple-color-opaque);\n\n  --cros-select-ripple-color-rgb: var(--cros-ripple-color-opaque-rgb);\n  --cros-select-ripple-color: var(--cros-ripple-color-opaque);\n\n  --cros-select-background-color-rgb: var(--cros-textfield-background-color-rgb);\n  --cros-select-background-color: var(--cros-textfield-background-color);\n\n  --cros-knob-ring-color-rgb: var(--google-blue-600-rgb);\n  --cros-knob-ring-color: var(--google-blue-600);\n\n  --cros-knob-ring-color-focus-rgb: var(--google-blue-600-rgb);\n  --cros-knob-ring-color-focus: rgba(var(--cros-knob-ring-color-focus-rgb), 0.5);\n\n  --cros-rescale-indicator-color-rgb: var(--cros-icon-color-prominent-rgb);\n  --cros-rescale-indicator-color: var(--cros-icon-color-prominent);\n\n  --cros-ripple-color-hover-rgb: var(--cros-ripple-color-rgb);\n  --cros-ripple-color-hover: var(--cros-ripple-color);\n\n  --cros-ripple-color-pressed-rgb: var(--cros-ripple-color-rgb);\n  --cros-ripple-color-pressed: var(--cros-ripple-color);\n\n  --cros-text-color-unselected-rgb: var(--cros-text-color-secondary-rgb);\n  --cros-text-color-unselected: var(--cros-text-color-secondary);\n\n  --cros-icon-button-pressed-ripple-color-rgb: var(--cros-ripple-color-opaque-rgb);\n  --cros-icon-button-pressed-ripple-color: var(--cros-ripple-color-opaque);\n\n  --cros-icon-button-hover-ripple-color-rgb: 0, 0, 0;\n  --cros-icon-button-hover-ripple-color: rgba(var(--cros-icon-button-hover-ripple-color-rgb), 0);\n\n  --cros-app-textfield-background-color-rgb: var(--google-grey-100-rgb);\n  --cros-app-textfield-background-color: var(--google-grey-100);\n\n  --cros-ref-primary0-rgb: 0, 0, 0;\n  --cros-ref-primary0: rgb(var(--cros-ref-primary0-rgb));\n\n  --cros-ref-primary10-rgb: 4, 30, 73;\n  --cros-ref-primary10: rgb(var(--cros-ref-primary10-rgb));\n\n  --cros-ref-primary20-rgb: 6, 46, 111;\n  --cros-ref-primary20: rgb(var(--cros-ref-primary20-rgb));\n\n  --cros-ref-primary30-rgb: 8, 66, 160;\n  --cros-ref-primary30: rgb(var(--cros-ref-primary30-rgb));\n\n  --cros-ref-primary40-rgb: 11, 87, 208;\n  --cros-ref-primary40: rgb(var(--cros-ref-primary40-rgb));\n\n  --cros-ref-primary50-rgb: 27, 110, 243;\n  --cros-ref-primary50: rgb(var(--cros-ref-primary50-rgb));\n\n  --cros-ref-primary60-rgb: 76, 141, 246;\n  --cros-ref-primary60: rgb(var(--cros-ref-primary60-rgb));\n\n  --cros-ref-primary70-rgb: 124, 172, 248;\n  --cros-ref-primary70: rgb(var(--cros-ref-primary70-rgb));\n\n  --cros-ref-primary80-rgb: 168, 199, 250;\n  --cros-ref-primary80: rgb(var(--cros-ref-primary80-rgb));\n\n  --cros-ref-primary90-rgb: 211, 227, 253;\n  --cros-ref-primary90: rgb(var(--cros-ref-primary90-rgb));\n\n  --cros-ref-primary95-rgb: 236, 243, 254;\n  --cros-ref-primary95: rgb(var(--cros-ref-primary95-rgb));\n\n  --cros-ref-primary99-rgb: 250, 251, 255;\n  --cros-ref-primary99: rgb(var(--cros-ref-primary99-rgb));\n\n  --cros-ref-primary100-rgb: 255, 255, 255;\n  --cros-ref-primary100: rgb(var(--cros-ref-primary100-rgb));\n\n  --cros-ref-secondary0-rgb: 0, 0, 0;\n  --cros-ref-secondary0: rgb(var(--cros-ref-secondary0-rgb));\n\n  --cros-ref-secondary10-rgb: 0, 29, 53;\n  --cros-ref-secondary10: rgb(var(--cros-ref-secondary10-rgb));\n\n  --cros-ref-secondary12-rgb: 0, 34, 56;\n  --cros-ref-secondary12: rgb(var(--cros-ref-secondary12-rgb));\n\n  --cros-ref-secondary15-rgb: 0, 40, 68;\n  --cros-ref-secondary15: rgb(var(--cros-ref-secondary15-rgb));\n\n  --cros-ref-secondary20-rgb: 0, 51, 85;\n  --cros-ref-secondary20: rgb(var(--cros-ref-secondary20-rgb));\n\n  --cros-ref-secondary30-rgb: 0, 74, 119;\n  --cros-ref-secondary30: rgb(var(--cros-ref-secondary30-rgb));\n\n  --cros-ref-secondary40-rgb: 0, 99, 155;\n  --cros-ref-secondary40: rgb(var(--cros-ref-secondary40-rgb));\n\n  --cros-ref-secondary50-rgb: 4, 125, 183;\n  --cros-ref-secondary50: rgb(var(--cros-ref-secondary50-rgb));\n\n  --cros-ref-secondary60-rgb: 57, 152, 211;\n  --cros-ref-secondary60: rgb(var(--cros-ref-secondary60-rgb));\n\n  --cros-ref-secondary70-rgb: 90, 179, 240;\n  --cros-ref-secondary70: rgb(var(--cros-ref-secondary70-rgb));\n\n  --cros-ref-secondary80-rgb: 127, 207, 255;\n  --cros-ref-secondary80: rgb(var(--cros-ref-secondary80-rgb));\n\n  --cros-ref-secondary90-rgb: 194, 231, 255;\n  --cros-ref-secondary90: rgb(var(--cros-ref-secondary90-rgb));\n\n  --cros-ref-secondary95-rgb: 223, 243, 255;\n  --cros-ref-secondary95: rgb(var(--cros-ref-secondary95-rgb));\n\n  --cros-ref-secondary99-rgb: 247, 252, 255;\n  --cros-ref-secondary99: rgb(var(--cros-ref-secondary99-rgb));\n\n  --cros-ref-secondary100-rgb: 255, 255, 255;\n  --cros-ref-secondary100: rgb(var(--cros-ref-secondary100-rgb));\n\n  --cros-ref-tertiary0-rgb: 0, 0, 0;\n  --cros-ref-tertiary0: rgb(var(--cros-ref-tertiary0-rgb));\n\n  --cros-ref-tertiary10-rgb: 7, 39, 17;\n  --cros-ref-tertiary10: rgb(var(--cros-ref-tertiary10-rgb));\n\n  --cros-ref-tertiary20-rgb: 10, 56, 24;\n  --cros-ref-tertiary20: rgb(var(--cros-ref-tertiary20-rgb));\n\n  --cros-ref-tertiary30-rgb: 15, 82, 35;\n  --cros-ref-tertiary30: rgb(var(--cros-ref-tertiary30-rgb));\n\n  --cros-ref-tertiary40-rgb: 20, 108, 46;\n  --cros-ref-tertiary40: rgb(var(--cros-ref-tertiary40-rgb));\n\n  --cros-ref-tertiary50-rgb: 25, 134, 57;\n  --cros-ref-tertiary50: rgb(var(--cros-ref-tertiary50-rgb));\n\n  --cros-ref-tertiary60-rgb: 30, 164, 70;\n  --cros-ref-tertiary60: rgb(var(--cros-ref-tertiary60-rgb));\n\n  --cros-ref-tertiary70-rgb: 55, 190, 95;\n  --cros-ref-tertiary70: rgb(var(--cros-ref-tertiary70-rgb));\n\n  --cros-ref-tertiary80-rgb: 109, 213, 140;\n  --cros-ref-tertiary80: rgb(var(--cros-ref-tertiary80-rgb));\n\n  --cros-ref-tertiary90-rgb: 196, 238, 208;\n  --cros-ref-tertiary90: rgb(var(--cros-ref-tertiary90-rgb));\n\n  --cros-ref-tertiary95-rgb: 231, 248, 237;\n  --cros-ref-tertiary95: rgb(var(--cros-ref-tertiary95-rgb));\n\n  --cros-ref-tertiary99-rgb: 242, 255, 238;\n  --cros-ref-tertiary99: rgb(var(--cros-ref-tertiary99-rgb));\n\n  --cros-ref-tertiary100-rgb: 255, 255, 255;\n  --cros-ref-tertiary100: rgb(var(--cros-ref-tertiary100-rgb));\n\n  --cros-ref-error0-rgb: 0, 0, 0;\n  --cros-ref-error0: rgb(var(--cros-ref-error0-rgb));\n\n  --cros-ref-error10-rgb: 65, 14, 11;\n  --cros-ref-error10: rgb(var(--cros-ref-error10-rgb));\n\n  --cros-ref-error20-rgb: 96, 20, 16;\n  --cros-ref-error20: rgb(var(--cros-ref-error20-rgb));\n\n  --cros-ref-error30-rgb: 140, 29, 24;\n  --cros-ref-error30: rgb(var(--cros-ref-error30-rgb));\n\n  --cros-ref-error40-rgb: 179, 38, 30;\n  --cros-ref-error40: rgb(var(--cros-ref-error40-rgb));\n\n  --cros-ref-error50-rgb: 220, 54, 46;\n  --cros-ref-error50: rgb(var(--cros-ref-error50-rgb));\n\n  --cros-ref-error60-rgb: 228, 105, 98;\n  --cros-ref-error60: rgb(var(--cros-ref-error60-rgb));\n\n  --cros-ref-error70-rgb: 236, 146, 142;\n  --cros-ref-error70: rgb(var(--cros-ref-error70-rgb));\n\n  --cros-ref-error80-rgb: 242, 184, 181;\n  --cros-ref-error80: rgb(var(--cros-ref-error80-rgb));\n\n  --cros-ref-error90-rgb: 249, 222, 220;\n  --cros-ref-error90: rgb(var(--cros-ref-error90-rgb));\n\n  --cros-ref-error95-rgb: 252, 238, 238;\n  --cros-ref-error95: rgb(var(--cros-ref-error95-rgb));\n\n  --cros-ref-error99-rgb: 255, 251, 249;\n  --cros-ref-error99: rgb(var(--cros-ref-error99-rgb));\n\n  --cros-ref-error100-rgb: 255, 255, 255;\n  --cros-ref-error100: rgb(var(--cros-ref-error100-rgb));\n\n  --cros-ref-neutral0-rgb: 0, 0, 0;\n  --cros-ref-neutral0: rgb(var(--cros-ref-neutral0-rgb));\n\n  --cros-ref-neutral8-rgb: 22, 24, 24;\n  --cros-ref-neutral8: rgb(var(--cros-ref-neutral8-rgb));\n\n  --cros-ref-neutral10-rgb: 31, 31, 31;\n  --cros-ref-neutral10: rgb(var(--cros-ref-neutral10-rgb));\n\n  --cros-ref-neutral20-rgb: 48, 48, 48;\n  --cros-ref-neutral20: rgb(var(--cros-ref-neutral20-rgb));\n\n  --cros-ref-neutral25-rgb: 60, 60, 60;\n  --cros-ref-neutral25: rgb(var(--cros-ref-neutral25-rgb));\n\n  --cros-ref-neutral30-rgb: 71, 71, 71;\n  --cros-ref-neutral30: rgb(var(--cros-ref-neutral30-rgb));\n\n  --cros-ref-neutral40-rgb: 94, 94, 94;\n  --cros-ref-neutral40: rgb(var(--cros-ref-neutral40-rgb));\n\n  --cros-ref-neutral50-rgb: 117, 117, 117;\n  --cros-ref-neutral50: rgb(var(--cros-ref-neutral50-rgb));\n\n  --cros-ref-neutral60-rgb: 143, 143, 143;\n  --cros-ref-neutral60: rgb(var(--cros-ref-neutral60-rgb));\n\n  --cros-ref-neutral70-rgb: 171, 171, 171;\n  --cros-ref-neutral70: rgb(var(--cros-ref-neutral70-rgb));\n\n  --cros-ref-neutral80-rgb: 199, 199, 199;\n  --cros-ref-neutral80: rgb(var(--cros-ref-neutral80-rgb));\n\n  --cros-ref-neutral90-rgb: 227, 227, 227;\n  --cros-ref-neutral90: rgb(var(--cros-ref-neutral90-rgb));\n\n  --cros-ref-neutral95-rgb: 242, 242, 242;\n  --cros-ref-neutral95: rgb(var(--cros-ref-neutral95-rgb));\n\n  --cros-ref-neutral99-rgb: 253, 252, 251;\n  --cros-ref-neutral99: rgb(var(--cros-ref-neutral99-rgb));\n\n  --cros-ref-neutral100-rgb: 255, 255, 255;\n  --cros-ref-neutral100: rgb(var(--cros-ref-neutral100-rgb));\n\n  --cros-ref-neutralvariant0-rgb: 0, 0, 0;\n  --cros-ref-neutralvariant0: rgb(var(--cros-ref-neutralvariant0-rgb));\n\n  --cros-ref-neutralvariant10-rgb: 25, 29, 28;\n  --cros-ref-neutralvariant10: rgb(var(--cros-ref-neutralvariant10-rgb));\n\n  --cros-ref-neutralvariant20-rgb: 45, 49, 47;\n  --cros-ref-neutralvariant20: rgb(var(--cros-ref-neutralvariant20-rgb));\n\n  --cros-ref-neutralvariant30-rgb: 68, 71, 70;\n  --cros-ref-neutralvariant30: rgb(var(--cros-ref-neutralvariant30-rgb));\n\n  --cros-ref-neutralvariant40-rgb: 92, 95, 94;\n  --cros-ref-neutralvariant40: rgb(var(--cros-ref-neutralvariant40-rgb));\n\n  --cros-ref-neutralvariant50-rgb: 116, 119, 117;\n  --cros-ref-neutralvariant50: rgb(var(--cros-ref-neutralvariant50-rgb));\n\n  --cros-ref-neutralvariant60-rgb: 142, 145, 143;\n  --cros-ref-neutralvariant60: rgb(var(--cros-ref-neutralvariant60-rgb));\n\n  --cros-ref-neutralvariant70-rgb: 169, 172, 170;\n  --cros-ref-neutralvariant70: rgb(var(--cros-ref-neutralvariant70-rgb));\n\n  --cros-ref-neutralvariant80-rgb: 196, 199, 197;\n  --cros-ref-neutralvariant80: rgb(var(--cros-ref-neutralvariant80-rgb));\n\n  --cros-ref-neutralvariant90-rgb: 225, 227, 225;\n  --cros-ref-neutralvariant90: rgb(var(--cros-ref-neutralvariant90-rgb));\n\n  --cros-ref-neutralvariant95-rgb: 239, 242, 239;\n  --cros-ref-neutralvariant95: rgb(var(--cros-ref-neutralvariant95-rgb));\n\n  --cros-ref-neutralvariant99-rgb: 250, 253, 251;\n  --cros-ref-neutralvariant99: rgb(var(--cros-ref-neutralvariant99-rgb));\n\n  --cros-ref-neutralvariant100-rgb: 255, 255, 255;\n  --cros-ref-neutralvariant100: rgb(var(--cros-ref-neutralvariant100-rgb));\n\n  --cros-ref-red0-rgb: 0, 0, 0;\n  --cros-ref-red0: rgb(var(--cros-ref-red0-rgb));\n\n  --cros-ref-red10-rgb: 64, 0, 12;\n  --cros-ref-red10: rgb(var(--cros-ref-red10-rgb));\n\n  --cros-ref-red20-rgb: 104, 0, 25;\n  --cros-ref-red20: rgb(var(--cros-ref-red20-rgb));\n\n  --cros-ref-red30-rgb: 146, 0, 39;\n  --cros-ref-red30: rgb(var(--cros-ref-red30-rgb));\n\n  --cros-ref-red40-rgb: 189, 8, 55;\n  --cros-ref-red40: rgb(var(--cros-ref-red40-rgb));\n\n  --cros-ref-red50-rgb: 225, 46, 77;\n  --cros-ref-red50: rgb(var(--cros-ref-red50-rgb));\n\n  --cros-ref-red60-rgb: 255, 81, 103;\n  --cros-ref-red60: rgb(var(--cros-ref-red60-rgb));\n\n  --cros-ref-red70-rgb: 255, 136, 144;\n  --cros-ref-red70: rgb(var(--cros-ref-red70-rgb));\n\n  --cros-ref-red80-rgb: 255, 179, 182;\n  --cros-ref-red80: rgb(var(--cros-ref-red80-rgb));\n\n  --cros-ref-red90-rgb: 255, 218, 218;\n  --cros-ref-red90: rgb(var(--cros-ref-red90-rgb));\n\n  --cros-ref-red95-rgb: 255, 237, 236;\n  --cros-ref-red95: rgb(var(--cros-ref-red95-rgb));\n\n  --cros-ref-red99-rgb: 255, 251, 255;\n  --cros-ref-red99: rgb(var(--cros-ref-red99-rgb));\n\n  --cros-ref-red100-rgb: 255, 255, 255;\n  --cros-ref-red100: rgb(var(--cros-ref-red100-rgb));\n\n  --cros-ref-blue0-rgb: 0, 0, 0;\n  --cros-ref-blue0: rgb(var(--cros-ref-blue0-rgb));\n\n  --cros-ref-blue10-rgb: 0, 23, 76;\n  --cros-ref-blue10: rgb(var(--cros-ref-blue10-rgb));\n\n  --cros-ref-blue20-rgb: 2, 41, 120;\n  --cros-ref-blue20: rgb(var(--cros-ref-blue20-rgb));\n\n  --cros-ref-blue30-rgb: 36, 66, 144;\n  --cros-ref-blue30: rgb(var(--cros-ref-blue30-rgb));\n\n  --cros-ref-blue40-rgb: 63, 90, 169;\n  --cros-ref-blue40: rgb(var(--cros-ref-blue40-rgb));\n\n  --cros-ref-blue50-rgb: 89, 115, 196;\n  --cros-ref-blue50: rgb(var(--cros-ref-blue50-rgb));\n\n  --cros-ref-blue60-rgb: 115, 141, 224;\n  --cros-ref-blue60: rgb(var(--cros-ref-blue60-rgb));\n\n  --cros-ref-blue70-rgb: 142, 168, 253;\n  --cros-ref-blue70: rgb(var(--cros-ref-blue70-rgb));\n\n  --cros-ref-blue80-rgb: 180, 197, 255;\n  --cros-ref-blue80: rgb(var(--cros-ref-blue80-rgb));\n\n  --cros-ref-blue90-rgb: 219, 225, 255;\n  --cros-ref-blue90: rgb(var(--cros-ref-blue90-rgb));\n\n  --cros-ref-blue95-rgb: 239, 240, 255;\n  --cros-ref-blue95: rgb(var(--cros-ref-blue95-rgb));\n\n  --cros-ref-blue99-rgb: 254, 251, 255;\n  --cros-ref-blue99: rgb(var(--cros-ref-blue99-rgb));\n\n  --cros-ref-blue100-rgb: 255, 255, 255;\n  --cros-ref-blue100: rgb(var(--cros-ref-blue100-rgb));\n\n  --cros-ref-yellow0-rgb: 0, 0, 0;\n  --cros-ref-yellow0: rgb(var(--cros-ref-yellow0-rgb));\n\n  --cros-ref-yellow10-rgb: 41, 24, 0;\n  --cros-ref-yellow10: rgb(var(--cros-ref-yellow10-rgb));\n\n  --cros-ref-yellow20-rgb: 69, 43, 0;\n  --cros-ref-yellow20: rgb(var(--cros-ref-yellow20-rgb));\n\n  --cros-ref-yellow30-rgb: 98, 64, 0;\n  --cros-ref-yellow30: rgb(var(--cros-ref-yellow30-rgb));\n\n  --cros-ref-yellow40-rgb: 130, 85, 0;\n  --cros-ref-yellow40: rgb(var(--cros-ref-yellow40-rgb));\n\n  --cros-ref-yellow50-rgb: 162, 108, 0;\n  --cros-ref-yellow50: rgb(var(--cros-ref-yellow50-rgb));\n\n  --cros-ref-yellow60-rgb: 197, 131, 0;\n  --cros-ref-yellow60: rgb(var(--cros-ref-yellow60-rgb));\n\n  --cros-ref-yellow70-rgb: 232, 156, 0;\n  --cros-ref-yellow70: rgb(var(--cros-ref-yellow70-rgb));\n\n  --cros-ref-yellow80-rgb: 255, 185, 79;\n  --cros-ref-yellow80: rgb(var(--cros-ref-yellow80-rgb));\n\n  --cros-ref-yellow90-rgb: 255, 221, 179;\n  --cros-ref-yellow90: rgb(var(--cros-ref-yellow90-rgb));\n\n  --cros-ref-yellow95-rgb: 255, 238, 220;\n  --cros-ref-yellow95: rgb(var(--cros-ref-yellow95-rgb));\n\n  --cros-ref-yellow99-rgb: 255, 251, 255;\n  --cros-ref-yellow99: rgb(var(--cros-ref-yellow99-rgb));\n\n  --cros-ref-yellow100-rgb: 255, 255, 255;\n  --cros-ref-yellow100: rgb(var(--cros-ref-yellow100-rgb));\n\n  --cros-ref-green0-rgb: 0, 0, 0;\n  --cros-ref-green0: rgb(var(--cros-ref-green0-rgb));\n\n  --cros-ref-green10-rgb: 0, 33, 20;\n  --cros-ref-green10: rgb(var(--cros-ref-green10-rgb));\n\n  --cros-ref-green20-rgb: 0, 56, 37;\n  --cros-ref-green20: rgb(var(--cros-ref-green20-rgb));\n\n  --cros-ref-green30-rgb: 0, 82, 55;\n  --cros-ref-green30: rgb(var(--cros-ref-green30-rgb));\n\n  --cros-ref-green40-rgb: 0, 108, 74;\n  --cros-ref-green40: rgb(var(--cros-ref-green40-rgb));\n\n  --cros-ref-green50-rgb: 0, 136, 94;\n  --cros-ref-green50: rgb(var(--cros-ref-green50-rgb));\n\n  --cros-ref-green60-rgb: 46, 163, 118;\n  --cros-ref-green60: rgb(var(--cros-ref-green60-rgb));\n\n  --cros-ref-green70-rgb: 79, 191, 143;\n  --cros-ref-green70: rgb(var(--cros-ref-green70-rgb));\n\n  --cros-ref-green80-rgb: 108, 219, 169;\n  --cros-ref-green80: rgb(var(--cros-ref-green80-rgb));\n\n  --cros-ref-green90-rgb: 137, 248, 196;\n  --cros-ref-green90: rgb(var(--cros-ref-green90-rgb));\n\n  --cros-ref-green95-rgb: 190, 255, 220;\n  --cros-ref-green95: rgb(var(--cros-ref-green95-rgb));\n\n  --cros-ref-green99-rgb: 244, 255, 246;\n  --cros-ref-green99: rgb(var(--cros-ref-green99-rgb));\n\n  --cros-ref-green100-rgb: 255, 255, 255;\n  --cros-ref-green100: rgb(var(--cros-ref-green100-rgb));\n\n  --cros-sys-primary-light-rgb: var(--cros-ref-primary40-rgb);\n  --cros-sys-primary-light: var(--cros-ref-primary40);\n\n  --cros-sys-primary-dark-rgb: var(--cros-ref-primary80-rgb);\n  --cros-sys-primary-dark: var(--cros-ref-primary80);\n\n  --cros-sys-primary-rgb: var(--cros-sys-primary-light-rgb);\n  --cros-sys-primary: var(--cros-sys-primary-light);\n\n  --cros-sys-inverse_primary-rgb: var(--cros-ref-primary80-rgb);\n  --cros-sys-inverse_primary: var(--cros-ref-primary80);\n\n  --cros-sys-on_primary-light-rgb: var(--cros-ref-primary100-rgb);\n  --cros-sys-on_primary-light: var(--cros-ref-primary100);\n\n  --cros-sys-on_primary-dark-rgb: var(--cros-ref-primary20-rgb);\n  --cros-sys-on_primary-dark: var(--cros-ref-primary20);\n\n  --cros-sys-on_primary-rgb: var(--cros-sys-on_primary-light-rgb);\n  --cros-sys-on_primary: var(--cros-sys-on_primary-light);\n\n  --cros-sys-primary_container-rgb: var(--cros-ref-primary90-rgb);\n  --cros-sys-primary_container: var(--cros-ref-primary90);\n\n  --cros-sys-on_primary_container-rgb: var(--cros-ref-primary10-rgb);\n  --cros-sys-on_primary_container: var(--cros-ref-primary10);\n\n  --cros-sys-secondary-light-rgb: var(--cros-ref-secondary40-rgb);\n  --cros-sys-secondary-light: var(--cros-ref-secondary40);\n\n  --cros-sys-secondary-dark-rgb: var(--cros-ref-secondary80-rgb);\n  --cros-sys-secondary-dark: var(--cros-ref-secondary80);\n\n  --cros-sys-secondary-rgb: var(--cros-sys-secondary-light-rgb);\n  --cros-sys-secondary: var(--cros-sys-secondary-light);\n\n  --cros-sys-on_secondary-rgb: var(--cros-ref-secondary100-rgb);\n  --cros-sys-on_secondary: var(--cros-ref-secondary100);\n\n  --cros-sys-secondary_container-rgb: var(--cros-ref-secondary90-rgb);\n  --cros-sys-secondary_container: var(--cros-ref-secondary90);\n\n  --cros-sys-on_secondary_container-rgb: var(--cros-ref-secondary10-rgb);\n  --cros-sys-on_secondary_container: var(--cros-ref-secondary10);\n\n  --cros-sys-tertiary-rgb: var(--cros-ref-tertiary40-rgb);\n  --cros-sys-tertiary: var(--cros-ref-tertiary40);\n\n  --cros-sys-on_tertiary-rgb: var(--cros-ref-tertiary100-rgb);\n  --cros-sys-on_tertiary: var(--cros-ref-tertiary100);\n\n  --cros-sys-tertiary_container-rgb: var(--cros-ref-tertiary90-rgb);\n  --cros-sys-tertiary_container: var(--cros-ref-tertiary90);\n\n  --cros-sys-on_tertiary_container-rgb: var(--cros-ref-tertiary10-rgb);\n  --cros-sys-on_tertiary_container: var(--cros-ref-tertiary10);\n\n  --cros-sys-error-rgb: var(--cros-ref-red50-rgb);\n  --cros-sys-error: var(--cros-ref-red50);\n\n  --cros-sys-on_error-rgb: var(--cros-ref-error100-rgb);\n  --cros-sys-on_error: var(--cros-ref-error100);\n\n  --cros-sys-error_container-rgb: var(--cros-ref-red90-rgb);\n  --cros-sys-error_container: var(--cros-ref-red90);\n\n  --cros-sys-on_error_container-rgb: var(--cros-ref-red30-rgb);\n  --cros-sys-on_error_container: var(--cros-ref-red30);\n\n  --cros-sys-error_highlight-rgb: var(--cros-ref-error40-rgb);\n  --cros-sys-error_highlight: rgba(var(--cros-sys-error_highlight-rgb), 0.3);\n\n  --cros-sys-surface_variant-rgb: var(--cros-ref-neutralvariant90-rgb);\n  --cros-sys-surface_variant: var(--cros-ref-neutralvariant90);\n\n  --cros-sys-on_surface_variant-light-rgb: var(--cros-ref-neutralvariant30-rgb);\n  --cros-sys-on_surface_variant-light: var(--cros-ref-neutralvariant30);\n\n  --cros-sys-on_surface_variant-dark-rgb: var(--cros-ref-neutralvariant80-rgb);\n  --cros-sys-on_surface_variant-dark: var(--cros-ref-neutralvariant80);\n\n  --cros-sys-on_surface_variant-rgb: var(--cros-sys-on_surface_variant-light-rgb);\n  --cros-sys-on_surface_variant: var(--cros-sys-on_surface_variant-light);\n\n  --cros-sys-outline-rgb: var(--cros-ref-neutralvariant50-rgb);\n  --cros-sys-outline: var(--cros-ref-neutralvariant50);\n\n  --cros-sys-separator-rgb: var(--cros-ref-neutral10-rgb);\n  --cros-sys-separator: rgba(var(--cros-sys-separator-rgb), 0.14);\n\n  --cros-sys-white-rgb: var(--cros-ref-neutral100-rgb);\n  --cros-sys-white: var(--cros-ref-neutral100);\n\n  --cros-sys-black-rgb: var(--cros-ref-neutral0-rgb);\n  --cros-sys-black: var(--cros-ref-neutral0);\n\n  --cros-sys-header-rgb: var(--cros-ref-secondary90-rgb);\n  --cros-sys-header: var(--cros-ref-secondary90);\n\n  --cros-sys-header_unfocused: color-mix(in srgb, rgb(var(--cros-ref-secondary90-rgb)) 28.000000000000004%, var(--cros-ref-neutralvariant90));\n\n  --cros-sys-app_base_shaded-rgb: var(--cros-ref-neutralvariant95-rgb);\n  --cros-sys-app_base_shaded: var(--cros-ref-neutralvariant95);\n\n  --cros-sys-app_base-rgb: var(--cros-ref-neutral99-rgb);\n  --cros-sys-app_base: var(--cros-ref-neutral99);\n\n  --cros-sys-base_elevated-light-rgb: var(--cros-ref-neutralvariant100-rgb);\n  --cros-sys-base_elevated-light: var(--cros-ref-neutralvariant100);\n\n  --cros-sys-base_elevated-dark: color-mix(in srgb, var(--cros-ref-primary80) 11.0%, color-mix(in srgb, var(--cros-ref-neutral80) 2.0%, var(--cros-ref-neutral10)));\n\n  --cros-sys-base_elevated-rgb: var(--cros-sys-base_elevated-light-rgb);\n  --cros-sys-base_elevated: var(--cros-sys-base_elevated-light);\n\n  --cros-sys-system_base-rgb: var(--cros-ref-neutralvariant90-rgb);\n  --cros-sys-system_base: var(--cros-ref-neutralvariant90);\n\n  --cros-sys-system_base_elevated-rgb: var(--cros-sys-surface3-rgb);\n  --cros-sys-system_base_elevated: rgba(var(--cros-sys-system_base_elevated-rgb), 0.9);\n\n  --cros-sys-system_base_elevated_opaque-rgb: var(--cros-sys-surface3-rgb);\n  --cros-sys-system_base_elevated_opaque: var(--cros-sys-surface3);\n\n  --cros-sys-surface-rgb: var(--cros-ref-neutral99-rgb);\n  --cros-sys-surface: var(--cros-ref-neutral99);\n\n  --cros-sys-surface1: color-mix(in srgb, rgb(var(--cros-ref-primary40-rgb)) 5.0%, var(--cros-ref-neutral99));\n\n  --cros-sys-surface2: color-mix(in srgb, rgb(var(--cros-ref-primary40-rgb)) 8.0%, var(--cros-ref-neutral99));\n\n  --cros-sys-surface3: color-mix(in srgb, rgb(var(--cros-ref-primary40-rgb)) 11.0%, var(--cros-ref-neutral99));\n\n  --cros-sys-surface4: color-mix(in srgb, rgb(var(--cros-ref-primary40-rgb)) 12.0%, var(--cros-ref-neutral99));\n\n  --cros-sys-surface5: color-mix(in srgb, rgb(var(--cros-ref-primary40-rgb)) 14.000000000000002%, var(--cros-ref-neutral99));\n\n  --cros-sys-scrim-rgb: var(--cros-ref-neutralvariant60-rgb);\n  --cros-sys-scrim: rgba(var(--cros-sys-scrim-rgb), 0.6);\n\n  --cros-sys-scrim2-rgb: var(--cros-ref-secondary90-rgb);\n  --cros-sys-scrim2: rgba(var(--cros-sys-scrim2-rgb), 0.6);\n\n  --cros-sys-dialog_container-rgb: var(--cros-sys-base_elevated-rgb);\n  --cros-sys-dialog_container: var(--cros-sys-base_elevated);\n\n  --cros-sys-inverse_surface-rgb: var(--cros-ref-neutral20-rgb);\n  --cros-sys-inverse_surface: var(--cros-ref-neutral20);\n\n  --cros-sys-scrollbar-rgb: var(--cros-ref-neutralvariant60-rgb);\n  --cros-sys-scrollbar: rgba(var(--cros-sys-scrollbar-rgb), 0.6);\n\n  --cros-sys-scrollbar_hover-rgb: var(--cros-ref-neutralvariant30-rgb);\n  --cros-sys-scrollbar_hover: rgba(var(--cros-sys-scrollbar_hover-rgb), 0.6);\n\n  --cros-sys-scrollbar_border-rgb: var(--cros-ref-neutralvariant100-rgb);\n  --cros-sys-scrollbar_border: rgba(var(--cros-sys-scrollbar_border-rgb), 0.14);\n\n  --cros-sys-input_field_on_shaded-rgb: var(--cros-ref-neutral99-rgb);\n  --cros-sys-input_field_on_shaded: var(--cros-ref-neutral99);\n\n  --cros-sys-input_field_on_base-rgb: var(--cros-ref-neutral95-rgb);\n  --cros-sys-input_field_on_base: var(--cros-ref-neutral95);\n\n  --cros-sys-system_on_base-rgb: var(--cros-ref-neutralvariant99-rgb);\n  --cros-sys-system_on_base: rgba(var(--cros-sys-system_on_base-rgb), 0.6);\n\n  --cros-sys-system_on_base_opaque-rgb: var(--cros-ref-neutralvariant95-rgb);\n  --cros-sys-system_on_base_opaque: var(--cros-ref-neutralvariant95);\n\n  --cros-sys-system_on_base1-rgb: var(--cros-ref-neutral10-rgb);\n  --cros-sys-system_on_base1: rgba(var(--cros-sys-system_on_base1-rgb), 0.06);\n\n  --cros-sys-system_primary_container-rgb: var(--cros-ref-primary80-rgb);\n  --cros-sys-system_primary_container: var(--cros-ref-primary80);\n\n  --cros-sys-system_on_primary_container-rgb: var(--cros-ref-primary10-rgb);\n  --cros-sys-system_on_primary_container: var(--cros-ref-primary10);\n\n  --cros-sys-system_on_primary_container_disabled-rgb: var(--cros-sys-system_on_primary_container-rgb);\n  --cros-sys-system_on_primary_container_disabled: rgba(var(--cros-sys-system_on_primary_container_disabled-rgb), 0.38);\n\n  --cros-sys-on_positive_container-rgb: var(--cros-ref-green30-rgb);\n  --cros-sys-on_positive_container: var(--cros-ref-green30);\n\n  --cros-sys-positive_container-rgb: var(--cros-ref-green95-rgb);\n  --cros-sys-positive_container: var(--cros-ref-green95);\n\n  --cros-sys-positive-rgb: var(--cros-ref-green50-rgb);\n  --cros-sys-positive: var(--cros-ref-green50);\n\n  --cros-sys-on_warning_container-rgb: var(--cros-ref-yellow30-rgb);\n  --cros-sys-on_warning_container: var(--cros-ref-yellow30);\n\n  --cros-sys-warning_container-rgb: var(--cros-ref-yellow90-rgb);\n  --cros-sys-warning_container: var(--cros-ref-yellow90);\n\n  --cros-sys-system_on_warning_container-rgb: var(--cros-ref-yellow10-rgb);\n  --cros-sys-system_on_warning_container: var(--cros-ref-yellow10);\n\n  --cros-sys-system_warning_container-rgb: var(--cros-ref-yellow80-rgb);\n  --cros-sys-system_warning_container: var(--cros-ref-yellow80);\n\n  --cros-sys-warning-rgb: var(--cros-ref-yellow50-rgb);\n  --cros-sys-warning: var(--cros-ref-yellow50);\n\n  --cros-sys-on_progress_container-rgb: var(--cros-ref-blue30-rgb);\n  --cros-sys-on_progress_container: var(--cros-ref-blue30);\n\n  --cros-sys-progress_container-rgb: var(--cros-ref-blue90-rgb);\n  --cros-sys-progress_container: var(--cros-ref-blue90);\n\n  --cros-sys-progress-rgb: var(--cros-ref-blue50-rgb);\n  --cros-sys-progress: var(--cros-ref-blue50);\n\n  --cros-sys-system_on_negative_container-rgb: var(--cros-ref-red10-rgb);\n  --cros-sys-system_on_negative_container: var(--cros-ref-red10);\n\n  --cros-sys-system_negative_container-rgb: var(--cros-ref-red80-rgb);\n  --cros-sys-system_negative_container: var(--cros-ref-red80);\n\n  --cros-sys-on_surface-light-rgb: var(--cros-ref-neutral10-rgb);\n  --cros-sys-on_surface-light: var(--cros-ref-neutral10);\n\n  --cros-sys-on_surface-dark-rgb: var(--cros-ref-neutral90-rgb);\n  --cros-sys-on_surface-dark: var(--cros-ref-neutral90);\n\n  --cros-sys-on_surface-rgb: var(--cros-sys-on_surface-light-rgb);\n  --cros-sys-on_surface: var(--cros-sys-on_surface-light);\n\n  --cros-sys-inverse_on_surface-rgb: var(--cros-ref-neutral95-rgb);\n  --cros-sys-inverse_on_surface: var(--cros-ref-neutral95);\n\n  --cros-sys-on_surface_bodytext-rgb: var(--cros-ref-neutral40-rgb);\n  --cros-sys-on_surface_bodytext: var(--cros-ref-neutral40);\n\n  --cros-sys-disabled-rgb: var(--cros-sys-on_surface-rgb);\n  --cros-sys-disabled: rgba(var(--cros-sys-disabled-rgb), 0.38);\n\n  --cros-sys-disabled_opaque-rgb: var(--cros-ref-neutralvariant80-rgb);\n  --cros-sys-disabled_opaque: var(--cros-ref-neutralvariant80);\n\n  --cros-sys-disabled_container-rgb: var(--cros-sys-on_surface-rgb);\n  --cros-sys-disabled_container: rgba(var(--cros-sys-disabled_container-rgb), 0.12);\n\n  --cros-sys-privacy_indicator-rgb: 20, 108, 46;\n  --cros-sys-privacy_indicator: rgb(var(--cros-sys-privacy_indicator-rgb));\n\n  --cros-sys-hover_on_prominent-rgb: var(--cros-ref-neutral99-rgb);\n  --cros-sys-hover_on_prominent: rgba(var(--cros-sys-hover_on_prominent-rgb), 0.1);\n\n  --cros-sys-hover_on_subtle-rgb: var(--cros-ref-neutral10-rgb);\n  --cros-sys-hover_on_subtle: rgba(var(--cros-sys-hover_on_subtle-rgb), 0.06);\n\n  --cros-sys-inverse_hover_on_subtle-rgb: var(--cros-ref-neutral99-rgb);\n  --cros-sys-inverse_hover_on_subtle: rgba(var(--cros-sys-inverse_hover_on_subtle-rgb), 0.1);\n\n  --cros-sys-ripple_primary-rgb: var(--cros-ref-primary70-rgb);\n  --cros-sys-ripple_primary: rgba(var(--cros-sys-ripple_primary-rgb), 0.32);\n\n  --cros-sys-ripple_neutral_on_prominent-rgb: var(--cros-ref-neutral99-rgb);\n  --cros-sys-ripple_neutral_on_prominent: rgba(var(--cros-sys-ripple_neutral_on_prominent-rgb), 0.16);\n\n  --cros-sys-ripple_neutral_on_subtle-rgb: var(--cros-ref-neutral10-rgb);\n  --cros-sys-ripple_neutral_on_subtle: rgba(var(--cros-sys-ripple_neutral_on_subtle-rgb), 0.12);\n\n  --cros-sys-highlight_shape-rgb: var(--cros-ref-primary70-rgb);\n  --cros-sys-highlight_shape: rgba(var(--cros-sys-highlight_shape-rgb), 0.3);\n\n  --cros-sys-highlight_text-rgb: var(--cros-ref-primary70-rgb);\n  --cros-sys-highlight_text: rgba(var(--cros-sys-highlight_text-rgb), 0.6);\n\n  --cros-sys-system_highlight-rgb: var(--cros-ref-neutral100-rgb);\n  --cros-sys-system_highlight: rgba(var(--cros-sys-system_highlight-rgb), 0.16);\n\n  --cros-sys-system_border-rgb: var(--cros-ref-neutral0-rgb);\n  --cros-sys-system_border: rgba(var(--cros-sys-system_border-rgb), 0.08);\n\n  --cros-sys-system_highlight1-rgb: var(--cros-ref-neutral100-rgb);\n  --cros-sys-system_highlight1: rgba(var(--cros-sys-system_highlight1-rgb), 0.16);\n\n  --cros-sys-system_border1-rgb: var(--cros-ref-neutral0-rgb);\n  --cros-sys-system_border1: rgba(var(--cros-sys-system_border1-rgb), 0.06);\n\n  --cros-sys-focus_ring-rgb: var(--cros-ref-primary40-rgb);\n  --cros-sys-focus_ring: var(--cros-ref-primary40);\n\n  --cros-sys-inverse_focus_ring-rgb: var(--cros-ref-primary80-rgb);\n  --cros-sys-inverse_focus_ring: var(--cros-ref-primary80);\n\n  --cros-sys-focus_ring_on_primary_container-rgb: var(--cros-ref-primary40-rgb);\n  --cros-sys-focus_ring_on_primary_container: var(--cros-ref-primary40);\n\n  --cros-sys-shadow-rgb: var(--cros-ref-neutral30-rgb);\n  --cros-sys-shadow: var(--cros-ref-neutral30);\n\n  --cros-sys-pressed_on_prominent: color-mix(in srgb, var(--cros-sys-hover_on_prominent) 10.0%, var(--cros-sys-ripple_neutral_on_prominent));\n\n  --cros-sys-pressed_on_subtle: color-mix(in srgb, var(--cros-sys-hover_on_subtle) 6.0%, var(--cros-sys-ripple_neutral_on_subtle));\n\n  --cros-sys-illo-color1-light-rgb: var(--cros-ref-primary30-rgb);\n  --cros-sys-illo-color1-light: var(--cros-ref-primary30);\n\n  --cros-sys-illo-color1-dark-rgb: var(--cros-ref-primary80-rgb);\n  --cros-sys-illo-color1-dark: var(--cros-ref-primary80);\n\n  --cros-sys-illo-color1-rgb: var(--cros-sys-illo-color1-light-rgb);\n  --cros-sys-illo-color1: var(--cros-sys-illo-color1-light);\n\n  --cros-sys-illo-color1-1-light-rgb: var(--cros-ref-primary80-rgb);\n  --cros-sys-illo-color1-1-light: var(--cros-ref-primary80);\n\n  --cros-sys-illo-color1-1-dark-rgb: var(--cros-ref-secondary40-rgb);\n  --cros-sys-illo-color1-1-dark: var(--cros-ref-secondary40);\n\n  --cros-sys-illo-color1-1-rgb: var(--cros-sys-illo-color1-1-light-rgb);\n  --cros-sys-illo-color1-1: var(--cros-sys-illo-color1-1-light);\n\n  --cros-sys-illo-color1-2-light-rgb: var(--cros-ref-primary90-rgb);\n  --cros-sys-illo-color1-2-light: var(--cros-ref-primary90);\n\n  --cros-sys-illo-color1-2-dark-rgb: var(--cros-ref-secondary30-rgb);\n  --cros-sys-illo-color1-2-dark: var(--cros-ref-secondary30);\n\n  --cros-sys-illo-color1-2-rgb: var(--cros-sys-illo-color1-2-light-rgb);\n  --cros-sys-illo-color1-2: var(--cros-sys-illo-color1-2-light);\n\n  --cros-sys-illo-color2-light-rgb: var(--cros-ref-green60-rgb);\n  --cros-sys-illo-color2-light: var(--cros-ref-green60);\n\n  --cros-sys-illo-color2-dark-rgb: var(--cros-ref-green70-rgb);\n  --cros-sys-illo-color2-dark: var(--cros-ref-green70);\n\n  --cros-sys-illo-color2-rgb: var(--cros-sys-illo-color2-light-rgb);\n  --cros-sys-illo-color2: var(--cros-sys-illo-color2-light);\n\n  --cros-sys-illo-color3-light-rgb: var(--cros-ref-yellow70-rgb);\n  --cros-sys-illo-color3-light: var(--cros-ref-yellow70);\n\n  --cros-sys-illo-color3-dark-rgb: var(--cros-ref-yellow80-rgb);\n  --cros-sys-illo-color3-dark: var(--cros-ref-yellow80);\n\n  --cros-sys-illo-color3-rgb: var(--cros-sys-illo-color3-light-rgb);\n  --cros-sys-illo-color3: var(--cros-sys-illo-color3-light);\n\n  --cros-sys-illo-color4-light-rgb: var(--cros-ref-red60-rgb);\n  --cros-sys-illo-color4-light: var(--cros-ref-red60);\n\n  --cros-sys-illo-color4-dark-rgb: var(--cros-ref-red60-rgb);\n  --cros-sys-illo-color4-dark: var(--cros-ref-red60);\n\n  --cros-sys-illo-color4-rgb: var(--cros-sys-illo-color4-light-rgb);\n  --cros-sys-illo-color4: var(--cros-sys-illo-color4-light);\n\n  --cros-sys-illo-color5-light-rgb: var(--cros-ref-tertiary70-rgb);\n  --cros-sys-illo-color5-light: var(--cros-ref-tertiary70);\n\n  --cros-sys-illo-color5-dark-rgb: var(--cros-ref-tertiary40-rgb);\n  --cros-sys-illo-color5-dark: var(--cros-ref-tertiary40);\n\n  --cros-sys-illo-color5-rgb: var(--cros-sys-illo-color5-light-rgb);\n  --cros-sys-illo-color5: var(--cros-sys-illo-color5-light);\n\n  --cros-sys-illo-color6-light-rgb: var(--cros-ref-secondary90-rgb);\n  --cros-sys-illo-color6-light: var(--cros-ref-secondary90);\n\n  --cros-sys-illo-color6-dark-rgb: var(--cros-ref-secondary50-rgb);\n  --cros-sys-illo-color6-dark: var(--cros-ref-secondary50);\n\n  --cros-sys-illo-color6-rgb: var(--cros-sys-illo-color6-light-rgb);\n  --cros-sys-illo-color6: var(--cros-sys-illo-color6-light);\n\n  --cros-sys-illo-base-light-rgb: var(--cros-ref-secondary100-rgb);\n  --cros-sys-illo-base-light: var(--cros-ref-secondary100);\n\n  --cros-sys-illo-base-dark-rgb: var(--cros-ref-secondary0-rgb);\n  --cros-sys-illo-base-dark: var(--cros-ref-secondary0);\n\n  --cros-sys-illo-base-rgb: var(--cros-sys-illo-base-light-rgb);\n  --cros-sys-illo-base: var(--cros-sys-illo-base-light);\n\n  --cros-sys-illo-secondary-light-rgb: var(--cros-ref-neutralvariant90-rgb);\n  --cros-sys-illo-secondary-light: var(--cros-ref-neutralvariant90);\n\n  --cros-sys-illo-secondary-dark-rgb: var(--cros-ref-neutralvariant40-rgb);\n  --cros-sys-illo-secondary-dark: var(--cros-ref-neutralvariant40);\n\n  --cros-sys-illo-secondary-rgb: var(--cros-sys-illo-secondary-light-rgb);\n  --cros-sys-illo-secondary: var(--cros-sys-illo-secondary-light);\n\n  --cros-sys-illo-card-color1-light-rgb: 252, 227, 224;\n  --cros-sys-illo-card-color1-light: rgb(var(--cros-sys-illo-card-color1-light-rgb));\n\n  --cros-sys-illo-card-color1-dark-rgb: 77, 39, 38;\n  --cros-sys-illo-card-color1-dark: rgb(var(--cros-sys-illo-card-color1-dark-rgb));\n\n  --cros-sys-illo-card-color1-rgb: var(--cros-sys-illo-card-color1-light-rgb);\n  --cros-sys-illo-card-color1: var(--cros-sys-illo-card-color1-light);\n\n  --cros-sys-illo-card-on_color1-light-rgb: 165, 14, 14;\n  --cros-sys-illo-card-on_color1-light: rgb(var(--cros-sys-illo-card-on_color1-light-rgb));\n\n  --cros-sys-illo-card-on_color1-dark-rgb: 246, 174, 169;\n  --cros-sys-illo-card-on_color1-dark: rgb(var(--cros-sys-illo-card-on_color1-dark-rgb));\n\n  --cros-sys-illo-card-on_color1-rgb: var(--cros-sys-illo-card-on_color1-light-rgb);\n  --cros-sys-illo-card-on_color1: var(--cros-sys-illo-card-on_color1-light);\n\n  --cros-sys-illo-card-color2-light-rgb: 254, 242, 203;\n  --cros-sys-illo-card-color2-light: rgb(var(--cros-sys-illo-card-color2-light-rgb));\n\n  --cros-sys-illo-card-color2-dark-rgb: 68, 49, 23;\n  --cros-sys-illo-card-color2-dark: rgb(var(--cros-sys-illo-card-color2-dark-rgb));\n\n  --cros-sys-illo-card-color2-rgb: var(--cros-sys-illo-card-color2-light-rgb);\n  --cros-sys-illo-card-color2: var(--cros-sys-illo-card-color2-light);\n\n  --cros-sys-illo-card-on_color2-light-rgb: 155, 97, 0;\n  --cros-sys-illo-card-on_color2-light: rgb(var(--cros-sys-illo-card-on_color2-light-rgb));\n\n  --cros-sys-illo-card-on_color2-dark-rgb: 253, 226, 147;\n  --cros-sys-illo-card-on_color2-dark: rgb(var(--cros-sys-illo-card-on_color2-dark-rgb));\n\n  --cros-sys-illo-card-on_color2-rgb: var(--cros-sys-illo-card-on_color2-light-rgb);\n  --cros-sys-illo-card-on_color2: var(--cros-sys-illo-card-on_color2-light);\n\n  --cros-sys-illo-card-color3-light-rgb: 220, 244, 227;\n  --cros-sys-illo-card-color3-light: rgb(var(--cros-sys-illo-card-color3-light-rgb));\n\n  --cros-sys-illo-card-color3-dark-rgb: 22, 52, 30;\n  --cros-sys-illo-card-color3-dark: rgb(var(--cros-sys-illo-card-color3-dark-rgb));\n\n  --cros-sys-illo-card-color3-rgb: var(--cros-sys-illo-card-color3-light-rgb);\n  --cros-sys-illo-card-color3: var(--cros-sys-illo-card-color3-light);\n\n  --cros-sys-illo-card-on_color3-light-rgb: 13, 101, 45;\n  --cros-sys-illo-card-on_color3-light: rgb(var(--cros-sys-illo-card-on_color3-light-rgb));\n\n  --cros-sys-illo-card-on_color3-dark-rgb: 168, 218, 181;\n  --cros-sys-illo-card-on_color3-dark: rgb(var(--cros-sys-illo-card-on_color3-dark-rgb));\n\n  --cros-sys-illo-card-on_color3-rgb: var(--cros-sys-illo-card-on_color3-light-rgb);\n  --cros-sys-illo-card-on_color3: var(--cros-sys-illo-card-on_color3-light);\n\n  --cros-sys-illo-card-color4-light-rgb: 214, 229, 252;\n  --cros-sys-illo-card-color4-light: rgb(var(--cros-sys-illo-card-color4-light-rgb));\n\n  --cros-sys-illo-card-color4-dark-rgb: 32, 49, 78;\n  --cros-sys-illo-card-color4-dark: rgb(var(--cros-sys-illo-card-color4-dark-rgb));\n\n  --cros-sys-illo-card-color4-rgb: var(--cros-sys-illo-card-color4-light-rgb);\n  --cros-sys-illo-card-color4: var(--cros-sys-illo-card-color4-light);\n\n  --cros-sys-illo-card-on_color4-light-rgb: 24, 90, 188;\n  --cros-sys-illo-card-on_color4-light: rgb(var(--cros-sys-illo-card-on_color4-light-rgb));\n\n  --cros-sys-illo-card-on_color4-dark-rgb: 174, 203, 250;\n  --cros-sys-illo-card-on_color4-dark: rgb(var(--cros-sys-illo-card-on_color4-dark-rgb));\n\n  --cros-sys-illo-card-on_color4-rgb: var(--cros-sys-illo-card-on_color4-light-rgb);\n  --cros-sys-illo-card-on_color4: var(--cros-sys-illo-card-on_color4-light);\n\n  --cros-sys-illo-card-color5-light-rgb: 244, 227, 254;\n  --cros-sys-illo-card-color5-light: rgb(var(--cros-sys-illo-card-color5-light-rgb));\n\n  --cros-sys-illo-card-color5-dark-rgb: 67, 51, 85;\n  --cros-sys-illo-card-color5-dark: rgb(var(--cros-sys-illo-card-color5-dark-rgb));\n\n  --cros-sys-illo-card-color5-rgb: var(--cros-sys-illo-card-color5-light-rgb);\n  --cros-sys-illo-card-color5: var(--cros-sys-illo-card-color5-light);\n\n  --cros-sys-illo-card-on_color5-light-rgb: 117, 9, 155;\n  --cros-sys-illo-card-on_color5-light: rgb(var(--cros-sys-illo-card-on_color5-light-rgb));\n\n  --cros-sys-illo-card-on_color5-dark-rgb: 215, 174, 251;\n  --cros-sys-illo-card-on_color5-dark: rgb(var(--cros-sys-illo-card-on_color5-dark-rgb));\n\n  --cros-sys-illo-card-on_color5-rgb: var(--cros-sys-illo-card-on_color5-light-rgb);\n  --cros-sys-illo-card-on_color5: var(--cros-sys-illo-card-on_color5-light);\n\n  --cros-sys-illo-elevated-color1-1-rgb: var(--cros-sys-illo-color1-1-rgb);\n  --cros-sys-illo-elevated-color1-1: var(--cros-sys-illo-color1-1);\n\n  --cros-sys-illo-elevated-color1-2-rgb: var(--cros-sys-illo-color1-2-rgb);\n  --cros-sys-illo-elevated-color1-2: var(--cros-sys-illo-color1-2);\n\n  --cros-sys-illo-elevated-base-rgb: var(--cros-sys-illo-base-rgb);\n  --cros-sys-illo-elevated-base: var(--cros-sys-illo-base);\n\n  --cros-sys-illo-elevated-secondary-rgb: var(--cros-sys-illo-secondary-rgb);\n  --cros-sys-illo-elevated-secondary: var(--cros-sys-illo-secondary);\n\n  --cros-sys-file_ms_excel-rgb: 22, 167, 101;\n  --cros-sys-file_ms_excel: rgb(var(--cros-sys-file_ms_excel-rgb));\n\n  --cros-sys-file_ms_word-rgb: 73, 134, 231;\n  --cros-sys-file_ms_word: rgb(var(--cros-sys-file_ms_word-rgb));\n\n  --cros-sys-file_ms_ppt-rgb: 255, 118, 55;\n  --cros-sys-file_ms_ppt: rgb(var(--cros-sys-file_ms_ppt-rgb));\n\n  --cros-sys-file_site-rgb: 71, 88, 181;\n  --cros-sys-file_site: rgb(var(--cros-sys-file_site-rgb));\n\n  --cros-sys-file_form-rgb: 114, 72, 185;\n  --cros-sys-file_form: rgb(var(--cros-sys-file_form-rgb));\n\n  --cros-disabled-opacity: 0.38;\n\n  --cros-button-primary-ripple-opacity: 0.32;\n\n  --cros-button-secondary-ripple-opacity: 0.1;\n\n  --cros-ripple-opacity: 0.06;\n\n  --cros-second-tone-opacity: 0.3;\n\n  --cros-ripple-highlight-opacity: var(--cros-ripple-opacity);\n\n  --cros-ripple-ink-drop-opacity: var(--cros-ripple-opacity);\n\n  --cros-prominent-ripple-highlight-opacity: var(--cros-ripple-opacity);\n\n  --cros-prominent-ripple-ink-drop-opacity: var(--cros-ripple-opacity);\n\n  --cros-icon-button-hover-ripple-opacity: var(--cros-ripple-opacity);\n" : ""
      , ck = window ? "\n  --cros-color-primary-inverted-rgb: var(--cros-color-primary-light-rgb);\n  --cros-color-primary-inverted: var(--cros-color-primary-light);\n\n  --cros-color-primary-rgb: var(--cros-color-primary-dark-rgb);\n  --cros-color-primary: var(--cros-color-primary-dark);\n\n  --cros-color-secondary-rgb: var(--cros-color-secondary-dark-rgb);\n  --cros-color-secondary: var(--cros-color-secondary-dark);\n\n  --cros-color-disabled-rgb: var(--cros-color-disabled-dark-rgb);\n  --cros-color-disabled: var(--cros-color-disabled-dark);\n\n  --cros-color-prominent-inverted-rgb: var(--cros-color-prominent-light-rgb);\n  --cros-color-prominent-inverted: var(--cros-color-prominent-light);\n\n  --cros-color-prominent-rgb: var(--cros-color-prominent-dark-rgb);\n  --cros-color-prominent: var(--cros-color-prominent-dark);\n\n  --cros-color-alert-inverted-rgb: var(--cros-color-alert-light-rgb);\n  --cros-color-alert-inverted: var(--cros-color-alert-light);\n\n  --cros-color-alert-rgb: var(--cros-color-alert-dark-rgb);\n  --cros-color-alert: var(--cros-color-alert-dark);\n\n  --cros-color-warning-inverted-rgb: var(--cros-color-warning-light-rgb);\n  --cros-color-warning-inverted: var(--cros-color-warning-light);\n\n  --cros-color-warning-rgb: var(--cros-color-warning-dark-rgb);\n  --cros-color-warning: var(--cros-color-warning-dark);\n\n  --cros-color-positive-rgb: var(--google-green-300-rgb);\n  --cros-color-positive: var(--google-green-300);\n\n  --cros-color-selection-rgb: var(--cros-color-selection-dark-rgb);\n  --cros-color-selection: var(--cros-color-selection-dark);\n\n  --cros-bg-color-rgb: var(--cros-bg-color-dark-rgb);\n  --cros-bg-color: var(--cros-bg-color-dark);\n\n  --cros-bg-color-elevation-1-rgb: 41, 42, 45;\n  --cros-bg-color-elevation-1: rgb(var(--cros-bg-color-elevation-1-rgb));\n\n  --cros-bg-color-elevation-2-inverted-rgb: var(--cros-bg-color-elevation-2-light-rgb);\n  --cros-bg-color-elevation-2-inverted: var(--cros-bg-color-elevation-2-light);\n\n  --cros-bg-color-elevation-2-rgb: var(--cros-bg-color-elevation-2-dark-rgb);\n  --cros-bg-color-elevation-2: var(--cros-bg-color-elevation-2-dark);\n\n  --cros-bg-color-elevation-3-rgb: 50, 51, 54;\n  --cros-bg-color-elevation-3: rgb(var(--cros-bg-color-elevation-3-rgb));\n\n  --cros-bg-color-elevation-4-rgb: 54, 55, 58;\n  --cros-bg-color-elevation-4: rgb(var(--cros-bg-color-elevation-4-rgb));\n\n  --cros-bg-color-elevation-5-rgb: 59, 60, 62;\n  --cros-bg-color-elevation-5: rgb(var(--cros-bg-color-elevation-5-rgb));\n\n  --cros-bg-color-dropped-elevation-1-rgb: 26, 26, 29;\n  --cros-bg-color-dropped-elevation-1: rgb(var(--cros-bg-color-dropped-elevation-1-rgb));\n\n  --cros-bg-color-dropped-elevation-2-rgb: 0, 0, 0;\n  --cros-bg-color-dropped-elevation-2: rgb(var(--cros-bg-color-dropped-elevation-2-rgb));\n\n  --cros-text-color-primary-inverted-rgb: var(--cros-text-color-primary-light-rgb);\n  --cros-text-color-primary-inverted: var(--cros-text-color-primary-light);\n\n  --cros-text-color-primary-rgb: var(--cros-text-color-primary-dark-rgb);\n  --cros-text-color-primary: var(--cros-text-color-primary-dark);\n\n  --cros-text-color-secondary-rgb: var(--cros-text-color-secondary-dark-rgb);\n  --cros-text-color-secondary: var(--cros-text-color-secondary-dark);\n\n  --cros-text-highlight-color-rgb: var(--google-blue-400-rgb);\n  --cros-text-highlight-color: rgba(var(--cros-text-highlight-color-rgb), 0.3);\n\n  --cros-icon-color-primary-inverted-rgb: var(--cros-icon-color-primary-light-rgb);\n  --cros-icon-color-primary-inverted: var(--cros-icon-color-primary-light);\n\n  --cros-icon-color-primary-rgb: var(--cros-icon-color-primary-dark-rgb);\n  --cros-icon-color-primary: var(--cros-icon-color-primary-dark);\n\n  --cros-icon-color-secondary-rgb: var(--cros-icon-color-secondary-dark-rgb);\n  --cros-icon-color-secondary: var(--cros-icon-color-secondary-dark);\n\n  --cros-icon-color-red-rgb: var(--google-red-300-rgb);\n  --cros-icon-color-red: var(--google-red-300);\n\n  --cros-icon-color-blue-rgb: var(--google-blue-300-rgb);\n  --cros-icon-color-blue: var(--google-blue-300);\n\n  --cros-icon-color-green-rgb: var(--google-green-300-rgb);\n  --cros-icon-color-green: var(--google-green-300);\n\n  --cros-icon-color-yellow-rgb: var(--google-yellow-300-rgb);\n  --cros-icon-color-yellow: var(--google-yellow-300);\n\n  --cros-app-shield-color-rgb: 0, 0, 0;\n  --cros-app-shield-color: rgb(var(--cros-app-shield-color-rgb));\n\n  --cros-app-shield-80-rgb: 0, 0, 0;\n  --cros-app-shield-80: rgba(var(--cros-app-shield-80-rgb), 0.8);\n\n  --cros-app-shield-60-rgb: 0, 0, 0;\n  --cros-app-shield-60: rgba(var(--cros-app-shield-60-rgb), 0.6);\n\n  --cros-app-shield-40-rgb: var(--cros-app-shield-40-dark-rgb);\n  --cros-app-shield-40: var(--cros-app-shield-40-dark);\n\n  --cros-app-shield-20-rgb: 0, 0, 0;\n  --cros-app-shield-20: rgba(var(--cros-app-shield-20-rgb), 0.2);\n\n  --cros-focus-ring-color-rgb: var(--cros-focus-ring-color-dark-rgb);\n  --cros-focus-ring-color: var(--cros-focus-ring-color-dark);\n\n  --cros-separator-color-rgb: 255, 255, 255;\n  --cros-separator-color: rgba(var(--cros-separator-color-rgb), 0.14);\n\n  --cros-shadow-color-key-rgb: 0, 0, 0;\n  --cros-shadow-color-key: rgba(var(--cros-shadow-color-key-rgb), 0.3);\n\n  --cros-shadow-color-ambient-rgb: 0, 0, 0;\n  --cros-shadow-color-ambient: rgba(var(--cros-shadow-color-ambient-rgb), 0.15);\n\n  --cros-highlight-color-rgb: var(--google-blue-300-rgb);\n  --cros-highlight-color: rgba(var(--cros-highlight-color-rgb), 0.3);\n\n  --cros-highlight-color-error-rgb: var(--cros-color-alert-rgb);\n  --cros-highlight-color-error: rgba(var(--cros-highlight-color-error-rgb), 0.3);\n\n  --cros-highlight-color-hover-rgb: var(--cros-highlight-color-hover-dark-rgb);\n  --cros-highlight-color-hover: var(--cros-highlight-color-hover-dark);\n\n  --cros-highlight-color-focus-rgb: 255, 255, 255;\n  --cros-highlight-color-focus: rgba(var(--cros-highlight-color-focus-rgb), var(--cros-ripple-opacity));\n\n  --cros-highlight-color-green-rgb: var(--google-green-300-rgb);\n  --cros-highlight-color-green: rgba(var(--cros-highlight-color-green-rgb), 0.3);\n\n  --cros-highlight-color-red-rgb: var(--google-red-600-rgb);\n  --cros-highlight-color-red: rgba(var(--cros-highlight-color-red-rgb), 0.3);\n\n  --cros-highlight-color-yellow-rgb: var(--google-yellow-600-rgb);\n  --cros-highlight-color-yellow: rgba(var(--cros-highlight-color-yellow-rgb), 0.3);\n\n  --cros-ripple-color-rgb: var(--cros-ripple-color-dark-rgb);\n  --cros-ripple-color: var(--cros-ripple-color-dark);\n\n  --cros-ripple-color-prominent-rgb: var(--cros-color-prominent-rgb);\n  --cros-ripple-color-prominent: rgba(var(--cros-ripple-color-prominent-rgb), var(--cros-ripple-opacity));\n\n  --cros-toolbar-search-bg-color-rgb: 255, 255, 255;\n  --cros-toolbar-search-bg-color: rgba(var(--cros-toolbar-search-bg-color-rgb), 0.1);\n\n  --cros-button-label-color-primary-rgb: var(--google-grey-900-rgb);\n  --cros-button-label-color-primary: var(--google-grey-900);\n\n  --cros-button-ripple-color-primary-rgb: 0, 0, 0;\n  --cros-button-ripple-color-primary: rgb(var(--cros-button-ripple-color-primary-rgb));\n\n  --cros-button-background-color-primary-hover-preblended-rgb: 127, 166, 228;\n  --cros-button-background-color-primary-hover-preblended: rgb(var(--cros-button-background-color-primary-hover-preblended-rgb));\n\n  --cros-button-active-shadow-color-ambient-primary-rgb: var(--google-blue-400-rgb);\n  --cros-button-active-shadow-color-ambient-primary: rgba(var(--cros-button-active-shadow-color-ambient-primary-rgb), 0.15);\n\n  --cros-button-active-shadow-color-key-primary-rgb: var(--google-blue-400-rgb);\n  --cros-button-active-shadow-color-key-primary: rgba(var(--cros-button-active-shadow-color-key-primary-rgb), 0.3);\n\n  --cros-button-background-color-primary-disabled-rgb: var(--google-grey-800-rgb);\n  --cros-button-background-color-primary-disabled: var(--google-grey-800);\n\n  --cros-button-label-color-primary-disabled-rgb: var(--google-grey-500-rgb);\n  --cros-button-label-color-primary-disabled: var(--google-grey-500);\n\n  --cros-button-stroke-color-secondary-rgb: var(--google-grey-700-rgb);\n  --cros-button-stroke-color-secondary: var(--google-grey-700);\n\n  --cros-button-stroke-color-secondary-hover-rgb: var(--google-blue-300-rgb);\n  --cros-button-stroke-color-secondary-hover: rgba(var(--cros-button-stroke-color-secondary-hover-rgb), 0.32);\n\n  --cros-button-background-color-secondary-hover-rgb: var(--google-blue-300-rgb);\n  --cros-button-background-color-secondary-hover: rgba(var(--cros-button-background-color-secondary-hover-rgb), 0.08);\n\n  --cros-button-active-shadow-color-ambient-secondary-rgb: var(--google-grey-600-rgb);\n  --cros-button-active-shadow-color-ambient-secondary: rgba(var(--cros-button-active-shadow-color-ambient-secondary-rgb), 0.15);\n\n  --cros-button-active-shadow-color-key-secondary-rgb: var(--google-grey-600-rgb);\n  --cros-button-active-shadow-color-key-secondary: rgba(var(--cros-button-active-shadow-color-key-secondary-rgb), 0.3);\n\n  --cros-button-label-color-secondary-disabled-rgb: var(--google-grey-500-rgb);\n  --cros-button-label-color-secondary-disabled: var(--google-grey-500);\n\n  --cros-button-stroke-color-secondary-disabled-rgb: var(--google-grey-800-rgb);\n  --cros-button-stroke-color-secondary-disabled: var(--google-grey-800);\n\n  --cros-button-icon-color-primary-rgb: var(--google-grey-900-rgb);\n  --cros-button-icon-color-primary: var(--google-grey-900);\n\n  --cros-button-icon-color-primary-disabled-rgb: var(--google-grey-500-rgb);\n  --cros-button-icon-color-primary-disabled: var(--google-grey-500);\n\n  --cros-button-icon-color-secondary-rgb: var(--google-blue-300-rgb);\n  --cros-button-icon-color-secondary: var(--google-blue-300);\n\n  --cros-button-icon-color-secondary-disabled-rgb: var(--google-grey-900-rgb);\n  --cros-button-icon-color-secondary-disabled: var(--google-grey-900);\n\n  --cros-icon-button-background-color-rgb: 48, 52, 54;\n  --cros-icon-button-background-color: rgba(var(--cros-icon-button-background-color-rgb), 0.832);\n\n  --cros-icon-button-pressed-color-rgb: 255, 255, 255;\n  --cros-icon-button-pressed-color: rgba(var(--cros-icon-button-pressed-color-rgb), 0.1536);\n\n  --cros-menu-label-color-rgb: var(--google-grey-200-rgb);\n  --cros-menu-label-color: var(--google-grey-200);\n\n  --cros-menu-icon-color-rgb: var(--google-grey-200-rgb);\n  --cros-menu-icon-color: var(--google-grey-200);\n\n  --cros-menu-shortcut-color-rgb: var(--google-grey-500-rgb);\n  --cros-menu-shortcut-color: var(--google-grey-500);\n\n  --cros-app-scrollbar-color-hover-rgb: var(--google-grey-400-rgb);\n  --cros-app-scrollbar-color-hover: var(--google-grey-400);\n\n  --cros-slider-label-text-color-rgb: var(--google-grey-900-rgb);\n  --cros-slider-label-text-color: var(--google-grey-900);\n\n  --cros-switch-knob-color-inactive-rgb: var(--google-grey-400-rgb);\n  --cros-switch-knob-color-inactive: var(--google-grey-400);\n\n  --cros-tab-label-color-active-rgb: var(--google-blue-300-rgb);\n  --cros-tab-label-color-active: var(--google-blue-300);\n\n  --cros-tab-label-color-inactive-rgb: var(--google-grey-500-rgb);\n  --cros-tab-label-color-inactive: var(--google-grey-500);\n\n  --cros-tab-icon-color-active-rgb: var(--google-blue-300-rgb);\n  --cros-tab-icon-color-active: var(--google-blue-300);\n\n  --cros-tab-icon-color-inactive-rgb: var(--google-grey-500-rgb);\n  --cros-tab-icon-color-inactive: var(--google-grey-500);\n\n  --cros-tab-slider-track-color-rgb: 255, 255, 255;\n  --cros-tab-slider-track-color: rgba(var(--cros-tab-slider-track-color-rgb), 0.1);\n\n  --cros-textfield-background-color-rgb: 0, 0, 0;\n  --cros-textfield-background-color: rgba(var(--cros-textfield-background-color-rgb), 0.3);\n\n  --cros-textfield-label-color-rgb: 255, 255, 255;\n  --cros-textfield-label-color: rgba(var(--cros-textfield-label-color-rgb), 0.6);\n\n  --cros-textfield-label-color-error-rgb: var(--google-red-300-rgb);\n  --cros-textfield-label-color-error: var(--google-red-300);\n\n  --cros-textfield-background-color-disabled-rgb: 0, 0, 0;\n  --cros-textfield-background-color-disabled: rgba(var(--cros-textfield-background-color-disabled-rgb), 0.11);\n\n  --cros-textfield-label-color-disabled-rgb: 0, 0, 0;\n  --cros-textfield-label-color-disabled: rgba(var(--cros-textfield-label-color-disabled-rgb), 0.23);\n\n  --cros-textfield-input-color-disabled-rgb: 255, 255, 255;\n  --cros-textfield-input-color-disabled: rgba(var(--cros-textfield-input-color-disabled-rgb), 0.33);\n\n  --cros-tooltip-background-color-rgb: 255, 255, 255;\n  --cros-tooltip-background-color: rgba(var(--cros-tooltip-background-color-rgb), 0.8);\n\n  --cros-tooltip-label-color-rgb: var(--google-grey-900-rgb);\n  --cros-tooltip-label-color: var(--google-grey-900);\n\n  --cros-shortcut-background-color-rgb: var(--google-grey-900-rgb);\n  --cros-shortcut-background-color: var(--google-grey-900);\n\n  --cros-shortcut-background-gradient-color-rgb: 255, 255, 255;\n  --cros-shortcut-background-gradient-color: rgba(var(--cros-shortcut-background-gradient-color-rgb), 0.12);\n\n  --cros-dialog-title-background-color-rgb: var(--google-grey-900-rgb);\n  --cros-dialog-title-background-color: var(--google-grey-900);\n\n  --cros-dialog-title-bar-color-rgb: var(--cros-dialog-title-bar-color-dark-rgb);\n  --cros-dialog-title-bar-color: var(--cros-dialog-title-bar-color-dark);\n\n  --cros-selection-outline-rgb: 255, 255, 255;\n  --cros-selection-outline: rgba(var(--cros-selection-outline-rgb), 0.12);\n\n  --cros-swatch-border-rgb: 255, 255, 255;\n  --cros-swatch-border: rgba(var(--cros-swatch-border-rgb), 0.38);\n\n  --cros-illustration-color-1-rgb: var(--google-blue-400-rgb);\n  --cros-illustration-color-1: var(--google-blue-400);\n\n  --cros-illustration-color-2-rgb: var(--google-green-400-rgb);\n  --cros-illustration-color-2: var(--google-green-400);\n\n  --cros-illustration-color-3-rgb: var(--google-yellow-400-rgb);\n  --cros-illustration-color-3: var(--google-yellow-400);\n\n  --cros-illustration-color-5-rgb: 248, 130, 255;\n  --cros-illustration-color-5: rgb(var(--cros-illustration-color-5-rgb));\n\n  --cros-illustration-color-6-rgb: 94, 241, 242;\n  --cros-illustration-color-6: rgb(var(--cros-illustration-color-6-rgb));\n\n  --cros-illustration-base-color-rgb: var(--google-grey-900-rgb);\n  --cros-illustration-base-color: var(--google-grey-900);\n\n  --cros-illustration-secondary-color-rgb: 92, 93, 96;\n  --cros-illustration-secondary-color: rgb(var(--cros-illustration-secondary-color-rgb));\n\n  --cros-illustration-color-1-shade-1-rgb: 30, 58, 95;\n  --cros-illustration-color-1-shade-1: rgb(var(--cros-illustration-color-1-shade-1-rgb));\n\n  --cros-illustration-color-1-shade-2-rgb: 64, 77, 100;\n  --cros-illustration-color-1-shade-2: rgb(var(--cros-illustration-color-1-shade-2-rgb));\n\n  --cros-illustration-elevation-color-1-shade-1-rgb: 40, 77, 125;\n  --cros-illustration-elevation-color-1-shade-1: rgb(var(--cros-illustration-elevation-color-1-shade-1-rgb));\n\n  --cros-illustration-elevation-color-1-shade-2-rgb: 85, 103, 132;\n  --cros-illustration-elevation-color-1-shade-2: rgb(var(--cros-illustration-elevation-color-1-shade-2-rgb));\n\n  --cros-illustration-elevation-base-color-rgb: 50, 51, 54;\n  --cros-illustration-elevation-base-color: rgb(var(--cros-illustration-elevation-base-color-rgb));\n\n  --cros-illustration-elevation-secondary-color-rgb: var(--google-grey-700-rgb);\n  --cros-illustration-elevation-secondary-color: var(--google-grey-700);\n\n  --cros-textfield-suffixes-color-rgb: var(--google-grey-500-rgb);\n  --cros-textfield-suffixes-color: var(--google-grey-500);\n\n  --cros-textfield-hint-text-color-rgb: var(--google-grey-500-rgb);\n  --cros-textfield-hint-text-color: var(--google-grey-500);\n\n  --cros-textfield-underline-color-focus-rgb: var(--google-blue-300-rgb);\n  --cros-textfield-underline-color-focus: var(--google-blue-300);\n\n  --cros-textfield-hint-text-color-error-rgb: var(--google-red-300-rgb);\n  --cros-textfield-hint-text-color-error: var(--google-red-300);\n\n  --cros-color-swatch-outline-rgb: 255, 255, 255;\n  --cros-color-swatch-outline: rgba(var(--cros-color-swatch-outline-rgb), 0.14);\n\n  --cros-white-on-white-border-color-rgb: 0, 0, 0;\n  --cros-white-on-white-border-color: rgba(var(--cros-white-on-white-border-color-rgb), 0);\n\n  --cros-a4-note-placeholder-primary-rgb: var(--google-grey-700-rgb);\n  --cros-a4-note-placeholder-primary: var(--google-grey-700);\n\n  --cros-a4-note-placeholder-corner-fold-rgb: var(--google-grey-500-rgb);\n  --cros-a4-note-placeholder-corner-fold: var(--google-grey-500);\n\n  --cros-a4-note-placeholder-detail-rgb: var(--google-grey-300-rgb);\n  --cros-a4-note-placeholder-detail: var(--google-grey-300);\n\n  --cros-calculator-display-bg-color-rgb: var(--google-grey-900-rgb);\n  --cros-calculator-display-bg-color: var(--google-grey-900);\n\n  --cros-calculator-primary-drawer-start-bg-color-rgb: 30, 58, 95;\n  --cros-calculator-primary-drawer-start-bg-color: rgb(var(--cros-calculator-primary-drawer-start-bg-color-rgb));\n\n  --cros-calculator-primary-drawer-end-bg-color-rgb: var(--google-blue-300-rgb);\n  --cros-calculator-primary-drawer-end-bg-color: var(--google-blue-300);\n\n  --cros-calculator-secondary-drawer-bg-color-rgb: var(--google-blue-100-rgb);\n  --cros-calculator-secondary-drawer-bg-color: var(--google-blue-100);\n\n  --cros-calculator-tertiary-drawer-bg-color-rgb: var(--google-blue-50-rgb);\n  --cros-calculator-tertiary-drawer-bg-color: var(--google-blue-50);\n\n  --cros-calculator-clear-ripple-color-rgb: 255, 255, 255;\n  --cros-calculator-clear-ripple-color: rgba(var(--cros-calculator-clear-ripple-color-rgb), 0.08);\n\n  --cros-calculator-error-ripple-color-rgb: var(--cros-color-alert-rgb);\n  --cros-calculator-error-ripple-color: rgba(var(--cros-calculator-error-ripple-color-rgb), 0.6);\n\n  --cros-calculator-display-text-color-rgb: 255, 255, 255;\n  --cros-calculator-display-text-color: rgb(var(--cros-calculator-display-text-color-rgb));\n\n  --cros-canvas-tool-color-1-rgb: var(--google-grey-200-rgb);\n  --cros-canvas-tool-color-1: var(--google-grey-200);\n\n  --cros-canvas-tool-color-2-rgb: var(--google-grey-300-rgb);\n  --cros-canvas-tool-color-2: var(--google-grey-300);\n\n  --cros-canvas-tool-color-3-rgb: var(--google-grey-400-rgb);\n  --cros-canvas-tool-color-3: var(--google-grey-400);\n\n  --cros-canvas-tool-color-4-rgb: var(--google-grey-500-rgb);\n  --cros-canvas-tool-color-4: var(--google-grey-500);\n\n  --cros-canvas-tool-color-5-rgb: var(--google-grey-600-rgb);\n  --cros-canvas-tool-color-5: var(--google-grey-600);\n\n  --cros-canvas-tool-color-6-rgb: var(--google-grey-700-rgb);\n  --cros-canvas-tool-color-6: var(--google-grey-700);\n\n  --cros-app-textfield-background-color-rgb: 0, 0, 0;\n  --cros-app-textfield-background-color: rgba(var(--cros-app-textfield-background-color-rgb), 0.3);\n\n  --cros-sys-primary-rgb: var(--cros-sys-primary-dark-rgb);\n  --cros-sys-primary: var(--cros-sys-primary-dark);\n\n  --cros-sys-inverse_primary-rgb: var(--cros-ref-primary40-rgb);\n  --cros-sys-inverse_primary: var(--cros-ref-primary40);\n\n  --cros-sys-on_primary-rgb: var(--cros-sys-on_primary-dark-rgb);\n  --cros-sys-on_primary: var(--cros-sys-on_primary-dark);\n\n  --cros-sys-primary_container: color-mix(in srgb, rgb(var(--cros-ref-primary30-rgb)) 8.0%, var(--cros-ref-secondary30));\n\n  --cros-sys-on_primary_container-rgb: var(--cros-ref-primary90-rgb);\n  --cros-sys-on_primary_container: var(--cros-ref-primary90);\n\n  --cros-sys-secondary-rgb: var(--cros-sys-secondary-dark-rgb);\n  --cros-sys-secondary: var(--cros-sys-secondary-dark);\n\n  --cros-sys-on_secondary-rgb: var(--cros-ref-secondary20-rgb);\n  --cros-sys-on_secondary: var(--cros-ref-secondary20);\n\n  --cros-sys-secondary_container-rgb: var(--cros-ref-secondary30-rgb);\n  --cros-sys-secondary_container: var(--cros-ref-secondary30);\n\n  --cros-sys-on_secondary_container-rgb: var(--cros-ref-secondary90-rgb);\n  --cros-sys-on_secondary_container: var(--cros-ref-secondary90);\n\n  --cros-sys-tertiary-rgb: var(--cros-ref-tertiary80-rgb);\n  --cros-sys-tertiary: var(--cros-ref-tertiary80);\n\n  --cros-sys-on_tertiary-rgb: var(--cros-ref-tertiary20-rgb);\n  --cros-sys-on_tertiary: var(--cros-ref-tertiary20);\n\n  --cros-sys-tertiary_container-rgb: var(--cros-ref-tertiary30-rgb);\n  --cros-sys-tertiary_container: var(--cros-ref-tertiary30);\n\n  --cros-sys-on_tertiary_container-rgb: var(--cros-ref-tertiary90-rgb);\n  --cros-sys-on_tertiary_container: var(--cros-ref-tertiary90);\n\n  --cros-sys-error-rgb: var(--cros-ref-red80-rgb);\n  --cros-sys-error: var(--cros-ref-red80);\n\n  --cros-sys-on_error-rgb: var(--cros-ref-error20-rgb);\n  --cros-sys-on_error: var(--cros-ref-error20);\n\n  --cros-sys-error_container: color-mix(in srgb, rgb(var(--cros-ref-red80-rgb)) 20.0%, rgb(0, 0, 0));\n\n  --cros-sys-on_error_container-rgb: var(--cros-ref-red80-rgb);\n  --cros-sys-on_error_container: var(--cros-ref-red80);\n\n  --cros-sys-error_highlight-rgb: var(--cros-ref-error80-rgb);\n  --cros-sys-error_highlight: rgba(var(--cros-sys-error_highlight-rgb), 0.3);\n\n  --cros-sys-surface_variant-rgb: var(--cros-ref-neutralvariant30-rgb);\n  --cros-sys-surface_variant: var(--cros-ref-neutralvariant30);\n\n  --cros-sys-on_surface_variant-rgb: var(--cros-sys-on_surface_variant-dark-rgb);\n  --cros-sys-on_surface_variant: var(--cros-sys-on_surface_variant-dark);\n\n  --cros-sys-outline-rgb: var(--cros-ref-neutralvariant60-rgb);\n  --cros-sys-outline: var(--cros-ref-neutralvariant60);\n\n  --cros-sys-separator-rgb: var(--cros-ref-neutral90-rgb);\n  --cros-sys-separator: rgba(var(--cros-sys-separator-rgb), 0.14);\n\n  --cros-sys-white-rgb: var(--cros-ref-neutral100-rgb);\n  --cros-sys-white: var(--cros-ref-neutral100);\n\n  --cros-sys-black-rgb: var(--cros-ref-neutral0-rgb);\n  --cros-sys-black: var(--cros-ref-neutral0);\n\n  --cros-sys-header-rgb: var(--cros-ref-secondary12-rgb);\n  --cros-sys-header: var(--cros-ref-secondary12);\n\n  --cros-sys-header_unfocused: color-mix(in srgb, rgb(var(--cros-ref-secondary12-rgb)) 60.0%, var(--cros-ref-neutral25));\n\n  --cros-sys-app_base_shaded-rgb: var(--cros-ref-neutral0-rgb);\n  --cros-sys-app_base_shaded: var(--cros-ref-neutral0);\n\n  --cros-sys-app_base-rgb: var(--cros-ref-neutral8-rgb);\n  --cros-sys-app_base: var(--cros-ref-neutral8);\n\n  --cros-sys-base_elevated-rgb: var(--cros-sys-base_elevated-dark-rgb);\n  --cros-sys-base_elevated: var(--cros-sys-base_elevated-dark);\n\n  --cros-sys-system_base-rgb: var(--cros-ref-neutralvariant0-rgb);\n  --cros-sys-system_base: var(--cros-ref-neutralvariant0);\n\n  --cros-sys-system_base_elevated-rgb: var(--cros-sys-surface3-rgb);\n  --cros-sys-system_base_elevated: rgba(var(--cros-sys-system_base_elevated-rgb), 0.9);\n\n  --cros-sys-system_base_elevated_opaque-rgb: var(--cros-sys-surface3-rgb);\n  --cros-sys-system_base_elevated_opaque: var(--cros-sys-surface3);\n\n  --cros-sys-surface-rgb: var(--cros-ref-neutral10-rgb);\n  --cros-sys-surface: var(--cros-ref-neutral10);\n\n  --cros-sys-surface1: color-mix(in srgb, rgb(var(--cros-ref-primary80-rgb)) 5.0%, var(--cros-ref-neutral10));\n\n  --cros-sys-surface2: color-mix(in srgb, rgb(var(--cros-ref-primary80-rgb)) 8.0%, var(--cros-ref-neutral10));\n\n  --cros-sys-surface3: color-mix(in srgb, rgb(var(--cros-ref-primary80-rgb)) 11.0%, var(--cros-ref-neutral10));\n\n  --cros-sys-surface4: color-mix(in srgb, rgb(var(--cros-ref-primary80-rgb)) 12.0%, var(--cros-ref-neutral10));\n\n  --cros-sys-surface5: color-mix(in srgb, rgb(var(--cros-ref-primary80-rgb)) 14.000000000000002%, var(--cros-ref-neutral10));\n\n  --cros-sys-scrim-rgb: var(--cros-ref-neutralvariant0-rgb);\n  --cros-sys-scrim: rgba(var(--cros-sys-scrim-rgb), 0.6);\n\n  --cros-sys-scrim2-rgb: var(--cros-ref-secondary30-rgb);\n  --cros-sys-scrim2: rgba(var(--cros-sys-scrim2-rgb), 0.48);\n\n  --cros-sys-inverse_surface-rgb: var(--cros-ref-neutral90-rgb);\n  --cros-sys-inverse_surface: var(--cros-ref-neutral90);\n\n  --cros-sys-scrollbar-rgb: var(--cros-ref-neutralvariant50-rgb);\n  --cros-sys-scrollbar: rgba(var(--cros-sys-scrollbar-rgb), 0.6);\n\n  --cros-sys-scrollbar_hover-rgb: var(--cros-ref-neutralvariant90-rgb);\n  --cros-sys-scrollbar_hover: rgba(var(--cros-sys-scrollbar_hover-rgb), 0.6);\n\n  --cros-sys-scrollbar_border-rgb: var(--cros-ref-neutralvariant0-rgb);\n  --cros-sys-scrollbar_border: rgba(var(--cros-sys-scrollbar_border-rgb), 0.14);\n\n  --cros-sys-input_field_on_shaded-rgb: var(--cros-ref-neutral50-rgb);\n  --cros-sys-input_field_on_shaded: rgba(var(--cros-sys-input_field_on_shaded-rgb), 0.4);\n\n  --cros-sys-input_field_on_base-rgb: var(--cros-ref-neutral0-rgb);\n  --cros-sys-input_field_on_base: rgba(var(--cros-sys-input_field_on_base-rgb), 0.6);\n\n  --cros-sys-system_on_base-rgb: var(--cros-ref-neutralvariant40-rgb);\n  --cros-sys-system_on_base: rgba(var(--cros-sys-system_on_base-rgb), 0.5);\n\n  --cros-sys-system_on_base_opaque-rgb: var(--cros-ref-neutralvariant30-rgb);\n  --cros-sys-system_on_base_opaque: var(--cros-ref-neutralvariant30);\n\n  --cros-sys-system_on_base1-rgb: var(--cros-ref-neutral99-rgb);\n  --cros-sys-system_on_base1: rgba(var(--cros-sys-system_on_base1-rgb), 0.1);\n\n  --cros-sys-system_primary_container-rgb: var(--cros-ref-primary80-rgb);\n  --cros-sys-system_primary_container: var(--cros-ref-primary80);\n\n  --cros-sys-system_on_primary_container-rgb: var(--cros-ref-primary10-rgb);\n  --cros-sys-system_on_primary_container: var(--cros-ref-primary10);\n\n  --cros-sys-on_positive_container-rgb: var(--cros-ref-green90-rgb);\n  --cros-sys-on_positive_container: var(--cros-ref-green90);\n\n  --cros-sys-positive_container: color-mix(in srgb, rgb(var(--cros-ref-green95-rgb)) 20.0%, rgb(0, 0, 0));\n\n  --cros-sys-positive-rgb: var(--cros-ref-green80-rgb);\n  --cros-sys-positive: var(--cros-ref-green80);\n\n  --cros-sys-on_warning_container-rgb: var(--cros-ref-yellow80-rgb);\n  --cros-sys-on_warning_container: var(--cros-ref-yellow80);\n\n  --cros-sys-warning_container: color-mix(in srgb, rgb(var(--cros-ref-yellow90-rgb)) 20.0%, rgb(0, 0, 0));\n\n  --cros-sys-system_on_warning_container-rgb: var(--cros-ref-yellow10-rgb);\n  --cros-sys-system_on_warning_container: var(--cros-ref-yellow10);\n\n  --cros-sys-system_warning_container-rgb: var(--cros-ref-yellow80-rgb);\n  --cros-sys-system_warning_container: var(--cros-ref-yellow80);\n\n  --cros-sys-warning-rgb: var(--cros-ref-yellow80-rgb);\n  --cros-sys-warning: var(--cros-ref-yellow80);\n\n  --cros-sys-on_progress_container-rgb: var(--cros-ref-blue80-rgb);\n  --cros-sys-on_progress_container: var(--cros-ref-blue80);\n\n  --cros-sys-progress_container: color-mix(in srgb, rgb(var(--cros-ref-blue80-rgb)) 20.0%, rgb(0, 0, 0));\n\n  --cros-sys-progress-rgb: var(--cros-ref-blue80-rgb);\n  --cros-sys-progress: var(--cros-ref-blue80);\n\n  --cros-sys-system_on_negative_container-rgb: var(--cros-ref-red10-rgb);\n  --cros-sys-system_on_negative_container: var(--cros-ref-red10);\n\n  --cros-sys-system_negative_container-rgb: var(--cros-ref-red80-rgb);\n  --cros-sys-system_negative_container: var(--cros-ref-red80);\n\n  --cros-sys-on_surface-rgb: var(--cros-sys-on_surface-dark-rgb);\n  --cros-sys-on_surface: var(--cros-sys-on_surface-dark);\n\n  --cros-sys-inverse_on_surface-rgb: var(--cros-ref-neutral10-rgb);\n  --cros-sys-inverse_on_surface: var(--cros-ref-neutral10);\n\n  --cros-sys-on_surface_bodytext-rgb: var(--cros-ref-neutral70-rgb);\n  --cros-sys-on_surface_bodytext: var(--cros-ref-neutral70);\n\n  --cros-sys-disabled-rgb: var(--cros-sys-on_surface-rgb);\n  --cros-sys-disabled: rgba(var(--cros-sys-disabled-rgb), 0.38);\n\n  --cros-sys-disabled_opaque-rgb: var(--cros-ref-neutralvariant30-rgb);\n  --cros-sys-disabled_opaque: var(--cros-ref-neutralvariant30);\n\n  --cros-sys-privacy_indicator-rgb: 55, 190, 95;\n  --cros-sys-privacy_indicator: rgb(var(--cros-sys-privacy_indicator-rgb));\n\n  --cros-sys-hover_on_prominent-rgb: var(--cros-ref-neutral10-rgb);\n  --cros-sys-hover_on_prominent: rgba(var(--cros-sys-hover_on_prominent-rgb), 0.06);\n\n  --cros-sys-hover_on_subtle-rgb: var(--cros-ref-neutral99-rgb);\n  --cros-sys-hover_on_subtle: rgba(var(--cros-sys-hover_on_subtle-rgb), 0.1);\n\n  --cros-sys-inverse_hover_on_subtle-rgb: var(--cros-ref-neutral10-rgb);\n  --cros-sys-inverse_hover_on_subtle: rgba(var(--cros-sys-inverse_hover_on_subtle-rgb), 0.06);\n\n  --cros-sys-ripple_primary-rgb: var(--cros-ref-primary60-rgb);\n  --cros-sys-ripple_primary: rgba(var(--cros-sys-ripple_primary-rgb), 0.32);\n\n  --cros-sys-ripple_neutral_on_prominent-rgb: var(--cros-ref-neutral10-rgb);\n  --cros-sys-ripple_neutral_on_prominent: rgba(var(--cros-sys-ripple_neutral_on_prominent-rgb), 0.08);\n\n  --cros-sys-ripple_neutral_on_subtle-rgb: var(--cros-ref-neutral90-rgb);\n  --cros-sys-ripple_neutral_on_subtle: rgba(var(--cros-sys-ripple_neutral_on_subtle-rgb), 0.16);\n\n  --cros-sys-highlight_shape-rgb: var(--cros-ref-primary70-rgb);\n  --cros-sys-highlight_shape: rgba(var(--cros-sys-highlight_shape-rgb), 0.3);\n\n  --cros-sys-highlight_text-rgb: var(--cros-ref-primary70-rgb);\n  --cros-sys-highlight_text: rgba(var(--cros-sys-highlight_text-rgb), 0.6);\n\n  --cros-sys-system_highlight-rgb: var(--cros-ref-neutral100-rgb);\n  --cros-sys-system_highlight: rgba(var(--cros-sys-system_highlight-rgb), 0.06);\n\n  --cros-sys-system_highlight1-rgb: var(--cros-ref-neutral100-rgb);\n  --cros-sys-system_highlight1: rgba(var(--cros-sys-system_highlight1-rgb), 0.06);\n\n  --cros-sys-system_border1-rgb: var(--cros-ref-neutral0-rgb);\n  --cros-sys-system_border1: rgba(var(--cros-sys-system_border1-rgb), 0.08);\n\n  --cros-sys-focus_ring-rgb: var(--cros-ref-primary80-rgb);\n  --cros-sys-focus_ring: var(--cros-ref-primary80);\n\n  --cros-sys-inverse_focus_ring-rgb: var(--cros-ref-primary40-rgb);\n  --cros-sys-inverse_focus_ring: var(--cros-ref-primary40);\n\n  --cros-sys-focus_ring_on_primary_container-rgb: var(--cros-ref-primary40-rgb);\n  --cros-sys-focus_ring_on_primary_container: var(--cros-ref-primary40);\n\n  --cros-sys-shadow-rgb: var(--cros-ref-neutral0-rgb);\n  --cros-sys-shadow: var(--cros-ref-neutral0);\n\n  --cros-sys-pressed_on_prominent: color-mix(in srgb, var(--cros-sys-hover_on_prominent) 6.0%, var(--cros-sys-ripple_neutral_on_prominent));\n\n  --cros-sys-pressed_on_subtle: color-mix(in srgb, var(--cros-sys-hover_on_subtle) 10.0%, var(--cros-sys-ripple_neutral_on_subtle));\n\n  --cros-sys-illo-color1-rgb: var(--cros-sys-illo-color1-dark-rgb);\n  --cros-sys-illo-color1: var(--cros-sys-illo-color1-dark);\n\n  --cros-sys-illo-color1-1-rgb: var(--cros-sys-illo-color1-1-dark-rgb);\n  --cros-sys-illo-color1-1: var(--cros-sys-illo-color1-1-dark);\n\n  --cros-sys-illo-color1-2-rgb: var(--cros-sys-illo-color1-2-dark-rgb);\n  --cros-sys-illo-color1-2: var(--cros-sys-illo-color1-2-dark);\n\n  --cros-sys-illo-color2-rgb: var(--cros-sys-illo-color2-dark-rgb);\n  --cros-sys-illo-color2: var(--cros-sys-illo-color2-dark);\n\n  --cros-sys-illo-color3-rgb: var(--cros-sys-illo-color3-dark-rgb);\n  --cros-sys-illo-color3: var(--cros-sys-illo-color3-dark);\n\n  --cros-sys-illo-color4-rgb: var(--cros-sys-illo-color4-dark-rgb);\n  --cros-sys-illo-color4: var(--cros-sys-illo-color4-dark);\n\n  --cros-sys-illo-color5-rgb: var(--cros-sys-illo-color5-dark-rgb);\n  --cros-sys-illo-color5: var(--cros-sys-illo-color5-dark);\n\n  --cros-sys-illo-color6-rgb: var(--cros-sys-illo-color6-dark-rgb);\n  --cros-sys-illo-color6: var(--cros-sys-illo-color6-dark);\n\n  --cros-sys-illo-base-rgb: var(--cros-sys-illo-base-dark-rgb);\n  --cros-sys-illo-base: var(--cros-sys-illo-base-dark);\n\n  --cros-sys-illo-secondary-rgb: var(--cros-sys-illo-secondary-dark-rgb);\n  --cros-sys-illo-secondary: var(--cros-sys-illo-secondary-dark);\n\n  --cros-sys-illo-card-color1-rgb: var(--cros-sys-illo-card-color1-dark-rgb);\n  --cros-sys-illo-card-color1: var(--cros-sys-illo-card-color1-dark);\n\n  --cros-sys-illo-card-on_color1-rgb: var(--cros-sys-illo-card-on_color1-dark-rgb);\n  --cros-sys-illo-card-on_color1: var(--cros-sys-illo-card-on_color1-dark);\n\n  --cros-sys-illo-card-color2-rgb: var(--cros-sys-illo-card-color2-dark-rgb);\n  --cros-sys-illo-card-color2: var(--cros-sys-illo-card-color2-dark);\n\n  --cros-sys-illo-card-on_color2-rgb: var(--cros-sys-illo-card-on_color2-dark-rgb);\n  --cros-sys-illo-card-on_color2: var(--cros-sys-illo-card-on_color2-dark);\n\n  --cros-sys-illo-card-color3-rgb: var(--cros-sys-illo-card-color3-dark-rgb);\n  --cros-sys-illo-card-color3: var(--cros-sys-illo-card-color3-dark);\n\n  --cros-sys-illo-card-on_color3-rgb: var(--cros-sys-illo-card-on_color3-dark-rgb);\n  --cros-sys-illo-card-on_color3: var(--cros-sys-illo-card-on_color3-dark);\n\n  --cros-sys-illo-card-color4-rgb: var(--cros-sys-illo-card-color4-dark-rgb);\n  --cros-sys-illo-card-color4: var(--cros-sys-illo-card-color4-dark);\n\n  --cros-sys-illo-card-on_color4-rgb: var(--cros-sys-illo-card-on_color4-dark-rgb);\n  --cros-sys-illo-card-on_color4: var(--cros-sys-illo-card-on_color4-dark);\n\n  --cros-sys-illo-card-color5-rgb: var(--cros-sys-illo-card-color5-dark-rgb);\n  --cros-sys-illo-card-color5: var(--cros-sys-illo-card-color5-dark);\n\n  --cros-sys-illo-card-on_color5-rgb: var(--cros-sys-illo-card-on_color5-dark-rgb);\n  --cros-sys-illo-card-on_color5: var(--cros-sys-illo-card-on_color5-dark);\n\n  --cros-sys-file_site-rgb: 140, 158, 255;\n  --cros-sys-file_site: rgb(var(--cros-sys-file_site-rgb));\n\n  --cros-sys-file_form-rgb: 180, 140, 255;\n  --cros-sys-file_form: rgb(var(--cros-sys-file_form-rgb));\n\n  --cros-button-primary-ripple-opacity: 0.16;\n\n  --cros-button-secondary-ripple-opacity: 0.16;\n\n  --cros-ripple-opacity: 0.08;\n" : ""
      , dk = window ? "\n  --cros-elevation-1-shadow: 0 1px 2px var(--cros-shadow-color-key), 0 1px 3px var(--cros-shadow-color-ambient);\n  --cros-elevation-2-shadow: 0 1px 2px var(--cros-shadow-color-key), 0 2px 6px var(--cros-shadow-color-ambient);\n  --cros-elevation-3-shadow: 0 1px 3px var(--cros-shadow-color-key), 0 4px 8px var(--cros-shadow-color-ambient);\n  --cros-elevation-4-shadow: 0 2px 3px var(--cros-shadow-color-key), 0 6px 10px var(--cros-shadow-color-ambient);\n  --cros-elevation-5-shadow: 0 4px 4px var(--cros-shadow-color-key), 0 8px 12px var(--cros-shadow-color-ambient);\n  --cros-navigation-tree-item-focus-ring-outline-offset: 0px;\n" : ""
      , ek = window ? "\n  /* font families */\n  --cros-font-family-google-sans: 'Google Sans', 'Noto Sans', sans-serif;\n  --cros-font-family-roboto: Roboto, 'Roboto', 'Noto Sans', sans-serif;\n\n  /* typefaces */\n  --cros-headline-1-font: 500 15px/22px var(--cros-font-family-google-sans);\n  --cros-headline-1-font-family: var(--cros-font-family-google-sans);\n  --cros-headline-1-font-size: 15px;\n  --cros-headline-1-font-weight: 500;\n  --cros-headline-1-line-height: 22px;\n  --cros-headline-2-font: 500 15px/22px var(--cros-font-family-roboto);\n  --cros-headline-2-font-family: var(--cros-font-family-roboto);\n  --cros-headline-2-font-size: 15px;\n  --cros-headline-2-font-weight: 500;\n  --cros-headline-2-line-height: 22px;\n  --cros-body-0-font: 400 16px/24px var(--cros-font-family-roboto);\n  --cros-body-0-font-family: var(--cros-font-family-roboto);\n  --cros-body-0-font-size: 16px;\n  --cros-body-0-font-weight: 400;\n  --cros-body-0-line-height: 24px;\n  --cros-body-1-font: 400 14px/20px var(--cros-font-family-roboto);\n  --cros-body-1-font-family: var(--cros-font-family-roboto);\n  --cros-body-1-font-size: 14px;\n  --cros-body-1-font-weight: 400;\n  --cros-body-1-line-height: 20px;\n  --cros-body-2-font: 400 13px/20px var(--cros-font-family-roboto);\n  --cros-body-2-font-family: var(--cros-font-family-roboto);\n  --cros-body-2-font-size: 13px;\n  --cros-body-2-font-weight: 400;\n  --cros-body-2-line-height: 20px;\n  --cros-display-1-font: 500 44px/52px var(--cros-font-family-google-sans);\n  --cros-display-1-font-family: var(--cros-font-family-google-sans);\n  --cros-display-1-font-size: 44px;\n  --cros-display-1-font-weight: 500;\n  --cros-display-1-line-height: 52px;\n  --cros-display-2-font: 500 36px/44px var(--cros-font-family-google-sans);\n  --cros-display-2-font-family: var(--cros-font-family-google-sans);\n  --cros-display-2-font-size: 36px;\n  --cros-display-2-font-weight: 500;\n  --cros-display-2-line-height: 44px;\n  --cros-display-3-font: 500 32px/40px var(--cros-font-family-google-sans);\n  --cros-display-3-font-family: var(--cros-font-family-google-sans);\n  --cros-display-3-font-size: 32px;\n  --cros-display-3-font-weight: 500;\n  --cros-display-3-line-height: 40px;\n  --cros-display-4-font: 500 28px/36px var(--cros-font-family-google-sans);\n  --cros-display-4-font-family: var(--cros-font-family-google-sans);\n  --cros-display-4-font-size: 28px;\n  --cros-display-4-font-weight: 500;\n  --cros-display-4-line-height: 36px;\n  --cros-display-5-font: 500 24px/32px var(--cros-font-family-google-sans);\n  --cros-display-5-font-family: var(--cros-font-family-google-sans);\n  --cros-display-5-font-size: 24px;\n  --cros-display-5-font-weight: 500;\n  --cros-display-5-line-height: 32px;\n  --cros-display-6-font: 500 22px/28px var(--cros-font-family-google-sans);\n  --cros-display-6-font-family: var(--cros-font-family-google-sans);\n  --cros-display-6-font-size: 22px;\n  --cros-display-6-font-weight: 500;\n  --cros-display-6-line-height: 28px;\n  --cros-display-7-font: 500 18px/24px var(--cros-font-family-google-sans);\n  --cros-display-7-font-family: var(--cros-font-family-google-sans);\n  --cros-display-7-font-size: 18px;\n  --cros-display-7-font-weight: 500;\n  --cros-display-7-line-height: 24px;\n  --cros-annotation-1-font: 400 12px/18px var(--cros-font-family-roboto);\n  --cros-annotation-1-font-family: var(--cros-font-family-roboto);\n  --cros-annotation-1-font-size: 12px;\n  --cros-annotation-1-font-weight: 400;\n  --cros-annotation-1-line-height: 18px;\n  --cros-annotation-2-font: 400 11px/16px var(--cros-font-family-google-sans);\n  --cros-annotation-2-font-family: var(--cros-font-family-google-sans);\n  --cros-annotation-2-font-size: 11px;\n  --cros-annotation-2-font-weight: 400;\n  --cros-annotation-2-line-height: 16px;\n  --cros-button-1-font: 500 14px/20px var(--cros-font-family-roboto);\n  --cros-button-1-font-family: var(--cros-font-family-roboto);\n  --cros-button-1-font-size: 14px;\n  --cros-button-1-font-weight: 500;\n  --cros-button-1-line-height: 20px;\n  --cros-button-2-font: 500 13px/20px var(--cros-font-family-roboto);\n  --cros-button-2-font-family: var(--cros-font-family-roboto);\n  --cros-button-2-font-size: 13px;\n  --cros-button-2-font-weight: 500;\n  --cros-button-2-line-height: 20px;\n  --cros-title-1-font: 500 16px/24px var(--cros-font-family-google-sans);\n  --cros-title-1-font-family: var(--cros-font-family-google-sans);\n  --cros-title-1-font-size: 16px;\n  --cros-title-1-font-weight: 500;\n  --cros-title-1-line-height: 24px;\n  --cros-title-2-font: 500 16px/24px var(--cros-font-family-roboto);\n  --cros-title-2-font-family: var(--cros-font-family-roboto);\n  --cros-title-2-font-size: 16px;\n  --cros-title-2-font-weight: 500;\n  --cros-title-2-line-height: 24px;\n  --cros-label-font: 500 10px/10px var(--cros-font-family-roboto);\n  --cros-label-font-family: var(--cros-font-family-roboto);\n  --cros-label-font-size: 10px;\n  --cros-label-font-weight: 500;\n  --cros-label-line-height: 10px;\n  --cros-label-2-font: 400 10px/10px var(--cros-font-family-roboto);\n  --cros-label-2-font-family: var(--cros-font-family-roboto);\n  --cros-label-2-font-size: 10px;\n  --cros-label-2-font-weight: 400;\n  --cros-label-2-line-height: 10px;\n" : ""
      , fk = window ? "\n    --cros-color-primary-rgb: var(--cros-sys-on_surface-rgb);\n    --cros-color-primary: var(--cros-sys-on_surface);\n    --cros-color-primary-light: var(--cros-sys-on_surface);\n    --cros-color-primary-dark: var(--cros-sys-on_surface);\n\n    --cros-color-secondary-rgb: var(--cros-sys-secondary-rgb);\n    --cros-color-secondary: var(--cros-sys-secondary);\n    --cros-color-secondary-light: var(--cros-sys-secondary);\n    --cros-color-secondary-dark: var(--cros-sys-secondary);\n\n    --cros-color-prominent-rgb: var(--cros-sys-primary-rgb);\n    --cros-color-prominent: var(--cros-sys-primary);\n    --cros-color-prominent-light: var(--cros-sys-primary);\n    --cros-color-prominent-dark: var(--cros-sys-primary);\n\n    --cros-color-disabled-rgb: var(--cros-sys-disabled-rgb);\n    --cros-color-disabled: var(--cros-sys-disabled);\n    --cros-color-disabled-light: var(--cros-sys-disabled);\n    --cros-color-disabled-dark: var(--cros-sys-disabled);\n\n    --cros-text-color-secondary-rgb: var(--cros-sys-on_surface_variant-rgb);\n    --cros-text-color-secondary: var(--cros-sys-on_surface_variant);\n    --cros-text-color-secondary-light: var(--cros-sys-on_surface_variant);\n    --cros-text-color-secondary-dark: var(--cros-sys-on_surface_variant);\n\n    --cros-bg-color-rgb: var(--cros-sys-app_base-rgb);\n    --cros-bg-color: var(--cros-sys-app_base);\n    --cros-bg-color-light: var(--cros-sys-app_base);\n    --cros-bg-color-dark: var(--cros-sys-app_base);\n\n    --cros-bg-color-elevation-1-rgb: var(--cros-sys-base_elevated-rgb);\n    --cros-bg-color-elevation-1: var(--cros-sys-base_elevated);\n    --cros-bg-color-elevation-1-light: var(--cros-sys-base_elevated);\n    --cros-bg-color-elevation-1-dark: var(--cros-sys-base_elevated);\n\n    --cros-bg-color-elevation-2-rgb: var(--cros-sys-base_elevated-rgb);\n    --cros-bg-color-elevation-2: var(--cros-sys-base_elevated);\n    --cros-bg-color-elevation-2-light: var(--cros-sys-base_elevated);\n    --cros-bg-color-elevation-2-dark: var(--cros-sys-base_elevated);\n\n    --cros-bg-color-elevation-3-rgb: var(--cros-sys-base_elevated-rgb);\n    --cros-bg-color-elevation-3: var(--cros-sys-base_elevated);\n    --cros-bg-color-elevation-3-light: var(--cros-sys-base_elevated);\n    --cros-bg-color-elevation-3-dark: var(--cros-sys-base_elevated);\n\n    --cros-bg-color-elevation-4-rgb: var(--cros-sys-base_elevated-rgb);\n    --cros-bg-color-elevation-4: var(--cros-sys-base_elevated);\n    --cros-bg-color-elevation-4-light: var(--cros-sys-base_elevated);\n    --cros-bg-color-elevation-4-dark: var(--cros-sys-base_elevated);\n\n    --cros-bg-color-elevation-5-rgb: var(--cros-sys-base_elevated-rgb);\n    --cros-bg-color-elevation-5: var(--cros-sys-base_elevated);\n    --cros-bg-color-elevation-5-light: var(--cros-sys-base_elevated);\n    --cros-bg-color-elevation-5-dark: var(--cros-sys-base_elevated);\n\n    --cros-bg-color-dropped-elevation1-rgb: var(--cros-sys-app_base_shaded-rgb);\n    --cros-bg-color-dropped-elevation1: var(--cros-sys-app_base_shaded);\n    --cros-bg-color-dropped-elevation1-light: var(--cros-sys-app_base_shaded);\n    --cros-bg-color-dropped-elevation1-dark: var(--cros-sys-app_base_shaded);\n\n    --cros-bg-color-dropped-elevation2-rgb: var(--cros-sys-app_base_shaded-rgb);\n    --cros-bg-color-dropped-elevation2: var(--cros-sys-app_base_shaded);\n    --cros-bg-color-dropped-elevation2-light: var(--cros-sys-app_base_shaded);\n    --cros-bg-color-dropped-elevation2-dark: var(--cros-sys-app_base_shaded);\n\n    --cros-ripple-color-rgb: var(--cros-sys-hover_on_prominent-rgb);\n    --cros-ripple-color: var(--cros-sys-hover_on_prominent);\n    --cros-ripple-color-light: var(--cros-sys-hover_on_prominent);\n    --cros-ripple-color-dark: var(--cros-sys-hover_on_prominent);\n\n    --cros-ripple-color-prominent-rgb: var(--cros-sys-ripple_primary-rgb);\n    --cros-ripple-color-prominent: var(--cros-sys-ripple_primary);\n    --cros-ripple-color-prominent-light: var(--cros-sys-ripple_primary);\n    --cros-ripple-color-prominent-dark: var(--cros-sys-ripple_primary);\n\n    --cros-separator-color-rgb: var(--cros-sys-separator-rgb);\n    --cros-separator-color: var(--cros-sys-separator);\n    --cros-separator-color-light: var(--cros-sys-separator);\n    --cros-separator-color-dark: var(--cros-sys-separator);\n\n    --cros-link-color-rgb: var(--cros-sys-primary-rgb);\n    --cros-link-color: var(--cros-sys-primary);\n    --cros-link-color-light: var(--cros-sys-primary);\n    --cros-link-color-dark: var(--cros-sys-primary);\n\n    --cros-app-scrollbar-color-rgb: var(--cros-sys-scrollbar-rgb);\n    --cros-app-scrollbar-color: var(--cros-sys-scrollbar);\n    --cros-app-scrollbar-color-light: var(--cros-sys-scrollbar);\n    --cros-app-scrollbar-color-dark: var(--cros-sys-scrollbar);\n\n    --cros-app-scrollbar-color-hover-rgb: var(--cros-sys-scrollbar_hover-rgb);\n    --cros-app-scrollbar-color-hover: var(--cros-sys-scrollbar_hover);\n    --cros-app-scrollbar-color-hover-light: var(--cros-sys-scrollbar_hover);\n    --cros-app-scrollbar-color-hover-dark: var(--cros-sys-scrollbar_hover);\n\n    --cros-app-shield-color-rgb: var(--cros-sys-scrim-rgb);\n    --cros-app-shield-color: var(--cros-sys-scrim);\n    --cros-app-shield-color-light: var(--cros-sys-scrim);\n    --cros-app-shield-color-dark: var(--cros-sys-scrim);\n\n    --cros-app-shield20-rgb: var(--cros-sys-scrim-rgb);\n    --cros-app-shield20: var(--cros-sys-scrim);\n    --cros-app-shield20-light: var(--cros-sys-scrim);\n    --cros-app-shield20-dark: var(--cros-sys-scrim);\n\n    --cros-app-shield40-rgb: var(--cros-sys-scrim-rgb);\n    --cros-app-shield40: var(--cros-sys-scrim);\n    --cros-app-shield40-light: var(--cros-sys-scrim);\n    --cros-app-shield40-dark: var(--cros-sys-scrim);\n\n    --cros-app-shield60-rgb: var(--cros-sys-scrim-rgb);\n    --cros-app-shield60: var(--cros-sys-scrim);\n    --cros-app-shield60-light: var(--cros-sys-scrim);\n    --cros-app-shield60-dark: var(--cros-sys-scrim);\n\n    --cros-app-shield80-rgb: var(--cros-sys-scrim-rgb);\n    --cros-app-shield80: var(--cros-sys-scrim);\n    --cros-app-shield80-light: var(--cros-sys-scrim);\n    --cros-app-shield80-dark: var(--cros-sys-scrim);\n\n    --cros-highlight-color-rgb: var(--cros-sys-primary-rgb);\n    --cros-highlight-color: var(--cros-sys-primary);\n    --cros-highlight-color-light: var(--cros-sys-primary);\n    --cros-highlight-color-dark: var(--cros-sys-primary);\n\n    --cros-highlight-color-hover-rgb: var(--cros-sys-hover_on_subtle-rgb);\n    --cros-highlight-color-hover: var(--cros-sys-hover_on_subtle);\n    --cros-highlight-color-hover-light: var(--cros-sys-hover_on_subtle);\n    --cros-highlight-color-hover-dark: var(--cros-sys-hover_on_subtle);\n\n    --cros-highlight-color-focus-rgb: var(--cros-sys-ripple_neutral_on_subtle-rgb);\n    --cros-highlight-color-focus: var(--cros-sys-ripple_neutral_on_subtle);\n    --cros-highlight-color-focus-light: var(--cros-sys-ripple_neutral_on_subtle);\n    --cros-highlight-color-focus-dark: var(--cros-sys-ripple_neutral_on_subtle);\n\n    --cros-highlight-color-error-rgb: var(--cros-sys-error_container-rgb);\n    --cros-highlight-color-error: var(--cros-sys-error_container);\n    --cros-highlight-color-error-light: var(--cros-sys-error_container);\n    --cros-highlight-color-error-dark: var(--cros-sys-error_container);\n\n    --cros-highlight-color-green-rgb: var(--cros-sys-positive_container-rgb);\n    --cros-highlight-color-green: var(--cros-sys-positive_container);\n    --cros-highlight-color-green-light: var(--cros-sys-positive_container);\n    --cros-highlight-color-green-dark: var(--cros-sys-positive_container);\n\n    --cros-highlight-color-red-rgb: var(--cros-sys-error_container-rgb);\n    --cros-highlight-color-red: var(--cros-sys-error_container);\n    --cros-highlight-color-red-light: var(--cros-sys-error_container);\n    --cros-highlight-color-red-dark: var(--cros-sys-error_container);\n\n    --cros-highlight-color-yellow-rgb: var(--cros-sys-warning_container-rgb);\n    --cros-highlight-color-yellow: var(--cros-sys-warning_container);\n    --cros-highlight-color-yellow-light: var(--cros-sys-warning_container);\n    --cros-highlight-color-yellow-dark: var(--cros-sys-warning_container);\n\n    --cros-text-highlight-color-rgb: var(--cros-sys-highlight_text-rgb);\n    --cros-text-highlight-color: var(--cros-sys-highlight_text);\n    --cros-text-highlight-color-light: var(--cros-sys-highlight_text);\n    --cros-text-highlight-color-dark: var(--cros-sys-highlight_text);\n\n    --cros-button-label-color-secondary-rgb: var(--cros-sys-on_primary_container-rgb);\n    --cros-button-label-color-secondary: var(--cros-sys-on_primary_container);\n    --cros-button-label-color-secondary-light: var(--cros-sys-on_primary_container);\n    --cros-button-label-color-secondary-dark: var(--cros-sys-on_primary_container);\n\n    --cros-button-ripple-color-secondary-rgb: var(--cros-sys-ripple_primary-rgb);\n    --cros-button-ripple-color-secondary: var(--cros-sys-ripple_primary);\n    --cros-button-ripple-color-secondary-light: var(--cros-sys-ripple_primary);\n    --cros-button-ripple-color-secondary-dark: var(--cros-sys-ripple_primary);\n\n    --cros-textfield-background-color-rgb: var(--cros-sys-input_field_on_shaded-rgb);\n    --cros-textfield-background-color: var(--cros-sys-input_field_on_shaded);\n    --cros-textfield-background-color-light: var(--cros-sys-input_field_on_shaded);\n    --cros-textfield-background-color-dark: var(--cros-sys-input_field_on_shaded);\n\n    --cros-textfield-label-color-rgb: var(--cros-sys-on_surface-rgb);\n    --cros-textfield-label-color: var(--cros-sys-on_surface);\n    --cros-textfield-label-color-light: var(--cros-sys-on_surface);\n    --cros-textfield-label-color-dark: var(--cros-sys-on_surface);\n\n    --cros-slider-color-active-rgb: var(--cros-sys-primary-rgb);\n    --cros-slider-color-active: var(--cros-sys-primary);\n    --cros-slider-color-active-light: var(--cros-sys-primary);\n    --cros-slider-color-active-dark: var(--cros-sys-primary);\n\n    --cros-slider-track-color-active-rgb: var(--cros-sys-highlight_shape-rgb);\n    --cros-slider-track-color-active: var(--cros-sys-highlight_shape);\n    --cros-slider-track-color-active-light: var(--cros-sys-highlight_shape);\n    --cros-slider-track-color-active-dark: var(--cros-sys-highlight_shape);\n\n    --cros-slider-track-color-inactive-rgb: var(--cros-sys-disabled-rgb);\n    --cros-slider-track-color-inactive: rgba(var(--cros-slider-track-color-inactive-rgb), 0.3);\n    --cros-slider-track-color-inactive-light: rgba(var(--cros-slider-track-color-inactive-rgb), 0.3);\n    --cros-slider-track-color-inactive-dark: rgba(var(--cros-slider-track-color-inactive-rgb), 0.3);\n\n    --cros-slider-label-text-color-rgb: var(--cros-sys-on_primary-rgb);\n    --cros-slider-label-text-color: var(--cros-sys-on_primary);\n    --cros-slider-label-text-color-light: var(--cros-sys-on_primary);\n    --cros-slider-label-text-color-dark: var(--cros-sys-on_primary);\n\n    --cros-slider-color-inactive-rgb: var(--cros-sys-disabled-rgb);\n    --cros-slider-color-inactive: var(--cros-sys-disabled);\n    --cros-slider-color-inactive-light: var(--cros-sys-disabled);\n    --cros-slider-color-inactive-dark: var(--cros-sys-disabled);\n\n    --cros-switch-knob-color-active-rgb: var(--cros-sys-primary-rgb);\n    --cros-switch-knob-color-active: var(--cros-sys-primary);\n    --cros-switch-knob-color-active-light: var(--cros-sys-primary);\n    --cros-switch-knob-color-active-dark: var(--cros-sys-primary);\n\n    --cros-switch-knob-color-inactive-rgb: var(--cros-sys-surface_variant-rgb);\n    --cros-switch-knob-color-inactive: var(--cros-sys-surface_variant);\n    --cros-switch-knob-color-inactive-light: var(--cros-sys-surface_variant);\n    --cros-switch-knob-color-inactive-dark: var(--cros-sys-surface_variant);\n\n    --cros-switch-track-color-active-rgb: var(--cros-sys-primary_container-rgb);\n    --cros-switch-track-color-active: var(--cros-sys-primary_container);\n    --cros-switch-track-color-active-light: var(--cros-sys-primary_container);\n    --cros-switch-track-color-active-dark: var(--cros-sys-primary_container);\n\n    --cros-switch-track-color-inactive-rgb: var(--cros-sys-secondary-rgb);\n    --cros-switch-track-color-inactive: var(--cros-sys-secondary);\n    --cros-switch-track-color-inactive-light: var(--cros-sys-secondary);\n    --cros-switch-track-color-inactive-dark: var(--cros-sys-secondary);\n\n    --cros-tooltip-label-color-rgb: var(--cros-sys-inverse_on_surface-rgb);\n    --cros-tooltip-label-color: var(--cros-sys-inverse_on_surface);\n    --cros-tooltip-label-color-light: var(--cros-sys-inverse_on_surface);\n    --cros-tooltip-label-color-dark: var(--cros-sys-inverse_on_surface);\n\n    --cros-tooltip-background-color-rgb: var(--cros-sys-on_surface-rgb);\n    --cros-tooltip-background-color: var(--cros-sys-on_surface);\n    --cros-tooltip-background-color-light: var(--cros-sys-on_surface);\n    --cros-tooltip-background-color-dark: var(--cros-sys-on_surface);\n\n    --cros-nudge-label-color-rgb: var(--cros-sys-on_primary-rgb);\n    --cros-nudge-label-color: var(--cros-sys-on_primary);\n    --cros-nudge-label-color-light: var(--cros-sys-on_primary);\n    --cros-nudge-label-color-dark: var(--cros-sys-on_primary);\n\n    --cros-nudge-icon-color-rgb: var(--cros-sys-on_primary-rgb);\n    --cros-nudge-icon-color: var(--cros-sys-on_primary);\n    --cros-nudge-icon-color-light: var(--cros-sys-on_primary);\n    --cros-nudge-icon-color-dark: var(--cros-sys-on_primary);\n\n    --cros-nudge-background-color-rgb: var(--cros-sys-primary-rgb);\n    --cros-nudge-background-color: var(--cros-sys-primary);\n    --cros-nudge-background-color-light: var(--cros-sys-primary);\n    --cros-nudge-background-color-dark: var(--cros-sys-primary);\n\n    --cros-menu-label-color-rgb: var(--cros-sys-on_surface-rgb);\n    --cros-menu-label-color: var(--cros-sys-on_surface);\n    --cros-menu-label-color-light: var(--cros-sys-on_surface);\n    --cros-menu-label-color-dark: var(--cros-sys-on_surface);\n\n    --cros-menu-icon-color-rgb: var(--cros-sys-on_surface-rgb);\n    --cros-menu-icon-color: var(--cros-sys-on_surface);\n    --cros-menu-icon-color-light: var(--cros-sys-on_surface);\n    --cros-menu-icon-color-dark: var(--cros-sys-on_surface);\n\n    --cros-menu-shortcut-color-rgb: var(--cros-sys-secondary-rgb);\n    --cros-menu-shortcut-color: var(--cros-sys-secondary);\n    --cros-menu-shortcut-color-light: var(--cros-sys-secondary);\n    --cros-menu-shortcut-color-dark: var(--cros-sys-secondary);\n\n    --cros-menu-item-background-hover-rgb: var(--cros-sys-hover_on_subtle-rgb);\n    --cros-menu-item-background-hover: var(--cros-sys-hover_on_subtle);\n    --cros-menu-item-background-hover-light: var(--cros-sys-hover_on_subtle);\n    --cros-menu-item-background-hover-dark: var(--cros-sys-hover_on_subtle);\n\n    --cros-color-positive-rgb: var(--cros-sys-positive-rgb);\n    --cros-color-positive: var(--cros-sys-positive);\n    --cros-color-positive-light: var(--cros-sys-positive);\n    --cros-color-positive-dark: var(--cros-sys-positive);\n\n    --cros-color-warning-rgb: var(--cros-sys-warning-rgb);\n    --cros-color-warning: var(--cros-sys-warning);\n    --cros-color-warning-light: var(--cros-sys-warning);\n    --cros-color-warning-dark: var(--cros-sys-warning);\n\n    --cros-color-alert-rgb: var(--cros-sys-error-rgb);\n    --cros-color-alert: var(--cros-sys-error);\n    --cros-color-alert-light: var(--cros-sys-error);\n    --cros-color-alert-dark: var(--cros-sys-error);\n\n    --cros-button-background-color-secondary-hover-rgb: var(--cros-sys-hover_on_subtle-rgb);\n    --cros-button-background-color-secondary-hover: var(--cros-sys-hover_on_subtle);\n    --cros-button-background-color-secondary-hover-light: var(--cros-sys-hover_on_subtle);\n    --cros-button-background-color-secondary-hover-dark: var(--cros-sys-hover_on_subtle);\n\n    --cros-button-stroke-color-secondary-hover-rgb: var(--cros-sys-primary_container-rgb);\n    --cros-button-stroke-color-secondary-hover: var(--cros-sys-primary_container);\n    --cros-button-stroke-color-secondary-hover-light: var(--cros-sys-primary_container);\n    --cros-button-stroke-color-secondary-hover-dark: var(--cros-sys-primary_container);\n\n    --cros-button-secondary-background-color-rgb: var(--cros-sys-primary_container-rgb);\n    --cros-button-secondary-background-color: var(--cros-sys-primary_container);\n    --cros-button-secondary-background-color-light: var(--cros-sys-primary_container);\n    --cros-button-secondary-background-color-dark: var(--cros-sys-primary_container);\n\n    --cros-button-stroke-color-secondary-rgb: var(--cros-sys-primary_container-rgb);\n    --cros-button-stroke-color-secondary: var(--cros-sys-primary_container);\n    --cros-button-stroke-color-secondary-light: var(--cros-sys-primary_container);\n    --cros-button-stroke-color-secondary-dark: var(--cros-sys-primary_container);\n\n    --cros-dialog-scrim-color-rgb: var(--cros-sys-scrim-rgb);\n    --cros-dialog-scrim-color: var(--cros-sys-scrim);\n    --cros-dialog-scrim-color-light: var(--cros-sys-scrim);\n    --cros-dialog-scrim-color-dark: var(--cros-sys-scrim);\n\n    --cros-resizable-rect-corner-handle-rgb: var(--cros-sys-primary-rgb);\n    --cros-resizable-rect-corner-handle: var(--cros-sys-primary);\n    --cros-resizable-rect-corner-handle-light: var(--cros-sys-primary);\n    --cros-resizable-rect-corner-handle-dark: var(--cros-sys-primary);\n\n    --cros-text-color-primary-rgb: var(--cros-sys-on_surface-rgb);\n    --cros-text-color-primary: var(--cros-sys-on_surface);\n    --cros-text-color-primary-light: var(--cros-sys-on_surface);\n    --cros-text-color-primary-dark: var(--cros-sys-on_surface);\n\n    --cros-icon-button-toggle-ripple-color-opaque-rgb: var(--cros-sys-ripple_primary-rgb);\n    --cros-icon-button-toggle-ripple-color-opaque: rgb(var(--cros-icon-button-toggle-ripple-color-opaque-rgb));\n    --cros-icon-button-toggle-ripple-color-opaque-light: rgb(var(--cros-icon-button-toggle-ripple-color-opaque-rgb));\n    --cros-icon-button-toggle-ripple-color-opaque-dark: rgb(var(--cros-icon-button-toggle-ripple-color-opaque-rgb));\n\n    --cros-icon-button-toggle-ripple-color-rgb: var(--cros-sys-primary_container-rgb);\n    --cros-icon-button-toggle-ripple-color: var(--cros-sys-primary_container);\n    --cros-icon-button-toggle-ripple-color-light: var(--cros-sys-primary_container);\n    --cros-icon-button-toggle-ripple-color-dark: var(--cros-sys-primary_container);\n\n    --cros-button-background-color-primary-disabled-rgb: var(--cros-sys-app_base_shaded-rgb);\n    --cros-button-background-color-primary-disabled: var(--cros-sys-app_base_shaded);\n    --cros-button-background-color-primary-disabled-light: var(--cros-sys-app_base_shaded);\n    --cros-button-background-color-primary-disabled-dark: var(--cros-sys-app_base_shaded);\n\n    --cros-button-active-shadow-color-key-secondary-rgb: 0, 0, 0;\n    --cros-button-active-shadow-color-key-secondary: rgba(var(--cros-button-active-shadow-color-key-secondary-rgb), 0);\n    --cros-button-active-shadow-color-key-secondary-light: rgba(var(--cros-button-active-shadow-color-key-secondary-rgb), 0);\n    --cros-button-active-shadow-color-key-secondary-dark: rgba(var(--cros-button-active-shadow-color-key-secondary-rgb), 0);\n\n    --cros-button-active-shadow-color-ambient-secondary-rgb: 0, 0, 0;\n    --cros-button-active-shadow-color-ambient-secondary: rgba(var(--cros-button-active-shadow-color-ambient-secondary-rgb), 0);\n    --cros-button-active-shadow-color-ambient-secondary-light: rgba(var(--cros-button-active-shadow-color-ambient-secondary-rgb), 0);\n    --cros-button-active-shadow-color-ambient-secondary-dark: rgba(var(--cros-button-active-shadow-color-ambient-secondary-rgb), 0);\n\n    --cros-button-secondary-pressed-ripple-color-rgb: var(--cros-sys-ripple_primary-rgb);\n    --cros-button-secondary-pressed-ripple-color: rgb(var(--cros-button-secondary-pressed-ripple-color-rgb));\n    --cros-button-secondary-pressed-ripple-color-light: rgb(var(--cros-button-secondary-pressed-ripple-color-rgb));\n    --cros-button-secondary-pressed-ripple-color-dark: rgb(var(--cros-button-secondary-pressed-ripple-color-rgb));\n\n    --cros-selected-navigation-tree-item-color-rgb: var(--cros-sys-on_primary-rgb);\n    --cros-selected-navigation-tree-item-color: var(--cros-sys-on_primary);\n    --cros-selected-navigation-tree-item-color-light: var(--cros-sys-on_primary);\n    --cros-selected-navigation-tree-item-color-dark: var(--cros-sys-on_primary);\n\n    --cros-child-selected-navigation-tree-item-color-rgb: var(--cros-sys-on_surface-rgb);\n    --cros-child-selected-navigation-tree-item-color: var(--cros-sys-on_surface);\n    --cros-child-selected-navigation-tree-item-color-light: var(--cros-sys-on_surface);\n    --cros-child-selected-navigation-tree-item-color-dark: var(--cros-sys-on_surface);\n\n    --cros-hovered-navigation-tree-item-background-color-rgb: var(--cros-sys-hover_on_subtle-rgb);\n    --cros-hovered-navigation-tree-item-background-color: var(--cros-sys-hover_on_subtle);\n    --cros-hovered-navigation-tree-item-background-color-light: var(--cros-sys-hover_on_subtle);\n    --cros-hovered-navigation-tree-item-background-color-dark: var(--cros-sys-hover_on_subtle);\n\n    --cros-tab-label-color-active-rgb: var(--cros-sys-primary-rgb);\n    --cros-tab-label-color-active: var(--cros-sys-primary);\n    --cros-tab-label-color-active-light: var(--cros-sys-primary);\n    --cros-tab-label-color-active-dark: var(--cros-sys-primary);\n\n    --cros-tab-label-color-inactive-rgb: var(--cros-sys-on_surface_variant-rgb);\n    --cros-tab-label-color-inactive: var(--cros-sys-on_surface_variant);\n    --cros-tab-label-color-inactive-light: var(--cros-sys-on_surface_variant);\n    --cros-tab-label-color-inactive-dark: var(--cros-sys-on_surface_variant);\n\n    --cros-textfield-hint-text-color-rgb: var(--cros-sys-secondary-rgb);\n    --cros-textfield-hint-text-color: var(--cros-sys-secondary);\n    --cros-textfield-hint-text-color-light: var(--cros-sys-secondary);\n    --cros-textfield-hint-text-color-dark: var(--cros-sys-secondary);\n\n    --cros-textfield-input-color-rgb: var(--cros-sys-on_surface-rgb);\n    --cros-textfield-input-color: var(--cros-sys-on_surface);\n    --cros-textfield-input-color-light: var(--cros-sys-on_surface);\n    --cros-textfield-input-color-dark: var(--cros-sys-on_surface);\n\n    --cros-textfield-suffixes-color-rgb: var(--cros-sys-secondary-rgb);\n    --cros-textfield-suffixes-color: var(--cros-sys-secondary);\n    --cros-textfield-suffixes-color-light: var(--cros-sys-secondary);\n    --cros-textfield-suffixes-color-dark: var(--cros-sys-secondary);\n\n    --cros-textfield-label-color-error-rgb: var(--cros-sys-error-rgb);\n    --cros-textfield-label-color-error: var(--cros-sys-error);\n    --cros-textfield-label-color-error-light: var(--cros-sys-error);\n    --cros-textfield-label-color-error-dark: var(--cros-sys-error);\n\n    --cros-textfield-underline-color-focus-rgb: var(--cros-sys-primary-rgb);\n    --cros-textfield-underline-color-focus: var(--cros-sys-primary);\n    --cros-textfield-underline-color-focus-light: var(--cros-sys-primary);\n    --cros-textfield-underline-color-focus-dark: var(--cros-sys-primary);\n\n    --cros-app-textfield-background-color-rgb: var(--cros-sys-input_field_on_base-rgb);\n    --cros-app-textfield-background-color: var(--cros-sys-input_field_on_base);\n    --cros-app-textfield-background-color-light: var(--cros-sys-input_field_on_base);\n    --cros-app-textfield-background-color-dark: var(--cros-sys-input_field_on_base);\n\n    --cros-illustration-color-1-rgb: var(--cros-sys-illo-color1-rgb);\n    --cros-illustration-color-1: var(--cros-sys-illo-color1);\n    --cros-illustration-color-1-light: var(--cros-sys-illo-color1);\n    --cros-illustration-color-1-dark: var(--cros-sys-illo-color1);\n\n    --cros-illustration-color-1-shade-1-rgb: var(--cros-sys-illo-color1-1-rgb);\n    --cros-illustration-color-1-shade-1: var(--cros-sys-illo-color1-1);\n    --cros-illustration-color-1-shade-1-light: var(--cros-sys-illo-color1-1);\n    --cros-illustration-color-1-shade-1-dark: var(--cros-sys-illo-color1-1);\n\n    --cros-illustration-color-1-shade-2-rgb: var(--cros-sys-illo-color1-2-rgb);\n    --cros-illustration-color-1-shade-2: var(--cros-sys-illo-color1-2);\n    --cros-illustration-color-1-shade-2-light: var(--cros-sys-illo-color1-2);\n    --cros-illustration-color-1-shade-2-dark: var(--cros-sys-illo-color1-2);\n\n    --cros-illustration-color-2-rgb: var(--cros-sys-illo-color2-rgb);\n    --cros-illustration-color-2: var(--cros-sys-illo-color2);\n    --cros-illustration-color-2-light: var(--cros-sys-illo-color2);\n    --cros-illustration-color-2-dark: var(--cros-sys-illo-color2);\n\n    --cros-illustration-color-3-rgb: var(--cros-sys-illo-color3-rgb);\n    --cros-illustration-color-3: var(--cros-sys-illo-color3);\n    --cros-illustration-color-3-light: var(--cros-sys-illo-color3);\n    --cros-illustration-color-3-dark: var(--cros-sys-illo-color3);\n\n    --cros-illustration-color-4-rgb: var(--cros-sys-illo-color4-rgb);\n    --cros-illustration-color-4: var(--cros-sys-illo-color4);\n    --cros-illustration-color-4-light: var(--cros-sys-illo-color4);\n    --cros-illustration-color-4-dark: var(--cros-sys-illo-color4);\n\n    --cros-illustration-color-5-rgb: var(--cros-sys-illo-color5-rgb);\n    --cros-illustration-color-5: var(--cros-sys-illo-color5);\n    --cros-illustration-color-5-light: var(--cros-sys-illo-color5);\n    --cros-illustration-color-5-dark: var(--cros-sys-illo-color5);\n\n    --cros-illustration-color-6-rgb: var(--cros-sys-illo-color6-rgb);\n    --cros-illustration-color-6: var(--cros-sys-illo-color6);\n    --cros-illustration-color-6-light: var(--cros-sys-illo-color6);\n    --cros-illustration-color-6-dark: var(--cros-sys-illo-color6);\n\n    --cros-illustration-base-color-rgb: var(--cros-sys-illo-base-rgb);\n    --cros-illustration-base-color: var(--cros-sys-illo-base);\n    --cros-illustration-base-color-light: var(--cros-sys-illo-base);\n    --cros-illustration-base-color-dark: var(--cros-sys-illo-base);\n\n    --cros-illustration-secondary-color-rgb: var(--cros-sys-illo-secondary-rgb);\n    --cros-illustration-secondary-color: var(--cros-sys-illo-secondary);\n    --cros-illustration-secondary-color-light: var(--cros-sys-illo-secondary);\n    --cros-illustration-secondary-color-dark: var(--cros-sys-illo-secondary);\n\n    --cros-illustration-elevation-color-1-shade-1-rgb: var(--cros-sys-illo-color1-1-rgb);\n    --cros-illustration-elevation-color-1-shade-1: var(--cros-sys-illo-color1-1);\n    --cros-illustration-elevation-color-1-shade-1-light: var(--cros-sys-illo-color1-1);\n    --cros-illustration-elevation-color-1-shade-1-dark: var(--cros-sys-illo-color1-1);\n\n    --cros-illustration-elevation-color-1-shade-2-rgb: var(--cros-sys-illo-color1-2-rgb);\n    --cros-illustration-elevation-color-1-shade-2: var(--cros-sys-illo-color1-2);\n    --cros-illustration-elevation-color-1-shade-2-light: var(--cros-sys-illo-color1-2);\n    --cros-illustration-elevation-color-1-shade-2-dark: var(--cros-sys-illo-color1-2);\n\n    --cros-illustration-elevation-base-color-rgb: var(--cros-sys-illo-base-rgb);\n    --cros-illustration-elevation-base-color: var(--cros-sys-illo-base);\n    --cros-illustration-elevation-base-color-light: var(--cros-sys-illo-base);\n    --cros-illustration-elevation-base-color-dark: var(--cros-sys-illo-base);\n\n    --cros-illustration-elevation-secondary-color-rgb: var(--cros-sys-illo-secondary-rgb);\n    --cros-illustration-elevation-secondary-color: var(--cros-sys-illo-secondary);\n    --cros-illustration-elevation-secondary-color-light: var(--cros-sys-illo-secondary);\n    --cros-illustration-elevation-secondary-color-dark: var(--cros-sys-illo-secondary);\n\n    --cros-menu-expanded-ripple-color-rgb: var(--cros-sys-hover_on_subtle-rgb);\n    --cros-menu-expanded-ripple-color: var(--cros-sys-hover_on_subtle);\n    --cros-menu-expanded-ripple-color-light: var(--cros-sys-hover_on_subtle);\n    --cros-menu-expanded-ripple-color-dark: var(--cros-sys-hover_on_subtle);\n\n    --cros-menu-ripple-color-rgb: var(--cros-sys-hover_on_subtle-rgb);\n    --cros-menu-ripple-color: rgb(var(--cros-menu-ripple-color-rgb));\n    --cros-menu-ripple-color-light: rgb(var(--cros-menu-ripple-color-rgb));\n    --cros-menu-ripple-color-dark: rgb(var(--cros-menu-ripple-color-rgb));\n\n    --cros-select-ripple-color-rgb: var(--cros-sys-hover_on_subtle-rgb);\n    --cros-select-ripple-color: rgb(var(--cros-select-ripple-color-rgb));\n    --cros-select-ripple-color-light: rgb(var(--cros-select-ripple-color-rgb));\n    --cros-select-ripple-color-dark: rgb(var(--cros-select-ripple-color-rgb));\n\n    --cros-select-background-color-rgb: var(--cros-sys-input_field_on_base-rgb);\n    --cros-select-background-color: var(--cros-sys-input_field_on_base);\n    --cros-select-background-color-light: var(--cros-sys-input_field_on_base);\n    --cros-select-background-color-dark: var(--cros-sys-input_field_on_base);\n\n    --cros-knob-ring-color-rgb: var(--cros-sys-focus_ring-rgb);\n    --cros-knob-ring-color: var(--cros-sys-focus_ring);\n    --cros-knob-ring-color-light: var(--cros-sys-focus_ring);\n    --cros-knob-ring-color-dark: var(--cros-sys-focus_ring);\n\n    --cros-knob-ring-color-focus-rgb: var(--cros-sys-focus_ring-rgb);\n    --cros-knob-ring-color-focus: rgba(var(--cros-knob-ring-color-focus-rgb), 0.5);\n    --cros-knob-ring-color-focus-light: rgba(var(--cros-knob-ring-color-focus-rgb), 0.5);\n    --cros-knob-ring-color-focus-dark: rgba(var(--cros-knob-ring-color-focus-rgb), 0.5);\n\n    --cros-rescale-indicator-color-rgb: var(--cros-sys-on_surface-rgb);\n    --cros-rescale-indicator-color: var(--cros-sys-on_surface);\n    --cros-rescale-indicator-color-light: var(--cros-sys-on_surface);\n    --cros-rescale-indicator-color-dark: var(--cros-sys-on_surface);\n\n    --cros-tab-slider-track-color-rgb: var(--cros-sys-surface_variant-rgb);\n    --cros-tab-slider-track-color: var(--cros-sys-surface_variant);\n    --cros-tab-slider-track-color-light: var(--cros-sys-surface_variant);\n    --cros-tab-slider-track-color-dark: var(--cros-sys-surface_variant);\n\n    --cros-ripple-color-hover-rgb: 0, 0, 0;\n    --cros-ripple-color-hover: rgba(var(--cros-ripple-color-hover-rgb), 0);\n    --cros-ripple-color-hover-light: rgba(var(--cros-ripple-color-hover-rgb), 0);\n    --cros-ripple-color-hover-dark: rgba(var(--cros-ripple-color-hover-rgb), 0);\n\n    --cros-ripple-color-pressed-rgb: var(--cros-sys-ripple_primary-rgb);\n    --cros-ripple-color-pressed: var(--cros-sys-ripple_primary);\n    --cros-ripple-color-pressed-light: var(--cros-sys-ripple_primary);\n    --cros-ripple-color-pressed-dark: var(--cros-sys-ripple_primary);\n\n    --cros-text-color-unselected-rgb: var(--cros-sys-secondary-rgb);\n    --cros-text-color-unselected: var(--cros-sys-secondary);\n    --cros-text-color-unselected-light: var(--cros-sys-secondary);\n    --cros-text-color-unselected-dark: var(--cros-sys-secondary);\n\n    --cros-button-label-color-primary-rgb: var(--cros-sys-on_primary-rgb);\n    --cros-button-label-color-primary: var(--cros-sys-on_primary);\n    --cros-button-label-color-primary-light: var(--cros-sys-on_primary);\n    --cros-button-label-color-primary-dark: var(--cros-sys-on_primary);\n\n    --cros-icon-button-pressed-ripple-color-rgb: var(--cros-sys-ripple_neutral_on_subtle-rgb);\n    --cros-icon-button-pressed-ripple-color: rgb(var(--cros-icon-button-pressed-ripple-color-rgb));\n    --cros-icon-button-pressed-ripple-color-light: rgb(var(--cros-icon-button-pressed-ripple-color-rgb));\n    --cros-icon-button-pressed-ripple-color-dark: rgb(var(--cros-icon-button-pressed-ripple-color-rgb));\n\n    --cros-icon-button-hover-ripple-color-rgb: var(--cros-sys-hover_on_subtle-rgb);\n    --cros-icon-button-hover-ripple-color: var(--cros-sys-hover_on_subtle);\n    --cros-icon-button-hover-ripple-color-light: var(--cros-sys-hover_on_subtle);\n    --cros-icon-button-hover-ripple-color-dark: var(--cros-sys-hover_on_subtle);\n\n    --cros-textfield-hint-text-color-error-rgb: var(--cros-sys-error-rgb);\n    --cros-textfield-hint-text-color-error: var(--cros-sys-error);\n    --cros-textfield-hint-text-color-error-light: var(--cros-sys-error);\n    --cros-textfield-hint-text-color-error-dark: var(--cros-sys-error);\n\n    --cros-color-selection-rgb: var(--cros-sys-on_primary-rgb);\n    --cros-color-selection: var(--cros-sys-on_primary);\n    --cros-color-selection-light: var(--cros-sys-on_primary);\n    --cros-color-selection-dark: var(--cros-sys-on_primary);\n\n    --cros-icon-color-selection-rgb: var(--cros-sys-on_primary-rgb);\n    --cros-icon-color-selection: var(--cros-sys-on_primary);\n    --cros-icon-color-selection-light: var(--cros-sys-on_primary);\n    --cros-icon-color-selection-dark: var(--cros-sys-on_primary);\n\n    --cros-sys-illo-elevated-color-1-1-rgb: var(--cros-sys-illo-color1-1-rgb);\n    --cros-sys-illo-elevated-color-1-1: var(--cros-sys-illo-color1-1);\n    --cros-sys-illo-elevated-color-1-1-light: var(--cros-sys-illo-color1-1);\n    --cros-sys-illo-elevated-color-1-1-dark: var(--cros-sys-illo-color1-1);\n\n    --cros-sys-illo-elevated-color-1-2-rgb: var(--cros-sys-illo-color1-2-rgb);\n    --cros-sys-illo-elevated-color-1-2: var(--cros-sys-illo-color1-2);\n    --cros-sys-illo-elevated-color-1-2-light: var(--cros-sys-illo-color1-2);\n    --cros-sys-illo-elevated-color-1-2-dark: var(--cros-sys-illo-color1-2);\n\n    --cros-sys-elevated-illo-base-rgb: var(--cros-sys-illo-base-rgb);\n    --cros-sys-elevated-illo-base: var(--cros-sys-illo-base);\n    --cros-sys-elevated-illo-base-light: var(--cros-sys-illo-base);\n    --cros-sys-elevated-illo-base-dark: var(--cros-sys-illo-base);\n\n    --cros-sys-elevated-illo-secondary-rgb: var(--cros-sys-illo-secondary-rgb);\n    --cros-sys-elevated-illo-secondary: var(--cros-sys-illo-secondary);\n    --cros-sys-elevated-illo-secondary-light: var(--cros-sys-illo-secondary);\n    --cros-sys-elevated-illo-secondary-dark: var(--cros-sys-illo-secondary);\n" : "";
    function gk() {
        return "rtl" === document.dir ? "rtl" : "ltr"
    }
    ;class hk extends yi {
        constructor(a) {
            super();
            this.h = void 0;
            if (2 !== a.type)
                throw Error("contents can only be used in text bindings");
        }
        i(a) {
            if (a === this.h)
                return Fg;
            this.h = a;
            return document.importNode(a.content, !0)
        }
    }
    var ik = xi(hk);
    document.createElement("template");
    var jk = class extends K {
        constructor() {
            super(...arguments);
            this.template = null;
            this.rtlFlip = !1;
            this.ariaHidden = "true"
        }
        static get M() {
            return J`
      :host {
        --icon-color: currentColor;
        --icon-size: var(--ea-icon-size, 24px);
        display: block;
        height: var(--icon-size);
        width: var(--icon-size);
      }

      svg {
        width: var(--icon-size);
        height: var(--icon-size);
        fill: var(--icon-color);
      }

      :host([dir="rtl"][rtlflip]) {
        transform: scaleX(-1);
      }
    `
        }
        i() {
            if (null === this.template)
                throw Error("<ea-icon> must be provided with a icon");
            this.setAttribute("dir", document.dir);
            return F`${ik(this.template)}`
        }
    }
    ;
    t([M({
        H: !1
    }), A("design:type", Object)], jk.prototype, "template", void 0);
    t([M({
        type: Boolean,
        A: !0
    }), A("design:type", Object)], jk.prototype, "rtlFlip", void 0);
    t([M({
        type: String,
        A: !0,
        H: "aria-hidden"
    }), A("design:type", Object)], jk.prototype, "ariaHidden", void 0);
    jk = t([L("ea-icon")], jk);
    function kk(a, b) {
        const c = Fa();
        b = c ? c.createHTML(b) : b;
        b = mb(new nb(b,lb));
        a.innerHTML = b
    }
    ;let lk;
    var mk;
    if (void 0 === lk) {
        var nk = document.createElement("template");
        kk(nk, '<svg data-id="arrow_drop_down_24px" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5H7z"></path></svg>\n');
        lk = nk
    }
    mk = lk;
    function ok(a) {
        const b = 2 !== a.expandedState ? F`<ea-icon .template=${mk}></ea-icon>` : "";
        return F`
      <div
          class="icon-container expand-icon"
          dir=${gk()}
          @click=${a.l}>
        ${b}
      </div>
      <slot class="primary-icon" name="icon"></slot>
      <span dir=${a.overrideTextDirection ?? I}>${a.text}</span>
    `
    }
    var qk = class extends K {
        constructor() {
            super(...arguments);
            this.expandedState = 2;
            this.selectedState = 0;
            this.text = "";
            this.overrideTextDirection = void 0;
            this.tabIndex = -1
        }
        focus() {
            this.button.focus()
        }
        get h() {
            return 1 === this.expandedState ? this.qf.assignedElements().filter(pk) : []
        }
        get g() {
            const a = this.parentElement;
            return a ? a.closest("ea-navigation-tree-item") : null
        }
        L(a) {
            super.L(a);
            this.addEventListener("blur", ()=>{
                this.removeAttribute("style")
            }
            );
            a = 0;
            let b = this;
            for (; b; )
                b = b.g,
                a++;
            this.setAttribute("level", String(a));
            this.button.setAttribute("aria-level", String(a))
        }
        static get M() {
            return J`
      :host {
        --navigation-tree-item-background-color-hover: var(--cros-hovered-navigation-tree-item-background-color);
        --navigation-tree-item-background-color-selected: var(--cros-highlight-color);
        --navigation-tree-item-focus-ring-color: var(--cros-focus-ring-color);
        --navigation-tree-item-color: var(--cros-text-color-primary);
        --navigation-tree-item-color-child-selected:
            var(--cros-child-selected-navigation-tree-item-color);
        --navigation-tree-item-color-selected: var(--cros-selected-navigation-tree-item-color);
        --navigation-tree-item-icon-color: var(--cros-icon-color-primary);
        --navigation-tree-item-icon-color-child-selected:
            var(--cros-child-selected-navigation-tree-item-color);
        --navigation-tree-item-icon-color-selected:
            var(--cros-selected-navigation-tree-item-color);
        color: var(--navigation-tree-item-color);
        font: ${Oj};
        width: 100%;
      }

      .button-container {
        align-items: center;
        display: flex;
        height: 40px;
        width: 100%;
      }

      .button-container:hover .button-content {
        background-color: var(--navigation-tree-item-background-color-hover);
      }

      .button-container .button-content[aria-selected="true"] {
        background-color: var(--navigation-tree-item-background-color-selected);
      }

      .button-content {
        align-items: center;
        background-color: inherit;
        border: none;
        box-sizing: border-box;
        color: inherit;
        cursor: pointer;
        display: flex;
        font: inherit;
        height: 32px;
        margin: 0;
        padding: 0;
        padding-inline-end: 20px;
        padding-inline-start: var(--navigation-tree-item-padding-start, 0);
        position: relative;
        text-align: inherit;
        width: 100%;
      }

      .button-content:not([aria-level="1"]) {
        font: ${Nj};
      }

      .button-content:is([aria-selected="true"], .child-selected) {
        font: ${Oj};
      }

      .button-content[aria-selected="true"] {
        color: var(--navigation-tree-item-color-selected);
      }

      .button-content.child-selected {
        color: var(--navigation-tree-item-color-child-selected);
      }

      .button-content[aria-selected="true"] slot[name="icon"]::slotted(*) {
        color: var(--navigation-tree-item-icon-color-selected);
      }

      .button-content.child-selected slot[name="icon"]::slotted(*) {
        color: var(--navigation-tree-item-icon-color-child-selected);
      }

      .button-content[dir="ltr"] {
        border-bottom-right-radius: 30px;
        border-top-right-radius: 30px;
      }

      .button-content[dir="rtl"] {
        border-bottom-left-radius: 30px;
        border-top-left-radius: 30px;
      }

      .button-content:focus-visible {
        outline-offset: var(--cros-navigation-tree-item-focus-ring-outline-offset);
        outline: 2px solid var(--navigation-tree-item-focus-ring-color);
      }

      .button-content[dir="ltr"]:focus-visible {
        border-left: none;
      }

      .button-content[dir="rtl"]:focus-visible {
        border-right: none;
      }

      .expand-icon {
        margin: 0 2px 0 6px;
      }

      .expand-icon[dir="ltr"] {
        transform: rotate(-90deg);
      }

      .expand-icon[dir="rtl"] {
        transform: rotate(90deg);
      }

      .button-content[aria-expanded="true"] .expand-icon {
        transform: rotate(0);
      }

      .icon-container {
        height: 20px;
        min-width: 20px;
        width: 20px;
      }

      ea-icon {
        --ea-icon-size: 20px;
      }

      slot[name="icon"]::slotted(*) {
        color: var(--navigation-tree-item-icon-color);
        height: 20px;
        pointer-events: none;
        width: 20px;
      }

      slot[name="icon"].primary-icon::slotted(*) {
        margin-inline-end: 16px;
      }

      span {
        color: inherit;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    `
        }
        i() {
            const a = 1 === this.expandedState ? F`<slot></slot>` : "";
            var b = zi({
                "button-content": !0,
                "child-selected": 2 === this.selectedState
            })
              , c = gk();
            a: {
                switch (this.expandedState) {
                case 1:
                    var d = !0;
                    break a;
                case 0:
                    d = !1;
                    break a
                }
                d = void 0
            }
            return F`
      <div
          class="button-container"
          @pointerdown=${()=>{
                this.setAttribute("style", "--navigation-tree-item-focus-ring-color: transparent")
            }
            }>
        <button
            class=${b}
            dir=${c}
            id="nav-button"
            role="treeitem"
            aria-selected=${1 === this.selectedState}
            aria-expanded=${d ?? I}
            aria-label=${this.text}
            title=${this.text}
            tabindex=${this.tabIndex}>
          ${ok(this)}
        </button>
      </div>
      <div class="expanded-container">
        ${a}
      </div>
    `
        }
        l(a) {
            1 === this.expandedState ? this.expandedState = 0 : 0 === this.expandedState && (this.expandedState = 1);
            a.stopPropagation()
        }
    }
    ;
    t([M({
        H: !1
    }), A("design:type", Number)], qk.prototype, "expandedState", void 0);
    t([M({
        H: !1
    }), A("design:type", Number)], qk.prototype, "selectedState", void 0);
    t([M({
        H: !1
    }), A("design:type", Object)], qk.prototype, "text", void 0);
    t([M({
        H: !1
    }), A("design:type", Object)], qk.prototype, "overrideTextDirection", void 0);
    t([M({
        H: !1
    }), A("design:type", Number)], qk.prototype, "tabIndex", void 0);
    t([O("button"), A("design:type", HTMLElement)], qk.prototype, "button", void 0);
    t([O("slot:not([name]"), A("design:type", HTMLSlotElement)], qk.prototype, "qf", void 0);
    t([O('slot[name="icon"]'), A("design:type", HTMLSlotElement)], qk.prototype, "dj", void 0);
    qk = t([L("ea-navigation-tree-item")], qk);
    function pk(a) {
        return a instanceof qk
    }
    ;function rk(a, b) {
        for (const c of a.l)
            c.selectedState = 0;
        if (b)
            for (b.selectedState = 1,
            a = b.g; a; )
                a.selectedState = 2,
                a = a.g
    }
    function sk(a) {
        for (a = a.nextElementSibling; a && !pk(a); )
            a = a.nextElementSibling;
        return a
    }
    function tk(a, b) {
        if (1 !== b.expandedState)
            return b;
        const c = b.h;
        return 0 === c.length ? b : tk(a, c[c.length - 1])
    }
    var uk = class extends K {
        get l() {
            return [...this.querySelectorAll("ea-navigation-tree-item")]
        }
        constructor() {
            super();
            this.g = null;
            this.setAttribute("role", "tree");
            this.addEventListener("focusin", a=>{
                if (a = a.target.closest("ea-navigation-tree-item"))
                    this.g && (this.g.tabIndex = -1),
                    this.g = a,
                    this.g.tabIndex = 0
            }
            );
            this.addEventListener("keydown", a=>{
                a: if (0 !== this.h.length) {
                    var b = null;
                    switch (a.key) {
                    case "Home":
                        a.preventDefault();
                        b = this.h[0];
                        break;
                    case "End":
                        a.preventDefault();
                        b = tk(this, this.h[this.h.length - 1]);
                        break;
                    case "ArrowLeft":
                    case "ArrowRight":
                        a.preventDefault();
                        if (!this.g)
                            break a;
                        b: {
                            b = a.key;
                            var c = this.g;
                            if (c)
                                if (a = "rtl" === gk() ? "ArrowLeft" : "ArrowRight",
                                b === a)
                                    0 === c.expandedState && (c.expandedState = 1);
                                else if (1 === c.expandedState)
                                    1 === c.expandedState && (c.expandedState = 0);
                                else if (c.g) {
                                    b = c.g;
                                    break b
                                }
                            b = null
                        }
                        break;
                    case "ArrowDown":
                        a.preventDefault();
                        if (!this.g)
                            break a;
                        if (1 === this.g.expandedState && 0 < this.g.h.length)
                            b = this.g.h[0];
                        else if (b = sk(this.g),
                        !b)
                            for (a = this.g.g; a; ) {
                                if (c = sk(a)) {
                                    b = c;
                                    break
                                }
                                a = a.g
                            }
                        break;
                    case "ArrowUp":
                        a.preventDefault();
                        if (!this.g)
                            break a;
                        for (b = this.g.previousElementSibling; b && !pk(b); )
                            b = b.previousElementSibling;
                        b = b ? tk(this, b) : this.g.g
                    }
                    b?.focus()
                }
            }
            );
            this.addEventListener("click", a=>{
                (a = a.target.closest("ea-navigation-tree-item")) && rk(this, a)
            }
            )
        }
        static get M() {
            return J`
      :host {
        display: block;
      }
    `
        }
        i() {
            return F`<slot></slot>`
        }
        L(a) {
            super.L(a);
            if (0 !== this.h.length) {
                this.setAttribute("aria-setsize", `${this.h.length}`);
                a = null;
                for (const b of this.l)
                    if (b.tabIndex = -1,
                    1 === b.selectedState) {
                        a = b;
                        break
                    }
                a ? (rk(this, a),
                this.g = a) : this.g = this.l[0];
                this.g.tabIndex = 0
            }
        }
        get h() {
            return this.rf.assignedElements().filter(pk)
        }
    }
    ;
    t([O("slot"), A("design:type", HTMLSlotElement)], uk.prototype, "rf", void 0);
    uk = t([L("ea-navigation-tree"), A("design:paramtypes", [])], uk);
    var vk = class extends K {
        async load() {
            !this.rb && this.src && (this.rb = await (await fetch(this.src)).json())
        }
        g(a) {
            a = a.target;
            if (pk(a)) {
                if (a = a.text)
                    this.selected = a;
                this.eg.scrollTop = 0;
                this.strings && Kj(this.strings.MSG_CONTENT_CHANGED)
            }
        }
        i() {
            if (!this.rb)
                return F``;
            const a = Object.keys(this.rb);
            a.sort();
            const b = this.selected || a[0]
              , c = this.rb[b];
            return F`
      <ea-navigation-tree id="notices">
        ${Xj(a, d=>d, d=>F`
              <ea-navigation-tree-item
                  .selectedState=${b === d ? 1 : 0}
                  @click=${this.g}
                  .text=${d}>
              </ea-navigation-tree-item>
            `)}
      </ea-navigation-tree>
      <article id="content-container" tabindex="0">
        <div id="content">
          <h1>${b}</h1>
          <p id="body">${c.trim()}</p>
        </div>
      </article>
    `
        }
    }
    ;
    vk.cb = {
        ...K.cb,
        delegatesFocus: !0
    };
    vk.M = J`
    :host {
      background-color: var(--background-color);
      display: grid;
      grid-template-areas:
          "sidebar content";
      grid-template-columns: auto 1fr;
    }
    #body {
      font: ${Nj};
      margin-top: 36px;
      white-space: pre-line;
    }
    #content-container {
      background-color: var(--background-color);
      grid-area: content;
      margin-inline-start: 40px;
      overflow: auto;
      padding-bottom: 32px;
      padding-inline-end: 32px;
    }
    #content {
      color: var(--cros-text-color-primary);
      user-select: text;
      word-break: break-word;
    }
    ea-navigation-tree {
      background-color: var(--background-color);
      grid-area: sidebar;
      overflow-y: auto;
      padding-right: 8px;
      width: 160px;
    }
    h1 {
      font: ${Pj};
      margin: 0;
    }
    @media all and (min-width: 600px) {
      #content {
        max-width: 352px;
        min-width: 240px;
      }
    }
    @media all and (min-width: 768px) {
      #content {
        max-width: 352px;
        min-width: 352px;
      }
      ea-navigation-tree {
        width: 192px;
      }
    }
    @media all and (min-width: 960px) {
      #content {
        max-width: 448px;
        min-width: 448px;
      }
      #content-container {
        margin-inline-start: 64px;
      }
    }
  `;
    t([M({
        type: String
    }), A("design:type", String)], vk.prototype, "src", void 0);
    t([M({
        type: Object
    }), A("design:type", We)], vk.prototype, "strings", void 0);
    t([P(), A("design:type", Object)], vk.prototype, "rb", void 0);
    t([P(), A("design:type", String)], vk.prototype, "selected", void 0);
    t([O("#content-container"), A("design:type", HTMLElement)], vk.prototype, "eg", void 0);
    vk = t([L("ea-oss-notices")], vk);
    var wk = class extends K {
        L(a) {
            super.L(a);
            this.Ug.load()
        }
        i() {
            return F`
      <ea-oss-notices
        .strings=${D.OSS_NOTICES_STRINGS}
        src="notices.json"></ea-oss-notices>
    `
        }
    }
    ;
    wk.M = J`
    ea-oss-notices {
      background: white;
      height: 100vh;
      width: 100vw;
    }
  `;
    t([O("ea-oss-notices"), A("design:type", vk)], wk.prototype, "Ug", void 0);
    wk = t([L("calculator-licenses-popup")], wk);
    var xk = class extends K {
        constructor() {
            super(...arguments);
            this.disabled = !1;
            this.icon = "";
            this.kc = !1;
            this.g = new jj(()=>{
                this.kc = !0;
                return this.sf
            }
            )
        }
        focus() {
            const a = this.Qd;
            a && (this.g.qa(),
            a.focus())
        }
        blur() {
            const a = this.Qd;
            a && (this.g.ka(),
            a.blur())
        }
        i() {
            return F`<button
        class="mdc-icon-button mdc-icon-button--display-flex"
        aria-label="${this.ariaLabel || this.icon}"
        aria-haspopup="${this.ariaHasPopup ?? I}"
        ?disabled="${this.disabled}"
        @focus="${this.v}"
        @blur="${this.o}"
        @mousedown="${this.zb}"
        @mouseenter="${this.G}"
        @mouseleave="${this.I}"
        @touchstart="${this.eb}"
        @touchend="${this.h}"
        @touchcancel="${this.h}"
    >${this.kc ? F`
            <mwc-ripple
                .disabled="${this.disabled}"
                unbounded>
            </mwc-ripple>` : ""}
    ${this.icon ? F`<i class="material-icons">${this.icon}</i>` : ""}
    <span
      ><slot></slot
    ></span>
  </button>`
        }
        zb(a) {
            const b = ()=>{
                window.removeEventListener("mouseup", b);
                this.h()
            }
            ;
            window.addEventListener("mouseup", b);
            this.g.sa(a)
        }
        eb(a) {
            this.g.sa(a)
        }
        h() {
            this.g.ua()
        }
        G() {
            this.g.ra()
        }
        I() {
            this.g.Z()
        }
        v() {
            this.g.qa()
        }
        o() {
            this.g.ka()
        }
    }
    ;
    t([M({
        type: Boolean,
        A: !0
    }), A("design:type", Object)], xk.prototype, "disabled", void 0);
    t([M({
        type: String
    }), A("design:type", Object)], xk.prototype, "icon", void 0);
    t([Bi, M({
        type: String,
        H: "aria-label"
    }), A("design:type", String)], xk.prototype, "ariaLabel", void 0);
    t([Bi, M({
        type: String,
        H: "aria-haspopup"
    }), A("design:type", String)], xk.prototype, "ariaHasPopup", void 0);
    t([O("button"), A("design:type", HTMLElement)], xk.prototype, "Qd", void 0);
    t([wi(), A("design:type", Promise)], xk.prototype, "sf", void 0);
    t([P(), A("design:type", Object)], xk.prototype, "kc", void 0);
    t([ri(), A("design:type", Function), A("design:paramtypes", [Event]), A("design:returntype")], xk.prototype, "zb", null);
    t([ri(), A("design:type", Function), A("design:paramtypes", [Event]), A("design:returntype")], xk.prototype, "eb", null);
    var yk = J(['/**\n * @license\n * Copyright 2018 Google LLC\n * SPDX-License-Identifier: Apache-2.0\n */\n.material-icons {\n  font-family: var(--mdc-icon-font, "Material Icons");\n  font-weight: normal;\n  font-style: normal;\n  font-size: var(--mdc-icon-size, 24px);\n  line-height: 1;\n  letter-spacing: normal;\n  text-transform: none;\n  display: inline-block;\n  white-space: nowrap;\n  word-wrap: normal;\n  direction: ltr;\n  /* Support for all WebKit browsers. */\n  -webkit-font-smoothing: antialiased;\n  /* Support for Safari and Chrome. */\n  text-rendering: optimizeLegibility;\n  /* Support for Firefox. */\n  -moz-osx-font-smoothing: grayscale;\n  /* Support for IE. */\n  font-feature-settings: "liga";\n}\n\n/**\n * @license\n * Copyright 2021 Google LLC\n * SPDX-License-Identifier: Apache-2.0\n */\n/**\n * @license\n * Copyright 2018 Google LLC\n * SPDX-License-Identifier: Apache-2.0\n */\n.mdc-icon-button {\n  font-size: 24px;\n  width: 48px;\n  height: 48px;\n  padding: 12px;\n}\n.mdc-icon-button.mdc-icon-button--reduced-size .mdc-icon-button__ripple {\n  width: 40px;\n  height: 40px;\n  margin-top: 4px;\n  margin-bottom: 4px;\n  margin-right: 4px;\n  margin-left: 4px;\n}\n.mdc-icon-button.mdc-icon-button--reduced-size .mdc-icon-button__focus-ring {\n  max-height: 40px;\n  max-width: 40px;\n}\n.mdc-icon-button .mdc-icon-button__touch {\n  position: absolute;\n  top: 50%;\n  height: 48px;\n  /* @noflip */ /*rtl:ignore*/\n  left: 50%;\n  width: 48px;\n  /* @noflip */ /*rtl:ignore*/\n  transform: translate(-50%, -50%);\n}\n.mdc-icon-button:disabled {\n  color: rgba(0, 0, 0, 0.38);\n  /* @alternate */\n  color: var(--mdc-theme-text-disabled-on-light, rgba(0, 0, 0, 0.38));\n}\n.mdc-icon-button svg,\n.mdc-icon-button img {\n  width: 24px;\n  height: 24px;\n}\n\n.mdc-icon-button {\n  display: inline-block;\n  position: relative;\n  box-sizing: border-box;\n  border: none;\n  outline: none;\n  background-color: transparent;\n  fill: currentColor;\n  color: inherit;\n  text-decoration: none;\n  cursor: pointer;\n  user-select: none;\n  z-index: 0;\n  overflow: visible;\n}\n.mdc-icon-button .mdc-icon-button__touch {\n  position: absolute;\n  top: 50%;\n  height: 48px;\n  /* @noflip */ /*rtl:ignore*/\n  left: 50%;\n  width: 48px;\n  /* @noflip */ /*rtl:ignore*/\n  transform: translate(-50%, -50%);\n}\n@media screen and (forced-colors: active) {\n  .mdc-icon-button.mdc-ripple-upgraded--background-focused .mdc-icon-button__focus-ring, .mdc-icon-button:not(.mdc-ripple-upgraded):focus .mdc-icon-button__focus-ring {\n    display: block;\n  }\n}\n.mdc-icon-button:disabled {\n  cursor: default;\n  pointer-events: none;\n}\n.mdc-icon-button[hidden] {\n  display: none;\n}\n\n.mdc-icon-button--display-flex {\n  align-items: center;\n  display: inline-flex;\n  justify-content: center;\n}\n\n.mdc-icon-button__focus-ring {\n  pointer-events: none;\n  border: 2px solid transparent;\n  border-radius: 6px;\n  box-sizing: content-box;\n  position: absolute;\n  top: 50%;\n  /* @noflip */ /*rtl:ignore*/\n  left: 50%;\n  /* @noflip */ /*rtl:ignore*/\n  transform: translate(-50%, -50%);\n  height: 100%;\n  width: 100%;\n  display: none;\n}\n@media screen and (forced-colors: active) {\n  .mdc-icon-button__focus-ring {\n    border-color: CanvasText;\n  }\n}\n.mdc-icon-button__focus-ring::after {\n  content: "";\n  border: 2px solid transparent;\n  border-radius: 8px;\n  display: block;\n  position: absolute;\n  top: 50%;\n  /* @noflip */ /*rtl:ignore*/\n  left: 50%;\n  /* @noflip */ /*rtl:ignore*/\n  transform: translate(-50%, -50%);\n  height: calc(100% + 4px);\n  width: calc(100% + 4px);\n}\n@media screen and (forced-colors: active) {\n  .mdc-icon-button__focus-ring::after {\n    border-color: CanvasText;\n  }\n}\n\n.mdc-icon-button__icon {\n  display: inline-block;\n}\n.mdc-icon-button__icon.mdc-icon-button__icon--on {\n  display: none;\n}\n\n.mdc-icon-button--on .mdc-icon-button__icon {\n  display: none;\n}\n.mdc-icon-button--on .mdc-icon-button__icon.mdc-icon-button__icon--on {\n  display: inline-block;\n}\n\n.mdc-icon-button__link {\n  height: 100%;\n  left: 0;\n  outline: none;\n  position: absolute;\n  top: 0;\n  width: 100%;\n}\n\n.mdc-icon-button {\n  display: inline-block;\n  position: relative;\n  box-sizing: border-box;\n  border: none;\n  outline: none;\n  background-color: transparent;\n  fill: currentColor;\n  color: inherit;\n  text-decoration: none;\n  cursor: pointer;\n  user-select: none;\n  z-index: 0;\n  overflow: visible;\n}\n.mdc-icon-button .mdc-icon-button__touch {\n  position: absolute;\n  top: 50%;\n  height: 48px;\n  /* @noflip */ /*rtl:ignore*/\n  left: 50%;\n  width: 48px;\n  /* @noflip */ /*rtl:ignore*/\n  transform: translate(-50%, -50%);\n}\n@media screen and (forced-colors: active) {\n  .mdc-icon-button.mdc-ripple-upgraded--background-focused .mdc-icon-button__focus-ring, .mdc-icon-button:not(.mdc-ripple-upgraded):focus .mdc-icon-button__focus-ring {\n    display: block;\n  }\n}\n.mdc-icon-button:disabled {\n  cursor: default;\n  pointer-events: none;\n}\n.mdc-icon-button[hidden] {\n  display: none;\n}\n\n.mdc-icon-button--display-flex {\n  align-items: center;\n  display: inline-flex;\n  justify-content: center;\n}\n\n.mdc-icon-button__focus-ring {\n  pointer-events: none;\n  border: 2px solid transparent;\n  border-radius: 6px;\n  box-sizing: content-box;\n  position: absolute;\n  top: 50%;\n  /* @noflip */ /*rtl:ignore*/\n  left: 50%;\n  /* @noflip */ /*rtl:ignore*/\n  transform: translate(-50%, -50%);\n  height: 100%;\n  width: 100%;\n  display: none;\n}\n@media screen and (forced-colors: active) {\n  .mdc-icon-button__focus-ring {\n    border-color: CanvasText;\n  }\n}\n.mdc-icon-button__focus-ring::after {\n  content: "";\n  border: 2px solid transparent;\n  border-radius: 8px;\n  display: block;\n  position: absolute;\n  top: 50%;\n  /* @noflip */ /*rtl:ignore*/\n  left: 50%;\n  /* @noflip */ /*rtl:ignore*/\n  transform: translate(-50%, -50%);\n  height: calc(100% + 4px);\n  width: calc(100% + 4px);\n}\n@media screen and (forced-colors: active) {\n  .mdc-icon-button__focus-ring::after {\n    border-color: CanvasText;\n  }\n}\n\n.mdc-icon-button__icon {\n  display: inline-block;\n}\n.mdc-icon-button__icon.mdc-icon-button__icon--on {\n  display: none;\n}\n\n.mdc-icon-button--on .mdc-icon-button__icon {\n  display: none;\n}\n.mdc-icon-button--on .mdc-icon-button__icon.mdc-icon-button__icon--on {\n  display: inline-block;\n}\n\n.mdc-icon-button__link {\n  height: 100%;\n  left: 0;\n  outline: none;\n  position: absolute;\n  top: 0;\n  width: 100%;\n}\n\n:host {\n  display: inline-block;\n  outline: none;\n}\n\n:host([disabled]) {\n  pointer-events: none;\n}\n\n.mdc-icon-button i,\n.mdc-icon-button svg,\n.mdc-icon-button img,\n.mdc-icon-button ::slotted(*) {\n  display: block;\n}\n\n:host {\n  --mdc-ripple-color: currentcolor;\n  -webkit-tap-highlight-color: transparent;\n}\n\n:host,\n.mdc-icon-button {\n  /**\n   * Any vertical-align other than the default of "baseline" will work here (and\n   * "top" is the shortest).\n   *\n   * In general, when an inline-block element has vertical-align: baseline and\n   * also a fixed height, extra space may "appear" below it. This is because the\n   * baseline it is aligned to is not the very bottom of the line, it\'s the line\n   * above the "descenders" (e.g. the tail of a "y" or "j"). This means the\n   * container must grow to accomodate both the fixed height inline-element, and\n   * the descender height below it.\n   *\n   * For unknown reasons, in this particular case, this only causes incorrect\n   * alignment in IE.\n   *\n   * IE needs the vertical-align on both the button and the host element.\n   */\n  vertical-align: top;\n}\n\n.mdc-icon-button {\n  width: var(--mdc-icon-button-size, 48px);\n  height: var(--mdc-icon-button-size, 48px);\n  padding: calc((var(--mdc-icon-button-size, 48px) - var(--mdc-icon-size, 24px)) / 2);\n}\n.mdc-icon-button i,\n.mdc-icon-button svg,\n.mdc-icon-button img,\n.mdc-icon-button ::slotted(*) {\n  display: block;\n  width: var(--mdc-icon-size, 24px);\n  height: var(--mdc-icon-size, 24px);\n}\n']);
    var zk = class extends xk {
    }
    ;
    zk.M = [yk];
    zk = t([L("mwc-icon-button")], zk);
    var Ak = zk;
    const Bk = J`--ea-icon-button-color-override`;
    function Ck(a) {
        return "expandable" === a || "toggleable" === a
    }
    function Dk(a, b) {
        a = "expanded" === b ? a.V?.ariaExpanded : a.V?.ariaPressed;
        return "true" === a || "false" === a ? a : null
    }
    function Ek(a, b) {
        b && " " !== b.key && "Enter" !== b.key || (a.V?.classList.add("pressed"),
        a.g.sa())
    }
    function Fk(a, b) {
        b && " " !== b.key && "Enter" !== b.key || (a.g.ua(),
        a.V?.classList.remove("pressed"))
    }
    function Gk(a) {
        if (null === a.template)
            throw Error("<ea-icon-button> must be provided with a icon");
        a.l?.remove();
        a.l = document.importNode(a.template.content, !0).children[0];
        a.l.setAttribute("slot", "");
        a.appendChild(a.l)
    }
    function Hk(a) {
        a.V && ("expandable" === a.type ? (a.V.ariaExpanded = `${a.toggled}`,
        a.V.ariaHasPopup = "menu") : (a.V.ariaExpanded = null,
        a.V.ariaHasPopup = null),
        a.V.ariaPressed = "toggleable" === a.type ? `${a.toggled}` : null)
    }
    var Ik = class extends Ak {
        constructor() {
            super(...arguments);
            this.template = null;
            this.rtlFlip = !1;
            this.sizing = "dense";
            this.iconColor = this.type = "default";
            this.delegatesToggle = this.toggled = !1;
            this.innerRole = "";
            this.l = null;
            this.m = new MutationObserver(a=>{
                for (const b of a) {
                    if ("attributes" !== b.type)
                        continue;
                    a = b.attributeName;
                    if (null === a || a && !this.hasAttribute(a))
                        continue;
                    const c = this.getAttribute(a);
                    let d = null;
                    if ("aria-pressed" === a || "aria-expanded" === a) {
                        if ("true" === c || "false" === c)
                            d = c;
                        this.removeAttribute(a);
                        "aria-pressed" === a ? this.ariaPressed = d : this.ariaExpanded = d
                    }
                }
            }
            )
        }
        get ariaExpanded() {
            return "expandable" !== this.type ? null : Dk(this, "expanded")
        }
        set ariaExpanded(a) {
            "toggleable" !== this.type && this.V && (this.V.ariaExpanded = a,
            "expandable" === this.type && (this.toggled = "true" === a))
        }
        get ariaPressed() {
            return "toggleable" !== this.type ? null : Dk(this, "pressed")
        }
        set ariaPressed(a) {
            "toggleable" === this.type && this.V && (this.V.ariaPressed = a,
            this.toggled = "true" === a)
        }
        static get M() {
            const a = J`
      :host {
        --button-background-color-toggled: transparent;
        --button-focus-ring-color: transparent;
        --hover-ripple-color: ${ei};
        --icon-fill: var(${Bk}, ${Ch});
        --icon-fill-toggled: var(${Bk}, ${Ch});
        --ripple-color: ${di};
      }

      :host([type="expandable"]) {
        --button-background-color-toggled: ${Hh};
      }

      :host([type="toggleable"]) {
        --button-background-color-toggled: ${ai};
        --icon-fill-toggled: var(${Bk}, ${Eh});
        --ripple-color: ${$h};
      }

      :host(:is([iconcolor="primary"],[iconcolor="secondary"])) {
        --button-background-color-toggled: ${Hh};
        --ripple-color: ${di};
    }

      :host([iconcolor="primary"]) {
        --icon-fill: var(${Bk}, ${Ch});
        --icon-fill-toggled: var(${Bk}, ${Ch});
      }

      :host([iconcolor="secondary"]) {
        --icon-fill: var(${Bk}, ${Dh});
        --icon-fill-toggled: var(${Bk}, ${Dh});
      }

      :host([iconcolor="blue"]) {
        --button-background-color-toggled: ${Ih};
        --icon-fill: var(${Bk}, ${Eh});
        --icon-fill-toggled: var(${Bk}, ${Eh});
        --ripple-color: ${Jh};
      }

      :host([disabled]) {
        --button-background-color-toggled: transparent;
        --icon-fill: var(${Bk}, ${Ch});
        --icon-fill-toggled: var(${Bk}, ${Ch});
        --ripple-color: ${di};
      }

      :host {
        --mdc-ripple-color: var(--ripple-color);
        --mdc-ripple-focus-opacity: 0;
        --mdc-ripple-hover-opacity: var(--cros-icon-button-hover-ripple-opacity);
        --button-background-color: transparent;
        color: var(--ripple-color);
        flex: none;
        white-space: nowrap;
      }

      :host button {
        align-items: center;
        background-color: var(--button-background-color);
        border-radius: 50%;
        display: inline-flex;
        justify-content: center;
        outline: 2px solid var(--button-focus-ring-color);
      }

      button ::slotted(*) {
        transition-duration: ${200}ms;
        transition-property: transform;
      }

      button.pressed ::slotted(*) {
        transform: scale(0.8);
      }

      :host([sizing="dense"]) {
        --tap-target-size: ${48}px;
        --mdc-icon-button-size: ${36}px;
        --mdc-icon-size: 20px;
      }

      :host([sizing="touch"]) {
        --tap-target-size: 56px;
        --mdc-icon-button-size: 48px;
        --mdc-icon-size: 24px;
      }

      :host([disabled]) .extended-tap-target {
        opacity: ${fi};
      }

      :host button:where(.pressed, :active, [aria-pressed="true"], [aria-expanded="true"]) {
        --icon-fill: var(--icon-fill-toggled);
        background-color: var(--button-background-color-toggled);
      }

      :host(:is(:hover, .hover)) {
        /* In mwc-ripple focus overtakes hover opacity. */
        --mdc-ripple-focus-opacity: ${gi};
      }

      :host button[aria-pressed="false"]:hover {
        background-color: var(--hover-ripple-color);
      }

      :host(:not([type="toggleable"])) button:hover {
        background-color: var(--hover-ripple-color);
      }

      .extended-tap-target {
        height: var(--tap-target-size);
        width: var(--tap-target-size);
        display: grid;
        place-items: center;
      }

      .extended-tap-target > * {
        grid-area: 1/1/1/1;
      }

      ::slotted(svg) {
        pointer-events: none;
        fill: var(--icon-fill);
        stroke: var(--icon-fill);
        stroke-width: 0;
      }

      :host([dir="rtl"][rtlflip]) {
        transform: scaleX(-1);
      }

      button:not(.not-focus-visible):focus-visible {
        --button-focus-ring-color: ${Fh};
      }
    `;
            return [...Ak.M, a]
        }
        connectedCallback() {
            super.connectedCallback();
            this.m.observe(this, {
                childList: !1,
                attributes: !0,
                subtree: !1
            })
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            this.m.disconnect()
        }
        L(a) {
            super.L(a);
            qi(this);
            this.addEventListener("mousedown", ()=>void Ek(this));
            this.addEventListener("mouseup", ()=>void Fk(this));
            this.addEventListener("click", ()=>void this.ab());
            this.addEventListener("mouseleave", ()=>void Fk(this));
            this.addEventListener("keydown", b=>void Ek(this, b));
            this.addEventListener("keyup", b=>void Fk(this, b));
            this.addEventListener("blur", ()=>void Fk(this));
            this.addEventListener("blur", ()=>{
                this.V?.classList.remove("not-focus-visible")
            }
            );
            Gk(this);
            Hk(this)
        }
        xb(a) {
            a.has("disabled") && this.disabled && (this.g.ua(),
            this.g.Z());
            const b = Ck(this.type);
            this.Ma && a.has("toggled") && !b && (console.warn(`Button type is not stateful, setting toggled on ${this.localName} has no effect.`),
            this.toggled = !1);
            return super.xb(a)
        }
        ia(a) {
            super.ia(a);
            a.has("template") && Gk(this);
            (a.has("type") || a.has("toggled")) && Hk(this);
            a.has("innerRole") && this.V?.setAttribute("role", this.innerRole)
        }
        i() {
            this.setAttribute("dir", document.dir);
            return F`
      <div
          class="extended-tap-target"
          @mousedown=${this.zb}
          @touchstart=${this.eb}
          @touchend=${this.h}
          @touchcancel=${this.h}>
        ${super.i()}
      </div>
    `
        }
        zb(a) {
            a ? (a = a.composedPath()[0],
            a = a instanceof HTMLElement && (a.closest("button")?.classList.contains("mdc-icon-button") || !1)) : a = !1;
            a || this.V?.classList.add("not-focus-visible")
        }
        eb(a) {
            super.eb(a);
            Ek(this)
        }
        h() {
            super.h();
            this.g.ka();
            this.g.Z();
            Fk(this)
        }
        ab() {
            Ck(this.type) && !this.delegatesToggle && (this.toggled = !this.toggled)
        }
    }
    ;
    Ik.cb = {
        ...K.cb,
        delegatesFocus: !0
    };
    t([M({
        H: !1
    }), A("design:type", Object)], Ik.prototype, "template", void 0);
    t([M({
        type: Boolean,
        A: !0
    }), A("design:type", Object)], Ik.prototype, "rtlFlip", void 0);
    t([M({
        type: String,
        A: !0
    }), A("design:type", String)], Ik.prototype, "sizing", void 0);
    t([M({
        type: String,
        A: !0
    }), A("design:type", String)], Ik.prototype, "type", void 0);
    t([M({
        type: String,
        A: !0
    }), A("design:type", String)], Ik.prototype, "iconColor", void 0);
    t([M({
        type: Boolean,
        A: !0
    }), A("design:type", Object)], Ik.prototype, "toggled", void 0);
    t([M({
        type: Boolean
    }), A("design:type", Object)], Ik.prototype, "delegatesToggle", void 0);
    t([M({
        type: String
    }), A("design:type", Object)], Ik.prototype, "innerRole", void 0);
    t([M({
        type: String,
        H: "aria-expanded"
    }), A("design:type", Object), A("design:paramtypes", [Object])], Ik.prototype, "ariaExpanded", null);
    t([M({
        type: String,
        H: "aria-pressed"
    }), A("design:type", Object), A("design:paramtypes", [Object])], Ik.prototype, "ariaPressed", null);
    t([O(".extended-tap-target"), A("design:type", HTMLDivElement)], Ik.prototype, "Vi", void 0);
    t([O("button"), A("design:type", HTMLButtonElement)], Ik.prototype, "V", void 0);
    Ik = t([L("ea-icon-button")], Ik);
    var Jk = a=>(b,c)=>{
        if (!b.constructor.Ua) {
            b.constructor.Ua = new Map;
            const d = b.ia;
            b.ia = function(e) {
                d.call(this, e);
                e.forEach((f,g)=>{
                    const k = this.constructor.Ua.get(g);
                    void 0 !== k && k.call(this, this[g], f)
                }
                )
            }
        } else if (!b.constructor.hasOwnProperty("_observers")) {
            const d = b.constructor.Ua;
            b.constructor.Ua = new Map;
            d.forEach((e,f)=>b.constructor.Ua.set(f, e))
        }
        b.constructor.Ua.set(c, a)
    }
    ;
    function Kk(a, b, c) {
        const d = ()=>{
            window.removeEventListener(b, d);
            a.g.ua()
        }
        ;
        window.addEventListener(b, d);
        a.g.sa(c)
    }
    function Lk(a, b, c) {
        a.noninteractive || (b = new CustomEvent("request-selected",{
            bubbles: !0,
            composed: !0,
            detail: {
                source: c,
                selected: b
            }
        }),
        a.dispatchEvent(b))
    }
    var Mk = class extends K {
        constructor() {
            super(...arguments);
            this.value = "";
            this.group = null;
            this.tabindex = -1;
            this.activated = this.twoline = this.disabled = !1;
            this.graphic = null;
            this.lc = this.selected = this.noninteractive = this.hasMeta = this.multipleGraphics = !1;
            this.Ta = null;
            this.l = !0;
            this.m = !1;
            this.g = new jj(()=>{
                this.lc = !0;
                return this.tf
            }
            );
            this.h = [{
                target: this,
                La: ["click"],
                Ia: ()=>{
                    this.ab()
                }
            }, {
                target: this,
                La: ["mouseenter"],
                Ia: this.g.ra
            }, {
                target: this,
                La: ["mouseleave"],
                Ia: this.g.Z
            }, {
                target: this,
                La: ["focus"],
                Ia: this.g.qa
            }, {
                target: this,
                La: ["blur"],
                Ia: this.g.ka
            }, {
                target: this,
                La: ["mousedown", "touchstart"],
                Ia: a=>{
                    Kk(this, "mousedown" === a.type ? "mouseup" : "touchend", a)
                }
            }]
        }
        get text() {
            const a = this.textContent;
            return a ? a.trim() : ""
        }
        i() {
            const a = F`
      <span class="mdc-deprecated-list-item__text">
        ${this.twoline ? F`
      <span class="mdc-deprecated-list-item__primary-text">
        <slot></slot>
      </span>
      <span class="mdc-deprecated-list-item__secondary-text">
        <slot name="secondary"></slot>
      </span>
    ` : F`<slot></slot>`}
      </span>`
              , b = this.graphic ? F`
      <span class="mdc-deprecated-list-item__graphic material-icons ${zi({
                multi: this.multipleGraphics
            })}">
        <slot name="graphic"></slot>
      </span>` : F``;
            return F`
      ${this.lc ? F`
      <mwc-ripple
        .activated=${this.activated}>
      </mwc-ripple>` : this.activated ? F`<div class="fake-activated-ripple"></div>` : ""}
      ${b}
      ${a}
      ${this.hasMeta ? F`
      <span class="mdc-deprecated-list-item__meta material-icons">
        <slot name="meta"></slot>
      </span>` : F``}`
        }
        ab() {
            Lk(this, !this.selected, "interaction")
        }
        connectedCallback() {
            super.connectedCallback();
            this.noninteractive || this.setAttribute("mwc-list-item", "");
            for (const a of this.h)
                for (const b of a.La)
                    a.target.addEventListener(b, a.Ia, {
                        passive: !0
                    })
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            for (const a of this.h)
                for (const b of a.La)
                    a.target.removeEventListener(b, a.Ia);
            this.Ta && (this.Ta.ce ? this.Ta.ce(!0) : this.Ta.layout(!0))
        }
        L() {
            const a = new Event("list-item-rendered",{
                bubbles: !0,
                composed: !0
            });
            this.dispatchEvent(a)
        }
    }
    ;
    t([O("slot"), A("design:type", Object)], Mk.prototype, "fi", void 0);
    t([wi(), A("design:type", Promise)], Mk.prototype, "tf", void 0);
    t([M({
        type: String
    }), A("design:type", Object)], Mk.prototype, "value", void 0);
    t([M({
        type: String,
        A: !0
    }), A("design:type", Object)], Mk.prototype, "group", void 0);
    t([M({
        type: Number,
        A: !0
    }), A("design:type", Object)], Mk.prototype, "tabindex", void 0);
    t([M({
        type: Boolean,
        A: !0
    }), Jk(function(a) {
        a ? this.setAttribute("aria-disabled", "true") : this.setAttribute("aria-disabled", "false")
    }), A("design:type", Object)], Mk.prototype, "disabled", void 0);
    t([M({
        type: Boolean,
        A: !0
    }), A("design:type", Object)], Mk.prototype, "twoline", void 0);
    t([M({
        type: Boolean,
        A: !0
    }), A("design:type", Object)], Mk.prototype, "activated", void 0);
    t([M({
        type: String,
        A: !0
    }), A("design:type", Object)], Mk.prototype, "graphic", void 0);
    t([M({
        type: Boolean
    }), A("design:type", Object)], Mk.prototype, "multipleGraphics", void 0);
    t([M({
        type: Boolean
    }), A("design:type", Object)], Mk.prototype, "hasMeta", void 0);
    t([M({
        type: Boolean,
        A: !0
    }), Jk(function(a) {
        a ? (this.removeAttribute("aria-checked"),
        this.removeAttribute("mwc-list-item"),
        this.activated = this.selected = !1,
        this.tabIndex = -1) : this.setAttribute("mwc-list-item", "")
    }), A("design:type", Object)], Mk.prototype, "noninteractive", void 0);
    t([M({
        type: Boolean,
        A: !0
    }), Jk(function(a) {
        var b = this.getAttribute("role");
        (b = "gridcell" === b || "option" === b || "row" === b || "tab" === b) && a ? this.setAttribute("aria-selected", "true") : b && this.setAttribute("aria-selected", "false");
        this.l ? this.l = !1 : Lk(this, a, "property")
    }), A("design:type", Object)], Mk.prototype, "selected", void 0);
    t([P(), A("design:type", Object)], Mk.prototype, "lc", void 0);
    t([P(), A("design:type", Object)], Mk.prototype, "Ta", void 0);
    var Nk = class extends Mk {
    }
    ;
    Nk.M = [J([':host{cursor:pointer;user-select:none;-webkit-tap-highlight-color:rgba(0,0,0,0);height:48px;display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;padding-left:var(--mdc-list-side-padding, 16px);padding-right:var(--mdc-list-side-padding, 16px);outline:none;height:48px;color:rgba(0,0,0,.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87))}:host:focus{outline:none}:host([activated]){color:#6200ee;color:var(--mdc-theme-primary, #6200ee);--mdc-ripple-color: var( --mdc-theme-primary, #6200ee )}:host([activated]) .mdc-deprecated-list-item__graphic{color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}:host([activated]) .fake-activated-ripple::before{position:absolute;display:block;top:0;bottom:0;left:0;right:0;width:100%;height:100%;pointer-events:none;z-index:1;content:"";opacity:0.12;opacity:var(--mdc-ripple-activated-opacity, 0.12);background-color:#6200ee;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #6200ee))}.mdc-deprecated-list-item__graphic{flex-shrink:0;align-items:center;justify-content:center;fill:currentColor;display:inline-flex}.mdc-deprecated-list-item__graphic ::slotted(*){flex-shrink:0;align-items:center;justify-content:center;fill:currentColor;width:100%;height:100%;text-align:center}.mdc-deprecated-list-item__meta{width:var(--mdc-list-item-meta-size, 24px);height:var(--mdc-list-item-meta-size, 24px);margin-left:auto;margin-right:0;color:rgba(0, 0, 0, 0.38);color:var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.38))}.mdc-deprecated-list-item__meta.multi{width:auto}.mdc-deprecated-list-item__meta ::slotted(*){width:var(--mdc-list-item-meta-size, 24px);line-height:var(--mdc-list-item-meta-size, 24px)}.mdc-deprecated-list-item__meta ::slotted(.material-icons),.mdc-deprecated-list-item__meta ::slotted(mwc-icon){line-height:var(--mdc-list-item-meta-size, 24px) !important}.mdc-deprecated-list-item__meta ::slotted(:not(.material-icons):not(mwc-icon)){-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-caption-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.75rem;font-size:var(--mdc-typography-caption-font-size, 0.75rem);line-height:1.25rem;line-height:var(--mdc-typography-caption-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-caption-font-weight, 400);letter-spacing:0.0333333333em;letter-spacing:var(--mdc-typography-caption-letter-spacing, 0.0333333333em);text-decoration:inherit;text-decoration:var(--mdc-typography-caption-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-caption-text-transform, inherit)}[dir=rtl] .mdc-deprecated-list-item__meta,.mdc-deprecated-list-item__meta[dir=rtl]{margin-left:0;margin-right:auto}.mdc-deprecated-list-item__meta ::slotted(*){width:100%;height:100%}.mdc-deprecated-list-item__text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-deprecated-list-item__text ::slotted([for]),.mdc-deprecated-list-item__text[for]{pointer-events:none}.mdc-deprecated-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal;margin-bottom:-20px;display:block}.mdc-deprecated-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-deprecated-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-deprecated-list-item__secondary-text{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-body2-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-body2-font-size, 0.875rem);line-height:1.25rem;line-height:var(--mdc-typography-body2-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-body2-font-weight, 400);letter-spacing:0.0178571429em;letter-spacing:var(--mdc-typography-body2-letter-spacing, 0.0178571429em);text-decoration:inherit;text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body2-text-transform, inherit);text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal;display:block}.mdc-deprecated-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:"";vertical-align:0}.mdc-deprecated-list--dense .mdc-deprecated-list-item__secondary-text{font-size:inherit}* ::slotted(a),a{color:inherit;text-decoration:none}:host([twoline]){height:72px}:host([twoline]) .mdc-deprecated-list-item__text{align-self:flex-start}:host([disabled]),:host([noninteractive]){cursor:default;pointer-events:none}:host([disabled]) .mdc-deprecated-list-item__text ::slotted(*){opacity:.38}:host([disabled]) .mdc-deprecated-list-item__text ::slotted(*),:host([disabled]) .mdc-deprecated-list-item__primary-text ::slotted(*),:host([disabled]) .mdc-deprecated-list-item__secondary-text ::slotted(*){color:#000;color:var(--mdc-theme-on-surface, #000)}.mdc-deprecated-list-item__secondary-text ::slotted(*){color:rgba(0, 0, 0, 0.54);color:var(--mdc-theme-text-secondary-on-background, rgba(0, 0, 0, 0.54))}.mdc-deprecated-list-item__graphic ::slotted(*){background-color:transparent;color:rgba(0, 0, 0, 0.38);color:var(--mdc-theme-text-icon-on-background, rgba(0, 0, 0, 0.38))}.mdc-deprecated-list-group__subheader ::slotted(*){color:rgba(0, 0, 0, 0.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87))}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic{width:var(--mdc-list-item-graphic-size, 40px);height:var(--mdc-list-item-graphic-size, 40px)}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic.multi{width:auto}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic ::slotted(*){width:var(--mdc-list-item-graphic-size, 40px);line-height:var(--mdc-list-item-graphic-size, 40px)}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic ::slotted(.material-icons),:host([graphic=avatar]) .mdc-deprecated-list-item__graphic ::slotted(mwc-icon){line-height:var(--mdc-list-item-graphic-size, 40px) !important}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic ::slotted(*){border-radius:50%}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic,:host([graphic=medium]) .mdc-deprecated-list-item__graphic,:host([graphic=large]) .mdc-deprecated-list-item__graphic,:host([graphic=control]) .mdc-deprecated-list-item__graphic{margin-left:0;margin-right:var(--mdc-list-item-graphic-margin, 16px)}[dir=rtl] :host([graphic=avatar]) .mdc-deprecated-list-item__graphic,[dir=rtl] :host([graphic=medium]) .mdc-deprecated-list-item__graphic,[dir=rtl] :host([graphic=large]) .mdc-deprecated-list-item__graphic,[dir=rtl] :host([graphic=control]) .mdc-deprecated-list-item__graphic,:host([graphic=avatar]) .mdc-deprecated-list-item__graphic[dir=rtl],:host([graphic=medium]) .mdc-deprecated-list-item__graphic[dir=rtl],:host([graphic=large]) .mdc-deprecated-list-item__graphic[dir=rtl],:host([graphic=control]) .mdc-deprecated-list-item__graphic[dir=rtl]{margin-left:var(--mdc-list-item-graphic-margin, 16px);margin-right:0}:host([graphic=icon]) .mdc-deprecated-list-item__graphic{width:var(--mdc-list-item-graphic-size, 24px);height:var(--mdc-list-item-graphic-size, 24px);margin-left:0;margin-right:var(--mdc-list-item-graphic-margin, 32px)}:host([graphic=icon]) .mdc-deprecated-list-item__graphic.multi{width:auto}:host([graphic=icon]) .mdc-deprecated-list-item__graphic ::slotted(*){width:var(--mdc-list-item-graphic-size, 24px);line-height:var(--mdc-list-item-graphic-size, 24px)}:host([graphic=icon]) .mdc-deprecated-list-item__graphic ::slotted(.material-icons),:host([graphic=icon]) .mdc-deprecated-list-item__graphic ::slotted(mwc-icon){line-height:var(--mdc-list-item-graphic-size, 24px) !important}[dir=rtl] :host([graphic=icon]) .mdc-deprecated-list-item__graphic,:host([graphic=icon]) .mdc-deprecated-list-item__graphic[dir=rtl]{margin-left:var(--mdc-list-item-graphic-margin, 32px);margin-right:0}:host([graphic=avatar]:not([twoLine])),:host([graphic=icon]:not([twoLine])){height:56px}:host([graphic=medium]:not([twoLine])),:host([graphic=large]:not([twoLine])){height:72px}:host([graphic=medium]) .mdc-deprecated-list-item__graphic,:host([graphic=large]) .mdc-deprecated-list-item__graphic{width:var(--mdc-list-item-graphic-size, 56px);height:var(--mdc-list-item-graphic-size, 56px)}:host([graphic=medium]) .mdc-deprecated-list-item__graphic.multi,:host([graphic=large]) .mdc-deprecated-list-item__graphic.multi{width:auto}:host([graphic=medium]) .mdc-deprecated-list-item__graphic ::slotted(*),:host([graphic=large]) .mdc-deprecated-list-item__graphic ::slotted(*){width:var(--mdc-list-item-graphic-size, 56px);line-height:var(--mdc-list-item-graphic-size, 56px)}:host([graphic=medium]) .mdc-deprecated-list-item__graphic ::slotted(.material-icons),:host([graphic=medium]) .mdc-deprecated-list-item__graphic ::slotted(mwc-icon),:host([graphic=large]) .mdc-deprecated-list-item__graphic ::slotted(.material-icons),:host([graphic=large]) .mdc-deprecated-list-item__graphic ::slotted(mwc-icon){line-height:var(--mdc-list-item-graphic-size, 56px) !important}:host([graphic=large]){padding-left:0px}\n'])];
    Nk = t([L("mwc-list-item")], Nk);
    var Ok = class extends Nk {
        constructor() {
            super(...arguments);
            this.role = "menuitem"
        }
        static get M() {
            const a = J`
      .mdc-deprecated-list-item__meta {
        margin-left: 0;
        margin-right: 0;
        margin-inline-start: auto;
        margin-inline-end: 0;
        width: fit-content;
      }

      :host([graphic="icon"]) .mdc-deprecated-list-item__graphic {
        margin-inline-end: 16px;
      }

      :host([aria-expanded="true"]:not(:hover)) {
        background-color: ${bi};
      }

      :host([activated]:not([role="menuitem"])) {
        --mdc-theme-primary: transparent;
      }

      :host([activated]:hover),
      :host([activated]:focus) {
        --mdc-ripple-color: unset;
      }
    `;
            return [...Nk.M, a]
        }
    }
    ;
    t([M({
        A: !0,
        H: !0
    }), A("design:type", Object)], Ok.prototype, "role", void 0);
    Ok = t([L("ea-menu-list-item")], Ok);
    function Pk(a) {
        return a.da || a.anchor || null
    }
    ;/*

 Copyright 2021 Google Inc.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/
    function Qk(a, b, c) {
        const d = Rk(a, b).oe(b);
        d.push(c);
        return ()=>{
            d.splice(d.indexOf(c), 1)
        }
    }
    const Sk = new WeakMap;
    function Rk(a, b) {
        const c = new Map;
        Sk.has(a) || Sk.set(a, {
            isEnabled: !0,
            oe(q) {
                const p = c.get(q) || [];
                c.has(q) || c.set(q, p);
                return p
            },
            ye: new Set
        });
        const d = Sk.get(a);
        if (d.ye.has(b))
            return d;
        const e = Tk(a, b) || {
            configurable: !0,
            enumerable: !0,
            value: a[b],
            writable: !0
        }
          , f = {
            ...e
        };
        let {get: g, set: k} = e;
        if ("value"in e) {
            delete f.value;
            delete f.writable;
            let q = e.value;
            g = ()=>q;
            e.writable && (k = p=>{
                q = p
            }
            )
        }
        g && (f.get = function() {
            return g.call(this)
        }
        );
        k && (f.set = function(q) {
            const p = g ? g.call(this) : q;
            k.call(this, q);
            if (d.isEnabled && (!g || q !== p))
                for (const w of d.oe(b))
                    w(q, p)
        }
        );
        d.ye.add(b);
        Object.defineProperty(a, b, f);
        return d
    }
    function Tk(a, b) {
        let c;
        for (; a && !(c = Object.getOwnPropertyDescriptor(a, b)); )
            a = Object.getPrototypeOf(a);
        return c
    }
    ;function Uk(a, b, c) {
        const d = [];
        for (const f of Object.keys(c))
            d.push(Qk(b, f, c[f].bind(a)));
        const e = ()=>{
            for (const f of d)
                f();
            a.i.delete(e)
        }
        ;
        a.i.add(e)
    }
    var Vk = class extends Ei {
        constructor(a) {
            super(a);
            this.i = new Set
        }
        m() {
            super.m();
            for (const a of [...this.i])
                a()
        }
    }
    ;
    var Wk = class extends Vk {
        constructor(a) {
            super(a);
            this.h = this.h.bind(this)
        }
        init() {
            Uk(this, this.g.state, {
                disabled: this.j,
                processing: this.j
            })
        }
        h() {
            this.g.state.disabled || (this.g.state.selected = !this.g.state.selected)
        }
        j() {
            this.g.state.disabled && (this.g.state.processing = !1)
        }
    }
    ;
    const Xk = window.ShadyDOM?.inUse ?? !1;
    var Yk = class extends fj {
        constructor() {
            super(...arguments);
            this.disabled = !1;
            this.m = null;
            this.v = a=>{
                this.disabled || this.name && this.selected && a.formData.append(this.name, this.value)
            }
        }
        connectedCallback() {
            super.connectedCallback();
            a: {
                if (this.shadowRoot && !Xk) {
                    var a = this.getRootNode().querySelectorAll("form");
                    for (const b of Array.from(a))
                        if (b.contains(this)) {
                            a = b;
                            break a
                        }
                }
                a = null
            }
            this.m = a;
            this.m?.addEventListener("formdata", this.v)
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            this.m?.removeEventListener("formdata", this.v);
            this.m = null
        }
        click() {
            this.Fc && !this.disabled && (this.Fc.focus(),
            this.Fc.click())
        }
        L() {
            super.L();
            this.shadowRoot && this.K.addEventListener("change", a=>{
                this.dispatchEvent(new Event("change",a))
            }
            )
        }
    }
    ;
    t([M({
        type: Boolean
    }), A("design:type", Object)], Yk.prototype, "disabled", void 0);
    var Zk = class extends Yk {
        constructor() {
            super(...arguments);
            this.selected = this.processing = !1;
            this.ariaLabelledBy = this.ariaLabel = "";
            this.mc = !1;
            this.h = new jj(()=>{
                this.mc = !0;
                return this.uf
            }
            );
            this.name = "";
            this.value = "on";
            this.l = Wk
        }
        click() {
            this.disabled || (this.K?.focus(),
            this.K?.click())
        }
        i() {
            const a = this.ariaLabel ? this.ariaLabel : void 0
              , b = this.ariaLabelledBy ? this.ariaLabelledBy : void 0;
            return F`
      <button
        type="button"
        class="mdc-switch ${zi({
                "mdc-switch--processing": this.processing,
                "mdc-switch--selected": this.selected,
                "mdc-switch--unselected": !this.selected
            })}"
        role="switch"
        aria-checked="${this.selected}"
        aria-label="${a ?? I}"
        aria-labelledby="${b ?? I}"
        .disabled=${this.disabled}
        @click=${this.I}
        @focus="${this.N}"
        @blur="${this.G}"
        @pointerdown="${this.ve}"
        @pointerup="${this.U}"
        @pointerenter="${this.R}"
        @pointerleave="${this.S}"
      >
        <div class="mdc-switch__track"></div>
        <div class="mdc-switch__handle-track">
          ${F`
      <div class="mdc-switch__handle">
        ${F`
      <div class="mdc-switch__shadow">
        <div class="mdc-elevation-overlay"></div>
      </div>
    `}
        ${this.mc ? F`
        <div class="mdc-switch__ripple">
          <mwc-ripple
            internalUseStateLayerCustomProperties
            .disabled="${this.disabled}"
            unbounded>
          </mwc-ripple>
        </div>
      ` : F``}
        <div class="mdc-switch__icons">
          ${F`
      <svg class="mdc-switch__icon mdc-switch__icon--on" viewBox="0 0 24 24">
        <path d="M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z" />
      </svg>
    `}
          ${F`
      <svg class="mdc-switch__icon mdc-switch__icon--off" viewBox="0 0 24 24">
        <path d="M20 13H4v-2h16v2z" />
      </svg>
    `}
        </div>
      </div>
    `}
        </div>
      </button>

      <input
        type="checkbox"
        aria-hidden="true"
        name="${this.name}"
        .checked=${this.selected}
        .value=${this.value}
      >
    `
        }
        I() {
            this.g?.h()
        }
        N() {
            this.h.qa()
        }
        G() {
            this.h.ka()
        }
        ve(a) {
            a.target.setPointerCapture(a.pointerId);
            this.h.sa(a)
        }
        U() {
            this.h.ua()
        }
        R() {
            this.h.ra()
        }
        S() {
            this.h.Z()
        }
        o() {
            return {
                state: this
            }
        }
    }
    ;
    t([M({
        type: Boolean
    }), A("design:type", Object)], Zk.prototype, "processing", void 0);
    t([M({
        type: Boolean
    }), A("design:type", Object)], Zk.prototype, "selected", void 0);
    t([Bi, M({
        type: String,
        H: "aria-label"
    }), A("design:type", Object)], Zk.prototype, "ariaLabel", void 0);
    t([Bi, M({
        type: String,
        H: "aria-labelledby"
    }), A("design:type", Object)], Zk.prototype, "ariaLabelledBy", void 0);
    t([wi(), A("design:type", Promise)], Zk.prototype, "uf", void 0);
    t([P(), A("design:type", Object)], Zk.prototype, "mc", void 0);
    t([M({
        type: String,
        A: !0
    }), A("design:type", Object)], Zk.prototype, "name", void 0);
    t([M({
        type: String
    }), A("design:type", Object)], Zk.prototype, "value", void 0);
    t([O("input"), A("design:type", HTMLElement)], Zk.prototype, "Fc", void 0);
    t([O(".mdc-switch"), A("design:type", HTMLElement)], Zk.prototype, "K", void 0);
    t([ri(), A("design:type", Function), A("design:paramtypes", [PointerEvent]), A("design:returntype")], Zk.prototype, "ve", null);
    var $k = class extends Zk {
    }
    ;
    $k.M = [J(['.mdc-switch{align-items:center;background:none;border:none;cursor:pointer;display:inline-flex;flex-shrink:0;margin:0;outline:none;overflow:visible;padding:0;position:relative}.mdc-switch[hidden]{display:none}.mdc-switch:disabled{cursor:default;pointer-events:none}.mdc-switch__track{overflow:hidden;position:relative;width:100%}.mdc-switch__track::before,.mdc-switch__track::after{border:1px solid rgba(0,0,0,0);border-radius:inherit;box-sizing:border-box;content:"";height:100%;left:0;position:absolute;width:100%}@media screen and (forced-colors: active){.mdc-switch__track::before,.mdc-switch__track::after{border-color:currentColor}}.mdc-switch__track::before{transition:transform 75ms 0ms cubic-bezier(0, 0, 0.2, 1);transform:translateX(0)}.mdc-switch__track::after{transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.6, 1);transform:translateX(-100%)}[dir=rtl] .mdc-switch__track::after,.mdc-switch__track[dir=rtl]::after{transform:translateX(100%)}.mdc-switch--selected .mdc-switch__track::before{transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.6, 1);transform:translateX(100%)}[dir=rtl] .mdc-switch--selected .mdc-switch__track::before,.mdc-switch--selected .mdc-switch__track[dir=rtl]::before{transform:translateX(-100%)}.mdc-switch--selected .mdc-switch__track::after{transition:transform 75ms 0ms cubic-bezier(0, 0, 0.2, 1);transform:translateX(0)}.mdc-switch__handle-track{height:100%;pointer-events:none;position:absolute;top:0;transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);left:0;right:auto;transform:translateX(0)}[dir=rtl] .mdc-switch__handle-track,.mdc-switch__handle-track[dir=rtl]{left:auto;right:0}.mdc-switch--selected .mdc-switch__handle-track{transform:translateX(100%)}[dir=rtl] .mdc-switch--selected .mdc-switch__handle-track,.mdc-switch--selected .mdc-switch__handle-track[dir=rtl]{transform:translateX(-100%)}.mdc-switch__handle{display:flex;pointer-events:auto;position:absolute;top:50%;transform:translateY(-50%);left:0;right:auto}[dir=rtl] .mdc-switch__handle,.mdc-switch__handle[dir=rtl]{left:auto;right:0}.mdc-switch__handle::before,.mdc-switch__handle::after{border:1px solid rgba(0,0,0,0);border-radius:inherit;box-sizing:border-box;content:"";width:100%;height:100%;left:0;position:absolute;top:0;transition:background-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1),border-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);z-index:-1}@media screen and (forced-colors: active){.mdc-switch__handle::before,.mdc-switch__handle::after{border-color:currentColor}}.mdc-switch__shadow{border-radius:inherit;bottom:0;left:0;position:absolute;right:0;top:0}.mdc-elevation-overlay{bottom:0;left:0;right:0;top:0}.mdc-switch__ripple{left:50%;position:absolute;top:50%;transform:translate(-50%, -50%);z-index:-1}.mdc-switch:disabled .mdc-switch__ripple{display:none}.mdc-switch__icons{height:100%;position:relative;width:100%;z-index:1}.mdc-switch__icon{bottom:0;left:0;margin:auto;position:absolute;right:0;top:0;opacity:0;transition:opacity 30ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-switch--selected .mdc-switch__icon--on,.mdc-switch--unselected .mdc-switch__icon--off{opacity:1;transition:opacity 45ms 30ms cubic-bezier(0, 0, 0.2, 1)}:host{display:inline-flex;outline:none}input{display:none}.mdc-switch{width:36px;width:var(--mdc-switch-track-width, 36px)}.mdc-switch.mdc-switch--selected:enabled .mdc-switch__handle::after{background:#6200ee;background:var(--mdc-switch-selected-handle-color, var(--mdc-theme-primary, #6200ee))}.mdc-switch.mdc-switch--selected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after{background:#310077;background:var(--mdc-switch-selected-hover-handle-color, #310077)}.mdc-switch.mdc-switch--selected:enabled:focus:not(:active) .mdc-switch__handle::after{background:#310077;background:var(--mdc-switch-selected-focus-handle-color, #310077)}.mdc-switch.mdc-switch--selected:enabled:active .mdc-switch__handle::after{background:#310077;background:var(--mdc-switch-selected-pressed-handle-color, #310077)}.mdc-switch.mdc-switch--selected:disabled .mdc-switch__handle::after{background:#424242;background:var(--mdc-switch-disabled-selected-handle-color, #424242)}.mdc-switch.mdc-switch--unselected:enabled .mdc-switch__handle::after{background:#616161;background:var(--mdc-switch-unselected-handle-color, #616161)}.mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after{background:#212121;background:var(--mdc-switch-unselected-hover-handle-color, #212121)}.mdc-switch.mdc-switch--unselected:enabled:focus:not(:active) .mdc-switch__handle::after{background:#212121;background:var(--mdc-switch-unselected-focus-handle-color, #212121)}.mdc-switch.mdc-switch--unselected:enabled:active .mdc-switch__handle::after{background:#212121;background:var(--mdc-switch-unselected-pressed-handle-color, #212121)}.mdc-switch.mdc-switch--unselected:disabled .mdc-switch__handle::after{background:#424242;background:var(--mdc-switch-disabled-unselected-handle-color, #424242)}.mdc-switch .mdc-switch__handle::before{background:#fff;background:var(--mdc-switch-handle-surface-color, var(--mdc-theme-surface, #fff))}.mdc-switch:enabled .mdc-switch__shadow{box-shadow:0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);box-shadow:var(--mdc-switch-handle-elevation, 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12))}.mdc-switch:disabled .mdc-switch__shadow{box-shadow:0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);box-shadow:var(--mdc-switch-disabled-handle-elevation, 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12))}.mdc-switch .mdc-switch__focus-ring-wrapper,.mdc-switch .mdc-switch__handle{height:20px;height:var(--mdc-switch-handle-height, 20px)}.mdc-switch:disabled .mdc-switch__handle::after{opacity:0.38;opacity:var(--mdc-switch-disabled-handle-opacity, 0.38)}.mdc-switch .mdc-switch__handle{border-radius:10px;border-radius:var(--mdc-switch-handle-shape, 10px)}.mdc-switch .mdc-switch__handle{width:20px;width:var(--mdc-switch-handle-width, 20px)}.mdc-switch .mdc-switch__handle-track{width:calc(100% - 20px);width:calc(100% - var(--mdc-switch-handle-width, 20px))}.mdc-switch.mdc-switch--selected:enabled .mdc-switch__icon{fill:#fff;fill:var(--mdc-switch-selected-icon-color, var(--mdc-theme-on-primary, #fff))}.mdc-switch.mdc-switch--selected:disabled .mdc-switch__icon{fill:#fff;fill:var(--mdc-switch-disabled-selected-icon-color, var(--mdc-theme-on-primary, #fff))}.mdc-switch.mdc-switch--unselected:enabled .mdc-switch__icon{fill:#fff;fill:var(--mdc-switch-unselected-icon-color, var(--mdc-theme-on-primary, #fff))}.mdc-switch.mdc-switch--unselected:disabled .mdc-switch__icon{fill:#fff;fill:var(--mdc-switch-disabled-unselected-icon-color, var(--mdc-theme-on-primary, #fff))}.mdc-switch.mdc-switch--selected:disabled .mdc-switch__icons{opacity:0.38;opacity:var(--mdc-switch-disabled-selected-icon-opacity, 0.38)}.mdc-switch.mdc-switch--unselected:disabled .mdc-switch__icons{opacity:0.38;opacity:var(--mdc-switch-disabled-unselected-icon-opacity, 0.38)}.mdc-switch.mdc-switch--selected .mdc-switch__icon{width:18px;width:var(--mdc-switch-selected-icon-size, 18px);height:18px;height:var(--mdc-switch-selected-icon-size, 18px)}.mdc-switch.mdc-switch--unselected .mdc-switch__icon{width:18px;width:var(--mdc-switch-unselected-icon-size, 18px);height:18px;height:var(--mdc-switch-unselected-icon-size, 18px)}.mdc-switch .mdc-switch__ripple{height:48px;height:var(--mdc-switch-state-layer-size, 48px);width:48px;width:var(--mdc-switch-state-layer-size, 48px)}.mdc-switch .mdc-switch__track{height:14px;height:var(--mdc-switch-track-height, 14px)}.mdc-switch:disabled .mdc-switch__track{opacity:0.12;opacity:var(--mdc-switch-disabled-track-opacity, 0.12)}.mdc-switch:enabled .mdc-switch__track::after{background:#d7bbff;background:var(--mdc-switch-selected-track-color, #d7bbff)}.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::after{background:#d7bbff;background:var(--mdc-switch-selected-hover-track-color, #d7bbff)}.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::after{background:#d7bbff;background:var(--mdc-switch-selected-focus-track-color, #d7bbff)}.mdc-switch:enabled:active .mdc-switch__track::after{background:#d7bbff;background:var(--mdc-switch-selected-pressed-track-color, #d7bbff)}.mdc-switch:disabled .mdc-switch__track::after{background:#424242;background:var(--mdc-switch-disabled-selected-track-color, #424242)}.mdc-switch:enabled .mdc-switch__track::before{background:#e0e0e0;background:var(--mdc-switch-unselected-track-color, #e0e0e0)}.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::before{background:#e0e0e0;background:var(--mdc-switch-unselected-hover-track-color, #e0e0e0)}.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::before{background:#e0e0e0;background:var(--mdc-switch-unselected-focus-track-color, #e0e0e0)}.mdc-switch:enabled:active .mdc-switch__track::before{background:#e0e0e0;background:var(--mdc-switch-unselected-pressed-track-color, #e0e0e0)}.mdc-switch:disabled .mdc-switch__track::before{background:#424242;background:var(--mdc-switch-disabled-unselected-track-color, #424242)}.mdc-switch .mdc-switch__track{border-radius:7px;border-radius:var(--mdc-switch-track-shape, 7px)}.mdc-switch.mdc-switch--selected{--mdc-ripple-focus-state-layer-color:var(--mdc-switch-selected-focus-state-layer-color, var(--mdc-theme-primary, #6200ee));--mdc-ripple-focus-state-layer-opacity:var(--mdc-switch-selected-focus-state-layer-opacity, 0.12);--mdc-ripple-hover-state-layer-color:var(--mdc-switch-selected-hover-state-layer-color, var(--mdc-theme-primary, #6200ee));--mdc-ripple-hover-state-layer-opacity:var(--mdc-switch-selected-hover-state-layer-opacity, 0.04);--mdc-ripple-pressed-state-layer-color:var(--mdc-switch-selected-pressed-state-layer-color, var(--mdc-theme-primary, #6200ee));--mdc-ripple-pressed-state-layer-opacity:var(--mdc-switch-selected-pressed-state-layer-opacity, 0.1)}.mdc-switch.mdc-switch--selected:enabled:focus:not(:active){--mdc-ripple-hover-state-layer-color:var(--mdc-switch-selected-focus-state-layer-color, var(--mdc-theme-primary, #6200ee))}.mdc-switch.mdc-switch--selected:enabled:active{--mdc-ripple-hover-state-layer-color:var(--mdc-switch-selected-pressed-state-layer-color, var(--mdc-theme-primary, #6200ee))}.mdc-switch.mdc-switch--unselected{--mdc-ripple-focus-state-layer-color:var(--mdc-switch-unselected-focus-state-layer-color, #424242);--mdc-ripple-focus-state-layer-opacity:var(--mdc-switch-unselected-focus-state-layer-opacity, 0.12);--mdc-ripple-hover-state-layer-color:var(--mdc-switch-unselected-hover-state-layer-color, #424242);--mdc-ripple-hover-state-layer-opacity:var(--mdc-switch-unselected-hover-state-layer-opacity, 0.04);--mdc-ripple-pressed-state-layer-color:var(--mdc-switch-unselected-pressed-state-layer-color, #424242);--mdc-ripple-pressed-state-layer-opacity:var(--mdc-switch-unselected-pressed-state-layer-opacity, 0.1)}.mdc-switch.mdc-switch--unselected:enabled:focus:not(:active){--mdc-ripple-hover-state-layer-color:var(--mdc-switch-unselected-focus-state-layer-color, #424242)}.mdc-switch.mdc-switch--unselected:enabled:active{--mdc-ripple-hover-state-layer-color:var(--mdc-switch-unselected-pressed-state-layer-color, #424242)}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-switch:disabled .mdc-switch__handle::after{opacity:1;opacity:var(--mdc-switch-disabled-handle-opacity, 1)}.mdc-switch.mdc-switch--selected:enabled .mdc-switch__icon{fill:ButtonText;fill:var(--mdc-switch-selected-icon-color, ButtonText)}.mdc-switch.mdc-switch--selected:disabled .mdc-switch__icon{fill:GrayText;fill:var(--mdc-switch-disabled-selected-icon-color, GrayText)}.mdc-switch.mdc-switch--unselected:enabled .mdc-switch__icon{fill:ButtonText;fill:var(--mdc-switch-unselected-icon-color, ButtonText)}.mdc-switch.mdc-switch--unselected:disabled .mdc-switch__icon{fill:GrayText;fill:var(--mdc-switch-disabled-unselected-icon-color, GrayText)}.mdc-switch.mdc-switch--selected:disabled .mdc-switch__icons{opacity:1;opacity:var(--mdc-switch-disabled-selected-icon-opacity, 1)}.mdc-switch.mdc-switch--unselected:disabled .mdc-switch__icons{opacity:1;opacity:var(--mdc-switch-disabled-unselected-icon-opacity, 1)}.mdc-switch:disabled .mdc-switch__track{opacity:1;opacity:var(--mdc-switch-disabled-track-opacity, 1)}}\n'])];
    $k = t([L("mwc-switch")], $k);
    var al = $k;
    var bl = class extends al {
        static get M() {
            const a = J`
      :host {
        --mdc-switch-handle-elevation: 0 1px 2px 0 var(--cros-shadow-color-key);
        --mdc-switch-handle-height: 16px;
        --mdc-switch-handle-width: 16px;
        --mdc-switch-selected-focus-handle-color: var(--cros-switch-knob-color-active);
        --mdc-switch-selected-focus-state-layer-color: var(--cros-switch-knob-color-active);
        --mdc-switch-selected-focus-state-layer-opacity: 0.24;
        --mdc-switch-selected-focus-track-color: var(--cros-switch-track-color-active);
        --mdc-switch-selected-handle-color: var(--cros-switch-knob-color-active);
        --mdc-switch-selected-hover-handle-color: var(--cros-switch-knob-color-active);
        --mdc-switch-selected-hover-state-layer-color: var(--cros-switch-knob-color-active);
        --mdc-switch-selected-hover-state-layer-opacity: 0.24;
        --mdc-switch-selected-hover-track-color: var(--cros-switch-track-color-active);
        --mdc-switch-selected-icon-size: 0;
        --mdc-switch-selected-pressed-handle-color: var(--cros-switch-knob-color-active);
        --mdc-switch-selected-pressed-state-layer-color: var(--cros-switch-knob-color-active);
        --mdc-switch-selected-pressed-state-layer-opacity: 0.24;
        --mdc-switch-selected-pressed-track-color: var(--cros-switch-track-color-active);
        --mdc-switch-selected-track-color: var(--cros-switch-track-color-active);
        --mdc-switch-state-layer-size: 35px;
        --mdc-switch-track-height: 12px;
        --mdc-switch-track-width: 32px;
        --mdc-switch-unselected-focus-handle-color: var(--cros-switch-knob-color-inactive);
        --mdc-switch-unselected-focus-state-layer-color: var(--cros-switch-knob-color-active);
        --mdc-switch-unselected-focus-state-layer-opacity: 0.24;
        --mdc-switch-unselected-focus-track-color: var(--cros-switch-track-color-inactive);
        --mdc-switch-unselected-handle-color: var(--cros-switch-knob-color-inactive);
        --mdc-switch-unselected-hover-handle-color: var(--cros-switch-knob-color-inactive);
        --mdc-switch-unselected-hover-state-layer-color: var(--cros-switch-knob-color-active);
        --mdc-switch-unselected-hover-state-layer-opacity: 0.24;
        --mdc-switch-unselected-hover-track-color: var(--cros-switch-track-color-inactive);
        --mdc-switch-unselected-icon-size: 0;
        --mdc-switch-unselected-pressed-handle-color: var(--cros-switch-knob-color-inactive);
        --mdc-switch-unselected-pressed-state-layer-color: var(--cros-switch-knob-color-active);
        --mdc-switch-unselected-pressed-state-layer-opacity: 0.24;
        --mdc-switch-unselected-pressed-track-color: var(--cros-switch-track-color-inactive);
        --mdc-switch-unselected-track-color: var(--cros-switch-track-color-inactive);
      }
    `;
            return [...al.M, a]
        }
    }
    ;
    bl = t([L("ea-switch")], bl);
    let cl;
    var dl;
    if (void 0 === cl) {
        var el = document.createElement("template");
        kk(el, '<svg data-id="ic_checked" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">\n<path d="M13.7071 7.29289C13.3166 6.90237 12.6834 6.90237 12.2929 7.29289L9 10.5858L7.70711 9.29289C7.31658 8.90237 6.68342 8.90237 6.29289 9.29289C5.90237 9.68342 5.90237 10.3166 6.29289 10.7071L8.29289 12.7071C8.68342 13.0976 9.31658 13.0976 9.70711 12.7071L13.7071 8.70711C14.0976 8.31658 14.0976 7.68342 13.7071 7.29289Z"></path>\n<path clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM10 16C13.3137 16 16 13.3137 16 10C16 6.68629 13.3137 4 10 4C6.68629 4 4 6.68629 4 10C4 13.3137 6.68629 16 10 16Z" fill-rule="evenodd"></path>\n</svg>\n');
        cl = el
    }
    dl = cl;
    function fl(a, b, c, d) {
        this.left = a;
        this.top = b;
        this.width = c;
        this.height = d
    }
    m = fl.prototype;
    m.clone = function() {
        return new fl(this.left,this.top,this.width,this.height)
    }
    ;
    m.contains = function(a) {
        return a instanceof Ub ? a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height : this.left <= a.left && this.left + this.width >= a.left + a.width && this.top <= a.top && this.top + this.height >= a.top + a.height
    }
    ;
    m.distance = function(a) {
        var b = a.x < this.left ? this.left - a.x : Math.max(a.x - (this.left + this.width), 0);
        a = a.y < this.top ? this.top - a.y : Math.max(a.y - (this.top + this.height), 0);
        return Math.sqrt(b * b + a * a)
    }
    ;
    m.ceil = function() {
        this.left = Math.ceil(this.left);
        this.top = Math.ceil(this.top);
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    }
    ;
    m.floor = function() {
        this.left = Math.floor(this.left);
        this.top = Math.floor(this.top);
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    }
    ;
    m.round = function() {
        this.left = Math.round(this.left);
        this.top = Math.round(this.top);
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    }
    ;
    m.scale = function(a, b) {
        b = "number" === typeof b ? b : a;
        this.left *= a;
        this.width *= a;
        this.top *= b;
        this.height *= b;
        return this
    }
    ;
    /*

 Copyright 2020 Google Inc.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/
    const gl = new Set;
    gl.add("Backspace");
    gl.add("Enter");
    gl.add("Spacebar");
    gl.add("PageUp");
    gl.add("PageDown");
    gl.add("End");
    gl.add("Home");
    gl.add("ArrowLeft");
    gl.add("ArrowUp");
    gl.add("ArrowRight");
    gl.add("ArrowDown");
    gl.add("Delete");
    gl.add("Escape");
    gl.add("Tab");
    const hl = new Map;
    hl.set(8, "Backspace");
    hl.set(13, "Enter");
    hl.set(32, "Spacebar");
    hl.set(33, "PageUp");
    hl.set(34, "PageDown");
    hl.set(35, "End");
    hl.set(36, "Home");
    hl.set(37, "ArrowLeft");
    hl.set(38, "ArrowUp");
    hl.set(39, "ArrowRight");
    hl.set(40, "ArrowDown");
    hl.set(46, "Delete");
    hl.set(27, "Escape");
    hl.set(9, "Tab");
    const il = new Set;
    il.add("PageUp");
    il.add("PageDown");
    il.add("End");
    il.add("Home");
    il.add("ArrowLeft");
    il.add("ArrowUp");
    il.add("ArrowRight");
    il.add("ArrowDown");
    function jl(a) {
        const b = a.key;
        return gl.has(b) ? b : (a = hl.get(a.keyCode)) ? a : "Unknown"
    }
    ;var kl = {
        ["mdc-list-item--activated"]: "mdc-deprecated-list-item--activated",
        ["mdc-list-item"]: "mdc-deprecated-list-item",
        ["mdc-list-item--disabled"]: "mdc-deprecated-list-item--disabled",
        ["mdc-list-item--selected"]: "mdc-deprecated-list-item--selected",
        ["mdc-list-item__text"]: "mdc-deprecated-list-item__text",
        ["mdc-list-item__primary-text"]: "mdc-deprecated-list-item__primary-text",
        ["mdc-list"]: "mdc-deprecated-list"
    }
      , ll = {
        uh: "MDCList:action",
        Ci: "MDCList:selectionChange",
        xh: "aria-checked",
        yh: '[role="checkbox"][aria-checked="true"]',
        zh: '[role="radio"][aria-checked="true"]',
        Md: "aria-current",
        Ah: "aria-disabled",
        Eh: "aria-orientation",
        Fh: "horizontal",
        Gh: '[role="checkbox"]',
        hf: "aria-selected",
        Ch: '[role="listbox"], [role="menu"]',
        Dh: '[aria-multiselectable="true"]',
        Lh: 'input[type="checkbox"], input[type="radio"]',
        jf: 'input[type="checkbox"]',
        Mh: `
    .${"mdc-list-item"} button:not(:disabled),
    .${"mdc-list-item"} a,
    .${kl["mdc-list-item"]} button:not(:disabled),
    .${kl["mdc-list-item"]} a
  `,
        Sh: ".mdc-deprecated-list",
        bi: `
    .${"mdc-list-item"} button:not(:disabled),
    .${"mdc-list-item"} a,
    .${"mdc-list-item"} input[type="radio"]:not(:disabled),
    .${"mdc-list-item"} input[type="checkbox"]:not(:disabled),
    .${kl["mdc-list-item"]} button:not(:disabled),
    .${kl["mdc-list-item"]} a,
    .${kl["mdc-list-item"]} input[type="radio"]:not(:disabled),
    .${kl["mdc-list-item"]} input[type="checkbox"]:not(:disabled)
  `,
        yi: 'input[type="radio"]',
        Bi: '[aria-selected="true"], [aria-current="true"]'
    }
      , ml = {
        ea: -1,
        Ji: 300
    };
    const nl = (a,b)=>a - b
      , ol = ["input", "button", "textarea", "select"];
    function pl(a) {
        return a instanceof Set
    }
    var ql = a=>{
        a = a === ml.ea ? new Set : a;
        return pl(a) ? new Set(a) : new Set([a])
    }
    ;
    function rl(a, b) {
        a.j = b;
        const c = a.h;
        b ? pl(c) || (a.h = c === ml.ea ? new Set : new Set([c])) : pl(c) && (a.h = c.size ? Array.from(c).sort(nl)[0] : ml.ea)
    }
    function sl(a, b) {
        if (b instanceof Set) {
            if (!a.j)
                throw Error("MDCListFoundation: Array of index is only supported for checkbox based list");
            if (0 === b.size)
                return !0;
            let c = !1;
            for (const d of b)
                if (c = tl(a, d))
                    break;
            return c
        }
        if ("number" === typeof b) {
            if (a.j)
                throw Error("MDCListFoundation: Expected array of index for checkbox based list but got number: " + b);
            return b === ml.ea || tl(a, b)
        }
        return !1
    }
    function ul(a, b, c=!0) {
        var d = Array.from(ql(a.h))
          , e = Array.from(b);
        const f = {
            xc: [],
            za: []
        };
        d = d.sort(nl);
        e = e.sort(nl);
        let g = 0
          , k = 0;
        for (; g < d.length || k < e.length; ) {
            const q = d[g]
              , p = e[k];
            q === p ? (g++,
            k++) : void 0 !== q && (void 0 === p || q < p) ? (f.za.push(q),
            g++) : void 0 !== p && (void 0 === q || p < q) && (f.xc.push(p),
            k++)
        }
        if (f.za.length || f.xc.length) {
            for (const q of f.za)
                c && a.g.wb(q, !1),
                a.l && a.g.vb(q, !1);
            for (const q of f.xc)
                c && a.g.wb(q, !0),
                a.l && a.g.vb(q, !0);
            a.h = b;
            a.g.Za(b, f)
        }
    }
    function vl(a, b, c=!0) {
        if (a.h !== b) {
            a.h !== ml.ea && (a.g.wb(a.h, !1),
            a.l && a.g.vb(a.h, !1));
            c && a.g.wb(b, !0);
            a.l && a.g.vb(b, !0);
            a.h === ml.ea && (a.o = a.g.he(b, ll.Md));
            const d = (c = null !== a.o) ? ll.Md : ll.hf;
            a.h !== ml.ea && a.g.od(a.h, d, "false");
            a.g.od(b, d, c ? a.o : "true");
            a.h = b;
            a.g.Za(b)
        }
    }
    function wl(a, b) {
        sl(a, b) && (a.j ? ul(a, ql(b)) : vl(a, b))
    }
    function xl(a, b) {
        0 <= b && a.g.bb(b, -1);
        setTimeout(()=>{
            if (!a.g.ze()) {
                let c = 0;
                "number" === typeof a.h && a.h !== ml.ea ? c = a.h : pl(a.h) && 0 < a.h.size && (c = Math.min(...a.h));
                yl(a, c)
            }
        }
        , 0)
    }
    function zl(a) {
        const b = a.g.lb() - 1;
        a.g.la(b);
        return b
    }
    function Al(a) {
        a.g.la(0);
        return 0
    }
    function Bl(a) {
        -1 === ol.indexOf(`${a.target.tagName}`.toLowerCase()) && a.preventDefault()
    }
    function Cl(a, b, c, d) {
        if (!a.g.le(b)) {
            var e = b;
            a.j && (e = new Set([b]));
            sl(a, e) && (a.j ? Dl(a, b, d, c) : c || d ? vl(a, b, c) : a.h === b && vl(a, ml.ea),
            c && a.g.He(b))
        }
    }
    function yl(a, b) {
        a.i === ml.ea && 0 !== b ? a.g.bb(0, -1) : 0 <= a.i && a.i !== b && a.g.bb(a.i, -1);
        a.g.bb(b, 0)
    }
    function tl(a, b) {
        a = a.g.lb();
        return 0 <= b && b < a
    }
    function Dl(a, b, c, d=!0) {
        const e = ql(a.h);
        (void 0 === c ? !a.g.re(b) : c) ? e.add(b) : e.delete(b);
        ul(a, e, d)
    }
    var El = class extends Ei {
        static get strings() {
            return ll
        }
        static get h() {
            return ml
        }
        static get i() {
            return {
                la: ()=>{}
                ,
                ne: ()=>0,
                lb: ()=>0,
                ze: ()=>!1,
                Ce: ()=>!1,
                He: ()=>{}
                ,
                Za: ()=>{}
                ,
                re: ()=>!1,
                jh: ()=>{}
                ,
                le: ()=>!1,
                wb: ()=>{}
                ,
                vb: ()=>{}
                ,
                bb: ()=>{}
                ,
                od: ()=>{}
                ,
                he: ()=>null
            }
        }
        constructor(a) {
            super({
                ...El.i,
                ...a
            });
            this.F = this.j = !1;
            this.i = this.h = ml.ea;
            this.l = !1;
            this.o = null
        }
    }
    ;
    var Fl = {
        Ud: "mdc-menu-item--selected",
        ni: "mdc-menu__selection-group",
        Ra: "mdc-menu"
    }
      , Gl = {
        Ld: "aria-checked",
        Bh: "aria-disabled",
        jf: 'input[type="checkbox"]',
        ki: ".mdc-list,.mdc-deprecated-list",
        Ai: "MDCMenu:selected",
        Bf: "data-menu-item-skip-restore-focus"
    }
      , Hl = {
        di: -1
    }
      , Il = {
        NONE: 0,
        ji: 1,
        Zh: 2,
        ii: 3,
        0: "NONE",
        1: "LIST_ROOT",
        2: "FIRST_ITEM",
        3: "LAST_ITEM"
    };
    var Jl = class extends Ei {
        static get g() {
            return Fl
        }
        static get strings() {
            return Gl
        }
        static get h() {
            return Hl
        }
        static get i() {
            return {
                Zd: ()=>{}
                ,
                Te: ()=>{}
                ,
                Yd: ()=>{}
                ,
                Se: ()=>{}
                ,
                ie: ()=>null,
                mg: ()=>!1,
                Jb: ()=>{}
                ,
                me: ()=>-1,
                Za: ()=>{}
                ,
                Hc: ()=>0,
                la: ()=>{}
                ,
                fe: ()=>{}
                ,
                qe: ()=>-1,
                Oc: ()=>!1
            }
        }
        constructor(a) {
            super({
                ...Jl.i,
                ...a
            });
            this.h = 1
        }
        m() {
            this.g.Jb()
        }
    }
    ;
    function Kl(a) {
        let b;
        return function(c=!0) {
            clearTimeout(b);
            b = setTimeout(()=>{
                a(c)
            }
            , 50)
        }
    }
    function Ll() {
        const a = this.v;
        this.I = new Promise(b=>this.v = b);
        a()
    }
    function Ml(a) {
        var b = a.assignedElements();
        const c = [];
        for (const e of b)
            e.hasAttribute("mwc-list-item") && (c.push(e),
            e.Ta = a),
            e.hasAttribute("divider") && !e.hasAttribute("role") && e.setAttribute("role", "separator");
        a.G = c;
        const d = new Set;
        a.G.forEach((e,f)=>{
            a.itemRoles ? e.setAttribute("role", a.itemRoles) : e.removeAttribute("role");
            e.selected && d.add(f)
        }
        );
        a.multi ? a.g && wl(a.g, d) : (b = d.size ? d.entries().next().value[1] : -1,
        a.g && wl(a.g, b));
        b = new Event("items-updated",{
            bubbles: !0,
            composed: !0
        });
        a.dispatchEvent(b)
    }
    function Nl(a, b) {
        a = a.h;
        b = b.composedPath();
        for (const c of b)
            if (b = -1,
            c.nodeType === Node.ELEMENT_NODE && c.hasAttribute("mwc-list-item") && (b = a.indexOf(c)),
            -1 !== b)
                return b;
        return -1
    }
    var Ol = class extends fj {
        constructor() {
            super();
            this.N = null;
            this.l = El;
            this.wrapFocus = this.multi = this.activatable = !1;
            this.innerAriaLabel = this.innerRole = this.itemRoles = null;
            this.rootTabbable = !1;
            this.m = null;
            this.noninteractive = !1;
            this.v = ()=>{}
            ;
            this.I = Promise.resolve([]);
            this.G = [];
            const a = Kl(this.layout.bind(this));
            this.ce = (b=!0)=>{
                Ll.call(this);
                a(b)
            }
        }
        async nb() {
            const a = await super.nb();
            await this.I;
            return a
        }
        get h() {
            return this.G
        }
        assignedElements() {
            return this.zc && this.zc.length ? this.zc : this.K ? Array.from(this.K?.getElementsByTagName("mwc-list-item")) : []
        }
        get selected() {
            const a = this.index;
            if (!pl(a))
                return -1 === a ? null : this.h[a];
            const b = [];
            for (const c of a)
                b.push(this.h[c]);
            return b
        }
        get index() {
            return this.g ? this.g.h : -1
        }
        i() {
            var a = this.rootTabbable ? "0" : "-1"
              , b = (null === this.innerRole ? void 0 : this.innerRole) ?? I
              , c = (null === this.innerAriaLabel ? void 0 : this.innerAriaLabel) ?? I
              , d = this.Da
              , e = this.S
              , f = this.U
              , g = this.va
              , k = this.ca;
            const q = this.assignedElements();
            return F`
      <!-- @ts-ignore -->
      <ul
          tabindex=${a}
          role="${b}"
          aria-label="${c}"
          class="mdc-deprecated-list"
          @keydown=${d}
          @focusin=${e}
          @focusout=${f}
          @request-selected=${g}
          @list-item-rendered=${k}>
        <slot></slot>
        ${void 0 !== this.emptyMessage && 0 === q.length ? F`
        <mwc-list-item noninteractive>${this.emptyMessage}</mwc-list-item>
      ` : null}
      </ul>
    `
        }
        L() {
            super.L();
            this.h.length || (rl(this.g, this.multi),
            this.layout())
        }
        S(a) {
            this.g && this.K && (a = Nl(this, a),
            0 <= a && this.g.g.bb(a, 0))
        }
        U(a) {
            this.g && this.K && (a = Nl(this, a),
            xl(this.g, a))
        }
        Da(a) {
            if (this.g && this.K) {
                const f = Nl(this, a);
                a: {
                    var b = this.g
                      , c = a.target.hasAttribute("mwc-list-item");
                    jl(a);
                    const g = "ArrowUp" === jl(a);
                    jl(a);
                    const k = "ArrowDown" === jl(a)
                      , q = "Home" === jl(a)
                      , p = "End" === jl(a)
                      , w = "Enter" === jl(a)
                      , u = "Spacebar" === jl(a);
                    if (b.g.Ce())
                        if (g || p)
                            a.preventDefault(),
                            zl(b);
                        else {
                            if (k || q)
                                a.preventDefault(),
                                Al(b)
                        }
                    else {
                        var d = b.g.ne();
                        if (-1 === d && (d = f,
                        0 > d))
                            break a;
                        if (k)
                            b: {
                                Bl(a),
                                a = d + 1;
                                if (a >= b.g.lb())
                                    if (b.F)
                                        a = 0;
                                    else {
                                        var e = d;
                                        break b
                                    }
                                b.g.la(a);
                                e = a
                            }
                        else if (g)
                            b: {
                                Bl(a),
                                a = d - 1;
                                if (0 > a)
                                    if (b.F)
                                        a = b.g.lb() - 1;
                                    else {
                                        e = d;
                                        break b
                                    }
                                b.g.la(a);
                                e = a
                            }
                        else if (q)
                            Bl(a),
                            e = Al(b);
                        else if (p)
                            Bl(a),
                            e = zl(b);
                        else if ((w || u) && c) {
                            if ((c = a.target) && "A" === c.tagName && w)
                                break a;
                            Bl(a);
                            Cl(b, d, !0)
                        }
                        b.i = d;
                        void 0 !== e && (yl(b, e),
                        b.i = e)
                    }
                }
            }
        }
        va(a) {
            if (this.g) {
                var b = Nl(this, a);
                if (-1 === b && (this.layout(),
                b = Nl(this, a),
                -1 === b))
                    return;
                if (!this.h[b].disabled) {
                    var c = this.g;
                    b !== ml.ea && (Cl(c, b, "interaction" === a.detail.source, a.detail.selected),
                    yl(c, b),
                    c.i = b);
                    a.stopPropagation()
                }
            }
        }
        o() {
            return this.N = {
                lb: ()=>this.K ? this.h.length : 0,
                ne: this.R,
                he: (a,b)=>this.K ? (a = this.h[a]) ? a.getAttribute(b) : "" : "",
                od: (a,b,c)=>{
                    this.K && (a = this.h[a]) && gc(a, b, c)
                }
                ,
                la: a=>{
                    (a = this.h[a]) && a.focus()
                }
                ,
                bb: (a,b)=>{
                    if (a = this.h[a])
                        a.tabindex = b
                }
                ,
                He: a=>{
                    const b = {
                        bubbles: !0,
                        composed: !0
                    };
                    b.detail = {
                        index: a
                    };
                    a = new CustomEvent("action",b);
                    this.dispatchEvent(a)
                }
                ,
                Za: (a,b)=>{
                    const c = {
                        bubbles: !0,
                        composed: !0
                    };
                    c.detail = {
                        index: a,
                        Si: b
                    };
                    a = new CustomEvent("selected",c);
                    this.dispatchEvent(a)
                }
                ,
                ze: ()=>ej(this),
                Ce: ()=>{
                    const a = this.K;
                    return a.getRootNode().activeElement === a
                }
                ,
                jh: (a,b)=>{
                    if (a = this.h[a])
                        a.disabled = b
                }
                ,
                le: a=>(a = this.h[a]) ? a.disabled : !1,
                wb: (a,b)=>{
                    if (a = this.h[a])
                        a.selected = b
                }
                ,
                re: a=>(a = this.h[a]) ? a.selected : !1,
                vb: (a,b)=>{
                    if (a = this.h[a])
                        a.activated = b
                }
            }
        }
        ca(a) {
            this.layout(-1 === this.h.indexOf(a.target))
        }
        layout(a=!0) {
            a && Ml(this);
            a = this.h[0];
            for (const b of this.h)
                b.tabindex = -1;
            a && (this.noninteractive ? this.m || (this.m = a) : a.tabindex = 0);
            this.v()
        }
        R() {
            if (!this.K || !this.h.length)
                return -1;
            const a = dj();
            if (!a.length)
                return -1;
            for (let b = a.length - 1; 0 <= b; b--) {
                const c = a[b];
                if (c.hasAttribute("mwc-list-item"))
                    return this.h.indexOf(c)
            }
            return -1
        }
        la(a) {
            for (const b of this.h)
                if (0 === b.tabindex) {
                    b.tabindex = -1;
                    break
                }
            this.h[a].tabindex = 0;
            this.h[a].focus()
        }
        focus() {
            const a = this.K;
            a && a.focus()
        }
        blur() {
            const a = this.K;
            a && a.blur()
        }
    }
    ;
    t([M({
        type: String
    }), A("design:type", Object)], Ol.prototype, "emptyMessage", void 0);
    t([O(".mdc-deprecated-list"), A("design:type", HTMLElement)], Ol.prototype, "K", void 0);
    t([vi({
        flatten: !0,
        ac: "*"
    }), A("design:type", Object)], Ol.prototype, "zc", void 0);
    t([vi({
        flatten: !0,
        ac: '[tabindex="0"]'
    }), A("design:type", Object)], Ol.prototype, "nh", void 0);
    t([M({
        type: Boolean
    }), Jk(function(a) {
        this.g && (this.g.l = a)
    }), A("design:type", Object)], Ol.prototype, "activatable", void 0);
    t([M({
        type: Boolean
    }), Jk(function(a, b) {
        this.g && rl(this.g, a);
        void 0 !== b && this.layout()
    }), A("design:type", Object)], Ol.prototype, "multi", void 0);
    t([M({
        type: Boolean
    }), Jk(function(a) {
        this.g && (this.g.F = a)
    }), A("design:type", Object)], Ol.prototype, "wrapFocus", void 0);
    t([M({
        type: String
    }), Jk(function(a, b) {
        void 0 !== b && Ml(this)
    }), A("design:type", Object)], Ol.prototype, "itemRoles", void 0);
    t([M({
        type: String
    }), A("design:type", Object)], Ol.prototype, "innerRole", void 0);
    t([M({
        type: String
    }), A("design:type", Object)], Ol.prototype, "innerAriaLabel", void 0);
    t([M({
        type: Boolean
    }), A("design:type", Object)], Ol.prototype, "rootTabbable", void 0);
    t([M({
        type: Boolean,
        A: !0
    }), Jk(function(a) {
        a ? (this.m = a = this.nh?.[0] ?? null) && a.setAttribute("tabindex", "-1") : !a && this.m && (this.m.setAttribute("tabindex", "0"),
        this.m = null)
    }), A("design:type", Object)], Ol.prototype, "noninteractive", void 0);
    var Pl = class extends Ol {
    }
    ;
    Pl.M = [J(['@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}:host{display:block}.mdc-deprecated-list{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);line-height:1.75rem;line-height:var(--mdc-typography-subtitle1-line-height, 1.75rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);line-height:1.5rem;margin:0;padding:8px 0;list-style-type:none;color:rgba(0, 0, 0, 0.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87));padding:var(--mdc-list-vertical-padding, 8px) 0}.mdc-deprecated-list:focus{outline:none}.mdc-deprecated-list-item{height:48px}.mdc-deprecated-list--dense{padding-top:4px;padding-bottom:4px;font-size:.812rem}.mdc-deprecated-list ::slotted([divider]){height:0;margin:0;border:none;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:rgba(0, 0, 0, 0.12)}.mdc-deprecated-list ::slotted([divider][padded]){margin:0 var(--mdc-list-side-padding, 16px)}.mdc-deprecated-list ::slotted([divider][inset]){margin-left:var(--mdc-list-inset-margin, 72px);margin-right:0;width:calc(100% - var(--mdc-list-inset-margin, 72px))}[dir=rtl] .mdc-deprecated-list ::slotted([divider][inset]),.mdc-deprecated-list ::slotted([divider][inset][dir=rtl]){margin-left:0;margin-right:var(--mdc-list-inset-margin, 72px)}.mdc-deprecated-list ::slotted([divider][inset][padded]){width:calc(100% - var(--mdc-list-inset-margin, 72px) - var(--mdc-list-side-padding, 16px))}.mdc-deprecated-list--dense ::slotted([mwc-list-item]){height:40px}.mdc-deprecated-list--dense ::slotted([mwc-list]){--mdc-list-item-graphic-size: 20px}.mdc-deprecated-list--two-line.mdc-deprecated-list--dense ::slotted([mwc-list-item]),.mdc-deprecated-list--avatar-list.mdc-deprecated-list--dense ::slotted([mwc-list-item]){height:60px}.mdc-deprecated-list--avatar-list.mdc-deprecated-list--dense ::slotted([mwc-list]){--mdc-list-item-graphic-size: 36px}:host([noninteractive]){pointer-events:none;cursor:default}.mdc-deprecated-list--dense ::slotted(.mdc-deprecated-list-item__primary-text){display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-deprecated-list--dense ::slotted(.mdc-deprecated-list-item__primary-text)::before{display:inline-block;width:0;height:24px;content:"";vertical-align:0}.mdc-deprecated-list--dense ::slotted(.mdc-deprecated-list-item__primary-text)::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}\n'])];
    Pl = t([L("mwc-list")], Pl);
    var Ql = {
        wh: "mdc-menu-surface--anchor",
        Jd: "mdc-menu-surface--animating-closed",
        Kd: "mdc-menu-surface--animating-open",
        ai: "mdc-menu-surface--fixed",
        hc: "mdc-menu-surface--is-open-below",
        OPEN: "mdc-menu-surface--open",
        Ra: "mdc-menu-surface"
    }
      , Rl = {
        Oh: "MDCMenuSurface:closed",
        Ph: "MDCMenuSurface:closing",
        ti: "MDCMenuSurface:opened",
        ui: "MDCMenuSurface:opening",
        ci: 'button:not(:disabled), [href]:not([aria-disabled="true"]), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"]):not([aria-disabled="true"])'
    }
      , Sl = {
        Ff: 120,
        Ef: 75,
        Td: 32,
        gf: .67,
        Df: 30
    };
    function Tl(a, b) {
        a.h.top = b.top || 0;
        a.h.right = b.right || 0;
        a.h.bottom = b.bottom || 0;
        a.h.left = b.left || 0
    }
    function Ul(a) {
        var b = a.g.ge()
          , c = a.g.je()
          , d = a.g.se()
          , e = a.g.ue();
        b || (b = {
            top: a.position.y,
            right: a.position.x,
            bottom: a.position.y,
            left: a.position.x,
            width: 0,
            height: 0
        });
        a.i = {
            Ga: b,
            Wf: c,
            cf: a.I,
            Hd: {
                top: b.top,
                right: d.width - b.right,
                bottom: d.height - b.bottom,
                left: b.left
            },
            qh: d,
            rh: e
        };
        b = a.U;
        var f = a.i.Hd
          , g = a.i.Ga;
        c = a.i.cf;
        e = Vl.h.Td;
        a.j & 1 ? (d = f.top - e + a.h.bottom,
        e = f.bottom - e - a.h.bottom) : (d = f.top - e + a.h.top,
        e = f.bottom - e + g.height - a.h.top);
        !(0 < e - c.height) && d > e && (b |= 1);
        d = a.g.De();
        var k = !!(a.j & 8);
        e = !!(a.j & 4) || !!(b & 4);
        k = d && k ? !e : e;
        if (k) {
            var q = f.left + g.width + a.h.left;
            f = f.right - a.h.left
        } else
            q = f.left + a.h.left,
            f = f.right + g.width - a.h.left;
        g = 0 < q - c.width;
        c = 0 < f - c.width;
        const p = !!(b & 8) && !!(b & 4);
        if (c && p && d || !g && p)
            b ^= 4;
        else if (g && k && d || g && !k && e || !c && q >= f)
            b |= 4;
        0 < a.v ? c = a.v : (d = a.i.Hd,
        c = !!(a.j & 1),
        e = Vl.h.Td,
        b & 1 ? (d = d.top + a.h.top - e,
        c || (d += a.i.Ga.height)) : (d = d.bottom - a.h.bottom + a.i.Ga.height - e,
        c && (d -= a.i.Ga.height)),
        c = d);
        d = b & 1 ? "bottom" : "top";
        e = b & 4 ? "right" : "left";
        f = a.i.Ga;
        g = !!(a.j & 4);
        b & 4 ? (f = g ? f.width - a.h.left : a.h.right,
        f = a.N || a.o ? f - (a.i.qh.width - a.i.Wf.width) : f) : f = g ? f.width - a.h.right : a.h.left;
        g = a.i.Ga;
        k = !!(a.j & 1);
        f = {
            [e]: f,
            [d]: b & 1 ? k ? g.height - a.h.top : -a.h.bottom : k ? g.height + a.h.bottom : a.h.top
        };
        a.i.Ga.width / a.i.cf.width > Sl.gf && (e = "center");
        if (a.N || a.o) {
            g = a.i.rh;
            k = a.i.Hd;
            q = Object.keys(f);
            for (const w of q)
                q = f[w] || 0,
                q += k[w],
                a.o || (q = "top" === w ? q + g.y : "bottom" === w ? q - g.y : "left" === w ? q + g.x : q - g.x),
                f[w] = q
        }
        a.g.af(`${e} ${d}`);
        a.g.setPosition(f);
        a.g.rd(c ? c + "px" : "");
        b & 1 || a.g.ga(Vl.g.hc)
    }
    function Wl(a) {
        const b = a.g.Ae()
          , c = (a.g.pe ? a.g.pe() : document).activeElement && !1;
        (b || c) && setTimeout(()=>{
            a.g.Ue()
        }
        , Sl.Df)
    }
    var Vl = class extends Ei {
        static get g() {
            return Ql
        }
        static get strings() {
            return Rl
        }
        static get h() {
            return Sl
        }
        static get i() {
            return {
                ga: ()=>{}
                ,
                Y: ()=>{}
                ,
                Jc: ()=>!1,
                rg: ()=>!1,
                vg: ()=>!1,
                Ae: ()=>!1,
                De: ()=>!1,
                Pb: ()=>({
                    height: 0,
                    width: 0
                }),
                ge: ()=>null,
                se: ()=>({
                    height: 0,
                    width: 0
                }),
                je: ()=>({
                    height: 0,
                    width: 0
                }),
                ue: ()=>({
                    x: 0,
                    y: 0
                }),
                setPosition: ()=>{}
                ,
                rd: ()=>{}
                ,
                af: ()=>{}
                ,
                Ve: ()=>{}
                ,
                Ue: ()=>{}
                ,
                Sc: ()=>{}
                ,
                Ie: ()=>{}
                ,
                Tc: ()=>{}
                ,
                Je: ()=>{}
                ,
                kd: ()=>{}
                ,
                Ac: ()=>{}
            }
        }
        constructor(a) {
            super({
                ...Vl.i,
                ...a
            });
            this.o = this.N = this.R = this.l = !1;
            this.ca = this.G = this.S = this.v = 0;
            this.U = this.j = 8;
            this.h = {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            };
            this.position = {
                x: 0,
                y: 0
            }
        }
        init() {
            const a = Vl.g.Ra
              , b = Vl.g.OPEN;
            if (!this.g.Jc(a))
                throw Error(`${a} class required in root element.`);
            this.g.Jc(b) && (this.l = !0);
            this.F = this.va.bind(this);
            this.g.kd("resize", this.F)
        }
        m() {
            clearTimeout(this.S);
            clearTimeout(this.G);
            cancelAnimationFrame(this.ca);
            this.g.Ac("resize", this.F)
        }
        rd(a) {
            this.v = a
        }
        open() {
            this.l || (this.g.Je(),
            this.g.Ve(),
            this.R ? (this.l = !0,
            this.g.ga(Vl.g.OPEN),
            this.I = this.g.Pb(),
            Ul(this),
            this.g.Tc()) : (this.g.ga(Vl.g.Kd),
            this.ca = requestAnimationFrame(()=>{
                this.I = this.g.Pb();
                Ul(this);
                this.g.ga(Vl.g.OPEN);
                this.S = setTimeout(()=>{
                    this.S = 0;
                    this.g.Y(Vl.g.Kd);
                    this.g.Tc()
                }
                , Sl.Ff)
            }
            ),
            this.l = !0),
            this.g.kd("resize", this.F))
        }
        close(a=!1) {
            this.l && (this.g.Ie(),
            this.g.Ac("resize", this.F),
            this.R ? (this.l = !1,
            a || Wl(this),
            this.g.Y(Vl.g.OPEN),
            this.g.Y(Vl.g.hc),
            this.g.Sc()) : (this.g.ga(Vl.g.Jd),
            requestAnimationFrame(()=>{
                this.g.Y(Vl.g.OPEN);
                this.g.Y(Vl.g.hc);
                this.G = setTimeout(()=>{
                    this.G = 0;
                    this.g.Y(Vl.g.Jd);
                    this.g.Sc()
                }
                , Sl.Ef)
            }
            ),
            this.l = !1,
            a || Wl(this)))
        }
        va() {
            this.I = this.g.Pb();
            Ul(this)
        }
        isFinite(a) {
            return "number" === typeof a && isFinite(a)
        }
    }
    ;
    const Xl = {
        TOP_LEFT: 0,
        TOP_RIGHT: 4,
        BOTTOM_LEFT: 1,
        BOTTOM_RIGHT: 5,
        TOP_START: 8,
        TOP_END: 12,
        BOTTOM_START: 9,
        BOTTOM_END: 13
    };
    var S = class extends fj {
        constructor() {
            super(...arguments);
            this.l = Vl;
            this.fixed = this.fullwidth = this.absolute = !1;
            this.y = this.x = null;
            this.stayOpenOnBodyClick = this.open = this.quick = !1;
            this.Hb = 8;
            this.v = null;
            this.menuCorner = "START";
            this.corner = "TOP_START";
            this.yd = this.cc = this.ud = this.wd = this.vd = this.xd = "";
            this.h = this.anchor = null;
            this.m = ()=>{}
        }
        i() {
            const a = {
                top: this.xd,
                left: this.vd,
                right: this.wd,
                bottom: this.ud,
                "max-height": this.cc,
                "transform-origin": this.yd
            };
            return F`
      <div
          class=${zi({
                "mdc-menu-surface": !0,
                "mdc-menu-surface--fixed": this.fixed,
                "mdc-menu-surface--fullwidth": this.fullwidth
            })}
          style="${Di(a)}"
          @keydown=${this.Da}
          @opened=${this.N}
          @closed=${this.G}>
        ${F`<slot></slot>`}
      </div>`
        }
        o() {
            return {
                ...bj(this.K),
                rg: ()=>!!this.anchor,
                Sc: ()=>{
                    const a = new CustomEvent("closed",{
                        bubbles: !0,
                        composed: !0
                    });
                    this.open = !1;
                    this.K.dispatchEvent(a)
                }
                ,
                Ie: ()=>{
                    const a = new CustomEvent("closing",{
                        bubbles: !0,
                        composed: !0
                    });
                    this.K.dispatchEvent(a)
                }
                ,
                Tc: ()=>{
                    const a = new CustomEvent("opened",{
                        bubbles: !0,
                        composed: !0
                    });
                    this.open = !0;
                    this.K.dispatchEvent(a)
                }
                ,
                Je: ()=>{
                    const a = new CustomEvent("opening",{
                        bubbles: !0,
                        composed: !0
                    });
                    this.K.dispatchEvent(a)
                }
                ,
                vg: ()=>!1,
                De: ()=>this.K ? "rtl" === getComputedStyle(this.K).direction : !1,
                af: a=>{
                    this.K && (this.yd = a)
                }
                ,
                Ae: ()=>ej(this),
                Ve: ()=>{
                    const a = dj()
                      , b = a.length;
                    b || (this.h = null);
                    this.h = a[b - 1]
                }
                ,
                Ue: ()=>{
                    this.h && "focus"in this.h && this.h.focus()
                }
                ,
                Pb: ()=>{
                    const a = this.K;
                    return a ? {
                        width: a.offsetWidth,
                        height: a.offsetHeight
                    } : {
                        width: 0,
                        height: 0
                    }
                }
                ,
                ge: ()=>{
                    const a = this.anchor;
                    return a ? a.getBoundingClientRect() : null
                }
                ,
                je: ()=>({
                    width: document.body.clientWidth,
                    height: document.body.clientHeight
                }),
                se: ()=>({
                    width: window.innerWidth,
                    height: window.innerHeight
                }),
                ue: ()=>({
                    x: window.pageXOffset,
                    y: window.pageYOffset
                }),
                setPosition: a=>{
                    this.K && (this.vd = "left"in a ? `${a.left}px` : "",
                    this.wd = "right"in a ? `${a.right}px` : "",
                    this.xd = "top"in a ? `${a.top}px` : "",
                    this.ud = "bottom"in a ? `${a.bottom}px` : "")
                }
                ,
                rd: async a=>{
                    this.K && (this.cc = a,
                    await this.Ea,
                    this.cc = `var(--mdc-menu-max-height, ${a})`)
                }
                ,
                kd: (a,b)=>{
                    window.addEventListener(a, b)
                }
                ,
                Ac: (a,b)=>{
                    window.removeEventListener(a, b)
                }
            }
        }
        Da(a) {
            if (this.g) {
                const b = a.keyCode;
                "Escape" !== a.key && 27 !== b || this.g.close()
            }
        }
        I(a) {
            this.stayOpenOnBodyClick || -1 === a.composedPath().indexOf(this) && this.close()
        }
        N() {
            this.m = this.I.bind(this);
            document.body.addEventListener("click", this.m, {
                passive: !0,
                capture: !0
            })
        }
        G() {
            document.body.removeEventListener("click", this.m, {
                capture: !0
            })
        }
        close() {
            this.open = !1
        }
    }
    ;
    t([O(".mdc-menu-surface"), A("design:type", HTMLDivElement)], S.prototype, "K", void 0);
    t([O("slot"), A("design:type", Object)], S.prototype, "gi", void 0);
    t([M({
        type: Boolean
    }), Jk(function(a) {
        this.g && !this.fixed && (this.g.N = a)
    }), A("design:type", Object)], S.prototype, "absolute", void 0);
    t([M({
        type: Boolean
    }), A("design:type", Object)], S.prototype, "fullwidth", void 0);
    t([M({
        type: Boolean
    }), Jk(function(a) {
        this.g && !this.absolute && (this.g.o = a)
    }), A("design:type", Object)], S.prototype, "fixed", void 0);
    t([M({
        type: Number
    }), Jk(function(a) {
        if (this.g && null !== this.y && null !== a) {
            var b = this.g
              , c = this.y;
            b.position.x = b.isFinite(a) ? a : 0;
            b.position.y = b.isFinite(c) ? c : 0;
            Tl(this.g, {
                left: a,
                top: this.y,
                right: -a,
                bottom: this.y
            })
        }
    }), A("design:type", Object)], S.prototype, "x", void 0);
    t([M({
        type: Number
    }), Jk(function(a) {
        if (this.g && null !== this.x && null !== a) {
            var b = this.g
              , c = this.x;
            b.position.x = b.isFinite(c) ? c : 0;
            b.position.y = b.isFinite(a) ? a : 0;
            Tl(this.g, {
                left: this.x,
                top: a,
                right: -this.x,
                bottom: a
            })
        }
    }), A("design:type", Object)], S.prototype, "y", void 0);
    t([M({
        type: Boolean
    }), Jk(function(a) {
        this.g && (this.g.R = a)
    }), A("design:type", Object)], S.prototype, "quick", void 0);
    t([M({
        type: Boolean,
        A: !0
    }), Jk(function(a, b) {
        this.g && (a ? this.g.open() : void 0 !== b && this.g.close())
    }), A("design:type", Object)], S.prototype, "open", void 0);
    t([M({
        type: Boolean
    }), A("design:type", Boolean)], S.prototype, "stayOpenOnBodyClick", void 0);
    t([P(), Jk(function(a) {
        this.g && (this.g.j = a ? a : a)
    }), A("design:type", Number)], S.prototype, "Hb", void 0);
    t([M({
        type: String
    }), Jk(function(a) {
        if (this.g) {
            var b = null === this.v;
            const c = !b && a !== this.v;
            "START" !== a && "END" !== a || !(c || b && "END" === a) || (this.Hb ^= 4,
            b = this.g,
            b.U ^= 4,
            this.v = a)
        }
    }), A("design:type", String)], S.prototype, "menuCorner", void 0);
    t([M({
        type: String
    }), Jk(function(a) {
        this.g && a && (a = Xl[a],
        "END" === this.menuCorner && (a ^= 4),
        this.Hb = a)
    }), A("design:type", String)], S.prototype, "corner", void 0);
    t([P(), A("design:type", Object)], S.prototype, "xd", void 0);
    t([P(), A("design:type", Object)], S.prototype, "vd", void 0);
    t([P(), A("design:type", Object)], S.prototype, "wd", void 0);
    t([P(), A("design:type", Object)], S.prototype, "ud", void 0);
    t([P(), A("design:type", Object)], S.prototype, "cc", void 0);
    t([P(), A("design:type", Object)], S.prototype, "yd", void 0);
    var Yl = class extends S {
    }
    ;
    Yl.M = [J([".mdc-menu-surface{display:none;position:absolute;box-sizing:border-box;margin:0;padding:0;transform:scale(1);transform-origin:top left;opacity:0;overflow:auto;will-change:transform,opacity;box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);transform-origin-left:top left;transform-origin-right:top right}.mdc-menu-surface:focus{outline:none}.mdc-menu-surface--animating-open{display:inline-block;transform:scale(0.8);opacity:0}.mdc-menu-surface--open{display:inline-block;transform:scale(1);opacity:1}.mdc-menu-surface--animating-closed{display:inline-block;opacity:0}[dir=rtl] .mdc-menu-surface,.mdc-menu-surface[dir=rtl]{transform-origin-left:top right;transform-origin-right:top left}.mdc-menu-surface--anchor{position:relative;overflow:visible}.mdc-menu-surface--fixed{position:fixed}.mdc-menu-surface--fullwidth{width:100%}.mdc-menu-surface{max-width:calc(100vw - 32px);max-width:var(--mdc-menu-max-width, calc(100vw - 32px));max-height:calc(100vh - 32px);max-height:var(--mdc-menu-max-height, calc(100vh - 32px));z-index:8;transition:opacity .03s linear,transform .12s cubic-bezier(0, 0, 0.2, 1),height 250ms cubic-bezier(0, 0, 0.2, 1);background-color:#fff;background-color:var(--mdc-theme-surface, #fff);color:#000;color:var(--mdc-theme-on-surface, #000);border-radius:4px;border-radius:var(--mdc-shape-medium, 4px)}.mdc-menu-surface--animating-closed{transition:opacity .075s linear}:host(:not([open])){display:none}.mdc-menu-surface{z-index:8;z-index:var(--mdc-menu-z-index, 8);min-width:112px;min-width:var(--mdc-menu-min-width, 112px)}/*# sourceMappingURL=mwc-menu-surface.css.map */\n"])];
    Yl = t([L("mwc-menu-surface")], Yl);
    var T = class extends fj {
        constructor() {
            super(...arguments);
            this.l = Jl;
            this.anchor = this.v = null;
            this.wrapFocus = this.quick = this.open = !1;
            this.innerRole = "menu";
            this.innerAriaLabel = null;
            this.corner = "TOP_START";
            this.y = this.x = null;
            this.fullwidth = this.forceGroupSelection = this.fixed = this.activatable = this.multi = this.absolute = !1;
            this.menuCorner = "START";
            this.stayOpenOnBodyClick = !1;
            this.defaultFocus = "LIST_ROOT";
            this.m = null
        }
        get h() {
            this.v || (this.v = this.Aa.querySelector("mwc-list"));
            return this.v
        }
        get index() {
            const a = this.h;
            return a ? a.index : -1
        }
        get selected() {
            const a = this.h;
            return a ? a.selected : null
        }
        i() {
            var a = !this.open
              , b = this.anchor
              , c = this.open
              , d = this.quick
              , e = this.corner
              , f = this.x
              , g = this.y
              , k = this.absolute
              , q = this.fixed
              , p = this.fullwidth
              , w = this.menuCorner
              , u = this.stayOpenOnBodyClick
              , z = zi({
                "mdc-menu": !0,
                "mdc-menu-surface": !0
            })
              , H = this.I
              , W = this.N
              , N = this.Da;
            var da = "menu" === this.innerRole ? "menuitem" : "option";
            da = F`
      <mwc-list
          rootTabbable
          .innerAriaLabel=${this.innerAriaLabel}
          .innerRole=${this.innerRole}
          .multi=${this.multi}
          class=${zi({
                "mdc-deprecated-list": !0
            })}
          .itemRoles=${da}
          .wrapFocus=${this.wrapFocus}
          .activatable=${this.activatable}
          @action=${this.G}>
        <slot></slot>
      </mwc-list>`;
            return F`
      <mwc-menu-surface
        ?hidden=${a}
        .anchor=${b}
        .open=${c}
        .quick=${d}
        .corner=${e}
        .x=${f}
        .y=${g}
        .absolute=${k}
        .fixed=${q}
        .fullwidth=${p}
        .menuCorner=${w}
        ?stayOpenOnBodyClick=${u}
        class=${z}
        @closed=${H}
        @opened=${W}
        @keydown=${N}>
      ${da}
    </mwc-menu-surface>`
        }
        o() {
            return {
                Zd: (a,b)=>{
                    const c = this.h;
                    if (c) {
                        var d = c.h[a];
                        d && ("mdc-menu-item--selected" === b ? this.forceGroupSelection && !d.selected && c.multi && Dl(c.g, a, !0) : d.classList.add(b))
                    }
                }
                ,
                Te: (a,b)=>{
                    const c = this.h;
                    if (c) {
                        var d = c.h[a];
                        d && ("mdc-menu-item--selected" === b ? d.selected && c.multi && Dl(c.g, a, !1) : d.classList.remove(b))
                    }
                }
                ,
                Yd: (a,b,c)=>{
                    const d = this.h;
                    d && (a = d.h[a]) && gc(a, b, c)
                }
                ,
                Se: (a,b)=>{
                    const c = this.h;
                    c && (a = c.h[a]) && a.removeAttribute(b)
                }
                ,
                ie: (a,b)=>{
                    const c = this.h;
                    return c ? (a = c.h[a]) ? a.getAttribute(b) : null : null
                }
                ,
                mg: (a,b)=>a.classList.contains(b),
                Jb: ()=>{
                    this.open = !1
                }
                ,
                me: a=>{
                    const b = this.h;
                    return b ? b.h.indexOf(a) : -1
                }
                ,
                Za: ()=>{}
                ,
                Hc: ()=>{
                    const a = this.h;
                    return a ? a.h.length : 0
                }
                ,
                la: a=>{
                    const b = this.h;
                    b && (a = b.h[a]) && a.focus()
                }
                ,
                fe: ()=>{
                    this.h && this.h.focus()
                }
                ,
                qe: a=>{
                    const b = this.h;
                    if (!b)
                        return -1;
                    const c = b.h[a];
                    if (!c || !c.group)
                        return -1;
                    for (let d = 0; d < b.h.length; d++) {
                        if (d === a)
                            continue;
                        const e = b.h[d];
                        if (e.selected && e.group === c.group)
                            return d
                    }
                    return -1
                }
                ,
                Oc: a=>{
                    const b = this.h;
                    return b ? (a = b.h[a]) ? a.hasAttribute("group") : !1 : !1
                }
            }
        }
        Da(a) {
            if (this.g) {
                const b = a.keyCode;
                "Tab" !== a.key && 9 !== b || this.g.g.Jb(!0)
            }
        }
        G(a) {
            var b = this.h;
            if (this.g && b && (b = b.h[a.detail.index]) && (a = this.g,
            b = a.g.me(b),
            !(0 > b))) {
                a.g.Za({
                    index: b
                });
                var c = "true" === a.g.ie(b, Gl.Bf);
                a.g.Jb(c);
                if (a.g.Oc(b)) {
                    c = a.g.Hc();
                    if (!(0 <= b && b < c))
                        throw Error("MDCMenuFoundation: No list item at specified index.");
                    if (!a.g.Oc(b))
                        throw Error("MDCMenuFoundation: No selection group at specified index.");
                    c = a.g.qe(b);
                    0 <= c && (a.g.Se(c, Gl.Ld),
                    a.g.Te(c, Fl.Ud));
                    a.g.Zd(b, Fl.Ud);
                    a.g.Yd(b, Gl.Ld, "true")
                }
            }
        }
        N() {
            this.open = !0;
            if (this.g) {
                var a = this.g;
                switch (a.h) {
                case 2:
                    a.g.la(0);
                    break;
                case 3:
                    a.g.la(a.g.Hc() - 1);
                    break;
                case 0:
                    break;
                default:
                    a.g.fe()
                }
            }
        }
        I() {
            this.open = !1
        }
        async nb() {
            await this.m;
            return await super.nb()
        }
        async L() {
            super.L();
            const a = this.h;
            a && (this.m = a.Ea,
            await this.m)
        }
        close() {
            this.open = !1
        }
        la(a) {
            const b = this.h;
            b && b.la(a)
        }
        layout(a=!0) {
            const b = this.h;
            b && b.layout(a)
        }
    }
    ;
    t([O(".mdc-menu"), A("design:type", Yl)], T.prototype, "K", void 0);
    t([O("slot"), A("design:type", Object)], T.prototype, "hi", void 0);
    t([M({
        type: Object
    }), A("design:type", Object)], T.prototype, "anchor", void 0);
    t([M({
        type: Boolean,
        A: !0
    }), A("design:type", Object)], T.prototype, "open", void 0);
    t([M({
        type: Boolean
    }), A("design:type", Object)], T.prototype, "quick", void 0);
    t([M({
        type: Boolean
    }), A("design:type", Object)], T.prototype, "wrapFocus", void 0);
    t([M({
        type: String
    }), A("design:type", String)], T.prototype, "innerRole", void 0);
    t([M({
        type: String
    }), A("design:type", Object)], T.prototype, "innerAriaLabel", void 0);
    t([M({
        type: String
    }), A("design:type", String)], T.prototype, "corner", void 0);
    t([M({
        type: Number
    }), A("design:type", Object)], T.prototype, "x", void 0);
    t([M({
        type: Number
    }), A("design:type", Object)], T.prototype, "y", void 0);
    t([M({
        type: Boolean
    }), A("design:type", Object)], T.prototype, "absolute", void 0);
    t([M({
        type: Boolean
    }), A("design:type", Object)], T.prototype, "multi", void 0);
    t([M({
        type: Boolean
    }), A("design:type", Object)], T.prototype, "activatable", void 0);
    t([M({
        type: Boolean
    }), A("design:type", Object)], T.prototype, "fixed", void 0);
    t([M({
        type: Boolean
    }), A("design:type", Object)], T.prototype, "forceGroupSelection", void 0);
    t([M({
        type: Boolean
    }), A("design:type", Object)], T.prototype, "fullwidth", void 0);
    t([M({
        type: String
    }), A("design:type", String)], T.prototype, "menuCorner", void 0);
    t([M({
        type: Boolean
    }), A("design:type", Boolean)], T.prototype, "stayOpenOnBodyClick", void 0);
    t([M({
        type: String
    }), Jk(function(a) {
        this.g && (this.g.h = Il[a])
    }), A("design:type", String)], T.prototype, "defaultFocus", void 0);
    var Zl = class extends T {
    }
    ;
    Zl.M = [J(["mwc-list ::slotted([mwc-list-item]:not([twoline])),mwc-list ::slotted([noninteractive]:not([twoline])){height:var(--mdc-menu-item-height, 48px)}/*# sourceMappingURL=mwc-menu.css.map */\n"])];
    Zl = t([L("mwc-menu")], Zl);
    const $l = new Set
      , am = J`
    .mdc-menu-surface {
      box-shadow: ${hi};
    }`.styleSheet
      , bm = F`
  <ea-icon class="radio-icon" .template=${dl}></ea-icon>`;
    function cm(a, b) {
        const [c,d,e,f] = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
        let g = d
          , k = c
          , q = "ltr" === a ? e : f
          , p = "ltr" === a ? f : e;
        b && (g = "ltr" === a ? f : e,
        k = "ltr" === a ? e : f,
        q = c,
        p = d);
        return {
            Pg: g,
            bh: k,
            ag: q,
            Tg: p
        }
    }
    function dm(a, b) {
        return c=>{
            const d = c.target instanceof Element ? c.target.closest("mwc-menu")?.querySelector(`ea-switch#${a.ha}-checkbox`) : null;
            !d || c.target instanceof bl ? (c.currentTarget.setAttribute("aria-checked", d?.selected ? "true" : "false"),
            b?.(c)) : d.click()
        }
    }
    function em(a) {
        return {
            sb: null,
            clearTimeout() {
                this.sb && (clearTimeout(this.sb),
                this.sb = null)
            },
            ya(b) {
                a.ya && a.ya(b)
            },
            ab(b, c) {
                c || (this.clearTimeout(),
                this.ya(b))
            },
            Da(b, c) {
                c || "Enter" !== b.key && " " !== b.key || (" " === b.key && b.preventDefault(),
                this.ya(b))
            },
            Tb() {
                this.clearTimeout();
                if (a.Oa) {
                    var b = a.Oa;
                    b.clearTimeout();
                    b.open || (this.sb = setTimeout(()=>{
                        fm(b, "root")
                    }
                    , 400))
                }
            },
            Ub() {
                this.clearTimeout();
                if (a.Oa) {
                    var b = a.Oa;
                    b.open && (this.sb = setTimeout(()=>{
                        b.v ? this.clearTimeout() : b.close()
                    }
                    , 400))
                }
            }
        }
    }
    function gm(a) {
        function b(d, e) {
            for (const f of d) {
                c.has(f.ha);
                if (c.has(f.ha))
                    return !1;
                c.add(f.ha);
                1 === f.entryType && b(f.Ge.entries, [...e, f.ha])
            }
            return !0
        }
        const c = new Set;
        b(a, [])
    }
    function hm(a, b, c) {
        if ("listbox" === c)
            return {
                role: "option",
                activated: b.activated
            };
        if (0 !== a.entryType || void 0 === a.role)
            return {
                role: "menuitem",
                activated: b.activated
            };
        c = a.activated ? "true" : "false";
        if ("checkbox" === a.role)
            return b.ya = dm(a, b.ya),
            {
                role: "menuitemcheckbox",
                ariaChecked: c
            };
        if ("radio" === a.role)
            return {
                role: "menuitemradio",
                ariaChecked: c
            };
        ic(a.role)
    }
    async function fm(a, b="root") {
        await Ej();
        wh(a);
        await a.Ea;
        a.W && (a.W.open = !0,
        a.o()?.setAttribute("aria-expanded", "true"),
        "none" !== b && a.addEventListener("opened", ()=>{
            "root" === b ? a.Mg?.focus() : im(a, "first" === b ? 0 : a.model.entries.length - 1)
        }
        , {
            once: !0
        }))
    }
    function jm(a) {
        const b = a.shadowRoot?.activeElement;
        b && (a.g = a.m.findIndex(c=>c.ha === b.id))
    }
    async function im(a, b) {
        var c = a.m;
        b >= c.length || 0 > b || (gd(c[b], cd(()=>`MenuItem[${b}] is undefined (label=${a.model.label ?? "submenu"})`)),
        c = a.shadowRoot.getElementById(c[b].ha),
        a.g = b,
        c.focus())
    }
    function Im(a, b, c, d=()=>{}
    ) {
        const e = [];
        return {
            Fe: F`
          ${Xj(b, f=>f.ha, f=>{
                var g = f.entryType;
                switch (g) {
                case 1:
                    g = new Jm(a,f.ha,f.ariaLabel ?? f.label,a.l(),!!c.activatable);
                    g.model = f.Ge;
                    f = Km(a, f, c, {
                        Oa: g,
                        Vb: a
                    });
                    const {Lg: k, Oa: q} = {
                        Oa: g,
                        Lg: f
                    };
                    e.push(q);
                    return k;
                case 0:
                    return Km(a, f, c, {
                        Vb: a,
                        ya: Lm(a, f, d),
                        activated: !!f.activated
                    });
                case 2:
                    return F`<li divider role="separator"></li>`;
                default:
                    ic(g)
                }
            }
            )}`,
            bf: e
        }
    }
    function Mm(a) {
        let b = a.ff;
        if (0 === a.entryType) {
            if ("string" === typeof b)
                return F`<label slot="meta">${b}</label>`;
            b || ("checkbox" === a.role && (b = F`
            <ea-switch
                inert
                class="checkbox-switch"
                id="${a.ha}-checkbox"
                ?selected=${!!a.activated}>
            </ea-switch>`),
            "radio" === a.role && a.activated && (b = bm))
        }
        if (b)
            return F`<div part="meta" slot="meta">${b}</div>`
    }
    function Nm(a) {
        return a.fontFamily ? F`
        <span style=${Di({
            fontFamily: a.fontFamily
        })}>
          ${a.label}
        </span>` : a.bold ? F`<b>${a.label}</b>` : a.label
    }
    function Km(a, b, c, d) {
        const e = em(d)
          , f = b.disabled ?? !1;
        if (c.ob)
            return F`
        <ea-icon-button
            innerRole="menuitem"
            id=${b.ha}
            aria-label=${b.ariaLabel ?? b.label}
            ?disabled=${f}
            title=${b.ariaLabel ?? b.label}
            ?toggled=${!!d.activated}
            .type=${c.activatable ? "toggleable" : "default"}
            @click=${w=>void e.ab(w, f)}
            @keydown=${w=>void e.Da(w, f)}
            @mouseenter=${()=>void e.Tb()}
            @mouseleave=${()=>void e.Ub()}
            ?hidden=${b.hidden?.() ?? !1}
            .template=${b.icon ?? null}>
        </ea-icon-button>`;
        c = b.icon ? F`<ea-icon slot="graphic" .template=${b.icon}></ea-icon>` : null;
        const g = Mm(b)
          , {role: k, ariaChecked: q, activated: p} = hm(b, d, a.innerRole);
        return F`
        <div
          title=${b.tj ?? I}>
          <ea-menu-list-item
              id=${b.ha}
              aria-checked=${q ?? I}
              aria-label=${b.ariaLabel ?? I}
              aria-haspopup=${!!d.Oa}
              ?disabled=${f}
              @click=${w=>void e.ab(w, f)}
              @keydown=${w=>void e.Da(w, f)}
              @mouseenter=${()=>void e.Tb()}
              @mouseleave=${()=>void e.Ub()}
              ?hidden=${b.hidden?.() ?? !1}
              ?hasMeta=${!!g}
              .graphic=${c ? "icon" : null}
              ?activated=${!!p}
              role=${k}>
            <span>${Nm(b)}</span>
            ${c}
            ${g}
          </ea-menu-list-item>
        </div>
    `
    }
    function Lm(a, b, c) {
        return d=>{
            b.ya(d);
            (b.Ni ?? "checkbox" !== b.role) && (a.close(),
            c())
        }
    }
    class Om extends K {
        constructor() {
            super();
            this.G = null;
            this.R = a=>{
                if (this.W && this.open && 0 === a.button) {
                    var b = a.composedPath()
                      , c = this.o();
                    c = !!c && b.includes(c);
                    b = b.includes(this);
                    var d = !1;
                    if ("mouse" !== a.pointerType) {
                        a = new Ub(a.pageX,a.pageY);
                        var e = Array.from(Pf("mwc-list", this));
                        for (const f of e)
                            if (e = f.getBoundingClientRect(),
                            (new fl(e.x - 12,e.y - 12,e.width + 24,e.height + 24)).contains(a)) {
                                d = !0;
                                break
                            }
                    }
                    c || b || d || (this instanceof Jm ? this.W.close() : this.close())
                }
            }
            ;
            this.g = -1;
            this.dir = "ltr";
            this.innerRole = "menu";
            this.addEventListener("keydown", a=>{
                if (this.W) {
                    var b = (this.g + 1) % this.m.length
                      , c = this.g - 1;
                    0 > c && (c = this.m.length - 1);
                    var {Pg: d, bh: e, ag: f} = cm(this.dir, this.l());
                    a.key === d ? (im(this, b),
                    a.stopPropagation(),
                    a.preventDefault()) : a.key === e ? (im(this, c),
                    a.stopPropagation(),
                    a.preventDefault()) : "Tab" === a.key ? this.close() : this instanceof Jm && a.key === f && this.close()
                }
            }
            );
            this.addEventListener("focusin", ()=>void jm(this))
        }
        get model() {
            return this.G || {
                entries: []
            }
        }
        set model(a) {
            const b = this.G;
            this.g = -1;
            this.G = a;
            this.toggleAttribute("horizontal", this.l() ?? !1);
            this.toggleAttribute("icononly", a.ob ?? !1);
            wh(this, "model", b)
        }
        get open() {
            return this.W?.open || !1
        }
        set open(a) {
            this.Ea.then(()=>{
                if (this.W) {
                    var b = this.W?.open || !1;
                    this.W.open = a;
                    wh(this.W, "open", b)
                }
            }
            )
        }
        close() {
            const a = this.shadowRoot.querySelectorAll("ea-submenu");
            for (const b of a)
                b.close();
            this.o()?.setAttribute("aria-expanded", "false");
            this.g = -1;
            this.open && (this.W?.close(),
            this instanceof Jm || this.W?.anchor?.focus())
        }
        static get M() {
            return [J`
      :host {
        --mdc-list-item-graphic-size: var(--ea-menu-icon-size, 20px);
        --mdc-list-item-meta-size: var(--ea-menu-icon-size, 20px);
        --mdc-list-item-graphic-margin: 0;
        --mdc-menu-item-height: ${36}px;
        --mdc-menu-min-width: var(--ea-menu-entry-width, var(--menu-min-width));
        --mdc-ripple-color: ${ci};
        --mdc-ripple-focus-opacity: var(--cros-ripple-opacity);
        --mdc-ripple-hover-opacity: var(--cros-ripple-opacity);
        --mdc-ripple-press-opacity: var(--cros-ripple-opacity);
        --mdc-shape-medium: 4px;
        --mdc-theme-on-surface: var(--cros-menu-label-color);
        --mdc-theme-surface: var(--cros-menu-bg-color);
        --mdc-typography-caption-font-size: ${14}px;
        --mdc-typography-caption-letter-spacing: 0;
        --mdc-typography-caption-line-height: ${20}px;
        --menu-min-width: ${112}px;
        pointer-events: all;
      }

      :host([icononly]:not([horizontal])) {
        --menu-min-width: ${80}px;
      }

      mwc-menu {
        display: flex;
      }

      :host([horizontal]) mwc-menu {
        --mdc-list-vertical-padding: 0;
      }

      #entries-container {
        display: block;
        overflow: hidden;
        padding: 0;
      }

      #entries-container:focus {
        outline: none;
      }

      li[divider] {
        border-bottom: 1px solid var(--cros-separator-color);
      }

      :host([horizontal]) #entries-container {
        display: flex;
        padding: 0 ${8}px;
        position: relative;
      }

      /** TODO(b/169361791): Confirm styling for icon-only, vertical menu. */
      ea-icon-button {
        display: block;
        height: var(--tap-target-size);
        margin-inline: auto;
        width: var(--tap-target-size);
      }

      [mwc-list-item] {
        box-sizing: border-box;
        color: var(--cros-menu-label-color);
        display: flex;
        font: ${Mj};
        height: var(--mdc-menu-item-height);
        letter-spacing: 0;
        line-height: var(--mdc-menu-item-height);
        padding-inline-end: 12px;
        padding-inline-start: 16px;
        width: var(--ea-menu-entry-width);
      }

      [mwc-list-item] > span {
        padding-inline-end: 40px;
      }

      :host([horizontal]) [mwc-list-item] > span {
        padding-inline-end: 0px;
      }

      label[slot="meta"] {
        align-items: center;
        color: var(--cros-text-color-secondary);
        cursor: inherit;
        display: flex;
        inset-block-start: 0;
        padding-inline-end: 4px;
        white-space: nowrap;
        width: fit-content;
      }

      :host([horizontal]) [mwc-list-item] {
        text-align: center;
      }

      [mwc-list-item][hidden] {
        display: none;
      }

      ea-icon {
        --icon-size: var(--ea-menu-icon-size, 20px);
        color: var(--cros-menu-icon-color);
      }

      .radio-icon {
        color: ${Eh};
      }

      .checkbox-switch {
        padding-inline-end: 4px;
      }

      [mwc-list-item][disabled] ea-icon {
        color: rgba(var(--cros-menu-icon-color-rgb), var(--cros-disabled-opacity));
      }

      [mwc-list-item][disabled] label[slot="meta"] {
        color: rgba(var(--cros-text-secondary-color-rgb), var(--cros-disabled-opacity));
      }
    `]
        }
        connectedCallback() {
            super.connectedCallback();
            document.body.addEventListener("pointerup", this.R)
        }
        disconnectedCallback() {
            document.body.removeEventListener("pointerup", this.R);
            super.disconnectedCallback()
        }
        L(a) {
            super.L(a);
            this.W.Ea.then(()=>{
                const b = Sf("mwc-menu-surface", this.W);
                b.Ea.then(()=>{
                    const c = b.shadowRoot;
                    c.adoptedStyleSheets && (c.adoptedStyleSheets = [...c.adoptedStyleSheets, am])
                }
                )
            }
            )
        }
        ia(a) {
            super.ia(a);
            if (a = this.W ? Sf("ul.mdc-deprecated-list", this.W) : null) {
                const b = document.createElement("div");
                b.appendChild(document.createElement("slot"));
                b.classList.add("mdc-deprecated-list");
                a.replaceWith(b)
            }
        }
        get m() {
            return this.model.entries.filter(a=>2 !== a.entryType && !a.hidden?.())
        }
    }
    t([O("mwc-menu"), A("design:type", Zl)], Om.prototype, "W", void 0);
    t([O("#entries-container"), A("design:type", HTMLDivElement)], Om.prototype, "Mg", void 0);
    t([M({
        H: !0,
        A: !0
    }), A("design:type", Object)], Om.prototype, "dir", void 0);
    t([M({
        H: !0,
        A: !0
    }), A("design:type", String)], Om.prototype, "innerRole", void 0);
    t([M({
        H: !1
    }), A("design:type", Object), A("design:paramtypes", [Object])], Om.prototype, "model", null);
    t([M({
        A: !0,
        type: Boolean
    }), A("design:type", Boolean), A("design:paramtypes", [Boolean])], Om.prototype, "open", null);
    let Jm = class extends Om {
        constructor(a, b, c, d, e) {
            super();
            this.Vb = a;
            this.S = b;
            this.label = c;
            this.Xa = d;
            this.activatable = e;
            this.v = !1;
            this.anchor = null;
            this.I = f=>{
                const {Tg: g} = cm(this.dir, this.l());
                ["Enter", " ", g].includes(f.key) && !this.anchor?.hasAttribute("disabled") && fm(this, "first")
            }
            ;
            this.N = f=>{
                0 !== f.button || this.anchor?.hasAttribute("disabled") || this.open || fm(this, "root")
            }
            ;
            this.U = ()=>void this.Tb();
            this.ca = ()=>void this.Ub();
            this.h = null;
            this.addEventListener("mouseenter", this.U);
            this.addEventListener("mouseleave", this.ca)
        }
        clearTimeout() {
            this.h && (clearTimeout(this.h),
            this.h = null)
        }
        L(a) {
            super.L(a);
            this.anchor = this.Vb.shadowRoot.getElementById(this.S);
            this.W.anchor = this.anchor;
            this.anchor.addEventListener("keydown", this.I);
            this.anchor.addEventListener("pointerup", this.N);
            this.anchor.setAttribute("aria-expanded", "false")
        }
        i() {
            this.dir = gk();
            const {Fe: a, bf: b} = Im(this, this.model.entries, {
                activatable: this.activatable,
                ob: !!this.model.ob
            }, ()=>void this.Vb.close())
              , c = this.Xa ? "BOTTOM_START" : "TOP_END";
            return F`
      <mwc-menu
          stayopenonbodyclick
          fixed
          quick
          corner=${this.model.corner ?? c}
          defaultfocus="NONE"
          menucorner=${this.model.menuCorner ?? I}
          x="0"
          y=${this.Xa ? 0 : -8}
          ?activatable=${this.activatable}
          @closed=${this.close}>
        <div
            aria-label=${this.label ?? I}
            role="menu"
            aria-orientation=${this.Xa ? "horizontal" : "vertical"}
            id="entries-container"
            tabindex="-1">
          ${a}
        </div>
      </mwc-menu>
      ${b}
    `
        }
        disconnectedCallback() {
            this.anchor?.removeEventListener("keydown", this.I);
            this.anchor?.removeEventListener("pointerup", this.N);
            super.disconnectedCallback()
        }
        o() {
            return this.anchor
        }
        l() {
            return this.Xa
        }
        Tb() {
            this.clearTimeout();
            this.v = !0
        }
        Ub() {
            this.clearTimeout();
            this.v = !1;
            this.h = setTimeout(()=>{
                this.close();
                this.h = null
            }
            , 400)
        }
    }
    ;
    Jm = t([L("ea-submenu"), A("design:paramtypes", [Object, String, Object, Boolean, Boolean])], Jm);
    function Pm(a) {
        a.da?.removeEventListener("keydown", a.h);
        a.da?.removeEventListener("pointerup", a.v);
        a.da = Pk(a.model);
        a.da?.addEventListener("keydown", a.h);
        a.da?.addEventListener("pointerup", a.v);
        a.da?.setAttribute("aria-expanded", a.open.toString())
    }
    var Qm = class extends Om {
        constructor() {
            super(...arguments);
            this.h = a=>{
                switch (a.key) {
                case "Enter":
                case " ":
                case "ArrowDown":
                    fm(this, "first");
                    break;
                case "ArrowUp":
                    fm(this, "last")
                }
            }
            ;
            this.v = a=>{
                0 !== a.button || this.da?.hasAttribute("disabled") || (this.open ? this.close() : fm(this, "root"))
            }
            ;
            this.da = null
        }
        i() {
            gm(this.model.entries);
            this.dir = gk();
            const {Fe: a, bf: b} = Im(this, this.model.entries, {
                activatable: !!this.model.activatable,
                ob: !!this.model.ob
            });
            let c;
            void 0 !== this.model.yc && (c = "ltr" === this.dir ? this.model.yc : -this.model.yc);
            return F`
        <mwc-menu
            stayopenonbodyclick
            quick
            .anchor=${this.model.anchor ?? null}
            corner=${this.model.corner ?? I}
            defaultfocus="NONE"
            menucorner=${this.model.menuCorner ?? I}
            y=${this.model.Vf ?? I}
            x=${c ?? I}
            ?absolute=${!!this.model.absolute}
            ?fixed=${!!this.model.fixed}
            innerRole=${this.innerRole}
            @closed=${this.close}
            ?activatable=${!!this.model.activatable}>
          ${F`
      <div
          aria-label=${this.model.label ?? I}
          aria-orientation=${this.model.Xa ? "horizontal" : "vertical"}
          role=${this.innerRole ?? I}
          id=${"entries-container"}
          tabindex="-1">
        ${a}
      </div>`}
        </mwc-menu>
        ${b}
    `
        }
        connectedCallback() {
            super.connectedCallback();
            $l.add(this);
            Pm(this)
        }
        disconnectedCallback() {
            $l.delete(this);
            this.da?.removeEventListener("keydown", this.h);
            this.da?.removeEventListener("pointerup", this.v);
            this.da = null;
            super.disconnectedCallback()
        }
        ia(a) {
            super.ia(a);
            this.da !== Pk(this.model) && Pm(this)
        }
        o() {
            return this.da
        }
        l() {
            return this.model.Xa ?? !1
        }
    }
    ;
    t([O("#entries-container"), A("design:type", Object)], Qm.prototype, "Ui", void 0);
    Qm = t([L("ea-menu")], Qm);
    var Rm = class extends K {
        constructor() {
            super(...arguments);
            this.disabled = !1;
            this.offIcon = this.onIcon = "";
            this.nc = this.on = !1;
            this.g = new jj(()=>{
                this.nc = !0;
                return this.vf
            }
            )
        }
        m() {
            this.on = !this.on;
            this.dispatchEvent(new CustomEvent("icon-button-toggle-change",{
                detail: {
                    gj: this.on
                },
                bubbles: !0
            }))
        }
        click() {
            this.Ab.focus();
            this.Ab.click()
        }
        focus() {
            this.g.qa();
            this.Ab.focus()
        }
        blur() {
            this.g.ka();
            this.Ab.blur()
        }
        i() {
            var a = void 0 !== this.ariaLabelOn && void 0 !== this.ariaLabelOff;
            const b = a ? void 0 : this.on;
            a = a ? this.on ? this.ariaLabelOn : this.ariaLabelOff : this.ariaLabel;
            return F`<button
          class="mdc-icon-button mdc-icon-button--display-flex ${zi({
                "mdc-icon-button--on": this.on
            })}"
          aria-pressed="${b ?? I}"
          aria-label="${a ?? I}"
          @click="${this.m}"
          ?disabled="${this.disabled}"
          @focus="${this.v}"
          @blur="${this.o}"
          @mousedown="${this.Rd}"
          @mouseenter="${this.G}"
          @mouseleave="${this.I}"
          @touchstart="${this.Sd}"
          @touchend="${this.l}"
          @touchcancel="${this.l}"
        >${this.nc ? F`
            <mwc-ripple
                .disabled="${this.disabled}"
                unbounded>
            </mwc-ripple>` : ""}
        <span class="mdc-icon-button__icon"
          ><slot name="offIcon"
            ><i class="material-icons">${this.offIcon}</i
          ></slot
        ></span>
        <span class="mdc-icon-button__icon mdc-icon-button__icon--on"
          ><slot name="onIcon"
            ><i class="material-icons">${this.onIcon}</i
          ></slot
        ></span>
      </button>`
        }
        Rd(a) {
            const b = ()=>{
                window.removeEventListener("mouseup", b);
                this.l()
            }
            ;
            window.addEventListener("mouseup", b);
            this.g.sa(a)
        }
        Sd(a) {
            this.g.sa(a)
        }
        l() {
            this.g.ua()
        }
        G() {
            this.g.ra()
        }
        I() {
            this.g.Z()
        }
        v() {
            this.g.qa()
        }
        o() {
            this.g.ka()
        }
    }
    ;
    t([O(".mdc-icon-button"), A("design:type", HTMLElement)], Rm.prototype, "Ab", void 0);
    t([Bi, M({
        type: String,
        H: "aria-label"
    }), A("design:type", String)], Rm.prototype, "ariaLabel", void 0);
    t([M({
        type: Boolean,
        A: !0
    }), A("design:type", Object)], Rm.prototype, "disabled", void 0);
    t([M({
        type: String
    }), A("design:type", Object)], Rm.prototype, "onIcon", void 0);
    t([M({
        type: String
    }), A("design:type", Object)], Rm.prototype, "offIcon", void 0);
    t([M({
        type: String
    }), A("design:type", String)], Rm.prototype, "ariaLabelOn", void 0);
    t([M({
        type: String
    }), A("design:type", String)], Rm.prototype, "ariaLabelOff", void 0);
    t([M({
        type: Boolean,
        A: !0
    }), A("design:type", Object)], Rm.prototype, "on", void 0);
    t([wi(), A("design:type", Promise)], Rm.prototype, "vf", void 0);
    t([P(), A("design:type", Object)], Rm.prototype, "nc", void 0);
    t([ri(), A("design:type", Function), A("design:paramtypes", [Event]), A("design:returntype")], Rm.prototype, "Rd", null);
    t([ri(), A("design:type", Function), A("design:paramtypes", [Event]), A("design:returntype")], Rm.prototype, "Sd", null);
    var Sm = class extends Rm {
    }
    ;
    Sm.M = [yk];
    Sm = t([L("mwc-icon-button-toggle")], Sm);
    var Tm = Sm;
    function Um(a) {
        if (null === a.icon)
            throw Error("<ea-toggleable-icon-button> must be provided with a icon");
        a.h?.remove();
        a.h = document.importNode(a.icon.content, !0).children[0];
        a.h.setAttribute("slot", a.on ? "onIcon" : "offIcon");
        a.appendChild(a.h)
    }
    function Vm(a) {
        const b = a.wf;
        b.ariaExpanded = a.ariaExpanded;
        b.ariaHasPopup = a.ariaExpanded ? "true" : null;
        a.ariaExpanded && (b.ariaPressed = null)
    }
    var Wm = class extends Tm {
        constructor() {
            super();
            this.icon = null;
            this.ink = "default";
            this.h = this.ariaExpanded = null;
            const a = this.g.Z;
            this.g.Z = ()=>{
                this.on || a.call(this.g)
            }
        }
        m() {}
        static get M() {
            return [J`
      :host {
        --icon-off-fill: var(--cros-icon-color-primary);
        --icon-on-fill: var(--cros-icon-color-primary);
        --ripple-color: var(--cros-ripple-color-opaque);
        --mdc-icon-button-size: ${36}px;
        --mdc-icon-size: 20px;
        --mdc-ripple-color: var(--ripple-color);
        --mdc-ripple-focus-opacity: 0;
        --mdc-ripple-hover-opacity: var(--cros-ripple-opacity);
        --tap-target-size: ${48}px;
        --button-background-color: transparent;
        color: var(--ripple-color);
        flex: none;
        white-space: nowrap;
      }

      :host([ink='blue']) {
        --icon-on-fill: var(--cros-icon-color-prominent);
        --ripple-color: var(--cros-ripple-color-prominent-opaque);
      }

      :host([disabled]) {
        opacity: var(--cros-disabled-opacity);
      }

      :host {
        --icon-fill: var(--icon-off-fill);
      }

      :host([on]) {
        --icon-fill: var(--icon-on-fill);
      }

      :host(:is(:hover, .hover, [on])) {
        /* In mwc-ripple focus overtakes hover opacity. */
        --mdc-ripple-focus-opacity: var(--cros-ripple-opacity);
      }

      :host([on]:is(:hover, .hover)) {
        --mdc-ripple-hover-opacity: calc(var(--cros-ripple-opacity) * 2);
        /* In mwc-ripple focus overtakes hover opacity. */
        --mdc-ripple-focus-opacity: calc(var(--cros-ripple-opacity) * 2);
      }

      .extended-tap-target {
        height: var(--tap-target-size);
        width: var(--tap-target-size);
        display: grid;
        place-items: center;
      }

      .extended-tap-target > * {
        grid-area: 1/1/1/1;
      }

      ::slotted(svg) {
        pointer-events: none;
        fill: var(--icon-fill);
        stroke: var(--icon-fill);
        stroke-width: 0;
      }

      :host button {
        align-items: center;
        background-color: var(--button-background-color);
        border-radius: 50%;
        display: inline-flex;
        justify-content: center;
      }

      :host button:focus-visible:before {
        border: 2px solid var(--cros-focus-ring-color);
        border-radius: 50%;
        content: "";
        height: 100%;
        pointer-events: none;
        position: absolute;
        width: 100%;
      }
    `, ...Tm.M]
        }
        L(a) {
            super.L(a);
            qi(this);
            this.addEventListener("mousedown", ()=>{
                this.h && this.h.animate({
                    transform: ["scale(1)", "scale(0.8)", "scale(1)"]
                }, {
                    duration: 200
                })
            }
            );
            Um(this);
            Vm(this)
        }
        xb(a) {
            a.has("on") && (this.on ? this.g.ra() : this.g.Z());
            return super.xb(a)
        }
        ia(a) {
            super.ia(a);
            a.has("icon") && Um(this);
            a.has("ariaExpanded") && Vm(this);
            a.has("on") && this.h?.setAttribute("slot", this.on ? "onIcon" : "offIcon")
        }
        attributeChangedCallback(a, b, c) {
            super.attributeChangedCallback(a, b, c);
            "aria-expanded" === a && null !== this.ariaExpanded && (this.on = "true" === this.ariaExpanded)
        }
        ra() {
            this.classList.add("hover");
            this.g.ra()
        }
        Z() {
            this.classList.remove("hover");
            this.g.Z()
        }
        i() {
            return F`
      <div class="extended-tap-target">
        ${super.i()}
      </div>
    `
        }
    }
    ;
    t([M({
        H: !1
    }), A("design:type", Object)], Wm.prototype, "icon", void 0);
    t([M({
        type: String,
        A: !0
    }), A("design:type", String)], Wm.prototype, "ink", void 0);
    t([M({
        type: String,
        H: "aria-expanded"
    }), A("design:type", Object)], Wm.prototype, "ariaExpanded", void 0);
    t([O("button", !0), A("design:type", HTMLButtonElement)], Wm.prototype, "wf", void 0);
    Wm = t([L("ea-toggleable-icon-button"), A("design:paramtypes", [])], Wm);
    let Xm;
    var Ym;
    if (void 0 === Xm) {
        var Zm = document.createElement("template");
        kk(Zm, '<svg data-id="ic_chevron_right" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">\n<path clip-rule="evenodd" d="M6.66669 13.825L10.7872 10L6.66669 6.175L7.93524 5L13.3334 10L7.93524 15L6.66669 13.825Z" fill-rule="evenodd"></path>\n</svg>\n');
        Xm = Zm
    }
    Ym = Xm;
    let $m;
    var an;
    if (void 0 === $m) {
        var bn = document.createElement("template");
        kk(bn, '<svg data-id="ic_launch_in_new_page" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">\n<path clip-rule="evenodd" d="M15 15H5V5H9V3H5C4 3 3 4 3 5C3 6 3 15 3 15C3 16 4 17 5 17H15C16 17 17 16 17 15V11H15V15ZM11 3V5H13.5L7 11.5L8.5 13L15 6.5V9H17V3H11Z" fill-rule="evenodd"></path>\n</svg>\n');
        $m = bn
    }
    an = $m;
    let cn;
    var dn;
    if (void 0 === cn) {
        var en = document.createElement("template");
        kk(en, '<svg data-id="ic_more-options" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n<defs>\n<path d="M14,10 C14,8.896 14.896,8 16,8 C17.105,8 18,8.896 18,10 C18,11.105 17.105,12 16,12 C14.896,12 14,11.105 14,10 Z M12,10 C12,11.105 11.105,12 10,12 C8.896,12 8,11.105 8,10 C8,8.896 8.896,8 10,8 C11.105,8 12,8.896 12,10 Z M6,10 C6,11.105 5.105,12 4,12 C2.896,12 2,11.105 2,10 C2,8.896 2.896,8 4,8 C5.105,8 6,8.896 6,10 Z" id="ic_more-options-a"></path>\n</defs>\n<use fill-rule="evenodd" transform="rotate(90 10 10)" xlink:href="#ic_more-options-a"></use>\n</svg>\n');
        cn = en
    }
    dn = cn;
    function fn(a, b, c, d) {
        return {
            entryType: 0,
            ha: a,
            label: b,
            ya: c,
            ff: d ? F`
      <ea-icon .template=${d}></ea-icon>` : void 0
        }
    }
    var gn = class extends K {
        static get M() {
            return J`
      :host {
        position: absolute;
        right: 0;
        top: 4px;
        z-index: 2;
      }
    `
        }
        L(a) {
            super.L(a);
            const {MSG_SEND_FEEDBACK: b, MSG_TERMS: c, MSG_PRIVACY: d, MSG_ABOUT: e, MSG_LICENSES: f} = D;
            this.Kg.model = {
                entries: [fn("send-feedback", b, ()=>{
                    this.dispatchEvent(new CustomEvent("trigger-feedback",{
                        composed: !0,
                        bubbles: !0
                    }))
                }
                ), {
                    entryType: 1,
                    ha: "about",
                    label: e,
                    ff: F`
        <ea-icon rtlflip .template=${Ym}></ea-icon>
      `,
                    Ge: {
                        corner: "TOP_START",
                        menuCorner: "END",
                        entries: [fn("privacy", d, ()=>{
                            const g = `https://policies.google.com/privacy?hl=${hf()}`;
                            pc(window, oc(g, nc) || Xa)
                        }
                        , an), fn("terms", c, ()=>{
                            const g = `https://policies.google.com/terms?hl=${hf()}`;
                            pc(window, oc(g, nc) || Xa)
                        }
                        , an), fn("licenses", f, ()=>{
                            pc(window, oc("/#licenses", nc) || Xa, "licenses", "width=800,height=700")
                        }
                        , an)]
                    }
                }],
                da: this.button,
                anchor: this.button,
                corner: "BOTTOM_END",
                menuCorner: "END",
                yc: -6,
                Vf: 0
            }
        }
        i() {
            const {MSG_OVERFLOW_MENU: a} = D;
            return F`
      <ea-toggleable-icon-button
          id="more-options-button"
          aria-label=${a}
          .icon=${dn}
          title=${a}>
      </ea-toggleable-icon-button>
      <ea-menu></ea-menu>
    `
        }
    }
    ;
    t([O("ea-menu"), A("design:type", Qm)], gn.prototype, "Kg", void 0);
    t([O("ea-toggleable-icon-button"), A("design:type", Wm)], gn.prototype, "button", void 0);
    gn = t([L("calculator-overflow-menu")], gn);
    const hn = class {
        constructor(a) {
            this.i = a;
            this.j = "empty";
            this.g = null;
            this.h = {}
        }
        getContext() {
            return this.h
        }
        bc(a) {
            this.j = a;
            return this
        }
        pd(a) {
            this.g = a;
            return this
        }
        qd(a) {
            const b = {};
            for (const c in a)
                b[c] = a[c];
            this.h = b;
            return this
        }
    }
    ;
    function jn() {}
    jn.prototype.next = function() {
        return kn
    }
    ;
    var kn = {
        done: !0,
        value: void 0
    };
    jn.prototype.gb = function() {
        return this
    }
    ;
    function ln(a) {
        if (a instanceof mn || a instanceof nn || a instanceof on)
            return a;
        if ("function" == typeof a.next)
            return new mn(()=>a);
        if ("function" == typeof a[Symbol.iterator])
            return new mn(()=>a[Symbol.iterator]());
        if ("function" == typeof a.gb)
            return new mn(()=>a.gb());
        throw Error("Not an iterator or iterable.");
    }
    class mn {
        constructor(a) {
            this.g = a
        }
        gb() {
            return new nn(this.g())
        }
        [Symbol.iterator]() {
            return new on(this.g())
        }
        h() {
            return new on(this.g())
        }
    }
    class nn extends jn {
        constructor(a) {
            super();
            this.g = a
        }
        next() {
            return this.g.next()
        }
        [Symbol.iterator]() {
            return new on(this.g)
        }
        h() {
            return new on(this.g)
        }
    }
    class on extends mn {
        constructor(a) {
            super(()=>a);
            this.i = a
        }
        next() {
            return this.i.next()
        }
    }
    ;function pn() {}
    ;function qn() {}
    qa(qn, pn);
    qn.prototype[Symbol.iterator] = function() {
        return ln(this.gb(!0)).h()
    }
    ;
    qn.prototype.clear = function() {
        const a = Array.from(this);
        for (const b of a)
            this.g.removeItem(b)
    }
    ;
    function rn(a) {
        this.g = a
    }
    qa(rn, qn);
    m = rn.prototype;
    m.set = function(a, b) {
        try {
            this.g.setItem(a, b)
        } catch (c) {
            if (0 == this.g.length)
                throw "Storage mechanism: Storage disabled";
            throw "Storage mechanism: Quota exceeded";
        }
    }
    ;
    m.get = function(a) {
        a = this.g.getItem(a);
        if ("string" !== typeof a && null !== a)
            throw "Storage mechanism: Invalid value was encountered";
        return a
    }
    ;
    m.gb = function(a) {
        var b = 0
          , c = this.g
          , d = new jn;
        d.next = function() {
            if (b >= c.length)
                return kn;
            var e = c.key(b++);
            if (a)
                return {
                    value: e,
                    done: !1
                };
            e = c.getItem(e);
            if ("string" !== typeof e)
                throw "Storage mechanism: Invalid value was encountered";
            return {
                value: e,
                done: !1
            }
        }
        ;
        return d
    }
    ;
    m.clear = function() {
        this.g.clear()
    }
    ;
    m.key = function(a) {
        return this.g.key(a)
    }
    ;
    function sn() {
        var a = null;
        try {
            a = window.localStorage || null
        } catch (b) {}
        this.g = a
    }
    qa(sn, rn);
    function tn(a) {
        var b;
        if (b = null != a.h)
            if (a = a.h,
            a.g)
                try {
                    a.g.setItem("__sak", "1"),
                    a.g.removeItem("__sak"),
                    b = !0
                } catch (c) {
                    b = !1
                }
            else
                b = !1;
        return b
    }
    function un(a) {
        if (tn(a))
            try {
                a.h.set("__webmonitoring_RateThrottler_history_hourlyRate", JSON.stringify(a.g))
            } catch (b) {}
    }
    const wn = class {
        constructor(a, b) {
            this.i = a;
            this.g = [];
            null === vn && (vn = null);
            this.h = null;
            b && (this.h = new sn);
            if (tn(this) && (a = this.h.get("__webmonitoring_RateThrottler_history_hourlyRate"),
            null != a))
                try {
                    this.g = JSON.parse(a) || []
                } catch (c) {}
            a = !1;
            Array.isArray(this.g) || (this.g = [],
            a = !0);
            for (; this.g.length > this.i; )
                this.g.shift(),
                a = !0;
            a && un(this)
        }
    }
    ;
    var vn = null;
    function xn(a) {
        xd.call(this);
        this.g = a;
        this.R = !1
    }
    qa(xn, xd);
    xn.prototype.isEnabled = function() {
        return this.R
    }
    ;
    function yn(a) {
        this.j = this.F = this.i = "";
        this.o = null;
        this.m = this.g = "";
        this.h = !1;
        var b;
        a instanceof yn ? (this.h = a.h,
        zn(this, a.i),
        this.F = a.F,
        this.j = a.j,
        An(this, a.o),
        this.g = a.g,
        Bn(this, a.l.clone()),
        this.m = a.m) : a && (b = String(a).match(ge)) ? (this.h = !1,
        zn(this, b[1] || "", !0),
        this.F = Cn(b[2] || ""),
        this.j = Cn(b[3] || "", !0),
        An(this, b[4]),
        this.g = Cn(b[5] || "", !0),
        Bn(this, b[6] || "", !0),
        this.m = Cn(b[7] || "")) : (this.h = !1,
        this.l = new Dn(null,this.h))
    }
    yn.prototype.toString = function() {
        var a = []
          , b = this.i;
        b && a.push(En(b, Fn, !0), ":");
        var c = this.j;
        if (c || "file" == b)
            a.push("//"),
            (b = this.F) && a.push(En(b, Fn, !0), "@"),
            a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")),
            c = this.o,
            null != c && a.push(":", String(c));
        if (c = this.g)
            this.j && "/" != c.charAt(0) && a.push("/"),
            a.push(En(c, "/" == c.charAt(0) ? Gn : Hn, !0));
        (c = this.l.toString()) && a.push("?", c);
        (c = this.m) && a.push("#", En(c, In));
        return a.join("")
    }
    ;
    yn.prototype.clone = function() {
        return new yn(this)
    }
    ;
    function zn(a, b, c) {
        a.i = c ? Cn(b, !0) : b;
        a.i && (a.i = a.i.replace(/:$/, ""))
    }
    function An(a, b) {
        if (b) {
            b = Number(b);
            if (isNaN(b) || 0 > b)
                throw Error("Bad port number " + b);
            a.o = b
        } else
            a.o = null
    }
    function Bn(a, b, c) {
        b instanceof Dn ? (a.l = b,
        Jn(a.l, a.h)) : (c || (b = En(b, Kn)),
        a.l = new Dn(b,a.h))
    }
    function Cn(a, b) {
        return a ? b ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : ""
    }
    function En(a, b, c) {
        return "string" === typeof a ? (a = encodeURI(a).replace(b, Ln),
        c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")),
        a) : null
    }
    function Ln(a) {
        a = a.charCodeAt(0);
        return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
    }
    var Fn = /[#\/\?@]/g
      , Hn = /[#\?:]/g
      , Gn = /[#\?]/g
      , Kn = /[#\?@]/g
      , In = /#/g;
    function Dn(a, b) {
        this.h = this.g = null;
        this.i = a || null;
        this.j = !!b
    }
    function Mn(a) {
        a.g || (a.g = new Map,
        a.h = 0,
        a.i && he(a.i, function(b, c) {
            a.add(decodeURIComponent(b.replace(/\+/g, " ")), c)
        }))
    }
    m = Dn.prototype;
    m.add = function(a, b) {
        Mn(this);
        this.i = null;
        a = Nn(this, a);
        var c = this.g.get(a);
        c || this.g.set(a, c = []);
        c.push(b);
        this.h += 1;
        return this
    }
    ;
    function On(a, b) {
        Mn(a);
        b = Nn(a, b);
        a.g.has(b) && (a.i = null,
        a.h -= a.g.get(b).length,
        a.g.delete(b))
    }
    m.clear = function() {
        this.g = this.i = null;
        this.h = 0
    }
    ;
    function Pn(a, b) {
        Mn(a);
        b = Nn(a, b);
        return a.g.has(b)
    }
    m.forEach = function(a, b) {
        Mn(this);
        this.g.forEach(function(c, d) {
            c.forEach(function(e) {
                a.call(b, e, d, this)
            }, this)
        }, this)
    }
    ;
    function Qn(a, b) {
        Mn(a);
        let c = [];
        if ("string" === typeof b)
            Pn(a, b) && (c = c.concat(a.g.get(Nn(a, b))));
        else
            for (a = Array.from(a.g.values()),
            b = 0; b < a.length; b++)
                c = c.concat(a[b]);
        return c
    }
    m.set = function(a, b) {
        Mn(this);
        this.i = null;
        a = Nn(this, a);
        Pn(this, a) && (this.h -= this.g.get(a).length);
        this.g.set(a, [b]);
        this.h += 1;
        return this
    }
    ;
    m.get = function(a, b) {
        if (!a)
            return b;
        a = Qn(this, a);
        return 0 < a.length ? String(a[0]) : b
    }
    ;
    m.toString = function() {
        if (this.i)
            return this.i;
        if (!this.g)
            return "";
        const a = []
          , b = Array.from(this.g.keys());
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            const f = encodeURIComponent(String(d))
              , g = Qn(this, d);
            for (d = 0; d < g.length; d++) {
                var e = f;
                "" !== g[d] && (e += "=" + encodeURIComponent(String(g[d])));
                a.push(e)
            }
        }
        return this.i = a.join("&")
    }
    ;
    m.clone = function() {
        var a = new Dn;
        a.i = this.i;
        this.g && (a.g = new Map(this.g),
        a.h = this.h);
        return a
    }
    ;
    function Nn(a, b) {
        b = String(b);
        a.j && (b = b.toLowerCase());
        return b
    }
    function Jn(a, b) {
        b && !a.j && (Mn(a),
        a.i = null,
        a.g.forEach(function(c, d) {
            var e = d.toLowerCase();
            d != e && (On(this, d),
            On(this, e),
            0 < c.length && (this.i = null,
            this.g.set(Nn(this, e), ya(c)),
            this.h += c.length))
        }, a));
        a.j = b
    }
    ;function Rn(a) {
        return (a = a.exec(db())) ? a[1] : ""
    }
    var Sn = function() {
        if (rc)
            return Rn(/Firefox\/([0-9.]+)/);
        if (Hb || Ib || Gb)
            return Rb;
        if (vc) {
            if (zb() || Ab()) {
                var a = Rn(/CriOS\/([0-9.]+)/);
                if (a)
                    return a
            }
            return Rn(/Chrome\/([0-9.]+)/)
        }
        if (wc && !zb())
            return Rn(/Version\/([0-9.]+)/);
        if (sc || tc) {
            if (a = /Version\/(\S+).*Mobile\/(\S+)/.exec(db()))
                return a[1] + "." + a[2]
        } else if (uc)
            return (a = Rn(/Android\s+([0-9.]+)/)) ? a : Rn(/Version\/([0-9.]+)/);
        return ""
    }();
    function Tn() {
        let a = "Other";
        Gb ? a = "Opera" : Hb ? a = "Internet Explorer" : rc ? a = "Firefox" : vc ? a = "Chrome" : wc && (a = "Safari");
        return a
    }
    function Un(a, b, c, d, e, f, g) {
        const k = new Map(Object.entries(a.g.getContext()));
        d.forEach((q,p)=>{
            k.set(p, q)
        }
        );
        k.set("url", b.g);
        k.set("type", "JavascriptError");
        k.set("error_message", c);
        k.set("browser", Tn());
        k.set("browser_version", Sn);
        k.set("os", Cb() ? "Chrome OS" : (wb() ? "Linux" === eb.platform : B("Linux")) ? "Linux" : Bb() ? "Windows" : xb() ? "Android" : yb() ? "iPhone" : B("iPad") ? "iPad" : B("iPod") ? "iPod" : Ab() ? "Mac" : "Unknown");
        k.set("os_version", Db());
        b = a.g.g;
        null !== b && k.set("channel", b);
        Sa(a.j) || k.set("guid", a.j);
        null !== e && k.set("src", e);
        null !== f && k.set("line", f.toString());
        null !== g && k.set("column", g.toString());
        return k
    }
    function Vn(a, b, c, d) {
        d = d || "";
        me(b + c, a.U.bind(a, b), "POST", d, Sa(d) ? {} : {
            "Content-Type": "text/plain"
        }, 6E4)
    }
    function Wn(a) {
        let b = "";
        for (const [c,d] of a)
            b += Sa(b) ? "?" : "&",
            b += c + "=" + encodeURIComponent(d);
        return b
    }
    const Xn = class extends xn {
        constructor(a) {
            super(a);
            this.N = 100;
            this.G = {};
            this.i = null;
            this.j = "";
            this.S = !0;
            this.F = 10;
            this.h = null;
            this.m = !1;
            this.I = "https://clients2.google.com/cr/staging_report"
        }
        lh(a) {
            this.S = a;
            return this
        }
        kh(a) {
            this.F = Math.min(a, 100);
            return this
        }
        Ze(a) {
            this.N = a;
            return this
        }
        Uf(a, b) {
            this.G[a] = b;
            return this
        }
        hh(a) {
            this.i = a;
            return this
        }
        ih(a) {
            this.j = a;
            return this
        }
        enable() {
            if (this.isEnabled())
                return !1;
            this.v = window.onerror;
            window.onerror = this.ca.bind(this);
            return this.R = !0
        }
        reportError(a, b, c, d, e, f=new Map) {
            var g = window.location.href;
            g = g instanceof yn ? g.clone() : new yn(g);
            a = null != e && null != e.message ? e.message : a;
            Vb('The following error:" %s" occurred at URL: %s', a, g.g);
            var k;
            if (k = "function" !== typeof this.i || this.i(g.g, a, b, c, d, e))
                if (k = this.m) {
                    k = Object.keys(this.G);
                    var q = 100;
                    for (let p = 0; p < k.length; ++p) {
                        const w = k[p];
                        (new RegExp(w)).test(a) && (q = this.G[w])
                    }
                    if (k = (100 * Math.random()).toFixed(6) >= this.N * q / 100 ? !1 : !0) {
                        0 <= this.F && null === this.h && (this.h = new wn(this.F,this.S));
                        if (null === this.h)
                            k = !1;
                        else {
                            a: {
                                k = this.h;
                                q = Date.now();
                                if (k.g.length == k.i)
                                    if (k.g[0] < q - 36E5)
                                        k.g.shift();
                                    else {
                                        k = !1;
                                        break a
                                    }
                                k.g.push(q);
                                un(k);
                                k = !0
                            }
                            k = !k
                        }
                        k = !k && this.m
                    }
                }
            k && (e = e || null,
            c = Un(this, g, a, f, b, c, void 0 !== d ? d : null),
            c.set("prod", this.g.i),
            c.set("ver", this.g.j),
            d = null !== e ? Wb(e.stack) : "",
            b = this.I,
            c = Wn(c),
            Sa(a) || (f = d.split("\n"),
            -1 < f[0].indexOf(a) && (f.splice(0, 1),
            d = f.join("\n"))),
            Vn(this, b, c, d),
            a = new Map,
            a.set("product", this.g.i),
            a.set("url", g.g),
            a.set("js_errors_count", "1"),
            g = Wb(this.g.g),
            Sa(g) || a.set("version", g),
            Vn(this, "https://clients2.google.com/cr/staging_perf", Wn(a)))
        }
        ca(a, b, c, d, e) {
            this.reportError(a, b, c, d, e);
            null != this.v && "function" === typeof this.v && this.v(a, b, c, d, e)
        }
        U(a, b) {
            ve(b.target)
        }
    }
    ;
    Xn.prototype.reportError = Xn.prototype.reportError;
    Xn.prototype.enable = Xn.prototype.enable;
    Xn.prototype.setClientId = Xn.prototype.ih;
    Xn.prototype.setCallback = Xn.prototype.hh;
    Xn.prototype.addPerErrorMessageSampling = Xn.prototype.Uf;
    Xn.prototype.setGlobalSampling = Xn.prototype.Ze;
    Xn.prototype.setMaxErrorsPerHour = Xn.prototype.kh;
    Xn.prototype.setUseLocalStorage = Xn.prototype.lh;
    function Yn(a) {
        xd.call(this);
        this.config = new hn(a);
        this.g = {}
    }
    qa(Yn, xd);
    ha("webmonitoring.Monitoring", Yn);
    Yn.prototype.bc = function(a) {
        this.config.bc(a);
        return this
    }
    ;
    Yn.prototype.setVersion = Yn.prototype.bc;
    Yn.prototype.pd = function(a) {
        this.config.pd(a);
        return this
    }
    ;
    Yn.prototype.setChannel = Yn.prototype.pd;
    Yn.prototype.qd = function(a) {
        this.config.qd(a);
        return this
    }
    ;
    Yn.prototype.setContext = Yn.prototype.qd;
    Yn.prototype.getContext = function() {
        return this.config.getContext()
    }
    ;
    Yn.prototype.be = function() {
        null == this.g[2] && (this.g[2] = new Xn(this.config));
        return this.g[2]
    }
    ;
    Yn.prototype.createJsErrorsReporter = Yn.prototype.be;
    function Zn(a, b, {ee: c=()=>{}
    , Uc: d=()=>{}
    , Cg: e=!1, qj: f=100, hj: g=q=>new Yn(q), Qi: k}={}) {
        a = g(a);
        a.bc(b);
        const q = a.be();
        e && (q.I = "https://clients2.google.com/cr/report");
        q.m = !0;
        q.Ze(f);
        He({
            reportError: function(p, w, u, z, H) {
                q.reportError(p, w, u, z, H, k?.())
            }
        }, c, d)
    }
    ;var $n = /#(.)(.)(.)/
      , ao = /^#(?:[0-9a-f]{3}){1,2}$/i;
    function bo(a) {
        if (!ao.test(a))
            throw Error("'" + a + "' is not a valid hex color");
        4 == a.length && (a = a.replace($n, "#$1$1$2$2$3$3"));
        a = parseInt(a.toLowerCase().slice(1), 16);
        var b = [a >> 16, a >> 8 & 255, a & 255];
        a = b[0] / 255;
        const c = b[1] / 255;
        b = b[2] / 255;
        const d = Math.max(a, c, b)
          , e = Math.min(a, c, b);
        let f = 0
          , g = 0;
        const k = .5 * (d + e);
        d != e && (d == a ? f = 60 * (c - b) / (d - e) : d == c ? f = 60 * (b - a) / (d - e) + 120 : d == b && (f = 60 * (a - c) / (d - e) + 240),
        g = 0 < k && .5 >= k ? (d - e) / (2 * k) : (d - e) / (2 - 2 * k));
        return [Math.round(f + 360) % 360, g, k]
    }
    ;function co(a, b) {
        b = b instanceof Za && b.constructor === Za ? b.g : "type_error:SafeStyleSheet";
        if (Hb && void 0 !== a.cssText)
            a.cssText = b;
        else if (n.trustedTypes)
            if ("textContent"in a)
                a.textContent = b;
            else if (3 == a.nodeType)
                a.data = String(b);
            else if (a.firstChild && 3 == a.firstChild.nodeType) {
                for (; a.lastChild != a.firstChild; )
                    a.removeChild(a.lastChild);
                a.firstChild.data = String(b)
            } else {
                for (var c; c = a.firstChild; )
                    a.removeChild(c);
                a.appendChild(ac(a).createTextNode(String(b)))
            }
        else
            a.innerHTML = b
    }
    ;/*

 Copyright 2021 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
    function eo(a) {
        return 0 > a ? -1 : 0 === a ? 0 : 1
    }
    function fo(a) {
        a %= 360;
        0 > a && (a += 360);
        return a
    }
    function go(a, b) {
        return [a[0] * b[0][0] + a[1] * b[0][1] + a[2] * b[0][2], a[0] * b[1][0] + a[1] * b[1][1] + a[2] * b[1][2], a[0] * b[2][0] + a[1] * b[2][1] + a[2] * b[2][2]]
    }
    ;const ho = [[.41233895, .35762064, .18051042], [.2126, .7152, .0722], [.01932141, .11916382, .95034478]]
      , io = [[3.2413774792388685, -1.5376652402851851, -.49885366846268053], [-.9691452513005321, 1.8758853451067872, .04156585616912061], [.05562093689691305, -.20395524564742123, 1.0571799111220335]]
      , jo = [95.047, 100, 108.883];
    function ko(a, b, c) {
        return (-16777216 | (a & 255) << 16 | (b & 255) << 8 | c & 255) >>> 0
    }
    function lo(a) {
        return go([mo(a >> 16 & 255), mo(a >> 8 & 255), mo(a & 255)], ho)
    }
    function no(a) {
        a = (a + 16) / 116;
        const b = a * a * a;
        return 100 * (b > 216 / 24389 ? b : (116 * a - 16) / (24389 / 27))
    }
    function mo(a) {
        a /= 255;
        return .040449936 >= a ? a / 12.92 * 100 : 100 * Math.pow((a + .055) / 1.055, 2.4)
    }
    function oo(a) {
        a /= 100;
        a = Math.round(255 * (.0031308 >= a ? 12.92 * a : 1.055 * Math.pow(a, 1 / 2.4) - .055));
        return 0 > a ? 0 : 255 < a ? 255 : a
    }
    function po(a) {
        return a > 216 / 24389 ? Math.pow(a, 1 / 3) : (24389 / 27 * a + 16) / 116
    }
    ;var qo = class {
        constructor(a, b, c, d, e, f, g, k, q, p) {
            this.i = a;
            this.j = b;
            this.l = c;
            this.o = d;
            this.c = e;
            this.m = f;
            this.h = g;
            this.g = k;
            this.F = q;
            this.z = p
        }
    }
      , U = function(a=jo, b=200 / Math.PI * no(50) / 100, c=50, d=2, e=!1) {
        var f = .401288 * a[0] + .650173 * a[1] + -.051461 * a[2];
        const g = -.250268 * a[0] + 1.204414 * a[1] + .045854 * a[2]
          , k = -.002079 * a[0] + .048952 * a[1] + .953127 * a[2];
        d = .8 + d / 10;
        if (.9 <= d) {
            var q = 10 * (d - .9);
            q = .59 * (1 - q) + .69 * q
        } else
            q = 10 * (d - .8),
            q = .525 * (1 - q) + .59 * q;
        e = e ? 1 : d * (1 - 1 / 3.6 * Math.exp((-b - 42) / 92));
        e = 1 < e ? 1 : 0 > e ? 0 : e;
        e = [100 / f * e + 1 - e, 100 / g * e + 1 - e, 100 / k * e + 1 - e];
        var p = 1 / (5 * b + 1);
        p *= p * p * p;
        const w = 1 - p;
        b = p * b + .1 * w * w * Math.cbrt(5 * b);
        a = no(c) / a[1];
        c = .725 / Math.pow(a, .2);
        f = [Math.pow(b * e[0] * f / 100, .42), Math.pow(b * e[1] * g / 100, .42), Math.pow(b * e[2] * k / 100, .42)];
        f = [400 * f[0] / (f[0] + 27.13), 400 * f[1] / (f[1] + 27.13), 400 * f[2] / (f[2] + 27.13)];
        return new qo(a,(2 * f[0] + f[1] + .05 * f[2]) * c,c,c,q,d,e,b,Math.pow(b, .25),1.48 + Math.sqrt(a))
    }();
    function ro(a) {
        var b = mo((a & 16711680) >> 16)
          , c = mo((a & 65280) >> 8)
          , d = mo(a & 255);
        a = .41233895 * b + .35762064 * c + .18051042 * d;
        var e = .2126 * b + .7152 * c + .0722 * d;
        d = .01932141 * b + .11916382 * c + .95034478 * d;
        b = U.h[0] * (.401288 * a + .650173 * e - .051461 * d);
        c = U.h[1] * (-.250268 * a + 1.204414 * e + .045854 * d);
        a = U.h[2] * (-.002079 * a + .048952 * e + .953127 * d);
        var f = Math.pow(U.g * Math.abs(b) / 100, .42);
        d = Math.pow(U.g * Math.abs(c) / 100, .42);
        e = Math.pow(U.g * Math.abs(a) / 100, .42);
        b = 400 * eo(b) * f / (f + 27.13);
        c = 400 * eo(c) * d / (d + 27.13);
        f = 400 * eo(a) * e / (e + 27.13);
        const g = (11 * b + -12 * c + f) / 11
          , k = (b + c - 2 * f) / 9;
        a = 180 * Math.atan2(k, g) / Math.PI;
        a = 0 > a ? a + 360 : 360 <= a ? a - 360 : a;
        e = a * Math.PI / 180;
        d = 100 * Math.pow((40 * b + 20 * c + f) / 20 * U.l / U.j, U.c * U.z);
        b = Math.pow(5E4 / 13 * .25 * (Math.cos((20.14 > a ? a + 360 : a) * Math.PI / 180 + 2) + 3.8) * U.m * U.o * Math.sqrt(g * g + k * k) / ((20 * b + 20 * c + 21 * f) / 20 + .305), .9) * Math.pow(1.64 - Math.pow(.29, U.i), .73) * Math.sqrt(d / 100);
        c = 1 / .0228 * Math.log(1 + .0228 * b * U.F);
        return new so(a,b,d,(1 + 100 * .007) * d / (1 + .007 * d),c * Math.cos(e),c * Math.sin(e))
    }
    var so = class {
        constructor(a, b, c, d, e, f) {
            this.g = a;
            this.chroma = b;
            this.h = c;
            this.l = d;
            this.i = e;
            this.j = f
        }
        distance(a) {
            const b = this.l - a.l
              , c = this.i - a.i;
            a = this.j - a.j;
            return 1.41 * Math.pow(Math.sqrt(b * b + c * c + a * a), .63)
        }
        toInt() {
            var a = Math.pow((0 === this.chroma || 0 === this.h ? 0 : this.chroma / Math.sqrt(this.h / 100)) / Math.pow(1.64 - Math.pow(.29, U.i), .73), 1 / .9)
              , b = this.g * Math.PI / 180
              , c = U.j * Math.pow(this.h / 100, 1 / U.c / U.z) / U.l
              , d = Math.sin(b)
              , e = Math.cos(b);
            a = 23 * (c + .305) * a / (5E4 / 13 * (Math.cos(b + 2) + 3.8) * 5.75 * U.m * U.o + 11 * a * e + 108 * a * d);
            e *= a;
            b = a * d;
            a = (460 * c + 451 * e + 288 * b) / 1403;
            d = (460 * c - 891 * e - 261 * b) / 1403;
            e = (460 * c - 220 * e - 6300 * b) / 1403;
            c = 100 / U.g * eo(a) * Math.pow(Math.max(0, 27.13 * Math.abs(a) / (400 - Math.abs(a))), 1 / .42) / U.h[0];
            d = 100 / U.g * eo(d) * Math.pow(Math.max(0, 27.13 * Math.abs(d) / (400 - Math.abs(d))), 1 / .42) / U.h[1];
            b = 100 / U.g * eo(e) * Math.pow(Math.max(0, 27.13 * Math.abs(e) / (400 - Math.abs(e))), 1 / .42) / U.h[2];
            e = 1.86206786 * c - 1.01125463 * d + .14918677 * b;
            a = .38752654 * c + .62144744 * d - .00897398 * b;
            c = -.0158415 * c - .03412294 * d + 1.04996444 * b;
            return ko(oo(io[0][0] * e + io[0][1] * a + io[0][2] * c), oo(io[1][0] * e + io[1][1] * a + io[1][2] * c), oo(io[2][0] * e + io[2][1] * a + io[2][2] * c))
        }
    }
    ;
    function to(a) {
        return (a + 8 * Math.PI) % (2 * Math.PI)
    }
    function uo(a) {
        a /= 100;
        return 255 * (.0031308 >= a ? 12.92 * a : 1.055 * Math.pow(a, 1 / 2.4) - .055)
    }
    function vo(a) {
        const b = Math.pow(Math.abs(a), .42);
        return 400 * eo(a) * b / (b + 27.13)
    }
    function wo(a) {
        var b = go(a, xo);
        a = vo(b[0]);
        const c = vo(b[1]);
        b = vo(b[2]);
        return Math.atan2((a + c - 2 * b) / 9, (11 * a + -12 * c + b) / 11)
    }
    function yo(a) {
        const b = Math.abs(a);
        return eo(a) * Math.pow(Math.max(0, 27.13 * b / (400 - b)), 1 / .42)
    }
    function zo(a, b, c) {
        if (1E-4 > b || 1E-4 > c || 99.9999 < c)
            return a = oo(no(c)),
            ko(a, a, a);
        a = fo(a);
        a = a / 180 * Math.PI;
        c = no(c);
        a: {
            var d = 11 * Math.sqrt(c)
              , e = 1 / Math.pow(1.64 - Math.pow(.29, U.i), .73)
              , f = 5E4 / 13 * (Math.cos(a + 2) + 3.8) * .25 * U.m * U.o
              , g = Math.sin(a)
              , k = Math.cos(a);
            for (var q = 0; 5 > q; q++) {
                var p = d / 100
                  , w = Math.pow((0 === b || 0 === d ? 0 : b / Math.sqrt(p)) * e, 1 / .9);
                p = U.j * Math.pow(p, 1 / U.c / U.z) / U.l;
                var u = 23 * (p + .305) * w / (23 * f + 11 * w * k + 108 * w * g);
                w = u * k;
                u *= g;
                p = go([yo((460 * p + 451 * w + 288 * u) / 1403), yo((460 * p - 891 * w - 261 * u) / 1403), yo((460 * p - 220 * w - 6300 * u) / 1403)], Ao);
                if (0 > p[0] || 0 > p[1] || 0 > p[2])
                    break;
                w = Bo[0] * p[0] + Bo[1] * p[1] + Bo[2] * p[2];
                if (0 >= w)
                    break;
                if (4 === q || .002 > Math.abs(w - c)) {
                    if (100.01 < p[0] || 100.01 < p[1] || 100.01 < p[2])
                        break;
                    b = ko(oo(p[0]), oo(p[1]), oo(p[2]));
                    break a
                }
                d -= (w - c) * d / (2 * w)
            }
            b = 0
        }
        if (0 !== b)
            a = b;
        else {
            d = b = [-1, -1, -1];
            f = e = 0;
            g = !1;
            k = !0;
            for (q = 0; 12 > q; q++) {
                {
                    u = Bo[0];
                    const z = Bo[1]
                      , H = Bo[2];
                    p = 1 >= q % 4 ? 0 : 100;
                    w = 0 === q % 2 ? 0 : 100;
                    4 > q ? (u = (c - p * z - w * H) / u,
                    p = 0 <= u && 100 >= u ? [u, p, w] : [-1, -1, -1]) : 8 > q ? (u = (c - w * u - p * H) / z,
                    p = 0 <= u && 100 >= u ? [w, u, p] : [-1, -1, -1]) : (u = (c - p * u - w * z) / H,
                    p = 0 <= u && 100 >= u ? [p, w, u] : [-1, -1, -1])
                }
                if (!(0 > p[0]))
                    if (w = wo(p),
                    !g)
                        d = b = p,
                        f = e = w,
                        g = !0;
                    else if (k || to(w - e) < to(f - e))
                        k = !1,
                        to(a - e) < to(w - e) ? (d = p,
                        f = w) : (b = p,
                        e = w)
            }
            d = [b, d];
            c = d[0];
            b = wo(c);
            d = d[1];
            for (e = 0; 3 > e; e++)
                if (c[e] !== d[e])
                    for (c[e] < d[e] ? (f = Math.floor(uo(c[e]) - .5),
                    g = Math.ceil(uo(d[e]) - .5)) : (f = Math.ceil(uo(c[e]) - .5),
                    g = Math.floor(uo(d[e]) - .5)),
                    k = 0; 8 > k && !(1 >= Math.abs(g - f)); k++)
                        q = Math.floor((f + g) / 2),
                        p = c[e],
                        p = (Co[q] - p) / (d[e] - p),
                        p = [c[0] + (d[0] - c[0]) * p, c[1] + (d[1] - c[1]) * p, c[2] + (d[2] - c[2]) * p],
                        w = wo(p),
                        to(a - b) < to(w - b) ? (d = p,
                        g = q) : (c = p,
                        b = w,
                        f = q);
            a = [(c[0] + d[0]) / 2, (c[1] + d[1]) / 2, (c[2] + d[2]) / 2];
            a = ko(oo(a[0]), oo(a[1]), oo(a[2]))
        }
        return a
    }
    var xo = [[.001200833568784504, .002389694492170889, 2.795742885861124E-4], [5.891086651375999E-4, .0029785502573438758, 3.270666104008398E-4], [1.0146692491640572E-4, 5.364214359186694E-4, .0032979401770712076]]
      , Ao = [[1373.2198709594231, -1100.4251190754821, -7.278681089101213], [-271.815969077903, 559.6580465940733, -32.46047482791194], [1.9622899599665666, -57.173814538844006, 308.7233197812385]]
      , Bo = [.2126, .7152, .0722]
      , Co = [.015176349177441876, .045529047532325624, .07588174588720938, .10623444424209313, .13658714259697685, .16693984095186062, .19729253930674434, .2276452376616281, .2579979360165119, .28835063437139563, .3188300904430532, .350925934958123, .3848314933096426, .42057480301049466, .458183274052838, .4976837250274023, .5391024159806381, .5824650784040898, .6277969426914107, .6751227633498623, .7244668422128921, .775853049866786, .829304845476233, .8848452951698498, .942497089126609, 1.0022825574869039, 1.0642236851973577, 1.1283421258858297, 1.1946592148522128, 1.2631959812511864, 1.3339731595349034, 1.407011200216447, 1.4823302800086415, 1.5599503113873272, 1.6398909516233677, 1.7221716113234105, 1.8068114625156377, 1.8938294463134073, 1.9832442801866852, 2.075074464868551, 2.1693382909216234, 2.2660538449872063, 2.36523901573795, 2.4669114995532007, 2.5710888059345764, 2.6777882626779785, 2.7870270208169257, 2.898822059350997, 3.0131901897720907, 3.1301480604002863, 3.2497121605402226, 3.3718988244681087, 3.4967242352587946, 3.624204428461639, 3.754355295633311, 3.887192587735158, 4.022731918402185, 4.160988767090289, 4.301978482107941, 4.445716283538092, 4.592217266055746, 4.741496401646282, 4.893568542229298, 5.048448422192488, 5.20615066083972, 5.3666897647573375, 5.5300801301023865, 5.696336044816294, 5.865471690767354, 6.037501145825082, 6.212438385869475, 6.390297286737924, 6.571091626112461, 6.7548350853498045, 6.941541251256611, 7.131223617812143, 7.323895587840543, 7.5195704746346665, 7.7182615035334345, 7.919981813454504, 8.124744458384042, 8.332562408825165, 8.543448553206703, 8.757415699253682, 8.974476575321063, 9.194643831691977, 9.417930041841839, 9.644347703669503, 9.873909240696694, 10.106627003236781, 10.342513269534024, 10.58158024687427, 10.8238400726681, 11.069304815507364, 11.317986476196008, 11.569896988756009, 11.825048221409341, 12.083451977536606, 12.345119996613247, 12.610063955123938, 12.878295467455942, 13.149826086772048, 13.42466730586372, 13.702830557985108, 13.984327217668513, 14.269168601521828, 14.55736596900856, 14.848930523210871, 15.143873411576273, 15.44220572664832, 15.743938506781891, 16.04908273684337, 16.35764934889634, 16.66964922287304, 16.985093187232053, 17.30399201960269, 17.62635644741625, 17.95219714852476, 18.281524751807332, 18.614349837764564, 18.95068293910138, 19.290534541298456, 19.633915083172692, 19.98083495742689, 20.331304511189067, 20.685334046541502, 21.042933821039977, 21.404114048223256, 21.76888489811322, 22.137256497705877, 22.50923893145328, 22.884842241736916, 23.264076429332462, 23.6469514538663, 24.033477234264016, 24.42366364919083, 24.817520537484558, 25.21505769858089, 25.61628489293138, 26.021211842414342, 26.429848230738664, 26.842203703840827, 27.258287870275353, 27.678110301598522, 28.10168053274597, 28.529008062403893, 28.96010235337422, 29.39497283293396, 29.83362889318845, 30.276079891419332, 30.722335150426627, 31.172403958865512, 31.62629557157785, 32.08401920991837, 32.54558406207592, 33.010999283389665, 33.4802739966603, 33.953417292456834, 34.430438229418264, 34.911345834551085, 35.39614910352207, 35.88485700094671, 36.37747846067349, 36.87402238606382, 37.37449765026789, 37.87891309649659, 38.38727753828926, 38.89959975977785, 39.41588851594697, 39.93615253289054, 40.460400508064545, 40.98864111053629, 41.520882981230194, 42.05713473317016, 42.597404951718396, 43.141702194811224, 43.6900349931913, 44.24241185063697, 44.798841244188324, 45.35933162437017, 45.92389141541209, 46.49252901546552, 47.065252796817916, 47.64207110610409, 48.22299226451468, 48.808024568002054, 49.3971762874833, 49.9904556690408, 50.587870934119984, 51.189430279724725, 51.79514187861014, 52.40501387947288, 53.0190544071392, 53.637271562750364, 54.259673423945976, 54.88626804504493, 55.517063457223934, 56.15206766869424, 56.79128866487574, 57.43473440856916, 58.08241284012621, 58.734331877617365, 59.39049941699807, 60.05092333227251, 60.715611475655585, 61.38457167773311, 62.057811747619894, 62.7353394731159, 63.417162620860914, 64.10328893648692, 64.79372614476921, 65.48848194977529, 66.18756403501224, 66.89098006357258, 67.59873767827808, 68.31084450182222, 69.02730813691093, 69.74813616640164, 70.47333615344107, 71.20291564160104, 71.93688215501312, 72.67524319850172, 73.41800625771542, 74.16517879925733, 74.9167682708136, 75.67278210128072, 76.43322770089146, 77.1981124613393, 77.96744375590167, 78.74122893956174, 79.51947534912904, 80.30219030335869, 81.08938110306934, 81.88105503125999, 82.67721935322541, 83.4778813166706, 84.28304815182372, 85.09272707154808, 85.90692527145302, 86.72564993000343, 87.54890820862819, 88.3767072518277, 89.2090541872801, 90.04595612594655, 90.88742016217518, 91.73345337380438, 92.58406282226491, 93.43925555268066, 94.29903859396902, 95.16341895893969, 96.03240364439274, 96.9059996312159, 97.78421388448044, 98.6670533535366, 99.55452497210776];
    function Do(a, b, c) {
        return new Eo(zo(a, b, c))
    }
    function Fo(a, b) {
        const c = ro(b);
        a.i = c.g;
        a.h = c.chroma;
        a.j = 116 * po(lo(b)[1] / 100) - 16;
        a.l = b
    }
    var Eo = class {
        toInt() {
            return this.l
        }
        get g() {
            return this.i
        }
        set g(a) {
            Fo(this, zo(a, this.h, this.j))
        }
        get chroma() {
            return this.h
        }
        set chroma(a) {
            Fo(this, zo(this.i, a, this.j))
        }
        get tone() {
            return this.j
        }
        set tone(a) {
            Fo(this, zo(this.i, this.h, a))
        }
        constructor(a) {
            this.l = a;
            const b = ro(a);
            this.i = b.g;
            this.h = b.chroma;
            this.j = 116 * po(lo(a)[1] / 100) - 16;
            this.l = a
        }
    }
    ;
    /*

 Copyright 2022 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
    function Go(a, b) {
        const c = a > b ? a : b;
        return (c + 5) / ((c === b ? a : b) + 5)
    }
    ;function V(a) {
        return new Ho(a.name ?? "",a.u,a.tone,a.P ?? !1,a.background,a.Na,a.J,a.ba)
    }
    function Io(a) {
        if (0 > a || 100 < a)
            var b = -1;
        else {
            var c = no(a);
            b = 4.5 * (c + 5) - 5;
            c = Go(b, c);
            var d = Math.abs(c - 4.5);
            4.5 > c && .04 < d ? b = -1 : (b = 116 * po(b / 100) - 16 + .4,
            b = 0 > b || 100 < b ? -1 : b)
        }
        b = 0 > b ? 100 : b;
        if (0 > a || 100 < a)
            c = -1;
        else {
            d = no(a);
            c = (d + 5) / 4.5 - 5;
            d = Go(d, c);
            var e = Math.abs(d - 4.5);
            4.5 > d && .04 < e ? c = -1 : (c = 116 * po(c / 100) - 16 - .4,
            c = 0 > c || 100 < c ? -1 : c)
        }
        c = 0 > c ? 0 : c;
        d = Go(no(0 > b ? 0 : 100 < b ? 100 : b), no(0 > a ? 0 : 100 < a ? 100 : a));
        e = Go(no(0 > c ? 0 : 100 < c ? 100 : c), no(0 > a ? 0 : 100 < a ? 100 : a));
        return 60 > Math.round(a) ? (a = .1 > Math.abs(d - e) && 4.5 > d && 4.5 > e,
        4.5 <= d || d >= e || a ? b : c) : 4.5 <= e || e >= d ? c : b
    }
    var Ho = class {
        constructor(a, b, c, d, e, f, g, k) {
            this.name = a;
            this.u = b;
            this.tone = c;
            this.P = d;
            this.background = e;
            this.Na = f;
            this.J = g;
            this.ba = k;
            if (!e && f)
                throw Error(`Color ${a} has secondBackground` + "defined, but background is not defined.");
            if (!e && g)
                throw Error(`Color ${a} has contrastCurve` + "defined, but background is not defined.");
            if (e && !g)
                throw Error(`Color ${a} has background` + "defined, but contrastCurve is not defined.");
        }
    }
    ;
    /*

 Copyright 2023 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
    var Y = class {
    }
    ;
    var Jo = class {
    }
    ;
    function Ko(a) {
        return 5 === a.F || 6 === a.F
    }
    function Z(a) {
        return 0 === a.F
    }
    function Lo(a) {
        return a.g ? Mo : No
    }
    V({
        name: "primary_palette_key_color",
        u: a=>a.i,
        tone: a=>a.i.g.tone
    });
    V({
        name: "secondary_palette_key_color",
        u: a=>a.j,
        tone: a=>a.j.g.tone
    });
    V({
        name: "tertiary_palette_key_color",
        u: a=>a.l,
        tone: a=>a.l.g.tone
    });
    V({
        name: "neutral_palette_key_color",
        u: a=>a.h,
        tone: a=>a.h.g.tone
    });
    V({
        name: "neutral_variant_palette_key_color",
        u: a=>a.m,
        tone: a=>a.m.g.tone
    });
    var Oo = V({
        name: "background",
        u: a=>a.h,
        tone: a=>a.g ? 6 : 98,
        P: !0
    });
    V({
        name: "on_background",
        u: a=>a.h,
        tone: a=>a.g ? 90 : 10,
        background: ()=>Oo,
        J: new Y
    });
    V({
        name: "surface",
        u: a=>a.h,
        tone: a=>a.g ? 6 : 98,
        P: !0
    });
    var No = V({
        name: "surface_dim",
        u: a=>a.h,
        tone: a=>a.g ? 6 : 87,
        P: !0
    })
      , Mo = V({
        name: "surface_bright",
        u: a=>a.h,
        tone: a=>a.g ? 24 : 98,
        P: !0
    });
    V({
        name: "surface_container_lowest",
        u: a=>a.h,
        tone: a=>a.g ? 4 : 100,
        P: !0
    });
    V({
        name: "surface_container_low",
        u: a=>a.h,
        tone: a=>a.g ? 10 : 96,
        P: !0
    });
    V({
        name: "surface_container",
        u: a=>a.h,
        tone: a=>a.g ? 12 : 94,
        P: !0
    });
    V({
        name: "surface_container_high",
        u: a=>a.h,
        tone: a=>a.g ? 17 : 92,
        P: !0
    });
    V({
        name: "surface_container_highest",
        u: a=>a.h,
        tone: a=>a.g ? 22 : 90,
        P: !0
    });
    V({
        name: "on_surface",
        u: a=>a.h,
        tone: a=>a.g ? 90 : 10,
        background: a=>Lo(a),
        J: new Y
    });
    V({
        name: "surface_variant",
        u: a=>a.m,
        tone: a=>a.g ? 30 : 90,
        P: !0
    });
    V({
        name: "on_surface_variant",
        u: a=>a.m,
        tone: a=>a.g ? 80 : 30,
        background: a=>Lo(a),
        J: new Y
    });
    var Po = V({
        name: "inverse_surface",
        u: a=>a.h,
        tone: a=>a.g ? 90 : 20
    });
    V({
        name: "inverse_on_surface",
        u: a=>a.h,
        tone: a=>a.g ? 20 : 95,
        background: ()=>Po,
        J: new Y
    });
    V({
        name: "outline",
        u: a=>a.m,
        tone: a=>a.g ? 60 : 50,
        background: a=>Lo(a),
        J: new Y
    });
    V({
        name: "outline_variant",
        u: a=>a.m,
        tone: a=>a.g ? 30 : 80,
        background: a=>Lo(a),
        J: new Y
    });
    V({
        name: "shadow",
        u: a=>a.h,
        tone: ()=>0
    });
    V({
        name: "scrim",
        u: a=>a.h,
        tone: ()=>0
    });
    V({
        name: "surface_tint",
        u: a=>a.i,
        tone: a=>a.g ? 80 : 40,
        P: !0
    });
    var Qo = V({
        name: "primary",
        u: a=>a.i,
        tone: a=>Z(a) ? a.g ? 100 : 0 : a.g ? 80 : 40,
        P: !0,
        background: a=>Lo(a),
        J: new Y,
        ba: ()=>new Jo
    });
    V({
        name: "on_primary",
        u: a=>a.i,
        tone: a=>Z(a) ? a.g ? 10 : 90 : a.g ? 20 : 100,
        background: ()=>Qo,
        J: new Y
    });
    var Ro = V({
        name: "primary_container",
        u: a=>a.i,
        tone: a=>Ko(a) ? a.v.tone : Z(a) ? a.g ? 85 : 25 : a.g ? 30 : 90,
        P: !0,
        background: a=>Lo(a),
        J: new Y,
        ba: ()=>new Jo
    });
    V({
        name: "on_primary_container",
        u: a=>a.i,
        tone: a=>Ko(a) ? Io(Ro.tone(a)) : Z(a) ? a.g ? 0 : 100 : a.g ? 90 : 10,
        background: ()=>Ro,
        J: new Y
    });
    V({
        name: "inverse_primary",
        u: a=>a.i,
        tone: a=>a.g ? 40 : 80,
        background: ()=>Po,
        J: new Y
    });
    var So = V({
        name: "secondary",
        u: a=>a.j,
        tone: a=>a.g ? 80 : 40,
        P: !0,
        background: a=>Lo(a),
        J: new Y,
        ba: ()=>new Jo
    });
    V({
        name: "on_secondary",
        u: a=>a.j,
        tone: a=>Z(a) ? a.g ? 10 : 100 : a.g ? 20 : 100,
        background: ()=>So,
        J: new Y
    });
    var To = V({
        name: "secondary_container",
        u: a=>a.j,
        tone: a=>{
            var b = a.g ? 30 : 90;
            if (Z(a))
                a = a.g ? 30 : 85;
            else if (Ko(a)) {
                var c = a.j.h
                  , d = a.j.chroma;
                let e = b;
                b = Do(c, d, b);
                if (b.chroma < d) {
                    let f = b.chroma;
                    for (; b.chroma < d; ) {
                        e += a.g ? 1 : -1;
                        const g = Do(c, d, e);
                        if (f > g.chroma)
                            break;
                        if (.4 > Math.abs(g.chroma - d))
                            break;
                        Math.abs(g.chroma - d) < Math.abs(b.chroma - d) && (b = g);
                        f = Math.max(f, g.chroma)
                    }
                }
                a = e
            } else
                a = b;
            return a
        }
        ,
        P: !0,
        background: a=>Lo(a),
        J: new Y,
        ba: ()=>new Jo
    });
    V({
        name: "on_secondary_container",
        u: a=>a.j,
        tone: a=>Ko(a) ? Io(To.tone(a)) : a.g ? 90 : 10,
        background: ()=>To,
        J: new Y
    });
    var Uo = V({
        name: "tertiary",
        u: a=>a.l,
        tone: a=>Z(a) ? a.g ? 90 : 25 : a.g ? 80 : 40,
        P: !0,
        background: a=>Lo(a),
        J: new Y,
        ba: ()=>new Jo
    });
    V({
        name: "on_tertiary",
        u: a=>a.l,
        tone: a=>Z(a) ? a.g ? 10 : 90 : a.g ? 20 : 100,
        background: ()=>Uo,
        J: new Y
    });
    var Vo = V({
        name: "tertiary_container",
        u: a=>a.l,
        tone: a=>{
            if (Z(a))
                return a.g ? 60 : 49;
            if (!Ko(a))
                return a.g ? 30 : 90;
            a = new Eo(a.l.tone(a.v.tone));
            const b = 16 < Math.round(a.chroma)
              , c = 65 > Math.round(a.tone);
            return (90 <= Math.round(a.g) && 111 >= Math.round(a.g) && b && c ? Do(a.g, a.chroma, 70) : a).tone
        }
        ,
        P: !0,
        background: a=>Lo(a),
        J: new Y,
        ba: ()=>new Jo
    });
    V({
        name: "on_tertiary_container",
        u: a=>a.l,
        tone: a=>Z(a) ? a.g ? 0 : 100 : Ko(a) ? Io(Vo.tone(a)) : a.g ? 90 : 10,
        background: ()=>Vo,
        J: new Y
    });
    var Wo = V({
        name: "error",
        u: a=>a.o,
        tone: a=>a.g ? 80 : 40,
        P: !0,
        background: a=>Lo(a),
        J: new Y,
        ba: ()=>new Jo
    });
    V({
        name: "on_error",
        u: a=>a.o,
        tone: a=>a.g ? 20 : 100,
        background: ()=>Wo,
        J: new Y
    });
    var Xo = V({
        name: "error_container",
        u: a=>a.o,
        tone: a=>a.g ? 30 : 90,
        P: !0,
        background: a=>Lo(a),
        J: new Y,
        ba: ()=>new Jo
    });
    V({
        name: "on_error_container",
        u: a=>a.o,
        tone: a=>a.g ? 90 : 10,
        background: ()=>Xo,
        J: new Y
    });
    var Yo = V({
        name: "primary_fixed",
        u: a=>a.i,
        tone: a=>Z(a) ? 40 : 90,
        P: !0,
        background: a=>Lo(a),
        J: new Y,
        ba: ()=>new Jo
    })
      , Zo = V({
        name: "primary_fixed_dim",
        u: a=>a.i,
        tone: a=>Z(a) ? 30 : 80,
        P: !0,
        background: a=>Lo(a),
        J: new Y,
        ba: ()=>new Jo
    });
    V({
        name: "on_primary_fixed",
        u: a=>a.i,
        tone: a=>Z(a) ? 100 : 10,
        background: ()=>Zo,
        Na: ()=>Yo,
        J: new Y
    });
    V({
        name: "on_primary_fixed_variant",
        u: a=>a.i,
        tone: a=>Z(a) ? 90 : 30,
        background: ()=>Zo,
        Na: ()=>Yo,
        J: new Y
    });
    var $o = V({
        name: "secondary_fixed",
        u: a=>a.j,
        tone: a=>Z(a) ? 80 : 90,
        P: !0,
        background: a=>Lo(a),
        J: new Y,
        ba: ()=>new Jo
    })
      , ap = V({
        name: "secondary_fixed_dim",
        u: a=>a.j,
        tone: a=>Z(a) ? 70 : 80,
        P: !0,
        background: a=>Lo(a),
        J: new Y,
        ba: ()=>new Jo
    });
    V({
        name: "on_secondary_fixed",
        u: a=>a.j,
        tone: ()=>10,
        background: ()=>ap,
        Na: ()=>$o,
        J: new Y
    });
    V({
        name: "on_secondary_fixed_variant",
        u: a=>a.j,
        tone: a=>Z(a) ? 25 : 30,
        background: ()=>ap,
        Na: ()=>$o,
        J: new Y
    });
    var bp = V({
        name: "tertiary_fixed",
        u: a=>a.l,
        tone: a=>Z(a) ? 40 : 90,
        P: !0,
        background: a=>Lo(a),
        J: new Y,
        ba: ()=>new Jo
    })
      , cp = V({
        name: "tertiary_fixed_dim",
        u: a=>a.l,
        tone: a=>Z(a) ? 30 : 80,
        P: !0,
        background: a=>Lo(a),
        J: new Y,
        ba: ()=>new Jo
    });
    V({
        name: "on_tertiary_fixed",
        u: a=>a.l,
        tone: a=>Z(a) ? 100 : 10,
        background: ()=>cp,
        Na: ()=>bp,
        J: new Y
    });
    V({
        name: "on_tertiary_fixed_variant",
        u: a=>a.l,
        tone: a=>Z(a) ? 90 : 30,
        background: ()=>cp,
        Na: ()=>bp,
        J: new Y
    });
    function dp(a) {
        a = new Eo(a);
        return new ep(a.g,a.chroma,a)
    }
    function fp(a, b) {
        let c = Do(a, b, 50)
          , d = Math.abs(c.chroma - b);
        for (let g = 1; 50 > g && Math.round(b) !== Math.round(c.chroma); g += 1) {
            var e = Do(a, b, 50 + g)
              , f = Math.abs(e.chroma - b);
            f < d && (d = f,
            c = e);
            e = Do(a, b, 50 - g);
            f = Math.abs(e.chroma - b);
            f < d && (d = f,
            c = e)
        }
        return new ep(a,b,c)
    }
    var ep = class {
        constructor(a, b, c) {
            this.h = a;
            this.chroma = b;
            this.g = c;
            this.cache = new Map
        }
        tone(a) {
            let b = this.cache.get(a);
            void 0 === b && (b = Do(this.h, this.chroma, a).toInt(),
            this.cache.set(a, b));
            return b
        }
    }
    ;
    var gp = class {
        constructor(a) {
            a = new Eo(a);
            const b = a.g;
            this.h = fp(b, Math.max(48, a.chroma));
            this.i = fp(b, 16);
            this.j = fp(b + 60, 24);
            this.g = fp(b, 4);
            this.l = fp(b, 8);
            this.error = fp(25, 84)
        }
    }
    ;
    function hp(a) {
        return new ip({
            primary: a.h.tone(40),
            Yc: a.h.tone(100),
            jd: a.h.tone(90),
            Zc: a.h.tone(10),
            ub: a.i.tone(40),
            ad: a.i.tone(100),
            nd: a.i.tone(90),
            bd: a.i.tone(10),
            yb: a.j.tone(40),
            ed: a.j.tone(100),
            Dd: a.j.tone(90),
            fd: a.j.tone(10),
            error: a.error.tone(40),
            Wc: a.error.tone(100),
            Cc: a.error.tone(90),
            Xc: a.error.tone(10),
            background: a.g.tone(99),
            Vc: a.g.tone(10),
            Ad: a.g.tone(99),
            cd: a.g.tone(10),
            Bd: a.l.tone(90),
            dd: a.l.tone(30),
            outline: a.l.tone(50),
            gd: a.l.tone(80),
            sd: a.g.tone(0),
            md: a.g.tone(0),
            Mc: a.g.tone(20),
            Kc: a.g.tone(95),
            Lc: a.h.tone(80)
        })
    }
    function jp(a) {
        return new ip({
            primary: a.h.tone(80),
            Yc: a.h.tone(20),
            jd: a.h.tone(30),
            Zc: a.h.tone(90),
            ub: a.i.tone(80),
            ad: a.i.tone(20),
            nd: a.i.tone(30),
            bd: a.i.tone(90),
            yb: a.j.tone(80),
            ed: a.j.tone(20),
            Dd: a.j.tone(30),
            fd: a.j.tone(90),
            error: a.error.tone(80),
            Wc: a.error.tone(20),
            Cc: a.error.tone(30),
            Xc: a.error.tone(80),
            background: a.g.tone(10),
            Vc: a.g.tone(90),
            Ad: a.g.tone(10),
            cd: a.g.tone(90),
            Bd: a.l.tone(30),
            dd: a.l.tone(80),
            outline: a.l.tone(60),
            gd: a.l.tone(30),
            sd: a.g.tone(0),
            md: a.g.tone(0),
            Mc: a.g.tone(90),
            Kc: a.g.tone(20),
            Lc: a.h.tone(40)
        })
    }
    var ip = class {
        get primary() {
            return this.g.primary
        }
        get Yc() {
            return this.g.Yc
        }
        get jd() {
            return this.g.jd
        }
        get Zc() {
            return this.g.Zc
        }
        get ub() {
            return this.g.ub
        }
        get ad() {
            return this.g.ad
        }
        get nd() {
            return this.g.nd
        }
        get bd() {
            return this.g.bd
        }
        get yb() {
            return this.g.yb
        }
        get ed() {
            return this.g.ed
        }
        get Dd() {
            return this.g.Dd
        }
        get fd() {
            return this.g.fd
        }
        get error() {
            return this.g.error
        }
        get Wc() {
            return this.g.Wc
        }
        get Cc() {
            return this.g.Cc
        }
        get Xc() {
            return this.g.Xc
        }
        get background() {
            return this.g.background
        }
        get Vc() {
            return this.g.Vc
        }
        get Ad() {
            return this.g.Ad
        }
        get cd() {
            return this.g.cd
        }
        get Bd() {
            return this.g.Bd
        }
        get dd() {
            return this.g.dd
        }
        get outline() {
            return this.g.outline
        }
        get gd() {
            return this.g.gd
        }
        get sd() {
            return this.g.sd
        }
        get md() {
            return this.g.md
        }
        get Mc() {
            return this.g.Mc
        }
        get Kc() {
            return this.g.Kc
        }
        get Lc() {
            return this.g.Lc
        }
        constructor(a) {
            this.g = a
        }
        toJSON() {
            return {
                ...this.g
            }
        }
    }
    ;
    function kp(a) {
        a = a.replace("#", "");
        const b = 3 === a.length
          , c = 6 === a.length
          , d = 8 === a.length;
        if (!b && !c && !d)
            throw Error("unexpected hex " + a);
        let e = 0
          , f = 0
          , g = 0;
        b ? (e = parseInt(a.charAt(0).repeat(2), 16),
        f = parseInt(a.charAt(1).repeat(2), 16),
        g = parseInt(a.charAt(2).repeat(2), 16)) : c ? (e = parseInt(a.slice(0, 2), 16),
        f = parseInt(a.slice(2, 4), 16),
        g = parseInt(a.slice(4, 6), 16)) : d && (e = parseInt(a.slice(2, 4), 16),
        f = parseInt(a.slice(4, 6), 16),
        g = parseInt(a.slice(6, 8), 16));
        return (-16777216 | (e & 255) << 16 | (f & 255) << 8 | g & 255) >>> 0
    }
    ;function lp(a) {
        const b = new gp(a);
        return {
            source: a,
            schemes: {
                Ig: hp(new gp(a)),
                hg: jp(new gp(a))
            },
            Vg: {
                primary: b.h,
                ub: b.i,
                yb: b.j,
                Ng: b.g,
                Og: b.l,
                error: b.error
            },
            Pi: [].map(c=>{
                var d = c.value
                  , e = d;
                c.blend && (d = new Eo(e),
                e = new Eo(a),
                d = Do(fo(d.g + Math.min(.5 * (180 - Math.abs(Math.abs(d.g - e.g) - 180)), 15) * (180 >= fo(e.g - d.g) ? 1 : -1)), d.chroma, d.tone).toInt());
                e = (new gp(d)).h;
                return {
                    color: c,
                    value: d,
                    Ig: {
                        color: e.tone(40),
                        Qg: e.tone(100),
                        bg: e.tone(90),
                        Rg: e.tone(10)
                    },
                    hg: {
                        color: e.tone(80),
                        Qg: e.tone(20),
                        bg: e.tone(30),
                        Rg: e.tone(90)
                    }
                }
            }
            )
        }
    }
    ;const mp = window ? "" : ""
      , np = window ? "" : ""
      , op = window ? "" : ""
      , pp = window ? "\n  /* font families */\n  --cros-font-family-google-sans-regular: 'GSR', 'Google Sans', 'Roboto', sans-serif;\n  --cros-font-family-google-sans-medium: 'GSM', 'Google Sans', 'Roboto', sans-serif;\n  --cros-font-family-google-sans-bold: 'GSB', 'Google Sans', 'Roboto', sans-serif;\n  --cros-font-family-google-sans-text-regular: 'GSTR', 'Google Sans', 'Roboto', sans-serif;\n  --cros-font-family-google-sans-text-medium: 'GSTM', 'Google Sans', 'Roboto', sans-serif;\n  --cros-font-family-google-sans-text-bold: 'GSTB', 'Google Sans', 'Roboto', sans-serif;\n\n  /* typefaces */\n  --cros-display-0-font: 500 52px/60px var(--cros-font-family-google-sans-medium);\n  --cros-display-0-font-family: var(--cros-font-family-google-sans-medium);\n  --cros-display-0-font-size: 52px;\n  --cros-display-0-font-weight: 500;\n  --cros-display-0-line-height: 60px;\n  --cros-display-0_regular-font: 400 52px/60px var(--cros-font-family-google-sans-regular);\n  --cros-display-0_regular-font-family: var(--cros-font-family-google-sans-regular);\n  --cros-display-0_regular-font-size: 52px;\n  --cros-display-0_regular-font-weight: 400;\n  --cros-display-0_regular-line-height: 60px;\n  --cros-display-1-font: 500 44px/52px var(--cros-font-family-google-sans-medium);\n  --cros-display-1-font-family: var(--cros-font-family-google-sans-medium);\n  --cros-display-1-font-size: 44px;\n  --cros-display-1-font-weight: 500;\n  --cros-display-1-line-height: 52px;\n  --cros-display-2-font: 500 36px/44px var(--cros-font-family-google-sans-medium);\n  --cros-display-2-font-family: var(--cros-font-family-google-sans-medium);\n  --cros-display-2-font-size: 36px;\n  --cros-display-2-font-weight: 500;\n  --cros-display-2-line-height: 44px;\n  --cros-display-3-font: 500 32px/40px var(--cros-font-family-google-sans-medium);\n  --cros-display-3-font-family: var(--cros-font-family-google-sans-medium);\n  --cros-display-3-font-size: 32px;\n  --cros-display-3-font-weight: 500;\n  --cros-display-3-line-height: 40px;\n  --cros-display-3_regular-font: 400 32px/40px var(--cros-font-family-google-sans-regular);\n  --cros-display-3_regular-font-family: var(--cros-font-family-google-sans-regular);\n  --cros-display-3_regular-font-size: 32px;\n  --cros-display-3_regular-font-weight: 400;\n  --cros-display-3_regular-line-height: 40px;\n  --cros-display-4-font: 500 28px/36px var(--cros-font-family-google-sans-medium);\n  --cros-display-4-font-family: var(--cros-font-family-google-sans-medium);\n  --cros-display-4-font-size: 28px;\n  --cros-display-4-font-weight: 500;\n  --cros-display-4-line-height: 36px;\n  --cros-display-5-font: 500 24px/32px var(--cros-font-family-google-sans-medium);\n  --cros-display-5-font-family: var(--cros-font-family-google-sans-medium);\n  --cros-display-5-font-size: 24px;\n  --cros-display-5-font-weight: 500;\n  --cros-display-5-line-height: 32px;\n  --cros-display-6-font: 500 22px/28px var(--cros-font-family-google-sans-medium);\n  --cros-display-6-font-family: var(--cros-font-family-google-sans-medium);\n  --cros-display-6-font-size: 22px;\n  --cros-display-6-font-weight: 500;\n  --cros-display-6-line-height: 28px;\n  --cros-display-6_regular-font: 400 22px/28px var(--cros-font-family-google-sans-regular);\n  --cros-display-6_regular-font-family: var(--cros-font-family-google-sans-regular);\n  --cros-display-6_regular-font-size: 22px;\n  --cros-display-6_regular-font-weight: 400;\n  --cros-display-6_regular-line-height: 28px;\n  --cros-display-7-font: 500 18px/24px var(--cros-font-family-google-sans-medium);\n  --cros-display-7-font-family: var(--cros-font-family-google-sans-medium);\n  --cros-display-7-font-size: 18px;\n  --cros-display-7-font-weight: 500;\n  --cros-display-7-line-height: 24px;\n  --cros-title-1-font: 500 16px/24px var(--cros-font-family-google-sans-text-medium);\n  --cros-title-1-font-family: var(--cros-font-family-google-sans-text-medium);\n  --cros-title-1-font-size: 16px;\n  --cros-title-1-font-weight: 500;\n  --cros-title-1-line-height: 24px;\n  --cros-title-2-font: 700 13px/20px var(--cros-font-family-google-sans-text-bold);\n  --cros-title-2-font-family: var(--cros-font-family-google-sans-text-bold);\n  --cros-title-2-font-size: 13px;\n  --cros-title-2-font-weight: 700;\n  --cros-title-2-line-height: 20px;\n  --cros-headline-1-font: 500 15px/22px var(--cros-font-family-google-sans-text-medium);\n  --cros-headline-1-font-family: var(--cros-font-family-google-sans-text-medium);\n  --cros-headline-1-font-size: 15px;\n  --cros-headline-1-font-weight: 500;\n  --cros-headline-1-line-height: 22px;\n  --cros-button-1-font: 500 14px/20px var(--cros-font-family-google-sans-text-medium);\n  --cros-button-1-font-family: var(--cros-font-family-google-sans-text-medium);\n  --cros-button-1-font-size: 14px;\n  --cros-button-1-font-weight: 500;\n  --cros-button-1-line-height: 20px;\n  --cros-button-2-font: 500 13px/20px var(--cros-font-family-google-sans-text-medium);\n  --cros-button-2-font-family: var(--cros-font-family-google-sans-text-medium);\n  --cros-button-2-font-size: 13px;\n  --cros-button-2-font-weight: 500;\n  --cros-button-2-line-height: 20px;\n  --cros-body-0-font: 400 16px/24px var(--cros-font-family-google-sans-text-regular);\n  --cros-body-0-font-family: var(--cros-font-family-google-sans-text-regular);\n  --cros-body-0-font-size: 16px;\n  --cros-body-0-font-weight: 400;\n  --cros-body-0-line-height: 24px;\n  --cros-body-1-font: 400 14px/20px var(--cros-font-family-google-sans-text-regular);\n  --cros-body-1-font-family: var(--cros-font-family-google-sans-text-regular);\n  --cros-body-1-font-size: 14px;\n  --cros-body-1-font-weight: 400;\n  --cros-body-1-line-height: 20px;\n  --cros-body-2-font: 400 13px/20px var(--cros-font-family-google-sans-text-regular);\n  --cros-body-2-font-family: var(--cros-font-family-google-sans-text-regular);\n  --cros-body-2-font-size: 13px;\n  --cros-body-2-font-weight: 400;\n  --cros-body-2-line-height: 20px;\n  --cros-annotation-1-font: 400 12px/18px var(--cros-font-family-google-sans-text-regular);\n  --cros-annotation-1-font-family: var(--cros-font-family-google-sans-text-regular);\n  --cros-annotation-1-font-size: 12px;\n  --cros-annotation-1-font-weight: 400;\n  --cros-annotation-1-line-height: 18px;\n  --cros-annotation-2-font: 400 11px/16px var(--cros-font-family-google-sans-text-regular);\n  --cros-annotation-2-font-family: var(--cros-font-family-google-sans-text-regular);\n  --cros-annotation-2-font-size: 11px;\n  --cros-annotation-2-font-weight: 400;\n  --cros-annotation-2-line-height: 16px;\n  --cros-label-1-font: 500 10px/10px var(--cros-font-family-google-sans-text-medium);\n  --cros-label-1-font-family: var(--cros-font-family-google-sans-text-medium);\n  --cros-label-1-font-size: 10px;\n  --cros-label-1-font-weight: 500;\n  --cros-label-1-line-height: 10px;\n  --cros-label-2-font: 400 10px/10px var(--cros-font-family-google-sans-text-regular);\n  --cros-label-2-font-family: var(--cros-font-family-google-sans-text-regular);\n  --cros-label-2-font-size: 10px;\n  --cros-label-2-font-weight: 400;\n  --cros-label-2-line-height: 10px;\n" : ""
      , qp = window ? "" : "";
    const rp = [0, 8, 10, 12, 15, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100]
      , sp = J`
  html:not(body) {
   --cros-navigation-tree-item-focus-ring-outline-offset: 2px;
   --cros-icon-button-hover-ripple-opacity: 0;
  }
`
      , tp = J`
  stories-renderer {
    background-color: var(--cros-sys-app_base);
    color: var(--cros-sys-primary);
    font-family: var(--cros-body-0-font-family);
    padding: 20px;
  }
`
      , up = J`
  html:not(body) {
    --cros-sys-illo-color1-rgb: var(--cros-illustration-color-1-rgb);
    --cros-sys-illo-color1: var(--cros-illustration-color-1);
    --cros-sys-illo-color1-1-rgb: var(--cros-illustration-color-1-shade-1-rgb);
    --cros-sys-illo-color1-1: var(--cros-illustration-color-1-shade-1);
    --cros-sys-illo-color1-2-rgb: var(--cros-illustration-color-1-shade-2-rgb);
    --cros-sys-illo-color1-2: var(--cros-illustration-color-1-shade-2);
    --cros-sys-illo-color2-rgb: var(--cros-illustration-color-2-rgb);
    --cros-sys-illo-color2: var(--cros-illustration-color-2);
    --cros-sys-illo-color3-rgb: var(--cros-illustration-color-3-rgb);
    --cros-sys-illo-color3: var(--cros-illustration-color-3);
    --cros-sys-illo-color4-rgb: var(--cros-illustration-color-4-rgb);
    --cros-sys-illo-color4: var(--cros-illustration-color-4);
    --cros-sys-illo-color5-rgb: var(--cros-illustration-color-5-rgb);
    --cros-sys-illo-color5: var(--cros-illustration-color-5);
    --cros-sys-illo-color6-rgb: var(--cros-illustration-color-6-rgb);
    --cros-sys-illo-color6: var(--cros-illustration-color-6);
    --cros-sys-illo-base-rgb: var(--cros-illustration-base-color-rgb);
    --cros-sys-illo-base: var(--cros-illustration-base-color);
    --cros-sys-illo-secondary-rgb: var(--cros-illustration-secondary-color-rgb);
    --cros-sys-illo-secondary: var(--cros-illustration-secondary-color);

    --cros-sys-illo-elevated-color-1-1: var(--cros-illustration-elevation-color-1-shade-1);
    --cros-sys-illo-elevated-color-1-2: var(--cros-illustration-elevation-color-1-shade-2);
    --cros-sys-illo-elevated-base: var(--cros-illustration-elevation-base-color);
    --cros-sys-illo-elevated-secondary: var(--cros-illustration-elevation-secondary-color);
  }
`;
    let vp = []
      , wp = []
      , xp = null;
    function yp(a) {
        return "StyleElement" === a.type ? document.head.contains(a.element) : "CSSStyleSheet" === a.type ? (document.adoptedStyleSheets || []).includes(a.styleSheet) : !1
    }
    function zp(a) {
        switch (a.type) {
        case "StyleElement":
            a.element.remove();
            break;
        case "CSSStyleSheet":
            document.adoptedStyleSheets = document.adoptedStyleSheets.filter(b=>b !== a.styleSheet);
            break;
        case "StyleProperties":
            for (const b of a.fg)
                document.documentElement.style.removeProperty(b);
            break;
        default:
            ic(a)
        }
    }
    function Ap() {
        for (const a of wp)
            a()
    }
    function Bp() {
        const a = window;
        return a.addColorChangeListener && a.removeColorChangeListener ? {
            addColorChangeListener: a.addColorChangeListener,
            removeColorChangeListener: a.removeColorChangeListener
        } : null
    }
    function Cp(a) {
        const b = lp(kp(a)).Vg
          , c = {}
          , d = (e,f)=>{
            for (const w of rp) {
                var g = `--cros-ref-${e}${w}`.toLowerCase();
                const u = `${g}-rgb`;
                var k = f.tone(w)
                  , q = k >> 8 & 255
                  , p = k & 255;
                k = [(k >> 16 & 255).toString(16), q.toString(16), p.toString(16)];
                for (const [N,da] of k.entries())
                    q = N,
                    p = da,
                    1 === p.length && (k[q] = "0" + p);
                c[g] = "#" + k.join("");
                g = f.tone(w);
                const {r: z, pg: H, b: W} = {
                    r: g >> 16 & 255,
                    pg: g >> 8 & 255,
                    b: g & 255,
                    a: g >> 24 & 255
                };
                c[u] = `${z},${H},${W}`
            }
        }
        ;
        d("primary", b.primary);
        d("secondary", b.ub);
        d("tertiary", b.yb);
        d("neutral", b.Ng);
        d("neutralVariant", b.Og);
        d("error", b.error);
        a = bo(a)[0];
        50 > a ? (d("red", dp(kp("#F95C45"))),
        d("green", dp(kp("#5BA22F"))),
        d("blue", dp(kp("#3F5AA9"))),
        d("yellow", dp(kp("#EF9800")))) : 160 > a ? (d("red", dp(kp("#EA7135"))),
        d("green", dp(kp("#4FA834"))),
        d("blue", dp(kp("#00829D"))),
        d("yellow", dp(kp("#FBBC04")))) : 220 > a ? (d("red", dp(kp("#EA6235"))),
        d("green", dp(kp("#34A866"))),
        d("blue", dp(kp("#00829D"))),
        d("yellow", dp(kp("#FBC104")))) : (d("red", dp(kp("#EA3553"))),
        d("green", dp(kp("#34A87A"))),
        d("blue", dp(kp("#3F5AA9"))),
        d("yellow", dp(kp("#FBA904"))));
        return c
    }
    function Dp(a) {
        if (document.adoptedStyleSheets) {
            a = Object.entries(a).map(([c,d])=>`${c}: ${d};`);
            const b = new CSSStyleSheet;
            b.replaceSync(`
        html:not(body) {
          ${a.join("\n")}
        }
    `);
            document.adoptedStyleSheets = [...document.adoptedStyleSheets, b];
            vp.push({
                id: "ref-tokens",
                type: "CSSStyleSheet",
                styleSheet: b
            })
        } else {
            for (const [b,c] of Object.entries(a))
                document.documentElement.style.setProperty(b, c);
            vp.push({
                id: "ref-tokens",
                type: "StyleProperties",
                fg: Object.keys(a)
            })
        }
    }
    function Ep() {
        var a = vp.find(c=>"ref-tokens" === c.id);
        zp(a);
        var b = Cp("#5265A2");
        a = {};
        for (const [c] of Object.entries(b))
            b = c,
            a[b] = b.endsWith("-rgb") ? "255, 192, 203" : "#FFC0CB";
        Dp(a);
        Ap()
    }
    function Fp() {
        const a = document.createElement("meta");
        a.setAttribute("name", "theme-color");
        a.setAttribute("content", "#5265A2");
        document.head.appendChild(a);
        return a
    }
    async function Gp() {
        const a = document.createElement("p");
        a.style.color = "AccentColor";
        document.body.appendChild(a);
        const b = window.getComputedStyle(a).color;
        document.body.removeChild(a);
        if ("rgba(0, 0, 0, 0)" !== b)
            return Hp(b).slice(0, -2);
        const c = document.createElement("canvas").getContext("2d");
        await new Promise(g=>{
            let k = new Image;
            k.onload = ()=>{
                c.drawImage(k, 0, 0);
                g()
            }
            ;
            k.src = 'data:image/svg+xml;charset=utf-8,\n      <svg xmlns="http://www.w3.org/2000/svg">\n        <foreignObject width="100%" height="100%">\n          <body xmlns="http://www.w3.org/1999/xhtml">\n            <style>\n              input {\n                display: block;\n                width: 30px;\n                height: 30px;\n                margin: 0px;\n              }\n            </style>\n            <input type="radio" checked="true"></input>\n          </body>\n        </foreignObject>\n      </svg>'
        }
        );
        const [d,e,f] = c.getImageData(22, 22, 1, 1).data;
        return Hp(`rgb(${d}, ${e}, ${f})`).slice(0, -2)
    }
    async function Ip() {
        const a = Fp();
        "loading" === document.readyState && await new Promise(c=>{
            document.addEventListener("DOMContentLoaded", c, {
                once: !0
            })
        }
        );
        const b = document.createDocumentFragment();
        Ug(F`
        <div style=${Di({
            position: "absolute",
            right: "8px",
            bottom: "8px",
            width: "200px",
            padding: "16px",
            background: "white",
            border: "2px solid black",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            Yi: "4px",
            zIndex: 999
        })} id="dynamic-colors-debug-dialog">
          <p style="margin: 0"> Dynamic color debug options </p>
          <fieldset>
            <legend>Set seed color</legend>
            <input
              style="width: 100%"
              type="color"
              @change=${c=>{
            c = c.target;
            Jp(c.value);
            a.setAttribute("content", c.value)
        }
        }
              value=${"#5265A2"}
              >
          </fieldset>
          <fieldset>
            <legend>Highlight Unlinked</legend>
            <input type="checkbox" @change=${c=>{
            const d = document.body.querySelector("#dynamic-colors-debug-dialog").querySelector('input[type="color"]');
            c.target.checked ? (Ep(),
            d.value = "#FFC0CB",
            d.disabled = !0) : (Jp("#5265A2"),
            d.value = "#5265A2",
            d.disabled = !1)
        }
        }>
            <small> (Makes all colors linked to a ref token pink) </small>
          </fieldset>
          <fieldset>
            <legend>[Experimental] Use System Accent Color</legend>
            <input type="checkbox"
                   @change=${asyncc=>{
            const d = document.body.querySelector("#dynamic-colors-debug-dialog").querySelector('input[type="color"]');
            c.target.checked ? (c = await Gp(),
            Jp(c),
            d.value = c,
            d.disabled = !0) : (Jp("#5265A2"),
            d.value = "#5265A2",
            d.disabled = !1)
        }
        }>
            <small>(Styles elements using the system's accent color. macOS and CrOS Canary only.)</small>
          </fieldset>
        </div>`, b);
        document.body.append(b)
    }
    function Hp(a) {
        function b(d) {
            return Number(d.trim()).toString(16).padStart(2, "0")
        }
        function c(d) {
            return Math.floor(255 * Number(d.trim())).toString(16).padStart(2, "0")
        }
        a = a.trim();
        if (a.startsWith("color-mix(")) {
            const d = document.createElement("div");
            d.style.backgroundColor = a;
            d.style.display = "none";
            document.body.appendChild(d);
            a = getComputedStyle(d).backgroundColor.trim();
            d.remove()
        }
        if (a.startsWith("#") && 7 === a.length)
            return `${a}ff`;
        if (a.startsWith("#") && 9 === a.length)
            return a;
        if (a.startsWith("rgb(")) {
            const [d,e,f] = a.substring(4, a.length - 1).split(",").map(b);
            return `#${d}${e}${f}ff`
        }
        if (a.startsWith("rgba(")) {
            a = a.substring(5, a.length - 1).split(",");
            const [d,e,f] = a.slice(0, 3).map(b);
            a = c(a[3]);
            return `#${d}${e}${f}${a}`
        }
        if (a.startsWith("color(srgb")) {
            a = a.replace(/\s+/g, " ");
            const [d,e,f] = a.substring(11, a.length - 1).split(" ").map(c);
            return `#${d}${e}${f}ff`
        }
        throw Error(`Could not parse color: "${a}"`);
    }
    function Kp() {
        var a = {
            na: "light"
        };
        vp = vp.filter(yp);
        if (0 < vp.length)
            throw Error("Colors have already been installed in this context, use uninstallColors to remove the previous colors before appending new ones.");
        const b = null !== Bp();
        var c = Ka("");
        "light" === a?.na && !0 === !!a?.oa && (c = Ka(`
      html:not(body), :host {
        ${bk}
        ${dk}
        ${ek}
        ${fk}
      }
      :host([inverted-colors]) {
        ${ck}
      }

    `));
        "light" === a?.na && !1 === !!a?.oa && (c = Ka(`
      html:not(body), :host {
        ${bk}
        ${dk}
        ${ek}
      }
      :host([inverted-colors]) {
        ${ck}
      }

    `));
        "dark" === a?.na && !0 === !!a?.oa && (c = Ka(`
      html:not(body), :host {
        ${bk}
        ${dk}
        ${ek}
        ${ck}
        ${fk}
      }
      :host([inverted-colors]) {
        ${bk}
      }

    `));
        "dark" === a?.na && !1 === !!a?.oa && (c = Ka(`
      html:not(body), :host {
        ${bk}
        ${dk}
        ${ek}
        ${ck}
      }
      :host([inverted-colors]) {
        ${bk}
      }

    `));
        void 0 === a?.na && !0 === !!a?.oa && (c = Ka(`
      html:not(body), :host {
        ${bk}
        ${dk}
        ${ek}
        ${fk}
      }
      :host([inverted-colors]) {
        ${ck}
      }

      @media (prefers-color-scheme: dark) {
        html:not(body), :host {
          ${ck}
          ${fk}
        }
        :host([inverted-colors]) {
          ${bk}
        }
      }
    `));
        void 0 === a?.na && !1 === !!a?.oa && (c = Ka(`
      html:not(body), :host {
        ${bk}
        ${dk}
        ${ek}
      }
      :host([inverted-colors]) {
        ${ck}
      }

      @media (prefers-color-scheme: dark) {
        html:not(body), :host {
          ${ck}
        }
        :host([inverted-colors]) {
          ${bk}
        }
      }
    `));
        if (document.adoptedStyleSheets)
            c = Lp(c),
            document.adoptedStyleSheets = [...document.adoptedStyleSheets, c],
            vp.push({
                id: "user-colors",
                type: "CSSStyleSheet",
                styleSheet: c
            });
        else {
            c = Ja(c);
            c = 0 === c.length ? $a : new Za(c,Ya);
            var d = ua || (ua = new bc)
              , e = d.g;
            if (Hb && e.createStyleSheet)
                e = e.createStyleSheet(),
                co(e, c),
                c = e;
            else {
                e = cc(d, "HEAD")[0];
                if (!e) {
                    var f = cc(d, "BODY")[0];
                    e = d.h("HEAD");
                    f.parentNode.insertBefore(e, f)
                }
                d = d.h("STYLE");
                (f = Tb('style[nonce],link[rel="stylesheet"][nonce]')) && d.setAttribute("nonce", f);
                co(d, c);
                e.appendChild(d);
                c = d
            }
            vp.push({
                id: "user-colors",
                type: "StyleElement",
                element: c
            })
        }
        b || Dp(Cp(a.Xi ?? "#5265A2"));
        a.oa ? (c = sp.styleSheet,
        vp.push({
            id: "user-colors",
            type: "CSSStyleSheet",
            styleSheet: c
        }),
        e = Ka(""),
        "light" === (void 0)?.na && !0 === !!(void 0)?.oa && (e = Ka(`
      html:not(body), :host {
        ${mp}
        ${op}
        ${pp}
        ${qp}
      }
      :host([inverted-colors]) {
        ${np}
      }

    `)),
        "light" === (void 0)?.na && !1 === !!(void 0)?.oa && (e = Ka(`
      html:not(body), :host {
        ${mp}
        ${op}
        ${pp}
      }
      :host([inverted-colors]) {
        ${np}
      }

    `)),
        "dark" === (void 0)?.na && !0 === !!(void 0)?.oa && (e = Ka(`
      html:not(body), :host {
        ${mp}
        ${op}
        ${pp}
        ${np}
        ${qp}
      }
      :host([inverted-colors]) {
        ${mp}
      }

    `)),
        "dark" === (void 0)?.na && !1 === !!(void 0)?.oa && (e = Ka(`
      html:not(body), :host {
        ${mp}
        ${op}
        ${pp}
        ${np}
      }
      :host([inverted-colors]) {
        ${mp}
      }

    `)),
        void 0 === (void 0)?.na && !0 === !!(void 0)?.oa && (e = Ka(`
      html:not(body), :host {
        ${mp}
        ${op}
        ${pp}
        ${qp}
      }
      :host([inverted-colors]) {
        ${np}
      }

      @media (prefers-color-scheme: dark) {
        html:not(body), :host {
          ${np}
          ${qp}
        }
        :host([inverted-colors]) {
          ${mp}
        }
      }
    `)),
        void 0 === (void 0)?.na && !1 === !!(void 0)?.oa && (e = Ka(`
      html:not(body), :host {
        ${mp}
        ${op}
        ${pp}
      }
      :host([inverted-colors]) {
        ${np}
      }

      @media (prefers-color-scheme: dark) {
        html:not(body), :host {
          ${np}
        }
        :host([inverted-colors]) {
          ${mp}
        }
      }
    `)),
        e = Lp(e),
        vp.push({
            id: "user-colors",
            type: "CSSStyleSheet",
            styleSheet: e
        }),
        d = document.adoptedStyleSheets,
        f = tp.styleSheet,
        vp.push({
            id: "user-colors",
            type: "CSSStyleSheet",
            styleSheet: f
        }),
        document.adoptedStyleSheets = [...d, c, e, f]) : document.adoptedStyleSheets && (c = up.styleSheet,
        document.adoptedStyleSheets = [...document.adoptedStyleSheets, c],
        vp.push({
            id: "user-colors",
            type: "CSSStyleSheet",
            styleSheet: c
        }));
        (c = Bp()) ? c.addColorChangeListener(Ap) : (xp = window.matchMedia("(prefers-color-scheme: light)"),
        xp.addEventListener("change", Ap));
        !b && a.rj && Ip();
        a.uj && Ep()
    }
    function Lp(a) {
        const b = new CSSStyleSheet;
        b.replaceSync(Ja(a));
        return b
    }
    function Jp(a) {
        const b = vp.find(c=>"ref-tokens" === c.id);
        zp(b);
        a = Cp(a);
        Dp(a);
        Ap()
    }
    ;(async function() {
        "true" !== window.localStorage.getItem("has-launched-before") && (window.resizeTo(350, 450),
        window.localStorage.setItem("has-launched-before", "true"));
        await Ue();
        var a = hf(Ee).replace(/_.*/, b=>b.toUpperCase());
        a = await (await fetch(`locales/${a}/messages.json`)).json();
        ta(a);
        Kp();
        await pf();
        Zn("ChromeOS_Calculator", "chrome-apps-calculator_202310280700_RC00_prod", {
            Cg: !0
        });
        "#licenses" === location.hash ? (document.title = D.MSG_LICENSES_DIALOG_TITLE,
        document.body.append(new wk)) : (document.body.prepend(new gn),
        document.addEventListener("trigger-feedback", ()=>void Be().ph()),
        await kf(qc`foam.js`),
        De("litCalculator") && document.body.append(new ak),
        De("litCalculator") || (a = document.createElement("foam"),
        a.setAttribute("model", "foam.apps.calc.Calc"),
        a.setAttribute("view", "foam.apps.calc.CalcView"),
        document.body.prepend(a),
        DOM.init(X)))
    }
    )();
}
).call(this);
