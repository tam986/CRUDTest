import React, { useState } from "react";

export default function AddForm({ onSubmit, onClose }) {
  const [ten, setTen] = useState("");
  const [email, setEmail] = useState("");
  const [vaitro, setVaitro] = useState("");
  const [closeButton, setCloseButton] = useState(false);
  const handleSubmit = (e) => {
    setTen(e.target.value);
    setEmail(e.target.value);
    setVaitro(e.target.value);
    e.preventDefault();
    onSubmit({ ten, email, vaitro });
  };

  return (
    <>
      <fieldset
        onSubmit={handleSubmit}
        className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 absolute mt-4 top-2/2 left-2/4 -translate-x-1/2 -translate-y-1/2 z-1000 shadow-lg"
      >
        <label className="flex justify-between items-center mb-4">
          <legend className="fieldset-legend">Thêm nhân viên</legend>
          <button onClick={onClose}>X</button>
        </label>

        <label className="label">Tên</label>
        <input type="text" className="input" placeholder="Tên" value={ten} />
        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          value={email}
          placeholder="Email"
        />

        <label className="label">Vai trò</label>
        <input
          type="text"
          className="input"
          placeholder="Vai trò"
          value={vaitro}
        />

        <button className="btn btn-neutral mt-4">Thêm</button>
      </fieldset>
    </>
  );
}
