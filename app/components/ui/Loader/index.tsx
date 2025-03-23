import React from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

export const Loader: React.FC = () => {
  return (
    // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
    <div className="fixed z-40 flex size-full items-center justify-center bg-base bg-opacity-60 backdrop-blur-xs">
      <div className="size-6 animate-spin">
        <ArrowPathIcon className="text-primary w-6 stroke-2" />
      </div>
    </div>
  );
};
