import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getUsers } from "../api/users";


const Blocks = () => {
    const { data, search } = useSelector((store) => store.marketPlace);
    const dispatch = useDispatch();
    useEffect(()=>{dispatch(getUsers(search))},[search])
  return (
    <div>
        {data?.map((el)=>(
            <div key={el.id} className="w-150 h-100">
              
            </div>
        ))}
    </div>
  )
}

export default Blocks