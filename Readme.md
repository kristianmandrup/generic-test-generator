# Generic test generator

[![Greenkeeper badge](https://badges.greenkeeper.io/kristianmandrup/generic-test-generator.svg)](https://greenkeeper.io/)

Similar to [test-generator](https://www.npmjs.com/package/test-generator) but more customizable so you can make it work with whatever test, mocking and assertion libraries that suit you best.

## Usage

```js
import {
  TestsGenerator,
  createTestsGenerator
} from 'generic-test-generator'

const generator = createTestsGenerator({
  name: 'commits',
  // logging: true
})

generator.generate('get', 'commit')
```

## Default settings

By default the generator will use the following libraries:

- ava (test runner)
- nock (for mocking)

You can subclass `TestsGenerator` (and the other classes provided) to override these defaults to suit your particular needs.

- `TestsGenerator`
- `TestGenerator`
- `TestCase`

## TODO

I the near future we aim to refactor to have only two classes:

- `TestGenerator` - create the engine for generating test cases
- `TestCase` - generate a single test case

## Customization

You can supply the following in the `config` object:

- `guessHttpVerb` function to guess the httpVerb based on method name
- ...

## Testing

`$ npm test`

## License

MIT
