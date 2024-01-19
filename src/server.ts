import 'reflect-metadata'
import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { Service } from 'typedi'
import Controllers from './utils/controllers.utils'
import moment from 'moment'

@Service()
export default class FastifyServer {
    readonly server: FastifyInstance
    readonly port: number
    constructor(
        port: number,
    ) {
        this.port = port
        this.server = this._serverSetup()
    }

    public run(): void {
        this.server.listen({ port: this.port }, (error: any) => {
            if (error) {
                process.exit(1)
            }
        })
    }

    private controllers(
        app: FastifyInstance
    ) {
        return Controllers(app)
    }

    private _serverSetup(): FastifyInstance {
        const app: FastifyInstance = fastify({
            logger: {
                transport: {
                    target: 'pino-pretty',
                },
                base: {
                    pid: false,
                },
                timestamp: () => `,"time":"${moment()}"`,
            },
            disableRequestLogging: true
        })

        app.register(import('@fastify/cors'))
        app.register(import('@fastify/cookie'))

        this.controllers(app)

        app.get('/api/test', async (request: FastifyRequest, response: FastifyReply) => {
            response.status(201).send({
                success: true,
                message: 'Get all data'
            })
        })

        return app
    }
}