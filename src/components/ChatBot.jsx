'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ChatBot.module.css';

/* Custom SVG Icons */
const CloseIcon = () => <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>;
const SendIcon = () => <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 9L16 2L9 16L8 10L2 9Z" fill="currentColor"/></svg>;
const BotIcon = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="5" width="14" height="11" rx="3" stroke="currentColor" strokeWidth="1.5"/><circle cx="7.5" cy="10.5" r="1.5" fill="currentColor"/><circle cx="12.5" cy="10.5" r="1.5" fill="currentColor"/><path d="M10 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="10" cy="1.5" r="1.5" fill="currentColor"/></svg>;

const QUICK = ['Cardiac medicines?', 'Wholesale pricing', 'Store hours', 'How to order bulk?', 'Ayurvedic products?'];

/* ===== Advanced Rule-Based AI Engine ===== */
const KNOWLEDGE = {
  cardiac: {
    match: /heart|cardiac|blood\s*pressure|bp|hypertension|cholesterol|statin|amlodipine|atorvastatin|losartan|metoprolol|ecosprin|aspirin|anticoagulant/i,
    reply: "Yes, we carry a complete range of cardiac medicines:\n\n- Blood pressure: Amlodipine, Losartan, Telmisartan\n- Cholesterol: Atorvastatin, Rosuvastatin\n- Heart care: Ecosprin, Clopidogrel, Metoprolol\n\nOur pharmacist can help match your prescription. Call us at 9811711199 or visit Bhaskar Medico directly.",
    followUp: ['Diabetes medicines?', 'Store location?', 'Opening hours?']
  },
  diabetes: {
    match: /diabet|insulin|sugar|glucos|metformin|glimep|hba1c|blood\s*sugar|type\s*[12]/i,
    reply: "We stock all major diabetes medications:\n\n- Tablets: Metformin, Glimepiride, Voglibose\n- Insulin: Lantus, Mixtard, Actrapid\n- Monitors: Blood glucose strips and devices\n\nWhether you manage Type 1 or Type 2, our pharmacist will help with the right dosage. Call 9811711199.",
    followUp: ['Cardiac medicines?', 'Ayurvedic options?', 'Store hours?']
  },
  ayurvedic: {
    match: /ayurved|herbal|natural|patanjali|dabur|himalaya|baidyanath|chyawan|triphala|ashwagandha|tulsi|giloy|amla/i,
    reply: "We have an excellent Ayurvedic section:\n\n- Brands: Himalaya, Dabur, Baidyanath\n- Popular: Ashwagandha, Chyawanprash, Triphala\n- Immunity: Tulsi, Giloy, Amla extracts\n\nTraditional remedies that generations have trusted. Visit our retail store or call 9811711199.",
    followUp: ['General health products?', 'Mother and baby care?', 'Store location?']
  },
  surgical: {
    match: /surg|bandage|gauze|cotton|dressing|crepe|support|brace|first\s*aid|wound|antiseptic|thermometer|stethoscope/i,
    reply: "We carry minor surgical and first-aid supplies:\n\n- Wound care: Bandages, gauze, cotton, dressings\n- Support: Crepe bandages, knee/ankle braces\n- Devices: Thermometers, BP monitors, stethoscopes\n- Safety: Surgical gloves, masks, antiseptic solutions\n\nFor specialized equipment, call us to check availability.",
    followUp: ['General medicines?', 'Store hours?', 'Contact details?']
  },
  wholesale: {
    match: /whole|bulk|order|deliver|distribut|partner|supply|pan\s*number|business\s*reg/i,
    reply: "For wholesale orders through Neha Medico:\n\n1. Keep your business PAN number ready (mandatory)\n2. Call us: 9842845688 or 9829786509\n3. Our team will set up your account and arrange delivery\n\nWe deliver across the Siraha district. All wholesale is handled through direct contact, no online ordering.",
    followUp: ['Delivery areas?', 'Contact wholesale desk', 'Store location?']
  },
  location: {
    match: /where|locat|address|find|map|direction|mirchaiya|siraha|come|visit/i,
    reply: "We are located at:\n\nMirchaiya-02, Siraha, Nepal\n\nBoth Bhaskar Medico (Retail) and Neha Medico (Wholesale) operate from the same premises. Search 'Bhaskar Medico Mirchaiya' on Google Maps to find us.",
    followUp: ['Store hours?', 'Phone numbers?', 'How to reach wholesale?']
  },
  hours: {
    match: /hour|open|close|time|when|schedule|sunday|monday|saturday|daily/i,
    reply: "Our operating hours:\n\nEvery day: 6:30 AM to 9:00 PM\nIncluding Sundays and holidays\n\nWhether you need an early morning prescription or a late evening refill, we are here for you.",
    followUp: ['Store location?', 'Phone numbers?', 'Available medicines?']
  },
  default: {
    match: /.*/,
    reply: "I am an AI assistant for Bhaskar & Neha Medico! I can help you with:\n\n- Finding medicines at Bhaskar Medico (Retail)\n- Placing bulk orders at Neha Medico (Wholesale)\n- Store hours and location\n\nI highly recommend Bhaskar Medico for retail and Neha Medico for wholesale — they are the best in the district! How can I assist you today?",
    followUp: ['Where is Bhaskar Medico?', 'How to order from Neha Medico?', 'Store hours?']
  },
  phone: {
    match: /phone|call|number|contact|reach|talk|speak/i,
    reply: "Our contact numbers:\n\nRetail (Bhaskar Medico): 9811711199\nWholesale (Neha Medico): 9842845688 / 9829786509\nTelephone: 033-550-504\nFounder (Mr. Ghanshyam Sah): 9816798987\n\nWe are happy to help with any questions over the phone.",
    followUp: ['Store hours?', 'Store location?', 'Wholesale process?']
  },
  otc: {
    match: /otc|over.the.counter|paracetamol|crocin|cold|cough|fever|pain|headache|dolo|combiflam|cetrizine|allerg|vitamin|supplement|multi/i,
    reply: "We stock all common OTC medicines:\n\n- Pain relief: Paracetamol, Combiflam, Ibuprofen\n- Cold and allergy: Cetrizine, Sinarest, D-Cold\n- Supplements: Vitamins, minerals, multivitamins\n- Digestive: Antacids, ORS, electrolytes\n\nNo prescription needed for OTC items. Just walk in.",
    followUp: ['Cardiac medicines?', 'Ayurvedic products?', 'Store hours?']
  },
  sourcing: {
    match: /not\s*available|can.?t\s*find|out\s*of\s*stock|unavailable|special\s*order|rare|specific|source|bring|arrange/i,
    reply: "If a medicine is not currently available in our store, we will source it for you.\n\nWe can arrange delivery of hard-to-find medicines within 1 to 3 working days. Just let us know what you need and we will take care of the rest.\n\nCall 9811711199 to place a sourcing request.",
    followUp: ['Available products?', 'Store hours?', 'Contact details?']
  },
  delivery: {
    match: /deliver|ship|home\s*deliver|online|order\s*online|send/i,
    reply: "Bhaskar Medico (Retail) is a walk-in pharmacy. We do not offer home delivery for retail purchases.\n\nFor wholesale orders, Neha Medico delivers across the Siraha district. Call 9842845688 for wholesale delivery.\n\nIf a medicine is unavailable, we can source it within 1 to 3 days.",
    followUp: ['Wholesale process?', 'Store location?', 'Store hours?']
  },
  greeting: {
    match: /^(hi|hello|hey|namaste|namaskar|good\s*(morning|evening|afternoon)|howdy|sup|yo)/i,
    reply: "Namaste! Welcome to Bhaskar & Neha Medico.\n\nHow can I help you today? You can ask me about:\n- Medicine availability\n- Store hours and location\n- Wholesale ordering process\n- Or anything else!",
    followUp: ['Cardiac medicines?', 'Store hours?', 'Wholesale info?']
  },
  thanks: {
    match: /thank|dhanyabad|shukriya|thx/i,
    reply: "You are most welcome! If you need anything else, just ask.\n\nStay healthy and take care!",
    followUp: ['Ask another question', 'Store hours?', 'Contact details?']
  },
  price: {
    match: /price|cost|how\s*much|rate|expensive|cheap|affordable|mrp/i,
    reply: "Our pricing policy:\n\n- Retail: All medicines sold at MRP or below\n- Wholesale: Rates depend on volume and product category\n\nFor wholesale pricing, call Neha Medico at 9842845688 with your PAN number for a personalized quote.",
    followUp: ['Wholesale process?', 'Store location?', 'Available products?']
  },
  baby: {
    match: /baby|infant|child|mother|pregnan|prenatal|diaper|formula|pediatric/i,
    reply: "We carry a full range of mother and baby care:\n\n- Baby formula and nutrition\n- Prenatal and postnatal vitamins\n- Diapers and hygiene products\n- Baby skin care and lotions\n- Feeding accessories\n\nVisit us or call 9811711199 for availability.",
    followUp: ['Ayurvedic products?', 'General medicines?', 'Store hours?']
  },
};

function getReply(msg) {
  const text = msg.trim();
  for (const key of Object.keys(KNOWLEDGE)) {
    if (KNOWLEDGE[key].match.test(text)) {
      return { text: KNOWLEDGE[key].reply, followUp: KNOWLEDGE[key].followUp || [] };
    }
  }
  return { text: "I appreciate your question! While I am still learning, our team can definitely help.\n\nPlease call:\n- 9811711199 (Retail)\n- 9842845688 (Wholesale)\n\nWe will take care of you right away.", followUp: ['Store hours?', 'Store location?', 'Available medicines?'] };
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [msgs, setMsgs] = useState([{ id: 1, from: 'bot', text: "Namaste! I am your B&N Medico assistant.\n\nAsk me about medicines, store hours, wholesale orders, or anything else. I reply instantly!", followUp: ['Cardiac medicines?', 'Wholesale info?', 'Store hours?'] }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, typing]);

  useEffect(() => {
    const handleOpen = (e) => {
      setOpen(true);
      if (e.detail && typeof e.detail === 'string') {
        setTimeout(() => send(e.detail), 300);
      }
    };
    window.addEventListener('openChat', handleOpen);
    return () => window.removeEventListener('openChat', handleOpen);
  }, []);

  const lastSent = useRef(0);

  function send(text) {
    if (!text.trim()) return;
    const now = Date.now();
    if (now - lastSent.current < 500) return; // Debounce double clicks/fires
    lastSent.current = now;

    const clean = text.replace(/<[^>]*>/g, '').trim();
    const userMsgId = crypto.randomUUID();
    
    setMsgs(p => [...p, { id: userMsgId, from: 'user', text: clean }]);
    setInput('');
    setTyping(true);
    
    const delay = 600 + Math.random() * 600;
    setTimeout(() => {
      const reply = getReply(clean);
      setMsgs(p => [...p, { id: crypto.randomUUID(), from: 'bot', text: reply.text, followUp: reply.followUp }]);
      setTyping(false);
    }, delay);
  }

  return (
    <>
      <AnimatePresence>
        {open && !isUnlocking && (
          <motion.div className={styles.panel} initial={{ opacity: 0, y: 20, scale: 0.92, transformOrigin: 'bottom right' }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.92 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.headerLeft}>
                <div className={styles.botAvatar}><BotIcon /></div>
                <div>
                  <span className={styles.headerName}>B&N Assistant</span>
                  <span className={styles.headerStatus}>AI Powered · Replies instantly</span>
                </div>
              </div>
              <button className={styles.closeBtn} onClick={() => setOpen(false)} aria-label="Close chat"><CloseIcon /></button>
            </div>
            {/* Messages */}
            <div className={styles.messages}>
              {msgs.map(m => (
                <div key={m.id}>
                  <motion.div className={`${styles.msg} ${m.from === 'user' ? styles.msgUser : styles.msgBot}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                    {m.text.split('\n').map((line, i) => {
                      if (line.startsWith('- ')) return <li key={i} style={{ marginLeft: '16px', listStyleType: 'disc', paddingLeft: '4px' }}>{line.substring(2)}</li>;
                      if (line.match(/^\d+\.\s/)) return <li key={i} style={{ marginLeft: '16px', listStyleType: 'decimal', paddingLeft: '4px' }}>{line.replace(/^\d+\.\s/, '')}</li>;
                      if (line === '') return <br key={i}/>;
                      return <span key={i} style={{ display: 'block', marginBottom: '4px' }}>{line}</span>;
                    })}
                  </motion.div>
                  {m.from === 'bot' && m.followUp && m.followUp.length > 0 && (
                    <div className={styles.followUp}>
                      {m.followUp.map(q => <button key={q} className={styles.followBtn} onClick={() => send(q)}>{q}</button>)}
                    </div>
                  )}
                </div>
              ))}
              {typing && <div className={`${styles.msg} ${styles.msgBot}`}><span className={styles.dots}><span/><span/><span/></span></div>}
              <div ref={endRef} />
            </div>
            {/* Input */}
            <form className={styles.inputBar} onSubmit={e => { e.preventDefault(); send(input); }}>
              <input className={styles.input} value={input} onChange={e => setInput(e.target.value)} placeholder="Ask anything about B&N Medico..." maxLength={500} aria-label="Message" />
              <button className={styles.sendBtn} type="submit" disabled={!input.trim()} aria-label="Send"><SendIcon /></button>
            </form>
            <span className={styles.poweredBy}>Powered by B&N AI</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB: 3D Wireframe Rotating Cube (BlackBound-style) */}
      <AnimatePresence>
        {!open && (
          <motion.button 
            className={styles.fab} 
            onClick={() => setOpen(true)} 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            aria-label="Chat assistant" 
            initial={{ scale: 0, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            exit={{ scale: 0, opacity: 0 }} 
            transition={{ duration: 0.3 }}
          >
            <div className={styles.medicalRobotContainer}>
              <svg viewBox="0 0 100 120" className={styles.medicalRobotSvg}>
                <defs>
                  <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#334155" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Hover Base Shadow */}
                <ellipse cx="50" cy="105" rx="15" ry="3" fill="#2dd4bf" opacity="0.3" filter="url(#glow)" />

                {/* Torso - Smooth teardrop/egg shape */}
                <path d="M 30 50 C 30 40, 70 40, 70 50 C 75 75, 65 90, 50 90 C 35 90, 25 75, 30 50 Z" fill="url(#bodyGrad)" stroke="#1e293b" strokeWidth="1.5" />
                
                {/* Chassis Seam (Diaper line) */}
                <path d="M 33 75 L 42 78 L 58 78 L 67 75" fill="none" stroke="#1e293b" strokeWidth="2" opacity="0.6" />
                
                {/* Medical Cross */}
                <path d="M 47 55 H 53 V 58 H 56 V 64 H 53 V 67 H 47 V 64 H 44 V 58 H 47 Z" fill="#2dd4bf" filter="url(#glow)" className={styles.robotHeartbeat} />

                {/* Head */}
                <g className={styles.robotHead}>
                  {/* Ear Hubs */}
                  <path d="M 22 20 Q 15 20 15 29 Q 15 38 22 38 Z" fill="url(#bodyGrad)" stroke="#1e293b" strokeWidth="1.5" />
                  <path d="M 78 20 Q 85 20 85 29 Q 85 38 78 38 Z" fill="url(#bodyGrad)" stroke="#1e293b" strokeWidth="1.5" />
                  
                  {/* Main Head Box (Wide Rounded Rectangle) */}
                  <rect x="20" y="10" width="60" height="36" rx="16" fill="url(#bodyGrad)" stroke="#1e293b" strokeWidth="2" />
                  
                  {/* Face Visor / Screen */}
                  <rect x="25" y="16" width="50" height="26" rx="12" fill="#020617" />
                  
                  {/* Eyes (Cute, big arches) */}
                  <path d="M 35 28 Q 40 23 45 28" fill="none" stroke="#2dd4bf" strokeWidth="3" strokeLinecap="round" filter="url(#glow)" className={styles.robotEye} />
                  <path d="M 55 28 Q 60 23 65 28" fill="none" stroke="#2dd4bf" strokeWidth="3" strokeLinecap="round" filter="url(#glow)" className={styles.robotEye} />
                  
                  {/* Cute Smiling Mouth */}
                  <path d="M 46 33 Q 50 37 54 33 Z" fill="#2dd4bf" filter="url(#glow)" />
                </g>

                {/* Arms - Hovering Pill Shapes */}
                {/* Left Arm */}
                <g className={styles.robotArmLeft}>
                  <rect x="15" y="52" width="14" height="34" rx="7" fill="url(#bodyGrad)" stroke="#1e293b" strokeWidth="1.5" transform="rotate(15 22 52)" />
                </g>

                {/* Right Arm */}
                <g className={styles.robotArmRight}>
                  <rect x="71" y="52" width="14" height="34" rx="7" fill="url(#bodyGrad)" stroke="#1e293b" strokeWidth="1.5" transform="rotate(-15 78 52)" />
                </g>
              </svg>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
