import { SiteClient } from 'datocms-client';

export default async function recebedorRequests(request, response) {
    if (request.method === 'POST') {
        const TOKEN = '638673e4c88ecfae31fbfc1a1a0ffd';
        const client = new SiteClient(TOKEN);

        const registroCriado = await client.items.create({
            itemType: "972368",
            ...request.body,
        })

        response.json({
            dados: 'Algum dado',
            registroCriado: registroCriado,
        })
        return;
    }

    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST sim!'
    })
}