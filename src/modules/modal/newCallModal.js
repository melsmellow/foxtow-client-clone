import { Box, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import NewCallContent from "./newCallContent";
import SelectButton from "@/component/SelectButton";

function NewCallModal() {
  const typeOfCall = ["New Call", "Completed Call", "Schedule a call", "Quote"];
  const [selectedCall, setSelectedCall] = useState(typeOfCall[0]);

  const handleChange = (e, callType) => {
    e.preventDefault();
    setSelectedCall(callType);
  };
  return (
    <Box w="90%" margin={"auto"} mt="2rem">
      <Stack direction="row" spacing={2} align="center">
        <Text>This is a</Text>
        {typeOfCall.map((callType) => {
          return (
            <SelectButton
              isSelected={selectedCall === callType ? true : false}
              onClick={(e) => handleChange(e, callType)}
            >
              {callType}
            </SelectButton>
          );
        })}
      </Stack>
      {selectedCall === typeOfCall[0] ? (
        <NewCallContent />
      ) : selectedCall === typeOfCall[1] ? (
        <p>yoww</p>
      ) : null}
    </Box>
  );
}

export default NewCallModal;
