
export const dbConfig = { url: process.env.DATABASE_URL, pool: 10 };
export const connectDB = async () => console.log('DB connected to', dbConfig.url);
