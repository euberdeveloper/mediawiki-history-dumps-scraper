/**
 * The interface of a generic resource (has url)
 */
export interface Resource {
    /**
     * The url of the resource
     */
    url: string;
}

/**
 * The interface of a Dump, returned by the [[fetchDumps]] function
 */
export interface Dump extends Resource {
    /**
     * The filename (e.g. `2021-01.itwiki.2020.tsv.bz2`)
     */
    filename: string;
    /**
     * The time of the content of the file (e.g. 'all-time' or '2020' or '2020-01')
     */
    time: string;
    /**
     * The last update date
     */
    lastUpdate: Date;
    /**
     * The size in bytes of the file
     */
    bytes: number;
    /**
     * The start date of the content. (null if unknown)
     */
    from: Date | null;
    /**
     * The end date of the content. (null if unknown)
     */
    to: Date | null;
}

/**
 * The interface of a Wiki, returned by the [[fetchWikies]] function
 */
export interface Wiki extends Resource {
    /**
     * The wiki name (e.g. 'itwiki')
     */
    wiki: string;
    /**
     * The dumps of the wiki.
     */
    dumps?: Dump[];
}

/**
 * The interface of a Version, returned by the [[fetchLatestVersion]] or [[fetchVersions]] functions.
 */
export interface Version extends Resource {
    /**
     * The version (e.g. '2020-01')
     */
    version: string;
    /**
     * The wikies of the version.
     */
    wikies?: Wiki[];
}

/**
 * The options of the [[fetchDumps]] function.
 */
export interface DumpOptions {
    /**
     * All the dumps before this date will be not considered.
     */
    start?: Date;
    /**
     * All the dumps after this date will be not considered.
     */
    end?: Date;
}

/**
 * The options of the [[fetchWikies]] function.
 */
export interface WikiOptions extends DumpOptions {
    /**
     * The lang of the wikies to consider.
     * Note: this is checked by checking if the wiki name starts with this value.
     */
    lang?: string;
    /**
     * The wiki type of the wikies to consider.
     * Note: this is checked by checking if the wiki name ends with this value.
     */
    wikitype?: string;
    /**
     * If for each wiki, its dumps will be fetched.
     */
    dumps?: boolean;
}

/**
 * The options of the [[fetchLatestVersion]] or [[fetchVersions]] functions.
 */
export interface VersionOptions extends WikiOptions {
    /**
     * If for each version, its wikies will be fetched.
     */
    wikies?: boolean;
}
