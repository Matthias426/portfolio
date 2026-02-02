document.addEventListener("DOMContentLoaded", () => {
  // --- 1. SÉLECTEURS SECTIONS (Déclarés en premier) ---
  const homeSection = document.getElementById("home");
  const parcoursSection = document.getElementById("parcours");
  const compSection = document.getElementById("page-competences");
  const projectSection = document.getElementById("projets");
  const contactSection = document.getElementById("contact");

  // Maintenant on peut créer le tableau sans erreur
  const allSections = [
    homeSection,
    parcoursSection,
    compSection,
    projectSection,
    contactSection,
  ];

  // --- 2. SÉLECTEURS NAVIGATION ---
  const btnParcours = document.getElementById("btn-parcours");
  const btnVersComp = document.getElementById("btn-vers-competences");
  const btnRetourParcours = document.getElementById("btn-retour-parcours");
  const btnRetourComp = document.getElementById("btn-retour-comp");
  const btnMoreInfo = document.getElementById("btn-more-info");

  const navHome = document.getElementById("nav-home");
  const navParcours = document.getElementById("nav-parcours");
  const navComp = document.getElementById("nav-competences");
  const navProjets = document.getElementById("nav-projets");
  const navContact = document.getElementById("nav-contact");

  // --- 3. FILTRES & MODALS ---
  const filterBtns = document.querySelectorAll(".filter-btn");
  const compCards = document.querySelectorAll("#page-competences .card");
  const modalEiffage = document.getElementById("modal-eiffage");
  const btnDetailsEiffage = document.getElementById("btn-details-eiffage");
  const spanCloseEiffage = document.querySelector(".close-modal");
  const projectModal = document.getElementById("project-modal");

  // --- 4. DONNÉES DES PROJETS (Fusionnées) ---
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
      features: ["Système de bonus", "Murs destructibles", "IA Pathfinding"],
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

  // --- 5. FONCTIONS ---
  function showSection(targetSection) {
    allSections.forEach((sec) => {
      if (sec) sec.classList.remove("active");
    });
    if (targetSection) {
      targetSection.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function activateFilter(category) {
    category = category.toLowerCase();
    filterBtns.forEach((btn) => {
      btn.classList.toggle(
        "active",
        btn.getAttribute("data-filter").toLowerCase() === category,
      );
    });

    const projects = document.querySelectorAll(".project-item");
    projects.forEach((project) => {
      const projectCat = project.getAttribute("data-cat").toLowerCase();
      project.style.display =
        category === "tous" || projectCat.includes(category) ? "block" : "none";
    });
  }

  // --- 6. ÉVÉNEMENTS ---

  // Navbar
  if (navHome)
    navHome.addEventListener("click", (e) => {
      e.preventDefault();
      showSection(homeSection);
    });
  if (navParcours)
    navParcours.addEventListener("click", (e) => {
      e.preventDefault();
      showSection(parcoursSection);
    });
  if (navComp)
    navComp.addEventListener("click", (e) => {
      e.preventDefault();
      showSection(compSection);
    });
  if (navProjets)
    navProjets.addEventListener("click", (e) => {
      e.preventDefault();
      showSection(projectSection);
      activateFilter("tous");
    });
  if (navContact)
    navContact.addEventListener("click", (e) => {
      e.preventDefault();
      showSection(contactSection);
    });

  // Boutons Internes
  if (btnParcours)
    btnParcours.addEventListener("click", () => showSection(parcoursSection));
  if (btnVersComp)
    btnVersComp.addEventListener("click", () => showSection(compSection));
  if (btnRetourParcours)
    btnRetourParcours.addEventListener("click", () =>
      showSection(parcoursSection),
    );
  if (btnRetourComp)
    btnRetourComp.addEventListener("click", () => showSection(compSection));
  if (btnMoreInfo)
    btnMoreInfo.addEventListener("click", () => showSection(contactSection));

  // Cartes Compétences -> Filtre Projets
  compCards.forEach((card) => {
    card.addEventListener("click", () => {
      const badge = card.querySelector(".card-badge");
      if (badge) {
        showSection(projectSection);
        activateFilter(badge.innerText.trim());
      }
    });
  });

  // Filtres Projets
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () =>
      activateFilter(btn.getAttribute("data-filter")),
    );
  });

  // Logique d'ouverture Modal Projets
  document.querySelectorAll(".btn-detail-comp").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".card");
      const cardTitle = card.querySelector("h3").innerText.toLowerCase();
      let key = "";

      if (cardTitle.includes("cnrs")) key = "cnrs";
      else if (cardTitle.includes("bomberman")) key = "bomberman";
      else if (cardTitle.includes("tower") || cardTitle.includes("planet"))
        key = "tower_defense";
      else if (
        cardTitle.includes("symfony") ||
        cardTitle.includes("immobilière")
      )
        key = "symfony";

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

  // Fermetures Modals
  const closeBtn = document.querySelector(".close-details");
  if (closeBtn)
    closeBtn.onclick = () => {
      projectModal.style.display = "none";
      document.body.style.overflow = "auto";
    };

  window.onclick = (event) => {
    if (event.target == projectModal) {
      projectModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  };
});
