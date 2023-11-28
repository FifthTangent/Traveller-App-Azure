import AzureDatabase from "./azure-sql"

const server = process.env.AZURE_SQL_SERVER as string;
const database = process.env.AZURE_SQL_DATABASE as string;
const port = parseInt(process.env.AZURE_SQL_PORT as string)
const type = process.env.AZURE_SQL_AUTHENTICATIONTYPE as string

const config = {
    server,
    port,
    database,
    ConnectionAuthentication: {
        type
    },
    options: {
        encrypt: true
    }
};

// console.log(config)
const Database = new AzureDatabase(config)
export default Database;