import { Button } from "../ui/Button";

export const FileUploader = () => (
  <div className="flex items-center gap-3 w-full">
    <div className="flex-grow h-10 px-3 py-2 bg-white rounded-md border border-solid border-slate-500">
      <span className="text-slate-400 text-sm">No se ha seleccionado...</span>
    </div>

    <Button
      className="!h-10 !flex-shrink-0 !bg-[#004166] !w-auto text-white rounded-2xl"
      property1="default"
      text="Subir"
    />
  </div>
);
