/* Rotary Solar Dryer — page content data and interactions. Edit the data below to update the site. */

// ---- Team (edit these names) ----
const TEAM_NAMES = "Team member names to be added";

// ---- Engineering journey ----
const JOURNEY = [
  {
    title: "Concept and CAD of the base table",
    state: "done",
    text: "The dryer starts from a round tabletop on a steel square-tube stand with leg bracing and a central hole for the drive shaft. It was modelled in SolidWorks as part 1 (base).",
    img: "media/cad/cad-base-table.png",
    caption: "SolidWorks model of the base: round top on a braced square-tube stand, with the centre hole for the shaft.",
    plate: true
  },
  {
    title: "CAD of the rotating tray rack",
    state: "done",
    text: "Part 2 is the rotating rack: a cross of square tubes at the base with two tiered towers whose horizontal arms carry the trays at several levels. Small plates under the arms locate the trays. The two parts were then combined in an assembly.",
    img: "media/cad/cad-rotating-rack.png",
    caption: "SolidWorks model of the rotating rack (part 2): cross base and tiered tray arms.",
    plate: true
  },
  {
    title: "Fabricating and drilling the rack frame",
    state: "done",
    text: "The rack was fabricated from mild-steel square tube. Holes were drilled in the arms to bolt on the tray brackets and caster plates.",
    img: "media/photos/drilling-rack-frame.jpg",
    caption: "Drilling the tiered arms of the rack frame to fix the tray brackets."
  },
  {
    title: "Cross base with casters",
    state: "done",
    text: "Swivel casters are bolted under the ends of the cross arms. They roll on the tabletop and carry the weight of the rack and trays, so the central shaft only has to turn it.",
    img: "media/photos/rack-base-and-casters.jpg",
    caption: "The cross base of the rack with casters at the arm ends, on the round tabletop."
  },
  {
    title: "Drive mechanism under the table",
    state: "done",
    text: "A geared DC motor is mounted on the base frame under the tabletop. Through a sprocket stage it turns the vertical central shaft, which passes through the tabletop and drives the rack. A ball bearing (inner ring, outer ring, balls) was modelled for the shaft support.",
    img: "media/photos/drive-mechanism-under-table.jpg",
    caption: "Under the table: geared motor, sprockets and the central shaft. Galvanised trays stacked on the floor."
  },
  {
    title: "Galvanised sector trays",
    state: "done",
    text: "Trays were cut and folded from galvanised iron (GI) sheet as sector shapes, so that four trays make a full ring around the centre on each level.",
    img: "media/photos/trays-on-rotating-rack.jpg",
    caption: "Sector-shaped GI trays placed on the rack arms during trial assembly."
  },
  {
    title: "Transparent dome and final assembly",
    state: "done",
    text: "A transparent segmented dome with metal ribs is fixed to the edge of the tabletop. It covers the whole rack, traps solar heat and protects the produce.",
    img: "media/photos/dryer-with-dome.jpg",
    caption: "The assembled prototype with the transparent dome."
  },
  {
    title: "Performance testing",
    state: "pending",
    text: "Next: side-by-side drying tests against open-sun drying, measuring moisture loss, temperature, humidity and rotation. See the testing plan.",
    img: "media/video/drilling-bracket-poster.jpg",
    caption: "Workshop work continues — drilling the orange mounting bracket."
  }
];

// ---- Design specification (replace "To be added" with values from the SolidWorks drawings) ----
const SPEC = [
  ["Dryer type", "Direct (greenhouse-type) solar dryer with rotating tray rack"],
  ["Cover", "Transparent segmented dome with metal ribs"],
  ["Base", "Round tabletop on mild-steel square-tube stand with bracing"],
  ["Rotating rack", "Mild-steel square tube; cross base + two tiered towers"],
  ["Trays", "Galvanised iron (GI) sheet, sector-shaped, 4 per ring"],
  ["Rack support", "Swivel casters rolling on the tabletop"],
  ["Drive", "Geared DC motor → sprockets → central vertical shaft"],
  ["Shaft support", "Ball bearing (modelled: inner ring, outer ring, balls)"],
  ["Tabletop diameter", null],
  ["Dome height", null],
  ["Number of tray levels", null],
  ["Total tray area", null],
  ["Rack speed", null],
  ["Motor rating / power source", null]
];

const CAD_FILES = [
  ["part-1-base.SLDPRT", "Base table: round top, square-tube stand, centre hole"],
  ["part-2-rotating-rack.SLDPRT", "Rotating rack: cross base and tiered tray arms"],
  ["inner-ring.SLDPRT", "Bearing inner ring"],
  ["outer-ring.SLDPRT", "Bearing outer ring"],
  ["ball.SLDPRT", "Bearing ball"],
  ["tooth.SLDPRT", "Sprocket / gear tooth part"]
];

const CAD_VIEWS = [
  { img: "media/cad/cad-assembly.jpg", caption: "Assembly: base + rotating rack" },
  { img: "media/cad/cad-base-table.png", caption: "Part 1: base table" },
  { img: "media/cad/cad-rotating-rack.png", caption: "Part 2: rotating rack" }
];

// ---- Gallery ----
const GALLERY_CATEGORIES = [
  ["all", "All"],
  ["assembly", "Assembly"],
  ["fabrication", "Fabrication"],
  ["mechanism", "Drive"],
  ["cad", "CAD"]
];
const GALLERY = [
  { img: "media/photos/dryer-with-dome.jpg", cat: "assembly", caption: "Assembled dryer with the transparent dome." },
  { img: "media/photos/trays-on-rotating-rack.jpg", cat: "assembly", caption: "GI sector trays on the rotating rack." },
  { img: "media/photos/rack-base-and-casters.jpg", cat: "fabrication", caption: "Rack cross base with casters on the tabletop." },
  { img: "media/photos/drilling-rack-frame.jpg", cat: "fabrication", caption: "Drilling the rack arms." },
  { img: "media/video/drilling-bracket-poster.jpg", cat: "fabrication", caption: "Drilling the orange mounting bracket (frame from the video)." },
  { img: "media/photos/drive-mechanism-under-table.jpg", cat: "mechanism", caption: "Geared motor, sprockets and central shaft under the table." },
  { img: "media/cad/cad-assembly.jpg", cat: "cad", caption: "SolidWorks assembly.", plate: true },
  { img: "media/cad/cad-base-table.png", cat: "cad", caption: "SolidWorks part 1: base table.", plate: true },
  { img: "media/cad/cad-rotating-rack.png", cat: "cad", caption: "SolidWorks part 2: rotating rack.", plate: true }
];

// ---- Build status ----
const STATUS = [
  {
    group: "Design",
    items: [["Concept", "done"], ["Base table CAD", "done"], ["Rotating rack CAD", "done"], ["Bearing and sprocket parts", "done"], ["Dimensioned drawings online", "pending"]]
  },
  {
    group: "Fabrication",
    items: [["Base stand and tabletop", "done"], ["Rotating rack + casters", "done"], ["GI trays", "done"], ["Transparent dome", "done"], ["Motor and sprocket drive", "done"]]
  },
  {
    group: "Testing",
    items: [["Rotation trial", "pending"], ["Temperature and humidity", "pending"], ["Drying test vs open sun", "pending"], ["Results and report", "pending"]]
  }
];

const STATE_LABEL = { done: "Completed", progress: "In progress", pending: "Pending" };

// ---------------------------------------------------------------------------
function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (key === "text") {
      node.textContent = value;
    } else if (key === "html") {
      node.innerHTML = value;
    } else {
      node.setAttribute(key, value);
    }
  }
  for (const child of children) {
    node.append(child);
  }
  return node;
}

function imageButton(src, caption, alt, plate) {
  const button = el("button", {
    class: "image-button" + (plate ? " plate" : ""),
    type: "button",
    "data-lightbox": src,
    "data-caption": caption
  });
  button.append(el("img", { src: src, alt: alt || caption, loading: "lazy" }));
  return button;
}

function renderJourney() {
  const list = document.getElementById("journey-steps");
  JOURNEY.forEach((step, index) => {
    const number = String(index + 1).padStart(2, "0");
    const body = el("div", {}, [
      el("span", { class: "journey-num", text: "STEP " + number + " " }),
      el("span", { class: "state state-" + step.state, text: STATE_LABEL[step.state] }),
      el("h3", { text: step.title }),
      el("p", { text: step.text })
    ]);
    const media = el("figure", { class: "journey-media" }, [
      imageButton(step.img, step.caption, step.caption, step.plate),
      el("figcaption", { text: step.caption })
    ]);
    list.append(el("li", { class: "journey-step" }, [body, media]));
  });
}

function renderDesign() {
  const rows = document.getElementById("spec-rows");
  for (const [name, value] of SPEC) {
    const valueCell = value ? el("td", { text: value }) : el("td", {}, [el("span", { class: "spec-tbd", text: "To be added" })]);
    rows.append(el("tr", {}, [el("th", { scope: "row", text: name }), valueCell]));
  }
  const files = document.getElementById("cad-files");
  for (const [file, note] of CAD_FILES) {
    files.append(el("li", {}, [el("a", { href: "cad/" + file, download: "", text: file }), el("small", { text: note })]));
  }
  const grid = document.getElementById("cad-grid");
  for (const view of CAD_VIEWS) {
    grid.append(el("figure", { class: "cad-card" }, [imageButton(view.img, view.caption, view.caption, true), el("figcaption", { text: view.caption })]));
  }
}

function renderGallery() {
  const filters = document.getElementById("gallery-filters");
  const grid = document.getElementById("gallery-grid");
  function show(category) {
    grid.innerHTML = "";
    GALLERY.filter((item) => category === "all" || item.cat === category).forEach((item) => {
      grid.append(el("figure", { class: "gallery-card" }, [imageButton(item.img, item.caption, item.caption, item.plate), el("figcaption", { text: item.caption })]));
    });
    filters.querySelectorAll("button").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.filter === category));
    });
  }
  for (const [key, label] of GALLERY_CATEGORIES) {
    const button = el("button", { class: "tool", type: "button", "data-filter": key, "aria-pressed": "false", text: label });
    button.addEventListener("click", () => show(key));
    filters.append(button);
  }
  show("all");
}

function renderStatus() {
  const container = document.getElementById("status-groups");
  for (const group of STATUS) {
    const list = el("ul");
    for (const [name, state] of group.items) {
      list.append(el("li", {}, [el("span", { text: name }), el("span", { class: "state state-" + state, text: STATE_LABEL[state] })]));
    }
    container.append(el("div", { class: "status-group" }, [el("h3", { text: group.group }), list]));
  }
}

function setupLightbox() {
  const dialog = document.getElementById("photo-dialog");
  const image = document.getElementById("dialog-image");
  const caption = document.getElementById("dialog-caption");
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-lightbox]");
    if (!button) {
      return;
    }
    image.src = button.dataset.lightbox;
    image.alt = button.dataset.caption || "";
    caption.textContent = button.dataset.caption || "";
    dialog.showModal();
  });
  document.getElementById("dialog-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });
}

function setupTheme() {
  const toggle = document.getElementById("theme-toggle");
  const label = toggle.querySelector(".theme-toggle-text");
  function apply(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    label.textContent = theme === "dark" ? "Light" : "Dark";
    window.dispatchEvent(new CustomEvent("themechange", { detail: theme }));
  }
  apply(document.documentElement.getAttribute("data-theme") || "dark");
  toggle.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("solar-dryer-theme", next);
    } catch (e) {}
    apply(next);
  });
}

function setupNavigation() {
  const menu = document.getElementById("menu-toggle");
  const nav = document.getElementById("main-nav");
  menu.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    menu.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => nav.classList.remove("is-open")));

  const bar = document.getElementById("scroll-progress-bar");
  window.addEventListener("scroll", () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = "scaleX(" + (max > 0 ? window.scrollY / max : 0) + ")";
  }, { passive: true });

  const links = [...nav.querySelectorAll("a")];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((link) => link.classList.toggle("is-current", link.getAttribute("href") === "#" + entry.target.id));
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("main section[id]").forEach((section) => observer.observe(section));
}

function setupRepoLink() {
  // On GitHub Pages (user.github.io/repo/) link back to the repository.
  const link = document.getElementById("repo-link");
  const host = location.hostname;
  if (host.endsWith("github.io")) {
    const user = host.split(".")[0];
    const repo = location.pathname.split("/").filter(Boolean)[0] || "";
    link.href = "https://github.com/" + user + "/" + repo;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-team-names]").forEach((node) => {
    node.textContent = TEAM_NAMES;
  });
  renderJourney();
  renderDesign();
  renderGallery();
  renderStatus();
  setupLightbox();
  setupTheme();
  setupNavigation();
  setupRepoLink();
});
