const loginPage = require('../pageobjects/loginPage')
const shopPage = require('../pageobjects/shopPage')
const reviewPage = require('../pageobjects/reviewPage')
const confirmPage = require('../pageobjects/confirmPage')
const expectChai = require('chai').expect
const fs = require('fs')
let credentials = JSON.parse(fs.readFileSync('test/testData/loginTest.json')) 
let e2ecredentials = JSON.parse(fs.readFileSync('test/testData/e2eTestData.json')) 
describe("Ecommerce Application", async ()=>
{

 credentials.forEach( ({username, password})=>{ //these parameters helps to grab value for json file 
 xit("Login Fail page", async ()=> 
 {   //javaScript line of code runs in asynchronous mode. for making it sequesnce mode means sync mode then we have to use await
     await browser.url("/loginpagePractise/")
     browser.maximizeWindow()
     console.log(await browser.getTitle())
     await expect(browser).toHaveTitleContaining("Rahul Shetty Academy")
     await loginPage.Login(username,password)
     await console.log(await loginPage.alert.getText())
     await browser.waitUntil(async()=> await loginPage.signIn.getAttribute('value') === 'Sign In', 
     {
       timeout:5000,
       timeoutMsg: 'Error message is not showing'
     })
     await console.log(await loginPage.alert.getText())
     await expect(await loginPage.textInfo).toHaveTextContaining("username is rahulshettyacademy and Password is learning")
  })
})

e2ecredentials.forEach( ({username, password, products})=>{
 it('End to End Test', async ()=>
  {
      //var products = ['iphone X','Blackberry']
      await browser.url("/loginpagePractise/")
      browser.maximizeWindow()
      await expect(browser).toHaveTitleContaining("Rahul Shetty Academy")
      await loginPage.Login(username,password)
      await shopPage.checkout.waitForExist()
      await shopPage.addProductsToCart(products)
      await shopPage.checkout.click()
      //await browser.pause(3000)
      const sumOfProducts = await reviewPage.sumOfProducts()
      //await browser.pause(3000)
      const actualTotalIntSum = await reviewPage.totalFormattedPrice()
      await expectChai(sumOfProducts).to.equal(actualTotalIntSum)
      await reviewPage.checkoutButton.click()
      await shopPage.checkout.waitForExist()
      await confirmPage.passValueInCountryBox("Ind")
      await confirmPage.loadingIcon.waitForExist({reverse:true})
      await confirmPage.indiaTextLink.click()
      await confirmPage.termsAndConditions.click()
      //await browser.pause(3000)
      await confirmPage.purchaseButton.click()
      await expect(confirmPage.successAlert).toHaveTextContaining("Success")
      await browser.pause(1000)
  })  
})
})