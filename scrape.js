const axios = require('axios');
const cheerio = require('cheerio');

async function scrape() {
    const url = 'https://www.leskamas.com/vendre-des-kamas.html';
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);

    let prices = [];

    $('table tr').each((_, tr) => {
        const tds = $(tr).find('td');
        const firstTdText = tds.first().text().trim();

        if (firstTdText.startsWith('Tylezia')) {
            prices = [
                tds.eq(1).text().trim(),
                tds.eq(2).text().trim()
            ];
            return false;
        }
    });

    const pricesObj = {
        Paypal: parseFloat(prices[0].replace(/[^\d.]/g, '')),
        Bitcoin: parseFloat(prices[1].replace(/[^\d.]/g, ''))
    };

    return pricesObj;
}

module.exports = scrape;