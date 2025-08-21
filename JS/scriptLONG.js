// Laden der verschiedenen Zeitsträhle (momentan natürlich nur einer)
// import { events, periods } from './timeline-data-russlanddeutsche.js'; // Wenn auf einem Webserver

// const events = window.timelineData.events;
// const periods = window.timelineData.periods;

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

// loadTimelineData(getDatasetFromURL(), ({ events, periods }) => {
  // window.loadedEvents = events;
  // window.loadedPeriods = periods;
  // window.events = events;     // global verfügbar machen
  // window.periods = periods;   // ebenfalls global verfügbar machen

  // Initialisieren
  // renderTimeline();
// });

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
  
//   if (window.timelineImages) {
//     window.timelineImages.forEach(img => {
//       const preload = new Image();
//       preload.src = img.src;
//     });
//   }

});


// Längeneinheit festlegen (Anzahl der Pixel pro Jahr)
  const pixelsPerYear = 12; // kurzer Zeitstrahl bei Start
  // const pixelsPerYear = 120; // langer Zeitstrahl

  let isZoomedIn = false; // dynamischer Zustand 

  let lastPeriodYOffset = null; // für das Zurückscrollen beim Zoom-Out

  function getEffectivePPY() {
    return isZoomedIn ? pixelsPerYear * 10 : pixelsPerYear;
  }

  //  Umschaltfunktion definieren
//  function setZoomLevel(zoomIn) {
//    if (zoomIn === isZoomedIn) return;

//    isZoomedIn = zoomIn;
//   pixelsPerYear = zoomIn ? 120 : 12;

//    const rememberedPeriod = activePeriod?.data; // merken

//    closeAllInfo({ keepZoom: true }); // Schließt alles außer Zoom selbst

//    renderTimeline();

    // Nach Zoom: Zeitraum automatisch erneut öffnen
//    if (zoomIn && rememberedPeriod) {
//      const yStart = (rememberedPeriod.start - earliest) * pixelsPerYear + 10;
//      const bar = Array.from(document.querySelectorAll(".timeline-period"))
//        .find(el => el.title === rememberedPeriod.name);
//      if (bar) {
//        onPeriodClick(rememberedPeriod, bar, yStart);
//      }
//    }
//  }


  // Berechnungen zur Länge des Zeitstrahls
//  const earliest = Math.min(...events.map(e => e.year));
//  const latest = Math.max(...events.map(e => e.year));
//  const timelineLength = (latest - earliest + 2) * pixelsPerYear + 20;

// Gemeinsame Menüsteuerung
// document.addEventListener("DOMContentLoaded", () => {
//   const burgerIcon = document.getElementById("burgerIcon");
//   const menuContent = document.getElementById("menuContent");


//  document.getElementById("timeline-line").style.height = timelineLength + "px";


  // Menü öffnen/schließen per Klick
//  burgerIcon.addEventListener("click", (e) => {
//    e.stopPropagation();
//    burgerIcon.classList.toggle("open");
//    menuContent.style.display = burgerIcon.classList.contains("open") ? "block" : "none";
//  });

  // Menü schließen beim Klick außerhalb
  // document.addEventListener("click", (e) => {
  //   const burger = document.getElementById("burgerIcon");
  //   const menu = document.getElementById("menuContent");
  //   if (!burger.contains(e.target) && !menu.contains(e.target)) {
  //     burger.classList.remove("open");
  //     menu.style.display = "none";
  //   }
  // });


  // Für Zeitabschnitte
//  periods.forEach(period => {
//    const yStart = (period.start - earliest) * pixelsPerYear + 10;
//    const yEnd = (period.end - earliest + 1) * pixelsPerYear + 10; // +1 um auch das letzte Jahr vollständig einzubinden, da ansonsten Subpunkte der Geschehnisse, die im letzten Jahr stattfinden, immer außerhalb liegen würden.

//    const bar = document.createElement("div");
//    bar.className = "timeline-period centered-on-timeline";
//    bar.style.top = yStart + "px";
//    bar.style.height = (yEnd - yStart) + "px";
//    bar.title = period.name;

//    bar.addEventListener("click", (e) => {
//      e.stopPropagation();
//      onPeriodClick(period, bar, yStart);
//    });

//    document.getElementById("timeline-events").appendChild(bar);
//  });

  

//  document.getElementById("timeline-line").style.height = timelineLength + "px";

//  const eventContainer = document.getElementById("timeline-events");
//  const labelContainer = document.getElementById("year-labels");

  // Auslesen der Position des Zeitstrahls
//  const timeline = document.getElementById("timeline-line");
//  const timelineX = timeline.getBoundingClientRect().left + timeline.offsetWidth / 2;

  // Geschehnisse auf dem Zeitstrahl platzieren
//  events.forEach(event => {
//    const yOffset = (event.year - earliest) * pixelsPerYear + 10;

//    const el = document.createElement("div");
//    el.className = "event";
//    el.style.top = yOffset + "px";
//    el.innerHTML = `<strong>${event.year}</strong>: ${event.title}`;
//    eventContainer.appendChild(el);
//  });

  // Fixe 50er-Marken zur besseren Orientierung berechnen (z. B. 1800, 1850, 1900…) eingeschränkt durch das erste und letzte vermerkte Geschehen
//  const firstMarker = Math.ceil(earliest / 50) * 50;
//  const lastMarker = Math.floor(latest / 50) * 50;

//  for (let y = firstMarker; y <= lastMarker; y += 50) {
//    const yOffset = (y - earliest) * pixelsPerYear + 10;

//    const label = document.createElement("div");
//    label.className = "year-marker";
//    label.style.position = "absolute";
//    label.style.top = yOffset + "px";
//    label.style.width = "40px";
//    label.textContent = y;
//    labelContainer.appendChild(label);
//  }

  // Zusätzliche Beschriftung für exakte Ereignisjahre
//  events.forEach(event => {
//    if (![...Array.from(labelContainer.children)].some(e => e.textContent == event.year)) {
//      const label = document.createElement("div");
//      label.className = "year-marker";
//      label.style.position = "absolute";
//      label.style.top = ((event.year - earliest) * pixelsPerYear + 10) + "px";
//      label.style.width = "40px";
//      label.textContent = event.year;
//      labelContainer.appendChild(label);
//    }
//  });

//  renderTimeline();

// });


// Länge und Position eines Zeitabschnitts auf dem Zeitstrahl; wurde möglicherweise durch einen weiter unten stehenden Teil ersetzt
// const periodContainer = document.getElementById("timeline-events");
// periods.forEach(period => {
//  const startOffset = (period.start - earliest) * pixelsPerYear + 10;
//  const endOffset = (period.end - earliest) * pixelsPerYear + 10;
//  const height = endOffset - startOffset + 10;

//  const wrapper = document.createElement("div");
//  wrapper.style.position = "absolute";
//  wrapper.style.top = startOffset + 10 + "px";
//  wrapper.style.left = "20%";
//  wrapper.style.width = "60px";
//  wrapper.style.height = height + "px";

//  const bar = document.createElement("div");
//  bar.className = "timeline-period";
//  bar.classList.add("timeline-period", "centered-on-timeline");
//  bar.setAttribute("data-title", period.title);
//  bar.style.height = height + "px";
//  bar.style.backgroundColor = "rgba(70, 130, 180, 0.2)";
//  bar.style.borderLeft = `4px solid ${period.color}`;
//  bar.style.borderRight = `4px solid ${period.color}`;

//  const detailBox = document.createElement("div");
//  detailBox.className = "period-details";
//  detailBox.innerText = period.description;

  // Untergeschehnisse; möglicherweise durch onPeriodClick obsulet gemacht
//  period.subEvents?.forEach(sub => {
//    const yOffset = (sub.year - earliest) * 12 + Math.round(sub.month / 12 * 12) + 10; // Möglicherweise Änderung nötig

//    const dot = document.createElement("div");
//    dot.className = "sub-event-dot";
//    dot.classList.add("sub-event-dot", "centered-on-timeline");
//    dot.style.top = (yOffset - startOffset) + "px";
//    dot.setAttribute("data-title", sub.title);
//    dot.title = `${sub.month}.${sub.year}`;

//    dot.addEventListener("click", () => {
//      const info = document.createElement("div");
//      info.className = "period-details";
//      info.innerText = sub.description;
//      dot.parentElement.appendChild(info);
//      setTimeout(() => info.classList.add("active"), 100);
//    });

//    wrapper.appendChild(dot);
//  });

  // Toggle Anzeige beim Klicken auf Zeitabschnitt (erledigt; woanders)


let activeEvent = null;  
let activePeriod = null;
// let activeSubEvent = null;
let activeSubEvents = []; // Für die Verwaltung von mehreren, wenn die Option angeschaltet ist


// let activeTimelineImage = null; // Bilder
// let activeImageIndex = -1;

// let backgroundData = [];
// let backgroundImageElements = [];
// let activeBgIndex = 0;
// const PPY_EXTENDED = 120;


  
  // Globale Einstellungen
  let allowMultipleSubinfo = false;
  let backgroundImagesDisabled = false;

// ===== Hintergrund ===========
//   let backgroundImagesData = [];
//   const extendedPPY = 120; // Pixel pro Jahr im verlängerten Modus
//   let bannerHeight = 0;


// function initBackgroundImages() {
//     let layer = document.getElementById("background-layer");
//     if (!layer) {
//       layer = document.createElement("div");
//       layer.id = "background-layer";
//       document.body.appendChild(layer);
//     }
//     layer.innerHTML = "";

//     if (backgroundImagesDisabled || !window.timelineData?.backgroundImages) return;

//     backgroundImagesData = window.timelineData.backgroundImages.map((img, index, arr) => {
//         const vpWidth = window.innerWidth;
//         const scaledWidth = vpWidth; // BBS(x)
//         const scaledHeight = vpWidth / img.width * img.height; // BHS(x)
        
        // Nächstes Bild-Startjahr oder Zeitstrahl-Ende
//         const nextYear = arr[index + 1]?.startYear ?? window.latest + 1;
//         const ZA = nextYear - img.startYear; // ZA(x)
//         const ZAL = ZA * extendedPPY; // ZAL(x)

//         const HBSV = scaledHeight / ZAL; // HBSV(x)

//         const element = document.createElement("img");
//         element.src = img.src;
//         element.alt = img.alt || "";
//         element.className = "background-image";

//         layer.appendChild(element);

//         return {
//             ...img,
//             scaledWidth,
//             scaledHeight,
//             ZA,
//             ZAL,
//             HBSV,
//             element,
//             topOffset: 0 // später berechnet
//         };
//     });

//     positionBackgroundImages();
// }

// function positionBackgroundImages() {
//     bannerHeight = document.querySelector(".banner")?.offsetHeight ?? 0;

//     let cumulativeHeight = bannerHeight; // Grundwert
//     backgroundImagesData.forEach((img, i) => {
//         img.topOffset = cumulativeHeight;
//         img.element.style.top = img.topOffset + "px";
//         img.element.style.height = img.scaledHeight + "px";
//         cumulativeHeight += img.scaledHeight;
//     });
// }

// function updateBackgroundOnScroll() {
//     if (backgroundImagesDisabled || backgroundImagesData.length === 0 || !isZoomedIn) return;

//     const scrollY = window.scrollY;
//     const pointerYear = window.earliest + (scrollY - bannerHeight) / extendedPPY;

    // Aktives Bild finden
//     let activeIndex = backgroundImagesData.findIndex((img, idx, arr) => {
//         const nextStart = arr[idx + 1]?.startYear ?? window.latest + 1;
//         return pointerYear >= img.startYear && pointerYear < nextStart;
//     });

//     if (activeIndex === -1) return;

//     const activeImg = backgroundImagesData[activeIndex];
//     const startYear = activeImg.startYear;
//     const startScroll = bannerHeight + (startYear - window.earliest) * extendedPPY;
//     const sc = scrollY - startScroll;

//     const hv = activeImg.HBSV * sc; // HV = HBSV(x) * Sc

//     backgroundImagesData.forEach(img => {
//         img.element.style.transform = `translateY(${-hv}px)`;
//     });
// }

// window.addEventListener("resize", () => {
//     initBackgroundImages();
//     updateBackgroundOnScroll();
// });

// window.addEventListener("scroll", updateBackgroundOnScroll);

// function renderBackgroundImages() {
//   if (backgroundImagesDisabled || !isZoomedIn) {
//     document.getElementById("background-layer")?.remove();
//     return;
//   }
//   if (!document.getElementById("background-layer")) {
//     const bgLayer = document.createElement("div");
//     bgLayer.id = "background-layer";
//     document.body.appendChild(bgLayer);
//   }
//   initBackgroundImages();
//   updateBackgroundOnScroll();
// }
// ============================

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
    // renderBackgroundImages(); // Hintergrundbilder jetzt rendern

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

  // infoBox.scrollIntoView({ behavior: "smooth", block: "center" }); // Beim klick auf Zeitabschnitt automatisch dorthin scrollen
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
    // const yOffset = ((sub.year - earliest) * pixelsPerYear) + ((sub.month - 1) * 10) + 10;
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
//  if (activeSubEvent && activeSubEvent.data === subEvent) {
//    activeSubEvent.infoBox.remove();
//    activeSubEvent = null;
//    return;
//  }

//  if (activeSubEvent) {
//    activeSubEvent.infoBox.remove();
//  }


//  if (!allowMultipleSubinfo && activeSubEvent) {
//    activeSubEvent.infoBox.remove();
//  }

//  const infoBox = document.createElement("div"); // Bin mir nicht sicher, ob dieser Teil durch einen anderen ersetzt wurde...behalte es bei // Habe ihn nicht woanders
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
    // activeSubEvent = null;
    activeSubEvents = activeSubEvents.filter(e => e.data !== subEvent);
  });

  enableDrag(infoBox); // Drag-Funktion aktivieren

  document.body.appendChild(infoBox);
  // activeSubEvent = { data: subEvent, infoBox };
  activeSubEvents.push({ data: subEvent, infoBox });
}



// Schließen aller offenen Infoboxen (Ein Fehler, der vermutlich niemanden außer mich stören wird: Wenn ein Hauptereigniss geöffnet wird und dann der Zeitstrahl vergrößert wird, schließt man durch das Wegklicken immer noch alle Infoboxen, ABER wenn man nun NUR den Zeitstrahl vergrößert öffnet sich ZUSÄTZLICH noch die Infobox des selben Hauptereignisses...Vincent, wenn du das hier ließt...tue bitte nicht so, als wäre dir der Fehler aufgefallen, denn dann kann ich nicht mehr schlafen)
// function closeAllInfo({ keepZoom = false } = {}) {
//  if (activePeriod) {
//    activePeriod.infoBox?.remove();
//    activePeriod.data.subEvents?.forEach(sub => sub._element?.remove());
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

//  if (activeSubEvent) {
//    activeSubEvent.infoBox.remove();
//    activeSubEvent = null;
//  }

activeSubEvents.forEach(e => e.infoBox.remove());
activeSubEvents = [];

  // if (!keepZoom && isZoomedIn) {
    // Achtung: Nur dann zurückzoomen, wenn nicht manuell festgelegt
    isZoomedIn = false;   // <- Zoom zurücksetzen
    // pixelsPerYear = 12; // Nicht erneut festlegen
    renderTimeline();     // <- Timeline neu mit weniger Zoom
    // renderBackgroundImages();

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
        // !e.target.closest('#menuContent') &&
        // !e.target.closest('#burgerIcon') &&
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
//  const eventContainer = document.getElementById("timeline-events");
//  const labelContainer = document.getElementById("year-labels");
//  const timeline = document.getElementById("timeline-line");
  const titleElement = document.getElementById("bannerTitle");
  // const params = new URLSearchParams(window.location.search);
  // const currentDataset = params.get("dataset");

  // Alle Zeitstrahl-Links durchsuchen
//  document.querySelectorAll('#menuContent a[href*="dataset="]').forEach(link => {
//    const linkDataset = new URL(link.href).searchParams.get("dataset");
//    if (linkDataset === currentDataset) {
//      link.style.display = "none"; // Verstecken, wenn es der aktuelle ist
//    }
//  });

  if (window.timelineData?.timelineTitle && titleElement) {
    titleElement.textContent = window.timelineData.timelineTitle;
  }

//  renderTimeline(
//    window.timelineData.events,
//    window.timelineData.periods
//  );  

  document.getElementById("toggleUnlimitedSubinfos").addEventListener("change", (e) => {
    allowMultipleSubinfo = e.target.checked;
  });

  document.getElementById("toggleBackgroundImages").addEventListener("change", (e) => {
    backgroundImagesDisabled = e.target.checked;
    // renderBackgroundImages();
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
  //  const ignoreSelectors = [
  //    '.timeline-period',
  //    '.sub-event-dot',
  //    '.timeline-info-box',
  //    '#menuContent',
  //    '#burgerIcon',
  //    '#searchInput',
  //    '#clearSearch',
  //    '#searchResults'
  //  ];

//  const clickedInside = ignoreSelectors.some(sel => e.target.closest(sel));

//  if (!clickedInside) {
//   closeAllInfo(); // Nur Info schließen, NICHT Menü
//  }

  // Menü separat schließen
//  if (!e.target.closest('#menuContent') && !e.target.closest('#burgerIcon')) {
//    document.getElementById("burgerIcon").classList.remove("open");
//    document.getElementById("menuContent").style.display = "none";
      burgerIcon.classList.remove("open");
      menuContent.style.display = "none";
    }
  });

  // Bei Bildschirmveränderung den Zeitstrahl neu zeichnen
  window.addEventListener("resize", () => {
    renderTimeline();
    // renderBackgroundImages();

  });

  // renderTimeline();
  // initTimeline();

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

//   const backgroundImagesToggle = document.getElementById("toggleBackgroundImages");
//   backgroundImagesDisabled = backgroundImagesToggle.checked;

//   backgroundImagesToggle.addEventListener("change", (e) => {
//     backgroundImagesDisabled = e.target.checked;
//     updateSlideshowBackground();
//   });

//   window.bgPrev = document.getElementById("bg-prev");
//   window.bgCurr = document.getElementById("bg-current");
//   window.bgNext = document.getElementById("bg-next");

//   updateSlideshowBackground();  

});


  // Globale Einstellungen
//   let allowMultipleSubinfo = false;
//   let backgroundImagesDisabled = false;

//   document.getElementById("toggleUnlimitedSubinfos").addEventListener("change", (e) => {
//     allowMultipleSubinfo = e.target.checked;
// });

//   document.getElementById("toggleBackgroundImages").addEventListener("change", (e) => {
//     backgroundImagesDisabled = e.target.checked;
    // updateBackgroundImage();
    // updateSlideshowBackground();
    
//   });



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

//  if (query.length === 0) return;
  if (query.length === 0) {
    showAllMenuItems();
    return;
  }

  hideDuringSearch();

//  const filtered = events.filter(event =>
//  const filtered = (window.events || []).filter(event =>
//    event.title.toLowerCase().includes(query) || String(event.year).includes(query)
//  );

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

//  filtered.forEach(event => {
//    const resultItem = document.createElement("div");
//    resultItem.textContent = `${event.year}: ${event.title}`;
//    resultItem.className = "search-result";
//    resultItem.style.cursor = "pointer";

  filtered.forEach(result => {
    const resultItem = document.createElement("div");
    resultItem.className = "search-result";
    resultItem.style.cursor = "pointer";

//    if (result.type === "event") {
//      resultItem.textContent = `${result.data.year}: ${result.data.title}`;
//    } else if (result.type === "period") {
//      resultItem.textContent = `Zeitraum: ${result.data.name}`;
//    } else if (result.type === "sub") {
//      resultItem.textContent = `Subereignis: ${result.data.title}`;
//    }

//    resultItem.addEventListener("click", () => {
//      let yOffset;
//      if (result.type === "event") {
//        yOffset = (result.data.year - window.earliest) * getEffectivePPY() + 10;
//      } else if (result.type === "period") {
//        yOffset = (result.data.start - window.earliest) * getEffectivePPY() + 10;
//      } else if (result.type === "sub") {
//        const monthOffset = (result.data.month - 1 || 0) / 12;
//        yOffset = (result.data.year - window.earliest + monthOffset) * getEffectivePPY() + 10;
//      }

//      window.scrollTo({ top: yOffset - 100, behavior: "smooth" });
//    });

//    searchResults.appendChild(resultItem);
//  });


//  if (result.type === "event") {
//    resultItem.textContent = `${result.data.year}: ${result.data.title}`;
//    resultItem.addEventListener("click", () => {
      // Eindeutig per Jahr und Titel suchen
//      const eventElements = document.querySelectorAll(".event");
//      for (const el of eventElements) {
//        const plainText = el.textContent.replace(/\s+/g, " ").trim();
//        const searchText = `${result.data.year}: ${result.data.title}`;
//        if (plainText === searchText) {
//          el.scrollIntoView({ behavior: "smooth", block: "center" });
//          el.classList.add("highlight");
//          setTimeout(() => el.classList.remove("highlight"), 2000);
//          break;
//        }
//      }
//    });
//  }

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
//      const startOffset = (result.data.start - window.earliest) * getEffectivePPY() + 10;

      // Öffne Periode
//      onPeriodClick(result.data, result.data._element || null, startOffset);

      // Danach scrollen
//      setTimeout(() => {
//        window.scrollTo({ top: startOffset - 100, behavior: "smooth" });
//      }, 100);
//    });
//  }
      const targetPeriod = result.data;

      // Zoom aktivieren und rendern
      if (!isZoomedIn) {
        isZoomedIn = true;
        renderTimeline();
        // renderBackgroundImages();
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

      // Öffne zugehörigen Zeitraum
//      onPeriodClick(result.period, result.period._element || null, subOffset);

      // Danach subEvent öffnen und scrollen
//      setTimeout(() => {
//        onSubEventClick(result.data, subOffset + 80);
//        window.scrollTo({ top: subOffset - 100, behavior: "smooth" });
//       }, 150);
//     });
//   }

//   searchResults.appendChild(resultItem);
// });
      // Zoom aktivieren und neu zeichnen
      if (!isZoomedIn) {
        isZoomedIn = true;
        renderTimeline();
       // renderBackgroundImages();

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

    // Beim Suchen andere Menüelemente ausblenden
//    const menuLinks = document.getElementById("menuLinks");

//      if (query.length === 0) {
//        menuLinks.style.display = "block";
//      } else {
//        menuLinks.style.display = "none";
//      }
      

//      searchInput.addEventListener("input", () => {
//        clearSearch.style.display = searchInput.value.length > 0 ? "inline" : "none";
//      });

      

    // Beim Klick zum Ereignis scrollen // Habe die Funktion dieses Teils wohl schon weiter oben ausgeführt
//    resultItem.addEventListener("click", () => {
//      const eventElements = document.querySelectorAll(".event");
//      eventElements.forEach(el => {
//        if (el.innerText.includes(event.title)) {
//          el.scrollIntoView({ behavior: "instant", block: "center" });
//          el.classList.add("highlight");
//          setTimeout(() => el.classList.remove("highlight"), 2000);
//        }
//      });
//    });

//    searchResults.appendChild(resultItem);
//  });  


  window.addEventListener("load", adjustTimelineOffset);
  window.addEventListener("resize", adjustTimelineOffset);

  function adjustTimelineOffset() {
    const banner = document.querySelector(".banner");
    const timelineContainer = document.getElementById("timeline-container");
    if (banner && timelineContainer) {
      const height = banner.offsetHeight;
      timelineContainer.style.marginTop = height + 20 + "px"; // 20px Extra-Puffer, falls ws Probleme mit dem Banner gibt
    }
  }

});

clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  clearSearch.style.display = "none";
  // document.getElementById("searchResults").innerHTML = "";
  // document.getElementById("menuLinks").style.display = "block";
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
//   const eventContainer = document.getElementById("timeline-events");
//   const labelContainer = document.getElementById("year-labels");
  // Entferne alte Jahrzehntemarker
//   document.querySelectorAll(".decade-marker, .major-decade-marker").forEach(el => el.remove());

  // activeSubEvent = null; // nur Sub-Ereignisse zurücksetzen, aber nicht activePeriod
  // activePeriod = null;

  // Container leeren
//   eventContainer.innerHTML = "";
//   labelContainer.innerHTML = "";
  // document.getElementById("timeline-events").innerHTML = "";
  // document.getElementById("year-labels").innerHTML = "";
//   document.getElementById("timeline-line").style.height =
//     (latest - earliest + 2) * getEffectivePPY() + 20 + "px";

  // Neu berechnen
//  let earliest = Math.min(...events.map(e => e.year));
//  let latest = Math.max(...events.map(e => e.year));
//  const timelineLength = (latest - earliest + 2) * pixelsPerYear + 20;
//  document.getElementById("timeline-line").style.height = timelineLength + "px";

  // Events/Hauptgeschehnisse neu setzen
//   events.forEach(event => {
//     const yOffset = (event.year - earliest) * getEffectivePPY() + 10;
//     const el = document.createElement("div");
//     el.className = "event";
//     el.style.top = (yOffset - 5) + "px";
//     el.innerHTML = `<strong>${event.year}</strong>: ${event.title}`;
//     eventContainer.appendChild(el);
//   });

  // Perioden/Zeitabschnitte neu zeichnen
//   periods.forEach(period => {
    // const yStart = (period.start - earliest) * pixelsPerYear + 10;
    // const yEnd = (period.end - earliest + 1) * pixelsPerYear + 10;
//     const startOffset = (period.start - earliest) * getEffectivePPY() + 10;
//     const endOffset = ((period.end + 1) - earliest) * getEffectivePPY() + 10;
//     const height = endOffset - startOffset;

//     const bar = document.createElement("div");
//     bar.className = "timeline-period centered-on-timeline";
    // bar.style.top = yStart + "px";
    // bar.style.height = (yEnd - yStart) + "px";
//     bar.style.top = startOffset + "px";
//     bar.style.height = height + "px";
//     bar.title = period.name;

//     bar.addEventListener("click", (e) => {
//       e.stopPropagation();
      // onPeriodClick(period, bar, yStart);
//       onPeriodClick(period, bar, startOffset);
//     });

//     eventContainer.appendChild(bar);
    // document.getElementById("timeline-events").appendChild(bar);

      // Jahrzehntemarker
//       const firstDecade = Math.ceil(earliest / 10) * 10;
//       const lastDecade = Math.floor(latest / 10) * 10;

//       for (let y = firstDecade; y <= lastDecade; y += 10) {
//         const yOffset = ((y - earliest) * getEffectivePPY()) + 10;

//         const line = document.createElement("div");
//         line.className = (y % 50 === 0) ? "major-decade-marker" : "decade-marker";
//         line.style.top = yOffset + "px";

//         document.getElementById("timeline-container").appendChild(line);
//       }

//   });

  // Hauptgeschehnisse neu setzen
//  events.forEach(event => {
//    const yOffset = (event.year - earliest) * pixelsPerYear + 10;
//    const el = document.createElement("div");
//    el.className = "event";
//    el.style.top = yOffset + "px";
//    el.innerHTML = `<strong>${event.year}</strong>: ${event.title}`;
//    document.getElementById("timeline-events").appendChild(el);
//  });

  // Jahr-Marker (50er-Abstände)
//   const firstMarker = Math.ceil(earliest / 50) * 50;
//   const lastMarker = Math.floor(latest / 50) * 50;

//   for (let y = firstMarker; y <= lastMarker; y += 50) {
    // const yOffset = (y - earliest) * pixelsPerYear + 10;
//     const yOffset = (y - earliest) * getEffectivePPY() + 10;
//     const label = document.createElement("div");
//     label.className = "year-marker";
//     label.style.position = "absolute";
//     label.style.top = (yOffset - 8) + "px";
//     label.style.width = "40px";
//     label.textContent = y;
    //document.getElementById("year-labels").appendChild(label);
//     labelContainer.appendChild(label);
//   }

  // Exakte Ereignisjahre als Marker
//   events.forEach(event => {
//  if (![...Array.from(document.getElementById("year-labels").children)].some(e => e.textContent == event.year)) {
//     if (![...labelContainer.children].some(e => e.textContent == event.year)) {
//       const label = document.createElement("div");
//       label.className = "year-marker";
//       label.style.position = "absolute";
      // label.style.top = ((event.year - earliest) * pixelsPerYear + 10) + "px";
//       label.style.top = ((event.year - earliest) * getEffectivePPY() + 10) + "px";
//       label.style.width = "40px";
//       label.textContent = event.year;
      // document.getElementById("year-labels").appendChild(label);
//       labelContainer.appendChild(label);
//     }
//   });

  // Jahrzehnt- und Jahrmarkierungen neu rendern, um Layoutfehler bei veränderter Bildschirmbreite zu vermeiden
//   const markContainer = document.getElementById("decade-marks") || (() => {
//     const div = document.createElement("div");
//     div.id = "decade-marks";
//     div.style.position = "absolute";
//     div.style.top = "0";
//     div.style.left = "0";
//     div.style.width = "100%";
//     document.getElementById("timeline-container").appendChild(div);
//     return div;
//   })();
//   markContainer.innerHTML = "";

//   const timelineLine = document.getElementById("timeline-line");
//   const lineLeft = timelineLine.offsetLeft + timelineLine.offsetWidth / 2;



//   const firstDecade = Math.ceil(earliest / 10) * 10;
//   const lastDecade = Math.floor(latest / 10) * 10;

//   for (let y = firstDecade; y <= lastDecade; y += 10) {
//     const yOffset = (y - earliest) * getEffectivePPY() + 10;
//     const line = document.createElement("div");
//     line.className = "timeline-mark-line " + (y % 50 === 0 ? "timeline-year" : "timeline-decade");
//     line.style.top = yOffset + "px";
//     line.style.left = lineLeft + "px";
//     markContainer.appendChild(line);
//   }

// }

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
  //  (latest - earliest + 2) * getEffectivePPY() + 20 + "px";

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
    // label.style.width = "40px";
    label.style.textAlign = "right";
    label.style.transform = "translateX(-100%)";
    label.textContent = y;
    labelContainer.appendChild(label);
  }

  // Exakte Ereignisjahre ergänzen (unnötig, da das Jahr schon auf der rechten Seite des Zeitstrahls, innerhalb des Titels, steht)
//  events.forEach(event => {
//    if (![...labelContainer.children].some(e => e.textContent == event.year)) {
//      const yOffset = (event.year - earliest) * getEffectivePPY() + 10;
//      const label = document.createElement("div");
//      label.className = "year-marker";
//      label.style.position = "absolute";
//      label.style.top = (yOffset - 8) + "px";
//      label.style.left = "0";
//      label.style.width = "40px";
//      label.textContent = event.year;
//      labelContainer.appendChild(label);
//    }
//  });

  // Events platzieren
  events.forEach(event => {
    const yOffset = (event.year - window.earliest) * getEffectivePPY() + 10;
    const el = document.createElement("div");
    el.className = "event";
    el.style.top = (yOffset - 5) + "px";
    el.style.position = "absolute";
    el.style.left = (lineLeft + 30) + "px"; // 30px rechts vom Zeitstrahl
    // el.style.width = "calc(100% - " + (lineLeft + 20) + "px")
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
      // detail.classList.toggle("active");
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

    // updateBackgroundImage();
    // renderBackgroundImages();

}


// window.addEventListener("scroll", updateSlideshowBackground);

// ===================== Hintergrundbilder =====================
// let backgroundImages = [];
// let activeBgIndex = 0;
// let bgContainer;
// let pointerEl;

// function initBackgroundImages() {
//   if (!window.timelineData?.backgroundImages) return;

  // Vorherige löschen
//   document.getElementById("background-container")?.remove();

//   bgContainer = document.createElement("div");
//   bgContainer.id = "background-container";
//   bgContainer.style.position = "fixed";
//   bgContainer.style.top = "0";
//   bgContainer.style.left = "0";
//   bgContainer.style.width = "100%";
//   bgContainer.style.height = "100%";
//   bgContainer.style.zIndex = "-1";
//   document.body.appendChild(bgContainer);

//   const viewportWidth = window.innerWidth;
//   const bannerHeight = document.querySelector(".banner")?.offsetHeight || 0;
//   let currentTop = bannerHeight;

//   backgroundImages = window.timelineData.backgroundImages.map((img) => {
//     const scaledHeight = viewportWidth / img.width * img.height;

//     const el = document.createElement("img");
//     el.src = img.src;
//     el.alt = img.alt;
//     el.className = "bg-image";
//     el.style.position = "absolute";
//     el.style.width = "100%";
//     el.style.top = currentTop + "px";

//     bgContainer.appendChild(el);

//     const obj = {
//       ...img,
//       scaledHeight,
//       element: el,
//       top: currentTop
//     };

//     currentTop += scaledHeight;
//     return obj;
//   });

  // Pointer hinzufügen, falls nicht vorhanden
//   if (!pointerEl) {
//     pointerEl = document.createElement("div");
//     pointerEl.id = "timeline-pointer";
//     pointerEl.style.position = "fixed";
//     pointerEl.style.top = "50%";
//     pointerEl.style.left = "12%";
//     pointerEl.style.width = "10px";
//     pointerEl.style.height = "2px";
//     pointerEl.style.background = "red";
//     pointerEl.style.zIndex = "1000";
//     document.body.appendChild(pointerEl);
//   }
// }

// function updateBackgroundOnScroll() {
//   if (!isZoomedIn || backgroundImagesDisabled || !backgroundImages.length) return;

//   const pointerY = window.scrollY + window.innerHeight / 2;
//   const pointerYear = earliest + (pointerY - 120) / getEffectivePPY(); // Es gibt Probleme mit dem Punkt auf dem Zeitstrahl, auf den gezeigt wird und dem von dem davon ausgegangen wird, das auf ihn gezeigt wird

  // Aktives Bild bestimmen
//   for (let i = 0; i < backgroundImages.length; i++) {
//     const nextYear = backgroundImages[i + 1]?.startYear ?? (latest + 1);
//     if (pointerYear >= backgroundImages[i].startYear && pointerYear < nextYear) {
//       activeBgIndex = i;
//       break;
//     }
//   }

  // KEINE KONSTANTEN!!!
//   const currentImage = backgroundImages[activeBgIndex];
//   const nextImage = backgroundImages[activeBgIndex + 1];
//   const sectionEndYear = nextImage ? nextImage.startYear : latest + 1;

//   const sectionYears = sectionEndYear - currentImage.startYear;
//   const sectionPx = sectionYears * getEffectivePPY();
//   const hbsVelocity = currentImage.scaledHeight / sectionPx;

//   const scrolledInSection = (pointerYear - currentImage.startYear) * getEffectivePPY();
//   const shift = -scrolledInSection * hbsVelocity;

//   const bannerHeight = document.querySelector(".banner")?.offsetHeight || 0;
//   let currentTop = bannerHeight + shift;

//   backgroundImages.forEach((img) => {
//     img.element.style.top = currentTop + "px";
//     currentTop += img.scaledHeight;
//   });
// }

// function renderBackgroundImages() {
//   if (isZoomedIn && !backgroundImagesDisabled) {
//     initBackgroundImages();
//     updateBackgroundOnScroll();
//   } else {
//     document.getElementById("background-container")?.remove();
//     pointerEl?.remove();
//     pointerEl = null;
//   }
// }

// window.addEventListener("scroll", updateBackgroundOnScroll);
// window.addEventListener("resize", () => {
//   if (isZoomedIn && !backgroundImagesDisabled) {
//     initBackgroundImages();
//     updateBackgroundOnScroll();
//   }
// });

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
//  if (!e.target.closest(".event")) {
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
    
    // window.addEventListener("scroll", updateBackgroundImage); // Hintergrundbilder aktualisieren


    // Titel aktualisieren
    const titleElement = document.querySelector(".banner-title");
    if (titleElement && window.timelineData.timelineTitle) {
      titleElement.textContent = window.timelineData.timelineTitle;
    }

    renderTimeline();
    // renderBackgroundImages();



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



// function updateBackgroundImage() {
//   if (backgroundImagesDisabled || !isZoomedIn || !window.timelineImages) {
//     document.getElementById("timeline-background-image").style.opacity = 0;
//     document.getElementById("timeline-image-pointer").style.display = "none";
//     return;
//   }

//   const scrollTop = window.scrollY;
//   const yearAtTop = window.earliest + (scrollTop / getEffectivePPY());

//   let selectedImage = null;

//   for (let i = 0; i < timelineImages.length; i++) {
//     const img = timelineImages[i];
//     const next = timelineImages[i + 1];
//     const endYear = img.end ?? (next?.start ?? window.latest + 1);

//     if (yearAtTop >= img.start && yearAtTop < endYear) {
//       selectedImage = img;
//       break;
//     }
//   }

//   const imgEl = document.getElementById("timeline-background-image");
//   const pointer = document.getElementById("timeline-image-pointer");

//   if (selectedImage && selectedImage !== activeTimelineImage) {
//     imgEl.src = selectedImage.src;
//     imgEl.alt = selectedImage.alt || "";
//     imgEl.style.opacity = 0.25;
//     activeTimelineImage = selectedImage;
//   }

//   if (selectedImage) {
//     pointer.style.display = "block";
//     const pointerOffset = (selectedImage.start - window.earliest) * getEffectivePPY() + 10;
//     pointer.style.top = pointerOffset - window.scrollY + "px";
//   } else {
//     pointer.style.display = "none";
//   }
// }


// function updateBackgroundImage() {
//   const imgOld = document.getElementById("timeline-background-image-old");
//   const imgNew = document.getElementById("timeline-background-image-new");
//   const pointer = document.getElementById("timeline-image-pointer");

//   if (backgroundImagesDisabled || !isZoomedIn || !window.timelineImages) {
//     imgOld.style.opacity = 0;
//     imgNew.style.opacity = 0;
//     pointer.style.display = "none";
//     return;
//   }

//   const scrollTop = window.scrollY;
//   const yearAtTop = window.earliest + (scrollTop / getEffectivePPY());

//   let selectedImage = null;
//   let startYear = null;
//   let endYear = null;

//   for (let i = 0; i < timelineImages.length; i++) {
//     const img = timelineImages[i];
//     const next = timelineImages[i + 1];
//     const imgEnd = img.end ?? (next?.start ?? window.latest + 1);

//     if (yearAtTop >= img.start && yearAtTop < imgEnd) {
//       selectedImage = img;
//       startYear = img.start;
//       endYear = imgEnd;
//       break;
//     }
//   }

//   if (!selectedImage) {
//     imgOld.style.opacity = 0;
//     imgNew.style.opacity = 0;
//     pointer.style.display = "none";
//     activeTimelineImage = null;
//     return;
//   }

  // Falls das Bild sich ändert
//   if (selectedImage !== activeTimelineImage) {
    // Tausche Bilder
//     imgOld.src = imgNew.src;
//     imgOld.style.opacity = imgNew.style.opacity;

    // Lade neues Bild
//     imgNew.src = selectedImage.src;
//     imgNew.alt = selectedImage.alt || "";

    // Sobald das Bild geladen ist: Weich überblenden
//     imgNew.onload = () => {
//       imgOld.style.opacity = 0;
//       imgNew.style.opacity = 0.25;
//     };

//     activeTimelineImage = selectedImage;
//   }

  // Parallax-Effekt
//   const sectionStartPx = (startYear - window.earliest) * getEffectivePPY();
//   const sectionEndPx = (endYear - window.earliest) * getEffectivePPY();
//   const sectionHeightPx = sectionEndPx - sectionStartPx;
//   const scrollProgress = Math.min(1, Math.max(0, (scrollTop - sectionStartPx) / sectionHeightPx));

//   imgNew.style.transform = `translateY(${(-scrollProgress) * 100}%)`;
//   imgOld.style.transform = `translateY(${(-scrollProgress) * 100}%)`;

  // Zeigerposition
//   const pointerOffset = sectionStartPx + 10;
//   pointer.style.display = "block";
//   pointer.style.top = pointerOffset - scrollTop + "px";
// }


// function updateSlideshowBackground() {
//   if (!isZoomedIn || backgroundImagesDisabled || !window.timelineImages) {
//     document.querySelectorAll('.bg-img').forEach(img => img.style.opacity = 0);
//     return;
//   }

//   const scrollTop = window.scrollY;
//   const yearAtTop = window.earliest + (scrollTop / getEffectivePPY());

//   let currentIndex = window.timelineImages.findIndex((img, i, arr) => {
//     const end = img.end ?? arr[i + 1]?.start ?? window.latest + 1;
//     return yearAtTop >= img.start && yearAtTop < end;
//   });

//   if (currentIndex === -1) return;

//   const current = window.timelineImages[currentIndex];
//   const prev = window.timelineImages[currentIndex - 1];
//   const next = window.timelineImages[currentIndex + 1];
//   const currentEnd = current.end ?? next?.start ?? window.latest + 1;

  // Bild-Elemente referenzieren
//   const bgPrev = document.getElementById("bg-prev");
//   const bgCurr = document.getElementById("bg-current");
//   const bgNext = document.getElementById("bg-next");

  // Nur wenn Bild sich geändert hat
//   if (currentIndex !== activeImageIndex) {
//     if (prev) bgPrev.src = prev.src;
//     if (current) bgCurr.src = current.src;
//     if (next) bgNext.src = next.src;

//     activeImageIndex = currentIndex;
//   }

  // Prozentuale Position innerhalb des Bildzeitraums
//   const relScroll = (yearAtTop - current.start) / (currentEnd - current.start);
//   const offset = Math.min(Math.max(relScroll, 0), 1); // 0–1 begrenzen

  // Bilder transformieren
//   bgCurr.style.opacity = 1;
//   bgCurr.style.transform = `translateY(-${offset * 50}%)`; // z. B. 0–50% scrollen

  // Andere Bilder ausblenden
//   bgPrev.style.opacity = 0;
//   bgNext.style.opacity = 0;
// }


// function updateSlideshowBackground() {
//   if (!isZoomedIn || backgroundImagesDisabled || !window.timelineImages) {
//     document.querySelectorAll('.bg-img').forEach(img => img.style.opacity = 0);
//     document.getElementById("timeline-image-pointer").style.display = "none";
//     return;
//   }

//   const scrollTop = window.scrollY;
//   const yearAtTop = window.earliest + (scrollTop / getEffectivePPY());

//   const images = window.timelineImages;
//   const currentIndex = images.findIndex((img, i, arr) => {
//     const end = img.end ?? arr[i + 1]?.start ?? window.latest + 1;
//     return yearAtTop >= img.start && yearAtTop < end;
//   });

//   if (currentIndex === -1) return;

//   const prev = images[currentIndex - 1];
//   const curr = images[currentIndex];
//   const next = images[currentIndex + 1];

//   const currEnd = curr.end ?? next?.start ?? window.latest + 1;
//   const progress = (yearAtTop - curr.start) / (currEnd - curr.start);

  // Max. 100%, min. 0%
//   const offset = Math.max(0, Math.min(1, progress));

//   const bgPrev = document.getElementById("bg-prev");
//   const bgCurr = document.getElementById("bg-current");
//   const bgNext = document.getElementById("bg-next");

  // Nur Bildquellen neu setzen, wenn Index sich geändert hat
//   if (activeImageIndex !== currentIndex) {
//     if (prev) bgPrev.src = prev.src;
//     if (curr) bgCurr.src = curr.src;
//     if (next) bgNext.src = next.src;

//     activeImageIndex = currentIndex;
//   }

  // Bildpositionen setzen – wie ein durchlaufendes Band
//   const totalHeight = window.innerHeight;

//   bgPrev.style.opacity = prev ? 1 : 0;
//   bgCurr.style.opacity = 1;
//   bgNext.style.opacity = next ? 1 : 0;

//   bgPrev.style.transform = `translateY(${-100 - offset * 100}%)`;
//   bgCurr.style.transform = `translateY(${-offset * 100}%)`;
//   bgNext.style.transform = `translateY(${100 - offset * 100}%)`;

  // Pointer-Position setzen
//   const pointer = document.getElementById("timeline-image-pointer");
//   pointer.style.display = "block";
//   pointer.style.top = (scrollTop + totalHeight / 2 - 20) + "px";
// }


// function updateSlideshowBackground() {
//   if (!isZoomedIn || backgroundImagesDisabled || !window.timelineImages) {
//     document.querySelectorAll('.bg-img').forEach(img => img.style.opacity = 0);
//     const pointer = document.getElementById("timeline-image-pointer");
//     if (pointer) pointer.style.display = "none";
//     return;
//   }

//   const scrollTop = window.scrollY;
//   const yearAtTop = window.earliest + scrollTop / getEffectivePPY();
//   const images = window.timelineImages;
//   const totalImages = images.length;

  // Aktives Bild bestimmen
//   let currentIndex = images.findIndex((img, i) => {
//     const end = img.end ?? images[i + 1]?.start ?? window.latest + 1;
//     return yearAtTop >= img.start && yearAtTop < end;
//   });

//   if (currentIndex === -1) return;

//   const active = images[currentIndex];
//   const activeEnd = active.end ?? images[currentIndex + 1]?.start ?? window.latest + 1;
//   const activeDuration = activeEnd - active.start;

//   const globalProgress = (yearAtTop - active.start) / activeDuration;

//   const bgPrev = document.getElementById("bg-prev");
//   const bgCurr = document.getElementById("bg-current");
//   const bgNext = document.getElementById("bg-next");

//   const prev = images[currentIndex - 1];
//   const next = images[currentIndex + 1];

//   if (currentIndex !== activeImageIndex) {
//     if (prev) bgPrev.src = prev.src;
//     if (active) bgCurr.src = active.src;
//     if (next) bgNext.src = next.src;

//     activeImageIndex = currentIndex;
//   }

  // Scroll alle 3 Bilder synchron
//   [prev, active, next].forEach((img, i) => {
//     const el = [bgPrev, bgCurr, bgNext][i];
//     if (!img || !el) return;

//     const imgStart = img.start;
//     const imgEnd = img.end ?? images[currentIndex + (i - 1) + 1]?.start ?? window.latest + 1;
//     const imgDuration = imgEnd - imgStart;

//     const relativeOffset = (activeDuration / imgDuration) * globalProgress;
//     const translateY = -Math.min(100, Math.max(0, relativeOffset * 100));
//     el.style.transform = `translateY(${translateY}%)`;
//     el.style.opacity = 1;
//   });

  // Pointer anzeigen
//   const pointer = document.getElementById("timeline-image-pointer");
//   if (pointer) {
//     pointer.style.display = "block";
//     pointer.style.top = `${scrollTop + window.innerHeight / 2 - 20}px`;
//   }
// }


// --- updateSlideshowBackground() (neu schreiben) ---
// function updateSlideshowBackground() {
//   if (!isZoomedIn || backgroundImagesDisabled || !window.timelineImages) {
//     document.querySelectorAll('.bg-img').forEach(img => img.style.display = 'none');
//     document.getElementById("slideshow-pointer").style.display = 'none';
//     return;
//   }

//   document.getElementById("slideshow-pointer").style.display = 'block';

//   const scrollTop = window.scrollY;
//   const ppy = getEffectivePPY();
//   const pointerY = window.innerHeight / 2;
//   const pointerYear = window.earliest + ((scrollTop + pointerY) / ppy);

//   const images = window.timelineImages;

  // Index des aktiven Bilds
//   const index = images.findIndex((img, i) => {
//     const start = img.start;
//     const end = img.end ?? (images[i + 1]?.start ?? window.latest);
//     return pointerYear >= start && pointerYear < end;
//   });

//   if (index === -1) return;

//   const current = images[index];
//   const prev = images[index - 1];
//   const next = images[index + 1];

//   const slideshow = document.getElementById("timeline-background-slideshow");
//   const screenWidth = window.innerWidth;

//   const currentEnd = current.end ?? (next?.start ?? window.latest);
//   const currentRangeYears = currentEnd - current.start;
//   const currentRangePx = currentRangeYears * ppy;

//   const currentAspectRatio = getImageAspectRatio(current.src);
//   const currentHeight = screenWidth / currentAspectRatio;

//   const scrollProgress = (pointerYear - current.start) / currentRangeYears;
//   const translateY = -scrollProgress * currentHeight + pointerY;

//   applyImage(window.bgPrev, prev, screenWidth, pointerYear);
//   applyImage(window.bgCurr, current, screenWidth, pointerYear, translateY);
//   applyImage(window.bgNext, next, screenWidth, pointerYear);
// }

// function getImageAspectRatio(src) {
//   if (src.includes("4000")) return 1; // Beispiel 4000x4000
//   if (src.includes("2000-1024")) return 2000 / 1024;
//   if (src.includes("1024")) return 1; // 1024x1024
//   return 16 / 9; // Fallback
// }

// function applyImage(imgElement, imageData, width, pointerYear, customY = null) {
//   if (!imageData) {
//     imgElement.style.display = 'none';
//     return;
//   }
//   const aspectRatio = getImageAspectRatio(imageData.src);
//   const height = width / aspectRatio;

//   imgElement.src = imageData.src;
//   imgElement.alt = imageData.alt || "";
//   imgElement.style.display = 'block';
//   imgElement.style.height = `${height}px`;
//   imgElement.style.width = `${width}px`;
//   imgElement.style.top = customY !== null ? `${customY}px` : `-${height}px`; // Position außerhalb sichtbar, wenn nicht aktiv
//   imgElement.style.opacity = 1;
// }

// --- ScrollListener (wie gehabt) ---
// window.addEventListener("scroll", updateSlideshowBackground);
// window.addEventListener("resize", updateSlideshowBackground);


// let imageMeta = []; // Liste mit Bild-Metadaten (start, end, heightPx, element)

// function preloadTimelineImages() {
//   const container = document.getElementById("timeline-background-slideshow");
//   if (!window.timelineImages || backgroundImagesDisabled || !isZoomedIn) return;

//   container.innerHTML = ''; // Alte Inhalte entfernen

//   imageMeta = window.timelineImages.map((imgData, index) => {
//     const img = document.createElement("img");
//     img.className = "bg-img";
//     img.src = imgData.src;
//     img.style.position = "absolute";
//     img.style.left = "0";
//     img.style.width = "100%";
//     img.style.opacity = "1";
//     img.style.zIndex = index;
//     container.appendChild(img);

//     const years = (imgData.end ?? window.latest + 1) - imgData.start;
//     const imageHeight = container.offsetWidth * (img.naturalHeight / img.naturalWidth); // responsive höhe berechnen
//     const scrollSpan = years * getEffectivePPY();
//     const scale = imageHeight / scrollSpan;

//     return {
//       ...imgData,
//       element: img,
//       imageHeight,
//       scrollSpan,
//       scale
//     };
//   });

//   updateTimelineImagePositions();
// }

// function updateTimelineImagePositions() {
//   if (!isZoomedIn || backgroundImagesDisabled || imageMeta.length === 0) return;

//   const scrollTop = window.scrollY;
//   const pointerY = window.innerHeight / 2; // Mitte des Bildschirms
//   const yearAtPointer = window.earliest + ((scrollTop + pointerY) / getEffectivePPY());

  // Position der Bilder berechnen
//   let accumulatedOffset = 0;
//   for (let i = 0; i < imageMeta.length; i++) {
//     const img = imageMeta[i];
//     const endYear = img.end ?? window.timelineImages[i + 1]?.start ?? window.latest + 1;

//     const startY = (img.start - window.earliest) * getEffectivePPY();
//     const endY = (endYear - window.earliest) * getEffectivePPY();

    // Aktuelles Scrollverhalten: wie weit bin ich im sichtbaren Bereich dieses Bildes?
//     const visibleStart = startY;
//     const visibleEnd = endY;
//     const visibleScroll = scrollTop + pointerY - visibleStart;

//     const translateY = -visibleScroll * img.scale;
//     img.element.style.transform = `translateY(${translateY}px)`;

    // Sichtbarkeit bei Übergängen verbessern
//     img.element.style.opacity = (scrollTop + pointerY >= visibleStart && scrollTop + pointerY < visibleEnd) ? 1 : 0.6;
//   }
// }

// window.addEventListener("scroll", updateTimelineImagePositions);
// window.addEventListener("resize", () => {
//   if (isZoomedIn && !backgroundImagesDisabled) preloadTimelineImages();
// });

// Beispiel-Daten für Bilder
// start/end in Jahren, wenn end fehlt → geht bis zum nächsten Bild
// const timelineBackgroundImages = [
//   { start: 1939, end: 1945, src: "../Bilder/Russlanddeutsche/krieg.jpg" },
//   { start: 1946, end: 1955, src: "../Bilder/Russlanddeutsche/wiederaufbau.webp" },
//   { start: 1956, end: 1991, src: "../Bilder/Russlanddeutsche/emigration.webp" }
  //{ start: 1992, end: 2025, src: "../Bilder/Russlanddeutsche/moderne.webp" }
// ];

// Container-Setup
// const slideshowContainer = document.createElement("div");
// slideshowContainer.id = "timeline-background-slideshow";
// slideshowContainer.style.position = "fixed";
// slideshowContainer.style.top = "0";
// slideshowContainer.style.left = "0";
// slideshowContainer.style.width = "100%";
// slideshowContainer.style.height = "100%";
// slideshowContainer.style.overflow = "hidden";
// slideshowContainer.style.zIndex = "-1"; // hinter Timeline
// document.body.appendChild(slideshowContainer);

// Filmstreifen
// const slideshowStrip = document.createElement("div");
// slideshowStrip.id = "slideshow-strip";
// slideshowStrip.style.position = "absolute";
// slideshowStrip.style.top = "0";
// slideshowStrip.style.left = "0";
// slideshowStrip.style.width = "100%";
// slideshowContainer.appendChild(slideshowStrip);

// Pointer
// const slideshowPointer = document.createElement("div");
// slideshowPointer.id = "slideshow-pointer";
// slideshowPointer.style.position = "fixed";
// slideshowPointer.style.left = "5%"; // links vom Strahl
// slideshowPointer.style.top = "50%";
// slideshowPointer.style.transform = "translateY(-50%)";
// slideshowPointer.style.width = "20px";
// slideshowPointer.style.height = "20px";
// slideshowPointer.style.background = "red";
// slideshowPointer.style.borderRadius = "50%";
// slideshowPointer.style.display = "none"; // wird nur bei aktiven Bildern angezeigt
// document.body.appendChild(slideshowPointer);

// Hilfsstruktur für Scroll-Berechnung
// let bgImageData = [];

// function initSlideshowBackground() {
  // Filmstreifen leeren
//   slideshowStrip.innerHTML = "";
//   bgImageData = [];

  // Alle Bilder mit Höhe und Scroll-Offset vorbereiten
//   let currentTop = 0;

//   for (let i = 0; i < timelineBackgroundImages.length; i++) {
//     const imgData = timelineBackgroundImages[i];
//     const startYear = imgData.start;
//     const endYear = imgData.end || (timelineBackgroundImages[i + 1]?.start ?? latest);

//     const yearsSpan = endYear - startYear;
//     const scrollHeight = yearsSpan * getEffectivePPY();

//     const img = document.createElement("img");
//     img.src = imgData.src;
//     img.style.display = "block";
//     img.style.width = "100%";
//     img.style.height = "auto";

//     slideshowStrip.appendChild(img);

    // Speichern
//     bgImageData.push({
//       startYear,
//       endYear,
//       scrollHeight,
//       topOffset: currentTop
//     });

//     currentTop += scrollHeight;
//   }
// }

// Scroll-Handler
// function updateSlideshowBackground() {
//   if (!isZoomedIn || backgroundImagesDisabled) {
//     slideshowContainer.style.display = "none";
//     slideshowPointer.style.display = "none";
//     return;
//   }

//   slideshowContainer.style.display = "block";

//   const scrollY = window.scrollY;

  // Verschiebe Filmstreifen
//   slideshowStrip.style.transform = `translateY(${-scrollY}px)`;

  // Aktuelles Bild finden
//   const currentYear = window.earliest + scrollY / getEffectivePPY();
//   const activeImage = bgImageData.find(img =>
//     currentYear >= img.startYear && currentYear < img.endYear
//   );

//   if (activeImage) {
//     slideshowPointer.style.display = "block";
//   } else {
//     slideshowPointer.style.display = "none";
//   }
// }

// Initialisierung
// document.addEventListener("DOMContentLoaded", () => {
//   initSlideshowBackground();
//   window.addEventListener("scroll", updateSlideshowBackground);
//   window.addEventListener("resize", initSlideshowBackground);
// });



// function updateSlideshowBackground() {
//   if (backgroundImagesDisabled || !window.timelineData?.timelineImages) return;

//   const scrollY = window.scrollY;
//   const viewportHeight = window.innerHeight;
//   const pointerY = scrollY + viewportHeight / 2; // Position am Zeitstrahl, wo Pointer sitzt

//   const images = window.timelineData.timelineImages;
//   const pixelsPerYearTimeline = getEffectivePPY(); // aktueller Zoom-Faktor

  // Container für Bilder vorbereiten
//   const container = document.getElementById("timeline-background-slideshow");
//   container.innerHTML = ''; // Alles leeren, bevor wir neu rendern

//   let cumulativeOffset = 0; // Summe der bereits platzierten Bildhöhen

//   images.forEach((imgData, index) => {
//     const years = imgData.endYear - imgData.startYear + 1;
//     const timelinePx = years * pixelsPerYearTimeline; // Pixelhöhe auf dem Zeitstrahl für diesen Abschnitt

    // Seitenverhältnis berechnen und Bildhöhe nach Skalierung bestimmen
//     const originalRatio = imgData.height / imgData.width;
//     const displayWidth = window.innerWidth; // Füllt Bildschirmbreite
//     const displayHeight = displayWidth * originalRatio;

    // Scroll-Faktor: wie stark das Bild pro Pixel des Zeitstrahls verschoben wird
//     const scrollFactor = displayHeight / timelinePx;

    // Wie weit ist der Pointer schon in diesen Abschnitt hineingescrollt?
//     const sectionStartPx = (imgData.startYear - window.earliest) * pixelsPerYearTimeline;
//     const sectionEndPx = sectionStartPx + timelinePx;

    // Erzeuge <img>-Element
//     const img = document.createElement("img");
//     img.src = imgData.src;
//     img.className = "bg-img";
//     img.style.width = displayWidth + "px";
//     img.style.height = displayHeight + "px";

    // Verschiebung berechnen
//     let translateY;
//     if (pointerY < sectionStartPx) {
      // Abschnitt noch nicht erreicht
//       translateY = cumulativeOffset;
//     } else if (pointerY > sectionEndPx) {
      // Abschnitt komplett durchlaufen → ganz nach oben geschoben
//       translateY = cumulativeOffset - displayHeight;
//     } else {
      // Abschnitt gerade aktiv → verschieben proportional zur Scroll-Position
//       const progressInSection = pointerY - sectionStartPx;
//       translateY = cumulativeOffset - progressInSection * scrollFactor;
//     }

//     img.style.transform = `translateY(${translateY}px)`;

//     container.appendChild(img);

//     cumulativeOffset += displayHeight;
//   });

  // Pointer sicherstellen
//   let pointer = document.getElementById("slideshow-pointer");
//   if (!pointer) {
//     pointer = document.createElement("div");
//     pointer.id = "slideshow-pointer";
//     document.body.appendChild(pointer);
//   }
// }




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



        // Interaktiver Zeitstrahl v17
        // Property of Joshua Ilse