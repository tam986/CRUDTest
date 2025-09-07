import React from "react";

export default function UserList({ userList, onDelete, onEdit }) {
  return (
    <>
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
      </div>
    </>
  );
}
