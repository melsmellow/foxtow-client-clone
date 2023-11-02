import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";

const useCommonStore = create()(
  devtools(
    persist(
      (set) => ({
        reasonLookupdata: [],
        setReasonLookupdata: (newValue) =>
          set(() => ({ reasonLookupdata: newValue })),
        makeLookupdata: [],
        setMakeLookupdata: (newValue) =>
          set(() => ({ makeLookupdata: newValue })),
        customerLookupdata: [],
        setCustomerLookupdata: (newValue) =>
          set(() => ({ customerLookupdata: newValue })),
        truckLookupdata: [],
        setTruckLookupdata: (newValue) =>
          set(() => ({ truckLookupdata: newValue })),
        driverLookupdata: [],
        setDriverLookupdata: (newValue) =>
          set(() => ({ driverLookupdata: newValue })),
        showLoader: false,
        setShowLoader: (newValue) => set(() => ({ showLoader: newValue })),
      }),
      {
        name: "common-storage",
        storage: createJSONStorage(() => sessionStorage),
      }
    ),
    {
      name: "common-store",
    }
  )
);

export default useCommonStore;
