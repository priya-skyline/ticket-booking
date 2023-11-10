import React, { useState } from "react";
import { Grid, Box, Typography, Divider } from "@mui/material";
import AmountInput from "./Amount";
import { convertCentsToDollars } from "../../util/function";

interface TicketType {
  name: string;
  description: string;
  cost: number;
}

interface Band {
  name: string;
  ticketTypes: TicketType[];
}

interface BandFormProps {
  band: Band;
  onTotalAmountChange: (totalAmount: number) => void;
}

const BandForm: React.FC<BandFormProps> = ({ band, onTotalAmountChange }) => {
  const [amounts, setAmounts] = useState<number[]>(
    Array(band.ticketTypes.length).fill(0)
  );

  const handleAmountChange = (index: number, newAmount: number) => {
    setAmounts((prevAmounts) => {
      const newAmounts = [...prevAmounts];
      newAmounts[index] = newAmount;
      return newAmounts;
    });
  };

  const totalAmount = band.ticketTypes.reduce((total, ticket, index) => {
    return total + amounts[index] * ticket.cost;
  }, 0);

  // Notify the parent component about the total amount change
  React.useEffect(() => {
    onTotalAmountChange(totalAmount);
  }, [totalAmount, onTotalAmountChange]);

  return (
    <Box>
      <Box>
        {band.ticketTypes.map((ticket, index) => (
          <React.Fragment key={ticket.name}>
            <Grid container spacing={2} mb={2}>
              <Grid item xs={9}>
                <Box>
                  <Typography pt={2} variant="h6" className="text-gray-500">
                    {ticket.name.toUpperCase()}
                  </Typography>
                  <Typography pt={2} variant="body2" className="text-gray-400">
                    {ticket.description}
                  </Typography>
                  <Typography pt={2} className="text-gray-500">
                    ${convertCentsToDollars(ticket.cost)}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={3}>
                <Box pt={2}>
                  <AmountInput
                    onChange={(newAmount) =>
                      handleAmountChange(index, newAmount)
                    }
                  />
                </Box>
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default BandForm;
