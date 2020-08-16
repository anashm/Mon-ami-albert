import React from 'react'
import Pdf from "react-to-pdf";



const  TestPDF = (props) => {
    console.log(props)
    const refs = React.createRef();
    return (
        
        <div>
           
            <div className="Post" ref={refs}>
                <h1>this is title</h1>
                <p>ceci est le contenu</p>
                <p>ceci est un text</p>
            </div>
            <Pdf targetRef={refs} filename="post.pdf">
                {({ toPdf }) => <button onClick={toPdf}>Dowload Anas PDF</button>}
            </Pdf>
            
        </div>
    )
}

export default TestPDF