fetch('https://shrikishan-frontend.vercel.app/api/v1/me')
  .then(res => {
    console.log("Status:", res.status);
    console.log("Content-Type:", res.headers.get("content-type"));
  })
  .catch(console.error);
