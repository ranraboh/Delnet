import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getQuestions, getFollowedQuestions, getQuestionsGroup, getUserQuestions } from '../../actions/posts/get'
import Question from './question'

class QuestionBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
        }
        this.more_handler = this.more_handler.bind(this);
        this.get_questions = this.get_questions.bind(this);
    }

    get_questions() {
        if (this.props.status == 'HOME') 
            this.props.getQuestions(this.props.username ,this.state.page)
        else if (this.props.status == 'GROUP')
            this.props.getQuestionsGroup(this.props.group.id, this.props.username, this.state.page)
        else if (this.props.status == 'MY_QUESTIONS')
            this.props.getUserQuestions(this.props.username, this.state.page)
        else if (this.props.status == 'FOLLOWED_QUESTIONS')
            this.props.getFollowedQuestions(this.props.username, this.state.page)        
    }

    more_handler() {
        this.setState({
            page: this.state.page + 1
        }, () => {
            this.get_questions()
        })
    }

    render() {
        if (this.props.status == 'MY_POSTS' || this.props.status == 'FOLLOWED_POSTS' ||  this.props.status == 'FOLLOWED_VIDEOS') {
            return ''
        }
        if (this.props.questions.length == 0 && this.props.empty == false) {
            if (this.state.page == 1)
                this.get_questions()
            else {
                this.setState({
                    ...this.state,
                    page: 1,
                }, () => {
                    this.get_questions()
                    return ''
                })
            }
        }
        if (this.props.questions.length == 0)
            return ''
        return (
            <div id="posts-section">
                <h5 class="category-title">Questions</h5>
                {
                    this.props.questions.map((record) => 
                        <Question id={ record.id } title={ record.title } description={ record.description } time={ record.time } date={ record.date } user={ record.user } image={ record.image } content={ record.content }
                            likes={ record.quantity.likes } comments={ record.quantity.comments } comments_data={ record.comments } like_id={ record.like_id } groups={ record.groups } followed={ record.followed } />
                    )
                }
                 <a id="projects_button" className="button-v2" onClick={ this.more_handler }>
                        <svg class="icon-arrow before">
                            <use href="#arrow"></use>
                        </svg>
                        <span class="label">More</span>
                        <svg class="icon-arrow after">
                            <use href="#arrow"></use>
                        </svg>
                    </a>
                    <svg>
                    <defs>
                        <symbol id="arrow" viewBox="0 0 35 15">
                        <title>Arrow</title>
                        <path d="M27.172 5L25 2.828 27.828 0 34.9 7.071l-7.07 7.071L25 11.314 27.314 9H0V5h27.172z "/>
                        </symbol>
                    </defs>
                    </svg>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        loggedIn: state.authentication.loggedIn,
        username: state.authentication.user,
        questions: state.postsReducer.questions,
        status: state.postsReducer.status,
        group: state.postsReducer.group_selected,
        empty: state.postsReducer.empty.questions
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getQuestions: (user, page) => {
            dispatch(getQuestions(user, page))
        },
        getQuestionsGroup: (group, user, page) => {
            dispatch(getQuestionsGroup(group, user, page))
        },
        getUserQuestions: (user, page) => {
            dispatch(getUserQuestions(user, page))
        },
        getFollowedQuestions: (user, page) => {
            dispatch(getFollowedQuestions(user, page))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionBoard);