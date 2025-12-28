import { Fragment, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'

// components 
import SecretListener from './components/SecretListener'
import ListSecrets from './components/ListSecrets'

function App() {
  const [count, setCount] = useState(0);
  let infoVisibility = false;

  const toggleInfoVisibility = () => {
    const projectDescription = document.querySelector('#projectDescription');
    const well = document.querySelector('.Well');

    if (!infoVisibility && projectDescription && projectDescription != null && projectDescription != undefined) {
      projectDescription.style.display = 'inline';
      well.style.opacity = .1;
      infoVisibility = true;
    } else {
      projectDescription.style.display = 'none';
      well.style.opacity = 1;
      infoVisibility = false;
    }
  }

  return (
    <>
      <p id="title">Well of Secrets</p>
      <div className='Well'>
        <SecretListener />
        <ListSecrets />
      </div>
      <p id="info" onClick={toggleInfoVisibility}>Info</p>
      <div id="projectDescription">
        <p>i carry a lot of shame in myself. some of it is based on me being born a queer person in a xenophobic world, some i learnt from people around me, and other is caused by the actions i regret. one day i thought that maybe the only way to get free from it is to say out loud the things i'm most afraid of admitting. maybe that's why various religions have rites of confession — in order to feel lighter, you must put down all that weight you carry</p>
        <p>this is a collective art project initiated by me and enriched by any interested anonymous person. it's a place where anyone can put down their heaviest secrets</p>
      </div>
    </>
  )
}

export default App
