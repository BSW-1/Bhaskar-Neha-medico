'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

/* Custom SVG icons */
const PhoneIcon = () => <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6.5 1.5H3.5C2.67 1.5 2 2.17 2 3V4C2 9.52 6.48 14 12 14H13C13.83 14 14.5 13.33 14.5 12.5V10.5L11.5 9L10 10.5C8.38 9.5 6.5 7.62 5.5 6L7 4.5L5.5 1.5H6.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const PinIcon = () => <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 1.5C5.51 1.5 3.5 3.51 3.5 6C3.5 9.5 8 14.5 8 14.5S12.5 9.5 12.5 6C12.5 3.51 10.49 1.5 8 1.5Z" stroke="currentColor" strokeWidth="1.2"/><circle cx="8" cy="6" r="2" stroke="currentColor" strokeWidth="1.2"/></svg>;

export default function Footer() {
  const year = new Date().getFullYear();

  const [lang, setLang] = useState('en');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('selectedLang');
      if (saved) setLang(saved);
    }
  }, []);

  const handleLangChange = (e) => {
    const val = e.target.value;
    setLang(val);
    if (typeof window !== 'undefined' && window.changeLanguage) {
      window.changeLanguage(val);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.logoRow}>
              <svg viewBox="0 0 40 40" fill="none" className={styles.logoSvg}>
                <rect x="3" y="3" width="34" height="34" rx="9" fill="var(--teal-500)" />
                <rect x="5" y="5" width="30" height="30" rx="7" fill="var(--teal-400)" opacity="0.25" />
                <rect x="17" y="10" width="6" height="20" rx="2" fill="white" />
                <rect x="10" y="17" width="20" height="6" rx="2" fill="white" />
              </svg>
              <span className={styles.brandName}>Bhaskar & Neha Medico</span>
            </div>
            <p className={styles.brandDesc}>Your neighbourhood pharmacy and trusted wholesale partner. Serving families and healthcare businesses in Mirchaiya and across the Siraha district since the 2000s.</p>
          </div>
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Quick Links</h4>
            <Link href="/" className={styles.colLink}>Home</Link>
            <Link href="/bhaskar-medico" className={styles.colLink}>Retail Pharmacy</Link>
            <Link href="/neha-medico" className={styles.colLink}>Wholesale</Link>
            <Link href="/about" className={styles.colLink}>About Us</Link>
          </div>
          <div className={styles.col}>
            <h4 className={styles.colTitle}>More</h4>
            <Link href="/testimonials" className={styles.colLink}>Reviews</Link>
            <Link href="/contact" className={styles.colLink}>Contact</Link>
          </div>
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Contact</h4>
            <a href="tel:+9779811711199" className={styles.colLink}><PhoneIcon /> 9811711199 (Retail)</a>
            <a href="tel:+9779842845688" className={styles.colLink}><PhoneIcon /> 9842845688 (Wholesale)</a>
            <a href="tel:+9779829786509" className={styles.colLink}><PhoneIcon /> 9829786509 (Wholesale Desk)</a>
            <span className={styles.colText}><PinIcon /> Mirchaiya-02, Siraha, Nepal</span>
            <span className={styles.colText}>Open daily: 6:30 AM to 9:00 PM</span>
          </div>
        </div>

        {/* Bottom with Google Translate (100+ languages) */}
        <div className={styles.bottom}>
          <span className={styles.copy}>&copy; {year} Bhaskar & Neha Medico. All rights reserved.</span>
          <div className={styles.bottomRight}>
            <div className={styles.langWrap}>
              <div className="translate-container">
                <select 
                  className="custom-lang-select" 
                  onChange={(e) => window.changeLanguage && window.changeLanguage(e.target.value)}
                  defaultValue="en"
                  aria-label="Select Language"
                >
                  <option value="en">English</option>
                  <option value="ne">Nepali</option>
                  <option value="hi">Hindi</option>
                  <option value="mai">Maithili</option>
                  <option value="bho">Bhojpuri</option>
                  <option value="bn">Bengali</option>
                  <option value="zh-CN">Chinese</option>
                  <option value="es">Spanish</option>
                  <option value="ar">Arabic</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="ja">Japanese</option>
                  <option value="ko">Korean</option>
                  <option value="ru">Russian</option>
                  <option value="pt">Portuguese</option>
                  <option value="ur">Urdu</option>
                  <option value="pa">Punjabi</option>
                </select>
                <div id="google_translate_element" style={{ display: 'none' }} />
              </div>
            </div>
            <span className={styles.credit}>Developed by <a href="https://blackbound.org" target="_blank" rel="noopener noreferrer" className={styles.creditLink}>BlackBound</a></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
