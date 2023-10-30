"use client";
import React from "react";
import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
const Documents = () => {
  const { isSignedIn, isLoaded, user } = useUser();
  const create = useMutation(api.documents.create);
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src={"/empty.png"}
        alt={"Empty"}
        height="300"
        width="300"
        className="dark:hidden"
      />
      <Image
        src={"/empty-dark.png"}
        alt={"Empty"}
        height="300"
        width="300"
        className="hidden dark:block"
      />
      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s Motion
      </h2>
      <Button>
        <PlusCircle className="h-4 w-4 mr-2" />
        Start creating a Note
      </Button>
    </div>
  );
};

export default Documents;
