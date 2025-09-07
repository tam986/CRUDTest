import React, { useState } from "react";

export default function UserList({ userList, onDelete, onEdit, loading }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  const totalCount = userList.length;
  const totalPages = Math.ceil(totalCount / pageSize);

  const pagedList = userList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <>
      {loading ? (
        <p>Đang tải...</p>
      ) : totalCount === 0 ? (
        <div className="text-center py-8">
          <p>Không có nhân viên nào.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="flex items-center justify-end mb-2">
            <label className="mr-2">Hiển thị:</label>
            <select
              className="select select-bordered w-20"
              value={pageSize}
              onChange={handlePageSizeChange}
            >
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={75}>75</option>
              <option value={100}>100</option>
            </select>
            <span className="ml-2">bản ghi</span>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Vai trò</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {pagedList.map((user, index) => (
                <tr key={user.id}>
                  <th>{(currentPage - 1) * pageSize + index + 1}</th>
                  <td>{user.ten}</td>
                  <td>{user.email}</td>
                  <td>{user.vaitro}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary mr-2"
                      onClick={() => onEdit(user)}
                    >
                      Sửa
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => onDelete(user.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination mt-4 flex items-center justify-center">
            <button
              className="btn btn-secondary mr-2"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || loading}
            >
              Trước
            </button>
            <span>
              Trang {currentPage} / {totalPages} (Tổng: {totalCount})
            </span>
            <button
              className="btn btn-secondary ml-2"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages || loading}
            >
              Sau
            </button>
          </div>
        </div>
      )}
    </>
  );
}
