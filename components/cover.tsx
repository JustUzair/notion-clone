"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ImageIcon, X } from "lucide-react";
import { useCoverImage } from "@/hooks/use-cover-image";
interface CoverProps {
  url?: string;
  preview?: boolean;
}
export const Cover = ({ url, preview }: CoverProps) => {
  const coverImage = useCoverImage();

  const changeCover = () => {
    coverImage.onOpen();
  };

  const removeCover = () => {};
  return (
    <div
      className={cn(
        "relative w-full h-[35vh] group",
        !url && "h-[12vh]",
        url && "bg-muted"
      )}
    >
      {!!url && <Image src={url} fill alt="cover" className="object-cover" />}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            onClick={changeCover}
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
