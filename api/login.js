// /api/login.js

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client using environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check user in Supabase "users" table
    const { data: userData, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password (assuming plain text here; ideally use hashing)
    // If you hashed passwords, replace this with bcrypt.compare(password, userData.password)
    if (userData.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Login successful — return user data (omit password)
    const { password: _, ...safeUser } = userData;

    return res.status(200).json({ user: safeUser });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
