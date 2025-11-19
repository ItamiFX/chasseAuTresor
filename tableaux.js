const SERVEUR = "https://pixel-api.codenestedu.fr/"
/**
 * Récupération de la grille de jeu
 * @returns
 */
export function getTableau() {
  return fetch(`${SERVEUR}tableau`)
    .then(rep => {
      if (!rep.ok) {
        throw new Error(`Response status: ${rep.status}`)
      }
      return rep.json()
    })
    .catch(error => {
      console.error(error.message)
    })
}

/**
 * Récupération de la liste des joueurs
 * @returns 
 */
export function getListeJoueurs() {
  return fetch(`${SERVEUR}liste-joueurs`)
    .then(rep => {
      if (!rep.ok) {
        throw new Error(`Response status: ${rep.status}`)
      }
      return rep.json()
    })
    .catch(error => {
      console.error(error.message)
    })
}

/**
 * Récupération de la liste des groupes
 * @returns 
 */
export function getGroupes() {
  return fetch(`${SERVEUR}piecesEnBanque`)
    .then(rep => {
      if (!rep.ok) {
        throw new Error(`Response status: ${rep.status}`)
      }
      return rep.json()
    })
    .catch(error => {
      console.error(error.message)
    })
}
