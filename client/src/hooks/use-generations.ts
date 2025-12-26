import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type Generation } from "@shared/routes";
import { insertGenerationSchema } from "@shared/schema";
import { z } from "zod";

export function useGenerations() {
  return useQuery({
    queryKey: [api.generations.list.path],
    queryFn: async () => {
      const res = await fetch(api.generations.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch generations");
      return api.generations.list.responses[200].parse(await res.json());
    },
  });
}

export function useGeneration(id: number) {
  return useQuery({
    queryKey: [api.generations.get.path, id],
    queryFn: async () => {
      const url = api.generations.get.path.replace(":id", String(id));
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch generation");
      return api.generations.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}

type CreateGenerationInput = z.infer<typeof insertGenerationSchema>;

export function useCreateGeneration() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateGenerationInput) => {
      const res = await fetch(api.generations.create.path, {
        method: api.generations.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create generation");
      }
      return api.generations.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.generations.list.path] });
    },
  });
}
