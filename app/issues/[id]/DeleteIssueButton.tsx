"use client";
import { Spinner } from "@/app/components";
import { useProjectContext } from "@/app/hooks/useProjectContext";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const { setProjectId, projectId } = useProjectContext();

  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const onDeleteIssue = async () => {
    try {
      setIsDeleting(true);
      await axios.delete("/api/issues/" + issueId);
      if (projectId !== null)
        router.push("/issues/list" + "?projectId=" + projectId);
      else router.push("/issues/list");

      router.refresh();
    } catch (error) {
      setIsDeleting(false);
      setError(true);
    }
  };
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" disabled={isDeleting}>
            Supprimer tâche
            {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>{" "}
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title>Confirmer la suppréssion</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Êtes-vous sûr ? Cette action est irréversible et la tâche sera
            définitivement supprimé.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Annuler
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="red" onClick={onDeleteIssue}>
                Supprimer la tâche
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      {/* Error dialog */}
      <AlertDialog.Root open={error}>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title>Erreur</AlertDialog.Title>
          <AlertDialog.Description size="2" mb="2">
            Cette tâche n'as pas pu être supprimé
          </AlertDialog.Description>

          <Button onClick={() => setError(false)}>OK</Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
