// import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Header } from "./_components/heading";
import { Heroes } from "./_components/heroes";
import { Footer } from "./_components/footer";
export default function LandingPage() {
  return (
    <div className="min-h-full flex flex-col">
      <div className="flex flex-col items-center justify-center text-center gap-y-8 flex-1 px-6 pb-10">
        <Header></Header>
        <Heroes></Heroes>
      </div>
      <Footer></Footer>
    </div>
  );
}
