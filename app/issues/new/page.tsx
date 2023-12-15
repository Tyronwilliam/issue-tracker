import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getProjectsAssociatedWithUser } from "@/app/utils/service/userRelation";
import { Flex } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import LayoutNewIssue from "./LayoutNewIssue";

const NewIssuePage = async () => {
  const session = await getServerSession(authOptions);

  const projectsAssociatedWithUser = await getProjectsAssociatedWithUser(
    session
  );
  return (
    <Flex gap="5" direction={{ initial: "column-reverse", sm: "row" }}>
      <LayoutNewIssue projectsAssociatedWithUser={projectsAssociatedWithUser} />
    </Flex>
  );
};

export default NewIssuePage;
