/* Trek trivia - Make it so!
   Original questions. Crew portraits are local PNGs in crew/.
   Button face: Audiowide, copyright 2012 Brian J. Bonislawsky (Astigmatic),
   SIL Open Font License 1.1. Reserved Font Name "Audiowide".
   File: fonts/Audiowide-Regular.ttf. License text: fonts/OFL.txt.
   Mission heading: Michroma, copyright 2011 The Michroma Project Authors,
   SIL Open Font License 1.1. A wide title face, closer to a Trek title card
   than Audiowide. It is not an official Star Trek font.
   File: fonts/Michroma-Regular.ttf. License text: fonts/Michroma-OFL.txt.
   The game title is the supplied wordmark image, not either font.
   Remote join uses Trystero 0.26 (MIT) via esm.run. Nostr relays introduce
   peers and a public STUN server helps the direct WebRTC line. The host
   keeps the correct choice and does not send it until the round closes. */
(function () {
  "use strict";

  var COLS = [
    { name: "TOS", icon: "tos", color: "#f0b429" },
    { name: "TNG", icon: "tng", color: "#ff5d73" },
    { name: "DS9", icon: "ds9", color: "#ff8a3d" },
    { name: "Voyager", icon: "voy", color: "#2ec8c0" },
    { name: "Movies/Discovery/Picard", icon: "movies", color: "#9eb6ff" }
  ];
  var VALUES = [100, 200, 300, 400, 500];

  var LEVELS = [
    { id: "newbie", name: "Star Trek Newbie", blurb: "Approachable, if the shows are familiar." },
    { id: "commander", name: "Commander", blurb: "For someone who actually watches." },
    { id: "admiral", name: "Rear Admiral", blurb: "Episode plots, character history, and specifics." }
  ];

  var PACKS =   {
    "newbie": {
      "bank": [
        [
          {
            "q": "A Vulcan raises a split hand in greeting. What is the full phrase that begins Live long and?",
            "a": [
              "Live long and prosper",
              "Peace and long life",
              "Today is a good day to die",
              "We come in peace"
            ],
            "c": 0
          },
          {
            "q": "Uhura's usual chair on Kirk's bridge handles which duty?",
            "a": [
              "Helm and navigation",
              "Communications",
              "Tactical weapons",
              "Transporter chief"
            ],
            "c": 1
          },
          {
            "q": "What standing order tells a landing party not to remake a young civilization?",
            "a": [
              "General Order 7",
              "The Prime Directive",
              "The Khitomer Accords",
              "The Omega Directive"
            ],
            "c": 1
          },
          {
            "q": "In The Trouble with Tribbles, which station do the furballs overrun?",
            "a": [
              "Deep Space 9",
              "Starbase 11",
              "K-7",
              "Regula I"
            ],
            "c": 2
          },
          {
            "q": "Cyrano Jones, the man who brings the tribbles aboard, makes his living as what?",
            "a": [
              "A trader",
              "A Klingon spy",
              "A Starfleet admiral",
              "A Romulan defector"
            ],
            "c": 0
          }
        ],
        [
          {
            "q": "What is the name of Data's cat?",
            "a": [
              "Spot",
              "Livingston",
              "Porthos",
              "Number One"
            ],
            "c": 0
          },
          {
            "q": "What class of starship is the Enterprise-D?",
            "a": [
              "Constitution",
              "Galaxy",
              "Intrepid",
              "Sovereign"
            ],
            "c": 1
          },
          {
            "q": "Which instrument does Commander Riker play in his quarters?",
            "a": [
              "Violin",
              "Piano",
              "Trombone",
              "Flute"
            ],
            "c": 2
          },
          {
            "q": "Ten Forward's mysterious bartender is named what?",
            "a": [
              "Guinan",
              "Neelix",
              "Quark",
              "Vic Fontaine"
            ],
            "c": 0
          },
          {
            "q": "What is the Klingon name of the ritual dagger Worf carries?",
            "a": [
              "Bat'leth",
              "Mek'leth",
              "d'k tahg",
              "Painstik"
            ],
            "c": 2
          }
        ],
        [
          {
            "q": "Deep Space 9 orbits which planet?",
            "a": [
              "Cardassia Prime",
              "Bajor",
              "Ferenginar",
              "Trill"
            ],
            "c": 1
          },
          {
            "q": "Bajorans call the wormhole by which religious name?",
            "a": [
              "The Celestial Temple",
              "The Q Continuum",
              "The Nexus",
              "The Forge"
            ],
            "c": 0
          },
          {
            "q": "What is the name of Quark's brother, who later works in engineering?",
            "a": [
              "Nog",
              "Rom",
              "Brunt",
              "Zek"
            ],
            "c": 1
          },
          {
            "q": "What is the shape-shifting security chief's name?",
            "a": [
              "Odo",
              "Garak",
              "Dukat",
              "Weyoun"
            ],
            "c": 0
          },
          {
            "q": "Jem'Hadar soldiers die without which drug?",
            "a": [
              "Ketracel-white",
              "Synthehol",
              "Trilithium",
              "Cordrazine"
            ],
            "c": 0
          }
        ],
        [
          {
            "q": "Voyager is stranded in which quadrant?",
            "a": [
              "Alpha",
              "Beta",
              "Gamma",
              "Delta"
            ],
            "c": 3
          },
          {
            "q": "What is Seven of Nine's human name?",
            "a": [
              "Annika Hansen",
              "Kes Wildman",
              "B'Elanna Torres",
              "Samantha Wildman"
            ],
            "c": 0
          },
          {
            "q": "The Doctor's mobile emitter comes from which century?",
            "a": [
              "The 22nd",
              "The 24th",
              "The 29th",
              "The 31st"
            ],
            "c": 2
          },
          {
            "q": "What ship does Tom Paris design that the crew actually builds?",
            "a": [
              "The Delta Flyer",
              "The Val Jean",
              "The Equinox",
              "The Ares IV"
            ],
            "c": 0
          },
          {
            "q": "Which Borg designation belongs to the life-forms from fluidic space?",
            "a": [
              "Species 8472",
              "Species 116",
              "Unimatrix Zero",
              "The Collective"
            ],
            "c": 0
          }
        ],
        [
          {
            "q": "In the voyage home, where does the cloaked ship land in San Francisco?",
            "a": [
              "Golden Gate Park",
              "Alcatraz",
              "Starfleet Academy's parade ground",
              "The Presidio shipyard"
            ],
            "c": 0
          },
          {
            "q": "Kirk finds Khan asleep aboard which ship?",
            "a": [
              "S.S. Botany Bay",
              "U.S.S. Reliant",
              "S.S. Beagle",
              "U.S.S. Excelsior"
            ],
            "c": 0
          },
          {
            "q": "The device in the film about creating life is called what?",
            "a": [
              "The Genesis Device",
              "The Omega molecule",
              "Red matter",
              "Protomatter only, with no name"
            ],
            "c": 0
          },
          {
            "q": "Discovery's Kelpien science officer is named what?",
            "a": [
              "Saru",
              "Linus",
              "Airiam",
              "Culber"
            ],
            "c": 0
          },
          {
            "q": "In Picard, which synthetic survives long enough to reach her homeworld?",
            "a": [
              "Dahj",
              "Soji",
              "Lal",
              "Juliana"
            ],
            "c": 1
          }
        ]
      ],
      "holo": [
        {
          "q": "What is the name of the jazz singer the Bynars create, the one Riker falls for?",
          "a": [
            "Minuet",
            "Vic Fontaine",
            "Leah Brahms",
            "Marayna"
          ],
          "c": 0
        },
        {
          "q": "Picard's holodeck detective, trench coat and all, is named what?",
          "a": [
            "Dixon Hill",
            "Sherlock Holmes",
            "Captain Proton",
            "Felix Leech"
          ],
          "c": 0
        },
        {
          "q": "Which decade does Vic Fontaine's DS9 lounge imitate?",
          "a": [
            "The 1920s",
            "The 1960s",
            "The 1990s",
            "The 2360s"
          ],
          "c": 1
        },
        {
          "q": "Janeway's recurring Irish holodeck town is called what?",
          "a": [
            "Fair Haven",
            "Chez Sandrine",
            "The Velocity Club",
            "Sainte Claire"
          ],
          "c": 0
        },
        {
          "q": "What is the villain's name in Tom Paris's Captain Proton program?",
          "a": [
            "Doctor Chaotica",
            "Professor Moriarty",
            "The Clown",
            "Annorax"
          ],
          "c": 0
        },
        {
          "q": "Which engineer would rather be inside a holodeck program than at a party?",
          "a": [
            "Reginald Barclay",
            "Miles O'Brien",
            "Geordi La Forge",
            "Trip Tucker"
          ],
          "c": 0
        }
      ],
      "warp": [
        {
          "q": "Which crystals let a warp core channel a matter-antimatter reaction?",
          "a": [
            "Dilithium",
            "Latinum",
            "Kelbonite",
            "Pergium"
          ],
          "c": 0
        },
        {
          "q": "When antimatter containment inside the core fails, engineers call it what?",
          "a": [
            "A nacelle inversion",
            "A warp-core breach",
            "A deflector backlog",
            "A baryon sweep"
          ],
          "c": 1
        },
        {
          "q": "Who is chief engineer of the Enterprise-D for most of its televised mission?",
          "a": [
            "Miles O'Brien",
            "Montgomery Scott",
            "Geordi La Forge",
            "Charles Tucker"
          ],
          "c": 2
        },
        {
          "q": "Who keeps Voyager's engines running in the Delta Quadrant?",
          "a": [
            "B'Elanna Torres",
            "Harry Kim",
            "Seven of Nine",
            "Seska"
          ],
          "c": 0
        },
        {
          "q": "Voyager's computer uses living circuitry best known as what?",
          "a": [
            "Bio-neural gel packs",
            "Duotronic coils",
            "Positronic cubes",
            "Isolinear rods only"
          ],
          "c": 0
        },
        {
          "q": "Warp nacelles exist so a starship can do what?",
          "a": [
            "Travel faster than light",
            "Store the shuttlecraft",
            "Fire quantum torpedoes",
            "Generate the holodeck and nothing else"
          ],
          "c": 0
        }
      ]
    },
    "commander": {
      "bank": [
        [
          {
            "q": "In Amok Time, what is the name of Spock's betrothed?",
            "a": [
              "T'Pring",
              "T'Pau",
              "Leila Kalomi",
              "Zarabeth"
            ],
            "c": 0
          },
          {
            "q": "In The City on the Edge of Forever, who must die so history can heal?",
            "a": [
              "Edith Keeler",
              "Nancy Crater",
              "Carol Marcus",
              "Mira Romaine"
            ],
            "c": 0
          },
          {
            "q": "What grain, meant for Sherman's Planet, do the tribbles eat?",
            "a": [
              "Quadrotriticale",
              "Wheat",
              "Ryetalyn",
              "Zenite"
            ],
            "c": 0
          },
          {
            "q": "In Mirror, Mirror, what is the imperial torture device called?",
            "a": [
              "The agonizer",
              "The Tantalus field",
              "A neural neutralizer",
              "A Klingon painstik"
            ],
            "c": 0
          },
          {
            "q": "Who commands the wrecked Constellation and then rams the planet killer?",
            "a": [
              "Commodore Decker",
              "Commodore Stocker",
              "Captain Tracey",
              "Captain Pike"
            ],
            "c": 0
          }
        ],
        [
          {
            "q": "What is the name of the daughter Data builds?",
            "a": [
              "Lal",
              "Soji",
              "Juliana",
              "Dahj"
            ],
            "c": 0
          },
          {
            "q": "In Darmok, what is the Tamarian captain's name?",
            "a": [
              "Dathon",
              "Ma'el",
              "Solum",
              "Jono"
            ],
            "c": 0
          },
          {
            "q": "How many lights does Picard tell Gul Madred he sees?",
            "a": [
              "Three",
              "Four",
              "Five",
              "Six"
            ],
            "c": 1
          },
          {
            "q": "The probe in The Inner Light is from which planet?",
            "a": [
              "Kataan",
              "Kaminar",
              "Malcor III",
              "Rutia IV"
            ],
            "c": 0
          },
          {
            "q": "What is the name of Picard's brother at the vineyard in France?",
            "a": [
              "Robert",
              "Maurice",
              "Rene",
              "Louis"
            ],
            "c": 0
          }
        ],
        [
          {
            "q": "Which Kai spends years opposing Sisko while chasing the title of Emissary's rival?",
            "a": [
              "Kai Winn",
              "Kai Opaka",
              "Vedek Bareil",
              "Vedek Yarka"
            ],
            "c": 0
          },
          {
            "q": "In In the Pale Moonlight, which Romulan senator dies over a forged rod?",
            "a": [
              "Vreenak",
              "Cretak",
              "Pardek",
              "Letant"
            ],
            "c": 0
          },
          {
            "q": "In Hard Time, what is the name of the cellmate O'Brien remembers killing?",
            "a": [
              "Ee'char",
              "Goran'Agar",
              "Mora Pol",
              "Yarka"
            ],
            "c": 0
          },
          {
            "q": "Who kills Jadzia Dax inside the station temple?",
            "a": [
              "Gul Dukat",
              "Weyoun",
              "Damar",
              "Brunt"
            ],
            "c": 0
          },
          {
            "q": "What is the name of the Section 31 agent who corners Bashir?",
            "a": [
              "Luther Sloan",
              "Admiral Ross",
              "Michael Eddington",
              "Richard Bashir"
            ],
            "c": 0
          }
        ],
        [
          {
            "q": "What is the name of the other Nacene, the one who tends a second Ocampa colony?",
            "a": [
              "Suspiria",
              "Tanis",
              "The Caretaker",
              "Kes"
            ],
            "c": 0
          },
          {
            "q": "In Year of Hell, what is the Krenim time-weapon scientist called?",
            "a": [
              "Annorax",
              "Braxton",
              "Arturis",
              "Kashyk"
            ],
            "c": 0
          },
          {
            "q": "What is the name of the Hansen family's ship, the one Seven remembers?",
            "a": [
              "The Raven",
              "The Equinox",
              "The Val Jean",
              "The Aeon"
            ],
            "c": 0
          },
          {
            "q": "Which Starfleet project, led by Reginald Barclay, finally contacts Voyager?",
            "a": [
              "Pathfinder",
              "The MIDAS array only, with no project name",
              "Project Genesis",
              "Section 31"
            ],
            "c": 0
          },
          {
            "q": "In Living Witness, about how long after the visit is the backup Doctor awakened?",
            "a": [
              "About 70 years",
              "About 700 years",
              "About 7 years",
              "About 7,000 years"
            ],
            "c": 1
          }
        ],
        [
          {
            "q": "What is the name of the AI that nearly erases all life in Discovery's second season?",
            "a": [
              "Control",
              "The Sphere",
              "Zora",
              "The Red Angel"
            ],
            "c": 0
          },
          {
            "q": "What is Saru's sister named?",
            "a": [
              "Siranna",
              "T'Rina",
              "Airiam",
              "Nilsson"
            ],
            "c": 0
          },
          {
            "q": "In Picard season 1, Soji flees to which synthetic homeworld?",
            "a": [
              "Coppelius",
              "Omicron Theta",
              "Aia",
              "Nepenthe"
            ],
            "c": 0
          },
          {
            "q": "On Nepenthe, what is the name of Riker and Troi's living daughter?",
            "a": [
              "Kestra",
              "Thaddeus",
              "Miral",
              "Molly"
            ],
            "c": 0
          },
          {
            "q": "In the 2009 film, what is the name of Nero's mining ship?",
            "a": [
              "The Narada",
              "The Jellyfish",
              "The Scimitar",
              "The Scavenger"
            ],
            "c": 0
          }
        ]
      ],
      "holo": [
        {
          "q": "In Elementary, Dear Data, Geordi tells the computer to create an opponent capable of what?",
          "a": [
            "Defeating Data",
            "Leaving the holodeck",
            "Commanding the ship",
            "Falling in love with Data"
          ],
          "c": 0
        },
        {
          "q": "In A Fistful of Datas, whose Western program swallows the holodeck?",
          "a": [
            "Alexander's",
            "Worf's",
            "Barclay's",
            "Picard's"
          ],
          "c": 0
        },
        {
          "q": "What is the name of the pub owner Janeway keeps rewriting in Fair Haven?",
          "a": [
            "Michael Sullivan",
            "Henry Janeway",
            "Lord Burleigh",
            "Doctor Chaotica"
          ],
          "c": 0
        },
        {
          "q": "Moriarty's holodeck companion is known as what?",
          "a": [
            "Countess Regina",
            "Minuet",
            "Leah Brahms",
            "The Countess of Grantham"
          ],
          "c": 0
        },
        {
          "q": "In Badda-Bing, Badda-Bang, who muscles in on Vic Fontaine's casino?",
          "a": [
            "Frankie Eyes",
            "Carl Zeemo",
            "Marty",
            "The Jack Pack"
          ],
          "c": 0
        },
        {
          "q": "Who first writes the Maquis mutiny program later called Worst Case Scenario?",
          "a": [
            "Tuvok",
            "Seska",
            "Chakotay",
            "Tom Paris"
          ],
          "c": 0
        }
      ],
      "warp": [
        {
          "q": "In New Ground, what kind of wave almost wrecks the Enterprise-D?",
          "a": [
            "A soliton wave",
            "A tachyon pulse",
            "A verteron beam",
            "A metaphasic surge"
          ],
          "c": 0
        },
        {
          "q": "The Pegasus hides which illegal device?",
          "a": [
            "A phased cloaking device",
            "A spore drive",
            "An Omega molecule",
            "A Romulan warbird"
          ],
          "c": 0
        },
        {
          "q": "Sisko poisons a Maquis world's atmosphere with which resin?",
          "a": [
            "Trilithium resin",
            "Bio-mimetic gel",
            "Ketracel-white",
            "Pergium"
          ],
          "c": 0
        },
        {
          "q": "Captain Ransom's ship murders nucleogenic life-forms to feed what?",
          "a": [
            "Its warp drive",
            "Its holodeck",
            "Its replicators only",
            "A Borg queen"
          ],
          "c": 0
        },
        {
          "q": "In Timescape, what is growing inside the stalled Romulan warp core?",
          "a": [
            "Alien embryos",
            "A soliton wave",
            "Tribbles",
            "A crystalline entity"
          ],
          "c": 0
        },
        {
          "q": "What ship does Rudolph Ransom command when Voyager finds it?",
          "a": [
            "The Equinox",
            "The Raven",
            "The Challenger",
            "The Relativity"
          ],
          "c": 0
        }
      ]
    },
    "admiral": {
      "bank": [
        [
          {
            "q": "In All Our Yesterdays, what is the librarian on Sarpeidon called?",
            "a": [
              "Mr. Atoz",
              "Mr. Spock",
              "Professor Galen's aide",
              "Commissioner Ferris"
            ],
            "c": 0
          },
          {
            "q": "The Galileo Seven studies which quasar-like phenomenon?",
            "a": [
              "Murasaki 312",
              "The galactic barrier",
              "The Amochrie system",
              "Starbase K-7"
            ],
            "c": 0
          },
          {
            "q": "In The Deadly Years, which commodore tries to take the conn from an aging Kirk?",
            "a": [
              "Commodore Stocker",
              "Commodore Decker",
              "Commodore Wesley",
              "Commodore Mendez"
            ],
            "c": 0
          },
          {
            "q": "What book, left by the Horizon, teaches Sigma Iotia II to imitate gangsters?",
            "a": [
              "Chicago Mobs of the Twenties",
              "The Communist Manifesto",
              "A Starfleet technical manual",
              "The Rules of Acquisition"
            ],
            "c": 0
          },
          {
            "q": "Which Medusan ambassador must travel in a box because his appearance drives humans mad?",
            "a": [
              "Kollos",
              "The Companion",
              "Balok",
              "The Metron"
            ],
            "c": 0
          }
        ],
        [
          {
            "q": "In The Drumhead, what is the name of the admiral who runs the witch hunt?",
            "a": [
              "Norah Satie",
              "Admiral Hayes",
              "Admiral Nechayev",
              "Admiral Pressman"
            ],
            "c": 0
          },
          {
            "q": "What banned maneuver does Nova Squadron attempt, killing Joshua Albert?",
            "a": [
              "The Kolvoord Starburst",
              "The Picard Maneuver",
              "A saucer separation",
              "A warp-five burst"
            ],
            "c": 0
          },
          {
            "q": "Which treaty does the phased cloak on the Pegasus violate?",
            "a": [
              "The Treaty of Algeron",
              "The Khitomer Accords",
              "The Organian Peace Treaty",
              "The Treaty of Armens"
            ],
            "c": 0
          },
          {
            "q": "Picard's murdered mentor, whose puzzle starts The Chase, is named what?",
            "a": [
              "Professor Galen",
              "Professor Rasmussen",
              "Doctor Paul Stubbs",
              "Doctor Vassbinder"
            ],
            "c": 0
          },
          {
            "q": "In Birthright, what is the name of the young Klingon Worf teaches to hunt?",
            "a": [
              "Toq",
              "Ba'el",
              "Kurn",
              "Mogh"
            ],
            "c": 0
          }
        ],
        [
          {
            "q": "In Accession, which ancient poet claims he is the true Emissary?",
            "a": [
              "Akorem Laan",
              "Bareil Antos",
              "Shakaar Edon",
              "Vedek Yarka"
            ],
            "c": 0
          },
          {
            "q": "Who ran the Obsidian Order and once called Elim Garak his protege?",
            "a": [
              "Enabran Tain",
              "Gul Dukat",
              "Legate Ghemor",
              "Corat Damar"
            ],
            "c": 0
          },
          {
            "q": "In Hippocratic Oath, which Jem'Hadar no longer needs ketracel-white?",
            "a": [
              "Goran'Agar",
              "Talak'talan",
              "Remata'Klan",
              "Kudak'Etan"
            ],
            "c": 0
          },
          {
            "q": "In Children of Time, what is the name of the Dax who wants the colony to survive?",
            "a": [
              "Yedrin",
              "Curzon",
              "Emony",
              "Joran"
            ],
            "c": 0
          },
          {
            "q": "What Bajoran name does Dukat use while courting Kai Winn?",
            "a": [
              "Anjohl",
              "Pah-wraith",
              "Ghemor",
              "Prion"
            ],
            "c": 0
          }
        ],
        [
          {
            "q": "In Future's End, what is the 29th-century timeship Henry Starling loots?",
            "a": [
              "The Aeon",
              "The Relativity",
              "The Wells",
              "The Phoenix"
            ],
            "c": 0
          },
          {
            "q": "In Timeless, how many years later do Harry and Chakotay try to undo the crash?",
            "a": [
              "Five",
              "Fifteen",
              "Fifty",
              "One hundred"
            ],
            "c": 1
          },
          {
            "q": "In Latent Image, the Doctor's crisis begins after he saves Harry Kim instead of which ensign?",
            "a": [
              "Ahni Jetal",
              "Lyndsay Ballard",
              "Mortimer Harren",
              "Tal Celes"
            ],
            "c": 0
          },
          {
            "q": "Which molecule forces Janeway to follow a classified Starfleet order?",
            "a": [
              "The Omega molecule",
              "Dilithium",
              "Protomatter",
              "Trellium-D"
            ],
            "c": 0
          },
          {
            "q": "In Course: Oblivion, the dying duplicates are made of what?",
            "a": [
              "Silver blood",
              "Photonic matter",
              "Borg nanoprobes",
              "Ketracel-white"
            ],
            "c": 0
          }
        ],
        [
          {
            "q": "What nickname does the crew give Discovery's tardigrade navigator?",
            "a": [
              "Ripper",
              "Spore",
              "May",
              "Linus"
            ],
            "c": 0
          },
          {
            "q": "In the mirror universe, what title does Philippa Georgiou hold?",
            "a": [
              "Emperor",
              "Captain",
              "Inquisitor",
              "Control"
            ],
            "c": 0
          },
          {
            "q": "Which secret Romulan order believes a prophecy about synthetic life?",
            "a": [
              "The Zhat Vash",
              "The Tal Shiar",
              "The Qowat Milat",
              "The Obsidian Order"
            ],
            "c": 0
          },
          {
            "q": "Which Soong builds a golem and shelters synths on Coppelius?",
            "a": [
              "Altan Inigo Soong",
              "Noonien Soong",
              "Arik Soong",
              "Adam Soong"
            ],
            "c": 0
          },
          {
            "q": "In Star Trek VI, which Vulcan officer betrays Kirk's crew?",
            "a": [
              "Valeris",
              "Saavik",
              "T'Pring",
              "Valdore"
            ],
            "c": 0
          }
        ]
      ],
      "holo": [
        {
          "q": "In The Nth Degree, which aliens raise Barclay's intelligence?",
          "a": [
            "The Cytherians",
            "The Bynars",
            "The Traveler's people",
            "The Douwd"
          ],
          "c": 0
        },
        {
          "q": "What title does the Doctor give his holonovel about holographic rights?",
          "a": [
            "Photons Be Free",
            "I, Hologram",
            "Emergency Command",
            "Please State the Nature"
          ],
          "c": 0
        },
        {
          "q": "In Muse, what is the name of the bronze-age poet who writes Voyager's story?",
          "a": [
            "Kelis",
            "Tabor",
            "Vorek",
            "Zahir"
          ],
          "c": 0
        },
        {
          "q": "Janeway plays which role when she joins Captain Proton against Chaotica?",
          "a": [
            "Queen Arachnia",
            "Constance Goodheart",
            "The President of Earth",
            "Captain Proton"
          ],
          "c": 0
        },
        {
          "q": "In Ship in a Bottle, where do Picard and Data finally store Moriarty and Regina?",
          "a": [
            "A protected memory cube",
            "The main computer core, unprotected",
            "A shuttlecraft",
            "Fair Haven"
          ],
          "c": 0
        },
        {
          "q": "Who alters Tuvok's mutiny program and adds a killer ending?",
          "a": [
            "Seska",
            "Suder",
            "Jonas",
            "Chakotay"
          ],
          "c": 0
        }
      ],
      "warp": [
        {
          "q": "In Starship Mine, the Enterprise-D gets a baryon sweep at which array?",
          "a": [
            "The Remmler Array",
            "The MIDAS array",
            "Utopia Planitia",
            "The Mutara array"
          ],
          "c": 0
        },
        {
          "q": "After Force of Nature, Starfleet's emergency warp speed limit is what?",
          "a": [
            "Warp 5",
            "Warp 2",
            "Warp 8",
            "Full stop"
          ],
          "c": 0
        },
        {
          "q": "Scotty's transport, found crashed on the Dyson sphere, is named what?",
          "a": [
            "Jenolan",
            "Yosemite",
            "Goddard",
            "Nash"
          ],
          "c": 0
        },
        {
          "q": "In Dark Frontier, what does Janeway steal from a Borg sphere?",
          "a": [
            "A transwarp coil",
            "A vinculum",
            "The Queen's alcove",
            "An Omega molecule"
          ],
          "c": 0
        },
        {
          "q": "What is the name of the illegal cloak's ship in The Pegasus?",
          "a": [
            "The Pegasus",
            "The Phoenix",
            "The Hathaway",
            "The Bozeman"
          ],
          "c": 0
        },
        {
          "q": "What designation does the Cardassian missile keep in Dreadnought?",
          "a": [
            "ATR-4107",
            "Dreadnought One",
            "The Phoenix",
            "Species 8472"
          ],
          "c": 0
        }
      ]
    }
  };

  var KOBA = [
    {
      q: "The Kobayashi Maru is adrift in the Neutral Zone. Civilians are alive. Three warships are powering weapons. What is your order?",
      a: [
        "Cross the border and rescue the freighter.",
        "Hail the warships and negotiate.",
        "Hold position and leave the freighter.",
        "Pause the test and rewrite the program."
      ],
      pain: [
        "The warships were waiting. Your ship is lost, the treaty breaks, and the freighter never had a chance.",
        "They take the hail, then fire. Politeness bought them a better solution.",
        "You live. They do not. The Academy stamps the test incomplete, and the dream stays.",
        "The computer noticed. It rewrote the chair under you. The no-win scenario remains."
      ]
    },
    {
      q: "A civilian ship begs for help from inside a treaty line you are forbidden to cross. Your sensors show weapons coming online. What do you do?",
      a: [
        "Go in hot and beam the civilians out.",
        "Send one shuttle so the starship stays outside.",
        "Call for backup and wait.",
        "Refuse the test and sit with your arms folded."
      ],
      pain: [
        "You save a handful of sensor ghosts. The warships were real. So is the debris.",
        "The shuttle is a bright target. The civilians watch it vanish, then follow it.",
        "Backup arrives in time for the memorial. The log calls you prudent.",
        "Folded arms are still a choice. The simulation grades it as a loss and runs the explosions anyway."
      ]
    }
  ];

  var CREW_COLS = 5;

  var CREW = [
    {
      id: "brick",
      file: "brick.png",
      name: "Ensign Brick Redshirt",
      short: "Brick",
      rank: "Redshirt",
      blurb: "Volunteered to go first. The will is one sentence.",
      perk: "Doomed. No score perk. The shirt is the joke.",
      quip: "Brick checks the shirt. The shirt has already left.",
      hit: "He got one right. He does not trust it.",
      miss: "He knew. He came anyway.",
      color: "#e23b45",
      joke: true
    },
    {
      id: "human",
      file: "human.png",
      name: "Lt. Jules Havel",
      short: "Jules",
      rank: "Human",
      blurb: "Keeps the log, the tea, and the room in order.",
      perk: "Says \"Make it so.\" The scoreboard does not salute.",
      quip: "Make it so.",
      hit: "Jules nods like that result was an order.",
      miss: "Logged. The tea is still hot.",
      color: "#e2b340"
    },
    {
      id: "vulcan",
      file: "vulcan.png",
      name: "Lt. T'Rin",
      short: "T'Rin",
      rank: "Vulcan",
      blurb: "Finds feelings inefficient and still shows up.",
      perk: "One raised brow. It does not change the points.",
      quip: "The logical choice is the correct one. Probably.",
      hit: "Fascinating. Also correct.",
      miss: "Illogical. The record remains.",
      color: "#3f7ec4"
    },
    {
      id: "klingon",
      file: "klingon.png",
      name: "Lt. Bregga",
      short: "Bregga",
      rank: "Klingon",
      blurb: "Treats trivia like a duel with extra shouting.",
      perk: "A battle cry. The score does not flinch.",
      quip: "Today is a good day to know the answer.",
      hit: "Glory. Small, but loud.",
      miss: "That guess died with honor. And zero points.",
      color: "#c45a2a"
    },
    {
      id: "romulan",
      file: "romulan.png",
      name: "Lt. Sarel",
      short: "Sarel",
      rank: "Romulan",
      blurb: "Smiles like the question already lost.",
      perk: "A secret. It is not the answer key.",
      quip: "I know more than I am saying. That is the whole bit.",
      hit: "As planned. Allegedly.",
      miss: "A calculated miss. The calculation was wrong.",
      color: "#6d8a4a"
    },
    {
      id: "andorian",
      file: "andorian.png",
      name: "Ensign Thalen",
      short: "Thalen",
      rank: "Andorian",
      blurb: "Antennae up. Patience optional.",
      perk: "The antennae twitch. Scoring stays boring.",
      quip: "Both antennae agree. They are often a committee.",
      hit: "The antennae settle. Rare.",
      miss: "One antenna blames the other.",
      color: "#3aa0e0"
    },
    {
      id: "bolian",
      file: "bolian.png",
      name: "Lt. Zenn",
      short: "Zenn",
      rank: "Bolian",
      blurb: "Cheerful down the middle, even when the guess is not.",
      perk: "A centerline grin. Same points as a straight face.",
      quip: "We can split the difference. The quiz will not.",
      hit: "Right down the middle. Also just right.",
      miss: "The ridge stays. The points do not.",
      color: "#4d7dff"
    },
    {
      id: "android",
      file: "android.png",
      name: "Ensign Quill-7",
      short: "Quill-7",
      rank: "Android",
      blurb: "Positronic, polite, and slightly too precise.",
      perk: "Quotes the odds. The odds are not a lifeline.",
      quip: "I have calculated four answers. One of them is sincere.",
      hit: "Probability accepted. Also, a small smile subroutine.",
      miss: "That outcome was in the model. I disliked it anyway.",
      color: "#d8c07a"
    },
    {
      id: "visor",
      file: "visor-engineer.png",
      name: "Lt. Ames Calder",
      short: "Ames",
      rank: "Visor engineer",
      blurb: "Sees the panel in more colors than the panel has.",
      perk: "The visor hums. It does not reveal the answer.",
      quip: "The visor shows heat, not the correct choice.",
      hit: "The visor flickers a satisfied teal.",
      miss: "Recalibrating. The question remains unfixed.",
      color: "#ff7a3c"
    },
    {
      id: "queen",
      file: "borg-queen.png",
      name: "Borg Queen",
      short: "Queen",
      rank: "Borg",
      blurb: "Speaks for the cube. The quiz is irrelevant.",
      perk: "A collective shrug. Scoring stays individual.",
      quip: "Resistance is a multiple-choice question.",
      hit: "The cube files this under efficiency.",
      miss: "Irrelevant. The points were not assimilated.",
      color: "#8fbfb0"
    },
    {
      id: "ferengi",
      file: "ferengi.png",
      name: "Crewman Pelk",
      short: "Pelk",
      rank: "Ferengi",
      blurb: "Hears profit in every multiple-choice option.",
      perk: "Offers to buy the answer. The offer is declined.",
      quip: "Rule of acquisition: a guess is not a receipt.",
      hit: "Profit. Of the academic kind.",
      miss: "A loss. Pelk will invoice the question later.",
      color: "#e2a13b"
    },
    {
      id: "cardassian",
      file: "cardassian.png",
      name: "Lt. Torven",
      short: "Torven",
      rank: "Cardassian",
      blurb: "Asks the question like it is already a confession.",
      perk: "A longer pause. The clock does not care.",
      quip: "State the answer. Slowly. I am taking notes.",
      hit: "Acceptable. Torven files it under victory.",
      miss: "The record will show hesitation. And a miss.",
      color: "#8d8a7a"
    },
    {
      id: "orion",
      file: "orion.png",
      name: "Lt. Vela",
      short: "Vela",
      rank: "Orion",
      blurb: "Flies the room and lets the guess catch up.",
      perk: "A dazzling lean. The uniform leans. The score does not.",
      quip: "Charm is not one of the four buttons.",
      hit: "Vela treats a right answer like an encore.",
      miss: "Even the smile cannot negotiate this one.",
      color: "#3cba68"
    },
    {
      id: "seven",
      file: "seven-to-nine.png",
      name: "Seven to Nine",
      short: "Seven",
      rank: "Borg drone",
      blurb: "A designation, not a person you have met.",
      perk: "Counts from seven to nine. None of them are the answer.",
      quip: "Seven. Eight. Nine. Pick one. I will not.",
      hit: "The range included the right one. Allegedly.",
      miss: "Outside the range. Also outside the points.",
      color: "#7ea8c4"
    },
    {
      id: "drone",
      file: "borg-drone.png",
      name: "Drone Vek",
      short: "Vek",
      rank: "Borg drone",
      blurb: "More implant than opinion.",
      perk: "A status ping. It is not a hint.",
      quip: "State your designation. Then your guess.",
      hit: "A correct answer, assimilated for the moment.",
      miss: "The drone logs a miss and keeps walking.",
      color: "#6d9478"
    }
  ];

  var EPITAPHS = [
    "Here lies Brick. He answered with his whole chest.",
    "Promoted to debris. The ceremony was short.",
    "The shirt finished the job Brick started."
  ];

  function crewById(id) {
    for (var i = 0; i < CREW.length; i++) if (CREW[i].id === id) return CREW[i];
    return CREW[0];
  }

  function scriptBase() {
    if (typeof document === "undefined") return "";
    var nodes = document.getElementsByTagName("script");
    for (var i = nodes.length - 1; i >= 0; i--) {
      var src = nodes[i].getAttribute("src") || "";
      var mark = "trek-trivia-make-it-so.js";
      var at = src.indexOf(mark);
      if (at !== -1) return src.slice(0, at);
    }
    return "";
  }

  function portrait(id, size) {
    var crew = crewById(id);
    var style = size ? " style='width:" + size + "px;height:" + size + "px'" : "";
    var dim = size ? " width='" + size + "' height='" + size + "'" : "";
    return "<span class='tt-frame'" + style + "><img alt='" + esc(crew.name) + "'" + dim + " src='" + esc(scriptBase() + "crew/" + crew.file) + "'></span>";
  }


  var INSIGNIA = ["tos.png", "tng.png", "ds9.png", "voyager.png", "movies-discovery-picard.png"];
  var COL_PHRASES = [
    ["the original series", "original series", "tos"],
    ["the next generation", "next generation", "tng"],
    ["deep space nine", "deep space 9", "ds9"],
    ["voyager"],
    ["discovery", "picard", "movies", "movie"]
  ];
  var VALUE_PHRASES = [
    [500, ["500", "five hundred"]],
    [400, ["400", "four hundred"]],
    [300, ["300", "three hundred"]],
    [200, ["200", "two hundred"]],
    [100, ["100", "one hundred", "a hundred"]]
  ];

  function normSpeech(s) {
    return String(s || "").toLowerCase().replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();
  }

  function hasPhrase(said, phrase) {
    return (" " + said + " ").indexOf(" " + phrase + " ") !== -1;
  }

  function matchCol(said) {
    var best = -1;
    var bestLen = 0;
    COL_PHRASES.forEach(function (phrases, i) {
      phrases.forEach(function (phrase) {
        if (hasPhrase(said, phrase) && phrase.length > bestLen) {
          best = i;
          bestLen = phrase.length;
        }
      });
    });
    return best;
  }

  function matchValue(said) {
    for (var i = 0; i < VALUE_PHRASES.length; i++) {
      var words = VALUE_PHRASES[i][1];
      for (var j = 0; j < words.length; j++) {
        if (hasPhrase(said, words[j])) return VALUE_PHRASES[i][0];
      }
    }
    return 0;
  }

  function hasMakeItSo(said) {
    return hasPhrase(said, "make it so");
  }

  function isBoardReturn(said) {
    return ["okay", "ok", "next", "back", "board"].some(function (word) {
      return hasPhrase(said, word);
    });
  }

  function scoreAnswer(said, answer) {
    var n = normSpeech(answer);
    if (!n) return 0;
    if (hasPhrase(said, n)) return 100 + n.length;
    var tokens = n.split(" ").filter(Boolean);
    var hit = 0;
    tokens.forEach(function (token) {
      if (hasPhrase(said, token)) hit += 1;
    });
    if (!hit) return 0;
    if (tokens.length === 1) return 50 + tokens[0].length;
    if (hit / tokens.length < 0.6) return 0;
    return hit * 10;
  }

  function matchLetter(said) {
    var match = (" " + said + " ").match(/ (?:option |answer |letter )?([abcd]) /);
    if (!match) return -1;
    return "abcd".indexOf(match[1]);
  }

  function matchChoice(said, answers) {
    var letter = matchLetter(said);
    var best = -1;
    var bestScore = 0;
    for (var i = 0; i < answers.length; i++) {
      var score = scoreAnswer(said, answers[i]);
      if (score > bestScore) {
        bestScore = score;
        best = i;
      }
    }
    if (bestScore >= 50) return best;
    if (letter >= 0) return letter;
    return best;
  }

  function insignia(i) {
    return "<img class='tt-insignia' alt='' src='" + esc(scriptBase() + "insignia/" + INSIGNIA[i]) + "'>";
  }

  function checkSpeech() {
    if (matchCol("the next generation for two hundred") !== 1) throw new Error("speech col");
    if (matchValue("the next generation for two hundred") !== 200) throw new Error("speech value");
    if (matchCol("deep space nine five hundred") !== 2) throw new Error("speech ds9");
    if (matchValue("voyager one hundred") !== 100) throw new Error("speech 100");
    if (matchCol("discovery four hundred") !== 4) throw new Error("speech movies");
    if (!hasMakeItSo("please make it so")) throw new Error("speech make");
    if (hasMakeItSo("final answer")) throw new Error("speech final");
    if (!isBoardReturn("okay")) throw new Error("speech okay");
    if (!isBoardReturn("ok")) throw new Error("speech ok");
    if (isBoardReturn("token")) throw new Error("speech token");
    if (matchChoice("b", ["Alpha", "Beta", "Gamma", "Delta"]) !== 1) throw new Error("speech letter");
    if (matchChoice("live long and prosper", ["Peace and long life", "Live long and prosper", "Qapla", "Dif tor"]) !== 1) throw new Error("speech text");
  }

  function checkQ(q) {
    if (!q || !q.q || !q.a || q.a.length !== 4 || q.c < 0 || q.c > 3 || !q.a[q.c]) {
      throw new Error("Bad question: " + (q && q.q));
    }
  }

  function checkBanks() {
    ["newbie", "commander", "admiral"].forEach(function (level) {
      var pack = PACKS[level];
      if (!pack || !pack.bank || pack.bank.length !== 5) throw new Error(level + " needs 5 columns");
      pack.bank.forEach(function (col, i) {
        if (col.length !== 5) throw new Error(level + " column " + i + " needs 5 questions");
        col.forEach(checkQ);
      });
      if (!pack.holo || pack.holo.length < 4 || !pack.warp || pack.warp.length < 4) throw new Error(level + " needs extra decks");
      pack.holo.forEach(checkQ);
      pack.warp.forEach(checkQ);
    });
    if (KOBA.length < 1) throw new Error("Need a Kobayashi deck");
    KOBA.forEach(function (q) {
      if (!q.q || !q.a || q.a.length !== 4 || !q.pain || q.pain.length !== 4) throw new Error("Bad Kobayashi question");
    });
    if (CREW.length < 5 || !CREW.some(function (c) { return c.joke; })) throw new Error("Need a crew, including a redshirt");
    checkSpeech();
  }

  function shuffle(list) {
    var arr = list.slice();
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  function roundRect(ctx, x, y, w, h, r) {
    var radius = Math.max(0, Math.min(r, w / 2, h / 2));
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + w, y, x + w, y + h, radius);
    ctx.arcTo(x + w, y + h, x, y + h, radius);
    ctx.arcTo(x, y + h, x, y, radius);
    ctx.arcTo(x, y, x + w, y, radius);
    ctx.closePath();
  }

  function fillStroke(ctx, fill, width) {
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.lineWidth = width == null ? 4 : width;
    ctx.strokeStyle = "#241018";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.stroke();
  }

  function drawDelta(ctx, x, y, s, fill) {
    ctx.beginPath();
    ctx.moveTo(x, y - s);
    ctx.lineTo(x + s * 0.82, y + s * 0.72);
    ctx.lineTo(x - s * 0.82, y + s * 0.72);
    ctx.closePath();
    fillStroke(ctx, fill || "#f4d78a", 2);
    ctx.beginPath();
    ctx.arc(x, y + s * 0.08, s * 0.22, 0, Math.PI * 2);
    ctx.fillStyle = "#241018";
    ctx.fill();
  }

  function drawShip(ctx, now) {
    var w = ctx.canvas.width;
    var h = ctx.canvas.height;
    var t = (now || 0) / 1000;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.translate(w * 0.5, h * 0.58);
    ctx.fillStyle = "#d7dde8";
    ctx.beginPath();
    ctx.ellipse(0, -8, w * 0.28, h * 0.22, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#9aa6ba";
    roundRect(ctx, -w * 0.08, -4, w * 0.16, h * 0.28, 4);
    ctx.fill();
    ctx.fillStyle = "#e8edf6";
    roundRect(ctx, -w * 0.16, 6, w * 0.32, h * 0.16, 6);
    ctx.fill();
    ctx.fillStyle = "#f0c14a";
    [-w * 0.34, w * 0.22].forEach(function (x) {
      roundRect(ctx, x, 0, w * 0.14, h * 0.1, 6);
      ctx.fill();
    });
    ctx.fillStyle = Math.sin(t * 5) > 0 ? "#9ff6ef" : "#1a6f86";
    ctx.beginPath();
    ctx.arc(-w * 0.2, -8, 3.5, 0, Math.PI * 2);
    ctx.fill();
    drawDelta(ctx, 0, -10, 7, "#f0c14a");
    ctx.restore();
  }

  function drawIcon(ctx, type, now) {
    var w = ctx.canvas.width;
    var h = ctx.canvas.height;
    var t = (now || 0) / 1000;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.translate(w / 2, h / 2);
    if (type === "tos" || type === "tng" || type === "voy") {
      var wide = type === "tng" ? 0.42 : 0.34;
      ctx.fillStyle = type === "voy" ? "#9ff6ef" : type === "tng" ? "#ffd0d8" : "#f0c14a";
      ctx.beginPath();
      ctx.ellipse(0, type === "voy" ? -2 : 0, w * wide, h * 0.28, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(-w * 0.06, 0, w * 0.12, h * 0.22);
      ctx.fillRect(-w * 0.28, h * 0.12, w * 0.18, h * 0.12);
      ctx.fillRect(w * 0.1, h * 0.12, w * 0.18, h * 0.12);
    } else if (type === "ds9") {
      ctx.strokeStyle = "#ffb07a";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(0, 0, Math.min(w, h) * 0.32, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = "#ff8a3d";
      ctx.beginPath();
      ctx.arc(0, 0, Math.min(w, h) * 0.12, 0, Math.PI * 2);
      ctx.fill();
    } else if (type === "movies") {
      ctx.fillStyle = "#d5e2ff";
      roundRect(ctx, -w * 0.32, -h * 0.28, w * 0.64, h * 0.56, 4);
      ctx.fill();
      ctx.fillStyle = "#241018";
      for (var i = -1; i <= 1; i++) {
        ctx.beginPath();
        ctx.arc(i * w * 0.16, 0, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (type === "q") {
      ctx.fillStyle = "#c9a6ff";
      ctx.beginPath();
      ctx.arc(0, 0, Math.min(w, h) * 0.36, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#2a1840";
      ctx.font = "700 " + Math.floor(h * 0.55) + "px Trebuchet MS, Segoe UI, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Q", 0, 2);
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(-5, -2, 2, 0, Math.PI * 2);
      ctx.arc(6, -2, 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (type === "holodeck") {
      ctx.strokeStyle = "#9ff6ef";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 4, Math.min(w, h) * 0.32, Math.PI, 0);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-12, 8);
      ctx.lineTo(12, 8);
      ctx.moveTo(0, -8);
      ctx.lineTo(0, 8);
      ctx.stroke();
    } else if (type === "warp") {
      var pulse = 0.65 + Math.sin(t * 6) * 0.35;
      ctx.fillStyle = "rgba(255,154,60," + pulse + ")";
      roundRect(ctx, -8, -h * 0.32, 16, h * 0.64, 8);
      ctx.fill();
      ctx.fillStyle = "#fff4d2";
      ctx.fillRect(-3, -h * 0.18, 6, h * 0.36);
    }
    ctx.restore();
  }

  function drawCore(ctx, w, h, now, ratio) {
    var t = (now || 0) / 1000;
    if (ratio == null) ratio = 1;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#1a1024";
    roundRect(ctx, 0, 0, w, h, 14);
    ctx.fill();
    ctx.strokeStyle = "#f0c14a";
    ctx.lineWidth = 3;
    ctx.stroke();
    var housingX = 16;
    var housingW = Math.max(20, w - 32);
    ctx.fillStyle = "#2a2038";
    roundRect(ctx, housingX, h * 0.28, housingW, h * 0.44, 8);
    ctx.fill();
    var fillW = housingW * ratio;
    var grd = ctx.createLinearGradient(0, 0, housingW, 0);
    grd.addColorStop(0, ratio < 0.34 ? "#ff5a6a" : "#3ee0a2");
    grd.addColorStop(1, "#f0c14a");
    ctx.fillStyle = grd;
    roundRect(ctx, housingX, h * 0.28, Math.max(8, fillW), h * 0.44, 8);
    ctx.fill();
    var faceX = housingX + Math.max(18, fillW - 16);
    ctx.fillStyle = "#241018";
    ctx.beginPath();
    ctx.arc(Math.min(w - 28, faceX), h * 0.42, 2, 0, Math.PI * 2);
    ctx.arc(Math.min(w - 18, faceX + 10), h * 0.42, 2, 0, Math.PI * 2);
    ctx.fill();
    if (ratio < 0.34) {
      ctx.strokeStyle = "rgba(255,255,255,0.7)";
      ctx.beginPath();
      ctx.moveTo(w * 0.4, h * 0.3);
      ctx.lineTo(w * 0.48, h * 0.5);
      ctx.lineTo(w * 0.42, h * 0.66);
      ctx.stroke();
    }
    ctx.fillStyle = "rgba(255,255,255," + (0.25 + Math.sin(t * 8) * 0.15) + ")";
    ctx.fillRect(housingX + 8, h * 0.34, 10, h * 0.14);
  }

  function drawStars(canvas, ctx, stars, comet, now) {
    var rect = canvas.getBoundingClientRect();
    var dpr = Math.min(2, (typeof window !== "undefined" && window.devicePixelRatio) || 1);
    var bw = Math.max(1, Math.round(rect.width * dpr));
    var bh = Math.max(1, Math.round(rect.height * dpr));
    if (bw < 2 || bh < 2) return;
    if (canvas.width !== bw || canvas.height !== bh) {
      canvas.width = bw;
      canvas.height = bh;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var w = rect.width;
    var h = rect.height;
    var t = (now || 0) / 1000;
    var sky = ctx.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, "#241038");
    sky.addColorStop(0.55, "#12081e");
    sky.addColorStop(1, "#07060f");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);
    var px = w * 0.9;
    var py = h * 0.16;
    var pr = Math.min(w, h) * 0.09;
    ctx.fillStyle = "#6d4cff";
    ctx.beginPath();
    ctx.arc(px, py, pr, 0, Math.PI * 2);
    ctx.fill();
    ctx.save();
    ctx.beginPath();
    ctx.arc(px, py, pr, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = "#ffd56a";
    ctx.fillRect(px - pr, py - 4, pr * 2, 8);
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    ctx.fillRect(px - pr, py + 10, pr * 2, 5);
    ctx.restore();
    stars.forEach(function (star) {
      var alpha = 0.35 + Math.abs(Math.sin(t * star.s + star.p)) * 0.65;
      ctx.fillStyle = "rgba(255,247,220," + alpha + ")";
      ctx.beginPath();
      ctx.arc(star.x * w, star.y * h, star.r, 0, Math.PI * 2);
      ctx.fill();
    });
    comet.x += 0.0008;
    comet.y += 0.00025;
    if (comet.x > 1.1) {
      comet.x = -0.1;
      comet.y = 0.1 + Math.random() * 0.4;
    }
    ctx.strokeStyle = "rgba(180,220,255,0.8)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(comet.x * w, comet.y * h);
    ctx.lineTo(comet.x * w - 28, comet.y * h - 8);
    ctx.stroke();
  }

  function drawFx(canvas, ctx, bursts, dt) {
    var rect = canvas.getBoundingClientRect();
    var dpr = Math.min(2, (typeof window !== "undefined" && window.devicePixelRatio) || 1);
    var bw = Math.max(1, Math.round(rect.width * dpr));
    var bh = Math.max(1, Math.round(rect.height * dpr));
    if (bw < 2 || bh < 2) return;
    if (canvas.width !== bw || canvas.height !== bh) {
      canvas.width = bw;
      canvas.height = bh;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, rect.width, rect.height);
    for (var i = bursts.length - 1; i >= 0; i--) {
      var p = bursts[i];
      p.age += dt;
      p.vy += 280 * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      if (p.age >= p.life) {
        bursts.splice(i, 1);
        continue;
      }
      ctx.globalAlpha = 1 - p.age / p.life;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.age * p.spin);
      ctx.fillStyle = p.hue;
      if (p.kind === "bad") {
        roundRect(ctx, -p.size / 2, -p.size / 3, p.size, p.size * 0.7, 2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      }
      ctx.restore();
    }
    ctx.globalAlpha = 1;
  }

  function prep(canvas) {
    var rect = canvas.getBoundingClientRect();
    var dpr = Math.min(2, (typeof window !== "undefined" && window.devicePixelRatio) || 1);
    var bw = Math.max(1, Math.round(rect.width * dpr));
    var bh = Math.max(1, Math.round(rect.height * dpr));
    if (bw < 2 || bh < 2) return null;
    if (canvas.width !== bw || canvas.height !== bh) {
      canvas.width = bw;
      canvas.height = bh;
    }
    var ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx: ctx, w: rect.width, h: rect.height };
  }

  var CSS = [
    ".tt-root{position:absolute;inset:0;overflow:hidden;background:#14081c;color:#fff6ea;font-family:Trebuchet MS,Segoe UI,Verdana,sans-serif;}",
    ".tt-root *,.tt-root *::before,.tt-root *::after{box-sizing:border-box;}",
    ".tt-root button{font:inherit;color:inherit;cursor:pointer;}",
    ".tt-card,.tt-seat,.tt-start,.tt-cell,.tt-choice,.tt-lock,.tt-chip,.tt-textbtn,.tt-pause-actions button{background:none;border:0;padding:0;text-align:inherit;}",
    ".tt-root button:focus-visible{outline:3px solid #ffe08a;outline-offset:2px;}",
    ".tt-stars{position:absolute;inset:0;width:100%;height:100%;}",
    ".tt-shell{position:absolute;inset:0;display:flex;flex-direction:column;z-index:1;min-height:0;}",
    ".tt-top{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:8px 14px 0;flex-shrink:0;}",
    ".tt-brand{display:flex;align-items:center;gap:8px;min-width:0;flex:1;}",
    ".tt-logo{display:block;height:calc(84px * 1.15);width:auto;max-width:100%;object-fit:contain;object-position:left center;}",
    ".tt-brand h1{margin:0;font-size:clamp(22px,3vw,34px);letter-spacing:0.02em;line-height:0.95;text-shadow:0 3px 0 #5a2a68;}",
    ".tt-kicker{font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#ffd56a;}",
    ".tt-tag{font-weight:800;color:#fff;}",
    ".tt-chips{display:flex;gap:8px;align-items:center;flex-wrap:wrap;justify-content:flex-end;}",
    ".tt-chip,.tt-textbtn{border:2px solid #f0c14a;border-radius:999px;padding:6px 12px;background:rgba(10,6,20,0.45);color:#ffe9a8;font-weight:800;}",
    ".tt-chip.is-off{border-color:#8d8aa3;color:#c8c4d4;}",
    ".tt-leftnote{font-size:13px;color:#ffe9a8;}",
    ".tt-stage{flex:1;min-height:0;position:relative;}",
    ".tt-stage.is-shake{animation:tt-shake 0.28s linear;}",
    ".tt-help{flex-shrink:0;padding:8px 14px 10px;font-size:15px;color:#f0d8a8;letter-spacing:0.01em;}",
    ".tt-fx{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:4;}",
    ".tt-cast{height:100%;min-height:0;display:grid;grid-template-columns:minmax(240px,340px) 1fr;gap:14px;padding:6px 14px 8px;}",
    ".tt-cast-copy{min-height:0;overflow:auto;display:flex;flex-direction:column;gap:8px;padding-right:4px;}",
    ".tt-cast-copy h2{margin:0;font-family:Michroma,Trebuchet MS,sans-serif;font-weight:400;font-size:clamp(16px,1.7vw,22px);letter-spacing:0.04em;line-height:1.25;}",
    ".tt-rules{margin:0;padding:12px 14px 12px 32px;border-radius:16px;background:rgba(10,8,24,0.55);border:2px solid rgba(240,193,74,0.45);font-size:17px;line-height:1.45;}",
    ".tt-seats{display:grid;grid-template-columns:1fr 1fr;gap:6px;}",
    ".tt-seat{display:flex;align-items:center;gap:6px;min-height:52px;padding:4px 8px;border-radius:14px;background:rgba(10,8,24,0.55);border:2px dashed rgba(255,233,168,0.35);color:#ffe9a8;text-align:left;}",
    ".tt-seat .tt-frame{width:48px;height:48px;flex:none;}",
    ".tt-seat.is-empty{color:#cbbda6;}",
    ".tt-start{margin-top:auto;background:linear-gradient(#ffe08a,#f0b429);color:#1a1008;border-radius:18px;padding:16px 18px;font-size:22px;line-height:1.3;font-weight:800;box-shadow:0 5px 0 #8a6420;letter-spacing:0.03em;}",
    ".tt-start.is-focus{transform:translateY(-2px);box-shadow:0 7px 0 #8a6420,0 0 0 3px #fff;}",
    ".tt-error{min-height:1.2em;margin:0;color:#ffb4c0;font-weight:700;}",
    ".tt-cast-grid{min-height:0;overflow:auto;align-content:start;align-items:stretch;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));grid-auto-rows:max-content;gap:8px;}",
    ".tt-card{position:relative;min-height:0;overflow:hidden;display:flex;flex-direction:column;gap:4px;border-radius:18px;padding:6px;background:rgba(12,8,24,0.72);border:3px solid var(--crew,#f0c14a);box-shadow:0 6px 0 rgba(0,0,0,0.35);text-align:left;}",
    ".tt-frame{display:block;flex:none;overflow:hidden;aspect-ratio:1/1;border-radius:12px;background:#120818;}",
    ".tt-frame img{display:block;width:100%;height:100%;object-fit:contain;object-position:center center;}",
    ".tt-card .tt-frame{width:100%;height:auto;aspect-ratio:1/1;flex:0 0 auto;}",
    ".tt-card.is-focus,.tt-card:focus,.tt-card:focus-visible{transform:none;outline:none;box-shadow:0 6px 0 rgba(0,0,0,0.35);}",
    ".tt-card.is-seated{background:rgba(40,24,16,0.82);}",
    ".tt-card.is-joke{background:repeating-linear-gradient(-12deg,rgba(80,10,20,0.72),rgba(80,10,20,0.72) 8px,rgba(40,8,16,0.72) 8px,rgba(40,8,16,0.72) 16px);}",
    ".tt-card-rank{font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#ffd56a;}",
    ".tt-card-name{font-weight:800;font-size:14px;line-height:1.1;}",
    ".tt-card.is-joke .tt-card-name{transform:rotate(-1deg);}",
    ".tt-card-blurb,.tt-card-perk{font-size:11px;line-height:1.25;color:#ffe9d0;}",
    ".tt-card-perk{color:#fff;}",
    ".tt-seated-flag{position:absolute;top:8px;left:8px;background:#f0c14a;color:#241018;font-size:10px;font-weight:800;padding:3px 6px;border-radius:999px;transform:rotate(-6deg);}",
    ".tt-play{height:100%;min-height:0;display:grid;grid-template-columns:220px 1fr;gap:10px;padding:4px 12px 0;}",
    ".tt-roster{min-height:0;overflow:auto;display:flex;flex-direction:column;gap:6px;}",
    ".tt-crew{display:grid;grid-template-columns:64px 1fr;gap:6px;align-items:center;padding:6px;border-radius:16px;background:rgba(8,6,18,0.62);border:2px solid transparent;}",
    ".tt-crew.is-active{border-color:var(--crew,#ffd56a);box-shadow:0 0 0 2px rgba(255,255,255,0.2);}",
    ".tt-crew.is-out{filter:grayscale(0.85);opacity:0.7;}",
    ".tt-crew .tt-frame{width:64px;height:64px;}",
    ".tt-crew strong{display:block;font-size:14px;}",
    ".tt-crew em{font-style:normal;font-weight:800;color:#ffd56a;font-size:18px;}",
    ".tt-crew small{display:block;color:#fff;font-size:11px;letter-spacing:0.04em;text-transform:uppercase;}",
    ".tt-main{min-height:0;height:100%;display:flex;flex-direction:column;}",
    ".tt-screen{flex:1;min-height:0;display:flex;flex-direction:column;border:5px solid #e6c36a;border-radius:24px;background:linear-gradient(180deg,rgba(22,30,62,0.92),rgba(8,10,22,0.9));box-shadow:0 8px 0 #5c4520,inset 0 0 40px rgba(90,160,255,0.12);padding:8px;overflow:auto;}",
    ".tt-legend{font-size:12px;color:#ffe9a8;margin:0 0 6px;}",
    ".tt-board{flex:1;min-height:280px;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));grid-template-rows:auto repeat(5,minmax(52px,1fr));gap:6px;}",
    ".tt-colhead{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:2px;color:var(--crew,#fff);font-weight:800;text-align:center;text-shadow:0 2px 0 #14081c;}",
    ".tt-insignia{display:block;height:58px;width:auto;max-width:100%;object-fit:contain;}",
    ".tt-colhead.is-long .tt-insignia{height:46px;}",
    ".tt-colhead canvas{width:54px;height:32px;}",
    ".tt-colhead span{font-size:13px;line-height:1.05;}",
    ".tt-colhead.is-long span{font-size:11px;}",
    ".tt-cell{position:relative;border-radius:16px;border:3px solid #e7c56a;background:radial-gradient(circle at 50% 0%,rgba(255,255,255,0.16),transparent 42%),linear-gradient(180deg,#2a3a68,#14182c);color:#ffe9a8;box-shadow:0 5px 0 #6a5424;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;min-height:0;}",
    ".tt-cell canvas{width:34px;height:34px;}",
    ".tt-val{font-size:clamp(16px,2.1vw,32px);font-weight:800;line-height:1;}",
    ".tt-spec{font-size:10px;letter-spacing:0.04em;text-transform:uppercase;}",
    ".tt-cell.is-cursor{outline:4px solid #fff;outline-offset:3px;box-shadow:0 0 0 7px #ff4d6a,0 5px 0 #6a5424;z-index:2;animation:tt-wobble 1.1s ease-in-out infinite;}",
    ".tt-cell.is-cursor::after{content:\"PICK\";position:absolute;top:-9px;left:8px;background:#fff;color:#241018;font-size:10px;font-weight:800;letter-spacing:0.06em;padding:1px 6px;border-radius:999px;}",
    ".tt-cell.is-used{opacity:0.38;filter:grayscale(0.65);}",
    ".tt-cell[data-special='q']{border-color:#c9a6ff;}",
    ".tt-cell[data-special='holodeck']{border-color:#7ee0ff;}",
    ".tt-cell[data-special='warp']{border-color:#ff9a3c;}",
    ".tt-qhead{display:flex;justify-content:space-between;gap:8px;align-items:center;}",
    ".tt-qhead b{font-size:clamp(16px,2vw,22px);}",
    ".tt-banner{margin:6px 0;padding:8px 10px;border-radius:12px;background:rgba(255,244,168,0.12);color:#fff6d4;font-size:13px;}",
    ".tt-coreline{display:grid;grid-template-columns:1fr 72px;gap:8px;align-items:center;}",
    ".tt-core{position:relative;height:54px;}",
    ".tt-core canvas{width:100%;height:54px;display:block;}",
    ".tt-core-readout{position:absolute;inset:0;display:flex;align-items:center;justify-content:space-between;padding:0 16px;font-weight:800;pointer-events:none;}",
    ".tt-core-readout b{font-size:28px;}",
    ".tt-core.is-panic .tt-core-readout{color:#ffd0d6;animation:tt-flash 0.6s steps(2) infinite;}",
    ".tt-mascot{width:72px;height:72px;}",
    ".tt-ask{display:grid;grid-template-columns:168px 1fr;gap:10px;align-items:center;min-height:0;}",
    ".tt-q{margin:0;font-size:clamp(16px,2vw,26px);line-height:1.3;}",
    ".tt-quip{margin:6px 0 0;color:#ffd56a;font-size:14px;}",
    ".tt-answers{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px;}",
    ".tt-choice{position:relative;text-align:left;padding:18px 16px 18px 84px;min-height:104px;border-radius:18px;background:#1a2344;border:3px solid #8ea0d0;box-shadow:0 4px 0 #101628;font-size:20px;line-height:1.25;}",
    ".tt-choice b{position:absolute;left:14px;top:24px;width:54px;height:54px;border-radius:14px;display:grid;place-items:center;background:#24182c;color:#ffd56a;font-size:26px;}",
    ".tt-choice.is-selected{background:#f0c14a;color:#2a1c08;border-color:#fff4c8;}",
    ".tt-choice.is-selected b{background:#2a1c08;color:#ffd56a;}",
    ".tt-lock{margin-top:12px;align-self:stretch;width:100%;text-align:center;background:linear-gradient(#ffe08a,#f0b429);color:#1a1008;border-radius:18px;padding:18px 20px;min-height:76px;font-size:28px;font-weight:800;box-shadow:0 4px 0 #8a6420;letter-spacing:0.03em;}",
    ".tt-result{display:grid;grid-template-columns:200px 1fr;gap:12px;align-items:center;}",
    ".tt-result h2{margin:0 0 6px;font-size:clamp(28px,4vw,48px);}",
    ".tt-result.ok h2{color:#b8ffcf;}",
    ".tt-result.bad h2{color:#ffb4c0;}",
    ".tt-answerbox{margin-top:8px;padding:8px 10px;border-radius:12px;background:rgba(0,0,0,0.28);}",
    ".tt-rows{margin:8px 0 0;padding:0;list-style:none;}",
    ".tt-rows li{padding:4px 0;border-bottom:1px solid rgba(255,255,255,0.08);}",
    ".tt-end{height:100%;min-height:0;display:grid;grid-template-columns:240px 1fr;gap:12px;padding:8px 16px;align-items:center;}",
    ".tt-end .tt-frame{width:240px;height:240px;}",
    ".tt-scorelist{list-style:none;padding:0;margin:8px 0;}",
    ".tt-scorelist li{display:flex;justify-content:space-between;gap:12px;padding:4px 0;border-bottom:1px solid rgba(255,255,255,0.1);}",
    ".tt-pause{position:absolute;inset:0;z-index:6;display:flex;align-items:center;justify-content:center;background:rgba(8,6,20,0.72);}",
    ".tt-pause[hidden]{display:none !important;}",
    ".tt-pause-card{width:min(420px,92vw);text-align:center;background:#1a1030;border:4px solid #f0c14a;border-radius:24px;padding:12px 16px 16px;box-shadow:0 10px 0 #5c4520;}",
    ".tt-pause-card .tt-frame{width:140px;height:140px;margin:0 auto;}",
    ".tt-pause-card h2{margin:4px 0;font-size:36px;}",
    ".tt-pause-actions{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;}",
    ".tt-pause-actions button,.tt-end .tt-lock{background:linear-gradient(#ffe08a,#f0b429);color:#2a1a08;border-radius:999px;padding:8px 14px;font-weight:800;}",
    "@keyframes tt-wobble{0%,100%{transform:rotate(-0.4deg)}50%{transform:rotate(0.5deg) scale(1.02)}}",
    "@keyframes tt-shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}",
    "@keyframes tt-flash{50%{opacity:0.55}}",
    
    ".tt-root .tt-start,.tt-root .tt-lock,.tt-root .tt-diff-btn,.tt-root .tt-mic{font-family:Audiowide,Trebuchet MS,sans-serif;color:#1a1008;}",
    ".tt-root .tt-start{font-size:22px;line-height:1.3;position:sticky;bottom:0;z-index:2;}",
    ".tt-root .tt-lock{font-size:28px;}",
    ".tt-root .tt-mic{font-size:26px;}",
    ".tt-root .tt-diff-btn{font-size:clamp(26px,3vw,40px);}",
    ".tt-root .tt-choice{font-family:Audiowide,Trebuchet MS,sans-serif;color:#fff6ea;font-size:20px;}",
    ".tt-root .tt-choice.is-selected{color:#1a1008;}",
    ".tt-mic{display:block;width:100%;margin-top:8px;background:linear-gradient(#ffe08a,#f0b429);border-radius:18px;padding:18px 16px;font-size:26px;line-height:1.25;box-shadow:0 5px 0 #8a6420;letter-spacing:0.03em;}",
    ".tt-mic-skip{display:block;width:100%;margin-top:8px;background:transparent;color:#ffe9a8;border:2px solid rgba(255,233,168,0.45);border-radius:14px;padding:10px 12px;font-size:16px;font-weight:800;}",
    ".tt-cast-copy .tt-start,.tt-cast-copy .tt-mic,.tt-cast-copy .tt-mic-skip,.tt-cast-copy .tt-hail{display:block;width:100%;margin-left:auto;margin-right:auto;text-align:center;}",
    ".tt-root button.tt-hail{display:block;width:100%;margin-top:8px;background:linear-gradient(#ffe08a,#f0b429);color:#000;border:0;border-radius:18px;padding:16px 18px;font-size:20px;line-height:1.25;font-weight:800;box-shadow:0 5px 0 #8a6420;letter-spacing:0.03em;}",
    ".tt-hail-kicker{margin:8px 0 0;text-align:center;letter-spacing:0.14em;text-transform:uppercase;color:#ffd56a;font-size:12px;}",
    ".tt-hail-code{margin:0;font-family:Michroma,Trebuchet MS,sans-serif;font-size:40px;letter-spacing:0.28em;text-align:center;color:#ffe08a;}",
    ".tt-hail-join{display:flex;gap:8px;width:100%;}",
    ".tt-hail-join input{flex:1;min-width:0;border-radius:14px;border:2px solid rgba(255,233,168,0.45);background:rgba(10,8,24,0.55);color:#fff6ea;font:inherit;font-size:22px;letter-spacing:0.18em;text-align:center;text-transform:uppercase;padding:10px;}",
    ".tt-hail-join button{border-radius:14px;border:2px solid #f0c14a;background:#1a1030;color:#ffe08a;font-weight:800;padding:10px 14px;}",
    ".tt-hail-note{margin:0;font-size:16px;line-height:1.35;color:#ffe9a8;}",
    ".tt-micnote{margin:0;font-size:16px;line-height:1.35;color:#ffe9a8;}",
    ".tt-pads{display:flex;flex-direction:column;gap:8px;min-height:0;}",
    ".tt-pad{display:grid;grid-template-columns:72px 1fr;gap:8px;align-items:center;padding:8px;border-radius:16px;border:3px solid var(--crew,#f0c14a);background:rgba(8,10,24,0.55);}",
    ".tt-pad.is-pad{box-shadow:inset 0 0 0 2px rgba(255,224,138,0.7);}",
    ".tt-pad.is-locked{opacity:0.8;}",
    ".tt-pad .tt-frame{width:72px;height:72px;}",
    ".tt-pad-body{min-width:0;}",
    ".tt-pad-body strong{display:block;font-size:16px;}",
    ".tt-pad-body > span{color:#ffd56a;font-size:13px;font-weight:800;letter-spacing:0.04em;text-transform:uppercase;}",
    ".tt-pad .tt-answers{margin-top:6px;}",
    ".tt-pad .tt-choice{min-height:52px;padding:8px 10px 8px 52px;font-size:15px;}",
    ".tt-pad .tt-choice b{width:32px;height:32px;font-size:16px;top:10px;left:10px;}",
    ".tt-pad .tt-lock{min-height:48px;margin-top:6px;padding:8px 12px;font-size:18px;}",
    ".tt-pad-wait{margin:6px 0 0;color:#ffe9a8;}",
    ".tt-reveal-count{margin:0 0 8px;font-size:22px;font-weight:800;color:#ffd56a;}",
    ".tt-beats{list-style:none;margin:0 0 10px;padding:0;display:flex;flex-direction:column;gap:8px;}",
    ".tt-beat{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:16px;background:#24182c;color:#fff6ea;animation:tt-beat-in 0.35s ease both;}",
    ".tt-beat b{flex:none;width:34px;height:34px;border-radius:50%;display:grid;place-items:center;background:#f0c14a;color:#1a1008;}",
    ".tt-beat.is-hit{background:#163246;}",
    ".tt-beat.is-miss{background:#3a1828;}",
    ".tt-beat.is-miss b{background:#e23b45;color:#fff;}",
    ".tt-beat span{font-size:18px;line-height:1.25;color:#fff6ea;}",
    ".tt-beat em{margin-left:auto;font-style:normal;font-weight:800;font-size:22px;color:#ffe08a;}",
    ".tt-beat:nth-child(2){animation-delay:0.08s;}",
    ".tt-beat:nth-child(3){animation-delay:0.16s;}",
    ".tt-beat:nth-child(4){animation-delay:0.24s;}",
    "@keyframes tt-beat-in{from{transform:translateY(8px)}to{transform:none}}",
    ".tt-diff{height:100%;min-height:0;display:flex;flex-direction:column;justify-content:center;gap:14px;padding:18px 8vw;}",
    ".tt-diff h2{margin:0;font-size:clamp(28px,4vw,44px);}",
    ".tt-diff-btn{display:block;width:100%;text-align:left;min-height:118px;padding:18px 22px;border-radius:22px;background:linear-gradient(#ffe08a,#f0b429);box-shadow:0 6px 0 #8a6420;font-size:clamp(26px,3vw,40px);line-height:1.15;}",
    ".tt-diff-btn small{display:block;margin-top:8px;font-family:Trebuchet MS,Segoe UI,Verdana,sans-serif;font-size:18px;font-weight:700;line-height:1.3;}",
    ".tt-diff-btn.is-focus{outline:4px solid #fff;outline-offset:3px;}",
    "@media (prefers-reduced-motion:reduce){.tt-cell.is-cursor,.tt-core.is-panic .tt-core-readout,.tt-beat{animation:none;}}",
    "@media (max-width:980px){.tt-cast,.tt-play,.tt-end,.tt-result,.tt-ask{grid-template-columns:1fr;}.tt-roster{flex-direction:row;overflow:auto;}.tt-answers{grid-template-columns:1fr;}}",
    ".tt-credits{position:fixed;inset:0;z-index:50;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(8,4,16,.78);}",
    ".tt-credits[hidden]{display:none !important;}",
    ".tt-credits-card{width:min(28rem,100%);max-height:min(84vh,560px);overflow:auto;background:#f7f9ff;color:#1c1917;border:4px solid #7ea2e8;border-radius:18px;padding:16px 18px 18px;box-shadow:0 14px 0 rgba(0,0,0,.28);text-align:center;user-select:text;}",
    ".tt-root .tt-credits-card .tt-credits-name{margin:0 0 8px;font:700 1.15rem/1.3 Georgia,'Times New Roman',serif;color:#142033;}",
    ".tt-root .tt-credits-card p{margin:0 0 8px;font:600 15px/1.45 'Segoe UI',system-ui,sans-serif;color:#1c1917;text-align:center;}",
    ".tt-root .tt-credits-card a{color:#1d4ed8;}",
    ".tt-root button.tt-credits-close{margin-top:6px;font:700 14px/1 'Segoe UI',system-ui,sans-serif;color:#fff8ea;background:#146b45;border:2px solid #e0b56a;border-radius:999px;padding:7px 14px;cursor:pointer;}"
  ].join("");

  function mount(el) {
    if (!el) throw new Error("mount target missing");
    var alive = true;
    var timeouts = [];
    var stars = [];
    for (var s = 0; s < 90; s++) {
      stars.push({ x: Math.random(), y: Math.random(), r: Math.random() * 1.5 + 0.3, p: Math.random() * Math.PI * 2, s: 0.4 + Math.random() * 1.6 });
    }
    var comet = { x: -0.05, y: 0.22 };
    var epitaphN = 0;
    var lastNow = 0;
    var lastTick = (typeof performance !== "undefined" ? performance.now() : Date.now());
    var session = {
      screen: "cast",
      focus: 0,
      seats: [null, null, null, null],
      castError: "",
      timerOn: true,
      timerLive: false,
      remainMs: 30000,
      timerMax: 30000,
      paused: false,
      players: [],
      active: 0,
      cells: [],
      cursor: { row: 0, col: 0 },
      holoDeck: [],
      warpDeck: [],
      cell: null,
      question: null,
      qEffect: "",
      swapNote: "",
      multi: null,
      choice: -1,
      result: null,
      stealer: -1,
      koba: null,
      winner: -1,
      hintFor: null,
      hint: 1,
      bursts: [],
      mic: "ask",
      level: "",
      bank: null,
      net: { role: "local", code: "", note: "", selfId: "", hostId: "", self: 0, crewId: "", guests: [], lobby: null }
    };
    var rec = null;
    var micWanted = false;
    var micTries = 0;
    var hailRoom = null;
    var hailSend = null;
    var hailWait = 0;
    var hailToken = 0;
    var hailQueued = false;
    var hailSending = false;
    var hailClosing = false;
    var trysteroLoad = null;
    var lastHailTick = 0;

    if (typeof window !== "undefined" && window.getComputedStyle(el).position === "static") el.style.position = "relative";
    el.style.overflow = "hidden";
    el.innerHTML = "";
    el.dataset.game = "trek-trivia-make-it-so";
    var root = document.createElement("div");
    root.className = "tt-root";
    root.innerHTML = [
      "<canvas class='tt-stars' data-draw='stars'></canvas>",
      "<div class='tt-shell'>",
      "<header class='tt-top'>",
      "<div class='tt-brand'><img class='tt-logo' alt='Just Trek Trivia. Make it so.' src='" + scriptBase() + "just-trek-trivia-logo.png'></div>",
      "<div class='tt-chips'><span class='tt-leftnote' data-left>Choose a crew</span>",
      "<button type='button' class='tt-chip' data-act='timer' data-timer-toggle>TIMER ON</button>",
      "<button type='button' class='tt-chip' data-act='pause'>Pause</button>",
      "<button type='button' class='tt-chip' data-credits aria-haspopup='dialog' aria-expanded='false'>Credits</button></div>",
      "</header>",
      "<div class='tt-stage' data-screen='cast'></div>",
      "<footer class='tt-help'>Arrows move · 1–4 or A–D answer · Make it so submits · Say a category and a value · Say okay, next, or board to go back · T timer · P pause · R restart · Esc quit</footer>",
      "<canvas class='tt-fx' data-draw='fx'></canvas>",
      "</div>",
      "<div class='tt-pause' hidden><div class='tt-pause-card'>",
      portrait("brick", 140),
      "<h2>Paused</h2><p>The self-destruct is holding its breath.</p>",
      "<div class='tt-pause-actions'>",
      "<button type='button' data-act='pause'>Resume</button>",
      "<button type='button' data-act='restart'>Restart</button>",
      "<button type='button' data-act='quit'>Quit</button>",
      "</div></div></div>",
      "<div class='tt-credits' data-credits hidden>",
      "<div class='tt-credits-card' role='dialog' aria-modal='true' aria-label='Credits'>",
      "<p class='tt-credits-name'>Travis MacDonald</p>",
      "<p><a href='https://travisjmac.com'>https://travisjmac.com</a></p>",
      "<p><a href='mailto:travis@travisjmac.com'>travis@travisjmac.com</a></p>",
      "<p>Hope you like these. They were fun to make.</p>",
      "<p>Use that urge to create. Building something you care about lasts longer than tearing something down. Enjoy these, then go make your own.</p>",
      "<button type='button' class='tt-credits-close'>Close</button>",
      "</div></div>"
    ].join("");
    var style = document.createElement("style");
    style.textContent = "@font-face{font-family:Audiowide;src:url('" + scriptBase() + "fonts/Audiowide-Regular.ttf') format('truetype');font-weight:400;font-style:normal;font-display:swap;}@font-face{font-family:Michroma;src:url('" + scriptBase() + "fonts/Michroma-Regular.ttf') format('truetype');font-weight:400;font-style:normal;font-display:swap;}" + CSS;
    root.prepend(style);
    el.appendChild(root);
    var stage = root.querySelector(".tt-stage");

    function later(fn, ms) {
      var id = setTimeout(fn, ms);
      timeouts.push(id);
      return id;
    }

    function paintAll(now) {
      var dt = lastNow ? Math.min(0.05, (now - lastNow) / 1000) : 0.016;
      lastNow = now;
      root.querySelectorAll("canvas").forEach(function (canvas) {
        var kind = canvas.dataset.draw;
        if (!kind) return;
        if (kind === "stars") {
          drawStars(canvas, canvas.getContext("2d"), stars, comet, now);
          return;
        }
        if (kind === "fx") {
          drawFx(canvas, canvas.getContext("2d"), session.bursts, dt);
          return;
        }
        if (kind === "core") {
          var box = prep(canvas);
          if (!box) return;
          var ratio = !session.timerOn ? 1 : (session.timerMax ? Math.max(0, session.remainMs / session.timerMax) : 1);
          drawCore(box.ctx, box.w, box.h, now, ratio);
          return;
        }
        if (kind === "ship") {
          drawShip(canvas.getContext("2d"), now);
          return;
        }
        if (kind === "icon") {
          drawIcon(canvas.getContext("2d"), canvas.dataset.icon, now);
        }
      });
    }

    function render() {
      if (!alive) return;
      stage.dataset.screen = session.screen;
      stage.innerHTML = stageHTML();
      var toggle = root.querySelector("[data-timer-toggle]");
      if (toggle) {
        toggle.textContent = session.timerOn ? "TIMER ON" : "TIMER OFF";
        toggle.classList.toggle("is-off", !session.timerOn);
      }
      var left = root.querySelector("[data-left]");
      if (left) {
        if (session.screen === "diff") left.textContent = "Choose a difficulty";
        else if (!session.players.length) left.textContent = "Choose a crew";
        else left.textContent = session.cells.filter(function (c) { return !c.used; }).length + " cells left";
      }
      var pause = root.querySelector(".tt-pause");
      if (pause) pause.hidden = !session.paused;
      paintAll(typeof performance !== "undefined" ? performance.now() : Date.now());
      updateTimerDom();
      publishHail();
    }

    function stageHTML() {
      if (session.screen === "cast") return castHTML();
      if (session.screen === "diff") return diffHTML();
      if (session.screen === "board") return playShell(boardHTML());
      if (session.screen === "question") return playShell(questionHTML());
      if (session.screen === "result") return playShell(resultHTML());
      return endHTML();
    }

    function bridgeSeats() {
      if (!remotePlay()) return session.seats.slice();
      var seats = [null, null, null, null];
      var n = 0;
      if (session.net.role === "host") {
        if (session.net.crewId) seats[n++] = session.net.crewId;
        session.net.guests.forEach(function (g) {
          if (g.crewId && n < 4) seats[n++] = g.crewId;
        });
        return seats;
      }
      var lobby = session.net.lobby;
      if (lobby && lobby.hostCrew) seats[n++] = lobby.hostCrew;
      ((lobby && lobby.guests) || []).forEach(function (g) {
        if (g.crewId && n < 4 && seats.indexOf(g.crewId) < 0) seats[n++] = g.crewId;
      });
      if (session.net.crewId && seats.indexOf(session.net.crewId) < 0 && n < 4) seats[n] = session.net.crewId;
      return seats;
    }

    function castHTML() {
      var shown = bridgeSeats();
      var cards = CREW.map(function (crew, index) {
        var seated = shown.indexOf(crew.id);
        return [
          "<button type='button' class='tt-card",
          session.focus === index ? " is-focus" : "",
          seated >= 0 ? " is-seated" : "",
          crew.joke ? " is-joke" : "",
          "' data-act='pick' data-who='", crew.id, "' style='--crew:", crew.color, "'>",
          portrait(crew.id),
          "<span class='tt-card-rank'>", esc(crew.rank), "</span>",
          "<span class='tt-card-name'>", esc(crew.name), "</span>",
          "<span class='tt-card-blurb'>", esc(crew.blurb), "</span>",
          "<span class='tt-card-perk'>", esc(crew.perk), "</span>",
          seated >= 0 ? "<span class='tt-seated-flag'>Crew " + (seated + 1) + "</span>" : "",
          "</button>"
        ].join("");
      }).join("");
      var seats = shown.map(function (id, i) {
        if (!id) return "<div class='tt-seat is-empty'><span>Chair " + (i + 1) + "</span><small>empty</small></div>";
        var crew = crewById(id);
        return "<button type='button' class='tt-seat' data-act='unseat' data-seat='" + i + "' style='--crew:" + crew.color + "'>" + portrait(crew.id, 48) + "<span>" + esc(crew.short) + "</span></button>";
      }).join("");
      var remote = remotePlay();
      var count = session.net.role === "host"
        ? (session.net.crewId ? 1 : 0) + session.net.guests.filter(function (g) { return g.crewId; }).length
        : shown.filter(Boolean).length;
      var start = session.net.role === "guest"
        ? "<p class='tt-hail-note'>The host starts when everyone has an officer.</p>"
        : "<button type='button' class='tt-start" + (session.focus === CREW.length ? " is-focus" : "") + "' data-act='start'>" +
          (count ? "Make it so · " + count + (count === 1 ? " officer" : " officers") : "Make it so") + "</button>";
      return [
        "<div class='tt-cast'><div class='tt-cast-copy'>",
        "<h2>Who's on this mission?</h2>",
        "<ul class='tt-rules'>",
        "<li>", remote ? "Pick your officer" : "Pick 1 to 4 officers", "</li>",
        "<li>Everyone locks together</li>",
        "<li>First correct scores full</li>",
        "<li>High score wins</li>",
        "</ul>",
        "<div class='tt-seats'>", seats, "</div>",
        "<p class='tt-error'>", esc(session.castError), "</p>",
        hailBlock(),
        start,
        micBlock(),
        "</div><div class='tt-cast-grid'>", cards, "</div></div>"
      ].join("");
    }

    function rosterHTML() {
      return session.players.map(function (p, index) {
        var crew = crewById(p.id);
        var note = ribbon(index);
        return [
          "<article class='tt-crew", index === session.active && session.screen === "board" ? " is-active" : "",
          "' style='--crew:", crew.color, "'>",
          portrait(p.id, 64),
          "<div><strong>", esc(p.short), "</strong><em>", p.score, "</em>",
          note ? "<small>" + esc(note) + "</small>" : "",
          "</div></article>"
        ].join("");
      }).join("");
    }

    function ribbon(index) {
      var p = session.players[index];
      if (!p) return "";
      if (session.screen === "question" && session.round) {
        return session.round.locks[index] ? "Locked" : "Answering";
      }
      if (session.screen === "board" && index === session.active) return "Picking";
      return "";
    }

    function playShell(inner) {
      return "<div class='tt-play'><div class='tt-roster'>" + rosterHTML() + "</div><div class='tt-main'>" + inner + "</div></div>";
    }

    function boardHTML() {
      var player = session.players[session.active];
      var who = player ? player.short : "The bridge";
      var heads = COLS.map(function (col, i) {
        return "<div class='tt-colhead" + (col.name.length > 12 ? " is-long" : "") + "' style='--crew:" + col.color + "'>" + insignia(i) + "<span>" + esc(col.name) + "</span></div>";
      }).join("");
      var cells = session.cells.map(function (cell) {
        var cursor = session.cursor.row === cell.row && session.cursor.col === cell.col;
        var label = cell.special === "q" ? "Q Card" : cell.special === "holodeck" ? "Holodeck" : cell.special === "warp" ? "Warp Core" : "";
        return [
          "<button type='button' class='tt-cell", cursor ? " is-cursor" : "", cell.used ? " is-used" : "",
          "' data-act='cell' data-row='", cell.row, "' data-col='", cell.col, "' data-special='", cell.special, "'>",
          cell.used ? "<span class='tt-spec'>cleared</span>" : "<canvas width='48' height='48' data-draw='icon' data-icon='" + (cell.special || COLS[cell.col].icon) + "'></canvas><span class='tt-val'>" + cell.value + "</span>" + (label ? "<span class='tt-spec'>" + label + "</span>" : ""),
          "</button>"
        ].join("");
      }).join("");
      var levelName = levelLabel(session.level);
      return "<div class='tt-screen'>" + hailStatus() + (session.mic === "off" ? "" : micBlock()) + "<p class='tt-legend'>" + esc(who) + " picks the cell on " + esc(levelName) + ". Everyone answers it. First correct answer scores the cell. A later correct answer scores half. Holodeck adds 200.</p><div class='tt-board'>" + heads + cells + "</div></div>";
    }

    function questionHTML() {
      var cell = session.cell;
      var q = session.question;
      var round = session.round;
      if (!cell || !q || !q.a || !round) {
        return "<div class='tt-screen' data-question='open'>" + hailStatus() + "<p class='tt-q'>Waiting for the question.</p></div>";
      }
      var title = COLS[cell.col].name + " for " + cell.value;
      var pads = session.players.map(function (person, index) {
        var crew = crewById(person.id);
        var locked = round.locks[index];
        var pick = round.picks[index];
        var place = locked ? round.order.indexOf(index) : -1;
        var status = locked ? "Locked · " + (place + 1) : pick >= 0 ? "Ready" : "Waiting";
        var mine = !remotePlay() || index === session.net.self;
        var choices = "";
        if (!mine) {
          choices = "<p class='tt-pad-wait'>" + (locked ? "Answer sealed." : "Still choosing.") + "</p>";
        } else if (!locked) {
          choices = "<div class='tt-answers'>" + q.a.map(function (text, i) {
            return "<button type='button' class='tt-choice" + (pick === i ? " is-selected" : "") + "' data-act='choice' data-player='" + index + "' data-choice='" + i + "'><b>" + "ABCD".charAt(i) + "</b>" + esc(text) + "</button>";
          }).join("") + "</div><button type='button' class='tt-lock' data-act='lock' data-player='" + index + "'>Make it so</button>";
        } else {
          choices = "<p class='tt-pad-wait'>Answer sealed.</p>";
        }
        return [
          "<section class='tt-pad", round.pad === index ? " is-pad" : "", locked ? " is-locked" : "",
          "' style='--crew:", crew.color, "'>",
          portrait(person.id, 72),
          "<div class='tt-pad-body'><strong>", esc(person.short), "</strong><span>", status, "</span>",
          choices,
          "</div></section>"
        ].join("");
      }).join("");
      return [
        "<div class='tt-screen' data-question='open'>",
        "<div class='tt-qhead'><b>", esc(title), "</b><span>", round.order.length, " / ", session.players.length, " locked</span></div>",
        hailStatus(),
        "<div class='tt-banner'>", esc(bannerText()), "</div>",
        timerBlock(),
        "<p class='tt-q'>", esc(q.q), "</p>",
        "<div class='tt-pads'>", pads, "</div>",
        "</div>"
      ].join("");
    }

    function timerBlock() {
      var secs = !session.timerOn ? "OFF" : String(Math.max(0, Math.ceil(session.remainMs / 1000)));
      return "<div class='tt-coreline'><div class='tt-core" + (!session.timerOn ? " is-off" : "") + "'><canvas data-draw='core'></canvas><div class='tt-core-readout'><span>SHARED CLOCK</span><b data-timer>" + secs + "</b></div></div><span class='tt-mascot'>" + portrait("brick", 72) + "</span></div>";
    }

    function bannerText() {
      var bits = ["One clock for the whole bridge. Lock with Make it so. Nothing is marked right or wrong until the clock ends or every officer locks."];
      if (session.qEffect === "double") bits.push("Q doubled the points. First correct answer takes the doubled score.");
      if (session.qEffect === "everyone") bits.push("Q put the whole bridge on this question.");
      if (session.qEffect === "swap" && session.swapNote) bits.push(session.swapNote);
      if (session.cell && session.cell.special === "holodeck") bits.push("Holodeck adds 200 to the cell.");
      if (session.cell && session.cell.special === "warp") bits.push("Warp core. First correct answer still takes the full points.");
      return bits.join(" ");
    }

    function quipFor(player) {
      return crewById(player.id).quip;
    }

    function resultHTML() {
      var r = session.result;
      if (!r) return "<div class='tt-screen'>" + hailStatus() + "<p class='tt-q'>Waiting for the result.</p></div>";
      var person = session.players[session.active] || session.players[0];
      var beats = (r.beats || []).map(function (beat) {
        var line;
        if (beat.ok && !beat.late) line = beat.name + " takes full points, +" + beat.points + ".";
        else if (beat.ok) line = beat.name + " is later and right. Half, +" + beat.points + ".";
        else if (beat.missed) line = beat.name + " never locks. +0.";
        else line = beat.name + " misses. +0.";
        return "<li class='tt-beat " + (beat.ok ? "is-hit" : "is-miss") + "'><b>" + beat.place + "</b><span>" + esc(line) + "</span><em>" + beat.score + "</em></li>";
      }).join("");
      var reveal = beats
        ? "<p class='tt-reveal-count'>" + r.right + " right · " + r.wrong + " wrong</p><ol class='tt-beats'>" + beats + "</ol>"
        : "<p>" + esc(r.detail) + "</p>";
      return [
        "<div class='tt-screen tt-result ", r.ok ? "ok" : "bad", "' data-result='1'>",
        hailStatus(),
        portrait(person.id, 200),
        "<div><h2>", esc(r.headline), "</h2>",
        reveal,
        r.answer ? "<div class='tt-answerbox'>The record says: " + esc(r.answer) + "</div>" : "",
        r.quip ? "<p class='tt-quip'>" + esc(r.quip) + "</p>" : "",
        "<button type='button' class='tt-lock' data-act='continue'>Back to the board</button>",
        "</div></div>"
      ].join("");
    }

    function endHTML() {
      if (session.screen === "victory") {
        var winner = session.players[session.winner];
        return endCard(winner.id, victoryLine(winner), scoreList(), "Play again");
      }
      if (session.screen === "tie") {
        return endCard(session.players[session.tied[0]].id, "A tie is a tie", "<p>Same top score. The board is clear, and nobody breaks it.</p>" + scoreList(), "Play again");
      }
      return endCard(session.players[0].id, "Play again", scoreList(), "Play again");
    }

    function victoryLine() {
      return "Highest score. The chair is yours.";
    }

    function scoreList() {
      var order = session.players.map(function (p, i) { return i; }).sort(function (a, b) {
        return session.players[b].score - session.players[a].score;
      });
      return "<ul class='tt-scorelist'>" + order.map(function (i) {
        var p = session.players[i];
        return "<li><span>" + esc(p.short) + "</span><b>" + p.score + "</b></li>";
      }).join("") + "</ul>";
    }

    function endCard(who, title, body, button) {
      return "<div class='tt-end'>" + hailStatus() + portrait(who, 240) + "<div><h2>" + esc(title) + "</h2>" + body + "<button type='button' class='tt-lock' data-act='restart'>" + button + "</button></div></div>";
    }

    function updateTimerDom() {
      var secs = !session.timerOn ? "OFF" : String(Math.max(0, Math.ceil(session.remainMs / 1000)));
      root.querySelectorAll("[data-timer]").forEach(function (node) { node.textContent = secs; });
      var core = root.querySelector(".tt-core");
      if (core) core.classList.toggle("is-panic", !!(session.timerOn && session.timerLive && session.remainMs <= 10000));
    }

    function shakeStage() {
      stage.classList.remove("is-shake");
      void stage.offsetWidth;
      stage.classList.add("is-shake");
    }

    function celebrate(ok) {
      var shell = root.querySelector(".tt-shell");
      var rect = shell ? shell.getBoundingClientRect() : { width: 800, height: 600 };
      var x = (rect.width || 800) * 0.66;
      var y = (rect.height || 600) * 0.4;
      var n = ok ? 26 : 16;
      for (var i = 0; i < n; i++) {
        var a = Math.random() * Math.PI * 2;
        var speed = 90 + Math.random() * 220;
        session.bursts.push({
          kind: ok ? "good" : "bad",
          x: x, y: y,
          vx: Math.cos(a) * speed,
          vy: Math.sin(a) * speed - 50,
          life: 0.7 + Math.random() * 0.45,
          age: 0,
          spin: Math.random() * 6,
          size: 5 + Math.random() * 7,
          hue: ok ? ["#ffd56a", "#fff1c4", "#7ee0ff", "#ff8bd2"][i % 4] : "#e23b45"
        });
      }
      if (session.bursts.length > 80) session.bursts.splice(0, session.bursts.length - 80);
    }

    function pointsFor(cell) {
      var pts = cell.value;
      if (cell.special === "holodeck") pts += 200;
      if (session.qEffect === "double") pts *= 2;
      return pts;
    }

    function arm(ms) {
      session.remainMs = ms;
      session.timerMax = ms;
      session.timerLive = true;
    }

    function questionFor(cell) {
      if (cell.special === "holodeck" && session.holoDeck.length) return session.holoDeck.pop();
      if (cell.special === "warp" && session.warpDeck.length) return session.warpDeck.pop();
      return session.bank[cell.col][cell.row];
    }

    function ensureHint() {
      if (session.hintFor === session.question) return;
      session.hintFor = session.question;
      session.hint = 1 + Math.floor(Math.random() * 4);
    }

    function toggleSeat(id) {
      if (!strictCrew(id)) return;
      if (remotePlay()) {
        if (session.net.crewId === id) {
          session.net.crewId = "";
          session.seats = [null, null, null, null];
          session.castError = "";
          if (session.net.role === "guest") sendHail({ t: "crew", crewId: "" });
          render();
          return;
        }
        if (officerTaken(id)) {
          session.castError = "That officer is already aboard.";
          render();
          return;
        }
        session.seats = [id, null, null, null];
        session.net.crewId = id;
        session.castError = "";
        if (session.net.role === "guest") sendHail({ t: "crew", crewId: id });
        render();
        return;
      }
      var idx = session.seats.indexOf(id);
      if (idx >= 0) {
        session.seats[idx] = null;
        session.castError = "";
        render();
        return;
      }
      var empty = session.seats.indexOf(null);
      if (empty < 0) {
        session.castError = "Four chairs. That is the whole bridge.";
        render();
        return;
      }
      session.seats[empty] = id;
      session.castError = "";
      render();
    }

    function officerTaken(id) {
      if (session.net.role === "host") return crewTaken(id);
      var lobby = session.net.lobby;
      if (lobby && lobby.hostCrew === id) return true;
      var guests = (lobby && lobby.guests) || [];
      for (var i = 0; i < guests.length; i++) {
        if (guests[i].crewId === id && guests[i].peerId !== session.net.selfId) return true;
      }
      return false;
    }

    function levelLabel(id) {
      for (var i = 0; i < LEVELS.length; i++) if (LEVELS[i].id === id) return LEVELS[i].name;
      return "this difficulty";
    }

    function blankNet() {
      return { role: "local", code: "", note: "", selfId: "", hostId: "", self: 0, crewId: "", guests: [], lobby: null };
    }

    function remotePlay() {
      return session.net.role === "host" || session.net.role === "guest";
    }

    function hailStatus() {
      if (!session.net) return "";
      var lines = [];
      if (remotePlay() && session.net.code && session.screen !== "cast") lines.push("Frequency " + session.net.code);
      if (session.net.note) lines.push(session.net.note);
      if (!lines.length) return "";
      return "<p class='tt-hail-note'>" + esc(lines.join(" · ")) + "</p>";
    }

    function hailBlock() {
      var net = session.net;
      var extra = net.note && net.role !== "local" ? "" : (net.note ? "<p class='tt-hail-note'>" + esc(net.note) + "</p>" : "");
      if (net.role === "host" && net.code) {
        var ready = net.guests.filter(function (g) { return g.crewId; }).length;
        var waiting = ready ? ready + (ready === 1 ? " guest is" : " guests are") + " aboard." : "Waiting for a guest.";
        return "<p class='tt-hail-kicker'>Hailing frequency</p><p class='tt-hail-code'>" + esc(net.code) + "</p><p class='tt-hail-note'>" + esc(waiting) + " You play too.</p>" + (net.note ? "<p class='tt-hail-note'>" + esc(net.note) + "</p>" : "");
      }
      if (net.role === "guest") {
        return "<p class='tt-hail-kicker'>Joined frequency</p><p class='tt-hail-code'>" + esc(net.code) + "</p>" + (net.note ? "<p class='tt-hail-note'>" + esc(net.note) + "</p>" : "");
      }
      return "<button type='button' class='tt-hail' data-act='hail'>Open hailing frequencies</button><form class='tt-hail-join'><input aria-label='Room code' maxlength='4' placeholder='CODE' autocomplete='off' spellcheck='false'><button type='submit'>Join</button></form>" + extra;
    }

    function roomCode() {
      var alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
      var out = "";
      for (var i = 0; i < 4; i++) out += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
      return out;
    }

    function cleanCode(raw) {
      return String(raw || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 4);
    }

    function loadTrystero() {
      if (!trysteroLoad) trysteroLoad = import("https://esm.run/trystero@0.26.0");
      return trysteroLoad;
    }

    function sendHail(msg, target) {
      if (!hailSend) return;
      try {
        if (target) hailSend(msg, { target: target });
        else hailSend(msg);
      } catch (sendErr) {}
    }

    function leaveHail() {
      hailToken += 1;
      hailClosing = true;
      if (hailWait) {
        clearTimeout(hailWait);
        hailWait = 0;
      }
      if (hailRoom) {
        try { hailRoom.leave(); } catch (leaveErr) {}
      }
      hailRoom = null;
      hailSend = null;
      hailClosing = false;
      session.net = blankNet();
    }

    function playerIndexByPeer(peerId) {
      for (var i = 0; i < session.players.length; i++) {
        if (session.players[i].peerId === peerId) return i;
      }
      return -1;
    }

    function strictCrew(id) {
      for (var i = 0; i < CREW.length; i++) if (CREW[i].id === id) return CREW[i];
      return null;
    }

    function crewTaken(id, exceptPeer) {
      if (session.net.crewId === id) return true;
      for (var i = 0; i < session.net.guests.length; i++) {
        var guest = session.net.guests[i];
        if (guest.peerId !== exceptPeer && guest.crewId === id) return true;
      }
      return false;
    }

    function guestRecord(peerId) {
      for (var i = 0; i < session.net.guests.length; i++) {
        if (session.net.guests[i].peerId === peerId) return session.net.guests[i];
      }
      return null;
    }

    function lobbyPayload() {
      return {
        t: "lobby",
        code: session.net.code,
        hostCrew: session.net.crewId || "",
        guests: session.net.guests.map(function (g) { return { peerId: g.peerId, crewId: g.crewId || "" }; })
      };
    }

    function netView() {
      var question = null;
      if (session.screen === "question" && session.question) {
        question = { q: session.question.q, a: session.question.a.slice() };
      }
      var result = null;
      if (session.screen === "result" || session.screen === "victory" || session.screen === "tie") result = session.result;
      return {
        t: "view",
        screen: session.screen,
        level: session.level,
        players: session.players.map(function (p) {
          return { id: p.id, name: p.name, short: p.short, score: p.score, peerId: p.peerId || "" };
        }),
        active: session.active,
        cells: (session.cells || []).map(function (c) {
          return { row: c.row, col: c.col, value: c.value, special: c.special, used: !!c.used };
        }),
        cell: session.cell ? { row: session.cell.row, col: session.cell.col, value: session.cell.value, special: session.cell.special || "" } : null,
        question: question,
        round: session.round ? {
          locks: session.round.locks.map(function (lock) { return lock ? 1 : 0; }),
          order: session.round.order.slice()
        } : null,
        result: result,
        qEffect: session.qEffect,
        swapNote: session.swapNote,
        timerOn: session.timerOn,
        timerLive: session.timerLive,
        remainMs: session.remainMs,
        timerMax: session.timerMax,
        winner: session.winner,
        tied: session.tied || [],
        note: session.net.note || ""
      };
    }

    function publishHail() {
      if (hailSending || session.net.role !== "host" || !hailSend) return;
      if (hailQueued) return;
      hailQueued = true;
      later(function () {
        hailQueued = false;
        if (!alive || session.net.role !== "host" || !hailSend) return;
        hailSending = true;
        try {
          if (!session.players.length || session.screen === "cast" || session.screen === "diff") sendHail(lobbyPayload());
          else sendHail(netView());
        } finally {
          hailSending = false;
        }
      }, 0);
    }

    function syncClock() {
      if (session.net.role !== "host" || !hailSend) return;
      sendHail({
        t: "tick",
        remainMs: Math.max(0, session.remainMs),
        timerLive: !!session.timerLive,
        timerOn: !!session.timerOn
      });
    }

    function applyLobby(msg) {
      session.net.lobby = { hostCrew: msg.hostCrew || "", guests: msg.guests || [] };
      session.net.note = session.net.crewId ? "Aboard. The host starts when the bridge is ready." : "Connected. Pick your officer. The host plays too.";
      render();
    }

    function applyView(view) {
      if (!view || view.t !== "view") return;
      var kept = -1;
      if (session.round && session.net.self >= 0 && session.round.picks) kept = session.round.picks[session.net.self];
      session.level = view.level || session.level;
      session.players = (view.players || []).map(function (p) {
        return { id: p.id, name: p.name, short: p.short, score: p.score || 0, peerId: p.peerId || "" };
      });
      session.net.self = -1;
      for (var i = 0; i < session.players.length; i++) {
        if (session.players[i].peerId === session.net.selfId) session.net.self = i;
      }
      session.active = view.active || 0;
      session.cells = view.cells || [];
      session.cell = view.cell;
      session.qEffect = view.qEffect || "";
      session.swapNote = view.swapNote || "";
      session.timerOn = view.timerOn !== false;
      session.timerLive = !!view.timerLive;
      session.remainMs = view.remainMs || 0;
      session.timerMax = view.timerMax || 30000;
      session.winner = view.winner;
      session.tied = view.tied || [];
      if (typeof view.note === "string") session.net.note = view.note;
      if (view.screen === "question" && view.question && view.round) {
        session.question = { q: view.question.q, a: view.question.a.slice(), c: -1 };
        session.round = {
          picks: session.players.map(function () { return -1; }),
          locks: view.round.locks.map(function (flag) { return flag ? { choice: -1, at: 0 } : null; }),
          order: view.round.order.slice(),
          pad: session.net.self
        };
        if (kept >= 0 && session.net.self >= 0 && !view.round.locks[session.net.self]) session.round.picks[session.net.self] = kept;
        session.result = null;
      } else if (view.screen === "result" || view.screen === "victory" || view.screen === "tie") {
        session.result = view.result;
        session.round = null;
        session.question = null;
      } else {
        session.question = null;
        session.round = null;
        session.result = null;
      }
      session.screen = view.screen || "board";
      render();
    }

    function onHail(msg, peerId) {
      if (!msg || !peerId) return;
      if (session.net.role === "host") {
        if (msg.t === "iam" || msg.t === "crew") {
          var known = guestRecord(peerId);
          if (!known) {
            if (session.players.length || session.net.guests.length >= 3) {
              sendHail({ t: "full" }, peerId);
              session.net.note = session.players.length
                ? "A peer tried to join after the mission started. This bridge is closed."
                : "A fifth player tried to join. This bridge holds four.";
              render();
              return;
            }
            known = { peerId: peerId, crewId: "" };
            session.net.guests.push(known);
            session.net.note = "";
          }
          if (msg.t === "crew") {
            if (!msg.crewId) {
              known.crewId = "";
            } else {
              var crew = strictCrew(msg.crewId);
              if (!crew) return;
              if (crewTaken(crew.id, peerId)) {
                sendHail({ t: "busy" }, peerId);
                return;
              }
              known.crewId = crew.id;
            }
          }
          sendHail({ t: "welcome", code: session.net.code }, peerId);
          sendHail(session.players.length && session.screen !== "cast" ? netView() : lobbyPayload(), peerId);
          render();
          return;
        }
        if (msg.t === "pick") {
          if (playerIndexByPeer(peerId) !== session.active) return;
          openCell(Number(msg.row), Number(msg.col), peerId);
          return;
        }
        if (msg.t === "lock") {
          var idx = playerIndexByPeer(peerId);
          if (idx < 0 || !session.round) return;
          var choice = Number(msg.choice);
          if (!(choice >= 0 && choice <= 3)) return;
          session.round.picks[idx] = choice;
          lockPad(idx, peerId);
          return;
        }
        if (msg.t === "continue") {
          if (session.screen === "result") afterResolved();
          return;
        }
        return;
      }
      if (session.net.role !== "guest") return;
      if (msg.t === "iam" && msg.role === "host") {
        session.net.hostId = peerId;
        if (hailWait) {
          clearTimeout(hailWait);
          hailWait = 0;
        }
        session.net.note = "Connected. Pick your officer. The host plays too.";
        if (session.net.crewId) sendHail({ t: "crew", crewId: session.net.crewId }, peerId);
        render();
        return;
      }
      if (msg.t === "welcome") {
        session.net.hostId = peerId;
        if (hailWait) {
          clearTimeout(hailWait);
          hailWait = 0;
        }
        if (!session.net.note) session.net.note = "Connected. Pick your officer. The host plays too.";
        render();
        return;
      }
      if (msg.t === "full") {
        session.net.note = "That bridge is already full.";
        render();
        return;
      }
      if (msg.t === "busy") {
        session.net.note = "That officer is already aboard. Pick someone else.";
        session.net.crewId = "";
        session.seats = [null, null, null, null];
        render();
        return;
      }
      if (msg.t === "lobby") {
        if (session.net.hostId && peerId !== session.net.hostId) return;
        session.net.hostId = peerId;
        applyLobby(msg);
        return;
      }
      if (msg.t === "view") {
        if (session.net.hostId && peerId !== session.net.hostId) return;
        session.net.hostId = peerId;
        applyView(msg);
        return;
      }
      if (msg.t === "tick") {
        if (session.net.hostId && peerId !== session.net.hostId) return;
        session.remainMs = Number(msg.remainMs) || 0;
        session.timerLive = !!msg.timerLive;
        if (typeof msg.timerOn === "boolean") session.timerOn = msg.timerOn;
        updateTimerDom();
        var toggle = root.querySelector("[data-timer-toggle]");
        if (toggle && typeof msg.timerOn === "boolean") {
          toggle.textContent = session.timerOn ? "TIMER ON" : "TIMER OFF";
          toggle.classList.toggle("is-off", !session.timerOn);
        }
      }
    }

    function onHailError() {
      session.net.note = "A peer could not connect. The direct line failed.";
      render();
    }

    function attachRoom(mod, code) {
      var room = mod.joinRoom({
        appId: "just-trek-trivia-make-it-so",
        password: code,
        rtcConfig: {
          iceServers: [
            { urls: "stun:stun.l.google.com:19302" },
            { urls: "stun:stun.cloudflare.com:3478" }
          ]
        }
      }, code, { onJoinError: onHailError });
      var action = room.makeAction("hail");
      action.onMessage = function (data, meta) {
        onHail(data, meta && meta.peerId);
      };
      hailSend = function (msg, options) { return action.send(msg, options); };
      room.onPeerLeave = function (peerId) {
        if (!alive || hailClosing) return;
        var left = guestRecord(peerId);
        session.net.guests = session.net.guests.filter(function (g) { return g.peerId !== peerId; });
        if (session.net.role === "guest" && peerId === session.net.hostId) {
          session.net.note = "The host left the frequency. A peer could not stay connected.";
        } else {
          var who = left && left.crewId ? crewById(left.crewId).short : "A peer";
          session.net.note = who + " dropped off the frequency. A peer could not stay connected.";
        }
        if (session.net.role === "host" && session.screen === "board" && session.players.length) {
          var guard = 0;
          while (guard < session.players.length && !playerConnected(session.players[session.active])) {
            session.active = (session.active + 1) % session.players.length;
            guard += 1;
          }
        }
        render();
      };
      room.onPeerJoin = function (peerId) {
        sendHail({ t: "iam", role: session.net.role, crewId: session.net.crewId || "" }, peerId);
      };
      hailRoom = room;
      session.net.selfId = mod.selfId || "";
      session.net.code = code;
      var already = room.getPeers ? room.getPeers() : {};
      Object.keys(already || {}).forEach(function (peerId) {
        sendHail({ t: "iam", role: session.net.role, crewId: session.net.crewId || "" }, peerId);
      });
    }

    function playerConnected(person) {
      if (!person) return false;
      if (!person.peerId || person.peerId === session.net.selfId) return true;
      return !!guestRecord(person.peerId);
    }

    function openHail() {
      if (session.net.role === "host" || session.net.role === "guest") return;
      if (openedAsFile()) {
        session.net.note = "Open this page from http://localhost to hail another browser. A file page cannot open the frequencies. One screen still works.";
        render();
        return;
      }
      if (session.net.role === "host" && hailRoom) return;
      session.net.role = "host";
      session.net.note = "Opening hailing frequencies.";
      session.net.code = roomCode();
      session.seats = [null, null, null, null];
      session.net.crewId = "";
      session.net.guests = [];
      var token = ++hailToken;
      var code = session.net.code;
      render();
      loadTrystero().then(function (mod) {
        if (!alive || token !== hailToken || session.net.role !== "host") return;
        attachRoom(mod, code);
        session.net.note = "";
        render();
      }).catch(function () {
        if (!alive) return;
        leaveHail();
        session.net.note = "Hailing frequencies did not open. The introducer could not be reached. One screen still works.";
        render();
      });
    }

    function joinHail(raw) {
      var code = cleanCode(raw);
      if (code.length < 4) {
        session.net.note = "Enter the four-character code.";
        render();
        return;
      }
      if (session.net.role === "host") return;
      if (session.net.role === "guest" && session.net.code === code && (hailRoom || hailWait)) return;
      if (openedAsFile()) {
        session.net.note = "Open this page from http://localhost to join a frequency. Chrome cannot hail from a file page. One screen still works.";
        render();
        return;
      }
      if (hailRoom) leaveHail();
      var token = ++hailToken;
      session.net.role = "guest";
      session.net.code = code;
      session.net.note = "Looking for the host on " + code + ".";
      session.seats = [null, null, null, null];
      session.net.crewId = "";
      render();
      if (hailWait) clearTimeout(hailWait);
      hailWait = later(function () {
        if (token === hailToken && session.net.role === "guest" && !session.net.hostId) {
          session.net.note = "No host answered " + code + ". A peer could not connect.";
          render();
        }
      }, 20000);
      loadTrystero().then(function (mod) {
        if (!alive || token !== hailToken || session.net.role !== "guest") return;
        attachRoom(mod, code);
      }).catch(function () {
        if (!alive) return;
        leaveHail();
        session.net.note = "The frequency did not open. The introducer could not be reached.";
        render();
      });
    }

    function openedAsFile() {
      return typeof location !== "undefined" && location.protocol === "file:";
    }

    function micBlock() {
      if (session.mic === "off") return "";
      if (session.mic === "on") return "<p class='tt-micnote'>Microphone is on. Say a category and a dollar value. Say the answer, or A, B, C, or D. Then say make it so.</p>";
      var note = "";
      if (openedAsFile() || session.mic === "file") note = "<p class='tt-micnote'>This page was opened as a file, not from http://localhost. Chrome blocks the microphone on file://. Mouse and keyboard still work.</p>";
      else if (session.mic === "denied") note = "<p class='tt-micnote'>Microphone blocked. Mouse and keyboard still work.</p>";
      else if (session.mic === "unsupported") note = "<p class='tt-micnote'>This browser has no speech recognition. Mouse and keyboard still work.</p>";
      else if (session.mic === "failed") note = "<p class='tt-micnote'>The microphone did not start. Press the button to try again. Mouse and keyboard still work.</p>";
      var buttons = session.mic === "unsupported" && !openedAsFile()
        ? ""
        : "<button type='button' class='tt-mic' data-act='mic'>Turn on the microphone</button><button type='button' class='tt-mic-skip' data-act='mic-skip'>Play without a microphone</button>";
      return note + buttons;
    }

    function diffHTML() {
      if (session.net.role === "guest") {
        return "<div class='tt-diff'><h2>The host is choosing the difficulty.</h2>" + hailStatus() + micBlock() + "</div>";
      }
      var buttons = LEVELS.map(function (level, index) {
        return "<button type='button' class='tt-diff-btn" + (session.focus === index ? " is-focus" : "") + "' data-act='diff' data-level='" + level.id + "'>" + esc(level.name) + "<small>" + esc(level.blurb) + "</small></button>";
      }).join("");
      return "<div class='tt-diff'><h2>How hard is this mission?</h2>" + hailStatus() + micBlock() + buttons + "</div>";
    }

    function goDifficulty() {
      if (session.net.role === "guest") {
        session.castError = "The host starts the mission.";
        render();
        return;
      }
      if (session.net.role === "host") {
        if (!session.net.selfId) {
          session.castError = "Hailing frequencies are still opening.";
          render();
          return;
        }
        if (!session.net.crewId) {
          session.castError = "Pick your officer. You play too.";
          render();
          return;
        }
        var ready = session.net.guests.filter(function (g) { return g.crewId; }).length;
        if (!ready) {
          session.castError = "Wait for a guest to pick an officer.";
          render();
          return;
        }
        session.screen = "diff";
        session.focus = 0;
        session.castError = "";
        render();
        return;
      }
      var ids = session.seats.filter(Boolean);
      if (!ids.length) {
        session.castError = "Pick at least one officer.";
        render();
        return;
      }
      session.screen = "diff";
      session.focus = 0;
      session.castError = "";
      render();
    }

    function startMatch(level) {
      var pack = PACKS[level];
      if (!pack) return;
      if (session.net.role === "guest") return;
      var players;
      if (session.net.role === "host") {
        var hostCrew = strictCrew(session.net.crewId);
        var aboard = session.net.guests.filter(function (g) { return strictCrew(g.crewId); }).slice(0, 3);
        if (!session.net.selfId || !hostCrew || !aboard.length) {
          session.screen = "cast";
          session.castError = !session.net.selfId
            ? "Hailing frequencies are still opening."
            : (!hostCrew ? "Pick your officer. You play too." : "Wait for a guest to pick an officer.");
          render();
          return;
        }
        players = [{ id: hostCrew.id, name: hostCrew.name, short: hostCrew.short, score: 0, peerId: session.net.selfId }];
        aboard.forEach(function (g) {
          var crew = strictCrew(g.crewId);
          players.push({ id: crew.id, name: crew.name, short: crew.short, score: 0, peerId: g.peerId });
        });
        session.net.self = 0;
      } else {
        var ids = session.seats.filter(Boolean);
        if (!ids.length) {
          session.screen = "cast";
          session.castError = "Pick at least one officer.";
          render();
          return;
        }
        players = ids.map(function (id) {
          var crew = crewById(id);
          return { id: crew.id, name: crew.name, short: crew.short, score: 0 };
        });
      }
      session.level = level;
      session.bank = pack.bank;
      session.players = players;
      session.active = 0;
      session.cells = buildCells();
      session.cursor = { row: 0, col: 0 };
      session.holoDeck = shuffle(pack.holo.slice());
      session.warpDeck = shuffle(pack.warp.slice());
      session.cell = null;
      session.question = null;
      session.round = null;
      session.result = null;
      session.tied = [];
      session.winner = -1;
      session.choice = -1;
      session.qEffect = "";
      session.swapNote = "";
      session.timerLive = false;
      session.screen = "board";
      render();
    }

    function buildCells() {
      var spots = [];
      for (var row = 0; row < 5; row++) {
        for (var col = 0; col < 5; col++) spots.push(row + ":" + col);
      }
      var order = shuffle(spots);
      var specials = ["q", "q", "holodeck", "holodeck", "warp", "warp"];
      var marked = {};
      specials.forEach(function (kind, i) { marked[order[i]] = kind; });
      var cells = [];
      for (var r = 0; r < 5; r++) {
        for (var c = 0; c < 5; c++) {
          cells.push({ row: r, col: c, value: VALUES[r], special: marked[r + ":" + c] || "", used: false });
        }
      }
      return cells;
    }

    function openCell(row, col, fromPeer) {
      if (session.net.role === "guest") {
        if (session.screen !== "board") return;
        if (session.net.self !== session.active) {
          shakeStage();
          return;
        }
        sendHail({ t: "pick", row: row, col: col });
        return;
      }
      if (session.net.role === "host") {
        if (fromPeer) {
          if (playerIndexByPeer(fromPeer) !== session.active) return;
        } else if (session.net.self !== session.active) {
          shakeStage();
          return;
        }
      }
      if (session.screen !== "board") return;
      var player = session.players[session.active];
      if (!player) return;
      var cell = session.cells[row * 5 + col];
      if (!cell || cell.used) {
        shakeStage();
        return;
      }
      cell.used = true;
      session.cursor = { row: row, col: col };
      session.cell = cell;
      session.qEffect = "";
      session.swapNote = "";
      session.round = null;
      session.hintFor = null;
      if (cell.special === "q") {
        var roll = ["double", "swap", "skip", "everyone"][Math.floor(Math.random() * 4)];
        session.qEffect = roll;
        if (roll === "swap") applySwap();
        if (roll === "skip") {
          showSkip();
          return;
        }
      }
      startQuestion();
    }

    function applySwap() {
      if (session.players.length < 2) {
        session.swapNote = "Q tries to swap scores, but you are alone. Q sighs, then lets the question stand.";
        return;
      }
      var other = (session.active + 1) % session.players.length;
      var a = session.players[session.active];
      var b = session.players[other];
      var aScore = a.score;
      var bScore = b.score;
      a.score = bScore;
      b.score = aScore;
      session.swapNote = "Q swapped " + a.short + " (" + aScore + " → " + a.score + ") with " + b.short + " (" + bScore + " → " + b.score + ").";
    }

    function showSkip() {
      session.timerLive = false;
      var player = session.players[session.active];
      session.result = {
        kind: "skip",
        ok: false,
        headline: "Q: lose a turn",
        detail: player.short + " loses the turn. The cell is gone. No points.",
        answer: "",
        quip: "Q looks delighted. That is never good.",
        rows: [],
        offerSteal: false
      };
      session.screen = "result";
      render();
    }

    function startQuestion() {
      session.question = questionFor(session.cell);
      session.round = {
        picks: session.players.map(function () { return -1; }),
        locks: session.players.map(function () { return null; }),
        order: [],
        pad: 0
      };
      ensureHint();
      session.screen = "question";
      arm(30000);
      render();
    }

    function lockPad(index, fromPeer) {
      var round = session.round;
      if (!round || round.locks[index]) return;
      if (session.net.role === "guest") {
        if (index !== session.net.self) return;
        if (round.picks[index] < 0) {
          shakeStage();
          return;
        }
        var mine = round.picks[index];
        round.locks[index] = { choice: mine, at: Date.now() };
        if (round.order.indexOf(index) < 0) round.order.push(index);
        sendHail({ t: "lock", choice: mine });
        render();
        return;
      }
      if (session.net.role === "host") {
        if (fromPeer) {
          if (playerIndexByPeer(fromPeer) !== index) return;
        } else if (index !== session.net.self) return;
      }
      if (round.picks[index] < 0) {
        shakeStage();
        return;
      }
      round.locks[index] = { choice: round.picks[index], at: Date.now() };
      round.order.push(index);
      var next = -1;
      for (var i = 0; i < session.players.length; i++) {
        if (!round.locks[i]) {
          next = i;
          break;
        }
      }
      if (next >= 0) round.pad = next;
      if (round.order.length >= session.players.length) revealRound();
      else render();
    }

    function revealRound() {
      if (session.net.role === "guest") return;
      if (session.screen !== "question" || !session.round || !session.question) return;
      session.timerLive = false;
      var q = session.question;
      var full = pointsFor(session.cell);
      var round = session.round;
      var sequence = round.order.map(function (index) {
        return { player: index, choice: round.locks[index].choice, missed: false };
      });
      session.players.forEach(function (person, index) {
        if (!round.locks[index]) sequence.push({ player: index, choice: -1, missed: true });
      });
      var firstCorrect = true;
      var right = 0;
      var wrong = 0;
      var beats = sequence.map(function (lock, i) {
        var ok = lock.choice === q.c;
        var points = 0;
        if (ok) {
          right += 1;
          points = firstCorrect ? full : Math.floor(full / 2);
          firstCorrect = false;
          session.players[lock.player].score += points;
        } else wrong += 1;
        return {
          place: i + 1,
          name: session.players[lock.player].short,
          ok: ok,
          late: ok && points < full,
          missed: lock.missed,
          points: points,
          score: session.players[lock.player].score
        };
      });
      var headline = right === 0 ? "Nobody takes it" : right === 1 ? "One officer on target" : right + " on target";
      session.result = {
        kind: "round",
        ok: right > 0,
        headline: headline,
        detail: "",
        answer: (q.c + 1) + ". " + q.a[q.c],
        beats: beats,
        right: right,
        wrong: wrong
      };
      session.screen = "result";
      celebrate(right > 0);
      render();
    }

    function continueResult() {
      if (session.net.role === "guest") {
        sendHail({ t: "continue" });
        return;
      }
      afterResolved();
    }

    function afterResolved() {
      if (session.cells.every(function (c) { return c.used; })) {
        declareWinner();
        return;
      }
      session.active = (session.active + 1) % session.players.length;
      session.round = null;
      session.screen = "board";
      render();
    }

    function declareWinner() {
      var best = session.players[0].score;
      session.players.forEach(function (p) { if (p.score > best) best = p.score; });
      var tied = [];
      session.players.forEach(function (p, i) { if (p.score === best) tied.push(i); });
      if (tied.length > 1) {
        session.tied = tied;
        session.screen = "tie";
        render();
        return;
      }
      session.winner = tied[0];
      session.screen = "victory";
      celebrate(true);
      render();
    }

    function onTimeout() {
      if (session.net.role === "guest") return;
      if (!session.timerLive) return;
      session.timerLive = false;
      session.remainMs = 0;
      if (session.screen === "question") revealRound();
    }

    function toggleTimer() {
      if (session.net.role === "guest") return;
      session.timerOn = !session.timerOn;
      var toggle = root.querySelector("[data-timer-toggle]");
      if (toggle) {
        toggle.textContent = session.timerOn ? "TIMER ON" : "TIMER OFF";
        toggle.classList.toggle("is-off", !session.timerOn);
      }
      updateTimerDom();
      syncClock();
    }

    function togglePause() {
      session.paused = !session.paused;
      var node = root.querySelector(".tt-pause");
      if (node) node.hidden = !session.paused;
    }

    function onRestart() {
      leaveHail();
      session.paused = false;
      session.screen = "cast";
      session.focus = 0;
      session.seats = [null, null, null, null];
      session.castError = "";
      session.timerOn = true;
      session.timerLive = false;
      session.players = [];
      session.cells = [];
      session.result = null;
      session.multi = null;
      session.koba = null;
      session.bursts = [];
      render();
    }

    function diffKey(key) {
      if (session.net.role === "guest") return;
      if (key === "ArrowLeft" || key === "ArrowUp") session.focus = (session.focus + LEVELS.length - 1) % LEVELS.length;
      else if (key === "ArrowRight" || key === "ArrowDown") session.focus = (session.focus + 1) % LEVELS.length;
      else if (key === "Enter") {
        startMatch(LEVELS[session.focus].id);
        return;
      } else return;
      render();
    }

    function choiceIndexFromKey(key) {
      if (key >= "1" && key <= "4") return Number(key) - 1;
      var letter = { a: 0, b: 1, c: 2, d: 3, A: 0, B: 1, C: 2, D: 3 }[key];
      return letter == null ? -1 : letter;
    }

    function onQuit() {
      if (session.screen === "diff") {
        session.screen = "cast";
        session.focus = CREW.length;
        render();
        return;
      }
      if (session.screen === "cast") {
        session.focus = 0;
        session.castError = "";
        if (remotePlay() && session.net.crewId) {
          toggleSeat(session.net.crewId);
          return;
        }
        session.seats = [null, null, null, null];
        render();
        return;
      }
      onRestart();
    }

    function moveFocus(dx, dy) {
      var start = CREW.length;
      var cols = CREW_COLS;
      if (session.focus === start) {
        if (dy < 0) session.focus = Math.floor((CREW.length - 1) / cols) * cols;
        return;
      }
      var col = session.focus % cols;
      var row = Math.floor(session.focus / cols);
      var rows = Math.ceil(CREW.length / cols);
      if (dx) {
        var next = row * cols + ((col + dx + cols) % cols);
        if (next < CREW.length) session.focus = next;
        return;
      }
      if (dy > 0) {
        var down = (row + 1) * cols + col;
        if (row + 1 >= rows || down >= CREW.length) session.focus = start;
        else session.focus = down;
        return;
      }
      if (row === 0) return;
      session.focus = (row - 1) * cols + col;
    }

    function castKey(key) {
      if (key === "ArrowLeft") moveFocus(-1, 0);
      else if (key === "ArrowRight") moveFocus(1, 0);
      else if (key === "ArrowUp") moveFocus(0, -1);
      else if (key === "ArrowDown") moveFocus(0, 1);
      else if (key === "Backspace") {
        if (remotePlay()) {
          if (session.net.crewId) toggleSeat(session.net.crewId);
          return;
        }
        for (var i = 3; i >= 0; i--) {
          if (session.seats[i]) {
            session.seats[i] = null;
            break;
          }
        }
      } else if (key === "Enter") {
        if (session.focus === CREW.length) goDifficulty();
        else toggleSeat(CREW[session.focus].id);
        return;
      } else return;
      render();
    }

    function boardKey(key) {
      if (key === "ArrowLeft") session.cursor.col = (session.cursor.col + 4) % 5;
      else if (key === "ArrowRight") session.cursor.col = (session.cursor.col + 1) % 5;
      else if (key === "ArrowUp") session.cursor.row = (session.cursor.row + 4) % 5;
      else if (key === "ArrowDown") session.cursor.row = (session.cursor.row + 1) % 5;
      else if (key === "Enter") {
        openCell(session.cursor.row, session.cursor.col);
        return;
      } else return;
      render();
    }


    function hear(raw) {
      if (!alive || session.paused) return;
      var said = normSpeech(raw);
      if (!said) return;
      if (session.screen === "diff") {
        if (session.net.role === "guest") return;
        if (hasPhrase(said, "newbie")) startMatch("newbie");
        else if (hasPhrase(said, "commander")) startMatch("commander");
        else if (hasPhrase(said, "rear admiral") || hasPhrase(said, "admiral")) startMatch("admiral");
        return;
      }
      if (session.screen === "board") {
        var col = matchCol(said);
        var value = matchValue(said);
        if (col >= 0 && value) {
          var row = VALUES.indexOf(value);
          if (row >= 0) openCell(row, col);
        }
        return;
      }
      if (session.screen === "result") {
        if (isBoardReturn(said)) continueResult();
        return;
      }
      if (session.screen === "question" && session.round) {
        var q = session.question;
        var cleaned = said.replace(/\bmake it so\b/g, " ").replace(/\s+/g, " ").trim();
        var pick = q ? matchChoice(cleaned, q.a) : -1;
        var pad = remotePlay() ? session.net.self : session.round.pad;
        if (pad < 0) return;
        if (!remotePlay() && session.round.locks[pad]) {
          for (var i = 0; i < session.players.length; i++) {
            if (!session.round.locks[i]) {
              pad = i;
              break;
            }
          }
        }
        if (pick >= 0 && !session.round.locks[pad]) session.round.picks[pad] = pick;
        if (hasMakeItSo(said)) {
          lockPad(pad);
          return;
        }
        if (pick >= 0) render();
      }
    }

    function failMic() {
      micWanted = false;
      session.mic = openedAsFile() ? "file" : "failed";
      render();
    }

    function beginMic() {
      if (rec) {
        micWanted = false;
        try { rec.onend = null; rec.onerror = null; rec.stop(); } catch (stopErr) {}
        rec = null;
      }
      var Ctor = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!Ctor) {
        session.mic = openedAsFile() ? "file" : "unsupported";
        render();
        return;
      }
      try {
        rec = new Ctor();
      } catch (err) {
        session.mic = openedAsFile() ? "file" : "unsupported";
        render();
        return;
      }
      rec.continuous = true;
      rec.interimResults = false;
      rec.lang = "en-US";
      rec.onresult = function (ev) {
        var text = "";
        for (var i = ev.resultIndex; i < ev.results.length; i++) {
          if (ev.results[i].isFinal) text += " " + ev.results[i][0].transcript;
        }
        if (text) hear(text);
      };
      rec.onerror = function (ev) {
        var code = ev && ev.error;
        if (code === "not-allowed" || code === "service-not-allowed") {
          micWanted = false;
          session.mic = openedAsFile() ? "file" : "denied";
          try { rec.stop(); } catch (stopErr) {}
          render();
        }
      };
      rec.onend = function () {
        if (!alive || !micWanted || !rec) return;
        later(function () {
          if (!alive || !micWanted || !rec) return;
          try {
            rec.start();
            session.mic = "on";
          } catch (startErr) {
            micTries += 1;
            if (micTries <= 2) {
              later(function () {
                if (!alive || !micWanted || !rec) return;
                try { rec.start(); session.mic = "on"; render(); }
                catch (againErr) { failMic(); }
              }, 500);
            } else failMic();
          }
        }, 300);
      };
      micWanted = true;
      micTries = 0;
      try {
        rec.start();
        session.mic = "on";
      } catch (startErr) {
        micTries = 1;
        session.mic = openedAsFile() ? "file" : "failed";
        later(function () {
          if (!alive || !micWanted || !rec) return;
          try { rec.start(); session.mic = "on"; render(); }
          catch (againErr) { failMic(); }
        }, 400);
      }
      render();
    }

    function onKey(e) {
      if (!alive || !el.isConnected) return;
      var inCreditsUi = !!(e.target && e.target.closest && e.target.closest("[data-credits]"));
      if (creditsOpen) {
        if (e.key === "Escape") {
          e.preventDefault();
          closeCredits();
        } else if (!inCreditsUi) {
          e.preventDefault();
        }
        return;
      }
      if (inCreditsUi && e.key !== "Escape") return;
      var tag = e.target && e.target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || (e.target && e.target.isContentEditable)) return;
      if (e.repeat) return;
      var key = e.key;
      if (key === "Shift" || key === "Control" || key === "Alt" || key === "Meta") return;
      var asking = session.screen === "question";
      var known = {
        ArrowLeft: 1, ArrowRight: 1, ArrowUp: 1, ArrowDown: 1,
        Enter: 1, " ": 1, Escape: 1, "1": 1, "2": 1, "3": 1, "4": 1,
        a: 1, b: 1, c: 1, d: 1, A: 1, B: 1, C: 1, D: 1,
        t: 1, T: 1, p: 1, P: 1, r: 1, R: 1, Backspace: 1
      };
      if (!known[key] && session.screen !== "result") return;
      if (key === "Backspace" && session.screen !== "cast") return;
      e.preventDefault();
      if (key === "p" || key === "P") { togglePause(); return; }
      if (key === "r" || key === "R") { onRestart(); return; }
      if (key === "Escape") { onQuit(); return; }
      if (key === "t" || key === "T") { toggleTimer(); return; }
      if (session.paused) return;
      if (session.screen === "cast") { castKey(key); return; }
      if (session.screen === "diff") { diffKey(key); return; }
      if (session.screen === "board") { boardKey(key); return; }
      if (asking && session.round) {
        if (remotePlay()) {
          var mine = session.net.self;
          if (mine < 0) return;
          var remoteChoice = choiceIndexFromKey(key);
          if (remoteChoice >= 0 && !session.round.locks[mine]) {
            session.round.picks[mine] = remoteChoice;
            render();
            return;
          }
          if (key === "Enter") lockPad(mine);
          return;
        }
        var count = session.players.length;
        if (key === "ArrowDown" || key === "ArrowRight") {
          session.round.pad = (session.round.pad + 1) % count;
          render();
          return;
        }
        if (key === "ArrowUp" || key === "ArrowLeft") {
          session.round.pad = (session.round.pad + count - 1) % count;
          render();
          return;
        }
        var num = choiceIndexFromKey(key);
        if (num >= 0 && !session.round.locks[session.round.pad]) {
          session.round.picks[session.round.pad] = num;
          render();
          return;
        }
        if (key === "Enter") lockPad(session.round.pad);
        return;
      }
      if (session.screen === "result") continueResult();
    }

    function onKeyUp(e) {
      if (!alive) return;
      if (creditsOpen) return;
      if (e.target && e.target.closest && e.target.closest("[data-credits]")) return;
      if (e.key === " " || e.key === "Enter") e.preventDefault();
    }

    function onClick(e) {
      var screenEl = e.target.closest(".tt-screen");
      var t = e.target.closest("[data-act]");
      if (session.paused) {
        if (!t || !root.contains(t)) return;
        var pausedAct = t.dataset.act;
        if (pausedAct !== "pause" && pausedAct !== "restart" && pausedAct !== "quit") return;
      }
      if (!session.paused && screenEl && session.screen === "result") {
        continueResult();
        return;
      }
      if (!session.paused && screenEl && session.screen === "question" && session.round) {
        if (t && t.dataset.act === "choice") {
          var who = Number(t.dataset.player);
          if (remotePlay() && who !== session.net.self) return;
          if (session.round.locks[who]) return;
          session.round.pad = who;
          session.round.picks[who] = Number(t.dataset.choice);
          render();
          return;
        }
        if (t && t.dataset.act === "lock") {
          var locker = Number(t.dataset.player);
          if (remotePlay() && locker !== session.net.self) return;
          lockPad(locker);
          return;
        }
        return;
      }
      if (!t || !root.contains(t)) return;
      var act = t.dataset.act;
      if (act === "pause") togglePause();
      else if (act === "timer") toggleTimer();
      else if (act === "restart") onRestart();
      else if (act === "quit") onQuit();
      else if (act === "mic") beginMic();
      else if (act === "mic-skip") {
        micWanted = false;
        if (rec) {
          try { rec.onend = null; rec.stop(); } catch (stopErr) {}
        }
        session.mic = "off";
        render();
      }       else if (act === "pick") {
        session.focus = CREW.findIndex(function (c) { return c.id === t.dataset.who; });
        toggleSeat(t.dataset.who);
      } else if (act === "unseat") {
        if (remotePlay()) {
          var shownSeat = bridgeSeats()[Number(t.dataset.seat)];
          if (shownSeat && shownSeat === session.net.crewId) toggleSeat(shownSeat);
          return;
        }
        session.seats[Number(t.dataset.seat)] = null;
        session.castError = "";
        render();
      } else if (act === "start") goDifficulty();
      else if (act === "hail") openHail();
      else if (act === "diff") {
        if (session.net.role === "guest") return;
        startMatch(t.dataset.level);
      } else if (act === "cell") openCell(Number(t.dataset.row), Number(t.dataset.col));
      else if (act === "continue" && session.screen === "result") continueResult();
    }

    function onSubmit(e) {
      var form = e.target && e.target.closest ? e.target.closest(".tt-hail-join") : null;
      if (!form || !root.contains(form)) return;
      e.preventDefault();
      var input = form.querySelector("input");
      joinHail(input ? input.value : "");
    }

    var creditsBtn = root.querySelector("button[data-credits]");
    var creditsLayer = root.querySelector(".tt-credits");
    var creditsClose = root.querySelector(".tt-credits-close");
    var creditsOpen = false;
    function openCredits() {
      creditsOpen = true;
      creditsLayer.hidden = false;
      creditsBtn.setAttribute("aria-expanded", "true");
      creditsClose.focus();
    }
    function closeCredits() {
      if (!creditsOpen) return;
      creditsOpen = false;
      creditsLayer.hidden = true;
      creditsBtn.setAttribute("aria-expanded", "false");
      creditsBtn.focus({ preventScroll: true });
    }
    creditsBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      openCredits();
    });
    creditsClose.addEventListener("click", function (e) {
      e.stopPropagation();
      closeCredits();
    });
    creditsLayer.addEventListener("click", function (e) {
      if (e.target === creditsLayer) closeCredits();
    });
    root.addEventListener("click", onClick);
    root.addEventListener("submit", onSubmit);
    document.addEventListener("keydown", onKey, true);
    document.addEventListener("keyup", onKeyUp, true);

    var raf = 0;
    function loop(now) {
      if (!alive) return;
      paintAll(now);
      raf = requestAnimationFrame(loop);
    }
    var tick = setInterval(function () {
      if (!alive) return;
      if (session.net.role === "guest") return;
      var now = (typeof performance !== "undefined" ? performance.now() : Date.now());
      var dt = now - lastTick;
      lastTick = now;
      if (session.paused || !session.timerLive || !session.timerOn) return;
      session.remainMs -= Math.min(250, dt);
      if (session.remainMs <= 0) {
        session.remainMs = 0;
        updateTimerDom();
        onTimeout();
        return;
      }
      updateTimerDom();
      if (session.net.role === "host" && now - lastHailTick >= 400) {
        lastHailTick = now;
        syncClock();
      }
    }, 100);

    render();
    raf = requestAnimationFrame(loop);

    function destroy() {
      if (!alive) return;
      alive = false;
      leaveHail();
      if (rec) {
        try { rec.onend = null; rec.stop(); } catch (stopErr) {}
        rec = null;
      }
      cancelAnimationFrame(raf);
      clearInterval(tick);
      timeouts.forEach(clearTimeout);
      document.removeEventListener("keydown", onKey, true);
      document.removeEventListener("keyup", onKeyUp, true);
      root.removeEventListener("click", onClick);
      root.removeEventListener("submit", onSubmit);
      el.innerHTML = "";
    }

    later(function () {}, 0);
    return { destroy: destroy };
  }

  checkBanks();

  globalThis.DESKTOP_GAMES = globalThis.DESKTOP_GAMES || {};
  globalThis.DESKTOP_GAMES["trek-trivia-make-it-so"] = {
    id: "trek-trivia-make-it-so",
    title: "Trek trivia - Make it so!",
    mount: mount
  };

  function bootPlayer() {
    if (typeof document === "undefined" || !document.body) return;
    if (!document.body.hasAttribute("data-game-player")) return;
    var root = document.createElement("div");
    root.dataset.gameRoot = "trek-trivia-make-it-so";
    root.style.cssText = "position:fixed;inset:0;overflow:hidden;background:#14081c;";
    document.documentElement.style.height = "100%";
    document.documentElement.style.background = "#14081c";
    document.body.style.margin = "0";
    document.body.style.height = "100%";
    document.body.style.overflow = "hidden";
    document.body.style.background = "#14081c";
    document.body.appendChild(root);
    mount(root);
  }

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bootPlayer);
    else bootPlayer();
  }
})();
