import FacialView, { facialMetadata } from "@/components/views/facial";

export const metadata = facialMetadata("el");

export default function Page() {
  return <FacialView lang="el" />;
}
