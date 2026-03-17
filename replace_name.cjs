const fs = require('fs');
const path = require('path');

const searchStrings = [
  'Express Courier', 
  'Express Courier Sdn Bhd', 
  'EXPRESS COURIER SDN BHD'
];

const replaceTextCap = 'GLOBAL EXPRESS LOGISTICS SDN BHD';
const replaceText = 'Global Express Logistics Sdn Bhd';
const replaceTextShort = 'Global Express Logistics';

function getReplacement(orig) {
  if (orig === 'EXPRESS COURIER SDN BHD') return replaceTextCap;
  if (orig === 'Express Courier Sdn Bhd') return replaceText;
  if (orig === 'Express Courier') return replaceTextShort;
  return replaceTextShort;
}

function replaceInFile(filePath) {
  try {
    let data = fs.readFileSync(filePath, 'utf8');
    let hasChange = false;
    for (const searchString of searchStrings) {
      if (data.includes(searchString)) {
        data = data.split(searchString).join(getReplacement(searchString));
        hasChange = true;
      }
    }
    if (hasChange) {
      fs.writeFileSync(filePath, data, 'utf8');
      console.log(`Updated ${filePath}`);
    }
  } catch (err) {
    console.error(`Error reading/writing to ${filePath}:`, err);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      replaceInFile(fullPath);
    }
  }
}

walkDir(path.join(process.cwd(), 'src'));
console.log('Done.');
