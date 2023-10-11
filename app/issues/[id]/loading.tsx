import { Skeleton } from "@/app/components";
import { Box, Card, Flex, Heading } from "@radix-ui/themes";

const LoadingIssueDetailPage = () => {
  const issue = {
    title: "",
    createdAt: Date.now(),
    status: "",
    description: "",
  };
  return (
    <Box className="max-w-xl">
      <Heading>
        <Skeleton />
      </Heading>
      <Flex gap="3" align="center" my="2">
        <Skeleton width="5rem" />
        <Skeleton width="5rem" />
      </Flex>
      <Card className="prose" mt="4">
        {" "}
        <Skeleton count={4} />
      </Card>
    </Box>
  );
};

export default LoadingIssueDetailPage;
