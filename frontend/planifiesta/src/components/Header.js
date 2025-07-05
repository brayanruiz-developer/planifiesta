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
        padding: "1.5rem 2.5rem",
        borderBottom: "1px solid #eaeaea",
        background: "linear-gradient(90deg, #e0c3fc 0%, #8ec5fc 100%)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        minHeight: 90,
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffe082' fill-opacity='0.18'%3E%3Ccircle cx='20' cy='20' r='8'/%3E%3Ccircle cx='80' cy='40' r='6'/%3E%3Ccircle cx='60' cy='70' r='5'/%3E%3Ccircle cx='120' cy='30' r='7'/%3E%3Ccircle cx='200' cy='60' r='8'/%3E%3C/g%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <span
          style={{
            fontSize: 36,
            marginRight: 10,
            color: "#ffe082",
            filter: "drop-shadow(0 1px 0 #fff)",
          }}
        >
          🎉
        </span>
        <h1
          style={{
            margin: 0,
            fontSize: "2.3rem",
            fontWeight: 800,
            letterSpacing: 1,
            color: "#3f51b5",
            textShadow: "0 2px 8px #fff8, 0 1px 0 #fff",
          }}
        >
          Planifiesta
        </h1>
      </div>
      <button
        type="button"
        onClick={handleCreateInvitation}
        style={{
          padding: "0.7rem 2rem",
          fontSize: "1.1rem",
          fontWeight: 700,
          background: "#3f51b5",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(63,81,181,0.08)",
          transition: "background 0.2s, transform 0.1s",
          outline: "none",
        }}
        onMouseOver={(e) => (e.currentTarget.style.background = "#ffe082")}
        onFocus={(e) => (e.currentTarget.style.background = "#ffe082")}
        onMouseOut={(e) => (e.currentTarget.style.background = "#3f51b5")}
        onBlur={(e) => (e.currentTarget.style.background = "#3f51b5")}
      >
        <span>➕</span> Crear Invitación
      </button>
    </header>
  );
};

export default Header;
