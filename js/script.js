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
      "Collaboration sur des projets d'envergure (1 an)",
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
          const allSections = {
            home: document.getElementById("home"),
            parcours: document.getElementById("parcours"),
            competences: document.getElementById("page-competences"),
            projets: document.getElementById("projets"),
            contact: document.getElementById("contact"),
            experience: document.getElementById("page-experience"),
          };
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
