const _ = require('lodash');
const bcrypt = require('bcryptjs');
const mcupws = require('./scraping/mcupws.json');
const fs = require('fs');

let hashes = fs.readFileSync('hashes.txt', 'utf8').split(/\r?\n/)

console.log(_.slice(hashes,[start=0], [end= 3]))