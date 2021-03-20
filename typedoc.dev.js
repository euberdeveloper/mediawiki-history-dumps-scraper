module.exports = {
    entryPoints: [
        './source'
    ],
    name: 'whdt-scraper - DEV',
    tsconfig: 'source/tsconfig.json',
    gaID: process.env.GA_TOKEN,
    out: './docs/documentation/html-dev'
};