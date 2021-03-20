import axios from 'axios';

/**
 * The wiki url of the "Wikimedia history dump - tsv"
 */
export const WIKI_URL = 'https://dumps.wikimedia.org/other/mediawiki_history';

/**
 * Scrapes some data from the html of a url.
 * @param url The url to scrape
 * @param regex h regex of the scraping
 * @returns The scraped data
 */
export async function scrape(url: string, regex: RegExp): Promise<string[]> {
    const response = await axios.get(url);
    const html: string = response.data;
    const matches = html.matchAll(regex);
    return [...matches].map(match => match[1]);
}

/**
 * Scrapes some data from the html of a url, by using the regexps' groups.
 * @param url The url to scrape
 * @param regex The regex of the scraping
 * @param groups The groups that will be extracted by the regex.
 * @returns The scraped data
 */
export async function scrapeMultiple(url: string, regex: RegExp, groups: string[]): Promise<any[]> {
    const response = await axios.get(url);
    const html: string = response.data;
    const matches = html.matchAll(regex);
    return [...matches].map(match =>
        groups.reduce(
            (result, group) => ({
                ...result,
                [group]: match.groups?.[group] ?? null
            }),
            {}
        )
    );
}
