import { FastifyPluginAsync, FastifyReply, FastifyRequest, RouteShorthandOptions } from "fastify";
import { Static, Type } from '@sinclair/typebox';

const QueryString = Type.Object({
    title: Type.Optional(Type.String())
})

interface ICustomQueries {

}

interface ICustomParams {
    id?: string;
}

interface IRequest {
    Querystring: ICustomQueries,
    Params: ICustomParams,
}

const rootRoutes: FastifyPluginAsync = async (fastify, options): Promise<void> => {

    const getHelloOptions: RouteShorthandOptions = {
        schema: {
            querystring: {
                type: 'object',
                properties: {
                    title: { type: 'string' }
                },
            },
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string' }
                },
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        host: { type: 'string' }
                    }
                }
            }
        }
    };

    fastify.get('/ping', async (request, reply) => {
        return reply.status(200).send('pong\n');
    })

    fastify.get<IRequest>("/hello/:id", getHelloOptions, async (request, reply ): Promise<FastifyReply> => {
        return reply.status(200).send({ host: request.params.id || 'world' });
    })
}

export default rootRoutes;
