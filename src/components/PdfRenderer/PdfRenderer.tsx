"use client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PdfRenderer = ({ url }: { url: string }) => {
  const { toast } = useToast();
  return (
    <div className="w-full bg-white rounded-md shadow flex flex-col items-center">
      <div className="h-14 w-full border-b border-zinc-200 flex items-center justify-between px-2">
        <div className="flex items-center gap-1.5">Top</div>
      </div>

      <div className="flex-1 w-full max-h-screen">
        <div>
          <Document
            loading={
              <div className="flex justify-center max-h-screen">
                <Loader2 className="my-24 h6- w-6 animate-spin" />
              </div>
            }
            onError={() => {
              toast({
                title: "Error loading pdf",
                description: "Please disable your ad blocker can try again.",
                variant: "destructive",
              });
            }}
            className="max-h-full"
            file={url}
          >
            <Page pageNumber={1} />
          </Document>
        </div>
      </div>
    </div>
  );
};
export default PdfRenderer;
