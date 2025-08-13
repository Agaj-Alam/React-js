async function startLiveGemini() {
  const pc = new RTCPeerConnection();

  // Play Gemini's audio output
  const audioEl = document.createElement('audio');
  audioEl.autoplay = true;
  pc.ontrack = e => audioEl.srcObject = e.streams[0];

  // Capture mic audio
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  stream.getTracks().forEach(track => pc.addTrack(track, stream));

  // Create an SDP offer
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);

  // Send SDP to Gemini Live API
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-live-2.5-flash-preview-native-audio:streamGenerateContent?alt=sdp&key=YOUR_API_KEY`,
    {
      method: "POST",
      body: offer.sdp,
      headers: { "Content-Type": "application/sdp" },
    }
  );

  // Set remote description from Gemini's answer
  const answer = {
    type: "answer",
    sdp: await response.text(),
  };
  await pc.setRemoteDescription(answer);
}

startLiveGemini();
