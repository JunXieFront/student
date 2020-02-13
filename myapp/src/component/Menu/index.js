import React from 'react'
import {Link} from 'react-router-dom'
import './index.css'
export default function Menu() {
    return (
        <ul className="menu">
            <li><Link to="/students">学生列表</Link></li>
            <li><Link to="/students/add">添加学生</Link></li>
            <li><Link to="/courses">课程列表</Link></li>
            <li><Link to="/courses/add">添加课程</Link></li>
        </ul>
    )
}
