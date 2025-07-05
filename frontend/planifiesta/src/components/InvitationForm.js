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
        <h2>Crear Invitación</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" {...register("user_id")} />
          <input type="hidden" {...register("user_invitation_state")} />

          <div style={styles.field}>
            <label>Evento</label>
            {loading ? (
              <span>Cargando eventos...</span>
            ) : error ? (
              <span style={styles.error}>Error al cargar eventos</span>
            ) : (
              <select {...register("event_id", { required: true })}>
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
            <label>Nombre del usuario</label>
            <input
              type="text"
              maxLength={100}
              {...register("user_name", { required: true, maxLength: 100 })}
            />
            {errors.user_name && (
              <span style={styles.error}>Nombre del usuario requerido</span>
            )}
          </div>

          <div style={styles.field}>
            <label>Descripción de la invitación</label>
            <input
              type="text"
              maxLength={200}
              {...register("user_invitation_description", {
                required: true,
                maxLength: 200,
              })}
            />
            {errors.user_invitation_description && (
              <span style={styles.error}>
                Descripción de la invitación requerida
              </span>
            )}
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
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
    background: "rgba(0,0,0,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2000,
  },
  modal: {
    background: "#fff",
    borderRadius: 8,
    padding: 32,
    minWidth: 350,
    boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
  },
  field: {
    marginBottom: 18,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  error: {
    color: "#d32f2f",
    fontSize: 13,
  },
  cancel: {
    background: "#eee",
    border: "none",
    borderRadius: 4,
    padding: "0.5rem 1.2rem",
    cursor: "pointer",
  },
  submit: {
    background: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    padding: "0.5rem 1.2rem",
    cursor: "pointer",
  },
};

export default InvitationForm;
