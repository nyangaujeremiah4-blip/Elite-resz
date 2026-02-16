import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if(req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, password } = req.body;

  if(!email || !password) return res.status(400).json({ error: 'Email and password required' });

  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', password) // plain text for now; in prod use hashed passwords
      .single();

    if(error || !users) return res.status(401).json({ error: 'Invalid credentials' });

    return res.status(200).json({ user: users });
  } catch(err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}
