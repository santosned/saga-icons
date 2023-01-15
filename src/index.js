const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const createSVG = require('./createSVG')
const exportFiles = require('./exportFiles')

const solid = require('./schemas/solid.json')

const argv = yargs(hideBin(process.argv)).argv
const outDir = argv.o || argv.outDir

createSVG(solid, { xml: argv.xml })
  .then((data) => exportFiles(data, outDir))
  .catch(() => process.exit(1))
