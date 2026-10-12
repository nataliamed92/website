import DoctorView, { doctorMetadata } from "@/components/views/doctor";

export const metadata = doctorMetadata("el");

export default function Page() {
  return <DoctorView lang="el" />;
}
