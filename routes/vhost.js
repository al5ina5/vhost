const vhost = require('../lib/vhost')

module.exports = (app) => {
    app.all('/vhost/create', (req, res) => {
        var data = req.body

        vhost.create(data, (error) => {
            if (error) return res.json(error)

            vhost.enable(data.domain + '.conf', (error) => {
                if (error) return res.json(error)

                res.json({ message: `vhost for ${data.domain} created and enabled.` })
            })
        })
    })

    function remove() {
        var conf = req.body.conf

        if (!conf) return res.json({
            error: true,
            message: 'Missing required data.'
        })

        vhost.delete(conf, (reply) => {
            res.json({message: `Deleted ${conf}.`})
        })
    }

    app.all('/vhost/delete', (req, res) => {
        remove()
    })
    app.all('/vhost/remove', (req, res) => {
        remove()
    })

    app.all('/vhost/list', (req, res) => {
        vhost.list((list) => {
            res.json(list)
        })
    })
    
    app.all('/vhost/reload', (req, res) => {

        vhost.reload((error) => {
            if (error) return res.json(error)

            res.json({
                message: 'vhosts reloaded.'
            })
        })
    })
}