"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const NewDocument = () => {
  const { toast } = useToast();
  const router = useRouter();

  const createNewDoc = async (
    title: string = "Untitled Document",
    description: string = ""
  ) => {
    try {
      const response = await axios.post("/api/document/new", {
        title: title,
        description: description,
      });

      toast({
        title: "Document created",
        description: "Your document has been created",
        variant: "success",
      });

      router.push(`/documents/${response.data.id}`);
    } catch (error) {}
  };

  const TemplateMap = [
    {
      component: (
        <button onClick={() => createNewDoc()}>
          <Card className="max-w-[140px] md:max-w-[150px] max-h-[220px] hover:border hover:border-blue-500 hover:text-blue-500 cursor-pointer rounded-lg">
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
    {
      component: (
        <button
          onClick={() =>
            createNewDoc(
              "AI Generated Story",
              `[Exposition]

              [Rising Action]

              [Climax]

              [Falling Action]

              [Denouement]`
            )
          }
        >
          <Card className="max-w-[140px] md:max-w-[150px] max-h-[220px] hover:border hover:border-blue-500 hover:text-blue-500 cursor-pointer rounded-lg">
            <CardHeader></CardHeader>
            <CardContent className="max-h-full max-w-full p-2 overflow-hidden flex flex-col items-start gap-[12px]">
              <p className="text-[10px] ">[Exposition]</p>
              <p className="text-[10px] ">[Rising Action]</p>
              <p className="text-[10px] ">[Climax]</p>
              <p className="text-[10px] ">[Falling Action]</p>
              <p className="text-[10px] ">[Denouement]</p>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </button>
      ),
      footer: "AI Story-telling Template",
    },

    // a resume template
    {
      component: (
        <button
          onClick={() =>
            createNewDoc(
              "Resume Template",
              `[Name]

              [Email]

              [Phone]

              [Experience]

              [Education]

              [Skills]

              [Achievements]`
            )
          }
        >
          <Card className="max-w-[140px] md:max-w-[150px] max-h-[220px] hover:border hover:border-blue-500 hover:text-blue-500 cursor-pointer rounded-lg">
            <CardHeader></CardHeader>
            <CardContent className="h-full w-full p-2 overflow-hidden flex flex-col items-start">
              <p className="text-[10px] ">[Name]</p>
              <p className="text-[10px] ">[Email]</p>
              <p className="text-[10px] ">[Phone]</p>
              <p className="text-[10px] ">[Experience]</p>
              <p className="text-[10px] ">[Education]</p>
              <p className="text-[10px] ">[Skills]</p>
              <p className="text-[10px] ">[Achievements]</p>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </button>
      ),
      footer: "AI Resume Template",
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
