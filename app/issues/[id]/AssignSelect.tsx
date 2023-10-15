"use client";
import { Select } from "@radix-ui/themes";
import React from "react";

const AssignSelect = () => {
  return (
    <Select.Root defaultValue="">
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestion</Select.Label>
          <Select.Item value="orange">Orange</Select.Item>
          <Select.Item value="apple">Apple</Select.Item>
          <Select.Item value="grape" disabled>
            Grape
          </Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssignSelect;
