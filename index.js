import { supabase } from './supabase.js';

async function testDB() {
  const { data, error } = await supabase
    .from('categories')  // table from your SQL
    .select('*');

  console.log('DATA:', data);
  console.log('ERROR:', error);
}

testDB();
