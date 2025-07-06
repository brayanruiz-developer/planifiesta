"use client";
import React, { useState, useEffect, useCallback } from "react";
import InvitationForm from "../components/InvitationForm";
import Header from "../components/Header";
import UserTable from "../components/UserTable";
import FinancialStatusForm from "../components/FinancialStatusForm";
import FinancialStatusTable from "../components/FinancialStatusTable";

export default function HomePage() {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(false);
  const [financialStatus, setFinancialStatus] = useState(null);
  const [showFinancialForm, setShowFinancialForm] = useState(true);

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
      <div style={styles.splitContainer}>
        <div style={styles.leftPanel}>
          <UserTable users={users} onAction={handleAction} />
        </div>
        <div style={styles.rightPanel}>
          {showFinancialForm ? (
            <FinancialStatusForm
              onResult={(data) => {
                if (data) {
                  setFinancialStatus(data);
                  setShowFinancialForm(false);
                } else {
                  setFinancialStatus(null);
                }
              }}
            />
          ) : (
            <FinancialStatusTable
              status={financialStatus}
              onConsultAnotherDay={() => {
                setShowFinancialForm(true);
                setFinancialStatus(null);
              }}
            />
          )}
        </div>
      </div>
    </main>
  );
}

const styles = {
  splitContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 32,
    alignItems: "flex-start",
    justifyContent: "center",
    width: "100%",
    marginTop: 24,
    flexWrap: "wrap",
  },
  leftPanel: {
    flex: 1,
    minWidth: 350,
    maxWidth: 800,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  rightPanel: {
    flex: 1,
    minWidth: 370,
    maxWidth: 420,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 18,
  },
};
