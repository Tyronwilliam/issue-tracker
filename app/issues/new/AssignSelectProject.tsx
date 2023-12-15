"use client";
import { useProjectContext } from "@/app/hooks/useProjectContext";
import { Project } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

const AssignSelectProject = ({
  projects,
  issueId,
}: {
  projects: Project[];
  issueId?: number;
}) => {
  if (projects?.length === 0) return;
  const { projectId, setProjectId } = useProjectContext();

  const onChangeProject = async (project: string) => {
    if (issueId) {
      const res = await axios.patch("/api/issues/" + issueId, {
        projectId: parseInt(project),
      });
      if (res.status === 200) {
        toast.success("C'est fait");
      } else {
        toast.error("Oups ! Modification impossible");
      }
    }
    setProjectId(parseInt(project));
  };
  return (
    <>
      <Toaster />
      <Select.Root
        defaultValue={projectId?.toString() || undefined}
        onValueChange={(project) => onChangeProject(project)}
      >
        <Select.Trigger placeholder={"Choisir un projet"} />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>{" "}
            {projects?.map((project) => (
              <Select.Item value={project.id.toString()} key={project.id}>
                {project.title}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default AssignSelectProject;
