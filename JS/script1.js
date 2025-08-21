// Laden der verschiedenen Zeitsträhle (momentan natürlich nur einer)
// import { events, periods } from './timeline-data-russlanddeutsche.js'; // Wenn auf einem Webserver

function getDatasetFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("dataset") || "russlanddeutsche"; // Fallback, falls keiner gesetzt
}

function loadTimelineData(datasetName, callback) {
  const script = document.createElement("script");
  script.src = `../JS/timeline-data-${datasetName}.js`;
  script.onload = () => callback(window.timelineData);
  script.onerror = () => alert(`Daten für '${datasetName}' konnten nicht geladen werden.`);
  document.head.appendChild(script);
}

loadTimelineData(getDatasetFromURL(), (data) => {
  window.timelineData = data;
  window.events = data.events;
  window.periods = data.periods;

  const currentDataset = getDatasetFromURL(); // Dataset ermitteln
  
  // Menüeintrag für aktuellen Zeitstrahl ausblenden
  document.querySelectorAll('#menuContent a[href*="dataset="]').forEach(link => {
    const linkDataset = new URL(link.href).searchParams.get("dataset");
    if (linkDataset === currentDataset) {
      link.style.display = "none";
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => initTimeline());
  } else {
    initTimeline();
  }

});


// Längeneinheit festlegen (Anzahl der Pixel pro Jahr)
  const pixelsPerYear = 12; // kurzer Zeitstrahl bei Start

  let isZoomedIn = false; // dynamischer Zustand 

  let lastPeriodYOffset = null; // für das Zurückscrollen beim Zoom-Out

  function getEffectivePPY() {
    return isZoomedIn ? pixelsPerYear * 10 : pixelsPerYear;
  }

let activeEvent = null;
let activePeriod = null;
let activeSubEvents = []; // Für die Verwaltung von mehreren, wenn die Option angeschaltet ist


// let backgroundData = [];
// let backgroundImageElements = [];
// let activeBgIndex = 0;
// const PPY_EXTENDED = 120;


  
  // Globale Einstellungen
  let allowMultipleSubinfo = false;
  let backgroundImagesDisabled = false;


// Klick auf Zeitabschnitt
function onPeriodClick(periodData, barElement, yStart) {
  // Wenn derselbe Abschnitt erneut geklickt wird -> schließen
  if (activePeriod && activePeriod.data.name === periodData.name) {
    // setZoomLevel(false); // <- Zoom zurück
    closeAllInfo();
    return;
  }

  closeAllInfo();        // <- erst alles schließen
  isZoomedIn = true;     // <- dann Zoom aktivieren
  renderTimeline();      // <- und neu zeichnen
  renderBackgroundImages(); // Hintergrundbilder jetzt rendern

  // Offset nach dem Zoom berechnen
  const startOffset = (periodData.start - earliest) * getEffectivePPY() + 10;

  const infoBox = document.createElement("div");
  infoBox.className = "timeline-info-box";
  infoBox.style.top = (startOffset + 150) + "px";
  infoBox.innerHTML = `
    <div class="close-btn">✖</div>
    <div class="drag-handle"></div>
    <strong>${periodData.name}</strong>
    <p>${periodData.info}</p>
  `; //  /|\  Infobox Inhalte

  infoBox.querySelector(".close-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    closeAllInfo();
  });

  enableDrag(infoBox); // Drag-Funktion aktivieren


  document.body.appendChild(infoBox);

  activePeriod = { element: barElement, data: periodData, infoBox };

  window.scrollTo({
    top: startOffset - 100, // etwas oberhalb
    behavior: "instant"
  });

  // Neue y-Position der angeklickten Periode berechnen
  const newYOffset = ((periodData.start - earliest) * getEffectivePPY()) + 10;

  // Nach Zoom-In dorthin scrollen
  window.scrollTo({
    top: newYOffset - 80,
    behavior: "instant" // besser als "smooth"
  });

  // Speichern für späteres Zurückscrollen
  lastPeriodYOffset = newYOffset / getEffectivePPY(); // merke: relative Position in "Jahren"

  // Jetzt rote Punkte aktivieren
  periodData.subEvents.forEach(sub => {
    const yOffset = ((sub.year - earliest) * getEffectivePPY()) + ((sub.month - 1) * getEffectivePPY() / 12) + 10;
    const dot = document.createElement("div");
    dot.className = "sub-event-dot centered-on-timeline";
    dot.style.top = yOffset + "px";
    dot.title = sub.title;

    dot.addEventListener("click", () => onSubEventClick(sub, yOffset + infoBox.offsetHeight + 8));

    document.getElementById("timeline-events").appendChild(dot);
    sub._element = dot;
  });
}



// Klick auf roten Punkt
function onSubEventClick(subEvent, yTop) { // Aufgrund der zehnfachen Länge des Zeitstrahls, wie es ursprünglich gedacht war, ist es vielleicht nicht mehr nötig die Untergeschehnissinfokästen auf einen zu begrenzen. - Werde vielleicht einen Toggle erstellen?
  // Klicken auf denselben -> schließen
 // Prüfen, ob bereits eine Box für dieses SubEvent existiert
  const existing = activeSubEvents.find(e => e.data === subEvent);
  if (existing) {
    existing.infoBox.remove();
    activeSubEvents = activeSubEvents.filter(e => e.data !== subEvent);
    return;
  }

  if (!allowMultipleSubinfo) {
    activeSubEvents.forEach(e => e.infoBox.remove());
    activeSubEvents = [];
  }

  const infoBox = document.createElement("div");
  infoBox.className = "timeline-info-box sub-info-box";
  infoBox.style.top = yTop + "px";
  infoBox.innerHTML = `
    <div class="close-btn">✖</div>
    <div class="drag-handle"></div>
    <strong>${subEvent.date}: ${subEvent.title}</strong>
    <p>${subEvent.text}</p>
  `;

  infoBox.querySelector(".close-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    infoBox.remove();
    activeSubEvents = activeSubEvents.filter(e => e.data !== subEvent);
  });

  enableDrag(infoBox); // Drag-Funktion aktivieren

  document.body.appendChild(infoBox);
  activeSubEvents.push({ data: subEvent, infoBox });
}



// Schließen aller offenen Infoboxen (Ein Fehler, der vermutlich niemanden außer mich stören wird: Wenn ein Hauptereigniss geöffnet wird und dann der Zeitstrahl vergrößert wird, schließt man durch das Wegklicken immer noch alle Infoboxen, ABER wenn man nun NUR den Zeitstrahl vergrößert öffnet sich ZUSÄTZLICH noch die Infobox des selben Hauptereignisses...Vincent, wenn du das hier ließt...tue bitte nicht so, als wäre dir der Fehler aufgefallen, denn dann kann ich nicht mehr schlafen)
function closeAllInfo() {
  if (activePeriod) {
    activePeriod.infoBox.remove();
    if (activePeriod.data.subEvents) {
      activePeriod.data.subEvents.forEach(sub => {
        if (sub._element) sub._element.remove();
      });
    }
    activePeriod = null;
  }

activeSubEvents.forEach(e => e.infoBox.remove());
activeSubEvents = [];

    isZoomedIn = false;   // <- Zoom zurücksetzen
    renderTimeline();     // <- Timeline neu mit weniger Zoom
    renderBackgroundImages();

    if (lastPeriodYOffset !== null) {
      const yOffsetAfterZoomOut = lastPeriodYOffset * getEffectivePPY();
      window.scrollTo({
        top: yOffsetAfterZoomOut - 80,
        behavior: "instant"
      });
      lastPeriodYOffset = null;
    }
    
  }

// Klick außerhalb schließt alles
  document.addEventListener("click", (e) => {
    if (!e.target.closest('.timeline-period') &&
        !e.target.closest('.sub-event-dot') &&
        !e.target.closest('.timeline-info-box') &&
        !e.target.closest('.event') &&
        !e.target.closest('#searchInput') &&
        !e.target.closest('#searchResults') && 
        !e.target.closest('#clearSearch') && 
        !e.target.closest('#optionPanel') &&
        !e.target.closest('#optionenButton')

      ) {
      closeAllInfo();
    }
  });
  


document.addEventListener("DOMContentLoaded", () => {
  const burgerIcon = document.getElementById("burgerIcon");
  const menuContent = document.getElementById("menuContent");
  const titleElement = document.getElementById("bannerTitle");

  if (window.timelineData?.timelineTitle && titleElement) {
    titleElement.textContent = window.timelineData.timelineTitle;
  }

  document.getElementById("toggleUnlimitedSubinfos").addEventListener("change", (e) => {
    allowMultipleSubinfo = e.target.checked;
  });

  document.getElementById("toggleBackgroundImages").addEventListener("change", (e) => {
    backgroundImagesDisabled = e.target.checked;
    renderBackgroundImages();
  });


  // Menü öffnen/schließen per Klick
  burgerIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    burgerIcon.classList.toggle("open");
    menuContent.style.display = burgerIcon.classList.contains("open") ? "block" : "none";
  });

    // Menü schließen beim Klick außerhalb
    document.addEventListener("click", (e) => {
      if (
        !burgerIcon.contains(e.target) && 
        !menuContent.contains(e.target) &&
        !e.target.closest("#optionPanel") &&
        !e.target.closest("#optionenButton")
      ) {
      burgerIcon.classList.remove("open");
      menuContent.style.display = "none";
      }
    });

  // Bei Bildschirmveränderung den Zeitstrahl neu zeichnen
  window.addEventListener("resize", () => {
    renderTimeline();
    renderBackgroundImages();

  });

  const optionenButton = document.getElementById("optionenButton");
  const optionPanel = document.getElementById("optionPanel");

  optionenButton.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isVisible = optionPanel.style.display === "block";
    optionPanel.style.display = isVisible ? "none" : "block";
  });

  // Schließen beim Klicken außerhalb
  document.addEventListener("click", (e) => {
    if (
      !e.target.closest("#optionPanel") && 
      !e.target.closest("#optionenButton")
    ) {
      optionPanel.style.display = "none";
    }
  });

});



// Suchleistefunktionen für den Zeitstrahl
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const clearSearch = document.getElementById("clearSearch");

const hideDuringSearch = () => {
  document.querySelectorAll('.menu-content a, .menu-section-title, .menu-divider')
    .forEach(el => el.style.display = "none");
};

const showAllMenuItems = () => {
  document.querySelectorAll('.menu-content a, .menu-section-title, .menu-divider')
    .forEach(el => el.style.display = "");
};

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  
  // Abbruch bei zu kurzer Eingabe; Verhindert zu viele Treffer bei erster Eingabe, wie "g"
  if (query.length < 2) {
    searchResults.innerHTML = "";
    return;
  }

  searchResults.innerHTML = "";

  clearSearch.style.display = query.length > 0 ? "inline" : "none";

  if (query.length === 0) {
    showAllMenuItems();
    return;
  }

  hideDuringSearch();

  const filtered = [];

  // Hauptereignisse durchsuchen
  (window.events || []).forEach(event => {
    if (
      event.title.toLowerCase().includes(query) ||
      String(event.year).includes(query) ||
      (event.keywords && event.keywords.some(k => k.toLowerCase().includes(query)))
    ) {
      filtered.push({ type: "event", data: event });
    }
  });

  // Zeitabschnitte durchsuchen
  (window.periods || []).forEach(period => {
    if (
      period.name.toLowerCase().includes(query) ||
      (period.keywords && period.keywords.some(k => k.toLowerCase().includes(query)))
    ) {
      filtered.push({ type: "period", data: period });
    }

    // Subereignisse durchsuchen
    (period.subEvents || []).forEach(sub => {
      if (
        sub.title.toLowerCase().includes(query) ||
        (sub.keywords && sub.keywords.some(k => k.toLowerCase().includes(query)))
      ) {
        filtered.push({ type: "subEvent", data: sub, period: period }); // vielleicht auch "filtered.push({ type: "sub", data: sub, parent: period });" - Habe es geändert (denke ich)
      }
    });
  });

  if (filtered.length === 0) {
    searchResults.innerHTML = "<div style='color:white;'>Keine Treffer gefunden</div>";
    return;
  }

  filtered.forEach(result => {
    const resultItem = document.createElement("div");
    resultItem.className = "search-result";
    resultItem.style.cursor = "pointer";

  if (result.type === "event") {
    resultItem.textContent = `${result.data.year}: ${result.data.title}`;
    resultItem.addEventListener("click", () => {
      const event = result.data;
      const yOffset = (event.year - window.earliest) * getEffectivePPY() + 10;

      setTimeout(() => {
        const eventElements = document.querySelectorAll(".event");
        for (const el of eventElements) {
          const text = el.textContent.replace(/\s+/g, " ").trim();
          if (text.startsWith(`${event.year}: ${event.title}`)) {
            const detail = el.querySelector(".event-details");
            if (detail) detail.classList.add("active");
            el.classList.add("highlight");

            window.scrollTo({ top: yOffset - 100, behavior: "instant" });

            setTimeout(() => el.classList.remove("highlight"), 2000);
            break;
          }
        }
      }, 50);
    });
  }


  if (result.type === "period") {
    resultItem.textContent = `⏳ ${result.data.name}`;
    resultItem.addEventListener("click", () => {
      const targetPeriod = result.data;

      // Zoom aktivieren und rendern
      if (!isZoomedIn) {
        isZoomedIn = true;
        renderTimeline();
        renderBackgroundImages();
      }

      // Nach Zoom + render -> Period öffnen und scrollen
      setTimeout(() => {
        const yOffset = (targetPeriod.start - window.earliest) * getEffectivePPY() + 10;

        onPeriodClick(targetPeriod, targetPeriod._element || null, yOffset);

        setTimeout(() => {
          window.scrollTo({ top: yOffset - 100, behavior: "instant" });

          // Markieren der Infobox
          if (activePeriod?.infoBox) {
            activePeriod.infoBox.classList.add("highlight");
            setTimeout(() => activePeriod.infoBox.classList.remove("highlight"), 2000);
          }
        }, 50);
      }, 50);
    });
  }


  if (result.type === "subEvent") {
    resultItem.textContent = `🔴 ${result.data.title}`;
    resultItem.addEventListener("click", () => {
      const subOffset = ((result.data.year - window.earliest) * getEffectivePPY()) +
                        ((result.data.month - 1) * getEffectivePPY() / 12) + 10;

      // Zoom aktivieren und neu zeichnen
      if (!isZoomedIn) {
        isZoomedIn = true;
        renderTimeline();
        renderBackgroundImages();

      }

      setTimeout(() => {
        onSubEventClick(result.data, subOffset + 80);
        window.scrollTo({ top: subOffset - 100, behavior: "instant" });

        // Markieren der Subevent-Infobox
        setTimeout(() => {
          if (activeSubEvent?.infoBox) {
            activeSubEvent.infoBox.classList.add("highlight");
            setTimeout(() => activeSubEvent.infoBox.classList.remove("highlight"), 2000);
          }
        }, 50);
      }, 150);
    });
  }


  searchResults.appendChild(resultItem);
});


  // window.addEventListener("load", adjustTimelineOffset);
  // window.addEventListener("resize", adjustTimelineOffset);

  // function adjustTimelineOffset() {
    // const banner = document.querySelector(".banner");
    // const timelineContainer = document.getElementById("timeline-container");
    // if (banner && timelineContainer) {
      // const height = banner.offsetHeight;
      // timelineContainer.style.marginTop = height + 20 + "px"; // 20px Extra-Puffer, falls ws Probleme mit dem Banner gibt
    // }
  // }

});

clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  clearSearch.style.display = "none";
  searchResults.innerHTML = "";
  showAllMenuItems();

  // Aktuellen Zeitstrahl-Link erneut verstecken, wenn das gesuchte aus der Suchleiste gelöscht wird
  const params = new URLSearchParams(window.location.search);
  const currentDataset = params.get("dataset");
  document.querySelectorAll('#menuContent a[href*="dataset="]').forEach(link => {
    const linkDataset = new URL(link.href).searchParams.get("dataset");
    if (linkDataset === currentDataset) {
      link.style.display = "none";
    }
  });
});

// function renderTimeline() {
function renderTimeline(events = window.events, periods = window.periods) {
  const eventContainer = document.getElementById("timeline-events");
  const labelContainer = document.getElementById("year-labels");
  const timelineContainer = document.getElementById("timeline-container");
  const timelineLine = document.getElementById("timeline-line");

  // Container leeren
  eventContainer.innerHTML = "";
  labelContainer.innerHTML = "";

  // Zeitstrahlhöhe setzen
  document.getElementById("timeline-line").style.height =
    (window.latest - window.earliest + 2) * getEffectivePPY() + 20 + "px";

  // Linie-Position in Pixeln (zentriert)
  const lineLeft = timelineLine.offsetLeft + timelineLine.offsetWidth / 2;

  // Entferne alte Pfeile, wenn vorhanden (ansonsten liegt ein nach unten zeigender Pfeil mitten auf dem Zeitstrahl nach dem vergrößern)
  document.querySelectorAll(".timeline-arrow").forEach(el => el.remove());

  // Pfeilspitze oben
  const topArrow = document.createElement("div");
  topArrow.className = "timeline-arrow timeline-arrow-top";
  topArrow.textContent = "▲";
  topArrow.style.left = (lineLeft) + "px";
  timelineContainer.appendChild(topArrow);

  // Pfeilspitze unten
  const bottomArrow = document.createElement("div");
  bottomArrow.className = "timeline-arrow timeline-arrow-bottom";
  bottomArrow.textContent = "▼";
  bottomArrow.style.left = (lineLeft) + "px";
  bottomArrow.style.top = timelineLine.offsetHeight - 6 + "px"; // Genau auf den Pixel~
  timelineContainer.appendChild(bottomArrow);


  // Jahrzehntmarken (inkl. starker Linien für 50er)
  const markContainer = document.getElementById("decade-marks") || (() => {
    const div = document.createElement("div");
    div.id = "decade-marks";
    div.style.position = "absolute";
    div.style.top = "0";
    div.style.left = "0";
    div.style.width = "100%";
    timelineContainer.appendChild(div);
    return div;
  })();
  markContainer.innerHTML = "";

  const firstDecade = Math.ceil(earliest / 10) * 10;
  const lastDecade = Math.floor(latest / 10) * 10;

  for (let y = firstDecade; y <= lastDecade; y += 10) {
    const yOffset = (y - earliest) * getEffectivePPY() + 10;
    const line = document.createElement("div");
    line.className = "timeline-mark-line " + (y % 50 === 0 ? "timeline-year" : "timeline-decade");
    line.style.top = yOffset + "px";
    line.style.left = lineLeft + "px";
    markContainer.appendChild(line);
  }

  // Jahrmarkierungen (Zahlen neben dem Strahl, alle 50 Jahre)
  const firstMarker = Math.ceil(earliest / 50) * 50;
  const lastMarker = Math.floor(latest / 50) * 50;
  for (let y = firstMarker; y <= lastMarker; y += 50) {
    const yOffset = (y - earliest) * getEffectivePPY() + 10;
    const label = document.createElement("div");
    label.className = "year-marker";
    label.style.position = "absolute";
    label.style.top = (yOffset - 8) + "px";
    label.style.left = (lineLeft - 16) + "px"; // 16px Abstand links vom Strich
    label.style.textAlign = "right";
    label.style.transform = "translateX(-100%)";
    label.textContent = y;
    labelContainer.appendChild(label);
  }

  // Events platzieren
  events.forEach(event => {
    const yOffset = (event.year - window.earliest) * getEffectivePPY() + 10;
    const el = document.createElement("div");
    el.className = "event";
    el.style.top = (yOffset - 5) + "px";
    el.style.position = "absolute";
    el.style.left = (lineLeft + 30) + "px"; // 30px rechts vom Zeitstrahl
    el.innerHTML = `
      <strong>${event.year}: ${event.title}</strong>
      <div class="event-details">${event.text || ''}</div>
    `; // Hauptereignistextdarstellung anpassen

    eventContainer.appendChild(el);
    
    if (activeEvent && activeEvent.title === event.title && activeEvent.year === event.year) {
      const detail = el.querySelector(".event-details");
      if (detail) detail.classList.add("active");
    }

  el.addEventListener("click", (e) => {
    e.stopPropagation(); // Verhindert, versehentliches Schließen
    const detail = el.querySelector(".event-details");

    if (detail) {
      const wasActive = detail.classList.contains("active");

      // Alle anderen schließen
      // document.querySelectorAll(".event-details.active").forEach(d => d.classList.remove("active")); // Würde zum (nach meinem Plan: ungewollten) Schließen von Hauptevents führen

      if (!wasActive) {
        detail.classList.add("active");
        activeEvent = event; // Speichern
      } else {
        activeEvent = null; // Schließen
      }
    }
  });



    // Rote Verbindungslinien zum Zeitstrahl; immer noch kein Fan
    const line = document.createElement("div");
    line.className = "event-connector-line";
    line.style.top = (yOffset) + "px"; // leichte optische Korrektur
    line.style.left = lineLeft + "px";
    line.style.width = "30px"; // Länge (Breite) muss gleich der Entfernung des Events vom Zeitstrahl sein (Könnte es aber auch in eine tiefere Ebene setzen und länger machen, aber dann könnte ich mich auch schon direkt damit befassen, die Linien zu allen Infoboxen zu ihrem Punkt auf dem Zeitstrahl zu machen und das...sähe vermutlich schlecht aus)
    eventContainer.appendChild(line);

  });

  // Zeitabschnitte platzieren
  periods.forEach(period => {
    const startOffset = (period.start - earliest) * getEffectivePPY() + 10;
    const endOffset = ((period.end + 1) - earliest) * getEffectivePPY() + 10;
    const height = endOffset - startOffset;

    const bar = document.createElement("div");
    bar.className = "timeline-period centered-on-timeline";
    bar.style.top = startOffset + "px";
    bar.style.height = height + "px";
    bar.title = period.name;

    bar.addEventListener("click", (e) => {
      e.stopPropagation();
      onPeriodClick(period, bar, startOffset);
    });

    period._element = bar;

    eventContainer.appendChild(bar);
  });

  // Falls eine Periode aktiv ist, werden die roten Punkte neu gezeichnet, selbst wenn die Bildschirmbreite verändert wird
  if (activePeriod) {
    activePeriod.data.subEvents.forEach(sub => {
      const yOffset = ((sub.year - earliest) * getEffectivePPY()) + ((sub.month - 1) * getEffectivePPY() / 12) + 10;

      const dot = document.createElement("div");
      dot.className = "sub-event-dot";
      dot.style.top = yOffset + "px";
      dot.style.left = (lineLeft - 5) + "px";
      dot.title = sub.title;

      dot.addEventListener("click", () => 
        onSubEventClick(sub, yOffset + activePeriod.infoBox.offsetHeight + 8)
      );

      document.getElementById("timeline-events").appendChild(dot);
      
      sub._element = dot;
    });
  }

  renderBackgroundImages();

}


// ===================== Hintergrundbilder =====================
let backgroundImages = [];
let activeBgIndex = 0;
let bgContainer;
let pointerEl;

function initBackgroundImages() {
  if (!window.timelineData?.backgroundImages) return;

  // Vorherige löschen
  document.getElementById("background-container")?.remove();

  bgContainer = document.createElement("div");
  bgContainer.id = "background-container";
  bgContainer.style.position = "fixed";
  bgContainer.style.top = "0";
  bgContainer.style.left = "0";
  bgContainer.style.width = "100%";
  bgContainer.style.height = "100%";
  bgContainer.style.zIndex = "-1";
  document.body.appendChild(bgContainer);

  const viewportWidth = window.innerWidth;
  const bannerHeight = document.querySelector(".banner")?.offsetHeight || 0;
  let currentTop = bannerHeight;

  backgroundImages = window.timelineData.backgroundImages.map((img) => {
    const scaledHeight = viewportWidth / img.width * img.height;

    const el = document.createElement("img");
    el.src = img.src;
    el.alt = img.alt;
    el.className = "bg-image";
    el.style.position = "absolute";
    el.style.width = "100%";
    el.style.top = currentTop + "px";

    bgContainer.appendChild(el);

    const obj = {
      ...img,
      scaledHeight,
      element: el,
      top: currentTop
    };

    currentTop += scaledHeight;
    return obj;
  });

  // Pointer hinzufügen, falls nicht vorhanden
  if (!pointerEl) {
    pointerEl = document.createElement("div");
    pointerEl.id = "timeline-pointer";
    pointerEl.style.position = "fixed";
    pointerEl.style.top = "50%";
    pointerEl.style.left = "12%";
    pointerEl.style.width = "10px";
    pointerEl.style.height = "2px";
    pointerEl.style.background = "red";
    pointerEl.style.zIndex = "1000";
    document.body.appendChild(pointerEl);
  }
}

function updateBackgroundOnScroll() {
  if (!isZoomedIn || backgroundImagesDisabled || !backgroundImages.length) return;

  const pointerY = window.scrollY + window.innerHeight / 2;
  const pointerYear = earliest + (pointerY - 10) / getEffectivePPY();

  // Aktives Bild bestimmen
  for (let i = 0; i < backgroundImages.length; i++) {
    const nextYear = backgroundImages[i + 1]?.startYear ?? (latest + 1);
    if (pointerYear >= backgroundImages[i].startYear && pointerYear < nextYear) {
      activeBgIndex = i;
      break;
    }
  }

  const currentImage = backgroundImages[activeBgIndex];
  const nextImage = backgroundImages[activeBgIndex + 1];
  const sectionEndYear = nextImage ? nextImage.startYear : latest + 1;

  const sectionYears = sectionEndYear - currentImage.startYear;
  const sectionPx = sectionYears * getEffectivePPY();
  const hbsVelocity = currentImage.scaledHeight / sectionPx;

  const scrolledInSection = (pointerYear - currentImage.startYear) * getEffectivePPY();
  const shift = -scrolledInSection * hbsVelocity;

  const bannerHeight = document.querySelector(".banner")?.offsetHeight || 0;
  let currentTop = bannerHeight + shift;

  backgroundImages.forEach((img) => {
    img.element.style.top = currentTop + "px";
    currentTop += img.scaledHeight;
  });
}

function renderBackgroundImages() {
  if (isZoomedIn && !backgroundImagesDisabled) {
    initBackgroundImages();
    updateBackgroundOnScroll();
  } else {
    document.getElementById("background-container")?.remove();
    pointerEl?.remove();
    pointerEl = null;
  }
}

window.addEventListener("scroll", updateBackgroundOnScroll);
window.addEventListener("resize", () => {
  if (isZoomedIn && !backgroundImagesDisabled) {
    initBackgroundImages();
    updateBackgroundOnScroll();
  }
});

// =========================


// Damit das Banner bei keiner Bildschirmbreite Teile des Zeitstrahls bedeckt
function adjustTimelineTop() {
  const banner = document.querySelector(".banner");
  const timeline = document.getElementById("timeline-container");
  if (banner && timeline) {
    const bannerHeight = banner.offsetHeight;
    timeline.style.marginTop = bannerHeight + 20 + "px"; // 20px Puffer; könnte schwören ich habe das hier schon einmal geschrieben
  }
}

document.addEventListener("click", (e) => {
  // Wenn außerhalb dieser Außnahmen geklickt wird, wird ein Event geschlossen
  if (!e.target.closest('.timeline-period') &&
      !e.target.closest('.sub-event-dot') &&
      !e.target.closest('.timeline-info-box') &&
      !e.target.closest('.event') &&
      !e.target.closest('#searchInput') &&
      !e.target.closest('#searchResults') && 
      !e.target.closest('#clearSearch') &&
      !e.target.closest(".close-btn") && 
      !e.target.closest(".drag-handle") && 
      !e.target.closest('#optionPanel') &&
      !e.target.closest('#optionenButton')

    ) {
    document.querySelectorAll(".event-details.active").forEach(el => {
      el.classList.remove("active");
    });
  }
});

window.addEventListener("load", adjustTimelineTop);
window.addEventListener("resize", adjustTimelineTop);

function initTimeline() {
  const params = new URLSearchParams(window.location.search);
  const dataset = params.get("dataset") || "russlanddeutsche";

  const script = document.createElement("script");
  script.src = `../JS/timeline-data-${dataset}.js`;
  script.onload = () => {
    if (!window.timelineData) {
      console.error("Fehler: timelineData nicht geladen.");
      return;
    }

    // Daten setzen
    window.events = window.timelineData.events || [];
    window.periods = window.timelineData.periods || [];
    window.earliest = Math.min(...window.events.map(e => e.year), ...window.periods.map(p => p.start));
    window.latest = Math.max(...window.events.map(e => e.year), ...window.periods.map(p => p.end));


    // Titel aktualisieren
    const titleElement = document.querySelector(".banner-title");
    if (titleElement && window.timelineData.timelineTitle) {
      titleElement.textContent = window.timelineData.timelineTitle;
    }

    renderTimeline();
    renderBackgroundImages();



//       window.renderBackgroundImages = function() {
//       const container = document.getElementById("background-image-container");
//       container.innerHTML = "";
//       backgroundData = [];
//       backgroundImageElements = [];

//       if (!isZoomedIn || backgroundImagesDisabled || !window.timelineData.backgroundImages) return;

//       const VPB = window.innerWidth;
//       const images = [...window.timelineData.backgroundImages].sort((a, b) => a.startYear - b.startYear);
//       const endYear = window.latest;

//       images.forEach((img, i) => {
//         const nextYear = images[i + 1] ? images[i + 1].startYear : endYear + 1;
//         const ZA = nextYear - img.startYear;
//         const ZAL = ZA * PPY_EXTENDED;

//         const BBS = VPB;
//         const BHS = VPB / img.width * img.height;
//         const HBSV = BHS / ZAL;

//         backgroundData.push({
//           ...img,
//           index: i,
//           ZA,
//           ZAL,
//           BBS,
//           BHS,
//           HBSV,
//           startY: img.startYear
//         });

//         const el = document.createElement("img");
//         el.src = img.src;
//         el.alt = img.alt || "";
//         el.className = "bg-image";
//         el.style.height = `${BHS}px`;
//         el.style.width = `${BBS}px`;
//         el.style.top = "0px";

//         container.appendChild(el);
//         backgroundImageElements.push(el);
//       });
//     }

//     function updateBackgroundScroll() {
//       if (!isZoomedIn || backgroundImagesDisabled || backgroundData.length === 0) return;

//       const scrollY = window.scrollY;
//       const pointerYear = window.earliest + scrollY / PPY_EXTENDED;

      // Aktives Bild bestimmen (basierend auf Startjahr)
//       for (let i = backgroundData.length - 1; i >= 0; i--) {
//         if (pointerYear >= backgroundData[i].startY) {
//           activeBgIndex = i;
//           break;
//         }
//       }

//       let totalOffset = 0;

//       for (let i = 0; i < backgroundData.length; i++) {
//         let offset = 0;

//         if (i < activeBgIndex) {
          // Vollständig vorbei → komplette Höhe verschoben
//           offset = backgroundData[i].BHS;
//         } else if (i === activeBgIndex) {
          // Aktives Bild → Verschiebung abhängig vom Scroll in diesem Abschnitt
//           const sectionScroll = scrollY - (backgroundData[i].startY - window.earliest) * PPY_EXTENDED;
//           offset = backgroundData[i].HBSV * sectionScroll;
//         }

//         totalOffset += offset;

        // Setze Transform
//         backgroundImageElements[i].style.transform = `translateY(-${totalOffset}px)`;
//       }
//     }

//     window.addEventListener("scroll", updateBackgroundScroll);
//     window.addEventListener("resize", () => {
//       renderBackgroundImages();
//       updateBackgroundScroll();
//     });

  };

  document.head.appendChild(script);
}


// Drag-and-Drop-Funktion
function enableDrag(element) {
  const handle = element.querySelector(".drag-handle");
  if (!handle) return;

  let offsetX = 0;
  let offsetY = 0;
  let isDragging = false;

  handle.addEventListener("mousedown", (e) => {
    e.preventDefault();
    isDragging = true;
    const rect = element.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });

  function onMouseMove(e) {
    if (!isDragging) return;
    element.style.left = e.clientX - offsetX + "px";
    element.style.top = e.clientY - offsetY + "px";
    element.style.position = "fixed"; // damit die Position bleibt (wird nach dem wegklicken aber natürlich wieder die ursprünglicxhe Position haben)
  }

  function onMouseUp() {
    isDragging = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }
}



        // Interaktiver Zeitstrahl v16
        // Property of Joshua Ilse