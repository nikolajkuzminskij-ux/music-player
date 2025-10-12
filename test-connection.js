// test-connection.js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://supabase.com/dashboard/project/tnrbdbtasqaisartsemy/editor/17412?schema=public', // ваш URL
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRucmJkYnRhc3FhaXNhcnRzZW15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyMDg1NDUsImV4cCI6MjA3NTc4NDU0NX0.YSOeDbp8kj0mG3GMj3wa24DcnwygNBbftMAWl5n8ERA' // ваш anon key
);

async function testConnection() {
  const { data, error } = await supabase
    .from('tracks')
    .select('count');
  
  if (error) {
    console.error('❌ Connection failed:', error.message);
  } else {
    console.log('✅ Connection successful!');
  }
}

testConnection();
