import React, { useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

export default function SocketConnection(props) {
    const [socketUrl, setSocketUrl] = useState("ws://127.0.0.1:8000/ws/data");
    const [messageHistory, setMessageHistory] = useState([]);

    const {
        sendMessage,
        lastMessage,
        readyState,
        getWebSocket,
        lastJsonMessage,
    } = useWebSocket(socketUrl);

    useEffect(() => {
        if (lastMessage !== null) {
            setMessageHistory((prev) => prev.concat(lastMessage.data));
            props.handleLatestAssets(lastMessage);
        }
        // getWebSocket().onmessage = console.log;
        // console.log(lastJsonMessage);
    }, [lastMessage, setMessageHistory, getWebSocket, lastJsonMessage]);

    const handleClickChangeSocketUrl = useCallback(
        () => setSocketUrl("ws://127.0.0.1:8000/ws/data"),
        []
    );

    const handleClickSendMessage = useCallback(() => sendMessage("Hello"), []);

    const connectionStatus = {
        [ReadyState.CONNECTING]: "Connecting",
        [ReadyState.OPEN]: "Open",
        [ReadyState.CLOSING]: "Closing",
        [ReadyState.CLOSED]: "Closed",
        [ReadyState.UNINSTANTIATED]: "Uninstantiated",
    }[readyState];

    return (
        <div>
            <button onClick={handleClickChangeSocketUrl}>
                Click Me to change Socket Url
            </button>
            <button
                onClick={handleClickSendMessage}
                disabled={readyState !== ReadyState.OPEN}
            >
                Click Me to send 'Hello'
            </button>
            <span>The WebSocket is currently {connectionStatus}</span>
            {/* {lastMessage ? <span>Last message: {lastMessage.data}</span> : null} */}
            {/* <ul>
                {messageHistory.map((message, idx) => (
                    <span key={idx}>{message ? message.data : null}</span>
                ))}
            </ul> */}
        </div>
    );
}
