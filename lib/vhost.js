const fs = require('fs-extra')
const Handlebars = require('handlebars')
const { exec } = require('shelljs')

var vhost = {
    // List available and enabled virtual hosts.
    list: (callback) => {
        var list = {
            enabled: [],
            available: [],
        }
        fs.readdir('/etc/apache2/sites-enabled', (error, files) => {
            if (error) return console.log(error)
            list.enabled = files
            fs.readdir('/etc/apache2/sites-available', (error, files) => {
                if (error) return console.log(error)
                list.available = files

                if (callback) callback(list)
            })
        })
    },
    delete: (conf, callback) => {
        // Delete virtual hosts.
        fs.remove(`/etc/apache2/sites-available/${conf}`, err => {
            if (err) return console.error(err)
            console.log(`Deleted ${conf} from sites-available.`)
        })
        fs.remove(`/etc/apache2/sites-enabled/${conf}`, err => {
            if (err) return console.error(err)
            console.log(`Deleted ${conf} from sites-enabled.`)
        })
        vhost.reload()
        if (callback) callback()
    },
    remove: (conf, callback) => {
        // Delete virtual hosts.
        vhost.delete(conf, () => {
            if (callback) callback()
        })
    },
    create: (data, callback) => {
        // Create virtual hosts.
        var domain = data.domain
        
        if (!domain) {
            var error = `You must specify a domain.`
            console.log(error)
            if (callback) callback(error)
            return
        }

        fs.exists(`/etc/apache2/sites-available/${domain}.conf`, (exists) => {
            if (exists) {
                var error = `${domain}.conf exists. Not overwriting.`
                if (callback) callback(error)
                return
            }

            var source = fs.readFileSync(__dirname + `/../templates/${data.template || 'basic'}.conf`).toString()
            var template = Handlebars.compile(source)
            var result = template(data)

            fs.writeFile(`/etc/apache2/sites-available/${domain}.conf`, result, (error) => {
                if (error) {
                    console.log(error)
                    if (callback) callback(error)
                    return
                }
                console.log(`${domain}.conf created.`)
                vhost.enable(`${domain}.conf`)
                
                if (callback) callback(null)
            })
        }) 
    },
    enable: (conf, callback) => {
        // Enable virtual hosts.
        exec(`sudo a2ensite ${conf}`, (code) => {
            if (code == 0) {
                vhost.reload(() => {
                    if (callback) callback(null)
                })
                return
            }
            
            if (callback) callback('Error.')
        })
        // vhost.list((list) => {
        //     if (!list.available.includes(conf)) {
        //         var error = `${conf} does not exist.`
        //         console.log(error)
        //         if (callback) callback(error)
        //         return
        //     }

        //     exec(`sudo a2ensite ${conf}`, (code) => {
        //         vhost.reload(() => {
        //             if (callback) callback(null)
        //         })
        //     })
        // })
    },
    disable: (conf, callback) => {
        // Disable virtual hosts.
        vhost.list((list) => {
            if (!list.enabled.includes(conf)) {
                var error = `${conf} is not enabled.`
                console.log(error)
                if (callback) callback(error)
                return
            }

            exec(`sudo a2dissite ${conf}`, () => {
                console.log(`${conf} disabled.`)
                if (callback) callback()
                vhost.reload()
            })
        })
    },
    reload: (callback) => {
        // Reload virtual hosts.
        exec(`sudo systemctl reload apache2`, () => {
            console.log(`apache restarted.`)
            if (callback) callback(null)
        })
    }
}

module.exports = vhost