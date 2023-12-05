import { Spinner } from "@/app/components";
import { CategorieCustom, Issue } from "@prisma/client";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Button, Callout, Dialog, Flex, Text } from "@radix-ui/themes";
import FormComponent from "./FormComponent";
import SelectComponent from "./SelectComponentCategorie";
import useCategorie, { Error } from "./hook/useCategorie";
import { IssueWithProjectAndCategory } from "../../list/page";
import React from "react";
import DisplayCategorie from "./DisplayCategorie";

interface CategorieProps {
  allCategorie: CategorieCustom[];
  categorie?: CategorieCustom;
  issueId: number;
  issue: IssueWithProjectAndCategory;
}

const CustomCategorie = ({
  allCategorie,
  categorie,
  issueId,
  issue,
}: CategorieProps) => {
  const {
    title,
    color,
    error,
    open,
    setOpen,
    isSubmitting,
    isSelect,
    setIsSelect,
    handleChangeComplete,
    handleSelect,
    handleSubmit,
    disconnectCategorie,
  } = useCategorie();

  return (
    <Dialog.Root open={open} onOpenChange={() => setOpen(true)}>
      <Dialog.Trigger>
        <Button size={"1"} variant="soft">
          <DisplayCategorie issue={issue} isDialog={false} />
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Catégorie</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Crée ou asssigner une categorie à votre tache. (3 max)
        </Dialog.Description>
        <ErrorComponent title={error?.title} hexCode={error?.hexCode} />
        <DisplayCategorie
          issue={issue}
          isDialog={true}
          disconnectCategorie={disconnectCategorie}
        />
        <Flex gap="3" mt="4" direction={"column"}>
          <Flex gap="3" mt="4" align={"center"}>
            {isSelect && (
              <>
                <SelectComponent
                  issueId={issueId}
                  allCategorie={allCategorie}
                  handleSelect={handleSelect}
                />
                <Text as="span">Ou</Text>
                <Button onClick={() => setIsSelect(false)}>
                  Créer une catégorie
                </Button>
              </>
            )}
          </Flex>
          <form onSubmit={(e) => handleSubmit(e, issueId)}>
            {!isSelect && (
              <FormComponent
                onChangeComplete={handleChangeComplete}
                title={title}
                color={color}
              />
            )}
            <Flex gap="3" mt="4" justify="end">
              <Button
                variant="soft"
                color="gray"
                onClick={() => {
                  setOpen(false);
                  setIsSelect(true);
                }}
                type="button"
              >
                Retour
              </Button>
              <Dialog.Close>
                <Button
                  disabled={isSubmitting}
                  aria-label="Close"
                  type="submit"
                >
                  {isSubmitting && <Spinner />}
                  {!isSubmitting && <Text as="p">Sauvegarder</Text>}
                </Button>
              </Dialog.Close>
            </Flex>
          </form>{" "}
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default CustomCategorie;

const ErrorComponent = ({ title, hexCode }: Error) => {
  return (
    <>
      {title && (
        <Callout.Root className="mb-2">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>{title || hexCode}</Callout.Text>
        </Callout.Root>
      )}

      {hexCode && (
        <Callout.Root>
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>{hexCode}</Callout.Text>
        </Callout.Root>
      )}
    </>
  );
};
