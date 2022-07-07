import './about.scss';
import muscle from '../../img/muscle.png';
import vitamin from '../../img/about_vitamin.jpg';

const About  = ()=>{

   return(
    <section className="about">
        <div className="container">
            <div className="about-wrapper">
                <div className="about-wrapper__img">
                    <img src={vitamin} alt="girl and Coffee"/>
                </div>
                <div className="about-wrapper__text">
                    <h2 className="about-wrapper__title">About our beans</h2>
                    <div className="about-wrapper__icon">
                        <img src={muscle} alt="muscle"/>
                    </div>
                    <p className="about-wrapper__descr">Extremity sweetness difficult behaviour he of. On disposal of as landlord horrible.
                        <br/>
                        Afraid at highly months do things on at. Situation recommend objection do intention
                        so questions. 
                        As greatly removed calling pleased improve an. Last ask him cold feel
                        met spot shy want. Children me laughing we prospect answered followed. At it went
                        is song that held help face.</p>
                </div>
            </div>
        </div>
        <div className="about__divinner"></div>
    </section>
   )
}

export default About;