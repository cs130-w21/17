import React from 'react';
import {render} from 'react-dom';
import { ErrorPageProps, ErrorPageState } from '../../types/interfaces';

class Error extends React.Component<ErrorPageProps, ErrorPageState> {
    constructor(props : ErrorPageProps){
        super(props);
        //this.state = {greeting: "Uh-Oh!"};
        this.state = {};
    }
    render(): any {
        return <section>
            <div className="C_Div1">
                <div className="C_Div1_Left">
                    <img className="Icon2" src={"https://i.imgur.com/tJuzlxq.png"}/>
                </div>
                <div className="c_Div2_Right">
                    <h1 className="Head4">
                        Whoops!
                    </h1>
                    <p className="Sub4">
                        Something went wrong. We're crying too.
                    </p>
                    <p className="Sub4">
                        {this.props.message}
                    </p>
                </div>
            </div> 
        </section>;
    }
}


export { Error };