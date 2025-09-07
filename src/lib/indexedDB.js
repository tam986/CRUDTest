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
      reject(event.target.error);
    };
  });
};
export const layDanhSach = (db) => {
  return new Promise((resolve, reject) => {
    const request = db
      .transaction("nhanvien", "readonly")
      .objectStore("nhanvien")
      .getAll();
    request.onsuccess = () => {
      resolve(request.result);
    };
    request.onerror = () => {
      reject(request.error);
    };
  });
};
export const getCount = (db) => {
  return new Promise((resolve, reject) => {
    const request = db
      .transaction("nhanvien", "readonly")
      .objectStore("nhanvien")
      .count();
    request.onsuccess = () => {
      resolve(request.result);
    };
    request.onerror = () => {
      reject(request.error);
    };
  });
};
export const paginate = (db, pageSize, pageNumber) => {
  return new Promise((resolve, reject) => {
    const transaction = db
      .transaction("nhanvien", "readonly")
      .objectStore("nhanvien")
      .openCursor();
    const results = [];
    let advanced = false;
    let offset = (pageNumber - 1) * pageSize;

    transaction.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        if (offset > 0) {
          offset--;
        } else {
          results.push(cursor.value);
          if (results.length === pageSize) {
            advanced = true;
            resolve({ results, advanced });
            return; // Dừng lại khi đủ số lượng
          }
        }
        cursor.continue();
      } else {
        resolve({ results, advanced });
      }
    };
    transaction.onerror = () => {
      reject(transaction.error);
    };
  });
};

export const RandomNhanVien = (db, danhSachRandom) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("nhanvien", "readwrite");
    const store = transaction.objectStore("nhanvien");
    danhSachRandom.forEach((nhanVien) => {
      store.put(nhanVien);
    });
    transaction.oncomplete = () => {
      resolve();
    };
    transaction.onerror = (event) => {
      reject(event.target.error);
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
      resolve();
    };
    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const xoaNhanVienAll = (db) => {
  return new Promise((resolve, reject) => {
    const request = db
      .transaction("nhanvien", "readwrite")
      .objectStore("nhanvien")
      .clear();
    request.onsuccess = () => {
      resolve();
    };
    request.onerror = () => {
      reject(request.error);
    };
  });
};
