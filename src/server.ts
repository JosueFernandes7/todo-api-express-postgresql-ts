import App from "./app";
import { env } from "./env";

const PORT = Number(env.PORT) || 3000;
const app = new App();

app.listen(PORT);
