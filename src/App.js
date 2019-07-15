import React from 'react';
import './App.css';
import { getUserAndRepos } from './services/github';
import UserProfile from './components/UserProfile';
import UserPicker from './components/UserPicker';
import RepoListing from './components/RepoListing';

function App() {
  const [username, updateUsername] = React.useState(undefined);
  const [user, updateUser] = React.useState({});

  React.useEffect(() => {
    if (!username) {
      return;
    }

    (async () => {
      updateUser(await getUserAndRepos(username));
    })()

  }, [updateUser, username])

  return (
    <div className="App">
      <header className="App-header">
        <h1>An Unexpected Party</h1>
        <p>
          Certain wizard always vetted his co-conspirators, so should you. Pick a name to see what they've been up to.
        </p>
        <UserPicker onChange={updateUsername} />
      </header>
      <section id="userInfo">
        <UserProfile data={user} />
      </section>
      <section id="repoListing">
        <RepoListing data={user.repositories} user={user.login} />
      </section>
    </div>
  );
}

export default App;
