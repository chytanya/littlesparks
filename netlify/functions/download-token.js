const crypto = require('crypto')

const TOKEN_VERSION = 'v1'
const DEFAULT_TTL_DAYS = Number(process.env.PDF_LINK_TTL_DAYS || 30)

function base64UrlEncode(value) {
  return Buffer.from(value)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '')
}

function base64UrlDecode(value) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/')
  const padded = normalized + '='.repeat((4 - normalized.length % 4) % 4)
  return Buffer.from(padded, 'base64').toString('utf8')
}

function getTokenSecret() {
  return process.env.DOWNLOAD_TOKEN_SECRET || process.env.STRIPE_WEBHOOK_SECRET || ''
}

function signPayload(payload) {
  return base64UrlEncode(
    crypto.createHmac('sha256', getTokenSecret()).update(payload).digest()
  )
}

function generateDownloadToken({ key, childName, productSlug }) {
  const expiresAt = Date.now() + DEFAULT_TTL_DAYS * 24 * 60 * 60 * 1000
  const payload = JSON.stringify({
    v: TOKEN_VERSION,
    key,
    childName,
    productSlug,
    exp: expiresAt,
  })

  return `${base64UrlEncode(payload)}.${signPayload(payload)}`
}

function verifyDownloadToken(token, expectedKey) {
  const [encodedPayload, encodedSignature] = String(token || '').split('.')
  if (!encodedPayload || !encodedSignature || !getTokenSecret()) {
    return { valid: false, reason: 'missing-token-or-secret' }
  }

  const payload = base64UrlDecode(encodedPayload)
  const actualSignature = signPayload(payload)
  if (encodedSignature.length !== actualSignature.length) {
    return { valid: false, reason: 'invalid-signature' }
  }

  if (!crypto.timingSafeEqual(Buffer.from(encodedSignature), Buffer.from(actualSignature))) {
    return { valid: false, reason: 'invalid-signature' }
  }

  let data
  try {
    data = JSON.parse(payload)
  } catch (error) {
    return { valid: false, reason: 'invalid-payload' }
  }

  if (data.v !== TOKEN_VERSION || data.key !== expectedKey) {
    return { valid: false, reason: 'invalid-payload' }
  }

  if (!data.exp || Date.now() > data.exp) {
    return { valid: false, reason: 'expired' }
  }

  return { valid: true, payload: data }
}

module.exports = {
  generateDownloadToken,
  verifyDownloadToken,
}
