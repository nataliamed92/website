import { notFound } from "next/navigation";

/**
 * With one root layout per language there is no top-level layout for Next's
 * own 404 to render inside, so an unknown URL got the framework's bare page
 * instead of ours. Catching it here routes it into this language's layout and
 * its `not-found.tsx`. More specific routes always win over a catch-all, so
 * nothing real is shadowed.
 */
export default function Missing() {
  notFound();
}
