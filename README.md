# `vhost`
`vhost` helps you programitcally control your apache virtual hosts via the command-line (soon!) or a smart REST API.

> NOTICE: `vhost` is in beta. Use at your own risk.

## Endpoints

### vhost

* `/vhost/create`

``` 
{
    domain: '',
    template: 'basic',
}
```

* `/vhost/delete`
* `/vhost/remove`

``` 
{
    conf: ''
}
```

* `/vhost/list`
* `/vhost/reload`

### SSL

* `/ssl/create`

``` 
{
    domain: ''
}
```

### Install

* `/install/wordpress`

``` 
{
    folder: ''
}
```

### Auto

* `/auto/wordpress`

``` 
{
    domain: '',
    folder: '',
}
```

## Functions

### vhost

``` js
vhost.list((list) => {})
```

``` js
vhost.create(data, callback)
```

 `data`
* domain
* ?template

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

``` 
install.wordpress(folder, (error) => {})
```

### Auto

``` 
auto.wordpress(domain, folder, (error) => {})
```
