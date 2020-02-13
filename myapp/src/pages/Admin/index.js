import React, { Component } from 'react'
import Layout from '../../component/Layout'
import Header from '../../component/Header'
import Menu from '../../component/Menu'
import Welcome from '../../pages/Welcome'
import StudentList from '../../pages/StudentList'
import AddStudent from '../../pages/AddStudent'
import {Route} from 'react-router-dom'
export default class Admin extends Component {
    render() {
        return (
            <Layout header={<Header/>}
                    aside={<Menu />}>
                <Route path="/" exact component={Welcome}></Route>
                <Route path='/students' exact component={StudentList}/>
                <Route path="/students/add" exact component={AddStudent}/>
                <Route path="/courses"/>
                <Route path="/courses/add"/>
            </Layout>
        )
    }
}
