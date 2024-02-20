import "dotenv/config";

export const SECRET_KEY = process.env.SECRET_KEY || "secret_dev";

export const PORT = process.env.PORT || 3000;

export const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;
