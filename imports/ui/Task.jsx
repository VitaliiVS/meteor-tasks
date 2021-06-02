import React from 'react'
 
export const Task = (props) => {
  const { task, onCheckboxClick } = props
  
  return (
    <li>
      {/* <input
        type="checkbox"
        checked={!!task.isChecked}
        onClick={() => onCheckboxClick(task)}
        readOnly
      /> */}
      <span>{task.text}</span>
    </li>
  )
}
