// by ionescuig

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session: 25,
      break: 5,
      timer: 1500,
      timerLabel: 'Session',
      timerState: 'stopped' };

    this.timerID = null;
    this.adjustSession = this.adjustSession.bind(this);
    this.adjustBreak = this.adjustBreak.bind(this);
    this.startStop = this.startStop.bind(this);
    this.countDown = this.countDown.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.clockify = this.clockify.bind(this);
  }

  adjustSession(value) {
    let newSession = this.state.session + parseInt(value);
    if (newSession > 0 && newSession < 61) {
      this.setState({
        session: newSession,
        timer: newSession * 60 });
    }
  }

  adjustBreak(value) {
    let newBreak = this.state.break + parseInt(value);
    if (newBreak > 0 && newBreak < 61) {
      this.setState({
        break: newBreak });
    }
  }

  startStop() {
    if (this.state.timerState == 'stopped') {
      this.timerID = setInterval(this.countDown, 1000);
      this.setState({
        timerState: 'playing' });
    }
    else {
      clearInterval(this.timerID);
      this.setState({
        timerState: 'stopped' });
    }
  }

  countDown() {
    let timer = this.state.timer - 1;
    this.setState({
      timer: timer });

    if (timer === 0) {this.audioBeep.play();};
    if (timer < 0) {
      if (this.state.timerLabel == 'Session') {
        this.setState({
          timerLabel: 'Break',
          timer: this.state.break * 60 });
      }
      else {
        this.setState({
          timerLabel: 'Session',
          timer: this.state.session * 60 });
      }
    }
  }

  resetTimer() {
    this.setState({
      session: 25,
      break: 5,
      timer: 1500,
      timerLabel: 'Session',
      timerState: 'stopped' });

    clearInterval(this.timerID);
    this.timerID = null;
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  }

  clockify() {
    let minutes = Math.floor(this.state.timer / 60);
    let seconds = this.state.timer - minutes * 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return minutes + ':' + seconds;
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "container" }, /*#__PURE__*/

      React.createElement("h1", null, "25+5 Clock"), /*#__PURE__*/


      React.createElement("div", { id: "time-set" }, /*#__PURE__*/
      React.createElement("div", { id: "time-session" }, /*#__PURE__*/
      React.createElement("p", { id: "session-label" }, "Session"), /*#__PURE__*/
      React.createElement("div", { class: "time-adjust" }, /*#__PURE__*/
      React.createElement("button", { id: "session-increment", onClick: () => this.adjustSession('1') }, /*#__PURE__*/React.createElement("i", { className: "fa fa-arrow-up " })), /*#__PURE__*/
      React.createElement("h3", { id: "session-length" }, this.state.session), /*#__PURE__*/
      React.createElement("button", { id: "session-decrement", onClick: () => this.adjustSession('-1') }, /*#__PURE__*/React.createElement("i", { className: "fa fa-arrow-down" })))), /*#__PURE__*/


      React.createElement("div", { id: "time-break" }, /*#__PURE__*/
      React.createElement("p", { id: "break-label" }, "Break"), /*#__PURE__*/
      React.createElement("div", { class: "time-adjust" }, /*#__PURE__*/
      React.createElement("button", { id: "break-increment", onClick: () => this.adjustBreak('1') }, /*#__PURE__*/React.createElement("i", { className: "fa fa-arrow-up" })), /*#__PURE__*/
      React.createElement("h3", { id: "break-length" }, this.state.break), /*#__PURE__*/
      React.createElement("button", { id: "break-decrement", onClick: () => this.adjustBreak('-1') }, /*#__PURE__*/React.createElement("i", { className: "fa fa-arrow-down" }))))), /*#__PURE__*/

      React.createElement("div", { id: "display" }, /*#__PURE__*/
      React.createElement("h3", { id: "timer-label" }, this.state.timerLabel), /*#__PURE__*/

      React.createElement("div", { id: "time-left" }, this.clockify()), /*#__PURE__*/
      React.createElement("button", { id: "start_stop", onClick: this.startStop }, /*#__PURE__*/
      React.createElement("i", { className: "fa fa-play" }), /*#__PURE__*/
      React.createElement("i", { className: "fa fa-pause" }), /*#__PURE__*/
      React.createElement("audio", { id: "beep", src: "https://onlineclock.net/audio/options/default.mp3", ref: audio => {this.audioBeep = audio;} })), /*#__PURE__*/

      React.createElement("button", { id: "reset", onClick: this.resetTimer }, /*#__PURE__*/
      React.createElement("i", { className: "fa fa-refresh" })))));
  }}
;

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("app"));
