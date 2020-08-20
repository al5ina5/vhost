const fs = require('fs-extra')
const { exec } = require('shelljs')

var date = new Date()
var dateString = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
var backupPath = __dirname + '/../backups/' + dateString

exports.www = (callback) => {
    fs.mkdirp(backupPath, error => {
        if (error) {
            if (callback) callback('Error making /var/www backup folder.')
            return
        }

        fs.copy(`/var/www`, backupPath + '/www', error => {
            if (error) {
                if (callback) callback('Error backing up /var/www.')
                return
            }

            console.log('/var/www backed up.')
            if (callback) callback(null)
        })
    })
}

exports.databases = (callback) => {
    fs.mkdirp(backupPath + '/databases', error => {
        if (error) {
            if (callback) callback('Error making database backup folder.')
            return
        }

        exec(`mysqldump -uvhost -p${process.env.MYSQL_PASS} --all-databases > ${backupPath}/databases/alldb.sql`,
            { silent: true },
            (code) => {
                if (code == 0) {
                    console.log('Databases backed up.')
                    if (callback) callback(null)
                    return
                }

                if (callback) callback('Error backing up databases.')
            })
    })
}

exports.apache = (callback) => {
    fs.mkdirp(backupPath, error => {
        if (error) {
            if (callback) callback('Error making Apache configuration backup folder.')
            return
        }

        fs.copy(`/etc/apache2`, backupPath + '/apache2', error => {
            if (error) {
                if (callback) callback('Error backing up Apache configuration.')
                return
            }

            console.log('Apache configuration backed up.')
            if (callback) callback(null)
        })
    })
}

exports.all = (callback) => {
    this.databases((error) => {
        if (error) {
            console.log(error)
            if (callback) callback(error)
            return
        }

        this.www(error => {
            if (error) {
                console.log(error)
                if (callback) callback(error)
                return
            }

            this.apache(error => {
                if (error) {
                    console.log(error)
                    if (callback) callback(error)
                    return
                }

                if (callback) callback()
            })
        })
    })
}