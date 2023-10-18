"use client";
import { Project } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { createURLParams } from "../utils/service/parameterUrl";

interface Props {
  projects: Project[];
  lastProject?: number;
  selectAll: boolean;
}
const ProjectFilter = ({ projects, lastProject, selectAll }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderBy = searchParams.get("orderBy");
  const user = searchParams.get("user");
  const status = searchParams.get("status");

  const handleFilterByProject = (project: string) => {
    if (selectAll) {
      const paramsObject = {
        status,
        user,
        orderBy,
        projectId: project,
      };
      const paramsString = createURLParams(paramsObject);
      if (project === "ALL") {
        router.push("/issues/list" + "?" + paramsString);
      }
      return router.push("/issues/list" + "?" + paramsString);
    }
    router.push("/dashboard" + "?project=" + project);
  };
  return (
    <Select.Root
      defaultValue={lastProject?.toString() || "ALL"}
      onValueChange={(project) => handleFilterByProject(project)}
    >
      <Select.Trigger placeholder="Filtrer par projet" />
      <Select.Content>
        {selectAll && <Select.Item value="ALL">Tous</Select.Item>}
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
