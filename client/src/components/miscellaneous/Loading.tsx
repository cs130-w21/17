import React, { ComponentProps } from 'react';
import {render} from 'react-dom';
import { LoadingPageProps, LoadingPageState } from '../../types/interfaces';

class Loading extends React.Component<LoadingPageProps, LoadingPageState> {
    constructor(props : LoadingPageProps){
        super(props);
        //this.state = {greeting: "Fantastic!"};
    }


    render(): any {
        return <section>
            <div className="C_Div1">
                <div className="C_Div1_Left">
                    <img className="Icon2" src={"https://i.imgur.com/X9RvJD0.png"}/>
                </div>
                <div className="c_Div2_Right">
                    <h1 className="Head4">
                        Hold Tight!
                    </h1>
                    <p className="Sub4">
                        The inviter's calendar is being loaded as we speak!
                    </p>
                </div>
            </div> 
        </section>;
    }
}


export { Loading };