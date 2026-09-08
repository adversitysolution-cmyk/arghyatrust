import jwt from 'jsonwebtoken';

const JWT_TTL = process.env.JWT_EXPIRES_IN || '12h';

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not set');
  }
  return secret;
}

export function signAdminToken(admin) {
  return jwt.sign(
    {
      sub: String(admin._id),
      email: admin.email,
      username: admin.username,
      name: admin.name,
    },
    getJwtSecret(),
    { expiresIn: JWT_TTL },
  );
}

export function requireAdminAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'Missing auth token' });
  }

  try {
    const payload = jwt.verify(token, getJwtSecret());
    req.admin = payload;
    return next();
  } catch (_error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
