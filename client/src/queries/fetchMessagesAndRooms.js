import gql from 'graphql-tag';

export default gql`
{
  rooms{
    name
    id
  }
  messages{
    id
    text
    room{
      id
    }
    user{
      username
    }
  }
}
`;
