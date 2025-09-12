// src/components/Panel.tsx
// Gives any block of content the same visual treatment + sane desktop height caps.

import clsx from "clsx";
import React from "react";

type PanelProps = React.PropsWithChildren<{
  className?: string;
  /** Apply a desktop height cap (tweak values as you like). Default: true */
  cap?: boolean;
  /** How overflow behaves inside the panel. Default: 'auto' (scroll if content is tall) */
  overflow?: "auto" | "hidden" | "visible";
}>;

export function Panel({
  className,
  children,
  cap = true,
  overflow = "auto",
}: PanelProps) {
  return (
    <section
      className={clsx(
        "relative rounded-2xl border shadow-sm",
        cap && "md:max-h-[640px] lg:max-h-[700px]",
        overflow === "auto"
          ? "overflow-auto"
          : overflow === "hidden"
          ? "overflow-hidden"
          : "overflow-visible",
        className
      )}
    >
      {children}
    </section>
  );
}

export function PanelBody({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  // Slightly tighter padding to reduce perceived height
  return <div className={clsx("p-4 md:p-5 lg:p-6", className)}>{children}</div>;
}
