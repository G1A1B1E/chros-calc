(function() {
    'use strict';
    var m;
    function aa(a) {
        var b = 0;
        return function() {
            return b < a.length ? {
                done: !1,
                value: a[b++]
            } : {
                done: !0
            }
        }
    }
    var ba = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
        if (a == Array.prototype || a == Object.prototype)
            return a;
        a[b] = c.value;
        return a
    }
    ;
    function ca(a) {
        a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
        for (var b = 0; b < a.length; ++b) {
            var c = a[b];
            if (c && c.Math == Math)
                return c
        }
        throw Error("Cannot find global object");
    }
    var p = ca(this);
    function t(a, b) {
        if (b)
            a: {
                var c = p;
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
                b != d && null != b && ba(c, a, {
                    configurable: !0,
                    writable: !0,
                    value: b
                })
            }
    }
    t("Symbol", function(a) {
        function b(h) {
            if (this instanceof b)
                throw new TypeError("Symbol is not a constructor");
            return new c(d + (h || "") + "_" + e++,h)
        }
        function c(h, f) {
            this.g = h;
            ba(this, "description", {
                configurable: !0,
                writable: !0,
                value: f
            })
        }
        if (a)
            return a;
        c.prototype.toString = function() {
            return this.g
        }
        ;
        var d = "jscomp_symbol_" + (1E9 * Math.random() >>> 0) + "_"
          , e = 0;
        return b
    });
    t("Symbol.iterator", function(a) {
        if (a)
            return a;
        a = Symbol("Symbol.iterator");
        for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), c = 0; c < b.length; c++) {
            var d = p[b[c]];
            "function" === typeof d && "function" != typeof d.prototype[a] && ba(d.prototype, a, {
                configurable: !0,
                writable: !0,
                value: function() {
                    return da(aa(this))
                }
            })
        }
        return a
    });
    function da(a) {
        a = {
            next: a
        };
        a[Symbol.iterator] = function() {
            return this
        }
        ;
        return a
    }
    function w(a) {
        var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
        if (b)
            return b.call(a);
        if ("number" == typeof a.length)
            return {
                next: aa(a)
            };
        throw Error(String(a) + " is not an iterable or ArrayLike");
    }
    function ea(a) {
        if (!(a instanceof Array)) {
            a = w(a);
            for (var b, c = []; !(b = a.next()).done; )
                c.push(b.value);
            a = c
        }
        return a
    }
    function x(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    }
    var fa = "function" == typeof Object.assign ? Object.assign : function(a, b) {
        for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c];
            if (d)
                for (var e in d)
                    x(d, e) && (a[e] = d[e])
        }
        return a
    }
    ;
    t("Object.assign", function(a) {
        return a || fa
    });
    var ha = "function" == typeof Object.create ? Object.create : function(a) {
        function b() {}
        b.prototype = a;
        return new b
    }
    , ia;
    if ("function" == typeof Object.setPrototypeOf)
        ia = Object.setPrototypeOf;
    else {
        var ja;
        a: {
            var ka = {
                a: !0
            }
              , la = {};
            try {
                la.__proto__ = ka;
                ja = la.a;
                break a
            } catch (a) {}
            ja = !1
        }
        ia = ja ? function(a, b) {
            a.__proto__ = b;
            if (a.__proto__ !== b)
                throw new TypeError(a + " is not extensible");
            return a
        }
        : null
    }
    var ma = ia;
    function na(a, b) {
        a.prototype = ha(b.prototype);
        a.prototype.constructor = a;
        if (ma)
            ma(a, b);
        else
            for (var c in b)
                if ("prototype" != c)
                    if (Object.defineProperties) {
                        var d = Object.getOwnPropertyDescriptor(b, c);
                        d && Object.defineProperty(a, c, d)
                    } else
                        a[c] = b[c];
        a.W = b.prototype
    }
    function oa() {
        this.l = !1;
        this.h = null;
        this.i = void 0;
        this.g = 1;
        this.o = 0;
        this.j = null
    }
    function pa(a) {
        if (a.l)
            throw new TypeError("Generator is already running");
        a.l = !0
    }
    oa.prototype.m = function(a) {
        this.i = a
    }
    ;
    function qa(a, b) {
        a.j = {
            ja: b,
            ka: !0
        };
        a.g = a.o
    }
    oa.prototype.return = function(a) {
        this.j = {
            return: a
        };
        this.g = this.o
    }
    ;
    function y(a, b, c) {
        a.g = c;
        return {
            value: b
        }
    }
    function ra(a) {
        this.g = new oa;
        this.h = a
    }
    function sa(a, b) {
        pa(a.g);
        var c = a.g.h;
        if (c)
            return ta(a, "return"in c ? c["return"] : function(d) {
                return {
                    value: d,
                    done: !0
                }
            }
            , b, a.g.return);
        a.g.return(b);
        return z(a)
    }
    function ta(a, b, c, d) {
        try {
            var e = b.call(a.g.h, c);
            if (!(e instanceof Object))
                throw new TypeError("Iterator result " + e + " is not an object");
            if (!e.done)
                return a.g.l = !1,
                e;
            var h = e.value
        } catch (f) {
            return a.g.h = null,
            qa(a.g, f),
            z(a)
        }
        a.g.h = null;
        d.call(a.g, h);
        return z(a)
    }
    function z(a) {
        for (; a.g.g; )
            try {
                var b = a.h(a.g);
                if (b)
                    return a.g.l = !1,
                    {
                        value: b.value,
                        done: !1
                    }
            } catch (c) {
                a.g.i = void 0,
                qa(a.g, c)
            }
        a.g.l = !1;
        if (a.g.j) {
            b = a.g.j;
            a.g.j = null;
            if (b.ka)
                throw b.ja;
            return {
                value: b.return,
                done: !0
            }
        }
        return {
            value: void 0,
            done: !0
        }
    }
    function ua(a) {
        this.next = function(b) {
            pa(a.g);
            a.g.h ? b = ta(a, a.g.h.next, b, a.g.m) : (a.g.m(b),
            b = z(a));
            return b
        }
        ;
        this.throw = function(b) {
            pa(a.g);
            a.g.h ? b = ta(a, a.g.h["throw"], b, a.g.m) : (qa(a.g, b),
            b = z(a));
            return b
        }
        ;
        this.return = function(b) {
            return sa(a, b)
        }
        ;
        this[Symbol.iterator] = function() {
            return this
        }
    }
    function va(a) {
        function b(d) {
            return a.next(d)
        }
        function c(d) {
            return a.throw(d)
        }
        return new Promise(function(d, e) {
            function h(f) {
                f.done ? d(f.value) : Promise.resolve(f.value).then(b, c).then(h, e)
            }
            h(a.next())
        }
        )
    }
    function wa(a) {
        return va(new ua(new ra(a)))
    }
    t("Promise", function(a) {
        function b(f) {
            this.g = 0;
            this.i = void 0;
            this.h = [];
            this.o = !1;
            var g = this.j();
            try {
                f(g.resolve, g.reject)
            } catch (k) {
                g.reject(k)
            }
        }
        function c() {
            this.g = null
        }
        function d(f) {
            return f instanceof b ? f : new b(function(g) {
                g(f)
            }
            )
        }
        if (a)
            return a;
        c.prototype.h = function(f) {
            if (null == this.g) {
                this.g = [];
                var g = this;
                this.i(function() {
                    g.l()
                })
            }
            this.g.push(f)
        }
        ;
        var e = p.setTimeout;
        c.prototype.i = function(f) {
            e(f, 0)
        }
        ;
        c.prototype.l = function() {
            for (; this.g && this.g.length; ) {
                var f = this.g;
                this.g = [];
                for (var g = 0; g < f.length; ++g) {
                    var k = f[g];
                    f[g] = null;
                    try {
                        k()
                    } catch (l) {
                        this.j(l)
                    }
                }
            }
            this.g = null
        }
        ;
        c.prototype.j = function(f) {
            this.i(function() {
                throw f;
            })
        }
        ;
        b.prototype.j = function() {
            function f(l) {
                return function(n) {
                    k || (k = !0,
                    l.call(g, n))
                }
            }
            var g = this
              , k = !1;
            return {
                resolve: f(this.D),
                reject: f(this.l)
            }
        }
        ;
        b.prototype.D = function(f) {
            if (f === this)
                this.l(new TypeError("A Promise cannot resolve to itself"));
            else if (f instanceof b)
                this.G(f);
            else {
                a: switch (typeof f) {
                case "object":
                    var g = null != f;
                    break a;
                case "function":
                    g = !0;
                    break a;
                default:
                    g = !1
                }
                g ? this.B(f) : this.m(f)
            }
        }
        ;
        b.prototype.B = function(f) {
            var g = void 0;
            try {
                g = f.then
            } catch (k) {
                this.l(k);
                return
            }
            "function" == typeof g ? this.H(g, f) : this.m(f)
        }
        ;
        b.prototype.l = function(f) {
            this.s(2, f)
        }
        ;
        b.prototype.m = function(f) {
            this.s(1, f)
        }
        ;
        b.prototype.s = function(f, g) {
            if (0 != this.g)
                throw Error("Cannot settle(" + f + ", " + g + "): Promise already settled in state" + this.g);
            this.g = f;
            this.i = g;
            2 === this.g && this.F();
            this.v()
        }
        ;
        b.prototype.F = function() {
            var f = this;
            e(function() {
                if (f.A()) {
                    var g = p.console;
                    "undefined" !== typeof g && g.error(f.i)
                }
            }, 1)
        }
        ;
        b.prototype.A = function() {
            if (this.o)
                return !1;
            var f = p.CustomEvent
              , g = p.Event
              , k = p.dispatchEvent;
            if ("undefined" === typeof k)
                return !0;
            "function" === typeof f ? f = new f("unhandledrejection",{
                cancelable: !0
            }) : "function" === typeof g ? f = new g("unhandledrejection",{
                cancelable: !0
            }) : (f = p.document.createEvent("CustomEvent"),
            f.initCustomEvent("unhandledrejection", !1, !0, f));
            f.promise = this;
            f.reason = this.i;
            return k(f)
        }
        ;
        b.prototype.v = function() {
            if (null != this.h) {
                for (var f = 0; f < this.h.length; ++f)
                    h.h(this.h[f]);
                this.h = null
            }
        }
        ;
        var h = new c;
        b.prototype.G = function(f) {
            var g = this.j();
            f.K(g.resolve, g.reject)
        }
        ;
        b.prototype.H = function(f, g) {
            var k = this.j();
            try {
                f.call(g, k.resolve, k.reject)
            } catch (l) {
                k.reject(l)
            }
        }
        ;
        b.prototype.then = function(f, g) {
            function k(q, u) {
                return "function" == typeof q ? function(A) {
                    try {
                        l(q(A))
                    } catch (v) {
                        n(v)
                    }
                }
                : u
            }
            var l, n, r = new b(function(q, u) {
                l = q;
                n = u
            }
            );
            this.K(k(f, l), k(g, n));
            return r
        }
        ;
        b.prototype.catch = function(f) {
            return this.then(void 0, f)
        }
        ;
        b.prototype.K = function(f, g) {
            function k() {
                switch (l.g) {
                case 1:
                    f(l.i);
                    break;
                case 2:
                    g(l.i);
                    break;
                default:
                    throw Error("Unexpected state: " + l.g);
                }
            }
            var l = this;
            null == this.h ? h.h(k) : this.h.push(k);
            this.o = !0
        }
        ;
        b.resolve = d;
        b.reject = function(f) {
            return new b(function(g, k) {
                k(f)
            }
            )
        }
        ;
        b.race = function(f) {
            return new b(function(g, k) {
                for (var l = w(f), n = l.next(); !n.done; n = l.next())
                    d(n.value).K(g, k)
            }
            )
        }
        ;
        b.all = function(f) {
            var g = w(f)
              , k = g.next();
            return k.done ? d([]) : new b(function(l, n) {
                function r(A) {
                    return function(v) {
                        q[A] = v;
                        u--;
                        0 == u && l(q)
                    }
                }
                var q = []
                  , u = 0;
                do
                    q.push(void 0),
                    u++,
                    d(k.value).K(r(q.length - 1), n),
                    k = g.next();
                while (!k.done)
            }
            )
        }
        ;
        return b
    });
    t("Object.is", function(a) {
        return a ? a : function(b, c) {
            return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c
        }
    });
    t("Array.prototype.includes", function(a) {
        return a ? a : function(b, c) {
            var d = this;
            d instanceof String && (d = String(d));
            var e = d.length;
            c = c || 0;
            for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
                var h = d[c];
                if (h === b || Object.is(h, b))
                    return !0
            }
            return !1
        }
    });
    t("String.prototype.includes", function(a) {
        return a ? a : function(b, c) {
            if (null == this)
                throw new TypeError("The 'this' value for String.prototype.includes must not be null or undefined");
            if (b instanceof RegExp)
                throw new TypeError("First argument to String.prototype.includes must not be a regular expression");
            return -1 !== this.indexOf(b, c || 0)
        }
    });
    t("WeakMap", function(a) {
        function b(k) {
            this.g = (g += Math.random() + 1).toString();
            if (k) {
                k = w(k);
                for (var l; !(l = k.next()).done; )
                    l = l.value,
                    this.set(l[0], l[1])
            }
        }
        function c() {}
        function d(k) {
            var l = typeof k;
            return "object" === l && null !== k || "function" === l
        }
        function e(k) {
            if (!x(k, f)) {
                var l = new c;
                ba(k, f, {
                    value: l
                })
            }
        }
        function h(k) {
            var l = Object[k];
            l && (Object[k] = function(n) {
                if (n instanceof c)
                    return n;
                Object.isExtensible(n) && e(n);
                return l(n)
            }
            )
        }
        if (function() {
            if (!a || !Object.seal)
                return !1;
            try {
                var k = Object.seal({})
                  , l = Object.seal({})
                  , n = new a([[k, 2], [l, 3]]);
                if (2 != n.get(k) || 3 != n.get(l))
                    return !1;
                n.delete(k);
                n.set(l, 4);
                return !n.has(k) && 4 == n.get(l)
            } catch (r) {
                return !1
            }
        }())
            return a;
        var f = "$jscomp_hidden_" + Math.random();
        h("freeze");
        h("preventExtensions");
        h("seal");
        var g = 0;
        b.prototype.set = function(k, l) {
            if (!d(k))
                throw Error("Invalid WeakMap key");
            e(k);
            if (!x(k, f))
                throw Error("WeakMap key fail: " + k);
            k[f][this.g] = l;
            return this
        }
        ;
        b.prototype.get = function(k) {
            return d(k) && x(k, f) ? k[f][this.g] : void 0
        }
        ;
        b.prototype.has = function(k) {
            return d(k) && x(k, f) && x(k[f], this.g)
        }
        ;
        b.prototype.delete = function(k) {
            return d(k) && x(k, f) && x(k[f], this.g) ? delete k[f][this.g] : !1
        }
        ;
        return b
    });
    t("Map", function(a) {
        function b() {
            var g = {};
            return g.C = g.next = g.head = g
        }
        function c(g, k) {
            var l = g[1];
            return da(function() {
                if (l) {
                    for (; l.head != g[1]; )
                        l = l.C;
                    for (; l.next != l.head; )
                        return l = l.next,
                        {
                            done: !1,
                            value: k(l)
                        };
                    l = null
                }
                return {
                    done: !0,
                    value: void 0
                }
            })
        }
        function d(g, k) {
            var l = k && typeof k;
            "object" == l || "function" == l ? h.has(k) ? l = h.get(k) : (l = "" + ++f,
            h.set(k, l)) : l = "p_" + k;
            var n = g[0][l];
            if (n && x(g[0], l))
                for (g = 0; g < n.length; g++) {
                    var r = n[g];
                    if (k !== k && r.key !== r.key || k === r.key)
                        return {
                            id: l,
                            list: n,
                            index: g,
                            u: r
                        }
                }
            return {
                id: l,
                list: n,
                index: -1,
                u: void 0
            }
        }
        function e(g) {
            this[0] = {};
            this[1] = b();
            this.size = 0;
            if (g) {
                g = w(g);
                for (var k; !(k = g.next()).done; )
                    k = k.value,
                    this.set(k[0], k[1])
            }
        }
        if (function() {
            if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal)
                return !1;
            try {
                var g = Object.seal({
                    x: 4
                })
                  , k = new a(w([[g, "s"]]));
                if ("s" != k.get(g) || 1 != k.size || k.get({
                    x: 4
                }) || k.set({
                    x: 4
                }, "t") != k || 2 != k.size)
                    return !1;
                var l = k.entries()
                  , n = l.next();
                if (n.done || n.value[0] != g || "s" != n.value[1])
                    return !1;
                n = l.next();
                return n.done || 4 != n.value[0].x || "t" != n.value[1] || !l.next().done ? !1 : !0
            } catch (r) {
                return !1
            }
        }())
            return a;
        var h = new WeakMap;
        e.prototype.set = function(g, k) {
            g = 0 === g ? 0 : g;
            var l = d(this, g);
            l.list || (l.list = this[0][l.id] = []);
            l.u ? l.u.value = k : (l.u = {
                next: this[1],
                C: this[1].C,
                head: this[1],
                key: g,
                value: k
            },
            l.list.push(l.u),
            this[1].C.next = l.u,
            this[1].C = l.u,
            this.size++);
            return this
        }
        ;
        e.prototype.delete = function(g) {
            g = d(this, g);
            return g.u && g.list ? (g.list.splice(g.index, 1),
            g.list.length || delete this[0][g.id],
            g.u.C.next = g.u.next,
            g.u.next.C = g.u.C,
            g.u.head = null,
            this.size--,
            !0) : !1
        }
        ;
        e.prototype.clear = function() {
            this[0] = {};
            this[1] = this[1].C = b();
            this.size = 0
        }
        ;
        e.prototype.has = function(g) {
            return !!d(this, g).u
        }
        ;
        e.prototype.get = function(g) {
            return (g = d(this, g).u) && g.value
        }
        ;
        e.prototype.entries = function() {
            return c(this, function(g) {
                return [g.key, g.value]
            })
        }
        ;
        e.prototype.keys = function() {
            return c(this, function(g) {
                return g.key
            })
        }
        ;
        e.prototype.values = function() {
            return c(this, function(g) {
                return g.value
            })
        }
        ;
        e.prototype.forEach = function(g, k) {
            for (var l = this.entries(), n; !(n = l.next()).done; )
                n = n.value,
                g.call(k, n[1], n[0], this)
        }
        ;
        e.prototype[Symbol.iterator] = e.prototype.entries;
        var f = 0;
        return e
    });
    function xa(a, b) {
        a instanceof String && (a += "");
        var c = 0
          , d = !1
          , e = {
            next: function() {
                if (!d && c < a.length) {
                    var h = c++;
                    return {
                        value: b(h, a[h]),
                        done: !1
                    }
                }
                d = !0;
                return {
                    done: !0,
                    value: void 0
                }
            }
        };
        e[Symbol.iterator] = function() {
            return e
        }
        ;
        return e
    }
    t("Array.prototype.entries", function(a) {
        return a ? a : function() {
            return xa(this, function(b, c) {
                return [b, c]
            })
        }
    });
    t("Array.prototype.keys", function(a) {
        return a ? a : function() {
            return xa(this, function(b) {
                return b
            })
        }
    });
    t("Array.prototype.find", function(a) {
        return a ? a : function(b, c) {
            a: {
                var d = this;
                d instanceof String && (d = String(d));
                for (var e = d.length, h = 0; h < e; h++) {
                    var f = d[h];
                    if (b.call(c, f, h, d)) {
                        b = f;
                        break a
                    }
                }
                b = void 0
            }
            return b
        }
    });
    t("Set", function(a) {
        function b(c) {
            this.g = new Map;
            if (c) {
                c = w(c);
                for (var d; !(d = c.next()).done; )
                    this.add(d.value)
            }
            this.size = this.g.size
        }
        if (function() {
            if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal)
                return !1;
            try {
                var c = Object.seal({
                    x: 4
                })
                  , d = new a(w([c]));
                if (!d.has(c) || 1 != d.size || d.add(c) != d || 1 != d.size || d.add({
                    x: 4
                }) != d || 2 != d.size)
                    return !1;
                var e = d.entries()
                  , h = e.next();
                if (h.done || h.value[0] != c || h.value[1] != c)
                    return !1;
                h = e.next();
                return h.done || h.value[0] == c || 4 != h.value[0].x || h.value[1] != h.value[0] ? !1 : e.next().done
            } catch (f) {
                return !1
            }
        }())
            return a;
        b.prototype.add = function(c) {
            c = 0 === c ? 0 : c;
            this.g.set(c, c);
            this.size = this.g.size;
            return this
        }
        ;
        b.prototype.delete = function(c) {
            c = this.g.delete(c);
            this.size = this.g.size;
            return c
        }
        ;
        b.prototype.clear = function() {
            this.g.clear();
            this.size = 0
        }
        ;
        b.prototype.has = function(c) {
            return this.g.has(c)
        }
        ;
        b.prototype.entries = function() {
            return this.g.entries()
        }
        ;
        b.prototype.values = function() {
            return this.g.values()
        }
        ;
        b.prototype.keys = b.prototype.values;
        b.prototype[Symbol.iterator] = b.prototype.values;
        b.prototype.forEach = function(c, d) {
            var e = this;
            this.g.forEach(function(h) {
                return c.call(d, h, h, e)
            })
        }
        ;
        return b
    });
    t("Array.from", function(a) {
        return a ? a : function(b, c, d) {
            c = null != c ? c : function(g) {
                return g
            }
            ;
            var e = []
              , h = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
            if ("function" == typeof h) {
                b = h.call(b);
                for (var f = 0; !(h = b.next()).done; )
                    e.push(c.call(d, h.value, f++))
            } else
                for (h = b.length,
                f = 0; f < h; f++)
                    e.push(c.call(d, b[f], f));
            return e
        }
    });
    t("Array.prototype.values", function(a) {
        return a ? a : function() {
            return xa(this, function(b, c) {
                return c
            })
        }
    });
    t("Object.entries", function(a) {
        return a ? a : function(b) {
            var c = [], d;
            for (d in b)
                x(b, d) && c.push([d, b[d]]);
            return c
        }
    });
    /*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
    var ya = ya || {}
      , B = this || self;
    function za(a, b, c) {
        return a.call.apply(a.bind, arguments)
    }
    function Aa(a, b, c) {
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
    function C(a, b, c) {
        C = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? za : Aa;
        return C.apply(null, arguments)
    }
    function D(a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.W = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a;
        a.ua = function(d, e, h) {
            for (var f = Array(arguments.length - 2), g = 2; g < arguments.length; g++)
                f[g - 2] = arguments[g];
            return b.prototype[e].apply(d, f)
        }
    }
    ;var Ba = "am ar bg bn ca cs da de el en en_gb es es_419 et fa fi fil fr gu hi hr hu id it iw ja kn ko lt lv ml mr ms nl no pl pt_br pt_pt ro ru sk sl sr sv sw ta te th tr uk vi zh_cn zh_tw".split(" ");
    function E(a) {
        return a.replace("-", "_").toLowerCase()
    }
    ;var Ca = "af am ar az be bg bn bs ca cs da de el en en_gb es es_419 et eu fa fi fil fr fr_ca gl gu hi hr hu hy id is it iw ja ka kk km kn ko ky lo lt lv mk ml mn mr ms my ne nl no pa pl pt_br pt_pt ro ru si sk sl sq sr sv sw ta te th tk tr uk ur uz vi zh_cn zh_hk zh_tw zu en_xa ar_xb".split(" ");
    function Da(a, b) {
        b = void 0 === b ? Ca : b;
        a = E(a);
        if (b.includes(a))
            return a;
        a = (a = a.match(/^\w{2,3}([-_]|$)/)) ? a[0].replace(/[_-]/g, "") : "";
        return b.includes(a) ? a : null
    }
    ;var Ea = Array.prototype.indexOf ? function(a, b) {
        return Array.prototype.indexOf.call(a, b, void 0)
    }
    : function(a, b) {
        if ("string" === typeof a)
            return "string" !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0);
        for (var c = 0; c < a.length; c++)
            if (c in a && a[c] === b)
                return c;
        return -1
    }
    ;
    function Fa(a, b) {
        b = Ea(a, b);
        var c;
        (c = 0 <= b) && Array.prototype.splice.call(a, b, 1);
        return c
    }
    ;var Ga = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
    function Ha(a, b) {
        for (var c, d, e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d)
                a[c] = d[c];
            for (var h = 0; h < Ga.length; h++)
                c = Ga[h],
                Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
        }
    }
    ;function F(a) {
        return /^[\s\xa0]*$/.test(a)
    }
    ;var Ia, Ja;
    a: {
        for (var Ka = ["CLOSURE_FLAGS"], La = B, Ma = 0; Ma < Ka.length; Ma++)
            if (La = La[Ka[Ma]],
            null == La) {
                Ja = null;
                break a
            }
        Ja = La
    }
    var Na = Ja && Ja[610401301];
    Ia = null != Na ? Na : !1;
    function G() {
        var a = B.navigator;
        return a && (a = a.userAgent) ? a : ""
    }
    var H, Oa = B.navigator;
    H = Oa ? Oa.userAgentData || null : null;
    function Pa(a) {
        return Ia ? H ? H.brands.some(function(b) {
            return (b = b.brand) && -1 != b.indexOf(a)
        }) : !1 : !1
    }
    function I(a) {
        return -1 != G().indexOf(a)
    }
    ;function J() {
        return Ia ? !!H && 0 < H.brands.length : !1
    }
    function Qa() {
        return J() ? !1 : I("Opera")
    }
    function Ra() {
        return I("Firefox") || I("FxiOS")
    }
    function Sa() {
        return J() ? Pa("Chromium") : (I("Chrome") || I("CriOS")) && !(J() ? 0 : I("Edge")) || I("Silk")
    }
    ;var Ta = new Map([[E("am"), {
        name: "\u1212\u1233\u1265 \u121b\u1235\u12eb \u121b\u123d\u1295",
        short_name: "\u1212\u1233\u1265 \u121b\u1235\u12eb \u121b\u123d\u1295"
    }], [E("ar"), {
        name: "\u0627\u0644\u0622\u0644\u0629 \u0627\u0644\u062d\u0627\u0633\u0628\u0629",
        short_name: "\u0627\u0644\u0622\u0644\u0629 \u0627\u0644\u062d\u0627\u0633\u0628\u0629"
    }], [E("bg"), {
        name: "\u041a\u0430\u043b\u043a\u0443\u043b\u0430\u0442\u043e\u0440",
        short_name: "\u041a\u0430\u043b\u043a\u0443\u043b\u0430\u0442\u043e\u0440"
    }], [E("bn"), {
        name: "\u0995\u09cd\u09af\u09be\u09b2\u0995\u09c1\u09b2\u09c7\u099f\u09b0",
        short_name: "\u0995\u09cd\u09af\u09be\u09b2\u0995\u09c1\u09b2\u09c7\u099f\u09b0"
    }], [E("ca"), {
        name: "Calculadora",
        short_name: "Calculadora"
    }], [E("cs"), {
        name: "Kalkula\u010dka",
        short_name: "Kalkula\u010dka"
    }], [E("da"), {
        name: "Lommeregner",
        short_name: "Lommeregner"
    }], [E("de"), {
        name: "Rechner",
        short_name: "Rechner"
    }], [E("el"), {
        name: "\u0391\u03c1\u03b9\u03b8\u03bc\u03bf\u03bc\u03b7\u03c7\u03b1\u03bd\u03ae",
        short_name: "\u0391\u03c1\u03b9\u03b8\u03bc\u03bf\u03bc\u03b7\u03c7\u03b1\u03bd\u03ae"
    }], [E("en-GB"), {
        name: "Calculator",
        short_name: "Calculator"
    }], [E("en"), {
        name: "Calculator",
        short_name: "Calculator"
    }], [E("es-419"), {
        name: "Calculadora",
        short_name: "Calculadora"
    }], [E("es"), {
        name: "Calculadora",
        short_name: "Calculadora"
    }], [E("et"), {
        name: "Kalkulaator",
        short_name: "Kalkulaator"
    }], [E("fa"), {
        name: "\u0645\u0627\u0634\u06cc\u0646 \u062d\u0633\u0627\u0628",
        short_name: "\u0645\u0627\u0634\u06cc\u0646 \u062d\u0633\u0627\u0628"
    }], [E("fil"), {
        name: "Calculator",
        short_name: "Calculator"
    }], [E("fi"), {
        name: "Laskin",
        short_name: "Laskin"
    }], [E("fr"), {
        name: "Calculatrice",
        short_name: "Calculatrice"
    }], [E("gu"), {
        name: "\u0a95\u0ac7\u0ab2\u0acd\u0a95\u0acd\u0aaf\u0ac1\u0ab2\u0ac7\u0a9f\u0ab0",
        short_name: "\u0a95\u0ac7\u0ab2\u0acd\u0a95\u0acd\u0aaf\u0ac1\u0ab2\u0ac7\u0a9f\u0ab0"
    }], [E("hi"), {
        name: "\u0915\u0948\u0932\u094d\u200d\u0915\u094d\u200d\u092f\u0942\u0932\u0947\u091f\u0930",
        short_name: "\u0915\u0948\u0932\u094d\u200d\u0915\u094d\u200d\u092f\u0942\u0932\u0947\u091f\u0930"
    }], [E("hr"), {
        name: "Kalkulator",
        short_name: "Kalkulator"
    }], [E("hu"), {
        name: "Sz\u00e1mol\u00f3g\u00e9p",
        short_name: "Sz\u00e1mol\u00f3g\u00e9p"
    }], [E("id"), {
        name: "Kalkulator",
        short_name: "Kalkulator"
    }], [E("it"), {
        name: "Calcolatrice",
        short_name: "Calcolatrice"
    }], [E("iw"), {
        name: "\u05de\u05d7\u05e9\u05d1\u05d5\u05df",
        short_name: "\u05de\u05d7\u05e9\u05d1\u05d5\u05df"
    }], [E("ja"), {
        name: "\u96fb\u5353",
        short_name: "\u96fb\u5353"
    }], [E("kn"), {
        name: "\u0c95\u0ccd\u0caf\u0cbe\u0cb2\u0ccd\u0c95\u0cc1\u0cb2\u0cc6\u0cd5\u0c9f\u0cb0\u0ccd",
        short_name: "\u0c95\u0ccd\u0caf\u0cbe\u0cb2\u0ccd\u0c95\u0cc1\u0cb2\u0cc6\u0cd5\u0c9f\u0cb0\u0ccd"
    }], [E("ko"), {
        name: "\uacc4\uc0b0\uae30",
        short_name: "\uacc4\uc0b0\uae30"
    }], [E("lt"), {
        name: "Skai\u010diuotuvas",
        short_name: "Skai\u010diuotuvas"
    }], [E("lv"), {
        name: "Kalkulators",
        short_name: "Kalkulators"
    }], [E("ml"), {
        name: "\u0d15\u0d3e\u0d7d\u0d15\u0d4d\u0d15\u0d41\u0d32\u0d47\u0d31\u0d4d\u0d31\u0d7c",
        short_name: "\u0d15\u0d3e\u0d7d\u0d15\u0d4d\u0d15\u0d41\u0d32\u0d47\u0d31\u0d4d\u0d31\u0d7c"
    }], [E("mr"), {
        name: "\u0915\u0945\u0932\u0915\u094d\u092f\u0941\u0932\u0947\u091f\u0930",
        short_name: "\u0915\u0945\u0932\u0915\u094d\u092f\u0941\u0932\u0947\u091f\u0930"
    }], [E("ms"), {
        name: "Kalkulator",
        short_name: "Kalkulator"
    }], [E("nl"), {
        name: "Rekenmachine",
        short_name: "Rekenmachine"
    }], [E("no"), {
        name: "Kalkulator",
        short_name: "Kalkulator"
    }], [E("pl"), {
        name: "Kalkulator",
        short_name: "Kalkulator"
    }], [E("pt-BR"), {
        name: "Calculadora",
        short_name: "Calculadora"
    }], [E("pt-PT"), {
        name: "Calculadora",
        short_name: "Calculadora"
    }], [E("ro"), {
        name: "Calculator",
        short_name: "Calculator"
    }], [E("ru"), {
        name: "\u041a\u0430\u043b\u044c\u043a\u0443\u043b\u044f\u0442\u043e\u0440",
        short_name: "\u041a\u0430\u043b\u044c\u043a\u0443\u043b\u044f\u0442\u043e\u0440"
    }], [E("sk"), {
        name: "Kalkula\u010dka",
        short_name: "Kalkula\u010dka"
    }], [E("sl"), {
        name: "Ra\u010dunalo",
        short_name: "Ra\u010dunalo"
    }], [E("sr"), {
        name: "\u041a\u0430\u043b\u043a\u0443\u043b\u0430\u0442\u043e\u0440",
        short_name: "\u041a\u0430\u043b\u043a\u0443\u043b\u0430\u0442\u043e\u0440"
    }], [E("sv"), {
        name: "Kalkylator",
        short_name: "Kalkylator"
    }], [E("sw"), {
        name: "Kikokotoo",
        short_name: "Kikokotoo"
    }], [E("ta"), {
        name: "\u0b95\u0bbe\u0bb2\u0bcd\u0b95\u0bc1\u0bb2\u0bc7\u0b9f\u0bcd\u0b9f\u0bb0\u0bcd",
        short_name: "\u0b95\u0bbe\u0bb2\u0bcd\u0b95\u0bc1\u0bb2\u0bc7\u0b9f\u0bcd\u0b9f\u0bb0\u0bcd"
    }], [E("te"), {
        name: "\u0c15\u0c3e\u0c32\u0c3f\u0c15\u0c4d\u0c2f\u0c41\u0c32\u0c47\u0c1f\u0c30\u0c4d",
        short_name: "\u0c15\u0c3e\u0c32\u0c3f\u0c15\u0c4d\u0c2f\u0c41\u0c32\u0c47\u0c1f\u0c30\u0c4d"
    }], [E("th"), {
        name: "\u0e40\u0e04\u0e23\u0e37\u0e48\u0e2d\u0e07\u0e04\u0e34\u0e14\u0e40\u0e25\u0e02",
        short_name: "\u0e40\u0e04\u0e23\u0e37\u0e48\u0e2d\u0e07\u0e04\u0e34\u0e14\u0e40\u0e25\u0e02"
    }], [E("tr"), {
        name: "Hesap Makinesi",
        short_name: "Hesap Makinesi"
    }], [E("uk"), {
        name: "\u041a\u0430\u043b\u044c\u043a\u0443\u043b\u044f\u0442\u043e\u0440",
        short_name: "\u041a\u0430\u043b\u044c\u043a\u0443\u043b\u044f\u0442\u043e\u0440"
    }], [E("vi"), {
        name: "M\u00e1y t\u00ednh",
        short_name: "M\u00e1y t\u00ednh"
    }], [E("zh-CN"), {
        name: "\u8ba1\u7b97\u5668",
        short_name: "\u8ba1\u7b97\u5668"
    }], [E("zh-TW"), {
        name: "\u8a08\u7b97\u6a5f",
        short_name: "\u8a08\u7b97\u6a5f"
    }]]);
    function Ua() {}
    var K;
    function Va(a, b, c) {
        var d = void 0 === d ? Ua : d;
        if (K)
            throw Error("Trying to initialize error_collector twice.");
        K = {
            S: void 0 === b ? function() {}
            : b,
            L: void 0 === c ? function() {}
            : c,
            ia: a,
            la: d
        };
        self.addEventListener("error", Wa);
        self.addEventListener("unhandledrejection", Xa)
    }
    function Ya(a) {
        var b = new Set;
        return JSON.stringify(a, function(c, d) {
            if ("object" === typeof d && null !== d) {
                if (b.has(d))
                    return "Maybe Circular";
                b.add(d)
            }
            return d
        })
    }
    function Za(a) {
        if (!K)
            throw Error("error_collector not initialized");
        if (null === a || void 0 === a)
            K.L(a);
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
                a.type && e.push('ErrorEvent type: "' + a.type + '"');
                a.message && e.push('Message: "' + a.message + '"');
                a.filename && e.push('File: "' + a.filename + '"');
                if (a.error instanceof Error) {
                    var h = a.error;
                    e.push('Error: "' + h.message + '"')
                } else
                    a.error ? (a = JSON.stringify(a.error),
                    e.push("Error: " + a)) : h = null === a.error ? null : void 0;
                e = a = e.join("\n");
                if (!e && !h) {
                    K.L(h);
                    return
                }
                b = null != h ? h : null
            } else if ("string" === typeof a)
                e = a;
            else
                try {
                    e = JSON.stringify(a)
                } catch (f) {
                    e = Ya(a)
                }
            K.la(e, b);
            e = e.replace(/https?:\/\/[\w\.\-=_?#&$%\/]+/gi, "<url>");
            e = e.replace(/[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}/gi, "<uuid>");
            e = e.replace(/\w{30,}/g, "<long-word>");
            e = e.replace(/-?\b\d+\.\d+/g, "<NN>");
            e = e.replace(/-?\b\d{2,}/g, "<NN>");
            if (b && b.message !== e)
                try {
                    b.message = e
                } catch (f) {}
            try {
                K.ia.reportError(e, self.location.href, c, d, b)
            } catch (f) {
                K.S(f)
            }
        }
    }
    function Wa(a) {
        Za(a)
    }
    function Xa(a) {
        Za(a.reason)
    }
    ;function $a(a, b) {
        for (var c = a.split("%s"), d = "", e = Array.prototype.slice.call(arguments, 1); e.length && 1 < c.length; )
            d += c.shift() + e.shift()
    }
    function ab(a) {
        return null == a ? "" : String(a)
    }
    ;function bb(a) {
        this.i = a;
        this.j = "empty";
        this.g = null;
        this.h = {}
    }
    bb.prototype.N = function(a) {
        this.j = a;
        return this
    }
    ;
    bb.prototype.U = function(a) {
        this.g = a;
        return this
    }
    ;
    bb.prototype.V = function(a) {
        var b = {}, c;
        for (c in a)
            b[c] = a[c];
        this.h = b;
        return this
    }
    ;
    function cb() {}
    cb.prototype.next = function() {
        return db
    }
    ;
    var db = {
        done: !0,
        value: void 0
    };
    cb.prototype.I = function() {
        return this
    }
    ;
    function eb(a) {
        if (a instanceof L || a instanceof M || a instanceof N)
            return a;
        if ("function" == typeof a.next)
            return new L(function() {
                return a
            }
            );
        if ("function" == typeof a[Symbol.iterator])
            return new L(function() {
                return a[Symbol.iterator]()
            }
            );
        if ("function" == typeof a.I)
            return new L(function() {
                return a.I()
            }
            );
        throw Error("Not an iterator or iterable.");
    }
    function L(a) {
        this.g = a
    }
    L.prototype.I = function() {
        return new M(this.g())
    }
    ;
    L.prototype[Symbol.iterator] = function() {
        return new N(this.g())
    }
    ;
    L.prototype.h = function() {
        return new N(this.g())
    }
    ;
    function M(a) {
        this.g = a
    }
    na(M, cb);
    M.prototype.next = function() {
        return this.g.next()
    }
    ;
    M.prototype[Symbol.iterator] = function() {
        return new N(this.g)
    }
    ;
    M.prototype.h = function() {
        return new N(this.g)
    }
    ;
    function N(a) {
        L.call(this, function() {
            return a
        });
        this.i = a
    }
    na(N, L);
    N.prototype.next = function() {
        return this.i.next()
    }
    ;
    function fb() {}
    ;function gb() {}
    D(gb, fb);
    gb.prototype[Symbol.iterator] = function() {
        return eb(this.I(!0)).h()
    }
    ;
    function O(a) {
        this.g = a
    }
    D(O, gb);
    function hb(a) {
        if (!a.g)
            return !1;
        try {
            return a.g.setItem("__sak", "1"),
            a.g.removeItem("__sak"),
            !0
        } catch (b) {
            return !1
        }
    }
    O.prototype.set = function(a, b) {
        try {
            this.g.setItem(a, b)
        } catch (c) {
            if (0 == this.g.length)
                throw "Storage mechanism: Storage disabled";
            throw "Storage mechanism: Quota exceeded";
        }
    }
    ;
    O.prototype.get = function(a) {
        a = this.g.getItem(a);
        if ("string" !== typeof a && null !== a)
            throw "Storage mechanism: Invalid value was encountered";
        return a
    }
    ;
    O.prototype.I = function(a) {
        var b = 0
          , c = this.g
          , d = new cb;
        d.next = function() {
            if (b >= c.length)
                return db;
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
    O.prototype.key = function(a) {
        return this.g.key(a)
    }
    ;
    function ib() {
        var a = null;
        try {
            a = window.localStorage || null
        } catch (b) {}
        this.g = a
    }
    D(ib, O);
    function jb(a, b) {
        this.i = a;
        this.g = [];
        null === kb && (kb = null);
        this.h = null;
        b && (this.h = new ib);
        if (null != this.h && hb(this.h) && (a = this.h.get("__webmonitoring_RateThrottler_history_hourlyRate"),
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
        a && lb(this)
    }
    function lb(a) {
        if (null != a.h && hb(a.h))
            try {
                a.h.set("__webmonitoring_RateThrottler_history_hourlyRate", JSON.stringify(a.g))
            } catch (b) {}
    }
    var kb = null;
    function P() {
        this.l = this.l;
        this.o = this.o
    }
    P.prototype.l = !1;
    P.prototype.J = function() {
        if (this.o)
            for (; this.o.length; )
                this.o.shift()()
    }
    ;
    function mb(a) {
        P.call(this);
        this.g = a;
        this.F = !1
    }
    D(mb, P);
    function nb() {
        return Ia ? !!H && !!H.platform : !1
    }
    function ob() {
        return nb() ? "Android" === H.platform : I("Android")
    }
    function pb() {
        return I("iPhone") && !I("iPod") && !I("iPad")
    }
    function qb() {
        return pb() || I("iPad") || I("iPod")
    }
    function rb() {
        return nb() ? "macOS" === H.platform : I("Macintosh")
    }
    function sb() {
        return nb() ? "Windows" === H.platform : I("Windows")
    }
    function tb() {
        return nb() ? "Chrome OS" === H.platform : I("CrOS")
    }
    function ub() {
        var a = G()
          , b = "";
        sb() ? (b = /Windows (?:NT|Phone) ([0-9.]+)/,
        b = (a = b.exec(a)) ? a[1] : "0.0") : qb() ? (b = /(?:iPhone|iPod|iPad|CPU)\s+OS\s+(\S+)/,
        b = (a = b.exec(a)) && a[1].replace(/_/g, ".")) : rb() ? (b = /Mac OS X ([0-9_.]+)/,
        b = (a = b.exec(a)) ? a[1].replace(/_/g, ".") : "10") : -1 != G().toLowerCase().indexOf("kaios") ? (b = /(?:KaiOS)\/(\S+)/i,
        b = (a = b.exec(a)) && a[1]) : ob() ? (b = /Android\s+([^\);]+)(\)|;)/,
        b = (a = b.exec(a)) && a[1]) : tb() && (b = /(?:CrOS\s+(?:i686|x86_64)\s+([0-9.]+))/,
        b = (a = b.exec(a)) && a[1]);
        return b || ""
    }
    ;function vb(a, b) {
        this.type = a;
        this.g = this.target = b;
        this.defaultPrevented = !1
    }
    ;var wb = Qa(), xb = J() ? !1 : I("Trident") || I("MSIE"), yb = I("Edge"), zb = I("Gecko") && !(-1 != G().toLowerCase().indexOf("webkit") && !I("Edge")) && !(I("Trident") || I("MSIE")) && !I("Edge"), Ab = -1 != G().toLowerCase().indexOf("webkit") && !I("Edge"), Bb;
    a: {
        var Cb = ""
          , Db = function() {
            var a = G();
            if (zb)
                return /rv:([^\);]+)(\)|;)/.exec(a);
            if (yb)
                return /Edge\/([\d\.]+)/.exec(a);
            if (xb)
                return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
            if (Ab)
                return /WebKit\/(\S+)/.exec(a);
            if (wb)
                return /(?:Version)[ \/]?(\S+)/.exec(a)
        }();
        Db && (Cb = Db ? Db[1] : "");
        if (xb) {
            var Eb, Fb = B.document;
            Eb = Fb ? Fb.documentMode : void 0;
            if (null != Eb && Eb > parseFloat(Cb)) {
                Bb = String(Eb);
                break a
            }
        }
        Bb = Cb
    }
    var Gb = Bb;
    var Hb = "closure_listenable_" + (1E6 * Math.random() | 0);
    var Ib = 0;
    function Jb(a, b, c, d, e) {
        this.listener = a;
        this.proxy = null;
        this.src = b;
        this.type = c;
        this.capture = !!d;
        this.T = e;
        this.key = ++Ib;
        this.M = this.R = !1
    }
    function Kb(a) {
        a.M = !0;
        a.listener = null;
        a.proxy = null;
        a.src = null;
        a.T = null
    }
    ;function Lb(a) {
        this.src = a;
        this.g = {};
        this.h = 0
    }
    Lb.prototype.add = function(a, b, c, d, e) {
        var h = a.toString();
        a = this.g[h];
        a || (a = this.g[h] = [],
        this.h++);
        var f = Mb(a, b, d, e);
        -1 < f ? (b = a[f],
        c || (b.R = !1)) : (b = new Jb(b,this.src,h,!!d,e),
        b.R = c,
        a.push(b));
        return b
    }
    ;
    function Nb(a, b) {
        var c = b.type;
        c in a.g && Fa(a.g[c], b) && (Kb(b),
        0 == a.g[c].length && (delete a.g[c],
        a.h--))
    }
    function Mb(a, b, c, d) {
        for (var e = 0; e < a.length; ++e) {
            var h = a[e];
            if (!h.M && h.listener == b && h.capture == !!c && h.T == d)
                return e
        }
        return -1
    }
    ;var Ob = "closure_lm_" + (1E6 * Math.random() | 0)
      , Pb = {}
      , Qb = 0;
    function Rb(a, b, c, d, e) {
        if (Array.isArray(b))
            for (var h = 0; h < b.length; h++)
                Rb(a, b[h], c, d, e);
        else
            (h = typeof d,
            d = "object" == h && null != d || "function" == h ? !!d.capture : !!d,
            c = Sb(c),
            a && a[Hb]) ? (a = a.i,
            b = String(b).toString(),
            b in a.g && (h = a.g[b],
            c = Mb(h, c, d, e),
            -1 < c && (Kb(h[c]),
            Array.prototype.splice.call(h, c, 1),
            0 == h.length && (delete a.g[b],
            a.h--)))) : a && (a = Tb(a)) && (b = a.g[b.toString()],
            a = -1,
            b && (a = Mb(b, c, d, e)),
            (c = -1 < a ? b[a] : null) && "number" !== typeof c && c && !c.M && ((e = c.src) && e[Hb] ? Nb(e.i, c) : (d = c.type,
            b = c.proxy,
            e.removeEventListener ? e.removeEventListener(d, b, c.capture) : e.detachEvent ? e.detachEvent(d in Pb ? Pb[d] : Pb[d] = "on" + d, b) : e.addListener && e.removeListener && e.removeListener(b),
            Qb--,
            (d = Tb(e)) ? (Nb(d, c),
            0 == d.h && (d.src = null,
            e[Ob] = null)) : Kb(c))))
    }
    function Tb(a) {
        a = a[Ob];
        return a instanceof Lb ? a : null
    }
    var Ub = "__closure_events_fn_" + (1E9 * Math.random() >>> 0);
    function Sb(a) {
        if ("function" === typeof a)
            return a;
        a[Ub] || (a[Ub] = function(b) {
            return a.handleEvent(b)
        }
        );
        return a[Ub]
    }
    ;function Q() {
        P.call(this);
        this.i = new Lb(this);
        this.da = this;
        this.H = null
    }
    D(Q, P);
    Q.prototype[Hb] = !0;
    Q.prototype.removeEventListener = function(a, b, c, d) {
        Rb(this, a, b, c, d)
    }
    ;
    function R(a, b) {
        var c, d = a.H;
        if (d)
            for (c = []; d; d = d.H)
                c.push(d);
        a = a.da;
        d = b.type || b;
        if ("string" === typeof b)
            b = new vb(b,a);
        else if (b instanceof vb)
            b.target = b.target || a;
        else {
            var e = b;
            b = new vb(d,a);
            Ha(b, e)
        }
        e = !0;
        if (c)
            for (var h = c.length - 1; 0 <= h; h--) {
                var f = b.g = c[h];
                e = Vb(f, d, !0, b) && e
            }
        f = b.g = a;
        e = Vb(f, d, !0, b) && e;
        e = Vb(f, d, !1, b) && e;
        if (c)
            for (h = 0; h < c.length; h++)
                f = b.g = c[h],
                e = Vb(f, d, !1, b) && e
    }
    Q.prototype.J = function() {
        Q.W.J.call(this);
        if (this.i) {
            var a = this.i, b = 0, c;
            for (c in a.g) {
                for (var d = a.g[c], e = 0; e < d.length; e++)
                    ++b,
                    Kb(d[e]);
                delete a.g[c];
                a.h--
            }
        }
        this.H = null
    }
    ;
    function Vb(a, b, c, d) {
        b = a.i.g[String(b)];
        if (!b)
            return !0;
        b = b.concat();
        for (var e = !0, h = 0; h < b.length; ++h) {
            var f = b[h];
            if (f && !f.M && f.capture == c) {
                var g = f.listener
                  , k = f.T || f.src;
                f.R && Nb(a.i, f);
                e = !1 !== g.call(k, d) && e
            }
        }
        return e && !d.defaultPrevented
    }
    ;function Wb() {}
    Wb.prototype.g = null;
    function Xb(a) {
        var b;
        (b = a.g) || (b = {},
        Yb(a) && (b[0] = !0,
        b[1] = !0),
        b = a.g = b);
        return b
    }
    ;var Zb;
    function $b() {}
    D($b, Wb);
    function ac(a) {
        return (a = Yb(a)) ? new ActiveXObject(a) : new XMLHttpRequest
    }
    function Yb(a) {
        if (!a.h && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
            for (var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0; c < b.length; c++) {
                var d = b[c];
                try {
                    return new ActiveXObject(d),
                    a.h = d
                } catch (e) {}
            }
            throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
        }
        return a.h
    }
    Zb = new $b;
    function bc(a, b, c) {
        if ("function" === typeof a)
            c && (a = C(a, c));
        else if (a && "function" == typeof a.handleEvent)
            a = C(a.handleEvent, a);
        else
            throw Error("Invalid listener argument");
        return 2147483647 < Number(b) ? -1 : B.setTimeout(a, b || 0)
    }
    ;var cc = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");
    function dc(a, b) {
        if (a) {
            a = a.split("&");
            for (var c = 0; c < a.length; c++) {
                var d = a[c].indexOf("=")
                  , e = null;
                if (0 <= d) {
                    var h = a[c].substring(0, d);
                    e = a[c].substring(d + 1)
                } else
                    h = a[c];
                b(h, e ? decodeURIComponent(e.replace(/\+/g, " ")) : "")
            }
        }
    }
    ;function ec(a) {
        Q.call(this);
        this.headers = new Map;
        this.B = a || null;
        this.h = !1;
        this.A = this.g = null;
        this.G = "";
        this.j = this.F = this.m = this.D = !1;
        this.v = 0;
        this.s = null;
        this.X = "";
        this.O = this.P = !1
    }
    D(ec, Q);
    var fc = /^https?$/i
      , gc = ["POST", "PUT"]
      , hc = [];
    m = ec.prototype;
    m.ga = function() {
        this.l || (this.l = !0,
        this.J());
        Fa(hc, this)
    }
    ;
    function ic(a, b, c, d) {
        if (a.g)
            throw Error("[goog.net.XhrIo] Object is active with another request=" + a.G + "; newUri=" + b);
        a.G = b;
        a.D = !1;
        a.h = !0;
        a.g = a.B ? ac(a.B) : ac(Zb);
        a.A = a.B ? Xb(a.B) : Xb(Zb);
        a.g.onreadystatechange = C(a.aa, a);
        try {
            a.F = !0,
            a.g.open("POST", String(b), !0),
            a.F = !1
        } catch (f) {
            jc(a);
            return
        }
        b = c || "";
        c = new Map(a.headers);
        if (d)
            if (Object.getPrototypeOf(d) === Object.prototype)
                for (var e in d)
                    c.set(e, d[e]);
            else if ("function" === typeof d.keys && "function" === typeof d.get) {
                e = w(d.keys());
                for (var h = e.next(); !h.done; h = e.next())
                    h = h.value,
                    c.set(h, d.get(h))
            } else
                throw Error("Unknown input type for opt_headers: " + String(d));
        d = Array.from(c.keys()).find(function(f) {
            return "content-type" == f.toLowerCase()
        });
        e = B.FormData && b instanceof B.FormData;
        !(0 <= Ea(gc, "POST")) || d || e || c.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        d = w(c);
        for (c = d.next(); !c.done; c = d.next())
            e = w(c.value),
            c = e.next().value,
            e = e.next().value,
            a.g.setRequestHeader(c, e);
        a.X && (a.g.responseType = a.X);
        "withCredentials"in a.g && a.g.withCredentials !== a.P && (a.g.withCredentials = a.P);
        try {
            kc(a),
            0 < a.v && (a.O = lc(a.g),
            a.O ? (a.g.timeout = a.v,
            a.g.ontimeout = C(a.ca, a)) : a.s = bc(a.ca, a.v, a)),
            a.m = !0,
            a.g.send(b),
            a.m = !1
        } catch (f) {
            jc(a)
        }
    }
    function lc(a) {
        return xb && "number" === typeof a.timeout && void 0 !== a.ontimeout
    }
    m.ca = function() {
        "undefined" != typeof ya && this.g && (R(this, "timeout"),
        this.abort(8))
    }
    ;
    function jc(a) {
        a.h = !1;
        a.g && (a.j = !0,
        a.g.abort(),
        a.j = !1);
        mc(a);
        nc(a)
    }
    function mc(a) {
        a.D || (a.D = !0,
        R(a, "complete"),
        R(a, "error"))
    }
    m.abort = function() {
        this.g && this.h && (this.h = !1,
        this.j = !0,
        this.g.abort(),
        this.j = !1,
        R(this, "complete"),
        R(this, "abort"),
        nc(this))
    }
    ;
    m.J = function() {
        this.g && (this.h && (this.h = !1,
        this.j = !0,
        this.g.abort(),
        this.j = !1),
        nc(this, !0));
        ec.W.J.call(this)
    }
    ;
    m.aa = function() {
        this.l || (this.F || this.m || this.j ? oc(this) : this.oa())
    }
    ;
    m.oa = function() {
        oc(this)
    }
    ;
    function oc(a) {
        if (a.h && "undefined" != typeof ya && (!a.A[1] || 4 != (a.g ? a.g.readyState : 0) || 2 != pc(a)))
            if (a.m && 4 == (a.g ? a.g.readyState : 0))
                bc(a.aa, 0, a);
            else if (R(a, "readystatechange"),
            4 == (a.g ? a.g.readyState : 0)) {
                a.h = !1;
                try {
                    qc(a) ? (R(a, "complete"),
                    R(a, "success")) : mc(a)
                } finally {
                    nc(a)
                }
            }
    }
    function nc(a, b) {
        if (a.g) {
            kc(a);
            var c = a.g
              , d = a.A[0] ? function() {}
            : null;
            a.g = null;
            a.A = null;
            b || R(a, "ready");
            try {
                c.onreadystatechange = d
            } catch (e) {}
        }
    }
    function kc(a) {
        a.g && a.O && (a.g.ontimeout = null);
        a.s && (B.clearTimeout(a.s),
        a.s = null)
    }
    m.isActive = function() {
        return !!this.g
    }
    ;
    function qc(a) {
        var b = pc(a);
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
                a = String(a.G).match(cc)[1] || null,
                !a && B.self && B.self.location && (a = B.self.location.protocol.slice(0, -1)),
                b = !fc.test(a ? a.toLowerCase() : "");
            c = b
        }
        return c
    }
    function pc(a) {
        try {
            return 2 < (a.g ? a.g.readyState : 0) ? a.g.status : -1
        } catch (b) {
            return -1
        }
    }
    ;function S(a) {
        this.h = this.o = this.i = "";
        this.s = null;
        this.l = this.g = "";
        this.j = !1;
        var b;
        a instanceof S ? (this.j = a.j,
        rc(this, a.i),
        this.o = a.o,
        this.h = a.h,
        sc(this, a.s),
        this.g = a.g,
        tc(this, uc(a.m)),
        this.l = a.l) : a && (b = String(a).match(cc)) ? (this.j = !1,
        rc(this, b[1] || "", !0),
        this.o = vc(b[2] || ""),
        this.h = vc(b[3] || "", !0),
        sc(this, b[4]),
        this.g = vc(b[5] || "", !0),
        tc(this, b[6] || "", !0),
        this.l = vc(b[7] || "")) : (this.j = !1,
        this.m = new wc(null,this.j))
    }
    S.prototype.toString = function() {
        var a = []
          , b = this.i;
        b && a.push(xc(b, yc, !0), ":");
        var c = this.h;
        if (c || "file" == b)
            a.push("//"),
            (b = this.o) && a.push(xc(b, yc, !0), "@"),
            a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")),
            c = this.s,
            null != c && a.push(":", String(c));
        if (c = this.g)
            this.h && "/" != c.charAt(0) && a.push("/"),
            a.push(xc(c, "/" == c.charAt(0) ? zc : Ac, !0));
        (c = this.m.toString()) && a.push("?", c);
        (c = this.l) && a.push("#", xc(c, Bc));
        return a.join("")
    }
    ;
    S.prototype.resolve = function(a) {
        var b = new S(this)
          , c = !!a.i;
        c ? rc(b, a.i) : c = !!a.o;
        c ? b.o = a.o : c = !!a.h;
        c ? b.h = a.h : c = null != a.s;
        var d = a.g;
        if (c)
            sc(b, a.s);
        else if (c = !!a.g) {
            if ("/" != d.charAt(0))
                if (this.h && !this.g)
                    d = "/" + d;
                else {
                    var e = b.g.lastIndexOf("/");
                    -1 != e && (d = b.g.slice(0, e + 1) + d)
                }
            e = d;
            if (".." == e || "." == e)
                d = "";
            else if (-1 != e.indexOf("./") || -1 != e.indexOf("/.")) {
                d = 0 == e.lastIndexOf("/", 0);
                e = e.split("/");
                for (var h = [], f = 0; f < e.length; ) {
                    var g = e[f++];
                    "." == g ? d && f == e.length && h.push("") : ".." == g ? ((1 < h.length || 1 == h.length && "" != h[0]) && h.pop(),
                    d && f == e.length && h.push("")) : (h.push(g),
                    d = !0)
                }
                d = h.join("/")
            } else
                d = e
        }
        c ? b.g = d : c = "" !== a.m.toString();
        c ? tc(b, uc(a.m)) : c = !!a.l;
        c && (b.l = a.l);
        return b
    }
    ;
    function rc(a, b, c) {
        a.i = c ? vc(b, !0) : b;
        a.i && (a.i = a.i.replace(/:$/, ""))
    }
    function sc(a, b) {
        if (b) {
            b = Number(b);
            if (isNaN(b) || 0 > b)
                throw Error("Bad port number " + b);
            a.s = b
        } else
            a.s = null
    }
    function tc(a, b, c) {
        b instanceof wc ? (a.m = b,
        Cc(a.m, a.j)) : (c || (b = xc(b, Dc)),
        a.m = new wc(b,a.j))
    }
    function vc(a, b) {
        return a ? b ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : ""
    }
    function xc(a, b, c) {
        return "string" === typeof a ? (a = encodeURI(a).replace(b, Ec),
        c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")),
        a) : null
    }
    function Ec(a) {
        a = a.charCodeAt(0);
        return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
    }
    var yc = /[#\/\?@]/g
      , Ac = /[#\?:]/g
      , zc = /[#\?]/g
      , Dc = /[#\?@]/g
      , Bc = /#/g;
    function wc(a, b) {
        this.h = this.g = null;
        this.i = a || null;
        this.j = !!b
    }
    function T(a) {
        a.g || (a.g = new Map,
        a.h = 0,
        a.i && dc(a.i, function(b, c) {
            a.add(decodeURIComponent(b.replace(/\+/g, " ")), c)
        }))
    }
    m = wc.prototype;
    m.add = function(a, b) {
        T(this);
        this.i = null;
        a = U(this, a);
        var c = this.g.get(a);
        c || this.g.set(a, c = []);
        c.push(b);
        this.h += 1;
        return this
    }
    ;
    function Fc(a, b) {
        T(a);
        b = U(a, b);
        a.g.has(b) && (a.i = null,
        a.h -= a.g.get(b).length,
        a.g.delete(b))
    }
    function Gc(a, b) {
        T(a);
        b = U(a, b);
        return a.g.has(b)
    }
    m.forEach = function(a, b) {
        T(this);
        this.g.forEach(function(c, d) {
            c.forEach(function(e) {
                a.call(b, e, d, this)
            }, this)
        }, this)
    }
    ;
    function Hc(a, b) {
        T(a);
        var c = [];
        if ("string" === typeof b)
            Gc(a, b) && (c = c.concat(a.g.get(U(a, b))));
        else
            for (a = Array.from(a.g.values()),
            b = 0; b < a.length; b++)
                c = c.concat(a[b]);
        return c
    }
    m.set = function(a, b) {
        T(this);
        this.i = null;
        a = U(this, a);
        Gc(this, a) && (this.h -= this.g.get(a).length);
        this.g.set(a, [b]);
        this.h += 1;
        return this
    }
    ;
    m.get = function(a, b) {
        if (!a)
            return b;
        a = Hc(this, a);
        return 0 < a.length ? String(a[0]) : b
    }
    ;
    m.toString = function() {
        if (this.i)
            return this.i;
        if (!this.g)
            return "";
        for (var a = [], b = Array.from(this.g.keys()), c = 0; c < b.length; c++) {
            var d = b[c]
              , e = encodeURIComponent(String(d));
            d = Hc(this, d);
            for (var h = 0; h < d.length; h++) {
                var f = e;
                "" !== d[h] && (f += "=" + encodeURIComponent(String(d[h])));
                a.push(f)
            }
        }
        return this.i = a.join("&")
    }
    ;
    function uc(a) {
        var b = new wc;
        b.i = a.i;
        a.g && (b.g = new Map(a.g),
        b.h = a.h);
        return b
    }
    function U(a, b) {
        b = String(b);
        a.j && (b = b.toLowerCase());
        return b
    }
    function Cc(a, b) {
        b && !a.j && (T(a),
        a.i = null,
        a.g.forEach(function(c, d) {
            var e = d.toLowerCase();
            if (d != e && (Fc(this, d),
            Fc(this, e),
            0 < c.length)) {
                this.i = null;
                d = this.g;
                var h = d.set;
                e = U(this, e);
                var f = c.length;
                if (0 < f) {
                    for (var g = Array(f), k = 0; k < f; k++)
                        g[k] = c[k];
                    f = g
                } else
                    f = [];
                h.call(d, e, f);
                this.h += c.length
            }
        }, a));
        a.j = b
    }
    ;var Ic = Ra()
      , Jc = pb() || I("iPod")
      , Kc = I("iPad")
      , Lc = I("Android") && !(Sa() || Ra() || Qa() || I("Silk"))
      , Mc = Sa()
      , Nc = I("Safari") && !(Sa() || (J() ? 0 : I("Coast")) || Qa() || (J() ? 0 : I("Edge")) || (J() ? Pa("Microsoft Edge") : I("Edg/")) || (J() ? Pa("Opera") : I("OPR")) || Ra() || I("Silk") || I("Android")) && !qb();
    function V(a) {
        return (a = a.exec(G())) ? a[1] : ""
    }
    var Oc = function() {
        if (Ic)
            return V(/Firefox\/([0-9.]+)/);
        if (xb || yb || wb)
            return Gb;
        if (Mc) {
            if (qb() || rb()) {
                var a = V(/CriOS\/([0-9.]+)/);
                if (a)
                    return a
            }
            return V(/Chrome\/([0-9.]+)/)
        }
        if (Nc && !qb())
            return V(/Version\/([0-9.]+)/);
        if (Jc || Kc) {
            if (a = /Version\/(\S+).*Mobile\/(\S+)/.exec(G()))
                return a[1] + "." + a[2]
        } else if (Lc)
            return (a = V(/Android\s+([0-9.]+)/)) ? a : V(/Version\/([0-9.]+)/);
        return ""
    }();
    function W(a) {
        mb.call(this, a);
        this.D = 100;
        this.A = {};
        this.i = null;
        this.j = "";
        this.G = !0;
        this.s = 10;
        this.h = null;
        this.m = !1;
        this.B = "https://clients2.google.com/cr/staging_report"
    }
    na(W, mb);
    m = W.prototype;
    m.ta = function(a) {
        this.G = a;
        return this
    }
    ;
    m.sa = function(a) {
        this.s = Math.min(a, 100);
        return this
    }
    ;
    m.ba = function(a) {
        this.D = a;
        return this
    }
    ;
    m.ea = function(a, b) {
        this.A[a] = b;
        return this
    }
    ;
    m.qa = function(a) {
        this.i = a;
        return this
    }
    ;
    m.ra = function(a) {
        this.j = a;
        return this
    }
    ;
    m.enable = function() {
        if (this.F)
            return !1;
        this.v = window.onerror;
        window.onerror = this.na.bind(this);
        return this.F = !0
    }
    ;
    m.reportError = function(a, b, c, d, e, h) {
        h = void 0 === h ? new Map : h;
        var f = window.location.href;
        f = f instanceof S ? new S(f) : new S(f);
        a = null != e && null != e.message ? e.message : a;
        $a('The following error:" %s" occurred at URL: %s', a, f.g);
        var g;
        if (g = "function" !== typeof this.i || this.i(f.g, a, b, c, d, e))
            if (g = this.m) {
                g = Object.keys(this.A);
                for (var k = 100, l = 0; l < g.length; ++l) {
                    var n = g[l];
                    (new RegExp(n)).test(a) && (k = this.A[n])
                }
                if (g = (100 * Math.random()).toFixed(6) >= this.D * k / 100 ? !1 : !0) {
                    0 <= this.s && null === this.h && (this.h = new jb(this.s,this.G));
                    if (null === this.h)
                        g = !1;
                    else {
                        a: {
                            g = this.h;
                            k = Date.now();
                            if (g.g.length == g.i)
                                if (g.g[0] < k - 36E5)
                                    g.g.shift();
                                else {
                                    g = !1;
                                    break a
                                }
                            g.g.push(k);
                            lb(g);
                            g = !0
                        }
                        g = !g
                    }
                    g = !g && this.m
                }
            }
        g && (e = e || null,
        c = Pc(this, f, a, h, b, c, void 0 !== d ? d : null),
        c.set("prod", this.g.i),
        c.set("ver", this.g.j),
        d = null !== e ? ab(e.stack) : "",
        b = this.B,
        c = Qc(c),
        F(a) || (h = d.split("\n"),
        -1 < h[0].indexOf(a) && (h.splice(0, 1),
        d = h.join("\n"))),
        Rc(this, b, c, d),
        a = new Map,
        a.set("product", this.g.i),
        a.set("url", f.g),
        a.set("js_errors_count", "1"),
        f = ab(this.g.g),
        F(f) || a.set("version", f),
        Rc(this, "https://clients2.google.com/cr/staging_perf", Qc(a)))
    }
    ;
    m.na = function(a, b, c, d, e) {
        this.reportError(a, b, c, d, e);
        null != this.v && "function" === typeof this.v && this.v(a, b, c, d, e)
    }
    ;
    function Pc(a, b, c, d, e, h, f) {
        var g = new Map(Object.entries(a.g.h));
        d.forEach(function(k, l) {
            g.set(l, k)
        });
        g.set("url", b.g);
        g.set("type", "JavascriptError");
        g.set("error_message", c);
        g.set("browser", Sc());
        g.set("browser_version", Oc);
        g.set("os", tb() ? "Chrome OS" : (nb() ? "Linux" === H.platform : I("Linux")) ? "Linux" : sb() ? "Windows" : ob() ? "Android" : pb() ? "iPhone" : I("iPad") ? "iPad" : I("iPod") ? "iPod" : rb() ? "Mac" : "Unknown");
        g.set("os_version", ub());
        b = a.g.g;
        null !== b && g.set("channel", b);
        F(a.j) || g.set("guid", a.j);
        null !== e && g.set("src", e);
        null !== h && g.set("line", h.toString());
        null !== f && g.set("column", f.toString());
        return g
    }
    function Qc(a) {
        var b = "";
        a = w(a);
        for (var c = a.next(); !c.done; c = a.next()) {
            var d = w(c.value);
            c = d.next().value;
            d = d.next().value;
            b += F(b) ? "?" : "&";
            b += c + "=" + encodeURIComponent(d)
        }
        return b
    }
    function Rc(a, b, c, d) {
        d = d || "";
        c = b + c;
        a = a.fa.bind(a, b);
        b = F(d) ? {} : {
            "Content-Type": "text/plain"
        };
        var e = new ec;
        hc.push(e);
        a && e.i.add("complete", a, !1, void 0, void 0);
        e.i.add("ready", e.ga, !0, void 0, void 0);
        e.v = 6E4;
        e.P = !0;
        ic(e, c, d, b)
    }
    m.fa = function(a, b) {
        qc(b.target)
    }
    ;
    function Sc() {
        var a = "Other";
        wb ? a = "Opera" : xb ? a = "Internet Explorer" : Ic ? a = "Firefox" : Mc ? a = "Chrome" : Nc && (a = "Safari");
        return a
    }
    W.prototype.reportError = W.prototype.reportError;
    W.prototype.enable = W.prototype.enable;
    W.prototype.setClientId = W.prototype.ra;
    W.prototype.setCallback = W.prototype.qa;
    W.prototype.addPerErrorMessageSampling = W.prototype.ea;
    W.prototype.setGlobalSampling = W.prototype.ba;
    W.prototype.setMaxErrorsPerHour = W.prototype.sa;
    W.prototype.setUseLocalStorage = W.prototype.ta;
    function X(a) {
        P.call(this);
        this.config = new bb(a);
        this.g = {}
    }
    D(X, P);
    var Tc = ["webmonitoring", "Monitoring"]
      , Y = B;
    Tc[0]in Y || "undefined" == typeof Y.execScript || Y.execScript("var " + Tc[0]);
    for (var Z; Tc.length && (Z = Tc.shift()); )
        Tc.length || void 0 === X ? Y[Z] && Y[Z] !== Object.prototype[Z] ? Y = Y[Z] : Y = Y[Z] = {} : Y[Z] = X;
    X.prototype.N = function(a) {
        this.config.N(a);
        return this
    }
    ;
    X.prototype.setVersion = X.prototype.N;
    X.prototype.U = function(a) {
        this.config.U(a);
        return this
    }
    ;
    X.prototype.setChannel = X.prototype.U;
    X.prototype.V = function(a) {
        this.config.V(a);
        return this
    }
    ;
    X.prototype.setContext = X.prototype.V;
    X.prototype.Y = function() {
        null == this.g[2] && (this.g[2] = new W(this.config));
        return this.g[2]
    }
    ;
    X.prototype.createJsErrorsReporter = X.prototype.Y;
    (function(a, b, c) {
        var d = void 0 === c ? {} : c;
        c = void 0 === d.S ? function() {}
        : d.S;
        var e = void 0 === d.L ? function() {}
        : d.L
          , h = void 0 === d.Z ? !1 : d.Z
          , f = void 0 === d.pa ? 100 : d.pa
          , g = void 0 === d.ha ? void 0 : d.ha;
        a = (void 0 === d.ma ? function(l) {
            return new X(l)
        }
        : d.ma)(a);
        a.N(b);
        var k = a.Y();
        h && (k.B = "https://clients2.google.com/cr/report");
        k.m = !0;
        k.ba(f);
        Va({
            reportError: function(l, n, r, q, u) {
                k.reportError(l, n, r, q, u, null == g ? void 0 : g())
            }
        }, c, e)
    }
    )("ChromeOS_Calculator", "chrome-apps-calculator_202310280700_RC00_prod", {
        Z: !0
    });
    var Uc = new Set(["en_xa", "ar_xb"]);
    self.addEventListener("activate", function(a) {
        a.waitUntil(function() {
            var b, c, d, e;
            return wa(function(h) {
                switch (h.g) {
                case 1:
                    return y(h, self.caches.keys(), 2);
                case 2:
                    b = h.i,
                    c = w(b),
                    d = c.next();
                case 3:
                    if (d.done) {
                        h.g = 0;
                        break
                    }
                    e = d.value;
                    if ("chrome-apps-calculator_202310280700_RC00_prod" === e) {
                        h.g = 4;
                        break
                    }
                    return y(h, self.caches.delete(e), 4);
                case 4:
                    d = c.next(),
                    h.g = 3
                }
            })
        }())
    });
    function Vc() {
        return "chrome-apps-calculator_202310280700_RC00_prod/index.html"
    }
    function Wc() {
        var a = Ca.filter(function(c) {
            return !Uc.has(c)
        }).map(function(c) {
            return c.toLowerCase().replace("-", "_")
        }).map(function(c) {
            return "translations/translations__" + c + ".js"
        })
          , b = Ba.map(function(c) {
            return c.replace(/_.*/, function(d) {
                return d.toUpperCase()
            })
        }).map(function(c) {
            return "locales/" + c + "/messages.json"
        });
        return [].concat(ea(a), ea(b))
    }
    self.addEventListener("message", function(a) {
        var b;
        "SKIP_WAITING" === (null == (b = a.data) ? void 0 : b.type) && self.skipWaiting().then(function() {
            self.clients.claim()
        })
    });
    self.addEventListener("install", function(a) {
        a.waitUntil(function() {
            var b, c;
            return wa(function(d) {
                if (1 == d.g)
                    return y(d, self.caches.open("chrome-apps-calculator_202310280700_RC00_prod"), 2);
                b = d.i;
                c = ["app_bin.js", "foam.js", "notices.json"].concat(ea(Wc()));
                return y(d, b.addAll([Vc(), "assets/ic_calculator_48.png", "assets/ic_calculator_128.png", "assets/ic_calculator_256.png"].concat(ea(c.map(function(e) {
                    return "chrome-apps-calculator_202310280700_RC00_prod/" + e
                })))), 0)
            })
        }())
    });
    self.addEventListener("fetch", function(a) {
        var b = new URL(a.request.url);
        b.host === self.location.host && "/uncached" === b.pathname ? (a.respondWith(fetch("/", {
            cache: "no-cache",
            redirect: "manual"
        })),
        b = !0) : b = !1;
        b || a.respondWith(Xc(a))
    });
    function Xc(a) {
        var b, c, d, e, h, f, g;
        return wa(function(k) {
            switch (k.g) {
            case 1:
                b = a;
                c = b.request;
                d = new URL(c.url);
                if ("/manifest.json" === d.pathname) {
                    var l = k.return
                      , n = Response;
                    var r = void 0 === r ? "" : r;
                    r = {
                        name: "Calculator",
                        short_name: "Calculator",
                        description: "",
                        icons: [{
                            src: r + "/assets/ic_calculator_48.png",
                            sizes: "48x48",
                            type: "image/png"
                        }, {
                            src: r + "/assets/ic_calculator_128.png",
                            sizes: "128x128",
                            type: "image/png"
                        }, {
                            src: r + "/assets/ic_calculator_256.png",
                            sizes: "256x256",
                            type: "image/png"
                        }],
                        start_url: r + "/",
                        display: "standalone",
                        background_color: "#FFF"
                    };
                    var q = void 0 === q ? Ca : q;
                    var u, A = null == (u = self.document) ? void 0 : u.documentElement.lang;
                    A = A ? A : navigator.language;
                    A = "he" === A ? "iw" : A;
                    var v;
                    u = void 0 !== (null == (v = self.location) ? void 0 : v.search) ? self.location.search : "";
                    v = "nb" === A ? "no" : A;
                    q = void 0 === q ? Ca : q;
                    u = new URLSearchParams(u);
                    q = (u = u.has("hl") ? Da(u.get("hl"), q) : null) ? u : (q = Da(v, q)) ? q : "en";
                    q = [q];
                    r = Object.assign({}, r);
                    q = w(q);
                    for (v = q.next(); !v.done; v = q.next()) {
                        v = v.value;
                        if (Ta.has(v)) {
                            Object.assign(r, Ta.get(v));
                            break
                        }
                        v = v.split("-")[0];
                        if (Ta.has(v)) {
                            Object.assign(r, Ta.get(v));
                            break
                        }
                    }
                    r = JSON.stringify(r);
                    return l.call(k, new n(r))
                }
                self.location.host === d.host && "/" === d.pathname && (d.pathname = Vc(),
                d.search = "",
                c = new Request(d.href));
                return y(k, self.caches.match(c), 2);
            case 2:
                return (e = k.i) && e.redirected && (e = Yc(e)),
                e ? k.return(e) : y(k, fetch(c), 3);
            case 3:
                h = k.i;
                if ("fonts.googleapis.com" !== d.host && "fonts.gstatic.com" !== d.host) {
                    k.g = 4;
                    break
                }
                return y(k, self.caches.open("chrome-apps-calculator_202310280700_RC00_prod"), 5);
            case 5:
                return f = k.i,
                y(k, f.put(c, h.clone()), 4);
            case 4:
                if (null == (g = h) ? 0 : g.redirected)
                    h = Yc(h);
                return k.return(h)
            }
        })
    }
    function Yc(a) {
        a = a.clone();
        return new Response(a.body,{
            headers: a.headers,
            status: a.status,
            statusText: a.statusText
        })
    }
    ;
}
).call(this);
