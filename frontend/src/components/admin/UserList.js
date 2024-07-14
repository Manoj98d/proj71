import { Fragment, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearError } from "../../slice/userSlice"
import { getUsers} from "../../actions/userActions";
import Loader from '../layouts/Loader'
import {MDBDataTable} from 'mdbreact';
import { toast } from "react-toastify";
import Sidebar from "./Sidebar"
export default function UserList(){
    const{users=[],loading=true,error}=useSelector(state=>state.userState)
    
    const dispatch=useDispatch();
    const setUsers=()=>{
        const data={
            columns:[
                {
                    label:'ID',
                    field:'id',
                    sort:'asc'
                },
                {
                    label:'Name',
                    field:'name',
                    sort:'asc'
                },
                {
                    label:'Email',
                    field:'email',
                    sort:'asc'
                },
                {
                    label:'Role',
                    field:'role',
                    sort:'asc'
                },
                
            ],
            rows:[]
        }
        users.forEach(user=>{
            data.rows.push({
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role                
            })
        })
        return data;
    }
    
    useEffect(()=>{
        if(error){
            toast(error,{
              position:"bottom-center",
              type:'error',
              onOpen:()=>{
                      dispatch(clearError())
              }
            })
            return
          }
          
          dispatch(getUsers)
    },[dispatch,error])
    return(
        <div className="row">
        <div className="col-12 col-md-2">
            <Sidebar/>
        </div>
            <div className="col-12 col-md-10">
            <h1 className="my-4">User List</h1>
            <Fragment>
                {loading ?<Loader/>
                :
                <MDBDataTable
                  data={setUsers()}
                  bordered
                  striped
                  hover
                  className="px-3"
                />}
            </Fragment>
            </div>
        </div>
    )
}