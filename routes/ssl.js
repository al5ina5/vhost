const ssl = require('../lib/ssl')

module.exports = (app) => {
    app.all('/ssl/create', async (req, res) => {
        var { domain } = req.body

        if (!domain) {
            res.json({
                error: 'Required values: domain'
            })
            return
        }

        ssl.create(domain, (error) => {
            if (error) {
                console.log(error)
                res.json(error)
                return
            }

            return res.json({
                message: `SSL for ${domain} provisioned succesfully.`
            })
        })
    })
}