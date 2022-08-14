import bcrypt from 'bcrypt';

export default async function handler(req, res) {
 let error;
 const { username, email, password, password2 } = req.body;

 // Check all fields were filled in
 if (!username || !email || !password || !password2) error = 'Please fill in all fields!';

 // check if passwords match
 if (password !== password2) error = 'Passwords dont match!';

 // check if password is more than 6 characters
 if (password.length <= 8) error = 'Password must be atleast 6 characters long!';

 // If an error was found notify user
 if (error) return res.json({ error });

 // Encrypt password (Dont save raw password to database)
 let Hashpassword;
 try {
  const salt = await bcrypt.genSalt(10);
  Hashpassword = await bcrypt.hash(password, salt);
 } catch (err: any) {
  console.log(err);
  return res.json({ error: err.message });
 }

 // Save the new user to database + make sure to create folder
 try {
  const g = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/auth/register`, {
   method: 'post',
   headers: {
    'content-type': 'application/json;charset=UTF-8',
   },
   body: JSON.stringify({
    password: Hashpassword,
    email, username,
   }),
  });
  res.json({ success: 'User successfully created' });
 } catch (err: any) {
  console.log(err);
  return res.json({ error: err.message });
 }
}
