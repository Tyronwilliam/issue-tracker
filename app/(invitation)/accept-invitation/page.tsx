"use client";
import { Box, Button, Flex, Heading, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "@/app/validationSchema";
import { ProjectFormData } from "@/app/(home)/dashboard/projects/[id]/CreateProject";
import { ErrorMessage, Spinner } from "@/app/(home)/components";

const InvitationPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  });

  const onSubmit = handleSubmit(async (data) => {});

  return (
    <Box className="w-full h-full flex items-center justify-center flex-col">
      <Heading as="h1" align="center">
        Créer votre mot de passe pour avoir accès au projet
      </Heading>
      <form
        onSubmit={onSubmit}
        className="max-w-[450px] mx-auto my-6 flex flex-col gap-2 min-w-[300px] "
      >
        <TextField.Input placeholder="Mot de passe" {...register("title")} />
        <TextField.Input
          placeholder="Confirmation du mot de passe"
          {...register("title")}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Flex gap="3" mt="4" justify="end">
          <Button disabled={isSubmitting} type="submit">
            Créer mon compte {isSubmitting && <Spinner />}
          </Button>{" "}
        </Flex>
      </form>
    </Box>
  );
};

export default InvitationPage;
