const router = require('express').Router();
const Journal = require('../models/journal')


router.get("/api/getListeNotes/:userId", async (req, res) => {
  const userId = req.params.userId;
  const query = req.query
  console.log('getlist query =', query)
  try {
    const filter = {userId, ...query}
    console.log('getlistNotes filter =', filter)
    const notes = await Journal.find(filter)
    // console.log('user id=', id)
    // console.log('getListeNotes =', notes)
    res.json(notes)
  } catch (error) {
    console.error(error)
    res.json(error)
  }
});
router.get("/api/getNote/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const note = await Journal.findById(id)
    res.json(note)
  } catch (error) {
   console.error(error) ;
   res.json(error)
  }
});
router.get("/api/getNotesTitles/:userId", async (req, res) => {
  const userId = req.params.userId
  try {
    const titles = await Journal.find({userId},{'_id': 0, 'title': 1})
    // // console.log('api titles =', titles)
    res.json(titles)
  } catch (error) {
    console.error(error)
    res.json(error)
  }
});
router.post("/api/addNote/:userId", async (req, res) => {
  const { title, text } = req.body;
  const userId = req.params.userId;
  try {
    const newNote = await Journal.create({title, text, userId})
    const note = await newNote.save()
    res.json({noteId: note._id})
  } catch (error) {
    console.error(error)
    res.json(error)
  }
});
// delete note
router.get('/api/deleteNote/:noteId', async (req, res) =>{
  const noteId = req.params.noteId;
  try {
    const note = await Journal.findByIdAndDelete(noteId)
    // console.log('delete note =', note)
    res.json({noteId: note._id})
  } catch (error) {
    console.error(error)
    res.json(error)
  }
})

router.post('/api/updateNote', async (req, res) =>{
  const {noteId, title, text} = req.body;
 try {
  const note = await Journal.findByIdAndUpdate(noteId, {title, text})
  console.log('update note ----------=', note)
  res.json({noteId: note._id})
 } catch (error) {
   console.error(error);
   res.json(error)
 }
})

module.exports = router;