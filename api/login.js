import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Query user from Supabase
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', password) // In production, use hashed password!
      .single();

    if (error) return res.status(400).json({ success: false, error });
    if (!data) return res.status(404).json({ success: false, message: 'User not found' });

    return res.status(200).json({ success: true, user: data });
  }
  res.status(405).json({ success: false, message: 'Method not allowed' });
      }
