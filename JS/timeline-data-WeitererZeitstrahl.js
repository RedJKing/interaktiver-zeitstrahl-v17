window.timelineData = {
    timelineTitle: "Zeitstrahlthema", // Wenn auf einem Webserver, müsste dies anders gemacht werden

    // Geschehnisse; weitere können hier hinzugefügt werden. Um Text Gänsefüßchen zu geben ("Text.") muss man \"Text.\" schreiben.    
    // export const events = [ // Wenn auf einem Webserver
    events: [
        { 
            title: "Dies", 
            year: 1, 
            text: "",
            keywords: [""], // optional
            image: "../Bilder/XXX/XXX.jpg", // optional
            links: [
                { label: "XXX", url: "https://XXX" } // optional
            ]
        },
        { 
            title: "Sind", 
            year: 25, 
            text: "",
            keywords: [""],
            image: "../Bilder/XXX/XXX.jpg", 
            links: [
                { label: "XXX", url: "https://XXX" }
            ] 
        },
        { 
            title: "Hauptereignisse", 
            year: 50, 
            text: "",
            keywords: [""],
            image: "../Bilder/XXX/XXX.jpg",
            links: [
                { label: "XXX", url: "https://XXX" }
            ] 
        },
    ],
    // ];

    // Zeitabschnitte; weitere sollten hier hinzugefügt werden 
    // export const periods = [ // Wenn auf einem Webserver
        periods: [
            {
            name: "Langjähriges Geschehnis",
            start: 3,
            end: 22,
            info: "Und",
            keywords: [""],
            image: "../Bilder/XXX/XXX.jpg",
            links: [
                { label: "XXX", url: "https://XXX" }
            ],
            subEvents: [
                {
                    year: 10,
                    month: 1,
                    title: "Ein Geschehnis",
                    date: "XXX XXX",
                    text: "Infos darüber",
                    keywords: [""],
                    image: "../Bilder/XXX/XXX.jpg",
                    links: [
                        { label: "XXX", url: "https://XXX" }
                    ]
                },

                {
                    year: 18,
                    month: 1,
                    title: "Weiteres Geschehnis",
                    date: "XXX XXX",
                    text: "Und Infos darüber",
                    keywords: [""],
                    image: "../Bilder/XXX/XXX.jpg",
                    links: [
                        { label: "XXX", url: "https://XXX" }
                    ]
                }
            ]
        },

        {
            name: "Noch ein langjähriges Ereignis",
            start: 27,
            end: 48,
            info: "Zeitspannen",
            keywords: [""],
            image: "../Bilder/XXX/XXX.jpg",
            links: [
                { label: "XXX", url: "https://XXX" }
            ],
            subEvents: [
                {
                    year: 33,
                    month: 1,
                    title: "Und noch ein Geschehnis",
                    date: "XXX XXX",
                    text: "Mehr Infos...yay",
                    keywords: [""],
                    image: "../Bilder/XXX/XXX.jpg",
                    links: [
                        { label: "XXX", url: "https://XXX" }
                    ]
                },

                {
                    year: 44,
                    month: 1,
                    title: "Wer hätte es gedacht, es ist ein weiteres Geschehnis",
                    date: "XXX XXX",
                    text: "Und die Infos darüber",
                    keywords: [""],
                    image: "../Bilder/XXX/XXX.jpg",
                    links: [
                        { label: "XXX", url: "https://XXX" }
                    ]
                }
            ]  
        }
        // Weitere Zeitabschnitte...
    ]
};


//          Interaktiver Zeitstrahl v17
//          Property of Joshua Ilse