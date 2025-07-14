// assets/js/script.js

document.addEventListener("DOMContentLoaded", () => {
  // Récupération des boutons onglets et contenus associés
  const tabButtons = document.querySelectorAll(".nav-tabs button");
  const tabContents = document.querySelectorAll(".tab-content");

  // Gestion activation onglet
  tabButtons.forEach((btn, idx) => {
    btn.addEventListener("click", () => {
      // Désactive tous onglets/contenus
      tabButtons.forEach(b => b.classList.remove("active"));
      tabContents.forEach(c => c.classList.remove("active"));
      // Active onglet + contenu
      btn.classList.add("active");
      tabContents[idx].classList.add("active");
    });
  });

  // Activation initiale du premier onglet
  if(tabButtons.length > 0){
    tabButtons[0].classList.add("active");
    tabContents[0].classList.add("active");
  }

  // Exemple simple : liste de fichiers pour chaque onglet
  // Pour l’instant statique, à remplacer par chargement dynamique en php ou local (selon contexte)
  const filesByTab = {
    "cdc": ["cdc_initial.md"],
    "checklist": ["checklist.md"],
    "instructions": ["cadrage_initial.yaml", "instructions.yaml", "recadrage.yaml"],
    "audit": ["audit.log"],
    "pilotage": ["pilotage.md", "changelog.md"],
    "initialisation": ["ia-superviseuse.yaml", "ia-f.yaml"],
    "aide": []
  };

  // Fonction pour afficher liste fichiers et gérer clic affichage contenu
  function setupFileLists(){
    tabContents.forEach(tab => {
      const tabId = tab.getAttribute("data-tab");
      if(!filesByTab[tabId]) return;

      const listDiv = tab.querySelector(".file-list");
      const contentPre = tab.querySelector(".file-content");
      if(!listDiv || !contentPre) return;

      // Clear old
      listDiv.innerHTML = "";

      filesByTab[tabId].forEach(filename => {
        const btn = document.createElement("button");
        btn.textContent = filename;
        btn.addEventListener("click", () => {
          // Ici on simule chargement contenu (à remplacer par fetch si possible)
          contentPre.textContent = `Contenu simulé pour ${filename}\n\n(À remplacer par chargement réel)`;
        });
        listDiv.appendChild(btn);
      });
    });
  }

  setupFileLists();

  // Copier dans le presse-papiers (bouton présent dans chaque contenu)
  document.querySelectorAll(".copy-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const content = btn.closest(".tab-content").querySelector(".file-content").textContent;
      navigator.clipboard.writeText(content).then(() => {
        alert("Contenu copié dans le presse-papiers !");
      }).catch(() => {
        alert("Échec de la copie. Essayez manuellement.");
      });
    });
  });
});
