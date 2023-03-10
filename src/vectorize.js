/**
 * Transform objects into an string containing HTML formatted attributes.
 *
 * @param {any} attributes a object containing the attributes name and value.
 * @return {Promise<string>} an string with all the attributes transformed.
 */
async function attributeToString(attributes) {
  if (typeof attributes !== 'object') return Promise.resolve(undefined)
  const attribKeys = Object.keys(attributes)

  const attrib = await Promise.all(
    attribKeys.map(async (key) => {
      if (!attributes[key]) return undefined

      return `${key}="${attributes[key]}"`
    })
  )

  return Promise.resolve(attrib.filter((v) => typeof v === 'string').join(' '))
}

/**
 * Transforms an Javascript `Object` containing SVG properties into an SVG format string.
 *
 * @param {{tag: string, attributes: any, children: any}} schema the properties for the HTML format element.
 * @return {string} an string with all the properties combined.
 */
function stringify(schema) {
  const { tag } = schema

  let attrib = typeof schema.attributes !== 'string' ? '' : schema.attributes
  const children = typeof schema.children !== 'string' ? '' : schema.children

  attrib = attrib.length > 0 ? ` ${attrib}` : attrib

  if (children.length) return `<${tag}${attrib}>${children}</${tag}>`

  if (tag === 'xml') return `<?${tag}${attrib}?>`

  return `<${tag}${attrib}/>`
}

/**
 * Combine an schema containing SVG properties into a SVG formatted string.
 *
 * @param {{tag: string, attributes: any, children: any}} svgSchema an object containing the SVG properties.
 * @param {number|undefined} nestedNode the number of nested nodes.
 * @return {Promise<string>} an string containing the transformed properties.
 */
async function make(svgSchema, nestedNode) {
  try {
    if (typeof svgSchema !== 'object') {
      throw new TypeError(`${typeof svgSchema} isn't an valid SVG schema`)
    }

    if (!svgSchema.tag && !svgSchema.childNodes) {
      throw new TypeError("couldn't find tag or childNodes properties")
    }

    const currentNestedNode = nestedNode ?? 0
    const { tag, childNodes } = svgSchema

    const attributes = await attributeToString(svgSchema.attributes)

    let children = undefined

    if (childNodes instanceof Array) {
      const nodes = await Promise.all(
        childNodes.map(
          async (nodes) => await make(nodes, currentNestedNode + 1)
        )
      )
      children = nodes.join('')
    }

    if (!tag && children) return Promise.resolve(`${children}`)

    return Promise.resolve(stringify({ tag, attributes, children }))
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * Transform vector schemas into the SVG format.
 *
 * @param {{tag: string, attributes: any, children: any}} vectorSchema an object containing the SVG properties.
 * @param {{tag: string, attributes: any, children: any}[]} optionalParams additional object containing the SVG properties.
 * @return {Promise<string>} an string containing the SVG format properties.
 */
async function vectorize(vectorSchema, ...optionalParams) {
  const schemas = [vectorSchema, ...optionalParams].filter(
    (v) => typeof v === 'object'
  )

  try {
    if (!schemas.length) {
      throw new TypeError('vectorize expects one or more vector schemas.')
    }

    const vectors = await Promise.all(
      schemas.map(async (schema) => await make(schema))
    )

    return Promise.resolve(vectors.join(''))
  } catch (error) {
    return Promise.reject(error)
  }
}

module.exports = vectorize
