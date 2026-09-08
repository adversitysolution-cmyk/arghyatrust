import crypto from 'crypto';

const SESSION_TTL_MS = Number(process.env.ADMIN_SESSION_TTL_MS || 1000 * 60 * 60 * 12);
const sessions = new Map();

function createToken() {
  return crypto.randomBytes(32).toString('base64url');
}

function cleanupSessions() {
  const now = Date.now();
  for (const [token, session] of sessions.entries()) {
    if (session.expiresAt <= now) {
      sessions.delete(token);
    }
  }
}

export function createAdminSession({ email, name }) {
  cleanupSessions();
  const token = createToken();
  const expiresAt = Date.now() + SESSION_TTL_MS;
  sessions.set(token, { email, name, expiresAt });
  return { token, expiresAt };
}

export function getAdminFromToken(token) {
  cleanupSessions();
  if (!token) return null;
  const session = sessions.get(token);
  if (!session) return null;
  if (session.expiresAt <= Date.now()) {
    sessions.delete(token);
    return null;
  }
  return session;
}

export function requireAdminAuth(req, res, next) {
  const authorization = req.headers.authorization || '';
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
  const admin = getAdminFromToken(token);

  if (!admin) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  req.admin = admin;
  return next();
}
