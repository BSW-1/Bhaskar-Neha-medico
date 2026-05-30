'use client';
import { motion } from 'framer-motion';
import styles from './page.module.css';
const REVIEWS = [
  { id: 1, name: 'Ramesh Kumar', r: 5, text: 'Best pharmacy in Mirchaiya. Always have the medicines I need and the staff is very helpful and knowledgeable.', src: 'Google' },
  { id: 2, name: 'Sunita Devi', r: 5, text: 'Very reliable for prescriptions. They always verify with the doctor if something seems wrong. Trustworthy pharmacy.', src: 'Google' },
  { id: 3, name: 'Mohan Prasad', r: 5, text: 'I have been buying medicines from Bhaskar Medico for years. Quality products and fair prices. The best in Siraha district.', src: 'Google' },
  { id: 4, name: 'Dr. Suresh M.', r: 5, text: 'As a physician, I recommend my patients to Bhaskar & Neha Medico. They maintain proper storage and stock genuine medicines.', src: 'Google' },
  { id: 5, name: 'Prakash Thakur', r: 5, text: 'Best wholesale prices in the area. Neha Medico has been our supplier for 5+ years. Very reliable and consistent delivery.', src: 'Google' },
  { id: 6, name: 'Kavita Rani', r: 5, text: 'Pharmacist always takes time to explain dosages properly. I trust them with all our family medications.', src: 'Google' },
  { id: 7, name: 'Anita Shah', r: 4, text: 'Good pharmacy with wide range of products. Sometimes have to wait but overall very good service and genuine medicines.', src: 'Google' },
  { id: 8, name: 'Bijay Gupta', r: 5, text: 'Excellent service and always available medicines. The go-to pharmacy for our entire neighborhood.', src: 'Google' },
];
function Stars({ n }) {
  return <div className={styles.stars} aria-label={`${n} out of 5`}>{Array.from({ length: 5 }, (_, i) => <svg key={i} width="14" height="14" viewBox="0 0 16 16"><path d="M8 1.5L9.8 5.2L14 5.8L11 8.7L11.7 12.8L8 10.9L4.3 12.8L5 8.7L2 5.8L6.2 5.2L8 1.5Z" fill={i < n ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/></svg>)}</div>;
}
export default function Testimonials() {
  return (
    <>
      <section className={styles.hero}><div className="container">
        <motion.span className={styles.badge} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>Customer Reviews</motion.span>
        <motion.h1 className={styles.title} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>What Our <span className="gradient-text">Customers Say</span></motion.h1>
        <motion.p className={styles.subtitle} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.45 }}>Real feedback from our valued customers and healthcare partners.</motion.p>
        <motion.div className={styles.ratingBox} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }}>
          <span className={styles.ratingNum}>4.9</span><Stars n={5} /><span className={styles.ratingSrc}>Based on Google Reviews</span>
          <a href="https://www.google.com/maps/search/Bhaskar+Medico+Mirchaiya" target="_blank" rel="noopener noreferrer" className={styles.reviewBtn}>Read Live Reviews &rarr;</a>
        </motion.div>
      </div></section>
      <section className={`section ${styles.reviews}`}><div className="container">
        <div className={styles.grid}>{REVIEWS.map((r, i) => (
          <motion.article key={r.id} className={styles.card} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-30px' }} transition={{ duration: 0.5, delay: i * 0.05 }}>
            <Stars n={r.r} />
            <p className={styles.text}>&ldquo;{r.text}&rdquo;</p>
            <div className={styles.author}><div className={styles.avi}>{r.name[0]}</div><div><span className={styles.name}>{r.name}</span><span className={styles.src}>{r.src}</span></div></div>
          </motion.article>
        ))}</div>
      </div></section>
    </>
  );
}
