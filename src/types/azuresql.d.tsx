type AzureConfig = {
    server: string,
    port: string,
    database: string,
    authentication: {
        type: string
    },
    options: {
        encrypt: true
    }
}