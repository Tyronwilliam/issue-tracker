import { CategorieCustom } from "@prisma/client";
import { Select } from "@radix-ui/themes";

const SelectComponent = ({
  allCategorie,
  handleSelect,
  issueId,
  maxCategorie,
  currentCategorie,
}: {
  issueId: number;
  allCategorie: CategorieCustom[];
  handleSelect: (id: string, issueId: number) => void;
  maxCategorie: boolean;
  currentCategorie?: CategorieCustom[];
}) => {
  return (
    <Select.Root
      onValueChange={(id) => handleSelect(id, issueId)}
      disabled={maxCategorie}
    >
      <Select.Trigger
        placeholder="Catégorie"
        className="max-w-[101px]"
      />
      <Select.Content>
        {allCategorie?.map((cat: CategorieCustom) => {
          const isDisabled: boolean =
            currentCategorie?.some(
              (currentCat) => currentCat.title === cat.title
            ) || false; // Ensure isDisabled is a boolean
          return (
            <Select.Item
              value={cat.id.toString()}
              key={cat.id}
              disabled={isDisabled}
            >
              {cat.title}
            </Select.Item>
          );
        })}
      </Select.Content>
    </Select.Root>
  );
};

export default SelectComponent;
