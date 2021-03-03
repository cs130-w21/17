import { containeranalysis } from 'googleapis/build/src/apis/containeranalysis';
import React from 'react';
import { HomePageProps, HomePageState } from '../../types/interfaces';
import SyncedCalender from '../calendar/SyncedCalender';
//const Background = require('../../public/Background.jpg');
//const IconEasy = require('../img/icon_easy.png');
//const IconInstant = require('../img/icon_instant.png');
//const IconProfessional = require('../img/icon_professional.png');


/**
 * This class serves as the Home Page of the application.
 */
class HomePage extends React.Component<HomePageProps, HomePageState> {
  constructor(props: HomePageProps) {
    super(props);
    this.renderschedular = this.renderschedular.bind(this);
    this.state = {};
  }

  public renderschedular() {
    /*if (this.props.isAuthenticated) {
      return (
        <SyncedCalender
          user={this.props.user}
          isAuthenticated={this.props.isAuthenticated}
        ></SyncedCalender>
      );
    } else {
      return <div></div>;
    }*/
  }
  render(): any {
    var style_HeroText = {
      fontSize: 80,
      fontFamily: "Verdana",
      color: '#FFFFFF',
      //textAlign: 'center'
    }
    var style_HeroSubText = {
      fontSize: 40,
      fontFamily: "Verdana",
      color: '#111111',
    }
    var style_div = {
      paddingTop: 250,
      paddingBottom: 500,

      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundSize: "cover",
      backgroundImage: 'url("https://i.redd.it/52f61nfzmwl51.jpg")'
    }
    return <section className="Block1">
      <div className="Div1">
        <h1 className="Head1">
          EasyMeet
        </h1>
        <p className="Sub1">
          Simplify scheduling with your clients
        </p>
        <button className="Button1">
          GET STARTED
        </button>
      </div>
      <div className="Div2">
        <div className="Div2_Left">
          <h1 className="Head2">
            Effortless
          </h1>
          <p className="Sub2">
            Calendar events inputted
          </p>
          <p className="Sub2">
            automagically
          </p>
          <img className="Icon" src={require('../img/Icon_easy.png')}/>
        </div>
        <div className="Div2_Center">
          <h1 className="Head2">
            Instant
          </h1>
          <p className="Sub2">
            Invitee meetings added 
          </p>
          <p className="Sub2">
            immediately
          </p>
          <img className="Icon" src={require('../img/Icon_instant.png')}/>
        </div>
        <div className="Div2_Right">
          <h1 className="Head2">
            Professional
          </h1>
          <p className="Sub2">
            No more back-and-forths 
          </p>
          <p className="Sub2">
            with clients
          </p>
          <img className="Icon" src={require('../img/Icon_professional.png')}/>
        </div>
      </div>
      <div className="Div3">
        <div className="Div3_Left">
          
        </div>
        <div className="Div3_Right">
          <h1 className="Head3">
            Don't Wait
          </h1>
          <p className="Sub3">
            Use EasyMeet to schedule
          </p>
          <p className="Sub3">
            with your clients today
          </p>
        </div>
      </div>




    </section>;


/*

      <h1 style = {style_HeroText}>Meet EasyMeet</h1>


*/
  }
}

export { HomePage };
