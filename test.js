const lib = require('./lib/lib')

var fqdm = 'shop.revolt.dev'
var name = 'shop'

// Create the domain's vhost.
lib.vhost.create({
    domain: fqdm,
    path: `/var/www/${name}`
}, error => {
        if (error) return console.log(error)
    
        // Install WordPress.
        lib.install.wordpress(name, error => {
            if (error) return console.log(error)

            // Install SSL.
            lib.ssl.create(fqdm, error => {
                if (error) return console.log(error)
            })
        })
})