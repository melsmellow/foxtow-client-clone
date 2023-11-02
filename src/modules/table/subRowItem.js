"use client";
import { Box, Flex, Icon } from "@chakra-ui/react";
import React from "react";
import { AiFillEdit, AiFillEye } from "react-icons/ai";
import { CgNotes } from "react-icons/cg";
import { MdEmail, MdPhotoSizeSelectActual } from "react-icons/md";
import { BiDollar } from "react-icons/bi";
import { PiFilesFill } from "react-icons/pi";
import { FaHistory } from "react-icons/fa";
import { BsFillCarFrontFill } from "react-icons/bs";
import Link from "next/link";

function subRowItem(id) {
  console.log(id);
  return (
    <Box
      w={"100%"}
      mt="1rem"
      pb="1rem"
      style={{ boxShadow: "0 4px 4px rgba(0, 0, 0, 0.05)" }}
    >
      <Box width={"95%"} mx="auto">
        <Flex gap={3}>
          <Flex gap={2}>
            <Icon as={AiFillEye} boxSize={5} />
            <Link href={`/${id}`}>View Impound</Link>
          </Flex>
          <Flex gap={2}>
            <Icon as={AiFillEdit} boxSize={5} />
            <button>Modify</button>
          </Flex>
          <Flex gap={2}>
            <Icon as={CgNotes} boxSize={5} />
            <button>Impound Notes</button>
          </Flex>
          <Flex gap={2}>
            <Icon as={MdEmail} boxSize={5} />
            <button>Email</button>
          </Flex>
          <Flex gap={2}>
            <Icon as={BiDollar} boxSize={5} />
            <button>Record Payment</button>
          </Flex>
          <Flex gap={2}>
            <Icon as={MdPhotoSizeSelectActual} boxSize={5} />
            <button>Photos & Videos</button>
          </Flex>
          <Flex gap={2}>
            <Icon as={PiFilesFill} boxSize={5} />
            <button>Files</button>
          </Flex>
          <Flex gap={2}>
            <Icon as={FaHistory} boxSize={5} />
            <button>Impound History</button>
          </Flex>
          <Flex gap={2}>
            <Icon as={BsFillCarFrontFill} boxSize={5} />
            <button>Auction</button>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}

export default subRowItem;
