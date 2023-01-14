const fs = require('fs').promises
const path = require('path')

/**
 * Asynchronously export multiple SVG files inside the `dist` folder.
 *
 * @param {{variant: string, icons: any[]}} data the data returned by the `build` function.
 * @param {string} to the path to export the files (Default: dist).
 * @return {undefined} Fullfills with `undefined` on success.
 */
async function exportFiles(data, to = 'dist') {
  try {
    const { variant, icons } = data
    const outDir = path.resolve(__dirname, '../', to, variant)

    await fs.mkdir(outDir, { recursive: true })

    await Promise.all(
      icons.map(async (icon) => {
        const outFile = path.resolve(outDir, `${icon.filename}.svg`)

        return await fs.writeFile(outFile, icon.svg, { encoding: 'utf-8' })
      })
    )

    return undefined
  } catch (error) {
    return Promise.reject(error)
  }
}

module.exports = exportFiles
