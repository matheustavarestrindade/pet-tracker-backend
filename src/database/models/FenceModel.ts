import { Schema, model, Types } from "mongoose";

export interface IFenceModel {
    owner_id: Types.ObjectId;
    name: string;
    description: string;
    coordinates: [
        {
            latitude: number;
            longitude: number;
        }
    ];
}

export const FenceModelSchema = new Schema<IFenceModel>({
    owner_id: Types.ObjectId,
    name: String,
    description: String,
    coordinates: [
        {
            latitude: Number,
            longitude: Number,
        },
    ],
});

export default model<IFenceModel>("Fence", FenceModelSchema);
