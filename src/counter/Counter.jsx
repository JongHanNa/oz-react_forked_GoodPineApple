import { useState } from 'react'
import TaskInput from '../components/counter/TaskInput'
import TaskList from '../components/counter/TaskList'
import TaskCounter from '../components/counter/TaskCounter'
import { useNavigate } from 'react-router'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Input } from '@mui/material';

function Counter() {
  const navigate = useNavigate()
  const [tasks, setTasks] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [priority, setPriority] = useState('low')

  const addTask = () => {
    const taskText = inputValue.trim()
    if (taskText === '') {
      alert('할일을 입력해주세요')
      return
    }

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: taskText,
        completed: false,
        priority: priority
      }
    ])
    setInputValue('')
  }

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ))
  }

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  const clearAllTasks = () => {
    if (tasks.length === 0) {
      alert('삭제할 할 일이 없습니다.')
      return
    }
    setTasks([])
  }

  const moveToPosts = () => {
    alert('게시판으로 이동합니다.');
    navigate('/posts');
  }

  return (
    <div className="max-w-2xl w-11/12 mx-auto my-5 bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
      <h1 className="text-slate-700 text-center mb-6 font-semibold text-2xl">✅ 할 일 목록</h1>
      <Stack spacing={2} direction="row" className="mb-6">
        <Button variant="text" className="w-full">Text</Button>
        <Button variant="contained" className="w-full bg-blue-500 text-white">Contained</Button>
        <Button variant="outlined" className="w-full border-blue-500 text-blue-500">Outlined</Button> 
      </Stack>

      <button 
        onClick={moveToPosts}
        className="w-full mb-6 px-4 py-3 bg-blue-500 text-white rounded-lg text-base font-medium hover:bg-blue-600 active:translate-y-px transition-all duration-200"
      >
        📋 게시판으로 이동
      </button>
      
      <TaskInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        priority={priority}
        setPriority={setPriority}
        onAddTask={addTask}
        onClearAllTasks={clearAllTasks}
      />
      
      <TaskCounter count={tasks.length} />
      
      <TaskList
        tasks={tasks}
        onToggleTask={toggleTask}
        onDeleteTask={deleteTask}
      />
      <Input placeholder="Basic usage" />
    </div>
  )
}

export default Counter
