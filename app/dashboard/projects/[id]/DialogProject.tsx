"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertDialog,
  Button,
  Callout,
  Dialog,
  Flex,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { ErrorMessage, Spinner } from "../../../components";
import { useProjectContext } from "../../../hooks/useProjectContext";
import { projectSchema } from "../../../validationSchema";
import { ProjectFormData } from "./CreateProject";
const DialogProject = ({ session }: { session: Session | null }) => {
  const router = useRouter();

  const { setProjectId, projectId } = useProjectContext();

  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      data.userId = session?.user?.id;
      const res = await axios.post("/api/project", data);
      setOpen(false);
      setProjectId(res.data.id);
      router.refresh();
      // router.push("/dashboard" + "?project=" + res.data.id);
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      setError("An unexpected error occurred");
    }
  });
  return (
    <>
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Icon>
            <AiOutlineExclamationCircle />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <Dialog.Root open={open} onOpenChange={setOpen} data-testid="modal">
        <Dialog.Trigger>
          <Button data-testid="trigger">Créer un projet</Button>
        </Dialog.Trigger>

        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>Nommer votre projet</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Vous n'avez plus qu'un mot à dire... euh écrire !
          </Dialog.Description>{" "}
          <form onSubmit={onSubmit}>
            <TextField.Input
              placeholder="Nom du projet"
              {...register("title")}
            />
            <ErrorMessage>{errors.title?.message}</ErrorMessage>
            <Flex gap="3" mt="4" justify="end">
              <Alert />
              <Button disabled={isSubmitting} type="submit">
                Let's Go !{isSubmitting && <Spinner />}
              </Button>{" "}
            </Flex>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};
export default DialogProject;
const Alert = () => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">Annuler</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>Revenir au dashboard</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Êtes-vous sûr ? Il ne suffit que d'un pas pour accomplir de grandes
          choses.{" "}
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Annuler
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Dialog.Close>
              <Button variant="solid" color="red">
                Oui, je le veux !
              </Button>
            </Dialog.Close>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
