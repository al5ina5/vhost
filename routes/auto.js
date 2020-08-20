var lib = require('./lib')

module.exports = (app) => {
    app.all('/auto/wordpress', async (req, res) => {
        var { domain, folder } = req.body

        if (!domain || !folder) {
            res.json({error: 'Missing required information.'})
            return
        }

        lib.auto.wordpress(domain, folder, (error) => {
            if (error) {
                res.json(error)
                return
            }

            res.json({ message: `Sucessfully installed WordPress on ${domain}.`})
        })
    })
}