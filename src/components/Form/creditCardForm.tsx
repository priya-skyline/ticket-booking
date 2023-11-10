import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

interface CreditCardFormProps {
  totalAmount: number;
}

const CreditCardForm: React.FC<CreditCardFormProps> = ({ totalAmount }) => {
  const initialFormValue = {
    total: totalAmount || 0,
    firstName: "",
    lastName: "",
    address: "",
    cardNumber: "",
    exp: "",
    cvv: "",
  };
  const [formData, setFormData] = useState(initialFormValue);

  React.useEffect(() => {
    // Update the total field in formData whenever totalAmount changes
    setFormData((prevData) => ({ ...prevData, total: totalAmount || 0 }));
  }, [totalAmount]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange =
    (key: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prevData) => ({ ...prevData, [key]: e.target.value }));
    };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        {/* Total amount */}
        <Box display="flex" flexDirection="row" marginTop={1}>
          <Typography
            variant="h6"
            sx={{ marginRight: "auto" }}
            className="text-gray-600"
          >
            {`Total:`.toUpperCase()}
          </Typography>
          <Typography variant="h6" className="text-gray-600">
            ${totalAmount}
          </Typography>
        </Box>

        {/* First and Last Name */}
        <Box display="flex" flexDirection="row" marginTop={2}>
          <TextField
            placeholder="First Name"
            variant="outlined"
            sx={{ marginRight: 2 }}
            onChange={handleChange("firstName")}
            className="bg-white"
            size="small"
          />
          <TextField
            placeholder="Last Name"
            variant="outlined"
            onChange={handleChange("lastName")}
            className="bg-white"
            size="small"
          />
        </Box>

        {/* Address */}
        <TextField
          placeholder="Address"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleChange("address")}
          className="bg-white"
          size="small"
        />

        {/* Payment Details */}
        <Typography
          marginTop={2}
          marginBottom={1}
          className="text-gray-700 text-sm"
        >
          Payment Details
        </Typography>

        {/* Credit Card Number */}
        <TextField
          placeholder="Credit Card Number"
          variant="outlined"
          type="number"
          fullWidth
          sx={{ marginRight: 2 }}
          onChange={handleChange("cardNumber")}
          className="bg-white"
          size="small"
        />
        <Box display="flex" flexDirection="row" marginTop={1}>
          <TextField
            placeholder="Exp"
            variant="outlined"
            sx={{ marginRight: 2 }}
            onChange={handleChange("exp")}
            className="bg-white"
            size="small"
          />
          <TextField
            type="number"
            placeholder="CVV"
            variant="outlined"
            onChange={handleChange("cvv")}
            className="bg-white"
            size="small"
            inputProps={{
              maxLength: 3,
            }}
          />
        </Box>

        {/* Submit Button */}
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Get Tickets
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CreditCardForm;
