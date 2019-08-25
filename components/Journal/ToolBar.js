

export default function ToolBar(props){
    return(
        <div className='tool-bar'>
            <button onClick={()=>props.newNote()}></button>
            <style jsx>{`
                button{
                    width: 30px;
                    height: 30px;
                    background:  url('/static/add-256.ico') center / 90% no-repeat;
                }
                .tool-bar{
                    padding: 1em;
                }
            `}</style>
        </div>
    )
}