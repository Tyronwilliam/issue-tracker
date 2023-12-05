import { Box, Flex, Text, TextField } from "@radix-ui/themes";
import MyColorPickerComponent, {
  MyColorPickerComponentProps,
} from "./MyColorPickerComponent";
import { Ref } from "react";

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
export default FormComponent;
