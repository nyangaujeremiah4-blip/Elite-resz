import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Insert new user into Supabase
    const { data, error } = await supabase
      .from('users')
      .insert([{ email, password }]); // In production, hash the password!

    if (error) return res.status(400).json({ success: false, error });
    return res.status(200).json({ success: true, user: data[0] });
  }
  res.status(405).json({ success: false, message: 'Method not allowed' });
      }
