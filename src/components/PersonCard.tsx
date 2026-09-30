import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CakeIcon from "@mui/icons-material/Cake";
import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";
import CopyableTooltip from "../components/CopyableTooltip";

import type { IUser } from "../interfaces/IUser";

interface PersonCardProps {
  user: IUser;
  onClick?: () => void;
}

const emptySymbol = "-";

export default function PersonCard({ user, onClick }: PersonCardProps) {
  const formattedBirthday = user.birthday
    ? new Date(user.birthday).toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : emptySymbol;

  return (
    <Card
      sx={{ display: "flex", height: "100%", minWidth: 0 }}
      onClick={onClick}
    >
      <CardMedia
        component="img"
        sx={{
          width: 130,
          objectFit: "cover",
          flexShrink: 0,
          margin: 1,
          border: "1px solid #ccc",
          borderRadius: 2,
        }}
        image={user.avatarUrl || "/static/images/avatar/placeholder.jpg"}
        alt={user.name}
      />

      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justify: "space-between",
          minWidth: 0,
          p: 2,
        }}
      >
        <div>
          {/* Header */}
          <Stack
            direction="row"
            spacing={1}
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1.5,
            }}
          >
            <CopyableTooltip title={user.name} placement="top" copyable={false}>
              <Typography
                variant="h6"
                component="div"
                noWrap
                sx={{ fontWeight: 600 }}
              >
                {user.name}
              </Typography>
            </CopyableTooltip>

            <Chip
              label={user.status}
              color={user.status === "Aktiv" ? "success" : "default"}
              size="small"
              variant="outlined"
            />
          </Stack>

          {/* 2-Spalten Layout */}
          <Grid container spacing={1.5}>
            {/* Linke Spalte */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Stack spacing={0.8}>
                {
                  <CopyableTooltip
                    title={`Rolle: ${user.role}`}
                    textToCopy={user.role}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ alignItems: "center", color: "text.secondary" }}
                    >
                      <WorkIcon fontSize="small" color="action" />
                      <Typography variant="body2" noWrap>
                        {user.role ?? emptySymbol}
                      </Typography>
                    </Stack>
                  </CopyableTooltip>
                }

                {
                  <CopyableTooltip
                    title={`Abteilung: ${user.department}`}
                    textToCopy={user.department}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ alignItems: "center", color: "text.secondary" }}
                    >
                      <BusinessIcon fontSize="small" color="action" />
                      <Typography variant="body2" noWrap>
                        {user.department ?? emptySymbol}
                      </Typography>
                    </Stack>
                  </CopyableTooltip>
                }

                {
                  <CopyableTooltip
                    title={`Standort: ${user.location}`}
                    textToCopy={user.location}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ alignItems: "center", color: "text.secondary" }}
                    >
                      <LocationOnIcon fontSize="small" color="action" />
                      <Typography variant="body2" noWrap>
                        {user.location ?? emptySymbol}
                      </Typography>
                    </Stack>
                  </CopyableTooltip>
                }
              </Stack>
            </Grid>

            {/* Rechte Spalte */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Stack spacing={0.8}>
                {
                  <CopyableTooltip
                    title={`Geburtstag: ${formattedBirthday}`}
                    textToCopy={formattedBirthday}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ alignItems: "center", color: "text.secondary" }}
                    >
                      <CakeIcon fontSize="small" color="action" />
                      <Typography variant="body2" noWrap>
                        {formattedBirthday ?? emptySymbol}
                      </Typography>
                    </Stack>
                  </CopyableTooltip>
                }
                {
                  <CopyableTooltip
                    title={`E-Mail: ${user.email}`}
                    textToCopy={user.email}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ alignItems: "center", color: "text.secondary" }}
                    >
                      <EmailIcon fontSize="small" color="action" />
                      <Typography variant="body2" noWrap>
                        {user.email ?? emptySymbol}
                      </Typography>
                    </Stack>
                  </CopyableTooltip>
                }

                {
                  <CopyableTooltip
                    title={`Telefon: ${user.phone}`}
                    textToCopy={user.phone}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ alignItems: "center", color: "text.secondary" }}
                    >
                      <PhoneIcon fontSize="small" color="action" />
                      <Typography variant="body2" noWrap>
                        {user.phone ?? emptySymbol}
                      </Typography>
                    </Stack>
                  </CopyableTooltip>
                }
              </Stack>
            </Grid>
          </Grid>
        </div>
      </CardContent>
    </Card>
  );
}
