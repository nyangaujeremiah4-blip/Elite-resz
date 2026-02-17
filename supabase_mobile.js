import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = "YOUR_SUPABASE_URL";     // replace with your actual Supabase project URL
const supabaseKey = "YOUR_SUPABASE_ANON_KEY"; // replace with your actual anon key

export const supabase = createClient(supabaseUrl, supabaseKey);
