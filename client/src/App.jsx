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
      projectDescription.style.display = 'flex';
      setTimeout(() => {
        projectDescription.style.opacity = '1';
      projectDescription.style.filter = 'blur(0px)';
      well.style.opacity = .1;
      infoVisibility = true;
      }, 10)
    } else {
      projectDescription.style.filter = 'blur(8px)';
      projectDescription.style.opacity = '0';
      well.style.opacity = 1;
      setTimeout(() => {
        projectDescription.style.display = 'none';
        infoVisibility = false;
      }, 400)
    }
  }

  return (
    <>
      <p id="title">Well of Secrets</p>
      
      <p id="info" onClick={toggleInfoVisibility}>Info</p>
      <div id="projectDescription">
        <div id="overlay" onClick={toggleInfoVisibility}></div>
        <div>
          <p>I carry a lot of shame in myself. Some of it is based on me being born a queer person in a xenophobic world, some I learnt from people around me, and other is caused by the actions i regret. </p>
        <p>One day I thought that maybe the only way to get free from it is to say out loud the things I'm most afraid of admitting. maybe that's why various religions have rites of confession — in order to feel lighter, you must put down all that weight you carry.</p>
        <p>This is a collective art project initiated by me and enriched by any interested anonymous person. It's a place where anyone can put down their heaviest secrets without being judged — because no know will know which confession belongs to whom.</p>
        </div>
        
        
      </div>
      <div className='Well'>
        <SecretListener />
        <ListSecrets />
      </div>
    </>
  )
}

export default App
