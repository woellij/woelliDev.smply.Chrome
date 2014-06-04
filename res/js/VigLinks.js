﻿/*
 VigLink JavaScript Library -- http://www.viglink.com

 Permission is hereby granted to create derivative works, but only for use
 with the VigLink web service.

 Copyright (c) 2014 VigLink. Rights reserved and patent(s) pending.

 Includes:

 Sizzle CSS Selector Engine v1.10.20-pre
 http://sizzlejs.com/

 Copyright 2013 jQuery Foundation, Inc. and other contributors
 Released under the MIT license
 http://jquery.org/license

 Date: 2014-05-22
*/
(function (l) {
    var f, b = {
        _breaker: {}, each: function (a, c) { var d, e; if ("object" === b.type(a) && a.hasOwnProperty) for (d in a) { if (a.hasOwnProperty(d) && c(a[d], d) === b._breaker) break } else if (a) { d = 0; for (e = a.length; d < e && c(a[d], d) !== b._breaker; d++); } }, extend: function (a) { var c, d, b, h, g = arguments.length; a = a || {}; for (d = 1; d < g; d++) if (h = arguments[d], void 0 !== h && null !== h) for (b in h) c = h[b], a !== c && void 0 !== c && (a[b] = c); return a }, noop: function () { }, type: function () {
            var a = function (a, d) {
                try {
                    return ("function" === typeof window[d] || "object" ===
                    typeof window[d]) && a instanceof window[d]
                } catch (b) { } return !1
            }; return function (c) { return null === c ? "null" : void 0 === c ? "undefined" : a(c, "HTMLElement") || "object" === typeof c && 1 === c.nodeType && "string" === typeof c.nodeName ? "element" : a(c, "HTMLDocument") || "object" === typeof c && ("defaultView" in c || "parentWindow" in c) ? "document" : c == c.window ? "window" : Object.prototype.toString.call(c).slice(8, -1).toLowerCase() }
        }()
    }; b.extend(b, {
        addClass: function (a, c) { b.hasClass(a, c) || (a.className = (a.className ? a.className + " " : "") + c) },
        attrValues: function (a, c, d) { return (c = a[c]) ? c.split(d || " ") : [] }, batchable: function (a) { a = b.extend({ batch: b.noop, single: b.noop, timeout: 100 }, a); var c = [], d = b.traits.cors && b.traits.json, e = null, h = function () { null !== e && (clearTimeout(e), e = null); 1 === c.length ? a.single.apply(this, c[0]) : 1 < c.length && a.batch(c); c = [] }, g = function () { c.push(b.toArray(arguments)); null === e && (e = setTimeout(b.bind(function () { h() }, this), a.timeout)) }; b.extend(g, { flush: h, now: a.single }); return d ? g : a.single }, bind: function (a, c) {
            return function () {
                return a.apply(c,
                arguments)
            }
        }, cache: function () { var a = {}, c = "vglnk_" + (new Date).getTime(), d = 0; return function (b, h, g) { if (b) { var m = b[c]; if (m || void 0 !== g) return m || (m = ++d), a[m] || (b[c] = m, a[m] = {}), void 0 !== g && (a[m][h] = g), "string" === typeof h ? a[m][h] : a[m] } } }(), canonicalizeHostname: function (a) { "string" === typeof a && (a = b.createA(a)); return a.hostname ? a.hostname.toString().toLowerCase().replace(/^www\./, "").replace(/:.*$/, "") : "" }, clone: function (a) { return b.extend({}, a) }, contains: function (a, c) { return -1 !== b.indexOf(a, c) }, context: function (a) {
            "element" ===
            b.type(a) && (a = a.ownerDocument); "document" === b.type(a) && (a = a.defaultView || a.parentWindow); if ("window" === b.type(a)) return a
        }, containsPII: function (a) { return /\b[A-Z0-9._%+-]+(?:%(?:25)*40|@)[A-Z0-9.-]+\.[A-Z]{2,4}\b/i.test(a) }, contextIsAncestor: function (a, c) { for (var d = a.self; d.parent && d.parent !== d;) if (d = d.parent, d === c) return !0; return !1 }, cors: function (a, c, d) {
            var b, h = function () { d ? d(b.responseText) : eval(b.responseText) }; b = new window.XMLHttpRequest; b.onreadystatechange = function () {
                4 === b.readyState && 200 ===
                b.status && h()
            }; try { return b.open("POST", a), b.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), b.withCredentials = !0, b.send(c), !0 } catch (g) { return !1 }
        }, createA: function (a, c) { return b.createEl("a", { href: a, target: c }) }, createEl: function (a, c, d, e) { var h; a = (e || document).createElement(a); c = c || {}; d = d || {}; for (h in c) void 0 !== c[h] && (a[h] = c[h]); b.css(a, d); return a }, css: function (a, c) { for (var d in c) try { a.style[d] = c[d] } catch (b) { } return a }, destructing: function (a) {
            return function (a) {
                var b = !1, e; return function () {
                    b ||
                    (e = a.apply(null, arguments), b = !0); return e
                }
            }(a)
        }, escapeRegExp: function () { var a; return function (c) { a = a || /([.*+?^${}()|[\]\\])/g; return c.replace(a, "\\$1") } }(), eventLink: function (a) { var c, b = a.target || a.srcElement; do { try { c = b.nodeType } catch (e) { break } if (1 === c && (a = b.tagName.toUpperCase(), "A" === a || "AREA" === a)) return b; b = b.parentNode } while (b) }, exceptionLogger: function () {
            var a = !1, c = b.noop; return function (b, e) {
                if (void 0 !== e) a = e, c = b; else return function () {
                    if (a) try { return b.apply(this, arguments) } catch (e) { c(e) } else return b.apply(this,
                    arguments)
                }
            }
        }(), find: function (a, c) { var d; b.each(a, function (a, h) { if (c(a, h)) return d = a, b._breaker }); return d }, generateNodeFilter: function () {
            var a = function (a, b) { var h, g; b = "," + b.join(",") + ","; h = 0; for (g = a.length; h < g; h++) if (c(a[h], b)) return !0; return !1 }, c = function (a, c) { return -1 !== c.indexOf("," + a + ",") }; return function (d) {
                d = b.extend({ custom: null, classes: [], rels: [], tags: [] }, d); d.tags.length && (d.tags = "," + d.tags.join(",").toLowerCase() + ","); return function (e, h) {
                    h = b.extend({ ancestors: !0, self: !0 }, h); var g = !0, m =
                    !0, f = function (e, h) { var g; if (g = !(d.tags.length && c(e.nodeName.toLowerCase(), d.tags))) { if (g = d.classes.length) { g = d.classes; var m = b.attrValues(e, "className"); g = a(g, m) } if (g = !g) { if (g = d.rels.length) g = d.rels, m = b.attrValues(e, "rel"), g = c(e.nodeName.toLowerCase(), ",a,") && a(g, m); g = !g && !("function" === b.type(d.custom) && d.custom(e, h)) } } return g }, m = !h.self || f(e, !0); if (h.ancestors) for (; e.parentNode;) if (e = e.parentNode, 1 === e.nodeType && !f(e, !1)) { g = !1; break } return m && g
                }
            }
        }(), fromJSON: function (a) { if (b.traits.json) try { return window.JSON.parse(a) } catch (c) { } },
        fromQuery: function (a) { "?" === a.substr(0, 1) && (a = a.substr(1)); a = a.split("&"); var c = {}; b.each(a, function (a) { a = a.split("="); c[decodeURIComponent(a[0])] = decodeURIComponent(a[1]) }); return c }, geometry: function () { var a, c = arguments.length, d = Infinity, e = Infinity, h = -Infinity, g = -Infinity, m; for (a = 0; a < c; a++) m = b.position(arguments[a]), d = Math.min(d, m.x), e = Math.min(e, m.y), h = Math.max(h, m.x + arguments[a].offsetWidth), g = Math.max(g, m.y + arguments[a].offsetHeight); return { x: d, y: e, w: h - d, h: g - e, x1: d, y1: e, x2: h, y2: g } }, getActualHref: function (a) {
            return b.cache(a,
            "href") || a.href
        }, hasAttrValue: function (a, c, d, e) { return c ? b.contains(b.attrValues(a, c, e), d) : !1 }, hasClass: function (a, c) { return b.hasAttrValue(a, "className", c) }, hasRel: function (a, c) { return b.hasAttrValue(a, "rel", c) }, indexOf: function () { return Array.prototype.indexOf ? function (a, c) { return Array.prototype.indexOf.call(a, c) } : function (a, c) { var b, e; b = 0; for (e = a.length; b < e; b++) if (a[b] === c) return b; return -1 } }(), isArray: function (a) { return "array" === b.type(a) }, isDefaultPrevented: function (a) {
            return a.isDefaultPrevented &&
            a.isDefaultPrevented() || !1 === a.returnValue || !0 === a.defaultPrevented
        }, jsonp: function (a) { var c = document.getElementsByTagName("script")[0]; a = b.createEl("script", { type: "text/javascript", src: a }); c.parentNode.insertBefore(a, c) }, map: function (a, c) { var d = []; b.each(a, function (a, b) { void 0 !== a && (d[b] = c(a)) }); return d }, matches: function () { try { return this.Sizzle.matchesSelector.apply(this.Sizzle, arguments) } catch (a) { return !0 } }, on: function () {
            var a; return function (c, d, e) {
                var h, g; if (1 === arguments.length) a = c; else {
                    if (2 ===
                    arguments.length) { if (!a) return; e = d; d = c; c = a } try { h = c["on" + d] } catch (m) { } "function" === typeof h && (c["on" + d] = b.bind(function (a) { a = a || window.event; var d = h.apply(c, arguments); this.exceptionLogger(function () { return a ? (void 0 !== d && !1 !== a.returnValue && (a.returnValue = d), b.isDefaultPrevented(a) && "function" === b.type(a.preventDefault) && a.preventDefault(), a.returnValue) : d })() }, this)); g = b.exceptionLogger(function () { if (a.enabled()) return e.apply(null, arguments) }); c.addEventListener ? c.addEventListener(d, g, !1) : c.attachEvent &&
                    c.attachEvent("on" + d, g)
                }
            }
        }(), position: function (a, c) { var b, e = 0, h = 0, g = 0, m = 0; c = c || document; if (!a.offsetParent) return !1; b = a; do e += b.offsetLeft, h += b.offsetTop, b = b.offsetParent; while (b); b = a; do g += b.scrollLeft, m += b.scrollTop, b = b.parentNode; while (b && b !== c.body); return { x: e - g, y: h - m } }, preventDefault: function (a) { a.preventDefault && a.preventDefault(); return a.returnValue = !1 }, prune: function (a) { b.each(a, function (b, d) { (null === b || void 0 === b) && delete a[d] }); return a }, ready: function () {
            var a = !1, c = [], d = !1, e, h, g, m, f; document.addEventListener ?
            g = function () { document.removeEventListener("DOMContentLoaded", g, !1); f() } : document.attachEvent && (m = function () { "complete" === document.readyState && (document.detachEvent("onreadystatechange", m), f()) }); e = function () {
                if (!a) {
                    a = !0; if ("interactive" === document.readyState || "complete" === document.readyState) return f(); if (document.addEventListener) document.addEventListener("DOMContentLoaded", g, !1); else if (document.attachEvent) {
                        document.attachEvent("onreadystatechange", m); var c = !1; try { c = null === window.frameElement } catch (d) { } document.documentElement.doScroll &&
                        c && h()
                    } b.on(window, "load", f)
                }
            }; h = function () { if (!d) { try { document.documentElement.doScroll("left") } catch (a) { setTimeout(b.exceptionLogger(h), 1); return } f() } }; f = function () { if (!d) { if (!document.body) return setTimeout(b.exceptionLogger(f), 13); d = !0; c && (b.each(c, function (a) { a() }), c = null) } }; return function (a) { e(); d ? a() : c.push(a) }
        }(), reformatKeys: function (a) {
            var c, d, e = function (a) { return "_" + a.toLowerCase() }; for (c in a) d = c.replace(/([A-Z])/g, e), "object" === b.type(a[c]) && (a[c] = b.reformatKeys(a[c])), d !== c && (a[d] =
            a[c], delete a[c]); return a
        }, removeClass: function (a, c) { if (b.hasClass(a, c)) { var d, e, h = b.attrValues(a, "className"); d = 0; for (e = h.length; d < e; d++) h[d] === c && delete h[d]; a.className = h.join(" ") } }, request: function (a, c, d) {
            var e, h; d = b.extend({ fn: b.noop, jsonp: !0, "return": !1, timeout: null }, d); "string" === typeof d.fn ? (e = window[d.fn], h = d.fn) : "function" === typeof d.fn && (!0 !== d.jsonp ? e = d.fn : (e = b.destructing(d.fn), h = b.uniqid("vglnk_jsonp_"), window[h] = b.exceptionLogger(function () { e.apply(this, arguments); window[h] = void 0 }),
            null !== d.timeout && setTimeout(b.exceptionLogger(e), d.timeout))); h && (c = b.extend({ format: "jsonp", jsonp: h }, c)); c = b.toQuery(c); return d["return"] ? a + (c.length ? "?" : "") + c : b.traits.cors && b.cors(a, c, d.jsonp ? null : e) ? !0 : b.jsonp(a + (c.length ? "?" : "") + c)
        }, select: function () { try { return this.Sizzle.apply(this.Sizzle, arguments) } catch (a) { return [] } }, toArray: function (a) { if (a && void 0 !== a.length) try { return Array.prototype.slice.call(a, 0) } catch (b) { var d, e, h = []; d = 0; for (e = a.length; d < e; d++) h[d] = a[d]; return h } }, toJSON: function (a) { if (b.traits.json) try { return window.JSON.stringify(a) } catch (c) { } },
        toQuery: function (a) { var c = ""; b.each(b.prune(a), function (a, b) { c += "&" + encodeURIComponent(b) + "=" + encodeURIComponent(a) }); return c.substr(1) }, transmitsPII: function (a) { return b.containsPII(a + " " + document.referrer) }, updateUrl: function (a, c) { return b.extend(b.createA(a), c).href }, uniqid: function () { var a = 0; return function (b) { return (b || "") + (new Date).getTime() + a++ } }()
    }); var u = function () { var a = b.find(b.toArray(arguments), function (a) { return "function" === b.type(a) }); a && (b.Sizzle = a()) }; u.amd = !0; (function (a) {
        function b(a,
        c, d, e) {
            var g, h, m, f, k; (c ? c.ownerDocument || c : E) !== z && K(c); c = c || z; d = d || []; if (!a || "string" !== typeof a) return d; if (1 !== (f = c.nodeType) && 9 !== f) return []; if (G && !e) {
                if (g = ra.exec(a)) if (m = g[1]) if (9 === f) if ((h = c.getElementById(m)) && h.parentNode) { if (h.id === m) return d.push(h), d } else return d; else { if (c.ownerDocument && (h = c.ownerDocument.getElementById(m)) && U(c, h) && h.id === m) return d.push(h), d } else {
                    if (g[2]) return L.apply(d, c.getElementsByTagName(a)), d; if ((m = g[3]) && v.getElementsByClassName && c.getElementsByClassName) return L.apply(d,
                    c.getElementsByClassName(m)), d
                } if (v.qsa && (!A || !A.test(a))) { h = g = x; m = c; k = 9 === f && a; if (1 === f && "object" !== c.nodeName.toLowerCase()) { f = V(a); (g = c.getAttribute("id")) ? h = g.replace(sa, "\\$&") : c.setAttribute("id", h); h = "[id='" + h + "'] "; for (m = f.length; m--;) f[m] = h + w(f[m]); m = ea.test(a) && n(c.parentNode) || c; k = f.join(",") } if (k) try { return L.apply(d, m.querySelectorAll(k)), d } catch (l) { } finally { g || c.removeAttribute("id") } }
            } return ka(a.replace(Z, "$1"), c, d, e)
        } function d() {
            function a(c, d) {
                b.push(c + " ") > q.cacheLength && delete a[b.shift()];
                return a[c + " "] = d
            } var b = []; return a
        } function e(a) { a[x] = !0; return a } function h(a) { var b = z.createElement("div"); try { return !!a(b) } catch (c) { return !1 } finally { b.parentNode && b.parentNode.removeChild(b) } } function g(a, b) { for (var c = a.split("|"), d = a.length; d--;) q.attrHandle[c[d]] = b } function m(a, b) { var c = b && a, d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || la) - (~a.sourceIndex || la); if (d) return d; if (c) for (; c = c.nextSibling;) if (c === b) return -1; return a ? 1 : -1 } function f(a) {
            return function (b) {
                return "input" === b.nodeName.toLowerCase() &&
                b.type === a
            }
        } function k(a) { return function (b) { var c = b.nodeName.toLowerCase(); return ("input" === c || "button" === c) && b.type === a } } function l(a) { return e(function (b) { b = +b; return e(function (c, d) { for (var e, g = a([], c.length, b), h = g.length; h--;) if (c[e = g[h]]) c[e] = !(d[e] = c[e]) }) }) } function n(a) { return a && typeof a.getElementsByTagName !== R && a } function t() { } function w(a) { for (var b = 0, c = a.length, d = ""; b < c; b++) d += a[b].value; return d } function W(a, b, c) {
            var d = b.dir, e = c && "parentNode" === d, g = ta++; return b.first ? function (b, c,
            y) { for (; b = b[d];) if (1 === b.nodeType || e) return a(b, c, y) } : function (b, c, y) { var D, h, m = [F, g]; if (y) for (; b = b[d];) { if ((1 === b.nodeType || e) && a(b, c, y)) return !0 } else for (; b = b[d];) if (1 === b.nodeType || e) { h = b[x] || (b[x] = {}); if ((D = h[d]) && D[0] === F && D[1] === g) return m[2] = D[2]; h[d] = m; if (m[2] = a(b, c, y)) return !0 } }
        } function r(a) { return 1 < a.length ? function (b, c, d) { for (var e = a.length; e--;) if (!a[e](b, c, d)) return !1; return !0 } : a[0] } function $(a, b, c, d, e) {
            for (var g, h = [], m = 0, f = a.length, k = null != b; m < f; m++) if (g = a[m]) if (!c || c(g, d, e)) h.push(g),
            k && b.push(m); return h
        } function fa(a, d, y, g, h, m) {
            g && !g[x] && (g = fa(g)); h && !h[x] && (h = fa(h, m)); return e(function (e, m, f, k) {
                var l, p, ja = [], t = [], n = m.length, s; if (!(s = e)) { s = d || "*"; for (var q = f.nodeType ? [f] : f, C = [], B = 0, w = q.length; B < w; B++) b(s, q[B], C); s = C } s = a && (e || !d) ? $(s, ja, a, f, k) : s; q = y ? h || (e ? a : n || g) ? [] : m : s; y && y(s, q, f, k); if (g) { l = $(q, t); g(l, [], f, k); for (f = l.length; f--;) if (p = l[f]) q[t[f]] = !(s[t[f]] = p) } if (e) {
                    if (h || a) {
                        if (h) { l = []; for (f = q.length; f--;) if (p = q[f]) l.push(s[f] = p); h(null, q = [], l, k) } for (f = q.length; f--;) if ((p = q[f]) &&
                        -1 < (l = h ? O.call(e, p) : ja[f])) e[l] = !(m[l] = p)
                    }
                } else q = $(q === m ? q.splice(n, q.length) : q), h ? h(null, m, q, k) : L.apply(m, q)
            })
        } function ga(a) {
            var b, c, d, e = a.length, h = q.relative[a[0].type]; c = h || q.relative[" "]; for (var g = h ? 1 : 0, m = W(function (a) { return a === b }, c, !0), f = W(function (a) { return -1 < O.call(b, a) }, c, !0), k = [function (a, c, d) { return !h && (d || c !== aa) || ((b = c).nodeType ? m(a, c, d) : f(a, c, d)) }]; g < e; g++) if (c = q.relative[a[g].type]) k = [W(r(k), c)]; else {
                c = q.filter[a[g].type].apply(null, a[g].matches); if (c[x]) {
                    for (d = ++g; d < e && !q.relative[a[d].type]; d++);
                    return fa(1 < g && r(k), 1 < g && w(a.slice(0, g - 1).concat({ value: " " === a[g - 2].type ? "*" : "" })).replace(Z, "$1"), c, g < d && ga(a.slice(g, d)), d < e && ga(a = a.slice(d)), d < e && w(a))
                } k.push(c)
            } return r(k)
        } function ua(a, d) {
            var g = 0 < d.length, h = 0 < a.length, m = function (e, m, f, k, l) {
                var p, Y, s, t = 0, n = "0", C = e && [], B = [], w = aa, v = e || h && q.find.TAG("*", l), r = F += null == w ? 1 : Math.random() || 0.1, W = v.length; for (l && (aa = m !== z && m) ; n !== W && null != (p = v[n]) ; n++) { if (h && p) { for (Y = 0; s = a[Y++];) if (s(p, m, f)) { k.push(p); break } l && (F = r) } g && ((p = !s && p) && t--, e && C.push(p)) } t +=
                n; if (g && n !== t) { for (Y = 0; s = d[Y++];) s(C, B, m, f); if (e) { if (0 < t) for (; n--;) !C[n] && !B[n] && (B[n] = va.call(k)); B = $(B) } L.apply(k, B); l && (!e && 0 < B.length && 1 < t + d.length) && b.uniqueSort(k) } l && (F = r, aa = w); return C
            }; return g ? e(m) : m
        } var S, v, q, ba, ma, V, ha, ka, aa, M, T, K, z, H, G, A, P, ca, U, x = "sizzle" + -new Date, E = a.document, F = 0, ta = 0, na = d(), oa = d(), pa = d(), ia = function (a, b) { a === b && (T = !0); return 0 }, R = "undefined", la = -2147483648, wa = {}.hasOwnProperty, N = [], va = N.pop, xa = N.push, L = N.push, qa = N.slice, O = N.indexOf || function (a) {
            for (var b = 0, c = this.length; b <
            c; b++) if (this[b] === a) return b; return -1
        }, Z = /^[\x20\t\r\n\f]+|((?:^|[^\\])(?:\\.)*)[\x20\t\r\n\f]+$/g, ya = /^[\x20\t\r\n\f]*,[\x20\t\r\n\f]*/, za = /^[\x20\t\r\n\f]*([>+~]|[\x20\t\r\n\f])[\x20\t\r\n\f]*/, Aa = /=[\x20\t\r\n\f]*([^\]'"]*?)[\x20\t\r\n\f]*\]/g, Ba = RegExp(":((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+)(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|\\[[\\x20\\t\\r\\n\\f]*((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+)(?:[\\x20\\t\\r\\n\\f]*([*^$|!~]?=)[\\x20\\t\\r\\n\\f]*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+))|)[\\x20\\t\\r\\n\\f]*\\])*)|.*)\\)|)"),
        Ca = /^(?:\\.|[\w-]|[^\x00-\xa0])+$/, da = {
            ID: /^#((?:\\.|[\w-]|[^\x00-\xa0])+)/, CLASS: /^\.((?:\\.|[\w-]|[^\x00-\xa0])+)/, TAG: /^((?:\\.|[\w-]|[^\x00-\xa0])+|[*])/, ATTR: RegExp("^\\[[\\x20\\t\\r\\n\\f]*((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+)(?:[\\x20\\t\\r\\n\\f]*([*^$|!~]?=)[\\x20\\t\\r\\n\\f]*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+))|)[\\x20\\t\\r\\n\\f]*\\]"), PSEUDO: RegExp("^:((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+)(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|\\[[\\x20\\t\\r\\n\\f]*((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+)(?:[\\x20\\t\\r\\n\\f]*([*^$|!~]?=)[\\x20\\t\\r\\n\\f]*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+))|)[\\x20\\t\\r\\n\\f]*\\])*)|.*)\\)|)"),
            CHILD: RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\([\\x20\\t\\r\\n\\f]*(even|odd|(([+-]|)(\\d*)n|)[\\x20\\t\\r\\n\\f]*(?:([+-]|)[\\x20\\t\\r\\n\\f]*(\\d+)|))[\\x20\\t\\r\\n\\f]*\\)|)", "i"), bool: RegExp("^(?:checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)$", "i"), needsContext: RegExp("^[\\x20\\t\\r\\n\\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\([\\x20\\t\\r\\n\\f]*((?:-\\d)?\\d*)[\\x20\\t\\r\\n\\f]*\\)|)(?=[^-]|$)",
            "i")
        }, Da = /^(?:input|select|textarea|button)$/i, Ea = /^h\d$/i, X = /^[^{]+\{\s*\[native \w/, ra = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ea = /[+~]/, sa = /'|\\/g, I = /\\([\da-f]{1,6}[\x20\t\r\n\f]?|([\x20\t\r\n\f])|.)/ig, J = function (a, b, c) { a = "0x" + b - 65536; return a !== a || c ? b : 0 > a ? String.fromCharCode(a + 65536) : String.fromCharCode(a >> 10 | 55296, a & 1023 | 56320) }; try { L.apply(N = qa.call(E.childNodes), E.childNodes), N[E.childNodes.length].nodeType } catch (Fa) {
            L = {
                apply: N.length ? function (a, b) { xa.apply(a, qa.call(b)) } : function (a, b) {
                    for (var c =
                    a.length, d = 0; a[c++] = b[d++];); a.length = c - 1
                }
            }
        } v = b.support = {}; ma = b.isXML = function (a) { return (a = a && (a.ownerDocument || a).documentElement) ? "HTML" !== a.nodeName : !1 }; K = b.setDocument = function (a) {
            var b = a ? a.ownerDocument || a : E; a = b.defaultView; if (b === z || 9 !== b.nodeType || !b.documentElement) return z; z = b; H = b.documentElement; G = !ma(b); a && a !== a.top && (a.addEventListener ? a.addEventListener("unload", function () { K() }, !1) : a.attachEvent && a.attachEvent("onunload", function () { K() })); v.attributes = h(function (a) { a.className = "i"; return !a.getAttribute("className") });
            v.getElementsByTagName = h(function (a) { a.appendChild(b.createComment("")); return !a.getElementsByTagName("*").length }); v.getElementsByClassName = X.test(b.getElementsByClassName) && h(function (a) { a.innerHTML = "<div class='a'></div><div class='a i'></div>"; a.firstChild.className = "i"; return 2 === a.getElementsByClassName("i").length }); v.getById = h(function (a) { H.appendChild(a).id = x; return !b.getElementsByName || !b.getElementsByName(x).length }); v.getById ? (q.find.ID = function (a, b) {
                if (typeof b.getElementById !== R && G) {
                    var c =
                    b.getElementById(a); return c && c.parentNode ? [c] : []
                }
            }, q.filter.ID = function (a) { var b = a.replace(I, J); return function (a) { return a.getAttribute("id") === b } }) : (delete q.find.ID, q.filter.ID = function (a) { var b = a.replace(I, J); return function (a) { return (a = typeof a.getAttributeNode !== R && a.getAttributeNode("id")) && a.value === b } }); q.find.TAG = v.getElementsByTagName ? function (a, b) { if (typeof b.getElementsByTagName !== R) return b.getElementsByTagName(a) } : function (a, b) {
                var c, d = [], e = 0, Q = b.getElementsByTagName(a); if ("*" === a) {
                    for (; c =
                    Q[e++];) 1 === c.nodeType && d.push(c); return d
                } return Q
            }; q.find.CLASS = v.getElementsByClassName && function (a, b) { if (typeof b.getElementsByClassName !== R && G) return b.getElementsByClassName(a) }; P = []; A = []; if (v.qsa = X.test(b.querySelectorAll)) h(function (a) {
                a.innerHTML = "<select msallowclip=''><option selected=''></option></select>"; a.querySelectorAll("[msallowclip^='']").length && A.push("[*^$]=[\\x20\\t\\r\\n\\f]*(?:''|\"\")"); a.querySelectorAll("[selected]").length || A.push("\\[[\\x20\\t\\r\\n\\f]*(?:value|checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)");
                a.querySelectorAll(":checked").length || A.push(":checked")
            }), h(function (a) { var c = b.createElement("input"); c.setAttribute("type", "hidden"); a.appendChild(c).setAttribute("name", "D"); a.querySelectorAll("[name=d]").length && A.push("name[\\x20\\t\\r\\n\\f]*[*^$|!~]?="); a.querySelectorAll(":enabled").length || A.push(":enabled", ":disabled"); a.querySelectorAll("*,:x"); A.push(",.*:") }); (v.matchesSelector = X.test(ca = H.matches || H.webkitMatchesSelector || H.mozMatchesSelector || H.oMatchesSelector || H.msMatchesSelector)) &&
            h(function (a) { v.disconnectedMatch = ca.call(a, "div"); ca.call(a, "[s!='']:x"); P.push("!=", ":((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+)(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|\\[[\\x20\\t\\r\\n\\f]*((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+)(?:[\\x20\\t\\r\\n\\f]*([*^$|!~]?=)[\\x20\\t\\r\\n\\f]*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+))|)[\\x20\\t\\r\\n\\f]*\\])*)|.*)\\)|)") }); A = A.length && RegExp(A.join("|")); P = P.length && RegExp(P.join("|"));
            U = (a = X.test(H.compareDocumentPosition)) || X.test(H.contains) ? function (a, b) { var c = 9 === a.nodeType ? a.documentElement : a, d = b && b.parentNode; return a === d || !(!d || !(1 === d.nodeType && (c.contains ? c.contains(d) : a.compareDocumentPosition && a.compareDocumentPosition(d) & 16))) } : function (a, b) { if (b) for (; b = b.parentNode;) if (b === a) return !0; return !1 }; ia = a ? function (a, c) {
                if (a === c) return T = !0, 0; var d = !a.compareDocumentPosition - !c.compareDocumentPosition; if (d) return d; d = (a.ownerDocument || a) === (c.ownerDocument || c) ? a.compareDocumentPosition(c) :
                1; return d & 1 || !v.sortDetached && c.compareDocumentPosition(a) === d ? a === b || a.ownerDocument === E && U(E, a) ? -1 : c === b || c.ownerDocument === E && U(E, c) ? 1 : M ? O.call(M, a) - O.call(M, c) : 0 : d & 4 ? -1 : 1
            } : function (a, c) {
                if (a === c) return T = !0, 0; var d, e = 0; d = a.parentNode; var Q = c.parentNode, g = [a], h = [c]; if (!d || !Q) return a === b ? -1 : c === b ? 1 : d ? -1 : Q ? 1 : M ? O.call(M, a) - O.call(M, c) : 0; if (d === Q) return m(a, c); for (d = a; d = d.parentNode;) g.unshift(d); for (d = c; d = d.parentNode;) h.unshift(d); for (; g[e] === h[e];) e++; return e ? m(g[e], h[e]) : g[e] === E ? -1 : h[e] ===
                E ? 1 : 0
            }; return b
        }; b.matches = function (a, d) { return b(a, null, null, d) }; b.matchesSelector = function (a, d) { (a.ownerDocument || a) !== z && K(a); d = d.replace(Aa, "='$1']"); if (v.matchesSelector && G && (!P || !P.test(d)) && (!A || !A.test(d))) try { var e = ca.call(a, d); if (e || v.disconnectedMatch || a.document && 11 !== a.document.nodeType) return e } catch (g) { } return 0 < b(d, z, null, [a]).length }; b.contains = function (a, b) { (a.ownerDocument || a) !== z && K(a); return U(a, b) }; b.attr = function (a, b) {
            (a.ownerDocument || a) !== z && K(a); var c = q.attrHandle[b.toLowerCase()],
            c = c && wa.call(q.attrHandle, b.toLowerCase()) ? c(a, b, !G) : void 0; return void 0 !== c ? c : v.attributes || !G ? a.getAttribute(b) : (c = a.getAttributeNode(b)) && c.specified ? c.value : null
        }; b.error = function (a) { throw Error("Syntax error, unrecognized expression: " + a); }; b.uniqueSort = function (a) { var b, c = [], d = 0, e = 0; T = !v.detectDuplicates; M = !v.sortStable && a.slice(0); a.sort(ia); if (T) { for (; b = a[e++];) b === a[e] && (d = c.push(e)); for (; d--;) a.splice(c[d], 1) } M = null; return a }; ba = b.getText = function (a) {
            var b, c = "", d = 0; if (b = a.nodeType) if (1 ===
            b || 9 === b || 11 === b) { if ("string" === typeof a.textContent) return a.textContent; for (a = a.firstChild; a; a = a.nextSibling) c += ba(a) } else { if (3 === b || 4 === b) return a.nodeValue } else for (; b = a[d++];) c += ba(b); return c
        }; q = b.selectors = {
            cacheLength: 50, createPseudo: e, match: da, attrHandle: {}, find: {}, relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } }, preFilter: {
                ATTR: function (a) {
                    a[1] = a[1].replace(I, J); a[3] = (a[3] || a[4] || a[5] || "").replace(I, J); "~=" ===
                    a[2] && (a[3] = " " + a[3] + " "); return a.slice(0, 4)
                }, CHILD: function (a) { a[1] = a[1].toLowerCase(); "nth" === a[1].slice(0, 3) ? (a[3] || b.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && b.error(a[0]); return a }, PSEUDO: function (a) { var b, c = !a[6] && a[2]; if (da.CHILD.test(a[0])) return null; if (a[3]) a[2] = a[4] || a[5] || ""; else if (c && Ba.test(c) && (b = V(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length)) a[0] = a[0].slice(0, b), a[2] = c.slice(0, b); return a.slice(0, 3) }
            }, filter: {
                TAG: function (a) {
                    var b =
                    a.replace(I, J).toLowerCase(); return "*" === a ? function () { return !0 } : function (a) { return a.nodeName && a.nodeName.toLowerCase() === b }
                }, CLASS: function (a) { var b = na[a + " "]; return b || (b = RegExp("(^|[\\x20\\t\\r\\n\\f])" + a + "([\\x20\\t\\r\\n\\f]|$)")) && na(a, function (a) { return b.test("string" === typeof a.className && a.className || typeof a.getAttribute !== R && a.getAttribute("class") || "") }) }, ATTR: function (a, d, e) {
                    return function (g) {
                        g = b.attr(g, a); if (null == g) return "!=" === d; if (!d) return !0; g += ""; return "=" === d ? g === e : "!=" === d ?
                        g !== e : "^=" === d ? e && 0 === g.indexOf(e) : "*=" === d ? e && -1 < g.indexOf(e) : "$=" === d ? e && g.slice(-e.length) === e : "~=" === d ? -1 < (" " + g + " ").indexOf(e) : "|=" === d ? g === e || g.slice(0, e.length + 1) === e + "-" : !1
                    }
                }, CHILD: function (a, b, c, d, e) {
                    var g = "nth" !== a.slice(0, 3), h = "last" !== a.slice(-4), m = "of-type" === b; return 1 === d && 0 === e ? function (a) { return !!a.parentNode } : function (b, c, f) {
                        var k, l, p, D, y; c = g !== h ? "nextSibling" : "previousSibling"; var t = b.parentNode, s = m && b.nodeName.toLowerCase(); f = !f && !m; if (t) {
                            if (g) {
                                for (; c;) {
                                    for (l = b; l = l[c];) if (m ? l.nodeName.toLowerCase() ===
                                            s : 1 === l.nodeType) return !1; y = c = "only" === a && !y && "nextSibling"
                                } return !0
                            } y = [h ? t.firstChild : t.lastChild]; if (h && f) { f = t[x] || (t[x] = {}); k = f[a] || []; D = k[0] === F && k[1]; p = k[0] === F && k[2]; for (l = D && t.childNodes[D]; l = ++D && l && l[c] || (p = D = 0) || y.pop() ;) if (1 === l.nodeType && ++p && l === b) { f[a] = [F, D, p]; break } } else if (f && (k = (b[x] || (b[x] = {}))[a]) && k[0] === F) p = k[1]; else for (; l = ++D && l && l[c] || (p = D = 0) || y.pop() ;) if ((m ? l.nodeName.toLowerCase() === s : 1 === l.nodeType) && ++p) if (f && ((l[x] || (l[x] = {}))[a] = [F, p]), l === b) break; p -= e; return p === d ||
                            0 === p % d && 0 <= p / d
                        }
                    }
                }, PSEUDO: function (a, d) { var g, h = q.pseudos[a] || q.setFilters[a.toLowerCase()] || b.error("unsupported pseudo: " + a); return h[x] ? h(d) : 1 < h.length ? (g = [a, a, "", d], q.setFilters.hasOwnProperty(a.toLowerCase()) ? e(function (a, b) { for (var c, e = h(a, d), g = e.length; g--;) c = O.call(a, e[g]), a[c] = !(b[c] = e[g]) }) : function (a) { return h(a, 0, g) }) : h }
            }, pseudos: {
                not: e(function (a) {
                    var b = [], c = [], d = ha(a.replace(Z, "$1")); return d[x] ? e(function (a, b, c, e) { e = d(a, null, e, []); for (var g = a.length; g--;) if (c = e[g]) a[g] = !(b[g] = c) }) :
                    function (a, e, g) { b[0] = a; d(b, null, g, c); return !c.pop() }
                }), has: e(function (a) { return function (d) { return 0 < b(a, d).length } }), contains: e(function (a) { a = a.replace(I, J); return function (b) { return -1 < (b.textContent || b.innerText || ba(b)).indexOf(a) } }), lang: e(function (a) {
                    Ca.test(a || "") || b.error("unsupported lang: " + a); a = a.replace(I, J).toLowerCase(); return function (b) {
                        var c; do if (c = G ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-"); while ((b = b.parentNode) &&
                        1 === b.nodeType); return !1
                    }
                }), target: function (b) { var c = a.location && a.location.hash; return c && c.slice(1) === b.id }, root: function (a) { return a === H }, focus: function (a) { return a === z.activeElement && (!z.hasFocus || z.hasFocus()) && !(!a.type && !a.href && !~a.tabIndex) }, enabled: function (a) { return !1 === a.disabled }, disabled: function (a) { return !0 === a.disabled }, checked: function (a) { var b = a.nodeName.toLowerCase(); return "input" === b && !!a.checked || "option" === b && !!a.selected }, selected: function (a) {
                    a.parentNode && a.parentNode.selectedIndex;
                    return !0 === a.selected
                }, empty: function (a) { for (a = a.firstChild; a; a = a.nextSibling) if (6 > a.nodeType) return !1; return !0 }, parent: function (a) { return !q.pseudos.empty(a) }, header: function (a) { return Ea.test(a.nodeName) }, input: function (a) { return Da.test(a.nodeName) }, button: function (a) { var b = a.nodeName.toLowerCase(); return "input" === b && "button" === a.type || "button" === b }, text: function (a) { var b; return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase()) }, first: l(function () { return [0] }),
                last: l(function (a, b) { return [b - 1] }), eq: l(function (a, b, c) { return [0 > c ? c + b : c] }), even: l(function (a, b) { for (var c = 0; c < b; c += 2) a.push(c); return a }), odd: l(function (a, b) { for (var c = 1; c < b; c += 2) a.push(c); return a }), lt: l(function (a, b, c) { for (b = 0 > c ? c + b : c; 0 <= --b;) a.push(b); return a }), gt: l(function (a, b, c) { for (c = 0 > c ? c + b : c; ++c < b;) a.push(c); return a })
            }
        }; q.pseudos.nth = q.pseudos.eq; for (S in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) q.pseudos[S] = f(S); for (S in { submit: !0, reset: !0 }) q.pseudos[S] = k(S); t.prototype = q.filters =
        q.pseudos; q.setFilters = new t; V = b.tokenize = function (a, d) { var e, g, h, m, f, k, l; if (f = oa[a + " "]) return d ? 0 : f.slice(0); f = a; k = []; for (l = q.preFilter; f;) { if (!e || (g = ya.exec(f))) g && (f = f.slice(g[0].length) || f), k.push(h = []); e = !1; if (g = za.exec(f)) e = g.shift(), h.push({ value: e, type: g[0].replace(Z, " ") }), f = f.slice(e.length); for (m in q.filter) if ((g = da[m].exec(f)) && (!l[m] || (g = l[m](g)))) e = g.shift(), h.push({ value: e, type: m, matches: g }), f = f.slice(e.length); if (!e) break } return d ? f.length : f ? b.error(a) : oa(a, k).slice(0) }; ha = b.compile =
        function (a, b) { var c, d = [], e = [], g = pa[a + " "]; if (!g) { b || (b = V(a)); for (c = b.length; c--;) g = ga(b[c]), g[x] ? d.push(g) : e.push(g); g = pa(a, ua(e, d)); g.selector = a } return g }; ka = b.select = function (a, b, c, d) {
            var e, g, h, f, m = "function" === typeof a && a, k = !d && V(a = m.selector || a); c = c || []; if (1 === k.length) {
                g = k[0] = k[0].slice(0); if (2 < g.length && "ID" === (h = g[0]).type && v.getById && 9 === b.nodeType && G && q.relative[g[1].type]) { if (b = (q.find.ID(h.matches[0].replace(I, J), b) || [])[0]) m && (b = b.parentNode); else return c; a = a.slice(g.shift().value.length) } for (e =
                da.needsContext.test(a) ? 0 : g.length; e--;) { h = g[e]; if (q.relative[f = h.type]) break; if (f = q.find[f]) if (d = f(h.matches[0].replace(I, J), ea.test(g[0].type) && n(b.parentNode) || b)) { g.splice(e, 1); a = d.length && w(g); if (!a) return L.apply(c, d), c; break } }
            } (m || ha(a, k))(d, b, !G, c, ea.test(a) && n(b.parentNode) || b); return c
        }; v.sortStable = x.split("").sort(ia).join("") === x; v.detectDuplicates = !!T; K(); v.sortDetached = h(function (a) { return a.compareDocumentPosition(z.createElement("div")) & 1 }); h(function (a) {
            a.innerHTML = "<a href='#'></a>";
            return "#" === a.firstChild.getAttribute("href")
        }) || g("type|href|height|width", function (a, b, c) { if (!c) return a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2) }); (!v.attributes || !h(function (a) { a.innerHTML = "<input/>"; a.firstChild.setAttribute("value", ""); return "" === a.firstChild.getAttribute("value") })) && g("value", function (a, b, c) { if (!c && "input" === a.nodeName.toLowerCase()) return a.defaultValue }); h(function (a) { return null == a.getAttribute("disabled") }) || g("checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        function (a, b, c) { var d; if (!c) return !0 === a[b] ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null }); "function" === typeof u && u.amd ? u(function () { return b }) : "undefined" !== typeof module && module.exports ? module.exports = b : a.Sizzle = b
    })(window); b.browser = function () {
        var a, c = {}, d = navigator.userAgent.toLowerCase().replace(/\s*[()]\s*/g, "; ").replace(/(\/[\w.]+)\s+/g, "$1; ").replace(/\;\s*$/, "").split(/;\s*/); b.each(d, function (b) {
            a = (/[\/ :]([^\/ :]+)$/.exec(b) || [])[1]; c[a ? b.substr(0, b.length - a.length -
            1).replace(/\d*$/, "") : b] = a || !0
        }); return { aol: c.aol, blackberry: c.blackberry, ie: c.msie, ios: c.mobile && c.safari, opera: c.opera, playstation: c.playstation, version: parseFloat(c.version || c.crios || c.msie) || !1 }
    }(); b.platforms = function () {
        var a = {
            bbp: { id_finder: ["div", /^post-(\d+)$/], scope: "li .post" }, hdlr: { id_finder: ["div", /^post_(\d+)$/], scope: ".post-content-area" }, ipb: { id_finder: ["div", /^post_id_(\d+)$/], scope: ".post_body .post" }, phpb: { id_finder: ["div.post", /^p(\d+)$/], scope: ".postbody .content,.postbody .signature" },
            ubb: { id_finder: ["a", /^Post(\d+)$/, "name"], scope: ".post_inner *[id^='body'],.post_inner .signature" }, vb3: { id_finder: ["div[id], table[id]", /^post(\d+)$/], scope: "td[id^='td_post_'] div[id^='post_message_'],td[id^='td_post_'] div[id^='post_message_'] ~ div:not([class])" }, vb4: { id_finder: ["li", /^post_(\d+)$/], scope: ".post-content,.postbody .content,.postbody .signature,ul.conversation-list .list-item-body" }, wppr: { id_finder: ["div", /^post-(\d+)$/], scope: null }
        }; return function (c) {
            return b.extend(a[c] || {},
            { getPostIDs: function () { var a = [], c = this.id_finder; c && b.each(b.select(c[0]), function (b) { var g = c[2] || "id"; (b = b[g] ? b[g].match(c[1]) : null) && a.push(b[1]) }); return a.length ? a : null } })
        }
    }(); b.traits = {
        basicCompatibility: !(b.browser.blackberry || b.browser.playstation), cors: window.XMLHttpRequest && void 0 !== (new window.XMLHttpRequest).withCredentials, crossWindowCommunication: !b.browser.ios, json: Boolean(window.JSON) && Boolean(window.JSON.stringify) && Boolean(window.JSON.parse), jsRedirectSetsReferrer: b.browser.aol ||
        !(b.browser.ie || b.browser.opera), quirksMode: !Boolean(window.addEventListener), windowLevelHandlers: Boolean(window.addEventListener)
    }; var k, n, r; f = {
        PLUGIN_MANUAL: 1, TYPE_ACCEPTABLE: "l", api: function () {
            var a = function (a, c, h) { h = h || {}; c = b.extend(f.commonParams(a), c); c.subId && c.key !== k.key && (c.subId = null); return { method: a, opts: h, params: c } }, c = function (a) { return b.request(k.api_url + "/" + a.method, a.params, a.opts) }; return b.batchable({
                batch: function () {
                    var d = function (a, c) {
                        a = b.fromJSON(a) || {}; b.each(a, function (a, d) {
                            var e,
                            f = c[d]; a && f && ("domains" === d && "array" === b.type(a) && (a = { results: a }), a = "string" === b.type(a) && (e = a.match(/^\s*\w+\((.*)\);?\s*$/)) ? b.fromJSON("[" + e[1] + "]") || {} : [a], f.apply(window, a))
                        })
                    }; return function (e) { var h = {}, g = {}; b.each(e, function (c) { c = a.apply(this, c); g[c.method] = c.opts.fn || b.noop; h[c.method] = b.prune(c.params) }); c({ method: "batch", params: b.extend(f.commonParams(), { batch: window.JSON.stringify(h) }), opts: { jsonp: !1, fn: function (a) { d(a, g) } } }) }
                }(), single: function (b, e, h) { b = a(b, e, h); return c(b) }
            })
        }(), addEventListener: function (a,
        b) { this.fire(a, b) }, click: function () {
            var a = function (a, c) { if ("_self" === c) return a; if (b.traits.crossWindowCommunication && b.traits.jsRedirectSetsReferrer) { var h = a.open("", c); h.focus(); return h } }, c = function (a) {
                var c = a.previousSibling, h = a.nextSibling, g = ["", a.textContent, ""], m = function (a, b) { for (var c = a, d = c.data; (c = c[b + "Sibling"]) && 3 === c.nodeType;) d += c.data; return d }, k = function (a, b, c) {
                    a = a.replace(/\s+/g, " "); b = b.replace(/\s+/g, " "); c = c.replace(/\s+/g, " "); a = a.replace(/^\s+/, ""); " " === b.substr(0, 1) && (b = b.substr(1),
                    a += " " !== a.substr(a.length - 1, 1) ? " " : ""); " " === b.substr(b.length - 1, 1) && (b = b.substr(0, b.length - 1), c = (" " !== c.substr(0, 1) ? " " : "") + c); c = c.replace(/\s+$/, ""); return [a, b, c]
                }; void 0 !== g[1] && (g[0] = c && 3 === c.nodeType ? m(c, "previous") : "", g[2] = h && 3 === h.nodeType ? m(h, "next") : "", g = k.apply(this, g), "" !== g[0] && "" !== g[2] && (g[0] = g[0].split(" ").reverse().slice(0, 10 + (" " === g[0].substr(g[0].length - 1, 1) ? 1 : 0)).reverse().join(" "), g[2] = g[2].split(" ").slice(0, 10).join(" "), a = {
                    type: "context", itype: (b.cache(a, "params") || {}).type,
                    before: g[0], after: g[2], txt: g[1], loc: location.href, out: b.getActualHref(a), v: 2
                }, f.log("info", b.toQuery(a))))
            }; return function (d, e) {
                var h, g, f, l, p = b.context(d) || window; e = d.target || e; e = !e || e === p.name || "_top" === e && p.top === p || "_parent" === e && p.parent === p ? "_self" : e; f = a(p, e); if ("_self" !== e && (!b.traits.crossWindowCommunication || !b.traits.jsRedirectSetsReferrer)) l = "go"; else try { if (void 0 === f.document) throw !0; l = "jsonp" } catch (n) { l = "go" } h = b.destructing(b.bind(function () {
                    k.time_click && arguments.length && this.logTime("clk");
                    var a = b.toArray(arguments); a.unshift(d, f, e); this.onApiClick.apply(this, a)
                }, this)); b.cache(this, "link", "string" === typeof d ? d : b.getActualHref(d)); if ("string" === typeof d && (d = b.createA(d, e), !this.processLink(d)) || !k.enabled) return h(); g = this.clickParams(d, l); this.logTime(); k.log_context && c(d); if ("go" === l) this.redirect(this.api.now("click", g, { "return": !0 }), p, f, e); else if (f === p) this.api.now("click", g, { fn: h, timeout: k.click_timeout }); else {
                    if (b.contextIsAncestor(p, f)) return this.redirect(b.getActualHref(d),
                    p, f, e); h = b.exceptionLogger(h); setTimeout(function () { h() }, k.click_timeout); f.document.open(); f.callback = h; f.document.write("<html><head><title>" + b.getActualHref(d) + '</title><script type="text/javascript" src="' + this.api.now("click", g, { fn: "callback", "return": !0 }) + '">\x3c/script></head></html>'); f.document.close()
                }
            }
        }(), clickParams: function (a, c) {
            var d = b.extend(b.cache(a, "params"), { format: c, out: b.getActualHref(a), ref: window.document.referrer || null, reaf: k.reaffiliate || null, title: window.document.title, txt: a.innerHTML });
            128 < d.txt.length && (d.txt = d.txt.replace(/<[^>]+>/g, ""), d.txt = 128 < d.txt.length ? d.txt.substr(0, 125) + "..." : d.txt); return d
        }, commonParams: function (a) { var c = { drKey: k.key ? null : k.dr_key, key: k.key, libId: k.library_id }; ("click" === a || "ping" === a) && b.extend(c, { cuid: k.cuid, loc: location.href, subId: k.sub_id, v: 1 }, c); return c }, detectFiltering: function () {
            var a; try {
                a = {}, a = new function () {
                    this.detect = function (a, b) {
                        function c(a, b) { 0 == k || 1E3 < b ? a(0 == k && f) : setTimeout(function () { c(a, 2 * b) }, 2 * b) } function g() { --k || (f = !l && n) } var f =
                        !1, k = 2, l = !1, n = !1; if ("function" == typeof b) { a += "?ch=*&rn=*"; var w = 11 * Math.random(), t = new Image; t.onload = g; t.onerror = function () { l = !0; g() }; t.src = a.replace(/\*/, 1).replace(/\*/, w); t = new Image; t.onload = g; t.onerror = function () { n = !0; g() }; t.src = a.replace(/\*/, 2).replace(/\*/, w); c(b, 250) }
                    }
                }
            } catch (c) { a = { detect: function (a, b) { b(!0) } } } return function (c) { var e = b.updateUrl(k.asset_url, { pathname: "/images/pixel.gif" }); a.detect(e, c) }
        }(), enabled: function () {
            if (k.enabled && n !== window && window.vglnk && (window.vglnk.key || "function" ===
            typeof window.vglnk)) k.enabled = !1; return k.enabled
        }, expose: function (a, c) { if (c = c || this[a]) "function" === typeof c ? c = b.exceptionLogger(b.bind(c, this)) : "object" === typeof c && (c = b.clone(c)), r[a] || (r[a] = c) }, fire: function () { var a = {}; return function (c, d) { c = c.toLowerCase(); var e = a[c] || { fired: !1, listeners: [] }; "function" === typeof d ? e.fired ? setTimeout(function () { d({ type: c }) }, 0) : e.listeners.push(d) : (e.fired = !0, b.each(e.listeners, function (a) { "function" === typeof a && a({ type: c }) }), e.listeners = []); a[c] = e } }(), handleRightClick: function (a,
        c) { if (k.rewrite_modified && a && c) switch (c) { case "setup": b.cache(a, "href") || b.cache(a, "href", a.href); a.href = this.api.now("click", this.clickParams(a, "go"), { "return": !0 }); setTimeout(b.exceptionLogger(b.bind(function () { this.handleRightClick(a, "teardown") }, this)), 0); break; case "teardown": a.href = b.cache(a, "href"), b.cache(a, "href", null) } }, harmony: function () { b.harmony = { UNSAFE_QUIRKSMODE_HANDLERS: 0, LINK_LEVEL_EVENTS: -1 }; return function (a) { return k.harmony_level <= a } }(), init: b.exceptionLogger(function () {
            return function () {
                var a =
                !0 === window.document.__v5k; window.document.__v5k = !0; a || (this.initLibEvents(), this.initNamespace(), this.initOptions(), b.exceptionLogger(b.bind(this.logException, this), !k.dev), this.initProcessors(), this.initDRApi(), this.initApi(), this.enabled() && (this.initLegacyCallbacks(), this.ping()))
            }
        }()), initApi: function () {
            var a, c = {}; if (window.vglnk) for (a in window.vglnk) "_plugin" === a.substr(-7) && (c[a] = window.vglnk[a]); r = n[l] = b.noop; this.expose("click"); this.expose("link", b.bind(function (a) {
                "element" === b.type(a) &&
                a.href && (this.initContext(b.context(a)), this.processLink(a))
            }, this)); this.expose("open", b.bind(this.click, this)); this.expose("$", b.clone(b)); this.expose("api"); this.expose("opt"); this.expose("registerProcessor", function () { if (0 < arguments.length) return f.registerProcessor.apply(f, arguments) }); b.extend(r, r === window.vglnk ? c : {})
        }, initContext: function () { var a = []; return function (c) { if (void 0 === c) return a; c && !b.contains(a, c) && (a.push(c), this.initLinks(c), this.initEvents(c)) } }(), initDRApi: function () {
            var a =
            !1; window.DrivingRevenue = b.exceptionLogger(b.destructing(b.bind(function () { a = !0; k.dr_key = window.DR_id; this.enabled() && this.ping() }, this))); b.on("DOMReady", function () { if (!a) try { delete window.DrivingRevenue } catch (b) { window.DrivingRevenue = void 0 } })
        }, initEvents: function (a) {
            var c = { left: f.onClick, right: f.onContextmenu }, d = { left: b.noop, right: b.noop }, e = b.traits.windowLevelHandlers ? a : a.document, h = function (e) {
                e = e || a.event; if ((e = b.eventLink(e)) && !b.cache(e, "evented")) g(e, f.harmony(b.harmony.LINK_LEVEL_EVENTS) ?
                        c : d), b.cache(e, "evented", !0)
            }, g = function (a, c) { b.on(a, "click", b.bind(c.left, f)); b.on(a, "contextmenu", b.bind(c.right, f)) }; b.on(e, "copy", b.bind(f.onCopy, f)); b.on(e, "mousedown", h); if (f.harmony(b.harmony.LINK_LEVEL_EVENTS)) b.on("DOMReady", function () { b.each(a.document.links, function (a) { b.on(a, "mousedown", h) }) }); (!b.traits.quirksMode || f.harmony(b.harmony.UNSAFE_QUIRKSMODE_HANDLERS)) && g(e, c)
        }, initLegacyOptions: function () {
            var a, b = {
                DR_id: "dr_key", vglnk_api_key: "key", vglnk_cuid: "cuid", vglnk_domain: "api_url",
                vglnk_reaf: "reaffiliate", vglnk_subid: "sub_id"
            }; for (a in b) void 0 !== window[a] && (r[b[a]] = window[a], "vglnk_domain" === a && (r[b[a]] += "/api"))
        }, initLegacyCallbacks: function () { var a, c = { vl_cB: b.bind(this.onApiClick, this), vl_disable: function () { k.enabled = !1 } }; for (a in c) window[a] = c[a] }, initLibEvents: function () { b.on(f); b.ready(b.bind(function () { this.fire("DOMReady") }, this)) }, initLinks: function (a) {
            var c = b.bind(function (a) { b.each(b.toArray(a.document.links), b.bind(this.processLink, this)) }, this); void 0 === a ? b.each(this.initContext(),
            c) : c(a)
        }, initNamespace: function () { window.vglnk && window.vglnk.key && (l = "vglnk"); var a = window, b = l.split("."), d; for (l = b.pop() ; 0 < b.length;) d = b.shift(), a[d] = a[d] || {}, a = a[d]; n = a; r = n[l] = n[l] || {} }, initOptions: function () {
            var a; this.initLegacyOptions(); k = b.extend(this.publicOptions({
                api_url: "//api.viglink.com/api", asset_url: "//cdn.viglink.com/api", cuid: null, dev: !1, dr_key: null, enabled: b.traits.basicCompatibility, key: null, partner: null, sub_id: null, reaffiliate: !1, commercial: null, harmony_level: 0, rewrite_modified: !1,
                rewrite_original: !0
            }), k, r, { click_timeout: 1E3, hop_timeout: 2E3, debug: !1, library_id: null, log_context: !0, nofollow: {}, norewrite: {}, plugins: { link_affiliation: {}, modified_clicks: {}, partner_integration: {} }, time_click: !1, time_ping: !1, testing_js: [] }); for (a in k) "_plugin" === a.substr(-7) && delete k[a]
        }, initPlugins: function () {
            var a, c = 1, d = {}, e = { link_affiliation: "convert", link_optimization: "optimize", partner_integration: "partners", product_linker: "insert", product_widget: "spotlight" }, h = function (b) {
                return function (b) {
                    return function () {
                        delete d[b].opts.mode;
                        c = 1; clearTimeout(a); g()
                    }
                }(b)
            }, g = function () {
                var e = !1, h = {}, m = function (a) { return function () { if (a) { var c = b.toArray(arguments); c.unshift("custom", a); f.log.apply(this, c) } } }; a = null; b.each(d, function (a, c) { a.setup = a.setup || window.vglnk && window.vglnk[c + "_plugin"]; a.setup ? (!a.run && "function" === b.type(a.setup) && (a.run = a.setup(a.opts, b.clone(b), r, m(a.opts.key || k.key)) || b.noop), a.opts.mode === f.PLUGIN_MANUAL ? h[c] = a : a.run()) : (e = !0, h[c] = a) }); d = h; e && (a = setTimeout(b.exceptionLogger(g), Math.min(Math.max(Math.pow(2, ++c),
                100), 5E3)))
            }, m = function () { setTimeout(function () { f.api.flush() }, 100); g(); b.on("DOMReady", function () { setTimeout(f.api.flush, 0) }) }; return function (a) { b.each(a, b.bind(function (a, b) { b = e[b] || b; "object" === typeof a && !1 !== a.enabled && (d[b] = { opts: a }, a.mode === this.PLUGIN_MANUAL && this.expose("init_" + b, h(b))) }, this)); m() }
        }(), initProcessors: function () {
            this.registerProcessor(function (a) {
                var c; c = b.createA(k.api_url); if ("/api/click" === a.pathname && (a.hostname === c.hostname || a.hostname.match(/(^|\.)(api|cdn|apicdn)\.viglink\.com$/))) c =
                b.fromQuery(a.search), void 0 !== c.out && (a.href = c.out, delete c.out, b.cache(a, "params", c))
            }); this.registerProcessor(function (a) { k.nofollow[a.href] && !b.hasRel(a, "nofollow") && (a.rel = (a.rel ? a.rel + " " : "") + "nofollow") }); this.registerProcessor(function (a) { window.IPBoard && (window.IPBoard.prototype && window.IPBoard.prototype.delegate && b.hasRel(a, "external")) && (a.rel = a.rel.replace(/(^| )external( |$)/, ""), a.target = "_blank") })
        }, isRewritable: function () {
            var a = b.canonicalizeHostname(document.location), c = b.generateNodeFilter({
                rels: ["norewrite",
                "noskim"], custom: function (c) { var e, h = ""; try { e = c.hostname, h = c.protocol, e.charAt(0) } catch (g) { return !0 } "" !== e && (e = b.canonicalizeHostname(c)); return "" === e || a === e || "object" === b.type(k.commercial) && !k.commercial[e] || !h.match(/^https?:$/i) || k.norewrite[e] || !(k.rewrite_original || b.cache(c, "type")) }
            }); return function (a) { return c(a, { ancestors: !1 }) }
        }(), log: function (a, c, d, e) {
            var h, g = b.toQuery({ libId: k.library_id, nocache: b.uniqid() }); h = "pixel.gif"; if ("custom" === a) g += "&" + b.toQuery({ key: c, type: d }), b.each("array" ===
            b.type(e) ? e : [e], function (a) { b.each(["e", "i", "o"], function (b) { delete a[b] }); g += "&" + b.toQuery(a) }); else { g += "&" + b.toQuery({ key: k.key, drKey: k.key ? null : k.dr_key }); if ("time" === a) h = "time.gif", a = { time: d, type: c }; else if ("exception" === a) a = { e: c, o: d }; else if ("info" === a) a = { i: c }; else return; g += "&" + b.toQuery(a) } h = k.api_url + "/" + h + "?" + g; b.transmitsPII(h) || (b.createEl("img").src = h)
        }, logException: function (a) {
            if (k.debug) {
                var c = { link: b.cache(this, "link"), loc: document.location.href, UA: navigator.userAgent }; "string" === typeof a ?
                c.message = a : c = b.extend(c, a); this.log("exception", a, b.toQuery(c))
            }
        }, logTime: function () { var a; return function (b) { 0 === arguments.length ? a = (new Date).getTime() : this.log("time", b, (new Date).getTime() - a) } }(), onApiClick: function (a, c, d, e, h) {
            var g = e || b.getActualHref(a), f = b.bind(function () { this.redirect(g, b.context(a), c, d) }, this); "object" === typeof h && (h.tracking || h.image) ? (e = b.createEl(h.tracking ? "iframe" : "img", { src: h.tracking || h.image }, { height: 0, width: 0, visibility: "hidden" }), document.body.appendChild(e), setTimeout(b.exceptionLogger(f),
            h.timeout || k.hop_timeout)) : f()
        }, onApiPing: function (a, c, d, e, h, g) {
            k.rewrite_original = !1; h = b.reformatKeys(h || {}); var m, l; e = function (a) { var c = {}, d = function (a) { b.isArray(a) ? c[a[0]] = a[1] : c[a] = 1 }; b.isArray(a) && b.each(a, d); return c }; l = b.extend(k.plugins, h.plugins); k = b.extend(k, h); delete k.plugins; k.library_id = a; k.click_timeout = c; k.time_ping && this.logTime("png"); "array" === b.type(k.testing_js) && 0 < k.testing_js.length && b.each(k.testing_js, function (a) { b.jsonp(a) }); b.extend(k.norewrite, e(d)); b.extend(k.nofollow,
            e(g)); for (m in k) "on" === m.toLowerCase().substr(0, 2) && (2 < m.length && "function" === b.type(k[m])) && (b.on(f, m.toLowerCase().substr(2), b.bind(k[m], window)), delete k[m]); this.initPlugins(l); this.initContext(window); this.fire("libready")
        }, onClick: function (a) { a = a || window.event; var c = a.ctrlKey || a.metaKey || a.altKey || a.shiftKey, d = a.which && 1 === a.which || 0 === a.button, e = b.eventLink(a); if (e && this.isRewritable(e) && !c && d && !b.isDefaultPrevented(a)) return this.click(e), b.preventDefault(a) }, onContextmenu: function (a) {
            (a =
            b.eventLink(a || window.event)) && this.isRewritable(a) && this.handleRightClick(a, "setup")
        }, onCopy: function (a) { var c, d, e, h = []; if (window.getSelection) { d = window.getSelection(); a = 0; for (c = d.rangeCount; a < c; a++) { try { e = d.getRangeAt(a).toString().replace(/((^)\s+|\s+$|\r)/g, "").replace(/\s*\n\s*/g, "\n") } catch (g) { } 0 < e.length && 128 >= e.length && h.push(e) } } b.each(h, function (a) { f.log("info", b.toQuery({ type: "selection", txt: a, loc: location.href })) }) }, opt: function (a, b) {
            void 0 !== b && void 0 !== this.publicOptions()[a] && (k[a] =
            b); return k[a]
        }, ping: function () { var a = !1; return function () { if (!a && (k.key || k.dr_key)) { var c = { ref: document.referrer || null }; a = !0; b.transmitsPII(this.api.now("ping", c, { "return": !0 })) || (this.logTime(), this.detectFiltering(b.bind(function (a) { a && (c.type = this.TYPE_ACCEPTABLE); this.api.now("ping", c, { fn: b.bind(this.onApiPing, this) }) }, this))) } } }(), processLink: function (a) {
            if (this.isRewritable(a)) {
                var c = b.cache(a, "processors") || {}; b.each(this.registerProcessor(), function (b) { c[b.id] || b.fn(a); c[b.id] = !0 }); b.cache(a,
                "processors", c); return a
            }
        }, publicOptions: function () { var a = {}; return function (c) { "object" === b.type(c) && (a = c); return b.extend({}, a) } }(), redirect: function (a, c, d, e) { !b.traits.crossWindowCommunication && !d ? (e = c.open(a, e), e.focus()) : b.traits.jsRedirectSetsReferrer ? setTimeout(b.exceptionLogger(function () { !d || d === c ? c.location = a : b.contextIsAncestor(c, d) ? d.location = a : d.location.replace(a) }), 0) : ("_blank" === e && (e = b.uniqid("win_")), e = b.createA(a, e), e.rel = "norewrite", c.document.body.appendChild(e), e.click(), e.parentNode.removeChild(e)) },
        registerProcessor: function () { var a = !1, c = [], d = function (d) { if (void 0 === d) return c; "function" === b.type(d) && (c.push({ id: b.uniqid(), fn: d }), a && this.initLinks()) }; d(function () { a = !0 }); return d }()
    }; f.init(); try { delete window.vglnk_self } catch (w) { }
})("undefined" === typeof vglnk_self ? "vglnk" : vglnk_self); window.vglnk = window.vglnk || {};
window.vglnk.convert_plugin = function (l, f, b) {
    var u = {}, k; l = f.extend({ any: !0 }, l); k = {
        getDomains: function () { var l = []; f.each(u, function (b, f) { l.push(f) }); 0 < l.length && b.api("domains", { domains: l.join("|") }, { fn: f.bind(k.onDomainApi, k) }) }, initDomainLookup: function () { var b = !1; return function () { b || (b = !0, f.on("DOMReady", f.bind(this.getDomains, this))) } }(), onDomainApi: function (k) { var l; "object" === f.type(k) && "array" === f.type(k.results) && (l = {}, f.each(k.results, function (b) { l[b] = !0 }), b.opt("commercial", l)) }, saveDomain: function (b) {
            b =
            f.canonicalizeHostname(b); u[b] = !0
        }, setup: function () { b.opt("rewrite_original", !0); l.any || b.registerProcessor(function (b) { k.initDomainLookup(); k.saveDomain(b) }) }
    }; return function () { k.setup() }
}; window.vglnk = window.vglnk || {}; window.vglnk.modified_clicks_plugin = function (l, f, b) { return function () { b.opt("rewrite_modified", !0) } }; window.vglnk = window.vglnk || {};
window.vglnk.partners_plugin = function (l, f) { var b = "https:" === document.location.protocol, u = { setup: function () { window._comscore = window._comscore || [] }, run: function () { var k = window._comscore; k && "function" === f.type(k.push) && (k.push({ c1: 8, c2: 17570528, c3: 1 }), f.jsonp("//" + (b ? "sb" : "b") + ".scorecardresearch.com/beacon.js")) } }; u.setup(); return function () { u.run() } }; window.vglnk = window.vglnk || {};
window.vglnk.dr_search_box_plugin = function (l, f, b) {
    l = f.extend({ key: null }, l); var u = {
        init: function () { f.each(this.getDRSearchForms(), function (b) { if (!f.cache(b, "evented")) { var l = u.getInput(b), r = function () { l.value || f.css(l, { "background-image": "url(http://cdn.viglink.com/images/ebay_watermark.gif)" }) }; f.cache(b, "evented", !0); b.onsubmit = null; l.onfocus = null; l.onblur = null; f.on(l, "focus", function () { f.css(l, { "background-image": "none" }) }); f.on(l, "blur", r); r(); f.on(b, "submit", function (f) { u.onSubmit(f, b) }) } }) },
        getDRSearchForms: function () { var b = []; f.each(document.getElementsByTagName("form"), function (f) { u.getInput(f) && f.id.match(/^DR-ebay-search(CSS|2)?$/i) && b.push(f) }); return b }, getInput: function (b) { return b.p || b.q2 }, onSubmit: function (k, n) { k = k || window.event; var r = "http://shop.ebay.com/i.html?" + f.toQuery({ _nkw: u.getInput(n).value }), r = f.createA(r, "_blank"); f.cache(r, "params", { key: l.key }); b.click(r); return f.preventDefault(k) }
    }; return function () { l.key && (u.init(), f.on("DOMReady", f.bind(u.init, u))) }
};
window.vglnk = window.vglnk || {};
window.vglnk.optimize_plugin = function (l, f, b, u) {
    var k, n = {}, r = 0; l = f.extend({ platform: null }, l); k = {
        getLinks: function () { var n = f.platforms(l.platform).getPostIDs(); b.api("optimize", { pt: l.platform, i: n ? n.join("|") : null, u: location.href }, { fn: f.bind(k.onOptimizeApi, k) }) }, log: function () { u("optimize", { ct: r }) }, onOptimizeApi: function (b) { "object" === f.type(b) && "object" === f.type(b.optLinks) && (n = b.optLinks, this.optimizeLinks({ data: !0 })) }, optimizeLink: function () {
            var b = f.generateNodeFilter({
                classes: ["nooptimize"], rels: ["nooptimize"],
                custom: function (a, b) { if (b) return Boolean(f.cache(a, "type")) }
            }), a = function (a) {
                var b = a.href, e = a.textContent || a.innerText, h = function () { var b = f.canonicalizeHostname(a); return f.canonicalizeHostname(f.createEl("a", { href: e })) === b }, g = function () { var b; return h() ? (b = f.fromQuery(a.search), f.find(b, function (a) { return a === e })) : !1 }; return {
                    exact: b === e || function () { var a = e.replace(/(\.\.\.|\u2026)$/, ""); return a === e ? !1 : b.substr(0, a.length) === a }() || g(), partial: function () {
                        var b = f.canonicalizeHostname(a); return RegExp("\\b" +
                        f.escapeRegExp(b) + "\\b", "i").test(e)
                    }() || -1 !== e.indexOf(b)
                }
            }; return function (c) { var d, e = n[c.href]; if (e && b(c)) { d = a(c); if (d.exact) { d = e.frdLink || e.optLink; for (var h; h = c.firstChild;) c.removeChild(h); c.appendChild(document.createTextNode(d)) } else if (d.partial) return; f.cache(c, "params", { type: "LO", origOutId: e.pcid + ":" + e.linkId }); c.href = e.optLink; r++ } }
        }(), optimizeLinks: function () {
            var l = { data: !1, timing: !1 }; return function (a) {
                l = f.extend(l, a); l.timing && (l.data && n) && (b.registerProcessor(f.bind(this.optimizeLink,
                k)), setTimeout(function () { k.log() }, 0))
            }
        }(), setup: function () { if (!l.platform || "full" === l.platform) this.getLinks(); else f.on("DOMReady", f.bind(this.getLinks, this)) }
    }; k.setup(); return function () { f.on("DOMReady", function () { k.optimizeLinks({ timing: !0 }) }) }
}; window.vglnk = window.vglnk || {}; window.vglnk.page_harmony_plugin = function (l, f, b) { l = f.extend({ level: null }, l); return function () { var f = parseInt(l.level, 10); isFinite(f) && b.opt("harmony_level", f) } }; window.vglnk = window.vglnk || {};
window.vglnk.insert_plugin = function (l, f, b, u) {
    var k, n, r = null, w = {}, a, c = 0, d = 0, e = 0, h = 0; l = f.extend({ cat: null, platform: null, key: null, link_phrases: !0, link_urls: !0, link_target: null, per_page: null, per_phrase: 5, product_source: null, proximity: null, same_proximity: 100, scope: null, type: null, ui: !0 }, l); if (l.key) return k = f.platforms(l.platform), n = {
        addPhrasesToMatcher: function (b) {
            var c = ""; "regexp" === f.type(b) ? c = b.source : "array" === f.type(b) && (c = "(?:^|[\\s\"'\\(])(" + f.map(b, f.escapeRegExp).join("|") + ")(?=\\s|\\W*$|\\W{2})");
            "" !== c && (a = RegExp(a ? "(?:" + c + "|" + a.source + ")" : c, "i"))
        }, focusLink: function (a) { a.id || (a.id = f.uniqid("vl-link-")); location.href.hash = "#" + a.id; window.scrollBy(0, -150) }, getPhrases: function () { var a = k.getPostIDs(); b.api("insert", f.extend(n.getPartnerParams(), { cat: l.cat, mode: l.mode, pt: l.platform, ps: l.product_source, i: a ? a.join("|") : null, u: location.href, type: l.type }), { fn: f.bind(n.onInsertApi, n) }) }, getPartnerParams: function () {
            var a, c, d = b.opt("partner"), e = {}; for (a in d) break; if (a) for (c in d[a]) e[a + "_" + c] = d[a][c];
            return e
        }, initLink: function (a, c, d) { if (d = l.link_target || d) a.target = d; a.rel = "nofollow"; a.href || (a.href = c.url); f.cache(a, "params", { exp: r, key: l.key, mid: c.mid, type: c.type || null }); f.cache(a, "href", a.href); b.link(a) }, insertLinks: function () {
            var b = { data: l.link_phrases ? !1 : l.link_urls, timing: !1 }, k = function (a, b) {
                var c; c = f.createEl("a"); c.innerHTML = a.replace(/([a-z0-9]+ *|[^a-z0-9]+)/ig, "<span>$1</span>"); c.className = "vglnk"; f.cache(c, "type", "inserted"); f.cache(c, "phrase", a); l.ui && (c.title = "Link added by VigLink");
                n.initLink(c, b); return c
            }, r = function (b, g) {
                for (var p, n, r, s, u = function (a) { var b; a = !a || !l.per_phrase || !a.count || a.count < l.per_phrase; b = !l.per_page || c < l.per_page; return a && b }, B = function (a, b) {
                var c, d, e, g, h, k, m, p, n, s, t = function (b) { n.parentNode.insertBefore(a, n); n.parentNode.removeChild(n); return b }, r = function (a, b, c) { a = f.extend({}, a); a.x1 -= c; a.y1 -= c; a.x2 += c; a.y2 += c; return a.x1 < b.x2 && a.x2 > b.x1 && a.y1 < b.y2 && a.y2 > b.y1 }; n = f.createEl("span"); a.parentNode.insertBefore(n, a); n.appendChild(a); s = f.geometry(n); if (l.proximity ||
                l.same_proximity) for (k in w) if ((m = w[k].links) && !(w[k] === b && !l.same_proximity || w[k] !== b && !l.proximity)) { p = w[k] === b ? Math.max(l.same_proximity, l.proximity) : l.proximity; c = 0; for (d = m.length; c < d; c++) { h = m[c].segments; e = 0; for (g = h.length; e < g; e++) if (r(h[e].geometry, s, p)) return t(!1) } } return t(!0)
                }, C = function (a, b) {
                var c, d, e, g, h = { el: a, segments: [] }, k = a.getElementsByTagName("span"), l = { els: [] }; c = 0; for (d = k.length; c < d; c++) e = k[c], void 0 === g || e.offsetTop === g.offsetTop ? l.els.push(e) : (h.segments.push(l), l = { els: [e] }), g =
                e; l.geometry = f.geometry.apply(f, l.els); h.segments.push(l); b.links = b.links || []; b.links.push(h); return b
                }; b && b.data && (Boolean(r = b.data.match(/^\s+/)) || Boolean(r = b.data.match(a))) ;) n = r[0], s = r.slice(1).join(""), p = w[s.toLowerCase()], n = b.data.indexOf(n) + n.length - s.length, 0 < n && (b = b.splitText(n)), n = b.length <= s.length ? null : b.splitText(s.length), s && !p && (p = { url: s.match(/^https?:\/\//i) ? s : "http://" + s, type: "U" }), s && (u(p) && B(b, p)) && (s = k(s, p), f.cache(s, "unlinked") || ("U" === p.type ? h++ : "L" === p.type.toUpperCase() ? d++ :
                e++, g(s, b), C(s, p), p.count++, c++)), b = n
            }, p = function (b) { var c = !1, d = b.parentNode, e = function (a, b) { d.insertBefore(a, b); d.removeChild(b) }; b.data && (c = a.test(b.data.replace(/\s+/, " "))); c && r(b, e) }, u = f.generateNodeFilter({ classes: ["nolinks", "atma-nolink", "atma-nolinks"], tags: "applet embed object head img input link map meta param select button iframe option script style svg textarea title".split(" "), custom: function (a) { return f.matches(a, "a[href]") } }), C = function (a) {
                var b; if (a) {
                    if (u(a, { ancestors: !1, self: !0 })) for (b =
                    a.firstChild; b;) a = b.nextSibling, 1 === b.nodeType ? C(b) : 3 === b.nodeType && p(b), b = a
                } else f.each(f.select(l.scope), function (a) { u(a, { ancestors: !0, self: !1 }) && C(a) })
            }; return function (c) { b = f.extend(b, c); b.timing && (b.data && a) && (C(), n.log()) }
        }(), loadPhrases: function (a) {
            var b, c, d, e = []; b = 0; for (c = a.length; b < c; b++) d = a[b], d.phrase && d.url && (d.phrase = d.phrase.toLowerCase(), w[d.phrase] || (e.push(d.phrase), w[d.phrase] = { count: w[d.phrase] ? w[d.phrase].count : 0, phrase: d.phrase, mid: d.mid, url: d.url, type: d.type || "" })); 0 < e.length &&
            this.addPhrasesToMatcher(e); this.insertLinks({ data: !0 })
        }, log: function () { var a, b, f = { heavy: [], lite: [] }, k = function (a, b) { return b.split(",")[0] - a.split(",")[0] }; for (a in w) b = parseInt(w[a].count, 10), 0 < b && (b = [b, a.replace(/\|/g, "%7C")].join(), f["L" === w[a].type.toUpperCase() ? "lite" : "heavy"].push(b)); f.lite.sort(k); f.heavy.sort(k); u("insert", [{ ct: c, cl: d, ch: e, cu: h, exp: r }, { pl: f.lite.join("|") }, { ph: f.heavy.join("|") }]) }, onInsertApi: function (a) { "object" === f.type(a) && (r = a.exp, a.results && this.loadPhrases(a.results)) },
        setup: function () {
            l.scope = l.scope || k.scope || "body"; l.link_urls && this.addPhrasesToMatcher(RegExp("(?:(?:\\b(https?://)|(?:^|\\s)\\W*(www\\d{0,3}\\.|(?:[a-z0-9-]+\\.)+[a-z]{2,4}/))((?:[^\\s()<>]+|\\((?:[^\\s()<>]|(?:\\([^\\s()<>]+\\)))*\\))+(?:\\((?:[^\\s()<>]|(?:\\([^\\s()<>]+\\)))*\\)|[^\\s`!()\\[\\]{};:'\".,<>?\u00ab\u00bb\u201c\u201d\u2018\u2019]))|(?:^|\\s)\\W*((?:[a-z0-9-]+\\.)+com(?:/|\\b)))", "i")); if (l.link_phrases) if (!l.platform || "full" === l.platform) this.getPhrases(); else f.on("DOMReady", f.bind(this.getPhrases,
            this))
        }
    }, n.setup(), function () { f.on("DOMReady", function () { n.insertLinks({ timing: !0 }) }) }
}; window.vglnk = window.vglnk || {}; window.vglnk.spotlight_plugin = function (l, f, b) { window.vglnk.spotlight_plugin.exports = { $: f, opts: l, vglnk: b }; return function () { (!f.browser.ie || 6 < f.browser.version) && f.jsonp(b.opt("asset_url") + "/spotlight.js") } };
