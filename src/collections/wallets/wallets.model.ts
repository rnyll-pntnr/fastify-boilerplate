import { Schema , model, Types, Model, Document } from 'mongoose'

interface WalletDoc extends Document {
    amount: Types.Decimal128
    organization_id: number
}

interface WalletModel extends Model<WalletDoc> {
    getWalletBalance(
        this: Model<WalletDoc>,
        organizationId: number,
    ): void,
    getPaginatedResult(
        page: number,
        pageSize: number,
    ): any
    
}

const WalletSchema = new Schema(
    {
        amount: {
            type: Types.Decimal128,
            required: true
        },
        organization_id: {
            type: Number,
            required: true
        },
        createdAt: {
            type: Date,
            default: () => new Date()
        }
    }, {
        timestamps: true,
        toJSON: {
            transform: (_doc, ret: any) => {
                ret._id = ret._id.toString(),
                ret.amount = parseFloat(ret.amount.toString())
                delete ret.__v
            }
        }
    }
)

WalletSchema.statics.getPaginatedResult = async function (page = 1, pageSize = 10) {
    const skip = (page - 1) * pageSize
    const totalCount = await this.countDocuments({})

    const results = await this.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageSize)

    const totalPages = Math.ceil(totalCount / pageSize)

    return {
        success: true,
        recordsTotal: totalCount,
        recordsFiltered: totalCount,
        data: results.map((data:any) => data.toJSON()),
        pagination: {
            total: totalCount,
            perPage: pageSize,
            currentPage: page,
            lastPage: totalPages
        }
    }
}

const Wallets = model<WalletDoc, WalletModel>('wallets', WalletSchema)

export default Wallets