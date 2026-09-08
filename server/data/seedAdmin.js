import { Admin } from '../models/Admin.js';

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function inferUsernameFromEmail(email) {
  const [left] = String(email || '').split('@');
  return (left || 'admin').trim().toLowerCase();
}

export async function ensureDefaultAdmin() {
  const email = normalizeEmail(process.env.ADMIN_EMAIL || 'admin@arghyatrust.org');
  const username = String(process.env.ADMIN_USERNAME || inferUsernameFromEmail(email))
    .trim()
    .toLowerCase();
  const password = String(process.env.ADMIN_PASSWORD || 'admin123');
  const name = String(process.env.ADMIN_NAME || 'Admin User').trim();

  if (!email || !password) return;

  const existingByEmail = await Admin.findOne({ email });
  if (existingByEmail) return;

  const existingByUsername = await Admin.findOne({ username });
  if (existingByUsername) return;

  await Admin.create({
    email,
    username,
    password,
    name,
  });

  console.log(`Default admin created for ${email}`);
}
