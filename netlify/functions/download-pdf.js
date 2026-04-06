const { getStoredPdf } = require('./pdf-storage')

exports.handler = async (event) => {
  const key = event.queryStringParameters?.key

  if (!key) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing key' }) }
  }

  const stored = await getStoredPdf(key)
  if (!stored?.buffer) {
    return { statusCode: 404, body: JSON.stringify({ error: 'PDF not found' }) }
  }

  return {
    statusCode: 200,
    isBase64Encoded: true,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="littlesparks-printable.pdf"',
      'Cache-Control': 'private, max-age=300',
    },
    body: stored.buffer.toString('base64'),
  }
}
