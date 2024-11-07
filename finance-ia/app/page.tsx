import Image from "next/image";
import { Button } from "./_components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { use } from "react";
import { redirect } from "next/navigation";

export default async function Home() {
  const {userId} = await auth()
  if (!userId){
    redirect("/login")
  }
  return (
    <div className="flex h-full items-center justify-center">
      <UserButton showName />
    </div>
  );
}
