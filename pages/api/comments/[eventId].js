function handler(req, res) {
  const eventId = req.query.eventId;

  if (req.method === "POST") {
    const { email, name, text } = req.body;
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input" });
      return;
    }
    console.log(email, name, text);
    res.status(201).json({ message: "added comment." });
  }
  if (req.method === "GET") {
    const dummyList = [
      { id: "c1", name: "max", email: "max@email.com", text: "hurray!" },
    ];
    res.status(200).json({ comments: dummyList });
  }
}

export default handler;
