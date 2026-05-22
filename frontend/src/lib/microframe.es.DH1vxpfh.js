const ft = {};
function Xt(
  { key: s, importFn: r, resolve: m, fallback: l, error: u, ...a },
  C,
) {
  if (!r) throw Error("importFn is mandatory");
  const [P, , v] = $(ft[s]),
    [k, R] = $(null);
  if (
    (Mt(() => {
      r &&
        !P &&
        r()
          .then((U) => {
            let B = (ft[s] = U[m] || U.default || U);
            B && typeof B == "function"
              ? v(B)
              : ((ft[s] = null), R("Something wrong!!"));
          })
          .catch((U) => {
            (console.error(U), (ft[s] = null), R("Something wrong!!"), v(null));
          });
    }, []),
    k)
  )
    return /* @__PURE__ */ J("div", null, u);
  if (!P) return /* @__PURE__ */ J("section", null, l);
  const { importFn: b, fallback: L, error: j, resolve: w, ...N } = a;
  return /* @__PURE__ */ J(P, { ...N, key: s });
}
function Ht(s, r) {
  return function (l) {
    if (typeof window > "u") return s(l);
    const u = (l == null ? void 0 : l.key) || r;
    if (u == null)
      throw new Error(
        "memo component requires a unique key as the second argument",
      );
    const [a, C] = $(null);
    return (
      (!a || !jt(a.props, l)) &&
        C({
          props: l,
          component: s(l),
        }),
      a == null ? void 0 : a.component
    );
  };
}
function jt(s, r) {
  if (s === r) return !0;
  if (typeof s != "object" || s === null || typeof r != "object" || r === null)
    return !1;
  const m = Object.keys(s),
    l = Object.keys(r);
  if (m.length !== l.length) return !1;
  for (const u of m) if (s[u] !== r[u]) return !1;
  return !0;
}
const Tt = 739,
  _t = 740;
function St({ value: s }, r) {
  var m, l;
  Array.isArray(r) || (r = [r]);
  for (let u of r) {
    if (!u) continue;
    const a = (m = u == null ? void 0 : u.value) == null ? void 0 : m.$t;
    if (
      (a === Tt && ((l = u.props) == null ? void 0 : l.when) === s) ||
      a === _t
    )
      return kt(u);
  }
  return null;
}
function kt(s) {
  var m, l;
  const r = s.props || {};
  if (r.component) {
    const u = r.component;
    return /* @__PURE__ */ J(u, { ...r.componentProps });
  }
  return typeof r.render == "function"
    ? r.render(r.renderProps || {})
    : ((l = (m = s.value) == null ? void 0 : m.children) == null
        ? void 0
        : l[0]) || null;
}
function Yt(s, r) {
  return { $t: Tt, children: r };
}
function Gt(s, r) {
  return { $t: _t, children: r };
}
St.Case = Yt;
St.Default = Gt;
const $t = ({
    items: s,
    renderItem: r,
    itemHeight: m,
    windowHeight: l,
    overscan: u = 20,
  }) => {
    const [a, C] = $(0),
      P = (b) => {
        C(b.currentTarget.scrollTop);
      },
      v = Math.max(0, Math.floor(a / m) - u),
      k = Math.min(s.length, Math.ceil((a + l) / m) + u),
      R = () => {
        const b = [];
        for (let L = v; L < k; L++)
          b.push(
            /* @__PURE__ */ J(
              "div",
              {
                key: L,
                style: {
                  position: "absolute",
                  transform: `translateY(${L * m}px)`,
                  width: "100%",
                  height: `${m}px`,
                },
              },
              r(s[L], L),
            ),
          );
        return b;
      };
    return /* @__PURE__ */ J(
      "div",
      {
        style: {
          height: `${l}px`,
          overflowY: "auto",
          position: "relative",
        },
        onScroll: P,
      },
      /* @__PURE__ */ J(
        "div",
        {
          style: {
            height: `${s.length * m}px`,
            position: "relative",
          },
        },
        R(),
      ),
    );
  },
  pt = {};
function wt({ promiseFn: s, loading: r, error: m, onLoad: l, key: u }) {
  const [a, C] = $(pt[u]),
    [P, v] = $(null);
  if (!s) throw Error("promiseFn is mandatory");
  return (
    Mt(() => {
      s &&
        s()
          .then((k) => k.json())
          .then((k) => {
            (C(k), u && (pt[u] = k));
          })
          .catch((k) => {
            (console.error(k), v(k), (pt[u] = null));
          });
    }, []),
    P
      ? /* @__PURE__ */ React.createElement("div", null, m)
      : a
        ? l(a)
        : /* @__PURE__ */ React.createElement("div", null, r)
  );
}
const st = typeof window > "u",
  rt = () => {};
function Vt() {
  let s = [],
    r,
    m = !1,
    l = !0;
  return (u, a) => {
    if (l && (a == null ? void 0 : a.length) > 0) {
      l = !1;
      return;
    }
    return (
      a.some((P, v) => P !== (s == null ? void 0 : s[v]))
        ? (u(), (s = a))
        : (s == null ? void 0 : s.length) === (a == null ? void 0 : a.length) &&
          a.length === 0 &&
          (m || ((r = u()), (m = !0))),
      r
    );
  };
}
const q = /* @__PURE__ */ new Set();
let M = null;
const Pt = (s) => {
  M = s;
};
let nt = rt,
  mt = st ? rt : () => {};
const z = /* @__PURE__ */ (() => {
    const s = {};
    let r = null,
      m = 0,
      l = null,
      u = 0;
    const a = /* @__PURE__ */ new Map(),
      C = /* @__PURE__ */ new Map(),
      P = {};
    let v = 0;
    const k = {};
    let R = 0,
      b = !1,
      L = !1;
    const j = (T) => {
        (console.warn("untested code"), (b = !0), T(), (b = !1), mt());
      },
      w = st
        ? rt
        : (T, h = 100) => {
            ((mt = T), (nt = mt));
          },
      N = (T) => {
        ((L = !0), T(), (L = !1));
      },
      U = st
        ? rt
        : () => {
            for (const [T, h] of a) {
              const g = h();
              (a.set(T, () => {}), g && C.set(T, g));
            }
          },
      B = (T) => {
        if (
          ((r = l = null),
          (m = u = 0),
          (v = 0),
          Object.entries(P).forEach(([h, g]) => {
            (g(), delete P[h]);
          }),
          (R = 0),
          st)
        )
          (a.clear(),
            C.clear(),
            Object.keys(s).forEach((h) => {
              delete s[h];
            }));
        else {
          if (!T) return;
          T.forEach((h) => {
            var g;
            for (const [A, _] of a)
              A === h &&
                (a.delete(A), (g = C.get(A)) == null || g(), C.delete(A));
            (Object.keys(s).forEach((A) => {
              A.startsWith(h) && delete s[A];
            }),
              Object.keys(k).forEach((A) => {
                var _, S;
                A.startsWith(h) &&
                  ((S = (_ = k[A]) == null ? void 0 : _.__clean) == null ||
                    S.call(_),
                  delete k[A]);
              }));
          });
        }
      };
    return {
      state: (T) => {
        r != M && (m = 0);
        const h = `${M}-${m}`;
        s[h] == null && (s[h] = T);
        const g = (_) => {
            var W;
            let S;
            (typeof _ == "function" ? (S = _(s[h])) : (S = _),
              S !== s[h] &&
                ((s[h] = S),
                (r = (W = h.split("-")) == null ? void 0 : W[0]),
                L || (r && q.add(r), b || nt()),
                (r = null)));
          },
          A = (_) => {
            var S;
            s[h] !== _ &&
              ((r = (S = h.split("-")) == null ? void 0 : S[0]),
              B(),
              (s[h] = _),
              nt(),
              (r = null));
          };
        return (r != M && (r = M), m++, [s[h], g, A]);
      },
      context: (T) => {
        if (M) throw new Error("Context cannot be created inside a component");
        let h = T,
          g = !1;
        return {
          get: () => (g && M && q.add(M), h),
          set: (S) => {
            let W;
            (typeof S == "function" ? (W = S(h)) : (W = S),
              W !== h &&
                ((h = W),
                L ||
                  ((g = !0),
                  (P[v++] = () => {
                    g = !1;
                  }),
                  b || nt())));
          },
        };
      },
      ref: (T) => {
        r != M && (R = 0);
        const h = `${M}-${R}`;
        k[h] == null && (k[h] = T);
        const g = (A) => {
          var S;
          let _;
          (typeof A == "function" ? (_ = A(k[h])) : (_ = A),
            _ !== k[h] &&
              ((k[h] = _),
              (r = (S = h.split("-")) == null ? void 0 : S[0]),
              L || (r && q.add(r), b || nt()),
              (r = null)));
        };
        return (r != M && (r = M), R++, [k[h], g]);
      },
      init: U,
      reset: B,
      skipUpdate: N,
      batch: j,
      registerCallback: w,
      effect: st
        ? rt
        : (T, h) => {
            if ((l != M && (u = 0), (h == null ? void 0 : h.length) === 0)) {
              (a.has(`${M}`) || a.set(`${M}`, T), (u = 0));
              return;
            }
            const g = `${M}-fn-${u}`;
            if (!s[g]) {
              const _ = Vt();
              s[g] = _;
            }
            const A = s[g](T, h);
            ((h == null ? void 0 : h.length) === 0 &&
              ((s[g] = () => {}), A && C.set(g, A)),
              l != M && (l = M),
              u++);
          },
    };
  })(),
  $ = z.state,
  Nt = z.context,
  dt = z.ref,
  Kt = z.init,
  Zt = z.reset,
  te = z.skipUpdate,
  ee = z.batch,
  Jt = z.registerCallback,
  Mt = z.effect,
  Z = typeof window < "u",
  Q = () => {},
  Y = Z ? Q : console.log,
  At = Z ? Q : console.time,
  Lt = Z ? Q : console.timeEnd,
  H = /* @__PURE__ */ new Map();
function it(s) {
  return (H.has(s) || H.set(s, new Event(s).bubbles), !H.get(s));
}
Y("check https://github.com/pomber/incremental-rendering-demo");
let X = {},
  K = {};
function xt(s, r) {
  if (s === r) return !1;
  if (!s || !r) return !0;
  const m = Object.keys(s);
  if (m.length !== Object.keys(r).length) return !0;
  for (let l = 0; l < m.length; l++) {
    const u = m[l];
    if (!(u in r) || s[u] !== r[u]) return !0;
  }
  return !1;
}
const Rt = /* @__PURE__ */ (() => {
    let s = [];
    function r(l, ...u) {
      return u;
    }
    function m(l, u, ...a) {
      var v, k, R;
      let C, P;
      if ((Array.isArray(a) && (a = a.flat()), typeof l == "function")) {
        C = (v = s[s.length - 1]) == null ? void 0 : v.n;
        const b = `${l.name}:${C}:${u == null ? void 0 : u.key}`;
        (s.push({ n: l == null ? void 0 : l.name, comp: b }), Pt(b));
        const L = K[b];
        L
          ? q.has((k = s[s.length - 2]) == null ? void 0 : k.comp) &&
            xt(L.props, u) &&
            q.add(b)
          : q.add(b);
        let j = l(u, a);
        return (
          (X[b] = {
            name: b,
            // parent: stack[stack.length - 2]?.comp, // this might be useful
            mount: !0,
            unMount: null,
            props: u,
          }),
          s.pop(),
          Pt(null),
          j
        );
      }
      if (
        (q.has((R = s[s.length - 1]) == null ? void 0 : R.comp)
          ? (P = !0)
          : (P = void 0),
        l === "df")
      ) {
        let b = a.length;
        return {
          type: l,
          updtFlag: P,
          props: u || {},
          fragChildLen: b,
          children: a,
        };
      } else
        return {
          // _c,
          type: l,
          updtFlag: P,
          props: u || {},
          // children: props?.ignoreNode ? [] : children,
          children:
            (l != null && l.includes("-")) ||
            (u != null && u.ignoreNode) ||
            (l == null ? void 0 : l.toLowerCase()) === "iframe" ||
            (l == null ? void 0 : l.toLowerCase()) === "script" ||
            (l == null ? void 0 : l.toLowerCase()) === "template"
              ? []
              : a,
        };
    }
    return {
      h: m,
      df: r,
    };
  })(),
  J = Rt.h,
  ne = Rt.df;
let lt = {};
typeof window < "u" &&
  (lt = {
    ...(() => {
      function r(t) {
        (H.has(t) || H.set(t, new Event(t).bubbles),
          H.get(t) && !m.has(t) && (C.addEventListener(t, _, !1), m.add(t)));
      }
      const m = /* @__PURE__ */ new Set();
      let l = [];
      function u() {
        var e, n;
        const t = [];
        for (const i in K)
          X[i] ||
            ((n = (e = K[i]).unMount) == null || n.call(e),
            (K[i].unMount = null),
            delete K[i],
            t.push(i));
        Zt(t);
      }
      function a() {
        for (; l != null && l.length; ) l.pop()();
        Kt();
      }
      let C = null,
        P = null,
        v = null;
      function k(t, e, n) {
        n ? (t.setAttribute(e, n), (t[e] = !0)) : (R(t, e), (t[e] = !1));
      }
      function R(t, e) {
        (t.removeAttribute(e), (t[e] = !1));
      }
      function b(t) {
        return /^on[A-Z]/.test(t);
      }
      function L(t) {
        return t.slice(2).toLowerCase();
      }
      function j(t) {
        return b(t) || t === "fragChildLen";
      }
      function w(t, e, n) {
        if (j(e)) {
          if (b(e)) {
            const i = L(e);
            it(i) || (t[`__${e}`] = n);
          }
          return;
        } else if (e === "className") t.setAttribute("class", n);
        else if (e === "style") for (const i in n) t.style[i] = n[i];
        else if (e === "ref") n == null || n(t);
        else if (e === "ignoreLater")
          (t.setAttribute("ignorenode", !0),
            t.removeAttribute(e.toLowerCase()));
        else if (typeof n == "boolean") k(t, e, n);
        else {
          if (e === "value" || e === "htmlFor") {
            t[e] = n;
            const i = setTimeout(() => {
              (clearTimeout(i), (t[e] = n));
            }, 0);
            return;
          }
          t.setAttribute(e, n);
        }
      }
      function N(t, e, n) {
        j(e) ||
          (e === "className"
            ? t.removeAttribute("class")
            : typeof n == "boolean"
              ? R(t, e)
              : t.removeAttribute(e));
      }
      function U(t, e) {
        for (const n in e) w(t, n, e[n]);
      }
      function B(t, e, n, i) {
        if (!n && n == null) N(t, e, i);
        else if (j(e)) {
          if (b(e)) {
            const c = L(e);
            it(c)
              ? (t._events &&
                  t._events[`${c}`] &&
                  t.removeEventListener(c, t._events[`${c}`], !1),
                ut(t, { [e]: n }))
              : (t[`__${e}`] = n);
          }
        } else (!i || n !== i) && w(t, e, n);
      }
      function gt(t, e, n = {}) {
        const i = Object.assign({}, e, n);
        for (const c in i)
          if (b(c)) {
            const p = L(c);
            if (it(p)) B(t, c, e[c], n[c]);
            else {
              t[`__${c}`] = e[c];
              const O = p;
              t.getAttribute(O) !== null && t.removeAttribute(O);
            }
          } else B(t, c, e[c], n[c]);
      }
      function ut(t, e) {
        for (const n in e)
          if (b(n)) {
            const i = L(n),
              c = it(i);
            (t._events || (t._events = {}),
              c
                ? (t._events[i] && t.removeEventListener(i, t._events[i], !1),
                  (t._events[i] = e[n]),
                  t.addEventListener(i, e[n], !1))
                : (r(i), (t[`__${n}`] = e[n])));
          }
      }
      const F = document,
        at = "http://www.w3.org/2000/svg",
        T = (t, e, ...n) => {
          function i(p, x) {
            for (const O in x) p.setAttributeNS(null, O, x[O]);
          }
          const c = F.createElementNS(at, "svg");
          i(c, e);
          for (const p of n) {
            const x = F.createElementNS(at, p.type);
            (i(x, p.props), c.appendChild(x));
          }
          return c;
        },
        h = (t, e) => {
          let n = 0;
          const i = t.length;
          function c(p) {
            const x = document.createDocumentFragment();
            for (; n < i && p.timeRemaining() > 1; )
              (x.appendChild(g(t[n])), n++);
            (x.childNodes.length > 0 && e.appendChild(x),
              n < i && requestIdleCallback(c));
          }
          requestIdleCallback(c);
        };
      function g(t) {
        if (!(t != null && t.type))
          return t != null && t.$c
            ? t.children
              ? g(t.children[0])
              : // node?.value == null || node?.value == undefined
                (t == null ? void 0 : t.value) == null ||
                  typeof (t == null ? void 0 : t.value) == "boolean"
                ? F.createComment(t.value)
                : F.createTextNode(t == null ? void 0 : t.value)
            : t == null || typeof t == "boolean"
              ? F.createComment(t)
              : F.createTextNode(t);
        if ((t == null ? void 0 : t.type) === "df") {
          const n = F.createDocumentFragment();
          if (t.children.length > 100) h(t.children, n);
          else
            for (let i = 0, c = t.children.length; i < c; ++i)
              n.appendChild(g(t.children[i]));
          return n;
        }
        if (t.type === "svg") return T(t.type, t.props, ...t.children);
        const e = F.createElement(t.type);
        if (!(t != null && t.$c)) {
          (U(e, t.props), ut(e, t.props));
          for (const n in t.props)
            if (b(n)) {
              const i = L(n);
              it(i) || (e[`__${n}`] = t.props[n]);
            }
        }
        if (t.children.length > 100) h(t.children, e);
        else
          for (let n = 0, i = t.children.length; n < i; ++n)
            e.appendChild(g(t.children[n]));
        return e;
      }
      function A(t, e) {
        var n, i;
        return (t == null ? void 0 : t.type) ===
          (e == null ? void 0 : e.type) &&
          (t == null ? void 0 : t.type) === "df"
          ? (t == null ? void 0 : t.$c) !== (e == null ? void 0 : e.$c)
          : // node1 != node2 ||
            typeof t != typeof e || // (typeof node1 === "string" && node1 !== node2) ||
              (!(t != null && t.type) && t !== e) ||
              (t == null ? void 0 : t.type) !== (e == null ? void 0 : e.type) ||
              (t == null ? void 0 : t.value) !==
                (e == null ? void 0 : e.value) ||
              ((n = t == null ? void 0 : t.props) == null ? void 0 : n.name) !==
                ((i = e == null ? void 0 : e.props) == null ? void 0 : i.name);
      }
      function _(t) {
        const e = t.type,
          n = `__on${e.charAt(0).toUpperCase()}${e.slice(1)}`;
        let i = t.target;
        for (; i && i !== C.parentElement; ) {
          const c = i[n];
          if ((c && c(t), t.cancelBubble)) break;
          i = i.parentElement;
        }
      }
      let S = !1;
      function W(t, e) {
        ((C = t),
          (P = e),
          (v = P()),
          C.firstChild
            ? C.replaceChild(g(v), C.firstChild)
            : C.appendChild(g(v)),
          a(),
          (K = { ...X }),
          (X = {}),
          (S = !0));
      }
      let D = [],
        d = [];
      function Dt(t, e = document.body) {
        const n = document.createTreeWalker(
            e,
            NodeFilter.SHOW_COMMENT,
            null,
            !1,
          ),
          i = [];
        for (; n.nextNode(); )
          n.currentNode.nodeValue.includes(t) && i.push(n.currentNode);
        return (i.forEach((c) => c.remove()), i.length);
      }
      function Ot(t, e) {
        ((S = !1), (C = t), (P = e), (v = P()));
        const n = Dt("|", C);
        (Y(`Removed ${n} comments`), u(), Et(), (S = !0));
      }
      function Et() {
        Z || At("TETVD");
        let t = P();
        (Z || Lt("TETVD"),
          Y(v, t),
          (D = []),
          (d = []),
          Z || At("TET"),
          Ft(C, t, v),
          u(),
          d && It(d),
          D && Ut(D),
          (D = d = null),
          a(),
          (v = t),
          (K = { ...X }),
          (X = {}),
          Z || Lt("TET"));
      }
      function Ct(t) {
        return t !== void 0 || t !== "";
      }
      const ct = {
        routeChange: !1,
        set: (t) => {
          ct.routeChange = t;
        },
      };
      ["popstate", "navigate"].forEach((t) =>
        window.addEventListener(t, () => ct.set(!0)),
      );
      function Ft(t, e, n, i = 0) {
        let c = Wt(C),
          p = 0,
          x = null,
          O = !1,
          G = null,
          ot = 0;
        ct.routeChange && ct.set(!1);
        const bt = q.size;
        let zt = bt === 0 || !S;
        function yt(E, o, f, I = 0) {
          if (!(o != null && o.updtFlag) && bt) {
            if (o != null && o.type && f != null && f.type) return vt(o, f);
            if (o === f) return;
          }
          if ((ot++, !Ct(f)))
            (Y("append: "), D.push({ p: E, op: "APPEND", c: o }));
          else if (Ct(o))
            if (A(o, f)) {
              if (
                ((o == null ? void 0 : o.type) === "df" &&
                  (f == null ? void 0 : f.type) === "df") ||
                (o != null && o.type && f != null && f.type)
              ) {
                ++p;
                const y = c[p];
                if (
                  (D.push({
                    p: y.parentNode,
                    op: "REPLACE",
                    c: [o, y],
                  }),
                  (y == null ? void 0 : y.nodeType) === 1)
                )
                  for (; y.contains(c[p]); ) p++;
                p--;
              } else if (E != null && E.childNodes[I]) {
                let y = E.childNodes[I];
                if (
                  (D.push({
                    p: E,
                    op: "REPLACE",
                    c: [o, y],
                  }),
                  (y == null ? void 0 : y.nodeType) === 1)
                ) {
                  for (
                    f != null &&
                      f.children &&
                      (f = f.children = f.props = null),
                      p++;
                    p < c.length && y.contains(c[p]);
                  )
                    p++;
                  p--;
                } else f != null && f.value && (f = f.value = f.props = null);
                const V = f == null ? void 0 : f.fragChildLen;
                if ((f == null ? void 0 : f.type) === "df" && V)
                  for (let tt = V - 1; tt >= 1; --tt)
                    (D.push({
                      p: E,
                      op: "REMOVE",
                      c: E.childNodes[I + tt],
                    }),
                      (p += 1));
                y = null;
              } else
                O
                  ? D.push({
                      p: G,
                      op: "APPEND",
                      c: o,
                    })
                  : D.push({
                      p: E,
                      op: "APPEND",
                      c: o,
                    });
              f != null && f.children && (v = f.children = f.props = null);
            } else o != null && o.type && vt(o, f);
          else {
            let y = E.childNodes[I];
            if (
              (D.push({
                p: E,
                op: "REMOVE",
                c: y,
              }),
              (y == null ? void 0 : y.nodeType) === 1)
            ) {
              for (; p < c.length; )
                if ((p++, c[p] === y)) {
                  const V = y.querySelectorAll("*").length;
                  c.splice(p, V);
                  break;
                }
            }
            ((y = null),
              f != null && f.children && (v = f.children = f.props = null));
          }
        }
        function vt(E, o) {
          var V;
          (E == null ? void 0 : E.type) !== "df" ? (p += 1) : E.$c;
          const f = c[p];
          if (
            (x !== f &&
              (((E != null && E.updtFlag) || zt) &&
                o.type === E.type && // ===
                //   domNode?.tagName?.toLowerCase()
                xt(o.props, E.props) &&
                d.push({
                  $target: f,
                  newProps: E.props,
                  oldProps: o.props,
                }),
              (x = f)),
            (V = E == null ? void 0 : E.props) != null && V.ignoreNode)
          )
            return;
          if (
            (o == null ? void 0 : o.type) === "df" &&
            (E == null ? void 0 : E.type) !== "df"
          ) {
            if (
              (Y("special handling"),
              D.push({
                op: "REPLACE",
                p: f.parentNode,
                c: [E, f],
              }),
              (f == null ? void 0 : f.nodeType) === 1)
            )
              for (; f.contains(c[p]); ) p++;
            (o != null && o.children && (v = o.children = o.props = null), p--);
            return;
          }
          const I = E.children.length,
            y = o.children.length;
          if (
            (I > 100 &&
              y !== 0 &&
              ((O = !0),
              (G = F.createDocumentFragment()),
              Y(
                "have for loop custom component or see how this can be optimized",
              )),
            I + y !== 0)
          )
            if (I === 0) {
              for (; f.contains(c[p]); ) p++;
              (D.push({
                p: f,
                op: "REMOVEALL",
              }),
                o != null && o.children && (v = o.children = o.props = null));
            } else if (y === 0)
              D.push({
                p: f,
                op: "APPEND_CHILDREN",
                c: E.children,
              });
            else {
              let tt = I > y ? I : y;
              for (let et = 0; et < tt; et++)
                yt(f, E.children[et], o.children[et], et);
            }
          O &&
            (D.push({
              p: f,
              op: "APPENDDF",
              c: G,
            }),
            (O = !1),
            (G = null));
        }
        (yt(t, e, n, i),
          (x = G = null),
          (c.length = 0),
          q.clear(),
          Y(ot),
          (ot = 0));
      }
      function It(t) {
        for (let e = 0; e < t.length; e++) {
          const n = t[e];
          (gt(n.$target, n.newProps, n.oldProps),
            (n.$target = null),
            (n.newProps = null),
            (n.oldProps = null));
        }
        t.length = 0;
      }
      function Ut(t) {
        const e = [];
        for (let n = 0; n < t.length; n++) {
          const i = t[n];
          switch (i.op) {
            case "APPENDDF":
              i.p.appendChild(i.c);
              break;
            case "APPEND":
              i.p.appendChild(g(i.c));
              break;
            case "APPEND_CHILDREN": {
              const x = F.createDocumentFragment();
              for (let O = 0, G = i.c.length; O < G; ++O)
                x.appendChild(g(i.c[O]));
              i.p.appendChild(x);
              break;
            }
            case "REMOVE":
              (i.p.removeChild(i.c), e.push(ht(i.c)));
              break;
            case "REMOVEALL":
              const c = i.p,
                p = c.cloneNode(!1);
              (c.parentNode.replaceChild(p, c),
                (i.p = p),
                e.push(Promise.resolve().then(() => ht(c))));
              break;
            case "REPLACE":
              (i.p.replaceChild(g(i.c[0]), i.c[1]), e.push(ht(i.c[1])));
              break;
            case "CONTENT":
              i.p.textContent = i.c;
              break;
          }
          i.p = i.c = null;
        }
        ((t.length = 0),
          e.length > 0 &&
            Promise.all(e)
              .catch((n) => Y("Error during node disposal:", n))
              .finally(() => {
                e.length = 0;
              }));
      }
      const ht = async (t) => {
        var n;
        const e = [t];
        for (; e.length > 0; ) {
          let i = e.pop();
          if (i) {
            if (i && i._events) {
              for (const c in i._events)
                i.removeEventListener(c, i._events[c], !1);
              i._events = null;
            }
            for (const c in i) c.startsWith("__on") && (i[c] = null);
            if (i.childNodes)
              for (let c = i.childNodes.length - 1; c >= 0; c--)
                (e.push(i.childNodes[c]), c % 50 === 0 && (await qt()));
            ((n = i == null ? void 0 : i.remove) == null || n.call(i),
              (i = null));
          }
        }
        ((t = null), (e.length = 0));
      };
      function Bt(t) {
        return t.tagName.includes("-");
      }
      function Wt(t) {
        let e = [t],
          n = t;
        function i() {
          for (; n; ) {
            const p = !(
              (n == null ? void 0 : n.getAttribute("ignorenode")) != null ||
              n.tagName === "IFRAME" ||
              Bt(n)
            );
            n.firstElementChild && p
              ? ((n = n.firstElementChild), e.push(n))
              : c();
          }
        }
        function c() {
          for (; n; ) {
            if (n.nextElementSibling) {
              ((n = n.nextElementSibling), e.push(n));
              return;
            }
            ((n = n.parentElement), n === t && (n = null));
          }
        }
        return (i(), (n = t = null), e);
      }
      function qt() {
        var t;
        return (t = globalThis.scheduler) != null && t.yield
          ? scheduler.yield()
          : new Promise((e) => {
              setTimeout(e, 0);
            });
      }
      return {
        mount: W,
        forceUpdate: Et,
        hydrate: Ot,
        createElement: g,
      };
    })(),
  });
const ie = lt.mount || Q,
  Qt = lt.forceUpdate || Q,
  se = lt.hydrate || Q,
  re = lt.createElement || Q;
if (typeof window < "u") {
  class s {
    constructor() {
      ((this.dirty = !1),
        (this.channel = new MessageChannel()),
        (this.channel.port1.onmessage = () => this.flush()));
    }
    schedule() {
      this.dirty || ((this.dirty = !0), this.channel.port2.postMessage(null));
    }
    flush() {
      ((this.dirty = !1), Qt());
    }
  }
  const r = new s();
  Jt(() => {
    r.schedule();
  }, 0);
}
export {
  Yt as Case,
  Gt as Default,
  Xt as Lazy,
  wt as Loader,
  St as Switch,
  $t as VirtualList,
  ee as batch,
  Nt as createContext,
  Mt as createEffect,
  re as createElement,
  dt as createRef,
  $ as createState,
  ne as df,
  Qt as forceUpdate,
  J as h,
  se as hydrate,
  Ht as memo,
  ie as mount,
  Zt as reset,
  Pt as setCurrComp,
  te as skipUpdate,
};
