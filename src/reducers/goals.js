// TODO: update goals to be loaded from a data store
const INITIAL_STATE = [
  {
    id: 0,
    name: 'Getting fit',
    color: 'salmon',
    subgoals: [
      {
        id: 2,
        name: 'Memes',
        completed: false,
        points: 0,
        daily: false,
        subgoals: [
          {
            id: 3,
            name: 'Nesting',
            completed: true,
            points: 0,
            daily: false,
            subgoals: []
          },
          {
            id: 4,
            name: 'This is a goal with a particularly long name, created for the purpose of demonstrating multiline functionality whereby multiple lines of text can be displayed in a single element!',
            completed: true,
            points: 0,
            daily: false,
            subgoals: []
          }
        ]
      }
    ],
    completed: false,
    points: 0,
    daily: false
  },
  {
    id: 1,
    name: 'Reading',
    color: 'aquamarine',
    subgoals: [],
    completed: false,
    points: 0,
    daily: false
  }
];

function goalsReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		default: return state;
	}
}

export default goalsReducer;