import { ReactNode } from "react";
import { StudySubNav } from "@/components/layout/StudySubNav";

export default function StudyLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <StudySubNav />
      {children}
    </div>
  );
}
