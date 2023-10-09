import { PrismaClient } from '@prisma/client';
import React, { useState } from 'react';
import Axios from 'axios';

const prisma = new PrismaClient();

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const { title, todo, description, startDate, endDate, type } = req.body;
    const { screen } = req.body;

    // Convierte las cadenas de fecha y hora en objetos Date
    const startDateValue = new Date(startDate);
    const endDateValue = new Date(endDate);

    const newTodo = await prisma.todo.create({
      data: {
        title: title,
        todo: todo,
        description: description,
        startDate: startDateValue, 
        endDate: endDateValue,     
        type: type,
      },
    });
    console.log(newTodo);

    res.status(200).json(newTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno' });
  } finally {
    await prisma.$disconnect(); // Cierra la conexión con la base de datos después de la operación.
  }
}

export default handler;
