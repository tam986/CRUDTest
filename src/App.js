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
  timKiemNhanVien,
} from "./lib/indexedDB";

function App() {
  const [formOpen, setFormOpen] = useState(false);
  const [csdl, setCSDL] = useState(null);
  const [nhanVienDangSua, setNhanVienDangSua] = useState(null);
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemOnePage] = useState(100);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

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
    if (!csdl) return;
    setLoading(true);
    // const skip = (currentPage - 1) * itemOnePage;
    const data = await paginate(csdl, itemOnePage, currentPage);
    const count = await getCount(csdl);
    setUserList(data.results);
    setTotalCount(count);
    setLoading(false);
  }, [csdl, currentPage, itemOnePage]);

  useEffect(() => {
    async function khoiTaoCSDL() {
      const db = await moCSDL();
      setCSDL(db);
    }
    khoiTaoCSDL();
  }, []);

  useEffect(() => {
    if (csdl && !isSearching) {
      loadPage();
    }
  }, [csdl, currentPage, loadPage, isSearching]);

  const handleSearch = useCallback(
    async (keyword) => {
      if (!csdl) return;
      setSearch(keyword);
      if (keyword.trim() === "") {
        setIsSearching(false);
        setCurrentPage(1);
        loadPage();
        return;
      }
      setIsSearching(true);
      setLoading(true);
      console.log("Tìm kiếm:", keyword);
      try {
        const results = await timKiemNhanVien(csdl, keyword);
        setUserList(results);
        setTotalCount(results.length);
        setCurrentPage(1);
      } catch (error) {
        console.error("Search error:", error);
        setUserList([]);
        setTotalCount(0);
      }
      setLoading(false);
    },
    [csdl, loadPage]
  );
  const tao10kNhanVien = async () => {
    setLoading(true);
    const danhSachRandom = [];
    for (let i = 0; i < 10000; i++) {
      danhSachRandom.push(taoNhanVien());
      if (i % 1000 === 0) console.log(`Chuẩn bị ${i} nhân viên`);
    }
    await RandomNhanVien(csdl, danhSachRandom);
    setCurrentPage(1);
    setSearch("");
    setIsSearching(false);
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
    setSearch("");
    setIsSearching(false);
    loadPage();
    setFormOpen(false);
  };

  const updateNhanVien = async (nhanVien) => {
    console.log("Sửa:", nhanVien);
    await luuNhanVien(csdl, nhanVien);
    setSearch("");
    setIsSearching(false);
    loadPage();
    setNhanVienDangSua(null);
    setFormOpen(false);
  };

  const xoaNhanVienFn = async (id) => {
    console.log("Xóa:", id);
    await xoaNhanVien(csdl, id);
    if (isSearching) {
      handleSearch(search);
    } else {
      loadPage();
      if (userList.length === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const xoaTatCa = async () => {
    console.log("Xóa hết");
    await xoaNhanVienAll(csdl);
    setCurrentPage(1);
    setSearch("");
    setIsSearching(false);
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
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên..."
            className="input"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
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

      <div className="w-full border-b shadow-lg p-4 absolute z-10">
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
