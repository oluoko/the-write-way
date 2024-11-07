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
import axios from "axios";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";
import { useToast } from "@/hooks/use-toast";
import DrawerAi from "./drawer-ai";

const EditorFormSchema = z.object({
  title: z.string().min(2).max(255),
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
  const { toast } = useToast();
  if (!document) redirect("/");

  const EditorForm = useForm<z.infer<typeof EditorFormSchema>>({
    resolver: zodResolver(EditorFormSchema),
    defaultValues: {
      title: document?.title || "",
      description: document?.description || "",
    },
  });

  async function onUpdateChange(data: z.infer<typeof EditorFormSchema>) {
    try {
      await axios.put(`/api/document/${document?.id}`, data);

      toast({
        title: "Document Updated Successfully",
        description: "Your document has been updated successfully",
        variant: "success",
      });

      revalidatePath("/");
      revalidatePath(`/documents/${document?.id}`);
    } catch (error) {
      //   console.log(error);
      //   toast({
      //     title: "Something went wrong",
      //     description: "Could Save Changes. Please try again later",
      //     variant: "destructive",
      //   });
    }
  }

  async function onDeleteChange() {
    try {
      await axios.delete(`/api/document/${document?.id}`);

      toast({
        title: "Document Deleted Successfully",
        description: "Your document has been deleted successfully",
        variant: "destructive",
      });
    } catch (error) {
      //   console.log(error);
      //   toast({
      //     title: "Something went wrong",
      //     description: "Could Delete Document. Please try again later",
      //     variant: "destructive",
      //   });
    }
  }

  return (
    <div className="mx-2 md:mx-4">
      <div>
        <form
          onSubmit={onDeleteChange}
          className="flex float-right items-center gap-2 md:gap-4"
        >
          <DrawerAi />
          <Button type="submit">Delete</Button>
        </form>
      </div>
      <Form {...EditorForm}>
        <form onSubmit={EditorForm.handleSubmit(onUpdateChange)}>
          <div className="flex gap-2">
            <Button type="submit">Save Changes</Button>
            <FormField
              control={EditorForm.control}
              name="title"
              render={({ field }) => (
                <FormItem className="overflow-hidden mb-2">
                  <FormControl>
                    <Input placeholder="Enter Title Here" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
