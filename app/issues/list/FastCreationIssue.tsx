"use client";
import { Project } from "@prisma/client";
import {
  Box,
  Button,
  Dialog,
  Flex,
  IconButton,
  Kbd,
  Strong,
  Tooltip,
} from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "../_components/IssueFormSkeleton";
const LayoutNewIssue = dynamic(
  () => import("@/app/issues/new/LayoutNewIssue"),
  {
    ssr: false,
    loading: () => <IssueFormSkeleton />,
  }
);
const FastCreationIssue = ({
  projectsAssociatedWithUser,
}: {
  projectsAssociatedWithUser: Project[];
}) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <IconButton>
          <PlusIcon width="16" height="16" />
        </IconButton>
      </Dialog.Trigger>
      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Édition de tâche</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          "Vous avez la possibilité de créer autant de tâches que vous le
          souhaitez. Cliquez simplement sur le bouton <Strong>'OK'</Strong>{" "}
          une fois que vous avez terminé."
        </Dialog.Description>
        <LayoutNewIssue
          projectsAssociatedWithUser={projectsAssociatedWithUser}
        />
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="solid" color="red">
              Retour
            </Button>
          </Dialog.Close>{" "}
          <Dialog.Close>
            <Button variant="solid" color="violet">
              OK
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default FastCreationIssue;
