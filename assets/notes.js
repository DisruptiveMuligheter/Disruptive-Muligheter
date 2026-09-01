/* Perspektivnotater — Disruptive Muligheter
   Legg til et nytt notat her, så dukker det automatisk opp i rutenettet,
   søket, filtrene og statistikken på begge språkversjoner av siden. */
const NOTES = [
  {
    issue: 6,
    file: "Kina 2.0 - Disruptive Perspektiver no.6.pdf",
    pages: 59,
    bytes: 1424945,
    no: {
      title: "Kina 2.0",
      desc: "Kinas teknologiske gjenreisning: fra kopiering til egen innovasjon i en ny geopolitisk virkelighet.",
      tags: ["Geopolitikk", "Kina", "Innovasjon"],
    },
    en: {
      title: "China 2.0",
      desc: "China's technological reinvention: from imitation to homegrown innovation in a new geopolitical reality.",
      tags: ["Geopolitics", "China", "Innovation"],
    },
  },
  {
    issue: 5,
    file: "Jakten på Metaverse - Disruptive Perspektiver No.5.pdf",
    pages: 81,
    bytes: 3199593,
    no: {
      title: "Jakten på Metaverse",
      desc: "Hva skjedde egentlig med metaverset? En etterpåklok analyse av hypen, pengene og det som ble igjen.",
      tags: ["Metaverse", "Techhype", "VR"],
    },
    en: {
      title: "The Hunt for the Metaverse",
      desc: "What really happened to the metaverse? A clear-eyed look at the hype, the money, and what remains.",
      tags: ["Metaverse", "Tech hype", "VR"],
    },
  },
  {
    issue: 4,
    file: "Digitale Agenter - Disruptive Perspektiver No. 4.pdf",
    pages: 67,
    bytes: 3775087,
    no: {
      title: "Digitale Agenter",
      desc: "Fra chatbot til kollega: hvordan autonome AI-agenter er i ferd med å endre arbeid og organisasjoner.",
      tags: ["AI", "Arbeid", "Agenter"],
    },
    en: {
      title: "Digital Agents",
      desc: "From chatbot to colleague: how autonomous AI agents are set to transform work and organizations.",
      tags: ["AI", "Work", "Agents"],
    },
  },
  {
    issue: 3,
    file: "Digital Føydaløkonomi - Disruptive Perspektiver No.3.pdf",
    pages: 28,
    bytes: 1390745,
    no: {
      title: "Digital Føydaløkonomi",
      desc: "Blir vi alle leilendinger i plattformenes rike? Om digital føydalisme og eierskap i den nye økonomien.",
      tags: ["Økonomi", "Plattformer", "Makt"],
    },
    en: {
      title: "Digital Feudal Economy",
      desc: "Are we all tenants on someone else's platform? On digital feudalism and ownership in the new economy.",
      tags: ["Economy", "Platforms", "Power"],
    },
  },
  {
    issue: 2,
    file: "Wealth of Nations - Disruptive Perspektiver No.2.pdf",
    pages: 73,
    bytes: 9750866,
    no: {
      title: "Wealth of Nations",
      desc: "En moderne lesning av nasjoners rikdom: hvordan teknologi omfordeler makt og velstand mellom land.",
      tags: ["Økonomi", "Geopolitikk"],
    },
    en: {
      title: "Wealth of Nations",
      desc: "A modern take on the wealth of nations: how technology is reshuffling power and prosperity between countries.",
      tags: ["Economy", "Geopolitics"],
    },
  },
  {
    issue: 1,
    file: "AI Infra - Disruptive Perspektiver No.1.pdf",
    pages: 58,
    bytes: 3195138,
    no: {
      title: "AI Infra",
      desc: "Hvem eier fremtidens intelligens? Et dypdykk i kappløpet om AI-infrastruktur — brikker, datasentre og energi.",
      tags: ["AI", "Infrastruktur", "Energi"],
    },
    en: {
      title: "AI Infra",
      desc: "Who owns the future of intelligence? A deep dive into the race for AI infrastructure — chips, data centers and energy.",
      tags: ["AI", "Infrastructure", "Energy"],
    },
  },
];

if (typeof module !== "undefined") module.exports = NOTES;
