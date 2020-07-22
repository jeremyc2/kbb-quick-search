const axios = require('axios');

var car = {
    make: 'dodge',
    model: 'charger',
    year: '2020',
    style: 's-sedan-4d',
    intent: 'buy-used',
    category: 'sedan',
    mileage: '162382',
    pricetype: 'retail',
    condition: 'good'
}

var subUrl = `/${car.make}/${car.model}/${car.year}`;

// Get the styles
var generalUrl = `https://www.kbb.com${subUrl}`;

var styles = axios.get(generalUrl)
    .then(response => {
        var data = response.data;
        var regex = new RegExp(`href="${subUrl}/([^/]*)/`, "g");
        var matches = data.matchAll(regex);

        matches = ([...matches].map(m => m[1])).filter(value => {
            return !/(consumer[-_]reviews)|(styles)/.test(value);
        });

        console.log(matches);
        return matches;

    })
    .catch(error => {
        console.log(error);
    });

var url = `${generalUrl}/${car.style}/?intent=${car.intent}&category=${car.category}&mileage=${car.mileage}&pricetype=${car.pricetype}&condition=${car.condition}`;