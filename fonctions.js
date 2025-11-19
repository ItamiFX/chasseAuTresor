import { afficherGroupes, afficherMessage, afficherTableau, afficherlisteJoueurs } from "./affichages.js"
const SERVEUR = "https://pixel-api.codenestedu.fr/"

            // FONCTIONS GET // 
/**
 * Cette fonction permet de vérifier a quel groupe appartient l'utilisateur
 * @param {*} uid uid de l'utilisateur
 */
export function verifId(uid) {
  fetch(`${SERVEUR}equipe-utilisateur?uid=${encodeURIComponent(uid)}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => response.json().then(data => ({ ok: response.ok, data })))
  .then(({ ok, data }) => {
    if (!ok) throw new Error(data.error)
    console.log('Réponse du serveur:', data)
    if (data.equipe) {
      afficherMessage(`Vous êtes dans l'équipe : ${data.equipe}`)
    } else if (data.error) {
      afficherMessage(data.error, "error")
    }
  })
  .catch(error => {
    afficherMessage(error, "error")
    console.error('Erreur lors de la récupération :', error)
  })
}

/**
 * Permet de recharger la page
 */
export function reloadPage() {
  afficherTableau()
  afficherGroupes()
  afficherlisteJoueurs()
}


            // FONCTIONS POST // 
/**
 * Permet de prendre une piece sur le plateau
 * @param {*} uid uid de l'utilisateur
 * @param {*} lig ligne saisie
 * @param {*} col colonne saisie
 */
export function prendrePiece(uid, lig, col) {
  fetch(`${SERVEUR}prendrePiece`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
       uid: uid,
       lig: lig,
       col: col})
  })
  .then(response => response.json().then(data => ({ ok: response.ok, data })))
  .then(({ ok, data }) => {
    if (!ok) {
      throw new Error(data.error)
    }
    if (data.piecePresente === true) {
      afficherMessage(`Vous venez de récuperer une pièce de valeur : ${data.valeurPiece}`)
    } else {
      afficherMessage(data.valeurPiece, "error")
    }
    console.log('Réponse du serveur:', data)
  })
  .catch(error => {
    afficherMessage(error, "error")
    console.error('Erreur :', error)
  })
}

/**
 * Permet de chercher une piece sur le plateau
 * @param {*} uid uid de l'utilisateur
 * @param {*} lig ligne saisie
 * @param {*} col colonne saisie
 */
export function chercherPiece(uid, lig, col) {
  fetch(`${SERVEUR}chercherPiece`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
       uid: uid,
       lig: lig,
       col: col})
  })
  .then(response => response.json().then(data => ({ ok: response.ok, data })))
  .then(({ ok, data }) => {
    if (!ok) {
      throw new Error(data.error)
    }
    console.log("Réponse du sonar :", data)
    if (data.piecePresenteLigne !== undefined && data.piecePresenteColonne !== undefined) {
      afficherMessage(`Il y a une pièce à ${data.piecePresenteLigne} ligne(s) , ${data.piecePresenteColonne} colonne(s)`)
    } else {
      afficherMessage(data.error, "error")
    }
  })
  .catch(error => {
    afficherMessage(error, "error")
    console.error('Erreur sonar:', error)
  })
}

/**
 * Permet de payer un espion pour voler afin de voler une piece
 * @param {*} uid uid de l'utilisateur
 */
export function payerEspion(uid) {
  fetch(`${SERVEUR}payerEspion`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(
      { uid: uid })
  })
  .then(response => response.json().then(data => ({ ok: response.ok, data })))
  .then(({ ok, data }) => {
    if (!ok) {
      throw new Error(data.error)
    }
    console.log(data)
    if (data.success) {
      afficherMessage(data.success)
    }
  })
  .catch(error => {
    afficherMessage(`${error}`, "error")
    console.error("Erreur avec l'espion :" + error)
  })
}

/**
 * Permet de voler une piece aux coordonneés saisies
 * @param {*} uid uid de l'utilisateur
 * @param {*} lig ligne saisie
 * @param {*} col colonne saisie
 */
export function volerPiece(uid, lig, col) {
  fetch(`${SERVEUR}volerPiece`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
       uid: uid,
       lig: lig,
       col: col})
  })
  .then(response => response.json().then(data => ({ ok: response.ok, data })))
  .then(({ ok, data }) => {
    if (!ok) {
      throw new Error(data.error)
    }
    if (data.error) {
      afficherMessage(data.error, "error")
    } else {
      afficherMessage(`${data.success}, 
        Piece de valeur : ${data.piece.valeur}`)
    }
    console.log("Réponse du vol :", data)
  })
  .catch(error => {
    console.error("Erreur lors du vol :", error)
  })
}

/**
 * Entrer un nombre magique
 * @param {*} uid uid de l'utilisateur
 * @param {*} magicNumber magicNumber saisie
 */
export function magicNumber(uid, magicNumber) {
  fetch(`${SERVEUR}magic-number`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
       uid: uid,
       magicNumber: magicNumber})
  })
  .then(response => response.json().then(data => ({ ok: response.ok, data })))
  .then(({ ok, data }) => {
    if (!ok) {
      throw new Error(data.error)
    }
    if (data.message) {
      afficherMessage(data.message)
    }
    console.log("Réponse du serveur :", data)
  })
  .catch(error => {
    afficherMessage(error, "error")
    console.error(error, error)
  })
}
