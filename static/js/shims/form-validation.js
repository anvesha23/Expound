webshims.register("form-validation", function(a, b, c, d, e, f) {
    "use strict";
    var g = "webkitURL" in c,
        h = Modernizr.formvalidation && !b.bugs.bustedValidity,
        i = g && h,
        j = i && parseFloat((navigator.userAgent.match(/Safari\/([\d\.]+)/) || ["", "999999"])[1], 10),
        k = f.iVal;
    k.fieldWrapper || (k.fieldWrapper = ":not(span), :not(label), :not(em), :not(strong), :not(p)");
    var l = k.errorClass || (k.errorClass = "user-error"),
        m = k.successClass || "user-success",
        n = k.errorWrapperClass || (k.errorWrapperClass = "ws-invalid"),
        o = k.successWrapperClass || (k.successWrapperClass = "ws-success"),
        p = k.errorBoxClass || (k.errorBoxClass = "ws-errorbox"),
        q = k.errorMessageClass || (k.errorMessageClass = "ws-errormessage"),
        r = {
            checkbox: 1,
            radio: 1
        },
        s = b.loader,
        t = s.addModule,
        u = a([]),
        v = function() {
            return !a.prop(this, "form")
        },
        w = function(b) {
            b = a(b);
            var c,
                e,
                f = u;
            return "radio" == b[0].type && (e = b.prop("form"), c = b[0].name, f = c ? e ? a(e).jProp(c) : a(d.getElementsByName(c)).filter(v) : b, f = f.filter('[type="radio"]')), f
        },
        x = function(b, c) {
            var d;
            return a.each(b, function(b, e) {
                return e ? (d = b + a.prop(c, "validationMessage"), !1) : void 0
            }), d
        },
        y = function(a) {
            var b;
            try {
                b = d.activeElement.name === a
            } catch (c) {}
            return b
        },
        z = {
            radio: 1,
            checkbox: 1,
            "select-one": 1,
            "select-multiple": 1,
            file: 1,
            date: 1,
            month: 1,
            week: 1,
            text: 1
        },
        A = {
            time: 1,
            date: 1,
            month: 1,
            datetime: 1,
            week: 1,
            "datetime-local": 1
        },
        B = function(c) {
            if (k.sel) {
                var d,
                    e,
                    f,
                    g;
                if (c.target && (d = a(c.target).getNativeElement()[0], f = a(d).getShadowElement(), "submit" != d.type && a.prop(d, "willValidate") && ("change" != c.type || !(g = f.prop("type")) || z[g]))) {
                    e = a.data(d, "webshimsswitchvalidityclass");
                    var h = function() {
                        if (g || (g = f.prop("type")), !(i && ("change" == c.type || 537.36 > j) && A[g] && a(c.target).is(":focus") || "focusout" == c.type && "radio" == d.type && y(d.name))) {
                            if (b.refreshCustomValidityRules && "async" == b.refreshCustomValidityRules(d))
                                return a(d).one("refreshvalidityui", B), void 0;
                            var e,
                                h,
                                k,
                                n,
                                o,
                                p = a.prop(d, "validity");
                            p.valid ? f.hasClass(m) || (e = m, h = l, n = "changedvaliditystate", k = "changedvalid", r[d.type] && d.checked && w(d).not(d).removeClass(h).addClass(e).removeAttr("aria-invalid"), f.removeAttr("aria-invalid"), a.removeData(d, "webshimsinvalidcause")) : (o = x(p, d), a.data(d, "webshimsinvalidcause") != o && (a.data(d, "webshimsinvalidcause", o), n = "changedvaliditystate"), f.hasClass(l) || (e = l, h = m, r[d.type] && !d.checked && w(d).not(d).removeClass(h).addClass(e).attr("aria-invalid", "true"), f.attr("aria-invalid", "true"), k = "changedinvalid")), e && (f.addClass(e).removeClass(h), setTimeout(function() {
                                a(d).trigger(k)
                            }, 0)), n && setTimeout(function() {
                                a(d).trigger(n)
                            }, 0), a.removeData(d, "webshimsswitchvalidityclass")
                        }
                    };
                    f.triggerHandler("wsallowinstantvalidation", [c]) !== !1 && (e && clearTimeout(e), "refreshvalidityui" == c.type ? h() : a.data(d, "webshimsswitchvalidityclass", setTimeout(h, 9)))
                }
            }
        };
    a(d.body || "html").on(f.validityUIEvents || "focusout change refreshvalidityui invalid", B).on("reset resetvalui", function(b) {
        var c = a(b.target);
        c.is("form, fieldset") && (c = c.jProp("elements")), c.filter(".user-error, .user-success").removeAttr("aria-invalid").removeClass("user-error").removeClass("user-success").getNativeElement().each(function() {
            a.removeData(this, "webshimsinvalidcause")
        }).trigger("resetvalidityui")
    });
    var C = function() {
            b.scrollRoot = g || "BackCompat" == d.compatMode ? a(d.body) : a(d.documentElement)
        },
        D = Modernizr.boxSizing || Modernizr["display-table"] || a.support.getSetAttribute || a.support.boxSizing ? "minWidth" : "width",
        E = "transitionDelay" in d.documentElement.style,
        F = {
            display: "inline-block",
            left: 0,
            top: 0,
            marginTop: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0
        };
    C(), b.ready("DOM", C);
    var G = /right|left/g,
        H = function(a) {
            return "left" == a ? "right" : "left"
        };
    b.getRelOffset = function(b, c, d) {
        var e,
            f;
        return b = a(b), a.swap(b[0], F, function() {
            var g;
            a.position && d && a.position.getScrollInfo ? (d.of || (d.of = c), g = "rtl" == a(d.of).css("direction"), d.isRtl || (d.isRtl = !1), d.isRtl != g && (d.my = (d.my || "center").replace(G, H), d.at = (d.at || "center").replace(G, H), d.isRtl = g), b[d.isRtl ? "addClass" : "removeClass"]("ws-is-rtl"), d.using = function(a, c) {
                b.attr({
                    "data-horizontal": c.horizontal,
                    "data-vertical": c.vertical
                }), e = a
            }, b.attr({
                "data-horizontal": "",
                "data-vertical": "",
                "data-my": d.my,
                "data-at": d.at
            }), b.position(d)) : (e = a(c).offset(), f = b.offset(), e.top -= f.top, e.left -= f.left, e.top += c.outerHeight())
        }), e
    }, a.extend(b.wsPopover, {
        isInElement: function(b, c) {
            a.isArray(b) || (b = [b]);
            var d,
                e,
                f,
                g = !1;
            for (d = 0, e = b.length; e > d; d++)
                if (f = b[d], f && f.jquery && (f = f[0]), f && (f == c || a.contains(f, c))) {
                    g = !0;
                    break
                }
            return g
        },
        show: function(b) {
            if (!this.isVisible) {
                var e = a.Event("wspopoverbeforeshow");
                if (this.element.trigger(e), !e.isDefaultPrevented()) {
                    this.isVisible = !0, b = a(b || this.options.prepareFor).getNativeElement();
                    var f = this,
                        g = a(b).getShadowElement(),
                        h = function(a) {
                            clearTimeout(f.timers.repos), f.timers.repos = setTimeout(function() {
                                f.position(g)
                            }, a && "pospopover" == a.type ? 4 : 200)
                        };
                    this.clear(), this.element.removeClass("ws-po-visible").css("display", "none"), this.prepareFor(b, g), this.position(g), f.timers.show = setTimeout(function() {
                        f.element.css("display", ""), f.timers.show = setTimeout(function() {
                            f.element.addClass("ws-po-visible").trigger("wspopovershow")
                        }, 14)
                    }, 4), a(d.body || d).on("focusin" + this.eventns + " mousedown" + this.eventns, function(a) {
                        !f.options.hideOnBlur || f.stopBlur || f.isInElement([f.lastElement[0], b[0], f.element[0]], a.target) || f.hide()
                    }), this.element.off("pospopover").on("pospopover", h), a(c).on("resize" + this.eventns + " pospopover" + this.eventns, h)
                }
            }
        },
        _getAutoAppendElement: function() {
            var b = /^(?:span|i|label|b|p|tr|thead|tbody|table|strong|em|ul|ol|dl|html)$/i;
            return function(c) {
                for (var e, f = c[0], g = d.body; (f = f[e ? "offsetParent" : "parentNode"]) && 1 == f.nodeType && f != g;)
                    e || b.test(f.nodeName) || (e = f), e && "hidden" == a.css(f, "overflow") && "static" != a.css(f, "position") && (e = !1);
                return a(e || g)
            }
        }(),
        prepareFor: function(b, c) {
            var d,
                e,
                f = this,
                g = {},
                h = a.extend(!0, {}, this.options, b.jProp("form").data("wspopover") || {}, b.data("wspopover"));
            this.lastOpts = h, this.lastElement = a(b).getShadowFocusElement(), this.prepared && this.options.prepareFor || (e = "element" == h.appendTo ? b.parent() : "auto" == h.appendTo ? this._getAutoAppendElement(b) : a(h.appendTo), this.prepared && e[0] == this.element[0].parentNode || this.element.appendTo(e)), this.element.attr({
                "data-class": b.prop("className"),
                "data-id": b.prop("id")
            }), g[D] = h.constrainWidth ? c.outerWidth() : "", this.element.css(g), h.hideOnBlur && (d = function(a) {
                f.stopBlur ? a.stopImmediatePropagation() : f.hide()
            }, f.timers.bindBlur = setTimeout(function() {
                f.lastElement.off(f.eventns).on("focusout" + f.eventns + " blur" + f.eventns, d), f.lastElement.getNativeElement().off(f.eventns)
            }, 10)), this.prepared = !0
        },
        clear: function() {
            a(c).off(this.eventns), a(d).off(this.eventns), a(d.body).off(this.eventns), this.element.off("transitionend" + this.eventns), this.stopBlur = !1, this.lastOpts = !1, a.each(this.timers, function(a, b) {
                clearTimeout(b)
            })
        },
        hide: function() {
            var b = a.Event("wspopoverbeforehide");
            if (this.element.trigger(b), !b.isDefaultPrevented() && this.isVisible) {
                this.isVisible = !1;
                var d = this,
                    e = function(b) {
                        b && "transitionend" == b.type && (b = b.originalEvent) && b.target == d.element[0] && "hidden" == d.element.css("visibility") || (d.element.off("transitionend" + d.eventns).css("display", "none").attr({
                            "data-id": "",
                            "data-class": "",
                            hidden: "hidden"
                        }), clearTimeout(d.timers.forcehide), a(c).off("resize" + d.eventns))
                    };
                this.clear(), this.element.removeClass("ws-po-visible").trigger("wspopoverhide"), a(c).on("resize" + this.eventns, e), E && this.element.off("transitionend" + this.eventns).on("transitionend" + this.eventns, e), d.timers.forcehide = setTimeout(e, E ? 600 : 40)
            }
        },
        position: function(a) {
            var c = b.getRelOffset(this.element.removeAttr("hidden"), a, (this.lastOpts || this.options).position);
            this.element.css(c)
        }
    }), b.validityAlert = function() {
        f.messagePopover.position = a.extend({}, {
            at: "left bottom",
            my: "left top",
            collision: "none"
        }, f.messagePopover.position || {});
        var c = b.objectCreate(b.wsPopover, {}, f.messagePopover),
            d = c.hide.bind(c);
        return c.element.addClass("validity-alert").attr({
            role: "alert"
        }), a.extend(c, {
            hideDelay: 5e3,
            showFor: function(b, c, e, f) {
                b = a(b).getNativeElement(), this.clear(), this.hide(), f || (this.getMessage(b, c), this.show(b), this.hideDelay && (this.timers.delayedHide = setTimeout(d, this.hideDelay))), e || this.setFocus(b)
            },
            setFocus: function(d) {
                var e = a(d).getShadowFocusElement(),
                    g = b.scrollRoot.scrollTop() + (f.viewportOffset || 0),
                    h = e.offset().top - (f.scrollOffset || 30),
                    i = function() {
                        try {
                            e[0].focus()
                        } catch (a) {}
                        e[0].offsetWidth || e[0].offsetHeight || b.warn("invalid element seems to be hidden. Make element either visible or use disabled/readonly to bar elements from validation. With fieldset[disabled] a group of elements can be ignored."), c.element.triggerHandler("pospopover")
                    };
                g > h ? b.scrollRoot.animate({
                    scrollTop: h - 5 - (f.viewportOffset || 0)
                }, {
                    queue: !1,
                    duration: Math.max(Math.min(600, 1.5 * (g - h)), 80),
                    complete: i
                }) : i()
            },
            getMessage: function(a, b) {
                b || (b = a.getErrorMessage()), b ? c.contentElement.html(b) : this.hide()
            }
        }), c
    }();
    var I = {
        slide: {
            show: "slideDown",
            hide: "slideUp"
        },
        fade: {
            show: "fadeIn",
            hide: "fadeOut"
        },
        no: {
            show: "show",
            hide: "hide"
        }
    };
    k.fx && I[k.fx] || (k.fx = "slide"), a.fn[I[k.fx].show] || (k.fx = "no");
    var J = 0;
    if (b.errorbox = {
        create: function(b, c) {
            c || (c = this.getFieldWrapper(b));
            var d = a("div." + p, c);
            return d.length || (d = a('<div class="' + p + '" hidden="hidden" style="display: none;">'), c.append(d)), d.prop("id") || (J++, d.prop("id", "errorbox-" + J)), c.data("errorbox", d), d
        },
        getFieldWrapper: function(c) {
            var d;
            return d = "function" == typeof k.fieldWrapper ? k.fieldWrapper.apply(this, arguments) : a(c).parent().closest(k.fieldWrapper), d.length || b.error("could not find fieldwrapper: " + k.fieldWrapper), d
        },
        _createContentMessage: function() {
            var c = function() {
                return !c.types[this.type]
            };
            c.types = {
                hidden: 1,
                image: 1,
                button: 1,
                reset: 1,
                submit: 1
            };
            var d = {},
                e = function(a) {
                    return "-" + a.toLowerCase()
                },
                f = function(b) {
                    var c = a(b).data("errortype");
                    return c || a.each(d, function(d, e) {
                        return a(b).is(e) ? (c = d, !1) : void 0
                    }), c || "defaultMessage"
                };
            return a.each(["customError", "badInput", "typeMismatch", "rangeUnderflow", "rangeOverflow", "stepMismatch", "tooLong", "tooShort", "patternMismatch", "valueMissing"], function(a, b) {
                var c = b.replace(/[A-Z]/, e);
                d[b] = "." + c + ", ." + b + ", ." + b.toLowerCase() + ', [data-errortype="' + b + '"]'
            }), function(d, e, g) {
                var h = !1,
                    i = {};
                a(e).children().each(function() {
                    var b = f(this);
                    i[b] = a(this).html()
                }), a("input, select, textarea", g).filter(c).each(function(c, d) {
                    var e = a(d).data("errormessage") || {};
                    "string" == typeof e && (e = {
                        defaultMessage: e
                    }), a.each(i, function(a, b) {
                        e[a] || (h = !0, e[a] = b)
                    }), h && a(d).data("errormessage", e), b.getOptions && b.getOptions(d, "errormessage", !1, !0)
                })
            }
        }(),
        initIvalContentMessage: function(b) {
            a(b).jProp("form").is(k.sel) && this.get(b)
        },
        get: function(b, c) {
            c || (c = this.getFieldWrapper(b));
            var d,
                e = c.data("errorbox");
            return "object" != (d = typeof e) && (e ? "string" == d && (e = a("#" + e), c.data("errorbox", e, c)) : e = this.create(b, c), this._createContentMessage(b, e, c)), e
        },
        addSuccess: function(b, c) {
            var d = a.prop(b, "type"),
                e = function() {
                    var e = r[d] ? a.prop(b, "checked") : a(b).val();
                    c[e ? "addClass" : "removeClass"](o)
                },
                f = z[d] ? "change" : "blur";
            a(b).off(".recheckvalid").on(f + ".recheckinvalid", e), e()
        },
        hideError: function(b, c) {
            var d,
                e,
                f = this.getFieldWrapper(b);
            return f.hasClass(n) && (a(b).filter("input").off(".recheckinvalid"), !c && (d = a("input:invalid, select:invalid, textarea:invalid", f)[0]) ? a(d).trigger("refreshvalidityui") : (e = this.get(b, f), f.removeClass(n), e.message = "", e[I[k.fx].hide](function() {
                this.id == b.getAttribute("aria-describedby") && b.removeAttribute("aria-describedby"), a(this).attr({
                    hidden: "hidden"
                })
            }))), c || d || this.addSuccess(b, f), f
        },
        recheckInvalidInput: function(b) {
            if (k.recheckDelay && k.recheckDelay > 90) {
                var c,
                    d = function() {
                        B({
                            type: "input",
                            target: b
                        })
                    };
                a(b).filter('input:not([type="checkbox"]):not([type="radio"])').off(".recheckinvalid").on("input.recheckinvalid", function() {
                    clearTimeout(c), c = setTimeout(d, k.recheckDelay)
                }).on("focusout.recheckinvalid", function() {
                    clearTimeout(c)
                })
            }
        },
        showError: function(b) {
            var c = this.getFieldWrapper(b),
                d = this.get(b, c),
                e = a(b).getErrorMessage();
            return d.message != e && (d.stop && d.stop(!0, !0), d.html('<p class="' + q + '">' + e + "</p>"), d.message = e, c.addClass(n).removeClass(o), this.recheckInvalidInput(b), (d.is("[hidden]") || "none" == d.css("display")) && (b.getAttribute("aria-describedby") || b.setAttribute("aria-describedby", d.prop("id")), d.css({
                display: "none"
            }).removeAttr("hidden")[I[k.fx].show]())), c.removeClass(o), a(b).off(".recheckvalid"), c
        },
        reset: function(a) {
            this.hideError(a, !0).removeClass(o)
        },
        toggle: function(b) {
            a(b).is(":invalid") ? this.showError(b) : this.hideError(b)
        }
    }, a(d.body).on({
        changedvaliditystate: function(c) {
            if (k.sel) {
                var d = a(c.target).jProp("form");
                d.is(k.sel) && b.errorbox.toggle(c.target)
            }
        },
        resetvalidityui: function(c) {
            if (k.sel) {
                var d = a(c.target).jProp("form");
                d.is(k.sel) && b.errorbox.reset(c.target)
            }
        },
        firstinvalid: function(c) {
            if (k.sel && k.handleBubble) {
                var d = a(c.target).jProp("form");
                d.is(k.sel) && (c.preventDefault(), "none" != k.handleBubble && b.validityAlert.showFor(c.target, !1, !1, "hide" == k.handleBubble))
            }
        },
        submit: function(b) {
            return k.sel && k.submitCheck && a(b.target).is(k.sel) && a.prop(b.target, "noValidate") && !a(b.target).checkValidity() ? (b.stopImmediatePropagation(), !1) : void 0
        }
    }), b.modules["form-core"].getGroupElements = w, /[\s\:\>\~\+]/.test(k.sel || "") && b.error("please use a simple selector for iVal.sel: for example .validate"), f.replaceValidationUI && a(d).on("firstinvalid", function(a) {
        a.isDefaultPrevented() || (a.preventDefault(), setTimeout(function() {
            b.validityAlert.showFor(a.target)
        }, 4))
    }), function() {
        var b,
            c,
            e,
            f = [];
        a(d).on("invalid", function(d) {
            if (!d.wrongWebkitInvalid && !e) {
                var g = a(d.target);
                b || (b = a.Event("firstinvalid"), g.trigger(b)), b && b.isDefaultPrevented() && d.preventDefault(), f.push(d.target), d.extraData = "fix", clearTimeout(c), c = setTimeout(function() {
                    var c = {
                        type: "lastinvalid",
                        cancelable: !1,
                        invalidlist: a(f)
                    };
                    b = !1, f = [], e = !0, a(d.target).trigger(c, [c]), e = !1
                }, 9), g = null
            }
        })
    }(), !a.event.special.change && !a.event.special.input && Modernizr.inputtypes && f.fixRangeChange) {
        var K = {
            trigger: function() {
                K.blockElement && (K.blockElement = !1, setTimeout(function() {
                    K.requestedChange && K.value != K.requestedChange.value && a(K.requestedChange).trigger("change"), K.value = !1
                }, 9))
            },
            lastValue: !1,
            updateInputValue: function(a) {
                K.lastValue = a.target.value
            },
            triggerInput: function(b) {
                K.lastValue !== !1 && K.lastValue != b.target.value && a(b.target).trigger("input")
            },
            inputTeardown: function(b) {
                a(b.target).off("input", K.updateInputValue).off("blur", K.inputTeardown), K.lastValue = !1
            },
            inputSetup: function(b) {
                "range" == b.target.type && (K.inputTeardown(b), K.lastValue = b.target.value, a(b.target).on("input", K.updateInputValue).on("blur", K.inputTeardown))
            }
        };
        a.each([{
            name: "key",
            evt: "keyup"
        }, {
            name: "mouse",
            evt: "mouseup"
        }, {
            name: "touch",
            evt: "touchend"
        }], function(b, c) {
            var e = (c.name + "Setup", c.name + "Commit");
            K[c.name + "Block"] = function(b) {
                K.blockElement || "range" != b.target.type || (K.blockElement = b.target, K.value = b.target.value, a(K.blockElement).off("blur", K.trigger).on("blur", K.trigger), a(d.body).off(c.evt, K[e]).on(c.evt, K[e]))
            }, K[e] = function() {
                a(d.body).off(c.evt, K[e]), K.trigger()
            }
        }), a(d.body || "html").on({
            mousedown: K.mouseBlock,
            "keydown kepress": function(a) {
                a.keyCode < 45 && a.keyCode > 30 && K.keyBlock(a)
            },
            touchstart: K.touchBlock,
            focusin: K.inputSetup
        }), a.extend(!0, a.event.special, {
            change: {
                handle: function(a) {
                    return a.isTrigger || K.blockElement != a.target ? (K.requestedChange == a.target && (K.requestedChange = !1), a.handleObj.handler.apply(this, arguments), void 0) : (K.requestedChange = a.target, K.triggerInput(a), !1)
                }
            },
            input: {
                handle: function() {
                    var b,
                        c,
                        d = function() {
                            c && a(c).off("change", d), b = !1, c = !1
                        },
                        e = function(e) {
                            d(e), c = e.target, b = e.target.value, a(e.target).on("change", d)
                        };
                    return function(a) {
                        var d;
                        if (!a.isTrigger && "range" == a.target.type)
                            if (c != a.target)
                                e(a);
                            else if (c == a.target) {
                                if (b == (d = a.target.value))
                                    return !1;
                                b = a.target.value
                            }
                        a.handleObj.handler.apply(this, arguments)
                    }
                }()
            }
        })
    }
    b.cfg.debug !== !1 && ".ws-instantvalidation" != k.sel && a(function() {
        a("form.ws-instantvalidation").length && b.error(".ws-instantvalidation was renamed to .ws-validate")
    }), t("form-combat", {
        d: ["dom-support"],
        test: !(a.mobile && (a.mobile.selectmenu || a.mobile.checkboxradio) || a.fn.select2 || a.fn.chosen || a.fn.selectpicker || a.fn.selectBoxIt)
    }), t("position", {
        src: "plugins/jquery.ui.position.js",
        test: !(!a.position || !a.position.getScrollInfo)
    }), s.loadList(["form-combat", "position"])
});

