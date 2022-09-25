const  {createClient}  = require('@supabase/supabase-js')

const supabase = createClient('https://lvspvwkgiozgxaoaurky.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2c3B2d2tnaW96Z3hhb2F1cmt5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2Mzc2MTUyNywiZXhwIjoxOTc5MzM3NTI3fQ.Yd8am1BQUNIHOe9F3Uaxzsl0CUqPZLcOuaCP1ZsJxOk')
const uploadImage = async (image) =>{
  
  const { data, error }= await supabase
        .storage
        .from('avatar')
        .upload(Math.random().toString(), image.buffer, { contentType: image.mimetype})
  
  console.log(error);  
  return "https://lvspvwkgiozgxaoaurky.supabase.co/storage/v1/object/public/"+data.Key
}
module.exports = uploadImage
