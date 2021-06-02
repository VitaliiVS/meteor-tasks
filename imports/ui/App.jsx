import React, { useEffect, useState } from 'react'
import { useTracker } from 'meteor/react-meteor-data'
import { TasksCollection } from '/imports/api/collection'
import { Task } from './Task'
import { TaskForm } from './TaskForm'
import { Meteor } from 'meteor/meteor'
import callAPI from '../modules/helpers/apiCall'

export const App = () => {
  const [psqlTasks, setPsqlTasks] = useState([])
  const tasks = useTracker(() => TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch())

  const fetch = async () => {
    const result = await callAPI('getTasks')
    setPsqlTasks(result)
  }

  useEffect(() => {
    fetch()
  }, [])

  const toggleChecked = ({ _id, isChecked }) => {
    TasksCollection.update(_id, {
      $set: {
        isChecked: !isChecked
      }
    })
  }

  const deleteAllMongo = () => {
    (async () => {
     await callAPI('removeMOngoTasks')
    })()
  }
  const deleteAllPSQL = () => {
    (async () => {
      const result = await callAPI('deleteAllTasks')
      setPsqlTasks(result)
    })()
  }

  return (
    <div className="app">
    <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>Tasks</h1>
          </div>
        </div>
      </header>
      <div className="main">
      <TaskForm setPsqlTasks={ setPsqlTasks }/>
        <div className="tasks-columns">
          <div>
          <p className="section-title">MongoDB</p>
          <ul className="tasks">
            {tasks.length !== 0 ? tasks.map(task => <Task key={task._id} task={task} onCheckboxClick={toggleChecked}/>) : <p className="empty-state">No Tasks</p> }
          </ul>
          </div>
          <div>
          <p className="section-title">Postgres</p>
          <ul className="tasks">
            {psqlTasks.length !== 0 ? psqlTasks.map(task => <Task key={task.id} task={task} onCheckboxClick={toggleChecked}/>) : <p className="empty-state">No Tasks</p> }
          </ul>
          </div>
        </div>
        <button className="delete-button mongo" onClick={deleteAllMongo}>Delete All Mongo</button>
        <button className="delete-button psql" onClick={deleteAllPSQL}>Delete All Postgres</button>
      </div>
  </div>
  )
}
