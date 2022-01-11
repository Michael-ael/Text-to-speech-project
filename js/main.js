const synth = window.speechSynthesis;

const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('#body');

//Init voice array

let voices = [];

const getVoices = () => {
  voices = synth.getVoices();

  //loop through voices

  voices.forEach(voice => {
    const option = document.createElement('option');

    option.textContent = voice.name + '('+ voice.lang +')';

    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voiceSelect.appendChild(option);
  });
};

getVoices();
if(synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

//function speak
const speak = () => {
//Add background body
// body.style.background = '#910101 url(../img/wave.gif)';
// body.style.backgroundRepeat = 'repeat-x';
// body.style.backgroundSize = '100% 100%';




  if(synth.speaking){
    console.error('Already speaking...');
    return;
  }

  if(textInput.value !== ''){
    // Get speak text

    const speakText = new SpeechSynthesisUtterance(textInput.value);

    speakText.onend = e => {
      console.log('Done speaking....');
    }

    speakText.onerror = e => {
      console.error('something went wrong');
    }

    //selected voice
    const selectedVoice = voiceSelect.selectedOptions[0]
    .getAttribute('data-name');

    //Loop through voices
    voices.forEach(voice => {
      if(voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    //set pitch and rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;
    //speak
    synth.speak(speakText);
  }
};

//Event listeners
textForm.addEventListener('submit', e => {
  e.preventDefault();
  speak();
  textInput.blur();
});

//Rate
rate.addEventListener('change', e => rateValue.textContent=rate.value);

pitch.addEventListener('change', e => pitchValue.textContent=pitch.value)

//voice select change
voiceSelect.addEventListener('change', e => speak());
