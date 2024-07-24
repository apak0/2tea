import { useRadioGroup, HStack, useRadio, Box } from "@chakra-ui/react";

function CustomRadio(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <label>
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="2xl"
        boxShadow="md"
        bg={"gray.300"}
        opacity={""}
        _checked={{
          bg: "gray",
          color: "white",
          borderColor: "red",
        }}
        _focus={{
          boxShadow: "outline",
          bg:"gray.500",
          borderColor:"red"
        }}
        px={2}
        py={2}
        mb={2}
        
      >
        {props.children}
      </Box>
    </label>
  );
}

const RadioCard = ({ onSelect }) => {
  const options = ["Sade", "Orta", "Şekerli"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "kahveCesitleri",
    defaultValue: "sade",
    onChange: onSelect,
  });

  const group = getRootProps();

  return (
    <HStack {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <CustomRadio key={value} {...radio}>
            {value}
          </CustomRadio>
        );
      })}
    </HStack>
  );
};

export default RadioCard;
