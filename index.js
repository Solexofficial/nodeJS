const yargs = require('yargs');
const pkg = require('./package.json');
const { addNote, getNotes } = require('./notes.controller');

yargs.version(pkg.version);

yargs.command({
  command: 'add',
  describe: 'Add new note to list',
  builder: {
    title: {
      type: 'string',
      describe: 'Note title',
      demandOption: true,
    },
  },
  handler({ title }) {
    addNote(title);
  },
});

yargs.command({
  command: 'list',
  describe: 'Print all notes',
  async handler() {
    const notes = await getNotes();
    console.log(notes);
  },
});

yargs.parse();
