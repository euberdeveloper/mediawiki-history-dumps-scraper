import { DumpOptions, VersionOptions, WikiOptions } from 'mhdscraper';

function extractQueryParam(
    queryParams: Record<string, string | string[] | undefined>,
    key: string
): string | undefined {
    const rawValue = queryParams[key];

    if (rawValue === undefined) {
        return undefined;
    }

    return typeof rawValue === 'string' ? rawValue : rawValue[rawValue.length - 1];
}

export function parseDumpQueryParams(queryParams: Record<string, string | string[] | undefined>): DumpOptions {
    const from = extractQueryParam(queryParams, 'from');
    const to = extractQueryParam(queryParams, 'to');

    return {
        start: from ? new Date(from) : undefined,
        end: to ? new Date(to) : undefined
    };
}

export function parseWikiQueryParams(queryParams: Record<string, string | string[] | undefined>): WikiOptions {
    const lang = extractQueryParam(queryParams, 'lang');
    const wikitype = extractQueryParam(queryParams, 'wikitype');
    const dumps = extractQueryParam(queryParams, 'dumps');
    const dumpOptions = parseDumpQueryParams(queryParams);

    return {
        lang,
        wikitype,
        dumps: dumps === 'true',
        ...dumpOptions
    };
}

export function parseVersionQueryParams(queryParams: Record<string, string | string[] | undefined>): VersionOptions {
    const wikies = extractQueryParam(queryParams, 'wikies');
    const wikiOptions = parseWikiQueryParams(queryParams);

    return {
        wikies: wikies === 'true',
        ...wikiOptions
    };
}
