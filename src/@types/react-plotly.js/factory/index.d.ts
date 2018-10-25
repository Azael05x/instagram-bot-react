declare module 'react-plotly.js/factory' {
    import * as React from "react";

    export default function(arg) {
        return class extends React.Component<any, any> {}
    } 
}
