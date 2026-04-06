const { getStoredPdf } = require('./pdf-storage')
const { verifyDownloadToken } = require('./download-token')

exports.handler = async (event) => {
  const key = event.queryStringParameters?.key
  const token = event.queryStringParameters?.token

  if (!key) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing key' }) }
  }

  const verification = verifyDownloadToken(token, key)
  if (!verification.valid) {
    return { statusCode: 403, body: JSON.stringify({ error: 'Invalid or expired download link' }) }
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
