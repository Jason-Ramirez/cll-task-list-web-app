// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


export default function handler(req, res) {
  // const cookies = new Cookies(req, res);
  // console.log('API SERVER', req.headers, cookies.get('LOGIN-TOKEN'));

  res.status(200).json({ name: 'John Doe' })
}
