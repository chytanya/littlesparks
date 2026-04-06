const crypto = require('crypto')

const PDF_TEMPLATE_VERSION = '2026-04-05'

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'printable'
}

function buildPdfArtifactInfo({ productSlug, productName, childName, option }) {
  const payload = JSON.stringify({
    version: PDF_TEMPLATE_VERSION,
    productSlug,
    childName: String(childName || '').trim(),
    option: String(option || '').trim(),
  })

  const fingerprint = crypto.createHash('sha256').update(payload).digest('hex').slice(0, 24)
  const baseName = [childName, productName || productSlug]
    .filter(Boolean)
    .map(slugify)
    .join('-')

  return {
    version: PDF_TEMPLATE_VERSION,
    fingerprint,
    key: `pdfs/${productSlug || 'unknown'}/${fingerprint}.pdf`,
    filename: `${baseName || 'littlesparks-printable'}.pdf`,
  }
}

module.exports = {
  PDF_TEMPLATE_VERSION,
  buildPdfArtifactInfo,
}
