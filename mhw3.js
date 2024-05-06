
document.addEventListener("DOMContentLoaded", function() {
  const primoevent = document.querySelector(".primoevent");
  const ricercaVisiva = document.querySelector("#ricercaVisiva");
  const salvainraccolte= document.querySelector("#salvainraccolte");
  const impostazioni= document.querySelector("#impostazioni");

  primoevent.addEventListener("mouseenter", function() {
    ricercaVisiva.style.display = "flex";
  });


  ricercaVisiva.addEventListener("mouseenter", function() {
    salvainraccolte.style.display = "flex";
    impostazioni.style.display  = "flex";
  });
  primoevent.addEventListener("mouseleave", function() {
    salvainraccolte.style.display = "none";
    impostazioni.style.display  = "none";
  });

  

  primoevent.addEventListener("mouseleave", function() {
    ricercaVisiva.style.display = "none";
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const primoevent2 = document.querySelectorAll("[data-index]");

  primoevent2.forEach((elemento) => {
    const index = elemento.dataset.index;

    const ricercaVisiva = document.querySelector("#ricercaVisiva" + index);
    const salvainraccolte = document.querySelector("#salvainraccolte" + index);
    const impostazioni = document.querySelector("#impostazioni" + index);

    elemento.addEventListener("mouseenter", function() {
      ricercaVisiva.style.display = "flex";
    });

    ricercaVisiva.addEventListener("mouseenter", function() {
      salvainraccolte.style.display = "flex";
      impostazioni.style.display = "flex";
      ricercaVisiva.style.display = "flex";
    });

    salvainraccolte.addEventListener("mouseenter", function() {
      salvainraccolte.style.display = "flex";
      impostazioni.style.display = "flex";
      ricercaVisiva.style.display = "flex";
    });
    impostazioni.addEventListener("mouseenter", function() {
      salvainraccolte.style.display = "flex";
      impostazioni.style.display = "flex";
      ricercaVisiva.style.display = "flex";
    });

    elemento.addEventListener("mouseleave", function() {
      salvainraccolte.style.display = "none";
      impostazioni.style.display = "none";
    });

    elemento.addEventListener("mouseleave", function() {
      ricercaVisiva.style.display = "none";
    });
  });
});

let isSmiling = false;

function Sorridi() {
  const image = document.querySelector(".immagine-ridotta5");
  const autore = document.querySelector('#bio .autore');

  if (!isSmiling) {
    image.src = 'result.gif';
    isSmiling = true;
    const new_autore = document.createElement('p');
    new_autore.textContent = 'Ora sta sorridendo!';
    autore.innerHTML = '';
    autore.appendChild(new_autore)
  } else {
    image.src = 'aranzulla2.png'; // Inserisci l'URL originale dell'immagine
    isSmiling = false;
    autore.removeChild(autore.lastChild);
    autore.innerHTML = 'AUTORE --> clicca la foto per farlo sorridere';
  }

  
}

document.addEventListener('DOMContentLoaded', function() {
  const image = document.querySelector(".immagine-ridotta5");
  image.addEventListener('click', Sorridi);
});


function onJson(json) {
  console.log('JSON ricevuto');
  // Svuota il contenuto del div API
  const apiDiv = document.querySelector('#api');
  apiDiv.innerHTML = '';

  // Processa ciascun articolo e inseriscilo nel div API
  for (let article of json.articles) {
      // Leggi le informazioni sull'articolo
      const title = article.title;
      const image = article.image;
      const url = article.url; // URL completo dell'articolo

      // Creiamo il link all'articolo completo
      const articleLink = document.createElement('a');
      articleLink.href = url;
      articleLink.target = '_blank'; // Apre il link in una nuova finestra/tab

      // Creiamo il div che conterrà immagine e didascalia
      const newsItem = document.createElement('div');
      newsItem.classList.add('news-item');

      // Creiamo l'immagine
      const img = document.createElement('img');
      img.src = image;

      // Creiamo la didascalia
      const caption = document.createElement('span');
      caption.textContent = title;

      // Aggiungiamo immagine e didascalia al div
      newsItem.appendChild(img);
      newsItem.appendChild(caption);

      // Aggiungiamo il div al link all'articolo completo
      articleLink.appendChild(newsItem);

      // Aggiungiamo il link all'articolo completo al div API
      apiDiv.appendChild(articleLink);
  }

  // Rendiamo visibile il div API
  apiDiv.style.display = 'block';
}


function onResponse(response) {
  console.log('Risposta ricevuta');
  return response.json();
}

function search(event) {
  // Impediamo il submit del form
  event.preventDefault();
  // Leggo il valore del campo di testo
  const topicInput = document.querySelector('#topicInput');
  const topicValue = encodeURIComponent(topicInput.value);
  console.log('Eseguo ricerca per argomento: ' + topicValue);
  // Prepara la richiesta
  const rest_url = 'https://gnews.io/api/v4/search?q=' + topicValue + '&token=' + api_key;
  console.log('URL: ' + rest_url);
  // Eseguo la fetch
  fetch(rest_url)
      .then(onResponse)
      .then(onJson)
      .catch(error => console.error('Errore durante la richiesta:', error));
}

// Aggiungi event listener al form
const form = document.querySelector('#searchForm');
form.addEventListener('submit', search);

const api_key = '47098e27938265c66f06140926079818';


function onJson2(json) {
  console.log('JSON ricevuto');
  console.log(json);
  // Svuotiamo la libreria
  const library = document.querySelector('#album-view');
  library.innerHTML = '';
  // Leggi il numero di risultati
  const results = json.albums.items;
  let num_results = results.length;
  // Mostriamone al massimo 10
  if(num_results > 10)
    num_results = 10;
  // Processa ciascun risultato
  for(let i=0; i<num_results; i++)
  {
    // Leggi il documento
    const album_data = results[i]
    // Leggiamo info
    const title = album_data.name;
    const selected_image = album_data.images[0].url;
    // Creiamo il div che conterrà immagine e didascalia
    const album = document.createElement('div');
    album.classList.add('album');
    // Creiamo l'immagine
    const img = document.createElement('img');
    img.src = selected_image;
    // Creiamo la didascalia
    const caption = document.createElement('span');
    caption.textContent = title;
    // Aggiungiamo immagine e didascalia al div
    album.appendChild(img);
    album.appendChild(caption);
    // Aggiungiamo il div alla libreria
    library.appendChild(album);
  }
}

function onResponse2(response) {
  console.log('Risposta ricevuta');
  return response.json();
}

function search2(event)
{
  // Impedisco il submit del form
  event.preventDefault();
  // Leggi valore del campo di testo
  const album_input = document.querySelector('#album');
  const album_value = encodeURIComponent(album_input.value);
  console.log('Eseguo ricerca: ' + album_value);
  // Esegui la richiesta
  fetch("https://api.spotify.com/v1/search?type=album&q=" + album_value,
    {
      headers:
      {
        'Authorization': 'Bearer ' + token
      }
    }
  ).then(onResponse2).then(onJson2);
}

function onTokenJson(json)
{
  console.log(json)
  // Imposta il token global
  token = json.access_token;
}

function onTokenResponse(response)
{
  return response.json();
}

// OAuth credentials --- NON SICURO!
const client_id = 'f2e7d97b1f78460884c3c2a1067b2e28';
const client_secret = 'a1fadc40a6a246fe8cb9828c8214e365';
// Dichiara variabile token
let token;
// All'apertura della pagina, richiediamo il token
fetch("https://accounts.spotify.com/api/token",
	{
   method: "post",
   body: 'grant_type=client_credentials',
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
   }
  }
).then(onTokenResponse).then(onTokenJson);
// Aggiungi event listener al form
const form2 = document.querySelector('#searchForm2');
form2.addEventListener('submit', search2)



