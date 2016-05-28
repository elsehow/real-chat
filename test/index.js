'use strict'
var test  = require('tape')
var real  = require('..')
var alice = real.keypair()
var bob   = real.keypair()
var msg   = "hello"

// encrypt + decrypt
test('encrypt + decrypt', function (t) {
  var ciphertext = real.encrypt(msg, [alice.publicKey, bob.publicKey])
  var cleartext  = real.decrypt(ciphertext, alice.secretKey)
  t.deepEquals(msg, cleartext)
  t.end()
})

var pk = alice.publicKey
var sixteenRecipients = [
  pk,pk,pk,pk,
  pk,pk,pk,pk,
  pk,pk,pk,pk,
  pk,pk,pk,pk
]

test('errors with too many recipients', function (t) {
  t.throws(function () {
    real.encrypt(msg, sixteenRecipients)
  })
  t.end()
})

test('can set max recipients', function (t) {
  var ciphertext = real.encrypt(msg, sixteenRecipients, 16)
  var cleartext  = real.decrypt(ciphertext, alice.secretKey)
  t.deepEquals(msg, cleartext)
  t.end()
})

test('can serialize/deserialize encrypted messages', function (t) {
  var ciphertext = real.encrypt(msg, [alice.publicKey, bob.publicKey])
  var serialized = real.stringify(ciphertext)
  var deserialized = real.parse(ciphertext)
  var cleartext  = real.decrypt(deserialized, alice.secretKey)
  t.deepEquals(msg, cleartext)
  t.end()
})
