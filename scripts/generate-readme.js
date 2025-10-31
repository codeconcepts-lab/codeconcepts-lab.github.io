const fs = require('fs');
const path = require('path');

function generateReadme() {
    const readme = `# CEMEX - Comprehensive Business Solutions

![CEMEX Logo](src/imgs/logo/header_logo.png)

## About CEMEX

CEMEX provides integrated solutions across multiple industries including marine services, construction, catering, and power solutions.

## 🚀 Services

### Marine Services
- Dredging operations
- Marine vessel management
- Port services
- Offshore support

### Construction Services
- Industrial construction
- Facility management
- Infrastructure development
- Project management

### Catering Solutions
- Camp management
- Industrial catering
- Food services
- Facility maintenance

### Power Solutions
- Generator rentals
- Power management
- Energy solutions
- Equipment leasing

## 📁 Project Structure

\`\`\`
cemex-repo/
├── src/
│   ├── css/
│   │   ├── main.css           # Main stylesheet
│   │   └── services.css       # Services-specific styles
│   ├── js/
│   │   ├── main.js            # Main JavaScript functionality
│   │   └── services.js        # Services page JavaScript
│   ├── imgs/                  # Image assets
│   │   ├── logo/              # Company logos
│   │   ├── team/              # Team member photos
│   │   ├── imgs_v1/           # Service images v1
│   │   └── imgs_v2/           # Service images v2
│   └── vendor/                # Third-party libraries
├── html/                      # HTML pages
│   ├── services/              # Individual service pages
│   ├── templates/             # Template files
│   └── general/               # General pages
├── docs/                      # Documentation
└── scripts/                   # Documentation generators
\`\`\`

## 🛠️ Development

### Documentation Generation

\`\`\`bash
# Generate all documentation
npm run docs

# Generate specific documentation
npm run js-docs    # JavaScript documentation
npm run css-docs   # CSS documentation
npm run html-docs  # HTML structure documentation

# Serve documentation locally
npm run serve-docs
\`\`\`

## 📞 Contact

For business inquiries:
- Website: [View Live Site]()
- Email: contact@cemex.com
- Phone: +234 XXX XXXX

---

*Documentation automatically generated on ${new Date().toISOString().split('T')[0]}*
`;

    fs.writeFileSync('./README.md', readme);
    console.log('README.md generated successfully');
}

generateReadme();