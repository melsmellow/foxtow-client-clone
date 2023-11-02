"use client";
import { addTowDrive } from "@/api/towdrive/services";
import { addTowInv } from "@/api/towinv/services";
import { addTowmastData } from "@/api/towmast/services";
import { decodeVin } from "@/api/vin/services";
import { Input } from "@/component/Input";
import { Loader } from "@/component/Loader";
import { Section } from "@/component/Section";
import { LENGTH_EXCEED_LIMIT_MSG } from "@/constants";
import useCommonStore from "@/hooks/common/commonStore";
import {
  Box,
  Divider,
  Flex,
  FormLabel,
  Text,
  Textarea,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { Select } from "chakra-react-select";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const StyledContainer = styled(Box)(({ theme }) => ({
  // minHeight: "200px",
  border: `solid 1px ${theme.colors.gray[200]}`,
  borderRadius: "8px",
  transform: "translateY(-8%)",
  position: "relative",
  padding: "1rem 1rem 0 1rem",
}));

const UploadHolder = styled(Box)(({ theme }) => ({
  margin: "auto",
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

const CustomLabel = styled(FormLabel)(({ theme }) => ({
  fontWeight: "bold",
  color: "black",
}));

function FormContent() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const { driverLookupdata, reasonLookupdata, truckLookupdata, setShowLoader } =
    useCommonStore();
  const [driverLookup, setDriverLookup] = useState([]);
  const [reasonLookup, setReasonLookup] = useState([]);
  const [truckLookup, setTruckLookup] = useState([]);
  const [droppedFiles, setDroppedFiles] = useState([]);
  const { push } = useRouter();
  const watchFields = watch(["towmastVin"]);

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

    formData.append("vin", data.towmastVin);
    formData.append("reason", data.towmastReason);
    formData.append("makecar", data.towmastMakecar);
    formData.append("modelcar", data.towmastModelcar);
    // formData.append("yearcar", data.towmastYearcar);

    // formData.append("dispnum", data.towmastDispnum);
    // formData.append("towdate", data.towmastTowdate);
    // formData.append("callactnum", data.towmastCallactnum);
    // formData.append("callname", data.towmastCallname);
    // formData.append("whocalled", data.towmastWhoCalled);
    // formData.append("callphone", data.towmastCallphone);
    // formData.append("refnum", data.towmastRefnum);
    // formData.append("typecall", data.towmastTypecall);
    // formData.append("towedfrom", data.towmastTowedfrom);
    // formData.append("towedto", data.towmastTowedto);
    // formData.append("lotsection", data.towmastLotsection);
    // formData.append("calltype", data.towmastCalltype);
    // formData.append("keysinfo", data.towmastKeysinfo);
    // formData.append("holdnote", data.towmastHoldnote);
    // formData.append("note", data.towmastNote);
    // formData.append("license", data.towmastLicense);
    // formData.append("tagmonthyear", data.towmastTagmonthyear);
    // formData.append("odometer", data.towmastOdometer);

    // formData.append("colorcar", data.towmastColorcar);
    // formData.append("bodytype", data.towmastBodytype);
    // formData.append("driver", data.towmastDriver);
    // formData.append("truck", data.towmastTruck);
    // formData.append("dispatcher", data.towmastDispatcher);
    // formData.append("membernum", data.towmastMembernum);
    // formData.append("releaseLicense", data.towmastReleaseLicense);
    // formData.append("auctionnum", data.towmastAuctionnum);
    // formData.append("auctiondate", data.towmastAuctiondate);
    // formData.append("callremark", data.towmastCallremark);
    // formData.append("lienvalue", data.towmastLienvalue);
    // formData.append("retowto", data.towmastRetowto);
    // formData.append("is462car", data.towmastIs462car);
    // formData.append("propery", data.towmastPropery);

    const towinvObj = {
      total: Number(data.towinvTotal),
      curbalance: Number(data.towinvCurbalance),
      totalpaid: Number(data.towinvTotalpaid),
    };
    const towInvResult = await addTowInv(towinvObj);
    const towmastResult = await addTowmastData(formData);

    const towDriveObj = {
      driver: data.driver,
      towmast: towmastResult.data._id,
      towinv: towInvResult.data._id,
    };
    const towDriveResult = await addTowDrive(towDriveObj);
    push("/");
  };

  const decodeVinString = async (vin) => {
    setShowLoader(true);
    const vinDecode = await decodeVin(vin);
    if (vinDecode) {
      setValue("towmastMakecar", vinDecode.data.Results[0].Make);
      setValue("towmastModelcar", vinDecode.data.Results[0].Model);
      setValue("towmastYearcar", vinDecode.data.Results[0].ModelYear);
    }
    setShowLoader(false);
  };

  useEffect(() => {
    if (watchFields && watchFields[0] && watchFields[0].length === 17) {
      decodeVinString(watchFields[0]);
    } else {
      setValue("towmastMakecar", "");
      setValue("towmastModelcar", "");
      setValue("towmastYearcar", "");
    }
  }, [watchFields[0]]);

  useEffect(() => {
    setDriverLookup([]);
    setReasonLookup([]);
    setTruckLookup([]);
    if (driverLookupdata.length > 0) {
      let temp = driverLookupdata.map((item) => {
        return {
          label: (item.driver_fir + " " + item.driver_las).toLocaleLowerCase(),
          value: item._id,
        };
      });
      setDriverLookup(temp);
    }

    if (reasonLookupdata && reasonLookupdata.length > 0) {
      let temp = reasonLookupdata.map((item) => {
        return {
          label: item.descrip.toLocaleLowerCase(),
          value: item._id,
        };
      });
      setReasonLookup(temp);
    }

    if (truckLookupdata && truckLookupdata.length > 0) {
      let temp = truckLookupdata.map((item) => {
        return {
          label: item.trucknum.toLocaleLowerCase(),
          value: item._id,
        };
      });
      setTruckLookup(temp);
    }
  }, [driverLookupdata, reasonLookupdata, truckLookupdata]);

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
      <Box w="90%" margin={"auto"} mt="2rem">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Section title="General Information">
            <Flex flexDir="column" gap={4} justifyContent="space-evenly">
              <Flex gap={4}>
                <Box w="60%">
                  <Flex gap={4} mb={4}>
                    <Box minW="30%">
                      <Input
                        label={"Dispatch Number"}
                        size="sm"
                        placeholder="Enter value"
                        reactFormHookRegister={{
                          ...register("towmastDispnum"),
                        }}
                      />
                    </Box>
                    <Box w="70%">
                      <Text fontSize="13px" fontWeight="bold" mb={1}>
                        Driver
                      </Text>
                      <Select
                        label="Driver"
                        size="sm"
                        placeholder="Select Driver"
                        options={driverLookup}
                        onChange={(e) => setValue("driver", e.value)}
                      />
                    </Box>
                  </Flex>
                  <Flex gap={4}>
                    <Box minW="30%">
                      <Input
                        label={"Date"}
                        size="sm"
                        type="date"
                        placeholder="Enter value"
                        reactFormHookRegister={{
                          ...register("towmastTowdate"),
                        }}
                      />
                    </Box>
                    <Box w="70%">
                      <Text fontSize="13px" fontWeight="bold" mb={1}>
                        Truck
                      </Text>
                      <Select
                        label="Driver"
                        size="sm"
                        placeholder="Select Truck Number"
                        options={truckLookup}
                        onChange={(e) => setValue("truck", e.value)}
                      />
                    </Box>
                  </Flex>
                </Box>
                <Box w="40%">
                  <StyledContainer>
                    <Flex gap={4} mb={4}>
                      <Input
                        label={"Time receive"}
                        size="sm"
                        type="datetime-local"
                        placeholder="Enter value"
                        reactFormHookRegister={{
                          ...register("towdriveTimerec"),
                        }}
                      />
                      <Input
                        label={"In route time"}
                        size="sm"
                        type="datetime-local"
                        placeholder="Enter value"
                        reactFormHookRegister={{
                          ...register("towdriveTimeInrt"),
                        }}
                      />
                    </Flex>
                    <Flex gap={4} mb={4}>
                      <Input
                        label={"Arrived time"}
                        size="sm"
                        placeholder="Enter value"
                        reactFormHookRegister={{
                          ...register("towdriveTimeArrived"),
                        }}
                      />
                      <Input
                        label={"In tow time"}
                        size="sm"
                        placeholder="Enter value"
                        reactFormHookRegister={{
                          ...register("towdriveTimeIntow"),
                        }}
                      />
                      <Input
                        label={"Cleared Time"}
                        size="sm"
                        placeholder="Enter value"
                        reactFormHookRegister={{
                          ...register("towdriveTimeClear"),
                        }}
                      />
                    </Flex>
                  </StyledContainer>
                </Box>
              </Flex>
              <Divider />
              <Flex gap={4}>
                <Box minW="20%">
                  <Input
                    label={"Calling Agency Number"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastCallactnum"),
                    }}
                  />
                </Box>
                <Box w="40%">
                  <Input
                    label={"Call name"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastCallname"),
                    }}
                  />
                </Box>
                <Box w="40%">
                  <Input
                    label={"Who called?"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastWhoCalled"),
                    }}
                  />
                </Box>
              </Flex>
              <Flex gap={4}>
                <Box minW="20%">
                  <Input
                    label={"Call phone"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastCallphone"),
                    }}
                  />
                </Box>
                <Input
                  label={"Reference Number"}
                  size="sm"
                  type="text"
                  placeholder="Enter value"
                  reactFormHookRegister={{
                    ...register("towmastRefnum"),
                  }}
                />
                <Input
                  label={"Type of call"}
                  size="sm"
                  type="text"
                  placeholder="Enter value"
                  reactFormHookRegister={{
                    ...register("towmastTypecall"),
                  }}
                />
              </Flex>
              <Divider />
              <Flex gap={4}>
                <Box minW="19%">
                  <Input
                    label={"Year Car"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastYearcar"),
                    }}
                  />
                </Box>
                <Box minW="19%">
                  <Input
                    label={"Make Car"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastMakecar"),
                    }}
                  />
                </Box>
                <Box minW="19%">
                  <Input
                    label={"Model Car"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastModelcar"),
                    }}
                  />
                </Box>
                <Box minW="19%">
                  <Input
                    label={"Color Car"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastColorcar"),
                    }}
                  />
                </Box>
                <Box minW="19%">
                  <Input
                    label={"Body Type"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastBodytype"),
                    }}
                  />
                </Box>
              </Flex>
              <Flex gap={4}>
                <Box minW="19%">
                  <Input
                    label={"License"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastLicense"),
                    }}
                  />
                </Box>
                <Box minW="19%">
                  <Input
                    label={"Expiration Date"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastTagmonthyear"),
                    }}
                  />
                </Box>
                <Box minW="19%">
                  <Input
                    label={"VIN"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastVin"),
                    }}
                  />
                </Box>
                <Box minW="19%">
                  <Input
                    label={"Odometer Reading"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastOdometer"),
                    }}
                  />
                </Box>
                <Box minW="19%">
                  <Text fontSize="13px" fontWeight="bold" mb={1}>
                    Reason
                  </Text>
                  <Select
                    label="Reason"
                    size="sm"
                    placeholder="Select Reason"
                    options={reasonLookup}
                    onChange={(e) => setValue("reason", e.value)}
                  />
                </Box>
              </Flex>
              <Divider />
              <Flex gap={4}>
                <Box minW="38%">
                  <Input
                    label={"Towed from"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastTowedfrom"),
                    }}
                  />
                </Box>
                <Box minW="38%">
                  <Input
                    label={"Towed to"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastTowedto"),
                    }}
                  />
                </Box>
                <Box minW="22%">
                  <Input
                    label={"Lot section"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastLotsection"),
                    }}
                  />
                </Box>
              </Flex>
              <Flex gap={4}>
                <Box minW="50%">
                  <Input
                    label={"Call type"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastCalltype"),
                    }}
                  />
                </Box>
                <Box minW="50%">
                  <Input
                    label={"Keys info"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastKeysinfo"),
                    }}
                  />
                </Box>
              </Flex>
              <Flex gap={4}>
                <Box display="flex" minW="50%" flexDir="column">
                  <CustomLabel textAlign="left">Hold Note</CustomLabel>
                  <Textarea size="sm" />
                </Box>
                <Box display="flex" minW="50%" flexDir="column">
                  <CustomLabel textAlign="left">Note</CustomLabel>
                  <Textarea
                    size="sm"
                    {...register("towmastHoldnote", { maxLength: 20 })}
                    isInvalid={errors.holdnote}
                    errorMsg={LENGTH_EXCEED_LIMIT_MSG + " of 3"}
                  />
                </Box>
              </Flex>
              <Flex gap={4}>
                <Box minW="19%">
                  <Input
                    label={"Tag number"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towdriveTowtagnum"),
                    }}
                  />
                </Box>
                <Box minW="19%">
                  <Input
                    label={"Dispatcher"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastDispatcher"),
                    }}
                  />
                </Box>
                <Box minW="19%">
                  <Input
                    label={"Member number "}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastMembernum"),
                    }}
                  />
                </Box>
                <Box minW="19%">
                  <Input
                    label={"Kit Number"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towinvKitnum"),
                    }}
                  />
                </Box>
                <Box minW="19%">
                  <Input
                    label={"Storage Type"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastStoragetype"),
                    }}
                  />
                </Box>
              </Flex>
              <Flex gap={4}>
                <Box minW="19%">
                  <Input
                    label={"Call Remark"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastCallremark"),
                    }}
                  />
                </Box>
                <Box minW="19%">
                  <Input
                    label={"Lien Value"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastLienvalue"),
                    }}
                  />
                </Box>
                <Box minW="19%">
                  <Input
                    label={"Retow to "}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastRetowto"),
                    }}
                  />
                </Box>
                <Box minW="19%">
                  <Input
                    label={"462 Car"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastIs462car"),
                    }}
                  />
                </Box>
                <Box minW="19%">
                  <Input
                    label={"Property"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastPropery"),
                    }}
                  />
                </Box>
              </Flex>
              <Flex gap={4}>
                <Box minW="19%">
                  <Input
                    label={"Rel lib"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastRellib"),
                    }}
                  />
                </Box>
                <Box minW="19%">
                  <Input
                    label={"Amnesty"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastAmnesty"),
                    }}
                  />
                </Box>
                <Box minW="19%">
                  <Input
                    label={"Collect Flag "}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastCollectflag"),
                    }}
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
            </Flex>
          </Section>
          <Section title="Billing Information">
            <Flex gap={4} flexDir="column">
              <Flex gap={4}>
                <Box minW="50%">
                  <Input
                    label={"Auction Number"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastAuctionnum"),
                    }}
                  />
                </Box>
                <Box minW="50%">
                  <Input
                    label={"Auction Date"}
                    size="sm"
                    type="date"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastAuctiondate"),
                    }}
                  />
                </Box>
              </Flex>
              <Flex gap={4}>
                <Box minW="19%">
                  <Input
                    label={"PO number"}
                    size="sm"
                    type="number"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towinvPoNumber"),
                    }}
                  />
                </Box>
                <Box minW="19%">
                  <Input
                    label={"Bill to Act"}
                    size="sm"
                    type="number"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towinvBilltoAct"),
                    }}
                  />
                </Box>
                <Box minW="19%">
                  <Input
                    label={"Bill to name"}
                    size="sm"
                    type="date"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towinvBilltoName"),
                    }}
                  />
                </Box>
                <Box minW="19%">
                  <Input
                    label={"Release license"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastReleaseLicense"),
                    }}
                  />
                </Box>
              </Flex>
              <Flex gap={4}>
                <Box minW="50%">
                  <Input
                    label={"Address 1"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towinvBilltoAddr1"),
                    }}
                  />
                </Box>
                <Box minW="50%">
                  <Input
                    label={"Address 2"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towinvBilltoAddr2"),
                    }}
                  />
                </Box>
              </Flex>
              <Flex gap={4}>
                <Box minW="19%">
                  <Input
                    label={"Phone"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towinvBilltoPhone"),
                    }}
                  />
                </Box>
                <Box minW="19%">
                  <Input
                    label={"Country"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towinvBilltoCont"),
                    }}
                  />
                </Box>
                <Box minW="19%">
                  <Input
                    label={"City"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towinvBilltoCity"),
                    }}
                  />
                </Box>
                <Box minW="19%">
                  <Input
                    label={"Street"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towinvBilltoStreet"),
                    }}
                  />
                </Box>
                <Box minW="19%">
                  <Input
                    label={"ZIP"}
                    size="sm"
                    type="number"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towinvBilltoZip"),
                    }}
                  />
                </Box>
              </Flex>
              <Flex gap={4}>
                <Box minW="19%">
                  <Input
                    label={"Date out"}
                    size="sm"
                    type="date"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastDateout"),
                    }}
                  />
                </Box>
                <Box minW="19%">
                  <Input
                    label={"Start mile"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towtransStartmile"),
                    }}
                  />
                </Box>
                <Box minW="19%">
                  <Input
                    label={"End mile"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towtransEndmile"),
                    }}
                  />
                </Box>
                <Box minW="19%">
                  <Input
                    label={"Lien In"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastLiendin"),
                    }}
                  />
                </Box>
                <Box minW="19%">
                  <Input
                    label={"Lien Out"}
                    size="sm"
                    type="number"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastLiendout"),
                    }}
                  />
                </Box>
              </Flex>
              <Flex gap={4}>
                <Box minW="19%">
                  <Input
                    label={"Total"}
                    size="sm"
                    type="number
                    "
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towinvTotal"),
                    }}
                  />
                </Box>
                <Box minW="19%">
                  <Input
                    label={"Total paid"}
                    size="sm"
                    type="number"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towinvTotalpaid"),
                    }}
                  />
                </Box>
                <Box minW="19%">
                  <Input
                    label={"Current Balance"}
                    size="sm"
                    type="number"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towinvCurbalance"),
                    }}
                  />
                </Box>
                <Box minW="19%">
                  <Input
                    label={"Commision"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towtransCommision"),
                    }}
                  />
                </Box>
                <Box minW="19%">
                  <Input
                    label={"Item group"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towinvItemgroup"),
                    }}
                  />
                </Box>
              </Flex>
              <Flex gap={4}>
                <Box minW="19%">
                  <Input
                    label={"Pay type"}
                    size="sm"
                    type="date"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towinvPaytype"),
                    }}
                  />
                </Box>
                <Box minW="19%">
                  <Input
                    label={"Lien fee"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastLienfee"),
                    }}
                  />
                </Box>
                <Box minW="19%">
                  <Input
                    label={"Lien type"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastLientype"),
                    }}
                  />
                </Box>
                <Box minW="19%">
                  <Input
                    label={"Days"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastDay"),
                    }}
                  />
                </Box>
                <Box minW="19%">
                  <Input
                    label={"Per day"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastPerday"),
                    }}
                  />
                </Box>
              </Flex>
              <Flex gap={4}>
                <Box minW="19%">
                  <Input
                    label={"Per day total"}
                    size="sm"
                    type="date"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastPerdaytotal"),
                    }}
                  />
                </Box>
                <Box minW="19%">
                  <Input
                    label={"Date in"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastDatein"),
                    }}
                  />
                </Box>
                <Box minW="19%">
                  <Input
                    label={"Sales Tax"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastSalesTax"),
                    }}
                  />
                </Box>
                <Box minW="19%">
                  <Input
                    label={"Relase by who"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towinvReleasebywho"),
                    }}
                  />
                </Box>
                <Box minW="19%">
                  <Input
                    label={"Register name"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastRegnametow"),
                    }}
                  />
                </Box>
              </Flex>
              <Flex gap={4}>
                <Box minW="19%">
                  <Input
                    label={"Invoice Release time"}
                    size="sm"
                    type="date"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towinvReleaseTime"),
                    }}
                  />
                </Box>
                <Box minW="19%">
                  <Input
                    label={"Invoice Tax Rate"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towinvTaxrate"),
                    }}
                  />
                </Box>
                <Box minW="19%">
                  <Input
                    label={"Relase Type"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastReleasetype"),
                    }}
                  />
                </Box>
              </Flex>
              <Flex gap={4}>
                <Box minW="50%">
                  <Input
                    label={"Address 1"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastRegaddr1"),
                    }}
                  />
                </Box>
                <Box minW="23%">
                  <Input
                    label={"City"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastRegCity"),
                    }}
                  />
                </Box>
                <Box minW="23%">
                  <Input
                    label={"State"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastRegstate"),
                    }}
                  />
                </Box>
              </Flex>
              <Flex gap={4}>
                <Box minW="19%">
                  <Input
                    label={"Stock Number"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastStocknum"),
                    }}
                  />
                </Box>
                <Box minW="19%">
                  {" "}
                  <Input
                    label={"Collect Flag"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towmastCollectflag"),
                    }}
                  />
                </Box>
                <Box minW="19%">
                  <Input
                    label={"Invoice Voided"}
                    size="sm"
                    type="text"
                    placeholder="Enter value"
                    reactFormHookRegister={{
                      ...register("towinvVoided"),
                    }}
                  />
                </Box>
              </Flex>
            </Flex>
          </Section>
        </form>
      </Box>
    </>
  );
}

export default FormContent;
