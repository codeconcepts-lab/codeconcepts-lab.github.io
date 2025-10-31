const fs = require('fs');
const path = require('path');

function generateCSSDocs() {
    const cssFiles = findCSSFiles('./src/css');
    let documentation = `# CSS Documentation\n\n`;
    documentation += `*Generated on: ${new Date().toISOString().split('T')[0]}*\n\n`;

    cssFiles.forEach(file => {
        const relativePath = path.relative('./src/css', file);
        documentation += `## ${relativePath}\n\n`;

        try {
            const content = fs.readFileSync(file, 'utf8');
            
            // Extract major sections (simplified)
            const sections = extractCSSSections(content);
            
            if (sections.length > 0) {
                documentation += '### Major Components/Sections\n';
                sections.forEach(section => {
                    documentation += `- ${section}\n`;
                });
                documentation += '\n';
            }
            
            // Show file stats
            const lines = content.split('\n').length;
            const size = (content.length / 1024).toFixed(2);
            documentation += `### File Statistics\n`;
            documentation += `- **Lines**: ${lines}\n`;
            documentation += `- **Size**: ${size} KB\n`;
            documentation += `- **Selectors**: ${countSelectors(content)}\n\n`;

        } catch (error) {
            documentation += `*Error reading file: ${error.message}*\n\n`;
        }
        
        documentation += '---\n\n';
    });

    fs.writeFileSync('./docs/css-documentation.md', documentation);
    console.log('CSS documentation generated at: docs/css-documentation.md');
}

function findCSSFiles(dir) {
    let results = [];
    
    try {
        const items = fs.readdirSync(dir);
        
        items.forEach(item => {
            const fullPath = path.join(dir, item);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                results = results.concat(findCSSFiles(fullPath));
            } else if (path.extname(item).toLowerCase() === '.css') {
                results.push(fullPath);
            }
        });
    } catch (e) {
        console.log(`Could not read directory: ${dir}`);
    }
    
    return results;
}

function extractCSSSections(content) {
    const sections = [];
    const lines = content.split('\n');
    
    lines.forEach(line => {
        const trimmed = line.trim();
        // Look for major CSS rules (simplified)
        if (trimmed.match(/^\.([a-zA-Z-]+)\s*\{/) || 
            trimmed.match(/^#([a-zA-Z-]+)\s*\{/) ||
            trimmed.match(/^([a-zA-Z-]+)\s*\{/)) {
            sections.push(trimmed.split('{')[0].trim());
        }
    });
    
    return sections.slice(0, 20); // Limit to first 20 sections
}

function countSelectors(content) {
    const selectorMatches = content.match(/([^{]+)\{/g);
    return selectorMatches ? selectorMatches.length : 0;
}

generateCSSDocs();