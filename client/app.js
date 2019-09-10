import request from 'superagent'

export function launchApp() {
  setButtons()
  setUniqueButtons()
}

function setButtons() {
  var buttons = Array.from(document.getElementsByClassName('sound round'))
  buttons.map((button, index) => {
    var newAudio = setAudio(button.id)
    setAudioEvent(button.id, newAudio, index)
  })
  document.getElementById('record').addEventListener('click', () => {
    checkRecordingStatus(buttons)
  })
}

function setUniqueButtons() {
  document.getElementById('play').addEventListener('click', () => {
    request.get('/get-beat')
    .then(beat => { playBeat(beat.body, 0) })
  })
  document.getElementById('clear').addEventListener('click', () => {
    request.post('/clear-beat')
    .then(() => { alert('Audio Cleared') })
  })
}

function setAudioEvent(button, audio, index) {
  document.getElementById(button).addEventListener('click', () => {
    playAudio(audio)
  })

  addEventListener('keydown', (key) => {
    if (key.key == index) { playAudio(audio) }
  })
}


// Sound Creation / Playing

function setAudio(sound) {
  return new Audio('audio/' + sound + '.wav')
}

function playAudio(audio) {
  audio.load()
  audio.play()
}


// Recording

function checkRecordingStatus(buttons) {
  var recButton = document.getElementById('record')
  if (recButton.classList.length > 1) {
    recButton.classList.remove('recording')
    removeAudioRecorders(buttons)
  } else {
    recButton.classList.add('recording')
    setRecordingListeners(buttons)
  }

}

function setRecordingListeners(buttons) {
  buttons.map((button, index) => {
    setAudioRecorder(button.id, index)
  })
}

function setAudioRecorder(button) {
  console.log('recording started')
  document.getElementById(button).addEventListener('click', recordButton)
  addEventListener('keydown', recordKey)
}

function removeAudioRecorders(buttons) {
  console.log('recording stopped')
  buttons.map((button) => {
    document.getElementById(button.id).removeEventListener('click', recordButton)
  })
  removeEventListener('keydown', recordKey)
}

function recordButton(button) {
  request.post('/add-beat/' + button.target.id).then(() => {
    console.log(button.target.id)
  })
  

}

function recordKey(key) {
  const keyMatches = ['basskick', 'kick', 'snare', 'clap', 'snap', 'cowbell', 'crash', 'hat', 'softhat', 'coconut']
  if (keyMatches[(key.key)]) { 
    request.post('/add-beat/' + keyMatches[(key.key)]).then(() => {
      console.log(keyMatches[(key.key)])
    }) 
  }
}

// Play PreRecorded Audio

function playBeat(beat, count) {
  
  let wait = 0

  let audio = new Audio('audio/' + beat[count].sound + '.wav')

  playAudio(audio)

  if (count == beat.length - 1) {
    console.log('audio finished')
  }

  else {
    wait = beat[count + 1].timing - beat[count].timing
    console.log(beat[count], wait)
    count += 1
    setTimeout(() => playBeat(beat, count), wait)
  }
}

