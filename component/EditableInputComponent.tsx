// Custom Controller for Edit Title & URL INput Fields
import React from "react";
import { Box, useEditableControls, IconButton } from "@chakra-ui/react";
import { FiEdit2, FiCheck } from "react-icons/fi";

const EditableInputComponent = function () {
  const { isEditing, getSubmitButtonProps, getEditButtonProps } =
    useEditableControls();

  return isEditing ? (
    <Box display="inline-block">
      <IconButton
        aria-label="Check"
        height="auto"
        width="auto"
        verticalAlign="initial"
        bg="transparent"
        _hover={{ backgroundColor: "none" }}
        _active={{ backgroundColor: "none" }}
        _focus={{ backgroundColor: "none" }}
        icon={<FiCheck />}
        {...getSubmitButtonProps()}
      />
    </Box>
  ) : (
    <Box display="inline-block">
      <IconButton
        aria-label="Edit"
        height="auto"
        width="auto"
        verticalAlign="initial"
        className="themeFont"
        bg="transparent"
        _hover={{ backgroundColor: "none" }}
        _active={{ backgroundColor: "none" }}
        _focus={{ backgroundColor: "none" }}
        icon={<FiEdit2 />}
        {...getEditButtonProps()}
      />
    </Box>
  );
};

export default EditableInputComponent;
