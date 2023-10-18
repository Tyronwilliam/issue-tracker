"use client";
import { useProjectContext } from "@/app/hooks/useProjectContext";
import { Project } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import React from "react";
import { Toaster } from "react-hot-toast";

const AssignSelectProject = ({ projects }: { projects: Project[] }) => {
  const { projectId, setProjectId } = useProjectContext();

  const onChangeProject = (project: string) => {
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
