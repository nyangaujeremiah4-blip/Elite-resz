import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = "https://sptnezzamlgpxeftktgv.supabase.co";     // replace with your actual Supabase project URL
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwdG5lenphbWxncHhlZnRrdGd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4OTM4NDMsImV4cCI6MjA4NjQ2OTg0M30.ycf-czE7weYBFs4B0DbPAhe9R7KrVS4qqcasgAGDG88"; // replace with 

export const supabase = createClient(supabaseUrl, supabaseKey);
