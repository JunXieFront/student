import React from 'react'
import {CSSTransition} from 'react-transition-group'
import 'animate.css'
import {Route} from 'react-router-dom'
export default function TransitionRoute(props) {
    const {component:Component,...rest} = props;
    return (
        <Route {...rest}>
            {
                ({match}) => {
                   return <CSSTransition in={match ? true : false}
                                    timeout={1000}
                                    classNames={
                                        {
                                            enter:'animated',
                                            enterActive:'fadeIn',
                                            exit:'animated',
                                            exitActive:'fadeOut'
                                        }
                                    }
                                    mountOnEnter
                                    unmountOnExit
                                    >
                        <Component/>
                    </CSSTransition>
                }
            }
        </Route>
    ) 
}
