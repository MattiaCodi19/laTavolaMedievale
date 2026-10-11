const alimenti = [
  // --- ALIMENTI PER RICCHI (10) ---
  { 
    nome: "Carne arrosto", 
    tipo: "ricchi", 
    descrizione: "La selvaggina e le carni erano simboli di prestigio nei banchetti nobiliari." 
  },
  { 
    nome: "Pane bianco", 
    tipo: "ricchi", 
    descrizione: "La farina più raffinata era generalmente più costosa e associata alle tavole agiate." 
  },
  { 
    nome: "Spezie", 
    tipo: "ricchi", 
    descrizione: "Spezie come pepe e cannella erano beni preziosi, accessibili soprattutto ai più ricchi." 
  },
  { 
    nome: "Pesce", 
    tipo: "ricchi", 
    descrizione: "Il pesce fresco era un cibo d élite poiché la pesca in acque interne era un diritto esclusivo dei signori." 
  },
  { 
    nome: "Zucchero", 
    tipo: "ricchi", 
    descrizione: "Lo zucchero era riconosciuto come una spezia da nobili, era un lusso estremo usato per ostentare ricchezza, e per questo estremamente raro nel Medioevo." 
  },
  { 
    nome: "Vino pregiato", 
    tipo: "ricchi", 
    descrizione: "I vini speziati, dolci o importati da terre lontane erano riservati ai banchetti dell'aristocrazia." 
  },
  { 
    nome: "Pavone e cigno", 
    tipo: "ricchi", 
    descrizione: "Volatili spettacolari serviti rivestiti delle loro stesse piume a puro scopo scenografico e di prestigio." 
  },
  { 
    nome: "Mandorle", 
    tipo: "ricchi", 
    descrizione: "Molto costose, venivano usate per creare il latte di mandorla, base per salse raffinate nei giorni di magro." 
  },
  { 
    nome: "Storione e caviale", 
    tipo: "ricchi", 
    descrizione: "Pesci d'acqua dolce di grandi dimensioni considerati proprietà esclusiva del sovrano o dei signori locali." 
  },
  { 
    nome: "Frutta candita", 
    tipo: "ricchi", 
    descrizione: "Dolcetti elaborati ottenuti con miele o zucchero costoso, serviti alla fine dei sontuosi pasti nobiliari." 
  },

  // --- ALIMENTI PER POVERI (10) ---
  { 
    nome: "Lenticchie", 
    tipo: "poveri", 
    descrizione: "Erano adatte a preparare zuppe sostanziose e nutrienti." 
  },
  { 
    nome: "Pane scuro", 
    tipo: "poveri", 
    descrizione: "I pani di farine meno raffinate erano comuni nell alimentazione quotidiana." 
  },
  { 
    nome: "Fave e piselli", 
    tipo: "poveri", 
    descrizione: "I legumi contribuivano a nutrire le famiglie e potevano essere conservati secchi." 
  },
  { 
    nome: "Ceci", 
    tipo: "poveri", 
    descrizione: "I ceci erano considerati per poveri perché facili da coltivare, economici e ideali per sostituire la carne nei giorni di digiuno religioso per chi non poteva permettersi il pesce." 
  },
  { 
    nome: "Zuppa di cavolo", 
    tipo: "poveri", 
    descrizione: "L'alimento base dei contadini, preparato bollendo le verdure dell'orto con un pizzico di sale." 
  },
  { 
    nome: "Aringhe salate", 
    tipo: "poveri", 
    descrizione: "Pesce economico e a lunga conservazione, fondamentale per il sostentamento del popolo nei periodi di magro." 
  },
  { 
    nome: "Puls o Polenta d'orzo", 
    tipo: "poveri", 
    descrizione: "Una densa pappa di cereali inferiori che riempiva lo stomaco a basso costo prima della diffusione del mais." 
  },
  { 
    nome: "Cipolle e aglio", 
    tipo: "poveri", 
    descrizione: "Ortaggi di facile coltivazione usati in abbondanza per dare sapore ai piatti poveri di carne." 
  },
  { 
    nome: "Sidro o Birra leggera", 
    tipo: "poveri", 
    descrizione: "Bevande fermentate prodotte in casa, spesso più sicure dell'acqua da bere e accessibili a chiunque." 
  },
  { 
    nome: "Siero di latte", 
    tipo: "poveri", 
    descrizione: "Lo scarto della produzione del formaggio dei signori, consumato dai contadini come fonte liquida di nutrimento." 
  }
];
const contenitore = document.getElementById("alimenti");
const ricerca = document.getElementById("ricerca");
const filtri = document.querySelectorAll(".filtro");

let tipoScelto = "tutti";

// Mostra gli alimenti in base al filtro e alla ricerca.
function mostraAlimenti() {
    contenitore.innerHTML = "";

    const parola = ricerca.value.toLowerCase();
    let trovati = 0;

    alimenti.forEach(function(alimento) {
        const corrispondeTipo =
            tipoScelto === "tutti" || alimento.tipo === tipoScelto;

        const corrispondeTesto =
            alimento.nome.toLowerCase().includes(parola) ||
            alimento.descrizione.toLowerCase().includes(parola);

        if (corrispondeTipo && corrispondeTesto) {
            const scheda = document.createElement("article");
            scheda.className = "alimento";

            const titolo = document.createElement("h3");
            titolo.textContent = alimento.nome;

            const testo = document.createElement("p");
            testo.textContent = alimento.descrizione;

            scheda.append(titolo, testo);
            contenitore.appendChild(scheda);

            trovati++;
        }
    });

    if (trovati === 0) {
        contenitore.textContent = "Nessun alimento trovato.";
    }
}

// Cambia categoria cliccando sui pulsanti.
filtri.forEach(function(pulsante) {
    pulsante.addEventListener("click", function() {
        tipoScelto = pulsante.dataset.tipo;

        filtri.forEach(function(filtro) {
            filtro.classList.remove("attivo");
        });

        pulsante.classList.add("attivo");
        mostraAlimenti();
    });
});

// Ricerca mentre si scrive.
ricerca.addEventListener("input", mostraAlimenti);

// Controlla gli ingredienti della ricetta moderna.
document.getElementById("prepara").addEventListener("click", function() {
    const scelti = document.querySelectorAll(".ingrediente:checked");
    const risultato = document.getElementById("risultato");

    if (scelti.length === 0) {
        risultato.textContent = "Scegli almeno un ingrediente!";
        return;
    }

    const nomi = [];

    scelti.forEach(function(ingrediente) {
        nomi.push(ingrediente.value);
    });

    if (nomi.includes("Ceci")) {
        risultato.textContent = "Hai scelto: " + nomi.join(", ") +
            ". Ottimo! I ceci sono la base della crema.";
    } else {
        risultato.textContent = "Hai scelto: " + nomi.join(", ") +
            ". Aggiungi i ceci per preparare la crema!";
    }
});

// Salva gli appunti nel browser, se disponibile.
const campoAppunti = document.getElementById("appunti");
const messaggio = document.getElementById("messaggio");

try {
    campoAppunti.value = localStorage.getItem("appuntiMedievali") || "";
} catch (errore) {
    messaggio.textContent = "Il salvataggio automatico non è disponibile.";
}

document.getElementById("salva").addEventListener("click", function() {
    try {
        localStorage.setItem("appuntiMedievali", campoAppunti.value);
        messaggio.textContent = "Appunti salvati nel browser!";
    } catch (errore) {
        messaggio.textContent = "Impossibile salvare gli appunti su questo dispositivo.";
    }
});

// Carica subito le schede.
mostraAlimenti();
