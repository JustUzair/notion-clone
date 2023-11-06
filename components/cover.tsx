"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ImageIcon, X } from "lucide-react";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { EdgeStoreProvider, useEdgeStore } from "@/lib/edgestore";
import { useEffect } from "react";
import { Skeleton } from "./ui/skeleton";
interface CoverProps {
  url?: string;
  preview?: boolean;
}
export const Cover = ({ url, preview }: CoverProps) => {
  const params = useParams();
  const coverImage = useCoverImage();
  const removeCoverImage = useMutation(api.documents.removeCoverImage);
  const { edgestore } = useEdgeStore();
  const changeCover = async () => {
    coverImage.onOpen();
  };
  const removeCover = async () => {
    await removeCoverImage({
      id: params.documentId as Id<"documents">,
    });
    if (url) {
      await edgestore.publicFiles.delete({
        url: url,
      });
    }
  };
  return (
    <div
      className={cn(
        "relative w-full h-[40vh] group",
        !url && "h-[12vh]",
        url && "bg-muted"
      )}
    >
      {!!url && <Image src={url} fill alt="cover" className="object-cover" />}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            onClick={() => {
              changeCover();
              if (url) {
                edgestore.publicFiles.delete({
                  url: url,
                });
              }
            }}
            className="text-muted-foreground text-sm"
            variant={"outline"}
            size={"sm"}
          >
            <ImageIcon className="h-4 w-4" />
            Change Cover
          </Button>

          <Button
            onClick={removeCover}
            className="text-muted-foreground text-sm"
            variant={"outline"}
            size={"sm"}
          >
            <X className="h-4 w-4" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="w-full h-[12vh]" />;
};
