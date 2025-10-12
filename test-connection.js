// test-connection.js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://abc123def456.supabase.co', // ваш URL
  'eyJhbGciOiJIUzI1NiIs...' // ваш anon key
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
