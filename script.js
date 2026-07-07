const loader = document.querySelector(".loader");
const localTime = document.querySelector("#local-time");
const menuTime = document.querySelector("#menu-time");
const menuButton = document.querySelector(".menu-button");
const menuOverlay = document.querySelector(".menu-overlay");
const menuLinks = document.querySelectorAll(".menu-panel a");
const workPreview = document.querySelector(".work-preview");
const workPreviewImage = document.querySelector(".work-preview img");
const workList = document.querySelector(".work-list");
const workRows = document.querySelectorAll(".work-row");
const smoothContent = document.querySelector(".smooth-content");
const interactiveStickers = document.querySelectorAll(".interactive-sticker");
const revealCards = document.querySelectorAll(".reveal-card");
const revealSections = document.querySelectorAll(".section");
const languageChoiceButtons = document.querySelectorAll("[data-lang-choice]");
const languageMenuButton = document.querySelector("[data-lang-menu-button]");
const languageMenu = document.querySelector("[data-lang-menu]");
const languageCurrent = document.querySelector("[data-lang-current]");
const languageOptions = document.querySelectorAll("[data-lang-option]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const smoothQuery = window.matchMedia("(min-width: 861px)");
let canSmoothScroll = !reduceMotion && smoothQuery.matches;

const pointer = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  cx: window.innerWidth / 2,
  cy: window.innerHeight / 2,
};

const scroll = {
  current: 0,
  target: 0,
  height: 0,
};

const menuLinkMotion = Array.from(menuLinks).map((link) => ({
  link,
  current: 0,
  target: 0,
}));

const languageLabels = {
  zh: "中文",
  en: "English",
  ja: "日本語",
  ko: "한국어",
  fr: "Français",
  es: "Español",
};

const translations = {
  zh: {
    "nav.menu": "菜单",
    "nav.close": "关闭",
    "nav.work": "作品",
    "nav.stack": "能力",
    "nav.contact": "联系",
    "menu.home": "首页",
    "menu.localTime": "本地时间",
    "hero.eyebrow": "Neko 驱动的个人花园",
    "hero.title": "把想法养成可爱的小宇宙。",
    "hero.copy": "这里是我的个人入口：项目、实验、笔记、工具和联系方式都从这里开始。Neko 会在页面里追着鼠标跑，像一只住在作品集里的小猫。",
    "hero.viewWork": "查看作品",
    "hero.contactMe": "联系我",
    "status.title": "Open to ideas",
    "status.copy": "正在探索 AI、交互设计、自动化工具，以及更轻盈可爱的个人工作流。",
    "intro.title": "一个集中展示身份、作品和链接的个人主控台。",
    "intro.copy": "你可以把这里改造成作品集、博客入口、简历首页，或者给朋友看的数字名片。当前版本把 Neko.js、贴纸资产和柔和配色组合起来，做成一个轻快、可亲近的个人小站。",
    "work.kicker": "Selected Work",
    "work.title": "最近在做",
    "work.item1.title": "AI 工作流中枢",
    "work.item2.title": "交互实验室",
    "work.item3.title": "知识地图",
    "stack.title": "能力拼图",
    "contact.title": "有好玩的想法，就从这里发射。",
    credit: "贴纸素材来自 OpenMoji，遵循 CC BY-SA 4.0。Neko 由本地 Neko.js 驱动。"
  },
  en: {
    "nav.menu": "Menu",
    "nav.close": "Close",
    "nav.work": "Work",
    "nav.stack": "Stack",
    "nav.contact": "Contact",
    "menu.home": "Home",
    "menu.localTime": "Local time",
    "hero.eyebrow": "Neko-powered personal garden",
    "hero.title": "Grow ideas into a tiny cute universe.",
    "hero.copy": "This is my personal portal for projects, experiments, notes, tools, and contact links. Neko runs after your cursor like a tiny cat living in the portfolio.",
    "hero.viewWork": "View work",
    "hero.contactMe": "Contact me",
    "status.title": "Open to ideas",
    "status.copy": "Exploring AI, interaction design, automation tools, and lighter personal workflows.",
    "intro.title": "A personal dashboard for identity, work, and links.",
    "intro.copy": "This can become a portfolio, blog entrance, resume page, or a small digital card. This version combines Neko.js, sticker assets, and soft colors into a friendly personal site.",
    "work.kicker": "Selected Work",
    "work.title": "Recent work",
    "work.item1.title": "AI Workflow Hub",
    "work.item2.title": "Interaction Lab",
    "work.item3.title": "Knowledge Map",
    "stack.title": "Skill garden",
    "contact.title": "Got a playful idea? Launch it here.",
    credit: "Sticker assets from OpenMoji, licensed under CC BY-SA 4.0. Neko powered by local Neko.js."
  },
  ja: {
    "nav.menu": "メニュー",
    "nav.close": "閉じる",
    "nav.work": "作品",
    "nav.stack": "スキル",
    "nav.contact": "連絡",
    "menu.home": "ホーム",
    "menu.localTime": "ローカル時間",
    "hero.eyebrow": "Neko と暮らす個人ガーデン",
    "hero.title": "アイデアを小さくて可愛い宇宙に育てる。",
    "hero.copy": "ここはプロジェクト、実験、ノート、ツール、連絡先への入口です。Neko がポインターを追いかけ、ポートフォリオに住む小さな猫のように動きます。",
    "hero.viewWork": "作品を見る",
    "hero.contactMe": "連絡する",
    "status.title": "Open to ideas",
    "status.copy": "AI、インタラクションデザイン、自動化ツール、軽やかな個人ワークフローを探求しています。",
    "intro.title": "自分らしさ、作品、リンクをまとめる個人ダッシュボード。",
    "intro.copy": "ポートフォリオ、ブログ入口、履歴書ページ、デジタル名刺として使えます。Neko.js、ステッカー素材、やわらかな配色を組み合わせた親しみやすい小さなサイトです。",
    "work.kicker": "Selected Work",
    "work.title": "最近の制作",
    "work.item1.title": "AI ワークフローハブ",
    "work.item2.title": "インタラクションラボ",
    "work.item3.title": "知識マップ",
    "stack.title": "スキルガーデン",
    "contact.title": "楽しいアイデアがあれば、ここから。",
    credit: "ステッカー素材は OpenMoji、CC BY-SA 4.0 ライセンスです。Neko はローカルの Neko.js で動作します。"
  },
  ko: {
    "nav.menu": "메뉴",
    "nav.close": "닫기",
    "nav.work": "작업",
    "nav.stack": "스택",
    "nav.contact": "연락",
    "menu.home": "홈",
    "menu.localTime": "현지 시간",
    "hero.eyebrow": "Neko가 함께하는 개인 정원",
    "hero.title": "아이디어를 귀여운 작은 우주로 키우기.",
    "hero.copy": "프로젝트, 실험, 노트, 도구, 연락처로 이어지는 개인 포털입니다. Neko가 포인터를 따라다니며 포트폴리오 안에 사는 작은 고양이처럼 움직입니다.",
    "hero.viewWork": "작업 보기",
    "hero.contactMe": "연락하기",
    "status.title": "Open to ideas",
    "status.copy": "AI, 인터랙션 디자인, 자동화 도구, 더 가벼운 개인 워크플로를 탐색하고 있습니다.",
    "intro.title": "정체성, 작업, 링크를 모으는 개인 대시보드.",
    "intro.copy": "포트폴리오, 블로그 입구, 이력서 페이지, 디지털 명함으로 바꿀 수 있습니다. Neko.js, 스티커 에셋, 부드러운 색을 조합한 친근한 개인 사이트입니다.",
    "work.kicker": "Selected Work",
    "work.title": "최근 작업",
    "work.item1.title": "AI 워크플로 허브",
    "work.item2.title": "인터랙션 랩",
    "work.item3.title": "지식 지도",
    "stack.title": "스킬 가든",
    "contact.title": "재미있는 아이디어가 있다면 여기서 시작해요.",
    credit: "스티커 에셋은 OpenMoji, CC BY-SA 4.0 라이선스입니다. Neko는 로컬 Neko.js로 실행됩니다."
  },
  fr: {
    "nav.menu": "Menu",
    "nav.close": "Fermer",
    "nav.work": "Projets",
    "nav.stack": "Compétences",
    "nav.contact": "Contact",
    "menu.home": "Accueil",
    "menu.localTime": "Heure locale",
    "hero.eyebrow": "Un jardin personnel avec Neko",
    "hero.title": "Faire pousser les idées en petit univers mignon.",
    "hero.copy": "Voici mon portail personnel pour projets, expériences, notes, outils et liens de contact. Neko suit votre curseur comme un petit chat vivant dans le portfolio.",
    "hero.viewWork": "Voir les projets",
    "hero.contactMe": "Me contacter",
    "status.title": "Open to ideas",
    "status.copy": "J’explore l’IA, le design interactif, les outils d’automatisation et des workflows personnels plus légers.",
    "intro.title": "Un tableau de bord personnel pour identité, projets et liens.",
    "intro.copy": "Il peut devenir portfolio, entrée de blog, page de CV ou carte numérique. Cette version combine Neko.js, des stickers et des couleurs douces.",
    "work.kicker": "Selected Work",
    "work.title": "Travaux récents",
    "work.item1.title": "Hub de workflow IA",
    "work.item2.title": "Labo d’interaction",
    "work.item3.title": "Carte de connaissances",
    "stack.title": "Jardin de compétences",
    "contact.title": "Une idée amusante ? Lancez-la ici.",
    credit: "Stickers OpenMoji sous licence CC BY-SA 4.0. Neko fonctionne avec Neko.js local."
  },
  es: {
    "nav.menu": "Menú",
    "nav.close": "Cerrar",
    "nav.work": "Trabajos",
    "nav.stack": "Habilidades",
    "nav.contact": "Contacto",
    "menu.home": "Inicio",
    "menu.localTime": "Hora local",
    "hero.eyebrow": "Jardín personal con Neko",
    "hero.title": "Cultivar ideas en un pequeño universo adorable.",
    "hero.copy": "Este es mi portal personal para proyectos, experimentos, notas, herramientas y enlaces de contacto. Neko persigue el cursor como un gato diminuto que vive en el portfolio.",
    "hero.viewWork": "Ver trabajos",
    "hero.contactMe": "Contactarme",
    "status.title": "Open to ideas",
    "status.copy": "Exploro IA, diseño interactivo, herramientas de automatización y flujos personales más ligeros.",
    "intro.title": "Un panel personal para identidad, trabajos y enlaces.",
    "intro.copy": "Puede convertirse en portfolio, entrada de blog, CV o tarjeta digital. Esta versión combina Neko.js, stickers y colores suaves.",
    "work.kicker": "Selected Work",
    "work.title": "Trabajo reciente",
    "work.item1.title": "Centro de workflow IA",
    "work.item2.title": "Laboratorio de interacción",
    "work.item3.title": "Mapa de conocimiento",
    "stack.title": "Jardín de habilidades",
    "contact.title": "¿Una idea divertida? Lánzala aquí.",
    credit: "Stickers de OpenMoji bajo licencia CC BY-SA 4.0. Neko funciona con Neko.js local."
  }
};

let currentLanguage = "en";

function applyLanguage(lang, options = {}) {
  const dictionary = translations[lang] || translations.en;
  currentLanguage = translations[lang] ? lang : "en";
  document.documentElement.lang = lang === "zh" ? "zh-CN" : lang;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (dictionary[key]) node.textContent = dictionary[key];
  });
  if (languageCurrent) languageCurrent.textContent = languageLabels[currentLanguage];
  languageOptions.forEach((button) => {
    const isActive = button.dataset.langOption === currentLanguage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-current", isActive ? "true" : "false");
  });
  if (options.markChoice) {
    languageChoiceButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.langChoice === lang);
    });
  }
  if (menuButton) {
    const isOpen = menuOverlay?.classList.contains("is-open");
    menuButton.textContent = dictionary[isOpen ? "nav.close" : "nav.menu"];
  }
  localStorage.setItem("jlife-language", lang);
  resizeSmoothPage();
  requestAnimationFrame(resizeSmoothPage);
}

function closeLanguageMenu() {
  languageMenu?.classList.remove("is-open");
  languageMenu?.setAttribute("aria-hidden", "true");
  languageMenuButton?.setAttribute("aria-expanded", "false");
}

function toggleLanguageMenu() {
  const isOpen = !languageMenu?.classList.contains("is-open");
  if (isOpen) closeMenu();
  languageMenu?.classList.toggle("is-open", isOpen);
  languageMenu?.setAttribute("aria-hidden", String(!isOpen));
  languageMenuButton?.setAttribute("aria-expanded", String(isOpen));
}

function closeLoader() {
  loader?.classList.add("is-hidden");
  document.body.classList.remove("loader-open");
  window.setTimeout(() => {
    if (loader) loader.hidden = true;
  }, 900);
}

function updateTime() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    timeZoneName: "shortOffset",
  });
  const parts = formatter.formatToParts(now).reduce((result, part) => {
    result[part.type] = part.value;
    return result;
  }, {});
  const zone = (parts.timeZoneName || "").replace(/GMT([+-])0?(\d+)(?::00)?$/, "GMT$1$2");
  const time = `${parts.weekday || ""} ${zone} ${parts.hour || ""}:${parts.minute || ""}`.trim();
  if (localTime) localTime.textContent = time;
  if (menuTime) menuTime.textContent = time;
}

function resizeSmoothPage() {
  canSmoothScroll = !reduceMotion && smoothQuery.matches;
  if (!canSmoothScroll || !smoothContent) {
    document.body.style.height = "";
    smoothContent.style.transform = "";
    return;
  }
  scroll.height = smoothContent.getBoundingClientRect().height;
  document.body.style.height = `${scroll.height}px`;
}

function animateFrame() {
  pointer.cx += (pointer.x - pointer.cx) * 0.32;
  pointer.cy += (pointer.y - pointer.cy) * 0.32;

  if (workPreview?.classList.contains("is-visible")) {
    const previewX = Math.min(pointer.cx + 190, window.innerWidth - 130);
    const previewY = Math.max(pointer.cy - 24, 120);
    workPreview.style.transform = `translate3d(${previewX}px, ${previewY}px, 0) translate(-50%, -50%) rotate(-2deg) scale(1)`;
  } else if (workPreview) {
    workPreview.style.transform = `translate3d(${pointer.cx + 120}px, ${pointer.cy + 18}px, 0) translate(-50%, -50%) rotate(-4deg) scale(0.86)`;
  }

  scroll.target = window.scrollY;

  if (canSmoothScroll && smoothContent) {
    scroll.current += (scroll.target - scroll.current) * 0.095;
    if (Math.abs(scroll.target - scroll.current) < 0.08) {
      scroll.current = scroll.target;
    }
    smoothContent.style.transform = `translate3d(0, ${-scroll.current}px, 0)`;
  } else {
    scroll.current = scroll.target;
  }

  menuLinkMotion.forEach((item) => {
    item.current += (item.target - item.current) * 0.13;
    if (Math.abs(item.target - item.current) < 0.04) {
      item.current = item.target;
    }
    item.link.style.setProperty("--menu-link-x", `${item.current.toFixed(2)}px`);
  });

  updateReveals();
  requestAnimationFrame(animateFrame);
}

function updateReveals() {
  const revealLine = scroll.current + window.innerHeight * 0.84;
  revealSections.forEach((section) => {
    if (section.offsetTop < revealLine) {
      section.classList.add("is-visible");
    }
  });

  revealCards.forEach((card, index) => {
    if (card.offsetTop + card.closest(".section").offsetTop < revealLine) {
      card.style.transitionDelay = `${index * 70}ms`;
      card.classList.add("is-visible");
    }
  });
}

function movePointer(event) {
  pointer.x = event.clientX;
  pointer.y = event.clientY;
}

function toggleMenu() {
  closeLanguageMenu();
  const isOpen = menuOverlay?.classList.toggle("is-open");
  const dictionary = translations[currentLanguage] || translations.en;
  document.body.classList.toggle("menu-open", Boolean(isOpen));
  menuOverlay?.setAttribute("aria-hidden", String(!isOpen));
  menuButton?.setAttribute("aria-expanded", String(Boolean(isOpen)));
  if (menuButton) menuButton.textContent = dictionary[isOpen ? "nav.close" : "nav.menu"];
}

function closeMenu() {
  const dictionary = translations[currentLanguage] || translations.en;
  document.body.classList.remove("menu-open");
  menuOverlay?.classList.remove("is-open");
  menuOverlay?.setAttribute("aria-hidden", "true");
  menuButton?.setAttribute("aria-expanded", "false");
  if (menuButton) menuButton.textContent = dictionary["nav.menu"];
}

function scrollToTarget(target) {
  const targetElement = document.querySelector(target);
  if (!targetElement) return;
  const top = canSmoothScroll
    ? targetElement.offsetTop
    : targetElement.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top, behavior: canSmoothScroll ? "auto" : "smooth" });
}

document.addEventListener("pointermove", movePointer);
window.addEventListener("resize", resizeSmoothPage);
window.addEventListener("load", resizeSmoothPage);
smoothQuery.addEventListener("change", resizeSmoothPage);
menuButton?.addEventListener("click", toggleMenu);
languageMenuButton?.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleLanguageMenu();
});

let languageEntryTimer = null;
applyLanguage("en");
languageChoiceButtons.forEach((button) => button.classList.remove("is-active"));
document.body.classList.add("loader-open");
languageEntryTimer = window.setTimeout(closeLoader, 10000);

languageChoiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (languageEntryTimer) window.clearTimeout(languageEntryTimer);
    applyLanguage(button.dataset.langChoice || "en", { markChoice: true });
    closeLoader();
  });
});

languageOptions.forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(button.dataset.langOption || "en");
    closeLanguageMenu();
  });
});

document.addEventListener("click", (event) => {
  if (!languageMenu?.classList.contains("is-open")) return;
  if (event.target instanceof Node && languageMenu.contains(event.target)) return;
  if (event.target instanceof Node && languageMenuButton?.contains(event.target)) return;
  closeLanguageMenu();
});

menuOverlay?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    if (menuOverlay.classList.contains("is-open")) toggleMenu();
  });
});

menuLinkMotion.forEach((item) => {
  item.link.addEventListener("pointerenter", () => {
    item.target = window.innerWidth <= 860 ? 4 : 8;
  });

  item.link.addEventListener("pointerleave", () => {
    item.target = 0;
  });
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (!href || href === "#") return;
    event.preventDefault();
    scrollToTarget(href);
  });
});

document.querySelectorAll(".magnetic").forEach((item) => {
  item.addEventListener("pointermove", (event) => {
    if (reduceMotion) return;
    const rect = item.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    item.style.transform = `translate(${x * 0.18}px, ${y * 0.24}px)`;
  });

  item.addEventListener("pointerleave", () => {
    item.style.transform = "";
  });
});

interactiveStickers.forEach((sticker) => {
  sticker.addEventListener("pointermove", (event) => {
    if (reduceMotion) return;
    const rect = sticker.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    sticker.style.translate = `${x * 0.08}px ${y * 0.08}px`;
    sticker.classList.add("is-hovered");
  });

  sticker.addEventListener("pointerleave", () => {
    sticker.style.translate = "";
    sticker.classList.remove("is-hovered");
  });

  sticker.addEventListener("click", () => {
    sticker.classList.remove("is-popping");
    void sticker.offsetWidth;
    sticker.classList.add("is-popping");
  });
});

let activeWorkRow = null;
let activeWorkIndex = -1;

function activateWorkRow(row, event) {
  const nextIndex = Number(row.dataset.index);
  let origin = "top";

  if (activeWorkIndex >= 0 && nextIndex !== activeWorkIndex) {
    origin = nextIndex < activeWorkIndex ? "bottom" : "top";
  } else if (event) {
    const rect = row.getBoundingClientRect();
    origin = event.clientY < rect.top + rect.height / 2 ? "top" : "bottom";
  }

  row.style.setProperty("--work-origin", origin);

  if (activeWorkRow === row) return;
  if (activeWorkRow) {
    activeWorkRow.style.setProperty("--work-origin", origin === "bottom" ? "top" : "bottom");
    activeWorkRow.classList.remove("is-active");
  }
  activeWorkRow = row;
  activeWorkIndex = nextIndex;
  activeWorkRow.classList.add("is-active");

  if (workPreviewImage && row.dataset.preview) {
    workPreviewImage.src = row.dataset.preview;
  }
  workPreview?.classList.add("is-visible");
}

workRows.forEach((row, index) => {
  row.dataset.index = String(index);
  row.addEventListener("pointerenter", (event) => {
    activateWorkRow(row, event);
  });
});

workList?.addEventListener("pointerleave", () => {
  activeWorkRow?.classList.remove("is-active");
  activeWorkRow = null;
  activeWorkIndex = -1;
  workPreview?.classList.remove("is-visible");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLanguageMenu();
  }
  if (event.key === "Escape" && menuOverlay?.classList.contains("is-open")) {
    toggleMenu();
  }
});

resizeSmoothPage();
requestAnimationFrame(animateFrame);
updateTime();
setInterval(updateTime, 30_000);
