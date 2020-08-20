var {exec} =require('shelljs')
var db = require('./db')
var fs = require('fs-extra')
var Axios = require('axios')
var Handlebars = require('handlebars')

exports.wordpress = (name, callback) => {
    console.log(`Installing wordpress in /var/www/${name}.`)
    exec(`
        wget https://wordpress.org/latest.zip -P /var/www/${name} &&
        unzip /var/www/${name}/latest.zip -d /var/www/${name} &&
        mv /var/www/${name}/wordpress/* /var/www/${name} &&
        rm /var/www/${name}/latest.zip
    `, {silent: true})

    const password = Math.random().toString(36).substring(2, 15)
    db.query(`CREATE DATABASE IF NOT EXISTS ${name}`, [], (error, results) => {
        if (error) return callback('Error while making database.')

        db.query(`CREATE USER IF NOT EXISTS '${name}'@'localhost' IDENTIFIED BY '${password}'`, [], (error, results) => {
            if (error) return callback('Error while making user.')

            db.query(`GRANT ALL PRIVILEGES ON ${name}.* TO '${name}'@'localhost'`, [], (error, results) => {
            if (error) return callback('Error while granting privileges to user.')

                console.log(`Database Credentials: ${name} ${name} ${password} localhost`)

                fs.readFile(`./templates/wp-config.php`, 'utf8', async (error, data) => {
                    if (error) return callback('Unable to read template file.')

                    var template = Handlebars.compile(data, { noEscape: true })

                    try {
                        var salt = await Axios.get('https://api.wordpress.org/secret-key/1.1/salt/')
                    } catch (error) {
                        return callback('Failed to get WordPress salt.')
                    }

                    var data = {
                        DB_NAME: name,
                        DB_USER: name,
                        DB_PASSWORD: password,
                        SALT: salt.data
                    }

                    fs.writeFile(`/var/www/${name}/wp-config.php`, template(data), (error) => {
                        if (error) return callback('Error while writing wp-config.php.')
                        
                        exec(`
                            chown -R alsinas:www-data /var/www/${name} &&
                            sudo chmod -R g+w /var/www/${name}
                        `)

                        console.log(`WordPress has been installed.`)
                        if (callback) callback(null)
                    })
                })
            })
        })
    })

}