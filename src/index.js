const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const build = require('./build')
const exportFiles = require('./exportFiles')

const solid = require('./schemas/solid.json')

const argv = yargs(hideBin(process.argv)).argv
const outDir = argv.o || argv.outDir

build(solid, { xml: argv.xml })
  .then((data) => exportFiles(data, outDir))
  .catch(() => process.exit(1))
