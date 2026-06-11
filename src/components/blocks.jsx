import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser, updateUser } from "../api/users";
import {
  AlignLeftOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import { Button, Select, Modal } from "antd";
import {
  setEditCategory,
  setEditName,
  setEditTitle,
  setId,
} from "../lib/redux/slice/slice";

const Blocks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  const { data, search, editName, editTitle, editCategory, id } = useSelector(
    (store) => store.marketPlace,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers(search));
  }, [search]);

  const showModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="grid grid-cols-3 place-items-center gap-5">
      {data?.map((el) => {
        return (
          <div
            key={el.id}
            className={`w-100 h-60 rounded-xl border p-5 transition-all border-gray-300 bg-white `}
          >
            <div className="flex justify-between items-start h-15">
              <h1 className="font-semibold text-2xl">{el.name}</h1>
              <div className="flex justify-center items-center gap-3">
                <Button
                  type="primary"
                  shape="circle"
                  className="inline-flex justify-center items-center"
                  onClick={() => showModal(el)}
                >
                  <EyeOutlined />
                </Button>

                <Button
                  type="primary"
                  shape="circle"
                  className="inline-flex justify-center items-center"
                  onClick={() => {
                    dispatch(setId(el.id));
                    dispatch(setEditName(el.name));
                    dispatch(setEditTitle(el.title));
                    dispatch(setEditCategory(el.category));
                    setIsEditModalOpen(true);
                  }}
                >
                  <EditOutlined />
                </Button>
                <Button
                  type="primary"
                  shape="circle"
                  danger
                  className="inline-flex justify-center items-center"
                  onClick={() => {
                    dispatch(deleteUser(el.id));
                  }}
                >
                  <DeleteOutlined />
                </Button>
              </div>
            </div>
            <div className="h-25">
              <p className="text-gray-500">{el.title}</p>
            </div>
            <div>
              <p
                className={`font-medium px-3 py-1 rounded-full inline-block
  ${
    el.category === "Работа"
      ? "bg-green-100 text-green-600 shadow-md shadow-green-500/30"
      : el.category === "Проект"
        ? "bg-purple-100 text-purple-600 shadow-md shadow-purple-500/30"
        : "bg-blue-100 text-blue-600 shadow-md shadow-blue-500/30"
  }`}
              >
                {el.category}
              </p>
            </div>
          </div>
        );
      })}

      <Modal
        title={selectedUser?.name}
        open={isModalOpen}
        onCancel={handleCancel}
        okText="Редактировать"
        onOk={() => {
          if (selectedUser) {
            dispatch(setId(selectedUser.id));
            dispatch(setEditName(selectedUser.name));
            dispatch(setEditTitle(selectedUser.title));
            dispatch(setEditCategory(selectedUser.category));
            setIsModalOpen(false);
            setIsEditModalOpen(true);
          }
        }}
      >
        <div className="w-[95%] m-auto">
          <div className="h-25 bg-gray-100 rounded-xl mt-10">
            <div className="p-3 leading-6">
              <p className="font-medium text-gray-700">
                <AlignLeftOutlined /> Описание
              </p>
              <p className="text-gray-600 mt-1">{selectedUser?.title}</p>
            </div>
          </div>
          <div className="p-3 flex justify-between items-center mt-5">
            <p className="font-medium text-gray-700">
              <TagsOutlined /> Категория
            </p>
            <p
              className={`font-medium px-3 py-1 rounded-full inline-block
  ${
    selectedUser?.category === "Работа"
      ? "bg-green-100 text-green-600 shadow-md shadow-green-500/30"
      : selectedUser?.category === "Проект"
        ? "bg-purple-100 text-purple-600 shadow-md shadow-purple-500/30"
        : "bg-blue-100 text-blue-600 shadow-md shadow-blue-500/30"
  }`}
            >
              {selectedUser?.category}
            </p>
          </div>
        </div>
      </Modal>

      <Modal
        title="Редактировать карточку"
        open={isEditModalOpen}
        onCancel={handleCancelEdit}
        onOk={() => {
          dispatch(
            updateUser({
              id,
              name: editName,
              title: editTitle,
              category: editCategory,
            }),
          );
          dispatch(getUsers(search));
          setIsEditModalOpen(false);
        }}
      >
        <div className="w-[95%] m-auto space-y-6 pt-4">
          <div>
            <p className="font-medium mb-1">Название</p>
            <input
              type="text"
              value={editName || ""}
              onChange={(e) => dispatch(setEditName(e.target.value))}
              className="border border-gray-300 w-full h-10 rounded-xl pl-5 bg-gray-50 focus:outline-blue-500"
            />
          </div>

          <div>
            <p className="font-medium mb-1">Описание</p>
            <input
              type="text"
              value={editTitle || ""}
              onChange={(e) => dispatch(setEditTitle(e.target.value))}
              className="border border-gray-300 w-full h-10 rounded-xl pl-5 bg-gray-50 focus:outline-blue-500"
            />
          </div>

          <div>
            <p className="font-medium mb-1">Категория</p>
            <Select
              value={editCategory}
              className="w-full h-10"
              onChange={(value) => {
                dispatch(setEditCategory(value));
              }}
              options={[
                { value: "Работа", label: "Работа" },
                { value: "Личное", label: "Личное" },
                { value: "Проект", label: "Проект" },
              ]}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Blocks;
