import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  Avatar,
  Paper,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

import type { IUser } from "../interfaces/IUser";
import { useNavigate } from "react-router-dom";

// 1. Saubere Prop-Spezifikation für die gesamte Komponente
interface CreateUserProps {
  onAddOrEditUser?: (user: IUser) => void;
  editingUserId: string | number | null;
  users: IUser[];
}

const defaultNewUser: IUser = {
  id: "",
  name: "",
  role: "",
  department: "",
  email: "",
  phone: "",
  avatarUrl: "",
  status: "Aktiv" as "Aktiv" | "Inaktiv",
};

export default function CreateUser({
  onAddOrEditUser,
  editingUserId,
  users,
}: CreateUserProps) {
  // State für das Formular
  const [selectedUser, setSelectedUser] = useState<IUser>(() => {
    if (editingUserId) {
      return users.find((u) => u.id === editingUserId) ?? defaultNewUser;
    }
    return defaultNewUser;
  });

  const navigate = useNavigate();

  // Zufälliges Profilbild generieren
  const handleGenerateRandomAvatar = () => {
    const randomId = Math.floor(Math.random() * 1000);
    setSelectedUser((prev) => ({
      ...prev,
      avatarUrl: `https://picsum.photos/seed/${randomId}/200/200`,
    }));
  };

  // Formularfelder aktualisieren
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Formular absenden
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedUser.name.trim()) {
      alert("Bitte einen Namen eingeben!");
      return;
    }

    const newUser: IUser = {
      // Wenn wir bearbeiten, behalten wir die bestehende ID, sonst neue UUID
      id: selectedUser.id || crypto.randomUUID(),
      name: selectedUser.name,
      role: selectedUser.role || undefined,
      department: selectedUser.department || undefined,
      email: selectedUser.email || undefined,
      phone: selectedUser.phone || undefined,
      location: selectedUser.location || undefined,
      birthday: selectedUser.birthday
        ? new Date(selectedUser.birthday)
        : undefined,
      avatarUrl:
        selectedUser.avatarUrl ||
        `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/200/200`,
      status: selectedUser.status,
    };

    if (onAddOrEditUser) {
      onAddOrEditUser(newUser);
      navigate("/");
    }

    // Formular nach dem Absenden zurücksetzen
    setSelectedUser(defaultNewUser);
  };

  return (
    <Card sx={{ maxWidth: 800, margin: "0 auto", mt: 2 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 600, mb: 3 }}
        >
          {editingUserId ? "Benutzer bearbeiten" : "Neuen Benutzer anlegen"}
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Bild-Sektion mit Vorschau */}
            <Grid size={{ xs: 12 }}>
              <Paper
                variant="outlined"
                sx={{ p: 2, bgcolor: "background.default" }}
              >
                <Typography variant="subtitle2" gutterBottom>
                  Profilbild
                </Typography>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  sx={{ alignItems: "center" }}
                >
                  <Avatar
                    src={selectedUser.avatarUrl}
                    alt="Vorschau"
                    sx={{ width: 70, height: 70 }}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    label="Bild-URL"
                    name="avatarUrl"
                    value={selectedUser.avatarUrl ?? ""}
                    onChange={handleChange}
                    placeholder="https://example.com/avatar.jpg"
                  />
                  <Button
                    type="button"
                    variant="outlined"
                    startIcon={
                      <AutoFixHighIcon
                        sx={{
                          fontSize: { xs: "0.5rem", sm: "1rem" },
                        }}
                      />
                    }
                    onClick={handleGenerateRandomAvatar}
                    sx={{
                      whiteSpace: "nowrap",
                      minWidth: "fit-content",
                      fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    }}
                  >
                    Zufallsbild
                  </Button>
                </Stack>
              </Paper>
            </Grid>

            {/* Pflichtfeld: Name */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                required
                fullWidth
                label="Vollständiger Name"
                name="name"
                value={selectedUser.name ?? ""}
                onChange={handleChange}
              />
            </Grid>

            {/* Status */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Status</FormLabel>
                <RadioGroup
                  row
                  name="status"
                  value={selectedUser.status ?? "Aktiv"}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="Aktiv"
                    control={<Radio color="success" />}
                    label="Aktiv"
                  />
                  <FormControlLabel
                    value="Inaktiv"
                    control={<Radio color="default" />}
                    label="Inaktiv"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* Rolle & Abteilung */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Rolle / Position"
                name="role"
                value={selectedUser.role ?? ""}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Abteilung"
                name="department"
                value={selectedUser.department ?? ""}
                onChange={handleChange}
              />
            </Grid>

            {/* Kontakt: E-Mail & Telefon */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type="email"
                label="E-Mail"
                name="email"
                value={selectedUser.email ?? ""}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Telefon"
                name="phone"
                value={selectedUser.phone ?? ""}
                onChange={handleChange}
              />
            </Grid>

            {/* Standort & Geburtstag */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Standort"
                name="location"
                value={selectedUser.location ?? ""}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="Geburtsdatum"
                name="birthday"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                value={selectedUser.birthday ?? ""}
                onChange={handleChange}
              />
            </Grid>

            {/* Submit Button */}
            <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<PersonAddIcon />}
                fullWidth
              >
                {selectedUser ? "Änderungen speichern" : "Benutzer erstellen"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}
