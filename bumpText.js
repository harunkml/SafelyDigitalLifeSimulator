import fs from 'fs';
import path from 'path';

function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      walk(filePath, fileList);
    } else if (filePath.endsWith('.jsx')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const files = walk('./src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // text-sm -> text-base
  content = content.replace(/\btext-sm\b/g, 'text-base');
  
  // text-xs -> text-sm
  content = content.replace(/\btext-xs\b/g, 'text-sm');
  
  // text-[10px] -> text-xs
  content = content.replace(/text-\[10px\]/g, 'text-xs');
  
  // text-[9px] -> text-[11px]
  content = content.replace(/text-\[9px\]/g, 'text-[11px]');
  
  // text-[8px] -> text-[10px]
  content = content.replace(/text-\[8px\]/g, 'text-[10px]');
  
  fs.writeFileSync(file, content, 'utf8');
});

console.log('Text bumped up in ' + files.length + ' files.');
