import { Program } from "@/types/programs";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { motion } from "framer-motion";

interface ProgramCardProps {
  program: Program;
}

export const ProgramCard = ({ program }: ProgramCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log("Rendering program:", program);
  
  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <Card 
          className="overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => setIsOpen(true)}
        >
          <CardContent className="p-0">
            <div className="aspect-video relative">
              <img
                src={program.image_url}
                alt={program.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error("Error loading image:", program.image_url);
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-1">{program.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {program.description}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-4">{program.title}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6">
            <img
              src={program.image_url}
              alt={program.title}
              className="w-full rounded-lg object-cover max-h-[400px]"
              onError={(e) => {
                e.currentTarget.src = '/placeholder.svg';
              }}
            />
            <p className="text-base leading-relaxed">
              {program.description}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};