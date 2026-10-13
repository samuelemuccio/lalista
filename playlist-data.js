// Dati editoriali e video importati dalla curatela YouTube.
const TRACK_DATA = {
  "lista": [
    {
      "id": "top-01",
      "num": "01",
      "arc": "amber",
      "artist": "Michael Kiwanuka",
      "title": "Cold Little Heart",
      "album": "Love & Hate",
      "youtubeId": "FngDSOuCNAA",
      "youtubeVariants": [
        {
          "youtubeId": "FngDSOuCNAA",
          "iframe": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/FngDSOuCNAA?si=GsTOlJKDgZp951ld\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
          "label": "Live"
        },
        {
          "youtubeId": "FGG5K1XLgkA",
          "iframe": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/FGG5K1XLgkA?si=6u1Sj-TNxlEKCUUF\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
          "label": "Album"
        }
      ],
      "note": "È semplicemente stupenda, non so quante volte io l'abbia ascoltata, mi ricorda molto i Pink Floyd ma con una veste black."
    },
    {
      "id": "top-02",
      "num": "02",
      "arc": "amber",
      "artist": "Lil Yachty, Diana Gordon",
      "title": "drive ME crazy!",
      "album": "Let’s Start Here.",
      "youtubeId": "dGgBzSfgVsA",
      "alternatives": [
        {
          "artist": "Lil Yachty",
          "title": "the BLACK seminole.",
          "album": "Let’s Start Here.",
          "youtubeId": "J8l2kS4U8EE"
        },
        {
          "artist": "Lil Yachty",
          "title": "IVE OFFICIALLY LOST ViSiON!!!!",
          "album": "Let’s Start Here.",
          "youtubeId": "IwyjxAWsUtM"
        }
      ],
      "note": "Quest'album in generale è stato una svolta totale, nessuno si aspettava da Lil Yachty un cambio di rotta del genere, super psichedelico. La voce celestiale di Diana Gordon poi è la ciliegina sulla torta."
    },
    {
      "id": "top-03",
      "num": "03",
      "arc": "amber",
      "artist": "CASIOPEA",
      "title": "ミッドナイト・ランデブー (Midnight Rendezvous)",
      "album": "CASIOPEA",
      "youtubeId": "4Hvvltt7d-U",
      "note": "Fanno un jazz-fusion giapponese assurdo, hanno una vibe e un'energia incredibile, sembra di stare letteralmente in una pista di Mario Kart.",
      "alternatives": [
        {
          "artist": "CASIOPEA",
          "title": "スワロー (Swallow)",
          "album": "Super Flight",
          "youtubeId": "Qe5BmH_-TFA"
        },
        {
          "artist": "CASIOPEA",
          "title": "ダズリング (Dazzling)",
          "album": "Photographs",
          "youtubeId": "Ufvbtb5PzjU"
        }
      ]
    },
    {
      "id": "top-04",
      "num": "04",
      "arc": "amber",
      "artist": "Pino Daniele",
      "title": "Sotto ’O Sole (Alternative Version)",
      "album": "Sotto 'o Sole",
      "youtubeId": "88wFJb0itYQ",
      "note": "Masayoshi Esposito!"
    },
    {
      "id": "top-05",
      "num": "05",
      "arc": "amber",
      "artist": "Mandrill",
      "title": "Peace And Love - Movement IV",
      "album": "Mandrill",
      "youtubeId": "OONDL7c6aGU",
      "note": "I Mandrill da Brooklyn nel 1971 fecero semplicemente un capolavoro funk, come tutto l'album o altri loro brani storici come <em>Fencewalk</em>, <em>Ape Is High</em> e <em>Mango Meat</em>."
    },
    {
      "id": "top-06",
      "num": "06",
      "arc": "amber",
      "artist": "Miley Cyrus, Brittany Howard",
      "title": "Walk of Fame",
      "album": "Something Beautiful",
      "youtubeId": "JX2GkxNT-IQ",
      "note": "Ha una voce allucinante, lontanissima dal pop di plastica. Tutto l'album è da ascoltare perché ha una cura nei dettagli e un gusto molto chic glam, clamoroso.",
      "alternatives": [
        {
          "artist": "Miley Cyrus",
          "title": "Something Beautiful",
          "album": "Something Beautiful",
          "youtubeId": "y2nu8zpVBmY"
        }
      ]
    },
    {
      "id": "top-07",
      "num": "07",
      "arc": "terracotta",
      "artist": "Lucio Battisti",
      "title": "Due mondi",
      "album": "Anima Latina",
      "youtubeId": "H31Zo2Clm0E",
      "note": "<strong>Anima Latina</strong> per me è il disco più bello di Battisti in assoluto e nella lista dei miei album preferiti, ne sono totalmente innamorato. Questo pezzo ha un groove afro-brasiliano e percussioni assurde, parla di due persone diverse che si cercano e si fondono insieme.",
      "alternatives": [
        {
          "artist": "Lucio Battisti",
          "title": "Abbracciala abbracciali",
          "album": "Anima Latina",
          "youtubeId": "9RBF19FzUrA"
        },
        {
          "artist": "Lucio Battisti",
          "title": "Anima latina",
          "album": "Anima Latina",
          "youtubeId": "BQZysfcTyRQ"
        },
        {
          "artist": "Lucio Battisti",
          "title": "Questo inferno rosa",
          "album": "Il nostro caro angelo",
          "youtubeId": "_tx-tdCqP7k"
        },
        {
          "artist": "Lucio Battisti",
          "title": "I sacchi della posta",
          "album": "La sposa occidentale",
          "youtubeId": "0VeW4BNL16g",
          "note": "Peak degli 'album bianchi' scritti con Pasquale Panella, dischi rivoluzionari e futuristici, avanti di decenni e all'epoca incompresi. Purtroppo per questioni di diritti non si trovano facilmente, ed è un peccato enorme."
        }
      ]
    },
    {
      "id": "top-08",
      "num": "08",
      "arc": "terracotta",
      "artist": "Lucio Dalla",
      "title": "Stella di mare",
      "album": "Lucio Dalla",
      "youtubeId": "Jq2tcDNeSC8",
      "note": "Dio mio quanto è bella questa canzone."
    },
    {
      "id": "top-09",
      "num": "09",
      "arc": "plum",
      "artist": "RAYE, The Heritage Orchestra",
      "title": "Oscar Winning Tears. (Live at The Royal Albert Hall)",
      "album": "My 21st Century Symphony.",
      "youtubeId": "BtdBQ1-fzXM",
      "note": "<p>Una prova vocale e orchestrale monumentale alla Royal Albert Hall con The Heritage Orchestra, puro pathos cinematografico. Penso che ascoltarla dal vivo sia assurdo.</p><p class='note-anecdote'><em>(E ti consiglio vivamente di ascoltare anche l'alternativa — <strong>I Will Overcome</strong> registrata agli Abbey Road Studios con la London Symphony Orchestra — perché merita tantissimo: RAYE ha una voce della Madonna e un gusto musicale unico, è un'artista davvero straordinaria).</em></p>",
      "alternatives": [
        {
          "artist": "RAYE, London Symphony Orchestra",
          "title": "I Will Overcome (Live at Abbey Road Studios)",
          "album": "Abbey Road Sessions",
          "youtubeId": "Iy2FoVeIUXs",
          "note": "Registrata con la leggendaria London Symphony Orchestra agli Abbey Road Studios: un inno potentissimo scritto da RAYE in un momento di crisi, con una voce straordinaria e testo viscerale. Ascoltala."
        },
        {
          "artist": "RAYE, The Heritage Orchestra",
          "title": "The Thrill Is Gone. / Requiem (Live at The Royal Albert Hall)",
          "album": "My 21st Century Symphony.",
          "youtubeId": "ob6rhoog11c"
        }
      ]
    },
    {
      "id": "top-10",
      "num": "10",
      "arc": "plum",
      "artist": "C.S.I.",
      "title": "E Ti Vengo A Cercare",
      "album": "Linea Gotica",
      "youtubeId": "yjT7C1hBFaI",
      "note": "<strong>Linea Gotica</strong> è un capolavoro della musica italiana. Questa rilettura di Battiato ha un'intensità e una delicatezza disarmante.",
      "alternatives": [
        {
          "artist": "C.S.I.",
          "title": "Cupe Vampe",
          "album": "Linea Gotica",
          "youtubeId": "yoL5keSkTAU"
        },
        {
          "artist": "C.S.I.",
          "title": "Depressione Caspica",
          "album": "Linea Gotica",
          "youtubeId": "WI5E4Nv0YZg"
        }
      ]
    },
    {
      "id": "top-11",
      "num": "11",
      "arc": "plum",
      "artist": "Radiohead",
      "title": "You and Whose Army?",
      "album": "Amnesiac",
      "youtubeId": "QQnc-hM80UQ",
      "note": "Registrato con Thom Yorke che canta letteralmente appiccicato al microfono su un pianoforte intimo e cupo. Spero che prima o poi possano piacerti i Radiohead. Io amo Amnesiac e Kid A, tant'è che ho il vinile con entrambi gli album insieme: non credo esista qualcosa di simile al mondo.",
      "alternatives": [
        {
          "artist": "Radiohead",
          "title": "Everything in Its Right Place",
          "album": "Kid A",
          "youtubeId": "NUnXxh5U25Y"
        },
        {
          "artist": "Radiohead",
          "title": "Nude",
          "album": "In Rainbows",
          "youtubeId": "BbWBRnDK_AE"
        }
      ]
    },
    {
      "id": "top-12",
      "num": "12",
      "arc": "slate",
      "artist": "Masayoshi Takanaka",
      "title": "YOU CAN NEVER COME TO THIS PLACE",
      "album": "The Rainbow Goblins",
      "youtubeId": "i7QC2XAe4hA",
      "note": "<strong>The Rainbow Goblins</strong> è un concept album pazzesco ispirato alla fiaba di Ul de Rico sui goblin che rubano i colori dell'arcobaleno. Questo pezzo è il finale, la chitarra racconta tutta la storia senza bisogno di parole. Takanaka è uno dei miei chitarristi preferiti in assoluto.",
      "alternatives": [
        {
          "artist": "Masayoshi Takanaka",
          "title": "SEVEN GOBLINS",
          "album": "The Rainbow Goblins",
          "youtubeId": "dr2CMlflcEs"
        }
      ]
    },
    {
      "id": "top-13",
      "num": "13",
      "arc": "slate",
      "artist": "Pink Floyd",
      "title": "The Gunner’s Dream",
      "album": "The Final Cut",
      "youtubeId": "lIJN6WWf3Rg",
      "note": "<p>Da <strong>The Final Cut</strong>. Il momento in cui la voce straziata di Waters sfuma ed entra il sax ti giuro mi fa commuovere, sembra una lama.</p><p><em>(E scusa Ari, ma non sapevo proprio come fare con i brani dei Pink Floyd... non si vede per niente che sono la mia band preferita! Anzi, ho cercato di limitarmi il più possibile per non fare un mappazzone, avrei voluto metterne altre 100. Tra l'altro stavo per metterti anche In The Flesh? e Don’t Leave Me Now da The Wall, ma quelle probabilmente le conosci già benissimo!).</em></p>",
      "alternatives": [
        {
          "artist": "Pink Floyd",
          "title": "High Hopes",
          "album": "The Division Bell",
          "youtubeId": "pDKPz6KD8fs",
          "note": "La campana che rintocca, la slide guitar celestiale di Gilmour e la malinconia del tempo che fugge. La chiusura perfetta dell'era Floyd."
        },
        {
          "artist": "Pink Floyd",
          "title": "Biding My Time",
          "album": "Relics",
          "youtubeId": "UE_kwD9CMnQ",
          "note": "Un blues lento e fumoso a 12 battute dell'era <em>Ummagumma</em> (parte della suite <em>The Man and the Journey</em>), con Rick Wright al trombone e un assolo blues grezzo di Gilmour. <em>(Nelle versioni trovi sia la traccia in studio che il rarissimo live ad Amsterdam del 1969!)</em>",
          "youtubeVariants": [
            {
              "youtubeId": "UE_kwD9CMnQ",
              "iframe": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/UE_kwD9CMnQ?si=TzjjdyX9AjhJ0BPC\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
              "label": "Album"
            },
            {
              "youtubeId": "XcxAvIcXeL8",
              "iframe": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/XcxAvIcXeL8?si=1D0poSajCtzPgWOs\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
              "label": "Live 1969"
            }
          ]
        },
        {
          "artist": "Pink Floyd",
          "title": "Sorrow",
          "album": "A Momentary Lapse of Reason",
          "youtubeId": "uph_1gDITUY",
          "note": "Monumento sonoro di Gilmour: quel riff d'apertura colossale fu inciso suonando dentro il Los Angeles Sports Arena vuoto per sfruttare l'eco di uno stadio intero. <em>(Nelle versioni c'è sia l'album che la leggendaria esecuzione da PULSE!)</em>",
          "youtubeVariants": [
            {
              "youtubeId": "uph_1gDITUY",
              "iframe": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/uph_1gDITUY?si=r3esOPhdB34oG04S\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
              "label": "Album"
            },
            {
              "youtubeId": "JdPTec5ADFE",
              "iframe": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/JdPTec5ADFE?si=xxMjERQZzuXqGqmf\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
              "label": "Live PULSE"
            }
          ]
        },
        {
          "artist": "Pink Floyd",
          "title": "Stay",
          "album": "Obscured by Clouds",
          "youtubeId": "Exz1nAgP2RU",
          "note": "Una gemma dolcissima e intima cantata con voce calda e fragile da Richard Wright al piano elettrico, con la chitarra a pedale di Gilmour che piange in lontananza."
        },
        {
          "artist": "Pink Floyd",
          "title": "San Tropez",
          "album": "Meddle",
          "youtubeId": "mjNYO-OI2Fo",
          "note": "Parentesi acustica e scanzonata da <em>Meddle</em>: un jazz/bossa nova solare scritto da Roger Waters con pianoforte da saloon e chitarra slide, come una pigra cartolina estiva."
        },
        {
          "artist": "Pink Floyd",
          "title": "Julia Dream",
          "album": "Relics",
          "youtubeId": "kchY5ff6uqA",
          "note": "Una fiaba psichedelica oscura e sognante del 1968: la voce giovanissima ed eterea di David Gilmour sussurra su una chitarra acustica acida e il mellotron flautato di Rick Wright. Una perla d'altri tempi."
        },
        {
          "artist": "Pink Floyd",
          "title": "What Do You Want From Me",
          "album": "The Division Bell",
          "youtubeId": "3v6Wbv-rEs0",
          "note": "Sempre da <em>The Division Bell</em>: un groove funk-blues avvolgente con cori gospel femminili e una chitarra tagliente, in cui Gilmour si interroga sulle aspettative impossibili del pubblico."
        }
      ]
    }
  ],
  "prog": [
    {
      "id": "prog-01",
      "num": "01",
      "arc": "prog",
      "artist": "Supertramp",
      "title": "The Logical Song",
      "album": "Breakfast in America",
      "youtubeId": "kln_bIndDJg"
    },
    {
      "id": "prog-02",
      "num": "02",
      "arc": "prog",
      "artist": "Emerson, Lake & Palmer",
      "title": "From the Beginning",
      "album": "Trilogy",
      "youtubeId": "0Yryg8sc6pE",
      "note": "<p>In studio Greg Lake incise due tracce sovrapposte di chitarra per dare quel suono pieno e avvolgente, mentre dal vivo non potendosi sdoppiare suonava la sua leggendaria <strong>Ovation Pacemaker 12-String (Model 1615)</strong>.</p><p>Tra l'altro Greg Lake era anche la voce e il basso dei primissimi King Crimson, nei capolavori <em>In the Court of the Crimson King</em> e <em>In the Wake of Poseidon</em>.</p><p>Un'altra perla totale degli ELP è l'album <strong>Brain Salad Surgery</strong> (1973), un disco incredibile con brani assurdi come <em>Benny the Bouncer</em> o la suite <em>Karn Evil 9</em>. La copertina storica fu dipinta dal maestro svizzero <strong>H.R. Giger</strong> ed è il manifesto assoluto dell'estetica <strong>Biomeccanica</strong>, una fusione tra anatomia organica, ossa, cavi e ingranaggi alieni.</p><p>È esattamente lo stesso artista geniale che pochi anni dopo creò il design iconico e lo Xenomorfo di <strong>Alien</strong> (1979) di Ridley Scott vincendo l'Oscar, un immaginario che ha segnato la storia del cinema e ha ispirato decenni dopo anche videogiochi come <strong>Scorn</strong> (gioco fighissimo). Da citare assolutamente anche <em>Tarkus</em> con la sua celebre creatura corazzata a metà tra istrice e carro armato.</p><div class=\"popover-gallery-section\"><div class=\"popover-gallery-header\"><span class=\"gallery-header-title\">Galleria visiva</span></div><div class=\"popover-gallery-grid\"><div class=\"popover-gallery-item\" data-zoom-src=\"ovation-pacemaker-12-string.png\" data-zoom-caption=\"Ovation Pacemaker 12-String (Model 1615) di Greg Lake\"><div class=\"popover-img-wrap\"><img src=\"ovation-pacemaker-12-string.png\" alt=\"Ovation Pacemaker 12-String (Model 1615)\" class=\"popover-gear-img popover-gear-png\"><button class=\"btn-image-expand\" type=\"button\" aria-label=\"Ingrandisci Ovation 12-String\" title=\"Ingrandisci immagine\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg></button></div><span class=\"popover-gear-caption\">Ovation 12-String di Greg Lake</span></div><div class=\"popover-gallery-item\" data-zoom-src=\"elp-brain-salad-surgery.jpg\" data-zoom-caption=\"Brain Salad Surgery (1973), copertina dipinta da H.R. Giger\"><div class=\"popover-img-wrap\"><img src=\"elp-brain-salad-surgery.jpg\" alt=\"Cover Brain Salad Surgery di H.R. Giger\" class=\"popover-gear-img\"><button class=\"btn-image-expand\" type=\"button\" aria-label=\"Ingrandisci cover Brain Salad Surgery\" title=\"Ingrandisci immagine\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg></button></div><span class=\"popover-gear-caption\">Brain Salad Surgery (Cover H.R. Giger)</span></div><div class=\"popover-gallery-item\" data-zoom-src=\"hr-giger-alien-art.webp\" data-zoom-caption=\"H.R. Giger con le sculture biomeccaniche di Alien (1979)\"><div class=\"popover-img-wrap\"><img src=\"hr-giger-alien-art.webp\" alt=\"H.R. Giger e l'estetica di Alien\" class=\"popover-gear-img\"><button class=\"btn-image-expand\" type=\"button\" aria-label=\"Ingrandisci H.R. Giger e Alien\" title=\"Ingrandisci immagine\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg></button></div><span class=\"popover-gear-caption\">H.R. Giger e l'estetica di Alien</span></div></div></div><div class=\"popover-scorn-feature\"><div class=\"scorn-feature-head\"><span class=\"scorn-feature-tag\">Videogioco ispirato all'arte di H.R. Giger</span><strong class=\"scorn-feature-title\">Scorn — Trailer Ufficiale</strong></div><div class=\"scorn-video-player-wrap\"><iframe src=\"https://www.youtube.com/embed/muXiufO9dXg\" title=\"Scorn Trailer Ufficiale\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen loading=\"lazy\"></iframe></div><span class=\"scorn-feature-caption\">Un videogioco interamente costruito attorno all'immaginario biomeccanico e organico di Giger.</span></div>",
      "alternatives": [
        {
          "artist": "Emerson, Lake & Palmer",
          "title": "Benny the Bouncer",
          "album": "Brain Salad Surgery",
          "youtubeId": "3NxcyYM7vFU",
          "note": "Un pezzo folle e divertentissimo da Brain Salad Surgery in stile saloon scanzonato e rissa da pub con testo delirante, in pieno contrasto con le suite cosmiche dell'album."
        }
      ]
    },
    {
      "id": "prog-03",
      "num": "03",
      "arc": "prog",
      "artist": "Premiata Forneria Marconi",
      "title": "Impressioni di Settembre",
      "album": "Storia di un minuto",
      "youtubeId": "DS76YKxiOKU",
      "note": "<p>Il sintetizzatore <strong>Moog</strong> in Italia fu introdotto proprio con questa canzone, per incidere quel leggendario riff si fecero prestare il primissimo prototipo <em>Minimoog</em> arrivato nel nostro Paese.</p><p>Fu un suono assurdo, mai sentito prima in Italia, che rivoluzionò completamente il modo di fare musica e fece esplodere l'intera stagione del progressive rock nostrano.</p><p><p class='note-anecdote'><em>(E pensa che mio nonno, ispirato proprio da loro, portò un synth dall'America per suonarlo in Sicilia quando nessuno sapeva manco cosa fosse).</em></p></p>",
      "youtubeVariants": [
        {
          "youtubeId": "DS76YKxiOKU",
          "iframe": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/DS76YKxiOKU?si=UoZPa5FLNbBZOaAX\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
          "label": "Live"
        },
        {
          "youtubeId": "hzy6sGiLGqM",
          "iframe": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/hzy6sGiLGqM?si=971N2I66AFHQ2Hfr\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
          "label": "Album"
        }
      ]
    },
    {
      "id": "prog-04",
      "num": "04",
      "arc": "prog",
      "artist": "Genesis",
      "title": "Firth of Fifth",
      "album": "Selling England By the Pound",
      "youtubeId": "Rz-tHZEr37I"
    },
    {
      "id": "prog-05",
      "num": "05",
      "arc": "prog",
      "artist": "Camel",
      "title": "Lady Fantasy (Medley)",
      "album": "Mirage",
      "youtubeId": "UgL-Pvuklcc",
      "note": "Un capolavoro assoluto del prog rock in forma di suite/medley diviso in tre movimenti (Encounter / Smiles for You / Lady Fantasy), chitarre celestiali di Latimer, tastiere avvolgenti e continui cambi di atmosfera.",
      "alternatives": [
        {
          "artist": "Agitation Free",
          "title": "Laila, Pt. 1",
          "album": "Malesch",
          "youtubeId": "DMVguH34LMM"
        }
      ]
    },
    {
      "id": "prog-06",
      "num": "06",
      "arc": "prog",
      "artist": "King Crimson",
      "title": "Ladies of the Road",
      "album": "Islands",
      "youtubeId": "sckkHW487y0",
      "note": "Da <em>Islands</em> (1971), con cori e armonie vocali che ricordano tantissimo i Beatles e un sax sporco blues pazzesco. Nelle alternative trovi anche la poesia di <strong>Matte Kudasai</strong>, <strong>Fallen Angel</strong> da <em>Red</em>, e <strong>Peoria</strong> registrata grezza dal vivo.",
      "alternatives": [
        {
          "artist": "King Crimson",
          "title": "Matte Kudasai",
          "album": "Discipline",
          "youtubeId": "EAWpBRPG-hg",
          "note": "Uno dei brani più dolci e poetici dei King Crimson, cantato da Adrian Belew con chitarre d'atmosfera sognanti di Robert Fripp e un testo intimo («Matte Kudasai» in giapponese significa «ti prego, aspettami»).",
          "youtubeVariants": [
            {
              "youtubeId": "EAWpBRPG-hg",
              "iframe": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/EAWpBRPG-hg?si=RU0bYShgvJYbzeCA\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
              "label": "Live"
            },
            {
              "youtubeId": "eoAupjcnm1c",
              "iframe": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/eoAupjcnm1c?si=udC76a-9MG8gcQAV\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
              "label": "Album"
            }
          ]
        },
        {
          "artist": "King Crimson",
          "title": "Fallen Angel (Elemental Mix)",
          "album": "Red",
          "youtubeId": "StJ35MJxDaI",
          "note": "Da <strong>Red</strong>, uno dei loro dischi più monumentali, adoro il contrasto tra la parte melodica e le chitarre abrasive. Ma anche perché <em>Starless</em> la conoscevi già, ti consiglio di ascoltarti le versioni live dei loro album, che secondo me sono ancora meglio delle versioni in studio, e anche l'Elemental Mix uscita di recente, che cambia di molto il mixaggio dei brani."
        },
        {
          "artist": "King Crimson",
          "title": "Indiscipline",
          "album": "Discipline",
          "youtubeId": "JIBsSZvmSN0",
          "youtubeVariants": [
            {
              "youtubeId": "JIBsSZvmSN0",
              "iframe": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/JIBsSZvmSN0?si=8vQup4PEqcOu3Knk\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
              "label": "Live"
            },
            {
              "youtubeId": "tH3phKBbVLs",
              "iframe": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/tH3phKBbVLs?si=DtGWRmNfpddYTgmp\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
              "label": "Album"
            }
          ]
        },
        {
          "artist": "King Crimson",
          "title": "Peoria (Live in cassetta)",
          "album": "Earthbound (1972)",
          "youtubeId": "ES_JxIBwQ6w"
        }
      ]
    },
    {
      "id": "prog-07",
      "num": "07",
      "arc": "prog",
      "artist": "Jethro Tull",
      "title": "My God",
      "album": "Aqualung",
      "youtubeId": "5WSulenOUb0",
      "note": "<p>Il brano è una critica feroce all'ipocrisia della religione istituzionalizzata: parla di come la società abbia ingabbiato Dio in una «gabbia dorata» di dogmi e convenzioni, dimenticando che la vera spiritualità è qualcosa di intimo che vive dentro ciascuno di noi (<em>«He's inside you and me»</em>).</p><p>La versione che ho messo qui è un live storico ed è un bel po' diversa da quella dell'album, soprattutto per tutta la parte del flauto traverso. Personalmente preferisco la versione album rispetto a questo live (quella incisa su disco ha un equilibrio e una compostezza magnifici), però ci tenevo a farti vedere questo video per farti capire la pura «pazzia» e la sfrenata teatralità di Ian Anderson sul palco: tra sguardi allucinati e assoli selvaggi al flauto suonato su una gamba sola, fa capire quanto fossero folli e viscerali dal vivo.</p><p class='note-anecdote'><em>(Comunque nel selettore delle versioni puoi passare tranquillamente dal <strong>Live</strong> alla versione <strong>Album</strong> in studio per confrontarle!)</em></p>",
      "alternatives": [
        {
          "artist": "Jethro Tull",
          "title": "Aqualung",
          "album": "Aqualung",
          "youtubeId": "lO8a369YOQk",
          "youtubeVariants": [
            {
              "youtubeId": "lO8a369YOQk",
              "iframe": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/lO8a369YOQk?si=ksgbXi954K_6URc-\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
              "label": "Live"
            },
            {
              "youtubeId": "N4zPu3ISCGs",
              "iframe": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/N4zPu3ISCGs?si=0JiuG05Db6ujJx8s\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
              "label": "Album"
            }
          ]
        }
      ],
      "youtubeVariants": [
        {
          "youtubeId": "5WSulenOUb0",
          "iframe": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/5WSulenOUb0?si=5INvg1PaYoi50H-t\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
          "label": "Live"
        },
        {
          "youtubeId": "U4P5dsPvRIA",
          "iframe": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/U4P5dsPvRIA?si=kzRHFFIsUzFvh1Lz\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
          "label": "Album"
        }
      ]
    },
    {
      "id": "prog-08",
      "num": "08",
      "arc": "prog",
      "artist": "Pink Floyd",
      "title": "Fat Old Sun",
      "album": "Atom Heart Mother",
      "youtubeId": "x7ZZZxjhL3k",
      "note": "<p>Una delle composizioni pastorali più magiche di David Gilmour da <strong>Atom Heart Mother</strong> (1970). I rintocchi di campana in lontananza, l'atmosfera estiva al tramonto e poi quel leggendario assolo finale di chitarra che spicca il volo.</p><p>Pensa che nella versione in studio Gilmour ha inciso quasi tutto lui: voce solista, chitarra acustica, chitarra elettrica, basso e persino la batteria!</p><p class='note-anecdote'><em>(Nelle versioni video trovi sia la traccia dall'<strong>Album</strong> originale che una versione <strong>Live BBC</strong> del 1971 spettacolare e dilatata, dove il solo finale diventa una cavalcata psichedelica pazzesca).</em></p>",
      "alternatives": [
        {
          "artist": "Pink Floyd",
          "title": "Have A Cigar",
          "album": "Wish You Were Here",
          "youtubeId": "Eq8ZiZ9xiLw",
          "note": "Un funk-prog caustico e tagliente che prende in giro il cinismo dell'industria discografica («Which one's Pink?»), cantato dall'ospite d'onore Roy Harper."
        },
        {
          "artist": "Pink Floyd",
          "title": "Atom Heart Mother",
          "album": "Atom Heart Mother",
          "youtubeId": "gLhYOdTSQHA",
          "note": "La monumentale suite orchestrale da 23 minuti con ottoni e coro, un viaggio sonoro da ascoltare con calma in cuffia."
        },
        {
          "artist": "Pink Floyd",
          "title": "Us and Them",
          "album": "The Dark Side of the Moon",
          "youtubeId": "HoLhKJuGhK0",
          "note": "Probabilmente la conoscerai già (è uno dei picchi assoluti di <em>The Dark Side of the Moon</em>), ma se non l'hai mai ascoltata con attenzione in cuffia, fermati perché è assurda: sequenza ipnotica al piano di Wright e sax vellutato di Dick Parry."
        }
      ],
      "youtubeVariants": [
        {
          "youtubeId": "x7ZZZxjhL3k",
          "iframe": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/x7ZZZxjhL3k?si=APjUmzO3pRc1B-EV\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
          "label": "Album"
        },
        {
          "youtubeId": "V0DhkRSoiCc",
          "iframe": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/V0DhkRSoiCc?si=_u1gwUZQIXNXCr4E\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
          "label": "Live BBC"
        }
      ]
    },
    {
      "id": "prog-09",
      "num": "09",
      "arc": "prog",
      "artist": "TOOL",
      "title": "Pneuma",
      "album": "Fear Inoculum",
      "youtubeId": "5ClCaPmAA7s",
      "note": "I TOOL sono una band fuori scala. In <strong>Lateralus</strong> (il disco del 2001) hanno composto strofe e sillabe seguendo la sequenza di Fibonacci. <em>Pneuma</em> è il loro capolavoro recente, 12 minuti di pura trance poliritmica guidati dalla batteria pazzesca di Danny Carey.",
      "alternatives": [
        {
          "artist": "TOOL",
          "title": "Schism",
          "album": "Lateralus",
          "youtubeId": "MM62wjLrgmA",
          "note": "Il brano più iconico e premiato dei TOOL, celebre linea di basso in tempi dispari con alternanza continua tra 5/8 e 7/8, unita al testo sulla frattura e riconnessione umana. Capolavoro assoluto del prog-metal."
        },
        {
          "artist": "TOOL",
          "title": "The Pot",
          "album": "10,000 Days",
          "youtubeId": "civuoU_NE38",
          "note": "Uno dei brani più potenti e celebri della band, Maynard James Keenan che canta in un falsetto ipnotico su una linea di basso funky-heavy mastodontica di Justin Chancellor e i poliritmi di Danny Carey."
        }
      ]
    },
    {
      "id": "prog-10",
      "num": "10",
      "arc": "prog",
      "artist": "Frank Zappa",
      "title": "Watermelon In Easter Hay",
      "album": "Joe’s Garage",
      "youtubeId": "Fn9ZuGquwpQ",
      "note": "Frank Zappa considerava questo il miglior assolo di chitarra di tutta la sua vita, ed è un pezzo così intimo e sacro che dopo la sua scomparsa la famiglia ha chiesto che nessuno lo suonasse mai più dal vivo."
    },
    {
      "id": "prog-11",
      "num": "11",
      "arc": "prog",
      "artist": "The Doors",
      "title": "The End",
      "album": "The Doors",
      "youtubeId": "VScSEXRwUqQ",
      "note": "Il finale definitivo, psichedelico e teatrale. Quello reso immortale da Coppola all'inizio di Apocalypse Now, va ascoltato rigorosamente al buio e a volume alto."
    },
    {
      "id": "prog-12",
      "num": "12",
      "arc": "prog",
      "artist": "Black Sabbath",
      "title": "Planet Caravan",
      "album": "Paranoid",
      "youtubeId": "W6sVXK9o0Ys",
      "note": "La gemma psichedelica e sognante dei Black Sabbath: congas ipnotiche, pianoforte jazzato, chitarra pulitissima e la voce di Ozzy Osbourne filtrata. Un proto-prog notturno favoloso. Probabilmente la conosci già, ma ci tenevo a metterla."
    }
  ],
  "honorable": [
    {
      "id": "hon-01",
      "num": "01",
      "arc": "honorable",
      "artist": "Daniela Pes",
      "title": "Illa Sera",
      "album": "SPIRA",
      "youtubeId": "FCHPla9hceI",
      "note": "Daniela Pes è un'artista sarda che canta letteralmente in una lingua creata da lei, mescolando fonemi e suoni galluresi con l'elettronica scura di Iosonouncane. L'album <em>SPIRA</em> è un viaggio ancestrale assurdo.",
      "alternatives": [
        {
          "artist": "Daniela Pes",
          "title": "Ca milla dia dè",
          "album": "Musicultura 2018",
          "youtubeId": "-9jFPY-sif4",
          "youtubeVariants": [
            {
              "youtubeId": "-9jFPY-sif4",
              "iframe": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/-9jFPY-sif4?si=-vj-2nHum3e0fp1j\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
              "label": "Live"
            },
            {
              "youtubeId": "WVTOhljfHt4",
              "iframe": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/WVTOhljfHt4?si=gU5Vk-ccjWtJ_apr\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
              "label": "Album"
            }
          ],
          "note": "Il brano con cui Daniela Pes ha conquistato Musicultura nel 2018, fonetica arcaica in gallurese antico ispirata alle poesie di Don Gavino Pes, fusa con un'elettronica sciamanica ipnotica."
        },
        {
          "artist": "Daniela Pes",
          "title": "Carme",
          "album": "SPIRA",
          "youtubeId": "67-IgXBCoRM"
        }
      ]
    },
    {
      "id": "hon-02",
      "num": "02",
      "arc": "honorable",
      "artist": "Alabama Shakes",
      "title": "Gimme All Your Love",
      "album": "Sound & Color",
      "youtubeId": "_sNNTpORtDQ"
    },
    {
      "id": "hon-03",
      "num": "03",
      "arc": "honorable",
      "artist": "The Smiths",
      "title": "I Know It’s Over",
      "album": "The Queen Is Dead",
      "youtubeId": "M6o1SEj02t0"
    },
    {
      "id": "hon-04",
      "num": "04",
      "arc": "honorable",
      "artist": "Tyler, The Creator",
      "title": "Like Him",
      "album": "CHROMAKOPIA",
      "youtubeId": "Z0CQf3JDKAY",
      "note": "Da <em>CHROMAKOPIA</em>, una ballata intima al piano con Lola Young. Tyler che affronta a cuore aperto il rapporto con suo padre, per me è uno dei suoi pezzi più toccanti e maturi in assoluto. Ma tutto l'album va ascoltato.",
      "alternatives": [
        {
          "artist": "Tyler, The Creator",
          "title": "Darling, I",
          "album": "CALL ME IF YOU GET LOST",
          "youtubeId": "kZfz5UlsHlQ"
        }
      ]
    },
    {
      "id": "hon-05",
      "num": "05",
      "arc": "honorable",
      "artist": "Caparezza",
      "title": "Perlificat",
      "album": "Orbit Orbit",
      "youtubeId": "Kga8ZLXxXTE",
      "note": "Da <em>Orbit Orbit</em>, beat denso e un testo geniale sul creare arte per salvarsi, come fa l'ostrica che prende la tossicità e il brutto e lo perlifica.",
      "alternatives": [
        {
          "artist": "Caparezza",
          "title": "Cosmonaufrago",
          "album": "Orbit Orbit",
          "youtubeId": "7AjMvdNrDqs"
        }
      ]
    },
    {
      "id": "hon-06",
      "num": "06",
      "arc": "honorable",
      "artist": "Depeche Mode",
      "title": "Painkiller",
      "album": "Ultra",
      "youtubeId": "kMH__kOxvbY"
    },
    {
      "id": "hon-07",
      "num": "07",
      "arc": "honorable",
      "artist": "MACE, Altea",
      "title": "SOLO UN UOMO",
      "album": "MĀYĀ",
      "youtubeId": "_iwFej_m_qQ",
      "alternatives": [
        {
          "artist": "Venerus, MACE",
          "title": "Luci",
          "album": "Magica Musica",
          "youtubeId": "C3FxEgbFD1w",
          "note": "La traccia che chiude <em>Magica Musica</em>."
        }
      ]
    },
    {
      "id": "hon-08",
      "num": "08",
      "arc": "honorable",
      "artist": "Jeff Buckley",
      "title": "So Real",
      "album": "Grace",
      "youtubeId": "EcaxrqhUJ4c"
    },
    {
      "id": "hon-09",
      "num": "09",
      "arc": "honorable",
      "artist": "Kendrick Lamar",
      "title": "i",
      "album": "To Pimp a Butterfly",
      "youtubeId": "8aShfolR6w8",
      "alternatives": [
        {
          "artist": "Kendrick Lamar",
          "title": "The Blacker The Berry",
          "album": "To Pimp a Butterfly",
          "youtubeId": "VdPtVZDspIY"
        }
      ]
    },
    {
      "id": "hon-10",
      "num": "10",
      "arc": "honorable",
      "artist": "Tame Impala",
      "title": "No Choice",
      "album": "No Choice - Single",
      "youtubeId": "gM7qKOKotyI",
      "alternatives": [
        {
          "artist": "Tame Impala",
          "title": "Apocalypse Dreams",
          "album": "Lonerism",
          "youtubeId": "DmmvZrBnQ4M"
        }
      ]
    },
    {
      "id": "hon-11",
      "num": "11",
      "arc": "honorable",
      "artist": "Eugenio Bennato",
      "title": "Sponda sud",
      "album": "Sponda sud",
      "youtubeId": "kT_UFug82g4"
    },
    {
      "id": "hon-12",
      "num": "12",
      "arc": "honorable",
      "artist": "Kanye West, Rick Ross",
      "title": "Devil in a New Dress",
      "album": "My Beautiful Dark Twisted Fantasy",
      "youtubeId": "2joLWbdEf6Y",
      "note": "Un capolavoro assoluto con il sample soul di Smokey Robinson, la chitarra leggendaria di Mike Dean e una delle strofe più iconiche della storia dell'hip-hop firmata Rick Ross."
    },
    {
      "id": "hon-13",
      "num": "13",
      "arc": "honorable",
      "artist": "Killer Mike, Mozzy, Lena Byrd Miles",
      "title": "SHED TEARS",
      "album": "MICHAEL",
      "youtubeId": "1WEXSVk9qDQ",
      "note": "Una figata incredibile dall'album <em>MICHAEL</em> (vincitore di 3 Grammy nel 2024)."
    },
    {
      "id": "hon-14",
      "num": "14",
      "arc": "honorable",
      "artist": "Joy Division",
      "title": "Love Will Tear Us Apart",
      "album": "Love Will Tear Us Apart",
      "youtubeId": "674KGKRQBPE",
      "note": "Uno dei miei brani preferiti in assoluto della vita. La leggendaria linea di basso melodica di Peter Hook, il riff di synth e la voce profonda e struggente di Ian Curtis. Capolavoro eterno."
    },
    {
      "id": "hon-15",
      "num": "15",
      "arc": "honorable",
      "artist": "Greentea Peng",
      "title": "Nah It Ain't The Same",
      "album": "MAN MADE",
      "youtubeId": "5CzNP_sKWK4",
      "note": "Greentea Peng ha una vibe tutta sua, troppo figa, un incrocio magnetico tra neo-soul psichedelico, basse frequenze e un mood rilassato ma ipnotico che per me è superlativo."
    }
  ]
};
