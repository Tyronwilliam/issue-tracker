import React from "react";
import { IssueWithProjectAndCategory } from "../../list/page";
import { Badge, Flex, Text } from "@radix-ui/themes";
import { Cross1Icon } from "@radix-ui/react-icons";

const DisplayCategorie = ({
  issue,
  isDialog,
  disconnectCategorie,
}: {
  issue: IssueWithProjectAndCategory;
  isDialog: boolean;
  disconnectCategorie?: (id: number, issueId: number) => void;
}) => {
  return issue?.categorie && issue?.categorie?.length > 0 ? (
    <Flex direction={"row"} gap={"2"} className="flex-wrap">
      {issue?.categorie?.map((cat, index) => (
        <React.Fragment key={cat?.id}>
          {!isDialog ? (
            <Text as="span">
              {cat.title}
              {issue?.categorie && index < issue.categorie.length - 1 && (
                <Text as="span">,</Text>
              )}
            </Text>
          ) : (
            <div
              style={{ color: "black" }}
              className={` w-fit p-2 rounded-md relative flex items-center gap-1 cursor-pointer `}
              key={cat?.id}
              onClick={() =>
                disconnectCategorie && disconnectCategorie(cat?.id, issue?.id)
              }
            >
              <Cross1Icon className="w-[10px] h-[10px] fill-black relative	z-50" />
              <div
                style={{ background: `${cat?.hexCode}` }}
                className={`w-full h-full rounded-md absolute opacity-70 top-0 left-0 z-10 hover:opacity-90`}
              ></div>
              <Text as="span" size={"2"} className="z-50 relative">
                {cat.title}
              </Text>
            </div>
          )}
        </React.Fragment>
      ))}
    </Flex>
  ) : (
    <Text as="p">Ajouter une categorie</Text>
  );
};

export default DisplayCategorie;
