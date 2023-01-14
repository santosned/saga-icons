const vectorize = require('./vectorize')

/**
 * Builds the icon schema into an clean and valid SVG format.
 *
 * @param {object} variantSchema the icon variant schema.
 * @param {{xml: boolean}} buildOptions the build options to control XML compatibility.
 * @return {Promise<{variant: string, icons: any[]}>} returns the variant name and all the SVG icons.
 */
async function build(variantSchema, buildOptions = { xml: false }) {
  const xml = buildOptions.xml ? true : false

  /**
   * The `width` and `height` of the SVG icons to be generated.
   */
  const size = 24

  const variant = `${variantSchema.name}/${xml ? 'xml' : 'web'}-icons`
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

  return { variant, icons: vectors }
}

module.exports = build
