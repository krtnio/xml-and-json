const TextName = "#text";
const CommentName = "#comment";
const CDataName = "#cdata-section";
const WhitespaceName = "#whitespace";
const SignificantWhitespaceName = "#significant-whitespace";
const DeclarationName = "?xml";
const JsonNamespaceUri = "http://james.newtonking.com/projects/json";

function isSpacing (node) {
  return node.nodeType === 3 && node.nodeValue.trim() === ''
}

export function xmlToJson (xml) {
  // Create the return object
  let obj = {}

  if (xml.nodeType === 1) { // element
    // do attributes
    if (xml.attributes.length > 0) {
      for (let j = 0; j < xml.attributes.length; j++) {
        const attribute = xml.attributes.item(j)
        obj['@' + attribute.nodeName] = attribute.nodeValue
      }
    }
  } else if (xml.nodeType === 3) { // text
    obj = xml.nodeValue
  }

  // do children
  if (xml.hasChildNodes()) {
    for (var i = 0; i < xml.childNodes.length; i++) {
      const item = xml.childNodes.item(i)

      if ([1, 3].indexOf(item.nodeType) === -1) continue
      if (isSpacing(item)) continue

      const nodeName = item.nodeName

      if (typeof obj[nodeName] === 'undefined') {
        obj[nodeName] = xmlToJson(item)
      } else {
        if (typeof obj[nodeName].push === 'undefined') {
          var old = obj[nodeName]
          obj[nodeName] = []
          obj[nodeName].push(old)
        }

        obj[nodeName].push(xmlToJson(item))
      }
    }
  }

  const keys = Object.keys(obj)
  if(keys.length === 1 && keys[0] === TextName) obj = obj[TextName]

  return obj
}
