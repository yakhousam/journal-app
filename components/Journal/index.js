import fetch from 'isomorphic-unfetch'
import { useState, useEffect, useContext } from "react";
import NotesList from "./NotesList";
import SearchBare from "./SearchBare";
import NoteDisplay from "./NoteDisplay";
import NavBare from "./NavBare";
import ToolBar from "./ToolBar";
import NewNote from "./NewNote";

import userContext from '../UserContext'

export default function Journal() {
    const {user} = useContext(userContext)
    //  console.log('user context =', user)
   
    const [username, useUsername] = useState('')
    const [noteId, useNoteId] = useState();
    const [noteListQuery, useNoteListQuery] = useState('');
    const [rootUrl, useRoute_url] = useState('')

    const [updateNoteId, useUpdateNoteId] = useState()
    const [updateText, useUpdateText] = useState()
    const [updateTitle, useUpdateTitle] = useState()

    const [showNewNote, useShowNewNote] = useState(false);
    const [updateNotes, useUpdateNotes] = useState(false);

    useEffect(()=>{
      const getRootUrl = async () =>{
        if(window){
          const root_url = await window.location.href.replace(window.location.pathname, '')
          // console.log('root url =', root_url)
          useRoute_url(root_url)
        }
        getRootUrl()
      }
    },[])
  
     useEffect(()=>{        
        // console.log('user id', user)
        const getUsername = async ()=>{
          if(!user) return         
          // console.log(`${rootUrl}/getUserInfos/${user}`)
           const res = await fetch(`/getUserInfos/${user}`)
           const json = await res.json();
           // // // console.log('json home =', json)
           useUsername(json.username)
        }
        getUsername()
     },[user])
  
    const displayNote = id => {
      useNoteId(id);
    };

    const refrech = ()=>{
      useUpdateNotes(!updateNotes)
    }

    const newNote = () => {
     useShowNewNote(true);      
    };


    const closeNewNote = (id)=>{
      useShowNewNote(false)
      useUpdateNoteId(null);
      useUpdateText(null)
      useUpdateTitle(null);
      if (id) {
        useNoteId(id);
        refrech()
      }
    }

    const updateOneNote = ({id, text, title})=>{
      if(!id) return;
     useUpdateNoteId(id);
     useUpdateText(text)
     useUpdateTitle(title);
     useShowNewNote(true)
     refrech()
    }
   
    const setNoteListQuery = (query) =>{
      useNoteListQuery(query)
      // console.log('index query =', query)
    }
    // console.log('notelistQuery =', noteListQuery)
    return (
      
      <div>
        <NavBare username={username} setNoteListQuery={setNoteListQuery} />
        <div className="container">
          <ToolBar newNote={newNote}  showNewNote={showNewNote} />
          <div className='note-list'>
            <SearchBare url_root={rootUrl} updateNotes={updateNotes} userId={user} setNoteListQuery={setNoteListQuery} />
            <NotesList url_root={rootUrl} onClick={displayNote} updateNotes={updateNotes} userId={user} query={noteListQuery}/>
          </div>
          <NoteDisplay url_root={rootUrl} className='display-note' noteId={noteId} refrech={refrech} updateOneNote={updateOneNote} updateNotes={updateNotes}/>
          {showNewNote && <NewNote url_root={rootUrl} closeNewNote={closeNewNote} userId={user} noteId={updateNoteId} text={updateText} title={updateTitle} />}
          <style jsx>{`
            .container {
              display: flex;
              justify-content: center;
              flex-wrap: wrap;
            }
            .note-list{
              flex: 1;
            }
            .display-note{
              flex: 1;
            }
          `}</style>
          <style global jsx>{`
            html,
            body {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
          `}</style>
        </div>
      </div>
    );
  }