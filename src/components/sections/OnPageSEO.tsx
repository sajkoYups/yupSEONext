"use client";

import { CategoryAndGradeTable } from "@/components/ui/CategoryAndGradeTable";

interface OnPageSEOProps {
  results: any;
  setModalInfo: (info: any) => void;
}

export function OnPageSEO({ results, setModalInfo }: OnPageSEOProps) {
  return (
    <section>
      <CategoryAndGradeTable result={results} setModalInfo={setModalInfo} />
    </section>
  );
}
