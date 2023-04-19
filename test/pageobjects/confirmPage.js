class ConfirmPage
{
    get countryBox()
    {
        return $("#country")
    }

    get loadingIcon()
    {
        return $(".lds-ellipsis")
    }

    get indiaTextLink()
    {
        return $("=India")
    }

    get termsAndConditions()
    {
        return $("label[for='checkbox2']")
    }

    get purchaseButton()
    {
        return $("input[value='Purchase']")
    }

    get successAlert()
    {
        return $(".alert-success")
    }

    async passValueInCountryBox(value)
    {
        await this.countryBox.setValue(value)
    }
}

module.exports = new ConfirmPage()