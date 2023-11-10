import React from "react";
import BandForm from "./BandForm";
import { Box } from "@mui/material";
import kpopBand from "../../api/band-json/kpop-band.json";

interface TicketTypeProps {
  onTotalAmountChange: (totalAmount: number) => void;
}

export const TicketType: React.FC<TicketTypeProps> = ({
  onTotalAmountChange,
}) => {
  return (
    <Box>
      <BandForm band={kpopBand} onTotalAmountChange={onTotalAmountChange} />
    </Box>
  );
};
