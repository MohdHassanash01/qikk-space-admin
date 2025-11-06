import CardList from "@/components/CardList"
import AppbarChart, {} from "../components/AppbarChart"
import AppPieChart from "@/components/AppPieChart"
import TodoList from "@/components/TodoList"
import AppAreaChart from "@/components/AppAreaChart"

import {useFirebase} from "../context/Firebase"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

function HomePage() {

  const navigate = useNavigate()
  const { isloggedIn } = useFirebase()

    useEffect(() => {
        if (!isloggedIn) {
          // console.log(isloggedIn);
            navigate("/signin")
        }

    },[navigate,isloggedIn])
 
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4 py-10">

  <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2 h-[500px]"><AppbarChart/></div>

  <div className="bg-primary-foreground p-4 rounded-lg h-[500px] overflow-y-auto">
    <CardList title="latestTransactions"/></div>

  <div className="bg-primary-foreground p-4 rounded-lg h-[500px]"><AppPieChart/></div>

  <div className="bg-primary-foreground p-4 rounded-lg "><TodoList/></div>

  <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2"><AppAreaChart/></div>

  <div className="bg-primary-foreground p-4 rounded-lg ">
    <CardList title="popularContent"/>
  </div>


 </div>
  )
}

export default HomePage
