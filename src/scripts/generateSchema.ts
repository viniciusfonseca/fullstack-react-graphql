import 'reflect-metadata'
import { createSchema } from "../graphql/createSchema";
import { printSchema } from 'graphql';
import { createContainer } from '../services/createContainer';

async function generateSchema() {

    const container = await createContainer()

    const schema = await createSchema(container)

    process.stdout.write(printSchema(schema))
}

generateSchema()