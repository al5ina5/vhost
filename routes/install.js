const install = require('../lib/install')

module.exports = (app) => {
    app.all('/install/wordpress', async (req, res) => {
        var { folder } = req.body

        install.wordpress(folder, () => {
            res.json({ message: `Wordpress was installed in /var/www/${folder}.` })
        })
    })
}