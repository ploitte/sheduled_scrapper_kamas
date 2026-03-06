const fs = require('fs');
const scrape = require('./scrape');

async function run() {

    const prices = await scrape();

    const entry = {
        date: new Date().toISOString(),
        paypal: prices.Paypal,
        bitcoin: prices.Bitcoin
    };

    let data = [];

    if (fs.existsSync('prices.json')) {
        data = JSON.parse(fs.readFileSync('prices.json'));
    }

    data.push(entry);

    fs.writeFileSync('prices.json', JSON.stringify(data, null, 2));

    console.log("Saved:", entry);
}

run();