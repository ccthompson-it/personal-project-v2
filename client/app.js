import request from 'superagent'

export function launchApp() {
  setButtons()
  setUniqueButtons()
}


// Buttons 

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
  setPlayButton()
  setClearButton()
  setTicker()
}

function setPlayButton() {
  document.getElementById('play').addEventListener('click', (e) => {
    console.log('working')
    e.target.disabled = true
    request.get('/get-beat')
    .then(beat => { 
      if(beat.body.length > 0) {
        playBeat(beat.body, 0)
      } else {
        e.target.disabled = false
      }
    })
  })
}

function setClearButton() {
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

// metronome

function setTicker() {
  document.getElementById('ticker').addEventListener('click', (e) => {
    let bpm = document.getElementById('slider').value
    if (checkTickerStatus()) {loopTicker(bpm)}
  })
}

function checkTickerStatus () {
  let tickButton = document.getElementById('slider')
  if(tickButton.classList.length == 0) {
    tickButton.classList.add('ticking')
    return true
  } else {
    tickButton.classList.remove('ticking')
    return false
  }
}

function loopTicker(bpm) {
  let ticker = setInterval(() => {
    if(document.getElementById('slider').classList.length == 0){
      clearInterval(ticker)
    }
    playAudio(setAudio('softhat'))
  }, (60000 / bpm))
  
}

// Recording

function checkRecordingStatus(buttons) {
  var recButton = document.getElementById('record')
  if (recButton.classList.length > 2) {
    recButton.classList.remove('recording')
    document.getElementsByTagName('span')[0].id = ''
    removeAudioRecorders(buttons)
  } else {
    recButton.classList.add('recording')
    document.getElementsByTagName('span')[0].id = 'rec-status'
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
    document.getElementById('play').disabled = false
    console.log('audio finished')
  }

  else {
    wait = beat[count + 1].timing - beat[count].timing
    count += 1
    setTimeout(() => playBeat(beat, count), wait)
  }
}

