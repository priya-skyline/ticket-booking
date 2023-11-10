import React from "react";
import { Paper, Grid, Box, Typography, useMediaQuery } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PlaceIcon from "@mui/icons-material/Place";
import parse from "html-react-parser";

import { TicketType } from "./TicketType";
import {
  UnixTimestampToDate,
  convertCentsToDollars,
} from "../../util/function";

import kpopBand from "../../api/band-json/kpop-band.json";
import CreditCardForm from "./creditCardForm";

const Form: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [totalAmount, setTotalAmount] = React.useState<number>(0);
  const handleTotalAmountChange = (newTotalAmount: number) => {
    setTotalAmount(newTotalAmount);
  };

  return (
    <Box width={isMobile ? "100%" : "50%"} margin="0 auto">
      <Paper elevation={3} className="p-12 justify-center items-center">
        <Box>
          <Typography
            variant="h4"
            gutterBottom
            className="text-gray-600"
            style={{ fontWeight: 600 }}
          >
            {kpopBand.name}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <CalendarMonthIcon className="text-gray-500" />
          <Typography variant="body1" className="text-gray-400">
            {UnixTimestampToDate(kpopBand.date)}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" className="pt-3">
          <PlaceIcon className="text-gray-500" />
          <Typography variant="body1" className="text-gray-400">
            {kpopBand.location}
          </Typography>
        </Box>

        <Box className="mt-6">
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={12} lg={5} p={2}>
              <Box>
                <Box className="h-56 overflow-hidden flex justify-center items-center rounded-md">
                  <img
                    alt="Profile"
                    src={kpopBand.imgUrl}
                    className="object-cover"
                  />
                </Box>
                <Box>
                  <Typography
                    variant="body1"
                    mt={2}
                    gutterBottom
                    className="text-gray-600"
                  >
                    {parse(kpopBand.description_blurb)}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={7} p={2}>
              <Box
                className="pt-6 pl-10 pr-10 pb-6 rounded-md"
                style={{ background: "#f7f8fa" }}
              >
                <Typography
                  variant="h5"
                  className="text-gray-700"
                  style={{ fontWeight: 600 }}
                >
                  Select Tickets
                </Typography>
                {/* render each ticket type */}
                <TicketType onTotalAmountChange={handleTotalAmountChange} />

                <CreditCardForm
                  totalAmount={convertCentsToDollars(totalAmount)}
                />
              </Box>
              <Box></Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default Form;
