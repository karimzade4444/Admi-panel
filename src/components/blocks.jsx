import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getUsers } from "../api/users";
import { DeleteOutlined, EditOutlined, EyeOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button,  } from "antd";


const Blocks = () => {
    const { data, search } = useSelector((store) => store.marketPlace);
    const dispatch = useDispatch();
    useEffect(()=>{dispatch(getUsers(search))},[search])
  return (
    <div className=" grid grid-cols-3 place-items-center gap-5">
      {data?.map((el) => (
        <div key={el.id} className="w-100 h-70 bg-white rounded-xl border border-gray-300 p-5">
          <div className="flex justify-between items-start h-15">
            <h1 className=" font-semibold text-2xl">{el.name}</h1>
            <div className=" flex justify-center items-center gap-3">
              <Button type="primary" shape="circle">
                <EyeOutlined />
              </Button>
              <Button type="primary" shape="circle">
                <EditOutlined />
              </Button>
              <Button type="primary" shape="circle" danger>
                <DeleteOutlined />
              </Button>
            </div>
          </div>
          <div className="h-20"><p className=" text-gray-500">{el.title}</p></div>
          
        </div>
      ))}
    </div>
  );
}

export default Blocks