import { Spinner } from "@/app/components";
import prisma from "@/prisma/client";
import { CategorieCustom } from "@prisma/client";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Callout,
  Dialog,
  Flex,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Ref, useRef, useState } from "react";
import { CirclePicker, Color, ColorResult } from "react-color";
import toast from "react-hot-toast";

interface CategorieProps {
  allCategorie: CategorieCustom[];
  categorie?: CategorieCustom;
  issueId: number;
}
interface Error {
  title: string;
  hexCode: string;
}
const CustomCategorie = ({
  allCategorie,
  categorie,
  issueId,
}: CategorieProps) => {
  const router = useRouter();
  const title = useRef<HTMLInputElement>(null);
  const [color, setColor] = useState("");
  const [error, setError] = useState<Error>({
    title: "",
    hexCode: "",
  });
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSelect, setIsSelect] = useState(true);

  const handleChangeComplete = (color: ColorResult) => {
    const newColor = color.hex;
    setColor(newColor);
  };
  const handleCreateCategorie = async () => {
    let data = {
      title: title.current?.value,
      hexCode: color,
    };

    const response = await axios
      .post("/api/categorie/" + issueId, data)
      .then((res) => res)
      .catch((err) => err);
    console.log(response, "Response from POST ");
    if (response?.status === 200) {
      setIsSubmitting(false);
      setOpen(false);
      toast.success("C'est fait ! ");
      router.refresh();
    } else {
      let errors = { title: "", hexCode: "" };
      const titleError = response?.response?.data?.title;
      const hexCodeError = response?.response?.data?.hexCode;
      if (titleError) {
        errors.title = response?.response?.data?.title?._errors[0];
      }
      if (hexCodeError) {
        errors.hexCode = response?.response?.data?.hexCode?._errors[0];
      }
      setIsSubmitting(false);
      setError(errors);
      toast.error("Oups ! Modification impossible");
    }
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsSubmitting(true);
    handleCreateCategorie();
  };

  const handleSelect = async (id: string) => {
    const res = await axios.get("/api/categorie/" + id);
    console.log(res);

    if(res?.status === 200){
        
    }
  };
  return (
    <Dialog.Root open={open} onOpenChange={() => setOpen(true)}>
      <Dialog.Trigger>
        <Button size={"1"} variant="soft">
          Ajouter une categorie
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Catégorie</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Crée ou asssigner une categorie à votre tache
        </Dialog.Description>
        <ErrorComponent title={error?.title} hexCode={error?.hexCode} />

        <Flex gap="3" mt="4" direction={"column"}>
          <Flex gap="3" mt="4" align={"center"}>
            {isSelect && (
              <SelectComponent
                allCategorie={allCategorie}
                handleSelect={handleSelect}
              />
            )}
            <Text as="span">Ou</Text>
            <Button onClick={() => setIsSelect(false)}>
              Créer une catégorie
            </Button>
          </Flex>
          <form onSubmit={handleSubmit}>
            {!isSelect && (
              <FormComponent
                onChangeComplete={handleChangeComplete}
                title={title}
                color={color}
              />
            )}
            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <Button variant="soft" color="gray">
                  Retour
                </Button>
              </Dialog.Close>
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
          </form>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default CustomCategorie;

type MyColorPickerComponentProps = {
  onChangeComplete: (ColorResult: ColorResult) => void;
  color: Color | undefined;
};

const MyColorPickerComponent = ({
  color = "#f44336",
  onChangeComplete,
}: MyColorPickerComponentProps) => {
  return <CirclePicker color={color} onChangeComplete={onChangeComplete} />;
};

const SelectComponent = ({
  allCategorie,
  handleSelect,
}: {
  allCategorie: CategorieCustom[];
  handleSelect: (id: string) => void;
}) => {
  return (
    <Select.Root onValueChange={(id) => handleSelect(id)}>
      <Select.Trigger placeholder="Catégorie" className="max-w-[101px]" />
      <Select.Content>
        {allCategorie?.map((cat: CategorieCustom) => {
          return (
            <Select.Item value={cat.id.toString()} key={cat.id}>
              {cat.title}
            </Select.Item>
          );
        })}
      </Select.Content>
    </Select.Root>
  );
};

const FormComponent = ({
  title,
  color,
  onChangeComplete,
}: MyColorPickerComponentProps & {
  title: Ref<HTMLInputElement> | undefined;
}) => {
  return (
    <Flex gap="3" direction={"column"} className="w-fit">
      <TextField.Root className="pr-2">
        <TextField.Input
          id="categoryName"
          name="categoryName"
          placeholder="Créez votre catégorie personnalisée"
          aria-label="Nom de catégorie"
          aria-required="true"
          ref={title}
        />
      </TextField.Root>
      <Box>
        <label htmlFor="color">
          <Text as="span" size={"2"} mb={"2"} className="inline-block">
            Choissiez une couleur:
          </Text>
        </label>
        <MyColorPickerComponent
          color={color}
          onChangeComplete={onChangeComplete}
        />
      </Box>
    </Flex>
  );
};
const ErrorComponent = ({ title, hexCode }: Error) => {
  return (
    <>
      {title && (
        <Callout.Root>
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
