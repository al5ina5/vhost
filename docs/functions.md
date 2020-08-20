# Functions

### vhost

``` js
vhost.list((list) => {})
```

``` js
vhost.create({
    domain: '',
    alias: '',
    path: '',
}, callback)
```

``` js
vhost.delete(conf, () => {})
vhost.remove(conf, () => {})
```

``` js
vhost.enable(conf, (error) => {})
```

``` js
vhost.disable(conf, (error) => {})
```

``` js
vhost.reload(() => {})
```

### SSL

``` js
ssl.create(domain, (error) => {})
```

### Install

``` js
install.wordpress(folder, (error) => {})
```

### Auto

``` js
auto.wordpress(domain, folder, (error) => {})
```

### Backup

``` 
backup.www((error) => {})
```

``` 
backup.databases((error) => {})
```

``` 
backup.apache((error) => {})
```

``` 
backup.all((error) => {})
```
