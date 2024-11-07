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
    <div>
      <h1>{document?.title}</h1>
      <EditorBlock />
    </div>
  );
};

export default SingleDocumentPage;
