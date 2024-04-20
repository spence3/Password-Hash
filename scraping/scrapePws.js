import puppeteer from 'puppeteer'
import ProgressBar from 'progress-bar-cli'
import fs from 'fs'
import { exit } from 'process'

const main = async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch()
    const page = await browser.newPage()//opening a tab
    //ask the user for what page to start on
    const args = process.argv.slice(2)
    let pageNum = args
    let jsonPasswords = JSON.parse(fs.readFileSync('mcupws.json'))
    
    //user starts ahead of page fail
    if(pageNum * 100 >= jsonPasswords.length && jsonPasswords.length !== 0){console.log('consider deleting json'), exit()}

    // Set screen size
    await page.setViewport({width: 1080, height: 1024})
    let currPage = `https://www.passwordrandom.com/most-popular-passwords/page/${pageNum}`

    //going through each page to add passwords to json file
    while(await page.goto(currPage) && pageNum <= 1){
        //set page view
        await page.setViewport({width: 1080, height: 1024})
        //create passwords and filter
        let pws = await page.evaluate(() => [...(document.querySelectorAll(`td:nth-child(2)`))].map(td => td.innerText))
        pws = pws.filter((word) => /^[a-zA-Z0-9]+$/.test(word))

        // read current data from file and parse data from json file
        let jsonPasswords = JSON.parse(fs.readFileSync('mcupws.json'))

        // add new passwords to json password array
        pws.forEach(element => {
            jsonPasswords.push(element)
        })
        
        pageNum++
        currPage = `https://www.passwordrandom.com/most-popular-passwords/page/${pageNum}`

        fs.writeFileSync('mcupws.json', JSON.stringify(jsonPasswords, null, 2))
    }
  console.log(`Finished at page ${pageNum}`)

  await browser.close()
}
main()

//Code Graveyard
//COULD STILL USE THIS
    // let passwords = (JSON.stringify(body.map(row => ({
    //     password: row[1]
    //     })),null,2))


    //   fs.appendFileSync('mcupws.json',passwords,'utf-8')s


// [
//   {
//     'title': 'Password Array',
//     'passwords': [
      
//     ]
//   }
// ]