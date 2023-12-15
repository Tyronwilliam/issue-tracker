import { Box, Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const IssueAction = () => {
  return (
    <Box>
      <Button>
        <Link href="/issues/new">Nouvelle tache</Link>
      </Button>
    </Box>
  );
};

export default IssueAction;
