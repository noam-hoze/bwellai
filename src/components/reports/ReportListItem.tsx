
import React from "react";
import { Link } from "react-router-dom";
import { Eye, File, FileText, FileImage, FileIcon } from "lucide-react";

interface Report {
  id: number;
  title: string;
  date: string;
  fileType: string;
  fileSize: string;
  url: string;
}

interface ReportListItemProps {
  report: Report;
}

const ReportListItem = ({ report }: ReportListItemProps) => {
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

  return (
    <Link to={report.url} className="block hover:bg-gray-50 transition-colors">
      <div className="p-5 flex justify-between items-center">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">{report.title}</h3>
          <p className="text-gray-500 mt-1">{report.date}</p>
          <div className="flex items-center mt-2 text-gray-500 text-sm">
            {getFileIcon()}
            <span className="ml-1">{report.fileType} • {report.fileSize}</span>
          </div>
        </div>
        <div className="ml-4">
          <Eye className="h-6 w-6 text-gray-500" />
        </div>
      </div>
    </Link>
  );
};

export default ReportListItem;
