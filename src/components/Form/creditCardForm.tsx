import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

interface CreditCardFormProps {
  totalAmount: number;
}

const CreditCardForm: React.FC<CreditCardFormProps> = ({ totalAmount }) => {
  const validationSchema = yup.object().shape({
    total: yup.number().required(),
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    address: yup.string().required("Address is required"),
    cardNumber: yup
      .string()
      .required("Credit Card Number is required")
      .matches(/^\d{16}$/, "Must be 16 digits"),
    exp: yup
      .string()
      .required("Expiration Date is required")
      .matches(/^\d{2}\/\d{2}$/, "Must be in MM/YY format"),
    cvv: yup
      .string()
      .required("CVV is required")
      .matches(/^\d{3}$/, "Must be 3 digits"),
  });

  const formik = useFormik({
    initialValues: {
      total: totalAmount || 0,
      firstName: "",
      lastName: "",
      address: "",
      cardNumber: "",
      exp: "",
      cvv: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      console.log(values);
    },
  });

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
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
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            name="firstName"
            className="bg-white"
            size="small"
            error={formik.touched.firstName && !!formik.errors.firstName}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            placeholder="Last Name"
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            name="lastName"
            className="bg-white"
            size="small"
            error={formik.touched.lastName && !!formik.errors.lastName}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </Box>

        {/* Address */}
        <TextField
          placeholder="Address"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.address}
          name="address"
          className="bg-white"
          size="small"
          error={formik.touched.address && !!formik.errors.address}
          helperText={formik.touched.address && formik.errors.address}
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
          onChange={(e) => {
            const input = e.target.value.replace(/\s/g, "").substr(0, 19);
            const formattedValue = input.replace(/(\d{4})/g, "$1 ").trim();
            formik.setFieldValue("cardNumber", input);
            e.target.value = formattedValue;
          }}
          onBlur={(e) => {
            formik.setFieldValue(
              "cardNumber",
              e.target.value.replace(/\s/g, "")
            );
          }}
          value={formik.values.cardNumber}
          name="cardNumber"
          error={formik.touched.cardNumber && !!formik.errors.cardNumber}
          helperText={formik.touched.cardNumber && formik.errors.cardNumber}
          className="bg-white"
          size="small"
          inputProps={{
            maxLength: 16,
          }}
        />

        <Box display="flex" flexDirection="row" marginTop={1}>
          <TextField
            type="text"
            placeholder="Exp (MM/YY)"
            variant="outlined"
            onChange={(e) => {
              const input = e.target.value.replace(/\D/g, ""); // Remove non-digits
              if (input.length <= 2) {
                formik.setFieldValue("exp", input);
              } else if (input.length <= 4) {
                const month = input.slice(0, 2);
                if (Number(month) >= 1 && Number(month) <= 12) {
                  formik.setFieldValue("exp", `${month}/${input.slice(2)}`);
                }
              }
            }}
            onBlur={formik.handleBlur}
            value={formik.values.exp}
            name="exp"
            error={formik.touched.exp && !!formik.errors.exp}
            helperText={formik.touched.exp && formik.errors.exp}
            className="bg-white"
            size="small"
            sx={{ marginRight: 2 }}
            inputProps={{
              maxLength: 5,
            }}
          />
          <TextField
            placeholder="CVV"
            variant="outlined"
            {...formik.getFieldProps("cvv")}
            error={formik.touched.cvv && !!formik.errors.cvv}
            helperText={formik.touched.cvv && formik.errors.cvv}
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
