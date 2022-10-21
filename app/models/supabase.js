const  {createClient}  = require('@supabase/supabase-js')

const supabase = createClient('https://qtzmtysieievsvunzhbe.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0em10eXNpZWlldnN2dW56aGJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYzMjE1NjUsImV4cCI6MTk4MTg5NzU2NX0.ZeNGdjE38KRjRF_FNNMWaRZ0LS1yNdnbJR8rHlYSXTE')
exports.uploadImageAvatar = async (image) =>{
  const { data, error }= await supabase
        .storage
        .from('avatar')
        .upload(Math.random().toString(), image.buffer, { contentType: image.mimetype})
  console.log(error);
  return "https://qtzmtysieievsvunzhbe.supabase.co/storage/v1/object/public/"+data.Key
}

exports.uploadImageBook = async (image) =>{
  const { data, error }= await supabase
        .storage
        .from('booking')
        .upload(Math.random().toString(), image.buffer, { contentType: image.mimetype})
  
  console.log(error);  
  console.log(data);
  return "https://qtzmtysieievsvunzhbe.supabase.co/storage/v1/object/public/"+data.Key
}
