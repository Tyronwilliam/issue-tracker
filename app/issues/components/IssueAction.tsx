import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const IssueAction = () => {
  return (
    <div className="mb-5">
      <Button>
        <Link href="/issues/new">Nouvelle tache</Link>
      </Button>
    </div>
  );
};

export default IssueAction;
