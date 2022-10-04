import fastify, {
    FastifyRequest,
    FastifyReply,
} from "fastify";
import mongoose, { connect } from "mongoose";
import middle from '@fastify/middie';
import cors from "cors";
import rootRoutes from "./routes/root.routes";

const databaseConnection = process.env.MONGODB_URI || "mongodb://localhost:27017/store";

const app = fastify({
    logger: true,
})

async function connectToDB(): Promise<void> {
    mongoose.connection.on('connected', () => {
        app.log.info({ actor: 'MongoDB' }, 'MongoDb connection is ready');
    });
    mongoose.connection.on('disconnected', () => {
        app.log.error({ actor: 'MongoDB' }, 'MongoDB is disconnected');
    });

    const connectionInstance = await connect(databaseConnection);
    app.log.info({ actor: "MongoDB" }, `MongoDB is connected to ${connectionInstance.connection?.db.databaseName} collection`);
}

app.register(rootRoutes, {});

async function registerModules() {
    await app.register(middle);
    app.use(cors);
}


app.listen({ port: 3333 }, (err, address) => {
    if (err) {
        app.log.error({ actor: "Fastify server" }, JSON.stringify(err));
        process.exit(1)
    }

    app.log.info({ actor: "Fastify server" }, `Server running at ${address} post`);
    connectToDB().then().catch(() => {
        app.log.error({ actor: "MongoDB" }, `MongoDB is having problems to work`);
    });
});
