import React, { useEffect, useState } from "react";
import fetch from "isomorphic-unfetch";

export default function Notes(props) {
  // console.log('entries entries')
  const [notes, useNotes] = useState([]);
  useEffect(() => {
    async function getNotes() {
      if(!props.userId) return
      try {
        // console.log('note list useeffect = ', props.query )
        const res = await fetch(`/api/getListeNotes/${props.userId}${props.query || ''}`);
        const json = await res.json();
        // console.log("getNotes notes=", json);
        // console.log('userId =', props.userId)
        useNotes(json);
      } catch (error) {
        console.error(error);
      }
    }
    getNotes();
  }, [props.updateNotes, props.userId, props.query]);
  const listNotes = notes.map((note) => {
    // // console.log('notes id =', note.id)
    return (
      <div className="note" key={note._id} onClick={() => props.onClick(note._id)}>
        <h2>{note.title}</h2>
        <p>{note.text}</p>
        <style jsx>{`
          .note {
            cursor: pointer;
            border-bottom: thin solid gray;
          }
          .note:nth-child(odd) {
            background: skyblue;
          }
          .note:nth-child(even) {
            background: lime;
          }
          h2 {
            margin: 0;
          }
        `}</style>
      </div>
    );
  }).reverse();
  return (
    <div className="notes">
      {listNotes}
      <style jsx>{`
        .notes {
          flex: 1;
        }
      `}</style>
    </div>
  );

}
