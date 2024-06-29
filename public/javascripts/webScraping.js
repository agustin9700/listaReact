const axios = require('axios');
const cheerio = require('cheerio');
const db = require('../../dataBase/models');

let previousData = {};

async function fetchAndUpdateData() {
    try {
        const response = await axios.get('https://ninjakaizen.com/clan/101');
        const $ = cheerio.load(response.data);
        
        const datos = $('tbody tr:has(td:nth-child(4))').map((_, row) => ({
            Nombre: $(row).find('td:nth-child(2)').text().trim(),
            Reputacion: parseInt($(row).find('td:nth-child(4)').text().trim()) || 0
        })).get();

        for (let i = 0; i < datos.length; i++) {
            const element = datos[i];
            const previousRep = previousData[element.Nombre] || 0;
            const difference = element.Reputacion - previousRep;

            await db.Rank.update({
                nombre: element.Nombre,
                previarep: previousRep,
                reputacion: element.Reputacion,
                diferencia: difference
            },{
                where: {
                    nombre: element.Nombre
                }
            });

            previousData[element.Nombre] = element.Reputacion;
        }

        console.log('Data updated successfully');
    } catch (error) {
        console.error('Error updating data:', error);
    }
}

function startWebScraping() {
    // Run immediately
    fetchAndUpdateData();

    // Then run every 30 seconds
    setInterval(fetchAndUpdateData, 30000);

    console.log('Web scraping process started');
}

module.exports = {
    startWebScraping
};