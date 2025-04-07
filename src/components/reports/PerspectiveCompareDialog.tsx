import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowRightLeft, X } from "lucide-react";

interface PerspectiveCompareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  perspectives: {
    id: string;
    name: string;
    color: string;
    icon: React.ElementType;
  }[];
  selectedPerspectives: string[];
  onCompare: (perspectives: string[]) => void;
}

const PerspectiveCompareDialog = ({
  open,
  onOpenChange,
  perspectives,
  selectedPerspectives,
  onCompare
}: PerspectiveCompareDialogProps) => {
  const [selected, setSelected] = useState<string[]>(selectedPerspectives);
  
  const handleSelect = (id: string) => {
    if (selected.includes(id)) {
      setSelected(prev => prev.filter(p => p !== id));
    } else {
      if (selected.length < 2) {
        setSelected(prev => [...prev, id]);
      }
    }
  };
  
  const handleCompare = () => {
    onCompare(selected);
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowRightLeft className="h-5 w-5" />
            Compare Health Perspectives
          </DialogTitle>
          <button 
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>
        
        <div className="py-6">
          <p className="text-sm text-muted-foreground mb-4">
            Select up to 2 perspectives to compare their insights side-by-side.
          </p>
          
          <div className="grid grid-cols-2 gap-3">
            {perspectives.map((perspective) => (
              <div 
                key={perspective.id}
                className={`
                  border rounded-md p-3 cursor-pointer transition-all
                  ${selected.includes(perspective.id) 
                    ? `border-2 border-${perspective.id === 'conventional' ? 'blue-500' : 
                        perspective.id === 'naturopathic' ? 'green-500' : 
                        perspective.id === 'dietitian' ? 'orange-500' : 
                        perspective.id === 'tcm' ? 'indigo-500' : 
                        perspective.id === 'mental-health' ? 'pink-500' : 'purple-500'}`
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
                onClick={() => handleSelect(perspective.id)}
              >
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id={`perspective-${perspective.id}`} 
                    checked={selected.includes(perspective.id)}
                    className="data-[state=checked]:bg-primary"
                  />
                  <Label htmlFor={`perspective-${perspective.id}`} className="flex items-center cursor-pointer">
                    <perspective.icon className="h-4 w-4 mr-2" />
                    <span>{perspective.name}</span>
                  </Label>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button 
            onClick={handleCompare} 
            disabled={selected.length === 0}
            className="w-full sm:w-auto"
          >
            <ArrowRightLeft className="h-4 w-4 mr-2" />
            Compare Perspectives
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PerspectiveCompareDialog;
