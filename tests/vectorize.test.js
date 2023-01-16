const vectorize = require('../src/vectorize')
const XMLSchema = require('../src/schemas/XML.json')

const { SVGSchema } = require('./schemas.json')

describe('vectorize', () => {
  it('generates schema string representation', async () => {
    const vectors = await vectorize(SVGSchema)

    expect(typeof vectors).toBe('string')
    expect(vectors).toBe(
      '<svg viewBox="0 0 24 24" width="24" height="24"><g><path d="C 1.111 Z"/></g></svg>'
    )
  })

  it('supports multiple schemas', async () => {
    const vectors = await vectorize(XMLSchema, SVGSchema)

    expect(vectors).toBe(
      '<?xml version="1.0" encoding="utf-8"?><svg viewBox="0 0 24 24" width="24" height="24"><g><path d="C 1.111 Z"/></g></svg>'
    )
  })

  it('supports SVG schema starting with childNodes', async () => {
    await expect(vectorize({ childNodes: [{ tag: 'g' }] })).resolves.toMatch(
      '<g/>'
    )
  })

  it('throws when schema is invalid', async () => {
    await expect(vectorize()).rejects.toThrow()
    await expect(vectorize({})).rejects.toThrow()
    await expect(vectorize(null)).rejects.toThrow()
    await expect(vectorize(undefined)).rejects.toThrow()
    await expect(
      vectorize({ tag: 'g', childNodes: [undefined] })
    ).rejects.toThrow()
  })
})
