"use client";

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";

import EditCommissionPage from "./EditCommissionPage";

const initialServices = [
  {
    name: "AC Repair",
    commission: 15,
  },
  {
    name: "Plumbing",
    commission: 12,
  },
  {
    name: "Solar Cleaning",
    commission: 18,
  },
];

const ServiceCommissionTable = () => {
  const [services, setServices] = useState(initialServices);

  const [selectedService, setSelectedService] =
    useState<(typeof initialServices)[0] | null>(null);

  const [openModal, setOpenModal] = useState(false);

  const handleUpdateCommission = (
    newCommission: number
  ) => {
    setServices((prev) =>
      prev.map((service) =>
        service.name === selectedService?.name
          ? {
              ...service,
              commission: newCommission,
            }
          : service
      )
    );

    setOpenModal(false);
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{ border: "1px solid #e2e8f0", borderRadius: 3, overflow: "hidden" }}
      >
        <Box sx={{ p: 2.5, backgroundColor: "#059669", color: "#fff" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Service Commission Settings
          </Typography>
        </Box>

        <TableContainer>
          <Table size="small" sx={{ minWidth: 600 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f8fafc" }}>
                <TableCell sx={{ fontWeight: 700, fontSize: 12, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Service
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 12, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Commission Rate
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 12, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {services.map((service) => (
                <TableRow
                  key={service.name}
                  hover
                  sx={{
                    "&:last-child td": { borderBottom: 0 },
                    cursor: "default",
                  }}
                >
                  <TableCell sx={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>
                    {service.name}
                  </TableCell>
                  <TableCell sx={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>
                    {service.commission}%
                  </TableCell>
                  <TableCell align="center">
                    <button
                      onClick={() => {
                        setSelectedService(service);
                        setOpenModal(true);
                      }}
                      className="cursor-pointer text-emerald-600 hover:text-emerald-700 font-semibold text-xs transition-colors"
                    >
                      Edit
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <EditCommissionPage
        open={openModal}
        onClose={() => setOpenModal(false)}
        service={selectedService}
        onSave={handleUpdateCommission}
      />
    </>
  );
};

export default ServiceCommissionTable;