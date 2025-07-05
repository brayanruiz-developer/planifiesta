import React from "react";

const Header = () => {
  const handleCreateInvitation = () => {
    const event = new CustomEvent("openInvitationForm");
    window.dispatchEvent(event);
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        borderBottom: "1px solid #eaeaea",
        background: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <h1 style={{ margin: 0, fontSize: "2rem", fontWeight: 700 }}>
        Planifiesta
      </h1>
      <button
        type="button"
        onClick={handleCreateInvitation}
        style={{
          padding: "0.5rem 1.5rem",
          fontSize: "1rem",
          fontWeight: 600,
          background: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          transition: "background 0.2s",
        }}
      >
        Crear Invitación
      </button>
    </header>
  );
};

export default Header;
