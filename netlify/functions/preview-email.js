const { buildEmailHtml } = require('./email-helper')

exports.handler = async (event) => {
  const childName   = event.queryStringParameters?.name        || 'Emma'
  const productName = event.queryStringParameters?.product     || 'Personalized Coloring Book'
  const option      = event.queryStringParameters?.option      || 'Unicorns & rainbows'
  const pdfUrl      = event.queryStringParameters?.pdf         || 'https://example.com/sample.pdf'

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/html' },
    body: buildEmailHtml({ childName, productName, pdfUrl, option, hasAttachment: true }),
  }
}
