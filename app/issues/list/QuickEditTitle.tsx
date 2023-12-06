import { Link } from "@/app/components";
import { Cross1Icon, Pencil1Icon } from "@radix-ui/react-icons";
import { Box, TextField, Tooltip } from "@radix-ui/themes";
import React, { Ref } from "react";

const QuickEditTitle = ({
  openQuickEdit,
  toggleQuickEdit,
  title,
  isssueTitle,
  issueId,
  selectId,
  handlePressKey,
}: {
  openQuickEdit: boolean;
  toggleQuickEdit: (id: number) => void;
  title: Ref<HTMLInputElement> | undefined;
  isssueTitle: string;
  issueId: number;
  selectId: number | null;
  handlePressKey: (
    e: React.KeyboardEvent<HTMLInputElement>,
    issueId: number
  ) => void;
}) => {
  return (
    <Box>
      {openQuickEdit && selectId === issueId ? (
        <Box className="flex gap-2 items-center">
          <TextField.Root className="pr-2">
            <TextField.Input
              id="title"
              name="title"
              placeholder={isssueTitle}
              aria-label="titre"
              aria-required="true"
              ref={title}
              onKeyDown={(e) => handlePressKey(e, issueId)}
            />
          </TextField.Root>
          <Cross1Icon
            onClick={() => toggleQuickEdit(issueId)}
            className="cursor-pointer"
          />
        </Box>
      ) : (
        <Box className="flex gap-2 items-center">
          <Box className="max-w-[180px]  overflow-hidden text-ellipsis whitespace-nowrap ">
            <Link href={`/issues/${issueId}`}>{isssueTitle}</Link>{" "}
          </Box>
          <Tooltip
            content="Modifier le titre de la tâche"
            style={{ backgroundColor: "var(--accent-9)" }}
          >
            <Pencil1Icon
              onClick={() => toggleQuickEdit(issueId)}
              className="cursor-pointer"
            />
          </Tooltip>
        </Box>
      )}
    </Box>
  );
};

export default QuickEditTitle;
