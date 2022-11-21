// import React, { Component } from 'react' 
const NewsItems =(props)=>{
    
        let {title,description,imageUrl,newsUrl,author, date,source }=props;
        return (
            <div className='my-2 '>
                <div className="card">

                <div style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:0}}>
                <span className="badge bg-danger">{source}</span>
                </div>    
                
                    <img className="card-img-top" src={!imageUrl?"https://www.reuters.com/resizer/_zS0a3jbsF1evy9NTeNfRp8up1g=/1200x0/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/DAYILQJWWVNYXKGSCI5CRTQRPY.jpg":imageUrl} alt=""/>
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <p className="card-text"><small className="text-danger">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
                            <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More </a>
                        </div>
                </div>
            </div>
        )
    }

export default NewsItems