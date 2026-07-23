import { z } from "zod";

// Schema for creating a new post
export const createPostSchema = z.object({
    title: z
        .string({ required_error: "Title is required" })
        .min(3, "Title must be at least 3 characters")
        .max(100, "Title must not exceed 100 characters")
        .trim(),

    content: z
        .string({ required_error: "Content is required" })
        .min(10, "Content must be at least 10 characters")
        .trim(),
});

// Schema for updating a post (all fields optional)
export const updatePostSchema = z.object({
    title: z
        .string()
        .min(3, "Title must be at least 3 characters")
        .max(100, "Title must not exceed 100 characters")
        .trim()
        .optional(),

    content: z
        .string()
        .min(10, "Content must be at least 10 characters")
        .trim()
        .optional(),
}).refine(
    (data) => data.title !== undefined || data.content !== undefined,
    { message: "At least one field (title or content) must be provided" }
);
