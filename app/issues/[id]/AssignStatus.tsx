"use client";
import { Issue, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

const AssignStatus = ({
  issue,
  isFromCeil,
}: {
  issue: Issue;
  isFromCeil?: boolean;
}) => {
  const router = useRouter();
  const statuses: { label: string; value?: Status; color: string }[] = [
    { label: "Ouvert", value: "OPEN", color: "red" },
    { label: "En cours", value: "IN_PROGRESS", color: "violet" },
    { label: "Fait", value: "CLOSED", color: "green" },
  ];
  const onChangeStatus = async (status: string) => {
    try {
      await axios.patch("/api/issues/" + issue.id, {
        status: status,
      });
      toast.success("C'est fait !");
      router.refresh();
    } catch (error) {
      toast.error("Sauvegarde impossible");
    }
  };
  const color =
    issue?.status === "CLOSED"
      ? "green"
      : issue?.status === "IN_PROGRESS"
      ? "violet"
      : issue?.status === "OPEN"
      ? "red"
      : "red";

  return (
    <>
      <Toaster />
      <Select.Root
        defaultValue={issue.status}
        onValueChange={(status) => onChangeStatus(status)}
      >
        <Select.Trigger
          color={color}
          variant={`${isFromCeil ? "soft" : "surface"}`}
        />
        <Select.Content position="popper" color={color}>
          {statuses.map((etat) => {
            return (
              <Select.Item
                value={etat.value as string}
                key={etat.label}
                disabled={etat.value === issue.status}
                className="w-full"
              >
                {etat.label}
              </Select.Item>
            );
          })}
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default AssignStatus;
