import { contact, doctor, social } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer className="border-t border-ink-850 bg-ink-950">
      <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div>
            <p className="font-display text-[17px] tracking-[0.14em] text-bone uppercase">
              {doctor.name}
            </p>
            <p className="mt-3 max-w-[34ch] text-[14px] leading-relaxed text-bone-mute">
              {doctor.specialty}, {doctor.subSpecialty}
            </p>
          </div>

          <div className="flex flex-col gap-3 text-[14px] sm:items-end">
            <a href={contact.phone.href} className="text-bone-dim hover:text-sand-300">
              {contact.phone.display}
            </a>
            <a href={`mailto:${contact.email}`} className="text-bone-dim hover:text-sand-300">
              {contact.email}
            </a>
            <p className="text-bone-mute">
              {contact.address.street}, {contact.address.city}
            </p>
            <div className="mt-2 flex gap-5">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bone-dim hover:text-sand-300"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="rule-fade mt-12" />
        <p className="mt-6 text-[12.5px] text-bone-mute">
          © {new Date().getFullYear()} {doctor.fullName}
        </p>
      </div>
    </footer>
  );
}
