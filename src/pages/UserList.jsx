import { useDispatch, useSelector } from "react-redux"
import { Trash, SquarePen, ChevronsLeft, ChevronsRight, UserRoundSearch, ArrowUpNarrowWide, ArrowDownWideNarrow } from 'lucide-react'
import { logoutUser } from "../store/userSlice";
import { deleteUser, fetchUsers } from "../store/userSlice";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import Form from "../components/Form";



export function calculateAge(dob) {
  const birthday = new Date(dob)
  const today = new Date()

  let age = today.getFullYear() - birthday.getFullYear();

  const monthDiff = today.getMonth() - birthday.getMonth()

  if (monthDiff < 0 || monthDiff === 0 && today.getDate() < birthday.getDate()) age--;

  return age;
}

const UserList = () => {

  const dispatch = useDispatch()
  const { users, loading } = useSelector((state) => state.users);
  

  useEffect(() => {
    // console.log("Hyyyyy")
    dispatch(fetchUsers())
  }, [dispatch]);
  // console.log(users);
  // console.log(loading)

  const activeUser = useSelector((state) => state.users.currentUser)
  const visibleuser = activeUser?.role === "admin" ? users : users.filter(user => user.email === activeUser?.email)
  const [search, setSearch] = useState('')
  const [input, setInput] = useState("");
  const [sortfield, setSortfield] = useState(null)
  const [sortOrder, setSortOrder] = useState("asc")




  const filteredUser = visibleuser.filter(user =>
    user?.name.toLowerCase().includes(search.toLowerCase()) ||
    user?.email.toLowerCase().includes(search.toLowerCase())
  )
  const handleSearch = (e) => {
    setInput(e.target.value)
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(input)
    }, 500);

    return () => clearTimeout(timer)
  }, [input])


  const handleSort = (field) => {
    if (!field) return filteredUser
    if (sortfield === field) {
      setSortOrder(prev => (prev === "asc" ? "desc" : "asc"))
    } else {
      setSortfield(field)
      setSortOrder("asc")
    }

  }
  const sortedUser = [...filteredUser].sort((a, b) => {
    if (!sortfield) return 0

    if (sortfield === "age") {
      const ageA = calculateAge(a.dob)
      const ageB = calculateAge(b.dob)

      return sortOrder === "asc"
        ? ageA - ageB
        : ageB - ageA
    }
    const valA = a[sortfield]
    const valB = b[sortfield]

    if (typeof valA === "string") {
      return sortOrder === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA)
    }

    if (typeof valA === "number") {
      return sortOrder === "asc"
        ? valA - valB
        : valB - valA
    }

    return 0
  })
  // console.log(sortedUser)
  const [userPpage, setUserPpage] = useState(5)
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(sortedUser.length / userPpage) || 1;
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [totalPages, currentPage])
  const startIdx = (currentPage - 1) * userPpage;
  const endIdx = startIdx + userPpage;
  const currentUsers = sortedUser.slice(startIdx, endIdx);

  const handleDelete = (id) => {
    // console.log(id)
    dispatch(deleteUser(id))
    if (id === activeUser.id) dispatch(logoutUser())
  }

  const [open, setOpen] = useState(false)
  const [selectUser, setSelectUser] = useState(null)
  const handleUpdate = (user) => {
    setSelectUser(user)
    setOpen(true)
  }
  const handleClose = () => {
    setSelectUser(null)
    setOpen(false)
  }



  if (loading) return <p>Loaing....</p>

  if (visibleuser.length === 0) {
    return (
      <div className="mt-10">
        <h1 className=" sh-md text-center font-mono font-medium text-2xl text-gray-600 py-2">No user Registered Yet!!</h1>
      </div>
    )
  }
  return (
    <div className="mt-10 px-8">
      {activeUser.role === "admin" && <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">

        <div className="relative flex items-center w-md">
          <UserRoundSearch size={18} className="text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 " />
          <input
            className="w-full bg-white border border-gray-300 pl-10 pr-3 py-2 rounded-md text-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            type="text"
            value={input}
            placeholder="Search users"
            onChange={handleSearch}
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-50">
          <label className="font-medium whitespace-nowrap">User per Page :
            <input
              type="number"
              min={5}
              value={userPpage}
              className="w-20 border mx-2 border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
              onChange={(e) => {
                const value = Number(e.target.value)

                if (value >= 3) {
                  setUserPpage(value)
                  setCurrentPage(1)
                }
              }}
            />
          </label>
        </div>
      </div>}

      <div className="border border-gray-200 overflow-hidden rounded-lg shadow-md mt-3 dark:border-none">
        <table className="min-w-full  bg-white">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th
                title="Sort by Name"
                onClick={() => handleSort("name")} className="cursor-pointer px-4 py-2 text-left select-none">
                <div className="flex gap-1 items-center">
                  Name {sortfield === "name" && (sortOrder === "asc" ? <ArrowUpNarrowWide size={16} color="#fafafa" /> : <ArrowDownWideNarrow size={16} color="#ffffff" />)}
                </div>
              </th>
              <th
                title="Sort by Email"
                onClick={() => handleSort("email")} className="cursor-pointer px-4 py-2 text-left select-none">
                <div className="flex gap-1 items-center">
                  Email {sortfield === "email" && (sortOrder === "asc" ? <ArrowUpNarrowWide size={16} color="#fafafa" /> : <ArrowDownWideNarrow size={16} color="#ffffff" />)}
                </div>
              </th>
              <th className="px-4 py-2 text-left">Phone no.</th>
              <th
                title="Sort by DOB"
                onClick={() => handleSort("dob")} className="cursor-pointer px-4 py-2 text-left select-none"><div className="flex gap-1 items-center">
                  DOB {sortfield === "dob" && (sortOrder === "asc" ? <ArrowUpNarrowWide size={16} color="#fafafa" /> : <ArrowDownWideNarrow size={16} color="#ffffff" />)}
                </div>
              </th>
              <th
                title="Sort by Gender"
                onClick={() => handleSort("gender")} className="cursor-pointer px-4 py-2 text-left select-none">
                <div className="flex gap-1 items-center">
                  Gender {sortfield === "gender" && (sortOrder === "asc" ? <ArrowUpNarrowWide size={16} color="#fafafa" /> : <ArrowDownWideNarrow size={16} color="#ffffff" />)}
                </div>
              </th>
              <th
                title="Sort by Age"
                onClick={() => handleSort("age")} className="cursor-pointer px-4 py-2 text-left select-none"><div className="flex gap-1 items-center">
                  Age {sortfield === "age" && (sortOrder === "asc" ? <ArrowUpNarrowWide size={16} color="#fafafa" /> : <ArrowDownWideNarrow size={16} color="#ffffff" />)}
                </div>
              </th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>

          <tbody className="grid-cols-6 gap-0">


            {currentUsers.map((user, i) => (
              <tr
                className="border-t hover:bg-gray-100 transition-discrete text-left"
                key={user.email}>
                <td className="px-4 py-2">{i + 1}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.phone}</td>
                <td className="px-4 py-2">{user.dob}</td>
                <td className="px-4 py-2">{user.gender}</td>
                <td className="px-4 py-2">{calculateAge(user.dob)}</td>
                <td className="flex gap-2 px-4 py-2 justify-end">
                  {activeUser.role === "admin" && <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-600 p-2 hover:cursor-pointer hover:bg-red-500 rounded-sm"
                  >
                    <Trash size={18} color="#ffffff" />
                  </button>}

                  <button
                    onClick={() => handleUpdate(user)}
                    className="bg-green-600 p-2 hover:cursor-pointer hover:bg-green-500 rounded-sm">
                    <SquarePen size={16} color="#ffffff" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(filteredUser.length === 0) &&
          <h1 className="bg-white sh-md text-center font-mono font-medium text-2xl text-gray-600 py-2">No user found!!</h1>

        }
      </div>

      {activeUser.role === "admin" && <div className="flex gap-2 justify-center mt-10">
        <button
          onClick={() => setCurrentPage(p => p - 1)}
          disabled={currentPage === 1}
          className="p-1 border bg-gray-900 rounded-md disabled:opacity-50"
        >
          <ChevronsLeft color="#fafafa" />
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-1 dark:border-gray-50 dark:text-white border rounded-md font-medium ${currentPage === (i + 1) ? "bg-green-900 text-white" : ""}`}
          >{i + 1}</button>
        ))}

        <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages} className="p-1 bg-gray-900 border rounded-md disabled:opacity-50">
          <ChevronsRight color="#fafafa" />
        </button>
      </div>}




      <Modal isOpen={open} onClose={handleClose}>
        <Form user={selectUser} onClose={handleClose} />
      </Modal>
    </div>
  )
}

export default UserList
