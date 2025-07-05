import React from "react";

const UserTable = ({ users, onAction }) => {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 32 }}>
      <thead>
        <tr>
          <th style={th}>Nombre</th>
          <th style={th}>Descripción de la invitación</th>
          <th style={th}>Evento</th>
          <th style={th}>Invitación</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.user_id}>
            <td style={td}>{user.user_name}</td>
            <td style={td}>{user.user_invitation_description}</td>
            <td style={td}>{user.event_name || "-"}</td>
            <td style={td}>
              {user.user_invitation_state === null ? (
                <>
                  <button
                    style={btnAccept}
                    onClick={() => onAction(user.user_id, true)}
                  >
                    Aceptar
                  </button>
                  <button
                    style={btnReject}
                    onClick={() => onAction(user.user_id, false)}
                  >
                    Rechazar
                  </button>
                </>
              ) : user.user_invitation_state ? (
                <span style={{ color: "#388e3c", fontWeight: 600 }}>
                  Aceptada
                </span>
              ) : (
                <span style={{ color: "#d32f2f", fontWeight: 600 }}>
                  Rechazada
                </span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const th = {
  borderBottom: "2px solid #eaeaea",
  padding: 12,
  textAlign: "left",
  background: "#fafafa",
};
const td = {
  borderBottom: "1px solid #eaeaea",
  padding: 12,
};
const btnAccept = {
  background: "#0070f3",
  color: "#fff",
  border: "none",
  borderRadius: 4,
  padding: "0.3rem 1rem",
  marginRight: 8,
  cursor: "pointer",
};
const btnReject = {
  background: "#d32f2f",
  color: "#fff",
  border: "none",
  borderRadius: 4,
  padding: "0.3rem 1rem",
  cursor: "pointer",
};

export default UserTable;
