import React from 'react';
import {HomePageProps, HomePageState} from "../../types/interfaces";


class HomePage extends React.Component<HomePageProps, HomePageState> {
    constructor(props : HomePageProps) {
        super(props);

        this.state = {}
    }

    render() : any {
        return (
            <h1>HomePage!</h1>
        );
    }
}


export { HomePage };