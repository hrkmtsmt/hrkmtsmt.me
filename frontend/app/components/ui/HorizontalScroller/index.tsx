import React, { useRef, useState, useEffect } from "react";

export interface HorizontalScrollerProps {
  children?: React.ReactNode;
}

export const HorizontalScroller: React.FC<HorizontalScrollerProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [margin, setMargin] = useState(0);

  useEffect(() => {
    const update = () => {
      if (!ref.current) {
        return;
      }

      setMargin((window.innerWidth - ref.current.offsetWidth) / 2);
    };

    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div
      ref={ref}
      className="flex w-full snap-mandatory gap-6 overflow-x-scroll rounded-2xl sm:gap-8"
      style={{ overflowClipMargin: `${margin}px` }}
    >
      {props.children}
    </div>
  );
};
