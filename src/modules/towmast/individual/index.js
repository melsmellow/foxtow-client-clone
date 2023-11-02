import React from "react";
import {
  Box,
  Flex,
  Icon,
  IconButton,
  Skeleton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { deleteTowmastData, getTowMastById } from "@/api/towmast/services";
import { Section } from "@/component/Section";
import { BASE_URL } from "@/constants";
import CustomModal from "@/component/Modal";
import { dateFormat } from "@/utils";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const CustomTitle = styled(Text)(({ theme }) => ({
  fontWeight: "bold",
  color: theme.colors.gray[700],
  fontSize: "15px",
  margin: ".2rem 0",
}));

const CustomValue = styled(Text)(({ theme }) => ({
  color: theme.colors.gray[700],
  fontSize: "15px",
  margin: ".2rem 0",
}));

const CustomImage = styled("img")(({ theme }) => ({
  height: "100px",
  width: "100px",
  objectFit: "cover",
  borderRadius: "10px",
  ":hover": {
    cursor: "pointer",
    transform: "scale(1.1)",
    animation: "ease-in-out",
    animationDelay: "0.1s",
  },
}));

function IndividualTowmastContent() {
  const params = useParams();
  const { push } = useRouter();
  const { id } = params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pictureList, setPictureList] = useState([]);
  const [pictureIndexToView, setPictureIndexToView] = useState(0);

  const viewPicture = useDisclosure();
  const ViewPictureModal = () => {
    return (
      <CustomModal
        size={"xl"}
        isOpen={viewPicture.isOpen}
        onOpen={viewPicture.onOpen}
        onClose={viewPicture.onClose}
        title={pictureList[pictureIndexToView]}
      >
        <Flex justifyContent={"center"}>
          <img
            src={`${BASE_URL}/uploads/${pictureList[pictureIndexToView]}`}
            alt="car-pic"
            style={{ height: "500px", width: "500px", objectFit: "cover" }}
          />
        </Flex>
      </CustomModal>
    );
  };

  const getAvailableImage = (result) => {
    const pictureArr = [];
    for (let i = 0; i < 3; i++) {
      if (result[`picture${i + 1}`] !== "") {
        pictureArr.push(result[`picture${i + 1}`]);
      }
    }
    setPictureList(pictureArr);
  };

  const fetchCallData = async () => {
    setLoading(true);
    let result = await getTowMastById(id);
    setData(result.data);
    getAvailableImage(result.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCallData();
  }, [id]);

  const setActivePcture = (index) => {
    setPictureIndexToView(index);
    viewPicture.onOpen();
  };

  const renderImages = () => {
    return pictureList.map((picture, index) => {
      return (
        <CustomImage
          key={index}
          src={`${BASE_URL}/uploads/${picture}`}
          alt="car-pic"
          onClick={() => setActivePcture(index)}
        />
      );
    });
  };

  const deleteTowmastDatafunction = async () => {
    let result = await deleteTowmastData(id);
    console.log(result);
    if (result) {
      Swal.fire("Deleted!", "", "success");
      push("/");
    } else {
      Swal.fire("Failed to delete!", "", "error");
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure, you want to delete this?",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#d11a2a",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        deleteTowmastDatafunction();
      }
    });
  };
  return (
    <>
      <ViewPictureModal />
      <Box float={"right"} m="1rem">
        <IconButton
          colorScheme="facebook"
          aria-label="Delete"
          label="Delete"
          onClick={handleDelete}
          icon={<Icon as={MdDeleteForever} boxSize={6} />}
        />
      </Box>
      <Skeleton isLoaded={!loading}>
        <Box w="95%" m="auto" my="4rem">
          <Flex gap={5}>
            <Flex flexDir={"column"} gap={3} w="50%">
              <Section title={"Call Details"}>
                <Flex>
                  <Box w="40%">
                    <CustomTitle>Impound Total</CustomTitle>
                    <CustomTitle>Storage Lot</CustomTitle>
                    <CustomTitle>Date Impounded</CustomTitle>
                    <CustomTitle>Towed From</CustomTitle>
                    <CustomTitle>Driver</CustomTitle>
                    <CustomTitle>Reason for Impound</CustomTitle>
                    <CustomTitle>Account</CustomTitle>
                    <CustomTitle>Call Number</CustomTitle>
                    <CustomTitle>Stock Number</CustomTitle>
                  </Box>
                  <Box w="60%">
                    <CustomValue>-</CustomValue>
                    <CustomValue>-</CustomValue>
                    <CustomValue>
                      {data.towdate ? dateFormat(data.towdate) : "-"}
                    </CustomValue>
                    <CustomValue>-</CustomValue>
                    <CustomValue>-</CustomValue>
                    <CustomValue>{data.reason ?? "-"}</CustomValue>
                    <CustomValue>-</CustomValue>
                    <CustomValue>{data.callphone ?? "-"}</CustomValue>
                    <CustomValue>{data.stocknum ?? "-"}</CustomValue>
                  </Box>
                </Flex>
              </Section>
              <Section title={"Vehicle Details"}>
                {" "}
                <Flex>
                  <Box w="40%">
                    <CustomTitle>Vehicle Description</CustomTitle>
                    <CustomTitle>Plate Number</CustomTitle>
                    <CustomTitle>Date Impounded</CustomTitle>
                    <CustomTitle>VIN</CustomTitle>
                    <CustomTitle>Driver</CustomTitle>
                    <CustomTitle>Have Keys</CustomTitle>
                    <CustomTitle>Drivable</CustomTitle>
                  </Box>
                  <Box w="60%">
                    <CustomValue>-</CustomValue>
                    <CustomValue>-</CustomValue>
                    <CustomValue>-</CustomValue>
                    <CustomValue>{data.vin ?? "-"} </CustomValue>
                    <CustomValue>-</CustomValue>
                    <CustomValue>{data.keysinfo ?? "-"}</CustomValue>
                    <CustomValue>
                      {data.driveable === true
                        ? "Yes"
                        : data.driveable === false
                        ? "No"
                        : "Unkown"}
                    </CustomValue>
                  </Box>
                </Flex>
              </Section>
              <Section title={"Driver"}>
                <Flex>
                  <Box w="40%">
                    <CustomTitle>Driver:</CustomTitle>
                  </Box>
                  <Box w="60%">
                    <CustomValue>
                      {data?.towdrives &&
                        data?.towdrives[0]?.driver?.driver_fir.toLowerCase()}{" "}
                      {"  "}{" "}
                      {data?.towdrives &&
                        data?.towdrives[0]?.driver?.driver_las.toLowerCase()}
                    </CustomValue>
                  </Box>
                </Flex>
              </Section>
            </Flex>
            <Flex flexDir={"column"} gap={3} w="50%">
              <Section title={"Charges"}>
                <Flex>
                  <Box w="40%">
                    <CustomTitle>Total</CustomTitle>
                    <CustomTitle>Total Paid</CustomTitle>
                    <CustomTitle>Current Balance</CustomTitle>
                  </Box>
                  <Box w="60%">
                    <CustomValue>
                      ${" "}
                      {data?.towdrives &&
                        data?.towdrives[0]?.dispinv2?.total.$numberDecimal}
                    </CustomValue>
                    <CustomValue>
                      ${" "}
                      {data?.towdrives &&
                        data?.towdrives[0]?.dispinv2?.totalpaid.$numberDecimal}
                    </CustomValue>
                    <CustomValue>
                      ${" "}
                      {data?.towdrives &&
                        data?.towdrives[0]?.dispinv2?.curbalance.$numberDecimal}
                    </CustomValue>
                  </Box>
                </Flex>
              </Section>
              <Section title={"Photographs"}>
                {pictureList ? <Flex gap={2}>{renderImages()}</Flex> : null}
              </Section>
              <Section title={"Files"}></Section>
            </Flex>
          </Flex>
        </Box>
      </Skeleton>
    </>
  );
}

export default IndividualTowmastContent;
