import {
  getCustomerLookup,
  getMakeLookup,
  getReasonLookup,
  getTruckLookup,
  getDriverLookup,
} from "@/api/lookup/services";
import React from "react";
import useCommonStore from "../common/commonStore";

function useLookupData() {
  const {
    setReasonLookupdata,
    setMakeLookupdata,
    setCustomerLookupdata,
    setTruckLookupdata,
    setDriverLookupdata,
  } = useCommonStore();
  const [isLoading, setIsLoading] = React.useState(null);

  const getLookupData = async () => {
    setIsLoading(true);
    const makeResult = await getMakeLookup();
    const customerResult = await getCustomerLookup();
    const reasonResult = await getReasonLookup();
    const truckResult = await getTruckLookup();
    const driverResult = await getDriverLookup();
    console.log(driverResult);
    if (makeResult) {
      setMakeLookupdata(makeResult.data);
    }
    if (customerResult) {
      setCustomerLookupdata(customerResult.data);
    }
    if (reasonResult) {
      setReasonLookupdata(reasonResult.data);
    }
    if (truckResult) {
      setTruckLookupdata(truckResult.data);
    }
    if (driverResult) {
      setDriverLookupdata(driverResult.data);
    }
    setIsLoading(false);
    return;
  };

  return {
    getLookupData,
    isLoading,
  };
}

export default useLookupData;
