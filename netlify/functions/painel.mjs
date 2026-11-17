import app from '../../server.mjs';
import { openTurso } from '../../turso.mjs';

export const config = { path: '/api/:action' };

export default async function handler(request, context) {
  const { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN, MKTP_SETUP_CODE } = process.env;
  if (!TURSO_DATABASE_URL || !TURSO_AUTH_TOKEN) {
    return Response.json({ error: 'O banco online ainda precisa ser configurado.' }, { status: 503 });
  }
  try {
    const DB = openTurso(TURSO_DATABASE_URL, TURSO_AUTH_TOKEN);
    return await app.fetch(request, { DB, SETUP_CODE: MKTP_SETUP_CODE, CLIENT_IP: context.ip });
  } catch (error) {
    console.error(error.message);
    return Response.json({ error: 'Falha na configuração do painel.' }, { status: 503 });
  }
}
