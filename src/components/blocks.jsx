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
        <div key={el.id} className="w-100 h-70 bg-white">
          <div className="flex justify-between items-start">
            <h1>{el.name}</h1>
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
        </div>
      ))}
    </div>
  );
}

export default Blocks