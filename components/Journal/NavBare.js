import Select from './Select'
export default function NavBare(props){
    return(
        <div className="nav">
            <Select setNoteListQuery={props.setNoteListQuery}/>
            <h1>Journey</h1>
            <h2>{props.username}</h2>
            <a href='/logout'>Logout</a>
            <style jsx>{`
                .nav{
                    background: green;
                    height: 60px;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                }
            `}</style>
        </div>
    )
}