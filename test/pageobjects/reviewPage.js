class ReviewPage
{
    get productPrices()
    {
        return $$("//tr/td[4]/strong")
    }

    get totalOfProducts()
    {
        return $("td[class='text-right'] h3 strong")
    }

    get checkoutButton()
    {
        return $(".btn-success")
    }

    async sumOfProducts()
    {
      const sumOfProducts = (await Promise.all(await this.productPrices.map(async (productPrice) => parseInt((await productPrice.getText()).split(".")[1].trim()))))
      .reduce((acc,price)=>acc+price,0) // this whole line of code would iterate, get text, convert to integar and sum
      console.log(sumOfProducts)
    }

    async totalFormattedPrice()
    {
      const actualTotalValue = await this.totalOfProducts.getText()
      const actualTotalIntSum = parseInt(actualTotalValue.split(".")[1].trim())
    }
}

module.exports = new ReviewPage()