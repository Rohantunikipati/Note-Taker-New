"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoMenuSharp } from "react-icons/io5";

const NavBar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <nav className="w-full h-16 flex items-center justify-between px-16 border-b">
      <p className="text-xl font-semibold">Note-Taker</p>
      <div className="flex items-center justify-center gap-5">
        <Button onClick={() => router.push("/notes/new")}>ADD Note</Button>
        <Sheet>
          <div className="border px-5 py-2 rounded-lg">
            <SheetTrigger>
              {" "}
              <div className="w-full flex items-center justify-center">
                <IoMenuSharp className="w-5 h-5 mr-2" /> Menu
              </div>
            </SheetTrigger>
          </div>
          <SheetContent >
            <SheetHeader className="space-y-6">
              <SheetTitle>Note-Taker</SheetTitle>
              <SheetDescription className="text-lg">
                <p>
                  {" "}
                  A simple, minimal note-taking app and markdown editor built
                  with a local-first approach.
                </p>
                <ul className=" list-disc px-10 text-xl mt-3 font-semibold font-mono">
                  <li>Next.js</li>
                  <li>MongoDB.js</li>
                  <li>@blocknote/react</li>
                </ul>
              </SheetDescription>
              <SheetTitle>Upcoming Updates:</SheetTitle>
              <SheetDescription className="text-lg">
                <ul className=" list-disc  pl-6  mt-3 font-semibold font-mono">
                  <li>Handeling images and storing them in cloud</li>
                </ul>
              </SheetDescription>
              <div className="flex w-full items-center justify-center gap-4">
                <Button
                  variant="outline"
                  className="w-1/2"
                  onClick={() => router.push("/api/auth/signout")}
                >
                  Sign Out
                </Button>
                <Button  className="w-1/2" >
                  <p>GitHub</p>
                </Button>
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        {session ? (
          <Select>
            <SelectTrigger className="aspect-square w-12 h-12 rounded-full">
              <Image
                src={session.user.image}
                alt="User profile image"
                width={40}
                height={40}
                className="aspect-square rounded-full scale-150"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">{session.user.name}</SelectItem>
              <SelectItem value="dark">{session.user.email}</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <Button onClick={() => signIn()}>Sign In</Button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
