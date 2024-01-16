var DEBUG = DEBUG || !1
  , _DOC_ = _DOC_ || !1
  , FLAGS = FLAGS || {}
function FEATURE_ENABLED(labels) {
    for (var i = 0; i < labels.length; i++)
        if (FLAGS[labels[i]])
            return !0
}
FLAGS.javascript = !0,
FLAGS.debug = DEBUG,
FLAGS.documentation = _DOC_
var GLOBAL = GLOBAL || this
function MODEL(model) {
    var proto
    function defineProperty(proto, key, map) {
        map.value && proto !== Object.prototype && proto !== Array.prototype ? proto[key] = map.value : Object.defineProperty.apply(this, arguments)
    }
    if (proto = model.name ? (GLOBAL[model.name] || (model.extends ? GLOBAL[model.name] = {
        __proto__: GLOBAL[model.extends]
    } : GLOBAL[model.name] = {}),
    GLOBAL[model.name]) : model.extendsProto ? GLOBAL[model.extendsProto].prototype : GLOBAL[model.extendsObject],
    model.properties)
        for (var i = 0; i < model.properties.length; i++) {
            var p = model.properties[i]
            defineProperty(proto, p.name, {
                get: p.getter,
                enumerable: !1
            })
        }
    for (key in model.constants)
        defineProperty(proto, key, {
            value: model.constants[key],
            writable: !0,
            enumerable: !1
        })
    if (Array.isArray(model.methods))
        for (var i = 0; i < model.methods.length; i++) {
            var m = model.methods[i]
            defineProperty(proto, m.name, {
                value: m,
                writable: !0,
                enumerable: !1
            })
        }
    else
        for (var key in model.methods)
            defineProperty(proto, key, {
                value: model.methods[key],
                writable: !0,
                enumerable: !1
            })
}
var MODEL0 = MODEL
  , labelize = (MODEL({
    extendsObject: "GLOBAL",
    methods: [function memoize(f) {
        var cache = {}
          , g = function() {
            var key = argsToArray(arguments).toString()
            return cache.hasOwnProperty(key) || (cache[key] = f.apply(this, arguments)),
            cache[key]
        }
        return g.name = f.name,
        g
    }
    , function memoize1(f) {
        var cache = {}
          , g = function(arg) {
            var key = arg ? arg.toString() : ""
            return cache.hasOwnProperty(key) || (cache[key] = f.call(this, arg)),
            cache[key]
        }
        return g.name = f.name,
        g
    }
    , function constantFn(v) {
        return function() {
            return v
        }
    }
    , function latchFn(f) {
        var tripped = !1, val
        return function() {
            return tripped || (tripped = !0,
            val = f(),
            f = void 0),
            val
        }
    }
    , function argsToArray(args) {
        for (var array = new Array(args.length), i = 0; i < args.length; i++)
            array[i] = args[i]
        return array
    }
    , function StringComparator(s1, s2) {
        return s1 == s2 ? 0 : s1 < s2 ? -1 : 1
    }
    , function equals(a, b) {
        return a === b || !(!a || !b) && (a.equals ? a.equals(b) : a.compareTo ? 0 === a.compareTo(b) : b.compareTo ? 0 === b.compareTo(a) : a == b)
    }
    , function compare(a, b) {
        return a === b ? 0 : null == a ? -1 : null == b ? 1 : a.compareTo ? a.compareTo(b) : b.compareTo ? -b.compareTo(a) : b < a ? 1 : -1
    }
    , function toCompare(c) {
        return Array.isArray(c) ? CompoundComparator.apply(null, c) : c.compare ? c.compare.bind(c) : c
    }
    , function CompoundComparator() {
        for (var args = argsToArray(arguments), cs = [], i = 0; i < args.length; i++)
            cs[i] = toCompare(args[i])
        var f = function(o1, o2) {
            for (var i = 0; i < cs.length; i++) {
                var r = cs[i](o1, o2)
                if (0 != r)
                    return r
            }
            return 0
        }
        return f.toSQL = function() {
            return args.map(function(s) {
                return s.toSQL()
            }).join(",")
        }
        ,
        f.toMQL = function() {
            return args.map(function(s) {
                return s.toMQL()
            }).join(" ")
        }
        ,
        f.toBQL = function() {
            return args.map(function(s) {
                return s.toBQL()
            }).join(" ")
        }
        ,
        f.toString = f.toSQL,
        f
    }
    , function randomAct() {
        for (var totalWeight = 0, i = 0; i < arguments.length; i += 2)
            totalWeight += arguments[i]
        for (var r = Math.random(), i = 0, weight = 0; i < arguments.length; i += 2)
            if (r <= (weight += arguments[i]) / totalWeight)
                return arguments[i + 1](),
                undefined
    }
    , function Object_forEach(obj, fn) {
        for (var key in obj)
            obj.hasOwnProperty(key) && fn(obj[key], key)
    }
    , function predicatedSink(predicate, sink) {
        return predicate !== TRUE && sink ? {
            __proto__: sink,
            $UID: sink.$UID,
            put: function(obj, s, fc) {
                !sink.put || obj && !predicate.f(obj) || sink.put(obj, s, fc)
            },
            remove: function(obj, s, fc) {
                !sink.remove || obj && !predicate.f(obj) || sink.remove(obj, s, fc)
            },
            reset: function() {
                sink.reset && sink.reset()
            },
            toString: function() {
                return "PredicatedSink(" + sink.$UID + ", " + predicate + ", " + sink + ")"
            }
        } : sink
    }
    , function limitedSink(count, sink) {
        var i = 0
        return {
            __proto__: sink,
            $UID: sink.$UID,
            put: function(obj, s, fc) {
                i++ >= count && fc ? fc.stop() : sink.put(obj, s, fc)
            }
        }
    }
    , function skipSink(skip, sink) {
        var i = 0
        return {
            __proto__: sink,
            $UID: sink.$UID,
            put: function(obj, s, fc) {
                i++ >= skip && sink.put(obj, s, fc)
            }
        }
    }
    , function orderedSink(comparator, sink) {
        return comparator = toCompare(comparator),
        {
            __proto__: sink,
            $UID: sink.$UID,
            i: 0,
            arr: [],
            put: function(obj, s, fc) {
                this.arr.push(obj)
            },
            eof: function() {
                this.arr.sort(comparator),
                this.arr.select(sink)
            }
        }
    }
    , function defineLazyProperty(target, name, definitionFn) {
        Object.defineProperty(target, name, {
            get: function() {
                var definition = definitionFn.call(this)
                return Object.defineProperty(this, name, definition),
                definition.get ? definition.get.call(this) : definition.value
            },
            configurable: !0
        })
    }
    , function multiline(f) {
        if ("string" == typeof f)
            return f
        var f = f.toString()
          , start = f.indexOf("/*")
          , end = f.lastIndexOf("*/")
        return f.substring(start + 2, end)
    }
    , function findPageXY(node) {
        for (var x = 0, y = 0, parent; node; )
            x += (parent = node).offsetLeft,
            y += node.offsetTop,
            node = node.offsetParent
        return [x, y, parent]
    }
    , function findViewportXY(node) {
        var node = node.getBoundingClientRect()
        return [node.left, node.top]
    }
    , function nop() {}
    , function stringtoutf8(str) {
        for (var res = [], i = 0; i < str.length; i++) {
            var code = str.charCodeAt(i)
              , count = 0
            code < 128 && res.push(code)
        }
        return res
    }
    , function createGUID() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
            var r = 16 * Math.random() | 0, v
            return ("x" === c ? r : 3 & r | 8).toString(16)
        })
    }
    ]
}),
memoize1(function(str) {
    return "" === str ? str : capitalize(str.replace(/[a-z][A-Z]/g, function(a) {
        return a.charAt(0) + " " + a.charAt(1)
    }))
}))
  , constantize = memoize1(function(str) {
    return "x" === str ? "X_" : "y" === str ? "Y_" : "$" === str ? "$_" : str.replace(/[a-z][^0-9a-z_]/g, function(a) {
        return a.substring(0, 1) + "_" + a.substring(1, 2)
    }).toUpperCase()
})
  , capitalize = memoize1(function(str) {
    return str[0].toUpperCase() + str.substring(1)
})
  , camelize = memoize1(function(str) {
    var str = str.replace(/(?:[-\s_])(\w)/g, function(_, a) {
        return a ? a.toUpperCase() : ""
    })
    return str[0].toLowerCase() + str.substring(1)
})
  , daoize = memoize1(function(str) {
    return str[0].toLowerCase() + str.substring(1) + "DAO"
})
  , cssClassize = memoize1(function(str) {
    return str.replace(/\./g, "-")
})
  , MementoProto = (MODEL({
    extendsProto: "Object",
    properties: [{
        name: "$UID",
        getter: function() {
            var id = 1
            return function() {
                return !Object.hasOwnProperty.call(this, "$UID__") && (this.$UID__ = id,
                id++),
                this.$UID__
            }
        }()
    }],
    methods: [function become(other) {
        for (var local = Object.getOwnPropertyNames(this), i = 0; i < local.length; i++)
            delete this[local[i]]
        for (var remote = Object.getOwnPropertyNames(other), i = 0; i < remote.length; i++)
            Object.defineProperty(this, remote[i], Object.getOwnPropertyDescriptor(other, remote[i]))
        this.__proto__ = other.__proto__
    }
    ]
}),
MODEL({
    extendsProto: "Array",
    constants: {
        oldForEach_: Array.prototype.forEach
    },
    methods: [function clone() {
        return this.slice()
    }
    , function deepClone() {
        for (var a = this.clone(), i = 0; i < a.length; i++) {
            var o = a[i]
            o && (o.deepClone ? a[i] = o.deepClone() : o.clone && (a[i] = o.clone()))
        }
        return a
    }
    , function forEach(f, opt_this) {
        if (!this || !f || opt_this)
            return this.oldForEach_.call(this, f, opt_this)
        for (var l = this.length, i = 0; i < l; i++)
            f(this[i], i, this)
    }
    , function diff(other) {
        for (var added = other.slice(0), removed = [], i = 0; i < this.length; i++) {
            for (var j = 0; j < added.length; j++)
                if (0 == this[i].compareTo(added[j])) {
                    added.splice(j, 1),
                    j--
                    break
                }
            j == added.length && removed.push(this[i])
        }
        return {
            added: added,
            removed: removed
        }
    }
    , function binaryInsert(item) {
        for (var start = 0, end = this.length - 1; start <= end; ) {
            var m = start + Math.floor((end - start) / 2)
              , c = item.compareTo(this[m])
            if (0 == c)
                return this
            c < 0 ? end = m - 1 : start = m + 1
        }
        return this.splice(start, 0, item),
        this
    }
    , function union(other) {
        return this.concat(other.filter(function(o) {
            return -1 == this.indexOf(o)
        }
        .bind(this)))
    }
    , function intersection(other) {
        return this.filter(function(o) {
            return -1 != other.indexOf(o)
        })
    }
    , function intern() {
        for (var i = 0; i < this.length; i++)
            this[i].intern && (this[i] = this[i].intern())
        return this
    }
    , function compareTo(other) {
        if (this.length !== other.length)
            return -1
        for (var i = 0; i < this.length; i++) {
            var result = this[i].compareTo(other[i])
            if (0 !== result)
                return result
        }
        return 0
    }
    , function deleteF(v) {
        for (var a = this.clone(), i = 0; i < a.length; i++)
            if (a[i] === v) {
                a.splice(i, 1)
                break
            }
        return a
    }
    , function deleteI(v) {
        for (var i = 0; i < this.length; i++)
            if (this[i] === v)
                return this.splice(i, 1),
                !0
        return !1
    }
    , function removeF(p) {
        for (var a = [], i = 0; i < a.length; i++)
            if (p.f(a[i]))
                for (i++; i < a.length; i++)
                    a.push(a[i])
        return a
    }
    , function removeI(p) {
        for (var i = 0; i < this.length; i++)
            if (p.f(this[i]))
                return this.splice(i, 1),
                !0
        return !1
    }
    , function pushF(obj) {
        var a = this.clone()
        return a.push(obj),
        a
    }
    , function spliceF(start, end) {
        for (var r = [], i, i = 0; i < start; i++)
            r.push(this[i])
        for (i = 2; i < arguments.length; i++)
            r.push(arguments[i])
        for (i = start + end; i < this.length; i++)
            r.push(this[i])
        return r
    }
    , function fReduce(comparator, arr) {
        compare = toCompare(comparator)
        for (var result = [], i = 0, j = 0, k = 0; i < this.length && j < arr.length; ) {
            var a = compare(this[i], arr[j])
            a < 0 ? result[k++] = this[i++] : (0 == a && (result[k++] = this[i++]),
            result[k++] = arr[j++])
        }
        return i != this.length && (result = result.concat(this.slice(i))),
        result = j != arr.length ? result.concat(arr.slice(j)) : result
    }
    , function pushAll(arr) {
        return this.push.apply(this, arr),
        this.length
    }
    , function mapFind(map) {
        for (var i = 0; i < this.length; i++) {
            var result = map(this[i], i)
            if (result)
                return result
        }
    }
    , function mapProp(prop) {
        return this.map(function(x) {
            return x[prop]
        })
    }
    , function mapCall() {
        var args = Array.prototype.slice.call(arguments, 0)
          , func = args.shift()
        return this.map(function(x) {
            return x[func] && x[func].apply(x[func], args)
        })
    }
    ],
    properties: [{
        name: "memento",
        getter: function() {
            throw "Array's can not be memorized properly as a memento."
        }
    }]
}),
MODEL({
    extendsProto: "String",
    methods: [function indexOfIC(a) {
        return a.length > this.length ? -1 : this.toUpperCase().indexOf(a.toUpperCase())
    }
    , function equals(other) {
        return 0 === this.compareTo(other)
    }
    , function equalsIC(other) {
        return other && this.toUpperCase() === other.toUpperCase()
    }
    , function capitalize() {
        return this.charAt(0).toUpperCase() + this.slice(1)
    }
    , function labelize() {
        return this.replace(/[a-z][A-Z]/g, function(a) {
            return a.charAt(0) + " " + a.charAt(1)
        }).capitalize()
    }
    , function compareTo(o) {
        return o == this ? 0 : this < o ? -1 : 1
    }
    , String.prototype.startsWith || function startsWith(a) {
        return 0 == this.lastIndexOf(a, 0)
    }
    , String.prototype.endsWith || function endsWith(a) {
        return this.length - a.length == this.lastIndexOf(a)
    }
    , function startsWithIC(a) {
        if (a.length > this.length)
            return !1
        for (var l = a.length, i = 0; i < l; i++)
            if (this[i].toUpperCase() !== a[i].toUpperCase())
                return !1
        return !0
    }
    , function put(obj) {
        return this + obj.toJSON()
    }
    , function() {
        var map = {}
        return function intern() {
            return map[this] || (map[this] = this.toString())
        }
    }(), function hashCode() {
        var hash = 0
        if (0 == this.length)
            return hash
        for (i = 0; i < this.length; i++) {
            var code, hash = (hash << 5) - hash + this.charCodeAt(i)
            hash &= hash
        }
        return hash
    }
    ]
}),
MODEL({
    extendsProto: "Function",
    methods: [function() {
        var oldBind = Function.prototype.bind
          , simpleBind = function(f, self) {
            return function() {
                return f.apply(self, arguments)
            }
        }
        return function bind(arg) {
            if (1 == arguments.length)
                return simpleBind(this, arg)
            for (var args = new Array(arguments.length), i = 0; i < arguments.length; i++)
                args[i] = arguments[i]
            return oldBind.apply(this, args)
        }
    }(), function equals(o) {
        return this === o
    }
    , function compareTo(o) {
        return this === o ? 0 : this.name.compareTo(o.name) || 1
    }
    , function o(f2) {
        var f1 = this
        return function() {
            return f1.call(this, f2.apply(this, argsToArray(arguments)))
        }
    }
    ]
}),
MODEL({
    extendsObject: "Math",
    methods: [function sign(n) {
        return 0 < n ? 1 : -1
    }
    ]
}),
MODEL({
    extendsProto: "Date",
    methods: [function toRelativeDateString() {
        var seconds = Math.floor((Date.now() - this.getTime()) / 1e3)
        if (seconds < 60)
            return "moments ago"
        var seconds = Math.floor(seconds / 60)
        if (1 == seconds)
            return "1 minute ago"
        if (seconds < 60)
            return seconds + " minutes ago"
        var seconds = Math.floor(seconds / 60)
        if (1 == seconds)
            return "1 hour ago"
        if (seconds < 24)
            return seconds + " hours ago"
        var seconds = Math.floor(seconds / 24), seconds, noyear
        return 1 == seconds ? "1 day ago" : seconds < 7 ? seconds + " days ago" : seconds < 365 ? (seconds = 1900 + this.getYear(),
        this.toDateString().replace(" " + seconds, "").substring(4)) : this.toDateString().substring(4)
    }
    , function equals(o) {
        return !!o && (!!o.getTime && this.getTime() === o.getTime())
    }
    , function compareTo(o) {
        if (o === this)
            return 0
        if (!o)
            return 1
        var o = this.getTime() - o.getTime()
        return 0 == o ? 0 : 0 < o ? 1 : -1
    }
    , function toMQL() {
        return this.getFullYear() + "/" + (this.getMonth() + 1) + "/" + this.getDate()
    }
    , function toBQL() {
        var str = this.toISOString()
        return str.substring(0, str.indexOf("."))
    }
    ]
}),
MODEL({
    extendsProto: "Number",
    methods: [function compareTo(o) {
        return o == this ? 0 : this < o ? -1 : 1
    }
    ]
}),
MODEL({
    extendsProto: "Boolean",
    methods: [function compareTo(o) {
        return (this.valueOf() ? 1 : 0) - (o ? 1 : 0)
    }
    ]
}),
MODEL({
    extendsProto: "RegExp",
    methods: [function quote(str) {
        return (str + "").replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
    }
    ]
}),
console.log.json = function() {
    for (var args = [], i = 0; i < arguments.length; i++) {
        var arg = arguments[i]
        args.push(arg && arg.toJSON ? arg.toJSON() : arg)
    }
    console.log.apply(console, args)
}
,
console.log.str = function() {
    for (var args = [], i = 0; i < arguments.length; i++) {
        var arg = arguments[i]
        args.push(arg && arg.toString ? arg.toString() : arg)
    }
    console.log.apply(console, args)
}
,
console.log.put = console.log.bind(console),
console.log.remove = console.log.bind(console, "remove: "),
console.log.error = console.log.bind(console, "error: "),
console.log.json.put = console.log.json.bind(console),
console.log.json.reduceI = console.log.json.bind(console, "reduceI: "),
console.log.json.remove = console.log.json.bind(console, "remove: "),
console.log.json.error = console.log.json.bind(console, "error: "),
console.log.str.put = console.log.str.bind(console),
console.log.str.remove = console.log.str.bind(console, "remove: "),
console.log.str.error = console.log.str.bind(console, "error: "),
document.put = function(obj) {
    obj.write ? obj.write(this.X) : this.write(obj.toString())
}
,
window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem,
window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.setImmediate,
window.Blob && (Blob.prototype.slice = Blob.prototype.slice || Blob.prototype.webkitSlice),
window.XMLHttpRequest && (XMLHttpRequest.prototype.asend = function(ret, opt_data) {
    var xhr = this
    xhr.onerror = function() {
        console.log("XHR Error: ", arguments)
    }
    ,
    xhr.onloadend = function() {
        ret(xhr.response, xhr)
    }
    ,
    xhr.send(opt_data)
}
),
String.fromCharCode = function() {
    var oldLookup = String.fromCharCode
      , lookupTable = []
    return function(a) {
        if (1 == arguments.length)
            return lookupTable[a] || (lookupTable[a] = oldLookup(a))
        for (var result = "", i = 0; i < arguments.length; i++)
            result += lookupTable[arguments[i]] || (lookupTable[arguments[i]] = oldLookup(arguments[i]))
        return result
    }
}(),
{})
  , __JSONP_CALLBACKS__ = (Object.defineProperty(MementoProto, "equals", {
    enumerable: !1,
    configurable: !0,
    value: function(o) {
        var keys = Object.keys(this)
          , otherKeys = Object.keys(o)
        if (keys.length != otherKeys.length)
            return !1
        for (var i = 0; i < keys.length; i++)
            if (!equals(this[keys[i]], o[keys[i]]))
                return !1
        return !0
    }
}),
MODEL({
    extendsProto: "Function",
    methods: [function abind(self) {
        return function(ret) {
            this.apply(self, arguments),
            ret()
        }
        .bind(this)
    }
    , function ao(f2) {
        var f1 = this
        return function(ret) {
            var args = argsToArray(arguments)
            args[0] = f1.bind(this, ret),
            f2.apply(this, args)
        }
    }
    , function aseq(f2) {
        return f2.ao(this)
    }
    ]
}),
MODEL({
    extendsObject: "GLOBAL",
    methods: [function anop(ret) {
        ret && ret(void 0)
    }
    , function alog() {
        var args = arguments
        return function(ret) {
            console.log.apply(console, args),
            ret && ret.apply(this, [].slice.call(arguments, 1))
        }
    }
    , function aprofile(afunc) {
        return function(ret) {
            var a = argsToArray(arguments), ret2
            console.profile("aprofile"),
            aapply_(afunc, function() {
                console.profileEnd(),
                ret && ret(arguments)
            }, a)
        }
    }
    , function aconstant(v) {
        return function(ret) {
            ret && ret(v)
        }
    }
    , function arepeat(n, afunc) {
        return n ? function(ret) {
            var a = argsToArray(arguments)
              , next = (a.splice(1, 0, 0, n),
            atramp(function() {
                if (a[1] == n - 1)
                    return a[0] = ret,
                    afunc.apply(this, a),
                    undefined
                afunc.apply(this, a),
                a[1]++
            }));
            (a[0] = next).apply(this, a)
        }
        : anop
    }
    , function aforEach(arr, afunc) {}
    , function awhile(cond, afunc) {
        return function(ret) {
            var a = argsToArray(arguments)
              , g = function() {
                if (!cond())
                    return ret.apply(void 0, arguments),
                    undefined
                afunc.apply(this, a)
            };
            (a[0] = g).apply(this, a)
        }
    }
    , function aif(cond, afunc, aelse) {
        return function(ret) {
            ("function" == typeof cond ? cond.apply(this, argsToArray(arguments).slice(1)) : cond) ? afunc.apply(this, arguments) : aelse ? aelse.apply(this, arguments) : ret()
        }
    }
    , function aaif(acond, afunc, aelse) {
        return function(ret) {
            var args = argsToArray(arguments)
            args[0] = function(c) {
                args[0] = ret,
                c ? afunc.apply(null, args) : aelse ? aelse.apply(null, args) : ret()
            }
            ,
            acond.apply(null, args)
        }
    }
    , function() {
        var id = 1
          , activeOps = {}
        return function atime(str, afunc, opt_endCallback, opt_startCallback) {
            var name = str
            return aseq(function(ret) {
                activeOps[str] ? (name += "-" + id++,
                activeOps[str]++) : activeOps[str] = 1
                var start = performance.now()
                opt_startCallback && opt_startCallback(name),
                opt_endCallback || console.time(name),
                ret.apply(null, [].slice.call(arguments, 1))
            }, afunc, function(ret) {
                var end
                activeOps[str]--,
                opt_endCallback ? (end = performance.now(),
                opt_endCallback(name, end - start)) : console.timeEnd(name),
                ret && ret.apply(null, [].slice.call(arguments, 1))
            })
        }
    }(), function ametric() {
        return this.atime.apply(this, arguments)
    }
    , function asleep(ms) {
        return function(ret) {
            window.setTimeout(ret, ms)
        }
    }
    , function ayield() {
        return function(ret) {
            window.setTimeout(ret, 0)
        }
    }
    , function afuture() {
        var set = !1
          , values = void 0
          , waiters = []
        return {
            isSet: function() {
                return set
            },
            set: function() {
                if (set)
                    return console.log("ERROR: redundant set on future"),
                    undefined
                values = arguments,
                set = !0
                for (var i = 0; i < waiters.length; i++)
                    waiters[i].apply(null, values)
                return waiters = void 0,
                this
            },
            get: function(ret) {
                if (set)
                    return ret.apply(null, values),
                    undefined
                waiters.push(ret)
            }
        }
    }
    , function aapply_(f, ret, args) {
        args.unshift(ret),
        f.apply(this, args)
    }
    , function arequestqueue(f, opt_lock, opt_max) {
        var lock = opt_lock || {}
          , onExit = (lock.q || (lock.q = [],
        lock.active = null),
        function() {
            var next = lock.active = lock.q.pop()
            next && setTimeout(function() {
                f(onExit, next)
            }, 0)
        }
        )
          , reduceDown = function(o, q) {
            for (var i = q.length - 1; 0 <= i; i--) {
                var result = o.reduce(q[i])
                if (result) {
                    q.splice(i, 1),
                    reduceDown(result, q)
                    break
                }
            }
            q.push(o)
        }
        return function(o) {
            if (lock.active) {
                var first = o.reduce(lock.active)
                if (first && first.equals(lock.active))
                    return
            }
            reduceDown(o, lock.q, lock.q.length - 1),
            lock.q.length > opt_max && (lock.q.length = opt_max),
            lock.active || onExit()
        }
    }
    , function asynchronized(f, opt_lock) {
        var lock = opt_lock || {}
        function onExit(ret) {
            return function() {
                var next = lock.q.shift()
                next ? setTimeout(next, 0) : lock.active = !1,
                ret()
            }
        }
        return lock.q || (lock.q = [],
        lock.active = !1),
        function(ret) {
            if (lock.active)
                return lock.q.push(function() {
                    f(onExit(ret))
                }),
                undefined
            lock.active = !0,
            f(onExit(ret))
        }
    }
    , function atimeout(delay, f, opt_timeoutF) {
        return function(ret) {
            var timedOut = !1
              , completed = !1
            setTimeout(function() {
                completed || (timedOut = !0,
                console.log("timeout"),
                opt_timeoutF && opt_timeoutF())
            }, delay),
            f(aseq(function(ret) {
                (completed = timedOut ? completed : !0) && ret()
            }, ret))
        }
    }
    , function amemo(f, opt_ttl) {
        var memoized = !1, values, waiters, age = 0, pending = !1
        return function(ret) {
            if (memoized)
                return ret.apply(null, values),
                null != opt_ttl && !pending && Date.now() > age + opt_ttl && (pending = !0,
                f(function() {
                    values = arguments,
                    age = Date.now(),
                    pending = !1
                })),
                undefined
            var first = !waiters;
            (waiters = first ? [] : waiters).push(ret),
            first && f(function() {
                values = arguments,
                age = Date.now()
                for (var i = 0; i < waiters.length; i++)
                    waiters[i] && waiters[i].apply(null, values)
                null == opt_ttl && (f = void 0),
                memoized = !0,
                waiters = void 0
            })
        }
    }
    , function amemo1(afunc) {
        var cache = {}
        return function(ret, arg) {
            var key = arg ? arg.toString() : ""
            cache[key] || (cache[key] = afuture(),
            afunc(cache[key].set, arg)),
            cache[key].get(ret)
        }
    }
    , function amerged(f) {
        var waiters
        return function(ret) {
            var first = !waiters, args
            first && (waiters = [],
            args = argsToArray(arguments)),
            waiters.push(ret),
            first && (args[0] = function() {
                var calls = waiters
                waiters = void 0
                for (var i = 0; i < calls.length; i++)
                    calls[i] && calls[i].apply(null, arguments)
            }
            ,
            f.apply(null, args))
        }
    }
    , function mergeAsync(f) {
        var active = !1, args
        return function() {
            if (active)
                return args = argsToArray(arguments),
                undefined
            active = !0
            var ret = function() {
                args ? (args.unshift(ret),
                f.apply(null, args),
                args = void 0) : active = !1
            }
              , a = argsToArray(arguments)
            a.unshift(ret),
            f.apply(null, a)
        }
    }
    , function ao() {
        for (var ret = arguments[arguments.length - 1], i = 0; i < arguments.length - 1; i++)
            ret = arguments[i].ao(ret)
        return ret
    }
    , function aseq() {
        if (0 == arguments.lenth)
            return anop
        for (var f = arguments[arguments.length - 1], i = arguments.length - 2; 0 <= i; i--)
            f = arguments[i].aseq(i % 100 == 99 ? atramp(f) : f)
        return f
    }
    , function apar() {
        var aargs = []
          , count = 0
          , fs = arguments
        return function(ret) {
            if (0 == fs.length)
                return ret && ret(),
                undefined
            for (var opt_args = Array.prototype.splice.call(arguments, 1), ajoin = function(i) {
                if (aargs[i] = Array.prototype.splice.call(arguments, 1),
                ++count == fs.length) {
                    for (var a = [], j = 0; j < fs.length; j++)
                        for (var k = 0; k < aargs[j].length; k++)
                            a.push(aargs[j][k])
                    ret && ret.apply(null, a)
                }
            }, i = 0; i < fs.length; i++)
                fs[i].apply(null, [ajoin.bind(null, i)].concat(opt_args))
        }
    }
    , function() {
        var active = !1
          , jobs = []
        return function atramp(afunc) {
            return function() {
                if (jobs.push([afunc, arguments]),
                !active) {
                    var job
                    for (console.assert(jobs.length <= 1, "atramp with multiple jobs"),
                    active = !0; null != (job = jobs.pop()); )
                        job[0].apply(this, job[1])
                    active = !1
                }
            }
        }
    }(), function arepeatpar(n, afunc) {
        return function(ret) {
            if (0 === n)
                return ret && ret(),
                undefined
            for (var aargs = [], count = 0, opt_args = Array.prototype.splice.call(arguments, 1), ajoin = function(i) {
                var a;
                ++count == n && ret && ret.apply(null, [])
            }, i = 0; i < n; i++)
                afunc.apply(null, [ajoin.bind(null, i)].concat([i, n]).concat(opt_args))
        }
    }
    , function axhr(url, opt_op, opt_params) {
        var op = opt_op || "GET"
          , params = opt_params || []
        return function(ret) {
            var xhr = new XMLHttpRequest
            xhr.open(op, url),
            xhr.asend(function(json) {
                ret(JSON.parse(json))
            }, params && params.join("&"))
        }
    }
    , function futurefn(future) {
        return function() {
            var args = arguments
            future.get(function(f) {
                f.apply(void 0, args)
            })
        }
    }
    , function adelay(afunc, delay) {
        var queue = [], timeout
        function pump() {
            var top, f, args, ret
            timeout || queue.length && (top = queue.shift(),
            f = top[0],
            args = top[1],
            ret = args[0],
            args[0] = function() {
                ret.apply(null, arguments),
                pump()
            }
            ,
            timeout = setTimeout(function() {
                timeout = 0,
                f.apply(null, args)
            }, delay))
        }
        return function() {
            var args
            queue.push([afunc, arguments]),
            pump()
        }
    }
    , function adebugger(fn) {
        return function(ret) {
            fn.apply(null, arguments)
        }
    }
    ]
}),
{})
  , wrapJsonpCallback = function() {
    var nextID = 0
    return function(ret, opt_nonce) {
        var id = "c" + nextID++
          , opt_nonce = (opt_nonce && (id += Math.floor(16777215 * Math.random()).toString(16)),
        __JSONP_CALLBACKS__[id] = function(data) {
            delete __JSONP_CALLBACKS__[id],
            ret && ret.call(this, data)
        }
        )
        return opt_nonce.id = id,
        opt_nonce
    }
}()
  , ajsonp = function(url, params) {
    return function(ret) {
        var cb = wrapJsonpCallback(ret)
          , ret = document.createElement("script")
        ret.src = url + "?callback=__JSONP_CALLBACKS__." + cb.id + (params ? "&" + params.join("&") : ""),
        ret.onload = function() {
            document.body.removeChild(this)
        }
        ,
        ret.onerror = function() {
            cb(null),
            document.body.removeChild(this)
        }
        ,
        document.body.appendChild(ret)
    }
}
  , StringPS = {
    create: function(str) {
        var o = Object.create(this)
        return o.pos = 0,
        o.str_ = [str],
        o.tail_ = [],
        o
    },
    set str(str) {
        this.str_[0] = str
    },
    get head() {
        return this.pos >= this.str_[0].length ? null : this.str_[0].charAt(this.pos)
    },
    get value() {
        return this.hasOwnProperty("value_") ? this.value_ : this.str_[0].charAt(this.pos - 1)
    },
    get tail() {
        var tail
        return this.tail_[0] || ((tail = Object.create(this.__proto__)).str_ = this.str_,
        tail.pos = this.pos + 1,
        tail.tail_ = [],
        this.tail_[0] = tail),
        this.tail_[0]
    },
    setValue: function(value) {
        var ret = Object.create(this.__proto__)
        return ret.str_ = this.str_,
        ret.pos = this.pos,
        ret.tail_ = this.tail_,
        ret.value_ = value,
        ret
    },
    toString: function() {
        return this.str_[0].substring(this.pos)
    }
}
function prep(arg) {
    return "string" == typeof arg ? literal(arg) : arg
}
function prepArgs(args) {
    for (var i = 0; i < args.length; i++)
        args[i] = prep(args[i])
    return args
}
function range(c1, c2) {
    var f = function(ps) {
        if (ps.head) {
            if (!(ps.head < c1 || ps.head > c2))
                return ps.tail.setValue(ps.head)
            void 0
        } else
            void 0
    }
    return f.toString = function() {
        return "range(" + c1 + ", " + c2 + ")"
    }
    ,
    f
}
var literal = function() {
    var cache = {}
    return function(str, opt_value) {
        if (!opt_value && cache[str])
            return cache[str]
        var f, f = 1 === str.length ? function(ps) {
            return str === ps.head ? ps.tail.setValue(opt_value || str) : void 0
        }
        : function(ps) {
            for (var i = 0; i < str.length; i++,
            ps = ps.tail)
                if (str.charAt(i) !== ps.head)
                    return void 0
            return ps.setValue(opt_value || str)
        }
        return f.toString = function() {
            return '"' + str + '"'
        }
        ,
        opt_value ? f : cache[str] = f
    }
}()
function literal_ic(str, opt_value) {
    str = str.toLowerCase()
    var f = function(ps) {
        for (var i = 0; i < str.length; i++,
        ps = ps.tail)
            if (!ps.head || str.charAt(i) !== ps.head.toLowerCase())
                return void 0
        return ps.setValue(opt_value || str)
    }
    return f.toString = function() {
        return '"' + str + '"'
    }
    ,
    f
}
var alphaChar = alt(range("a", "z"), range("A", "Z"))
  , alphaNumChar = alt(alphaChar, range("0", "9"))
  , wordChar = alt(alphaNumChar, "_")
function anyChar(ps) {
    return ps.head ? ps.tail : void 0
}
function fail(ps) {
    0
}
function notChar(c) {
    return function(ps) {
        return ps.head && ps.head !== c ? ps.tail.setValue(ps.head) : void 0
    }
}
function notChars(s) {
    return function(ps) {
        return ps.head && -1 == s.indexOf(ps.head) ? ps.tail.setValue(ps.head) : void 0
    }
}
function not(p, opt_else) {
    p = prep(p),
    opt_else = prep(opt_else)
    var f = function(ps) {
        return this.parse(p, ps) ? void 0 : opt_else ? this.parse(opt_else, ps) : ps
    }
    return f.toString = function() {
        return "not(" + p + ")"
    }
    ,
    f
}
function optional(p) {
    p = prep(p)
    var f = function(ps) {
        return this.parse(p, ps) || ps.setValue(void 0)
    }
    return f.toString = function() {
        return "optional(" + p + ")"
    }
    ,
    f
}
function copyInput(p) {
    p = prep(p)
    var f = function(ps) {
        var res = this.parse(p, ps)
        return res && res.setValue(ps.str_.toString().substring(ps.pos, res.pos))
    }
    return f.toString = function() {
        return "copyInput(" + p + ")"
    }
    ,
    f
}
function lookahead(p) {
    p = prep(p)
    var f = function(ps) {
        return this.parse(p, ps) && ps
    }
    return f.toString = function() {
        return "lookahead(" + p + ")"
    }
    ,
    f
}
function repeat(p, opt_delim, opt_min, opt_max) {
    p = prep(p),
    opt_delim = prep(opt_delim)
    var f = function(ps) {
        for (var ret = [], i = 0, res; !opt_max || i < opt_max; i++) {
            if (opt_delim && 0 != ret.length) {
                if (!(res = this.parse(opt_delim, ps)))
                    break
                ps = res
            }
            if (!(res = this.parse(p, ps)))
                break
            ret.push(res.value),
            ps = res
        }
        if (!(opt_min && ret.length < opt_min))
            return ps.setValue(ret)
        void 0
    }
    return f.toString = function() {
        return "repeat(" + p + ", " + opt_delim + ", " + opt_min + ", " + opt_max + ")"
    }
    ,
    f
}
function plus(p, opt_delim) {
    return repeat(p, opt_delim, 1)
}
function noskip(p) {
    return function(ps) {
        return this.skip_ = !1,
        ps = this.parse(p, ps),
        this.skip_ = !0,
        ps
    }
}
function repeat0(p) {
    p = prep(p)
    var f = function(ps) {
        for (var res; res = this.parse(p, ps); )
            ps = res
        return ps.setValue("")
    }
    return f.toString = function() {
        return "repeat0(" + p + ")"
    }
    ,
    f
}
function plus0(p) {
    p = prep(p)
    var f = function(ps) {
        var res
        if (res = this.parse(p, ps)) {
            for (ps = res; res = this.parse(p, ps); )
                ps = res
            return ps.setValue("")
        }
        void 0
    }
    return f.toString = function() {
        return "repeat0(" + p + ")"
    }
    ,
    f
}
function seq() {
    var args = prepArgs(arguments)
      , f = function(ps) {
        for (var ret = [], i = 0; i < args.length; i++) {
            if (!(ps = this.parse(args[i], ps)))
                return void 0
            ret.push(ps.value)
        }
        return ps.setValue(ret)
    }
    return f.toString = function() {
        return "seq(" + argsToArray(args).join(",") + ")"
    }
    ,
    f
}
function seq1(n) {
    var args = prepArgs(argsToArray(arguments).slice(1))
      , f = function(ps) {
        for (var ret, i = 0; i < args.length; i++) {
            if (!(ps = this.parse(args[i], ps)))
                return void 0
            i == n && (ret = ps.value)
        }
        return ps.setValue(ret)
    }
    return f.toString = function() {
        return "seq1(" + n + ", " + argsToArray(args).join(",") + ")"
    }
    ,
    f
}
var parserVersion_ = 1
function invalidateParsers() {
    parserVersion_++
}
function simpleAlt() {
    var args = prepArgs(arguments)
    if (1 == args.length)
        return args[0]
    var f = function(ps) {
        for (var i = 0; i < args.length; i++) {
            var res = this.parse(args[i], ps)
            if (res)
                return res
        }
        0
    }
    return f.toString = function() {
        return "simpleAlt(" + argsToArray(args).join(" | ") + ")"
    }
    ,
    f
}
var TrapPStream = {
    create: function(ps) {
        return {
            __proto__: this,
            head: ps.head,
            value: ps.value,
            goodChar: !1
        }
    },
    getValue: function() {
        return this.value
    },
    setValue: function(v) {
        return this.value = v,
        this
    },
    get tail() {
        return this.goodChar = !0,
        {
            value: this.value,
            getValue: function() {
                return this.value
            },
            setValue: function(v) {
                this.value = v
            }
        }
    }
}
function alt() {
    var SIMPLE_ALT = simpleAlt.apply(null, arguments)
      , args = prepArgs(arguments)
      , map = {}
      , parserVersion = parserVersion_
    function nullParser() {
        0
    }
    function testParser(p, ps) {
        var ps = TrapPStream.create(ps)
        return this.parse(p, ps),
        ps.goodChar
    }
    function getParserForChar(ps) {
        var c = ps.head
          , p = map[c]
        if (!p) {
            for (var alts = [], i = 0; i < args.length; i++) {
                var parser = args[i]
                testParser.call(this, parser, ps) && alts.push(parser)
            }
            p = 0 == alts.length ? nullParser : 1 == alts.length ? alts[0] : simpleAlt.apply(null, alts),
            map[c] = p
        }
        return p
    }
    var f = function(ps) {
        var r1
        return parserVersion !== parserVersion_ && (map = {},
        parserVersion = parserVersion_),
        this.parse(getParserForChar.call(this, ps), ps)
    }
    return f.toString = function() {
        return "alt(" + argsToArray(args).join(" | ") + ")"
    }
    ,
    f
}
function str(p) {
    p = prep(p)
    var f = function(ps) {
        var ps
        return (ps = this.parse(p, ps)) ? ps.setValue(ps.value.join("")) : void 0
    }
    return f.toString = function() {
        return "str(" + p + ")"
    }
    ,
    f
}
function pick(as, p) {
    p = prep(p)
    var f = function(ps) {
        var ps
        if (ps = this.parse(p, ps)) {
            for (var ret = [], i = 0; i < as.length; i++)
                ret.push(ps.value[as[i]])
            return ps.setValue(ret)
        }
        void 0
    }
    return f.toString = function() {
        return "pick(" + as + ", " + p + ")"
    }
    ,
    f
}
function parsedebug(p) {
    return function(ps) {
        var old = DEBUG_PARSE
          , ps = (DEBUG_PARSE = !0,
        this.parse(p, ps))
        return DEBUG_PARSE = old,
        ps
    }
}
function sym(name) {
    var f = function(ps) {
        var p = this[name]
        return p || console.log("PARSE ERROR: Unknown Symbol <" + name + ">"),
        this.parse(p, ps)
    }
    return f.toString = function() {
        return "<" + name + ">"
    }
    ,
    f
}
var DEBUG_PARSE = !1
  , grammar = {
    parseString: function(str, opt_start) {
        var ps = this.stringPS
          , str = (ps.str = str,
        this.parse(opt_start || this.START, ps))
        return str && str.value
    },
    parse: function(parser, pstream) {
        DEBUG_PARSE && pstream.str_ && (console.log(new Array(pstream.pos).join("."), pstream.head),
        console.log(pstream.pos + "> " + pstream.str_[0].substring(0, pstream.pos) + "(" + pstream.head + ")"))
        var pstream = parser.call(this, pstream)
        return DEBUG_PARSE && console.log(parser + " ==> " + !!pstream + "  " + (pstream && pstream.value)),
        pstream
    },
    export: function(str) {
        return this[str].bind(this)
    },
    addAction: function(sym, action) {
        var p = this[sym]
        this[sym] = function(ps) {
            var val = ps.value
              , ps = this.parse(p, ps)
            return ps && ps.setValue(action.call(this, ps.value, val))
        }
        ,
        this[sym].toString = function() {
            return "<<" + sym + ">>"
        }
    },
    addActions: function(map) {
        for (var key in map)
            this.addAction(key, map[key])
        return this
    }
}
function defineTTLProperty(obj, name, ttl, f) {
    obj.__defineGetter__(name, function() {
        var accessed, value = void 0
        return this.__defineGetter__(name, function() {
            function scheduleTimer() {
                var ref = setTimeout(function() {
                    accessed ? scheduleTimer() : value = void 0,
                    accessed = !1
                }, ttl)
                ref && ref.unref && ref.unref()
            }
            return value ? accessed = !0 : (accessed = !1,
            value = f(),
            scheduleTimer()),
            value
        }),
        this[name]
    })
}
defineTTLProperty(grammar, "stringPS", 3e4, function() {
    return StringPS.create("")
})
var SkipGrammar = {
    create: function(gramr, skipp) {
        return {
            __proto__: gramr,
            skip_: !0,
            parse: function(parser, pstream) {
                return this.skip_ && (pstream = this.skip.call(grammar, pstream) || pstream),
                this.__proto__.parse.call(this, parser, pstream)
            },
            skip: skipp
        }
    }
}
  , __ROOT__ = {}
  , FunctionStack = (MODEL({
    name: "EventService",
    extends: "__ROOT__",
    constants: {
        UNSUBSCRIBE_EXCEPTION: "unsubscribe",
        WILDCARD: "*"
    },
    methods: {
        oneTime: function(listener) {
            return function() {
                throw listener.apply(this, argsToArray(arguments)),
                EventService.UNSUBSCRIBE_EXCEPTION
            }
        },
        consoleLog: function(listener) {
            return function() {
                var args = argsToArray(arguments)
                console.log(args),
                listener.apply(this, args)
            }
        },
        merged: function(listener, opt_delay, opt_X) {
            var setTimeoutX = opt_X && opt_X.setTimeout || setTimeout, delay = opt_delay || 16, triggered, unsubscribed, lastArgs, opt_X
            return unsubscribed = triggered = !1,
            lastArgs = null,
            opt_X = function() {
                if (lastArgs = arguments,
                unsubscribed)
                    throw EventService.UNSUBSCRIBE_EXCEPTION
                if (!triggered) {
                    triggered = !0
                    try {
                        setTimeoutX(function() {
                            triggered = !1
                            var args = argsToArray(lastArgs)
                            lastArgs = null
                            try {
                                listener.apply(this, args)
                            } catch (x) {
                                x === EventService.UNSUBSCRIBE_EXCEPTION && (unsubscribed = !0)
                            }
                        }, delay)
                    } catch (e) {
                        throw EventService.UNSUBSCRIBE_EXCEPTION
                    }
                }
            }
            ,
            DEBUG && (opt_X.toString = function() {
                return "MERGED(" + delay + ", " + listener.$UID + ", " + listener + ")"
            }
            ),
            opt_X
        },
        framed: function(listener, opt_X) {
            var requestAnimationFrameX = (opt_X = opt_X || this.X) && opt_X.requestAnimationFrame || requestAnimationFrame, triggered, unsubscribed, lastArgs, opt_X
            return unsubscribed = triggered = !1,
            lastArgs = null,
            opt_X = function() {
                if (lastArgs = arguments,
                unsubscribed)
                    throw EventService.UNSUBSCRIBE_EXCEPTION
                triggered || (triggered = !0,
                requestAnimationFrameX(function() {
                    triggered = !1
                    var args = argsToArray(lastArgs)
                    lastArgs = null
                    try {
                        listener.apply(this, args)
                    } catch (x) {
                        x === EventService.UNSUBSCRIBE_EXCEPTION && (unsubscribed = !0)
                    }
                }))
            }
            ,
            DEBUG && (opt_X.toString = function() {
                return "FRAMED(" + listener.$UID + ", " + listener + ")"
            }
            ),
            opt_X
        },
        async: function(listener, opt_X) {
            return this.delay(0, listener, opt_X)
        },
        delay: function(delay, listener, opt_X) {
            return opt_X = opt_X || this.X,
            function() {
                var args = argsToArray(arguments);
                (opt_X && opt_X.setTimeout ? opt_X.setTimeout : setTimeout)(function() {
                    listener.apply(this, args)
                }, delay)
            }
        },
        hasListeners: function(opt_topic) {
            return opt_topic ? (console.log("TODO: haslisteners"),
            !0) : !!this.subs_
        },
        publish: function(topic) {
            return this.subs_ ? this.pub_(this.subs_, 0, topic, this.appendArguments([this, topic], arguments, 1)) : 0
        },
        publishAsync: function(topic) {
            var args = argsToArray(arguments)
              , me = this
            setTimeout(function() {
                me.publish.apply(me, args)
            }, 0)
        },
        deepPublish: function(topic) {
            return this.publish.apply(this, arguments)
        },
        lazyPublish: function(topic, fn) {
            return this.hasListeners(topic) ? this.publish.apply(this, fn()) : 0
        },
        subscribe: function(topic, listener) {
            this.subs_ || (this.subs_ = {}),
            this.sub_(this.subs_, 0, topic, listener)
        },
        unsubscribe: function(topic, listener) {
            this.subs_ && this.unsub_(this.subs_, 0, topic, listener)
        },
        unsubscribeAll: function() {
            this.sub_ = {}
        },
        pub_: function(map, topicIndex, topic, msg) {
            var count = 0
            if (null == map)
                return 0
            if (topicIndex < topic.length) {
                var t = topic[topicIndex]
                if (t == this.WILDCARD)
                    return this.notifyListeners_(topic, map, msg)
                t && (count += this.pub_(map[t], topicIndex + 1, topic, msg))
            }
            return count += this.notifyListeners_(topic, map.null, msg)
        },
        sub_: function(map, topicIndex, topic, listener) {
            var key
            topicIndex == topic.length ? (map.null || (map.null = []),
            map.null.push(listener)) : (map[key = topic[topicIndex]] || (map[key] = {}),
            this.sub_(map[key], topicIndex + 1, topic, listener))
        },
        unsub_: function(map, topicIndex, topic, listener) {
            if (topicIndex == topic.length) {
                if (!map.null)
                    return !0
                var i = map.null.indexOf(listener);
                -1 == i || (map.null = map.null.spliceF(i, 1)),
                map.null.length || delete map.null
            } else {
                var i = topic[topicIndex]
                if (!map[i])
                    return !1
                this.unsub_(map[i], topicIndex + 1, topic, listener) && delete map[i]
            }
            return 0 == Object.keys(map).length
        },
        notifyListener_: function(topic, listener, msg) {
            try {
                listener.apply(null, msg)
            } catch (err) {
                return err !== this.UNSUBSCRIBE_EXCEPTION && (console.error("Error delivering event (removing listener): ", topic.join("."), err),
                DEBUG && console.error(err.stack)),
                !1
            }
            return !0
        },
        notifyListeners_: function(topic, listeners, msg) {
            if (null == listeners)
                return 0
            if (Array.isArray(listeners)) {
                for (var i = 0; i < listeners.length; i++) {
                    var listener = listeners[i]
                    this.notifyListener_(topic, listener, msg) || this.unsubscribe(topic, listener)
                }
                return listeners.length
            }
            var count = 0, key
            for (key in listeners)
                count += this.notifyListeners_(topic, listeners[key], msg)
            return count
        },
        appendArguments: function(a, args, start) {
            for (var i = start; i < args.length; i++)
                a.push(args[i])
            return a
        }
    }
}),
MODEL({
    name: "PropertyChangeSupport",
    extends: "EventService",
    constants: {
        PROPERTY_TOPIC: "property"
    },
    methods: {
        propertyTopic: memoize1(function(property) {
            return [this.PROPERTY_TOPIC, property]
        }),
        propertyChange: function(property, oldValue, newValue) {
            this.subs_ && (null != property && (oldValue === newValue || oldValue != oldValue && newValue != newValue) || this.publish(this.propertyTopic(property), oldValue, newValue))
        },
        propertyChange_: function(propertyTopic, oldValue, newValue) {
            this.subs_ && (oldValue === newValue || oldValue != oldValue && newValue != newValue || this.publish(propertyTopic, oldValue, newValue))
        },
        globalChange: function() {
            this.publish(this.propertyTopic(this.WILDCARD), null, null)
        },
        addListener: function(listener) {
            console.assert(listener, "Listener cannot be null."),
            this.addPropertyListener(null, listener)
        },
        removeListener: function(listener) {
            this.removePropertyListener(null, listener)
        },
        addPropertyListener: function(property, listener) {
            this.subscribe(this.propertyTopic(property), listener)
        },
        removePropertyListener: function(property, listener) {
            this.unsubscribe(this.propertyTopic(property), listener)
        },
        propertyValue: function(prop) {
            if (!prop)
                throw "Property Name required for propertyValue()."
            var props = this.props_ || (this.props_ = {})
            return Object.hasOwnProperty.call(props, prop) ? props[prop] : props[prop] = PropertyValue.create(this, prop)
        }
    }
}),
{
    create: function() {
        var stack = [!1]
        return {
            stack: stack,
            push: function(f) {
                stack.unshift(f)
            },
            pop: function() {
                stack.shift()
            }
        }
    }
})
  , Value = {
    __isValue__: !0,
    isInstance: function(o) {
        return o && o.__isValue__
    },
    follow: function(srcValue) {
        Events.follow(srcValue, this)
    }
}
  , PropertyValue = {
    __proto__: Value,
    create: function(obj, prop) {
        var o = Object.create(this)
        return o.$UID = obj.$UID + "." + prop,
        o.obj = obj,
        o.prop = prop,
        o
    },
    get: function() {
        return this.obj[this.prop]
    },
    set: function(val) {
        this.obj[this.prop] = val
    },
    get value() {
        return this.get()
    },
    set value(val) {
        this.set(val)
    },
    addListener: function(listener) {
        this.obj.addPropertyListener(this.prop, listener)
    },
    removeListener: function(listener) {
        this.obj.removePropertyListener(this.prop, listener)
    },
    toString: function() {
        return "PropertyValue(" + this.prop + ")"
    }
}
  , Events = {
    listeners_: new WeakMap,
    recordListener: function(src, dst, listener, opt_dontCallListener) {
        var srcMap = this.listeners_.get(src)
        srcMap || (srcMap = new WeakMap,
        this.listeners_.set(src, srcMap)),
        console.assert(!srcMap.get(dst), "recordListener: duplicate follow"),
        srcMap.set(dst, listener),
        src.addListener(listener),
        opt_dontCallListener || listener()
    },
    identity: function(x) {
        return x
    },
    follow: function(srcValue, dstValue) {
        srcValue && dstValue && this.recordListener(srcValue, dstValue, function() {
            var sv = srcValue.get()
              , dv = dstValue.get()
            equals(sv, dv) || dstValue.set(sv)
        })
    },
    unfollow: function(src, dst) {
        var srcMap, listener
        src && dst && ((srcMap = this.listeners_.get(src)) && ((listener = srcMap.get(dst)) && (srcMap.delete(dst),
        src.removeListener(listener))))
    },
    map: function(srcValue, dstValue, f) {
        srcValue && dstValue && this.recordListener(srcValue, dstValue, function() {
            var s = f(srcValue.get())
              , d = dstValue.get()
            equals(s, d) || dstValue.set(s)
        })
    },
    link: function(srcValue, dstValue) {
        this.follow(srcValue, dstValue),
        this.follow(dstValue, srcValue)
    },
    relate: function(srcValue, dstValue, f, fprime, removeFeedback) {
        var feedback, l, f, l
        srcValue && dstValue && (feedback = !1,
        f = (l = function(sv, dv, f) {
            return function() {
                var s, d
                removeFeedback && feedback || (s = f(sv.get()),
                d = dv.get(),
                equals(s, d) || (feedback = !0,
                dv.set(s),
                feedback = !1))
            }
        }
        )(srcValue, dstValue, f),
        l = l(dstValue, srcValue, fprime),
        this.recordListener(srcValue, dstValue, f, !0),
        this.recordListener(dstValue, srcValue, l, !0),
        f())
    },
    unlink: function(value1, value2) {
        this.unfollow(value1, value2),
        this.unfollow(value2, value1)
    },
    dynamicFn: function(fn, opt_fn, opt_X) {
        var fn2, listener = EventService.framed(opt_fn ? function() {
            opt_fn(fn())
        }
        : fn, opt_X), propertyValues = [], opt_X = (fn(),
        Events.onGet.push(function(obj, name, value) {
            var l = obj.propertyValue(name);
            -1 == propertyValues.indexOf(l) && (obj.propertyValue(name).addListener(listener),
            propertyValues.push(l))
        }),
        fn())
        return Events.onGet.pop(),
        opt_fn && opt_fn(opt_X),
        {
            destroy: function() {
                propertyValues.forEach(function(p) {
                    p.removeListener(listener)
                })
            }
        }
    },
    onSet: FunctionStack.create(),
    onGet: FunctionStack.create()
}
  , AbstractFormatter = (MODEL({
    name: "Movement",
    methods: {
        distance: function(x, y) {
            return Math.sqrt(x * x + y * y)
        },
        o: function(f1, f2) {
            return function(x) {
                return f1(f2(x))
            }
        },
        avg: function(f1, f2) {
            return function(x) {
                return (f1(x) + f2(x)) / 2
            }
        },
        spline: function(f1, f2) {
            return function(x) {
                return (1 - x) * f1(x) + x * f2(x)
            }
        },
        linear: function(x) {
            return x
        },
        back: function(x) {
            return x < .5 ? 2 * x : 2 - 2 * x
        },
        accelerate: function(x) {
            return (Math.sin(x * Math.PI - Math.PI / 2) + 1) / 2
        },
        easeIn: function(a) {
            var v = 1 / (1 - a / 2)
            return function(x) {
                var x1 = Math.min(x, a)
                  , x = Math.max(x - a, 0)
                return (a ? .5 * x1 * (x1 / a) * v : 0) + x * v
            }
        },
        reverse: function(f) {
            return function(x) {
                return 1 - f(1 - x)
            }
        },
        easeOut: function(b) {
            return Movement.reverse(Movement.easeIn(b))
        },
        oscillate: function(b, a, opt_c) {
            var c = opt_c || 3
            return function(x) {
                if (x < 1 - b)
                    return x / (1 - b)
                var x = (x - 1 + b) / b
                return 1 + 2 * (1 - x) * a * Math.sin(2 * c * Math.PI * x)
            }
        },
        bounce: function(b, a, opt_c) {
            var c = opt_c || 3
            return function(x) {
                if (x < 1 - b)
                    return x / (1 - b)
                var x = (x - 1 + b) / b
                return 1 - 2 * (1 - x) * a * Math.abs(Math.sin(2 * c * Math.PI * x))
            }
        },
        bounce2: function(a) {
            var v = 1 / (1 - a)
            return function(x) {
                if (x < 1 - a)
                    return v * x
                var p = (x - 1 + a) / a
                return 1 - (x - 1 + a) * v / 2
            }
        },
        stepBack: function(a) {
            return function(x) {
                return x < a ? -x : -2 * a + (1 + 2 * a) * x
            }
        },
        ease: function(a, b) {
            return Movement.o(Movement.easeIn(a), Movement.easeOut(b))
        },
        seq: function(f1, f2) {
            return f1 && f2 ? function() {
                f1.apply(this, argsToArray(arguments)),
                f2()
            }
            : f1 || f2
        },
        liveAnimations_: 0,
        animate: function(duration, fn, opt_interp, opt_onEnd, opt_X) {
            var requestAnimationFrameX = opt_X && opt_X.requestAnimationFrame || requestAnimationFrame
            if (0 == duration)
                return Movement.seq(fn, opt_onEnd)
            var interp = opt_interp || Movement.linear
            return function() {
                var ranges = []
                  , stopped = !1
                function stop() {
                    var onEnd = opt_onEnd, tasks
                    stopped || (Movement.liveAnimations_--,
                    stopped = !0,
                    onEnd && onEnd(),
                    onEnd = null,
                    0 === Movement.liveAnimations_ && ((tasks = Movement.idleTasks_) && 0 < tasks.length && (Movement.idleTasks_ = [],
                    setTimeout(function() {
                        var i
                        if (0 < Movement.liveAnimations_)
                            for (i = 0; i < tasks.length; i++)
                                Movement.idleTasks_.push(tasks[i])
                        else
                            for (i = 0; i < tasks.length; i++)
                                tasks[i]()
                    }, 20))))
                }
                fn && (Events.onSet.push(function(obj, name, value2) {
                    ranges.push([obj, name, obj[name], value2])
                }),
                fn.apply(this, argsToArray(arguments)),
                Events.onSet.pop())
                var startTime = Date.now(), setTimeoutX
                function go() {
                    if (!stopped) {
                        for (var now = Date.now(), p = interp((Math.min(now, startTime + duration) - startTime) / duration), last = startTime + duration <= now, i = 0; i < ranges.length; i++) {
                            var r = ranges[i]
                              , obj = r[0]
                              , name = r[1]
                              , value1 = r[2]
                              , r = r[3]
                            obj[name] = last ? r : value1 + (r - value1) * p
                        }
                        last ? stop() : requestAnimationFrameX(go)
                    }
                }
                return 0 < ranges.length ? (Movement.liveAnimations_++,
                requestAnimationFrameX(go)) : (opt_X && opt_X.setTimeout || setTimeout)(stop, duration),
                stop
            }
        },
        whenIdle: function(fn) {
            return function() {
                var args
                0 < Movement.liveAnimations_ ? (Movement.idleTasks_ || (Movement.idleTasks_ = []),
                args = arguments,
                Movement.idleTasks_.push(function() {
                    fn.apply(fn, args)
                })) : fn.apply(fn, arguments)
            }
        },
        compile: function(a, opt_rest) {
            function noop() {}
            function isPause(op) {
                return Array.isArray(op) && 0 == op[0]
            }
            function compilePause(op, rest) {
                return function() {
                    var l = function() {
                        document.removeEventListener("click", l),
                        rest()
                    }
                    document.addEventListener("click", l)
                }
            }
            function isSimple(op) {
                return Array.isArray(op) && "number" == typeof op[0]
            }
            function compileSimple(op, rest) {
                return op[3] = Movement.seq(op[3], rest),
                function() {
                    Movement.animate.apply(null, op)()
                }
            }
            function isParallel(op) {
                return Array.isArray(op) && Array.isArray(op[0])
            }
            function compileParallel(op, rest) {
                var join = (num = op.length,
                function() {
                    --num || rest()
                }
                ), num
                return function() {
                    for (var i = 0; i < op.length; i++)
                        (isSimple(op[i]) ? Movement.animate(op[i][0], op[i][1], op[i][2], Movement.seq(op[i][3], join)) : Movement.compile(op[i], join))()
                }
            }
            function compileFn(fn, rest) {
                return Movement.seq(fn, rest)
            }
            function compile_(a, i) {
                if (i >= a.length)
                    return opt_rest || noop
                var rest = compile_(a, i + 1)
                  , a = a[i]
                return (isPause(a) ? compilePause : isSimple(a) ? compileSimple : isParallel(a) ? compileParallel : compileFn)(a, rest)
            }
            return compile_(a, 0)
        },
        onIntersect: function(o1, o2, fn) {
            o1.model_.R ? Events.dynamicFn(function() {
                o1.x,
                o1.y,
                o2.x,
                o2.y
            }, function() {
                var dx = o1.x - o2.x, dy = o1.y - o2.y, d, r2 = o1.r + o2.r
                dx * dx + dy * dy < r2 * r2 && fn.call(null, o1, o2)
            }) : Events.dynamicFn(function() {
                o1.x,
                o1.y,
                o2.x,
                o2.y
            }, function() {
                (o1.x <= o2.x && o1.x + o1.width > o2.x && o1.y <= o2.y && o1.y + o1.height > o2.y || o2.x <= o1.x && o2.x + o2.width > o1.x && o2.y <= o1.y && o2.y + o2.height > o1.y) && fn.call(null, o1, o2)
            })
        },
        stepTowards: function(src, dst, maxStep) {
            var dx = src.x - dst.x, src = src.y - dst.y, theta = Math.atan2(src, dx), dx, dx = (dx = Math.sqrt(dx * dx + src * src)) < 0 ? Math.max(-maxStep, dx) : Math.min(maxStep, dx)
            dst.x += dx * Math.cos(-theta),
            dst.y -= dx * Math.sin(-theta)
        },
        moveTowards: function(t, body, sat, v) {
            var bodyX = body.propertyValue("x")
              , bodyY = body.propertyValue("y")
              , satX = sat.propertyValue("x")
              , satY = sat.propertyValue("y")
            t.addListener(function() {
                var dx = bodyX.get() - satX.get(), dy = bodyY.get() - satY.get(), theta = Math.atan2(dy, dx), dx, dx = (dx = Math.sqrt(dx * dx + dy * dy)) < 0 ? Math.max(-v, dx) : Math.min(v, dx)
                satX.set(satX.get() + dx * Math.cos(-theta)),
                satY.set(satY.get() - dx * Math.sin(-theta))
            })
        },
        orbit: function(t, body, sat, r, p, opt_start) {
            var bodyX = body.x$
              , bodyY = body.y$
              , satX = sat.x$
              , satY = sat.y$
              , start = opt_start || 0
            t.addListener(EventService.framed(function() {
                var time = t.time
                satX.set(bodyX.get() + r * Math.sin(time / p * Math.PI * 2 + start)),
                satY.set(bodyY.get() + r * Math.cos(time / p * Math.PI * 2 + start))
            }))
        },
        strut: function(mouse, c, dx, dy) {
            Events.dynamicFn(function() {
                mouse.x,
                mouse.y
            }, function() {
                c.x = mouse.x + dx,
                c.y = mouse.y + dy
            })
        },
        gravity: function(c, opt_a, opt_theta) {
            var a = opt_a || 1
              , theta = opt_theta || 1.5 * Math.PI
            Events.dynamicFn(function() {
                c.vx,
                c.vy
            }, function() {
                c.vy += a
            })
        },
        friction: function(c, opt_coef) {
            var coef = opt_coef || .9
            Events.dynamicFn(function() {
                c.vx,
                c.vy
            }, function() {
                c.vx = Math.abs(c.vx) < .001 ? 0 : c.vx * coef,
                c.vy = Math.abs(c.vy) < .001 ? 0 : c.vy * coef
            })
        },
        inertia: function(c) {
            var last = Date.now()
            Events.dynamicFn(function() {
                c.vx,
                c.vy,
                c.x,
                c.y
            }, function() {
                var now = Date.now()
                  , time = Math.min(Math.max(16, now - last), 64) / 16;
                .001 < Math.abs(c.vx) && (c.x += c.vx * time),
                .001 < Math.abs(c.vy) && (c.y += c.vy * time),
                last = now
            })
        },
        spring: function(mouse, c, dx, dy, opt_strength) {
            var strength = opt_strength || 6
              , d = Movement.distance(dx, dy)
            Events.dynamicFn(function() {
                mouse.x,
                mouse.y,
                c.x,
                c.y,
                c.vx,
                c.vy
            }, function() {
                var dx2, dy2, d2, d2, dy2
                0 === dx && 0 === dy ? (c.x = mouse.x,
                c.y = mouse.y) : (dx2 = mouse.x + dx - c.x,
                dy2 = mouse.y + dy - c.y,
                d2 = Movement.distance(dx2, dy2),
                d2 = strength * d2 / d,
                Math.abs(d2) < .01 || (dy2 = Math.atan2(dy2, dx2),
                c.vx += d2 * Math.cos(dy2),
                c.vy += d2 * Math.sin(dy2)))
            })
        },
        spring2: function(c1, c2, length, opt_strength) {
            var strength = opt_strength || 4
            Events.dynamicFn(function() {
                c1.x,
                c1.y,
                c2.x,
                c2.y
            }, function() {
                var d = c1.distanceTo(c2)
                  , a = Math.atan2(c2.y - c1.y, c2.x - c1.x)
                length < d ? (c1.applyMomentum(strength * (d / length - 1), a),
                c2.applyMomentum(-strength * (d / length - 1), a)) : d < length && (c1.applyMomentum(-strength * (length / d - 1), a),
                c2.applyMomentum(strength * (length / d - 1), a))
            })
        },
        createAnimatedPropertyInstallFn: function(duration, interpolation) {
            return function(prop) {
                this.defineProperty({
                    name: prop.name + "$AnimationLatch",
                    defaultValue: 0,
                    hidden: !0,
                    documentation: function() {}
                })
                var actualSetter = this.__lookupSetter__(prop.name)
                this.defineProperty({
                    name: prop.name + "$AnimationSetValue",
                    defaultValue: 0,
                    hidden: !0,
                    documentation: function() {},
                    postSet: function(_, nu) {
                        actualSetter.call(this, nu)
                    }
                }),
                this.__defineSetter__(prop.name, function(nu) {
                    var latch = this[prop.name + "$AnimationLatch"]
                      , latch = (latch && latch(),
                    Movement.animate(duration, function() {
                        this[prop.name + "$AnimationSetValue"] = nu
                    }
                    .bind(this), interpolation))
                    this[prop.name + "$AnimationLatch"] = latch()
                })
            }
        }
    }
}),
Movement.easy = Movement.spline(Movement.spline(constantFn(0), Movement.linear), Movement.spline(Movement.linear, constantFn(1))),
{
    keyify: function(str) {
        return '"' + str + '"'
    },
    stringify: function(obj) {
        var buf = ""
        return this.output(function() {
            for (var i = 0; i < arguments.length; i++)
                buf += arguments[i]
        }, obj),
        buf
    },
    stringifyObject: function(obj, opt_defaultModel) {
        var buf = ""
        return this.outputObject_(function() {
            for (var i = 0; i < arguments.length; i++)
                buf += arguments[i]
        }, obj, opt_defaultModel),
        buf
    },
    where: function(p) {
        return {
            __proto__: this,
            p: p.f && p.f.bind(p) || p
        }
    },
    p: function() {
        return !0
    }
})
  , JSONUtil = {
    escape: function(str) {
        return str.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/[\x00-\x1f]/g, function(c) {
            return "\\u00" + (c.charCodeAt(0) < 16 ? "0" + c.charCodeAt(0).toString(16) : c.charCodeAt(0).toString(16))
        })
    },
    parseToMap: function(str) {
        return eval("(" + str + ")")
    },
    aparse: function(ret, X, str) {
        var seq = []
          , res = this.parse(X, str, seq)
        if (seq.length)
            return apar.apply(null, seq)(function() {
                ret(res)
            }),
            undefined
        ret(res)
    },
    amapToObj: function(ret, X, obj, opt_defaultModel) {
        var seq = []
          , res = this.mapToObj(X, obj, opt_defaultModel, seq)
        return seq.length ? (aseq.apply(null, seq)(function() {
            ret(res)
        }),
        void 0) : res
    },
    parse: function(X, str, seq) {
        return this.mapToObj(X, this.parseToMap(str), void 0, seq)
    },
    arrayToObjArray: function(X, a, opt_defaultModel, seq) {
        for (var i = 0; i < a.length; i++)
            a[i] = this.mapToObj(X, a[i], opt_defaultModel, seq)
        return a
    },
    mapToObj: function(X, obj, opt_defaultModel, seq) {
        if (!obj || "object" == typeof obj.model_)
            return obj
        if (Array.isArray(obj))
            return this.arrayToObjArray(X, obj, void 0, seq)
        if (obj instanceof Function)
            return obj
        if (obj instanceof Date)
            return obj
        if (obj instanceof Object) {
            if (("Model" === obj.model_ || "Model" === opt_defaultModel) && obj.properties)
                for (var i = 0; i < obj.properties.length; i++) {
                    var p = obj.properties[i]
                    p.type && !p.model_ && "Property" !== p.type && (p.model_ = p.type + "Property",
                    X.arequire(p.model_)(function(obj, p) {
                        return function(m) {
                            Property && !Property.isSubModel(m) && console.log("ERROR: Use of non Property Sub-Model as Property type: ", obj.package + "." + obj.name, p.type)
                        }
                    }(obj, p)))
                }
            for (var key in obj)
                "model_" != key && "prototype_" != key && (obj[key] = this.mapToObj(X, obj[key], null, seq))
            if (opt_defaultModel && !obj.model_)
                return opt_defaultModel.create(obj, X)
            if (obj.model_) {
                var opt_defaultModel = X.lookup(obj.model_), future
                if (!opt_defaultModel || !opt_defaultModel.finished__)
                    return future = afuture(),
                    seq && seq.push(future.get),
                    X.arequire(obj.model_)(function(model) {
                        if (!model)
                            return FLAGS.debug && "Template" !== obj.model_ && "ArrayProperty" !== obj.model_ && "ViewFactoryProperty" !== obj.model_ && "Documentation" !== obj.model_ && "DocumentationProperty" !== obj.model_ && "CSSProperty" !== obj.model_ && "FunctionProperty" !== obj.model_ && console.warn("Failed to dynamically load: ", obj.model_),
                            future.set(obj),
                            undefined
                        var model
                        obj.instance_ || (model = model.create(obj, X),
                        obj.become(model),
                        future.set(obj))
                    }),
                    obj
                var opt_defaultModel = opt_defaultModel ? opt_defaultModel.create(obj, X) : obj
                return opt_defaultModel.readResolve ? opt_defaultModel.readResolve() : opt_defaultModel
            }
            return obj
        }
        return obj
    },
    compact: {
        __proto__: AbstractFormatter,
        output: function(out, obj, opt_defaultModel) {
            Array.isArray(obj) ? this.outputArray_(out, obj) : "string" == typeof obj ? (out('"'),
            out(JSONUtil.escape(obj)),
            out('"')) : obj instanceof Function ? this.outputFunction_(out, obj) : obj instanceof Date ? out(obj.getTime()) : obj instanceof RegExp ? out(obj.toString()) : obj instanceof Object ? obj.model_ && obj.model_.id ? this.outputObject_(out, obj, opt_defaultModel) : this.outputMap_(out, obj) : out("number" == typeof obj ? obj = isFinite(obj) ? obj : null : void 0 === obj ? null : obj)
        },
        outputObject_: function(out, obj, opt_defaultModel) {
            var str = "", first = !0, properties = (out("{"),
            obj.model_.id !== opt_defaultModel && (this.outputModel_(out, obj),
            first = !1),
            obj.model_.getRuntimeProperties()), key
            for (key in properties) {
                var prop = properties[key], val
                this.p(prop, obj) && prop.name in obj.instance_ && (val = obj[prop.name],
                Array.isArray(val) && !val.length || (first || out(","),
                out(this.keyify(prop.name), ": "),
                Array.isArray(val) && prop.subType ? this.outputArray_(out, val, prop.subType) : this.output(out, val),
                first = !1))
            }
            out("}")
        },
        outputModel_: function(out, obj) {
            out('model_:"'),
            obj.model_.package && out(obj.model_.package, "."),
            out(obj.model_.name, '"')
        },
        outputMap_: function(out, obj) {
            var str = "", first = !0, key
            for (key in out("{"),
            obj) {
                var val = obj[key]
                first || out(","),
                out(this.keyify(key), ": "),
                this.output(out, val),
                first = !1
            }
            out("}")
        },
        outputArray_: function(out, a, opt_defaultModel) {
            if (0 == a.length)
                return out("[]"),
                out
            var str = ""
              , first = !0
            out("[")
            for (var i = 0; i < a.length; i++,
            first = !1) {
                var obj = a[i]
                first || out(","),
                this.output(out, obj, opt_defaultModel)
            }
            out("]")
        },
        outputFunction_: function(out, obj) {
            out(obj)
        }
    },
    pretty: {
        __proto__: AbstractFormatter,
        output: function(out, obj, opt_defaultModel, opt_indent) {
            var opt_indent = opt_indent || ""
            Array.isArray(obj) ? this.outputArray_(out, obj, null, opt_indent) : "string" == typeof obj ? (out('"'),
            out(JSONUtil.escape(obj)),
            out('"')) : obj instanceof Function ? this.outputFunction_(out, obj, opt_indent) : obj instanceof Date ? out(obj.getTime()) : obj instanceof RegExp ? out(obj.toString()) : obj instanceof Object ? obj.model_ ? this.outputObject_(out, obj, opt_defaultModel, opt_indent) : this.outputMap_(out, obj, opt_indent) : out(obj = "number" == typeof obj ? isFinite(obj) ? obj : null : void 0 === obj ? null : obj)
        },
        outputObject_: function(out, obj, opt_defaultModel, opt_indent) {
            var opt_indent = opt_indent || "", nestedIndent = opt_indent + "   ", str = "", first = !0, properties = (out(opt_indent, "{\n"),
            obj.model_.id && obj.model_.id !== opt_defaultModel && (this.outputModel_(out, obj, nestedIndent),
            first = !1),
            obj.model_.getRuntimeProperties()), key
            for (key in properties) {
                var prop = properties[key], val
                this.p(prop, obj) && ("parent" === prop.name || prop.name in obj.instance_ && (val = obj[prop.name],
                Array.isArray(val) && !val.length || equals(val, prop.defaultValue) || (first || out(",\n"),
                out(nestedIndent, this.keyify(prop.name), ": "),
                Array.isArray(val) && prop.subType ? this.outputArray_(out, val, prop.subType, nestedIndent) : this.output(out, val, null, nestedIndent),
                first = !1)))
            }
            out("\n", opt_indent, "}")
        },
        outputModel_: function(out, obj, indent) {
            out(indent, '"model_": "', obj.model_.id, '"')
        },
        outputMap_: function(out, obj, opt_indent) {
            var opt_indent = opt_indent || "", nestedIndent = opt_indent + "   ", str = "", first = !0, key
            for (key in out(opt_indent, "{\n", nestedIndent),
            obj) {
                var val = obj[key]
                first || out(",\n"),
                out(nestedIndent, this.keyify(key), ": "),
                this.output(out, val, null, nestedIndent),
                first = !1
            }
            out("\n", opt_indent, "}")
        },
        outputArray_: function(out, a, opt_defaultModel, opt_indent) {
            if (0 == a.length)
                return out("[]"),
                out
            var opt_indent = opt_indent || ""
              , nestedIndent = opt_indent + "   "
              , str = ""
              , first = !0
            out("[\n")
            for (var i = 0; i < a.length; i++,
            first = !1) {
                var obj = a[i]
                first || out(",\n"),
                this.output(out, obj, opt_defaultModel, nestedIndent)
            }
            out("\n", opt_indent, "]")
        },
        outputFunction_: function(out, obj, indent) {
            var obj = obj.toString()
              , lines = obj.split("\n")
            if (1 == lines.length)
                return out(obj),
                undefined
            for (var minIndent = 1e4, i = 0; i < lines.length; i++) {
                for (var j = 0; j < lines[i].length && " " === lines[i].charAt(j) && j < minIndent; j++)
                    ;
                0 < j && j < minIndent && (minIndent = j)
            }
            if (1e4 === minIndent)
                return out(obj),
                undefined
            for (var i = 0; i < lines.length; i++)
                lines[i].length && " " === lines[i].charAt(0) && (lines[i] = indent + lines[i].substring(minIndent)),
                out(lines[i]),
                i < lines.length - 1 && out("\n")
        }
    },
    moreCompact: {
        __proto__: AbstractFormatter
    },
    compressed: {
        __proto__: AbstractFormatter,
        stringify: function(obj) {
            return Iuppiter.Base64.encode(Iuppiter.compress(JSONUtil.compact.stringify(obj), !0))
        }
    }
}
  , NOT_TRANSIENT = (JSONUtil.prettyModel = {
    __proto__: JSONUtil.pretty,
    outputModel_: function(out, obj, indent) {
        out(indent, 'model_: "', obj.model_.id, '"')
    },
    keys_: {},
    keyify: function(str) {
        return this.keys_.hasOwnProperty(str) || (this.keys_[str] = /^[a-zA-Z\$_][0-9a-zA-Z$_]*$/.test(str) ? str : '"' + str + '"'),
        this.keys_[str]
    }
},
JSONUtil.stringify = JSONUtil.pretty.stringify.bind(JSONUtil.pretty),
JSONUtil.stringifyObject = JSONUtil.pretty.stringifyObject.bind(JSONUtil.pretty),
JSONUtil.output = JSONUtil.pretty.output.bind(JSONUtil.pretty),
JSONUtil.where = JSONUtil.pretty.where.bind(JSONUtil.pretty),
function(prop) {
    return !prop.transient
}
)
  , XMLParser = {
    __proto__: grammar,
    START: seq1(1, sym("whitespace"), sym("tag"), sym("whitespace")),
    tag: seq("<", sym("tagName"), sym("whitespace"), repeat(sym("attribute"), sym("whitespace")), sym("whitespace"), ">", repeat(alt(sym("tag"), sym("text"))), "</", sym("tagName"), ">"),
    label: str(plus(notChars(" =/\t\r\n<>'\""))),
    tagName: sym("label"),
    text: str(plus(notChar("<"))),
    attribute: seq(sym("label"), "=", sym("value")),
    value: str(alt(seq1(1, '"', repeat(notChar('"')), '"'), seq1(1, "'", repeat(notChar("'")), "'"))),
    whitespace: repeat(alt(" ", "\t", "\r", "\n"))
}
  , XMLUtil = (XMLParser.addActions({
    tag: function(xs) {
        var obj
        {
            if (xs[1] == xs[8])
                return obj = {
                    tag: xs[1],
                    attrs: {},
                    children: xs[6]
                },
                xs[3].forEach(function(attr) {
                    obj.attrs[attr[0]] = attr[2]
                }),
                obj
            void 0
        }
    }
}),
{
    escape: function(str) {
        return str && str.toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    },
    unescape: function(str) {
        return str && str.toString().replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&")
    },
    escapeAttr: function(str) {
        return str && str.replace(/"/g, "&quot;")
    },
    unescapeAttr: function(str) {
        return str && str.replace(/&quot;/g, '"')
    },
    parse: function(str) {
        var str = XMLParser.parseString(str)
        return str && this.parseArray(str.children)
    },
    parseObject: function(tag) {
        var obj = {}
          , self = this
        if (tag.children.forEach(function(c) {
            var result, code, result
            "object" == typeof c && c.attrs && c.attrs.name && (result = c.attrs.type && "function" == c.attrs.type ? (code = XMLUtil.unescape(c.children.join("")),
            code.startsWith("function") ? eval("(" + code + ")") : new Function(code)) : self.parseArray(c.children),
            obj[self.unescapeAttr(c.attrs.name)] = result)
        }),
        !tag.attrs.model)
            return obj
        var model = this.unescapeAttr(tag.attrs.model)
        return GLOBAL[model] ? GLOBAL[model].create(obj) : obj
    },
    parseArray: function(a) {
        var self = this
          , ret = []
        return a.forEach(function(x) {
            "object" != typeof x || ("i" == x.tag ? ret.push(XMLUtil.unescape(x.children[0])) : ret.push(self.parseObject(x)))
        }),
        ret.length ? ret : XMLUtil.unescape(a.join(""))
    },
    compact: {
        stringify: function(obj) {
            var buf = []
            return this.output(buf.push.bind(buf), obj),
            "<foam>" + buf.join("") + "</foam>"
        },
        output: function(out, obj) {
            Array.isArray(obj) ? this.outputArray_(out, obj) : "string" == typeof obj ? out(XMLUtil.escape(obj)) : obj instanceof Function ? this.outputFunction_(out, obj) : obj instanceof Date ? out(obj.getTime()) : obj instanceof Object ? obj.model_ ? this.outputObject_(out, obj) : this.outputMap_(out, obj) : out(obj)
        },
        outputObject_: function(out, obj) {
            out('<object model="', XMLUtil.escapeAttr(obj.model_.name), '">')
            var properties = obj.model_.getRuntimeProperties(), key
            for (key in properties) {
                var prop = properties[key], val
                "parent" === prop.name || obj.instance_ && prop.name in obj.instance_ && (val = obj[prop.name],
                Array.isArray(val) && 0 == val.length || equals(val, prop.defaultValue) || (out('<property name="', XMLUtil.escapeAttr(prop.name), '" ' + ("function" == typeof val ? 'type="function"' : "") + ">"),
                this.output(out, val),
                out("</property>")))
            }
            out("</object>")
        },
        outputMap_: function(out, obj) {
            for (var key in out("<object>"),
            obj) {
                var val = obj[key]
                out('<property name="', XMLUtil.escapeAttr(key), '">'),
                this.output(out, val),
                out("</property>")
            }
            out("</object>")
        },
        outputArray_: function(out, a) {
            if (0 == a.length)
                return out
            for (var i = 0; i < a.length; i++,
            first = !1) {
                var obj = a[i]
                "string" == typeof obj || "number" == typeof obj ? out("<i>", XMLUtil.escape(obj), "</i>") : this.output(out, obj)
            }
        },
        outputFunction_: function(out, f) {
            out(XMLUtil.escape(f.toString()))
        }
    },
    pretty: {
        stringify: function(obj) {
            var buf = []
            return this.output(buf.push.bind(buf), obj),
            "<foam>\n" + buf.join("") + "</foam>\n"
        },
        output: function(out, obj, opt_indent) {
            var opt_indent = opt_indent || ""
            if (Array.isArray(obj))
                this.outputArray_(out, obj, opt_indent)
            else if ("string" == typeof obj)
                out(XMLUtil.escape(obj))
            else if (obj instanceof Function)
                this.outputFunction_(out, obj, opt_indent)
            else if (obj instanceof Date)
                out(obj.getTime())
            else if (obj instanceof Object)
                try {
                    obj.model_ && "string" != typeof obj.model_ ? this.outputObject_(out, obj, opt_indent) : this.outputMap_(out, obj, opt_indent)
                } catch (x) {
                    console.log("toXMLError: ", x)
                }
            else
                out(obj)
        },
        outputObject_: function(out, obj, opt_indent) {
            var opt_indent = opt_indent || "", nestedIndent = opt_indent + "  ", properties = (out(opt_indent, '<object model="', XMLUtil.escapeAttr(obj.model_.name), '">'),
            obj.model_.getRuntimeProperties()), key
            for (key in properties) {
                var prop = properties[key], val, type
                "parent" === prop.name || obj.instance_ && prop.name in obj.instance_ && (val = obj[prop.name],
                Array.isArray(val) && 0 == val.length || val == prop.defaultValue || (type = "function" == typeof obj[prop.name] ? ' type="function"' : "",
                out("\n", nestedIndent, '<property name="', XMLUtil.escapeAttr(prop.name), '"', type, ">"),
                this.output(out, val, nestedIndent),
                out("</property>")))
            }
            out("\n", opt_indent, "</object>"),
            out("\n")
        },
        outputMap_: function(out, obj, opt_indent) {
            var opt_indent = opt_indent || "", nestedIndent = opt_indent + "  ", key
            for (key in out(opt_indent, "<object>"),
            obj) {
                var val = obj[key]
                out("\n", nestedIndent, '<property name="', XMLUtil.escapeAttr(key), '">'),
                this.output(out, val, nestedIndent),
                out("</property>")
            }
            out("\n", opt_indent, "</object>\n")
        },
        outputArray_: function(out, a, opt_indent) {
            if (0 == a.length)
                return out
            for (var opt_indent = opt_indent || "", nestedIndent = opt_indent + "  ", i = 0; i < a.length; i++,
            first = !1) {
                var obj = a[i]
                out("\n"),
                "string" == typeof obj || "number" == typeof obj ? out(nestedIndent, "<i>", XMLUtil.escape(obj), "</i>") : this.output(out, obj, nestedIndent)
            }
            out("\n", opt_indent)
        },
        outputFunction_: function(out, f, opt_indent) {
            out(XMLUtil.escape(f.toString()) + "\n" + (opt_indent || ""))
        }
    }
})
function lookup(key) {
    if (key) {
        if ("string" != typeof key)
            return key
        var root = this, cache, cache = this.lookupCache_, ret = cache[key]
        if (void 0 === (ret = void 0 === ret && -1 == key.indexOf(".") ? GLOBAL[key] : ret)) {
            for (var path = key.split("."), i = 0; root && i < path.length; i++)
                root = root[path[i]]
            ret = root,
            cache[key] = ret || null
        }
        return ret
    }
    void 0
}
function set(key, value) {
    Object.defineProperty(this, key, {
        value: value,
        writable: "window" !== key,
        configurable: !0
    }),
    GLOBAL.SimpleReadOnlyValue && "$" !== key && "$$" !== key && (this[key + "$"] = SimpleReadOnlyValue.create({
        value: value
    }))
}
function setValue(key, value) {
    var X = this
    Object.defineProperty(this, key, {
        get: function() {
            return value.get()
        },
        configurable: !0
    }),
    "$" !== key && "$$" !== key && (this[key + "$"] = value)
}
function sub(opt_args, opt_name) {
    var sub = Object.create(this), asValue
    if (opt_args)
        for (var key in opt_args) {
            opt_args.hasOwnProperty(key) && ("$" !== key && "$$" != key && "$" == key.charAt(key.length - 1) ? sub.setValue(key.substring(0, key.length - 1), opt_args[key]) : sub.set(key, opt_args[key]))
        }
    return opt_name && (sub.NAME = opt_name),
    sub
}
function subWindow(w, opt_name, isBackground) {
    return w ? foam.ui.Window.create({
        window: w,
        name: opt_name,
        isBackground: isBackground
    }, this).Y : this.sub()
}
XMLUtil.stringify = XMLUtil.pretty.stringify.bind(XMLUtil.pretty),
XMLUtil.output = XMLUtil.pretty.output.bind(XMLUtil.pretty),
GLOBAL.lookupCache_ = {}
var X = {
    lookupCache_: GLOBAL.lookupCache_,
    sub: sub,
    subWindow: subWindow,
    set: set,
    lookup: lookup,
    setValue: setValue,
    GLOBAL: GLOBAL
}
  , foam = X.foam = {}
  , registerFactory = function(model, factory) {}
  , registerModelForModel = function(modelType, targetModel, model) {}
  , registerFactoryForModel = function(factory, targetModel, model) {}
  , JSONParser = SkipGrammar.create({
    __proto__: grammar,
    START: copyInput(sym("objAsString")),
    objAsString: copyInput(sym("obj")),
    obj: seq1(1, "{", repeat(sym("pair"), ","), "}"),
    pair: seq(sym("key"), ":", sym("value")),
    key: alt(sym("symbol"), sym("string")),
    symbol: noskip(str(seq(sym("char"), str(repeat(sym("alpha")))))),
    char: alt(range("a", "z"), range("A", "Z"), "_", "$"),
    alpha: alt(range("a", "z"), range("A", "Z"), "_", "$", range("0", "9")),
    value: simpleAlt(sym("null"), sym("undefined"), sym("function literal"), sym("expr"), sym("number"), sym("string"), sym("obj"), sym("bool"), sym("array")),
    null: literal("null"),
    undefined: literal("undefined"),
    expr: str(seq(sym("symbol"), optional(str(alt(seq(".", sym("expr")), seq("(", str(repeat(sym("value"), ",")), ")")))))),
    number: noskip(seq(optional("-"), repeat(range("0", "9"), null, 1), optional(seq(".", repeat(range("0", "9")))))),
    string: noskip(alt(sym("single quoted string"), sym("double quoted string"))),
    "double quoted string": seq1(1, '"', str(repeat(sym("double quoted char"))), '"'),
    "double quoted char": alt(sym("escape char"), literal('\\"', '"'), notChar('"')),
    "single quoted string": seq1(1, "'", str(repeat(sym("single quoted char"))), "'"),
    "single quoted char": alt(sym("escape char"), literal("\\'", "'"), notChar("'")),
    "escape char": alt(literal("\\\\", "\\"), literal("\\n", "\n")),
    bool: alt(literal("true", !0), literal("false", !1)),
    array: seq1(1, "[", repeat(sym("value"), ","), "]"),
    "function prototype": seq("function", optional(sym("symbol")), "(", repeat(sym("symbol"), ","), ")"),
    "function literal": seq(sym("function prototype"), "{", repeat(notChar("}")), "}")
}.addActions({
    obj: function(v) {
        for (var m = {}, i = 0; i < v.length; i++)
            m[v[i][0]] = v[i][2]
        return m
    },
    null: function() {
        return null
    },
    undefined: function() {
        0
    },
    number: function(v) {
        var str = ""
        return v[0] && (str += v[0]),
        str += v[1].join(""),
        v[2] && (str += v[2][0] + v[2][1].join("")),
        (v[2] ? parseFloat : parseInt)(str)
    }
}), repeat0(alt(" ", "\t", "\n", "\r")))
  , TemplateOutput = (MODEL({
    name: "TemplateParser",
    extends: "grammar",
    methods: {
        START: sym("markup"),
        markup: repeat0(alt(sym("comment"), sym("foamTag"), sym("create child"), sym("simple value"), sym("live value tag"), sym("raw values tag"), sym("values tag"), sym("code tag"), sym("ignored newline"), sym("newline"), sym("single quote"), sym("text"))),
        comment: seq1(1, "\x3c!--", repeat0(not("--\x3e", anyChar)), "--\x3e"),
        foamTag: sym("foamTag_"),
        foamTag_: function() {},
        "create child": seq("$$", repeat(notChars(" $\r\n<{,.")), optional(JSONParser.export("objAsString"))),
        "simple value": seq("%%", repeat(notChars(' ()-"\r\n><:;,')), optional("()")),
        "live value tag": seq("<%#", repeat(not("%>", anyChar)), "%>"),
        "raw values tag": alt(seq("<%=", repeat(not("%>", anyChar)), "%>"), seq("{{{", repeat(not("}}}", anyChar)), "}}}")),
        "values tag": seq("{{", repeat(not("}}", anyChar)), "}}"),
        "code tag": seq("<%", repeat(not("%>", anyChar)), "%>"),
        "ignored newline": alt(literal("\\\r\\\n"), literal("\\\n")),
        newline: alt(literal("\r\n"), literal("\n")),
        "single quote": literal("'"),
        text: anyChar
    }
}),
{
    create: function(obj) {
        console.assert(obj, "Owner required when creating TemplateOutput.")
        var buf = []
          , f = function templateOut() {
            for (var i = 0; i < arguments.length; i++) {
                var o = arguments[i], s
                "string" == typeof o ? buf.push(o) : o && "Element" === o.name_ ? (s = o.createOutputStream(),
                o.output(s),
                buf.push(s.toString()),
                obj.addChild({
                    initHTML: o.load.bind(o)
                })) : null != (o = o && o.toView_ ? o.toView_() : o) && (o.appendHTML ? o.appendHTML(this) : o.toHTML ? buf.push(o.toHTML()) : buf.push(o),
                o.initHTML && obj && obj.addChild && obj.addChild(o))
            }
        }
        return f.toString = function() {
            return 0 === buf.length ? "" : (buf = 1 < buf.length ? [buf.join("")] : buf)[0]
        }
        ,
        f
    }
})
function elementFromString(str) {
    return str.element || (str.element = HTMLParser.create().parseString(str).children[0])
}
var ConstantTemplate = function(str) {
    var TemplateOutputCreate = TemplateOutput.create.bind(TemplateOutput)
      , f = function(opt_out) {
        var opt_out = opt_out || TemplateOutputCreate(this)
        return opt_out(str),
        opt_out.toString()
    }
    return f.toString = function() {
        return 'ConstantTemplate("' + str.replace(/\n/g, "\\n").replace(/"/g, '\\"').replace(/\r/g, "") + '")'
    }
    ,
    f
}
  , TemplateCompiler = {
    __proto__: TemplateParser,
    out: [],
    simple: !0,
    push: function() {
        this.simple = !1,
        this.pushSimple.apply(this, arguments)
    },
    pushSimple: function() {
        this.out.push.apply(this.out, arguments)
    }
}.addActions({
    markup: function(v) {
        var wasSimple = this.simple
          , ret = wasSimple ? null : this.out.join("")
        return this.out = [],
        this.simple = !0,
        [wasSimple, ret]
    },
    "create child": function(v) {
        var name = v[1].join("")
        this.push("', self.createTemplateView('", name, "'", v[2] ? ", " + v[2] : "", "),\n'")
    },
    foamTag: function(e) {
        var fName = e.getAttribute("f")
        fName ? (this.push("', self.createTemplateView('", fName, "',{}).fromElement(FOAM("),
        this.push(JSONUtil.where(NOT_TRANSIENT).stringify(e)),
        this.push("))")) : (this.push("', (function() { var tagView = X.foam.ui.FoamTagView.create({element: FOAM("),
        this.push(JSONUtil.where(NOT_TRANSIENT).stringify(e)),
        this.push(")}, Y); self.addDataChild(tagView); return tagView; })() ")),
        this.push(",\n'")
    },
    "simple value": function(v) {
        this.push("',\n self.", v[1].join(""), v[2], ",\n'")
    },
    "raw values tag": function(v) {
        this.push("',\n", v[1].join(""), ",\n'")
    },
    "values tag": function(v) {
        this.push("',\nescapeHTML(", v[1].join(""), "),\n'")
    },
    "live value tag": function(v) {
        this.push("',\nself.dynamicTag('span', function() { return ", v[1].join(""), "; }.bind(this)),\n'")
    },
    "code tag": function(v) {
        this.push("');\n", v[1].join(""), ";out('")
    },
    "single quote": function() {
        this.pushSimple("\\'")
    },
    newline: function() {
        this.pushSimple("\\n")
    },
    text: function(v) {
        this.pushSimple(v)
    }
})
  , aeval = (MODEL({
    name: "TemplateUtil",
    constants: {
        HEADER: "var self = this, X = this.X, Y = this.Y;var out = opt_out ? opt_out : TOC(this);out('",
        FOOTERS: {
            html: "');return out.toString();",
            css: "');return X.foam.grammars.CSSDecl.create({model:this.model_}).parser.parseString(out.toString());"
        }
    },
    methods: {
        lazyCompile: function(t) {
            var delegate, f = function() {
                if (!delegate) {
                    if (!t.template)
                        throw "Must arequire() template model before use for " + this.name_ + "." + t.name
                    delegate = TemplateUtil.compile(Template.isInstance(t) ? t : Template.create(t), this.model_)
                }
                return delegate.apply(this, arguments)
            }
            return f.toString = function() {
                return (delegate || t).toString()
            }
            ,
            f
        },
        compile_: function(t, code, model) {
            for (var args = ["opt_out"], i = 0; i < t.args.length; i++)
                args.push(t.args[i].name)
            return eval("(function() { var escapeHTML = XMLUtil.escape, TOC = TemplateOutput.create.bind(TemplateOutput); return function(" + args.join(",") + "){" + code + "};})()" + (model && model.id ? "\n\n//# sourceURL=" + model.id.replace(/\./g, "/") + "." + t.name + "\n" : ""))
        },
        parseCSS: function(t, model) {
            var parser = this.CSSParser_ || (this.CSSParser_ = X.foam.grammars.CSSDecl.create())
            return parser.model = model,
            parser.parser.parseString(t).toString()
        },
        parseU2: function(template, t, model) {
            X.foam.u2.ElementParser.getPrototype()
            var parser = this.U2Parser_ || (this.U2Parser_ = X.foam.u2.ElementParser.parser__.create()), out
            return parser.modelName_ = cssClassize(model.id),
            parser.parseString(t.trim(), "initE" === template.name ? parser.initTemplate : parser.template).toString()
        },
        compile: function(t, model) {
            if ("CSS" !== t.name) {
                if (model.isSubModel(X.lookup("foam.u2.Element")))
                    return eval("(function() { return " + this.parseU2(t, t.template, model) + "; })()")
                var code
                if (t.template.startsWith("#U2"))
                    return code = "(function() { return " + this.parseU2(t, t.template.substring(3), model) + "; })()",
                    eval(code)
            }
            var parseResult = TemplateCompiler.parseString(t.template)
            if (parseResult[0])
                return ConstantTemplate("css" === t.language ? this.parseCSS(t.template, model) : t.template)
            var code = this.HEADER + parseResult[1] + this.FOOTERS[t.language]
            try {
                return this.compile_(t, code, model)
            } catch (err) {
                return console.log("Template Error: ", err),
                console.log(parseResult),
                function() {}
            }
        },
        stringifyTemplate: function(template) {
            return function() {
                var buf = []
                return this.output(buf.push.bind(buf), obj),
                buf.join("")
            }
        },
        expandTemplate: function(self, t, opt_X) {
            var X = opt_X || self.X, future, opt_X, fs, self
            return "function" == typeof t ? t = X.Template.create({
                name: t.name,
                args: t.toString().match(/\((.*?)\)/)[1].split(",").slice(1).map(function(a) {
                    return X.Arg.create({
                        name: a.trim()
                    })
                }),
                template: multiline(t)
            }) : "string" == typeof t ? t = docTemplate = X.Template.create({
                name: "body",
                template: t
            }) : t.template || t.code ? "function" == typeof t.template && (t.template = multiline(t.template)) : (t = X.Template.create(t),
            future = afuture(),
            opt_X = self.sourcePath,
            t.futureTemplate = future.get,
            opt_X = opt_X.substring(0, opt_X.lastIndexOf("/") + 1),
            opt_X += t.path || self.name + "_" + t.name + ".ft",
            "undefined" != typeof vm && vm.runInThisContext ? require("fs").readFile(opt_X, function(err, data) {
                t.template = data.toString(),
                future.set(Template.create(t))
            }) : ((self = new XMLHttpRequest).open("GET", opt_X),
            self.asend(function(data) {
                t.template = data,
                future.set(Template.create(t))
            }))),
            t.futureTemplate || (t.futureTemplate = aconstant(t)),
            t = t.template$ ? t : void 0 !== X.Template ? JSONUtil.mapToObj(X, t, X.Template) : t
        },
        expandModelTemplates: function(self) {
            for (var templates = self.templates, i = 0; i < templates.length; i++)
                templates[i] = TemplateUtil.expandTemplate(self, templates[i])
        }
    }
}),
function(src) {
    return aconstant(eval("(" + src + ")"))
}
)
  , aevalTemplate = function(t, model) {
    return aseq(t.futureTemplate, function(ret, t) {
        ret(TemplateUtil.lazyCompile(t))
    })
}
  , escapeHTML = XMLUtil.escape
  , TOC = TemplateOutput.create.bind(TemplateOutput)
  , $documents = []
  , $WID__ = (window && $documents.push(window.document),
0)
function $addWindow(w) {
    w.window.$WID = $WID__++,
    $documents.push(w.document)
}
function $removeWindow(w) {
    for (var i = $documents.length - 1; 0 <= i; i--)
        $documents[i].defaultView && $documents[i].defaultView !== w || $documents.splice(i, 1)
}
var $ = function(id) {
    console.log("Deprecated use of GLOBAL.$.")
    for (var i = 0; i < $documents.length; i++) {
        if (document.FOAM_OBJECTS && document.FOAM_OBJECTS[id])
            return document.FOAM_OBJECTS[id]
        var ret = $documents[i].getElementById(id)
        if (ret)
            return ret
    }
    0
}
  , $$ = function(cls) {
    console.log("Deprecated use of GLOBAL.$$.")
    for (var i = 0; i < $documents.length; i++) {
        var ret = $documents[i].getElementsByClassName(cls)
        if (0 < ret.length)
            return ret
    }
    return []
}
  , FOAM = function(map, opt_X, seq) {
    var obj
    return JSONUtil.mapToObj(opt_X || X, map, void 0, seq)
}
  , USED_MODELS = (FOAM.putFactory = function(ctx, name, factory) {
    ctx.__defineGetter__(name, function() {
        return console.log("Bouncing Factory: ", name),
        delete ctx[name],
        ctx[name] = factory()
    })
}
,
{})
  , UNUSED_MODELS = {}
  , NONMODEL_INSTANCES = {}
  , arequire = (FOAM.browse = function(model, opt_dao, opt_X) {
    var Y = opt_X || X.sub(void 0, "FOAM BROWSER"), opt_dao = ("string" == typeof model && (model = Y[model]),
    opt_dao || Y[model.name + "DAO"] || Y[model.plural]), model = (opt_dao || (Y[model.name + "DAO"] = [].dao),
    Y.foam.ui.DAOController.create({
        model: model,
        dao: opt_dao,
        useSearchView: !1
    })), opt_dao, opt_X
    Y.stack ? Y.stack.pushView(model) : (opt_dao = opt_X ? opt_X.window : window,
    Y.stack = Y.foam.ui.StackView.create(),
    opt_X = Y.foam.ui.layout.Window.create({
        window: opt_dao,
        data: Y.stack
    }, Y),
    document.body.insertAdjacentHTML("beforeend", opt_X.toHTML()),
    opt_X.initHTML(),
    Y.stack.setTopView(model))
}
,
function(modelName) {
    var THIS = this === GLOBAL ? X : this
      , model = THIS.lookup(modelName)
    if (model)
        return model.arequire ? model.arequire() : aconstant(model)
    if (!THIS.ModelDAO)
        return aconstant()
    if (THIS.arequire$ModelLoadsInProgress) {
        if (THIS.arequire$ModelLoadsInProgress[modelName])
            return THIS.arequire$ModelLoadsInProgress[modelName]
    } else
        THIS.set("arequire$ModelLoadsInProgress", {})
    var future = afuture()
    return THIS.arequire$ModelLoadsInProgress[modelName] = future.get,
    THIS.ModelDAO.find(modelName, {
        put: function(m) {
            m.X = THIS
            var next_ = function(m) {
                THIS.arequire$ModelLoadsInProgress[modelName] = !1,
                THIS.GLOBAL.X.registerModel(m),
                THIS.lookupCache_[m.id] || (THIS.lookupCache_[m.id] = m),
                future.set(m)
            }
            m.arequire ? m.arequire()(next_) : next_(m)
        },
        error: function() {
            var args = argsToArray(arguments)
            "DocumentationProperty" !== modelName && console.warn.apply(console, ["Could not load model: ", modelName].concat(args)),
            THIS.arequire$ModelLoadsInProgress[modelName] = !1,
            future.set(void 0)
        }
    }),
    future.get
}
)
  , FOAM_POWERED = '<a style="text-decoration:none;" href="https://github.com/foam-framework/foam/" target="_blank"><font size=+1 face="catull" style="text-shadow:rgba(64,64,64,0.3) 3px 3px 4px;"><font color="#3333FF">F</font><font color="#FF0000">O</font><font color="#FFCC00">A</font><font color="#33CC00">M</font><font color="#555555" > POWERED</font></font></a>'
function packagePath(X, path) {
    function packagePath_(Y, path, i) {
        return i === path.length ? Y : (Y[path[i]] || (Y[path[i]] = {},
        0 == i && (GLOBAL[path[i]] = Y[path[i]])),
        packagePath_(Y[path[i]], path, i + 1))
    }
    return path ? packagePath_(X, path.split("."), 0) : GLOBAL
}
function registerModel(model, opt_name, fastMode) {
    var root = model.package ? this : GLOBAL, name = model.name, pack = model.package, opt_name, name, pack, opt_name = (opt_name && (name = (opt_name = opt_name.split(".")).pop(),
    pack = opt_name.join(".")),
    (pack ? pack + "." : "") + name), root
    root !== GLOBAL && root !== X || (root = packagePath(root, pack),
    fastMode ? root[name] = model : Object.defineProperty(root, name, {
        value: model,
        configurable: !0
    }),
    root === GLOBAL && (root = X,
    fastMode ? root[name] = model : Object.defineProperty(root, name, {
        value: model,
        configurable: !0
    }))),
    Object.hasOwnProperty.call(this, "lookupCache_") || (this.lookupCache_ = Object.create(this.lookupCache_ || Object.prototype)),
    this.lookupCache_[opt_name] = model,
    this.onRegisterModel(model)
}
var CLASS = function(m) {
    var EAGER = {
        Method: !0,
        BooleanProperty: !0,
        Action: !0,
        FunctionProperty: !0,
        Constant: !0,
        Message: !0,
        ArrayProperty: !0,
        StringArrayProperty: !0,
        Template: !0,
        Arg: !0,
        Relationship: !0,
        ViewFactoryProperty: !0,
        FactoryProperty: !0,
        "foam.ui.Window": !0,
        StringProperty: !0,
        "foam.html.Element": !0,
        Expr: !0,
        AbstractDAO: !0
    }
    function registerModelLatch(path, m) {
        var id = m.package ? m.package + "." + m.name : m.name, work, model
        if (EAGER[id])
            return USED_MODELS[id] = !0,
            model = JSONUtil.mapToObj(X, m, Model, work = []),
            0 < work.length && (model.extra__ = aseq.apply(null, work)),
            X.registerModel(model, void 0, !0),
            void 0
        GLOBAL.lookupCache_[id] = void 0
        var triggered = !(UNUSED_MODELS[id] = !0)
        Object.defineProperty(m.package ? path : GLOBAL, m.name, {
            get: function triggerModelLatch() {
                if (triggered)
                    return null
                triggered = !0,
                USED_MODELS[id] = !0,
                UNUSED_MODELS[id] = void 0
                var work = []
                  , model = JSONUtil.mapToObj(X, m, Model, work)
                return 0 < work.length && (model.extra__ = aseq.apply(null, work)),
                X.registerModel(model),
                model
            },
            configurable: !0
        })
    }
    document && document.currentScript && (m.sourcePath = document.currentScript.src),
    registerModelLatch(packagePath(X, m.package), m)
}
function INTERFACE(imodel) {
    var imodel = JSONUtil.mapToObj(X, imodel, Interface)
      , imodel = (packagePath(X, imodel.package)[imodel.name] = imodel).package ? imodel.package + "." + imodel.name : imodel.name
    NONMODEL_INSTANCES[imodel] = !0
}
function __DATA(obj) {
    var pkg = obj.package || obj.id.substring(0, obj.id.lastIndexOf("."))
      , name = obj.name || obj.id.substring(obj.id.lastIndexOf(".") + 1)
      , pkg = packagePath(X, pkg)
      , triggered = !1
    Object.defineProperty(pkg, name, {
        get: function triggerDataLatch() {
            if (triggered)
                return null
            triggered = !0
            var object = JSONUtil.mapToObj(X, obj)
            return X.registerModel(object),
            object
        },
        configurable: !0
    })
}
function onRegisterModel(m) {
    m.package || (GLOBAL[m.name] = m)
}
MODEL = CLASS,
X.$ = $,
X.$$ = $$,
X.registerModel = registerModel,
X.arequire = arequire,
X.onRegisterModel = onRegisterModel
var FObject = {
    __proto__: PropertyChangeSupport,
    name_: "FObject",
    get Y() {
        return Object.prototype.hasOwnProperty.call(this, "Y_") ? this.Y_ : this.Y_ = DEBUG ? this.X.sub({}, (this.X.NAME || "") + "_" + this.name_) : this.X.sub()
    },
    replaceModel_: function(feature, dataModel, X) {
        replacementName = (dataModel.package ? dataModel.package + "." : "") + (dataModel.name || dataModel) + feature.name
        var dataModel = X.lookup(replacementName)
        if (dataModel)
            return dataModel
        0
    },
    create_: function() {
        return Object.create(this)
    },
    create: function(args, opt_X) {
        var dataModel = args ? args.model || (args.data ? args.data.model_ : void 0) : void 0
        if (dataModel && (opt_X || X).Model.isInstance(dataModel)) {
            var dataModel = this.replaceModel_(this.model_, dataModel, opt_X || X)
            if (dataModel)
                return dataModel.create(args, opt_X)
        }
        var o = this.create_(this)
        for (o.instance_ = {}; !o.instance_; )
            o.instance_ = {}
        if (o.X = opt_X || X,
        this.model_.instance_.imports_ && this.model_.instance_.imports_.length) {
            Object.prototype.hasOwnProperty.call(this, "imports__") || (this.imports__ = this.model_.instance_.imports_.map(function(e) {
                var e = e.split(" as ")
                return [e[0], e[1] || e[0]]
            }))
            for (var i = 0; i < this.imports__.length; i++) {
                var im = this.imports__[i]
                args && args.hasOwnProperty(im[1]) || void 0 === o.X[im[0]] || (o[im[1]] = o.X[im[0]])
            }
        }
        if (o.model_)
            for (var agents = this.initAgents(), i = 0; i < agents.length; i++)
                agents[i][1](o, o.X, args)
        return o.init(args),
        o
    },
    init: nop,
    xbind: function(map) {
        var newModel = {
            __proto__: this,
            create: function(args, X) {
                var createArgs = {}, key
                for (key in args = args ? args.instance_ || args : {})
                    args.hasOwnProperty(key) && (createArgs[key] = args[key])
                for (key in map)
                    createArgs.hasOwnProperty(key) || (createArgs[key] = map[key])
                return this.__proto__.create(createArgs, X)
            },
            xbind: function(m2) {
                for (var key in map)
                    m2.hasOwnProperty(key) || (m2[key] = map[key])
                return this.__proto__.xbind(m2)
            }
        }
        return this.required__ && (newModel.required__ = aseq(this.required__, aconstant(newModel))),
        newModel
    },
    X: X,
    addInitAgent: function(priority, desc, agent) {
        agent.toString = function() {
            return desc
        }
        ,
        this.initAgents_.push([priority, agent])
    },
    initAgents: function() {
        if (this.model_) {
            if (!Object.hasOwnProperty.call(this, "initAgents_")) {
                var agents = this.initAgents_ = []
                  , self = this
                  , fastInit = (Object_forEach(this.model_.instance_.exports_, function(e) {
                    var e = e.split("as "), key, alias, e, prop
                    0 == e.length || (key = e[0].trim(),
                    alias = e[1] || e[0],
                    key ? ((e = "$" !== key && "$$" != key && "$" == key.charAt(key.length - 1)) && console.warn("Deprecated use of value$ export. Just remove the $. ", self.model_.id, this.name, key, alias),
                    e && (key = key.slice(0, key.length - 1)),
                    (prop = self.model_.getProperty(key)) ? e ? self.addInitAgent(1, "export property value " + key, function(o, X) {
                        o.Y.set(alias, o[prop.name$_])
                    }) : self.addInitAgent(1, "export property " + key, function(o, X) {
                        o.Y.setValue(alias, o[prop.name$_])
                    }) : self.addInitAgent(0, "export other " + key, function(o, X) {
                        var out = "function" == typeof o[key] ? o[key].bind(o) : o[key]
                        o.Y.set(alias, out)
                    })) : self.addInitAgent(0, "export this", function(o, X) {
                        o.Y.set(alias, o)
                    }))
                }),
                {
                    Property: !0,
                    Method: !0
                }[this.name_])
                if (fastInit) {
                    for (var keys = {}, ps = this.model_.getRuntimeProperties(), i = 0; i < ps.length; i++) {
                        var prop = ps[i]
                        keys[prop.name] = keys[prop.name$_] = !0
                    }
                    this.addInitAgent(0, "fast copy args", function fastCopyArgs(o, X, m) {
                        if (m)
                            if (m.instance_)
                                for (var key in m = m.instance_)
                                    o[key] = m[key]
                            else
                                for (var key in m)
                                    keys[key] && (o[key] = m[key])
                    })
                }
                for (var ps = this.model_.getRuntimeProperties(), i = 0, prop; i < ps.length; i++) {
                    (prop = ps[i]).initPropertyAgents ? prop.initPropertyAgents(self, fastInit) : !function(name) {
                        self.addInitAgent(0, "set proto-property " + name, function setProtoProperty(o, X, m) {
                            m && m.hasOwnProperty(name) && (o[name] = m[name])
                        })
                    }(prop.name)
                }
                self.addInitAgent(0, "Add create() to Model", function(o, X) {
                    Model.isInstance(o) && "Model" != o.name && (o.create = BootstrapModel.create)
                })
                for (var i = 0; i < agents.length; i++)
                    agents[i][2] = i
                agents.sort(CompoundComparator(function(o1, o2) {
                    return o1[0] - o2[0]
                }, function(o1, o2) {
                    return o1[2] - o2[2]
                }))
            }
            return this.initAgents_
        }
    },
    fromElement: function(e) {
        var RESERVED_ATTRS = {
            id: !0,
            model: !0,
            view: !0,
            showactions: !0,
            oninit: !0
        }, elements
        if (!(elements = this.elementMap_)) {
            for (var elements = {}, properties = this.model_.getRuntimeProperties(), i = 0, p; i < properties.length; i++) {
                RESERVED_ATTRS[(p = properties[i]).name] || (elements[p.name] = p,
                elements[p.name.toUpperCase()] = p),
                elements["p:" + p.name] = p,
                elements["P:" + p.name.toUpperCase()] = p
            }
            this.elementMap_ = elements
        }
        for (var i = 0; i < e.attributes.length; i++) {
            var attr = e.attributes[i], p = elements[attr.name] || elements[attr.name.toUpperCase()], val = attr.value, val, $val
            p ? val.startsWith("#") ? (val = val.substring(1),
            this.X.$(val) ? this[attr.name] = this.X.$(val) : this[p.name] = p.fromString(val)) : this[p.name] = p.fromString(val) : RESERVED_ATTRS[attr.name] || console.warn('Unknown attribute name: "' + attr.name + '"')
        }
        for (var i = 0; i < e.children.length; i++) {
            var c = e.children[i], p;
            (p = elements[c.nodeName]) ? p.fromElement.call(this, c, p) : console.warn('Unknown element name: "' + c.nodeName + '"')
        }
        return this
    },
    createFOAMGetter: function(name, getter) {
        var stack = Events.onGet.stack
        return function FOAMGetter() {
            var value = getter.call(this, name)
              , f = stack[0]
            return f && f(this, name, value),
            value
        }
    },
    createFOAMSetter: function(name, setter) {
        var stack = Events.onSet.stack
        return function FOAMSetter(newValue) {
            var f = stack[0]
            f && !f(this, name, newValue) || setter.call(this, newValue, name)
        }
    },
    toString: function() {
        return this.model_.name + "Prototype"
    },
    hasOwnProperty: function(name) {
        return void 0 !== this.instance_[name]
    },
    writeActions: function(other, out) {
        for (var properties = this.model_.getRuntimeProperties(), i = 0, property; property = properties[i]; i++)
            if (property.actionFactory)
                for (var actions = property.actionFactory(this, property.f(this), property.f(other)), j = 0; j < actions.length; j++)
                    out(actions[j])
    },
    validateObject: function() {
        for (var ret = null, ps = this.model_.getRuntimeProperties(), i = 0; i < ps.length; i++) {
            var p = ps[i], e
            p.validate && ((e = p.validate.call(this)) && (ret = ret || []).push([p, e]))
        }
        return ret
    },
    isValid: function() {
        return !this.validateObject()
    },
    equals: function(other) {
        return 0 == this.compareTo(other)
    },
    compareTo: function(other) {
        if (other === this)
            return 0
        if (this.model_ !== other.model_)
            return this.model_.id.compareTo(other.model_ && other.model_.id) || 1
        for (var ps = this.model_.getRuntimeProperties(), i = 0; i < ps.length; i++) {
            var r = ps[i].compare(this, other)
            if (r)
                return r
        }
        return 0
    },
    diff: function(other) {
        for (var diff = {}, properties = this.model_.getRuntimeProperties(), i = 0, property, subdiff; property = properties[i]; i++) {
            Array.isArray(property.f(this)) ? 0 === (subdiff = property.f(this).diff(property.f(other))).added.length && 0 === subdiff.removed.length || (diff[property.name] = subdiff) : 0 !== property.compare(this, other) && (diff[property.name] = property.f(other))
        }
        return diff
    },
    clearProperty: function(name) {
        delete this.instance_[name]
    },
    defineProperty: function(prop) {
        var name = prop.name, obj = (prop.name$_ = name + "$",
        this[constantize(prop.name)] = prop,
        DEBUG ? this : __ROOT__), obj, setter, f, f, defaultValue, setter, propertyTopic, setter
        obj.__lookupGetter__(prop.name$_) || Object.defineProperty(obj, prop.name$_, {
            get: function getValue() {
                return this.propertyValue(name)
            },
            set: function setValue(value) {
                Events.link(value, this.propertyValue(name))
            },
            configurable: !0
        }),
        obj = prop.getter ? this.createFOAMGetter(name, prop.getter) : (getter = prop.lazyFactory || prop.factory ? (f = prop.lazyFactory || prop.factory,
        function factory() {
            var val
            return void 0 === this.instance_[name] && (this.instance_[name] = null,
            val = f.call(this, prop),
            this[name] = val = void 0 === val ? null : val),
            this.instance_[name]
        }
        ) : prop.defaultValueFn ? (f = prop.defaultValueFn,
        function defaultValueFn() {
            return void 0 !== this.instance_[name] ? this.instance_[name] : f.call(this, prop)
        }
        ) : (defaultValue = prop.defaultValue,
        function getInstanceVar() {
            return void 0 !== this.instance_[name] ? this.instance_[name] : defaultValue
        }
        ),
        this.createFOAMGetter(name, getter)),
        setter = prop.setter ? this.createFOAMSetter(name, prop.setter) : (setter = function setInstanceValue(oldValue, newValue) {
            this.instance_[name] = newValue
        }
        ,
        "int" !== prop.type && "float" !== prop.type || (setter = function(setter) {
            return function numberSetter(oldValue, newValue) {
                setter.call(this, oldValue, "number" != typeof newValue ? Number(newValue) : newValue)
            }
        }(setter)),
        prop.onDAOUpdate && (setter = ("string" == typeof prop.onDAOUpdate ? function(setter, onDAOUpdate, listenerName) {
            return function onDAOUpdateSetter(oldValue, newValue) {
                setter.call(this, oldValue, newValue)
                var listener = this[listenerName] || (this[listenerName] = this[onDAOUpdate].bind(this))
                oldValue && oldValue.unlisten(listener),
                newValue && (newValue.listen(listener),
                listener())
            }
        }
        : function(setter, onDAOUpdate, listenerName) {
            return function onDAOUpdateSetter2(oldValue, newValue) {
                setter.call(this, oldValue, newValue)
                var listener = this[listenerName] || (this[listenerName] = onDAOUpdate.bind(this))
                oldValue && oldValue.unlisten(listener),
                newValue && (newValue.listen(listener),
                listener())
            }
        }
        )(setter, prop.onDAOUpdate, prop.name + "_onDAOUpdate")),
        prop.postSet && (setter = function(setter, postSet) {
            return function postSetSetter(oldValue, newValue) {
                setter.call(this, oldValue, newValue),
                postSet.call(this, oldValue, newValue, prop)
            }
        }(setter, prop.postSet)),
        propertyTopic = PropertyChangeSupport.propertyTopic(name),
        setter = function(setter) {
            return function propertyChangeSetter(oldValue, newValue) {
                setter.call(this, oldValue, newValue),
                this.propertyChange_(propertyTopic, oldValue, newValue)
            }
        }(setter),
        prop.preSet && (setter = function(setter, preSet) {
            return function preSetSetter(oldValue, newValue) {
                setter.call(this, oldValue, preSet.call(this, oldValue, newValue, prop))
            }
        }(setter, prop.preSet)),
        prop.adapt && (setter = function(setter, adapt) {
            return function adaptSetter(oldValue, newValue) {
                setter.call(this, oldValue, adapt.call(this, oldValue, newValue, prop))
            }
        }(setter, prop.adapt)),
        setter = function(setter, defaultValue) {
            return function setInstanceVar(newValue) {
                setter.call(this, void 0 === this.instance_[name] ? defaultValue : this.instance_[name], newValue)
            }
        }(setter = prop.regex ? function(setter, name, regex) {
            return function regexValidator(oldValue, newValue) {
                if (!newValue || "string" != typeof newValue || !newValue.match(regex))
                    throw 'Invalid Property value for "' + name + '", "' + newValue + '" violates regex: ' + regex
                setter.call(this, oldValue, newValue)
            }
        }(setter, prop.name, prop.regex) : setter, prop.defaultValue),
        this.createFOAMSetter(name, setter)),
        Object.defineProperty(this, name, {
            get: obj,
            set: setter,
            configurable: !0
        }),
        prop.install && prop.install.call(this, prop)
    },
    addMethod: function(name, method) {
        this.__proto__[name] ? override(this, name, method) : this[name] = method
    },
    hashCode: function() {
        for (var hash = 17, properties = this.model_.getRuntimeProperties(), i = 0; i < properties.length; i++) {
            var prop = this[properties[i].name], code, hash = (hash << 5) - hash + (prop ? (prop.hashCode ? prop : prop.toString()).hashCode() : 0)
            hash &= hash
        }
        return hash
    },
    toProtobuf: function() {
        var out = ProtoWriter.create()
        return this.outProtobuf(out),
        out.value
    },
    outProtobuf: function(out) {
        for (var proprties = this.model_getRuntimeProperties(), i = 0; i < properties.length; i++) {
            var prop = properties[i]
            Number.isFinite(prop.prototag) && prop.outProtobuf(this, out)
        }
    },
    clone: function() {
        var m = {}, key
        for (key in this.instance_) {
            var value = this[key], prop
            void 0 !== value && ((prop = this.model_.getProperty(key)) && prop.cloneProperty ? prop.cloneProperty.call(prop, value, m) : prop.model_ || (m[key] = value))
        }
        return this.model_.create(m, this.X)
    },
    deepClone: function() {
        var m = {}, key
        for (key in this.instance_) {
            var value = this[key], prop
            void 0 !== value && ((prop = this.model_.getProperty(key)) && prop.deepCloneProperty && prop.deepCloneProperty.call(prop, value, m))
        }
        return this.model_.create(m, this.X)
    },
    copyFrom: function(src) {
        if (src && this.model_)
            for (var ps = this.model_.getRuntimeProperties(), i = 0; i < ps.length; i++) {
                var prop = ps[i]
                src.hasOwnProperty(prop.name) && (this[prop.name] = src[prop.name]),
                src.hasOwnProperty(prop.name$_) && (this[prop.name$_] = src[prop.name$_])
            }
        return this
    },
    output: function(out) {
        return JSONUtil.output(out, this)
    },
    toJSON: function() {
        return JSONUtil.stringify(this)
    },
    toXML: function() {
        return XMLUtil.stringify(this)
    },
    write: function(opt_X, opt_view) {
        (opt_X || this.X).writeView(this.defaultView(opt_view))
    },
    defaultView: function(opt_view) {
        return (opt_view || X.foam.ui.DetailView).create({
            model: this.model_,
            data: this,
            showActions: !0
        })
    },
    decorate: function(name, func, that) {
        var delegate = this[name]
        return this[name] = function() {
            return func.call(this, that, delegate.bind(this), arguments)
        }
        ,
        this
    },
    addDecorator: function(decorator) {
        decorator.decorateObject && decorator.decorateObject(this)
        for (var i = 0; i < decorator.model_.methods.length; i++) {
            var method = decorator.model_.methods[i]
            "decorateObject" !== method.name && this.decorate(method.name, method.code, decorator)
        }
        return this
    }
}
function defineLocalProperty(cls, name, factory) {
    Object.defineProperty(cls, name, {
        get: function() {
            console.assert(this !== cls, "Called property getter from prototype: " + name)
            var value = factory.call(this)
            return Object.defineProperty(this, name, {
                configurable: !0,
                value: value
            }),
            value
        },
        configurable: !0
    })
}
this.Constant = null,
this.Method = null,
this.Action = null,
this.Relationship = null
var CCC = 0
function override(cls, methodName, method) {
    var super_ = cls[methodName]
    if (-1 == method.toString().indexOf("SUPER"))
        return cls[methodName] = method,
        undefined
    var SUPER = function() {
        return super_.apply(this, arguments)
    }
      , slowF = function(OLD_SUPER, args) {
        try {
            return method.apply(this, args)
        } finally {
            this.SUPER = OLD_SUPER
        }
    }
      , f = function() {
        var OLD_SUPER = this.SUPER
        if (this.SUPER = SUPER,
        OLD_SUPER)
            return slowF.call(this, OLD_SUPER, arguments)
        var OLD_SUPER = method.apply(this, arguments)
        return this.SUPER = null,
        OLD_SUPER
    }
    f.toString = function() {
        return method.toString()
    }
    ,
    f.super_ = super_,
    cls[methodName] = f
}
for (var BootstrapModel = {
    __proto__: PropertyChangeSupport,
    name_: "BootstrapModel <startup only, error if you see this>",
    addTraitToModel_: function(traitModel, parentModel) {
        var parentName, traitName, name = (parentModel && parentModel.id ? parentModel.id.replace(/\./g, "__") : "") + "_ExtendedWith_" + (traitModel.id ? traitModel.id.replace(/\./g, "__") : ""), models, parentModel = (lookup(name) || (models = traitModel.models,
        (traitModel = traitModel.clone()).package = "",
        traitModel.name = name,
        traitModel.extends = parentModel && parentModel.id,
        traitModel.models = models,
        traitModel.X.registerModel(traitModel)),
        traitModel.X.lookup(name))
        return console.assert(parentModel, "Error adding Trait to Model, unknown name: ", name),
        parentModel
    },
    createMethod_: function(X, name, fn) {
        var name = Method.create({
            name: name,
            code: fn
        }), str, fn
        return FEATURE_ENABLED(["debug"]) && Arg && ((fn = fn.toString().match(/^function[ _$\w]*\(([ ,\w]+)/)) && (name.args = fn[1].split(",").map(function(name) {
            return Arg.create({
                name: name.trim()
            })
        }))),
        name
    },
    buildProtoImports_: function(props) {
        Object_forEach(this.instance_.imports_, function(i) {
            var i = i.split(" as "), key = i[0], i = i[1] || i[0], i
            i.length && "$" == i.charAt(i.length - 1) && (i = i.slice(0, i.length - 1)),
            this.getProperty(i) || (i = ImportedProperty.create({
                name: i
            }),
            props.push(i))
        }
        .bind(this))
    },
    buildProtoProperties_: function(cls, extendsModel, props) {
        for (var i = 0; i < props.length; i++) {
            var p = props[i], superProp, p0, p
            extendsModel && ((superProp = extendsModel.getProperty(p.name)) && (p0 = p,
            p = superProp.clone().copyFrom(p),
            p0.adapt && superProp.adapt && (p.adapt = function(a1, a2) {
                return function(oldValue, newValue, prop) {
                    return a2.call(this, oldValue, a1.call(this, oldValue, newValue, prop), prop)
                }
            }(p0.adapt, superProp.adapt)),
            p0.preSet && superProp.preSet && (p.preSet = function(a1, a2) {
                return function(oldValue, newValue, prop) {
                    return a2.call(this, oldValue, a1.call(this, oldValue, newValue, prop), prop)
                }
            }(p0.preSet, superProp.preSet)),
            p0.postSet && superProp.postSet && (p.postSet = function(a1, a2) {
                return function(oldValue, newValue, prop) {
                    a2.call(this, oldValue, newValue, prop),
                    a1.call(this, oldValue, newValue, prop)
                }
            }(p0.postSet, superProp.postSet)),
            props[i] = p,
            this[constantize(p.name)] = p)),
            cls.defineProperty(p)
        }
        this.propertyMap_ = null
    },
    buildProtoMethods_: function(cls) {
        if (Array.isArray(this.methods))
            for (var i = 0, m; i < this.methods.length; i++) {
                "function" == typeof (m = this.methods[i]) ? cls.addMethod(m.name, m) : cls.addMethod(m.name, m.code)
            }
        else
            for (key in this.methods) {
                var m = this.methods[key]
                Method && Method.isInstance(m) ? cls.addMethod(m.name, m.generateFunction()) : cls.addMethod(key, m)
            }
    },
    buildPrototype: function() {
        if (_DOC_ && BootstrapModel.saveDefinition(this),
        this.extends && !this.X.lookup(this.extends))
            throw new Error("Unknown Model in extends: " + this.extends)
        var extendsModel = this.extends && this.X.lookup(this.extends)
        if (this.traits)
            for (var i = 0; i < this.traits.length; i++) {
                var trait = this.traits[i]
                  , traitModel = this.X.lookup(trait)
                console.assert(traitModel, "Unknown trait: " + trait),
                traitModel ? extendsModel = this.addTraitToModel_(traitModel, extendsModel) : console.warn("Missing trait: ", trait, ", in Model: ", this.name)
            }
        var proto = extendsModel ? extendsModel.getPrototype() : FObject, cls = Object.create(proto), proto = (cls.model_ = this,
        cls.name_ = this.name,
        this.models && Object_forEach(this.models, function(m) {
            var model
            this[m.name] && (model = this[m.name],
            defineLocalProperty(cls, m.name, function() {
                var Y = this.Y
                return {
                    __proto__: model,
                    create: function(args, opt_X) {
                        return model.create(args, opt_X || Y)
                    }
                }
            }))
        }
        .bind(this)),
        Object_forEach(this.requires, function(i) {
            var i = i.split(" as ")
              , m = i[0]
              , path = m.split(".")
              , i = i[1] || path[path.length - 1]
            defineLocalProperty(cls, i, function() {
                var Y = this.Y
                  , model = this.X.lookup(m)
                return console.assert(model, "Unknown Model: " + m + " in " + this.name_),
                {
                    __proto__: model,
                    create: function(args, X) {
                        return model.create(args, X || Y)
                    }
                }
            })
        }),
        this.instance_.properties_ = this.properties ? this.properties.clone() : []), key
        if (this.instance_.imports_ = this.imports,
        extendsModel && (this.instance_.imports_ = this.instance_.imports_.concat(extendsModel.instance_.imports_)),
        this.buildProtoImports_(proto),
        this.buildProtoProperties_(cls, extendsModel, proto),
        extendsModel) {
            for (var i = 0; i < extendsModel.instance_.properties_.length; i++) {
                var p = extendsModel.instance_.properties_[i], name
                this[name = constantize(p.name)] || (this[name] = p)
            }
            for (i = 0; i < extendsModel.relationships.length; i++) {
                var r = extendsModel.relationships[i], name
                this[name = constantize(r.name)] || (this[name] = r)
            }
        }
        if (this.instance_.exports_ = this.exports ? this.exports.clone() : [],
        extendsModel && (this.instance_.exports_ = this.instance_.exports_.concat(extendsModel.instance_.exports_)),
        this.templates && Object_forEach(this.templates, function(t) {
            cls.addMethod(t.name, t.code || TemplateUtil.lazyCompile(t))
        }),
        this.instance_.actions_ = this.actions ? this.actions.clone() : [],
        this.actions)
            for (var i = 0; i < this.actions.length; i++)
                !function(a) {
                    var superAction
                    extendsModel && ((superAction = extendsModel.getAction(a.name)) && (a = superAction.clone().copyFrom(a))),
                    this.instance_.actions_[i] = a,
                    Object.prototype.hasOwnProperty.call(cls, constantize(a.name)) || (cls[constantize(a.name)] = a),
                    this[constantize(a.name)] = a,
                    cls.addMethod(a.name, function(opt_x) {
                        a.maybeCall(opt_x || this.X, this)
                    })
                }
                .bind(this)(this.actions[i])
        if (this.constants)
            for (var i = 0; i < this.constants.length; i++) {
                var c = this.constants[i]
                cls[c.name] = this[c.name] = c.value
            }
        this.messages && 0 < this.messages.length && GLOBAL.Message && Object_forEach(this.messages, function(m, key) {
            Message.isInstance(m) || (m = this.messages[key] = Message.create(m))
            var key = {}
              , mdlProps = {}
              , constName = constantize(m.name)
            key[m.name] = {
                get: function() {
                    return m.value
                }
            },
            key[constName] = {
                value: m
            },
            mdlProps[constName] = {
                value: m
            },
            Object.defineProperties(cls, key),
            Object.defineProperties(this, mdlProps)
        }
        .bind(this)),
        this.buildProtoMethods_(cls)
        var self = this, createListenerTrampoline = (this.instance_.relationships_ = this.relationships,
        extendsModel && (this.instance_.relationships_ = this.instance_.relationships_.concat(extendsModel.instance_.relationships_)),
        this.relationships && this.relationships.forEach(function(r) {
            var name = constantize(r.name)
            self[name] || (self[name] = r),
            defineLazyProperty(cls, r.name, function() {
                var m = this.X.lookup(r.relatedModel)
                  , name = daoize(m.name)
                  , dao = this.X[name]
                return dao || console.error("Relationship " + r.name + " needs " + name + " in the context, and it was not found."),
                dao = RelationshipDAO.create({
                    delegate: dao,
                    relatedProperty: m.getProperty(r.relatedProperty),
                    relativeID: this.id
                }),
                {
                    get: function() {
                        return dao
                    },
                    configurable: !0
                }
            })
        }),
        function(cls, name, fn, isMerged, isFramed, whenIdle) {
            console.assert(fn, "createListenerTrampoline: fn not defined"),
            fn.name = name,
            Object.defineProperty(cls, name, {
                get: function() {
                    var l = fn.bind(this)
                    return whenIdle && (l = Movement.whenIdle(l)),
                    isFramed ? l = EventService.framed(l, this.X) : isMerged && (l = EventService.merged(l, !0 === isMerged ? void 0 : isMerged, this.X)),
                    Object.defineProperty(this, name, {
                        configurable: !0,
                        value: l
                    }),
                    l
                },
                configurable: !0
            })
        }
        ), primaryKey
        if (Array.isArray(this.listeners))
            for (var i = 0; i < this.listeners.length; i++) {
                var l = this.listeners[i]
                createListenerTrampoline(cls, l.name, l.code, l.isMerged, l.isFramed, l.whenIdle)
            }
        else
            this.listeners && Object_forEach(this.listeners, function(l, key) {
                createListenerTrampoline(cls, key, l)
            })
        if (this.topics && Object_forEach(this.topics, function(t) {}),
        extendsModel) {
            this.getProperty("")
            for (var ips = [], ps = extendsModel.instance_.properties_, i = 0; i < ps.length; i++) {
                var p = ps[i]
                this.getProperty(p.name) || (ips.push(p),
                this.propertyMap_[p.name] = p)
            }
            ips.length && (this.instance_.properties_ = ips.concat(this.instance_.properties_))
            for (var ias = [], as = extendsModel.instance_.actions_, i = 0; i < as.length; i++) {
                var a = as[i]
                this.getAction && this.getAction(a.name) || ias.push(a)
            }
            ias.length && (this.instance_.actions_ = ias.concat(this.instance_.actions_))
        }
        return 0 < this.instance_.properties_.length && !cls.__lookupGetter__("id") && (1 == (primaryKey = this.ids).length ? (cls.__defineGetter__("id", function() {
            return this[primaryKey[0]]
        }),
        cls.__defineSetter__("id", function(val) {
            this[primaryKey[0]] = val
        })) : 1 < primaryKey.length && (cls.__defineGetter__("id", function() {
            return primaryKey.map(function(key) {
                return this[key]
            }
            .bind(this))
        }),
        cls.__defineSetter__("id", function(val) {
            primaryKey.map(function(key, i) {
                this[key] = val[i]
            }
            .bind(this))
        }))),
        cls
    },
    getAllRequires: function() {
        var requires = {}
        function setModel(o) {
            o && o.model_ && (requires[o.model_.id] = !0)
        }
        return this.requires.forEach(function(r) {
            requires[r.split(" ")[0]] = !0
        }),
        this.traits.forEach(function(t) {
            requires[t] = !0
        }),
        this.extends && (requires[this.extends] = !0),
        this.properties.forEach(setModel),
        this.actions.forEach(setModel),
        this.templates.forEach(setModel),
        this.listeners.forEach(setModel),
        Object.keys(requires)
    },
    getPrototype: function() {
        return this.instance_.prototype_ || (this.instance_.prototype_ = this.buildPrototype(),
        this.onLoad && this.onLoad()),
        this.instance_.prototype_
    },
    saveDefinition: function(self) {
        self.definition_ = {},
        Array.isArray(self.methods) && (self.definition_.methods = [].concat(self.methods)),
        Array.isArray(self.templates) && (self.definition_.templates = [].concat(self.templates)),
        Array.isArray(self.relationships) && (self.definition_.relationships = [].concat(self.relationships)),
        Array.isArray(self.properties) && (self.definition_.properties = [].concat(self.properties)),
        Array.isArray(self.actions) && (self.definition_.actions = [].concat(self.actions)),
        Array.isArray(self.listeners) && (self.definition_.listeners = [].concat(self.listeners)),
        Array.isArray(self.models) && (self.definition_.models = [].concat(self.models)),
        Array.isArray(self.tests) && (self.definition_.tests = [].concat(self.tests)),
        Array.isArray(self.issues) && (self.definition_.issues = [].concat(self.issues)),
        self.definition_.__proto__ = FObject
    },
    create: function(args, opt_X) {
        return "Model" === this.name ? FObject.create.call(this.getPrototype(), args, opt_X) : this.getPrototype().create(args, opt_X)
    },
    isSubModel: function(model) {
        if (!model || !model.getPrototype)
            return !1
        var subModels_ = this.subModels_ || (this.subModels_ = {})
        return subModels_.hasOwnProperty(model.id) || (subModels_[model.id] = model.getPrototype() === this.getPrototype() || this.isSubModel(model.getPrototype().__proto__.model_)),
        subModels_[model.id]
    },
    getRuntimeProperties: function() {
        return this.instance_.properties_ || this.getPrototype(),
        this.instance_.properties_
    },
    getRuntimeActions: function() {
        return this.instance_.actions_ || this.getPrototype(),
        this.instance_.actions_
    },
    getRuntimeRelationships: function() {
        return this.instance_.relationships_ || this.getPrototype(),
        this.instance_.relationships_
    },
    getProperty: function(name) {
        if (!this.propertyMap_) {
            for (var m = this.propertyMap_ = {}, properties = this.getRuntimeProperties(), i = 0; i < properties.length; i++) {
                var prop = properties[i]
                m[prop.name] = prop
            }
            this.propertyMap_ = m
        }
        return this.propertyMap_[name]
    },
    getAction: function(name) {
        for (var i = 0; i < this.instance_.actions_.length; i++)
            if (this.instance_.actions_[i].name === name)
                return this.instance_.actions_[i]
    },
    hashCode: function() {
        var string = "", properties = this.getRuntimeProperties(), key
        for (key in properties)
            string += properties[key].toString()
        return string.hashCode()
    },
    isInstance: function(obj) {
        return obj && obj.model_ && this.isSubModel(obj.model_)
    },
    toString: function() {
        return "BootstrapModel(" + this.name + ")"
    },
    arequire: function() {
        if (this.required__)
            return this.required__
        var future = afuture()
          , go = (this.required__ = future.get,
        function() {
            var args = [], model = this, i
            if (this.extends && args.push(this.X.arequire(this.extends)),
            this.models)
                for (i = 0; i < this.models.length; i++)
                    args.push(this.models[i].arequire())
            if (this.traits)
                for (i = 0; i < this.traits.length; i++)
                    args.push(this.X.arequire(this.traits[i]))
            if (this.templates)
                for (i = 0; i < this.templates.length; i++) {
                    var t = this.templates[i]
                    args.push(aif(!t.code, aseq(aevalTemplate(this.templates[i], this), function(t) {
                        return function(ret, m) {
                            t.code = m,
                            ret()
                        }
                    }(t))))
                }
            if (args.length && (args = [aseq.apply(null, args)]),
            this.requires)
                for (var i = 0; i < this.requires.length; i++) {
                    var r, m = this.requires[i].split(" as ")
                    m[0] == this.id ? console.warn("Model requires itself: " + this.id) : args.push(this.X.arequire(m[0]))
                }
            args.push(function(ret) {
                this.X.i18nModel ? this.X.i18nModel(ret, this, this.X) : ret()
            }
            .bind(this)),
            aseq.apply(null, args)(function() {
                this.finished__ = !0,
                future.set(this)
            }
            .bind(this))
        }
        .bind(this))
        return this.extra__ ? this.extra__(go) : go(),
        this.required__
    },
    getMyFeature: function(featureName) {
        function add(a) {
            if (a)
                for (var i = 0; i < a.length; i++) {
                    var f = a[i]
                    map[f.name.toUpperCase()] = f
                }
        }
        var map
        return Object.prototype.hasOwnProperty.call(this, "featureMap_") || (map = this.featureMap_ = {},
        add(this.getRuntimeProperties()),
        add(this.instance_.actions_),
        add(this.methods),
        add(this.listeners),
        add(this.templates),
        add(this.models),
        add(this.tests),
        add(this.relationships),
        add(this.issues)),
        this.featureMap_[featureName.toUpperCase()]
    },
    getRawFeature: function(featureName) {
        function add(a) {
            if (a)
                for (var i = 0; i < a.length; i++) {
                    var f = a[i]
                    map[f.name.toUpperCase()] = f
                }
        }
        var map
        return Object.prototype.hasOwnProperty.call(this, "rawFeatureMap_") || (map = this.featureMap_ = {},
        add(this.properties),
        add(this.actions),
        add(this.methods),
        add(this.listeners),
        add(this.templates),
        add(this.models),
        add(this.tests),
        add(this.relationships),
        add(this.issues)),
        this.featureMap_[featureName.toUpperCase()]
    },
    getAllMyRawFeatures: function() {
        var featureList = []
          , arrayOrEmpty = function(arr) {
            return arr && Array.isArray(arr) ? arr : []
        }
        return [arrayOrEmpty(this.properties), arrayOrEmpty(this.actions), arrayOrEmpty(this.methods), arrayOrEmpty(this.listeners), arrayOrEmpty(this.templates), arrayOrEmpty(this.models), arrayOrEmpty(this.tests), arrayOrEmpty(this.relationships), arrayOrEmpty(this.issues)].map(function(list) {
            featureList = featureList.concat(list)
        }),
        featureList
    },
    getFeature: function(featureName) {
        var feature = this.getMyFeature(featureName)
        if (feature || !this.extends)
            return feature
        var feature = this.X.lookup(this.extends)
        return feature ? feature.getFeature(featureName) : void 0
    },
    getAllRawFeatures: function() {
        var featureList = this.getAllMyRawFeatures(), ext
        return this.extends && ((ext = this.X.lookup(this.extends)) && ext.getAllFeatures().map(function(subFeat) {
            var subName = subFeat.name.toUpperCase()
            featureList.mapFind(function(myFeat) {
                return myFeat && myFeat.name && myFeat.name.toUpperCase() === subName
            }) || featureList.push(subFeat)
        })),
        featureList
    },
    atest: function() {
        for (var seq = [], allPassed = !0, i = 0; i < this.tests.length; i++)
            seq.push(function(test, model) {
                return function(ret) {
                    test.atest(model)(function(passed) {
                        passed || (allPassed = !1),
                        ret()
                    })
                }
            }(this.tests[i], this))
        return seq.push(function(ret) {
            ret(allPassed)
        }),
        aseq.apply(null, seq)
    }
}, BinaryProtoGrammar, DocumentationBootstrap = {
    name: "documentation",
    type: "Documentation",
    labels: ["javascript"],
    help: "Documentation associated with this entity.",
    documentation: "The developer documentation for this $$DOC{ref:'.'}. Use a $$DOC{ref:'DocModelView'} to view documentation.",
    setter: function(nu) {
        _DOC_ && (this.instance_.documentation = nu)
    },
    getter: function() {
        if (!_DOC_)
            return ""
        var doc = this.instance_.documentation
        return !doc || "undefined" == typeof Documentation || !Documentation || doc.model_ && doc.model_.getPrototype && Documentation.isInstance(doc) || (doc.body ? this.instance_.documentation = Documentation.create(doc) : this.instance_.documentation = Documentation.create({
            body: doc
        })),
        this.instance_.documentation
    }
}, Model = {
    __proto__: BootstrapModel,
    instance_: {},
    name: "Model",
    plural: "Models",
    help: "Describes the attributes and properties of an entity.",
    documentation: {
        body: function() {}
    },
    tableProperties: ["package", "name", "label", "plural"],
    properties: [{
        name: "id",
        hidden: !0,
        transient: !0
    }, {
        name: "sourcePath",
        help: "Source location of this Model.",
        defaultValue: "",
        mode: "read-only",
        transient: !0
    }, {
        name: "abstract",
        defaultValue: !1,
        help: "If the java class is abstract.",
        documentation: function() {}
    }, {
        name: "package",
        help: "Package that this Model belongs to.",
        defaultValue: "",
        javaType: "String",
        postSet: function(_, p) {
            return this.id = p ? p + "." + this.name : this.name
        },
        documentation: function() {}
    }, {
        name: "name",
        type: "String",
        javaType: "String",
        postSet: function(_, n) {
            return this.id = this.package ? this.package + "." + n : n
        },
        required: !0,
        displayWidth: 30,
        displayHeight: 1,
        defaultValue: "",
        help: "The coding identifier for the entity.",
        documentation: function() {}
    }, {
        name: "label",
        type: "String",
        displayWidth: 70,
        displayHeight: 1,
        defaultValueFn: function() {
            return labelize(this.name)
        },
        help: "The display label for the entity.",
        documentation: function() {}
    }, {
        name: "javaClassName",
        type: "String",
        displayWidth: 70,
        displayHeight: 1,
        defaultValueFn: function() {
            return (this.abstract ? "Abstract" : "") + this.name
        },
        help: "The Java classname of this Model.",
        documentation: function() {}
    }, {
        name: "javaClassImports",
        type: "Array[String]",
        labels: ["java"],
        defaultValueFn: function() {
            return []
        },
        help: "Imports to add at the top of the generated java class."
    }, {
        name: "swiftClassName",
        type: "String",
        labels: ["swift"],
        defaultValueFn: function() {
            return (this.abstract ? "Abstract" : "") + this.name
        },
        help: "The Swift classname of this model."
    }, {
        name: "extends",
        label: "Extends",
        type: "String",
        displayWidth: 70,
        displayHeight: 1,
        defaultValue: "",
        help: "The parent model of this model.",
        documentation: function() {}
    }, {
        name: "extendsModel",
        hidden: !0,
        compareProperty: constantFn(0),
        getter: function() {
            return null
        },
        setter: function(e) {
            console.warn("Deprecated use of 'extendsModel'. Use 'extends' instead."),
            e && (this.extends = e)
        }
    }, {
        name: "traits",
        type: "Array[String]",
        view: "foam.ui.StringArrayView",
        defaultValueFn: function() {
            return []
        },
        help: "Traits to mix-into this Model.",
        documentation: function() {}
    }, {
        name: "plural",
        type: "String",
        displayWidth: 70,
        displayHeight: 1,
        defaultValueFn: function() {
            return this.name + "s"
        },
        help: "The plural form of this model's name.",
        documentation: function() {}
    }, {
        name: "version",
        defaultValue: 1,
        help: "Version number of model.",
        documentation: function() {}
    }, {
        name: "ids",
        label: "Key Properties",
        type: "Array[String]",
        view: "foam.ui.StringArrayView",
        defaultValueFn: function() {
            var id
            if (this.getProperty("id"))
                return ["id"]
            var props = this.getRuntimeProperties()
            return props.length ? [props[0].name] : []
        },
        help: "Properties which make up unique id.",
        documentation: function() {}
    }, {
        name: "requires",
        type: "Array[String]",
        view: "foam.ui.StringArrayView",
        defaultValueFn: function() {
            return []
        },
        help: "Model imports.",
        documentation: function() {}
    }, {
        name: "imports",
        type: "Array[String]",
        view: "foam.ui.StringArrayView",
        defaultValueFn: function() {
            return []
        },
        help: "Context imports.",
        documentation: function() {}
    }, {
        name: "exports",
        type: "Array[String]",
        view: "foam.ui.StringArrayView",
        defaultValueFn: function() {
            return []
        },
        help: "Context exports.",
        documentation: function() {}
    }, {
        name: "implements",
        type: "Array[String]",
        view: "foam.ui.StringArrayView",
        defaultValueFn: function() {
            return []
        },
        help: "Interfaces implemented by this Model.",
        documentation: function() {}
    }, {
        name: "swiftImplements",
        type: "Array[String]",
        labels: ["compiletime", "swift"],
        defaultValueFn: function() {
            return this.implements
        },
        help: "Swift interfaces implemented by this Model."
    }, {
        name: "javaImplements",
        type: "Array[String]",
        labels: ["compiletime", "java"],
        defaultValueFn: function() {
            return this.implements
        },
        help: "Java interfaces implemented by this Model."
    }, {
        name: "swiftClassImports",
        type: "Array[String]",
        labels: ["compiletime", "swift"],
        defaultValueFn: function() {
            return []
        },
        help: "Imports to add at the top of the generated swift class."
    }, {
        name: "swiftCode",
        type: "String",
        labels: ["compiletime", "swift"],
        defaultValue: "",
        help: "Swift code to drop in when generating the swift class for this model."
    }, {
        name: "javaCode",
        type: "String",
        labels: ["compiletime", "java"],
        defaultValue: "",
        help: "Java code to drop in when generating the java class for this model."
    }, {
        name: "onLoad",
        type: "Function",
        labels: ["javascript"],
        required: !1,
        displayWidth: 70,
        displayHeight: 3,
        view: "foam.ui.FunctionView",
        defaultValue: "",
        help: "A function which is called when a Model's prototype is built.",
        documentation: function() {}
    }, {
        name: "tableProperties",
        type: "Array[String]",
        view: "foam.ui.StringArrayView",
        displayWidth: 70,
        lazyFactory: function() {
            return (this.properties || this.properties_).filter(function(o) {
                return !o.hidden
            }).map(function(o) {
                return o.name
            })
        },
        help: "Properties to be displayed in table view. Defaults to all properties.",
        documentation: function() {}
    }, {
        name: "searchProperties",
        type: "Array[String]",
        view: "foam.ui.StringArrayView",
        displayWidth: 70,
        defaultValueFn: function() {
            return this.tableProperties
        },
        help: "Properties display in a search view. Defaults to table properties.",
        documentation: function() {}
    }, {
        name: "properties",
        type: "Array[Property]",
        subType: "Property",
        javaType: "java.util.List<foam.core.Property>",
        view: "foam.ui.ArrayView",
        factory: function() {
            return []
        },
        help: "Properties associated with the entity.",
        preSet: function(oldValue, newValue) {
            for (var i = 0; i < newValue.length; i++) {
                var p = newValue[i]
                "string" == typeof p ? newValue[i] = p = {
                    name: p
                } : Array.isArray(p) && (newValue[i] = p = {
                    name: p[0],
                    defaultValue: p[1]
                }),
                p.labels && !FEATURE_ENABLED(p.labels) ? (newValue.splice(i, 1),
                i--) : (p.model_ ? "string" == typeof p.model_ && (p = newValue[i] = JSONUtil.mapToObj(this.X, p)) : p = p.type && this.X.lookup(p.type + "Property") ? (p.model_ = p.type + "Property",
                p.type = void 0,
                newValue[i] = JSONUtil.mapToObj(this.X, p)) : newValue[i] = Property.create(p),
                this[constantize(p.name)] = newValue[i])
            }
            return this.propertyMap_ = null,
            newValue
        },
        postSet: function(_, newValue) {
            for (var i = 0; i < newValue.length; i++)
                newValue[i].modelId = this.id
        },
        documentation: function() {}
    }, {
        name: "actions",
        type: "Array[Action]",
        subType: "Action",
        view: "foam.ui.ArrayView",
        factory: function() {
            return []
        },
        propertyToJSON: function(visitor, output, o) {
            o[this.name].length && visitor.visitArray(o[this.name])
        },
        help: "Actions associated with the entity.",
        adapt: function(_, a) {
            if (!Action)
                return a
            for (var i = 0; i < a.length; i++) {
                var p = a[i]
                "function" == typeof p ? a[i] = Action.create({
                    name: p.name,
                    code: p
                }) : p.model_ ? "string" == typeof p.model_ && (a[i] = FOAM(p)) : a[i] = Action.create(p),
                p.name && !this[constantize(p.name)] && (this[constantize(p.name)] = a[i])
            }
            return a
        },
        documentation: function() {}
    }, {
        name: "constants",
        type: "Array[Constant]",
        subType: "Constant",
        view: "foam.ui.ArrayView",
        factory: function() {
            return []
        },
        propertyToJSON: function(visitor, output, o) {
            o[this.name].length && visitor.visitArray(o[this.name])
        },
        help: "Constants associated with the entity.",
        preSet: function(_, newValue) {
            if (!Constant)
                return newValue
            if (Array.isArray(newValue))
                return JSONUtil.arrayToObjArray(this.X, newValue, Constant)
            var constants = [], key
            for (key in newValue) {
                var oldValue = newValue[key]
                  , oldValue = Constant.create({
                    name: key,
                    value: oldValue
                })
                constants.push(oldValue)
            }
            return constants
        }
    }, {
        name: "messages",
        type: "Array[Message]",
        subType: "Constant",
        view: "foam.ui.ArrayView",
        factory: function() {
            return []
        },
        propertyToJSON: function(visitor, output, o) {
            o[this.name].length && visitor.visitArray(o[this.name])
        },
        help: "Messages associated with the entity.",
        preSet: function(_, ms) {
            if (!GLOBAL.Message)
                return ms
            if (Array.isArray(ms))
                return JSONUtil.arrayToObjArray(this.X, ms, Message)
            var messages = [], key
            for (key in ms) {
                var oldValue = ms[key]
                  , oldValue = Message.create({
                    name: key,
                    value: oldValue
                })
                messages.push(oldValue)
            }
            return messages
        }
    }, {
        name: "methods",
        subType: "Method",
        factory: function() {
            return []
        },
        help: "Methods associated with the entity.",
        adapt: function(_, a) {
            if (!Method)
                return a
            if (Array.isArray(a)) {
                for (var i = 0; i < a.length; i++)
                    a[i] = "function" == typeof a[i] ? this.createMethod_(this.X, a[i].name, a[i]) : JSONUtil.mapToObj(this.X, a[i], Method, seq)
                return a
            }
            var methods = [], key
            for (key in a)
                methods.push(this.createMethod_(this.X, key, a[key]))
            return methods
        },
        documentation: function() {}
    }, {
        name: "listeners",
        type: "Array[Method]",
        subType: "Method",
        view: "foam.ui.ArrayView",
        factory: function() {
            return []
        },
        propertyToJSON: function(visitor, output, o) {
            o[this.name].length && visitor.visitArray(o[this.name])
        },
        adapt: function(_, a) {
            if (!Method)
                return a
            if (Array.isArray(a)) {
                for (var i = 0; i < a.length; i++)
                    a[i] = "function" == typeof a[i] ? this.createMethod_(this.X, a[i].name, a[i]) : JSONUtil.mapToObj(this.X, a[i], Method, seq)
                return a
            }
            console.error("Expecting array of listeners.")
        },
        help: "Event listeners associated with the entity.",
        documentation: function() {}
    }, {
        name: "templates",
        type: "Array[Template]",
        subType: "Template",
        view: "foam.ui.ArrayView",
        factory: function() {
            return []
        },
        propertyToJSON: function(visitor, output, o) {
            o[this.name].length && visitor.visitArray(o[this.name])
        },
        preSet: function(_, templates) {
            for (var i = 0; i < templates.length; i++)
                templates[i].labels && !FEATURE_ENABLED(templates[i].labels) && (templates.splice(i, 1),
                i--)
            return templates
        },
        postSet: function(_, templates) {
            TemplateUtil.expandModelTemplates(this)
        },
        help: "Templates associated with this entity.",
        documentation: function() {}
    }, {
        name: "models",
        type: "Array[Model]",
        subType: "Model",
        view: "foam.ui.ArrayView",
        factory: function() {
            return []
        },
        propertyToJSON: function(visitor, output, o) {
            o[this.name].length && visitor.visitArray(o[this.name])
        },
        adapt: function(_, newValue) {
            if (!Model)
                return newValue
            if (!Array.isArray(newValue))
                return newValue
            var id = this.id
            return JSONUtil.arrayToObjArray(this.X, newValue, Model).map(function(m) {
                return m.package = id,
                m
            })
        },
        postSet: function(_, models) {
            for (var i = 0; i < models.length; i++)
                this[models[i].name] = models[i]
        },
        help: "Sub-models embedded within this model.",
        documentation: function() {}
    }, {
        name: "tests",
        label: "Unit Tests",
        type: "Array[Unit Test]",
        subType: "UnitTest",
        view: "foam.ui.ArrayView",
        factory: function() {
            return []
        },
        propertyToJSON: function(visitor, output, o) {
            o[this.name].length && visitor.visitArray(o[this.name])
        },
        adapt: function(_, a) {
            if (!a)
                return a
            for (var i = 0; i < a.length; i++)
                "function" == typeof a[i] && (a[i] = UnitTest.create({
                    name: a[i].name,
                    code: a[i]
                }))
            return a
        },
        help: "Unit tests associated with this model.",
        documentation: function() {}
    }, {
        name: "relationships",
        subType: "Relationship",
        view: "foam.ui.ArrayView",
        factory: function() {
            return []
        },
        propertyToJSON: function(visitor, output, o) {
            o[this.name].length && visitor.visitArray(o[this.name])
        },
        help: "Relationships of this model to other models.",
        preSet: function(_, newValue) {
            if (!Relationship)
                return newValue
            for (var i = 0; i < newValue.length; i++) {
                var p = newValue[i]
                p.model_ ? "string" == typeof p.model_ && (p = newValue[i] = FOAM(p)) : p = newValue[i] = Relationship.create(p),
                this[constantize(p.name)] = newValue[i]
            }
            return newValue
        },
        documentation: function() {}
    }, {
        name: "issues",
        type: "Array[Issue]",
        subType: "Issue",
        labels: ["debug"],
        view: "foam.ui.ArrayView",
        factory: function() {
            return []
        },
        propertyToJSON: function(visitor, output, o) {
            o[this.name].length && visitor.visitArray(o[this.name])
        },
        help: "Issues associated with this model.",
        documentation: function() {}
    }, {
        name: "help",
        label: "Help Text",
        type: "String",
        displayWidth: 70,
        displayHeight: 6,
        view: "foam.ui.TextAreaView",
        defaultValue: "",
        help: "Help text associated with the entity.",
        documentation: function() {}
    }, {
        name: "i18nComplete_",
        defaultValue: !1,
        hidden: !0,
        transient: !0
    }, {
        name: "translationHint",
        label: "Description for Translation",
        type: "String",
        defaultValueFn: function() {
            return this.name
        }
    }, DocumentationBootstrap, {
        name: "notes",
        type: "String",
        displayWidth: 70,
        displayHeight: 6,
        view: "foam.ui.TextAreaView",
        defaultValue: "",
        help: "Internal documentation associated with this entity.",
        documentation: function() {}
    }],
    templates: [],
    toString: function() {
        return "Model"
    }
}, ps = (GLOBAL.Property = {
    __proto__: BootstrapModel,
    instance_: {},
    name: "Property",
    swiftImplements: ["ExprProtocol"],
    javaImplements: ["foam.core2.ExprInterface"],
    plural: "Properties",
    help: "Describes a properties of a modelled entity.",
    ids: ["name"],
    tableProperties: ["name", "label", "type", "required", "defaultValue"],
    documentation: function() {},
    properties: [{
        name: "name",
        swiftType: "String",
        javaType: "String",
        required: !0,
        displayWidth: 30,
        displayHeight: 1,
        defaultValue: "",
        mode: "read-only",
        help: "The coding identifier for the property.",
        documentation: function() {}
    }, {
        name: "labels",
        type: "Array",
        subType: "String",
        labels: ["debug", "javascript"]
    }, {
        name: "label",
        swiftType: "String",
        javaType: "String",
        required: !1,
        displayWidth: 70,
        displayHeight: 1,
        defaultValueFn: function() {
            return labelize(this.name)
        },
        help: "The display label for the property.",
        documentation: function() {}
    }, {
        name: "translationHint",
        type: "String",
        required: !1,
        documentation: "Used to describe the property for translators."
    }, {
        name: "speechLabel",
        type: "String",
        swiftType: "String",
        required: !1,
        displayWidth: 70,
        displayHeight: 1,
        defaultValueFn: function() {
            return this.label
        },
        help: "The speech label for the property.",
        documentation: function() {}
    }, {
        name: "speechLabelTranslationHint",
        type: "String",
        required: !1,
        documentation: "Used to describe the speech label for translators.",
        defaultValueFn: function() {
            return this.translationHint
        }
    }, {
        name: "tableLabel",
        type: "String",
        displayWidth: 70,
        displayHeight: 1,
        defaultValueFn: function() {
            return this.label
        },
        help: "The table display label for the entity.",
        documentation: function() {}
    }, {
        name: "type",
        type: "String",
        required: !0,
        view: {
            factory_: "foam.ui.ChoiceView",
            choices: ["Array", "Boolean", "Color", "Date", "DateTime", "Email", "Enum", "Float", "Function", "Image", "Int", "Object", "Password", "String", "String[]", "URL"]
        },
        defaultValue: "String",
        help: "The type of the property.",
        documentation: function() {}
    }, {
        name: "swiftDefaultValue",
        labels: ["swift", "compiletime"],
        adapt: function(_, n) {
            return multiline(n)
        }
    }, {
        name: "swiftDefaultValueFn",
        labels: ["swift", "compiletime"],
        adapt: function(_, n) {
            return multiline(n)
        }
    }, {
        name: "javaDefaultValue",
        labels: ["java", "compiletime"],
        adapt: function(_, n) {
            return multiline(n)
        }
    }, {
        name: "javaDefaultValueFn",
        labels: ["java", "compiletime"],
        adapt: function(_, n) {
            return multiline(n)
        }
    }, {
        name: "protobufType",
        type: "String",
        required: !1,
        help: "The protobuf type that represents the type of this property.",
        defaultValueFn: function() {
            return this.type.toLowerCase()
        },
        documentation: function() {}
    }, {
        name: "javaType",
        type: "String",
        labels: ["compiletime", "java"],
        required: !1,
        defaultValue: "Object",
        help: "The java type that represents the type of this property.",
        documentation: function() {}
    }, {
        name: "javascriptType",
        type: "String",
        labels: ["compiletime", "javascript"],
        required: !1,
        defaultValueFn: function() {
            return this.type
        },
        help: "The javascript type that represents the type of this property.",
        documentation: function() {}
    }, {
        name: "swiftType",
        type: "String",
        required: !1,
        labels: ["compiletime", "swift"],
        defaultValue: "AnyObject?",
        help: "The Swift type that represents this type of property."
    }, {
        name: "swiftNSCoderEncode",
        type: "String",
        required: !1,
        labels: ["compiletime", "swift"],
        defaultValue: "// <%= this.name %> is unsupported for coding."
    }, {
        name: "swiftNSCoderDecode",
        type: "String",
        required: !1,
        labels: ["compiletime", "swift"],
        defaultValue: "// <%= this.name %> is unsupported for coding."
    }, {
        name: "shortName",
        type: "String",
        required: !0,
        displayWidth: 10,
        displayHeight: 1,
        defaultValue: "",
        help: "A short alternate name to be used for compact encoding.",
        documentation: "A short alternate $$DOC{ref:'.name'} to be used for compact encoding."
    }, {
        name: "singular",
        type: "String",
        required: !1,
        displayWidth: 70
    }, {
        name: "aliases",
        labels: ["javascript"],
        view: "foam.ui.StringArrayView",
        factory: function() {
            return []
        },
        help: "Alternate names for this property.",
        documentation: function() {}
    }, {
        name: "mode",
        type: "String",
        defaultValue: "read-write",
        view: {
            factory_: "foam.ui.ChoiceView",
            choices: ["read-only", "read-write", "final"]
        },
        documentation: function() {}
    }, {
        name: "subType",
        label: "Sub-Type",
        type: "String",
        displayWidth: 30,
        help: "The type of the property.",
        documentation: function() {}
    }, {
        name: "subKey",
        labels: ["javascript"],
        displayWidth: 20,
        defaultValue: "ID",
        help: "The foreign key that this property references.",
        documentation: function() {}
    }, {
        name: "units",
        type: "String",
        required: !0,
        displayWidth: 70,
        displayHeight: 1,
        defaultValue: "",
        help: "The units of the property.",
        documentation: function() {}
    }, {
        name: "required",
        type: "Boolean",
        view: "foam.ui.BooleanView",
        defaultValue: !0,
        help: "Indicates if the property is a required field.",
        documentation: function() {}
    }, {
        name: "visibility",
        choices: ["rw", "final", "ro", "hidden"],
        postSet: function(_, v) {
            "hidden" === v && (this.hidden = !0)
        }
    }, {
        name: "hidden",
        type: "Boolean",
        view: "foam.ui.BooleanView",
        defaultValue: !1,
        postSet: function(old, hidden) {
            !old && hidden && (this.visibility = "hidden")
        },
        help: "Indicates if the property is hidden.",
        documentation: function() {}
    }, {
        name: "transient",
        type: "Boolean",
        swiftType: "Bool",
        javaType: "boolean",
        view: "foam.ui.BooleanView",
        defaultValue: !1,
        help: "Indicates if the property is transient.",
        documentation: function() {}
    }, {
        name: "modelId",
        type: "String",
        view: "foam.ui.TextFieldView",
        help: "Id of the model that this is a property of",
        transient: !0
    }, {
        name: "displayWidth",
        type: "Int",
        displayWidth: 8,
        displayHeight: 1,
        defaultValue: 30,
        help: "The display width of the property.",
        documentation: function() {}
    }, {
        name: "displayHeight",
        type: "Int",
        displayWidth: 8,
        displayHeight: 1,
        defaultValue: 1,
        help: "The display height of the property.",
        documentation: function() {}
    }, {
        name: "view",
        labels: ["javascript"],
        defaultValue: "foam.ui.TextFieldView",
        help: "View component for the property.",
        documentation: function() {}
    }, {
        name: "toPropertyE",
        labels: ["javascript"],
        defaultValue: function toPropertyE(X) {
            var X = (1 < this.displayHeight ? X.lookup("foam.u2.MultiLineTextField") : X.lookup("foam.u2.TextField")).create(null, X)
            return X.attrs({
                size: this.displayWidth
            }),
            X
        },
        adapt: function(_, nu) {
            var f
            return "string" == typeof nu ? ((f = function(X) {
                return X.lookup(nu).create(null, X)
            }
            ).toString = function() {
                return "'" + nu + "'"
            }
            ,
            f) : nu
        }
    }, {
        name: "detailView",
        labels: ["javascript"],
        defaultValueFn: function() {
            return this.view
        },
        help: "View component for the property when rendering within a DetailView.",
        documentation: function() {}
    }, {
        name: "citationView",
        labels: ["javascript"],
        defaultValueFn: function() {
            return this.view
        },
        help: "View component for the property when rendering within a CitationView.",
        documentation: function() {}
    }, {
        name: "swiftView",
        type: "String",
        labels: ["compiletime", "swift"],
        help: "The default view name for this property in swift."
    }, {
        name: "detailViewPreRow",
        labels: ["javascript"],
        defaultValue: function() {
            return ""
        },
        help: "Inject HTML before row in DetailView.",
        documentation: function() {}
    }, {
        name: "detailViewPostRow",
        labels: ["javascript"],
        defaultValue: function() {
            return ""
        },
        help: "Inject HTML before row in DetailView.",
        documentation: function() {}
    }, {
        name: "defaultValue",
        type: "String",
        required: !1,
        labels: ["javascript"],
        displayWidth: 70,
        displayHeight: 1,
        defaultValue: "",
        postSet: function(old, nu) {
            nu && this.defaultValueFn && (this.defaultValueFn = void 0)
        },
        help: "The property's default value.",
        documentation: function() {}
    }, {
        name: "defaultValueFn",
        label: "Default Value Function",
        type: "Function",
        labels: ["javascript"],
        required: !1,
        displayWidth: 70,
        displayHeight: 3,
        rows: 3,
        view: "foam.ui.FunctionView",
        defaultValue: "",
        postSet: function(old, nu) {
            nu && this.defaultValue && (this.defaultValue = void 0)
        },
        help: "The property's default value function.",
        documentation: function() {}
    }, {
        name: "dynamicValue",
        label: "Value's Dynamic Function",
        type: "Function",
        labels: ["javascript"],
        required: !1,
        displayWidth: 70,
        displayHeight: 3,
        rows: 3,
        view: "foam.ui.FunctionView",
        defaultValue: "",
        help: "A dynamic function which computes the property's value.",
        documentation: function() {}
    }, {
        name: "factory",
        type: "Function",
        labels: ["javascript"],
        required: !1,
        displayWidth: 70,
        displayHeight: 3,
        rows: 3,
        view: "foam.ui.FunctionView",
        defaultValue: "",
        help: "Factory for creating initial value when new object instantiated.",
        documentation: function() {}
    }, {
        name: "lazyFactory",
        type: "Function",
        labels: ["javascript"],
        required: !1,
        view: "foam.ui.FunctionView",
        help: "Factory for creating the initial value. Only called when the property is accessed for the first time.",
        documentation: function() {}
    }, {
        name: "regex",
        labels: ["javascript"]
    }, {
        name: "validate",
        type: "Function",
        swiftType: "FoamFunction?",
        javaType: "FoamFunction<String>",
        required: !1,
        view: "foam.ui.FunctionView",
        help: "Function for validating property value.",
        preSet: function(_, f) {
            var str, deps, deps, str
            return f.dependencies ? f : (str = f.toString(),
            deps = (deps = str.match(/^function[ _$\w]*\(([ ,\w]*)/)[1]) ? deps.split(",").map(function(name) {
                return name.trim()
            }) : [],
            (str = function() {
                for (var args = [], i = 0; i < deps.length; i++)
                    args.push(this[deps[i]])
                return f.apply(this, args)
            }
            ).dependencies = deps,
            str.toString = function() {
                return f.toString()
            }
            ,
            str)
        },
        compareProperty: function(o1, o2) {
            return o1.toString() !== o2.toString()
        },
        documentation: function() {}
    }, {
        name: "swiftValidate",
        labels: ["swift", "compiletime"]
    }, {
        name: "javaValidate",
        labels: ["java", "compiletime"]
    }, {
        name: "javaAdapt",
        type: "String",
        labels: ["compiletime", "java"],
        defaultValue: function() {}
    }, {
        name: "javaPreSet",
        type: "String",
        labels: ["compiletime", "java"],
        defaultValue: function() {}
    }, {
        name: "javaPostSet",
        type: "String",
        labels: ["compiletime", "java"],
        defaultValue: "//javaPostSet goes here."
    }, {
        name: "javaGetter",
        type: "String",
        labels: ["compiletime", "java"]
    }, {
        name: "javaFactory",
        type: "String",
        labels: ["compiletime", "java"],
        adapt: function(_, n) {
            return "function" == typeof n ? multiline(n) : n
        }
    }, {
        name: "javaLazyFactory",
        type: "String",
        labels: ["compiletime", "java"],
        adapt: function(_, n) {
            return "function" == typeof n ? multiline(n) : n
        }
    }, {
        name: "swiftAdapt",
        type: "String",
        labels: ["compiletime", "swift"],
        defaultValue: function() {}
    }, {
        name: "swiftPreSet",
        type: "String",
        labels: ["compiletime", "swift"],
        defaultValue: "return newValue"
    }, {
        name: "swiftPostSet",
        type: "String",
        labels: ["compiletime", "swift"],
        defaultValue: "//swiftPostSet goes here."
    }, {
        name: "swiftGetter",
        type: "String",
        labels: ["compiletime", "swift"]
    }, {
        name: "swiftFactory",
        type: "String",
        labels: ["compiletime", "swift"]
    }, {
        name: "swiftLazyFactory",
        type: "String",
        labels: ["compiletime", "swift"]
    }, {
        name: "getter",
        type: "Function",
        labels: ["javascript"],
        required: !1,
        displayWidth: 70,
        displayHeight: 3,
        view: "foam.ui.FunctionView",
        defaultValue: "",
        help: "The property's default value function.",
        documentation: function() {}
    }, {
        name: "adapt",
        type: "Function",
        labels: ["javascript"],
        required: !1,
        displayWidth: 70,
        displayHeight: 3,
        view: "foam.ui.FunctionView",
        defaultValue: "",
        help: "An adapter function called before preSet.",
        documentation: function() {}
    }, {
        name: "preSet",
        type: "Function",
        labels: ["javascript"],
        required: !1,
        displayWidth: 70,
        displayHeight: 3,
        view: "foam.ui.FunctionView",
        defaultValue: "",
        help: "An adapter function called before normal setter logic.",
        documentation: function() {}
    }, {
        name: "postSet",
        type: "Function",
        labels: ["javascript"],
        required: !1,
        displayWidth: 70,
        displayHeight: 3,
        view: "foam.ui.FunctionView",
        defaultValue: "",
        help: "A function called after normal setter logic, but before property change event fired.",
        documentation: function() {}
    }, {
        name: "setter",
        type: "Function",
        labels: ["javascript"],
        required: !1,
        displayWidth: 70,
        displayHeight: 3,
        view: "foam.ui.FunctionView",
        defaultValue: "",
        help: "The property's default value function.",
        documentation: function() {}
    }, {
        name: "tableFormatter",
        label: "Table Cell Formatter",
        type: "Function",
        labels: ["javascript"],
        required: !1,
        displayWidth: 70,
        displayHeight: 3,
        rows: 3,
        view: "foam.ui.FunctionView",
        defaultValue: "",
        help: "Function to format value for display in TableView.",
        documentation: "A function to format the value for display in a $$DOC{ref:'foam.ui.TableView'}."
    }, {
        name: "summaryFormatter",
        label: "Summary Formatter",
        type: "Function",
        labels: ["javascript"],
        required: !1,
        displayWidth: 70,
        displayHeight: 3,
        rows: 3,
        view: "foam.ui.FunctionView",
        defaultValue: "",
        help: "Function to format value for display in SummaryView.",
        documentation: "A function to format the value for display in a $$DOC{ref:'SummaryView'}."
    }, {
        name: "tableWidth",
        type: "String",
        required: !1,
        defaultValue: "",
        help: "Table View Column Width.",
        documentation: "A Suggestion for $$DOC{ref:'foam.ui.TableView'} column width."
    }, {
        name: "help",
        label: "Help Text",
        type: "String",
        swiftType: "String",
        swiftDefaultValue: '""',
        required: !1,
        displayWidth: 70,
        displayHeight: 6,
        view: "foam.ui.TextAreaView",
        defaultValue: "",
        help: "Help text associated with the property.",
        documentation: function() {}
    }, {
        name: "helpTranslationHint",
        type: "String",
        help: "The translation hint for the help property."
    }, DocumentationBootstrap, {
        name: "prototag",
        label: "Protobuf tag",
        type: "Int",
        defaultValue: 0,
        required: !1,
        help: "The protobuf tag number for this field.",
        documentation: "The protobuf tag number for this field."
    }, {
        name: "actionFactory",
        type: "Function",
        labels: ["javascript"],
        required: !1,
        displayWidth: 70,
        displayHeight: 3,
        rows: 3,
        view: "foam.ui.FunctionView",
        defaultValue: "",
        help: "Factory to create the action objects for taking this property from value A to value B",
        documentation: "Factory to create the $$DOC{ref:'Action'} objects for taking this $$DOC{ref:'Property'} from value A to value B"
    }, {
        name: "compareProperty",
        type: "Function",
        swiftType: "FoamFunction",
        javaType: "FoamFunction<Integer>",
        view: "foam.ui.FunctionView",
        displayWidth: 70,
        displayHeight: 5,
        defaultValue: function(o1, o2) {
            return o1 !== o2 && (o1 || o2) ? o1 ? o2 ? o1.localeCompare ? o1.localeCompare(o2) : o1.compareTo ? o1.compareTo(o2) : o1.$UID.compareTo(o2.$UID) : 1 : -1 : 0
        },
        swiftDefaultValue: function() {},
        javaDefaultValue: function() {},
        help: "Comparator function.",
        documentation: "A comparator function two compare two instances of this $$DOC{ref:'Property'}."
    }, {
        name: "fromString",
        labels: ["javascript"],
        defaultValue: function(s) {
            return s
        },
        help: "Function to extract value from a String."
    }, {
        name: "fromElement",
        labels: ["javascript"],
        defaultValue: function propertyFromElement(e, p) {
            if (!p.subType || !this.X.lookup || "String" === p.subType)
                return this[p.name] = p.fromString(e.innerHTML),
                undefined
            var model = this.X.lookup(p.subType), model
            return model && (model = model.create()).fromElement ? this[p.name] = model.fromElement(e) : this[p.name] = p.fromString(e.innerHTML),
            void 0
        },
        help: "Function to extract from a DOM Element.",
        documentation: "Function to extract a value from a DOM Element."
    }, {
        name: "propertyToJSON",
        labels: ["javascript"],
        defaultValue: function(visitor, output, o) {
            this.transient || (output[this.name] = visitor.visit(o[this.name]))
        },
        help: "Function to extract from a DOM Element.",
        documentation: "Function to extract a value from a DOM Element."
    }, {
        name: "autocompleter",
        subType: "Autocompleter",
        labels: ["javascript"],
        help: "Name or model for the autocompleter for this property.",
        documentation: function() {}
    }, {
        name: "install",
        type: "Function",
        labels: ["javascript"],
        required: !1,
        displayWidth: 70,
        displayHeight: 3,
        rows: 3,
        view: "foam.ui.FunctionView",
        defaultValue: "",
        help: "A function which installs additional features into the Model's prototype.",
        documentation: function() {}
    }, {
        name: "exclusive",
        type: "Boolean",
        view: "foam.ui.BooleanView",
        defaultValue: !0,
        help: "Indicates if the property can only have a single value.",
        documentation: function() {}
    }, {
        name: "memorable",
        type: "Boolean",
        help: "True if this value should be included in a memento for this object.",
        defaultValue: !1
    }, {
        name: "attribute",
        type: "Boolean",
        help: "True if this property is settable as an element attribute.",
        defaultValue: !1
    }, {
        name: "javaJsonParser",
        labels: ["java"],
        javaType: "foam.lib.parse.Parser",
        javaFactory: function() {}
    }, {
        name: "javaOutputJson",
        javaType: "FoamFunction<Void>",
        labels: ["java"],
        javaFactory: function() {}
    }],
    methods: [function partialEval() {
        return this
    }
    , {
        name: "f",
        code: function(obj) {
            return obj[this.name]
        },
        args: [{
            name: "obj",
            swiftType: "AnyObject?",
            javaType: "Object"
        }],
        swiftReturnType: "AnyObject?",
        javaReturnType: "Object",
        swiftCode: function() {},
        javaCode: function() {}
    }, {
        name: "compare",
        code: function(o1, o2) {
            return this.compareProperty(this.f(o1), this.f(o2))
        },
        args: [{
            name: "o1",
            swiftType: "AnyObject?",
            javaType: "Object"
        }, {
            name: "o2",
            swiftType: "AnyObject?",
            javaType: "Object"
        }],
        returnType: "Int",
        swiftCode: function() {},
        javaCode: function() {}
    }, function readResolve() {
        return this.modelId ? this.X.lookup(this.modelId)[constantize(this.name)] : this
    }
    , function toSQL() {
        return this.name
    }
    , function toMQL() {
        return this.name
    }
    , function toBQL() {
        return this.name
    }
    , function cloneProperty(value, cloneArgs) {
        cloneArgs[this.name] = value && value.clone ? value.clone() : value
    }
    , function deepCloneProperty(value, cloneArgs) {
        cloneArgs[this.name] = value && value.deepClone ? value.deepClone() : value
    }
    , function exprClone() {
        return this
    }
    , function dot(nextProp) {
        var PropertySequence = this.X.lookup("foam.mlang.PropertySequence")
        return PropertySequence ? PropertySequence.isInstance(this) ? (this.next_ ? this.next_ = this.next_.dot(nextProp) : this.next_ = nextProp,
        this) : PropertySequence.xbind({
            next_: nextProp
        }).create(this, this.Y) : (console.warn("Missing foam.mlang.PropertySequence for Property.dot()"),
        this)
    }
    , function initPropertyAgents(proto, fastInit) {
        var prop = this, name = this.name, name$_ = this.name$_, dynamicValue
        fastInit || proto.addInitAgent(this.postSet || this.setter ? 9 : 0, name + ": " + (this.postSet || this.setter ? "copy arg (postSet)" : "copy arg"), function(o, X, m) {
            m && (m.hasOwnProperty(name) && (o[name] = m[name]),
            m.hasOwnProperty(name$_) && (o[name$_] = m[name$_]))
        }),
        this.dynamicValue && (dynamicValue = this.dynamicValue,
        Array.isArray(dynamicValue) ? proto.addInitAgent(10, name + ": dynamicValue", function(o, X) {
            Events.dynamicFn(dynamicValue[0].bind(o), function() {
                o[name] = dynamicValue[1].call(o)
            }, X || this.X)
        }) : proto.addInitAgent(10, name + ": dynamicValue", function(o, X) {
            Events.dynamicFn(dynamicValue.bind(o), function(value) {
                o[name] = value
            }, X || this.X)
        })),
        this.factory && proto.addInitAgent(11, name + ": factory", function(o, X) {
            o.hasOwnProperty(name) || o[name]
        })
    }
    , function toE(opt_X) {
        var opt_X = opt_X || this.X
        return opt_X.lookup("foam.u2.PropertyView").create({
            prop: this,
            view: this.toPropertyE(opt_X)
        }, opt_X)
    }
    ],
    toString: function() {
        return "Property"
    }
},
Model.methods = {},
"createMethod_ getProperty getAction hashCode buildPrototype addTraitToModel_ buildProtoImports_ buildProtoProperties_ buildProtoMethods_ getPrototype isSubModel isInstance getAllRequires arequire getMyFeature getRawFeature getAllMyRawFeatures getFeature getAllRawFeatures atest getRuntimeProperties getRuntimeActions create".split(" ").forEach(function(k) {
    Model.methods[k] = BootstrapModel[k]
}),
Model = Model.create(Model),
Model.model_ = Model,
Model.create = BootstrapModel.create,
Property = Model.create(Property),
Property.getRuntimeProperties()), i = 0; i < ps.length; i++)
    Property[constantize(ps[i].name)] = ps[i] = Property.create(ps[i])
function recopyModelFeatures(m) {
    (GLOBAL[m.name] = X[m.name] = m).model_ = Model,
    m.methods = m.methods,
    m.relationships = m.relationships,
    m.properties = m.properties,
    m.models = m.models,
    DEBUG && (m.tests = m.tests,
    m.issues = m.issues),
    m.properties && m.properties[0] && "Model" !== m.properties[0].__proto__.model_.name_ && m.properties.forEach(function(p) {
        "Property" === p.__proto__.model_.name && (p.__proto__ = Property.getPrototype())
    }),
    DEBUG && BootstrapModel.saveDefinition(m)
}
if (USED_MODELS.Property = !0,
USED_MODELS.Model = !0,
CLASS({
    name: "Message",
    plural: "messages",
    tableProperties: ["name", "value", "translationHint"],
    documentation: function() {},
    properties: [{
        name: "name",
        required: !0,
        displayWidth: 30,
        displayHeight: 1,
        defaultValue: "",
        help: "The coding identifier for the message.",
        documentation: function() {}
    }, {
        name: "value",
        help: "The message itself."
    }, {
        name: "labels",
        type: "StringArray",
        labels: ["debug", "javascript"]
    }, {
        name: "meaning",
        help: "Linguistic clarification to resolve ambiguity.",
        documentation: function() {}
    }, {
        name: "placeholders",
        help: "Placeholders to inject into the message.",
        documentation: function() {},
        factory: function() {
            return []
        }
    }, {
        name: "replaceValues",
        documentation: function() {},
        defaultValue: function(unused_selectors, args) {
            for (var phs = this.placeholders || [], value = this.value, i = 0; i < phs.length; ++i)
                var name = phs[i].name
                  , replacement = args.hasOwnProperty(name) ? args[name] : phs[i].example
                  , value = value.replace(new RegExp("[$]" + name + "[$]","g"), replacement)
            return value
        }
    }, {
        name: "translationHint",
        displayWidth: 70,
        displayHeight: 1,
        defaultValue: "",
        help: "A brief description of this message and the context in which it used.",
        documentation: function() {}
    }]
}),
CLASS({
    name: "StringProperty",
    extends: "Property",
    help: "Describes a properties of type String.",
    label: "Text",
    messages: [{
        name: "errorPatternMismatch",
        value: "The text does not match the pattern."
    }, {
        name: "errorBelowMinLength",
        value: "The text is too short. Minimum: $MIN$",
        placeholders: [{
            name: "MIN",
            example: "40"
        }]
    }, {
        name: "errorAboveMaxLength",
        value: "The text is too long. Maximum: $MAX$",
        placeholders: [{
            name: "MAX",
            example: "40"
        }]
    }],
    properties: [{
        name: "displayHeight",
        displayWidth: 8,
        defaultValue: 1,
        help: "The display height of the property."
    }, {
        name: "adapt",
        labels: ["javascript"],
        defaultValue: function(_, v) {
            return null == v ? "" : "function" == typeof v ? multiline(v) : v.toString()
        }
    }, {
        name: "swiftAdapt",
        defaultValue: function() {}
    }, {
        name: "javaType",
        displayWidth: 70,
        defaultValue: "String",
        help: "The Java type of this property."
    }, {
        name: "swiftType",
        defaultValue: "String"
    }, {
        name: "swiftNSCoderEncode",
        defaultValue: 'aCoder.encode(`<%= this.name %>`, forKey: "<%= this.name %>")'
    }, {
        name: "swiftNSCoderDecode",
        defaultValue: '_ = set("<%= this.name %>", value: aDecoder.decodeObject(forKey: "<%= this.name %>") as AnyObject?)'
    }, {
        name: "swiftDefaultValue",
        defaultValueFn: function() {
            var defaultValue
            return '"' + (this.defaultValue || "") + '"'
        }
    }, {
        name: "javaDefaultValue",
        defaultValueFn: function() {
            var defaultValue
            return '"' + (this.defaultValue || "") + '"'
        }
    }, {
        name: "view",
        labels: ["javascript"],
        defaultValue: "foam.ui.TextFieldView"
    }, {
        name: "swiftView",
        defaultValue: "FoamUITextField"
    }, {
        name: "pattern",
        help: "Regex pattern for property."
    }, {
        name: "minChars",
        label: "Minimum characters",
        help: "The minimum number of characters required.",
        adapt: function(old, nu) {
            return "" === nu ? "" : parseInt(nu)
        }
    }, {
        name: "maxChars",
        label: "Maximum characters",
        help: "The maximum number of characters allowed.",
        adapt: function(old, nu) {
            return "" === nu ? "" : parseInt(nu)
        }
    }, {
        name: "prototag",
        label: "Protobuf tag",
        required: !1,
        help: "The protobuf tag number for this field."
    }, {
        name: "validate",
        lazyFactory: function() {
            var prop = this, ret = constantFn(""), min = prop.minChars, max = ("" !== min && ((ret = function(result) {
                return result || (this[prop.name].length < min ? prop.ERROR_BELOW_MIN_LENGTH.replaceValues(null, {
                    MIN: min
                }) : "")
            }
            .o(ret)).dependencies = [prop.name]),
            prop.maxChars), pattern = ("" !== max && ((ret = function(result) {
                return result || (this[prop.name].length > max ? prop.ERROR_ABOVE_MAX_LENGTH.replaceValues(null, {
                    MAX: max
                }) : "")
            }
            .o(ret)).dependencies = [prop.name]),
            prop.pattern), testable, errMsg, ret
            return pattern && (testable = pattern.test ? pattern : new RegExp(pattern.toString(),"i"),
            errMsg = pattern.errorMessage ? pattern.errorMessage() : prop.errorPatternMismatch,
            (ret = function(result) {
                return result || (testable.test(this[prop.name]) ? "" : errMsg)
            }
            .o(ret)).dependencies = [prop.name]),
            ret
        }
    }]
}),
CLASS({
    name: "BooleanProperty",
    extends: "Property",
    help: "Describes a properties of type Boolean.",
    label: "True or false",
    properties: [{
        name: "swiftType",
        type: "String",
        displayWidth: 70,
        defaultValue: "Bool"
    }, {
        name: "swiftNSCoderEncode",
        defaultValue: 'aCoder.encode(`<%= this.name %>`, forKey: "<%= this.name %>")'
    }, {
        name: "swiftNSCoderDecode",
        defaultValue: '_ = set("<%= this.name %>", value: aDecoder.decodeBool(forKey: "<%= this.name %>") as AnyObject?)'
    }, {
        name: "swiftDefaultValue",
        defaultValueFn: function() {
            return this.defaultValue + ""
        }
    }, {
        name: "javaDefaultValue",
        defaultValueFn: function() {
            return this.defaultValue + ""
        }
    }, {
        name: "javaType",
        type: "String",
        displayWidth: 70,
        defaultValue: "boolean",
        help: "The Java type of this property."
    }, {
        name: "view",
        labels: ["javascript"],
        defaultValue: "foam.ui.BooleanView"
    }, {
        name: "swiftView",
        defaultValue: "FoamUISwitch"
    }, {
        name: "toPropertyE",
        labels: ["javascript"],
        defaultValue: function(X) {
            return X.lookup("foam.u2.tag.Checkbox").create(null, X)
        }
    }, ["defaultValue", !1], {
        name: "adapt",
        defaultValue: function(_, v) {
            return !!v
        },
        labels: ["javascript"]
    }, {
        name: "prototag",
        label: "Protobuf tag",
        required: !1,
        help: "The protobuf tag number for this field."
    }, {
        name: "fromString",
        labels: ["javascript"],
        defaultValue: function(s) {
            var s = s.trim()
            return s.equalsIC("y") || s.equalsIC("yes") || s.equalsIC("true") || s.equalsIC("t")
        },
        help: "Function to extract value from a String."
    }, {
        name: "fromMemento",
        labels: ["javascript"],
        defaultValue: function(mem) {
            return (!mem || "false" !== mem.toLowerCase() && "0" !== mem) && !!mem
        }
    }]
}),
CLASS({
    name: "DateProperty",
    extends: "Property",
    help: "Describes a properties of type Date.",
    label: "Date",
    properties: [["displayWidth", 50], {
        name: "swiftType",
        defaultValue: "Date?"
    }, {
        name: "swiftNSCoderEncode",
        defaultValue: 'aCoder.encode(`<%= this.name %>`, forKey: "<%= this.name %>")'
    }, {
        name: "swiftNSCoderDecode",
        defaultValue: '_ = set("<%= this.name %>", value: aDecoder.decodeObject(forKey: "<%= this.name %>") as AnyObject?)'
    }, {
        name: "javaType",
        defaultValue: "java.util.Date",
        help: "The Java type of this property."
    }, {
        name: "javaAdapt",
        defaultValue: function() {}
    }, ["view", "foam.ui.DateFieldView"], {
        name: "toPropertyE",
        labels: ["javascript"],
        defaultValue: function(X) {
            return X.lookup("foam.u2.DateView").create(null, X)
        }
    }, {
        name: "prototag",
        label: "Protobuf tag",
        required: !1,
        help: "The protobuf tag number for this field."
    }, {
        name: "adapt",
        defaultValue: function(_, d) {
            return "number" == typeof d ? new Date(d) : "string" == typeof d ? "Invalid Date" === (ret = new Date(d)).toUTCString() ? new Date(+d) : ret : d
            var ret
        }
    }, ["tableFormatter", function(d) {
        return d ? d.toRelativeDateString() : ""
    }
    ], ["compareProperty", function(o1, o2) {
        return o1 ? o2 ? o1.compareTo(o2) : 1 : o2 ? -1 : 0
    }
    ]]
}),
CLASS({
    name: "DateTimeProperty",
    extends: "DateProperty",
    help: "Describes a properties of type DateTime.",
    label: "Date and time",
    properties: [["view", "foam.ui.DateTimeFieldView"], {
        name: "toPropertyE",
        labels: ["javascript"],
        defaultValue: function(X) {
            return X.lookup("foam.u2.md.DateTimeField").create(null, X)
        }
    }]
}),
CLASS({
    name: "NumericProperty_",
    extends: "Property",
    help: "Base model for a property of any numeric type.",
    messages: [{
        name: "errorBelowMinimum",
        value: "The value must be at least $MIN$.",
        placeholders: [{
            name: "MIN",
            example: "40"
        }]
    }, {
        name: "errorAboveMaximum",
        value: "The value can be at most $MAX$.",
        placeholders: [{
            name: "MAX",
            example: "40"
        }]
    }],
    properties: [{
        name: "minValue",
        label: "Minimum Value",
        required: !1,
        help: "The minimum value this property accepts.",
        defaultValue: "",
        adapt: function(old, nu) {
            return "" === nu ? "" : this.adapt(null, nu)
        }
    }, {
        name: "maxValue",
        label: "Maximum Value",
        required: !1,
        help: "The maximum value this property accepts.",
        defaultValue: "",
        adapt: function(old, nu) {
            return "" === nu ? "" : this.adapt(null, nu)
        }
    }, {
        name: "compareProperty",
        defaultValue: function(o1, o2) {
            return o1 === o2 ? 0 : o2 < o1 ? 1 : -1
        },
        swiftDefaultValue: function() {}
    }, {
        name: "validate",
        lazyFactory: function() {
            var prop = this
              , ret = constantFn("")
              , min = prop.minValue
              , max = ("" !== min && ((ret = function(result) {
                return result || (this[prop.name] < min ? prop.ERROR_BELOW_MINIMUM.replaceValues(null, {
                    MIN: min
                }) : "")
            }
            .o(ret)).dependencies = [prop.name]),
            prop.maxValue)
            return "" !== max && ((ret = function(result) {
                return result || (this[prop.name] > max ? prop.ERROR_ABOVE_MAXIMUM.replaceValues(null, {
                    MAX: max
                }) : "")
            }
            .o(ret)).dependencies = [prop.name]),
            ret
        }
    }, {
        name: "swiftDefaultValue",
        defaultValueFn: function() {
            return "" + this.defaultValue
        }
    }]
}),
CLASS({
    name: "IntProperty",
    extends: "NumericProperty_",
    help: "Describes a properties of type Int.",
    label: "Round numbers",
    properties: [["displayWidth", 10], {
        name: "javaType",
        displayWidth: 10,
        defaultValue: "int",
        help: "The Java type of this property."
    }, {
        name: "swiftType",
        defaultValue: "Int"
    }, {
        name: "swiftNSCoderEncode",
        defaultValue: 'aCoder.encode(`<%= this.name %>`, forKey: "<%= this.name %>")'
    }, {
        name: "swiftNSCoderDecode",
        defaultValue: '_ = set("<%= this.name %>", value: aDecoder.decodeInteger(forKey: "<%= this.name %>") as AnyObject?)'
    }, {
        name: "swiftAdapt",
        defaultValue: function() {}
    }, {
        name: "javaAdapt",
        defaultValue: function() {}
    }, {
        name: "swiftDefaultValue",
        defaultValueFn: function() {
            return this.defaultValue + ""
        }
    }, {
        name: "javaDefaultValue",
        defaultValueFn: function() {
            return this.defaultValue + ""
        }
    }, {
        name: "view",
        labels: ["javascript"],
        defaultValue: "foam.ui.IntFieldView"
    }, {
        name: "swiftView",
        defaultValue: "FoamIntUITextField"
    }, {
        name: "adapt",
        labels: ["javascript"],
        defaultValue: function(_, v) {
            return "number" == typeof v ? Math.round(v) : v ? parseInt(v) : 0
        }
    }, ["defaultValue", 0], {
        name: "prototag",
        label: "Protobuf tag",
        required: !1,
        help: "The protobuf tag number for this field."
    }]
}),
CLASS({
    name: "LongProperty",
    extends: "IntProperty",
    help: "Describes a properties of type Long.",
    label: "Round long numbers",
    properties: [{
        name: "displayWidth",
        labels: ["javascript"],
        defaultValue: 12
    }, {
        name: "javaType",
        labels: ["javascript"],
        defaultValue: "long"
    }, {
        name: "swiftType",
        labels: ["compiletime", "swift"],
        defaultValue: "NSNumber"
    }, {
        name: "swiftNSCoderEncode",
        defaultValue: 'aCoder.encode(`<%= this.name %>`, forKey: "<%= this.name %>")'
    }, {
        name: "swiftNSCoderDecode",
        defaultValue: '_ = set("<%= this.name %>", value: aDecoder.decodeObject(forKey: "<%= this.name %>") as AnyObject?)'
    }, {
        name: "swiftAdapt",
        defaultValue: function() {}
    }, {
        name: "javaAdapt",
        defaultValue: function() {}
    }]
}),
CLASS({
    name: "FloatProperty",
    extends: "NumericProperty_",
    help: "Describes a properties of type Float.",
    label: "Decimal numbers",
    properties: [{
        name: "defaultValue",
        defaultValue: 0
    }, {
        name: "swiftDefaultValue",
        defaultValueFn: function() {
            return "" + this.defaultValue
        }
    }, {
        name: "javaDefaultValue",
        defaultValueFn: function() {
            return "" + this.defaultValue
        }
    }, {
        name: "javaType",
        displayWidth: 10,
        defaultValue: "double",
        help: "The Java type of this property."
    }, {
        name: "swiftType",
        defaultValue: "Float"
    }, {
        name: "swiftView",
        defaultValue: "FoamFloatUITextField"
    }, {
        name: "displayWidth",
        defaultValue: 15
    }, {
        name: "view",
        defaultValue: "foam.ui.FloatFieldView"
    }, {
        name: "adapt",
        defaultValue: function(_, v) {
            return "number" == typeof v ? v : v ? parseFloat(v) : 0
        }
    }, {
        name: "swiftAdapt",
        defaultValue: function() {}
    }, {
        name: "prototag",
        label: "Protobuf tag",
        required: !1,
        help: "The protobuf tag number for this field."
    }]
}),
CLASS({
    name: "FunctionProperty",
    extends: "Property",
    help: "Describes a properties of type Function.",
    label: "Code that can be run",
    properties: [{
        name: "javaType",
        displayWidth: 10,
        defaultValue: "FoamFunction",
        help: "The Java type of this property."
    }, {
        name: "swiftType",
        defaultValue: "FoamFunction"
    }, {
        name: "swiftDefaultValue",
        defaultValue: "FoamFunction(fn: { (_: AnyObject?...) -> AnyObject? in return nil })"
    }, {
        name: "displayWidth",
        defaultValue: 15
    }, {
        name: "view",
        defaultValue: "foam.ui.FunctionView"
    }, {
        name: "toPropertyE",
        defaultValue: function(X) {
            return X.lookup("foam.u2.FunctionView").create(void 0, X)
        }
    }, {
        name: "defaultValue",
        defaultValue: function() {}
    }, {
        name: "fromElement",
        defaultValue: function(e, p) {
            var e = e.innerHTML.trim()
            this[p.name] = e
        }
    }, {
        name: "adapt",
        defaultValue: function(_, value) {
            var parse, body
            return "string" == typeof value ? (parse = JSONParser.parseString(value, JSONParser["function prototype"])) ? (body = value.substring(value.indexOf("{") + 1, value.lastIndexOf("}")),
            new Function(parse[3],body)) : new Function(value) : value
        }
    }]
}),
CLASS({
    name: "TemplateProperty",
    extends: "FunctionProperty",
    properties: [{
        name: "adapt",
        defaultValue: function(_, value) {
            return TemplateUtil.expandTemplate(this, value)
        }
    }, {
        name: "defaultValue",
        adapt: function(_, value) {
            return TemplateProperty.ADAPT.defaultValue.call(this, _, value)
        }
    }, {
        name: "toPropertyE",
        defaultValue: function(X) {
            return X.lookup("foam.u2.MultiLineTextField").create(void 0, X)
        }
    }, {
        name: "install",
        defaultValue: function(prop) {
            defineLazyProperty(this, prop.name + "$f", function() {
                var f = TemplateUtil.lazyCompile(this[prop.name])
                return {
                    get: function() {
                        return f
                    },
                    configurable: !0
                }
            })
        }
    }]
}),
CLASS({
    name: "ArrayProperty",
    extends: "Property",
    javaClassImports: ["java.util.List"],
    help: "Describes a property of type Array.",
    label: "List of items",
    properties: [{
        name: "swiftType",
        defaultValueFn: function() {
            return "[" + this.swiftSubType + "]"
        }
    }, {
        name: "swiftSubType",
        labels: ["compiletime", "swift"],
        defaultValueFn: function() {
            var type
            return (this.subType || "FObject").split(".").pop()
        }
    }, {
        name: "swiftNSCoderEncode",
        defaultValue: 'aCoder.encode(`<%= this.name %>`, forKey: "<%= this.name %>")'
    }, {
        name: "swiftNSCoderDecode",
        defaultValue: '_ = set("<%= this.name %>", value: aDecoder.decodeObject(forKey: "<%= this.name %>") as AnyObject?)'
    }, {
        name: "swiftFactory",
        defaultValue: "return [] as AnyObject?"
    }, {
        name: "singular",
        displayWidth: 70,
        defaultValueFn: function() {
            return this.name.replace(/s$/, "")
        },
        help: "The plural form of this model's name.",
        documentation: function() {}
    }, {
        name: "subType",
        displayWidth: 20,
        defaultValue: "",
        help: "The FOAM sub-type of this property."
    }, {
        name: "protobufType",
        defaultValueFn: function() {
            return this.subType
        }
    }, {
        name: "adapt",
        defaultValue: function(_, a, prop) {
            var m = prop.subType_ || (prop.subType_ = this.X.lookup(prop.subType) || GLOBAL.lookup(prop.subType))
            if (m)
                for (var i = 0; i < a.length; i++)
                    m.isInstance(a[i]) || (a[i] = a[i].model_ ? FOAM(a[i]) : m.create(a[i]))
            return a
        }
    }, {
        name: "postSet",
        defaultValue: function(oldA, a, prop) {
            var name = prop.nameArrayRelay_ || (prop.nameArrayRelay_ = prop.name + "ArrayRelay_")
              , name = this[name] || (this[name] = function() {
                this.propertyChange(prop.name, null, this[prop.name])
            }
            .bind(this))
            oldA && oldA.unlisten && oldA.unlisten(name),
            a && a.listen && a.listen(name)
        }
    }, {
        name: "javaSubType",
        labels: ["compiletime", "java"],
        defaultValueFn: function() {
            return this.subType || "FObject"
        }
    }, {
        name: "javaType",
        displayWidth: 10,
        defaultValueFn: function(p) {
            return "java.util.List<" + this.javaSubType + ">"
        },
        help: "The Java type of this property."
    }, {
        name: "javaLazyFactory",
        defaultValueFn: function(p) {
            return "return new java.util.ArrayList<" + this.javaSubType + ">();"
        }
    }, {
        name: "javaAdapt",
        defaultValue: function() {}
    }, {
        name: "view",
        defaultValue: "foam.ui.ArrayView"
    }, {
        name: "factory",
        defaultValue: function() {
            return []
        }
    }, {
        name: "propertyToJSON",
        defaultValue: function(visitor, output, o) {
            !this.transient && o[this.name].length && (output[this.name] = visitor.visitArray(o[this.name]))
        }
    }, {
        name: "install",
        defaultValue: function(prop) {
            defineLazyProperty(this, prop.name + "$Proxy", function() {
                var proxy = this.X.lookup("foam.dao.ProxyDAO").create({
                    delegate: this[prop.name].dao
                })
                return this.addPropertyListener(prop.name, function(_, __, ___, a) {
                    proxy.delegate = a.dao
                }),
                {
                    get: function() {
                        return proxy
                    },
                    configurable: !0
                }
            }),
            this.addMethod("get" + capitalize(prop.singular), function(id) {
                for (var i = 0; i < this[prop.name].length; i++)
                    if (this[prop.name][i].id === id)
                        return this[prop.name][i]
            })
        }
    }, {
        name: "fromElement",
        defaultValue: function(e, p) {
            for (var model = this.X.lookup(e.getAttribute("model") || p.subType), children = e.children, a = [], i = 0; i < children.length; i++) {
                var o = model.create(null, this.Y)
                o.fromElement(children[i], p),
                a.push(o)
            }
            this[p.name] = a
        }
    }, {
        name: "prototag",
        label: "Protobuf tag",
        required: !1,
        help: "The protobuf tag number for this field."
    }, {
        name: "compareProperty",
        swiftDefaultValue: function() {},
        javaDefaultValue: function() {}
    }, {
        name: "javaJsonParser",
        javaFactory: function() {}
    }]
}),
CLASS({
    name: "BlobProperty",
    extends: "Property",
    help: "A chunk of binary data.",
    label: "Binary data",
    properties: [{
        name: "type",
        type: "String",
        defaultValue: "Blob",
        help: "The FOAM type of this property."
    }, {
        name: "javaType",
        type: "String",
        defaultValue: "byte[]",
        help: "The Java type for this property."
    }]
}),
CLASS({
    name: "ReferenceProperty",
    extends: "Property",
    help: "A foreign key reference to another Entity.",
    label: "Reference to another object",
    properties: [{
        name: "subType",
        displayWidth: 20,
        defaultValue: "",
        help: "The FOAM sub-type of this property."
    }, {
        name: "subKey",
        displayWidth: 20,
        defaultValue: "ID",
        help: "The foreign key that this property references."
    }, {
        name: "javaType",
        displayWidth: 10,
        defaultValueFn: function() {
            return this.X.lookup(this.subType)[this.subKey].javaType
        },
        help: "The Java type of this property."
    }, {
        name: "view",
        defaultValue: "foam.ui.TextFieldView"
    }, {
        name: "toPropertyE",
        defaultValue: function(X) {
            return X.lookup("foam.u2.ReferenceView").create(null, X)
        }
    }, {
        name: "prototag",
        label: "Protobuf tag",
        required: !1,
        help: "The protobuf tag number for this field."
    }]
}),
CLASS({
    name: "StringArrayProperty",
    extends: "Property",
    javaClassImports: ["java.util.List"],
    help: "An array of String values.",
    label: "List of text strings",
    properties: [{
        name: "swiftType",
        defaultValue: "[String]"
    }, {
        name: "swiftFactory",
        defaultValue: "return [] as AnyObject"
    }, {
        name: "swiftNSCoderEncode",
        defaultValue: 'aCoder.encode(`<%= this.name %>`, forKey: "<%= this.name %>")'
    }, {
        name: "swiftNSCoderDecode",
        defaultValue: '_ = set("<%= this.name %>", value: aDecoder.decodeObject(forKey: "<%= this.name %>") as AnyObject?)'
    }, {
        name: "javaLazyFactory",
        defaultValue: "return new java.util.ArrayList<String>();"
    }, {
        name: "javaAdapt",
        defaultValue: function() {}
    }, {
        name: "singular",
        displayWidth: 70,
        defaultValueFn: function() {
            return this.name.replace(/s$/, "")
        },
        help: "The plural form of this model's name.",
        documentation: function() {}
    }, {
        name: "subType",
        displayWidth: 20,
        defaultValue: "String",
        help: "The FOAM sub-type of this property."
    }, {
        name: "displayWidth",
        defaultValue: 50
    }, {
        name: "adapt",
        defaultValue: function(_, v) {
            return Array.isArray(v) ? v : v || 0 === v ? [v] : []
        }
    }, {
        name: "factory",
        defaultValue: function() {
            return []
        }
    }, {
        name: "javaType",
        displayWidth: 10,
        defaultValue: "java.util.List<String>",
        help: "The Java type of this property."
    }, {
        name: "view",
        defaultValue: "foam.ui.StringArrayView"
    }, {
        name: "prototag",
        label: "Protobuf tag",
        required: !1,
        help: "The protobuf tag number for this field."
    }, {
        name: "exclusive",
        defaultValue: !1
    }, {
        name: "fromString",
        defaultValue: function(s) {
            return s.split(",")
        }
    }, {
        name: "fromElement",
        defaultValue: function(e, p) {
            for (var val = [], name = p.singular || "item", i = 0; i < e.children.length; i++)
                e.children[i].nodeName === name && val.push(e.children[i].innerHTML)
            this[p.name] = val
        }
    }, {
        name: "toMemento",
        defaultValue: function(o, p) {
            return o.map(function(x) {
                return x.replace(/,/g, "&#44;")
            }).join(",")
        }
    }, {
        name: "fromMemento",
        defaultValue: function(s, p) {
            return s ? s.split(",").map(function(x) {
                return x.replace(/&#44;/g, ",")
            }) : void 0
        }
    }, {
        name: "compareProperty",
        swiftDefaultValue: function() {},
        javaDefaultValue: function() {}
    }, {
        name: "javaJsonParser",
        javaFactory: function() {}
    }]
}),
CLASS({
    name: "ModelProperty",
    extends: "Property",
    help: "Describes a Model property.",
    label: "Data Model definition",
    properties: [{
        name: "getter",
        labels: ["javascript"],
        defaultValue: function(name) {
            var value = this.instance_[name], name, ret
            return void 0 === value && ((name = this.model_.getProperty(name)) ? name.lazyFactory ? value = this.instance_[name.name] = name.lazyFactory.call(this, name) : name.factory ? value = this.instance_[name.name] = name.factory.call(this, name) : name.defaultValueFn ? value = name.defaultValueFn.call(this, name) : (typeof name.defaultValue,
            1,
            value = name.defaultValue) : value = ""),
            "string" == typeof value ? value ? this.X.lookup(value) : "" : Model.isInstance(value) ? value : ""
        }
    }, {
        name: "propertyToJSON",
        labels: ["javascript"],
        defaultValue: function(visitor, output, o) {
            this.transient || (output[this.name] = o[this.name].id)
        }
    }]
}),
CLASS({
    name: "ViewProperty",
    extends: "Property",
    help: "Describes a View-Factory property.",
    properties: [{
        name: "adapt",
        doc: "Can be specified as either a function, a Model, a Model path, or a JSON object.",
        defaultValue: function(_, f) {
            return "function" == typeof f ? f : "string" == typeof f ? function(d, opt_X) {
                return (opt_X || this.X).lookup(f).create(d, opt_X || this.Y)
            }
            .bind(this) : "function" == typeof f.create ? f.create.bind(f) : "string" == typeof f.model_ ? function(d, opt_X) {
                return FOAM(f, opt_X || this.Y).copyFrom(d)
            }
            : (console.error("******* Unknown view factory: ", f),
            f)
        }
    }, {
        name: "defaultValue",
        adapt: function(_, f) {
            return ViewProperty.ADAPT.defaultValue.call(this, null, f)
        }
    }]
}),
CLASS({
    name: "FactoryProperty",
    extends: "Property",
    help: "Describes a Factory property.",
    properties: [{
        name: "preSet",
        doc: "Can be specified as either a function, a Model, a Model path, or a JSON object.",
        defaultValue: function(_, f) {
            return f && ("function" == typeof f ? f : "string" == typeof f ? function(map, opt_X) {
                return (opt_X || this.X).lookup(f).create(map, opt_X || this.Y)
            }
            .bind(this) : Model.isInstance(f) ? f.create.bind(f) : f.factory_ ? function(map, opt_X) {
                var X, m = (opt_X || this.X).lookup(f.factory_)
                return console.assert(m, "Unknown Factory Model: " + f.factory_),
                m.create(f, opt_X || this.Y)
            }
            .bind(this) : (console.error("******* Invalid Factory: ", f),
            f))
        }
    }]
}),
CLASS({
    name: "ViewFactoryProperty",
    extends: "FactoryProperty",
    help: "Describes a View Factory property.",
    properties: [{
        name: "defaultValue",
        preSet: function(_, f) {
            return ViewFactoryProperty.ADAPT.defaultValue.call(this, null, f)
        }
    }, {
        name: "defaultValueFn",
        preSet: function(_, f) {
            var fp = function(prop) {
                return ViewFactoryProperty.ADAPT.defaultValue.call(this, null, f.call(this, prop))
            }
            return fp.toString = function() {
                return f.toString()
            }
            ,
            fp
        }
    }, {
        name: "fromElement",
        defaultValue: function(e, p) {
            this[p.name] = e.innerHTML_ || (e.innerHTML_ = e.innerHTML)
        }
    }, {
        name: "adapt",
        doc: "Can be specified as either a function, String markup, a Model, a Model path, or a JSON object.",
        defaultValue: function(_, f) {
            return f && ("function" == typeof f ? f : "string" == typeof f ? ((VIEW_CACHE = /[^0-9a-zA-Z$_.]/.exec(f) ? (VIEW_CACHE = ViewFactoryProperty.VIEW_CACHE || (ViewFactoryProperty.VIEW_CACHE = {}),
            (viewModel = VIEW_CACHE[f]) || (viewModel = VIEW_CACHE[f] = Model.create({
                name: "InnerDetailView" + this.$UID,
                extends: "foam.ui.DetailView",
                templates: [{
                    name: "toHTML",
                    template: f
                }]
            })).arequire(),
            function(args, X) {
                return viewModel.create(args, X || this.Y)
            }
            ) : function(map, opt_X) {
                var model = (opt_X || this.X).lookup(f)
                return console.assert(!!model, "Unknown model: " + f + " in " + this.name + " property"),
                model.create(map, opt_X || this.Y)
            }
            .bind(this)).toString = function() {
                return '"' + f + '"'
            }
            ,
            VIEW_CACHE) : Model.isInstance(f) ? function(args, opt_X) {
                return f.create(args, opt_X || this.Y)
            }
            .bind(this) : f.factory_ ? ((VIEW_CACHE = function(map, opt_X) {
                var m = (opt_X || this.X).lookup(f.factory_)
                return console.assert(m, "Unknown ViewFactory Model: " + f.factory_),
                m.create(f, opt_X || this.Y).copyFrom(map)
            }
            ).toString = function() {
                return JSONUtil.compact.stringify(f)
            }
            ,
            VIEW_CACHE) : this.X.lookup("foam.ui.BaseView").isInstance(f) ? constantFn(f) : (console.error("******* Invalid Factory: ", f),
            f))
            var VIEW_CACHE, VIEW_CACHE, viewModel, VIEW_CACHE
        }
    }]
}),
CLASS({
    name: "ReferenceArrayProperty",
    extends: "ReferenceProperty",
    properties: [{
        name: "factory",
        defaultValue: function() {
            return []
        }
    }, {
        name: "javaType",
        defaultValueFn: function() {
            return this.X.lookup(this.subType).ID.javaType + "[]"
        }
    }, {
        name: "view",
        defaultValue: "foam.ui.StringArrayView"
    }]
}),
CLASS({
    name: "EMailProperty",
    extends: "StringProperty",
    label: "Email address",
    properties: [["pattern", "^.+@.+$"]]
}),
CLASS({
    name: "ImageProperty",
    extends: "StringProperty",
    label: "Image data or link",
    properties: [{
        name: "view",
        labels: ["javascript"],
        defaultValue: "foam.ui.md.ImagePickerView"
    }]
}),
CLASS({
    name: "URLProperty",
    extends: "StringProperty",
    label: "Web link (URL or internet address)"
}),
CLASS({
    name: "ColorProperty",
    extends: "StringProperty",
    label: "Color",
    properties: [["view", "foam.ui.md.ColorFieldView"]]
}),
CLASS({
    name: "PasswordProperty",
    extends: "StringProperty",
    label: "Password that displays protected or hidden text",
    properties: [{
        name: "swiftView",
        defaultValue: "FoamPasswordUITextField"
    }]
}),
CLASS({
    name: "PhoneNumberProperty",
    extends: "StringProperty",
    label: "Phone number",
    properties: [["pattern", "^[0-9-+()* ]*$"]]
}),
DEBUG && CLASS({
    name: "DocumentationProperty",
    extends: "Property",
    help: "Describes the documentation properties found on Models, Properties, Actions, Methods, etc.",
    documentation: "The developer documentation for this $$DOC{ref:'.'}. Use a $$DOC{ref:'DocModelView'} to view documentation.",
    properties: [{
        name: "getter",
        labels: ["debug"],
        defaultValue: function(name) {
            var doc = this.instance_[name]
            return !doc || "undefined" == typeof Documentation || !Documentation || doc.model_ && doc.model_.getPrototype && Documentation.isInstance(doc) || (doc.body ? this.instance_[name] = Documentation.create(doc) : this.instance_[name] = Documentation.create({
                body: doc
            })),
            this.instance_[name]
        }
    }, {
        name: "view",
        defaultValue: "foam.ui.DetailView",
        labels: ["debug"]
    }, {
        name: "help",
        defaultValue: "Documentation for this entity.",
        labels: ["debug"]
    }, {
        name: "documentation",
        factory: function() {
            return "The developer documentation for this $$DOC{ref:'.'}. Use a $$DOC{ref:'DocModelView'} to view documentation."
        },
        labels: ["debug"]
    }]
}),
CLASS({
    name: "ImportedProperty",
    extends: "Property",
    label: "A pseudo-property that does not clone its value.",
    properties: [["transient", !0], ["hidden", !0]],
    methods: [function deepCloneProperty(value, cloneArgs) {
        this.cloneProperty(value, cloneArgs)
    }
    , function cloneProperty(value, cloneArgs) {
        cloneArgs[this.name] = value
    }
    ]
}),
CLASS({
    name: "EnumProperty",
    extends: "Property",
    properties: [{
        name: "enum",
        swiftType: "FoamEnum.Type"
    }, {
        name: "view",
        labels: ["javascript"],
        defaultValue: "foam.ui.EnumFieldView"
    }, {
        name: "swiftType",
        defaultValueFn: function() {
            return this.enum.split(".").pop()
        }
    }, {
        name: "swiftNSCoderEncode",
        defaultValue: 'aCoder.encode(`<%= this.name %>`.value, forKey: "<%= this.name %>")'
    }, {
        name: "swiftNSCoderDecode",
        defaultValue: '_ = set("<%= this.name %>", value: aDecoder.decodeObject(forKey: "<%= this.name %>") as AnyObject?)'
    }, {
        name: "swiftAdapt",
        defaultValue: function() {}
    }, {
        name: "javaAdapt",
        defaultValue: function() {}
    }, {
        name: "defaultValue",
        adapt: function(_, v) {
            var e
            return "string" == typeof v && X.lookup(this.enum) ? (e = X.lookup(this.enum))[e[v]] : v
        }
    }, {
        name: "swiftDefaultValue",
        defaultValueFn: function() {
            if ("string" == typeof this.defaultValue && (this.defaultValue = this.defaultValue),
            this.defaultValue && this.defaultValue.name)
                return this.enum.split(".").pop() + "." + this.defaultValue.name
        }
    }, {
        name: "javaDefaultValue",
        defaultValueFn: function() {
            if ("string" == typeof this.defaultValue && (this.defaultValue = this.defaultValue),
            this.defaultValue && this.defaultValue.name)
                return this.enum + "." + this.defaultValue.name
        }
    }, {
        name: "javaType",
        defaultValueFn: function() {
            return this.enum
        }
    }, {
        name: "toPropertyE",
        defaultValue: function(X) {
            return X.lookup("foam.u2.EnumView").create(null, X)
        }
    }, {
        name: "swiftView",
        defaultValue: "FoamEnumUILabel"
    }]
}),
CLASS({
    name: "FObjectProperty",
    extends: "Property",
    help: "Describes a properties of type FObject.",
    label: "FObject",
    properties: [{
        name: "javaType",
        defaultValueFn: function() {
            return this.subType || "FObject"
        }
    }, {
        name: "swiftType",
        defaultValueFn: function() {
            return this.subType ? this.subType.split(".").pop() : "FObject"
        }
    }, {
        name: "swiftNSCoderEncode",
        defaultValue: 'aCoder.encode(`<%= this.name %>`, forKey: "<%= this.name %>")'
    }, {
        name: "swiftNSCoderDecode",
        defaultValue: '_ = set("<%= this.name %>", value: aDecoder.decodeObject(forKey: "<%= this.name %>") as AnyObject?)'
    }, {
        name: "compareProperty",
        swiftDefaultValue: function() {}
    }]
}),
CLASS({
    name: "Template",
    tableProperties: ["name", "description"],
    documentation: function() {},
    properties: [{
        name: "name",
        type: "String",
        required: !0,
        displayWidth: 30,
        displayHeight: 1,
        defaultValue: "",
        help: "The template's unique name.",
        documentation: function() {}
    }, {
        name: "description",
        type: "String",
        labels: ["javascript"],
        required: !0,
        displayWidth: 70,
        displayHeight: 1,
        defaultValue: "",
        help: "The template's description.",
        documentation: "A human readable description of the $$DOC{ref:'.'}."
    }, {
        type: ("Array",
        "Array[Arg]"),
        name: "args",
        subType: "Arg",
        view: "foam.ui.ArrayView",
        factory: function() {
            return []
        },
        help: "Method arguments.",
        documentation: function() {}
    }, {
        name: "template",
        type: "String",
        displayWidth: 180,
        displayHeight: 30,
        defaultValue: "",
        view: "foam.ui.TextAreaView",
        help: "Template text. <%= expr %> or <% out(...); %>",
        documentation: "The string content of the uncompiled $$DOC{ref:'Template'} body."
    }, {
        name: "path"
    }, {
        name: "futureTemplate",
        transient: !0
    }, {
        name: "code",
        transient: !0
    }, {
        type: "Documentation",
        name: "documentation",
        labels: ["debug"]
    }, {
        name: "language",
        type: "String",
        lazyFactory: function() {
            return "CSS" === this.name ? "css" : "html"
        }
    }, {
        name: "labels"
    }],
    methods: [function toE(X) {
        return X.data[this.name]()
    }
    ]
}),
CLASS({
    name: "Action",
    plural: "Actions",
    tableProperties: ["name", "label"],
    documentation: function() {},
    properties: [{
        name: "name",
        type: "String",
        required: !0,
        displayWidth: 30,
        displayHeight: 1,
        defaultValue: "",
        help: "The coding identifier for the action.",
        documentation: function() {}
    }, {
        name: "label",
        type: "String",
        displayWidth: 70,
        displayHeight: 1,
        defaultValueFn: function() {
            return labelize(this.name)
        },
        help: "The display label for the action.",
        documentation: function() {}
    }, {
        name: "speechLabel",
        type: "String",
        displayWidth: 70,
        displayHeight: 1,
        defaultValueFn: function() {
            return this.label
        },
        help: "The speech label for the action.",
        documentation: "A speakable label for the $$DOC{ref:'.'}. Used for accessibility."
    }, {
        name: "help",
        label: "Help Text",
        type: "String",
        displayWidth: 70,
        displayHeight: 6,
        defaultValue: "",
        help: "Help text associated with the action.",
        documentation: function() {}
    }, {
        type: "Documentation",
        name: "documentation",
        documentation: "The developer documentation.",
        labels: ["documentation"]
    }, {
        name: "default",
        type: "Boolean",
        view: "foam.ui.BooleanView",
        defaultValue: !1,
        help: "Indicates if this is the default action.",
        documentation: function() {}
    }, {
        type: "Function",
        name: "isAvailable",
        label: "Available",
        displayWidth: 70,
        displayHeight: 3,
        defaultValue: function() {
            return !0
        },
        help: "Function to determine if action is available.",
        documentation: function() {}
    }, {
        type: "Function",
        name: "isEnabled",
        label: "Enabled",
        displayWidth: 70,
        displayHeight: 3,
        defaultValue: function() {
            return !0
        },
        help: "Function to determine if action is enabled.",
        documentation: function() {}
    }, {
        type: "Function",
        name: "labelFn",
        label: "Label Function",
        defaultValue: function(action) {
            return action.label
        },
        help: "Function to determine label. Defaults to 'this.label'.",
        documentation: function() {}
    }, {
        name: "iconUrl",
        type: "String",
        defaultValue: void 0,
        help: "Provides a url for an icon to render for this action",
        documentation: function() {}
    }, {
        type: "Function",
        name: "iconUrlFn",
        label: "Label Function",
        defaultValue: function(action) {
            return action.iconUrl
        },
        help: "Function to determine iconUrl. Defaults to 'this.iconUrl'.",
        documentation: function() {}
    }, {
        name: "ligature",
        type: "String",
        defaultValue: void 0,
        help: "Provides a ligature for font-based icons for this action",
        documentation: function() {}
    }, {
        name: "showLabel",
        type: "String",
        defaultValue: !0,
        help: "Property indicating whether the label should be rendered alongside the icon",
        documentation: function() {}
    }, {
        name: "children",
        type: "Array",
        factory: function() {
            return []
        },
        subType: "Action",
        view: "foam.ui.ArrayView",
        help: "Child actions of this action.",
        documentation: function() {}
    }, {
        name: "parent",
        type: "String",
        help: "The parent action of this action",
        documentation: function() {}
    }, {
        type: "Function",
        name: "code",
        displayWidth: 80,
        displayHeight: 20,
        defaultValue: "",
        help: "Function to implement action.",
        documentation: function() {}
    }, {
        type: "Function",
        name: "action",
        displayWidth: 80,
        displayHeight: 20,
        defaultValue: "",
        getter: function() {
            return console.log("deprecated use of Action.action"),
            this.code
        },
        setter: function(code) {
            return console.log("deprecated use of Action.action"),
            this.code = code
        }
    }, {
        type: "StringArray",
        name: "keyboardShortcuts",
        documentation: function() {}
    }, {
        name: "translationHint",
        label: "Description for Translation",
        type: "String",
        defaultValue: ""
    }, {
        name: "priority",
        type: "Int",
        defaultValue: 5,
        help: "Measure of importance of showing this action to the user when it is rendered in a list.",
        documentation: function() {}
    }, {
        name: "order",
        type: "Float",
        defaultValue: 5,
        help: "Indication of where this action should appear in an ordered list of actions.",
        documentation: function() {}
    }, {
        type: "String",
        name: "swiftCode",
        labels: ["swift"]
    }, {
        model_: "TemplateProperty",
        name: "swiftSource",
        labels: ["swift"],
        defaultValue: function() {}
    }],
    methods: [function toE(X) {
        return console.assert(X, "X required for Action.toE()."),
        X.lookup("foam.u2.ActionButton").create({
            data: X.data,
            action: this
        }, X)
    }
    , function maybeCall(X, that) {
        return !(!this.isAvailable.call(that, this) || !this.isEnabled.call(that, this)) && (this.code.call(that, X, this),
        that.publish(["action", this.name], this),
        !0)
    }
    ]
}),
CLASS({
    name: "Arg",
    tableProperties: ["type", "name", "description"],
    documentation: function() {},
    properties: [{
        name: "type",
        type: "String",
        required: !0,
        displayWidth: 30,
        displayHeight: 1,
        defaultValue: "Object",
        labels: ["debug"],
        help: "The type of this argument.",
        documentation: function() {}
    }, {
        name: "javaType",
        type: "String",
        required: !1,
        defaultValueFn: function() {
            var type = X.lookup(this.type + "Property")
            if (type)
                return type.create().javaType
        },
        help: "The java type that represents the type of this property.",
        labels: ["java", "compiletime"],
        documentation: function() {}
    }, {
        name: "javaDefaultValue",
        type: "String",
        required: !1,
        labels: ["java", "compiletime"]
    }, {
        name: "javascriptType",
        type: "String",
        required: !1,
        defaultValueFn: function() {
            return this.type
        },
        help: "The javascript type that represents the type of this property.",
        labels: ["debug"],
        documentation: function() {}
    }, {
        name: "swiftType",
        type: "String",
        labels: ["swift", "compiletime"],
        defaultValueFn: function() {
            var type = X.lookup(this.type + "Property")
            if (type)
                return type.create().swiftType
        }
    }, {
        type: "String",
        name: "swiftName",
        labels: ["swift", "compiletime"],
        defaultValueFn: function() {
            return this.name
        }
    }, {
        name: "name",
        type: "String",
        required: !0,
        displayWidth: 30,
        displayHeight: 1,
        defaultValue: "",
        help: "The coding identifier for the entity.",
        documentation: function() {}
    }, {
        type: "Boolean",
        name: "required",
        defaultValue: !0,
        labels: ["debug"],
        documentation: function() {}
    }, {
        name: "defaultValue",
        help: "Default Value if not required and not provided.",
        labels: ["debug"],
        documentation: function() {}
    }, {
        name: "description",
        type: "String",
        displayWidth: 70,
        displayHeight: 1,
        defaultValue: "",
        help: "A brief description of this argument.",
        labels: ["debug"],
        documentation: function() {}
    }, {
        name: "help",
        label: "Help Text",
        type: "String",
        displayWidth: 70,
        displayHeight: 6,
        defaultValue: "",
        help: "Help text associated with the entity.",
        labels: ["debug"],
        documentation: function() {}
    }, {
        type: "Documentation",
        name: "documentation",
        documentation: "The developer documentation.",
        labels: ["debug"]
    }],
    methods: {
        decorateFunction: function(f, i) {
            if ("Object" === this.type)
                return f
            var type = this.type
            return this.required ? function() {
                return console.assert(void 0 !== arguments[i], "Missing required argument# " + i),
                console.assert(typeof arguments[i] === type, "argument# " + i + " type expected to be " + type + ", but was " + typeof arguments[i] + ": " + arguments[i]),
                f.apply(this, arguments)
            }
            : function() {
                return console.assert(void 0 === arguments[i] || typeof arguments[i] === type, "argument# " + i + " type expected to be " + type + ", but was " + typeof arguments[i] + ": " + arguments[i]),
                f.apply(this, arguments)
            }
        }
    },
    templates: [{
        model_: "Template",
        name: "javaSource",
        description: "Java Source",
        template: "<%= this.javaType %> <%= this.name %>",
        labels: ["debug"]
    }, {
        model_: "Template",
        name: "closureSource",
        description: "Closure JavaScript Source",
        template: "@param {<%= this.javascriptType %>} <%= this.name %> .",
        labels: ["debug"]
    }, {
        model_: "Template",
        name: "webIdl",
        description: "Web IDL Source",
        template: "<%= this.type %> <%= this.name %>",
        labels: ["debug"]
    }]
}),
CLASS({
    name: "Constant",
    plural: "constants",
    tableProperties: ["name", "value", "description"],
    documentation: function() {},
    properties: [{
        name: "name",
        type: "String",
        required: !0,
        displayWidth: 30,
        displayHeight: 1,
        defaultValue: "",
        help: "The coding identifier for the entity.",
        documentation: function() {}
    }, {
        type: "String",
        name: "units"
    }, {
        type: "String",
        labels: ["swift"],
        name: "swiftType",
        defaultValueFn: function() {
            var type = X.lookup(this.type + "Property")
            if (type)
                return type.create().swiftType
        }
    }, {
        type: "String",
        labels: ["swift"],
        name: "swiftValue",
        defaultValueFn: function() {
            if (this.type) {
                var type = X.lookup(this.type + "Property")
                if (type)
                    return (type = type.create()).defaultValue = this.value,
                    type.swiftDefaultValue
            }
        }
    }, {
        type: "String",
        labels: ["java"],
        name: "javaType",
        defaultValueFn: function() {
            var type = X.lookup(this.type + "Property")
            if (type)
                return type.create().javaType
        }
    }, {
        type: "String",
        labels: ["java"],
        name: "javaValue",
        defaultValueFn: function() {
            if (this.type) {
                var type = X.lookup(this.type + "Property")
                if (type)
                    return (type = type.create()).defaultValue = this.value,
                    type.javaDefaultValue
            }
        }
    }, {
        name: "description",
        type: "String",
        displayWidth: 70,
        displayHeight: 1,
        defaultValue: "",
        help: "A brief description of this method.",
        documentation: function() {}
    }, {
        type: "Documentation",
        name: "documentation",
        documentation: "The developer documentation.",
        labels: ["debug"]
    }, {
        name: "value",
        help: "The value of the constant."
    }, {
        name: "type",
        defaultValue: "",
        help: "Type of the constant."
    }, {
        name: "translationHint",
        label: "Description for Translation",
        type: "String",
        defaultValue: ""
    }]
}),
CLASS({
    name: "Method",
    plural: "Methods",
    tableProperties: ["name", "description"],
    documentation: function() {},
    properties: [{
        name: "name",
        type: "String",
        required: !0,
        displayWidth: 30,
        displayHeight: 1,
        defaultValue: "",
        help: "The coding identifier for the entity.",
        documentation: function() {}
    }, {
        name: "description",
        type: "String",
        labels: ["javascript"],
        displayWidth: 70,
        displayHeight: 1,
        defaultValue: "",
        help: "A brief description of this method.",
        documentation: function() {}
    }, {
        name: "help",
        label: "Help Text",
        type: "String",
        displayWidth: 70,
        displayHeight: 6,
        defaultValue: "",
        labels: ["debug"],
        help: "Help text associated with the entity.",
        documentation: function() {}
    }, {
        type: "Documentation",
        name: "documentation",
        documentation: "The developer documentation.",
        labels: ["debug"]
    }, {
        name: "code",
        type: "Function",
        displayWidth: 80,
        displayHeight: 30,
        view: "foam.ui.FunctionView",
        help: "Javascript code to implement this method.",
        postSet: function() {
            var multilineComment, multilineComment
            _DOC_ && ((multilineComment = /^\s*function\s*\([\$\s\w\,]*?\)\s*{\s*\/\*([\s\S]*?)\*\/[\s\S]*$|^\s*\/\*([\s\S]*?)\*\/([\s\S]*)/.exec(this.code.toString())) && (multilineComment = multilineComment[1],
            this.documentation = this.Y.Documentation.create({
                name: this.name,
                body: multilineComment
            })))
        },
        documentation: function() {}
    }, {
        name: "returnType",
        defaultValue: "",
        help: "Return type.",
        documentation: function() {},
        labels: ["debug"]
    }, {
        name: "javaReturnType",
        labels: ["java"],
        defaultValueFn: function() {
            if (!this.returnType)
                return "void"
            var type = X.lookup(this.returnType + "Property")
            return type ? type.create().javaType : void 0
        }
    }, {
        name: "swiftReturnType",
        labels: ["swift"],
        defaultValueFn: function() {
            if (!this.returnType)
                return "Void"
            var type = X.lookup(this.returnType + "Property")
            return type ? type.create().swiftType : void 0
        }
    }, {
        type: "Boolean",
        name: "returnTypeRequired",
        defaultValue: !0,
        documentation: function() {},
        labels: ["debug"]
    }, {
        type: ("Array",
        "Array[Arg]"),
        name: "args",
        subType: "Arg",
        view: "foam.ui.ArrayView",
        factory: function() {
            return []
        },
        help: "Method arguments.",
        documentation: function() {},
        labels: ["debug"],
        adapt: function(_, n) {
            return n.forEach(function(arg, i) {
                n[i] = Arg.create(arg)
            }
            .bind(this)),
            n
        }
    }, {
        name: "whenIdle",
        help: "Should this listener be deferred until the system is idle (ie. not running any animations).",
        documentation: function() {}
    }, {
        name: "isMerged",
        help: "As a listener, should this be merged?",
        documentation: function() {}
    }, {
        type: "Boolean",
        name: "isFramed",
        help: "As a listener, should this be animated?",
        defaultValue: !1,
        documentation: function() {}
    }, {
        type: "Boolean",
        name: "isStatic",
        labels: ["java", "swift"]
    }, {
        name: "labels"
    }, {
        name: "isObjC",
        type: "Boolean",
        labels: ["swift"],
        defaultValue: !1,
        help: "Is @objc keyword required."
    }, {
        type: "String",
        name: "swiftCode",
        labels: ["swift"]
    }, {
        type: "String",
        name: "javaCode",
        labels: ["java"]
    }, {
        model_: "TemplateProperty",
        name: "swiftSource",
        labels: ["swift"],
        defaultValue: function() {}
    }, {
        model_: "TemplateProperty",
        name: "javaSource",
        labels: ["java"],
        defaultValue: function() {}
    }],
    methods: [function toE(X) {
        return X.data[this.name]()
    }
    ],
    templates: [{
        model_: "Template",
        name: "closureSource",
        description: "Closure JavaScript Source",
        template: "/**\n<% for ( var i = 0; i < this.args.length ; i++ ) { var arg = this.args[i]; %> * <%= arg.closureSource() %>\n<% } %><% if (this.returnType) { %> * @return {<%= this.returnType %>} .\n<% } %> */\n<%= arguments[1] %>.prototype.<%= this.name %> = goog.abstractMethod;"
    }, {
        model_: "Template",
        name: "webIdl",
        description: "Web IDL Source",
        template: "<%= this.returnType || 'void' %> <%= this.name %>(<% for ( var i = 0 ; i < this.args.length ; i++ ) { var arg = this.args[i]; %><%= arg.webIdl() %><% if ( i < this.args.length-1 ) out(\", \"); %><% } %>)"
    }]
}),
Method.getPrototype().decorateFunction = function(f) {
    for (var i = 0; i < this.args.length; i++) {
        var arg = this.args[i]
        f = arg.decorateFunction(f, i)
    }
    var returnType = this.returnType
    return returnType ? function() {
        var ret = f.apply(this, arguments)
        return console.assert(typeof ret === returnType, "return type expected to be " + returnType + ", but was " + typeof ret + ": " + ret),
        ret
    }
    : f
}
,
Method.getPrototype().generateFunction = function() {
    var f = this.code
    return DEBUG ? this.decorateFunction(f) : f
}
,
Method.methods = {
    decorateFunction: Method.getPrototype().decorateFunction,
    generateFunction: Method.getPrototype().generateFunction
},
CLASS({
    name: "Documentation",
    tableProperties: ["name"],
    documentation: function() {},
    properties: [{
        name: "name",
        type: "String",
        required: !0,
        displayWidth: 30,
        displayHeight: 1,
        defaultValue: "documentation",
        help: "The Document's unique name.",
        documentation: "An optional name for the document. Documentation is normally referenced by the name of the containing Model."
    }, {
        name: "label",
        type: "String",
        required: !0,
        displayWidth: 30,
        displayHeight: 1,
        defaultValue: "",
        help: "The Document's title or descriptive label.",
        documentation: "A human readable title to display. Used for books of documentation and chapters."
    }, {
        name: "body",
        type: "Template",
        defaultValue: "",
        help: "The main content of the document.",
        documentation: "The main body text of the document. Any valid template can be used, including the $$DOC{ref:'foam.documentation.DocView'} specific $$DOC{ref:'foam.documentation.DocView',text:'$$DOC{\"ref\"}'} tag.",
        preSet: function(_, template) {
            return TemplateUtil.expandTemplate(this, template)
        }
    }, {
        type: ("Array",
        "Array[Document]"),
        name: "chapters",
        subtype: "Documentation",
        view: "foam.ui.ArrayView",
        factory: function() {
            return []
        },
        help: "Sub-documents comprising the full body of this document.",
        documentation: "Optional sub-documents to be included in this document. A viewer may choose to provide an index or a table of contents.",
        labels: ["debug"],
        preSet: function(old, nu) {
            if (!_DOC_)
                return []
            var self = this
              , foamalized = []
            return nu.forEach(function(chapter) {
                !chapter || void 0 === self.Y.Documentation || !self.Y.Documentation || chapter.model_ && chapter.model_.getPrototype && self.Y.Documentation.isInstance(chapter) ? foamalized.push(chapter) : chapter.body ? foamalized.push(self.Y.Documentation.create(chapter)) : foamalized.push(self.Y.Documentation.create({
                    body: chapter
                }))
            }),
            foamalized
        }
    }]
}),
CLASS({
    name: "Relationship",
    tableProperties: ["name", "label", "relatedModel", "relatedProperty"],
    documentation: function() {},
    properties: [{
        name: "name",
        type: "String",
        displayWidth: 30,
        displayHeight: 1,
        defaultValueFn: function() {
            return GLOBAL[this.relatedModel] ? GLOBAL[this.relatedModel].plural : ""
        },
        documentation: function() {},
        help: "The coding identifier for the relationship."
    }, {
        name: "label",
        type: "String",
        displayWidth: 70,
        displayHeight: 1,
        defaultValueFn: function() {
            return this.name.labelize()
        },
        documentation: function() {},
        help: "The display label for the relationship."
    }, {
        name: "help",
        label: "Help Text",
        type: "String",
        displayWidth: 70,
        displayHeight: 6,
        defaultValue: "",
        documentation: function() {},
        help: "Help text associated with the relationship."
    }, {
        type: "Documentation",
        name: "documentation",
        documentation: function() {}
    }, {
        name: "relatedModel",
        type: "String",
        required: !0,
        displayWidth: 30,
        displayHeight: 1,
        defaultValue: "",
        documentation: function() {},
        help: "The name of the related Model."
    }, {
        name: "destinationModel",
        type: "String",
        required: !1,
        displayWidth: 30,
        displayHeight: 1
    }, {
        name: "destinationProperty",
        type: "String",
        required: !1,
        displayWidth: 30,
        displayHeight: 1
    }, {
        name: "relatedProperty",
        type: "String",
        required: !0,
        displayWidth: 30,
        displayHeight: 1,
        defaultValue: "",
        documentation: function() {},
        help: "The join property of the related Model."
    }, {
        name: "toRelationshipE",
        labels: ["javascript"],
        defaultValue: function toRelationshipE(X) {
            return X.lookup("foam.u2.DAOController").create(null, X)
        },
        adapt: function(_, nu) {
            return "string" == typeof nu ? function(X) {
                return X.lookup(nu).create(null, X)
            }
            : nu
        }
    }],
    methods: [function toE(X) {
        return X.lookup("foam.u2.RelationshipView").create({
            relationship: this,
            view: this.toRelationshipE(X)
        }, X)
    }
    ]
}),
!function() {
    for (var i = 0; i < Model.templates.length; i++)
        Model.templates[i] = JSONUtil.mapToObj(X, Model.templates[i])
    Model.properties = Model.properties,
    delete Model.instance_.prototype_,
    Model = Model.create(Model)
}(),
recopyModelFeatures(Property),
recopyModelFeatures(Model),
recopyModelFeatures(Method),
recopyModelFeatures(Action),
recopyModelFeatures(Template),
DEBUG)
    for (var id in UNUSED_MODELS)
        USED_MODELS[id] && recopyModelFeatures(GLOBAL.lookup(id))
function or$(values, factory, opt_X) {
    return OrValue.create({
        values: values,
        valueFactory: factory
    }, opt_X)
}
USED_MODELS.Model = !0,
CLASS({
    name: "SimpleValue",
    properties: [{
        name: "value"
    }],
    constants: {
        __isValue__: !0
    },
    methods: [function init(value) {
        this.value = value || ""
    }
    , function get() {
        return this.value
    }
    , function set(val) {
        this.value = val
    }
    , function toString() {
        return "SimpleValue(" + this.value + ")"
    }
    , function follow(srcValue) {
        Events.follow(srcValue, this)
    }
    ]
}),
CLASS({
    name: "FunctionValue",
    extends: "SimpleValue",
    properties: [{
        name: "values",
        factory: function() {
            return []
        }
    }, {
        name: "valueFactory"
    }],
    methods: [function init() {
        this.SUPER(),
        this.valueFactory()
        var f = this.valueFactory
        this.startRecordingDependencies(),
        this.value = f(),
        this.endRecordingDependencies()
        for (var i = 0; i < this.values.length; i++)
            this.values[i].addListener(this.onSubValueChange)
    }
    , function destroy() {
        for (var i = 0; i < this.values.length; i++)
            this.values[i].removeListener(this.onSubValueChange)
    }
    , function startRecordingDependencies() {
        var values = this.values
          , onSubValueChange = this.onSubValueChange
        Events.onGet.push(function(obj, name, value) {
            var obj = obj.propertyValue(name);
            -1 == values.indexOf(obj) && (values.push(obj),
            obj.addListener(onSubValueChange))
        })
    }
    , function endRecordingDependencies() {
        Events.onGet.pop()
    }
    , function get() {
        return this.value
    }
    , function set(val) {}
    , function toString() {
        return "FunctionValue(" + this.value + ")"
    }
    ],
    listeners: [function onSubValueChange_() {
        this.value = this.valueFactory()
    }
    , {
        name: "onSubValueChange",
        isFramed: !0,
        code: function() {
            this.onSubValueChange_()
        }
    }]
}),
CLASS({
    name: "OrValue",
    extends: "SimpleValue",
    properties: [{
        name: "values"
    }, {
        name: "valueFactory",
        defaultValue: function() {
            return arguments
        }
    }],
    methods: [function init() {
        this.SUPER()
        for (var i = 0; i < this.values.length; i++)
            this.values[i].addListener(this.onSubValueChange)
        this.onSubValueChange_()
    }
    , function destroy() {
        for (var i = 0; i < this.values.length; i++)
            this.values[i].removeListener(this.onSubValueChange)
    }
    , function get() {
        return this.value
    }
    , function set(val) {}
    , function toString() {
        return "OrValue(" + this.value + ")"
    }
    ],
    listeners: [function onSubValueChange_() {
        for (var args = new Array(this.values.length), i = 0; i < this.values.length; i++)
            args[i] = this.values[i].get()
        this.value = this.valueFactory.apply(this, args)
    }
    , {
        name: "onSubValueChange",
        isFramed: !0,
        code: function() {
            this.onSubValueChange_()
        }
    }]
}),
CLASS({
    name: "SimpleReadOnlyValue",
    extends: "SimpleValue",
    documentation: "A simple value that can only be set during initialization.",
    properties: [{
        name: "value",
        preSet: function(old, nu) {
            return void 0 === this.instance_.value ? nu : old
        }
    }],
    methods: {
        set: function(val) {
            void 0 === this.instance_.value && this.SUPER(val)
        },
        toString: function() {
            return "SimpleReadOnlyValue(" + this.value + ")"
        }
    }
})
var DOM = {
    init: function(X) {
        X.document.FOAM_OBJECTS || (X.document.FOAM_OBJECTS = {})
        for (var fs = X.document.querySelectorAll("foam"), models = [], i = 0, key; i < fs.length; i++) {
            var e = fs[i]
            X.lookup(e.getAttribute("view")),
            X.lookup(e.getAttribute("model")),
            e.getAttribute("view") && models.push(X.arequire(e.getAttribute("view"))),
            e.getAttribute("model") && models.push(X.arequire(e.getAttribute("model")))
        }
        for (key in USED_MODELS)
            models.push(X.arequire(key))
        atime("DOMInit", aseq(apar.apply(null, models), function(ret) {
            for (var i = 0; i < fs.length; i++) {
                for (var e = fs[i], node = e, body = X.document.body; node && node !== body; )
                    node = node.parentNode
                node && (this.initElement(e, X, X.document),
                e.innerHTML = ""),
                ret()
            }
        }
        .bind(this)))()
    },
    initElementChildren: function(e, X) {
        for (var a = [], i = 0; i < e.children.length; i++) {
            var c = e.children[i]
            "FOAM" === c.tagName && a.push(DOM.initElement(c, X))
        }
        return a
    },
    initElement: function(e, X, opt_document) {
        X.arequire("foam.ui.FoamTagView")(function(t) {
            foam.ui.FoamTagView.create({
                element: e
            }, X)
        })
    },
    setClass: function(e, className, opt_enabled) {
        var oldClassName = e.className || ""
          , opt_enabled = void 0 === opt_enabled || opt_enabled
        e.className = oldClassName.replace(" " + className, "").replace(className, ""),
        opt_enabled && (e.className = e.className + " " + className)
    }
}
function toNum(p) {
    return p.replace ? parseInt(p.replace("px", "")) : p
}
window && window.addEventListener && window.addEventListener("load", function() {
    DOM.init(X)
}, !1)
var DomValue = {
    DEFAULT_EVENT: "change",
    DEFAULT_PROPERTY: "value",
    __isValue__: !0,
    create: function(element, opt_event, opt_property) {
        if (element)
            return {
                __proto__: this,
                element: element,
                event: opt_event || this.DEFAULT_EVENT,
                property: opt_property || this.DEFAULT_PROPERTY
            }
        throw "Missing Element in DomValue"
    },
    setElement: function(element) {
        this.element = element
    },
    get: function() {
        return this.element[this.property]
    },
    set: function(value) {
        this.element[this.property] !== value && (this.element[this.property] = value)
    },
    addListener: function(listener) {
        if (this.event)
            try {
                this.element.addEventListener(this.event, listener, !1)
            } catch (x) {}
    },
    removeListener: function(listener) {
        if (this.event)
            try {
                this.element.removeEventListener(this.event, listener, !1)
            } catch (x) {}
    },
    toString: function() {
        return "DomValue(" + this.event + ", " + this.property + ")"
    }
}
  , __element_map__ = (CLASS({
    name: "DOMValue",
    constants: {
        __isValue__: !0
    },
    properties: [{
        name: "element",
        required: !0
    }, {
        name: "property",
        defaultValue: "value"
    }, {
        name: "event",
        defaultValue: "change"
    }, {
        name: "value",
        postSet: function(_, value) {
            this.element[this.property] = value
        }
    }, {
        name: "firstListener_",
        defaultValue: !0
    }],
    methods: {
        init: function() {
            this.SUPER(),
            this.value = this.element[this.property]
        },
        get: function() {
            return this.value
        },
        set: function(value) {
            this.value = value
        },
        addListener: function(listener) {
            this.firstListener_ && (this.event && this.element.addEventListener(this.event, function() {}, !1),
            this.firstListener_ = !1),
            this.value$.addListener(listener)
        },
        removeListener: function(listener) {
            this.value$.removeListener(listener)
        },
        toString: function() {
            return "DOMValue(" + this.event + ", " + this.property + ")"
        }
    }
}),
{
    INPUT: "foam.u2.tag.Input",
    TEXTAREA: "foam.u2.tag.TextArea",
    SELECT: "foam.u2.tag.Select"
})
function elementForName(nodeName) {
    var modelName = this.__element_map__[(nodeName = nodeName || "div").toUpperCase()], model
    if (modelName)
        return model = this.lookup(modelName),
        console.assert(model, 'Missing Model, Add "' + modelName + '" to your requires: block.'),
        model.create(null, this)
    var modelName = nodeName.indexOf(":")
    return -1 != modelName ? this.elementForFeature(nodeName.substring(0, modelName), nodeName.substring(modelName + 1)) : null
}
function elementForFeature(objName, featureName) {
    var data = this[objName || "data"]
      , objName = objName ? this.sub({
        data: this[objName]
    }) : this
    return data.model_.getFeature(featureName).toE(objName)
}
function registerE(name, model) {
    var m = {
        __proto__: this.__element_map__
    }
    return m[name.toUpperCase()] = model,
    this.set("__element_map__", m),
    this
}
function E(opt_nodeName) {
    this !== X && this !== window || console.log("Deprecated global E() call", new Error)
    var e = this.elementForName && this.elementForName(opt_nodeName)
    return e || (e = this.lookup("foam.u2.Element").create(null, this),
    opt_nodeName && (e.nodeName = opt_nodeName)),
    e
}
function start(opt_nodeName) {
    return this.E(opt_nodeName)
}
X.__element_map__ = __element_map__,
X.elementForName = elementForName,
X.elementForFeature = elementForFeature,
X.registerE = registerE,
X.E = E,
X.start = start,
CLASS({
    package: "foam.ui",
    name: "AbstractDAOView",
    extends: "foam.ui.SimpleView",
    documentation: function() {},
    exports: ["dao as daoViewCurrentDAO"],
    properties: [{
        name: "data",
        postSet: function(oldDAO, dao) {
            this.dao !== dao && (this.dao = dao)
        },
        documentation: function() {}
    }, {
        model_: "foam.core.types.DAOProperty",
        name: "dao",
        label: "DAO",
        help: "An alias for the data property.",
        onDAOUpdate: "onDAOUpdate",
        postSet: function(oldDAO, dao) {
            dao ? this.data !== dao && (this.data = dao) : this.data = ""
        },
        documentation: function() {}
    }],
    methods: {
        onDAOUpdate: function() {}
    }
}),
CLASS({
    package: "foam.ui",
    name: "DAOListView",
    extends: "foam.ui.SimpleView",
    requires: ["SimpleValue"],
    traits: ["foam.ui.DAODataViewTrait"],
    constants: {
        ROW_CLICK: ["row-click"]
    },
    properties: [{
        type: "Boolean",
        name: "isHidden",
        defaultValue: !1,
        postSet: function(_, isHidden) {
            this.dao && !isHidden && this.onDAOUpdate()
        }
    }, {
        type: "ViewFactory",
        name: "rowView",
        defaultValue: "foam.ui.DetailView"
    }, {
        name: "mode",
        defaultValue: "read-write",
        view: {
            factory_: "foam.ui.ChoiceView",
            choices: ["read-only", "read-write", "final"]
        }
    }, {
        name: "useSelection",
        help: "Backward compatibility for selection mode. Create a X.selection$ value in your context instead.",
        postSet: function(old, nu) {
            this.useSelection && !this.X.selection$ && (this.X.selection$ = this.SimpleValue.create()),
            this.selection$ = this.X.selection$
        }
    }, {
        name: "selection",
        help: "Backward compatibility for selection mode. Create a X.selection$ value in your context instead.",
        factory: function() {
            return this.SimpleValue.create()
        }
    }, {
        name: "scrollContainer",
        help: "Containing element that is responsible for scrolling."
    }, {
        name: "chunkSize",
        defaultValue: 0,
        help: "Number of entries to load in each infinite scroll chunk."
    }, {
        name: "chunksLoaded",
        isHidden: !0,
        defaultValue: 1,
        help: "The number of chunks currently loaded."
    }, {
        type: "Boolean",
        name: "painting",
        defaultValue: !1,
        transient: !0
    }, {
        type: "Boolean",
        name: "repaintRequired",
        defaultValue: !1,
        transient: !0
    }, {
        type: "Array",
        name: "propertyListeners_",
        lazyFactory: function() {
            return []
        }
    }],
    methods: {
        init: function() {
            this.SUPER()
            var self = this
            this.subscribe(this.ON_HIDE, function() {
                self.isHidden = !0
            }),
            this.subscribe(this.ON_SHOW, function() {
                self.isHidden = !1
            }),
            this.X.selection$ && (this.selection$ = this.X.selection$)
        },
        initHTML: function() {
            if (this.SUPER(),
            0 < this.chunkSize) {
                for (var e = this.$; e && "scroll" !== window.getComputedStyle(e).overflow; )
                    e = e.parentElement
                this.scrollContainer = e || window,
                this.scrollContainer.addEventListener("scroll", this.onScroll, !1)
            }
            this.isHidden || this.updateHTML()
        },
        construct: function() {
            if (this.dao && this.$) {
                if (this.painting)
                    return this.repaintRequired = !0,
                    undefined
                this.painting = !0
                var out = []
                  , doneFirstItem = (this.children = [],
                !(this.initializers_ = []))
                  , d = this.dao;
                (d = this.chunkSize ? d.limit(this.chunkSize * this.chunksLoaded) : d).select({
                    put: function(o) {
                        "read-write" === this.mode && (o = o.model_.create(o, this.Y))
                        var view = this.rowView({
                            data: o,
                            model: o.model_
                        }, this.Y), itemId
                        view.DAO = this.dao,
                        "read-write" === this.mode && this.addRowPropertyListener(o, view),
                        this.addChild(view),
                        doneFirstItem ? this.separatorToHTML(out) : doneFirstItem = !0,
                        this.X.selection$ && (itemId = this.on("click", function() {
                            this.selection = o,
                            this.publish(this.ROW_CLICK)
                        }
                        .bind(this)),
                        this.setClass("dao-selected", function() {
                            return equals(this.selection, o)
                        }
                        .bind(this), itemId),
                        this.setClass(this.className + "-row", function() {
                            return !0
                        }, itemId),
                        out.push('<div id="' + itemId + '">')),
                        out.push(view.toHTML()),
                        this.X.selection$ && out.push("</div>")
                    }
                    .bind(this)
                })(function() {
                    if (this.repaintRequired)
                        return this.repaintRequired = !1,
                        this.painting = !1,
                        this.realDAOUpdate(),
                        undefined
                    var e = this.$
                    e && (e.innerHTML = out.join(""),
                    this.initInnerHTML(),
                    this.painting = !1)
                }
                .bind(this))
            }
        },
        destroy: function(isParentDestroyed) {
            for (var listeners = this.propertyListeners_, i = 0; i < listeners.length; ++i)
                listeners[i].data.removePropertyListener(null, listeners[i].listener)
            return this.propertyListeners_ = [],
            this.SUPER(isParentDestroyed)
        },
        fromElement: function(e) {
            var children = e.children
            1 == children.length && "rowView" === children[0].nodeName ? this.SUPER(e) : this.rowView = e.innerHTML
        },
        separatorToHTML: function(out) {},
        addRowPropertyListener: function(data, view) {
            var listener = function(o, topic) {
                var prop
                o.model_.getProperty(topic[1]).transient || view.DAO.put(o.deepClone())
            }
            data.addPropertyListener(null, listener),
            this.propertyListeners_.push({
                data: data,
                listener: listener
            })
        }
    },
    listeners: [{
        name: "onDAOUpdate",
        code: function() {
            this.realDAOUpdate()
        }
    }, {
        name: "realDAOUpdate",
        isFramed: !0,
        code: function() {
            this.isHidden || this.updateHTML()
        }
    }, {
        name: "onScroll",
        code: function() {
            var e = this.scrollContainer
            0 < this.chunkSize && e.scrollTop + e.offsetHeight >= e.scrollHeight && (this.chunksLoaded++,
            this.updateHTML())
        }
    }]
}),
CLASS({
    package: "foam.ui",
    name: "DetailView",
    extends: "foam.ui.View",
    requires: ["Property", "foam.ui.TextFieldView", "foam.ui.IntFieldView", "foam.ui.FloatFieldView", "foam.ui.DAOController"],
    exports: ["propertyViewProperty"],
    documentation: function() {},
    properties: [{
        name: "className",
        defaultValue: "detailView",
        documentation: function() {}
    }, {
        name: "data",
        preSet: function(old, nu) {
            return nu.model_ && (this.model = nu.model_),
            nu
        }
    }, {
        name: "model",
        postSet: function(_, model) {
            console.assert(Model.isInstance(model), "Invalid model specified for " + this.name_)
        }
    }, {
        name: "title",
        defaultValueFn: function() {
            return this.model.label
        },
        documentation: function() {}
    }, {
        type: "String",
        name: "mode",
        defaultValue: "read-write",
        documentation: function() {}
    }, {
        type: "Boolean",
        name: "showRelationships",
        defaultValue: !1,
        documentation: function() {}
    }, {
        name: "propertyViewProperty",
        type: "Property",
        defaultValueFn: function() {
            return this.Property.DETAIL_VIEW
        }
    }],
    methods: {
        shouldDestroy: function(old, nu) {
            return !(old && old.model_ && nu && nu.model_) || old.model_ !== nu.model_
        },
        generateContent: function() {
            this.$ && (this.$.outerHTML = this.toHTML(),
            this.initHTML())
        },
        titleHTML: function() {
            var title = this.title
            return title ? '<tr><td colspan="2" class="heading">' + title + "</td></tr>" : ""
        },
        startForm: function() {
            return "<table>"
        },
        endForm: function() {
            return "</table>"
        },
        startColumns: function() {
            return "<tr><td colspan=2><table valign=top><tr><td valign=top><table>"
        },
        nextColumn: function() {
            return "</table></td><td valign=top><table valign=top>"
        },
        endColumns: function() {
            return "</table></td></tr></table></td></tr>"
        },
        rowToHTML: function(prop, view) {
            var str = ""
            return prop.detailViewPreRow && (str += prop.detailViewPreRow(this)),
            str += '<tr class="detail-' + prop.name + '">',
            str = this.DAOController.isInstance(view) ? (str += "<td colspan=2><div class=detailArrayLabel>" + prop.label + "</div>") + view.toHTML() + "</td>" : (str = str + ("<td class='label'>" + prop.label) + "</td><td>") + view.toHTML() + "</td>",
            str += "</tr>",
            prop.detailViewPostRow && (str += prop.detailViewPostRow(this)),
            str
        },
        toHTML: function() {
            if (!this.data)
                return '<span id="' + this.id + '"></span>'
            if (this.model)
                return (this.model.getPrototype().toDetailHTML || this.defaultToHTML).call(this)
            throw "DetailView: either 'data' or 'model' must be specified."
        },
        getDefaultProperties: function() {
            return this.model.getRuntimeProperties()
        },
        defaultToHTML: function() {
            this.children = []
            for (var model = this.model, str = "", properties = (str = (str = (str += '<div id="' + this.id + '" ' + this.cssClassAttr() + '" name="form">') + this.startForm()) + this.titleHTML(),
            this.getDefaultProperties()), i = 0, view; i < properties.length; i++) {
                var prop = properties[i], view
                prop.hidden || (view = this.createView(prop),
                this.addDataChild(view),
                str += this.rowToHTML(prop, view))
            }
            return str += this.endForm(),
            this.showRelationships && (view = this.X.lookup("foam.ui.RelationshipsView").create({
                data: this.data
            }),
            this.addDataChild(view),
            str += view.toHTML()),
            str += "</div>"
        }
    },
    templates: [{
        name: "CSS",
        template: function CSS() {}
    }]
}),
CLASS({
    package: "foam.grammars",
    name: "CSSDecl",
    imports: ["assert"],
    documentation: function() {},
    constants: {
        PREFIXES: ["-webkit-"],
        PREFIXED_KEYS: {
            "align-content": !0,
            "align-items": !0,
            "align-self": !0,
            animation: !0,
            "box-shadow": !0,
            "column-count": !0,
            "column-gap": !0,
            "column-rule": !0,
            display: "flex",
            filter: !0,
            flex: !0,
            "flex-basis": !0,
            "flex-direction": !0,
            "flex-flow": !0,
            "flex-grow": !0,
            "flex-shrink": !0,
            "flex-wrap": !0,
            "font-feature-settings": !0,
            hyphens: !0,
            "justify-content": !0,
            keyframes: !0,
            order: !0,
            transform: !0,
            "transform-origin": !0,
            "user-select": !0
        }
    },
    properties: [{
        name: "parser",
        lazyFactory: function() {
            return SkipGrammar.create(this.parser_, seq("/*", repeat(not("*/", anyChar)), "*/"))
        }
    }, {
        name: "parser_",
        lazyFactory: function() {
            var css = this
            return {
                __proto__: grammar,
                START: sym("stylesheet"),
                ws: alt(" ", "\t", "\n", "\r", "\f"),
                wsc: alt(sym("ws"), ","),
                ws_: repeat0(sym("ws")),
                wsp_: plus0(sym("ws")),
                alphaNum: alt("-", range("a", "z"), range("A", "Z"), range("0", "9")),
                punct: alt(range("!", "'"), range("*", "+"), range("-", "/"), range("<", "@"), range("[", "`"), "|", "~"),
                anp: alt(sym("alphaNum"), sym("punct")),
                stylesheet: str(seq(sym("ws_"), str(repeat(alt(sym("stmtRule"), sym("blockRule")), sym("ws_"))))),
                rulePrefix: plus(str(plus(alt(sym("anp"), ",", "(", ")", ":"))), sym("wsp_")),
                stmtRule: str(seq(sym("rulePrefix"), ";")),
                blockRule: str(seq(sym("rulePrefix"), sym("block"))),
                blockList: str(plus(sym("blockRule"), sym("ws_"))),
                fnArgs: seq("(", sym("ws_"), str(repeat(sym("fnArg"))), ")"),
                fnArg: seq(str(plus(alt(sym("fnArgs"), sym("fnArgIdent")))), repeat(sym("wsc"))),
                fnArgIdent: str(plus(alt(sym("anp"), "{", "}", ";", ":"))),
                declLHS: str(plus(alt(sym("anp"), ",", "(", ")", ";"))),
                declRHS: plus(str(plus(alt(sym("fnArgs"), sym("declRHSIdent")))), sym("wsp_")),
                declRHSIdent: str(plus(alt(sym("anp"), ",", ":"))),
                decl: seq(sym("declLHS"), sym("ws_"), ":", sym("ws_"), sym("declRHS")),
                declList: plus(sym("decl"), seq(";", sym("ws_"))),
                block: seq("{", sym("ws_"), optional(alt(sym("blockList"), sym("declList"))), "}")
            }.addActions({
                rulePrefix: function(parts) {
                    return (parts = parts.map(function(p) {
                        return 0 <= p.indexOf("^") ? p.replace(/\^/g, css.modelName_ + "-") : p
                    })).join(" ")
                },
                block: function(parts) {
                    return "{" + (parts[2] || "") + "}"
                },
                declList: function(parts) {
                    return parts.join(";")
                },
                declRHS: function(parts) {
                    return parts.join(" ")
                },
                decl: function(parts) {
                    var key = parts[0]
                      , value = parts[4]
                      , data = css.PREFIXED_KEYS[key]
                    if (!data || 0 === css.PREFIXES.length)
                        return key + ":" + value
                    var rtn = ""
                    if (!0 === data || data === value)
                        for (var i = 0; i < css.PREFIXES.length; ++i) {
                            var prefix = css.PREFIXES[i]
                            rtn += !0 === data ? prefix + key + ":" + value + ";" : key + ":" + prefix + value + ";"
                        }
                    return rtn += key + ":" + value
                },
                fnArg: function(parts) {
                    return parts[0] + (0 <= parts[1].indexOf(",") ? ", " : " ")
                },
                fnArgs: function(parts) {
                    return "(" + parts[2].trim() + ")"
                }
            })
        }
    }, {
        name: "model",
        documentation: "Optional model which contains this CSS template. Used to expand ^ signs in CSS selectors to the model name.",
        postSet: function(old, nu) {
            nu && (nu.buildPrototype(),
            this.modelName_ = nu.CSS_CLASS || cssClassize(nu.id))
        }
    }, {
        name: "modelName_",
        documentation: "The converted model name itself.",
        adapt: function(old, nu) {
            return "." + nu.split(/ +/).join(".")
        }
    }]
}),
CLASS({
    package: "foam.html",
    name: "Element",
    constants: {
        OPTIONAL_CLOSE_TAGS: {
            HTML: !0,
            HEAD: !0,
            BODY: !0,
            P: !0,
            DT: !0,
            DD: !0,
            LI: !0,
            OPTION: !0,
            THEAD: !0,
            TH: !0,
            TBODY: !0,
            TR: !0,
            TD: !0,
            TFOOT: !0,
            COLGROUP: !0
        },
        ILLEGAL_CLOSE_TAGS: {
            IMG: !0,
            INPUT: !0,
            BR: !0,
            HR: !0,
            FRAME: !0,
            AREA: !0,
            BASE: !0,
            BASEFONT: !0,
            COL: !0,
            ISINDEX: !0,
            LINK: !0,
            META: !0,
            PARAM: !0
        }
    },
    properties: [{
        name: "id"
    }, {
        name: "nodeName"
    }, {
        name: "attributeMap_",
        transient: !0,
        factory: function() {
            return {}
        }
    }, {
        name: "attributes",
        factory: function() {
            return []
        },
        postSet: function(_, attrs) {
            for (var i = 0; i < attrs.length; i++)
                this.attributeMap_[attrs[i].name] = attrs[i]
        }
    }, {
        name: "childNodes",
        factory: function() {
            return []
        }
    }, {
        name: "children",
        transient: !0,
        getter: function() {
            return this.childNodes.filter(function(c) {
                return "string" != typeof c
            })
        }
    }, {
        name: "outerHTML",
        transient: !0,
        getter: function() {
            var out = "<" + this.nodeName, value
            for (key in this.id && (out += ' id="' + this.id + '"'),
            this.attributeMap_) {
                out += null == this.attributeMap_[key].value ? " " + key : " " + key + '="' + this.attributeMap_[key].value + '"'
            }
            return this.ILLEGAL_CLOSE_TAGS[this.nodeName] || this.OPTIONAL_CLOSE_TAGS[this.nodeName] && !this.childNodes.length || (out = (out = out + ">" + this.innerHTML) + "</" + this.nodeName),
            out += ">"
        }
    }, {
        name: "innerHTML",
        transient: !0,
        getter: function() {
            for (var out = "", i = 0; i < this.childNodes.length; i++)
                out += this.childNodes[i].toString()
            return out
        }
    }],
    methods: {
        setAttribute: function(name, value) {
            var attr = this.getAttributeNode(name)
            attr ? attr.value = value : (this.attributes.push(attr = {
                name: name,
                value: value
            }),
            this.attributeMap_[name] = attr)
        },
        getAttributeNode: function(name) {
            return this.attributeMap_[name]
        },
        getAttribute: function(name) {
            var name = this.getAttributeNode(name)
            return name && name.value
        },
        appendChild: function(c) {
            this.childNodes.push(c)
        },
        removeChild: function(c) {
            for (var i = 0; i < this.childNodes.length; ++i)
                if (this.childNodes[i] === c) {
                    this.childNodes.splice(i, 1)
                    break
                }
        },
        toString: function() {
            return this.outerHTML
        }
    }
})
var HTMLParser = {
    __proto__: grammar,
    create: function() {
        return {
            __proto__: this,
            stack: [X.foam.html.Element.create({
                nodeName: "html"
            })]
        }
    },
    peek: function() {
        return this.stack[this.stack.length - 1]
    },
    START: sym("html"),
    html: repeat0(sym("htmlPart")),
    htmlPart: simpleAlt(sym("cdata"), sym("comment"), sym("text"), sym("endTag"), sym("startTag")),
    tag: seq(sym("startTag"), repeat(seq1(1, sym("matchingHTML"), sym("htmlPart")))),
    matchingHTML: function(ps) {
        return 1 < this.stack.length ? ps : null
    },
    startTag: seq("<", sym("tagName"), sym("whitespace"), sym("attributes"), sym("whitespace"), optional("/"), ">"),
    endTag: function() {
        var endTag_ = sym("endTag_")
        return function(ps) {
            return 1 < this.stack.length ? this.parse(endTag_, ps) : void 0
        }
    }(),
    endTag_: seq1(1, "</", sym("tagName"), ">"),
    cdata: seq1(1, "<![CDATA[", str(repeat(not("]]>", anyChar))), "]]>"),
    comment: seq("\x3c!--", repeat0(not("--\x3e", anyChar)), "--\x3e"),
    attributes: repeat(sym("attribute"), sym("whitespace")),
    label: str(plus(notChars(" %=/\t\r\n<>'\""))),
    tagName: sym("label"),
    text: str(plus(alt("<%", notChar("<")))),
    attribute: seq(sym("label"), optional(seq1(1, "=", sym("value")))),
    value: str(alt(plus(alt(range("a", "z"), range("A", "Z"), range("0", "9"))), seq1(1, '"', repeat(notChar('"')), '"'))),
    whitespace: repeat0(alt(" ", "\t", "\r", "\n"))
}.addActions({
    START: function(xs) {
        var ret = this.stack[0]
        return this.stack = [X.foam.html.Element.create({
            nodeName: "html"
        })],
        ret
    },
    tag: function(xs) {
        var ret = this.stack[0]
        return this.stack = [X.foam.html.Element.create({
            nodeName: "html"
        })],
        ret.childNodes[0]
    },
    attribute: function(xs) {
        return {
            name: xs[0],
            value: xs[1]
        }
    },
    cdata: function(xs) {
        this.peek() && this.peek().appendChild(xs)
    },
    text: function(xs) {
        this.peek() && this.peek().appendChild(xs)
    },
    startTag: function(xs) {
        var tag = xs[1]
          , tag = X.foam.html.Element.create({
            nodeName: tag,
            attributes: xs[3]
        })
        return this.peek() && this.peek().appendChild(tag),
        "/" != xs[5] && this.stack.push(tag),
        tag
    },
    endTag: function(tag) {
        for (var stack = this.stack; 1 < stack.length; ) {
            if (this.peek().nodeName === tag)
                return stack.pop(),
                undefined
            var top = stack.pop()
            this.peek().childNodes = this.peek().childNodes.concat(top.childNodes),
            top.childNodes = []
        }
    }
})
  , Visitor = (!function() {
    var registry = {}
    X.registerElement = function(name, model) {
        var start, html
        registry[name] = model,
        TemplateParser.foamTag_ = (start = seq("<", simpleAlt.apply(null, Object.keys(registry).sort(function(o1, o2) {
            return o2.compareTo(o1)
        }).map(function(k) {
            return literal_ic(k)
        })), alt("/", " ", ">")),
        html = HTMLParser.create().export("tag"),
        function(ps) {
            var ps = this.parse(start, ps) && this.parse(html, ps)
            if (!ps)
                return null
            var elem = ps.value
              , model = registry[elem.nodeName]
            return model && elem.setAttribute("model", model),
            ps.setValue(elem)
        }
        ),
        invalidateParsers()
    }
    ,
    X.elementModel = function(name) {
        return registry[name]
    }
}(),
X.registerElement("foam", null),
{
    create: function() {
        return {
            __proto__: this,
            stack: []
        }
    },
    push: function(o) {
        this.stack.push(o)
    },
    pop: function() {
        return this.stack.pop()
    },
    top: function() {
        return this.stack.length && this.stack[this.stack.length - 1]
    },
    visit: function(o) {
        return Array.isArray(o) ? this.visitArray(o) : "string" == typeof o ? this.visitString(o) : "number" == typeof o ? this.visitNumber(o) : o instanceof Function ? this.visitFunction(o) : o instanceof Date ? this.visitDate(o) : !0 === o ? this.visitTrue() : !1 === o ? this.visitFalse() : null === o ? this.visitNull() : o instanceof Object ? o.model_ ? this.visitObject(o) : this.visitMap(o) : this.visitUndefined()
    },
    visitArray: function(o) {
        for (var len = o.length, i = 0; i < len; i++)
            this.visitArrayElement(o, i)
        return o
    },
    visitArrayElement: function(arr, i) {
        this.visit(arr[i])
    },
    visitString: function(o) {
        return o
    },
    visitFunction: function(o) {
        return o
    },
    visitNumber: function(o) {
        return o
    },
    visitDate: function(o) {
        return o
    },
    visitObject: function(o) {
        var properties = o.model_.getRuntimeProperties(), key
        for (key in properties) {
            var prop = properties[key]
            prop.name in o.instance_ && this.visitProperty(o, prop)
        }
        return o
    },
    visitProperty: function(o, prop) {
        this.visit(o[prop.name])
    },
    visitMap: function(o) {
        for (var key in o)
            this.visitMapElement(key, o[key])
        return o
    },
    visitMapElement: function(key, value) {},
    visitTrue: function() {
        return !0
    },
    visitFalse: function() {
        return !1
    },
    visitNull: function() {
        return null
    },
    visitUndefined: function() {
        0
    }
})
  , ObjectToJSON = {
    __proto__: Visitor.create(),
    visitFunction: function(o) {
        return o.toString()
    },
    visitObject: function(o) {
        return this.push({
            model_: (o.model_.package ? o.model_.package + "." : "") + o.model_.name
        }),
        this.__proto__.visitObject.call(this, o),
        this.pop()
    },
    visitProperty: function(o, prop) {
        prop.propertyToJSON(this, this.top(), o)
    },
    visitMap: function(o) {
        return this.push({}),
        Visitor.visitMap.call(this, o),
        this.pop()
    },
    visitMapElement: function(key, value) {
        this.top()[key] = this.visit(value)
    },
    visitArray: function(o) {
        return this.push([]),
        this.__proto__.visitArray.call(this, o),
        this.pop()
    },
    visitArrayElement: function(arr, i) {
        this.top().push(this.visit(arr[i]))
    }
}
  , JSONToObject = {
    __proto__: ObjectToJSON.create(),
    visitObject: function(o) {
        var model = X.lookup(o.model_)
        if (!model)
            throw new Error("Unknown Model: " + o.model_)
        var obj = model.create()
        return Object_forEach(o, function(value, key) {
            "model_" !== key && (obj[key] = this.visit(value))
        }
        .bind(this)),
        obj
    },
    visitArray: Visitor.visitArray,
    visitArrayElement: function(arr, i) {
        arr[i] = this.visit(arr[i])
    }
}
function atxn(afunc) {
    return function(ret) {
        var a
        GLOBAL.__TXN__ ? afunc.apply(this, arguments) : (GLOBAL.__TXN__ = {},
        (a = argsToArray(arguments))[0] = function() {
            GLOBAL.__TXN__ = void 0,
            ret()
        }
        ,
        afunc.apply(this, a))
    }
}
CLASS({
    name: "FilteredDAO_",
    extends: "foam.dao.ProxyDAO",
    documentation: "<p>Internal use only.</p>",
    properties: [{
        name: "query",
        swiftType: "ExprProtocol?",
        swiftDefaultValue: "nil",
        javaType: "foam.core2.ExprInterface",
        required: !0
    }],
    methods: [{
        name: "select",
        code: function(sink, options, opt_X) {
            return this.delegate.select(sink, options ? {
                __proto__: options,
                query: options.query ? AND(this.query, options.query) : this.query
            } : {
                query: this.query
            }, opt_X)
        },
        swiftCode: function() {},
        javaCode: function() {}
    }, {
        name: "removeAll",
        code: function(sink, options, opt_X) {
            return this.delegate.removeAll(sink, options ? {
                __proto__: options,
                query: options.query ? AND(this.query, options.query) : this.query
            } : {
                query: this.query
            }, opt_X)
        },
        swiftCode: function() {},
        javaCode: function() {}
    }, {
        name: "listen",
        code: function(sink, options) {
            return this.SUPER(sink, options ? {
                __proto__: options,
                query: options.query ? AND(this.query, options.query) : this.query
            } : {
                query: this.query
            })
        },
        swiftCode: function() {},
        javaCode: function() {}
    }, function toString() {
        return this.delegate + ".where(" + this.query + ")"
    }
    ]
}),
CLASS({
    name: "OrderedDAO_",
    extends: "foam.dao.ProxyDAO",
    documentation: function() {},
    properties: [{
        name: "comparator",
        required: !0
    }],
    methods: {
        select: function(sink, options, opt_X) {
            return options ? options.order || (options = {
                __proto__: options,
                order: this.comparator
            }) : options = {
                order: this.comparator
            },
            this.delegate.select(sink, options, opt_X)
        },
        toString: function() {
            return this.delegate + ".orderBy(" + this.comparator + ")"
        }
    }
}),
CLASS({
    name: "LimitedDAO_",
    extends: "foam.dao.ProxyDAO",
    documentation: function() {},
    properties: [{
        name: "count",
        required: !0
    }],
    methods: {
        select: function(sink, options, opt_X) {
            return options = options ? "limit"in options ? {
                __proto__: options,
                limit: Math.min(this.count, options.limit)
            } : {
                __proto__: options,
                limit: this.count
            } : {
                limit: this.count
            },
            this.delegate.select(sink, options, opt_X)
        },
        toString: function() {
            return this.delegate + ".limit(" + this.count + ")"
        }
    }
}),
CLASS({
    name: "SkipDAO_",
    extends: "foam.dao.ProxyDAO",
    documentation: function() {},
    properties: [{
        name: "skip",
        required: !0,
        postSet: function() {
            this.skip !== Math.floor(this.skip) && console.warn("skip() called with non-integer value: " + this.skip)
        }
    }],
    methods: {
        select: function(sink, options, opt_X) {
            return options = options ? {
                __proto__: options,
                skip: this.skip
            } : {
                skip: this.skip
            },
            this.delegate.select(sink, options, opt_X)
        },
        toString: function() {
            return this.delegate + ".skip(" + this.skip + ")"
        }
    }
}),
CLASS({
    name: "RelationshipDAO",
    extends: "FilteredDAO_",
    documentation: "Adapts a DAO based on a Relationship.",
    properties: [{
        name: "relatedProperty",
        required: !0
    }, {
        name: "relativeID",
        required: !0
    }, {
        name: "query",
        lazyFactory: function() {
            return AND(NEQ(this.relatedProperty, ""), EQ(this.relatedProperty, this.relativeID))
        }
    }],
    methods: [function put(obj, sink) {
        obj[this.relatedProperty.name] = this.relativeID,
        this.SUPER(obj, sink)
    }
    ]
}),
CLASS({
    name: "AbstractDAO",
    javaClassImports: ["foam.dao.nativesupport.ClosureSink", "foam.dao.nativesupport.DAOQueryOptions", "foam.dao.nativesupport.PredicatedSink", "foam.dao.nativesupport.Sink", "java.util.concurrent.CompletableFuture"],
    documentation: function() {},
    properties: [{
        name: "daoListeners_",
        transient: !0,
        hidden: !0,
        factory: function() {
            return []
        },
        swiftType: "NSMutableArray",
        swiftFactory: "return NSMutableArray()",
        javaType: "java.util.List<foam.dao.nativesupport.Sink>",
        javaFactory: "return new java.util.ArrayList<foam.dao.nativesupport.Sink>();",
        compareProperty: function() {
            return 0
        }
    }],
    methods: [function update(expr) {
        return this.select(UPDATE(expr, this))
    }
    , {
        name: "select",
        code: function(sink, options) {},
        args: [{
            name: "sink",
            swiftType: "Sink = ArraySink()",
            javaType: "foam.dao.nativesupport.Sink"
        }, {
            name: "options",
            swiftType: "DAOQueryOptions = DAOQueryOptions()",
            javaType: "foam.dao.nativesupport.DAOQueryOptions",
            javaDefaultValue: "new foam.dao.nativesupport.DAOQueryOptions()"
        }],
        swiftReturnType: "Future",
        swiftCode: "return Future().set(sink)",
        javaReturnType: "CompletableFuture<foam.dao.nativesupport.Sink>",
        javaCode: "return null;"
    }, {
        name: "put",
        args: [{
            name: "obj",
            swiftType: "FObject",
            javaType: "FObject"
        }, {
            name: "sink",
            swiftType: "Sink = ArraySink()",
            javaType: "foam.dao.nativesupport.Sink",
            javaDefaultValue: "new foam.dao.nativesupport.ArraySink()"
        }],
        swiftCode: "// Override",
        javaCode: "// Override"
    }, {
        name: "remove",
        code: function(query, sink) {},
        args: [{
            name: "obj",
            swiftType: "FObject",
            javaType: "FObject"
        }, {
            name: "sink",
            swiftType: "Sink = ArraySink()",
            javaType: "foam.dao.nativesupport.Sink",
            javaDefaultValue: "new foam.dao.nativesupport.ArraySink()"
        }],
        swiftCode: "// Override",
        javaCode: "// Override"
    }, {
        name: "find",
        code: function(id, sink) {},
        args: [{
            name: "id",
            type: "String"
        }, {
            name: "sink",
            swiftType: "Sink",
            javaType: "foam.dao.nativesupport.Sink"
        }],
        swiftCode: "// Override",
        javaCode: "// Override"
    }, {
        name: "pipe",
        code: function(sink, options) {
            sink = this.decorateSink_(sink, options, !0)
            var fc = this.createFlowControl_()
              , self = this
            this.select({
                put: function() {
                    sink.put && sink.put.apply(sink, arguments)
                },
                remove: function() {
                    sink.remove && sink.remove.apply(sink, arguments)
                },
                error: function() {
                    sink.error && sink.error.apply(sink, arguments)
                },
                eof: function() {
                    fc.stopped ? sink.eof && sink.eof() : self.listen(sink, options)
                }
            }, options, fc)
        },
        args: [{
            name: "sink",
            swiftType: "Sink",
            javaType: "foam.dao.nativesupport.Sink"
        }, {
            name: "options",
            swiftType: "DAOQueryOptions = DAOQueryOptions()",
            javaType: "foam.dao.nativesupport.DAOQueryOptions",
            javaDefaultValue: "new foam.dao.nativesupport.DAOQueryOptions()"
        }],
        swiftCode: function() {},
        javaCode: function() {}
    }, {
        name: "decorateSink_",
        code: function(sink, options, isListener, disableLimit) {
            return options && (disableLimit || (options.limit && (sink = limitedSink(options.limit, sink)),
            options.skip && (sink = skipSink(options.skip, sink))),
            options.order && !isListener && (sink = orderedSink(options.order, sink)),
            options.query && (sink = predicatedSink(options.query.partialEval ? options.query.partialEval() : options.query, sink))),
            sink
        },
        args: [{
            name: "sink",
            swiftType: "Sink",
            javaType: "foam.dao.nativesupport.Sink"
        }, {
            name: "options",
            swiftType: "DAOQueryOptions",
            javaType: "foam.dao.nativesupport.DAOQueryOptions"
        }],
        swiftReturnType: "Sink",
        javaReturnType: "foam.dao.nativesupport.Sink",
        swiftCode: function() {},
        javaCode: function() {}
    }, function createFlowControl_() {
        return {
            stop: function() {
                this.stopped = !0
            },
            error: function(e) {
                this.errorEvt = e
            }
        }
    }
    , {
        name: "where",
        code: function(query) {
            return (this.Y || X).lookup("FilteredDAO_").create({
                query: query,
                delegate: this
            })
        },
        args: [{
            name: "query",
            swiftType: "ExprProtocol",
            javaType: "foam.core2.ExprInterface"
        }],
        swiftReturnType: "AbstractDAO",
        javaReturnType: "AbstractDAO",
        swiftCode: function() {},
        javaCode: function() {}
    }, function limit(count) {
        return (this.Y || X).lookup("LimitedDAO_").create({
            count: count,
            delegate: this
        })
    }
    , function skip(skip) {
        return (this.Y || X).lookup("SkipDAO_").create({
            skip: skip,
            delegate: this
        })
    }
    , function orderBy() {
        return (this.Y || X).lookup("OrderedDAO_").create({
            comparator: 1 == arguments.length ? arguments[0] : argsToArray(arguments),
            delegate: this
        })
    }
    , {
        name: "listen",
        code: function(sink, options) {
            this.daoListeners_.push(this.decorateSink_(sink, options, !0))
        },
        args: [{
            name: "sink",
            swiftType: "Sink",
            javaType: "foam.dao.nativesupport.Sink"
        }, {
            name: "options",
            swiftType: "DAOQueryOptions = DAOQueryOptions()",
            javaType: "foam.dao.nativesupport.DAOQueryOptions",
            javaDefaultValue: "new foam.dao.nativesupport.DAOQueryOptions()"
        }],
        swiftCode: "self.daoListeners_.add(self.decorateSink_(sink, options: options))",
        javaCode: "getDaoListeners_().add(decorateSink_(sink, options));"
    }, {
        name: "unlisten",
        code: function unlisten(sink) {
            for (var ls = this.daoListeners_, i = 0; i < ls.length; i++)
                if (ls[i].$UID === sink.$UID)
                    return ls.splice(i, 1),
                    !0
            DEBUG && console.warn("Phantom DAO unlisten: ", this, sink)
        },
        args: [{
            name: "sink",
            swiftType: "Sink",
            javaType: "foam.dao.nativesupport.Sink"
        }],
        returnType: "Boolean",
        swiftCode: function() {},
        javaCode: function() {}
    }, {
        name: "removeAll",
        code: function(sink, options) {
            var self = this
              , future = afuture()
            return this.select({
                put: function(obj) {
                    self.remove(obj, {
                        remove: sink && sink.remove
                    })
                }
            })(function() {
                sink && sink.eof(),
                future.set()
            }),
            future.get
        },
        args: [{
            name: "sink",
            swiftType: "Sink = ArraySink()",
            javaType: "foam.dao.nativesupport.Sink",
            javaDefaultValue: "new foam.dao.nativesupport.ArraySink()"
        }, {
            name: "options",
            swiftType: "DAOQueryOptions = DAOQueryOptions()",
            javaType: "foam.dao.nativesupport.DAOQueryOptions",
            javaDefaultValue: "new foam.dao.nativesupport.DAOQueryOptions()"
        }],
        swiftReturnType: "Future",
        javaReturnType: "java.util.concurrent.CompletableFuture",
        swiftCode: function() {},
        javaCode: function() {}
    }, {
        name: "notify_",
        code: function(fName, args) {
            for (var i = 0; i < this.daoListeners_.length; i++) {
                var l = this.daoListeners_[i]
                  , fn = l[fName]
                if (fn) {
                    args[2] = {
                        stop: function(fn, l) {
                            return function() {
                                fn(l)
                            }
                        }(this.unlisten.bind(this), l),
                        error: function(e) {}
                    }
                    try {
                        fn.apply(l, args)
                    } catch (err) {
                        err !== this.UNSUBSCRIBE_EXCEPTION && (console.error("Error delivering event (removing listener): ", fName, err),
                        DEBUG && console.error(err.stack)),
                        this.unlisten(l)
                    }
                }
            }
        },
        args: [{
            name: "fName",
            type: "String"
        }, {
            name: "fObj",
            swiftType: "FObject? = nil",
            javaType: "FObject",
            javaDefaultValue: "null"
        }],
        swiftCode: function() {},
        javaCode: function() {}
    }]
}),
Function.prototype.put = function() {
    this.apply(this, arguments)
}
,
Function.prototype.remove = function() {
    this.apply(this, arguments)
}
,
Function.prototype.reset = function() {
    this.call(this)
}
,
!function() {
    var pmap = {}, key, key
    for (key in AbstractDAO.methods)
        pmap[AbstractDAO.methods[key].name] = AbstractDAO.methods[key].code
    for (key in pmap)
        Object.defineProperty(Array.prototype, key, {
            value: pmap[key],
            configurable: !0,
            writable: !0
        })
}(),
defineLazyProperty(Array.prototype, "daoListeners_", function() {
    return {
        value: [],
        configurable: !0
    }
})
var ArraySink = {
    __proto__: Array.prototype,
    put: function(obj, sink) {
        this.push(obj),
        this.notify_("put", arguments),
        sink && sink.put && sink.put(obj)
    },
    clone: function() {
        return this.slice().sink
    },
    deepClone: function() {
        for (var r = new Array(this.length), i = 0; i < this.length; i++)
            r[i] = this[i].deepClone()
        return r.sink
    },
    exprClone: function() {
        return this.deepClone()
    }
}
MODEL0({
    extendsProto: "Array",
    properties: [{
        name: "dao",
        getter: function() {
            return this.__proto__ = Array.prototype,
            this
        }
    }, {
        name: "sink",
        getter: function() {
            return this.__proto__ = ArraySink,
            this
        }
    }],
    methods: {
        listen: AbstractDAO.getPrototype().listen,
        unlisten: AbstractDAO.getPrototype().unlisten,
        notify_: AbstractDAO.getPrototype().notify_,
        put: function(obj, sink) {
            for (var idx = 0; idx < this.length; idx++)
                if (this[idx].id === obj.id)
                    return this[idx] = obj,
                    sink && sink.put && sink.put(obj),
                    this.notify_("put", arguments),
                    undefined
            this.push(obj),
            this.notify_("put", arguments),
            sink && sink.put && sink.put(obj)
        },
        find: function(query, sink) {
            if (query.f) {
                for (var idx = 0; idx < this.length; idx++)
                    if (query.f(this[idx]))
                        return sink && sink.put && sink.put(this[idx]),
                        undefined
            } else
                for (var idx = 0; idx < this.length; idx++)
                    if (this[idx].id === query)
                        return sink && sink.put && sink.put(this[idx]),
                        undefined
            sink && sink.error && sink.error("find", query)
        },
        remove: function(obj, sink) {
            if (!obj)
                return sink && sink.error && sink.error("missing key"),
                undefined
            for (var objId = obj.id, id = void 0 !== objId && "" !== objId ? objId : obj, idx = 0, rem; idx < this.length; idx++) {
                if (this[idx].id === id)
                    return rem = this.splice(idx, 1)[0],
                    this.notify_("remove", [rem]),
                    sink && sink.remove && sink.remove(rem),
                    void 0
            }
            sink && sink.error && sink.error("remove", obj)
        },
        removeAll: function(sink, options) {
            (options = options || {}).query || (options.query = {
                f: function() {
                    return !0
                }
            })
            for (var i = 0; i < this.length; i++) {
                var obj = this[i], obj
                options.query.f(obj) && (obj = this.splice(i, 1)[0],
                this.notify_("remove", [obj]),
                sink && sink.remove && sink.remove(obj),
                i--)
            }
            return sink && sink.eof && sink.eof(),
            anop()
        },
        select: function(sink, options) {
            var hasQuery = options && (options.query || options.order)
              , originalsink = sink = sink || [].sink
            if (sink = this.decorateSink_(sink, options, !1, !hasQuery),
            !hasQuery && GLOBAL.CountExpr && CountExpr.isInstance(sink))
                return sink.count = this.length,
                aconstant(originalsink)
            for (var fc = this.createFlowControl_(), start = Math.max(0, !hasQuery && options && options.skip || 0), end = hasQuery ? this.length : Math.min(this.length, start + (options && options.limit || this.length)), i = start; i < end && (sink.put(this[i], null, fc),
            !fc.stopped); i++)
                if (fc.errorEvt)
                    return sink.error && sink.error(fc.errorEvt),
                    aconstant(originalsink, fc.errorEvt)
            return sink.eof && sink.eof(),
            aconstant(originalsink)
        }
    }
}),
CLASS({
    package: "foam.ui",
    name: "Window",
    exports: ["performance", "$$", "$", "addStyle", "animate", "cancelAnimationFrame", "clearInterval", "clearTimeout", "console", "document", "framed", "dynamic", "dynamicFn", "dynamic2", "dynamic3", "error", "info", "installedModels", "log", "requestAnimationFrame", "setInterval", "setTimeout", "warn", "window", "writeView", "as FOAMWindow"],
    properties: [{
        name: "registeredModels",
        factory: function() {
            return {}
        }
    }, {
        type: "String",
        name: "name",
        defaultValue: "window"
    }, {
        name: "window",
        postSet: function(_, w) {
            this.X.subDocument && this.X.subDocument(w.document),
            w.X = this.Y,
            this.document = w.document,
            this.performance = w.performance
        }
    }, {
        name: "document"
    }, {
        name: "performance"
    }, {
        name: "installedModels",
        documentation: "Each new Window context introduces a new document and resets installedModels so models will install again in the new document.",
        factory: function() {
            return {}
        }
    }, {
        name: "installedStyles",
        factory: function() {
            return {}
        }
    }, {
        type: "Boolean",
        name: "isBackground",
        defaultValue: !1
    }, {
        name: "console",
        lazyFactory: function() {
            return this.window.console
        }
    }],
    methods: {
        addStyle: function(obj) {
            var id = obj.model_.id, obj, id
            this.installedStyles[id] || (this.installedStyles[id] = !0,
            obj = obj.CSS() + "\n\n/*# sourceURL=" + id.replace(/\./g, "/") + ".CSS */\n",
            this.document && this.document.createElement && ((id = this.document.createElement("style")).innerHTML = obj,
            this.document.head.insertBefore(id, this.document.head.firstElementChild)))
        },
        log: function() {
            this.console.log.apply(this.console, arguments)
        },
        warn: function() {
            this.console.warn.apply(this.console, arguments)
        },
        info: function() {
            this.console.info.apply(this.console, arguments)
        },
        error: function() {
            this.console.error.apply(this.console, arguments)
        },
        $: function(id) {
            return this.document.FOAM_OBJECTS && this.document.FOAM_OBJECTS[id] ? this.document.FOAM_OBJECTS[id] : this.document.getElementById(id)
        },
        $$: function(cls) {
            return this.document.getElementsByClassName(cls)
        },
        framed: function(listener) {
            return EventService.framed(listener, this)
        },
        dynamic: function(fn) {
            return 1 == arguments.length ? FunctionValue.create({
                valueFactory: fn
            }, this) : OrValue.create({
                valueFactory: fn,
                values: Array.prototype.splice.call(arguments, 1)
            }, this)
        },
        dynamicFn: function(fn, opt_fn) {
            return Events.dynamicFn(fn, opt_fn, this.Y)
        },
        dynamic2: function(fn) {
            var listener = this.framed(fn)
              , propertyValues = []
              , ret = (fn(),
            Events.onGet.push(function(obj, name, value) {
                if (arguments.callee.caller.caller !== fn)
                    return console.log("false alarm ", fn.toString()),
                    undefined
                var value = obj.propertyValue(name)
                value.addListener(listener),
                propertyValues.push(value)
            }),
            fn())
              , f = (Events.onGet.pop(),
            function() {
                propertyValues.forEach(function(p) {
                    p.removeListener(listener)
                })
            }
            )
            return f.destroy = f
        },
        dynamic3: function(obj, fn, opt_ret) {
            for (var values = fn.dependencies.map(function(name) {
                return obj.propertyValue(name)
            }), listener = this.framed(function() {
                var ret = fn.call(obj)
                opt_ret && opt_ret(ret)
            }), i = 0; i < values.length; i++)
                values[i].addListener(listener)
            var f = function() {
                for (var i = 0; i < values.length; i++)
                    values[i].removeListener(listener)
            }
            return f.destroy = f
        },
        animate: function(duration, fn, opt_interp, opt_onEnd) {
            return Movement.animate(duration, fn, opt_interp, opt_onEnd, this.Y)
        },
        setTimeout: function(f, t) {
            return this.window.setTimeout.apply(this.window, arguments)
        },
        clearTimeout: function(id) {
            this.window.clearTimeout(id)
        },
        setInterval: function(f, t) {
            return this.window.setInterval.apply(this.window, arguments)
        },
        clearInterval: function(id) {
            this.window.clearInterval(id)
        },
        requestAnimationFrame: function(f) {
            return this.isBackground ? this.setTimeout(f, 16) : (console.assert(this.window.requestAnimationFrame, "requestAnimationFrame not defined"),
            this.window.requestAnimationFrame(f))
        },
        cancelAnimationFrame: function(id) {
            if (this.isBackground)
                return this.clearTimeout(id),
                undefined
            this.window.cancelAnimationFrame && this.window.cancelAnimationFrame(id)
        },
        writeView: function(view, opt_X) {
            var opt_X = (opt_X || this).document
              , html = view.toHTML()
            opt_X.body.insertAdjacentHTML("beforeend", html),
            view.initHTML()
        }
    }
}),
!function() {
    var w = foam.ui.Window.create({
        window: window,
        name: "DEFAULT WINDOW",
        isBackground: "object" == typeof process
    }, X)
    FObject.X = X = w.Y
}(),
CLASS({
    name: "IdGenerator",
    package: "foam.i18n",
    methods: [{
        name: "getMessageId",
        code: function(model, msg) {
            return model.name + "_Message_" + msg.name
        }
    }, {
        name: "getActionTextLabelId",
        code: function(model, action) {
            return model.name + "_ActionLabel_" + action.name
        }
    }, {
        name: "getActionSpeechLabelId",
        code: function(model, action) {
            return model.name + "_ActionSpeechLabel_" + action.name
        }
    }]
}),
CLASS({
    name: "Visitor",
    package: "foam.i18n",
    todos: ["When i18n integration is stable: Turn ActionLabel into ActionTextLabel ", "When i18n integration is stable: Include package in model.name prefix"],
    requires: ["foam.i18n.IdGenerator"],
    imports: ["warn"],
    properties: [{
        type: "Boolean",
        name: "revisitModels",
        defaultValue: !1
    }, {
        name: "visitedModels",
        lazyFactory: function() {
            return {}
        }
    }, {
        name: "idGenerator",
        factory: function() {
            return this.IdGenerator.create()
        }
    }],
    methods: [{
        name: "avisitModel",
        code: function(model) {
            if (!this.revisitModels && this.visitedModels[model.id])
                return aconstant(model)
            var self = this, modelPrefix = model.translationHint ? model.translationHint + " " : "", i, key, msg, action
            if (model.messages)
                for (i = 0; i < model.messages.length; ++i)
                    msg = model.messages[i],
                    this.visitMessage(model, msg, i)
            if (model.actions)
                for (i = 0; i < model.actions.length; ++i)
                    (action = model.actions[i]).translationHint && (action.label || action.speechLabel) && this.visitAction(model, action, i)
            return this.visitedModels[model.id] = !0,
            aconstant(model)
        }
    }, {
        name: "visitMessage",
        code: function(model) {
            return this.warn("Visitor without visitMessage implementation: " + this.name_),
            this
        }
    }, {
        name: "visitAction",
        code: function(model) {
            return this.warn("Visitor without visitAction implementation: " + this.name_),
            this
        }
    }]
}),
CLASS({
    name: "MessagesExtractor",
    package: "foam.i18n",
    extends: "foam.i18n.Visitor",
    requires: ["foam.i18n.Message", "foam.i18n.MessageGenerator", "foam.i18n.MessageBundle", "foam.i18n.Placeholder"],
    imports: ["console"],
    properties: [{
        model_: "foam.core.types.DAOProperty",
        name: "dao",
        lazyFactory: function() {
            return []
        }
    }, {
        name: "messageGenerator",
        lazyFactory: function() {
            return this.MessageGenerator.create({
                idGenerator: this.idGenerator
            })
        }
    }, {
        name: "messageBundleFactory",
        lazyFactory: function() {
            return this.MessageBundle.create.bind(this.MessageBundle)
        }
    }],
    methods: [{
        name: "visitMessage",
        code: function(model, msg) {
            var model = this.messageGenerator.generateMessage(model, msg)
            return this.dao.put(model),
            model
        }
    }, {
        name: "visitAction",
        code: function(model, action) {
            for (var msgs = this.messageGenerator.generateActionMessages(model, action), keys = Object.keys(msgs), i = 0; i < keys.length; ++i)
                this.dao.put(msgs[keys[i]])
            return msgs
        }
    }, {
        name: "achromeMessages",
        code: function(ret) {
            var msgs = {}
            this.dao.select({
                put: function(msg) {
                    msgs[msg.id] = msg.toChromeMessage()
                },
                eof: function() {
                    ret(msgs)
                }
            })
        }
    }, {
        name: "amessages",
        code: function(ret) {
            this.abuildMessages_(ret)
        }
    }, {
        name: "amessagesFile",
        code: function(dataId, ret) {
            this.abuildMessages_(function(msgs) {
                msgs.id = dataId,
                ret("__DATA(" + JSONUtil.compact.where(NOT_TRANSIENT).stringify(msgs) + ");")
            })
        }
    }, {
        name: "abuildMessages_",
        code: function(ret) {
            var msgs = this.messageBundleFactory()
              , arr = msgs.messages
            this.dao.select({
                put: function(msg) {
                    arr.push(msg)
                }
                .bind(this),
                eof: function() {
                    ret(msgs)
                }
            })
        }
    }, {
        name: "ai18n",
        code: function(format, ret) {
            throw 'ERROR: i18n output format "' + format + '" not recognized'
        }
    }]
}),
CLASS({
    name: "ChromeMessagesInjector",
    package: "foam.i18n",
    extends: "foam.i18n.Visitor",
    imports: ["warn"],
    methods: [{
        name: "visitMessage",
        code: function(model, msg, msgIdx) {
            this.maybeSetMessage(model.messages[msgIdx], "value", this.idGenerator.getMessageId(model, msg))
        }
    }, {
        name: "visitAction",
        code: function(model, action, actionIdx) {
            action.translationHint && (action.label && this.maybeSetMessage(model.actions[actionIdx], "label", this.idGenerator.getActionTextLabelId(model, action)),
            action.speechLabel && this.maybeSetMessage(model.actions[actionIdx], "speechLabel", this.idGenerator.getActionSpeechLabelId(model, action)))
        }
    }, {
        name: "maybeSetMessage",
        code: function(obj, objKey, msgKey) {
            var i18nMessage = GLOBAL.chrome && GLOBAL.chrome.i18n && GLOBAL.chrome.i18n.getMessage && GLOBAL.chrome.i18n.getMessage(msgKey)
            i18nMessage ? obj[objKey] = i18nMessage : this.warn('ChromeMessagesInjector: "' + msgKey + '": No such message')
        }
    }]
}),
CLASS({
    package: "foam.i18n",
    name: "GlobalController",
    requires: ["foam.i18n.IdGenerator", "foam.i18n.MessagesExtractor", "foam.i18n.MessagesInjector", "foam.i18n.ChromeMessagesInjector"],
    properties: [{
        name: "idGenerator",
        factory: function() {
            return this.IdGenerator.create()
        }
    }, {
        name: "extractor",
        lazyFactory: function() {
            return this.MessagesExtractor.create({
                idGenerator$: this.idGenerator$
            })
        }
    }, {
        name: "injector",
        lazyFactory: function() {
            return (GLOBAL.chrome && GLOBAL.chrome.runtime && GLOBAL.chrome.runtime.id ? this.ChromeMessagesInjector : this.MessagesInjector).create({
                idGenerator$: this.idGenerator$
            })
        }
    }],
    methods: [{
        name: "avisitAllCurrentModels",
        code: function(ret, visitors) {
            for (var par = [], modelNames = Object.keys(USED_MODELS), i = 0; i < modelNames.length; ++i)
                par.push(this.avisitModel(visitors, lookup(modelNames[i])))
            return apar.apply(null, par)
        }
    }, {
        name: "avisitAllKnownModels",
        code: function(visitors) {
            for (var par = [], modelNames, i, modelNames = Object.keys(USED_MODELS), i = 0; i < modelNames.length; ++i)
                par.push(this.avisitModel(visitors, lookup(modelNames[i])))
            for (modelNames = Object.keys(UNUSED_MODELS),
            i = 0; i < modelNames.length; ++i)
                par.push(this.avisitModel(visitors, lookup(modelNames[i])))
            return apar.apply(null, par)
        }
    }, {
        name: "avisitModel",
        code: function(visitors, model) {
            for (var par = [], i = 0; i < visitors.length; ++i)
                par.push(visitors[i].avisitModel(model))
            return apar.apply(null, par)
        }
    }]
}),
X.arequire("foam.i18n.GlobalController")(function(GlobalController) {
    var i18nGC = GlobalController.create()
    GLOBAL.X.i18nModel = function(ret, model, X) {
        i18nGC.avisitModel([i18nGC.injector], model)(ret)
    }
}),
CLASS({
    package: "foam.apps.calc",
    name: "Calc",
    requires: ["foam.apps.calc.CalcView", "foam.apps.calc.History", "foam.apps.calc.NumberFormatter", "foam.graphics.ActionButtonCView", "foam.graphics.CViewView", "foam.input.touch.GestureManager", "foam.input.touch.TouchManager", "foam.ui.animated.Label", "foam.ui.md.Flare", "foam.ui.DAOListView", "AbstractDAO"],
    exports: ["gestureManager", "touchManager"],
    properties: [{
        name: "numberFormatter",
        factory: function() {
            return this.NumberFormatter.create()
        }
    }, {
        name: "degreesMode"
    }, {
        name: "memory",
        defaultValue: 0
    }, {
        name: "a1",
        defaultValue: 0
    }, {
        name: "a2",
        defaultValue: ""
    }, {
        name: "editable",
        defaultValue: !0
    }, {
        name: "statusRipples",
        defaultValue: !0
    }, {
        name: "op",
        factory: function() {
            return this.DEFAULT_OP
        }
    }, {
        model_: "ArrayProperty",
        name: "history",
        type: "Array",
        view: "foam.ui.DAOListView",
        factory: function() {
            return [].sink
        }
    }, {
        model_: "StringProperty",
        name: "row1",
        type: "String",
        view: "foam.ui.animated.Label"
    }, {
        name: "touchManager",
        factory: function() {
            var tm = this.TouchManager.create()
            return window.X.touchManager = tm
        }
    }, {
        name: "gestureManager",
        factory: function() {
            var gm = this.GestureManager.create()
            return window.X.gestureManager = gm
        }
    }],
    actions: [{
        model_: "foam.apps.calc.Num",
        n: 1
    }, {
        model_: "foam.apps.calc.Num",
        n: 2
    }, {
        model_: "foam.apps.calc.Num",
        n: 3
    }, {
        model_: "foam.apps.calc.Num",
        n: 4
    }, {
        model_: "foam.apps.calc.Num",
        n: 5
    }, {
        model_: "foam.apps.calc.Num",
        n: 6
    }, {
        model_: "foam.apps.calc.Num",
        n: 7
    }, {
        model_: "foam.apps.calc.Num",
        n: 8
    }, {
        model_: "foam.apps.calc.Num",
        n: 9
    }, {
        model_: "foam.apps.calc.Num",
        n: 0
    }, {
        model_: "foam.apps.calc.Binary",
        name: "div",
        speechLabel: "divide",
        keyboardShortcuts: ["/"],
        f: function(a1, a2) {
            return a1 / a2
        },
        label: "÷"
    }, {
        model_: "foam.apps.calc.Binary",
        name: "mult",
        speechLabel: "multiply",
        keyboardShortcuts: ["*", "x"],
        f: function(a1, a2) {
            return a1 * a2
        },
        label: "×"
    }, {
        model_: "foam.apps.calc.Binary",
        name: "plus",
        speechLabel: "plus",
        keyboardShortcuts: ["+"],
        f: function(a1, a2) {
            return a1 + a2
        },
        label: "+"
    }, {
        model_: "foam.apps.calc.Binary",
        name: "minus",
        speechLabel: "minus",
        keyboardShortcuts: ["-"],
        f: function(a1, a2) {
            return a1 - a2
        },
        label: "–"
    }, {
        name: "ac",
        label: "AC",
        speechLabel: "all clear",
        code: function() {
            var now
            this.row1 = "",
            this.a1 = "0",
            this.a2 = "",
            this.editable = !0,
            this.op = this.DEFAULT_OP,
            this.history = [].sink,
            this.X.$$("calc-display")[0] && this.statusRipples && (now = Date.now(),
            this.lastFlare_ && now - this.lastFlare_ < 1e3 || (this.lastFlare_ = now,
            this.statusRipples && this.Flare.create({
                element: this.X.$$("calc-display")[0],
                color: "#2196F3"
            }).fire(),
            this.X.window.getSelection().removeAllRanges()))
        },
        keyboardShortcuts: ["a", "c"],
        translationHint: "all clear (calculator button label)"
    }, {
        name: "sign",
        label: "+/-",
        speechLabel: "negate",
        code: function() {
            this.a2 = -this.a2
        },
        keyboardShortcuts: ["n"],
        translationHint: "switch positive/negative sign of number"
    }, {
        name: "point",
        speechLabel: "point",
        labelFn: function() {
            return this.numberFormatter.useComma ? "," : "."
        },
        code: function() {
            this.editable ? -1 == this.a2.toString().indexOf(".") && (this.a2 = (this.a2 || "0") + ".",
            this.editable = !0) : (this.push("0."),
            this.editable = !0)
        },
        keyboardShortcuts: [".", ","],
        translationHint: "decimal point"
    }, {
        name: "equals",
        label: "=",
        speechLabel: "equals",
        code: function() {
            if ("string" != typeof this.a2 || "" != this.a2) {
                if (this.op == this.DEFAULT_OP) {
                    var last = this.history[this.history.length - 1]
                    if (!last || last.op === this.DEFAULT_OP)
                        return
                    last.op.binary ? (this.push(this.a2),
                    this.a2 = last.a2) : this.a1 = this.a2,
                    this.op = last.op
                }
                this.push(this.op(parseFloat(this.a1), parseFloat(this.a2))),
                this.editable = !1
            }
        },
        keyboardShortcuts: ["=", 13],
        translationHint: "compute operation and display result"
    }, {
        name: "backspace",
        label: "⌫",
        speechLabel: "backspace",
        code: function() {
            var selection = this.X.window.getSelection().toString()
            if (selection && selection.split("\n").length == this.history.length + 1)
                return this.ac(),
                undefined
            this.editable && (this.a2.toString().length ? this.a2 = this.a2.toString().substring(0, this.a2.length - 1) : this.op = this.DEFAULT_OP)
        },
        keyboardShortcuts: [8],
        translationHint: "delete one input character"
    }, {
        name: "pi",
        label: "π",
        code: function() {
            this.a2 = Math.PI
        },
        keyboardShortcuts: ["p"],
        translationHint: "mathematical constant, pi"
    }, {
        name: "e",
        label: "e",
        code: function() {
            this.a2 = Math.E
        },
        keyboardShortcuts: ["e"],
        translationHint: "mathematical constant, e"
    }, {
        name: "percent",
        label: "%",
        speechLabel: "percent",
        code: function() {
            this.a2 /= 100
        },
        keyboardShortcuts: ["%"],
        translationHint: "convert number to percentage"
    }, {
        model_: "foam.apps.calc.Unary",
        name: "inv",
        speechLabel: "inverse",
        keyboardShortcuts: ["i"],
        f: function(a) {
            return 1 / a
        },
        label: "1/x"
    }, {
        model_: "foam.apps.calc.Unary",
        name: "sqroot",
        speechLabel: "square root",
        f: function(a) {
            return Math.sqrt(a)
        },
        label: "√"
    }, {
        model_: "foam.apps.calc.Unary",
        name: "square",
        speechLabel: "x squared",
        keyboardShortcuts: ["@"],
        f: function(a) {
            return a * a
        },
        label: "x²"
    }, {
        model_: "foam.apps.calc.Unary",
        name: "ln",
        speechLabel: "natural logarithm",
        f: function(a) {
            return Math.log(a)
        }
    }, {
        model_: "foam.apps.calc.Unary",
        name: "exp",
        speechLabel: "e to the power of n",
        f: function(a) {
            return Math.exp(a)
        },
        label: "eⁿ"
    }, {
        model_: "foam.apps.calc.Unary",
        name: "log",
        speechLabel: "log base 10",
        f: function(a) {
            return Math.log(a) / Math.LN10
        }
    }, {
        model_: "foam.apps.calc.Binary",
        name: "root",
        speechLabel: "the enth root of y",
        f: function(a1, a2) {
            return Math.pow(a2, 1 / a1)
        },
        label: "ⁿ √Y"
    }, {
        model_: "foam.apps.calc.Binary",
        name: "pow",
        speechLabel: "y to the power of n",
        keyboardShortcuts: ["^"],
        f: function(a1, a2) {
            return Math.pow(a1, a2)
        },
        label: "yⁿ"
    }, {
        name: "deg",
        speechLabel: "switch to degrees",
        code: function() {
            this.degreesMode = !0,
            document.getElementById("deg-label").setAttribute("aria-label", this.model_.DEG.label)
        },
        translationHint: 'short form for "degrees" calculator mode'
    }, {
        name: "rad",
        speechLabel: "switch to radians",
        code: function() {
            this.degreesMode = !1,
            document.getElementById("deg-label").setAttribute("aria-label", this.model_.RAD.label)
        },
        translationHint: 'short form for "radians" calculator mode'
    }, {
        model_: "foam.apps.calc.Unary",
        name: "sin",
        speechLabel: "sine",
        f: function(a) {
            return Math.sin(this.degreesMode ? a * Math.PI / 180 : a)
        }
    }, {
        model_: "foam.apps.calc.Unary",
        name: "cos",
        speechLabel: "cosine",
        f: function(a) {
            return Math.cos(this.degreesMode ? a * Math.PI / 180 : a)
        }
    }, {
        model_: "foam.apps.calc.Unary",
        name: "tan",
        speechLabel: "tangent",
        f: function(a) {
            return Math.tan(this.degreesMode ? a * Math.PI / 180 : a)
        }
    }, {
        model_: "foam.apps.calc.Unary",
        name: "asin",
        speechLabel: "arcsine",
        f: function(a) {
            return Math.asin(a) * (this.degreesMode ? 180 / Math.PI : 1)
        }
    }, {
        model_: "foam.apps.calc.Unary",
        name: "acos",
        speechLabel: "arccosine",
        f: function(a) {
            return Math.acos(a) * (this.degreesMode ? 180 / Math.PI : 1)
        }
    }, {
        model_: "foam.apps.calc.Unary",
        name: "atan",
        speechLabel: "arctangent",
        f: function(a) {
            return Math.atan(a) * (this.degreesMode ? 180 / Math.PI : 1)
        }
    }, {
        model_: "foam.apps.calc.Unary",
        name: "fact",
        speechLabel: "factorial",
        keyboardShortcuts: ["!"],
        f: function(n) {
            return this.factorial(n)
        },
        label: "x!"
    }, {
        model_: "foam.apps.calc.Binary",
        name: "mod",
        speechLabel: "modulo",
        f: function(a1, a2) {
            return a1 % a2
        }
    }, {
        model_: "foam.apps.calc.Binary",
        name: "p",
        speechLabel: "permutation",
        f: function(n, r) {
            return this.permutation(n, r)
        },
        label: "nPr"
    }, {
        model_: "foam.apps.calc.Binary",
        name: "c",
        speechLabel: "combination",
        f: function(n, r) {
            return this.combination(n, r)
        },
        label: "nCr"
    }, {
        model_: "foam.apps.calc.Unary",
        name: "round",
        speechLabel: "round",
        f: function(a) {
            return Math.round(a)
        },
        label: "rnd"
    }, {
        name: "rand",
        speechLabel: "random",
        code: function() {
            this.a2 = Math.random()
        },
        translationHint: "generate random number"
    }, {
        model_: "foam.apps.calc.Unary",
        name: "store",
        speechLabel: "store in memory",
        f: function(n) {
            return this.memory = n
        },
        label: "a="
    }, {
        name: "fetch",
        label: "a",
        speechLabel: "fetch from memory",
        code: function() {
            this.a2 = this.memory
        },
        translationHint: "load memorized number"
    }, {
        name: "toggleStatusRipples",
        code: function() {
            this.statusRipples = !this.statusRipples
        },
        keyboardShortcuts: ["f"]
    }],
    constants: [{
        name: "MAX_HISTORY",
        value: 30
    }, {
        name: "DEFAULT_OP",
        value: function(a1, a2) {
            return a2
        }
    }],
    messages: [{
        model_: "Message",
        name: "CalcName",
        value: "Calculator",
        translationHint: "name of application for performing simple calculations"
    }, {
        model_: "Message",
        name: "CalcHistory",
        value: "Calculator History",
        translationHint: "name of the section of the calculator which contains a history of recent computations"
    }, {
        model_: "Message",
        name: "CalcDisplay",
        value: "Calculator Display",
        translationHint: "name of the section of the calculator which shows the current number being built"
    }, {
        model_: "Message",
        name: "CalcKeypad",
        value: "Keypad",
        translationHint: "name of the section of the calculator which contains the action buttons"
    }],
    methods: [function init() {
        this.SUPER(),
        this.DEFAULT_OP.label = "",
        !1 in Math && (Math.log10 = function(a) {
            return Math.log(a) / Math.LN10
        }
        ),
        Events.dynamicFn(function() {
            this.op,
            this.a2
        }
        .bind(this), EventService.framed(function() {
            Number.isNaN(this.a2) && this.error()
            var a2 = this.numberFormatter.formatNumber(this.a2)
            this.row1 = this.op.label + (this.op.label && a2 ? "&nbsp;" : "") + a2
        }
        .bind(this)))
    }
    , function gamma(z) {
        return Math.sqrt(2 * Math.PI / z) * Math.pow(1 / Math.E * (z + 1 / (12 * z - 1 / (10 * z))), z)
    }
    , function factorial(n) {
        if (170 < n)
            return this.error(),
            1 / 0
        if (n = parseFloat(n),
        !Number.isInteger(n))
            return this.gamma(n + 1)
        for (var r = 1; 0 < n; )
            r *= n--
        return r
    }
    , function permutation(n, r) {
        return this.factorial(n) / this.factorial(n - r)
    }
    , function combination(n, r) {
        return this.permutation(n, r) / this.factorial(r)
    }
    , function error() {
        this.X.$$("calc-display")[0] && setTimeout(this.Flare.create({
            element: this.X.$$("calc-display")[0],
            color: "#f44336"
        }).fire, 100),
        this.history.put(this.History.create({
            op: this.op,
            a2: this.a2,
            sayEquals: this.shouldSayEqual(),
            numberFormatter: this.numberFormatter
        })),
        this.a1 = 0,
        this.a2 = "",
        this.op = this.DEFAULT_OP,
        this.row1 = "",
        this.editable = !0
    }
    , function shouldSayEqual() {
        return 0 !== this.history.length && (!this.op.label && !this.history[this.history.length - 1].sayEquals)
    }
    , function push(a2, opt_op) {
        for (a2 == this.a2 && (opt_op || this.DEFAULT_OP) == this.op || (this.row1 = ""),
        this.history.put(this.History.create({
            op: this.op,
            a2: this.a2,
            sayEquals: this.shouldSayEqual(),
            numberFormatter: this.numberFormatter
        })); this.history.length > this.MAX_HISTORY; )
            this.history.shift()
        this.a1 = this.a2,
        this.op = opt_op || this.DEFAULT_OP,
        this.a2 = a2
    }
    , function replace(op) {
        this.op = op || this.DEFAULT_OP
    }
    ],
    translationHint: "Calculator"
}),
CLASS({
    package: "foam.apps.calc",
    name: "CalcView",
    extends: "foam.ui.View",
    requires: ["foam.apps.calc.CalcButton", "foam.apps.calc.CalcSpeechView", "foam.apps.calc.Fonts", "foam.apps.calc.HistoryCitationView", "foam.apps.calc.MainButtonsView", "foam.apps.calc.NumberFormatter", "foam.apps.calc.SecondaryButtonsView", "foam.apps.calc.TertiaryButtonsView", "foam.ui.SlidePanel", "foam.ui.animated.Label"],
    imports: ["document"],
    exports: ["data"],
    properties: [{
        model_: "StringProperty",
        name: "row1Formatted",
        type: "String",
        preSet: function(_, n) {
            return this.numberFormatter.i18nNumber(n)
        },
        view: "foam.ui.animated.Label"
    }, {
        name: "data",
        postSet: function() {
            this.numberFormatter = this.data.numberFormatter,
            Events.follow(this.data.row1$, this.row1Formatted$)
        }
    }, {
        name: "installFonts_",
        visibility: "hidden",
        hidden: !0,
        factory: function() {
            return this.document.head.querySelector("link[rel=stylesheet][href*=Roboto]") ? "" : this.Fonts.create()
        }
    }, {
        model_: "IntProperty",
        name: "animating_",
        type: "Int",
        postSet: function(old, nu) {
            var old, nu
            nu || old === nu || !this.$ || (old = this.$outer.clientHeight,
            nu = this.$inner.clientHeight,
            this.$inner.style.top = nu < old ? "calc(100% - " + nu + "px)" : "0px")
        },
        defaultValue: !1
    }, {
        name: "$inner",
        getter: function() {
            return this.$.querySelector(".inner-calc-display")
        }
    }, {
        name: "$outer",
        getter: function() {
            return this.$.querySelector(".calc-display")
        }
    }],
    messages: [{
        model_: "Message",
        name: "secondaryPanelOpened",
        value: "Secondary panel open",
        translationHint: "Speech message when the secondary panel of additional buttons is opened"
    }, {
        model_: "Message",
        name: "secondaryPanelClosed",
        value: "Secondary panel closed",
        translationHint: "Speech message when the secondary panel of additional buttons is closed"
    }, {
        model_: "Message",
        name: "tertiaryPanelOpened",
        value: "Tertiary panel open",
        translationHint: "Speech message when the tertiary panel of additional buttons is opened"
    }, {
        model_: "Message",
        name: "tertiaryPanelClosed",
        value: "Tertiary panel closed",
        translationHint: "Speech message when the tertiary panel of additional buttons is closed"
    }],
    methods: [function initHTML() {
        this.SUPER(),
        this.document.addEventListener("paste", this.onPaste),
        this.document.addEventListener("copy", this.onCopy),
        this.document.addEventListener("keyup", this.onKeyUp)
        var move = EventService.framed(EventService.framed(function() {
            var value
            this.$ && (value = DOMValue.create({
                element: this.$outer,
                property: "scrollTop"
            }),
            Movement.compile([function() {
                ++this.animating_
            }
            .bind(this), [200, function() {
                value.value = this.$inner.clientHeight
            }
            .bind(this)], function() {
                --this.animating_
            }
            .bind(this)])())
        }
        .bind(this)))
        Events.dynamicFn(function() {
            this.data.op,
            this.data.history,
            this.data.a1,
            this.data.a2
        }
        .bind(this), move),
        this.X.window.addEventListener("resize", move),
        this.$.querySelector(".keypad").addEventListener("mousedown", function(e) {
            return e.preventDefault(),
            !1
        }),
        this.document.body.setAttribute("aria-label", this.data.model_.CALC_NAME.value)
    }
    , function addArrowData(e, data) {
        e.setAttribute("data-arrow-up", data[0]),
        e.setAttribute("data-arrow-down", data[1]),
        e.setAttribute("data-arrow-left", data[2]),
        e.setAttribute("data-arrow-right", data[3])
    }
    ],
    listeners: [{
        name: "onPaste",
        code: function(evt) {
            for (var CMD = {
                0: "0",
                1: "1",
                2: "2",
                3: "3",
                4: "4",
                5: "5",
                6: "6",
                7: "7",
                8: "8",
                9: "9",
                "+": "plus",
                "-": "minus",
                "*": "mult",
                "/": "div",
                "%": "percent",
                "=": "equals"
            }, data = (CMD[this.data.numberFormatter.useComma ? "," : "."] = "point",
            evt.clipboardData.getData("text/plain")), i = 0; i < data.length; i++) {
                var c = data.charAt(i)
                  , c = ("-" !== c || i || this.data.history.length || this.data.row1 || this.data[0](),
                CMD[c])
                c && this.data[c]()
            }
        },
        whenIdle: !0
    }, {
        name: "onCopy",
        code: function(evt) {
            "history" !== evt.target.className && document.getSelection().selectAllChildren(this.row1FormattedView.$)
        }
    }, {
        name: "onKeyUp",
        code: function(evt) {
            var curr = this.document.activeElement
            const f1 = document.querySelector(".f1")
              , historyNodeList = (this.addArrowData(document.body, [null, ".f1", null, null]),
            this.addArrowData(f1, ["body", '[aria-label="7"]', null, null]),
            document.querySelectorAll(".history"))
              , history = Array(historyNodeList.length).fill(0).map(function(_, i) {
                return historyNodeList[i]
            })
            var prev = {
                elem: document.body,
                selector: "body"
            }
            history.map(function(e, i) {
                var i = ".inner-calc-display>span>.history:nth-of-type(" + (i + 1) + ")"
                prev.elem.setAttribute("data-arrow-down", i),
                this.addArrowData(e, [prev.selector, ".f1", null, null]),
                f1.setAttribute("data-arrow-up", i),
                prev = {
                    elem: e,
                    selector: i
                }
            }
            .bind(this)),
            "ArrowUp" === evt.code && "null" !== curr.dataset.arrowUp && document.querySelector(curr.dataset.arrowUp).focus(),
            "ArrowDown" === evt.code && "null" !== curr.dataset.arrowDown && document.querySelector(curr.dataset.arrowDown).focus(),
            "ArrowLeft" === evt.code && "null" !== curr.dataset.arrowLeft && document.querySelector(curr.dataset.arrowLeft).focus(),
            "ArrowRight" === evt.code && "null" !== curr.dataset.arrowRight && document.querySelector(curr.dataset.arrowRight).focus()
        }
    }],
    templates: [{
        name: "CSS",
        code: ConstantTemplate(".CalcView *{box-sizing:border-box;outline:none}.CalcView{-webkit-user-select:none;-webkit-font-smoothing:antialiased;font-family:Roboto, 'Helvetica Neue', Helvetica, Arial;font-size:30px;font-weight:300;height:100%;position:fixed;margin:0;padding:0;width:100%}.CalcView ::-webkit-scrollbar{display:none}.CalcView ::-webkit-scrollbar-thumb{display:none}.calc{background-color:#eee;border:0;display:-webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column;height:100%;margin:0;padding:0px}.deg, .rad{background-color:#eee;color:#111;font-size:22px;font-weight:400;opacity:0;margin-left:8px;margin-right:10px;transition:opacity 0.8s}.active{opacity:1;z-index:2}.calc-display, .calc-display:focus{border:none;letter-spacing:1px;line-height:36px;margin:0;min-width:140px;padding:0 25pt 2pt 25pt;text-align:right;-webkit-user-select:text;overflow-y:scroll;overflow-x:hidden}.edge{background:linear-gradient(to bottom, rgba(240, 240, 240, 1) 0%, rgba(240, 240, 240, 0) 100%);height:20px;position:absolute;top:0;width:100%;z-index:1}.calc .buttons{-webkit-flex:1 1 100%;flex:1 1 100%;width:100%;height:252px}.button-row{display:-webkit-flex;display:flex;-webkit-flex-direction:row;flex-direction:row;-webkit-flex-wrap:nowrap;flex-wrap:nowrap;-webkit-flex:1 1 100%;flex:1 1 100%;-webkit-justify-content:space-between;justify-content:space-between}.button{-webkit-flex-grow:1;flex-grow:1;-webkit-justify-content:center;justify-content:center;display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;background-color:#333}.rhs-ops{border-left-width:1px;border-left-style:solid;border-left-color:rgb(68, 68, 68);background:#4a4a4a}.rhs-ops .button{background-color:#4a4a4a}.history{padding:2px;padding-right:7pt;width:calc(100% - 7pt - 2px)}.history:focus-within{padding:0px;padding-right:calc(7pt - 2px);border:2px solid rgba(52, 153, 128, 0.65);border-radius:10px}.button-column{display:-webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column;-webkit-flex-wrap:nowrap;flex-wrap:nowrap}.inner-calc-display{position:absolute;right:15pt;top:100%;width:calc(100% - 17pt);margin:1pt 0pt;padding:11px 2px}.inner-calc-display:focus{border:2px solid rgba(52, 153, 128, 0.65);border-radius:10px;padding:9px 0px}.calc-display{-webkit-flex-grow:5;flex-grow:5;position:relative}.secondaryButtons{padding-left:30px;background:#00796b}.secondaryButtons .button{background:#00796b}.tertiaryButtons{padding-left:35px;background:#1de9b6}.tertiaryButtons .button{background:#1de9b6}.keypad{-webkit-flex-grow:0;flex-grow:0;-webkit-flex-shrink:0;flex-shrink:0;margin-bottom:-4px;z-index:5;padding-top:4px}.keypad:focus{border-top:4px solid rgba(52, 153, 128, 0.45);padding-top:0px}.calculator-display{width:calc(100% - 4px);height:2.5rem}.calculator-display:focus{border-radius:10px;border:2px solid rgba(52, 153, 128, 0.65)}.alabel{font-size:30px}.alabel:focus-within{background:#999}.calc hr{border-style:outset;opacity:0.5}.calc hr:focus{border-style:outset;opacity:1}.f1{margin-left:calc(-13pt - 2px)}.f1:focus{margin-left:calc(-13pt - 4px)}.inner-calc-display:focus .f1{margin-left:calc(-13pt - 4px)}#deg-label{position:absolute;z-index:1}"),
        language: "css"
    }, {
        name: "toHTML",
        code: function(opt_out) {
            var self = this
              , X = this.X
              , Y = this.Y
              , opt_out = opt_out || TOC(this)
            return opt_out("\n        ", this.CalcSpeechView.create({
                calc: this.data
            }), "\n        \n        "),
            X.registerModel(this.CalcButton, "foam.ui.ActionButton"),
            opt_out('\n        <div id="', this.id, '" class="CalcView">\n        <div style="position: relative; z-index: 2;" tabindex="-1" aria-hidden="true">\n          <div\n            id="deg-label"\n          >\n            <span\n              style="top: 15px;left: 0;position: absolute; z-index: 1;"\n              id="', this.setClass("active", function() {
                return !this.data.degreesMode
            }), '"\n              class="rad">\n              ', this.data.model_.RAD.label, '\n            </span>\n            <span\n              style="top: 15px;position: absolute; z-index: 1;"\n              id="', this.setClass("active", function() {
                return this.data.degreesMode
            }), '"\n              class="deg">\n                ', this.data.model_.DEG.label, '\n            </span>\n          </div>\n        </div>\n\n        <div class="edge"></div>\n        <div class="calc">\n          <div class="calc-display">\n            <div class="inner-calc-display" role="list" aria-label="', escapeHTML(this.data.model_.CALC_HISTORY.value), '" tabindex="0">\n              ', this.createTemplateView("history", {
                rowView: "foam.apps.calc.HistoryCitationView"
            }), '\n              <div class="calculator-display" aria-label="', escapeHTML(this.data.model_.CALC_DISPLAY.value), '" tabindex="0">\n                ', this.createTemplateView("row1Formatted", {
                mode: "read-only",
                escapeHTML: !1
            }), '\n              </div>\n            </div>\n          </div>\n          <div class="keypad" aria-label="', escapeHTML(this.data.model_.CALC_KEYPAD.value), '" tabindex="0">\n          <div class="edge2"></div>\n          ', this.SlidePanel.create({
                data: this.data,
                side: "right",
                minWidth: 310,
                minPanelWidth: 320,
                panelRatio: .55,
                mainView: "foam.apps.calc.MainButtonsView",
                stripWidth: 30,
                openedDescription: this.SECONDARY_PANEL_OPENED.value,
                closedDescription: this.SECONDARY_PANEL_CLOSED.value,
                panelView: {
                    factory_: "foam.ui.SlidePanel",
                    side: "right",
                    stripWidth: 30,
                    minWidth: 320,
                    minPanelWidth: 220,
                    panelRatio: 3 / 7,
                    mainView: "foam.apps.calc.SecondaryButtonsView",
                    panelView: "foam.apps.calc.TertiaryButtonsView",
                    openedDescription: this.TERTIARY_PANEL_OPENED.value,
                    closedDescription: this.TERTIARY_PANEL_CLOSED.value
                }
            }), "\n          </div>\n        </div>\n        </div>\n      "),
            opt_out.toString()
        },
        language: "html"
    }]
}),
CLASS({
    package: "foam.apps.calc",
    name: "CalcButton",
    extends: "foam.graphics.ActionButtonCView",
    properties: [{
        name: "color",
        defaultValue: "white"
    }, {
        name: "background",
        defaultValue: "#4b4b4b"
    }, {
        name: "width",
        defaultValue: 60
    }, {
        name: "height",
        defaultValue: 60
    }, {
        name: "font",
        defaultValue: "300 28px Roboto"
    }, {
        name: "role",
        defaultValue: "button"
    }],
    methods: [function init() {
        this.SUPER(),
        setTimeout(function() {
            this.view.paint()
        }
        .bind(this), 1e3)
    }
    , function toView_() {
        var v = this.SUPER()
        return v.decorate("toHTML", function(SUPER) {
            return '<div class="button">' + SUPER.call(this) + "</div>"
        }, v.toHTML)
    }
    ]
}),
CLASS({
    package: "foam.graphics",
    name: "ActionButtonCView",
    extends: "foam.graphics.CView",
    requires: ["foam.ui.md.Halo", "foam.input.touch.GestureTarget"],
    imports: ["gestureManager"],
    properties: [{
        name: "action",
        postSet: function(oldValue, action) {
            this.bindIsAvailableAndEnabled()
        }
    }, {
        model_: "StringProperty",
        name: "font",
        type: "String",
        defaultValue: ""
    }, {
        name: "data",
        postSet: function() {
            this.bindIsAvailableAndEnabled()
        }
    }, {
        name: "label",
        defaultValue: ""
    }, {
        name: "showLabel",
        defaultValueFn: function() {
            return this.action.showLabel
        }
    }, {
        name: "iconUrl",
        defaultValueFn: function() {
            return this.action.iconUrl
        },
        postSet: function(_, v) {
            this.image_ && (this.image_.src = v)
        }
    }, {
        name: "haloColor",
        defaultValue: "rgb(241, 250, 65)"
    }, {
        name: "halo",
        factory: function() {
            return this.Halo.create({
                alpha: 0,
                r: 10,
                color$: this.haloColor$,
                isEnabled: function() {
                    return this.action.isEnabled.call(this.data, this.action)
                }
                .bind(this)
            })
        },
        postSet: function(old, nu) {
            old && this.removeChild(old),
            nu && this.addChild(nu)
        }
    }, {
        name: "iconWidth",
        defaultValue: 0
    }, {
        name: "iconHeight",
        defaultValue: 0
    }, {
        name: "radius",
        defaultValue: 0,
        postSet: function(_, r) {
            r && (this.width = this.height = 2 * r)
        }
    }, {
        name: "tapGesture",
        visibility: "hidden",
        hidden: !0,
        transient: !0,
        lazyFactory: function() {
            return this.GestureTarget.create({
                containerID: this.view.id,
                handler: this,
                gesture: "tap"
            })
        }
    }, {
        name: "className",
        defaultValueFn: function() {
            return "actionButtonCView actionButtonCView-" + this.action.name
        },
        help: "CSS class name(s), space separated."
    }, {
        name: "tooltip",
        defaultValueFn: function() {
            return this.action.help
        }
    }, {
        name: "speechLabel",
        defaultValueFn: function() {
            return this.action.speechLabel
        }
    }, {
        name: "tabIndex"
    }, {
        name: "arrowNav"
    }, {
        name: "role"
    }, {
        name: "ariaPressed",
        defaultValue: ""
    }, {
        name: "state_",
        defaultValue: "default"
    }],
    methods: [function init() {
        this.SUPER(),
        this.X.dynamicFn(function() {
            this.iconUrl,
            this.iconWidth,
            this.iconHeight
        }
        .bind(this), function() {
            this.iconUrl && (this.image_ = new Image,
            this.image_.onload = function() {
                this.iconWidth || (this.iconWidth = this.image_.width),
                this.iconHeight || (this.iconHeight = this.image_.height),
                this.view.$ && this.view.paint()
            }
            .bind(this),
            this.image_.src = this.iconUrl)
        }
        .bind(this))
    }
    , function bindIsAvailableAndEnabled() {
        var self
        this.action && this.data && (self = this).X.dynamicFn(function() {
            self.action.isAvailable.call(self.data, self.action),
            self.action.isEnabled.call(self.data, self.action)
        }, function() {
            self.action.isAvailable.call(self.data, self.action) ? self.oldWidth_ && self.oldHeight_ && (self.x = self.oldX_,
            self.y = self.oldY_,
            self.width = self.oldWidth_,
            self.height = self.oldHeight_) : (self.width || self.height) && (self.oldX_ = self.x,
            self.oldY_ = self.y,
            self.oldWidth_ = self.width,
            self.oldHeight_ = self.height,
            self.width = 0,
            self.height = 0,
            self.x = 0,
            self.y = 0),
            self.action.isEnabled.call(self.data, self.action) ? self.alpha = 1 : self.alpha = .5,
            self.view && self.view.paint()
        })
    }
    , function initCView() {
        this.gestureManager && this.gestureManager.install(this.tapGesture),
        this.$.addEventListener("keypress", function(e) {
            32 != e.charCode || e.altKey || e.ctrlKey || e.shiftKey || (e.preventDefault(),
            e.stopPropagation(),
            this.tapClick())
        }
        .bind(this)),
        this.$.addEventListener("click", function(e) {
            e.preventDefault(),
            e.stopPropagation(),
            (e.x || e.y) && this.gestureManager || this.tapClick()
        }
        .bind(this))
    }
    , function destroy(isParentDestroyed) {
        this.SUPER(isParentDestroyed),
        this.gestureManager && this.gestureManager.uninstall(this.tapGesture)
    }
    , function erase(c) {
        c.clearRect(0, 0, this.width, this.height)
        var r = Math.min(this.width, this.height) / 2
        c.fillStyle = this.background,
        c.beginPath(),
        c.arc(this.width / 2, this.height / 2, r, 0, 2 * Math.PI, !0),
        c.closePath(),
        c.fill()
    }
    , function paintSelf(c) {
        this.font && (c.font = this.font),
        c.globalAlpha = this.alpha,
        c.textAlign = "center",
        c.textBaseline = "middle",
        c.fillStyle = this.color,
        this.image_ && this.image_.complete ? c.drawImage(this.image_, this.x + (this.width - this.iconWidth) / 2, this.y + (this.height - this.iconHeight) / 2, this.iconWidth, this.iconHeight) : c.fillText(this.label || this.action.labelFn.call(this.data, this.action), this.x + this.width / 2, this.y + this.height / 2)
    }
    ],
    listeners: [{
        name: "tapClick",
        code: function() {
            this.action.maybeCall(this.X, this.data)
        }
    }]
}),
CLASS({
    package: "foam.ui.md",
    name: "Halo",
    extends: "foam.graphics.Circle",
    properties: [{
        name: "style",
        defaultValue: "solid",
        postSet: function(_, style) {
            style !== this.RING_INNER_COLOR && this.setColorAndBorder()
        }
    }, {
        name: "state_",
        defaultValue: "default"
    }, {
        name: "nextColor_",
        defaultValueFn: function() {
            return this.color
        }
    }, {
        name: "color",
        preSet: function(old, nu) {
            return "default" !== this.state_ ? (this.nextColor_ = nu,
            old) : nu
        }
    }, {
        name: "easeInTime",
        defaultValue: 200
    }, {
        name: "focusType",
        defaultValue: null
    }, {
        name: "easeOutTime",
        defaultValue: 150
    }, {
        name: "startAlpha",
        defaultValue: .8
    }, {
        name: "pressedAlpha",
        defaultValue: .4
    }, {
        name: "finishAlpha",
        defaultValue: 0
    }, {
        name: "alpha",
        defaultValue: 0
    }, {
        name: "recentering",
        defaultValue: !0
    }, {
        name: "animateGrowth",
        defaultValue: !0
    }, {
        model_: "FunctionProperty",
        name: "isEnabled",
        type: "Function",
        defaultValue: function() {
            return !0
        }
    }],
    constants: [{
        name: "RING_INNER_COLOR",
        value: "rgba(0, 0, 0, 0)"
    }],
    methods: [function setColorAndBorder() {
        var color
        "ring" === this.style && (color = this.color,
        this.border = color,
        this.borderWidth = 12,
        this.color = this.RING_INNER_COLOR)
    }
    , function initCView() {
        this.$.addEventListener("mousedown", this.onMouseDown),
        this.$.addEventListener("mouseup", this.onMouseUp),
        this.$.addEventListener("mouseleave", this.onMouseUp),
        this.$.addEventListener("focus", this.focus),
        this.$.addEventListener("blur", this.blur),
        this.$.addEventListener("touchstart", this.onMouseDown),
        this.$.addEventListener("touchend", this.onMouseUp),
        this.$.addEventListener("touchleave", this.onMouseUp),
        this.$.addEventListener("touchcancel", this.onMouseUp)
    }
    , function isTouchInRect(t, rect) {
        return t.clientX >= rect.left && t.clientX <= rect.right && t.clientY >= rect.top && t.clientY <= rect.bottom
    }
    , function paintHalo(evt, focus) {
        if ("default" === this.state_ && this.isEnabled()) {
            if (this.state_ = "pressing",
            "touchstart" === evt.type) {
                for (var rect = this.$.getBoundingClientRect(), touchFound = !1, t, i = 0; i < evt.touches.length; ++i)
                    if (t = evt.touches[i],
                    this.isTouchInRect(t, rect)) {
                        touchFound = !0
                        break
                    }
                touchFound ? (this.x = t.clientX - rect.left,
                this.y = t.clientY - rect.top) : (console.warn("No touches", evt.touches, "in element rect", rect),
                this.x = rect.width / 2,
                this.y = rect.height / 2)
            } else
                this.x = evt.offsetX,
                this.y = evt.offsetY
            this.animateGrowth ? this.r = 2 : this.recentering ? (this.x = this.parent.width / 2,
            this.y = this.parent.height / 2,
            this.r = Math.min(28, Math.min(this.$.clientWidth, this.parent.height) / 2)) : this.r = Math.max(28, Math.max(this.$.clientWidth, this.parent.height)),
            this.alpha = this.startAlpha
            const recentering = this.recentering
            this.X.animate(this.easeInTime, function() {
                this.alpha = this.pressedAlpha,
                this.animateGrowth && (recentering ? (this.x = this.parent.width / 2,
                this.y = this.parent.height / 2,
                this.r = Math.min(28, Math.min(this.$.clientWidth, this.parent.height) / 2)) : this.r = Math.max(28, Math.max(this.$.clientWidth, this.parent.height)))
            }
            .bind(this), void 0, function() {
                "cancelled" === this.state_ ? (this.state_ = "pressed",
                this.onMouseUp()) : this.state_ = "pressed"
            }
            .bind(this))()
        }
    }
    , function clearHalo() {
        "default" === this.state_ || ("pressing" === this.state_ ? this.state_ = "cancelled" : "cancelled" === this.state_ || (this.state_ = "released",
        this.X.animate(this.easeOutTime, function() {
            this.alpha = this.finishAlpha
        }
        .bind(this), Movement.easeIn(.5), function() {
            "released" === this.state_ && (this.state_ = "default",
            this.color = this.nextColor_)
        }
        .bind(this))()),
        void 0)
    }
    ],
    listeners: [{
        name: "onMouseDown",
        code: function(evt) {
            this.focusType = "mouse",
            this.paintHalo(evt, !1),
            this.$.focus()
        }
    }, {
        name: "focus",
        code: function(evt) {
            var save
            "mouse" === this.focusType || (this.focusType = "keyboard",
            save = {
                animateGrowth: this.animateGrowth,
                startAlpha: this.startAlpha,
                easeInTime: this.easeInTime,
                easeOutTime: this.easeOutTime
            },
            this.animateGrowth = !1,
            this.startAlpha = .2,
            this.easeInTime = 100,
            this.easeOutTime = 100,
            this.paintHalo(evt, !0),
            this.animateGrowth = save.animateGrowth,
            this.startAlpha = save.startAlpha,
            this.easeInTime = save.easeInTime,
            this.easeOutTime = save.easeOutTime)
        }
    }, {
        name: "onMouseUp",
        code: function() {
            "keyboard" === this.focusType || (this.clearHalo(),
            this.focusType = null)
        }
    }, {
        name: "blur",
        code: function() {
            this.clearHalo(),
            this.focusType = null
        }
    }]
}),
CLASS({
    package: "foam.graphics",
    name: "Circle",
    extends: "foam.graphics.CView",
    properties: [{
        model_: "StringProperty",
        name: "border",
        label: "Border Color",
        type: "String",
        defaultValue: ""
    }, {
        name: "borderWidth",
        defaultValue: 1
    }, {
        model_: "FloatProperty",
        name: "r",
        label: "Radius",
        type: "Float",
        defaultValue: 20
    }, {
        name: "startAngle",
        defaultValue: 0
    }, {
        name: "endAngle",
        defaultValue: 6.283185307179586
    }, {
        name: "width",
        defaultValueFn: function() {
            return 2 * (this.r + (this.border ? this.borderWidth : 0))
        }
    }, {
        name: "height",
        defaultValueFn: function() {
            return 2 * (this.r + (this.border ? this.borderWidth : 0))
        }
    }],
    methods: [function paintSelf(c) {
        c && this.r && (this.color && (c.beginPath(),
        c.moveTo(0, 0),
        c.arc(0, 0, this.r, -this.endAngle, -this.startAngle, !1),
        c.closePath(),
        c.fillStyle = this.color,
        c.fill()),
        this.paintBorder(c))
    }
    , function paintBorder(c) {
        this.border && (c.lineWidth = this.borderWidth,
        c.beginPath(),
        c.arc(0, 0, this.r + this.borderWidth / 2 - 1, this.startAngle, this.endAngle),
        c.closePath(),
        c.strokeStyle = this.border,
        c.stroke())
    }
    , function intersects(c) {
        var r = this.r + c.r
        return this.border && (r += this.borderWidth - 2),
        c.border && (r += c.borderWidth - 2),
        Movement.distance(this.x - c.x, this.y - c.y) <= r
    }
    ]
}),
CLASS({
    package: "foam.graphics",
    name: "CView",
    label: "CView",
    traits: ["foam.patterns.ChildTreeTrait"],
    requires: ["foam.graphics.PositionedCViewView", "foam.graphics.CViewView"],
    properties: [{
        name: "view",
        visibility: "hidden",
        hidden: !0,
        transient: !0,
        postSet: function(_, view) {
            for (var key in this.children) {
                var key = this.children[key];
                (key.view = view) && key.addListener(view.paint)
            }
        }
    }, {
        name: "children",
        visibility: "hidden",
        hidden: !0
    }, {
        name: "$",
        visibility: "hidden",
        hidden: !0,
        transient: !0,
        defaultValueFn: function() {
            return this.view && this.view.$
        }
    }, {
        name: "state",
        defaultValue: "initial"
    }, {
        model_: "BooleanProperty",
        name: "suspended",
        type: "Boolean",
        defaultValue: !1
    }, {
        name: "className",
        defaultValue: "",
        postSet: function() {
            this.$ && (this.$.className = this.className)
        },
        help: "CSS class name(s), space separated. Used if adapted with a CViewView."
    }, {
        model_: "FloatProperty",
        name: "x",
        type: "Float",
        defaultValue: 0
    }, {
        model_: "FloatProperty",
        name: "y",
        type: "Float",
        defaultValue: 0
    }, {
        model_: "FloatProperty",
        name: "a",
        label: "Rotation",
        type: "Float",
        defaultValue: 0
    }, {
        model_: "FloatProperty",
        name: "scaleX",
        type: "Float",
        defaultValue: 1
    }, {
        model_: "FloatProperty",
        name: "scaleY",
        type: "Float",
        defaultValue: 1
    }, {
        name: "canvasX",
        visibility: "hidden",
        hidden: !0,
        getter: function() {
            return this.x + (this.parent ? this.parent.canvasX : 0)
        }
    }, {
        name: "canvasY",
        visibility: "hidden",
        hidden: !0,
        getter: function() {
            return this.y + (this.parent ? this.parent.canvasY : 0)
        }
    }, {
        model_: "IntProperty",
        name: "width",
        type: "Int",
        defaultValue: 10
    }, {
        model_: "IntProperty",
        name: "height",
        type: "Int",
        defaultValue: 10
    }, {
        model_: "FloatProperty",
        name: "alpha",
        type: "Float",
        defaultValue: 1
    }, {
        model_: "StringProperty",
        name: "color",
        label: "Foreground Color",
        type: "String",
        defaultValue: "black"
    }, {
        model_: "StringProperty",
        name: "background",
        label: "Background Color",
        type: "String",
        defaultValue: "white"
    }, {
        name: "font"
    }, {
        model_: "BooleanProperty",
        name: "clipped",
        type: "Boolean",
        defaultValue: !1
    }],
    methods: [function toView_() {
        var params
        return this.view || (params = {
            cview: this
        },
        this.className && (params.className = this.className),
        this.tooltip && (params.tooltip = this.tooltip),
        this.speechLabel && (params.speechLabel = this.speechLabel),
        this.tabIndex && (params.tabIndex = this.tabIndex),
        this.arrowNav && (params.arrowNav = this.arrowNav),
        this.role && (params.role = this.role),
        this.ariaPressed && (params.ariaPressed = this.ariaPressed),
        this.data$ && (params.data$ = this.data$),
        this.view = this.CViewView.create(params)),
        this.view
    }
    , function toGLView_() {
        var model = this.X.lookup("foam.graphics.webgl.CViewGLView")
        return model ? model.create({
            sourceView: this
        }, this.Y) : ""
    }
    , function toPositionedView_() {
        var params
        return this.view || (params = {
            cview: this
        },
        this.className && (params.className = this.className),
        this.view = this.PositionedCViewView.create(params)),
        this.view
    }
    , function initCView() {}
    , function write(opt_X) {
        var opt_X = opt_X || this.X
        opt_X.writeView(this.toView_(), opt_X)
    }
    , function addChild(child) {
        if (this.SUPER(child),
        child === this,
        this.view) {
            child.view = this.view,
            child.addListener(this.view.paint)
            try {
                this.view.paint()
            } catch (x) {}
        }
        return this
    }
    , function removeChild(child) {
        return this.SUPER(child),
        child.view = void 0,
        this.view && (child.removeListener(this.view.paint),
        this.view.paint()),
        this
    }
    , function removeAllChildren(child) {
        for (var i = this.children.length - 1; 0 <= i; i--)
            this.removeChild(this.children[i])
        return this
    }
    , function findChildAt(x, y) {
        for (var c2 = {
            x: x,
            y: y,
            r: 1
        }, cs = this.children, i = cs.length - 1; 0 <= i; i--) {
            var c1 = cs[i]
            if (c1.intersects && c1.intersects(c2))
                return c1
        }
    }
    , function erase(canvas) {
        canvas.fillStyle = this.background,
        canvas.fillRect(0, 0, this.width, this.height)
    }
    , function paintChildren(c) {
        for (var i = 0; i < this.children.length; i++) {
            var child = this.children[i]
            c.save(),
            c.beginPath(),
            child.paint(c),
            c.restore()
        }
    }
    , function paintSelf(canvas) {}
    , function paint(canvas) {
        var canvas
        this.width && this.height && ("initial" === this.state && (this.state = "active",
        this.initCView()),
        this.suspended || ((canvas = canvas || this.view.canvas).save(),
        canvas.globalAlpha *= this.alpha,
        this.transform(canvas),
        this.clipped && (canvas.rect(0, 0, this.width, this.height),
        canvas.clip()),
        this.paintSelf(canvas),
        this.paintChildren(canvas),
        canvas.restore()))
    }
    , function transform(canvas) {
        canvas.translate(this.x, this.y),
        canvas.scale(this.scaleX, this.scaleY),
        this.a && canvas.rotate(this.a)
    }
    , function scale(s) {
        this.scaleX = this.scaleY = s
    }
    , function mapToParent(point) {
        return point.x += this.x,
        point.y += this.y,
        point
    }
    , function mapToCanvas(point) {
        return this.mapToParent(point),
        this.parent && this.parent.mapToCanvas && this.parent.mapToCanvas(point),
        point
    }
    , function destroy() {}
    ]
}),
CLASS({
    package: "foam.graphics",
    name: "PositionedCViewView",
    extends: "foam.graphics.AbstractCViewView",
    traits: ["foam.ui.layout.PositionedDOMViewTrait"],
    properties: [{
        name: "tagName",
        factory: function() {
            return "canvas"
        }
    }],
    methods: [function init() {
        this.SUPER(),
        this.X.dynamicFn(function() {
            this.cview,
            this.width,
            this.height
        }
        .bind(this), function() {
            this.cview && (this.cview.width = this.width,
            this.cview.height = this.height)
        }
        .bind(this))
    }
    , function toHTML() {
        var className = this.className ? ' class="' + this.className + '"' : ""
        return '<canvas id="' + this.id + '"' + className + ' width="' + this.canvasWidth() + '" height="' + this.canvasHeight() + '" ' + this.layoutStyle() + "></canvas>"
    }
    ],
    listeners: [{
        name: "resize",
        code: function() {
            this.$ && (this.$.width = this.canvasWidth(),
            this.$.style.width = this.styleWidth(),
            this.$.height = this.canvasHeight(),
            this.$.style.height = this.styleHeight(),
            this.cview.width = this.width,
            this.cview.height = this.height,
            this.paint())
        },
        isFramed: !0
    }]
}),
CLASS({
    package: "foam.ui.layout",
    name: "PositionedDOMViewTrait",
    traits: ["foam.ui.layout.PositionedViewTrait"],
    properties: [{
        name: "tagName",
        defaultValue: "div"
    }],
    methods: [function toHTML() {
        return "<" + this.tagName + ' id="' + this.id + '"' + this.layoutStyle() + this.cssClassAttr() + ">" + this.toInnerHTML() + "</div>"
    }
    , function layoutStyle() {
        return ' style="-webkit-transform:' + this.transform() + ";width:" + this.styleWidth() + ";height:" + this.styleHeight() + ';position:absolute;"'
    }
    , function initHTML() {
        this.SUPER()
        var self = this
        this.X.dynamicFn(function() {
            self.x,
            self.y,
            self.z
        }, this.position),
        this.X.dynamicFn(function() {
            self.width,
            self.height
        }, this.resize),
        this.$.style.position = "absolute",
        this.position(),
        this.resize()
    }
    , function transform() {
        return "translate3d(" + this.x + "px," + this.y + "px," + this.z + "px)"
    }
    , function styleWidth() {
        return this.width + "px"
    }
    , function styleHeight() {
        return this.height + "px"
    }
    ],
    listeners: [{
        name: "position",
        code: function() {
            this.$ && (this.$.style.webkitTransform = this.transform())
        }
    }, {
        name: "resize",
        code: function() {
            this.$ && (this.$.style.width = this.styleWidth(),
            this.$.style.height = this.styleHeight())
        }
    }]
}),
CLASS({
    package: "foam.ui.layout",
    name: "PositionedViewTrait",
    properties: [{
        model_: "FloatProperty",
        name: "x",
        type: "Float",
        units: "px",
        defaultValue: 0
    }, {
        model_: "FloatProperty",
        name: "y",
        type: "Float",
        units: "px",
        defaultValue: 0
    }, {
        model_: "FloatProperty",
        name: "z",
        type: "Float",
        units: "px",
        defaultValue: 0
    }, {
        model_: "IntProperty",
        name: "width",
        type: "Int",
        units: "px",
        defaultValue: 100
    }, {
        model_: "IntProperty",
        name: "height",
        type: "Int",
        units: "px",
        defaultValue: 100
    }, {
        model_: "IntProperty",
        name: "preferredWidth",
        type: "Int",
        units: "px",
        defaultValue: 100
    }, {
        model_: "IntProperty",
        name: "preferredHeight",
        type: "Int",
        units: "px",
        defaultValue: 100
    }]
}),
CLASS({
    package: "foam.graphics",
    name: "AbstractCViewView",
    extends: "foam.ui.View",
    properties: [{
        name: "cview",
        postSet: function(_, cview) {
            (cview.view = this).width = cview.x + cview.width,
            this.height = cview.y + cview.height
        }
    }, {
        name: "className",
        defaultValue: "",
        help: "CSS class name(s), space separated."
    }, {
        model_: "FloatProperty",
        name: "scalingRatio",
        type: "Float",
        preSet: function(_, v) {
            return v <= 0 ? 1 : v
        },
        defaultValue: 1
    }, {
        name: "speechLabel"
    }, {
        name: "role"
    }, {
        name: "tabIndex"
    }, {
        name: "arrowNav"
    }, {
        name: "ariaPressed",
        defaultValue: ""
    }, {
        model_: "IntProperty",
        name: "width",
        type: "Int",
        defaultValue: 100
    }, {
        model_: "IntProperty",
        name: "height",
        type: "Int",
        defaultValue: 100
    }, {
        name: "canvas",
        getter: function() {
            return this.instance_.canvas || (this.instance_.canvas = this.$ && this.$.getContext("2d"))
        }
    }, {
        name: "gl",
        getter: function() {
            return null
        }
    }],
    methods: [function init() {
        this.SUPER(),
        this.X.dynamicFn(function() {
            this.scalingRatio,
            this.width,
            this.height
        }
        .bind(this), this.resize)
    }
    , function styleWidth() {
        return this.width + "px"
    }
    , function canvasWidth() {
        return this.width * this.scalingRatio
    }
    , function styleHeight() {
        return this.height + "px"
    }
    , function canvasHeight() {
        return this.height * this.scalingRatio
    }
    , function toString() {
        return "CViewView(" + this.cview + ")"
    }
    , function toHTML() {
        var className = this.className ? ' class="' + this.className + '"' : ""
          , title = this.speechLabel ? ' aria-role="button" aria-label="' + this.speechLabel + '"' : ""
          , tabIndex = void 0 !== this.tabIndex ? ' tabindex="' + this.tabIndex + '"' : ""
          , arrowNav = ""
        function toSelector(s) {
            var msg, btnId
            return s && "[" === s[0] ? (msg = null,
            btnId = s.substr(1, s.length - 2),
            window.chrome && window.chrome.i18n ? (msg = window.chrome.i18n.getMessage("Calc_ActionSpeechLabel_" + btnId),
            "[aria-label='" + (msg = /\[\d\]/.exec(s) ? btnId : msg) + "'][aria-role='button']") : (console.warn("Could not access i18n tools, arrow nav disabled"),
            void 0)) : s
        }
        this.arrowNav && (arrowNav = (arrowNav = (arrowNav = (arrowNav += ' data-arrow-up="' + toSelector(this.arrowNav[0]) + '"') + ' data-arrow-down="' + toSelector(this.arrowNav[1]) + '"') + ' data-arrow-left="' + toSelector(this.arrowNav[2]) + '"') + ' data-arrow-right="' + toSelector(this.arrowNav[3]) + '"')
        var role = this.role ? ' role="' + this.role + '"' : ""
        return '<canvas id="' + this.id + '"' + className + title + tabIndex + role + arrowNav + ' width="' + this.canvasWidth() + '" height="' + this.canvasHeight() + '" style="width:' + this.styleWidth() + ";height:" + this.styleHeight() + ";min-width:" + this.styleWidth() + ";min-height:" + this.styleHeight() + '"></canvas>'
    }
    , function initHTML() {
        var devicePixelRatio, backingStoreRatio, devicePixelRatio
        this.$ && (this.maybeInitTooltip(),
        this.canvas = this.$.getContext("2d"),
        (devicePixelRatio = this.X.window.devicePixelRatio || 1) !== (backingStoreRatio = this.canvas.backingStoreRatio || this.canvas.webkitBackingStorePixelRatio || 1) && (this.scalingRatio = devicePixelRatio / backingStoreRatio),
        (devicePixelRatio = this.X.window.getComputedStyle(this.$)).backgroundColor && !this.cview.hasOwnProperty("background") && (this.cview.background = devicePixelRatio.backgroundColor),
        this.paint())
    }
    , function destroy(isParentDestroyed) {
        this.SUPER(isParentDestroyed)
    }
    ],
    listeners: [{
        name: "resize",
        code: function() {
            this.$ && (this.$.width = this.canvasWidth(),
            this.$.style.width = this.styleWidth(),
            this.$.style.minWidth = this.styleWidth(),
            this.$.height = this.canvasHeight(),
            this.$.style.height = this.styleHeight(),
            this.$.style.minHeight = this.styleHeight(),
            this.paint())
        },
        isFramed: !0
    }, {
        name: "paint",
        code: function() {
            if (!this.$)
                throw EventService.UNSUBSCRIBE_EXCEPTION
            void 0 !== this.ariaPressed && "" !== this.ariaPressed && this.$.setAttribute("aria-pressed", this.ariaPressed),
            this.canvas.save(),
            this.canvas.clearRect(0, 0, this.canvasWidth(), this.canvasHeight()),
            this.canvas.fillStyle = this.cview.background,
            this.canvas.fillRect(0, 0, this.canvasWidth(), this.canvasHeight()),
            this.canvas.scale(this.scalingRatio, this.scalingRatio),
            this.cview.paint(this.canvas),
            this.canvas.restore()
        },
        isFramed: !0
    }]
}),
CLASS({
    package: "foam.ui",
    name: "View",
    extends: "foam.ui.DestructiveDataView",
    traits: ["foam.ui.HTMLViewTrait", "foam.ui.U2ViewTrait"],
    requires: ["Property"],
    exports: ["propertyViewProperty"],
    properties: [{
        name: "propertyViewProperty",
        type: "Property",
        defaultValueFn: function() {
            return this.Property.DETAIL_VIEW
        }
    }]
}),
CLASS({
    package: "foam.ui",
    name: "HTMLViewTrait",
    label: "HTMLView",
    requires: ["foam.input.touch.GestureTarget", "foam.ui.ActionBorder", "foam.ui.PropertyView", "foam.ui.AsyncLoadingView"],
    properties: [{
        model_: "StringProperty",
        name: "id",
        label: "Element ID",
        type: "String",
        factory: function() {
            return this.instance_.id || this.nextID()
        }
    }, {
        model_: "foam.core.types.DocumentInstallProperty",
        name: "installCSS",
        documentInstallFn: function(X) {
            for (var i = 0; i < this.model_.templates.length; i++) {
                var t = this.model_.templates[i]
                if ("CSS" === t.name)
                    return t.futureTemplate(function() {
                        X.addStyle(this)
                    }
                    .bind(this)),
                    undefined
            }
        }
    }, {
        name: "shortcuts",
        factory: function() {
            return []
        }
    }, {
        name: "$",
        labels: ["javascript"],
        mode: "read-only",
        visibility: "hidden",
        hidden: !0,
        getter: function() {
            return this.X.document.getElementById(this.id)
        },
        setter: function() {},
        help: "DOM Element."
    }, {
        name: "tagName",
        defaultValue: "span"
    }, {
        name: "className",
        defaultValue: "",
        help: "CSS class name(s), space separated."
    }, {
        name: "tooltip"
    }, {
        name: "tabIndex"
    }, {
        name: "speechLabel"
    }, {
        name: "extraClassName",
        defaultValue: ""
    }, {
        name: "propertyViewProperty",
        defaultValueFn: function() {
            return this.X.Property.VIEW
        }
    }, {
        name: "initializers_",
        factory: function() {
            return []
        }
    }, {
        name: "destructors_",
        factory: function() {
            return []
        }
    }, {
        model_: "BooleanProperty",
        name: "showActions",
        type: "Boolean",
        postSet: function(oldValue, showActions) {
            !oldValue && showActions && this.addDecorator(this.ActionBorder.create())
        },
        defaultValue: !1
    }, {
        name: "minWidth",
        defaultValue: 300
    }, {
        name: "minHeight",
        defaultValue: 0
    }, {
        name: "preferredWidth",
        defaultValue: 400
    }, {
        name: "preferredHeight",
        defaultValue: 40
    }, {
        name: "maxWidth",
        defaultValue: 1e4
    }, {
        name: "maxHeight",
        defaultValue: 1e4
    }, {
        name: "$parent",
        labels: ["javascript"],
        getter: function() {
            return this.$ ? this.$.parentElement : null
        }
    }],
    constants: [{
        name: "KEYPRESS_CODES",
        value: {
            8: !0,
            33: !0,
            34: !0,
            37: !0,
            38: !0,
            39: !0,
            40: !0
        }
    }, {
        name: "NAMED_CODES",
        value: {
            37: "left",
            38: "up",
            39: "right",
            40: "down"
        }
    }, {
        name: "ON_HIDE",
        value: ["onHide"]
    }, {
        name: "ON_SHOW",
        value: ["onShow"]
    }],
    methods: [function strToHTML(str) {
        return XMLUtil.escape(str.toString())
    }
    , function cssClassAttr() {
        if (!this.className && !this.extraClassName)
            return ""
        var s = ' class="'
        return this.className && (s += this.className,
        this.extraClassName && (s += " ")),
        this.extraClassName && (s += this.extraClassName),
        s + '"'
    }
    , function bindSubView(view, prop) {
        view.setValue(this.propertyValue(prop.name))
    }
    , function focus() {
        this.$ && this.$.focus && this.$.focus()
    }
    , function addChild(child) {
        if (child.toView_ && (child = child.toView_()),
        -1 == this.children.indexOf(child))
            return this.SUPER(child)
    }
    , function addShortcut(key, callback, context) {
        this.shortcuts.push([key, callback, context])
    }
    , function nextID() {
        return "view" + (arguments.callee._nextId = (arguments.callee._nextId || 0) + 1)
    }
    , function addInitializer(f) {
        this.initializers_.push(f)
    }
    , function addDestructor(f) {
        this.destructors_.push(f)
    }
    , function tapClick() {}
    , function resize() {
        var e = this.X.document.createEvent("Event")
        e.initEvent("resize", !0, !0),
        this.$ && this.X.window.getComputedStyle(this.$),
        this.X.window.dispatchEvent(e)
    }
    , function on(event, listener, opt_id) {
        var self, manager, target
        return opt_id = opt_id || this.nextID(),
        listener = listener.bind(this),
        "click" === event && this.X.gestureManager ? (manager = (self = this).X.gestureManager,
        target = this.GestureTarget.create({
            containerID: opt_id,
            enforceContainment: !0,
            handler: {
                tapClick: function(pointMap) {
                    return listener({
                        preventDefault: function() {},
                        stopPropagation: function() {},
                        pointMap: pointMap,
                        target: self.X.$(opt_id)
                    })
                }
            },
            gesture: "tap"
        }),
        manager.install(target),
        this.addDestructor(function() {
            manager.uninstall(target)
        })) : this.addInitializer(function() {
            var e = this.X.$(opt_id)
            e && e.addEventListener(event, listener, !1)
        }
        .bind(this)),
        opt_id
    }
    , function setAttribute(attributeName, valueFn, opt_id) {
        var self = this
        opt_id = opt_id || this.nextID(),
        valueFn = valueFn.bind(this),
        this.addInitializer(function() {
            self.X.dynamicFn(valueFn, function() {
                var e = self.X.$(opt_id)
                if (!e)
                    throw EventService.UNSUBSCRIBE_EXCEPTION
                var newValue = valueFn(e.getAttribute(attributeName))
                null == newValue ? e.removeAttribute(attributeName) : e.setAttribute(attributeName, newValue)
            })
        })
    }
    , function setStyle(styleName, valueFn, opt_id) {
        var self = this
        return opt_id = opt_id || this.nextID(),
        valueFn = valueFn.bind(this),
        this.addInitializer(function() {
            self.X.dynamicFn(valueFn, function(value) {
                var e = self.X.$(opt_id)
                if (!e)
                    throw EventService.UNSUBSCRIBE_EXCEPTION
                e.style[styleName] = value
            })
        }),
        opt_id
    }
    , function setClass(className, predicate, opt_id) {
        var self = this
        return opt_id = opt_id || this.nextID(),
        predicate = predicate.bind(this),
        this.addInitializer(function() {
            self.addDestructor(self.X.dynamicFn(predicate, function() {
                var e = self.X.$(opt_id)
                if (!e)
                    throw EventService.UNSUBSCRIBE_EXCEPTION
                DOM.setClass(e, className, predicate())
            }).destroy)
        }),
        opt_id
    }
    , function setClasses(map, opt_id) {
        opt_id = opt_id || this.nextID()
        for (var keys = Objects.keys(map), i = 0; i < keys.length; i++)
            this.setClass(keys[i], map[keys[i]], opt_id)
        return opt_id
    }
    , function insertInElement(name) {
        var e
        this.X.$(name).innerHTML = this.toHTML(),
        this.initHTML()
    }
    , function write(opt_X) {
        var opt_X = opt_X || this.X
        opt_X.writeView(this, opt_X)
    }
    , function updateHTML() {
        this.$ && (this.destroy(),
        this.construct())
    }
    , function construct() {
        this.SUPER(),
        this.generateContent()
    }
    , function generateContent() {
        this.$ && (this.$.innerHTML = this.toInnerHTML(),
        this.initInnerHTML())
    }
    , function toInnerHTML() {
        return ""
    }
    , function toHTML() {
        return this.invokeDestructors(),
        "<" + this.tagName + ' id="' + this.id + '"' + this.cssClassAttr() + ">" + this.toInnerHTML() + "</" + this.tagName + ">"
    }
    , function initHTML() {
        this.initInnerHTML(),
        this.initKeyboardShortcuts(),
        this.maybeInitTooltip()
    }
    , function maybeInitTooltip() {
        this.tooltip && this.$ && (this.$.addEventListener("mouseenter", this.openTooltip),
        this.$.addEventListener("mouseleave", this.closeTooltip))
    }
    , function initInnerHTML() {
        this.invokeInitializers(),
        this.initChildren()
    }
    , function initChildren() {
        if (this.children)
            for (var i = 0; i < this.children.length; i++)
                try {
                    this.children[i].initHTML && this.children[i].initHTML()
                } catch (x) {
                    console.log("Error on View.child.initHTML", x, x.stack)
                }
    }
    , function invokeInitializers() {
        for (var i = 0; i < this.initializers_.length; i++)
            this.initializers_[i]()
        this.initializers_ = []
    }
    , function invokeDestructors() {
        for (var i = 0; i < this.destructors_.length; i++)
            this.destructors_[i]()
        this.destructors_ = []
    }
    , function evtToCharCode(evt) {
        var s = ""
        return evt.altKey && (s += "alt-"),
        evt.ctrlKey && (s += "ctrl-"),
        evt.shiftKey && "keydown" === evt.type && (s += "shift-"),
        evt.metaKey && (s += "meta-"),
        s += "keydown" === evt.type ? this.NAMED_CODES[evt.which] || String.fromCharCode(evt.which) : String.fromCharCode(evt.charCode)
    }
    , function initKeyboardShortcuts() {
        var keyMap = {}, found = !1, self = this, target
        function init(actions, opt_value) {
            actions.forEach(function(action) {
                for (var j = 0; j < action.keyboardShortcuts.length; j++) {
                    var key = action.keyboardShortcuts[j]
                    self.NAMED_CODES[key] ? key = self.NAMED_CODES[key] : "number" == typeof key && (key = String.fromCharCode(key)),
                    keyMap[key] = opt_value ? function() {
                        action.maybeCall(self.X, opt_value.get())
                    }
                    : action.maybeCall.bind(action, self.X, self),
                    found = !0
                }
            })
        }
        init(this.model_.getRuntimeActions()),
        this.data && this.data.model_ && this.data.model_.getRuntimeActions().length && init(this.data.model_.getRuntimeActions(), this.data$),
        found && (console.assert(this.$, "View must define outer id when using keyboard shortcuts: " + this.name_),
        this.keyMap_ = keyMap,
        (target = this.$parent).setAttribute("tabindex", target.tabIndex + ""),
        target.addEventListener("keydown", this.onKeyboardShortcut),
        target.addEventListener("keypress", this.onKeyboardShortcut))
    }
    , function destroy(isParentDestroyed) {
        this.invokeDestructors(),
        this.SUPER(isParentDestroyed),
        delete this.instance_.$
    }
    , function close() {
        this.$ && this.$.remove(),
        this.destroy(),
        this.publish("closed")
    }
    , function rectOnPage() {
        for (var node = this.$, x = 0, y = 0, parent, rect = this.$.getBoundingClientRect(); node; )
            x += (parent = node).offsetLeft,
            y += node.offsetTop,
            node = node.offsetParent
        return {
            top: y,
            left: x,
            right: x + rect.width,
            bottom: y + rect.height,
            width: rect.width,
            height: rect.height
        }
    }
    , function rectOnViewport() {
        return this.$.getBoundingClientRect()
    }
    , function viewportOnPage() {
        var bodyRect = this.X.document.documentElement.getBoundingClientRect()
          , vpSize = this.viewportSize()
        return {
            left: -bodyRect.left,
            top: -bodyRect.top,
            width: vpSize.width,
            height: vpSize.height,
            right: -bodyRect.left + vpSize.width,
            bottom: -bodyRect.top + vpSize.height
        }
    }
    , function viewportSize() {
        return {
            height: window.innerHeight || this.X.document.documentElement.clientHeight,
            width: window.innerWidth || this.X.document.documentElement.clientWidth
        }
    }
    , function createView(prop, opt_args) {
        var X = opt_args && opt_args.X || this.Y
          , opt_args = this.PropertyView.create({
            id: (this.nextID ? this.nextID() : this.id) + "PROP",
            prop: prop,
            copyFrom: opt_args
        }, X)
        return this[prop.name + "View"] = opt_args.view,
        opt_args
    }
    , function removeChild(child) {
        this.PropertyView.isInstance(child) && child.prop && delete this[child.prop.name + "View"],
        this.SUPER(child)
    }
    , function createRelationshipView(r, opt_args) {
        if (opt_args.model_)
            return this.createView(r, opt_args)
        var X = opt_args && opt_args.X || this.Y
          , opt_args = this.AsyncLoadingView.create({
            id: this.nextID(),
            name: r.name,
            model: "foam.ui.RelationshipView",
            args: {
                relationship: r
            },
            copyFrom: opt_args
        }, X)
        return opt_args.view && (opt_args = opt_args.view),
        this[r.name + "View"] = opt_args
    }
    , function createActionView(action, opt_args) {
        var X = opt_args && opt_args.X || this.Y
          , modelName = opt_args && opt_args.model_ ? opt_args.model_ : "foam.ui.ActionButton"
          , modelName = this.AsyncLoadingView.create({
            id: this.nextID(),
            name: action.name,
            model: modelName,
            args: {
                action: action
            },
            copyFrom: opt_args
        }, X)
        return modelName.view && (modelName = modelName.view),
        this[action.name + "View"] = modelName.cview || modelName,
        modelName
    }
    , function createTemplateView(name, opt_args) {
        var opt_args = opt_args || {}, X = this.Y, myData = this.data$, o, v, o, v
        if (myData && myData.value && myData.value.model_ && (o = myData.value.model_.getFeature(name)))
            return v = Action.isInstance(o) ? this.createActionView(o, opt_args) : Relationship.isInstance(o) ? this.createRelationshipView(o, opt_args) : this.createView(o, opt_args),
            this.addDataChild(v),
            v
        if (o = this.model_.getFeature(name))
            return v = Action.isInstance(o) ? this.createActionView(o, opt_args) : Relationship.isInstance(o) ? this.createRelationshipView(o, opt_args) : this.createView(o, opt_args),
            this.addSelfDataChild(v),
            v
        throw "Unknown View Name: " + name
    }
    , function dynamicTag(tagName, f) {
        var id = this.nextID()
          , self = this
        return this.addInitializer(function() {
            self.X.dynamicFn(function() {
                var html = f()
                  , e = self.X.$(id)
                e && (e.innerHTML = html)
            })
        }),
        "<" + tagName + ' id="' + id + '"></' + tagName + ">"
    }
    ],
    listeners: [{
        name: "openTooltip",
        code: function(e) {}
    }, {
        name: "closeTooltip",
        code: function(e) {
            this.tooltip_ && (this.tooltip_.close(),
            this.tooltip_ = null)
        }
    }, {
        name: "onKeyboardShortcut",
        code: function(evt) {
            var action;
            ("keydown" !== evt.type || this.KEYPRESS_CODES[evt.which]) && ((action = this.keyMap_[this.evtToCharCode(evt)]) && (action(),
            evt.preventDefault(),
            evt.stopPropagation()))
        }
    }]
}),
CLASS({
    package: "foam.input.touch",
    name: "GestureTarget",
    properties: [{
        name: "id"
    }, {
        name: "gesture",
        help: "The name of the gesture to be tracked."
    }, {
        name: "containerID",
        help: "The containing DOM node's ID. Used for checking what inputs are within which gesture targets."
    }, {
        model_: "BooleanProperty",
        name: "enforceContainment",
        type: "Boolean",
        help: "Require that the start and end of a matching gesture be inside the container.",
        defaultValue: !1
    }, {
        name: "getElement",
        defaultValue: function() {
            return this.X.$(this.containerID)
        },
        help: "Function to retrieve the element this gesture is attached to. Defaults to $(containerID)."
    }, {
        name: "handler",
        help: "The target for the gesture's events, after it has been recognized."
    }],
    help: "Created by each view that wants to receive gestures."
}),
CLASS({
    package: "foam.ui",
    name: "ActionBorder",
    methods: [function toHTML(border, delegate, args) {
        for (var str = "", actions = (str = str + delegate.apply(this, args) + '<div class="actionToolbar">',
        this.model_.getRuntimeActions()), i = 0; i < actions.length; i++) {
            var v = this.createActionView(actions[i])
            this.addSelfDataChild(v),
            str += " " + v.toView_().toHTML() + " "
        }
        if (this.X.lookup("foam.ui.DetailView").isInstance(this))
            for (var actions = this.model.actions, i = 0; i < actions.length; i++) {
                var v = this.createActionView(actions[i])
                this.addDataChild(v),
                str += " " + v.toView_().toHTML() + " "
            }
        return str += "</div>"
    }
    ]
}),
CLASS({
    package: "foam.ui",
    name: "PropertyView",
    extends: "foam.ui.AsyncLoadingView",
    properties: [{
        name: "prop",
        postSet: function(old, nu) {
            old && this.bound_ && this.unbindData(this.data),
            nu && !this.bound_ && this.bindData(this.data),
            this.args = nu,
            this.model = this.innerView || nu.view
        }
    }, {
        name: "data",
        postSet: function(old, nu) {
            old && this.bound_ && this.unbindData(old),
            nu && this.bindData(nu)
        }
    }, {
        name: "childData"
    }, {
        name: "innerView",
        postSet: function(old, nu) {
            this.model = nu
        },
        help: "Override for prop.view"
    }, {
        name: "view",
        adapt: function(_, v) {
            return v && v.toView_ ? v.toView_() : v
        }
    }, {
        model_: "BooleanProperty",
        name: "bound_",
        type: "Boolean",
        defaultValue: !1
    }, {
        name: "parent",
        postSet: function(_, p) {
            p && (p[this.prop.name + "View"] = this.view.cview || this.view,
            this.view && (this.view.parent = p))
        }
    }],
    methods: [function unbindData(oldData) {
        var oldData
        this.bound_ && oldData && this.prop && (oldData = oldData.propertyValue(this.prop.name),
        Events.unlink(oldData, this.childData$),
        this.bound_ = !1)
    }
    , function bindData(data) {
        var self = this, pValue
        !this.bound_ && data && this.prop && (pValue = data.propertyValue(this.prop.name),
        Events.link(pValue, this.childData$),
        this.prop.validate && this.X.dynamic3(data, this.prop.validate, function(error) {
            self.view && (self.view.$.style.border = error ? "2px solid red" : "")
        }),
        this.bound_ = !0)
    }
    , function toString() {
        return "PropertyView(" + this.prop.name + ", " + this.view + ")"
    }
    , function destroy(isParentDestroyed) {
        this.unbindData(this.data),
        this.SUPER(isParentDestroyed)
    }
    , function construct() {
        this.bindData(this.data),
        this.SUPER()
    }
    , function finishRender(view) {
        view.prop = this.prop,
        this.SUPER(view)
    }
    , function addDataChild(child) {
        Events.link(this.childData$, child.data$),
        this.addChild(child)
    }
    ]
}),
CLASS({
    package: "foam.ui",
    name: "AsyncLoadingView",
    extends: "foam.ui.BaseView",
    properties: [{
        model_: "StringProperty",
        name: "id",
        label: "Element ID",
        type: "String"
    }, {
        name: "name",
        label: "The parent view's name for this"
    }, {
        name: "model",
        label: "View model name, model definition, or JSON with a factory_ specified."
    }, {
        name: "args",
        label: "View construction arguments",
        defaultValueFn: function() {
            return {}
        }
    }, {
        name: "copyFrom",
        label: "Additional arguments to this.copyFrom(...) when ready.",
        lazyFactory: function() {
            return {}
        }
    }, {
        name: "view"
    }],
    methods: [function init() {
        this.SUPER()
        var skipKeysArgDecorator = Object.create(this.args)
        if (skipKeysArgDecorator.hasOwnProperty = this.skipKeysFn_hasOwnProperty,
        skipKeysArgDecorator.inner = this.args,
        this.copyFrom && this.copyFrom.model && (skipKeysArgDecorator.model = this.copyFrom.model),
        this.copyFrom && this.copyFrom.model_) {
            if ("string" == typeof this.copyFrom.model_)
                return this.requireModelName(this.copyFrom.model_, skipKeysArgDecorator)
            if (Model.isInstance(this.copyFrom.model_))
                return this.finishRender(this.copyFrom.model_.create(skipKeysArgDecorator, this.Y))
        }
        return "string" == typeof this.model ? this.requireModelName(this.model, skipKeysArgDecorator) : this.model.model_ && "string" == typeof this.model.model_ ? this.requireViewInstance(FOAM(this.model)) : this.model.model_ ? Model.isInstance(this.model) ? this.finishRender(this.model.create(skipKeysArgDecorator, this.Y)) : (this.mergeWithCopyFrom(this.model),
        this.finishRender(this.model.model_.create(skipKeysArgDecorator, this.Y))) : this.model.factory_ ? (this.mergeWithCopyFrom(this.model),
        this.requireModelName(this.model.factory_, skipKeysArgDecorator)) : "function" == typeof this.model ? this.finishRender(this.model(skipKeysArgDecorator, this.Y)) : (console.warn("AsyncLoadingView: View load with invalid model. ", this.model, this.args, this.copyFrom),
        void 0)
    }
    , function mergeWithCopyFrom(other) {
        for (var key in other)
            "factory_" == key || (this.copyFrom[key] = other[key])
    }
    , function skipKeysFn_hasOwnProperty(name) {
        return "factory_" != name && "model_" != name && "view" != name && this.inner.hasOwnProperty(name)
    }
    , function requireViewInstance(view) {
        view.arequire()(function(m) {
            this.finishRender(view)
        }
        .bind(this))
    }
    , function requireModelName(name, args) {
        this.X.arequire(name)(function(m) {
            this.finishRender(m.create(args, this.Y))
        }
        .bind(this))
    }
    , function finishRender(view) {
        var skipKeysCopyFromDecorator, skipKeysCopyFromDecorator = (this.copyFrom && ((skipKeysCopyFromDecorator = Object.create(this.copyFrom)).hasOwnProperty = this.skipKeysFn_hasOwnProperty,
        skipKeysCopyFromDecorator.inner = this.copyFrom,
        view.copyFrom(skipKeysCopyFromDecorator)),
        this.view = view.toView_(),
        this.addDataChild(this.view),
        this.X.$(this.id))
        skipKeysCopyFromDecorator && (skipKeysCopyFromDecorator.outerHTML = this.toHTML(),
        this.initHTML())
    }
    , function toHTML() {
        return this.view ? this.view.toHTML() : '<div id="' + this.id + '"></div>'
    }
    , function initHTML() {
        this.view && this.view.initHTML()
    }
    , function toString() {
        return "AsyncLoadingView(" + this.model + ", " + this.view + ")"
    }
    , function fromElement(e) {
        return this.view.fromElement(e),
        this
    }
    ]
}),
CLASS({
    package: "foam.ui",
    name: "BaseView",
    extends: "foam.patterns.ChildTreeTrait",
    properties: [{
        name: "data"
    }],
    methods: [function addDataChild(child) {
        Events.link(this.data$, child.data$),
        this.addChild(child)
    }
    , function addSelfDataChild(child) {
        (child.data = this).addChild(child)
    }
    , function toView_() {
        return this
    }
    ]
}),
CLASS({
    package: "foam.patterns",
    name: "ChildTreeTrait",
    properties: [{
        name: "parent",
        visibility: "hidden",
        hidden: !0
    }, {
        name: "children",
        factory: function() {
            return []
        }
    }],
    methods: [function onAncestryChange_() {
        Array.prototype.forEach.call(this.children, function(c) {
            c.onAncestryChange_ && c.onAncestryChange_()
        })
    }
    , function addChild(child) {
        var children
        if (child.parent !== this)
            return child.parent = this,
            child.onAncestryChange_ && child.onAncestryChange_(),
            (children = this.children).push(child),
            this.children = children,
            this
    }
    , function removeChild(child) {
        return child.destroy && child.destroy(!0),
        this.children.deleteI(child),
        child.parent = void 0,
        this
    }
    , function removeAllChildren(isParentDestroyed) {
        var list = this.children
        this.children = [],
        Array.prototype.forEach.call(list, function(child) {
            this.removeChild(child)
        }
        .bind(this))
    }
    , function addChildren() {
        for (var i = 0; i < arguments.length; ++i)
            this.addChild(arguments[i])
        return this
    }
    , function destroy(isParentDestroyed) {
        return isParentDestroyed ? (Array.prototype.forEach.call(this.children, function(child) {
            child.destroy && child.destroy(!0)
        }),
        this.children = []) : this.removeAllChildren(),
        this
    }
    , function construct() {
        return this
    }
    , function deepPublish(topic) {
        var count = this.publish.apply(this, arguments)
        if (this.children)
            for (var i = 0; i < this.children.length; i++) {
                var child = this.children[i]
                count += child.deepPublish.apply(child, arguments)
            }
        return count
    }
    ]
}),
CLASS({
    package: "foam.core.types",
    name: "DocumentInstallProperty",
    extends: "Property",
    properties: [{
        model_: "FunctionProperty",
        name: "documentInstallFn",
        type: "Function"
    }, {
        name: "hidden",
        defaultValue: !0
    }],
    methods: [function initPropertyAgents(proto, fastInit) {
        this.SUPER(proto, fastInit)
        var thisProp = this, DocumentInstallProperty = thisProp.model_, recurse
        proto.addInitAgent(12, ": install in document ", function(o, X, Y) {
            var o = o.model_
            o && X.installedModels && !X.installedModels[o.id] && thisProp.documentInstallFn.call(proto, X)
        }),
        proto.__proto__.model_ && (recurse = function(baseProto) {
            var baseProp = baseProto.model_.getProperty(thisProp.name)
            baseProp && (proto.addInitAgent(12, ": inherited install in document ", function(o, X, Y) {
                var model = baseProto.model_
                model && X.installedModels && !X.installedModels[model.id] && baseProp.documentInstallFn.call(baseProto, X)
            }),
            proto.addInitAgent(13, ": completed inherited install in document ", function(o, X, Y) {
                X.installedModels[baseProto.model_.id] = !0
            }),
            baseProto.__proto__.model_ && recurse(baseProto.__proto__))
        }
        )(proto.__proto__),
        proto.addInitAgent(13, ": completed install in document ", function(o, X, Y) {
            X.installedModels[o.model_.id] = !0
        })
    }
    ],
    help: "Describes a function property that runs once per document"
}),
CLASS({
    package: "foam.ui",
    name: "U2ViewTrait",
    methods: [function toE() {
        return this
    }
    , function load() {
        return this.initHTML && this.initHTML()
    }
    , function unload() {
        return this.destroy && this.destroy()
    }
    , function toString() {
        return this.toHTML ? this.toHTML() : ""
    }
    ]
}),
CLASS({
    package: "foam.ui",
    name: "DestructiveDataView",
    extends: "foam.ui.BaseView",
    requires: ["SimpleValue"],
    properties: [{
        name: "data",
        preSet: function(old, nu) {
            return this.shouldDestroy(old, nu) && this.destroy(),
            nu
        },
        postSet: function(old, nu) {
            this.shouldDestroy(old, nu) && this.construct()
        }
    }, {
        name: "dataLinkedChildren",
        factory: function() {
            return []
        }
    }],
    methods: [function shouldDestroy(old, nu) {
        return !0
    }
    , function destroy(isParentDestroyed) {
        isParentDestroyed || (this.dataLinkedChildren.forEach(function(child) {
            Events.unfollow(this.data$, child.data$)
        }
        .bind(this)),
        this.dataLinkedChildren = []),
        this.SUPER(isParentDestroyed)
    }
    , function addDataChild(child) {
        Events.follow(this.data$, child.data$),
        this.dataLinkedChildren.push(child),
        this.addChild(child)
    }
    ]
}),
CLASS({
    package: "foam.graphics",
    name: "CViewView",
    extends: "foam.graphics.AbstractCViewView",
    properties: [{
        name: "cview",
        postSet: function(_, cview) {
            (cview.view = this).X.dynamicFn(function() {
                var w = cview.x + cview.width
                  , h = cview.y + cview.height
                this.width = w ? Math.max(this.width, w) : 0,
                this.height = h ? Math.max(this.height, h) : 0
            }
            .bind(this))
        }
    }],
    methods: [function shouldDestroy() {
        return !1
    }
    , function destroy() {
        this.SUPER(),
        this.cview && this.cview.destroy()
    }
    ],
    help: "DOM wrapper for a CView, auto adjusts it size to fit the given cview."
}),
CLASS({
    package: "foam.apps.calc",
    name: "CalcSpeechView",
    extends: "foam.ui.View",
    properties: [{
        name: "calc"
    }, {
        name: "lastSaid"
    }],
    actions: [{
        name: "repeat",
        code: function() {
            this.say(this.lastSaid)
        },
        keyboardShortcuts: ["r"]
    }, {
        name: "sayState",
        code: function() {
            var last = this.calc.history[this.calc.history.length - 1], unary
            last ? (unary = last && last.op.unary,
            this.calc.op !== this.calc.DEFAULT_OP ? this.say(unary ? this.calc.a2 + " " + last.op.speechLabel : last.a2 + " " + this.calc.op.speechLabel + " " + this.calc.a2) : this.say(unary ? last.a2 + " " + last.op.speechLabel + " " + this.calc.model_.EQUALS.speechLabel + " " + this.calc.a2 : last.op !== this.calc.DEFAULT_OP ? this.calc.history[this.calc.history.length - 2].a2 + " " + last.op.speechLabel + " " + last.a2 + " " + this.calc.model_.EQUALS.speechLabel + " " + this.calc.a2 : this.calc.a2)) : this.say(this.calc.a2)
        },
        keyboardShortcuts: ["s"]
    }, {
        name: "sayModeState",
        code: function() {
            this.say(this.calc.degreesMode ? "degrees" : "radians")
        },
        keyboardShortcuts: ["t"]
    }],
    methods: [function say(msg) {
        this.lastSaid = msg
        var msg = document.createTextNode(" " + msg + " ")
        msg.id = this.nextID(),
        this.$.innerHTML = "",
        this.$.appendChild(msg)
    }
    , function toHTML() {
        return '<div id="' + this.id + '" style="position:absolute;left:-1000000;" aria-live="polite"></div>'
    }
    , function initHTML() {
        this.SUPER(),
        this.calc.subscribe(["action"], this.onAction)
    }
    ],
    listeners: [{
        name: "onAction",
        code: function(calc, topic, action) {
            var last = this.calc.history[this.calc.history.length - 1]
              , last = last && last.op.unary
            this.say("equals" === action.name ? action.speechLabel + " " + this.calc.a2 : last ? action.speechLabel + " " + this.calc.model_.EQUALS.speechLabel + " " + this.calc.a2 : action.speechLabel)
        },
        whenIdle: !0
    }]
}),
CLASS({
    package: "foam.apps.calc",
    name: "Fonts",
    traits: ["foam.ui.CSSLoaderTrait"],
    constants: [{
        name: "CSS_",
        value: "\n@font-face {\n  font-family: 'Roboto';\n  font-style: 'normal';\n  font-weight: 300;\n  src: url('data:font/ttf;base64,AAEAAAARAQAABAAQR1BPUzRI99kAAHI4AAAM1kdTVUKUJp5SAAB/EAAAAIhPUy8yoEOxkgAAaawAAABgY21hcOKDIVoAAGr0AAADOGN2dCADnymYAABwoAAAAFJmcGdtc/cfqwAAbiwAAAG8Z2FzcAAIABMAAHIsAAAADGdseWZG8Bd1AAABHAAAYtxoZG14BQD34gAAagwAAADoaGVhZPgzqwIAAGXYAAAANmhoZWEKqQZmAABpiAAAACRobXR4cRZXzgAAZhAAAAN2bG9jYV0wQ9wAAGQYAAABvm1heHADDgNcAABj+AAAACBuYW1lEV0tSgAAcPQAAAEYcG9zdP9tAGQAAHIMAAAAIHByZXCFkG0zAABv6AAAALgABQBkAAADKAWwAAMABgAJAAwADwBvsgwQERESObAMELAA0LAMELAG0LAMELAJ0LAMELAN0ACwAEVYsAIvG7ECHT5ZsABFWLAALxuxAA0+WbIEAgAREjmyBQIAERI5sgcCABESObIIAgAREjmwCtyyDAIAERI5sg0CABESObACELAO3DAxISERIQMRAQERAQMhATUBIQMo/TwCxDb+7v66AQzkAgP+/gEC/f0FsPqkBQf9fQJ3+xECeP1eAl6IAl4AAgCZ//gBPgWwAAMADQA7sgYODxESObAGELAA0ACwAEVYsAIvG7ECHT5ZsABFWLAMLxuxDA0+WbIGBQorWCHYG/RZsAHQsAEvMDEBIwMzAzQ2MhYVFAYiJgEcbwZ8iixMLS1MLAGVBBv6liIvLyIhLS0AAgCPBDsB3wYAAAQACQAVALADL7AC0LACL7AH0LADELAI0DAxEwMjEzMXAyMTM/MUUANh7BRRBGEFdP7HAcWM/scBxQACAFUAAASxBbAAGwAfAI8AsABFWLAMLxuxDB0+WbAARViwEC8bsRAdPlmwAEVYsAIvG7ECDT5ZsABFWLAaLxuxGg0+WbIdDAIREjl8sB0vGLIAAworWCHYG/RZsATQsB0QsAbQsB0QsAvQsAsvsggDCitYIdgb9FmwCxCwDtCwCxCwEtCwCBCwFNCwHRCwFtCwABCwGNCwCBCwHtAwMQEhAyMTIzUhEyE1IRMzAyETMwMzFSMDMxUhAyMDIRMhAvH+xk1jTf8BEFP+6QEpT2NPATtPZE/l91P//u9NZNwBO1P+xQGa/mYBml0BuWABoP5gAaD+YGD+R13+ZgH3AbkAAQBz/zAD/QaNACsAeLIDLC0REjkAsAovsABFWLAJLxuxCR0+WbAARViwDC8bsQwdPlmwAEVYsCAvG7EgEz5ZsABFWLAiLxuxIg0+WbICIgkREjmwCRCyEwEKK1gh2Bv0WbACELIZAQorWCHYG/RZsCIQsB/QsCIQsikBCitYIdgb9FkwMQE0JicmJjU0Njc1MxUWFhUjNCYjIgYVFBYEFhYVFAYHFSM1JiY1MxQWMzI2A4WQtuK2yKxmsMF3o42On5IBX59PzbNlydx4tqOOswFnb40/R8Obo8sOysoQ6MeduZV8eId3bZVopMkOvr0N48WcsZgABQBt/+sFhAXFAAwAGgAmADQAOABqALA1L7A3L7AARViwAi8bsQIdPlmwAEVYsCQvG7EkDT5ZsAIQsArQsAovshAECitYIdgb9FmwAhCyFwQKK1gh2Bv0WbAkELAd0LAdL7AkELIqBAorWCHYG/RZsB0QsjEECitYIdgb9FkwMRM0NjIWFRUUBiMiJjUXFBYzMjY1NTQmIyIGFQE0NjIWFRUUBiImNRcUFjMyNjU1NCYjIgYVBScBF22h+KGffHukYWdXVWVoVFNpAnyh9qOh9qNgZ1dWZWdWVGj+CEsCx0sEmIKrq4hHgKuoigddeHlgSV15eGT804KqqYpHgqqpiAVeeHliSWB1dmPoMARyMAADAGz/7ATPBcQAHgApADUAebItNjcREjmwLRCwF9CwLRCwINAAsABFWLAGLxuxBh0+WbAARViwEy8bsRMNPlmwAEVYsBgvG7EYDT5Zsg0GExESObIVBhMREjmyHgYTERI5sh8BCitYIdgb9FmyJAYTERI5siwGExESObAGELIzAQorWCHYG/RZMDEBJiY1NDYzMhYVFAcHATY1MxQHFyMnBgYjIiY1NDY3EzI2NwEnBwYVFBYDFBc3NjY1NCYjIgYBlFdPtpmLrKagAZBbb4DHkH5Pz3PQ9H2dqlurRP5pDi7EtDGHg0BSbFpidAMaaaVRmbKhfJCLfP4uk7r4q+iSTljVsmq9dv1BTUcB2A8joJaDnwQseqZkLm5KTml+AAABAHcEQgDiBgAABQAMALAEL7AC0LACLzAxEwMjEjUz4hFaBWYFc/7PASiWAAEAjP4qAm0GYAASABCyCBMUERI5ALAEL7APLzAxEzQSEjcXDgICFRQSEhcHJgICjHDYfB1CgmY/X6ZkHX/YbQJM2gGbAVVKUS+0+P7LxNH+fv7ZSk1MAVMBlwAAAQAh/ioCAgZgABEAELIHEhMREjkAsAQvsA4vMDEBFAICByc2EhI1NAICJzcWEhICAm3WgR1ip2BgqWAdftZwAj3c/mn+rk5NRgEmAYflzwGBAS9FTU3+rv5kAAABAB0CfQNKBbAADgAgALAARViwBC8bsQQdPlmwANAZsAAvGLAJ0BmwCS8YMDEBJTcFAzMDJRcFEwcDAycBaf60IAFMBGgIAUQh/rPfVdbMVQPobGV7AXL+i39lc/7aPwEx/tE9AAABAEsAkgQxBLYACwAaALAJL7AA0LAJELIGAQorWCHYG/RZsAPQMDEBIRUhESMRITUhETMCdgG7/kV5/k4BsnkC5HD+HgHicAHSAAEAPP7wAQ8AvAAHABEAsAgvsgQFCitYIdgb9FkwMRMnNjc1MxUUg0dbA3X+8DR6g5t90AABADECUAIQArUAAwARALACL7IBAQorWCHYG/RZMDEBITUhAhD+IQHfAlBlAAEAkf/4ATwAnAAIABsAsABFWLAHLxuxBw0+WbICBQorWCHYG/RZMDE3NDYyFhQGIiaRLVAuLlAtSCMxMUYtLQABAB7/gwLqBbAAAwATALAAL7AARViwAi8bsQIdPlkwMRcjATOLbQJgbH0GLQAAAgB4/+wD9wXEAA0AGwBGsgocHRESObAKELAR0ACwAEVYsAovG7EKHT5ZsABFWLADLxuxAw0+WbAKELIRAQorWCHYG/RZsAMQshgBCitYIdgb9FkwMQEQAiMiAgMREBIzMhITBzQCIyIGBxEUEjMyEjcD9+Lc2OYD5NvY5AR4o6WipAKpoaClAQJf/sz+wQE5ASsBBQEzATz+z/7XBvoBAPr0/uL5/vgBAvkAAAEAsgAAArYFtQAGADkAsABFWLAFLxuxBR0+WbAARViwAC8bsQANPlmyBAAFERI5sAQvsgMBCitYIdgb9FmyAgMFERI5MDEhIxEFNSUzArZ4/nQB8BQFIJNwuAAAAQBpAAAEGQXEABkATrIJGhsREjkAsABFWLARLxuxER0+WbAARViwAC8bsQANPlmyGAEKK1gh2Bv0WbAC0LIEEQAREjmwERCyCQEKK1gh2Bv0WbIWEQAREjkwMSEhNQE2NjU0JiMiBhUjNDY2MzIWFRQGBwEhBBn8cAHzfGCijpO1d2/Ng8jhf6D+agL9XAI2j7pYiqG8lnvKc9K1ZvK1/jUAAQBi/+wD9AXEACsAfrIcLC0REjkAsABFWLAQLxuxEB0+WbAARViwHC8bsRwNPlmyARwQERI5sAEvsl8BAV2yLwEBXbRPAV8BAnGwEBCyCAEKK1gh2Bv0WbILEBwREjmwARCyKgEKK1gh2Bv0WbIWKgEREjmyIRwQERI5sBwQsiQBCitYIdgb9FkwMQEzMjY2NTQmIyIGFSM0NjYzMhYVFAYHFhYVFAYjIiYmNTMUFjMyNjU0JiMjAZN8Z5pRnpSMs3hyynvG5IV0iIz0zILZd3jCmJutu7Z4AxlJf1OMnqWHcbtm2LxpsSwmuYC75Gi7fIuvn5eSmgACAEMAAARLBbAACgAOAEkAsABFWLAJLxuxCR0+WbAARViwBC8bsQQNPlmyAQkEERI5sAEvsgIBCitYIdgb9FmwBtCwARCwC9CyCAYLERI5sg0JBBESOTAxATMVIxEjESE1ATMBIREHA2jj43j9UwKig/1uAho1AdVl/pABcEQD/PwlA0BcAAEAqP/sBBYFsAAdAGayGh4fERI5ALAARViwAS8bsQEdPlmwAEVYsA0vG7ENDT5ZsAEQsgMBCitYIdgb9FmyBwENERI5sAcvshENARESObANELIUAQorWCHYG/RZsAcQshoBCitYIdgb9FmyHQENERI5MDETEyEVIQM2MzISFRQGIyImJzMWFjMyNjU0JiMiBgfaRwLY/Y8zdZ3F6uTPvuwRcxGoj5yfsppVfkYC6gLGb/4UUP8A1eb+1L+Vmca3oMorPgACAIL/7AQIBbsAFgAjAGKyAyQlERI5sAMQsBfQALAARViwAC8bsQAdPlmwAEVYsA8vG7EPDT5ZsAAQsgEBCitYIdgb9FmyCAAPERI5sAgvsgUIDxESObIXAQorWCHYG/RZsA8Qsh4BCitYIdgb9FkwMQEVIyAAAzY2MzISFRQGBiMiADU1EAAlAyIGBxUUFjMyNjU0JgNLDv77/tQQPLpzwONqxn/R/voBZAFH23LFIcOcjK2tBbtp/s3+71Nb/vfWjuR/AS/weAGHAa0E/ZqHaGa+8N6prNAAAAEATQAABAoFsAAGADIAsABFWLAFLxuxBR0+WbAARViwAS8bsQENPlmwBRCyAwEKK1gh2Bv0WbIAAwUREjkwMQEBIwEhNSEECv2SfQJq/MQDvQVr+pUFSmYAAAMAav/sBAkFxAAWACAALACAsiQtLhESObAkELAJ0LAkELAe0ACwAEVYsBQvG7EUHT5ZsABFWLAJLxuxCQ0+WbIqCRQREjmwKi+yXyoBXbIvKgFdtE8qXyoCcbIaAQorWCHYG/RZsgMqGhESObIPGioREjmwCRCyHgEKK1gh2Bv0WbAUELIkAQorWCHYG/RZMDEBFAYHFhYVFAYjIiY1NDY3JiY1NDYgFgM0JiAGEBYzMjYDNCYjIgYVFBYzMjYD44Rsfpj+0dP9kn9sgOkBgOtSwv7SwLqfm7wmrYaIqamJh6sEOXGzKivAfrvb2rx8wisqs3G11tj8lYivrP7qpaQDRX2noYOAnJ0AAgBl//UD7AXEABcAJABesh8lJhESObAfELAL0ACwAEVYsAsvG7ELHT5ZsABFWLASLxuxEg0+WbIDEgsREjmwAy+wEhCyFAEKK1gh2Bv0WbADELIYAQorWCHYG/RZsAsQsh8BCitYIdgb9FkwMQEGBiMiJiY1NDY2MzISERUQACEjNzMkACUyNjc1NCYjIgYVFBYDdEC+b3y+aG/Hgtv0/rD+pxYBKgEFARD+qXi/KLmdjravAqJeZ4DihpDsg/7N/uZs/nb+dGgEASDDj3JF3vXlrqff//8Af//4ASwENwAmABLuAAAHABL/8AOb//8APP7wASEENwAnABL/5QObAAYAEAAAAAEATQDlA4gEOwAGADqyAAcIERI5ALAARViwBS8bsQUZPlmyAgcFERI5sAIvsgEBCitYIdgb9FmwBRCyBgEKK1gh2Bv0WTAxEwEVATUBFdACuPzFAzsCj/7UfgF7YQF6fgAAAgCVAaID1wOnAAMABwAlALAHL7AD0LADL7IAAQorWCHYG/RZsAcQsgQBCitYIdgb9FkwMQEhNSERITUhA9f8vgNC/L4DQgM9av37agAAAQB8AOcDyQQ9AAYAMACwAEVYsAIvG7ECGT5ZsgEBCitYIdgb9FmyBQcCERI5sAUvsgYBCitYIdgb9FkwMQEBNQEVATUDQ/05A038swKTAS97/oZh/oV8AAIAVP/4A0sFxAAYACQASbIJJSYREjmwCRCwHdAAsABFWLAQLxuxEB0+WbAARViwIi8bsSINPlmyHAUKK1gh2Bv0WbAA0LAAL7AQELIJAQorWCHYG/RZMDEBPgQ1NCYjIgYHIzY2MzIWFRQGBwYVAzQ2MzIWFRQGIyImAXgCPMY5H4V3eJMCdwLaqKzHYolxhysnJi0tJicrAZR2kMNRYT59j4l1pMXJrGy9fl+1/rIiLy8iIS0tAAACAHH+OwbmBYwANgBCAHyyJENEERI5sCQQsEDQALArL7AzL7AARViwBC8bsQQNPlmwAEVYsAkvG7EJDT5ZsgczBBESObIQMwQREjmwEC+wCRCyOgMKK1gh2Bv0WbAX0LAzELIdAgorWCHYG/RZsCsQsiQCCitYIdgb9FmwEBCyPwIKK1gh2Bv0WTAxAQ4CIyImJwYjIiY3PgIzMhYXAwYWMzI2NxIAISIEAgISBDMyNjcXBgYjIiQCExISJDMyBBIBFhYzMjcTJiMiBgIG2gVirXJhehRsvoyKEg93v21NdE0zCk9Xe5kJE/6m/qHT/q3EGJ0BPdtcsjwfOcxo+v6YswwM3QGA9f8BYqr7uwtaSrlYLUNbb6NMAgGT+4dmXMLyzaP/jytB/cZ0gPHOAZUBmdP+fv4I/oHOLCNQJjPhAacBGwEWAa3r1f5m/gFkbf8CBDGx/skAAAIAHgAABOEFsAAHAAoARgCwAEVYsAQvG7EEHT5ZsABFWLACLxuxAg0+WbAARViwBi8bsQYNPlmyCQQCERI5sAkvsgABCitYIdgb9FmyCgQCERI5MDEBIQMjATMBIwEhAQPK/WuWgQIndQIngPz6Akj+3AGY/mgFsPpQAgEDGQAAAwC4AAAEdgWwAA4AFwAgAG2yAiEiERI5sAIQsBHQsAIQsB/QALAARViwAS8bsQEdPlmwAEVYsAAvG7EADT5ZshgBABESObAYL7IvGAFdsg8BCitYIdgb9FmyCA8YERI5sAAQshABCitYIdgb9FmwARCyHwEKK1gh2Bv0WTAxMxEhMhYVFAYHFhYVFAYjAREhMjY1NCYjJSE2NjU0JiMhuAGu6vJ7a3+b+d7+lAFxnrmxnP6FAVCaqa+x/s0FsMG8cackHMJ/wdkCvP2soY+HnWcDi4WMhQAAAQCD/+wEvwXEABwAQLIDHR4REjkAsABFWLAMLxuxDB0+WbAARViwAy8bsQMNPlmwDBCyEgEKK1gh2Bv0WbADELIZAQorWCHYG/RZMDEBBgQjIiYCJzU0EjYzMgQXIwIhIgIRFRQSMzI2NwS/Gf7p6KL5iAGI/6bqAQ8WfC7+m8br5cPBxBcBxub0ogEpv73CASyj/d8Bc/7Y/vuy/P7UubkAAgC4AAAEvQWwAAsAFQBGshUWFxESObAVELAC0ACwAEVYsAEvG7EBHT5ZsABFWLAALxuxAA0+WbABELIMAQorWCHYG/RZsAAQsg0BCitYIdgb9FkwMTMRITIEEhUVFAIEIwERITIAETU0ACe4AZezARyfnv7huv7tARTmARb+7uAFsKP+0MKGw/7SpAVH+yEBMQEEgPsBLgEAAAEAuAAABEIFsAALAFMAsABFWLAGLxuxBh0+WbAARViwBC8bsQQNPlmyCwYEERI5sAsvsi8LAV2yAAEKK1gh2Bv0WbAEELICAQorWCHYG/RZsAYQsggBCitYIdgb9FkwMQEhESEVIREhFSERIQPc/VcDD/x2A4X89gKpArr9rmgFsGn92wAAAQC4AAAEPgWwAAkAQgCwAEVYsAQvG7EEHT5ZsABFWLACLxuxAg0+WbIJBAIREjl8sAkvGLIAAQorWCHYG/RZsAQQsgYBCitYIdgb9FkwMQEhESMRIRUhESED2v1ZewOG/PUCpwKo/VgFsGn9ygABAJH/7ATTBcQAIgBcsgsjJBESOQCwAEVYsAsvG7ELHT5ZsABFWLADLxuxAw0+WbIPAwsREjmwCxCyEgEKK1gh2Bv0WbADELIaAQorWCHYG/RZsiILAxESObAiL7IfAQorWCHYG/RZMDElBgQjIiQCJzUQACEyBBcjJiYjIgIRFRQWFjMyNzY3ESE1IQTTQP7vqav+9pIBATIBAuEBEhp7G8+nzO5x04mfckok/nkCAq1bZqQBLMK4AS8BX+XJoKX+3v74rKb/jDIhLAF4aAAAAQC4AAAE7wWwAAsAUQCwAEVYsAYvG7EGHT5ZsABFWLAKLxuxCh0+WbAARViwAC8bsQANPlmwAEVYsAQvG7EEDT5ZsgkGABESObAJL7IvCQFdsgIBCitYIdgb9FkwMSEjESERIxEzESERMwTvfPzAe3sDQHwCuv1GBbD9cgKOAAABANMAAAFOBbAAAwAdALAARViwAi8bsQIdPlmwAEVYsAAvG7EADT5ZMDEhIxEzAU57ewWwAAABAEf/7AO3BbAADwAvsgUQERESOQCwAEVYsAAvG7EAHT5ZsABFWLAFLxuxBQ0+WbIMAQorWCHYG/RZMDEBMxEUBiMiJjUzFBYzMjY3Azt878nU5Huml4uvAgWw/AHP9t7Hnp+4ngABALgAAATnBbAACwBMsgkMDRESOQCwAEVYsAQvG7EEHT5ZsABFWLAHLxuxBx0+WbAARViwAi8bsQINPlmwAEVYsAovG7EKDT5ZsgAEAhESObIGBAIREjkwMQEHESMRMxEBMwEBIwIAzXt7Auqb/Z4CkZYC08r99wWw/O8DEf14/NgAAQC4AAAEAwWwAAUAKACwAEVYsAQvG7EEHT5ZsABFWLACLxuxAg0+WbIAAQorWCHYG/RZMDElIRUhETMBNALP/LV8aGgFsAAAAQC4AAAGMwWwAA4AWQCwAEVYsAAvG7EAHT5ZsABFWLACLxuxAh0+WbAARViwBC8bsQQNPlmwAEVYsAgvG7EIDT5ZsABFWLAMLxuxDA0+WbIBAAQREjmyBwAEERI5sgoABBESOTAxCQIzESMREwEjARMRIxEBWwIZAhukewr94l/95Ap7BbD6+wUF+lACegKK+vwE//1//YIFsAAAAQC4AAAE9AWwAAkATLIBCgsREjkAsABFWLAFLxuxBR0+WbAARViwCC8bsQgdPlmwAEVYsAAvG7EADT5ZsABFWLADLxuxAw0+WbICBQAREjmyBwUAERI5MDEhIwERIxEzAREzBPR7/Lt8fANGegTe+yIFsPshBN8AAgB9/+wE7AXEAA8AHQBGsgQeHxESObAEELAT0ACwAEVYsAsvG7ELHT5ZsABFWLAELxuxBA0+WbALELITAQorWCHYG/RZsAQQshoBCitYIdgb9FkwMQEUAgQjIgARNTQSJCAEEhcHEAIjIgIRFRASMzISEQTsi/7+qf/+xo0BAgFQAQGMA3vuz8vx8M7R6gKJyf7QpAFtATaWxwEzpaL+2MMQAQcBKv7V/vSY/v3+0QErAQsAAgC4AAAEkgWwAAoAEwBNsgoUFRESObAKELAM0ACwAEVYsAMvG7EDHT5ZsABFWLABLxuxAQ0+WbILAwEREjmwCy+yAAEKK1gh2Bv0WbADELISAQorWCHYG/RZMDEBESMRITIEFRQGIyUhMjY1NCYnIQEzewHw4wEH/fD+jgF1s7y7rP6DAlH9rwWw6MvN32iqmJezAgAAAgB5/wIE6AXEABUAIwBGsggkJRESObAIELAg0ACwAEVYsBEvG7ERHT5ZsABFWLAILxuxCA0+WbARELIZAQorWCHYG/RZsAgQsiABCitYIdgb9FkwMQEUAgcFBwEGIyIkAic1NBIkMzIEEhUnEAIjIgIRFRASMzISEQTok4gBCVX+11JVpv79jgGNAQKnqgECjXvu0Mrx787Q7AKJ0P7LT+dMAQEXpAEtxaPHATOlpP7OyAEBBwEq/tX+9Jj+/f7RASoBCwAAAgC1AAAEuwWwAA4AFwBhshYYGRESObAWELAF0ACwAEVYsAQvG7EEHT5ZsABFWLACLxuxAg0+WbAARViwDS8bsQ0NPlmyEAQCERI5sBAvsgABCitYIdgb9FmyCwAEERI5sAQQshYBCitYIdgb9FkwMQEhESMRITIEFRQGBwEVIwEhMjY1NCYjIQLY/ll8AdnpAQakigFsg/z5AXmbvMSx/qUCXv2iBbDiy4zWKf2VDQLHsIyaqgABAFj/7ARsBcQAJwBjsgkoKRESOQCwAEVYsAkvG7EJHT5ZsABFWLAdLxuxHQ0+WbICHQkREjmyDgkdERI5sAkQshEBCitYIdgb9FmwAhCyFwEKK1gh2Bv0WbIiHQkREjmwHRCyJQEKK1gh2Bv0WTAxATQmJCcmNTQkMzIWFhUjNCYjIgYVFBYEFhYVFAQjIiQmNTMUFjMyNgPwqv48aJQBE9aR5X58zKynxrIBiMpm/u3hmv7/hXvmv6rOAWZ5jX9Laqyn0XDIe5W1lXhvjGtzoG2s0G7GgJqylgAAAQA0AAAElAWwAAcALgCwAEVYsAYvG7EGHT5ZsABFWLACLxuxAg0+WbAGELIAAQorWCHYG/RZsATQMDEBIREjESE1IQSU/g17/g4EYAVH+rkFR2kAAQCi/+wEowWwABEAPLIFEhMREjkAsABFWLAALxuxAB0+WbAARViwCS8bsQkdPlmwAEVYsAUvG7EFDT5Zsg4BCitYIdgb9FkwMQERDgIjIiQnETMRFBYgNjURBKMBgOmX5v7rBXrSAWjRBbD8HpPadfveA+v8J7jLzLYD2gAAAQAfAAAE0QWwAAgAMQCwAEVYsAMvG7EDHT5ZsABFWLAHLxuxBx0+WbAARViwBS8bsQUNPlmyAQMFERI5MDElFzcBMwEjATMCbwgJAcqH/eJ2/eKGtB8fBPz6UAWwAAEAPQAABvcFsAASAFkAsABFWLADLxuxAx0+WbAARViwCC8bsQgdPlmwAEVYsBEvG7ERHT5ZsABFWLAKLxuxCg0+WbAARViwDy8bsQ8NPlmyAQMKERI5sgYDChESObINAwoREjkwMQEXNwEzARc3ATMBIwEnBwEjATMBxS03ATxvATg2MAEHfv6Ldv62JST+rnb+jH4BieLYBDH7z9rkBCf6UARzkJD7jQWwAAABADcAAASvBbAACwBTALAARViwAS8bsQEdPlmwAEVYsAovG7EKHT5ZsABFWLAELxuxBA0+WbAARViwBy8bsQcNPlmyAAEEERI5sgYBBBESObIDAAYREjmyCQYAERI5MDEBATMBASMBASMBATMCcwGak/4eAfGU/lj+VpIB8v4dkwNIAmj9Mv0eAnz9hALiAs4AAAEAGAAABK4FsAAIADEAsABFWLABLxuxAR0+WbAARViwBy8bsQcdPlmwAEVYsAQvG7EEDT5ZsgABBBESOTAxAQEzAREjEQEzAmMBvY798nv985IClgMa/HT93AIkA4wAAAEAWgAABHIFsAAJAEQAsABFWLAHLxuxBx0+WbAARViwAi8bsQINPlmyAAEKK1gh2Bv0WbIEAAIREjmwBxCyBQEKK1gh2Bv0WbIJBQcREjkwMTchFSE1ASE1IRXvA4P76ANg/LoD3mhoXQTqaVgAAQCj/sgB7QaAAAcAIgCwBC+wBy+yAAEKK1gh2Bv0WbAEELIDAQorWCHYG/RZMDEBIxEzFSERIQHt0tL+tgFKBhr5FGYHuAAAAQAw/4MDBQWwAAMAEwCwAi+wAEVYsAAvG7EAHT5ZMDETMwEjMHUCYHUFsPnTAAEAAP7IAUsGgAAHACUAsAIvsAEvsAIQsgUBCitYIdgb9FmwARCyBgEKK1gh2Bv0WTAxESERITUzESMBS/6109MGgPhIZgbsAAEATQLZAvwFsAAGACuyAAcIERI5ALAARViwAy8bsQMdPlmyAQcDERI5sAEvsgADARESObAF0DAxAQMjATMBIwGl5HQBK1oBKnQFEv3HAtf9KQABAAH/mwNyAAAAAwAbALAARViwAy8bsQMNPlmyAAEKK1gh2Bv0WTAxBSE1IQNy/I8DcWVlAAABAGcE3QG2BfQAAwAfALABL7AD0LADL7QPAx8DAl2yAAEDERI5GbAALxgwMQEjAzMBtm3ikATdARcAAgBk/+wDxwROAB4AKQCAshcqKxESObAXELAg0ACwAEVYsBcvG7EXGT5ZsABFWLAALxuxAA0+WbAARViwBS8bsQUNPlmyAhcAERI5sgwXABESObAML7QvDD8MAl2wFxCyEAEKK1gh2Bv0WbITFwwREjmwBRCyHwEKK1gh2Bv0WbAMELIjAQorWCHYG/RZMDEhJicGBiMiJjU0JDMzNTQmIyIGFSc0NjMyFhcRFBcVJTI2NzUjBgYVFBYDRxIFP8NtnMEBB+vZj4l9pHjwr7XRAyH+CHi9K9azyoczZFJZroWeuHt0hYBaAYG9taL+AJ1ODFZ0Ye4Cf29beAAAAgCb/+wEAwYAAA8AGwBkshMcHRESObATELAM0ACwCC+wAEVYsAwvG7EMGT5ZsABFWLAGLxuxBg0+WbAARViwAy8bsQMNPlmyBQwGERI5sgoMBhESObAMELITAQorWCHYG/RZsAMQshkBCitYIdgb9FkwMQEUAiMiJwcjETMRNjMyEhEnNCYjIgYHERYzMjYEA+C94nQFcHdy4MDfeKaXc6ApWuSUpwIS/f7XqJQGAP2dsf7b/vsD1ulxbf4YzOoAAQBe/+wDzAROAB0AS7IQHh8REjkAsABFWLAQLxuxEBk+WbAARViwCC8bsQgNPlmyAAEKK1gh2Bv0WbIDCBAREjmyFBAIERI5sBAQshcBCitYIdgb9FkwMSUyNjczDgIjIgI1NTQ2NjMyFhcjJiYjIgYVFRQWAix9qQdzBXK9bNX5cNGMsucIcwinf6Kzs1GNcGOjXAEo+iSg9obUrX+c6tMjz+gAAAIAbP/sA9MGAAAPABoAYbIYGxwREjmwGBCwA9AAsAYvsABFWLADLxuxAxk+WbAARViwCC8bsQgNPlmwAEVYsAwvG7EMDT5ZsgUDCBESObIKAwgREjmyEwEKK1gh2Bv0WbADELIYAQorWCHYG/RZMDETNBIzMhcRMxEjJwYjIgIRFxQWMzI3ESYjIgZs4cHbc3dwBXPfu+V5ppfdXV3bl6gCJ/wBK60CX/oAkKQBLQEAB8/vwwH80+0AAAIAWv/sA9UETgAXAB8AYrIJICEREjmwCRCwGNAAsABFWLAJLxuxCRk+WbAARViwAC8bsQANPlmyHAkAERI5sBwvsg0BCitYIdgb9FmwABCyEgEKK1gh2Bv0WbIVCQAREjmwCRCyGAEKK1gh2Bv0WTAxBSImJjU1NDY2MzISFRUhFRQWMzI2NxcGASIGByE1JiYCP4rffHnYfsXn/PzToGCTPEuE/u+HuRQCiQWoFIjzlyuc+o/+8+lDF7j1Rk05vwP8xqcNnMQAAQA/AAACsQYVABUAZrIPFhcREjkAsABFWLAILxuxCB8+WbAARViwAy8bsQMZPlmwAEVYsBEvG7ERGT5ZsABFWLAALxuxAA0+WbARELIBAQorWCHYG/RZsALQsAgQsg0BCitYIdgb9FmwAhCwE9CwFNAwMTMRIzUzNTQ2MzIXByYjIgYVFSEVIRHys7Opl0Q7CTI7Y24BAv7+A9hig6ayEWQMe3GGYvwoAAACAGz+UQPUBE4AGgAmAIOyJCcoERI5sCQQsAvQALAARViwAy8bsQMZPlmwAEVYsAYvG7EGGT5ZsABFWLALLxuxCw8+WbAARViwFy8bsRcNPlmyBQMXERI5sg8LFxESObALELIRAQorWCHYG/RZshUDFxESObAXELIeAQorWCHYG/RZsAMQsiQBCitYIdgb9FkwMRM0EjMyFzczERQGIyImJzcWMzI2NzUGIyICNRcUFjMyNxEmJiMiBmzhwd1zBnDqyHHNO0N/r5aoA3PcvOR5ppfdXCqeb5eoAif+ASmwnPvc0fRlVEicsZ2IoAEs/wXP78YB92ht7QAAAQCcAAADzAYAABMASbIMFBUREjkAsBIvsABFWLADLxuxAxk+WbAARViwBy8bsQcNPlmwAEVYsBAvG7EQDT5ZsgADBxESObADELIMAQorWCHYG/RZMDEBNjYzMhYXESMRJiYjIgYHESMRMwETO7htrqoBdwF5hW+rKXd3A4NhasTE/ToCx5GOi3b9GwYAAAIAlQAAAToFxAADAAwAPrIGDQ4REjmwBhCwAdAAsABFWLACLxuxAhk+WbAARViwAC8bsQANPlmwAhCwC9CwCy+yBgUKK1gh2Bv0WTAxISMRMwM0NjIWFAYiJgEieHiNLEwtLUwsBDoBOSIvL0QuLgAC/5j+SwE1BcQADAAWAEmyDRcYERI5sA0QsADQALAARViwDC8bsQwZPlmwAEVYsAQvG7EEDz5ZsgkBCitYIdgb9FmwDBCwE9CwEy+yDQUKK1gh2Bv0WTAxAREUBiMiJzcWMzI1ERMyFhQGIyImNDYBHZCMNjMCLC6yPCcsLCcmKysEOvtFlp4TYw3NBLkBii9ELi5ELwABAJwAAAPiBgAADABRALAARViwBC8bsQQfPlmwAEVYsAgvG7EIGT5ZsABFWLACLxuxAg0+WbAARViwCy8bsQsNPlmyCgIIERI5sAoQsADQsgYIAhESObAGELAB0DAxAQcRIxEzETcBMwEBIwGdiXh4cQGel/41AfOPAiGE/mMGAPwpegGX/jj9jgABAKoAAAEiBgAAAwAdALAARViwAi8bsQIfPlmwAEVYsAAvG7EADT5ZMDEhIxEzASJ4eAYAAAABAJYAAAaEBE4AIAB3sgUhIhESOQCwAEVYsAQvG7EEGT5ZsABFWLAJLxuxCRk+WbAARViwAC8bsQAZPlmwAEVYsAwvG7EMDT5ZsABFWLAVLxuxFQ0+WbAARViwHi8bsR4NPlmyAQkMERI5sgYJDBESObAJELIRAQorWCHYG/RZsBrQMDEBFzY2MyAXNjYzIBMRIxEmJiMGBgcRIxEmJiMiBgcRIxEBCQQ8tG4BAEU6wnUBXAd4AXuLgbIKeAGBhnGiJ3gEOrBiYtJlbf6E/S4CyZGMAqN1/TQC0ouJgX/9GgQ6AAABAJwAAAPMBE4AEwBTsg0UFRESOQCwAEVYsAQvG7EEGT5ZsABFWLAALxuxABk+WbAARViwCC8bsQgNPlmwAEVYsBEvG7ERDT5ZsgEECBESObAEELINAQorWCHYG/RZMDEBFzY2MzIWFxEjESYmIyIGBxEjEQEOBD22bq6qAXcBeYVvqyl3BDq5ZGnExP06AseRjot2/RsEOgAAAgBa/+wEIAROAA8AHgBDsgQfIBESObAEELAT0ACwAEVYsAQvG7EEGT5ZsABFWLAMLxuxDA0+WbITAQorWCHYG/RZsAQQshsBCitYIdgb9FkwMRM0NjYzMgAVFRQGBiMiADUXFBYzMjY1NTQmJiMiBhVaed2M2AEMedyN1/7zeMmjoslcpmugygItnPqL/tH6GZ37iAEv+gnC+fnMF3zOcfvLAAACAJv+YAQCBE4ADwAcAG6yEx0eERI5sBMQsAzQALAARViwDC8bsQwZPlmwAEVYsAkvG7EJGT5ZsABFWLAGLxuxBg8+WbAARViwAy8bsQMNPlmyBQwDERI5sgoMAxESObAMELITAQorWCHYG/RZsAMQshoBCitYIdgb9FkwMQEUAiMiJxEjETMXNjMyEhEnNCYjIgYHERYWMzI2BALgvN52d28Gdd7C3XiqmG6eKiugbZepAhL9/tec/dgF2pmt/tr++wTP8Gpl/fldYvEAAAIAbP5gA9METgAPABsAa7IZHB0REjmwGRCwA9AAsABFWLADLxuxAxk+WbAARViwBi8bsQYZPlmwAEVYsAgvG7EIDz5ZsABFWLAMLxuxDA0+WbIFAwwREjmyCgMMERI5shMBCitYIdgb9FmwAxCyGQEKK1gh2Bv0WTAxEzQSMzIXNzMRIxEGIyICNRcUFjMyNxEmJiMiBmzhw9tyBnB4dte+5HmpltdgLZ9pl6oCJ/4BKaeT+iYCJpoBLP8F0u+7AhJhae8AAAEAnAAAApMETgAOAEayCw8QERI5ALAARViwDC8bsQwZPlmwAEVYsAgvG7EIGT5ZsABFWLAGLxuxBg0+WbAMELICBworWCHYG/RZsgoMBhESOTAxASYjIgYHESMRMxc2MzIXApAmK3CbIXd1Al/SMh0D1Ad9d/0ZBDqswA0AAAEAZf/sA5wETgAlAGOyCSYnERI5ALAARViwCS8bsQkZPlmwAEVYsBwvG7EcDT5ZsgIcCRESObINCRwREjmwCRCyEAEKK1gh2Bv0WbACELIWAQorWCHYG/RZsiAcCRESObAcELIjAQorWCHYG/RZMDEBNCYkJiY1NDYzMhYVIzQmIyIGFRQWBBYWFRQGIyImNTMWFjMyNgMkj/7gn03Wp7XbeJ95do93ATudTN2yvet4B6OGfZoBE1lsPU9yUYCns5BffmlUUVlKVHZUiaS3jGl1bgAAAQAX/+wCSQVPABUAX7IOFhcREjkAsABFWLABLxuxARk+WbAARViwEy8bsRMZPlmwAEVYsA0vG7ENDT5ZsAEQsADQsAAvsAEQsgMBCitYIdgb9FmwDRCyCAEKK1gh2Bv0WbADELAR0LAS0DAxAREzFSMRFBYzMjcXBiMiJjURIzUzEQFW4OBBTB5DBS9Re3DHxwVP/uti/S9aWApiEY+LAtJiARUAAAEAmP/sA8oEOgAQAFCyChESERI5ALAARViwBi8bsQYZPlmwAEVYsA0vG7ENGT5ZsABFWLAPLxuxDw0+WbAARViwAi8bsQINPlmyAA0PERI5sgoBCitYIdgb9FkwMSUGIyImJxEzERAzIDcRMxEjA1Rs7a20Anf6AQRFeHSJncnFAsD9T/7L1wMP+8YAAQAmAAADsQQ6AAYAOLIABwgREjkAsABFWLABLxuxARk+WbAARViwBS8bsQUZPlmwAEVYsAMvG7EDDT5ZsgAFAxESOTAxJQEzASMBMwHtAUl7/mxh/mp7pQOV+8YEOgAAAQA/AAAFwQQ6ABIAWQCwAEVYsAMvG7EDGT5ZsABFWLAILxuxCBk+WbAARViwES8bsREZPlmwAEVYsAovG7EKDT5ZsABFWLAPLxuxDw0+WbIBEQoREjmyBhEKERI5sg0RChESOTAxJRc3ATMBFzcTMwEjAScHASMBMwGfEhgBBGYBARwX3nz+xWb+6g0N/u9m/sZ7+V1iAzz8y3JpAz77xgNaOzz8pwQ6AAABADAAAAOyBDoACwBTALAARViwAS8bsQEZPlmwAEVYsAovG7EKGT5ZsABFWLAELxuxBA0+WbAARViwBy8bsQcNPlmyAAoEERI5sgYKBBESObIDAAYREjmyCQYAERI5MDEBATMBASMBASMBATMB8AEkjv6RAX+N/sz+zI0Bfv6RjQKDAbf97f3ZAcr+NgInAhMAAAEAIP5LA7AEOgAQAEOyAxESERI5ALAARViwAS8bsQEZPlmwAEVYsA8vG7EPGT5ZsABFWLAGLxuxBg8+WbIADwYREjmyCgEKK1gh2Bv0WTAxJQEzAQcGIyInJxcyNjc3ATMB8wE8gf4yGFm6KzEBPlhtJjX+aIOsA477DjjFDmMGV2qSBDEAAQBXAAADqgQ6AAkARACwAEVYsAcvG7EHGT5ZsABFWLACLxuxAg0+WbIAAQorWCHYG/RZsgQAAhESObAHELIFAQorWCHYG/RZsgkFBxESOTAxNyEVITUBITUhFesCv/ytApD9hAMTZWVYA3tnWQABAET+bAKaBj0AGAAssgsZGhESOQCwDS+wAC+yBw0AERI5sAcvsgYBCitYIdgb9FmyEwYHERI5MDEBJiY1NRAjNTIRNTY2NxcGERUUBxYVFRIXAn2oqufnAaipGvS4uATz/mwy4rvdAQdoAQXlt+IzT07+x9X2SU3x5P7cUQABALL+8gEXBbAAAwATALAAL7AARViwAi8bsQIdPlkwMQEjETMBF2Vl/vIGvgAAAQAJ/mwCXwY9ABgALLINGRoREjkAsAsvsBgvshELGBESObARL7ISAQorWCHYG/RZsgUSERESOTAxEzYTNTQ3JjU1ECc3FhYVFRAzFSIRFRQGBwnzBMHB9Bqrp+fnqqj+vFEBJOD9RET71QE8TE8z5brf/vto/vndu+IyAAEAkQGnBOYDEwAYADiyEhkaERI5ALAPL7AA0LAPELAV0LAVL7IDAQorWCHYG/RZsA8QsggBCitYIdgb9FmwAxCwDNAwMQEUBiMiLgIjIgYVBzQ2MzIWFxYWMzI2NQTmp4FIfbZYMlljbKKGSoVcQ2A3WGgC/JXAN6EpdnABlb0+Uj8zfm0AAgCM/pkBMQROAAMADAA+sgYNDhESObAGELAA0ACwAEVYsAovG7EKGT5ZsABFWLACLxuxAhU+WbAKELIHBQorWCHYG/RZsADQsAAvMDETMxMjExQGIiY0NjIWrm8HfIksTC0tTCwCsvvnBWUiLi5ELi4AAQB3/wsD5QUmACEAT7IbIiMREjkAsBIvsAgvsABFWLARLxuxERk+WbAARViwBy8bsQcNPlmyAAMKK1gh2Bv0WbAHELAK0LARELAU0LARELIbAworWCHYG/RZMDElMjY3MwYGBxUjNSYCNTU0Ejc1MxUWFhcjJiYjIgYVFRQWAkV7qQlzCM2UeLnU07p4m8gGcwinf6Kzs1GLcovEEOTlFwEe6STeASMX3NsQ0px/nOrTI8/oAAABAF0AAARGBcQAIQBushwiIxESOQCwAEVYsBQvG7EUHT5ZsABFWLAFLxuxBQ0+WbIfBRQREjmwHy+yAAEKK1gh2Bv0WbAFELIDAQorWCHYG/RZsAfQsAjQsAAQsA3QsB8QsA/QshcFFBESObAUELIbAQorWCHYG/RZMDEBExYHIRUhNTM2NzYnAyM1MwM0NjMyFhUjNCYjIgYVEyEVAZQJAkIC6fwbYjMaFAIJvLgJ3bm203uWgX2UCQFYAoX+665aaGgNXkpSARZoASLI7dOxh5Sxm/7eaAACAG3/5QVfBPEAGwAqAD+yAyssERI5sAMQsCDQALAARViwAy8bsQMNPlmwENCwEC+wAxCyIAEKK1gh2Bv0WbAQELIoAQorWCHYG/RZMDElBgYjIicHJzcmNTQ3JzcXNiAXNxcHFhUUBxcHARQWFjMyNjY1NCYmIAYGBGtOyHHipZtVn3yFqFWnpQGspapWq4J6o1b7+IHigIHggIPe/wDgg4VIUZieVqGo2+Orq1eqjI6tWK+q4NeppFcCe4rwi4zviovviIjvAAEALAAABJMFsAAWAHIAsABFWLAWLxuxFh0+WbAARViwDC8bsQwNPlmyAAwWERI5sBYQsAHQsg8MFhESObAPL7AT0LATL7QPEx8TAl2wBNCwBC+wExCyEgIKK1gh2Bv0WbAG0LAPELAH0LAHL7APELIOAgorWCHYG/RZsArQMDEBATMBIRUhFSEVIREjESE1ITUhNSEBMwJfAaWP/jsBb/5eAaL+Xnv+YgGe/mIBbv48jwLeAtL9EVnMWP68AURYzFkC7wACAJ/+8gEXBbAAAwAHABgAsAAvsABFWLAGLxuxBh0+WbIFAQMrMDETETMRESMRM594eHj+8gMD/P0DyAL2AAIAZv4RBF8FxAA2AEUAgLIlRkcREjmwJRCwPtAAsAkvsABFWLAlLxuxJR0+WbI/JQkREjmwPxCyGAEKK1gh2Bv0WbIDGD8REjmwCRCwD9CwCRCyEgEKK1gh2Bv0WbI3JQkREjmwNxCyMgEKK1gh2Bv0WbIfNzIREjmwJRCwKdCwJRCyLAEKK1gh2Bv0WTAxARQGBxYWFRQGIyImJyY1NxQWMzI2NTQmJiQmJjU0NjcmJjU0JDMyFhUjNCYjIgYVFBYWFx4CJQYGFRQWFhcXNjY1NCYnBF97bVth/NltwUSGeM+xoLxFoP6erll1alZcAQLV4Pl4wKGluj6Yn8S9WP1nbHZHoctccISGrQGvZIshMIxupMA4OXLMApyvi3FNXk5gZ49lZI0hL4xsocPizZK3iXNPXkwtM2eO7w10WVNgTDgcDXNWYnY4AAIAjwUkAukFxQALABcAGgCwCS+yAwUKK1gh2Bv0WbAP0LAJELAV0DAxEzQ2MzIWFRQGIyImJTQ2MzIWFRQGIyImjysnJi0tJicrAbUsJicsLCcmLAV0Ii8vIiEuLiAiLy8iIS4uAAMAa//rBfYFxAAYACgANwCVsh04ORESObAdELAO0LAdELA00ACwAEVYsCwvG7EsHT5ZsABFWLA0LxuxNA0+WbICNCwREjmwAi+0DwIfAgJdsggsNBESObAIL7QACBAIAl2yDAgCERI5sg4CCitYIdgb9FmwAhCyFQIKK1gh2Bv0WbIYAggREjmwNBCyHQQKK1gh2Bv0WbAsELIlBAorWCHYG/RZMDEBFAYgJjU1NDYgFhUjNCMiBhUVFBYzMjY1JRQSBDMyJBI1NAIkIyIEAgc0EiQgBBIVFAIEIyIkAgRhpP7Ut7gBKqZj2GqAfmxqbfzCowEmqKcBIqem/t2nq/7aoFW7AUsBgAFKu7T+tcbF/rW2Al+YotS1Wq7VoZjgoo1bhqNqdnqw/sy0sgEzs7IBMbG2/tCuygFax8f+psrF/qjRzwFYAAACAJ0CswL4BcQAHAAlAH+yDyYnERI5sA8QsB7QALAARViwFi8bsRYdPlmyBCYWERI5sAQvsADQsAAvsgIWBBESObILBBYREjmwCy+wFhCyDwMKK1gh2Bv0WbISCw8REjlADQwSHBIsEjwSTBJcEgZdsAQQsh0DCitYIdgb9FmwCxCyIQMKK1gh2Bv0WTAxASYnBiMiJjU0NjMzNTQmIyIGFSc0NjMyFhURFBclMjY3NSMiFRQCiQ8GV4d1hKeii1BRWmdrpoZ8khr+sjVzH4HmAsErM2x1ZG56PVVeR0gGZoOPhv7FXFdRPCyokn7//wB7AJQDQAOdACYAmg/tAAcAmgFE/+0AAQB8AYIDqAMIAAUAGgCwBC+wAdCwAS+wBBCyAgEKK1gh2Bv0WTAxASMRITUhA6h4/UwDLAGCARxqAAQAZv/rBfIFxAANABwAMgA7AJqyOjw9ERI5sDoQsATQsDoQsBnQsDoQsCHQALAARViwAy8bsQMdPlmwAEVYsAsvG7ELDT5ZshEECitYIdgb9FmwAxCyGQQKK1gh2Bv0WbIeCwMREjmwHi+yIAsDERI5sCAvtAAgECACXbIzHiAREjmwMy+yHQIKK1gh2Bv0WbImHTMREjmwHhCwLdCwIBCyOwIKK1gh2Bv0WTAxEzQSJCAEEhUUAgQgJAI3FBIEICQSNTQCJCMiBAIFESMRITIWFRQHFhYUFhcVIyY1NCYjJzMyNjU0JicjZrsBSwGAAUu7tv61/nb+tbZVpwEjAU4BJKWi/t2rqP7dpgHPYgECk56NSDgICWYOS1q8tVFpV2quAtnKAVrHx/6mysf+qM/PAVjHs/7MsbEBNbKwATC0sf7P8f6nA0d7fYVAGm2YRBcQJJJZSltURVVJAgAAAQBqBU8DCAWwAAMAEQCwAS+yAgMKK1gh2Bv0WTAxASE1IQMI/WICngVPYQACAI8D1AJ2BcQACQAUADyyAxUWERI5sAMQsBLQALAARViwBy8bsQcdPlmwDNCwDC+yAwIKK1gh2Bv0WbAHELISAgorWCHYG/RZMDEBFAYjIiY0NjIWBRQWMjY1NCYjIgYCdo5kZZCSxo/+c1mEVlZCQVoEymiOj86Tk2dDWFhDRVpaAAACAFQAAAPoBPMACwAPAD8AsAkvsABFWLANLxuxDQ0+WbAJELAA0LAJELIGAQorWCHYG/RZsAPQsA0Qsg4BCitYIdgb9FmyBQ4GERI5MDEBIRUhESMRITUhETMBITUhAmEBh/55b/5iAZ5vAWL8vQNDAz1m/koBtmYBtvsNZQABAEwCmQKbBbkAFgBVsggXGBESOQCwAEVYsA4vG7EOHT5ZsABFWLAALxuxABE+WbIWAgorWCHYG/RZsALQsgMADhESObAOELIIAgorWCHYG/RZsgsOABESObIUAA4REjkwMQEhNQE2NTQmIyIGFSM0NjIWFRQPAiECm/3FAUBqUU9XXmme/I52N+IBtgKZSwE6bkk/TVlJbI58ZmV6N9EAAQBHAo4CiwW5ACYAdLIgJygREjkAsABFWLAOLxuxDh0+WbAARViwGS8bsRkRPlmyARkOERI5fLABLxiybwEBcbAOELIHAgorWCHYG/RZsgoBDhESObABELIlAgorWCHYG/RZshQlARESObIdJRkREjmwGRCyIAIKK1gh2Bv0WTAxATM2NjU0JiMiBhUjNDYzMhYVFAYHFhUUBiMiJjUzFBYzMjY1NCMjAQtWUV9WUUxgaZ13gJJMRqKegoGjamlUV13OSQRTAkg8PkpKOmB8eGY4Xhgqk2Z8f2c+UUxCjgABAHwE3QHMBfQAAwAeALACL7AA0LAAL7QPAB8AAl2wAhCwA9AZsAMvGDAxATMDIwE7kedpBfT+6QAAAQCi/mAD0wQ6ABMAZLIOFBUREjkAsABFWLAALxuxABk+WbAARViwCC8bsQgZPlmwAEVYsBEvG7ERDz5ZsABFWLAKLxuxCg0+WbAARViwDi8bsQ4NPlmyBAEKK1gh2Bv0WbIMCAoREjmyEAgKERI5MDEBERQWMzI2NxEzESMnBiMiJxEjEQEZfomEmh14bQdi1bhXdwQ6/YS0uXN0AwL7xpquff33BdoAAQBTAAADIQWwAAsAK7IDDA0REjkAsABFWLAJLxuxCR0+WbAARViwAC8bsQANPlmyAQAJERI5MDEhESMiJiY1NCQzMxECqWyW3nYBCuTgAgh01YvV//pQAAEAowJ7AU0DIAAIACKyAwkKERI5ALAARViwAi8bsQIXPlmyBwUKK1gh2Bv0WTAxEzQ2MhYUBiImoyxQLi5QLALNIzAwRi8vAAEAYv5NAY8AAAAOAEqyAA8QERI5ALAARViwBi8bsQYPPlmwAEVYsAAvG7EADT5ZsgEABhESObABL7AGELIHBgorWCHYG/RZsAEQsg0GCitYIdgb9FkwMTMHFhUUBiMnMjY1NCYnN/YMpZ6IB1lxV1kdQBWWXGxOQTc6LAh/AAEAfgKdAdAFswAGADIAsABFWLAFLxuxBR0+WbAARViwAC8bsQARPlmyBAAFERI5sAQvsgMCCitYIdgb9FkwMQEjEQc1JTMB0GroAUQOAp0Cl0ZaawAAAgCHArIDDgXEAA0AGgBAsgobHBESObAKELAR0ACwAEVYsAMvG7EDHT5ZsgobAxESObAKL7IRAworWCHYG/RZsAMQshgDCitYIdgb9FkwMRM0NjMyFhUVFAYjIiY1FxQWMzI2NTU0JiIGFYexkpOxsJKTsmxxaGNzdMhzBGyZv7+eXpm+vZ8FcoaEeF9zhYh1AP//AHMAogNDA7AAJgCbEgAABwCbAVEAAP//AHMAAAV3Ba4AJwCi//UCmAAnAJwBFgAIAQcApQLBAAAAEACwAEVYsAUvG7EFHT5ZMDH//wBkAAAFnAWuACcAnADqAAgAJwCi/+YCmAEHAKMDAQAAABAAsABFWLAJLxuxCR0+WTAx//8AdgAABeoFuQAnAJwBpgAIACcApQM0AAABBwCkAC8CmQAQALAARViwIS8bsSEdPlkwMQACAFj+gQNUBE0AGQAjAFqyCSQlERI5sAkQsB3QALAARViwIS8bsSEZPlmwAEVYsBAvG7EQFT5ZsCEQsh0FCitYIdgb9FmwGdCwGS+yAxAZERI5sBAQsgkBCitYIdgb9FmyFRkQERI5MDEBDgIHBhUUFjMyNjczBgYjIiY1NDY3Njc3ExQGIiY1NDYyFgInAjK8F1GGgHeOAngC0quyy2qPVQcCiCxMLS1MLAKve3a8HmmDgYyMdabFyK1vyodHbUUBTyIvLyIhLi4AAgARAAAHHwWwAA8AEgCJshITFBESObASELAG0ACwAEVYsAYvG7EGHT5ZsABFWLAALxuxAA0+WbAARViwBC8bsQQNPlmyEQYAERI5sBEvsgIBCitYIdgb9FmwBhCyCAEKK1gh2Bv0WbIKBgAREjmwCi+yLwoBXbIMAQorWCHYG/RZsAAQsg4BCitYIdgb9FmyEgYAERI5MDEhIQMhAyMBIRUhEyEVIRMhASEDBx/8zxH9rOaSA3EDYP1KFwJN/bcaAr76rQINIwGF/nsFsGb932b9ogGRAz0AAQBdAGQDxgPOAAsAOACwAy+yCQwDERI5sAkvsgQDCRESObIKCQMREjmyAQQKERI5sAMQsAXQsgcKBBESObAJELAL0DAxNwEBNwEBFwEBBwEBXQFm/qlPAVYBV0/+qQFmT/6a/puzAW0BXlD+ogFeUP6i/pNPAWz+lAADAH3/rQT6BeEAFwAgACkAZrIEKisREjmwBBCwHdCwBBCwJtAAsABFWLAQLxuxEB0+WbAARViwBC8bsQQNPlmyGhAEERI5siMQBBESObAjELAb0LAQELIdAQorWCHYG/RZsBoQsCTQsAQQsiYBCitYIdgb9FkwMQEUAgQjIicHIzcmETU0EiQzMhc3MwcWEwUQFwEmIyICESU0JwEWMzISEQTsi/7+qbqFZWiJto0BAqjglGtnlYYB/Ax6Anh3v8vxA3lQ/ZFrmdHqAonJ/tCkYaDZuAFUk8cBM6WMqe20/uee/vuZA+qD/tX+9AbTjvwjVAErAQsAAAIAtwAABEgFsAANABUAV7IQFhcREjmwEBCwAtAAsABFWLAALxuxAB0+WbAARViwCy8bsQsNPlmyAQALERI5sAEvshAACxESObAQL7IJAQorWCHYG/RZsAEQsg4BCitYIdgb9FkwMQERITIWFhUUBgchESMRExEhMjYQJicBLwFFj9Rx9NP+rnh4AUSdwLeXBbD+0Ga9e7nhBP68BbD+a/2OqwEYqwQAAAEAl//sBEgGCAAsAE6yIy0uERI5ALAFL7AARViwAC8bsQANPlmwAEVYsBUvG7EVDT5Zsg8FFRESObIcAQorWCHYG/RZsiIVBRESObAFELIqAQorWCHYG/RZMDEhIxE0NjMyFhUUDgIVFB4CFRQGIyImJzcWFjMyNjU0LgI1NDY1NCYjIgMBD3i/qpm/G0cZU79Z1KRUtigiJZpDepRYt1x+flv3BARnyNmpijpggVIwOGiOiU+StDAgZR00gGI9cYaHTWDgVF13/s4AAAMAVf/sBnoETgArADcAPwDDsgNAQRESObADELAv0LADELA70ACwAEVYsBgvG7EYGT5ZsABFWLAeLxuxHhk+WbAARViwAC8bsQANPlmwAEVYsAYvG7EGDT5ZsgMeABESObINBhgREjmwDS+wGBCyEQEKK1gh2Bv0WbIUDRgREjmyGx4AERI5sjweABESObA8L7IiAQorWCHYG/RZsAAQsicBCitYIdgb9FmyKR4AERI5sAYQsiwBCitYIdgb9FmwDRCyMAEKK1gh2Bv0WbARELA40DAxBSImJwYGIyImNTQ2NyE1NCYjIgYVJzQ2MzIWFzY2MzIWFxUhFRQWMzI3FwYlMjY3ESEiBgcHFBYBIgYHITU0JgTxi8c8POSLqbrdzQEOf36Cpnfptn2xKDy9dMThAv0LwKy5iy+R+/dbuy3/AImsCQGDA4KEtBMCe6EUbWFibKmQnbMDWISUgmkNkLRramRx8dlqHcnjdleEZFxAASx6aRRhcAOYxKgfmrMAAAIAlf/sBB8GKgAdACwAXrIOLS4REjmwDhCwItAAsABFWLAZLxuxGR8+WbAARViwBy8bsQcNPlmyDhkHERI5sA4vsBkQshgBCitYIdgb9FmwDhCyIgEKK1gh2Bv0WbAHELIpAQorWCHYG/RZMDEBFhMVFAYGIyImJjU0EjMyFhcmJwcnNyYnNxYXNxcDJyYmIyIGFRQWFjMyNjUDK+4GcMp+gtR878dkrTsqqOEzzonOJ/KnwjM2Aieub6GzWp9lja8FF/r+aG6f/41744jlAQ5NQ/uoi0mAakNnSIx5SfzrOVNg0rlns2X50wAAAwBIANIELgSTAAMADAAVAE6yBxYXERI5sAcQsADQsAcQsBDQALACL7IBBworWCHYG/RZsAIQsQsKK1jYG9xZsQYKK1jYG9xZsAEQsQ8KK1jYG9xZsRQKK1jYG9xZMDEBITUhATQ2MhYUBiImETQ2MhYUBiImBC78GgPm/cEsUC4uUCwsUC4uUCwChHQBSCMwMEYvL/0GIzAwRi4uAAADAFn/dAQfBL4AGQAjAC0AZrIELi8REjmwBBCwINCwBBCwKtAAsABFWLAELxuxBBk+WbAARViwES8bsRENPlmyHQQRERI5sicEERESObAnELAe0LAEELIgAQorWCHYG/RZsB0QsCjQsBEQsioBCitYIdgb9FkwMRM0NjYzMhc3MwcWFhUVFAYGIyInByM3JiY1MxQWFwEmIyIGFSU0JicBFjMyNjVZed2McmROXmReaHrcjGxcT15jZG53R0UBhUtbocoC10I//n1EVqHJAi2c+oswoMxI6pMhnPyIKaHLR+6Ybr49Axor+8sLZ7Y//Ooi+cwAAgCf/mAEBwYAAA8AHABkshMdHhESObATELAM0ACwCC+wAEVYsAwvG7EMGT5ZsABFWLAGLxuxBg8+WbAARViwAy8bsQMNPlmyBQwDERI5sgoMAxESObAMELITAQorWCHYG/RZsAMQshoBCitYIdgb9FkwMQEUAiMiJxEjETMRNjMyEhEnNCYjIgYHERYWMzI2BAfgvd12eHh13MDfeKqYbp4qKp5wl6kCEv3+15z92Aeg/aSq/tv++wPP8Gpl/fdaY/EAAAEAqAAAASAEOgADAB0AsABFWLACLxuxAhk+WbAARViwAC8bsQANPlkwMSEjETMBIHh4BDoAAAIAbP/rBwkFxAAXACMAlrIBJCUREjmwARCwGtAAsABFWLAMLxuxDB0+WbAARViwDi8bsQ4dPlmwAEVYsAAvG7EADT5ZsABFWLADLxuxAw0+WbAOELIQAQorWCHYG/RZshIADhESObASL7IvEgFdshQBCitYIdgb9FmwABCyFgEKK1gh2Bv0WbADELIYAQorWCHYG/RZsAwQsh0BCitYIdgb9FkwMSEhBiMiJgInETQSNjMyFyEVIREhFSERIQUyNxEmIyICBxEUEgcJ/LS9epz0iAKG9pyFtANH/PYCqf1XAw/7fYV0doW/4AHiFZQBDaoBOqwBEpYUaf3baP2uGA4E8g7++OH+y+P+8wADAF7/7AcfBE4AIQAuADYAqLIGNzgREjmwBhCwJ9CwBhCwMtAAsABFWLAELxuxBBk+WbAARViwCi8bsQoZPlmwAEVYsBgvG7EYDT5ZsABFWLAeLxuxHg0+WbIHChgREjmyMwoYERI5sDMvsg4BCitYIdgb9FmwGBCyEwEKK1gh2Bv0WbIVChgREjmyGwoYERI5sCXQsikKGBESObAEELIsAQorWCHYG/RZsAoQsi8BCitYIdgb9FkwMRM0NjYzMhYXNjYzMhYVFSEVFBYzMjcXBiMiJicGBiMiADUXFBYzMjY1NTQmIAYVASIGByE1NCZeeduKjtw+PNZ+xeb9BMaa0nM0hfSI3jo9243X/vd4xqKgxcf+wMYEnoK4EwKAqAItnfyIi4V+kvnbYB2583dSipB8gooBL/oJxfb2zxfD+PjOAcbKnx6SuQABAKAE6gLLBfYACAAxALAEL7EGCitY2BvcWbAA0LAEELAC0LAEELAH0LAHL7YPBx8HLwcDXbIDBwQREjkwMQEVIycHIzU3MwLLb6inbe5MBPQKt7cN/wAAAgB1BLgB9wYxAAoAFgAvALAJL7AD0LADL7Q/A08DAl2wCRCyDgYKK1gh2Bv0WbADELIUBgorWCHYG/RZMDETNDYzMhYVFAYiJjcUFjMyNjU0JiMiBnVxUE9ybqZuTUIyMURGLzFDBXNQbm5QT2xsTzJCQTM1QkQAAQBqBPADCwXTABUAPACwAy+wBtCwBi+yDwYBXbADELAJ0LAJL7AGELINAworWCHYG/RZsAMQshIDCitYIdgb9FmwDRCwFdAwMQEUBiMiJiMiBhUnNDYzMh4CMzI2NQMLcVJMkTkvP1ptVjBEPD0pLkEFzWB1bj44A1x4IioiQjgA//8AnwKuBIkDFABGAJ/ZAEzNQAD//wB+Aq4FtgMUAEcAn/92AABmZkAAAAEAYgRhATYGEgAIABOyCAkKERI5ALAAL7AE0LAELzAxExcGBxUjNTQ27khaA3dLBhIzdoiAcFyqAAABAD4ESwERBgAABwATsgMICRESOQCwBC+wANCwAC8wMRMnNjc1MxUUhUdaA3YESzR5hYNl0QABACn/GQD8AM0ABwAZsgQICRESOQCwCC+wBNCwBC+wANCwAC8wMRcnNjc3MxUUcEdTCAF35zRvd5pl0P//AGMEYQIyBhIAJgCTAQAABwCTAPwAAP//AEQESwILBgAAJgCUBgAABwCUAPoAAAACACn/EAHmAOwABwAPACuyCRARERI5sAkQsAXQALAQL7AE0LAEL7AM0LAML7AI0LAIL7AA0LAALzAxFyc2NzUzFRQXJzY3NTMVFHBHWQN3XkdYA3jwNHuKo4LZgTR6i6OC2QAAAQCSAhwCBQOjAA0AFrIDDg8REjkAsAMvsQoKK1jYG9xZMDETNDYzMhYXFRQGIyImNZJmU1JmAmZTVGYC8E9kYU0oUWBiUQAAAQBsAKcB/AOwAAYAEACwBi+yAgcGERI5sAIvMDETASMBNQEz6AEUaf7ZASdpAiv+fAF7EwF7AAABAGEAogHyA7AABgAQALAAL7IDBwAREjmwAy8wMRMBFQEjAQHLASf+2WoBFP7sA7D+gBP+hQGEAYoAAQA+AHkDTwUbAAMACQCwAC+wAi8wMTcnAReISgLHSnkwBHIwAP//ADsClAK2BakBBwClAAAClAATALAARViwCS8bsQkdPlmwDdAwMQAAAQBT/+wEEgXEACUAjbILJicREjkAsABFWLAYLxuxGB0+WbAARViwCi8bsQoNPlmyJRgKERI5sCUvsgACCitYIdgb9FmwChCyBQEKK1gh2Bv0WbAAELAO0LAlELAQ0LAlELAV0LAVL0AJDxUfFS8VPxUEXbISAgorWCHYG/RZsBgQsh0BCitYIdgb9FmwFRCwINCwEhCwItAwMQEhFRQWMzI3FwYjIgADNSM1MzUjNTMQADMyFwcmIyIGFSEVIRUhAzH+XdnGdWYKdHL5/uMDwMDAwAEe+WOFCnBtxtcBo/5dAaMCMxHd8iJrHgEmAQYbWaRaAQ4BLB9tI+3kWqQAAAEApQKuA+gDFAADABEAsAIvsgEBCitYIdgb9FkwMQEhNSED6Py9A0MCrmYAAgAwAAADoAYVABQAGACGsggZGhESObAIELAW0ACwAEVYsAMvG7EDGT5ZsABFWLAQLxuxEBk+WbAARViwFy8bsRcZPlmwAEVYsAgvG7EIHz5ZsABFWLAALxuxAA0+WbAARViwFS8bsRUNPlmwEBCyAQEKK1gh2Bv0WbAC0LAIELINAQorWCHYG/RZsAIQsBLQsBPQMDEzESM1MzU0NjMyFwcmIyIRFTMVIxEhIxEz5LS0vKuGjhR6fvf9/QJEeHgD2GJvrb87ZzX+/21i/CgEOgAAAQA/AAADrgYVABcAbbITGBkREjkAsABFWLAGLxuxBhk+WbAARViwDi8bsQ4ZPlmwAEVYsBMvG7ETHz5ZsABFWLAKLxuxCg0+WbAARViwFi8bsRYNPlmwExCyAgEKK1gh2Bv0WbAGELIIAQorWCHYG/RZsAzQsA3QMDEBJiMiBhUVIRUhESMRIzUzNTY2MzIXESMDN5RiZ3ABAv7+eLOzAayafPl3BY4ee3GGYvwoA9hiiqStPfooAAEAfgAAAdADFgAGADkAsABFWLAFLxuxBRc+WbAARViwAS8bsQENPlmyBAUBERI5sAQvsgMCCitYIdgb9FmyAgMFERI5MDEhIxEHNSUzAdBq6AFEDgKXRlprAAEATAAAApsDIAAWAFmyCBcYERI5ALAARViwDi8bsQ4XPlmwAEVYsAAvG7EADT5ZshYCCitYIdgb9FmyAgAWERI5sgMOABESObAOELIIAgorWCHYG/RZsgsADhESObIUAA4REjkwMSEhNQE2NTQmIyIGFSM0NjIWFRQPAiECm/3FAUBqUU9XXmme/I52N+IBtksBOm5JP01ZSWyOfGZlejfRAAEAR//1AosDIAAmAG+yICcoERI5ALAARViwDi8bsQ4XPlmwAEVYsBkvG7EZDT5ZsgEOGRESOXywAS8YsA4QsgcCCitYIdgb9FmyCg4ZERI5sAEQsiUCCitYIdgb9FmyFCUBERI5sh0ZDhESObAZELIgAgorWCHYG/RZMDEBMzY2NTQmIyIGFSM0NjMyFhUUBgcWFRQGIyImNTMUFjMyNjU0IyMBC1ZRX1ZRTGBpnXeAkkxGop6CgaNqaVRXXc5JAboCSDw+Sko6YHx4ZjheGCqTZnx/Zz5RTEKOAAACADsAAAK2AxUACgAOAFIAsABFWLAJLxuxCRc+WbAARViwBC8bsQQNPlmyAQkEERI5sAEvtg8BHwEvAQNdsgICCitYIdgb9FmwBtCwARCwC9CyCAsGERI5sg0JBBESOTAxATMVIxUjNSEnATMBIREHAjd/f2n+cQQBjW/+dgEhHwETWLu7QgIY/f4BgDL//wAxAlACEAK1AgYAEQAAAAIAIQAABNsFsAAPAB0AaACwAEVYsAUvG7EFHT5ZsABFWLAALxuxAA0+WbIDAAUREjmwAy+yXwMBXbIvAwFdtE8DXwMCcbICAQorWCHYG/RZsBHQsAAQshIBCitYIdgb9FmwBRCyGwEKK1gh2Bv0WbADELAc0DAxMxEjNTMRITIEEhUVFAIEIxMhESEyABE1NAAnIREh1rW1AZezARyfnv7huiH+zAEP6wEW/u7g/uIBNAKxZgKZo/7QwobD/tKkArH9twExAQSA+wEuAf3QAP//AB4AAAThBy8CJgAlAAABBwBEARYBOwATALAARViwBC8bsQQdPlmwDNwwMQD//wAeAAAE4QcvAiYAJQAAAQcAdQG/ATsAEwCwAEVYsAUvG7EFHT5ZsA3cMDEA//8AHgAABOEHMQImACUAAAEHAI4AzgE7ABMAsABFWLAELxuxBB0+WbAP3DAxAP//AB4AAAThBxcCJgAlAAABBwCQAMwBRAATALAARViwBS8bsQUdPlmwDtwwMQD//wAeAAAE4QcAAiYAJQAAAQcAagDOATsAFgCwAEVYsAQvG7EEHT5ZsBTcsCDQMDH//wAeAAAE4QdxAiYAJQAAAQcAjwFNAUAAFgCwAEVYsAQvG7EEHT5ZsBTcsBnQMDH//wCD/kQEvwXEAiYAJwAAAAcAeQHi//f//wC4AAAEQgc1AiYAKQAAAQcARAD/AUEAEwCwAEVYsAYvG7EGHT5ZsA3cMDEA//8AuAAABEIHNQImACkAAAEHAHUBqAFBABMAsABFWLAGLxuxBh0+WbAO3DAxAP//ALgAAARCBzcCJgApAAABBwCOALcBQQATALAARViwBi8bsQYdPlmwENwwMQD//wC4AAAEQgcGAiYAKQAAAQcAagC3AUEAFgCwAEVYsAYvG7EGHT5ZsBXcsCHQMDH//wANAAABXAc1AiYALQAAAQcARP+mAUEAEwCwAEVYsAIvG7ECHT5ZsAXcMDEA//8AygAAAhoHNQImAC0AAAEHAHUATgFBABMAsABFWLADLxuxAx0+WbAG3DAxAP////4AAAIpBzcCJgAtAAABBwCO/14BQQATALAARViwAi8bsQIdPlmwCNwwMQD////tAAACRwcGAiYALQAAAQcAav9eAUEAFgCwAEVYsAIvG7ECHT5ZsA3csBnQMDH//wC4AAAE9AcXAiYAMgAAAQcAkAEgAUQAEwCwAEVYsAgvG7EIHT5ZsA3cMDEA//8Aff/sBOwHOwImADMAAAEHAEQBRwFHABMAsABFWLALLxuxCx0+WbAf3DAxAP//AH3/7ATsBzsCJgAzAAABBwB1AfABRwATALAARViwCy8bsQsdPlmwINwwMQD//wB9/+wE7Ac9AiYAMwAAAQcAjgD/AUcAEwCwAEVYsAsvG7ELHT5ZsCLcMDEA//8Aff/sBOwHIwImADMAAAEHAJAA/QFQABMAsABFWLAMLxuxDB0+WbAh3DAxAP//AH3/7ATsBwwCJgAzAAABBwBqAP8BRwAWALAARViwCy8bsQsdPlmwJ9ywM9AwMf//AKL/7ASjBy8CJgA5AAABBwBEAT4BOwATALAARViwCi8bsQodPlmwE9wwMQD//wCi/+wEowcvAiYAOQAAAQcAdQHnATsAEwCwAEVYsBEvG7ERHT5ZsBTcMDEA//8Aov/sBKMHMQImADkAAAEHAI4A9gE7ABMAsABFWLAKLxuxCh0+WbAW3DAxAP//AKL/7ASjBwACJgA5AAABBwBqAPYBOwAWALAARViwCi8bsQodPlmwG9ywJ9AwMf//ABgAAASuBykCJgA9AAABBwB1AaEBNQATALAARViwAS8bsQEdPlmwC9wwMQD//wBk/+wDxwX0AiYARQAAAQcARADXAAAAEwCwAEVYsBcvG7EXGT5ZsCvcMDEA//8AZP/sA8cF9AImAEUAAAEHAHUBgAAAABMAsABFWLAXLxuxFxk+WbAs3DAxAP//AGT/7APHBfYCJgBFAAABBwCOAI8AAAATALAARViwFy8bsRcZPlmwLtwwMQD//wBk/+wDxwXcAiYARQAAAQcAkACNAAkAEwCwAEVYsBcvG7EXGT5ZsC3cMDEA//8AZP/sA8cFxQImAEUAAAEHAGoAjwAAABYAsABFWLAXLxuxFxk+WbAz3LA/0DAx//8AZP/sA8cGNgImAEUAAAEHAI8BDgAFABYAsABFWLAXLxuxFxk+WbAz3LA40DAx//8AXv5EA8wETgImAEcAAAAHAHkBV//3//8AWv/sA9UF9AImAEkAAAEHAEQAygAAABMAsABFWLAJLxuxCRk+WbAh3DAxAP//AFr/7APVBfQCJgBJAAABBwB1AXMAAAATALAARViwCS8bsQkZPlmwItwwMQD//wBa/+wD1QX2AiYASQAAAQcAjgCCAAAAEwCwAEVYsAkvG7EJGT5ZsCTcMDEA//8AWv/sA9UFxQImAEkAAAEHAGoAggAAABYAsABFWLAJLxuxCRk+WbAp3LA10DAx////4gAAATEF6AImAIsAAAEHAET/e//0AAkAsAIvsAXcMDEA//8AnwAAAe8F6AImAIsAAAEGAHUj9AAJALADL7AG3DAxAP///9MAAAH+BeoCJgCLAAABBwCO/zP/9AATALAARViwAi8bsQIZPlmwCNwwMQD////CAAACHAW5AiYAiwAAAQcAav8z//QADACwAi+wDdywGdAwMf//AJwAAAPMBdsCJgBSAAABBwCQAIkACAATALAARViwBC8bsQQZPlmwF9wwMQD//wBa/+wEIAX0AiYAUwAAAQcARADPAAAAEwCwAEVYsAQvG7EEGT5ZsCDcMDEA//8AWv/sBCAF9AImAFMAAAEHAHUBeAAAABMAsABFWLAELxuxBBk+WbAh3DAxAP//AFr/7AQgBfYCJgBTAAABBwCOAIcAAAATALAARViwBC8bsQQZPlmwI9wwMQD//wBa/+wEIAXbAiYAUwAAAQcAkACFAAgAEwCwAEVYsAQvG7EEGT5ZsCLcMDEA//8AWv/sBCAFxQImAFMAAAEHAGoAhwAAABYAsABFWLAELxuxBBk+WbAo3LA00DAx//8AmP/sA8oF9AImAFkAAAEHAEQA0QAAABMAsABFWLAHLxuxBxk+WbAS3DAxAP//AJj/7APKBfQCJgBZAAABBwB1AXoAAAATALAARViwDS8bsQ0ZPlmwE9wwMQD//wCY/+wDygX2AiYAWQAAAQcAjgCJAAAAEwCwAEVYsAcvG7EHGT5ZsBXcMDEA//8AmP/sA8oFxQImAFkAAAEHAGoAiQAAABYAsABFWLAHLxuxBxk+WbAa3LAm0DAx//8AIP5LA7AF9AImAF0AAAEHAHUBPgAAABMAsABFWLABLxuxARk+WbAT3DAxAP//ACD+SwOwBcUCJgBdAAABBgBqTQAAFgCwAEVYsBAvG7EQGT5ZsBrcsCbQMDEAAQAAAN4AjwAWAFkABQABAAAAAAAOAAACAAJyAAYAAQAAAGAAYABgAGAAYACZALsBOwG2Aj4CzgLkAxIDQANzA5gDsgPIA+gD/wRVBIME1AVQBZMF9QZiBo8HFAd/B4sHlwfIB+8IGwh3CSMJYwnPCiAKbQqwCucLTwuPC6oL3QweDEIMkAzMDSYNcQ3UDi8OnQ7HDwYPNQ+LD9QQBBA7EF8QdhCaEMMQ3hD7EXkR2RIsEokS7RNCE78UBhQ+FIkUzhTpFVsVqBX6FmEWxBcDF20XwBgGGDYYixjUGRcZThmNGaQZ4holGl4auRslG4kb6xwKHK8c4h2GHf0eCR4mHtUe6x8tH2wfvCAsIEkgnSDJIO0hLCFXIaAhrCHGIeAh+iJfIssjCCOEI9gkPiT+JXQlwyY9Jp8muidAJ+UoEShNKI4omCijKMAo2yj5KQUpESlDKWcpgymgKbMpxypHKl0qxisiK08roCwOLFUsVSxdLMUs3CzzLQotIS05LVEtXS10LYstoi26LdEt6C3/LhcuLi5FLlwucy6KLqIuuS7QLucu/y8WLy0vRC9bL3Ivii+iL64vxS/cL/MwCzAdMC4wRTBYMG8whjCdMLQwyzDjMPoxETEoMUAxVzFuAAAAAQAAAAIAABojOzlfDzz1ABkIAAAAAADE8BEuAAAAANDbTo76IP3VCRoIcwAAAAkAAgAAAAAAAAOMAGQAAAAAAAAAAAHyAAAB8gAAAc4AmQJMAI8EpwBVBG8AcwXpAG0E7ABsAVwAdwKNAIwCmwAhA2UAHQSEAEsBiAA8AkoAMQHpAJEDLQAeBG8AeARvALIEbwBpBG8AYgRvAEMEbwCoBG8AggRvAE0EbwBqBG8AZQGuAH8BjwA8BBcATQRtAJUEJQB8A6IAVAdOAHEE/wAeBOcAuAUyAIMFPQC4BI0AuASAALgFeACRBakAuAIhANMEZwBHBQwAuAQ3ALgG7AC4Ba4AuAVqAH0E7QC4BWoAeQUUALUEvQBYBMcANAVCAKIE7wAfBywAPQTlADcEygAYBMkAWgHrAKMDJwAwAesAAANUAE0DdAABAkkAZwRJAGQEbwCbBB8AXgRyAGwEIgBaAqYAPwRwAGwEZACcAcsAlQHT/5gD6wCcAcsAqgcXAJYEZQCcBHsAWgRvAJsEdgBsArEAnAQNAGUCkgAXBGUAmAPZACYGCAA/A+QAMAPNACAD5ABXAqQARAHEALICpAAJBXoAkQHEAIwEWwB3BJIAXQXJAG0ExwAsAbwAnwTXAGYDcQCPBmUAawOKAJ0DpQB7BF0AfAZqAGYDagBqAwYAjwQ9AFQC5ABMAuQARwJAAHwEdACiA80AUwH3AKMB8gBiAuQAfgOaAIcDoABzBcwAcwYMAGQGNgB2A6wAWAdJABEEMABdBWoAfQS+ALcEsACXBsQAVQSnAJUEjABIBHQAWQR+AJ8ByACoB3kAbAdkAF4DcACgAnsAdQN7AGoFNgCfBiwAfQFsAGIBbAA+AWEAKQJkAGMCaQBEAlEAKQKWAJICYQBsAmEAYQOWAD4C5AA7BG8AUwSQAKUETAAwBFsAPwLjAH4C4wBMAuMARwLjADsB8gAAAkoAMQVbACEE/wAeBP8AHgT/AB4E/wAeBP8AHgT/AB4FMgCDBI0AuASNALgEjQC4BI0AuAIhAA0CIQDKAiH//gIh/+0FrgC4BWoAfQVqAH0FagB9BWoAfQVqAH0FQgCiBUIAogVCAKIFQgCiBMoAGARJAGQESQBkBEkAZARJAGQESQBkBEkAZAQfAF4EIgBaBCIAWgQiAFoEIgBaAcj/4gHIAJ8ByP/TAcj/wgRlAJwEewBaBHsAWgR7AFoEewBaBHsAWgRlAJgEZQCY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') format('truetype');\n}\n"
    }],
    templates: [{
        name: "CSS",
        code: function(opt_out) {
            var self = this
              , X = this.X
              , Y = this.Y
              , opt_out = opt_out || TOC(this)
            return opt_out("", this.CSS_, ""),
            X.foam.grammars.CSSDecl.create({
                model: this.model_
            }).parser.parseString(opt_out.toString())
        },
        language: "css"
    }]
}),
CLASS({
    package: "foam.ui",
    name: "CSSLoaderTrait",
    properties: [{
        model_: "foam.core.types.DocumentInstallProperty",
        name: "installCSS",
        documentInstallFn: function(X) {
            for (var i = 0; i < this.model_.templates.length; i++) {
                var t = this.model_.templates[i]
                if ("CSS" === t.name)
                    return t.futureTemplate(function() {
                        X.addStyle(this)
                    }
                    .bind(this)),
                    undefined
            }
        }
    }]
}),
CLASS({
    package: "foam.apps.calc",
    name: "HistoryCitationView",
    extends: "foam.ui.View",
    templates: [{
        name: "toHTML",
        code: function(opt_out) {
            var self = this
              , X = this.X
              , Y = this.Y
              , opt_out = opt_out || TOC(this)
            return opt_out('\n      <div class="history" role="listitem" tabindex="0" aria-label="', escapeHTML(this.data.sayEquals ? window.chrome.i18n ? window.chrome.i18n.getMessage("Calc_ActionSpeechLabel_equals") + " " : "equals " : ""), "", escapeHTML(this.data.op.speechLabel), " ", escapeHTML(this.data.a2), '">\n        <span aria-hidden="true">', this.data.op.label, "&nbsp;", escapeHTML(this.data.a2), "<span>\n      </div>\n      "),
            this.data.op.label && opt_out('<hr aria-hidden="true">'),
            opt_out("\n    "),
            opt_out.toString()
        },
        language: "html"
    }]
}),
CLASS({
    package: "foam.apps.calc",
    name: "MainButtonsView",
    extends: "foam.ui.View",
    requires: ["foam.apps.calc.CalcButton"],
    templates: [{
        name: "toHTML",
        code: function(opt_out) {
            var self = this
              , X = this.X
              , Y = this.Y
              , opt_out = opt_out || TOC(this)
            return opt_out('\n      <div id="', this.id, '" class="buttons button-row" style="background:#121212;">\n        <div class="button-column" style="flex-grow: 3;-webkit-flex-grow: 3;">\n          <div class="button-row">\n            ', this.createTemplateView("7", {
                tabIndex: "0",
                haloColor: "rgba(255, 255, 255, 0.3)",
                arrowNav: [".f1", "[4]", null, "[8]"]
            }), "\n            ", this.createTemplateView("8", {
                tabIndex: "-1",
                haloColor: "rgba(255, 255, 255, 0.3)",
                arrowNav: [".f1", "[5]", "[7]", "[9]"]
            }), "\n            ", this.createTemplateView("9", {
                tabIndex: "-1",
                haloColor: "rgba(255, 255, 255, 0.3)",
                arrowNav: [".f1", "[6]", "[8]", "[ac]"]
            }), '\n          </div>\n          <div class="button-row">\n            ', this.createTemplateView("4", {
                tabIndex: "-1",
                haloColor: "rgba(255, 255, 255, 0.3)",
                arrowNav: ["[7]", "[1]", null, "[5]"]
            }), "\n            ", this.createTemplateView("5", {
                tabIndex: "-1",
                haloColor: "rgba(255, 255, 255, 0.3)",
                arrowNav: ["[8]", "[2]", "[4]", "[6]"]
            }), "\n            ", this.createTemplateView("6", {
                tabIndex: "-1",
                haloColor: "rgba(255, 255, 255, 0.3)",
                arrowNav: ["[9]", "[3]", "[5]", "[div]"]
            }), '\n         </div>\n          <div class="button-row">\n            ', this.createTemplateView("1", {
                tabIndex: "-1",
                haloColor: "rgba(255, 255, 255, 0.3)",
                arrowNav: ["[4]", "[point]", null, "[2]"]
            }), "\n            ", this.createTemplateView("2", {
                tabIndex: "-1",
                haloColor: "rgba(255, 255, 255, 0.3)",
                arrowNav: ["[5]", "[0]", "[1]", "[3]"]
            }), "\n            ", this.createTemplateView("3", {
                tabIndex: "-1",
                haloColor: "rgba(255, 255, 255, 0.3)",
                arrowNav: ["[6]", "[equals]", "[2]", "[minus]"]
            }), '\n          </div>\n          <div class="button-row">\n            ', this.createTemplateView("point", {
                tabIndex: "-1",
                haloColor: "rgba(255, 255, 255, 0.3)",
                arrowNav: ["[1]", null, null, "[0]"]
            }), "\n            ", this.createTemplateView("0", {
                tabIndex: "-1",
                haloColor: "rgba(255, 255, 255, 0.3)",
                arrowNav: ["[2]", null, "[point]", "[equals]"]
            }), "\n            ", this.createTemplateView("equals", {
                tabIndex: "-1",
                haloColor: "rgba(255, 255, 255, 0.3)",
                arrowNav: ["[3]", null, "[0]", "[plus]"]
            }), "\n          </div>\n        </div>\n        "),
            this.X.registerModel(this.CalcButton.xbind({
                background: "#4a4a4a",
                width: 70,
                height: 45,
                font: "300 26px Roboto"
            }), "foam.ui.ActionButton"),
            opt_out('\n        <div class="button-column rhs-ops" style="flex-grow: 1;-webkit-flex-grow: 1;padding-top: 7px; padding-bottom: 10px;">\n          ', this.createTemplateView("ac", {
                tabIndex: "0",
                haloColor: "rgba(255, 255, 255, 0.4)",
                arrowNav: [".f1", "[div]", "[9]", "[backspace]"],
                font: "300 24px Roboto"
            }), "\n          ", this.createTemplateView("div", {
                tabIndex: "-1",
                haloColor: "rgba(255, 255, 255, 0.4)",
                arrowNav: ["[ac]", "[mult]", "[6]", "[e]"]
            }), "\n          ", this.createTemplateView("mult", {
                tabIndex: "-1",
                haloColor: "rgba(255, 255, 255, 0.4)",
                arrowNav: ["[div]", "[minus]", "[3]", "[inv]"]
            }), "\n          ", this.createTemplateView("minus", {
                tabIndex: "-1",
                haloColor: "rgba(255, 255, 255, 0.4)",
                arrowNav: ["[mult]", "[plus]", "[3]", "[inv]"]
            }), "\n          ", this.createTemplateView("plus", {
                tabIndex: "-1",
                haloColor: "rgba(255, 255, 255, 0.4)",
                arrowNav: ["[minus]", null, "[equals]", "[sign]"]
            }), "\n        </div>\n      </div>\n    "),
            opt_out.toString()
        },
        language: "html"
    }]
}),
CLASS({
    package: "foam.apps.calc",
    name: "NumberFormatter",
    properties: [{
        model_: "BooleanProperty",
        name: "useComma",
        type: "Boolean"
    }],
    messages: [{
        model_: "Message",
        name: "nan",
        value: "Not a number",
        translationHint: "description of a value that isn't a number"
    }],
    methods: [function init() {
        var lang
        window.chrome && chrome.i18n ? chrome.i18n.getAcceptLanguages(function(m) {
            this.useComma = "," == .5.toLocaleString(m[0]).substring(1, 2)
        }
        .bind(this)) : (lang = window.navigator.languages ? window.navigator.languages[0] : window.navigator.language,
        this.useComma = "," == .5.toLocaleString(lang).substring(1, 2))
    }
    , function formatNumber(n) {
        return "string" == typeof n ? n : Number.isNaN(n) ? this.nan : Number.isFinite(n) ? parseFloat(n).toPrecision(12).replace(/(?:(\d+\.\d*[1-9])|(\d+)(?:\.))(?:(?:0+)$|(?:0*)(e.*)$|$)/, "$1$2$3") : "∞"
    }
    , function i18nNumber(n) {
        return this.useComma ? n.replace(/\./g, ",") : n
    }
    ]
}),
CLASS({
    package: "foam.apps.calc",
    name: "SecondaryButtonsView",
    extends: "foam.ui.View",
    requires: ["foam.apps.calc.CalcButton"],
    templates: [{
        name: "toHTML",
        code: function(opt_out) {
            var self = this
              , X = this.X
              , Y = this.Y
              , opt_out = opt_out || TOC(this)
            return opt_out("\n          "),
            this.X.registerModel(this.CalcButton.xbind({
                background: "#00796b",
                width: 61,
                height: 61,
                font: "300 20px Roboto"
            }), "foam.ui.ActionButton"),
            opt_out('\n          <div id="', this.id, '" class="buttons button-row secondaryButtons">\n            <div class="button-column" style="flex-grow: 1;-webkit-flex-grow: 1;">\n              <div class="button-row">\n                ', this.createTemplateView("backspace", {
                tabIndex: "0",
                haloColor: "rgba(255, 255, 255, 0.21)",
                arrowNav: [".f1", "[e]", "[ac]", "[round]"],
                label: "⌫"
            }), "\n                ", this.createTemplateView("round", {
                tabIndex: "-1",
                haloColor: "rgba(255, 255, 255, 0.21)",
                arrowNav: [".f1", "[ln]", "[backspace]", "[fetch]"]
            }), "\n                ", this.createTemplateView("fetch", {
                tabIndex: "-1",
                haloColor: "rgba(255, 255, 255, 0.21)",
                arrowNav: [".f1", "[log]", "[round]", "[store]"]
            }), "\n                ", this.createTemplateView("store", {
                tabIndex: "-1",
                haloColor: "rgba(255, 255, 255, 0.21)",
                arrowNav: [".f1", "[exp]", "[fetch]", "[deg]"]
            }), '\n              </div>\n              <div class="button-row">\n                ', this.createTemplateView("e", {
                tabIndex: "-1",
                haloColor: "rgba(255, 255, 255, 0.21)",
                arrowNav: ["[backspace]", "[inv]", "[div]", "[ln]"]
            }), "\n                ", this.createTemplateView("ln", {
                tabIndex: "-1",
                haloColor: "rgba(255, 255, 255, 0.21)",
                arrowNav: ["[round]", "[pow]", "[e]", "[log]"]
            }), "\n                ", this.createTemplateView("log", {
                tabIndex: "-1",
                haloColor: "rgba(255, 255, 255, 0.21)",
                arrowNav: ["[fetch]", "[sqroot]", "[ln]", "[exp]"]
            }), "\n                ", this.createTemplateView("exp", {
                tabIndex: "-1",
                haloColor: "rgba(255, 255, 255, 0.21)",
                arrowNav: ["[store]", "[root]", "[log]", "[sin]"]
            }), '\n              </div>\n              <div class="button-row">\n                ', this.createTemplateView("inv", {
                tabIndex: "-1",
                haloColor: "rgba(255, 255, 255, 0.21)",
                arrowNav: ["[e]", "[sign]", "[minus]", "[pow]"]
            }), "\n                ", this.createTemplateView("pow", {
                tabIndex: "-1",
                haloColor: "rgba(255, 255, 255, 0.21)",
                arrowNav: ["[ln]", "[percent]", "[inv]", "[sqroot]"]
            }), "\n                ", this.createTemplateView("sqroot", {
                tabIndex: "-1",
                haloColor: "rgba(255, 255, 255, 0.21)",
                arrowNav: ["[log]", "[square]", "[pow]", "[root]"]
            }), "\n                ", this.createTemplateView("root", {
                tabIndex: "-1",
                haloColor: "rgba(255, 255, 255, 0.21)",
                arrowNav: ["[exp]", "[pi]", "[sqroot]", "[cos]"]
            }), '\n              </div>\n              <div class="button-row">\n                ', this.createTemplateView("sign", {
                tabIndex: "-1",
                haloColor: "rgba(255, 255, 255, 0.21)",
                arrowNav: ["[inv]", null, "[plus]", "[percent]"]
            }), "\n                ", this.createTemplateView("percent", {
                tabIndex: "-1",
                haloColor: "rgba(255, 255, 255, 0.21)",
                arrowNav: ["[pow]", null, "[sign]", "[square]"]
            }), "\n                ", this.createTemplateView("square", {
                tabIndex: "-1",
                haloColor: "rgba(255, 255, 255, 0.21)",
                arrowNav: ["[sqroot]", null, "[percent]", "[pi]"]
            }), "\n                ", this.createTemplateView("pi", {
                tabIndex: "-1",
                haloColor: "rgba(255, 255, 255, 0.21)",
                arrowNav: ["[root]", null, "[square]", "[tan]"]
            }), "\n              </div>\n            </div>\n          </div>\n    "),
            opt_out.toString()
        },
        language: "html"
    }]
}),
CLASS({
    package: "foam.apps.calc",
    name: "TertiaryButtonsView",
    extends: "foam.ui.View",
    requires: ["foam.apps.calc.CalcButton"],
    templates: [{
        name: "toHTML",
        code: function(opt_out) {
            var self = this
              , X = this.X
              , Y = this.Y
              , opt_out = opt_out || TOC(this)
              , l = (opt_out("\n          "),
            this.X.registerModel(this.CalcButton.xbind({
                width: 61,
                height: 61,
                color: "#444",
                background: "#1DE9B6",
                font: "300 18px Roboto"
            }), "foam.ui.ActionButton"),
            opt_out('\n          <div id="', this.id, '" class="buttons button-row tertiaryButtons">\n            <div class="button-column" style="flex-grow: 1;-webkit-flex-grow: 1;">\n              <div class="button-row">\n                ', this.createTemplateView("deg", {
                tabIndex: "0",
                haloColor: "rgba(0, 0, 0, 0.2)",
                arrowNav: [".f1", "[sin]", "[store]", "[rad]"]
            }), "\n                ", this.createTemplateView("rad", {
                tabIndex: "-1",
                haloColor: "rgba(0, 0, 0, 0.2)",
                arrowNav: [".f1", "[asin]", "[deg]", "[fact]"]
            }), "\n                ", this.createTemplateView("fact", {
                tabIndex: "-1",
                haloColor: "rgba(0, 0, 0, 0.2)",
                arrowNav: [".f1", "[mod]", "[rad]", null]
            }), '\n              </div>\n              <div class="button-row">\n                ', this.createTemplateView("sin", {
                tabIndex: "-1",
                haloColor: "rgba(0, 0, 0, 0.2)",
                arrowNav: ["[deg]", "[cos]", "[exp]", "[asin]"]
            }), "\n                ", this.createTemplateView("asin", {
                tabIndex: "-1",
                haloColor: "rgba(0, 0, 0, 0.2)",
                arrowNav: ["[rad]", "[acos]", "[sin]", "[mod]"]
            }), "\n                ", this.createTemplateView("mod", {
                tabIndex: "-1",
                haloColor: "rgba(0, 0, 0, 0.2)",
                arrowNav: ["[fact]", "[p]", "[asin]", null]
            }), '\n              </div>\n              <div class="button-row">\n                ', this.createTemplateView("cos", {
                tabIndex: "-1",
                haloColor: "rgba(0, 0, 0, 0.2)",
                arrowNav: ["[sin]", "[tan]", "[root]", "[acos]"]
            }), "\n                ", this.createTemplateView("acos", {
                tabIndex: "-1",
                haloColor: "rgba(0, 0, 0, 0.2)",
                arrowNav: ["[asin]", "[atan]", "[cos]", "[p]"]
            }), "\n                ", this.createTemplateView("p", {
                tabIndex: "-1",
                haloColor: "rgba(0, 0, 0, 0.2)",
                arrowNav: ["[mod]", "[c]", "[acos]", null]
            }), '\n              </div>\n              <div class="button-row">\n                ', this.createTemplateView("tan", {
                tabIndex: "-1",
                haloColor: "rgba(0, 0, 0, 0.2)",
                arrowNav: ["[cos]", null, "[pi]", "[atan]"]
            }), "\n                ", this.createTemplateView("atan", {
                tabIndex: "-1",
                haloColor: "rgba(0, 0, 0, 0.2)",
                arrowNav: ["[acos]", null, "[tan]", "[c]"]
            }), "\n                ", this.createTemplateView("c", {
                tabIndex: "-1",
                haloColor: "rgba(0, 0, 0, 0.2)",
                arrowNav: ["[p]", null, "[atan]", null]
            }), "\n              </div>\n            </div>\n          </div>\n          "),
            function(_, __, ___, degrees) {
                this.degView.font = degrees ? "600 18px Roboto" : "300 18px Roboto",
                this.radView.font = degrees ? "300 18px Roboto" : "600 18px Roboto",
                this.degView.view.ariaPressed = degrees,
                this.radView.view.ariaPressed = !degrees,
                this.degView.view && (this.degView.view.paint(),
                this.radView.view.paint())
            }
            .bind(this))
            return this.data.degreesMode$.addListener(l),
            l(null, null, null, !1),
            opt_out("\n    "),
            opt_out.toString()
        },
        language: "html"
    }]
}),
CLASS({
    package: "foam.ui",
    name: "SlidePanel",
    extends: "foam.ui.View",
    requires: ["foam.input.touch.GestureTarget"],
    imports: ["clearTimeout", "document", "gestureManager", "setTimeout"],
    properties: [{
        name: "side",
        lazyFactory: function() {
            return this.LEFT
        },
        adapt: function(_, side) {
            return "left" === side ? this.LEFT : "right" === side ? this.RIGHT : side
        }
    }, {
        model_: "StringProperty",
        name: "openedDescription",
        type: "String",
        defaultValue: ""
    }, {
        model_: "StringProperty",
        name: "closedDescription",
        type: "String",
        defaultValue: ""
    }, {
        name: "state",
        postSet: function(oldState, newState) {
            var layout = this.state.layout.call(this)
            oldState !== newState || this.af_ ? this.desiredLayout = layout : this.currentLayout = layout,
            oldState === this.OPEN && newState === this.CLOSED ? this.arialive$().textContent = this.closedDescription : oldState === this.CLOSED && newState === this.OPEN && (this.arialive$().textContent = this.openedDescription)
        }
    }, {
        name: "currentLayout",
        postSet: function(_, layout) {
            this.panelWidth = Math.max(layout[1], this.minPanelWidth),
            this.panelX = Math.min(this.parentWidth - this.stripWidth, this.parentWidth - layout[2]),
            this.mainWidth = Math.max(layout[0], this.panelX)
        }
    }, {
        name: "desiredLayout",
        postSet: function(_, layout) {
            if (!this.currentLayout)
                return this.currentLayout = layout,
                undefined
            var startLayout = this.currentLayout
              , start = Date.now()
              , end = start + this.ANIMATION_DELAY
              , animate = function() {
                var now, p = (Date.now() - start) / (end - start), mainWidth
                p < 1 ? (mainWidth = this.currentLayout = [startLayout[0] * (1 - p) + layout[0] * p, startLayout[1] * (1 - p) + layout[1] * p, startLayout[2] * (1 - p) + layout[2] * p],
                this.af_ && this.X.cancelAnimationFrame(this.af_),
                this.af_ = this.X.requestAnimationFrame(animate)) : (this.currentLayout = layout,
                this.af_ = null)
            }
            .bind(this)
            animate()
        }
    }, {
        model_: "ViewFactoryProperty",
        name: "mainView",
        type: "ViewFactory"
    }, {
        model_: "ViewFactoryProperty",
        name: "panelView",
        type: "ViewFactory"
    }, {
        model_: "IntProperty",
        name: "minWidth",
        type: "Int",
        defaultValueFn: function() {
            var e = this.main$()
            return e ? toNum(this.X.window.getComputedStyle(e).width) : 300
        }
    }, {
        model_: "IntProperty",
        name: "mainWidth",
        type: "Int",
        visibility: "hidden",
        hidden: !0,
        postSet: function(_, x) {
            this.main$().style.width = x + "px"
            var x = this.side.mainX.call(this)
            this.main$().style.webkitTransform = "translate3d(" + x + "px, 0,0)",
            this.main$().style.MozTransform = "translate3d(" + x + "px, 0,0)"
        },
        help: "Set internally by the resize handler"
    }, {
        model_: "IntProperty",
        name: "panelWidth",
        type: "Int",
        visibility: "hidden",
        hidden: !0,
        postSet: function(_, x) {
            this.panel$().style.width = x + 2 + "px",
            this.panelView_ && this.panelView_.onResize && this.panelView_.onResize()
        },
        help: "Set internally by the resize handler"
    }, {
        model_: "IntProperty",
        name: "minPanelWidth",
        type: "Int",
        defaultValueFn: function() {
            if (this.panelView && this.panelView.minWidth)
                return this.panelView.minWidth + (this.panelView.stripWidth || 0)
            var e = this.panel$()
            return e ? toNum(this.X.window.getComputedStyle(e).width) : 250
        }
    }, {
        model_: "IntProperty",
        name: "parentWidth",
        type: "Int",
        lazyFactory: function() {
            return toNum(this.X.window.getComputedStyle(this.$.parentNode).width)
        },
        help: "A pseudoproperty that returns the current width (CSS pixels) of the containing element"
    }, {
        model_: "IntProperty",
        name: "stripWidth",
        type: "Int",
        help: "The width in (CSS) pixels of the minimal visible strip of panel",
        defaultValue: 30
    }, {
        model_: "FloatProperty",
        name: "panelRatio",
        type: "Float",
        help: "The ratio (0-1) of the total width occupied by the panel, when the containing element is wide enough for expanded view.",
        defaultValue: .5
    }, {
        model_: "IntProperty",
        name: "panelX",
        type: "Int",
        postSet: function(oldX, x) {
            this.currentLayout && (this.currentLayout[2] = this.parentWidth - x),
            oldX !== x && (this.dir_ = oldX.compareTo(x)),
            x = this.side.panelX.call(this, x),
            this.panel$().style.webkitTransform = "translate3d(" + x + "px, 0,0)",
            this.panel$().style.MozTransform = "translate3d(" + x + "px, 0,0)"
        }
    }, {
        name: "dragGesture",
        visibility: "hidden",
        hidden: !0,
        transient: !0,
        lazyFactory: function() {
            return this.GestureTarget.create({
                containerID: this.id + "-panel",
                handler: this,
                gesture: "drag"
            })
        }
    }, {
        name: "tapGesture",
        visibility: "hidden",
        hidden: !0,
        transient: !0,
        lazyFactory: function() {
            return this.GestureTarget.create({
                containerID: this.id + "-panel",
                handler: this,
                gesture: "tap"
            })
        }
    }],
    constants: [{
        name: "ANIMATION_DELAY",
        value: 150
    }, {
        name: "LEFT",
        value: {
            panelX: function(x) {
                return this.parentWidth - x - this.panelWidth
            },
            invPanelX: function(x) {
                return x - this.parentWidth + this.panelWidth
            },
            mainX: function() {
                return this.parentWidth - this.mainWidth
            },
            dragDir: -1
        }
    }, {
        name: "RIGHT",
        value: {
            panelX: function(x) {
                return x
            },
            invPanelX: function(x) {
                return x
            },
            mainX: function() {
                return 0
            },
            dragDir: 1
        }
    }, {
        name: "CLOSED",
        value: {
            name: "CLOSED",
            layout: function() {
                return [this.parentWidth - this.stripWidth, this.minPanelWidth, this.stripWidth]
            },
            onResize: function() {
                this.parentWidth > this.minWidth + this.minPanelWidth && (this.state = this.EXPANDED)
            },
            toggle: function() {
                this.open()
            },
            open: function() {
                this.state = this.OPEN
            },
            over: !0
        }
    }, {
        name: "EXPANDED",
        value: {
            name: "EXPANDED",
            layout: function() {
                var extraWidth = this.parentWidth - this.minWidth - this.minPanelWidth
                  , extraWidth = this.minPanelWidth + extraWidth * this.panelRatio
                return [this.parentWidth - extraWidth, extraWidth, extraWidth]
            },
            onResize: function() {
                this.parentWidth < this.minWidth + this.minPanelWidth && (this.state = this.CLOSED)
            }
        }
    }, {
        name: "OPEN",
        value: {
            name: "OPEN",
            layout: function() {
                return [this.parentWidth - this.stripWidth, this.minPanelWidth, this.minPanelWidth]
            },
            onResize: function() {
                this.parentWidth > this.minWidth + this.minPanelWidth && (this.state = this.OPEN_EXPANDED)
            },
            close: function() {
                this.state = this.CLOSED
            },
            toggle: function() {
                this.close()
            },
            over: !0
        }
    }, {
        name: "OPEN_EXPANDED",
        value: {
            name: "OPEN_EXPANDED",
            layout: function() {
                return this.EXPANDED.layout.call(this)
            },
            onResize: function() {
                this.parentWidth < this.minWidth + this.minPanelWidth && (this.state = this.OPEN)
            }
        }
    }],
    methods: [function initHTML() {
        this.CLOSED.onResize.call(this),
        this.state || (this.state = this.CLOSED),
        this.gestureManager && (this.gestureManager.install(this.dragGesture),
        this.gestureManager.install(this.tapGesture)),
        this.X.window.addEventListener("resize", this.onResize),
        this.main$().addEventListener("click", this.onMainFocus),
        this.main$().addEventListener("DOMFocusIn", this.onMainFocus),
        this.panel$().addEventListener("DOMFocusIn", this.onPanelFocus),
        this.initChildren()
    }
    , function interpolate(state1, state2) {
        var state1 = state1.layout.call(this)
          , state2 = state2.layout.call(this)
        return [state1[0] * this.progress + state2[0] * (1 - this.progress), state1[1] * this.progress + state2[1] * (1 - this.progress), state1[2] * this.progress + state2[2] * (1 - this.progress)]
    }
    , function main$() {
        return this.X.$(this.id + "-main")
    }
    , function panel$() {
        return this.X.$(this.id + "-panel")
    }
    , function shadow$() {
        return this.X.$(this.id + "-shadow")
    }
    , function arialive$() {
        return this.X.$(this.id + "-arialive")
    }
    , function open() {
        this.state.open && this.state.open.call(this)
    }
    , function close() {
        this.state.close && this.state.close.call(this)
    }
    , function toggle() {
        this.state.toggle && this.state.toggle.call(this)
    }
    ],
    listeners: [{
        name: "onPanelFocus",
        code: function(e) {
            this.open()
        },
        isMerged: 1
    }, {
        name: "onMainFocus",
        code: function(e) {
            this.close()
        },
        isMerged: 1
    }, {
        name: "onResize",
        code: function(e) {
            this.clearProperty("parentWidth"),
            this.$ && (this.state.onResize.call(this),
            this.shadow$().style.display = this.state.over ? "inline" : "none",
            this.state = this.state)
        },
        isFramed: !0
    }, {
        name: "tapClick",
        code: function() {
            this.toggle()
        }
    }, {
        name: "dragStart",
        code: function(point) {
            var self, originalX
            this.state === this.EXPANDED || this.state === this.OPEN_EXPANDED || (originalX = (self = this).panelX,
            Events.map(point.x$, this.panelX$, function(x) {
                return (x = this.side.invPanelX.call(this, originalX + this.side.dragDir * point.totalX)) <= this.parentWidth - this.panelWidth ? this.parentWidth - this.panelWidth : x >= this.parentWidth - this.stripWidth ? this.parentWidth - this.stripWidth : x
            }
            .bind(this)))
        }
    }, {
        name: "dragEnd",
        code: function(point) {
            var currentLayout = this.currentLayout
              , layout = (this.af_ && this.X.cancelAnimationFrame(this.af_),
            this.af_ = null,
            this.dir_ < 0 ? this.close() : this.open(),
            this.state.layout.call(this))
            this.currentLayout = currentLayout,
            this.desiredLayout = layout
        }
    }],
    templates: [{
        name: "CSS",
        code: ConstantTemplate(".SlidePanel .left-shadow{background:linear-gradient(to left, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%);height:100%;left:-8px;position:absolute;width:8px}.SlidePanel .right-shadow{background:linear-gradient(to right, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%);height:100%;right:-8px;position:absolute;width:8px;top:0}[aria-live]{position:absolute;clip-path:inset(100%)}"),
        language: "css"
    }, {
        name: "toHTML",
        code: function(opt_out) {
            var self = this
              , X = this.X
              , Y = this.Y
              , opt_out = opt_out || TOC(this)
            return opt_out('\n      <div id="', this.id, '" style="display: inline-block;position: relative;" class="SlidePanel">\n        <div aria-live="polite" id="', this.id, '-arialive"></div>\n        <div id="', this.id, '-main" class="main">\n          <div style="width:0;position:absolute;"></div>\n          ', this.mainView({
                data$: this.data$
            }), '\n        </div>\n        <div id="', this.id, '-panel" class="panel" style="position: absolute; top: 0; left: -1;">\n          '),
            this.side === this.RIGHT && opt_out(' <div id="', this.id, '-shadow" class="left-shadow"></div> '),
            opt_out("\n          ", this.panelView_ = this.panelView({
                data$: this.data$
            }), "\n          "),
            this.side === this.LEFT && opt_out(' <div id="', this.id, '-shadow" class="right-shadow"></div> '),
            opt_out("\n        </div>\n      </div>\n    "),
            opt_out.toString()
        },
        language: "html"
    }],
    help: 'A controller that shows a main view with a small strip of the secondary view visible at the right edge. This "panel" can be dragged by a finger or mouse pointer to any position from its small strip to fully exposed. If the containing view is wide enough, both panels will always be visible.'
}),
CLASS({
    package: "foam.ui.animated",
    name: "Label",
    extends: "foam.ui.SimpleView",
    imports: ["window"],
    properties: [{
        name: "data"
    }, {
        name: "className",
        defaultValue: "alabel"
    }, {
        name: "left",
        postSet: function(_, l) {
            this.$.querySelector(".f1").style.left = l
        }
    }],
    methods: [function toInnerHTML() {
        var tabIndex, speechLabel
        return "<div" + (this.tabIndex ? ' tabindex="' + this.tabIndex + '"' : "") + (this.speechLabel ? ' aria-label="' + this.speechLabel + '"' : "") + ' class="f1"></div><div class="f2"></div>'
    }
    , function initHTML() {
        this.data$.addListener(this.onDataChange),
        this.window.addEventListener("resize", this.onResize)
    }
    ],
    listeners: [{
        name: "onDataChange",
        code: function(_, __, oldValue, newValue) {
            var f1$, f2$, data, data
            this.$ && (f1$ = this.$.querySelector(".f1"),
            f2$ = this.$.querySelector(".f2"),
            data = this.data || "&nbsp;",
            f1$.innerHTML = '<span aria-hidden="true">' + data + "</span>",
            f2$.innerHTML = data,
            f1$.style.left = f2$.offsetLeft + "px",
            data = this.data.length && (oldValue.startsWith(newValue) || newValue.startsWith(oldValue)),
            DOM.setClass(this.$.querySelector(".f1"), "animated", data),
            this.$.querySelector(".f1").setAttribute("tabindex", 3),
            void 0 !== newValue && (newValue = (newValue = newValue.replace(/\<[^\<\>]+\>/g, "")).replace(/\&nbsp\;/g, "")),
            this.$.querySelector(".f1").setAttribute("aria-label", void 0 !== newValue ? newValue : "Blank"))
        },
        isFramed: !0
    }, {
        name: "onResize",
        code: function() {
            this.$ && (DOM.setClass(this.$.querySelector(".f1"), "animated", !1),
            this.onDataChange())
        },
        isFramed: !0
    }],
    templates: [{
        name: "CSS",
        code: ConstantTemplate(".f1{position:absolute;white-space:nowrap}.f1.animated{transition:left .2s}.f1:focus{border:2px solid rgba(52, 153, 128, 0.65);border-radius:10px;margin-top:-2px;margin-right:2px}.f2{display:inline;float:right;visibility:hidden;white-space:nowrap}"),
        language: "css"
    }]
}),
CLASS({
    package: "foam.ui",
    name: "SimpleView",
    extends: "foam.ui.BaseView",
    traits: ["foam.ui.HTMLViewTrait", "foam.ui.U2ViewTrait"],
    requires: ["Property"],
    exports: ["propertyViewProperty"],
    properties: [{
        name: "propertyViewProperty",
        defaultValueFn: function() {
            return this.Property.DETAIL_VIEW
        }
    }]
}),
CLASS({
    package: "foam.apps.calc",
    name: "History",
    requires: ["foam.apps.calc.NumberFormatter"],
    properties: [{
        name: "numberFormatter"
    }, {
        name: "op"
    }, {
        name: "a2",
        preSet: function(_, n) {
            return this.formatNumber(n)
        }
    }, {
        name: "sayEquals"
    }],
    methods: [function formatNumber(n) {
        var n, n = (n = this.numberFormatter.formatNumber(n) || "0").replace(/(.+?)(?:\.$|$)/, "$1")
        return this.numberFormatter.i18nNumber(n)
    }
    ]
}),
CLASS({
    package: "foam.input.touch",
    name: "GestureManager",
    requires: ["foam.input.touch.DragGesture", "foam.input.touch.Gesture", "foam.input.touch.GestureTarget", "foam.input.touch.PinchTwistGesture", "foam.input.touch.ScrollGesture", "foam.input.touch.TapGesture", "foam.input.touch.InputPoint"],
    imports: ["document", "touchManager"],
    properties: [{
        name: "gestures",
        factory: function() {
            return {
                verticalScroll: this.ScrollGesture.create(),
                verticalScrollMomentum: this.ScrollGesture.create({
                    momentumEnabled: !0
                }),
                verticalScrollNative: this.ScrollGesture.create({
                    nativeScrolling: !0
                }),
                horizontalScroll: this.ScrollGesture.create({
                    direction: "horizontal"
                }),
                horizontalScrollMomentum: this.ScrollGesture.create({
                    direction: "horizontal",
                    momentumEnabled: !0
                }),
                horizontalScrollNative: this.ScrollGesture.create({
                    direction: "horizontal",
                    nativeScrolling: !0
                }),
                tap: this.TapGesture.create(),
                drag: this.DragGesture.create(),
                pinchTwist: this.PinchTwistGesture.create()
            }
        }
    }, {
        name: "targets",
        factory: function() {
            return {}
        }
    }, {
        name: "active",
        factory: function() {
            return {}
        },
        help: "Gestures that are active right now and should be checked for recognition. This is the gestures active on the FIRST touch. Rectangles are not checked for subsequent touches."
    }, {
        name: "recognized",
        help: "Set to the recognized gesture. Cleared when all points are lifted."
    }, {
        name: "points",
        factory: function() {
            return {}
        }
    }, {
        name: "wheelTimer"
    }, {
        name: "scrollWheelTimeout",
        defaultValue: 300
    }, {
        name: "scrollViewTargets",
        defaultValue: 0
    }],
    methods: [function init() {
        this.SUPER(),
        this.touchManager.subscribe(this.touchManager.TOUCH_START, this.onTouchStart),
        this.touchManager.subscribe(this.touchManager.TOUCH_MOVE, this.onTouchMove),
        this.touchManager.subscribe(this.touchManager.TOUCH_END, this.onTouchEnd),
        this.document.addEventListener("mousedown", this.onMouseDown),
        this.document.addEventListener("mousemove", this.onMouseMove),
        this.document.addEventListener("mouseup", this.onMouseUp),
        this.document.addEventListener("wheel", this.onWheel),
        this.document.addEventListener("contextmenu", this.onContextMenu)
    }
    , function install(target) {
        target.containerID ? (this.targets[target.containerID] || (this.targets[target.containerID] = []),
        this.targets[target.containerID].push(target)) : console.warn("no container ID on touch target")
    }
    , function uninstall(target) {
        var arr = this.targets[target.containerID]
        if (arr) {
            for (var i = 0; i < arr.length; i++)
                if (arr[i] === target) {
                    arr.splice(i, 1)
                    break
                }
            0 === arr.length && delete this.targets[target.containerID]
        }
    }
    , function purge() {
        for (var keys = Object.keys(this.targets), count = 0, i = 0; i < keys.length; i++)
            this.document.getElementById(keys[i]) || (delete this.targets[keys[i]],
            count++)
        return console.log("Purged " + count + " targets"),
        count
    }
    , function activateContainingGestures(x, y, opt_predicate) {
        for (var e = this.X.document.elementFromPoint(x, y); e; ) {
            if (e.id) {
                var matches = this.targets[e.id]
                if (matches && matches.length)
                    for (var i = 0; i < matches.length; i++) {
                        var t = matches[i]
                          , g = this.gestures[t.gesture]
                        !g || opt_predicate && !opt_predicate(g) || (this.active[g.name] || (this.active[g.name] = []),
                        this.active[g.name].push(t))
                    }
            }
            e = e.parentNode
        }
    }
    , function checkRecognition() {
        if (!this.recognized) {
            var self = this
              , matches = []
            if (Object.keys(this.active).forEach(function(name) {
                var answer = self.gestures[name].recognize(self.points)
                answer >= self.Gesture.WAIT ? matches.push([name, answer]) : delete self.active[name]
            }),
            0 !== matches.length) {
                for (var i, lastYes = -1, i = 0; i < matches.length; i++)
                    matches[i][1] === this.Gesture.YES && (lastYes = i)
                var lastMaybe = -1, match
                for (i = 0; i < matches.length; i++)
                    matches[i][1] === this.Gesture.MAYBE && (lastMaybe = i)
                if (lastYes < 0) {
                    if (1 < matches.length || lastMaybe < 0)
                        return
                    match = matches[lastMaybe][0]
                } else
                    match = matches[lastYes][0]
                var matched = this.active[match].filter(function(m) {
                    if (!m.enforceContainment)
                        return !0
                    for (var r = m.getElement().getBoundingClientRect(), keys = Object.keys(self.points), i = 0; i < keys.length; ++i) {
                        var p = self.points[keys[i]]
                        if (p.x < r.left || p.x > r.right || p.y < r.top || p.y > r.bottom)
                            return !1
                    }
                    return !0
                })
                  , legal = []
                for (i = 0; i < matched.length; i++) {
                    for (var m = matched[i].getElement(), contained = 0, j = 0; j < matched.length; j++) {
                        var n = matched[j].getElement()
                        m !== n && m.contains(n) && contained++
                    }
                    0 === contained && legal.push(matched[i].handler)
                }
                0 < legal.length && this.gestures[match].attach(this.points, legal),
                this.recognized = this.gestures[match]
            }
        }
    }
    , function resetState() {
        this.active = {},
        this.recognized = null,
        this.points = {}
    }
    ],
    listeners: [{
        name: "onTouchStart",
        code: function(_, __, touch) {
            if (this.recognized)
                return this.recognized.addPoint && this.recognized.addPoint(touch),
                undefined
            var pointCount
            Object.keys(this.points).length || this.activateContainingGestures(touch.x, touch.y),
            this.points[touch.id] = touch,
            this.checkRecognition()
        }
    }, {
        name: "onMouseDown",
        code: function(event) {
            var event = this.InputPoint.create({
                id: "mouse",
                type: "mouse",
                x: event.clientX,
                y: event.clientY
            }), pointCount
            if (this.recognized)
                return this.recognized.addPoint && this.recognized.addPoint(event),
                undefined
            Object.keys(this.points).length || this.activateContainingGestures(event.x, event.y),
            this.points[event.id] = event,
            this.checkRecognition()
        }
    }, {
        name: "onTouchMove",
        code: function(_, __, touch) {
            this.recognized || this.checkRecognition()
        }
    }, {
        name: "onMouseMove",
        code: function(event) {
            this.points.mouse && (this.points.mouse.x = event.clientX,
            this.points.mouse.y = event.clientY,
            this.checkRecognition())
        }
    }, {
        name: "onTouchEnd",
        code: function(_, __, touch) {
            this.recognized || this.checkRecognition(),
            delete this.points[touch.id],
            this.active = {},
            this.recognized = void 0
        }
    }, {
        name: "onMouseUp",
        code: function(event) {
            this.points.mouse && (this.points.mouse.x = event.clientX,
            this.points.mouse.y = event.clientY,
            this.points.mouse.done = !0,
            this.recognized || this.checkRecognition(),
            delete this.points.mouse,
            this.active = {},
            this.recognized = void 0)
        }
    }, {
        name: "onWheel",
        code: function(event) {
            if (this.wheelTimer)
                this.points.wheel.x -= event.deltaX,
                this.points.wheel.y -= event.deltaY,
                this.X.window.clearTimeout(this.wheelTimer),
                this.wheelTimer = this.X.window.setTimeout(this.onWheelDone, this.scrollWheelTimeout)
            else if (!(this.recognized || 0 < Object.keys(this.points).length)) {
                var wheel = this.InputPoint.create({
                    id: "wheel",
                    type: "wheel",
                    x: event.clientX,
                    y: event.clientY
                })
                  , dir = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? "horizontal" : "vertical"
                  , gestures = [dir + "Scroll", dir + "ScrollMomentum", dir + "ScrollNative"]
                this.activateContainingGestures(wheel.x, wheel.y, function(g) {
                    return 0 <= gestures.indexOf(g.name)
                }),
                wheel.x -= event.deltaX,
                wheel.y -= event.deltaY
                for (var i = 0; i < gestures.length; i++) {
                    var gesture = gestures[i]
                    if (this.active[gesture] && this.active[gesture].length) {
                        this.points.wheel || (this.points.wheel = wheel),
                        this.gestures[gesture].attach(this.points, this.active[gesture].map(function(gt) {
                            return gt.handler
                        })),
                        this.recognized = this.gestures[gesture],
                        this.wheelTimer = this.X.window.setTimeout(this.onWheelDone, this.scrollWheelTimeout)
                        break
                    }
                }
            }
        }
    }, {
        name: "onWheelDone",
        code: function() {
            this.wheelTimer = void 0,
            this.points.wheel.done = !0,
            delete this.points.wheel,
            this.recognized = void 0
        }
    }, {
        name: "onContextMenu",
        code: function() {
            this.resetState()
        }
    }]
}),
CLASS({
    package: "foam.input.touch",
    name: "DragGesture",
    extends: "foam.input.touch.Gesture",
    properties: [{
        name: "name",
        defaultValue: "drag"
    }],
    constants: [{
        name: "DRAG_TOLERANCE",
        value: 20
    }],
    methods: [function recognize(map) {
        var keys = Object.keys(map)
        if (1 < keys.length)
            return this.NO
        var map = map[keys[0]]
        if (map.done)
            return this.NO
        var delta, keys = Math.max(Math.abs(map.totalX), Math.abs(map.totalY)) >= this.DRAG_TOLERANCE ? this.YES : this.MAYBE
        return keys != this.NO && (map.shouldPreventDefault = !0),
        keys
    }
    , function attach(map, handlers) {
        var map = map[Object.keys(map)[0]]
        this.handlers = handlers || [],
        map.done$.addListener(this.onDone),
        this.pingHandlers("dragStart", map)
    }
    , function pingHandlers(method, point) {
        for (var i = 0; i < this.handlers.length; i++) {
            var h = this.handlers[i]
            h && h[method] && h[method](point)
        }
    }
    ],
    listeners: [{
        name: "onDone",
        code: function(obj, prop, old, nu) {
            obj.done$.removeListener(this.onDone),
            this.pingHandlers("dragEnd", obj)
        }
    }],
    help: "Gesture that understands a hold and drag with mouse or one touch point."
}),
CLASS({
    package: "foam.input.touch",
    name: "Gesture",
    properties: [{
        name: "name",
        required: !0
    }],
    constants: [{
        name: "YES",
        value: 3
    }, {
        name: "MAYBE",
        value: 2
    }, {
        name: "WAIT",
        value: 1
    }, {
        name: "NO",
        value: 0
    }],
    methods: [function recognize(map) {
        return this.NO
    }
    , function attach(handlers) {}
    , function newPoint(point) {}
    ],
    help: "Installed in the GestureManager to watch for a particular kind of gesture"
}),
CLASS({
    package: "foam.input.touch",
    name: "PinchTwistGesture",
    extends: "foam.input.touch.Gesture",
    properties: [{
        name: "name",
        defaultValue: "pinchTwist"
    }, {
        name: "handlers"
    }, {
        name: "points"
    }],
    methods: [function getPoints(map) {
        var keys = Object.keys(map)
        return [map[keys[0]], map[keys[1]]]
    }
    , function recognize(map) {
        if (2 !== Object.keys(map).length)
            return this.NO
        var map = this.getPoints(map), moved
        return map[0].done || map[1].done ? this.NO : !(0 === map[0].dx && 0 === map[0].dy || 0 === map[1].dx && 0 === map[1].dy) ? this.YES : this.MAYBE
    }
    , function attach(map, handlers) {
        Object_forEach(map, function(p) {
            p.shouldPreventDefault = !0
        }),
        this.points = this.getPoints(map),
        this.handlers = handlers || [],
        this.points.forEach(function(p) {
            p.x$.addListener(this.onMove),
            p.y$.addListener(this.onMove),
            p.done$.addListener(this.onDone)
        }
        .bind(this)),
        this.pingHandlers("pinchStart"),
        this.onMove()
    }
    , function pingHandlers(method, scale, rotation) {
        for (var i = 0; i < this.handlers.length; i++) {
            var h = this.handlers[i]
            h && h[method] && h[method](scale, rotation)
        }
    }
    , function distance(x1, y1, x2, y2) {
        var x2 = x2 - x1
          , x1 = y2 - y1
        return Math.sqrt(x2 * x2 + x1 * x1)
    }
    ],
    listeners: [{
        name: "onMove",
        code: function() {
            for (var oldDist = this.distance(this.points[0].x0, this.points[0].y0, this.points[1].x0, this.points[1].y0), newDist, oldDist = this.distance(this.points[0].x, this.points[0].y, this.points[1].x, this.points[1].y) / oldDist, oldAngle = Math.atan2(this.points[1].y0 - this.points[0].y0, this.points[1].x0 - this.points[0].x0), newAngle, rotation = Math.atan2(this.points[1].y - this.points[0].y, this.points[1].x - this.points[0].x) - oldAngle; rotation < -Math.PI; )
                rotation += 2 * Math.PI
            for (; rotation > Math.PI; )
                rotation -= 2 * Math.PI
            rotation = (rotation *= 360) / (2 * Math.PI),
            this.pingHandlers("pinchMove", oldDist, rotation)
        }
    }, {
        name: "onDone",
        code: function(obj, prop, old, nu) {
            this.points.forEach(function(p) {
                p.x$.removeListener(this.onMove),
                p.y$.removeListener(this.onMove),
                p.done$.removeListener(this.onDone)
            }),
            this.pingHandlers("pinchEnd")
        }
    }],
    help: "Gesture that understands a two-finger pinch/stretch and rotation"
}),
CLASS({
    package: "foam.input.touch",
    name: "ScrollGesture",
    extends: "foam.input.touch.Gesture",
    properties: [{
        name: "name",
        factory: function() {
            return this.direction + "Scroll" + (this.momentumEnabled ? "Momentum" : this.nativeScrolling ? "Native" : "")
        }
    }, {
        name: "direction",
        defaultValue: "vertical"
    }, {
        name: "isVertical",
        factory: function() {
            return "vertical" === this.direction
        }
    }, {
        name: "momentumEnabled",
        defaultValue: !1,
        help: 'Set me to true (usually by attaching the "verticalScrollMomentum" gesture) to enable momentum'
    }, {
        name: "nativeScrolling",
        defaultValue: !1,
        help: 'Set me to true (usually by attaching the "verticalScrollNative" gesture) to enable native browser scrolling'
    }, {
        name: "dragCoefficient",
        defaultValue: .94,
        help: "Each frame, the momentum will be multiplied by this coefficient. Higher means LESS drag."
    }, {
        name: "dragClamp",
        defaultValue: .05,
        help: "The speed threshold (pixels/millisecond) below which the momentum drops to 0."
    }, {
        name: "momentum",
        defaultValue: 0,
        help: "The current speed, in pixels/millisecond, at which the scroller is sliding."
    }, {
        name: "lastTime",
        visibility: "hidden",
        hidden: !0,
        defaultValue: 0,
        help: "The performance.now() value for the last time we computed the momentum slide."
    }, {
        name: "tickRunning",
        visibility: "hidden",
        hidden: !0,
        defaultValue: !1,
        help: "True when the physics tick should run."
    }, {
        name: "handlers"
    }],
    constants: [{
        name: "DRAG_TOLERANCE",
        value: 10
    }],
    methods: [function recognize(map) {
        if (1 !== Object.keys(map).length)
            return this.NO
        var map = map[Object.keys(map)[0]], delta
        return "mouse" === map.type || map.done ? this.NO : 0 < Math.abs(this.momentum) || Math.abs(this.isVertical ? map.totalY : map.totalX) > this.DRAG_TOLERANCE ? this.YES : this.MAYBE
    }
    , function attach(map, handlers) {
        var point = map[Object.keys(map)[0]]
        this.handlers = handlers || [],
        this.nativeScrolling || (Object_forEach(map, function(p) {
            p.shouldPreventDefault = !0
        }),
        (this.isVertical ? point.y$ : point.x$).addListener(this.onDelta),
        point.done$.addListener(this.onDone),
        0 === this.momentum ? this.pingHandlers(this.direction + "ScrollStart", 0, 0, this.isVertical ? point.y0 : point.x0) : this.tickRunning = !1)
    }
    , function pingHandlers(method, d, t, c) {
        for (var i = 0; i < this.handlers.length; i++) {
            var h = this.handlers[i]
            h && h[method] && h[method](d, t, c, this.stopMomentum)
        }
    }
    , function sendEndEvent(point) {
        var delta = this.isVertical ? point.dy : point.dx
          , total = this.isVertical ? point.totalY : point.totalX
          , point = this.isVertical ? point.y : point.x
        this.pingHandlers(this.direction + "ScrollEnd", delta, total, point)
    }
    , function calculateInstantaneousVelocity(point) {
        var now = this.X.performance.now()
          , lastTime = (this.tickRunning ? this : point).lastTime
          , point = (this.isVertical ? point.dy : point.dx) / (now - point.lastTime)
        return this.tickRunning && (this.lastTime = now),
        point
    }
    ],
    listeners: [{
        name: "onDelta",
        code: function(obj, prop, old, nu) {
            var velocity, delta, delta = (this.momentumEnabled && (delta = this.calculateInstantaneousVelocity(obj) - this.momentum,
            this.momentum += delta),
            this.isVertical ? obj.dy : obj.dx), total = this.isVertical ? obj.totalY : obj.totalX, obj = this.isVertical ? obj.y : obj.x
            this.pingHandlers(this.direction + "ScrollMove", delta, total, obj)
        }
    }, {
        name: "onDone",
        code: function(obj, prop, old, nu) {
            (this.isVertical ? obj.y$ : obj.x$).removeListener(this.onDelta),
            obj.done$.removeListener(this.onDone),
            this.momentumEnabled ? Math.abs(this.momentum) < this.dragClamp ? (this.momentum = 0,
            this.sendEndEvent(obj)) : (this.tickRunning = !0,
            this.lastTime = this.X.performance.now(),
            this.tick(obj)) : this.sendEndEvent(obj)
        }
    }, {
        name: "tick",
        code: function(touch) {
            var xy, now, elapsed, now, delta, total, elapsed
            this.tickRunning && (xy = this.isVertical ? "y" : "x",
            elapsed = (now = this.X.performance.now()) - this.lastTime,
            this.lastTime = now,
            now = this.momentum * elapsed,
            touch[xy] += now,
            elapsed = this.isVertical ? (delta = touch.dy,
            total = touch.totalY,
            touch.y) : (delta = touch.dx,
            total = touch.totalX,
            touch.x),
            0 != delta && this.pingHandlers(this.direction + "ScrollMove", delta, total, elapsed),
            this.momentum *= this.dragCoefficient,
            Math.abs(this.momentum) < this.dragClamp ? (this.momentum = 0,
            this.tickRunning = !1,
            this.sendEndEvent(touch)) : this.tick(touch))
        },
        isFramed: !0
    }, {
        name: "stopMomentum",
        code: function() {
            this.momentum = 0
        }
    }],
    help: "Gesture that understands vertical or horizontal scrolling."
}),
CLASS({
    package: "foam.input.touch",
    name: "TapGesture",
    extends: "foam.input.touch.Gesture",
    properties: [{
        name: "name",
        defaultValue: "tap"
    }, {
        name: "handlers"
    }],
    constants: [{
        name: "DRAG_TOLERANCE",
        value: 40
    }],
    methods: [function recognize(map) {
        for (var response, doneCount = 0, self = this, keys = Object.keys(map), i = 0; i < keys.length; i++) {
            var key, p = map[keys[i]]
            if (Math.abs(p.totalX) >= this.DRAG_TOLERANCE || Math.abs(p.totalY) >= this.DRAG_TOLERANCE)
                return this.NO
            p.done && doneCount++
        }
        if (void 0 !== this.NO)
            return doneCount === keys.length ? this.YES : this.WAIT
        void 0
    }
    , function attach(map, handlers) {
        var points
        handlers && handlers.length && (points = 0,
        Object_forEach(map, function(point) {
            points++,
            point.shouldPreventDefault = !0
        }),
        handlers.forEach(function(h) {
            h && h.tapClick && h.tapClick(map)
        }))
    }
    ],
    help: "Gesture that understands a quick, possible multi-point tap. Calls into the handler: tapClick(numberOfPoints)."
}),
CLASS({
    package: "foam.input.touch",
    name: "InputPoint",
    properties: [{
        name: "id"
    }, {
        name: "type"
    }, {
        model_: "BooleanProperty",
        name: "done",
        type: "Boolean"
    }, {
        name: "x",
        postSet: function(old, nu) {
            this.lastX = old
        }
    }, {
        name: "y",
        postSet: function(old, nu) {
            this.lastY = old
        }
    }, {
        name: "x0",
        factory: function() {
            return this.x
        }
    }, {
        name: "y0",
        factory: function() {
            return this.y
        }
    }, {
        name: "lastX",
        factory: function() {
            return this.x
        }
    }, {
        name: "lastY",
        factory: function() {
            return this.y
        }
    }, {
        name: "dx",
        getter: function() {
            return this.x - this.lastX
        }
    }, {
        name: "dy",
        getter: function() {
            return this.y - this.lastY
        }
    }, {
        name: "totalX",
        getter: function() {
            return this.x - this.x0
        }
    }, {
        name: "totalY",
        getter: function() {
            return this.y - this.y0
        }
    }, {
        name: "lastTime"
    }, {
        name: "shouldPreventDefault",
        defaultValue: !1
    }]
}),
CLASS({
    package: "foam.input.touch",
    name: "TouchManager",
    requires: ["foam.input.touch.InputPoint"],
    properties: [{
        name: "touches",
        factory: function() {
            return {}
        }
    }],
    constants: [{
        name: "TOUCH_START",
        value: ["touch-start"]
    }, {
        name: "TOUCH_END",
        value: ["touch-end"]
    }, {
        name: "TOUCH_MOVE",
        value: ["touch-move"]
    }],
    methods: [function init() {
        this.SUPER(),
        this.X.document && this.install(this.X.document)
    }
    , function install(d) {
        d.addEventListener("touchstart", this.onTouchStart)
    }
    , function attach(e) {
        e.addEventListener("touchmove", this.onTouchMove),
        e.addEventListener("touchend", this.onTouchEnd),
        e.addEventListener("touchcancel", this.onTouchCancel),
        e.addEventListener("touchleave", this.onTouchEnd)
    }
    , function detach(e) {
        e.removeEventListener("touchmove", this.onTouchMove),
        e.removeEventListener("touchend", this.onTouchEnd),
        e.removeEventListener("touchcancel", this.onTouchCancel),
        e.removeEventListener("touchleave", this.onTouchEnd)
    }
    , function touchStart(i, t, e) {
        this.touches[i] = this.InputPoint.create({
            id: i,
            type: "touch",
            x: t.pageX,
            y: t.pageY
        }),
        this.publish(this.TOUCH_START, this.touches[i])
    }
    , function touchMove(i, t, e) {
        var i = this.touches[i]
        i.x = t.pageX,
        i.y = t.pageY,
        i.lastTime = this.X.performance.now(),
        i.shouldPreventDefault && e.preventDefault(),
        this.publish(this.TOUCH_MOVE, this.touch)
    }
    , function touchEnd(i, t, e) {
        var touch = this.touches[i]
        touch.x = t.pageX,
        touch.y = t.pageY,
        touch.done = !0,
        this.publish(this.TOUCH_END, touch),
        touch.shouldPreventDefault && e.cancelable && e.preventDefault(),
        delete this.touches[i]
    }
    , function touchCancel(i, t, e) {
        this.touches[i].done = !0,
        this.publish(this.TOUCH_END, this.touches[i])
    }
    , function touchLeave(i, t, e) {
        this.touches[i].done = !0,
        this.publish(this.TOUCH_END, this.touches[i])
    }
    ],
    listeners: [{
        name: "onTouchStart",
        code: function(e) {
            e._touchcount || (e._touchcount = 0),
            e._touchcount++,
            1 == e._touchcount && this.attach(e.target)
            for (var i = 0; i < e.changedTouches.length; i++) {
                var t = e.changedTouches[i]
                this.touchStart(t.identifier, t, e)
            }
        }
    }, {
        name: "onTouchMove",
        code: function(e) {
            for (var i = 0; i < e.changedTouches.length; i++) {
                var t = e.changedTouches[i]
                  , id = t.identifier
                this.touches[id] ? this.touchMove(id, t, e) : console.warn("Touch move for unknown touch.")
            }
        }
    }, {
        name: "onTouchEnd",
        code: function(e) {
            e._touchcount--,
            0 == e._touchcount && this.detach(e.target)
            for (var i = 0; i < e.changedTouches.length; i++) {
                var t = e.changedTouches[i]
                  , id = t.identifier
                this.touches[id] ? this.touchEnd(id, t, e) : console.warn("Touch end for unknown touch " + id, Object.keys(this.touches))
            }
        }
    }, {
        name: "onTouchCancel",
        code: function(e) {
            this.detach(e.target)
            for (var i = 0; i < e.changedTouches.length; i++) {
                var t = e.changedTouches[i]
                  , id = t.identifier
                this.touches[id] ? this.touchCancel(id, t, e) : console.warn("Touch cancel for unknown touch.")
            }
        }
    }, {
        name: "onTouchLeave",
        code: function(e) {
            this.detach(e.target)
            for (var i = 0; i < e.changedTouches.length; i++) {
                var t = e.changedTouches[i]
                  , id = t.identifier
                this.touches[id] ? this.touchLeave(id, t, e) : console.warn("Touch cancel for unknown touch.")
            }
        }
    }]
}),
CLASS({
    package: "foam.ui.md",
    name: "Flare",
    requires: ["foam.graphics.Circle"],
    properties: [{
        name: "element"
    }, {
        name: "color",
        defaultValue: "#aaaaaa"
    }, {
        name: "startAlpha",
        defaultValue: 1
    }, {
        name: "startX",
        defaultValue: 1
    }, {
        name: "startY",
        defaultValue: 1
    }, {
        name: "startLocation",
        defaultValue: "percent"
    }, {
        name: "cssPosition",
        defaultValue: "fixed"
    }, {
        name: "flareState",
        defaultValue: "detached"
    }, {
        model_: "IntProperty",
        name: "growTime",
        type: "Int",
        defaultValue: 400
    }, {
        model_: "IntProperty",
        name: "fadeTime",
        type: "Int",
        defaultValue: 200
    }],
    listeners: [{
        name: "fire",
        code: function() {
            var w = this.element.offsetWidth
              , h = this.element.offsetHeight
              , x = "percent" !== this.startLocation ? this.startX : this.startX * w
              , y = "percent" !== this.startLocation ? this.startY : this.startY * h
              , c = this.Circle.create({
                r: 0,
                width: w,
                height: h,
                x: x,
                y: y,
                color: this.color,
                alpha: this.startAlpha
            })
              , x = (0 == this.startX && 0 == this.startY ? (c.startAngle = 1.5 * Math.PI,
            c.endAngle = 2 * Math.PI) : 0 == this.startX && 1 == this.startY ? (c.startAngle = 0,
            c.endAngle = Math.PI / 2) : 1 == this.startX && 0 == this.startY ? (c.startAngle = Math.PI,
            c.endAngle = 1.5 * Math.PI) : 1 == this.startX && 1 == this.startY && (c.startAngle = Math.PI / 2,
            c.endAngle = Math.PI),
            c.toView_())
              , div = document.createElement("div")
              , y = div.style
              , y = (y.position = this.cssPosition,
            y.left = 0,
            y.top = 0,
            y.zIndex = 4,
            this.X.lookup("foam.ui.View").getPrototype().nextID())
            div.id = y,
            div.innerHTML = x.toHTML(),
            this.flareState = "growing",
            this.element.appendChild(div),
            x.initHTML(),
            Movement.compile([[this.growTime, function() {
                c.r = 1.25 * Math.sqrt(w * w + h * h)
            }
            ], function() {
                this.flareState = "fading"
            }
            .bind(this), [this.fadeTime, function() {
                c.alpha = 0
            }
            ], function() {
                div.remove(),
                this.flareState = "detached"
            }
            .bind(this)])(),
            c.r$.addListener(EventService.framed(x.paint.bind(x))),
            c.alpha$.addListener(EventService.framed(x.paint.bind(x)))
        }
    }]
}),
CLASS({
    package: "foam.ui",
    name: "DAOListView",
    extends: "foam.ui.SimpleView",
    traits: ["foam.ui.DAODataViewTrait"],
    requires: ["SimpleValue"],
    properties: [{
        model_: "BooleanProperty",
        name: "isHidden",
        type: "Boolean",
        postSet: function(_, isHidden) {
            this.dao && !isHidden && this.onDAOUpdate()
        },
        defaultValue: !1
    }, {
        model_: "ViewFactoryProperty",
        name: "rowView",
        type: "ViewFactory",
        defaultValue: "foam.ui.DetailView"
    }, {
        name: "mode",
        view: {
            factory_: "foam.ui.ChoiceView",
            choices: ["read-only", "read-write", "final"]
        },
        defaultValue: "read-write"
    }, {
        name: "useSelection",
        postSet: function(old, nu) {
            this.useSelection && !this.X.selection$ && (this.X.selection$ = this.SimpleValue.create()),
            this.selection$ = this.X.selection$
        },
        help: "Backward compatibility for selection mode. Create a X.selection$ value in your context instead."
    }, {
        name: "selection",
        factory: function() {
            return this.SimpleValue.create()
        },
        help: "Backward compatibility for selection mode. Create a X.selection$ value in your context instead."
    }, {
        name: "scrollContainer",
        help: "Containing element that is responsible for scrolling."
    }, {
        name: "chunkSize",
        defaultValue: 0,
        help: "Number of entries to load in each infinite scroll chunk."
    }, {
        name: "chunksLoaded",
        defaultValue: 1,
        help: "The number of chunks currently loaded."
    }, {
        model_: "BooleanProperty",
        name: "painting",
        type: "Boolean",
        transient: !0,
        defaultValue: !1
    }, {
        model_: "BooleanProperty",
        name: "repaintRequired",
        type: "Boolean",
        transient: !0,
        defaultValue: !1
    }, {
        model_: "ArrayProperty",
        name: "propertyListeners_",
        type: "Array",
        lazyFactory: function() {
            return []
        }
    }],
    constants: [{
        name: "ROW_CLICK",
        value: ["row-click"]
    }],
    methods: [function init() {
        this.SUPER()
        var self = this
        this.subscribe(this.ON_HIDE, function() {
            self.isHidden = !0
        }),
        this.subscribe(this.ON_SHOW, function() {
            self.isHidden = !1
        }),
        this.X.selection$ && (this.selection$ = this.X.selection$)
    }
    , function initHTML() {
        if (this.SUPER(),
        0 < this.chunkSize) {
            for (var e = this.$; e && "scroll" !== window.getComputedStyle(e).overflow; )
                e = e.parentElement
            this.scrollContainer = e || window,
            this.scrollContainer.addEventListener("scroll", this.onScroll, !1)
        }
        this.isHidden || this.updateHTML()
    }
    , function construct() {
        if (this.dao && this.$) {
            if (this.painting)
                return this.repaintRequired = !0,
                undefined
            this.painting = !0
            var out = []
              , doneFirstItem = (this.children = [],
            !(this.initializers_ = []))
              , d = this.dao;
            (d = this.chunkSize ? d.limit(this.chunkSize * this.chunksLoaded) : d).select({
                put: function(o) {
                    "read-write" === this.mode && (o = o.model_.create(o, this.Y))
                    var view = this.rowView({
                        data: o,
                        model: o.model_
                    }, this.Y), itemId
                    view.DAO = this.dao,
                    "read-write" === this.mode && this.addRowPropertyListener(o, view),
                    this.addChild(view),
                    doneFirstItem ? this.separatorToHTML(out) : doneFirstItem = !0,
                    this.X.selection$ && (itemId = this.on("click", function() {
                        this.selection = o,
                        this.publish(this.ROW_CLICK)
                    }
                    .bind(this)),
                    this.setClass("dao-selected", function() {
                        return equals(this.selection, o)
                    }
                    .bind(this), itemId),
                    this.setClass(this.className + "-row", function() {
                        return !0
                    }, itemId),
                    out.push('<div id="' + itemId + '">')),
                    out.push(view.toHTML()),
                    this.X.selection$ && out.push("</div>")
                }
                .bind(this)
            })(function() {
                if (this.repaintRequired)
                    return this.repaintRequired = !1,
                    this.painting = !1,
                    this.realDAOUpdate(),
                    undefined
                var e = this.$
                e && (e.innerHTML = out.join(""),
                this.initInnerHTML(),
                this.painting = !1)
            }
            .bind(this))
        }
    }
    , function destroy(isParentDestroyed) {
        for (var listeners = this.propertyListeners_, i = 0; i < listeners.length; ++i)
            listeners[i].data.removePropertyListener(null, listeners[i].listener)
        return this.propertyListeners_ = [],
        this.SUPER(isParentDestroyed)
    }
    , function fromElement(e) {
        var children = e.children
        1 == children.length && "rowView" === children[0].nodeName ? this.SUPER(e) : this.rowView = e.innerHTML
    }
    , function separatorToHTML(out) {}
    , function addRowPropertyListener(data, view) {
        var listener = function(o, topic) {
            var prop
            o.model_.getProperty(topic[1]).transient || view.DAO.put(o.deepClone())
        }
        data.addPropertyListener(null, listener),
        this.propertyListeners_.push({
            data: data,
            listener: listener
        })
    }
    ],
    listeners: [{
        name: "onDAOUpdate",
        code: function() {
            this.realDAOUpdate()
        }
    }, {
        name: "realDAOUpdate",
        code: function() {
            this.isHidden || this.updateHTML()
        },
        isFramed: !0
    }, {
        name: "onScroll",
        code: function() {
            var e = this.scrollContainer
            0 < this.chunkSize && e.scrollTop + e.offsetHeight >= e.scrollHeight && (this.chunksLoaded++,
            this.updateHTML())
        }
    }]
}),
CLASS({
    package: "foam.ui",
    name: "DAODataViewTrait",
    exports: ["dao as daoViewCurrentDAO"],
    properties: [{
        name: "data",
        preSet: function(old, nu) {
            return this.dao !== nu && (this.dao = nu),
            nu
        }
    }, {
        model_: "foam.core.types.DAOProperty",
        name: "dao",
        label: "DAO",
        postSet: function(oldDAO, dao) {
            dao ? equals(this.data, dao) || (this.data = dao) : this.data = ""
        },
        help: "An alias for the data property.",
        onDAOUpdate: "onDAOUpdate"
    }],
    methods: [function onDAOUpdate() {}
    ]
}),
CLASS({
    package: "foam.core.types",
    name: "DAOProperty",
    extends: "Property",
    requires: ["foam.dao.FutureDAO", "foam.dao.ProxyDAO"],
    imports: ["console"],
    properties: [{
        name: "type",
        defaultValue: "DAO",
        help: "The FOAM type of this property."
    }, {
        model_: "ModelProperty",
        name: "model",
        type: "Model",
        help: "The model for objects stored in the DAO."
    }, {
        name: "view",
        defaultValue: "foam.ui.DAOListView"
    }, {
        name: "onDAOUpdate"
    }, {
        name: "install",
        defaultValue: function(prop) {
            defineLazyProperty(this, prop.name + "$Proxy", function() {
                var future, delegate, delegate = this[prop.name] || (future = afuture(),
                prop.FutureDAO.create({
                    future: future.get
                })), proxy = prop.ProxyDAO.create({
                    delegate: delegate
                })
                return this.addPropertyListener(prop.name, function(_, __, ___, dao) {
                    if (future)
                        return future.set(dao),
                        future = null,
                        undefined
                    proxy.delegate = dao
                }),
                {
                    get: function() {
                        return proxy
                    },
                    configurable: !0
                }
            })
        }
    }, {
        name: "fromElement_",
        defaultValue: function(e, p, model) {
            for (var children = e.children, i = 0; i < children.length; i++)
                this[p.name].put(model.create(null, this.Y).fromElement(children[i], p))
        }
    }, {
        name: "fromElement",
        defaultValue: function(e, p) {
            var model = e.getAttribute("model") || this[p.name] && this[p.name].model || p.model || ""
            if (!model)
                return this.console.warn("Attempt to load DAO from element without model"),
                undefined
            "string" == typeof model ? this.X.arequire(model)(function(model) {
                p.fromElement_.call(this, e, p, model)
            }
            .bind(this)) : p.fromElement_.call(this, e, p, model)
        }
    }],
    help: "Describes a DAO property."
}),
CLASS({
    package: "foam.dao",
    name: "FutureDAO",
    extends: "foam.dao.ProxyDAO",
    properties: [{
        name: "delegate",
        factory: function() {
            return null
        }
    }, {
        name: "future",
        required: !0
    }, {
        name: "model",
        defaultValueFn: function() {
            return this.delegate ? this.delegate.model : ""
        }
    }],
    methods: [function init() {
        this.SUPER(),
        this.future(function(delegate) {
            var listeners = this.daoListeners_
            this.daoListeners_ = [],
            this.delegate = delegate,
            this.daoListeners_ = listeners,
            this.daoListeners_.length && this.delegate.listen(this.relay)
        }
        .bind(this))
    }
    , function put(value, sink) {
        this.delegate ? this.delegate.put(value, sink) : this.future(this.put.bind(this, value, sink))
    }
    , function remove(query, sink) {
        this.delegate ? this.delegate.remove(query, sink) : this.future(this.remove.bind(this, query, sink))
    }
    , function removeAll() {
        if (this.delegate)
            return this.delegate.removeAll.apply(this.delegate, arguments)
        var a = arguments
          , f = afuture()
        return this.future(function(delegate) {
            this.removeAll.apply(this, a)(f.set)
        }
        .bind(this)),
        f.get
    }
    , function find(key, sink) {
        this.delegate ? this.delegate.find(key, sink) : this.future(this.find.bind(this, key, sink))
    }
    , function select(sink, options) {
        if (this.delegate)
            return this.delegate.select(sink, options)
        var a = arguments
          , f = afuture()
        return this.future(function() {
            this.select.apply(this, a)(f.set)
        }
        .bind(this)),
        f.get
    }
    ]
}),
CLASS({
    package: "foam.dao",
    name: "ProxyDAO",
    extends: "AbstractDAO",
    requires: ["foam.dao.NullDAO"],
    properties: [{
        name: "relay",
        factory: function() {
            var self = this
            return {
                put: function() {
                    self.notify_("put", arguments)
                },
                remove: function() {
                    self.notify_("remove", arguments)
                },
                reset: function() {
                    self.notify_("reset", arguments)
                },
                toString: function() {
                    return "RELAY(" + this.$UID + ", " + self.model_.name + ", " + self.delegate + ")"
                }
            }
        }
    }, {
        name: "delegate",
        mode: "read-only",
        required: !0,
        visibility: "hidden",
        hidden: !0,
        transient: !0,
        factory: function() {
            return this.NullDAO.create()
        },
        postSet: function(oldDAO, newDAO) {
            this.daoListeners_.length && (oldDAO && oldDAO.unlisten(this.relay),
            newDAO.listen(this.relay),
            this.notify_("reset", []))
        }
    }, {
        model_: "ModelProperty",
        name: "model",
        type: "Model",
        required: !1,
        defaultValueFn: function() {
            return this.delegate.model
        }
    }],
    methods: [function put(value, sink) {
        this.delegate.put(value, sink)
    }
    , function remove(query, sink) {
        this.delegate.remove(query, sink)
    }
    , function removeAll() {
        return this.delegate.removeAll.apply(this.delegate, arguments)
    }
    , function find(key, sink) {
        this.delegate.find(key, sink)
    }
    , function select(sink, options) {
        return this.delegate.select(sink, options)
    }
    , function listen(sink, options) {
        !this.daoListeners_.length && this.delegate && this.delegate.listen(this.relay),
        this.SUPER(sink, options)
    }
    , function unlisten(sink) {
        this.SUPER(sink),
        0 === this.daoListeners_.length && this.delegate && this.delegate.unlisten(this.relay)
    }
    , function toString() {
        return this.name_ + "(" + this.delegate + ")"
    }
    ]
}),
CLASS({
    package: "foam.dao",
    name: "NullDAO",
    methods: [function put(obj, sink) {
        sink && sink.put && sink.put(obj)
    }
    , function remove(obj, sink) {
        sink && sink.remove && sink.remove(obj)
    }
    , function select(sink) {
        return sink && sink.eof && sink.eof(),
        aconstant(sink || [].sink)
    }
    , function find(q, sink) {
        sink && sink.error && sink.error("find", q)
    }
    , function listen() {}
    , function removeAll() {}
    , function unlisten() {}
    , function pipe() {}
    , function where() {
        return this
    }
    , function limit() {
        return this
    }
    , function skip() {
        return this
    }
    , function orderBy() {
        return this
    }
    ],
    help: "A DAO that stores nothing and does nothing."
}),
CLASS({
    package: "foam.apps.calc",
    name: "Num",
    extends: "Action",
    properties: [{
        name: "n"
    }, {
        name: "name",
        defaultValueFn: function() {
            return this.n.toString()
        }
    }, {
        name: "keyboardShortcuts",
        defaultValueFn: function() {
            return [this.n + ""]
        },
        factory: null
    }, {
        name: "code",
        defaultValue: function(_, action) {
            var action = action.n
            this.editable ? ("0" != this.a2 || action) && (17 <= this.a2.length || (this.a2 = "0" == this.a2 ? action : this.a2.toString() + action)) : (this.push(action),
            this.editable = !0)
        }
    }]
}),
CLASS({
    package: "foam.apps.calc",
    name: "Binary",
    extends: "foam.apps.calc.Unary",
    properties: [{
        name: "code",
        defaultValue: function(_, action) {
            "" == this.a2 ? this.replace(action.f) : (this.op != this.model_.DEFAULT_OP && this.equals(),
            this.push("", action.f),
            this.editable = !0)
        }
    }, {
        name: "label",
        defaultValueFn: function() {
            return this.name
        }
    }],
    methods: [function init() {
        this.SUPER(),
        this.f.unary = !1,
        this.f.binary = !0
    }
    ]
}),
CLASS({
    package: "foam.apps.calc",
    name: "Unary",
    extends: "Action",
    properties: [{
        name: "f"
    }, {
        name: "longName",
        defaultValueFn: function() {
            return this.name
        }
    }, {
        name: "translationHint",
        defaultValueFn: function() {
            return this.longName ? 'short form for mathematical function: "' + this.longName + '"' : ""
        }
    }, {
        name: "code",
        defaultValue: function(_, action) {
            this.op = action.f,
            this.push(action.f.call(this, this.a2)),
            this.editable = !1
        }
    }, {
        name: "label",
        defaultValueFn: function() {
            return this.name
        }
    }],
    methods: [function init() {
        this.SUPER(),
        this.f.label = '<span aria-label="' + this.speechLabel + '">' + this.label + "</span>",
        this.f.speechLabel = this.speechLabel,
        this.f.unary = !0
    }
    ]
}),
CLASS({
    package: "foam.ui",
    name: "FoamTagView",
    extends: "foam.ui.View",
    requires: ["foam.html.Element", "foam.ui.View", "foam.ui.DetailView"],
    imports: ["document"],
    properties: [{
        name: "element"
    }, {
        name: "className",
        defaultValue: "foam-tag"
    }],
    methods: [function init() {
        this.SUPER(),
        this.Element.isInstance(this.element) || this.install()
    }
    , function install() {
        var e = this.element
          , models = []
          , style = e.getAttribute("style")
          , modelName = e.getAttribute("model")
          , viewName = e.getAttribute("view")
          , onInit = e.getAttribute("oninit")
        modelName && models.push(this.X.arequire(modelName)),
        viewName && models.push(this.X.arequire(viewName)),
        aseq(apar.apply(null, models), function(ret) {
            if (this.holder()) {
                var model = this.X.lookup(modelName)
                if (!model)
                    return this.error("Unknown Model: ", modelName),
                    undefined
                model.getPrototype()
                var obj = model.create(null, this.X), model, viewModel, model, a, a
                obj.fromElement(e),
                obj.model_.DATA && this.hasOwnProperty("data") && (obj.data = this.data),
                model = viewName ? this.X.lookup(viewName).create({
                    model: model,
                    data: obj
                }, obj.Y) : obj.toHTML ? obj : obj.toView_ ? obj.toView_() : obj.toE ? obj.toE(obj.Y) : (a = !(a = this.element.getAttribute("showActions")) || a.equalsIC("y") || a.equalsIC("yes") || a.equalsIC("true") || a.equalsIC("t"),
                this.X.lookup("foam.ui.DetailView").create({
                    model: model,
                    data: obj,
                    showActions: a
                }, obj.Y)),
                e.id && (this.document.FOAM_OBJECTS[e.id] = obj),
                obj.view_ = model,
                this.holder().outerHTML = model.toHTML(),
                style && model.$.setAttribute("style", style),
                model.initHTML(),
                onInit && aeval("function() { " + onInit + " }")(function(f) {
                    f.call(obj)
                })
            }
        }
        .bind(this))()
    }
    , function holder() {
        return this.Element.isInstance(this.element) ? this.$ : this.element
    }
    , function error(msg) {
        console.error(msg),
        this.holder.innerHTML = msg
    }
    , function initHTML() {
        this.install()
    }
    ]
}),
CLASS({
    package: "foam.html",
    name: "Element",
    properties: [{
        name: "id"
    }, {
        name: "nodeName"
    }, {
        name: "attributeMap_",
        transient: !0,
        factory: function() {
            return {}
        }
    }, {
        name: "attributes",
        factory: function() {
            return []
        },
        postSet: function(_, attrs) {
            for (var i = 0; i < attrs.length; i++)
                this.attributeMap_[attrs[i].name] = attrs[i]
        }
    }, {
        name: "childNodes",
        factory: function() {
            return []
        }
    }, {
        name: "children",
        transient: !0,
        getter: function() {
            return this.childNodes.filter(function(c) {
                return "string" != typeof c
            })
        }
    }, {
        name: "outerHTML",
        transient: !0,
        getter: function() {
            var out = "<" + this.nodeName, value
            for (key in this.id && (out += ' id="' + this.id + '"'),
            this.attributeMap_) {
                out += null == this.attributeMap_[key].value ? " " + key : " " + key + '="' + this.attributeMap_[key].value + '"'
            }
            return this.ILLEGAL_CLOSE_TAGS[this.nodeName] || this.OPTIONAL_CLOSE_TAGS[this.nodeName] && !this.childNodes.length || (out = (out = out + ">" + this.innerHTML) + "</" + this.nodeName),
            out += ">"
        }
    }, {
        name: "innerHTML",
        transient: !0,
        getter: function() {
            for (var out = "", i = 0; i < this.childNodes.length; i++)
                out += this.childNodes[i].toString()
            return out
        }
    }],
    constants: [{
        name: "OPTIONAL_CLOSE_TAGS",
        value: {
            HTML: !0,
            HEAD: !0,
            BODY: !0,
            P: !0,
            DT: !0,
            DD: !0,
            LI: !0,
            OPTION: !0,
            THEAD: !0,
            TH: !0,
            TBODY: !0,
            TR: !0,
            TD: !0,
            TFOOT: !0,
            COLGROUP: !0
        }
    }, {
        name: "ILLEGAL_CLOSE_TAGS",
        value: {
            IMG: !0,
            INPUT: !0,
            BR: !0,
            HR: !0,
            FRAME: !0,
            AREA: !0,
            BASE: !0,
            BASEFONT: !0,
            COL: !0,
            ISINDEX: !0,
            LINK: !0,
            META: !0,
            PARAM: !0
        }
    }],
    methods: [function setAttribute(name, value) {
        var attr = this.getAttributeNode(name)
        attr ? attr.value = value : (this.attributes.push(attr = {
            name: name,
            value: value
        }),
        this.attributeMap_[name] = attr)
    }
    , function getAttributeNode(name) {
        return this.attributeMap_[name]
    }
    , function getAttribute(name) {
        var name = this.getAttributeNode(name)
        return name && name.value
    }
    , function appendChild(c) {
        this.childNodes.push(c)
    }
    , function removeChild(c) {
        for (var i = 0; i < this.childNodes.length; ++i)
            if (this.childNodes[i] === c) {
                this.childNodes.splice(i, 1)
                break
            }
    }
    , function toString() {
        return this.outerHTML
    }
    ]
}),
CLASS({
    package: "foam.ui",
    name: "DetailView",
    extends: "foam.ui.View",
    requires: ["Property", "foam.ui.TextFieldView", "foam.ui.IntFieldView", "foam.ui.FloatFieldView", "foam.ui.DAOController"],
    exports: ["propertyViewProperty"],
    properties: [{
        name: "className",
        defaultValue: "detailView"
    }, {
        name: "data",
        preSet: function(old, nu) {
            return nu.model_ && (this.model = nu.model_),
            nu
        }
    }, {
        name: "model",
        postSet: function(_, model) {
            console.assert(Model.isInstance(model), "Invalid model specified for " + this.name_)
        }
    }, {
        name: "title",
        defaultValueFn: function() {
            return this.model.label
        }
    }, {
        model_: "StringProperty",
        name: "mode",
        type: "String",
        defaultValue: "read-write"
    }, {
        model_: "BooleanProperty",
        name: "showRelationships",
        type: "Boolean",
        defaultValue: !1
    }, {
        name: "propertyViewProperty",
        type: "Property",
        defaultValueFn: function() {
            return this.Property.DETAIL_VIEW
        }
    }],
    methods: [function shouldDestroy(old, nu) {
        return !(old && old.model_ && nu && nu.model_) || old.model_ !== nu.model_
    }
    , function generateContent() {
        this.$ && (this.$.outerHTML = this.toHTML(),
        this.initHTML())
    }
    , function titleHTML() {
        var title = this.title
        return title ? '<tr><td colspan="2" class="heading">' + title + "</td></tr>" : ""
    }
    , function startForm() {
        return "<table>"
    }
    , function endForm() {
        return "</table>"
    }
    , function startColumns() {
        return "<tr><td colspan=2><table valign=top><tr><td valign=top><table>"
    }
    , function nextColumn() {
        return "</table></td><td valign=top><table valign=top>"
    }
    , function endColumns() {
        return "</table></td></tr></table></td></tr>"
    }
    , function rowToHTML(prop, view) {
        var str = ""
        return prop.detailViewPreRow && (str += prop.detailViewPreRow(this)),
        str += '<tr class="detail-' + prop.name + '">',
        str = this.DAOController.isInstance(view) ? (str += "<td colspan=2><div class=detailArrayLabel>" + prop.label + "</div>") + view.toHTML() + "</td>" : (str = str + ("<td class='label'>" + prop.label) + "</td><td>") + view.toHTML() + "</td>",
        str += "</tr>",
        prop.detailViewPostRow && (str += prop.detailViewPostRow(this)),
        str
    }
    , function toHTML() {
        if (!this.data)
            return '<span id="' + this.id + '"></span>'
        if (this.model)
            return (this.model.getPrototype().toDetailHTML || this.defaultToHTML).call(this)
        throw "DetailView: either 'data' or 'model' must be specified."
    }
    , function getDefaultProperties() {
        return this.model.getRuntimeProperties()
    }
    , function defaultToHTML() {
        this.children = []
        for (var model = this.model, str = "", properties = (str = (str = (str += '<div id="' + this.id + '" ' + this.cssClassAttr() + '" name="form">') + this.startForm()) + this.titleHTML(),
        this.getDefaultProperties()), i = 0, view; i < properties.length; i++) {
            var prop = properties[i], view
            prop.hidden || (view = this.createView(prop),
            this.addDataChild(view),
            str += this.rowToHTML(prop, view))
        }
        return str += this.endForm(),
        this.showRelationships && (view = this.X.lookup("foam.ui.RelationshipsView").create({
            data: this.data
        }),
        this.addDataChild(view),
        str += view.toHTML()),
        str += "</div>"
    }
    ],
    templates: [{
        name: "CSS",
        code: ConstantTemplate(".detailView{border:solid 2px #dddddd;background:#fafafa;display:table}.detailView .heading{color:black;float:left;font-size:16px;margin-bottom:8px;padding:2px}.detailView .propertyLabel{font-size:14px;display:block;font-weight:bold;text-align:right;float:left}.detailView input{font-size:12px;padding:4px 2px;border:solid 1px #aacfe4;margin:2px 0 0px 10px}.detailView textarea{float:left;font-size:12px;padding:4px 2px;border:solid 1px #aacfe4;margin:2px 0 0px 10px;width:98%;overflow:auto}.detailView select{font-size:12px;padding:4px 2px;border:solid 1px #aacfe4;margin:2px 0 0px 10px}.detailView .label{color:#444;font-size:smaller;padding-left:6px;padding-top:8px;vertical-align:top}.detailArrayLabel{font-size:medium}.detailArrayLabel .foamTable{margin:1px}"),
        language: "css"
    }]
}),
CLASS({
    package: "foam.ui",
    name: "TextFieldView",
    label: "Text Field",
    extends: "foam.ui.SimpleView",
    requires: ["foam.ui.AutocompleteView"],
    properties: [{
        model_: "StringProperty",
        name: "name",
        type: "String",
        defaultValue: "field"
    }, {
        model_: "IntProperty",
        name: "displayWidth",
        type: "Int",
        defaultValue: 30
    }, {
        model_: "IntProperty",
        name: "displayHeight",
        type: "Int",
        defaultValue: 1
    }, {
        model_: "StringProperty",
        name: "type",
        type: "String",
        defaultValue: "text"
    }, {
        model_: "StringProperty",
        name: "placeholder",
        type: "String",
        defaultValue: ""
    }, {
        model_: "BooleanProperty",
        name: "onKeyMode",
        type: "Boolean",
        getter: function() {
            return this.updateMode === this.EACH_KEYSTROKE
        },
        setter: function(nu) {
            this.updateMode = nu ? this.EACH_KEYSTROKE : this.DONE_EDITING
        },
        help: "If true, value is updated on each keystroke."
    }, {
        model_: "foam.core.types.StringEnumProperty",
        name: "updateMode",
        defaultValue: "DONE_EDITING",
        help: "Controls when the real .data is updated: on every keystroke, when the user presses enter or blurs the box, or on enter only.",
        choices: [["DONE_EDITING", "Done editing"], ["EACH_KEYSTROKE", "Every keystroke"], ["ENTER_ONLY", "Enter only"]]
    }, {
        model_: "BooleanProperty",
        name: "escapeHTML",
        type: "Boolean",
        help: "If true, HTML content is escaped in display mode.",
        defaultValue: !0
    }, {
        model_: "StringProperty",
        name: "mode",
        type: "String",
        defaultValue: "read-write",
        view: {
            factory_: "foam.ui.ChoiceView",
            choices: ["read-only", "read-write", "final"]
        }
    }, {
        model_: "BooleanProperty",
        name: "required",
        type: "Boolean"
    }, {
        model_: "StringProperty",
        name: "pattern",
        type: "String"
    }, {
        name: "domValue",
        visibility: "hidden",
        hidden: !0
    }, {
        name: "data"
    }, {
        model_: "StringProperty",
        name: "readWriteTagName",
        type: "String",
        visibility: "hidden",
        hidden: !0,
        defaultValueFn: function() {
            return 1 === this.displayHeight ? "input" : "textarea"
        }
    }, {
        model_: "BooleanProperty",
        name: "autocomplete",
        type: "Boolean",
        defaultValue: !0
    }, {
        name: "autocompleter"
    }, {
        name: "autocompleteView"
    }],
    constants: [{
        name: "ESCAPE",
        value: ["escape"]
    }, {
        name: "DONE_EDITING",
        value: "DONE_EDITING"
    }, {
        name: "EACH_KEYSTROKE",
        value: "EACH_KEYSTROKE"
    }, {
        name: "ENTER_ONLY",
        value: "ENTER_ONLY"
    }],
    methods: [function toHTML() {
        return "read-write" === this.mode ? this.toReadWriteHTML() : this.toReadOnlyHTML()
    }
    , function toReadWriteHTML() {
        var str = "<" + this.readWriteTagName + ' id="' + this.id + '"'
        return str += ' type="' + this.type + '" ' + this.cssClassAttr(),
        this.on("click", this.onClick, this.id),
        str += "input" === this.readWriteTagName ? ' size="' + this.displayWidth + '"' : ' rows="' + this.displayHeight + '" cols="' + this.displayWidth + '"',
        this.required && (str += " required"),
        this.pattern && (str += ' pattern="' + this.pattern + '"'),
        str = (str = (str += this.extraAttributes()) + (' name="' + this.name + '">')) + ("</" + this.readWriteTagName + ">")
    }
    , function extraAttributes() {
        return ""
    }
    , function toReadOnlyHTML() {
        var self = this
        return this.setClass("placeholder", function() {
            return "" === self.data
        }, this.id),
        "<" + this.tagName + ' id="' + this.id + '"' + this.cssClassAttr() + ' name="' + this.name + '"></' + this.tagName + ">"
    }
    , function setupAutocomplete() {
        var view
        this.autocomplete && this.autocompleter && (view = this.autocompleteView = this.AutocompleteView.create({
            autocompleter: this.autocompleter,
            target: this
        }),
        this.bindAutocompleteEvents(view))
    }
    , function onAutocomplete(data) {
        this.data = data
    }
    , function bindAutocompleteEvents(view) {
        this.$.addEventListener("blur", function() {
            view.publish("blur")
        }),
        this.$.addEventListener("input", function() {
            view.autocomplete(this.textToValue(this.$.value))
        }
        .bind(this)),
        this.$.addEventListener("focus", function() {
            view.autocomplete(this.textToValue(this.$.value))
        }
        .bind(this))
    }
    , function initHTML() {
        this.$ && (this.SUPER(),
        "read-write" === this.mode ? (this.placeholder && (this.$.placeholder = this.placeholder),
        this.updateMode === this.EACH_KEYSTROKE ? this.domValue = DomValue.create(this.$, "input") : this.updateMode === this.DONE_EDITING ? this.domValue = DomValue.create(this.$, "change") : this.domValue = this.OnEnterValue.create({
            element: this.$
        }),
        Events.relate(this.data$, this.domValue, this.valueToText.bind(this), this.textToValue.bind(this), this.updateMode === this.EACH_KEYSTROKE),
        this.updateMode === this.EACH_KEYSTROKE && this.$.addEventListener("blur", this.onBlur),
        this.$.addEventListener("keydown", this.onKeyDown),
        this.$.addEventListener("keypress", this.onKeyPress),
        this.setupAutocomplete()) : (this.domValue = DomValue.create(this.$, "undefined", this.escapeHTML ? "textContent" : "innerHTML"),
        Events.map(this.data$, this.domValue, this.valueToText.bind(this))))
    }
    , function textToValue(text) {
        return text
    }
    , function valueToText(value) {
        return "read-only" === this.mode && "" === value ? this.placeholder : value
    }
    , function destroy(isParentDestroyed) {
        this.SUPER(isParentDestroyed),
        Events.unlink(this.domValue, this.data$)
    }
    ],
    listeners: [{
        name: "onKeyDown",
        code: function(e) {
            27 == e.keyCode ? (this.domValue.set(this.data),
            this.publish(this.ESCAPE)) : this.publish(["keydown"], e)
        }
    }, {
        name: "onKeyPress",
        code: function(e) {
            e.stopPropagation()
        }
    }, {
        name: "onBlur",
        code: function(e) {
            this.domValue.get() !== this.data && this.domValue.set(this.data)
        }
    }, {
        name: "onClick",
        code: function(e) {
            this.$ && this.$.focus()
        }
    }],
    models: [{
        package: "foam.ui.TextFieldView",
        name: "OnEnterValue",
        properties: [{
            name: "element"
        }, {
            name: "listeners",
            factory: function() {
                return []
            }
        }],
        methods: [function get() {
            return this.element.value
        }
        , function set(value) {
            this.get() !== value && (this.element.value = value)
        }
        , function addListener(listener) {
            listener && (0 === this.listeners.length && this.element.addEventListener("keydown", this.onKeyDown),
            this.listeners.push(listener))
        }
        , function removeListener(listener) {
            var index
            0 <= this.listeners.indexOf(listener) && this.listeners.splice(i, 1)
        }
        , function fireListeners(e) {
            for (var i = 0; i < this.listeners.length; i++)
                this.listeners[i](e)
        }
        ],
        listeners: [{
            name: "onKeyDown",
            code: function(e) {
                13 === e.keyCode && this.fireListeners(e)
            }
        }]
    }]
}),
CLASS({
    package: "foam.ui",
    name: "AutocompleteView",
    extends: "foam.ui.PopupView",
    requires: ["foam.ui.ChoiceListView"],
    properties: [{
        name: "closeTimeout"
    }, {
        name: "autocompleter"
    }, {
        name: "completer"
    }, {
        name: "current"
    }, {
        model_: "IntProperty",
        name: "closeTime",
        type: "Int",
        units: "ms",
        help: "Time to delay the actual close on a .close call.",
        defaultValue: 200
    }, {
        name: "view",
        postSet: function(prev, v) {
            prev && (prev.data$.removeListener(this.complete),
            prev.choices$.removeListener(this.choicesUpdate)),
            v.data$.addListener(this.complete),
            v.choices$.addListener(this.choicesUpdate)
        }
    }, {
        name: "target",
        postSet: function(prev, v) {
            prev && prev.unsubscribe(["keydown"], this.onKeyDown),
            v.subscribe(["keydown"], this.onKeyDown)
        }
    }, {
        name: "maxHeight",
        defaultValue: 400
    }, {
        name: "className",
        defaultValue: "autocompletePopup"
    }],
    methods: [function autocomplete(partial) {
        var proto
        this.completer || (proto = this.X.lookup(this.autocompleter),
        this.completer = proto.create(null, this.Y)),
        this.view || (this.view = this.makeView()),
        this.current = partial,
        this.open(this.target),
        this.completer.autocomplete(partial)
    }
    , function makeView() {
        return this.ChoiceListView.create({
            dao: this.completer.autocompleteDao$Proxy,
            extraClassName: "autocomplete",
            orientation: "vertical",
            mode: "final",
            objToChoice: this.completer.f,
            useSelection: !0
        }, this.Y)
    }
    , function init(args) {
        this.SUPER(args),
        this.subscribe("blur", function() {
            this.close()
        }
        .bind(this))
    }
    , function open(e, opt_delay) {
        if (this.closeTimeout && (this.X.clearTimeout(this.closeTimeout),
        this.closeTimeout = 0),
        this.$)
            return this.position(this.$.firstElementChild, e.$ || e),
            undefined
        var e = e.$ || e
          , document = e.ownerDocument
          , div = (console.assert(this.X.document === document, "X.document is not global document"),
        document.createElement("div"))
          , document = document.defaultView
        console.assert(this.X.window === document, "X.window is not global window"),
        e.insertAdjacentHTML("afterend", this.toHTML().trim()),
        this.position(this.$.firstElementChild, e),
        this.initHTML()
    }
    , function close(opt_now) {
        if (opt_now)
            return this.closeTimeout && (this.X.clearTimeout(this.closeTimeout),
            this.closeTimeout = 0),
            this.SUPER(),
            undefined
        var realClose, self
        this.closeTimeout || (realClose = this.SUPER,
        (self = this).closeTimeout = this.X.setTimeout(function() {
            self.closeTimeout = 0,
            realClose.call(self)
        }, this.closeTime))
    }
    , function position(div, parentNode) {
        var document = parentNode.ownerDocument, pos = findPageXY(parentNode), pageWH;
        [document.firstElementChild.offsetWidth, document.firstElementChild.offsetHeight][1] - (pos[1] + parentNode.offsetHeight) < (this.height || this.maxHeight || 400) && (div.style.bottom = parentNode.offsetHeight,
        document.defaultView.innerHeight - pos[1]),
        pos[2].offsetWidth - pos[0] < 600 ? div.style.left = 600 - pos[2].offsetWidth : div.style.left = -parentNode.offsetWidth,
        this.width && (div.style.width = this.width + "px"),
        this.height && (div.style.height = this.height + "px"),
        this.maxWidth && (div.style.maxWidth = this.maxWidth + "px",
        div.style.overflowX = "auto"),
        this.maxHeight && (div.style.maxHeight = this.maxHeight + "px",
        div.style.overflowY = "auto")
    }
    ],
    listeners: [{
        name: "onKeyDown",
        code: function(_, __, e) {
            this.view && (38 === e.keyCode ? (this.view.index--,
            this.view.scrollToSelection(this.$),
            e.preventDefault()) : 40 === e.keyCode ? (this.view.index++,
            this.view.scrollToSelection(this.$),
            e.preventDefault()) : 13 === e.keyCode && (this.view.commit(),
            e.preventDefault()))
        }
    }, {
        name: "complete",
        code: function() {
            this.target.onAutocomplete(this.view.data),
            this.view = this.makeView(),
            this.close(!0)
        }
    }, {
        name: "choicesUpdate",
        code: function() {
            this.view && (0 === this.view.choices.length || 1 === this.view.choices.length && this.view.choices[0][1] === this.current) && this.close(!0)
        }
    }],
    templates: [{
        name: "toHTML",
        code: function(opt_out) {
            var self = this
              , X = this.X
              , Y = this.Y
              , opt_out = opt_out || TOC(this)
            return opt_out('\n  <span id="', this.id, '" style="position:relative"><div ', this.cssClassAttr(), ' style="position:absolute">', this.view, "</div></span>\n    "),
            opt_out.toString()
        },
        language: "html"
    }],
    help: "Default autocomplete popup."
}),
CLASS({
    package: "foam.ui",
    name: "ChoiceListView",
    extends: "foam.ui.AbstractChoiceView",
    properties: [{
        name: "orientation",
        view: {
            factory_: "foam.ui.ChoiceView",
            choices: [["horizontal", "Horizontal"], ["vertical", "Vertical"]]
        },
        defaultValue: "horizontal",
        postSet: function(old, nu) {
            this.$ && (DOM.setClass(this.$, old, !1),
            DOM.setClass(this.$, nu))
        }
    }, {
        name: "className",
        defaultValueFn: function() {
            return "foamChoiceListView " + this.orientation
        }
    }, {
        name: "tagName",
        defaultValue: "ul"
    }, {
        name: "innerTagName",
        defaultValue: "li"
    }],
    methods: [function init() {
        this.SUPER(),
        this.index$.addListener(this.updateSelected),
        this.choices$.addListener(this.updateSelected)
    }
    , function choiceToHTML(id, choice) {
        return "<" + this.innerTagName + ' id="' + id + '" class="choice">' + choice[1] + "</" + this.innerTagName + ">"
    }
    , function toInnerHTML() {
        for (var out = [], i = 0; i < this.choices.length; i++) {
            var choice = this.choices[i]
              , id = this.nextID()
            this.on("click", function(index) {
                this.choice = this.choices[index]
            }
            .bind(this, i), id),
            out.push(this.choiceToHTML(id, choice))
        }
        return out.join("")
    }
    , function initInnerHTML() {
        this.SUPER(),
        this.updateSelected()
    }
    , function scrollToSelection() {
        var e = this.$ && this.$.children[this.index]
        if (e) {
            for (var parent = e.parentElement; parent; ) {
                var overflow = this.X.window.getComputedStyle(parent).overflowY
                if ("scroll" === overflow || "auto" === overflow)
                    break
                parent = parent.parentElement
            }
            parent = parent || this.X.window,
            e.offsetTop < parent.scrollTop ? parent.scrollTop = e.offsetTop : e.offsetTop + e.offsetHeight >= parent.scrollTop + parent.offsetHeight && (parent.scrollTop = e.offsetTop + e.offsetHeight - parent.offsetHeight)
        }
    }
    ],
    listeners: [{
        name: "updateSelected",
        code: function() {
            if (this.$ && this.$.children)
                for (var i = 0; i < this.$.children.length; i++) {
                    var c = this.$.children[i]
                    DOM.setClass(c, "selected", i === this.index)
                }
        }
    }],
    templates: [{
        name: "CSS",
        code: ConstantTemplate(".foamChoiceListView{list-style-type:none}.foamChoiceListView .selected{font-weight:bold}.foamChoiceListView.vertical{padding:0}.foamChoiceListView.vertical .choice{margin:4px}.foamChoiceListView.horizontal{padding:0}.foamChoiceListView.horizontal .choice{display:inline;margin:12px}"),
        language: "css"
    }]
}),
CLASS({
    package: "foam.ui",
    name: "AbstractChoiceView",
    extends: "foam.ui.View",
    properties: [{
        model_: "BooleanProperty",
        name: "autoSetData",
        type: "Boolean",
        help: "If true, this.data is set when choices update and the current data is not one of the choices.",
        defaultValue: !0
    }, {
        name: "prop",
        visibility: "hidden",
        hidden: !0
    }, {
        name: "label",
        help: 'The user-visible label for the ChoiceView. Not to be confused with $$DOC{ref:".text"}, the name of the currently selected choice.'
    }, {
        name: "text",
        postSet: function(_, d) {
            for (var i = 0; i < this.choices.length; i++)
                if (this.choices[i][1] === d)
                    return this.index !== i && (this.index = i),
                    undefined
        },
        help: "The user-visible text of the current choice (ie. [value, text] -> text)."
    }, {
        name: "choice",
        getter: function() {
            for (var value = this.data, i = 0; i < this.choices.length; i++) {
                var choice = this.choices[i]
                if (value === choice[0])
                    return choice
            }
            0
        },
        setter: function(choice) {
            var oldValue = this.choice
            this.data = choice[0],
            this.text = choice[1],
            this.propertyChange("choice", oldValue, this.choice)
        },
        help: "The current choice (ie. [value, text])."
    }, {
        name: "choices",
        factory: function() {
            return []
        },
        preSet: function(_, a) {
            if ("object" == typeof a && !Array.isArray(a)) {
                var out = [], key
                for (key in a)
                    a.hasOwnProperty(key) && out.push([key, a[key]])
                return out
            }
            a = a.clone()
            for (var i = 0; i < a.length; i++)
                Array.isArray(a[i]) || (a[i] = [a[i], a[i]])
            return a
        },
        postSet: function(oldValue, newValue) {
            for (var value = this.data, i = 0; i < newValue.length; i++) {
                var choice = newValue[i]
                if (value === choice[0]) {
                    this.useSelection ? this.index = i : this.choice = choice
                    break
                }
            }
            this.autoSetData && i === newValue.length && (this.useSelection ? this.index = 0 : this.data = newValue.length ? newValue[0][0] : void 0)
            var labelsChanged = !0
            if ((oldValue && oldValue.length) == (newValue && newValue.length))
                for (var labelsChanged = !1, i = 0; i < oldValue.length; ++i)
                    if (!equals(oldValue[i][1], newValue[i][1])) {
                        labelsChanged = !0
                        break
                    }
            labelsChanged && this.updateHTML()
        }
    }, {
        model_: "IntProperty",
        name: "index",
        type: "Int",
        transient: !0,
        preSet: function(_, i) {
            return i < 0 || 0 == this.choices.length ? 0 : i >= this.choices.length ? this.choices.length - 1 : i
        },
        postSet: function(_, i) {
            this.useSelection || this.choices.length && this.data !== this.choices[i][0] && (this.data = this.choices[i][0])
        },
        help: "The index of the current choice.",
        defaultValue: -1
    }, {
        model_: "FunctionProperty",
        name: "objToChoice",
        type: "Function",
        help: "A Function which adapts an object from the DAO to a [key, value, ...] choice."
    }, {
        model_: "BooleanProperty",
        name: "useSelection",
        type: "Boolean",
        help: "When set, data and choice do not update until an entry is firmly selected"
    }, {
        model_: "foam.core.types.DAOProperty",
        name: "dao",
        onDAOUpdate: "onDAOUpdate"
    }, {
        name: "data",
        postSet: function(old, nu) {
            for (var i = 0; i < this.choices.length; i++)
                if (this.choices[i][0] === nu)
                    return this.index !== i && (this.text = this.choices[i][1],
                    this.index = i),
                    undefined
            nu && this.choices.length && console.warn("ChoiceView data set to invalid choice: ", nu)
        }
    }],
    methods: [function initHTML() {
        this.SUPER(),
        this.dao = this.dao
    }
    , function findChoiceIC(name) {
        name = name.toLowerCase()
        for (var i = 0; i < this.choices.length; i++)
            if (this.choices[i][1].toLowerCase() == name)
                return this.choices[i]
    }
    , function commit() {
        this.useSelection && this.choices[this.index] && (this.choice = this.choices[this.index])
    }
    ],
    listeners: [{
        name: "onDAOUpdate",
        code: function() {
            this.dao.select(MAP(this.objToChoice))(function(map) {
                this.choices = map.arg2
            }
            .bind(this))
        },
        isFramed: !0
    }]
}),
CLASS({
    package: "foam.ui",
    name: "PopupView",
    extends: "foam.ui.SimpleView",
    properties: [{
        name: "view"
    }, {
        name: "x"
    }, {
        name: "y"
    }, {
        name: "width",
        defaultValue: ""
    }, {
        name: "maxWidth",
        defaultValue: ""
    }, {
        name: "maxHeight",
        defaultValue: ""
    }, {
        name: "height",
        defaultValue: ""
    }],
    constants: [{
        name: "CLOSED_TOPIC",
        value: ["closed"]
    }],
    methods: [function open() {
        var document, div
        this.$ || ((div = (document = this.X.document).createElement("div")).style.left = this.x + "px",
        div.style.top = this.y + "px",
        this.width && (div.style.width = this.width + "px"),
        this.height && (div.style.height = this.height + "px"),
        this.maxWidth && (div.style.maxWidth = this.maxWidth + "px"),
        this.maxHeight && (div.style.maxHeight = this.maxHeight + "px"),
        div.style.position = "absolute",
        div.id = this.id,
        div.innerHTML = this.view.toHTML(),
        document.body.appendChild(div),
        this.view.initHTML())
    }
    , function openOn(parent) {
        var self, document, bg, div
        this.$ || (document = (self = this).X.document,
        bg = document.createElement("div"),
        div = document.createElement("div"),
        bg.style.width = bg.style.height = "10000px",
        bg.style.opacity = 0,
        bg.style.position = "fixed",
        bg.style.top = "0",
        bg.style.zIndex = 998,
        div.style.zIndex = 999,
        this.y || (this.y = (parent.clientHeight - this.height) / 2),
        this.x || (this.x = (parent.clientWidth - this.width) / 2),
        div.className = "popup",
        div.style.left = this.x + "px",
        div.style.top = this.y + "px",
        this.width && (div.style.width = this.width + "px"),
        this.height && (div.style.height = this.height + "px"),
        this.maxWidth && (div.style.maxWidth = this.maxWidth + "px"),
        this.maxHeight && (div.style.maxHeight = this.maxHeight + "px"),
        parent.style.position = "relative",
        div.id = this.id,
        div.innerHTML = this.view.toHTML(),
        document.body.appendChild(bg),
        bg.addEventListener("click", function() {
            div.remove(),
            bg.remove(),
            self.destroy(),
            self.publish(self.CLOSED_TOPIC)
        }),
        parent.appendChild(div),
        this.view.initHTML())
    }
    , function close() {
        this.$ && this.$.remove()
    }
    , function destroy(isParentDestroyed) {
        this.SUPER(isParentDestroyed),
        this.close(),
        this.view.destroy()
    }
    ],
    templates: [{
        name: "CSS",
        code: ConstantTemplate(".popup{background:#999;-webkit-box-shadow:3px 3px 6px 0 gray;box-shadow:3px 3px 6px 0 gray;color:white;font-size:18px;opacity:0.9;padding:20px;position:absolute;box-sizing:border-box}"),
        language: "css"
    }]
}),
CLASS({
    package: "foam.core.types",
    name: "StringEnumProperty",
    extends: "StringProperty",
    traits: ["foam.core.types.EnumPropertyTrait"]
}),
CLASS({
    package: "foam.core.types",
    name: "EnumPropertyTrait",
    properties: [{
        model_: "ArrayProperty",
        name: "choices",
        type: "Array",
        required: !0,
        preSet: function(_, a) {
            return a.map(function(c) {
                return Array.isArray(c) ? c : [c, c]
            })
        },
        help: "Array of [value, label] choices."
    }, {
        name: "view",
        defaultValue: "foam.ui.ChoiceView"
    }, {
        name: "toPropertyE",
        defaultValue: function(X) {
            return X.lookup("foam.u2.tag.Select").create({
                prop: this,
                choices: this.choices
            }, X)
        }
    }],
    methods: [function choiceLabel(value) {
        var vl = this.choices.filter(function(vl) {
            return vl[0] === value
        })[0]
        return vl ? vl[1] : ""
    }
    , function choiceValue(label) {
        var vl = this.choices.filter(function(vl) {
            return vl[1] === label
        })[0]
        return vl ? vl[0] : ""
    }
    ]
}),
CLASS({
    package: "foam.ui",
    name: "IntFieldView",
    extends: "foam.ui.AbstractNumberFieldView",
    methods: [function textToValue(text) {
        return parseInt(text) || "0"
    }
    , function valueToText(value) {
        return value || "0"
    }
    ]
}),
CLASS({
    package: "foam.ui",
    name: "AbstractNumberFieldView",
    extends: "foam.ui.TextFieldView",
    properties: [{
        name: "type",
        defaultValue: "number"
    }, {
        name: "step"
    }],
    methods: [function extraAttributes() {
        return this.step ? ' step="' + this.step + '"' : ""
    }
    ]
}),
CLASS({
    package: "foam.ui",
    name: "FloatFieldView",
    extends: "foam.ui.AbstractNumberFieldView",
    properties: [{
        name: "precision",
        defaultValue: ""
    }],
    methods: [function formatNumber(val) {
        if (!val)
            return "0"
        for (var i = (val = val.toFixed(this.precision)).length - 1; 0 < i && "0" === val.charAt(i); i--)
            ;
        return val.substring(0, "." === val.charAt(i) ? i : i + 1)
    }
    , function valueToText(val) {
        return this.hasOwnProperty("precision") ? this.formatNumber(val) : "" + val
    }
    , function textToValue(text) {
        return parseFloat(text) || 0
    }
    ]
}),
CLASS({
    package: "foam.ui",
    name: "DAOController",
    label: "DAO Controller",
    extends: "foam.ui.View",
    properties: [{
        model_: "ModelProperty",
        name: "model",
        type: "Model"
    }, {
        name: "subType",
        setter: function(v) {
            this.model = v
        }
    }, {
        name: "dao",
        view: "foam.ui.TableView"
    }, {
        name: "data",
        getter: function() {
            return this.dao
        },
        setter: function(v) {
            this.dao = v
        }
    }, {
        name: "selection"
    }, {
        model_: "BooleanProperty",
        name: "useSearchView",
        type: "Boolean",
        defaultValue: !1
    }],
    actions: [{
        name: "new",
        help: "Create a new record.",
        code: function() {
            var createView = this.X.DAOCreateController.create({
                model: this.model,
                dao: this.dao,
                showActions: !0
            });
            (createView.parentController = this).X.stack.pushView(createView, "New")
        }
    }, {
        name: "edit",
        help: "Edit the current record.",
        default: !0,
        code: function() {
            this.selection = this.daoView.selection
            for (var obj = this.selection, actions = this.X.DAOUpdateController.actions.slice(0), i = 0; i < this.model.actions.length; i++) {
                var action = this.model.actions[i]
                  , newAction = this.X.Action.create(action)
                newAction.action = function(oldAction) {
                    return function() {
                        oldAction.call(obj)
                    }
                }(action.action),
                actions.push(newAction)
            }
            console.log(["selection: ", this.selection])
            var updateView = this.X.DAOUpdateController.create({
                data: this.selection,
                model: this.model,
                dao: this.dao,
                showActions: !0
            })
            this.X.stack.pushView(updateView, "Edit")
        }
    }, {
        name: "delete",
        help: "Delete the current record.",
        code: function() {
            this.selection = this.daoView.selection
            var self = this
            this.dao.remove(this.selection)
        }
    }],
    methods: [function init() {
        this.SUPER(),
        this.showActions = !0
    }
    , function initHTML() {
        this.SUPER(),
        this.daoView.subscribe(this.daoView.DOUBLE_CLICK, this.onDoubleClick),
        this.daoView.selection$.addListener(this.onSelection)
    }
    ],
    listeners: [{
        name: "onDoubleClick",
        code: function(evt) {
            for (var i = 0; i < this.model_.getRuntimeActions().length; i++) {
                var action = this.model_.getRuntimeActions()[i]
                if (action.default) {
                    action.action.call(this)
                    break
                }
            }
        }
    }, {
        name: "onSelection",
        code: function(evt) {
            var obj
            this.daoView.selection && this.X.stack.setPreview(this.X.SummaryView.create({
                model: this.model,
                data: this.daoView.selection
            }))
        }
    }],
    templates: [{
        name: "toInnerHTML",
        code: function(opt_out) {
            var self = this
              , X = this.X
              , Y = this.Y
              , opt_out = opt_out || TOC(this)
            return opt_out(" ", this.createTemplateView("dao", {
                model: this.model
            }), " "),
            opt_out.toString()
        },
        language: "html"
    }]
})
