import { connect, Mongoose } from "mongoose";
import { config } from "dotenv";
import { UserModel } from "./models/UserModel";
config();

class MongoDatabase {
    private mongoose_instance: Mongoose | undefined;
    constructor() {}

    private async registerModels() {
        const testUser = new UserModel({
            email: "matheustavarestrindade@hotmail.com",
            password: "teste123",
            firstName: "Matheus",
            lastName: "Tavares Trindade",
            phone: "22 998015686",
            address: "Rua 3",
            city: "Macaé",
            state: "RJ",
            zip: "27937190",
            country: "Brasil",
            sms_notification: true,
            email_notification: true,
            whatsapp_notification: true,
            telegram_notification: true,
            notify_numbers: [],
            notify_emails: [],
            notify_telegram_groups: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        let userObject = testUser.toObject() as any;

        delete userObject._id;
        userObject = await UserModel.findOneAndUpdate({ email: userObject.email }, userObject, { upsert: true });
    }

    public async initializeDatabase() {
        if (!process.env.MONGO_URI) {
            console.log("Cannot connect to mongo with no URI");
            return;
        }
        this.mongoose_instance = await connect(process.env.MONGO_URI);
        await this.registerModels();
    }
}

export default MongoDatabase;
