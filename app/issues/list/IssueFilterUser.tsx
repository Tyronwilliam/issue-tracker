"use client";
import { createURLParams } from "@/app/utils/service/parameterUrl";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const IssueFilterUser = ({ users }: { users: User[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderBy = searchParams.get("orderBy");
  const status = searchParams.get("status");
  const project = searchParams.get("projectId");

  return (
    <Select.Root
      defaultValue={"ALL" || undefined}
      onValueChange={(user) => {
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
      <Select.Trigger radius="large" placeholder="Trier par collaborateur" />
      <Select.Content>
        <Select.Item value="ALL">Tous</Select.Item>
        {users.map((user) => {
          return (
            <Select.Item value={user.id} key={user.id}>
              {user.name}
            </Select.Item>
          );
        })}
      </Select.Content>
    </Select.Root>
  );
};
export default IssueFilterUser;
