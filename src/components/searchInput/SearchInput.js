import React, { Component } from 'react'
import {withRouter} from "react-router-dom"
import "./SearchInput.scss"
class SearchInput extends Component {
    handleClick = (params) => {
        this.props.history.push("/searchCenter");
    }
    
    render() {
        return (
            <div className="search-input" onClick={this.handleClick}>
                <div className="search-input-content">
                    搜索
                </div>
            </div>
        )
    }
}
export default withRouter(SearchInput)
