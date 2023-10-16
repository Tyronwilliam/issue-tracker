"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const statuses: { label: string; value?: Status | "ALL" }[] = [
  { label: "Tous", value: "ALL" },
  { label: "Ouvert", value: "OPEN" },
  { label: "En cours", value: "IN_PROGRESS" },
  { label: "Fait", value: "CLOSED" },
];

const IssueFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderBy = searchParams.get("orderBy");
  return (
    <>
      <Select.Root
        defaultValue={searchParams.get("status") || undefined}
        onValueChange={(status) => {
          const params = new URLSearchParams();
          if (status) {
            params.append("status", status);
          }
          if (orderBy) {
            params.append("orderBy", orderBy);
          }
          const query = status !== "ALL" ? "?" + params.toString() : "";
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
