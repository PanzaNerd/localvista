class LocalVistaNav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        /* CSS iniettato per il Menu Mobile (Self-Contained) */
        .lv-hamburger {
          display: none;
          cursor: pointer;
          background: none;
          border: none;
          font-size: 1.5rem;
          color: var(--lv-text-main);
          transition: transform 0.2s;
        }
        @media (max-width: 900px) {
          .lv-hamburger {
            display: block;
          }
          .lv-nav-links {
            display: none;
            position: absolute;
            top: 70px;
            left: 0;
            width: 100%;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(12px);
            flex-direction: column;
            padding: 2rem;
            box-shadow: 0 10px 20px rgba(0,0,0,0.05);
            border-bottom: 1px solid var(--lv-border);
          }
          .lv-nav-links.active {
            display: flex;
            animation: slideDown 0.3s ease forwards;
          }
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .lv-nav-links a {
            width: 100%;
            text-align: center;
            padding: 15px 0;
            border-bottom: 1px solid var(--lv-border);
          }
          .lv-nav-links a.lv-btn-primary {
            border-bottom: none;
            margin-top: 15px;
          }
        }
      </style>

      <nav class="lv-nav">
        <div class="lv-nav-container">
          <a href="index.html" class="lv-logo">👁️ Local<strong>Vista</strong></a>
          <button class="lv-hamburger" id="lv-menu-toggle" aria-label="Menu">☰</button>
          <div class="lv-nav-links" id="main-nav-links">
            <a href="seo-locale.html">Local SEO</a>
            <a href="zero-tax.html">Zero Commissioni</a>
            <a href="automazione.html">Automazione</a>
            <a href="visione.html">Manifesto</a>
            <a href="pricing.html">Prezzi</a>
            <a href="automazione.html#audit" class="lv-btn-primary">Richiedi Audit</a>
          </div>
        </div>
      </nav>
    `;

    // 1. Motore di Routing Antiproiettile
    const path = window.location.pathname;
    let currentPage = path.split("/").pop() || "index.html"; // Fallback su index se root

    // Pulisce l'URL da ancore o query string (es. file.html#section -> file.html)
    currentPage = currentPage.split("#")[0].split("?")[0];

    const links = this.querySelectorAll(
      "#main-nav-links a:not(.lv-btn-primary)",
    );

    links.forEach((link) => {
      const href = link.getAttribute("href");
      if (href === currentPage) {
        link.style.color = "var(--lv-green)";
        link.style.fontWeight = "800"; // Diamo più peso al link attivo
      } else {
        link.style.color = "var(--lv-text-main)";
        link.style.fontWeight = "600";
      }
    });

    // 2. Logica Mobile Hamburger Menu
    const menuToggle = this.querySelector("#lv-menu-toggle");
    const navLinks = this.querySelector("#main-nav-links");

    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      // Animazione icona: Hamburger <-> X
      if (navLinks.classList.contains("active")) {
        menuToggle.innerHTML = "✕";
        menuToggle.style.transform = "rotate(90deg)";
      } else {
        menuToggle.innerHTML = "☰";
        menuToggle.style.transform = "rotate(0deg)";
      }
    });
  }
}

// Registriamo il componente
customElements.define("lv-navbar", LocalVistaNav);
