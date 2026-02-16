// /api/register.js

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client using Vercel environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ error: 'Email, username, and password are required' });
    }

    // Check if email already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Insert new user
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert([
        {
          email,
          password, // ideally hashed
          username,
          role: 'buyer', // default role
          is_active: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (insertError) {
      return res.status(500).json({ error: 'Failed to create user' });
    }

    // Return safe user data
    const { password: _, ...safeUser } = newUser;

    return res.status(201).json({ user: safeUser });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
