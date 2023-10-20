import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

const statusMap: Record<
  Status,
  { label: string; color: "red" | "violet" | "green" }
> = {
  OPEN: { label: "Ouvert", color: "red" },
  IN_PROGRESS: { label: "En cours", color: "violet" },
  CLOSED: { label: "Fait", color: "green" },
};

const IssueStatusBadge = ({ status }: { status: Status | undefined }) => {
  return (
    status && (
      <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
    )
  );
};

export default IssueStatusBadge;
