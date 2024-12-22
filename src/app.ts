import express, { Application } from "express";
import routes from "./routes/index.js";
import swaggerUi from "swagger-ui-express";
import YAML from 'yamljs'

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeSwagger();
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
  }

  private initializeRoutes(): void {
    this.app.use("/api", routes);
  }

  private initializeSwagger(): void {
    const specs = YAML.load("swagger.yaml");
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
    console.log(`Swagger Docs available at api-docs endpoint`);
  }
  public listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`App listening on the port ${port}`);
    });
  }
}

export default App;
