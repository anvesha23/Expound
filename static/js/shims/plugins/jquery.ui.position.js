/*!
 * jQuery UI Position 1.10.3
 * http://jqueryui.com
 *
 * Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/position/
 */
!function(a, b) {
    function c(a, b, c) {
        return [parseFloat(a[0]) * (n.test(a[0]) ? b / 100 : 1), parseFloat(a[1]) * (n.test(a[1]) ? c / 100 : 1)]
    }
    function d(b, c) {
        return parseInt(a.css(b, c), 10) || 0
    }
    function e(b) {
        var c = b[0];
        return 9 === c.nodeType ? {
            width: b.width(),
            height: b.height(),
            offset: {
                top: 0,
                left: 0
            }
        } : a.isWindow(c) ? {
            width: b.width(),
            height: b.height(),
            offset: {
                top: b.scrollTop(),
                left: b.scrollLeft()
            }
        } : c.preventDefault ? {
            width: 0,
            height: 0,
            offset: {
                top: c.pageY,
                left: c.pageX
            }
        } : {
            width: b.outerWidth(),
            height: b.outerHeight(),
            offset: b.offset()
        }
    }
    a.ui = a.ui || {};
    var f,
        g = Math.max,
        h = Math.abs,
        i = Math.round,
        j = /left|center|right/,
        k = /top|center|bottom/,
        l = /[\+\-]\d+(\.[\d]+)?%?/,
        m = /^\w+/,
        n = /%$/,
        o = a.fn.position;
    a.position = {
        scrollbarWidth: function() {
            if (f !== b)
                return f;
            var c,
                d,
                e = a("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                g = e.children()[0];
            return a("body").append(e), c = g.offsetWidth, e.css("overflow", "scroll"), d = g.offsetWidth, c === d && (d = e[0].clientWidth), e.remove(), f = c - d
        },
        getScrollInfo: function(b) {
            var c = b.isWindow ? "" : b.element.css("overflow-x"),
                d = b.isWindow ? "" : b.element.css("overflow-y"),
                e = "scroll" === c || "auto" === c && b.width < b.element[0].scrollWidth,
                f = "scroll" === d || "auto" === d && b.height < b.element[0].scrollHeight;
            return {
                width: f ? a.position.scrollbarWidth() : 0,
                height: e ? a.position.scrollbarWidth() : 0
            }
        },
        getWithinInfo: function(b) {
            var c = a(b || window),
                d = a.isWindow(c[0]);
            return {
                element: c,
                isWindow: d,
                offset: c.offset() || {
                    left: 0,
                    top: 0
                },
                scrollLeft: c.scrollLeft(),
                scrollTop: c.scrollTop(),
                width: d ? c.width() : c.outerWidth(),
                height: d ? c.height() : c.outerHeight()
            }
        }
    }, a.fn.position = function(b) {
        if (!b || !b.of)
            return o.apply(this, arguments);
        b = a.extend({}, b);
        var f,
            n,
            p,
            q,
            r,
            s,
            t = a(b.of),
            u = a.position.getWithinInfo(b.within),
            v = a.position.getScrollInfo(u),
            w = (b.collision || "flip").split(" "),
            x = {};
        return s = e(t), t[0].preventDefault && (b.at = "left top"), n = s.width, p = s.height, q = s.offset, r = a.extend({}, q), a.each(["my", "at"], function() {
            var a,
                c,
                d = (b[this] || "").split(" ");
            1 === d.length && (d = j.test(d[0]) ? d.concat(["center"]) : k.test(d[0]) ? ["center"].concat(d) : ["center", "center"]), d[0] = j.test(d[0]) ? d[0] : "center", d[1] = k.test(d[1]) ? d[1] : "center", a = l.exec(d[0]), c = l.exec(d[1]), x[this] = [a ? a[0] : 0, c ? c[0] : 0], b[this] = [m.exec(d[0])[0], m.exec(d[1])[0]]
        }), 1 === w.length && (w[1] = w[0]), "right" === b.at[0] ? r.left += n : "center" === b.at[0] && (r.left += n / 2), "bottom" === b.at[1] ? r.top += p : "center" === b.at[1] && (r.top += p / 2), f = c(x.at, n, p), r.left += f[0], r.top += f[1], this.each(function() {
            var e,
                j,
                k = a(this),
                l = k.outerWidth(),
                m = k.outerHeight(),
                o = d(this, "marginLeft"),
                s = d(this, "marginTop"),
                y = l + o + d(this, "marginRight") + v.width,
                z = m + s + d(this, "marginBottom") + v.height,
                A = a.extend({}, r),
                B = c(x.my, k.outerWidth(), k.outerHeight());
            "right" === b.my[0] ? A.left -= l : "center" === b.my[0] && (A.left -= l / 2), "bottom" === b.my[1] ? A.top -= m : "center" === b.my[1] && (A.top -= m / 2), A.left += B[0], A.top += B[1], a.support.offsetFractions || (A.left = i(A.left), A.top = i(A.top)), e = {
                marginLeft: o,
                marginTop: s
            }, a.each(["left", "top"], function(c, d) {
                a.ui.position[w[c]] && a.ui.position[w[c]][d](A, {
                    targetWidth: n,
                    targetHeight: p,
                    elemWidth: l,
                    elemHeight: m,
                    collisionPosition: e,
                    collisionWidth: y,
                    collisionHeight: z,
                    offset: [f[0] + B[0], f[1] + B[1]],
                    my: b.my,
                    at: b.at,
                    within: u,
                    elem: k
                })
            }), b.using && (j = function(a) {
                var c = q.left - A.left,
                    d = c + n - l,
                    e = q.top - A.top,
                    f = e + p - m,
                    i = {
                        target: {
                            element: t,
                            left: q.left,
                            top: q.top,
                            width: n,
                            height: p
                        },
                        element: {
                            element: k,
                            left: A.left,
                            top: A.top,
                            width: l,
                            height: m
                        },
                        horizontal: 0 > d ? "left" : c > 0 ? "right" : "center",
                        vertical: 0 > f ? "top" : e > 0 ? "bottom" : "middle"
                    };
                l > n && h(c + d) < n && (i.horizontal = "center"), m > p && h(e + f) < p && (i.vertical = "middle"), i.important = g(h(c), h(d)) > g(h(e), h(f)) ? "horizontal" : "vertical", b.using.call(this, a, i)
            }), k.offset(a.extend(A, {
                using: j
            }))
        })
    }, a.ui.position = {
        fit: {
            left: function(a, b) {
                var c,
                    d = b.within,
                    e = d.isWindow ? d.scrollLeft : d.offset.left,
                    f = d.width,
                    h = a.left - b.collisionPosition.marginLeft,
                    i = e - h,
                    j = h + b.collisionWidth - f - e;
                b.collisionWidth > f ? i > 0 && 0 >= j ? (c = a.left + i + b.collisionWidth - f - e, a.left += i - c) : a.left = j > 0 && 0 >= i ? e : i > j ? e + f - b.collisionWidth : e : i > 0 ? a.left += i : j > 0 ? a.left -= j : a.left = g(a.left - h, a.left)
            },
            top: function(a, b) {
                var c,
                    d = b.within,
                    e = d.isWindow ? d.scrollTop : d.offset.top,
                    f = b.within.height,
                    h = a.top - b.collisionPosition.marginTop,
                    i = e - h,
                    j = h + b.collisionHeight - f - e;
                b.collisionHeight > f ? i > 0 && 0 >= j ? (c = a.top + i + b.collisionHeight - f - e, a.top += i - c) : a.top = j > 0 && 0 >= i ? e : i > j ? e + f - b.collisionHeight : e : i > 0 ? a.top += i : j > 0 ? a.top -= j : a.top = g(a.top - h, a.top)
            }
        },
        flip: {
            left: function(a, b) {
                var c,
                    d,
                    e = b.within,
                    f = e.offset.left + e.scrollLeft,
                    g = e.width,
                    i = e.isWindow ? e.scrollLeft : e.offset.left,
                    j = a.left - b.collisionPosition.marginLeft,
                    k = j - i,
                    l = j + b.collisionWidth - g - i,
                    m = "left" === b.my[0] ? -b.elemWidth : "right" === b.my[0] ? b.elemWidth : 0,
                    n = "left" === b.at[0] ? b.targetWidth : "right" === b.at[0] ? -b.targetWidth : 0,
                    o = -2 * b.offset[0];
                0 > k ? (c = a.left + m + n + o + b.collisionWidth - g - f, (0 > c || c < h(k)) && (a.left += m + n + o)) : l > 0 && (d = a.left - b.collisionPosition.marginLeft + m + n + o - i, (d > 0 || h(d) < l) && (a.left += m + n + o))
            },
            top: function(a, b) {
                var c,
                    d,
                    e = b.within,
                    f = e.offset.top + e.scrollTop,
                    g = e.height,
                    i = e.isWindow ? e.scrollTop : e.offset.top,
                    j = a.top - b.collisionPosition.marginTop,
                    k = j - i,
                    l = j + b.collisionHeight - g - i,
                    m = "top" === b.my[1],
                    n = m ? -b.elemHeight : "bottom" === b.my[1] ? b.elemHeight : 0,
                    o = "top" === b.at[1] ? b.targetHeight : "bottom" === b.at[1] ? -b.targetHeight : 0,
                    p = -2 * b.offset[1];
                0 > k ? (d = a.top + n + o + p + b.collisionHeight - g - f, a.top + n + o + p > k && (0 > d || d < h(k)) && (a.top += n + o + p)) : l > 0 && (c = a.top - b.collisionPosition.marginTop + n + o + p - i, a.top + n + o + p > l && (c > 0 || h(c) < l) && (a.top += n + o + p))
            }
        },
        flipfit: {
            left: function() {
                a.ui.position.flip.left.apply(this, arguments), a.ui.position.fit.left.apply(this, arguments)
            },
            top: function() {
                a.ui.position.flip.top.apply(this, arguments), a.ui.position.fit.top.apply(this, arguments)
            }
        }
    }, function() {
        var b,
            c,
            d,
            e,
            f,
            g = document.getElementsByTagName("body")[0],
            h = document.createElement("div");
        b = document.createElement(g ? "div" : "body"), d = {
            visibility: "hidden",
            width: 0,
            height: 0,
            border: 0,
            margin: 0,
            background: "none"
        }, g && a.extend(d, {
            position: "absolute",
            left: "-1000px",
            top: "-1000px"
        });
        for (f in d)
            b.style[f] = d[f];
        b.appendChild(h), c = g || document.documentElement, c.insertBefore(b, c.firstChild), h.style.cssText = "position: absolute; left: 10.7432222px;", e = a(h).offset().left, a.support.offsetFractions = e > 10 && 11 > e, b.innerHTML = "", c.removeChild(b)
    }()
}(window.webshims && window.webshims.$ || jQuery);

