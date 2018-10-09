import { xmlToJson } from '../src/xml-and-json'
import { expect } from 'chai'

function parseXml (xml) {
  return new DOMParser().parseFromString(xml, 'text/xml')
}

describe('XML to JSON', function () {
  it('should transform empty root element', function () {
    const xml = parseXml('<hi />')
    const json = xmlToJson(xml)
    expect(json).to.deep.equal({ hi: {} })
  })

  it('should transform basic XML', function () {
    const xml = parseXml('<hi><test>123</test><a>789</a></hi>')
    const json = xmlToJson(xml)
    expect(json).to.deep.equal({ hi: { test: '123', a: '789' } })
  })
})
