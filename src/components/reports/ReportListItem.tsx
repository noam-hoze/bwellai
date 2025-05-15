import React from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  File,
  FileText,
  FileImage,
  FileIcon,
  AlertCircle,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { formatDateToShortMonth } from "@/utils/utils";

interface Report {
  id?: string;
  title?: string;
  description?: string;

  reportId: string;
  reportName: string;
  createdAt: string;
  testDate: string;
  fileType: string;
  fileSize: string;
  url?: string;
  concernCount?: number;
}

interface ReportListItemProps {
  report: Report;
  onDelete?: (id: string) => void;
}

const ReportListItem = ({ report, onDelete }: ReportListItemProps) => {
  // Choose icon based on file type
  const getFileIcon = () => {
    switch (report.fileType) {
      case "PDF":
        return <FileText className="h-5 w-5 text-gray-500" />;
      case "JPEG":
      case "PNG":
        return <FileImage className="h-5 w-5 text-gray-500" />;
      case "DOC":
        return <FileIcon className="h-5 w-5 text-gray-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(report?.reportId);
    }
  };

  return (
    <div className="hover:bg-gray-50 transition-colors">
      <div className="p-5 flex justify-between items-center">
        <Link
          to={`/report/${report?.reportId || report?.id}`}
          className="flex-1"
        >
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-800">
              {report?.reportName || report?.title}
            </h3>
            {report?.concernCount > 0 && (
              <div className="px-2 py-0.5 bg-red-50 text-red-600 text-xs font-medium rounded-full flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                {report?.concernCount}{" "}
                {report?.concernCount === 1 ? "concern" : "concerns"}
              </div>
            )}
            {report?.url && (
              <div className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full flex items-center">
                coming soon
              </div>
            )}
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-6 mt-1">
            <p className="text-gray-500">
              <span className="text-gray-400 text-sm">Date uploaded:</span>{" "}
              {formatDateToShortMonth(report?.createdAt || report?.testDate)}
            </p>
            {/* <p className="text-gray-500">
              <span className="text-gray-400 text-sm">Test date:</span>{" "}
              {report.testDate}
            </p> */}
          </div>
        </Link>
        <div className="flex items-center gap-2">
          {/* <Link to={`/report/${report?.reportId}`}>
            <Button variant="ghost" size="icon" aria-label="View report">
              <Eye className="h-5 w-5 text-gray-500" />
            </Button>
          </Link> */}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Delete report">
                <Trash2 className="h-5 w-5 text-gray-500 hover:text-red-500" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Report</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete "{report?.reportName}"? This
                  action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default ReportListItem;
