"use client";
import { Project } from "@prisma/client";
import { InfoCircledIcon, PlusIcon } from "@radix-ui/react-icons";
import {
  Button,
  Callout,
  Dialog,
  Flex,
  IconButton,
  Strong,
} from "@radix-ui/themes";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "../_components/IssueFormSkeleton";
const LayoutNewIssue = dynamic(
  () => import("@/app/(home)/issues/new/LayoutNewIssue"),
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
          souhaitez. Cliquez simplement sur le bouton <Strong>'OK'</Strong> une
          fois que vous avez terminé."
        </Dialog.Description>
        <Flex gap="3" direction={"column"}>
          <Callout.Root>
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>
              Veuillez cliquer sur <Strong>"Créer une nouvelle tâche"</Strong>{" "}
              pour valider vos changements
            </Callout.Text>
          </Callout.Root>
          <LayoutNewIssue
            projectsAssociatedWithUser={projectsAssociatedWithUser}
          />
        </Flex>
        <Flex gap="3" mt="4" justify="end">
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
