import Router from "../../Router";
import { Request, Response } from "express";
import { UserModel } from "../../../database/models/UserModel";
import bcrypt from "bcrypt";
import PetModel from "../../../database/models/PetModel";
class PetRegisterRoute extends Router {
    constructor({ subroute, base_path }: { subroute?: string; base_path: string }) {
        super({ subroute, base_path });
    }

    protected async post(req: Request, res: Response): Promise<void> {
        const { email, password, name, birthDay } = req.body;
        if (!email || !password || !name || !birthDay) {
            res.status(400).send("Missing parameters");
            return;
        }

        const user = await UserModel.findOne({
            where: {
                email,
            },
        });
        if (!user) {
            // User not found
            res.status(404).send("User not found");
            return;
        }

        const hashedPasswordFromDatabase = user.password;
        const isPasswordCorrect = await bcrypt.compare(password, hashedPasswordFromDatabase);
        if (!isPasswordCorrect) {
            // Wrong password
            res.status(401).send("Wrong password");
            return;
        }

        const pet = new PetModel({
            name,
            birthday: birthDay,
        });

        await pet.save();
        // Created new pet
        user.pets.push(pet);
        await user.save();

        res.send(pet._id);
    }
}

export default PetRegisterRoute;
