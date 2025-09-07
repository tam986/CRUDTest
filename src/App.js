import { useState } from "react";
import AddForm from "./components/Addform";
import UserList from "./components/UserList";
function App() {
  const [formOpen, setFormOpen] = useState(false);
  const [userList, setUserList] = useState([]);
  const handleOpenForm = (e) => {
    setFormOpen((prev) => !prev);
  };
  const handleCloseForm = (e) => {
    setFormOpen(false);
  };
  return (
    <>
      <section className=" mb-4 p-4 relative">
        <div className="flex justify-between items-center w-full  border-b  border-radius-4 shadow-lg p-4 ">
          <div>
            <h1>Quản lý nhân viên</h1>
          </div>
          <div>
            <button className="btn btn-primary" onClick={handleOpenForm}>
              Thêm nhân viên
            </button>
          </div>
        </div>
        {formOpen && <AddForm onClose={handleCloseForm} />}
        <div className="flex justify-between items-center w-full  border-b  border-radius-4 shadow-lg p-4">
          <UserList userList={userList} />
        </div>
      </section>
    </>
  );
}

export default App;
