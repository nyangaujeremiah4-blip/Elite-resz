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
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if(existingUser) return res.status(409).json({ error: 'Email already exists' });

    const { data, error } = await supabase
      .from('users')
      .insert([{ email, password, role: 'buyer', is_active: 1 }])
      .select()
      .single();

    if(error) return res.status(500).json({ error: 'Registration failed' });

    return res.status(200).json({ user: data });
  } catch(err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
  }
