"use client";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "@/app/components";
import toast, { Toaster } from "react-hot-toast";

const AssignSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUser();

  if (isLoading) return <Skeleton height="2rem" />;
  if (error) return null;

  const onChangeUser = async (userId: string) => {
    try {
      await axios.patch("/api/issues/" + issue.id, {
        userId: userId == "remove" ? null : userId,
      });
      toast.success("C'est fait !");
    } catch (error) {
      toast.error("Sauvegarde impossible");
    }
  };
  return (
    <>
      <Toaster />
      <Select.Root
        defaultValue={issue.userId || "remove"}
        onValueChange={(userId) => onChangeUser(userId)}
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

const useUser = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });
export default AssignSelect;
