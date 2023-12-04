import { Spinner } from "@/app/components";
import { CategorieCustom } from "@prisma/client";
import {
  Box,
  Button,
  Dialog,
  Flex,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import { useState } from "react";
import { CirclePicker, Color, ColorResult } from "react-color";
import toast from "react-hot-toast";

interface CategorieProps {
  allCategorie: CategorieCustom[];
  categorie?: CategorieCustom;
  issueId: number;
}

const CustomCategorie = ({
  allCategorie,
  categorie,
  issueId,
}: CategorieProps) => {
  const [color, setColor] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChangeComplete = (color: ColorResult) => {
    const newColor = color.hex;
    console.log(newColor, "NEX COLOR");
    setColor(newColor);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // setOpen(false);
    let data = {
      categorie: {
        title: "",
        hexCode: "",
      },
    };
    // const response = await axios.patch("/api/categorie/" + issueId, data);

    // if (response?.status === 200) {
    //   setIsSubmitting(false);

    //   toast.success("C'est fait ! ");
    // } else {
    //   setIsSubmitting(false);

    //   toast.error("Oups ! Modification impossible");
    // }
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
        {/*  */}
        <Flex gap="3" mt="4" direction={"column"}>
          <Select.Root>
            <Select.Trigger placeholder="Catégorie" className="max-w-[101px]" />
            <Select.Content>
              {allCategorie?.map((cat: CategorieCustom) => {
                return (
                  <Select.Item
                    value={cat.title}
                    color={cat.hexCode}
                    key={cat.id}
                  >
                    {cat.title}
                  </Select.Item>
                );
              })}
            </Select.Content>
          </Select.Root>
          <Text as="span">OU</Text>
          <form onSubmit={handleSubmit}>
            <Flex gap="3" direction={"column"} className="w-fit">
              <TextField.Root className="pr-2">
                <TextField.Input
                  id="categoryName"
                  name="categoryName"
                  placeholder="Créez votre catégorie personnalisée"
                  aria-label="Nom de catégorie"
                  aria-required="true"
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
                  onChangeComplete={handleChangeComplete}
                />
              </Box>
            </Flex>
            {/*  */}
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
