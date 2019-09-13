import * as React from "react";
import { Button,Grid } from "@material-ui/core";
import * as ReactDOM from "react-dom";
import { createElementFromString } from './utils';

interface ReactOverlayState extends React.ComponentState {
    testState:string
}

interface ReactOverlayRef{
    setMessage:(message:string)=>void
}

interface ReactOverlayProps {
    onClose: (() => void);
    ref:ReactOverlayRef;
}

const ReactOverlay = React.forwardRef<ReactOverlayRef, ReactOverlayProps>((props,ref) => {
    let [state, setState] = React.useState({testState:""});
    React.useImperativeHandle(ref, ()=>({
        setMessage:(message:string)=>setState({testState:message})
    }));
    return (
        <Grid container justify="center">
            <Button variant="outlined" color="primary" onClick={() => props.onClose()}>{state.testState}</Button>
        </Grid>
    );
});

(window as any)["showOverLay"] = () => {
    const { head, body } = window.document;
    let reactContainerStyle = document.createElement("style");;
    reactContainerStyle.innerHTML = `
    #react-overlay-container {
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin 0 0 0 0;
        position: fixed;
        z-index:${Number.MAX_SAFE_INTEGER};
    }`.trim();
    let reactContainer = createElementFromString(`
        <div id="react-overlay-container"></div>
    `);
    head.appendChild(reactContainerStyle)
    body.appendChild(reactContainer);
    let currentOverlayRef = React.createRef<ReactOverlayRef>();
    ReactDOM.render(
        <ReactOverlay
            ref={currentOverlayRef}
            onClose={() => {
                body.removeChild(reactContainer);
                head.removeChild(reactContainerStyle);
            }} />,
        reactContainer,
        () => {
            currentOverlayRef.current && currentOverlayRef.current.setMessage(new Date().toDateString());
        }
    );
};
