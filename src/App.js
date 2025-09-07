import { useEffect, useState, useCallback } from "react";
import AddForm from "./components/Addform";
import UserList from "./components/UserList";
import {
  moCSDL,
  paginate,
  getCount,
  luuNhanVien,
  RandomNhanVien,
  xoaNhanVien,
  xoaNhanVienAll,
} from "./lib/indexedDB";

function App() {
  const [formOpen, setFormOpen] = useState(false);
  const [csdl, setCSDL] = useState(null);
  const [nhanVienDangSua, setNhanVienDangSua] = useState(null);
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemOnePage = 100;
  const [totalCount, setTotalCount] = useState(0);

  const vaiTroList = [
    "Nhân viên",
    "Fresher",
    "Thực tập",
    "Kế toán",
    "Marketing",
  ];

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const randomName = () => {
    const initialParts = [
      "Hùng",
      "Lan",
      "Nam",
      "Mai",
      "Dũng",
      "Hà",
      "Phong",
      "Linh",
      "Khánh",
      "Tâm",
    ];
    const lastParts = [
      "Nguyễn",
      "Trần",
      "Lê",
      "Phạm",
      "Hoàng",
      "Võ",
      "Đặng",
      "Bùi",
      "Đỗ",
      "Hồ",
    ];
    return `${initialParts[getRandomInt(0, initialParts.length - 1)]} ${
      lastParts[getRandomInt(0, lastParts.length - 1)]
    }`;
  };

  const randomEmail = (ten) => {
    const domains = ["gmail.com", "yahoo.com", "hotmail.com", "example.com"];
    return `${ten.toLowerCase().replace(" ", "")}${getRandomInt(100, 999)}@${
      domains[getRandomInt(0, domains.length - 1)]
    }`;
  };

  const taoNhanVien = () => {
    const ten = randomName();
    return {
      ten,
      email: randomEmail(ten),
      vaiTro: vaiTroList[getRandomInt(0, vaiTroList.length - 1)],
    };
  };

  const loadPage = useCallback(async () => {
    setLoading(true);
    const db = await moCSDL();
    const skip = (currentPage - 1) * itemOnePage;
    const data = await paginate(db, itemOnePage, skip);
    const count = await getCount(db);
    setUserList(data.results);
    setTotalCount(count);
    setLoading(false);
  }, [currentPage, itemOnePage]);

  useEffect(() => {
    async function khoiTaoCSDL() {
      const db = await moCSDL();
      setCSDL(db);
      loadPage();
    }
    khoiTaoCSDL();
  }, [loadPage]);

  useEffect(() => {
    loadPage();
  }, [currentPage, loadPage]);
  const tao10kNhanVien = async () => {
    setLoading(true);
    const danhSachRandom = [];
    for (let i = 0; i < 10000; i++) {
      danhSachRandom.push(taoNhanVien());
      if (i % 1000 === 0) console.log(`Chuẩn bị ${i} nhân viên`);
    }
    await RandomNhanVien(csdl, danhSachRandom);
    setCurrentPage(1);
    loadPage();
    alert("Tạo 10k ok!");
    setLoading(false);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(totalCount / itemOnePage)) {
      setCurrentPage(newPage);
    }
  };

  const themNhanVienMoi = async (nhanVien) => {
    console.log("Thêm:", nhanVien);
    await luuNhanVien(csdl, nhanVien);
    loadPage();
    setFormOpen(false);
  };

  const updateNhanVien = async (nhanVien) => {
    console.log("Sửa:", nhanVien);
    await luuNhanVien(csdl, nhanVien);
    loadPage();
    setNhanVienDangSua(null);
    setFormOpen(false);
  };

  const xoaNhanVienFn = async (id) => {
    console.log("Xóa:", id);
    await xoaNhanVien(csdl, id);
    loadPage();
    if (userList.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const xoaTatCa = async () => {
    console.log("Xóa hết");
    await xoaNhanVienAll(csdl);
    setCurrentPage(1);
    loadPage();
  };

  const formSua = (nhanVien) => {
    setNhanVienDangSua(nhanVien);
    setFormOpen(true);
  };

  return (
    <section className="mb-4 p-4 relative">
      <div className="flex justify-between items-center w-full border-b shadow-lg p-4">
        <h1>Quản lý nhân viên</h1>
        <div className="space-x-2">
          <button
            className="btn btn-primary"
            onClick={() => {
              setFormOpen(true);
              setNhanVienDangSua(null);
            }}
            disabled={loading}
          >
            Thêm nhân viên
          </button>
          <button
            className="btn btn-secondary"
            onClick={tao10kNhanVien}
            disabled={loading}
          >
            {loading ? "Đang tạo..." : "Tạo 10k nhân viên"}
          </button>
          <button
            className="btn btn-error"
            onClick={xoaTatCa}
            disabled={loading}
          >
            Xóa tất cả
          </button>
        </div>
      </div>
      {formOpen && (
        <AddForm
          onSubmit={nhanVienDangSua ? updateNhanVien : themNhanVienMoi}
          duLieuBanDau={nhanVienDangSua}
          onClose={() => {
            setFormOpen(false);
            setNhanVienDangSua(null);
          }}
        />
      )}
      <div className="w-full border-b shadow-lg p-4 absolute  z-10">
        <UserList
          userList={userList}
          onEdit={formSua}
          onDelete={xoaNhanVienFn}
          loading={loading}
          currentPage={currentPage}
          totalCount={totalCount}
          itemOnePage={itemOnePage}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
}

export default App;
