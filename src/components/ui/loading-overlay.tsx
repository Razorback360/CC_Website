import { Icons } from "@/components/icons";
import React from "react";

type LoadingOverlayProps = {
  loading: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const LoadingOverlay = ({ loading = false, children }: LoadingOverlayProps) => {
  return (
    <div className="relative">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-muted opacity-50 text-muted-foreground transition-all duration-150">
          <Icons.spinner className="m-auto w-[10%] h-[10%] animate-spin duration-700" />
        </div>
      )}
      {children}
    </div>
  );
};

export default LoadingOverlay;
