import { Flex, Progress } from "@chakra-ui/react";

import React from "react";

export default function Status() {
  return (
    <div
      style={{
        marginTop: "3rem",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1,
        // backgroundColor: "green",
        width: "100%",
        // borderRadius: "20px",
      }}
    >
      <Flex justifyContent={"space-between"}>
        <Progress
          marginLeft="3rem"
          width="200px"
          value={80}
          size="sm"
          color="red"
          borderRadius={"20px"}
          // borderColor="white"
          borderWidth={"1px"}
        />

        <Progress
          marginRight="3rem"
          width="200px"
          value={10}
          size="sm"
          color="red"
          borderRadius={"20px"}
          // borderColor="white"
          borderWidth={"1px"}
        />
      </Flex>
    </div>
  );
}
