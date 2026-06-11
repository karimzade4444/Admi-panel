import { Input, Button, Modal } from "antd";
import { Select } from "antd";
import { useState } from "react";
const handleChange = (value) => {
  console.log(`selected ${value}`);
};
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUsers, getUsers } from "../api/users";
import {
  setCreateCategory,
  setCreateName,
  setCreateTitle,
  setSearch,
} from "../lib/redux/slice/slice";

const Middle = () => {
  const [isCreatModalOpen, setIsCreatModalOpen] = useState(false);
  const { data, search, id, createName, createTitle, createCategory } =
    useSelector((store) => store.marketPlace);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers(search));
  }, [search]);

  const handleCancel = () => {
    setIsCreatModalOpen(false);
  };

  return (
    <div className="mt-10">
      <div className="w-[95%] h-20 bg-white m-auto rounded-xl border border-gray-300 flex justify-between items-center p-5">
        <Input placeholder="Поиск" variant="filled" className="w-100! " value={search} onChange={(e)=>{dispatch(setSearch(e.target.value))}} ></Input>
        <div className=" flex justify-center items-center gap-5">
          <Select
            defaultValue="Все"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: "Работа", label: "Работа" },
              { value: "Личное", label: "Личное" },
              { value: "Проект", label: "Проект" },
              { value: "Все", label: "Все" },
            ]}
          />
          <Button type="primary" onClick={() => setIsCreatModalOpen(true)}>
            + Добавить
          </Button>
        </div>
      </div>

      <Modal
        title="Создать карточку"
        open={isCreatModalOpen}
        onCancel={handleCancel}
        onOk={() => {
          dispatch(
            createUsers({
              name: createName,
              title: createTitle,
              category: createCategory
            }),
          );
          setIsCreatModalOpen(false);
        }}
      >
        <div className="w-[95%] m-auto space-y-6 pt-4">
          <div>
            <p className="font-medium mb-1">Название</p>
            <input
              type="text"
              placeholder="Введите название..."
              value={createName}
              onChange={(e) => dispatch(setCreateName(e.target.value))}
              className="border border-gray-300 w-full h-10 rounded-xl pl-5 bg-gray-50 focus:outline-blue-500"
            />
          </div>

          <div>
            <p className="font-medium mb-1">Описание</p>
            <input
              type="text"
              placeholder="Введите описание..."
              value={createTitle}
              onChange={(e) => dispatch(setCreateTitle(e.target.value))}
              className="border border-gray-300 w-full h-10 rounded-xl pl-5 bg-gray-50 focus:outline-blue-500"
            />
          </div>

          <div>
            <p className="font-medium mb-1">Категория</p>
            <Select
              value={createCategory}
              className="w-full h-10"
              onChange={(value) => {
                console.log("Выбранная категория:", value);
                dispatch(setCreateCategory(value));
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

export default Middle;
