/* ==========================================================================
   1. DONNÉES (Globales pour être accessibles partout)
   ========================================================================== */

const projectDetails = {
  symfony: {
    title: "Application Web Symfony",
    description:
      "Développement d'une plateforme de gestion d'étudiant. Ce projet a permis de mettre en pratique l'architecture MVC et la gestion de base de données relationnelle.",
    image: "css/images/projet_symfony.png",
    tech: ["PHP / Symfony", "MySQL", "Twig", "Bootstrap"],
    features: [
      "Gestion des étudiants en temps réel",
      "Authentification sécurisée",
      "Interface d'administration",
    ],
  },
  cnrs: {
    title: "Refonte du site web du CNRS (GDR)",
    description:
      "Migration complète d'un site WordPress vers une architecture statique moderne (Hugo). Amélioration de la rapidité et de la maintenance collaborative.",
    image: "css/images/sae.png",
    tech: ["Hugo", "GitHub Actions", "Markdown", "Git / GitHub"],
    features: [
      "Conversion WordPress vers Markdown",
      "CI/CD automatisé",
      "Vérification de qualité auto",
    ],
  },
  bomberman: {
    title: "Bomberman - Jeu Vidéo 3D",
    description:
      "Conception du célèbre jeu Bomberman sous Godot Engine. Gestion des collisions et IA des ennemis.",
    image: "css/images/bomberman.png",
    tech: ["Godot Engine 4", "GDScript", "Git"],
    features: ["Système de bonus", "Murs destructibles"],
  },
  tower_defense: {
    title: "Planet Defense - Tower Defense Java",
    description:
      "Optimisation et maintenance évolutive via une approche TDD/BDD.",
    image: "css/images/tower_defense.png",
    tech: ["Java", "JUnit (TDD)", "Cucumber (BDD)"],
    features: [
      "Tests de non-régression",
      "Fonctionnalité Missile",
      "Optimisation de boucle de jeu",
    ],
  },
};
const expData = {
  alternance: {
    title: "Développeur d'application Low Code - Groupe Cargo",
    features: [
      "Refonte d'interfaces utilisateurs pour une meilleure ergonomie",
      "Optimisation de bases de données relationnelles",
      "Développement de solutions agiles en environnement DSI",
      "Collaboration sur des projets d'envergure",
    ],
    tech: ["Power Apps", "Dataverse", "Power Automate", "Business Central"],
    images: [], // Pas d'images pour l'alternance
  },
  stage: {
    title: "Développeur d'application - Eiffage Énergie Systèmes",
    features: [
      "Conception d'outils de gestion interne pour les commerciaux",
      "Recueil des besoins métiers spécifiques aux commerciaux",
      "Mise en œuvre de solutions durant 9 semaines",
      "Adaptation aux contraintes de sécurité internes à l'entreprise",
    ],
    tech: ["Power Apps", "SharePoint", "HTML", "CSS"],
    images: [
      "css/images/paga_accueil_appli_bouteille.png",
      "css/images/paga_formulaire_appli_bouteille.png",
      "css/images/paga_accueil_appli_devis.png",
      "css/images/paga_formulaire_appli_devis.png",
    ],
  },
};

function openExpModal(type) {
  const data = expData[type];
  if (!data) return;

  // 1. Titre et Missions
  document.getElementById("exp-title").innerText = data.title;
  document.getElementById("exp-features").innerHTML = data.features
    .map((f) => `<li>${f}</li>`)
    .join("");

  // 2. Technologies (Badges)
  const techContainer = document.getElementById("exp-tech");
  techContainer.innerHTML = data.tech
    .map((t) => `<span class="tech-badge">${t}</span>`)
    .join("");

  // 3. Gestion des images
  const visualsContainer = document.getElementById("exp-visuals-container");

  if (data.images && data.images.length > 0) {
    // On montre le container et on remplit les images
    visualsContainer.style.display = "flex";
    document.getElementById("exp-img1").src = data.images[0] || "";
    document.getElementById("exp-img2").src = data.images[1] || "";
    document.getElementById("exp-img3").src = data.images[2] || "";
    document.getElementById("exp-img4").src = data.images[3] || "";
  } else {
    // On cache le container s'il n'y a pas d'images (pour l'Alternance)
    visualsContainer.style.display = "none";
  }

  document.getElementById("modal-experience").style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeExpModal() {
  document.getElementById("modal-experience").style.display = "none";
  document.body.style.overflow = "auto";
}

/* ==========================================================================
   3. INITIALISATION DU DOM
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const allSections = {
    home: document.getElementById("home"),
    parcours: document.getElementById("parcours"),
    competences: document.getElementById("page-competences"),
    projets: document.getElementById("projets"),
    contact: document.getElementById("contact"),
    experience: document.getElementById("page-experience"),
  };

  const navLinks = {
    home: document.getElementById("nav-home"),
    parcours: document.getElementById("nav-parcours"),
    competences: document.getElementById("nav-competences"),
    projets: document.getElementById("nav-projets"),
    contact: document.getElementById("nav-contact"),
    experience: document.getElementById("nav-experience"),
  };

  const projectModal = document.getElementById("project-modal");

  function showSection(targetSection) {
    Object.values(allSections).forEach((sec) => {
      if (sec) sec.classList.remove("active");
    });
    if (targetSection) {
      targetSection.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function activateFilter(category) {
    category = category.toLowerCase();
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.classList.toggle(
        "active",
        btn.getAttribute("data-filter").toLowerCase() === category,
      );
    });

    document.querySelectorAll(".project-item").forEach((project) => {
      const projectCat = project.getAttribute("data-cat").toLowerCase();
      project.style.display =
        category === "tous" || projectCat.includes(category) ? "block" : "none";
    });
  }

  // Navbar Events
  Object.keys(navLinks).forEach((key) => {
    if (navLinks[key]) {
      navLinks[key].addEventListener("click", (e) => {
        e.preventDefault();
        showSection(allSections[key]);
        if (key === "projets") activateFilter("tous");
      });
    }
  });

  // Internal Buttons
  const internalBtns = [
    { id: "btn-parcours", target: "parcours" },
    { id: "btn-vers-competences", target: "competences" },
    { id: "btn-retour-parcours", target: "parcours" },
    { id: "btn-retour-comp", target: "competences" },
    { id: "btn-more-info", target: "contact" },
  ];

  internalBtns.forEach((btnInfo) => {
    const btn = document.getElementById(btnInfo.id);
    if (btn)
      btn.addEventListener("click", () =>
        showSection(allSections[btnInfo.target]),
      );
  });

  // Comp Cards to Project Filters
  document.querySelectorAll("#page-competences .card").forEach((card) => {
    card.addEventListener("click", () => {
      const badge = card.querySelector(".card-badge");
      if (badge) {
        showSection(allSections.projets);
        activateFilter(badge.innerText.trim());
      }
    });
  });

  // Project Filters
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () =>
      activateFilter(btn.getAttribute("data-filter")),
    );
  });

  // Project Modal Logic
  document.querySelectorAll(".btn-detail-comp").forEach((btn) => {
    if (btn.closest("#page-experience")) return;

    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".card");
      const cardTitle = card.querySelector("h3").innerText.toLowerCase();
      let key = "";

      if (cardTitle.includes("cnrs")) key = "cnrs";
      else if (cardTitle.includes("bomberman")) key = "bomberman";
      else if (cardTitle.includes("tower") || cardTitle.includes("planet"))
        key = "tower_defense";
      else if (cardTitle.includes("symfony")) key = "symfony";

      if (key && projectDetails[key]) {
        const data = projectDetails[key];
        document.getElementById("modal-title").innerText = data.title;
        document.getElementById("modal-description").innerText =
          data.description;
        document.getElementById("modal-img").src = data.image;
        document.getElementById("modal-tech-list").innerHTML = data.tech
          .map((t) => `<li>${t}</li>`)
          .join("");
        document.getElementById("modal-features-list").innerHTML = data.features
          .map((f) => `<li>${f}</li>`)
          .join("");

        projectModal.style.display = "block";
        document.body.style.overflow = "hidden";
      }
    });
  });

  // Project Modal Close
  const closeBtn = document.querySelector(".close-details");
  if (closeBtn) {
    closeBtn.onclick = () => {
      projectModal.style.display = "none";
      document.body.style.overflow = "auto";
    };
  }

  // Global Clicks
  window.onclick = (event) => {
    if (event.target == projectModal) {
      projectModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
    if (event.target == document.getElementById("modal-experience")) {
      closeExpModal();
    }
  };
});
