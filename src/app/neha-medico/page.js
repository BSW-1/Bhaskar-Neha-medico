'use client';

import { motion } from 'framer-motion';
import styles from './page.module.css';

const f = { hidden: { opacity: 0, y: 24 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] } }) };

const PhoneIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6.5 1.5H3.5C2.67 1.5 2 2.17 2 3V4C2 9.52 6.48 14 12 14H13C13.83 14 14.5 13.33 14.5 12.5V10.5L11.5 9L10 10.5C8.38 9.5 6.5 7.62 5.5 6L7 4.5L5.5 1.5H6.5Z" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/></svg>;

const WHO_WE_SERVE = [
  { title: 'Pharmacies', desc: 'Independent retail pharmacies across Siraha and neighbouring districts.' },
  { title: 'Hospitals & Clinics', desc: 'Healthcare facilities that need consistent, reliable medicine supply.' },
  { title: 'Health Posts', desc: 'Government and community health posts serving rural communities.' },
];

const STEPS = [
  { num: '1', title: 'Keep your PAN number ready', desc: 'A valid business PAN number is mandatory for all wholesale accounts. This is a legal requirement for pharmaceutical distribution.' },
  { num: '2', title: 'Call us directly', desc: 'Reach out to our wholesale desk at 9842845688 or 9829786509. Share your PAN details and tell us what you need.' },
  { num: '3', title: 'We handle the rest', desc: 'Our team will set up your account, confirm pricing, and arrange delivery. All further business is conducted over phone  -  no online ordering.' },
];

export default function NehaMedico() {
  return (
    <>
      <section className={styles.hero}><div className="container">
        <motion.div className={styles.badge} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <span className={styles.badgeLetter}>N</span> Wholesale Distribution
        </motion.div>
        <motion.h1 className={styles.title} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
          Neha <span className="gradient-text">Medico</span>
        </motion.h1>
        <motion.p className={styles.subtitle} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.45 }}>
          Behind every good pharmacy, there is a reliable distributor. Neha Medico has been that partner for over 150+ pharmacies and healthcare facilities across Siraha, Dhanusha, Saptari, Udayapur, Katari, and surrounding regions. We deliver on time, every time - because the people waiting for those medicines cannot afford delays.
        </motion.p>
        <motion.div className={styles.contactRow} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <a href="tel:+9779842845688" className={styles.phoneLink}><PhoneIcon /> 9842845688 (Wholesale)</a>
          <a href="tel:+9779829786509" className={styles.phoneLink}><PhoneIcon /> 977-9829786509 (Wholesale Desk)</a>
          <a href="tel:033550504" className={styles.phoneLink}><PhoneIcon /> 033-550-504 (Landline)</a>
        </motion.div>
        <motion.span className={styles.hours} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>Open daily: 6:30 AM  -  9:00 PM</motion.span>
      </div></section>

      {/* How to Order  -  PAN Process */}
      <section className={`section ${styles.process}`}><div className="container">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.span className="section-label" variants={f}>How to Get Started</motion.span>
          <motion.h2 className="section-title" variants={f} custom={1}>Three simple steps to <span className="gradient-text">place a wholesale order</span></motion.h2>
          <motion.p className="section-desc" variants={f} custom={2}>We keep things straightforward  -  no complicated forms, no online portals. Just a phone call is all it takes.</motion.p>
        </motion.div>
        <div className={styles.stepsGrid}>
          {STEPS.map((step, i) => (
            <motion.div key={step.num} className={styles.stepCard} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <div className={styles.stepNum}>{step.num}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div></section>

      {/* Who We Serve */}
      <section className={`section ${styles.serve}`}><div className="container">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.span className="section-label" variants={f}>Who We Serve</motion.span>
          <motion.h2 className="section-title" variants={f} custom={1}>Built for <span className="gradient-text">healthcare businesses</span></motion.h2>
        </motion.div>
        <div className={styles.serveGrid}>
          {WHO_WE_SERVE.map((item, i) => (
            <motion.div key={item.title} className={styles.serveCard} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}>
              <h3 className={styles.serveTitle}>{item.title}</h3>
              <p className={styles.serveDesc}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div></section>


    </>
  );
}
