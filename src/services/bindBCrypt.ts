import * as bcrypt from 'bcrypt'
import { Container } from 'inversify'

export const BCRYPT = Symbol("BCRYPT")

class BCryptHelper {

    private salt: string

    constructor() {
        this.salt = bcrypt.genSaltSync()
    }

    hash(str: string) {
        return bcrypt.hash(str, this.salt)
    }

    verify(str: string, hash: string) {
        return bcrypt.compare(str, hash)
    }
}

export function bindBCrypt(container: Container) {

    const bcryptHelper = new BCryptHelper()

    container.bind<BCryptHelper>(BCRYPT).toConstantValue(bcryptHelper)

}