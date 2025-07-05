import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const fetchEvents = async () => {
  const res = await fetch("http://localhost:8000/events");
  if (!res.ok) throw new Error("Error al obtener eventos");
  return res.json();
};

const createUser = async (data) => {
  const res = await fetch("http://localhost:8000/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear usuario");
  return res.json();
};

const InvitationForm = ({ open, onClose, onUserCreated }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      user_id: 0,
      user_name: "",
      user_invitation_description: "",
      user_invitation_state: null,
      event_id: "",
    },
  });

  useEffect(() => {
    if (open) {
      setLoading(true);
      fetchEvents()
        .then(setEvents)
        .catch(setError)
        .finally(() => setLoading(false));
    }
  }, [open]);

  const onSubmit = async (data) => {
    try {
      await createUser(data);
      console.log("Invitación creada con éxito");
      reset();
      onClose();
      if (onUserCreated) onUserCreated();
    } catch (e) {
      console.log("Error al crear la invitación");
    }
  };

  if (!open) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>Crear Invitación</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column", gap: 18 }}
        >
          <input type="hidden" {...register("user_id")} />
          <input type="hidden" {...register("user_invitation_state")} />

          <div style={styles.field}>
            <label style={styles.label}>Evento</label>
            {loading ? (
              <span>Cargando eventos...</span>
            ) : error ? (
              <span style={styles.error}>Error al cargar eventos</span>
            ) : (
              <select
                {...register("event_id", { required: true })}
                style={styles.input}
              >
                <option value="">Seleccione un evento</option>
                {events.map((event) => (
                  <option key={event.event_id} value={event.event_id}>
                    {event.event_name}
                  </option>
                ))}
              </select>
            )}
            {errors.event_id && (
              <span style={styles.error}>Debe seleccionar un evento</span>
            )}
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Nombre del usuario</label>
            <input
              type="text"
              maxLength={100}
              {...register("user_name", { required: true, maxLength: 100 })}
              style={styles.input}
            />
            {errors.user_name && (
              <span style={styles.error}>Nombre del usuario requerido</span>
            )}
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Descripción de la invitación</label>
            <input
              type="text"
              maxLength={200}
              {...register("user_invitation_description", {
                required: true,
                maxLength: 200,
              })}
              style={styles.input}
            />
            {errors.user_invitation_description && (
              <span style={styles.error}>
                Descripción de la invitación requerida
              </span>
            )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 12,
              marginTop: 8,
            }}
          >
            <button
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
              style={styles.cancel}
            >
              Cancelar
            </button>
            <button type="submit" style={styles.submit}>
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(163, 148, 255, 0.18)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2000,
    backdropFilter: "blur(2px)",
  },
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
    transition: "background 0.2s, color 0.2s",
    boxShadow: "0 2px 8px rgba(63,81,181,0.08)",
  },
};

export default InvitationForm;
