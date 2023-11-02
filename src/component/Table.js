"use client";
import React, { Fragment, useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Box,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Checkbox,
  Grid,
  GridItem,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import useCommonStore from "../hooks/common/commonStore";
import { BiFilterAlt } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { GrPowerReset } from "react-icons/gr";
import CustomModal from "./Modal";
import NewCallModal from "@/modules/modal/newCallModal";

const CustomThead = styled("thead")(({ theme }) => ({
  width: "1px",
  height: "50px",
  borderRadius: "10px",
  color: theme.colors.gray[100],
  backgroundColor: theme.colors.blue[800],
}));

const CustomTable = styled("table")(({ theme }) => ({
  height: "auto",
  margin: "1rem",
  width: "80%",
}));

function Table({ data, getRowCanExpand }) {
  const columns = [
    {
      id: "dispnum",
      header: "Dispatch Number",
      footer: (info) => info.column.id,
      cell: ({ row }) => {
        return (
          <div
            {...{
              onClick: row.getToggleExpandedHandler(),
              style: { cursor: "pointer", minWidth: "150px" },
            }}
          >
            {row.original.dispnum}
          </div>
        );
      },
    },
    {
      id: "makecar",
      header: "Car",
      footer: (info) => info.column.id,
      cell: ({ row }) => {
        return (
          <div
            {...{
              onClick: row.getToggleExpandedHandler(),
              style: { cursor: "pointer", minWidth: "150px" },
            }}
          >
            {row.original.makecar}
          </div>
        );
      },
    },
    {
      id: "yearcar",
      header: "Year",
      footer: (info) => info.column.id,
      cell: ({ row }) => {
        return (
          <div
            {...{
              onClick: row.getToggleExpandedHandler(),
              style: { cursor: "pointer", minWidth: "150px" },
            }}
          >
            {row.original.yearcar}
          </div>
        );
      },
    },
    {
      id: "towdate",
      header: "Tow Date",
      footer: (info) => info.column.id,
      cell: ({ row }) => {
        return (
          <div
            {...{
              onClick: row.getToggleExpandedHandler(),
              style: { cursor: "pointer", minWidth: "150px" },
            }}
          >
            {row.original.towdate}
          </div>
        );
      },
    },
    {
      id: "modelcar",
      header: "Model Car",
      footer: (info) => info.column.id,
      cell: ({ row }) => {
        return (
          <div
            {...{
              onClick: row.getToggleExpandedHandler(),
              style: { cursor: "pointer", minWidth: "150px" },
            }}
          >
            {row.original.modelcar ?? "-"}
          </div>
        );
      },
    },
    {
      id: "colorcar",
      header: "Color",
      footer: (info) => info.column.id,
      cell: ({ row }) => {
        return (
          <div
            {...{
              onClick: row.getToggleExpandedHandler(),
              style: { cursor: "pointer", minWidth: "150px" },
            }}
          >
            {row.original.colorcar}
          </div>
        );
      },
    },
    {
      id: "calltype",
      header: "Call type",
      footer: (info) => info.column.id,
      cell: ({ row }) => {
        return (
          <div
            {...{
              onClick: row.getToggleExpandedHandler(),
              style: { cursor: "pointer", minWidth: "150px" },
            }}
          >
            {row.original.calltype}
          </div>
        );
      },
    },
    {
      id: "datein",
      header: "Date in",
      footer: (info) => info.column.id,
      cell: ({ row }) => {
        return (
          <div
            {...{
              onClick: row.getToggleExpandedHandler(),
              style: { cursor: "pointer", minWidth: "150px" },
            }}
          >
            {row.original.datein}
          </div>
        );
      },
    },
    {
      id: "dateout",
      header: "Date out",
      footer: (info) => info.column.id,
      cell: ({ row }) => {
        return (
          <div
            {...{
              onClick: row.getToggleExpandedHandler(),
              style: { cursor: "pointer", minWidth: "150px" },
            }}
          >
            {row.original.dateout}
          </div>
        );
      },
    },
    {
      id: "callactnum",
      header: "Account No.",
      footer: (info) => info.column.id,
      cell: ({ row }) => {
        return (
          <div
            {...{
              onClick: row.getToggleExpandedHandler(),
              style: { cursor: "pointer", minWidth: "150px" },
            }}
          >
            {row.original.callactnum}
          </div>
        );
      },
    },
    {
      id: "refnumber",
      header: "Reference No.",
      footer: (info) => info.column.id,
      cell: ({ row }) => {
        return (
          <div
            {...{
              onClick: row.getToggleExpandedHandler(),
              style: { cursor: "pointer", minWidth: "150px" },
            }}
          >
            {row.original.refnumber}
          </div>
        );
      },
    },
    {
      id: "callname",
      header: "Call name",
      footer: (info) => info.column.id,
      cell: ({ row }) => {
        return (
          <div
            {...{
              onClick: row.getToggleExpandedHandler(),
              style: { cursor: "pointer", minWidth: "150px" },
            }}
          >
            {row.original.callname}
          </div>
        );
      },
    },
    {
      id: "licensest",
      header: "License",
      footer: (info) => info.column.id,
      cell: ({ row }) => {
        return (
          <div
            {...{
              onClick: row.getToggleExpandedHandler(),
              style: { cursor: "pointer", minWidth: "150px" },
            }}
          >
            {row.original.licensest}
          </div>
        );
      },
    },
    {
      id: "callphone",
      header: "Call phone",
      footer: (info) => info.column.id,
      cell: ({ row }) => {
        return (
          <div
            {...{
              onClick: row.getToggleExpandedHandler(),
              style: { cursor: "pointer", minWidth: "150px" },
            }}
          >
            {row.original.callphone}
          </div>
        );
      },
    },
    {
      id: "days",
      header: "Days",
      footer: (info) => info.column.id,
      cell: ({ row }) => {
        return (
          <div
            {...{
              onClick: row.getToggleExpandedHandler(),
              style: { cursor: "pointer", minWidth: "150px" },
            }}
          >
            {row.original.days}
          </div>
        );
      },
    },
    {
      id: "storagetyp",
      header: "Storage type",
      footer: (info) => info.column.id,
      cell: ({ row }) => {
        return (
          <div
            {...{
              onClick: row.getToggleExpandedHandler(),
              style: { cursor: "pointer", minWidth: "150px" },
            }}
          >
            {row.original.storagetyp}
          </div>
        );
      },
    },
    {
      id: "whocalled",
      header: "Who called",
      footer: (info) => info.column.id,
      cell: ({ row }) => {
        return (
          <div
            {...{
              onClick: row.getToggleExpandedHandler(),
              style: { cursor: "pointer", minWidth: "150px" },
            }}
          >
            {row.original.whocalled}
          </div>
        );
      },
    },
  ];

  const addModalController = useDisclosure();
  const AddDataModal = () => {
    return (
      <CustomModal
        size={"full"}
        isOpen={addModalController.isOpen}
        onOpen={addModalController.onOpen}
        onClose={addModalController.onClose}
        title="Add Data"
      >
        <NewCallModal />
      </CustomModal>
    );
  };

  const [columnVisibility, setColumnVisibility] = useState({ towdate: false });
  const [tableColumn, setTableColumn] = useState([]);
  const table = useReactTable({
    data,
    columns,
    getRowCanExpand,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      columnVisibility: columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
  });

  const resetColumn = (e) => {
    e.preventDefault();

    const defeaultArr = ["makecar", "dispnum", "modelcar", "colorcar"];

    const defaultColumn = {};
    tableColumn.map((col) => {
      if (defeaultArr.indexOf(col.id) === -1) {
        defaultColumn[col.id] = false;
      } else {
        defaultColumn[col.id] = true;
      }
    });
    setColumnVisibility(defaultColumn);
  };

  const renderSubComponent = (row) => {
    const {
      row: {
        original: { subRows },
      },
    } = row;

    return subRows;
  };

  useEffect(() => {
    setTableColumn(table.getAllColumns());
  }, []);
  return (
    <>
      <AddDataModal />
      <Box display={"flex"} justifyContent={"space-between"} ml="1rem">
        <Box>
          <Button onClick={addModalController.onOpen}>
            {" "}
            <Icon as={AiOutlinePlus} boxSize={5} />
          </Button>
        </Box>
        <Box>
          <Tooltip label="Reset column to default" hasArrow>
            <Button m="0 .5rem" p={0} onClick={resetColumn}>
              <Icon as={GrPowerReset} boxSize={5} />
            </Button>
          </Tooltip>

          <Popover placement="bottom-start">
            <PopoverTrigger>
              <Button>
                <Tooltip label="Customize column display" hasArrow>
                  <Box display={"flex"}>
                    <Icon as={BiFilterAlt} boxSize={5} mr={".5rem"} />
                    <p>Filter</p>
                  </Box>
                </Tooltip>
              </Button>
            </PopoverTrigger>
            <PopoverContent width={"500px"}>
              <PopoverArrow />
              <PopoverBody>
                <Box>
                  <Accordion allowMultiple allowToggle>
                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <Box as="span" flex="1" textAlign="left">
                            Additional Column
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <Grid templateColumns="repeat(4, 1fr)" gap={2}>
                          {tableColumn.map((col) => {
                            return (
                              <GridItem w="100%" h="10" key={col.id}>
                                <Checkbox
                                  w={"25%"}
                                  size="md"
                                  colorScheme="blue"
                                  isChecked={col.getIsVisible()}
                                  disabled={
                                    col.id === "dispnum" || col.id === "makecar"
                                      ? true
                                      : false
                                  }
                                  onChange={col.getToggleVisibilityHandler()}
                                >
                                  {col.id.charAt(0).toUpperCase() +
                                    col.id.slice(1)}
                                </Checkbox>
                              </GridItem>
                            );
                          })}
                        </Grid>
                      </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <Box as="span" flex="1" textAlign="left">
                            Section 2 title
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </Box>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
      </Box>
      <Box
        width={"90vw"}
        overflowX="auto"
        borderRadius={"10px"}
        overflowY={"auto"}
        minHeight={"60vh"}
        maxHeight={"150vh"}
        justifyContent={"center"}
      >
        <CustomTable>
          <CustomThead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </CustomThead>
          <tbody>
            {table.getRowModel().rows.map((row, idx) => {
              return (
                <Fragment key={idx} id="row-holder">
                  <tr>
                    {/* first row is a normal row */}
                    {row.getVisibleCells().map((cell, index) => {
                      return (
                        <td
                          key={index}
                          style={{
                            margin: 0,
                            width: "100%",
                            paddingBottom: "1rem",
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                  {row.getIsExpanded() && (
                    <tr>
                      {/* 2nd row is a custom 1 cell row */}
                      <td colSpan={row.getVisibleCells().length}>
                        {renderSubComponent({ row })}
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </CustomTable>
      </Box>
    </>
  );
}

export default Table;
