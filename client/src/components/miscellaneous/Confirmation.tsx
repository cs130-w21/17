import React, { ComponentProps } from 'react';
import {render} from 'react-dom';
import { ConfirmationPageProps, ConfirmationPageState } from '../../types/interfaces';

class Confirmation extends React.Component<ConfirmationPageProps, ConfirmationPageState> {
    constructor(props : ConfirmationPageProps){
        super(props);
        //this.state = {greeting: "Fantastic!"};
    }
    render(): any {
        return <section>
            <div className="C_Div1">
                <div className="C_Div1_Left">
                    <img className="Icon2" src={"https://i.imgur.com/gAHmB2R.png"}/>
                </div>
                <div className="c_Div2_Right">
                    <h1 className="Head4">
                        Fantastic!
                    </h1>
                    <p className="Sub4">
                        Your meeting has been scheduled successfully!
                    </p>
                    <p className="Sub4">
                        The inviter has also been notified. 
                    </p>
                </div>
            </div> 
        </section>;
    }
}


export { Confirmation };