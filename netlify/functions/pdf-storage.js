const fs = require('fs/promises')
const path = require('path')

const CACHE_DIR = process.env.PDF_CACHE_DIR || '/tmp/littlesparks-pdfs'
const STORE_NAME = process.env.PDF_BLOB_STORE || 'generated-pdfs'

function canUseBlobStorage() {
  return Boolean(process.env.NETLIFY || process.env.NETLIFY_BLOBS_CONTEXT || process.env.BLOB_READ_WRITE_TOKEN)
}

function resolveSiteBaseUrl(headers = {}) {
  if (process.env.SITE_URL) {
    return process.env.SITE_URL.replace(/\/$/, '')
  }

  const proto = headers['x-forwarded-proto'] || headers['X-Forwarded-Proto'] || 'https'
  const host = headers['x-forwarded-host'] || headers.host || headers.Host

  return host ? `${proto}://${host}` : ''
}

function buildDownloadUrl(key, headers = {}) {
  const baseUrl = resolveSiteBaseUrl(headers)
  return baseUrl ? `${baseUrl}/.netlify/functions/download-pdf?key=${encodeURIComponent(key)}` : ''
}

function getLocalPath(key) {
  return path.join(CACHE_DIR, key)
}

async function getBlobStore() {
  const { getStore } = require('@netlify/blobs')
  return getStore({ name: STORE_NAME })
}

async function getStoredPdf(key) {
  if (canUseBlobStorage()) {
    try {
      const store = await getBlobStore()
      const contents = await store.get(key, { type: 'arrayBuffer' })
      if (!contents) return null
      return { buffer: Buffer.from(contents), storage: 'blob' }
    } catch (error) {
      console.error('Blob read failed:', error.message)
    }
  }

  try {
    const buffer = await fs.readFile(getLocalPath(key))
    return { buffer, storage: 'local' }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error('Local PDF cache read failed:', error.message)
    }
    return null
  }
}

async function storePdf(key, buffer) {
  if (canUseBlobStorage()) {
    try {
      const store = await getBlobStore()
      await store.set(key, buffer)
      return { storage: 'blob' }
    } catch (error) {
      console.error('Blob write failed:', error.message)
    }
  }

  const filePath = getLocalPath(key)
  await fs.mkdir(path.dirname(filePath), { recursive: true })
  await fs.writeFile(filePath, buffer)
  return { storage: 'local' }
}

module.exports = {
  buildDownloadUrl,
  canUseBlobStorage,
  getStoredPdf,
  storePdf,
}
