# Bubanai - Puppeteer wrapper library (under construction)

![CI build](https://github.com/wix-incubator/bubanai/actions/workflows/main.yml/badge.svg)
[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/wix-incubator/chimney/blob/master/LICENSE)

**Bubanai** - in Hebrew, it's a person that builds the puppets and operates them

A testing library to simplify the usage of raw Puppeteer methods

## Getting started

To use Bubanai in your project, run command using yarn:

```bash
yarn add --dev bubanai
```

Or npm

```bash
npm install --save-dev bubanai
```

## Usage/Example

```js
const { click, getText } = require('bubanai');
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://example.com/');
  await click(page, 'a');

  const mainText = await getText(page, 'h1');
  expect(mainText).toContain('IANA');

  await browser.close();
})();

```

## Development

Clone the repository and navigate to the project folder

```bash
  git clone git@github.com:wix-incubator/bubanai.git
  cd bubanai
```

Install the required dependencies

```bash
  yarn install
```

## Running Tests

To run tests, run the following command:

```bash
  yarn test
```

## API Reference

Explore the [API](https://wix-incubator.github.io/bubanai/modules.html) on the GitHub pages

## Documentation

Bubanai documentation is available at https://wix-incubator.github.io/bubanai.

It's generated automatically on updating the `main` branch.

### Building documentation locally

To build the documentation locally, you need to execute the following command in the project's root directory:

```bash
  yarn generate-api
```

HTML Documentation will be generated in the `docs` folder
