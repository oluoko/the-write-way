import { db } from "@/utils/db";
import EditorBlock from "./_components/editor-block";

interface SingleDocumentPageProps {
  params: {
    documentId: string;
  };
}

const SingleDocumentPage = async ({ params }: SingleDocumentPageProps) => {
  const document = await db.document.findUnique({
    where: {
      id: params.documentId,
    },
  });

  return (
    <div className="mt-3 md:mt-6">
      <EditorBlock document={document} />
    </div>
  );
};

export default SingleDocumentPage;
