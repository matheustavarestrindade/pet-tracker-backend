import MongoDatabase from "./database/MongoDatabase";
import RouterManager from "./routes/RouterManager";

let instance: Index | undefined = undefined;

class Index {
    private router_manager: RouterManager = new RouterManager();
    private mongo_database: MongoDatabase = new MongoDatabase();

    constructor() {
        instance = this;
        this.initialize();
    }

    public async initialize() {
        await this.mongo_database.initializeDatabase();
    }

    public getRouterManager(): RouterManager {
        return this.router_manager;
    }

    public static getInstance(): Index {
        if (!instance) {
            instance = new Index();
        }
        return instance;
    }
}
new Index();

export default Index;
