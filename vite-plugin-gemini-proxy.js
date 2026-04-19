import { loadEnv } from 'vite';

const GEMINI_HOST = 'https://generativelanguage.googleapis.com';

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function createGeminiMiddleware(mode) {
  return async function geminiApiMiddleware(req, res, next) {
    const pathOnly = req.url?.split('?')[0] || '';
    if (pathOnly !== '/api/gemini') {
      next();
      return;
    }
    if (req.method !== 'POST') {
      res.statusCode = 405;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Method not allowed' }));
      return;
    }

    const env = loadEnv(mode, process.cwd(), '');
    const apiKey = env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(
        JSON.stringify({
          error:
            'GEMINI_API_KEY is not set. Add it to .env in the project root (see .env.example) and restart npm run dev.',
        })
      );
      return;
    }

    let raw;
    try {
      raw = await readBody(req);
    } catch (e) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Could not read body' }));
      return;
    }

    let payload;
    try {
      payload = JSON.parse(raw);
    } catch {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Invalid JSON body' }));
      return;
    }

    const model = payload.model || env.GEMINI_MODEL || 'gemini-2.0-flash';
    const requestBody = payload.requestBody;
    if (!requestBody) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Missing requestBody' }));
      return;
    }

    const upstreamUrl = `${GEMINI_HOST}/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;

    try {
      const upstream = await fetch(upstreamUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });
      const text = await upstream.text();
      res.statusCode = upstream.status;
      res.setHeader('Content-Type', 'application/json');
      res.end(text);
    } catch (err) {
      res.statusCode = 502;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: err?.message || 'Proxy request failed' }));
    }
  };
}

export function geminiProxyPlugin() {
  return {
    name: 'labsim-gemini-proxy',
    configureServer(server) {
      server.middlewares.use(createGeminiMiddleware(server.config.mode));
    },
    configurePreviewServer(server) {
      server.middlewares.use(createGeminiMiddleware(server.config.mode));
    },
  };
}
