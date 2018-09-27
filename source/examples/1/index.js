const appState = {
    posts: [
        {
            id:      '123',
            comment: 'Hi!',
            author:  { id: '321', name: 'Jane', gender: 'female' },
        },
        {
            id:      '456',
            comment: 'Goodbye!',
            author:  { id: '321', name: 'Merry', gender: 'female' },
        },
        {
            id:      '789',
            comment: 'Good morning!',
            author:  { id: '654', name: 'Mike', gender: 'male' },
        },
        {
            id:      '749',
            comment: 'Good afternoon!',
            author:  { id: '321', name: 'Jane', gender: 'female' },
        },
        {
            id:      '741',
            comment: 'Good night!',
            author:  { id: '651', name: 'Jack', gender: 'male' },
        },
    ],
    users: [
        { id: '321', name: 'Jane', gender: 'female' },
        { id: '654', name: 'Mike', gender: 'male' },
        { id: '323', name: 'Mery', gender: 'female' },
        { id: '651', name: 'Jack', gender: 'male' },
    ],
    counter: 2,
};

const selectPosts = (state) => state.posts;

const posts = selectPosts(appState);

console.log('• selected posts ←←← •', posts);
