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

  const [ courses, setCourses ] = useState(initialCourses)
  const [ data, setData ] = useState(initialData)

  //console.log('Initial data: ', initialData)
  //console.log('data: ', data)

  //const state = initialData

  const onDragEnd = (result) => {
    
  }

  return (
    <div>
      <h1>All courses</h1>
      <ul>
        {courses.map((course, index) => <li key={index}>{course.title}</li>)}
      </ul>

      <h2>Draggable</h2>
      <DragDropContext
        onDragEnd={onDragEnd}
      >
        {data.columnOrder.map(columnId => {
          const column = data.columns[columnId]
          const tasks = column.taskIds.map(taskId => data.tasks[taskId])

          return <Column key={column.id} column ={column} tasks={tasks} />
        })}
      </DragDropContext>
    </div>
  );
}

export default App;
