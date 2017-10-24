import {
  prepareForTests
} from './test'
import {
  createTestGenerator
} from './create-test'
import {
  Logger
} from './logger'

function isObject(obj) {
  return obj === Object(obj)
}
export function createTestsGenerator(config, opts) {
  opts = opts || config
  return new TestsGenerator(config, opts)
}

class TestsGenerator extends Logger {
  constructor(config, opts = {}) {
    super(opts)
    this.config = config
    this.configure()
  }

  async asyncGenerate(...methods) {
    this.prepare(methods)
    await this.asyncCreateApi()
    this.createTest()
  }

  configure() {
    this.prepare()
    this.createApi()
  }

  generate(...methods) {
    if (Array.isArray(methods[0])) {
      methods = methods[0]
    }
    this.methods = methods
    this.createTest()
  }

  prepare() {
    this.prepareForTests()
    this.resolveName()
  }

  prepareForTests() {
    prepareForTests()
  }

  resolveName() {
    const {
      config
    } = this
    let name
    if (typeof config === 'string') {
      name = config
    } else {
      name = config.name
    }
    this.name = name
  }

  createApi() {
    const {
      config,
      opts
    } = this
    this.log('createApi', {
      config,
      opts
    })

    const createApi = config.createApi
    this.validateCreateApi(createApi, config)
    const $api = createApi(opts)
    this.$api = $api
    this.resolveApi()
  }

  async asyncCreateApi() {
    const {
      config,
      opts
    } = this
    this.log('createApi', {
      config,
      opts
    })

    const createApi = config.createApi
    this.validateCreateApi(createApi, config)
    const $api = await createApi(opts)
    this.$api = $api
    this.resolveApi()
  }

  validateCreateApi(createApi, config) {
    if (!createApi) {
      this.error('Missing createApi function in configuration object', {
        createApi: config.createApi,
        config
      })
    }
  }

  resolveApi() {
    const {
      $api,
      name,
    } = this
    if (!$api) {
      this.error(`resolveApi: $api was not created and set`, {
        $api
      })
    }

    const namedApi = $api[name]
    if (!namedApi) {
      this.error(`resolveApi: no api found for ${name}`, {
        name,
        $api
      })
    }
    const api = namedApi.promised || namedApi
    if (!api) {
      this.error(`resolveApi: no .promised api found for ${name}`, {
        namedApi
      })
    }
    this.log('createApi: created', {
      api
    })
    this.api = api
  }

  resolveTemplate() {
    const {
      name,
      config,
      opts,
      api
    } = this
    const templates = config.templates || defaultTemplates
    let template = templates[name]
    if (!template) {
      this.error(`resolveTemplate: could not resolve template ${name} in templates`, {
        templates,
        name
      })
    }
    template.api = api
    this.log('resolveTemplate', {
      name,
      template,
    })
    this.template = template
  }

  createTest() {
    this.resolveTemplate()
    let {
      methods,
      template,
      opts
    } = this
    this.testMethodGenerator = createTestGenerator(template, opts)

    if (methods.length === 0) {
      if (!isObject(template.methods)) {
        this.error(`createTest: .methods property of template must be a map of methods => test configuration (ie. an Object), was: ${typeof template.methods}`)
      }
      methods = Object.keys(template.methods)
    }
    this.log('createTest: generate test for each method', {
      methods
    })

    methods.map(method => {
      this.generateMethodTest(method)
    })
  }

  generateMethodTest(method) {
    return this.testMethodGenerator.generateForMethod(method)
  }
}
