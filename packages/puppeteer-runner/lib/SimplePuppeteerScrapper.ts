import { IPuppeteerRunnerArgs, IPuppeteerRunnerOptions, PuppeteerRunner } from './PuppeteerRunner';

import { ISourceData, ISourceScrapper, Source, SourceRunnerScrapper } from 'sourcescrapper-core';

export class SimplePuppeteerScrapper
    extends SourceRunnerScrapper<
        ISourceData,
        IPuppeteerRunnerOptions,
        IPuppeteerRunnerArgs,
        PuppeteerRunner<ISourceData>>
    implements ISourceScrapper {
    public static Name: string = 'puppeteer';
    public static Domains: string[] = [];
    public static UrlPattern: RegExp = /.*/;
    public static Runner: PuppeteerRunner<ISourceData> = new PuppeteerRunner<ISourceData>();
    public name: string = SimplePuppeteerScrapper.Name;
    public domains: string[] = SimplePuppeteerScrapper.Domains;
    public urlPattern: RegExp = SimplePuppeteerScrapper.UrlPattern;
    public runner: PuppeteerRunner<ISourceData> = SimplePuppeteerScrapper.Runner;
    protected async runWithArgs({ page }: IPuppeteerRunnerArgs): Promise<ISourceData> {
        const raw = await page.evaluate(async () => {
            const sdata: {
                title?: string,
                poster?: string,
                sources: Array<{ url: string, type: string | null }>
            } = {
                sources: []
            };
            const videos = document.getElementsByTagName('video');
            for (const video of videos) {
                const source_attr = video.src;
                if (source_attr)
                    sdata.sources.push({
                        url: source_attr,
                        type: video.getAttribute('type')
                    });
                const poster = video.poster;
                if (poster)
                    sdata.poster = poster;
                const source_tags = video.getElementsByTagName('source');
                for (const source of source_tags) {
                    const ssrc = source.src;
                    if (ssrc)
                        sdata.sources.push({
                            url: ssrc,
                            type: source.getAttribute('type')
                        });
                }
            }
            const titles = document.getElementsByTagName('title');
            if (titles.length >= 1)
                sdata.title = titles[0].innerText;
            return Promise.resolve(sdata);
        });
        return {
            poster: raw.poster,
            title: raw.title,
            sources: raw.sources.map(e => new Source({
                url: e.url,
                type: e || undefined
            }))
        };
    }
}
