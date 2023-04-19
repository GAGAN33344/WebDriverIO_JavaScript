const expectChai = require('chai').expect

describe("Functional Testing on Application", async ()=>
{

 xit("Scrolling and Mouse hover", async ()=> 
 {
   await browser.url("/AutomationPractice/")
   $("#mousehover").scrollIntoView()
   await browser.pause(2000)
   $("#mousehover").moveTo()
   await browser.pause(2000)
   $("=Top").click()
   await browser.pause(2000)

   browser.url("http://only-testing-blog.blogspot.com/2014/09/selectable.html")
   await $("button").doubleClick()
   console.log(await browser.isAlertOpen())
   expectChai(await browser.isAlertOpen()).to.be.true
   expectChai(await browser.getAlertText()).to.equal("You double clicked me.. Thank You..")
   await browser.pause(2000)
   await browser.acceptAlert()
   await browser.pause(2000)
 })

 xit("Web Tables Sort Validation",async ()=> 
 {
  await browser.url("/seleniumPractise/#/offers")
  await $("tr th:nth-child(1)").click()
  const veggieLocators =$$("tr td:nth-child(1)")  //list of locators for all rows and first column
  const originalVeggieNames =await veggieLocators.map(async veggie=>await veggie.getText()) //it would iterate all locators, get text and store in new array
  console.log("Before Sorting order is : " + originalVeggieNames)
  veggies = originalVeggieNames.slice() // it would return exact copy of string names and store in new array
  //Arrays are pass by reference
  sortedVeggies = veggies.sort() // sorting array and store in new array
  console.log("After Sorting order is : " + sortedVeggies)
  expectChai(originalVeggieNames).to.eql(sortedVeggies) // compare sorted and unsorted array to check values has been sorted or not
 })

 it("Web Tables Filter Validation - Smoke",async ()=> 
 {
  await browser.url("/seleniumPractise/#/offers")
  await $("input[type='search']").setValue("tomato")
  const veggieLocators =await $$("tr td:nth-child(1)")  //list of locators for all rows and first column
  await expect(veggieLocators).toBeElementsArrayOfSize({eq:1})
  console.log(await veggieLocators[0].getText())
  await expect(await veggieLocators[0]).toHaveTextContaining("Tomato")
 })
}) 