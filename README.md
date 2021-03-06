# real-chat

multiparty encrypted chat. 
a wrapper around [private-box](https://github.com/auditdrivencrypto/private-box).

## install

```
npm install real-chat
```

## use

```javascript
var real  = require('real-chat')
var alice = real.keypair()
var bob   = real.keypair()
var msg   = "hello"

// encrypt + decrypt
var ciphertext = real.encrypt(msg, [alice.publicKey, bob.publicKey])
var cleartext  = real.decrypt(ciphertext, alice.secretKey)
console.log(cleartext)
// "hello"
```

## api

### real.keypair()

generate ed25519 keypair

### real.encrypt(string, [publicKeys...], [maxRecipients=7])

encrypt `string` to some array of ed25519 public keys, where the length of the array is no longer than `maxRecipients`.

*NOTE*: `maxRecipients` can't be more than 255. see [private-box](https://github.com/auditdrivencrypto/private-box).

### real.decrypt(ciphertext, secretKey)

decrypt ciphertext with a secret key.

### real.stringify(ctxt) / real.parse(str)

convenience functions for sending ciphertext over the wire. 

```javascript
var ciphertext = real.encrypt(msg, [alice.publicKey, bob.publicKey])
// turn ciphertext into a string, so we can send it e.g. over post request
var serialized = real.stringify(ciphertext) 
// now turn it from a string back into a buffer, so we can decrypt it
var deserialized = real.parse(ciphertext)
var cleartext  = real.decrypt(deserialized, alice.secretKey)
```

## license

BSD
