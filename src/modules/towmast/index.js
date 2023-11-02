"use client";
import React, { useEffect, useState } from "react";
import "../../styles/style.css";

import { getTowmastData } from "@/api/towmast/services";
import Table from "@/component/Table";
import useLookupData from "@/hooks/lookup/useLookupData";
import subRowItem from "@/modules/table/subRowItem";
import { Box, Skeleton } from "@chakra-ui/react";

export default function TowmastContent() {
  const [isClient, setIsClient] = useState(false);

  const { getLookupData } = useLookupData();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  React.useEffect(() => {
    getLookupData();
  }, []);
  const fetchData = async () => {
    const res = await getTowmastData();

    let clone = structuredClone(res.data);
    if (Array.isArray(clone)) {
      clone.map((data) => {
        data.subRows = subRowItem(data._id);
      });

      setData(clone);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    setIsLoading(true);
    setIsClient(true);
    fetchData();
  }, []);

  return (
    <>
      {isClient ? (
        <Box mx="auto" w="90%" position="relative" mt="2rem">
          <Skeleton isLoaded={!isLoading}>
            <Table data={data} getRowCanExpand={() => true} />
          </Skeleton>
        </Box>
      ) : null}
    </>
  );
}
