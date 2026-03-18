import { Button } from "#/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/demo/upload")({
  component: RouteComponent,
});

function RouteComponent() {
  const [pdfUrl, setPdfUrl] = useState<string>();

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    const fileUrl = URL.createObjectURL(file);
    setPdfUrl(fileUrl);
  }

  return (
    <>
      <div className="px-4 py-2 flex justify-between items-center gap-4 h-content">
        <section className="w-1/2 h-full p-4 rounded-md border">
          <iframe src={pdfUrl} className="size-full" />
        </section>
        <section className="w-1/2 h-full p-4 rounded-md border">
          <div>
            <Field className="-space-y-2.5">
              <FieldLabel htmlFor="file">Choose file</FieldLabel>
              <Input
                id="file"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
              />
              <FieldDescription>Select a file to upload.</FieldDescription>
            </Field>
            <div>
              <Button></Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
