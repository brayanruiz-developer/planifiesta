import React, { useState } from "react";
import { useForm } from "react-hook-form";

const FinancialStatusForm = ({ onResult }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
  } = useForm({
    defaultValues: { day: "" },
  });

  const dayValue = watch("day");
  const isDayValid = Number(dayValue) >= 1 && Number(dayValue) <= 60;

  const onSubmit = async ({ day }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:8000/budget-status/${day}`);
      if (!res.ok) throw new Error("Error al consultar estado financiero");
      const data = await res.json();
      if (onResult) onResult(data);
    } catch (e) {
      setError(e.message);
      if (onResult) onResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.modal}>
      <h2 style={styles.title}>Consultar Estado Financiero</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: 18 }}
      >
        <div style={styles.field}>
          <label style={styles.label}>Día</label>
          <input
            type="number"
            min={1}
            max={60}
            placeholder="Introduce un día entre 1 al 60"
            {...register("day", {
              required: true,
              min: 1,
              max: 60,
              valueAsNumber: true,
            })}
            style={styles.input}
          />
        </div>
        {error && <span style={styles.error}>{error}</span>}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
          <button
            type="button"
            onClick={() => {
              reset();
              setError(null);
              if (onResult) onResult(null);
            }}
            style={styles.cancel}
          >
            Limpiar
          </button>
          <button
            type="submit"
            style={{
              ...styles.submit,
              ...(!isDayValid || loading ? styles.submitDisabled : {}),
            }}
            disabled={!isDayValid || loading}
          >
            {loading ? "Consultando..." : "Consultar"}
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  modal: {
    background: "#f3f0ff",
    borderRadius: 14,
    padding: 36,
    minWidth: 370,
    boxShadow: "0 4px 24px rgba(63,81,181,0.10)",
    border: "2px solid #a18cd1",
    maxWidth: 420,
  },
  title: {
    margin: 0,
    marginBottom: 18,
    fontSize: "1.7rem",
    fontWeight: 800,
    color: "#3f51b5",
    textAlign: "center",
    letterSpacing: 1,
  },
  field: {
    marginBottom: 0,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  label: {
    fontWeight: 600,
    color: "#3f51b5",
    marginBottom: 2,
    fontSize: 15,
  },
  input: {
    border: "1.5px solid #a18cd1",
    borderRadius: 6,
    padding: "0.5rem 0.8rem",
    fontSize: 15,
    outline: "none",
    marginBottom: 2,
    background: "#fff",
    color: "#222",
    transition: "border 0.2s",
  },
  error: {
    color: "#5e35b1",
    fontSize: 13,
    marginTop: 2,
  },
  cancel: {
    background: "#eee",
    border: "none",
    borderRadius: 6,
    padding: "0.6rem 1.4rem",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 15,
    color: "#3f51b5",
    transition: "background 0.2s, color 0.2s",
  },
  submit: {
    background: "#3f51b5",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "0.6rem 1.4rem",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 15,
    transition: "background 0.2s, color 0.2s, opacity 0.2s",
    boxShadow: "0 2px 8px rgba(63,81,181,0.08)",
  },
  submitDisabled: {
    opacity: 0.5,
    cursor: "not-allowed",
    background: "#bdbdbd",
    color: "#fff",
  },
};

export default FinancialStatusForm;
