'use client';
import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './page.module.css';

const f = { hidden: { opacity: 0, y: 24 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] } }) };
const PhoneIcon = () => <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M8 1.5H5C3.9 1.5 3 2.4 3 3.5V5C3 11.6 8.4 17 15 17H16.5C17.6 17 18.5 16.1 18.5 15V13L15 11.2L13.2 13.2C11.2 12 8 8.8 6.8 6.8L8.8 5L7 1.5H8Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const TelephoneIcon = () => <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><rect x="4" y="2" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="1.2"/><path d="M7 5H13M7 7H13" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/><circle cx="10" cy="14" r="2" stroke="currentColor" strokeWidth="1.2"/><path d="M8 14H12" stroke="currentColor" strokeWidth="0.8"/></svg>;
const PinIcon = () => <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M10 2C6.7 2 4 4.7 4 8C4 12.5 10 18 10 18S16 12.5 16 8C16 4.7 13.3 2 10 2Z" stroke="currentColor" strokeWidth="1.2"/><circle cx="10" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.2"/></svg>;
const ClockIcon = () => <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.2"/><path d="M10 5V10L13 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const CheckIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/><path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const MailIcon = () => <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.2"/><path d="M2 6L10 11L18 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;

function san(v) { return v.replace(/<[^>]*>/g, '').trim(); }

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', branch: '', subject: '', message: '' });
  const [st, setSt] = useState('idle');
  const [err, setErr] = useState({});
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  function val() { const e = {}; if (!form.name.trim()) e.name = 'Required'; if (!form.phone.trim()) e.phone = 'Required'; if (!form.message.trim()) e.message = 'Required'; return e; }
  function ch(e) { const { name, value } = e.target; setForm(p => ({ ...p, [name]: san(value) })); if (err[name]) setErr(p => { const n = { ...p }; delete n[name]; return n; }); }
  function sub(e) { e.preventDefault(); const er = val(); if (Object.keys(er).length) { setErr(er); return; } setSt('sending'); setTimeout(() => { setSt('sent'); setForm({ name: '', phone: '', email: '', branch: '', subject: '', message: '' }); setErr({}); }, 1200); }

  return (
    <>
      {/* Hero */}
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.heroDecor}>
          <div className={styles.decorCircle1} />
          <div className={styles.decorCircle2} />
          <div className={styles.decorLine} />
        </div>
        <div className="container">
          <motion.span className={styles.badge} initial={{ opacity: 0, scale: 0.9 }} animate={heroInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.15 }}>Get In Touch</motion.span>
          <motion.h1 className={styles.title} initial={{ opacity: 0, y: 40 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.25 }}>We are always <span className="gradient-text">here for you</span></motion.h1>
          <motion.p className={styles.subtitle} initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.4 }}>Have a question about a medicine? Need to place a wholesale order? Or simply want to say hello? Reach out anytime.</motion.p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className={`section ${styles.cardsSec}`}><div className="container">
        <div className={styles.cardsGrid}>
          <motion.div className={styles.infoCard} initial="hidden" animate="visible" variants={f} custom={0} whileHover={{ y: -4 }}>
            <div className={styles.cardIcon}><PhoneIcon /></div>
            <h3 className={styles.cardTitle}>Retail Pharmacy</h3>
            <span className={styles.cardLabel}>Bhaskar Medico</span>
            <a href="tel:+9779811711199" className={styles.cardLink}>9811711199</a>
          </motion.div>

          <motion.div className={styles.infoCard} initial="hidden" animate="visible" variants={f} custom={1} whileHover={{ y: -4 }}>
            <div className={styles.cardIcon}><PhoneIcon /></div>
            <h3 className={styles.cardTitle}>Wholesale</h3>
            <span className={styles.cardLabel}>Neha Medico</span>
            <a href="tel:+9779842845688" className={styles.cardLink}>9842845688</a>
            <a href="tel:+9779829786509" className={styles.cardLink}>9829786509</a>
          </motion.div>

          <motion.div className={styles.infoCard} initial="hidden" animate="visible" variants={f} custom={2} whileHover={{ y: -4 }}>
            <div className={styles.cardIcon}><TelephoneIcon /></div>
            <h3 className={styles.cardTitle}>Telephone</h3>
            <span className={styles.cardLabel}>Landline</span>
            <a href="tel:033550504" className={styles.cardLink}>033-550-504</a>
          </motion.div>

          <motion.div className={styles.infoCard} initial="hidden" animate="visible" variants={f} custom={3} whileHover={{ y: -4 }}>
            <div className={styles.cardIcon}><ClockIcon /></div>
            <h3 className={styles.cardTitle}>Hours</h3>
            <span className={styles.cardLabel}>Every day, including Sundays</span>
            <span className={styles.cardValue}>6:30 AM to 9:00 PM</span>
          </motion.div>

          <motion.div className={styles.infoCard} initial="hidden" animate="visible" variants={f} custom={4} whileHover={{ y: -4 }}>
            <div className={styles.cardIcon}><PinIcon /></div>
            <h3 className={styles.cardTitle}>Location</h3>
            <span className={styles.cardLabel}>Both stores</span>
            <span className={styles.cardValue}>Mirchaiya-02, Siraha, Nepal</span>
          </motion.div>

          <motion.div className={styles.infoCard} initial="hidden" animate="visible" variants={f} custom={5} whileHover={{ y: -4 }}>
            <div className={styles.cardIcon}><PhoneIcon /></div>
            <h3 className={styles.cardTitle}>Founder</h3>
            <span className={styles.cardLabel}>Mr. Ghanshyam Sah</span>
            <a href="tel:+9779816798987" className={styles.cardLink}>9816798987</a>
          </motion.div>
        </div>
      </div></section>

      {/* Form Section */}
      <section className={`section ${styles.formSec}`}><div className="container">
        <div className={styles.formGrid}>
          <motion.div className={styles.formLeft} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="section-label">Send a Message</span>
            <h2 className="section-title">We would love to <span className="gradient-text">hear from you</span></h2>
            <p className={styles.formNote}>Fill out the form and we will get back to you within 24 hours. For urgent needs, please call us directly.</p>
            <div className={styles.formFeatures}>
              <div className={styles.feat}><MailIcon /><span>24-hour response time</span></div>
              <div className={styles.feat}><PhoneIcon /><span>Direct call for urgent queries</span></div>
              <div className={styles.feat}><PinIcon /><span>Walk-in always welcome</span></div>
            </div>
          </motion.div>

          <motion.form className={styles.form} onSubmit={sub} noValidate initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            {st === 'sent' ? (
              <div className={styles.success}>
                <motion.span className={styles.successIcon} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}><CheckIcon /></motion.span>
                <h3>Message Sent!</h3>
                <p>We will get back to you within 24 hours. Thank you for reaching out.</p>
                <button type="button" className={styles.againBtn} onClick={() => setSt('idle')}>Send Another</button>
              </div>
            ) : (<motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
              <div className={styles.fRow}>
                <motion.div className={styles.fG} variants={f}><label className={styles.fL}>Full Name *</label><motion.input name="name" whileFocus={{ scale: 1.02 }} className={`${styles.fI} ${err.name ? styles.fE : ''}`} value={form.name} onChange={ch} maxLength={80} placeholder="Your full name" /></motion.div>
                <motion.div className={styles.fG} variants={f}><label className={styles.fL}>Phone *</label><motion.input name="phone" type="tel" whileFocus={{ scale: 1.02 }} className={`${styles.fI} ${err.phone ? styles.fE : ''}`} value={form.phone} onChange={ch} maxLength={15} placeholder="Your phone number" /></motion.div>
              </div>
              <div className={styles.fRow}>
                <motion.div className={styles.fG} variants={f}><label className={styles.fL}>Email</label><motion.input name="email" type="email" whileFocus={{ scale: 1.02 }} className={styles.fI} value={form.email} onChange={ch} maxLength={100} placeholder="your@email.com" /></motion.div>
                <motion.div className={styles.fG} variants={f}><label className={styles.fL}>Branch</label><motion.select name="branch" whileFocus={{ scale: 1.02 }} className={styles.fS} value={form.branch} onChange={ch}><option value="">General</option><option value="bhaskar">Retail (Bhaskar)</option><option value="neha">Wholesale (Neha)</option></motion.select></motion.div>
              </div>
              <motion.div className={styles.fG} variants={f}><label className={styles.fL}>Subject</label><motion.input name="subject" whileFocus={{ scale: 1.02 }} className={styles.fI} value={form.subject} onChange={ch} maxLength={150} placeholder="What is this about?" /></motion.div>
              <motion.div className={styles.fG} variants={f}><label className={styles.fL}>Message *</label><motion.textarea name="message" whileFocus={{ scale: 1.02 }} className={`${styles.fT} ${err.message ? styles.fE : ''}`} value={form.message} onChange={ch} rows={5} maxLength={2000} placeholder="How can we help you today?" /></motion.div>
              <motion.button type="submit" variants={f} className={styles.fBtn} disabled={st === 'sending'} whileHover={{ scale: 1.03, boxShadow: '0 8px 20px hsla(225, 45%, 40%, 0.3)' }} whileTap={{ scale: 0.98 }}>{st === 'sending' ? 'Sending...' : 'Send Message'}</motion.button>
            </motion.div>)}
          </motion.form>
        </div>
      </div></section>

      {/* Map */}
      <section className={`section ${styles.mapSec}`}><div className="container">
        <motion.div className={styles.sHead} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="section-label">Our Location</span>
          <h2 className="section-title">Find Us in <span className="gradient-text">Mirchaiya</span></h2>
          <div className={styles.highlightBanner}>
            <strong>Both Bhaskar Medico & Neha Medico are officially located here.</strong>
            <p>Operating from the same premises at Mirchaiya-02, Siraha.</p>
          </div>
        </motion.div>
        <motion.div className={styles.mapWrap} initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <iframe title="Bhaskar and Neha Medico, Mirchaiya-02, Siraha" src="https://www.google.com/maps?q=Bhaskar+Medico+Mirchaiya&hl=en&z=17&output=embed" width="100%" height="420" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className={styles.map} />
        </motion.div>
      </div></section>
    </>
  );
}
