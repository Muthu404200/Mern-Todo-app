import React,{useState , useEffect} from 'react'
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';

function Card() {
    const [item, setitem] = useState([]);
    const [data, setdata] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() =>{
        axios.get('http://localhost:8086/api/')
        .then((res) => setitem(res.data))
        .catch((err) => console.log(err))
    },[])
    const additem = () =>{
        axios.post('http://localhost:8086/api/',{title : data})
        .then((res) => setitem([...item,res.data]))
        .catch((err) => console.log(err))
    setdata(' ');
    }
    
    const delItem = (id) => {
        if(window.confirm("You want to Delete List ?"))
        {
            axios.delete(`http://localhost:8086/api/${id}`)
            .then(() => setitem(item.filter((list) => list._id !== id)))
            .catch((err) => console.log(err))
        }
    }

    const filteredItem = item.filter((todo) => 
        todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Toggle the completed status of a todo item
  const toggleCompleted = (id, completed) => {
    axios.put(`http://localhost:8086/api/${id}`, { completed: !completed })
      .then((res) => {
        // Update the local state with the updated todo
        setitem(item.map(item => item._id === id ? { ...item, completed: !completed } : item));
      })
      .catch((err) => console.log(err));
  };


    
  return (
    <>
    <div className="w-full h-screen bg-gradient-to-tr from-green-200 via-green-500 to-red-200 flex flex-col justify-center items-center ">
        <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-md'>
            <h1 className='font-bold text-4xl text-gray-600 text-center mb-6'>Todo</h1>

             {/* Search Bar */}
             <div className='flex mb-6'>
                <input 
                type="text" 
                placeholder='Search Todo...'
                className='p-2 rounded-l-lg border-2 border-gray-300 w-full'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                />
             </div>




            {/* Input section */}
            <div className='flex mb-6'>
                <input type="text" placeholder='Add Todo...' className='p-2 rounded-l-lg border-2 border-gray-300 w-full' onChange={(e) => setdata(e.target.value)} />
                <button className='bg-green-500 text-white p-2 rounded-r-lg hover:bg-green-600 transition duration-200' onClick={additem}>
                    <FaPlus />
                </button>
            </div>
            {/* Todo List */}
            <div className='w-full space-y-4 mb-2'>
                {
                    filteredItem.length > 0 ? (
                    filteredItem.map((todo) => (
                        <div key={todo._id} className={`flex items-center justify-between p-4 rounded-sm transition duration-200 ${todo.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-800'}`}>
                            <div className='flex items-center gap-2'>
                            <input 
                            
                            type="checkbox" 
                            className='accent-green-300'
                            checked={todo.completed}
                            onChange={() => toggleCompleted(todo._id, todo.completed)}
                            
                            />
                            
                            <h1 className={`transition duration-200 ${todo.completed ? 'line-through' : ''}`}>{todo.title}</h1>
                            </div>
                            <button className='text-red-500 hover:text-red-700 transition duration-200' onClick={() => delItem(todo._id)}>
                                <MdDelete />
                            </button>
                        </div>
                    ))
                ):(
                    <div className='text-center text-gray-600'>
                        No Results Found
                    </div>
                )
                }
            </div>

            
            
            
        </div>
    </div>
    </>
  )
}

export default Card