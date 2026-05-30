export default function sitemap() {
  const baseUrl = 'https://medico.bhaskarsah.com.np';
  
  const routes = [
    '',
    '/about',
    '/contact',
    '/bhaskar-medico',
    '/neha-medico',
    '/testimonials'
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
