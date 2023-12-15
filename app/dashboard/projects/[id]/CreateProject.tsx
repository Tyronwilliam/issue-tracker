"use client";
import { Card, Flex, Text } from "@radix-ui/themes";
import { Session } from "next-auth";
import { z } from "zod";
import { projectSchema } from "../../../validationSchema";
import DialogProject from "./DialogProject";

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

export type ProjectFormData = z.infer<typeof projectSchema>;
