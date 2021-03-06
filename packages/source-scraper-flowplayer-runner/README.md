# source-scraper-flowplayer-runner

[![Build Status](https://travis-ci.org/OpenByteDev/SourceScraper.svg?branch=master)](https://travis-ci.org/OpenByteDev/SourceScraper)
[![npm version](https://badge.fury.io/js/source-scraper-flowplayer-runner.svg)](https://www.npmjs.com/package/source-scraper-flowplayer-runner)
[![Dependency Status](https://david-dm.org/OpenByteDev/SourceScraper/status.svg?path=packages%2Fsource-scraper-flowplayer-runner)](https://david-dm.org/OpenByteDev/SourceScraper?path=packages%2Fsource-scraper-flowplayer-runner)
[![DevDependency Status](https://david-dm.org/OpenByteDev/SourceScraper/dev-status.svg?path=packages%2Fsource-scraper-flowplayer-runner)](https://david-dm.org/OpenByteDev/SourceScraper?path=packages%2Fsource-scraper-flowplayer-runner&type=dev)
[![License](https://img.shields.io/github/license/mashape/apistatus.svg)](https://opensource.org/licenses/MIT)
[![Doge](https://img.shields.io/badge/doge-wow-yellow.svg)]()

Provides the [FlowplayerRunner](https://openbytedev.github.io/SourceScraper/packages/source-scraper-flowplayer-runner/docs/classes/flowplayerrunner.html) class for scrapping.

This package is part of the [SourceScraper-Project](https://github.com/OpenByteDev/SourceScraper).


## Getting Started
### Installation
```bash
$ npm i source-scraper-flowplayer-runner
```


### Usage

```js
const { FlowplayerRunner } = require('source-scraper-flowplayer-runner');

(async () => {
    const url = 'some url';
    const data = await new FlowplayerRunner().run(url, args => {
        // Extract data using args
    });
    // Do something with extracted data
})();
```


### API
The API generated with [TypeDoc](http://typedoc.org/) can be found [here](https://openbytedev.github.io/SourceScraper/packages/source-scraper-flowplayer-runner/docs/).
