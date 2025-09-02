import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import demo registry to get all routes
const getDemoRoutes = async () => {
  try {
    // Note: This would need to be adjusted based on your build setup
    // For now, we'll manually define the routes
    const routes = [
      'stepper-demo',
      'slider-form-demo',
      'multi-form-demo',
      'custom-components-demo',
      'business-made',
      'paged-schema',
      'theme-editor',
      'text-inputs',
      'number-inputs',
      'selection-inputs',
      'date-time-inputs',
      'special-inputs',
      'layout-elements',
      'advanced-elements',
      'table-demo',
      'form-demo',
      'text-field',
      'textarea',
      'richtext'
    ];
    return routes;
  } catch (error) {
    console.error('Error getting demo routes:', error);
    return [];
  }
};

const generateSitemap = async () => {
  const baseUrl = 'https://appmint-form.spinforge.dev';
  const demoRoutes = await getDemoRoutes();
  
  const staticPages = [
    { url: '/', changefreq: 'weekly', priority: 1.0 },
  ];
  
  const demoPages = demoRoutes.map(route => ({
    url: `/${route}`,
    changefreq: 'weekly',
    priority: 0.8
  }));
  
  const allPages = [...staticPages, ...demoPages];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`).join('\n')}
</urlset>`;
  
  const publicDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  console.log('Sitemap generated successfully!');
};

generateSitemap().catch(console.error);