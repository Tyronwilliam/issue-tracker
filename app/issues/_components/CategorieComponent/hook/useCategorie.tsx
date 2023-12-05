import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { ColorResult } from "react-color";
import toast from "react-hot-toast";
export interface Error {
  title: string;
  hexCode: string;
}
const useCategorie = () => {
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
  const sendToast = (status: number) => {
    if (status === 200) {
      toast.success("C'est fait !");
    } else {
      toast.error("Oups ! Modification impossible");
    }
  };

  const handleChangeComplete = (color: ColorResult) => {
    const newColor = color.hex;
    setColor(newColor);
  };
  const handleCreateCategorie = async (issueId: number) => {
    let data = {
      title: title.current?.value,
      hexCode: color,
    };
    const response = await axios
      .post("/api/categorie/" + issueId, data)
      .then((res) => res)
      .catch((err) => err);
    if (response?.status === 200) {
      setOpen(false);
      setIsSubmitting(false);
      toast.success("C'est fait !");
      router.refresh();
    } else {
      let errors: Error = { title: "", hexCode: "" };
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
  const handleSubmit = async (event: any, issueId: number) => {
    event.preventDefault();
    setIsSubmitting(true);
    handleCreateCategorie(issueId);
  };

  const handleSelect = async (id: string, issueId: number) => {
    const res = await axios.get("/api/categorie/" + id);
    const status = res?.status;
    if (status === 200) {
      const id = res?.data?.id;
      let data = {
        isConnect: true,
      };
      const response = await axios
        .post("/api/categorie/" + id + "/issue/" + issueId, data)
        .then((res) => res)
        .catch((err) => err);
      sendToast(response?.status);
      if (res?.status === 200) {
        setOpen(!open);
      }
    } else {
      toast.error("Oups ! Invalide Id");
    }
  };
  const disconnectCategorie = async (id: number, issueId: number) => {
    let data = {
      isConnect: false,
    };
    const response = await axios
      .post("/api/categorie/" + id + "/issue/" + issueId, data)
      .then((res) => res)
      .catch((err) => err);

    if (response?.status === 200) {
      router.refresh();
    }
    console.log(response, "DISCONNECT ");
  };
  return {
    title,
    color,
    setColor,
    error,
    setError,
    open,
    setOpen,
    isSubmitting,
    setIsSubmitting,
    isSelect,
    setIsSelect,
    handleChangeComplete,
    handleSelect,
    handleSubmit,
    disconnectCategorie,
  };
};

export default useCategorie;
