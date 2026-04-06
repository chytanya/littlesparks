function buildEmailHtml(data) {
  var childName = data.childName
  var productName = data.productName
  var pdfUrl = data.pdfUrl
  var option = data.option
  var hasAttachment = data.hasAttachment
  var optionLine = option
    ? '<p style="margin:0 0 8px 0;color:#666;font-size:14px;">Selected: <strong>' + option + '</strong></p>'
    : ''
  var deliveryLine = hasAttachment
    ? '<p style="text-align:center;color:#666;margin:0 0 16px;">Your PDF is attached to this email for instant access.</p>'
    : ''
  var buttonHtml = pdfUrl
    ? '<div style="text-align:center;margin:28px 0;">' +
        '<a href="' + pdfUrl + '" style="background:#FF6B9D;color:#fff;text-decoration:none;padding:16px 40px;border-radius:50px;font-weight:700;font-size:16px;display:inline-block;">Download Your PDF →</a></div>'
    : ''
  return '<!DOCTYPE html><html><head><meta charset="utf-8"/></head>' +
    '<body style="margin:0;padding:0;background:#FFF9F0;font-family:Arial,sans-serif;">' +
    '<table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;padding:32px 16px;"><tr><td>' +
    '<div style="text-align:center;margin-bottom:32px;">' +
    '<h1 style="font-size:28px;color:#FF6B9D;margin:0 0 4px;">LittleSparks Prints</h1>' +
    '<p style="color:#888;margin:0;font-size:14px;">Magical printables for curious little minds</p></div>' +
    '<div style="background:#fff;border-radius:24px;border:2px solid #EDE9FE;padding:32px;margin-bottom:24px;">' +
    '<div style="font-size:64px;text-align:center;margin-bottom:16px;">🎉</div>' +
    '<h2 style="font-size:24px;color:#2D2D2D;text-align:center;margin:0 0 8px;">' + childName + "'" + 's printable is ready!</h2>' +
    '<p style="text-align:center;color:#666;margin:0 0 24px;">Your <strong>' + productName + '</strong> is ready to download and print.</p>' +
    deliveryLine +
    optionLine +
    buttonHtml +
    '<div style="background:#FFF5FF;border-radius:16px;padding:16px;margin-top:24px;">' +
    '<p style="margin:0 0 8px;font-weight:700;color:#2D2D2D;font-size:14px;">🖨️ Printing Tips</p>' +
    '<ul style="margin:0;padding:0 0 0 16px;color:#666;font-size:13px;line-height:1.7;">' +
    '<li>Use standard 8.5" × 11" white paper</li>' +
    '<li>For flashcards, cardstock works great</li>' +
    '<li>Print as many copies as you want, anytime!</li></ul></div></div>' +
    '<div style="text-align:center;color:#aaa;font-size:12px;">' +
    '<p>Questions? <a href="mailto:hello@littlesparks.com" style="color:#FF6B9D;">hello@littlesparks.com</a></p></div>' +
    '</td></tr></table></body></html>'
}

function buildEmailText(data) {
  var childName = data.childName
  var productName = data.productName
  var pdfUrl = data.pdfUrl
  var option = data.option
  var hasAttachment = data.hasAttachment
  return [
    'Hi,',
    '',
    childName + "'s " + productName + ' is ready.',
    option ? 'Selected option: ' + option : '',
    hasAttachment ? 'Your PDF is attached to this email.' : '',
    pdfUrl ? 'Download it here: ' + pdfUrl : '',
    '',
    'Thank you for supporting LittleSparks Prints.',
  ].filter(Boolean).join('\n')
}

module.exports = { buildEmailHtml, buildEmailText }
