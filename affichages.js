import { getTableau, getGroupes, getListeJoueurs} from "./tableaux.js"

/**
 * Affichage de la grille de jeu
 */
export async function afficherTableau() {
  const data = await getTableau()
  const grille = document.getElementById("grille")
  grille.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length; j++) {
      const div = document.createElement("div")
      div.classList.add("pixel")
      div.style.backgroundColor = data[i][j];
      div.addEventListener("click", () => {
        afficherMessage(`Position pixel -> lig: ${i}, col : ${j}`)
      })
      grille.appendChild(div)
    }
  }
}

/**
 * Affichage d'un message dans la console 
 * @param {*} message contenu du message
 * @param {*} type success ou error choisi en fonction du type de message retourné 
 */
export function afficherMessage(message, type = "success"){
  const partieConsole = document.getElementById("console")
  partieConsole.style.color = "black"
  partieConsole.textContent = message;
  if(type === "error"){ 
    partieConsole.style.backgroundColor = "red"
  }else{
    partieConsole.style.backgroundColor = "green"
  }
}

/**
 * Permet d'afficher la liste des joueurs actifs et leurs informations
 */
export async function afficherlisteJoueurs() {
  const tab = document.getElementById("listeJoueurs") 
  tab.innerHTML = "";
  const data = await getListeJoueurs()
  for (const joueur of data) {
    const tr = document.createElement("tr")
    const tdNom = document.createElement("td")
    tdNom.textContent = joueur.nom
    const tdGroupe = document.createElement("td")
    tdGroupe.textContent = joueur.groupe
    const tdDate = document.createElement("td")
    tdDate.textContent = new Date(joueur.lastModificationPixel).toLocaleString()
    const tdBanned = document.createElement("td")
    tdBanned.textContent = joueur.banned ? "Oui" : "Non"
    const tdPixels = document.createElement("td")
    tdPixels.textContent = joueur.nbPixelsModifies
    tr.appendChild(tdNom)
    tr.appendChild(tdGroupe)
    tr.appendChild(tdDate)
    tr.appendChild(tdBanned)
    tr.appendChild(tdPixels)
    tab.appendChild(tr)
  }
}

/**
 * Permet d'afficher les groupes et leurs informations
 */
export async function afficherGroupes() {
  const grp = document.getElementById("listeGroupes")
  grp.innerHTML = "";
  const data = await getGroupes()
  for (const grouupe of data){
    const tr = document.createElement("tr")
    const tdGroupe = document.createElement("td")
    tdGroupe.textContent = grouupe.groupe
    const nbPieces = document.createElement("td")
    nbPieces.textContent = grouupe.nombreDePieces
    const tresor = document.createElement("td")
    tresor.textContent = grouupe.totalTresor
    tr.appendChild(tdGroupe)
    tr.appendChild(nbPieces)
    tr.appendChild(tresor)
    grp.appendChild(tr)
  } 
}