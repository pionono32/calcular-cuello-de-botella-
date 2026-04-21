const fs = require('fs');
const js = fs.readFileSync('C:\\Users\\benja\\Desktop\\fps-check\\script.js', 'utf8');

try {
  new Function(js);
  console.log('JS syntax: OK');
} catch(e) {
  console.log('JS ERROR:', e.message);
}

const cpuCount = (js.match(/"Core i|"Ryzen/g) || []).length;
const gpuCount = (js.match(/"GTX|"RTX|"RX /g) || []).length;
console.log('CPUs:', cpuCount, 'entries');
console.log('GPUs:', gpuCount, 'entries');
