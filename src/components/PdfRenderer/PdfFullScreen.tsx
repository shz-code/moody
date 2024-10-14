import { useToast } from "@/hooks/use-toast";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Expand, Ghost, Loader2 } from "lucide-react";
import { useState } from "react";
import { Document, Page } from "react-pdf";
import { useResizeDetector } from "react-resize-detector";
import SimpleBar from "simplebar-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";

const PdfFullScreen = ({ url }: { url: string }) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [numPages, setNumPages] = useState<number>();

  const { toast } = useToast();
  const { width, ref } = useResizeDetector();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) setOpen(v);
      }}
    >
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        <Button aria-label="full screen" variant="ghost">
          <Expand className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl w-full">
        <SimpleBar autoHide={false} className="max-h-[calc(100vh-12rem)] mt-6">
          <div ref={ref}>
            <Document
              loading={
                <div className="flex justify-center max-h-screen">
                  <Loader2 className="my-24 h6- w-6 animate-spin" />
                </div>
              }
              onLoadError={() => {
                toast({
                  title: "Error loading pdf",
                  description: "Please disable your ad blocker can try again.",
                  variant: "destructive",
                });
              }}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              error={
                <div className="my-16 flex flex-col items-center gap-2">
                  <Ghost className="h-8 w-8 text-zinc-800" />
                  <h3 className="font-semibold text-xl">Error Loading Pdf</h3>
                  <p>Try turning off ad blocker/idm and try again</p>
                </div>
              }
              className="max-h-full"
              file={url}
            >
              {new Array(numPages).fill(0).map((_, i) => (
                <Page key={i} width={width ? width : 1} pageNumber={i + 1} />
              ))}
            </Document>
          </div>
        </SimpleBar>
      </DialogContent>
    </Dialog>
  );
};
export default PdfFullScreen;
