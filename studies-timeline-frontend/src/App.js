import React, { useState } from 'react'
import initialData from './initial-data'
import Column from './Column'
import { DragDropContext } from 'react-beautiful-dnd'


function App() {

  const initialCourses = [
    {
      title: 'Programming 1',
      period: 1
    },
    {
      title: 'Data strucutres and algorithms',
      period: 2
    },
    {
      title: 'Finnish 3',
      period: 2
    },
    {
      title: 'object-oriented programmming in C++',
      period: 2
    }
  ]

  const [courses, setCourses] = useState(initialCourses)
  const [data, setData] = useState(initialData)


  const onDragStart = () => {

  }

  const onDragUpdate = () => {
    
  }


  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const column = data.columns[source.droppableId]
    const newTaskId = Array.from(column.taskId)

    newTaskId.splice(source.index, 1)
    newTaskId.splice(destination.index, 0, draggableId)

    const newColumn = {
      ...column,
      taskId: newTaskId
    }

    setData({
      ...data, columns: {
        ...data.columns,
        [newColumn.id]: newColumn,
      }
    })


  }

  return (
    <div>
      <h1>All courses</h1>
      <ul>
        {courses.map((course, index) => <li key={index}>{course.title}</li>)}
      </ul>

      <h2>To-do</h2>
      <DragDropContext
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
        onDragEnd={onDragEnd}
      >
        {data.columnOrder.map(columnId => {
          const column = data.columns[columnId]
          const tasks = column.taskId.map(taskId => data.tasks[taskId])

          return <Column key={column.id} column={column} tasks={tasks} />
        })}
      </DragDropContext>
    </div>
  );
}

export default App;
