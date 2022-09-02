import { Schema, model, ObjectId, Types } from "mongoose";

export interface IPetModel {
    owner_id: ObjectId;
    name: string;
    pet_type?: string;
    breed?: string;
    birthday: Date;
    weight?: number;
    description?: string;
    image?: string;
    geo_fences_ids?: string[];
    sent_notifications?: [
        {
            from: string;
            message: string;
            date: Date;
        }
    ];
    latest_locations?: [
        {
            latitude: number;
            longitude: number;
            date: Date;
        }
    ];
}

export const PetModelSchema = new Schema<IPetModel>({
    owner_id: Types.ObjectId,
    name: { type: String, required: true },
    pet_type: { type: String, required: false },
    breed: { type: String, required: false },
    birthday: { type: Date, required: false },
    weight: { type: Number, required: false },
    description: { type: String, required: false },
    image: { type: String, required: false },
    geo_fences_ids: { type: [Types.ObjectId], required: false, ref: "FenceModel" },
    sent_notifications: {
        type: [
            {
                from: String,
                message: String,
                date: Date,
            },
        ],
        required: false,
    },
    latest_locations: {
        type: [
            {
                latitude: Number,
                longitude: Number,
                date: Date,
            },
        ],
        required: false,
    },
});

export default model<IPetModel>("Pet", PetModelSchema);
