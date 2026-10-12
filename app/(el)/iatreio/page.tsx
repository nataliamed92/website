import PracticeView, { practiceMetadata } from "@/components/views/practice";

export const metadata = practiceMetadata("el");

export default function Page() {
  return <PracticeView lang="el" />;
}
