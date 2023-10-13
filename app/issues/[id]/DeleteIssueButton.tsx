"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);

  const onDeleteIssue = async () => {
    try {
      await axios.delete("/api/issues/" + issueId);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setError(true);
    }
  };
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red">Supprimer la tâche</Button>
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
