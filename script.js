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
    "portal.work.label": "Work index",
    "portal.work.title": "项目入口",
    "portal.work.copy": "看近期作品、实验和系统化产出。",
    "portal.stack.label": "Capability map",
    "portal.stack.title": "能力地图",
    "portal.stack.copy": "快速了解我能解决什么问题。",
    "portal.contact.label": "Contact channel",
    "portal.contact.title": "联系入口",
    "portal.contact.copy": "合作、交流、机会都从这里开始。",
    "status.title": "Open to ideas",
    "status.copy": "正在探索 AI、交互设计、自动化工具，以及更轻盈可爱的个人工作流。",
    "intro.title": "一个集中展示身份、作品和链接的个人主控台。",
    "intro.copy": "你可以把这里改造成作品集、博客入口、简历首页，或者给朋友看的数字名片。当前版本把 Neko.js、贴纸资产和柔和配色组合起来，做成一个轻快、可亲近的个人小站。",
    "intro.tag1": "创意技术",
    "intro.tag2": "AI 工作流",
    "intro.tag3": "界面系统",
    "work.kicker": "Selected Work",
    "work.title": "最近在做",
    "work.item1.title": "AI 工作流中枢",
    "work.item1.copy": "把重复任务、内容生产和资料整理接进一个可复用流程。",
    "work.item2.title": "交互实验室",
    "work.item2.copy": "探索滚动、指针、转场和微交互如何服务信息表达。",
    "work.item3.title": "知识地图",
    "work.item3.copy": "把笔记、学习路径和项目经验整理成可追踪结构。",
    "stack.title": "能力拼图",
    "stack.group1.kicker": "Build",
    "stack.group1.title": "从想法到可用界面",
    "stack.group1.copy": "把需求拆成页面、状态、组件和数据流，快速做出能体验的版本。",
    "stack.group2.kicker": "Automate",
    "stack.group2.title": "把流程变成工具",
    "stack.group2.copy": "用 AI、脚本和前端界面减少重复操作，让工作流更轻。",
    "stack.group3.kicker": "Explain",
    "stack.group3.title": "让复杂内容更清楚",
    "stack.group3.copy": "用结构化写作、可视化和交互，把抽象信息变得容易扫描。",
    "contact.title": "有好玩的想法，就从这里发射。",
    "contact.brief.kicker": "适合聊",
    "contact.brief.copy": "适合聊产品原型、作品集网站、AI 工具、交互动效和个人知识系统。",
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
    "portal.work.label": "Work index",
    "portal.work.title": "Projects",
    "portal.work.copy": "Recent work, experiments, and structured outputs.",
    "portal.stack.label": "Capability map",
    "portal.stack.title": "Stack",
    "portal.stack.copy": "See what kinds of problems I can handle.",
    "portal.contact.label": "Contact channel",
    "portal.contact.title": "Contact",
    "portal.contact.copy": "Collaboration, questions, and opportunities start here.",
    "status.title": "Open to ideas",
    "status.copy": "Exploring AI, interaction design, automation tools, and lighter personal workflows.",
    "intro.title": "A personal dashboard for identity, work, and links.",
    "intro.copy": "This can become a portfolio, blog entrance, resume page, or a small digital card. This version combines Neko.js, sticker assets, and soft colors into a friendly personal site.",
    "intro.tag1": "Creative tech",
    "intro.tag2": "AI workflow",
    "intro.tag3": "Interface systems",
    "work.kicker": "Selected Work",
    "work.title": "Recent work",
    "work.item1.title": "AI Workflow Hub",
    "work.item1.copy": "Reusable flows for repetitive tasks, content production, and research sorting.",
    "work.item2.title": "Interaction Lab",
    "work.item2.copy": "Scroll, pointer, transition, and microinteraction studies for clearer expression.",
    "work.item3.title": "Knowledge Map",
    "work.item3.copy": "Notes, learning paths, and project experience arranged into a traceable system.",
    "stack.title": "Skill garden",
    "stack.group1.kicker": "Build",
    "stack.group1.title": "Ideas into usable interfaces",
    "stack.group1.copy": "Break needs into pages, states, components, and data flow, then ship something testable.",
    "stack.group2.kicker": "Automate",
    "stack.group2.title": "Workflows into tools",
    "stack.group2.copy": "Use AI, scripts, and interfaces to reduce repetitive work.",
    "stack.group3.kicker": "Explain",
    "stack.group3.title": "Complex ideas made clear",
    "stack.group3.copy": "Use structure, visualization, and interaction to make information easier to scan.",
    "contact.title": "Got a playful idea? Launch it here.",
    "contact.brief.kicker": "Good fit",
    "contact.brief.copy": "Good for product prototypes, portfolio sites, AI tools, motion systems, and personal knowledge systems.",
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
    "portal.work.label": "Work index",
    "portal.work.title": "プロジェクト",
    "portal.work.copy": "最近の制作、実験、整理されたアウトプット。",
    "portal.stack.label": "Capability map",
    "portal.stack.title": "スキル",
    "portal.stack.copy": "解決できる問題を素早く把握できます。",
    "portal.contact.label": "Contact channel",
    "portal.contact.title": "連絡",
    "portal.contact.copy": "相談、交流、機会はこちらから。",
    "status.title": "Open to ideas",
    "status.copy": "AI、インタラクションデザイン、自動化ツール、軽やかな個人ワークフローを探求しています。",
    "intro.title": "自分らしさ、作品、リンクをまとめる個人ダッシュボード。",
    "intro.copy": "ポートフォリオ、ブログ入口、履歴書ページ、デジタル名刺として使えます。Neko.js、ステッカー素材、やわらかな配色を組み合わせた親しみやすい小さなサイトです。",
    "intro.tag1": "クリエイティブ技術",
    "intro.tag2": "AI ワークフロー",
    "intro.tag3": "UI システム",
    "work.kicker": "Selected Work",
    "work.title": "最近の制作",
    "work.item1.title": "AI ワークフローハブ",
    "work.item1.copy": "反復作業、コンテンツ制作、資料整理を再利用できる流れにします。",
    "work.item2.title": "インタラクションラボ",
    "work.item2.copy": "スクロール、ポインター、遷移、マイクロインタラクションを探ります。",
    "work.item3.title": "知識マップ",
    "work.item3.copy": "ノート、学習経路、制作経験を追跡しやすい構造にします。",
    "stack.title": "スキルガーデン",
    "stack.group1.kicker": "Build",
    "stack.group1.title": "アイデアを使えるUIへ",
    "stack.group1.copy": "要件をページ、状態、部品、データの流れに分けて試せる形にします。",
    "stack.group2.kicker": "Automate",
    "stack.group2.title": "流れをツールに",
    "stack.group2.copy": "AI、スクリプト、UIで反復作業を軽くします。",
    "stack.group3.kicker": "Explain",
    "stack.group3.title": "複雑な内容を明快に",
    "stack.group3.copy": "構造、可視化、操作性で情報を読みやすくします。",
    "contact.title": "楽しいアイデアがあれば、ここから。",
    "contact.brief.kicker": "相性のよい相談",
    "contact.brief.copy": "プロトタイプ、ポートフォリオ、AIツール、モーション、知識システムに向いています。",
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
    "portal.work.label": "Work index",
    "portal.work.title": "프로젝트",
    "portal.work.copy": "최근 작업, 실험, 정리된 결과물.",
    "portal.stack.label": "Capability map",
    "portal.stack.title": "스택",
    "portal.stack.copy": "해결할 수 있는 문제를 빠르게 봅니다.",
    "portal.contact.label": "Contact channel",
    "portal.contact.title": "연락",
    "portal.contact.copy": "협업, 질문, 기회는 여기서 시작합니다.",
    "status.title": "Open to ideas",
    "status.copy": "AI, 인터랙션 디자인, 자동화 도구, 더 가벼운 개인 워크플로를 탐색하고 있습니다.",
    "intro.title": "정체성, 작업, 링크를 모으는 개인 대시보드.",
    "intro.copy": "포트폴리오, 블로그 입구, 이력서 페이지, 디지털 명함으로 바꿀 수 있습니다. Neko.js, 스티커 에셋, 부드러운 색을 조합한 친근한 개인 사이트입니다.",
    "intro.tag1": "크리에이티브 기술",
    "intro.tag2": "AI 워크플로",
    "intro.tag3": "인터페이스 시스템",
    "work.kicker": "Selected Work",
    "work.title": "최근 작업",
    "work.item1.title": "AI 워크플로 허브",
    "work.item1.copy": "반복 작업, 콘텐츠 제작, 자료 정리를 재사용 가능한 흐름으로 만듭니다.",
    "work.item2.title": "인터랙션 랩",
    "work.item2.copy": "스크롤, 포인터, 전환, 작은 인터랙션을 탐색합니다.",
    "work.item3.title": "지식 지도",
    "work.item3.copy": "노트, 학습 경로, 프로젝트 경험을 추적 가능한 구조로 정리합니다.",
    "stack.title": "스킬 가든",
    "stack.group1.kicker": "Build",
    "stack.group1.title": "아이디어를 쓸 수 있는 UI로",
    "stack.group1.copy": "요구를 페이지, 상태, 컴포넌트, 데이터 흐름으로 나눠 테스트 가능한 형태로 만듭니다.",
    "stack.group2.kicker": "Automate",
    "stack.group2.title": "흐름을 도구로",
    "stack.group2.copy": "AI, 스크립트, 인터페이스로 반복 작업을 줄입니다.",
    "stack.group3.kicker": "Explain",
    "stack.group3.title": "복잡한 내용을 명확하게",
    "stack.group3.copy": "구조, 시각화, 인터랙션으로 정보를 더 쉽게 읽게 합니다.",
    "contact.title": "재미있는 아이디어가 있다면 여기서 시작해요.",
    "contact.brief.kicker": "잘 맞는 주제",
    "contact.brief.copy": "제품 프로토타입, 포트폴리오, AI 도구, 모션, 개인 지식 시스템에 잘 맞습니다.",
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
    "portal.work.label": "Work index",
    "portal.work.title": "Projets",
    "portal.work.copy": "Travaux récents, expériences et sorties structurées.",
    "portal.stack.label": "Capability map",
    "portal.stack.title": "Compétences",
    "portal.stack.copy": "Voir rapidement les problèmes que je peux traiter.",
    "portal.contact.label": "Contact channel",
    "portal.contact.title": "Contact",
    "portal.contact.copy": "Collaboration, questions et opportunités commencent ici.",
    "status.title": "Open to ideas",
    "status.copy": "J’explore l’IA, le design interactif, les outils d’automatisation et des workflows personnels plus légers.",
    "intro.title": "Un tableau de bord personnel pour identité, projets et liens.",
    "intro.copy": "Il peut devenir portfolio, entrée de blog, page de CV ou carte numérique. Cette version combine Neko.js, des stickers et des couleurs douces.",
    "intro.tag1": "Technologie créative",
    "intro.tag2": "Workflow IA",
    "intro.tag3": "Systèmes d’interface",
    "work.kicker": "Selected Work",
    "work.title": "Travaux récents",
    "work.item1.title": "Hub de workflow IA",
    "work.item1.copy": "Des flux réutilisables pour tâches répétitives, contenu et recherche.",
    "work.item2.title": "Labo d’interaction",
    "work.item2.copy": "Études de scroll, pointeur, transitions et micro-interactions.",
    "work.item3.title": "Carte de connaissances",
    "work.item3.copy": "Notes, parcours d’apprentissage et expériences organisés en système traçable.",
    "stack.title": "Jardin de compétences",
    "stack.group1.kicker": "Build",
    "stack.group1.title": "Des idées aux interfaces utiles",
    "stack.group1.copy": "Transformer les besoins en pages, états, composants et flux testables.",
    "stack.group2.kicker": "Automate",
    "stack.group2.title": "Des workflows en outils",
    "stack.group2.copy": "Utiliser IA, scripts et interfaces pour réduire le travail répétitif.",
    "stack.group3.kicker": "Explain",
    "stack.group3.title": "Clarifier le complexe",
    "stack.group3.copy": "Structurer, visualiser et rendre l’information plus facile à parcourir.",
    "contact.title": "Une idée amusante ? Lancez-la ici.",
    "contact.brief.kicker": "Bon sujet",
    "contact.brief.copy": "Prototypes produit, portfolios, outils IA, motion design et systèmes de connaissance.",
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
    "portal.work.label": "Work index",
    "portal.work.title": "Proyectos",
    "portal.work.copy": "Trabajos recientes, experimentos y resultados estructurados.",
    "portal.stack.label": "Capability map",
    "portal.stack.title": "Habilidades",
    "portal.stack.copy": "Ver rápido qué problemas puedo resolver.",
    "portal.contact.label": "Contact channel",
    "portal.contact.title": "Contacto",
    "portal.contact.copy": "Colaboración, preguntas y oportunidades empiezan aquí.",
    "status.title": "Open to ideas",
    "status.copy": "Exploro IA, diseño interactivo, herramientas de automatización y flujos personales más ligeros.",
    "intro.title": "Un panel personal para identidad, trabajos y enlaces.",
    "intro.copy": "Puede convertirse en portfolio, entrada de blog, CV o tarjeta digital. Esta versión combina Neko.js, stickers y colores suaves.",
    "intro.tag1": "Tecnología creativa",
    "intro.tag2": "Workflow IA",
    "intro.tag3": "Sistemas de interfaz",
    "work.kicker": "Selected Work",
    "work.title": "Trabajo reciente",
    "work.item1.title": "Centro de workflow IA",
    "work.item1.copy": "Flujos reutilizables para tareas repetidas, contenido e investigación.",
    "work.item2.title": "Laboratorio de interacción",
    "work.item2.copy": "Exploración de scroll, puntero, transiciones y microinteracciones.",
    "work.item3.title": "Mapa de conocimiento",
    "work.item3.copy": "Notas, rutas de aprendizaje y experiencia organizadas en un sistema trazable.",
    "stack.title": "Jardín de habilidades",
    "stack.group1.kicker": "Build",
    "stack.group1.title": "Ideas a interfaces útiles",
    "stack.group1.copy": "Convertir necesidades en páginas, estados, componentes y flujos testeables.",
    "stack.group2.kicker": "Automate",
    "stack.group2.title": "Workflows en herramientas",
    "stack.group2.copy": "Usar IA, scripts e interfaces para reducir trabajo repetitivo.",
    "stack.group3.kicker": "Explain",
    "stack.group3.title": "Aclarar lo complejo",
    "stack.group3.copy": "Estructurar, visualizar y hacer la información fácil de escanear.",
    "contact.title": "¿Una idea divertida? Lánzala aquí.",
    "contact.brief.kicker": "Buen encaje",
    "contact.brief.copy": "Prototipos, portfolios, herramientas IA, motion y sistemas personales de conocimiento.",
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
