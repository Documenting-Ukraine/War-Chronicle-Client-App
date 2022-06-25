const kyiv = ["Kyiv"] as const;
const kharkivOblast = [
  "Kharkiv",
  "Lozova",
  "Izium",
  "Chuhuiv",
  "Pervomaiskyi",
  "Kupiansk",
  "Balakliia",
  "Merefa",
  "Liubotyn",
  "Krasnohrad",
  "Vovchansk",
  "Derhachi",
  "Bohodukhiv",
  "Zmiiv",
  "Barvinkove",
  "Valky",
  "Pivdenne",
] as const;
const odesaOblast = [
  "Odesa",
  "Izmail",
  "Chornomorsk",
  "Bilhorod-Dnistrovskyi",
  "Podilsk",
  "Yuzhne",
  "Kilia",
  "Balta",
  "Reni",
  "Rozdilna",
  "Bolhrad",
  "Artsyz",
  "Biliaivka",
  "Tatarbunary",
  "Kodyma",
  "Berezivka",
  "Ananiv",
  "Vylkove",
  "Teplodar",
] as const;
const dnipropetrovskOblast = [
  "Dnipro",
  "Kryvyi Rih",
  "Kamianske",
  "Nikopol",
  "Pavlohrad",
  "Novomoskovsk",
  "Marhanets",
  "Zhovti Vody",
  "Pokrov",
  "Synelnykove",
  "Pershotravensk",
  "Ternivka",
  "Vilnohirsk",
  "Piatykhatky",
  "Pidhorodne",
  "Verkhniodniprovsk",
  "Apostolove",
  "Zelenodolsk",
  "Verkhivtseve",
  "Pereschepyne",
] as const;
const donetskOblast = [
  "Donetsk",
  "Mariupol",
  "Makiivka",
  "Horlivka",
  "Kramatorsk",
  "Sloviansk",
  "Yenakiieve",
  "Bakhmut",
  "Kostiantynivka",
  "Pokrovsk",
  "Khartsyzk",
  "Druzhkivka",
  "Chystiakove",
  "Shakhtarsk",
  "Myrnohrad",
  "Snizhne",
  "Yasynuvata",
  "Avdiivka",
  "Toretsk",
  "Dobropillia",
  "Khrestivka",
  "Debaltseve",
  "Dokuchaievsk",
  "Selydove",
  "Volnovakha",
  "Lyman",
  "Kurakhove",
  "Amvrosiivka",
  "Zuhres",
  "Bilozerske",
  "Yunokomunarivsk",
  "Ilovaisk",
  "Novohrodivka",
  "Vuhledar",
  "Krasnohorivka",
  "Mykolaivka",
  "Chasiv Yar",
  "Siversk",
  "Hirnyk",
  "Zhdanivka",
  "Ukrainsk",
  "Svitlodarsk",
  "Soledar",
  "Komsomolske",
  "Novoazovsk",
  "Rodynske",
  "Mospyne",
  "Maryinka",
  "Vuhlehirsk",
  "Bilytske",
  "Artemove",
  "Sviatohirsk",
] as const;
const zaporizhzhiaOblast = [
  "Zaporizhzhia",
  "Melitopol",
  "Berdiansk",
  "Enerhodar",
  "Tokmak",
  "Polohy",
  "Dniprorudne",
  "Orikhiv",
  "Huliaipole",
  "Vilniansk",
  "Vasylivka",
  "Kamianka-Dniprovska",
  "Prymorsk",
  "Molochansk",
] as const;
const lvivOblast = [
  "Lviv",
  "Mykolaiv",
  "Drohobych",
  "Chervonohrad",
  "Stryi",
  "Sambir",
  "Boryslav",
  "Novoiavorivsk",
  "Truskavets",
  "Novyi Rozdil",
  "Zolochiv",
  "Brody",
  "Sokal",
  "Stebnyk",
  "Horodok",
  "Vynnyky",
  "Yavoriv",
  "Zhovkva",
  "Sosnivka",
  "Zhydachiv",
  "Kamianka-Buzka",
  "Khodoriv",
  "Pustomyty",
  "Radekhiv",
  "Mostyska",
  "Busk",
  "Dubliany",
  "Rava-Ruska",
  "Turka",
  "Peremyshliany",
  "Skole",
  "Sudova Vyshnia",
  "Morshyn",
  "Velyki Mosty",
  "Staryi Sambir",
  "Dobromyl",
  "Rudky",
  "Khyriv",
  "Komarno",
  "Bibrka",
  "Novyi Kalyniv",
  "Hlyniany",
  "Belz",
  "Uhniv",
] as const;
const sevastopol = ["Sevastopol", "Inkerman"] as const;
const luhanskOblast = [
  "Luhansk",
  "Alchevsk",
  "Sieverodonetsk",
  "Lysychansk",
  "Khrustalnyi",
  "Kadiyivka",
  "Pervomaisk",
  "Dovzhansk",
  "Rubizhne",
  "Antratsyt",
  "Rovenky",
  "Brianka",
  "Sorokyne",
  "Holubivka",
  "Perevalsk",
  "Molodohvardiysk",
  "Sukhodilsk",
  "Popasna",
  "Kreminna",
  "Starobilsk",
  "Svatove",
  "Lutuhyne",
  "Zolote",
  "Chervonopartyzansk",
  "Petrovske",
  "Vakhrusheve",
  "Shchastia",
  "Teplohirsk",
  "Hirske",
  "Zymohiria",
  "Artemivsk",
  "Novodruzhesk",
  "Pryvillia",
  "Zorynsk",
  "Oleksandrivsk",
  "Miusynsk",
  "Almazna",
] as const;
const vinnytsiaOblast = [
  "Vinnytsia",
  "Zhmerynka",
  "Mohyliv-Podilskyi",
  "Khmilnyk",
  "Haisyn",
  "Koziatyn",
  "Ladyzhyn",
  "Kalynivka",
  "Bar",
  "Tulchyn",
  "Bershad",
  "Hnivan",
  "Nemyriv",
  "Yampil",
  "Illintsi",
  "Pohrebysche",
  "Lypovets",
  "Sharhorod",
] as const;
const crimea = [
  "Simferopol",
  "Kerch",
  "Yevpatoria",
  "Yalta",
  "Feodosiya",
  "Dzhankoy",
  "Alushta",
  "Bakhchisaray",
  "Krasnoperekopsk",
  "Saky",
  "Armiansk",
  "Bilohirsk",
  "Sudak",
  "Shcholkine",
  "Staryi Krym",
  "Alupka",
] as const;
const chernihivOblast = [
  "Chernihiv",
  "Nizhyn",
  "Pryluky",
  "Bakhmach",
  "Nosivka",
  "Novhorod-Siverskyi",
  "Koriukivka",
  "Horodnia",
  "Mena",
  "Ichnia",
  "Snovsk",
  "Bobrovytsia",
  "Borzna",
  "Semenivka",
  "Oster",
  "Baturyn",
] as const;
const khersonOblast = [
  "Kherson",
  "Nova Kakhovka",
  "Kakhovka",
  "Oleshky",
  "Henichesk",
  "Skadovsk",
  "Hola Prystan",
  "Beryslav",
  "Tavriysk",
] as const;
const poltavaOblast = [
  "Poltava",
  "Kremenchuk",
  "Horishni Plavni",
  "Lubny",
  "Myrhorod",
  "Hadiach",
  "Karlivka",
  "Pyriatyn",
  "Khorol",
  "Hlobyne",
  "Lokhvytsia",
  "Kobeliaky",
  "Hrebinka",
  "Zinkiv",
  "Zavodske",
] as const;
const khmelnytskyiOblast = [
  "Khmelnytskyi",
  "Kamianets-Podilskyi",
  "Shepetivka",
  "Netishyn",
  "Slavuta",
  "Starokostiantyniv",
  "Polonne",
  "Krasyliv",
  "Volochysk",
  "Iziaslav",
  "Dunaivtsi",
  "Derazhnia",
] as const;
const cherkasyOblast = [
  "Cherkasy",
  "Uman",
  "Smila",
  "Zolotonosha",
  "Kaniv",
  "Vatutine",
  "Zvenyhorodka",
  "Shpola",
  "Korsun-Shevchenkivskyi",
  "Talne",
  "Zhashkiv",
  "Horodysche",
  "Kamianka",
  "Chyhyryn",
  "Khrystynivka",
  "Monastyrysche",
  "Maydanets",
] as const;
const chernivtsiOblast = [
  "Chernivtsi",
  "Storozhynets",
  "Khotyn",
  "Novodnistrovsk",
  "Sokyriany",
  "Zastavna",
  "Novoselytsia",
  "Kitsman",
  "Vashkivtsi",
  "Vyzhnytsia",
  "Hertsa",
] as const;
const zhytomyrOblast = [
  "Zhytomyr",
  "Berdychiv",
  "Korosten",
  "Novohrad-Volynskyi",
  "Malyn",
  "Korostyshiv",
  "Ovruch",
  "Radomyshl",
  "Baranivka",
  "Olevsk",
  "Andrushivka",
] as const;
const sumyOblast = [
  "Sumy",
  "Konotop",
  "Shostka",
  "Okhtyrka",
  "Romny",
  "Hlukhiv",
  "Lebedyn",
  "Krolevets",
  "Trostianets",
  "Bilopillia",
  "Putyvl",
  "Buryn",
  "Vorozhba",
  "Seredyna-Buda",
  "Druzhba",
] as const;
const rivneOblast = [
  "Rivne",
  "Varash",
  "Dubno",
  "Kostopil",
  "Sarny",
  "Zdolbuniv",
  "Ostroh",
  "Berezne",
  "Radyvyliv",
  "Dubrovytsia",
  "Korets",
] as const;
const ivanoFrankivskOblast = [
  "Ivano-Frankivsk",
  "Kalush",
  "Kolomyia",
  "Nadvirna",
  "Dolyna",
  "Burshtyn",
  "Bolekhiv",
  "Sniatyn",
  "Horodenka",
  "Tysmenytsia",
  "Tlumach",
  "Rohatyn",
  "Kosiv",
  "Yaremcha",
  "Halych",
  "Broshniv-Osada",
  "Svarychiv",
] as const;
const ternopilOblast = [
  "Ternopil",
  "Chortkiv",
  "Kremenets",
  "Berezhany",
  "Terebovlia",
  "Zbarazh",
  "Buchach",
  "Borschiv",
  "Zalischyky",
  "Lanivtsi",
  "Pochaiv",
  "Zboriv",
  "Khorostkiv",
  "Kopychyntsi",
  "Monastyryska",
  "Shumsk",
  "Skalat",
  "Pidhaitsi",
] as const;
const kirovohradOblast = [
  "Kropyvnytskyi",
  "Oleksandriia",
  "Svitlovodsk",
  "Znamianka",
  "Novoukrainka",
  "Dolynska",
  "Haivoron",
  "Novomyrhorod",
  "Mala Vyska",
  "Bobrynets",
  "Pomichna",
  "Blahovishchenske",
] as const;
const volynOblast = [
  "Lutsk",
  "Kovel",
  "Novovolynsk",
  "Volodymyr-Volynskyi",
  "Kivertsi",
  "Rozhysche",
  "Kamin-Kashyrskyi",
  "Liuboml",
  "Horokhiv",
  "Ustyluh",
  "Berestechko",
] as const;
const kyivOblast = [
  "Bila Tserkva",
  "Brovary",
  "Boryspil",
  "Irpin",
  "Fastiv",
  "Vyshneve",
  "Vasylkiv",
  "Bucha",
  "Boiarka",
  "Obukhiv",
  "Vyshhorod",
  "Pereiaslav",
  "Slavutych",
  "Yahotyn",
  "Skvyra",
  "Berezan",
  "Bohuslav",
  "Tetiiv",
  "Ukrainka",
  "Kaharlyk",
  "Tarascha",
  "Myronivka",
  "Uzyn",
  "Rzhyschiv",
  "Chornobyl",
  "Prypiat",
] as const;
const zakarpattiaOblast = [
  "Uzhhorod",
  "Mukachevo",
  "Khust",
  "Vynohradiv",
  "Berehove",
  "Svaliava",
  "Rakhiv",
  "Tiachiv",
  "Irshava",
  "Chop",
  "Perechyn",
] as const;
const mykolaivOblast = [
  "Yuzhnoukrainsk",
  "Voznesensk",
  "Ochakiv",
  "Novyi Buh",
  "Snihurivka",
  "Nova Odesa",
  "Bashtanka",
] as const;

type OblastRegion = {
  Kyiv: typeof kyiv[number];
  Kharkiv: typeof kharkivOblast[number];
  Odesa: typeof odesaOblast[number];
  Dnipropetrovsk: typeof dnipropetrovskOblast[number];
  Donetsk: typeof donetskOblast[number];
  Zaporizhzhia: typeof zaporizhzhiaOblast[number];
  Lviv: typeof lvivOblast[number];
  Sevastopol: typeof sevastopol[number];
  Luhansk: typeof luhanskOblast[number];
  Vinnytsia: typeof vinnytsiaOblast[number];
  Crimea: typeof crimea[number];
  Chernihiv: typeof chernihivOblast[number];
  Kherson: typeof khersonOblast[number];
  Poltava: typeof poltavaOblast[number];
  Khmelnytskyi: typeof khmelnytskyiOblast[number];
  Cherkasy: typeof cherkasyOblast[number];
  Chernivtsi: typeof chernivtsiOblast[number];
  Zhytomyr: typeof zhytomyrOblast[number];
  Sumy: typeof sumyOblast[number];
  Rivne: typeof rivneOblast[number];
  "Ivano-Frankivsk": typeof ivanoFrankivskOblast[number];
  Ternopil: typeof ternopilOblast[number];
  Kirovohrad: typeof kirovohradOblast[number];
  Volyn: typeof volynOblast[number];
  "Kyiv Oblast": typeof kyivOblast[number];
  Zakarpattia: typeof zakarpattiaOblast[number];
  Mykolaiv: typeof mykolaivOblast[number];
};
export const OblastList: { [key: string]: string[] } = {
  Kyiv: ["Kyiv"],
  Kharkiv: [
    "Kharkiv",
    "Lozova",
    "Izium",
    "Chuhuiv",
    "Pervomaiskyi",
    "Kupiansk",
    "Balakliia",
    "Merefa",
    "Liubotyn",
    "Krasnohrad",
    "Vovchansk",
    "Derhachi",
    "Bohodukhiv",
    "Zmiiv",
    "Barvinkove",
    "Valky",
    "Pivdenne",
  ],
  Odesa: [
    "Odesa",
    "Izmail",
    "Chornomorsk",
    "Bilhorod-Dnistrovskyi",
    "Podilsk",
    "Yuzhne",
    "Kilia",
    "Balta",
    "Reni",
    "Rozdilna",
    "Bolhrad",
    "Artsyz",
    "Biliaivka",
    "Tatarbunary",
    "Kodyma",
    "Berezivka",
    "Ananiv",
    "Vylkove",
    "Teplodar",
  ],
  Dnipropetrovsk: [
    "Dnipro",
    "Kryvyi Rih",
    "Kamianske",
    "Nikopol",
    "Pavlohrad",
    "Novomoskovsk",
    "Marhanets",
    "Zhovti Vody",
    "Pokrov",
    "Synelnykove",
    "Pershotravensk",
    "Ternivka",
    "Vilnohirsk",
    "Piatykhatky",
    "Pidhorodne",
    "Verkhniodniprovsk",
    "Apostolove",
    "Zelenodolsk",
    "Verkhivtseve",
    "Pereschepyne",
  ],
  Donetsk: [
    "Donetsk",
    "Mariupol",
    "Makiivka",
    "Horlivka",
    "Kramatorsk",
    "Sloviansk",
    "Yenakiieve",
    "Bakhmut",
    "Kostiantynivka",
    "Pokrovsk",
    "Khartsyzk",
    "Druzhkivka",
    "Chystiakove",
    "Shakhtarsk",
    "Myrnohrad",
    "Snizhne",
    "Yasynuvata",
    "Avdiivka",
    "Toretsk",
    "Dobropillia",
    "Khrestivka",
    "Debaltseve",
    "Dokuchaievsk",
    "Selydove",
    "Volnovakha",
    "Lyman",
    "Kurakhove",
    "Amvrosiivka",
    "Zuhres",
    "Bilozerske",
    "Yunokomunarivsk",
    "Ilovaisk",
    "Novohrodivka",
    "Vuhledar",
    "Krasnohorivka",
    "Mykolaivka",
    "Chasiv Yar",
    "Siversk",
    "Hirnyk",
    "Zhdanivka",
    "Ukrainsk",
    "Svitlodarsk",
    "Soledar",
    "Komsomolske",
    "Novoazovsk",
    "Rodynske",
    "Mospyne",
    "Maryinka",
    "Vuhlehirsk",
    "Bilytske",
    "Artemove",
    "Sviatohirsk",
  ],
  Zaporizhzhia: [
    "Zaporizhzhia",
    "Melitopol",
    "Berdiansk",
    "Enerhodar",
    "Tokmak",
    "Polohy",
    "Dniprorudne",
    "Orikhiv",
    "Huliaipole",
    "Vilniansk",
    "Vasylivka",
    "Kamianka-Dniprovska",
    "Prymorsk",
    "Molochansk",
  ],
  Lviv: [
    "Lviv",
    "Mykolaiv",
    "Drohobych",
    "Chervonohrad",
    "Stryi",
    "Sambir",
    "Boryslav",
    "Novoiavorivsk",
    "Truskavets",
    "Novyi Rozdil",
    "Zolochiv",
    "Brody",
    "Sokal",
    "Stebnyk",
    "Horodok",
    "Vynnyky",
    "Yavoriv",
    "Zhovkva",
    "Sosnivka",
    "Zhydachiv",
    "Kamianka-Buzka",
    "Khodoriv",
    "Pustomyty",
    "Radekhiv",
    "Mostyska",
    "Busk",
    "Dubliany",
    "Rava-Ruska",
    "Turka",
    "Peremyshliany",
    "Skole",
    "Sudova Vyshnia",
    "Morshyn",
    "Velyki Mosty",
    "Staryi Sambir",
    "Dobromyl",
    "Rudky",
    "Khyriv",
    "Komarno",
    "Bibrka",
    "Novyi Kalyniv",
    "Hlyniany",
    "Belz",
    "Uhniv",
  ],
  Sevastopol: ["Sevastopol", "Inkerman"],
  Luhansk: [
    "Luhansk",
    "Alchevsk",
    "Sieverodonetsk",
    "Lysychansk",
    "Khrustalnyi",
    "Kadiyivka",
    "Pervomaisk",
    "Dovzhansk",
    "Rubizhne",
    "Antratsyt",
    "Rovenky",
    "Brianka",
    "Sorokyne",
    "Holubivka",
    "Perevalsk",
    "Molodohvardiysk",
    "Sukhodilsk",
    "Popasna",
    "Kreminna",
    "Starobilsk",
    "Svatove",
    "Lutuhyne",
    "Zolote",
    "Chervonopartyzansk",
    "Petrovske",
    "Vakhrusheve",
    "Shchastia",
    "Teplohirsk",
    "Hirske",
    "Zymohiria",
    "Artemivsk",
    "Novodruzhesk",
    "Pryvillia",
    "Zorynsk",
    "Oleksandrivsk",
    "Miusynsk",
    "Almazna",
  ],
  Vinnytsia: [
    "Vinnytsia",
    "Zhmerynka",
    "Mohyliv-Podilskyi",
    "Khmilnyk",
    "Haisyn",
    "Koziatyn",
    "Ladyzhyn",
    "Kalynivka",
    "Bar",
    "Tulchyn",
    "Bershad",
    "Hnivan",
    "Nemyriv",
    "Yampil",
    "Illintsi",
    "Pohrebysche",
    "Lypovets",
    "Sharhorod",
  ],
  Crimea: [
    "Simferopol",
    "Kerch",
    "Yevpatoria",
    "Yalta",
    "Feodosiya",
    "Dzhankoy",
    "Alushta",
    "Bakhchisaray",
    "Krasnoperekopsk",
    "Saky",
    "Armiansk",
    "Bilohirsk",
    "Sudak",
    "Shcholkine",
    "Staryi Krym",
    "Alupka",
  ],
  Chernihiv: [
    "Chernihiv",
    "Nizhyn",
    "Pryluky",
    "Bakhmach",
    "Nosivka",
    "Novhorod-Siverskyi",
    "Koriukivka",
    "Horodnia",
    "Mena",
    "Ichnia",
    "Snovsk",
    "Bobrovytsia",
    "Borzna",
    "Semenivka",
    "Oster",
    "Baturyn",
  ],
  Kherson: [
    "Kherson",
    "Nova Kakhovka",
    "Kakhovka",
    "Oleshky",
    "Henichesk",
    "Skadovsk",
    "Hola Prystan",
    "Beryslav",
    "Tavriysk",
  ],
  Poltava: [
    "Poltava",
    "Kremenchuk",
    "Horishni Plavni",
    "Lubny",
    "Myrhorod",
    "Hadiach",
    "Karlivka",
    "Pyriatyn",
    "Khorol",
    "Hlobyne",
    "Lokhvytsia",
    "Kobeliaky",
    "Hrebinka",
    "Zinkiv",
    "Zavodske",
  ],
  Khmelnytskyi: [
    "Khmelnytskyi",
    "Kamianets-Podilskyi",
    "Shepetivka",
    "Netishyn",
    "Slavuta",
    "Starokostiantyniv",
    "Polonne",
    "Krasyliv",
    "Volochysk",
    "Iziaslav",
    "Dunaivtsi",
    "Derazhnia",
  ],
  Cherkasy: [
    "Cherkasy",
    "Uman",
    "Smila",
    "Zolotonosha",
    "Kaniv",
    "Vatutine",
    "Zvenyhorodka",
    "Shpola",
    "Korsun-Shevchenkivskyi",
    "Talne",
    "Zhashkiv",
    "Horodysche",
    "Kamianka",
    "Chyhyryn",
    "Khrystynivka",
    "Monastyrysche",
    "Maydanets",
  ],
  Chernivtsi: [
    "Chernivtsi",
    "Storozhynets",
    "Khotyn",
    "Novodnistrovsk",
    "Sokyriany",
    "Zastavna",
    "Novoselytsia",
    "Kitsman",
    "Vashkivtsi",
    "Vyzhnytsia",
    "Hertsa",
  ],
  Zhytomyr: [
    "Zhytomyr",
    "Berdychiv",
    "Korosten",
    "Novohrad-Volynskyi",
    "Malyn",
    "Korostyshiv",
    "Ovruch",
    "Radomyshl",
    "Baranivka",
    "Olevsk",
    "Andrushivka",
  ],
  Sumy: [
    "Sumy",
    "Konotop",
    "Shostka",
    "Okhtyrka",
    "Romny",
    "Hlukhiv",
    "Lebedyn",
    "Krolevets",
    "Trostianets",
    "Bilopillia",
    "Putyvl",
    "Buryn",
    "Vorozhba",
    "Seredyna-Buda",
    "Druzhba",
  ],
  Rivne: [
    "Rivne",
    "Varash",
    "Dubno",
    "Kostopil",
    "Sarny",
    "Zdolbuniv",
    "Ostroh",
    "Berezne",
    "Radyvyliv",
    "Dubrovytsia",
    "Korets",
  ],
  "Ivano-Frankivsk": [
    "Ivano-Frankivsk",
    "Kalush",
    "Kolomyia",
    "Nadvirna",
    "Dolyna",
    "Burshtyn",
    "Bolekhiv",
    "Sniatyn",
    "Horodenka",
    "Tysmenytsia",
    "Tlumach",
    "Rohatyn",
    "Kosiv",
    "Yaremcha",
    "Halych",
    "Broshniv-Osada",
    "Svarychiv",
  ],
  Ternopil: [
    "Ternopil",
    "Chortkiv",
    "Kremenets",
    "Berezhany",
    "Terebovlia",
    "Zbarazh",
    "Buchach",
    "Borschiv",
    "Zalischyky",
    "Lanivtsi",
    "Pochaiv",
    "Zboriv",
    "Khorostkiv",
    "Kopychyntsi",
    "Monastyryska",
    "Shumsk",
    "Skalat",
    "Pidhaitsi",
  ],
  Kirovohrad: [
    "Kropyvnytskyi",
    "Oleksandriia",
    "Svitlovodsk",
    "Znamianka",
    "Novoukrainka",
    "Dolynska",
    "Haivoron",
    "Novomyrhorod",
    "Mala Vyska",
    "Bobrynets",
    "Pomichna",
    "Blahovishchenske",
  ],
  Volyn: [
    "Lutsk",
    "Kovel",
    "Novovolynsk",
    "Volodymyr-Volynskyi",
    "Kivertsi",
    "Rozhysche",
    "Kamin-Kashyrskyi",
    "Liuboml",
    "Horokhiv",
    "Ustyluh",
    "Berestechko",
  ],
  "Kyiv Oblast": [
    "Bila Tserkva",
    "Brovary",
    "Boryspil",
    "Irpin",
    "Fastiv",
    "Vyshneve",
    "Vasylkiv",
    "Bucha",
    "Boiarka",
    "Obukhiv",
    "Vyshhorod",
    "Pereiaslav",
    "Slavutych",
    "Yahotyn",
    "Skvyra",
    "Berezan",
    "Bohuslav",
    "Tetiiv",
    "Ukrainka",
    "Kaharlyk",
    "Tarascha",
    "Myronivka",
    "Uzyn",
    "Rzhyschiv",
    "Chornobyl",
    "Prypiat",
  ],
  Zakarpattia: [
    "Uzhhorod",
    "Mukachevo",
    "Khust",
    "Vynohradiv",
    "Berehove",
    "Svaliava",
    "Rakhiv",
    "Tiachiv",
    "Irshava",
    "Chop",
    "Perechyn",
  ],
  Mykolaiv: [
    "Yuzhnoukrainsk",
    "Voznesensk",
    "Ochakiv",
    "Novyi Buh",
    "Snihurivka",
    "Nova Odesa",
    "Bashtanka",
  ],
};

export const isOblastKey = (e: string): e is keyof OblastRegion => {
  try {
    return Object.keys(OblastList).includes(e);
  } catch (a) {
    return false;
  }
};
export const isCity = (
  oblast: string,
  city: string
): city is OblastRegion[keyof OblastRegion] => {
  try {
    return OblastList[oblast].includes(city);
  } catch (e) {
    return false;
  }
};
export type { OblastRegion };
