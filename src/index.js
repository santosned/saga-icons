const build = require('./build')
const exportFiles = require('./exportFiles')

const solid = require('./schemas/solid.json')

build(solid, { xml: false, size: '24' })
  .then((data) => exportFiles(data))
  .catch(() => process.exit(1))
