const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// URLs to scrape
const urls = [
  'https://react-icons.github.io/react-icons/icons/fa6/',
  'https://react-icons.github.io/react-icons/icons/gi/',
  'https://react-icons.github.io/react-icons/icons/lu/',
  'https://react-icons.github.io/react-icons/icons/md/',
  'https://react-icons.github.io/react-icons/icons/tb/'
];

// Create icons directory if it doesn't exist
const iconsDir = path.join(__dirname, 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Function to extract prefix from URL
function getPrefixFromUrl(url) {
  const parts = url.split('/');
  return parts[parts.length - 2]; // Get the second-to-last part (e.g., 'fa6', 'gi', etc.)
}

async function scrapeIcons() {
  const browser = await puppeteer.launch({ headless: false });
  
  for (const url of urls) {
    console.log(`Scraping icons from ${url}`);
    const prefix = getPrefixFromUrl(url);
    
    // Create directory for this icon set
    const iconSetDir = path.join(iconsDir, prefix);
    if (!fs.existsSync(iconSetDir)) {
      fs.mkdirSync(iconSetDir, { recursive: true });
    }
    
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    // Extract icons and their names
    const icons = await page.evaluate(() => {
      const iconElements = document.querySelectorAll('.item');
      const result = [];
      
      iconElements.forEach(element => {
        const nameElement = element.querySelector('.name');
        if (!nameElement) return;
        
        const name = nameElement.textContent.trim();
        const svgElement = element.querySelector('svg');
        if (!svgElement) return;
        
        // Get SVG as string
        const svgString = svgElement.outerHTML;
        result.push({ name, svg: svgString });
      });
      
      return result;
    });
    
    console.log(`Found ${icons.length} icons for ${prefix}`);
    
    // Save icons to files
    for (const icon of icons) {
      let fileName = `${icon.name}.svg`;
      fileName = fileName.split(' ')[1]
      //make name from checkSchoolOne = check_school_one
      //we need to remove leading _ from the name
      fileName = fileName.replace(/([A-Z])/g, "_$1").toLowerCase();
      fileName = fileName.replace(/^_/, '');
      const filePath = path.join(iconSetDir,fileName);
      
      // Convert SVG string to clean SVG file
      const cleanSvg = icon.svg
        .replace(/width="1em"/, 'width="24"')
        .replace(/height="1em"/, 'height="24"');
      
      fs.writeFileSync(filePath, cleanSvg);
      console.log(`Saved ${fileName}`);
    }
    
    await page.close();
  }
  
  await browser.close();
  console.log('All icons have been scraped and saved!');
}

scrapeIcons().catch(console.error);
