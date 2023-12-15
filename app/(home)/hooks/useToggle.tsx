import React from "react";

const useToggle = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [itemId, setItemId] = React.useState<number | null>(null);

  const toggle = (id: number | null) => {
    setItemId(id);
    setOpen(!open);
  };
  return { open, toggle, itemId };
};

export default useToggle;
