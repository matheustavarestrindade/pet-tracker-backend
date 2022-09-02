import { Router as ExpressRouter, Express, Request, Response } from "express";
abstract class Router {
    private router: ExpressRouter = ExpressRouter();

    constructor({ subroute, base_path }: { subroute?: string; base_path: string }) {
        const path = subroute + base_path;
        console.log(path);
        this.router.get(path + "/", this.get);
        this.router.post(path + "/", this.post);
        this.router.put(path + "/", this.put);
        this.router.delete(path + "/", this.delete);
        this.router.patch(path + "/", this.patch);
        this.router.options(path + "/", this.options);
    }

    protected async get(req: Request, res: Response): Promise<void> {
        res.send("ROUTE NOT IMPLEMENTED");
    }
    protected async post(req: Request, res: Response): Promise<void> {
        res.send("ROUTE NOT IMPLEMENTED");
    }
    protected async put(req: Request, res: Response): Promise<void> {
        res.send("ROUTE NOT IMPLEMENTED");
    }
    protected async delete(req: Request, res: Response): Promise<void> {
        res.send("ROUTE NOT IMPLEMENTED");
    }
    protected async patch(req: Request, res: Response): Promise<void> {
        res.send("ROUTE NOT IMPLEMENTED");
    }
    protected async options(req: Request, res: Response): Promise<void> {
        res.send("ROUTE NOT IMPLEMENTED");
    }

    public getRouter(): ExpressRouter {
        return this.router;
    }
}

export default Router;
