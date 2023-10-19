"use client";
import { Issue, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

const AssignStatus = ({ issue }: { issue: Issue }) => {
  const router = useRouter();
  const statuses: { label: string; value?: Status }[] = [
    { label: "Ouvert", value: "OPEN" },
    { label: "En cours", value: "IN_PROGRESS" },
    { label: "Fait", value: "CLOSED" },
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
  return (
    <>
      <Toaster />
      <Select.Root
        defaultValue={issue.status}
        onValueChange={(status) => onChangeStatus(status)}
      >
        <Select.Trigger />
        <Select.Content position="popper">
          {statuses.map((etat) => {
            return (
              <Select.Item
                value={etat.value as string}
                key={etat.label}
                disabled={etat.value === issue.status}
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
