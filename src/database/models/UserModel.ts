import { Schema, model, Types } from "mongoose";
import { IFenceModel, FenceModelSchema } from "./FenceModel";
import { IPetModel, PetModelSchema } from "./PetModel";
import bcrypt from "bcrypt";

interface IUserModel {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;

    // Notification settings
    sms_notification: boolean;
    email_notification: boolean;
    whatsapp_notification: boolean;
    telegram_notification: boolean;

    notify_numbers: string[];
    notify_emails: string[];
    notify_telegram_groups: string[];

    pets: IPetModel[];
    geo_fences: IFenceModel[];

    createdAt: Date;
    updatedAt: Date;
}

const UserModelSchema = new Schema<IUserModel>({
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },

    sms_notification: { type: Boolean, required: false, default: true },
    email_notification: { type: Boolean, required: false, default: true },
    whatsapp_notification: { type: Boolean, required: false, default: true },
    telegram_notification: { type: Boolean, required: false, default: true },

    notify_numbers: { type: [String], required: false },
    notify_emails: { type: [String], required: false },
    notify_telegram_groups: { type: [String], required: false },

    pets: { type: [Types.ObjectId], ref: "PetModel" },
    geo_fences: { type: [Types.ObjectId], ref: "FenceModel" },

    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
});

UserModelSchema.pre("save", async function (next) {
    const user = this;
    console.log("save");
    if (!user.isModified("password")) {
        return next();
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    next();
});

UserModelSchema.pre("updateOne", { document: false, query: true }, async function (next) {
    const obj: any = this as any;
    const update = obj.getUpdate();
    const password = update?.password;
    if (!password) {
        return next();
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    update.password = hashedPassword;
    next();
});

UserModelSchema.pre("updateOne", { document: true, query: false }, async function (next) {
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    next();
});

UserModelSchema.pre("findOneAndUpdate", async function (next) {
    const update: any = this.getUpdate();
    const password = update?.password;
    if (!password || !update) {
        return next();
    }
    const hashedPassword = await bcrypt.hash(update.password, 10);
    update.password = hashedPassword;
    next();
});

export const UserModel = model<IUserModel>("User", UserModelSchema);
