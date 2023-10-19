"use client";
import { Skeleton } from "@/app/components";
import { Issue, Project, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export type IssueWithUsers = Omit<Issue, "User" | "Project"> & {
  users?: User[];
  Project?: Project;
};

const AssignSelect = ({ issue }: { issue: IssueWithUsers }) => {
  const { data: users, error, isLoading } = useUser(issue?.Project?.id);
  const { data: session } = useSession();

  const router = useRouter();
  if (isLoading) return <Skeleton height="2rem" />;
  if (error) return null;

  const onChangeUser = async (userId: string) => {
    try {
      await axios.patch("/api/issues/" + issue.id, {
        userId: userId === "remove" ? session?.user?.id : userId,
        isConnect: userId === "remove" ? false : true,
      });
      toast.success("C'est fait !");
      router.refresh();
    } catch (error) {
      toast.error("Sauvegarde impossible");
    }
  };
  return (
    <>
      <Toaster />
      <Select.Root
        // defaultValue={ || undefined}
        onValueChange={(userId) => onChangeUser(userId)}
      >
        <Select.Trigger placeholder={"Attribuer tâche"} />
        <Select.Content>
          <Select.Group>
            <Select.Label>Attribué à</Select.Label>
            {issue?.users?.map((user) => (
              <Select.Item value={user.id} key={user.id} disabled>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
          <Select.Separator />
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            {issue?.users?.some((user) => user.id === session?.user?.id) && (
              <Select.Item value="remove">Retirer</Select.Item>
            )}
            {users?.length !== undefined &&
              users?.length > 0 &&
              users
                ?.filter(
                  (user: any) =>
                    !issue?.users?.some(
                      (second_user) => user.id === second_user.id
                    )
                )
                .map((user: any) => (
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

const useUser = (projectId: any) =>
  useQuery({
    queryKey: ["users", projectId],
    queryFn: () =>
      axios.get<User[]>("/api/users/" + projectId).then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

export default AssignSelect;
