"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

const statuses: { label: string; value?: Status | "ALL" }[] = [
  { label: "Tous", value: "ALL" },
  { label: "Ouvert", value: "OPEN" },
  { label: "En cours", value: "IN_PROGRESS" },
  { label: "Fait", value: "CLOSED" },
];

const IssueFilter = () => {
  const router = useRouter();

  return (
    <>
      <Select.Root
        onValueChange={(status) => {
          const query = status !== "ALL" ? `?status=${status}` : "";
          router.push("/issues/list" + query);
        }}
      >
        <Select.Trigger radius="large" placeholder="Trier par statut" />
        <Select.Content>
          {statuses.map((etat) => {
            return (
              <Select.Item value={etat.value || "ALL"} key={etat.label}>
                {etat.label}
              </Select.Item>
            );
          })}
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default IssueFilter;
