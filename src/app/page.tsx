import { BentoGrid } from "@/components/bento/bento-grid";
import { getShowcaseData } from "@/lib/github";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export default async function Home() {
  const { repos, orgs } = await getShowcaseData();

  return (
    <>
      <BentoGrid repos={repos} orgs={orgs} />
      <footer
        id="footer"
        className="h-32 w-full bg-transparent"
        aria-label="Footer anchor"
      />
    </>
  );
}
