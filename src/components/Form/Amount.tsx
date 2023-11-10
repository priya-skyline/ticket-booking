import React, { useState } from "react";
import { Box, TextField } from "@mui/material";

interface AmountInputProps {
  onChange: (newAmount: number) => void;
}

const AmountInput: React.FC<AmountInputProps> = ({ onChange }) => {
  const [amount, setAmount] = useState<number>(0);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = Number(e.target.value);
    setAmount(newAmount);
    onChange(newAmount);
  };

  return (
    <Box>
      <TextField
        type="number"
        variant="outlined"
        value={amount}
        onChange={handleAmountChange}
        sx={{ mr: 1 }}
        size="small"
      />
    </Box>
  );
};

export default AmountInput;
