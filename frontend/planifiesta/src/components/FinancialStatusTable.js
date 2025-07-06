import React from "react";

const FinancialStatusTable = ({ status, onConsultAnotherDay }) => {
  if (!status) return null;
  const { total_cost, remaining_budget, contributions_history } = status;

  return (
    <div style={container}>
      <div style={summaryBox}>
        <h3 style={summaryTitle}>Estado Financiero</h3>
        <div style={summaryRow}>
          <span>Costo total acumulado:</span>
          <span style={summaryValue}>${total_cost?.toLocaleString() ?? 0}</span>
        </div>
        <div style={summaryRow}>
          <span>Presupuesto restante disponible:</span>
          <span style={summaryValue}>
            ${remaining_budget?.toLocaleString() ?? 0}
          </span>
        </div>
      </div>
      <table style={table}>
        <caption style={caption}>Historial de Aportes Aplicados</caption>
        <thead>
          <tr>
            <th style={th}>Día</th>
            <th style={th}>Monto</th>
          </tr>
        </thead>
        <tbody>
          {contributions_history.length === 0 ? (
            <tr>
              <td colSpan={2} style={emptyRow}>
                No hay aportes registrados hasta la fecha
              </td>
            </tr>
          ) : (
            contributions_history.map((c, idx) => (
              <tr key={idx}>
                <td style={td}>{c.day}</td>
                <td style={td}>${c.amount.toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <button style={consultBtn} onClick={onConsultAnotherDay}>
        Consultar otro día
      </button>
    </div>
  );
};

const container = {
  width: "100%",
  marginTop: 36,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
const summaryBox = {
  background: "#ffe082",
  borderRadius: 10,
  padding: "18px 28px 10px 28px",
  marginBottom: 18,
  boxShadow: "0 2px 8px rgba(63,81,181,0.08)",
  minWidth: 320,
  maxWidth: 420,
};
const summaryTitle = {
  color: "#3f51b5",
  fontWeight: 800,
  fontSize: 18,
  marginBottom: 10,
  textAlign: "center",
};
const summaryRow = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  fontSize: 15,
  marginBottom: 6,
  color: "#333",
  width: "100%",
  gap: 0,
};
const summaryValue = {
  fontWeight: 700,
  color: "#5e35b1",
  minWidth: 120,
  textAlign: "right",
  display: "inline-block",
  marginLeft: "auto",
};
const table = {
  width: "100%",
  maxWidth: 420,
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
  fontSize: 18,
  color: "#3f51b5",
  padding: 12,
  letterSpacing: 1,
};
const th = {
  borderBottom: "2.5px solid #a18cd1",
  padding: 12,
  textAlign: "left",
  background: "#ffe082",
  fontWeight: 700,
  fontSize: 15,
  color: "#3f51b5",
};
const td = {
  borderBottom: "1.5px solid #a18cd1",
  padding: 12,
  fontSize: 15,
  color: "#333",
  background: "#f3f0ff",
};
const emptyRow = {
  textAlign: "center",
  color: "#aaa",
  fontSize: 16,
  padding: 24,
  background: "#ffe082",
};
const consultBtn = {
  marginTop: 22,
  background: "#3f51b5",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  padding: "0.6rem 1.4rem",
  cursor: "pointer",
  fontWeight: 700,
  fontSize: 15,
  transition: "background 0.2s, color 0.2s",
  boxShadow: "0 2px 8px rgba(63,81,181,0.08)",
};

export default FinancialStatusTable;
