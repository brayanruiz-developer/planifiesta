import React from "react";

const UserTable = ({ users, onAction }) => {
  return (
    <div style={container}>
      <table style={table}>
        <caption style={caption}>Invitados y Estado de Invitación</caption>
        <thead>
          <tr>
            <th style={th}>Nombre</th>
            <th style={th}>Descripción de la invitación</th>
            <th style={th}>Evento</th>
            <th style={th}>Invitación</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={4} style={emptyRow}>
                No hay usuarios invitados aún
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.user_id}>
                <td style={td}>{user.user_name}</td>
                <td style={td}>{user.user_invitation_description}</td>
                <td style={td}>{user.event_name || "-"}</td>
                <td style={td}>
                  {user.user_invitation_state === null ? (
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        style={btnAccept}
                        onClick={() => onAction(user.user_id, true)}
                      >
                        <span>
                          ✅
                        </span>{" "}
                        Aceptar
                      </button>
                      <button
                        style={btnReject}
                        onClick={() => onAction(user.user_id, false)}
                      >
                        <span>
                          ❌
                        </span>{" "}
                        Rechazar
                      </button>
                    </div>
                  ) : user.user_invitation_state ? (
                    <span style={accepted}>
                      <span>
                        🎉
                      </span>{" "}
                      Aceptada
                    </span>
                  ) : (
                    <span style={rejected}>
                      <span>
                        😞
                      </span>{" "}
                      Rechazada
                    </span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

const container = {
  width: "100%",
  marginTop: 36,
  display: "flex",
  justifyContent: "center",
};
const table = {
  width: "100%",
  maxWidth: 900,
  borderCollapse: "separate",
  borderSpacing: 0,
  background: "#f3f0ff",
  borderRadius: 12,
  boxShadow: "0 2px 16px rgba(63,81,181,0.07)",
  overflow: "hidden",
};
const caption = {
  captionSide: "top",
  fontWeight: 700,
  fontSize: 20,
  color: "#3f51b5",
  padding: 16,
  letterSpacing: 1,
};
const th = {
  borderBottom: "2.5px solid #a18cd1",
  padding: 14,
  textAlign: "left",
  background: "#ffe082",
  fontWeight: 700,
  fontSize: 16,
  color: "#3f51b5",
};
const td = {
  borderBottom: "1.5px solid #a18cd1",
  padding: 14,
  fontSize: 15,
  color: "#333",
  background: "#f3f0ff",
};
const emptyRow = {
  textAlign: "center",
  color: "#aaa",
  fontSize: 17,
  padding: 32,
  background: "#ffe082",
};
const btnAccept = {
  background: "#3f51b5",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  padding: "0.5rem 1.2rem",
  fontWeight: 700,
  fontSize: 15,
  cursor: "pointer",
  transition: "background 0.2s, transform 0.1s",
  outline: "none",
  boxShadow: "0 2px 8px rgba(63,81,181,0.08)",
  display: "flex",
  alignItems: "center",
  gap: 6,
};
const btnReject = {
  background: "#eee",
  color: "#3f51b5",
  border: "none",
  borderRadius: 6,
  padding: "0.5rem 1.2rem",
  fontWeight: 700,
  fontSize: 15,
  cursor: "pointer",
  transition: "background 0.2s, color 0.2s, transform 0.1s",
  outline: "none",
  boxShadow: "0 2px 8px rgba(161,140,209,0.04)",
  display: "flex",
  alignItems: "center",
  gap: 6,
};
const accepted = {
  color: "#3f51b5",
  fontWeight: 700,
  fontSize: 15,
  display: "flex",
  alignItems: "center",
  gap: 6,
  background: "#ffe082",
  borderRadius: 4,
  padding: "2px 10px",
};
const rejected = {
  color: "#a18cd1",
  fontWeight: 700,
  fontSize: 15,
  display: "flex",
  alignItems: "center",
  gap: 6,
  background: "#eee",
  borderRadius: 4,
  padding: "2px 10px",
};

export default UserTable;
