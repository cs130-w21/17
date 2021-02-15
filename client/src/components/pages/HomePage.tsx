import React from 'react';
import {HomePageProps, HomePageState} from "../../types/interfaces";

/**
 * This class serves as the Home Page of the application.
 */
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