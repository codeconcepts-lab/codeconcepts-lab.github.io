const fs = require('fs');
const path = require('path');

function createDocsIndex() {
    const indexHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CEMEX Documentation</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }
        
        .header {
            text-align: center;
            color: white;
            margin-bottom: 3rem;
        }
        
        .header h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .header p {
            font-size: 1.2rem;
            opacity: 0.9;
        }
        
        .docs-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
            margin-bottom: 3rem;
        }
        
        .doc-card {
            background: white;
            border-radius: 15px;
            padding: 2rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .doc-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.3);
        }
        
        .doc-card h3 {
            color: #4a5568;
            margin-bottom: 1rem;
            font-size: 1.5rem;
        }
        
        .doc-card p {
            color: #718096;
            margin-bottom: 1.5rem;
        }
        
        .btn {
            display: inline-block;
            background: #667eea;
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 25px;
            text-decoration: none;
            font-weight: 600;
            transition: background 0.3s ease;
        }
        
        .btn:hover {
            background: #5a6fd8;
        }
        
        .btn-secondary {
            background: #e53e3e;
        }
        
        .btn-secondary:hover {
            background: #c53030;
        }
        
        .stats {
            background: white;
            border-radius: 15px;
            padding: 2rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        .stats h3 {
            color: #4a5568;
            margin-bottom: 1.5rem;
            text-align: center;
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            text-align: center;
        }
        
        .stat-item {
            padding: 1rem;
        }
        
        .stat-number {
            font-size: 2rem;
            font-weight: bold;
            color: #667eea;
            display: block;
        }
        
        .stat-label {
            color: #718096;
            font-size: 0.9rem;
        }
        
        .update-info {
            background: rgba(255,255,255,0.1);
            border-radius: 10px;
            padding: 1rem;
            margin-top: 2rem;
            text-align: center;
            color: white;
        }
        
        @media (max-width: 768px) {
            .header h1 {
                font-size: 2rem;
            }
            
            .docs-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🏗️ CEMEX Documentation</h1>
            <p>Comprehensive documentation for the CEMEX business website</p>
        </div>

        <div class="docs-grid">
            <div class="doc-card">
                <h3>📖 Project README</h3>
                <p>Complete project overview, setup instructions, and service descriptions.</p>
                <a href="../README.md" class="btn">View README</a>
            </div>
            
            <div class="doc-card">
                <h3>🎨 CSS Documentation</h3>
                <p>Detailed documentation of stylesheets, components, and design system.</p>
                <a href="css-documentation.md" class="btn">View CSS Docs</a>
            </div>
            
            <div class="doc-card">
                <h3>📐 HTML Structure</h3>
                <p>Analysis of HTML page structures and component relationships.</p>
                <a href="html-structure.md" class="btn">View HTML Structure</a>
            </div>
            
            <div class="doc-card">
                <h3>⚡ JavaScript Documentation</h3>
                <p>API documentation for JavaScript functions and components.</p>
                <a href="js/index.html" class="btn">View JS Docs</a>
            </div>
            
            <div class="doc-card">
                <h3>🏠 Live Website</h3>
                <p>Visit the actual CEMEX website to see the implementation.</p>
                <a href="../index.html" class="btn btn-secondary">View Website</a>
            </div>
            
            <div class="doc-card">
                <h3>📁 Repository Structure</h3>
                <p>Explore the complete file structure and organization.</p>
                <a href="FILE_MAP.md" class="btn">View File Map</a>
            </div>
        </div>

        <div class="stats">
            <h3>📊 Project Statistics</h3>
            <div class="stats-grid">
                <div class="stat-item">
                    <span class="stat-number">${countFiles('../src/imgs')}</span>
                    <span class="stat-label">Image Assets</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">${countFiles('../src/js', '.js')}</span>
                    <span class="stat-label">JS Files</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">${countFiles('../src/css', '.css')}</span>
                    <span class="stat-label">CSS Files</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">${countFiles('..', '.html')}</span>
                    <span class="stat-label">HTML Pages</span>
                </div>
            </div>
        </div>

        <div class="update-info">
            <p><strong>🔄 Auto-generated Documentation</strong></p>
            <p>This documentation updates automatically with code changes</p>
            <p><small>Last updated: ${new Date().toISOString().replace('T', ' ').substring(0, 19)}</small></p>
        </div>
    </div>

    <script>
        // Simple image gallery for team members (if needed)
        console.log('CEMEX Documentation Portal Loaded');
    </script>
</body>
</html>`;

    // Ensure docs directory exists
    if (!fs.existsSync('./docs')) {
        fs.mkdirSync('./docs', { recursive: true });
    }
    
    fs.writeFileSync('./docs/index.html', indexHTML);
    console.log('Documentation index generated at: docs/index.html');
}

function countFiles(dir, extension = '') {
    try {
        let count = 0;
        const items = fs.readdirSync(dir);
        
        items.forEach(item => {
            const fullPath = path.join(dir, item);
            try {
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory()) {
                    count += countFiles(fullPath, extension);
                } else if (!extension || path.extname(item) === extension) {
                    count++;
                }
            } catch (e) {
                // Skip files that can't be accessed
            }
        });
        
        return count;
    } catch (e) {
        return 0;
    }
}

createDocsIndex();