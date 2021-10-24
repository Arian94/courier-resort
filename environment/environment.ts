export let url = ''

if (process.env.NODE_ENV === 'development') {
    url = 'http://10.0.2.2:8080/';
}

if (process.env.NODE_ENV === 'production') {
    url = 'http://10.0.2.2:8080/';
}
