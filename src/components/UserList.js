import React from "react";

export default function UserList({
  userList,
  onDelete,
  onEdit,
  currentPage,
  totalCount,
  itemOnePage,
  onPageChange,
  loading,
}) {
  return (
    <>
      {loading ? (
        <p>Đang tải...</p>
      ) : userList.length === 0 ? (
        <div className="text-center py-8">
          <p>Không có nhân viên nào.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
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
              {userList.map((user, index) => (
                <tr key={user.id}>
                  <th>{index + 1}</th>
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
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1 || loading}
            >
              Trước
            </button>
            <span>
              Trang {currentPage} / {Math.ceil(totalCount / itemOnePage)} (Tổng:{" "}
              {totalCount})
            </span>
            <button
              className="btn btn-secondary ml-2"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={
                currentPage >= Math.ceil(totalCount / itemOnePage) || loading
              }
            >
              Sau
            </button>
          </div>
        </div>
      )}
    </>
  );
}
