import { Button } from "@radix-ui/themes";
import Image from "next/image";
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
