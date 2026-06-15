const fs = require('fs');
const readline = require('readline');
const path = require('path');

const logPath = 'C:\\Users\\harun\\.gemini\\antigravity\\brain\\ce80fabc-adab-4cf8-a2ee-806a2e7f64c7\\.system_generated\\logs\\transcript.jsonl';
const fileStream = fs.createReadStream(logPath);

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

let found = false;

rl.on('line', (line) => {
  try {
    const obj = JSON.parse(line);
    const content = JSON.stringify(obj);
    if (content.includes('urgency_email') && content.includes('reward_email') && content.includes('"id": 101') && content.includes('Garanti BBVA')) {
      // We found a line containing the emails
      // Let's look for JSON array matches in this line string
      const matches = content.match(/\\\[\s*\\\{[\s\S]*?\\\}\s*\\\]/g) || content.match(/\[\s*\{[\s\S]*?\}\s*\]/g);
      if (matches && matches.length >= 2) {
        // Unescape the matches if they have backslashes
        const cleanMatch0 = matches[0].replace(/\\"/g, '"').replace(/\\n/g, '\n').replace(/\\/g, '');
        const cleanMatch1 = matches[1].replace(/\\"/g, '"').replace(/\\n/g, '\n').replace(/\\/g, '');
        
        const urgencyArray = eval(cleanMatch0);
        const rewardArray = eval(cleanMatch1);
        
        console.log('Urgency array count:', urgencyArray.length);
        console.log('Reward array count:', rewardArray.length);
        
        const filePath = path.join(__dirname, 'src/data/mockData.js');
        const contentMock = fs.readFileSync(filePath, 'utf8');
        
        const startIndex = contentMock.indexOf('const rawEmails = [');
        const endIndex = contentMock.indexOf('export const mockEmails = rawEmails.map');
        
        const arrayStart = contentMock.indexOf('[', startIndex);
        const arrayEnd = contentMock.indexOf('];', startIndex);
        
        const arrayText = contentMock.substring(arrayStart, arrayEnd + 2);
        const currentEmails = eval(arrayText);
        console.log('Current emails count in mockData.js:', currentEmails.length);
        
        const mergedEmails = [...urgencyArray, ...rewardArray, ...currentEmails];
        // Deduplicate by ID
        const uniqueEmails = [];
        const seen = new Set();
        for (const email of mergedEmails) {
          if (!seen.has(email.id)) {
            seen.add(email.id);
            uniqueEmails.push(email);
          }
        }
        
        const newArrayText = JSON.stringify(uniqueEmails, null, 2);
        const newContent = contentMock.substring(0, arrayStart) + newArrayText + contentMock.substring(arrayEnd + 2);
        
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log('Successfully merged all emails! Total emails count now:', uniqueEmails.length);
        found = true;
        rl.close();
      }
    }
  } catch (e) {
    // Ignore error
  }
});

rl.on('close', () => {
  if (!found) {
    console.log('Could not find the target batch in transcript.jsonl');
  }
});
