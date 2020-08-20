require('dotenv').config()
const lib = require('./lib/lib')

lib.backup.apache((error) => {
    if (error) console.log(error)
})