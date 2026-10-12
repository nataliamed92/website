import ServicesView, { servicesMetadata } from "@/components/views/services";

export const metadata = servicesMetadata("en");

export default function Page() {
  return <ServicesView lang="en" />;
}
