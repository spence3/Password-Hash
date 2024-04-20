const _ = require('lodash');
const bcrypt = require('bcryptjs');
const mcupws = require('./scraping/mcupws.json');
const fs = require('fs');

let pws = [
    _.sample(mcupws), //'password'
    _.sample('ABCDEF'), //'B'
    _.sampleSize('ABCDEF', 2).join('') //'FD'
];
pws = _.shuffle(pws);
console.log(pws);

const content = pws.map((pw) => bcrypt.hashSync(pw.toString(), 4))
    .join('\n');

fs.writeFileSync('test.hashes', content);
