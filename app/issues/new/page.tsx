"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-2">
      <TextField.Root>
        <TextField.Input placeholder="Titre" />
      </TextField.Root>
      <TextArea placeholder="Description" />
      <Button>Créer une nouvelle tâche</Button>
    </div>
  );
};

export default NewIssuePage;
