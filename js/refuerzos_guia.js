"use strict";
/* ===== Refuerzos: guía «Cómo usar la web» (01-11-2026, sesión 105; orden del profesor vía la 48: «luego 3») =====
   Contenido y pintado de la sección #guia de la web «Refuerzos» (Matemáticas I y Biología, 1.º Bach). Modelo: la guía
   de Bachillerato (guia.js + guiaview.js), con sus mismos tipos de bloque y su hoja (css/guia.css), pero con los textos
   en las dos lenguas (es, en): se elige el del atributo lang de la página, así que no pasa por la memoria de traducción.
   Las capturas (modo noche, como las de Bachillerato) están en refuerzos/guia/<lengua>/ del repo y build_refuerzos.js
   las copia a guia/<lengua>/ de la web. Si cambia el menú o una vista, hay que rehacerlas.
   Solo lo carga build_refuerzos.js; la maestra y las webs de Filosofía, HF y ESO no lo llevan. */
(function(){
  var sec = document.getElementById("guia"), btn = document.getElementById("helpbtn");
  if (!sec) return;
  var EN = /^en/.test(document.documentElement.lang || ""), L = EN ? "en" : "es";
  function t(o){ return typeof o === "string" ? o : o[L]; }
  var U = {
    titulo: { es: "How to use the website", en: "How to use the website" },
    eyebrow: { es: "Guía para el alumnado", en: "A guide for students" },
    lead: { es: "Qué hay en Refuerzos y cómo sacarle partido para estudiar y practicar Matemáticas I y Biología. Las capturas son de la web en ordenador y en modo noche, salvo la del móvil.",
            en: "What there is in Refuerzos and how to make the most of it to study and practise Mathematics I and Biology. The screenshots show the website on a computer in dark mode, except the one of the phone." },
    indice: { es: "In this guide", en: "In this guide" },
    abrir: { es: "Open", en: "Open" },
    pie: { es: "¿Cómo se usa esta web? Guía con capturas", en: "How do I use this website? Guide with screenshots" }
  };
  var B = [
    { type: "h", x: { es: "Antes de empezar", en: "Before you start" } },
    { type: "p", x: { es: "Refuerzos reúne el temario de <strong>Mathematics I</strong> y de <strong>Biología, Geología y Ciencias Ambientales</strong> de 1.º de Bachillerato, tal como lo marca el currículo vasco: teoría, ejercicios resueltos, prácticas, gráficas, tarjetas y cuestionarios. Sirve para repasar lo que se ve en clase y para preparar los exámenes.",
                      en: "Refuerzos brings together the syllabus of <strong>Mathematics I</strong> and <strong>Biology, Geology and Environmental Sciences</strong> for Year 1 of Bachillerato, as set out in the Basque curriculum: theory, worked examples, practice questions, graphs, cards and quizzes. Use it to revise what you do in class and to prepare for your exams." } },
    { type: "p", x: { es: "<strong>No hace falta registrarse</strong> ni instalar nada, y está en castellano y en inglés (botón 🌐). <strong>Tu avance se guarda en tu navegador</strong>: las tarjetas que ya dominas y tus mejores notas en los cuestionarios.",
                      en: "<strong>You do not need to sign up</strong> or install anything, and it is available in Spanish and English (the 🌐 button). <strong>Your progress is saved in your browser</strong>: the cards you have mastered and your best quiz scores." } },
    { type: "warn", x: { es: "Como el avance se guarda en el navegador, si cambias de dispositivo o borras los datos de navegación, empiezas de cero. El contenido, en cambio, sigue siempre ahí.",
                         en: "Because your progress is saved in the browser, if you change device or clear your browsing data, you start again from zero. The content, of course, is always there." } },

    { type: "h", x: { es: "La pantalla principal", en: "The main screen" } },
    { type: "p", x: { es: "Arriba, el menú tiene un botón para cada asignatura, <strong>Mathematics I</strong> and <strong>Biology</strong>, y dos desplegables: <strong>Study</strong> (la teoría y las tarjetas) y <strong>Practise</strong> (los cuestionarios y el Reto). Cada asignatura abre su página: una presentación con el temario completo y la <strong>lista de temas</strong>. Pulsa un tema para abrir su teoría.",
                      en: "At the top, the menu has a button for each subject, <strong>Mathematics I</strong> and <strong>Biology</strong>, and two drop-down menus: <strong>Study</strong> (the theory and the cards) and <strong>Practise</strong> (the quizzes and the Challenge). Each subject opens its own page: an introduction with the full syllabus and the <strong>list of topics</strong>. Click a topic to open its theory." } },
    { type: "img", src: "01_ficha.jpg", cap: { es: "La página de Matemáticas I: arriba, el menú; debajo, el temario y la lista de temas.", en: "The Mathematics I page: the menu at the top, and below it the syllabus and the list of topics." } },
    { type: "p", x: { es: "En la cabecera tienes también el <strong>buscador</strong> 🔎, el botón de <strong>idioma</strong> 🌐, el de <strong>tema claro u oscuro</strong> ◐ y el de los <strong>ajustes de lectura</strong> Aa, que puede leer la página en voz alta y agrandar la letra.",
                      en: "In the header you also have the <strong>search</strong> 🔎, the <strong>language</strong> button 🌐, the <strong>light or dark theme</strong> button ◐ and the <strong>reading settings</strong> Aa, which can read the page aloud and make the text bigger." } },

    { type: "h", x: { es: "Dentro de un tema", en: "Inside a topic" } },
    { type: "img", src: "02_tema.jpg", cap: { es: "Un tema abierto: a la izquierda, sus apartados; a la derecha, el texto con sus fórmulas.", en: "An open topic: its sections on the left and the text, with its formulae, on the right." } },
    { type: "p", x: { es: "En la columna de la izquierda están los <strong>apartados del tema</strong>: pulsa uno para saltar a esa parte. Arriba, el filtro <strong>Subject</strong> y el desplegable de temas te llevan a cualquier otro. Cada tema empieza con un consejo, <strong>Cómo estudiar este tema</strong>, y termina con una pregunta, <strong>Para repasar</strong>.",
                      en: "The <strong>sections of the topic</strong> are in the left-hand column: click one to jump to that part. At the top, the <strong>Subject</strong> filter and the topic menu take you to any other topic. Each topic starts with a tip, <strong>How to study this topic</strong>, and ends with a question, <strong>To revise</strong>." } },
    { type: "p", x: { es: "Las <strong>fórmulas</strong> se dibujan solas, como en un libro, en cuanto se abre el tema. Hace falta conexión a internet la primera vez.",
                      en: "The <strong>formulae</strong> are drawn automatically, as in a book, as soon as the topic opens. You need an internet connection the first time." } },

    { type: "h", x: { es: "Los ejercicios resueltos, paso a paso", en: "Worked examples, step by step" } },
    { type: "img", src: "03_pasos.jpg", cap: { es: "Un ejercicio con dos pasos a la vista. «Siguiente paso» descubre el siguiente; «Verlo todo», el resto de golpe.", en: "An exercise with two steps showing. ‘Next step’ reveals the next one; ‘Show it all’ reveals the rest at once." } },
    { type: "p", x: { es: "Cada tema tiene varios ejercicios resueltos. Al principio solo ves el enunciado: <strong>Show the first step</strong> enseña el primero, <strong>Next step</strong> el siguiente y, al final, <strong>Show the answer</strong>. Si tienes prisa, <strong>Show it all</strong> lo abre entero.",
                      en: "Each topic has several worked examples. At first you only see the question: <strong>Show the first step</strong> reveals the first one, <strong>Next step</strong> the next one and, at the end, <strong>Show the answer</strong>. If you are in a hurry, <strong>Show it all</strong> opens the whole solution." } },
    { type: "tip", x: { es: "Intenta cada ejercicio en tu cuaderno antes de abrir nada. Abre un paso solo cuando te atasques y compáralo con lo que has hecho: así ves exactamente dónde fallabas.",
                        en: "Try each exercise in your exercise book before opening anything. Open a step only when you get stuck and compare it with what you have done: that way you see exactly where you went wrong." } },

    { type: "h", x: { es: "Las prácticas con respuesta comprobada", en: "Practice questions that check your answer" } },
    { type: "img", src: "04_practica.jpg", cap: { es: "Una práctica resuelta: se escribe el número y «Comprobar» dice si está bien.", en: "A practice question answered: type the number and ‘Check’ tells you whether it is right." } },
    { type: "p", x: { es: "Las cajas <strong>Practica</strong> son ejercicios sin resolver. Escribe el resultado (solo el número) y pulsa <strong>Check</strong>. Puedes usar coma o punto decimal, y se admite un pequeño margen de redondeo. Si no aciertas, repasa los ejercicios resueltos del mismo apartado y vuelve a intentarlo.",
                      en: "The <strong>Practise</strong> boxes are exercises without a solution. Type the result (just the number) and press <strong>Check</strong>. Use a decimal point, and a small rounding margin is allowed. If you get it wrong, go over the worked examples in the same section and try again." } },

    { type: "h", x: { es: "Las gráficas que se mueven", en: "Graphs you can move" } },
    { type: "img", src: "05_grafica.jpg", cap: { es: "La recta tangente a una función: al mover el deslizador, la tangente recorre la curva y su pendiente se recalcula.", en: "The tangent line to a function: as you move the slider, the tangent runs along the curve and its gradient is recalculated." } },
    { type: "p", x: { es: "Algunos temas de Matemáticas (ecuaciones, trigonometría, rectas, funciones, límites y derivadas) tienen <strong>gráficas</strong> con <strong>deslizadores</strong>. Al moverlos cambia un número de la fórmula y ves al momento cómo cambia la curva. Debajo hay una nota que dice qué observar.",
                      en: "Some Mathematics topics (equations, trigonometry, lines, functions, limits and derivatives) have <strong>graphs</strong> with <strong>sliders</strong>. Moving them changes a number in the formula and you see at once how the curve changes. Underneath, a note tells you what to look for." } },

    { type: "h", x: { es: "Tarjetas, cuestionarios y Reto", en: "Cards, quizzes and the Challenge" } },
    { type: "img", src: "06_tarjetas.jpg", cap: { es: "Las tarjetas de un tema: el término por delante y la definición por detrás.", en: "A topic's cards: the term on the front and the definition on the back." } },
    { type: "list", rows: [
      { nombre: { es: "Cards", en: "Cards" }, view: "tarjetas", texto: { es: "Diez por tema, con los términos y las fórmulas clave. Pulsa la tarjeta para darle la vuelta y marca <strong>I know it</strong> las que domines.", en: "Ten per topic, with the key terms and formulae. Click the card to turn it over and mark the ones you have mastered with <strong>I know it</strong>." } },
      { nombre: { es: "Quizzes", en: "Quizzes" }, view: "cuestionarios", texto: { es: "Ocho preguntas por tema, con la corrección al instante y la explicación de cada respuesta. El filtro <strong>Topic</strong> elige el tema.", en: "Eight questions per topic, marked instantly, with an explanation of each answer. The <strong>Topic</strong> filter chooses the topic." } },
      { nombre: { es: "Challenge", en: "Challenge" }, view: "retos", texto: { es: "Las mismas preguntas, contrarreloj: cuanto más rápido aciertas, más puntos.", en: "The same questions, against the clock: the faster you answer correctly, the more points you get." } }
    ] },
    { type: "img", src: "07_cuestionarios.jpg", cap: { es: "Un cuestionario: elige una respuesta y verás al momento si es correcta y por qué.", en: "A quiz: choose an answer and you see at once whether it is correct and why." } },

    { type: "h", x: { es: "En el móvil", en: "On a phone" } },
    { type: "img", src: "08_movil.jpg", w: "movil", cap: { es: "En el móvil, el menú se abre con ☰.", en: "On a phone, the menu opens with ☰." } },
    { type: "p", x: { es: "En el móvil todo funciona igual. El menú se abre con el botón <strong>☰</strong>, y los apartados de cada tema están en el desplegable de arriba. Las gráficas y las prácticas también se pueden usar con el dedo.",
                      en: "Everything works the same on a phone. The menu opens with the <strong>☰</strong> button, and the sections of each topic are in the drop-down menu at the top. The graphs and the practice questions also work with your finger." } },

    { type: "h", x: { es: "Un plan para cada tema", en: "A plan for each topic" } },
    { type: "steps", rows: [
      { titulo: { es: "Read the theory", en: "Read the theory" }, view: "teoria", texto: { es: "Con el consejo del principio y mirando bien las fórmulas.", en: "Following the tip at the start and looking carefully at the formulae." } },
      { titulo: { es: "Haz los ejercicios resueltos", en: "Do the worked examples" }, texto: { es: "Primero tú, en el cuaderno; luego, abre los pasos.", en: "First on your own, in your exercise book; then open the steps." } },
      { titulo: { es: "Resuelve las prácticas", en: "Answer the practice questions" }, texto: { es: "Hasta que te salgan todas bien.", en: "Until you get them all right." } },
      { titulo: { es: "Repasa con las tarjetas", en: "Revise with the cards" }, view: "tarjetas", texto: { es: "Hasta marcarlas todas como sabidas.", en: "Until you have marked them all as known." } },
      { titulo: { es: "Test yourself", en: "Test yourself" }, view: "cuestionarios", texto: { es: "Con el cuestionario del tema y, para terminar, el Reto.", en: "With the topic's quiz and, to finish, the Challenge." } }
    ] }
  ];
  function esc(s){ return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function abre(v){ return v && document.getElementById(v) ? v : null; }
  function bloque(b, i){
    switch (b.type){
      case "h": return '<h2 class="guia-h" id="guia-' + i + '">' + t(b.x) + '</h2>';
      case "p": return '<p>' + t(b.x) + '</p>';
      case "tip": return '<div class="guia-tip">' + t(b.x) + '</div>';
      case "warn": return '<div class="guia-warn">' + t(b.x) + '</div>';
      case "img":
        var src = "guia/" + L + "/" + b.src;
        return '<figure class="guia-fig' + (b.w ? " guia-" + b.w : "") + '"><a href="' + src + '" target="_blank" rel="noopener">' +
          '<img src="' + src + '" alt="' + esc(t(b.cap)) + '" loading="lazy"></a><figcaption>' + esc(t(b.cap)) + '</figcaption></figure>';
      case "list":
        return '<div class="guia-list">' + b.rows.map(function(r){
          var v = abre(r.view);
          return '<div class="guia-row"><div class="guia-n">' + (v ? '<button type="button" class="guia-go" data-gv="' + v + '">' + t(r.nombre) + '</button>' : '<strong>' + t(r.nombre) + '</strong>') +
            '</div><div class="guia-d">' + t(r.texto) + '</div></div>';
        }).join("") + '</div>';
      case "steps":
        return '<ol class="guia-steps">' + b.rows.map(function(r){
          var v = abre(r.view);
          return '<li><strong>' + t(r.titulo) + '</strong><span>' + t(r.texto) + '</span>' +
            (v ? '<button type="button" class="guia-abrir" data-gv="' + v + '">' + t(U.abrir) + ' →</button>' : '') + '</li>';
        }).join("") + '</ol>';
    }
    return "";
  }
  var idx = B.map(function(b, i){ return b.type === "h" ? '<a href="#guia" data-gi="guia-' + i + '">' + t(b.x) + '</a>' : ""; }).join("");
  sec.innerHTML = '<p class="eyebrow">' + t(U.eyebrow) + '</p><h1 class="title">' + t(U.titulo) + '</h1><p class="lead">' + t(U.lead) + '</p>' +
    '<nav class="guia-idx" aria-label="' + esc(t(U.indice)) + '"><span class="flabel">' + t(U.indice) + '</span>' + idx + '</nav>' +
    '<div class="guia-body">' + B.map(bloque).join("") + '</div>';
  sec.addEventListener("click", function(e){
    var g = e.target.closest("[data-gv]");
    if (g){ (window.show || show)(g.getAttribute("data-gv")); return; }
    var a = e.target.closest("[data-gi]");
    if (a){ e.preventDefault(); var d = document.getElementById(a.getAttribute("data-gi")); if (d) d.scrollIntoView({ block: "start" }); }
  });
  if (btn){ btn.title = t(U.titulo); btn.setAttribute("aria-label", t(U.titulo)); btn.addEventListener("click", function(){ (window.show || show)("guia"); }); }
  /* enlace al pie de la ficha de cada asignatura, tras la lista de temas (nada encima: docs/35, 4.1) */
  function pie(){
    ["mat", "bio"].forEach(function(s){
      var f = document.getElementById(s); if (!f || f.querySelector(".guia-pie")) return;
      var p = document.createElement("p"); p.className = "guia-pie";
      p.innerHTML = '<a href="#guia">' + t(U.pie) + ' →</a>';
      p.firstChild.addEventListener("click", function(e){ e.preventDefault(); (window.show || show)("guia"); });
      f.appendChild(p);
    });
  }
  if (document.readyState === "complete") setTimeout(pie, 0); else window.addEventListener("load", function(){ setTimeout(pie, 0); });
})();
