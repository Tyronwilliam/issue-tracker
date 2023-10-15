"use client";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "@/app/components";
import toast, { Toaster } from "react-hot-toast";

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
    <>
      <Toaster />
      <Select.Root
        defaultValue={issue.assignToUserId || "remove"}
        onValueChange={async (userId) => {
          try {
            await axios.patch("/api/issues/" + issue.id, {
              assignToUserId: userId == "remove" ? null : userId,
            });
          } catch (error) {
            toast.error("Sauvegarde impossible");
          }
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
    </>
  );
};

export default AssignSelect;
