export const moCSDL = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("NhanVienDM", 1);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore("nhanvien", {
        keyPath: "id",
        autoIncrement: true,
      });
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      resolve(db);
    };
    request.onerror = (event) => {
      console.error("Lỗi mở cơ sở dữ liệu:", event.target.error);
      reject(event.target.error);
    };
  });
};
export const layDanhSach = (db) => {
  return new Promise((resolve, reject) => {
    const request = db
      .transaction("nhanvien", "readwrite")
      .objectStore("nhanvien")
      .getAll();
    request.onsuccess = () => {
      resolve(request.result);
    };
    request.onerror = () => {
      console.error("Lỗi lấy danh sách nhân viên:", request.error);
      reject(request.error);
    };
  });
};
export const luuNhanVien = (db, nhanvien) => {
  return new Promise((resolve, reject) => {
    const request = db
      .transaction("nhanvien", "readwrite")
      .objectStore("nhanvien")
      .put(nhanvien);
    request.onsuccess = () => {
      resolve(request.result);
    };
    request.onerror = () => {
      console.error("Lỗi lưu nhân viên:", request.error);
      reject(request.error);
    };
  });
};
export const xoaNhanVien = (db, id) => {
  return new Promise((resolve, reject) => {
    const request = db
      .transaction("nhanvien", "readwrite")
      .objectStore("nhanvien")
      .delete(id);
    request.onsuccess = () => {
      console.log("Xóa nhân viên thành công:", id);
      resolve();
    };
    request.onerror = () => {
      console.error("Lỗi xóa nhân viên:", request.error);
      reject(request.error);
    };
  });
};
