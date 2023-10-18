"use client";
import { Project } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  projects: Project[];
  lastProject: number;
}
const ProjectFilter = ({ projects, lastProject }: Props) => {
  const router = useRouter();
  return (
    <Select.Root
      defaultValue={lastProject.toString() || undefined}
      onValueChange={(project) => {
        router.push("/dashboard" + "?project=" + project);
      }}
    >
      <Select.Trigger placeholder="Filtrer par projet" />
      <Select.Content>
        {projects?.map((project, index) => {
          return (
            <Select.Item value={index.toString()} key={project.id}>
              {project.title}
            </Select.Item>
          );
        })}
      </Select.Content>
    </Select.Root>
  );
};

export default ProjectFilter;
