"use client";
import { Project } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useProjectContext } from "../../hooks/useProjectContext";
import { createURLParams } from "@/app/utils/service/parameterUrl";

interface Props {
  projects: Project[];
}
const ProjectFilter = ({ projects }: Props) => {
  const router = useRouter();
  const { setProjectId } = useProjectContext();
  const searchParams = useSearchParams();
  const orderBy = searchParams.get("orderBy");
  const user = searchParams.get("user");
  const status = searchParams.get("status");
  const paramsProjectId = searchParams.get("projectId");
  const handleFilterByProject = (project: string) => {
    setProjectId(parseInt(project));
    const paramsObject = {
      status,
      user,
      orderBy,
      projectId: project,
    };
    const paramsString = createURLParams(paramsObject);
    return router.push("/issues/list" + "?" + paramsString);
  };

  return (
    <Select.Root
      defaultValue={paramsProjectId || undefined}
      onValueChange={(project) => handleFilterByProject(project)}
    >
      <Select.Trigger placeholder="Filtrer par projet" />
      <Select.Content>
        <Select.Item value="ALL">Tous</Select.Item>
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
