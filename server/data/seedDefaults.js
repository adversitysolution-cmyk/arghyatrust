import { Event } from '../models/Event.js';
import { defaultEvents } from './defaultContent.js';

export async function seedDefaults() {
  const eventCount = await Event.estimatedDocumentCount();

  if (eventCount === 0 && defaultEvents.length > 0) {
    await Event.insertMany(defaultEvents);
  }
}
