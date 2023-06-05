
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()




export default async function handler(req, res) {
    
    if (req.method === 'GET') {
        const users = await prisma.gamme.findMany();
        res.json(users);
      }
      if (req.method === 'POST') {
        const { title } = req.body;
        const newGamme = await prisma.gamme.create({
          data: {
           title,
          },
        });

        res.json(newGamme);
      }
      if (req.method === 'PATCH') {
        const { title } = req.body;
        const patchGamme = await prisma.gamme.update({
          data: {
           title,
          },
        });
        
        res.json(patchGamme);
      }
      if (req.method === 'DELETE') {
        const { id } = req.body;
        const deletedGamme = await prisma.gamme.delete({
        where: {
            id,
          },
        });
        
        res.json(deletedGamme);
      }

  }
  