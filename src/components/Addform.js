import React, { useState } from "react";

export default function AddForm({ onSubmit, onClose, duLieuBanDau }) {
  const [ten, setTen] = useState(duLieuBanDau ? duLieuBanDau.ten || "" : "");
  const [email, setEmail] = useState(
    duLieuBanDau ? duLieuBanDau.email || "" : ""
  );
  const [vaitro, setVaitro] = useState(
    duLieuBanDau ? duLieuBanDau.vaitro || "" : ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const nhanVien = {
      ...(duLieuBanDau ? { id: duLieuBanDau.id } : {}),
      ten,
      email,
      vaitro,
    };
    console.log("nhanVien:", nhanVien);
    onSubmit(nhanVien);
    if (duLieuBanDau) {
      setTen("");
      setEmail("");
      setVaitro("");
    }
    onClose();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className=" bg-base-200 border-base-300 rounded-box w-xs border p-4 absolute mt-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-100 shadow-lg"
      >
        <label className="flex justify-between items-center mb-4">
          <legend className="">
            {duLieuBanDau ? "Sửa nhân viên" : "Thêm nhân viên"}
          </legend>
          <button type="button" onClick={onClose}>
            X
          </button>
        </label>

        <label className="label">Tên</label>
        <input
          type="text"
          className="input"
          placeholder="Tên"
          value={ten}
          onChange={(e) => setTen(e.target.value)}
        />

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="label">Vai trò</label>
        <input
          type="text"
          className="input"
          placeholder="Vai trò"
          value={vaitro}
          onChange={(e) => setVaitro(e.target.value)}
        />

        <button type="submit" className="btn btn-neutral mt-4">
          {duLieuBanDau ? "Cập nhật" : "Thêm"}
        </button>
      </form>
    </>
  );
}
