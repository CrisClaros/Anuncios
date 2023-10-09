import { PrismaClient } from '@prisma/client';
import React, { useState } from 'react';
import Axios from 'axios';

const prisma = new PrismaClient();

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const { name, resolution, hdmiConnected } = req.body; // Agrega hdmiConnected desde la solicitud

    const newScreen = await prisma.screen.create({
      data: {
        name: name,
        resolution: resolution,
        hdmiConnected: hdmiConnected, // Asigna el estado HDMI conectado desde la solicitud
      },
    });
    console.log(newScreen);

    res.status(200).json(newScreen);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno' });
  } finally {
    await prisma.$disconnect(); // Cierra la conexión con la base de datos después de la operación.
  }
}

export default handler;
