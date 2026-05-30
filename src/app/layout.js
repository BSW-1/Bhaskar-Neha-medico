import Script from 'next/script';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import ThemeProvider from '@/components/ThemeProvider';
import LoadingScreen from '@/components/LoadingScreen';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap', weight: ['400','500','600','700','800'] });

export const metadata = {
  metadataBase: new URL('https://medico.bhaskarsah.com.np'),
  title: { default: 'Bhaskar & Neha Medico', template: '%s | B&N Medico' },
  description: 'Bhaskar & Neha Medico: Trusted pharmacy (retail) and pharmaceutical wholesale distribution in Mirchaiya-02, Siraha, Nepal. Genuine medicines, healthcare products, and bulk supply since the 2000s.',
  keywords: ['pharmacy Mirchaiya', 'Bhaskar Medico', 'Neha Medico', 'wholesale pharmacy Siraha', 'medicine Siraha Nepal', 'pharmaceutical distribution Nepal'],
  applicationName: 'Bhaskar & Neha Medico',
  appleWebApp: { title: 'Bhaskar & Neha Medico' },
  authors: [{ name: 'BlackBound', url: 'https://blackbound.org' }],
  creator: 'BlackBound',
  openGraph: { type: 'website', locale: 'en_US', siteName: 'Bhaskar & Neha Medico', title: 'Bhaskar & Neha Medico', description: 'Trusted pharmacy and wholesale in Mirchaiya-02, Siraha, Nepal.' },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://medico.bhaskarsah.com.np/#website',
      url: 'https://medico.bhaskarsah.com.np/',
      name: 'Bhaskar & Neha Medico',
      alternateName: 'B&N Medico'
    },
    {
      '@type': 'Organization',
      '@id': 'https://medico.bhaskarsah.com.np/#organization',
      name: 'Bhaskar & Neha Medico',
      url: 'https://medico.bhaskarsah.com.np',
      founder: { '@type': 'Person', name: 'Mr. Ghanshyam Sah', jobTitle: 'Founder & CEO' },
      address: { '@type': 'PostalAddress', streetAddress: 'Mirchaiya-02', addressLocality: 'Siraha', addressCountry: 'NP' },
      contactPoint: [
        { '@type': 'ContactPoint', telephone: '+977-9811711199', contactType: 'customer service', areaServed: 'NP' },
        { '@type': 'ContactPoint', telephone: '+977-9842845688', contactType: 'wholesale inquiries', areaServed: 'NP' },
      ],
      subOrganization: [
        { '@type': 'Pharmacy', name: 'Bhaskar Medico', description: 'Retail pharmacy', telephone: '+977-9811711199', openingHours: 'Mo-Su 06:30-21:00' },
        { '@type': 'MedicalBusiness', name: 'Neha Medico', description: 'Wholesale pharmaceutical distribution', telephone: '+977-9842845688', openingHours: 'Mo-Su 06:30-21:00' },
      ]
    }
  ]
};

/* Google Translate script  -  runs client-side only */
const GT_INIT = `
function googleTranslateElementInit() {
  new google.translate.TranslateElement({ pageLanguage: 'en', autoDisplay: false }, 'google_translate_element');
  setTimeout(function() {
    var saved = localStorage.getItem('selectedLang');
    if (saved && saved !== 'en') { window.changeLanguage(saved); }
  }, 1500);
}
window.changeLanguage = function(langCode) {
  localStorage.setItem('selectedLang', langCode);
  if (langCode === 'en') {
    document.cookie = 'googtrans=; path=/; max-age=0';
    document.cookie = 'googtrans=; path=/; domain=' + window.location.hostname + '; max-age=0';
    localStorage.removeItem('selectedLang');
    window.location.reload(); return;
  }
  document.cookie = 'googtrans=/en/' + langCode + '; path=/; max-age=31536000';
  document.cookie = 'googtrans=/en/' + langCode + '; path=/; domain=' + window.location.hostname + '; max-age=31536000';
  var retries = 0;
  function attempt() {
    var combo = document.querySelector('.goog-te-combo');
    if (combo && combo.options.length > 0) { combo.value = langCode; combo.dispatchEvent(new Event('change')); }
    else if (retries++ < 20) setTimeout(attempt, 500);
    else window.location.reload();
  }
  attempt();
};
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" data-scroll-behavior="smooth" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <ThemeProvider>
          <LoadingScreen />
          <Navigation />
          <main>{children}</main>
          <Footer />
          <ChatBot />
        </ThemeProvider>

        {/* Google Translate Scripts */}
        <Script id="gt-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: GT_INIT }} />
        <Script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" strategy="afterInteractive" />
      </body>
    </html>
  );
}
