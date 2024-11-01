import { createPool, Pool } from 'mysql2/promise';

const pool: Pool = createPool({
    host: process.env.NEXT_PUBLIC_DB_HOST,
    user: process.env.NEXT_PUBLIC_DB_USER,
    password: process.env.NEXT_PUBLIC_DB_PASSWORD,
    database: process.env.NEXT_PUBLIC_DB_DATABASE,
    port: Number(process.env.NEXT_PUBLIC_DB_PORT),
});

pool.getConnection()
    .then((connection) => {
        console.log("Database connected successfully");
        connection.release();
    })
    .catch((err) => {
        console.error("Database connection error:", err);
    });

export default pool;
