import express from "express";
import cors from "cors";

import { corsOptions } from "./config/cors";
import { env } from "./config/env";

import { routes } from "./routes";
import { errorMiddleware } from "./middleware/errorMiddleware";

const app = express();

app.use(cors(corsOptions))

app.use(express.json());
app.use(routes);
app.use(errorMiddleware);

app.listen(env.PORT, () => console.log(`Server is running in ${env.PORT}`));