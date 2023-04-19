describe("Ecommerce Application", async ()=>
{

 it("Login Fail page - Smoke", async function() 
 {   //javaScript line of code runs in asynchronous mode. for making it sequesnce mode means sync mode then we have to use await
     // Retry all tests in this suite up to 2 times, also need to use function(){} instead of a 
     //fat arrow function () => {}
     this.retries(2)
     await browser.url("/loginpagePractise/")
     console.log(await browser.getTitle())
     await expect(browser).toHaveTitleContaining("Rahul Shetty Academy")
     //Css selector, XPath
     await $("#username").setValue("rahulshettyacademy") //use css locator
     const password = await $("//input[@type='password']")//use XPath locator
     await password.setValue("learningsss") 
     await $("#signInBtn").click()
     await browser.waitUntil( async()=> await $("#signInBtn").getAttribute('value') === 'Sign In', 
     {
       timeout:5000,
       timeoutMsg: 'Error message is not showing'
     })
     const errorText = await $(".alert-danger").getText()
     console.log(errorText)
     await expect($("p")).toHaveTextContaining("username is rahulshettyacademy and Password is learning")
  })

 xit("Login Success page - Smoke", async ()=> 
 {   await browser.url("/loginpagePractise/")
     await expect(browser).toHaveTitleContaining("Rahul Shetty Academy")
     //Css selector, XPath
     await $("#username").setValue("rahulshettyacademy") //use css locator
     const password = await $("//input[@type='password']")//use XPath locator
     await password.setValue("learning") 
     await $("#signInBtn").click()
     await $(".btn-primary").waitForExist()
     await expect(browser).toHaveUrlContaining("shop")
     await expect(browser).toHaveTitle("ProtoCommerce")
  })
})