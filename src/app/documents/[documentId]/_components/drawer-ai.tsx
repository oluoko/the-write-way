"use client";

import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { openAI } from "@/utils/openai";
import { Loader } from "lucide-react";

interface DrawerProps {
  description: string | null;
}

export default function DrawerAi({ description }: DrawerProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState("");

  const handleAiSuggestion = async () => {
    setLoading(true);
    try {
      const suggestion = (await openAI(description!)) as string;
      setAiSuggestion(suggestion);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching AI suggestion", error);
    }
  };

  return (
    <div>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger>
          <Button variant="outline" onClick={handleAiSuggestion}>
            Ask Your AI(gpt-3.5-turbo)
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
              Hi there, I&apos;m your AI assistant. Ready to help you in your
              writing?
            </DrawerTitle>
            {loading ? (
              <Loader className="flex mx-auto justify=center animate-spin" />
            ) : (
              <DrawerDescription className="whitespace-pre-wrap">
                {aiSuggestion.length > 0 && <p>{aiSuggestion}</p>}
              </DrawerDescription>
            )}
          </DrawerHeader>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
