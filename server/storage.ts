import { db } from "./db";
import { generations, type Generation, type InsertGeneration } from "@shared/schema";

export interface IStorage {
  getGenerations(): Promise<Generation[]>;
  createGeneration(generation: InsertGeneration): Promise<Generation>;
  getGeneration(id: number): Promise<Generation | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getGenerations(): Promise<Generation[]> {
    return await db.select().from(generations).orderBy(generations.createdAt);
  }

  async createGeneration(generation: InsertGeneration): Promise<Generation> {
    const [newGen] = await db.insert(generations).values(generation).returning();
    return newGen;
  }

  async getGeneration(id: number): Promise<Generation | undefined> {
    const [gen] = await db.select().from(generations).where({ id } as any); // Simple match
    // Actually Drizzle where clause:
    // return await db.query.generations.findFirst({ where: eq(generations.id, id) });
    // Let's use the explicit query builder pattern from the guide
    return undefined; // Placeholder fixed below in routes.ts with direct db calls or fixing this class
  }
}

// Fixing the implementation to match the guide's style more closely
import { eq } from "drizzle-orm";

export class BetterDatabaseStorage implements IStorage {
  async getGenerations(): Promise<Generation[]> {
    return await db.select().from(generations);
  }

  async createGeneration(gen: InsertGeneration): Promise<Generation> {
    const [newGen] = await db.insert(generations).values(gen).returning();
    return newGen;
  }

  async getGeneration(id: number): Promise<Generation | undefined> {
    const [gen] = await db.select().from(generations).where(eq(generations.id, id));
    return gen;
  }
}

export const storage = new BetterDatabaseStorage();
