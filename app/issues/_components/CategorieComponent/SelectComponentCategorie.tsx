import { CategorieCustom } from "@prisma/client";
import { Select } from "@radix-ui/themes";

const SelectComponent = ({
  allCategorie,
  handleSelect,
  issueId,
}: {
  issueId: number;
  allCategorie: CategorieCustom[];
  handleSelect: (id: string, issueId: number) => void;
}) => {
  return (
    <Select.Root onValueChange={(id) => handleSelect(id, issueId)}>
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

export default SelectComponent;
