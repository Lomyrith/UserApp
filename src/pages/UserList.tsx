import { Typography, Grid } from "@mui/material";
import PersonCard from "../components/PersonCard";
import type { IUser } from "../interfaces/IUser";
import { useNavigate } from "react-router-dom";

// 1. UserList bekommt onEditUser von App.tsx übergeben
export default function UserList({
  users,
  onEditUser,
  onDeleteUser,
}: {
  users: IUser[];
  onEditUser: (id: string | number) => void;
  onDeleteUser: (id: string | number | null) => void;
}) {
  const navigate = useNavigate(); // Funktioniert hier problemlos!

  const handleEditAndNavigate = (id: string | number) => {
    onEditUser(id); // 1. Ruft handleEditUser in App.tsx auf
    navigate("/create"); // 2. Navigiert zur Formular-Seite
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Personenübersicht
      </Typography>
      <UserListContent
        users={users}
        onEditUser={handleEditAndNavigate}
        onDeleteUser={onDeleteUser}
      />
    </div>
  );
}

function UserListContent({
  users,
  onEditUser,
  onDeleteUser,
}: {
  users: IUser[];
  onEditUser: (id: string | number) => void;
  onDeleteUser: (id: string | number | null) => void;
}) {
  return (
    <Grid container spacing={2}>
      {users.map((user) => (
        <Grid key={user.id} sx={{ width: { xs: "100%", lg: "49%" } }}>
          <PersonCard
            user={user}
            onClick={() => onEditUser(user.id)}
            onDeleteUser={() => onDeleteUser(user.id)}
          />
        </Grid>
      ))}
    </Grid>
  );
}
