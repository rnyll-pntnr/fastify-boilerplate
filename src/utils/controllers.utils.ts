import { FastifyInstance } from "fastify"
import CampaignsController from "../collections/campaigns/campaigns.controller"
import WalletsController from "../collections/wallets/wallets.controller"

export default function Controllers (
    app: FastifyInstance
) {
    return [
        new CampaignsController(app),
        new WalletsController(app)
    ]
}