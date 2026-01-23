/* ===============================
   LOAD HEADER & FOOTER (SAFE)
================================ */
function loadComponent(id, file, callback) {
  fetch(file)
    .then(res => res.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
      if (callback) callback();
    });
}

loadComponent("header", "components/header.html", initHeaderFeatures);
loadComponent("footer", "components/footer.html");


/* ===============================
   HEADER-DEPENDENT FEATURES
================================ */
function initHeaderFeatures() {
  initMobileNav();
  initStickyHeader();
  initPortalNotice();
  initSiteSearch();
}


/* ===============================
   MOBILE MENU
================================ */
function initMobileNav() {
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("navLinks");

  if (!menuToggle || !nav) return;

  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
    });
  });
}


/* ===============================
   STICKY HEADER (VISIBLE ALWAYS)
================================ */
function initStickyHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
  });
}


/* ===============================
   PORTAL BUTTON → COMING SOON
================================ */
function initPortalNotice() {
  const portalBtn = document.querySelector(".portal-btn");
  if (!portalBtn) return;

  const notice = document.createElement("span");
  notice.textContent = "Coming soon";
  notice.style.cssText = `
    position: absolute;
    top: 100%;
    right: 0;
    background: #020617;
    color: #fff;
    font-size: 0.75rem;
    padding: 6px 10px;
    border-radius: 6px;
    display: none;
    margin-top: 6px;
  `;

  portalBtn.style.position = "relative";
  portalBtn.appendChild(notice);

  portalBtn.addEventListener("click", (e) => {
    e.preventDefault();
    notice.style.display = "block";

    setTimeout(() => {
      notice.style.display = "none";
    }, 2500);
  });
}


/* ===============================
   SITE-WIDE SEARCH (REAL)
================================ */
function initSiteSearch() {
  const icon = document.querySelector(".search-icon");
  if (!icon) return;

  // Create search UI dynamically
  const box = document.createElement("div");
  box.innerHTML = `
    <input type="search" placeholder="Search the site..." />
    <ul></ul>
  `;
  box.style.cssText = `
    position: absolute;
    top: 60px;
    right: 20px;
    background: #020617;
    padding: 14px;
    border-radius: 10px;
    width: 260px;
    display: none;
    z-index: 9999;
  `;

  document.body.appendChild(box);

  const input = box.querySelector("input");
  const results = box.querySelector("ul");

  icon.addEventListener("click", () => {
    box.style.display = box.style.display === "block" ? "none" : "block";
    input.focus();
  });

  input.addEventListener("input", () => {
    const query = input.value.toLowerCase();
    results.innerHTML = "";

    if (!query) return;

    document.querySelectorAll("section").forEach(section => {
      if (section.innerText.toLowerCase().includes(query)) {
        const title =
          section.querySelector("h1, h2, h3")?.innerText || "Page Section";

        const li = document.createElement("li");
        li.textContent = title;
        li.style.cursor = "pointer";

        li.addEventListener("click", () => {
          section.scrollIntoView({ behavior: "smooth" });
          box.style.display = "none";
        });

        results.appendChild(li);
      }
    });
  });
}


/* ===============================
   GALLERY IMAGE SWAP
================================ */
function swapImage(el) {
  const main = document.getElementById("carouselMain");
  if (main) main.src = el.src;
}


/* ===============================
   FAQ ACCORDION (CUSTOM)
================================ */
function initFAQ() {
  const items = document.querySelectorAll(".faq-item");
  if (!items.length) return;

  items.forEach(item => {
    const q = item.querySelector(".faq-question");
    const a = item.querySelector(".faq-answer");

    q.addEventListener("click", () => {
      item.classList.toggle("active");
      a.style.maxHeight = item.classList.contains("active")
        ? a.scrollHeight + "px"
        : null;
    });
  });
}


/* ===============================
   PAGE-LEVEL INIT
================================ */
document.addEventListener("DOMContentLoaded", () => {
  initFAQ();
});
