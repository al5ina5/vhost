# endpoints

All endpoints must have `key` value sent for authentication. Therefore, they must all be POST'd to.

### vhost

* `/vhost/create`

``` 
{
    domain: '',
    alias: '',
    path: '',
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

### Backup

* `/backup/www`
* `/backup/databases`
* `/backup/apache`
* `/backup/all`

``` 
{
    domain: '',
    folder: '',
}
```
