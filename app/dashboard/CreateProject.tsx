"use client";
import {
  Button,
  Card,
  Flex,
  Text,
  Dialog,
  TextField,
  TextFieldInput,
  AlertDialog,
  Callout,
} from "@radix-ui/themes";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { projectSchema } from "../validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage, Spinner } from "../components";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { Session } from "next-auth";

export const CreateProject = ({ session }: { session: Session | null }) => {
  return (
    <Card>
      <Flex align={"center"} justify={"center"} direction={"column"} gap={"2"}>
        <Text align={"center"}>C'est vide par ici...</Text>{" "}
        <Text align={"center"}>
          C'est le moment de créer votre premier projet
        </Text>
        <DialogProject session={session} />
      </Flex>
    </Card>
  );
};

type ProjectFormData = z.infer<typeof projectSchema>;

export const DialogProject = ({ session }: { session: Session | null }) => {
  const router = useRouter();

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
      data.userId = session?.user?.id;
      setIsSubmitting(true);
      await axios.post("/api/project", data);
      router.refresh();
    } catch (error) {
      setIsSubmitting(false);
      setError("An unexpected error occurred");
    }
  });
  return (
    <>
      {" "}
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Icon>
            <AiOutlineExclamationCircle />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <Dialog.Root>
        <Dialog.Trigger>
          <Button>Créer un projet</Button>
        </Dialog.Trigger>

        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>Nommer votre projet</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            {" "}
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
