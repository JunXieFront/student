import React, { Component } from 'react'
import Layout from '../../component/Layout'
import Header from '../../component/Header'
import Menu from '../../component/Menu'
import Welcome from '../../pages/Welcome'
import StudentList from '../../pages/StudentList'
import AddStudent from '../../pages/AddStudent'
import TransitionRoute from '../../component/TransitionRoute'

export default class Admin extends Component {
    render() {
        return (
            <Layout header={<Header/>}
                    aside={<Menu />}>
                <TransitionRoute path="/" exact component={Welcome}>

                </TransitionRoute>
                <TransitionRoute path='/students' exact component={StudentList}/>
                <TransitionRoute path="/students/add" exact component={AddStudent}/>
                {/* <TransitionRoute path="/courses" exact component={null}/>
                <TransitionRoute path="/courses/add" exact component={null}/> */}
            </Layout>
        )
    }
}
