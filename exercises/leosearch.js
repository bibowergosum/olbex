
// Formular mit der ID suchform ansprechen und in Variable speichern
const suchform = document.getElementById("suchform");

const handleSubmit = (e) => {
  //Neuladen der Seite unterdrücken
  e.preventDefault();
  //Input mit der ID suchfeld ansprechen und in Variable speichern
  const suchfeld = document.getElementById("suchfeld");
  //Value des Inputs zur Kontrolle loggen
  console.log(suchfeld.value);
  //Url dynamisch mithilfe von template literals erstellen & speichern
  const url = `https://dict.leo.org/englisch-deutsch/${suchfeld.value}`;
  //Url zur Kontrolle loggen
  console.log(url);
  //Url in neuem Tab öffnen
  window.open(url, "_blank");
};

//Eventlistener an das Formular hängen, auf submit Event hören und handleSubmit aufrufen
suchform.addEventListener("submit", handleSubmit);
