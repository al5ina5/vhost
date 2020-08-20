exports.wordpress = (domain, folder, callback) => {
    lib.vhost.create({
        domain,
        path: `/var/www/${folder}`
    }, error => {
        if (error) {
            if (callback) callback(error)
            return 
        }
        
            // Install WordPress.
            lib.install.wordpress(name, error => {
                if (error) {
                    if (callback) callback(error)
                    return 
                }
    
                // Install SSL.
                lib.ssl.create(fqdm, error => {
                    if (error) {
                        if (callback) callback(error)
                        return 
                    }

                    if (callback) callback()
                })
            })
    })
}