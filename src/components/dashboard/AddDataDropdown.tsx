
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Utensils, Upload, Smartphone, ScanFace, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AddDataDropdownProps {
  onLogMeal: () => void;
  onUploadLabReport: () => void;
  onConnectWearable: () => void;
  onScanFace: () => void;
}

const AddDataDropdown = ({ 
  onLogMeal,
  onUploadLabReport,
  onConnectWearable,
  onScanFace
}: AddDataDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-white text-gray-800 border border-gray-200 hover:bg-gray-100 shadow-sm flex gap-2">
          <Plus className="h-4 w-4" />
          <span>Add Data</span>
          <ChevronDown className="h-4 w-4 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white border border-gray-100 shadow-md rounded-lg w-56">
        <DropdownMenuItem onClick={onLogMeal} className="cursor-pointer py-3 px-4 flex items-center gap-3">
          <Utensils className="h-4 w-4 text-green-600" />
          <span>Log Meal</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onUploadLabReport} className="cursor-pointer py-3 px-4 flex items-center gap-3">
          <Upload className="h-4 w-4 text-blue-600" />
          <span>Upload Lab Report</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onConnectWearable} className="cursor-pointer py-3 px-4 flex items-center gap-3">
          <Smartphone className="h-4 w-4 text-purple-600" />
          <span>Connect Wearable</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onScanFace} className="cursor-pointer py-3 px-4 flex items-center gap-3">
          <ScanFace className="h-4 w-4 text-orange-600" />
          <span>Scan Face for Vitals</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AddDataDropdown;
