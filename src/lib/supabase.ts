import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jumqftvsupzdnitwqpoo.supabase.co';
const supabaseAnonKey = 'sb_publishable_b8F5KJb-fAK9mg77UqXngw_ILD8G_JA';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
