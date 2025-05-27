"use client";
import Link from "next/link";
import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Menu } from "@/components/admin-panel/menu";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import darkFavIcon from "@/assets/favDark.ico";
import lightFavIcon from "@/assets/favLight.ico";
import { useTheme } from "next-themes";
import Image from "next/image";

export function SheetMenu() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
        <SheetHeader>
          <Button
            className="flex justify-center items-center pb-2 pt-1"
            variant="link"
            asChild
          >
            <Link href="/" className="flex items-center justify-center gap-4">
              <Image
                src={resolvedTheme === "dark" ? darkFavIcon : lightFavIcon}
                alt="dark favicon"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <SheetTitle className="font-bold text-lg">Ayan Kumar</SheetTitle>
              <SheetDescription className="sr-only"></SheetDescription>
            </Link>
          </Button>
        </SheetHeader>
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  );
}
