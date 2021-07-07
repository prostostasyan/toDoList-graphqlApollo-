const {ApolloServer, gql} = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`

    type Post {
        id: ID!
        description: String!
        check: Boolean!
    }

    type Query {
        posts: [Post]!
        post(id: ID!): Post!
    }
    type Mutation {
        createPost(description: String!): Post!
        updatePost(id: ID!, description: String, check:Boolean): Post!
        deletePost(id: ID!): Post!
    }
`;

let posts = [
    {
        id: 0,
        description: 'test1',
        check: false
    },
    {
        id: 1,
        description: 'test2',
        check: true
    }
];

let _id = 3;

const resolvers = {
    Query: {
        posts: () => posts,
        post: (parent, {id}) => {
            return posts.find(post => post.id === +id)
        }
    },
    Mutation: {
        createPost: (parent, {description}) => {
            const newPost = {
                description: description,
                id: _id++,
                check: false
            }
            posts = [...posts, newPost];
            return newPost;
        },
        deletePost: (parent, {id}) => {
            const deletedPost = posts.find(post => post.id === +id)
            posts = posts.filter(post => post.id !== +id);
            return deletedPost;
        },
        updatePost: (parent, {id, check, description})=>{
            const oldPost = posts.find(post => post.id === +id);
            if (typeof check == "boolean"){
                oldPost.check = check
            }
            if (description){
                oldPost.description = description
            }
            return oldPost;
        }

    }
};


const server = new ApolloServer({typeDefs, resolvers});
server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
});

