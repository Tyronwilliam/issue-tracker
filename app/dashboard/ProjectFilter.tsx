"use client";
import { Project } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { createURLParams } from "../utils/service/parameterUrl";
import { useProjectContext } from "../hooks/useProjectContext";

interface Props {
  projects: Project[];
  lastProject?: number;
  selectAll: boolean;
}
const ProjectFilter = ({ projects, lastProject, selectAll }: Props) => {
  const router = useRouter();
  const { setProjectId, projectId } = useProjectContext();
  const searchParams = useSearchParams();
  const orderBy = searchParams.get("orderBy");
  const user = searchParams.get("user");
  const status = searchParams.get("status");
  
  const handleFilterByProject = (project: string) => {
    setProjectId(parseInt(project));
    if (selectAll) {
      const paramsObject = {
        status,
        user,
        orderBy,
        projectId: project,
      };
      const paramsString = createURLParams(paramsObject);
      return router.push("/issues/list" + "?" + paramsString);
    }
    router.push("/dashboard" + "?project=" + project);
  };

  return (
    <Select.Root
      defaultValue={undefined || lastProject?.toString()}
      onValueChange={(project) => handleFilterByProject(project)}
    >
      <Select.Trigger placeholder="Filtrer par projet" />
      <Select.Content>
        {selectAll && <Select.Item value="ALL">Tous</Select.Item>}
        {projects?.map((project) => {
          return (
            <Select.Item value={project.id.toString()} key={project.id}>
              {project.title}
            </Select.Item>
          );
        })}
      </Select.Content>
    </Select.Root>
  );
};

export default ProjectFilter;
