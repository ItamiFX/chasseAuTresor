import { prendrePiece, chercherPiece, magicNumber, payerEspion, verifId, volerPiece, reloadPage} from "./fonctions.js"
import { afficherGroupes, afficherMessage, afficherTableau, afficherlisteJoueurs } from "./affichages.js"
const prendreP = document.getElementById("prendre")
const chercherP = document.getElementById("chercher")
const volerP = document.getElementById("voler")
const payerEsp = document.getElementById("espion")
const verification = document.getElementById("verif")
const recharger = document.getElementById("recharger")
const valider = document.getElementById("valider")

/**
 * Clique sur le bouton pour recharger les tableaux
 */
recharger.addEventListener("click", () => {
  reloadPage()
})

/**
 * Clique sur le bouton pour entrer un magic number
 */
valider.addEventListener("click", function(event){
  event.preventDefault()
  const uid = document.getElementById("uid").value
  const magic = document.getElementById("magicnumbers").value
  if(magic.trim() !== "" && uid.trim() !== ""){
    magicNumber(uid,magic)
  }else{
    afficherMessage("Veuillez completer les cases uid, magicNumber","error")
  }
})

/**
 * Clique sur le bouton pour vérifier l'uid saisie 
 */
verification.addEventListener("click", async function(event) {
  const uid = document.getElementById("uid").value
  event.preventDefault()
  verifId(uid);
})

/**
 * Clique sur le bouton pour chercher une piece
 */
chercherP.addEventListener("click", function(event){
  event.preventDefault()
  const uid = document.getElementById("uid").value
  const ligne = document.getElementById("ligne").value
  const colonne = document.getElementById("colonne").value
  console.log("Cherche Piece")
  if(ligne.trim() !== "" && uid.trim() !== "" && colonne.trim() !== ""){
    chercherPiece(uid,ligne,colonne)
  }else{
    afficherMessage("Veuillez completer les cases uid, ligne et colonne ","error")
  } 
})

/**
 * Clique sur le bouton pour prendre une piece
 */
prendreP.addEventListener("click", function(event){
  event.preventDefault()
  const uid = document.getElementById("uid").value
  const ligne = document.getElementById("ligne").value
  const colonne = document.getElementById("colonne").value
  console.log("Prendre Piece")
  if(ligne.trim() !== "" && uid.trim() !== "" && colonne.trim() !== ""){
    prendrePiece(uid,ligne,colonne)
    reloadPage()
  }else{
    afficherMessage("Veuillez completer les cases uid, ligne et colonne ","error")
  } 
})

/**
 * Clique sur le bouton pour voler une piece
 */
volerP.addEventListener("click", function(event) {
  event.preventDefault()
  const uid = document.getElementById("uid").value
  const ligne = document.getElementById("ligne").value
  const colonne = document.getElementById("colonne").value
  console.log("Voler Piece")
  if(ligne.trim() !== "" && uid.trim() !== "" && colonne.trim() !== ""){
    volerPiece(uid,ligne,colonne)
    reloadPage()
  }else{
    afficherMessage("Veuillez completer les cases uid, ligne et colonne ","error")
  } 
})

/**
 * Clique sur le bouton pour payer un espion
 */
payerEsp.addEventListener("click",function(event){
  event.preventDefault()
  const uid = document.getElementById("uid").value
  console.log("Payer espion")
  if(uid.trim() !== ""){
    payerEspion(uid)
  }else{
    afficherMessage("Veuillez completer la case uid,","error")
  } 
})

afficherlisteJoueurs()
afficherGroupes() 
afficherTableau()

// Refresh la page toutes les 5 secondes
setInterval(() => {
  reloadPage()
  console.log("Tableaux mis à jour")
}, 5000);
