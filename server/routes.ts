import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import OpenAI from "openai";

// Initialize OpenAI client - expects OPENAI_API_KEY environment variable
// Replit AI integration provides this automatically
const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get(api.generations.list.path, async (req, res) => {
    const gens = await storage.getGenerations();
    res.json(gens);
  });

  app.post(api.generations.create.path, async (req, res) => {
    try {
      const input = api.generations.create.input.parse(req.body);
      
      // Perform AI generation based on type
      let aiContent = {};
      
      const systemPrompt = "You are a marketing expert. Generate content based on the user's request.";
      const userPrompt = `Type: ${input.type}\nRequest: ${input.prompt}`;

      try {
        const completion = await openai.chat.completions.create({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
          ],
          model: "gpt-4o",
          response_format: { type: "json_object" }, 
        });

        const contentStr = completion.choices[0].message.content;
        if (contentStr) {
          aiContent = JSON.parse(contentStr);
        }
      } catch (error) {
        console.error("OpenAI Error:", error);
        // Fallback for demo if key not present or error
        aiContent = { error: "AI generation failed", details: String(error) };
      }

      // Save to DB
      const generation = await storage.createGeneration({
        ...input,
        content: aiContent,
      });

      res.status(201).json(generation);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  app.get(api.generations.get.path, async (req, res) => {
    const gen = await storage.getGeneration(Number(req.params.id));
    if (!gen) return res.status(404).json({ message: "Not found" });
    res.json(gen);
  });

  return httpServer;
}
