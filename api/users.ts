import type { VercelRequest, VercelResponse } from '@vercel/node';

// Dados iniciais
let users = [
  { id: "1", name: "Ada Lovelace", email: "ada@lovelace.dev", age: 28 },
  { id: "2", name: "Alan Turing", email: "alan@turing.ai", age: 41 },
  { id: "3", name: "Linus Torvalds", email: "linus@kernel.org", age: 30 },
  { id: "4", name: "Grace Hopper", email: "grace@cobol.dev", age: 79 },
  { id: "5", name: "Margaret Hamilton", email: "margaret@apollo.org", age: 33 },
  { id: "6", name: "Tim Berners-Lee", email: "tim@w3.org", age: 34 },
  { id: "7", name: "Dennis Ritchie", email: "dennis@c.lang", age: 42 }
];

export default function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { method, query, body } = req;
  const userId = query.id as string | undefined;

  try {
    switch (method) {
      case 'GET':
        if (userId) {
          const user = users.find(u => u.id === userId);
          return user 
            ? res.status(200).json(user) 
            : res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json(users);

      case 'POST':
        const newUser = {
          ...body,
          id: Date.now().toString()
        };
        users.push(newUser);
        return res.status(201).json(newUser);

      case 'PUT':
        if (!userId) {
          return res.status(400).json({ error: 'User ID is required' });
        }
        const updateIndex = users.findIndex(u => u.id === userId);
        if (updateIndex === -1) {
          return res.status(404).json({ error: 'User not found' });
        }
        users[updateIndex] = { ...users[updateIndex], ...body, id: userId };
        return res.status(200).json(users[updateIndex]);

      case 'DELETE':
        if (!userId) {
          return res.status(400).json({ error: 'User ID is required' });
        }
        const deleteIndex = users.findIndex(u => u.id === userId);
        if (deleteIndex === -1) {
          return res.status(404).json({ error: 'User not found' });
        }
        users.splice(deleteIndex, 1);
        return res.status(204).end();

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}