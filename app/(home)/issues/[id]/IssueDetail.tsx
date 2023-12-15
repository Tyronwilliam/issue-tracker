import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkDown from "react-markdown";
import { IssueStatusBadge } from "../../components";

const IssueDetail = ({ issue }: { issue: Issue }) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap="3" align="center" my="2">
        <Text as="p">
          {" "}
          {issue.createdAt.toLocaleDateString(undefined, options)}
        </Text>
        <IssueStatusBadge status={issue.status} />
      </Flex>
      <Card className=" prose max-w-full" mt="4">
        <ReactMarkDown>{issue.description}</ReactMarkDown>
      </Card>
    </>
  );
};

export default IssueDetail;
