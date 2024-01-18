import 'dotenv/config'
import FastifyServer from './server'
import { PinoLogger } from './utils/logger.utils'
import Container from 'typedi'
import { connect } from './config/database.config'

(async () => {
    try {
        const logger: PinoLogger = Container.get(PinoLogger)

        await connect(logger)

        const PORT: number = parseInt(process.env.PORT || '4000')
        const app = new FastifyServer(PORT)
        
        app.run()
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
})()