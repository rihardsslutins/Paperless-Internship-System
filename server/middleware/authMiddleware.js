// packages
import jwt from 'jsonwebtoken';

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    // get token from authorization header
    token = req.headers.authorization.split(' ')[1];

    // verify token
    jwt.verify(token, process.env.JWT_SECRET_STRING, (err, decoded) => {
      // checks if token is absolute
      if (err) {
        console.log(token)
        return res.status(401).json({ error: 'JWT nav oriģināls' });
      }
      // Get user from token
      req.user = decoded;
      next();
      return;
    });
  }
  // checks if token exists (can only exist if the user has registered or logged in)
  if (!token) {
    return res.status(401).json({ error: 'Lūdzu pieslēdzies vai reģistrējies' });
  }
};

export { protect };
