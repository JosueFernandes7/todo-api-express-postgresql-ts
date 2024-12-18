import App from "../app.js";
import { env } from "./env.js";

const PORT = Number(env.PORT) || 3000;
const app = new App();

app.listen(PORT);
