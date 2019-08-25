import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";

export default function Note(props) {
  // console.log('props note=', props.noteId)
  const [note, useNote] = useState(null);
  useEffect(() => {
    // console.log('useEffect noteDisplay')
    const getnote = async () => {
      if (!props.noteId ) return;
      const res = await fetch(`/api/getNote/${props.noteId}`);
      const json = await res.json();
       // console.log('json note one=', json)
      //  console.log('useEffect noteDisplay 22222')
      useNote(json);
    };
    getnote();
  },[props.updateNotes, props.noteId]);

  const deleteNote = async (noteId) =>{
    if(!noteId) return
    const res = await fetch(`/api/deleteNote/${noteId}`)
    const json = await res.json();
    // console.log('browser delete note =', res.status)
    if(json.noteId === noteId){
      useNote(null)
      props.refrech();
    }    
  }

  const updateNote = async (id) => {
    props.updateOneNote({id, text: note.text, title: note.title})
  }
   
  return (
    (note && (
      <div className="note">
        <h1>{note.title}</h1>
        <p>{note.text}</p>
        <div>
          <button onClick={()=> updateNote(props.noteId)}>edit</button>
          <button onClick={()=> deleteNote(props.noteId)}>delete</button>
        </div>
        <style jsx>{`
          flex: 1;
          margin-left: 1em;
        `}</style>
      </div>
    )) || (
      <div className="note">
        <style jsx>{`
          flex: 1;
          margin-left: 1em;
        `}</style>
      </div>
    )
  );
  
}
