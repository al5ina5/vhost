var lib = require('./lib')

module.exports = (app) => {
    app.all('/backup/www', (req, res) => {
        lib.backup.www(error => {
            if (error) {
                res.json(error)
                return
            }

            res.json({ message: '/var/www backed up.' })
        })
    })

    app.all('/backup/databases', (req, res) => {
        lib.backup.databases(error => {
            if (error) {
                res.json(error)
                return
            }

            res.json({ message: 'Databases backed up.' })
        })
    })

    app.all('/backup/all', (req, res) => {
        lib.backup.all(error => {
            if (error) {
                res.json(error)
                return
            }

            res.json({ message: 'Everything backed up.' })
        })
    })
}