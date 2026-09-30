import { createBrowserRouter, RouterProvider } from "react-router";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Layout from "./Layout";
import UserList from "./pages/UserList";
import CreateUser from "./pages/CreateUser";
import type { IUser } from "./interfaces/IUser";
import { useState } from "react";

const storageKey = "personal-data";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
  },
});

function getStoredUser(): IUser[] | null {
  const storedUser = localStorage.getItem(storageKey);
  if (!storedUser) {
    return null;
  }

  const users: IUser[] = JSON.parse(storedUser);
  return users;
}

export default function App() {
  const [users, setUsers] = useState<IUser[]>(() => {
    const stored = getStoredUser();
    return stored ? stored : [];
  });

  const [editingUserId, setEditingUserId] = useState<string | number | null>(
    null,
  );

  function handleAddOrEditUser(user: IUser) {
    const userExists = users.some((u) => u.id === user.id);

    const updatedUsers = userExists
      ? users.map((u) => (u.id === user.id ? user : u))
      : [...users, user];
    localStorage.setItem(storageKey, JSON.stringify(updatedUsers));
    console.log("User hinzugefügt:", user);
    setUsers(updatedUsers);

    setEditingUserId(null);
  }

  const handleEditUser = (id: string | number) => {
    setEditingUserId(id);
  };

  const onDeleteUser = (id: string | number | null) => {
    if (!id) return;

    const updatedUsers = users.filter((u) => u.id !== id);
    localStorage.setItem(storageKey, JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    console.log("User gelöscht:", id);
  };

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            index: true,
            element: (
              <UserList
                users={users}
                onEditUser={handleEditUser}
                onDeleteUser={onDeleteUser}
              />
            ),
          },
          {
            path: "create",
            element: (
              <CreateUser
                key={editingUserId ?? "new"}
                onAddOrEditUser={handleAddOrEditUser}
                editingUserId={editingUserId}
                users={users}
              />
            ),
          },
        ],
      },
    ],
    { basename: import.meta.env.BASE_URL },
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Sorgt für einheitliche CSS-Basics */}
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
