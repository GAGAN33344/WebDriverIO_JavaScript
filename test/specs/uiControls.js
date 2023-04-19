const expectChai = require('chai').expect

describe("UI Controls Test Suite", async ()=>
{

 it("UI Controls - Smoke", async ()=> 
 {   await browser.url("/loginpagePractise/")
     await $("#username").setValue("rahulshettyacademy") //use css locator
     const password = await $("//input[@type='password']")//use XPath locator
     await password.setValue("learning")
     //what if multiple elements $$ 
     const radioButtons = await $$(".customradio")
     const userRadioButton = await radioButtons[1]
     await userRadioButton.$("span").click()  //chaining locators
     const modal = await $(".modal-body")
     await modal.waitForDisplayed()
     await $("#cancelBtn").click()
     console.log(await $$(".customradio")[0].$("span").isSelected())
     await userRadioButton.$("span").click() 
     await modal.waitForDisplayed()
     await $("#okayBtn").click()
     //validate pop up not shown up when you select admin
     await $$(".customradio")[0].$("span").click()
     await expect(modal).not.toBeDisabled()
     // Dropdowns
     const dropdown = await $("select.form-control")
     await dropdown.selectByAttribute('value','teach')
     const currentSelectedValue = await dropdown.getValue()
     console.log("currentSelectedValue is : " + currentSelectedValue)
     // chai assertions are used for comparison prospective and that are not avialable in webdriverIO - npm install chai
     expectChai(await dropdown.getValue()).to.equal("teach")

     //await $("#signInBtn").click()
     //await $(".btn-primary").waitForExist()
     //await expect(browser).toHaveUrlContaining("shop")
     //await expect(browser).toHaveTitle("ProtoCommerce")
  })

  xit("Dynamic Dropdowns", async () =>
  {
    await browser.url("/AutomationPractice/")
    await $("#autocomplete").setValue("ind")
    //await browser.pause(3000)
    let items = await $$("[class='ui-menu-item'] div")
    for(var i =0; i<await items.length;i++)
    {
      if(await items[i].getText() === "India")
      {
        await items[i].click()
        await browser.pause(3000)
      }
    }
  })

  it("Checkboxes Identification - Sanity", async () =>
  {
    await browser.url("/AutomationPractice/")
    const checkboxes = await  $$("input[type='checkbox']")
    await  checkboxes[1].click()
    console.log(await checkboxes[1].isSelected())
    //await browser.saveScreenshot("screenshot.png")  //use to take screenshot
  })
})