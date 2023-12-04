import { CategorieCustom } from "@prisma/client";
import {
  Button,
  Dialog,
  Flex,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useState } from "react";
import { CirclePicker, Color, ColorResult } from "react-color";

interface CategorieProps {
  allCategorie: CategorieCustom[];
  categorie?: CategorieCustom;
}

const CustomCategorie = ({ allCategorie, categorie }: CategorieProps) => {
  const [color, setColor] = useState("");

  const handleChangeComplete = (color: ColorResult) => {
    const newColor = color.hex;
    console.log(newColor, "NEX COLOR");
    setColor(newColor);
  };
  return (
    <Dialog.Root>
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
          <form>
            <TextField.Root>
              <TextField.Input placeholder="Créez votre catégorie personnalisée" />
            </TextField.Root>
            <MyColorPickerComponent
              color={color}
              onChangeComplete={handleChangeComplete}
            />
          </form>
        </Flex>
        {/*  */}
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Retour
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button>Sauvegarder</Button>
          </Dialog.Close>
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
