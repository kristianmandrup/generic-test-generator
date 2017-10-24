import {
  TestsGenerator,
  createTestsGenerator
} from '../src'

createTestsGenerator({
  name: 'commits',
  logging: true
}).generate()
