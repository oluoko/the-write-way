"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Editor from "@/components/editor";

const EditorFormSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2),
});

interface DocumentProps {
  id: string;
  userId: string;
  title: string | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface EditorBlockProps {
  document?: DocumentProps | null;
}

const EditorBlock: React.FC<EditorBlockProps> = ({ document }) => {
  if (!document) redirect("/");

  const EditorForm = useForm<z.infer<typeof EditorFormSchema>>({
    resolver: zodResolver(EditorFormSchema),
    defaultValues: {
      title: document?.title || "",
      description: document?.description || "",
    },
  });

  return (
    <div>
      <Form {...EditorForm}>
        <form>
          <FormField
            control={EditorForm.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter Title Here" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={EditorForm.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Editor value={field.value} onChange={field.onChange} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default EditorBlock;
