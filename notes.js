const fs = require('fs');
const chalk = require('chalk');

const getNotes =   () =>{
    return 'Your notes...'
}

const addNote =  (title, body) =>{
    const notes = loadNotes();
    console.log(notes);
    //const duplicateNotes = notes.filter(  (note) => note.title === title)

   // //const duplicateNotes = notes.filter(function (note) {
      //  return note.title === title
    //})
    const duplicateNote = notes.find((note)=> note.title === title);
    debugger
    if (!duplicateNote  ) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New note added!')
    } else {
        console.log('Note title taken!')
    }
}

const removeNote= function(title){
   const notes  = loadNotes();
   const notesToKeep = notes.filter(function(notes){
       return notes.title!==title;
   })
   if(notes.length>notesToKeep.length){
       console.log(chalk.green.inverse('Note Removed'));
   saveNotes(notesToKeep);
}
   else{
    console.log(chalk.red.inverse('No Note found!'));

   }
}
const listNotes = () =>{
   const notes =loadNotes();

   console.log(chalk.inverse('Your Notes!'));

   notes.forEach((note) =>{
       console.log(note.title);
   })
}

const readNotes = (title)=>{
    const notes =loadNotes();
    const note =notes.find((note)=>note.title==title);
  if(note){
      console.log(chalk.inverse(note.title));
      console.log(note.body);
  }
  else{
    console.log(chalk.inverse.red('Note not found!'));
  }

   

}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote:removeNote,
    listNotes:listNotes,
    readNotes: readNotes
}