import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Modal from "../Modal";
import history from "../../history";
import { deleteStream, fetchStream } from "../../actions";

class StreamDelete extends React.Component {

    componentDidMount () {
        this.props.fetchStream(this.props.match.params.id)
    }

    onDismiss = () => {
        history.push('/');
    }

    onDelete = () => {
        this.props.deleteStream(this.props.match.params.id);
    }

    renderActions = () => {
        return (
            <React.Fragment>
                <button 
                    className="ui button negative"
                    onClick={this.onDelete}
                >
                    Delete
                </button>
                <Link
                    className="ui button"
                    to="/"
                >  
                    Cancel
                </Link>
            </React.Fragment>
        );
    }



    render () {
        const content = this.props.stream ? `Are you sure you want to delete ${this.props.stream.title}`:  "Loading..";
        return (
            <div>
                <Modal 
                    title="Delete Stream"
                    content={content}
                    actions={this.renderActions()}
                    onDismiss={this.onDismiss}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, {deleteStream, fetchStream})(StreamDelete);