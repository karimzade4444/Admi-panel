import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser } from "../api/users";
import {
    AlignLeftOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  EyeTwoTone,
  TagsOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { Modal } from "antd";

const Blocks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (user) => {
    setSelectedUser(user)
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedUser(null)
  };
  const [selectedUser, setSelectedUser] = useState(null);
  const { data, search } = useSelector((store) => store.marketPlace);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers(search));
  }, [search]);
  const categoryColors = {
    Работа: "bg-blue-500/50 text-blue",
    Проект: "bg-purple-500/50 text-purple",
    Личное: "bg-green-500/50 text-green",
  };
  return (
    <div className=" grid grid-cols-3 place-items-center gap-5">
      {data?.map((el) => {
        const bgClass = categoryColors[el.category] || "bg-white text-black";
        return (
          <div
            key={el.id}
            className={`w-100 h-60 bg-white rounded-xl border border-gray-300 p-5 ${bgClass}`}
          >
            <div className="flex justify-between items-start h-15">
              <h1 className=" font-semibold text-2xl">{el.name}</h1>
              <div className=" flex justify-center items-center gap-3">
                <Button
                  type="primary"
                  shape="circle"
                  onClick={() => showModal(el)}
                >
                  <EyeOutlined />
                </Button>
                <Button type="primary" shape="circle">
                  <EditOutlined />
                </Button>
                <Button type="primary" shape="circle" danger onClick={()=>{dispatch(deleteUser(el.id))}}>
                  <DeleteOutlined />
                </Button>
              </div>
            </div>
            <div className="h-25">
              <p className=" text-gray-500">{el.title}</p>
            </div>
            <div>
              <p>{el.category}</p>
            </div>
          </div>
        );
      })}
      <Modal
        title={selectedUser?.name}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onCancel={handleCancel}
        okText="Редактировать"
      >
        <div className="w-[95%] m-auto">
          <div className=" h-25 bg-gray-100 rounded-xl mt-10">
            <div className="p-3 leading-6">
              <p>
                <AlignLeftOutlined /> Описание
              </p>
              <p>{selectedUser?.title}</p>
            </div>
          </div>
          <div className="p-3 flex justify-between items-center mt-5">
            <p>
              <TagsOutlined /> Категория
            </p>
            <p>{selectedUser?.category}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Blocks;
