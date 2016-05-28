var sodium = require('chloride/build/Release/sodium')
var privatebox = require('private-box')
var mustEncryptStrErr = new Error('REAL-CHAT: You can only encrypt strings. If you\'re trying to send an object, stringify it first.')
var Buffer = require('buffer').Buffer

function encrypt (str, recipientsArr, maxRecipients) {
  if (!typeof str === 'string')
    throw mustEncryptStrErr
  var cleartext = new Buffer(str)
  return privatebox.multibox(cleartext, recipientsArr, maxRecipients)
}

function decrypt (buff, sk) {
  return privatebox.multibox_open(buff, sk).toString()
}

function stringify (buff) {
  return buff.toString('base64')
}

function parse (str) {
  return new Buffer(str, 'base64')
}

module.exports = {
  keypair: sodium.crypto_box_keypair,
  encrypt: encrypt,
  decrypt: decrypt,
  stringify: stringify,
  parse: parse,
}
