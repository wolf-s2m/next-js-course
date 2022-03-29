function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    console.log("email");
    console.log(email);
    res.status(201).json({ message: "Succes!" });
  } else {
    res.status(200).json({ message: "this works!" });
  }
}

export default handler;
