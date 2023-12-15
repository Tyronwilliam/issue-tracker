"use client";
import { createURLParams } from "@/app/utils/service/parameterUrl";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const statuses: { label: string; value?: Status | "ALL" }[] = [
  { label: "Tous", value: "ALL" },
  { label: "Ouvert", value: "OPEN" },
  { label: "En cours", value: "IN_PROGRESS" },
  { label: "Fait", value: "CLOSED" },
];

const IssueFilterStatut = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderBy = searchParams.get("orderBy");
  const user = searchParams.get("user");
  const project = searchParams.get("projectId");
  const status = searchParams.get("status");
  
  return (
    <Select.Root
      defaultValue={status || undefined}
      onValueChange={(status) => {
        const paramsObject = {
          status,
          user,
          orderBy,
          projectId: project,
        };
        const paramsString = createURLParams(paramsObject);
        router.push("/issues/list" + "?" + paramsString);
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
  );
};

export default IssueFilterStatut;
