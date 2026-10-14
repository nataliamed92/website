/**
 * The English edition of `content.ts`, key for key. Added 2026-10-12 when the
 * practice asked for the whole site in both languages.
 *
 * It is a translation, not a rewrite: every fact, every hedge and every
 * omission in the Greek file holds here too. Nothing may be added in English
 * that the Greek does not say. Facts that do not change with the language —
 * phone, email, photographs, publication titles, the films — are re-exported
 * from the Greek file rather than copied, so they cannot drift apart.
 *
 * The condition and procedure texts are a translation of general ENT
 * information we wrote; like the Greek, they await the doctor's review.
 */

import * as el from "./content";

export { siteUrl, publications, social, brand, video, images } from "./content";

export const nav = [
  { label: "The doctor", href: "/en/doctor" },
  { label: "Services", href: "/en/services" },
  { label: "Facial surgery", href: "/en/facial-surgery" },
  { label: "Practice", href: "/en/practice" },
  { label: "Contact", href: "/en/contact" },
] as const;

export const doctor = {
  name: "Natalia Fourla",
  credentials: el.doctor.credentials,
  fullName: "Natalia Fourla MD, MSc",
  specialty: "ENT Surgeon",
  subSpecialty: "Facial Plastic Surgery",
  tagline: "With knowledge and respect for the patient as a person",
  bio: "Trained in ENT and Head and Neck Surgery at Evangelismos General Hospital of Athens, the largest hospital in Greece. MSc in Surgical Anatomy from the Medical School of the National and Kapodistrian University of Athens, with postgraduate training in Endoscopic Nasal Surgery and Facial Plastic Surgery. A member of the Iatroaesthetics team, working with surgeon Konstantinos Makrypidis since 2019.",

  /** Her own biography, translated as closely as English allows. */
  profile: [
    "Natalia Fourla, MD, MSc, is an ENT Surgeon – Head and Neck Surgeon who graduated from medical school with distinction (9.80/10). She completed her specialist training at Evangelismos General Hospital of Athens, where she gained substantial clinical and surgical experience across the full range of modern Otorhinolaryngology and in the management of emergencies.",
    "She holds an MSc in Surgical Anatomy from the Medical School of the National and Kapodistrian University of Athens and has completed postgraduate training in endoscopic surgery of the nose and paranasal sinuses in Italy, as well as in Facial Plastic Surgery, with a particular interest in functional and aesthetic nasal surgery.",
    "Since 2019 she has been a member of the Iatroaesthetics team, working with surgeon Konstantinos Makrypidis on the treatment and surgical management of ENT cases and specialised Facial Plastic Surgery procedures.",
    "She also treats paediatric ENT patients, having gained clinical and surgical experience at Penteli Children's Hospital. She maintains an active scientific presence, taking part in Greek and international congresses as well as in research and publications in Otorhinolaryngology and Facial Surgery.",
  ],
} as const;

export const credentials = [
  {
    title: "ENT, Head and Neck Surgery",
    place: "Evangelismos General Hospital",
    note: "Specialist training at the largest hospital in Greece.",
  },
  {
    title: "MSc in Surgical Anatomy",
    place: "Medical School, National and Kapodistrian University of Athens",
    note: "The anatomical grounding of every surgical decision.",
  },
  {
    title: "Endoscopic Nasal Surgery",
    place: "Postgraduate training",
    note: "Nasal and sinus surgery without external incisions.",
  },
  {
    title: "Facial Plastic Surgery",
    place: "Postgraduate training",
    note: "Functional and aesthetic reconstruction by the same hands.",
  },
] as const;

export const services: el.Service[] = [
  {
    slug: "diagnostika",
    title: "Diagnostic tests",
    lead: "A complete ENT assessment is carried out at the practice, in the same appointment.",
    items: [
      {
        name: "Audiogram",
        what: "Measures hearing across the full range of frequencies used in speech. The patient wears headphones and indicates when a sound is heard, so the hearing threshold of each ear can be mapped separately.",
        list: {
          label: "What it shows",
          items: [
            "The degree of hearing loss, ear by ear",
            "Whether the problem lies in the middle or the inner ear",
            "Which frequencies are affected",
            "A baseline for every later test",
          ],
        },
        close: {
          label: "How it is done",
          body: "A painless test of a few minutes, with no preparation. It is often done together with a tympanogram, because the two tests answer different questions.",
        },
      },
      {
        name: "Tympanogram",
        what: "Checks how freely the eardrum moves and what pressure there is behind it, in the middle ear. A small probe varies the pressure in the ear canal and records the response.",
        list: {
          label: "What it shows",
          items: [
            "Fluid behind the eardrum",
            "Eustachian tube dysfunction",
            "A perforated eardrum",
            "Whether a ventilation tube is working",
          ],
        },
        close: {
          label: "How it is done",
          body: "It takes seconds per ear and needs no cooperation, which makes it especially useful in young children.",
        },
      },
      {
        name: "Otoscopy",
        what: "Direct visual examination of the outer ear canal and the eardrum. It is the first step for any ear complaint and often the only examination needed.",
        list: {
          label: "What it shows",
          items: [
            "Inflammation of the canal or the eardrum",
            "Earwax impaction",
            "Perforation or scarring of the eardrum",
            "Fluid in the middle ear",
          ],
        },
        close: {
          label: "How it is done",
          body: "With an otoscope or an endoscope, so the image can be discussed with the patient on the spot.",
        },
      },
      {
        name: "Laryngeal endoscopy",
        what: "A thin flexible endoscope passed through the nose shows the pharynx and the larynx, with the vocal cords in motion. It is the examination that explains why a voice does not recover.",
        list: {
          label: "What it shows",
          items: [
            "Nodules, polyps or cysts of the vocal cords",
            "Paresis or reduced movement of a vocal cord",
            "Signs of laryngopharyngeal reflux",
            "Lesions that need further investigation",
          ],
        },
        close: {
          label: "How it is done",
          body: "With a local anaesthetic spray, in a few minutes and without sedation. It is advised for any hoarseness lasting more than three weeks.",
        },
      },
      {
        name: "Nasal endoscopy",
        what: "The endoscope lights up the inside of the nose where simple inspection cannot reach: the full length of the septum, the turbinates, the nasopharynx and the openings of the paranasal sinuses.",
        list: {
          label: "What it shows",
          items: [
            "The position and degree of a septal deviation",
            "Enlargement of the inferior turbinates",
            "Polyps and signs of chronic sinusitis",
            "Enlarged adenoids in children",
          ],
        },
        close: {
          label: "How it is done",
          body: "Painless and done at the practice. It is a prerequisite before any nasal operation is planned.",
        },
      },
    ],
  },
  {
    slug: "myti",
    title: "Nose",
    lead: "From chronic nasal blockage to snoring and sleep apnoea.",
    items: [
      {
        name: "Rhinitis",
        what: "Inflammation of the lining of the nose, allergic or non-allergic. Allergic rhinitis follows exposure to a specific allergen and may be seasonal or year-round; non-allergic rhinitis is triggered by irritants, changes in temperature or medication.",
        list: {
          label: "Symptoms",
          items: [
            "Nasal congestion",
            "Runny nose and sneezing",
            "Itchy nose and eyes",
            "Postnasal drip and throat clearing",
          ],
        },
        close: {
          label: "Treatment",
          body: "Identifying and avoiding the trigger, saline rinses and topical medication. When the blockage persists despite proper treatment, reducing the size of the turbinates is considered.",
        },
      },
      {
        name: "Deviated nasal septum",
        what: "The septum is the wall of cartilage and bone that divides the two nasal passages. It is rarely perfectly straight, but when it deviates significantly it narrows one side and disturbs the airflow, often on both sides.",
        list: {
          label: "Symptoms",
          items: [
            "Persistent blockage on one side",
            "Snoring and restless sleep",
            "Dry mouth from breathing with the mouth open",
            "Recurrent sinusitis and nosebleeds",
          ],
        },
        close: {
          label: "Treatment",
          body: "Septoplasty straightens the septum from inside the nose, without an external incision. Enlarged turbinates, if present, are corrected in the same operation; when the shape of the nose is also a concern, it is discussed as a functional rhinoplasty.",
        },
      },
      {
        name: "Nasal polyps",
        what: "Benign, swollen growths of the nasal lining, the result of chronic inflammation of the nose and sinuses. They grow slowly and often go unnoticed until they substantially block the airway.",
        list: {
          label: "Symptoms",
          items: [
            "Gradual blockage, usually on both sides",
            "Reduced or lost sense of smell",
            "A feeling of heaviness in the face",
            "Thick postnasal drip",
          ],
        },
        close: {
          label: "Treatment",
          body: "Topical corticosteroids and rinses come first. When they are not enough, endoscopic removal restores the airway and the ventilation of the sinuses. The condition tends to recur, so treatment and follow-up after surgery are part of the therapy, not an afterthought.",
        },
      },
      {
        name: "Chronic sinusitis",
        what: "Inflammation of the paranasal sinuses lasting more than twelve weeks. The opening that drains the sinus stays blocked, secretions pool and the cycle of inflammation sustains itself.",
        list: {
          label: "Symptoms",
          items: [
            "Persistent nasal blockage",
            "Thick or purulent discharge",
            "Pressure and pain in the face",
            "Reduced sense of smell and a bad smell",
          ],
        },
        close: {
          label: "Treatment",
          body: "Rinses, topical corticosteroids and targeted antibiotics during flare-ups. Once conservative treatment has been exhausted, endoscopic sinus surgery opens the natural drainage pathways without external incisions.",
        },
      },
      {
        name: "Snoring and sleep apnoea",
        what: "During sleep the muscle tone of the upper airway drops. Where there is already a narrowing — in the nose, the pharynx or at the base of the tongue — air passes with vibration, which is snoring, and in more severe forms the airflow stops repeatedly.",
        list: {
          label: "Symptoms",
          items: [
            "Loud snoring with pauses in breathing",
            "Waking with a choking sensation",
            "Daytime sleepiness and poor concentration",
            "Morning headache and unrefreshing sleep",
          ],
        },
        close: {
          label: "Treatment",
          body: "First, finding where the narrowing is, through an ENT examination and, where needed, a sleep study. Depending on the case, this is followed by weight and sleep-position management, a positive airway pressure device, or surgery to correct the nasal or pharyngeal obstruction.",
        },
      },
      {
        name: "Enlarged inferior turbinates",
        what: "The turbinates warm, humidify and filter the air we breathe in. When they swell permanently — from allergy, chronic rhinitis or long-term use of decongestant sprays — they take up the space of the airway.",
        list: {
          label: "Symptoms",
          items: [
            "Blockage that alternates from side to side",
            "Worse when lying down, at night",
            "Dependence on decongestant sprays",
            "Dry mouth and waking during the night",
          ],
        },
        close: {
          label: "Treatment",
          body: "Topical corticosteroids and stopping decongestants. When these are not enough, radiofrequency reduction is done under local anaesthesia and preserves the function of the turbinate rather than removing it.",
        },
      },
      {
        name: "Nosebleeds",
        what: "Bleeding from the rich network of blood vessels in the nasal lining. In the great majority of cases it comes from the front of the septum, an area easily examined with endoscopy.",
        list: {
          label: "Common causes",
          items: [
            "Dry nasal lining and indoor heating",
            "Local injury or forceful nose blowing",
            "Allergic or chronic rhinitis",
            "Blood thinners and uncontrolled high blood pressure",
          ],
        },
        close: {
          label: "Treatment",
          body: "During a bleed: firm pressure on the soft part of the nose for ten minutes, with the head tilted slightly forward. At the practice the vessel is located and treated locally. Recurrent nosebleeds need the underlying cause investigated.",
        },
      },
      {
        name: "Nasal valve",
        what: "The narrowest point of the entire airway lies a few millimetres inside the nostrils. When the support there is weak, the area collapses on breathing in and the nose closes at exactly the moment it needs to open.",
        list: {
          label: "Symptoms",
          items: [
            "A blocked feeling with a clear, uncongested nose",
            "Relief when the cheek is gently pulled outwards",
            "Marked difficulty breathing during exercise",
            "Little or no response to decongestants",
          ],
        },
        close: {
          label: "Treatment",
          body: "Correction is surgical and relies on cartilage grafts that support the valve. It is part of functional rhinoplasty, because it changes the support and the outline of the nose at the same time.",
        },
      },
    ],
  },
  {
    slug: "afti",
    title: "Ear",
    lead: "Hearing, pain and vertigo are assessed together, not separately.",
    items: [
      {
        name: "Ear infections (otitis)",
        what: "Inflammation of the outer ear canal or of the middle ear. Otitis externa is linked to moisture and local injury, while otitis media usually follows an upper respiratory infection.",
        list: {
          label: "Symptoms",
          items: [
            "Pain that worsens with pressure or chewing",
            "A blocked feeling and reduced hearing",
            "Discharge from the ear canal",
            "Fever and irritability, mainly in children",
          ],
        },
        close: {
          label: "Treatment",
          body: "Otoscopy and, where needed, a tympanogram distinguish the two forms, because their treatment differs. This is followed by cleaning of the canal and local or systemic treatment depending on the findings.",
        },
      },
      {
        name: "Eustachian tube dysfunction",
        what: "The Eustachian tube connects the middle ear to the nasopharynx and equalises pressure every time we swallow. When it does not open properly, the pressure behind the eardrum drops and the ear is cut off from the outside world.",
        list: {
          label: "Symptoms",
          items: [
            "An ear that feels permanently blocked",
            "Clicking and popping when swallowing",
            "Pain when flying or diving",
            "Your own voice echoing inside your head",
          ],
        },
        close: {
          label: "Treatment",
          body: "It almost always starts with the nose: untreated allergy, rhinitis or adenoids. In persistent cases a ventilation tube or balloon dilation of the Eustachian tube is considered.",
        },
      },
      {
        name: "Earwax impaction",
        what: "Earwax is a normal secretion that protects the ear canal and clears on its own. It builds up when that clearing is obstructed — most often by cotton buds, hearing aids or earplugs.",
        list: {
          label: "Symptoms",
          items: [
            "Sudden hearing loss, often after a shower",
            "A feeling of fullness and heaviness",
            "Ringing or mild dizziness",
            "Mild pain when the plug presses on the eardrum",
          ],
        },
        close: {
          label: "Treatment",
          body: "Removal under direct vision at the practice, so the eardrum is protected. Cotton buds push the wax deeper and are the most common cause of the problem, not its solution.",
        },
      },
      {
        name: "Benign paroxysmal positional vertigo (BPPV)",
        what: "Tiny calcium crystals move out of place into one of the semicircular canals of the inner ear. Every change in head position moves them, and the balance system sends a false signal of motion.",
        list: {
          label: "Symptoms",
          items: [
            "Intense vertigo lasting seconds",
            "Triggered by turning over in bed or bending down",
            "Nausea after the episode",
            "No change in hearing",
          ],
        },
        close: {
          label: "Treatment",
          body: "The diagnosis is confirmed with positional tests at the practice. Repositioning manoeuvres return the crystals to their place and often bring relief within the same visit; medication on its own does not address the cause.",
        },
      },
      {
        name: "Ménière's disease",
        what: "A disorder of the inner ear attributed to increased pressure of the endolymphatic fluid. It occurs in attacks, with symptom-free periods between them, and usually affects one ear.",
        list: {
          label: "Symptoms",
          items: [
            "Attacks of vertigo lasting from twenty minutes to hours",
            "Fluctuating hearing loss, mainly in the low frequencies",
            "Tinnitus that worsens before an attack",
            "A feeling of fullness in the affected ear",
          ],
        },
        close: {
          label: "Treatment",
          body: "The aim is fewer and milder attacks: reducing sodium, managing triggers and medication, with regular audiograms to monitor hearing. For resistant forms there are stepwise treatment options.",
        },
      },
    ],
  },
  {
    slug: "traxilos",
    title: "Pharynx, larynx and neck",
    lead: "Voice, swallowing and neck lumps in a single assessment.",
    items: [
      {
        name: "Tonsillitis and sore throat",
        what: "Inflammation of the palatine tonsils, viral or bacterial. Telling the two apart matters in practice, because it decides whether antibiotics are needed or not.",
        list: {
          label: "Symptoms",
          items: [
            "Severe sore throat and painful swallowing",
            "Fever and exhaustion",
            "Exudate on the tonsils",
            "Tender lymph nodes in the neck",
          ],
        },
        close: {
          label: "Treatment",
          body: "Targeted treatment after clinical assessment. Tonsillectomy is discussed when episodes recur frequently over the year or when the size of the tonsils obstructs breathing during sleep.",
        },
      },
      {
        name: "Neck lumps",
        what: "A palpable mass in the neck that may come from a lymph node, a salivary gland, the thyroid or a congenital cyst. Most are benign, but they cannot be told apart by touch alone.",
        list: {
          label: "When it needs checking",
          items: [
            "A lump that persists for more than three weeks",
            "A painless, hard or fixed mass",
            "Steady increase in size",
            "Accompanying hoarseness, difficulty swallowing or weight loss",
          ],
        },
        close: {
          label: "Treatment",
          body: "Clinical examination, ultrasound and endoscopy of the upper aerodigestive tract to find where it starts. Depending on the findings, this is followed by monitoring, a needle biopsy or referral.",
        },
      },
      {
        name: "Vocal cord disorders",
        what: "Nodules, polyps, cysts or paresis alter the vibration of the vocal cords. They result from voice strain, chronic irritation, smoking or reflux, and particularly affect people who use their voice professionally.",
        list: {
          label: "Symptoms",
          items: [
            "Persistent hoarseness",
            "A voice that tires quickly during the day",
            "Reduced vocal range",
            "A foreign-body feeling and the need to clear the throat",
          ],
        },
        close: {
          label: "Treatment",
          body: "Laryngeal endoscopy shows the lesion in motion. Many forms settle with vocal hygiene, speech therapy and treatment of reflux; the rest are treated with microsurgery of the vocal cords.",
        },
      },
      {
        name: "Laryngopharyngeal reflux",
        what: "Stomach contents reach high up, into the pharynx and the larynx, and irritate a lining that has no defence against them. Typically it may come with no heartburn at all, which is why it is often put down to other causes.",
        list: {
          label: "Symptoms",
          items: [
            "Hoarseness, mainly in the morning",
            "A lump-in-the-throat feeling",
            "Dry cough and constant throat clearing",
            "A feeling of mucus that will not clear",
          ],
        },
        close: {
          label: "Treatment",
          body: "Endoscopy confirms the laryngeal signs. This is followed by dietary advice, avoiding late dinners, raising the head of the bed and, where indicated, medication for a set period.",
        },
      },
      {
        name: "Hoarseness",
        what: "It is not a diagnosis but a symptom, and its possible causes range from simple laryngitis to a lesion that needs prompt investigation. What matters is not how hoarse the voice is but how long it has lasted.",
        list: {
          label: "When endoscopy is needed",
          items: [
            "Hoarseness lasting more than three weeks",
            "Smokers, at any duration",
            "Accompanying difficulty swallowing or ear pain",
            "Professional use of the voice",
          ],
        },
        close: {
          label: "Treatment",
          body: "The cause is first established with laryngeal endoscopy, and then that cause is treated. Empirical treatment without anyone having looked at the vocal cords delays the diagnosis.",
        },
      },
    ],
  },
  {
    slug: "paido-orl",
    title: "Paediatric ENT",
    lead: "The three conditions that bring most children to the practice.",
    items: [
      {
        name: "Enlarged adenoids",
        what: "The adenoids are lymphoid tissue in the nasopharynx, behind the nose. They grow naturally in childhood, but when the enlargement becomes obstructive they block the nasal airway and the opening of the Eustachian tube.",
        list: {
          label: "Symptoms",
          items: [
            "Mouth breathing, day and night",
            "Snoring and restless sleep",
            "A nasal voice",
            "Recurrent ear infections and glue ear",
          ],
        },
        close: {
          label: "Treatment",
          body: "Endoscopy shows the degree of obstruction without radiation. Adenoidectomy is indicated for obstructive symptoms and recurrent ear infections, and is often done together with the insertion of ventilation tubes.",
        },
      },
      {
        name: "Enlarged tonsils",
        what: "Enlarged tonsils can narrow the pharynx enough to disturb breathing during sleep — a problem separate from how often they become inflamed.",
        list: {
          label: "Symptoms",
          items: [
            "Snoring with pauses in breathing",
            "Difficulty swallowing solid food",
            "Night sweats and unusual sleeping positions",
            "Daytime tiredness, irritability or poor concentration",
          ],
        },
        close: {
          label: "Treatment",
          body: "In mild forms monitoring is enough. When there is obstructive sleep apnoea, partial or complete removal is considered; the decision rests on how the child breathes during sleep, not on size alone.",
        },
      },
      {
        name: "Glue ear (otitis media with effusion)",
        what: "Fluid becomes trapped behind the eardrum without an active infection. Because it does not hurt, it often goes unnoticed and is found when parents realise the child is not hearing well.",
        list: {
          label: "Symptoms",
          items: [
            "The child asks for things to be repeated or turns the TV up",
            "Reduced attention in class",
            "Delayed or unclear speech",
            "No pain and no fever",
          ],
        },
        close: {
          label: "Treatment",
          body: "A tympanogram and an audiogram confirm the fluid and its effect on hearing. It often clears on its own, so a period of monitoring follows; if it persists and hearing remains reduced, ventilation tubes are inserted.",
        },
      },
    ],
  },
];

export const facialSurgery = {
  title: "Facial Plastic Surgery",
  lead: "The anatomy of the nose and face, handled by a surgeon who knows it functionally, not only aesthetically.",
  items: [
    {
      name: "Rhinoplasty",
      note: "Shape and breathing are addressed in the same operation.",
      what: "The nose is both the centre of the face and the start of the airway. Functional rhinoplasty addresses the two together: it refines the outline while restoring the support of the septum and the nasal valve, so that the result also breathes.",
      list: {
        label: "What it addresses",
        items: [
          "A hump or asymmetry of the bridge",
          "A drooping or wide tip",
          "A deviated septum and blockage",
          "Nasal valve insufficiency",
        ],
      },
      close: {
        label: "The process",
        body: "It is preceded by an endoscopic examination and a discussion of what is achievable given your own anatomy. The operation is performed under general anaesthesia; the initial swelling settles within about two weeks, while the nose takes months to reach its final shape.",
      },
    },
    {
      name: "Blepharoplasty",
      note: "Rejuvenation of the upper and lower eyelids.",
      what: "Over time the eyelid skin loosens and the fat around the eye shifts. In the upper lids this gives a heavy look and, in marked cases, limits the field of vision; in the lower lids it appears as bags.",
      list: {
        label: "What it addresses",
        items: [
          "Excess skin on the upper eyelids",
          "A field of vision narrowed by the loosening",
          "Bags under the eyes",
          "A persistently tired look",
        ],
      },
      close: {
        label: "The process",
        body: "It is usually performed under local anaesthesia with sedation. The incisions follow the natural crease of the eyelid or its inner surface, so they are not visible. Bruising usually settles within ten to fourteen days.",
      },
    },
    {
      name: "Prominent ears (otoplasty)",
      note: "Correcting the projection of the ears, in children and adults.",
      what: "The ears stand out when the natural fold of the cartilage has not formed sufficiently or when the bowl of the ear is too deep. It is an anatomical variation, not a disease, and the correction concerns the structure of the cartilage itself.",
      list: {
        label: "Good to know",
        items: [
          "The ear has nearly finished growing after the age of six",
          "The operation is performed in children and adults",
          "The incision is hidden on the back of the ear",
          "In children it is preferably done before school age",
        ],
      },
      close: {
        label: "The process",
        body: "Local anaesthesia in adults, general anaesthesia in young children. A protective dressing follows for a few days, and contact sports are avoided for a few weeks.",
      },
    },
    {
      name: "Excision of skin lesions",
      note: "Removal of lesions on the skin of the nose and ears.",
      what: "The nose and the ears receive the most sun exposure on the face and are among the most common sites of skin lesions. They are also areas of thin skin over cartilage, where the reconstruction after excision matters as much as the excision itself.",
      list: {
        label: "When a lesion should be checked",
        items: [
          "It changes shape, colour or size",
          "It bleeds or ulcerates and does not heal",
          "It appeared recently on a sun-exposed area",
          "It recurs in the same place",
        ],
      },
      close: {
        label: "The process",
        body: "The excision is performed under local anaesthesia and the specimen is sent for histological examination. The closure is planned along the skin's tension lines, so that the scar falls where the face hides it.",
      },
    },
  ],
} as const;

export const medicalNote =
  "The information on this page is general and for information only. It does not replace a medical examination, a diagnosis or individual advice.";

export const international = [
  {
    year: "January 2026",
    title: "Clinical attachment in Head and Neck Surgery",
    place: "Sant'Anna Hospital, Como, Italy",
    note: "Department of Otorhinolaryngology, under Prof. P. Battaglia and Prof. Castelnuovo.",
  },
  {
    year: "December 2025",
    title: "Volunteer doctor",
    place: "Flying Doctors mission",
    note: null,
  },
  {
    year: "2024",
    title: "EAFPS Istanbul",
    place: "Istanbul, Turkey",
    note: "Talk on facial feminisation surgery.",
  },
  {
    year: "2024",
    title: "1st RHINOEDU course in FESS and Skull Base Surgery",
    place: "Lake Como, Italy",
    note: "Endoscopic sinus and skull base surgery.",
  },
  {
    year: "2023",
    title: "EAFPS Verona",
    place: "Verona, Italy",
    note: "Talk on facial feminisation surgery.",
  },
  {
    year: "2022",
    title: "ICOPLAST World Congress of Plastic Surgery Societies",
    place: "Lima, Peru",
    note: "Oral presentation «Laryngeal cartilage reduction in transgender patients, our experience». The paper received an award.",
  },
  {
    year: "2020",
    title: "IFFPS World Congress of Facial Plastic Surgery",
    place: "Taipei, Taiwan",
    note: null,
  },
  {
    year: "October 2018",
    title: "Clinical attachment in Palliative care and Family medicine",
    place: "Ellis Medical Center, Schenectady, New York, USA",
    note: null,
  },
] as const;

/**
 * Descriptive translations of the names she gave in Greek. They are not the
 * societies' official English titles, which she has not confirmed.
 */
export const memberships = [
  "European Society of Facial Plastic Surgery",
  "Hellenic Rhinology and Facial Plastic Surgery Society",
  "Panhellenic Society of Otorhinolaryngology",
] as const;

export const contact = {
  phone: el.contact.phone,
  email: el.contact.email,
  address: {
    street: "50 Vasilissis Sofias Avenue",
    area: "Hilton",
    city: "Athens",
    country: el.contact.address.country,
    /** Stays Greek: it is a search string for Google Maps, not display copy. */
    mapsQuery: el.contact.address.mapsQuery,
  },
  appointmentMinutes: el.contact.appointmentMinutes,
} as const;

export const hours = [
  { day: "Monday", slots: el.hours[0].slots, schemaDay: el.hours[0].schemaDay },
  { day: "Tuesday", slots: el.hours[1].slots, schemaDay: el.hours[1].schemaDay },
  { day: "Friday", slots: el.hours[2].slots, schemaDay: el.hours[2].schemaDay },
] as const;

export const ui = {
  htmlLang: "en",
  ogLocale: "en_GB",
  skipLink: "Skip to content",
  book: "Book an appointment",
  menuOpen: "Open menu",
  menuClose: "Close menu",
  switchLabel: "ΕΛ",
  switchAria: "Ελληνική έκδοση",
  callAria: "Call",
  home: "Home",
  email: "Email",
  phone: "Phone",
  address: "Address",
  hours: "Opening hours",
  social: "Social media",
  openMaps: "Open in maps",
  appointmentLength: (minutes: number) => `Each appointment lasts ${minutes} minutes.`,
  seeServices: "See the services",
  seeProcedures: "See the procedures",
  seeSpace: "See the practice",
  servicesShort: "Services",
  servicesTitle: "ENT services",
  educationTitle: "Education and postgraduate training",
  membershipsTitle: "Member of scientific societies",
  internationalTitle: "International activity",
  internationalLead: "Postgraduate training, congresses and work with centres abroad.",
  publicationsTitle: "Publications",
  publicationsLead: "Research in peer-reviewed international journals.",
  closingTitle: "Book an appointment",
  closingBody: "By phone or email, for an appointment at the practice on Vasilissis Sofias Avenue.",
  homeDoctorEyebrow: "The doctor",
  homeServicesBody: "Nose, ear, pharynx, larynx and neck, paediatric ENT, with the diagnostic work-up completed at the practice.",
  homePracticeTitle: "The practice",
  alt: {
    portrait: "Natalia Fourla, portrait on a neutral background",
    surgery: "Natalia Fourla in the operating theatre, at a surgical microscope",
    operating: "Natalia Fourla in the operating theatre, in surgical scrubs and a mask",
    pediatric: "Natalia Fourla examining a child's ear with an otoscope",
    room: "A quiet examination room in natural light, with an armchair and a wooden side table",
    avenue: "A central avenue in Athens at night, with lit trees and wet asphalt",
  },
  notFound: {
    title: "Page not found",
    body: "The link you followed does not lead anywhere. Try one of these instead.",
  },
  meta: {
    titleDefault: "Natalia Fourla MD, MSc · ENT Surgeon in Athens",
    description:
      "ENT Surgeon and Facial Plastic Surgery in Athens, 50 Vasilissis Sofias Avenue. Diagnostic tests, conditions of the nose, ear and neck, paediatric ENT, rhinoplasty and blepharoplasty.",
    keywords: [
      "ENT surgeon Athens",
      "otorhinolaryngologist Athens",
      "facial plastic surgery Athens",
      "rhinoplasty Athens",
      "blepharoplasty Athens",
      "endoscopic sinus surgery",
      "paediatric ENT Athens",
      "Natalia Fourla",
    ],
  },
  pages: {
    doctor: {
      title: "The doctor",
      eyebrow: "The doctor",
      crossTitle: "ENT services",
      crossBody:
        "Nose, ear, pharynx, larynx and neck, paediatric ENT. Each condition with what it is, its symptoms and how it is treated.",
    },
    services: {
      title: "ENT services",
      description:
        "Diagnostic tests, conditions of the nose, ear, pharynx, larynx and neck, and paediatric ENT. Audiogram, tympanogram, nasal and laryngeal endoscopy at the practice.",
      eyebrow: "Services",
      heading: "Otorhinolaryngology, from diagnosis to treatment",
      lead: "Five groups of conditions, with the diagnostic work-up completed at the practice. Choose a condition to see what it is, how it shows itself and how it is treated.",
    },
    facial: {
      description:
        "Rhinoplasty, blepharoplasty, prominent ears and excision of skin lesions of the nose and ears, by an ENT surgeon with postgraduate training in facial plastic surgery.",
      eyebrow: "Face",
      crossBody:
        "The functional side: nose, ear, pharynx, larynx and neck, with a full diagnostic work-up at the practice.",
    },
    practice: {
      title: "The practice",
      eyebrow: "Practice",
      description: (street: string, area: string, minutes: number) =>
        `The practice is at ${street}, ${area}. ${minutes}-minute appointments on Monday, Tuesday and Friday.`,
      lead: (street: string, area: string, minutes: number) =>
        `${street}, ${area}. Each appointment lasts ${minutes} minutes, so the examination is never rushed.`,
    },
    contact: {
      title: "Contact",
      eyebrow: "Contact",
      heading: "Book an appointment",
      description: (phone: string, email: string, street: string, area: string) =>
        `Appointments on ${phone} or at ${email}. ${street}, ${area}, Athens.`,
      lead: "Appointments are booked by phone or email. We will need to know the reason for your visit, so the right amount of time can be set aside.",
    },
  },
};
