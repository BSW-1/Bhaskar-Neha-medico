'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import styles from './Navigation.module.css';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/testimonials', label: 'Reviews' },
  { href: '/contact', label: 'Contact' },
];

/* SVG Icons  -  all custom, no emoji, no copyright */
const SunIcon = () => <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M10 3V4M10 16V17M3 10H4M16 10H17M5.05 5.05L5.76 5.76M14.24 14.24L14.95 14.95M5.05 14.95L5.76 14.24M14.24 5.76L14.95 5.05" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><circle cx="10" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.3"/></svg>;
const MoonIcon = () => <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M17.39 12.08A7.5 7.5 0 017.92 2.61 8 8 0 1017.39 12.08z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const ChevronDown = () => <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={styles.chevron}><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>;

export default function Navigation() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', mobileOpen);
    return () => document.body.classList.remove('no-scroll');
  }, [mobileOpen]);

  const close = useCallback(() => setMobileOpen(false), []);
  const isActive = (h) => h === '/' ? pathname === '/' : pathname.startsWith(h);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={styles.nav} aria-label="Main navigation">
        {/* Logo  -  bigger brand name */}
        <Link href="/" className={styles.logo} onClick={close} aria-label="Home">
          <div className={styles.logoMark}>
            <svg viewBox="0 0 40 40" fill="none" className={styles.logoSvg}>
              {/* Rounded square container */}
              <rect x="3" y="3" width="34" height="34" rx="9" fill="var(--teal-500)" />
              {/* Inner lighter square */}
              <rect x="5" y="5" width="30" height="30" rx="7" fill="var(--teal-400)" opacity="0.25" />
              {/* Medical cross — bold, centered */}
              <rect x="17" y="10" width="6" height="20" rx="2" fill="white" />
              <rect x="10" y="17" width="20" height="6" rx="2" fill="white" />
            </svg>
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoMain}>Bhaskar & Neha Medico</span>
          </div>
        </Link>

        {/* Branch Pills  -  Retail / Wholesale with dropdown arrows */}
        <div className={styles.portalPills}>
          <Link href="/bhaskar-medico" className={`${styles.pill} ${isActive('/bhaskar-medico') ? styles.pillActive : ''}`}>
            <span className={styles.pillLetter}>B</span>
            <span className={styles.pillLabel}>Retail</span>
            <ChevronDown />
          </Link>
          <Link href="/neha-medico" className={`${styles.pill} ${isActive('/neha-medico') ? styles.pillActive : ''}`}>
            <span className={styles.pillLetter}>N</span>
            <span className={styles.pillLabel}>Wholesale</span>
            <ChevronDown />
          </Link>
        </div>

        {/* Desktop Links */}
        <div className={styles.links}>
          {LINKS.map(l => (
            <Link key={l.href} href={l.href} className={`${styles.link} ${isActive(l.href) ? styles.linkActive : ''}`}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className={styles.actions}>
          <button className={styles.themeBtn} onClick={toggle} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
            {theme === 'light' ? <SunIcon /> : <MoonIcon />}
          </button>
          <Link href="/contact" className={styles.cta}>Get In Touch</Link>
          <button className={`${styles.burger} ${mobileOpen ? styles.burgerOpen : ''}`} onClick={() => setMobileOpen(!mobileOpen)} aria-expanded={mobileOpen} aria-label={mobileOpen ? 'Close menu' : 'Open menu'}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div className={styles.mobile} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
            <div className={styles.mobilePills}>
              <Link href="/bhaskar-medico" className={styles.mobilePill} onClick={close}>
                <span className={styles.pillLetter}>B</span> Retail Pharmacy <ChevronDown />
              </Link>
              <Link href="/neha-medico" className={styles.mobilePill} onClick={close}>
                <span className={styles.pillLetter}>N</span> Wholesale <ChevronDown />
              </Link>
            </div>
            {LINKS.map((l, i) => (
              <motion.div key={l.href} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                <Link href={l.href} className={`${styles.mobileLink} ${isActive(l.href) ? styles.mobileLinkActive : ''}`} onClick={close}>{l.label}</Link>
              </motion.div>
            ))}
            <Link href="/contact" className={styles.mobileCta} onClick={close}>Get In Touch</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
