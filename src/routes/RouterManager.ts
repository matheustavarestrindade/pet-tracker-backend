import express, { Express } from "express";
import { config } from "dotenv";
import PetRegisterRoute from "./modules/pet/PetRegisterRoute";
config();

const API_BASE_PATH = process.env.API_BASE_PATH || "";

class RouterManager {
    private server: Express;
    // Routers
    private readonly pet_register_route: PetRegisterRoute;

    constructor() {
        this.server = express();
        this.pet_register_route = new PetRegisterRoute({ subroute: "/pet", base_path: "/register" });
        this.startServer();
    }

    private async registerMiddlewares() {
        this.server.use(express.json());
    }

    private async registerRouters() {
        this.server.use(API_BASE_PATH, this.pet_register_route.getRouter());
    }

    private async startServer() {
        await this.registerMiddlewares();
        await this.registerRouters();
        this.server.listen(process.env.SERVER_PORT, () => {
            console.log(`[INFO] Server is running on port ${process.env.SERVER_PORT}`);
        });
    }
}

export default RouterManager;
