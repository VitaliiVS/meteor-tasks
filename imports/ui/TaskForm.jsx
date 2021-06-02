import React, { useState } from 'react'
import { TasksCollection } from '../api/collection'
import { Meteor } from 'meteor/meteor'
import callAPI from '../modules/helpers/apiCall'

export const TaskForm = (props) => {
    const [text, setText] = useState('')
    const { setPsqlTasks } = props
    const handleInput = (e) => {
        setText(e.target.value)
    }

    const handleAddMongo = async (e) => {
        e.preventDefault()
            
        if (text.trim().length !== 0) {
            TasksCollection.insert({
                text: text.trim(),
                createdAt: new Date()
            })
        } else {
            return
        }
            setText('')
        }
    
    const handleAddPsql = async (e) => {
        e.preventDefault()
            
        if (text.trim().length !== 0) {
            (async () => {
                const result = await callAPI('createTask', text.trim())
                setPsqlTasks(result)
            })()

            setText('')
        }
    }

    return (
        <div className="task-form">
            <input
                type="text"
                placeholder="Type to add new tasks"
                value={text}
                onChange={handleInput}
            />
            <button onClick={handleAddMongo}>Add Task to mongo</button>
            <button onClick={handleAddPsql}>Add Task to psql</button>
        </div>
    )
}