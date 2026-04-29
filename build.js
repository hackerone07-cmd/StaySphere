import * as esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';

const publicDir = './public';
const distDir = './dist';

// Create dist directories
fs.mkdirSync(path.join(distDir, 'js'), { recursive: true });
fs.mkdirSync(path.join(distDir, 'css'), { recursive: true });

// Bundle JavaScript
await esbuild.build({
  entryPoints: [path.join(publicDir, 'js/script.js')],
  bundle: true,
  minify: true,
  outfile: path.join(distDir, 'js/script.js'),
  sourcemap: true,
});

console.log('JavaScript bundled successfully!');

// Copy CSS files (simple copy for now)
const cssFiles = ['style.css', 'rating.css'];
cssFiles.forEach(file => {
  const src = path.join(publicDir, file);
  const dest = path.join(distDir, 'css', file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${file}`);
  }
});

console.log('Build complete! Output in dist/');