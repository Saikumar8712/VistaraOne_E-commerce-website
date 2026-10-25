
import tls from 'node:tls'

const socket = tls.connect({
  host: 'ac-rbdsjxp-shard-00-00.8hwssq3.mongodb.net',
  port: 27017,
  servername: 'ac-rbdsjxp-shard-00-00.8hwssq3.mongodb.net'
}, () => {
  console.log('TLS_HANDSHAKE_SUCCESSFUL!')
  console.log('Cipher:', socket.getCipher())
  console.log('Authorized:', socket.authorized)
  socket.end()
})

socket.on('error', (err) => {
  console.log('TLS_ERROR:', err.message)
  console.log('CODE:', err.code)
})
