const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

async function processHtmlFiles(directory) {
  const files = await readdir(directory, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = path.join(directory, file.name);
    
    if (file.isDirectory()) {
      await processHtmlFiles(fullPath);
    } else if (file.name.endsWith('.html')) {
      let content = await readFile(fullPath, 'utf8');
      
      // Replace .html in href attributes
      content = content.replace(/href="([^"]+)\.html"/g, 'href="$1"');
      
      // Replace .html in anchor tags that use relative paths
      content = content.replace(/href='([^']+)\.html'/g, "href='$1'");
      
      // Replace index.html in href attributes
      content = content.replace(/href="([^"]*?)index"/g, 'href="$1/"');
      content = content.replace(/href='([^']*?)index'/g, "href='$1/'");
      
      await writeFile(fullPath, content);
      console.log(`Processed: ${fullPath}`);
    }
  }
}

// Start processing from the public directory
processHtmlFiles('./public')
  .then(() => console.log('Finished processing all HTML files'))
  .catch(console.error); 