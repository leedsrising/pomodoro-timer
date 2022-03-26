import React from "react";
import { Flex, Box, Text } from "rebass";

const Table = ({ columns, data }) => (
  <Box width={[1, 2, 2]}>
    <Flex flexWrap="wrap">
      {data.map((item, index) => {
        return (
          <Box px={2} width={1 / columns}>
            <Text
              p={1}
            >
              {item}
            </Text>
          </Box>
        );
      })}
    </Flex>
  </Box>
);

export default Table;