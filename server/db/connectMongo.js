import dns from 'dns';
import mongoose from 'mongoose';

const fallbackDnsServers = ['1.1.1.1', '8.8.8.8'];

function getMongoDnsServers() {
  return (process.env.MONGODB_DNS_SERVERS || '')
    .split(',')
    .map((server) => server.trim())
    .filter(Boolean);
}

function isLoopbackDnsServer(server) {
  return server === '127.0.0.1' || server === '::1' || server.startsWith('127.');
}

function ensureMongoDnsResolvers() {
  const configuredServers = getMongoDnsServers();
  const currentServers = dns.getServers();
  const shouldUseFallback =
    configuredServers.length > 0 ||
    currentServers.length === 0 ||
    currentServers.every(isLoopbackDnsServer);

  if (!shouldUseFallback) return;

  const servers = configuredServers.length > 0 ? configuredServers : fallbackDnsServers;
  dns.setServers(servers);
  console.warn(`MongoDB DNS resolvers set to: ${servers.join(', ')}`);
}

export async function connectMongo() {
  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error('MONGO_URI (or MONGODB_URI) is not set');
  }

  ensureMongoDnsResolvers();

  await mongoose.connect(mongoUri, {
    dbName: process.env.MONGODB_DB || 'arghya_trust',
  });
}
