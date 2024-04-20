import puppeteer from 'puppeteer'
import fs from 'fs'

const main = async() =>{
     // Launch the browser and open a new blank page
     const browser = await puppeteer.launch()
     const page = await browser.newPage()//opening a tab
 
     // Set screen size
     await page.setViewport({width: 1080, height: 1024})
}