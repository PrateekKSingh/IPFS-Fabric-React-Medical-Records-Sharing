const showStatus = (text, bg) => {
    console.info(text)

    const log = document.getElementById('login-user-output')

    if (!log) {
      return
    }

    const line = document.createElement('p')
    line.innerText = text
    line.style.color = bg

    log.appendChild(line)
  }
export default showStatus;