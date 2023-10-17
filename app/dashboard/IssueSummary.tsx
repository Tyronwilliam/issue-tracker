import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}
const IssueSummary = ({ inProgress, closed, open }: Props) => {
  const containers: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: "Ouvert", value: open, status: "OPEN" },
    { label: "Fait", value: closed, status: "CLOSED" },
    { label: "En cours", value: inProgress, status: "IN_PROGRESS" },
  ];
  return (
    <Flex gap="3">
      {containers?.map((container) => {
        return (
          <Card key={container.label} className="min-w-[100px]">
            <Flex direction="column" gap="1">
              <Link
                href={`/issues/list?status=${container.status}`}
                className="text-sm font-medium"
              >
                {container.label}
              </Link>
              <Text size="5" className="font-bold">
                {container.value}
              </Text>
            </Flex>
          </Card>
        );
      })}
    </Flex>
  );
};

export default IssueSummary;
