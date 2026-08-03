import { ReactNode } from "react";
import { StudySubNav } from "@/components/layout/StudySubNav";

export default function StudyLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <StudySubNav />
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
