import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { Service } from 'typedi'
import Wallets from "./wallets.model"

@Service()
export default class WalletsController{
    private readonly baseUri: string
    constructor(
        private readonly app: FastifyInstance
    ) {
        this.baseUri = '/api/wallets'
        this.setupRoutes()
    }

    public setupRoutes() {
        this.app.get(`${this.baseUri}/get`, async (request: any, response: FastifyReply) => {
            const result: any = await Wallets.getPaginatedResult(request.query.page, request.query.pageSize)

            response.send(result)
        })
    }
}