const at = {};
function ie({ key: i, importFn: c, resolve: g, fallback: f, error: l, ...h }, A) {
  if (!c)
    throw Error("importFn is mandatory");
  const [_, , O] = I(at[i]), [T, x] = I(null);
  if (Vt(() => {
    c && !_ && c().then((q) => {
      let j = at[i] = q[g] || q.default || q;
      j && typeof j == "function" ? O(j) : (at[i] = null, x("Something wrong!!"));
    }).catch((q) => {
      console.error(q), at[i] = null, x("Something wrong!!"), O(null);
    });
  }, []), T)
    return l;
  if (!_)
    return f;
  const { importFn: y, fallback: P, error: M, resolve: st, ...H } = h;
  return /* @__PURE__ */ nt(_, { ...H, key: i });
}
function se(i, c) {
  return function(f) {
    if (typeof window > "u")
      return i(f);
    const l = (f == null ? void 0 : f.key) || c;
    if (l == null)
      throw new Error(
        "memo component requires a unique key as the second argument"
      );
    const [h, A] = I(null);
    return (!h || !Ht(h.props, f)) && A({
      props: f,
      component: i(f)
    }), h == null ? void 0 : h.component;
  };
}
function Ht(i, c) {
  if (i === c)
    return !0;
  if (typeof i != "object" || i === null || typeof c != "object" || c === null)
    return !1;
  const g = Object.keys(i), f = Object.keys(c);
  if (g.length !== f.length)
    return !1;
  for (const l of g)
    if (i[l] !== c[l])
      return !1;
  return !0;
}
const $t = 739, Ft = 740;
function Ut({ value: i }, c) {
  var g, f;
  Array.isArray(c) || (c = [c]);
  for (let l of c) {
    if (!l)
      continue;
    const h = (g = l == null ? void 0 : l.value) == null ? void 0 : g.$t;
    if (h === $t && ((f = l.props) == null ? void 0 : f.when) === i || h === Ft)
      return Ot(l);
  }
  return null;
}
function Ot(i) {
  var g, f;
  const c = i.props || {};
  if (c.component) {
    const l = c.component;
    return /* @__PURE__ */ nt(l, { ...c.componentProps });
  }
  return typeof c.render == "function" ? c.render(c.renderProps || {}) : ((f = (g = i.value) == null ? void 0 : g.children) == null ? void 0 : f[0]) || null;
}
function wt(i, c) {
  return { $t, children: c };
}
function Nt(i, c) {
  return { $t: Ft, children: c };
}
Ut.Case = wt;
Ut.Default = Nt;
const le = ({
  items: i,
  renderItem: c,
  itemHeight: g,
  windowHeight: f,
  overscan: l = 20
}) => {
  const [h, A] = I(0), _ = (y) => {
    A(y.currentTarget.scrollTop);
  }, O = Math.max(0, Math.floor(h / g) - l), T = Math.min(
    i.length,
    Math.ceil((h + f) / g) + l
  ), x = () => {
    const y = [];
    for (let P = O; P < T; P++)
      y.push(
        /* @__PURE__ */ nt(
          "div",
          {
            key: P,
            style: {
              position: "absolute",
              transform: `translateY(${P * g}px)`,
              width: "100%",
              height: `${g}px`
            }
          },
          c(i[P], P)
        )
      );
    return y;
  };
  return /* @__PURE__ */ nt(
    "div",
    {
      style: {
        height: `${f}px`,
        overflowY: "auto",
        position: "relative"
      },
      onScroll: _
    },
    /* @__PURE__ */ nt(
      "div",
      {
        style: {
          height: `${i.length * g}px`,
          position: "relative"
        }
      },
      x()
    )
  );
}, yt = {};
function ce({ promiseFn: i, loading: c, error: g, onLoad: f, key: l }) {
  const [h, A] = I(yt[l]), [_, O] = I(null);
  if (!i)
    throw Error("promiseFn is mandatory");
  return Vt(() => {
    i && i().then((T) => T.json()).then((T) => {
      A(T), l && (yt[l] = T);
    }).catch((T) => {
      console.error(T), O(T), yt[l] = null;
    });
  }, []), _ ? /* @__PURE__ */ React.createElement("div", null, g) : h ? f(h) : /* @__PURE__ */ React.createElement("div", null, c);
}
const et = typeof window > "u", rt = () => {
};
function dt() {
  let i = [], c, g = !1, f = !0;
  return (l, h) => {
    if (f && (h == null ? void 0 : h.length) > 0) {
      f = !1;
      return;
    }
    return h.some(
      (_, O) => _ !== (i == null ? void 0 : i[O])
    ) ? (l(), i = h) : (i == null ? void 0 : i.length) === (h == null ? void 0 : h.length) && h.length === 0 && (g || (c = l(), g = !0)), c;
  };
}
const B = /* @__PURE__ */ new Set();
let R = null;
const Mt = (i) => {
  R = i;
};
let tt = rt, bt = et ? rt : () => {
};
const W = /* @__PURE__ */ (() => {
  const i = {};
  let c = null, g = 0, f = null, l = 0;
  const h = /* @__PURE__ */ new Map(), A = /* @__PURE__ */ new Map(), _ = {};
  let O = 0;
  const T = {};
  let x = 0, y = !1, P = !1;
  const M = (C) => {
    console.warn("untested code"), y = !0, C(), y = !1, bt();
  }, st = et ? rt : (C, p = 100) => {
    bt = C, tt = bt;
  }, H = (C) => {
    P = !0, C(), P = !1;
  }, q = et ? rt : () => {
    for (const [C, p] of h) {
      const k = p();
      h.set(C, () => {
      }), k && A.set(C, k);
    }
  }, j = (C) => {
    if (c = f = null, g = l = 0, O = 0, Object.entries(_).forEach(([p, k]) => {
      k(), delete _[p];
    }), x = 0, et)
      h.clear(), A.clear(), Object.keys(i).forEach((p) => {
        delete i[p];
      });
    else {
      if (!C)
        return;
      C.forEach((p) => {
        var k;
        for (const [v, L] of h)
          v === p && (h.delete(v), (k = A.get(v)) == null || k(), A.delete(v));
        Object.keys(i).forEach((v) => {
          v.startsWith(p) && delete i[v];
        }), Object.keys(T).forEach((v) => {
          var L, b;
          v.startsWith(p) && ((b = (L = T[v]) == null ? void 0 : L.__clean) == null || b.call(L), delete T[v]);
        });
      });
    }
  };
  return {
    state: (C) => {
      c != R && (g = 0);
      const p = `${R}-${g}`;
      i[p] == null && (i[p] = C);
      const k = (L) => {
        var U;
        let b;
        typeof L == "function" ? b = L(i[p]) : b = L, b !== i[p] && (i[p] = b, c = (U = p.split("-")) == null ? void 0 : U[0], P || (c && B.add(c), y || tt()), c = null);
      }, v = (L) => {
        var b;
        i[p] !== L && (c = (b = p.split("-")) == null ? void 0 : b[0], j(), i[p] = L, tt(), c = null);
      };
      return c != R && (c = R), g++, [i[p], k, v];
    },
    context: (C) => {
      if (R)
        throw new Error("Context cannot be created inside a component");
      let p = C, k = !1;
      return { get: () => (k && R && B.add(R), p), set: (b) => {
        let U;
        typeof b == "function" ? U = b(p) : U = b, U !== p && (p = U, P || (k = !0, _[O++] = () => {
          k = !1;
        }, y || tt()));
      } };
    },
    ref: (C) => {
      c != R && (x = 0);
      const p = `${R}-${x}`;
      T[p] == null && (T[p] = C);
      const k = (v) => {
        var b;
        let L;
        typeof v == "function" ? L = v(T[p]) : L = v, L !== T[p] && (T[p] = L, c = (b = p.split("-")) == null ? void 0 : b[0], P || (c && B.add(c), y || tt()), c = null);
      };
      return c != R && (c = R), x++, [T[p], k];
    },
    init: q,
    reset: j,
    skipUpdate: H,
    batch: M,
    registerCallback: st,
    effect: et ? rt : (C, p) => {
      if (f != R && (l = 0), (p == null ? void 0 : p.length) === 0) {
        h.has(`${R}`) || h.set(`${R}`, C), l = 0;
        return;
      }
      const k = `${R}-fn-${l}`;
      if (!i[k]) {
        const L = dt();
        i[k] = L;
      }
      const v = i[k](C, p);
      (p == null ? void 0 : p.length) === 0 && (i[k] = () => {
      }, v && A.set(k, v)), f != R && (f = R), l++;
    }
  };
})(), I = W.state, fe = W.context, ue = W.ref, te = W.init, ee = W.reset, ae = W.skipUpdate, oe = W.batch, re = W.registerCallback, Vt = W.effect, K = typeof window < "u", Q = () => {
}, X = K ? Q : console.log, Dt = K ? Q : console.time, xt = K ? Q : console.timeEnd;
X("check https://github.com/pomber/incremental-rendering-demo");
let J = {}, G = {};
function qt(i, c) {
  if (i === c)
    return !1;
  if (!i || !c)
    return !0;
  const g = Object.keys(i);
  if (g.length !== Object.keys(c).length)
    return !0;
  for (let f = 0; f < g.length; f++) {
    const l = g[f];
    if (!(l in c) || i[l] !== c[l])
      return !0;
  }
  return !1;
}
const jt = /* @__PURE__ */ (() => {
  let i = [];
  function c(f, ...l) {
    return l;
  }
  function g(f, l, ...h) {
    var O, T, x;
    let A, _;
    if (Array.isArray(h) && (h = h.flat()), typeof f == "function") {
      A = (O = i[i.length - 1]) == null ? void 0 : O.n;
      const y = `${f.name}:${A}:${l == null ? void 0 : l.key}`;
      i.push({ n: f == null ? void 0 : f.name, comp: y }), Mt(y);
      const P = G[y];
      P ? B.has((T = i[i.length - 2]) == null ? void 0 : T.comp) && qt(P.props, l) && B.add(y) : B.add(y);
      let M = f(l, h);
      return J[y] = {
        name: y,
        // parent: stack[stack.length - 2]?.comp, // this might be useful
        mount: !0,
        unMount: null,
        props: l
      }, i.pop(), Mt(null), M != null && M.type ? {
        ...M,
        // props: rv.props,
        $c: y,
        // children: rv.children,
        children: [M],
        // dont think its reqd
        // fragChildLen: rv?.children.length || undefined,
        // $p: curParent,
        key: l == null ? void 0 : l.key,
        props: l || {},
        type: "df"
      } : Array.isArray(M) ? (console.warn(
        "Your component named `",
        f.name,
        "` is returning Array, manipulation to this Array is currently NOT supported and can lead to Unexpected behavior"
      ), {
        $c: y,
        type: "df",
        //assign doc fragment type
        children: M
        // $p: curParent,
      }) : M != null && M.$c ? {
        $c: y,
        // value: rv,
        // ...rv,
        children: [M]
        // type: "df", // sure that type is unavailable hence using df
        // $p: curParent,
      } : {
        $c: y,
        // type: "df",
        value: M,
        props: l || {}
        // $p: curParent,
      };
    }
    if (B.has((x = i[i.length - 1]) == null ? void 0 : x.comp) ? _ = !0 : _ = void 0, f === "df") {
      let y = h.length;
      return {
        type: f,
        updtFlag: _,
        props: l || {},
        fragChildLen: y,
        children: h
      };
    } else
      return {
        // _c,
        type: f,
        updtFlag: _,
        props: l || {},
        // children: props?.ignoreNode ? [] : children,
        children: f != null && f.includes("-") || l != null && l.ignoreNode || (f == null ? void 0 : f.toLowerCase()) === "iframe" || (f == null ? void 0 : f.toLowerCase()) === "script" || (f == null ? void 0 : f.toLowerCase()) === "template" ? [] : h
      };
  }
  return {
    h: g,
    df: c
  };
})(), nt = jt.h, he = jt.df;
let it = {};
typeof window < "u" && (it = {
  ...(() => {
    let c = [];
    function g() {
      var e, s;
      const t = [];
      for (const u in G)
        J[u] || ((s = (e = G[u]).unMount) == null || s.call(e), G[u].unMount = null, delete G[u], t.push(u));
      ee(t);
    }
    function f() {
      for (; c != null && c.length; )
        c.pop()();
      te();
    }
    let l = null, h = null, A = null;
    function _(t, e, s) {
      s ? (t.setAttribute(e, s), t[e] = !0) : (O(t, e), t[e] = !1);
    }
    function O(t, e) {
      t.removeAttribute(e), t[e] = !1;
    }
    function T(t) {
      return /^on[A-Z]/.test(t);
    }
    function x(t) {
      return t.slice(2).toLowerCase();
    }
    function y(t) {
      return T(t) || t === "fragChildLen";
    }
    function P(t, e, s) {
      if (y(e)) {
        e === "onSubmit" && (t.__onSubmit = s);
        return;
      } else if (e === "className")
        t.setAttribute("class", s);
      else if (e === "style")
        for (const u in s)
          t.style[u] = s[u];
      else if (e === "ref")
        s == null || s(t);
      else if (e === "ignoreLater")
        t.setAttribute("ignorenode", !0), t.removeAttribute(e.toLowerCase());
      else if (typeof s == "boolean")
        _(t, e, s);
      else {
        if (e === "value" || e === "htmlFor") {
          t[e] = s;
          const u = setTimeout(() => {
            clearTimeout(u), t[e] = s;
          }, 0);
          return;
        }
        t.setAttribute(e, s);
      }
    }
    function M(t, e, s) {
      y(e) || (e === "className" ? t.removeAttribute("class") : typeof s == "boolean" ? O(t, e) : t.removeAttribute(e));
    }
    function st(t, e) {
      for (const s in e)
        P(t, s, e[s]);
    }
    function H(t, e, s, u) {
      if (!s && s == null)
        M(t, e, u);
      else if (y(e)) {
        const m = x(e);
        t._events && t._events[`${m}`] || j(t, { [e]: s });
      } else
        (!u || s !== u) && P(t, e, s);
    }
    function q(t, e, s = {}) {
      const u = Object.assign({}, e, s);
      for (const m in u)
        m === "onSubmit" ? (t[`__${m}`] = e[m], t.getAttribute("onsubmit") !== null && t.removeAttribute("onsubmit")) : H(t, m, e[m], s[m]);
    }
    function j(t, e) {
      for (const s in e)
        if (T(s) && s !== "onSubmit") {
          const u = x(s);
          t._events || (t._events = {}), t._events[`${u}`] && t.removeEventListener(
            u,
            t._events[`${u}`],
            !0
          ), t._events[`${u}`] = e[s], t.addEventListener(u, e[s], !0);
        }
    }
    const V = document, ot = "http://www.w3.org/2000/svg", Tt = (t, e, ...s) => {
      function u(a, $) {
        for (const F in $)
          a.setAttributeNS(null, F, $[F]);
      }
      const m = V.createElementNS(ot, "svg");
      u(m, e);
      for (const a of s) {
        const $ = V.createElementNS(ot, a.type);
        u($, a.props), m.appendChild($);
      }
      return m;
    }, ht = (t, e) => {
      let s = 0;
      const u = t.length;
      function m(a) {
        const $ = document.createDocumentFragment();
        for (; s < u && a.timeRemaining() > 1; )
          $.appendChild(C(t[s])), s++;
        $.childNodes.length > 0 && e.appendChild($), s < u && requestIdleCallback(m);
      }
      requestIdleCallback(m);
    };
    function C(t) {
      var s, u;
      if (!(t != null && t.type))
        return t != null && t.$c ? t.children ? C(t.children[0]) : (
          // node?.value == null || node?.value == undefined
          (t == null ? void 0 : t.value) == null || typeof (t == null ? void 0 : t.value) == "boolean" ? V.createComment(t.value) : V.createTextNode(t == null ? void 0 : t.value)
        ) : t == null || typeof t == "boolean" ? V.createComment(t) : V.createTextNode(t);
      if ((t == null ? void 0 : t.type) === "df") {
        const m = V.createDocumentFragment();
        if (t.children.length > 100)
          ht(t.children, m);
        else
          for (let a = 0, $ = t.children.length; a < $; ++a)
            m.appendChild(C(t.children[a]));
        return m;
      }
      if (t.type === "svg")
        return Tt(t.type, t.props, ...t.children);
      const e = V.createElement(t.type);
      if (t != null && t.$c || (st(e, t.props), j(e, t.props), (s = t.props) != null && s.onSubmit && (e.__onSubmit = (u = t.props) == null ? void 0 : u.onSubmit)), t.children.length > 100)
        ht(t.children, e);
      else
        for (let m = 0, a = t.children.length; m < a; ++m)
          e.appendChild(C(t.children[m]));
      return e;
    }
    function p(t, e) {
      var s, u;
      return (t == null ? void 0 : t.type) === (e == null ? void 0 : e.type) && (t == null ? void 0 : t.type) === "df" ? (t == null ? void 0 : t.$c) !== (e == null ? void 0 : e.$c) : (
        // node1 != node2 ||
        typeof t != typeof e || // (typeof node1 === "string" && node1 !== node2) ||
        !(t != null && t.type) && t !== e || (t == null ? void 0 : t.type) !== (e == null ? void 0 : e.type) || (t == null ? void 0 : t.value) !== (e == null ? void 0 : e.value) || ((s = t == null ? void 0 : t.props) == null ? void 0 : s.name) !== ((u = e == null ? void 0 : e.props) == null ? void 0 : u.name)
      );
    }
    function k(t) {
      const e = t.type;
      X(e), t.target.__onSubmit(t);
    }
    let v = !1;
    function L(t, e) {
      l = t, l.addEventListener("submit", k), h = e, A = h(), l.firstChild ? l.replaceChild(C(A), l.firstChild) : l.appendChild(C(A)), f(), G = { ...J }, J = {}, v = !0;
    }
    let b = [], U = [];
    function Bt(t, e = document.body) {
      const s = document.createTreeWalker(
        e,
        NodeFilter.SHOW_COMMENT,
        null,
        !1
      ), u = [];
      for (; s.nextNode(); )
        s.currentNode.nodeValue.includes(t) && u.push(s.currentNode);
      return u.forEach((m) => m.remove()), u.length;
    }
    function Wt(t, e) {
      v = !1, l = t, l.addEventListener("submit", k), h = e, A = h();
      const s = Bt("|", l);
      X(`Removed ${s} comments`), g(), vt(), v = !0;
    }
    function vt() {
      K || Dt("TETVD");
      let t = h();
      K || xt("TETVD"), X(A, t), b = [], U = [], K || Dt("TET"), Yt(l, t, A), g(), U && zt(U), b && Xt(b), b = U = null, f(), A = t, G = { ...J }, J = {}, K || xt("TET");
    }
    function pt(t) {
      return t !== void 0;
    }
    const lt = {
      routeChange: !1,
      set: (t) => {
        lt.routeChange = t;
      }
    };
    ["popstate", "navigate"].forEach(
      (t) => window.addEventListener(t, () => lt.set(!0))
    );
    function Yt(t, e, s, u = 0) {
      let m = 0;
      lt.routeChange && lt.set(!1);
      const a = B.size, $ = a === 0 || !v, F = [];
      function D(r, o) {
        var n;
        return ((n = r == null ? void 0 : r.childNodes) == null ? void 0 : n[o]) ?? null;
      }
      function Z(r, o, n) {
        return !r || n < 1 ? [] : Array.from(r.childNodes).slice(
          o,
          o + n
        );
      }
      function z(r) {
        return (r == null ? void 0 : r.type) === "df";
      }
      function w(r) {
        return !(r != null && r.type) && (r == null ? void 0 : r.$c) && r.children;
      }
      function mt(r) {
        return Array.isArray(r == null ? void 0 : r.children) ? r.children : [];
      }
      function ft(r) {
        if (!pt(r))
          return 0;
        if (z(r) || w(r)) {
          const n = mt(r).reduce(
            (E, S) => E + ft(S),
            0
          );
          return r.fragChildLen || n;
        }
        return 1;
      }
      function ut(r, o, n) {
        n ? b.push({
          p: r,
          op: "INSERT_BEFORE",
          c: [o, n]
        }) : b.push({ p: r, op: "APPEND", c: o });
      }
      function At(r, o, n) {
        const E = Z(
          r,
          o,
          ft(n)
        );
        for (let S = E.length - 1; S >= 0; --S)
          b.push({
            p: r,
            op: "REMOVE",
            c: E[S]
          });
        gt(n);
      }
      function kt(r, o, n, E) {
        const S = Z(
          r,
          o,
          ft(E)
        );
        if (gt(E), S.length === 1) {
          b.push({
            p: r,
            op: "REPLACE",
            c: [n, S[0]]
          });
          return;
        }
        if (S.length > 1) {
          b.push({
            p: r,
            op: "REPLACE_RANGE",
            c: [n, S]
          });
          return;
        }
        ut(r, n, D(r, o));
      }
      function gt(r) {
        r && typeof r == "object" && F.push(r);
      }
      function Lt(r) {
        if (!r || typeof r != "object")
          return;
        const o = r.children;
        if (Array.isArray(o))
          for (let n = 0; n < o.length; n++)
            Lt(o[n]);
        r.children = null, r.props = null, "value" in r && (r.value = null), r.updtFlag = null;
      }
      function Kt(r) {
        return (r == null ? void 0 : r.nodeType) === Node.TEXT_NODE || (r == null ? void 0 : r.nodeType) === Node.COMMENT_NODE;
      }
      function Qt(r) {
        return r != null && r.$c ? r.value : r;
      }
      function St(r) {
        const o = Qt(r);
        return o == null || typeof o == "boolean" ? Node.COMMENT_NODE : Node.TEXT_NODE;
      }
      function Zt(r, o, n, E = 0) {
        let S = E;
        const N = Math.max(o.length, n.length);
        for (let Y = 0; Y < N; Y++) {
          const d = ft(n[Y]);
          Ct(r, o[Y], n[Y], S), S += d;
        }
      }
      function Ct(r, o, n, E = 0) {
        if (!(o != null && o.updtFlag) && a) {
          if (o != null && o.type && (n != null && n.type))
            return _t(
              r,
              D(r, E),
              o,
              n,
              E
            );
          if (o === n)
            return;
        }
        if (m++, !pt(n)) {
          ut(r, o, D(r, E));
          return;
        }
        if (!pt(o)) {
          At(r, E, n);
          return;
        }
        if (w(o) || w(n)) {
          Ct(
            r,
            w(o) ? o.children[0] : o,
            w(n) ? n.children[0] : n,
            E
          );
          return;
        }
        if (p(o, n)) {
          const S = D(r, E);
          !(o != null && o.type) && !(n != null && n.type) && Kt(S) && St(o) === St(n) ? b.push({
            p: S,
            op: "TEXT",
            c: C(o).nodeValue
          }) : kt(r, E, o, n);
          return;
        }
        o != null && o.type && _t(
          r,
          D(r, E),
          o,
          n,
          E
        );
      }
      function _t(r, o, n, E, S) {
        var Rt;
        if ((n == null ? void 0 : n.type) !== "df" && !o) {
          ut(r, n, D(r, S));
          return;
        }
        if ((n == null ? void 0 : n.type) !== "df" && (n != null && n.updtFlag || $) && E.type === n.type && qt(E.props, n.props) && U.push({
          $target: o,
          newProps: n.props,
          oldProps: E.props
        }), (Rt = n == null ? void 0 : n.props) != null && Rt.ignoreNode)
          return;
        if ((E == null ? void 0 : E.type) === "df" && (n == null ? void 0 : n.type) !== "df") {
          X("special handling"), kt(r, S, n, E);
          return;
        }
        const N = mt(n), Y = mt(E), d = N.length, Pt = Y.length;
        if (d + Pt !== 0)
          if (d === 0)
            (n == null ? void 0 : n.type) === "df" ? At(r, S, E) : (b.push({
              p: o,
              op: "REMOVEALL"
            }), gt(E));
          else if (Pt === 0) {
            const Jt = (n == null ? void 0 : n.type) === "df" ? r : o, It = (n == null ? void 0 : n.type) === "df" ? D(r, S) : null;
            for (let Et = 0; Et < d; Et++)
              ut(Jt, N[Et], It);
          } else
            Zt(
              (n == null ? void 0 : n.type) === "df" ? r : o,
              N,
              Y,
              (n == null ? void 0 : n.type) === "df" ? S : 0
            );
      }
      Ct(t, e, s, u);
      for (let r = 0; r < F.length; r++)
        Lt(F[r]);
      F.length = 0, B.clear(), X(m), m = 0;
    }
    function zt(t) {
      for (let e = 0; e < t.length; e++) {
        const s = t[e];
        q(s.$target, s.newProps, s.oldProps), s.$target = null, s.newProps = null, s.oldProps = null;
      }
      t.length = 0;
    }
    function Xt(t) {
      var s, u;
      const e = [];
      for (let m = 0; m < t.length; m++) {
        const a = t[m];
        switch (a.op) {
          case "APPENDDF":
            a.p.appendChild(a.c);
            break;
          case "APPEND":
            a.p.appendChild(C(a.c));
            break;
          case "INSERT_BEFORE":
            a.p.insertBefore(C(a.c[0]), a.c[1]);
            break;
          case "APPEND_CHILDREN": {
            const F = V.createDocumentFragment();
            for (let D = 0, Z = a.c.length; D < Z; ++D)
              F.appendChild(C(a.c[D]));
            a.p.appendChild(F);
            break;
          }
          case "REMOVE":
            if (!a.c || a.c.parentNode !== a.p)
              break;
            a.p.removeChild(a.c), e.push(ct(a.c));
            break;
          case "REMOVEALL":
            const $ = Array.from(a.p.childNodes);
            if (a.p.replaceChildren)
              a.p.replaceChildren();
            else
              for (; a.p.firstChild; )
                a.p.removeChild(a.p.firstChild);
            e.push(
              Promise.all($.map((F) => ct(F)))
            );
            break;
          case "REPLACE":
            if (((s = a.c[1]) == null ? void 0 : s.parentNode) !== a.p)
              break;
            a.p.replaceChild(C(a.c[0]), a.c[1]), e.push(ct(a.c[1]));
            break;
          case "REPLACE_RANGE": {
            const [F, D] = a.c, Z = D[0];
            a.p.insertBefore(C(F), Z);
            for (let z = D.length - 1; z >= 0; --z)
              ((u = D[z]) == null ? void 0 : u.parentNode) === a.p && (a.p.removeChild(D[z]), e.push(ct(D[z])));
            break;
          }
          case "TEXT":
            a.p.nodeValue = a.c;
            break;
          case "CONTENT":
            a.p.textContent = a.c;
            break;
        }
        a.p = a.c = null;
      }
      t.length = 0, e.length > 0 && Promise.all(e).catch((m) => X("Error during node disposal:", m)).finally(() => {
        e.length = 0;
      });
    }
    const ct = async (t) => {
      var s;
      const e = [t];
      for (; e.length > 0; ) {
        let u = e.pop();
        if (u) {
          if (u && u._events) {
            for (const m in u._events)
              u.removeEventListener(m, u._events[m], !0);
            u._events = null, u.__onSubmit = null;
          }
          if (u.childNodes)
            for (let m = u.childNodes.length - 1; m >= 0; m--)
              e.push(u.childNodes[m]), m % 50 === 0 && await Gt();
          (s = u == null ? void 0 : u.remove) == null || s.call(u), u = null;
        }
      }
      t = null, e.length = 0;
    };
    function Gt() {
      var t;
      return (t = globalThis.scheduler) != null && t.yield ? scheduler.yield() : new Promise((e) => {
        setTimeout(e, 0);
      });
    }
    return {
      mount: L,
      forceUpdate: vt,
      hydrate: Wt,
      createElement: C
    };
  })()
});
const pe = it.mount || Q, ne = it.forceUpdate || Q, me = it.hydrate || Q, ge = it.createElement || Q;
if (typeof window < "u") {
  class i {
    constructor() {
      this.dirty = !1, this.channel = new MessageChannel(), this.channel.port1.onmessage = () => this.flush();
    }
    schedule() {
      this.dirty || (this.dirty = !0, this.channel.port2.postMessage(null));
    }
    flush() {
      this.dirty = !1, ne();
    }
  }
  const c = new i();
  re(() => {
    c.schedule();
  }, 0);
}
export {
  wt as Case,
  Nt as Default,
  ie as Lazy,
  ce as Loader,
  Ut as Switch,
  le as VirtualList,
  oe as batch,
  fe as createContext,
  Vt as createEffect,
  ge as createElement,
  ue as createRef,
  I as createState,
  he as df,
  ne as forceUpdate,
  nt as h,
  me as hydrate,
  se as memo,
  pe as mount,
  ee as reset,
  Mt as setCurrComp,
  ae as skipUpdate
};
