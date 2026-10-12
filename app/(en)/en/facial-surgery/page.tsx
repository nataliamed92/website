import FacialView, { facialMetadata } from "@/components/views/facial";

export const metadata = facialMetadata("en");

export default function Page() {
  return <FacialView lang="en" />;
}
