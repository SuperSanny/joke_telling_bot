import 'regenerator-runtime/runtime';
import { useState, useEffect } from 'react';
import axios from 'axios';
import botGif from './assets/bot-gif.gif';

function App() {
  const [joke, setJoke] = useState({ setup: null, punchline: null });
  const [loading, setLoading] = useState(false);
  const synth = window.speechSynthesis;
  const voice = synth.getVoices();
  const getJoke = async () => {
    setLoading(true);
    const { data } = await axios.get(
      'https://official-joke-api.appspot.com/random_joke'
    );
    let newJoke = {
      setup: data.setup,
      punchline: data.punchline,
    };
    setJoke({ ...newJoke });
    let temp = `${data.setup}...............${data.punchline}`;
    const utterThis = new SpeechSynthesisUtterance(temp);
    utterThis.voice = voice[4];
    utterThis.rate = 0.85;
    utterThis.pitch = 0.5;
    utterThis.volume = 0.75;
    utterThis.lang = 'en-US';
    synth.speak(utterThis);
    setLoading(false);
  };
  return (
    <>
      <div className='vh-100 d-flex justify-content-center align-items-center'>
        <div className="text-center">
            <p>{joke.setup}</p>
          <div className='mb-4'>
            <img
              className="img-fluid mb-2"
              src={ botGif }
              alt="joke robot"
            />
            <p>{joke.punchline}</p>
          </div>
          <button
            type="button"
            className="btn btn-sm btn-outline-primary"
            onClick={getJoke}
          >
            {loading && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            {!loading && `TELL ME A JOKE`}
          </button>
        </div>
      </div>
    </>
  )
}

export default App
