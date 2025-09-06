import type { CorsOptions } from "cors";

const corsOptions: CorsOptions = {
  origin: [
    "http://localhost:3333"
  ],
  methods: ["GET", "POST"]
};

export { corsOptions };