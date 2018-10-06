import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as counterActions from './modules/counter';
import * as postActions from './modules/post'
import axios from 'axios'

class App extends Component {

    componentDidMount() {
        this.loadData()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.number !== prevProps.number) {
            this.loadData()
        }
    }

    loadData = async () => {
        const {PostActions, number} = this.props
        try {
            const response = await PostActions.getPost(number)
            console.log(response)
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        const {CounterActions, number, post, error, loading} = this.props;

        return (
            <div>
                <h1>{number}</h1>
                {loading
                    ? (<h2>로딩중...</h2>)
                    : (
                        error
                            ? (<h2>오류 발생!</h2>)
                            : (
                                <div>
                                    <h2>{post.title}</h2>
                                    <p>{post.body}</p>
                                </div>
                            )
                    )
                }
                <button onClick={CounterActions.increment}>+</button>
                <button onClick={CounterActions.decrement}>-</button>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        number: state.counter,
        post: state.post.get('data'),
        loading: state.post.get('pending'),
        error: state.post.get('error')
    }),
    (dispatch) => ({
        CounterActions: bindActionCreators(counterActions, dispatch),
        PostActions: bindActionCreators(postActions, dispatch)
    })
)(App);