import React, {Component} from 'react'
import {BrowserRouter as Router, withRouter} from 'react-router-dom'
let prevLocation,action,nextLocation,unBlock;
class GuardHelper extends Component{
    componentDidMount() {
           unBlock =  this.props.history.block((location,ac) => {
            prevLocation = this.props.history.location;
            action = ac;
            nextLocation = location;
            return '';
        });
        this.unListen = this.props.history.listen((location,ac) => {
           if(this.props.onChange){
               this.props.onChange(this.props.history.location,location,ac,this.unListen)
           }
        
        })

    }
    componentWillUnmount() {
      unBlock()
    }
    
    
    render(){
        return null;
    }
}
let GuardHelpe = withRouter(GuardHelper)
export default class RouteGuard extends Component {
    handleConfirm = (msg, confirm) => {
        // msg是用于接受阻塞信息
        // confirm是是否允许跳转的函数
        if (this.props.onBeforeChange) {
            this.props.onBeforeChange(prevLocation, nextLocation, action, confirm)
        } else {
            confirm(true)
        }
    }
    render() {
        return (
            <Router getUserConfirmation={this.handleConfirm}>
                <GuardHelpe onChange = {this.props.onChange}/>
                {
                this.props.children
            } </Router>
        )
    }
}
