//gives any block of content the same visual treatment

// src/components/Panel.tsx
import clsx from "clsx";
import React from "react";

export function Panel({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <section
      className={clsx(
        "relative rounded-2xl overflow-hidden border shadow-sm",
        // ❌ remove "h-full flex flex-col" so panels size to their content (no stretching)
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
  return <div className={clsx("p-4 md:p-6 lg:p-8", className)}>{children}</div>;
}
