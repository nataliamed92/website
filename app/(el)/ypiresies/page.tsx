import ServicesView, { servicesMetadata } from "@/components/views/services";

export const metadata = servicesMetadata("el");

export default function Page() {
  return <ServicesView lang="el" />;
}
