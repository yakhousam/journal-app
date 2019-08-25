import { useState } from "react";
import fetch from "isomorphic-unfetch";

const NewNote = props => {
  // console.log("closeNewNote props =", props.title);
  const [formData, useForm] = useState({
    title: props.title || "",
    text: props.text || ""
  });

  const addNote = async () => {
    const res = await fetch(
      `/api/addNote/${props.userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title: formData.title, text: formData.text })
      }
    );
    const json = await res.json();
    // console.log("closeNewNote json.id =", json._id);

    useForm({ title: "", text: "" });
    props.closeNewNote(json.noteId);
  };

  const updateNote = async () => {
    const res = await fetch(`/api/updateNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        noteId: props.noteId,
        title: formData.title,
        text: formData.text
      })
    });
    const json = await res.json();
    // console.log("Update json.id ---------------------=", json);    

    useForm({ title: "", text: "" });
    props.closeNewNote(json.noteId);
  };

  const handelChange = e => {
    const { name, value } = e.target;
    useForm({ ...formData, [name]: value });
  };

  return (
    <div className="new-note">
      <form>
        <button className="btn-close" onClick={() => props.closeNewNote()}>
          close
        </button>
        <h1>new note</h1>
        <input
          name="title"
          type="text"
          placeholder="title"
          value={formData.title}
          onChange={handelChange}
        />
        <textarea name="text" value={formData.text} onChange={handelChange} />
        {!props.noteId && (
          <input type="button" value="add note" onClick={addNote} />
        )}
        {props.noteId && (
          <input type="button" value="Update note" onClick={updateNote} />
        )}
      </form>

      <style jsx>
        {`
          .new-note {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            min-height: 100vh;
            background: rgba(160, 160, 160, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
          }
          form {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            background: #fafafa;
            min-width: 50%;
            height: 95vh;
          }
          .btn-close {
            position: absolute;
            top: 5px;
            right: 5px;
          }
          textarea {
            width: 70%;
            height: 50%;
          }
        `}
      </style>
    </div>
  );
};

export default NewNote;
