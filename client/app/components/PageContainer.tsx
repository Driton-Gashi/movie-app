import React from 'react';

type PageContainerProps = {
  title?: string;
  description?: string;
  rightSlot?: React.ReactNode;
  children: React.ReactNode;
};

export default function PageContainer({
  title,
  description,
  rightSlot,
  children,
}: PageContainerProps) {
  return (
    <div className="space-y-6">
      {(title || description || rightSlot) && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            {title && (
              <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                {title}
              </h1>
            )}
            {description && <p className="text-sm text-slate-600">{description}</p>}
          </div>

          {rightSlot && <div className="shrink-0">{rightSlot}</div>}
        </div>
      )}

      <div>{children}</div>
    </div>
  );
}
