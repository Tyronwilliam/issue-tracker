"use client";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "@/app/components";

const AssignSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  if (isLoading) return <Skeleton height="2rem" />;
  if (error) return null;
  return (
    <Select.Root
      defaultValue={issue.assignToUserId || "remove"}
      onValueChange={(userId) => {
        axios.patch("/api/issues/" + issue.id, {
          assignToUserId: userId == "remove" ? null : userId,
        });
      }}
    >
      <Select.Trigger placeholder={"Attribuer tâche"} />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>{" "}
          <Select.Item value="remove">Désassigner</Select.Item>
          {users?.map((user) => (
            <Select.Item value={user.id} key={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssignSelect;
