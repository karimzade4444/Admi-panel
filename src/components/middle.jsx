
import {  Input, Button } from "antd";
import { Select } from "antd";
const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const Middle = () => {
  return (
    <div className="mt-10">
      <div className="w-[95%] h-20 bg-white m-auto rounded-xl border border-gray-300 flex justify-between items-center p-5">
        <Input placeholder="Поиск" variant="filled" className="w-100! "></Input>
        <div className=" flex justify-center items-center gap-5">
          <Select
            defaultValue="disabled"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: "Работа", label: "Работа" },
              { value: "Личное", label: "Личное" },
              { value: "Проект", label: "Проект" },
              { value: "disabled", label: "Disabled", disabled: true },
            ]}
          />
          <Button type="primary">+ Добавить</Button>
        </div>
      </div>
    </div>
  );
};

export default Middle;
