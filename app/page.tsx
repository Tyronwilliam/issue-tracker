import { Button } from "@radix-ui/themes";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Button>
        <Link href="/issues/new">Nouvelle tache</Link>
      </Button>
    </main>
  );
}
