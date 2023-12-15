import { Skeleton } from "@/app/(home)/components";
import { Box } from "@radix-ui/themes";

const IssueFormSkeleton = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton className="h-8" />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default IssueFormSkeleton;
