import ContactView, { contactMetadata } from "@/components/views/contact";

export const metadata = contactMetadata("el");

export default function Page() {
  return <ContactView lang="el" />;
}
