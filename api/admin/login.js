const { checkPassword, createSessionCookie } = require('../_lib/auth');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método não permitido.' });
    return;
  }
  let body = req.body;
  if (!body || typeof body === 'string') {
    try { body = JSON.parse(body || '{}'); } catch { body = {}; }
  }
  const { password } = body || {};
  if (!checkPassword(password)) {
    res.status(401).json({ error: 'Senha incorreta.' });
    return;
  }
  res.setHeader('Set-Cookie', createSessionCookie());
  res.status(200).json({ ok: true });
};
