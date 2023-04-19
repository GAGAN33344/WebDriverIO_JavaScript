const expectChai = require('chai').expect
describe('Ecommerce Application', async ()=>
{
it('End to End Test', async ()=>
{
    const products = ['iphone X','Blackberry']
    await browser.url("/loginpagePractise/")
    browser.maximizeWindow()
    await expect(browser).toHaveTitleContaining("Rahul Shetty Academy")
    //Css selector, XPath
    await $("#username").setValue("rahulshettyacademy") //use css locator
    const password = await $("//input[@type='password']")//use XPath locator
    await password.setValue("learning") 
    await $("#signInBtn").click()
    const link = await $("*=Checkout")
    await link.waitForExist() //* helps to find partial link text
    const cards = await $$("div[class='card h-100']") //it would store list of elements
    for(let i=0; i< await cards.length; i++)
    {
        const card = await cards[i].$("div h4 a") //it would reach at card title location
        if(products.includes(await card.getText()))
        {
            await cards[i].$(".card-footer button").click()
        }
    }
    await link.click()
    //await browser.pause(3000)
    const productPrices = await $$("//tr/td[4]/strong")
    const sumOfProducts = (await Promise.all(await productPrices.map(async (productPrice) => parseInt((await productPrice.getText()).split(".")[1].trim()))))
    .reduce((acc,price)=>acc+price,0) // this whole line of code would iterate, get text, convert to integar and sum
    console.log(sumOfProducts)
    //await browser.pause(3000)
    const actualTotalValue = await $("td[class='text-right'] h3 strong").getText()
    const actualTotalIntSum = parseInt(actualTotalValue.split(".")[1].trim())
    await expectChai(sumOfProducts).to.equal(actualTotalIntSum)
    await $(".btn-success").click()
    const checkoutlink = await $("*=Checkout")
    await checkoutlink.waitForExist()
    await $("#country").setValue("Ind")
    await $(".lds-ellipsis").waitForExist({reverse:true})
    await $("=India").click()
    await $("label[for='checkbox2']").click()
    //await browser.pause(3000)
    await $("input[value='Purchase']").click()
    await expect($(".alert-success")).toHaveTextContaining("Success")
    //await browser.pause(3000)
})
})