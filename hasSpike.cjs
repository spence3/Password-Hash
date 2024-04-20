const bcrypt = require('bcryptjs')
const samplePWS = require('./scraping/mcupws.json')


const alphabet = 'abc'//defghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0987654321'

samplePWS.push('')
samplePWS.push(...pwsUpToLenN(1))
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

function main(){
    // for(let pw of pwsUpToLenN(3)){
    //     console.log(pw)
    // }

    for(let pw of samplePWS.slice(-3)){
        console.log(bcrypt.hashSync(pw,4))
    }
}

main()

//encrypt passwod
// for(let i = 0; i <25; i++){
//     console.time('hash')
//     const hash = bcrypt.hashSync('bacon', 4)
//     console.log(hash)
//     console.timeEnd('hash')
// }

// console.log(hash)
// //compare a hash against the hash for monkeybutt
// console.log(bcrypt.compareSync('bacon', hash))//true
// console.log(bcrypt.compareSync('not_bacon', hash))//false



// function* pwsOfLen2(){
    //     for(let ch1 of alphabet){
    //         for(ch2 of pwsOfLen1()){
    //             yield `${ch1}${ch2}`
    //         }
    //     }
    // }
    

    // function* pwsOfLen1(){
    //     yield* alphabet
    // }


    // function* pwsUpToLen3(){
        //     for(let i = 1; i <= 3; i++){
        //         yield* pwsOfLenN(i)
        //     }
        //     // yield* pwsOfLen1()
        //     // yield* pwsOfLen2()
        //     // yield* pwsOfLen3()
        // }