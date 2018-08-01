import { MasterAnimeHoster } from './MasterAnimeHoster';

import { MasterAnimeAPI } from 'masteranime-api';
import { HosterData, HosterScrapper, Scrap } from 'sourcescrapper-core';

export interface MasterAnimeHosterData extends HosterData {
    data: MasterAnimeAPI;
    hosters: MasterAnimeHoster[];
}
export class MasterAnimeScrapper extends HosterScrapper<MasterAnimeHosterData> {
    public static Name: string = 'masteranime';
    public static Domains: string[] = ['masterani.me'];
    public static UrlPattern: RegExp = /https?:\/\/(www\.)?masterani\.me\/anime\/watch\/(\d+-(?:\w+-)+\w+)\/(\d+)/i;
    public static async scrap(url: string): Promise<Scrap<MasterAnimeHosterData>> {
        return new MasterAnimeScrapper().scrap(url);
    }
    public name: string = MasterAnimeScrapper.Name;
    public domains: string[] = MasterAnimeScrapper.Domains;
    public urlPattern: RegExp = MasterAnimeScrapper.UrlPattern;
    protected async run(url: string): Promise<MasterAnimeHosterData> {
        const data = await MasterAnimeAPI.getEpisodeDetailedFromUrl(url);
        return {
            data,
            title: data.anime.info.title,
            hosters: data.mirrors.map(e => new MasterAnimeHoster({
                name: e.host.name,
                quality: e.quality,
                url:
                (e.host.embed_prefix || '').replace(/\\\//g, '/') +
                e.embed_id +
                (e.host.embed_suffix || ''),
                host_id: e.host_id,
                embed_id: e.embed_id,
                host: e.host,
                type: e.type
            }))
        };
    }
}