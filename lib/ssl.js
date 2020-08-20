const { exec } = require('shelljs')

exports.create = (domain, callback) => {
    console.log(`Trying to provision SSL for ${domain}...`)
    exec(`sudo certbot --apache --no-redirect --keep -d ${domain}`, { silent: true }, (code, stdout, stderr) => {
        if (code == 0) {
            console.log(`SSL for ${domain} provisioned succesfully.`)
            if (callback) callback(null)
            return 
        }

        var error = `Failed to provision SSL for ${domain} succesfully. Code: ${code}`
        console.log(error)
        if (callback) callback(error)
    })
}