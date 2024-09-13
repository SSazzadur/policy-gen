import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Eye, Plus } from "lucide-react";
import React from "react";

const FabButton = () => {
  return (
    <div className="fixed right-10 bottom-32 lg:bottom-20 z-50">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className="rounded-full h-12 w-12 bg-secondary"
            variant={"outline"}
            size={"icon"}
          >
            <Plus />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-20 bg-background/50 border-none shadow-none flex items-center justify-center"
          side="top"
        >
          <div className="grid gap-4">
            <Button size="icon" className="rounded-full">
              <Plus />
            </Button>
            <Button size="icon" className="rounded-full">
              <Eye />
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FabButton;
