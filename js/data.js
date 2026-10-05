/* ==========================================================================
   Site content — edit this file to change contact details, projects,
   insights and FAQs. Every page reads from here.
   Project images live in assets/projects/<slug>/.
   Insight and team images are still placeholders from picsum.photos.
   ========================================================================== */

const img = (seed, w = 1200, h = 1500) => `https://picsum.photos/seed/${seed}/${w}/${h}`;
const P = (slug, file) => `assets/projects/${slug}/${file}`;

window.SITE = {
  brand: "IvanAyao",
  name: "IvanAyao",
  logo: "assets/logo.png",
  email: "ivan.ayao@gmail.com",
  phone: "+63 927 650 6206",
  address: ["IVAN AYAO", "UI/UX & GRAPHIC DESIGNER", "PHILIPPINES"],
  socials: [
    { label: "LI", href: "https://linkedin.com/" },
    { label: "IG", href: "https://instagram.com/" },
    { label: "X", href: "https://x.com/" },
  ],
  tagline: [
    { t: "UI/UX & GRAPHIC DESIGNER.", b: true },
    { t: " WEBSITES, ILLUSTRATION AND BRAND WORK FOR TEAMS THAT WANT TO " },
    { t: "STAND OUT FROM THE CROWD.", b: true },
  ],
};

/* Projects
   category  — shown left of the title on hover
   tag       — shown right of the title on hover (the industry / type)
   cover     — 3:4 image used on the home page
   full      — full-page website screenshot (scrolls inside a browser frame on the project page)
   gallery   — extra images shown on the project page
   url       — optional live site; the "Visit website" button only appears when this is set
*/
/* Placeholder case-study copy, used for any field a project doesn't set yet.
   To write real copy for a project, add the same field to that project below, e.g.
   challenge: "Your text…", or credits: ["NAME (ROLE)"], or quote / quoteBy. */
window.PROJECT_PLACEHOLDER = {
  overview: "Placeholder — a short summary of the project: who the client is, what they needed, and what you were brought in to design. Two or three sentences is enough to set the scene.",
  challenge: "Placeholder — what made this project difficult. Describe the problem with the old site or brand, the constraints you worked within, and what success needed to look like.",
  approach: "Placeholder — how you solved it. Walk through the key decisions: research, wireframes, layout and visual direction, and how you worked with the client and developers to bring it to life.",
  outcome: "Placeholder — the result. Mention what was delivered, how long it took, and any impact you can share, such as launch, traffic, sign-ups or client feedback.",
  credits: ["IVAN AYAO (UI/UX DESIGN)", "NAME (ROLE)", "NAME (ROLE)"],
  quote: "Placeholder — a short testimonial from the client about working together and the final result.",
  quoteBy: "CLIENT NAME, TITLE",
};

window.PROJECTS = [
  {
    slug: "udial-remit", title: "UDIAL REMIT", category: "UI/UX Design", tag: "Fintech",
    cover: P("udial-remit", "cover.jpg"), full: P("udial-remit", "full.jpg"),
    excerpt: "A money transfer platform helping Filipinos in the UK send more of their hard-earned money home.",
    about: "Udial Remit is a money transfer platform that aims to offer Filipinos in the United Kingdom a reliable and affordable remittance service that gives them great value for their hard-earned money, so that they can provide for their loved ones in the Philippines as best as they can with ease.",
    role: "Client coordination, wireframing, UI design, graphic & icon design, coordination with developer.",
    tools: "Figma, Adobe Photoshop, Adobe Illustrator",
  },
  {
    slug: "destiny-church", title: "DESTINY CHURCH", category: "UI/UX Design", tag: "Church",
    cover: P("destiny-church", "cover.jpg"), full: P("destiny-church", "full.jpg"),
    excerpt: "A warm, community-first website for a church with a vision to love God, love people and influence the world.",
    about: "A church with a vision to see people love God, love people and influence the world. With a strong sense of community, people and children of all ages are encouraged to learn about their own faith and the role of the church in the community and worldwide.",
    role: "UI design, graphic & icon design, client coordination, developer coordination.",
    tools: "Figma, Adobe Photoshop, Adobe Illustrator",
  },
  {
    slug: "essay24", title: "ESSAY24", category: "UI Design", tag: "Education",
    cover: P("essay24", "cover.jpg"), full: P("essay24", "full.jpg"),
    excerpt: "A confident, conversion-focused site for a professional academic writing service.",
    about: "Essay24.com offers students and professionals a practical way to delegate their writing assignments to professional writers who can get the job done with guaranteed excellence — just like getting your car fixed by a service centre.",
    role: "UI design, graphic & icon design, client coordination, developer coordination.",
    tools: "Adobe Photoshop, Adobe Illustrator",
  },
  {
    slug: "innovationsch", title: "INNOVATIONSCH", category: "UI Design", tag: "Healthcare NGO",
    cover: P("innovationsch", "cover.jpg"), full: P("innovationsch", "full.jpg"),
    excerpt: "A clear, trustworthy web presence for a Filipino NGO scaling community health innovation.",
    about: "Innovations for Community Health, Inc. (InnovationsCH) is an independent Filipino NGO and the first implementation-focused NGO in the country that looks into sustainable and scalable innovations in community health, with an emphasis on private-sector delivery mechanisms.",
    role: "UI design, graphic & icon design, client coordination, developer coordination.",
    tools: "Adobe Photoshop, Adobe Illustrator",
  },
  {
    slug: "dap-coe-psp", title: "DAP COE PSP", category: "UI/UX Design", tag: "Government",
    cover: P("dap-coe-psp", "cover.jpg"), full: P("dap-coe-psp", "full.jpg"),
    excerpt: "A knowledge hub for the APO Center of Excellence on Public Sector Productivity.",
    about: "The Philippines has been designated as the Asian Productivity Organization (APO) Center of Excellence on Public Sector Productivity (COE-PSP), with the Development Academy of the Philippines (DAP) as the focal organization and implementing institution.",
    role: "Client coordination, wireframing, UI/UX design, graphic & icon design, coordination with developer, website maintenance.",
    tools: "Figma, Adobe Photoshop, Adobe Illustrator",
  },
  {
    slug: "pef-anniversary", title: "PEF ANNIVERSARY", category: "UI/UX Design", tag: "Nonprofit",
    cover: P("pef-anniversary", "cover.jpg"), full: P("pef-anniversary", "full.jpg"),
    excerpt: "An anniversary site and online gallery celebrating two decades of the Peace and Equity Foundation.",
    about: "The Peace and Equity Foundation (PEF) aspires to drive positive change in poor Filipino household communities by investing in social enterprises that provide viable livelihoods and better access to basic services. Founded in October 2001, PEF is the steward of an endowment fund and a non-stock, nonprofit organization based in Quezon City, Philippines.",
    role: "Client coordination, wireframing, UI design for the anniversary and online gallery pages, graphic & icon design, coordination with developer.",
    tools: "Figma, Adobe Photoshop",
  },
  {
    slug: "md-gruppe", title: "MD GRUPPE", category: "UI/UX Design", tag: "Manufacturing",
    cover: P("md-gruppe", "cover.jpg"), full: P("md-gruppe", "full.jpg"),
    excerpt: "An industrial, bold website for a sheet metal fabrication group.",
    about: "MD Gruppe is a Philippine group of companies that provides sheet metal fabrication services for a wide range of industries.",
    role: "Wireframing, UI/UX design, graphic & icon design, coordination with developer, client coordination.",
    tools: "Adobe Photoshop, Adobe Illustrator",
  },
  {
    slug: "maverick-heroes", title: "MAVERICK HEROES", category: "Web & Illustration", tag: "Web Agency",
    cover: P("maverick-heroes", "cover.jpg"), full: P("maverick-heroes", "full.jpg"),
    excerpt: "An illustrated, character-led website for a custom web development company.",
    about: "Maverick Heroes is a web development company that specializes in custom-made website designs and offers its services internationally via different freelancing platforms.",
    role: "Design team lead, idea & conceptualization, UI design, graphic & icon design.",
    tools: "Adobe Photoshop, Adobe Illustrator",
  },
  {
    slug: "abc-furniture", title: "ABC FURNITURE", category: "UI Design", tag: "Furniture",
    cover: P("abc-furniture", "cover.jpg"), full: P("abc-furniture", "full.jpg"),
    excerpt: "A calm, natural landing experience for a Philippine interior furniture company.",
    about: "ABC Furniture Lines Inc. was formed to mobilize a highly organized and competitive company aiming to provide high-quality interior furniture to the Philippine market.",
    role: "Client coordination, UI design, website maintenance.",
    tools: "Figma, Adobe Photoshop, Adobe Illustrator",
  },
  {
    slug: "dap-mgrp", title: "DAP MGRP", category: "UI Design", tag: "Government",
    cover: P("dap-mgrp", "cover.jpg"), full: P("dap-mgrp", "full.jpg"),
    excerpt: "The online home of a national regulatory reform program.",
    about: "The Modernizing Government Regulations (MGR) Program is a comprehensive national regulatory reform program implemented by the Development Academy of the Philippines (DAP) in partnership with the National Economic and Development Authority (NEDA) and the Department of Budget and Management (DBM).",
    role: "Client coordination, UI design, website maintenance.",
    tools: "Adobe Photoshop, Adobe Illustrator",
  },
  {
    slug: "kooki-kochi", title: "KOOKI KOCHI", category: "Character Design", tag: "Game",
    cover: P("kooki-kochi", "cover.jpg"),
    gallery: ["p02", "p03", "p04", "p05"].map((f) => P("kooki-kochi", f + ".jpg")),
    excerpt: "Characters, power-ups and weapons for the Kooki Kochi Invasion flash game.",
    about: "Character design made for the Brain Blowout flash game project Kooki Kochi Invasion — a cast of monsters in several colourways and moods, plus hammers, bombs and power-ups.",
    role: "Character design, game asset illustration.",
    tools: "Adobe Illustrator",
  },
  {
    slug: "game-art", title: "GAME ART", category: "Illustration", tag: "Game",
    cover: P("game-art", "cover.jpg"),
    gallery: ["p06", "p07", "p08", "p09"].map((f) => P("game-art", f + ".jpg")),
    excerpt: "Lucky-cat characters, game scenes, avatar sets and achievement badges.",
    about: "A collection of game artwork: lucky-cat character designs, in-game background scenes, a set of expressive avatar faces and a family of achievement badges.",
    role: "Character design, environment illustration, icon & badge design.",
    tools: "Adobe Illustrator, Adobe Photoshop",
  },
  {
    slug: "illustration", title: "ILLUSTRATION", category: "Custom Illustration", tag: "Illustration",
    cover: P("illustration", "cover.jpg"),
    gallery: ["p12", "p10", "p11", "p13", "p14", "p15"].map((f) => P("illustration", f + ".jpg")),
    excerpt: "Isometric cities, characters, avatars and illustrated web headers.",
    about: "Custom graphic illustration across different styles: an isometric smart-city map, character and family illustrations, the Keira Drake avatar and wordmark, a Mt. Rainier skyline, and illustrated website hero scenes.",
    role: "Illustration, character design, logo & avatar design.",
    tools: "Adobe Illustrator, Adobe Photoshop",
  },
  {
    slug: "print-branding", title: "PRINT & LOGOS", category: "Graphic Design", tag: "Branding",
    cover: P("print-branding", "cover.jpg"),
    gallery: ["x12", "x13", "x14", "x15", "x16", "x17", "p04"].map((f) => P("print-branding", f + ".jpg")),
    excerpt: "Brochures, flyers, business cards, event collateral and logo design.",
    about: "Print and identity work: tri-fold and booklet brochures, marketing flyers, business cards and event collateral, alongside a selection of logos for brands across hospitality, training, media and print.",
    role: "Graphic design, layout, logo design.",
    tools: "Adobe Illustrator, Adobe Photoshop",
  },
];

window.ARTICLES = [
  { slug: "the-power-of-restraint", title: "The Power of Restraint", type: "Lab", date: "September 24, 2026", img: img("alta-art-1", 1400, 1050),
    excerpt: "Why the strongest visual systems are often defined by what they leave out." },
  { slug: "notes-on-texture", title: "Notes on Texture", type: "Article", date: "September 10, 2026", img: img("alta-art-2", 1400, 1050),
    excerpt: "A loose collection of observations on grain, surface and how small details change the whole read of an image." },
  { slug: "the-background-matters", title: "The Background Matters", type: "Lab", date: "August 28, 2026", img: img("alta-art-3", 1400, 1050),
    excerpt: "The quiet elements behind the subject often decide how an image feels. A closer look at what sits behind." },
  { slug: "what-makes-a-brand-memorable", title: "What Makes a Brand Memorable", type: "Article", date: "August 12, 2026", img: img("alta-art-4", 1400, 1050),
    excerpt: "Recognition is built, not found. The choices that help a brand stick in people's heads." },
  { slug: "direction-before-design", title: "Direction Before Design", type: "Article", date: "July 30, 2026", img: img("alta-art-5", 1400, 1050),
    excerpt: "Why the most important design decision happens long before anyone opens a design tool." },
  { slug: "chasing-the-light", title: "Chasing the Light", type: "Lab", date: "July 14, 2026", img: img("alta-art-6", 1400, 1050),
    excerpt: "An image-led study of light, shadow and softness, and the moment atmosphere takes over." },
  { slug: "style-is-not-a-strategy", title: "Style Is Not a Strategy", type: "Lab", date: "June 29, 2026", img: img("alta-art-7", 1400, 1050),
    excerpt: "A good look can fade fast. Direction is what gives visuals purpose and staying power." },
  { slug: "consistency-wins", title: "Consistency Wins", type: "Article", date: "June 11, 2026", img: img("alta-art-8", 1400, 1050),
    excerpt: "In a feed full of novelty, consistency is the thing people actually remember." },
];

/* Shared article body — replace with real content per article (add a `body` array to any article above). */
window.ARTICLE_BODY = [
  "Every strong piece of visual work starts with a decision about what not to include. The edit is where direction becomes visible.",
  "When we start a project, we spend more time removing than adding. References get cut, palettes get narrower, and type choices get reduced until what remains feels inevitable rather than decorative.",
  "## Fewer, sharper decisions",
  "Restraint is not minimalism for its own sake. It is about making each remaining element work harder. A single colour, used with conviction, says more than a palette of twelve used cautiously.",
  "The same goes for composition. A frame with one clear subject and a deliberate amount of space around it reads instantly — on a billboard, in a feed, or on a phone held at arm's length on a train.",
  "## Building it into a system",
  "The real test is repetition. A rule that works once is a style; a rule that works across fifty assets is a system. We document the rules early, test them on the hardest formats first, and only then scale them out.",
  "The result is work that feels calm, confident and recognisable — and a team that can keep producing it long after we have handed it over.",
];

window.FAQS = [
  { q: "How does a new project start?", a: "With a conversation. We get to know your goals, references, timeline and the kind of presence you want to build. From there we shape the scope, agree on a direction and set up a process that feels clear from day one." },
  { q: "What kind of projects do you take on?", a: "Creative direction, visual identity, campaigns, digital experiences and image-led brand work. Some projects are small and focused, others are full systems with many outputs. The common thread is a strong point of view." },
  { q: "Do you only work with established brands?", a: "No. We work with early-stage teams and established companies alike. What matters is the ambition behind the project, not the size of the brand." },
  { q: "Can you help define our creative direction?", a: "Yes — it is the core of what we do. We help define tone, visual language, image direction and atmosphere so the final result feels focused and intentional." },
  { q: "How long does a typical project take?", a: "It depends on scope. Focused projects usually take 3–5 weeks; larger identity or campaign systems typically take 6–10 weeks." },
  { q: "What if I'm not sure what I need yet?", a: "That's completely fine. Many projects start with a hunch or a rough reference. We'll help turn it into a clear brief before any design work begins." },
];
