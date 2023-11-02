import Stepper from "@/component/Stepper";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Input from "@/component/Input/Input";
import {
  LENGTH_EXCEED_LIMIT_MSG,
  LOCALHOST,
  MAX_VALUE_MSG,
  REQUIRED_MSG,
} from "@/constants";
import { addTowmastData } from "@/api/towmast/services";
import { decodeVin } from "@/api/vin/services";

import {
  AsyncCreatableSelect,
  AsyncSelect,
  CreatableSelect,
  Select,
} from "chakra-react-select";
import useCommonStore from "@/hooks/common/commonStore";

const CustomLabel = styled(FormLabel)(({ theme }) => ({
  fontWeight: "bold",
  color: "black",
}));

const UploadHolder = styled(Box)(({ theme }) => ({
  margin: "5rem auto",
  width: "350px",
  height: "250px",
  padding: "2rem",
  textAlign: "center",
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  fontSize: "25px",
  position: "relative",
  justifyContent: "space-between",
  flexDirection: "column",
  display: "flex",
}));

const ImageHolder = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "80px",
  overflow: "hidden",
  display: "flex",
  gap: "1rem",
}));

const CustomImage = styled("img")(({ theme }) => ({
  width: "80px",
  height: "80px",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  borderRadius: "5px",
}));

function NewCallContent() {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const {
    reasonLookupdata,
    makeLookupdata,
    customerLookupdata,
    truckLookupdata,
  } = useCommonStore((state) => state);

  const [makeOption, setMakeOption] = useState([]);
  const [customerOption, setCustomerOption] = useState([]);
  const [truckOption, setTruckOption] = useState([]);
  const [reasonOption, setReasonOption] = useState([]);
  const watchFields = watch(["vin"]);

  useEffect(() => {
    if (makeLookupdata) {
      let options = makeLookupdata.map((data) => {
        return {
          label: data.descrip,
          value: data.descrip,
        };
      });
      setMakeOption(options);
    }
    if (customerLookupdata) {
      let options = customerLookupdata.map((data) => {
        return {
          label: data.name,
          value: data.name,
        };
      });
      setCustomerOption(options);
    }
    if (truckLookupdata) {
      let options = truckLookupdata.map((data) => {
        return {
          label: data.trucknum,
          value: data.trucknum,
        };
      });
      setTruckOption(options);
    }
    if (reasonLookupdata) {
      let options = reasonLookupdata.map((data) => {
        return {
          label: data.descrip,
          value: data.descrip,
        };
      });
      setReasonOption(options);
    }
  }, []);
  const decodeVinString = async (vin) => {
    console.log("yoww");
    const vinDecode = await decodeVin(vin);
    if (vinDecode) {
      setValue("makecar", vinDecode.data.Results[0].Make);
      setValue("modelcar", vinDecode.data.Results[0].Model);
      setValue("yearcar", vinDecode.data.Results[0].ModelYear);
    }
  };

  useEffect(() => {
    if (watchFields && watchFields[0] && watchFields[0].length === 17) {
      decodeVinString(watchFields[0]);
    } else {
      setValue("makecar", "");
      setValue("modelcar", "");
      setValue("yearcar", "");
    }
  }, [watchFields]);

  const [droppedFiles, setDroppedFiles] = useState([]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    let userDetails =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("userDetails"))
        : null;
    formData.append("company", userDetails.companyId);

    // Append each image file to the formData object
    droppedFiles.forEach((image, index) => {
      formData.append(`files`, image.imageFile);
    });

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key];
        if (value !== "") formData.append(key, value);
      }
    }
    const result = await addTowmastData(formData);

    alert(result.data);
    window.location.reload();
  };

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

  return (
    <>
      <Tabs>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TabList>
            <Tab w="50%" fontSize="20px" fontWeight={"bold"}>
              General Information
            </Tab>
            <Tab w="50%" fontSize="20px" fontWeight={"bold"}>
              Billing Information
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Flex gap={4} mt="1rem">
                <Box display="flex" w="33%" flexDir="column">
                  <Input
                    label={"Dispatch Number"}
                    size="sm"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("dispnum"),
                    }}
                  />
                </Box>
                <Box display="flex" w="33%" flexDir="column">
                  <Input
                    size="sm"
                    label="Driver Number"
                    placeholder="Enter value"
                    // reactFormHookRegister={{
                    //   ...register("dispnum", ),
                    // }}
                  />
                </Box>
                <Box display="flex" w="33%" flexDir="column">
                  <Input
                    label={"Date"}
                    size="sm"
                    type="date"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towdate"),
                    }}
                  />
                </Box>
              </Flex>
              <Flex gap={4} mt="1rem">
                <Box display="flex" w="33%" flexDir="column">
                  <Input
                    label={"Tag Number"}
                    size="sm"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("tagmonthye", { maxLength: 5 }),
                    }}
                    isInvalid={errors.tagmonthye}
                    errorMsg={LENGTH_EXCEED_LIMIT_MSG + " of 5"}
                  />
                </Box>
                <Box display="flex" w="33%" flexDir="column">
                  <Input
                    label={"Truck Number"}
                    size="sm"
                    type="number"
                    placeholder="Enter value"
                    // reactFormHookRegister={{
                    //   ...register("tagmonthye", { maxLength: 5 }),
                    // }}
                    // isInvalid={errors.tagmonthye}
                    // errorMsg={"Max length excedeed"}
                  />
                </Box>
                <Box display="flex" w="33%" flexDir="column">
                  <Input
                    label={"Rec"}
                    size="sm"
                    type="number"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("recbooknum"),
                    }}
                    isRequired
                    isInvalid={errors.recbooknum}
                    errorMsg={REQUIRED_MSG}
                  />
                </Box>
              </Flex>

              <Flex gap={4} mt="1rem">
                <Box display="flex" w="33%" flexDir="column">
                  <Input
                    label={"Inrt"}
                    size="sm"
                    type="number"
                    placeholder="Enter value"
                    // reactFormHookRegister={{
                    //   ...register("recbooknum", ),
                    // }}
                    // isRequired
                    // isInvalid={errors.recbooknum}
                    // errorMsg={"This field is require"}
                  />
                </Box>
                <Box display="flex" w="33%" flexDir="column">
                  <Input
                    label={"Arrived"}
                    size="sm"
                    // type="number"
                    placeholder="Enter value"
                    // reactFormHookRegister={{
                    //   ...register("recbooknum", ),
                    // }}
                    // isRequired
                    // isInvalid={errors.recbooknum}
                    // errorMsg={"This field is require"}
                  />
                </Box>
              </Flex>

              <Flex gap={4} mt="1rem">
                <Box display="flex" w="33%" flexDir="column">
                  <Input
                    label={"Clear"}
                    size="sm"
                    type="number"
                    placeholder="Enter value"
                    // reactFormHookRegister={{
                    //   ...register("recbooknum", ),
                    // }}
                    // isRequired
                    // isInvalid={errors.recbooknum}
                    // errorMsg={"This field is require"}
                  />
                </Box>
                <Box display="flex" w="33%" flexDir="column">
                  <Input
                    label={"Member Number"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("membernumber", { maxLength: 20 }),
                    }}
                    isRequired
                    isInvalid={errors.membernumber}
                    errorMsg={LENGTH_EXCEED_LIMIT_MSG + " of 20"}
                  />
                </Box>
                <Box display="flex" w="33%" flexDir="column">
                  <Input
                    label="Exported date"
                    size="sm"
                    type="date"
                    reactFormHookRegister={{
                      ...register("exportdt"),
                    }}
                  />
                </Box>
              </Flex>

              <Flex gap={4} mt="1rem">
                <Box display="flex" w="33%" flexDir="column">
                  <Input
                    label="Lien Value"
                    size="sm"
                    type="number"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("lienvalue", { max: 9999999999999999.9999 }),
                    }}
                    isInvalid={errors.lienvalue}
                    errorMsg={MAX_VALUE_MSG}
                  />
                </Box>
                <Box display="flex" w="33%" flexDir="column">
                  <Input
                    label="Name"
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("callname", { maxLength: 30 }),
                    }}
                    isInvalid={errors.callname}
                    errorMsg={LENGTH_EXCEED_LIMIT_MSG + " of 30"}
                  />
                </Box>
                <Box display="flex" w="33%" flexDir="column">
                  <Input
                    label="Who Called"
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("whocalled", { maxLength: 15 }),
                    }}
                    isInvalid={errors.whocalled}
                    errorMsg={LENGTH_EXCEED_LIMIT_MSG + " of 15"}
                  />
                </Box>
              </Flex>

              <Flex gap={4} mt="1rem">
                <Box display="flex" w="33%" flexDir="column">
                  <Input
                    label="Phone"
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("callphone", { maxLength: 18 }),
                    }}
                    isInvalid={errors.callphone}
                    errorMsg={LENGTH_EXCEED_LIMIT_MSG + " of 18"}
                  />
                </Box>
                <Box display="flex" w="33%" flexDir="column">
                  <Input
                    label="Name"
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                  />
                </Box>
                <Box display="flex" w="33%" flexDir="column">
                  <Input
                    label="Reference Number"
                    size="sm"
                    type="number"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("refnumber", { maxLength: 15 }),
                    }}
                    isInvalid={errors.refnumber}
                    errorMsg={LENGTH_EXCEED_LIMIT_MSG + " of 15"}
                  />
                </Box>
              </Flex>

              <Flex gap={4} mt="1rem">
                <Box display="flex" w="33%" flexDir="column">
                  <Input
                    label="Call Type"
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("calltype", { maxLength: 2 }),
                    }}
                    isInvalid={errors.calltype}
                    errorMsg={LENGTH_EXCEED_LIMIT_MSG + " of 2"}
                  />
                </Box>
                <Box display="flex" w="33%" flexDir="column">
                  <Input
                    label="Year"
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("yearcar", { maxLength: 2 }),
                    }}
                    isInvalid={errors.yearcar}
                    errorMsg={LENGTH_EXCEED_LIMIT_MSG + " of 2"}
                  />
                </Box>
                <Box display="flex" w="33%" flexDir="column">
                  <Text mb="6">Make</Text>
                  <Select
                    label="Make"
                    size="sm"
                    placeholder="Select Make"
                    options={makeOption}
                    onChange={(e) => console.log(e)}
                  />
                  {/* <Input
                    label="Make"
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("makecar", { maxLength: 12 }),
                    }}
                    isInvalid={errors.makecar}
                    errorMsg={LENGTH_EXCEED_LIMIT_MSG + " of 12"}
                  /> */}
                </Box>
              </Flex>

              <Flex gap={4} mt="1rem">
                <Box display="flex" w="33%" flexDir="column">
                  <Input
                    label="Model"
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("modelcar", { maxLength: 15 }),
                    }}
                    isInvalid={errors.modelcar}
                    s
                    errorMsg={LENGTH_EXCEED_LIMIT_MSG + " of 15"}
                  />
                </Box>
                <Box display="flex" w="33%" flexDir="column">
                  <Input
                    label="Color"
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("colorcar", { maxLength: 12 }),
                    }}
                    isInvalid={errors.colorcar}
                    errorMsg={LENGTH_EXCEED_LIMIT_MSG + " of 12"}
                  />
                </Box>
                <Box display="flex" w="33%" flexDir="column">
                  <Input
                    label="Body"
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("bodytype", { maxLength: 12 }),
                    }}
                    isInvalid={errors.bodytype}
                    errorMsg={LENGTH_EXCEED_LIMIT_MSG + " of 12"}
                  />
                </Box>
              </Flex>

              <Flex gap={4} mt="1rem">
                <Box display="flex" w="33%" flexDir="column">
                  <Input
                    label="License Number"
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("licensenum", { maxLength: 7 }),
                    }}
                    isInvalid={errors.licensenum}
                    errorMsg={LENGTH_EXCEED_LIMIT_MSG + " of 7"}
                  />
                </Box>
                <Box display="flex" w="33%" flexDir="column">
                  <Input
                    label="Expires"
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                  />
                </Box>
                <Box display="flex" w="33%" flexDir="column">
                  <Input
                    label="Vin"
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("vin", { maxLength: 17 }),
                    }}
                    isInvalid={errors.vin}
                    errorMsg={LENGTH_EXCEED_LIMIT_MSG + " of 17"}
                  />
                </Box>
              </Flex>

              <Flex gap={4} mt="1rem">
                <Box display="flex" w="33%" flexDir="column">
                  <Input
                    label="Odometer"
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("odometer", { maxLength: 7 }),
                    }}
                    isInvalid={errors.odometer}
                    errorMsg={LENGTH_EXCEED_LIMIT_MSG + " of 7"}
                  />
                </Box>
                <Box display="flex" w="33%" flexDir="column">
                  <Input
                    label="Condition"
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("condition", { maxLength: 43 }),
                    }}
                    isInvalid={errors.condition}
                    errorMsg={LENGTH_EXCEED_LIMIT_MSG + " of 43"}
                  />
                </Box>
                <Box display="flex" w="33%" flexDir="column">
                  <Text mb="6">Reason</Text>
                  <Select
                    label="Reason"
                    size="sm"
                    placeholder="Select Reason"
                    options={reasonOption}
                    onChange={(e) => console.log(e)}
                  />
                </Box>
              </Flex>

              <Flex gap={4} mt="1rem">
                <Box display="flex" w="33%" flexDir="column">
                  <Input
                    label="From"
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towedfrom", { maxLength: 60 }),
                    }}
                    isInvalid={errors.towedfrom}
                    errorMsg={LENGTH_EXCEED_LIMIT_MSG + " of 60"}
                  />
                </Box>
                <Box display="flex" w="33%" flexDir="column">
                  <Input
                    label="To"
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towedto", { maxLength: 60 }),
                    }}
                    isInvalid={errors.towedto}
                    errorMsg={LENGTH_EXCEED_LIMIT_MSG + " of 60"}
                  />
                </Box>
                <Box display="flex" w="33%" flexDir="column">
                  <Input
                    label="Re Tow"
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("retowto", { maxLength: 60 }),
                    }}
                    isInvalid={errors.retowto}
                    errorMsg={LENGTH_EXCEED_LIMIT_MSG + " of 60"}
                  />
                </Box>
              </Flex>

              <Flex gap={4} mt="1rem">
                <Box display="flex" w="33%" flexDir="column">
                  <Input
                    label="Lot"
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("lotsection", { maxLength: 4 }),
                    }}
                    isInvalid={errors.lotsection}
                    errorMsg={LENGTH_EXCEED_LIMIT_MSG + " of 4"}
                  />
                </Box>
                <Box display="flex" w="33%" flexDir="column">
                  <Input
                    label="Type"
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                  />
                </Box>
                <Box display="flex" w="33%" flexDir="column">
                  <Input
                    label="Keys"
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("keysinfo", { maxLength: 3 }),
                    }}
                    isInvalid={errors.keysinfo}
                    errorMsg={LENGTH_EXCEED_LIMIT_MSG + " of 3"}
                  />
                </Box>
              </Flex>

              <Flex gap={4} mt="1rem">
                <Box display="flex" w="50%" flexDir="column">
                  <CustomLabel textAlign="left">Hold Note</CustomLabel>
                  <Textarea size="sm" />
                </Box>
                <Box display="flex" w="50%" flexDir="column">
                  <CustomLabel textAlign="left">Note</CustomLabel>
                  <Textarea
                    size="sm"
                    {...register("holdnote", { maxLength: 20 })}
                    isInvalid={errors.holdnote}
                    errorMsg={LENGTH_EXCEED_LIMIT_MSG + " of 3"}
                  />
                </Box>
              </Flex>
              <UploadHolder
                className="upload-holder"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <p> Drag and drop images here</p>
                {droppedFiles.length > 0 && (
                  <>
                    <ImageHolder className="image-holder">
                      {droppedFiles.map((file, idx) => (
                        <>
                          <CustomImage
                            key={idx}
                            src={file.imageUrl}
                            alt={file.imageFileName}
                            onClick={(e) => handleRemove(e, file)}
                          />
                        </>
                      ))}
                    </ImageHolder>
                  </>
                )}
              </UploadHolder>
            </TabPanel>
            <TabPanel>
              <Flex gap={4} mt="1rem">
                <Box display="flex" w="33%" flexDir="column">
                  <CustomLabel textAlign="left">Dispatch Number</CustomLabel>
                  <Input />
                </Box>
                <Box display="flex" w="33%" flexDir="column">
                  <CustomLabel textAlign="left">2nd</CustomLabel>
                  <Input />
                </Box>
                <Box display="flex" w="33%" flexDir="column">
                  {" "}
                  <CustomLabel textAlign="left">Date</CustomLabel>
                  <Input type="date" />
                </Box>
              </Flex>
              <Flex gap={4} mt="1rem">
                <Box display="flex" w="33%" flexDir="column">
                  <CustomLabel textAlign="left">Name</CustomLabel>
                  <Input />
                </Box>
                <Box display="flex" w="33%" flexDir="column">
                  <CustomLabel textAlign="left">Address</CustomLabel>
                  <Input />
                </Box>
                <Box display="flex" w="33%" flexDir="column">
                  {" "}
                  <CustomLabel textAlign="left">City</CustomLabel>
                  <Input />
                </Box>
              </Flex>

              <Flex gap={4} mt="1rem">
                <Box display="flex" w="33%" flexDir="column">
                  <CustomLabel textAlign="left">Street</CustomLabel>
                  <Input />
                </Box>
                <Box display="flex" w="33%" flexDir="column">
                  <CustomLabel textAlign="left">Zipcode</CustomLabel>
                  <Input />
                </Box>
                <Box display="flex" w="33%" flexDir="column">
                  {" "}
                  <CustomLabel textAlign="left">Auction Number</CustomLabel>
                  <Input />
                </Box>
              </Flex>

              <Flex gap={4} mt="1rem">
                <Box display="flex" w="33%" flexDir="column">
                  <CustomLabel textAlign="left">PC Number</CustomLabel>
                  <Input />
                </Box>
                <Box display="flex" w="33%" flexDir="column">
                  <CustomLabel textAlign="left">Rel Lic Number</CustomLabel>
                  <Input />
                </Box>
                <Box display="flex" w="33%" flexDir="column">
                  {" "}
                  <CustomLabel textAlign="left">Phone</CustomLabel>
                  <Input />
                </Box>
              </Flex>

              <Flex gap={4} mt="1rem">
                <Box display="flex" w="33%" flexDir="column">
                  <CustomLabel textAlign="left">Storage in</CustomLabel>
                  <Input />
                </Box>
                <Box display="flex" w="33%" flexDir="column">
                  <CustomLabel textAlign="left">Lien Start</CustomLabel>
                  <Input type="date" />
                </Box>
                <Box display="flex" w="33%" flexDir="column">
                  {" "}
                  <CustomLabel textAlign="left">Lien Clear</CustomLabel>
                  <Input type="date" />
                </Box>
              </Flex>

              <Flex gap={4} mt="1rem">
                <Box display="flex" w="33%" flexDir="column">
                  <CustomLabel textAlign="left">Lien Type</CustomLabel>
                  <Input />
                </Box>
                <Box display="flex" w="33%" flexDir="column">
                  <CustomLabel textAlign="left">Lien Fee</CustomLabel>
                  <Input type="number" />
                </Box>
                <Box display="flex" w="33%" flexDir="column">
                  {" "}
                  <CustomLabel textAlign="left">Miles</CustomLabel>
                  <Input />
                </Box>
              </Flex>

              <Flex gap={4} mt="1rem">
                <Box display="flex" w="33%" flexDir="column">
                  <CustomLabel textAlign="left">End</CustomLabel>
                  <Input />
                </Box>
                <Box display="flex" w="33%" flexDir="column">
                  <CustomLabel textAlign="left">Rel Lic Number</CustomLabel>
                  <Input />
                </Box>
                <Box display="flex" w="33%" flexDir="column">
                  {" "}
                  <CustomLabel textAlign="left">Phone</CustomLabel>
                  <Input />
                </Box>
              </Flex>
            </TabPanel>
          </TabPanels>
          <Flex justifyContent={"center"}>
            <Button
              margin="auto"
              variant={"solid"}
              colorScheme="facebook"
              type="submit"
              value="submit"
              mt="5"
            >
              Submit
            </Button>
          </Flex>
        </form>
      </Tabs>
    </>
  );
}

export default NewCallContent;
