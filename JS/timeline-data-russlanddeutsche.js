    // Geschehnisse; weitere sollten hier hinzugefügt werden. Um Text Gänsefüßchen zu geben ("Text.") muss man \"Text.\" schreiben. - Wenn man die deutschen Gänsefüßchen verwendet, ist das nicht notwendig.
window.timelineData = {
    timelineTitle: "Migrationsgeschichte der Russlanddeutschen",

    // Habe erstmal ein Paar Dinge eingetragen, um die Darstellung im Zeitstrahl zu prüfen, während ich an ihm arbeite. Darf nicht vergessen die Texte aus meinem Word-Dokument hier einzutragen. 
    // Wenn etwas in Klammern gesetzt ist habe ich bei meiner Recherche sich wiedersprechende Angaben gefunden oder suche nach einer besseren Formulierung

    // Quellenangaben sollen relativ zur index.html Datei gemacht werden, nicht relativ zu den JS-Dateien o.ä.
    
    // export const events = [ // Wenn auf einem Webserver
    // const events = [
    events: [
        { 
            title: "„Kolonistenbrief“ von Katharina der Großen", 
            year: 1763,
            text: "Die Zarin Katharina II. veröffentlichte am 22.07.1763 ein Manifest, den sogenannten „Kolonistenbrief“, das Siedler zur Ansiedlung im Russischen Reich einlud. Dieses Dokument, das sich insbesondere an deutsche Bauern und Handwerker richtete, garantierte zahlreiche Privilegien, wie Reisekostenübernahme, finanzielle Starthilfe, kostenloses Land, Selbstverwaltung auf lokaler Ebene, Schulunterricht in deutscher Sprache, Berufs-, Religions- und 30 Jahre Steuerfreiheit und die Befreiung vom Militärdienst.",
            keywords: ["Katharina", "Manifest", "Einladung", "Kolonistenbrief"],
            image: "Bilder/Russlanddeutsche/Manifest_oder_Kolonistenbrief.jpg", // optional
            links: [
                { label: "Wikipedia-Artikel", url: "https://de.wikipedia.org/wiki/Geschichte_der_Russlanddeutschen" },
                { label: "Bundeszentrale für politische Bildung", url: "https://www.bpb.de/themen/migration-integration/russlanddeutsche/252006/von-der-anwerbung-unter-katharina-ii-bis-1917/" }
            ]
        },
        { 
            title: "Erneuerung der Anwerbepolitik unter Zar Alexander I.", 
            year: 1804,
            text: "Ein zweites Manifest führte zu einer weiteren Einwanderungswelle, insbesondere von Deutschen in die Südukraine.",
            keywords: [""],
            image: "Bilder/Russlanddeutsche/XXX.jpg", // optional
            links: [
                { label: "XXX", url: "https://beispiel.de/karte" }
            ]
        },
        { 
            title: "Erster Weltkriegs „innerer Feind“", 
            year: 1914, 
            text: "",
            keywords: [""],
            image: "Bilder/Russlanddeutsche/XXX.jpg", // optional
            links: [
                { label: "XXX", url: "https://beispiel.de/karte" }
            ]
        },
        { 
            title: "Unterdrückung in der Sowjetunion", 
            year: 1920, 
            text: "",
            keywords: [""],
            image: "Bilder/Russlanddeutsche/XXX.jpg", // optional
            links: [
                { label: "XXX", url: "https://beispiel.de/karte" }
            ]
        },
        { 
            title: "Russlanddeutsche im Kalten Krieg", 
            year: 1955, 
            text: "",
            keywords: [""],
            image: "Bilder/Russlanddeutsche/XXX.jpg", // optional
            links: [
                { label: "XXX", url: "https://beispiel.de/karte" }
            ]
        },
        { 
            title: "Migration nach Deutschland", 
            year: 1987, 
            text: "",
            keywords: [""],
            image: "Bilder/Russlanddeutsche/XXX.jpg", // optional
            links: [
                { label: "XXX", url: "https://beispiel.de/karte" }
            ]
        },
        { 
            title: "Integration in Deutschland", 
            year: 1993, 
            text: "",
            keywords: [""],
            image: "Bilder/Russlanddeutsche/XXX.jpg", // optional
            links: [
                { label: "XXX", url: "https://beispiel.de/karte" }
            ] 
        },
        { 
            title: "Heute", 
            year: 2025, 
            text: "",
            keywords: [""],
            image: "Bilder/Russlanddeutsche/XXX.jpg", // optional
            links: [
                { label: "XXX", url: "https://beispiel.de/karte" }
            ] 
        }
    ],
    // ];

    // Zeitabschnitte; weitere sollten hier hinzugefügt werden 
    // export const periods = [ // Wenn auf einem Webserver
    // const periods = [
    periods: [
        {
            name: "Erste Ansiedlungswelle (1763-1789)", // Konnte keine offizielle Zeitspanne finden, weshalb ich die letzte Dorfsgründung, wie sie im Kursbuch angegeben ist, als Ende nahm; die EKD gibt z.B 1764-1773 an (https://www.ekd.de/ein-ueberblick-der-russlanddeutschen-geschichte-72351.htm)
            start: 1763,
            end: 1789,
            info: "Während der ersten Ansiedlungswelle, ausgelöst durch den „Kolonistenbrief“, kamen zwischen 1763 und 1774 rund 30.000 Zuwanderer, ein Großteil aus Hessen, Westfalen, Preußen und Norddeutschland nach Russland. Sie gründeten viele deutsche Siedlungen, hauptsächlich im Schwarzmeer- und unteren Wolgagebiet.",
            keywords: ["Ansiedlung", "Zuwanderung"],
            image: "Bilder/Russlanddeutsche/DeutscheAuswanderungnachRusslandvon1763bisMittedes19.Jahrhunderts.jpg",
            links: [
                { label: "Wikipedia-Artikel", url: "https://de.wikipedia.org/wiki/Russlanddeutsche" },
                { label: "Archivdokument", url: "https://beispiel.de/dokument.pdf" }
            ],
            subEvents: [
                {
                    year: 1764,
                    month: 6,
                    title: "Gründung von Dörfern im Wolgagebiet",
                    date: "Ab dem 29. Juni 1764",
                    text: "Von 1763 bis 1767 kamen aus dem Rheinland und Hessen Kolonisten über die Nord- und Ostsee nach St. Petersburg, dann Moskau und gelangten schließlich ins Wolgagebiet bei Saratov, wo sie über 100 Dörfer gründeten. Jeder Familie, unter den fast 26.000 Siedlern, wurde etwa 30 Hektar Land zugesprochen, wobei diese aber mit der Bodenbeschaffenheit und dem Klima nicht vertraut waren, was, zusammen mit Seuchen, Überfällen und Fluchten, ihre Anzahl stark verringerte und das Leben im Wolgagebiet erschwerte. Bis 1850 erreichten sie dann aber eine faste Verzehnfachung der Bevölkerung auf über 150.000 Menschen und einen gewissen Wohlstand, wurden dann aber in der zweiten Hälfte des 19. Jahrhunderts von erneuten Missernten und Hungernöten heimgesucht.",
                    keywords: ["Kolonien", "Gründung", "Dörfer"],
                    image: "Bilder/Russlanddeutsche/512px-Flag_of_Volga_Germans_(version).svg.png", // optional
                    links: [
                        { label: "Wikipedia-Artikel", url: "https://de.wikipedia.org/wiki/Wolgadeutsche" },
                        // { label: "Historische Karte", url: "XXX" }
                    ]
                },
                {
                    year: 1765,
                    month: 6,
                    title: "Gründung Belowescher-Kolonie",
                    date: "(Juni) 1765",
                    text: "Eine der ersten bedeutenden Siedlungen im heutigen Gebiet der Ukraine. XXX.",
                    keywords: [""],
                    image: "Bilder/Russlanddeutsche/XXX.jpg", // optional
                    links: [
                        { label: "Historische Karte", url: "https://beispiel.de/karte" }
                    ]
                },
                {
                    year: 1765,
                    month: 11,
                    title: "Gründung Riebensdorf",
                    date: "XXX XXX",
                    text: "XXX",
                    keywords: [""],
                    image: "Bilder/Russlanddeutsche/XXX.jpg", // optional
                    links: [
                        { label: "Historische Karte", url: "https://beispiel.de/karte" }
                    ]
                },
                {
                    year: 1765,
                    month: 4,
                    title: "Gründung Petersburg",
                    date: "XXX XXX",
                    text: "XXX",
                    keywords: [""],
                    image: "Bilder/Russlanddeutsche/XXX.jpg", // optional
                    links: [
                        { label: "Historische Karte", url: "https://beispiel.de/karte" }
                    ]
                },
                
                {
                    year: 1767,
                    month: 1,
                    title: "Gründung Jamburg",
                    date: "XXX XXX",
                    text: "XXX",
                    keywords: [""],
                    image: "Bilder/Russlanddeutsche/XXX.jpg", // optional
                    links: [
                        { label: "Historische Karte", url: "https://beispiel.de/karte" }
                    ]
                },
                {
                    year: 1782,
                    month: 1,
                    title: "Gründung Berislawer-Kolonie",
                    date: "XXX XXX",
                    text: "XXX",
                    keywords: [""],
                    image: "Bilder/Russlanddeutsche/XXX.jpg", // optional
                    links: [
                        { label: "Historische Karte", url: "https://beispiel.de/karte" }
                    ]
                },
                {
                    year: 1784,
                    month: 1,
                    title: "Gründung Mariopoler-Kolonie",
                    date: "XXX XXX",
                    text: "XXX",
                    keywords: [""],
                    image: "Bilder/Russlanddeutsche/XXX.jpg", // optional
                    links: [
                        { label: "Historische Karte", url: "https://beispiel.de/karte" }
                    ]
                },
                {
                    year: 1784,
                    month: 1,
                    title: "Gründung Josefstal",
                    date: "XXX XXX",
                    text: "XXX",
                    keywords: [""],
                    image: "Bilder/Russlanddeutsche/XXX.jpg", // optional
                    links: [
                        { label: "Historische Karte", url: "https://beispiel.de/karte" }
                    ]
                },
                {
                    year: 1784,
                    month: 1,
                    title: "Gründung Halbstädter-Kolonie",
                    date: "XXX XXX",
                    text: "XXX",
                    keywords: [""],
                    image: "Bilder/Russlanddeutsche/XXX.jpg", // optional
                    links: [
                        { label: "Historische Karte", url: "https://beispiel.de/karte" }
                    ]
                },
                {
                    year: 1786,
                    month: 1,
                    title: "Gründung Alt-Danzig",
                    date: "XXX XXX",
                    text: "XXX",
                    keywords: [""],
                    image: "Bilder/Russlanddeutsche/XXX.jpg", // optional
                    links: [
                        { label: "Historische Karte", url: "https://beispiel.de/karte" }
                    ]
                },
                {
                    year: 1789,
                    month: 6,
                    title: "Gründung Chortiza-Kolonie",
                    date: "XXX XXX",
                    text: "XXX",
                    keywords: [""],
                    image: "Bilder/Russlanddeutsche/XXX.jpg", // optional
                    links: [
                        { label: "Historische Karte", url: "https://beispiel.de/karte" }
                    ]
                }
            ]
        },

        {
            name: "Zweite Ansiedlungswelle (1804-18XX)",
            start: 1804,
            end: 1860,
            info: "XXX",
            keywords: [""],
            image: "Bilder/Russlanddeutsche/XXX.jpg", // optional
            links: [
                { label: "Wikipedia-Artikel", url: "https://de.wikipedia.org/wiki/Russlanddeutsche" },
                { label: "Archivdokument", url: "https://beispiel.de/dokument.pdf" }
            ],
            subEvents: [
                {
                    year: 1804,
                    month: 1,
                    title: "Gründung von XXX",
                    date: "XXX XXX",
                    text: "XXX",
                    keywords: [""],
                    image: "Bilder/Russlanddeutsche/XXX.jpg", // optional
                    links: [
                        { label: "Historische Karte", url: "https://beispiel.de/karte" }
                    ]
                },
                {
                    year: 1804,
                    month: 1,
                    title: "Gründung von XXX",
                    date: "XXX XXX",
                    text: "XXX",
                    keywords: [""],
                    image: "Bilder/Russlanddeutsche/XXX.jpg", // optional
                    links: [
                        { label: "Historische Karte", url: "https://beispiel.de/karte" }
                    ]
                },
                {
                    year: 1804,
                    month: 1,
                    title: "Gründung von XXX",
                    date: "XXX XXX",
                    text: "XXX",
                    keywords: [""],
                    image: "Bilder/Russlanddeutsche/XXX.jpg", // optional
                    links: [
                        { label: "Historische Karte", url: "https://beispiel.de/karte" }
                    ]
                }
            ]  
        },

        {
            name: "Erster Weltkrieg (1914-1918)",
            start: 1914,
            end: 1918,
            info: "XXX",
            keywords: [""],
            image: "Bilder/Russlanddeutsche/XXX.jpg", // optional
            links: [
                { label: "Wikipedia-Artikel", url: "https://de.wikipedia.org/wiki/Russlanddeutsche" },
                { label: "Archivdokument", url: "https://beispiel.de/dokument.pdf" }
            ],
            subEvents: [
                {
                    year: 1904,
                    month: 1,
                    title: "XXX",
                    date: "XXX XXX",
                    text: "XXX",
                    keywords: [""],
                    image: "Bilder/Russlanddeutsche/XXX.jpg", // optional
                    links: [
                        { label: "Historische Karte", url: "https://beispiel.de/karte" }
                    ]
                },
                {
                    year: 1904,
                    month: 1,
                    title: "XXX",
                    date: "XXX XXX",
                    text: "XXX",
                    keywords: [""],
                    image: "Bilder/Russlanddeutsche/XXX.jpg", // optional
                    links: [
                        { label: "Historische Karte", url: "https://beispiel.de/karte" }
                    ]
                },
                {
                    year: 1904,
                    month: 1,
                    title: "XXX",
                    date: "XXX XXX",
                    text: "XXX",
                    keywords: [""],
                    image: "Bilder/Russlanddeutsche/XXX.jpg", // optional
                    links: [
                        { label: "Historische Karte", url: "https://beispiel.de/karte" }
                    ]
                }
            ]  
        },

        {
            name: "Junge Sowjetunion und der Zweite Weltkrieg (1920-1945)", // Mir war zwar kein besserer Titel eingefallen, aber ich würde gerne bessere Vorschläge hören :D
            start: 1920,
            end: 1945,
            info: "XXX",
            keywords: [""],
            image: "Bilder/Russlanddeutsche/XXX.jpg", // optional
            links: [
                { label: "Wikipedia-Artikel", url: "https://de.wikipedia.org/wiki/Russlanddeutsche" },
                { label: "Archivdokument", url: "https://beispiel.de/dokument.pdf" }
            ],
            subEvents: [
                {
                    year: 1804,
                    month: 1,
                    title: "XXX",
                    date: "XXX XXX",
                    text: "XXX",
                    keywords: [""],
                    image: "Bilder/Russlanddeutsche/XXX.jpg", // optional
                    links: [
                        { label: "Historische Karte", url: "https://beispiel.de/karte" }
                    ]
                },
                {
                    year: 1804,
                    month: 1,
                    title: "XXX",
                    date: "XXX XXX",
                    text: "XXX",
                    keywords: [""],
                    image: "Bilder/Russlanddeutsche/XXX.jpg", // optional
                    links: [
                        { label: "Historische Karte", url: "https://beispiel.de/karte" }
                    ]
                },
                {
                    year: 1804,
                    month: 1,
                    title: "XXX",
                    date: "XXX XXX",
                    text: "XXX",
                    keywords: [""],
                    image: "Bilder/Russlanddeutsche/XXX.jpg", // optional
                    links: [
                        { label: "Historische Karte", url: "https://beispiel.de/karte" }
                    ]
                }
            ]  
        },

        {
            name: "Kalter Krieg (1945/46-1991)",
            start: 1946,
            end: 1991,
            info: "XXX",
            keywords: [""],
            image: "Bilder/Russlanddeutsche/XXX.jpg", // optional
            links: [
                { label: "Wikipedia-Artikel", url: "https://de.wikipedia.org/wiki/Russlanddeutsche" },
                { label: "Archivdokument", url: "https://beispiel.de/dokument.pdf" }
            ],
            subEvents: [
                {
                    year: 1804,
                    month: 1,
                    title: "XXX",
                    date: "XXX XXX",
                    text: "XXX",
                    keywords: [""],
                    image: "Bilder/Russlanddeutsche/XXX.jpg", // optional
                    links: [
                        { label: "Historische Karte", url: "https://beispiel.de/karte" }
                    ]
                },
                {
                    year: 1804,
                    month: 1,
                    title: "XXX",
                    date: "XXX XXX",
                    text: "XXX",
                    keywords: [""],
                    image: "Bilder/Russlanddeutsche/XXX.jpg", // optional
                    links: [
                        { label: "Historische Karte", url: "https://beispiel.de/karte" }
                    ]
                },
                {
                    year: 1804,
                    month: 1,
                    title: "XXX",
                    date: "XXX XXX",
                    text: "XXX",
                    keywords: [""],
                    image: "Bilder/Russlanddeutsche/XXX.jpg", // optional
                    links: [
                        { label: "Historische Karte", url: "https://beispiel.de/karte" }
                    ]
                }
            ]  
        },

        {
            name: "XXX",
            start: 1993,
            end: 2000,
            info: "XXX",
            keywords: [""],
            image: "Bilder/Russlanddeutsche/XXX.jpg", // optional
            links: [
                { label: "Wikipedia-Artikel", url: "https://de.wikipedia.org/wiki/Russlanddeutsche" },
                { label: "Archivdokument", url: "https://beispiel.de/dokument.pdf" }
            ],
            subEvents: [
                {
                    year: 1804,
                    month: 1,
                    title: "XXX",
                    date: "XXX XXX",
                    text: "XXX",
                    keywords: [""],
                    image: "Bilder/Russlanddeutsche/XXX.jpg", // optional
                    links: [
                        { label: "Historische Karte", url: "https://beispiel.de/karte" }
                    ]
                },
                {
                    year: 1804,
                    month: 1,
                    title: "XXX",
                    date: "XXX XXX",
                    text: "XXX",
                    keywords: [""],
                    image: "Bilder/Russlanddeutsche/XXX.jpg", // optional
                    links: [
                        { label: "Historische Karte", url: "https://beispiel.de/karte" }
                    ]
                },
                {
                    year: 1804,
                    month: 1,
                    title: "XXX",
                    date: "XXX XXX",
                    text: "XXX",
                    keywords: [""],
                    image: "Bilder/Russlanddeutsche/XXX.jpg", // optional
                    links: [
                        { label: "Historische Karte", url: "https://beispiel.de/karte" }
                    ]
                }
            ]  
        }
        // Weitere Zeitabschnitte...
    ],


    // Hintergrundbilder
    // window.timelineImages = [
    backgroundImages: [
        {
            src: "Bilder/Russlanddeutsche/krieg.jpg",
            alt: "Zweiter Weltkrieg",
            startYear: 1763,
            // endYear: 1945,
            width: 792,
            height: 1000
        },
        {
            src: "Bilder/Russlanddeutsche/wiederaufbau.webp",
            alt: "Wiederaufbau",
            startYear: 1800,
            // endYear: 1955,
            width: 3840,
            height: 2066
        },
        {
            src: "Bilder/Russlanddeutsche/emigration.webp",
            alt: "Emigration",
            startYear: 1840,
            // endYear: 1991,
            width: 1024,
            height: 683
        }
    ]
};




//          Interaktiver Zeitstrahl v17
//          Property of Joshua Ilse