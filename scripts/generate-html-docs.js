const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

function generateHTMLDocs() {
    const htmlFiles = findHTMLFiles('.');
    let documentation = `# HTML Structure Documentation\n\n`;
    documentation += `*Generated on: ${new Date().toISOString().split('T')[0]}*\n\n`;

    htmlFiles.forEach(file => {
        const relativePath = file;
        documentation += `## ${relativePath}\n\n`;

        try {
            const content = fs.readFileSync(file, 'utf8');
            const $ = cheerio.load(content);
            
            // Document page basics
            documentation += '### Page Information\n';
            documentation += `- **Title**: ${$('title').text() || 'No title'}\n`;
            documentation += `- **Language**: ${$('html').attr('lang') || 'Not specified'}\n`;
            
            // Document linked resources
            const cssFiles = $('link[rel="stylesheet"]').map((i, el) => $(el).attr('href')).get();
            const jsFiles = $('script[src]').map((i, el) => $(el).attr('src')).get();
            
            if (cssFiles.length > 0) {
                documentation += '### CSS Dependencies\n';
                cssFiles.forEach(css => {
                    documentation += `- ${css}\n`;
                });
                documentation += '\n';
            }
            
            if (jsFiles.length > 0) {
                documentation += '### JavaScript Dependencies\n';
                jsFiles.forEach(js => {
                    documentation += `- ${js}\n`;
                });
                documentation += '\n';
            }
            
            // Document main sections
            documentation += '### Main Sections\n';
            const mainSections = $('header, main, footer, section, nav');
            if (mainSections.length > 0) {
                mainSections.each((i, el) => {
                    const tag = el.tagName;
                    const id = $(el).attr('id');
                    const classes = $(el).attr('class');
                    const role = $(el).attr('role');
                    
                    documentation += `- \`<${tag}`;
                    if (id) documentation += ` id="${id}"`;
                    if (classes) documentation += ` class="${classes}"`;
                    if (role) documentation += ` role="${role}"`;
                    documentation += `>\`\n`;
                });
            }
            
            documentation += '\n';

        } catch (error) {
            documentation += `*Error reading file: ${error.message}*\n\n`;
        }
        
        documentation += '---\n\n';
    });

    // Ensure docs directory exists
    if (!fs.existsSync('./docs')) {
        fs.mkdirSync('./docs', { recursive: true });
    }
    
    fs.writeFileSync('./docs/html-structure.md', documentation);
    console.log('HTML documentation generated at: docs/html-structure.md');
}

function findHTMLFiles(dir) {
    let results = [];
    
    try {
        const items = fs.readdirSync(dir);
        
        items.forEach(item => {
            if (item === 'node_modules' || item === '.git') return;
            
            const fullPath = path.join(dir, item);
            
            try {
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory()) {
                    results = results.concat(findHTMLFiles(fullPath));
                } else if (path.extname(item).toLowerCase() === '.html') {
                    results.push(fullPath);
                }
            } catch (e) {
                // Skip files that can't be accessed
            }
        });
    } catch (e) {
        // Skip directories that can't be accessed
    }
    
    return results;
}

generateHTMLDocs();