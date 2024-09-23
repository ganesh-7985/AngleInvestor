import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';

const VideoCall = () => {
  const [peer, setPeer] = useState(null);
  const [stream, setStream] = useState(null);
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);

  const userVideo = useRef();
  const partnerVideo = useRef();
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:5050");
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      setStream(stream);
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });

    socketRef.current.on("hey", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    });
  }, []);

  function callPeer(id) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", data => {
      socketRef.current.emit("callUser", { userToCall: id, signalData: data, from: socketRef.current.id })
    });

    peer.on("stream", stream => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    socketRef.current.on("callAccepted", signal => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    setPeer(peer);
  }

  function acceptCall() {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", data => {
      socketRef.current.emit("acceptCall", { signal: data, to: caller })
    });

    peer.on("stream", stream => {
      partnerVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    setPeer(peer);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="video-container grid grid-cols-2 gap-4">
        <video playsInline muted ref={userVideo} autoPlay className="w-full h-auto" />
        {callAccepted && (
          <video playsInline ref={partnerVideo} autoPlay className="w-full h-auto" />
        )}
      </div>
      <div className="controls mt-4 space-x-2">
        <button onClick={() => callPeer('someUserId')} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Call
        </button>
        {receivingCall && !callAccepted && (
          <button onClick={acceptCall} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Answer
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoCall;