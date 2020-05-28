import 'reflect-metadata'
import { createSchema } from "../graphql/createSchema";
import { printSchema } from 'graphql';
import { createContainer } from '../services/createContainer';
import * as fs from 'fs'
import * as path from 'path'

async function generateSchema() {

    const container = await createContainer()

    const schema = await createSchema(container)

    const out = fs.createWriteStream(path.join(process.cwd(), 'schema.gql'))

    out.write(printSchema(schema))
}

generateSchema()