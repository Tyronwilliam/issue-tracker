"use client";

import { convertIntoTotalSecond } from "@/app/utils/service/timeFunction";
import { issueSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Box, Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";
import { useProjectContext } from "../../hooks/useProjectContext";
import { useIssueContext } from "../../hooks/useIssueContext";
import { ErrorMessage, Spinner } from "../../components";

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const { data: session } = useSession();
  const { projectId } = useProjectContext();
  const { issueTime } = useIssueContext();
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      if (issue) {
        if (issueTime) {
          const convertIssueTime = await convertIntoTotalSecond(
            issueTime as string
          );
          data.timer = convertIssueTime;
        }
        await axios.patch(`/api/issues/${issue.id}`, data);
      } else {
        if (issueTime) {
          const convertIssueTime = await convertIntoTotalSecond(
            issueTime as string
          );
          data.timer = convertIssueTime;
        }
        data.projectId = projectId || undefined;
        data.userId = session?.user?.id;
        // ICI il va falloir creer une route api pour créer la ROW creator ensuite l'assignée à la tache ( user id , id de la tache)
        const id = session?.user?.id;
        const res = await axios.post("/api/issues", data);

        if (res?.status === 201) {
          console.log(res);
          const issueId = res?.data?.id;
          console.log(issueId, "ISSUE ID");
          const resCreator = await axios.post(
            "/api/creator/" + id + "/issue/" + issueId
          );
          console.log(resCreator, " RES CREATOR");
        }
      }
      setIsSubmitting(false);
      router.push("/issues/list?projectId=" + projectId);
      router.refresh();
    } catch (error: any) {
      setIsSubmitting(false);
      console.log(error);
      // setError("An unexpected error occurred");
      setError(error.response.data.error);
    }
  });

  return (
    <Box className="max-w-xl space-y-2">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Icon>
            <AiOutlineExclamationCircle />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-2" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            placeholder="Titre"
            {...register("title")}
            defaultValue={issue?.title}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => <SimpleMDE {...field} ref={null} />}
        />
        <ErrorMessage>{errors?.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          {issue ? "Mettre à jour la tâche" : "Créer une nouvelle tâche"}
          {isSubmitting && <Spinner />}
        </Button>{" "}
      </form>
    </Box>
  );
};

export default IssueForm;
