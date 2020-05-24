import { createDBConnection } from "../services/bindDBConnection"

async function sync() {

    const conn = await createDBConnection()

    await conn.synchronize()

    console.log(`DB successfully synchronized`)
}

sync()