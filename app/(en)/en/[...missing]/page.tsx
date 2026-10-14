import NotFoundView from "@/components/views/not-found";

/**
 * With one root layout per language there is no top-level layout for Next's
 * own 404 to render inside. On GitHub Pages there is no server to route an
 * unknown URL here either, so this renders one static page, `404.html`,
 * which Pages serves for anything it cannot find.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ missing: ["404"] }];
}

export default function Missing() {
  return <NotFoundView lang="en" />;
}
