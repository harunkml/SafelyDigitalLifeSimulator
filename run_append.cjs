const fs = require('fs');
const path = require('path');

// Read new emails from append_batch2.cjs by appending an evaluation statement
const appendBatch2Content = fs.readFileSync(path.join(__dirname, 'append_batch2.cjs'), 'utf8');
const newEmails = eval(appendBatch2Content + '\nnewEmails;');

// Read existing mockData.js
const filePath = path.join(__dirname, 'src/data/mockData.js');
let content = fs.readFileSync(filePath, 'utf8');

const startIndex = content.indexOf('const rawEmails = [');
const endIndex = content.indexOf('export const mockEmails = rawEmails.map');

if (startIndex === -1 || endIndex === -1) {
  console.error('Failed to locate rawEmails array limits.');
  process.exit(1);
}

const arrayStart = content.indexOf('[', startIndex);
const arrayEnd = content.indexOf('];', startIndex);

const arrayText = content.substring(arrayStart, arrayEnd + 2);
let currentEmails = [];
try {
  currentEmails = eval(arrayText);
} catch (e) {
  currentEmails = [];
}

const mergedEmails = [...currentEmails, ...newEmails];
const newArrayText = JSON.stringify(mergedEmails, null, 2);

const newContent = content.substring(0, arrayStart) + newArrayText + content.substring(arrayEnd + 2);
fs.writeFileSync(filePath, newContent, 'utf8');
console.log(`Successfully merged ${newEmails.length} new emails. Total emails now: ${mergedEmails.length}`);
