import React from "react";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/db";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { BookText } from "lucide-react";

const RecentDocument = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const userDocuments = await db.document.findMany({
    where: {
      userId: userId ?? "",
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <div className="w-10/12 mx-auto  my-4">
      <h1 className="font-semibold text-sm mb-4">Recent Documents</h1>
      <div className="flex flex-wrap gap-4 md:gap-8">
        {userDocuments.length > 0 ? (
          userDocuments.map((document) => (
            <Link
              key={document.id}
              href={`/documents/${document.id}`}
              className="cursor-pointer"
            >
              <Card className="h-[220px] w-[140px] md:w-[150px]  rounded-lg hover:border hover:border-blue-500">
                <CardContent className="h-[70%] overflow-hidden  flex flex-col items-start px-2 py-1">
                  {!!document.description ? (
                    <div className="text-[7px]">{document.description}</div>
                  ) : (
                    <BookText size={60} className="w-full h-full" />
                  )}
                </CardContent>
                <CardFooter className="w-[147px] h-30%] flex flex-col gap-2 items-start border-t border-gray-200/50  hover:border-blue-500 px-2 py-1">
                  <div className="w-full overflow-hidden max-h-[24px] text-sm border-b border-gray-200/50">
                    {document.title}
                  </div>
                  <div className="flex gap-2 h-[40%] w-full">
                    <BookText size={15} className="text-blue-500" />{" "}
                    <p className="text-xs ">
                      {document.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))
        ) : (
          <p>
            No recent documents. Once you create a document, it will appear
            here.
          </p>
        )}
      </div>
    </div>
  );
};

export default RecentDocument;
