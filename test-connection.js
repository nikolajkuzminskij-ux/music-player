// api/test-connection.js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

module.exports = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('tracks')
      .select('*')
      .limit(1);

    if (error) {
      return res.status(500).json({ 
        error: 'Database connection failed', 
        details: error.message 
      });
    }

    res.json({ 
      success: true, 
      message: 'Database connection successful!',
      data: data 
    });
    
  } catch (error) {
    res.status(500).json({ 
      error: 'Connection test failed', 
      details: error.message 
    });
  }
};
