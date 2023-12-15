"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { EnvelopeClosedIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Callout,
  Dialog,
  Flex,
  IconButton,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { z } from "zod";
import { ErrorMessage, Spinner } from "../components";
import { useProjectContext } from "../hooks/useProjectContext";
import { invitationSchema } from "../validationSchema";
export type InvitationFormData = z.infer<typeof invitationSchema>;

const Invitation = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setProjectId, projectId } = useProjectContext();
  const [emails, setEmails] = useState([""]); // State pour stocker les adresses e-mail

  const router = useRouter();
  console.log(projectId);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InvitationFormData>({
    resolver: zodResolver(invitationSchema),
  });
  const addInput = () => {
    setEmails([...emails, ""]); // Ajoutez un nouvel élément vide à la liste des e-mails
  };
  const removeInput = (indexToRemove: number) => {
    const updatedEmails = emails?.filter(
      (el: any, index: number) => index !== indexToRemove
    );
    setEmails(updatedEmails);
    console.log(updatedEmails, "REMOVE INPUT ");
  };
  const handleEmailChange = (index: number, value: string) => {
    const updatedEmails = [...emails];
    updatedEmails[index] = value;
    setEmails(updatedEmails);
  };
  const onSubmit = handleSubmit(async (data) => {
    console.log(data, "DATA FORM");
    try {
      setIsSubmitting(true);
      data.projectId = projectId!;

      const test = await axios.post("/api/invitation", data);

      console.log(test, "TEST FUNCTION");
      //   setOpen(false);
      //   setProjectId(res.data.id);
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
          <Button data-testid="trigger">
            <EnvelopeClosedIcon />
            Lien d'invitation
          </Button>
        </Dialog.Trigger>

        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>Inviter des collaborateurs à votre projet</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Entrez l'email de votre collaborateur pour lui envoyer un lien
            d'accès au projet
          </Dialog.Description>{" "}
          <form onSubmit={onSubmit}>
            <Flex
              direction={"column"}
              gap={"2"}
              className="overflow-y-auto max-h-32 "
            >
              {emails.map((email, index) => (
                <Box className="flex gap-2" key={index}>
                  <TextField.Root className="grow max-w-[362px]">
                    <TextField.Input
                      type="email"
                      placeholder="johndoe@example.com"
                      value={email}
                      {...register(`emails.${index}`)} // Use array notation for registration
                      onChange={(e) => handleEmailChange(index, e.target.value)}
                    />
                  </TextField.Root>
                  {index === 0 ? null : (
                    <IconButton
                      type="button"
                      onClick={() => removeInput(index)}
                    >
                      <TrashIcon />
                    </IconButton>
                  )}
                </Box>
              ))}
            </Flex>
            <Box className="mx-auto w-fit h-fit mt-4" display={"block"}>
              <IconButton type="button" onClick={addInput}>
                <PlusIcon />
              </IconButton>
            </Box>
            <ErrorMessage>{errors.emails?.message}</ErrorMessage>
            <ErrorMessage>{errors.projectId?.message}</ErrorMessage>
            <Flex gap="3" mt="4" justify="end">
              <Button
                type="button"
                variant="soft"
                color="gray"
                onClick={() => setOpen(!open)}
              >
                Retour
              </Button>
              <Button disabled={isSubmitting} type="submit">
                Envoyer{isSubmitting && <Spinner />}
              </Button>
            </Flex>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};

export default Invitation;
