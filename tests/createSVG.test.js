const createSVG = require('../src/createSVG.js')
const schemas = require('./schemas.json')

describe('createSVG', () => {
  it('instantiate with the mock schema', async () => {
    const data = await createSVG(schemas.mock)

    expect(data).toHaveProperty('variant')
    expect(data).toHaveProperty('icons')
    expect(data.variant).toBe('mock')
    expect(data.type).toBe('web')
    expect(data.icons).toHaveLength(schemas.mock.icons.length)
  })

  it('generates valid icons', async () => {
    const data = await createSVG(schemas.mock)

    const { svg, filename } = data.icons[0]

    expect(filename).toBe('test-mock-24x24')
    expect(svg).toBe(
      '<svg viewBox="0 0 24 24" width="24" height="24"><g><path d="C 1.111 Z"/></g></svg>'
    )
  })

  it('supports XML compatible vectors', async () => {
    const data = await createSVG(schemas.mock, { xml: true })

    expect(data).toHaveProperty('variant')
    expect(data).toHaveProperty('icons')
    expect(data.variant).toBe('mock')
    expect(data.type).toBe('xml')

    const { svg, filename } = data.icons[0]

    expect(filename).toBe('test-mock-24x24')
    expect(svg).toBe(
      '<?xml version="1.0" encoding="utf-8"?><svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><g><path d="C 1.111 Z"/></g></svg>'
    )
  })
})
