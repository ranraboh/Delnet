import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { createMember } from '../../actions/projects.js'
import { isUserExists } from '../../actions/users.js';

class AddMember extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            member: {
                project: props.project_id,
                user: '',
                role: '',
                premissions: '1'
            },
            validation: {
                user: false,
                role: false,
                premissions: false
            },
        }

        /* bind internal methods */
        this.on_change = this.on_change.bind(this);
        this.add_member = this.add_member.bind(this);
        this.reset_handler = this.reset_handler.bind(this);
        this.user_validation = this.user_validation.bind(this);
        this.validation_success = this.validation_success.bind(this);
        this.validation_fail = this.validation_fail.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            project: nextProps.project_data
        })
        console.log(this.state)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    validation_fail(field, error) {
        let element_name = field + '-input'
        document.getElementById(element_name).className = 'input-projects input-validate-danger';
        this.state.validation.user = false;
    }

    validation_success(field) {
        let element_name = field + '-input'
        document.getElementById(element_name).className = 'input-projects input-validate-success';
        this.state.validation.user = true;
    }

    user_validation(e) {
        console.log(this.props.users_queries)
        let user_search = e.target.value;
        if (!this.props.users_queries || this.props.users_queries[user_search] === undefined) {
            this.props.isUserExists(user_search);
        } 
        console.log(this.props.users_queries[user_search])
        if (e.target.value == '')
            this.validation_fail('user', 'user is not specified');
        else if (this.props.users_queries[user_search] === false || this.props.users_queries[user_search] === 'false')
            this.validation_fail('user', 'user is not exist')
        else 
            this.validation_success('user')
    }

    add_member() {
        this.props.createMember(this.state.member);
        alert('the member was inserted successfully')
        this.reset_handler()
    }

    reset_handler() {
        this.setState({
            member: {
                project: this.props.project_id,
                user: '',
                role: '',
                premissions: '1'
            },
            validation: {
                user: false,
                role: false,
                premissions: false
            },
        })
        document.getElementById('user-input').className = 'input-projects';

    }

    on_change(field, value) {
        let member = this.state.member;
        member[field] = value;
        this.setState({
            member
        })
    }

    render() {
        return (
        <div id="projects-create">
            <div className="row row-form">
                <div className="col-2">
                    <p className="project-form-field">User</p>
                </div>
                <div className="col-6">
                    <div class="value">
                        <input id="user-input" class="input-projects" type="text" name="user"
                         value={ this.state.member.user } placeholder="Enter the new-join user"
                            onChange={ (e) => this.on_change('user', e.target.value) } 
                            onBlur={ this.user_validation }/>
                    </div>
                </div>
            </div>
            <div className="row row-form">
                <div className="col-2">
                    <p className="project-form-field">Role</p>
                </div>
                <div className="col-6">
                    <div class="value">
                        <input className="input-projects" name="role" value={ this.state.member.role }
                          onChange={ (e) => this.on_change('role', e.target.value) }
                          placeholder="Enter the member role" />
                    </div>
                </div>
            </div>
            <div className="row row-form">
                <div className="col-2">
                    <p className="project-form-field">Premissions</p>
                </div>
                <div className="col-6">
                    <div class="value">
                        <input type='number' min="1" max="5" className="input-projects" name="premissions" value={ this.state.member.premissions }
                        onChange={ (e) => this.on_change('premissions', e.target.value) }  />
                    </div>
                </div>
            </div>
            <p/>
            <button class="btn create-button" onClick={ this.add_member }>Add Member</button>&nbsp;&nbsp;
            <button class="btn create-button" onClick={ this.reset_handler }>Reset</button>
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.authentication.user,
        project_id: state.projectReducer.project_selected.id,
        users_queries: state.userReducer.users_queries,
        query_receive: state.userReducer.query_receive
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createMember: (member) => {
            dispatch(createMember(member));
        },
        isUserExists: (username) => {
            dispatch(isUserExists(username));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMember);
