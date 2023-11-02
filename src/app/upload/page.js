"use client";
import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import { Button, Icon, Stack } from "@chakra-ui/react";
import TruckIcon from "../../../public/icon/flatBed.svg";
import Image from "next/image";

function Upload() {
  const [droppedFiles, setDroppedFiles] = useState([]);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemove = (e, file) => {
    e.preventDefault();

    const filteredData = droppedFiles.filter((data) => {
      return data.imageFileName !== file.imageFileName;
    });
    setDroppedFiles(filteredData);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);

    // Filter the dropped files to only include image files
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    if (droppedFiles.length + imageFiles.length > 3) {
      alert("3 Images upload are only allowed");
    } else {
      let imagesArr = [];
      const imageUrls = imageFiles.map((file) => {
        imagesArr.push({
          imageFile: file,
          imageFileName: file.name,
          imageUrl: URL.createObjectURL(file),
        });
      });

      setDroppedFiles([...droppedFiles, ...imagesArr]);
    }

    // Update the state with the dropped image URLs
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append each image file to the formData object
    droppedFiles.forEach((image, index) => {
      formData.append(`files`, image.imageFile);
    });

    console.log(formData);

    const result = await axios.post(
      "http://159.65.236.173:5000/towmast/add",
      formData
    );

    console.log(result);
    alert(result.data);
  };

  return (
    <Stack direction="row" gap={5} mx="5rem">
      <Image src={TruckIcon.src} alt="asdsds" width={50} height={50} />
      <Image src={TruckIcon.src} alt="asdsds" width={150} height={150} />
      <Image src={TruckIcon.src} alt="asdsds" width={250} height={250} />
      <Image src={TruckIcon.src} alt="asdsds" width={550} height={550} />
    </Stack>
  );
}

export default Upload;
