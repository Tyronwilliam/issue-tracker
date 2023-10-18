import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getProjectsAssociatedWithUser } from "@/app/utils/service/userRelation";
import AssignSelectProject from "./AssignSelectProject";
import { Box, Flex, Grid } from "@radix-ui/themes";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});
const NewIssuePage = async () => {
  const session = await getServerSession(authOptions);

  const projectsAssociatedWithUser = await getProjectsAssociatedWithUser(
    session
  );
  return (
    <Flex
      gap="5"
      direction={{ initial: "column-reverse", sm: "row" }}
    >
        <IssueForm />
      <Box className="w-fit">
        <AssignSelectProject projects={projectsAssociatedWithUser} />
      </Box>
    </Flex>
  );
};

export default NewIssuePage;
