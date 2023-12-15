import { Button, Card, Flex, Text } from "@radix-ui/themes";
import React from "react";
import NextLink from "next/link";

const CreateIssueUI = () => {
  return (
    <Card className="w-fit mx-auto my-auto">
      <Flex direction={"column"} align={"center"} justify={"center"} gap={"2"}>
        <Text>Créer votre première tâche</Text>
        <Button>
          <NextLink href="/issues/new">C'est parti</NextLink>
        </Button>
      </Flex>
    </Card>
  );
};

export default CreateIssueUI;
