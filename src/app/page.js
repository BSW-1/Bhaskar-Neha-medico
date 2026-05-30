'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import styles from './page.module.css';

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] } }) };

/* ── Counting Animation Hook ── */
function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  useEffect(() => {
    if (!isInView) return;
    const num = parseInt(target.toString().replace(/[^0-9]/g, ''), 10);
    if (isNaN(num) || num === 0) { setCount(target); return; }
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * num));
      if (progress >= 1) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);
  return { ref, count };
}

function CountStat({ target, suffix, label }) {
  const { ref, count } = useCountUp(target, 2200);
  const display = typeof target === 'number' ? `${count}${suffix}` : target;
  return (
    <motion.div ref={ref} className={styles.statItem} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
      <span className={styles.statNum}>{display}</span>
      <span className={styles.statLabel}>{label}</span>
    </motion.div>
  );
}

const STATS = [
  { target: 20, suffix: '+', label: 'Years Serving Siraha' },
  { target: 5000, suffix: '+', label: 'Products Available' },
  { target: 100, suffix: '+', label: 'Partner Pharmacies' },
  { target: 2, suffix: '', label: 'Business Divisions' },
];

const SERVICES = [
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="5" y="8" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M9 8V6a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.5"/><path d="M12 12v4M10 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>, title: 'Prescription Care', desc: 'Every prescription handled with care  -  our pharmacists verify, dispense, and guide you through your treatment.' },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 7l9-4 9 4v6c0 5.25-3.75 8.25-9 10.5C5.75 21.25 2 18.25 2 13V7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M12 10v4M10 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>, title: 'Genuine Medicines Only', desc: 'We only stock licensed, verified medicines from authorized distributors. No compromises when it comes to your health.' },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/><path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>, title: 'Open Every Day', desc: 'From early morning to late evening, 6:30 AM to 9:00 PM  -  seven days a week. Because health does not take a day off.' },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 14l4-4 4 4 4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/></svg>, title: 'Wholesale Supply', desc: 'Bulk medicines at competitive prices, delivered to pharmacies, clinics, and hospitals across the region.' },
];

export default function Home() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2; // -1 to 1
    const y = (clientY / innerHeight - 0.5) * 2; // -1 to 1
    mouseX.set(x);
    mouseY.set(y);
  };

  const rotateX = useTransform(mouseY, [-1, 1], [15, -15]);
  const rotateY = useTransform(mouseX, [-1, 1], [-15, 15]);
  const translateX = useTransform(mouseX, [-1, 1], [-20, 20]);
  const translateY = useTransform(mouseY, [-1, 1], [-20, 20]);

  return (
    <div onMouseMove={handleMouseMove}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <motion.div className={styles.heroContent} initial="hidden" animate="visible">
            <motion.span className={styles.heroLabel} variants={fadeUp}>Mirchaiya-02, Siraha, Nepal</motion.span>
            <motion.h1 className={styles.heroTitle} variants={fadeUp} custom={1}>
              The pharmacy your <span className="gradient-text">family trusts</span>
            </motion.h1>
            <motion.p className={styles.heroDesc} variants={fadeUp} custom={2}>
              For over twenty years, families in Mirchaiya have walked through our doors knowing they will find the right medicine, honest advice, and a friendly face. That is the promise of Bhaskar & Neha Medico.
            </motion.p>
            <motion.div className={styles.heroCtas} variants={fadeUp} custom={3}>
              <Link href="/bhaskar-medico" className="btn-primary">Visit Retail</Link>
              <Link href="/neha-medico" className="btn-outline">Wholesale Inquiry</Link>
            </motion.div>
          </motion.div>

          <motion.div 
            className={styles.heroGraphics} 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ perspective: 1200 }}
          >
            <motion.div 
              className={styles.abstractGraphic}
              style={{ rotateX, rotateY, x: translateX, y: translateY }}
            >
              <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="200" cy="200" r="160" fill="url(#heroGrad1)" opacity="0.1" />
                <path d="M120 280 L200 120 L280 280 Z" stroke="url(#heroGrad2)" strokeWidth="2" fill="url(#heroGrad2)" fillOpacity="0.05" strokeLinejoin="round"/>
                <rect x="180" y="160" width="40" height="40" rx="8" stroke="var(--brand-400)" strokeWidth="3" opacity="0.6"/>
                <circle cx="280" cy="140" r="8" fill="var(--teal-400)" />
                <circle cx="100" cy="220" r="4" fill="var(--brand-300)" />
                <defs>
                  <linearGradient id="heroGrad1" x1="0" y1="0" x2="400" y2="400">
                    <stop stopColor="var(--brand-500)"/>
                    <stop offset="1" stopColor="var(--teal-400)"/>
                  </linearGradient>
                  <linearGradient id="heroGrad2" x1="200" y1="120" x2="200" y2="280">
                    <stop stopColor="var(--teal-300)"/>
                    <stop offset="1" stopColor="var(--brand-600)"/>
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
            
            <div className={styles.heroCardsWrapper}>
              <Link href="/bhaskar-medico" className={styles.branchCard}>
              <div className={styles.branchLetter}>B</div>
              <div>
                <h3 className={styles.branchName}>Bhaskar Medico</h3>
                <span className={styles.branchType}>Retail Pharmacy</span>
                <p className={styles.branchDesc}>Walk in for prescriptions, over-the-counter medicines, vitamins, personal care, and everyday health needs. Our pharmacists are always ready to help.</p>
              </div>
              <span className={styles.branchArrow}>&rarr;</span>
            </Link>
            <Link href="/neha-medico" className={styles.branchCard}>
              <div className={`${styles.branchLetter} ${styles.branchLetterN}`}>N</div>
              <div>
                <h3 className={styles.branchName}>Neha Medico</h3>
                <span className={styles.branchType}>Wholesale Distribution</span>
                <p className={styles.branchDesc}>Reliable bulk supply to pharmacies, clinics, and hospitals. Competitive pricing and delivery across the district  -  just bring your PAN number to get started.</p>
              </div>
              <span className={styles.branchArrow}>&rarr;</span>
            </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats with Counting Animation */}
      <section className={styles.stats}>
        <div className="container">
          <div className={styles.statsGrid}>
            {STATS.map(s => <CountStat key={s.label} {...s} />)}
          </div>
        </div>
      </section>

      {/* Ask AI Quick Launch */}
      <section className={styles.askAi}>
        <div className="container">
          <div className={styles.aiBanner}>
            <div className={styles.aiText}>
              <span className={styles.aiLabel}>Instant Answers</span>
              <h2 className={styles.aiTitle}>Ask our <span className="gradient-text">AI Assistant</span></h2>
              <p>Got a quick question about medicines, wholesale, or our operating hours? Tap below to open the chat instantly.</p>
            </div>
            <div className={styles.aiQuestions}>
              <button className={styles.aiBtn} onClick={() => window.dispatchEvent(new CustomEvent('openChat', { detail: 'Cardiac medicines?' }))}>Cardiac medicines?</button>
              <button className={styles.aiBtn} onClick={() => window.dispatchEvent(new CustomEvent('openChat', { detail: 'Diabetes medicines?' }))}>Diabetes medicines?</button>
              <button className={styles.aiBtn} onClick={() => window.dispatchEvent(new CustomEvent('openChat', { detail: 'Ayurvedic products?' }))}>Ayurvedic products?</button>
              <button className={styles.aiBtn} onClick={() => window.dispatchEvent(new CustomEvent('openChat', { detail: 'Wholesale pricing' }))}>Wholesale pricing</button>
              <button className={styles.aiBtn} onClick={() => window.dispatchEvent(new CustomEvent('openChat', { detail: 'Baby care products?' }))}>Baby care products?</button>
              <button className={styles.aiBtn} onClick={() => window.dispatchEvent(new CustomEvent('openChat', { detail: 'Store hours' }))}>Store hours</button>
              <button className={styles.aiBtn} onClick={() => window.dispatchEvent(new CustomEvent('openChat', { detail: 'Where are you located?' }))}>Where are you located?</button>
            </div>
          </div>
        </div>
      </section>


      {/* Services */}
      <section className={`section ${styles.services}`}>
        <div className="container">
          <motion.div className={styles.sectionHead} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.span className="section-label" variants={fadeUp}>What We Do</motion.span>
            <motion.h2 className="section-title" variants={fadeUp} custom={1}>Healthcare that <span className="gradient-text">cares back</span></motion.h2>
            <motion.p className="section-desc" variants={fadeUp} custom={2}>From a single tablet to a truckload of supplies  -  we have been here for every need, big and small.</motion.p>
          </motion.div>
          <div className={styles.servicesGrid}>
            {SERVICES.map((s, i) => (
              <motion.div key={s.title} className={styles.serviceCard} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: i * 0.08 }} whileHover={{ y: -3 }}>
                <div className={styles.serviceIcon}>{s.icon}</div>
                <h3 className={styles.serviceTitle}>{s.title}</h3>
                <p className={styles.serviceDesc}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`section ${styles.cta}`}>
        <div className="container">
          <motion.div className={styles.ctaCard} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>We are just a phone call away</h2>
              <p className={styles.ctaDesc}>Whether it is a late-night fever or a wholesale partnership inquiry, pick up the phone  -  we will be there.</p>
              <div className={styles.ctaActions}>
                <a href="tel:+9779811711199" className="btn-primary">Call Retail: 9811711199</a>
                <a href="tel:+9779842845688" className="btn-outline">Wholesale: 9842845688</a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
