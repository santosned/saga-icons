const build = require('./build')
const exportFiles = require('./exportFiles')

const example = require('./schemas/example.json')

build(example, { xml: false, size: '24' })
  .then((data) => exportFiles(data))
  .catch(() => process.exit(1))
