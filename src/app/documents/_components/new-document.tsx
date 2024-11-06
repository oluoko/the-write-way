"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import axios from "axios";
import { Plus } from "lucide-react";

const NewDocument = () => {
  const createNewDoc = async () => {
    try {
      const response = await axios.post("/api/document/new");
    } catch (error) {}
  };

  const TemplateMap = [
    {
      component: (
        <button onClick={() => createNewDoc()}>
          <Card className="w-[140px] md:w-[150px] hover:border hover:border-blue-500 hover:text-blue-500 cursor-pointer rounded-lg">
            <CardHeader></CardHeader>
            <CardContent className="flex items-center justify-center">
              <Plus size={100} />
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </button>
      ),
      footer: "Blank Document",
    },
  ];

  return (
    <div className="bg-gray-50 h-[300px] flex flex-row md:flex-col justify-center flex-wrap">
      <div className="flex flex-col space-y-4 w-10/12 mx-auto flex-wrap">
        <h3 className="text-muted-foreground text-sm font-bold">
          Create your new document
        </h3>
        <div className="flex flex-wrap space-x-4 ">
          {TemplateMap.map((template) => (
            <div key={template.footer} className="rounded-lg">
              {template.component}
              <p className="text-muted-foreground text-sm mt-2 ml-2">
                {template.footer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewDocument;
