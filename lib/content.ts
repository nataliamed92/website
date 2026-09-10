/**
 * Every business fact on this site lives here. Components never hard-code a
 * phone number, an address or a service name. Source of truth: the ClinicBrain
 * intake form submitted 2026-09-09 by the practice.
 *
 * Nothing in this file may be invented. Where the form left a field blank the
 * value is `null` and the UI omits that block entirely.
 */

export const siteUrl = "https://natalia-fourla.vercel.app";

export const doctor = {
  name: "Ναταλία Φούρλα",
  credentials: "MD, MSc",
  fullName: "Ναταλία Φούρλα MD, MSc",
  specialty: "Ωτορινολαρυγγολόγος",
  subSpecialty: "Πλαστική Χειρουργική Προσώπου",
  tagline: "Με γνώση και σεβασμό για τον άνθρωπο-ασθενή",
  bio: "Ειδικευμένη στη Χειρουργική ΩΡΛ και στη Χειρουργική Κεφαλής και Τραχήλου στο μεγαλύτερο νοσοκομείο της χώρας, το ΓΝΑ «Ευαγγελισμός». Μεταπτυχιακό στη Χειρουργική Ανατομία στο ΕΚΠΑ, με εξειδικεύσεις στην Ενδοσκοπική Χειρουργική Ρινός και στην Πλαστική Χειρουργική Προσώπου.",
} as const;

/** Training milestones, drawn strictly from the bio above. */
export const credentials = [
  {
    title: "Χειρουργική ΩΡΛ, Κεφαλής και Τραχήλου",
    place: "ΓΝΑ «Ευαγγελισμός»",
    note: "Ειδικότητα στο μεγαλύτερο νοσοκομείο της χώρας.",
  },
  {
    title: "Μεταπτυχιακό στη Χειρουργική Ανατομία",
    place: "ΕΚΠΑ",
    note: "Ανατομική θεμελίωση κάθε χειρουργικής απόφασης.",
  },
  {
    title: "Ενδοσκοπική Χειρουργική Ρινός",
    place: "Εξειδίκευση",
    note: "Επεμβάσεις ρινός και παραρρινίων χωρίς εξωτερικές τομές.",
  },
  {
    title: "Πλαστική Χειρουργική Προσώπου",
    place: "Εξειδίκευση",
    note: "Λειτουργική και αισθητική αποκατάσταση στο ίδιο χέρι.",
  },
] as const;

export type Service = {
  slug: string;
  title: string;
  lead: string;
  items: string[];
};

/**
 * The five service families exactly as the practice listed them. Item wording is
 * normalised for spelling and accents only; nothing added, nothing removed.
 */
export const services: Service[] = [
  {
    slug: "diagnostika",
    title: "Διαγνωστικές εξετάσεις",
    lead: "Ο πλήρης ΩΡΛ έλεγχος ολοκληρώνεται στο ιατρείο, στο ίδιο ραντεβού.",
    items: [
      "Ακοόγραμμα",
      "Τυμπανόγραμμα",
      "Ωτοσκόπηση",
      "Ενδοσκόπηση λάρυγγα",
      "Ενδοσκόπηση ρινός",
    ],
  },
  {
    slug: "myti",
    title: "Μύτη",
    lead: "Από τη χρόνια ρινική απόφραξη έως το ροχαλητό και την υπνική άπνοια.",
    items: [
      "Ρινίτιδες",
      "Σκολίωση ρινικού διαφράγματος",
      "Πολύποδες ρινός",
      "Χρόνια ιγμορίτιδα",
      "Ροχαλητό και υπνική άπνοια",
      "Υπερτροφία κάτω ρινικών κογχών",
      "Ρινορραγία",
      "Ρινική βαλβίδα",
    ],
  },
  {
    slug: "afti",
    title: "Αυτί",
    lead: "Ακοή, πόνος και ίλιγγος αντιμετωπίζονται μαζί, όχι χωριστά.",
    items: [
      "Ωτίτιδες",
      "Δυσλειτουργία ευσταχιανής σάλπιγγας",
      "Βύσμα κυψελίδας",
      "Καλοήθης παροξυσμικός ίλιγγος θέσης (BPPV)",
      "Νόσος Meniere",
    ],
  },
  {
    slug: "traxilos",
    title: "Λαιμός και τράχηλος",
    lead: "Φωνή, κατάποση και τραχηλικές διογκώσεις σε έναν έλεγχο.",
    items: [
      "Αμυγδαλίτιδα και κυνάγχη",
      "Τραχηλικές διογκώσεις",
      "Παθήσεις φωνητικών χορδών",
      "Φαρυγγολαρυγγική παλινδρόμηση",
      "Βράγχος φωνής",
    ],
  },
  {
    slug: "paido-orl",
    title: "Παιδο-ΩΡΛ",
    lead: "Οι τρεις παθήσεις που φέρνουν τα περισσότερα παιδιά στο ιατρείο.",
    items: [
      "Υπερτροφία αδενοειδών εκβλαστήσεων",
      "Υπερτροφία αμυγδαλών",
      "Εκκριτική ωτίτιδα",
    ],
  },
];

/** Kept separate from `services`: this is the surgical, elective side. */
export const facialSurgery = {
  title: "Πλαστική Χειρουργική Προσώπου",
  lead: "Η ανατομία της μύτης και του προσώπου δουλεύεται από χειρουργό που τη γνωρίζει και λειτουργικά, όχι μόνο αισθητικά.",
  items: [
    {
      name: "Ρινοπλαστική",
      note: "Σχήμα και αναπνοή αντιμετωπίζονται στην ίδια επέμβαση.",
    },
    {
      name: "Βλεφαροπλαστική",
      note: "Αποκατάσταση της περιοχής των βλεφάρων, άνω και κάτω.",
    },
    {
      name: "Αφεστώτα ώτα",
      note: "Διόρθωση της προβολής των αυτιών, σε παιδιά και ενήλικες.",
    },
    {
      name: "Εκτομή βλαβών δέρματος",
      note: "Αφαίρεση βλαβών στο δέρμα της ρινός και των ώτων.",
    },
  ],
} as const;

export const contact = {
  phone: { display: "697 088 2795", href: "tel:+306970882795" },
  email: "natalyfourla@gmail.com",
  address: {
    street: "Λεωφόρος Βασιλίσσης Σοφίας 50",
    area: "Χίλτον",
    city: "Αθήνα",
    country: "GR",
    mapsQuery: "Λεωφόρος Βασιλίσσης Σοφίας 50, Αθήνα",
  },
  /** The intake form gave a 30' appointment slot. */
  appointmentMinutes: 30,
} as const;

export const hours = [
  { day: "Δευτέρα", slots: ["11:00 - 14:00"], schemaDay: "Monday" },
  { day: "Τρίτη", slots: ["11:00 - 14:00"], schemaDay: "Tuesday" },
  { day: "Παρασκευή", slots: ["17:00 - 19:00"], schemaDay: "Friday" },
] as const;

export const social = [
  { label: "Instagram", handle: "@natalyfourla", href: "https://www.instagram.com/natalyfourla/" },
  { label: "TikTok", handle: "@drnatalyfourla", href: "https://www.tiktok.com/@drnatalyfourla" },
] as const;

/**
 * Generated atmospheric photography, not photographs of the practice. The
 * intake form supplied no usable clinic or portrait images, so nothing here is
 * presented as a real room, a real patient or a real result.
 */
export const brand = {
  /** Chosen from the client's six-concept sheet: white line art on dark. */
  lockup: "/brand/logo-lockup.png",
  mark: "/brand/logo-mark.png",
} as const;

/**
 * The hero film: the logo drawing itself on black. Rendered by
 * `tools/make-logo-video.py`, which is deterministic, so re-running it
 * reproduces these files exactly.
 */
export const video = {
  heroLandscape: "/video/hero-16x9.mp4",
  heroPortrait: "/video/hero-9x16.mp4",
  poster: "/video/hero-poster.jpg",
  /** Standalone films with the wordmark, for Instagram and TikTok. */
  filmLandscape: "/video/logo-16x9.mp4",
  filmPortrait: "/video/logo-9x16.mp4",
} as const;

export const images = {
  instruments: "/img/instruments.jpg",
  profile: "/img/profile-study.jpg",
  room: "/img/consultation-room.jpg",
  avenue: "/img/athens-avenue.jpg",
  coat: "/img/white-coat.jpg",
} as const;
