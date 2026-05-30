'use client';
import { motion } from 'framer-motion';
import styles from './page.module.css';
const f = { hidden: { opacity: 0, y: 24 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] } }) };
const TL = [
  { yr: '2000s', t: 'Where It All Began', d: 'Mr. Ghanshyam Sah opened a small pharmacy in Mirchaiya with one simple belief: every person deserves access to genuine medicines and honest advice.' },
  { yr: '2010s', t: 'Growing Together', d: 'As families kept coming back, we knew we could do more. Neha Medico was born to supply medicines to other pharmacies, clinics, and hospitals who shared our values.' },
  { yr: '2020s', t: 'A Name People Trust', d: 'Today, over 150+ partner pharmacies rely on us. More than 5,000 products line our shelves. But what matters most is still the same: the trust of every person who walks through our door.' },
  { yr: 'Today', t: 'Looking Ahead', d: 'We are bringing our pharmacy into the digital age, not because it is trendy, but because it helps us serve you better, even when you cannot visit in person.' },
];
const VALS = [
  { t: 'Quality Without Compromise', d: 'We only stock medicines from authorized, licensed distributors. Your health is not something we take chances with.' },
  { t: 'Built on Trust', d: 'Twenty years of keeping promises, to families, to doctors, to the pharmacies who depend on us. That trust is everything to us.' },
  { t: 'Healthcare for Everyone', d: 'Good medicine should not be a luxury. We keep our prices fair so that every family in Mirchaiya can afford the care they need.' },
  { t: 'Always Learning', d: 'From new medicines to better ways of serving you, we never stop learning, because healthcare never stops evolving.' },
];
export default function About() {
  return (
    <>
      <section className={styles.hero}><div className="container">
        <motion.span className={styles.badge} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>About Us</motion.span>
        <motion.h1 className={styles.title} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>A Family Business, <span className="gradient-text">Built on Care</span></motion.h1>
        <motion.p className={styles.subtitle} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.45 }}>Some businesses start with a plan. Ours started with a vision to give this community access to genuine medicines and honest advice. Twenty years later, that has not changed.</motion.p>
      </div></section>

      <section className={`section ${styles.leaders}`}><div className="container">
        <motion.div className={styles.sHead} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.span className="section-label" variants={f}>Leadership</motion.span>
          <motion.h2 className="section-title" variants={f} custom={1}>Meet Our <span className="gradient-text">Team</span></motion.h2>
        </motion.div>
        <div className={styles.leaderGrid}>
          <motion.div className={`${styles.leaderCard} ${styles.featured}`} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className={styles.avatarLg}>GS</div><h3 className={styles.lName}>Mr. Ghanshyam Sah</h3><span className={styles.lRole}>Founder & CEO</span>
            <p className={styles.lBio}>Visionary founder who established Bhaskar & Neha Medico and grew it into the region&apos;s most trusted pharmaceutical group.</p>
            <a href="tel:+9779816798987" className={styles.lPhone}>9816798987</a>
          </motion.div>
          <motion.div className={styles.leaderCard} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <div className={styles.avatarSm}>TS</div><h3 className={styles.lName}>Tara Devi Sah</h3><span className={styles.lRole}>Supervisor, Bhaskar Medico</span>
            <p className={styles.lBio}>Overseeing daily retail operations, ensuring quality service for every customer.</p>
          </motion.div>
          <motion.div className={styles.leaderCard} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <div className={styles.avatarSm}>RS</div><h3 className={styles.lName}>RajKumar Sah</h3><span className={styles.lRole}>Manager, Neha Medico</span>
            <p className={styles.lBio}>Managing wholesale distribution and partner relationships across the region.</p>
            <a href="tel:+9779829786509" className={styles.lPhone}>9829786509</a>
          </motion.div>
        </div>
      </div></section>

      <section className={`section ${styles.timeline}`}><div className="container">
        <motion.div className={styles.sHead} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.span className="section-label" variants={f}>Our Journey</motion.span>
          <motion.h2 className="section-title" variants={f} custom={1}>Milestones</motion.h2>
        </motion.div>
        <div className={styles.tlTrack}>{TL.map((item, i) => (
          <motion.div key={item.yr} className={styles.tlItem} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}>
            <div className={styles.tlDot} /><div className={styles.tlCard}><span className={styles.tlYr}>{item.yr}</span><h3 className={styles.tlT}>{item.t}</h3><p className={styles.tlD}>{item.d}</p></div>
          </motion.div>
        ))}</div>
      </div></section>

      <section className={`section ${styles.values}`}><div className="container">
        <motion.div className={styles.sHead} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.span className="section-label" variants={f}>Our Values</motion.span>
          <motion.h2 className="section-title" variants={f} custom={1}>What Drives <span className="gradient-text">Us</span></motion.h2>
        </motion.div>
        <div className={styles.valGrid}>{VALS.map((v, i) => (
          <motion.div key={v.t} className={styles.valCard} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }} whileHover={{ y: -3 }}>
            <h3 className={styles.valT}>{v.t}</h3><p className={styles.valD}>{v.d}</p>
          </motion.div>
        ))}</div>
      </div></section>
    </>
  );
}
