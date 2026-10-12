import DoctorView, { doctorMetadata } from "@/components/views/doctor";

export const metadata = doctorMetadata("en");

export default function Page() {
  return <DoctorView lang="en" />;
}
