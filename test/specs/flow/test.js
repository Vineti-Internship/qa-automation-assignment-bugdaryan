const assert = require('assert');

const add_items_in_current_page = (prices,names) =>{
    const count = browser.elements('//*[@class = "sx-price-whole"]').value.length;
    for(let i = 1;i< count;i++){
        const price =  browser.element(`(//*[@class = 'sx-price-whole'])[${i}]`).getText();
        console.log(price)
        if(price < 70){
            prices.push(price);
            names.push(browser.element(`(//*[contains(@class ,"s-access-title")])[${i}]`).getText());
        }
    }
}

describe('Amazon', () => {
    describe('Searching tablet', () =>{
        it('Search is succesfull as expected', () => {
            browser.url("/");
            browser.setValue('//*[@id="twotabsearchtextbox"]', "tablet");
            browser.element("//*[@class = 'nav-input']").click();
            assert.equal('1-16 of over 90,000 results for "tablet"',browser.element('//*[@id = "s-result-count"]').getText());
        });
        it('Elements found as expected', () => {
            const prices = [];
            const names = [];
                while(prices.length < 15){
                    add_items_in_current_page(prices, names);
                    browser.element('//*[@id = "pagnNextString"]').click();
                }
            for(let i=0;i<prices.length;i++)
                console.log(`name: ${names[i]}\n`);
        })
    })
})