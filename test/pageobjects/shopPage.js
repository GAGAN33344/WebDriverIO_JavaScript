class ShopPage
{
    get checkout()
    {
        return $(".nav-item.active")
    }

    get cards()
    {
        return $$("div[class='card h-100']") 
    }

    async addProductsToCart(products)
    {
        for(let i=0; i< await this.cards.length; i++)
        {
            const card = await this.cards[i].$("div h4 a") //it would reach at card title location
            if(products.includes(await card.getText()))
            {
                await this.cards[i].$(".card-footer button").click()
            }
        }
    }
}

module.exports = new ShopPage()