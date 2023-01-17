const vectorize = require('./vectorize')

/**
 * Create an valid SVG formatted string from schemas.
 *
 * @param {object} variantSchema the icon variant schema.
 * @param {{xml: boolean}} buildOptions the createSVG options to control XML compatibility.
 * @return {Promise<{variant: string, type: string, icons: any[]}>} returns the variant name and all the SVG icons.
 */
async function createSVG(variantSchema, buildOptions = { xml: false }) {
  const xml = buildOptions.xml ? true : false

  /**
   * The `width` and `height` of the SVG icons to be generated.
   */
  const size = 24

  const variant = variantSchema.name
  const type = xml ? 'xml' : 'web'
  const schemas = Object.keys(variantSchema.icons)

  const XMLSchema = !xml ? undefined : require('./schemas/XML.json')

  const vectors = await Promise.all(
    schemas.map(async (value, index) => {
      const { keywords, drawn } = variantSchema.icons[index]

      const filename = `${keywords.join('-')}-${size}x${size}`

      const SVGSchema = {
        tag: 'svg',
        attributes: {
          viewBox: `0 0 ${size} ${size}`,
          width: size,
          height: size,
          xmlns: xml ? 'http://www.w3.org/2000/svg' : undefined,
        },
        childNodes: [
          {
            tag: 'g',
            childNodes: [
              {
                tag: 'path',
                attributes: { d: drawn },
              },
            ],
          },
        ],
      }

      return {
        filename: filename,
        svg: await vectorize(XMLSchema, SVGSchema),
      }
    })
  )

  return { variant, type, icons: vectors }
}

module.exports = createSVG
