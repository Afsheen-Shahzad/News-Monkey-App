import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
        return (
            <div className='my-3'>
                <div className="card">
                    <div style={{ position: 'absolute', right: "0", display: "flex", justifyContent: 'flex-end' }}>
                        <span className=" badge rounded-pill bg-danger">{source}</span>
                    </div>
                    <img src={!imageUrl ? 'https://segensolar.co.za/wp-content/uploads/2020/11/SE-5000H-RWS-3.jpg' : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>

                        <p className="card-text">{!description ? '' : description}...</p>
                        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-dark btn-sm">Read More</a>
                        <p className="card-text"><small className='text-muted'>By {!author ? 'Anonymous' : author} on {new Date(date).toGMTString()} </small></p>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem