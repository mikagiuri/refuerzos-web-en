"use strict";
/* ===== Fórmulas y ejercicios (01-11-2026, sesión 105; nació para la web «Refuerzos») =====
   1. Fórmulas: el LaTeX entre \( \) o \[ \] lo dibuja KaTeX. La librería (~300 KB de CDN) solo se carga la
      primera vez que aparece una fórmula en pantalla; un MutationObserver vigila lo que pintan las vistas
      (teoría, tarjetas, cuestionarios…), así que ninguna vista tiene que llamarla.
   2. Ejercicios paso a paso: <div class="ejercicio"> con <p class="ej-enunciado">, <ol class="ej-pasos"> and
      <p class="ej-solucion">. Los pasos se descubren de uno en uno con un botón; «Verlo todo» los abre todos.
   3. Práctica con respuesta comprobada: <div class="practica" data-valor="114.59" data-tol="0.05">. Se escribe un
      número (con coma o con punto) y se comprueba con ese margen.
   Sin JavaScript, todo se ve abierto (los pasos y la solución) y la práctica queda como enunciado. */
(function(){
  var KATEX = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/";
  var MATH = /\\\(|\\\[/;
  var estado = 0, cola = [];   // 0 = sin cargar, 1 = cargando, 2 = lista
  function dibujar(root){
    try {
      window.renderMathInElement(root, { delimiters: [{ left: "\\[", right: "\\]", display: true }, { left: "\\(", right: "\\)", display: false }],
        throwOnError: false, ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code", "input"] });
    } catch (e){}
  }
  function cargar(root){
    if (estado === 2) return dibujar(root);
    cola.push(root);
    if (estado === 1) return;
    estado = 1;
    var css = document.createElement("link"); css.rel = "stylesheet"; css.href = KATEX + "katex.min.css";
    document.head.appendChild(css);
    var s = document.createElement("script"); s.src = KATEX + "katex.min.js";
    s.onload = function(){
      var a = document.createElement("script"); a.src = KATEX + "contrib/auto-render.min.js";
      a.onload = function(){ estado = 2; cola.splice(0).forEach(dibujar); };
      document.head.appendChild(a);
    };
    document.head.appendChild(s);
  }
  function formulas(root){ if (root && MATH.test(root.textContent || "")) cargar(root); }

  var T = {   // rótulos de los botones (los traduce i18n_rebuild.js como el resto de textos entrecomillados)
    primero: "Show the first step", siguiente: "Next step", solucion: "Show the answer", todo: "Show it all",
    comprobar: "Check", bien: "Correct!", mal: "Not quite. Check the steps and try again.", vacio: "Type a number.",
    respuesta: "Your answer"
  };
  function pasos(ej){
    if (ej.dataset.listo) return; ej.dataset.listo = "1";
    var items = [].slice.call(ej.querySelectorAll(".ej-pasos > li")), sol = ej.querySelector(".ej-solucion");
    var ocultos = items.concat(sol ? [sol] : []);
    if (!ocultos.length) return;
    ocultos.forEach(function(x){ x.hidden = true; });
    var visto = 0;
    var barra = document.createElement("div"); barra.className = "ej-botones";
    var sig = document.createElement("button"); sig.type = "button"; sig.className = "btn ej-sig";
    var todo = document.createElement("button"); todo.type = "button"; todo.className = "btn ghost ej-todo"; todo.textContent = T.todo;
    function rotulo(){
      if (visto >= ocultos.length){ barra.remove(); return; }
      sig.textContent = visto === 0 && items.length ? T.primero : (sol && visto === ocultos.length - 1 ? T.solucion : T.siguiente);
    }
    sig.addEventListener("click", function(){ ocultos[visto].hidden = false; visto++; rotulo(); });
    todo.addEventListener("click", function(){ ocultos.forEach(function(x){ x.hidden = false; }); visto = ocultos.length; rotulo(); });
    barra.appendChild(sig); barra.appendChild(todo);
    ej.appendChild(barra);
    rotulo();
  }
  function practica(p){
    if (p.dataset.listo) return; p.dataset.listo = "1";
    var valor = parseFloat(p.dataset.valor), tol = parseFloat(p.dataset.tol || "0");
    if (isNaN(valor)) return;
    var f = document.createElement("form"); f.className = "pr-form";
    var inp = document.createElement("input"); inp.type = "text"; inp.inputMode = "decimal"; inp.autocomplete = "off"; inp.setAttribute("aria-label", T.respuesta);
    var b = document.createElement("button"); b.type = "submit"; b.className = "btn"; b.textContent = T.comprobar;
    var out = document.createElement("p"); out.className = "pr-out"; out.setAttribute("aria-live", "polite");
    f.appendChild(inp); f.appendChild(b);
    f.addEventListener("submit", function(e){
      e.preventDefault();
      var t = inp.value.trim().replace(/\s/g, "").replace("−", "-");
      if (/^en/.test(document.documentElement.lang || "")){   // en inglés, coma de miles y punto decimal: 17,190 · 114.59
        if (/^-?\d{1,3}(,\d{3})+(\.\d+)?$/.test(t)) t = t.replace(/,/g, "");
      } else {
        if (/^-?\d{1,3}(\.\d{3})+$/.test(t)) t = t.replace(/\./g, "");   // 17.190 (punto de miles) → 17190
        t = t.replace(",", ".");   // 114,59 → 114.59
      }
      var n = parseFloat(t);
      if (t === "" || isNaN(n)){ out.textContent = T.vacio; out.className = "pr-out"; return; }
      var ok = Math.abs(n - valor) <= tol + 1e-9;
      out.textContent = ok ? T.bien : T.mal;
      out.className = "pr-out " + (ok ? "pr-ok" : "pr-mal");
    });
    p.appendChild(f); p.appendChild(out);
  }
  /* ---- 4. Gráficas que se mueven (01-11, js/refuerzos_graficas.js): trazador propio en SVG, sin librerías ----
     Se colocan dentro de la teoría del tema abierto (theoryKey de theoryview.js), antes del <h2> número «antes». */
  var EN = /^en/.test(document.documentElement.lang || "");
  var FUNC = { sin: "Math.sin", cos: "Math.cos", tan: "Math.tan", sqrt: "Math.sqrt", exp: "Math.exp", ln: "Math.log", log: "Math.log10", abs: "Math.abs", pi: "Math.PI", e: "Math.E" };
  function compilar(expr, nombres){   // expresión en x y en los parámetros → función; nada fuera de la lista blanca
    var js = expr.replace(/\s+/g, "").replace(/\^/g, "**").replace(/[A-Za-z_][A-Za-z0-9_]*/g, function(id){
      if (id === "x" || nombres.indexOf(id) >= 0) return "v." + id;
      if (FUNC[id]) return FUNC[id];
      throw new Error("gráfica: nombre no permitido «" + id + "»");
    });
    if (/[^\w.+\-*/(),]/.test(js)) throw new Error("gráfica: carácter no permitido en «" + expr + "»");
    return new Function("v", "return (" + js + ");");
  }
  function num(v, dec){ var s = (Math.round(v * Math.pow(10, dec)) / Math.pow(10, dec)).toString(); return EN ? s : s.replace(".", ","); }
  function grafica(g, cont){
    var W = 600, H = 360, NS = "http://www.w3.org/2000/svg", nombres = Object.keys(g.params || {});
    var v = {}; nombres.forEach(function(n){ v[n] = g.params[n][3]; });
    // cada curva: "expresión" o { f, desde, hasta, c } (un trozo: solo entre desde y hasta; c = número de color)
    var curvas = g.curvas.map(function(c, n){
      var o = typeof c === "string" ? { f: c } : c, f = compilar(o.f, nombres), d = o.desde, h = o.hasta;
      var fn = (d == null && h == null) ? f : function(v){ return (d != null && v.x < d) || (h != null && v.x > h) ? NaN : f(v); };
      fn.color = o.c != null ? o.c : n; return fn;
    }), verticales = (g.verticales || []).map(function(c){ return compilar(c, nombres); });
    // puntos marcados: { x, y, abierto } (expresiones; abierto = círculo hueco, para extremos que no son de la función)
    var puntos = (g.puntos || []).map(function(p){ return { x: compilar(String(p.x), nombres), y: compilar(String(p.y), nombres), abierto: !!p.abierto }; });
    var lecturas = (g.lecturas || []).map(function(l){ return { etq: EN ? l.en : l.es, f: compilar(l.f, nombres) }; });
    var x0 = g.x[0], x1 = g.x[1], y0 = g.y[0], y1 = g.y[1];
    var X = function(x){ return (x - x0) / (x1 - x0) * W; }, Y = function(y){ return H - (y - y0) / (y1 - y0) * H; };
    var fig = document.createElement("figure"); fig.className = "grafica";
    var cap = document.createElement("figcaption"); cap.textContent = EN ? g.titulo.en : g.titulo.es; fig.appendChild(cap);
    var svg = document.createElementNS(NS, "svg"); svg.setAttribute("viewBox", "0 0 " + W + " " + H); svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", cap.textContent.replace(/\\[()]/g, ""));
    function el(tag, at){ var e = document.createElementNS(NS, tag); for (var k in at) e.setAttribute(k, at[k]); return e; }
    // cuadrícula y ejes (una línea por unidad; marcas cada 1, 2 o 5 según el ancho)
    var paso = (x1 - x0) > 16 ? 5 : (x1 - x0) > 8 ? 2 : 1, fondo = el("g", { "class": "gr-fondo" });
    for (var i = Math.ceil(x0); i <= x1; i++) fondo.appendChild(el("line", { x1: X(i), y1: 0, x2: X(i), y2: H, "class": i === 0 ? "gr-eje" : "gr-red" }));
    for (var j = Math.ceil(y0); j <= y1; j++) fondo.appendChild(el("line", { x1: 0, y1: Y(j), x2: W, y2: Y(j), "class": j === 0 ? "gr-eje" : "gr-red" }));
    for (i = Math.ceil(x0 / paso) * paso; i <= x1; i += paso) if (i && i > x0 + 0.3 && i < x1 - 0.3) {   // sin los de los bordes, que se cortan
      var t = el("text", { x: X(i), y: Math.min(H - 4, Math.max(14, Y(0) + 16)), "class": "gr-num" }); t.textContent = num(i, 1); fondo.appendChild(t); }
    for (j = Math.ceil(y0 / paso) * paso; j <= y1; j += paso) if (j && j > y0 + 0.3 && j < y1 - 0.3) { var u = el("text", { x: Math.min(W - 18, Math.max(6, X(0) + 6)), y: Y(j) + 4, "class": "gr-num gr-num-y" }); u.textContent = num(j, 1); fondo.appendChild(u); }
    svg.appendChild(fondo);
    var capa = el("g", {}); svg.appendChild(capa);
    function dibujar(){
      while (capa.firstChild) capa.removeChild(capa.firstChild);
      verticales.forEach(function(f){ var a = f(v); if (isFinite(a)) capa.appendChild(el("line", { x1: X(a), y1: 0, x2: X(a), y2: H, "class": "gr-asintota" })); });
      curvas.forEach(function(f, n){
        var d = "", fuera = true, N = 600, prev = null;
        for (var k = 0; k <= N; k++){
          var x = x0 + (x1 - x0) * k / N, y; v.x = x;
          try { y = f(v); } catch (e){ y = NaN; }
          var salto = prev !== null && isFinite(y) && Math.abs(y - prev) > (y1 - y0) * 0.9;   // asíntota: no unir las dos ramas
          if (!isFinite(y) || y < y0 - (y1 - y0) || y > y1 + (y1 - y0) || salto){ fuera = true; prev = isFinite(y) ? y : null; if (!salto) continue; }
          d += (fuera ? "M" : "L") + X(x).toFixed(1) + " " + Y(y).toFixed(1) + " "; fuera = false; prev = y;
        }
        if (d) capa.appendChild(el("path", { d: d, "class": "gr-curva gr-c" + f.color }));
      });
      puntos.forEach(function(p){ var px = p.x(v), py = p.y(v);
        if (isFinite(px) && isFinite(py)) capa.appendChild(el("circle", { cx: X(px), cy: Y(py), r: 5, "class": "gr-punto" + (p.abierto ? " gr-abierto" : "") })); });
      lecturas.forEach(function(l){ var r = l.f(v); l.out.textContent = l.etq + ": " + (isFinite(r) ? num(r, 2) : "—"); });
    }
    var marco = document.createElement("div"); marco.className = "gr-marco"; marco.appendChild(svg); fig.appendChild(marco);
    var mandos = document.createElement("div"); mandos.className = "gr-mandos";
    nombres.forEach(function(n){
      var p = g.params[n], lab = document.createElement("label"), r = document.createElement("input"), val = document.createElement("output");
      r.type = "range"; r.min = p[0]; r.max = p[1]; r.step = p[2]; r.value = p[3];
      var nom = n.replace(/^x0$/, "x₀");
      val.textContent = nom + " = " + num(p[3], 2);
      r.addEventListener("input", function(){ v[n] = parseFloat(r.value); val.textContent = nom + " = " + num(v[n], 2); dibujar(); });
      lab.appendChild(val); lab.appendChild(r); mandos.appendChild(lab);
    });
    lecturas.forEach(function(l){ l.out = document.createElement("p"); l.out.className = "gr-lectura"; l.out.setAttribute("aria-live", "polite"); mandos.appendChild(l.out); });
    fig.appendChild(mandos);
    if (g.nota){ var nota = document.createElement("p"); nota.className = "gr-nota"; nota.textContent = EN ? g.nota.en : g.nota.es; fig.appendChild(nota); }
    dibujar();
    return fig;
  }
  function graficas(root){
    if (typeof GRAFICAS_REFUERZOS === "undefined" || typeof theoryKey === "undefined") return;
    var body = root.querySelector ? root.querySelector("#theorybody") : null;
    var lista = body && GRAFICAS_REFUERZOS[theoryKey];
    if (!lista || body.querySelector(".grafica")) return;   // ya puestas (la teoría se repinta entera al cambiar de tema)
    lista.forEach(function(g){
      try {
        var fig = grafica(g), h2 = body.querySelectorAll("h2"), ref = g.antes != null ? h2[g.antes] : body.querySelector(".aporia");
        if (ref) ref.parentNode.insertBefore(fig, ref); else body.appendChild(fig);
      } catch (e){ if (window.console) console.error(e); }
    });
  }
  function preparar(root){
    if (!root || !root.querySelectorAll) return;
    graficas(root);
    [].forEach.call(root.querySelectorAll(".ejercicio"), pasos);
    [].forEach.call(root.querySelectorAll(".practica"), practica);
    formulas(root);
  }
  var pend = new Set(), tic = 0;
  function vigilar(){
    var main = document.getElementById("contenido") || document.body;
    preparar(main);
    new MutationObserver(function(muts){
      muts.forEach(function(m){ m.addedNodes.forEach(function(n){ if (n.nodeType === 1 && !(n.classList && n.classList.contains("katex"))) pend.add(n); }); });
      if (tic) return;
      // se prepara la VISTA que contiene cada cambio, ya colocada en la página: la Teoría monta su texto en un
      // contenedor aparte y lo inserta después, así que el nodo anotado puede no estar ya (o aún) en el documento
      tic = setTimeout(function(){
        tic = 0;
        var vistas = new Set(), activa = main.querySelector(".view.active") || main;
        pend.forEach(function(n){ vistas.add(n.isConnected ? (n.closest(".view") || main) : activa); });
        pend.clear();
        vistas.forEach(preparar);
      }, 30);
    }).observe(main, { childList: true, subtree: true });
  }
  window.Ejercicios = { preparar: preparar };   // por si una vista quiere prepararse sin esperar al observador
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", vigilar); else vigilar();
})();
