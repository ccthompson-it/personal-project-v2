import request from 'superagent'

export function launchApp() {
    setButtons()
    request.get('/get-beat/1')
    .then(beat => { playBeat(beat.body) })
}

function setButtons () {
    var buttons = Array.from(document.getElementsByClassName('sound'))
    buttons.map((button, index) => {
      var newAudio = setAudio(button.id)
      setAudioEvent(button.id, newAudio, index)
    })
    document.getElementById('record').addEventListener('click', (e) => {
      checkRecordingStatus(buttons)
    })
}
  
function setAudioEvent (button, audio, index) {
    document.getElementById(button).addEventListener('click', (e) => {
      playAudio(audio)
    })
  
    addEventListener ('keydown', (key) => {
      if( key.key == index ){ playAudio(audio) }
    })
}
  
  
  // Sound Creation / Playing
  
function setAudio (sound) {
    return new Audio('audio/' + sound + '.wav')
  }
  
function playAudio (audio) {
    audio.load()
    audio.play()
}
  
  
  // Recording
  
function checkRecordingStatus (buttons) {
    var recButton = document.getElementById('record')
    if (recButton.classList.length > 0) {
      recButton.classList.remove('recording')
      removeAudioRecorders(buttons)
    } else {
      recButton.classList.add('recording')
      setRecordingListeners(buttons)
    }
    
}
  
function setRecordingListeners (buttons) {
    buttons.map((button, index) => {
      setAudioRecorder(button.id, index)
    })
}
  
function setAudioRecorder (button) {
    console.log('recording started')
    document.getElementById(button).addEventListener('click', recordButton)
    addEventListener ('keydown', recordKey)
}
  
function removeAudioRecorders (buttons) {
    console.log('recording stopped')
    buttons.map((button) => {
      document.getElementById(button.id).removeEventListener('click', recordButton)
    })
    removeEventListener('keydown', recordKey)
}
  
function recordButton (button) {
    console.log(button.target.id)
}
  
function recordKey (key) {
    const keyMatches = ['basskick', 'kick', 'snare', 'clap', 'snap', 'cowbell', 'crash', 'hat', 'softhat', 'coconut']
    if(keyMatches[(key.key)]) {console.log(keyMatches[(key.key)])}
}

  // Play PreRecorded Audio

function playBeat (beat) {
    let wait = 0
    beat.sounds = JSON.parse(beat.sounds)
    beat.timings = JSON.parse(beat.timings)
    
    for (let i = 0; i < beat.sounds.length; i++) {
        let audio = new Audio('audio/' + beat.sounds[i] + '.wav')
        if (i == 0) {
            playAudio(audio)
        }
        else {
            wait = beat.timings[i] - beat.timings[i-1]
            setTimeout(playAudio(audio), wait)
        }
    }
}

