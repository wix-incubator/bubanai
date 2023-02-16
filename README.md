# Bubanai - Puppeteer Wrapper Library

![CI build](https://github.com/wix-incubator/bubanai/actions/workflows/main.yml/badge.svg)
[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/wix-incubator/chimney/blob/master/LICENSE)

###### [API](https://wix-incubator.github.io/bubanai/modules/src.html) | [FAQ](#faq)

> **Bubanai** - in Hebrew, it's a person that builds the puppets and operates them. A testing library to simplify the usage of raw Puppeteer methods

The purposes of the library are:

- simplification the usage of the Puppeteer methods by adding the wait inside of the generic methods like click and hover
- introducing quick methods to get the element attributes/properties
- adding wait functions for element, for example, wait for element visibility/invisibility
- adding methods to work with pages/frames
- adding methods to work with element collections

## Getting Started

### Installation

To use Bubanai in your project, run command using yarn:

```bash
yarn add --dev bubanai-ng
```

Or npm

```bash
npm install --save-dev bubanai-ng
```

### Usage

To use the library just import the required methods

```js
const { click, getText } = require('bubanai-ng');
```

or

```typescript
import { click, getText } from 'bubanai-ng';
```

Most of the methods work with `css selector` or `ElementHandle`. An example with usage `click` and `getText` methods

```js
const { click, getText } = require('bubanai-ng');
const puppeteer = require('puppeteer');
const assert = require('assert');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://example.com/');
  await click(page, 'a');

  const mainText = await getText(page, 'h1');
  assert.match(mainText, /IANA/);

  await browser.close();
})();
```

### Advanced Usage

You can specify how to search for an element while passing the selector

```js
const { getText } = require('bubanai-ng');
const puppeteer = require('puppeteer');
const assert = require('assert');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://example.com/');

  const mainText = await getText(page, 'h1', { timeout: 3000, visible: true });
  assert.equal(mainText, 'Example Domain');

  await browser.close();
})();
```

In the next example, we are typing the value into the frame without clearing its content

```js
const { type, getText, getFrameByName } = require('bubanai-ng');
const puppeteer = require('puppeteer');
const assert = require('assert');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const newTextValue = 'Additional content. ';
  const areaSelector = 'body';
  const frameSelector = 'mce_0_ifr';

  await page.goto('http://the-internet.herokuapp.com/tinymce');
  const frame = await getFrameByName(page, frameSelector);

  const currentText = await getText(frame, areaSelector);

  await type(
    newTextValue,
    frame,
    areaSelector,
    {},
    { clearInput: false },
    page,
  );
  const newText = await getText(frame, areaSelector);
  assert.equal(newText, newTextValue + currentText);

  await browser.close();
})();

```

More examples can be found in [tests](https://github.com/wix-incubator/bubanai/tree/main/tests)

## API Reference

Explore the [API](https://wix-incubator.github.io/bubanai/modules/src.html) on the GitHub pages

## Development

Clone the repository and navigate to the project folder

```bash
  git clone git@github.com:wix-incubator/bubanai.git
  cd bubanai
```

Install the required dependencies

```bash
  yarn install
  # or "npm i"
```

### Running Tests

To run tests, execute the following command:

```bash
  yarn test
  # or "npm run test"
```

## Documentation

Bubanai documentation is available at https://wix-incubator.github.io/bubanai.

It's generated automatically on updating the `main` branch.

### Building documentation locally

To build the documentation locally, you need to execute the following command in the project's root directory:

```bash
  yarn generate-api
  # or "npm run generate-api"
```

HTML Documentation will be generated in the `docs` folder

## Contributing

We'd love to have your helping hand on making `Bubanai` even better!
More details TBD.

## FAQ

#### Q: Does the library introduce the new behavior?

No, everything is written using the Puppeteer API.

#### Q: Is the library the replacement for the Puppeteer?

No, the library works together with Puppeteer, it just simplifies the usage by wrapping some methods which allow to concentrate more on the test writing and makes tests more stable.
