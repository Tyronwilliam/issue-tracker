import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

const useQuickEditTitle = () => {
  const router = useRouter();

  const title = useRef<HTMLInputElement>(null);
  const [openQuickEdit, setOpenQuickEdit] = useState(false);
  const [selectId, setSelectId] = useState<number | null>(null);
  const toggleQuickEdit = (id: number) => {
    setOpenQuickEdit(!openQuickEdit);
    setSelectId(id);
  };

  const handlePatchIsue = async (issueId: number) => {
    let data = {
      title: title.current?.value,
    };
    const response = await axios
      .patch("/api/issues/" + issueId, data)
      .then((res) => res)
      .catch((err) => err);
    if (response?.status === 200) {
      toast.success("C'est fait !");

      setOpenQuickEdit(!openQuickEdit);
      router.refresh();
    } else {
      const error = response?.response?.data?.title?._errors[0];
      toast.error(error);
    }
  };
  const handlePressKey = async (
    e: React.KeyboardEvent<HTMLInputElement>,
    issueId: number
  ) => {
    if (e.key === "Enter") {
      handlePatchIsue(issueId);
    }
  };

  return {
    toggleQuickEdit,
    handlePressKey,
    handlePatchIsue,
    openQuickEdit,
    setOpenQuickEdit,
    selectId,
    setSelectId,
    title,
  };
};

export default useQuickEditTitle;
