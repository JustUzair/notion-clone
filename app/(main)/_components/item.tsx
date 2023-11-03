"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation } from "convex/react";
import {
  ChevronDown,
  ChevronRight,
  Divide,
  LucideIcon,
  MoreHorizontal,
  Plus,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUser } from "@clerk/clerk-react";
interface ItemProps {
  label: string;
  onClick?: () => void;
  onExpand?: () => void;
  icon: LucideIcon;
  id?: Id<"documents">;
  documentIcon?: string;
  expanded?: boolean;
  active?: boolean;
  isSearch?: boolean;
  level?: number;
}
const Item = ({
  label,
  onClick,
  icon: Icon,
  active,
  documentIcon,
  isSearch,
  expanded,
  id,
  level = 0,
  onExpand,
}: ItemProps) => {
  const { user } = useUser();
  const create = useMutation(api.documents.create);
  const archive = useMutation(api.documents.archive);

  const router = useRouter();
  const handleExpand = (event: React.MouseEvent) => {
    event.stopPropagation();
    onExpand?.();
  };
  const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;
    const promise = create({ title: "Untitled", parentDocument: id }).then(
      (documentId) => {
        if (!expanded) {
          onExpand?.();
        }
        // router.push(`/documents/${documentId}`);
      }
    );
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "Note created successfully!",
      error: "Failed to create a new note!",
    });
  };
  const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;
    const promise = archive({ id });
    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note deleted successfully!",
      error: "Failed to archive the note!",
    });
  };
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;
  return (
    <div
      role="button"
      style={{
        paddingLeft: level ? `${level * 12 + 12}px` : "12px",
      }}
      className={cn(
        "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
        active && "bg-primary/5 text-primary"
      )}
      onClick={onClick}
    >
      {!!id && (
        <div
          role="button"
          className="h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 mr-1"
          onClick={handleExpand}
        >
          <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
        </div>
      )}
      {documentIcon ? (
        <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
      ) : (
        <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
      )}
      <span className="truncate">{label}</span>
      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘ + </span>K |{" "}
          <span className="text-xs">Ctrl + </span>K
        </kbd>
      )}

      {!!id && (
        <div
          className="ml-auto flex items-center gap-x-2"
          role="button"
          onClick={onCreate}
        >
          <div className="opacity:0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 mr-1">
            <Plus className="h-4 w-4 text-muted-foreground" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div
                role="button"
                className="opacity:0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 mr-1"
              >
                <MoreHorizontal></MoreHorizontal>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-60"
              side="right"
              align="start"
              forceMount
            >
              <DropdownMenuItem onClick={onArchive} className="cursor-pointer">
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="text-xs text-muted-foreground">
                last edited by {user?.fullName}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};
Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{
        paddingLeft: level ? `${level * 12 + 25}px` : "12px",
      }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};
export default Item;
