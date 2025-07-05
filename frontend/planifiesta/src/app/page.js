"use client";
import React, { useState, useEffect, useCallback } from "react";
import InvitationForm from "../components/InvitationForm";
import Header from "../components/Header";
import UserTable from "../components/UserTable";

export default function HomePage() {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(false);

  // Get users from API
  const fetchUsers = useCallback(() => {
    fetch("http://localhost:8000/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers, reload]);

  useEffect(() => {
    const handler = () => setShowForm(true);
    window.addEventListener("openInvitationForm", handler);
    return () => window.removeEventListener("openInvitationForm", handler);
  }, []);

  // Reloads the table when creating a user
  const handleUserCreated = () => setReload((r) => !r);

  // Accept/reject action (API call)
  const handleAction = (userId, accepted) => {
    fetch(`http://localhost:8000/users/${userId}/invitation_state`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_invitation_state: accepted }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error actualizando usuario");
        return res.json();
      })
      .then(() => setReload((r) => !r))
      .catch((err) => alert(err.message));
  };

  return (
    <main>
      <Header />
      <InvitationForm
        open={showForm}
        onClose={() => setShowForm(false)}
        onUserCreated={handleUserCreated}
      />
      <UserTable users={users} onAction={handleAction} />
    </main>
  );
}
