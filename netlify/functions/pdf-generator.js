const chromium = require('@sparticuz/chromium')
const puppeteer = require('puppeteer-core')
const fs = require('fs/promises')

const { buildPdfArtifactInfo } = require('./pdf-artifact')
const { buildDownloadUrl, getStoredPdf, storePdf } = require('./pdf-storage')

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function chunk(array, size) {
  const result = []
  for (let index = 0; index < array.length; index += size) {
    result.push(array.slice(index, index + size))
  }
  return result
}

function rotate(array, count) {
  return Array.from({ length: count }, (_, index) => array[index % array.length])
}

function buildLineArtSvg({ title, seed, accent = '#111111' }) {
  const shapes = [
    `<circle cx="120" cy="120" r="${40 + (seed % 30)}" fill="none" stroke="${accent}" stroke-width="4"/>`,
    `<rect x="${220 + (seed % 40)}" y="90" width="120" height="120" rx="18" fill="none" stroke="${accent}" stroke-width="4"/>`,
    `<path d="M120 280 C170 ${230 + (seed % 40)}, 250 ${330 - (seed % 40)}, 320 280" fill="none" stroke="${accent}" stroke-width="4"/>`,
    `<path d="M360 120 q60 -60 120 0 q-60 60 -120 0Z" fill="none" stroke="${accent}" stroke-width="4"/>`,
    `<path d="M100 430 q90 -120 180 0 q90 120 180 0" fill="none" stroke="${accent}" stroke-width="4"/>`,
    `<circle cx="420" cy="360" r="${30 + (seed % 20)}" fill="none" stroke="${accent}" stroke-width="4"/>`,
    `<path d="M260 170 l40 50 l-40 50 l-40 -50Z" fill="none" stroke="${accent}" stroke-width="4"/>`,
  ]

  return `
    <svg viewBox="0 0 612 792" xmlns="http://www.w3.org/2000/svg" aria-label="${escapeHtml(title)}">
      <rect width="612" height="792" fill="#ffffff"/>
      <rect x="28" y="28" width="556" height="736" rx="30" fill="none" stroke="#222222" stroke-width="4"/>
      <text x="306" y="86" text-anchor="middle" font-family="Arial" font-size="28" font-weight="700" fill="#111111">${escapeHtml(title)}</text>
      ${shapes.join('')}
      <path d="M78 645 q70 -58 140 0 t140 0 t140 0" fill="none" stroke="#222222" stroke-width="4"/>
      <text x="306" y="710" text-anchor="middle" font-family="Arial" font-size="20" fill="#333333">Color me in!</text>
    </svg>
  `
}

function buildCoverPage({ title, subtitle, badge }) {
  return `
    <section class="page cover">
      <div class="cover-card">
        <p class="eyebrow">LittleSparks Prints</p>
        <h1>${escapeHtml(title)}</h1>
        <p class="subtitle">${escapeHtml(subtitle)}</p>
        <div class="badge">${escapeHtml(badge)}</div>
      </div>
    </section>
  `
}

function buildColoringBookPages({ childName, option }) {
  const theme = option || 'magical adventures'
  const prompts = rotate([
    `${childName} and a friendly dragon in ${theme}`,
    `${childName}'s rocket launch through the stars`,
    `${childName} exploring a happy jungle`,
    `${childName}'s underwater treasure hunt`,
    `${childName} at a rainbow castle`,
    `${childName} racing through a playful town`,
    `${childName} meeting silly forest animals`,
    `${childName}'s backyard adventure`,
  ], 19)

  return [
    buildCoverPage({
      title: `${childName}'s Coloring Book`,
      subtitle: `A printable adventure inspired by ${theme}.`,
      badge: '20 pages · US Letter',
    }),
    ...prompts.map((prompt, index) => `
      <section class="page art-page">
        <div class="art-wrap">
          ${buildLineArtSvg({ title: `Page ${index + 1}: ${prompt}`, seed: index * 17 + childName.length })}
        </div>
      </section>
    `),
  ]
}

function buildWorkbookExercise({ title, instructions, bodyHtml }) {
  return `
    <section class="page worksheet">
      <div class="worksheet-header">
        <h2>${escapeHtml(title)}</h2>
        <p>${escapeHtml(instructions)}</p>
      </div>
      <div class="worksheet-body">${bodyHtml}</div>
    </section>
  `
}

function buildWorkbookPages({ childName, option }) {
  const level = option || 'Kindergarten'
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  const numberRows = Array.from({ length: 10 }, (_, index) => index + 1)

  const pages = [
    buildCoverPage({
      title: `${childName}'s Activity Workbook`,
      subtitle: `${level} practice pages with playful learning routines.`,
      badge: '25 pages · US Letter',
    }),
    buildWorkbookExercise({
      title: 'Trace Your Name',
      instructions: `Say each letter out loud as ${childName} traces it.`,
      bodyHtml: `<div class="trace-name">${escapeHtml(childName)} ${escapeHtml(childName)} ${escapeHtml(childName)}</div>`,
    }),
    ...alphabet.slice(0, 6).map((letter) => buildWorkbookExercise({
      title: `Letter ${letter}`,
      instructions: `Trace the letter and draw something that starts with ${letter}.`,
      bodyHtml: `
        <div class="trace-row large">${letter} ${letter} ${letter} ${letter}</div>
        <div class="trace-row small">${letter.toLowerCase()} ${letter.toLowerCase()} ${letter.toLowerCase()} ${letter.toLowerCase()}</div>
        <div class="draw-box">Draw here</div>
      `,
    })),
    ...numberRows.slice(0, 6).map((number) => buildWorkbookExercise({
      title: `Number ${number}`,
      instructions: 'Trace the number, then circle that many stars.',
      bodyHtml: `
        <div class="trace-row large">${number} ${number} ${number} ${number}</div>
        <div class="count-row">${Array.from({ length: 10 }, (_, index) => `<span class="count-bubble">${index < number ? '★' : '☆'}</span>`).join('')}</div>
      `,
    })),
    buildWorkbookExercise({
      title: 'Shape Match',
      instructions: 'Draw a line from each shape to the matching word.',
      bodyHtml: `
        <div class="match-grid">
          <div class="shape-card">○</div><div class="word-card">Circle</div>
          <div class="shape-card">△</div><div class="word-card">Triangle</div>
          <div class="shape-card">□</div><div class="word-card">Square</div>
          <div class="shape-card">◇</div><div class="word-card">Diamond</div>
        </div>
      `,
    }),
    buildWorkbookExercise({
      title: 'Pattern Fun',
      instructions: 'Finish each pattern.',
      bodyHtml: `
        <div class="pattern-row">star heart star heart star ___</div>
        <div class="pattern-row">blue green blue green blue ___</div>
        <div class="pattern-row">triangle triangle square triangle triangle ___</div>
      `,
    }),
    buildWorkbookExercise({
      title: 'Maze Time',
      instructions: `Help ${childName} reach the treasure chest.`,
      bodyHtml: `<div class="maze-box">Start →<br/><br/>□ □ □ □ □<br/>□   □   □<br/>□ □ □   □<br/>□   □ □ □<br/>□   □   Finish</div>`,
    }),
    buildWorkbookExercise({
      title: 'Dot to Dot',
      instructions: 'Connect the numbers from 1 to 20.',
      bodyHtml: `<div class="dot-grid">${Array.from({ length: 20 }, (_, index) => `<span>${index + 1}</span>`).join('')}</div>`,
    }),
    buildWorkbookExercise({
      title: 'Count and Color',
      instructions: 'Color 3 apples, 4 stars, and 5 hearts.',
      bodyHtml: `<div class="emoji-grid">${'APPLE '.repeat(6)}${'STAR '.repeat(6)}${'HEART '.repeat(6)}</div>`,
    }),
  ]

  while (pages.length < 25) {
    const pageNumber = pages.length
    pages.push(buildWorkbookExercise({
      title: `Practice Page ${pageNumber}`,
      instructions: `${childName} can trace, color, and talk through each answer.`,
      bodyHtml: `
        <div class="practice-grid">
          <div class="practice-card">Trace</div>
          <div class="practice-card">Count</div>
          <div class="practice-card">Color</div>
          <div class="practice-card">Write</div>
        </div>
        <div class="draw-box tall">Show your work here</div>
      `,
    }))
  }

  return pages
}

function buildHolidayPages({ childName, option }) {
  const holiday = option || 'Holiday Fun'
  const pages = [
    buildCoverPage({
      title: `${childName}'s ${holiday} Pack`,
      subtitle: 'Festive printables for coloring, tracing, and quiet-time fun.',
      badge: '15 pages · US Letter',
    }),
  ]

  const activities = [
    ['Coloring Page', `Decorate the ${holiday.toLowerCase()} scene.`],
    ['Word Search', `Circle the words that match ${holiday}.`],
    ['Maze', `Guide ${childName} through the holiday maze.`],
    ['Trace & Write', 'Trace the holiday words, then write them once.'],
    ['Pattern Practice', 'Finish each festive pattern.'],
    ['Count & Match', 'Count each picture and match the number.'],
    ['Decorate the Banner', 'Add your own stickers, stars, and doodles.'],
    ['Would You Rather?', 'Talk through each silly holiday choice.'],
    ['Memory Match', 'Cut out the cards and play memory.'],
    ['Design a Treat', 'Draw the perfect holiday snack.'],
    ['Celebrate Kindness', 'Write one kind thing to do today.'],
    ['Scavenger Hunt', 'Find the themed pictures on the page.'],
    ['Dot to Dot', 'Connect the dots to reveal the surprise.'],
    ['My Holiday Story', `${childName} can draw and tell a story.`],
  ]

  activities.forEach(([title, instructions], index) => {
    pages.push(buildWorkbookExercise({
      title: `${holiday}: ${title}`,
      instructions,
      bodyHtml: `
        <div class="draw-box tall">${escapeHtml(holiday)} activity area ${index + 1}</div>
        <div class="pattern-row">${escapeHtml(childName)}'s bonus challenge: add your own decorations.</div>
      `,
    }))
  })

  return pages
}

const SIGHT_WORD_SETS = {
  'Pre-K Starter (25 words)': ['I', 'see', 'a', 'the', 'go', 'to', 'me', 'you', 'we', 'my', 'is', 'in', 'on', 'up', 'can', 'look', 'run', 'play', 'big', 'little', 'red', 'blue', 'sun', 'moon', 'ball'],
  'Kindergarten Set (50 words)': ['the', 'and', 'to', 'a', 'I', 'you', 'is', 'in', 'it', 'said', 'for', 'up', 'look', 'go', 'we', 'little', 'down', 'can', 'see', 'not', 'one', 'my', 'me', 'big', 'come', 'blue', 'red', 'where', 'jump', 'away', 'here', 'help', 'make', 'yellow', 'two', 'three', 'play', 'find', 'funny', 'run', 'all', 'am', 'are', 'at', 'ate', 'be', 'black', 'brown', 'did', 'do'],
  'Grade 1 Set (50 words)': ['after', 'again', 'an', 'any', 'ask', 'by', 'could', 'every', 'fly', 'from', 'give', 'going', 'had', 'has', 'her', 'him', 'his', 'just', 'know', 'let', 'live', 'may', 'of', 'old', 'once', 'open', 'over', 'put', 'round', 'some', 'stop', 'take', 'thank', 'them', 'then', 'think', 'walk', 'were', 'when', 'always', 'around', 'because', 'been', 'best', 'both', 'buy', 'call', 'cold', 'does', 'fast'],
}

function buildFlashcardPages({ childName, option }) {
  const setName = option || 'Kindergarten Set (50 words)'
  const words = SIGHT_WORD_SETS[setName] || SIGHT_WORD_SETS['Kindergarten Set (50 words)']
  const cards = chunk(words, 4)

  return [
    buildCoverPage({
      title: `${childName}'s Sight Word Cards`,
      subtitle: `${setName} with big text and cut lines for easy practice.`,
      badge: `${words.length} cards · print & cut`,
    }),
    ...cards.map((group) => `
      <section class="page flashcard-sheet">
        <div class="flashcard-grid">
          ${group.map((word) => `
            <div class="flashcard">
              <div class="flashcard-word">${escapeHtml(word)}</div>
              <div class="flashcard-footer">Read it. Spell it. Use it in a sentence.</div>
            </div>
          `).join('')}
        </div>
      </section>
    `),
  ]
}

function buildBundlePages(personalization) {
  return [
    buildCoverPage({
      title: `${personalization.childName}'s Complete Bundle`,
      subtitle: 'A little bit of everything: coloring, workbook, holiday fun, and flashcards.',
      badge: 'Bundle delivery',
    }),
    ...buildColoringBookPages(personalization).slice(1),
    ...buildWorkbookPages(personalization).slice(1),
    ...buildHolidayPages(personalization).slice(1),
    ...buildFlashcardPages(personalization).slice(1),
  ]
}

async function generateAiColoringPages({ childName, option }) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return []

  const prompts = rotate([
    `${childName} exploring ${option || 'a magical adventure'}`,
    `${childName} with cheerful animals and simple scenery`,
  ], Number(process.env.COLORING_BOOK_AI_PAGE_COUNT || 2))

  const pages = []
  for (const prompt of prompts) {
    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: process.env.OPENAI_IMAGE_MODEL || 'gpt-image-1',
          size: process.env.OPENAI_IMAGE_SIZE || '1024x1024',
          prompt: `Printable black-and-white kids coloring page line art. No shading, no gray, no text, thick clean outlines. ${prompt}`,
        }),
      })

      if (!response.ok) {
        throw new Error(`OpenAI image request failed with ${response.status}`)
      }

      const data = await response.json()
      const image = data?.data?.[0]?.b64_json
      if (!image) {
        throw new Error('OpenAI image response did not include b64_json')
      }

      pages.push(`
        <section class="page art-page">
          <div class="art-caption">AI-generated scene for ${escapeHtml(childName)}</div>
          <img class="full-image" src="data:image/png;base64,${image}" alt="${escapeHtml(prompt)}" />
        </section>
      `)
    } catch (error) {
      console.error('AI coloring page generation failed:', error.message)
      break
    }
  }

  return pages
}

function wrapHtml(content) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          @page { size: letter; margin: 0; }
          * { box-sizing: border-box; }
          body { margin: 0; font-family: Arial, sans-serif; color: #172033; background: #ffffff; }
          .page { width: 8.5in; min-height: 11in; page-break-after: always; padding: 0.45in; position: relative; overflow: hidden; }
          .cover { background: linear-gradient(135deg, #fff6db, #ffe4ef); display: flex; align-items: center; justify-content: center; }
          .cover-card { width: 100%; border: 4px solid #172033; border-radius: 28px; background: rgba(255,255,255,0.92); padding: 0.65in; text-align: center; }
          .eyebrow { text-transform: uppercase; letter-spacing: 0.18em; font-size: 12px; margin: 0 0 16px; color: #ff5f8f; font-weight: 700; }
          h1 { margin: 0 0 12px; font-size: 34px; line-height: 1.15; }
          .subtitle { font-size: 18px; line-height: 1.5; margin: 0 auto 24px; max-width: 5.8in; color: #465067; }
          .badge { display: inline-block; padding: 12px 20px; border-radius: 999px; background: #172033; color: #ffffff; font-weight: 700; }
          .art-page { display: flex; align-items: center; justify-content: center; background: #ffffff; }
          .art-wrap { width: 100%; }
          .art-caption { font-size: 14px; font-weight: 700; color: #465067; margin-bottom: 12px; text-align: center; }
          .full-image { width: 100%; max-height: 9.3in; object-fit: contain; border: 3px solid #172033; border-radius: 24px; }
          .worksheet { background: #fcfdff; }
          .worksheet-header { border: 3px solid #172033; border-radius: 22px; padding: 18px 22px; margin-bottom: 20px; background: #eef8ff; }
          .worksheet-header h2 { margin: 0 0 8px; font-size: 28px; }
          .worksheet-header p { margin: 0; color: #465067; font-size: 16px; line-height: 1.4; }
          .worksheet-body { border: 3px dashed #8aa0c8; border-radius: 24px; min-height: 8.6in; padding: 24px; }
          .trace-name, .trace-row { border: 3px dashed #9cb0cd; border-radius: 18px; padding: 18px; font-size: 38px; letter-spacing: 0.16em; color: #98a5bb; margin-bottom: 18px; }
          .trace-row.small { font-size: 28px; }
          .trace-row.large { font-size: 44px; }
          .draw-box { border: 3px solid #172033; border-radius: 20px; min-height: 3in; display: flex; align-items: center; justify-content: center; color: #8ca0bc; font-size: 24px; margin-top: 22px; }
          .draw-box.tall { min-height: 5.8in; }
          .count-row, .emoji-grid, .dot-grid, .pattern-row { font-size: 28px; line-height: 1.8; word-spacing: 0.3em; }
          .count-bubble { display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; margin: 6px; border: 2px solid #172033; border-radius: 999px; }
          .match-grid, .practice-grid, .flashcard-grid { display: grid; gap: 16px; }
          .match-grid { grid-template-columns: repeat(2, 1fr); }
          .shape-card, .word-card, .practice-card { border: 3px solid #172033; border-radius: 18px; padding: 18px; min-height: 90px; display: flex; align-items: center; justify-content: center; font-size: 28px; background: #ffffff; }
          .maze-box { border: 3px solid #172033; border-radius: 18px; padding: 22px; font-size: 26px; line-height: 1.8; min-height: 5.5in; }
          .dot-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 18px; }
          .dot-grid span { border: 2px dashed #8aa0c8; border-radius: 999px; min-height: 74px; display: flex; align-items: center; justify-content: center; }
          .practice-grid { grid-template-columns: repeat(2, 1fr); margin-bottom: 20px; }
          .flashcard-sheet { padding: 0.55in; }
          .flashcard-grid { grid-template-columns: repeat(2, 1fr); }
          .flashcard { border: 3px dashed #172033; border-radius: 20px; min-height: 4.55in; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 18px; }
          .flashcard-word { font-size: 46px; font-weight: 700; margin-bottom: 16px; }
          .flashcard-footer { font-size: 18px; line-height: 1.4; color: #546178; }
        </style>
      </head>
      <body>${content}</body>
    </html>
  `
}

async function buildPdfHtml(personalization) {
  const normalized = { ...personalization, option: personalization.option || '' }
  const mode = process.env.COLORING_BOOK_IMAGE_MODE || 'hybrid'

  if (normalized.productSlug === 'personalized-coloring-book') {
    const basePages = buildColoringBookPages(normalized)
    if (mode !== 'template') {
      const aiPages = await generateAiColoringPages(normalized)
      if (aiPages.length) {
        basePages.splice(1, aiPages.length, ...aiPages)
      }
    }
    return wrapHtml(basePages.join(''))
  }

  if (normalized.productSlug === 'custom-activity-workbook') {
    return wrapHtml(buildWorkbookPages(normalized).join(''))
  }

  if (normalized.productSlug === 'seasonal-holiday-activity-pack') {
    return wrapHtml(buildHolidayPages(normalized).join(''))
  }

  if (normalized.productSlug === 'sight-word-flashcards') {
    return wrapHtml(buildFlashcardPages(normalized).join(''))
  }

  if (normalized.productSlug === 'bundle') {
    return wrapHtml(buildBundlePages(normalized).join(''))
  }

  return wrapHtml(buildWorkbookPages(normalized).join(''))
}

async function renderPdf(html) {
  const launchOptions = await resolveLaunchOptions()
  const browser = await puppeteer.launch({
    args: launchOptions.args,
    defaultViewport: launchOptions.defaultViewport,
    executablePath: launchOptions.executablePath,
    headless: launchOptions.headless,
  })

  try {
    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: 'networkidle0' })
    return await page.pdf({
      format: 'Letter',
      printBackground: true,
      preferCSSPageSize: true,
    })
  } finally {
    await browser.close()
  }
}

async function resolveLaunchOptions() {
  const preferredPath = process.env.CHROME_EXECUTABLE_PATH
  if (preferredPath) {
    return {
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: { width: 1275, height: 1650 },
      executablePath: preferredPath,
      headless: true,
    }
  }

  if (process.platform === 'darwin') {
    const localCandidates = [
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Chromium.app/Contents/MacOS/Chromium',
      '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    ]

    for (const candidate of localCandidates) {
      try {
        await fs.access(candidate)
        return {
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
          defaultViewport: { width: 1275, height: 1650 },
          executablePath: candidate,
          headless: true,
        }
      } catch (error) {
        continue
      }
    }
  }

  return {
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: true,
  }
}

async function getOrCreatePdf(personalization, headers = {}) {
  const artifact = buildPdfArtifactInfo(personalization)
  const cached = await getStoredPdf(artifact.key)

  if (cached) {
    return {
      ...artifact,
      buffer: cached.buffer,
      cached: true,
      storage: cached.storage,
      downloadUrl: '',
    }
  }

  const html = await buildPdfHtml(personalization)
  const buffer = await renderPdf(html)
  const stored = await storePdf(artifact.key, buffer)

  return {
    ...artifact,
    buffer,
    cached: false,
    storage: stored.storage,
    downloadUrl: '',
  }
}

module.exports = {
  getOrCreatePdf,
}
