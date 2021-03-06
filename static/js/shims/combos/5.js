webshims.register("form-native-extend", function(a, b, c, d) {
    "use strict";
    {
        var e = c.Modernizr;
        e.inputtypes
    }
    if (e.formvalidation && !b.bugs.bustedValidity) {
        var f = b.inputTypes,
            g = !1,
            h = {},
            i = function() {
                var b,
                    c = function() {
                        a(this).prop("validity")
                    },
                    d = function() {
                        a("input").each(c)
                    };
                return function() {
                    clearTimeout(b), b = setTimeout(d, 9)
                }
            }();
        b.addInputType = function(c, d) {
            f[c] = d, g = !0, a.isDOMReady && e.formvalidation && !b.bugs.bustedValidity && i()
        }, b.addValidityRule = function(a, b) {
            h[a] = b
        }, a.each({
            typeMismatch: "mismatch",
            badInput: "bad"
        }, function(a, c) {
            b.addValidityRule(a, function(b, d, e, g) {
                if ("" === d)
                    return !1;
                var h = g[a];
                return "type" in e || (e.type = (b[0].getAttribute("type") || "").toLowerCase()), f[e.type] && f[e.type][c] && (h = f[e.type][c](d, b)), h || !1
            })
        });
        var j = b.modules["form-number-date-api"],
            k = j.loaded && !j.test(),
            l = ["customError", "badInput", "typeMismatch", "rangeUnderflow", "rangeOverflow", "stepMismatch", "tooLong", "tooShort", "patternMismatch", "valueMissing", "valid"],
            m = ["value"],
            n = [],
            o = function(b) {
                if (b || g) {
                    var c = (b.getAttribute && b.getAttribute("type") || b.type || "").toLowerCase();
                    f[c] && a.prop(b, "validity")
                }
            },
            p = {};
        if (["input", "textarea", "select"].forEach(function(c) {
            var d = b.defineNodeNameProperty(c, "setCustomValidity", {
                prop: {
                    value: function(e) {
                        e += "";
                        var f = "input" == c ? a(this).getNativeElement()[0] : this;
                        d.prop._supvalue.call(f, e), k && (b.data(f, "hasCustomError", !!e), o(f))
                    }
                }
            });
            p[c] = d.prop._supvalue
        }), k && (m.push("min"), m.push("max"), m.push("step"), n.push("input")), k) {
            var q;
            if (n.forEach(function(c) {
                var d = b.defineNodeNameProperty(c, "validity", {
                    prop: {
                        get: function() {
                            if (!q) {
                                var e = "input" == c ? a(this).getNativeElement()[0] : this,
                                    g = d.prop._supget.call(e);
                                if (!g)
                                    return g;
                                var i = {};
                                if (l.forEach(function(a) {
                                    i[a] = g[a] || !1
                                }), !a.prop(e, "willValidate"))
                                    return i;
                                q = !0;
                                var j,
                                    k = a(e),
                                    m = {
                                        type: (e.getAttribute && e.getAttribute("type") || e.type || "").toLowerCase(),
                                        nodeName: (e.nodeName || "").toLowerCase()
                                    },
                                    n = k.val(),
                                    o = !!b.data(e, "hasCustomError");
                                if (q = !1, i.customError = o, i.valid && i.customError)
                                    i.valid = !1;
                                else if (!i.valid) {
                                    var r = !0;
                                    a.each(i, function(a, b) {
                                        return b ? (r = !1, !1) : void 0
                                    }), r && (i.valid = !0)
                                }
                                return a.each(h, function(a, d) {
                                    i[a] = d(k, n, m, i), i[a] && (i.valid || !j) && f[m.type] && (p[c].call(e, b.createValidationMessage(e, a)), i.valid = !1, j = !0)
                                }), i.valid && (p[c].call(e, ""), b.data(e, "hasCustomError", !1)), i
                            }
                        },
                        writeable: !1
                    }
                })
            }), m.forEach(function(a) {
                b.onNodeNamesPropertyModify(n, a, function() {
                    o(this)
                })
            }), d.addEventListener) {
                var r,
                    s = function(a) {
                        "form" in a.target && (clearTimeout(r), o(a.target))
                    };
                d.addEventListener("change", s, !0), d.addEventListener("input", function(a) {
                    clearTimeout(r), r = setTimeout(function() {
                        o(a.target)
                    }, 290)
                }, !0)
            }
            var t = n.join(",");
            b.addReady(function(b, c) {
                g && a(t, b).add(c.filter(t)).each(function() {
                    o(this)
                })
            })
        }
        b.defineNodeNameProperty("input", "type", {
            prop: {
                get: function() {
                    var a = this,
                        c = (a.getAttribute && a.getAttribute("type") || "").toLowerCase();
                    return b.inputTypes[c] ? c : a.type
                }
            }
        })
    }
}), webshims.register("form-number-date-api", function(a, b, c, d) {
    "use strict";
    b.addInputType || b.error("you can not call forms-ext feature after calling forms feature. call both at once instead: $.webshims.polyfill('forms forms-ext')"), b.getStep || (b.getStep = function(b, c) {
        var d = a.attr(b, "step");
        return "any" === d ? d : (c = c || i(b), f[c] && f[c].step ? (d = q.number.asNumber(d), (!isNaN(d) && d > 0 ? d : f[c].step) * (f[c].stepScaleFactor || 1)) : d)
    }), b.addMinMaxNumberToCache || (b.addMinMaxNumberToCache = function(a, b, c) {
        a + "AsNumber" in c || (c[a + "AsNumber"] = f[c.type].asNumber(b.attr(a)), isNaN(c[a + "AsNumber"]) && a + "Default" in f[c.type] && (c[a + "AsNumber"] = f[c.type][a + "Default"]))
    });
    var e = parseInt("NaN", 10),
        f = b.inputTypes,
        g = function(a) {
            return "number" == typeof a || a && a == 1 * a
        },
        h = function(b) {
            return a('<input type="' + b + '" />').prop("type") === b
        },
        i = function(a) {
            return (a.getAttribute("type") || "").toLowerCase()
        },
        j = function(a) {
            return a && !isNaN(1 * a)
        },
        k = b.addMinMaxNumberToCache,
        l = function(a, b) {
            a = "" + a, b -= a.length;
            for (var c = 0; b > c; c++)
                a = "0" + a;
            return a
        },
        m = 1e-7,
        n = b.bugs.bustedValidity;
    b.addValidityRule("stepMismatch", function(a, c, d, e) {
        if ("" === c)
            return !1;
        if ("type" in d || (d.type = i(a[0])), "week" == d.type)
            return !1;
        var g,
            h,
            j = (e || {}).stepMismatch || !1;
        if (f[d.type] && f[d.type].step) {
            if ("step" in d || (d.step = b.getStep(a[0], d.type)), "any" == d.step)
                return !1;
            if ("valueAsNumber" in d || (d.valueAsNumber = f[d.type].asNumber(c)), isNaN(d.valueAsNumber))
                return !1;
            k("min", a, d), g = d.minAsNumber, isNaN(g) && (h = a.prop("defaultValue")) && (g = f[d.type].asNumber(h)), isNaN(g) && (g = f[d.type].stepBase || 0), j = Math.abs((d.valueAsNumber - g) % d.step), j = !(m >= j || Math.abs(j - d.step) <= m)
        }
        return j
    }), [{
        name: "rangeOverflow",
        attr: "max",
        factor: 1
    }, {
        name: "rangeUnderflow",
        attr: "min",
        factor: -1
    }].forEach(function(a) {
        b.addValidityRule(a.name, function(b, c, d, e) {
            var g = (e || {})[a.name] || !1;
            if ("" === c)
                return g;
            if ("type" in d || (d.type = i(b[0])), f[d.type] && f[d.type].asNumber) {
                if ("valueAsNumber" in d || (d.valueAsNumber = f[d.type].asNumber(c)), isNaN(d.valueAsNumber))
                    return !1;
                if (k(a.attr, b, d), isNaN(d[a.attr + "AsNumber"]))
                    return g;
                g = d[a.attr + "AsNumber"] * a.factor < d.valueAsNumber * a.factor - m
            }
            return g
        })
    }), b.reflectProperties(["input"], ["max", "min", "step"]);
    var o = b.defineNodeNameProperty("input", "valueAsNumber", {
            prop: {
                get: function() {
                    var b = this,
                        c = i(b),
                        d = f[c] && f[c].asNumber ? f[c].asNumber(a.prop(b, "value")) : o.prop._supget && o.prop._supget.apply(b, arguments);
                    return null == d && (d = e), d
                },
                set: function(c) {
                    var d = this,
                        e = i(d);
                    if (f[e] && f[e].numberToString) {
                        if (isNaN(c))
                            return a.prop(d, "value", ""), void 0;
                        var g = f[e].numberToString(c);
                        g !== !1 ? a.prop(d, "value", g) : b.error("INVALID_STATE_ERR: DOM Exception 11")
                    } else
                        o.prop._supset && o.prop._supset.apply(d, arguments)
                }
            }
        }),
        p = b.defineNodeNameProperty("input", "valueAsDate", {
            prop: {
                get: function() {
                    var b = this,
                        c = i(b);
                    return f[c] && f[c].asDate && !f[c].noAsDate ? f[c].asDate(a.prop(b, "value")) : p.prop._supget && p.prop._supget.call(b) || null
                },
                set: function(c) {
                    var d = this,
                        e = i(d);
                    if (!f[e] || !f[e].dateToString || f[e].noAsDate)
                        return p.prop._supset && p.prop._supset.apply(d, arguments) || null;
                    if (null === c)
                        return a.prop(d, "value", ""), "";
                    var g = f[e].dateToString(c);
                    return g !== !1 ? (a.prop(d, "value", g), g) : (b.error("INVALID_STATE_ERR: DOM Exception 11"), void 0)
                }
            }
        });
    a.each({
        stepUp: 1,
        stepDown: -1
    }, function(c, d) {
        var e = b.defineNodeNameProperty("input", c, {
            prop: {
                value: function(c) {
                    var g,
                        h,
                        j,
                        k,
                        l,
                        n,
                        o,
                        p = i(this);
                    if (!f[p] || !f[p].asNumber) {
                        if (e.prop && e.prop._supvalue)
                            return e.prop._supvalue.apply(this, arguments);
                        throw b.info("no step method for type: " + p), "invalid state error"
                    }
                    if (l = {
                        type: p
                    }, c || (c = 1, b.warn("you should always use a factor for stepUp/stepDown")), c *= d, h = a.prop(this, "valueAsNumber"), isNaN(h))
                        throw b.info("valueAsNumber is NaN can't apply stepUp/stepDown "), "invalid state error";
                    if (g = b.getStep(this, p), "any" == g)
                        throw b.info("step is 'any' can't apply stepUp/stepDown"), "invalid state error";
                    if (b.addMinMaxNumberToCache("min", a(this), l), b.addMinMaxNumberToCache("max", a(this), l), n = l.minAsNumber, isNaN(n) && (o = a.prop(this, "defaultValue")) && (n = f[p].asNumber(o)), n || (n = 0), g *= c, h = 1 * (h + g).toFixed(5), j = (h - n) % g, j && Math.abs(j) > m && (k = h - j, k += j > 0 ? g : -g, h = 1 * k.toFixed(5)), !isNaN(l.maxAsNumber) && h > l.maxAsNumber || !isNaN(l.minAsNumber) && h < l.minAsNumber)
                        throw b.info("max/min overflow can't apply stepUp/stepDown"), "invalid state error";
                    a.prop(this, "valueAsNumber", h)
                }
            }
        })
    });
    var q = {
        number: {
            bad: function(a) {
                return !g(a)
            },
            step: 1,
            stepScaleFactor: 1,
            asNumber: function(a) {
                return g(a) ? 1 * a : e
            },
            numberToString: function(a) {
                return g(a) ? a : !1
            }
        },
        range: {
            minDefault: 0,
            maxDefault: 100
        },
        color: {
            bad: function() {
                var a = /^\u0023[a-f0-9]{6}$/;
                return function(b) {
                    return !b || 7 != b.length || !a.test(b)
                }
            }()
        },
        date: {
            bad: function(a) {
                if (!a || !a.split || !/\d$/.test(a))
                    return !0;
                var b,
                    c = a.split(/\u002D/);
                if (3 !== c.length)
                    return !0;
                var d = !1;
                if (c[0].length < 4 || 2 != c[1].length || c[1] > 12 || 2 != c[2].length || c[2] > 33)
                    d = !0;
                else
                    for (b = 0; 3 > b; b++)
                        if (!j(c[b])) {
                            d = !0;
                            break
                        }
                return d || a !== this.dateToString(this.asDate(a, !0))
            },
            step: 1,
            stepScaleFactor: 864e5,
            asDate: function(a, b) {
                return !b && this.bad(a) ? null : new Date(this.asNumber(a, !0))
            },
            asNumber: function(a, b) {
                var c = e;
                return (b || !this.bad(a)) && (a = a.split(/\u002D/), c = Date.UTC(a[0], a[1] - 1, a[2])), c
            },
            numberToString: function(a) {
                return g(a) ? this.dateToString(new Date(1 * a)) : !1
            },
            dateToString: function(a) {
                return a && a.getFullYear ? l(a.getUTCFullYear(), 4) + "-" + l(a.getUTCMonth() + 1, 2) + "-" + l(a.getUTCDate(), 2) : !1
            }
        },
        time: {
            bad: function(b, c) {
                if (!b || !b.split || !/\d$/.test(b))
                    return !0;
                if (b = b.split(/\u003A/), b.length < 2 || b.length > 3)
                    return !0;
                var d,
                    e = !1;
                return b[2] && (b[2] = b[2].split(/\u002E/), d = parseInt(b[2][1], 10), b[2] = b[2][0]), a.each(b, function(a, b) {
                    return j(b) && 2 === b.length ? void 0 : (e = !0, !1)
                }), e ? !0 : b[0] > 23 || b[0] < 0 || b[1] > 59 || b[1] < 0 ? !0 : b[2] && (b[2] > 59 || b[2] < 0) ? !0 : d && isNaN(d) ? !0 : (d && (100 > d ? d *= 100 : 10 > d && (d *= 10)), c === !0 ? [b, d] : !1)
            },
            step: 60,
            stepBase: 0,
            stepScaleFactor: 1e3,
            asDate: function(a) {
                return a = new Date(this.asNumber(a)), isNaN(a) ? null : a
            },
            asNumber: function(a) {
                var b = e;
                return a = this.bad(a, !0), a !== !0 && (b = Date.UTC("1970", 0, 1, a[0][0], a[0][1], a[0][2] || 0), a[1] && (b += a[1])), b
            },
            dateToString: function(a) {
                if (a && a.getUTCHours) {
                    var b = l(a.getUTCHours(), 2) + ":" + l(a.getUTCMinutes(), 2),
                        c = a.getSeconds();
                    return "0" != c && (b += ":" + l(c, 2)), c = a.getUTCMilliseconds(), "0" != c && (b += "." + l(c, 3)), b
                }
                return !1
            }
        },
        month: {
            bad: function(a) {
                return q.date.bad(a + "-01")
            },
            step: 1,
            stepScaleFactor: !1,
            asDate: function(a) {
                return new Date(q.date.asNumber(a + "-01"))
            },
            asNumber: function(a) {
                var b = e;
                return a && !this.bad(a) && (a = a.split(/\u002D/), a[0] = 1 * a[0] - 1970, a[1] = 1 * a[1] - 1, b = 12 * a[0] + a[1]), b
            },
            numberToString: function(a) {
                var b,
                    c = !1;
                return g(a) && (b = a % 12, a = (a - b) / 12 + 1970, b += 1, 1 > b && (a -= 1, b += 12), c = l(a, 4) + "-" + l(b, 2)), c
            },
            dateToString: function(a) {
                if (a && a.getUTCHours) {
                    var b = q.date.dateToString(a);
                    return b.split && (b = b.split(/\u002D/)) ? b[0] + "-" + b[1] : !1
                }
                return !1
            }
        },
        "datetime-local": {
            bad: function(a, b) {
                return a && a.split && 2 === (a + "special").split(/\u0054/).length ? (a = a.split(/\u0054/), q.date.bad(a[0]) || q.time.bad(a[1], b)) : !0
            },
            noAsDate: !0,
            asDate: function(a) {
                return a = new Date(this.asNumber(a)), isNaN(a) ? null : a
            },
            asNumber: function(a) {
                var b = e,
                    c = this.bad(a, !0);
                return c !== !0 && (a = a.split(/\u0054/)[0].split(/\u002D/), b = Date.UTC(a[0], a[1] - 1, a[2], c[0][0], c[0][1], c[0][2] || 0), c[1] && (b += c[1])), b
            },
            dateToString: function(a, b) {
                return q.date.dateToString(a) + "T" + q.time.dateToString(a, b)
            }
        }
    };
    !n && h("range") && h("time") && h("month") && h("datetime-local") || (q.range = a.extend({}, q.number, q.range), q.time = a.extend({}, q.date, q.time), q.month = a.extend({}, q.date, q.month), q["datetime-local"] = a.extend({}, q.date, q.time, q["datetime-local"])), ["number", "month", "range", "date", "time", "color", "datetime-local"].forEach(function(a) {
        (n || !h(a)) && b.addInputType(a, q[a])
    }), null == a("<input />").prop("labels") && b.defineNodeNamesProperty("button, input, keygen, meter, output, progress, select, textarea", "labels", {
        prop: {
            get: function() {
                if ("hidden" == this.type)
                    return null;
                var b = this.id,
                    c = a(this).closest("label").filter(function() {
                        var a = this.attributes["for"] || {};
                        return !a.specified || a.value == b
                    });
                return b && (c = c.add('label[for="' + b + '"]')), c.get()
            },
            writeable: !1
        }
    })
}), function(a) {
    var b = function(a) {
            return "number" == typeof a || a && a == 1 * a
        },
        c = function(a, b) {
            return "number" == typeof a || a && a == 1 * a ? 1 * a : b
        },
        d = ["step", "min", "max", "readonly", "title", "disabled", "tabindex"],
        e = {
            _create: function() {
                var b;
                for (this.element.addClass("ws-range").attr({
                    role: "slider"
                }).append('<span class="ws-range-min ws-range-progress" /><span class="ws-range-rail ws-range-track"><span class="ws-range-thumb"><span><span data-value="" data-valuetext="" /></span></span></span>'), this.trail = a(".ws-range-track", this.element), this.range = a(".ws-range-progress", this.element), this.thumb = a(".ws-range-thumb", this.trail), this.updateMetrics(), this.orig = this.options.orig, b = 0; b < d.length; b++)
                    this[d[b]](this.options[d[b]]);
                this.value = this._value, this.value(this.options.value), this.initDataList(), this.element.data("rangeUi", this), this.addBindings(), this._init = !0
            },
            value: a.noop,
            _value: function(b, c, d) {
                var e,
                    f,
                    g = this.options,
                    h = b,
                    i = {},
                    j = {};
                c || parseFloat(b, 10) == b || (b = g.min + (g.max - g.min) / 2), c || (b = this.normalizeVal(b)), e = 100 * ((b - g.min) / (g.max - g.min)), this._init && b == g.value && h == b || (g.value = b, a.fn.stop && (this.thumb.stop(), this.range.stop()), j[this.dirs.width] = e + "%", this.vertical && (e = Math.abs(e - 100)), i[this.dirs.left] = e + "%", d && a.fn.animate ? (d = "object" != typeof d ? {} : a.extend({}, d), d.duration || (f = Math.abs(e - parseInt(this.thumb[0].style[this.dirs.left] || 50, 10)), d.duration = Math.max(Math.min(999, 5 * f), 99)), this.thumb.animate(i, d), this.range.animate(j, d)) : (this.thumb.css(i), this.range.css(j)), this.orig && (h != b || !this._init && this.orig.value != b) && this.options._change(b), this._setValueMarkup())
            },
            _setValueMarkup: function() {
                var b = this.options,
                    c = b.textValue ? b.textValue(this.options.value) : b.options[b.value] || b.value;
                this.element.attr({
                    "aria-valuenow": this.options.value,
                    "aria-valuetext": c
                }), a("span[data-value]", this.thumb).attr({
                    "data-value": this.options.value,
                    "data-valuetext": c
                }), b.selectedOption && (a(b.selectedOption).removeClass("ws-selected-option"), b.selectedOption = null), b.value in b.options && (b.selectedOption = a('[data-value="' + b.value + '"].ws-range-ticks').addClass("ws-selected-option"))
            },
            initDataList: function() {
                if (this.orig) {
                    var b,
                        c = this,
                        d = function() {
                            a(c.orig).jProp("list").off("updateDatalist", d).on("updateDatalist", d), clearTimeout(b), b = setTimeout(function() {
                                c.list && c.list()
                            }, 9)
                        };
                    a(this.orig).on("listdatalistchange", d), this.list()
                }
            },
            list: function() {
                var c = this.options,
                    d = c.min,
                    e = c.max,
                    f = this.trail,
                    g = this;
                this.element.attr({
                    "aria-valuetext": c.options[c.value] || c.value
                }), a(".ws-range-ticks", f).remove(), a(this.orig).jProp("list").find("option:not([disabled])").each(function() {
                    c.options[a.prop(this, "value")] = a.prop(this, "label") || ""
                }), a.each(c.options, function(h, i) {
                    if (!(!b(h) || d > h || h > e)) {
                        var j = 100 * ((h - d) / (e - d)),
                            k = 'data-value="' + h + '"';
                        i && (k += ' data-label="' + i + '"', c.showLabels && (k += ' title="' + i + '"')), g.vertical && (j = Math.abs(j - 100)), g.posCenter(a('<span class="ws-range-ticks"' + k + ' style="' + g.dirs.left + ": " + j + '%;" />').appendTo(f))
                    }
                }), c.value in c.options && this._setValueMarkup()
            },
            readonly: function(a) {
                a = !!a, this.options.readonly = a, this.element.attr("aria-readonly", "" + a), this._init && this.updateMetrics()
            },
            disabled: function(a) {
                a = !!a, this.options.disabled = a, a ? this.element.attr({
                    tabindex: -1,
                    "aria-disabled": "true"
                }) : this.element.attr({
                    tabindex: this.options.tabindex,
                    "aria-disabled": "false"
                }), this._init && this.updateMetrics()
            },
            tabindex: function(a) {
                this.options.tabindex = a, this.options.disabled || this.element.attr({
                    tabindex: a
                })
            },
            title: function(a) {
                this.element.prop("title", a)
            },
            min: function(a) {
                this.options.min = c(a, 0), this.value(this.options.value, !0)
            },
            max: function(a) {
                this.options.max = c(a, 100), this.value(this.options.value, !0)
            },
            step: function(a) {
                var b = this.options,
                    d = "any" == a ? "any" : c(a, 1);
                b.stepping && webshims.error("stepping was removed. Use stepfactor instead."), b.stepfactor && "any" != d && (d *= b.stepfactor), b.step = d, this.value(this.options.value)
            },
            normalizeVal: function(a) {
                var b,
                    c,
                    d,
                    e = this.options;
                return a <= e.min ? a = e.min : a >= e.max ? a = e.max : "any" != e.step && (d = e.step, b = (a - e.min) % d, c = a - b, 2 * Math.abs(b) >= d && (c += b > 0 ? d : -d), a = 1 * c.toFixed(5)), a
            },
            doStep: function(a, b) {
                var d = c(this.options.step, 1);
                "any" == this.options.step && (d = Math.min(d, (this.options.max - this.options.min) / 10)), this.value(this.options.value + d * a, !1, b)
            },
            getStepedValueFromPos: function(a) {
                var b,
                    c,
                    d,
                    e;
                return 0 >= a ? b = this.options[this.dirs[this.isRtl ? "max" : "min"]] : a > 100 ? b = this.options[this.dirs[this.isRtl ? "min" : "max"]] : ((this.vertical || this.isRtl) && (a = Math.abs(a - 100)), b = (this.options.max - this.options.min) * (a / 100) + this.options.min, e = this.options.step, "any" != e && (c = (b - this.options.min) % e, d = b - c, 2 * Math.abs(c) >= e && (d += c > 0 ? e : -e), b = 1 * d.toFixed(5))), b
            },
            addRemoveClass: function(a, b) {
                var c,
                    d = -1 != this.element.prop("className").indexOf(a);
                !b && d ? (c = "removeClass", this.element.removeClass(a), this.updateMetrics()) : b && !d && (c = "addClass"), c && (this.element[c](a), this._init && this.updateMetrics())
            },
            addBindings: function() {
                var b,
                    c,
                    d,
                    e,
                    f = this,
                    g = this.options,
                    h = function() {
                        var b = {};
                        return {
                            init: function(c, d, e) {
                                b[c] || (b[c] = {
                                    fn: e
                                }, f.orig && a(f.orig).on(c, function() {
                                    b[c].val = a.prop(f.orig, "value")
                                })), b[c].val = d
                            },
                            call: function(a, c) {
                                b[a].val != c && (clearTimeout(b[a].timer), b[a].val = c, b[a].timer = setTimeout(function() {
                                    b[a].fn(c, f)
                                }, 0))
                            }
                        }
                    }(),
                    i = function() {
                        var a = {
                                touchstart: 1,
                                touchend: 1,
                                touchmove: 1
                            },
                            b = ["pageX", "pageY"];
                        return function(c) {
                            if (a[c.type] && c.originalEvent && c.originalEvent.touches && c.originalEvent.touches.length)
                                for (var d = 0; d < b.length; d++)
                                    c[b[d]] = c.originalEvent.touches[0][b[d]];
                            return c
                        }
                    }(),
                    j = function(a, b) {
                        a != g.value && (f.value(a, !1, b), h.call("input", a))
                    },
                    k = function(a, d) {
                        "touchmove" == a.type && (a.preventDefault(), i(a)), j(f.getStepedValueFromPos((a[f.dirs.mouse] - b) * c), d), a && "mousemove" == a.type && a.preventDefault()
                    },
                    l = function(b) {
                        b && "mouseup" == b.type && (h.call("input", g.value), h.call("change", g.value)), f.addRemoveClass("ws-active"), a(document).off("mousemove touchmove", k).off("mouseup touchend", l), a(window).off("blur", m), e = !1
                    },
                    m = function(a) {
                        a.target == window && l()
                    },
                    n = function(d) {
                        var h;
                        if (!e && ("touchstart" != d.type || d.originalEvent && d.originalEvent.touches && 1 == d.originalEvent.touches.length) && (d.preventDefault(), a(document).off("mousemove touchmove", k).off("mouseup touchend", l), a(window).off("blur", m), !g.readonly && !g.disabled)) {
                            if (i(d), f.element.trigger("focus"), f.addRemoveClass("ws-active", !0), b = f.element.offset(), c = f.element[f.dirs.innerWidth](), !c || !b)
                                return;
                            h = f.thumb[f.dirs.outerWidth](), b = b[f.dirs.pos], c = 100 / c, "ws-range-ticks" == d.target.className ? j(d.target.getAttribute("data-value"), g.animate) : k(d, g.animate), e = !0, a(document).on("touchstart" == d.type ? {
                                touchend: l,
                                touchmove: k
                            } : {
                                mouseup: l,
                                mousemove: k
                            }), a(window).on("blur", m), d.stopPropagation()
                        }
                    },
                    o = {
                        "touchstart mousedown": n,
                        focus: function() {
                            g.disabled || d || (h.init("input", g.value), h.init("change", g.value), f.addRemoveClass("ws-focus", !0), f.updateMetrics()), d = !0
                        },
                        blur: function() {
                            f.element.removeClass("ws-focus ws-active"), f.updateMetrics(), d = !1, h.init("input", g.value), h.call("change", g.value)
                        },
                        keyup: function() {
                            f.addRemoveClass("ws-active"), h.call("input", g.value), h.call("change", g.value)
                        },
                        keydown: function(a) {
                            var b = !0,
                                c = a.keyCode;
                            g.readonly || g.disabled || (f.isRtl && (39 == c ? c = 37 : 37 == c && (c = 39)), 39 == c || 38 == c ? f.doStep(1) : 37 == c || 40 == c ? f.doStep(-1) : 33 == c ? f.doStep(10, g.animate) : 34 == c ? f.doStep(-10, g.animate) : 36 == c ? f.value(f.options.max, !1, g.animate) : 35 == c ? f.value(f.options.min, !1, g.animate) : b = !1, b && (f.addRemoveClass("ws-active", !0), h.call("input", g.value), a.preventDefault()))
                        }
                    };
                h.init("input", g.value, this.options.input), h.init("change", g.value, this.options.change), o[a.fn.mwheelIntent ? "mwheelIntent" : "mousewheel"] = function(a, b) {
                    b && d && !g.readonly && !g.disabled && (f.doStep(b), a.preventDefault(), h.call("input", g.value))
                }, this.element.on(o), this.thumb.on({
                    mousedown: n
                }), this.orig && a(this.orig).jProp("form").on("reset", function() {
                    var b = a.prop(f.orig, "value");
                    f.value(b), setTimeout(function() {
                        var c = a.prop(f.orig, "value");
                        b != c && f.value(c)
                    }, 4)
                }), window.webshims && webshims.ready("WINDOWLOAD", function() {
                    webshims.ready("dom-support", function() {
                        a.fn.onWSOff && f.element.onWSOff("updateshadowdom", function() {
                            f.updateMetrics()
                        })
                    }), !a.fn.onWSOff && webshims._polyfill && webshims._polyfill(["dom-support"])
                })
            },
            posCenter: function(a, b) {
                var c;
                !this.options.calcCenter || this._init && !this.element[0].offsetWidth || (a || (a = this.thumb), b || (b = a[this.dirs.outerWidth]()), b /= -2, a.css(this.dirs.marginLeft, b), this.options.calcTrail && a[0] == this.thumb[0] && (c = this.element[this.dirs.innerHeight](), a.css(this.dirs.marginTop, (a[this.dirs.outerHeight]() - c) / -2), this.range.css(this.dirs.marginTop, (this.range[this.dirs.outerHeight]() - c) / -2), b *= -1, this.trail.css(this.dirs.left, b).css(this.dirs.right, b)))
            },
            updateMetrics: function() {
                var a = this.element.innerWidth();
                this.vertical = a && this.element.innerHeight() - a > 10, this.dirs = this.vertical ? {
                    mouse: "pageY",
                    pos: "top",
                    min: "max",
                    max: "min",
                    left: "top",
                    right: "bottom",
                    width: "height",
                    innerWidth: "innerHeight",
                    innerHeight: "innerWidth",
                    outerWidth: "outerHeight",
                    outerHeight: "outerWidth",
                    marginTop: "marginLeft",
                    marginLeft: "marginTop"
                } : {
                    mouse: "pageX",
                    pos: "left",
                    min: "min",
                    max: "max",
                    left: "left",
                    right: "right",
                    width: "width",
                    innerWidth: "innerWidth",
                    innerHeight: "innerHeight",
                    outerWidth: "outerWidth",
                    outerHeight: "outerHeight",
                    marginTop: "marginTop",
                    marginLeft: "marginLeft"
                }, this.vertical || "rtl" != this.element.css("direction") || (this.isRtl = !0, this.dirs.left = "right", this.dirs.right = "left", this.dirs.marginLeft = "marginRight"), this.element[this.vertical ? "addClass" : "removeClass"]("vertical-range")[this.isRtl ? "addClass" : "removeClass"]("ws-is-rtl"), this.updateMetrics = this.posCenter, this.posCenter()
            }
        },
        f = function(a) {
            function b() {}
            return b.prototype = a, new b
        };
    a.fn.rangeUI = function(b) {
        return b = a.extend({
            readonly: !1,
            disabled: !1,
            tabindex: 0,
            min: 0,
            step: 1,
            max: 100,
            value: 50,
            input: a.noop,
            change: a.noop,
            _change: a.noop,
            showLabels: !0,
            options: {},
            calcCenter: !0,
            calcTrail: !0
        }, b), this.each(function() {
            var c = a.extend(f(e), {
                element: a(this)
            });
            c.options = b, c._create.call(c)
        })
    }, window.webshims && webshims.isReady && webshims.isReady("range-ui", !0)
}(window.webshims ? webshims.$ : jQuery), webshims.register("form-number-date-ui", function(a, b, c, d, e, f) {
    "use strict";
    var g,
        h = b.formcfg,
        i = Modernizr.formvalidation && !b.bugs.bustedValidity,
        j = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
        k = function(a) {
            a.stopImmediatePropagation()
        },
        l = function(b) {
            var c = "monthSelect" + b.monthNames;
            if (!g[c]) {
                var d = g.date[b.monthNames] || j;
                g[c] = '<option value=""></option>' + a.map(j, function(a, b) {
                    return '<option value="' + a + '">' + d[b] + "</option>"
                }).join("")
            }
            return g[c]
        },
        m = '<select class="dd"><option value=""></option>' + function() {
            for (var a = 1, b = []; 32 > a;)
                b.push("<option>" + (10 > a ? "0" + a : a) + "</option>"), a++;
            return b.join("")
        }() + "</select>",
        n = function(b) {
            if (!g.patterns[b + "Obj"]) {
                var c = {};
                a.each(g.patterns[b].split(g[b + "Format"]), function(a, b) {
                    c[b] = a
                }), g.patterns[b + "Obj"] = c
            }
        },
        o = function(c, d) {
            var e,
                f,
                g,
                h;
            d.yearSelect && (f = parseInt(d.value.split("-")[0], 10), g = d.max.split("-"), h = d.min.split("-"), e = b.picker.createYearSelect(f || parseInt(h[0], 10) || parseInt(g[0], 10) || r, g, h), e.unshift("<option />"), a(c.elements).filter("select.yy").html(e.join("")).each(function() {
                f || (a("option[selected]", this).removeAttr("selected"), a(this).val())
            }))
        },
        p = {
            date: {
                _create: function(b) {
                    var c = {
                        splits: []
                    };
                    return b.yearSelect ? c.splits.push(a('<select class="yy"></select>')[0]) : c.splits.push(a('<input type="text" class="yy" size="4" inputmode="numeric" maxlength="4" />')[0]), b.monthSelect ? c.splits.push(a('<select class="mm">' + l(b) + "</select>")[0]) : c.splits.push(a('<input type="text" class="mm" inputmode="numeric" maxlength="2" size="2" />')[0]), b.daySelect ? c.splits.push(a(m)[0]) : c.splits.push(a('<input type="text" class="dd ws-spin" inputmode="numeric" maxlength="2" size="2" />')[0]), c.elements = [c.splits[0], a('<span class="ws-input-seperator" />')[0], c.splits[1], a('<span class="ws-input-seperator" />')[0], c.splits[2]], o(c, b), c
                },
                sort: function(b) {
                    n("d");
                    var c = 0,
                        d = a(".ws-input-seperator", b).html(g.dFormat),
                        e = a("input, select", b);
                    a.each(g.patterns.dObj, function(a) {
                        var f = e.filter("." + a);
                        f[0] && (f.appendTo(b), c < d.length && d.eq(c).insertAfter(f), c++)
                    })
                }
            },
            month: {
                _create: function(b) {
                    var c = {
                        splits: []
                    };
                    return b.yearSelect ? c.splits.push(a('<select class="yy"></select>')[0]) : c.splits.push(a('<input type="text" class="yy" size="4" inputmode="numeric" maxlength="4" />')[0]), b.monthSelect ? c.splits.push(a('<select class="mm">' + l(b) + "</select>")[0]) : (c.splits.push(a('<input type="text" class="mm ws-spin" />')[0]), b.onlyMonthDigits && a(c.splits[1]).attr({
                        inputmode: "numeric",
                        size: 2,
                        maxlength: 2
                    })), c.elements = [c.splits[0], a('<span class="ws-input-seperator" />')[0], c.splits[1]], o(c, b), c
                },
                sort: function(b) {
                    var c,
                        d = a(".ws-input-seperator", b).html(g.dFormat),
                        e = a("input.mm, select.mm", b);
                    g.date.showMonthAfterYear ? (e.appendTo(b), c = "insertBefore") : (e.prependTo(b), c = "insertAfter"), d[c](e)
                }
            }
        },
        q = new Date((new Date).getTime() - 60 * (new Date).getTimezoneOffset() * 1e3),
        r = q.getFullYear();
    q = new Date(q.getFullYear(), q.getMonth(), q.getDate(), q.getHours()).getTime();
    var s = {
            number: {
                step: 1
            },
            "datetime-local": {
                step: 60,
                start: new Date(q).getTime()
            },
            time: {
                step: 60
            },
            month: {
                step: 1,
                start: new Date(q)
            },
            date: {
                step: 1,
                start: new Date(q)
            }
        },
        t = function() {
            var c = function() {
                return b.getID(this)
            };
            return function(b, d, e) {
                a(b).attr({
                    "aria-labelledby": d.map(c).get().join(" ")
                }), e || d.on("click", function(a) {
                    return b.getShadowFocusElement().focus(), a.preventDefault(), !1
                })
            }
        }(),
        u = function(a) {
            return a ? (a += "", 1 == a.length ? "0" + a : a) : ""
        },
        v = function(a, c) {
            return a = ("color" == a ? "color" : "forms") + "-picker", v[c + "Loaded" + a] || (v[c + "Loaded" + a] = !0, b.ready(c, function() {
                b.loader.loadList([a])
            })), a
        };
    f.addZero = u, b.loader.addModule("forms-picker", {
        noAutoCallback: !0,
        options: f
    }), b.loader.addModule("color-picker", {
        noAutoCallback: !0,
        css: "jpicker/jpicker.css",
        options: f,
        d: ["forms-picker"]
    }), f.steps = s, function() {
        h.de = a.extend(!0, {
            numberFormat: {
                ",": ".",
                ".": ","
            },
            timeSigns: ":. ",
            numberSigns: ",",
            dateSigns: ".",
            dFormat: ".",
            patterns: {
                d: "dd.mm.yy"
            },
            month: {
                currentText: "Aktueller Monat"
            },
            time: {
                currentText: "Jetzt"
            },
            date: {
                close: "schlie\xdfen",
                clear: "L\xf6schen",
                prevText: "Zur\xfcck",
                nextText: "Vor",
                currentText: "Heute",
                monthNames: ["Januar", "Februar", "M\xe4rz", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
                monthNamesShort: ["Jan", "Feb", "M\xe4r", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
                dayNames: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
                dayNamesShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
                dayNamesMin: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
                weekHeader: "KW",
                firstDay: 1,
                isRTL: !1,
                showMonthAfterYear: !1,
                yearSuffix: ""
            }
        }, h.de || {}), h.en = a.extend(!0, {
            numberFormat: {
                ".": ".",
                ",": ","
            },
            numberSigns: ".",
            dateSigns: "/",
            timeSigns: ":. ",
            dFormat: "/",
            patterns: {
                d: "mm/dd/yy"
            },
            meridian: ["AM", "PM"],
            month: {
                currentText: "This month"
            },
            time: {
                currentText: "Now"
            },
            date: {
                closeText: "Done",
                clear: "Clear",
                prevText: "Prev",
                nextText: "Next",
                currentText: "Today",
                monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                weekHeader: "Wk",
                firstDay: 0,
                isRTL: !1,
                showMonthAfterYear: !1,
                yearSuffix: ""
            }
        }, h.en || {}), h["en-US"] || (h["en-US"] = a.extend(!0, {}, h.en)), h["en-GB"] || (h["en-GB"] = a.extend(!0, {}, h.en, {
            date: {
                firstDay: 1
            },
            patterns: {
                d: "dd/mm/yy"
            }
        })), h["en-AU"] || (h["en-AU"] = a.extend(!0, {}, h["en-GB"])), h[""] || (h[""] = h["en-US"]), g = h[""];
        var c = function(b) {
                if (!b.date.monthkeys) {
                    var c = function(a, c) {
                        var d,
                            e = a + 1;
                        d = 10 > e ? "0" + e : "" + e, b.date.monthkeys[e] = d, b.date.monthkeys[c] = d, b.date.monthkeys[c.toLowerCase()] = d
                    };
                    b.date.monthkeys = {}, b.date.monthDigits = j, b.numberSigns += "-", b.meridian && (b.timeSigns += b.meridian[0] + b.meridian[1] + b.meridian[0].toLowerCase() + b.meridian[1].toLowerCase()), a.each(b.date.monthNames, c), a.each(b.date.monthNamesShort, c)
                }
                b.colorSigns || (b.colorSigns = "#abcdefABCDEF"), b["datetime-localSigns"] || (b["datetime-localSigns"] = b.dateSigns + b.timeSigns), b["datetime-local"] || (b["datetime-local"] = {}), b.time || (b.time = {}), !b["datetime-local"].currentText && b.time.currentText && (b["datetime-local"].currentText = b.time.currentText)
            },
            e = function() {
                c(g), a(d).triggerHandler("wslocalechange")
            };
        g = b.activeLang(h), e(), a(h).on("change", function() {
            g = h.__active, e()
        })
    }(), function() {
        var c = function(a, b) {
                return "number" == typeof a || a && a == 1 * a ? 1 * a : b
            },
            d = {
                number: function(a) {
                    return (a + "").replace(/\,/g, "").replace(/\./, g.numberFormat["."])
                },
                time: function(b) {
                    var c;
                    return b && g.meridian && (b = b.split(":"), c = 1 * b[0], c && c >= 12 ? (b[0] = u(c - 12 + ""), c = 1) : c = 0, "00" === b[0] && (b[0] = "12"), b = a.trim(b.join(":")) + " " + g.meridian[c]), b
                },
                "datetime-local": function(b, c) {
                    var d = a.trim(b || "").split("T");
                    return 2 == d.length && (b = this.date(d[0], c) + " " + this.time(d[1], c)), b
                },
                month: function(a, b) {
                    var c,
                        d = a.split("-");
                    return d[0] && d[1] ? (b && b.monthSelect || (c = g.date[b.monthNames] || g.date.monthNames, d[1] = c[1 * d[1] - 1]), b && b.splitInput ? a = [d[0] || "", d[1] || ""] : d[1] && (a = g.date.showMonthAfterYear ? d.join(" ") : d[1] + " " + d[0])) : b && b.splitInput && (a = [d[0] || "", d[1] || ""]), a
                },
                date: function(a, b) {
                    var c = (a + "").split("-");
                    return c[2] && c[1] && c[0] ? b && b.splitInput ? a = c : (a = g.patterns.d.replace("yy", c[0] || ""), a = a.replace("mm", c[1] || ""), a = a.replace("dd", c[2] || "")) : b && b.splitInput && (a = [c[0] || "", c[1] || "", c[2] || ""]), a
                },
                color: function(a) {
                    var b = "#000000";
                    return a && (a = a.toLowerCase(), 7 == a.length && h("color").isValid(a) && (b = a)), b
                }
            },
            e = {
                number: function(a) {
                    return (a + "").replace(g.numberFormat[","], "").replace(g.numberFormat["."], ".")
                },
                "datetime-local": function(b, c) {
                    var d,
                        e = a.trim(b || "").split(/\s+/);
                    return 2 == e.length ? (-1 != e[0].indexOf(":") && -1 == e[1].indexOf(":") && (d = e[1], e[1] = e[0], e[0] = d), b = this.date(e[0], c) + "T" + this.time(e[1], c)) : 3 == e.length && (b = this.date(e[0], c) + "T" + this.time(e[1] + e[2], c)), b
                },
                time: function(b) {
                    var c;
                    return b && g.meridian && (b = b.toUpperCase(), "12" === b.substr(0, 2) && (b = "00" + b.substr(2)), -1 != b.indexOf(g.meridian[1]) && (b = b.split(":"), c = 1 * b[0], isNaN(c) || (b[0] = c + 12), b = b.join(":")), b = a.trim(b.replace(g.meridian[0], "").replace(g.meridian[1], ""))), b
                },
                month: function(a, b, c) {
                    var d = b.splitInput ? a : a.trim().split(/[\.\s-\/\\]+/);
                    return 2 == d.length && d[0] && d[1] ? (d[0] = !c && g.date.monthkeys[d[0]] || d[0], d[1] = !c && g.date.monthkeys[d[1]] || d[1], a = 2 == d[1].length && d[0].length > 3 ? d[0] + "-" + d[1] : 2 == d[0].length && d[1].length > 3 ? d[1] + "-" + d[0] : "") : b.splitInput && (a = ""), a
                },
                date: function(a, b, c) {
                    n("d");
                    var d,
                        e,
                        f = "";
                    return b.splitInput ? e = {
                        yy: 0,
                        mm: 1,
                        dd: 2
                    } : (e = g.patterns.dObj, a = a.split(g.dFormat)), 3 == a.length && a[0] && a[1] && a[2] && (!c || a[e.yy].length > 3 && 2 == a[e.mm].length && 2 == a[e.dd].length) && (a[e.mm] > 12 && a[e.dd] < 13 && (d = a[e.dd], a[e.dd] = a[e.mm], a[e.mm] = d), a[e.yy].length < 4 && (d = ((new Date).getFullYear() + "").substr(0, 4 - a[e.yy].length), a[e.yy] > 50 && d--, a[e.yy] = d + a[e.yy]), f = [u(a[e.yy]), u(a[e.mm]), u(a[e.dd])].join("-")), f
                },
                color: function(a) {
                    var b = "#000000";
                    return a && (a = a.toLowerCase(), 0 !== a.indexOf("#") && (a = "#" + a), 4 == a.length && (a = "#" + a.charAt(1) + a.charAt(1) + a.charAt(2) + a.charAt(2) + a.charAt(3) + a.charAt(3)), 7 == a.length && h("color").isValid(a) && (b = a)), b
                }
            },
            f = {
                date: function(a, b) {
                    var c = (a || "").split("-");
                    return c = 3 == c.length ? b.splitInput ? c : g.patterns.d.replace("yy", c[0]).replace("mm", c[1]).replace("dd", c[2]) : b.splitInput ? [a, a, a] : a
                },
                month: function(a, b) {
                    var c = (a || "").split("-");
                    return c = 2 == c.length ? b.splitInput ? c : g.date.showMonthAfterYear ? c[0] + " " + c[1] : c[1] + " " + c[0] : b.splitInput ? [a, a] : a
                }
            },
            h = function() {
                var b = {};
                return function(c) {
                    var d;
                    return b[c] || (d = a('<input type="' + c + '" step="any" />'), b[c] = {
                        asNumber: function(a) {
                            var b = "object" == typeof a ? "valueAsDate" : "value";
                            return d.prop(b, a).prop("valueAsNumber")
                        },
                        asValue: function(a) {
                            var b = "object" == typeof a ? "valueAsDate" : "valueAsNumber";
                            return d.prop(b, a).prop("value")
                        },
                        asDate: function(a) {
                            var b = "number" == typeof a ? "valueAsNumber" : "value";
                            return d.prop(b, a).prop("valueAsDate")
                        },
                        isValid: function(b, c) {
                            return c && (c.nodeName || c.jquery) && (c = {
                                min: a(c).prop("min") || "",
                                max: a(c).prop("max") || "",
                                step: a(c).prop("step") || "any"
                            }), c = a.extend({
                                step: "any",
                                min: "",
                                max: ""
                            }, c || {}), d.attr(c).prop("value", b).is(":valid") && d.prop("value") == b
                        }
                    }), b[c]
                }
            }();
        s.range = s.number;
        var j = {
            _create: function() {
                var c,
                    d,
                    e,
                    f = this.options,
                    g = this.createOpts;
                for (this.type = f.type, this.orig = f.orig, this.buttonWrapper = a('<span class="input-buttons ' + this.type + '-input-buttons"></span>').insertAfter(this.element), this.options.containerElements.push(this.buttonWrapper[0]), f.mirrorValidity = f.mirrorValidity && this.orig && i, f.splitInput && this._addSplitInputs ? (f.monthSelect && this.element.addClass("ws-month-select"), this._addSplitInputs()) : this.inputElements = this.element, s[this.type] && "object" == typeof s[this.type].start && (s[this.type].start = this.asNumber(s[this.type].start)), b.picker[this.type] || (f.buttonOnly = !1), c = 0; c < g.length; c++)
                    null != f[g[c]] && this[g[c]](f[g[c]], f[g[c]]);
                "color" == this.type && this.inputElements.prop("maxLength", 7), this.addBindings(), a(this.element).data("wsWidget" + f.type, this), f.buttonOnly && this.inputElements.prop({
                    readOnly: !0
                }), this._init = !0, f.mirrorValidity && (d = this, e = function() {
                    clearTimeout(e._timerDealy), e._timerDealy = setTimeout(e._wsexec, 9)
                }, e._wsexec = function() {
                    clearTimeout(e._timerDealy), d.mirrorValidity(!0)
                }, e(), a(this.orig).on("change input", function(a) {
                    "input" == a.type ? e() : e._wsexec()
                }))
            },
            mirrorValidity: function(b) {
                if (this._init && this.options.mirrorValidity) {
                    b || a.prop(this.orig, "validity");
                    var c = a(this.orig).getErrorMessage();
                    c !== this.lastErrorMessage && (this.inputElements.prop("setCustomValidity", function(a, b) {
                        b._supvalue && b._supvalue.call(this, c)
                    }), this.lastErrorMessage = c)
                }
            },
            addBindings: function() {
                var c = this,
                    d = this.options,
                    e = function() {
                        c._addBindings()
                    };
                this._addBindings ? e() : (b.ready("forms-picker", e), v(this.type, "WINDOWLOAD")), this.inputElements.add(this.buttonWrapper).add(this.element).one("mousedown focusin", function() {
                    v(c.type, "DOM")
                }).on({
                    "change input focus focusin blur focusout": function(b) {
                        var e,
                            f;
                        a(b.target).trigger("ws__" + b.type), d.toFixed && "number" == d.type && "change" == b.type && (e = c.element.prop("value"), f = c.toFixed(e, !0), e != f && (c.element[0].value = f))
                    }
                }), "color" != this.type && !function() {
                    var b,
                        e,
                        g;
                    d.splitInput ? (b = function() {
                        c.reorderInputs(), d.monthSelect && (e = c.inputElements.filter("select.mm"), g = e.prop("value"), e.html(l(d)), e.prop("value", g))
                    }, c.reorderInputs()) : b = function() {
                        d.value && c.value(d.value, !0), f[c.type] && d.placeholder && c.placeholder(d.placeholder)
                    }, a(c.orig).onWSOff("wslocalechange", b)
                }()
            },
            required: function(a, b) {
                this.inputElements.attr({
                    "aria-required": "" + b
                }), this.mirrorValidity()
            },
            parseValue: function(b) {
                var c = this.inputElements.map(function() {
                    return a.prop(this, "value")
                }).get();
                return this.options.splitInput || (c = c[0]), e[this.type](c, this.options, b)
            },
            formatValue: function(a, b) {
                return d[this.type](a, b === !1 ? !1 : this.options)
            },
            createOpts: ["readonly", "title", "disabled", "tabindex", "placeholder", "defaultValue", "value", "required"],
            placeholder: function(b) {
                var c = this.options;
                c.placeholder = b;
                var d = b;
                f[this.type] && (d = f[this.type](b, this.options)), c.splitInput && "object" == typeof d ? a.each(this.splits, function(b, c) {
                    a.nodeName(c, "select") ? a(c).children("option:first-child").text(d[b]) : a.prop(c, "placeholder", d[b])
                }) : this.element.prop("placeholder", d)
            },
            list: function(b) {
                "number" == this.type && this.element.attr("list", a.attr(this.orig, "list")), this.options.list = b, this._propertyChange("list")
            },
            _propertyChange: a.noop,
            tabindex: function(b) {
                this.options.tabindex = b, this.inputElements.prop("tabindex", this.options.tabindex), a("button", this.buttonWrapper).prop("tabindex", this.options.tabindex)
            },
            title: function(b) {
                !b && this.orig && null == a.attr(this.orig, "title") && (b = null), this.options.title = b, null == b ? this.inputElements.removeAttr("title") : this.inputElements.prop("title", this.options.title)
            }
        };
        ["defaultValue", "value"].forEach(function(a) {
            j[a] = function(b, c) {
                (!this._init || c || b !== this.options[a]) && (this.element.prop(a, this.formatValue(b)), this.options[a] = b, this._propertyChange(a), this.mirrorValidity())
            }
        }), ["readonly", "disabled"].forEach(function(b) {
            var c = "disabled" == b;
            j[b] = function(d, e) {
                var f = this.options;
                f[b] == e && this._init || (f[b] = !!e, !c && f.buttonOnly ? this.inputElements.attr({
                    "aria-readonly": f[b]
                }) : this.inputElements.prop(b, f[b]), this.buttonWrapper[f[b] ? "addClass" : "removeClass"]("ws-" + b), c && a("button", this.buttonWrapper).prop("disabled", f[b]))
            }
        });
        var k = a.extend({}, j, {
            _create: function() {
                var c = this.options,
                    d = h(c.type);
                this.elemHelper = a('<input type="' + c.type + '" />'), this.asNumber = d.asNumber, this.asValue = d.asValue, this.isValid = d.isValid, this.asDate = d.asDate, j._create.apply(this, arguments), this._init = !1, this.buttonWrapper.html('<span unselectable="on" class="step-controls"><span class="step-up"></span><span class="step-down"></span></span>'), "number" == this.type && this.inputElements.attr("inputmode", "numeric"), (!c.max && "number" == typeof c.relMax || !c.min && "number" == typeof c.relMin) && b.error("relMax/relMin are not supported anymore calculate at set it your own."), this.options.relDefaultValue && b.warn("relDefaultValue was removed use startValue instead!"), this._init = !0
            },
            createOpts: ["step", "min", "max", "readonly", "title", "disabled", "tabindex", "placeholder", "defaultValue", "value", "required"],
            _addSplitInputs: function() {
                if (!this.inputElements) {
                    var b = p[this.type]._create(this.options);
                    this.splits = b.splits, this.inputElements = a(b.elements).prependTo(this.element).filter("input, select")
                }
            },
            addZero: u,
            _setStartInRange: function() {
                var a = this.options.startValue && this.asNumber(this.options.startValue) || s[this.type].start || 0;
                !isNaN(this.minAsNumber) && a < this.minAsNumber ? a = this.minAsNumber : !isNaN(this.maxAsNumber) && a > this.maxAsNumber && (a = this.maxAsNumber), this.elemHelper.prop("valueAsNumber", a), this.options.defValue = this.elemHelper.prop("value")
            },
            reorderInputs: function() {
                if (p[this.type]) {
                    var a = this.element.attr("dir", g.date.isRTL ? "rtl" : "ltr");
                    p[this.type].sort(a, this.options), setTimeout(function() {
                        var c = b.data(a);
                        c && c.shadowData && (c.shadowData.shadowFocusElement = a.find("input, select")[0] || a[0])
                    }, 9)
                }
            },
            step: function(a) {
                var b = s[this.type];
                this.options.step = a, this.elemHelper.prop("step", c(a, b.step)), this.mirrorValidity()
            },
            _beforeValue: function(a) {
                this.valueAsNumber = this.asNumber(a), this.options.value = a, isNaN(this.valueAsNumber) || !isNaN(this.minAsNumber) && this.valueAsNumber < this.minAsNumber || !isNaN(this.maxAsNumber) && this.valueAsNumber > this.maxAsNumber ? this._setStartInRange() : (this.elemHelper.prop("value", a), this.options.defValue = "")
            },
            toFixed: function(b, c) {
                var e = this.options;
                return e.toFixed && "number" == e.type && b && this.valueAsNumber && (c || !this.element.is(":focus")) && (!e.fixOnlyFloat || this.valueAsNumber % 1) && !a(this.orig).is(":invalid") && (b = d[this.type](this.valueAsNumber.toFixed(e.toFixed), this.options)), b
            }
        });
        ["defaultValue", "value"].forEach(function(b) {
            var c = "value" == b;
            k[b] = function(e, f) {
                (!this._init || f || this.options[b] !== e) && (c ? this._beforeValue(e) : this.elemHelper.prop(b, e), e = d[this.type](e, this.options), this.options.splitInput ? a.each(this.splits, function(d, f) {
                    b in f || c || !a.nodeName(f, "select") ? a.prop(f, b, e[d]) : a('option[value="' + e[d] + '"]', f).prop("defaultSelected", !0)
                }) : this.element.prop(b, this.toFixed(e)), this._propertyChange(b), this.mirrorValidity())
            }
        }), a.each({
            min: 1,
            max: -1
        }, function(a, b) {
            var c = a + "AsNumber";
            k[a] = function(d) {
                this.elemHelper.prop(a, d), this[c] = this.asNumber(d), null != this.valueAsNumber && (isNaN(this.valueAsNumber) || !isNaN(this[c]) && this.valueAsNumber * b < this[c] * b) && this._setStartInRange(), this.options[a] = d, this._init && o({
                    elements: this.inputElements
                }, this.options), this._propertyChange(a), this.mirrorValidity()
            }
        }), a.fn.wsBaseWidget = function(b) {
            return b = a.extend({}, b), this.each(function() {
                a.webshims.objectCreate(j, {
                    element: {
                        value: a(this)
                    }
                }, b)
            })
        }, a.fn.wsBaseWidget.wsProto = j, a.fn.spinbtnUI = function(b) {
            return b = a.extend({
                monthNames: "monthNamesShort"
            }, b), this.each(function() {
                a.webshims.objectCreate(k, {
                    element: {
                        value: a(this)
                    }
                }, b)
            })
        }, a.fn.spinbtnUI.wsProto = k
    }(), function() {
        var c = {};
        b.inlinePopover = {
            _create: function() {
                this.element = a('<div class="ws-inline-picker"><div class="ws-po-box" /></div>').data("wspopover", this), this.contentElement = a(".ws-po-box", this.element), this.element.insertAfter(this.options.prepareFor)
            },
            show: a.noop,
            hide: a.noop,
            preventBlur: a.noop,
            isVisible: !0
        }, c.isInRange = function(a, b, c) {
            return !(c[0] && c[0] > a[0] || b[0] && b[0] < a[0])
        }, c.createYearSelect = function(a, b, d, e, f) {
            f || (f = {
                start: a,
                step: 1,
                label: a
            });
            var g,
                h = !0,
                i = !0,
                j = ['<option selected="">' + f.label + "</option>"],
                k = 0,
                l = function(a, g) {
                    var h,
                        i;
                    return f.step > 1 ? (h = a + f.step - 1, i = a + " \u2013 " + h) : i = a, c.isInRange([a], b, d) || h && c.isInRange([h], b, d) ? (j[g]('<option value="' + (a + e) + '">' + i + "</option>"), !0) : void 0
                };
            for (e || (e = ""); 18 > k && (h || i);)
                k++, h && (g = f.start - k * f.step, h = l(g, "unshift")), i && (g = f.start + k * f.step, i = l(g, "push"));
            return j
        }, c._genericSetFocus = function(b, c) {
            if (b = a(b || this.activeButton), !this.popover.openedByFocus && !c) {
                var d = this,
                    e = function(a) {
                        clearTimeout(d.timer), d.timer = setTimeout(function() {
                            b[0] && (b.trigger("focus"), a === !0 || b.is(":focus") || e(!0))
                        }, d.popover.isVisible ? 0 : 360)
                    };
                this.popover.activateElement(b), e()
            }
        }, c._actions = {
            changeInput: function(a, b, d) {
                d.options.noChangeDismiss || c._actions.cancel(a, b, d), d.setChange(a)
            },
            cancel: function(a, b, c) {
                c.options.inlinePicker || (b.stopOpen = !0, c.element.getShadowFocusElement().trigger("focus"), setTimeout(function() {
                    b.stopOpen = !1
                }, 9), b.hide())
            }
        }, c.commonInit = function(b, c) {
            if (!b._commonInit) {
                b._commonInit = !0;
                var e;
                c.isDirty = !0, c.element.on("updatepickercontent pickerchange", function() {
                    e = !1
                }), b.options.inlinePicker || c.contentElement.on({
                    keydown: function(d) {
                        if (9 == d.keyCode) {
                            e || (e = a('input:not(:disabled), [tabindex="0"]:not(:disabled)', this).filter(":visible"));
                            var f = e.index(d.target);
                            if (d.shiftKey && 0 >= f)
                                return e.last().focus(), !1;
                            if (!d.shiftKey && f >= e.length - 1)
                                return e.first().focus(), !1
                        } else if (27 == d.keyCode)
                            return b.element.getShadowFocusElement().focus(), c.hide(), !1
                    }
                }), b._propertyChange = function() {
                    var a,
                        d = function() {
                            c.isVisible && c.element.triggerHandler("updatepickercontent")
                        };
                    return function(e) {
                        ("value" != e || b.options.inlinePicker) && (c.isDirty = !0, c.isVisible && (clearTimeout(a), a = setTimeout(d, 9)))
                    }
                }(), c.activeElement = a([]), c.activateElement = function(b) {
                    b = a(b), b[0] != c.activeElement[0] && (c.activeElement.removeClass("ws-focus"), b.addClass("ws-focus")), c.activeElement = b
                }, c.element.on({
                    wspopoverbeforeshow: function() {
                        b.element.triggerHandler("wsupdatevalue"), c.element.triggerHandler("updatepickercontent")
                    }
                }), a(b.orig).on("remove", function(c) {
                    c.originalEvent || a(d).off("wslocalechange", b._propertyChange)
                })
            }
        }, c._common = function(d) {
            var e = d.options,
                f = b.objectCreate(e.inlinePicker ? b.inlinePopover : b.wsPopover, {}, a.extend(e.popover || {}, {
                    prepareFor: e.inlinePicker ? d.buttonWrapper : d.element
                })),
                g = a('<button type="button" class="ws-popover-opener"><span /></button>').appendTo(d.buttonWrapper);
            e.widgetPosition && b.error("options.widgetPosition was removed use options.popover.position instead"), e.openOnFocus && f.options && ("auto" == f.options.appendTo || "element" == f.options.appendTo) && b.error('openOnFocus and popover.appendTo "auto/element" can prduce a11y problems try to change appendTo to body or similiar or use openOnMouseFocus instead');
            var h = function() {
                    (c[d.type].showPickerContent || c.showPickerContent)(d, f)
                },
                i = function() {
                    var a = v(d.type, "DOM");
                    e.disabled || e.readonly || !e.inlinePicker && f.isVisible || (b.ready(a, h), f.show(d.element))
                },
                j = function() {
                    (e.inlinePicker || f.isVisible) && f.activeElement && (f.openedByFocus = !1, f.activeElement.focus()), i()
                };
            e.containerElements.push(f.element[0]), f.element.addClass(d.type + "-popover input-picker").attr({
                role: "application"
            }).on({
                wspopoverhide: function() {
                    f.openedByFocus = !1
                },
                focusin: function(a) {
                    f.activateElement && (f.openedByFocus = !1, f.activateElement(a.target))
                },
                focusout: function() {
                    f.activeElement && f.activeElement.removeClass("ws-focus"), e.inlinePicker && (f.openedByFocus = !0)
                }
            }), t(f.element.children("div.ws-po-outerbox").attr({
                role: "group"
            }), e.labels, !0), t(g, e.labels, !0), null != e.tabindex && g.attr({
                tabindex: e.tabindex
            }), e.disabled && g.prop({
                disabled: !0
            }), g.on({
                click: j
            }), e.inlinePicker ? f.openedByFocus = !0 : (g.on({
                mousedown: function() {
                    k.apply(this, arguments), f.preventBlur()
                },
                focus: function() {
                    f.preventBlur()
                }
            }), function() {
                var b = !1,
                    c = function() {
                        b = !1
                    };
                d.inputElements.on({
                    keydown: function(b) {
                        40 == b.keyCode && b.altKey && !a.nodeName(b.target, "select") && j()
                    },
                    focus: function(c) {
                        f.stopOpen || !(e.buttonOnly || e.openOnFocus || b && e.openOnMouseFocus) || a.nodeName(c.target, "select") ? f.preventBlur() : (f.openedByFocus = e.buttonOnly ? !1 : !e.noInput, i())
                    },
                    mousedown: function(g) {
                        b = !0, setTimeout(c, 9), e.buttonOnly && f.isVisible && f.activeElement && (f.openedByFocus = !1, setTimeout(function() {
                            f.openedByFocus = !1, f.activeElement.focus()
                        }, 4)), d.element.is(":focus") && !a.nodeName(g.target, "select") && (f.openedByFocus = e.buttonOnly ? !1 : !e.noInput, i()), f.preventBlur()
                    }
                })
            }()), d.popover = f, d.opener = g, a(d.orig).on("remove", function(a) {
                a.originalEvent || setTimeout(function() {
                    g.remove(), f.element.remove()
                }, 4)
            }), e.inlinePicker && i()
        }, c.month = c._common, c.date = c._common, c.time = c._common, c["datetime-local"] = c._common, c.color = function(b) {
            var d = c._common.apply(this, arguments),
                e = a(b.orig).data("alphacontrol"),
                f = b.opener.prepend('<span class="ws-color-indicator-bg"><span class="ws-color-indicator" /></span>').find(".ws-color-indicator"),
                g = function() {
                    f.css({
                        backgroundColor: a.prop(this, "value") || "#000000"
                    })
                },
                h = function() {
                    var a,
                        c = function() {
                            try {
                                var a = b.alpha.prop("valueAsNumber") / (b.alpha.prop("max") || 1);
                                isNaN(a) || f.css({
                                    opacity: a
                                })
                            } catch (c) {}
                        };
                    return function(b) {
                        clearTimeout(a), a = setTimeout(c, b && "change" != b.type ? 40 : 4)
                    }
                }();
            return b.alpha = e ? a("#" + e) : a([]), a(b.orig).on("wsupdatevalue change", g).each(g), b.alpha.on("wsupdatevalue change input", h).each(h), d
        }, b.picker = c
    }(), function() {
        var c,
            e,
            g = Modernizr.inputtypes,
            j = {},
            l = {
                disabled: 1,
                required: 1,
                readonly: 1
            },
            m = ["disabled", "readonly", "value", "defaultValue", "min", "max", "step", "title", "required", "placeholder"],
            n = ["data-placeholder", "tabindex"];
        if (a.each(m.concat(n), function(a, d) {
            var e = d.replace(/^data\-/, "");
            b.onNodeNamesPropertyModify("input", d, function(a, d) {
                if (!c) {
                    var f = b.data(this, "shadowData");
                    f && f.data && f.nativeElement === this && f.data[e] && (l[e] ? f.data[e](a, d) : f.data[e](a))
                }
            })
        }), f.replaceUI && "valueAsNumber" in d.createElement("input")) {
            var o = function() {
                b.data(this, "hasShadow") && a.prop(this, "value", a.prop(this, "value"))
            };
            b.onNodeNamesPropertyModify("input", "valueAsNumber", o), b.onNodeNamesPropertyModify("input", "valueAsDate", o), a.each({
                stepUp: 1,
                stepDown: -1
            }, function(a) {
                var c = b.defineNodeNameProperty("input", a, {
                    prop: {
                        value: function() {
                            var a;
                            return c.prop && c.prop._supvalue && (a = c.prop._supvalue.apply(this, arguments), o.apply(this, arguments)), a
                        }
                    }
                })
            })
        }
        var q = function() {
                return function(b, c) {
                    j[b] = c, c.attrs = a.merge([], n, c.attrs), c.props = a.merge([], m, c.props)
                }
            }(),
            r = function() {
                return "none" != a.css(this, "display")
            },
            u = function(b) {
                var c,
                    d = function() {
                        a(b.orig).removeClass("ws-important-hide"), a.style(b.orig, "display", "");
                        var d,
                            e,
                            f,
                            g,
                            h,
                            i,
                            j = .8;
                        (!c || b.orig.offsetWidth) && (d = b.buttonWrapper && b.buttonWrapper.filter(r).length, i = d && "rtl" == b.buttonWrapper.css("direction"), i ? (g = "Right", h = "Left") : (g = "Left", h = "Right"), e = a.css(b.orig, "margin" + h), b.element.css("margin" + g, a.css(b.orig, "margin" + g)).css("margin" + h, d ? 0 : e), d && (b.buttonWrapper[i ? "addClass" : "removeClass"]("ws-is-rtl"), f = parseInt(b.buttonWrapper.css("margin" + g), 10) || 0, b.element.css("padding" + h, ""), 0 > f ? (e = (parseInt(e, 10) || 0) + -1 * (b.buttonWrapper.outerWidth() + f), b.buttonWrapper.css("margin" + h, e), b.element.css("padding" + h, "").css("padding" + h, (parseInt(b.element.css("padding" + h), 10) || 0) + b.buttonWrapper.outerWidth())) : (b.buttonWrapper.css("margin" + h, e), j = b.buttonWrapper.outerWidth(!0) + j)), b.element.outerWidth(a(b.orig).outerWidth() - j)), c = !0, a(b.orig).addClass("ws-important-hide")
                    };
                b.element.onWSOff("updateshadowdom", d, !0)
            },
            v = function() {
                var d,
                    g,
                    h,
                    l,
                    o,
                    p,
                    q = a.prop(this, "type");
                if (j[q] && b.implement(this, "inputwidgets")) {
                    for (h = {}, l = q, o = a(this).jProp("labels"), g = a.extend(b.getOptions(this, q, [f.widgets, f[q], a(a.prop(this, "form")).data(q)]), {
                        orig: this,
                        type: q,
                        labels: o,
                        options: {},
                        input: function(a) {
                            g._change(a, "input")
                        },
                        change: function(a) {
                            g._change(a, "change")
                        },
                        _change: function(b, d) {
                            c = !0, a.prop(g.orig, "value", b), c = !1, d && a(g.orig).trigger(d)
                        },
                        containerElements: []
                    }), d = 0; d < m.length; d++)
                        g[m[d]] = a.prop(this, m[d]);
                    for (d = 0; d < n.length; d++)
                        l = n[d].replace(/^data\-/, ""), "placeholder" != l && g[l] || (g[l] = a.attr(this, n[d]) || g[l]);
                    g.formatMonthNames && b.error("formatMonthNames was renamded to monthNames"), g.onlyMonthDigits && (g.monthNames = "monthDigits"), h.shim = j[q]._create(g), b.addShadowDom(this, h.shim.element, {
                        data: h.shim || {}
                    }), h.shim.options.containerElements.push(h.shim.element[0]), p = a.prop(this, "className"), g.classes && (p += " " + g.classes, a(this).addClass(g.classes)), (g.splitInput || "range" == q) && (p = p.replace("form-control", "")), h.shim.element.on("change input", k).addClass(p), h.shim.buttonWrapper && (h.shim.buttonWrapper.addClass("input-button-size-" + h.shim.buttonWrapper.children().filter(r).length), h.shim.buttonWrapper.filter(r).length && h.shim.element.addClass("has-input-buttons")), t(a(this).getShadowFocusElement(), o), a(this).on("change", function() {
                        c || h.shim.value(a.prop(this, "value"))
                    }), function() {
                        var b,
                            c = {
                                focusin: !0,
                                focus: !0
                            },
                            d = !1,
                            e = !1;
                        a(h.shim.options.containerElements).on({
                            "focusin focus focusout blur": function(f) {
                                f.stopImmediatePropagation(), e = c[f.type], clearTimeout(b), b = setTimeout(function() {
                                    e != d && (d = e, a(g.orig).triggerHandler(e ? "focus" : "blur"), a(g.orig).trigger(e ? "focusin" : "focusout")), d = e
                                }, 9)
                            }
                        })
                    }(), i && a(g.orig).on("firstinvalid", function(c) {
                        (b.fromSubmit || !e) && a(g.orig).off("invalid.replacedwidgetbubble").on("invalid.replacedwidgetbubble", function(d) {
                            d.isDefaultPrevented() || (b.validityAlert.showFor(c.target), c.preventDefault(), d.preventDefault()), a(g.orig).off("invalid.replacedwidgetbubble")
                        })
                    }), g.calculateWidth ? u(h.shim) : a(this).addClass("ws-important-hide")
                }
            };
        i && ["input", "form"].forEach(function(a) {
            var c = b.defineNodeNameProperty(a, "checkValidity", {
                prop: {
                    value: function() {
                        e = !0;
                        var a = c.prop._supvalue.apply(this, arguments);
                        return e = !1, a
                    }
                }
            })
        });
        var w = {};
        f.replaceUI && (a.isPlainObject(f.replaceUI) ? a.extend(w, f.replaceUI) : a.extend(w, {
            range: 1,
            number: 1,
            time: 1,
            month: 1,
            date: 1,
            color: 1,
            "datetime-local": 1
        })), g.number && -1 == navigator.userAgent.indexOf("Touch") && (/MSIE 1[0|1]\.\d/.test(navigator.userAgent) || /Trident\/7\.0/.test(navigator.userAgent)) && (w.number = 1), (!g.range || w.range) && q("range", {
            _create: function(b) {
                var c = a("<span />").insertAfter(b.orig).rangeUI(b).data("rangeUi");
                return c
            }
        }), ["number", "time", "month", "date", "color", "datetime-local"].forEach(function(c) {
            (!g[c] || w[c]) && q(c, {
                _create: function(d) {
                    (d.monthSelect || d.daySelect || d.yearSelect) && (d.splitInput = !0), d.splitInput && !p[c] && (b.warn("splitInput not supported for " + c), d.splitInput = !1);
                    var e = d.splitInput ? '<span class="ws-' + c + ' ws-input ws-inputreplace" role="group"></span>' : '<input class="ws-' + c + ' ws-inputreplace" type="text" />',
                        f = a(e).insertAfter(d.orig);
                    return f = s[c] ? f.spinbtnUI(d).data("wsWidget" + c) : f.wsBaseWidget(d).data("wsWidget" + c), b.picker && b.picker[c] && b.picker[c](f), f
                }
            })
        });
        var x = function() {
            b.addReady(function(b, c) {
                a("input", b).add(c.filter("input")).each(v)
            })
        };
        h._isLoading ? a(h).one("change", x) : x()
    }()
});

