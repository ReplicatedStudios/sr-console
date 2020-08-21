const axios = require('axios').default

const ejemplo = nombre => `Hola ${nombre}`

const users = async () => {
    console.log(await axios.get('https://jsonplaceholder.typicode.com/users?_limit=2'));
}
users();

const exportar = {
    users: users,
    ejemplo: ejemplo
}

module.exports = exportar