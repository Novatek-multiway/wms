const fs = require('fs');
const path = require('path');
const os = require('os');

const data = require('./data.js')


const en = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'en.json'), { encoding: 'utf-8' }));

const converData = (d) => {
  for (const key in d) {
    if(typeof d[key] === 'string') {
      if (en[key]) {
        d[key] = en[key]
      }
    } else {
      d[key] = converData(d[key])
    }
  }
  return d;
}

const newD = converData(data);
// console.log('newD: ', newD);

fs.writeFileSync(path.resolve(__dirname, 'tran.json'), JSON.stringify(newD, null, 4))