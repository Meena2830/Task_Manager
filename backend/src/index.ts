// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import { AppDataSource } from './data-source';
// import { Task } from './entity/Task';

// dotenv.config();
// const app = express();
// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 3001;

// AppDataSource.initialize().then(() => {
//   console.log('📦 Database connected');

//   app.get('/tasks', async (_req, res) => {
//     const tasks = await AppDataSource.manager.find(Task);
//     res.json(tasks);
//   });

//   app.post('/tasks', async (req, res) => {
//     const newTask = AppDataSource.manager.create(Task, req.body);
//     const saved = await AppDataSource.manager.save(newTask);
//     res.status(201).json(saved);
//   });

//   app.listen(PORT, () => {
//     console.log(`🚀 Server running at http://localhost:${PORT}`);
//   });
// }).catch((err) => console.error('❌ Error during Data Source initialization', err));

import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source";
import { Task } from "./entity/Task";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;


const getTaskById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const task = await AppDataSource.manager.findOneBy(Task, { id });
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
};

const updateTask = async (req: Request, res: Response) => {
  const id = req.params.id;
  const task = await AppDataSource.manager.findOneBy(Task, { id });
  if (!task) return res.status(404).json({ error: "Task not found" });

  AppDataSource.manager.merge(Task, task, req.body);
  const result = await AppDataSource.manager.save(task);
  res.json(result);
};


AppDataSource.initialize()
  .then(() => {
    console.log("📦 Database connected");

    
    app.get("/", (_req: Request, res: Response) => {
      res.send("✅ API is running");
    });

   
    app.get("/tasks", async (_req: Request, res: Response) => {
      const tasks = await AppDataSource.manager.find(Task);
      res.json(tasks);
    });

    
    app.get("/tasks/:id", getTaskById as any);

    
    app.post("/tasks", async (req: Request, res: Response) => {
      console.log("📥 New task received:", req.body);
      const task = AppDataSource.manager.create(Task, req.body);
      const result = await AppDataSource.manager.save(task);
      console.log("✅ Task saved:", result);
      res.status(201).json(result);
    });

    
    app.put("/tasks/:id", updateTask as any);

   
    app.delete("/tasks/:id", async (req: Request, res: Response) => {
      const id = req.params.id;
      await AppDataSource.manager.delete(Task, id);
      res.status(204).send();
    });

    
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error during Data Source initialization", err);
  });
