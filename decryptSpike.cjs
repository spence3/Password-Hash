const bcrypt = require('bcryptjs')
const mcupws = require('./scraping/mcupws.json')
const fs = require('fs')


const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0987654321'

mcupws.push('')
mcupws.push(...pwsUpToLenN(1))
// console.log(samplePWS.length)// 800 + 1 + 62 + 62**2

//TODO MAKE SIMPLE SAMPLE TEST hashes file
//TODO use the rule of 3 for dev speed
//TODO make pwsOfLenN(n)_ --recursive version
//TODO 

function* pwsOfLenN(n){
    if(n === 1){
        yield* alphabet
        return
    }

    for(let ch1 of alphabet){
        for(let ch2 of pwsOfLenN(n - 1)){
            yield `${ch1}${ch2}`
        }
    }
}

function* pwsUpToLenN(n){
    for(let i = 1; i <= n; i++){
        yield* pwsOfLenN(i)
    }
}

function* allClearTextPws(){
    yield ''
    yield* mcupws.slice(0, 100)
    yield* pwsOfLenN(1)
    yield* mcupws.slice(100, 900)
    yield* pwsOfLenN(2)
    yield* mcupws.slice(900)
    yield* pwsOfLenN(3)
}


//load the hashes
const hashes = fs.readFileSync('test.hashes', 'utf8').split(/\r?\n/)
for(let hash of hashes){
    for(let pw of allClearTextPws()){
        // console.log(pw)
        // console.log(bcrypt.compareSync(pw, hclearash))
        if(bcrypt.compareSync(pw, hash)){
            console.log( pw, hash)
            break
        }
    }
}

//format in two single quotes
