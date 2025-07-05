"use client";
import React, { useState, useEffect } from "react";
import InvitationForm from "../components/InvitationForm";
import Header from "../components/Header";

export default function HomePage() {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const handler = () => setShowForm(true);
    window.addEventListener("openInvitationForm", handler);
    return () => window.removeEventListener("openInvitationForm", handler);
  }, []);

  return (
    <main>
      <Header />
      <InvitationForm open={showForm} onClose={() => setShowForm(false)} />
    </main>
  );
}
