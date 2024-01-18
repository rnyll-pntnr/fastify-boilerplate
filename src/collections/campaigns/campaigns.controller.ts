import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { Service } from 'typedi'

@Service()
export default class CampaignsController{
    private readonly baseUri: string
    constructor(
        private readonly app: FastifyInstance
    ) {
        this.baseUri = '/api/campaigns'
        this.setupRoutes()
    }

    public setupRoutes() {
        this.app.get(`${this.baseUri}/get`, async(request: any, response: FastifyReply) => {
            response.status(200).send({
                success: true,
                message: 'Get all campaigns'
            })
        })

        this.app.post(`${this.baseUri}/stress-test`, async (request: FastifyRequest, response: FastifyReply) => {
            request.log.info('this is test')
            response.status(200).send(request.body)
        })
    }
}