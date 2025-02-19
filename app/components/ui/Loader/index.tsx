import React from "react";
import { CircleNotch } from "@phosphor-icons/react/dist/ssr";

export const Loader: React.FC = () => {
  return (
    // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
    <div className="fixed z-40 flex size-full items-center justify-center bg-base bg-opacity-60 backdrop-blur-sm">
      <div className="size-6 animate-spin">
        <CircleNotch size={24} className="text-primary" />
      </div>
    </div>
  );
};
