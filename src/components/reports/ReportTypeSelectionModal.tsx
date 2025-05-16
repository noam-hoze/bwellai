import {
  FileCheck,
  FileSpreadsheet,
  FileText,
  FileX,
  Image,
  Microscope,
  Stethoscope,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface ReportType {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  available: boolean;
}

const reportTypes: ReportType[] = [
  {
    id: "lab-test",
    name: "Lab Test Report",
    description: "Upload comprehensive Lab panel results",
    icon: FileText,
    available: true,
  },
  {
    id: "imaging",
    name: "Medical Imaging",
    description: "X-rays, MRIs, CT scans, and ultrasounds",
    icon: Image,
    available: false,
  },
  {
    id: "pathology",
    name: "Pathology Report",
    description: "Biopsy and tissue examination results",
    icon: Microscope,
    available: false,
  },
  {
    id: "medical-summary",
    name: "Medical Summary",
    description: "Doctor's notes and visit summaries",
    icon: FileSpreadsheet,
    available: false,
  },
  {
    id: "vaccination",
    name: "Vaccination Record",
    description: "Immunization history and vaccine documentation",
    icon: FileCheck,
    available: false,
  },
  {
    id: "allergy-test",
    name: "Allergy Test Results",
    description: "Food and environmental sensitivity results",
    icon: FileX,
    available: false,
  },
];

interface ReportTypeSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTypeSelect: (reportType: string) => void;
}

const ReportTypeSelectionModal = ({
  isOpen,
  onClose,
  onTypeSelect,
}: ReportTypeSelectionModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Select Report Type</DialogTitle>
          <DialogDescription>
            Choose the type of medical report you'd like to upload
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-3 mt-4">
          {reportTypes.map((type) => (
            <div
              key={type.id}
              className={`relative p-4 border rounded-lg flex flex-col items-center text-center gap-2 ${
                type.available
                  ? "cursor-pointer hover:border-wellness-bright-green hover:bg-wellness-light-green/10"
                  : "opacity-70"
              }`}
              onClick={() => type.available && onTypeSelect(type.id)}
            >
              <type.icon className="h-8 w-8 mb-1 text-gray-600" />
              <div className="font-medium">{type.name}</div>
              <p className="text-xs text-gray-500">{type.description}</p>

              {!type.available && (
                <Badge variant="coming-soon" className="absolute top-2 right-2">
                  Coming Soon
                </Badge>
              )}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportTypeSelectionModal;
