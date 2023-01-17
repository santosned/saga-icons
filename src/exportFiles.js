const AdmZip = require('adm-zip')
const fs = require('fs').promises
const path = require('path')

/**
 * Asynchronously export multiple SVG files.
 *
 * @param {{variant: string, icons: any[]}} data the data returned by the `createSVG` module.
 * @param {string} to the path to export the files (Default: 'icons').
 * @param {boolean} compressData control if should compress the SVG files or not (Default: false).
 * @return {undefined} Fullfills with `undefined` on success.
 */
async function exportFiles(data, to = 'icons', compressData = false) {
  const { variant, type, icons } = data
  const outDir = path.resolve(__dirname, '../', to, variant, type)
  const licenseFile = path.resolve(__dirname, '../', 'LICENSE.txt')
  const licenseOutFile = path.resolve(outDir, 'LICENSE.txt')

  try {
    await fs.mkdir(outDir, { recursive: true })

    await Promise.all(
      icons.map(async (icon) => {
        const outFile = path.resolve(outDir, `${icon.filename}.svg`)

        try {
          const fileData = new Uint8Array(Buffer.from(icon.svg))
          return await fs.writeFile(outFile, fileData)
        } catch (err) {
          return Promise.reject(err)
        }
      })
    )

    await fs.copyFile(licenseFile, licenseOutFile)

    if (!compressData) return undefined

    const zip = new AdmZip()
    const releaseFile = path.resolve(
      __dirname,
      '../',
      to,
      `${variant}-24x24.${type}-icons.zip`
    )

    zip.addLocalFolder(outDir)

    await zip.writeZipPromise(releaseFile, { overwrite: true })

    await fs.rm(path.resolve(__dirname, '../', to, variant), {
      force: true,
      recursive: true,
    })

    return undefined
  } catch (error) {
    return Promise.reject(error)
  }
}

module.exports = exportFiles
