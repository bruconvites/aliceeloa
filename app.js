(function () {
  "use strict";

  // ---------- Configuração ----------
  var LINKS = {
    location: "https://maps.app.goo.gl/5YjJJaMbu4Z6rreD7?g_st=ic",
    rsvp: "https://wa.link/s0k04b"
  };

  var BGM_BASE = 0.24;   // volume da música de fundo fora dos vídeos com voz
  var BGM_DUCK = 0.11;   // volume da música durante os vídeos com voz da menina
  var VIDEO_VOLUME = 1.0;

  var order = ["primeira", "segunda", "terceira", "quarta", "quinta", "sexta"];
  var current = 0;
  var userMuted = false;

  var frame = document.getElementById("frame");
  var bgm = document.getElementById("bgm");
  var muteBtn = document.getElementById("muteBtn");

  var scenes = {};
  order.forEach(function (name) {
    scenes[name] = document.getElementById("scene-" + name);
  });

  var videos = {
    segunda: document.getElementById("video-segunda"),
    terceira: document.getElementById("video-terceira"),
    quarta: document.getElementById("video-quarta")
  };

  Object.keys(videos).forEach(function (key) {
    videos[key].volume = VIDEO_VOLUME;
  });

  // ---------- Transição entre cenas (crossfade, sem tela preta) ----------
  function goTo(index) {
    if (index < 0 || index >= order.length) return;
    var prevName = order[current];
    var nextName = order[index];

    scenes[prevName].classList.remove("active");
    scenes[nextName].classList.add("active");
    current = index;

    duckMusicFor(nextName);

    if (videos[nextName]) {
      playVideo(videos[nextName]);
    }

    // pausa vídeos que já ficaram para trás para liberar recursos
    if (videos[prevName]) {
      // pequena espera para não cortar o áudio durante o crossfade
      setTimeout(function () {
        videos[prevName].pause();
      }, 1100);
    }
  }

  function goNext() {
    goTo(current + 1);
  }

  function playVideo(video) {
    video.currentTime = 0;
    var p = video.play();
    if (p && p.catch) {
      p.catch(function () {
        // autoplay bloqueado — mostra dica sutil para o usuário tocar
        showTapHint(video.closest(".scene"));
      });
    }
  }

  function showTapHint(sceneEl) {
    if (!sceneEl) return;
    var hint = sceneEl.querySelector(".tap-hint");
    if (!hint) {
      hint = document.createElement("div");
      hint.className = "tap-hint";
      hint.textContent = "Toque para continuar";
      sceneEl.appendChild(hint);
    }
    hint.classList.add("show");
    sceneEl.addEventListener("click", function onceHandler() {
      var v = sceneEl.querySelector("video");
      if (v) { v.play().catch(function(){}); }
      hint.classList.remove("show");
      sceneEl.removeEventListener("click", onceHandler);
    });
  }

  // cada vídeo, ao terminar, avança sozinho para o próximo
  Object.keys(videos).forEach(function (key) {
    videos[key].addEventListener("ended", function () {
      goNext();
    });
  });

  // ---------- Música de fundo contínua, em volume que não sobrepõe a voz ----------
  var fadeToken = 0;

  function fadeVolume(el, target, duration) {
    duration = duration || 600;
    var token = ++fadeToken; // cancela qualquer fade anterior ainda em andamento
    var start = el.volume;
    var startTime = null;
    function step(ts) {
      if (token !== fadeToken) return;
      if (startTime === null) startTime = ts;
      var t = Math.min(1, (ts - startTime) / duration);
      el.volume = start + (target - start) * t;
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function duckMusicFor(sceneName) {
    if (userMuted) return;
    var isVideoScene = !!videos[sceneName];
    fadeVolume(bgm, isVideoScene ? BGM_DUCK : BGM_BASE, 700);
  }

  var musicEverStarted = false;

  function ensureMusicPlaying() {
    if (userMuted) return;
    if (!bgm.paused) return;
    var p = bgm.play();
    if (p && p.catch) { p.catch(function () { /* tenta de novo no próximo toque */ }); }
    if (!musicEverStarted) {
      musicEverStarted = true;
      bgm.volume = 0;
      var isVideoScene = !!videos[order[current]];
      fadeVolume(bgm, isVideoScene ? BGM_DUCK : BGM_BASE, 900);
    }
  }

  muteBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    userMuted = !userMuted;
    if (userMuted) {
      bgm.muted = true;
      Object.keys(videos).forEach(function (k) { videos[k].muted = true; });
      muteBtn.innerHTML = "&#128263;";
      muteBtn.classList.add("muted");
    } else {
      bgm.muted = false;
      Object.keys(videos).forEach(function (k) { videos[k].muted = false; });
      muteBtn.innerHTML = "&#128266;";
      muteBtn.classList.remove("muted");
      ensureMusicPlaying();
      duckMusicFor(order[current]);
    }
  });

  // ---------- Efeito de florzinhas rosa ao toque ----------
  var FLOWERS = ["\uD83C\uDF38", "\u273F", "\u2740"]; // 🌸 ✿ ❀

  function spawnFlowers(x, y) {
    var count = 6 + Math.floor(Math.random() * 4); // 6–9 florzinhas
    for (var i = 0; i < count; i++) {
      var el = document.createElement("span");
      el.className = "flower";
      el.textContent = FLOWERS[Math.floor(Math.random() * FLOWERS.length)];

      var angle = Math.random() * Math.PI * 2;
      var dist = 40 + Math.random() * 70;
      var dx = Math.cos(angle) * dist;
      var dy = Math.sin(angle) * dist - 50; // tendência de subir

      el.style.left = x + "px";
      el.style.top = y + "px";
      el.style.setProperty("--dx", dx.toFixed(1) + "px");
      el.style.setProperty("--dy", dy.toFixed(1) + "px");
      el.style.setProperty("--sc", (0.7 + Math.random() * 0.8).toFixed(2));
      el.style.setProperty("--rot", (Math.random() * 160 - 80).toFixed(0) + "deg");
      el.style.fontSize = (10 + Math.random() * 12).toFixed(0) + "px";
      el.style.color = Math.random() > 0.5 ? "#e6a7b6" : "#f0c3cf";
      el.style.animationDuration = (900 + Math.random() * 700).toFixed(0) + "ms";

      document.body.appendChild(el);
      el.addEventListener("animationend", function () {
        this.remove();
      });
    }
  }

  // ---------- Interações ----------
  frame.addEventListener("click", function (e) {
    ensureMusicPlaying(); // primeiro gesto do usuário: já garante o som tocando
    spawnFlowers(e.clientX, e.clientY);

    var actionEl = e.target.closest("[data-action]");
    if (actionEl) {
      var action = actionEl.getAttribute("data-action");
      if (action === "location") {
        window.open(LINKS.location, "_blank", "noopener");
        return;
      }
      if (action === "rsvp") {
        window.open(LINKS.rsvp, "_blank", "noopener");
        return;
      }
      if (action === "gift") {
        goNext(); // quinta -> sexta
        return;
      }
      if (action === "back") {
        goTo(order.indexOf("quinta")); // sexta -> quinta
        return;
      }
      if (action === "skip-to-interactive") {
        goTo(order.indexOf("quinta")); // qualquer vídeo -> quinta direto
        return;
      }
      if (action === "back-to-invite") {
        // quinta -> volta pro envelope inicial, pronta para recomeçar
        Object.keys(videos).forEach(function (k) {
          videos[k].pause();
          videos[k].currentTime = 0;
        });
        goTo(order.indexOf("primeira"));
        return;
      }
    }

    // toque na primeira cena (envelope) inicia a experiência
    if (order[current] === "primeira") {
      goNext();
    }
  });

  // Também dispara em toques rápidos (mobile) sem atraso de 300ms
  frame.addEventListener("touchend", function () {
    /* click já cobre a maioria dos navegadores modernos; mantido apenas
       para garantir baixa latência em iOS Safari mais antigos */
  }, { passive: true });

  // pré-carrega os vídeos seguintes assim que possível
  window.addEventListener("load", function () {
    Object.keys(videos).forEach(function (k) { videos[k].load(); });
  });

})();
