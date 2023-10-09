import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).end();
  }

  const { id } = req.query;
  const { screen } = req.body;

  try {
    // No es necesario conectar explícitamente con Prisma, ya que Prisma administra la conexión automáticamente.

    const updatedScreen = await prisma.pantalla.update({
      where: { id: parseInt(id, 10) },
      data: {
      screen: screen,
      },
    });

    console.log(updateScreen);

    res.status(200).json(updatedScreen);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'No se pudo actualizar' });
  } finally {
    await prisma.$disconnect(); // Cierra la conexión con la base de datos después de la operación.
  }
}

export default handler;
