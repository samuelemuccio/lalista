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
      "youtubeId": "FGG5K1XLgkA",
      "youtubeVariants": [
        {
          "youtubeId": "FGG5K1XLgkA",
          "iframe": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/FGG5K1XLgkA?si=6u1Sj-TNxlEKCUUF\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
          "label": "Versione album"
        },
        {
          "youtubeId": "FngDSOuCNAA",
          "iframe": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/FngDSOuCNAA?si=GsTOlJKDgZp951ld\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
          "label": "Live in session"
        }
      ]
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
      ]
    },
    {
      "id": "top-03",
      "num": "03",
      "arc": "amber",
      "artist": "CASIOPEA",
      "title": "ミッドナイト・ランデブー (Midnight Rendezvous)",
      "album": "CASIOPEA",
      "youtubeId": "4Hvvltt7d-U",
      "note": "Fanno un jazz-fusion giapponese assurdo, con un tiro che ti mette una carica incredibile: sembra letteralmente una pista di Mario Kart presa benissimo.",
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
      "youtubeId": "88wFJb0itYQ"
    },
    {
      "id": "top-05",
      "num": "05",
      "arc": "amber",
      "artist": "Mandrill",
      "title": "Peace And Love - Movement IV",
      "album": "Mandrill",
      "youtubeId": "OONDL7c6aGU"
    },
    {
      "id": "top-06",
      "num": "06",
      "arc": "amber",
      "artist": "Miley Cyrus, Brittany Howard",
      "title": "Walk of Fame",
      "album": "Something Beautiful",
      "youtubeId": "JX2GkxNT-IQ",
      "note": "Ha una voce allucinante. Questo pezzo ha un'attitudine rock e soul del sud scurissima e sporca, chitarre sature e un testo che ti resta incollato addosso. Lontanissima dal pop di plastica.",
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
      "note": "<strong>Anima Latina</strong> per me è il disco più bello di Battisti in assoluto, ne sono totalmente innamorato. Questo pezzo ha un groove afro-brasiliano e percussioni pazzesche: parla di due persone diverse che si cercano e si fondono insieme.",
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
          "note": "Uno dei vertici degli 'album bianchi' scritti con Pasquale Panella: dischi rivoluzionari e futuristici, avanti di decenni e all'epoca incompresi. Purtroppo per questioni di diritti non si trovano su Spotify, ed è un peccato enorme perché questo suono elettronico e destrutturato è puro genio."
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
      "youtubeId": "Jq2tcDNeSC8"
    },
    {
      "id": "top-09",
      "num": "09",
      "arc": "plum",
      "artist": "Daniela Pes",
      "title": "Illa Sera",
      "album": "SPIRA",
      "youtubeId": "FCHPla9hceI",
      "note": "Daniela Pes è un'artista sarda che canta letteralmente in una lingua creata da lei, mescolando fonemi e suoni galluresi con l'elettronica scura di <a href='https://it.wikipedia.org/wiki/Iosonouncane' target='_blank' rel='noopener'>Iosonouncane</a>. L'album <em>SPIRA</em> è un viaggio ancestrale assurdo.",
      "alternatives": [
        {
          "artist": "Daniela Pes",
          "title": "Ca milla dia dì",
          "album": "Musicultura 2018",
          "youtubeId": "YbkzCg-Zdiw",
          "note": "Il brano con cui Daniela Pes ha conquistato Musicultura nel 2018: fonetica arcaica in gallurese antico ispirata alle poesie di Don Gavino Pes, fusa con un'elettronica sciamanica ipnotica."
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
      "id": "top-10",
      "num": "10",
      "arc": "plum",
      "artist": "C.S.I.",
      "title": "E Ti Vengo A Cercare",
      "album": "Linea Gotica",
      "youtubeId": "yjT7C1hBFaI",
      "note": "<strong>Linea Gotica</strong> è un capolavoro della musica italiana. Questa rilettura di Battiato ha un'intensità e una delicatezza disarmante: la sento come una dedica pura.",
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
      "note": "<strong>The Rainbow Goblins</strong> è un concept album pazzesco ispirato alla fiaba di Ul de Rico sui goblin che rubano i colori dell'arcobaleno. Questo pezzo è il finale: la chitarra racconta tutta la storia senza bisogno di parole. Takanaka è il mio chitarrista preferito in assoluto.",
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
      "note": "Da <strong>The Final Cut</strong>. Il momento in cui la voce straziata di Waters sfuma ed entra il sax ti giuro mi spezza ogni volta in due: sembra una lama. È un pezzo cupo, profondissimo, fa venire i brividi.",
      "alternatives": [
        {
          "artist": "Pink Floyd",
          "title": "High Hopes",
          "album": "The Division Bell",
          "youtubeId": "pDKPz6KD8fs"
        },
        {
          "artist": "Pink Floyd",
          "title": "In The Flesh?",
          "album": "The Wall",
          "youtubeId": "6Z6Je2QM6lE"
        },
        {
          "artist": "Pink Floyd",
          "title": "Don’t Leave Me Now",
          "album": "The Wall",
          "youtubeId": "zppuIqcUsig"
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
      "youtubeId": "0Yryg8sc6pE"
    },
    {
      "id": "prog-03",
      "num": "03",
      "arc": "prog",
      "artist": "Premiata Forneria Marconi",
      "title": "Impressioni di Settembre",
      "album": "Storia di un minuto",
      "youtubeId": "DS76YKxiOKU",
      "note": "<p>Il sintetizzatore <strong>Moog</strong> in Italia fu introdotto proprio con questa canzone: per incidere quel leggendario riff si fecero prestare il primissimo prototipo <em>Minimoog</em> arrivato nel nostro Paese.</p><p>Fu un suono assurdo, mai sentito prima in Italia, che rivoluzionò completamente il modo di fare musica e fece esplodere l'intera stagione del progressive rock nostrano.</p><p class='note-anecdote'><em>(E pensa che mio nonno, ispirato proprio da loro, si fece portare un synth dall'America per suonarlo in Sicilia quando non sapeva manco cosa fosse nessuno: è stato il mio primissimo aggancio con il prog!).</em></p>",
      "youtubeVariants": [
        {
          "youtubeId": "DS76YKxiOKU",
          "iframe": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/DS76YKxiOKU?si=UoZPa5FLNbBZOaAX\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
          "label": "Live"
        },
        {
          "youtubeId": "hzy6sGiLGqM",
          "iframe": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/hzy6sGiLGqM?si=971N2I66AFHQ2Hfr\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
          "label": "Originale"
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
      "note": "Un capolavoro assoluto del prog rock in forma di suite/medley diviso in tre movimenti (Encounter / Smiles for You / Lady Fantasy): chitarre celestiali di Latimer, tastiere avvolgenti e continui cambi di atmosfera.",
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
      "title": "Fallen Angel (Elemental Mix)",
      "album": "Red",
      "youtubeId": "StJ35MJxDaI",
      "note": "Da <strong>Red</strong>, uno dei loro dischi più monumentali: adoro il contrasto tra la parte melodica e le chitarre abrasive. Nelle alternative trovi anche <strong>Peoria</strong>, una chicca registrata live su cassetta per <em>Earthbound</em>: il suono è sporco e grezzo proprio per quello, ma ha un tiro viscerale incredibile.",
      "alternatives": [
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
              "label": "Originale"
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
              "label": "Audio album"
            },
            {
              "youtubeId": "N4zPu3ISCGs",
              "iframe": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/N4zPu3ISCGs?si=0JiuG05Db6ujJx8s\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
              "label": "Video ufficiale"
            }
          ]
        }
      ],
      "youtubeVariants": [
        {
          "youtubeId": "5WSulenOUb0",
          "iframe": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/5WSulenOUb0?si=5INvg1PaYoi50H-t\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
          "label": "Live · Isle of Wight 1970"
        },
        {
          "youtubeId": "U4P5dsPvRIA",
          "iframe": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/U4P5dsPvRIA?si=kzRHFFIsUzFvh1Lz\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
          "label": "Originale"
        }
      ]
    },
    {
      "id": "prog-08",
      "num": "08",
      "arc": "prog",
      "artist": "Pink Floyd",
      "title": "Have A Cigar",
      "album": "Wish You Were Here",
      "youtubeId": "Eq8ZiZ9xiLw",
      "note": "Un funk-prog caustico e tagliente che prende in giro le case discografiche (<em>«Which one's Pink?»</em>). Nelle alternative c'è la suite monumentale di <strong>Atom Heart Mother</strong>: 23 minuti orchestrali da ascoltare con calma in cuffia, un viaggio unico.",
      "alternatives": [
        {
          "artist": "Pink Floyd",
          "title": "Atom Heart Mother",
          "album": "Atom Heart Mother",
          "youtubeId": "gLhYOdTSQHA"
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
      "note": "I TOOL sono una band fuori scala. In <strong>Lateralus</strong> (il disco del 2001) hanno composto strofe e sillabe seguendo la <strong>sequenza di Fibonacci</strong> (1, 1, 2, 3, 5, 8...). <em>Pneuma</em> è il loro capolavoro recente: 12 minuti di pura trance poliritmica guidati dalla batteria pazzesca di <a href='https://it.wikipedia.org/wiki/Danny_Carey' target='_blank' rel='noopener'>Danny Carey</a>.",
      "alternatives": [
        {
          "artist": "TOOL",
          "title": "Schism",
          "album": "Lateralus",
          "youtubeId": "MM62wjLrgmA",
          "note": "Il brano più iconico e premiato dei TOOL (Grammy Award 2002): celebre linea di basso in tempi dispari con alternanza continua tra 5/8 e 7/8, unita al testo sulla frattura e riconnessione umana. Capolavoro assoluto del prog-metal."
        },
        {
          "artist": "TOOL",
          "title": "The Pot",
          "album": "10,000 Days",
          "youtubeId": "civuoU_NE38",
          "note": "Uno dei brani più potenti e celebri della band: Maynard James Keenan che canta in un falsetto ipnotico su una linea di basso funky-heavy mastodontica di Justin Chancellor e i poliritmi tellurici di Danny Carey."
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
      "youtubeId": "Fn9ZuGquwpQ"
    },
    {
      "id": "prog-11",
      "num": "11",
      "arc": "prog",
      "artist": "The Doors",
      "title": "The End",
      "album": "The Doors",
      "youtubeId": "VScSEXRwUqQ",
      "note": "Il finale definitivo, psichedelico e teatrale. Quello reso immortale da Coppola all'inizio di <a href='https://it.wikipedia.org/wiki/Apocalypse_Now' target='_blank' rel='noopener'>Apocalypse Now</a>. Va ascoltato rigorosamente al buio e a volume alto."
    }
  ],
  "honorable": [
    {
      "id": "hon-01",
      "num": "01",
      "arc": "honorable",
      "artist": "Alabama Shakes",
      "title": "Gimme All Your Love",
      "album": "Sound & Color",
      "youtubeId": "_sNNTpORtDQ"
    },
    {
      "id": "hon-02",
      "num": "02",
      "arc": "honorable",
      "genre": "rap",
      "artist": "Travis Scott",
      "title": "HYAENA",
      "album": "UTOPIA",
      "youtubeId": "N20q-391r48",
      "note": "Apre <em>UTOPIA</em> con un campionamento dei mostri sacri del prog rock <strong>Gentle Giant</strong> e una batteria acustica sporchissima. Pura atmosfera notturna e tensione.",
      "alternatives": [
        {
          "artist": "Travis Scott",
          "title": "SIRENS",
          "album": "UTOPIA",
          "youtubeId": "6gUiQ8CqLcY"
        },
        {
          "artist": "Travis Scott",
          "title": "MY EYES",
          "album": "UTOPIA",
          "youtubeId": "pildU9lK6vM"
        }
      ]
    },
    {
      "id": "hon-03",
      "num": "03",
      "arc": "honorable",
      "artist": "IDLES",
      "title": "War",
      "album": "Ultra Mono",
      "youtubeId": "BLcM3fq6Quk",
      "alternatives": [
        {
          "artist": "IDLES",
          "title": "Grounds",
          "album": "Ultra Mono",
          "youtubeId": "mRkUt9VnaR0"
        }
      ]
    },
    {
      "id": "hon-04",
      "num": "04",
      "arc": "honorable",
      "artist": "The Smiths",
      "title": "I Know It’s Over",
      "album": "The Queen Is Dead",
      "youtubeId": "M6o1SEj02t0"
    },
    {
      "id": "hon-05",
      "num": "05",
      "arc": "honorable",
      "genre": "rap",
      "artist": "Tyler, The Creator",
      "title": "Like Him",
      "album": "CHROMAKOPIA",
      "youtubeId": "Z0CQf3JDKAY",
      "note": "Da <em>CHROMAKOPIA</em>: una ballata intima al piano con Lola Young. Tyler che affronta a cuore aperto il rapporto con suo padre: per me è il suo pezzo più toccante e maturo in assoluto.",
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
      "id": "hon-06",
      "num": "06",
      "arc": "honorable",
      "genre": "rap",
      "artist": "Caparezza",
      "title": "Perlificat",
      "album": "Orbit Orbit",
      "youtubeId": "Kga8ZLXxXTE",
      "note": "Da <em>Orbit Orbit</em>: beat denso e un testo geniale sul creare arte per salvarsi e non per le classifiche (<em>«Fallo per te, non per la classifica...»</em>). Nelle alternative c'è <strong>Cosmonaufrago</strong>, un altro viaggio incredibile.",
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
      "id": "hon-07",
      "num": "07",
      "arc": "honorable",
      "artist": "Depeche Mode",
      "title": "Painkiller",
      "album": "Ultra",
      "youtubeId": "kMH__kOxvbY"
    },
    {
      "id": "hon-08",
      "num": "08",
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
          "note": "La traccia che chiude Magica Musica: la voce eterea e il soul cosmico di Venerus avvolti dalle trame elettroniche e dai synth sognanti cesellati da Mace."
        }
      ]
    },
    {
      "id": "hon-09",
      "num": "09",
      "arc": "honorable",
      "artist": "Jeff Buckley",
      "title": "So Real",
      "album": "Grace",
      "youtubeId": "EcaxrqhUJ4c"
    },
    {
      "id": "hon-10",
      "num": "10",
      "arc": "honorable",
      "genre": "rap",
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
      "id": "hon-11",
      "num": "11",
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
          "youtubeId": "DmmvZrBnQ4M",
          "note": "Il momento più grandioso di Lonerism: batteria tellurica, pianoforte psichedelico e un crescendo finale straripante scritto da Kevin Parker insieme a Jay Watson."
        }
      ]
    },
    {
      "id": "hon-12",
      "num": "12",
      "arc": "honorable",
      "artist": "Eugenio Bennato",
      "title": "Sponda sud",
      "album": "Sponda sud",
      "youtubeId": "kT_UFug82g4"
    },
    {
      "id": "hon-13",
      "num": "13",
      "arc": "honorable",
      "genre": "rap",
      "artist": "Kanye West",
      "title": "Waves",
      "album": "The Life of Pablo",
      "youtubeId": "Sh855LWd774",
      "note": "Apertura melodica soul-gospel ariosa e luminosa, con il ritornello trascinante di Chris Brown e la produzione stellare di Charlie Heat e Metro Boomin.",
      "alternatives": [
        {
          "artist": "Kanye West, Rick Ross",
          "title": "Devil in a New Dress",
          "album": "My Beautiful Dark Twisted Fantasy",
          "youtubeId": "sk3rpYkiHe8",
          "note": "Un gioiello senza tempo: il sample soul di Smokey Robinson, il maestoso assolo di chitarra di Mike Dean e una delle strofe più iconiche mai scritte da Rick Ross."
        }
      ]
    },
    {
      "id": "hon-14",
      "num": "14",
      "arc": "honorable",
      "genre": "rap",
      "artist": "Killer Mike, Mozzy, Lena Byrd Miles",
      "title": "SHED TEARS",
      "album": "MICHAEL",
      "youtubeId": "1WEXSVk9qDQ",
      "note": "Una figata incredibile dall'album MICHAEL (vincitore di 3 Grammy nel 2024): rap viscerale, spiritualità soul e un ritornello gospel celestiale cantato da Lena Byrd Miles che fa venire i brividi."
    },
    {
      "id": "hon-15",
      "num": "15",
      "arc": "honorable",
      "artist": "Joy Division",
      "title": "Love Will Tear Us Apart",
      "album": "Love Will Tear Us Apart",
      "youtubeId": "674KGKRQBPE",
      "note": "Uno dei miei brani preferiti in assoluto della vita. La leggendaria linea di basso melodica di Peter Hook, il riff di synth e la voce profonda e struggente di Ian Curtis. Capolavoro eterno."
    },
    {
      "id": "hon-16",
      "num": "16",
      "arc": "honorable",
      "artist": "Greentea Peng",
      "title": "Nah It Ain't The Same",
      "album": "MAN MADE",
      "youtubeId": "5CzNP_sKWK4",
      "note": "Greentea Peng ha una vibe tutta sua, troppo figa: un incrocio magnetico tra neo-soul psichedelico, basse frequenze dub e un mood rilassato ma ipnotico che per me è superlativo."
    },
    {
      "id": "hon-17",
      "num": "17",
      "arc": "honorable",
      "artist": "Black Sabbath",
      "title": "Planet Caravan",
      "album": "Paranoid",
      "youtubeId": "W6sVXK9o0Ys",
      "note": "La mia canzone preferita dei Black Sabbath in assoluto: psichedelica, notturna, intima, con le percussioni jazz e la voce di Ozzy filtrata da un Leslie cabinet. Un viaggio onirico nello spazio profondo."
    }
  ]
};
