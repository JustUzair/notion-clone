"use client";

import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { Toolbar } from "@/components/toolbar";
import { Cover } from "@/components/cover";
import { Skeleton } from "@/components/ui/skeleton";
import { Editor } from "@/components/editor";
interface DocIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}
const DocumentIdPage = ({ params }: DocIdPageProps) => {
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });

  const update = useMutation(api.documents.update);

  const onChange = (content: string) => {
    update({
      id: params.documentId,
      content,
    });
  };
  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="nd:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]"></Skeleton>
            <Skeleton className="h-4 w-[80%]"></Skeleton>
            <Skeleton className="h-4 w-[40%]"></Skeleton>
            <Skeleton className="h-4 w-[60%]"></Skeleton>
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return <>Not Found</>;
  }
  return (
    <div className="pb-40">
      <Cover url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto md:pl-10">
        <Toolbar initialData={document} />
        <Editor onChange={onChange} initialContent={document.content} />
      </div>
    </div>
  );
};

export default DocumentIdPage;
