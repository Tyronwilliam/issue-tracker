"use client";
import { createURLParams } from "@/app/utils/service/parameterUrl";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const IssueFilterUser = ({ users }: { users: User[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderBy = searchParams.get("orderBy");
  const status = searchParams.get("status");
  const project = searchParams.get("projectId");
  const { data: session } = useSession();
  const user = searchParams.get("user");
  return (
    <Select.Root
      defaultValue={user || undefined}
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
        <Select.Group>
          <Select.Item value={session?.user?.id} key={session?.user?.id}>
            {session?.user?.name}
          </Select.Item>
        </Select.Group>
        <Select.Separator />{" "}
        <Select.Group>
          {users.map((user) => {
            return session?.user?.email === user.email ? null : (
              <Select.Item value={user.id} key={user.id}>
                {user.name}
              </Select.Item>
            );
          })}{" "}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};
export default IssueFilterUser;
