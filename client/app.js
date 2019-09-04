import request from 'superagent'


export function launchApp() {
  setButtons()
  document.getElementById('play').addEventListener('click', (e) => {
    request.get('/get-beat/1')
    .then(beat => { playBeat(beat.body, 0) })
  })
}

function setButtons() {
  var buttons = Array.from(document.getElementsByClassName('sound'))
  buttons.map((button, index) => {
    var newAudio = setAudio(button.id)
    setAudioEvent(button.id, newAudio, index)
  })
  document.getElementById('record').addEventListener('click', (e) => {
    checkRecordingStatus(buttons)
  })
}

function setAudioEvent(button, audio, index) {
  document.getElementById(button).addEventListener('click', (e) => {
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
  if (recButton.classList.length > 0) {
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
  request.post('/add-beat/' + button.target.id).then(res => {
    console.log(button.target.id)
  })
  

}

function recordKey(key) {
  const keyMatches = ['basskick', 'kick', 'snare', 'clap', 'snap', 'cowbell', 'crash', 'hat', 'softhat', 'coconut']
  if (keyMatches[(key.key)]) { 
    request.post('/add-beat/' + keyMatches[(key.key)]).then(res => {
      console.log(keyMatches[(key.key)])
    }) 
  }
}

// Play PreRecorded Audio

function playBeat(beat, count) {
  console.log(beat, count)
  let wait = 0

  let audio = new Audio('audio/' + beat[count].sound + '.wav')

  playAudio(audio)

  if (count == beat.length - 1) {
    console.log('audio finished')
  }

  else {
    wait = beat[count + 1].timing - beat[count].timing
    count += 1
    setTimeout(() => playBeat(beat, count), wait)
  }
}

