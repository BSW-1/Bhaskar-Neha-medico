'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './page.module.css';

const f = { hidden: { opacity: 0, y: 24 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] } }) };

/* SVG Icons */
const HeartIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 21C12 21 3 14 3 8.5C3 5.42 5.42 3 8.5 3C10.24 3 11.91 3.81 12 5C12.09 3.81 13.76 3 15.5 3C18.58 3 21 5.42 21 8.5C21 14 12 21 12 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>;
const LeafIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8.17 20C12.39 20 15.53 17.5 17 14C20 7 17 2 17 2C17 2 14 5.5 12 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const BandageIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="8" width="18" height="8" rx="4" stroke="currentColor" strokeWidth="1.5"/><circle cx="10" cy="12" r="1" fill="currentColor"/><circle cx="14" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="10" r="1" fill="currentColor"/><circle cx="12" cy="14" r="1" fill="currentColor"/></svg>;
const PillIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M8.5 2C5.46 2 3 4.46 3 7.5V16.5C3 19.54 5.46 22 8.5 22H15.5C18.54 22 21 19.54 21 16.5V7.5C21 4.46 18.54 2 15.5 2H8.5Z" stroke="currentColor" strokeWidth="1.5"/><path d="M3 12H21" stroke="currentColor" strokeWidth="1.5"/></svg>;
const BabyIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/><circle cx="9" cy="10" r="1" fill="currentColor"/><circle cx="15" cy="10" r="1" fill="currentColor"/><path d="M9 15C9 15 10.5 17 12 17C13.5 17 15 15 15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
const PhoneIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6.5 1.5H3.5C2.67 1.5 2 2.17 2 3V4C2 9.52 6.48 14 12 14H13C13.83 14 14.5 13.33 14.5 12.5V10.5L11.5 9L10 10.5C8.38 9.5 6.5 7.62 5.5 6L7 4.5L5.5 1.5H6.5Z" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/></svg>;

const CATEGORIES = [
  {
    icon: <HeartIcon />, title: 'Cardiac & Diabetes Care',
    desc: 'Medicines for the heart conditions and blood sugar management that matter most to your family.',
    items: ['Blood pressure tablets (Amlodipine, Losartan, Telmisartan)', 'Cholesterol management (Atorvastatin, Rosuvastatin)', 'Heart care (Ecosprin, Clopidogrel, Metoprolol)', 'Diabetes medicines (Metformin, Glimepiride, Voglibose)', 'Insulin (Lantus, Mixtard, Actrapid)', 'Blood glucose monitors and strips', 'BP monitoring devices']
  },
  {
    icon: <LeafIcon />, title: 'Ayurvedic & Herbal Medicines',
    desc: 'Traditional remedies that generations have trusted  -  from Ashwagandha to Chyawanprash.',
    items: ['Himalaya Healthcare range', 'Dabur products', 'Baidyanath preparations', 'Ashwagandha, Shatavari, Brahmi', 'Chyawanprash and immunity boosters', 'Triphala and digestive wellness', 'Tulsi, Giloy, and Amla extracts']
  },
  {
    icon: <BandageIcon />, title: 'Minor Surgical & First Aid',
    desc: 'Essential supplies for everyday injuries, wound care, and basic medical needs at home.',
    items: ['Bandages, gauze, and cotton rolls', 'Wound dressing and antiseptic solutions', 'Crepe bandages and elastic supports', 'Knee, ankle, and wrist braces', 'Surgical gloves and masks', 'Basic first-aid kits']
  },
  {
    icon: <PillIcon />, title: 'Daily Life Diseases & OTC',
    desc: 'Common medicines for everyday illnesses you can pick up without a prescription.',
    items: ['Fever and pain relief (Paracetamol, Ibuprofen)', 'Cold, cough, and flu (Sinarest, D-Cold, syrups)', 'Allergy care (Cetrizine, Montair-LC)', 'Antacids, gas, and digestive aids', 'Vitamins and mineral supplements', 'Skin and personal care', 'Oral rehydration and electrolytes']
  },
  {
    icon: <BabyIcon />, title: 'Mother & Baby Care',
    desc: 'Gentle products for the little ones and the mothers who care for them.',
    items: ['Baby formula and nutrition', 'Prenatal and postnatal vitamins', 'Diapers and baby hygiene', 'Baby skin care and lotions', 'Feeding accessories', 'Mother care essentials']
  },
];

export default function BhaskarMedico() {
  return (
    <>
      <section className={styles.hero}><div className="container">
        <motion.div className={styles.badge} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <span className={styles.badgeLetter}>B</span> Retail Pharmacy
        </motion.div>
        <motion.h1 className={styles.title} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
          Bhaskar <span className="gradient-text">Medico</span>
        </motion.h1>
        <motion.p className={styles.subtitle} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.45 }}>
          When someone in your family is not feeling well, you do not want to worry about whether the pharmacy has the right medicine. At Bhaskar Medico, we make sure you never have to. Walk in, tell us what you need, and we will take care of the rest.
        </motion.p>
        <motion.div className={styles.contactRow} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <a href="tel:+9779811711199" className={styles.phoneLink}><PhoneIcon /> 9811711199</a>
          <span className={styles.hours}>Open daily: 6:30 AM  -  9:00 PM</span>
        </motion.div>
      </div></section>

      <section className={`section ${styles.categories}`}><div className="container">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.span className="section-label" variants={f}>Our Medicine Categories</motion.span>
          <motion.h2 className="section-title" variants={f} custom={1}>Everything your family needs, <span className="gradient-text">under one roof</span></motion.h2>
          <motion.p className="section-desc" variants={f} custom={2}>Walk in with a prescription or just a question  -  our pharmacists will guide you to exactly what you need.</motion.p>
        </motion.div>
        <div className={styles.catGrid}>
          {CATEGORIES.map((cat, i) => (
            <motion.div key={cat.title} className={styles.catCard} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }}>
              <div className={styles.catIcon}>{cat.icon}</div>
              <h3 className={styles.catTitle}>{cat.title}</h3>
              <p className={styles.catDesc}>{cat.desc}</p>
              <ul className={styles.catList}>
                {cat.items.map(item => <li key={item} className={styles.catItem}>{item}</li>)}
              </ul>
            </motion.div>
          ))}
        </div>
      </div></section>

      <section className={`section ${styles.note}`}><div className="container">
        <motion.div className={styles.noteCard} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h3 className={styles.noteTitle}>A few things to know</h3>
          <ul className={styles.noteList}>
            <li>We are a walk-in pharmacy. No home delivery for retail purchases.</li>
            <li>Prescription medicines require a valid prescription from your doctor.</li>
            <li>Our pharmacists are happy to answer questions about your medicines.</li>
            <li>We do not stock major surgical equipment, only minor surgical and first-aid supplies.</li>
            <li>Cannot find a medicine anywhere? Let us know. We source hard-to-find medicines and have them ready for you within 1 to 3 working days.</li>
          </ul>
        </motion.div>
      </div></section>
    </>
  );
}
