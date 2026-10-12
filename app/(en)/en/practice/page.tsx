import PracticeView, { practiceMetadata } from "@/components/views/practice";

export const metadata = practiceMetadata("en");

export default function Page() {
  return <PracticeView lang="en" />;
}
