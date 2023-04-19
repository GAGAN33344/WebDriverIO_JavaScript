describe("Windows and Frames Miscellanous", async ()=>
{
 xit("Parent and Child windows switch", async ()=>
 {
   await browser.url("/loginpagePractise/")
   console.log(await browser.getTitle())
   await $(".blinkingText").click()
   const windowHandles = await browser.getWindowHandles()
   await browser.switchToWindow(windowHandles[1])
   await $("h1").waitForExist()
   await expect(browser).toHaveTitleContaining("Rahul Shetty Academy")
   console.log(await $("h1").getText())
   await browser.closeWindow()
   //await browser.pause(3000)
   await browser.switchToWindow(windowHandles[0])
   await expect(browser).toHaveTitleContaining("Rahul Shetty Academy")
   //************** 
   await browser.newWindow("https://google.com/")
   await browser.pause(2000)
   console.log(await browser.getTitle())
   await browser.switchWindow("http://www.rahulshettyacademy.com/loginpagePractise/")
   await $("#username").setValue("switchedBack")
   await browser.pause(2000)
 })
 
 it("Frames switch - Smoke", async ()=>
 {
   await browser.url("/AutomationPractice/")
   await $("#mousehover").scrollIntoView()
   console.log("Total links present on parent window : " + await $$("a").length)
   await browser.switchToFrame(await $("[id='courses-iframe']"))
   //await browser.pause(2000)
   console.log("Tag is : " + await $("=Courses").getTagName())
   console.log("Total links present on parent window frame : " + await $$("a").length)
   await browser.switchToParentFrame()
   // or
   //await browser.switchToFrame(null)
   console.log("Total links present on parent window : " + await $$("a").length)
 })  
})   