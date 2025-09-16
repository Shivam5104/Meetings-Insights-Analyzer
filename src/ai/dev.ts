import { config } from 'dotenv';
config();

import '@/ai/flows/identify-key-details.ts';
import '@/ai/flows/detect-lag-details.ts';
import '@/ai/flows/assess-meeting-sentiment.ts';