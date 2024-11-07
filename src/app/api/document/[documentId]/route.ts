import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function PUT(
  req: Request,
  { params }: { params: { documentId: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("User Not Authenticated ", { status: 401 });
    }

    const { title, description } = await req.json();

    const updatedDocument = await db.document.update({
      where: { id: params.documentId, userId: userId },
      data: { title: title, description: description },
    });

    return new NextResponse("Document Updated Successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("PUT Request Failed", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { documentId: string } }
) {
  try {
    const { userId } = await auth();

    const deletedDocument = await db.document.delete({
      where: { id: params.documentId, userId: userId },
    });
    revalidatePath("/documents");
    redirect("/documents");

    return new NextResponse("Document Deleted Successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("DELETE Request Failed", { status: 500 });
  }
}
