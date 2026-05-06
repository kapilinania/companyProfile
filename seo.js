const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Inject Advanced Meta Tags & Resource Hints
    if (!content.includes('name="robots"')) {
        content = content.replace('<!-- SEO Meta Tags -->', 
`<!-- SEO Meta Tags -->
    <meta name="robots" content="index, follow, max-image-preview:large">
    <meta name="theme-color" content="#050505">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://unpkg.com">
    <link rel="preconnect" href="https://images.unsplash.com">`);
    }

    // 2. Add aria-labels to buttons and icons
    content = content.replace(/class="float-btn wa-btn"/g, 'class="float-btn wa-btn" aria-label="Chat on WhatsApp"');
    content = content.replace(/class="float-btn ig-btn"/g, 'class="float-btn ig-btn" aria-label="Visit Instagram"');
    content = content.replace(/class="float-btn call-btn"/g, 'class="float-btn call-btn" aria-label="Call Us"');
    content = content.replace(/class="mobile-menu-btn"/g, 'class="mobile-menu-btn" aria-label="Toggle Mobile Menu"');
    content = content.replace(/<a href="https:\/\/instagram\.com\/kapil_inaniya" target="_blank"><i class='bx bxl-instagram'><\/i><\/a>/g, '<a href="https://instagram.com/kapil_inaniya" target="_blank" aria-label="Instagram"><i class=\'bx bxl-instagram\'></i></a>');
    content = content.replace(/<a href="https:\/\/wa\.me\/919828522814" target="_blank"><i class='bx bxl-whatsapp'><\/i><\/a>/g, '<a href="https://wa.me/919828522814" target="_blank" aria-label="WhatsApp"><i class=\'bx bxl-whatsapp\'></i></a>');

    // 3. Add lazy loading to Google icons
    content = content.replace(/<img src="https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/5\/53\/Google_%22G%22_Logo\.svg" class="google-icon" alt="Google">/g, 
        '<img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" class="google-icon" alt="Google Review" loading="lazy" width="20" height="20">');

    // 4. Semantic main tag wrapping (after nav, before footer)
    // Find </nav> and add <main id="main-content">
    if (!content.includes('<main id="main-content">')) {
        content = content.replace('</nav>', '</nav>\n    <main id="main-content">');
        // Find <footer class="footer"> and add </main> before it
        content = content.replace('<footer class="footer">', '</main>\n    <footer class="footer">');
    }

    fs.writeFileSync(file, content);
    console.log(`Processed ${file}`);
});
