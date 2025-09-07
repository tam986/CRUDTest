import { useEffect, useState } from "react";
import AddForm from "./components/Addform";
import UserList from "./components/UserList";
import { moCSDL, layDanhSach, luuNhanVien, xoaNhanVien } from "./lib/indexedDB";

function App() {
  const [formOpen, setFormOpen] = useState(false);
  const [csdl, setCSDL] = useState(null);
  const [nhanVienDangSua, setNhanVienDangSua] = useState(null);
  const [userList, setUserList] = useState([]);

  const handleOpenForm = () => {
    setFormOpen(true);
    setNhanVienDangSua(null);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setNhanVienDangSua(null);
  };

  useEffect(() => {
    async function khoiTaoCSDL() {
      const db = await moCSDL();
      setCSDL(db);
      const ds = await layDanhSach(db);
      setUserList(ds);
    }
    khoiTaoCSDL();
  }, []);

  const themNhanVienMoi = async (nhanVien) => {
    console.log("Thêm nhân viên:", nhanVien);
    await luuNhanVien(csdl, nhanVien);
    const danhSachMoi = await layDanhSach(csdl);
    console.log("userList sau thêm:", danhSachMoi);
    setUserList(danhSachMoi);
    setFormOpen(false);
  };

  const suaNhanVien = async (nhanVien) => {
    console.log("Sửa nhân viên:", nhanVien);
    await luuNhanVien(csdl, nhanVien);
    const danhSachMoi = await layDanhSach(csdl);
    console.log("userList sau sửa:", danhSachMoi);
    setUserList(danhSachMoi);
    setNhanVienDangSua(null);
    setFormOpen(false);
  };

  const xoaNhanVienFn = async (id) => {
    console.log("Xóa id:", id);
    await xoaNhanVien(csdl, id);
    const danhSachMoi = await layDanhSach(csdl);
    console.log("userList sau xóa:", danhSachMoi);
    setUserList(danhSachMoi);
  };

  const formSua = (nhanVien) => {
    setNhanVienDangSua(nhanVien);
    setFormOpen(true);
  };

  return (
    <section className="mb-4 p-4 relative">
      <div className="flex justify-between items-center w-full border-b shadow-lg p-4">
        <h1>Quản lý nhân viên</h1>
        <button className="btn btn-primary" onClick={handleOpenForm}>
          Thêm nhân viên
        </button>
      </div>
      {formOpen && (
        <AddForm
          onSubmit={nhanVienDangSua ? suaNhanVien : themNhanVienMoi}
          duLieuBanDau={nhanVienDangSua}
          onClose={handleCloseForm}
        />
      )}
      <div className="w-full border-b shadow-lg p-4">
        <UserList
          userList={userList}
          onEdit={formSua}
          onDelete={xoaNhanVienFn}
        />
      </div>
    </section>
  );
}

export default App;
