import CustomButton from "@/components/common/CustomButton";

import { useQualification } from "@/context/QualificationProvider";
import { Box, Text, Flex } from "@chakra-ui/react";

import React, { useState, useRef } from "react";

import ContentEditable from "react-contenteditable";

const KeyPoints = () => {
  const [err, setErr] = useState<boolean>(false);
  const {
    formSteps,
    handleFormSteps,
    handleFillForm,
    qualificationData,
    handleQualificationData,
  } = useQualification();

  const text = useRef("");
  text.current = qualificationData?.key_points;
  const handleChange = (evt) => {
    text.current = evt.target.value;
    if (text.current !== "") {
      setErr(false);
      console.log("handleChange", text.current);
    } else {
      setErr(true);
    }
  };

  const handleBlur = () => {
    if (text.current !== "" || text.current.length >= 6) {
      setErr(false);
      console.log("handleBlur", text.current);
    } else {
      setErr(true);
    }
  };

  const handleSubmit = (values: string) => {
    if (text.current !== "") {
      setErr(false);
      handleQualificationData({
        ...qualificationData,
        key_points: values,
      });

      handleFormSteps(formSteps + 1);

      console.log(qualificationData);
    } else {
      setErr(true);
    }
  };

  return (
    <Box>
      <Box>
        <Flex align="center" justify="space-between" mb="1.7rem">
          <Text fontSize="1.4rem" color="grey_1" fontWeight="500" maxW="31rem">
            What are the key positives gotten from the qualifications?
          </Text>
        </Flex>
        <ContentEditable
          className={`texteditor ${err ? "errMode" : ""}`}
          html={text.current}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {err && (
          <Text color="red" fontSize="12px" mt="2" px="2px" fontWeight="500">
            Required
          </Text>
        )}
      </Box>

      <Flex maxW="35rem" mx="auto" gap="1.12rem" mt="3rem">
        <CustomButton
          w="100%"
          bgColor={"transparent"}
          border="1px"
          borderColor="grey_1"
          color="grey_1"
          handleClick={() => handleFillForm(false)}
        >
          Cancel
        </CustomButton>
        <CustomButton w="100%" handleClick={() => handleSubmit(text.current)}>
          Next
        </CustomButton>
      </Flex>
    </Box>
  );
};

export default KeyPoints;
