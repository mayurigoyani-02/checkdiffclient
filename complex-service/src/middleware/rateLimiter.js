
// INFRA - changing this impacts ALL endpoints
let requests = new Map();
export const rateLimiter = (req,res,next) => {
  const ip = req.ip;
  const count = requests.get(ip) || 0;
  if (count > 100) return res.status(429).json({ error: 'Too many requests' });
  requests.set(ip, count+1);
  setTimeout(() => requests.set(ip, (requests.get(ip)||1)-1), 60000);
  next();
};
