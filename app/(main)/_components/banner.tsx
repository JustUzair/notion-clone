import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { ConfirmModal } from "@/components/modals/confirm-modal";
interface BannerProps {
  documentId: Id<"documents">;
}

export const Banner = ({ documentId }: BannerProps) => {
  const params = useParams();
  const router = useRouter();

  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const onRemove = () => {
    const promise = remove({ id: documentId });
    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted successfully!",
      error: "Failed to delete the note!",
    });
    router.push("/documents");
  };

  const onRestore = () => {
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored successfully!",
      error: "Failed to restore the note!",
    });
  };
  return (
    <div className="w-full bg-rose-500 text-center p-2 text-white text-sm flex items-center gap-x-2 justify-center">
      <p>This Page is in Trash</p>
      <Button
        variant={"outline"}
        size="sm"
        onClick={onRestore}
        className="border-white bg-transparent hover:bg-white hover:text-slate-800 p-1 px-2 h-auto font-normal"
      >
        Restore Page
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          variant={"outline"}
          size="sm"
          className="border-white bg-transparent hover:bg-white hover:text-slate-800 p-1 px-2 h-auto font-normal"
        >
          Delete Page
        </Button>
      </ConfirmModal>
    </div>
  );
};
