"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const Error = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src={"/error.png"}
        height={"300"}
        width={"300"}
        className="dark:hidden"
        alt="error"
      />
      <Image
        src={"/error-dark.png"}
        height={"300"}
        width={"300"}
        className="hidden dark:block"
        alt="error"
      />
      <h2 className="text-xl font-medium">Something broke on our end!</h2>
      <Button asChild>
        <Link href="/documents">Go Back</Link>
      </Button>
    </div>
  );
};

export default Error;
