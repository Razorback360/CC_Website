import { createClient } from '@supabase/supabase-js';
import { env } from "@/env.mjs";

const projUrl = env.NEXT_PUBLIC_SUPABASE_PROJECT_URL
const apiKey =  env.NEXT_PUBLIC_SUPABASE_API_KEY
export const supabase = createClient(projUrl, apiKey);