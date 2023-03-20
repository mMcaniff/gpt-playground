import React, { useState } from "react";
import generateImage from "../../utils/open-ai/generateImage"

const useCreateImage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleGenerateImage = async (searchTerm: string) => {
    const image = await generateImage(searchTerm);
    setImageUrls([...imageUrls, image]);
    setTimeout(() => {
      const lastImage = document.querySelector(`img:last-of-type`);
      lastImage!.scrollIntoView({ behavior: "smooth" });
    }, 500);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleGenerateImage(searchTerm);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return {searchTerm, imageUrls, handleSubmit, handleChange }
}

export default useCreateImage;